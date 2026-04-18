import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { type DecayMode, type Nuclide, nuclides } from "@/data/nuclides";
import { Link } from "@tanstack/react-router";
import Fuse from "fuse.js";
import {
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Search,
  X,
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

// ─── decay mode colours (match NuclideChart palette) ──────────────────────────
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

const PAGE_SIZE = 25;

const fuseInstance = new Fuse(nuclides, {
  keys: ["symbol", "name", "decayModes"],
  threshold: 0.3,
  includeScore: true,
});

function DecayBadge({ mode }: { mode: DecayMode }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${DECAY_COLORS[mode] ?? DECAY_COLORS.other}`}
    >
      {mode}
    </span>
  );
}

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
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            {nuclide.symbol}
          </h2>
          <p className="text-sm text-muted-foreground">{nuclide.name}</p>
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
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {(
            [
              ["Proton Number (Z)", nuclide.Z],
              ["Neutron Number (N)", nuclide.N],
              ["Mass Number (A)", nuclide.A],
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
                "Binding Energy / Nucleon (MeV)",
                nuclide.bindingEnergyPerNucleon_MeV != null
                  ? nuclide.bindingEnergyPerNucleon_MeV.toFixed(4)
                  : "N/A",
              ],
              [
                "Natural Abundance (%)",
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

export default function DataExplorer() {
  const [query, setQuery] = useState("");
  const [decayFilter, setDecayFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("A");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Nuclide | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const filtered = useMemo(() => {
    let base = query.trim()
      ? fuseInstance.search(query).map((r) => r.item)
      : [...nuclides];

    if (decayFilter !== "All") {
      const key = decayFilter.toLowerCase() as DecayMode;
      base = base.filter((n) =>
        key === "stable"
          ? n.decayModes.includes("stable")
          : n.decayModes.includes(key),
      );
    }
    if (sizeFilter === "Light") base = base.filter((n) => n.A < 50);
    else if (sizeFilter === "Medium")
      base = base.filter((n) => n.A >= 50 && n.A <= 100);
    else if (sizeFilter === "Heavy") base = base.filter((n) => n.A > 100);

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
  }, [query, decayFilter, sizeFilter, sortKey, sortDir]);

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

  // Decay mode histogram data
  const histData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const n of filtered) {
      for (const m of n.decayModes) {
        counts[m] = (counts[m] ?? 0) + 1;
      }
    }
    return Object.entries(counts).map(([mode, count]) => ({ mode, count }));
  }, [filtered]);

  // CSV export
  const handleExport = () => {
    const header =
      "Symbol,Name,Z,N,A,HalfLife,DecayModes,BindingEnergy_MeV,Abundance\n";
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Nuclear Data Explorer"
        subtitle="Search, filter, and explore data on 200+ nuclides — from stable isotopes to radioactive species. Click any row for detailed properties."
        audienceLevel="intermediate"
        readTimeMin={5}
      />

      {/* Histogram */}
      <SectionCard className="mb-6" data-ocid="data-explorer.histogram.card">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
          Decay Mode Distribution ({filtered.length} nuclides shown)
        </p>
        <ResponsiveContainer width="100%" height={100}>
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

      {/* Controls */}
      <SectionCard className="mb-4" data-ocid="data-explorer.controls.card">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="relative flex-1 min-w-48">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search symbol, name, decay mode…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Search nuclides"
              data-ocid="data-explorer.search_input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={decayFilter}
              onChange={(e) => {
                setDecayFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by decay mode"
              data-ocid="data-explorer.decay_filter.select"
            >
              {[
                "All",
                "Stable",
                "Alpha",
                "Beta-",
                "Beta+",
                "Gamma",
                "Other",
              ].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <select
              value={sizeFilter}
              onChange={(e) => {
                setSizeFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by mass number range"
              data-ocid="data-explorer.size_filter.select"
            >
              {(
                [
                  "All",
                  "Light (A<50)",
                  "Medium (50–100)",
                  "Heavy (A>100)",
                ] as const
              ).map((v, i) => (
                <option key={v} value={["All", "Light", "Medium", "Heavy"][i]}>
                  {v}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="data-explorer.export_button"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>
      </SectionCard>

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
                    ["Abundance (%)", "abundance"],
                  ] as [string, SortKey | null][]
                ).map(([label, key]) => (
                  <th
                    key={label}
                    scope="col"
                    className="px-4 py-3 text-left font-semibold text-muted-foreground whitespace-nowrap"
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
                    colSpan={9}
                    className="py-12 text-center text-muted-foreground"
                    data-ocid="data-explorer.table.empty_state"
                  >
                    No nuclides match your search criteria.
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
                    <td className="px-4 py-2.5 font-mono font-bold text-primary">
                      {n.symbol}
                    </td>
                    <td className="px-4 py-2.5 text-foreground max-w-[180px] truncate">
                      {n.name}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-right pr-6">
                      {n.Z}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-right pr-6">
                      {n.N}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-right pr-6 font-semibold">
                      {n.A}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">
                      {n.halfLifeStr}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {n.decayModes.map((m) => (
                          <DecayBadge key={m} mode={m} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-right pr-6">
                      {n.bindingEnergyPerNucleon_MeV != null
                        ? n.bindingEnergyPerNucleon_MeV.toFixed(3)
                        : "—"}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-right pr-6">
                      {n.abundance != null ? n.abundance.toFixed(3) : "—"}
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
              {filtered.length}
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
            <span className="text-sm text-muted-foreground min-w-[80px] text-center">
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
