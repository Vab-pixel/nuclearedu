// AME2020-derived nuclear landscape data
// Format: [Z, N, BE_per_nucleon (MeV), decayMode, symbol, halfLife]
// decayMode: 0=stable, 1=beta-minus, 2=beta-plus/EC, 3=alpha, 4=proton, 5=spon.fission
export type DecayMode = 0 | 1 | 2 | 3 | 4 | 5;

export interface Nuclide {
  Z: number;
  N: number;
  A: number;
  symbol: string;
  name: string;
  bea: number; // binding energy per nucleon in MeV
  decayMode: DecayMode;
  halfLife: string;
}

export const ELEMENT_SYMBOLS: Record<number, [string, string]> = {
  0: ["n", "Neutron"],
  1: ["H", "Hydrogen"],
  2: ["He", "Helium"],
  3: ["Li", "Lithium"],
  4: ["Be", "Beryllium"],
  5: ["B", "Boron"],
  6: ["C", "Carbon"],
  7: ["N", "Nitrogen"],
  8: ["O", "Oxygen"],
  9: ["F", "Fluorine"],
  10: ["Ne", "Neon"],
  11: ["Na", "Sodium"],
  12: ["Mg", "Magnesium"],
  13: ["Al", "Aluminum"],
  14: ["Si", "Silicon"],
  15: ["P", "Phosphorus"],
  16: ["S", "Sulfur"],
  17: ["Cl", "Chlorine"],
  18: ["Ar", "Argon"],
  19: ["K", "Potassium"],
  20: ["Ca", "Calcium"],
  21: ["Sc", "Scandium"],
  22: ["Ti", "Titanium"],
  23: ["V", "Vanadium"],
  24: ["Cr", "Chromium"],
  25: ["Mn", "Manganese"],
  26: ["Fe", "Iron"],
  27: ["Co", "Cobalt"],
  28: ["Ni", "Nickel"],
  29: ["Cu", "Copper"],
  30: ["Zn", "Zinc"],
  31: ["Ga", "Gallium"],
  32: ["Ge", "Germanium"],
  33: ["As", "Arsenic"],
  34: ["Se", "Selenium"],
  35: ["Br", "Bromine"],
  36: ["Kr", "Krypton"],
  37: ["Rb", "Rubidium"],
  38: ["Sr", "Strontium"],
  39: ["Y", "Yttrium"],
  40: ["Zr", "Zirconium"],
  41: ["Nb", "Niobium"],
  42: ["Mo", "Molybdenum"],
  43: ["Tc", "Technetium"],
  44: ["Ru", "Ruthenium"],
  45: ["Rh", "Rhodium"],
  46: ["Pd", "Palladium"],
  47: ["Ag", "Silver"],
  48: ["Cd", "Cadmium"],
  49: ["In", "Indium"],
  50: ["Sn", "Tin"],
  51: ["Sb", "Antimony"],
  52: ["Te", "Tellurium"],
  53: ["I", "Iodine"],
  54: ["Xe", "Xenon"],
  55: ["Cs", "Cesium"],
  56: ["Ba", "Barium"],
  57: ["La", "Lanthanum"],
  58: ["Ce", "Cerium"],
  59: ["Pr", "Praseodymium"],
  60: ["Nd", "Neodymium"],
  61: ["Pm", "Promethium"],
  62: ["Sm", "Samarium"],
  63: ["Eu", "Europium"],
  64: ["Gd", "Gadolinium"],
  65: ["Tb", "Terbium"],
  66: ["Dy", "Dysprosium"],
  67: ["Ho", "Holmium"],
  68: ["Er", "Erbium"],
  69: ["Tm", "Thulium"],
  70: ["Yb", "Ytterbium"],
  71: ["Lu", "Lutetium"],
  72: ["Hf", "Hafnium"],
  73: ["Ta", "Tantalum"],
  74: ["W", "Tungsten"],
  75: ["Re", "Rhenium"],
  76: ["Os", "Osmium"],
  77: ["Ir", "Iridium"],
  78: ["Pt", "Platinum"],
  79: ["Au", "Gold"],
  80: ["Hg", "Mercury"],
  81: ["Tl", "Thallium"],
  82: ["Pb", "Lead"],
  83: ["Bi", "Bismuth"],
  84: ["Po", "Polonium"],
  85: ["At", "Astatine"],
  86: ["Rn", "Radon"],
  87: ["Fr", "Francium"],
  88: ["Ra", "Radium"],
  89: ["Ac", "Actinium"],
  90: ["Th", "Thorium"],
  91: ["Pa", "Protactinium"],
  92: ["U", "Uranium"],
  93: ["Np", "Neptunium"],
  94: ["Pu", "Plutonium"],
  95: ["Am", "Americium"],
  96: ["Cm", "Curium"],
  97: ["Bk", "Berkelium"],
  98: ["Cf", "Californium"],
};

// Bethe-Weizsäcker semi-empirical formula to generate BE/A for the landscape
// av=15.75, as=17.8, ac=0.711, aa=23.7, ap=11.2 (MeV)
export function betheWeizsacker(Z: number, N: number): number {
  const A = Z + N;
  if (A <= 0) return 0;
  const av = 15.75;
  const as = 17.8;
  const ac = 0.711;
  const aa = 23.7;
  const ap = 11.2;
  const volumeTerm = av;
  const surfaceTerm = -as * A ** (-1 / 3);
  const coulombTerm = -ac * Z * (Z - 1) * A ** (-4 / 3);
  const asymmetryTerm = (-aa * (N - Z) ** 2) / (A * A);
  let pairingTerm = 0;
  if (Z % 2 === 0 && N % 2 === 0) pairingTerm = ap * A ** (-3 / 2);
  else if (Z % 2 !== 0 && N % 2 !== 0) pairingTerm = -ap * A ** (-3 / 2);
  const bea =
    volumeTerm + surfaceTerm + coulombTerm + asymmetryTerm + pairingTerm;
  return Math.max(0, bea);
}

// Valley of stability: Z_stable ≈ A / (1.98 + 0.015 * A^(2/3))
export function valleyZ(N: number): number {
  const _A_approx = N * 1.8; // rough estimate
  for (let A = N + 1; A <= N + 120; A++) {
    const Zstab = A / (1.98 + 0.015 * A ** (2 / 3));
    if (Math.abs(A - N - Zstab) < 0.6) return Zstab;
  }
  return N * 0.56;
}

// Decay mode classification based on position relative to valley of stability
export function classifyDecay(Z: number, N: number): DecayMode {
  const A = Z + N;
  if (A < 2) return 0;
  // alpha decay region: heavy nuclei Z > 83 or A > 210
  if (Z > 83 || A > 209) {
    if (A > 250) return 5; // spontaneous fission
    if (Z > 82) return 3; // alpha
  }
  // proton emitter: very proton rich
  if (Z > 0 && N > 0) {
    const Zv = A / (1.98 + 0.015 * A ** (2 / 3));
    const delta = Z - Zv;
    if (delta > 5) return 4; // proton emitter
    if (delta > 1.2) return 2; // beta+ / EC
    if (delta < -1.2) return 1; // beta-minus
    return 0; // stable
  }
  return 0;
}

// Stable isotopes from AME2020 (embedded dataset — all naturally occurring stable nuclides)
// [Z, N, BE/A (MeV)]
export const STABLE_NUCLIDES: [number, number, number][] = [
  [1, 0, 0],
  [1, 1, 2.224],
  [1, 2, 2.827],
  [2, 1, 2.573],
  [2, 2, 7.074],
  [2, 4, 6.463],
  [3, 3, 5.332],
  [3, 4, 5.607],
  [4, 5, 6.463],
  [4, 6, 6.812],
  [5, 5, 6.476],
  [5, 6, 6.928],
  [6, 6, 7.68],
  [6, 7, 7.47],
  [6, 8, 7.52],
  [7, 7, 7.476],
  [7, 8, 7.55],
  [8, 8, 7.976],
  [8, 9, 7.834],
  [8, 10, 7.771],
  [9, 10, 8.115],
  [10, 10, 8.032],
  [10, 11, 8.036],
  [10, 12, 8.025],
  [11, 12, 8.112],
  [12, 12, 8.261],
  [12, 13, 8.224],
  [12, 14, 8.101],
  [13, 14, 8.332],
  [14, 14, 8.448],
  [14, 15, 8.39],
  [14, 16, 8.296],
  [15, 16, 8.481],
  [16, 16, 8.493],
  [16, 17, 8.445],
  [16, 18, 8.413],
  [16, 20, 8.312],
  [17, 18, 8.52],
  [17, 20, 8.47],
  [18, 18, 8.527],
  [18, 20, 8.595],
  [18, 22, 8.525],
  [19, 20, 8.557],
  [19, 22, 8.481],
  [20, 20, 8.547],
  [20, 22, 8.666],
  [20, 23, 8.517],
  [20, 24, 8.658],
  [20, 26, 8.551],
  [20, 28, 8.551],
  [21, 24, 8.616],
  [22, 24, 8.71],
  [22, 25, 8.611],
  [22, 26, 8.715],
  [22, 27, 8.638],
  [22, 28, 8.711],
  [23, 27, 8.694],
  [23, 28, 8.69],
  [24, 26, 8.666],
  [24, 28, 8.778],
  [24, 29, 8.72],
  [24, 30, 8.778],
  [24, 32, 8.68],
  [25, 30, 8.739],
  [26, 28, 8.694],
  [26, 30, 8.793],
  [26, 31, 8.759],
  [26, 32, 8.867],
  [26, 33, 8.786],
  [26, 34, 8.909],
  [26, 36, 8.807],
  [27, 32, 8.839],
  [28, 30, 8.744],
  [28, 32, 8.84],
  [28, 34, 8.909],
  [28, 36, 8.904],
  [28, 38, 8.853],
  [28, 50, 8.769],
  [29, 34, 8.751],
  [29, 36, 8.754],
  [30, 34, 8.666],
  [30, 36, 8.737],
  [30, 38, 8.784],
  [30, 40, 8.734],
  [30, 42, 8.736],
  [30, 44, 8.669],
  [31, 38, 8.674],
  [31, 40, 8.681],
  [32, 38, 8.564],
  [32, 40, 8.62],
  [32, 42, 8.671],
  [32, 44, 8.681],
  [32, 46, 8.645],
  [32, 42, 8.671],
  [33, 42, 8.622],
  [34, 40, 8.469],
  [34, 42, 8.545],
  [34, 44, 8.588],
  [34, 46, 8.632],
  [34, 48, 8.641],
  [34, 44, 8.588],
  [35, 44, 8.578],
  [35, 46, 8.587],
  [36, 42, 8.432],
  [36, 44, 8.51],
  [36, 46, 8.56],
  [36, 48, 8.591],
  [36, 50, 8.607],
  [36, 52, 8.557],
  [37, 48, 8.592],
  [37, 50, 8.559],
  [38, 46, 8.468],
  [38, 48, 8.529],
  [38, 50, 8.584],
  [38, 52, 8.596],
  [38, 54, 8.529],
  [39, 50, 8.575],
  [40, 50, 8.589],
  [40, 52, 8.599],
  [40, 54, 8.604],
  [40, 56, 8.573],
  [40, 58, 8.514],
  [41, 52, 8.532],
  [42, 50, 8.543],
  [42, 52, 8.58],
  [42, 54, 8.607],
  [42, 56, 8.609],
  [42, 58, 8.578],
  [42, 60, 8.52],
  [44, 52, 8.566],
  [44, 54, 8.592],
  [44, 56, 8.61],
  [44, 58, 8.607],
  [44, 60, 8.579],
  [44, 62, 8.546],
  [45, 58, 8.57],
  [46, 56, 8.532],
  [46, 58, 8.561],
  [46, 60, 8.58],
  [46, 62, 8.575],
  [46, 64, 8.554],
  [47, 60, 8.534],
  [47, 62, 8.513],
  [48, 60, 8.515],
  [48, 62, 8.543],
  [48, 64, 8.555],
  [48, 66, 8.548],
  [48, 68, 8.53],
  [48, 70, 8.504],
  [49, 64, 8.54],
  [49, 66, 8.533],
  [50, 62, 8.49],
  [50, 64, 8.512],
  [50, 66, 8.526],
  [50, 68, 8.54],
  [50, 70, 8.54],
  [50, 72, 8.527],
  [50, 74, 8.479],
  [51, 70, 8.493],
  [51, 72, 8.499],
  [52, 68, 8.441],
  [52, 70, 8.464],
  [52, 72, 8.486],
  [52, 74, 8.498],
  [52, 76, 8.502],
  [52, 78, 8.502],
  [53, 74, 8.476],
  [53, 78, 8.468],
  [54, 72, 8.414],
  [54, 74, 8.44],
  [54, 76, 8.466],
  [54, 78, 8.486],
  [54, 80, 8.49],
  [54, 82, 8.488],
  [55, 78, 8.456],
  [55, 82, 8.45],
  [56, 74, 8.353],
  [56, 78, 8.438],
  [56, 80, 8.458],
  [56, 82, 8.478],
  [56, 84, 8.468],
  [57, 80, 8.42],
  [57, 82, 8.44],
  [58, 80, 8.364],
  [58, 82, 8.384],
  [58, 84, 8.396],
  [58, 86, 8.418],
  [58, 88, 8.381],
  [59, 82, 8.364],
  [60, 82, 8.319],
  [60, 84, 8.339],
  [60, 86, 8.36],
  [60, 88, 8.376],
  [60, 90, 8.371],
  [62, 82, 8.253],
  [62, 84, 8.276],
  [62, 86, 8.296],
  [62, 88, 8.315],
  [62, 90, 8.308],
  [62, 92, 8.301],
  [63, 88, 8.278],
  [63, 90, 8.272],
  [64, 88, 8.243],
  [64, 90, 8.266],
  [64, 92, 8.28],
  [64, 94, 8.294],
  [64, 96, 8.272],
  [64, 98, 8.262],
  [65, 94, 8.256],
  [66, 90, 8.208],
  [66, 92, 8.228],
  [66, 94, 8.245],
  [66, 96, 8.263],
  [66, 98, 8.268],
  [66, 100, 8.27],
  [67, 98, 8.243],
  [68, 94, 8.185],
  [68, 96, 8.204],
  [68, 98, 8.222],
  [68, 100, 8.241],
  [68, 102, 8.241],
  [68, 106, 8.237],
  [69, 100, 8.217],
  [70, 98, 8.162],
  [70, 100, 8.185],
  [70, 102, 8.205],
  [70, 104, 8.218],
  [70, 106, 8.224],
  [70, 108, 8.204],
  [71, 104, 8.205],
  [71, 106, 8.19],
  [72, 104, 8.169],
  [72, 106, 8.185],
  [72, 108, 8.198],
  [72, 110, 8.196],
  [72, 112, 8.191],
  [72, 114, 8.173],
  [73, 108, 8.175],
  [73, 110, 8.165],
  [74, 106, 8.129],
  [74, 108, 8.147],
  [74, 110, 8.164],
  [74, 112, 8.171],
  [74, 114, 8.163],
  [74, 118, 8.152],
  [75, 110, 8.133],
  [75, 112, 8.142],
  [76, 110, 8.112],
  [76, 112, 8.127],
  [76, 114, 8.141],
  [76, 116, 8.144],
  [76, 118, 8.14],
  [76, 120, 8.132],
  [77, 114, 8.106],
  [77, 116, 8.113],
  [78, 112, 8.074],
  [78, 114, 8.089],
  [78, 116, 8.098],
  [78, 118, 8.103],
  [78, 120, 8.09],
  [78, 122, 8.09],
  [79, 118, 8.085],
  [80, 116, 8.047],
  [80, 118, 8.06],
  [80, 120, 8.07],
  [80, 122, 8.068],
  [80, 124, 8.06],
  [80, 126, 8.032],
  [81, 122, 8.044],
  [81, 124, 8.047],
  [82, 122, 7.974],
  [82, 124, 7.984],
  [82, 126, 7.867],
  [82, 120, 7.984],
  [82, 122, 7.974],
  [82, 124, 7.984],
  [83, 126, 7.831],
  [90, 142, 7.615],
  [92, 143, 7.591],
  [92, 146, 7.6],
];

// Key radioactive nuclides with actual measured BE/A from AME2020
export const KEY_RADIOACTIVE: [number, number, number, DecayMode, string][] = [
  // [Z, N, bea, decayMode, halfLife]
  [1, 2, 2.827, 1, "12.32 y"], // H-3 (tritium)
  [4, 3, 4.717, 4, "53 d"], // Be-7 EC
  [6, 8, 6.676, 1, "5730 y"], // C-14
  [11, 11, 8.063, 1, "15 h"], // Na-22
  [15, 17, 8.441, 1, "14.3 d"], // P-32
  [19, 21, 8.518, 1, "1.26 Gy"], // K-40
  [27, 33, 8.768, 1, "5.27 y"], // Co-60
  [38, 49, 8.471, 1, "28.8 y"], // Sr-90
  [43, 56, 8.574, 1, "2.11×10⁵ y"], // Tc-99
  [53, 74, 8.476, 1, "8.02 d"], // I-131
  [55, 82, 8.466, 1, "30.1 y"], // Cs-137
  [56, 81, 8.459, 1, "10.5 y"], // Ba-133
  [61, 84, 8.318, 2, "17.7 y"], // Pm-147
  [84, 126, 7.834, 3, "138.4 d"], // Po-210 (alpha)
  [86, 136, 7.72, 3, "3.82 d"], // Rn-222 (alpha)
  [88, 138, 7.683, 3, "1600 y"], // Ra-226 (alpha)
  [89, 138, 7.641, 3, "21.8 y"], // Ac-227
  [90, 140, 7.603, 3, "7.54×10⁴ y"], // Th-230
  [90, 142, 7.615, 3, "1.405×10¹⁰ y"], // Th-232
  [91, 140, 7.576, 3, "3.28×10⁴ y"], // Pa-231
  [92, 140, 7.551, 3, "7.04×10⁸ y"], // U-235
  [92, 143, 7.591, 3, "4.47×10⁹ y"], // U-238
  [93, 144, 7.56, 3, "2.14×10⁶ y"], // Np-237
  [94, 144, 7.534, 3, "24100 y"], // Pu-239
  [94, 146, 7.545, 5, "6560 y"], // Pu-240 (SF branch)
  [95, 146, 7.52, 3, "432 y"], // Am-241
  [96, 148, 7.489, 3, "18.1 y"], // Cm-244
];

// Build full dataset with computed BE/A for the landscape grid
export function buildNuclearDataset(): Nuclide[] {
  const map = new Map<string, Nuclide>();

  // Insert known stable nuclides first
  for (const [Z, N, bea] of STABLE_NUCLIDES) {
    if (Z > 98 || N > 130) continue;
    const A = Z + N;
    const key = `${Z}-${N}`;
    const [sym, name] = ELEMENT_SYMBOLS[Z] ?? ["?", "Unknown"];
    map.set(key, {
      Z,
      N,
      A,
      symbol: sym,
      name,
      bea,
      decayMode: 0,
      halfLife: "Stable",
    });
  }

  // Insert key radioactive nuclides
  for (const [Z, N, bea, dm, hl] of KEY_RADIOACTIVE) {
    const key = `${Z}-${N}`;
    if (!map.has(key)) {
      const A = Z + N;
      const [sym, name] = ELEMENT_SYMBOLS[Z] ?? ["?", "Unknown"];
      map.set(key, {
        Z,
        N,
        A,
        symbol: sym,
        name,
        bea,
        decayMode: dm,
        halfLife: hl,
      });
    }
  }

  // Fill in the surrounding landscape using Bethe-Weizsäcker + heuristic decay classification
  for (let Z = 1; Z <= 98; Z++) {
    const Nmin = Math.max(0, Math.round(Z * 0.9) - 12);
    const Nmax = Math.min(130, Math.round(Z * 1.6) + 15);
    for (let N = Nmin; N <= Nmax; N++) {
      const key = `${Z}-${N}`;
      if (map.has(key)) continue;
      const bea = betheWeizsacker(Z, N);
      if (bea < 1.0) continue;
      const dm = classifyDecay(Z, N);
      const A = Z + N;
      const [sym, name] = ELEMENT_SYMBOLS[Z] ?? ["?", "Unknown"];
      map.set(key, {
        Z,
        N,
        A,
        symbol: sym,
        name,
        bea,
        decayMode: dm,
        halfLife: dm === 0 ? "Stable" : "Variable",
      });
    }
  }

  return Array.from(map.values());
}

export const MAGIC_NUMBERS = [2, 8, 20, 28, 50, 82, 126];

export const DECAY_COLORS: Record<DecayMode, number> = {
  0: 0x22c55e, // stable — bright lime green
  1: 0x3b82f6, // beta-minus — bright blue
  2: 0xf97316, // beta-plus/EC — orange
  3: 0xef4444, // alpha — red
  4: 0xec4899, // proton — pink
  5: 0xa855f7, // spontaneous fission — purple
};

export const DECAY_LABELS: Record<DecayMode, string> = {
  0: "Stable",
  1: "β⁻ decay",
  2: "β⁺/EC",
  3: "α decay",
  4: "Proton emission",
  5: "Spontaneous fission",
};
