import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { type DecayMode, type Nuclide, nuclides } from "@/data/nuclides";
import { useAutoRefreshIsotopes } from "@/hooks/useAutoRefreshIsotopes";
import { useIsotopeStore } from "@/store/isotopeStore";
import { Link } from "@tanstack/react-router";
import Fuse from "fuse.js";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Decay mode colours ────────────────────────────────────────────────────────
const DECAY_COLORS: Record<string, string> = {
  stable: "bg-emerald-600/80 text-emerald-100",
  alpha: "bg-yellow-600/80 text-yellow-100",
  "beta-": "bg-blue-600/80 text-blue-100",
  "beta+": "bg-purple-600/80 text-purple-100",
  gamma: "bg-pink-600/80 text-pink-100",
  other: "bg-muted text-muted-foreground",
};
const CHART_COLORS: Record<string, string> = {
  stable: "#059669",
  alpha: "#ca8a04",
  "beta-": "#2563eb",
  "beta+": "#7c3aed",
  gamma: "#db2777",
  other: "#6b7280",
};

const ALL_DECAY_MODES: DecayMode[] = [
  "stable",
  "alpha",
  "beta-",
  "beta+",
  "gamma",
];

type SortKey =
  | "symbol"
  | "name"
  | "Z"
  | "N"
  | "A"
  | "halfLifeStr"
  | "bindingEnergyPerNucleon_MeV"
  | "abundance";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 30;

const fuseInstance = new Fuse(nuclides, {
  keys: ["symbol", "name", "decayModes"],
  threshold: 0.3,
  includeScore: true,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function formatAbsoluteUTC(isoString: string): string {
  return new Date(isoString).toUTCString();
}

function formatLocalTimestamp(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatUTCTimestamp(ts: number): string {
  return new Date(ts).toUTCString();
}

/** Returns number of days since the ISO date string */
function daysSince(isoString: string): number {
  return Math.floor(
    (Date.now() - new Date(isoString).getTime()) / (1000 * 60 * 60 * 24),
  );
}

function FreshnessDot({ lastUpdated }: { lastUpdated?: string }) {
  if (!lastUpdated) return <span className="text-muted-foreground/40">·</span>;
  const days = daysSince(lastUpdated);
  if (days <= 7)
    return (
      <span
        title={`Fresh — updated ${formatRelativeTime(lastUpdated)}`}
        className="inline-block h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0"
        aria-label="Data fresh (< 7 days)"
      />
    );
  if (days <= 30)
    return (
      <span
        title={`Updated ${formatRelativeTime(lastUpdated)}`}
        className="inline-block h-2 w-2 rounded-full bg-amber-400 flex-shrink-0"
        aria-label="Data recent (7–30 days)"
      />
    );
  return (
    <span
      title={`Older data — updated ${formatRelativeTime(lastUpdated)}`}
      className="inline-block h-2 w-2 rounded-full bg-muted-foreground/40 flex-shrink-0"
      aria-label="Data older (> 30 days)"
    />
  );
}

// ─── Live Data Status Bar ─────────────────────────────────────────────────────
function LiveDataBar({
  onRefresh,
  isFetching,
}: { onRefresh: () => void; isFetching: boolean }) {
  const { fetchStatus, errorMessage, lastFetchTimestamp, cachedCount } =
    useIsotopeStore();

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 px-4 py-2.5 mb-5"
      data-ocid="data-explorer.live_data_bar"
    >
      <div className="flex items-center gap-3 flex-wrap">
        {fetchStatus === "success" && (
          <span
            className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400"
            data-ocid="data-explorer.live_badge"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Data
          </span>
        )}
        {fetchStatus === "loading" && (
          <span
            className="flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-400 animate-pulse"
            data-ocid="data-explorer.syncing_badge"
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Syncing…
          </span>
        )}
        {fetchStatus === "error" && (
          <span
            className="flex items-center gap-1.5 rounded-full bg-destructive/15 border border-destructive/30 px-2.5 py-1 text-xs font-semibold text-destructive cursor-help"
            title={errorMessage ?? "Live data unavailable"}
            data-ocid="data-explorer.error_badge"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            Cached Data
          </span>
        )}
        {fetchStatus === "idle" && (
          <span className="flex items-center gap-1.5 rounded-full bg-muted/60 border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            Initializing…
          </span>
        )}

        {cachedCount > 0 && (
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">
              {cachedCount.toLocaleString()}
            </span>{" "}
            isotopes cached
          </span>
        )}

        {lastFetchTimestamp && (
          <span
            className="text-xs text-muted-foreground"
            title={formatUTCTimestamp(lastFetchTimestamp)}
          >
            Last sync:{" "}
            <span className="text-foreground">
              {formatLocalTimestamp(lastFetchTimestamp)}
            </span>
          </span>
        )}

        {/* Freshness legend */}
        <span className="hidden md:flex items-center gap-3 text-xs text-muted-foreground ml-2 border-l border-border pl-3">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            &lt;7d
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            7–30d
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            &gt;30d
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isFetching}
        className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="data-explorer.refresh_button"
        aria-label="Refresh isotope data from live source"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
        />
        {isFetching ? "Refreshing…" : "Refresh from IAEA"}
      </button>
    </div>
  );
}

// ─── Decay Badge ──────────────────────────────────────────────────────────────
function DecayBadge({ mode }: { mode: DecayMode }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${DECAY_COLORS[mode] ?? DECAY_COLORS.other}`}
    >
      {mode}
    </span>
  );
}

// ─── Nuclide Detail Panel ─────────────────────────────────────────────────────
function NuclideDetail({
  nuclide,
  onClose,
}: { nuclide: Nuclide; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card shadow-2xl flex flex-col"
      aria-label={`Detail panel for ${nuclide.symbol}`}
      data-ocid="data-explorer.nuclide_detail.dialog"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <span className="font-display text-lg font-bold text-primary">
              {nuclide.symbol.replace(/\d/g, "")}
            </span>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {nuclide.symbol}
            </h2>
            <p className="text-sm text-muted-foreground">{nuclide.name}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail panel"
          className="rounded-lg p-2 hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="data-explorer.nuclide_detail.close_button"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Z", value: nuclide.Z },
            { label: "N", value: nuclide.N },
            { label: "A", value: nuclide.A },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-muted/20 p-3 text-center"
            >
              <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
              <p className="font-mono text-xl font-bold text-primary">
                {value}
              </p>
            </div>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {(
            [
              ["Half-life", nuclide.halfLifeStr],
              [
                "Q-value (MeV)",
                nuclide.Qvalue_MeV != null
                  ? nuclide.Qvalue_MeV.toFixed(4)
                  : "N/A",
              ],
              [
                "Mass Excess (keV)",
                nuclide.massExcess_keV != null
                  ? nuclide.massExcess_keV.toFixed(2)
                  : "N/A",
              ],
              [
                "Atomic Mass (AMU)",
                nuclide.atomicMass_AMU != null
                  ? nuclide.atomicMass_AMU.toFixed(9)
                  : "N/A",
              ],
              [
                "B.E./Nucleon (MeV)",
                nuclide.bindingEnergyPerNucleon_MeV != null
                  ? nuclide.bindingEnergyPerNucleon_MeV.toFixed(4)
                  : "N/A",
              ],
              [
                "Natural Abund. (%)",
                nuclide.abundance != null ? nuclide.abundance.toFixed(4) : "—",
              ],
            ] as [string, string | number][]
          ).map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-muted-foreground font-medium">{label}</dt>
              <dd className="text-foreground font-mono tabular-nums">
                {String(value)}
              </dd>
            </div>
          ))}
        </dl>

        {nuclide.branchingRatios && nuclide.branchingRatios.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
              Branching Ratios
            </p>
            <div className="flex flex-wrap gap-1.5">
              {nuclide.branchingRatios.map((ratio) => (
                <span
                  key={ratio}
                  className="inline-block rounded-full bg-primary/15 border border-primary/30 px-2.5 py-1 text-xs font-mono text-primary"
                >
                  {ratio.toFixed(1)}%
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">
            Decay Modes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {nuclide.decayModes.map((m) => (
              <DecayBadge key={m} mode={m} />
            ))}
          </div>
        </div>

        {nuclide.lastUpdated && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FreshnessDot lastUpdated={nuclide.lastUpdated} />
            <span title={formatAbsoluteUTC(nuclide.lastUpdated)}>
              NNDC updated:{" "}
              <span className="text-foreground">
                {formatRelativeTime(nuclide.lastUpdated)}
              </span>
            </span>
          </div>
        )}

        <Link
          to="/visualizations/nuclide-chart"
          className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="data-explorer.nuclide_detail.chart_link"
        >
          <ExternalLink className="h-4 w-4" />
          View in Chart of Nuclides
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────
interface FilterState {
  query: string;
  decayModes: Set<DecayMode>;
  zMin: number;
  zMax: number;
  aMin: number;
  aMax: number;
}

const Z_MAX = 120;
const A_MAX = 300;

function FilterPanel({
  filters,
  onFiltersChange,
}: {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}) {
  const toggle = (mode: DecayMode) => {
    const next = new Set(filters.decayModes);
    if (next.has(mode)) next.delete(mode);
    else next.add(mode);
    onFiltersChange({ ...filters, decayModes: next });
  };

  const allSelected = filters.decayModes.size === 0;

  return (
    <SectionCard className="mb-4" data-ocid="data-explorer.filter_panel">
      <div className="flex flex-wrap gap-5 items-start">
        {/* Search */}
        <div className="relative flex-1 min-w-52">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search symbol, name, decay mode…"
            value={filters.query}
            onChange={(e) =>
              onFiltersChange({ ...filters, query: e.target.value })
            }
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search nuclides"
            data-ocid="data-explorer.search_input"
          />
        </div>

        {/* Decay mode checkboxes */}
        <fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
          <legend className="text-xs text-muted-foreground font-semibold uppercase tracking-widest w-full mb-1.5 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Decay Mode
          </legend>
          <button
            type="button"
            onClick={() =>
              onFiltersChange({ ...filters, decayModes: new Set() })
            }
            aria-pressed={allSelected}
            className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${allSelected ? "bg-primary/15 text-primary border-primary/40" : "border-border text-muted-foreground hover:border-primary/30"}`}
            data-ocid="data-explorer.decay_filter.all"
          >
            All
          </button>
          {ALL_DECAY_MODES.map((mode) => {
            const active = filters.decayModes.has(mode);
            return (
              <button
                key={mode}
                type="button"
                onClick={() => toggle(mode)}
                aria-pressed={active}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors uppercase ${
                  active
                    ? `${DECAY_COLORS[mode]} border-transparent`
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
                data-ocid={`data-explorer.decay_filter.${mode}`}
              >
                {mode}
              </button>
            );
          })}
        </fieldset>

        {/* Z range */}
        <div className="min-w-48 flex-1">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">
            Z range:{" "}
            <span className="text-foreground font-mono">
              {filters.zMin}–{filters.zMax}
            </span>
          </p>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={0}
              max={Z_MAX}
              value={filters.zMin}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  zMin: Math.min(Number(e.target.value), filters.zMax),
                })
              }
              className="flex-1 accent-primary"
              aria-label="Minimum proton number Z"
              data-ocid="data-explorer.z_min.toggle"
            />
            <input
              type="range"
              min={0}
              max={Z_MAX}
              value={filters.zMax}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  zMax: Math.max(Number(e.target.value), filters.zMin),
                })
              }
              className="flex-1 accent-primary"
              aria-label="Maximum proton number Z"
              data-ocid="data-explorer.z_max.toggle"
            />
          </div>
        </div>

        {/* A range */}
        <div className="min-w-48 flex-1">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">
            A range:{" "}
            <span className="text-foreground font-mono">
              {filters.aMin}–{filters.aMax}
            </span>
          </p>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={0}
              max={A_MAX}
              value={filters.aMin}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  aMin: Math.min(Number(e.target.value), filters.aMax),
                })
              }
              className="flex-1 accent-primary"
              aria-label="Minimum mass number A"
              data-ocid="data-explorer.a_min.toggle"
            />
            <input
              type="range"
              min={0}
              max={A_MAX}
              value={filters.aMax}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  aMax: Math.max(Number(e.target.value), filters.aMin),
                })
              }
              className="flex-1 accent-primary"
              aria-label="Maximum mass number A"
              data-ocid="data-explorer.a_max.toggle"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DataExplorer() {
  const { manualRefresh, isFetching } = useAutoRefreshIsotopes();

  const [filters, setFilters] = useState<FilterState>({
    query: "",
    decayModes: new Set(),
    zMin: 0,
    zMax: Z_MAX,
    aMin: 0,
    aMax: A_MAX,
  });
  const [sortKey, setSortKey] = useState<SortKey>("A");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Nuclide | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const filtered = useMemo(() => {
    let base = filters.query.trim()
      ? fuseInstance.search(filters.query).map((r) => r.item)
      : [...nuclides];

    if (filters.decayModes.size > 0) {
      base = base.filter(
        (n) =>
          [...filters.decayModes].every((m) => n.decayModes.includes(m)) ||
          [...filters.decayModes].some((m) => n.decayModes.includes(m)),
      );
      // Actually: show any nuclide that has at least one of the selected decay modes
      base = [...nuclides].filter((n) => {
        if (filters.query.trim()) {
          const fuseResults = fuseInstance
            .search(filters.query)
            .map((r) => r.item);
          if (!fuseResults.includes(n)) return false;
        }
        return [...filters.decayModes].some((m) => n.decayModes.includes(m));
      });
    }

    // Z range
    base = base.filter((n) => n.Z >= filters.zMin && n.Z <= filters.zMax);
    // A range
    base = base.filter((n) => n.A >= filters.aMin && n.A <= filters.aMax);

    base.sort((a, b) => {
      const av =
        a[sortKey] ??
        (sortKey === "bindingEnergyPerNucleon_MeV"
          ? Number.NEGATIVE_INFINITY
          : "");
      const bv =
        b[sortKey] ??
        (sortKey === "bindingEnergyPerNucleon_MeV"
          ? Number.NEGATIVE_INFINITY
          : "");
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });

    return base;
  }, [filters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey((prev) => {
      if (prev === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else setSortDir("asc");
      return key;
    });
    setPage(1);
  }, []);

  // Reset page when filters change
  const handleFiltersChange = useCallback((f: FilterState) => {
    setFilters(f);
    setPage(1);
  }, []);

  const histData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const n of filtered) {
      for (const m of n.decayModes) {
        counts[m] = (counts[m] ?? 0) + 1;
      }
    }
    return Object.entries(counts).map(([mode, count]) => ({ mode, count }));
  }, [filtered]);

  const handleExport = () => {
    const header =
      "Symbol,Name,Z,N,A,HalfLife,DecayModes,BindingEnergy_MeV,Abundance,AtomicMass_AMU,MassExcess_keV,QValue_MeV,LastUpdated\n";
    const rows = filtered
      .map((n) =>
        [
          n.symbol,
          `"${n.name}"`,
          n.Z,
          n.N,
          n.A,
          `"${n.halfLifeStr}"`,
          `"${n.decayModes.join("|")}"`,
          n.bindingEnergyPerNucleon_MeV ?? "",
          n.abundance ?? "",
          n.atomicMass_AMU ?? "",
          n.massExcess_keV ?? "",
          n.Qvalue_MeV ?? "",
          n.lastUpdated ?? "",
        ].join(","),
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nuclides_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3.5 w-3.5" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5" />
    );
  }

  const isFiltered =
    filters.query.trim() !== "" ||
    filters.decayModes.size > 0 ||
    filters.zMin > 0 ||
    filters.zMax < Z_MAX ||
    filters.aMin > 0 ||
    filters.aMax < A_MAX;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Nuclear Data Explorer"
        subtitle="Search, filter, and explore data on 720+ nuclides — from stable isotopes to radioactive species. Filter by decay mode, Z range, and A range. Click any row for detailed properties."
        audienceLevel="intermediate"
        readTimeMin={5}
      />

      <LiveDataBar onRefresh={manualRefresh} isFetching={isFetching} />

      {/* Histogram */}
      <SectionCard className="mb-6" data-ocid="data-explorer.histogram.card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Decay Mode Distribution ({filtered.length.toLocaleString()} nuclides
            shown)
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() =>
                handleFiltersChange({
                  query: "",
                  decayModes: new Set(),
                  zMin: 0,
                  zMax: Z_MAX,
                  aMin: 0,
                  aMax: A_MAX,
                })
              }
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              data-ocid="data-explorer.clear_filters_button"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>
        <ResponsiveContainer width="100%" height={110}>
          <BarChart
            data={histData}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="mode"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {histData.map((d) => (
                <Cell
                  key={d.mode}
                  fill={CHART_COLORS[d.mode] ?? CHART_COLORS.other}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Filter Panel */}
      <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Table controls */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {filtered.length.toLocaleString()}
          </span>{" "}
          nuclides
          {isFiltered && <span> matching filters</span>}
        </p>
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="data-explorer.export_button"
        >
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <SectionCard
        className="overflow-hidden p-0"
        data-ocid="data-explorer.table_card"
      >
        <div className="overflow-x-auto">
          <table
            ref={tableRef}
            className="w-full text-sm"
            aria-label="Nuclide data table"
          >
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left font-semibold text-muted-foreground w-8"
                >
                  <span className="sr-only">Freshness</span>
                </th>
                {(
                  [
                    ["Symbol", "symbol"],
                    ["Name", "name"],
                    ["Z", "Z"],
                    ["N", "N"],
                    ["A", "A"],
                    ["Half-life", "halfLifeStr"],
                    ["Decay Mode(s)", null],
                    ["B.E. (MeV/u)", "bindingEnergyPerNucleon_MeV"],
                    ["Abund. (%)", "abundance"],
                    ["Mass (AMU)", null],
                    ["Q (MeV)", null],
                    ["Branch. (%)", null],
                  ] as [string, SortKey | null][]
                ).map(([label, key]) => (
                  <th
                    key={label}
                    scope="col"
                    className="px-3 py-3 text-left font-semibold text-muted-foreground whitespace-nowrap"
                  >
                    {key ? (
                      <button
                        type="button"
                        onClick={() => handleSort(key)}
                        className="flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                        aria-sort={
                          sortKey === key
                            ? sortDir === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                        data-ocid={`data-explorer.sort_${key}.toggle`}
                      >
                        {label} <SortIcon k={key} />
                      </button>
                    ) : (
                      label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="py-16 text-center"
                    data-ocid="data-explorer.table.empty_state"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Zap className="h-8 w-8 text-muted-foreground/30" />
                      <p className="text-muted-foreground">
                        No nuclides match your filters.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleFiltersChange({
                            query: "",
                            decayModes: new Set(),
                            zMin: 0,
                            zMax: Z_MAX,
                            aMin: 0,
                            aMax: A_MAX,
                          })
                        }
                        className="text-xs text-primary hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((n, i) => (
                  <tr
                    key={n.symbol}
                    tabIndex={0}
                    onClick={() => setSelected(n)}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(n)}
                    className="border-b border-border/40 hover:bg-muted/20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    aria-label={`${n.symbol} — ${n.name}, click for details`}
                    data-ocid={`data-explorer.table.item.${i + 1}`}
                  >
                    <td className="px-3 py-2.5">
                      <FreshnessDot lastUpdated={n.lastUpdated} />
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold text-primary">
                      {n.symbol}
                    </td>
                    <td className="px-3 py-2.5 text-foreground max-w-[140px] truncate">
                      {n.name}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4">
                      {n.Z}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4">
                      {n.N}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4 font-semibold">
                      {n.A}
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                      {n.halfLifeStr}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {n.decayModes.map((m) => (
                          <DecayBadge key={m} mode={m} />
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4">
                      {n.bindingEnergyPerNucleon_MeV != null
                        ? n.bindingEnergyPerNucleon_MeV.toFixed(3)
                        : "—"}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4">
                      {n.abundance != null ? n.abundance.toFixed(3) : "—"}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4 font-mono text-xs">
                      {n.atomicMass_AMU != null
                        ? n.atomicMass_AMU.toFixed(6)
                        : "—"}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-right pr-4 text-xs text-muted-foreground">
                      {n.Qvalue_MeV != null ? n.Qvalue_MeV.toFixed(3) : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">
                      {n.branchingRatios && n.branchingRatios.length > 0
                        ? n.branchingRatios
                            .map((r) => `${r.toFixed(1)}%`)
                            .join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
            <span className="font-semibold text-foreground">
              {filtered.length.toLocaleString()}
            </span>{" "}
            nuclides
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="data-explorer.pagination_prev"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground min-w-[90px] text-center">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="data-explorer.pagination_next"
            >
              Next
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              aria-hidden="true"
            />
            <NuclideDetail
              nuclide={selected}
              onClose={() => setSelected(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
