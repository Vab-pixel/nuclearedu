import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Atom,
  Circle,
  Copy,
  Download,
  Eraser,
  Info,
  Play,
  RotateCcw,
  Square,
  Trash2,
  Undo2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ParticleType =
  | "quark"
  | "antiquark"
  | "lepton"
  | "antilepton"
  | "photon"
  | "gluon"
  | "w_plus"
  | "w_minus"
  | "z0"
  | "higgs";

type LineStyle = "fermion" | "wavy" | "curly" | "dashed" | "dotted";

interface Particle {
  id: string;
  symbol: string;
  name: string;
  type: ParticleType;
  lineStyle: LineStyle;
  color: string;
  charge: string;
  mass: string;
  spin: string;
  description: string;
}

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  particleId: string;
  label: string;
  isVertex?: boolean;
}

interface CanvasLine {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  particleId: string;
  animated?: boolean;
  animProgress?: number;
}

interface FlowDot {
  id: string;
  lineId: string;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

interface DiagramState {
  nodes: CanvasNode[];
  lines: CanvasLine[];
}

interface ExampleDiagram {
  id: string;
  name: string;
  description: string;
  process: string;
  vertexFactor: string;
  propagator: string;
  amplitude: string;
  lines: Omit<CanvasLine, "id">[];
}

// ─── Particle Definitions ─────────────────────────────────────────────────────
const PARTICLES: Particle[] = [
  // Quarks
  {
    id: "u",
    symbol: "u",
    name: "Up quark",
    type: "quark",
    lineStyle: "fermion",
    color: "#e74c3c",
    charge: "+2/3",
    mass: "2.2 MeV",
    spin: "1/2",
    description:
      "Up quark — lightest quark, constituent of protons and neutrons.",
  },
  {
    id: "d",
    symbol: "d",
    name: "Down quark",
    type: "quark",
    lineStyle: "fermion",
    color: "#e67e22",
    charge: "−1/3",
    mass: "4.7 MeV",
    spin: "1/2",
    description:
      "Down quark — second lightest quark, constituent of protons and neutrons.",
  },
  {
    id: "s",
    symbol: "s",
    name: "Strange quark",
    type: "quark",
    lineStyle: "fermion",
    color: "#f39c12",
    charge: "−1/3",
    mass: "95 MeV",
    spin: "1/2",
    description: "Strange quark — carried strangeness quantum number.",
  },
  {
    id: "c",
    symbol: "c",
    name: "Charm quark",
    type: "quark",
    lineStyle: "fermion",
    color: "#27ae60",
    charge: "+2/3",
    mass: "1.275 GeV",
    spin: "1/2",
    description: "Charm quark — discovered via J/ψ meson in 1974.",
  },
  {
    id: "b",
    symbol: "b",
    name: "Bottom quark",
    type: "quark",
    lineStyle: "fermion",
    color: "#2980b9",
    charge: "−1/3",
    mass: "4.18 GeV",
    spin: "1/2",
    description: "Bottom quark — also called beauty quark.",
  },
  {
    id: "t",
    symbol: "t",
    name: "Top quark",
    type: "quark",
    lineStyle: "fermion",
    color: "#8e44ad",
    charge: "+2/3",
    mass: "173 GeV",
    spin: "1/2",
    description: "Top quark — heaviest known elementary particle.",
  },
  // Antiquarks
  {
    id: "u_bar",
    symbol: "ū",
    name: "Anti-up quark",
    type: "antiquark",
    lineStyle: "fermion",
    color: "#ff6b6b",
    charge: "−2/3",
    mass: "2.2 MeV",
    spin: "1/2",
    description:
      "Antiparticle of the up quark. Arrow flows opposite to particle flow.",
  },
  {
    id: "d_bar",
    symbol: "d̄",
    name: "Anti-down quark",
    type: "antiquark",
    lineStyle: "fermion",
    color: "#ff9a3c",
    charge: "+1/3",
    mass: "4.7 MeV",
    spin: "1/2",
    description: "Antiparticle of the down quark.",
  },
  // Leptons
  {
    id: "e_minus",
    symbol: "e⁻",
    name: "Electron",
    type: "lepton",
    lineStyle: "fermion",
    color: "#00cec9",
    charge: "−1",
    mass: "0.511 MeV",
    spin: "1/2",
    description: "Electron — fundamental carrier of negative charge.",
  },
  {
    id: "e_plus",
    symbol: "e⁺",
    name: "Positron",
    type: "antilepton",
    lineStyle: "fermion",
    color: "#fd79a8",
    charge: "+1",
    mass: "0.511 MeV",
    spin: "1/2",
    description:
      "Positron — antiparticle of the electron. Arrow flows backward in time.",
  },
  {
    id: "mu_minus",
    symbol: "μ⁻",
    name: "Muon",
    type: "lepton",
    lineStyle: "fermion",
    color: "#55efc4",
    charge: "−1",
    mass: "105.7 MeV",
    spin: "1/2",
    description: "Muon — heavy lepton, ~200× heavier than electron.",
  },
  {
    id: "mu_plus",
    symbol: "μ⁺",
    name: "Antimuon",
    type: "antilepton",
    lineStyle: "fermion",
    color: "#ff7675",
    charge: "+1",
    mass: "105.7 MeV",
    spin: "1/2",
    description: "Antimuon — antiparticle of the muon.",
  },
  {
    id: "nu_e",
    symbol: "νₑ",
    name: "Electron neutrino",
    type: "lepton",
    lineStyle: "fermion",
    color: "#74b9ff",
    charge: "0",
    mass: "< 1.1 eV",
    spin: "1/2",
    description:
      "Electron neutrino — neutral lepton associated with the electron.",
  },
  {
    id: "nu_mu",
    symbol: "νμ",
    name: "Muon neutrino",
    type: "lepton",
    lineStyle: "fermion",
    color: "#a29bfe",
    charge: "0",
    mass: "< 0.19 MeV",
    spin: "1/2",
    description: "Muon neutrino — neutral lepton associated with the muon.",
  },
  // Gauge bosons
  {
    id: "photon",
    symbol: "γ",
    name: "Photon",
    type: "photon",
    lineStyle: "wavy",
    color: "#ffd32a",
    charge: "0",
    mass: "0",
    spin: "1",
    description:
      "Photon — mediator of the electromagnetic force. Drawn as a wavy line.",
  },
  {
    id: "gluon",
    symbol: "g",
    name: "Gluon",
    type: "gluon",
    lineStyle: "curly",
    color: "#ff6348",
    charge: "0",
    mass: "0",
    spin: "1",
    description:
      "Gluon — mediator of the strong nuclear force. Drawn as a curly/spring line.",
  },
  {
    id: "w_plus",
    symbol: "W⁺",
    name: "W⁺ boson",
    type: "w_plus",
    lineStyle: "dashed",
    color: "#7bed9f",
    charge: "+1",
    mass: "80.4 GeV",
    spin: "1",
    description: "W⁺ boson — mediates weak charged current interactions.",
  },
  {
    id: "w_minus",
    symbol: "W⁻",
    name: "W⁻ boson",
    type: "w_minus",
    lineStyle: "dashed",
    color: "#eccc68",
    charge: "−1",
    mass: "80.4 GeV",
    spin: "1",
    description: "W⁻ boson — mediates weak charged current interactions.",
  },
  {
    id: "z0",
    symbol: "Z⁰",
    name: "Z⁰ boson",
    type: "z0",
    lineStyle: "dashed",
    color: "#ffa502",
    charge: "0",
    mass: "91.2 GeV",
    spin: "1",
    description: "Z⁰ boson — mediates weak neutral current interactions.",
  },
  {
    id: "higgs",
    symbol: "H",
    name: "Higgs boson",
    type: "higgs",
    lineStyle: "dotted",
    color: "#ee5a24",
    charge: "0",
    mass: "125.1 GeV",
    spin: "0",
    description:
      "Higgs boson — scalar boson responsible for mass generation via the Higgs mechanism.",
  },
  {
    id: "tau_minus",
    symbol: "τ⁻",
    name: "Tau lepton",
    type: "lepton",
    lineStyle: "fermion",
    color: "#d63031",
    charge: "−1",
    mass: "1.777 GeV",
    spin: "1/2",
    description:
      "Tau lepton — heaviest charged lepton, decays hadronically or leptonically.",
  },
  {
    id: "nu_tau",
    symbol: "ντ",
    name: "Tau neutrino",
    type: "lepton",
    lineStyle: "fermion",
    color: "#6c5ce7",
    charge: "0",
    mass: "< 18.2 MeV",
    spin: "1/2",
    description: "Tau neutrino — neutral lepton associated with the tau.",
  },
];

// ─── Example Diagrams ─────────────────────────────────────────────────────────
const EXAMPLES: ExampleDiagram[] = [
  {
    id: "beta_decay",
    name: "Beta Decay",
    description: "n → p + e⁻ + ν̄ₑ",
    process:
      "A down quark in the neutron transforms into an up quark via W⁻ emission. The W⁻ then decays into an electron and an electron antineutrino.",
    vertexFactor: "−ig/(2√2) · γμ(1−γ⁵)",
    propagator: "−i(gμν − kμkν/M²W) / (k² − M²W)",
    amplitude: "𝓜 = [ū(p)γμ(1−γ⁵)u(n)] · [−ig²/8(k²−M²W)] · [ū(e)γμ(1−γ⁵)v(ν̄)]",
    lines: [
      {
        fromX: 60,
        fromY: 160,
        toX: 200,
        toY: 100,
        particleId: "d",
        animated: false,
      },
      {
        fromX: 200,
        fromY: 100,
        toX: 340,
        toY: 60,
        particleId: "u",
        animated: false,
      },
      {
        fromX: 200,
        fromY: 100,
        toX: 340,
        toY: 160,
        particleId: "w_minus",
        animated: false,
      },
      {
        fromX: 340,
        fromY: 160,
        toX: 470,
        toY: 200,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 340,
        fromY: 160,
        toX: 470,
        toY: 280,
        particleId: "nu_e",
        animated: false,
      },
      {
        fromX: 60,
        fromY: 250,
        toX: 340,
        toY: 250,
        particleId: "u",
        animated: false,
      },
      {
        fromX: 60,
        fromY: 320,
        toX: 340,
        toY: 320,
        particleId: "u",
        animated: false,
      },
    ],
  },
  {
    id: "compton",
    name: "Compton Scattering",
    description: "e⁻ + γ → e⁻ + γ",
    process:
      "An incoming photon scatters off an electron. The electron absorbs the photon, propagates virtually, then emits a new photon. QED process at second order.",
    vertexFactor: "−ieγμ",
    propagator: "i(γ·p + m)/(p² − m²)",
    amplitude: "𝓜 = (−ie)² ū(p')ε̄*(k')[γ·(p+k)/(… )]ε(k)u(p)",
    lines: [
      {
        fromX: 60,
        fromY: 160,
        toX: 230,
        toY: 160,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 60,
        fromY: 280,
        toX: 230,
        toY: 160,
        particleId: "photon",
        animated: false,
      },
      {
        fromX: 230,
        fromY: 160,
        toX: 380,
        toY: 160,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 380,
        fromY: 160,
        toX: 540,
        toY: 160,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 380,
        fromY: 160,
        toX: 540,
        toY: 280,
        particleId: "photon",
        animated: false,
      },
    ],
  },
  {
    id: "pair_production",
    name: "Pair Production",
    description: "γ → e⁻ + e⁺",
    process:
      "A high-energy photon (near a nucleus for momentum conservation) produces an electron-positron pair. The reverse process is annihilation.",
    vertexFactor: "−ieγμ",
    propagator: "−igμν/k²  (massless photon)",
    amplitude: "𝓜 = −ie · ε^μ · ū(e⁻)γμv(e⁺)",
    lines: [
      {
        fromX: 80,
        fromY: 220,
        toX: 280,
        toY: 220,
        particleId: "photon",
        animated: false,
      },
      {
        fromX: 280,
        fromY: 220,
        toX: 480,
        toY: 120,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 480,
        fromY: 320,
        toX: 280,
        toY: 220,
        particleId: "e_plus",
        animated: false,
      },
    ],
  },
  {
    id: "annihilation",
    name: "e⁺e⁻ → μ⁺μ⁻",
    description: "e⁻ + e⁺ → μ⁻ + μ⁺ via γ",
    process:
      "Electron-positron annihilation producing a virtual photon that decays into a muon-antimuon pair. Classic QED process measured at LEP.",
    vertexFactor: "−ieγμ  at each vertex",
    propagator: "−igμν/(q² + iε)",
    amplitude: "𝓜 = e² · [v̄(e⁺)γμu(e⁻)] · [−gμν/q²] · [ū(μ⁻)γνv(μ⁺)]",
    lines: [
      {
        fromX: 60,
        fromY: 140,
        toX: 260,
        toY: 240,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 260,
        fromY: 240,
        toX: 60,
        toY: 340,
        particleId: "e_plus",
        animated: false,
      },
      {
        fromX: 260,
        fromY: 240,
        toX: 430,
        toY: 240,
        particleId: "photon",
        animated: false,
      },
      {
        fromX: 430,
        fromY: 240,
        toX: 600,
        toY: 140,
        particleId: "mu_minus",
        animated: false,
      },
      {
        fromX: 600,
        fromY: 340,
        toX: 430,
        toY: 240,
        particleId: "mu_plus",
        animated: false,
      },
    ],
  },
  {
    id: "quark_annihilation",
    name: "qq̄ → gg",
    description: "Quark-antiquark annihilation to gluons",
    process:
      "A quark and antiquark annihilate through QCD interaction producing two gluons. This process contributes to jet production at hadron colliders.",
    vertexFactor: "−ig_s · (λᵃ/2) · γμ",
    propagator: "i(γ·p + m)/(p² − m²)  (quark propagator)",
    amplitude: "𝓜 = g²_s · (T^aT^b) · [v̄(q̄)γμu(q)] · εμε'ν",
    lines: [
      {
        fromX: 60,
        fromY: 160,
        toX: 250,
        toY: 250,
        particleId: "u",
        animated: false,
      },
      {
        fromX: 250,
        fromY: 250,
        toX: 60,
        toY: 340,
        particleId: "u_bar",
        animated: false,
      },
      {
        fromX: 250,
        fromY: 250,
        toX: 490,
        toY: 160,
        particleId: "gluon",
        animated: false,
      },
      {
        fromX: 250,
        fromY: 250,
        toX: 490,
        toY: 340,
        particleId: "gluon",
        animated: false,
      },
    ],
  },
  {
    id: "muon_decay",
    name: "Muon Decay",
    description: "μ⁻ → e⁻ + ν̄ₑ + νμ",
    process:
      "Muon decays via weak interaction through a W⁻ boson into an electron, electron antineutrino, and muon neutrino. Lifetime: 2.2 μs.",
    vertexFactor: "−ig/(2√2) · γμ(1−γ⁵)",
    propagator: "−i(gμν − kμkν/M²W) / (k² − M²W)",
    amplitude: "𝓜 = (G_F/√2)[ū(νμ)γμ(1−γ⁵)u(μ)] · [ū(e)γμ(1−γ⁵)v(ν̄ₑ)]",
    lines: [
      {
        fromX: 60,
        fromY: 220,
        toX: 230,
        toY: 220,
        particleId: "mu_minus",
        animated: false,
      },
      {
        fromX: 230,
        fromY: 220,
        toX: 420,
        toY: 140,
        particleId: "nu_mu",
        animated: false,
      },
      {
        fromX: 230,
        fromY: 220,
        toX: 380,
        toY: 300,
        particleId: "w_minus",
        animated: false,
      },
      {
        fromX: 380,
        fromY: 300,
        toX: 550,
        toY: 240,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 380,
        fromY: 300,
        toX: 550,
        toY: 360,
        particleId: "nu_e",
        animated: false,
      },
    ],
  },
  {
    id: "bhabha",
    name: "Bhabha Scattering",
    description: "e⁻ + e⁺ → e⁻ + e⁺ (t-channel γ)",
    process:
      "Electron-positron scattering via t-channel photon exchange. This is a critical calibration process at electron-positron colliders.",
    vertexFactor: "−ieγμ",
    propagator: "−igμν/(t) where t = (p1−p3)²",
    amplitude: "𝓜_t = −e²[ū(e⁻')γμu(e⁻)][v̄(e⁺)γμv(e⁺')] / t",
    lines: [
      {
        fromX: 60,
        fromY: 140,
        toX: 270,
        toY: 180,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 270,
        fromY: 180,
        toX: 530,
        toY: 140,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 270,
        fromY: 180,
        toX: 310,
        toY: 310,
        particleId: "photon",
        animated: false,
      },
      {
        fromX: 60,
        fromY: 360,
        toX: 310,
        toY: 310,
        particleId: "e_plus",
        animated: false,
      },
      {
        fromX: 310,
        fromY: 310,
        toX: 530,
        toY: 360,
        particleId: "e_plus",
        animated: false,
      },
    ],
  },
  {
    id: "muon_decay",
    name: "Muon Decay",
    description: "μ⁻ → e⁻ + ν̄ₑ + νμ",
    process:
      "Muon decays via weak interaction through a W⁻ boson into an electron, electron antineutrino, and muon neutrino. Lifetime: 2.2 μs.",
    vertexFactor: "−ig/(2√2) · γμ(1−γ⁵)",
    propagator: "−i(gμν − kμkν/M²W) / (k² − M²W)",
    amplitude: "𝓜 = (G_F/√2)[ū(νμ)γμ(1−γ⁵)u(μ)] · [ū(e)γμ(1−γ⁵)v(ν̄ₑ)]",
    lines: [
      {
        fromX: 60,
        fromY: 220,
        toX: 230,
        toY: 220,
        particleId: "mu_minus",
        animated: false,
      },
      {
        fromX: 230,
        fromY: 220,
        toX: 420,
        toY: 140,
        particleId: "nu_mu",
        animated: false,
      },
      {
        fromX: 230,
        fromY: 220,
        toX: 380,
        toY: 300,
        particleId: "w_minus",
        animated: false,
      },
      {
        fromX: 380,
        fromY: 300,
        toX: 550,
        toY: 240,
        particleId: "e_minus",
        animated: false,
      },
      {
        fromX: 380,
        fromY: 300,
        toX: 550,
        toY: 360,
        particleId: "nu_e",
        animated: false,
      },
    ],
  },
  {
    id: "higgs_gg_fusion",
    name: "Higgs Production (ggF)",
    description: "g + g → t-loop → H⁰",
    process:
      "Gluon-gluon fusion is the dominant Higgs production mode at the LHC. Two gluons couple to a virtual top quark loop, which radiates a Higgs boson. The top quark loop dominates due to the large top Yukawa coupling.",
    vertexFactor: "−igs(λᵃ/2)γμ  (QCD) + yt (Yukawa)",
    propagator: "i(γ·p + mt)/(p² − mt²)  (top quark loop)",
    amplitude: "𝓜 ∝ αs · yt² · F(τt)  where τt = 4mt²/mH²",
    lines: [
      {
        fromX: 60,
        fromY: 120,
        toX: 200,
        toY: 220,
        particleId: "gluon",
        animated: false,
      },
      {
        fromX: 60,
        fromY: 320,
        toX: 200,
        toY: 220,
        particleId: "gluon",
        animated: false,
      },
      {
        fromX: 200,
        fromY: 220,
        toX: 350,
        toY: 220,
        particleId: "t",
        animated: false,
      },
      {
        fromX: 350,
        fromY: 220,
        toX: 500,
        toY: 220,
        particleId: "t",
        animated: false,
      },
      {
        fromX: 350,
        fromY: 220,
        toX: 500,
        toY: 100,
        particleId: "higgs",
        animated: false,
      },
    ],
  },
];

// ─── SVG Path Generators ─────────────────────────────────────────────────────
function getFermionPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

function getWavyPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  phase = 0,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const waves = Math.max(4, Math.floor(len / 18));
  const amp = 10;
  const nx = -dy / len;
  const ny = dx / len;
  let d = `M ${x1} ${y1}`;
  const steps = waves * 12;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mx = x1 + dx * t;
    const my = y1 + dy * t;
    const angle = t * waves * 2 * Math.PI + phase;
    const off = Math.sin(angle) * amp;
    d += ` L ${mx + nx * off} ${my + ny * off}`;
  }
  return d;
}

function getCurlyPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  phase = 0,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const loops = Math.max(5, Math.floor(len / 14));
  const r = 8;
  const nx = -dy / len;
  const ny = dx / len;
  const ux = dx / len;
  const uy = dy / len;
  let d = `M ${x1} ${y1}`;
  const steps = loops * 8;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mx = x1 + dx * t;
    const my = y1 + dy * t;
    const angle = t * loops * 2 * Math.PI + phase;
    const offX = Math.cos(angle) * r * nx;
    const offY = Math.cos(angle) * r * ny;
    const offZ = Math.sin(angle) * r;
    const proj = offZ * 0.3;
    d += ` L ${mx + offX + ux * proj} ${my + offY + uy * proj}`;
  }
  return d;
}

function getArrowMarker(id: string, color: string): string {
  return `<marker id="arrow-${id}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="${color}"/></marker>`;
}

function getPointOnLine(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  progress: number,
  style: LineStyle,
  phase = 0,
): { x: number; y: number } {
  const t = Math.max(0, Math.min(1, progress));
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len;
  const ny = dx / len;
  const bx = fromX + dx * t;
  const by = fromY + dy * t;
  if (style === "wavy") {
    const waves = Math.max(4, Math.floor(len / 18));
    const amp = 10;
    const angle = t * waves * 2 * Math.PI + phase;
    const off = Math.sin(angle) * amp;
    return { x: bx + nx * off, y: by + ny * off };
  }
  if (style === "curly") {
    const loops = Math.max(5, Math.floor(len / 14));
    const r = 8;
    const angle = t * loops * 2 * Math.PI + phase;
    const offX = Math.cos(angle) * r * nx;
    const offY = Math.cos(angle) * r * ny;
    return { x: bx + offX, y: by + offY };
  }
  return { x: bx, y: by };
}

// ─── Particle Line Component ──────────────────────────────────────────────────
function ParticleLine({
  line,
  particle,
  animate = false,
  animPhase = 0,
}: {
  line: CanvasLine;
  particle: Particle;
  animate?: boolean;
  animPhase?: number;
}) {
  const { fromX, fromY, toX, toY } = line;
  const col = particle.color;
  let d = "";
  let strokeDash = "none";
  let strokeWidth = 2;

  switch (particle.lineStyle) {
    case "fermion":
      d = getFermionPath(fromX, fromY, toX, toY);
      strokeWidth = 2.5;
      break;
    case "wavy":
      d = getWavyPath(fromX, fromY, toX, toY, animPhase);
      strokeWidth = 2;
      break;
    case "curly":
      d = getCurlyPath(fromX, fromY, toX, toY, animPhase);
      strokeWidth = 2;
      break;
    case "dashed":
      d = getFermionPath(fromX, fromY, toX, toY);
      strokeDash = "8 4";
      strokeWidth = 2.5;
      break;
    case "dotted":
      d = getFermionPath(fromX, fromY, toX, toY);
      strokeDash = "3 4";
      strokeWidth = 2.5;
      break;
  }

  const isArrow = particle.lineStyle === "fermion";
  const isAntiparticle =
    particle.type === "antiquark" || particle.type === "antilepton";

  return (
    <g>
      <defs>
        {isArrow && (
          <g
            // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG marker defs — trusted internal content
            dangerouslySetInnerHTML={{ __html: getArrowMarker(line.id, col) }}
          />
        )}
      </defs>
      <path
        d={d}
        stroke={col}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={strokeDash}
        markerEnd={
          isArrow && !isAntiparticle ? `url(#arrow-${line.id})` : undefined
        }
        markerStart={
          isArrow && isAntiparticle ? `url(#arrow-${line.id})` : undefined
        }
        opacity={animate ? 0.9 : 1}
        style={
          animate
            ? { filter: `drop-shadow(0 0 6px ${col})` }
            : { filter: `drop-shadow(0 0 3px ${col}50)` }
        }
      />
    </g>
  );
}

// ─── Particle Label Tag ───────────────────────────────────────────────────────
function ParticleLabel({
  line,
  particle,
}: { line: CanvasLine; particle: Particle }) {
  const mx = (line.fromX + line.toX) / 2;
  const my = (line.fromY + line.toY) / 2;
  const dx = line.toX - line.fromX;
  const dy = line.toY - line.fromY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = len > 0 ? -dy / len : 0;
  const ny = len > 0 ? dx / len : 0;
  const lx = mx + nx * 14;
  const ly = my + ny * 14;
  return (
    <text
      x={lx}
      y={ly}
      fontSize="11"
      fontFamily="monospace"
      fill={particle.color}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ pointerEvents: "none", fontWeight: 600 }}
    >
      {particle.symbol}
    </text>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeynmanDiagrams() {
  const [diagram, setDiagram] = useState<DiagramState>({
    nodes: [],
    lines: [],
  });
  const [history, setHistory] = useState<DiagramState[]>([]);
  const [selectedParticle, setSelectedParticle] = useState<Particle | null>(
    PARTICLES[8],
  ); // electron default
  const [hoveredParticle, setHoveredParticle] = useState<Particle | null>(null);
  const [selectedExample, setSelectedExample] = useState<ExampleDiagram | null>(
    null,
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [animatingLines, setAnimatingLines] = useState<Set<string>>(new Set());
  const [hoveredVertex, setHoveredVertex] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "quarks" | "leptons" | "bosons"
  >("all");
  const [flowDots, setFlowDots] = useState<FlowDot[]>([]);
  const [flowEnabled, setFlowEnabled] = useState(false);
  const [animPhase, setAnimPhase] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [conservationPanel, setConservationPanel] = useState<{
    inQ: number;
    inL: number;
    outQ: number;
    outL: number;
    ok: boolean;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const flowRafRef = useRef<number>(0);
  const phaseRafRef = useRef<number>(0);

  const CANVAS_W = 700;
  const CANVAS_H = 460;

  // ── Get particle by id ────────────────────────────────────────────────────
  const getParticle = useCallback(
    (id: string) => PARTICLES.find((p) => p.id === id) ?? PARTICLES[8],
    [],
  );

  // ── Load example diagram ──────────────────────────────────────────────────
  const loadExample = useCallback((example: ExampleDiagram) => {
    setSelectedExample(example);
    const newLines = example.lines.map((l, i) => ({ ...l, id: `line-${i}` }));
    setDiagram({ nodes: [], lines: [] });
    setHistory([]);

    // Animate line-by-line
    const addLines = (idx: number) => {
      if (idx >= newLines.length) {
        setDiagram({ nodes: [], lines: newLines });
        setTimeout(() => setAnimatingLines(new Set()), 400);
        return;
      }
      setAnimatingLines((prev) => new Set([...prev, newLines[idx].id]));
      setDiagram((prev) => ({
        ...prev,
        lines: [...prev.lines, { ...newLines[idx], animated: true }],
      }));
      setTimeout(() => addLines(idx + 1), 340);
    };
    addLines(0);
  }, []);

  // ── SVG interaction ───────────────────────────────────────────────────────
  const getSVGPoint = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!selectedParticle) return;
    const pt = getSVGPoint(e);
    setIsDrawing(true);
    setDrawStart(pt);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const pt = getSVGPoint(e);
    setMousePos(pt);
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !drawStart || !selectedParticle) {
      setIsDrawing(false);
      return;
    }
    const pt = getSVGPoint(e);
    const dx = pt.x - drawStart.x;
    const dy = pt.y - drawStart.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 20) {
      const newLine: CanvasLine = {
        id: `line-${Date.now()}`,
        fromX: drawStart.x,
        fromY: drawStart.y,
        toX: pt.x,
        toY: pt.y,
        particleId: selectedParticle.id,
      };
      setHistory((prev) => [...prev, diagram]);
      setDiagram((prev) => ({ ...prev, lines: [...prev.lines, newLine] }));
    }
    setIsDrawing(false);
    setDrawStart(null);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    setDiagram(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setHistory((prev) => [...prev, diagram]);
    setDiagram({ nodes: [], lines: [] });
    setSelectedExample(null);
  };

  const handleDownloadSVG = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feynman-diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_W * 2;
      canvas.height = CANVAS_H * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "feynman-diagram.png";
        a.click();
        URL.revokeObjectURL(pngUrl);
      });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleCopyLaTeX = () => {
    const lines = diagram.lines;
    if (lines.length === 0 && !selectedExample) return;
    let latex = "% Feynman Diagram (simplified LaTeX representation)\n";
    if (selectedExample) {
      latex += `% Process: ${selectedExample.description}\n`;
      latex += `% Vertex factor: ${selectedExample.vertexFactor}\n`;
      latex += `% Amplitude: ${selectedExample.amplitude}\n\n`;
    }
    latex += "\\begin{tikzpicture}\n";
    for (const line of lines) {
      const p = getParticle(line.particleId);
      const styleMap: Record<LineStyle, string> = {
        fermion: "fermion",
        wavy: "photon",
        curly: "gluon",
        dashed: "boson",
        dotted: "higgs",
      };
      latex += `  \\draw[${styleMap[p.lineStyle]}] (${line.fromX / 100},${-line.fromY / 100}) -- (${line.toX / 100},${-line.toY / 100});\n`;
    }
    latex += "\\end{tikzpicture}";
    navigator.clipboard.writeText(latex).catch(() => {});
  };

  const handleResetCanvas = () => {
    setHistory((prev) => [...prev, diagram]);
    setDiagram({ nodes: [], lines: [] });
    setSelectedExample(null);
    setFlowDots([]);
    setFlowEnabled(false);
  };

  // Find vertices (line endpoints that are close together)
  const vertices = useCallback((): {
    x: number;
    y: number;
    lines: string[];
  }[] => {
    const verts: { x: number; y: number; lines: string[] }[] = [];
    const thresh = 22;
    const endpoints = diagram.lines.flatMap((l) => [
      { x: l.toX, y: l.toY, lineId: l.id, which: "end" as const },
    ]);
    for (const ep of endpoints) {
      const existing = verts.find(
        (v) => Math.hypot(v.x - ep.x, v.y - ep.y) < thresh,
      );
      if (existing) {
        existing.lines.push(ep.lineId);
      } else {
        // only add vertex if multiple lines connect (simplified: add all endpoints from examples)
        verts.push({ x: ep.x, y: ep.y, lines: [ep.lineId] });
      }
    }
    return verts.filter((v) => v.lines.length >= 1);
  }, [diagram.lines]);

  // Filter particles by category
  const filteredParticles = PARTICLES.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "quarks")
      return p.type === "quark" || p.type === "antiquark";
    if (activeCategory === "leptons")
      return p.type === "lepton" || p.type === "antilepton";
    if (activeCategory === "bosons")
      return ["photon", "gluon", "w_plus", "w_minus", "z0", "higgs"].includes(
        p.type,
      );
    return true;
  });

  // Cleanup animating marker after animation
  useEffect(() => {
    if (animatingLines.size > 0) {
      const t = setTimeout(() => setAnimatingLines(new Set()), 2000);
      return () => clearTimeout(t);
    }
  }, [animatingLines]);

  // Animated flow dots along propagator lines
  useEffect(() => {
    if (!flowEnabled) {
      if (flowRafRef.current) cancelAnimationFrame(flowRafRef.current);
      setFlowDots([]);
      return;
    }
    const animateFlow = () => {
      setFlowDots((prev) => {
        const existing = prev.filter((d) => d.progress < 1.05);
        const allLines = diagram.lines;
        const newDots: FlowDot[] = [];
        for (const line of allLines) {
          const p = getParticle(line.particleId);
          const hasDot = existing.some(
            (d) => d.lineId === line.id && d.progress < 0.9,
          );
          if (!hasDot && Math.random() < 0.03) {
            newDots.push({
              id: `dot-${Date.now()}-${Math.random()}`,
              lineId: line.id,
              progress: 0,
              speed: 0.008 + Math.random() * 0.012,
              color: p.color,
              size: p.lineStyle === "fermion" ? 3 : 4,
            });
          }
        }
        return [
          ...existing.map((d) => ({ ...d, progress: d.progress + d.speed })),
          ...newDots,
        ];
      });
      flowRafRef.current = requestAnimationFrame(animateFlow);
    };
    flowRafRef.current = requestAnimationFrame(animateFlow);
    return () => {
      if (flowRafRef.current) cancelAnimationFrame(flowRafRef.current);
    };
  }, [flowEnabled, diagram.lines, getParticle]);

  // Animated phase for wavy/curly lines
  useEffect(() => {
    const animatePhase = () => {
      setAnimPhase((p) => p + 0.08);
      phaseRafRef.current = requestAnimationFrame(animatePhase);
    };
    phaseRafRef.current = requestAnimationFrame(animatePhase);
    return () => {
      if (phaseRafRef.current) cancelAnimationFrame(phaseRafRef.current);
    };
  }, []);

  // Conservation law calculation
  useEffect(() => {
    if (diagram.lines.length === 0 && !selectedExample) {
      setConservationPanel(null);
      return;
    }
    const lines =
      diagram.lines.length > 0
        ? diagram.lines
        : (selectedExample?.lines.map((l, i) => ({ ...l, id: `ex-${i}` })) ??
          []);
    const chargeMap: Record<string, number> = {
      u: 2 / 3,
      d: -1 / 3,
      s: -1 / 3,
      c: 2 / 3,
      b: -1 / 3,
      t: 2 / 3,
      u_bar: -2 / 3,
      d_bar: 1 / 3,
      s_bar: 1 / 3,
      c_bar: -2 / 3,
      b_bar: 1 / 3,
      t_bar: -2 / 3,
      e_minus: -1,
      e_plus: 1,
      mu_minus: -1,
      mu_plus: 1,
      tau_minus: -1,
      nu_e: 0,
      nu_mu: 0,
      nu_tau: 0,
      photon: 0,
      gluon: 0,
      w_plus: 1,
      w_minus: -1,
      z0: 0,
      higgs: 0,
    };
    const leptonMap: Record<string, number> = {
      e_minus: 1,
      mu_minus: 1,
      tau_minus: 1,
      e_plus: -1,
      mu_plus: -1,
      nu_e: 1,
      nu_mu: 1,
      nu_tau: 1,
    };
    let inQ = 0;
    let inL = 0;
    let outQ = 0;
    let outL = 0;
    for (const line of lines) {
      const pid = line.particleId;
      const q = chargeMap[pid] ?? 0;
      const l = leptonMap[pid] ?? 0;
      const isIncoming =
        line.toX > line.fromX
          ? line.fromX < CANVAS_W / 2
          : line.toX < CANVAS_W / 2;
      if (isIncoming) {
        inQ += q;
        inL += l;
      } else {
        outQ += q;
        outL += l;
      }
    }
    const ok = Math.abs(inQ - outQ) < 0.01 && Math.abs(inL - outL) < 0.01;
    setConservationPanel({ inQ, inL, outQ, outL, ok });
  }, [diagram.lines, selectedExample]);

  const verts = vertices();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <PageHeader
          title="Feynman Diagram Generator"
          subtitle="Build and explore quantum field theory interactions with interactive particle propagators. Draw your own diagrams or load pre-built examples with animated particle traces."
          audienceLevel="advanced"
          readTimeMin={15}
        />

        {/* Main Layout */}
        <div className="flex gap-4 mt-6" style={{ minHeight: 600 }}>
          {/* ── Left Panel: Particle Palette ───────────────────────────── */}
          <div
            className="flex flex-col gap-3 w-52 flex-shrink-0"
            data-ocid="feynman.palette_panel"
          >
            <div className="rounded-xl border border-border bg-card p-3 shadow-md">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Particle Palette
              </div>
              <div className="flex gap-1 mb-3">
                {(["all", "quarks", "leptons", "bosons"] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-colors font-medium border ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/40 text-muted-foreground border-border hover:bg-muted/80"
                      }`}
                      data-ocid={`feynman.category_${cat}`}
                    >
                      {cat === "all"
                        ? "All"
                        : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ),
                )}
              </div>

              {/* Fermions Section */}
              {(activeCategory === "all" ||
                activeCategory === "quarks" ||
                activeCategory === "leptons") && (
                <div className="mb-2">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1 flex items-center gap-1">
                    <Atom className="h-3 w-3" />
                    Fermions
                  </div>
                  <div className="flex flex-col gap-1">
                    {filteredParticles
                      .filter((p) => p.lineStyle === "fermion")
                      .map((p) => (
                        <ParticlePaletteCard
                          key={p.id}
                          p={p}
                          selected={selectedParticle?.id === p.id}
                          onSelect={() => setSelectedParticle(p)}
                          onHover={() => setHoveredParticle(p)}
                          onLeave={() => setHoveredParticle(null)}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Bosons Section */}
              {(activeCategory === "all" || activeCategory === "bosons") && (
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Bosons
                  </div>
                  <div className="flex flex-col gap-1">
                    {filteredParticles
                      .filter((p) => p.lineStyle !== "fermion")
                      .map((p) => (
                        <ParticlePaletteCard
                          key={p.id}
                          p={p}
                          selected={selectedParticle?.id === p.id}
                          onSelect={() => setSelectedParticle(p)}
                          onHover={() => setHoveredParticle(p)}
                          onLeave={() => setHoveredParticle(null)}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hover tooltip */}
            <AnimatePresence mode="wait">
              {hoveredParticle && (
                <motion.div
                  key={hoveredParticle.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="rounded-xl border bg-card p-3 shadow-lg text-xs space-y-1"
                  style={{ borderColor: `${hoveredParticle.color}60` }}
                >
                  <div
                    className="font-semibold"
                    style={{ color: hoveredParticle.color }}
                  >
                    {hoveredParticle.name}
                  </div>
                  <div className="text-muted-foreground text-[10px]">
                    {hoveredParticle.description}
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 pt-1">
                    <div className="text-muted-foreground">Charge</div>
                    <div className="font-mono">{hoveredParticle.charge}</div>
                    <div className="text-muted-foreground">Mass</div>
                    <div className="font-mono">{hoveredParticle.mass}</div>
                    <div className="text-muted-foreground">Spin</div>
                    <div className="font-mono">{hoveredParticle.spin}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-[10px] text-muted-foreground space-y-1">
              <div className="font-semibold text-foreground/70 text-xs">
                How to draw
              </div>
              <div>1. Select a particle from the palette</div>
              <div>2. Click and drag on the canvas to draw a propagator</div>
              <div>3. Load an example to see animated diagrams</div>
              <div>4. Hover over vertices to see Feynman rules</div>
            </div>
          </div>

          {/* ── Center: Canvas + Examples ─────────────────────────────── */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {/* Example buttons */}
            <div
              className="flex flex-wrap gap-2"
              data-ocid="feynman.examples_row"
            >
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => loadExample(ex)}
                  data-ocid={`feynman.example_${ex.id}`}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
                    selectedExample?.id === ex.id
                      ? "bg-primary/20 border-primary/60 text-primary"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {ex.name}
                </button>
              ))}
            </div>

            {/* SVG Canvas */}
            <div
              className="relative rounded-2xl border border-border overflow-hidden bg-card shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #0a0e1a 0%, #0d1117 60%, #0f1520 100%)",
              }}
            >
              {/* Canvas label */}
              <div className="absolute top-3 left-4 text-[10px] text-muted-foreground/60 font-mono z-10 select-none">
                initial state ← t → final state
              </div>
              {/* Time axis arrow */}
              <svg
                className="absolute bottom-3 left-4 z-10 pointer-events-none"
                width="120"
                height="16"
              >
                <title>Feynman diagram</title>
                <defs>
                  <marker
                    id="t-arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.2)" />
                  </marker>
                </defs>
                <line
                  x1="8"
                  y1="8"
                  x2="110"
                  y2="8"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  markerEnd="url(#t-arrow)"
                />
                <text
                  x="6"
                  y="14"
                  fontSize="9"
                  fill="rgba(255,255,255,0.3)"
                  fontFamily="monospace"
                >
                  time →
                </text>
              </svg>

              {/* Selected particle indicator */}
              {selectedParticle && (
                <div
                  className="absolute top-3 right-4 z-10 text-xs flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 border"
                  style={{ borderColor: `${selectedParticle.color}60` }}
                >
                  <svg width="28" height="12">
                    <title>Feynman diagram</title>
                    {selectedParticle.lineStyle === "wavy" && (
                      <path
                        d={getWavyPath(0, 6, 28, 6)}
                        stroke={selectedParticle.color}
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                    {selectedParticle.lineStyle === "curly" && (
                      <path
                        d={getCurlyPath(0, 6, 28, 6)}
                        stroke={selectedParticle.color}
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                    {selectedParticle.lineStyle === "fermion" && (
                      <>
                        <line
                          x1="0"
                          y1="6"
                          x2="24"
                          y2="6"
                          stroke={selectedParticle.color}
                          strokeWidth="2"
                        />
                        <polygon
                          points="20,2 28,6 20,10"
                          fill={selectedParticle.color}
                        />
                      </>
                    )}
                    {selectedParticle.lineStyle === "dashed" && (
                      <line
                        x1="0"
                        y1="6"
                        x2="28"
                        y2="6"
                        stroke={selectedParticle.color}
                        strokeWidth="2"
                        strokeDasharray="5 3"
                      />
                    )}
                    {selectedParticle.lineStyle === "dotted" && (
                      <line
                        x1="0"
                        y1="6"
                        x2="28"
                        y2="6"
                        stroke={selectedParticle.color}
                        strokeWidth="2"
                        strokeDasharray="2 3"
                      />
                    )}
                  </svg>
                  <span
                    style={{ color: selectedParticle.color }}
                    className="font-mono font-semibold"
                  >
                    {selectedParticle.symbol}
                  </span>
                </div>
              )}

              <svg
                ref={svgRef}
                viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                width="100%"
                className="block cursor-crosshair"
                style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => {
                  setIsDrawing(false);
                  setDrawStart(null);
                  setMousePos(null);
                }}
                data-ocid="feynman.canvas_target"
                aria-label="Feynman diagram canvas"
              >
                <title>Feynman diagram</title>
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

                {/* Center dashed separator */}
                <line
                  x1={CANVAS_W / 2}
                  y1="20"
                  x2={CANVAS_W / 2}
                  y2={CANVAS_H - 20}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />

                {/* Lines */}
                {diagram.lines.map((line) => {
                  const p = getParticle(line.particleId);
                  const isAnim = animatingLines.has(line.id);
                  return (
                    <g key={line.id}>
                      {isAnim && (
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ParticleLine
                            line={line}
                            particle={p}
                            animate
                            animPhase={animPhase}
                          />
                        </motion.g>
                      )}
                      {!isAnim && (
                        <ParticleLine
                          line={line}
                          particle={p}
                          animPhase={animPhase}
                        />
                      )}
                      <ParticleLabel line={line} particle={p} />
                    </g>
                  );
                })}

                {/* Animated flow dots */}
                {flowDots.map((dot) => {
                  const line = diagram.lines.find((l) => l.id === dot.lineId);
                  if (!line) return null;
                  const p = getParticle(line.particleId);
                  const pos = getPointOnLine(
                    line.fromX,
                    line.fromY,
                    line.toX,
                    line.toY,
                    dot.progress,
                    p.lineStyle,
                    animPhase,
                  );
                  return (
                    <g key={dot.id}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={dot.size}
                        fill={dot.color}
                        opacity={0.9}
                        style={{
                          filter: `drop-shadow(0 0 6px ${dot.color})`,
                        }}
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={dot.size * 2.5}
                        fill={dot.color}
                        opacity={0.15}
                      />
                    </g>
                  );
                })}

                {/* Vertex dots with conservation badges */}
                {verts.map((v, i) => {
                  const connectedLines = diagram.lines.filter((l) => {
                    const d1 = Math.hypot(l.fromX - v.x, l.fromY - v.y);
                    const d2 = Math.hypot(l.toX - v.x, l.toY - v.y);
                    return d1 < 22 || d2 < 22;
                  });
                  const chargeMap: Record<string, number> = {
                    u: 2 / 3,
                    d: -1 / 3,
                    s: -1 / 3,
                    c: 2 / 3,
                    b: -1 / 3,
                    t: 2 / 3,
                    u_bar: -2 / 3,
                    d_bar: 1 / 3,
                    s_bar: 1 / 3,
                    c_bar: -2 / 3,
                    b_bar: 1 / 3,
                    t_bar: -2 / 3,
                    e_minus: -1,
                    e_plus: 1,
                    mu_minus: -1,
                    mu_plus: 1,
                    tau_minus: -1,
                    nu_e: 0,
                    nu_mu: 0,
                    nu_tau: 0,
                    photon: 0,
                    gluon: 0,
                    w_plus: 1,
                    w_minus: -1,
                    z0: 0,
                    higgs: 0,
                  };
                  const leptonMap: Record<string, number> = {
                    e_minus: 1,
                    mu_minus: 1,
                    tau_minus: 1,
                    e_plus: -1,
                    mu_plus: -1,
                    nu_e: 1,
                    nu_mu: 1,
                    nu_tau: 1,
                  };
                  let vQ = 0;
                  let vL = 0;
                  for (const l of connectedLines) {
                    vQ += chargeMap[l.particleId] ?? 0;
                    vL += leptonMap[l.particleId] ?? 0;
                  }
                  const qOk = Math.abs(vQ) < 0.01;
                  const lOk = Math.abs(vL) < 0.01;
                  return (
                    <g key={`v-${v.x.toFixed(1)}-${v.y.toFixed(1)}-${i}`}>
                      <circle
                        cx={v.x}
                        cy={v.y}
                        r={5}
                        fill="#fff"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1"
                        style={{
                          filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() =>
                          setHoveredVertex({
                            x: v.x,
                            y: v.y,
                            label: `Q: ${qOk ? "conserved ✓" : "VIOLATED ✗"} | L: ${lOk ? "conserved ✓" : "VIOLATED ✗"}`,
                          })
                        }
                        onMouseLeave={() => setHoveredVertex(null)}
                      />
                      {/* Conservation badges */}
                      <g transform={`translate(${v.x + 8}, ${v.y - 14})`}>
                        <rect
                          x="0"
                          y="0"
                          width={qOk ? 28 : 32}
                          height="12"
                          rx="3"
                          fill={qOk ? "#27ae60" : "#e74c3c"}
                          opacity="0.9"
                        />
                        <text
                          x={qOk ? 14 : 16}
                          y="9"
                          fontSize="7"
                          fill="#fff"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          Q:{qOk ? "✓" : "✗"}
                        </text>
                      </g>
                      <g transform={`translate(${v.x + 8}, ${v.y + 2})`}>
                        <rect
                          x="0"
                          y="0"
                          width={lOk ? 28 : 32}
                          height="12"
                          rx="3"
                          fill={lOk ? "#27ae60" : "#e74c3c"}
                          opacity="0.9"
                        />
                        <text
                          x={lOk ? 14 : 16}
                          y="9"
                          fontSize="7"
                          fill="#fff"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          L:{lOk ? "✓" : "✗"}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Vertex tooltip */}
                {hoveredVertex && (
                  <g>
                    <rect
                      x={hoveredVertex.x + 10}
                      y={hoveredVertex.y - 24}
                      width={130}
                      height={22}
                      rx={4}
                      fill="rgba(0,0,0,0.85)"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={hoveredVertex.x + 16}
                      y={hoveredVertex.y - 9}
                      fontSize="10"
                      fontFamily="monospace"
                      fill="#ffd32a"
                    >
                      {hoveredVertex.label}
                    </text>
                  </g>
                )}

                {/* Drawing preview line */}
                {isDrawing && drawStart && mousePos && selectedParticle && (
                  <line
                    x1={drawStart.x}
                    y1={drawStart.y}
                    x2={mousePos.x}
                    y2={mousePos.y}
                    stroke={selectedParticle.color}
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    strokeDasharray="6 4"
                  />
                )}
              </svg>
            </div>

            {/* Canvas Controls */}
            <div
              className="flex items-center gap-2 flex-wrap"
              data-ocid="feynman.controls_row"
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUndo}
                disabled={history.length === 0}
                data-ocid="feynman.undo_button"
                className="gap-1.5"
              >
                <Undo2 className="h-3.5 w-3.5" />
                Undo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
                data-ocid="feynman.clear_button"
                className="gap-1.5 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetCanvas}
                data-ocid="feynman.reset_button"
                className="gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
              <Button
                type="button"
                variant={flowEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setFlowEnabled((v) => !v)}
                data-ocid="feynman.flow_toggle"
                className="gap-1.5"
              >
                <Play className="h-3.5 w-3.5" />
                {flowEnabled ? "Stop Flow" : "Animate Flow"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownloadSVG}
                data-ocid="feynman.download_svg_button"
                className="gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                SVG
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownloadPNG}
                data-ocid="feynman.download_png_button"
                className="gap-1.5"
              >
                <Square className="h-3.5 w-3.5" />
                PNG
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyLaTeX}
                data-ocid="feynman.copy_latex_button"
                className="gap-1.5"
              >
                <Copy className="h-3.5 w-3.5" />
                LaTeX
              </Button>
              <div className="ml-auto text-xs text-muted-foreground">
                {diagram.lines.length} propagator
                {diagram.lines.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* ── Right Panel: Info + Equations ────────────────────────── */}
          <div
            className="flex flex-col gap-3 w-64 flex-shrink-0"
            data-ocid="feynman.info_panel"
          >
            {/* Selected example info */}
            <AnimatePresence mode="wait">
              {selectedExample ? (
                <motion.div
                  key={selectedExample.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="rounded-xl border border-border bg-card p-4 shadow-md space-y-3"
                  data-ocid="feynman.example_info"
                >
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-foreground">
                        {selectedExample.name}
                      </div>
                      <div className="text-xs text-primary font-mono mt-0.5">
                        {selectedExample.description}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedExample.process}
                  </p>

                  <div className="space-y-2">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Feynman Rules
                    </div>
                    <div className="rounded-lg bg-muted/30 border border-border/60 p-2 space-y-1.5">
                      <div>
                        <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Vertex Factor
                        </div>
                        <div className="text-xs font-mono text-yellow-300 break-all">
                          {selectedExample.vertexFactor}
                        </div>
                      </div>
                      <div className="border-t border-border/40 pt-1.5">
                        <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Propagator
                        </div>
                        <div className="text-xs font-mono text-cyan-300 break-all">
                          {selectedExample.propagator}
                        </div>
                      </div>
                      <div className="border-t border-border/40 pt-1.5">
                        <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Matrix Element 𝓜
                        </div>
                        <div className="text-[10px] font-mono text-green-300 break-all leading-relaxed">
                          {selectedExample.amplitude}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-border/60 bg-card/60 p-4"
                  data-ocid="feynman.info_empty_state"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Interaction Info
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/70">
                    Load an example diagram or draw your own to see Feynman
                    rules, vertex factors, and matrix elements.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conservation Law Panel */}
            {conservationPanel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-3 shadow-md"
                data-ocid="feynman.conservation_panel"
              >
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Conservation Laws
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In: Q =</span>
                    <span className="font-mono">
                      {conservationPanel.inQ.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Out: Q =</span>
                    <span className="font-mono">
                      {conservationPanel.outQ.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In: L =</span>
                    <span className="font-mono">
                      {conservationPanel.inL.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Out: L =</span>
                    <span className="font-mono">
                      {conservationPanel.outL.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className={`mt-1 text-center font-bold text-xs py-1 rounded ${
                      conservationPanel.ok
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {conservationPanel.ok ? "✓ CONSERVED" : "✗ VIOLATED"}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Feynman Rules Reference (collapsible) */}
            <div className="rounded-xl border border-border bg-card p-3 shadow-md">
              <button
                type="button"
                onClick={() => setShowRules((v) => !v)}
                className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-0"
                data-ocid="feynman.rules_toggle"
              >
                <span>Feynman Rules</span>
                <span className="text-[10px]">{showRules ? "▲" : "▼"}</span>
              </button>
              <AnimatePresence>
                {showRules && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 text-[10px] mt-2">
                      <div className="rounded bg-muted/30 p-1.5">
                        <div className="text-[9px] text-muted-foreground mb-0.5">
                          Fermion Propagator
                        </div>
                        <div className="font-mono text-cyan-300 break-all">
                          iS_F(p) = i(p̸ + m)/(p² − m² + iε)
                        </div>
                      </div>
                      <div className="rounded bg-muted/30 p-1.5">
                        <div className="text-[9px] text-muted-foreground mb-0.5">
                          Photon Propagator
                        </div>
                        <div className="font-mono text-yellow-300 break-all">
                          iD_F^μν = −ig^μν/(k² + iε)
                        </div>
                      </div>
                      <div className="rounded bg-muted/30 p-1.5">
                        <div className="text-[9px] text-muted-foreground mb-0.5">
                          QED Vertex Factor
                        </div>
                        <div className="font-mono text-green-300 break-all">
                          −ieγ^μ
                        </div>
                      </div>
                      <div className="rounded bg-muted/30 p-1.5">
                        <div className="text-[9px] text-muted-foreground mb-0.5">
                          W Boson Vertex
                        </div>
                        <div className="font-mono text-emerald-300 break-all">
                          (−ig/2√2) γ^μ(1−γ⁵)
                        </div>
                      </div>
                      <div className="rounded bg-muted/30 p-1.5">
                        <div className="text-[9px] text-muted-foreground mb-0.5">
                          Coupling Constants
                        </div>
                        <div className="font-mono text-purple-300">
                          α = e²/4π ≈ 1/137
                        </div>
                        <div className="font-mono text-orange-300">
                          α_s ≈ 0.118 at M_Z
                        </div>
                        <div className="font-mono text-pink-300">
                          G_F ≈ 1.166×10⁻⁵ GeV⁻²
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* QFT Quick Reference */}
            <div className="rounded-xl border border-border bg-card p-3 shadow-md">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                QFT Quick Reference
              </div>
              <div className="space-y-2 text-[10px]">
                <RuleRow
                  label="External fermion"
                  value="u(p) or v(p)"
                  color="#00cec9"
                />
                <RuleRow
                  label="External photon"
                  value="εμ(k)"
                  color="#ffd32a"
                />
                <RuleRow label="QED vertex" value="−ieγμ" color="#ffd32a" />
                <RuleRow
                  label="Fermion propagator"
                  value="i(γp+m)/(p²−m²)"
                  color="#74b9ff"
                />
                <RuleRow
                  label="Photon propagator"
                  value="−igμν/k²"
                  color="#ffd32a"
                />
                <RuleRow
                  label="W propagator"
                  value="−i(gμν−kμkν/M²)/(k²−M²W)"
                  color="#7bed9f"
                />
                <RuleRow
                  label="QCD vertex"
                  value="−igs(λᵃ/2)γμ"
                  color="#ff6348"
                />
                <RuleRow
                  label="Coupling constant"
                  value="α = e²/4π ≈ 1/137"
                  color="#a29bfe"
                />
                <RuleRow
                  label="Strong coupling"
                  value="αs ≈ 0.118 at M_Z"
                  color="#ff6348"
                />
              </div>
            </div>

            {/* Legend */}
            <div className="rounded-xl border border-border bg-card p-3 shadow-md">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Line Legend
              </div>
              <div className="space-y-1.5">
                <LegendItem
                  style="fermion"
                  label="Fermions (solid + arrow)"
                  color="#00cec9"
                />
                <LegendItem
                  style="wavy"
                  label="Photon (wavy)"
                  color="#ffd32a"
                />
                <LegendItem
                  style="curly"
                  label="Gluon (curly)"
                  color="#ff6348"
                />
                <LegendItem
                  style="dashed"
                  label="W/Z bosons (dashed)"
                  color="#7bed9f"
                />
                <LegendItem
                  style="dotted"
                  label="Higgs (dotted)"
                  color="#ee5a24"
                />
              </div>
            </div>

            {/* Citations */}
            <div className="rounded-xl border border-border/50 bg-muted/10 p-3 text-[9px] text-muted-foreground space-y-1">
              <div className="font-semibold text-[10px] text-foreground/60 mb-1">
                References
              </div>
              <div className="flex items-start gap-1">
                <Circle className="h-1.5 w-1.5 mt-0.5 flex-shrink-0 fill-current" />
                <span>
                  Peskin & Schroeder,{" "}
                  <em>An Introduction to Quantum Field Theory</em>, Westview
                  Press (1995)
                </span>
              </div>
              <div className="flex items-start gap-1">
                <Circle className="h-1.5 w-1.5 mt-0.5 flex-shrink-0 fill-current" />
                <span>
                  Griffiths, <em>Introduction to Elementary Particles</em>,
                  Wiley (2008)
                </span>
              </div>
              <div className="flex items-start gap-1">
                <Circle className="h-1.5 w-1.5 mt-0.5 flex-shrink-0 fill-current" />
                <span>
                  PDG (2024). Particle Data Group, Review of Particle Physics.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Lower Section: Theory Notes ───────────────────────────────── */}
        <div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="feynman.theory_section"
        >
          <TheoryCard
            title="What is a Feynman Diagram?"
            content="Feynman diagrams are pictorial representations of mathematical expressions describing the behavior and interaction of subatomic particles. Each line and vertex corresponds to a specific mathematical factor in the probability amplitude 𝓜. The probability of a process is proportional to |𝓜|², summed over all possible intermediate (virtual) states."
          />
          <TheoryCard
            title="Vertex Factors & Coupling"
            content="Each vertex in a QED diagram contributes a factor of −ieγμ, where e is the elementary charge and γμ are Dirac gamma matrices. The coupling constant α = e²/4π ≈ 1/137 is small, making perturbation theory valid. Higher-order diagrams (with more vertices) contribute smaller corrections proportional to powers of α."
          />
          <TheoryCard
            title="Virtual Particles & Propagators"
            content="Internal lines in Feynman diagrams represent virtual (off-shell) particles that mediate interactions. They do not satisfy the on-shell condition p² = m². The fermion propagator is i(γ·p + m)/(p² − m² + iε), ensuring causality via the iε prescription (Feynman prescription). Virtual photons are transversely and longitudinally polarized."
          />
          <TheoryCard
            title="Conservation Laws at Vertices"
            content="At every vertex, four-momentum is conserved. Charge, lepton number, baryon number, and color charge are all conserved locally. Weak interactions (W±, Z⁰) can change quark flavor (governed by the CKM matrix) and can violate CP symmetry. The GWS model unifies electromagnetic and weak forces into the electroweak interaction."
          />
        </div>

        {/* ── Feynman Rules (KaTeX) ───────────────────────────────────────── */}
        <div
          className="mt-6 space-y-4"
          data-ocid="feynman.feynman_rules_section"
        >
          <h3 className="text-base font-semibold text-foreground">
            Feynman Rules (QED)
          </h3>
          <EquationBlock
            latex="-ie\\gamma^\\mu"
            annotation="QED electron-photon vertex factor. e is the elementary charge (e ≈ 1.602 × 10⁻¹⁹ C) and γμ are the 4×4 Dirac gamma matrices satisfying {γμ, γν} = 2gμν. Each vertex contributes this factor to the amplitude 𝓜."
            label="QED Vertex Factor"
          />
          <EquationBlock
            latex="\\frac{-ig_{\\mu\\nu}}{q^2 + i\\varepsilon}"
            annotation="Photon propagator in Feynman (Lorenz) gauge. q is the four-momentum of the virtual photon; the iε prescription (Feynman prescription) ensures causal propagation and correct pole prescription for loop integrals."
            label="Photon Propagator"
          />
          <EquationBlock
            latex="\\frac{i(\\not{p}+m)}{p^2-m^2+i\\varepsilon}"
            annotation="Fermion propagator for a particle of mass m. �not{p} = γμpμ is Feynman slash notation. The denominator vanishes on-shell (p² = m²); virtual particles are off-shell and carry this full propagator factor in amplitude calculations."
            label="Fermion Propagator"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Helper Sub-components ────────────────────────────────────────────────────
function RuleRow({
  label,
  value,
  color,
}: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between items-start gap-1">
      <span className="text-muted-foreground/80 leading-tight">{label}</span>
      <span
        className="font-mono text-right leading-tight flex-shrink-0"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

function LegendItem({
  style,
  label,
  color,
}: { style: LineStyle; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="12" className="flex-shrink-0">
        <title>Feynman diagram</title>
        {style === "wavy" && (
          <path
            d={getWavyPath(2, 6, 30, 6)}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
        )}
        {style === "curly" && (
          <path
            d={getCurlyPath(2, 6, 30, 6)}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
        )}
        {style === "fermion" && (
          <>
            <line x1="2" y1="6" x2="26" y2="6" stroke={color} strokeWidth="2" />
            <polygon points="22,2 30,6 22,10" fill={color} />
          </>
        )}
        {style === "dashed" && (
          <line
            x1="2"
            y1="6"
            x2="30"
            y2="6"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="5 3"
          />
        )}
        {style === "dotted" && (
          <line
            x1="2"
            y1="6"
            x2="30"
            y2="6"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="2 3"
          />
        )}
      </svg>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

function TheoryCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="font-semibold text-sm text-foreground mb-2">{title}</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}

function ParticlePaletteCard({
  p,
  selected,
  onSelect,
  onHover,
  onLeave,
}: {
  p: Particle;
  selected: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-ocid={`feynman.particle_${p.id}`}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all border ${
        selected
          ? "border-current bg-card shadow-md scale-105"
          : "border-transparent hover:border-border hover:bg-muted/30"
      }`}
      style={selected ? { borderColor: p.color, color: p.color } : {}}
    >
      <svg width="32" height="16" className="flex-shrink-0">
        <title>Feynman diagram</title>
        {p.lineStyle === "wavy" && (
          <path
            d={getWavyPath(2, 8, 30, 8)}
            stroke={p.color}
            strokeWidth="1.5"
            fill="none"
          />
        )}
        {p.lineStyle === "curly" && (
          <path
            d={getCurlyPath(2, 8, 30, 8)}
            stroke={p.color}
            strokeWidth="1.5"
            fill="none"
          />
        )}
        {p.lineStyle === "fermion" && (
          <>
            <line
              x1="2"
              y1="8"
              x2="28"
              y2="8"
              stroke={p.color}
              strokeWidth="2"
            />
            <polygon points="24,4 30,8 24,12" fill={p.color} />
          </>
        )}
        {p.lineStyle === "dashed" && (
          <line
            x1="2"
            y1="8"
            x2="30"
            y2="8"
            stroke={p.color}
            strokeWidth="2"
            strokeDasharray="5 3"
          />
        )}
        {p.lineStyle === "dotted" && (
          <line
            x1="2"
            y1="8"
            x2="30"
            y2="8"
            stroke={p.color}
            strokeWidth="2"
            strokeDasharray="2 3"
          />
        )}
      </svg>
      <span
        className="text-xs font-mono font-semibold"
        style={{ color: p.color }}
      >
        {p.symbol}
      </span>
      <span className="text-[10px] text-muted-foreground truncate">
        {p.name.split(" ")[0]}
      </span>
      <span className="text-[9px] text-muted-foreground/50 ml-auto">
        {p.charge}
      </span>
    </button>
  );
}
