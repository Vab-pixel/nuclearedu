import { j as jsxRuntimeExports, c as BreadcrumbNav } from "./index-BllujZqD.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-rcuhA3iH.js";
import { C as CollapsibleSection } from "./CollapsibleSection-BuzkzCf8.js";
import { S as SectionCard } from "./SectionCard-BruuPt5P.js";
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
            className: "px-4 py-2 text-muted-foreground align-top",
            children: cell
          },
          headers[j] ?? j
        ))
      },
      String(row[0])
    )) })
  ] }) });
}
function InfoBox({
  children,
  variant = "default"
}) {
  const styles = {
    default: "bg-muted/30 border-border",
    warning: "bg-amber-500/10 border-amber-500/40",
    info: "bg-primary/10 border-primary/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `rounded-lg border p-4 text-sm text-muted-foreground space-y-2 mt-4 ${styles[variant]}`,
      children
    }
  );
}
function Industry() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbNav,
      {
        items: [
          { label: "Applications", href: "/applications" },
          { label: "Industrial Applications" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Techniques in Industry",
        subtitle: "From sterilizing surgical instruments to mapping underground oil reservoirs, nuclear methods deliver precision and reliability impossible to achieve by conventional means — generating an estimated $500 billion in global economic value annually.",
        audienceLevel: "intermediate",
        readTimeMin: 22
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "industry.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Scope and Economic Scale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Industrial nuclear applications span five major domains: radiation processing (sterilization, food preservation, polymer modification), non-destructive testing (industrial radiography, CT), nuclear gauges (level, density, thickness), radiotracer and analytical techniques (NAA, XRF), and borehole well logging. Crucially, none of these require fission reactors — they rely on sealed radioactive sources or particle accelerators, making them commercially deployable anywhere in the world." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "The IAEA estimates nuclear techniques in industry contribute approximately",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "$500 billion in global economic value" }),
          " ",
          "annually — more than the total electricity revenue from all the world's nuclear power plants. Yet this dimension of nuclear technology receives far less public attention."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Key Industrial Domains at a Glance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            headers: ["Domain", "Primary Technique", "Key Sectors"],
            rows: [
              [
                "Radiation processing",
                "Co-60 gamma / electron beam",
                "Healthcare, food, packaging, automotive"
              ],
              [
                "Non-destructive testing",
                "Ir-192 / Co-60 gamma radiography; CT",
                "Aerospace, pipelines, construction"
              ],
              [
                "Nuclear gauges",
                "Gamma absorption / backscatter; neutron moderation",
                "Oil refining, mining, papermaking, cement"
              ],
              [
                "Tracer & analytical",
                "Radiotracer injection; NAA; XRF",
                "Environmental, forensics, chemical engineering"
              ],
              [
                "Well logging",
                "Gamma, neutron, density tools",
                "Oil & gas exploration worldwide"
              ]
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "industry.radiation_processing",
          title: "Radiation Processing: Sterilization and Food Irradiation",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "industry.radiation_processing",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Medical Device Sterilization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Approximately",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "50% of all single-use medical devices" }),
              " ",
              "sold worldwide — syringes, catheters, surgical gloves, wound dressings, bone grafts — are sterilized by ionizing radiation before reaching the patient. The dominant method uses",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Cobalt-60" }),
              ", which emits highly penetrating 1.25 MeV gamma rays. Products sealed in their final packaging are conveyed on a track through a shielded irradiator cell, receiving a controlled absorbed dose (typically 25 kGy for sterility assurance level SAL = 10⁻⁶)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "The critical advantage over steam autoclaving or ethylene oxide (ETO) gas is that gamma irradiation works at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ambient temperature" }),
              " and causes no thermal damage to heat-sensitive polymers (polypropylene, polyethylene, nylon). ETO, the main alternative, is a toxic carcinogen requiring lengthy aeration cycles; regulatory pressure is accelerating the shift toward radiation sterilization. Linear electron accelerators (e-beams) up to 10 MeV are an accelerator-based alternative with the practical advantage of no long-lived radioactive source."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "No radioactivity is induced in products:" }),
              " ",
              "Photon energies used (Co-60: 1.25 MeV; e-beam: ≤10 MeV; X-ray from e-beam: ≤5 MeV) are below the threshold for photonuclear reactions in the carbon, hydrogen, and oxygen that make up most device materials. Sterilized products carry zero residual radioactivity."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Food Irradiation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Food irradiation has been approved by the World Health Organization (WHO), the Food and Agriculture Organization (FAO), and the IAEA since 1980 (Codex Alimentarius, 1985), and is currently permitted in more than ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "60 countries" }),
              ". The process kills insects, bacteria (including ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Salmonella" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "E. coli" }),
              " O157:H7, ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Listeria" }),
              "), moulds, and spores, extending shelf life and reducing foodborne illness without heating or altering chemical composition."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Dose Range", "Application", "Typical Foods"],
                rows: [
                  [
                    "Low (<1 kGy)",
                    "Sprout inhibition; insect disinfestation",
                    "Potatoes, onions, garlic; grain, spices, dried fruit"
                  ],
                  [
                    "Medium (1–10 kGy)",
                    "Shelf-life extension; pathogen reduction",
                    "Strawberries, mushrooms, poultry, seafood"
                  ],
                  [
                    "High (>10 kGy)",
                    "Commercial sterilization (aseptic packaging)",
                    "Prepared meals for immunocompromised patients; NASA astronaut food"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mt-4 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Sources used:" }),
              " Co-60 gamma rays penetrate deeply (useful for bulk cargo, dense foods); X-rays from electron accelerators are an alternative; electron beams (e-beam) have limited penetration (~5 cm) and are best for thin products like poultry pieces. Irradiated foods are internationally identified by the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radura symbol" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Common misconception:" }),
              " ",
              "Irradiated food does NOT become radioactive. The ionizing radiation passes through the food, killing microorganisms by breaking their DNA, without leaving any radioactive residue behind — analogous to how a chest X-ray does not make your lungs radioactive. Verification that food has been irradiated is possible via physical methods: electron paramagnetic resonance (EPR) detects radiation-induced radicals in bones and seeds; thermoluminescence (TL) and optically stimulated luminescence (OSL) detect radiation-induced charge trapping in mineral grains."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Polymer Modification by Radiation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Ionizing radiation initiates free-radical reactions in polymers, enabling industrial modifications impossible by conventional chemistry alone:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-none space-y-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radiation cross-linking of polyethylene (PEX):" }),
                  " ",
                  "Forms three-dimensional covalent networks, giving PEX pipe superior resistance to temperature, pressure, and creep compared to standard PE. Used in radiant floor heating, potable water systems, and hot water distribution. Heat-shrink tubing and radiation-cross-linked wire insulation are similarly produced."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radiation grafting:" }),
                  " ",
                  "Attaches functional monomers to polymer backbones, producing ion-exchange membranes (fuel cells), proton-exchange membranes, and specialty separation membranes. Replaces hazardous chemical processes in many applications."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radiation vulcanization:" }),
                  " ",
                  "An alternative to sulfur vulcanization of natural rubber latex (gloves, condoms, balloons), producing a sulfur-free, allergy-reduced product at lower temperature."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "industry.radiography",
          title: "Industrial Radiography and Non-Destructive Testing",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "industry.radiography",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: 'Non-destructive testing (NDT) using radiation allows inspectors to "see inside" welds, castings, pressure vessels, and aircraft structures without cutting or damaging the component. It is mandated by international codes (ASME, ISO, API) for safety-critical infrastructure.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Portable Gamma Radiography" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Portable ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "gamma cameras" }),
              " ",
              "house a sealed radioactive source (typically Ir-192 or Co-60) in a heavily shielded container. A cable drives the source into an exposure tube aimed at the item under inspection; a radiographic film or digital imaging plate on the far side captures the transmitted image. Denser material (metal, voids, inclusions) creates contrast in the image, revealing internal defects. These compact devices can be deployed to offshore oil platforms, bridge decks, and aircraft hangars where fixed X-ray equipment cannot reach."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Isotope",
                  "T½",
                  "Primary Energy",
                  "HVL in steel",
                  "Typical Application",
                  "Replacement Cycle"
                ],
                rows: [
                  [
                    "Ir-192",
                    "73.8 days",
                    "317 keV (avg)",
                    "~12 mm",
                    "Thin-wall pipe welds, small castings (up to ~100 mm steel)",
                    "~4 half-lives (~1 year)"
                  ],
                  [
                    "Co-60",
                    "5.27 years",
                    "1.25 MeV",
                    "~21 mm",
                    "Thick-wall pressure vessels, large castings (up to ~200 mm steel)",
                    "Every 5–7 years"
                  ],
                  [
                    "Se-75",
                    "119.8 days",
                    "265 keV (avg)",
                    "~9 mm",
                    "Small-bore pipe in petrochemical plants; limited access situations",
                    "~2 years"
                  ],
                  [
                    "Yb-169",
                    "32.0 days",
                    "93 keV (avg)",
                    "~4 mm",
                    "Very thin-wall components, electronics housings",
                    "~3–4 months"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-3 mb-4", children: "HVL = half-value layer — thickness of steel that reduces gamma intensity by 50%. Source replacement is driven by activity decay below the minimum required for acceptable exposure times." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Industrial Computed Tomography (CT)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Industrial CT systems rotate a component through a fan or cone beam of X-rays (from accelerator or X-ray tube) while a detector array collects transmission images at hundreds of angles. Reconstruction algorithms (filtered back-projection or iterative) produce full 3D volumetric datasets revealing internal voids, cracks, density variations, and assembly errors. Key applications include:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground", children: [
              "Aerospace: turbine blade internal cooling channel inspection; composite delamination detection",
              "Additive manufacturing: verify internal geometry of metal 3D-printed components against CAD model",
              "Electronics: inspect BGA solder joint integrity, PCB voids, counterfeit component detection",
              "Automotive: cylinder head casting quality, battery cell inspection",
              "Cultural heritage: non-invasive internal analysis of Egyptian mummies, archaeological artifacts"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Neutron Radiography" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "While X-rays interact with electrons (attenuated by dense materials like lead), thermal neutrons interact with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "atomic nuclei" }),
              " and are highly sensitive to light elements — particularly hydrogen. Neutron radiography excels where X-rays fail:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground", children: [
              "Aircraft turbine blades: detect coolant water ingress or organic lubricant distribution inside metal blades",
              "Nuclear fuel inspection: verify fuel pellet gaps and cladding integrity — impossible with gamma (fissile material absorbs strongly)",
              "Archaeological metal artifacts: locate organic materials (leather, wood) inside corroded bronze or iron",
              "Explosives detection: hydrogen-rich organic compounds stand out clearly against metal casings"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoBox, { variant: "warning", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-600 dark:text-amber-400 mb-1", children: "Regulatory Framework" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Industrial radiography is one of the most accident-prone sectors of radiation work due to portable high-activity sources used in uncontrolled field environments. In the United States, NRC 10 CFR Part 34 requires specific licensing, annual training, pocket dosimeters, alarming ratemeters, and strict survey procedures before and after each exposure. Source exchange (when an Ir-192 source is exhausted) must be performed by licensed personnel at approved facilities. Globally, the IAEA Code of Conduct on the Safety and Security of Radioactive Sources governs category 2 and 3 sources used in radiography." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "industry.gauges",
          title: "Nuclear Gauges and Level / Flow Measurement",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "industry.gauges",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Nuclear measurement gauges exploit the predictable interaction of gamma rays or neutrons with matter to infer physical properties — level, density, thickness, moisture — in real time and without contact with the process material. They are installed permanently in industrial plants worldwide, operating continuously and automatically." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Level Gauges (Gamma Transmission)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "A sealed Co-60 or Cs-137 source on one side of a tank or vessel beams gamma rays through the wall; a scintillation detector on the opposite side measures transmission. When the vessel is full (dense liquid or solid), count rate falls; when empty, count rate rises. Nuclear gauges are preferred over float, ultrasonic, or pressure gauges in applications where:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground mb-4", children: [
              "Process material is corrosive, highly viscous, or deposits fouling on sensors",
              "Vessel is under extreme pressure or temperature (molten glass, molten metals, high-pressure reactors)",
              "Explosive vapors make electrical intrusion unsafe",
              "Vessel wall cannot be penetrated (retrofits to existing plants)"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Industries: oil refining (distillation column level), cement production (clinker level), food and beverage, pharmaceutical (vessel fill level during sterile processing)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Density Gauges" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Beer-Lambert attenuation:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground text-xs bg-muted px-1 rounded", children: "I = I₀ · exp(−μρx)" }),
              " ",
              "means transmitted gamma intensity depends on density ρ (and known thickness x and mass attenuation coefficient μ). Am-241 (59.5 keV) or Cs-137 sources with scintillation detectors provide continuous, real-time slurry density in:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground mb-4", children: [
              "Mining: mineral slurry pipelines (concentration control, throughput optimization)",
              "Paper manufacturing: basis weight measurement (grams per m² of paper sheet) at full production speed",
              "Dredging: real-time dredge spoil density",
              "Cement: raw meal slurry density in wet-process kilns"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Thickness Gauges and XRF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Technique",
                  "Source / Radiation",
                  "Typical Range",
                  "Application"
                ],
                rows: [
                  [
                    "Beta transmission gauge",
                    "Sr-90 (β⁻, 546 keV) or Tl-204 (β⁻, 764 keV)",
                    "0.01–10 mm",
                    "Plastic film, thin paper, metal foil production lines"
                  ],
                  [
                    "Gamma backscatter gauge",
                    "Am-241 (γ, 59.5 keV)",
                    "0.1–50 mm",
                    "One-sided access: coating thickness, road surface density"
                  ],
                  [
                    "X-ray fluorescence (XRF)",
                    "X-ray tube or Am-241 excitation",
                    "ppm–wt%",
                    "Alloy sorting (scrap metal), lead paint testing, soil analysis, plating thickness"
                  ],
                  [
                    "Neutron moisture gauge",
                    "Am-241+Be fast neutron source",
                    "0–40% moisture",
                    "Soil compaction (road, dam construction), agricultural moisture"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "XRF (X-ray fluorescence) operating principle:" }),
              " ",
              "Incident X-rays eject inner-shell (K or L) electrons from atoms in the sample. Outer-shell electrons fall inward, emitting characteristic fluorescent X-rays whose energies are unique to each element (Moseley's law). A detector measures the energy spectrum, identifying and quantifying elements. Modern portable XRF devices can analyze 40+ elements simultaneously in under 30 seconds, with no sample preparation and no destruction of the sample."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "industry.tracers",
          title: "Radiotracer Techniques and Radiochemical Analysis",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "industry.tracers",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "The Radiotracer Principle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: 'A radiotracer is a tiny amount of a radionuclide (or radiolabeled compound) injected into a process or environment. Because it behaves chemically identically to the stable element while emitting detectable radiation, it acts as a perfect "spy" on the movement of material. Detection can be from outside a pipe, vessel, or the human body — no sampling or interruption required.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Application Domain",
                  "Tracer Used",
                  "What Is Measured",
                  "Benefit"
                ],
                rows: [
                  [
                    "Pipeline leak detection",
                    "Br-82 (T½ 35.3 h, γ)",
                    "Location of activity peak outside pipe → leak location",
                    "Locates leaks in buried pipelines without excavation"
                  ],
                  [
                    "Chemical reactor diagnostics",
                    "Tc-99m or Kr-85",
                    "Residence time distribution (RTD): F-curve, E-curve analysis",
                    "Quantifies mixing efficiency; detects bypassing and dead zones"
                  ],
                  [
                    "Groundwater hydrology",
                    "Tritium (H-3, T½ 12.3 yr) or Br-82",
                    "Velocity, dispersivity, aquifer connectivity",
                    "Maps groundwater flow without drilling new wells"
                  ],
                  [
                    "River / estuary dispersion",
                    "Br-82 or In-113m injection",
                    "Downstream activity vs. time profile",
                    "Calibrates dispersion models for pollution studies"
                  ],
                  [
                    "Blood volume measurement",
                    "Tc-99m-albumin or Cr-51-RBCs",
                    "Dilution of labeled protein/cells in bloodstream",
                    "Non-invasive, one-sample method; clinical gold standard"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Neutron Activation Analysis (NAA)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "NAA is among the most sensitive multi-element analytical techniques known, capable of detecting concentrations at the parts-per-billion (ppb) to parts-per-trillion (ppt) level in many matrices. A sample is irradiated with thermal neutrons in a research reactor; elements absorb neutrons to form radioactive isotopes whose identities and concentrations are determined from their characteristic gamma-ray energies and half-lives:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center font-mono text-sm text-foreground bg-muted/40 rounded-lg px-4 py-3 mb-4", children: "²³X + n → ²⁴X* + γ (prompt) → ²⁴X → (β⁻, γ delayed) → daughter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Instrumental NAA (INAA)" }),
              " ",
              "is fully non-destructive — the sample is sealed in a capsule, mailed to a reactor facility, irradiated, returned, and its gamma spectrum analyzed. No sample dissolution or chemical separation is needed. Advantages over other methods:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground mb-4", children: [
              "Simultaneous analysis of 30–40 elements in a single irradiation",
              "No blank or reagent contamination (reagents not needed for INAA)",
              "Matrix-independent — works on air filters, rock, hair, blood, metal, sediment",
              "Reference standard approach gives absolute accuracy traceable to NIST"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoBox, { variant: "info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "NAA in Action: Art Authenticity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'The most famous application of NAA to art history involved the supposed Vermeer masterpiece "Supper at Emmaus," purchased by the Boijmans Museum in 1937 for a fortune. In 1967, Bernard Keisch (Carnegie-Mellon University) used NAA on paint samples to measure lead-210 and radium-226 in white lead pigment. Authentic 17th-century white lead has very low Pb-210 (most has decayed); freshly made white lead shows the full secular equilibrium level. The painting showed modern Pb-210 activity — exposing it as a 20th-century forgery by Han van Meegeren, one of the most audacious art frauds in history. He was already in prison when the test confirmed what art historians had suspected.' })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Portable X-ray Fluorescence (pXRF)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Modern portable XRF analyzers — handheld devices the size of a barcode scanner — have transformed field geochemistry, scrap metal processing, and environmental site assessment. They can identify and quantify 40+ elements in 3–10 seconds with no sample preparation. A scrap metal dealer can sort stainless steel grades (304 vs. 316) in seconds; an environmental consultant can screen soil for arsenic, lead, and chromium across hundreds of sampling points per day; a museum conservator can determine the elemental composition of a painting's pigments without removing a single flake." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "industry.well_logging",
          title: "Oil and Gas Well Logging",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "industry.well_logging",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Wireline logging is the practice of lowering a string of instruments (logging tools) into a borehole to measure the physical and chemical properties of the surrounding rock formations. Nuclear logging tools are central to nearly every commercial oil and gas well drilled worldwide — they provide the primary data used to estimate porosity, fluid saturation, and reserves." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "The Four Major Nuclear Logging Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Tool",
                  "Nuclear Method",
                  "Measured Quantity",
                  "Formation Property Derived"
                ],
                rows: [
                  [
                    "Natural gamma-ray log (GR)",
                    "Passive: detects natural K-40, U, Th gamma rays in formation",
                    "Total gamma count rate (API units)",
                    "Shale/clay content (shaly formations are K/U/Th-rich); lithology"
                  ],
                  [
                    "Spectral gamma-ray log (SGR)",
                    "Passive: energy-resolves K, U, Th peaks",
                    "K (%), eU (ppm), eTh (ppm) concentrations",
                    "Distinguish clay type, detect uranium mineralization, source rock evaluation"
                  ],
                  [
                    "Neutron porosity log (CNL)",
                    "Am-241+Be fast neutron source; thermal neutron detectors",
                    "Near/far detector count rate ratio",
                    "Hydrogen index → porosity in liquid-filled formations"
                  ],
                  [
                    "Density log (FDC/LDT)",
                    "Cs-137 gamma source (662 keV); Compton backscatter detectors",
                    "Bulk density ρ_b (g/cm³)",
                    "Porosity (from grain density); lithology; gas identification"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Pulsed Neutron Tools (Accelerator-Based)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Modern pulsed neutron logging tools replace radioactive sources with miniature D-T (deuterium-tritium) fusion neutron generators producing 14 MeV neutron bursts. These allow time-gated measurement of gamma rays after the neutron pulse, separating inelastic scatter (prompt) from neutron capture (delayed) signals. Key measurements:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-2 text-sm text-muted-foreground", children: [
              {
                title: "Sigma (Σ) — thermal neutron capture cross-section:",
                text: "Salt water has Σ ≈ 80 capture units (c.u.) due to chlorine; fresh water ≈ 22 c.u.; oil ≈ 22 c.u.; limestone ≈ 7 c.u. Distinguishes saline water from oil/gas in cased (steel) holes where resistivity tools cannot penetrate."
              },
              {
                title: "Carbon/Oxygen (C/O) ratio:",
                text: "Inelastic gamma yield ratio of carbon to oxygen. Oil has high C content; water has high O content → C/O ratio distinguishes oil-bearing from water-bearing formations independent of salinity. Essential for cased-hole saturation monitoring."
              },
              {
                title: "Spectral sigma:",
                text: "Full capture gamma spectrum resolves contributions from Si, Ca, Mg, Fe, Cl, H → quantitative mineralogy even in a cased borehole."
              }
            ].map(({ title, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: title }),
                " ",
                text
              ] })
            ] }, title)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Integrated Formation Evaluation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: 'Petrophysicists combine the neutron and density logs using the classic "crossplot porosity" method. In a gas-bearing zone, the neutron log reads anomalously low (gas has low hydrogen density) and the density log reads anomalously low (gas is less dense than liquid). This characteristic "gas crossover" (neutron below density) is one of the most reliable gas indicators in wireline log analysis.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Economic significance:" }),
              " ",
              "Nuclear logging techniques are used in virtually all of the approximately 60,000–70,000 oil and gas wells drilled annually worldwide. Without them, drillers would have no reliable way to identify where oil and gas are located within the rock column — they would be drilling blind. The revenue from reserves identified by nuclear logs underpins the entire global hydrocarbon economy."
            ] }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  Industry as default
};
