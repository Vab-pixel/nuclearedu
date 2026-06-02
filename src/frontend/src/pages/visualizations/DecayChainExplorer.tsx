import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ──────────────── COLOUR CONSTANTS ────────────────
export const DECAY_COLORS: Record<string, string> = {
  alpha: "#fbbf24",
  "beta-": "#60a5fa",
  "beta+": "#f87171",
  gamma: "#c084fc",
  ec: "#34d399",
  stable: "#6b7280",
  other: "#22d3ee",
};

export const HALF_LIFE_LEGEND = [
  { label: "< 1 s", color: "#f87171" },
  { label: "Seconds", color: "#fb923c" },
  { label: "Minutes", color: "#fbbf24" },
  { label: "Hours", color: "#facc15" },
  { label: "Days", color: "#4ade80" },
  { label: "Years", color: "#22d3ee" },
  { label: "Myr+", color: "#a78bfa" },
  { label: "Stable", color: "#6b7280" },
];

export function halfLifeColor(s: number): string {
  if (!Number.isFinite(s)) return "#6b7280";
  if (s < 1) return "#f87171";
  if (s < 60) return "#fb923c";
  if (s < 3600) return "#fbbf24";
  if (s < 86400) return "#facc15";
  if (s < 31536000) return "#4ade80";
  if (s < 3.156e9) return "#22d3ee";
  return "#a78bfa";
}

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
  u235: [
    { nuclide: "U-235", energy_keV: 185.7, intensity: 57 },
    { nuclide: "Th-227", energy_keV: 236, intensity: 12 },
    { nuclide: "Ra-223", energy_keV: 269, intensity: 14 },
    { nuclide: "Ra-223", energy_keV: 154, intensity: 6 },
    { nuclide: "Bi-211", energy_keV: 351, intensity: 13 },
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
  rn222: [
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Pb-214", energy_keV: 295, intensity: 19 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
    { nuclide: "Bi-214", energy_keV: 1120, intensity: 15 },
  ],
  cs137: [{ nuclide: "Ba-137m", energy_keV: 661.7, intensity: 100 }],
  co60: [
    { nuclide: "Ni-60m", energy_keV: 1173.2, intensity: 100 },
    { nuclide: "Ni-60m", energy_keV: 1332.5, intensity: 100 },
  ],
  am241: [
    { nuclide: "Am-241", energy_keV: 59.5, intensity: 100 },
    { nuclide: "Am-241", energy_keV: 26.3, intensity: 24 },
    { nuclide: "Np-237", energy_keV: 86.5, intensity: 12 },
  ],
  np237: [
    { nuclide: "Np-237", energy_keV: 86.5, intensity: 12 },
    { nuclide: "Pa-233", energy_keV: 311, intensity: 38 },
    { nuclide: "Pa-233", energy_keV: 341, intensity: 4 },
  ],
  i131: [
    { nuclide: "I-131", energy_keV: 364.5, intensity: 100 },
    { nuclide: "I-131", energy_keV: 637.0, intensity: 7.3 },
    { nuclide: "I-131", energy_keV: 284.3, intensity: 6.1 },
    { nuclide: "Xe-131m", energy_keV: 163.9, intensity: 2.0 },
  ],
  sr90: [{ nuclide: "Y-90", energy_keV: 1760.6, intensity: 0.01 }],
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
  for (let i = 0; i < n; i++) {
    const li = lambdas[i];
    if (i === 0) {
      A[i] = Math.exp(-li * tSeconds);
    } else {
      let sum = 0;
      for (let k = 0; k <= i; k++) {
        let denom = 1;
        for (let j = 0; j <= i; j++) {
          if (j !== k) denom *= lambdas[j] - lambdas[k];
        }
        if (Math.abs(denom) < 1e-40) continue;
        sum += Math.exp(-lambdas[k] * tSeconds) / denom;
      }
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

// ──────────────── PARTICLE ANIMATION ────────────────
interface Particle {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mode: string;
  born: number;
  offset: number;
}

// ──────────────── LAYOUT CONSTANTS ────────────────
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
  const renderRef = useRef(0);

  const chain = chainDef.steps;
  const svgW = chain.length * HX + MX * 2 + NW;
  const svgH = NH + MY * 2 + 48;
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

    const count = mode === "alpha" ? 3 : mode === "gamma" ? 2 : 2;
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy + (i - Math.floor(count / 2)) * 8,
        x2,
        y2: cy + (i - Math.floor(count / 2)) * 4,
        mode,
        born: now,
        offset: i * 80,
      });
    }
    setParticles((p) => [...p, ...newParticles]);
  }, [activeStep, chain, cy]);

  // Animation loop
  useEffect(() => {
    let running = true;
    const DURATION = 1000;
    function loop() {
      if (!running) return;
      const now = performance.now();
      setParticles((prev) =>
        prev.filter((p) => now - p.born < DURATION + p.offset),
      );
      renderRef.current += 1;
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
      .scaleExtent([0.2, 4])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        wrap.attr("transform", event.transform.toString());
      });
    svg.call(zoomBehavior);
    return () => {
      svg.on(".zoom", null);
    };
  }, []);

  const resetZoom = useCallback(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg
      .transition()
      .duration(400)
      .call(d3.zoom<SVGSVGElement, unknown>().transform, d3.zoomIdentity);
  }, []);

  const now = performance.now();
  const DURATION = 1000;

  return (
    <div className="flex flex-col h-full min-h-0 gap-2">
      <div className="flex justify-between items-center px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-mono text-primary">
            {chainDef.steps.length}
          </span>{" "}
          steps — scroll/pinch to zoom, drag to pan
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs gap-1"
          onClick={resetZoom}
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </Button>
      </div>

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
            {/* Background glow for active node */}
            {chain.map((step, i) => {
              if (i !== activeStep) return null;
              const nx = MX + i * HX;
              const modeColor =
                DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
              return (
                <ellipse
                  key={`glow-${step.nuclide}`}
                  cx={nx + NW / 2}
                  cy={cy}
                  rx={NW * 0.8}
                  ry={NH * 0.9}
                  fill={modeColor}
                  opacity={0.06}
                  style={{ filter: "blur(8px)" }}
                />
              );
            })}

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
                        : step.decayMode === "gamma"
                          ? "γ"
                          : step.decayMode;
              return (
                <g key={`edge-${step.nuclide}-${i}`} opacity={isAct ? 1 : 0.3}>
                  {isAct && (
                    <line
                      x1={x1}
                      y1={cy}
                      x2={x2 - 10}
                      y2={cy}
                      stroke={color}
                      strokeWidth={12}
                      opacity={0.12}
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
                    x={midX - 18}
                    y={cy - 32}
                    width={36}
                    height={18}
                    rx={9}
                    fill={`${color}22`}
                    stroke={`${color}55`}
                    strokeWidth={0.8}
                  />
                  <text
                    x={midX}
                    y={cy - 18}
                    textAnchor="middle"
                    fill={color}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isAct ? "bold" : "normal"}
                  >
                    {label}
                  </text>
                  <text
                    x={midX}
                    y={cy + 30}
                    textAnchor="middle"
                    fill={isAct ? "#d1d5db" : "#4b5563"}
                    fontSize="7.5"
                    fontFamily="monospace"
                  >
                    {step.halfLifeStr}
                  </text>
                  <text
                    x={midX}
                    y={cy + 40}
                    textAnchor="middle"
                    fill={isAct ? color : "#374151"}
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {step.Qvalue_MeV > 0 ? `${step.Qvalue_MeV} MeV` : ""}
                  </text>
                </g>
              );
            })}

            {/* Particles */}
            {particles.map((p) => {
              const elapsed = now - p.born - p.offset;
              if (elapsed < 0) return null;
              const progress = Math.min(elapsed / DURATION, 1);
              const travel = Math.min(progress / 0.4, 1);
              const px = p.x1 + (p.x2 - p.x1) * 0.35 * travel;
              const opacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) / 0.5;
              const color =
                p.mode === "alpha"
                  ? "#fbbf24"
                  : p.mode === "beta-"
                    ? "#60a5fa"
                    : p.mode === "beta+"
                      ? "#f87171"
                      : p.mode === "gamma"
                        ? "#c084fc"
                        : "#22d3ee";
              const r = p.mode === "alpha" ? 5.5 : p.mode === "gamma" ? 3.5 : 3;
              const shape =
                p.mode === "gamma" ? (
                  <polygon
                    key={p.id}
                    points={`${px},${p.y1 - r * 1.4} ${px + r},${p.y1 + r * 0.7} ${px - r},${p.y1 + r * 0.7}`}
                    fill={color}
                    opacity={opacity}
                    style={{ filter: `drop-shadow(0 0 ${r + 3}px ${color})` }}
                  />
                ) : (
                  <circle
                    key={p.id}
                    cx={px}
                    cy={p.y1}
                    r={r}
                    fill={color}
                    opacity={opacity}
                    style={{ filter: `drop-shadow(0 0 ${r + 2}px ${color})` }}
                  />
                );
              return shape;
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
                  key={`node-${step.nuclide}-${i}`}
                  data-ocid={`decay-chain.node.${i + 1}`}
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleClick();
                  }}
                >
                  {isAct && (
                    <rect
                      x={nx - 5}
                      y={ny - 5}
                      width={NW + 10}
                      height={NH + 10}
                      rx={13}
                      fill={`${modeColor}18`}
                      stroke={modeColor}
                      strokeWidth={2}
                      style={{ filter: `drop-shadow(0 0 10px ${modeColor}80)` }}
                    />
                  )}
                  <rect
                    x={nx}
                    y={ny + NH - 5}
                    width={NW}
                    height={5}
                    rx={3}
                    fill={isStable ? "#6b7280" : hlColor}
                    opacity={0.85}
                  />
                  <rect
                    x={nx}
                    y={ny}
                    width={NW}
                    height={NH}
                    rx={8}
                    fill={isAct ? `${modeColor}28` : "#0d1520"}
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
                    fill={isStable ? "#4ade80" : isAct ? "#9ca3af" : "#374151"}
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

      {/* Nuclide detail card for active step */}
      <NuclideDetailCard
        step={chain[activeStep]}
        stepIndex={activeStep}
        total={chain.length}
      />
    </div>
  );
}

function NuclideDetailCard({
  step,
  stepIndex,
  total,
}: { step: DecayStep; stepIndex: number; total: number }) {
  if (!step) return null;
  const modeColor = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
  return (
    <div className="rounded-xl border border-border bg-card/80 p-3 shrink-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="text-base font-mono font-bold"
            style={{ color: modeColor }}
          >
            {step.nuclide}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold font-mono"
            style={{
              background: `${modeColor}20`,
              color: modeColor,
              border: `1px solid ${modeColor}40`,
            }}
          >
            {step.decayMode}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          Step {stepIndex + 1} / {total}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-xs">
        {[
          { label: "Z", value: step.Z },
          { label: "N", value: step.N },
          { label: "A", value: step.A },
          { label: "Q (MeV)", value: step.Qvalue_MeV || "—" },
          { label: "t½", value: step.halfLifeStr, span: 2 },
          { label: "Daughter", value: step.daughter, span: 2 },
        ].map((f) => (
          <div
            key={f.label}
            className={`rounded-lg bg-muted/20 border border-border/40 px-2 py-1.5 ${(f as { span?: number }).span === 2 ? "col-span-2" : ""}`}
          >
            <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
              {f.label}
            </p>
            <p className="font-mono font-semibold text-foreground truncate">
              {String(f.value)}
            </p>
          </div>
        ))}
      </div>
      {step.particleEmitted && step.decayMode !== "stable" && (
        <p className="mt-1.5 text-xs text-muted-foreground font-mono">
          Emitted:{" "}
          <span style={{ color: modeColor }}>{step.particleEmitted}</span>
          {step.branchingPercent < 100 && (
            <span className="ml-2 text-muted-foreground">
              ({step.branchingPercent}% branch)
            </span>
          )}
        </p>
      )}
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
  const data = useMemo(() => buildActivityData(chain, 80), [chain]);
  if (members.length === 0 || data.length === 0) {
    return (
      <p className="text-muted-foreground p-4 text-sm">
        No radioactive members in this chain.
      </p>
    );
  }
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
            tickFormatter={(v: number) => formatTime(v)}
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
            stroke="#4b5563"
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
              value.toFixed(4),
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

// ──────────────── TAB 2: GAMMA SPECTROSCOPY ────────────────
function GammaTab({ chainId }: { chainId: string }) {
  const peaks = GAMMA_PEAKS[chainId];
  const [marker, setMarker] = useState<number | null>(null);
  const [hovered, setHovered] = useState<GammaPeak | null>(null);

  if (!peaks || peaks.length === 0) {
    return (
      <div className="p-4 text-sm">
        <p className="text-muted-foreground mb-2">
          Detailed gamma spectroscopy data is not catalogued for this chain.
          Selected chains with gamma data: U-238, U-235, Th-232, Ra-226, Rn-222,
          Cs-137, Co-60, Am-241, Np-237, I-131, Sr-90.
        </p>
        <p className="text-xs text-muted-foreground">
          Source: NNDC/ENSDF. Relative intensities normalized to strongest peak.
        </p>
      </div>
    );
  }

  const sorted = [...peaks].sort((a, b) => a.energy_keV - b.energy_keV);
  const maxIntensity = Math.max(...sorted.map((p) => p.intensity));
  const chartData = sorted.map((p) => ({
    energy: p.energy_keV,
    intensity: p.intensity,
    normalizedIntensity: (p.intensity / maxIntensity) * 100,
    label: `${p.nuclide} ${p.energy_keV} keV`,
    nuclide: p.nuclide,
    raw: p,
  }));
  const maxEnergy = Math.max(...sorted.map((p) => p.energy_keV));

  return (
    <div className="flex flex-col gap-3 p-3 h-full min-h-0">
      <div>
        <p className="text-xs font-semibold text-foreground">
          Gamma-Ray Spectroscopy Peaks
        </p>
        <p className="text-xs text-muted-foreground">
          Click a peak to place energy marker. Hover for isotope details.
          Source: NNDC/ENSDF
        </p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 32 }}
          onClick={(state) => {
            if (state?.activePayload?.[0]) {
              const energy = state.activePayload[0].payload.energy as number;
              setMarker(energy);
              setHovered(state.activePayload[0].payload.raw as GammaPeak);
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
              entry: { payload?: { nuclide?: string; energy?: number } },
            ) => [
              `${value.toFixed(1)}%`,
              `${entry?.payload?.nuclide ?? ""} @ ${entry?.payload?.energy ?? ""} keV`,
            ]}
          />
          {marker !== null && (
            <ReferenceLine
              x={marker}
              stroke="#22d3ee"
              strokeDasharray="4 4"
              label={{ value: `${marker} keV`, fill: "#22d3ee", fontSize: 9 }}
            />
          )}
          <Bar dataKey="intensity" barSize={4} radius={[3, 3, 0, 0]}>
            {chartData.map((_entry, i) => (
              <Cell
                key={`gamma-peak-${peaks[i]?.nuclide ?? i}-${peaks[i]?.energy_keV ?? i}`}
                fill={
                  DECAY_COLORS[peaks[i]?.nuclide ? "alpha" : "other"] ??
                  "#c084fc"
                }
                style={{ fill: "#c084fc" }}
                opacity={0.9}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {hovered && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs font-mono">
          <span className="text-primary font-semibold">{hovered.nuclide}</span>
          <span className="text-muted-foreground ml-2">
            E = {hovered.energy_keV} keV
          </span>
          <span className="text-muted-foreground ml-2">
            I = {hovered.intensity}%
          </span>
          <button
            type="button"
            className="ml-auto float-right text-muted-foreground underline"
            onClick={() => {
              setMarker(null);
              setHovered(null);
            }}
          >
            clear
          </button>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/30">
            <tr>
              {["Isotope", "Energy (keV)", "Intensity (%)", "Relative"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-3 py-1.5 text-left font-semibold text-muted-foreground"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr
                key={`${p.nuclide}-${p.energy_keV}`}
                className="border-t border-border/30 hover:bg-muted/20 cursor-pointer"
                onClick={() => setMarker(p.energy_keV)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setMarker(p.energy_keV);
                }}
              >
                <td className="px-3 py-1 font-mono text-primary">
                  {p.nuclide}
                </td>
                <td className="px-3 py-1 font-mono">{p.energy_keV}</td>
                <td className="px-3 py-1 font-mono">{p.intensity}</td>
                <td className="px-3 py-1">
                  <div className="flex items-center gap-1">
                    <div
                      className="h-2 rounded-full bg-primary/60"
                      style={{
                        width: `${(p.intensity / maxIntensity) * 60}px`,
                      }}
                    />
                    <span className="text-muted-foreground text-[10px]">
                      {((p.intensity / maxIntensity) * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ──────────────── TAB 3: MASS DEFECT ────────────────
function MassDefectTab({ chain }: { chain: DecayStep[] }) {
  const U_TO_MEV = 931.494;
  const rows = chain
    .filter((s) => s.decayMode !== "stable")
    .map((s) => {
      const massDefect = s.Qvalue_MeV / U_TO_MEV;
      return {
        step: s.stepIndex,
        parent: s.nuclide,
        daughter: s.daughter,
        mode: s.decayMode,
        massDefect: massDefect.toFixed(7),
        Q: s.Qvalue_MeV,
        beChange: (massDefect * U_TO_MEV).toFixed(3),
      };
    });

  const totalQ = rows.reduce((a, r) => a + r.Q, 0);
  const barData = rows.map((r) => ({ name: r.parent, Q: r.Q, mode: r.mode }));

  return (
    <div className="flex flex-col gap-3 p-3 h-full min-h-0 overflow-y-auto">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground">
          Mass Defect & Q-Values per Step
        </p>
        <span className="rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 text-xs font-mono text-primary">
          Total Q = {totalQ.toFixed(3)} MeV
        </span>
      </div>
      <div className="rounded-lg border border-border bg-muted/10 px-3 py-2 text-xs font-mono text-muted-foreground">
        Δm = Q / 931.494 MeV·u⁻¹ &nbsp;|&nbsp; M(⁴He) = 4.002602 u &nbsp;|&nbsp;
        m(e) = 0.000549 u
      </div>
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
                <td className="px-2 py-1 font-mono text-xs">{r.massDefect}</td>
                <td className="px-2 py-1 font-mono text-primary">{r.Q}</td>
                <td className="px-2 py-1 font-mono">{r.beChange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={barData}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 64, bottom: 4 }}
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
            width={60}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1520",
              border: "1px solid #1e2d45",
              borderRadius: 8,
              fontSize: 11,
            }}
          />
          <Bar dataKey="Q" radius={[0, 3, 3, 0]} barSize={9}>
            {barData.map((entry) => (
              <Cell
                key={`qbar-${entry.name}`}
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

// ──────────────── TAB 4: CARBON DATING CALCULATOR ────────────────
const C14_HALF_LIFE = 5730;
const C14_LAMBDA = Math.LN2 / C14_HALF_LIFE;
const SAMPLE_PRESETS = [
  {
    id: "wood",
    label: "Wood",
    pMC: 100,
    note: "Trees equilibrate with atmospheric CO₂; initial pMC ≈ 100",
  },
  {
    id: "bone",
    label: "Bone",
    pMC: 100,
    note: "Collagen carbon derives from diet; pMC reflects atmospheric C-14 at death",
  },
  {
    id: "charcoal",
    label: "Charcoal",
    pMC: 100,
    note: "From wood — retains the C-14 signature of the living wood",
  },
  {
    id: "cloth",
    label: "Cloth/Linen",
    pMC: 100,
    note: "Plant-fiber textiles incorporate atmospheric C-14 during growth",
  },
  {
    id: "peat",
    label: "Peat",
    pMC: 100,
    note: "Organic peat accumulates from contemporary plant material",
  },
];

const DECAY_CURVE_DATA = Array.from({ length: 101 }, (_, i) => {
  const t = (i / 100) * 50000;
  return { t, fraction: Math.exp(-C14_LAMBDA * t) * 100 };
});

function CarbonDatingTab() {
  const [preset, setPreset] = useState("wood");
  const [nPMC, setNpMC] = useState(50);
  const [result, setResult] = useState<{ age: number; sigma: number } | null>(
    null,
  );
  const [inputError, setInputError] = useState<string | null>(null);

  const selectedPreset =
    SAMPLE_PRESETS.find((p) => p.id === preset) ?? SAMPLE_PRESETS[0];

  function handleCalculate() {
    if (nPMC <= 0 || nPMC >= 100) {
      setInputError("Current pMC must be between 0 and 100 (exclusive).");
      return;
    }
    setInputError(null);
    const ratio = nPMC / 100;
    const age = -Math.log(ratio) / C14_LAMBDA;
    const sigmaAge =
      age * Math.sqrt(2 * 0.005 ** 2 + (40 / C14_HALF_LIFE) ** 2);
    setResult({ age, sigma: sigmaAge });
  }

  const samplePoint = result
    ? { t: Math.round(result.age), fraction: nPMC }
    : null;
  const HALF_LIFE_MARKERS = [5730, 11460, 17190, 22920];

  return (
    <div className="flex flex-col gap-4 p-3 h-full min-h-0 overflow-y-auto">
      <div>
        <p className="text-xs font-semibold text-foreground">
          ¹⁴C Carbon Dating Calculator
        </p>
        <p className="text-xs text-muted-foreground">
          Calculate radiocarbon age using the Libby half-life (5730 ± 40 yr).
          Based on first-order decay: N(t) = N₀ · e^(−λt)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="material-preset-select"
            className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5"
          >
            Material Preset
          </label>
          <select
            id="material-preset-select"
            value={preset}
            onChange={(e) => {
              setPreset(e.target.value);
              setResult(null);
              setInputError(null);
            }}
            className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            data-ocid="carbon-tab.sample_type.select"
          >
            {SAMPLE_PRESETS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
            {selectedPreset.note}
          </p>
        </div>
        <div>
          <label
            htmlFor="npmc-input"
            className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5"
          >
            Current ¹⁴C Activity — N(t) [pMC]
          </label>
          <input
            id="npmc-input"
            type="number"
            min="0.001"
            max="99.999"
            step="0.1"
            value={nPMC}
            onChange={(e) => {
              setNpMC(Number.parseFloat(e.target.value) || 0);
              setResult(null);
              setInputError(null);
            }}
            className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-mono text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            data-ocid="carbon-tab.npmc.input"
          />
          <p className="mt-1 text-[10px] text-muted-foreground">
            % Modern Carbon (pMC). Modern standard = 100 pMC.
          </p>
        </div>
      </div>

      {inputError && (
        <div
          className="rounded-lg border border-amber-500/40 bg-amber-950/30 px-3 py-2 text-xs text-amber-300"
          role="alert"
          data-ocid="carbon-tab.error_state"
        >
          ⚠ {inputError}
        </div>
      )}

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-opacity"
        data-ocid="carbon-tab.calculate.primary_button"
      >
        Calculate Age
      </button>

      {result && (
        <div
          className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2"
          data-ocid="carbon-tab.result.card"
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground mb-0.5">
                Radiocarbon Age
              </p>
              <p className="font-mono text-xl font-bold text-primary">
                {Math.round(result.age).toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">yr BP</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground mb-0.5">
                ±1σ Uncertainty
              </p>
              <p className="font-mono text-xl font-bold text-foreground">
                ±{Math.round(result.sigma).toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">yr</p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Age = {result.age.toFixed(1)} ± {result.sigma.toFixed(1)} yr BP
            &nbsp;|&nbsp; Precision:{" "}
            {((result.sigma / result.age) * 100).toFixed(2)}%
          </p>
          {result.age > 50000 && (
            <div className="rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-xs text-red-300">
              ⚠ Age exceeds ~50,000 yr practical limit for radiocarbon dating.
            </div>
          )}
          <p className="text-[10px] text-muted-foreground">
            IntCal20 calibration (Reimer et al. 2020) may shift calendar age
            ±100–500 yr.
          </p>
        </div>
      )}

      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
          ¹⁴C Decay Curve (50,000 yr)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={DECAY_CURVE_DATA}
            margin={{ top: 4, right: 12, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2535" />
            <XAxis
              dataKey="t"
              type="number"
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 9, fill: "#6b7280" }}
              label={{
                value: "Time (yr BP)",
                position: "insideBottom",
                offset: -12,
                fill: "#6b7280",
                fontSize: 9,
              }}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v: number) => `${v}%`}
              tick={{ fontSize: 9, fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                background: "#0d1520",
                border: "1px solid #1e2d45",
                borderRadius: 8,
                fontSize: 10,
              }}
              formatter={(v: number) => [`${v.toFixed(2)}%`, "¹⁴C remaining"]}
              labelFormatter={(v: number) =>
                `${Math.round(v).toLocaleString()} yr BP`
              }
            />
            {HALF_LIFE_MARKERS.map((yr, i) => (
              <ReferenceLine
                key={yr}
                x={yr}
                stroke="#a855f7"
                strokeDasharray="6 3"
                strokeWidth={1}
                opacity={0.6}
                label={{
                  value: `${i + 1}t½`,
                  position: "top",
                  fontSize: 9,
                  fill: "#a855f7",
                }}
              />
            ))}
            {samplePoint && (
              <ReferenceLine
                x={samplePoint.t}
                stroke="#f59e0b"
                strokeWidth={2}
                label={{
                  value: `${samplePoint.fraction.toFixed(1)}% pMC`,
                  position: "insideTopRight",
                  fontSize: 9,
                  fill: "#f59e0b",
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="fraction"
              stroke="#22d3ee"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-border bg-muted/10 p-2.5 text-[10px] text-muted-foreground">
        <strong className="text-foreground">Methodology:</strong> Libby
        half-life 5730 ± 40 yr. Uncertainty propagated via quadrature
        (analytical 0.5% + t½ uncertainty). Conventional radiocarbon age in yr
        BP (AD 1950 reference). Calibrate with IntCal20 before research use.
      </div>
    </div>
  );
}

// ──────────────── MAIN COMPONENT ────────────────
const TABS = ["Activity", "Gamma", "Mass Defect", "Carbon Dating"] as const;
type TabId = (typeof TABS)[number];

const SPEED_OPTIONS = [0.5, 1, 2, 4] as const;
type SpeedOption = (typeof SPEED_OPTIONS)[number];

export function DecayChainExplorer() {
  const [selectedChainId, setSelectedChainId] = useState("u238");
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("Activity");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<SpeedOption>(1);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevChainId = useRef(selectedChainId);

  const chainDef =
    ALL_CHAINS.find((c) => c.id === selectedChainId) ?? ALL_CHAINS[0];
  const chain = chainDef.steps;
  const chainLen = chain.length;

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
    const delay = 1800 / speed;
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
  const modeColor = DECAY_COLORS[currentStep?.decayMode] ?? DECAY_COLORS.other;

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
          <Badge variant="outline" className="text-xs">
            {ALL_CHAINS.length} Chains
          </Badge>
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">
          Decay Chain Explorer & Simulator
        </h1>
        <p className="text-muted-foreground text-xs mt-0.5 max-w-2xl">
          Split-pane research dashboard — animated decay trees, secular
          equilibrium curves, gamma spectroscopy, mass defect analysis, and
          integrated Carbon Dating Calculator.
        </p>
      </div>
      {/* ── Chain selector bar ── */}
      <div className="border-b border-border bg-card/80 px-4 py-2 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground mr-1 font-semibold">
            Chain:
          </span>
          {ALL_CHAINS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedChainId(c.id)}
              data-ocid={`decay-chain.chain_selector.${c.id}`}
              aria-pressed={selectedChainId === c.id}
              className={`rounded-full border px-2 py-0.5 text-xs font-medium transition-all ${
                selectedChainId === c.id
                  ? "border-primary bg-primary/15 text-primary shadow-sm"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {c.parent}
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
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Speed:</span>
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              data-ocid={`decay-chain.speed_${s}x`}
              className={`rounded px-2 py-0.5 text-xs font-mono transition-colors ${speed === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {s}×
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
          <span className="text-xs font-mono text-foreground min-w-[72px] text-center">
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

        {/* Current step info */}
        <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: modeColor }}
          />
          <span className="text-xs font-mono text-foreground">
            {currentStep?.nuclide}
          </span>
          <span className="text-xs text-muted-foreground">→</span>
          <span className="text-xs font-mono text-foreground">
            {currentStep?.daughter}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            {currentStep?.halfLifeStr}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs gap-1 hidden lg:flex"
          onClick={() => downloadCSV(chainDef)}
          data-ocid="decay-chain.csv_download_button"
        >
          <Download className="h-3 w-3" /> CSV
        </Button>
      </div>
      {/* ── Half-life legend ── */} {/* ── Decay Physics equations panel ── */}
      <div className="hidden">
        <EquationBlock
          latex="^A_Z X \\rightarrow ^{A-4}_{Z-2}Y + ^4_2\\text{He} + Q"
          annotation="Alpha decay: nucleus emits a helium-4 nucleus (alpha particle). Q-value = (M_parent - M_daughter - M_alpha)c²."
          label="Alpha Decay"
        />
        <EquationBlock
          latex="^A_Z X \\rightarrow ^A_{Z+1}Y + e^- + \\bar{\\nu}_e"
          annotation="Beta-minus decay: a neutron converts to a proton, emitting an electron and electron antineutrino."
          label="Beta⁻ Decay"
        />
        <EquationBlock
          latex="^A_Z X \\rightarrow ^A_{Z-1}Y + e^+ + \\nu_e"
          annotation="Beta-plus decay: a proton converts to a neutron, emitting a positron and electron neutrino."
          label="Beta⁺ Decay"
        />
        <EquationBlock
          latex="^A_Z X + e^- \\rightarrow ^A_{Z-1}Y + \\nu_e"
          annotation="Electron capture: a proton captures an inner-shell electron, converting to a neutron with emission of an electron neutrino."
          label="Electron Capture"
        />
        <EquationBlock
          latex="^A_Z X^* \\rightarrow ^A_Z X + \\gamma"
          annotation="Gamma decay: an excited nucleus releases excess energy as a high-energy photon (gamma ray) without changing Z or A."
          label="Gamma Decay"
        />
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-1.5 bg-card/30 shrink-0 border-b border-border/40">
        <span className="text-xs text-muted-foreground font-semibold">
          t½ color:
        </span>
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
        <div className="flex items-center gap-2 ml-auto">
          {(["alpha", "beta-", "beta+", "gamma", "ec"] as const).map((mode) => (
            <div key={mode} className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: DECAY_COLORS[mode] }}
              />
              <span className="text-xs text-muted-foreground">
                {mode === "beta-" ? (
                  <InlineEquation tex="\\beta^-" />
                ) : mode === "beta+" ? (
                  <InlineEquation tex="\\beta^+" />
                ) : mode === "ec" ? (
                  <InlineEquation tex="\\text{EC}" />
                ) : (
                  mode
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* ── Resizable split-pane ── */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* LEFT PANEL */}
          <ResizablePanel
            defaultSize={50}
            minSize={35}
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
            defaultSize={50}
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
                  data-ocid={`decay-chain.tab_${tab.toLowerCase().replace(/ /g, "_")}`}
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
              {activeTab === "Gamma" && <GammaTab chainId={selectedChainId} />}
              {activeTab === "Mass Defect" && <MassDefectTab chain={chain} />}
              {activeTab === "Carbon Dating" && <CarbonDatingTab />}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default DecayChainExplorer;
