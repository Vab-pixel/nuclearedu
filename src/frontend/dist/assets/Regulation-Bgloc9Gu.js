import { j as jsxRuntimeExports, c as BreadcrumbNav, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-BllujZqD.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-rcuhA3iH.js";
import { S as SafetyCallout } from "./SafetyCallout-CCYIZ9OV.js";
import { S as SectionCard } from "./SectionCard-BruuPt5P.js";
import "./triangle-alert-DlRFZmS1.js";
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
function Regulation() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbNav,
      {
        items: [{ label: "Safety", href: "/safety" }, { label: "Regulation" }]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Regulation",
        subtitle: "Independent oversight ensuring that nuclear technology is used safely, securely, and exclusively for peaceful purposes — from reactor licensing to international safeguards verification.",
        audienceLevel: "intermediate",
        readTimeMin: 22
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "regulation.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Overview of Nuclear Regulation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Nuclear regulation is the system of independent government oversight that ensures nuclear technology — from power reactors to medical radioisotope facilities — is used safely, securely, and only for declared peaceful purposes. It operates across three distinct but related domains:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
          {
            label: "Safety",
            color: "border-emerald-500/40 bg-emerald-500/5",
            text: "Protects workers, the public, and the environment from the harmful effects of radiation — whether from normal operations or accidents."
          },
          {
            label: "Security",
            color: "border-blue-500/40 bg-blue-500/5",
            text: "Prevents unauthorized access, theft, sabotage, or malicious use of nuclear and radioactive materials."
          },
          {
            label: "Safeguards",
            color: "border-purple-500/40 bg-purple-500/5",
            text: "Verifies, via independent inspection and accountancy, that nuclear material is not diverted from declared peaceful uses toward weapons."
          }
        ].map(({ label, color, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-lg border p-3 text-sm ${color}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground block mb-1", children: [
                "Nuclear ",
                label
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: text })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "A foundational principle of nuclear governance is that the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "regulatory body must be independent" }),
          " ",
          "of any government department that promotes nuclear energy. Combining promotion and regulation in the same ministry creates a conflict of interest that has historically led to compromised safety oversight. This principle is codified in the IAEA Safety Fundamentals (SF-1, 2006) and required under the Convention on Nuclear Safety."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "The",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "IAEA (International Atomic Energy Agency)" }),
          " ",
          "sets international safety standards and conducts peer reviews, but it is emphatically not a regulator itself. Each sovereign nation maintains its own regulatory authority. The IAEA's role is to establish benchmarks, provide technical assistance, and facilitate information exchange — not to issue binding orders to operators."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Convention on Nuclear Safety (CNS, 1996):" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: 'A legally binding treaty with 91 contracting parties covering all land-based civil nuclear power plants. Parties submit national reports every three years, which are reviewed at diplomatic review meetings by all contracting parties — a "peer pressure" model of international accountability rather than enforcement by a supranational authority.' })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "The IAEA Safety Standards System",
          badge: "intermediate",
          ocid: "regulation.iaea_standards",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "The IAEA publishes an interlocking hierarchy of safety standards, developed by international expert groups and approved by the IAEA Board of Governors. While not automatically binding in national law, they are widely adopted as the global baseline and incorporated by reference into national regulations in over 50 countries." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Four-Level Standards Hierarchy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-5", children: [
              {
                level: "Level 1",
                type: "Safety Fundamentals (SF)",
                key: "SF-1 (2006)",
                desc: "Fundamental safety objective and principles. Sets the overarching goals: protect people and the environment. All other standards must be consistent with SF-1."
              },
              {
                level: "Level 2",
                type: "Safety Requirements (GSR, SSR)",
                key: "SSR-2/1, GSR Part 3",
                desc: "Mandatory requirements — what must be achieved. General Safety Requirements (GSR) cover all facilities; Specific Safety Requirements (SSR) are facility-type specific."
              },
              {
                level: "Level 3",
                type: "Safety Guides (SSG, GSG)",
                key: "~100+ guides",
                desc: "Recommendations on how to meet the requirements. Not mandatory, but represent international best practice. Departure from a Safety Guide requires justification."
              },
              {
                level: "Level 4",
                type: "Safety Reports",
                key: "Practical examples",
                desc: "Detailed technical guidance, worked examples, and best practices to support implementation of the requirements and guides."
              }
            ].map(({ level, type, key, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-mono text-xs text-muted-foreground/60 mt-0.5 w-14", children: level }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-mono text-xs text-primary", children: key }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: desc })
                  ] })
                ]
              },
              level
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Key Standards Referenced Worldwide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Standard", "Year", "Scope"],
                rows: [
                  [
                    "GSR Part 3",
                    "2014",
                    "Radiation protection requirements — incorporates ICRP Publication 103 dose limits (20 mSv/yr occupational, 1 mSv/yr public)"
                  ],
                  [
                    "SSR-2/1 Rev.1",
                    "2016",
                    "Design safety requirements for nuclear power plants — deterministic and probabilistic criteria"
                  ],
                  [
                    "SSR-2/2 Rev.1",
                    "2016",
                    "Operational safety requirements for NPPs — testing, maintenance, procedures"
                  ],
                  [
                    "GSR Part 7",
                    "2015",
                    "Preparedness and response for nuclear and radiological emergencies — ingestion zones, protective actions"
                  ],
                  [
                    "SSG-12",
                    "2019",
                    "Licensing process for nuclear installations — stages, documentation, independent review"
                  ],
                  [
                    "NS-R-4 / SSR-3",
                    "2012",
                    "Safety of research reactors — proportionate requirements for lower-power facilities"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "IAEA Peer Review Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-2", children: [
              {
                name: "OSART",
                full: "Operational Safety Review Team",
                target: "Reactor operating organizations",
                desc: "Expert team reviews safety management, operations, maintenance, radiation protection, and emergency planning against IAEA safety guides. Findings and recommendations are provided; follow-up missions check progress."
              },
              {
                name: "IRRS",
                full: "Integrated Regulatory Review Service",
                target: "National regulatory bodies",
                desc: "Reviews the national regulatory framework — legal basis, independence, competence, licensing process, inspection programme — against IAEA safety requirements. Over 60 countries have hosted IRRS missions."
              },
              {
                name: "ARTEMIS",
                full: "Integrated Review Service for Radioactive Waste and Spent Fuel Management",
                target: "National waste programmes",
                desc: "Reviews national programmes for radioactive waste and spent fuel management, including safety assessment, repository development, and regulatory oversight."
              },
              {
                name: "SALTO",
                full: "Safety Aspects of Long Term Operation",
                target: "Reactor operating organizations (life extension)",
                desc: "Peer review focused on ageing management and long-term operation beyond original design life. Teams assess programmes for managing ageing of passive structures and components (reactor vessel, concrete, piping, cables) and verify compliance with IAEA SSG-48 guidance. Increasingly requested as the global fleet pursues 60- and 80-year operation."
              }
            ].map(({ name, full, target, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: name }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
                    "— ",
                    full
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs text-primary mt-0.5", children: [
                    "Target: ",
                    target
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: desc })
                ]
              },
              name
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "INES: International Nuclear Event Scale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Developed jointly by the IAEA and OECD/NEA in 1990 to facilitate communication about nuclear events to the public and media. Events are classified on a logarithmic scale of 1–7 (plus Level 0) based on their radiological significance — analogous to the Richter scale for earthquakes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Level", "Name", "Definition", "Examples"],
                rows: [
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-destructive", children: "7" }, "7"),
                    "Major Accident",
                    "Major release of radioactive material; widespread health and environmental effects",
                    "Chernobyl (1986), Fukushima Daiichi (2011)"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-destructive", children: "6" }, "6"),
                    "Serious Accident",
                    "Significant release of radioactive material; full implementation of planned countermeasures required",
                    "Kyshtym (Mayak, USSR, 1957)"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-amber-500", children: "5" }, "5"),
                    "Accident with Wider Consequences",
                    "Limited off-site release; partial implementation of countermeasures required",
                    "Three Mile Island (1979), Windscale Fire (1957)"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-amber-500", children: "4" }, "4"),
                    "Accident with Local Consequences",
                    "Minor off-site release; significant damage to reactor; radiation injury to worker",
                    "Saint-Laurent A2 fuel melt (France, 1980)"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-yellow-500", children: "3" }, "3"),
                    "Serious Incident",
                    "Exposure above 10× annual limit; significant spread of contamination (near-miss)",
                    "Vandellós NPP fire (Spain, 1989)"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-yellow-500", children: "2" }, "2"),
                    "Incident",
                    "Significant failure in safety provisions; significant contamination on-site",
                    "Numerous reactor anomalies worldwide annually"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono font-bold text-muted-foreground",
                        children: "1"
                      },
                      "1"
                    ),
                    "Anomaly",
                    "Overexposure of individual; minor deviation from operating limits",
                    "Reported routinely; hundreds/year globally"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono font-bold text-muted-foreground",
                        children: "0"
                      },
                      "0"
                    ),
                    "Below Scale",
                    "No safety significance; no deviation from authorized limits",
                    "Equipment failures with no safety consequence"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Source: IAEA/OECD-NEA INES User's Manual (2009 Edition). Classification is made by the relevant national regulatory body and reported to the IAEA. Events at Levels 4 and above trigger IAEA notification and international assistance mechanisms." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "U.S. Nuclear Regulatory Commission (NRC)",
          badge: "intermediate",
          ocid: "regulation.nrc",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "The NRC is the primary nuclear safety regulator in the United States. Created by the Energy Reorganization Act of 1974 (splitting the Atomic Energy Commission into the NRC and the Energy Research and Development Administration), it is led by five commissioners appointed by the President and confirmed by the Senate to five-year terms, with no more than three from one political party. This multi-member commission structure is deliberately designed to prevent single-point capture by industry or executive branch influence." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Regulatory Programme by Regulation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["10 CFR Part", "Subject Matter", "Key requirements"],
                rows: [
                  [
                    "Part 50",
                    "Domestic licensing of production and utilization facilities (existing reactors)",
                    "Technical specifications, quality assurance, general design criteria (Appendix A), emergency core cooling (Appendix K)"
                  ],
                  [
                    "Part 52",
                    "Licenses, certifications, and approvals for nuclear power plants",
                    "Design certification (DC), early site permits (ESP), combined licenses (COL)"
                  ],
                  [
                    "Parts 30–40",
                    "Byproduct, source, and special nuclear material",
                    "Licenses for medical, industrial, and research use of radioisotopes"
                  ],
                  [
                    "Part 60/63",
                    "Disposal of high-level radioactive wastes in geological repositories",
                    "Performance objectives for 10,000 yr / 1 million yr; Yucca Mountain-specific"
                  ],
                  [
                    "Part 61",
                    "Licensing requirements for land disposal of radioactive waste",
                    "LLW classification, near-surface disposal facility requirements"
                  ],
                  [
                    "Part 71",
                    "Packaging and transportation of radioactive material",
                    "Type A and Type B package certification; coordinate with DOT regulations"
                  ],
                  [
                    "Part 72",
                    "Licensing requirements for the independent storage of spent nuclear fuel",
                    "Dry cask storage systems (ISFSIs); 20-yr licenses, renewable"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "New Reactor Licensing Process (10 CFR Part 52)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                step: "1",
                name: "Design Certification (DC)",
                dur: "2–4 years",
                desc: "NRC pre-approves a standard reactor design independent of any specific site. Applicant submits a 10,000+ page Final Safety Analysis Report (FSAR). Certified designs: AP1000 (Westinghouse), ESBWR (GE Hitachi), APR1400 (KEPCO), NuScale SMR. Certification valid for 15 years."
              },
              {
                step: "2",
                name: "Early Site Permit (ESP)",
                dur: "2–3 years",
                desc: "NRC approves site-specific characteristics — geology, hydrology, seismicity, emergency planning zone, demography — independent of final design choice. Valid for 10–20 years."
              },
              {
                step: "3",
                name: "Combined Operating License (COL)",
                dur: "3–5 years",
                desc: "Combines construction authorization and conditional operating license in a single NRC review. References an approved DC and ESP. Issued before construction begins. Inspections, Tests, Analyses and Acceptance Criteria (ITAAC) must be verified before fuel load."
              }
            ].map(({ step, name, dur, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs", children: step }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground/60", children: [
                      "(",
                      dur,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: desc })
                  ] })
                ]
              },
              step
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Operational Oversight: Reactor Oversight Process (ROP)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: 'Every licensed US reactor has two NRC resident inspectors on-site full time. The Reactor Oversight Process (ROP) tracks safety performance using a set of objective performance indicators (PIs) in seven "cornerstones of safety" — initiating events, mitigating systems, barrier integrity, emergency preparedness, occupational radiation safety, public radiation safety, and physical security.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["ROP Color", "Meaning", "NRC Response"],
                rows: [
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-semibold text-emerald-600 dark:text-emerald-400",
                        children: "Green"
                      },
                      "green"
                    ),
                    "Acceptable (baseline performance)",
                    "Normal inspection programme"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "White" }, "white"),
                    "Low-to-moderate safety significance",
                    "Increased NRC monitoring; supplemental inspection"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-yellow-500", children: "Yellow" }, "yellow"),
                    "Substantial safety significance",
                    "Detailed NRC inspection; public meeting; increased attention"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Red" }, "red"),
                    "Unacceptable performance",
                    "NRC determines if continued operation authorized; possible shutdown order"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Enforcement and Civil Penalties" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "The NRC enforcement programme issues Notices of Violation (NOVs), civil monetary penalties (up to $286,000 per violation per day as of 2024, adjusted for inflation under the Federal Civil Penalties Inflation Adjustment Act), and orders to modify, suspend, or revoke licenses. In cases of immediate safety concern — such as an inoperable emergency diesel generator with no compensatory measures — the NRC can issue an immediate order to shut down the reactor without prior hearing. The NRC also maintains an anonymous Allegation Program allowing workers to report safety concerns confidentially, with whistleblower protections under the Energy Reorganization Act Section 211." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Nuclear Security and IAEA Safeguards",
          badge: "intermediate",
          ocid: "regulation.security_safeguards",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Nuclear security and IAEA safeguards are legally and operationally distinct but complementary systems. Security is nationally implemented to prevent theft and sabotage. Safeguards are internationally implemented to verify non-diversion. Both are obligations for states party to the Nuclear Non-Proliferation Treaty (NPT)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Physical Protection of Nuclear Material (INFCIRC/225/Rev.5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: 'IAEA document INFCIRC/225/Rev.5 (2011) — "Nuclear Security Recommendations on Physical Protection of Nuclear Material and Nuclear Facilities" — is the globally recognized basis for national physical protection regulations. It categorizes nuclear material by attractiveness for weapons use and prescribes escalating protection requirements:' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Category",
                  "Example material",
                  "Protection level required"
                ],
                rows: [
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive", children: "Category I" }, "I"),
                    "Pu > 2 kg; HEU > 5 kg; U-233 > 2 kg",
                    "Maximum protection: armed guards, intrusion detection, 2-person rule, delay barriers, armed response force with <5 min response time"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-amber-500", children: "Category II" }, "II"),
                    "Pu 500 g–2 kg; HEU 1–5 kg; enriched U (10–20%) > 10 kg",
                    "High protection: security posts, intrusion detection, limited access areas, armed guards for transport"
                  ],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-yellow-500", children: "Category III" }, "III"),
                    "Low-enriched uranium < 10 kg; natural/depleted U > 500 kg",
                    "Enhanced protection beyond normal industrial security; access control, surveillance"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "The Insider Threat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "INFCIRC/225/Rev.5 and the Convention on Physical Protection of Nuclear Material (CPPNM 2016 Amendment) explicitly recognize the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "insider threat" }),
              " as one of the most significant risks in nuclear security. An insider — someone with authorized access to nuclear material or facilities — can circumvent external physical protection measures. Mitigation strategies include:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                name: "Personnel Reliability Program (PRP)",
                desc: "Pre-employment and continuous background investigations for individuals with unescorted access to Category I material. Psychological screening, financial checks, and ongoing behavioral monitoring. The US NRC requires a rigorous access authorization program under 10 CFR Part 73."
              },
              {
                name: "Two-Person Integrity (TPI) Rule",
                desc: "No single individual may have unescorted access to Category I nuclear material. Two authorized individuals must be present at all times — a direct countermeasure to the trusted-insider scenario. Required for all Highly Enriched Uranium (HEU) and separated plutonium handling."
              },
              {
                name: "Trustworthiness and Reliability Assessments",
                desc: "Periodic re-evaluations throughout an individual's authorized access period. Observable behavioral indicators (unexplained wealth, expressed grievances, disregard for security procedures) are monitored and investigated."
              },
              {
                name: "Compartmentalization of Information",
                desc: "Need-to-know controls ensure individuals with physical access have only the information necessary for their function. Full facility security plans are not accessible to all authorized personnel."
              }
            ].map(({ name, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: desc })
                ]
              },
              name
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Nuclear Security Summits and Global Threat Reduction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "Four Nuclear Security Summits (NSS) held between 2010 and 2016 brought together heads of state and government from more than 50 countries to address the threat of nuclear terrorism — specifically the risk of a non-state actor acquiring sufficient fissile material for an improvised nuclear device (IND)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Summit", "Location", "Key Outcomes"],
                rows: [
                  [
                    "NSS 2010",
                    "Washington, D.C.",
                    "53 countries committed to securing nuclear material within 4 years; Ukraine, Chile, Kazakhstan surrendered HEU stocks; Global Threat Reduction Initiative (GTRI) accelerated"
                  ],
                  [
                    "NSS 2012",
                    "Seoul, South Korea",
                    "Strengthened IAEA safeguards; additional HEU downblending commitments; progress on minimizing civilian HEU use in research reactors"
                  ],
                  [
                    "NSS 2014",
                    "The Hague, Netherlands",
                    "19 countries declared HEU-free; Belgium and Italy consolidated plutonium; cyber security of nuclear facilities formally added to agenda"
                  ],
                  [
                    "NSS 2016",
                    "Washington, D.C.",
                    "Five 'gift baskets' of voluntary national commitments on IAEA safeguards, nuclear forensics, INTERPOL cooperation, radiological source security, and insider threat programs; Action Plans for five international organizations"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed mb-4", children: [
              "The NSS process achieved significant reductions in the number of sites with Category I nuclear material globally. Between 2010 and 2016, more than 3.8 metric tons of HEU and plutonium were removed or eliminated, and 14 countries became HEU-free. The IAEA's",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Nuclear Security Fund" }),
              " ",
              "(NSF) continues to fund security upgrades and capacity building in states with limited resources."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "IAEA International Physical Protection Advisory Service (IPPAS)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "IPPAS missions review a state's national nuclear security regime — including legislative and regulatory framework, facility-level physical protection, and transport security — against IAEA nuclear security guidance. IPPAS is the nuclear security equivalent of the IRRS (which covers safety). As of 2024, over 70 IPPAS missions have been conducted. IPPAS missions are voluntary and confidential — results are not published — but follow-up missions track progress on recommendations. The IAEA",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Nuclear Security Series (NSS)" }),
              " ",
              "of publications, including 12 Nuclear Security Fundamentals and Recommendations documents, provides the standards framework against which IPPAS missions assess national programmes."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "IAEA Safeguards: How Verification Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "Under the NPT, non-nuclear-weapon states conclude a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Comprehensive Safeguards Agreement (CSA)" }),
              " ",
              "with the IAEA. The IAEA verifies that all nuclear material in the state is in peaceful use. Verification relies on three complementary methods:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: [
              {
                name: "Nuclear Material Accountancy",
                desc: "Operators maintain detailed records of all nuclear material — inventory changes, transfers, production, and losses. IAEA independently verifies these records through material balance reports and physical inventory verification (PIV) inspections."
              },
              {
                name: "Containment and Surveillance",
                desc: "IAEA installs tamper-indicating seals (TIDs) on fuel assemblies, transfer flasks, and storage locations. Surveillance cameras (optical and digital) monitor spent fuel pools and processing areas continuously. Data is transmitted to Vienna for analysis."
              },
              {
                name: "Inspections",
                desc: "Routine inspections confirm declared inventories. Short-Notice Random Inspections (SNRIs) and unannounced inspections are conducted under CSAs. The Additional Protocol (AP) allows environmental sampling, broader facility access, and short-notice inspection of any location in the state — significantly strengthening detection capability."
              }
            ].map(({ name, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: desc })
                ]
              },
              name
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Nuclear Non-Proliferation Treaty (NPT): Country Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: "The NPT (entered into force 1970) is the cornerstone of the global non-proliferation regime, with 191 states parties as of 2024. It recognizes five Nuclear Weapon States (NWS): US, Russia, UK, France, and China. Three countries (India, Pakistan, Israel) have never joined the NPT and possess nuclear weapons. North Korea (DPRK) announced its withdrawal in 2003." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "State / Group",
                  "NPT Status",
                  "Safeguards Agreement",
                  "Nuclear Weapons"
                ],
                rows: [
                  [
                    "USA, Russia, UK, France, China",
                    "NPT Nuclear Weapon States (Art. IX)",
                    "Voluntary Offer Agreement (VOA) — IAEA can inspect declared civilian facilities; weapons facilities excluded",
                    "Acknowledged; Art. VI commitment to pursue disarmament in good faith"
                  ],
                  [
                    "~184 non-nuclear NPT states",
                    "NPT Non-Nuclear Weapon States (NNWS)",
                    "Comprehensive Safeguards Agreement (CSA) required; Additional Protocol increasingly adopted (140+ states)",
                    "Prohibited under NPT Art. II"
                  ],
                  [
                    "India",
                    "Non-signatory (never joined NPT)",
                    "India-Specific Safeguards Agreement (IAEA INFCIRC/754, 2009) — covers 14 civilian facilities; military facilities excluded; US-India 123 Agreement enabled civil nuclear cooperation",
                    "Acknowledged; estimated ~160–170 warheads (SIPRI 2024); not party to NPT disarmament obligations"
                  ],
                  [
                    "Pakistan",
                    "Non-signatory (never joined NPT)",
                    "Facility-specific safeguards only on declared civilian items; no CSA; not member of NSG",
                    "Acknowledged; estimated ~170 warheads (SIPRI 2024); developing tactical nuclear weapons"
                  ],
                  [
                    "Israel",
                    "Non-signatory; policy of nuclear ambiguity",
                    "No CSA; no additional protocol; IAEA cannot inspect Israeli nuclear facilities",
                    "Neither confirmed nor denied; widely assessed at ~90 warheads (SIPRI 2024); Dimona reactor visible in satellite imagery"
                  ],
                  [
                    "North Korea (DPRK)",
                    "Announced withdrawal 2003 (disputed legality); was NPT NNWS 1985–2003",
                    "CSA nominally in force; IAEA inspectors expelled 2009; no access since",
                    "Acknowledged; estimated 40–50 warheads (2024); multiple UNSC resolutions; subject to international sanctions"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground italic", children: "Sources: SIPRI Yearbook 2024; IAEA Safeguards Statement 2023; Arms Control Association NPT Country Profiles; UN Office for Disarmament Affairs." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Key Legal Instruments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Instrument", "Year", "Parties", "Key obligation"],
                rows: [
                  [
                    "Treaty on Non-Proliferation of Nuclear Weapons (NPT)",
                    "1970",
                    "191",
                    "Non-nuclear states accept IAEA safeguards; nuclear states commit to disarmament objective (Art. VI)"
                  ],
                  [
                    "Comprehensive Safeguards Agreement (CSA, INFCIRC/153)",
                    "Ongoing",
                    "~180",
                    "All nuclear material in state under IAEA verification; right of access to all declared facilities"
                  ],
                  [
                    "Additional Protocol (AP, INFCIRC/540)",
                    "Ongoing",
                    ">140",
                    "Broader inspection access; environmental sampling; declarations of all nuclear-fuel-cycle activities"
                  ],
                  [
                    "Convention on Physical Protection of Nuclear Material (CPPNM)",
                    "1987/2016 Amendment",
                    "160+",
                    "Legally binding physical protection standards; criminalization of theft and sabotage; insider threat provisions added in 2016"
                  ],
                  [
                    "Nuclear Suppliers Group (NSG) Guidelines",
                    "1974",
                    "48 states",
                    "Export controls on nuclear technology, equipment, and materials; full-scope safeguards condition for export"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { children: "Specific quantities, configurations, or technical pathways for obtaining or using nuclear material for weapons purposes are restricted topics. The material here describes the publicly available framework for nuclear security and non-proliferation as published by the IAEA, NTI, and in peer-reviewed arms control literature." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Licensing, Periodic Safety Reviews, and Decommissioning",
          badge: "intermediate",
          ocid: "regulation.licensing_psr",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "A nuclear power plant's relationship with its regulator spans decades — from initial licensing through decades of operation with periodic reassessment, to eventual decommissioning. Each phase imposes distinct regulatory obligations." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Operating License Terms and Renewal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "In the US, operating licenses are initially valid for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "40 years" }),
              '. Operators may apply for a 20-year license renewal under 10 CFR Part 54 ("License Renewal Rule"). As of 2024, 96 reactors have received initial renewals (to 60 years). Subsequent license renewal (SLR) to 80 years has been granted for several units (e.g., Turkey Point units 3 and 4 in 2019). European regulators typically use similar 10-year periodic safety review cycles rather than fixed license terms.'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 text-sm mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "10 CFR Part 54 License Renewal Scope" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2", children: [
                "The NRC license renewal review focuses exclusively on",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "aging management" }),
                " — demonstrating that the effects of aging on passive, long-lived components will be adequately managed for the renewal period. Operational safety requirements (active components, technical specifications) are managed continuously under the existing operating license and are outside the renewal scope."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Key aging concerns evaluated:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "reactor pressure vessel neutron embrittlement, primary coolant pipe fatigue, concrete containment carbonation and cracking, electrical cable insulation degradation, steam generator tube corrosion and pitting." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Periodic Safety Review (PSR) — IAEA SSG-25 (2013)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              "Most countries outside the US require a comprehensive Periodic Safety Review (PSR) every",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "10 years" }),
              ' throughout plant life. The PSR compares the current plant state to modern safety standards (the "reference level"), identifies safety improvements, and informs the decision to continue operation or shut down. IAEA SSG-25 defines 14 safety factors for PSR evaluation:'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4", children: [
              "Plant design (comparison to current standards)",
              "Actual condition of structures, systems, components",
              "Equipment qualification (seismic, environmental)",
              "Aging management",
              "Deterministic safety analysis",
              "Probabilistic safety assessment (PSA)",
              "Hazard analysis (internal + external events)",
              "Safety performance (operating experience)",
              "Use of experience from other plants",
              "Organization and administration",
              "Procedures",
              "Human factors",
              "Emergency planning",
              "Impact on environment"
            ].map((factor, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-2 rounded border border-border/50 bg-muted/20 px-2 py-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-mono text-xs text-primary", children: String(i + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: factor })
                ]
              },
              factor
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Backfitting and Safety Improvements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: [
              'Regulators can require safety modifications ("backfits") to operating plants when a new safety issue is identified or standards are updated. In the US, the NRC backfitting rule (10 CFR 50.109) requires a backfit analysis demonstrating that the modification provides',
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "a substantial increase in the overall protection of public health and safety" }),
              " ",
              "and is cost-justified — except for backfits needed to bring a licensee into compliance with an existing requirement. Post-Fukushima backfits imposed by the NRC include hardened filtered containment vents (FLEX strategy) and enhanced spent fuel pool instrumentation, at a cost of ~$4–7 billion across the US fleet."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Decommissioning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Strategy", "Approach", "Typical duration", "Example"],
                rows: [
                  [
                    "DECON (Immediate Dismantlement)",
                    "Reactor dismantled shortly after shutdown; site released promptly",
                    "7–10 years",
                    "Zion Nuclear Power Station, Illinois"
                  ],
                  [
                    "SAFSTOR (Deferred Dismantlement)",
                    "Plant maintained in safe storage for decades; radioactive decay reduces dose rates; then dismantled",
                    "20–60 years then ~5 yr dismantlement",
                    "Humboldt Bay Power Plant, California"
                  ],
                  [
                    "ENTOMB (Discontinued by NRC)",
                    "Radioactive material entombed in-place; site restricted indefinitely",
                    "N/A — prohibited by NRC for commercial reactors",
                    "Historical Soviet military reactor concept"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
              "NRC regulations (10 CFR 50.75) require operators to maintain an",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "adequate decommissioning fund" }),
              " ",
              "throughout plant life. Estimates range from $300 million to over $1 billion per unit depending on reactor type, size, and decommissioning strategy. The fund is maintained in an independent trust and cannot be used for other purposes. Upon license termination, the site must meet an unrestricted release dose standard of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "≤ 25 mrem/yr (0.25 mSv/yr)" }),
              " ",
              "to any member of the critical group (10 CFR Part 20, Subpart E)."
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Regulation as default
};
