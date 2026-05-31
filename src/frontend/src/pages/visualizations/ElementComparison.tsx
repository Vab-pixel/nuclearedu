import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type ChemicalElement, ELEMENTS } from "@/data/elements";
import { type Nuclide, nuclides } from "@/data/nuclides";
import { GitCompare, Link2, Plus, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ElementComparisonProps {
  initialElements?: ChemicalElement[];
  onClose: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "alkali-metal": "oklch(0.82 0.28 48)",
  "alkaline-earth": "oklch(0.78 0.22 48)",
  "transition-metal": "oklch(0.68 0.24 240)",
  "post-transition-metal": "oklch(0.75 0.18 240)",
  metalloid: "oklch(0.72 0.22 192)",
  nonmetal: "oklch(0.82 0.24 192)",
  halogen: "oklch(0.78 0.32 22)",
  "noble-gas": "oklch(0.75 0.24 286)",
  lanthanide: "oklch(0.78 0.26 326)",
  actinide: "oklch(0.72 0.28 18)",
  unknown: "oklch(0.5 0 0)",
};

const CATEGORY_BG: Record<string, string> = {
  "alkali-metal": "oklch(0.35 0.15 48)",
  "alkaline-earth": "oklch(0.32 0.12 48)",
  "transition-metal": "oklch(0.25 0.08 240)",
  "post-transition-metal": "oklch(0.28 0.06 240)",
  metalloid: "oklch(0.28 0.1 192)",
  nonmetal: "oklch(0.28 0.1 192)",
  halogen: "oklch(0.3 0.1 22)",
  "noble-gas": "oklch(0.28 0.08 286)",
  lanthanide: "oklch(0.28 0.1 326)",
  actinide: "oklch(0.28 0.1 18)",
  unknown: "oklch(0.2 0 0)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatHalfLife(s: number | null): string {
  if (s === null) return "Stable";
  if (s > 1e20) return "Eff. stable";
  const units: [number, string][] = [
    [3.156e16, "Gyr"],
    [3.156e13, "Myr"],
    [3.156e7, "yr"],
    [86400, "d"],
    [3600, "hr"],
    [60, "min"],
    [1, "s"],
  ];
  for (const [div, label] of units) {
    if (s >= div) return `${(s / div).toPrecision(3)} ${label}`;
  }
  return `${s.toExponential(2)} s`;
}

function fmt(v: number | null | undefined, decimals = 3): string {
  if (v == null || !Number.isFinite(v)) return "—";
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.0001 && v !== 0))
    return v.toExponential(2);
  return v.toFixed(decimals).replace(/\.?0+$/, "");
}

function deltaLabel(
  a: number | null | undefined,
  b: number | null | undefined,
): { abs: string; pct: string; large: boolean } {
  if (a == null || b == null || !Number.isFinite(a) || !Number.isFinite(b))
    return { abs: "—", pct: "—", large: false };
  const d = Math.abs(a - b);
  const pct = b !== 0 ? (d / Math.abs(b)) * 100 : 0;
  return {
    abs: fmt(d, 3),
    pct: `${pct.toFixed(1)}%`,
    large: pct > 50,
  };
}

// ─── AddElementSearch ────────────────────────────────────────────────────

function AddElementSearch({
  onAdd,
  excluded,
}: {
  onAdd: (el: ChemicalElement) => void;
  excluded: Set<number>;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const numQ = Number.parseInt(q, 10);
    return ELEMENTS.filter((el) => {
      if (excluded.has(el.z)) return false;
      if (!Number.isNaN(numQ) && el.z === numQ) return true;
      if (el.symbol.toLowerCase().startsWith(q)) return true;
      if (el.name.toLowerCase().includes(q)) return true;
      return false;
    }).slice(0, 8);
  }, [query, excluded]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleSelect(el: ChemicalElement) {
    onAdd(el);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      data-ocid="comparison.add_element_search"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm">
        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Add element…"
          className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-28"
          aria-label="Search element to add to comparison"
        />
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1 w-52 rounded-lg border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
          >
            {results.map((el) => (
              <button
                key={el.z}
                type="button"
                onClick={() => handleSelect(el)}
                data-ocid={`comparison.dropdown_result.${el.z}`}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-primary/10 transition-colors text-left"
              >
                <span
                  className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold font-display shrink-0 border"
                  style={{
                    backgroundColor:
                      CATEGORY_BG[el.category] ?? CATEGORY_BG.unknown,
                    borderColor:
                      CATEGORY_COLORS[el.category] ?? CATEGORY_COLORS.unknown,
                    color:
                      CATEGORY_COLORS[el.category] ?? "oklch(0.95 0.02 250)",
                  }}
                >
                  {el.symbol}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">
                    {el.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    Z = {el.z}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Element Column ────────────────────────────────────────────────────────

interface ColumnProps {
  element: ChemicalElement;
  selectedNuclide: Nuclide | null;
  onSelectNuclide: (n: Nuclide) => void;
  onRemove: () => void;
  colIndex: number;
}

function ElementColumn({
  element,
  selectedNuclide,
  onSelectNuclide,
  onRemove,
  colIndex,
}: ColumnProps) {
  const catColor = CATEGORY_COLORS[element.category] ?? CATEGORY_COLORS.unknown;
  const catBg = CATEGORY_BG[element.category] ?? CATEGORY_BG.unknown;

  const elementNuclides = useMemo(
    () => nuclides.filter((n) => n.Z === element.z).sort((a, b) => a.A - b.A),
    [element.z],
  );

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3">
      {/* Element header */}
      <div
        className="rounded-xl border p-3 relative"
        style={{
          backgroundColor: catBg,
          borderColor: `${catColor}50`,
          boxShadow: `0 0 20px ${catColor}15`,
        }}
      >
        <button
          type="button"
          onClick={onRemove}
          data-ocid={`comparison.remove_button.${colIndex}`}
          aria-label={`Remove ${element.name} from comparison`}
          className="absolute top-2 right-2 p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-2.5">
          <span
            className="text-3xl font-bold font-display leading-none"
            style={{ color: catColor, textShadow: `0 0 16px ${catColor}80` }}
          >
            {element.symbol}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {element.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Z={element.z} · Period {element.period}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap mt-2">
          <Badge
            className="text-[9px] border px-1.5 py-0 capitalize"
            style={{
              backgroundColor: `${catColor}20`,
              borderColor: `${catColor}40`,
              color: catColor,
            }}
          >
            {element.category.replace(/-/g, " ")}
          </Badge>
          <Badge className="text-[9px] bg-muted/30 text-muted-foreground border-border/40 border px-1.5 py-0">
            {element.phase}
          </Badge>
        </div>
      </div>

      {/* Isotope selector */}
      {elementNuclides.length > 0 && (
        <div>
          <label
            htmlFor={`isotope-col-${colIndex}`}
            className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block"
          >
            Isotope
          </label>
          <select
            id={`isotope-col-${colIndex}`}
            value={selectedNuclide?.symbol ?? ""}
            onChange={(e) => {
              const n = elementNuclides.find(
                (nuc) => nuc.symbol === e.target.value,
              );
              if (n) onSelectNuclide(n);
            }}
            className="w-full rounded border border-border bg-card/60 text-foreground text-xs px-2 py-1.5 outline-none focus:ring-1 focus:ring-primary"
            data-ocid={`comparison.isotope_select.${colIndex}`}
          >
            {elementNuclides.map((n) => (
              <option key={n.symbol} value={n.symbol}>
                {n.symbol}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Key properties */}
      <div className="space-y-1.5">
        <PropRow
          label="Atomic Mass"
          value={`${fmt(element.atomicMass, 4)} u`}
        />
        <PropRow
          label="Electronegativity"
          value={
            element.electronegativity != null
              ? `${element.electronegativity} (Pauling)`
              : "—"
          }
        />
        <PropRow
          label="1st Ionization"
          value={
            element.ionizationEnergy != null
              ? `${fmt(element.ionizationEnergy, 3)} eV`
              : "—"
          }
        />
        <PropRow
          label="Binding Energy (B/A)"
          value={
            selectedNuclide?.bindingEnergyPerNucleon_MeV != null
              ? `${fmt(selectedNuclide.bindingEnergyPerNucleon_MeV, 3)} MeV`
              : element.bindingEnergy != null
                ? `${fmt(element.bindingEnergy, 3)} MeV`
                : "—"
          }
        />
        <PropRow
          label="Half-Life"
          value={formatHalfLife(
            selectedNuclide?.halfLifeSeconds ?? element.halfLife,
          )}
        />
        <PropRow
          label="Density"
          value={
            element.density != null ? `${fmt(element.density, 4)} g/cm³` : "—"
          }
        />
        <PropRow
          label="Melting Point"
          value={
            element.meltingPoint != null
              ? `${fmt(element.meltingPoint, 1)}°C`
              : "—"
          }
        />
        <PropRow
          label="Boiling Point"
          value={
            element.boilingPoint != null
              ? `${fmt(element.boilingPoint, 1)}°C`
              : "—"
          }
        />
        <PropRow
          label="Electron Config"
          value={element.electronConfiguration}
          mono
        />
      </div>
    </div>
  );
}

function PropRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 py-1.5 border-b border-border/20 last:border-0">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span
        className={`text-xs text-foreground break-words ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Delta row ───────────────────────────────────────────────────────────────────

interface DeltaEntry {
  label: string;
  a: number | null | undefined;
  b: number | null | undefined;
  unit: string;
}

function DeltaSection({ deltas }: { deltas: DeltaEntry[] }) {
  return (
    <div
      className="rounded-xl border border-border/40 bg-muted/10 overflow-hidden"
      data-ocid="comparison.delta_section"
    >
      <div className="px-3 py-2 border-b border-border/30 bg-muted/10">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Δ Differences
        </p>
      </div>
      <div className="divide-y divide-border/20">
        {deltas.map((d) => {
          const { abs, pct, large } = deltaLabel(d.a, d.b);
          return (
            <div
              key={d.label}
              className={`px-3 py-2 flex items-center justify-between ${
                large ? "bg-destructive/10" : ""
              }`}
            >
              <span className="text-xs text-muted-foreground">{d.label}</span>
              <div className="text-right">
                <span
                  className={`text-xs font-mono ${
                    large ? "text-destructive" : "text-foreground"
                  }`}
                >
                  Δ{abs} {d.unit}
                </span>
                <span
                  className={`ml-2 text-[10px] ${
                    large ? "text-destructive/80" : "text-muted-foreground"
                  }`}
                >
                  ({pct})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Comparison Bar Chart ───────────────────────────────────────────────────

function ComparisonChart({
  elements,
}: {
  elements: ChemicalElement[];
}) {
  if (elements.length < 2) return null;

  const props: { key: keyof ChemicalElement; label: string }[] = [
    { key: "electronegativity", label: "Electronegativity" },
    { key: "ionizationEnergy", label: "IE1 (eV)" },
    { key: "atomicMass", label: "Atomic Mass (u)" },
  ];

  const data = props
    .map(({ key, label }) => {
      const entry: Record<string, string | number> = { property: label };
      for (const el of elements) {
        const v = el[key];
        if (typeof v === "number" && Number.isFinite(v)) {
          entry[el.symbol] = v;
        }
      }
      return entry;
    })
    .filter((d) =>
      elements.some((el) => el.symbol in d && el.symbol !== "property"),
    );

  const colors = [
    "oklch(0.74 0.28 256)",
    "oklch(0.74 0.28 22)",
    "oklch(0.74 0.28 145)",
  ];

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        Property Comparison
      </p>
      <div
        className="h-40"
        aria-label={`Bar chart comparing ${elements.map((e) => e.name).join(" vs ")} properties`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 4, left: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
            <XAxis
              dataKey="property"
              tick={{ fontSize: 8, fill: "oklch(0.6 0 0)" }}
            />
            <YAxis tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }} />
            <Tooltip
              contentStyle={{
                background: "oklch(0.11 0 0)",
                border: "1px solid oklch(0.18 0 0)",
                borderRadius: 8,
              }}
            />
            {elements.map((el, i) => (
              <Bar
                key={el.symbol}
                dataKey={el.symbol}
                fill={colors[i % colors.length]}
                radius={[3, 3, 0, 0]}
                name={el.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ElementComparison({
  initialElements = [],
  onClose,
}: ElementComparisonProps) {
  const [elements, setElements] = useState<ChemicalElement[]>(() =>
    initialElements.slice(0, 3),
  );

  // Per-column selected nuclide
  const [nuclideA, setNuclideA] = useState<Nuclide | null>(() => {
    const el = initialElements[0];
    if (!el) return null;
    return (
      nuclides.find((n) => n.Z === el.z && n.decayModes.includes("stable")) ??
      nuclides.find((n) => n.Z === el.z) ??
      null
    );
  });
  const [nuclideB, setNuclideB] = useState<Nuclide | null>(() => {
    const el = initialElements[1];
    if (!el) return null;
    return (
      nuclides.find((n) => n.Z === el.z && n.decayModes.includes("stable")) ??
      nuclides.find((n) => n.Z === el.z) ??
      null
    );
  });

  // Linked isotope mode: when enabled, switching one column auto-picks the same A for the other
  const [linkedIsotopes, setLinkedIsotopes] = useState(false);

  const excluded = useMemo(() => new Set(elements.map((e) => e.z)), [elements]);

  function addElement(el: ChemicalElement) {
    if (elements.length >= 2) return;
    setElements((prev) => [...prev, el]);
    const defaultNuclide =
      nuclides.find((n) => n.Z === el.z && n.decayModes.includes("stable")) ??
      nuclides.find((n) => n.Z === el.z) ??
      null;
    if (elements.length === 0) setNuclideA(defaultNuclide);
    else setNuclideB(defaultNuclide);
  }

  function removeElement(idx: number) {
    setElements((prev) => prev.filter((_, i) => i !== idx));
    if (idx === 0) {
      setNuclideA(nuclideB);
      setNuclideB(null);
    } else setNuclideB(null);
  }

  function handleSelectNuclideA(n: Nuclide) {
    setNuclideA(n);
    if (linkedIsotopes && elements[1]) {
      const match =
        nuclides.find((x) => x.Z === elements[1].z && x.A === n.A) ??
        nuclides.find((x) => x.Z === elements[1].z) ??
        null;
      setNuclideB(match);
    }
  }

  function handleSelectNuclideB(n: Nuclide) {
    setNuclideB(n);
    if (linkedIsotopes && elements[0]) {
      const match =
        nuclides.find((x) => x.Z === elements[0].z && x.A === n.A) ??
        nuclides.find((x) => x.Z === elements[0].z) ??
        null;
      setNuclideA(match);
    }
  }

  const copyLink = useCallback(() => {
    const params = new URLSearchParams();
    for (const el of elements) params.append("z", String(el.z));
    const url = `${window.location.origin}/tools/isotope-comparison?${params.toString()}`;
    navigator.clipboard.writeText(url).catch(() => {});
  }, [elements]);

  // Delta calculations
  const el0 = elements[0];
  const el1 = elements[1];
  const n0 = nuclideA;
  const n1 = nuclideB;

  const deltas: DeltaEntry[] = useMemo(() => {
    if (!el0 || !el1) return [];
    return [
      { label: "Atomic Mass", a: el0.atomicMass, b: el1.atomicMass, unit: "u" },
      {
        label: "Electronegativity",
        a: el0.electronegativity,
        b: el1.electronegativity,
        unit: "",
      },
      {
        label: "IE1",
        a: el0.ionizationEnergy,
        b: el1.ionizationEnergy,
        unit: "eV",
      },
      {
        label: "Binding Energy",
        a: n0?.bindingEnergyPerNucleon_MeV ?? el0.bindingEnergy,
        b: n1?.bindingEnergyPerNucleon_MeV ?? el1.bindingEnergy,
        unit: "MeV",
      },
      { label: "Density", a: el0.density, b: el1.density, unit: "g/cm³" },
      {
        label: "Melting Point",
        a: el0.meltingPoint,
        b: el1.meltingPoint,
        unit: "°C",
      },
      {
        label: "Boiling Point",
        a: el0.boilingPoint,
        b: el1.boilingPoint,
        unit: "°C",
      },
    ];
  }, [el0, el1, n0, n1]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="comparison.modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-border/60 bg-card shadow-2xl flex flex-col overflow-hidden"
        style={{
          boxShadow:
            "0 0 60px oklch(0.75 0.22 256/0.15), 0 24px 48px oklch(0 0 0/0.6)",
        }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-muted/10">
          <div className="flex items-center gap-2.5">
            <GitCompare className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Element Comparison
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Linked isotopes toggle */}
            <button
              type="button"
              onClick={() => setLinkedIsotopes((v) => !v)}
              data-ocid="comparison.link_isotopes_toggle"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                linkedIsotopes
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-muted/20 border-border/40 text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={linkedIsotopes}
            >
              <Link2 className="w-3 h-3" />
              Link isotopes
            </button>

            {/* Copy link */}
            {elements.length >= 2 && (
              <button
                type="button"
                onClick={copyLink}
                data-ocid="comparison.copy_link_button"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/40 bg-muted/20 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Copy link
              </button>
            )}

            {/* Add element */}
            {elements.length < 2 && (
              <AddElementSearch onAdd={addElement} excluded={excluded} />
            )}

            <button
              type="button"
              onClick={onClose}
              data-ocid="comparison.close_button"
              aria-label="Close comparison"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-5 space-y-5">
            {/* Element columns */}
            <div className="flex gap-4">
              {elements.length === 0 && (
                <div
                  className="flex-1 flex flex-col items-center justify-center py-16 text-center"
                  data-ocid="comparison.empty_state"
                >
                  <GitCompare className="w-10 h-10 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Search for elements above to start comparing
                  </p>
                </div>
              )}

              {el0 && (
                <AnimatePresence>
                  <motion.div
                    key={el0.z}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 min-w-0"
                  >
                    <ElementColumn
                      element={el0}
                      selectedNuclide={nuclideA}
                      onSelectNuclide={handleSelectNuclideA}
                      onRemove={() => removeElement(0)}
                      colIndex={0}
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Divider / add */}
              {elements.length === 1 && (
                <div className="flex flex-col items-center justify-start gap-2 pt-4">
                  <div className="h-px w-6 bg-border/40" />
                  <Plus className="w-4 h-4 text-muted-foreground/50" />
                  <div className="h-px w-6 bg-border/40" />
                </div>
              )}
              {elements.length === 2 && (
                <div className="flex items-center justify-center">
                  <div className="h-full w-px bg-border/30" />
                </div>
              )}

              {el1 && (
                <AnimatePresence>
                  <motion.div
                    key={el1.z}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 min-w-0"
                  >
                    <ElementColumn
                      element={el1}
                      selectedNuclide={nuclideB}
                      onSelectNuclide={handleSelectNuclideB}
                      onRemove={() => removeElement(1)}
                      colIndex={1}
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Add button when zero or one element */}
              {elements.length < 2 && (
                <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border/40 rounded-xl py-8 text-center">
                  <p className="text-xs text-muted-foreground">
                    {elements.length === 0 ? "First element" : "Second element"}
                  </p>
                  <AddElementSearch onAdd={addElement} excluded={excluded} />
                </div>
              )}
            </div>

            {/* Comparison chart */}
            {elements.length === 2 && (
              <>
                <Separator />
                <ComparisonChart elements={elements} />
                <Separator />
                <DeltaSection deltas={deltas} />
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
