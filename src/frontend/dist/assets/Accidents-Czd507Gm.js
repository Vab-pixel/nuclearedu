import { j as jsxRuntimeExports, c as BreadcrumbNav, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-jNE18aF1.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DealqQgJ.js";
import { S as SafetyCallout } from "./SafetyCallout-DWVbDsTQ.js";
import { S as SectionCard } from "./SectionCard-CFwP6_86.js";
import { T as TriangleAlert } from "./triangle-alert-DDjxJG49.js";
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
function INESBadge({ level }) {
  const colors = {
    7: "bg-destructive/20 text-destructive border-destructive/40",
    5: "bg-orange-500/20 text-orange-400 border-orange-500/40",
    4: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    3: "bg-yellow-500/20 text-yellow-500 border-yellow-500/40"
  };
  const color = colors[level] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold ${color}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3", "aria-hidden": "true" }),
        "INES ",
        level
      ]
    }
  );
}
function AccidentsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbNav,
      {
        items: [
          { label: "Safety", href: "/safety" },
          { label: "Accident Analysis" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Accident Analysis",
        subtitle: "A systematic examination of the three major nuclear accidents — Three Mile Island, Chernobyl, and Fukushima — alongside other notable events, with the causes, sequences, health consequences, and lessons that have shaped modern nuclear safety.",
        audienceLevel: "intermediate",
        readTimeMin: 25
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { title: "Educational Purpose Notice", children: "The accidents described on this page are presented for educational purposes, to understand causes and lessons learned. All content is drawn from publicly available analyses by the IAEA, the US NRC, the Chernobyl Forum, UNSCEAR, WHO, and official government investigation reports. No restricted technical detail is provided." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "accidents.intro_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Learning from Nuclear Accidents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "Nuclear accidents are statistically rare — across more than 18,000 reactor-years of commercial operation, only two events have reached the maximum INES Level 7. Yet their analysis is among the most consequential activity in nuclear safety, because the nuclear industry has an explicit commitment: every lesson from every accident, worldwide, must be shared and applied across the entire industry. This is the founding principle of the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "World Association of Nuclear Operators (WANO)" }),
          ", established in 1989 partly in response to Three Mile Island and Chernobyl."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "The INES Scale (International Nuclear and Radiological Event Scale)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "Developed jointly by the IAEA and OECD/NEA in 1990 and revised in 2008 (INES 2008 edition), the scale provides a common language for communicating the safety significance of nuclear events. Events are classified on a 0–7 scale, with each step representing approximately a tenfold increase in severity." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            headers: ["Level", "Category", "Description", "Examples"],
            rows: [
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 7 }, "7"),
                "Major Accident",
                "Major release of radioactive material with widespread health and environmental effects",
                "Chernobyl (1986), Fukushima (2011)"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold bg-destructive/10 text-destructive border-destructive/30",
                    children: "INES 6"
                  },
                  "6"
                ),
                "Serious Accident",
                "Significant release of radioactive material; full implementation of planned countermeasures required",
                "Kyshtym (USSR, 1957)"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 5 }, "5"),
                "Accident with Wider Consequences",
                "Limited release; several deaths from radiation; severe damage to reactor core",
                "Three Mile Island (1979), Windscale (1957)"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 4 }, "4"),
                "Accident with Local Consequences",
                "Minor release; at least one death from radiation; significant damage to reactor",
                "Tokaimura (1999), Saint-Laurent (1980)"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 3 }, "3"),
                "Serious Incident",
                "Exposure exceeding ten times annual limit; near-accident with no safety provisions remaining",
                "Paks (Hungary, 2003), Vandellos (Spain, 1989)"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold bg-muted text-muted-foreground border-border",
                    children: "INES 2"
                  },
                  "2"
                ),
                "Incident",
                "Significant spread of contamination; overexposure of a worker",
                "Multiple events annually across global fleet"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold bg-muted text-muted-foreground border-border",
                    children: "INES 1"
                  },
                  "1"
                ),
                "Anomaly",
                "Anomaly beyond authorized operating regime; no safety requirements compromised",
                "Common; reported routinely to IAEA IRS"
              ],
              [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold bg-muted/50 text-muted-foreground border-border/50",
                    children: "INES 0"
                  },
                  "0"
                ),
                "Deviation / Below Scale",
                "No safety significance; deviation from authorized regime",
                "Equipment malfunction, minor procedure violation"
              ]
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground italic", children: `Source: IAEA/NEA, "INES — The International Nuclear and Radiological Event Scale: User's Manual, 2008 Edition."` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Three Mile Island (1979) — INES Level 5",
          badge: "intermediate",
          ocid: "accidents.tmi",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 5 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground self-center", children: "March 28, 1979 · PWR Unit 2 · Middletown, Pennsylvania, USA" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Plant Context" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Three Mile Island Unit 2 (TMI-2) was a 2,770 MW thermal (960 MW electric) Pressurized Water Reactor (PWR) operated by Metropolitan Edison Company, licensed by the US NRC. The plant had been operational for less than a year — it began commercial operation in December 1978." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Accident Sequence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                time: "04:00:37",
                event: "Feedwater pumps in the secondary system trip (cause: maintenance personnel testing a water pump had inadvertently blocked a condensate polisher bypass valve)",
                significance: "Loss of main feedwater → turbine trip → reactor trip (SCRAM). Normal sequence so far."
              },
              {
                time: "04:00:37+",
                event: "Pilot-operated relief valve (PORV) on the pressurizer opens to relieve pressure spike — exactly as designed",
                significance: "Problem: the PORV stuck open. It should have reclosed at 2,205 psia; it did not."
              },
              {
                time: "04:00:37–04:20",
                event: "PORV stuck open → small-break LOCA begins; radioactive primary coolant drains through the relief line. Control room PORV position indicator shows 'closed' (it indicates only the electrical signal, not actual valve position)",
                significance: "Operators believe the PORV is closed. They do not know they have a LOCA."
              },
              {
                time: "~04:02",
                event: "High-pressure injection (HPI / ECCS) automatically actuates as programmed — injecting emergency water into the core",
                significance: "ECCS is working correctly. Pressure is falling because water is escaping."
              },
              {
                time: "~04:06",
                event: "Operators throttle back ECCS injection, believing the system is over-pressurized and 'water-solid' (full of water, no steam bubble). Pressurizer level is high — but this is because steam voids are forming elsewhere, displacing water to the pressurizer",
                significance: "Critical operator error: ECCS throttled. Core cooling now inadequate."
              },
              {
                time: "04:00–08:00",
                event: "Core begins to overheat. Cladding failure. Fuel melting in upper core regions (~50% core damage; peak temperature >2,200°C in hot spots). Hydrogen generated by zircaloy oxidation accumulates",
                significance: "Partial core melt — most serious event in US commercial nuclear history."
              },
              {
                time: "~11:00 AM",
                event: "A new operator shift reviews recorder data and realizes the PORV may have been open — a block valve on the PORV line is manually closed. LOCA ends ~2.5 hours after accident began.",
                significance: "Belated diagnosis — but too late to prevent core damage."
              },
              {
                time: "March 28 – April",
                event: "Recovery and clean-up. Small hydrogen burn in containment (March 28, ~1:50 PM) — did not breach containment. NRC and utility assess reactor status; evacuation advisory issued for pregnant women and preschool children within 5 miles",
                significance: "President Carter visits plant on April 1. No significant radiation release to public."
              }
            ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border/50 bg-muted/20 p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground/60 shrink-0 w-16 pt-0.5", children: step.time }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: step.event }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary/70 mt-1 italic", children: [
                      "→ ",
                      step.significance
                    ] })
                  ] })
                ]
              },
              step.time
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Consequences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Metric", "Value", "Notes"],
                rows: [
                  [
                    "Core damage",
                    "~50% core damaged; upper core regions melted",
                    "Most severely damaged core in LWR history (until Fukushima)"
                  ],
                  [
                    "I-131 released",
                    "~13 Ci (0.48 TBq)",
                    "Very small; containment retained nearly all fission products"
                  ],
                  [
                    "Kr-85 released",
                    "~13 million Ci (noble gas; cannot be contained)",
                    "Noble gas; no significant biological uptake"
                  ],
                  [
                    "Public health impact",
                    "No measurable increase in cancer rates",
                    "Hatch et al. 2011 meta-analysis; 52 epidemiological studies reviewed"
                  ],
                  [
                    "Maximum off-site dose",
                    "~1 mSv (100 mrem) at plant boundary",
                    "Equivalent to a few months of natural background radiation"
                  ],
                  [
                    "Cleanup cost",
                    "$973 million",
                    "Completed 1990; 150 t radioactive material removed"
                  ],
                  [
                    "Plant status",
                    "TMI-2 permanently shut down; TMI-1 operated until 2019",
                    ""
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Lessons Learned (Post-TMI Improvements)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: [
              {
                cat: "Instrumentation",
                lesson: "PORV position must be directly indicated (not inferred from electrical signal). Inadequate instrumentation of reactor vessel water level was identified; subcooling monitors and core exit thermocouples mandated."
              },
              {
                cat: "Operator Training",
                lesson: "Full-scope simulator training made mandatory for all reactor operators (previously rare). Training now must address non-standard scenarios, not just textbook ones."
              },
              {
                cat: "Control Room Design",
                lesson: "Human factors engineering reviews required for all control rooms. The TMI-2 control room had 1,600 alarms activate in the first minutes — operators were overwhelmed. Modern alarm philosophy prioritizes and filters alarms."
              },
              {
                cat: "Emergency Response",
                lesson: "NRC Operations Center established (24/7 emergency monitoring). Emergency response organizations formalized (10 CFR 50.47). Utility Emergency Response Plans required."
              },
              {
                cat: "WANO",
                lesson: "World Association of Nuclear Operators founded in 1989, partly in response to TMI and Chernobyl, to establish peer review and operational experience sharing across all nuclear operators worldwide."
              },
              {
                cat: "NRC Oversight",
                lesson: "NRC Reactor Oversight Process (ROP) significantly enhanced. Senior Resident Inspectors stationed permanently at each plant. Corrective action program requirements strengthened."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: item.cat }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.lesson })
                ]
              },
              item.cat
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Chernobyl (1986) — INES Level 7",
          badge: "intermediate",
          ocid: "accidents.chernobyl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 7 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground self-center", children: "April 26, 1986 · RBMK-1000 Unit 4 · Chernobyl, Ukrainian SSR" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "The RBMK-1000 Reactor Design" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "The RBMK (Reaktor Bolshoy Moshchnosti Kanalnyy — High-Power Channel Reactor) is a Soviet-designed graphite-moderated, water-cooled reactor with several design features that made it inherently less safe than contemporary Western reactor designs:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Design Feature",
                  "Normal LWR",
                  "RBMK-1000",
                  "Safety Implication"
                ],
                rows: [
                  [
                    "Void coefficient",
                    "Negative (PWR/BWR: boiling reduces reactivity → inherent stability)",
                    "Positive at low power — steam void formation increases reactivity → unstable positive feedback",
                    "If coolant boils or is lost, power increases rather than decreasing"
                  ],
                  [
                    "Control rod design",
                    "Absorber along full length",
                    "Positive reactivity insertion tip (5-second reactivity increase at beginning of insertion before absorption begins)",
                    "Inserting control rods (the SCRAM signal) initially increased power — a fundamental design flaw known before the accident"
                  ],
                  [
                    "Moderator",
                    "Light water (also serves as coolant)",
                    "Graphite moderator; separate light water coolant",
                    "Graphite continues to moderate even if all water is lost (no negative void feedback from moderator)"
                  ],
                  [
                    "Containment",
                    "Full reinforced concrete containment building",
                    "No full containment — individual pressure tubes, partial structures only",
                    "A steam explosion or graphite fire had no containment barrier"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Accident Sequence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "The accident occurred during a test to demonstrate whether the turbine could provide sufficient electrical power (from its rotational inertia after steam cutoff) to run ECCS pumps during the ~60–70 seconds before emergency diesel generators reached full power — a legitimate safety concern. The test had been deferred from a scheduled daytime execution to late-night, introducing an inexperienced shift." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                time: "April 25, 01:06",
                event: "Reactor power begins being reduced for test. Plan requires power ~700–1000 MWt."
              },
              {
                time: "April 25, 14:00",
                event: "Test suspended on orders from Kiev grid controller (electricity demand was high). Reactor held at 50% power for 9 hours — Xe-135 begins building up (iodine pit)."
              },
              {
                time: "April 25–26, ~00:28",
                event: "Operators attempt to raise power from 50%. Xe-135 poisoning causes power to plummet to 30 MWt — nearly a total blackout. Operators should have aborted the test. Instead, they withdrew almost all control rods manually to fight xenon poisoning."
              },
              {
                time: "April 26, 01:00",
                event: "Power stabilized at ~200 MWt (well below the minimum 700 MWt for safe test conditions; RBMK is unstable at low power due to positive void coefficient). Operators disabled ECCS to prevent it interfering with the test."
              },
              {
                time: "April 26, 01:23:04",
                event: "Test begins. Turbine steam supply closed. Four main coolant pumps running at high flow rate from turbine inertia. Increased flow causes slight cooling → reactivity increase."
              },
              {
                time: "April 26, 01:23:40",
                event: "Operator presses AZ-5 (emergency SCRAM button). Control rods begin inserting — but the positive-tip design causes an initial reactivity surge. Power excursion begins."
              },
              {
                time: "April 26, 01:23:44",
                event: "Power spikes to ~30,000 MWt (30 GW) — approximately 10× design power in 3 seconds. Fuel fragmentation. Steam explosion destroys the reactor. Second explosion (likely prompt criticality) follows seconds later."
              }
            ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border/50 bg-muted/20 p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground/60 shrink-0 w-20 pt-0.5", children: step.time }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: step.event })
                ]
              },
              step.time
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Radioactive Release" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Nuclide",
                  "Activity Released",
                  "Half-Life",
                  "Primary Concern"
                ],
                rows: [
                  [
                    "Total release",
                    "~5.2 × 10¹⁸ Bq (5.2 EBq)",
                    "—",
                    "Total radioactivity released (all isotopes)"
                  ],
                  [
                    "I-131",
                    "1.76 × 10¹⁸ Bq (1.76 EBq)",
                    "8 days",
                    "Thyroid dose; thyroid cancer in children; deposited via milk"
                  ],
                  [
                    "Cs-137",
                    "85 × 10¹⁵ Bq (85 PBq)",
                    "30 years",
                    "Long-term ground contamination; food chain contamination"
                  ],
                  [
                    "Cs-134",
                    "47 × 10¹⁵ Bq",
                    "2 years",
                    "Short-to-medium term ground contamination"
                  ],
                  [
                    "Sr-90",
                    "8 × 10¹⁵ Bq",
                    "28.8 years",
                    "Bone-seeking; long-term soil contamination"
                  ],
                  [
                    "Pu-239/240",
                    "~3 × 10¹² Bq",
                    "24,100 yr / 6,560 yr",
                    "Localized soil contamination near plant; alpha emitter"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground italic", children: "Source: UNSCEAR 2008 Report, Annex D; Chernobyl Forum 2005." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Health Consequences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Acute Radiation Syndrome (ARS)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "134 plant workers and emergency responders received doses sufficient to cause ARS (doses ranging from ~1 to ~16 Gy whole-body). Of these, 28 died within the first 4 months; 19 additional deaths followed in subsequent years, some attributed to ARS sequelae. 2 deaths occurred from the initial explosion (not radiation). All ARS victims were emergency personnel — not members of the general public." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Thyroid Cancer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "More than 6,000 thyroid cancer cases have been diagnosed in individuals who were children or adolescents in Belarus, Ukraine, or the Russian Federation in 1986, attributable to radioiodine (I-131) ingested via contaminated milk. The large majority (~98%) have been successfully treated. As of 2005, 15 deaths from these radiation-induced thyroid cancers had been confirmed. This is the most clearly established public health consequence of Chernobyl (UNSCEAR 2008; WHO 2006; IARC 2006)." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Other Cancers and General Population" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "UNSCEAR 2008 found no confirmed increase in solid cancer rates (other than thyroid) or leukemia in the general population attributable to Chernobyl radiation. The WHO/IARC predicted an additional ~4,000 solid cancer deaths in the most exposed populations (a very small increase above the natural cancer background of ~100,000 in the same population). Significant psychological and mental health impacts from evacuation and social disruption were documented — these effects may exceed the direct radiation health burden." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Lessons Learned" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Domain", "Lesson", "Action Taken"],
                rows: [
                  [
                    "RBMK Design",
                    "Positive void coefficient and control rod design flaw were unacceptable design features",
                    "All RBMK reactors modified; void coefficient made less positive; control rod redesigned"
                  ],
                  [
                    "Safety Culture",
                    "Culture of concealing problems and subordinating safety to production targets contributed directly to the accident",
                    "IAEA INSAG-4 (1991) introduced 'safety culture' concept; WANO founded; international peer review missions established"
                  ],
                  [
                    "Regulatory",
                    "Soviet nuclear industry was closed to international review; no effective independence between operator and regulator",
                    "Soviet/Russian nuclear industry opened to IAEA safety review; IAEA SSG-16 requirements for regulatory independence strengthened"
                  ],
                  [
                    "Operator Authority",
                    "Operators had authority to disable multiple safety systems to facilitate a test; no independent safety function protected safety systems",
                    "Modern plants: safety systems protected from operator defeat in emergency conditions; NRC improved restrictions on bypassing safety systems"
                  ],
                  [
                    "Emergency Response",
                    "Initial Soviet response attempted to downplay the severity; evacuation delayed ~36 hours for Pripyat",
                    "IAEA emergency response framework (EPR) strengthened; IAEA Convention on Early Notification, Convention on Assistance (both 1986)"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Long-Term Situation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
              "The Chernobyl Exclusion Zone (30 km radius) remains in effect. The original hastily constructed concrete sarcophagus (1986) has been replaced by the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "New Safe Confinement" }),
              ", an arch structure (108 m tall, 257 m span) built at a cost of approximately €1.5 billion and slid over the reactor building in November 2016. Decommissioning is expected to continue for decades. An estimated 350,000 people were permanently evacuated; many have never returned."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Fukushima Daiichi (2011) — INES Level 7",
          badge: "intermediate",
          ocid: "accidents.fukushima",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 7 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground self-center", children: "March 11, 2011 · BWR Units 1–4 · Fukushima Prefecture, Japan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Plant Context and Pre-Accident Vulnerability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "Fukushima Daiichi was a six-unit BWR (Boiling Water Reactor) site operated by Tokyo Electric Power Company (TEPCO). The site design basis flood height was 5.7 m above sea level. The March 11, 2011 Tōhoku earthquake (M9.0) generated a tsunami reaching",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "approximately 14–15 m at the site" }),
              "— approximately 2.5× the design basis. Multiple independent assessments (including TEPCO's own risk analysis in 2008) had identified this vulnerability but no protective measures were taken."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Detailed Event Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                time: "14:46 (Day 1)",
                event: "M9.0 Tōhoku earthquake. All 3 operating units (1, 2, 3) automatically SCRAM as designed. Emergency diesel generators start successfully. Shore power (off-site AC) fails immediately.",
                outcome: "Normal response. SCRAM and EDGs work correctly."
              },
              {
                time: "15:27–15:42 (Day 1)",
                event: "First tsunami wave (~6 m) arrives, then main wave (~14.5 m). Inundates seawater pump rooms and all emergency diesel generators for Units 1, 2, 3, 4. Station Blackout (SBO) — all AC power lost.",
                outcome: "Critical: loss of all AC power removes all active cooling and instrumentation. Decay heat removal fails."
              },
              {
                time: "~15:42 onward",
                event: "Units 1–3 switch to battery-powered instruments. Battery backup: Unit 1 ~8 hours; Units 2 and 3 ~30 hours. Isolation condensers (Unit 1) and reactor core isolation cooling (Units 2, 3) activate on steam-driven turbines.",
                outcome: "Cooling maintained temporarily without AC power."
              },
              {
                time: "~23:50 (Day 1, Unit 1)",
                event: "Unit 1 battery depleted. Reactor water level falls. Fuel heating begins. Core damage initiates (Unit 1 first, due to shorter battery life and isolation condenser that may have been manually closed).",
                outcome: "Core damage in Unit 1 begins approximately 14–16 hours after earthquake."
              },
              {
                time: "Day 1–2",
                event: "Hydrogen generated by zircaloy oxidation in Units 1 and 3 accumulates in the reactor building (above the containment). Workers attempt to vent but AC venting system inoperable.",
                outcome: "Hydrogen accumulates in building superstructure."
              },
              {
                time: "Day 2 (March 12), 15:36",
                event: "Hydrogen explosion in Unit 1 reactor building — destroys upper floors above containment. Spent fuel pool and primary containment initially intact.",
                outcome: "First significant structural damage. Public alarm."
              },
              {
                time: "Day 3 (March 14), 11:01",
                event: "Hydrogen explosion in Unit 3 reactor building — more energetic. Unit 2: reactor water level falls; primary containment may be breached via suppression chamber.",
                outcome: "Three units damaged; primary containment integrity compromised in Unit 2."
              },
              {
                time: "Day 4 (March 15)",
                event: "Unit 4 reactor building explosion — attributed to hydrogen that migrated from Unit 3 via shared exhaust system. Concerns about spent fuel pool drying out. Unit 4 was shutdown for maintenance at time of earthquake; spent fuel pool contains ~1,331 fuel assemblies.",
                outcome: "Four buildings damaged. Spent fuel pool integrity became global concern (later confirmed intact)."
              }
            ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border/50 bg-muted/20 p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground/60 shrink-0 w-24 pt-0.5", children: step.time }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: step.event }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary/70 mt-1 italic", children: [
                      "→ ",
                      step.outcome
                    ] })
                  ] })
                ]
              },
              step.time
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Radioactive Release and Environmental Impact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Category", "Value", "Comparison to Chernobyl"],
                rows: [
                  [
                    "Total radioactivity released to atmosphere",
                    "~900 PBq (0.9 EBq)",
                    "~17% of Chernobyl's total release"
                  ],
                  [
                    "Cs-137 (atmospheric)",
                    "~36 PBq",
                    "~42% of Chernobyl Cs-137 release"
                  ],
                  [
                    "I-131 (atmospheric)",
                    "~150 PBq",
                    "~8.5% of Chernobyl I-131 release"
                  ],
                  [
                    "Marine (direct ocean releases)",
                    "~12–27 PBq in first year",
                    "Significantly contaminated coastal waters; fishing restrictions imposed"
                  ],
                  [
                    "Deposition area > 600 kBq/m² (Cs-137)",
                    "~3,200 km² (Japan)",
                    "Chernobyl: ~145,000 km² > 37 kBq/m² in Europe"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Health Consequences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Radiation Deaths" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No deaths attributable to radiation from Fukushima have been confirmed (WHO 2013; UNSCEAR 2020). In 2018, the Japanese government confirmed one death from radiation-caused lung cancer in a TEPCO worker — the only recognized radiation fatality." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Radiation Cancer Risk (UNSCEAR 2020)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "For the most exposed group — children in the most affected Fukushima Prefecture areas — UNSCEAR estimates a lifetime thyroid cancer risk increase of less than 1% relative to the background risk (itself ~0.75% in Japan). For the general Fukushima Prefecture population, any additional cancer risk is below the level of epidemiological detectability. Thyroid ultrasound screening detected elevated rates of thyroid cysts and nodules, but UNSCEAR and WHO attribute this largely to screening effect (detecting pre-existing conditions), not radiation." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Evacuation-Related Deaths (2,202 disaster-related deaths)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: 'The evacuation of 154,000 people from a 30 km zone resulted in 2,202 "disaster-related deaths" — primarily elderly residents who died from hypothermia, exhaustion, disruption of medical care, and stress-related illness during and after the evacuation. This toll has been recognized as exceeding the direct radiation health burden and has prompted serious reassessment of protective action criteria. Significant and ongoing mental health impacts (anxiety, depression, PTSD) have also been documented.' })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Post-Fukushima Safety Improvements (Global)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Measure",
                  "Rationale (Fukushima Lesson)",
                  "Implementation Status"
                ],
                rows: [
                  [
                    "FLEX portable power & cooling (US NRC Order EA-12-049)",
                    "All on-site and off-site AC power was lost simultaneously; no portable backup equipment was available at the site",
                    "All 96 US operating reactors required to have portable diesel generators, pumps, and battery-powered instrumentation stored in flood/seismic-protected cache; can connect to any safety injection point. Implemented 2016."
                  ],
                  [
                    "Hardened containment vent (filtered, NRC Order EA-13-109)",
                    "Operators could not vent containment to remove hydrogen; it accumulated in reactor building superstructures and caused destructive explosions",
                    "Filtered containment vents (FCV) required for all US Mark I and Mark II BWR containments (same type as Fukushima). Reduces fission product release if venting is necessary. Implemented 2017–2018."
                  ],
                  [
                    "Enhanced spent fuel pool (SFP) instrumentation and makeup",
                    "Hydrogen from Unit 4 SFP was a major concern (pool appeared to be draining); operators had no reliable instrumentation for SFP water level during SBO",
                    "Wide-range SFP water-level instruments required; alternative water injection connection mandated. Passive SFP cooling designs evaluated for new build."
                  ],
                  [
                    "Beyond-design-basis external hazard reassessment (10 CFR 50.54(f))",
                    "Site flood design basis (5.7 m) was known to be non-conservative by TEPCO's own 2008 analysis; no action taken",
                    "All US plants required to reevaluate seismic and flooding hazards using modern probabilistic methods. Plants with inadequate protection must implement mitigation by defined schedule."
                  ],
                  [
                    "Multi-unit accident procedures and staffing",
                    "TMI and Chernobyl were single-unit accidents; Fukushima demonstrated that three simultaneous unit failures could overwhelm the Emergency Response Organization and physical resource availability",
                    "Emergency operating procedures updated to address multi-unit scenarios; FLEX strategy specifically designed for multi-unit site-wide response. Staffing analyses for multi-unit events required."
                  ],
                  [
                    "Emergency Response Organization (ERO) and communication improvements",
                    "TEPCO's on-site staff had difficulty communicating with off-site support; the government's communication with the public was severely criticized as inadequate and delayed",
                    "Communication protocols between operators, regulators, and public health authorities reviewed worldwide. IAEA SSG-45 (2018): guidance on NPP emergency response organization improvements."
                  ],
                  [
                    "Severe accident management guidelines (SAMG) upgrade",
                    "The existing Emergency Operating Procedures were designed for the design basis — operators encountered situations (no power, multiple units, hydrogen accumulation) for which no specific guidance existed",
                    "SAMGs for beyond-design-basis events reviewed and updated. Focus: passive injection, natural circulation cooling, containment heat removal without AC power, hydrogen igniter strategies for multiple units."
                  ],
                  [
                    "Tsunami and flood protection re-engineering (Japan NRA post-Fukushima standard)",
                    "The Fukushima site design-basis tsunami height was 5.7 m; the actual tsunami was ~14.5 m. No physical barriers were constructed despite known risk",
                    "Japanese Nuclear Regulation Authority (NRA) new standard (2013) requires back-fit of NPPs with: seawall meeting updated tsunami hazard (e.g., Kashiwazaki-Kariwa NPP 15 m seawall); waterproof buildings for essential equipment; seismically qualified backup power above flood level."
                  ],
                  [
                    "Protective action criteria re-evaluation (evacuation vs. shelter-in-place)",
                    "The mandatory 30 km evacuation of 154,000 people caused 2,202 excess deaths from evacuation stress, hypothermia, and disrupted care — far exceeding the radiation health impact",
                    "ICRP Publication 146 (2020) and IAEA GSG-11 (2018) updated protective action guidance, recognizing evacuation as a risk-benefit decision. Risk-informed protective action criteria now balance radiation risk against evacuation harm."
                  ],
                  [
                    "ALPS (Advanced Liquid Processing System) and treated water management (Japan-specific)",
                    "~1.25 million tonnes of cooling water, groundwater, and rainwater accumulated at the Fukushima Daiichi site, contaminated with tritium and trace radionuclides (even after ALPS treatment)",
                    "ALPS removes 62 radionuclides to below regulatory limits; tritium cannot be removed economically. IAEA reviewed Japan's ocean release plan extensively. Ocean discharge began August 2023 following IAEA safety review confirming compliance with international standards. IAEA monitoring ongoing."
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-3", children: "Chernobyl vs. Fukushima: A Comparative Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "Both accidents reached INES Level 7, yet they differ fundamentally in cause, mechanism, release magnitude, and health consequences. Comparison is essential for understanding which factors drove outcomes and how safety measures evolved." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Category",
                  "Chernobyl (1986)",
                  "Fukushima Daiichi (2011)"
                ],
                rows: [
                  [
                    "Reactor type",
                    "RBMK-1000 (graphite-moderated, water-cooled; Soviet design)",
                    "BWR Mark I (light water; US GE design, 1960s–1970s vintage)"
                  ],
                  [
                    "Root cause",
                    "Inherent design flaws (positive void coefficient, control rod tip effect) combined with deliberate disabling of safety systems during test; safety culture failure",
                    "Beyond-design-basis external hazard (tsunami 2.5× design basis); Station Blackout leading to prolonged loss of all cooling"
                  ],
                  [
                    "Initiating event",
                    "Operator-induced: manual reactivity excursion during turbine test at dangerously low power while ECCS disabled",
                    "Natural disaster: M9.0 earthquake + tsunami; all diesel generators disabled by flooding"
                  ],
                  [
                    "Reactors affected",
                    "1 (Unit 4 destroyed)",
                    "3 cores damaged (Units 1, 2, 3); Unit 4 building damaged"
                  ],
                  [
                    "Total radioactivity released (atmosphere)",
                    "~5.2 EBq (5.2 × 10¹⁸ Bq); ~30–40× more than Fukushima",
                    "~900 PBq (0.9 × 10¹⁵ Bq)"
                  ],
                  ["I-131 released", "~1.76 EBq", "~150 PBq (~8.5% of Chernobyl)"],
                  ["Cs-137 released", "~85 PBq", "~36 PBq (~42% of Chernobyl)"],
                  [
                    "Contaminated land area",
                    "~145,000 km² > 37 kBq/m² (Cs-137) across Europe",
                    "~3,200 km² > 600 kBq/m² in Japan (tighter threshold for more contaminated zone)"
                  ],
                  [
                    "Acute radiation syndrome (ARS) deaths",
                    "28–47 (plant workers and first responders)",
                    "0 confirmed ARS deaths"
                  ],
                  [
                    "Radiation-related cancer fatalities (confirmed)",
                    "28 ARS + 15 thyroid cancer deaths (to 2005); ~4,000 additional predicted by WHO in most exposed populations",
                    "1 worker (radiation-induced lung cancer, confirmed 2018)"
                  ],
                  [
                    "Evacuation",
                    "116,000 immediately; 335,000 total; 30 km exclusion zone permanent",
                    "154,000 evacuated; most returned by 2022; some areas still restricted"
                  ],
                  [
                    "Evacuation-related deaths",
                    "Significant but difficult to quantify from available data",
                    "2,202 'disaster-related deaths' — primarily elderly evacuees; exceeds radiation toll"
                  ],
                  [
                    "Thyroid cancer in children",
                    ">6,000 cases (attributable); ~15 deaths to 2005; caused by I-131 via contaminated milk",
                    "Elevated detection in screening; UNSCEAR attributes to screening effect rather than radiation; no confirmed radiation-induced thyroid cancers in children"
                  ],
                  [
                    "Containment response",
                    "No containment — RBMK had only partial structures; graphite fire drove open release for ~10 days",
                    "Containment partially intact; reactor buildings (above containment) failed from H₂ explosions; primary containment of Units 1–3 may have been breached"
                  ],
                  [
                    "Legacy structure",
                    "New Safe Confinement (2016, €1.5B); site under long-term decommissioning; Exclusion Zone maintained",
                    "Units 1–4 decommissioning in progress; ALPS treated water discharge ongoing; unit fuel removal in progress; estimated completion 2041–2051"
                  ],
                  [
                    "Key global lesson",
                    "Safety culture is fundamental — technical design flaws and regulatory failure amplified by institutional culture of concealment",
                    "Beyond-design-basis hazards must be rigorously assessed; SBO resilience; evacuation decision criteria must weigh both radiation risk AND evacuation harm"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground italic", children: "Sources: UNSCEAR 2008 (Chernobyl); UNSCEAR 2020 (Fukushima); WHO 2013; IAEA 2015 Fukushima Daiichi Accident Report; Chernobyl Forum 2005." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Accident Sequence Framework: From Initiating Events to Outcomes",
          badge: "advanced",
          ocid: "accidents.sequence_framework",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "For core damage to occur in a well-designed nuclear plant, multiple barriers and safety systems must fail — defense in depth ensures that no single failure is sufficient. The accident sequence framework provides a structured way to analyze how multiple failures combine." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Initiating Event Categories" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Category", "Examples", "Typical Frequency"],
                rows: [
                  [
                    "Loss of Coolant Accidents (LOCA)",
                    "Large-break LOCA (guillotine pipe break in main coolant line); small-break LOCA (stuck-open PORV, small pipe break)",
                    "Large-break: <10⁻⁴/yr; Small-break: ~10⁻³/yr"
                  ],
                  [
                    "Transients",
                    "Loss of feedwater; loss of offsite power; turbine trip; uncontrolled rod withdrawal; steam line break",
                    "10⁻¹ to 10⁻² /yr (AOOs); some proceed to DBA category"
                  ],
                  [
                    "External Events (seismic)",
                    "Earthquakes exceeding design basis; beyond-design-basis ground motion",
                    "Site-specific; typically 10⁻⁴ to 10⁻⁵/yr for design-basis event; Fukushima showed tail risk underestimated"
                  ],
                  [
                    "External Events (flooding)",
                    "External flooding from river, ocean, dam failure; internal flooding from broken pipes",
                    "Site-specific; often dominant external hazard in PSA"
                  ],
                  [
                    "External Events (other)",
                    "Tornado/hurricane, extreme cold (freeze-up), aircraft impact, fire",
                    "Fire historically significant: ~25% of US CDF in early PRAs"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Accident Progression Milestones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                milestone: "1. Reactor Trip (SCRAM)",
                desc: "Control rods inserted; fission chain reaction terminates in < 2 seconds. Highly reliable (unavailability typically ~10⁻⁵/demand). Decay heat (~7% of full power at shutdown; ~1% after 1 hour; <0.5% after 1 day) must still be removed.",
                color: "border-l-4 border-l-primary/60"
              },
              {
                milestone: "2. Decay Heat Removal",
                desc: "For days to weeks after shutdown, decay heat from fission product beta/gamma decay must be removed. Primary path: main feedwater/condenser. Backup: ECCS, residual heat removal (RHR). Failure of decay heat removal is the common thread in all three major accidents.",
                color: "border-l-4 border-l-secondary/60"
              },
              {
                milestone: "3. Fuel Heating (T > 1200°C): Cladding Oxidation",
                desc: "Zircaloy oxidizes rapidly in steam: Zr + 2H₂O → ZrO₂ + 2H₂. Releases hydrogen (explosion risk) and heat (exothermic). Fission product gases (Kr, Xe, I) are released from fuel into primary system. At ~1500°C, cladding loses structural integrity.",
                color: "border-l-4 border-l-amber-500/60"
              },
              {
                milestone: "4. Core Slump (T > 2800°C): Fuel Melting",
                desc: "Ceramic UO₂ melts (~2840°C); metal components melt earlier (~1200–1700°C depending on alloy). Molten corium (fuel + cladding + structural material) relocates to bottom of reactor vessel. Fission product inventory substantially mobilized.",
                color: "border-l-4 border-l-destructive/60"
              },
              {
                milestone: "5. Reactor Vessel Failure",
                desc: "Corium attacks reactor vessel bottom head. Vessel failed in Fukushima Units 1 and 2 (confirmed by muon tomography, 2017–2019). At TMI-2, the vessel did not fail despite partial melt — the water layer below preserved the vessel.",
                color: "border-l-4 border-l-destructive/60"
              },
              {
                milestone: "6. Containment Challenge",
                desc: "After vessel failure, corium interacts with reactor cavity. Challenges to containment include: hydrogen deflagration/detonation risk, direct containment heating (DCH) from high-pressure ejection, basemat melt-through (no confirmed case in history), and steam explosion. Containment retention of fission products is the last barrier before environmental release.",
                color: "border-l-4 border-l-destructive/80"
              }
            ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border border-border/50 bg-muted/20 p-4 ${step.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: step.milestone }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: step.desc })
                ]
              },
              step.milestone
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Event Tree and Fault Tree Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "Probabilistic Risk Assessment (PRA) uses two complementary graphical/analytical tools:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-2", children: "Event Tree" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'A forward-logic model starting from an initiating event. Each node represents the success/failure of a safety function (e.g., "Does ECCS actuate?"). Each branch leads to an outcome — from successful mitigation to core damage. Multiple accident sequences (paths to core damage) are enumerated. Each sequence has a calculated probability (product of individual failure probabilities).' })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-2", children: "Fault Tree" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'A backward-logic model starting from an undesired top event (e.g., "ECCS fails to deliver adequate flow"). AND/OR gates decompose the failure into combinations of basic component failures and human errors. Minimal cut sets (smallest combination of failures that cause the top event) are identified. Each basic event has a failure probability from industry data (NUREG/CR-6928 for passive components; plant records for active components).' })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Early Release Concern" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Early release" }),
              " — a large release of radioactivity before evacuation can be completed — is the most consequence-significant accident outcome. The Large Early Release Frequency (LERF) is therefore tracked separately from CDF in PRA. Post-Fukushima, filtered containment venting (FCV) was added to many BWR designs specifically to prevent uncontrolled early release if containment pressure must be relieved."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Other Notable Events (INES 3–5)",
          badge: "intermediate",
          ocid: "accidents.other_events",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "While the three major accidents dominate public discussion, a number of other events have produced important safety lessons — particularly about fuel cycle facilities, orphan sources, and military/research reactors outside the commercial fleet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 4 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Tokaimura, Japan (1999)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "A criticality accident at the JCO fuel fabrication facility in Tokaimura, Ibaraki Prefecture. Workers were processing high-enriched uranium fuel (18.8% U-235) for a research reactor and were using an unapproved, unauthorized procedure: manually mixing uranium solutions in a precipitation tank using stainless steel buckets, bypassing the approved dissolving vessel with criticality-safe geometry." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "Workers had added approximately 16 kg of uranium to the precipitation tank (critical mass in that geometry was ~5 kg with water moderation). Criticality was achieved at approximately 16:35 on September 30, 1999. The blue flash (Cherenkov radiation) was observed by workers. The criticality continued intermittently for approximately 20 hours until terminated by draining the cooling water jacket (removing the water moderator/reflector)." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataTable,
                  {
                    headers: ["Metric", "Value"],
                    rows: [
                      ["Duration of criticality", "~20 hours"],
                      [
                        "Workers with ARS symptoms",
                        "3 (doses: ~17 Gy, ~10 Gy, ~3 Gy)"
                      ],
                      [
                        "Deaths",
                        "2 (the two highest-dose workers died within months)"
                      ],
                      ["Local residents receiving > 1 mSv", "119 persons"],
                      ["Evacuation", "310 m radius; shelter-in-place 10 km radius"],
                      [
                        "Key lesson",
                        "Criticality safety requires geometry controls, not just mass controls; procedural compliance is a safety function"
                      ]
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Windscale, UK (1957)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "A graphite fire in Pile No. 1 at the Windscale nuclear site (now Sellafield), a military plutonium production reactor. The fire began during a scheduled Wigner energy release operation — an anneal of the graphite moderator to release stored energy. Operators misread temperature instruments and allowed the temperature to fall and then re-rise; the second heating ignited uranium fuel cartridges." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "The fire burned for approximately 4 days before it was extinguished by flooding with water (a decision that was controversial at the time, as water could react with the hot graphite; it worked). I-131 was released from the burning fuel over a large area of the UK." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataTable,
                  {
                    headers: ["Metric", "Value"],
                    rows: [
                      ["I-131 released", "~740 TBq"],
                      [
                        "Contaminated milk area (I-131)",
                        "~500 km² (north England); milk from area destroyed"
                      ],
                      [
                        "Estimated additional thyroid cancers",
                        "~200 (COMARE 2010 estimate)"
                      ],
                      ["Cs-137 released", "~46 TBq"],
                      [
                        "Key lesson",
                        "Military reactors without containment posed significant release risk; independent from regulatory oversight contributed to inadequate response"
                      ]
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-bold bg-muted text-muted-foreground border-border", children: "Non-Reactor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "SL-1 Accident, Idaho, USA (1961)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "The SL-1 (Stationary Low-Power Reactor No. 1) was a small (3 MW) experimental reactor operated by the US Army in Idaho. On January 3, 1961, during a maintenance restart procedure, the central control rod was manually withdrawn by approximately 50 cm (~20 inches) above the required position — far exceeding the withdrawal limit. The reasons for this are unknown (the three workers present were all killed)." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "The withdrawal caused a prompt criticality excursion. Reactor power reached approximately 20 GW (nearly instantaneous) in about 4 milliseconds. Steam explosion lifted the 18,000-lb reactor vessel approximately 3 meters and impaled one worker on the ceiling with a control rod. All three workers died — the only confirmed prompt criticality fatalities at a reactor in US history." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Lessons: Led to design requirements that reactors must not be susceptible to a single control rod withdrawal reaching criticality; procedural controls for rod withdrawal; two-person integrity for safety-significant operations." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(INESBadge, { level: 5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Goiânia, Brazil (1987)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: 'One of the most serious radiological accidents involving an "orphan source" (a radioactive source that has become separated from regulatory control). A Cs-137 teletherapy unit (containing 50.9 TBq of Cs-137 in cesium chloride powder form) had been left in an abandoned hospital in Goiânia when the facility closed, without notification to the regulatory authority.' }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "Two scrap metal collectors broke into the abandoned clinic, took the unit, and sold it to a junkyard owner who was fascinated by the glowing blue powder (CsCl emits blue Cherenkov-like radioluminescence). The powder was distributed widely — given to family members, children played with it, people rubbed it on their skin." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataTable,
                  {
                    headers: ["Metric", "Value"],
                    rows: [
                      [
                        "Deaths from ARS",
                        "4 (including a 6-year-old girl who had eaten contaminated food)"
                      ],
                      ["Persons with significant contamination", "249"],
                      ["Persons monitored", ">112,000"],
                      ["Houses demolished", "85 (soil contamination)"],
                      [
                        "Key lesson",
                        "Cesium chloride (water-soluble) is a particularly dangerous source form; modern regulations favor insoluble source materials; orphan source control is a major global safety concern"
                      ]
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Goiânia led directly to international focus on orphan source control. The IAEA estimates that approximately 100 orphan source incidents occur globally each year. The IAEA Code of Conduct on the Safety and Security of Radioactive Sources (2004) directly addresses this issue." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Comparative Summary Table" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Event",
                  "Year",
                  "INES",
                  "Type",
                  "Deaths (radiation)",
                  "Primary Lesson"
                ],
                rows: [
                  [
                    "Three Mile Island",
                    "1979",
                    "5",
                    "Commercial PWR",
                    "0",
                    "Operator training; instrumentation; human factors in control room design"
                  ],
                  [
                    "Chernobyl",
                    "1986",
                    "7",
                    "Military/commercial RBMK",
                    "28–47 (ARS)",
                    "Safety culture; design flaws; regulatory independence; safety system defeat"
                  ],
                  [
                    "Windscale",
                    "1957",
                    "5",
                    "Military graphite pile",
                    "0 immediate; ~200 cancer est.",
                    "Containment; independent oversight of military reactors"
                  ],
                  [
                    "SL-1",
                    "1961",
                    "—",
                    "Military/research",
                    "3",
                    "Single rod withdrawal criticality; two-person integrity"
                  ],
                  [
                    "Tokaimura",
                    "1999",
                    "4",
                    "Fuel fabrication",
                    "2",
                    "Criticality safety in fuel cycle; geometry controls; procedure compliance"
                  ],
                  [
                    "Goiânia",
                    "1987",
                    "5",
                    "Medical source",
                    "4",
                    "Orphan source control; source form selection (avoid soluble Cs)"
                  ],
                  [
                    "Fukushima",
                    "2011",
                    "7",
                    "Commercial BWR",
                    "1 (worker, long-term)",
                    "Beyond-design-basis flood; SBO resilience; multi-unit management; evacuation costs"
                  ]
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  AccidentsPage as default
};
