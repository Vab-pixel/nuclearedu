/**
 * IsotopeRecord — mirrors the Motoko backend type exactly.
 * Returned by fetchIsotopeData / fetchAllIsotopesPage.
 */
export interface IsotopeRecord {
  z: number;
  n: number;
  symbol: string;
  name: string;
  halfLifeSeconds: number;
  decayModes: string[];
  qValueMeV: number;
  bindingEnergyPerNucleon: number;
  massExcessKeV: number;
  atomicMassAMU: number;
  abundance: number;
  branchingRatios: number[];
  lastUpdated: string; // ISO-8601 UTC string
  sourceUri: string;
}

export type FetchStatus = "idle" | "loading" | "success" | "error";

/** Partial schema validator — returns list of missing required fields */
export function validateIsotopeRecord(record: unknown): string[] {
  const required: (keyof IsotopeRecord)[] = [
    "z",
    "n",
    "symbol",
    "name",
    "halfLifeSeconds",
    "decayModes",
    "qValueMeV",
    "bindingEnergyPerNucleon",
    "massExcessKeV",
    "atomicMassAMU",
    "abundance",
    "branchingRatios",
    "lastUpdated",
    "sourceUri",
  ];
  const missing: string[] = [];
  for (const key of required) {
    if ((record as Record<string, unknown>)[key] === undefined) {
      missing.push(key);
    }
  }
  return missing;
}
