import { r as reactExports, j as jsxRuntimeExports, h as AnimatePresence, m as motion, a as ChevronDown, X, L as Link } from "./index-jNE18aF1.js";
import { P as PageHeader } from "./PageHeader-DealqQgJ.js";
import { S as SectionCard } from "./SectionCard-CFwP6_86.js";
import { n as nuclides } from "./nuclides-CjJxlGKK.js";
import { F as Fuse } from "./fuse-COjfAQ4a.js";
import { R as ResponsiveContainer, T as Tooltip, B as Bar, C as Cell } from "./generateCategoricalChart-BOpz90-Y.js";
import { B as BarChart } from "./BarChart-B3fQ_sJG.js";
import { X as XAxis, Y as YAxis } from "./YAxis-Di3dNsfn.js";
import { S as Search } from "./search-BWXeYnpj.js";
import { D as Download } from "./download-BxphUvxc.js";
import { C as ChevronUp } from "./chevron-up-CmgwHteZ.js";
import { E as ExternalLink } from "./external-link-BA28ywWb.js";
import "./string-CugKFzKt.js";
const DECAY_COLORS = {
  stable: "bg-emerald-600/80 text-emerald-100",
  alpha: "bg-yellow-600/80 text-yellow-100",
  "beta-": "bg-blue-600/80 text-blue-100",
  "beta+": "bg-purple-600/80 text-purple-100",
  gamma: "bg-pink-600/80 text-pink-100",
  other: "bg-muted text-muted-foreground"
};
const CHART_COLORS = {
  stable: "#059669",
  alpha: "#ca8a04",
  "beta-": "#2563eb",
  "beta+": "#7c3aed",
  gamma: "#db2777",
  other: "#6b7280"
};
const PAGE_SIZE = 25;
const fuseInstance = new Fuse(nuclides, {
  keys: ["symbol", "name", "decayModes"],
  threshold: 0.3,
  includeScore: true
});
function DecayBadge({ mode }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${DECAY_COLORS[mode] ?? DECAY_COLORS.other}`,
      children: mode
    }
  );
}
function NuclideDetail({
  nuclide,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: { type: "spring", damping: 28, stiffness: 320 },
      className: "fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card shadow-2xl flex flex-col",
      "aria-label": `Detail panel for ${nuclide.symbol}`,
      "data-ocid": "data-explorer.nuclide_detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: nuclide.symbol }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: nuclide.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close detail panel",
              className: "rounded-lg p-2 hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "data-explorer.nuclide_detail.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 gap-x-4 gap-y-3 text-sm", children: [
            ["Proton Number (Z)", nuclide.Z],
            ["Neutron Number (N)", nuclide.N],
            ["Mass Number (A)", nuclide.A],
            ["Half-life", nuclide.halfLifeStr],
            [
              "Q-value (MeV)",
              nuclide.Qvalue_MeV != null ? nuclide.Qvalue_MeV.toFixed(4) : "N/A"
            ],
            [
              "Mass Excess (keV)",
              nuclide.massExcess_keV != null ? nuclide.massExcess_keV.toFixed(2) : "N/A"
            ],
            [
              "Binding Energy / Nucleon (MeV)",
              nuclide.bindingEnergyPerNucleon_MeV != null ? nuclide.bindingEnergyPerNucleon_MeV.toFixed(4) : "N/A"
            ],
            [
              "Natural Abundance (%)",
              nuclide.abundance != null ? nuclide.abundance.toFixed(4) : "—"
            ]
          ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground font-medium", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-mono tabular-nums", children: String(value) })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2", children: "Decay Modes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: nuclide.decayModes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(DecayBadge, { mode: m }, m)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/visualizations/nuclide-chart",
              className: "flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "data-explorer.nuclide_detail.chart_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
                "View in Chart of Nuclides"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function DataExplorer() {
  const [query, setQuery] = reactExports.useState("");
  const [decayFilter, setDecayFilter] = reactExports.useState("All");
  const [sizeFilter, setSizeFilter] = reactExports.useState("All");
  const [sortKey, setSortKey] = reactExports.useState("A");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [page, setPage] = reactExports.useState(1);
  const [selected, setSelected] = reactExports.useState(null);
  const tableRef = reactExports.useRef(null);
  const filtered = reactExports.useMemo(() => {
    let base = query.trim() ? fuseInstance.search(query).map((r) => r.item) : [...nuclides];
    if (decayFilter !== "All") {
      const key = decayFilter.toLowerCase();
      base = base.filter(
        (n) => key === "stable" ? n.decayModes.includes("stable") : n.decayModes.includes(key)
      );
    }
    if (sizeFilter === "Light") base = base.filter((n) => n.A < 50);
    else if (sizeFilter === "Medium")
      base = base.filter((n) => n.A >= 50 && n.A <= 100);
    else if (sizeFilter === "Heavy") base = base.filter((n) => n.A > 100);
    base.sort((a, b) => {
      const av = a[sortKey] ?? (sortKey === "bindingEnergyPerNucleon_MeV" ? Number.NEGATIVE_INFINITY : "");
      const bv = b[sortKey] ?? (sortKey === "bindingEnergyPerNucleon_MeV" ? Number.NEGATIVE_INFINITY : "");
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return base;
  }, [query, decayFilter, sizeFilter, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleSort = reactExports.useCallback((key) => {
    setSortKey((prev) => {
      if (prev === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
      else setSortDir("asc");
      return key;
    });
    setPage(1);
  }, []);
  const histData = reactExports.useMemo(() => {
    const counts = {};
    for (const n of filtered) {
      for (const m of n.decayModes) {
        counts[m] = (counts[m] ?? 0) + 1;
      }
    }
    return Object.entries(counts).map(([mode, count]) => ({ mode, count }));
  }, [filtered]);
  const handleExport = () => {
    const header = "Symbol,Name,Z,N,A,HalfLife,DecayModes,BindingEnergy_MeV,Abundance\n";
    const rows = filtered.map(
      (n) => [
        n.symbol,
        `"${n.name}"`,
        n.Z,
        n.N,
        n.A,
        `"${n.halfLifeStr}"`,
        `"${n.decayModes.join("|")}"`,
        n.bindingEnergyPerNucleon_MeV ?? "",
        n.abundance ?? ""
      ].join(",")
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nuclides_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  function SortIcon({ k }) {
    if (sortKey !== k) return null;
    return sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Data Explorer",
        subtitle: "Search, filter, and explore data on 200+ nuclides — from stable isotopes to radioactive species. Click any row for detailed properties.",
        audienceLevel: "intermediate",
        readTimeMin: 5
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-6", "data-ocid": "data-explorer.histogram.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3", children: [
        "Decay Mode Distribution (",
        filtered.length,
        " nuclides shown)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: histData,
          margin: { top: 4, right: 4, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "mode",
                tick: { fontSize: 11, fill: "var(--muted-foreground)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "var(--muted-foreground)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12
                },
                labelStyle: { color: "var(--foreground)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [4, 4, 0, 0], children: histData.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Cell,
              {
                fill: CHART_COLORS[d.mode] ?? CHART_COLORS.other
              },
              d.mode
            )) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { className: "mb-4", "data-ocid": "data-explorer.controls.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            placeholder: "Search symbol, name, decay mode…",
            value: query,
            onChange: (e) => {
              setQuery(e.target.value);
              setPage(1);
            },
            className: "w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "aria-label": "Search nuclides",
            "data-ocid": "data-explorer.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: decayFilter,
            onChange: (e) => {
              setDecayFilter(e.target.value);
              setPage(1);
            },
            className: "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "aria-label": "Filter by decay mode",
            "data-ocid": "data-explorer.decay_filter.select",
            children: [
              "All",
              "Stable",
              "Alpha",
              "Beta-",
              "Beta+",
              "Gamma",
              "Other"
            ].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: v }, v))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: sizeFilter,
            onChange: (e) => {
              setSizeFilter(e.target.value);
              setPage(1);
            },
            className: "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "aria-label": "Filter by mass number range",
            "data-ocid": "data-explorer.size_filter.select",
            children: [
              "All",
              "Light (A<50)",
              "Medium (50–100)",
              "Heavy (A>100)"
            ].map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: ["All", "Light", "Medium", "Heavy"][i], children: v }, v))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleExport,
            className: "flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "data-explorer.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
              " Export CSV"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SectionCard,
      {
        className: "overflow-hidden p-0",
        "data-ocid": "data-explorer.table_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              ref: tableRef,
              className: "w-full text-sm",
              "aria-label": "Nuclide data table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                  ["Symbol", "symbol"],
                  ["Name", "name"],
                  ["Z", "Z"],
                  ["N", "N"],
                  ["A", "A"],
                  ["Half-life", "halfLifeStr"],
                  ["Decay Mode(s)", null],
                  ["B.E. (MeV/u)", "bindingEnergyPerNucleon_MeV"],
                  ["Abundance (%)", "abundance"]
                ].map(([label, key]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    scope: "col",
                    className: "px-4 py-3 text-left font-semibold text-muted-foreground whitespace-nowrap",
                    children: key ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleSort(key),
                        className: "flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
                        "aria-sort": sortKey === key ? sortDir === "asc" ? "ascending" : "descending" : "none",
                        "data-ocid": `data-explorer.sort_${key}.toggle`,
                        children: [
                          label,
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { k: key })
                        ]
                      }
                    ) : label
                  },
                  label
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    colSpan: 9,
                    className: "py-12 text-center text-muted-foreground",
                    "data-ocid": "data-explorer.table.empty_state",
                    children: "No nuclides match your search criteria."
                  }
                ) }) : paginated.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    tabIndex: 0,
                    onClick: () => setSelected(n),
                    onKeyDown: (e) => e.key === "Enter" && setSelected(n),
                    className: "border-b border-border/40 hover:bg-muted/20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    "aria-label": `${n.symbol} — ${n.name}, click for details`,
                    "data-ocid": `data-explorer.table.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-mono font-bold text-primary", children: n.symbol }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground max-w-[180px] truncate", children: n.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums text-right pr-6", children: n.Z }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums text-right pr-6", children: n.N }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums text-right pr-6 font-semibold", children: n.A }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground whitespace-nowrap", children: n.halfLifeStr }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: n.decayModes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(DecayBadge, { mode: m }, m)) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums text-right pr-6", children: n.bindingEnergyPerNucleon_MeV != null ? n.bindingEnergyPerNucleon_MeV.toFixed(3) : "—" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 tabular-nums text-right pr-6", children: n.abundance != null ? n.abundance.toFixed(3) : "—" })
                    ]
                  },
                  n.symbol
                )) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              Math.min((page - 1) * PAGE_SIZE + 1, filtered.length),
              "–",
              Math.min(page * PAGE_SIZE, filtered.length),
              " of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
              " ",
              "nuclides"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPage((p) => Math.max(1, p - 1)),
                  disabled: page === 1,
                  className: "rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "data-ocid": "data-explorer.pagination_prev",
                  children: "Previous"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground min-w-[80px] text-center", children: [
                "Page ",
                page,
                " of ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                  disabled: page === totalPages,
                  className: "rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "data-ocid": "data-explorer.pagination_next",
                  children: "Next"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
          onClick: () => setSelected(null),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NuclideDetail,
        {
          nuclide: selected,
          onClose: () => setSelected(null)
        }
      )
    ] }) })
  ] });
}
export {
  DataExplorer as default
};
