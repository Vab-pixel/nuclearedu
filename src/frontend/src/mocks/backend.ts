import type { backendInterface } from "../backend";

const sampleIsotopes = [
  {
    z: BigInt(6),
    n: BigInt(6),
    symbol: "C",
    name: "Carbon-12",
    atomicMassAMU: 12.0,
    massExcessKeV: 0.0,
    bindingEnergyPerNucleon: 7.680,
    abundance: 98.93,
    halfLifeSeconds: -1,
    qValueMeV: 0.0,
    decayModes: ["stable"],
    branchingRatios: [1.0],
    lastUpdated: "2024-01-01",
    sourceUri: "https://www.nndc.bnl.gov/nudat3/",
  },
  {
    z: BigInt(6),
    n: BigInt(8),
    symbol: "C",
    name: "Carbon-14",
    atomicMassAMU: 14.003241989,
    massExcessKeV: 3019.893,
    bindingEnergyPerNucleon: 7.520,
    abundance: 0.0,
    halfLifeSeconds: 1.80938e11,
    qValueMeV: 0.156476,
    decayModes: ["beta-"],
    branchingRatios: [1.0],
    lastUpdated: "2024-01-01",
    sourceUri: "https://www.nndc.bnl.gov/nudat3/",
  },
  {
    z: BigInt(92),
    n: BigInt(143),
    symbol: "U",
    name: "Uranium-235",
    atomicMassAMU: 235.043928,
    massExcessKeV: 40921.0,
    bindingEnergyPerNucleon: 7.591,
    abundance: 0.720,
    halfLifeSeconds: 2.2211e16,
    qValueMeV: 4.678,
    decayModes: ["alpha", "SF"],
    branchingRatios: [0.99997, 0.00003],
    lastUpdated: "2024-01-01",
    sourceUri: "https://www.nndc.bnl.gov/nudat3/",
  },
  {
    z: BigInt(92),
    n: BigInt(146),
    symbol: "U",
    name: "Uranium-238",
    atomicMassAMU: 238.050788,
    massExcessKeV: 47307.0,
    bindingEnergyPerNucleon: 7.570,
    abundance: 99.274,
    halfLifeSeconds: 1.40967e17,
    qValueMeV: 4.270,
    decayModes: ["alpha", "SF"],
    branchingRatios: [0.999999, 0.000001],
    lastUpdated: "2024-01-01",
    sourceUri: "https://www.nndc.bnl.gov/nudat3/",
  },
  {
    z: BigInt(88),
    n: BigInt(138),
    symbol: "Ra",
    name: "Radium-226",
    atomicMassAMU: 226.025410,
    massExcessKeV: 23669.0,
    bindingEnergyPerNucleon: 7.662,
    abundance: 0.0,
    halfLifeSeconds: 5.0491e10,
    qValueMeV: 4.870,
    decayModes: ["alpha"],
    branchingRatios: [1.0],
    lastUpdated: "2024-01-01",
    sourceUri: "https://www.nndc.bnl.gov/nudat3/",
  },
];

export const mockBackend: backendInterface = {
  fetchAllIsotopesPage: async (page: bigint, pageSize: bigint) => {
    const pageNum = Number(page);
    const size = Number(pageSize);
    const start = pageNum * size;
    const records = sampleIsotopes.slice(start, start + size);
    return {
      __kind__: "ok" as const,
      ok: {
        records,
        page,
        totalCount: BigInt(sampleIsotopes.length),
        pageSize,
      },
    };
  },

  fetchIsotopeData: async (z: bigint, n: bigint) => {
    const found = sampleIsotopes.find(
      (iso) => iso.z === z && iso.n === n
    );
    if (found) {
      return { __kind__: "ok" as const, ok: found };
    }
    return { __kind__: "err" as const, err: "Isotope not found" };
  },

  getCachedIsotopeCount: async () => BigInt(sampleIsotopes.length),

  getLastFetchTimestamp: async () => BigInt(Date.now() * 1_000_000),
};
