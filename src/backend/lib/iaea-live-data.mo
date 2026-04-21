import Types "../types/iaea-live-data";
import CoreTypes "mo:core/Types";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Array "mo:core/Array";
module {
  type Result<T, E> = CoreTypes.Result<T, E>;
  public type IsotopeRecord = Types.IsotopeRecord;
  public type IsotopePageResult = Types.IsotopePageResult;

  /// Base URL for the IAEA Live Chart REST API.
  public let IAEA_BASE_URL : Text = "https://nds.iaea.org/relnsd/v1/data";

  /// Build the IAEA API URL for a single nuclide by proton (z) and neutron (n) numbers.
  public func buildNuclideUrl(z : Nat, n : Nat) : Text {
    IAEA_BASE_URL # "?fields=ground_states&nuclides=" # z.toText() # "_" # n.toText()
  };

  /// Build the IAEA API URL for a paginated bulk fetch.
  /// IAEA does not support server-side pagination, so we fetch all and slice locally.
  public func buildPageUrl(_page : Nat, _pageSize : Nat) : Text {
    IAEA_BASE_URL # "?fields=ground_states&nuclides=all"
  };

  /// Compute a composite cache key for a single nuclide.
  public func nuclideKey(z : Nat, n : Nat) : Text {
    z.toText() # ":" # n.toText()
  };

  /// Trim leading and trailing whitespace from a text value.
  func trimWs(t : Text) : Text {
    t.trimStart(#predicate(func c = c == ' ' or c == '\t' or c == '\r' or c == '\n'))
     .trimEnd(#predicate(func c = c == ' ' or c == '\t' or c == '\r' or c == '\n'))
  };

  /// Parse a text as Nat, returning 0 on failure.
  func parseNat(t : Text) : Nat {
    let cleaned = trimWs(t);
    switch (Nat.fromText(cleaned)) {
      case (?n) n;
      case null 0;
    }
  };

  /// Parse a text as Int (handles negative numbers), returning 0 on failure.
  func parseInt(t : Text) : Int {
    let cleaned = trimWs(t);
    switch (Int.fromText(cleaned)) {
      case (?n) n;
      case null 0;
    }
  };

  /// Parse a decimal float string (e.g. "1234.567", "-0.001", "1.23e+10", "1.23E-4").
  /// Returns 0.0 for unparseable input.
  public func parseFloat(t : Text) : Float {
    let s = trimWs(t);
    if (s == "" or s == "?" or s == "stable" or s == "STABLE" or s == "N/A") {
      return 0.0;
    };

    // Find exponent part
    var mantissa = s;
    var expPart : Int = 0;

    // Look for 'e' or 'E'
    let ePos = s.toIter().findIndex(func c = c == 'e' or c == 'E');
    switch (ePos) {
      case (?idx) {
        // Split at idx: chars 0..idx-1 = mantissa, idx+1..end = exponent
        let chars = s.toArray();
        var mChars : [Char] = [];
        var eChars : [Char] = [];
        var i = 0;
        for (c in chars.values()) {
          if (i < idx) {
            mChars := mChars.concat([c]);
          } else if (i > idx) {
            eChars := eChars.concat([c]);
          };
          i += 1;
        };
        mantissa := Text.fromArray(mChars);
        let expText = Text.fromArray(eChars);
        expPart := parseInt(expText);
      };
      case null {};
    };

    // Parse sign of mantissa
    var negative = false;
    var mTrimmed = mantissa;
    if (mTrimmed.startsWith(#char('-'))) {
      negative := true;
      let mChars = mTrimmed.toArray();
      mTrimmed := Text.fromArray(mChars.sliceToArray(1, mChars.size()));
    } else if (mTrimmed.startsWith(#char('+'))) {
      let mChars = mTrimmed.toArray();
      mTrimmed := Text.fromArray(mChars.sliceToArray(1, mChars.size()));
    };

    // Split mantissa on '.'
    var intPart : Float = 0.0;
    var fracPart : Float = 0.0;

    let dotPos = mTrimmed.toIter().findIndex(func c = c == '.');
    switch (dotPos) {
      case (?dp) {
        let mChars = mTrimmed.toArray();
        let intChars = mChars.sliceToArray(0, dp);
        let fracChars = mChars.sliceToArray(dp + 1, mChars.size());
        let intText = Text.fromArray(intChars);
        let fracText = Text.fromArray(fracChars);

        switch (Nat.fromText(intText)) {
          case (?n) { intPart := n.toFloat() };
          case null {};
        };

        if (fracChars.size() > 0) {
          switch (Nat.fromText(fracText)) {
            case (?n) {
              let divisor = Float.pow(10.0, fracChars.size().toFloat());
              fracPart := n.toFloat() / divisor;
            };
            case null {};
          };
        };
      };
      case null {
        switch (Nat.fromText(mTrimmed)) {
          case (?n) { intPart := n.toFloat() };
          case null {};
        };
      };
    };

    var result = intPart + fracPart;
    if (negative) result := -result;

    // Apply exponent
    if (expPart != 0) {
      result := result * Float.pow(10.0, expPart.toFloat());
    };

    result
  };

  /// Split a CSV line on commas, trimming whitespace from each field.
  func splitCsvLine(line : Text) : [Text] {
    line.split(#char(','))
      .map(func (t : Text) : Text { trimWs(t) })
      .toArray()
  };

  /// Expected IAEA ground_states CSV columns (0-indexed):
  /// 0:z, 1:n, 2:symbol, 3:radius, 4:unc_r, 5:abundance, 6:unc_a,
  /// 7:energy_shift, 8:energy, 9:unc_e, 10:ripl, 11:isospin,
  /// 12:half_life_sec, 13:operator_hl, 14:unc_hl, 15:unit_hl,
  /// 16:half_life_stable, 17:decay_1, 18:pct_1, 19:uncertain_pct_1,
  /// 20:decay_2, 21:pct_2, 22:uncertain_pct_2,
  /// 23:decay_3, 24:pct_3, 25:uncertain_pct_3,
  /// 26:isomer, 27:Jpi, 28:n_reac_xs, 29:n_reac_xs_inc,
  /// 30:mass_excess, 31:unc_me, 32:binding_energy, 33:unc_be
  public func parseCsvRow(cols : [Text], timestamp : Text) : ?IsotopeRecord {
    if (cols.size() < 33) return null;

    let zText = trimWs(cols[0]);
    // Skip header rows
    if (zText == "z" or zText == "Z" or zText == "") return null;

    let z = parseNat(zText);
    let n = parseNat(cols[1]);
    let symbol = trimWs(cols[2]);

    if (symbol == "symbol" or symbol == "") return null;

    let abundance = parseFloat(cols[5]);

    // Determine half-life
    let stableFlag = if (cols.size() > 16) trimWs(cols[16]) else "";
    let halfLifeSeconds : Float = if (stableFlag == "YES" or stableFlag == "yes") {
      1.0e30  // stable isotope sentinel
    } else {
      parseFloat(cols[12])
    };

    // Decay modes (up to 3)
    let decay1 = if (cols.size() > 17) trimWs(cols[17]) else "";
    let pct1   = if (cols.size() > 18) trimWs(cols[18]) else "";
    let decay2 = if (cols.size() > 20) trimWs(cols[20]) else "";
    let pct2   = if (cols.size() > 21) trimWs(cols[21]) else "";
    let decay3 = if (cols.size() > 23) trimWs(cols[23]) else "";
    let pct3   = if (cols.size() > 24) trimWs(cols[24]) else "";

    let decayModes = [decay1, decay2, decay3].filter(
      func (d : Text) : Bool { d != "" and d != "?" }
    );

    let rawBranching = [parseFloat(pct1), parseFloat(pct2), parseFloat(pct3)];
    let branchingRatios = rawBranching.values().take(decayModes.size()).toArray();

    let massExcessKeV = parseFloat(cols[30]);
    let bindingEnergy = parseFloat(cols[32]);
    let atomicMassAMU : Float = if (cols.size() > 34) parseFloat(cols[34]) else 0.0;

    let sourceUri = IAEA_BASE_URL # "?fields=ground_states&nuclides=" # z.toText() # "_" # n.toText();

    ?{
      z;
      n;
      symbol;
      name = elementName(z);
      halfLifeSeconds;
      decayModes;
      qValueMeV = 0.0;
      bindingEnergyPerNucleon = bindingEnergy;
      massExcessKeV;
      atomicMassAMU;
      abundance;
      branchingRatios;
      lastUpdated = timestamp;
      sourceUri;
    }
  };

  /// Parse a raw CSV text response from IAEA for a single nuclide.
  public func parseIsotopeRecord(csv : Text, z : Nat, n : Nat) : Result<IsotopeRecord, Text> {
    let lines = csv.split(#char('\n')).toArray();
    let timestamp = "IAEA-live";

    // Try to find the matching record
    for (line in lines.values()) {
      let trimmed = trimWs(line);
      if (trimmed != "") {
        let cols = splitCsvLine(trimmed);
        if (cols.size() > 0 and trimWs(cols[0]) != "z") {
          switch (parseCsvRow(cols, timestamp)) {
            case (?record) {
              if (record.z == z and record.n == n) {
                return #ok(record);
              };
            };
            case null {};
          };
        };
      };
    };

    // If not matched by z/n, return first valid record (single-nuclide API response)
    for (line in lines.values()) {
      let trimmed = trimWs(line);
      if (trimmed != "") {
        let cols = splitCsvLine(trimmed);
        if (cols.size() > 0 and trimWs(cols[0]) != "z") {
          switch (parseCsvRow(cols, timestamp)) {
            case (?record) return #ok(record);
            case null {};
          };
        };
      };
    };

    #err("Parse error: no valid isotope record found for Z=" # z.toText() # " N=" # n.toText())
  };

  /// Parse a raw CSV text response from IAEA into all records, then paginate.
  public func parseIsotopePageResult(csv : Text, page : Nat, pageSize : Nat) : Result<IsotopePageResult, Text> {
    let lines = csv.split(#char('\n')).toArray();
    let timestamp = "IAEA-live";
    var allRecords : [IsotopeRecord] = [];

    for (line in lines.values()) {
      let trimmed = trimWs(line);
      if (trimmed != "") {
        let cols = splitCsvLine(trimmed);
        if (cols.size() > 0 and trimWs(cols[0]) != "z") {
          switch (parseCsvRow(cols, timestamp)) {
            case (?record) {
              allRecords := allRecords.concat([record]);
            };
            case null {};
          };
        };
      };
    };

    let totalCount = allRecords.size();
    if (totalCount == 0) {
      return #err("Parse error: no isotope records found in response");
    };

    let start = page * pageSize;
    if (start >= totalCount) {
      return #ok({ records = []; totalCount; page; pageSize });
    };

    let end_ = Nat.min(start + pageSize, totalCount);
    let pageRecords = allRecords.values().drop(start).take(end_ - start).toArray();

    #ok({ records = pageRecords; totalCount; page; pageSize })
  };

  /// Return a human-readable element name for a given proton number Z.
  public func elementName(z : Nat) : Text {
    let names : [Text] = [
      "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron",
      "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon",
      "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus",
      "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium",
      "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese",
      "Iron", "Cobalt", "Nickel", "Copper", "Zinc",
      "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine",
      "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium",
      "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium",
      "Palladium", "Silver", "Cadmium", "Indium", "Tin",
      "Antimony", "Tellurium", "Iodine", "Xenon", "Cesium",
      "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium",
      "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium",
      "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium",
      "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium",
      "Osmium", "Iridium", "Platinum", "Gold", "Mercury",
      "Thallium", "Lead", "Bismuth", "Polonium", "Astatine",
      "Radon", "Francium", "Radium", "Actinium", "Thorium",
      "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium",
      "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium",
      "Mendelevium", "Nobelium", "Lawrencium", "Rutherfordium", "Dubnium",
      "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium",
      "Roentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium",
      "Livermorium", "Tennessine", "Oganesson"
    ];
    if (z == 0 or z > names.size()) return "Unknown";
    names[z - 1]
  };
};
