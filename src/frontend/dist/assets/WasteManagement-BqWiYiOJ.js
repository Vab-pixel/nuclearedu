import { j as jsxRuntimeExports, c as BreadcrumbNav, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-jNE18aF1.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DealqQgJ.js";
import { S as SafetyCallout } from "./SafetyCallout-DWVbDsTQ.js";
import { S as SectionCard } from "./SectionCard-CFwP6_86.js";
import "./triangle-alert-DDjxJG49.js";
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: title }),
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
function WasteManagement() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbNav,
      {
        items: [
          { label: "Safety", href: "/safety" },
          { label: "Waste Management" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Waste Management",
        subtitle: "Radioactive waste ranges from mildly contaminated gloves to intensely hot spent reactor fuel. Safe management requires matching isolation strategy to hazard lifetime — from decades to hundreds of thousands of years.",
        audienceLevel: "intermediate",
        readTimeMin: 24
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { title: "Educational Purpose Notice", children: "All waste classification data, decay heat values, repository parameters, and radionuclide data on this page are drawn from publicly available IAEA, OECD/NEA, NRC, and peer-reviewed sources. Repository status information reflects publicly announced project states. No restricted process details or classified material inventories are described." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "waste.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Radioactive Waste: Sources, Classes, and Challenges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "Radioactive waste is any material containing radionuclides at concentrations or activities above regulatory clearance levels — levels below which the risk to individuals is so small that regulatory controls are unnecessary. The fundamental challenge in waste management is that the required isolation time is proportional to the half-life of the contained radionuclides: some high-level wastes must be kept from the biosphere for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "100,000 years or more" }),
          " — a timescale that dwarfs all of recorded human civilization (~5,000 years from the earliest writing systems to today)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "As of 2023, approximately",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "400,000 tonnes of heavy metal (tHM) of spent nuclear fuel" }),
          " ",
          "have accumulated globally from commercial power reactors, with the global fleet discharging an additional ~7,000 tHM per year. Of this, approximately 90% remains in wet pool or dry cask interim storage at reactor sites. No commercial high-level waste geological repository is yet operational: Finland's",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Onkalo repository" }),
          " (the world's first), 450 m deep in Precambrian granite at Olkiluoto, is under construction and targeting first HLW emplacement around 2025 — a landmark in the global nuclear waste management programme."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Nuclear waste arises from diverse sources: nuclear power plant operations (by far the largest contributor by radioactivity), nuclear medicine and research, industrial uses of radioisotopes, defense programmes (weapons material production), and historical uranium mining and milling operations. The IAEA waste classification system (GSG-1, 2009) provides the globally adopted framework, classifying waste by its activity level and required isolation time:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            headers: [
              "Class",
              "Abbreviation",
              "Volume share",
              "Activity share",
              "Disposal route"
            ],
            rows: [
              [
                "Exempt Waste",
                "EW",
                "Varies",
                "< clearance levels",
                "Conventional waste disposal — no radiological controls required"
              ],
              [
                "Very Short-Lived Waste",
                "VSLW",
                "Small",
                "Moderate activity",
                "Decay-in-storage (typically 100 half-lives) then clearance; hospitals, research labs"
              ],
              [
                "Very Low Level Waste",
                "VLLW",
                "~30%",
                "< 0.01%",
                "Near-surface disposal in engineered landfills; mildly contaminated soil, rubble"
              ],
              [
                "Low Level Waste",
                "LLW",
                "~60%",
                "~1%",
                "Near-surface or shallow land disposal; reactor components, PPE, filters, resins"
              ],
              [
                "Intermediate Level Waste",
                "ILW",
                "~7%",
                "~4%",
                "Disposal below ~30 m depth; structural steel, sludges, ion exchange resins"
              ],
              [
                "High Level Waste",
                "HLW",
                "~3%",
                "~95%",
                "Deep geological disposal (300–1,000 m); vitrified reprocessing waste or spent fuel"
              ]
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: 'Source: IAEA Safety Standards Series No. GSG-1 (2009), "Classification of Radioactive Waste." Volume and activity percentages are approximate global averages from nuclear power operations; the striking contrast — 3% of volume containing 95% of radioactivity — is the central challenge of HLW management.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-3", children: "Global Radioactive Waste Inventory at a Glance (2023)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [
          {
            value: "~400,000 tHM",
            label: "Spent nuclear fuel accumulated globally",
            sub: "Growing ~7,000 tHM/yr",
            color: "border-destructive/30 bg-destructive/5"
          },
          {
            value: "~82,000 tHM",
            label: "Spent fuel in dry cask storage (US)",
            sub: "~3,100+ casks at 75+ sites",
            color: "border-amber-500/30 bg-amber-500/5"
          },
          {
            value: "~390,000 m³",
            label: "Estimated global LLW/ILW volume",
            sub: "Varies significantly by country",
            color: "border-border bg-muted/20"
          },
          {
            value: "~22,000 m³",
            label: "Vitrified HLW glass canisters (France)",
            sub: "From La Hague reprocessing since 1989",
            color: "border-border bg-muted/20"
          },
          {
            value: "1",
            label: "Commercial HLW repositories under construction",
            sub: "Onkalo, Finland — first in the world",
            color: "border-emerald-500/30 bg-emerald-500/5"
          },
          {
            value: "0",
            label: "Commercial HLW repositories currently operational",
            sub: "WIPP (USA) accepts defense TRU waste only",
            color: "border-amber-500/30 bg-amber-500/5"
          }
        ].map(({ value, label, sub, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-lg border p-4 text-sm ${color}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground mb-1", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-xs mb-0.5", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: sub })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Sources: IAEA PRIS; NEA Nuclear Energy Data (2023); US NRC spent fuel storage data; Orano La Hague annual reports." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Spent Nuclear Fuel: Characteristics and Cooling",
          badge: "intermediate",
          ocid: "waste.spent_fuel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Spent nuclear fuel (SNF) discharged from a typical pressurized water reactor (PWR) after ~45 GWd/tU burnup bears almost no resemblance to the fresh uranium dioxide pellets that entered the reactor. After 3–5 years in-core, the fuel assemblies contain a complex inventory of actinides and fission products — and they are intensely radioactive and thermally hot." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Composition After Discharge (per tonne of initial uranium)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Component", "Mass fraction", "Key nuclides", "Role"],
                rows: [
                  [
                    "Uranium",
                    "~96%",
                    "U-238 (94.3%), U-235 (0.8%), U-236 (0.5%)",
                    "Still contains most of initial uranium; U-235 partially depleted from ~4% to 0.8%"
                  ],
                  [
                    "Plutonium",
                    "~1%",
                    "Pu-239 (50%), Pu-240 (24%), Pu-241 (15%), Pu-242 (6%)",
                    "Bred from U-238 neutron capture; some burned in-situ; ~60% of Pu produced in-core is fissioned"
                  ],
                  [
                    "Fission products",
                    "~3–4%",
                    "Cs-137, Sr-90, Tc-99, I-129, Xe-133, Zr-93",
                    "Dominate radioactivity for first ~300 years; Cs-137/Sr-90 are primary 30-year concerns"
                  ],
                  [
                    "Minor actinides",
                    "~0.1%",
                    "Np-237, Am-241, Am-243, Cm-242, Cm-244",
                    "Dominate long-term (>1,000 yr) radiotoxicity; transmutation target in advanced fuel cycles"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Decay Heat After Shutdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "Immediately after reactor shutdown, fission products continue to decay — releasing heat even without any neutron chain reaction. This",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "decay heat" }),
              " is the primary driver of spent fuel cooling requirements and the reason loss of cooling to spent fuel pools can cause fuel damage (as nearly occurred at Fukushima Daiichi Unit 4 in 2011)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Time after shutdown",
                  "Approx. decay heat (per tonne U)",
                  "Implication"
                ],
                rows: [
                  [
                    "1 second",
                    "~7% of operating power",
                    "Basis for emergency core cooling system design"
                  ],
                  [
                    "1 hour",
                    "~1.5% of operating power",
                    "Still megawatts for large reactors; forced cooling essential"
                  ],
                  [
                    "1 day",
                    "~5 MW/tU (large reactor ~30 tU/yr core → ~150 MW total)",
                    "Active water cooling required; SFP makeup capacity critical"
                  ],
                  [
                    "1 year",
                    "~0.2 MW/tU",
                    "Still requires pool cooling; pool temperature management"
                  ],
                  [
                    "5 years",
                    "~0.05 MW/tU",
                    "Threshold for passive dry cask transfer; natural convection sufficient"
                  ],
                  [
                    "10 years",
                    "~0.03 MW/tU",
                    "Typical NRC requirement met for dry storage transfer"
                  ],
                  [
                    "100 years",
                    "~0.004 MW/tU",
                    "Dominated by Cs-137/Sr-90; still requires thermal management in repository"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/20 p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Absolute decay heat values (per tonne HM discharged, 45 GWd/tU burnup)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataTable,
                {
                  headers: [
                    "Time after shutdown",
                    "Heat (kW/tHM)",
                    "Dominant contributors"
                  ],
                  rows: [
                    [
                      "1 hour",
                      "~100 kW/tHM",
                      "Short-lived fission products: Ba-140, La-140, I-132, Nb-95"
                    ],
                    [
                      "1 day",
                      "~35 kW/tHM",
                      "Ba-140/La-140, Y-91, Zr-95/Nb-95 beginning to dominate"
                    ],
                    [
                      "1 month",
                      "~7 kW/tHM",
                      "Cs-134, Cs-137, Ce-141, Pr-143, Nd-147"
                    ],
                    [
                      "1 year",
                      "~1.5 kW/tHM",
                      "Cs-134, Cs-137, Sr-90/Y-90, Ru-106/Rh-106"
                    ],
                    [
                      "10 years",
                      "~0.3 kW/tHM",
                      "Cs-137, Sr-90, Pu-241 decay products (Am-241)"
                    ],
                    [
                      "50 years",
                      "~0.1 kW/tHM",
                      "Cs-137 (declining), Sr-90 (declining), growing Am-241 contribution"
                    ],
                    [
                      "100 years",
                      "~0.04 kW/tHM",
                      "Cs-137/Sr-90 largely decayed; Pu + Am actinide heat"
                    ],
                    [
                      "1,000 years",
                      "~0.005 kW/tHM",
                      "Pu isotopes, Am-241; long-lived decay chains beginning"
                    ]
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Values from ANS-5.1 (1994) decay heat standard and NEA/IAEA spent fuel data. Exact values depend on initial enrichment, burnup, and cooling time. The transition from kW-scale to near-background occurs over millennia — the physical basis for repository heat load analysis." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Radiotoxicity Over Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radiotoxicity" }),
              " is not the same as radioactivity (disintegrations per second). It is the effective dose a person would receive if they ingested the material — weighted by each nuclide's dose coefficient (Sv/Bq). It measures the actual biological hazard."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 text-sm space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "0–300 years:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Radiotoxicity dominated by Cs-137 (T½ 30 yr), Sr-90 (T½ 28.8 yr), and short-lived fission products. Highly hazardous. Activity decreasing rapidly." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "300–1,000 years:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Cs/Sr largely decayed. Dominant contributors: Pu-239 (T½ 24,100 yr), Am-241 (T½ 432 yr), Np-237 (T½ 2.14 × 10⁶ yr)." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1,000–100,000 years:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: 'Plutonium isotopes and Am-241 dominate. This is the "danger period" for deep repository performance requirements. Total radiotoxicity 10–100× natural uranium ore level.' })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "~100,000–300,000 years:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Once-through fuel: radiotoxicity finally falls below natural uranium ore equivalent. With Pu + minor actinide separation and transmutation, this crossover could potentially occur at ~1,000 years." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Key Radionuclides in Spent PWR Fuel (45 GWd/tU)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Nuclide",
                  "Half-life",
                  "Activity (Bq/tHM at 10 yr)",
                  "Primary concern"
                ],
                rows: [
                  [
                    "Cs-137",
                    "30 yr",
                    "~8 × 10¹⁵",
                    "γ dose; Chernobyl/Fukushima environmental contamination"
                  ],
                  [
                    "Sr-90",
                    "28.8 yr",
                    "~7 × 10¹⁵",
                    "β dose; bone-seeking; 300-year waste concern"
                  ],
                  [
                    "Am-241",
                    "432 yr",
                    "~2 × 10¹⁵",
                    "α + γ; grows from Pu-241 decay; long-term repository concern"
                  ],
                  [
                    "Pu-239",
                    "24,100 yr",
                    "~5 × 10¹²",
                    "α; radiotoxicity dominant at 1,000–100,000 yr"
                  ],
                  [
                    "Tc-99",
                    "2.1 × 10⁵ yr",
                    "~6 × 10¹¹",
                    "β; mobile in groundwater; long-term repository migration concern"
                  ],
                  [
                    "I-129",
                    "1.57 × 10⁷ yr",
                    "~3 × 10⁹",
                    "β; extremely long-lived; thyroid uptake; groundwater tracer"
                  ],
                  [
                    "Np-237",
                    "2.14 × 10⁶ yr",
                    "~3 × 10⁹",
                    "α; long repository isolation period; mobile in oxidizing conditions"
                  ],
                  [
                    "Zr-93",
                    "1.53 × 10⁶ yr",
                    "~5 × 10¹¹",
                    "β; cladding activation product; long-term structural waste"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Activities are approximate, from NEA/IAEA spent fuel data. Values vary with burnup, cooling time, and reactor type." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Interim Storage: Wet Pools and Dry Casks",
          badge: "intermediate",
          ocid: "waste.interim_storage",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "All commercial nuclear reactors require interim storage for spent fuel. With no operating deep geological repository (DGR) for high-level waste in most countries, interim storage at reactor sites or centralized interim storage facilities is not a temporary stopgap — it is the operative reality for spent fuel worldwide." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Spent Fuel Pool (Wet) Storage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "Every operating reactor has a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Spent Fuel Pool (SFP)" }),
              " ",
              "adjacent to the reactor building. The pool is a large, reinforced concrete basin, typically 10–14 m deep and 10–12 m wide, filled with high-purity water. The water serves two simultaneous functions: removing decay heat by natural or forced convection, and providing biological shielding (5 m of water reduces the dose rate at the surface to less than 2 mSv/h, safe for pool operations)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3 mb-4", children: [
              {
                label: "Cooling",
                desc: "Active pumped cooling maintains water temperature below ~50°C. Passive cooling via natural convection can maintain safe temperatures for hours to days, depending on fuel age — a key post-Fukushima lesson."
              },
              {
                label: "Criticality Control",
                desc: "Fuel racks are made of borated stainless steel or contain neutron-absorbing panels (BORAL, borated aluminum). Modern high-density 'burnup credit' racks use credit for the reduced fissile content of irradiated fuel to allow tighter packing."
              },
              {
                label: "Capacity Limitations",
                desc: "Many US SFPs have reached or approached capacity, leading to re-racking (replacing original racks with high-density versions) and transfer to dry cask storage. US SFPs typically hold 5–10 years of full-core offloads."
              },
              {
                label: "Fukushima Lesson",
                desc: "Loss of cooling water to the SFP at Unit 4 (due to structural damage and high decay heat from a full-core offload) threatened a fuel fire. Water supply was restored by helicopter drops and pumping. This drove post-2011 requirements for passive SFP cooling."
              }
            ].map(({ label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: desc })
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Dry Cask Storage (Independent Spent Fuel Storage Installation, ISFSI)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "After a minimum of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "5 years of pool cooling" }),
              " ",
              "(NRC regulatory minimum; practice is typically 10–20 years), spent fuel assemblies can be dried and transferred to dry casks. Dry casks require no active cooling — decay heat is removed by passive natural convection and thermal radiation through the cask overpack."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Parameter", "Typical value / specification"],
                rows: [
                  [
                    "Canister",
                    "Sealed thick-wall stainless steel welded canister; helium backfill (inert, high thermal conductivity)"
                  ],
                  [
                    "Overpack",
                    "Concrete overpack (8–14 in. thick for neutron/gamma shielding) or massive forged steel transport cask"
                  ],
                  [
                    "PWR fuel assemblies per cask",
                    "24 to 68, depending on design; BWR casks hold 52 to 89 assemblies"
                  ],
                  ["Heavy metal per cask", "~8–14 tonnes of uranium"],
                  [
                    "License period",
                    "Initially 20 years (NRC); renewed for additional 40 years (total 60+ years demonstrated)"
                  ],
                  [
                    "Cost (approximate, 2023)",
                    "~$500,000–$1,000,000 per cask loaded, including canister, overpack, and loading operations"
                  ],
                  [
                    "US inventory (end 2023)",
                    "~82,000 tonnes heavy metal in ~3,100+ casks at 75+ sites in 34 states"
                  ],
                  [
                    "Temperature limits",
                    "Fuel cladding temperature must remain < 400°C (normal); < 570°C (design basis accident); prevents cladding oxidation"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Dry casks have an excellent operating record — no releases, no significant incidents — since their first US use at Virginia Power's Surry Power Station in 1986. However, they are an interim measure: the spent fuel remains intensely radioactive and must eventually be moved to a permanent geological repository." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Deep Geological Repositories (DGR)",
          badge: "advanced",
          ocid: "waste.dgr",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "The scientific and engineering consensus, endorsed by the IAEA, OECD/NEA, and every major national waste management programme, is that",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "deep geological disposal" }),
              " ",
              "is the safest long-term management option for high-level radioactive waste. No other credible option has been identified that can provide passive, maintenance-free isolation over the required timescales (hundreds of thousands to millions of years)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Concept and Depth Rationale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "A DGR places waste at depths of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "300–1,000 metres" }),
              " in stable geological formations. At these depths: (1) rock has been geologically stable for millions of years with minimal likelihood of disruption by human activity or natural processes (erosion, glaciation down to ~1,000 m is the main concern in Nordic countries); (2) groundwater travel times to the surface are tens to hundreds of thousands of years; (3) reducing geochemical conditions retard actinide solubility and migration."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Multi-Barrier Safety System" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "DGR safety does not depend on any single barrier — it relies on multiple independent barriers, each providing partial isolation. The combined performance is robust even if individual barriers degrade:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                n: "1",
                name: "Waste Form",
                detail: "Borosilicate glass (vitrification) for reprocessing high-level liquid waste. Spent fuel ceramic matrix (UO₂) itself. Both have very low dissolution rates in groundwater — measured in micrograms per litre per year."
              },
              {
                n: "2",
                name: "Canister",
                detail: "Thick-wall corrosion-resistant metal. Finnish/Swedish KBS-3: copper outer shell (5 cm) over cast iron insert. French/Swiss: thick carbon steel. Canister designed for mechanical integrity for 100,000+ yr in reducing conditions."
              },
              {
                n: "3",
                name: "Buffer",
                detail: "Compacted bentonite clay surrounding canisters. Extremely low hydraulic conductivity (10⁻¹² m/s). Swells when wet to fill all voids. Retards radionuclide migration by sorption. Acts as chemical buffer maintaining reducing pH."
              },
              {
                n: "4",
                name: "Backfill",
                detail: "Crushed rock and clay mixture sealing access tunnels after emplacement. Restores hydraulic resistance. Limits water flow to waste emplacement areas."
              },
              {
                n: "5",
                name: "Geosphere",
                detail: "Natural host rock (granite, clay, salt, volcanic tuff). Provides physical stability, chemical retardation (sorption of actinides), and time delay via very slow groundwater flow. The 'natural analogue' at Oklo, Gabon demonstrates that natural geological settings retained fission products in-situ for 1.7 billion years."
              }
            ].map(({ n, name, detail }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs border border-primary/30", children: n }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: detail })
                  ] })
                ]
              },
              n
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Host Rock Options: Pros and Cons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Host Rock",
                  "Countries considering",
                  "Advantages",
                  "Challenges"
                ],
                rows: [
                  [
                    "Crystalline granite",
                    "Finland, Sweden, Canada, Czech Republic",
                    "High mechanical stability; very old (billions of years); low porosity",
                    "Fractured rock allows preferential flow paths; needs detailed fracture characterization"
                  ],
                  [
                    "Plastic clay / mudstone",
                    "Belgium (Boom Clay), France (Callovo-Oxfordian), Switzerland (Opalinus Clay)",
                    "Self-healing fractures; very low hydraulic conductivity; strong radionuclide sorption",
                    "Lower mechanical strength; depth must be >300 m below plastic creep zone"
                  ],
                  [
                    "Bedded salt",
                    "Germany (Gorleben, WIPP), Netherlands",
                    "Zero porosity (completely dry if intact); excellent heat conductivity for HLW",
                    "Creep closes voids but complicates retrievability; potential brine intrusion through faults"
                  ],
                  [
                    "Volcanic tuff",
                    "USA (Yucca Mountain, if ever approved)",
                    "Unsaturated (above water table) — reduces groundwater contact",
                    "Oxidizing conditions increase actinide solubility; seismic activity; political opposition"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Repository Development Status Worldwide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: [
              {
                name: "Onkalo, Eurajoki (Finland)",
                status: "Under construction — world's first HLW repository",
                color: "border-emerald-500/40 bg-emerald-500/5",
                detail: "Granite at 450 m depth. Construction licence granted 2015; construction ongoing since 2021. KBS-3 copper-cast iron canister system with compacted bentonite buffer. Capacity: 6,500 tHM. Expected operational: ~2025 for first emplacement. Safety case approved by Finnish Radiation and Nuclear Safety Authority (STUK). Joint project of Posiva Oy."
              },
              {
                name: "Forsmark (Sweden)",
                status: "Approved — construction pending",
                color: "border-blue-500/40 bg-blue-500/5",
                detail: "Granite at ~470 m depth. KBS-3 design identical to Onkalo. Site at Forsmark approved by Swedish Government in November 2022 after 40 years of siting work by SKB (Swedish Nuclear Fuel and Waste Management Co). Construction licence application under review."
              },
              {
                name: "Cigéo (France)",
                status: "In development — construction licence application phase",
                color: "border-blue-500/40 bg-blue-500/5",
                detail: "Callovo-Oxfordian clay at ~500 m depth in Meuse/Haute-Marne. Operated by Andra (Agence nationale pour la gestion des déchets radioactifs). Will dispose of ILW and HLW including vitrified high-level waste from La Hague reprocessing. Target operational date: ~2035."
              },
              {
                name: "Yucca Mountain (USA)",
                status: "Stalled — politically controversial",
                color: "border-amber-500/40 bg-amber-500/5",
                detail: "Volcanic tuff ~300 m above water table in Nevada. Over $15 billion spent on studies over 30 years. NRC licence application filed 2008; withdrawn by Obama Administration 2010 at Nevada's opposition. Despite 2018 NRC Safety Evaluation Report finding the site technically suitable, no US HLW repository exists and ~90,000 tHM of spent fuel remains in at-reactor interim storage."
              },
              {
                name: "WIPP (USA)",
                status: "Operational since 1999",
                color: "border-emerald-500/40 bg-emerald-500/5",
                detail: "Waste Isolation Pilot Plant in bedded salt at 655 m depth near Carlsbad, New Mexico. Receives transuranic (TRU) waste and HLW from US defense nuclear weapons program — not commercial power plant waste. A 2014 chemical explosion (from improperly packaged waste using organic kitty litter as packing material) closed the facility for 3 years and cost ~$1.5 billion to remediate. Operational capacity licensed to 2033."
              }
            ].map(({ name, status, color, detail }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border p-4 text-sm ${color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground block", children: name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary block mt-0.5 mb-2", children: status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: detail })
                ]
              },
              name
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Long-Term Safety Assessment: The 1-Million-Year Challenge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "DGR safety assessments must demonstrate acceptable performance over periods up to 1 million years — far beyond any engineered structure or even human civilization. This is done through:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Scenario analysis:" }),
                " ",
                "All plausible futures are identified (normal evolution, climate change, seismic activity, glaciation, human intrusion) and their probability and consequences assessed."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radionuclide transport modelling:" }),
                " ",
                "Computer models simulate groundwater flow, canister corrosion, radionuclide dissolution and migration through host rock over millions of years, validated against natural analogues."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Natural analogues:" }),
                " ",
                "The Oklo natural fission reactors in Gabon (1.7 billion years ago) show that fission products and actinides migrated only centimetres from their production location over geologic time — supporting clay/rock retardation models."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Reprocessing, Transmutation, and Waste Minimization",
          badge: "advanced",
          ocid: "waste.reprocessing",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Spent fuel from a once-through fuel cycle contains valuable fissile and fertile material. Reprocessing separates this material for reuse, simultaneously reducing the volume and long-term radiotoxicity of the final waste stream — though at significant cost and with non-proliferation implications." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "PUREX Process (Plutonium Uranium Recovery by EXtraction)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "The dominant commercial reprocessing technology. Dissolved spent fuel is treated with tri-n-butyl phosphate (TBP) solvent to selectively extract uranium and plutonium from the fission product-containing aqueous phase. The process yields:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3 mb-4 text-sm", children: [
              {
                product: "Recovered Uranium (RepU)",
                detail: "Reprocessed uranium (RepU): ~96% of original mass. Contains U-236 (absorber) and trace fission products. Can be re-enriched for fuel but requires dedicated facility due to contamination."
              },
              {
                product: "Separated Plutonium",
                detail: "~1% of initial mass. Reactor-grade Pu (containing Pu-240/241/242 as well as Pu-239). Used in mixed oxide (MOX) fuel blended with uranium. Requires strict physical protection (Category I material)."
              },
              {
                product: "High-Level Liquid Waste",
                detail: "Contains ~3% fission products, minor actinides. Concentrated and vitrified into borosilicate glass blocks (~150 litres per tonne of initial fuel). The final HLW stream for geological disposal."
              }
            ].map(({ product, detail }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground block mb-1", children: product }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: detail })
                ]
              },
              product
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Commercial Reprocessing Operations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Facility", "Location", "Capacity", "Notes"],
                rows: [
                  [
                    "La Hague (UP2-800 + UP3)",
                    "Normandy, France (Orano)",
                    "1,700 tHM/yr total",
                    "Reprocesses 100% of French spent fuel; also takes contracts from Japan, Germany, UK, Netherlands. MOX from separated Pu used in 20 PWRs."
                  ],
                  [
                    "Sellafield (THORP)",
                    "Cumbria, UK",
                    "Closed 2018",
                    "Processed UK and international spent fuel 1994–2018. Decommissioning ongoing. Sellafield B205 still reprocesses Magnox fuel."
                  ],
                  [
                    "RT-1 (Mayak)",
                    "Ozersk, Russia (Rosatom)",
                    "~400 tHM/yr",
                    "Reprocesses VVER-440 spent fuel and research reactor fuel. Plans for RT-2 facility for VVER-1000 fuel pending."
                  ],
                  [
                    "Rokkasho",
                    "Aomori, Japan (JNFL)",
                    "800 tHM/yr (design)",
                    "Under commissioning for decades; multiple delays. Intended to reprocess Japanese light water reactor fuel. Now targeting ~2024 startup."
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Transmutation: Burning Long-Lived Actinides" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "The long-term radiotoxicity of spent fuel is dominated by the minor actinides — particularly",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Am-241 (T½ 432 yr), Cm-244 (T½ 18 yr), and Np-237 (T½ 2.1 × 10⁶ yr)" }),
              ". Transmutation involves irradiating these isotopes with neutrons (preferably fast neutrons) to convert them into shorter-lived fission products, dramatically reducing the time to reach natural uranium radiotoxicity levels."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 text-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Theoretical benefit of full Pu + minor actinide transmutation:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Once-through: ~100,000–300,000 years to reach natural uranium radiotoxicity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• With P&T: potentially reduced to ~1,000 years — a factor of ~100–300 reduction" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Repository volume requirement for HLW potentially reduced by ~70% (primarily due to removal of heat-generating Am/Cm)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["P&T Approach", "Status", "Key facilities"],
                rows: [
                  [
                    "Fast reactor transmutation",
                    "Proven in principle; limited commercial deployment",
                    "BN-800/BN-1200 (Russia); ARC-100; PRISM (proposed); France's Astrid (cancelled 2019)"
                  ],
                  [
                    "Accelerator-Driven System (ADS)",
                    "Research stage; no commercial ADS operating",
                    "MYRRHA (Belgium, Multi-purpose hYbrid Research Reactor for High-tech Applications) — subcritical fast reactor driven by 600 MeV proton accelerator; construction targeted 2026+"
                  ],
                  [
                    "Partitioning-only (no transmutation)",
                    "Available now via advanced PUREX variants (COEX, GANEX)",
                    "Reduces waste volume and repository footprint; does not reduce radiotoxicity unless combined with transmutation"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-600 dark:text-amber-400 mb-1", children: "Important limitation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Partitioning and transmutation (P&T) does",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "not eliminate" }),
                " the need for deep geological disposal. Some radionuclides (Tc-99, I-129, long-lived fission products) cannot be effectively transmuted. The transmutation process itself generates residual waste streams. P&T is a complement to geological disposal, not a replacement — a conclusion confirmed by every major P&T assessment (NEA, 2002; European Commission P&T Roadmap, 2010; MIT Study on Nuclear Fuel Cycle, 2011)."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { children: "Separated plutonium from reprocessing is a Category I nuclear material subject to the strictest physical protection requirements. Details of reprocessing chemistry beyond the general PUREX overview given here, or specifics of plutonium purification for non-civilian purposes, are restricted topics not covered on this site." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Transportation of Radioactive Materials",
          badge: "intermediate",
          ocid: "waste.transport",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Radioactive material is transported safely worldwide every day — medical isotopes, industrial sources, research materials, and spent nuclear fuel. The global regulatory framework is designed so that even a severe transport accident cannot result in significant release of radioactive material." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Regulatory Framework" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "The IAEA's",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "SSR-6 (Regulations for the Safe Transport of Radioactive Material, 2018 Edition)" }),
              " ",
              "is the international standard, adopted by the IAEA Member States and incorporated by reference into national regulations worldwide: US DOT (49 CFR), EU ADR/RID, ICAO (air), IMDG Code (sea). The system is performance-based — packages must pass defined tests, not meet prescriptive design rules."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Package Categories and Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Type",
                  "Activity limit",
                  "Minimum requirements",
                  "Typical contents"
                ],
                rows: [
                  [
                    "Excepted Package",
                    "Very low activity (< 10⁻² × A2)",
                    "Normal industrial packaging; no radiation labels required",
                    "Laboratory samples, some consumer products, certain LSA materials"
                  ],
                  [
                    "Type A",
                    "≤ A1 (special form) or A2 (normal form)",
                    "Withstand normal transport conditions — stacking, vibration, water spray, 1 m drop; retain shielding",
                    "Medical radiopharmaceuticals, industrial sources, research isotopes"
                  ],
                  [
                    "Type B(U)",
                    "> A1 or A2; unilateral approval",
                    "Must survive severe accident conditions (full test sequence); < 10 mSv/h at 1 m; < A2 release",
                    "High-activity sealed sources, plutonium, irradiated fuel components"
                  ],
                  [
                    "Type B(M)",
                    "> A1 or A2; multilateral approval",
                    "Same accident tests + extended immersion; transport by any mode internationally with agreement",
                    "Spent nuclear fuel assemblies, vitrified HLW canisters"
                  ],
                  [
                    "Type C",
                    "High activity for air transport",
                    "More severe tests including aircraft crash scenario; highest integrity",
                    "High-activity isotopes transported by air — Ir-192, Cf-252, Am-241"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Type B Package Accident Test Sequence (IAEA SSR-6)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "To certify a Type B package, the same physical prototype must sequentially pass all four tests. The package must then demonstrate (1) no loss of containment and (2) radiation level at 1 m from surface does not exceed 10 mSv/h:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
              {
                n: "1",
                test: "Free-Drop Test",
                desc: "9 m drop onto an unyielding target (effectively infinite mass hard surface), in the orientation calculated to cause maximum damage."
              },
              {
                n: "2",
                test: "Puncture Test",
                desc: "1 m drop of the package onto a 15 cm diameter vertical steel bar — tests penetration resistance of the containment boundary."
              },
              {
                n: "3",
                test: "Thermal Test",
                desc: "Fully engulfed in a pool fire (average temperature 800°C, emissivity ≥ 0.9) for 30 minutes, then allowed to cool. Tests containment against severe fire (simulates fuel tanker fire)."
              },
              {
                n: "4",
                test: "Immersion Test",
                desc: "Package immersed under at least 15 m of water for 8 hours (B(M)) or 1 hour (B(U)). Tests containment against waterlogging after crash and fire."
              }
            ].map(({ n, test, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs border border-primary/30", children: n }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: test }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-muted-foreground", children: desc })
                  ] })
                ]
              },
              n
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Transport Statistics and Safety Record" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "Over",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "10 million radioactive material shipments occur annually worldwide" }),
              " ",
              "by all modes (road, rail, air, sea). The transport safety record is exceptional — in over 50 years of commercial nuclear material transport, there has been no confirmed case of significant radiological impact to the public from a transport accident involving properly packaged radioactive material. The IAEA maintains the Transport Safety Events database (TRACE) to share operational experience and prevent recurrence of minor incidents."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Spent nuclear fuel transport by rail is the norm in the US, Europe, and Japan. A typical transport cask (e.g., GE IF-300 or NAC-LWT) weighs 75–125 tonnes loaded, travels at reduced speed under armed escort (in the US), with advance notification to states and municipalities along the route. Over 3,000 spent fuel shipments were made in the US from 1964 to 2023 without a single radiological release." })
          ]
        }
      )
    ] })
  ] });
}
export {
  WasteManagement as default
};
