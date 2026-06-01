/** Common particle masses (MeV/c²) and properties */
export const PARTICLE_MASSES = {
  electron: {
    symbol: "e\u207B",
    name: "Electron",
    mass: 0.51099895,
    spin: "1/2",
    charge: "\u22121",
  },
  muon: {
    symbol: "\u03BC\u207B",
    name: "Muon",
    mass: 105.6583755,
    spin: "1/2",
    charge: "\u22121",
  },
  pion0: {
    symbol: "\u03C0\u2070",
    name: "Pion (neutral)",
    mass: 134.9768,
    spin: "0",
    charge: "0",
  },
  pionPM: {
    symbol: "\u03C0\u00B1",
    name: "Pion (charged)",
    mass: 139.57039,
    spin: "0",
    charge: "\u00B11",
  },
  kaon: {
    symbol: "K\u00B1",
    name: "Kaon (charged)",
    mass: 493.677,
    spin: "0",
    charge: "\u00B11",
  },
  proton: {
    symbol: "p",
    name: "Proton",
    mass: 938.27208816,
    spin: "1/2",
    charge: "+1",
  },
  neutron: {
    symbol: "n",
    name: "Neutron",
    mass: 939.56542052,
    spin: "1/2",
    charge: "0",
  },
  deuteron: {
    symbol: "d",
    name: "Deuteron",
    mass: 1875.61294,
    spin: "1",
    charge: "+1",
  },
  alpha: {
    symbol: "\u03B1",
    name: "Alpha (\u2074He nucleus)",
    mass: 3727.3794,
    spin: "0",
    charge: "+2",
  },
  carbon12: {
    symbol: "\u00B9\u00B2C",
    name: "Carbon-12 nucleus",
    mass: 11177.929,
    spin: "0",
    charge: "+6",
  },
} as const;

export interface RelProps {
  E: number;
  p: number;
  gamma: number;
  beta: number;
}

export function computeRelProps(m0: number, T: number): RelProps {
  const E = T + m0;
  const p = Math.sqrt(Math.max(0, E * E - m0 * m0));
  const gamma = m0 > 0 ? E / m0 : 1;
  const beta = m0 > 0 ? Math.sqrt(1 - 1 / (gamma * gamma)) : 1;
  return { E, p, gamma, beta };
}

export function formatSci(val: number, digits = 6): string {
  if (!Number.isFinite(val)) return "\u2014";
  if (val < 1e6) return val.toFixed(digits);
  return val.toExponential(3);
}

export const AMU_TO_MEV = 931.494102;

export interface ParticleInput {
  symbol: string;
  massAMU: string;
}

export function parseParticleInput(inputs: ParticleInput[]): number[] {
  return inputs.map((p) => {
    const v = Number.parseFloat(p.massAMU);
    return Number.isNaN(v) ? 0 : v;
  });
}
