import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { type Nuclide, nuclides } from "@/data/nuclides";
import Fuse from "fuse.js";
import { Check, Plus, RotateCcw, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const MAX_SLOTS = 3;
const SLOT_COLORS = ["#22d3ee", "#a855f7", "#f59e0b"]; // cyan, purple, amber

const fuse = new Fuse(nuclides, {
  keys: ["symbol", "name"],
  threshold: 0.35,
  includeScore: true,
});

const SUGGESTIONS = [
  { label: "Uranium isotopes", symbols: ["U-235", "U-238"] },
  { label: "Hydrogen isotopes", symbols: ["H-1", "H-2", "H-3"] },
  { label: "Carbon isotopes", symbols: ["C-12", "C-13", "C-14"] },
];

type PropKey =
  | "Z"
  | "N"
  | "A"
  | "bindingEnergyPerNucleon_MeV"
  | "Qvalue_MeV"
  | "massExcess_keV"
  | "halfLifeSeconds";

const PROP_LABELS: { key: PropKey; label: string; unit: string }[] = [
  { key: "Z", label: "Proton Number (Z)", unit: "" },
  { key: "N", label: "Neutron Number (N)", unit: "" },
  { key: "A", label: "Mass Number (A)", unit: "" },
  {
    key: "bindingEnergyPerNucleon_MeV",
    label: "Binding Energy/Nucleon",
    unit: "MeV",
  },
  { key: "Qvalue_MeV", label: "Q-value", unit: "MeV" },
  { key: "massExcess_keV", label: "Mass Excess", unit: "keV" },
  { key: "halfLifeSeconds", label: "Half-life", unit: "s" },
];

const RADAR_DIMS = [
  "Z",
  "N",
  "A",
  "Binding Energy",
  "Half-life (log)",
] as const;
type RadarDim = (typeof RADAR_DIMS)[number];

function normalizeForRadar(nuclide: Nuclide): Record<RadarDim, number> {
  const maxVals = {
    Z: 118,
    N: 177,
    A: 294,
    be: 8.8,
    hl: Math.log10(4.4e17 + 1),
  };
  const hl =
    nuclide.halfLifeSeconds != null
      ? Math.log10(nuclide.halfLifeSeconds + 1) / maxVals.hl
      : 0;
  return {
    Z: Math.round((nuclide.Z / maxVals.Z) * 100),
    N: Math.round((nuclide.N / maxVals.N) * 100),
    A: Math.round((nuclide.A / maxVals.A) * 100),
    "Binding Energy":
      nuclide.bindingEnergyPerNucleon_MeV != null
        ? Math.round((nuclide.bindingEnergyPerNucleon_MeV / maxVals.be) * 100)
        : 0,
    "Half-life (log)": Math.round(hl * 100),
  };
}

function AutocompleteInput({
  onSelect,
  placeholder,
}: { onSelect: (n: Nuclide) => void; placeholder: string }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(
    () =>
      q.trim().length > 0
        ? fuse
            .search(q)
            .slice(0, 8)
            .map((r) => r.item)
        : [],
    [q],
  );

  return (
    <div className="relative">
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search for a nuclide"
        data-ocid="isotope-comparison.search_input"
      />
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-30 mt-1 w-full rounded-lg border border-border bg-popover shadow-lg overflow-hidden"
          >
            <div>
              {results.map((n) => (
                <button
                  key={n.symbol}
                  type="button"
                  onMouseDown={() => {
                    onSelect(n);
                    setQ("");
                    setOpen(false);
                  }}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-muted/40 flex items-center gap-3 transition-colors"
                >
                  <span className="font-mono font-bold text-primary w-14">
                    {n.symbol}
                  </span>
                  <span className="text-muted-foreground truncate">
                    {n.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PropertyRow({
  prop,
  nuclideList,
}: {
  prop: { key: PropKey; label: string; unit: string };
  nuclideList: (Nuclide | null)[];
}) {
  const values = nuclideList.map((n) => (n != null ? n[prop.key] : null));
  const nums = values.filter((v): v is number => typeof v === "number");
  const maxV = nums.length > 0 ? Math.max(...nums) : null;
  const minV = nums.length > 0 ? Math.min(...nums) : null;

  return (
    <tr className="border-b border-border/40 last:border-0">
      <td className="px-4 py-2.5 text-sm text-muted-foreground font-medium whitespace-nowrap">
        {prop.label}
        {prop.unit && (
          <span className="ml-1 text-xs opacity-60">({prop.unit})</span>
        )}
      </td>
      {nuclideList.map((n, i) => {
        const key = `slot-${i}`;
        if (!n)
          return (
            <td
              key={key}
              className="px-4 py-2.5 text-sm text-muted-foreground text-center"
            >
              —
            </td>
          );
        const raw = n[prop.key];
        const val = raw != null ? (typeof raw === "number" ? raw : null) : null;
        const isMax = val != null && val === maxV && nums.length > 1;
        const isMin =
          val != null && val === minV && val !== maxV && nums.length > 1;
        return (
          <td
            key={key}
            className="px-4 py-2.5 text-sm text-center tabular-nums"
          >
            <span
              className={`inline-flex items-center gap-1 font-mono rounded px-1.5 py-0.5 ${isMax ? "bg-emerald-950/60 text-emerald-300" : isMin ? "bg-rose-950/60 text-rose-300" : "text-foreground"}`}
            >
              {val != null
                ? prop.key === "halfLifeSeconds"
                  ? val.toExponential(2)
                  : typeof raw === "number"
                    ? raw.toFixed(Math.abs(raw) < 0.01 && raw !== 0 ? 4 : 3)
                    : String(raw)
                : raw != null
                  ? String(raw)
                  : "—"}
              {isMax && (
                <span title="Highest value" className="text-xs">
                  ▲
                </span>
              )}
              {isMin && (
                <span title="Lowest value" className="text-xs">
                  ▼
                </span>
              )}
            </span>
          </td>
        );
      })}
    </tr>
  );
}

const SLOT_IDS = ["slot-a", "slot-b", "slot-c"] as const;
type SlotId = (typeof SLOT_IDS)[number];
interface Slot {
  id: SlotId;
  nuclide: Nuclide | null;
}

export default function IsotopeComparison() {
  const [slots, setSlots] = useState<Slot[]>([{ id: "slot-a", nuclide: null }]);
  const [copied, setCopied] = useState(false);

  const addSlot = () => {
    if (slots.length < MAX_SLOTS) {
      const nextId = SLOT_IDS[slots.length];
      setSlots((s) => [...s, { id: nextId, nuclide: null }]);
    }
  };
  const removeSlot = (id: SlotId) =>
    setSlots((s) => s.filter((sl) => sl.id !== id));
  const setSlotNuclide = (id: SlotId, n: Nuclide) =>
    setSlots((s) => s.map((sl) => (sl.id === id ? { ...sl, nuclide: n } : sl)));
  const clearAll = () => setSlots([{ id: "slot-a", nuclide: null }]);

  const filled = slots
    .map((sl) => sl.nuclide)
    .filter((n): n is Nuclide => n !== null);

  const radarData = useMemo(() => {
    return RADAR_DIMS.map((dim) => {
      const entry: Record<string, string | number> = { subject: dim };
      for (const n of filled) {
        const norm = normalizeForRadar(n);
        entry[n.symbol] = norm[dim] ?? 0;
      }
      return entry;
    });
  }, [filled]);

  const handleShare = () => {
    const symbols = filled.map((n) => n.symbol.replace("-", "")).join(",");
    const url = `${window.location.origin}${window.location.pathname}?compare=${symbols}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const applySuggestion = (symbols: string[]) => {
    const found = symbols.slice(0, MAX_SLOTS).map(
      (s, i) =>
        ({
          id: SLOT_IDS[i],
          nuclide: nuclides.find((n) => n.symbol === s) ?? null,
        }) as Slot,
    );
    setSlots(found);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Isotope Comparison Tool"
        subtitle="Compare up to 3 nuclides side-by-side — examine binding energies, decay modes, half-lives, and nuclear properties at a glance."
        audienceLevel="advanced"
        readTimeMin={3}
      />

      {/* Suggestions */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted-foreground">Try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => applySuggestion(s.symbols)}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors"
            data-ocid={`isotope-comparison.suggestion.${s.symbols.join("-").toLowerCase()}.button`}
          >
            {s.label}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="isotope-comparison.clear_button"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          {filled.length > 0 && (
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="isotope-comparison.share_button"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Share2 className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied!" : "Share URL"}
            </button>
          )}
        </div>
      </div>

      {/* Slot inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {slots.map((sl, i) => {
          const n = sl.nuclide;
          const borderStyle = n ? { borderColor: `${SLOT_COLORS[i]}66` } : {};
          return (
            <div
              key={sl.id}
              className="rounded-xl border border-border bg-card p-6 shadow-card relative"
              style={borderStyle as React.CSSProperties}
              data-ocid={`isotope-comparison.slot.${i + 1}.card`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: SLOT_COLORS[i] }}
                >
                  Nuclide {i + 1}
                </span>
                {slots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(sl.id)}
                    className="rounded p-1 hover:bg-muted/40 transition-colors"
                    aria-label={`Remove slot ${i + 1}`}
                    data-ocid={`isotope-comparison.slot.${i + 1}.remove_button`}
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>
              {n ? (
                <div className="space-y-1">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {n.symbol}
                  </p>
                  <p className="text-sm text-muted-foreground">{n.name}</p>
                  <p className="text-xs text-muted-foreground">{`A=${n.A}, Z=${n.Z}, N=${n.N} · ${n.halfLifeStr}`}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setSlots((s) =>
                        s.map((v) =>
                          v.id === sl.id ? { ...v, nuclide: null } : v,
                        ),
                      )
                    }
                    className="mt-2 text-xs text-primary hover:underline"
                    data-ocid={`isotope-comparison.slot.${i + 1}.change_button`}
                  >
                    Change nuclide
                  </button>
                </div>
              ) : (
                <AutocompleteInput
                  placeholder="Search (e.g. U-235, Carbon)"
                  onSelect={(sel) => setSlotNuclide(sl.id, sel)}
                />
              )}
            </div>
          );
        })}

        {slots.length < MAX_SLOTS && (
          <motion.button
            type="button"
            onClick={addSlot}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 py-8 text-muted-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Add another nuclide for comparison"
            data-ocid="isotope-comparison.add_slot.button"
          >
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Add Nuclide</span>
          </motion.button>
        )}
      </div>

      {/* Empty state */}
      {filled.length === 0 && (
        <SectionCard
          className="text-center py-12"
          data-ocid="isotope-comparison.empty_state"
        >
          <p className="text-muted-foreground text-lg mb-2">
            Select nuclides above to begin comparing
          </p>
          <p className="text-sm text-muted-foreground">
            Try the suggestions or search by symbol (e.g. "U-235", "Fe-56")
          </p>
        </SectionCard>
      )}

      {/* Radar chart */}
      {filled.length > 1 && (
        <SectionCard className="mb-6" data-ocid="isotope-comparison.radar_card">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Visual Comparison (normalized 0–100)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              {filled.map((n, i) => (
                <Radar
                  key={n.symbol}
                  name={n.symbol}
                  dataKey={n.symbol}
                  stroke={SLOT_COLORS[i]}
                  fill={SLOT_COLORS[i]}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </SectionCard>
      )}

      {/* Properties table */}
      {filled.length > 0 && (
        <SectionCard
          className="overflow-hidden p-0"
          data-ocid="isotope-comparison.properties_table"
        >
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Nuclide properties comparison"
            >
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left font-semibold text-muted-foreground"
                  >
                    Property
                  </th>
                  {slots.map((sl, i) => (
                    <th
                      key={sl.id}
                      scope="col"
                      className="px-4 py-3 text-center font-semibold"
                      style={{ color: SLOT_COLORS[i] }}
                    >
                      {sl.nuclide ? sl.nuclide.symbol : `Slot ${i + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Decay modes row */}
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2.5 text-sm text-muted-foreground font-medium">
                    Decay Mode(s)
                  </td>
                  {slots.map((sl) => {
                    const n = sl.nuclide;
                    return (
                      <td key={sl.id} className="px-4 py-2.5 text-center">
                        {n ? (
                          <div className="flex flex-wrap justify-center gap-1">
                            {n.decayModes.map((m) => (
                              <span
                                key={m}
                                className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase bg-muted text-muted-foreground"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
                {/* Half-life string */}
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2.5 text-sm text-muted-foreground font-medium">
                    Half-life
                  </td>
                  {slots.map((sl) => (
                    <td
                      key={sl.id}
                      className="px-4 py-2.5 text-center text-sm font-mono text-foreground"
                    >
                      {sl.nuclide ? sl.nuclide.halfLifeStr : "—"}
                    </td>
                  ))}
                </tr>
                {/* Abundance */}
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2.5 text-sm text-muted-foreground font-medium">
                    Abundance (%)
                  </td>
                  {slots.map((sl) => {
                    const n = sl.nuclide;
                    return (
                      <td
                        key={sl.id}
                        className="px-4 py-2.5 text-center text-sm font-mono tabular-nums text-foreground"
                      >
                        {n
                          ? n.abundance != null
                            ? n.abundance.toFixed(4)
                            : "—"
                          : "—"}
                      </td>
                    );
                  })}
                </tr>
                {PROP_LABELS.map((prop) => (
                  <PropertyRow
                    key={prop.key}
                    prop={prop}
                    nuclideList={slots.map((sl) => sl.nuclide)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-muted/10 border-t border-border text-xs text-muted-foreground">
            <span className="text-emerald-400 font-semibold">▲ Highest</span>{" "}
            value in row &nbsp;·&nbsp;
            <span className="text-rose-400 font-semibold">▼ Lowest</span> value
            in row
          </div>
        </SectionCard>
      )}
    </div>
  );
}
