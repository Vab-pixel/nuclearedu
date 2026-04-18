import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, m as motion, h as AnimatePresence } from "./index-jNE18aF1.js";
import { P as PageHeader } from "./PageHeader-DealqQgJ.js";
import { S as SectionCard } from "./SectionCard-CFwP6_86.js";
import { n as nuclides } from "./nuclides-CjJxlGKK.js";
import { F as Fuse } from "./fuse-COjfAQ4a.js";
import { R as RotateCcw } from "./rotate-ccw-CNVfgCRL.js";
import { P as Plus } from "./plus-Cup-vT8r.js";
import { R as ResponsiveContainer, P as Legend, T as Tooltip } from "./generateCategoricalChart-BOpz90-Y.js";
import { R as RadarChart, P as PolarGrid, a as PolarAngleAxis, b as Radar } from "./RadarChart-CiYdqYEi.js";
import "./string-CugKFzKt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const MAX_SLOTS = 3;
const SLOT_COLORS = ["#22d3ee", "#a855f7", "#f59e0b"];
const fuse = new Fuse(nuclides, {
  keys: ["symbol", "name"],
  threshold: 0.35,
  includeScore: true
});
const SUGGESTIONS = [
  { label: "Uranium isotopes", symbols: ["U-235", "U-238"] },
  { label: "Hydrogen isotopes", symbols: ["H-1", "H-2", "H-3"] },
  { label: "Carbon isotopes", symbols: ["C-12", "C-13", "C-14"] }
];
const PROP_LABELS = [
  { key: "Z", label: "Proton Number (Z)", unit: "" },
  { key: "N", label: "Neutron Number (N)", unit: "" },
  { key: "A", label: "Mass Number (A)", unit: "" },
  {
    key: "bindingEnergyPerNucleon_MeV",
    label: "Binding Energy/Nucleon",
    unit: "MeV"
  },
  { key: "Qvalue_MeV", label: "Q-value", unit: "MeV" },
  { key: "massExcess_keV", label: "Mass Excess", unit: "keV" },
  { key: "halfLifeSeconds", label: "Half-life", unit: "s" }
];
const RADAR_DIMS = [
  "Z",
  "N",
  "A",
  "Binding Energy",
  "Half-life (log)"
];
function normalizeForRadar(nuclide) {
  const maxVals = {
    Z: 118,
    N: 177,
    A: 294,
    be: 8.8,
    hl: Math.log10(44e16 + 1)
  };
  const hl = nuclide.halfLifeSeconds != null ? Math.log10(nuclide.halfLifeSeconds + 1) / maxVals.hl : 0;
  return {
    Z: Math.round(nuclide.Z / maxVals.Z * 100),
    N: Math.round(nuclide.N / maxVals.N * 100),
    A: Math.round(nuclide.A / maxVals.A * 100),
    "Binding Energy": nuclide.bindingEnergyPerNucleon_MeV != null ? Math.round(nuclide.bindingEnergyPerNucleon_MeV / maxVals.be * 100) : 0,
    "Half-life (log)": Math.round(hl * 100)
  };
}
function AutocompleteInput({
  onSelect,
  placeholder
}) {
  const [q, setQ] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const results = reactExports.useMemo(
    () => q.trim().length > 0 ? fuse.search(q).slice(0, 8).map((r) => r.item) : [],
    [q]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "search",
        value: q,
        onChange: (e) => {
          setQ(e.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        onBlur: () => setTimeout(() => setOpen(false), 150),
        placeholder,
        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "aria-label": "Search for a nuclide",
        "data-ocid": "isotope-comparison.search_input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        className: "absolute z-30 mt-1 w-full rounded-lg border border-border bg-popover shadow-lg overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: results.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onMouseDown: () => {
              onSelect(n);
              setQ("");
              setOpen(false);
            },
            className: "w-full px-3 py-2 text-sm text-left hover:bg-muted/40 flex items-center gap-3 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-primary w-14", children: n.symbol }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: n.name })
            ]
          },
          n.symbol
        )) })
      }
    ) })
  ] });
}
function PropertyRow({
  prop,
  nuclideList
}) {
  const values = nuclideList.map((n) => n != null ? n[prop.key] : null);
  const nums = values.filter((v) => typeof v === "number");
  const maxV = nums.length > 0 ? Math.max(...nums) : null;
  const minV = nums.length > 0 ? Math.min(...nums) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-sm text-muted-foreground font-medium whitespace-nowrap", children: [
      prop.label,
      prop.unit && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-xs opacity-60", children: [
        "(",
        prop.unit,
        ")"
      ] })
    ] }),
    nuclideList.map((n, i) => {
      const key = `slot-${i}`;
      if (!n)
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: "px-4 py-2.5 text-sm text-muted-foreground text-center",
            children: "—"
          },
          key
        );
      const raw = n[prop.key];
      const val = raw != null ? typeof raw === "number" ? raw : null : null;
      const isMax = val != null && val === maxV && nums.length > 1;
      const isMin = val != null && val === minV && val !== maxV && nums.length > 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          className: "px-4 py-2.5 text-sm text-center tabular-nums",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1 font-mono rounded px-1.5 py-0.5 ${isMax ? "bg-emerald-950/60 text-emerald-300" : isMin ? "bg-rose-950/60 text-rose-300" : "text-foreground"}`,
              children: [
                val != null ? prop.key === "halfLifeSeconds" ? val.toExponential(2) : typeof raw === "number" ? raw.toFixed(Math.abs(raw) < 0.01 && raw !== 0 ? 4 : 3) : String(raw) : raw != null ? String(raw) : "—",
                isMax && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Highest value", className: "text-xs", children: "▲" }),
                isMin && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Lowest value", className: "text-xs", children: "▼" })
              ]
            }
          )
        },
        key
      );
    })
  ] });
}
const SLOT_IDS = ["slot-a", "slot-b", "slot-c"];
function IsotopeComparison() {
  const [slots, setSlots] = reactExports.useState([{ id: "slot-a", nuclide: null }]);
  const [copied, setCopied] = reactExports.useState(false);
  const addSlot = () => {
    if (slots.length < MAX_SLOTS) {
      const nextId = SLOT_IDS[slots.length];
      setSlots((s) => [...s, { id: nextId, nuclide: null }]);
    }
  };
  const removeSlot = (id) => setSlots((s) => s.filter((sl) => sl.id !== id));
  const setSlotNuclide = (id, n) => setSlots((s) => s.map((sl) => sl.id === id ? { ...sl, nuclide: n } : sl));
  const clearAll = () => setSlots([{ id: "slot-a", nuclide: null }]);
  const filled = slots.map((sl) => sl.nuclide).filter((n) => n !== null);
  const radarData = reactExports.useMemo(() => {
    return RADAR_DIMS.map((dim) => {
      const entry = { subject: dim };
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
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  const applySuggestion = (symbols) => {
    const found = symbols.slice(0, MAX_SLOTS).map(
      (s, i) => ({
        id: SLOT_IDS[i],
        nuclide: nuclides.find((n) => n.symbol === s) ?? null
      })
    );
    setSlots(found);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Isotope Comparison Tool",
        subtitle: "Compare up to 3 nuclides side-by-side — examine binding energies, decay modes, half-lives, and nuclear properties at a glance.",
        audienceLevel: "advanced",
        readTimeMin: 3
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Try:" }),
      SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => applySuggestion(s.symbols),
          className: "rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors",
          "data-ocid": `isotope-comparison.suggestion.${s.symbols.join("-").toLowerCase()}.button`,
          children: s.label
        },
        s.label
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: clearAll,
            className: "flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "isotope-comparison.clear_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
              " Reset"
            ]
          }
        ),
        filled.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleShare,
            className: "flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "isotope-comparison.share_button",
            children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
              copied ? "Copied!" : "Share URL"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6", children: [
      slots.map((sl, i) => {
        const n = sl.nuclide;
        const borderStyle = n ? { borderColor: `${SLOT_COLORS[i]}66` } : {};
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-6 shadow-card relative",
            style: borderStyle,
            "data-ocid": `isotope-comparison.slot.${i + 1}.card`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-semibold uppercase tracking-widest",
                    style: { color: SLOT_COLORS[i] },
                    children: [
                      "Nuclide ",
                      i + 1
                    ]
                  }
                ),
                slots.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeSlot(sl.id),
                    className: "rounded p-1 hover:bg-muted/40 transition-colors",
                    "aria-label": `Remove slot ${i + 1}`,
                    "data-ocid": `isotope-comparison.slot.${i + 1}.remove_button`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 text-muted-foreground" })
                  }
                )
              ] }),
              n ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: n.symbol }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: n.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: `A=${n.A}, Z=${n.Z}, N=${n.N} · ${n.halfLifeStr}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSlots(
                      (s) => s.map(
                        (v) => v.id === sl.id ? { ...v, nuclide: null } : v
                      )
                    ),
                    className: "mt-2 text-xs text-primary hover:underline",
                    "data-ocid": `isotope-comparison.slot.${i + 1}.change_button`,
                    children: "Change nuclide"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                AutocompleteInput,
                {
                  placeholder: "Search (e.g. U-235, Carbon)",
                  onSelect: (sel) => setSlotNuclide(sl.id, sel)
                }
              )
            ]
          },
          sl.id
        );
      }),
      slots.length < MAX_SLOTS && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          onClick: addSlot,
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          className: "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 py-8 text-muted-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "aria-label": "Add another nuclide for comparison",
          "data-ocid": "isotope-comparison.add_slot.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Add Nuclide" })
          ]
        }
      )
    ] }),
    filled.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SectionCard,
      {
        className: "text-center py-12",
        "data-ocid": "isotope-comparison.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-2", children: "Select nuclides above to begin comparing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Try the suggestions or search by symbol (e.g. "U-235", "Fe-56")' })
        ]
      }
    ),
    filled.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-6", "data-ocid": "isotope-comparison.radar_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4", children: "Visual Comparison (normalized 0–100)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 320, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: radarData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "var(--border)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PolarAngleAxis,
          {
            dataKey: "subject",
            tick: { fontSize: 12, fill: "var(--muted-foreground)" }
          }
        ),
        filled.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radar,
          {
            name: n.symbol,
            dataKey: n.symbol,
            stroke: SLOT_COLORS[i],
            fill: SLOT_COLORS[i],
            fillOpacity: 0.15,
            strokeWidth: 2
          },
          n.symbol
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12
            }
          }
        )
      ] }) })
    ] }),
    filled.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SectionCard,
      {
        className: "overflow-hidden p-0",
        "data-ocid": "isotope-comparison.properties_table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-sm",
              "aria-label": "Nuclide properties comparison",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      scope: "col",
                      className: "px-4 py-3 text-left font-semibold text-muted-foreground",
                      children: "Property"
                    }
                  ),
                  slots.map((sl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      scope: "col",
                      className: "px-4 py-3 text-center font-semibold",
                      style: { color: SLOT_COLORS[i] },
                      children: sl.nuclide ? sl.nuclide.symbol : `Slot ${i + 1}`
                    },
                    sl.id
                  ))
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-sm text-muted-foreground font-medium", children: "Decay Mode(s)" }),
                    slots.map((sl) => {
                      const n = sl.nuclide;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center", children: n ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-1", children: n.decayModes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase bg-muted text-muted-foreground",
                          children: m
                        },
                        m
                      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }, sl.id);
                    })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-sm text-muted-foreground font-medium", children: "Half-life" }),
                    slots.map((sl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-4 py-2.5 text-center text-sm font-mono text-foreground",
                        children: sl.nuclide ? sl.nuclide.halfLifeStr : "—"
                      },
                      sl.id
                    ))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-sm text-muted-foreground font-medium", children: "Abundance (%)" }),
                    slots.map((sl) => {
                      const n = sl.nuclide;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-4 py-2.5 text-center text-sm font-mono tabular-nums text-foreground",
                          children: n ? n.abundance != null ? n.abundance.toFixed(4) : "—" : "—"
                        },
                        sl.id
                      );
                    })
                  ] }),
                  PROP_LABELS.map((prop) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PropertyRow,
                    {
                      prop,
                      nuclideList: slots.map((sl) => sl.nuclide)
                    },
                    prop.key
                  ))
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-muted/10 border-t border-border text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-semibold", children: "▲ Highest" }),
            " ",
            "value in row  · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400 font-semibold", children: "▼ Lowest" }),
            " value in row"
          ] })
        ]
      }
    )
  ] });
}
export {
  IsotopeComparison as default
};
