import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Badge, B as Button, Z as Zap } from "./index-BllujZqD.js";
import { E as EquationBlock } from "./EquationBlock-DmXtXln_.js";
import { u as useReducedMotion, C as Canvas, O as OrbitControls, S as Slider, a as useThree, b as useFrame, V as Vector3, M as MathUtils } from "./OrbitControls-8hBFxDCY.js";
import { n as nuclides } from "./nuclides-BRGIWNJL.js";
import { P as Plus } from "./plus-aVrMxFRt.js";
import { M as Minus } from "./minus-DHBAPoJ6.js";
import { P as Play } from "./play-BG4WeTjY.js";
import { L as Layers } from "./layers-9cA-LEK4.js";
import { R as ResponsiveContainer, T as Tooltip, P as Legend, Z as ReferenceDot } from "./generateCategoricalChart-BCXr-Xg0.js";
import { L as LineChart, C as CartesianGrid, a as Line } from "./LineChart-BMtkn0nI.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DOCRXNFP.js";
import "./string-CugKFzKt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
class WebGLErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.warn("WebGL canvas error:", error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
function fibonacciSphere(count, radius) {
  const points = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / count);
    const phi = 2 * Math.PI * i / goldenRatio;
    const r = radius * (0.7 + 0.3 * (i / count));
    points.push(
      new Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      )
    );
  }
  return points;
}
const SHELL_MAGIC = [2, 8, 20, 28, 50, 82, 126];
function shellPositions(count, baseRadius) {
  const points = [];
  let remaining = count;
  let shellIdx = 0;
  let prevMagic = 0;
  while (remaining > 0 && shellIdx < SHELL_MAGIC.length) {
    const shellCapacity = SHELL_MAGIC[shellIdx] - prevMagic;
    const inShell = Math.min(remaining, shellCapacity);
    const r = baseRadius * (0.35 + shellIdx * 0.22);
    points.push(...fibonacciSphere(inShell, r));
    remaining -= inShell;
    prevMagic = SHELL_MAGIC[shellIdx];
    shellIdx++;
  }
  if (remaining > 0) {
    const r = baseRadius * (0.35 + shellIdx * 0.22);
    points.push(...fibonacciSphere(remaining, r));
  }
  return points;
}
function getShellLabels(total, baseRadius) {
  const shells = [];
  let remaining = total;
  let shellIdx = 0;
  let prevMagic = 0;
  while (remaining > 0 && shellIdx < SHELL_MAGIC.length) {
    const shellCapacity = SHELL_MAGIC[shellIdx] - prevMagic;
    const inShell = Math.min(remaining, shellCapacity);
    const r = baseRadius * (0.35 + shellIdx * 0.22);
    const magic = SHELL_MAGIC[shellIdx];
    shells.push({
      label: `Shell ${shellIdx + 1} (N=${magic})`,
      radius: r,
      count: inShell
    });
    remaining -= inShell;
    prevMagic = magic;
    shellIdx++;
  }
  return shells;
}
function DecayParticles({
  particles
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "mesh",
    {
      position: p.pos.clone(),
      castShadow: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [p.radius, 12, 12] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color: p.color,
            emissive: p.color,
            emissiveIntensity: 1.2 + Math.sin(p.t * Math.PI) * 0.8,
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
            opacity: 1 - p.t * 0.6
          }
        )
      ]
    },
    `decay-particle-${p.type}-${p.color}`
  )) });
}
function Nucleon({
  position,
  color,
  emissive,
  radius = 0.32
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position, castShadow: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [radius, 16, 16] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color,
        emissive: emissive ?? color,
        emissiveIntensity: 0.35,
        roughness: 0.25,
        metalness: 0.2
      }
    )
  ] });
}
function ShellRings({
  total,
  baseRadius
}) {
  const shells = getShellLabels(total, baseRadius);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: shells.map((shell) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "mesh",
    {
      rotation: [Math.PI / 2, 0, 0],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [shell.radius, 0.015, 8, 64] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#60a5fa", opacity: 0.18, transparent: true })
      ]
    },
    `shell-ring-r${shell.radius.toFixed(3)}`
  )) });
}
function NucleusScene({
  Z,
  N,
  autoRotate,
  shellModel,
  animParticles,
  decayZOverride,
  decayNOverride
}) {
  const groupRef = reactExports.useRef(null);
  const dispZ = decayZOverride ?? Z;
  const dispN = decayNOverride ?? N;
  const total = dispZ + dispN;
  const baseRadius = Math.max(1.2, 0.8 * Math.cbrt(total) + 0.5);
  const positions = reactExports.useMemo(
    () => shellModel ? shellPositions(total, baseRadius) : fibonacciSphere(total, baseRadius),
    [total, baseRadius, shellModel]
  );
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });
  const nucleonRadius = 0.3 + 0.02 * Math.min(total, 20) / 20;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.45 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [8, 8, 8], intensity: 1.4, castShadow: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-8, -4, -4], intensity: 0.5, color: "#7dd3fc" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 0, -10], intensity: 0.3, color: "#f472b6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
      positions.map((pos, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Nucleon,
        {
          position: pos,
          color: i < dispZ ? "#f87171" : "#60a5fa",
          emissive: i < dispZ ? "#ef4444" : "#3b82f6",
          radius: nucleonRadius
        },
        `nucleon-${i}-${dispZ}-${dispN}-${shellModel ? "s" : "f"}`
      )),
      shellModel && /* @__PURE__ */ jsxRuntimeExports.jsx(ShellRings, { total, baseRadius })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DecayParticles, { particles: animParticles })
  ] });
}
function CameraController({
  total,
  targetDist,
  onDistChange
}) {
  const { camera } = useThree();
  const initialised = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const dist = Math.max(6, 2.5 * Math.cbrt(total) + 3);
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
    onDistChange(dist);
    initialised.current = false;
  }, [camera, total, onDistChange]);
  useFrame(() => {
    if (!initialised.current) initialised.current = true;
    const current = camera.position.length();
    if (Math.abs(current - targetDist) > 0.01) {
      const next = MathUtils.lerp(current, targetDist, 0.12);
      camera.position.normalize().multiplyScalar(next);
    }
  });
  return null;
}
const ELEMENT_NAMES = {
  1: { symbol: "H", name: "Hydrogen" },
  2: { symbol: "He", name: "Helium" },
  3: { symbol: "Li", name: "Lithium" },
  4: { symbol: "Be", name: "Beryllium" },
  5: { symbol: "B", name: "Boron" },
  6: { symbol: "C", name: "Carbon" },
  7: { symbol: "N", name: "Nitrogen" },
  8: { symbol: "O", name: "Oxygen" },
  9: { symbol: "F", name: "Fluorine" },
  10: { symbol: "Ne", name: "Neon" },
  11: { symbol: "Na", name: "Sodium" },
  12: { symbol: "Mg", name: "Magnesium" },
  13: { symbol: "Al", name: "Aluminium" },
  14: { symbol: "Si", name: "Silicon" },
  15: { symbol: "P", name: "Phosphorus" },
  16: { symbol: "S", name: "Sulfur" },
  17: { symbol: "Cl", name: "Chlorine" },
  18: { symbol: "Ar", name: "Argon" },
  19: { symbol: "K", name: "Potassium" },
  20: { symbol: "Ca", name: "Calcium" },
  26: { symbol: "Fe", name: "Iron" },
  27: { symbol: "Co", name: "Cobalt" },
  36: { symbol: "Kr", name: "Krypton" },
  38: { symbol: "Sr", name: "Strontium" },
  42: { symbol: "Mo", name: "Molybdenum" },
  43: { symbol: "Tc", name: "Technetium" },
  44: { symbol: "Ru", name: "Ruthenium" },
  49: { symbol: "In", name: "Indium" },
  53: { symbol: "I", name: "Iodine" },
  54: { symbol: "Xe", name: "Xenon" },
  55: { symbol: "Cs", name: "Caesium" },
  56: { symbol: "Ba", name: "Barium" },
  82: { symbol: "Pb", name: "Lead" },
  83: { symbol: "Bi", name: "Bismuth" },
  84: { symbol: "Po", name: "Polonium" },
  86: { symbol: "Rn", name: "Radon" },
  88: { symbol: "Ra", name: "Radium" },
  90: { symbol: "Th", name: "Thorium" },
  91: { symbol: "Pa", name: "Protactinium" },
  92: { symbol: "U", name: "Uranium" },
  94: { symbol: "Pu", name: "Plutonium" },
  95: { symbol: "Am", name: "Americium" }
};
function getElement(Z) {
  return ELEMENT_NAMES[Z] ?? { symbol: `Z${Z}`, name: `Element ${Z}` };
}
function checkStability(Z, N) {
  const found = nuclides.find((n) => n.Z === Z && n.N === N);
  if (!found) return "unstable";
  return found.decayModes.includes("stable") ? "stable" : "unstable";
}
const BW_AV = 15.85;
const BW_AS = 18.34;
const BW_AC = 0.711;
const BW_AA = 23.21;
const BW_AP = 12;
function pairingTerm(Z, N, A) {
  const isEvenZ = Z % 2 === 0;
  const isEvenN = N % 2 === 0;
  if (isEvenZ && isEvenN) return BW_AP / Math.sqrt(A);
  if (!isEvenZ && !isEvenN) return -BW_AP / Math.sqrt(A);
  return 0;
}
function calcBindingEnergy(Z, N) {
  const A = Z + N;
  if (A < 1)
    return {
      volume: 0,
      surface: 0,
      coulomb: 0,
      asymmetry: 0,
      pairing: 0,
      total: 0,
      perNucleon: 0
    };
  const volume = BW_AV * A;
  const surface = -BW_AS * A ** (2 / 3);
  const coulomb = -BW_AC * Z * (Z - 1) / A ** (1 / 3);
  const asymmetry = -BW_AA * (A - 2 * Z) ** 2 / A;
  const pairing = pairingTerm(Z, N, A);
  const total = volume + surface + coulomb + asymmetry + pairing;
  return {
    volume,
    surface,
    coulomb,
    asymmetry,
    pairing,
    total,
    perNucleon: total / A
  };
}
const SPIN_PARITY = {
  "1-0": "1/2+",
  "1-1": "1+",
  "1-2": "1/2+",
  "2-2": "0+",
  "3-3": "1+",
  "3-4": "3/2−",
  "6-6": "0+",
  "6-8": "0+",
  "7-7": "1+",
  "8-8": "0+",
  "9-9": "1/2+",
  "10-10": "0+",
  "11-11": "3+",
  "19-21": "4−",
  "20-20": "0+",
  "26-30": "0+",
  "27-33": "5+",
  "82-126": "0+",
  "82-124": "0+",
  "92-143": "7/2−",
  "92-146": "0+",
  "88-138": "0+",
  "83-126": "9/2−",
  "95-146": "5/2−"
};
function getSpinParity(Z, N) {
  return SPIN_PARITY[`${Z}-${N}`] ?? null;
}
function getMagicBadge(Z, N) {
  const magicZ = SHELL_MAGIC.includes(Z);
  const magicN = SHELL_MAGIC.includes(N);
  return { magicZ, magicN, doubleMagic: magicZ && magicN };
}
const ISOTOPE_PRESETS = [
  { label: "H-1", Z: 1, N: 0 },
  { label: "²H", Z: 1, N: 1 },
  { label: "He-4", Z: 2, N: 2 },
  { label: "C-12", Z: 6, N: 6 },
  { label: "N-14", Z: 7, N: 7 },
  { label: "O-16", Z: 8, N: 8 },
  { label: "Ca-40", Z: 20, N: 20 },
  { label: "Fe-56", Z: 26, N: 30 },
  { label: "Pb-208", Z: 82, N: 126 },
  { label: "Bi-209", Z: 83, N: 126 },
  { label: "Ra-226", Z: 88, N: 138 },
  { label: "U-235", Z: 92, N: 143 },
  { label: "U-238", Z: 92, N: 146 },
  { label: "Am-241", Z: 95, N: 146 }
];
function getStabilityGradient(Z, N) {
  const A = Z + N;
  const valleyN = A < 40 ? Z : Math.round(Z * (1 + 0.4 * (Z / 118)));
  const deviation = Math.abs(N - valleyN);
  const isNeutronRich = N > valleyN;
  const strength = Math.min(deviation / 20, 1);
  if (deviation < 2) {
    return `radial-gradient(ellipse at center,
      oklch(0.15 0.08 260 / 0.95) 0%,
      oklch(0.12 0.12 250 / 0.85) 40%,
      oklch(0.10 0.06 240 / 0.7) 100%)`;
  }
  if (isNeutronRich) {
    return `radial-gradient(ellipse at center,
      oklch(${0.12 + strength * 0.03} ${0.08 + strength * 0.06} ${140 + strength * 20} / 0.95) 0%,
      oklch(0.11 0.06 150 / 0.85) 40%,
      oklch(0.09 0.03 160 / 0.7) 100%)`;
  }
  return `radial-gradient(ellipse at center,
    oklch(${0.12 + strength * 0.04} ${0.08 + strength * 0.06} ${30 + strength * 10} / 0.95) 0%,
    oklch(0.11 0.05 25 / 0.85) 40%,
    oklch(0.09 0.03 20 / 0.7) 100%)`;
}
const MINI_MAX_Z = 30;
const MINI_MAX_N = 40;
function getMiniCellColor(z, n, activeZ, activeN) {
  if (z === activeZ && n === activeN) return "#ffffff";
  const nd = nuclides.find((nuc) => nuc.Z === z && nuc.N === n);
  if (!nd) return "#1a1a2e";
  const mode = nd.decayModes[0];
  if (mode === "stable") return "#14b8a6";
  if (mode === "beta-") return "#84cc16";
  if (mode === "beta+") return "#f97316";
  if (mode === "alpha") return "#ef4444";
  if (mode === "gamma") return "#a78bfa";
  return "#6366f1";
}
function MiniNuclideChart({
  activeZ,
  activeN,
  onCellClick
}) {
  const cellSize = 4;
  const width = MINI_MAX_N * cellSize + 1;
  const height = MINI_MAX_Z * cellSize + 1;
  const cells = reactExports.useMemo(() => {
    const result = [];
    for (let z = 1; z <= MINI_MAX_Z; z++) {
      for (let n = 0; n <= MINI_MAX_N; n++) {
        result.push({ z, n, color: getMiniCellColor(z, n, activeZ, activeN) });
      }
    }
    return result;
  }, [activeZ, activeN]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border bg-card/60 p-3",
      "data-ocid": "nucleus-viz.mini_chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Mini Chart of Nuclides" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width,
              height,
              viewBox: `0 0 ${width} ${height}`,
              "aria-label": "Mini Chart of Nuclides showing isotope stability",
              role: "img",
              style: { cursor: "crosshair" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Mini Chart of Nuclides — click to select isotope" }),
                cells.map(({ z, n, color }) => {
                  const x = n * cellSize;
                  const y = (MINI_MAX_Z - z) * cellSize;
                  const isActive = z === activeZ && n === activeN;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x,
                      y,
                      width: cellSize - 0.5,
                      height: cellSize - 0.5,
                      fill: color,
                      opacity: isActive ? 1 : 0.85,
                      onClick: () => onCellClick(z, n),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") onCellClick(z, n);
                      },
                      style: { cursor: "pointer" }
                    },
                    `${z}-${n}`
                  );
                }),
                activeZ <= MINI_MAX_Z && activeN <= MINI_MAX_N && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: activeN * cellSize + cellSize / 2,
                      y1: 0,
                      x2: activeN * cellSize + cellSize / 2,
                      y2: height,
                      stroke: "rgba(255,255,255,0.6)",
                      strokeWidth: "0.5",
                      strokeDasharray: "2 2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: 0,
                      y1: (MINI_MAX_Z - activeZ) * cellSize + cellSize / 2,
                      x2: width,
                      y2: (MINI_MAX_Z - activeZ) * cellSize + cellSize / 2,
                      stroke: "rgba(255,255,255,0.6)",
                      strokeWidth: "0.5",
                      strokeDasharray: "2 2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: activeN * cellSize + cellSize / 2,
                      cy: (MINI_MAX_Z - activeZ) * cellSize + cellSize / 2,
                      r: 3,
                      fill: "white",
                      stroke: "#000",
                      strokeWidth: "0.8"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: width - 1,
                    y: height + 0,
                    fontSize: "3.5",
                    fill: "#6b7280",
                    textAnchor: "end",
                    children: "N→"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: -1, y: 4, fontSize: "3.5", fill: "#6b7280", textAnchor: "start", children: "Z↑" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 text-xs text-muted-foreground min-w-0", children: [
            { color: "#14b8a6", label: "Stable" },
            { color: "#84cc16", label: "β⁻" },
            { color: "#f97316", label: "β⁺" },
            { color: "#ef4444", label: "α" },
            { color: "#a78bfa", label: "IT/γ" },
            { color: "#1a1a2e", label: "Unknown" }
          ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block w-2 h-2 rounded-sm flex-shrink-0",
                style: { background: color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: label })
          ] }, label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Click cell to jump sliders" })
      ]
    }
  );
}
function buildBEChartData(currentZ, currentN) {
  const theoreticalPoints = [];
  for (let A = 2; A <= 238; A += 2) {
    const Z = Math.round(A / (1 + BW_AC * A ** (2 / 3) / (4 * BW_AA)));
    const N = A - Z;
    if (Z < 1 || N < 0) continue;
    const be = calcBindingEnergy(Z, N);
    theoreticalPoints.push({
      A,
      bePerNucleon: +be.perNucleon.toFixed(3),
      totalBE: +be.total.toFixed(1)
    });
  }
  const experimentalMap = /* @__PURE__ */ new Map();
  for (const nuc of nuclides) {
    if (nuc.bindingEnergyPerNucleon_MeV && nuc.A > 1) {
      const prev = experimentalMap.get(nuc.A);
      if (!prev || nuc.bindingEnergyPerNucleon_MeV > prev.bePerNucleon) {
        experimentalMap.set(nuc.A, {
          bePerNucleon: nuc.bindingEnergyPerNucleon_MeV,
          totalBE: nuc.bindingEnergyPerNucleon_MeV * nuc.A
        });
      }
    }
  }
  const currentBE = calcBindingEnergy(currentZ, currentN);
  const currentA = currentZ + currentN;
  return { theoreticalPoints, experimentalMap, currentA, currentBE };
}
function StaticNucleusDiagram({ Z, N }) {
  const el = getElement(Z);
  const A = Z + N;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 bg-card rounded-xl border border-border p-8 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "200",
        height: "200",
        viewBox: "-100 -100 200 200",
        "aria-label": `Static diagram of ${el.name}-${A} nucleus`,
        role: "img",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: `${el.name}-${A} nucleus diagram` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "0",
              cy: "0",
              r: "55",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeDasharray: "4 3",
              opacity: "0.3"
            }
          ),
          Array.from({ length: Math.min(Z, 20) }, (_, i) => {
            const angle = i / Math.min(Z, 20) * 2 * Math.PI;
            const r = 30 + i % 3 * 12;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: r * Math.cos(angle),
                cy: r * Math.sin(angle),
                r: "7",
                fill: "#f87171",
                opacity: "0.85"
              },
              `p-a${angle.toFixed(4)}`
            );
          }),
          Array.from({ length: Math.min(N, 20) }, (_, i) => {
            const angle = (i + 0.5) / Math.min(N, 20) * 2 * Math.PI;
            const r = 25 + i % 3 * 12;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: r * Math.cos(angle),
                cy: r * Math.sin(angle),
                r: "7",
                fill: "#60a5fa",
                opacity: "0.85"
              },
              `n-a${angle.toFixed(4)}`
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "text",
            {
              x: "-38",
              y: "80",
              fontSize: "10",
              fill: "#f87171",
              fontFamily: "monospace",
              children: [
                "● Proton (Z=",
                Z,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "0", y: "80", fontSize: "10", fill: "#60a5fa", fontFamily: "monospace", children: [
            "● Neutron (N=",
            N,
            ")"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Static fallback — WebGL not available" })
  ] });
}
const ZOOM_MIN = 3;
const ZOOM_MAX = 30;
const ZOOM_STEP_CAM = 2;
function NucleusVisualizer() {
  const [Z, setZ] = reactExports.useState(26);
  const [N, setN] = reactExports.useState(30);
  const [interacting, setInteracting] = reactExports.useState(false);
  const [cameraTarget, setCameraTarget] = reactExports.useState(10);
  const [shellModel, setShellModel] = reactExports.useState(false);
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = reactExports.useState(
    "formula"
  );
  const [animating, setAnimating] = reactExports.useState(false);
  const [animType, setAnimType] = reactExports.useState(null);
  const [animProgress, setAnimProgress] = reactExports.useState(0);
  const [animParticles, setAnimParticles] = reactExports.useState([]);
  const [decayDisplayZ, setDecayDisplayZ] = reactExports.useState();
  const [decayDisplayN, setDecayDisplayN] = reactExports.useState();
  const animFrameRef = reactExports.useRef(null);
  const animStartRef = reactExports.useRef(0);
  const el = getElement(Z);
  const A = Z + N;
  const stability = checkStability(Z, N);
  const found = nuclides.find((n) => n.Z === Z && n.N === N);
  const magic = getMagicBadge(Z, N);
  const spinParity = getSpinParity(Z, N);
  const ariaLabel = `3D nucleus of ${el.name}-${A}: ${Z} protons (red), ${N} neutrons (blue). Stability: ${stability}.`;
  const handleDistChange = reactExports.useCallback((d) => setCameraTarget(d), []);
  const zoomIn = () => setCameraTarget((d) => Math.max(ZOOM_MIN, d - ZOOM_STEP_CAM));
  const zoomOut = () => setCameraTarget((d) => Math.min(ZOOM_MAX, d + ZOOM_STEP_CAM));
  const be = calcBindingEnergy(Z, N);
  const shellLabels = reactExports.useMemo(
    () => getShellLabels(Z + N, Math.max(1.2, 0.8 * Math.cbrt(Z + N) + 0.5)),
    [Z, N]
  );
  const stabilityGradient = reactExports.useMemo(() => getStabilityGradient(Z, N), [Z, N]);
  const ANIM_DURATION = {
    alpha: 2500,
    "beta-": 2e3,
    "beta+": 2e3
  };
  function buildInitialParticles(type) {
    const baseRadius = Math.max(1.2, 0.8 * Math.cbrt(Z + N) + 0.5);
    if (type === "alpha") {
      const dirs = [
        new Vector3(1, 0.3, 0.2).normalize(),
        new Vector3(-0.2, -1, 0.4).normalize(),
        new Vector3(0.5, 0.8, -0.6).normalize(),
        new Vector3(-0.8, 0.2, 0.8).normalize()
      ];
      return dirs.map((dir) => ({
        type: "alpha",
        pos: dir.clone().multiplyScalar(baseRadius * 0.9),
        vel: dir.clone().multiplyScalar(0.12),
        t: 0,
        color: "#fbbf24",
        radius: 0.45
      }));
    }
    if (type === "beta-") {
      const dir12 = new Vector3(0.8, 0.5, 0.3).normalize();
      const dir22 = new Vector3(-0.6, -0.7, 0.4).normalize();
      return [
        {
          type: "electron",
          pos: dir12.clone().multiplyScalar(baseRadius * 0.8),
          vel: dir12.clone().multiplyScalar(0.18),
          t: 0,
          color: "#38bdf8",
          radius: 0.18
        },
        {
          type: "antineutrino",
          pos: dir22.clone().multiplyScalar(baseRadius * 0.8),
          vel: dir22.clone().multiplyScalar(0.22),
          t: 0,
          color: "#e879f9",
          radius: 0.12
        }
      ];
    }
    const dir1 = new Vector3(0.7, -0.5, 0.5).normalize();
    const dir2 = new Vector3(-0.5, 0.8, -0.3).normalize();
    return [
      {
        type: "positron",
        pos: dir1.clone().multiplyScalar(baseRadius * 0.8),
        vel: dir1.clone().multiplyScalar(0.18),
        t: 0,
        color: "#f87171",
        radius: 0.18
      },
      {
        type: "antineutrino",
        pos: dir2.clone().multiplyScalar(baseRadius * 0.8),
        vel: dir2.clone().multiplyScalar(0.22),
        t: 0,
        color: "#e879f9",
        radius: 0.12
      }
    ];
  }
  function startDecayAnim(type) {
    if (animating) return;
    setAnimType(type);
    setAnimating(true);
    setAnimProgress(0);
    const initial = buildInitialParticles(type);
    setAnimParticles(initial);
    if (type === "alpha") {
      setDecayDisplayZ(Z - 2);
      setDecayDisplayN(N - 2);
    } else if (type === "beta-") {
      setDecayDisplayZ(Z + 1);
      setDecayDisplayN(N - 1);
    } else {
      setDecayDisplayZ(Z - 1);
      setDecayDisplayN(N + 1);
    }
    animStartRef.current = performance.now();
    const duration = ANIM_DURATION[type];
    function tick() {
      const elapsed = performance.now() - animStartRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setAnimProgress(progress);
      setAnimParticles(
        (prev) => prev.map((p) => ({
          ...p,
          t: progress,
          pos: p.pos.clone().add(p.vel.clone().multiplyScalar(progress * 18))
        }))
      );
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        if (type === "alpha") {
          setZ((z) => Math.max(1, z - 2));
          setN((n) => Math.max(0, n - 2));
        } else if (type === "beta-") {
          setZ((z) => z + 1);
          setN((n) => Math.max(0, n - 1));
        } else {
          setZ((z) => Math.max(1, z - 1));
          setN((n) => n + 1);
        }
        setAnimParticles([]);
        setDecayDisplayZ(void 0);
        setDecayDisplayN(void 0);
        setAnimating(false);
        setAnimType(null);
        setAnimProgress(0);
      }
    }
    animFrameRef.current = requestAnimationFrame(tick);
  }
  function stopAnim() {
    if (animFrameRef.current !== null)
      cancelAnimationFrame(animFrameRef.current);
    setAnimating(false);
    setAnimType(null);
    setAnimProgress(0);
    setAnimParticles([]);
    setDecayDisplayZ(void 0);
    setDecayDisplayN(void 0);
  }
  reactExports.useEffect(
    () => () => {
      if (animFrameRef.current !== null)
        cancelAnimationFrame(animFrameRef.current);
    },
    []
  );
  const canAlpha = Z >= 3 && N >= 2 && A >= 4;
  const canBetaMinus = N >= 1;
  const canBetaPlus = Z >= 2;
  const beChartData = reactExports.useMemo(() => buildBEChartData(Z, N), [Z, N]);
  const theoreticalChartData = beChartData.theoreticalPoints.map((pt) => {
    var _a;
    return {
      A: pt.A,
      theoretical: pt.bePerNucleon,
      experimental: ((_a = beChartData.experimentalMap.get(pt.A)) == null ? void 0 : _a.bePerNucleon) ?? null
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      "data-ocid": "nucleus-viz.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-intermediate", children: "Intermediate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-advanced", children: "3D · Three.js · Simulator" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Advanced Nucleus Visualizer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-2xl", children: "High-fidelity 3D nucleus with decay mode animations, stability heatmap, mini Chart of Nuclides, and Bethe-Weizsäcker binding energy analysis. Adjust Z/N sliders, select presets, or play decay animations." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl px-4 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative rounded-2xl overflow-hidden border border-border",
                  style: { height: 440, background: stabilityGradient },
                  "data-ocid": "nucleus-viz.canvas_target",
                  "aria-label": ariaLabel,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 pointer-events-none z-10",
                        style: {
                          background: "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full h-full",
                        style: {
                          filter: "drop-shadow(0 0 16px rgba(96,165,250,0.25)) drop-shadow(0 0 32px rgba(248,113,113,0.15))"
                        },
                        children: prefersReduced ? /* @__PURE__ */ jsxRuntimeExports.jsx(StaticNucleusDiagram, { Z, N }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          WebGLErrorBoundary,
                          {
                            fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(StaticNucleusDiagram, { Z, N }),
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                role: "img",
                                "aria-label": ariaLabel,
                                className: "w-full h-full",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Canvas,
                                  {
                                    shadows: true,
                                    camera: { position: [0, 0, 10], fov: 45 },
                                    gl: { antialias: true },
                                    onPointerDown: () => setInteracting(true),
                                    onPointerUp: () => setInteracting(false),
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        CameraController,
                                        {
                                          total: Z + N,
                                          targetDist: cameraTarget,
                                          onDistChange: handleDistChange
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        NucleusScene,
                                        {
                                          Z,
                                          N,
                                          autoRotate: !interacting && !prefersReduced && !animating,
                                          shellModel,
                                          animParticles,
                                          decayZOverride: decayDisplayZ,
                                          decayNOverride: decayDisplayN
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        OrbitControls,
                                        {
                                          enablePan: false,
                                          enableZoom: true,
                                          minDistance: ZOOM_MIN,
                                          maxDistance: ZOOM_MAX,
                                          makeDefault: true
                                        }
                                      )
                                    ] })
                                  }
                                )
                              }
                            )
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-lg bg-card/90 backdrop-blur-sm border border-border px-3 py-1.5 text-sm font-mono font-bold text-foreground shadow-lg", children: [
                      el.symbol,
                      "-",
                      A
                    ] }) }),
                    shellModel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-28 z-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-lg bg-blue-500/20 border border-blue-400/40 px-2.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-sm", children: "Shell Model" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 z-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `rounded-lg px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm ${stability === "stable" ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30" : "bg-amber-400/20 text-amber-300 border-amber-400/30"}`,
                        children: stability === "stable" ? "Stable" : "Unstable"
                      }
                    ) }),
                    animating && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-12 left-3 right-3 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full bg-card/70 backdrop-blur-sm border border-border px-3 py-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: animType === "alpha" ? "α Decay in progress…" : animType === "beta-" ? "β⁻ Decay in progress…" : "β⁺ Decay in progress…" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
                          Math.round(animProgress * 100),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `h-1.5 rounded-full transition-all ${animType === "alpha" ? "bg-amber-400" : animType === "beta-" ? "bg-blue-400" : "bg-red-400"}`,
                          style: { width: `${animProgress * 100}%` }
                        }
                      ) })
                    ] }) }),
                    !prefersReduced && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-1 shadow-sm",
                        role: "toolbar",
                        "aria-label": "Camera zoom controls",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              className: "h-7 w-7 rounded-full p-0",
                              onClick: zoomIn,
                              "aria-label": "Zoom in",
                              "data-ocid": "nucleus-viz.zoom_in_button",
                              disabled: cameraTarget <= ZOOM_MIN,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground px-0.5 select-none", children: "zoom" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              className: "h-7 w-7 rounded-full p-0",
                              onClick: zoomOut,
                              "aria-label": "Zoom out",
                              "data-ocid": "nucleus-viz.zoom_out_button",
                              disabled: cameraTarget >= ZOOM_MAX,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl border border-border bg-card p-4",
                  "data-ocid": "nucleus-viz.decay_controls",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-amber-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Decay Mode Animations" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: animType === "alpha" ? "secondary" : "outline",
                          className: "gap-1.5 text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/70",
                          disabled: !canAlpha || animating,
                          onClick: () => startDecayAnim("alpha"),
                          "data-ocid": "nucleus-viz.play_alpha_button",
                          title: !canAlpha ? "Alpha decay requires A≥4, Z≥3, N≥2" : "Play alpha decay animation",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
                            "Play α Decay"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: animType === "beta-" ? "secondary" : "outline",
                          className: "gap-1.5 text-xs border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/70",
                          disabled: !canBetaMinus || animating,
                          onClick: () => startDecayAnim("beta-"),
                          "data-ocid": "nucleus-viz.play_betaminus_button",
                          title: !canBetaMinus ? "Requires N≥1" : "Play β⁻ decay animation",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
                            "Play β⁻ Decay"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: animType === "beta+" ? "secondary" : "outline",
                          className: "gap-1.5 text-xs border-red-500/40 text-red-300 hover:bg-red-500/10 hover:border-red-500/70",
                          disabled: !canBetaPlus || animating,
                          onClick: () => startDecayAnim("beta+"),
                          "data-ocid": "nucleus-viz.play_betaplus_button",
                          title: !canBetaPlus ? "Requires Z≥2" : "Play β⁺ decay animation",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
                            "Play β⁺ Decay"
                          ]
                        }
                      ),
                      animating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "destructive",
                          className: "gap-1.5 text-xs",
                          onClick: stopAnim,
                          "data-ocid": "nucleus-viz.stop_anim_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-3 w-3" }),
                            "Stop"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Animation shows emitted particles. Nucleus updates to daughter isotope after animation completes." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-1.5 py-1 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: shellModel ? "secondary" : "ghost",
                    className: "h-7 rounded-full px-3 text-xs gap-1.5",
                    onClick: () => setShellModel((v) => !v),
                    "data-ocid": "nucleus-viz.shell_model_toggle",
                    "aria-pressed": shellModel,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3" }),
                      shellModel ? "Shell Model ON" : "Shell Model OFF"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: shellModel ? "Nucleons arranged in concentric shells by magic numbers (2, 8, 20, 28, 50, 82, 126)" : "Toggle to see shell model arrangement" })
              ] }),
              shellModel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl border border-border bg-card/60 p-4",
                  "data-ocid": "nucleus-viz.shell_labels",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Shell Occupancy" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: shellLabels.map((shell) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "rounded-full bg-blue-500/10 border border-blue-400/25 px-3 py-0.5 text-xs font-mono text-blue-300",
                        children: [
                          shell.label,
                          ": ",
                          shell.count,
                          " nucleons"
                        ]
                      },
                      shell.label
                    )) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl border border-border bg-card p-5",
                  "data-ocid": "nucleus-viz.info_panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground mb-3 text-lg flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        el.name,
                        "-",
                        A
                      ] }),
                      magic.doubleMagic && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-400/20 border border-amber-400/50 px-2 py-0.5 text-xs font-bold text-amber-300", children: "✦ Double Magic" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mb-3", children: [
                      magic.magicZ && !magic.doubleMagic && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-violet-500/15 border border-violet-400/40 px-2 py-0.5 text-xs font-semibold text-violet-300", children: [
                        "Magic Z=",
                        Z
                      ] }),
                      magic.magicN && !magic.doubleMagic && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-cyan-500/15 border border-cyan-400/40 px-2 py-0.5 text-xs font-semibold text-cyan-300", children: [
                        "Magic N=",
                        N
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 gap-3", children: [
                      { label: "Protons (Z)", value: Z, mono: true },
                      { label: "Neutrons (N)", value: N, mono: true },
                      { label: "Mass number (A)", value: A, mono: true },
                      {
                        label: "N/Z ratio",
                        value: (N / Math.max(Z, 1)).toFixed(3),
                        mono: true
                      },
                      {
                        label: "Stability",
                        value: stability === "stable" ? "Stable" : "Unstable"
                      },
                      { label: "Half-life", value: (found == null ? void 0 : found.halfLifeStr) ?? "—" },
                      {
                        label: "B/A (data)",
                        value: (found == null ? void 0 : found.bindingEnergyPerNucleon_MeV) ? `${found.bindingEnergyPerNucleon_MeV} MeV` : "—"
                      },
                      {
                        label: "B/A (BW)",
                        value: `${be.perNucleon.toFixed(3)} MeV`
                      }
                    ].map(({ label, value, mono }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "dd",
                        {
                          className: `text-sm font-semibold text-foreground ${mono ? "font-mono" : ""}`,
                          children: String(value)
                        }
                      )
                    ] }, label)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex flex-wrap gap-2", children: [
                      spinParity && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground font-mono", children: [
                        "Jᵖ = ",
                        spinParity
                      ] }),
                      found == null ? void 0 : found.decayModes.map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground",
                          children: mode
                        },
                        mode
                      ))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col gap-3",
                  "data-ocid": "nucleus-viz.controls",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "z-slider",
                            className: "text-sm font-semibold text-foreground",
                            children: "Protons (Z)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-red-400", children: Z })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Slider,
                        {
                          id: "z-slider",
                          min: 1,
                          max: 118,
                          step: 1,
                          value: [Z],
                          onValueChange: ([v]) => setZ(v),
                          "aria-label": "Number of protons",
                          "aria-valuenow": Z,
                          "aria-valuemin": 1,
                          "aria-valuemax": 118,
                          "data-ocid": "nucleus-viz.z_slider",
                          className: "[&_[role=slider]]:bg-red-400"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground", children: [
                        "Atomic number — defines the element (",
                        el.name,
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "n-slider",
                            className: "text-sm font-semibold text-foreground",
                            children: "Neutrons (N)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-blue-400", children: N })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Slider,
                        {
                          id: "n-slider",
                          min: 0,
                          max: 180,
                          step: 1,
                          value: [N],
                          onValueChange: ([v]) => setN(v),
                          "aria-label": "Number of neutrons",
                          "aria-valuenow": N,
                          "aria-valuemin": 0,
                          "aria-valuemax": 180,
                          "data-ocid": "nucleus-viz.n_slider",
                          className: "[&_[role=slider]]:bg-blue-400"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: "Neutron number — defines the isotope" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MiniNuclideChart,
                {
                  activeZ: Z,
                  activeN: N,
                  onCellClick: (z, n) => {
                    setZ(z);
                    setN(n);
                  }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-4 mb-6",
              "data-ocid": "nucleus-viz.presets",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Quick Select Isotope" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ISOTOPE_PRESETS.map((preset) => {
                  const isActive = Z === preset.Z && N === preset.N;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setZ(preset.Z);
                        setN(preset.N);
                      },
                      "data-ocid": `nucleus-viz.preset.${preset.label.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`,
                      "aria-pressed": isActive,
                      className: `rounded-full border px-3 py-1 text-xs font-mono font-semibold transition-colors ${isActive ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
                      children: preset.label
                    },
                    preset.label
                  );
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-6 mb-6",
              "data-ocid": "nucleus-viz.binding_energy",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg", children: "Binding Energy Analysis" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Bethe-Weizsäcker formula for ",
                      el.name,
                      "-",
                      A
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex rounded-lg border border-border overflow-hidden",
                      role: "tablist",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            role: "tab",
                            type: "button",
                            "aria-selected": activeTab === "formula",
                            className: `px-3 py-1.5 text-xs font-semibold transition-colors ${activeTab === "formula" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-muted/30"}`,
                            onClick: () => setActiveTab("formula"),
                            "data-ocid": "nucleus-viz.tab.formula",
                            children: "BW Formula"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            role: "tab",
                            type: "button",
                            "aria-selected": activeTab === "nuclear_chart",
                            className: `px-3 py-1.5 text-xs font-semibold transition-colors ${activeTab === "nuclear_chart" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-muted/30"}`,
                            onClick: () => setActiveTab("nuclear_chart"),
                            "data-ocid": "nucleus-viz.tab.nuclear_chart",
                            children: "Nuclear Chart"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                activeTab === "formula" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    EquationBlock,
                    {
                      latex: "B = a_V A - a_S A^{2/3} - a_C \\frac{Z(Z-1)}{A^{1/3}} - a_A \\frac{(A-2Z)^2}{A} + \\delta(A,Z)",
                      annotation: "Bethe-Weizsäcker formula: Volume, Surface, Coulomb, Asymmetry, and Pairing terms",
                      label: "Semi-Empirical Mass Formula"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2", children: [
                    [
                      {
                        label: "Volume term",
                        value: be.volume,
                        note: `+aV·A = +${BW_AV}·${A}`
                      },
                      {
                        label: "Surface term",
                        value: be.surface,
                        note: "−aS·A^(2/3)"
                      },
                      {
                        label: "Coulomb term",
                        value: be.coulomb,
                        note: "−aC·Z(Z−1)/A^(1/3)"
                      },
                      {
                        label: "Asymmetry term",
                        value: be.asymmetry,
                        note: "−aA·(A−2Z)²/A"
                      },
                      {
                        label: "Pairing term δ",
                        value: be.pairing,
                        note: A % 2 === 0 ? Z % 2 === 0 ? "even-even: +" : "odd-odd: −" : "odd-A: 0"
                      }
                    ].map(({ label, value, note }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "dd",
                        {
                          className: `font-mono text-sm font-semibold ${value >= 0 ? "text-emerald-400" : "text-red-400"}`,
                          children: [
                            value >= 0 ? "+" : "",
                            value.toFixed(2),
                            " MeV"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60 font-mono", children: note })
                    ] }, label)),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 border-t border-border pt-3 sm:col-span-1 col-span-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wider font-bold", children: "Total B" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-mono text-base font-bold text-primary", children: [
                        be.total.toFixed(2),
                        " MeV"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60 font-mono", children: [
                        "B/A = ",
                        be.perNucleon.toFixed(3),
                        " MeV/nucleon"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Parameters:" }),
                    " aV = ",
                    BW_AV,
                    ", aS = ",
                    BW_AS,
                    ", aC =",
                    " ",
                    BW_AC,
                    ", aA = ",
                    BW_AA,
                    ", aP = ",
                    BW_AP,
                    " MeV. Iron-56 has the highest binding energy per nucleon (~8.79 MeV) — the peak of the binding energy curve."
                  ] }) })
                ] }),
                activeTab === "nuclear_chart" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "nucleus-viz.be_chart", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
                    "B/A vs. mass number A. Theoretical Bethe-Weizsäcker curve (line) vs. experimental data from dataset (dots). Current isotope",
                    " ",
                    el.symbol,
                    "-",
                    A,
                    " marked with reference dot."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    LineChart,
                    {
                      data: theoreticalChartData,
                      margin: { top: 5, right: 30, left: 10, bottom: 5 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CartesianGrid,
                          {
                            strokeDasharray: "3 3",
                            stroke: "rgba(255,255,255,0.06)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          XAxis,
                          {
                            dataKey: "A",
                            stroke: "#6b7280",
                            tick: { fill: "#9ca3af", fontSize: 11 },
                            label: {
                              value: "Mass Number A",
                              position: "insideBottom",
                              offset: -2,
                              fill: "#9ca3af",
                              fontSize: 11
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          YAxis,
                          {
                            stroke: "#6b7280",
                            tick: { fill: "#9ca3af", fontSize: 11 },
                            domain: [0, 9.5],
                            label: {
                              value: "B/A (MeV/nucleon)",
                              angle: -90,
                              position: "insideLeft",
                              offset: 10,
                              fill: "#9ca3af",
                              fontSize: 11
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Tooltip,
                          {
                            contentStyle: {
                              background: "oklch(0.15 0 0)",
                              border: "1px solid oklch(0.25 0 0)",
                              borderRadius: "8px",
                              fontSize: 12
                            },
                            labelStyle: { color: "#e5e7eb" },
                            itemStyle: { color: "#9ca3af" },
                            formatter: (value, name) => [
                              `${value == null ? void 0 : value.toFixed(3)} MeV/nucleon`,
                              name === "theoretical" ? "BW Theoretical" : "Experimental"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11, color: "#9ca3af" } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Line,
                          {
                            type: "monotone",
                            dataKey: "theoretical",
                            stroke: "#60a5fa",
                            strokeWidth: 2,
                            dot: false,
                            name: "BW Theoretical"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Line,
                          {
                            type: "monotone",
                            dataKey: "experimental",
                            stroke: "#34d399",
                            strokeWidth: 0,
                            dot: { r: 2.5, fill: "#34d399", strokeWidth: 0 },
                            connectNulls: false,
                            name: "Experimental"
                          }
                        ),
                        beChartData.currentA >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ReferenceDot,
                          {
                            x: beChartData.currentA,
                            y: +beChartData.currentBE.perNucleon.toFixed(3),
                            r: 6,
                            fill: "#f59e0b",
                            stroke: "#fbbf24",
                            strokeWidth: 2,
                            label: {
                              value: `${el.symbol}-${A}`,
                              position: "top",
                              fill: "#fbbf24",
                              fontSize: 10
                            }
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Source: Bethe-Weizsäcker SEMF (theoretical); experimental data from NNDC/BNL ENSDF. The curve peaks near Fe-56, explaining why nuclear fusion powers stars up to iron and fission works for heavy nuclei." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap gap-4 text-sm text-muted-foreground",
              "aria-label": "Color legend",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block h-3 w-3 rounded-full bg-red-400",
                      "aria-hidden": "true"
                    }
                  ),
                  "Proton (positively charged)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block h-3 w-3 rounded-full bg-blue-400",
                      "aria-hidden": "true"
                    }
                  ),
                  "Neutron (no charge)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block h-3 w-3 rounded-full bg-amber-400",
                      "aria-hidden": "true"
                    }
                  ),
                  "α particle (He-4 nucleus)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block h-3 w-3 rounded-full bg-sky-400",
                      "aria-hidden": "true"
                    }
                  ),
                  "Electron (β⁻)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block h-3 w-3 rounded-full bg-pink-400",
                      "aria-hidden": "true"
                    }
                  ),
                  "Anti-neutrino / neutrino indicator"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-full text-xs mt-1", children: [
                  "Background color indicates proximity to valley of beta stability (blue-purple = near valley, green = neutron-rich, orange = proton-rich).",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "Tip: Click and drag to rotate · Scroll or ±buttons to zoom · Click mini chart cells to jump to that isotope"
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  NucleusVisualizer,
  NucleusVisualizer as default
};
