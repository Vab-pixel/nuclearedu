import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  fetchAllIsotopesPage: async (page: bigint, pageSize: bigint) => ({
    __kind__: "ok" as const,
    ok: {
      records: [
        {
          n: BigInt(146),
          z: BigInt(92),
          branchingRatios: [1.0],
          decayModes: ["alpha"],
          name: "Uranium-238",
          lastUpdated: "2024-01-01",
          sourceUri: "https://www.nndc.bnl.gov/",
          atomicMassAMU: 238.050788,
          massExcessKeV: 47308.9,
          bindingEnergyPerNucleon: 7.570,
          abundance: 99.2742,
          halfLifeSeconds: 1.41e17,
          qValueMeV: 4.267,
          symbol: "U",
        },
        {
          n: BigInt(144),
          z: BigInt(92),
          branchingRatios: [1.0],
          decayModes: ["alpha"],
          name: "Uranium-236",
          lastUpdated: "2024-01-01",
          sourceUri: "https://www.nndc.bnl.gov/",
          atomicMassAMU: 236.045568,
          massExcessKeV: 42445.4,
          bindingEnergyPerNucleon: 7.590,
          abundance: 0,
          halfLifeSeconds: 7.39e12,
          qValueMeV: 4.572,
          symbol: "U",
        },
      ],
      page: BigInt(0),
      totalCount: BigInt(2),
      pageSize: BigInt(50),
    },
  }),

  fetchIsotopeData: async (z: bigint, n: bigint) => ({
    __kind__: "ok" as const,
    ok: {
      n,
      z,
      branchingRatios: [1.0],
      decayModes: ["alpha"],
      name: "Uranium-238",
      lastUpdated: "2024-01-01",
      sourceUri: "https://www.nndc.bnl.gov/",
      atomicMassAMU: 238.050788,
      massExcessKeV: 47308.9,
      bindingEnergyPerNucleon: 7.570,
      abundance: 99.2742,
      halfLifeSeconds: 1.41e17,
      qValueMeV: 4.267,
      symbol: "U",
    },
  }),

  getCachedIsotopeCount: async () => BigInt(3000),

  getLastFetchTimestamp: async () => BigInt(Date.now()),
};
