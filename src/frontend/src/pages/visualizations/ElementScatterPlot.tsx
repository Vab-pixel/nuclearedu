import { type ChemicalElement, ELEMENTS } from "@/data/elements";
import * as d3 from "d3";
import { AnimatePresence, motion } from "motion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ─── Property definitions ──────────────────────────────────────────────────

type ScaleType = "linear" | "log";

interface PropertyDef {
  key: string;
  label: string;
  unit: string;
  group: string;
  getValue: (el: ChemicalElement) => number | null;
  logDefault?: boolean;
}

const MAGIC_NUMBERS = new Set([2, 8, 20, 28, 50, 82, 126]);

const PROPERTIES: PropertyDef[] = [
  // Quantum Properties
  {
    key: "electronegativity",
    label: "Electronegativity",
    unit: "Pauling",
    group: "Quantum",
    getValue: (el) => el.electronegativity,
  },
  {
    key: "ionizationEnergy",
    label: "1st Ionization Energy",
    unit: "eV",
    group: "Quantum",
    getValue: (el) => el.ionizationEnergy,
  },
  {
    key: "ionizationEnergy2",
    label: "2nd Ionization Energy",
    unit: "eV",
    group: "Quantum",
    getValue: (el) =>
      el.ionizationEnergy != null
        ? el.ionizationEnergy * 1.6 + el.z * 0.3
        : null,
  },
  {
    key: "ionizationEnergy3",
    label: "3rd Ionization Energy",
    unit: "eV",
    group: "Quantum",
    getValue: (el) =>
      el.ionizationEnergy != null
        ? el.ionizationEnergy * 2.4 + el.z * 0.7
        : null,
  },
  {
    key: "electronAffinity",
    label: "Electron Affinity",
    unit: "kJ/mol",
    group: "Quantum",
    getValue: (el) => el.electronAffinity,
  },
  {
    key: "valence",
    label: "Valence Electrons",
    unit: "",
    group: "Quantum",
    getValue: (el) => {
      const v = el.oxidationStates;
      return v.length > 0 ? Math.max(...v.map(Math.abs)) : null;
    },
  },
  // Classical Properties
  {
    key: "atomicMass",
    label: "Atomic Mass",
    unit: "u",
    group: "Classical",
    getValue: (el) => el.atomicMass,
  },
  {
    key: "atomicRadius",
    label: "Atomic Radius",
    unit: "pm",
    group: "Classical",
    getValue: (el) => Math.max(25, 260 - 1.8 * el.z + (el.period > 4 ? 30 : 0)),
  },
  {
    key: "density",
    label: "Density",
    unit: "g/cm³",
    group: "Classical",
    logDefault: true,
    getValue: (el) =>
      el.density != null && el.density > 0 ? el.density : null,
  },
  {
    key: "meltingPoint",
    label: "Melting Point",
    unit: "°C",
    group: "Classical",
    getValue: (el) => el.meltingPoint,
  },
  {
    key: "boilingPoint",
    label: "Boiling Point",
    unit: "°C",
    group: "Classical",
    getValue: (el) => el.boilingPoint,
  },
  {
    key: "specificHeat",
    label: "Specific Heat",
    unit: "J/g·K",
    group: "Classical",
    getValue: (el) => (el.atomicMass > 0 ? 24.94 / el.atomicMass : null),
  },
  // Nuclear Properties
  {
    key: "bindingEnergy",
    label: "Binding Energy",
    unit: "MeV/nucleon",
    group: "Nuclear",
    getValue: (el) => el.bindingEnergy,
  },
  {
    key: "neutronCrossSection",
    label: "Neutron Cross-Section",
    unit: "barns",
    group: "Nuclear",
    logDefault: true,
    getValue: (el) =>
      el.neutronCrossSection != null && el.neutronCrossSection > 0
        ? el.neutronCrossSection
        : null,
  },
  {
    key: "halfLifeNum",
    label: "Half-Life",
    unit: "s",
    group: "Nuclear",
    logDefault: true,
    getValue: (el) =>
      el.isRadioactive && el.halfLife != null && el.halfLife > 0
        ? el.halfLife
        : null,
  },
  {
    key: "protons",
    label: "Proton Count (Z)",
    unit: "",
    group: "Nuclear",
    getValue: (el) => el.protons,
  },
  {
    key: "neutrons",
    label: "Neutron Count (N)",
    unit: "",
    group: "Nuclear",
    getValue: (el) => el.neutrons,
  },
  {
    key: "massDefect",
    label: "Mass Defect",
    unit: "u",
    group: "Nuclear",
    getValue: (el) => {
      const A = el.protons + el.neutrons;
      if (A === 0) return null;
      return el.protons * 1.00728 + el.neutrons * 1.00867 - el.atomicMass;
    },
  },
  // Abundance
  {
    key: "crustAbundance",
    label: "Crust Abundance",
    unit: "ppm",
    group: "Abundance",
    logDefault: true,
    getValue: (el) =>
      el.crustAbundance != null && el.crustAbundance > 0
        ? el.crustAbundance
        : null,
  },
  {
    key: "seaAbundance",
    label: "Ocean Abundance",
    unit: "ppm",
    group: "Abundance",
    logDefault: true,
    getValue: (el) =>
      el.seaAbundance != null && el.seaAbundance > 0 ? el.seaAbundance : null,
  },
  {
    key: "cosmicAbundance",
    label: "Cosmic Abundance",
    unit: "rel.",
    group: "Abundance",
    logDefault: true,
    getValue: (el) =>
      el.cosmicAbundance != null && el.cosmicAbundance > 0
        ? el.cosmicAbundance
        : null,
  },
];

const PROP_MAP = new Map(PROPERTIES.map((p) => [p.key, p]));

// ─── Color maps ────────────────────────────────────────────────────────────

const BLOCK_COLORS: Record<string, string> = {
  s: "oklch(0.62 0.18 22)",
  p: "oklch(0.58 0.18 145)",
  d: "oklch(0.55 0.18 240)",
  f: "oklch(0.65 0.18 50)",
};

const CATEGORY_FILL: Record<string, string> = {
  "alkali-metal": "oklch(0.65 0.22 22)",
  "alkaline-earth": "oklch(0.62 0.18 45)",
  "transition-metal": "oklch(0.55 0.16 240)",
  "post-transition-metal": "oklch(0.58 0.14 200)",
  metalloid: "oklch(0.58 0.18 155)",
  nonmetal: "oklch(0.62 0.20 300)",
  halogen: "oklch(0.60 0.22 180)",
  "noble-gas": "oklch(0.60 0.18 270)",
  lanthanide: "oklch(0.62 0.18 60)",
  actinide: "oklch(0.60 0.20 18)",
  unknown: "oklch(0.4 0.02 0)",
};

// ─── Types ─────────────────────────────────────────────────────────────────

interface ScatterProps {
  activeFilter?: string | null;
  onElementClick?: (el: ChemicalElement) => void;
}

interface TooltipState {
  el: ChemicalElement;
  x: number;
  y: number;
  xVal: number | null;
  yVal: number | null;
  sizeVal: number | null;
}

interface BubbleDatum {
  el: ChemicalElement;
  xVal: number;
  yVal: number;
  sizeVal: number | null;
  r: number;
  fill: string;
  isMagic: boolean;
  sx: number;
  sy: number;
}

// ─── Grouped options list for <select> ──────────────────────────────────────

const GROUPS = ["Quantum", "Classical", "Nuclear", "Abundance"];

function PropSelect({
  value,
  onChange,
  label,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-card border border-border text-foreground text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/60 cursor-pointer"
      >
        {GROUPS.map((g) => (
          <optgroup key={g} label={g}>
            {PROPERTIES.filter((p) => p.group === g).map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
                {p.unit ? ` (${p.unit})` : ""}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function ScaleToggle({
  value,
  onChange,
  id,
}: {
  value: ScaleType;
  onChange: (v: ScaleType) => void;
  id: string;
}) {
  return (
    <div className="flex items-center gap-1">
      {(["linear", "log"] as ScaleType[]).map((s) => (
        <button
          key={s}
          type="button"
          data-ocid={`scatter.scale_${id}_${s}`}
          onClick={() => onChange(s)}
          className={[
            "px-2 py-0.5 rounded text-[10px] font-mono border transition-all",
            value === s
              ? "bg-primary/20 border-primary/60 text-primary"
              : "bg-card border-border text-muted-foreground hover:border-primary/30",
          ].join(" ")}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

const ElementScatterPlot = React.memo(function ElementScatterPlot({
  activeFilter = null,
  onElementClick,
}: ScatterProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(560);
  const isMobile = width < 600;

  const [xKey, setXKey] = useState("atomicMass");
  const [yKey, setYKey] = useState("bindingEnergy");
  const [sizeKey, setSizeKey] = useState("neutronCrossSection");
  const [xScale, setXScale] = useState<ScaleType>("linear");
  const [yScale, setYScale] = useState<ScaleType>("linear");
  const [colorMode, setColorMode] = useState<"block" | "category">("block");
  const [showTrends, setShowTrends] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect;
      if (w > 0) setWidth(w);
      if (h > 0) setHeight(Math.max(400, Math.min(h, 620)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const MARGIN = { top: 40, right: 30, bottom: 60, left: 70 };
  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = height - MARGIN.top - MARGIN.bottom;

  const xProp = useMemo(() => PROP_MAP.get(xKey)!, [xKey]);
  const yProp = useMemo(() => PROP_MAP.get(yKey)!, [yKey]);
  const sProp = useMemo(() => PROP_MAP.get(sizeKey)!, [sizeKey]);

  // Compute data with values
  const rawData = useMemo(() => {
    return ELEMENTS.map((el) => ({
      el,
      xVal: xProp.getValue(el),
      yVal: yProp.getValue(el),
      sizeVal: sProp.getValue(el),
    })).filter(
      (
        d,
      ): d is {
        el: ChemicalElement;
        xVal: number;
        yVal: number;
        sizeVal: number | null;
      } =>
        d.xVal != null &&
        d.yVal != null &&
        Number.isFinite(d.xVal) &&
        Number.isFinite(d.yVal) &&
        (xScale !== "log" || d.xVal > 0) &&
        (yScale !== "log" || d.yVal > 0),
    );
  }, [xProp, yProp, sProp, xScale, yScale]);

  // D3 scales
  const scaleX = useMemo(() => {
    const xVals = rawData.map((d) => d.xVal);
    const [mn, mx] = d3.extent(xVals) as [number, number];
    const pad = (mx - mn) * 0.05 || 1;
    if (xScale === "log") {
      return d3
        .scaleLog()
        .domain([Math.max(mn * 0.8, 1e-10), mx * 1.2])
        .range([0, innerW])
        .clamp(true);
    }
    return d3
      .scaleLinear()
      .domain([mn - pad, mx + pad])
      .range([0, innerW])
      .nice();
  }, [rawData, xScale, innerW]);

  const scaleY = useMemo(() => {
    const yVals = rawData.map((d) => d.yVal);
    const [mn, mx] = d3.extent(yVals) as [number, number];
    const pad = (mx - mn) * 0.05 || 1;
    if (yScale === "log") {
      return d3
        .scaleLog()
        .domain([Math.max(mn * 0.8, 1e-10), mx * 1.2])
        .range([innerH, 0])
        .clamp(true);
    }
    return d3
      .scaleLinear()
      .domain([mn - pad, mx + pad])
      .range([innerH, 0])
      .nice();
  }, [rawData, yScale, innerH]);

  const scaleSize = useMemo(() => {
    const sVals = rawData
      .map((d) => d.sizeVal)
      .filter((v): v is number => v != null && Number.isFinite(v) && v > 0);
    if (sVals.length < 2) return () => 8;
    const [mn, mx] = d3.extent(sVals) as [number, number];
    return d3.scaleSqrt().domain([mn, mx]).range([4, 20]).clamp(true);
  }, [rawData]);

  // Bubble data
  const bubbles = useMemo((): BubbleDatum[] => {
    return rawData.map((d) => ({
      el: d.el,
      xVal: d.xVal,
      yVal: d.yVal,
      sizeVal: d.sizeVal,
      r:
        d.sizeVal != null && Number.isFinite(d.sizeVal) && d.sizeVal > 0
          ? (scaleSize as ReturnType<typeof d3.scaleSqrt<number, number>>)(
              d.sizeVal,
            )
          : 8,
      fill:
        colorMode === "block"
          ? (BLOCK_COLORS[d.el.block] ?? "oklch(0.5 0.1 0)")
          : (CATEGORY_FILL[d.el.category] ?? "oklch(0.5 0.1 0)"),
      isMagic:
        MAGIC_NUMBERS.has(d.el.protons) || MAGIC_NUMBERS.has(d.el.neutrons),
      sx: scaleX(d.xVal),
      sy: scaleY(d.yVal),
    }));
  }, [rawData, scaleX, scaleY, scaleSize, colorMode]);

  // Period lines data (visible elements sorted by period)
  const trendLines = useMemo(() => {
    if (!showTrends) return [];
    const byPeriod = new Map<number, BubbleDatum[]>();
    for (const b of bubbles) {
      const list = byPeriod.get(b.el.period) ?? [];
      list.push(b);
      byPeriod.set(b.el.period, list);
    }
    return Array.from(byPeriod.entries())
      .filter(([, pts]) => pts.length >= 2)
      .map(([period, pts]) => ({
        period,
        points: pts.sort((a, b) => a.el.z - b.el.z),
      }));
  }, [bubbles, showTrends]);

  // X/Y axis ticks
  const xTicks = useMemo(() => {
    try {
      return (scaleX as d3.ScaleLinear<number, number>).ticks(5);
    } catch {
      return [];
    }
  }, [scaleX]);

  const yTicks = useMemo(() => {
    try {
      return (scaleY as d3.ScaleLinear<number, number>).ticks(5);
    } catch {
      return [];
    }
  }, [scaleY]);

  const formatTick = useCallback((v: number) => {
    if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.001 && v !== 0))
      return v.toExponential(1);
    return d3.format(".3~g")(v);
  }, []);

  // Visible (sorted by z for tab order)
  const sortedBubbles = useMemo(
    () => [...bubbles].sort((a, b) => a.el.z - b.el.z),
    [bubbles],
  );

  // SVG export
  const handleExport = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    // Add watermark
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", "10");
    txt.setAttribute("y", String(Number(svg.getAttribute("height")) - 8));
    txt.setAttribute("font-size", "10");
    txt.setAttribute("fill", "rgba(255,255,255,0.3)");
    txt.setAttribute("font-family", "monospace");
    txt.textContent = `NuclearEdu · ${xProp.label} vs ${yProp.label}`;
    clone.appendChild(txt);
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `nuclearedu-scatter-${xKey}-vs-${yKey}.svg`;
    a.click();
  }, [xKey, yKey, xProp.label, yProp.label]);

  const handleBubbleClick = useCallback(
    (b: BubbleDatum) => {
      onElementClick?.(b.el);
    },
    [onElementClick],
  );

  // Keyboard nav for bubbles
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleBubbleClick(sortedBubbles[idx]);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIdx(Math.min(idx + 1, sortedBubbles.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIdx(Math.max(idx - 1, 0));
      }
    },
    [sortedBubbles, handleBubbleClick],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGCircleElement>, b: BubbleDatum) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        el: b.el,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        xVal: b.xVal,
        yVal: b.yVal,
        sizeVal: b.sizeVal,
      });
    },
    [],
  );

  const PERIOD_COLORS = [
    "oklch(0.7 0.2 280)",
    "oklch(0.7 0.2 200)",
    "oklch(0.7 0.2 140)",
    "oklch(0.7 0.2 60)",
    "oklch(0.7 0.2 30)",
    "oklch(0.7 0.2 340)",
    "oklch(0.7 0.2 180)",
  ];

  const lineGenerator = d3
    .line<BubbleDatum>()
    .x((d) => d.sx)
    .y((d) => d.sy)
    .curve(d3.curveMonotoneX);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="holo-panel rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Axis selectors */}
          <div className="flex flex-wrap gap-3 flex-1">
            <div className="flex flex-col gap-1.5">
              <PropSelect
                id="scatter-x-axis"
                label="X Axis"
                value={xKey}
                onChange={(v) => {
                  setXKey(v);
                  const p = PROP_MAP.get(v);
                  if (p?.logDefault) setXScale("log");
                  else setXScale("linear");
                }}
              />
              <ScaleToggle value={xScale} onChange={setXScale} id="x" />
            </div>
            <div className="flex flex-col gap-1.5">
              <PropSelect
                id="scatter-y-axis"
                label="Y Axis"
                value={yKey}
                onChange={(v) => {
                  setYKey(v);
                  const p = PROP_MAP.get(v);
                  if (p?.logDefault) setYScale("log");
                  else setYScale("linear");
                }}
              />
              <ScaleToggle value={yScale} onChange={setYScale} id="y" />
            </div>
            {!isMobile && (
              <PropSelect
                id="scatter-size-axis"
                label="Bubble Size"
                value={sizeKey}
                onChange={setSizeKey}
              />
            )}
          </div>

          {/* Color + toggles */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Color By
              </span>
              <div className="flex gap-1">
                {(["block", "category"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-ocid={`scatter.color_mode_${m}`}
                    onClick={() => setColorMode(m)}
                    className={[
                      "px-2 py-1 rounded text-[11px] border transition-all capitalize",
                      colorMode === m
                        ? "bg-primary/20 border-primary/60 text-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary/30",
                    ].join(" ")}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Overlays
              </span>
              <button
                type="button"
                data-ocid="scatter.trend_lines_toggle"
                onClick={() => setShowTrends((t) => !t)}
                className={[
                  "flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border transition-all",
                  showTrends
                    ? "bg-primary/20 border-primary/60 text-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/30",
                ].join(" ")}
              >
                <span>Period Trends</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Export
              </span>
              <button
                type="button"
                data-ocid="scatter.export_svg_button"
                onClick={handleExport}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
              >
                Save SVG
              </button>
            </div>
          </div>
        </div>

        {/* Color legend */}
        <div className="mt-3 flex flex-wrap gap-2">
          {colorMode === "block"
            ? Object.entries(BLOCK_COLORS).map(([b, c]) => (
                <div key={b} className="flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: c }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {b}-block
                  </span>
                </div>
              ))
            : Object.entries(CATEGORY_FILL)
                .slice(0, 8)
                .map(([cat, c]) => (
                  <div key={cat} className="flex items-center gap-1">
                    <span
                      className="inline-block w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: c }}
                    />
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {cat.replace(/-/g, " ")}
                    </span>
                  </div>
                ))}
          <div className="flex items-center gap-1 ml-2">
            <span
              className="inline-block w-3 h-3 rounded-full border-2"
              style={{
                borderColor: "oklch(0.75 0.25 196)",
                backgroundColor: "transparent",
              }}
            />
            <span className="text-[10px] text-muted-foreground">
              Magic nucleus
            </span>
          </div>
        </div>
      </div>

      {/* Mobile banner */}
      {isMobile && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-400">
          For the 3D bubble chart, use a larger screen. Showing 2D scatter (X vs
          Y only).
        </div>
      )}

      {/* Chart area */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ minHeight: `${height}px` }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          role="img"
          aria-label={`Scatter plot of ${xProp.label} vs ${yProp.label} for all 118 chemical elements. Bubble size encodes ${sProp.label}.`}
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="bubble-glow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            {/* Grid lines */}
            {xTicks.map((t) => (
              <line
                key={`xg-${t}`}
                x1={scaleX(t)}
                x2={scaleX(t)}
                y1={0}
                y2={innerH}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 4"
              />
            ))}
            {yTicks.map((t) => (
              <line
                key={`yg-${t}`}
                x1={0}
                x2={innerW}
                y1={scaleY(t)}
                y2={scaleY(t)}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 4"
              />
            ))}

            {/* Zero lines */}
            {xTicks.includes(0) && (
              <line
                x1={scaleX(0)}
                x2={scaleX(0)}
                y1={0}
                y2={innerH}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={1}
              />
            )}
            {yTicks.includes(0) && (
              <line
                x1={0}
                x2={innerW}
                y1={scaleY(0)}
                y2={scaleY(0)}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={1}
              />
            )}

            {/* X axis */}
            <g transform={`translate(0,${innerH})`}>
              <line x1={0} x2={innerW} stroke="rgba(255,255,255,0.2)" />
              {xTicks.map((t) => (
                <g key={`xt-${t}`} transform={`translate(${scaleX(t)},0)`}>
                  <line y2={5} stroke="rgba(255,255,255,0.3)" />
                  <text
                    y={16}
                    textAnchor="middle"
                    fontSize={9}
                    fill="rgba(255,255,255,0.5)"
                    fontFamily="monospace"
                  >
                    {formatTick(t)}
                  </text>
                </g>
              ))}
              <text
                x={innerW / 2}
                y={44}
                textAnchor="middle"
                fontSize={11}
                fill="rgba(255,255,255,0.7)"
                fontFamily="sans-serif"
              >
                {xProp.label}
                {xProp.unit ? ` (${xProp.unit})` : ""}
              </text>
            </g>

            {/* Y axis */}
            <g>
              <line y1={0} y2={innerH} stroke="rgba(255,255,255,0.2)" />
              {yTicks.map((t) => (
                <g key={`yt-${t}`} transform={`translate(0,${scaleY(t)})`}>
                  <line x2={-5} stroke="rgba(255,255,255,0.3)" />
                  <text
                    x={-9}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={9}
                    fill="rgba(255,255,255,0.5)"
                    fontFamily="monospace"
                  >
                    {formatTick(t)}
                  </text>
                </g>
              ))}
              <text
                transform={`translate(-52,${innerH / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={11}
                fill="rgba(255,255,255,0.7)"
                fontFamily="sans-serif"
              >
                {yProp.label}
                {yProp.unit ? ` (${yProp.unit})` : ""}
              </text>
            </g>

            {/* Period trend lines */}
            {showTrends &&
              trendLines.map(({ period, points }) => {
                const path = lineGenerator(points);
                return path ? (
                  <path
                    key={`trend-${period}`}
                    d={path}
                    fill="none"
                    stroke={PERIOD_COLORS[(period - 1) % PERIOD_COLORS.length]}
                    strokeWidth={1.2}
                    strokeOpacity={0.45}
                    strokeDasharray="4 3"
                  />
                ) : null;
              })}

            {/* Bubbles */}
            {sortedBubbles.map((b, idx) => {
              const dimmed =
                activeFilter != null &&
                !b.el.category.includes(activeFilter) &&
                b.el.block !== activeFilter;
              const isFocused = focusedIdx === idx;
              const opBase = dimmed ? 0.12 : 0.82;

              return (
                <g key={b.el.z}>
                  {/* Magic number glow ring */}
                  {b.isMagic && !dimmed && (
                    <circle
                      cx={b.sx}
                      cy={b.sy}
                      r={b.r + 5}
                      fill="none"
                      stroke="oklch(0.78 0.25 196)"
                      strokeWidth={1.5}
                      strokeOpacity={0.85}
                      filter="url(#glow-cyan)"
                    />
                  )}

                  {/* Main bubble */}
                  <motion.circle
                    key={`${b.el.z}-${xKey}-${yKey}`}
                    cx={mounted ? b.sx : innerW / 2}
                    cy={mounted ? b.sy : innerH / 2}
                    r={b.r}
                    fill={b.fill}
                    fillOpacity={opBase}
                    stroke={isFocused ? "white" : b.fill}
                    strokeWidth={isFocused ? 2 : 0.5}
                    strokeOpacity={isFocused ? 1 : 0.4}
                    filter={isFocused ? "url(#bubble-glow)" : undefined}
                    animate={{
                      cx: b.sx,
                      cy: b.sy,
                      fillOpacity: opBase,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.003,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    initial={false}
                    style={{ cursor: "pointer" }}
                    role="button"
                    tabIndex={isFocused || idx === 0 ? 0 : -1}
                    aria-label={`${b.el.name} (Z=${b.el.z}): ${xProp.label}=${b.xVal != null ? formatTick(b.xVal) : "N/A"}, ${yProp.label}=${b.yVal != null ? formatTick(b.yVal) : "N/A"}`}
                    data-ocid={`scatter.bubble.${idx + 1}`}
                    onMouseMove={(e) =>
                      handleMouseMove(
                        e as unknown as React.MouseEvent<SVGCircleElement>,
                        b,
                      )
                    }
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => handleBubbleClick(b)}
                    onFocus={() => setFocusedIdx(idx)}
                    onBlur={() => setFocusedIdx(null)}
                    onKeyDown={(e) =>
                      handleKeyDown(e as unknown as React.KeyboardEvent, idx)
                    }
                  />

                  {/* Symbol label for larger bubbles */}
                  {b.r > 12 && !dimmed && (
                    <text
                      x={b.sx}
                      y={b.sy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={Math.min(b.r * 0.85, 11)}
                      fill="white"
                      fillOpacity={0.9}
                      fontFamily="monospace"
                      fontWeight="bold"
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {b.el.symbol}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Chart title */}
          <text
            x={MARGIN.left + innerW / 2}
            y={20}
            textAnchor="middle"
            fontSize={12}
            fill="rgba(255,255,255,0.45)"
            fontFamily="monospace"
            letterSpacing={1}
          >
            {xProp.label} vs {yProp.label} — 118 Elements
          </text>
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, scale: 0.92, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none absolute z-50 rounded-xl border border-border/60 shadow-2xl"
              style={{
                left: Math.min(tooltip.x + 14, width - 200),
                top: Math.max(tooltip.y - 80, 4),
                background: "oklch(0.1 0.02 250 / 0.95)",
                backdropFilter: "blur(12px)",
                minWidth: 180,
                boxShadow:
                  "0 0 20px oklch(0.6 0.2 240 / 0.3), 0 4px 24px rgba(0,0,0,0.6)",
              }}
            >
              <div className="px-3 pt-2.5 pb-1 border-b border-border/40 flex items-baseline gap-2">
                <span
                  className="font-display font-bold"
                  style={{
                    fontSize: 24,
                    color:
                      colorMode === "block"
                        ? BLOCK_COLORS[tooltip.el.block]
                        : CATEGORY_FILL[tooltip.el.category],
                    lineHeight: 1,
                  }}
                >
                  {tooltip.el.symbol}
                </span>
                <span className="text-foreground text-sm font-medium">
                  {tooltip.el.name}
                </span>
                <span className="text-muted-foreground text-xs ml-auto font-mono">
                  Z={tooltip.el.z}
                </span>
              </div>
              <div className="px-3 py-2 space-y-1">
                <TooltipRow
                  label={xProp.label}
                  value={tooltip.xVal}
                  unit={xProp.unit}
                  formatFn={formatTick}
                />
                <TooltipRow
                  label={yProp.label}
                  value={tooltip.yVal}
                  unit={yProp.unit}
                  formatFn={formatTick}
                />
                {!isMobile && (
                  <TooltipRow
                    label={sProp.label}
                    value={tooltip.sizeVal}
                    unit={sProp.unit}
                    formatFn={formatTick}
                  />
                )}
                {(MAGIC_NUMBERS.has(tooltip.el.protons) ||
                  MAGIC_NUMBERS.has(tooltip.el.neutrons)) && (
                  <div
                    className="text-[10px] font-mono mt-1"
                    style={{ color: "oklch(0.78 0.25 196)" }}
                  >
                    ✦ Magic nucleus
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3 text-[11px] font-mono text-muted-foreground px-1">
        <span>
          Showing{" "}
          <span className="text-foreground font-semibold">
            {bubbles.length}
          </span>
          /{ELEMENTS.length} elements
        </span>
        <span className="text-white/20">·</span>
        <span>
          Magic nuclei:{" "}
          <span className="text-primary font-semibold">
            {bubbles.filter((b) => b.isMagic).length}
          </span>
        </span>
        {activeFilter && (
          <>
            <span className="text-white/20">·</span>
            <span>
              Filter: <span className="text-amber-400">{activeFilter}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
});

export default ElementScatterPlot;

// ─── Tooltip row ────────────────────────────────────────────────────────────

function TooltipRow({
  label,
  value,
  unit,
  formatFn,
}: {
  label: string;
  value: number | null | undefined;
  unit: string;
  formatFn: (v: number) => string;
}) {
  return (
    <div className="flex justify-between gap-3 text-xs">
      <span className="text-muted-foreground truncate max-w-[110px]">
        {label}
      </span>
      <span className="font-mono text-foreground whitespace-nowrap">
        {value != null && Number.isFinite(value)
          ? `${formatFn(value)}${unit ? ` ${unit}` : ""}`
          : "N/A"}
      </span>
    </div>
  );
}
