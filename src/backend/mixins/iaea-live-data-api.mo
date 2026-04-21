import Types "../types/iaea-live-data";
import IaeaLib "../lib/iaea-live-data";
import Map "mo:core/Map";
import CoreTypes "mo:core/Types";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

mixin (
  cachedIsotopes : Map.Map<Text, Types.IsotopeRecord>
) {
  type Result<T, E> = CoreTypes.Result<T, E>;
  /// Stable timestamp of the last successful IAEA API fetch (nanoseconds).
  var lastFetchTimestamp : Int = 0;

  /// IC management canister for HTTP outcalls.
  let ic : actor {
    http_request : shared ({
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [{ name : Text; value : Text }];
      body : ?Blob;
      transform : ?{
        function : shared query ({ response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob }; context : Blob }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
        context : Blob;
      };
      is_replicated : ?Bool;
    }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
  } = actor "aaaaa-aa";

  /// Rate-limit guard: minimum 60 seconds (in nanoseconds) between fresh API fetches.
  let RATE_LIMIT_NS : Int = 60_000_000_000;

  /// Maximum response size for a single nuclide (128 KB).
  let MAX_SINGLE_BYTES : Nat64 = 131_072;

  /// Maximum response size for bulk fetch (4 MB).
  let MAX_BULK_BYTES : Nat64 = 4_194_304;

  /// Perform an HTTP GET outcall to the given URL.
  /// Returns the response body as Text, or an error string.
  func httpGet(url : Text, maxBytes : Nat64) : async Result<Text, Text> {
    let request = {
      url;
      max_response_bytes = ?maxBytes;
      method = #get;
      headers = [
        { name = "Accept"; value = "text/csv,text/plain,*/*" },
        { name = "User-Agent"; value = "NuclearEdu-Canister/1.0" },
      ];
      body = null;
      transform = null;
      is_replicated = ?false;
    };

    try {
      let response = await ic.http_request(request);
      if (response.status >= 200 and response.status < 300) {
        switch (response.body.decodeUtf8()) {
          case (?text) #ok(text);
          case null #err("Parse error: response body is not valid UTF-8");
        }
      } else {
        #err("HTTP error: " # response.status.toText())
      }
    } catch (_e) {
      #err("Timeout")
    }
  };

  /// Fetch a single nuclide's properties from the IAEA Live Chart API.
  /// Returns cached data if last fetch was within the rate-limit window.
  public func fetchIsotopeData(z : Nat, n : Nat) : async Result<Types.IsotopeRecord, Text> {
    let key = IaeaLib.nuclideKey(z, n);
    let now = Time.now();

    // Return cached record if within rate-limit window
    let timeSinceFetch : Int = now - lastFetchTimestamp;
    switch (cachedIsotopes.get(key)) {
      case (?cached) {
        if (timeSinceFetch < RATE_LIMIT_NS) {
          return #ok(cached);
        };
      };
      case null {};
    };

    let url = IaeaLib.buildNuclideUrl(z, n);
    switch (await httpGet(url, MAX_SINGLE_BYTES)) {
      case (#err(e)) {
        // Fall back to cached if available
        switch (cachedIsotopes.get(key)) {
          case (?cached) #ok(cached);
          case null #err(e);
        }
      };
      case (#ok(csv)) {
        switch (IaeaLib.parseIsotopeRecord(csv, z, n)) {
          case (#err(e)) {
            switch (cachedIsotopes.get(key)) {
              case (?cached) #ok(cached);
              case null #err(e);
            }
          };
          case (#ok(record)) {
            cachedIsotopes.add(key, record);
            lastFetchTimestamp := now;
            #ok(record)
          };
        }
      };
    }
  };

  /// Fetch a paginated set of isotope records from the IAEA Live Chart API.
  /// On rate-limit, serves from cache.
  public func fetchAllIsotopesPage(page : Nat, pageSize : Nat) : async Result<Types.IsotopePageResult, Text> {
    let now = Time.now();
    let timeSinceFetch : Int = now - lastFetchTimestamp;
    let cacheSize = cachedIsotopes.size();

    // If cache is warm and within rate-limit, serve from cache
    if (timeSinceFetch < RATE_LIMIT_NS and cacheSize > 0) {
      return servePageFromCache(page, pageSize);
    };

    let url = IaeaLib.buildPageUrl(page, pageSize);
    switch (await httpGet(url, MAX_BULK_BYTES)) {
      case (#err(e)) {
        if (cacheSize > 0) {
          servePageFromCache(page, pageSize)
        } else {
          #err(e)
        }
      };
      case (#ok(csv)) {
        switch (IaeaLib.parseIsotopePageResult(csv, 0, 999_999)) {
          case (#err(e)) {
            if (cacheSize > 0) {
              servePageFromCache(page, pageSize)
            } else {
              #err(e)
            }
          };
          case (#ok(fullResult)) {
            // Populate cache with all records
            for (record in fullResult.records.values()) {
              let key = IaeaLib.nuclideKey(record.z, record.n);
              cachedIsotopes.add(key, record);
            };
            lastFetchTimestamp := now;
            // Now serve the requested page from freshly populated cache
            servePageFromCache(page, pageSize)
          };
        }
      };
    }
  };

  /// Serve a page of records from the in-memory cache.
  func servePageFromCache(page : Nat, pageSize : Nat) : Result<Types.IsotopePageResult, Text> {
    let allRecords = cachedIsotopes.values().toArray();
    let totalCount = allRecords.size();
    let start = page * pageSize;

    if (start >= totalCount) {
      return #ok({ records = []; totalCount; page; pageSize });
    };

    let end_ = Nat.min(start + pageSize, totalCount);
    let pageRecords = allRecords.values()
      .drop(start)
      .take(end_ - start)
      .toArray();

    #ok({ records = pageRecords; totalCount; page; pageSize })
  };

  /// Returns the Unix timestamp (nanoseconds) of the last successful IAEA API fetch.
  public query func getLastFetchTimestamp() : async Int {
    lastFetchTimestamp
  };

  /// Returns the number of isotope records currently cached in stable canister state.
  public query func getCachedIsotopeCount() : async Nat {
    cachedIsotopes.size()
  };
};
