import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { type DecayMode, type Nuclide, nuclides } from "@/data/nuclides";
import * as d3 from "d3";
import {
  BookOpen,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  X,
  ZoomIn,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CELL_SIZE = 14;
const CELL_GAP = 1;
const STEP = CELL_SIZE + CELL_GAP;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5.0;
const ZOOM_STEP = 0.15;
const AXIS_LEFT = 50;
const AXIS_BOTTOM = 40;

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterMode = DecayMode | "all";
type Palette = "default" | "deuteranopia";
type ColorMode = "decay" | "halflife" | "binding" | "freshness";

// ─── Color Maps ───────────────────────────────────────────────────────────────
export const COLOR_MAPS: Record<Palette, Record<string, string>> = {
  default: {
    stable: "#9ca3af",
    alpha: "#fbbf24",
    "beta-": "#60a5fa",
    "beta+": "#4ade80",
    gamma: "#c084fc",
    other: "#22d3ee",
  },
  deuteranopia: {
    stable: "#9ca3af",
    alpha: "#f97316",
    "beta-": "#3b82f6",
    "beta+": "#e879f9",
    gamma: "#facc15",
    other: "#22d3ee",
  },
};

export const FRESHNESS_LEGEND = [
  { label: "0–7 days", color: "#10b981" },
  { label: "8–30 days", color: "#f59e0b" },
  { label: ">30 days / no data", color: "#6b7280" },
];

export const FILTER_OPTIONS: { label: string; value: FilterMode }[] = [
  { label: "All", value: "all" },
  { label: "Alpha", value: "alpha" },
  { label: "β⁻ Decay", value: "beta-" },
  { label: "β⁺/EC Decay", value: "beta+" },
  { label: "Stable", value: "stable" },
  { label: "Gamma", value: "gamma" },
  { label: "Other", value: "other" },
];

const DECAY_FILTER_OPTS = FILTER_OPTIONS.slice(1); // exclude "all" for checkbox mode

const MAGIC_NUMBERS = [2, 8, 20, 28, 50, 82, 126];

// ─── Color helpers ────────────────────────────────────────────────────────────
function getFreshnessColor(nuclide: Nuclide): string {
  if (!nuclide.lastUpdated) return "#374151";
  const diffDays =
    (Date.now() - new Date(nuclide.lastUpdated).getTime()) / 86_400_000;
  if (diffDays <= 7) return "#10b981";
  if (diffDays <= 30) return "#f59e0b";
  return "#6b7280";
}

// Log-scale half-life color: purple=short lived → yellow=stable
function getHalfLifeColor(nuclide: Nuclide): string {
  if (nuclide.halfLifeSeconds === null) return "#e9d5ff"; // stable → light purple/cream
  const s = nuclide.halfLifeSeconds;
  if (s <= 0) return "#1e1b4b";
  const logS = Math.log10(s);
  // Range: -10 (very short) to 20 (very long-lived)
  const t = Math.max(0, Math.min(1, (logS + 10) / 30));
  return d3.interpolateViridis(t);
}

// Binding energy per nucleon: 0–9 MeV range, diverging
function getBindingEnergyColor(nuclide: Nuclide): string {
  if (nuclide.bindingEnergyPerNucleon_MeV === null) return "#374151";
  const t = Math.max(0, Math.min(1, nuclide.bindingEnergyPerNucleon_MeV / 9));
  return d3.interpolateInferno(t);
}

export function getColor(
  nuclide: Nuclide,
  palette: Palette,
  colorMode: ColorMode,
): string {
  if (colorMode === "freshness") return getFreshnessColor(nuclide);
  if (colorMode === "halflife") return getHalfLifeColor(nuclide);
  if (colorMode === "binding") return getBindingEnergyColor(nuclide);
  const primary = nuclide.decayModes[0] ?? "other";
  return COLOR_MAPS[palette][primary] ?? COLOR_MAPS[palette].other;
}

// ─── Radar chart for comparison ───────────────────────────────────────────────
type RadarDimension = {
  key: string;
  label: string;
  getValue: (n: Nuclide) => number;
  max: number;
};

const RADAR_DIMS: RadarDimension[] = [
  { key: "Z", label: "Z", getValue: (n) => n.Z, max: 100 },
  { key: "N", label: "N", getValue: (n) => n.N, max: 160 },
  {
    key: "binding",
    label: "B/A",
    getValue: (n) => n.bindingEnergyPerNucleon_MeV ?? 0,
    max: 9,
  },
  {
    key: "halflife",
    label: "log(t½)",
    getValue: (n) =>
      n.halfLifeSeconds ? Math.max(0, Math.log10(n.halfLifeSeconds) + 10) : 30,
    max: 30,
  },
  {
    key: "Qvalue",
    label: "Q (MeV)",
    getValue: (n) => Math.abs(n.Qvalue_MeV ?? 0),
    max: 10,
  },
];

function RadarChart({
  nuclides: ns,
}: {
  nuclides: Nuclide[];
  palette: Palette;
}) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const angleStep = (2 * Math.PI) / RADAR_DIMS.length;

  function axisPoint(i: number, radius: number) {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  function polygonPath(n: Nuclide) {
    const pts = RADAR_DIMS.map((dim, i) => {
      const val = dim.getValue(n);
      const norm = Math.min(1, val / dim.max);
      return axisPoint(i, norm * r);
    });
    return `${pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")}Z`;
  }

  const RADAR_COLORS = ["#60a5fa", "#4ade80", "#fbbf24", "#c084fc", "#f87171"];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[200px] mx-auto"
      role="img"
      aria-label="Radar chart comparing nuclide properties"
    >
      <title>Radar chart comparing nuclide properties</title>
      {/* Web */}
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={RADAR_DIMS.map((_, i) => {
            const p = axisPoint(i, r * scale);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={0.5}
        />
      ))}
      {/* Axes */}
      {RADAR_DIMS.map((dim, i) => {
        const p = axisPoint(i, r);
        return (
          <g key={dim.key}>
            <line
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.5}
            />
            <text
              x={axisPoint(i, r + 14).x}
              y={axisPoint(i, r + 14).y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#9ca3af"
              fontSize="9"
            >
              {dim.label}
            </text>
          </g>
        );
      })}
      {/* Data polygons */}
      {ns.map((n, ni) => (
        <path
          key={n.symbol}
          d={polygonPath(n)}
          fill={`${RADAR_COLORS[ni % RADAR_COLORS.length]}33`}
          stroke={RADAR_COLORS[ni % RADAR_COLORS.length]}
          strokeWidth={1.5}
        />
      ))}
      {/* Legend dots */}
      {ns.map((n, ni) => (
        <circle
          key={`${n.symbol}-dot`}
          cx={10}
          cy={10 + ni * 14}
          r={3}
          fill={RADAR_COLORS[ni % RADAR_COLORS.length]}
        />
      ))}
      {ns.map((n, ni) => (
        <text
          key={`${n.symbol}-lbl`}
          x={17}
          y={10 + ni * 14}
          dominantBaseline="central"
          fill="#e5e7eb"
          fontSize="8"
        >
          {n.symbol}
        </text>
      ))}
    </svg>
  );
}

// ─── Color mode legend data ────────────────────────────────────────────────────
function HalfLifeLegend() {
  const steps = 6;
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-3 w-36 rounded"
        style={{
          background: `linear-gradient(to right, ${Array.from({ length: steps }, (_, i) => d3.interpolateViridis(i / (steps - 1))).join(", ")})`,
        }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground w-36">
        <span>Short</span>
        <span>Stable</span>
      </div>
    </div>
  );
}

function BindingLegend() {
  const steps = 6;
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-3 w-36 rounded"
        style={{
          background: `linear-gradient(to right, ${Array.from({ length: steps }, (_, i) => d3.interpolateInferno(i / (steps - 1))).join(", ")})`,
        }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground w-36">
        <span>0 MeV</span>
        <span>9 MeV</span>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function NuclideChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [selected, setSelected] = useState<Nuclide | null>(null);
  const [comparison, setComparison] = useState<Nuclide[]>([]);
  const [compareTab, setCompareTab] = useState<"table" | "radar">("table");
  const [inspectorTab, setInspectorTab] = useState<"details" | "compare">(
    "details",
  );
  const [filter, setFilter] = useState<FilterMode>("all");
  const [decayFilters, setDecayFilters] = useState<Set<string>>(
    new Set(["alpha", "beta-", "beta+", "stable", "gamma", "other"]),
  );
  const [zRange, setZRange] = useState<[number, number]>([0, 100]);
  const [aRange, setARange] = useState<[number, number]>([0, 250]);
  const [palette, setPalette] = useState<Palette>("default");
  const [colorMode, setColorMode] = useState<ColorMode>("decay");
  const [showMagicLines, setShowMagicLines] = useState(true);
  const [showValleyOfStability, setShowValleyOfStability] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [fitZoom, setFitZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Derived
  const maxN = useMemo(() => Math.max(...nuclides.map((n) => n.N)), []);
  const maxZ = useMemo(() => Math.max(...nuclides.map((n) => n.Z)), []);
  const svgW = (maxN + 2) * STEP + AXIS_LEFT + 20;
  const svgH = (maxZ + 2) * STEP + AXIS_BOTTOM + 20;

  const displayed = useMemo(() => {
    return nuclides.filter((n) => {
      if (filter !== "all" && !n.decayModes.includes(filter as DecayMode))
        return false;
      if (filter === "all") {
        const hasMode = n.decayModes.some((m) => decayFilters.has(m));
        if (!hasMode) return false;
      }
      if (n.Z < zRange[0] || n.Z > zRange[1]) return false;
      if (n.A < aRange[0] || n.A > aRange[1]) return false;
      return true;
    });
  }, [filter, decayFilters, zRange, aRange]);

  // Fit to container
  const recalcFit = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerW = rect.width || 900;
    const containerH = rect.height || 500;
    const fit = Math.min(containerW / svgW, containerH / svgH);
    const clampedFit = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, fit));
    setFitZoom(clampedFit);
    setZoom(clampedFit);
    setPan({ x: 0, y: 0 });
  }, [svgW, svgH]);

  useLayoutEffect(() => {
    recalcFit();
  }, [recalcFit]);

  useEffect(() => {
    const obs = new ResizeObserver(recalcFit);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [recalcFit]);

  // Keyboard zoom
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLButtonElement
      )
        return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
      } else if (e.key === "0") {
        setZoom(fitZoom);
        setPan({ x: 0, y: 0 });
      } else if (e.key === "Escape") {
        setShowInspector(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fitZoom]);

  // D3 draw
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg
      .selectAll(
        ".nuclide-cell, .axis-label, .magic-line, .magic-label, .valley-line",
      )
      .remove();

    // Axis tick labels
    for (let n = 0; n <= maxN; n += 10) {
      svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", AXIS_LEFT + n * STEP + CELL_SIZE / 2)
        .attr("y", svgH - AXIS_BOTTOM + 16)
        .attr("text-anchor", "middle")
        .attr("fill", "#6b7280")
        .attr("font-size", "9px")
        .text(n);
    }
    for (let z = 0; z <= maxZ; z += 10) {
      svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", AXIS_LEFT - 8)
        .attr("y", svgH - AXIS_BOTTOM - z * STEP + CELL_SIZE / 2 + 4)
        .attr("text-anchor", "end")
        .attr("fill", "#6b7280")
        .attr("font-size", "9px")
        .text(z);
    }

    // Magic number lines
    if (showMagicLines) {
      for (const mn of MAGIC_NUMBERS) {
        if (mn <= maxN) {
          const x = AXIS_LEFT + mn * STEP - CELL_GAP / 2;
          svg
            .append("line")
            .attr("class", "magic-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", svgH - AXIS_BOTTOM)
            .attr("stroke", "#818cf8")
            .attr("stroke-width", 0.8)
            .attr("stroke-dasharray", "4,3")
            .attr("opacity", 0.55);
          svg
            .append("text")
            .attr("class", "magic-label")
            .attr("x", x + 2)
            .attr("y", 10)
            .attr("fill", "#818cf8")
            .attr("font-size", "7px")
            .text(`N=${mn}`);
        }
        if (mn <= maxZ) {
          const y = svgH - AXIS_BOTTOM - mn * STEP - CELL_GAP / 2;
          svg
            .append("line")
            .attr("class", "magic-line")
            .attr("x1", AXIS_LEFT)
            .attr("x2", svgW)
            .attr("y1", y)
            .attr("y2", y)
            .attr("stroke", "#f472b6")
            .attr("stroke-width", 0.8)
            .attr("stroke-dasharray", "4,3")
            .attr("opacity", 0.55);
          svg
            .append("text")
            .attr("class", "magic-label")
            .attr("x", AXIS_LEFT + 2)
            .attr("y", y - 2)
            .attr("fill", "#f472b6")
            .attr("font-size", "7px")
            .text(`Z=${mn}`);
        }
      }
    }

    // Valley of stability (N≈Z for light, N≈1.5Z for heavy)
    if (showValleyOfStability) {
      const valleyPts: [number, number][] = Array.from(
        { length: maxZ + 1 },
        (_, z) => {
          const nIdeal = z <= 20 ? z : Math.round(z + (z - 20) * 0.4);
          return [nIdeal, z];
        },
      );
      const lineGen = d3
        .line<[number, number]>()
        .x(([n]) => AXIS_LEFT + n * STEP + CELL_SIZE / 2)
        .y(([, z]) => svgH - AXIS_BOTTOM - z * STEP + CELL_SIZE / 2)
        .curve(d3.curveCatmullRom);

      svg
        .append("path")
        .attr("class", "valley-line")
        .datum(valleyPts)
        .attr("d", lineGen)
        .attr("fill", "none")
        .attr("stroke", "#34d399")
        .attr("stroke-width", 1.2)
        .attr("stroke-dasharray", "6,4")
        .attr("opacity", 0.7);
    }

    // Nuclide cells
    for (const n of displayed) {
      const cx = AXIS_LEFT + n.N * STEP;
      const cy = svgH - AXIS_BOTTOM - n.Z * STEP;
      const color = getColor(n, palette, colorMode);
      const isSelected = selected?.symbol === n.symbol;
      const isInComparison = comparison.some((c) => c.symbol === n.symbol);

      svg
        .append("rect")
        .attr("class", "nuclide-cell")
        .attr("x", cx)
        .attr("y", cy)
        .attr("width", CELL_SIZE)
        .attr("height", CELL_SIZE)
        .attr("rx", 1.5)
        .attr("fill", color)
        .attr("opacity", isSelected ? 1 : 0.85)
        .attr(
          "stroke",
          isInComparison ? "#f59e0b" : isSelected ? "#fff" : "none",
        )
        .attr("stroke-width", isInComparison ? 2 : 1.5)
        .attr("tabindex", "0")
        .attr("role", "button")
        .attr(
          "aria-label",
          `${n.name}, Z=${n.Z}, N=${n.N}, ${n.decayModes.join("/")} decay, half-life: ${n.halfLifeStr}`,
        )
        .style("cursor", "pointer")
        .on("click", () => {
          if (!hasDragged.current) {
            setSelected(n);
            setShowInspector(true);
          }
        })
        .on("keydown", (evt: KeyboardEvent) => {
          if (evt.key === "Enter" || evt.key === " ") {
            setSelected(n);
            setShowInspector(true);
          }
        });
    }
  }, [
    displayed,
    palette,
    colorMode,
    selected,
    comparison,
    maxN,
    maxZ,
    svgH,
    svgW,
    showMagicLines,
    showValleyOfStability,
  ]);

  // Panning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged.current = true;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2))),
    );
  }, []);

  // Comparison helpers
  const addToComparison = (n: Nuclide) => {
    if (
      comparison.length < 4 &&
      !comparison.some((c) => c.symbol === n.symbol)
    ) {
      setComparison([...comparison, n]);
    }
  };
  const removeFromComparison = (sym: string) => {
    setComparison(comparison.filter((c) => c.symbol !== sym));
  };

  const zoomPct = Math.round(zoom * 100);

  const COLOR_MODE_OPTS: { value: ColorMode; label: string }[] = [
    { value: "decay", label: "Decay Mode" },
    { value: "halflife", label: "Half-life" },
    { value: "binding", label: "Binding Energy" },
    { value: "freshness", label: "Data Freshness" },
  ];

  return (
    <div
      className="flex flex-col h-screen bg-background overflow-hidden"
      data-ocid="nuclide-chart.page"
    >
      {/* ── Top Control Bar ── */}
      <div className="flex-none border-b border-border bg-card px-3 py-2 flex flex-wrap items-center gap-2 z-10">
        <div className="flex flex-col min-w-0 mr-2">
          <h1 className="font-display text-sm font-bold text-foreground leading-tight">
            Chart of Nuclides
          </h1>
          <p className="text-[10px] text-muted-foreground leading-tight">
            {displayed.length}/{nuclides.length} nuclides · ENSDF/NNDC
          </p>
        </div>

        <Separator orientation="vertical" className="h-8 hidden sm:block" />

        {/* Color Mode */}
        <fieldset
          className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/30 p-0.5 border-0 m-0"
          aria-label="Color mode"
        >
          <legend className="sr-only">Color mode</legend>
          {COLOR_MODE_OPTS.map((opt) => (
            <Button
              key={opt.value}
              size="sm"
              variant={colorMode === opt.value ? "default" : "ghost"}
              className="h-6 px-2 text-xs"
              onClick={() => setColorMode(opt.value)}
              aria-pressed={colorMode === opt.value}
              data-ocid={`nuclide-chart.colormode_${opt.value}`}
            >
              {opt.label}
            </Button>
          ))}
        </fieldset>

        <Separator orientation="vertical" className="h-8 hidden sm:block" />

        {/* Quick filter pills */}
        <fieldset
          className="flex flex-wrap gap-1 border-0 m-0 p-0"
          aria-label="Quick filter"
        >
          <legend className="sr-only">Quick filter by decay mode</legend>
          {FILTER_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              size="sm"
              variant={filter === opt.value ? "default" : "outline"}
              className="h-6 px-2 text-xs"
              onClick={() => setFilter(opt.value)}
              aria-pressed={filter === opt.value}
              data-ocid={`nuclide-chart.filter_${opt.value}`}
            >
              {opt.label}
            </Button>
          ))}
        </fieldset>
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            variant={showMagicLines ? "default" : "outline"}
            className="h-6 px-2 text-xs gap-1"
            onClick={() => setShowMagicLines((v) => !v)}
            aria-pressed={showMagicLines}
            data-ocid="nuclide-chart.magic_lines_toggle"
          >
            Magic N/Z
          </Button>
          <Button
            size="sm"
            variant={showValleyOfStability ? "default" : "outline"}
            className="h-6 px-2 text-xs gap-1"
            onClick={() => setShowValleyOfStability((v) => !v)}
            aria-pressed={showValleyOfStability}
            data-ocid="nuclide-chart.valley_toggle"
          >
            Valley
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 px-2 text-xs"
            onClick={() =>
              setPalette((p) => (p === "default" ? "deuteranopia" : "default"))
            }
            data-ocid="nuclide-chart.palette_toggle"
          >
            {palette === "default" ? "Colorblind-Safe" : "Default Palette"}
          </Button>
          <Button
            size="sm"
            variant={showFilters ? "default" : "outline"}
            className="h-6 px-2 text-xs"
            onClick={() => setShowFilters((v) => !v)}
            data-ocid="nuclide-chart.filters_toggle"
          >
            ⚙ Filters
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8 hidden sm:block" />

        {/* Zoom controls */}
        <div
          className="flex items-center gap-1 rounded-full border border-border bg-muted/30 px-2 py-0.5"
          role="toolbar"
          aria-label="Zoom"
        >
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 rounded-full p-0"
            onClick={() =>
              setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
            }
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            data-ocid="nuclide-chart.zoom_out_button"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span
            className="font-mono text-xs text-foreground min-w-[2.8rem] text-center"
            aria-live="polite"
          >
            {zoomPct}%
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 rounded-full p-0"
            onClick={() =>
              setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
            }
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            data-ocid="nuclide-chart.zoom_in_button"
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-1.5 rounded-full text-xs gap-0.5"
            onClick={() => {
              setZoom(fitZoom);
              setPan({ x: 0, y: 0 });
            }}
            aria-label="Reset zoom"
            data-ocid="nuclide-chart.zoom_reset_button"
          >
            <RotateCcw className="h-3 w-3" />
            Fit
          </Button>
        </div>
      </div>

      {/* ── Advanced Filters Panel ── */}
      {showFilters && (
        <div className="flex-none border-b border-border bg-muted/30 px-4 py-3 flex flex-wrap gap-6 items-start z-10">
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">
              Decay modes
            </p>
            <div className="flex flex-wrap gap-3">
              {DECAY_FILTER_OPTS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`decay-filter-${opt.value}`}
                  className="flex items-center gap-1.5 cursor-pointer text-xs text-muted-foreground"
                >
                  <Checkbox
                    id={`decay-filter-${opt.value}`}
                    checked={decayFilters.has(opt.value)}
                    onCheckedChange={(checked) => {
                      setDecayFilters((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(opt.value);
                        else next.delete(opt.value);
                        return next;
                      });
                    }}
                    data-ocid={`nuclide-chart.decay_filter_${opt.value}`}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">
              Z range: {zRange[0]}–{zRange[1]}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                value={zRange[0]}
                onChange={(e) => setZRange([+e.target.value, zRange[1]])}
                className="w-20 accent-primary"
                aria-label="Min Z"
                data-ocid="nuclide-chart.z_range_min"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={zRange[1]}
                onChange={(e) => setZRange([zRange[0], +e.target.value])}
                className="w-20 accent-primary"
                aria-label="Max Z"
                data-ocid="nuclide-chart.z_range_max"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">
              A range: {aRange[0]}–{aRange[1]}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={250}
                value={aRange[0]}
                onChange={(e) => setARange([+e.target.value, aRange[1]])}
                className="w-20 accent-primary"
                aria-label="Min A"
                data-ocid="nuclide-chart.a_range_min"
              />
              <input
                type="range"
                min={0}
                max={250}
                value={aRange[1]}
                onChange={(e) => setARange([aRange[0], +e.target.value])}
                className="w-20 accent-primary"
                aria-label="Max A"
                data-ocid="nuclide-chart.a_range_max"
              />
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs self-end"
            onClick={() => {
              setDecayFilters(
                new Set([
                  "alpha",
                  "beta-",
                  "beta+",
                  "stable",
                  "gamma",
                  "other",
                ]),
              );
              setZRange([0, 100]);
              setARange([0, 250]);
              setFilter("all");
            }}
            data-ocid="nuclide-chart.reset_filters_button"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* ── Main Area ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Chart canvas */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing bg-[#0a0a12]"
          data-ocid="nuclide-chart.svg_container"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          aria-label="Chart of Nuclides — drag to pan, scroll to zoom"
        >
          {/* Axis labels */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground pointer-events-none z-10 font-mono">
            Neutron Number (N) →
          </div>
          <div
            className="absolute left-2 top-1/2 text-[10px] text-muted-foreground pointer-events-none z-10 font-mono"
            style={{
              transform: "translateY(-50%) rotate(-90deg)",
              whiteSpace: "nowrap",
            }}
          >
            ← Proton Number (Z)
          </div>

          <div
            style={{
              position: "absolute",
              transform: `translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: "0 0",
              willChange: "transform",
            }}
          >
            <svg
              ref={svgRef}
              width={svgW}
              height={svgH}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "0 0",
                display: "block",
              }}
              role="img"
              aria-label={`Chart of Nuclides: ${displayed.length} nuclides shown.`}
            >
              <title>Chart of Nuclides — Z vs N heatmap</title>
            </svg>
          </div>

          {/* HUD: hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/60 pointer-events-none flex items-center gap-1.5 z-10">
            <ZoomIn className="h-3 w-3" />
            Drag to pan · Scroll to zoom · <kbd className="font-mono">+/-</kbd>{" "}
            keys · Click cell for details
          </div>

          {/* Legend overlay */}
          <div className="absolute bottom-8 right-4 z-20 bg-card/90 border border-border rounded-lg px-3 py-2 text-xs backdrop-blur-sm">
            {colorMode === "decay" && (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Decay Mode
                </p>
                {Object.entries(COLOR_MAPS[palette]).map(([mode, color]) => (
                  <div key={mode} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-sm flex-none"
                      style={{ background: color }}
                    />
                    <span className="text-muted-foreground">{mode}</span>
                  </div>
                ))}
              </div>
            )}
            {colorMode === "freshness" && (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Data Freshness
                </p>
                {FRESHNESS_LEGEND.map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-sm flex-none"
                      style={{ background: color }}
                    />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            )}
            {colorMode === "halflife" && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Half-life (log scale)
                </p>
                <HalfLifeLegend />
              </div>
            )}
            {colorMode === "binding" && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Binding Energy / Nucleon
                </p>
                <BindingLegend />
              </div>
            )}
            {showMagicLines && (
              <div className="mt-2 flex flex-col gap-0.5 border-t border-border pt-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-0.5 w-5 bg-[#818cf8] opacity-60"
                    style={{ borderTop: "1px dashed #818cf8" }}
                  />
                  <span className="text-muted-foreground">Magic N</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-0.5 w-5 bg-[#f472b6] opacity-60"
                    style={{ borderTop: "1px dashed #f472b6" }}
                  />
                  <span className="text-muted-foreground">Magic Z</span>
                </div>
              </div>
            )}
            {showValleyOfStability && (
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className="inline-block h-0.5 w-5"
                  style={{ borderTop: "2px dashed #34d399" }}
                />
                <span className="text-muted-foreground">
                  Valley of Stability
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Inspector Panel ── */}
        {showInspector && (
          <div
            className="flex-none w-80 border-l border-border bg-card flex flex-col overflow-hidden"
            data-ocid="nuclide-chart.inspector_panel"
          >
            {/* Inspector header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/20">
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={inspectorTab === "details" ? "default" : "ghost"}
                  className="h-6 px-2 text-xs"
                  onClick={() => setInspectorTab("details")}
                  data-ocid="nuclide-chart.inspector_details_tab"
                >
                  Details
                </Button>
                <Button
                  size="sm"
                  variant={inspectorTab === "compare" ? "default" : "ghost"}
                  className="h-6 px-2 text-xs gap-1"
                  onClick={() => setInspectorTab("compare")}
                  data-ocid="nuclide-chart.inspector_compare_tab"
                >
                  Compare
                  {comparison.length > 0 && (
                    <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[9px]">
                      {comparison.length}
                    </Badge>
                  )}
                </Button>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setShowInspector(false)}
                aria-label="Close inspector"
                data-ocid="nuclide-chart.inspector_close_button"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {inspectorTab === "details" && (
              <div className="flex-1 overflow-y-auto">
                {selected ? (
                  <div className="p-3 flex flex-col gap-3">
                    {/* Nuclide header */}
                    <div className="flex items-center gap-2">
                      <span
                        className="h-5 w-5 rounded flex-none"
                        style={{
                          background: getColor(selected, palette, colorMode),
                        }}
                      />
                      <div>
                        <p className="font-display font-bold text-sm text-foreground">
                          {selected.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {selected.symbol} · A={selected.A}
                        </p>
                      </div>
                    </div>

                    {/* Decay badge */}
                    <div className="flex flex-wrap gap-1">
                      {selected.decayModes.map((dm) => (
                        <Badge
                          key={dm}
                          className="text-[10px] px-1.5 py-0"
                          style={{
                            background:
                              COLOR_MAPS[palette][dm] ??
                              COLOR_MAPS[palette].other,
                            color: "#000",
                          }}
                        >
                          {dm}
                        </Badge>
                      ))}
                    </div>

                    {/* Properties */}
                    <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {(
                        [
                          ["Proton (Z)", selected.Z],
                          ["Neutron (N)", selected.N],
                          ["Mass number (A)", selected.A],
                          ["Half-life", selected.halfLifeStr],
                          [
                            "Q-value",
                            selected.Qvalue_MeV != null
                              ? `${selected.Qvalue_MeV} MeV`
                              : "—",
                          ],
                          [
                            "Binding E/A",
                            selected.bindingEnergyPerNucleon_MeV != null
                              ? `${selected.bindingEnergyPerNucleon_MeV} MeV`
                              : "—",
                          ],
                          [
                            "Mass excess",
                            selected.massExcess_keV != null
                              ? `${selected.massExcess_keV} keV`
                              : "—",
                          ],
                          [
                            "Abundance",
                            selected.abundance != null
                              ? `${selected.abundance}%`
                              : "—",
                          ],
                          [
                            "Atomic mass",
                            selected.atomicMass_AMU != null
                              ? `${selected.atomicMass_AMU} u`
                              : "—",
                          ],
                        ] as [string, string | number][]
                      ).map(([label, value]) => (
                        <div key={label} className="flex flex-col gap-0.5">
                          <dt className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {label}
                          </dt>
                          <dd className="font-mono text-xs font-semibold text-foreground break-all">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Branching ratios */}
                    {selected.branchingRatios &&
                      selected.branchingRatios.length > 0 && (
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                            Branching Ratios
                          </p>
                          <div className="flex flex-col gap-1">
                            {selected.branchingRatios.map((br) => (
                              <div key={br} className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${br}%` }}
                                  />
                                </div>
                                <span className="font-mono text-xs text-muted-foreground w-10 text-right">
                                  {br}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* IAEA freshness */}
                    {selected.lastUpdated && (
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span
                          className="h-1.5 w-1.5 rounded-full flex-none"
                          style={{ background: getFreshnessColor(selected) }}
                        />
                        IAEA last updated:{" "}
                        {new Date(selected.lastUpdated).toLocaleDateString()}
                      </div>
                    )}

                    {/* NNDC link */}
                    {selected.sourceUri && (
                      <a
                        href={selected.sourceUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                        data-ocid="nuclide-chart.nndc_link"
                      >
                        <BookOpen className="h-3 w-3" />
                        View on NNDC/NuDat3
                        <ChevronRight className="h-3 w-3" />
                      </a>
                    )}

                    {/* Add to compare */}
                    <Button
                      size="sm"
                      variant={
                        comparison.some((c) => c.symbol === selected.symbol)
                          ? "default"
                          : "outline"
                      }
                      className="h-7 text-xs w-full"
                      disabled={
                        comparison.length >= 4 &&
                        !comparison.some((c) => c.symbol === selected.symbol)
                      }
                      onClick={() => {
                        if (
                          comparison.some((c) => c.symbol === selected.symbol)
                        ) {
                          removeFromComparison(selected.symbol);
                        } else {
                          addToComparison(selected);
                          setInspectorTab("compare");
                        }
                      }}
                      data-ocid="nuclide-chart.add_compare_button"
                    >
                      {comparison.some((c) => c.symbol === selected.symbol)
                        ? "✓ In Comparison"
                        : comparison.length >= 4
                          ? "Max 4 nuclides"
                          : "Add to Compare"}
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center h-full py-12 gap-2 text-muted-foreground"
                    data-ocid="nuclide-chart.inspector_empty_state"
                  >
                    <ZoomIn className="h-8 w-8 opacity-30" />
                    <p className="text-sm">Click any nuclide to inspect</p>
                  </div>
                )}
              </div>
            )}

            {inspectorTab === "compare" && (
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                {comparison.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground"
                    data-ocid="nuclide-chart.compare_empty_state"
                  >
                    <p className="text-sm text-center">
                      Select nuclides and click "Add to Compare" in the Details
                      tab
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Chips */}
                    <div className="flex flex-wrap gap-1">
                      {comparison.map((n) => (
                        <span
                          key={n.symbol}
                          className="flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs"
                        >
                          <span
                            className="h-2 w-2 rounded-sm flex-none"
                            style={{
                              background: getColor(n, palette, colorMode),
                            }}
                          />
                          {n.symbol}
                          <button
                            type="button"
                            onClick={() => removeFromComparison(n.symbol)}
                            className="opacity-60 hover:opacity-100 ml-0.5"
                            aria-label={`Remove ${n.symbol}`}
                            data-ocid={`nuclide-chart.remove_compare_${n.symbol}`}
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Sub-tabs */}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={compareTab === "table" ? "default" : "ghost"}
                        className="h-6 px-2 text-xs"
                        onClick={() => setCompareTab("table")}
                        data-ocid="nuclide-chart.compare_table_tab"
                      >
                        Table
                      </Button>
                      <Button
                        size="sm"
                        variant={compareTab === "radar" ? "default" : "ghost"}
                        className="h-6 px-2 text-xs"
                        onClick={() => setCompareTab("radar")}
                        data-ocid="nuclide-chart.compare_radar_tab"
                      >
                        Radar
                      </Button>
                    </div>

                    {compareTab === "table" && (
                      <div className="overflow-x-auto -mx-1">
                        <table className="text-xs w-full min-w-max">
                          <thead>
                            <tr className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              <th className="text-left pr-2 pb-1.5 font-medium">
                                Property
                              </th>
                              {comparison.map((n) => (
                                <th
                                  key={n.symbol}
                                  className="text-right pb-1.5 px-1 font-medium"
                                >
                                  {n.symbol}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(
                              [
                                { label: "Z", get: (n: Nuclide) => n.Z },
                                { label: "N", get: (n: Nuclide) => n.N },
                                { label: "A", get: (n: Nuclide) => n.A },
                                {
                                  label: "Half-life",
                                  get: (n: Nuclide) => n.halfLifeStr,
                                },
                                {
                                  label: "Decay",
                                  get: (n: Nuclide) => n.decayModes.join("/"),
                                },
                                {
                                  label: "Q (MeV)",
                                  get: (n: Nuclide) =>
                                    n.Qvalue_MeV != null ? n.Qvalue_MeV : "—",
                                },
                                {
                                  label: "B/A (MeV)",
                                  get: (n: Nuclide) =>
                                    n.bindingEnergyPerNucleon_MeV != null
                                      ? n.bindingEnergyPerNucleon_MeV
                                      : "—",
                                },
                                {
                                  label: "Δm (keV)",
                                  get: (n: Nuclide) =>
                                    n.massExcess_keV != null
                                      ? n.massExcess_keV
                                      : "—",
                                },
                                {
                                  label: "Abundance",
                                  get: (n: Nuclide) =>
                                    n.abundance != null
                                      ? `${n.abundance}%`
                                      : "—",
                                },
                              ] as {
                                label: string;
                                get: (n: Nuclide) => string | number;
                              }[]
                            ).map(({ label, get }) => {
                              const vals = comparison.map(get);
                              const numericVals = vals
                                .filter((v) => typeof v === "number")
                                .map(Number);
                              const maxVal =
                                numericVals.length > 0
                                  ? Math.max(...numericVals)
                                  : null;
                              const minVal =
                                numericVals.length > 0
                                  ? Math.min(...numericVals)
                                  : null;
                              return (
                                <tr
                                  key={label}
                                  className="border-t border-border/50"
                                >
                                  <td className="pr-2 py-1 text-muted-foreground font-medium">
                                    {label}
                                  </td>
                                  {comparison.map((n, _ni) => {
                                    const v = get(n);
                                    const isMax =
                                      typeof v === "number" &&
                                      v === maxVal &&
                                      maxVal !== minVal;
                                    const isMin =
                                      typeof v === "number" &&
                                      v === minVal &&
                                      maxVal !== minVal;
                                    return (
                                      <td
                                        key={n.symbol}
                                        className={`text-right px-1 py-1 font-mono ${
                                          isMax
                                            ? "text-green-400 font-bold"
                                            : isMin
                                              ? "text-red-400"
                                              : "text-foreground"
                                        }`}
                                      >
                                        {String(v)}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {compareTab === "radar" && (
                      <div className="flex flex-col items-center gap-2">
                        <RadarChart nuclides={comparison} palette={palette} />
                        <p className="text-[10px] text-muted-foreground text-center">
                          Normalized radar chart — green=high, relative to all
                          comparison items
                        </p>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs w-full mt-auto"
                      onClick={() => setComparison([])}
                      data-ocid="nuclide-chart.clear_compare_button"
                    >
                      Clear All
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Open inspector toggle button when closed */}
          </div>
        )}

        {/* Inspector toggle button when closed */}
        {!showInspector && (
          <button
            type="button"
            className="flex-none w-8 border-l border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            onClick={() => setShowInspector(true)}
            aria-label="Open inspector panel"
            data-ocid="nuclide-chart.inspector_open_button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
