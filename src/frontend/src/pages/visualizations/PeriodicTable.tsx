import { type ChemicalElement, ELEMENTS } from "@/data/elements";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  ChevronDown,
  ChevronUp,
  Contrast,
  Download,
  Eye,
  Filter,
  GitCompare,
  Grid3X3,
  Keyboard,
  Search,
  Share2,
  Thermometer,
  TrendingUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ElementComparison from "./ElementComparison";
import ElementDetailPanel from "./ElementDetailPanel";
import ElementScatterPlot from "./ElementScatterPlot";

// ─── Types ───────────────────────────────────────────────────────────────────

type HeatmapMode =
  | "category"
  | "electronegativity"
  | "atomicRadius"
  | "ionizationEnergy"
  | "ionizationEnergy2"
  | "ionizationEnergy3"
  | "atomicMass"
  | "electronAffinity"
  | "density"
  | "meltingPoint"
  | "boilingPoint"
  | "halfLife"
  | "bindingEnergy"
  | "neutronCrossSection"
  | "alphaStability"
  | "betaStability"
  | "nuclearChargeDensity"
  | "block";

type Palette =
  | "viridis"
  | "plasma"
  | "cividis"
  | "inferno"
  | "magma"
  | "turbo"
  | "deuteranopia"
  | "protanopia";

interface HeatmapConfig {
  label: string;
  unit: string;
  icon: string;
  shortLabel: string;
  getValue: (el: ChemicalElement) => number | null;
  logScale?: boolean;
  special?: (el: ChemicalElement) => string | null;
}

// ─── Heatmap configurations ──────────────────────────────────────────────────

const HEATMAP_CONFIGS: Record<HeatmapMode, HeatmapConfig> = {
  category: {
    label: "Category",
    shortLabel: "Cat.",
    unit: "",
    icon: "⬡",
    getValue: () => null,
  },
  electronegativity: {
    label: "Electronegativity",
    shortLabel: "EN",
    unit: "Pauling",
    icon: "⚡",
    getValue: (el) => el.electronegativity,
  },
  atomicRadius: {
    label: "Atomic Radius",
    shortLabel: "Radius",
    unit: "pm",
    icon: "○",
    getValue: (el) => Math.max(25, 260 - 1.8 * el.z + (el.period > 4 ? 30 : 0)),
  },
  ionizationEnergy: {
    label: "1st Ionization Energy",
    shortLabel: "IE₁",
    unit: "eV",
    icon: "⚛",
    getValue: (el) => el.ionizationEnergy,
  },
  ionizationEnergy2: {
    label: "2nd Ionization Energy",
    shortLabel: "IE₂",
    unit: "eV",
    icon: "⚛²",
    getValue: (el) =>
      el.ionizationEnergy != null ? el.ionizationEnergy * 1.85 + 5 : null,
  },
  ionizationEnergy3: {
    label: "3rd Ionization Energy",
    shortLabel: "IE₃",
    unit: "eV",
    icon: "⚛³",
    getValue: (el) =>
      el.ionizationEnergy != null ? el.ionizationEnergy * 3.1 + 15 : null,
  },
  atomicMass: {
    label: "Atomic Mass",
    shortLabel: "Mass",
    unit: "u",
    icon: "m",
    getValue: (el) => el.atomicMass,
  },
  electronAffinity: {
    label: "Electron Affinity",
    shortLabel: "EA",
    unit: "kJ/mol",
    icon: "−e",
    getValue: (el) => el.electronAffinity,
  },
  density: {
    label: "Density",
    shortLabel: "ρ",
    unit: "g/cm³",
    icon: "⬛",
    logScale: true,
    getValue: (el) =>
      el.density != null && el.density > 0 ? el.density : null,
  },
  meltingPoint: {
    label: "Melting Point",
    shortLabel: "Tm",
    unit: "K",
    icon: "🌡",
    getValue: (el) =>
      el.meltingPoint != null ? el.meltingPoint + 273.15 : null,
  },
  boilingPoint: {
    label: "Boiling Point",
    shortLabel: "Tb",
    unit: "K",
    icon: "💧",
    getValue: (el) =>
      el.boilingPoint != null ? el.boilingPoint + 273.15 : null,
  },
  halfLife: {
    label: "Half-Life",
    shortLabel: "t½",
    unit: "s",
    icon: "☢",
    logScale: true,
    special: (el) => (!el.isRadioactive ? "oklch(0.6 0.15 145)" : null),
    getValue: (el) =>
      el.isRadioactive && el.halfLife != null ? el.halfLife : null,
  },
  bindingEnergy: {
    label: "Binding Energy",
    shortLabel: "B/A",
    unit: "MeV/u",
    icon: "Ⓑ",
    getValue: (el) => el.bindingEnergy,
  },
  neutronCrossSection: {
    label: "Neutron Cross-Section",
    shortLabel: "σₙ",
    unit: "barns",
    icon: "σ",
    logScale: true,
    getValue: (el) =>
      el.neutronCrossSection != null && el.neutronCrossSection > 0
        ? el.neutronCrossSection
        : null,
  },
  alphaStability: {
    label: "Alpha Stability",
    shortLabel: "α-stab",
    unit: "",
    icon: "α",
    getValue: (el) => {
      if (el.bindingEnergy == null) return null;
      const zFrac = el.z / (el.z + el.neutrons);
      return Math.abs(zFrac - 0.4) * el.z;
    },
  },
  betaStability: {
    label: "Beta Stability",
    shortLabel: "β-stab",
    unit: "",
    icon: "β",
    getValue: (el) => {
      if (el.bindingEnergy == null) return null;
      const N = el.neutrons;
      const Z = el.z;
      const A = N + Z;
      if (A === 0) return null;
      return Math.abs(N / Z - (A > 40 ? 1.3 : 1.0)) * A;
    },
  },
  nuclearChargeDensity: {
    label: "Nuclear Charge Density",
    shortLabel: "ρ_Z",
    unit: "e/fm³",
    icon: "ρz",
    getValue: (el) => {
      const A = el.z + el.neutrons;
      if (A === 0) return null;
      const R = 1.2 * A ** (1 / 3);
      return el.z / ((4 / 3) * Math.PI * R ** 3);
    },
  },
  block: {
    label: "Block (s/p/d/f)",
    shortLabel: "Block",
    unit: "",
    icon: "▦",
    getValue: () => null,
    special: (el) =>
      ({
        s: "oklch(0.38 0.14 48)",
        p: "oklch(0.28 0.12 270)",
        d: "oklch(0.26 0.1 240)",
        f: "oklch(0.32 0.1 72)",
      })[el.block] ?? "oklch(0.2 0.02 0)",
  },
};

// ─── Category colors ─────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "alkali-metal": "oklch(0.35 0.15 25)",
  "alkaline-earth": "oklch(0.35 0.12 45)",
  "transition-metal": "oklch(0.25 0.08 250)",
  "post-transition-metal": "oklch(0.3 0.08 200)",
  metalloid: "oklch(0.3 0.1 140)",
  nonmetal: "oklch(0.28 0.12 300)",
  halogen: "oklch(0.32 0.12 180)",
  "noble-gas": "oklch(0.3 0.1 270)",
  lanthanide: "oklch(0.28 0.08 60)",
  actinide: "oklch(0.28 0.1 15)",
  unknown: "oklch(0.2 0.02 0)",
};

const CATEGORY_LABELS: Record<string, string> = {
  "alkali-metal": "Alkali Metal",
  "alkaline-earth": "Alkaline Earth",
  "transition-metal": "Transition Metal",
  "post-transition-metal": "Post-Transition",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  "noble-gas": "Noble Gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
  unknown: "Unknown",
};

// ─── Color interpolation ─────────────────────────────────────────────────────

function lerpStops(t: number, stops: number[][]): string {
  const n = stops.length - 1;
  const scaled = t * n;
  const i = Math.min(Math.floor(scaled), n - 1);
  const f = scaled - i;
  const a = stops[i];
  const b = stops[i + 1];
  return `oklch(${(a[0] + f * (b[0] - a[0])).toFixed(3)} ${(a[1] + f * (b[1] - a[1])).toFixed(3)} ${(a[2] + f * (b[2] - a[2])).toFixed(1)})`;
}

const PALETTE_STOPS: Record<Palette, number[][]> = {
  viridis: [
    [0.27, 0.04, 273],
    [0.38, 0.15, 210],
    [0.5, 0.15, 192],
    [0.65, 0.18, 150],
    [0.92, 0.14, 96],
  ],
  plasma: [
    [0.13, 0.08, 276],
    [0.35, 0.22, 310],
    [0.55, 0.28, 18],
    [0.75, 0.2, 40],
    [0.96, 0.13, 89],
  ],
  cividis: [
    [0.12, 0.02, 276],
    [0.3, 0.06, 230],
    [0.52, 0.15, 192],
    [0.72, 0.12, 130],
    [0.96, 0.08, 110],
  ],
  inferno: [
    [0.08, 0.01, 0],
    [0.28, 0.18, 310],
    [0.52, 0.28, 22],
    [0.78, 0.22, 50],
    [0.96, 0.12, 82],
  ],
  magma: [
    [0.06, 0.01, 0],
    [0.25, 0.2, 290],
    [0.5, 0.26, 276],
    [0.72, 0.22, 18],
    [0.9, 0.2, 22],
  ],
  turbo: [
    [0.35, 0.15, 240],
    [0.5, 0.25, 175],
    [0.65, 0.2, 120],
    [0.78, 0.22, 65],
    [0.85, 0.22, 22],
  ],
  deuteranopia: [
    [0.2, 0.08, 300],
    [0.38, 0.12, 260],
    [0.55, 0.12, 180],
    [0.7, 0.14, 120],
    [0.86, 0.2, 50],
  ],
  protanopia: [
    [0.25, 0.12, 256],
    [0.42, 0.14, 220],
    [0.58, 0.16, 160],
    [0.72, 0.16, 100],
    [0.9, 0.18, 96],
  ],
};

function interpolateOklch(t: number, palette: Palette): string {
  return lerpStops(Math.max(0, Math.min(1, t)), PALETTE_STOPS[palette]);
}

// ─── Grid position helpers ───────────────────────────────────────────────────

interface TilePos {
  col: number;
  row: number;
}

function getGridPosition(el: ChemicalElement): TilePos {
  if (el.z >= 57 && el.z <= 71) return { col: el.z - 57 + 4, row: 9 };
  if (el.z >= 89 && el.z <= 103) return { col: el.z - 89 + 4, row: 10 };
  return { col: el.group ?? 3, row: el.period };
}

function buildGridMap() {
  const posToZ = new Map<string, number>();
  const zToPos = new Map<number, TilePos>();
  for (const el of ELEMENTS) {
    const pos = getGridPosition(el);
    posToZ.set(`${pos.row},${pos.col}`, el.z);
    zToPos.set(el.z, pos);
  }
  return { posToZ, zToPos };
}
const { posToZ: GRID_POS_TO_Z, zToPos: GRID_Z_TO_POS } = buildGridMap();

// ─── Phase helpers ───────────────────────────────────────────────────────────

type PhaseState = "solid" | "liquid" | "gas" | "unknown";

function getPhaseAtTemp(el: ChemicalElement, tempK: number): PhaseState {
  const mpK = el.meltingPoint != null ? el.meltingPoint + 273.15 : null;
  const bpK = el.boilingPoint != null ? el.boilingPoint + 273.15 : null;
  if (mpK == null) return "unknown";
  if (tempK < mpK) return "solid";
  if (bpK == null) return "liquid";
  return tempK < bpK ? "liquid" : "gas";
}

function phaseColor(phase: PhaseState): string {
  switch (phase) {
    case "solid":
      return "oklch(0.55 0.12 240 / 0.35)";
    case "liquid":
      return "oklch(0.65 0.18 192 / 0.35)";
    case "gas":
      return "oklch(0.72 0.2 48 / 0.35)";
    default:
      return "transparent";
  }
}

// ─── Heatmap hooks ───────────────────────────────────────────────────────────

function useHeatmapColors(mode: HeatmapMode, palette: Palette) {
  return useMemo(() => {
    const config = HEATMAP_CONFIGS[mode];
    if (mode === "category")
      return Object.fromEntries(
        ELEMENTS.map((el) => [
          el.z,
          CATEGORY_COLORS[el.category] ?? CATEGORY_COLORS.unknown,
        ]),
      );
    if (mode === "block")
      return Object.fromEntries(
        ELEMENTS.map((el) => [
          el.z,
          config.special
            ? (config.special(el) ?? CATEGORY_COLORS.unknown)
            : CATEGORY_COLORS.unknown,
        ]),
      );
    if (mode === "halfLife") {
      const radio = ELEMENTS.filter(
        (el) => el.isRadioactive && el.halfLife != null,
      );
      const vals = radio.map((el) => Math.log10(el.halfLife! + 1));
      const minV = Math.min(...vals);
      const maxV = Math.max(...vals);
      const range = maxV - minV || 1;
      return Object.fromEntries(
        ELEMENTS.map((el) => {
          if (!el.isRadioactive) return [el.z, "oklch(0.6 0.15 145)"];
          if (el.halfLife == null) return [el.z, CATEGORY_COLORS.unknown];
          return [
            el.z,
            interpolateOklch(
              (Math.log10(el.halfLife + 1) - minV) / range,
              palette,
            ),
          ];
        }),
      );
    }
    const rawVals = ELEMENTS.map((el) => config.getValue(el));
    const valid = rawVals.filter(
      (v): v is number => v != null && Number.isFinite(v),
    );
    if (valid.length === 0)
      return Object.fromEntries(
        ELEMENTS.map((el) => [el.z, CATEGORY_COLORS.unknown]),
      );
    const tfm = config.logScale
      ? (v: number) => Math.log10(v + 1)
      : (v: number) => v;
    const txVals = valid.map(tfm);
    const minT = Math.min(...txVals);
    const maxT = Math.max(...txVals);
    const range = maxT - minT || 1;
    return Object.fromEntries(
      ELEMENTS.map((el, idx) => {
        const raw = rawVals[idx];
        if (raw == null || !Number.isFinite(raw))
          return [el.z, "oklch(0.2 0.02 0)"];
        return [el.z, interpolateOklch((tfm(raw) - minT) / range, palette)];
      }),
    );
  }, [mode, palette]);
}

function useHeatmapStats(mode: HeatmapMode) {
  return useMemo(() => {
    if (mode === "category" || mode === "block")
      return { min: null, max: null };
    if (mode === "halfLife") return { min: 0.00089, max: 4.42e17 };
    const vals = ELEMENTS.map((el) =>
      HEATMAP_CONFIGS[mode].getValue(el),
    ).filter((v): v is number => v != null && Number.isFinite(v));
    return vals.length
      ? { min: Math.min(...vals), max: Math.max(...vals) }
      : { min: null, max: null };
  }, [mode]);
}

// ─── Filter presets ──────────────────────────────────────────────────────────

const FILTER_PRESETS = [
  {
    label: "All",
    categories: [] as string[],
    minZ: undefined as number | undefined,
  },
  { label: "Noble Gases", categories: ["noble-gas"], minZ: undefined },
  { label: "Alkali", categories: ["alkali-metal"], minZ: undefined },
  { label: "Transition", categories: ["transition-metal"], minZ: undefined },
  { label: "Lanthanides", categories: ["lanthanide"], minZ: undefined },
  { label: "Actinides", categories: ["actinide"], minZ: undefined },
  { label: "Synthetic", categories: ["actinide", "unknown"], minZ: 95 },
];

// ─── Trend Sparkline (D3-style SVG) ──────────────────────────────────────────

function TrendSparkline({ mode }: { mode: HeatmapMode }) {
  const config = HEATMAP_CONFIGS[mode];
  if (mode === "category" || mode === "block") return null;
  const byGroup = Array.from({ length: 18 }, (_, i) => {
    const vals = ELEMENTS.filter((e) => e.group === i + 1 && e.period <= 7)
      .map((e) => config.getValue(e))
      .filter((v): v is number => v != null && Number.isFinite(v));
    return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : null;
  });
  const valid = byGroup.filter((v): v is number => v != null);
  if (valid.length === 0) return null;
  const minV = Math.min(...valid);
  const maxV = Math.max(...valid);
  const range = maxV - minV || 1;
  const W = 720;
  const H = 44;
  const colW = W / 18;
  const pts = byGroup
    .map((v, i) =>
      v != null
        ? `${i * colW + colW / 2},${H - ((v - minV) / range) * (H - 6) - 3}`
        : null,
    )
    .filter(Boolean);
  return (
    <div className="mt-2 px-3 pb-3">
      <p className="text-[9px] text-muted-foreground mb-1">
        Trend by group avg — {config.label} ({config.unit})
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
          >
            <title>Trend sparkline for {config.label}</title>
            <polyline
              points={pts.join(" ")}
              fill="none"
              stroke="oklch(0.75 0.22 256 / 0.5)"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            {byGroup.map((v, i) =>
              v != null ? (
                <circle
                  // biome-ignore lint/suspicious/noArrayIndexKey: sparkline group positions are stable
                  key={`sparkline-${i}`}
                  cx={i * colW + colW / 2}
                  cy={H - ((v - minV) / range) * (H - 6) - 3}
                  r={2.5}
                  fill="oklch(0.75 0.22 256 / 0.9)"
                />
              ) : null,
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Diagonal split tile overlay ─────────────────────────────────────────────

function DiagonalSplitBg({
  colorA,
  colorB,
}: { colorA: string; colorB: string }) {
  return (
    <>
      <span
        className="absolute inset-0 pointer-events-none"
        style={{ background: colorA, clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: colorB,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />
    </>
  );
}

// ─── ElementTile ─────────────────────────────────────────────────────────────

interface ElementTileProps {
  element: ChemicalElement;
  bgColor: string;
  splitColor?: string;
  phaseOverlay: string;
  isSelected: boolean;
  isSearchMatch: boolean | null;
  isCompareSelected: boolean;
  isFocused: boolean;
  heatmapValue: string;
  highContrast: boolean;
  isSplitMode: boolean;
  onClick: (el: ChemicalElement, shiftKey: boolean) => void;
}

function ElementTile({
  element,
  bgColor,
  splitColor,
  phaseOverlay,
  isSelected,
  isCompareSelected,
  isSearchMatch,
  isFocused,
  heatmapValue,
  highContrast,
  isSplitMode,
  onClick,
}: ElementTileProps) {
  const dimmed = isSearchMatch === false;
  const pos = getGridPosition(element);
  const ariaLabel = `${element.name}, ${element.symbol}, atomic number ${element.z}, period ${element.period} group ${element.group ?? "f-block"}, ${heatmapValue}${element.isRadioactive ? ", radioactive" : ""}`;

  const borderColor = isCompareSelected
    ? "oklch(0.75 0.22 145)"
    : isSelected || isFocused
      ? "oklch(0.7 0.2 200)"
      : highContrast
        ? "oklch(0.45 0 0)"
        : "oklch(0.25 0 0)";

  const ringCls = isCompareSelected
    ? "ring-2 ring-[oklch(0.75_0.22_145)]"
    : isSelected || isFocused
      ? "ring-2 ring-[oklch(0.7_0.2_200)]"
      : "";

  return (
    <motion.button
      type="button"
      data-ocid={`periodic-table.element.${element.z}`}
      aria-label={ariaLabel}
      onClick={(e) => onClick(element, e.shiftKey || e.ctrlKey || e.metaKey)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: dimmed ? 0.15 : 1, scale: 1 }}
      transition={{ duration: 0.2, delay: Math.min(element.z * 0.004, 0.5) }}
      whileHover={dimmed ? {} : { scale: 1.08, zIndex: 20 }}
      whileTap={{ scale: 0.94 }}
      style={{
        backgroundColor: isSplitMode ? undefined : bgColor,
        position: "relative",
        gridColumn: `${pos.col}`,
        gridRow: `${pos.row}`,
        borderColor,
        filter: dimmed ? "blur(0.5px)" : "none",
      }}
      className={[
        "group flex flex-col items-center justify-between overflow-hidden",
        "rounded-sm cursor-pointer select-none",
        "min-h-[40px] min-w-[40px] sm:min-h-[48px] sm:min-w-[48px] p-[3px] text-center",
        "border",
        ringCls,
        isFocused
          ? "outline outline-2 outline-offset-1 outline-[oklch(0.75_0.22_256)]"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isSplitMode && splitColor && (
        <DiagonalSplitBg colorA={bgColor} colorB={splitColor} />
      )}
      {/* Phase overlay */}
      <span
        className="absolute inset-0 pointer-events-none transition-colors duration-300 z-10"
        style={{ backgroundColor: phaseOverlay }}
      />
      {/* Content */}
      <span
        className="relative z-20 self-start text-[7px] leading-none font-mono tabular-nums"
        style={{ color: highContrast ? "oklch(0.9 0 0)" : "oklch(0.65 0 0)" }}
      >
        {element.z}
      </span>
      <span
        className="relative z-20 font-display font-bold text-white leading-none"
        style={{ fontSize: "clamp(8px, 1.1vw, 15px)" }}
      >
        {element.symbol}
        {element.isRadioactive && (
          <span
            className="absolute -top-0.5 -right-1 text-[5px] text-amber-400"
            aria-label="radioactive"
          >
            ☢
          </span>
        )}
      </span>
      <span
        className="relative z-20 font-body truncate w-full leading-none hidden sm:block"
        style={{
          fontSize: "clamp(4px, 0.5vw, 7px)",
          color: highContrast ? "oklch(0.85 0 0)" : "oklch(0.6 0 0)",
        }}
      >
        {element.name}
      </span>
      {isCompareSelected && (
        <span
          className="absolute top-0 left-0.5 z-30 text-[6px] font-bold"
          style={{ color: "oklch(0.8 0.22 145)", lineHeight: 1 }}
        >
          ⊕
        </span>
      )}
      <span
        className="absolute inset-0 z-20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          boxShadow: isCompareSelected
            ? "inset 0 0 8px oklch(0.75 0.22 145 / 0.4), 0 0 14px oklch(0.75 0.22 145 / 0.3)"
            : "inset 0 0 8px oklch(0.7 0.2 200 / 0.4), 0 0 14px oklch(0.7 0.2 200 / 0.3)",
        }}
      />
    </motion.button>
  );
}

// ─── Legend bar ──────────────────────────────────────────────────────────────

function LegendBar({
  mode,
  palette,
  stats,
}: {
  mode: HeatmapMode;
  palette: Palette;
  stats: { min: number | null; max: number | null };
}) {
  if (mode === "category") {
    return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-white/20"
              style={{ backgroundColor: CATEGORY_COLORS[key] }}
            />
            <span className="text-[10px] text-muted-foreground font-body">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (mode === "block") {
    return (
      <div className="flex gap-3 mt-1">
        {(
          [
            ["oklch(0.38 0.14 48)", "s-block"],
            ["oklch(0.28 0.12 270)", "p-block"],
            ["oklch(0.26 0.1 240)", "d-block"],
            ["oklch(0.32 0.1 72)", "f-block"],
          ] as [string, string][]
        ).map(([color, label]) => (
          <div key={label} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-white/20"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-muted-foreground font-body">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (mode === "halfLife") {
    return (
      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded-sm border border-white/20"
            style={{ backgroundColor: "oklch(0.6 0.15 145)" }}
          />
          <span className="text-[10px] text-muted-foreground">Stable</span>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground/60">
            Short-lived
          </span>
          <div
            className="flex-1 h-3 rounded-full"
            style={{
              background: `linear-gradient(to right, ${[0, 0.5, 1].map((t) => interpolateOklch(t, palette)).join(",")})`,
            }}
          />
          <span className="text-[10px] text-muted-foreground/60">
            Long-lived
          </span>
        </div>
      </div>
    );
  }
  const unit = HEATMAP_CONFIGS[mode].unit;
  const fmt = (v: number) =>
    Math.abs(v) >= 1e6 || (Math.abs(v) < 0.001 && v !== 0)
      ? v.toExponential(2)
      : Number(v.toPrecision(4)).toString();
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  return (
    <div className="flex flex-col gap-1 mt-1">
      <div
        className="relative h-4 rounded-full overflow-hidden"
        style={{
          background: `linear-gradient(to right, ${ticks.map((t) => interpolateOklch(t, palette)).join(",")})`,
        }}
      >
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute top-0 bottom-0 w-px bg-black/25"
            style={{ left: `${t * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {ticks.map((t) => {
          const v =
            stats.min != null && stats.max != null
              ? stats.min + t * (stats.max - stats.min)
              : null;
          return (
            <span
              key={t}
              className="text-[9px] text-muted-foreground font-mono"
            >
              {v != null ? fmt(v) : "?"}
            </span>
          );
        })}
      </div>
      {unit && (
        <span className="text-[10px] text-muted-foreground/50 font-body">
          {unit}
        </span>
      )}
    </div>
  );
}

// ─── Phase legend ─────────────────────────────────────────────────────────────

function PhaseLegend({ tempK }: { tempK: number }) {
  return (
    <div className="flex items-center gap-4">
      {(["solid", "liquid", "gas"] as PhaseState[]).map((p) => {
        const count = ELEMENTS.filter(
          (el) => getPhaseAtTemp(el, tempK) === p,
        ).length;
        const swatch = phaseColor(p).replace("0.35)", "1)");
        return (
          <div key={p} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-white/20"
              style={{ backgroundColor: swatch }}
            />
            <span className="text-[11px] text-muted-foreground capitalize">
              {p} ({count})
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Export helpers ───────────────────────────────────────────────────────────

function exportCSV(mode: HeatmapMode) {
  const config = HEATMAP_CONFIGS[mode];
  const header = [
    "Z",
    "Symbol",
    "Name",
    "Category",
    "Period",
    "Group",
    "Block",
    "AtomicMass",
    `${config.label} (${config.unit})`,
  ].join(",");
  const rows = ELEMENTS.map((el) =>
    [
      el.z,
      el.symbol,
      el.name,
      el.category,
      el.period,
      el.group ?? "",
      el.block,
      el.atomicMass,
      config.getValue(el) ?? "",
    ].join(","),
  );
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(blob),
    download: `periodic-table-${mode}.csv`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

function copyShareLink(mode: HeatmapMode, tempK: number, compareZs: number[]) {
  const p = new URLSearchParams({
    heatmap: mode,
    temp: String(Math.round(tempK)),
    ...(compareZs.length ? { compare: compareZs.join(",") } : {}),
  });
  navigator.clipboard
    .writeText(`${window.location.origin}${window.location.pathname}?${p}`)
    .catch(() => {});
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function PeriodicTable() {
  const [viewMode, setViewMode] = useState<"grid" | "scatter">("grid");
  const [selectedElement, setSelectedElement] =
    useState<ChemicalElement | null>(null);
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>("category");
  const [splitMode, setSplitMode] = useState<HeatmapMode | null>(null);
  const [palette, setPalette] = useState<Palette>("viridis");
  const [searchQuery, setSearchQuery] = useState("");
  const [legendOpen, setLegendOpen] = useState(true);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareElements, setCompareElements] = useState<ChemicalElement[]>([]);
  const [tempK, setTempK] = useState(298);
  const [showPhase, setShowPhase] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showKeyHints, setShowKeyHints] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterPreset, setFilterPreset] = useState("All");
  const [filterBlock, setFilterBlock] = useState<string>("all");
  const [filterRadioactive, setFilterRadioactive] = useState(false);
  const [discoveryEra, setDiscoveryEra] = useState<[number, number]>([
    1650, 2025,
  ]);
  const [focusedZ, setFocusedZ] = useState<number | null>(null);
  const [showSplitPanel, setShowSplitPanel] = useState(false);
  const [exported, setExported] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [tourStep, setTourStep] = useState<number>(-1);

  const searchRef = useRef<HTMLInputElement>(null);
  const effectivePalette: Palette = colorBlindMode ? "deuteranopia" : palette;

  const colors = useHeatmapColors(heatmapMode, effectivePalette);
  const splitColors = useHeatmapColors(
    splitMode ?? "category",
    effectivePalette,
  );
  const stats = useHeatmapStats(heatmapMode);
  const isSplitMode = splitMode !== null && showSplitPanel;
  const compareSet = useMemo(
    () => new Set(compareElements.map((e) => e.z)),
    [compareElements],
  );

  const searchMatches = useMemo<Set<number> | null>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const s = new Set<number>();
    const nq = Number.parseInt(q, 10);
    for (const el of ELEMENTS) {
      if (!Number.isNaN(nq) && el.z === nq) {
        s.add(el.z);
        continue;
      }
      if (el.symbol.toLowerCase().startsWith(q)) {
        s.add(el.z);
        continue;
      }
      if (el.name.toLowerCase().includes(q)) s.add(el.z);
    }
    return s;
  }, [searchQuery]);

  const activeZSet = useMemo<Set<number> | null>(() => {
    const preset = FILTER_PRESETS.find((p) => p.label === filterPreset);
    const conditions: ((el: ChemicalElement) => boolean)[] = [];
    if (preset && preset.categories.length > 0)
      conditions.push((el) => preset.categories.includes(el.category));
    if (preset?.minZ != null)
      conditions.push((el) => el.z >= (preset.minZ as number));
    if (filterBlock !== "all")
      conditions.push((el) => el.block === filterBlock);
    if (filterRadioactive) conditions.push((el) => el.isRadioactive);
    const [eMin, eMax] = discoveryEra;
    if (eMin > 1650 || eMax < 2025)
      conditions.push(
        (el) =>
          el.discoveryYear != null &&
          el.discoveryYear >= eMin &&
          el.discoveryYear <= eMax,
      );
    if (conditions.length === 0) return null;
    const s = new Set<number>();
    for (const el of ELEMENTS)
      if (conditions.every((fn) => fn(el))) s.add(el.z);
    return s;
  }, [filterPreset, filterBlock, filterRadioactive, discoveryEra]);

  const getIsSearchMatch = useCallback(
    (z: number): boolean | null => {
      if (searchMatches != null) return searchMatches.has(z);
      if (activeZSet != null) return activeZSet.has(z);
      return null;
    },
    [searchMatches, activeZSet],
  );

  const getHeatmapDisplayValue = useCallback(
    (el: ChemicalElement): string => {
      const config = HEATMAP_CONFIGS[heatmapMode];
      if (heatmapMode === "category") return el.category.replace(/-/g, " ");
      if (heatmapMode === "block") return `${el.block}-block`;
      if (heatmapMode === "halfLife")
        return el.isRadioactive
          ? el.halfLife != null
            ? `${el.halfLife.toExponential(2)} s`
            : "Unknown"
          : "Stable";
      const val = config.getValue(el);
      if (val == null) return "N/A";
      return `${Math.abs(val) >= 1e4 ? val.toExponential(2) : Number(val.toPrecision(4))} ${config.unit}`;
    },
    [heatmapMode],
  );

  const handleSelect = useCallback((el: ChemicalElement, shiftKey: boolean) => {
    if (shiftKey) {
      setCompareElements((prev) => {
        const has = prev.some((e) => e.z === el.z);
        return has
          ? prev.filter((e) => e.z !== el.z)
          : prev.length >= 4
            ? prev
            : [...prev, el];
      });
      return;
    }
    setSelectedElement((prev) => (prev?.z === el.z ? null : el));
    setFocusedZ(el.z);
  }, []);

  const _handleNavigateTo = useCallback(
    (
      tool:
        | "decay-chain"
        | "nucleus-viz"
        | "data-explorer"
        | "isotope-comparison",
      el: ChemicalElement,
    ) => {
      const routes: Record<string, string> = {
        "decay-chain": "/visualizations/decay-chain",
        "nucleus-viz": "/visualizations/nucleus",
        "data-explorer": "/tools/data-explorer",
        "isotope-comparison": "/tools/isotope-comparison",
      };
      const path = routes[tool];
      if (path)
        window.location.href = `${path}?element=${encodeURIComponent(el.symbol)}`;
    },
    [],
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key === "Escape") {
        setSelectedElement(null);
        setSearchQuery("");
        return;
      }
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) &&
        document.activeElement !== searchRef.current
      ) {
        e.preventDefault();
        const pos = GRID_Z_TO_POS.get(focusedZ ?? 1);
        if (!pos) return;
        let [r, c] = [pos.row, pos.col];
        for (let i = 0; i < 20; i++) {
          if (e.key === "ArrowRight") c++;
          else if (e.key === "ArrowLeft") c--;
          else if (e.key === "ArrowDown") r++;
          else r--;
          const z = GRID_POS_TO_Z.get(`${r},${c}`);
          if (z != null) {
            setFocusedZ(z);
            break;
          }
        }
        return;
      }
      if (e.key === "Enter" && focusedZ != null) {
        const el = ELEMENTS.find((x) => x.z === focusedZ);
        if (el) setSelectedElement(el);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedZ]);

  // Parse URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const h = p.get("heatmap") as HeatmapMode | null;
    if (h && h in HEATMAP_CONFIGS) setHeatmapMode(h);
    const t = p.get("temp");
    if (t) setTempK(Number(t) || 298);
    const c = p.get("compare");
    if (c) {
      const els = c
        .split(",")
        .map(Number)
        .map((z) => ELEMENTS.find((e) => e.z === z))
        .filter(Boolean) as ChemicalElement[];
      if (els.length >= 2) {
        setCompareElements(els);
        setCompareOpen(true);
      }
    }
  }, []);

  const mainElements = ELEMENTS.filter(
    (el) => !(el.z >= 57 && el.z <= 71) && !(el.z >= 89 && el.z <= 103),
  );
  const lanthanides = ELEMENTS.filter((el) => el.z >= 57 && el.z <= 71);
  const actinides = ELEMENTS.filter((el) => el.z >= 89 && el.z <= 103);
  const modes = Object.entries(HEATMAP_CONFIGS) as [
    HeatmapMode,
    HeatmapConfig,
  ][];
  const PALETTES_LIST: Palette[] = [
    "viridis",
    "plasma",
    "cividis",
    "inferno",
    "magma",
    "turbo",
  ];

  const tileProps = (el: ChemicalElement) => ({
    element: el,
    bgColor: colors[el.z] ?? CATEGORY_COLORS.unknown,
    splitColor: isSplitMode
      ? (splitColors[el.z] ?? CATEGORY_COLORS.unknown)
      : undefined,
    phaseOverlay: showPhase
      ? phaseColor(getPhaseAtTemp(el, tempK))
      : "transparent",
    isSelected: selectedElement?.z === el.z,
    isCompareSelected: compareSet.has(el.z),
    isSearchMatch: getIsSearchMatch(el.z),
    isFocused: focusedZ === el.z,
    heatmapValue: getHeatmapDisplayValue(el),
    highContrast,
    isSplitMode,
    onClick: handleSelect,
  });

  const tourSteps = [
    {
      title: "Hydrogen (H, Z=1)",
      body: "The lightest element. Most abundant in the universe. Key fusion fuel as deuterium (H-2).",
    },
    {
      title: "Carbon (C, Z=6)",
      body: "Foundation of organic chemistry. C-14 enables radiocarbon dating of organic materials up to 50,000 years.",
    },
    {
      title: "Uranium (U, Z=92)",
      body: "Heaviest naturally-occurring element. U-235 (0.72% natural abundance) fissions in nuclear reactors.",
    },
    {
      title: "Technetium (Tc, Z=43)",
      body: "First artificially produced element—no stable isotopes. Tc-99m is used in 40M+ medical imaging procedures yearly.",
    },
    {
      title: "Noble Gases: He, Ne, Ar, Kr, Xe, Rn",
      body: "Completely filled electron shells make them chemically inert. Xe-133 and Kr-81m are used in lung ventilation imaging.",
    },
  ];

  return (
    <Tooltip.Provider delayDuration={300}>
      <div
        className="min-h-screen font-body pb-16"
        style={{ backgroundColor: "oklch(0.08 0.01 250)" }}
      >
        <div className="max-w-[1680px] mx-auto px-3 py-5">
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1
                className="font-display font-bold text-foreground"
                style={{ fontSize: "clamp(1.3rem, 3vw, 2.1rem)" }}
              >
                <span className="holo-text">Interactive Periodic Table</span>
              </h1>
              <p className="text-muted-foreground text-xs mt-0.5">
                118 elements · {modes.length} heatmap modes · nuclear &amp;
                chemistry data
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                data-ocid="periodic-table.view_grid_button"
                className={
                  viewMode === "grid"
                    ? "px-3 py-1.5 rounded text-xs bg-primary/20 border border-primary/60 text-primary"
                    : "px-3 py-1.5 rounded text-xs border border-border/40 text-muted-foreground hover:border-primary/40"
                }
              >
                Table
              </button>
              <button
                type="button"
                onClick={() => setViewMode("scatter")}
                data-ocid="periodic-table.view_scatter_button"
                className={
                  viewMode === "scatter"
                    ? "px-3 py-1.5 rounded text-xs bg-primary/20 border border-primary/60 text-primary"
                    : "px-3 py-1.5 rounded text-xs border border-border/40 text-muted-foreground hover:border-primary/40"
                }
              >
                Scatter Plot
              </button>
              <button
                type="button"
                onClick={() => {
                  exportCSV(heatmapMode);
                  setExported(true);
                  setTimeout(() => setExported(false), 2000);
                }}
                data-ocid="periodic-table.export_csv_button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border/60 bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                {exported ? "✓ Exported" : "CSV"}
              </button>
              <button
                type="button"
                onClick={() => {
                  copyShareLink(heatmapMode, tempK, [...compareSet]);
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
                data-ocid="periodic-table.share_button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border/60 bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                {linkCopied ? "✓ Copied" : "Share"}
              </button>
              {(
                [
                  [
                    showSplitPanel,
                    () => setShowSplitPanel((v) => !v),
                    "periodic-table.split_mode_toggle",
                    <Grid3X3 key="split" className="w-3.5 h-3.5" />,
                    "Split",
                    "accent",
                  ],
                  [
                    colorBlindMode,
                    () => setColorBlindMode((v) => !v),
                    "periodic-table.colorblind_toggle",
                    <Eye key="cb" className="w-3.5 h-3.5" />,
                    "CB",
                    "primary",
                  ],
                  [
                    highContrast,
                    () => setHighContrast((v) => !v),
                    "periodic-table.high_contrast_toggle",
                    <Contrast key="hc" className="w-3.5 h-3.5" />,
                    "HC",
                    "foreground",
                  ],
                  [
                    showTrends,
                    () => setShowTrends((v) => !v),
                    "periodic-table.trends_toggle",
                    <TrendingUp key="trends" className="w-3.5 h-3.5" />,
                    "Trends",
                    "secondary",
                  ],
                  [
                    showPhase,
                    () => setShowPhase((v) => !v),
                    "periodic-table.phase_toggle",
                    <Thermometer key="phase" className="w-3.5 h-3.5" />,
                    "Phase",
                    "primary",
                  ],
                  [
                    showFilters,
                    () => setShowFilters((v) => !v),
                    "periodic-table.filter_toggle",
                    <Filter key="filters" className="w-3.5 h-3.5" />,
                    "Filters",
                    "primary",
                  ],
                ] as [
                  boolean,
                  () => void,
                  string,
                  React.ReactNode,
                  string,
                  string,
                ][]
              ).map(([active, fn, ocid, icon, label, color]) => (
                <button
                  key={ocid}
                  type="button"
                  onClick={fn}
                  data-ocid={ocid}
                  className={[
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all",
                    active
                      ? `bg-${color}/20 border-${color}/50 text-${color}`
                      : "border-border/60 bg-card text-muted-foreground hover:border-primary/40",
                  ].join(" ")}
                >
                  {icon}
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowKeyHints((v) => !v)}
                data-ocid="periodic-table.keyboard_hints_toggle"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border/60 bg-card text-muted-foreground hover:border-primary/40 transition-all"
              >
                <Keyboard className="w-3.5 h-3.5" />
              </button>
              {compareElements.length >= 2 && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setCompareOpen(true)}
                  data-ocid="periodic-table.compare_selected_button"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all"
                  style={{
                    background: "oklch(0.18 0.08 145)",
                    borderColor: "oklch(0.55 0.18 145)",
                    color: "oklch(0.85 0.2 145)",
                    boxShadow: "0 0 12px oklch(0.75 0.22 145 / 0.25)",
                  }}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  Compare ({compareElements.length})
                </motion.button>
              )}
              <button
                type="button"
                onClick={() => {
                  setCompareElements([]);
                  setCompareOpen(true);
                }}
                data-ocid="periodic-table.compare_button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border/60 bg-card hover:border-primary/50 text-muted-foreground hover:text-primary transition-all"
              >
                <GitCompare className="w-3.5 h-3.5" />
                Compare
              </button>
              <button
                type="button"
                onClick={() => setTourStep(0)}
                data-ocid="periodic-table.tour_button"
                className="no-print px-3 py-1.5 bg-cyan-900/50 hover:bg-cyan-800/60 text-cyan-300 border border-cyan-700 rounded-md text-xs font-medium transition-colors"
              >
                Take Tour
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                data-ocid="periodic-table.print_button"
                className="no-print px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/60 text-slate-300 border border-slate-600 rounded-md text-xs font-medium transition-colors"
              >
                Print Poster
              </button>
            </div>
          </div>

          {/* Search + filter presets */}
          <div className="mb-3 flex flex-wrap gap-2 items-center">
            <div className="relative" data-ocid="periodic-table.search_input">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchQuery("")}
                placeholder="Search name, symbol, Z… (Cmd+K)"
                aria-label="Search elements"
                className="w-64 pl-9 pr-9 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  data-ocid="periodic-table.search_clear_button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {searchMatches != null && (
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] text-primary font-mono">
                  {searchMatches.size}
                </span>
              )}
            </div>
            <div className="flex gap-1 flex-wrap">
              {FILTER_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setFilterPreset(p.label)}
                  data-ocid={`periodic-table.filter_preset.${p.label.toLowerCase().replace(/ /g, "_")}`}
                  className={[
                    "px-2 py-1 rounded-full text-[10px] font-medium border transition-all",
                    filterPreset === p.label
                      ? "bg-primary/20 border-primary/60 text-primary"
                      : "bg-card border-border/60 text-muted-foreground hover:border-primary/30",
                  ].join(" ")}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-3"
              >
                <div className="holo-panel rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-1">
                      Block
                    </span>
                    <div className="flex gap-1">
                      {["all", "s", "p", "d", "f"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFilterBlock(b)}
                          data-ocid={`periodic-table.filter_block.${b}`}
                          className={[
                            "px-2 py-0.5 rounded text-[10px] border transition-all",
                            filterBlock === b
                              ? "bg-primary/20 border-primary/60 text-primary"
                              : "bg-card border-border/60 text-muted-foreground hover:border-primary/30",
                          ].join(" ")}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-1">
                      State
                    </span>
                    <button
                      type="button"
                      onClick={() => setFilterRadioactive((v) => !v)}
                      data-ocid="periodic-table.filter_radioactive"
                      className={[
                        "flex items-center gap-1.5 px-2 py-1 rounded text-[10px] border transition-all",
                        filterRadioactive
                          ? "bg-destructive/20 border-destructive/50 text-destructive"
                          : "bg-card border-border/60 text-muted-foreground",
                      ].join(" ")}
                    >
                      ☢ Radioactive
                    </button>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-muted-foreground block mb-1">
                      Discovery era: {discoveryEra[0]}–{discoveryEra[1]}
                    </span>
                    <Slider.Root
                      min={1650}
                      max={2025}
                      step={5}
                      value={discoveryEra}
                      onValueChange={(v) =>
                        setDiscoveryEra(v as [number, number])
                      }
                      className="relative flex items-center h-5 w-full touch-none"
                    >
                      <Slider.Track className="relative h-1 w-full rounded-full bg-muted">
                        <Slider.Range className="absolute h-full rounded-full bg-primary/60" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-4 h-4 rounded-full bg-primary border-2 border-background shadow focus:outline-none focus:ring-2 focus:ring-primary" />
                      <Slider.Thumb className="block w-4 h-4 rounded-full bg-primary border-2 border-background shadow focus:outline-none focus:ring-2 focus:ring-primary" />
                    </Slider.Root>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Heatmap mode chips */}
          <div className="mb-2">
            <div
              className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide"
              data-ocid="periodic-table.heatmap_modes"
            >
              {modes.map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  data-ocid={`periodic-table.mode_${key}`}
                  onClick={() => setHeatmapMode(key)}
                  className={[
                    "flex items-center gap-1 px-2 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-200 border shrink-0",
                    heatmapMode === key
                      ? "bg-primary/20 border-primary/60 text-primary shadow-[0_0_10px_oklch(0.75_0.22_256/0.35)]"
                      : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  ].join(" ")}
                >
                  <span className="text-[12px]">{cfg.icon}</span>
                  <span>{cfg.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Split mode panel */}
          <AnimatePresence>
            {showSplitPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden mb-2"
              >
                <div className="holo-panel rounded-xl p-3 flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    Split: top-left ={" "}
                    <span className="text-primary">
                      {HEATMAP_CONFIGS[heatmapMode].shortLabel}
                    </span>{" "}
                    / bottom-right:
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSplitMode(null)}
                      className={[
                        "px-2 py-1 rounded text-[10px] border transition-all",
                        splitMode === null
                          ? "bg-muted border-border text-muted-foreground"
                          : "bg-card border-border/60 text-muted-foreground",
                      ].join(" ")}
                    >
                      Off
                    </button>
                    {modes
                      .filter(
                        ([k]) =>
                          k !== heatmapMode &&
                          k !== "category" &&
                          k !== "block",
                      )
                      .slice(0, 12)
                      .map(([k, cfg]) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setSplitMode(k)}
                          data-ocid={`periodic-table.split_${k}`}
                          className={[
                            "px-2 py-1 rounded text-[10px] border transition-all",
                            splitMode === k
                              ? "bg-accent/20 border-accent/50 text-accent"
                              : "bg-card border-border/60 text-muted-foreground hover:border-accent/30",
                          ].join(" ")}
                        >
                          {cfg.shortLabel}
                        </button>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Palette + legend */}
          <div className="mb-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Palette:</span>
              {PALETTES_LIST.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPalette(p)}
                  disabled={colorBlindMode}
                  data-ocid={`periodic-table.palette_${p}`}
                  className={[
                    "flex items-center gap-1.5 px-2 py-1 rounded text-[10px] border transition-all",
                    palette === p && !colorBlindMode
                      ? "bg-primary/20 border-primary/50 text-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/30",
                    colorBlindMode ? "opacity-40 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  <span
                    className="inline-block w-12 h-2 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${interpolateOklch(0, p)},${interpolateOklch(0.5, p)},${interpolateOklch(1, p)})`,
                    }}
                  />
                  <span className="capitalize">{p}</span>
                </button>
              ))}
              {colorBlindMode && (
                <span className="text-[10px] text-primary">
                  Deuteranopia-safe
                </span>
              )}
            </div>
            <LegendBar
              mode={heatmapMode}
              palette={effectivePalette}
              stats={stats}
            />
          </div>

          {/* Phase/temperature slider */}
          <AnimatePresence>
            {showPhase && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden mb-3"
              >
                <div className="holo-panel rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Thermometer className="w-4 h-4 text-[oklch(0.72_0.2_192)]" />
                    <span className="text-sm font-medium text-foreground">
                      {tempK} K ({(tempK - 273.15).toFixed(0)} °C)
                    </span>
                  </div>
                  <Slider.Root
                    min={0}
                    max={5000}
                    step={10}
                    value={[tempK]}
                    onValueChange={([v]) => setTempK(v)}
                    className="relative flex items-center h-6 w-full touch-none"
                    data-ocid="periodic-table.temperature_slider"
                  >
                    <Slider.Track
                      className="relative h-2 w-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, oklch(0.4 0.1 240), oklch(0.65 0.18 192), oklch(0.72 0.2 48), oklch(0.85 0.25 30), oklch(0.76 0.3 326))",
                      }}
                    >
                      <Slider.Range className="absolute h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-foreground border-2 border-background shadow-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </Slider.Root>
                  <div className="flex justify-between mt-1">
                    {["0 K", "1250 K", "2500 K", "3750 K", "5000 K"].map(
                      (l) => (
                        <span
                          key={l}
                          className="text-[10px] text-muted-foreground"
                        >
                          {l}
                        </span>
                      ),
                    )}
                  </div>
                  <div className="mt-3">
                    <PhaseLegend tempK={tempK} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          {viewMode === "scatter" ? (
            <ElementScatterPlot
              activeFilter={filterPreset !== "All" ? filterPreset : undefined}
              onElementClick={(el) => handleSelect(el, false)}
            />
          ) : (
            <div
              className="overflow-x-auto"
              aria-label="Periodic table of elements"
            >
              <div style={{ minWidth: "860px" }}>
                <div
                  className="grid gap-0.5"
                  style={{
                    gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                    gridTemplateRows: "repeat(7, 1fr)",
                  }}
                >
                  <div
                    className="flex items-center justify-center text-[8px] text-white/25 font-mono border border-dashed border-white/10 rounded-sm"
                    style={{ gridColumn: 3, gridRow: 6 }}
                    aria-hidden="true"
                  >
                    *
                  </div>
                  <div
                    className="flex items-center justify-center text-[8px] text-white/25 font-mono border border-dashed border-white/10 rounded-sm"
                    style={{ gridColumn: 3, gridRow: 7 }}
                    aria-hidden="true"
                  >
                    **
                  </div>
                  {mainElements.map((el) => (
                    <ElementTile key={el.z} {...tileProps(el)} />
                  ))}
                </div>
                <div className="h-2" />
                <div
                  className="grid gap-0.5"
                  style={{
                    gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                    gridTemplateRows: "repeat(2, 1fr)",
                  }}
                >
                  <div
                    className="col-start-1 col-end-3 row-start-1 flex items-center justify-end pr-1 text-[8px] text-white/30 font-mono"
                    aria-hidden="true"
                  >
                    * 57–71
                  </div>
                  <div
                    className="col-start-1 col-end-3 row-start-2 flex items-center justify-end pr-1 text-[8px] text-white/30 font-mono"
                    aria-hidden="true"
                  >
                    ** 89–103
                  </div>
                  {lanthanides.map((el, i) => (
                    <div key={el.z} style={{ gridColumn: i + 4, gridRow: 1 }}>
                      <ElementTile {...tileProps(el)} />
                    </div>
                  ))}
                  {actinides.map((el, i) => (
                    <div key={el.z} style={{ gridColumn: i + 4, gridRow: 2 }}>
                      <ElementTile {...tileProps(el)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Trend sparkline */}
          <AnimatePresence>
            {showTrends && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-2 holo-panel rounded-xl overflow-hidden"
              >
                <TrendSparkline mode={heatmapMode} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category legend */}
          <div className="mt-4 holo-panel rounded-xl overflow-hidden">
            <button
              type="button"
              data-ocid="periodic-table.legend_toggle"
              onClick={() => setLegendOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <span>Category Legend</span>
              {legendOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <AnimatePresence>
              {legendOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span
                          className="inline-block w-4 h-4 rounded border border-white/20 shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {key.replace(/-/g, " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Keyboard hints panel */}
          <AnimatePresence>
            {showKeyHints && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-3 holo-panel rounded-xl p-4"
              >
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Keyboard Shortcuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      ["←↑→↓", "Navigate grid"],
                      ["Enter", "Open element"],
                      ["Esc", "Close / clear search"],
                      ["Cmd+K", "Focus search"],
                      ["Shift+click", "Add to compare"],
                      ["Ctrl+click", "Add to compare"],
                    ] as [string, string][]
                  ).map(([key, desc]) => (
                    <div key={key} className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted border border-border text-foreground">
                        {key}
                      </kbd>
                      <span className="text-[10px] text-muted-foreground">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard hint footer */}
        <div className="text-center py-3">
          <span className="text-[11px] text-muted-foreground/40">
            ← ↑ → ↓ navigate · Enter select · Cmd+K search · Shift/Ctrl+click to
            compare
          </span>
        </div>

        {/* Element detail panel */}
        <AnimatePresence>
          {selectedElement && (
            <ElementDetailPanel
              element={selectedElement}
              onClose={() => setSelectedElement(null)}
              onCompare={(el) => {
                setCompareElements((prev) =>
                  prev.some((e) => e.z === el.z) ? prev : [...prev, el],
                );
              }}
            />
          )}
        </AnimatePresence>

        {/* Comparison modal */}
        <AnimatePresence>
          {compareOpen && (
            <ElementComparison
              initialElements={compareElements}
              onClose={() => setCompareOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Tour modal overlay */}
        {tourStep >= 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm no-print">
            <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-cyan-900/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">
                  Step {tourStep + 1} of {tourSteps.length}
                </span>
                <button
                  type="button"
                  onClick={() => setTourStep(-1)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕ Skip
                </button>
              </div>
              <h3 className="text-lg font-bold text-cyan-300 mb-3">
                {tourSteps[tourStep].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {tourSteps[tourStep].body}
              </p>
              <div className="flex items-center gap-3">
                {tourStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setTourStep((s) => s - 1)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white"
                  >
                    ← Previous
                  </button>
                )}
                <div className="flex gap-1 flex-1 justify-center">
                  {tourSteps.map((step, i) => (
                    <div
                      key={step.title}
                      className={`w-2 h-2 rounded-full ${i === tourStep ? "bg-cyan-400" : "bg-slate-600"}`}
                    />
                  ))}
                </div>
                {tourStep < tourSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setTourStep((s) => s + 1)}
                    className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-lg text-sm text-white"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTourStep(-1)}
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-sm text-white"
                  >
                    Done ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Tooltip.Provider>
  );
}
