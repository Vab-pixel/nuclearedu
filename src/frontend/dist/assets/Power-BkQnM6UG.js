import { j as jsxRuntimeExports, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-jNE18aF1.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DealqQgJ.js";
import { E as EquationBlock } from "./EquationBlock-ChluCQ53.js";
import { S as SectionCard } from "./SectionCard-CFwP6_86.js";
function CollapsibleSection({
  title,
  badge,
  children,
  defaultOpen = false,
  ocid
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "flex w-full items-center justify-between gap-3 text-left",
        onClick: () => setOpen((v) => !v),
        "aria-expanded": open,
        "data-ocid": ocid ? `${ocid}.toggle` : void 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground truncate", children: title }),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: badge })
          ] }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children })
  ] });
}
function DataTable({
  headers,
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/60 border-b border-border", children: headers.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "th",
      {
        className: "px-4 py-2 text-left font-semibold text-foreground",
        children: h
      },
      h
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "tr",
      {
        className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
        children: row.map((cell, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: "px-4 py-2 text-muted-foreground",
            children: cell
          },
          headers[j] ?? j
        ))
      },
      String(row[0])
    )) })
  ] }) });
}
function PowerPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Power Generation",
        subtitle: "From controlled fission to grid electricity — how nuclear energy works, what it costs, and why it matters for the low-carbon transition.",
        audienceLevel: "intermediate",
        readTimeMin: 28
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "power.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Nuclear Power: Global Role and Significance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "Nuclear energy supplies approximately",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "10% of the world's electricity" }),
          ". As of 2024, the IAEA's Power Reactor Information System (PRIS) records",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "413 operable reactors" }),
          " ",
          "in 32 countries with a combined installed capacity of roughly",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "373 GWe" }),
          ". In 2022 these reactors collectively generated approximately",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2,600 TWh" }),
          " — more than all renewable sources combined except hydropower (IAEA, 2023)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "Nuclear's defining operational advantage over variable renewables is its ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "capacity factor" }),
          ": globally averaged near",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "90%" }),
          ", compared with approximately 35% for utility-scale solar PV and 30–40% for onshore wind. A 1,000 MWe nuclear plant running at 90% capacity factor delivers nine times more annual energy than a 1,000 MWe solar farm at equivalent rated capacity. This makes nuclear uniquely suited to serve as firm, dispatchable baseload electricity that can also follow load (particularly French PWRs, which ramp at 5% rated power per minute)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-5", children: [
          "The IPCC (AR5/AR6) reports a lifecycle greenhouse-gas emission intensity for nuclear power of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "12 g CO₂-equivalent per kWh" }),
          " ",
          "— comparable to offshore wind and roughly 40× less than natural gas combined-cycle. France, which obtains roughly",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "70%" }),
          " of its electricity from nuclear, has among the lowest per-capita electricity CO₂ intensities of any major industrialised nation (~56 g CO₂/kWh in 2022, versus Germany's ~380 g CO₂/kWh)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Top Nuclear Countries by Electricity Share (2023–2024)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            headers: [
              "Country",
              "Nuclear Share (%)",
              "Net Capacity (GWe)",
              "Operating Reactors",
              "Notes"
            ],
            rows: [
              ["France", "~70%", "61 GWe", "56", "Highest share; all PWR"],
              ["Slovakia", "~60%", "2.3 GWe", "4", "All VVER-440/213"],
              [
                "Ukraine",
                "~55%",
                "13.8 GWe",
                "15",
                "All VVER; wartime operations"
              ],
              ["Belgium", "~50%", "5.9 GWe", "7", "Extending life to 2035+"],
              ["South Korea", "~30%", "24.7 GWe", "25", "APR-1400 new builds"],
              [
                "Russia",
                "~20%",
                "28.4 GWe",
                "37",
                "VVER fleet + fast reactor BN-800"
              ],
              [
                "United States",
                "~18–19%",
                "97.4 GWe",
                "93",
                "Largest fleet by capacity"
              ],
              ["Canada", "~15%", "14.2 GWe", "19", "CANDU PHWR fleet"],
              ["United Kingdom", "~13%", "6.9 GWe", "9", "AGR fleet retiring"],
              [
                "China",
                "~5%",
                "55.6 GWe",
                "55+",
                "Largest pipeline under construction"
              ]
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Sources: IAEA PRIS 2024; IEA World Energy Statistics 2023. Share of electricity is approximate and varies year to year with capacity factor. China has ~22 reactors under construction as of 2024 — more than any other country." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "How Nuclear Plants Generate Electricity",
          badge: "intermediate",
          ocid: "power.generation",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Every nuclear power plant is fundamentally a steam engine. Heat from controlled fission converts water into high-pressure steam, which spins a turbine coupled to an electrical generator. The thermodynamic cycle used in commercial plants is the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Rankine cycle" }),
              ", operating between the reactor as heat source and the condenser (river, ocean, or cooling tower) as heat sink."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Rankine Cycle — Step by Step" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-3 mb-5 text-sm text-muted-foreground list-decimal list-inside", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Heat source — reactor core:" }),
                " ",
                "Fission in UO₂ fuel rods heats the primary coolant to ~315°C at ~155 bar (PWR) or produces steam directly at ~288°C / 7 MPa (BWR). The fuel pellets reach centerline temperatures of 1,200–1,400°C in normal operation; peak temperatures up to ~1,800°C during design-basis transients."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Steam generation (PWR only):" }),
                " ",
                "Pressurised primary coolant circulates through the steam generator — a large shell-and-tube heat exchanger housing 3,000–16,000 thin-walled Inconel tubes. Heat transfers to a separate secondary water loop, which boils. The two-loop design ensures radioactive primary coolant never contacts the turbine or the environment during normal operation."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Turbine / generator:" }),
                " ",
                "High-enthalpy steam expands through high-pressure (HP) turbine stages, is reheated (in some designs), then passes through low-pressure (LP) turbine stages, driving the rotor. A standard 1,000 MWe plant turbine shaft rotates at 1,500 rpm (50 Hz grids) or 1,800 rpm (60 Hz), coupled to the synchronous generator."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Condenser:" }),
                " Exhaust steam at ~30–50°C / 0.005–0.012 MPa is condensed to liquid by cooling water drawn from a river, lake, sea, or circulated through cooling towers. The condenser is where waste heat is rejected to the environment."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Feedwater pump:" }),
                " ",
                "Condenser condensate is pressurised by the main feedwater pump (consuming ~2–3% of gross output) and returned to the steam generator, completing the cycle."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Thermal Efficiency and the Carnot Limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "The Carnot theorem sets the absolute maximum efficiency for any heat engine operating between two temperatures. A typical PWR with T_hot ≈ 330°C (603 K) and T_cold ≈ 30°C (303 K) has a Carnot limit of ~50%. Real gross thermal efficiencies are lower — ~33% for a standard PWR, ~34% for a BWR, up to ~36–38% for the European Pressurised Reactor (EPR) — due to:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Steam quality limitations (moisture carryover to LP turbines)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Irreversibilities in feedwater heating, pumping, and piping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Auxiliary power consumption (~3–5% of gross electrical output)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Heat losses from reactor vessel, piping, and buildings" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\eta_C = 1 - \\frac{T_{\\text{cold}}}{T_{\\text{hot}}} = 1 - \\frac{303\\,\\text{K}}{603\\,\\text{K}} \\approx 0.50 \\quad (50\\%)",
                annotation: "Carnot upper-bound efficiency for a typical PWR. Real gross thermal efficiency is 33–36% — the gap from Carnot (14–17 percentage points) is lost to irreversibilities. High-temperature gas-cooled reactors (HTGRs) at T_hot ≈ 950°C achieve η ≈ 45%, approaching the efficiency of modern combined-cycle gas turbines.",
                label: "Carnot Efficiency — PWR Upper Bound"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "P_{\\text{thermal}} = P_{\\text{electrical}} + Q_{\\text{waste}} \\quad \\Rightarrow \\quad 3{,}000\\,\\text{MWth} \\approx 1{,}000\\,\\text{MWe} + 2{,}000\\,\\text{MWth}",
                annotation: "Power balance for a typical 1,000 MWe nuclear unit at 33% thermal efficiency. Two-thirds of the reactor's thermal output (~2,000 MWth) must be rejected to the environment via the condenser — this waste heat appears as warm discharge water or visible water-vapour plumes from cooling towers. It represents no radioactive release, only low-grade heat.",
                label: "Nuclear Plant Power Balance (1,000 MWe unit)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Cooling System Options" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "After the turbine, steam must be condensed. This requires rejecting ~65% of reactor thermal output to a heat sink. Sites and regulations determine which method is used:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Cooling Method",
                  "Heat Sink",
                  "Water Consumption",
                  "Efficiency Impact",
                  "Usage"
                ],
                rows: [
                  [
                    "Once-through (open cycle)",
                    "River, lake, or ocean",
                    "Very low (returned at +5–10°C)",
                    "Minimal",
                    "Coastal and large-river sites; many older plants"
                  ],
                  [
                    "Wet mechanical-draft cooling towers",
                    "Atmosphere via evaporation",
                    "High (~2,500 L/MWh evaporated)",
                    "Slight (higher condenser T)",
                    "Majority of inland plants"
                  ],
                  [
                    "Natural-draft cooling towers",
                    "Atmosphere via convection",
                    "Similar to mechanical-draft",
                    "Slight",
                    "Large plants; visible tall hyperboloid towers"
                  ],
                  [
                    "Dry cooling",
                    "Atmosphere via air convection only",
                    "Near zero",
                    "−5 to −7% efficiency",
                    "Water-scarce regions; small modular designs"
                  ],
                  [
                    "Combined wet/dry hybrid",
                    "Atmosphere",
                    "Reduced vs. full wet",
                    "Minor",
                    "Water-stressed areas requiring compromise"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Load-Following Capability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "A widely held misconception is that nuclear plants must operate at constant full power. France's operational experience demonstrates otherwise:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "French 900 MWe PWUs can ramp from",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "100% to 20% rated power at 5% per minute" }),
                " ",
                "for load-following during night/weekend low-demand periods."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "EPR (Generation III+) design specifications include a 30-minute ramp from 25% to 100% power and back, meeting 1-in-20-year extreme scenarios without fuel damage." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Constraint: xenon-135 buildup after rapid power reduction creates a transient reactivity penalty lasting 6–10 hours (the "xenon pit") — operators must account for this when scheduling restarts.' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "US fleet historically maintains near-constant full power (maximising revenues under regulated or capacity-market pricing), but this is an economic choice, not a physical constraint." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Reactor Type",
                  "Typical Capacity Factor",
                  "Ramp Rate",
                  "Load-Following Ability"
                ],
                rows: [
                  [
                    "PWR (US fleet)",
                    "~93%",
                    "5% per min (French 900 MWe)",
                    "Good; France demonstrates daily cycling"
                  ],
                  [
                    "BWR (US fleet)",
                    "~90%",
                    "3–5% per min",
                    "Moderate; mechanical control rod complexity"
                  ],
                  [
                    "CANDU (PHWR)",
                    "~80–85%",
                    "2–3% per min",
                    "Good; online refuelling enables smooth operation"
                  ],
                  [
                    "RBMK (Russia)",
                    "~70–80%",
                    "<2% per min",
                    "Poor at low power; graphite moderator instability"
                  ],
                  [
                    "EPR (Gen III+)",
                    "~92%",
                    "5% per min (design)",
                    "Excellent; designed for 25–100% daily cycling"
                  ],
                  [
                    "AP1000 (Gen III+)",
                    "~93%",
                    "5% per min",
                    "Good; passive safety systems enable flexibility"
                  ]
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Economics: LCOE, Capital Costs, and Competitiveness",
          badge: "intermediate",
          ocid: "power.economics",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Nuclear power economics are dominated by its unusual cost structure: extremely high upfront capital investment, but very low and stable fuel and operating costs over a 40–80 year plant lifetime. This contrasts sharply with gas plants (low capital, high and volatile fuel costs). Understanding nuclear economics requires distinguishing between new build LCOE, existing fleet economics, and the distinct economics of small modular reactors (SMRs)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Levelized Cost of Energy (LCOE) — Methodology" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "LCOE is the net present value of all lifetime costs (capital, fuel, O&M, decommissioning) divided by total lifetime energy production — the minimum wholesale price needed to recover investment over the plant's life at a given discount rate. Nuclear LCOE is highly sensitive to the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "discount rate" }),
              ": at 3%, nuclear is highly competitive; at 10%, high upfront capital costs are heavily penalised. IEA/NEA reference calculations use 7% discount rate."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\text{LCOE} = \\frac{\\sum_{t=0}^{T} \\frac{C_t}{(1+r)^t}}{\\sum_{t=0}^{T} \\frac{E_t}{(1+r)^t}}",
                annotation: "C_t = total costs in year t (capital, fuel, O&M, decommissioning); E_t = energy generated in year t (MWh); r = discount rate; T = plant lifetime (years). Nuclear's high C_0 (overnight capital cost, incurred before any energy is generated) means LCOE is very sensitive to r. At r = 3%, nuclear LCOE ≈ $50–70/MWh; at r = 10%, LCOE ≈ $90–150/MWh (IEA/NEA 2020).",
                label: "Levelized Cost of Energy (LCOE)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "LCOE Comparison (IEA/NEA 2020, 7% Discount Rate)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Technology",
                  "LCOE (USD/MWh)",
                  "Capacity Factor",
                  "Fuel Cost Share",
                  "Notes"
                ],
                rows: [
                  [
                    "Nuclear (new build, OECD avg)",
                    "$65–$110",
                    "~90%",
                    "~5–7%",
                    "Heavily capital-dependent"
                  ],
                  [
                    "Nuclear (existing US fleet)",
                    "$20–$35",
                    "~93%",
                    "~20%",
                    "Capital amortised; cheapest source"
                  ],
                  [
                    "Offshore wind",
                    "$70–$150",
                    "~40–45%",
                    "0%",
                    "High marine installation costs"
                  ],
                  [
                    "Onshore wind",
                    "$35–$80",
                    "~30–40%",
                    "0%",
                    "Highly location-dependent"
                  ],
                  [
                    "Utility solar PV",
                    "$25–$60",
                    "~20–30%",
                    "0%",
                    "Low cost but needs storage for firm power"
                  ],
                  [
                    "Gas CCGT (with CO₂ at $50/t)",
                    "$55–$110",
                    "~85%",
                    "~40–60%",
                    "Highly sensitive to gas price volatility"
                  ],
                  [
                    "Gas CCGT + CCS",
                    "$80–$130",
                    "~80%",
                    "~35%",
                    "CCS adds capital; reduces CO₂ by ~90%"
                  ],
                  [
                    "Coal (with CO₂ at $50/t)",
                    "$100–$170",
                    "~75%",
                    "~25%",
                    "Carbon cost makes coal increasingly uncompetitive"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Source: IEA/NEA Projected Costs of Generating Electricity 2020, Table 3.1. System integration costs (grid balancing, storage) not included, which would increase effective costs for variable renewables and decrease nuclear's relative disadvantage." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Capital Cost Escalation in Western Markets" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "The primary economic challenge for new nuclear in the US and EU has been massive capital cost overruns on recent projects:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Project",
                  "Country",
                  "Type",
                  "Budget (Announced)",
                  "Final / Projected Cost",
                  "Schedule Delay",
                  "Capital Cost ($/kWe)"
                ],
                rows: [
                  [
                    "Vogtle 3 & 4",
                    "USA",
                    "AP1000 (2×1,117 MWe)",
                    "$14 billion (2009)",
                    "~$35 billion (2023)",
                    "7 years",
                    "~$15,700/kWe"
                  ],
                  [
                    "Hinkley Point C",
                    "UK",
                    "EPR (2×1,630 MWe)",
                    "£18 billion (2016)",
                    "£46+ billion (est. 2024)",
                    "10+ years",
                    "~$17,000+/kWe"
                  ],
                  [
                    "Flamanville 3",
                    "France",
                    "EPR (1,630 MWe)",
                    "€3.3 billion (2007)",
                    "~€13.7 billion (2024)",
                    "12 years",
                    "~$10,000/kWe"
                  ],
                  [
                    "Barakah 1–4",
                    "UAE",
                    "APR-1400 (4×1,400 MWe)",
                    "$20 billion (2009)",
                    "~$24.4 billion (2023)",
                    "5–7 years",
                    "~$4,400/kWe"
                  ],
                  [
                    "Vogtle 1 & 2 (1970s)",
                    "USA",
                    "PWR",
                    "$660M (1972)",
                    "~$9.2B (1989)",
                    "12 years",
                    "Historical benchmark"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mt-3 mb-3", children: [
              "Contrast with East Asian experience: South Korea's APR-1400 units and China's Hualong One builds have achieved",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "$3,000–$5,500/kWe" }),
              " in recent domestic construction — two to five times cheaper per installed kilowatt. Contributing factors:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Serial construction:" }),
                " ",
                "Korea has built 25+ APR/OPR units; China 50+ units — learning curve effects are steep (each additional unit 5–15% cheaper)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Pre-licensed standardised designs:" }),
                " ",
                "No redesign between units; same contractor, same workforce"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Supply chain depth:" }),
                " ",
                "Domestic heavy forgings (reactor pressure vessel heads, steam generators) — the US lost this capability after decades without orders"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Regulatory continuity:" }),
                " ",
                "Stable licensing frameworks; fewer mid-construction regulatory changes"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Small Modular Reactors (SMRs) — Economic Rationale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "SMRs (typically <300 MWe, with many designs at 50–100 MWe) aim to restore nuclear competitiveness through a fundamentally different approach: factory fabrication of reactor modules shipped to site and assembled like modular construction. The economic thesis rests on:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Learning and series production:" }),
                " ",
                "NuScale's 77 MWe iPWR module; Rolls-Royce 470 MWe SMR targeting factory production in Wales. Target: $5,000–$8,000/kWe FOAK falling to $3,500–$5,000/kWe by 10th unit."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Reduced financial risk:" }),
                " ",
                "Smaller upfront outlay (~$0.5–$2B per module vs. $10–$35B for large plant); shorter construction time (3–4 years vs. 10–15)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Siting flexibility:" }),
                " ",
                "Small footprint and passive safety systems allow siting near load centres, remote communities, industrial heat users, and hydrogen production facilities"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Grid integration:" }),
                " ",
                "Smaller unit size matches grid scale of developing nations and island grids"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "As of 2024, NuScale (USA), Rolls-Royce (UK), GE-Hitachi BWRX-300, Kairos Power (USA), and Terrestrial Energy (Canada/USA) are among the leading SMR designs in advanced licensing. First commercial SMR operations are targeted for the 2030–2035 timeframe." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "For the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "existing fleet" }),
              ", the economics are already compelling: once capital is amortised, US nuclear plants operate at $20–$35/MWh total cost (fuel ~$5–7/MWh; O&M ~$15–25/MWh) — among the lowest of any electricity source. License extensions to 60 years (and now 80 years for some US plants) unlock decades of further ultra-low-cost, zero-carbon generation from already-built assets."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Carbon Footprint and the Climate Role of Nuclear Power",
          badge: "intermediate",
          ocid: "power.climate",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "The climate case for nuclear energy rests on its",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "lifecycle emissions intensity" }),
              ". Unlike coal or gas, nuclear power's CO₂ footprint does not arise from the energy conversion step — fission releases no combustion gases. Emissions arise from ancillary activities: uranium mining, milling, enrichment (energy-intensive), plant construction (steel and concrete production), and decommissioning. Enrichment accounts for roughly 50–60% of nuclear's lifecycle emissions, which is why centrifuge enrichment (replacing gaseous diffusion) significantly reduced nuclear's footprint."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Lifecycle Greenhouse Gas Emissions (IPCC AR5, 2014)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Electricity Source",
                  "Median GHG (g CO₂eq/kWh)",
                  "Range (g CO₂eq/kWh)",
                  "Primary Source of Emissions"
                ],
                rows: [
                  ["Wind (onshore)", "11", "7–56", "Manufacturing, installation"],
                  [
                    "Nuclear",
                    "12",
                    "4–110",
                    "Enrichment, construction (~80% of lifecycle)"
                  ],
                  [
                    "Wind (offshore)",
                    "12",
                    "8–35",
                    "Marine installation, manufacturing"
                  ],
                  [
                    "Hydropower",
                    "24",
                    "4–306",
                    "Reservoir methane (tropical reservoirs highest)"
                  ],
                  [
                    "Concentrated Solar (CSP)",
                    "27",
                    "9–63",
                    "Steel/mirror manufacturing"
                  ],
                  [
                    "Solar PV (utility)",
                    "45",
                    "20–217",
                    "Silicon purification, panel manufacturing"
                  ],
                  [
                    "Natural gas CCGT",
                    "490",
                    "410–650",
                    "Combustion (90%) + upstream methane leaks"
                  ],
                  [
                    "Coal (pulverised)",
                    "820",
                    "740–910",
                    "Combustion (dominant); mining methane"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Source: IPCC Working Group III, AR5 (2014), Table A.III.2. Lifecycle analysis from cradle to grid delivery. Nuclear's high end of range (110 g) reflects older studies using gaseous diffusion enrichment; modern centrifuge enrichment yields median values of 4–15 g CO₂eq/kWh." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Avoided CO₂ Emissions from the Current Fleet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "The 2,600 TWh generated by nuclear worldwide in 2022 avoided approximately",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "~2 billion tonnes of CO₂" }),
              " ",
              "compared to coal-equivalent generation — roughly 6% of total global energy sector emissions in one year. The IAEA estimates nuclear power has cumulatively avoided",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: ">70 billion tonnes of CO₂" }),
              " ",
              "since 1970 (IAEA, 2023 Climate Report). This is larger than the total annual emissions of the US and EU combined, repeated every ~4 years."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "IEA Net Zero Scenarios — Nuclear's Required Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "The IEA Net Zero Emissions by 2050 (NZE2050) scenario — the world's most widely cited 1.5°C pathway — requires:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Scenario",
                  "2022 Nuclear Capacity",
                  "2030 Target",
                  "2050 Target",
                  "Required Growth Rate"
                ],
                rows: [
                  [
                    "IEA NZE2050",
                    "~413 GWe",
                    "~520 GWe",
                    "~1,200 GWe (~3× current)",
                    "+20 GWe/yr new build"
                  ],
                  [
                    "IEA Sustainable Development",
                    "~413 GWe",
                    "~490 GWe",
                    "~800 GWe",
                    "+10–15 GWe/yr"
                  ],
                  [
                    "IPCC median scenarios (2°C)",
                    "~413 GWe",
                    "~450 GWe",
                    "~900 GWe",
                    "+12–18 GWe/yr"
                  ],
                  [
                    "Historical peak build rate",
                    "—",
                    "—",
                    "—",
                    "~30 GWe/yr (1984–1986)"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 mb-3", children: 'The 2023 COP28 pledge to "triple nuclear capacity by 2050" was signed by 22 nations including the US, France, Japan, South Korea, Canada, and UK — signaling growing political consensus.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Land Use: Nuclear's Compact Footprint" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Energy Source", "Land Use (km² per TWh/yr)", "Includes"],
                rows: [
                  [
                    "Nuclear",
                    "0.3–3",
                    "Plant + exclusion zone; fuel mining elsewhere"
                  ],
                  [
                    "Natural gas",
                    "0.4–1.0",
                    "Plant only; excludes pipeline/extraction"
                  ],
                  [
                    "Hydropower (reservoir)",
                    "30–750",
                    "Reservoir flooding; strongly site-dependent"
                  ],
                  [
                    "Solar PV (utility)",
                    "40–60",
                    "Panel arrays + access roads + borders"
                  ],
                  [
                    "Wind (onshore)",
                    "70–150",
                    "Including spacing between turbines (land often dual-use)"
                  ],
                  [
                    "Wind (offshore)",
                    "N/A",
                    "Does not compete with land use but affects marine ecosystems"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 mb-4", children: "Note: wind turbine land is often dual-use (grazing, agriculture), partially offsetting the land impact. Nuclear's small physical footprint is particularly important for densely populated or biodiversity-rich regions." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Phase-Out Effects: Germany as a Natural Experiment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Germany's nuclear phase-out (Energiewende) provides an empirical dataset on the consequences of replacing nuclear with fossil fuels. After Fukushima (2011), Germany accelerated reactor closures, retiring 17 GWe of zero-carbon baseload between 2011 and 2023. The resulting electricity generation gap was filled primarily by coal and gas:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "CO₂ emissions from electricity sector increased by approximately",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "36 million tonnes/yr" }),
                " ",
                "(DIW Berlin study, Jarvis et al. 2022, ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nature Energy" }),
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "Approximately",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1,100 additional deaths/yr" }),
                " ",
                "attributable to increased air pollution from fossil fuel substitution (PM2.5, NOₓ; Jarvis et al.)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Economic cost estimated at ~$12 billion/year (pollution, carbon costs, grid stabilisation)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "German electricity CO₂ intensity in 2022: ~380 g/kWh vs France's ~56 g/kWh — despite comparable industrialisation" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Conversely, the US, France, South Korea, and Finland maintaining or expanding nuclear have among the lowest grid carbon intensities of any industrialised nations. Finland's Olkiluoto-3 EPR (commissioned 2023, 1,600 MWe) is expected to reduce Finnish electricity sector emissions by ~2.5 million tonnes CO₂/yr." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Uranium Resources and the Nuclear Fuel Cycle",
          badge: "intermediate",
          ocid: "power.fuel_cycle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "The nuclear fuel cycle encompasses every step from uranium ore in the ground to the final disposition of high-level waste. Unlike fossil fuel supply chains, the uranium fuel cycle is characterised by very small volumes of material at each stage — a 1,000 MWe plant consumes roughly 25–30 tonnes of enriched uranium per year, compared to roughly 2.5 million tonnes of coal for an equivalent coal plant." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Global Uranium Resources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              'The NEA/IAEA Uranium Resources, Production and Demand ("Red Book," 2022 edition) identifies',
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "~8.07 million tonnes uranium (tU)" }),
              " ",
              "in identified conventional resources recoverable at under $130/kgU. At current consumption of ~67,000 tU/year, this represents roughly 120 years of supply at current demand. With reasonable uranium price increases and improvements in extraction technology, this expands to several centuries."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Resource Type",
                  "Estimated Quantity",
                  "Cost Basis",
                  "Notes"
                ],
                rows: [
                  [
                    "Identified conventional resources",
                    "~8.07 million tU",
                    "&lt;$130/kgU",
                    "NEA Red Book 2022; includes reasonably assured + inferred"
                  ],
                  [
                    "Undiscovered conventional",
                    "~10 million tU",
                    "Geological estimate",
                    "Prognostic + speculative resources"
                  ],
                  [
                    "Unconventional (phosphates)",
                    "~22 million tU",
                    "Currently uneconomic",
                    "~100–200 ppm U in phosphate rock; co-product recovery feasible"
                  ],
                  [
                    "Dissolved in seawater",
                    "~4.5 billion tU",
                    "Currently uneconomic (~$200–600/kgU experimental)",
                    "3.3 ppb concentration; ~10,000× ocean volume × concentration; extraction prototypes demonstrated by ORNL and Japanese institutions"
                  ],
                  [
                    "Thorium (fissile equivalent via U-233)",
                    "~6.4 million tTh",
                    "Various",
                    "Th-232 → U-233 in fertile-to-fissile breeding; ~3× more common than uranium"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Major Uranium Producing Countries (2022)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Country",
                  "Production (tU)",
                  "Share (%)",
                  "Primary Mining Method"
                ],
                rows: [
                  [
                    "Kazakhstan",
                    "21,227",
                    "~43%",
                    "In-situ leaching (ISL) — ~100% of production"
                  ],
                  [
                    "Canada",
                    "7,351",
                    "~15%",
                    "Underground (Cigar Lake, McArthur River) — world's highest-grade ore"
                  ],
                  ["Namibia", "5,613", "~11%", "Open pit (Rössing, Husab)"],
                  [
                    "Australia",
                    "4,553",
                    "~9%",
                    "Open pit (Olympic Dam, Four Mile)"
                  ],
                  ["Uzbekistan", "3,300", "~7%", "ISL"],
                  ["Russia", "2,635", "~5%", "Open pit + underground"],
                  ["Niger", "2,020", "~4%", "Open pit (Arlit)"],
                  ["China", "1,700", "~3%", "Multiple methods"],
                  ["World Total", "~49,355 tU", "100%", "ISL ~55% globally (2022)"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Source: World Nuclear Association, Uranium Supply 2023; NEA Red Book 2022. Production significantly below reactor requirements (~67,000 tU/yr); gap filled by secondary supplies (enrichment tails, recycled uranium, MOX fuel, military stockpile drawdowns)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Enrichment: From Natural Uranium to Reactor Fuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Natural uranium contains 0.7204% U-235 (fissile), 99.274% U-238 (fertile), and trace U-234. Light water reactors (LWRs) require enrichment to 3–5% U-235 to sustain a chain reaction in ordinary (non-moderating) water. The enrichment process uses gas centrifuge technology: UF₆ is fed into cascades of thousands of centrifuges where the slight mass difference between ²³⁵UF₆ and ²³⁸UF₆ allows isotopic separation." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\text{SWU} = P \\cdot V(x_p) + W \\cdot V(x_w) - F \\cdot V(x_f)",
                annotation: "SWU (Separative Work Unit) quantifies the enrichment effort. V(x) = (2x−1) ln[x/(1−x)] is the value function; F = feed mass; P = product mass; W = waste (tails) mass; x_f = 0.00720 (natural U); x_p = desired enrichment (e.g. 0.044 for 4.4%); x_w = 0.003 (tails assay). Producing 1 kg of 4.4% enriched uranium from natural feed requires ~8.5 SWU. A 1,000 MWe PWR requires ~100,000 SWU/year. The centrifuge process uses ~50 kWh/SWU vs. ~2,500 kWh/SWU for obsolete gaseous diffusion.",
                label: "Separative Work Unit (SWU) — Enrichment Measure"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Complete Fuel Cycle Steps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside text-sm text-muted-foreground space-y-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Mining:" }),
                " Open-pit (Olympic Dam, Australia), underground (Cigar Lake, Canada, ~15% U₃O₈ ore grade — highest in world), or in-situ leaching (ISL, ~55% of global supply; Kazakhstan dominant). ISL dissolves uranium in place with acidic or alkaline solutions pumped underground — minimal surface disturbance."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Milling:" }),
                ' Ore crushed, leached with acid or alkali; uranium precipitated as uranium oxide ("yellowcake," U₃O₈, ~80% U by weight). Radiological characterisation: yellowcake is only mildly radioactive (mainly U-238 + daughters), handled safely with standard dust control.'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Conversion:" }),
                " U₃O₈ → UO₂ (for natural uranium reactors) or → UF₆ (for enrichment). UF₆ is solid at room temperature (sublimes at 56°C); corrosive; transported in steel cylinders."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Enrichment:" }),
                " UF₆ enriched from 0.72% to 3–5% U-235. Depleted uranium (DU) tails (~0.2–0.3% U-235) stored as UF₆, or converted to DUO₂/DUF₄ for potential future use in fast reactors or HALEU fuel cycles. Major enrichers: Urenco (EU/UK/USA), TENEX (Russia), CNNC (China), Orano (France), USEC/Centrus (USA)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Fuel Fabrication:" }),
                " ",
                "Enriched UF₆ → UO₂ powder → sintered ceramic pellets (~8–10 mm diameter, ~10 mm tall; density ~95% theoretical). Pellets loaded into zircaloy-4 or M5 cladding tubes (~9.5 mm OD, 4 m long; wall ~0.57 mm). 264 rods per PWR assembly; assemblies 17×17 pin lattice. A 1,000 MWe PWR holds ~193 assemblies, replaced 1/3 at a time annually."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Irradiation in Reactor:" }),
                " ",
                "Fuel operates in-core for 3–4 fuel cycles (total residence ~4 years for 1/3-batch replacement). Burnup: 45,000–60,000 MWd/tU for standard LWR; modern high-burnup designs reaching 70,000–80,000 MWd/tU. During irradiation, U-238 captures neutrons to produce Pu-239, and many fission products accumulate in the pellets. The ceramic pellet's crystal structure contains most fission gases at normal operating temperatures."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Spent Fuel Storage:" }),
                " ",
                "Fresh spent fuel generates ~1–2 MW of decay heat (from fission product decay) and emits intense gamma radiation. Water-filled pools at the reactor site provide cooling and shielding for minimum 3 years; typically 10+ years before transfer to dry cask storage. 7 metres of water above the fuel provides sufficient shielding for plant personnel. US dry cask design (NUHOMS, Holtec HI-STORM): inert argon-filled steel canister in reinforced concrete overpack; rated for 60+ years passive storage without power."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Reprocessing (closed cycle):" }),
                " ",
                "PUREX process (France, Russia, Japan, UK historically): spent fuel dissolved in HNO₃; uranium, plutonium extracted separately via TBP solvent; fission products remain in aqueous raffinate for vitrification. ~96% of mass becomes recyclable uranium; ~1% Pu (used in MOX fuel: 8–10% PuO₂ + UO₂); ~3% HLW fission products."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Final Disposal (open cycle HLW):" }),
                " ",
                "High-level waste (fission products + minor actinides, whether spent fuel directly or vitrified reprocessing raffinate) ultimately requires deep geological repository (DGR). Finland's Onkalo repository (450 m depth in Precambrian granite; POSIVA, operational target ~2025) is the world's first licensed HLW repository. Sweden (Forsmark), France (Bure Callovo-Oxfordian clay), and the US (yucca Mountain — currently stalled) are in advanced stages of site characterisation or licensing."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Open vs. Closed Fuel Cycle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Parameter",
                  "Once-Through (Open)",
                  "Reprocessing (Closed)"
                ],
                rows: [
                  [
                    "Used by",
                    "USA, Canada, Sweden, Finland, most of EU",
                    "France, Russia, Japan (partial); China (planned)"
                  ],
                  [
                    "HLW volume",
                    "Higher: all spent fuel classified as HLW",
                    "Lower: ~5× reduction in HLW volume; but separated Pu in inventory"
                  ],
                  [
                    "Uranium utilisation",
                    "~0.6% of mined uranium (only U-235 fissioned)",
                    "~0.8–1.0% (U-235 + Pu-239 from MOX) — marginal improvement"
                  ],
                  [
                    "With fast reactors",
                    "Not applicable",
                    "60–80% of mined uranium (breed and burn U-238 → Pu-239)"
                  ],
                  [
                    "Proliferation concern",
                    "Lower (Pu remains in spent fuel matrix)",
                    "Higher (separated Pu in commerce); IAEA-safeguarded"
                  ],
                  [
                    "Current economics",
                    "Currently cheaper in most markets",
                    "Reprocessing adds ~$1,000–2,000/kgHM cost; only competitive at high U prices"
                  ]
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Decommissioning Nuclear Power Plants",
          badge: "intermediate",
          ocid: "power.decommissioning",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Every nuclear power plant must eventually be permanently shut down and decommissioned — a planned process of safely removing or containing all radioactive materials so the site can be released for unrestricted or restricted use. The radioactivity in a decommissioned plant comes primarily from",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "neutron activation of structural materials" }),
              ": steel, concrete, and components that were irradiated by neutrons from the reactor core over decades of operation. The principal activation products are Co-60 (T½ = 5.27 yr), Fe-55 (T½ = 2.73 yr), Ni-63 (T½ = 100 yr), and in concrete: C-14 (T½ = 5,730 yr) and Cl-36 (T½ = 301,000 yr) — the latter from trace chlorine in concrete aggregate."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Plant Lifetime and Life Extension" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Commercial nuclear plants were originally designed for 40-year operating lives; this was a regulatory and financial convention, not a physical limit. Most US plants have received 20-year license extensions to 60 years, and the NRC is now granting second license renewals (SLR) to 80 years for plants that demonstrate continued safe operation. As of 2024:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "US fleet:" }),
                " 6 plants with SLR approval for 80-year operation; 14 more under review. Surry 1 & 2 (VA), North Anna 1 & 2 (VA), Peach Bottom 2 & 3 (PA), Turkey Point 3 & 4 (FL) are among those approved or pursuing 80-year licences."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "EU:" }),
                " Belgium extended Doel 4 and Tihange 3 to 2035 (from 2025) — 10-year life extension secured by $1.7B investment in safety upgrades."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "France:" }),
                " EDF's Grand Carénage programme: ~€50B investment to extend the full 56-reactor fleet to 50–60 years."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Key aging management issues: embrittlement of the reactor pressure vessel (neutron-induced irradiation hardening measured by Charpy impact testing); fatigue in piping (primary circuit), and concrete degradation (alkali-silica reaction in some designs)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Decommissioning Strategies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Strategy",
                  "Description",
                  "Timeline Post-Shutdown",
                  "When Used"
                ],
                rows: [
                  [
                    "DECON (Immediate Dismantlement)",
                    "Plant dismantled promptly after shutdown; all activated/contaminated material removed and disposed of in licensed waste facilities. Site released for unrestricted use.",
                    "7–15 years",
                    "Most US and German plants; smaller reactors; where repository capacity available"
                  ],
                  [
                    "SAFSTOR (Deferred Dismantlement)",
                    "Plant placed in protective storage for 20–60 years to allow short-lived radioactive decay (principally Co-60, T½=5.27 yr, reduces 1,000-fold in 53 years). Then dismantled.",
                    "40–70 years total (storage + D&D)",
                    "Large complex plants; when repositories unavailable; to reduce worker dose"
                  ],
                  [
                    "ENTOMB",
                    "Radioactive materials encased in long-lasting concrete structure on the site indefinitely. Structurally not a licensed approach for commercial reactors in most countries.",
                    "Permanent",
                    "Extremely rare; Chernobyl Unit 4 (New Safe Confinement); considered last resort"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 mb-4", children: "The IAEA recommends prompt dismantlement (DECON) as the preferred strategy in most cases, as extended deferral concentrates decommissioning costs far in the future and can complicate institutional memory of radiologically sensitive areas." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Waste Classification and Volumes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Approximately",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "95% by volume" }),
              " of decommissioning waste is low-level waste (LLW) — slightly contaminated metal, concrete, piping, and equipment. Only a small fraction is intermediate-level waste (ILW), primarily the highly activated reactor pressure vessel, core barrel, and internal structures."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Waste Class",
                  "Volume Share (typical)",
                  "Activity Level",
                  "Key Components",
                  "Disposal Route"
                ],
                rows: [
                  [
                    "Very Low Level Waste (VLLW)",
                    "~60–70%",
                    "Very low (bulk concrete, soils, scrap metal)",
                    "Lightly contaminated building rubble; clearance below regulatory limits possible",
                    "Industrial landfill (if below clearance) or near-surface VLLW facility"
                  ],
                  [
                    "Low Level Waste (LLW)",
                    "~20–30%",
                    "Low (active work areas, piping)",
                    "Contaminated metal, insulation, filters, tools, clothing",
                    "Near-surface disposal facility (engineered vault)"
                  ],
                  [
                    "Intermediate Level Waste (ILW)",
                    "~2–5%",
                    "Moderate to high (activated structural steel)",
                    "Reactor pressure vessel; core barrel; core internals; biological shield",
                    "Deeper vault or intermediate depth repository"
                  ],
                  [
                    "High Level Waste / Spent Fuel",
                    "&lt;1% by volume",
                    "Very high (fission products, actinides)",
                    "Spent fuel assemblies; vitrified HLW canisters",
                    "Deep Geological Repository (DGR) — see Fuel Cycle section"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Costs and Funding Mechanisms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Decommissioning a large commercial power reactor typically costs",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "$300 million to $1 billion" }),
              " ",
              "per reactor unit (range reflects design complexity, SAFSTOR vs. DECON strategy, national labour costs, and waste disposal access). The US fleet of ~93 operating reactors has accumulated roughly",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "$60 billion" }),
              " in dedicated decommissioning trust funds (NRC, 2023). Financial assurance requirements:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "US:" }),
                " NRC requires operators to maintain decommissioning funds in external trusts; fund amount based on site-specific minimum decommissioning cost (~$400–500M/unit), adjusted for inflation."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "UK:" }),
                " Nuclear Decommissioning Authority (NDA) manages Sellafield and legacy military/early commercial sites; total UK nuclear decommissioning liabilities estimated at ~£100 billion (NDA, 2023)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "France:" }),
                " EDF decommissioning provisions: ~€37 billion for current fleet. French regulator (ASN) requires all funds to be secured before permanent shutdown."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Notable Completed and In-Progress Decommissioning Projects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Plant", "Country", "Strategy", "Status", "Key Notes"],
                rows: [
                  [
                    "Yankee Rowe (185 MWe)",
                    "USA",
                    "DECON",
                    "Completed 2007",
                    "First large US reactor fully decommissioned; license terminated 2007; site now unrestricted use; cost ~$450M"
                  ],
                  [
                    "Maine Yankee (900 MWe)",
                    "USA",
                    "DECON",
                    "Completed 2005",
                    "Greenfield site in 9 years (shutdown 1996); cost ~$635M"
                  ],
                  [
                    "San Onofre 2 & 3 (2,200 MWe)",
                    "USA",
                    "DECON",
                    "Ongoing (2013–~2030s)",
                    "~250,000 tonnes of material; ISFSI for spent fuel on site; ~$4.4B total est."
                  ],
                  [
                    "Calder Hall (240 MWe)",
                    "UK",
                    "SAFSTOR",
                    "Ongoing (shutdown 2003)",
                    "UK's first commercial power reactor (1956); Magnox design; expected completion 2050s"
                  ],
                  [
                    "Greifswald (5×440 MWe, VVER)",
                    "Germany",
                    "DECON",
                    "Largely complete",
                    "East German VVER fleet; rapid decommissioning model; benchmark for SAFSTOR vs DECON debate"
                  ],
                  [
                    "Zwentendorf (692 MWe)",
                    "Austria",
                    "N/A — never operated",
                    "Preserved as training facility",
                    "Completed construction 1978; referendum rejected nuclear; never fuelled; unique intact decommissioning training site"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "By 2040, over 200 commercial nuclear reactors globally will have reached or exceeded their original 40-year design licences. The IAEA estimates the global decommissioning market will require in excess of $100 billion in investment over the next 30 years — making nuclear decommissioning one of the largest emerging industrial sectors in the energy transition." })
          ]
        }
      )
    ] })
  ] });
}
export {
  PowerPage as default
};
