import Types "types/iaea-live-data";
import IaeaApi "mixins/iaea-live-data-api";
import Map "mo:core/Map";

actor {
  /// Stable cache: keyed by composite "z:n" text key → IsotopeRecord.
  let cachedIsotopes = Map.empty<Text, Types.IsotopeRecord>();

  include IaeaApi(cachedIsotopes);
};
