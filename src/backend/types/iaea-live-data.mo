module {
  /// A single nuclide record fetched from the IAEA Live Chart API.
  public type IsotopeRecord = {
    z : Nat;
    n : Nat;
    symbol : Text;
    name : Text;
    halfLifeSeconds : Float;
    decayModes : [Text];
    qValueMeV : Float;
    bindingEnergyPerNucleon : Float;
    massExcessKeV : Float;
    atomicMassAMU : Float;
    abundance : Float;
    branchingRatios : [Float];
    lastUpdated : Text;
    sourceUri : Text;
  };

  /// Paginated result from a bulk isotope fetch.
  public type IsotopePageResult = {
    records : [IsotopeRecord];
    totalCount : Nat;
    page : Nat;
    pageSize : Nat;
  };

  /// HTTP method variants used internally for IAEA outcalls.
  public type HttpMethod = { #get; #post };
};
