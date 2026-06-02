import { r as reactExports, j as jsxRuntimeExports, P as PageHeader, S as SectionCard, E as EquationBlock } from "./index-DTpTSWSe.js";
import { C as CollapsibleSection } from "./CollapsibleSection-DYK90tLB.js";
import { V as Vector3, W as WebGLRenderer, S as Scene, g as FogExp2, P as PerspectiveCamera, A as AmbientLight, D as DirectionalLight, h as PointLight, G as GridHelper, f as LineBasicMaterial, B as BufferGeometry, L as Line, C as Color, i as Float32BufferAttribute, j as ShaderMaterial, k as AdditiveBlending, e as Points, l as Group, m as MeshBasicMaterial, n as DoubleSide, o as PlaneGeometry, b as Mesh, a as SphereGeometry, p as MeshPhongMaterial, R as RingGeometry, q as MeshLambertMaterial, r as WireframeGeometry, s as LineSegments, t as Raycaster, u as Vector2 } from "./three.module-CiciN0sv.js";
import { O as OrbitControls } from "./OrbitControls-KJm8zQ2Z.js";
const ELEMENT_SYMBOLS = {
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
  98: ["Cf", "Californium"]
};
function betheWeizsacker(Z, N) {
  const A = Z + N;
  if (A <= 0) return 0;
  const av = 15.75;
  const ap = 11.2;
  const volumeTerm = av;
  const surfaceTerm = -17.8 * A ** (-1 / 3);
  const coulombTerm = -0.711 * Z * (Z - 1) * A ** (-4 / 3);
  const asymmetryTerm = -23.7 * (N - Z) ** 2 / (A * A);
  let pairingTerm = 0;
  if (Z % 2 === 0 && N % 2 === 0) pairingTerm = ap * A ** (-3 / 2);
  else if (Z % 2 !== 0 && N % 2 !== 0) pairingTerm = -ap * A ** (-3 / 2);
  const bea = volumeTerm + surfaceTerm + coulombTerm + asymmetryTerm + pairingTerm;
  return Math.max(0, bea);
}
function classifyDecay(Z, N) {
  const A = Z + N;
  if (A < 2) return 0;
  if (Z > 83 || A > 209) {
    if (A > 250) return 5;
    if (Z > 82) return 3;
  }
  if (Z > 0 && N > 0) {
    const Zv = A / (1.98 + 0.015 * A ** (2 / 3));
    const delta = Z - Zv;
    if (delta > 5) return 4;
    if (delta > 1.2) return 2;
    if (delta < -1.2) return 1;
    return 0;
  }
  return 0;
}
const STABLE_NUCLIDES = [
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
  [92, 146, 7.6]
];
const KEY_RADIOACTIVE = [
  // [Z, N, bea, decayMode, halfLife]
  [1, 2, 2.827, 1, "12.32 y"],
  // H-3 (tritium)
  [4, 3, 4.717, 4, "53 d"],
  // Be-7 EC
  [6, 8, 6.676, 1, "5730 y"],
  // C-14
  [11, 11, 8.063, 1, "15 h"],
  // Na-22
  [15, 17, 8.441, 1, "14.3 d"],
  // P-32
  [19, 21, 8.518, 1, "1.26 Gy"],
  // K-40
  [27, 33, 8.768, 1, "5.27 y"],
  // Co-60
  [38, 49, 8.471, 1, "28.8 y"],
  // Sr-90
  [43, 56, 8.574, 1, "2.11×10⁵ y"],
  // Tc-99
  [53, 74, 8.476, 1, "8.02 d"],
  // I-131
  [55, 82, 8.466, 1, "30.1 y"],
  // Cs-137
  [56, 81, 8.459, 1, "10.5 y"],
  // Ba-133
  [61, 84, 8.318, 2, "17.7 y"],
  // Pm-147
  [84, 126, 7.834, 3, "138.4 d"],
  // Po-210 (alpha)
  [86, 136, 7.72, 3, "3.82 d"],
  // Rn-222 (alpha)
  [88, 138, 7.683, 3, "1600 y"],
  // Ra-226 (alpha)
  [89, 138, 7.641, 3, "21.8 y"],
  // Ac-227
  [90, 140, 7.603, 3, "7.54×10⁴ y"],
  // Th-230
  [90, 142, 7.615, 3, "1.405×10¹⁰ y"],
  // Th-232
  [91, 140, 7.576, 3, "3.28×10⁴ y"],
  // Pa-231
  [92, 140, 7.551, 3, "7.04×10⁸ y"],
  // U-235
  [92, 143, 7.591, 3, "4.47×10⁹ y"],
  // U-238
  [93, 144, 7.56, 3, "2.14×10⁶ y"],
  // Np-237
  [94, 144, 7.534, 3, "24100 y"],
  // Pu-239
  [94, 146, 7.545, 5, "6560 y"],
  // Pu-240 (SF branch)
  [95, 146, 7.52, 3, "432 y"],
  // Am-241
  [96, 148, 7.489, 3, "18.1 y"]
  // Cm-244
];
function buildNuclearDataset() {
  const map = /* @__PURE__ */ new Map();
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
      halfLife: "Stable"
    });
  }
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
        halfLife: hl
      });
    }
  }
  for (let Z = 1; Z <= 98; Z++) {
    const Nmin = Math.max(0, Math.round(Z * 0.9) - 12);
    const Nmax = Math.min(130, Math.round(Z * 1.6) + 15);
    for (let N = Nmin; N <= Nmax; N++) {
      const key = `${Z}-${N}`;
      if (map.has(key)) continue;
      const bea = betheWeizsacker(Z, N);
      if (bea < 1) continue;
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
        halfLife: dm === 0 ? "Stable" : "Variable"
      });
    }
  }
  return Array.from(map.values());
}
const MAGIC_NUMBERS = [2, 8, 20, 28, 50, 82, 126];
const DECAY_COLORS = {
  0: 2278750,
  // stable — bright lime green
  1: 3900150,
  // beta-minus — bright blue
  2: 16347926,
  // beta-plus/EC — orange
  3: 15680580,
  // alpha — red
  4: 15485081,
  // proton — pink
  5: 11032055
  // spontaneous fission — purple
};
const DECAY_LABELS = {
  0: "Stable",
  1: "β⁻ decay",
  2: "β⁺/EC",
  3: "α decay",
  4: "Proton emission",
  5: "Spontaneous fission"
};
const N_SCALE = 0.12;
const Z_SCALE = 0.15;
const BEA_SCALE = 0.9;
const N_OFFSET = -7.8;
const Z_OFFSET = -7.5;
function nuclideTo3D(nuc) {
  return [
    nuc.N * N_SCALE + N_OFFSET,
    nuc.bea * BEA_SCALE,
    nuc.Z * Z_SCALE + Z_OFFSET
  ];
}
const LEGEND_ITEMS = [
  [0, "Stable"],
  [1, "β⁻ decay"],
  [2, "β⁺/EC"],
  [3, "α decay"],
  [4, "Proton emitter"],
  [5, "Spont. Fission"]
];
const LEGEND_HEX = {
  0: "#22c55e",
  1: "#3b82f6",
  2: "#f97316",
  3: "#ef4444",
  4: "#ec4899",
  5: "#a855f7"
};
const MAGIC_Z_LABELS = {
  2: "He",
  8: "O",
  20: "Ca",
  28: "Ni",
  50: "Sn",
  82: "Pb",
  114: "Fl"
};
function ValleyOfStability() {
  const mountRef = reactExports.useRef(null);
  const rendererRef = reactExports.useRef(null);
  const sceneRef = reactExports.useRef(null);
  const cameraRef = reactExports.useRef(null);
  const controlsRef = reactExports.useRef(null);
  const frameRef = reactExports.useRef(0);
  const autoRotateTimerRef = reactExports.useRef(null);
  const pointsRef = reactExports.useRef(null);
  const stabilityLineRef = reactExports.useRef(null);
  const magicPlanesRef = reactExports.useRef(null);
  const iron56Ref = reactExports.useRef(null);
  const dripLinesRef = reactExports.useRef(null);
  const zLabelsRef = reactExports.useRef([]);
  const nuclidesRef = reactExports.useRef([]);
  const [selected, setSelected] = reactExports.useState(null);
  const [controls, setControls] = reactExports.useState({
    showDecayColors: true,
    showStabilityCurve: true,
    showMagicPlanes: false,
    showIron56: true,
    showDripLines: true,
    decayFilters: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true }
  });
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  const toggleControl = (key) => {
    setControls((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleDecayFilter = (dm) => {
    setControls((prev) => ({
      ...prev,
      decayFilters: { ...prev.decayFilters, [dm]: !prev.decayFilters[dm] }
    }));
  };
  const animateCameraTo = reactExports.useCallback(
    (targetPos, lookAt) => {
      if (!cameraRef.current || !controlsRef.current) return;
      const cam = cameraRef.current;
      const startPos = cam.position.clone();
      const endPos = new Vector3(...targetPos);
      const startTarget = controlsRef.current.target.clone();
      const endTarget = new Vector3(...lookAt);
      const duration = 1200;
      const startTime = performance.now();
      const tick = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
        cam.position.lerpVectors(startPos, endPos, ease);
        controlsRef.current.target.lerpVectors(startTarget, endTarget, ease);
        controlsRef.current.update();
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    []
  );
  reactExports.useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const renderer = new WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(329744, 1);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const scene = new Scene();
    scene.fog = new FogExp2(329744, 0.018);
    sceneRef.current = scene;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new PerspectiveCamera(55, aspect, 0.1, 200);
    camera.position.set(6, 12, 18);
    cameraRef.current = camera;
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.06;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 40;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 0.4;
    controlsRef.current = orbitControls;
    scene.add(new AmbientLight(1714762, 2.5));
    const dirLight = new DirectionalLight(8956671, 3);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);
    const rimLight = new DirectionalLight(4482815, 1.5);
    rimLight.position.set(-8, 5, -8);
    scene.add(rimLight);
    const pointLight = new PointLight(43775, 2, 30);
    pointLight.position.set(0, 6, 0);
    scene.add(pointLight);
    const gridHelper = new GridHelper(28, 30, 1122884, 662067);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);
    const axisMat = new LineBasicMaterial({
      color: 3359863,
      linewidth: 1
    });
    const xAxis = new BufferGeometry().setFromPoints([
      new Vector3(-8, 0, -7.5),
      new Vector3(8, 0, -7.5)
    ]);
    scene.add(new Line(xAxis, axisMat));
    const zAxis = new BufferGeometry().setFromPoints([
      new Vector3(-8, 0, -7.5),
      new Vector3(-8, 0, 7.5)
    ]);
    scene.add(new Line(zAxis, axisMat));
    const nuclides = buildNuclearDataset();
    nuclidesRef.current = nuclides;
    const positions = [];
    const colors = [];
    const sizes = [];
    for (const nuc of nuclides) {
      const [x, y, z] = nuclideTo3D(nuc);
      positions.push(x, y, z);
      const col = new Color(DECAY_COLORS[nuc.decayMode]);
      colors.push(col.r, col.g, col.b);
      sizes.push(nuc.decayMode === 0 ? 18 : 10);
    }
    const geom = new BufferGeometry();
    geom.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    geom.setAttribute("color", new Float32BufferAttribute(colors, 3));
    geom.setAttribute("size", new Float32BufferAttribute(sizes, 1));
    const shaderMat = new ShaderMaterial({
      uniforms: { useColors: { value: 1 }, opacity: { value: 0.92 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vSize;
        void main() {
          vColor = color;
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float opacity;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float alpha = (1.0 - d * d) * opacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending
    });
    const points = new Points(geom, shaderMat);
    scene.add(points);
    pointsRef.current = points;
    const dripGroup = new Group();
    const protonDripPoints = [];
    const neutronDripPoints = [];
    const zMap = /* @__PURE__ */ new Map();
    for (const nuc of nuclides) {
      const entry = zMap.get(nuc.Z);
      if (!entry) {
        zMap.set(nuc.Z, { minN: nuc.N, maxN: nuc.N });
      } else {
        entry.minN = Math.min(entry.minN, nuc.N);
        entry.maxN = Math.max(entry.maxN, nuc.N);
      }
    }
    for (let Z = 1; Z <= 98; Z++) {
      const entry = zMap.get(Z);
      if (!entry) continue;
      const [px, py, pz] = nuclideTo3D({
        Z,
        N: entry.minN,
        bea: betheWeizsacker(Z, entry.minN)
      });
      protonDripPoints.push(new Vector3(px, py + 0.05, pz));
      const [nx, ny, nz] = nuclideTo3D({
        Z,
        N: entry.maxN,
        bea: betheWeizsacker(Z, entry.maxN)
      });
      neutronDripPoints.push(new Vector3(nx, ny + 0.05, nz));
    }
    const protonDripGeom = new BufferGeometry().setFromPoints(
      protonDripPoints
    );
    const protonDripMat = new LineBasicMaterial({
      color: 16766720,
      transparent: true,
      opacity: 0.9
    });
    const protonDripLine = new Line(protonDripGeom, protonDripMat);
    dripGroup.add(protonDripLine);
    const neutronDripGeom = new BufferGeometry().setFromPoints(
      neutronDripPoints
    );
    const neutronDripMat = new LineBasicMaterial({
      color: 65535,
      transparent: true,
      opacity: 0.9
    });
    const neutronDripLine = new Line(neutronDripGeom, neutronDripMat);
    dripGroup.add(neutronDripLine);
    scene.add(dripGroup);
    dripLinesRef.current = dripGroup;
    const stableNuclides = nuclides.filter((n) => n.decayMode === 0).sort((a, b) => a.N - b.N);
    const linePoints = stableNuclides.map((n) => {
      const [x, y, z] = nuclideTo3D(n);
      return new Vector3(x, y + 0.05, z);
    });
    const lineGeom = new BufferGeometry().setFromPoints(linePoints);
    const lineMat = new LineBasicMaterial({
      color: 16777215,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const stabilityLine = new Line(lineGeom, lineMat);
    scene.add(stabilityLine);
    stabilityLineRef.current = stabilityLine;
    const magicGroup = new Group();
    const nPlaneMat = new MeshBasicMaterial({
      color: 4491519,
      transparent: true,
      opacity: 0.06,
      side: DoubleSide
    });
    const nPlaneEdgeMat = new LineBasicMaterial({
      color: 4491519,
      transparent: true,
      opacity: 0.3
    });
    const zPlaneMat = new MeshBasicMaterial({
      color: 16746564,
      transparent: true,
      opacity: 0.06,
      side: DoubleSide
    });
    const zPlaneEdgeMat = new LineBasicMaterial({
      color: 16746564,
      transparent: true,
      opacity: 0.3
    });
    for (const m of MAGIC_NUMBERS) {
      if (m > 130) continue;
      const nx = m * N_SCALE + N_OFFSET;
      const nPlaneGeom = new PlaneGeometry(0.05, 10);
      const nPlane = new Mesh(nPlaneGeom, nPlaneMat);
      nPlane.rotation.y = Math.PI / 2;
      nPlane.position.set(nx, 3.5, 0);
      magicGroup.add(nPlane);
      const nEdgePoints = [
        new Vector3(nx, 0, -7),
        new Vector3(nx, 7, -7),
        new Vector3(nx, 7, 7),
        new Vector3(nx, 0, 7)
      ];
      const nEdgeGeom = new BufferGeometry().setFromPoints(nEdgePoints);
      magicGroup.add(new Line(nEdgeGeom, nPlaneEdgeMat));
    }
    for (const m of [2, 8, 20, 28, 50, 82, 114]) {
      const nz = m * Z_SCALE + Z_OFFSET;
      const zPlaneGeom = new PlaneGeometry(10, 0.05);
      const zPlane = new Mesh(zPlaneGeom, zPlaneMat);
      zPlane.rotation.x = Math.PI / 2;
      zPlane.position.set(0, 3.5, nz);
      magicGroup.add(zPlane);
      const zEdgePoints = [
        new Vector3(-8, 0, nz),
        new Vector3(-8, 7, nz),
        new Vector3(8, 7, nz),
        new Vector3(8, 0, nz)
      ];
      const zEdgeGeom = new BufferGeometry().setFromPoints(zEdgePoints);
      magicGroup.add(new Line(zEdgeGeom, zPlaneEdgeMat));
      const labelDiv = document.createElement("div");
      labelDiv.className = "magic-label";
      labelDiv.textContent = `Z=${m} (${MAGIC_Z_LABELS[m] ?? ""})`;
      labelDiv.style.cssText = "position:absolute;color:#ffaa66;font-size:10px;font-family:monospace;pointer-events:none;text-shadow:0 0 4px #ff8844;white-space:nowrap;";
      container.appendChild(labelDiv);
      zLabelsRef.current.push({ div: labelDiv, z: nz });
    }
    scene.add(magicGroup);
    magicPlanesRef.current = magicGroup;
    const fe56 = nuclides.find((n) => n.Z === 26 && n.N === 30);
    if (fe56) {
      const [x, y, z] = nuclideTo3D(fe56);
      const sphereGeom = new SphereGeometry(0.18, 16, 16);
      const sphereMat = new MeshPhongMaterial({
        color: 16768256,
        emissive: 16755200,
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.9
      });
      const sphere = new Mesh(sphereGeom, sphereMat);
      sphere.position.set(x, y + 0.1, z);
      scene.add(sphere);
      iron56Ref.current = sphere;
      const ringGeom = new RingGeometry(0.22, 0.38, 32);
      const ringMat = new MeshBasicMaterial({
        color: 16768256,
        transparent: true,
        opacity: 0.4,
        side: DoubleSide
      });
      const ring = new Mesh(ringGeom, ringMat);
      ring.position.set(x, y + 0.08, z);
      ring.rotation.x = -Math.PI / 2;
      scene.add(ring);
    }
    const meshW = 130;
    const meshH = 98;
    const landscapeGeom = new PlaneGeometry(
      meshW * N_SCALE,
      meshH * Z_SCALE,
      meshW - 1,
      meshH - 1
    );
    landscapeGeom.rotateX(-Math.PI / 2);
    const posAttr = landscapeGeom.attributes.position;
    const lColors = [];
    const nMap = /* @__PURE__ */ new Map();
    for (const nuc of nuclides) nMap.set(`${nuc.N}-${nuc.Z}`, nuc);
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const N = Math.round((x - N_OFFSET) / N_SCALE);
      const Z = Math.round((z - Z_OFFSET) / Z_SCALE);
      const nuc = nMap.get(`${N}-${Z}`);
      const bea = nuc ? nuc.bea : 0;
      posAttr.setY(i, bea * BEA_SCALE - 0.08);
      const t = Math.max(0, Math.min(1, bea / 9));
      const c = new Color();
      c.setHSL(0.6 - t * 0.5, 0.7, 0.1 + t * 0.2);
      lColors.push(c.r, c.g, c.b);
    }
    landscapeGeom.setAttribute(
      "color",
      new Float32BufferAttribute(lColors, 3)
    );
    landscapeGeom.computeVertexNormals();
    const landscapeMat = new MeshLambertMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      side: DoubleSide
    });
    const landscapeMesh = new Mesh(landscapeGeom, landscapeMat);
    scene.add(landscapeMesh);
    const wireGeom = new WireframeGeometry(landscapeGeom);
    const wireMat = new LineBasicMaterial({
      color: 1717094,
      transparent: true,
      opacity: 0.12
    });
    scene.add(new LineSegments(wireGeom, wireMat));
    const raycaster = new Raycaster();
    raycaster.params.Points = { threshold: 0.22 };
    const handleClick = (e) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new Vector2(
        (e.clientX - rect.left) / rect.width * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(points);
      if (hits.length > 0 && hits[0].index !== void 0) {
        const nuc = nuclidesRef.current[hits[0].index];
        if (nuc) setSelected(nuc);
      }
    };
    renderer.domElement.addEventListener("click", handleClick);
    const pauseRotate = () => {
      if (controlsRef.current) controlsRef.current.autoRotate = false;
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setTimeout(() => {
        if (controlsRef.current) controlsRef.current.autoRotate = true;
      }, 4e3);
    };
    renderer.domElement.addEventListener("pointerdown", pauseRotate);
    renderer.domElement.addEventListener("wheel", pauseRotate);
    const updateLabels = () => {
      if (!cameraRef.current || !mountRef.current) return;
      const cam = cameraRef.current;
      const rect = mountRef.current.getBoundingClientRect();
      for (const lbl of zLabelsRef.current) {
        const pos = new Vector3(0, 6.5, lbl.z);
        pos.project(cam);
        const x = (pos.x * 0.5 + 0.5) * rect.width;
        const y = (-pos.y * 0.5 + 0.5) * rect.height;
        lbl.div.style.left = `${x}px`;
        lbl.div.style.top = `${y}px`;
        lbl.div.style.transform = "translate(-50%, -100%)";
        lbl.div.style.display = pos.z < 1 ? "block" : "none";
      }
    };
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      orbitControls.update();
      if (iron56Ref.current) {
        const t = performance.now() * 2e-3;
        const mat = iron56Ref.current.material;
        mat.emissiveIntensity = 1.5 + Math.sin(t) * 1;
      }
      updateLabels();
      renderer.render(scene, camera);
    };
    animate();
    setIsLoaded(true);
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("pointerdown", pauseRotate);
      renderer.domElement.removeEventListener("wheel", pauseRotate);
      renderer.dispose();
      for (const lbl of zLabelsRef.current) lbl.div.remove();
      zLabelsRef.current = [];
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, []);
  reactExports.useEffect(() => {
    if (stabilityLineRef.current)
      stabilityLineRef.current.visible = controls.showStabilityCurve;
    if (magicPlanesRef.current)
      magicPlanesRef.current.visible = controls.showMagicPlanes;
    if (iron56Ref.current) iron56Ref.current.visible = controls.showIron56;
    if (dripLinesRef.current)
      dripLinesRef.current.visible = controls.showDripLines;
  }, [
    controls.showStabilityCurve,
    controls.showMagicPlanes,
    controls.showIron56,
    controls.showDripLines
  ]);
  reactExports.useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const sizeAttr = geom.attributes.size;
    if (!sizeAttr) return;
    const nuclides = nuclidesRef.current;
    for (let i = 0; i < nuclides.length; i++) {
      const dm = nuclides[i].decayMode;
      const visible = controls.decayFilters[dm];
      sizeAttr.setX(i, visible ? dm === 0 ? 18 : 10 : 0);
    }
    sizeAttr.needsUpdate = true;
  }, [controls.decayFilters]);
  reactExports.useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const colAttr = geom.attributes.color;
    if (!colAttr) return;
    const nuclides = nuclidesRef.current;
    for (let i = 0; i < nuclides.length; i++) {
      const nuc = nuclides[i];
      let hex;
      if (controls.showDecayColors) {
        hex = DECAY_COLORS[nuc.decayMode];
      } else {
        const t = Math.min(1, nuc.bea / 9);
        hex = new Color().setHSL(0.6 - t * 0.55, 0.9, 0.3 + t * 0.4).getHex();
      }
      const c = new Color(hex);
      colAttr.setXYZ(i, c.r, c.g, c.b);
    }
    colAttr.needsUpdate = true;
  }, [controls.showDecayColors]);
  const navigateToDecayChain = reactExports.useCallback((nuc) => {
    const sym = `${nuc.A}${nuc.symbol}`;
    window.location.href = `/visualizations/decay-chain?nuclide=${encodeURIComponent(sym)}`;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6 pb-2 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Valley of Stability",
        subtitle: "The 3D nuclear landscape — binding energy per nucleon across all known nuclides. The valley floor traces the stable isotopes; the walls reveal where nuclei decay toward stability.",
        audienceLevel: "professional"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-4 px-4 pb-4 md:px-8 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-h-[480px] lg:min-h-[640px] rounded-xl overflow-hidden border border-border shadow-glow-accent bg-[#050810]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: mountRef,
            className: "w-full h-full",
            "data-ocid": "valley.canvas_target"
          }
        ),
        !isLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Building nuclear landscape…" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute bottom-14 left-4 right-4 flex justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "N = 0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "← Neutron Number (N) →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "N = 130" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/60 font-mono", children: "Height = Binding Energy / Nucleon (MeV) · Color = Decay Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1.5 font-semibold uppercase tracking-wider", children: "Decay Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: LEGEND_ITEMS.map(([dm, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-2 w-2 rounded-full flex-shrink-0",
                style: { backgroundColor: LEGEND_HEX[dm] }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-foreground/80", children: label })
          ] }, dm)) })
        ] }),
        controls.showIron56 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-2.5 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-yellow-400", children: "★ Fe-56 Peak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-yellow-300/70", children: "BE/A = 8.790 MeV" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 flex gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresetButton,
            {
              label: "Top View",
              onClick: () => animateCameraTo([0, 18, 0.1], [0, 0, 0]),
              ocid: "valley.preset.top"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresetButton,
            {
              label: "Side View",
              onClick: () => animateCameraTo([0, 6, 22], [0, 3, 0]),
              ocid: "valley.preset.side"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresetButton,
            {
              label: "Fe-56 Focus",
              onClick: () => {
                const fe56 = nuclidesRef.current.find(
                  (n) => n.Z === 26 && n.N === 30
                );
                if (fe56) {
                  const [x, y, z] = nuclideTo3D(fe56);
                  animateCameraTo([x + 3, y + 5, z + 3], [x, y, z]);
                }
              },
              ocid: "valley.preset.fe56"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresetButton,
            {
              label: "Reset",
              onClick: () => animateCameraTo([6, 12, 18], [0, 3, 0]),
              ocid: "valley.preset.reset"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full lg:w-72 xl:w-80 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "valley.controls.panel", glowAccent: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🎛" }),
            " Visualization Controls"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleButton,
              {
                active: controls.showDecayColors,
                onClick: () => toggleControl("showDecayColors"),
                label: "Decay Mode Colors",
                ocid: "valley.toggle.decay_colors"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleButton,
              {
                active: controls.showStabilityCurve,
                onClick: () => toggleControl("showStabilityCurve"),
                label: "Valley Stability Curve",
                ocid: "valley.toggle.stability_curve"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleButton,
              {
                active: controls.showMagicPlanes,
                onClick: () => toggleControl("showMagicPlanes"),
                label: "Magic Number Planes",
                ocid: "valley.toggle.magic_planes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleButton,
              {
                active: controls.showIron56,
                onClick: () => toggleControl("showIron56"),
                label: "Iron-56 Highlight",
                ocid: "valley.toggle.iron56"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleButton,
              {
                active: controls.showDripLines,
                onClick: () => toggleControl("showDripLines"),
                label: "Drip Lines",
                ocid: "valley.toggle.drip_lines"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] text-muted-foreground", children: "🖱 Drag to rotate · Scroll to zoom · Click any point to inspect" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "valley.decay_filters.panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🔘" }),
            " Decay Mode Filters"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: LEGEND_ITEMS.map(([dm, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer",
              "data-ocid": `valley.filter.decay_${dm}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: controls.decayFilters[dm],
                    onChange: () => toggleDecayFilter(dm),
                    className: "h-3.5 w-3.5 rounded border-border accent-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2 w-2 rounded-full flex-shrink-0",
                    style: { backgroundColor: LEGEND_HEX[dm] }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80", children: label })
              ]
            },
            dm
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "valley.inspector.panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🔬" }),
            " Nuclide Inspector"
          ] }),
          selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            NuclideInspector,
            {
              nuclide: selected,
              onDecayChain: navigateToDecayChain
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-6",
              "data-ocid": "valley.inspector.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2 opacity-40", children: "⚛" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click any point on the landscape to inspect a nuclide" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "✨" }),
            " Magic Numbers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: MAGIC_NUMBERS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-bold",
              children: m
            },
            m
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] text-muted-foreground leading-relaxed", children: "Nuclei with these proton or neutron counts have extra-filled shells, giving them enhanced binding energy and stability — analogous to noble gases in chemistry." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 md:px-8 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "valley-explanation",
          title: "Why does the Valley of Stability exist?",
          defaultOpen: true,
          "data-ocid": "valley.explanation.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-sm prose-invert max-w-none space-y-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Valley of Stability" }),
              " ",
              "arises from the competition between two fundamental nuclear forces: the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "strong nuclear force" }),
              " (which binds nucleons together, favouring equal numbers of protons and neutrons for light nuclei) and the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Coulomb repulsion" }),
              " between protons (which grows as Z², pushing heavy nuclei toward neutron-rich compositions)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The valley floor — the region of highest binding energy per nucleon — traces the line of maximum stability for each mass number A. Nuclei on the proton-rich wall (right side) decay by β⁺ emission or electron capture to shed a proton. Nuclei on the neutron-rich wall (left side) decay by β⁻ emission to gain a proton. Very heavy nuclei (Z>83) preferentially shed an alpha",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "\\\\frac{\\\\text{BE}}{A} = a_V - a_S A^{-1/3} - a_C \\\\frac{Z(Z-1)}{A^{4/3}} - a_A \\\\frac{(N-Z)^2}{A^2} \\\\pm a_P A^{-3/2}",
                  annotation: "Bethe\\u2013Weizs\\u00e4cker semi-empirical mass formula (SEMF). Terms: volume (a_V\\u224815.8\\u00a0MeV), surface (a_S\\u224818.3\\u00a0MeV), Coulomb (a_C\\u22480.714\\u00a0MeV), asymmetry (a_A\\u224823.2\\u00a0MeV), pairing (a_P\\u224812\\u00a0MeV). Pairing term is +, \\u2212, or 0 for even-even, odd-odd, or odd-A nuclei.",
                  label: "Bethe\\u2013Weizs\\u00e4cker SEMF"
                }
              ),
              "surface, Coulomb, asymmetry, pairing."
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "iron56-peak",
          title: "Iron-56: The Most Tightly Bound Nucleus",
          "data-ocid": "valley.iron56.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-sm prose-invert max-w-none text-muted-foreground space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-yellow-400", children: "Iron-56 (Z=26, N=30, A=56)" }),
              " ",
              "has the highest binding energy per nucleon of any nucleus at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "8.790 MeV/nucleon" }),
              ", placing it at the very bottom of the valley (the peak of the landscape in our height=BE/A convention)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "This is why stellar fusion proceeds up to iron and stops: fusing lighter nuclei releases energy (exothermic), but fusing iron-group nuclei ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "costs" }),
              " energy (endothermic). Stars that attempt to fuse beyond iron rapidly collapse, triggering core-collapse supernovae."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Conversely, fission of uranium and plutonium releases energy precisely because splitting a very heavy nucleus produces daughter fragments closer to the iron-56 peak with higher BE/A." })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "nucleosynthesis",
          title: "Connection to Stellar Nucleosynthesis",
          "data-ocid": "valley.nucleosynthesis.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-sm prose-invert max-w-none text-muted-foreground space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Every element heavier than hydrogen was forged inside a star or during a violent stellar event. The valley of stability is the roadmap of how nuclear burning progresses:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc list-inside text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Hydrogen burning (pp chain, CNO cycle):" }),
                " ",
                "H → He (0–7 MeV/A)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Helium burning:" }),
                " He → C, O (7–8 MeV/A)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Carbon/neon/oxygen/silicon burning:" }),
                " ",
                "walk up the valley to Fe-group"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "s-process (slow neutron capture):" }),
                " ",
                "builds elements up to Bi-209 along the valley"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "r-process (neutron star mergers):" }),
                " ",
                "produces rapid neutron captures far into the neutron-rich wall, then decays back to the valley"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "p-process:" }),
                " ",
                "photodisintegration on the proton-rich side"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] italic", children: "Source: B²FH (1957), Burbidge, Burbidge, Fowler & Hoyle; IAEA Nuclear Data Services." })
          ] })
        }
      )
    ] })
  ] });
}
function ToggleButton({
  active,
  onClick,
  label,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: `flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${active ? "bg-primary/20 text-primary border border-primary/40" : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `h-4 w-4 rounded-full border ${active ? "bg-primary border-primary" : "bg-transparent border-muted-foreground"}`
          }
        )
      ]
    }
  );
}
function NuclideInspector({
  nuclide,
  onDecayChain
}) {
  const { Z, N, A, symbol, name, bea, decayMode, halfLife } = nuclide;
  const totalBE = bea * A;
  const stabilityPct = Math.min(100, bea / 8.79 * 100);
  const magicZ = MAGIC_NUMBERS.includes(Z) ? Z : null;
  const magicN = MAGIC_NUMBERS.includes(N) ? N : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "valley.nuclide.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-primary", children: symbol }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-base font-bold text-foreground", children: [
          A,
          symbol
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
          name,
          "-",
          A
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "Z (protons)", value: String(Z) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "N (neutrons)", value: String(N) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "A (mass no.)", value: String(A) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "BE/A", value: `${bea.toFixed(3)} MeV`, highlight: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "Total BE", value: `${totalBE.toFixed(1)} MeV` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "Decay mode", value: DECAY_LABELS[decayMode] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "Half-life", value: halfLife }) }),
      (magicZ || magicN) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataRow,
        {
          label: "Magic Numbers",
          value: `${magicZ ? `Z=${magicZ}` : ""}${magicZ && magicN ? ", " : ""}${magicN ? `N=${magicN}` : ""}`
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mb-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Relative Stability" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          stabilityPct.toFixed(1),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full bg-primary transition-all",
          style: { width: `${stabilityPct}%` }
        }
      ) })
    ] }),
    decayMode !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onDecayChain(nuclide),
        "data-ocid": "valley.inspector.decay_chain_button",
        className: "w-full mt-1 px-3 py-2 rounded-lg bg-primary/15 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/25 transition-colors",
        children: "Open in Decay Chain Explorer →"
      }
    )
  ] });
}
function DataRow({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-muted/20 rounded px-2 py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `font-mono font-medium ${highlight ? "text-primary" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function PresetButton({
  label,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: "px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-foreground/80 hover:bg-white/10 transition-colors",
      children: label
    }
  );
}
export {
  ValleyOfStability as default
};
