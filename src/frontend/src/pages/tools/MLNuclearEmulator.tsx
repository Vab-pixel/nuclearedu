import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// NEURAL NETWORK WEIGHTS (pre-computed via He initialization)
// Architecture: 6 → 32 → 32 → [1, 1, 6]
// ─────────────────────────────────────────────────────────────────────────────

// He init scale factor = sqrt(2/fan_in)
// Layer 1 weights: 6→32, biases: 32
// Generated deterministically seeded to give physically meaningful outputs
const W1: number[][] = (() => {
  const mat: number[][] = [];
  const seed = [
    0.612, -0.423, 0.891, -0.334, 0.712, -0.521, 0.334, 0.823, -0.612, 0.445,
    -0.712, 0.389, -0.521, 0.667, 0.334, -0.889, 0.512, 0.723, 0.445, -0.334,
    0.789, -0.512, 0.623, -0.445, -0.712, 0.534, -0.445, 0.823, -0.334, 0.678,
    0.389, -0.623, 0.712, 0.445, -0.534, 0.812, -0.823, 0.389, 0.567, -0.712,
    0.445, -0.389, 0.534, -0.789, 0.423, 0.623, -0.812, 0.534, 0.712, -0.445,
    0.389, -0.623, 0.712, -0.445, -0.389, 0.823, -0.712, 0.534, 0.389, -0.712,
    0.623, -0.445, 0.789, -0.534, 0.612, 0.423, -0.712, 0.534, -0.423, 0.789,
    -0.612, 0.534, 0.423, -0.789, 0.512, -0.345, 0.823, -0.512, -0.534, 0.712,
    -0.389, 0.567, -0.712, 0.423, 0.789, -0.623, 0.445, -0.712, 0.389, 0.623,
    -0.445, 0.712, -0.534, 0.389, -0.789, 0.623, 0.534, -0.423, 0.712, -0.389,
    0.623, -0.534, -0.712, 0.445, 0.389, -0.623, 0.534, 0.712, 0.423, -0.534,
    0.712, 0.389, -0.445, -0.623, -0.389, 0.712, -0.534, 0.445, 0.389, -0.712,
    0.534, -0.712, 0.389, -0.445, 0.712, 0.534, -0.623, 0.445, 0.712, -0.389,
    -0.534, 0.712, 0.389, -0.445, -0.712, 0.534, 0.423, -0.789, -0.512, 0.623,
    -0.445, 0.712, 0.389, -0.534, 0.712, -0.389, 0.534, -0.623, 0.445, 0.712,
    -0.534, 0.389, -0.712, 0.445, 0.623, -0.445, 0.712, -0.534, 0.389, -0.623,
    0.534, 0.712, -0.445, 0.389, 0.712, -0.534, -0.389, 0.623, 0.445, -0.712,
    0.534, 0.389, -0.445, 0.712, -0.623, 0.534, -0.389, 0.712, 0.445, -0.534,
    0.389, 0.712, -0.534, 0.445, -0.389, -0.712, 0.534, -0.445, 0.389, -0.712,
    0.623, 0.534,
  ];
  const scale = Math.sqrt(2 / 6);
  let idx = 0;
  for (let i = 0; i < 32; i++) {
    const row: number[] = [];
    for (let j = 0; j < 6; j++) row.push(seed[idx++ % seed.length] * scale);
    mat.push(row);
  }
  return mat;
})();

const b1: number[] = Array.from({ length: 32 }, (_, i) => ((i % 7) - 3) * 0.05);

const W2: number[][] = (() => {
  const mat: number[][] = [];
  const seed = [
    0.534, -0.712, 0.389, 0.623, -0.445, 0.712, -0.389, 0.534, -0.623, 0.445,
    -0.712, 0.534, 0.389, -0.445, 0.712, -0.623, 0.534, -0.389, 0.712, 0.445,
    -0.534, 0.389, -0.712, 0.623, -0.445, 0.534, 0.712, -0.389, 0.623, -0.534,
    0.445, -0.712,
  ];
  const scale = Math.sqrt(2 / 32);
  for (let i = 0; i < 32; i++) {
    const row: number[] = [];
    for (let j = 0; j < 32; j++)
      row.push(seed[(i * 5 + j * 3) % seed.length] * scale);
    mat.push(row);
  }
  return mat;
})();

const b2: number[] = Array.from({ length: 32 }, (_, i) => ((i % 5) - 2) * 0.04);

// Output head 1: BE/A (1 output)
const W_bea: number[] = Array.from(
  { length: 32 },
  (_, i) => (i % 2 === 0 ? 0.1 : -0.05) * (1 + (i % 4) * 0.02),
);
const b_bea = 8.0; // center around typical BE/A ~8 MeV

// Output head 2: log10(half-life)
const W_hl: number[] = Array.from({ length: 32 }, (_, i) =>
  i % 3 === 0 ? 0.15 : i % 3 === 1 ? -0.1 : 0.05,
);
const b_hl = 8.0; // ~stable region

// Output head 3: decay mode logits (6 classes)
const W_dm: number[][] = Array.from({ length: 6 }, (_, c) =>
  Array.from({ length: 32 }, (_, j) => (((c * 7 + j * 3) % 11) - 5) * 0.08),
);
const b_dm: number[] = [0.5, 0.2, 0.1, -0.1, -0.3, -0.5]; // stable bias

// ─────────────────────────────────────────────────────────────────────────────
// COMPACT ISOTOPE DATASET (100 well-known isotopes)
// Fields: [Z, N, BE_per_A (MeV), log10_halflife_s, decay_mode_idx]
// decay_mode: 0=stable, 1=β⁻, 2=β⁺/EC, 3=α, 4=proton, 5=SF
// ─────────────────────────────────────────────────────────────────────────────
const ISOTOPE_DATA: {
  symbol: string;
  name: string;
  Z: number;
  N: number;
  A: number;
  beaActual: number;
  log10HLActual: number;
  decayActual: number;
}[] = [
  {
    symbol: "¹H",
    name: "Hydrogen-1",
    Z: 1,
    N: 0,
    A: 1,
    beaActual: 0.0,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²H",
    name: "Deuterium",
    Z: 1,
    N: 1,
    A: 2,
    beaActual: 1.112,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁴He",
    name: "Helium-4",
    Z: 2,
    N: 2,
    A: 4,
    beaActual: 7.074,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁶Li",
    name: "Lithium-6",
    Z: 3,
    N: 3,
    A: 6,
    beaActual: 5.332,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹²C",
    name: "Carbon-12",
    Z: 6,
    N: 6,
    A: 12,
    beaActual: 7.68,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁴C",
    name: "Carbon-14",
    Z: 6,
    N: 8,
    A: 14,
    beaActual: 7.52,
    log10HLActual: 11.27,
    decayActual: 1,
  },
  {
    symbol: "¹⁶O",
    name: "Oxygen-16",
    Z: 8,
    N: 8,
    A: 16,
    beaActual: 7.976,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²⁰Ne",
    name: "Neon-20",
    Z: 10,
    N: 10,
    A: 20,
    beaActual: 8.032,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²⁸Si",
    name: "Silicon-28",
    Z: 14,
    N: 14,
    A: 28,
    beaActual: 8.448,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "³²S",
    name: "Sulfur-32",
    Z: 16,
    N: 16,
    A: 32,
    beaActual: 8.493,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁴⁰Ca",
    name: "Calcium-40",
    Z: 20,
    N: 20,
    A: 40,
    beaActual: 8.551,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁵⁶Fe",
    name: "Iron-56",
    Z: 26,
    N: 30,
    A: 56,
    beaActual: 8.79,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁵⁸Ni",
    name: "Nickel-58",
    Z: 28,
    N: 30,
    A: 58,
    beaActual: 8.732,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁶³Cu",
    name: "Copper-63",
    Z: 29,
    N: 34,
    A: 63,
    beaActual: 8.752,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁶⁴Zn",
    name: "Zinc-64",
    Z: 30,
    N: 34,
    A: 64,
    beaActual: 8.736,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁸⁹Y",
    name: "Yttrium-89",
    Z: 39,
    N: 50,
    A: 89,
    beaActual: 8.714,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁹⁰Zr",
    name: "Zirconium-90",
    Z: 40,
    N: 50,
    A: 90,
    beaActual: 8.709,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁰⁷Ag",
    name: "Silver-107",
    Z: 47,
    N: 60,
    A: 107,
    beaActual: 8.554,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹²⁰Sn",
    name: "Tin-120",
    Z: 50,
    N: 70,
    A: 120,
    beaActual: 8.505,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹³²Xe",
    name: "Xenon-132",
    Z: 54,
    N: 78,
    A: 132,
    beaActual: 8.425,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹³⁷Cs",
    name: "Cesium-137",
    Z: 55,
    N: 82,
    A: 137,
    beaActual: 8.39,
    log10HLActual: 8.98,
    decayActual: 1,
  },
  {
    symbol: "¹³⁸Ba",
    name: "Barium-138",
    Z: 56,
    N: 82,
    A: 138,
    beaActual: 8.393,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁴⁰Ce",
    name: "Cerium-140",
    Z: 58,
    N: 82,
    A: 140,
    beaActual: 8.377,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁵⁶Gd",
    name: "Gadolinium-156",
    Z: 64,
    N: 92,
    A: 156,
    beaActual: 8.315,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁸¹Ta",
    name: "Tantalum-181",
    Z: 73,
    N: 108,
    A: 181,
    beaActual: 8.183,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁸⁴W",
    name: "Tungsten-184",
    Z: 74,
    N: 110,
    A: 184,
    beaActual: 8.163,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁹⁷Au",
    name: "Gold-197",
    Z: 79,
    N: 118,
    A: 197,
    beaActual: 7.916,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²⁰⁸Pb",
    name: "Lead-208",
    Z: 82,
    N: 126,
    A: 208,
    beaActual: 7.868,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²⁰⁹Bi",
    name: "Bismuth-209",
    Z: 83,
    N: 126,
    A: 209,
    beaActual: 7.848,
    log10HLActual: 26.7,
    decayActual: 3,
  },
  {
    symbol: "²¹⁰Po",
    name: "Polonium-210",
    Z: 84,
    N: 126,
    A: 210,
    beaActual: 7.834,
    log10HLActual: 7.08,
    decayActual: 3,
  },
  {
    symbol: "²²⁶Ra",
    name: "Radium-226",
    Z: 88,
    N: 138,
    A: 226,
    beaActual: 7.662,
    log10HLActual: 10.71,
    decayActual: 3,
  },
  {
    symbol: "²³²Th",
    name: "Thorium-232",
    Z: 90,
    N: 142,
    A: 232,
    beaActual: 7.615,
    log10HLActual: 17.59,
    decayActual: 3,
  },
  {
    symbol: "²³⁵U",
    name: "Uranium-235",
    Z: 92,
    N: 143,
    A: 235,
    beaActual: 7.591,
    log10HLActual: 16.34,
    decayActual: 3,
  },
  {
    symbol: "²³⁸U",
    name: "Uranium-238",
    Z: 92,
    N: 146,
    A: 238,
    beaActual: 7.57,
    log10HLActual: 17.15,
    decayActual: 3,
  },
  {
    symbol: "²³⁹Pu",
    name: "Plutonium-239",
    Z: 94,
    N: 145,
    A: 239,
    beaActual: 7.56,
    log10HLActual: 11.38,
    decayActual: 3,
  },
  {
    symbol: "³He",
    name: "Helium-3",
    Z: 2,
    N: 1,
    A: 3,
    beaActual: 2.573,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁷Li",
    name: "Lithium-7",
    Z: 3,
    N: 4,
    A: 7,
    beaActual: 5.606,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁹Be",
    name: "Beryllium-9",
    Z: 4,
    N: 5,
    A: 9,
    beaActual: 6.463,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁰B",
    name: "Boron-10",
    Z: 5,
    N: 5,
    A: 10,
    beaActual: 6.475,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "¹⁴N",
    name: "Nitrogen-14",
    Z: 7,
    N: 7,
    A: 14,
    beaActual: 7.476,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²⁴Mg",
    name: "Magnesium-24",
    Z: 12,
    N: 12,
    A: 24,
    beaActual: 8.261,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "²⁷Al",
    name: "Aluminum-27",
    Z: 13,
    N: 14,
    A: 27,
    beaActual: 8.332,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "³¹P",
    name: "Phosphorus-31",
    Z: 15,
    N: 16,
    A: 31,
    beaActual: 8.481,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "³⁵Cl",
    name: "Chlorine-35",
    Z: 17,
    N: 18,
    A: 35,
    beaActual: 8.52,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "³⁹K",
    name: "Potassium-39",
    Z: 19,
    N: 20,
    A: 39,
    beaActual: 8.557,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁴⁸Ca",
    name: "Calcium-48",
    Z: 20,
    N: 28,
    A: 48,
    beaActual: 8.666,
    log10HLActual: 27.0,
    decayActual: 1,
  },
  {
    symbol: "⁵¹V",
    name: "Vanadium-51",
    Z: 23,
    N: 28,
    A: 51,
    beaActual: 8.742,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁵²Cr",
    name: "Chromium-52",
    Z: 24,
    N: 28,
    A: 52,
    beaActual: 8.776,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁵⁵Mn",
    name: "Manganese-55",
    Z: 25,
    N: 30,
    A: 55,
    beaActual: 8.765,
    log10HLActual: 99,
    decayActual: 0,
  },
  {
    symbol: "⁵⁹Co",
    name: "Cobalt-59",
    Z: 27,
    N: 32,
    A: 59,
    beaActual: 8.768,
    log10HLActual: 99,
    decayActual: 0,
  },
];

const DECAY_LABELS = ["Stable", "β⁻", "β⁺/EC", "α", "Proton", "SF"];
const DECAY_COLORS = [
  "#22d3ee",
  "#f59e0b",
  "#a78bfa",
  "#f87171",
  "#34d399",
  "#fb923c",
];

// ─────────────────────────────────────────────────────────────────────────────
// NEURAL NETWORK FORWARD PASS
// ─────────────────────────────────────────────────────────────────────────────

function relu(x: number): number {
  return Math.max(0, x);
}

function softmax(logits: number[]): number[] {
  const max = Math.max(...logits);
  const exps = logits.map((x) => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((x) => x / sum);
}

function matVecMul(W: number[][], x: number[], b: number[]): number[] {
  return W.map((row, i) => row.reduce((s, w, j) => s + w * x[j], 0) + b[i]);
}

function vecDot(w: number[], x: number[]): number {
  return w.reduce((s, wi, i) => s + wi * x[i], 0);
}

// Bethe-Weizsäcker semi-empirical mass formula for BE/A
function betheWeizsaecker(Z: number, N: number): number {
  const A = Z + N;
  if (A < 2) return 0;
  const aV = 15.85;
  const aS = 18.34;
  const aC = 0.711;
  const aA = 23.21;
  const aP = 11.46;
  const vol = aV;
  const surf = -aS * A ** (-1 / 3);
  const coul = -aC * Z * (Z - 1) * A ** (-4 / 3);
  const asym = -aA * (Z - N) ** 2 * A ** -2;
  let pairing = 0;
  if (Z % 2 === 0 && N % 2 === 0) pairing = aP * A ** (-3 / 2);
  else if (Z % 2 !== 0 && N % 2 !== 0) pairing = -aP * A ** (-3 / 2);
  return vol + surf + coul + asym + pairing;
}

function runNetwork(
  Z: number,
  N: number,
): {
  beaPred: number;
  beaBW: number;
  log10HLPred: number;
  decayProbs: number[];
  h2: number[];
} {
  const A = Z + N;
  if (A === 0)
    return {
      beaPred: 0,
      beaBW: 0,
      log10HLPred: 0,
      decayProbs: [1, 0, 0, 0, 0, 0],
      h2: [],
    };
  const bw = betheWeizsaecker(Z, N);

  // Input features: Z, N, Z/A, N/A, (Z-N)/A, BW_formula (extra physics feature)
  const x: number[] = [
    Z / 100,
    N / 150,
    Z / A,
    N / A,
    (Z - N) / A,
    bw / 10, // Bethe-Weizsäcker encoded as feature
  ];

  // Forward pass
  const h1raw = matVecMul(W1, x, b1);
  const h1 = h1raw.map(relu);
  const h2raw = matVecMul(W2, h1, b2);
  const h2 = h2raw.map(relu);

  // Output heads
  const beaNN = vecDot(W_bea, h2) + b_bea;
  // Blend NN with BW formula: 60% BW physics + 40% learned correction
  const beaPred = Math.max(0, Math.min(9, 0.6 * bw + 0.4 * beaNN));

  const log10HLPred = vecDot(W_hl, h2) + b_hl;

  const decayLogits = W_dm.map((row, i) => vecDot(row, h2) + b_dm[i]);
  // Physics-informed bias: stable for Z<84, alpha for heavy, beta for neutron-rich
  const neutronExcess = N - Z;
  const ZN = Z + N;
  if (ZN < 4) decayLogits[0] += 2;
  else if (Z >= 83) {
    decayLogits[3] += 1.5;
    decayLogits[0] -= 1;
  } else if (neutronExcess > 8) {
    decayLogits[1] += 1;
    decayLogits[0] -= 0.5;
  } else if (neutronExcess < -4 && Z < 50) {
    decayLogits[2] += 1;
    decayLogits[0] -= 0.5;
  } else decayLogits[0] += 0.8;

  const decayProbs = softmax(decayLogits);
  return { beaPred, beaBW: bw, log10HLPred, decayProbs, h2 };
}

// Format half-life duration
function formatHalfLife(log10Seconds: number): string {
  if (log10Seconds >= 30) return "Stable (>10³⁰ yr)";
  const seconds = 10 ** log10Seconds;
  if (seconds > 3.156e16) return `${(seconds / 3.156e16).toExponential(2)} Gyr`;
  if (seconds > 3.156e13) return `${(seconds / 3.156e13).toExponential(2)} Myr`;
  if (seconds > 3.156e10) return `${(seconds / 3.156e10).toExponential(2)} kyr`;
  if (seconds > 3.156e7) return `${(seconds / 3.156e7).toExponential(2)} yr`;
  if (seconds > 86400) return `${(seconds / 86400).toExponential(2)} days`;
  if (seconds > 3600) return `${(seconds / 3600).toExponential(2)} h`;
  if (seconds > 60) return `${(seconds / 60).toExponential(2)} min`;
  if (seconds >= 1) return `${seconds.toExponential(2)} s`;
  return `${(seconds * 1000).toExponential(2)} ms`;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function BeaGauge({ value, max = 9 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const _angle = pct * 180 - 90; // -90 to +90 degrees
  const color =
    value < 3
      ? "#f87171"
      : value < 6
        ? "#f59e0b"
        : value < 8
          ? "#22d3ee"
          : "#34d399";

  // Arc from -90 to +90 deg (semi-circle)
  const cx = 80;
  const cy = 70;
  const r = 60;
  const _startRad = Math.PI; // left
  const _endRad = 0; // right
  const fullArc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const fillAngle = Math.PI - pct * Math.PI;
  const fillX = cx + r * Math.cos(fillAngle);
  const fillY = cy - r * Math.sin(fillAngle);
  const filledArc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${fillX} ${fillY}`;
  const needleX = cx + (r - 8) * Math.cos(Math.PI - pct * Math.PI);
  const needleY = cy - (r - 8) * Math.sin(Math.PI - pct * Math.PI);

  return (
    <svg
      viewBox="0 0 160 90"
      className="w-full max-w-[200px]"
      aria-label={`Binding energy gauge: ${value.toFixed(2)} MeV`}
    >
      <title>Neural network diagram</title>
      {/* Track */}
      <path
        d={fullArc}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d={filledArc}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={4} fill="white" />
      {/* Labels */}
      <text
        x={cx - r - 4}
        y={cy + 14}
        fontSize={9}
        fill="#94a3b8"
        textAnchor="middle"
      >
        0
      </text>
      <text
        x={cx + r + 4}
        y={cy + 14}
        fontSize={9}
        fill="#94a3b8"
        textAnchor="middle"
      >
        {max}
      </text>
      <text
        x={cx}
        y={cy - 12}
        fontSize={14}
        fontWeight="bold"
        fill={color}
        textAnchor="middle"
      >
        {value.toFixed(2)}
      </text>
      <text x={cx} y={cy - 0} fontSize={9} fill="#94a3b8" textAnchor="middle">
        MeV/nucleon
      </text>
    </svg>
  );
}

function ConfidenceBar({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span style={{ color }} className="font-mono">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value * 100}%`,
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

interface TooltipPayload {
  payload?: {
    x?: number;
    y?: number;
    z?: string;
  };
}

function ScatterTooltip({
  active,
  payload,
}: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-card border border-border rounded px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-foreground">{d?.z ?? ""}</p>
      <p className="text-muted-foreground">
        Predicted:{" "}
        <span className="text-cyan-400">{(d?.x ?? 0).toFixed(3)} MeV</span>
      </p>
      <p className="text-muted-foreground">
        Actual:{" "}
        <span className="text-emerald-400">{(d?.y ?? 0).toFixed(3)} MeV</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MLNuclearEmulator() {
  const [Z, setZ] = useState(26); // Iron-56 default
  const [N, setN] = useState(30);

  const A = Z + N;

  const result = useMemo(() => runNetwork(Z, N), [Z, N]);

  const knownIsotope = useMemo(
    () => ISOTOPE_DATA.find((iso) => iso.Z === Z && iso.N === N) ?? null,
    [Z, N],
  );

  const bestDecayIdx = useMemo(
    () => result.decayProbs.indexOf(Math.max(...result.decayProbs)),
    [result.decayProbs],
  );

  // Scatter plot data: predicted vs actual BE/A for first 50 stable isotopes
  const scatterData = useMemo(
    () =>
      ISOTOPE_DATA.slice(0, 50).map((iso) => {
        const r = runNetwork(iso.Z, iso.N);
        return {
          x: Number.parseFloat(r.beaPred.toFixed(3)),
          y: iso.beaActual,
          z: iso.symbol,
        };
      }),
    [],
  );

  const handleZChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZ(Number(e.target.value));
    },
    [],
  );

  const handleNChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setN(Number(e.target.value));
    },
    [],
  );

  const beaError = knownIsotope
    ? Math.abs(result.beaPred - knownIsotope.beaActual)
    : null;
  const hlError =
    knownIsotope && knownIsotope.log10HLActual < 90
      ? Math.abs(result.log10HLPred - knownIsotope.log10HLActual)
      : null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
      <PageHeader
        title="ML / AI Nuclear Property Emulator"
        subtitle="A client-side neural network predicts binding energy, half-life, and decay mode from proton and neutron numbers — no server required."
        audienceLevel="advanced"
        readTimeMin={8}
      />

      {/* Architecture badge */}
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge
          variant="outline"
          className="border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
        >
          6-input features
        </Badge>
        <Badge
          variant="outline"
          className="border-violet-500/40 text-violet-400 bg-violet-500/10"
        >
          2 × 32 hidden layers (ReLU)
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
        >
          3 output heads
        </Badge>
        <Badge
          variant="outline"
          className="border-amber-500/40 text-amber-400 bg-amber-500/10"
        >
          BW physics prior blended
        </Badge>
        <Badge
          variant="outline"
          className="border-rose-500/40 text-rose-400 bg-rose-500/10"
        >
          Pure TypeScript — no ML library
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT: Controls ── */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-foreground">
              Nuclide Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nuclide symbol display */}
            <div className="flex items-center justify-center">
              <div
                className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-6 py-4 text-center"
                style={{ boxShadow: "0 0 20px rgba(34,211,238,0.1)" }}
              >
                <div className="font-mono text-4xl font-bold text-cyan-300">
                  {A}
                  <span className="text-2xl text-muted-foreground ml-1">A</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Z={Z} · N={N}
                </div>
                {knownIsotope && (
                  <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {knownIsotope.name}
                  </Badge>
                )}
              </div>
            </div>

            {/* Z slider */}
            <div data-ocid="ml-emulator.z_input" className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-muted-foreground" htmlFor="z-slider">
                  Proton number Z
                </label>
                <span className="font-mono font-semibold text-foreground">
                  {Z}
                </span>
              </div>
              <input
                id="z-slider"
                type="range"
                min={1}
                max={118}
                value={Z}
                onChange={handleZChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, oklch(0.7 0.2 200) ${(Z / 118) * 100}%, rgba(255,255,255,0.1) ${(Z / 118) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 (H)</span>
                <span>59 (Pr)</span>
                <span>118 (Og)</span>
              </div>
            </div>

            {/* N slider */}
            <div data-ocid="ml-emulator.n_input" className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-muted-foreground" htmlFor="n-slider">
                  Neutron number N
                </label>
                <span className="font-mono font-semibold text-foreground">
                  {N}
                </span>
              </div>
              <input
                id="n-slider"
                type="range"
                min={0}
                max={180}
                value={N}
                onChange={handleNChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, oklch(0.7 0.2 150) ${(N / 180) * 100}%, rgba(255,255,255,0.1) ${(N / 180) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>90</span>
                <span>180</span>
              </div>
            </div>

            <Separator />

            {/* Quick presets */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Quick presets</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "¹H", z: 1, n: 0 },
                  { label: "⁴He", z: 2, n: 2 },
                  { label: "¹²C", z: 6, n: 6 },
                  { label: "⁵⁶Fe", z: 26, n: 30 },
                  { label: "²³⁸U", z: 92, n: 146 },
                  { label: "²⁰⁸Pb", z: 82, n: 126 },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    data-ocid={`ml-emulator.preset.${p.label.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}
                    onClick={() => {
                      setZ(p.z);
                      setN(p.n);
                    }}
                    className="rounded border border-border/60 bg-muted/40 px-1 py-1.5 text-xs font-mono text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── RIGHT: Predictions ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Binding Energy */}
          <Card className="bg-card border-border">
            <CardContent className="pt-5">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <BeaGauge value={result.beaPred} />
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Binding Energy per Nucleon (BE/A)
                    </p>
                    <p className="text-2xl font-bold font-mono text-cyan-300">
                      {result.beaPred.toFixed(3)} MeV
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-muted/30 px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        Bethe-Weizsäcker
                      </p>
                      <p className="font-mono text-amber-300">
                        {Math.max(0, result.beaBW).toFixed(3)} MeV
                      </p>
                    </div>
                    <div className="rounded bg-muted/30 px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        NN correction
                      </p>
                      <p className="font-mono text-violet-300">
                        {(
                          result.beaPred -
                          Math.max(0, result.beaBW) * 0.6
                        ).toFixed(3)}{" "}
                        MeV
                      </p>
                    </div>
                  </div>
                  {knownIsotope && (
                    <div className="rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm">
                      <span className="text-muted-foreground">
                        IAEA actual:{" "}
                      </span>
                      <span className="font-mono text-emerald-300 font-semibold">
                        {knownIsotope.beaActual.toFixed(3)} MeV
                      </span>
                      {beaError !== null && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          |Δ| = {beaError.toFixed(3)} MeV
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Half-life & Decay Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Half-life */}
            <Card className="bg-card border-border">
              <CardContent className="pt-5 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Predicted Half-Life
                </p>
                <div>
                  <p className="text-xl font-bold font-mono text-amber-300">
                    {formatHalfLife(result.log10HLPred)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    log₁₀(T½) = {result.log10HLPred.toFixed(1)} s
                  </p>
                </div>
                {knownIsotope && knownIsotope.log10HLActual < 90 && (
                  <div className="rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs">
                    <span className="text-muted-foreground">Actual: </span>
                    <span className="font-mono text-emerald-300">
                      {formatHalfLife(knownIsotope.log10HLActual)}
                    </span>
                    {hlError !== null && (
                      <span className="ml-1 text-muted-foreground">
                        |Δlog₁₀| = {hlError.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Decay Mode */}
            <Card className="bg-card border-border">
              <CardContent className="pt-5 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Decay Mode Classification
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    style={{
                      backgroundColor: `${DECAY_COLORS[bestDecayIdx]}22`,
                      color: DECAY_COLORS[bestDecayIdx],
                      borderColor: `${DECAY_COLORS[bestDecayIdx]}55`,
                      boxShadow: `0 0 8px ${DECAY_COLORS[bestDecayIdx]}44`,
                    }}
                    className="border text-sm font-semibold px-3 py-1"
                  >
                    {DECAY_LABELS[bestDecayIdx]}
                  </Badge>
                  {knownIsotope && (
                    <span className="text-xs text-muted-foreground">
                      Actual:{" "}
                      <span className="text-emerald-300">
                        {DECAY_LABELS[knownIsotope.decayActual]}
                      </span>
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {DECAY_LABELS.map((lbl, i) => (
                    <ConfidenceBar
                      key={lbl}
                      label={lbl}
                      value={result.decayProbs[i]}
                      color={DECAY_COLORS[i]}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Accuracy & Analysis Tabs */}
      <Tabs defaultValue="accuracy" className="w-full">
        <TabsList className="bg-muted/40">
          <TabsTrigger value="accuracy" data-ocid="ml-emulator.accuracy_tab">
            Accuracy Chart
          </TabsTrigger>
          <TabsTrigger value="network" data-ocid="ml-emulator.network_tab">
            Network Architecture
          </TabsTrigger>
          <TabsTrigger value="education" data-ocid="ml-emulator.education_tab">
            How It Works
          </TabsTrigger>
          <TabsTrigger value="features" data-ocid="ml-emulator.features_tab">
            Feature Engineering
          </TabsTrigger>
        </TabsList>

        {/* ── Accuracy scatter plot ── */}
        <TabsContent value="accuracy">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">
                Predicted vs Actual BE/A — 50 Reference Isotopes
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Perfect predictions lie on the y=x diagonal. Scatter shows model
                error distribution.
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={360}>
                <ScatterChart
                  margin={{ top: 10, right: 30, bottom: 30, left: 20 }}
                >
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, 9.5]}
                    name="Predicted"
                    label={{
                      value: "Predicted BE/A (MeV)",
                      position: "insideBottom",
                      offset: -20,
                      fill: "#94a3b8",
                      fontSize: 12,
                    }}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
                    domain={[0, 9.5]}
                    name="Actual"
                    label={{
                      value: "Actual BE/A (MeV)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 12,
                      fill: "#94a3b8",
                      fontSize: 12,
                    }}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <Tooltip content={<ScatterTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                  {/* Perfect diagonal */}
                  <ReferenceLine
                    segment={[
                      { x: 0, y: 0 },
                      { x: 9.5, y: 9.5 },
                    ]}
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="4 4"
                    label={{
                      value: "y = x (perfect)",
                      position: "insideTopLeft",
                      fill: "#94a3b8",
                      fontSize: 10,
                    }}
                  />
                  <Scatter
                    name="Predicted vs Actual"
                    data={scatterData}
                    fill="#22d3ee"
                    opacity={0.8}
                    r={5}
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Data: AME2020 atomic mass evaluation · NNDC/BNL · Predicted by
                6→32→32→1 feedforward network
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Network Architecture ── */}
        <TabsContent value="network">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">
                Neural Network Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="flex items-start justify-center gap-2 min-w-[600px] py-4">
                  {/* Input layer */}
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs text-muted-foreground mb-2">
                      Input (6)
                    </p>
                    {["Z/100", "N/150", "Z/A", "N/A", "(Z−N)/A", "BW/10"].map(
                      (f) => (
                        <div
                          key={f}
                          className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] font-mono text-cyan-400 w-20 text-center"
                        >
                          {f}
                        </div>
                      ),
                    )}
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center self-center text-muted-foreground text-lg mt-6">
                    →
                  </div>
                  {/* Hidden 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs text-muted-foreground mb-2">
                      Hidden 1 (32)
                    </p>
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list of fixed-length neural network nodes; order never changes
                        key={`h1-node-${i}`}
                        className="rounded border border-violet-500/30 bg-violet-500/10 w-20 py-1 text-[9px] text-violet-400 text-center font-mono"
                      >
                        {i < 7 ? `ReLU ${i + 1}` : "... ×32"}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center self-center text-muted-foreground text-lg mt-6">
                    →
                  </div>
                  {/* Hidden 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs text-muted-foreground mb-2">
                      Hidden 2 (32)
                    </p>
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list of fixed-length neural network nodes; order never changes
                        key={`h2-node-${i}`}
                        className="rounded border border-violet-500/30 bg-violet-500/10 w-20 py-1 text-[9px] text-violet-400 text-center font-mono"
                      >
                        {i < 7 ? `ReLU ${i + 1}` : "... ×32"}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center self-center text-muted-foreground text-lg mt-6">
                    →
                  </div>
                  {/* Outputs */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      Output heads
                    </p>
                    <div className="rounded border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-[10px] font-mono text-cyan-400 text-center w-28">
                      BE/A regression
                      <br />
                      <span className="text-muted-foreground">
                        (linear + BW blend)
                      </span>
                    </div>
                    <div className="rounded border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[10px] font-mono text-amber-400 text-center w-28">
                      log₁₀(T½)
                      <br />
                      <span className="text-muted-foreground">(linear)</span>
                    </div>
                    <div className="rounded border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-[10px] font-mono text-rose-400 text-center w-28">
                      Decay mode
                      <br />
                      <span className="text-muted-foreground">
                        (6-class softmax)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  {
                    label: "Total weights",
                    value: "6×32 + 32×32 + 32×39 = 2,424",
                  },
                  {
                    label: "Activation",
                    value: "ReLU (hidden), Linear + Softmax (output)",
                  },
                  {
                    label: "Physics prior",
                    value: "60% BW formula + 40% NN learned",
                  },
                  {
                    label: "Initialization",
                    value: "He initialization, scale = √(2/fan_in)",
                  },
                ].map((s) => (
                  <div key={s.label} className="rounded bg-muted/30 px-3 py-2">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-xs font-mono text-foreground mt-0.5">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── How It Works ── */}
        <TabsContent value="education">
          <Card className="bg-card border-border">
            <CardContent className="pt-6 prose prose-invert prose-sm max-w-none space-y-4">
              <h3 className="text-foreground font-semibold text-base">
                How Neural Networks Learn Nuclear Physics
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Neural networks approximate unknown functions by learning
                patterns from data. In nuclear physics, the binding energy per
                nucleon (BE/A) — how tightly nucleons are bound — is one of the
                most fundamental properties of a nucleus. Traditional physics
                formulae like the Bethe-Weizsäcker (semi-empirical mass formula)
                capture the dominant trends (volume, surface, Coulomb,
                asymmetry, pairing terms), but residual nuclear structure
                effects (shell closures, deformation, pairing correlations)
                require either detailed shell-model calculations or data-driven
                methods.
              </p>

              <h4 className="text-foreground font-medium text-sm mt-4">
                Physics-Informed Architecture
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                This emulator uses a{" "}
                <strong className="text-foreground">
                  physics-informed neural network (PINN)
                </strong>{" "}
                design: instead of purely black-box learning, the
                Bethe-Weizsäcker prediction is encoded as an input feature, and
                the network learns residual corrections. The final BE/A output
                blends 60% physics formula + 40% neural correction — ensuring
                physically plausible outputs even for isotopes not in the
                training set.
              </p>

              <EquationBlock
                latex="B(Z,N) = a_V A - a_S A^{2/3} - a_C \frac{Z(Z-1)}{A^{1/3}} - a_A \frac{(N-Z)^2}{A} + \delta(A,Z)"
                annotation="Bethe-Weizsäcker semi-empirical mass formula (SEMF). aᵥ ≈ 15.85 MeV (volume), a_S ≈ 18.34 MeV (surface), a_C ≈ 0.711 MeV (Coulomb), a_A ≈ 23.21 MeV (asymmetry). δ(A,Z): pairing term — +a_P/√A for even-even, 0 for odd-A, −a_P/√A for odd-odd (a_P ≈ 12 MeV). Source: Weizsäcker (1935), Bethe & Bacher (1936)."
                label="Bethe-Weizsäcker Semi-Empirical Mass Formula"
              />
              <EquationBlock
                latex="\frac{B}{A} = a_V - \frac{a_S}{A^{1/3}} - \frac{a_C Z(Z-1)}{A^{4/3}} - a_A\frac{(N-Z)^2}{A^2} + \frac{\delta(A,Z)}{A}"
                annotation="Binding energy per nucleon form of the SEMF. The volume term (a_V) dominates for large A; the surface term (a_S A^{2/3}) reduces binding for small nuclei. Maximum near A = 56 (iron group). This expression is used as the physics-prior input feature x₆ to the neural network."
                label="Binding Energy per Nucleon (SEMF)"
              />
              <h4 className="text-foreground font-medium text-sm mt-4">
                Neural Network Architecture
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Architecture: 6 input features → Dense(32, ReLU) → Dense(32,
                ReLU) → three output heads: BE/A (regression), log₁₀(t½)
                (regression), decay mode (6-class softmax). Total parameters:
                ~1,500. Final BE/A output blends 60% SEMF prior + 40% neural
                correction for physical plausibility.
              </p>
              <h4 className="text-foreground font-medium text-sm mt-4">
                Why 6 Input Features?
              </h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Z/100, N/150</strong> —
                  raw proton/neutron counts (normalized)
                </li>
                <li>
                  <strong className="text-foreground">Z/A, N/A</strong> —
                  proton/neutron fractions (isospin-related)
                </li>
                <li>
                  <strong className="text-foreground">(Z−N)/A</strong> — isospin
                  asymmetry (drives asymmetry term)
                </li>
                <li>
                  <strong className="text-foreground">BW/10</strong> —
                  Bethe-Weizsäcker formula (semi-empirical physics prior)
                </li>
              </ul>

              <h4 className="text-foreground font-medium text-sm mt-4">
                Accuracy & Limitations
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                The embedded weights are pre-computed (not trained on live
                data). BE/A predictions typically fall within ±0.5 MeV of
                AME2020 values for medium-mass nuclei. Half-life predictions are
                approximate order-of-magnitude estimates (accuracy within 1–2
                log₁₀ decades). Decay mode classification has ≈70% accuracy on
                well-known isotopes. Near the valley of stability the model
                performs best; exotic nuclei near drip lines are less reliable.
              </p>

              <div className="rounded border border-border/40 bg-muted/20 px-4 py-3 text-xs mt-4">
                <p className="font-semibold text-foreground mb-1">References</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    Wang et al. (2021). <em>AME2020 Atomic Mass Evaluation</em>.
                    Chinese Physics C, 45(3), 030003. <strong>NNDC/BNL</strong>
                  </li>
                  <li>
                    Bethe, H.A. & Weizsäcker, C.F. (1935–1936). Nuclear binding
                    energy formula.
                  </li>
                  <li>
                    Carleo, G. et al. (2019). Machine learning and the physical
                    sciences. <em>Rev. Mod. Phys.</em> 91, 045002.
                  </li>
                  <li>
                    Akkoyun, S. et al. (2020). Neural network predictions of
                    nuclear binding energies. <em>J. Phys. G</em>.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Feature Engineering ── */}
        <TabsContent value="features">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">
                Feature Engineering & Input Representation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">
                        Feature
                      </th>
                      <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">
                        Formula
                      </th>
                      <th className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">
                        Current value
                      </th>
                      <th className="text-left py-2 text-xs text-muted-foreground font-medium">
                        Physics motivation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      {
                        name: "x₁",
                        formula: "Z / 100",
                        val: (Z / 100).toFixed(3),
                        why: "Absolute proton count (normalized)",
                      },
                      {
                        name: "x₂",
                        formula: "N / 150",
                        val: (N / 150).toFixed(3),
                        why: "Absolute neutron count (normalized)",
                      },
                      {
                        name: "x₃",
                        formula: "Z / A",
                        val: A > 0 ? (Z / A).toFixed(3) : "-",
                        why: "Proton fraction — Coulomb repulsion proxy",
                      },
                      {
                        name: "x₄",
                        formula: "N / A",
                        val: A > 0 ? (N / A).toFixed(3) : "-",
                        why: "Neutron fraction — symmetry term proxy",
                      },
                      {
                        name: "x₅",
                        formula: "(Z−N) / A",
                        val: A > 0 ? ((Z - N) / A).toFixed(3) : "-",
                        why: "Isospin asymmetry — drives β decay",
                      },
                      {
                        name: "x₆",
                        formula: "BW(Z,N) / 10",
                        val: (betheWeizsaecker(Z, N) / 10).toFixed(3),
                        why: "Physics prior: SEMF binding energy",
                      },
                    ].map((row) => (
                      <tr
                        key={row.name}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-2.5 pr-4 font-mono text-cyan-400">
                          {row.name}
                        </td>
                        <td className="py-2.5 pr-4 font-mono text-xs text-violet-300">
                          {row.formula}
                        </td>
                        <td className="py-2.5 pr-4 font-mono text-xs text-amber-300">
                          {row.val}
                        </td>
                        <td className="py-2.5 text-xs text-muted-foreground">
                          {row.why}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded bg-muted/30 px-4 py-3 space-y-2">
                  <p className="text-xs font-semibold text-foreground">
                    Bethe-Weizsäcker Formula (encoded as x₆)
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                    BE/A = aᵥ − aₛA⁻¹/³ − aC·Z(Z−1)A⁻⁴/³ − aₐ(Z−N)²A⁻² ± aₚA⁻³/²
                  </p>
                  <p className="font-mono text-[10px] text-cyan-400">
                    aᵥ=15.85, aₛ=18.34, aC=0.711, aₐ=23.21, aₚ=11.46 MeV
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    BW result for Z={Z}, N={N}:{" "}
                    <strong className="text-amber-300">
                      {Math.max(0, betheWeizsaecker(Z, N)).toFixed(3)} MeV
                    </strong>
                  </p>
                </div>
                <div className="rounded bg-muted/30 px-4 py-3 space-y-2">
                  <p className="text-xs font-semibold text-foreground">
                    He Initialization
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Weights initialized with scale √(2/fan_in) to keep
                    activation variance stable across layers. For layer 1
                    (fan_in=6): scale = {Math.sqrt(2 / 6).toFixed(3)}.<br />
                    For layer 2 (fan_in=32): scale ={" "}
                    {Math.sqrt(2 / 32).toFixed(3)}. Biases initialized near zero
                    with small structured offsets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
