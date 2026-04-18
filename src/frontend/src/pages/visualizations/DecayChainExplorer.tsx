import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ALL_CHAINS, type DecayChain, type DecayStep } from "@/data/decayChain";
import * as d3 from "d3";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ──────────────── COLOUR CONSTANTS ────────────────
const DECAY_COLORS: Record<string, string> = {
  alpha: "#fbbf24",
  "beta-": "#60a5fa",
  "beta+": "#f87171",
  gamma: "#c084fc",
  ec: "#34d399",
  stable: "#6b7280",
  other: "#22d3ee",
};

const HALF_LIFE_LEGEND = [
  { label: "< 1 s", color: "#f87171" },
  { label: "Seconds", color: "#fb923c" },
  { label: "Minutes", color: "#fbbf24" },
  { label: "Hours", color: "#facc15" },
  { label: "Days", color: "#4ade80" },
  { label: "Years", color: "#22d3ee" },
  { label: "Myr+", color: "#a78bfa" },
  { label: "Stable", color: "#6b7280" },
];

function halfLifeColor(s: number): string {
  if (!Number.isFinite(s)) return "#6b7280";
  if (s < 1) return "#f87171";
  if (s < 60) return "#fb923c";
  if (s < 3600) return "#fbbf24";
  if (s < 86400) return "#facc15";
  if (s < 31536000) return "#4ade80";
  if (s < 3.156e9) return "#22d3ee";
  return "#a78bfa";
}

// ──────────────── EXTRA INLINE CHAINS ────────────────
const ra226StandaloneSteps: DecayStep[] = [
  {
    nuclide: "Ra-226",
    Z: 88,
    N: 138,
    A: 226,
    decayMode: "alpha",
    daughter: "Rn-222",
    halfLifeStr: "1600 yr",
    halfLifeSeconds: 5.05e10,
    Qvalue_MeV: 4.87,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 1,
  },
  {
    nuclide: "Rn-222",
    Z: 86,
    N: 136,
    A: 222,
    decayMode: "alpha",
    daughter: "Po-218",
    halfLifeStr: "3.82 d",
    halfLifeSeconds: 330393,
    Qvalue_MeV: 5.49,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 2,
  },
  {
    nuclide: "Po-218",
    Z: 84,
    N: 134,
    A: 218,
    decayMode: "alpha",
    daughter: "Pb-214",
    halfLifeStr: "3.05 min",
    halfLifeSeconds: 183,
    Qvalue_MeV: 6.0,
    branchingPercent: 99.98,
    particleEmitted: "⁴He (α)",
    stepIndex: 3,
  },
  {
    nuclide: "Pb-214",
    Z: 82,
    N: 132,
    A: 214,
    decayMode: "beta-",
    daughter: "Bi-214",
    halfLifeStr: "19.7 min",
    halfLifeSeconds: 1182,
    Qvalue_MeV: 1.02,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 4,
  },
  {
    nuclide: "Bi-214",
    Z: 83,
    N: 131,
    A: 214,
    decayMode: "beta-",
    daughter: "Po-214",
    halfLifeStr: "26.8 min",
    halfLifeSeconds: 1608,
    Qvalue_MeV: 3.27,
    branchingPercent: 99.98,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 5,
  },
  {
    nuclide: "Po-214",
    Z: 84,
    N: 130,
    A: 214,
    decayMode: "alpha",
    daughter: "Pb-210",
    halfLifeStr: "164 μs",
    halfLifeSeconds: 0.000164,
    Qvalue_MeV: 7.69,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 6,
  },
  {
    nuclide: "Pb-210",
    Z: 82,
    N: 128,
    A: 210,
    decayMode: "beta-",
    daughter: "Bi-210",
    halfLifeStr: "22.3 yr",
    halfLifeSeconds: 7.04e8,
    Qvalue_MeV: 0.064,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 7,
  },
  {
    nuclide: "Bi-210",
    Z: 83,
    N: 127,
    A: 210,
    decayMode: "beta-",
    daughter: "Po-210",
    halfLifeStr: "5.01 d",
    halfLifeSeconds: 432864,
    Qvalue_MeV: 1.163,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 8,
  },
  {
    nuclide: "Po-210",
    Z: 84,
    N: 126,
    A: 210,
    decayMode: "alpha",
    daughter: "Pb-206",
    halfLifeStr: "138.4 d",
    halfLifeSeconds: 11957760,
    Qvalue_MeV: 5.41,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 9,
  },
  {
    nuclide: "Pb-206",
    Z: 82,
    N: 124,
    A: 206,
    decayMode: "stable",
    daughter: "—",
    halfLifeStr: "Stable",
    halfLifeSeconds: Number.POSITIVE_INFINITY,
    Qvalue_MeV: 0,
    branchingPercent: 100,
    particleEmitted: "None (stable)",
    stepIndex: 10,
  },
];

const c14Steps: DecayStep[] = [
  {
    nuclide: "C-14",
    Z: 6,
    N: 8,
    A: 14,
    decayMode: "beta-",
    daughter: "N-14",
    halfLifeStr: "5730 yr",
    halfLifeSeconds: 1.808e11,
    Qvalue_MeV: 0.156,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻) + ν̄ₑ",
    stepIndex: 1,
  },
  {
    nuclide: "N-14",
    Z: 7,
    N: 7,
    A: 14,
    decayMode: "stable",
    daughter: "—",
    halfLifeStr: "Stable",
    halfLifeSeconds: Number.POSITIVE_INFINITY,
    Qvalue_MeV: 0,
    branchingPercent: 100,
    particleEmitted: "None (stable)",
    stepIndex: 2,
  },
];

const k40Steps: DecayStep[] = [
  {
    nuclide: "K-40",
    Z: 19,
    N: 21,
    A: 40,
    decayMode: "beta-",
    daughter: "Ca-40",
    halfLifeStr: "1.248×10⁹ yr",
    halfLifeSeconds: 3.94e16,
    Qvalue_MeV: 1.311,
    branchingPercent: 89.28,
    particleEmitted: "e⁻ (β⁻) + ν̄ₑ",
    stepIndex: 1,
  },
  {
    nuclide: "K-40 (EC)",
    Z: 19,
    N: 21,
    A: 40,
    decayMode: "ec",
    daughter: "Ar-40",
    halfLifeStr: "1.248×10⁹ yr",
    halfLifeSeconds: 3.94e16,
    Qvalue_MeV: 1.504,
    branchingPercent: 10.72,
    particleEmitted: "ν̄ₑ (EC)",
    stepIndex: 2,
  },
  {
    nuclide: "Ca-40",
    Z: 20,
    N: 20,
    A: 40,
    decayMode: "stable",
    daughter: "—",
    halfLifeStr: "Stable",
    halfLifeSeconds: Number.POSITIVE_INFINITY,
    Qvalue_MeV: 0,
    branchingPercent: 100,
    particleEmitted: "None (stable)",
    stepIndex: 3,
  },
];

const EXTRA_CHAINS: DecayChain[] = [
  {
    id: "ra226s",
    label: "Ra-226 → Pb-206 (standalone)",
    parent: "Ra-226",
    product: "Pb-206",
    steps: ra226StandaloneSteps,
  },
  {
    id: "c14",
    label: "C-14 → N-14 (Carbon-14)",
    parent: "C-14",
    product: "N-14",
    steps: c14Steps,
  },
  {
    id: "k40",
    label: "K-40 → Ca-40/Ar-40",
    parent: "K-40",
    product: "Ca-40/Ar-40",
    steps: k40Steps,
  },
];

const ALL_AVAILABLE_CHAINS = [...ALL_CHAINS, ...EXTRA_CHAINS];

// ──────────────── GAMMA PEAK DATA ────────────────
interface GammaPeak {
  nuclide: string;
  energy_keV: number;
  intensity: number;
}

const GAMMA_PEAKS: Record<string, GammaPeak[]> = {
  u238: [
    { nuclide: "Pa-234m", energy_keV: 1001, intensity: 100 },
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Pb-214", energy_keV: 295, intensity: 19 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
    { nuclide: "Bi-214", energy_keV: 1120, intensity: 15 },
    { nuclide: "Bi-214", energy_keV: 1764, intensity: 15 },
    { nuclide: "Bi-214", energy_keV: 2204, intensity: 5 },
  ],
  th232: [
    { nuclide: "Ac-228", energy_keV: 911, intensity: 26 },
    { nuclide: "Ac-228", energy_keV: 969, intensity: 17 },
    { nuclide: "Tl-208", energy_keV: 2614, intensity: 100 },
    { nuclide: "Bi-212", energy_keV: 727, intensity: 7 },
    { nuclide: "Pb-212", energy_keV: 238, intensity: 43 },
    { nuclide: "Tl-208", energy_keV: 583, intensity: 84 },
  ],
  ra226: [
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Pb-214", energy_keV: 295, intensity: 19 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
    { nuclide: "Bi-214", energy_keV: 1764, intensity: 15 },
  ],
  ra226s: [
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
  ],
};

// ──────────────── BATEMAN EQUATIONS ────────────────
function batemanActivity(chain: DecayStep[], tSeconds: number): number[] {
  const members = chain.filter(
    (s) => s.decayMode !== "stable" && Number.isFinite(s.halfLifeSeconds),
  );
  if (members.length === 0) return [];
  const lambdas = members.map((s) => Math.LN2 / s.halfLifeSeconds);
  const n = Math.min(members.length, 8);
  const A: number[] = new Array(n).fill(0);

  // A[0] = N0 * lambda[0] * exp(-lambda[0]*t), normalized to 1 at t→0
  for (let i = 0; i < n; i++) {
    const li = lambdas[i];
    if (i === 0) {
      A[i] = Math.exp(-li * tSeconds);
    } else {
      // Bateman solution for linear chain member i
      let sum = 0;
      for (let k = 0; k <= i; k++) {
        let denom = 1;
        for (let j = 0; j <= i; j++) {
          if (j !== k) denom *= lambdas[j] - lambdas[k];
        }
        if (Math.abs(denom) < 1e-40) continue;
        sum += Math.exp(-lambdas[k] * tSeconds) / denom;
      }
      // multiply by product of all lambda_j for j<i
      let lprod = 1;
      for (let j = 0; j < i; j++) lprod *= lambdas[j];
      A[i] = lprod * sum;
    }
  }
  return A;
}

function buildActivityData(chain: DecayStep[], numPoints = 80) {
  const members = chain.filter(
    (s) => s.decayMode !== "stable" && Number.isFinite(s.halfLifeSeconds),
  );
  if (members.length === 0) return [];
  const parentHL = members[0].halfLifeSeconds;
  const tMin = parentHL * 1e-4;
  const tMax = parentHL * 5;
  const data: Record<string, number | string>[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const tFrac = i / numPoints;
    const tSec = tMin * (tMax / tMin) ** tFrac;
    const activities = batemanActivity(chain, tSec);
    const row: Record<string, number | string> = { t: tSec };
    members.forEach((m, idx) => {
      if (idx < activities.length) {
        const v = Math.max(0, activities[idx]);
        row[m.nuclide] = Number.isFinite(v) ? Number(v.toFixed(6)) : 0;
      }
    });
    data.push(row);
  }
  return data;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} h`;
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} d`;
  if (seconds < 3.156e9) return `${(seconds / 31536000).toFixed(1)} yr`;
  return `${(seconds / 3.156e9).toFixed(2)} Gyr`;
}

// ──────────────── CSV EXPORT ────────────────
function downloadCSV(chain: DecayChain) {
  const header =
    "Step,Nuclide,Z,N,A,Decay Mode,Daughter,Half-life,Q-value (MeV),Branching (%),Particle\n";
  const rows = chain.steps
    .map(
      (s) =>
        `${s.stepIndex},${s.nuclide},${s.Z},${s.N},${s.A},${s.decayMode},${s.daughter},"${s.halfLifeStr}",${s.Qvalue_MeV},${s.branchingPercent},"${s.particleEmitted}"`,
    )
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${chain.label.replace(/[^a-z0-9]/gi, "_")}_decay_chain.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ──────────────── PARTICLE ANIMATION TYPES ────────────────
interface Particle {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mode: string;
  born: number;
}

// ──────────────── NODE / LAYOUT CONSTANTS ────────────────
const NW = 90;
const NH = 56;
const HX = 160;
const MY = 48;
const MX = 24;

// ──────────────── LEFT PANEL: DECAY TREE ────────────────
function DecayTree({
  chainDef,
  activeStep,
  onStepSelect,
}: {
  chainDef: DecayChain;
  activeStep: number;
  onStepSelect: (i: number) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<SVGGElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const animRef = useRef<number>(0);

  const chain = chainDef.steps;
  const svgW = chain.length * HX + MX * 2 + NW;
  const svgH = NH + MY * 2 + 32;
  const cy = MY + NH / 2;

  // Spawn particles when activeStep changes
  useEffect(() => {
    const step = chain[activeStep];
    if (!step || step.decayMode === "stable") return;
    const x1 = MX + activeStep * HX + NW;
    const x2 = MX + (activeStep + 1) * HX;
    const now = performance.now();
    const mode = step.decayMode;
    const newParticles: Particle[] = [];

    if (mode === "alpha") {
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy - 6,
        x2,
        y2: cy - 6,
        mode,
        born: now,
      });
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy + 6,
        x2,
        y2: cy + 6,
        mode,
        born: now,
      });
    } else {
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy,
        x2,
        y2: cy,
        mode,
        born: now,
      });
    }
    setParticles((p) => [...p, ...newParticles]);
  }, [activeStep, chain, cy]);

  // Animation loop for particles
  useEffect(() => {
    let running = true;
    const DURATION = 800;
    function loop() {
      if (!running) return;
      const now = performance.now();
      setParticles((prev) => prev.filter((p) => now - p.born < DURATION));
      animRef.current = requestAnimationFrame(loop);
    }
    animRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // D3 zoom
  useEffect(() => {
    if (!svgRef.current || !wrapRef.current) return;
    const svg = d3.select(svgRef.current);
    const wrap = d3.select(wrapRef.current);
    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.25, 3])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        wrap.attr("transform", event.transform.toString());
      });
    svg.call(zoomBehavior);
    return () => {
      svg.on(".zoom", null);
    };
  }, []);

  const resetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg
      .transition()
      .duration(400)
      .call(d3.zoom<SVGSVGElement, unknown>().transform, d3.zoomIdentity);
  };

  const now = performance.now();
  const DURATION = 800;

  return (
    <div className="flex flex-col h-full min-h-0 gap-2">
      {/* Zoom reset */}
      <div className="flex justify-end px-2">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs gap-1"
          onClick={resetZoom}
        >
          <RotateCcw className="h-3 w-3" /> Reset Zoom
        </Button>
      </div>

      {/* SVG canvas */}
      <div
        className="flex-1 min-h-0 overflow-hidden rounded-xl border border-border bg-card relative"
        style={{ minHeight: 160 }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${chainDef.label} decay chain`}
          style={{ display: "block", cursor: "grab" }}
        >
          <title>{chainDef.label} Decay Chain</title>
          <g ref={wrapRef as React.RefObject<SVGGElement>}>
            {/* Edges */}
            {chain.map((step, i) => {
              if (step.decayMode === "stable") return null;
              const x1 = MX + i * HX + NW;
              const x2 = MX + (i + 1) * HX;
              const color = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
              const isAct = i === activeStep;
              const midX = (x1 + x2) / 2;
              const label =
                step.decayMode === "beta-"
                  ? "β⁻"
                  : step.decayMode === "beta+"
                    ? "β⁺"
                    : step.decayMode === "alpha"
                      ? "α"
                      : step.decayMode === "ec"
                        ? "ε"
                        : step.decayMode;
              return (
                <g key={`edge-${step.nuclide}`} opacity={isAct ? 1 : 0.35}>
                  {isAct && (
                    <line
                      x1={x1}
                      y1={cy}
                      x2={x2 - 10}
                      y2={cy}
                      stroke={color}
                      strokeWidth={10}
                      opacity={0.15}
                    />
                  )}
                  <line
                    x1={x1}
                    y1={cy}
                    x2={x2 - 10}
                    y2={cy}
                    stroke={color}
                    strokeWidth={isAct ? 2.5 : 1.5}
                  />
                  <polygon
                    points={`${x2 - 10},${cy - 5} ${x2},${cy} ${x2 - 10},${cy + 5}`}
                    fill={color}
                  />
                  <rect
                    x={midX - 16}
                    y={cy - 30}
                    width={32}
                    height={18}
                    rx={9}
                    fill={`${color}22`}
                    stroke={`${color}55`}
                    strokeWidth={0.8}
                  />
                  <text
                    x={midX}
                    y={cy - 17}
                    textAnchor="middle"
                    fill={color}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight={isAct ? "bold" : "normal"}
                  >
                    {label}
                  </text>
                  <text
                    x={midX}
                    y={cy + 28}
                    textAnchor="middle"
                    fill={isAct ? "#d1d5db" : "#6b7280"}
                    fontSize="7.5"
                    fontFamily="monospace"
                  >
                    {step.halfLifeStr}
                  </text>
                  <text
                    x={midX}
                    y={cy + 38}
                    textAnchor="middle"
                    fill={isAct ? color : "#4b5563"}
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {step.Qvalue_MeV} MeV
                  </text>
                </g>
              );
            })}

            {/* Particle animations */}
            {particles.map((p) => {
              const elapsed = now - p.born;
              const progress = Math.min(elapsed / DURATION, 1);
              // Only travel 30% of edge
              const travelProgress = Math.min(progress / 0.3, 1);
              const cx2 = p.x1 + (p.x2 - p.x1) * 0.3 * travelProgress;
              const opacity = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;
              const color =
                p.mode === "alpha"
                  ? "#fbbf24"
                  : p.mode === "beta-"
                    ? "#60a5fa"
                    : p.mode === "beta+"
                      ? "#f87171"
                      : "#c084fc";
              const r = p.mode === "alpha" ? 5 : 3;
              return (
                <circle
                  key={p.id}
                  cx={cx2}
                  cy={p.y1}
                  r={r}
                  fill={color}
                  opacity={opacity}
                  style={{ filter: `drop-shadow(0 0 ${r + 2}px ${color})` }}
                />
              );
            })}

            {/* Nodes */}
            {chain.map((step, i) => {
              const nx = MX + i * HX;
              const ny = MY;
              const isAct = i === activeStep;
              const isStable = step.decayMode === "stable";
              const modeColor =
                DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
              const hlColor = halfLifeColor(step.halfLifeSeconds);
              const handleClick = () => onStepSelect(i);
              return (
                <g
                  key={`node-${step.nuclide}-${step.stepIndex}`}
                  data-ocid={`decay-chain.node.${i + 1}`}
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleClick();
                  }}
                >
                  {isAct && (
                    <rect
                      x={nx - 4}
                      y={ny - 4}
                      width={NW + 8}
                      height={NH + 8}
                      rx={12}
                      fill={`${modeColor}15`}
                      stroke={modeColor}
                      strokeWidth={1.5}
                      style={{ filter: `drop-shadow(0 0 8px ${modeColor})` }}
                    />
                  )}
                  {/* Half-life stripe */}
                  <rect
                    x={nx}
                    y={ny + NH - 5}
                    width={NW}
                    height={5}
                    rx={3}
                    fill={isStable ? "#6b7280" : hlColor}
                    opacity={0.8}
                  />
                  <rect
                    x={nx}
                    y={ny}
                    width={NW}
                    height={NH}
                    rx={8}
                    fill={isAct ? `${modeColor}22` : "#131b2a"}
                    stroke={isAct ? modeColor : "#1e2d45"}
                    strokeWidth={isAct ? 2 : 1}
                    tabIndex={0}
                    role="button"
                    aria-label={`${step.nuclide}, step ${i + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleClick();
                    }}
                  />
                  <text
                    x={nx + NW / 2}
                    y={ny + 22}
                    textAnchor="middle"
                    fill={isAct ? modeColor : "#e5e7eb"}
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="monospace"
                    pointerEvents="none"
                  >
                    {step.nuclide}
                  </text>
                  <text
                    x={nx + NW / 2}
                    y={ny + 37}
                    textAnchor="middle"
                    fill={isStable ? "#4ade80" : isAct ? "#9ca3af" : "#4b5563"}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight={isStable ? "bold" : "normal"}
                    pointerEvents="none"
                  >
                    {isStable ? "STABLE" : `Z${step.Z} A${step.A}`}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Accessibility table */}
      <details className="rounded-lg border border-border/60 bg-card/50 text-xs">
        <summary className="px-3 py-2 cursor-pointer font-semibold text-muted-foreground select-none hover:text-foreground">
          Accessible Table ({chain.length} steps)
        </summary>
        <div className="overflow-x-auto p-3">
          <table
            className="w-full text-left"
            aria-label={`${chainDef.label} decay chain`}
          >
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                {[
                  "#",
                  "Nuclide",
                  "Mode",
                  "Daughter",
                  "t½",
                  "Q (MeV)",
                  "Branch%",
                ].map((h) => (
                  <th key={h} className="pb-1 pr-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chain.map((step) => (
                <tr
                  key={step.stepIndex}
                  className="border-b border-border/30 hover:bg-muted/20"
                  data-ocid={`decay-chain.table_row.${step.stepIndex}`}
                >
                  <td className="py-1 pr-3 font-mono">{step.stepIndex}</td>
                  <td className="py-1 pr-3 font-mono font-bold">
                    {step.nuclide}
                  </td>
                  <td
                    className="py-1 pr-3 font-mono"
                    style={{ color: DECAY_COLORS[step.decayMode] }}
                  >
                    {step.decayMode}
                  </td>
                  <td className="py-1 pr-3 font-mono">{step.daughter}</td>
                  <td className="py-1 pr-3 font-mono">{step.halfLifeStr}</td>
                  <td className="py-1 pr-3 font-mono">{step.Qvalue_MeV}</td>
                  <td className="py-1 font-mono">{step.branchingPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

// ──────────────── TAB 1: ACTIVITY OVER TIME ────────────────
const LINE_PALETTE = [
  "#fbbf24",
  "#60a5fa",
  "#f87171",
  "#4ade80",
  "#c084fc",
  "#22d3ee",
  "#fb923c",
  "#a78bfa",
];

function ActivityTab({ chain }: { chain: DecayStep[] }) {
  const members = chain.filter(
    (s) => s.decayMode !== "stable" && Number.isFinite(s.halfLifeSeconds),
  );
  const data = buildActivityData(chain, 80);
  if (members.length === 0 || data.length === 0)
    return (
      <p className="text-muted-foreground p-4">
        No radioactive members in this chain.
      </p>
    );

  const xFormatter = (v: number) => formatTime(v);
  const tooltipFormatter = (value: number) => value.toFixed(4);

  return (
    <div className="flex flex-col gap-3 p-3 h-full min-h-0">
      <div>
        <p className="text-xs font-semibold text-foreground">
          Activity Over Time — Secular Equilibrium
        </p>
        <p className="text-xs text-muted-foreground">
          Bateman equation for linear decay chains. Y-axis normalized to parent
          initial activity = 1.0
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
          <XAxis
            dataKey="t"
            scale="log"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={xFormatter}
            tick={{ fontSize: 9, fill: "#6b7280", fontFamily: "monospace" }}
            label={{
              value: "Time (log scale)",
              position: "insideBottom",
              offset: -12,
              fill: "#6b7280",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#6b7280" }}
            label={{
              value: "Relative Activity",
              angle: -90,
              position: "insideLeft",
              offset: 12,
              fill: "#6b7280",
              fontSize: 10,
            }}
            domain={[0, 1.2]}
          />
          <ReferenceLine
            y={1}
            stroke="#6b7280"
            strokeDasharray="4 4"
            label={{ value: "Equilibrium", fill: "#6b7280", fontSize: 9 }}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1520",
              border: "1px solid #1e2d45",
              borderRadius: 8,
              fontSize: 11,
            }}
            labelStyle={{ color: "#9ca3af" }}
            labelFormatter={(v: number) => `t = ${formatTime(v)}`}
            formatter={(value: number, name: string) => [
              tooltipFormatter(value),
              name,
            ]}
          />
          <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
          {members.slice(0, 8).map((m, i) => (
            <Line
              key={m.nuclide}
              type="monotone"
              dataKey={m.nuclide}
              stroke={LINE_PALETTE[i % LINE_PALETTE.length]}
              strokeWidth={1.8}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground border-t border-border pt-2">
        Secular equilibrium occurs when t½(parent) ≫ t½(daughter). Source:
        Bateman (1910); Faure & Mensing (2005).
      </p>
    </div>
  );
}

// ──────────────── TAB 2: MASS DEFECT ────────────────
function MassDefectTab({ chain }: { chain: DecayStep[] }) {
  const M_ALPHA = 4.002602;
  const M_ELECTRON = 0.000549;
  const U_TO_MEV = 931.494;

  const rows = chain
    .filter((s) => s.decayMode !== "stable")
    .map((s) => {
      let mEmitted = 0;
      if (s.decayMode === "alpha") mEmitted = M_ALPHA;
      else if (s.decayMode === "beta-") mEmitted = M_ELECTRON;
      else if (s.decayMode === "beta+" || s.decayMode === "ec")
        mEmitted = M_ELECTRON;
      const massDefect = s.Qvalue_MeV / U_TO_MEV;
      const beChange = massDefect * U_TO_MEV;
      return {
        step: s.stepIndex,
        parent: s.nuclide,
        daughter: s.daughter,
        mode: s.decayMode,
        massDefect: massDefect.toFixed(6),
        Q: s.Qvalue_MeV,
        beChange: beChange.toFixed(3),
        mEmitted,
      };
    });

  const barData = rows.map((r) => ({ name: r.parent, Q: r.Q, mode: r.mode }));

  return (
    <div className="flex flex-col gap-3 p-3 h-full min-h-0 overflow-y-auto">
      <p className="text-xs font-semibold text-foreground">
        Mass Defect & Q-Values per Step
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/30">
            <tr>
              {[
                "Step",
                "Parent",
                "Daughter",
                "Mode",
                "Δm (u)",
                "Q (MeV)",
                "ΔBE (MeV)",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-1.5 text-left font-semibold text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.step}
                className="border-t border-border/40 hover:bg-muted/20"
              >
                <td className="px-2 py-1 font-mono">{r.step}</td>
                <td className="px-2 py-1 font-mono font-bold">{r.parent}</td>
                <td className="px-2 py-1 font-mono">{r.daughter}</td>
                <td
                  className="px-2 py-1 font-mono"
                  style={{ color: DECAY_COLORS[r.mode] }}
                >
                  {r.mode}
                </td>
                <td className="px-2 py-1 font-mono">{r.massDefect}</td>
                <td className="px-2 py-1 font-mono text-primary">{r.Q}</td>
                <td className="px-2 py-1 font-mono">{r.beChange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground font-mono bg-muted/20 p-2 rounded border border-border">
        Δm = M(parent) − M(daughter) − m(emitted) &nbsp;|&nbsp; Q = Δm × 931.494
        MeV/u &nbsp;|&nbsp; M(⁴He) = 4.002602 u
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={barData}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 60, bottom: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1a2535"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 9, fill: "#6b7280" }}
            label={{
              value: "Q (MeV)",
              position: "insideBottom",
              fill: "#6b7280",
              fontSize: 10,
            }}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 9, fill: "#9ca3af", fontFamily: "monospace" }}
            width={56}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1520",
              border: "1px solid #1e2d45",
              borderRadius: 8,
              fontSize: 11,
            }}
          />
          <Bar dataKey="Q" radius={[0, 3, 3, 0]} barSize={10}>
            {barData.map((entry) => (
              <Cell
                key={`m-${entry.name}`}
                fill={DECAY_COLORS[entry.mode] ?? DECAY_COLORS.other}
                opacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ──────────────── TAB 3: GAMMA SPECTROSCOPY ────────────────
function GammaTab({ chainId }: { chainId: string }) {
  const peaks = GAMMA_PEAKS[chainId];
  const [marker, setMarker] = useState<number | null>(null);

  if (!peaks) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        <p className="mb-2">
          Detailed gamma spectroscopy data is available for the U-238 and Th-232
          series.
        </p>
        <p className="text-xs">
          Source: NNDC/ENSDF. Relative intensities normalized to strongest peak.
        </p>
      </div>
    );
  }

  const sorted = [...peaks].sort((a, b) => a.energy_keV - b.energy_keV);
  const chartData = sorted.map((p) => ({
    energy: p.energy_keV,
    intensity: p.intensity,
    label: `${p.nuclide} ${p.energy_keV}keV`,
  }));
  const maxEnergy = Math.max(...sorted.map((p) => p.energy_keV));

  return (
    <div className="flex flex-col gap-3 p-3 h-full min-h-0">
      <div>
        <p className="text-xs font-semibold text-foreground">
          Gamma-Ray Spectroscopy Peaks
        </p>
        <p className="text-xs text-muted-foreground">
          Click chart to place energy marker. Source: NNDC/ENSDF
        </p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 32 }}
          onClick={(state) => {
            if (state?.activePayload?.[0]) {
              setMarker(state.activePayload[0].payload.energy as number);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
          <XAxis
            dataKey="energy"
            type="number"
            domain={[0, maxEnergy + 200]}
            tick={{ fontSize: 9, fill: "#6b7280" }}
            label={{
              value: "Energy (keV)",
              position: "insideBottom",
              offset: -14,
              fill: "#6b7280",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#6b7280" }}
            label={{
              value: "Intensity (%)",
              angle: -90,
              position: "insideLeft",
              offset: 8,
              fill: "#6b7280",
              fontSize: 10,
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1520",
              border: "1px solid #1e2d45",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(
              value: number,
              _: string,
              entry: { payload?: { label?: string } },
            ) => [`${value}%`, entry?.payload?.label ?? ""]}
          />
          {marker !== null && (
            <ReferenceLine
              x={marker}
              stroke="#22d3ee"
              strokeDasharray="4 4"
              label={{ value: `${marker} keV`, fill: "#22d3ee", fontSize: 9 }}
            />
          )}
          <Bar
            dataKey="intensity"
            fill="#c084fc"
            barSize={3}
            radius={[2, 2, 0, 0]}
            opacity={0.9}
          />
        </BarChart>
      </ResponsiveContainer>
      {marker !== null && (
        <p className="text-xs text-primary font-mono">
          Marker: {marker} keV &nbsp;
          <button
            type="button"
            className="underline text-muted-foreground"
            onClick={() => setMarker(null)}
          >
            clear
          </button>
        </p>
      )}
      <p className="text-xs text-muted-foreground border-t border-border pt-2">
        Gamma spectroscopy peaks from NNDC/ENSDF. Relative intensities
        normalized to strongest peak.
      </p>
    </div>
  );
}

// ──────────────── TAB 4: CHAIN SUMMARY ────────────────
function SummaryTab({ chainDef }: { chainDef: DecayChain }) {
  const chain = chainDef.steps;
  const decaySteps = chain.filter((s) => s.decayMode !== "stable");
  const alphaCount = decaySteps.filter((s) => s.decayMode === "alpha").length;
  const betaCount = decaySteps.filter(
    (s) => s.decayMode === "beta-" || s.decayMode === "beta+",
  ).length;
  const totalQ = decaySteps.reduce((a, s) => a + s.Qvalue_MeV, 0);
  const alphaTotalQ = decaySteps
    .filter((s) => s.decayMode === "alpha")
    .reduce((a, s) => a + s.Qvalue_MeV, 0);
  const betaTotalQ = decaySteps
    .filter((s) => s.decayMode === "beta-" || s.decayMode === "beta+")
    .reduce((a, s) => a + s.Qvalue_MeV, 0);
  const stableEnd = chain.find((s) => s.decayMode === "stable");
  const slowest = decaySteps.reduce(
    (a, s) => (s.halfLifeSeconds > a.halfLifeSeconds ? s : a),
    decaySteps[0],
  );
  const parent = chain[0];
  const chainTypeMap: Record<number, string> = {
    0: "4n (Thorium)",
    1: "4n+1 (Neptunium)",
    2: "4n+2 (Uranium)",
    3: "4n+3 (Actinium)",
  };
  const chainType = parent ? (chainTypeMap[parent.A % 4] ?? "—") : "—";

  const radarData = [
    { subject: "Alpha Q", value: alphaTotalQ },
    { subject: "Beta Q", value: betaTotalQ },
    { subject: "Alpha Steps", value: alphaCount * 2 },
    { subject: "Beta Steps", value: betaCount * 2 },
    { subject: "Total Q/10", value: totalQ / 10 },
  ];

  const stats = [
    { label: "Decay steps", value: decaySteps.length },
    { label: "Alpha decays", value: alphaCount },
    { label: "Beta decays", value: betaCount },
    { label: "Total Q-value", value: `${totalQ.toFixed(2)} MeV` },
    { label: "Final stable", value: stableEnd?.nuclide ?? "—" },
    { label: "Chain type", value: chainType },
    {
      label: "Slowest step",
      value: slowest ? `${slowest.nuclide} (${slowest.halfLifeStr})` : "—",
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-3 h-full min-h-0 overflow-y-auto">
      <p className="text-xs font-semibold text-foreground">
        Chain Summary Statistics
      </p>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-muted/20 border border-border/50 p-2"
          >
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-sm font-mono font-bold text-foreground">
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart
          data={radarData}
          margin={{ top: 8, right: 16, bottom: 8, left: 16 }}
        >
          <PolarGrid stroke="#1e2d45" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#6b7280", fontSize: 9 }}
          />
          <Radar
            name="Chain"
            dataKey="value"
            stroke="#60a5fa"
            fill="#60a5fa"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => downloadCSV(chainDef)}
        data-ocid="decay-chain.csv_download_button"
      >
        <Download className="h-3.5 w-3.5 mr-1.5" />
        Export All Data (CSV)
      </Button>
    </div>
  );
}

// ──────────────── MAIN COMPONENT ────────────────
const TABS = ["Activity", "Mass Defect", "Gamma", "Summary"] as const;
type TabId = (typeof TABS)[number];

export function DecayChainExplorer() {
  const [selectedChainId, setSelectedChainId] = useState("u238");
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("Activity");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const chainDef =
    ALL_AVAILABLE_CHAINS.find((c) => c.id === selectedChainId) ??
    ALL_AVAILABLE_CHAINS[0];
  const chain = chainDef.steps;
  const chainLen = chain.length;
  const prevChainId = useRef(selectedChainId);

  // Reset step when chain changes (using ref to avoid stale dep)
  if (prevChainId.current !== selectedChainId) {
    prevChainId.current = selectedChainId;
    setActiveStep(0);
    setIsPlaying(false);
  }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveStep((s) => Math.max(0, s - 1));
      if (e.key === "ArrowRight")
        setActiveStep((s) => Math.min(chainLen - 1, s + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [chainLen]);

  // Simulation play
  useEffect(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (!isPlaying) return;

    const delay = 2000 / speed;
    intervalRef.current = setTimeout(() => {
      setActiveStep((s) => {
        const next = s + 1;
        if (next >= chainLen) {
          setIsPlaying(false);
          return s;
        }
        return next;
      });
    }, delay);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying, speed, chainLen]);

  const togglePlay = () => {
    if (activeStep >= chain.length - 1) {
      setActiveStep(0);
      setIsPlaying(true);
    } else setIsPlaying((p) => !p);
  };

  const currentStep = chain[activeStep] ?? chain[0];

  return (
    <div
      className="flex flex-col h-screen min-h-0 bg-background"
      data-ocid="decay-chain.page"
    >
      {/* ── Header ── */}
      <div className="border-b border-border bg-card px-4 py-3 shrink-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
            Simulator
          </Badge>
          <Badge variant="outline" className="text-xs">
            D3 · Recharts · Bateman
          </Badge>
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">
          Decay Chain Explorer & Simulator
        </h1>
        <p className="text-muted-foreground text-xs mt-0.5 max-w-2xl">
          Split-pane research dashboard with animated decay trees, secular
          equilibrium curves, gamma spectroscopy, and mass defect analysis.
        </p>
      </div>

      {/* ── Chain selector bar ── */}
      <div className="border-b border-border bg-card/80 px-4 py-2 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground mr-1 font-semibold">
            Chain:
          </span>
          {ALL_AVAILABLE_CHAINS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedChainId(c.id)}
              data-ocid={`decay-chain.chain_selector.${c.id}`}
              aria-pressed={selectedChainId === c.id}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
                selectedChainId === c.id
                  ? "border-primary bg-primary/15 text-primary shadow-sm"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Simulation controls bar ── */}
      <div className="border-b border-border bg-muted/20 px-4 py-2 shrink-0 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isPlaying ? "secondary" : "default"}
            className="h-8 px-3 gap-1.5 text-xs"
            onClick={togglePlay}
            data-ocid="decay-chain.play_button"
            aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs gap-1"
            onClick={() => {
              setIsPlaying(false);
              setActiveStep(0);
            }}
            data-ocid="decay-chain.reset_button"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </Button>
        </div>
        {/* Speed selector */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Speed:</span>
          {([0.5, 1, 2] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              data-ocid={`decay-chain.speed_${s}x`}
              className={`rounded px-2 py-0.5 text-xs font-mono transition-colors ${speed === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {s}x
            </button>
          ))}
        </div>
        {/* Step nav */}
        <div className="flex items-center gap-2 ml-auto">
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs gap-1"
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
            disabled={activeStep === 0}
            data-ocid="decay-chain.step_back_button"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </Button>
          <span className="text-xs font-mono text-foreground min-w-[64px] text-center">
            Step {activeStep + 1} / {chain.length}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs gap-1"
            onClick={() =>
              setActiveStep((s) => Math.min(chain.length - 1, s + 1))
            }
            disabled={activeStep === chain.length - 1}
            data-ocid="decay-chain.step_forward_button"
            aria-label="Next step"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        {/* Current step badge */}
        <div className="hidden lg:flex items-center gap-1.5 ml-2 rounded-full border border-border bg-card px-3 py-1">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background:
                DECAY_COLORS[currentStep.decayMode] ?? DECAY_COLORS.other,
            }}
          />
          <span className="text-xs font-mono text-foreground">
            {currentStep.nuclide}
          </span>
          <span className="text-xs text-muted-foreground">→</span>
          <span className="text-xs font-mono text-foreground">
            {currentStep.daughter}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            {currentStep.halfLifeStr}
          </span>
        </div>
      </div>

      {/* ── Half-life legend ── */}
      <div className="flex flex-wrap gap-2 px-4 py-1.5 bg-card/30 shrink-0 border-b border-border/40">
        <span className="text-xs text-muted-foreground font-semibold">t½:</span>
        {HALF_LIFE_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: item.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Resizable split-pane ── */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* LEFT PANEL */}
          <ResizablePanel
            defaultSize={52}
            minSize={38}
            maxSize={65}
            className="flex flex-col min-h-0"
          >
            <div className="p-3 h-full overflow-hidden flex flex-col">
              <DecayTree
                chainDef={chainDef}
                activeStep={activeStep}
                onStepSelect={setActiveStep}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="bg-border/50 hover:bg-primary/40 transition-colors"
          />

          {/* RIGHT PANEL */}
          <ResizablePanel
            defaultSize={48}
            minSize={35}
            className="flex flex-col min-h-0"
          >
            {/* Tab bar */}
            <div
              className="flex border-b border-border bg-card shrink-0"
              role="tablist"
              aria-label="Analysis tabs"
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`decay-chain.tab_${tab.toLowerCase().replace(" ", "_")}`}
                  className={`px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 min-h-0 overflow-y-auto" role="tabpanel">
              {activeTab === "Activity" && <ActivityTab chain={chain} />}
              {activeTab === "Mass Defect" && <MassDefectTab chain={chain} />}
              {activeTab === "Gamma" && <GammaTab chainId={selectedChainId} />}
              {activeTab === "Summary" && <SummaryTab chainDef={chainDef} />}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default DecayChainExplorer;
