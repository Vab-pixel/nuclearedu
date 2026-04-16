import { j as jsxRuntimeExports, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-D72vKdFv.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-ofvrIJP7.js";
import { E as EquationBlock } from "./EquationBlock-D9ydULky.js";
import { S as SafetyCallout } from "./SafetyCallout-l4dd5GYV.js";
import { S as SectionCard } from "./SectionCard-BzQex3f6.js";
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
function MedicinePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Medicine",
        subtitle: "Radioactive isotopes as precision tools for diagnosis and therapy — imaging metabolic function in living patients and delivering targeted radiation doses to cancer cells.",
        audienceLevel: "intermediate",
        readTimeMin: 26
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "medicine.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Nuclear Medicine: Diagnosis and Therapy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "Nuclear medicine exploits the behaviour of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "radioactive tracers" }),
          " in the human body to image physiological function and deliver therapeutic radiation doses with cellular-level precision. Unlike X-ray, CT, or MRI, which primarily reveal anatomy, nuclear medicine uniquely measures",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "metabolic activity, blood flow, receptor density, and gene expression" }),
          " ",
          "— functional information invisible to purely structural imaging. A gamma camera or PET scanner does not see a tumour because of its shape, but because it consumes more glucose, overexpresses a receptor, or accumulates a tracer through specific biological uptake mechanisms."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "The IAEA estimates approximately",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "60 million nuclear medicine procedures" }),
          " ",
          "are performed annually worldwide, growing at ~5% per year driven by ageing populations, increasing cancer incidence, and the dramatic expansion of targeted radionuclide therapy. The single most important radiopharmaceutical is",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Technetium-99m (Tc-99m)" }),
          ", used in approximately 80% of all diagnostic nuclear medicine procedures globally — ~40 million per year — making the Mo-99/Tc-99m generator system a critical piece of global healthcare infrastructure."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-5", children: [
          "The emerging paradigm of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "theranostics" }),
          ' — using the same molecular target for both diagnosis (with an imaging-suitable radionuclide) and therapy (with a therapeutic radionuclide) — is fundamentally changing oncology. The canonical example is PSMA (prostate-specific membrane antigen): image with ⁶⁸Ga-PSMA PET to confirm PSMA expression, then treat the same patient with ¹⁷⁷Lu-PSMA-617 targeting the same receptor. This "see and treat" precision approach is now FDA-approved and increasingly standard of care.'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mb-2", children: [
          {
            title: "Diagnostic Imaging",
            subtitle: "SPECT & PET",
            desc: "Gamma and positron-emitting tracers reveal organ function, metabolism, and receptor expression in 3D. Oncology, cardiology, neurology, infection."
          },
          {
            title: "Radionuclide Therapy",
            subtitle: "Targeted radiotherapy",
            desc: "Beta and alpha emitters attached to targeting vectors deliver lethal radiation doses to tumour cells from within, sparing surrounding healthy tissue."
          },
          {
            title: "Theranostics",
            subtitle: "Same target; diagnose + treat",
            desc: "One targeting molecule, two radionuclides: one for imaging to confirm target expression, one for therapy. PSMA (prostate), DOTATATE (NETs) are clinical examples."
          }
        ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-muted/30 p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: c.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mb-1", children: c.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: c.desc })
            ]
          },
          c.title
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "SPECT: The Workhorse of Nuclear Medicine",
          badge: "intermediate",
          ocid: "medicine.spect",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "SPECT (Single Photon Emission Computed Tomography) is the most widely performed nuclear medicine technique globally, accounting for ~75% of all nuclear medicine scans. SPECT cameras consist of one, two, or three large-area scintillation detector heads (typically NaI(Tl) crystals, 9.5 mm thick, with photomultiplier tube arrays) that rotate around the patient, detecting single gamma photons emitted by the radiotracer inside the body. A lead collimator (parallel-hole, fan-beam, or pinhole) mechanically defines photon directionality — only photons travelling nearly parallel to collimator channels are accepted. Tomographic reconstruction via filtered back-projection (FBP) or iterative OSEM algorithms generates a 3D radiotracer distribution map at ~10–15 mm spatial resolution." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Technetium-99m: The Ideal SPECT Agent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Tc-99m has become the dominant SPECT tracer because its physical properties are remarkably well matched to the requirements of gamma camera imaging:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
              [
                "Half-life",
                "6.01 hours — short enough to limit patient dose; long enough for preparation, shipping, and the full imaging examination"
              ],
              [
                "Gamma energy",
                "140.5 keV — optimal window: low enough for efficient NaI crystal detection; not so high that it escapes through the patient; above the energy range of most tissue-scattered photons"
              ],
              [
                "Emission type",
                "Isomeric transition (IT) — emits only a gamma photon (no beta particle), minimising absorbed patient dose"
              ],
              [
                "Chemistry",
                "Tc(VII) from the generator is easily reduced to Tc(IV–V) with stannous chloride and radiolabels a wide variety of pharmaceutical kits within minutes at room temperature"
              ],
              [
                "Generator delivery",
                "Mo-99/Tc-99m generators ('moly cows') eluted daily by hospital radiopharmacists — no cyclotron or on-site reactor required"
              ],
              [
                "Clinical volume",
                "~20 million SPECT procedures in the US annually; ~40 million worldwide (IAEA 2020)"
              ]
            ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                k,
                ": "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: v })
            ] }, String(k))) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Mo-99/Tc-99m Generator System — Supply Chain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: 'Tc-99m cannot itself be stockpiled (T½ = 6 h), but its parent Mo-99 (T½ = 66.02 h) can be shipped in generator columns and will produce Tc-99m for ~5–7 days in the hospital. The "moly cow" generator consists of an alumina (Al₂O₃) column onto which molybdate (MoO₄²⁻) is adsorbed. As Mo-99 decays to Tc-99m, pertechnetate (TcO₄⁻) is mobile on the column and can be eluted with saline ("milked"). Mo-99 itself is reactor-produced by fission of U-235 targets (LEU preferred to minimise HEU use):' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^{235}_{92}\\text{U} + n \\rightarrow \\text{Fission products including } ^{99}_{42}\\text{Mo} \\xrightarrow{\\beta^-, T_{1/2}=66\\,\\text{h}} ^{99m}_{43}\\text{Tc} \\xrightarrow{\\text{IT}, 140.5\\,\\text{keV}, T_{1/2}=6.01\\,\\text{h}} ^{99}_{43}\\text{Tc}",
                annotation: "Mo-99 is produced with a fission yield of ~6.1% from U-235 targets in high-flux research reactors. The secular equilibrium between Mo-99 and Tc-99m in the generator column means that about 87% of the theoretical maximum Tc-99m activity is available for elution 24 hours after the previous elution. Tc-99 (stable from isomeric transition) is the final stable product, present in nanomolar quantities in the eluate — far below any pharmacological effect.",
                label: "Mo-99 → Tc-99m Production and Decay Chain"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Global Mo-99 supply is highly concentrated: approximately",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "5 research reactors supply ~95% of world demand" }),
              ". The 2009–2010 global Mo-99 shortage — triggered by extended shutdowns at NRU (Canada) and HFR (Netherlands) simultaneously — forced the cancellation or postponement of hundreds of thousands of cardiac stress tests and cancer scans worldwide, demonstrating a critical single-point-of-failure vulnerability in this healthcare supply chain:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Reactor",
                  "Country",
                  "Thermal Power",
                  "Mo-99 Share (approx.)",
                  "Status (2024)"
                ],
                rows: [
                  [
                    "HFR (High Flux Reactor)",
                    "Netherlands",
                    "45 MW",
                    "~30%",
                    "Operating; operated by NRG; planned for replacement by PALLAS (~2030)"
                  ],
                  [
                    "BR2",
                    "Belgium",
                    "100 MW",
                    "~25%",
                    "Operating; operated by SCK-CEN; refurbishment ongoing"
                  ],
                  [
                    "Safari-1",
                    "South Africa",
                    "20 MW",
                    "~15–20%",
                    "Operating; Necsa; first reactor to convert fully to LEU targets"
                  ],
                  [
                    "MURR (Missouri University Research Reactor)",
                    "USA",
                    "10 MW",
                    "~5–10%",
                    "Operating; increasing Mo-99 production capacity"
                  ],
                  [
                    "LVR-15",
                    "Czech Republic",
                    "10 MW",
                    "~5%",
                    "Operating; ÚJV Řež; post-NRU capacity addition"
                  ],
                  [
                    "NRU",
                    "Canada",
                    "135 MW",
                    "~30% (historic)",
                    "Permanently shutdown May 2018; was world's largest Mo-99 producer"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Sources: OECD/NEA Mo-99 Supply Chain Security (2022); IAEA Nuclear Medicine Isotope Supply Report. Accelerator-based Mo-99 production (SHINE Medical Technologies, Wisconsin, USA) is now supplementing reactor supply using neutron irradiation of U solutions via photofission with electron linear accelerators — reducing reactor dependency." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Common SPECT Applications and Tracers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Tracer", "T½", "Key Application", "Annual Volume (US)"],
                rows: [
                  [
                    "⁹⁹ᵐTc-sestamibi or tetrofosmin",
                    "6.01 h",
                    "Myocardial perfusion imaging (MPI): detect coronary artery disease; stress/rest protocol reveals ischaemia vs. infarct",
                    "~9 million/yr"
                  ],
                  [
                    "⁹⁹ᵐTc-MDP",
                    "6.01 h",
                    "Bone scan: whole-body screening for metastases, fractures, osteomyelitis, Paget's disease",
                    "~5 million/yr"
                  ],
                  [
                    "⁹⁹ᵐTc-MAG3 / DTPA",
                    "6.01 h",
                    "Renal function (GFR, tubular secretion, obstruction), split renal function, renovascular hypertension",
                    "~1.5 million/yr"
                  ],
                  [
                    "⁹⁹ᵐTc-pertechnetate",
                    "6.01 h",
                    "Thyroid uptake/scan; Meckel's diverticulum; salivary gland function",
                    "~0.5 million/yr"
                  ],
                  [
                    "⁹⁹ᵐTc-MAA",
                    "6.01 h",
                    "Pulmonary perfusion (V/Q scan) for pulmonary embolism diagnosis",
                    "~0.8 million/yr"
                  ],
                  [
                    "⁹⁹ᵐTc-HMPAO / ECD",
                    "6.01 h",
                    "Brain perfusion SPECT: dementia, epilepsy, cerebrovascular disease",
                    "~0.3 million/yr"
                  ],
                  [
                    "¹²³I-MIBG",
                    "13.2 h",
                    "Pheochromocytoma, paraganglioma, neuroblastoma; cardiac sympathetic innervation (heart failure assessment)",
                    "~0.1 million/yr"
                  ],
                  [
                    "²⁰¹Tl-chloride",
                    "73 h",
                    "Historical cardiac perfusion (now largely replaced by Tc-99m agents); parathyroid scan",
                    "Declining"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Source: SNM/EANM procedural guidelines; IAEA Human Health Reports; SNMMI Image Gently data. US volumes are approximate based on hospital billing data." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "PET: High-Resolution Molecular Imaging",
          badge: "intermediate",
          ocid: "medicine.pet",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Positron Emission Tomography (PET) achieves higher spatial resolution and far greater sensitivity than SPECT by exploiting the physics of positron-electron annihilation. PET tracers decay by positron (β⁺) emission; the positron travels a short distance in tissue (a few millimetres depending on energy), slows, and annihilates with an ambient electron, producing",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "two 511 keV photons emitted simultaneously at exactly 180° to each other" }),
              `. A PET scanner's ring of scintillator detectors registers only events where two opposing detectors fire within a coincidence time window (~4–6 ns), defining a "line of response" through the patient without any physical collimator. This electronic collimation gives PET 10–100× greater sensitivity than SPECT.`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "e^+ + e^- \\rightarrow \\gamma_1 + \\gamma_2 \\quad (511\\,\\text{keV each},\\ 180^\\circ \\pm 0.25^\\circ)",
                annotation: "Positron-electron annihilation. The slight angular deviation (0.25° FWHM) from 180° arises from the residual momentum of the positron-electron pair at annihilation, and is the dominant physical factor limiting PET spatial resolution to ~2–3 mm in modern scanners (independent of detector crystal size). The coincidence window timing in state-of-the-art scanners is now as short as 210 ps, enabling time-of-flight (TOF) PET — localising the annihilation point along the LOR to within ~3 cm, significantly improving image quality and reducing noise.",
                label: "Positron-Electron Annihilation — PET Principle"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "PET vs. SPECT: Technical Comparison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Parameter", "PET", "SPECT"],
                rows: [
                  [
                    "Spatial resolution",
                    "4–6 mm (clinical); 1–2 mm (pre-clinical)",
                    "10–15 mm (standard); 6–8 mm (CZT-based)"
                  ],
                  [
                    "Sensitivity",
                    "~10⁻¹¹–10⁻¹² mol/L detectable",
                    "~10⁻⁸–10⁻⁹ mol/L (100–1,000× lower)"
                  ],
                  [
                    "Quantification",
                    "Absolute (Bq/mL, SUV); highly accurate",
                    "Semi-quantitative; attenuation correction required"
                  ],
                  [
                    "Collimation",
                    "Electronic (coincidence); no physical collimator",
                    "Physical lead collimator (rejects ~99.9% of photons)"
                  ],
                  ["Typical scan duration", "15–30 min", "15–45 min"],
                  [
                    "Radionuclide supply",
                    "On-site cyclotron or regional radiopharmacy (F-18); generator (Ga-68)",
                    "Generator-based (Tc-99m) — no cyclotron needed for most"
                  ],
                  [
                    "Cost",
                    "Higher (scanner ~$1.5–3M; cyclotron ~$2–5M if on-site)",
                    "Lower (scanner ~$300K–1M; generator ~$1,000–5,000/wk)"
                  ],
                  ["Annual US procedures", "~8 million", "~20 million"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "¹⁸F-FDG: The Dominant PET Tracer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Fluorodeoxyglucose (FDG) is a glucose analogue in which the hydroxyl group at the 2-position is replaced by ¹⁸F. Cells take up FDG via glucose transporters (GLUT1/GLUT3) and phosphorylate it via hexokinase — but unlike glucose-6-phosphate, FDG-6-phosphate cannot continue glycolysis and is metabolically trapped in proportion to the cell's glucose utilisation rate. Rapidly dividing tumour cells (Warburg effect) and active brain neurons exhibit markedly elevated FDG uptake." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Production:" }),
              " F-18 is produced by proton bombardment of ",
              "¹⁸",
              "O-enriched water (H₂¹⁸O) in a medical cyclotron at 16–18 MeV proton energy: ¹⁸O(p,n)¹⁸F. A typical 30-minute bombardment produces 50–150 GBq of F-18 fluoride, which is then rapidly automated-synthesised into FDG in a hot-cell, quality-tested, and distributed. The 109.8 min half-life allows distribution within a ~3 hour radius of the cyclotron (~several hundred km)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "FDG PET is the standard-of-care imaging tool for staging, restaging and treatment response assessment in most common cancers. The SUV (Standardised Uptake Value) metric quantifies regional FDG uptake and is widely used to define response criteria:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\text{SUV} = \\frac{\\text{Tissue radioactivity concentration (kBq/mL)}}{\\text{Injected activity (kBq)} / \\text{Body weight (g)}}",
                annotation: "SUV > 2.5 is a commonly used (though imperfect) threshold for metabolically active malignancy on FDG PET. SUVmax (maximum voxel SUV in a lesion) and SUVmean (mean over a defined volume) are both used clinically. Deauville 5-point scale for lymphoma response uses SUV relative to mediastinal blood pool and liver as reference organs. Post-therapy, a decrease in SUVmax >30% (PERCIST criteria) indicates metabolic response.",
                label: "Standardised Uptake Value (SUV)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Key PET Tracers Beyond FDG" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Tracer",
                  "T½",
                  "Target / Mechanism",
                  "Key Applications",
                  "FDA Status"
                ],
                rows: [
                  [
                    "¹⁸F-FDG",
                    "110 min",
                    "Glucose metabolism (GLUT transporter, hexokinase)",
                    "Oncology staging/restaging (most cancers); Alzheimer's; epilepsy; FUO/infection",
                    "Approved"
                  ],
                  [
                    "⁶⁸Ga-PSMA-11 / ¹⁸F-PSMA-1007",
                    "68 min / 110 min",
                    "PSMA receptor overexpressed on prostate cancer cells",
                    "Prostate cancer staging, biochemical recurrence, pre-PSMA therapy selection",
                    "FDA approved (Ga-68 PSMA-11: 2020; F-18 PyL/DCFPyL: 2021)"
                  ],
                  [
                    "⁶⁸Ga-DOTATATE / DOTATOC / DOTANOC",
                    "68 min",
                    "Somatostatin receptors SSTR2/5 on neuroendocrine tumours",
                    "NET staging, restaging, selection for PRRT; superior to Octreoscan SPECT",
                    "FDA approved (NETSPOT/⁶⁸Ga-DOTATATE: 2016)"
                  ],
                  [
                    "¹⁸F-NaF (sodium fluoride)",
                    "110 min",
                    "Bone matrix (hydroxyapatite) incorporation at remodelling sites",
                    "Bone metastases detection; superior sensitivity vs. Tc-99m bone scan; prostate, breast, lung",
                    "FDA approved"
                  ],
                  [
                    "¹⁸F-Florbetapir / Florbetaben / Flutemetamol",
                    "110 min",
                    "Amyloid-β plaques (Alzheimer's pathology)",
                    "Amyloid PET: exclude Alzheimer's in atypical dementia; pre-clinical research; anti-amyloid therapy selection",
                    "FDA approved"
                  ],
                  [
                    "¹⁸F-Flortaucipir (AV-1451)",
                    "110 min",
                    "Tau neurofibrillary tangles",
                    "Tau PET: Alzheimer's staging, tauopathy differentiation; now FDA approved",
                    "FDA approved (2020)"
                  ],
                  [
                    "⁶⁸Ga-FAPI (FAP inhibitor)",
                    "68 min",
                    "Fibroblast activation protein on cancer-associated fibroblasts",
                    "Broad-spectrum oncology; superior FDG in many low-FDG tumours; emerging",
                    "IND / investigational"
                  ],
                  [
                    "¹¹C-PiB (Pittsburgh Compound B)",
                    "20.4 min",
                    "Amyloid-β plaques",
                    "Research tool for amyloid load quantification; requires on-site cyclotron",
                    "Research use only"
                  ],
                  [
                    "¹³N-Ammonia",
                    "9.97 min",
                    "Myocardial blood flow (flow tracer)",
                    "Cardiac perfusion PET: quantitative myocardial blood flow (mL/min/g); superior to SPECT; requires on-site cyclotron",
                    "FDA approved"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "PET/CT and PET/MRI: Hybrid Systems" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Virtually all clinical PET scanners are now combined PET/CT or PET/MRI systems, providing simultaneous functional (PET) and anatomical (CT or MRI) data in a single examination:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "PET/CT (standard):" }),
                " CT provides attenuation correction map, precise lesion anatomical localisation (CT resolution ~1 mm), and diagnostic CT if full dose is acquired. Whole-body PET/CT in 15–20 min. Now the global standard of care for oncology staging."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "PET/MRI:" }),
                " Superior soft-tissue contrast vs. CT; no ionising radiation from anatomical component; simultaneous acquisition enables motion-correction. Currently ~$5–7M per system; clinically available at major centres. Key advantage in brain, liver, pelvis, paediatric oncology, and musculoskeletal oncology where soft tissue detail is paramount."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Total-body PET (uEXPLORER):" }),
                " ",
                "194-cm axial field-of-view scans the entire body simultaneously. 50–200× more sensitive than conventional PET; enables 30-second whole-body scans or extreme low-dose acquisitions. First clinical systems installed 2018–2019 (UC Davis, Zhongshan Hospital Shanghai)."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Radionuclide Therapy — Targeted Radiation to Treat Cancer",
          badge: "intermediate",
          ocid: "medicine.therapy",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Targeted radionuclide therapy (TRT) — also called molecular radiotherapy — delivers therapeutic radiation specifically to cancer cells by attaching a therapeutic radionuclide to a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "targeting vector" }),
              ": a molecule (peptide, small molecule, antibody, or nanoparticle) that preferentially accumulates in tumour tissue via specific biological uptake. The radiation — typically beta particles or alpha particles — destroys cancer cells from within, while the short range of emissions limits damage to surrounding healthy tissue. This is fundamentally different from external beam radiotherapy, which must traverse healthy tissue to reach the tumour."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Particle Ranges and Radiobiology" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Particle Type",
                  "Typical Nuclides",
                  "Range in Tissue",
                  "LET (Linear Energy Transfer)",
                  "Optimal Tumour Size",
                  "DNA Damage Type"
                ],
                rows: [
                  [
                    "Beta⁻ (β⁻)",
                    "Lu-177, I-131, Y-90, P-32",
                    "0.2–12 mm",
                    "Low (~0.2 keV/μm)",
                    "Medium-large; heterogeneous uptake: crossfire effect compensates",
                    "Mainly indirect (free radical); 1–2 strand breaks"
                  ],
                  [
                    "Alpha (α)",
                    "Ra-223, At-211, Bi-213, Ac-225",
                    "40–100 μm (~2–10 cell diameters)",
                    "Very high (~80 keV/μm)",
                    "Micro-metastases, circulating cells; precise targeting required",
                    "Dense direct DSBs (double-strand breaks); highly lethal"
                  ],
                  [
                    "Auger electrons",
                    "In-111, Ga-67, I-125, Tl-201",
                    "2–500 nm (subcellular)",
                    "Very high (localised)",
                    "Requires internalisation into cell nucleus",
                    "Extremely dense DSBs if DNA-proximal"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Iodine-131 Thyroid Therapy: Nuclear Medicine's Oldest Success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "The thyroid gland physiologically concentrates iodine for thyroid hormone synthesis (T3, T4) via the sodium-iodide symporter (NIS) protein — among the most active ion transport mechanisms in the body. I-131 administered as sodium iodide (NaI) exploits this natural biological selectivity: the thyroid concentrates I-131 to~99% exclusion of other organs (apart from salivary glands and gastric mucosa, which also express NIS). The physical properties of I-131:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
              [
                "Half-life",
                "8.02 days (physical); effective T½ in thyroid ~5–6 days"
              ],
              [
                "Beta emission",
                "E_max = 606 keV, E_mean = 192 keV; range ~2 mm in tissue"
              ],
              [
                "Gamma emission",
                "364 keV (81% abundance) — enables imaging to verify uptake and detect metastases"
              ],
              [
                "Production",
                "Reactor fission product of U-235 (yield ~2.8%); or Te-130(n,γ)→Te-131→I-131"
              ],
              [
                "Administration",
                "Oral sodium iodide capsule or IV injection; outpatient (low dose) or inpatient isolation (high dose)"
              ]
            ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                k,
                ": "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: v })
            ] }, String(k))) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Differentiated thyroid cancer (DTC):" }),
                " ",
                "Post-total thyroidectomy remnant ablation with 30–100 mCi (1.1–3.7 GBq); treatment of iodine-avid cervical node and distant metastases with 100–200 mCi per treatment. 10-year disease-specific survival for low-risk localised DTC is >99%; for metastatic iodine-avid DTC, I-131 therapy significantly improves outcomes. Papillary and follicular thyroid cancers retain NIS expression; medullary and anaplastic thyroid cancers do not respond."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Hyperthyroidism (Graves' disease, toxic nodule):" }),
                " ",
                "Definitive ablative therapy with 10–15 mCi; the most common curative treatment for hyperthyroidism in North America. Intentional hypothyroidism results in ~80–90% of cases, managed permanently with levothyroxine. First used clinically in 1941 (Hertz and Roberts, MGH Boston) — the oldest targeted radionuclide therapy in clinical use."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "¹⁷⁷Lu-DOTATATE (Lutathera®): Neuroendocrine Tumour Therapy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Neuroendocrine tumours (NETs) of the GEP tract (gastroenteropancreatic NETs) overexpress",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "somatostatin receptors" }),
              " ",
              "(particularly SSTR2) at densities 10–1,000× higher than normal tissue, making them ideal targets for DOTA-peptide-based PRRT. The NETTER-1 Phase III randomised controlled trial (Strosberg et al.,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "N Engl J Med" }),
              ", 2017) established the clinical benefit:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
              [
                "Study",
                "NETTER-1: ¹⁷⁷Lu-DOTATATE vs. octreotide LAR 60 mg (midgut NETs, n=229)"
              ],
              [
                "Primary endpoint",
                "Progression-free survival: 65.2% at 20 months (Lu-177) vs. 10.8% (control) — hazard ratio 0.18 (p<0.0001)"
              ],
              [
                "Objective response rate",
                "18% partial response (Lu-177) vs. 3% (control)"
              ],
              [
                "Overall survival",
                "Benefit observed but not primary endpoint; median OS not reached in Lu-177 arm at primary analysis"
              ],
              [
                "Dose regimen",
                "4 cycles × 7.4 GBq (200 mCi) every 8 weeks; amino acid infusion to protect kidneys"
              ],
              [
                "FDA approval",
                "January 2018 (Lutathera®); EMA 2017; first radiopharmaceutical therapy approved in the theranostics era"
              ]
            ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                k,
                ": "
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: v })
            ] }, String(k))) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: 'Lu-177 properties (T½ = 6.65 d; E_β_mean = 133 keV, range ~0.5 mm; plus 208 keV and 113 keV gamma rays allowing patient imaging post-therapy) are uniquely suited to theranostic applications: the same ligand (DOTATATE) labelled with ⁶⁸Ga is used for diagnostic PET staging, and with ¹⁷⁷Lu for therapy — a true "see-and-treat" strategy.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "¹⁷⁷Lu-PSMA-617 (Pluvicto®): Prostate Cancer Therapy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Prostate-specific membrane antigen (PSMA, also called folate hydrolase I, FOLH1) is a transmembrane protein overexpressed on prostate cancer cells at 100–1,000× the level of normal prostate epithelium. PSMA-617 is a small-molecule PSMA ligand that binds with high affinity (Kd ~0.1 nM) and is rapidly internalised into tumour cells — ideal for targeted delivery of a cytotoxic radionuclide. The Phase III VISION trial (Sartor et al., ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "N Engl J Med" }),
              ", 2021) established the evidence base:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Parameter",
                  "¹⁷⁷Lu-PSMA-617 + SoC",
                  "SoC Alone",
                  "Significance"
                ],
                rows: [
                  [
                    "Median Overall Survival",
                    "15.3 months",
                    "11.3 months",
                    "HR 0.62 (95% CI 0.52–0.74); p<0.001"
                  ],
                  [
                    "Median rPFS (radiographic PFS)",
                    "8.7 months",
                    "3.4 months",
                    "HR 0.40 (95% CI 0.29–0.57); p<0.001"
                  ],
                  [
                    "Objective Response Rate",
                    "29.8%",
                    "1.7%",
                    "Dramatic improvement"
                  ],
                  [
                    "Grade ≥3 AE rate",
                    "52.7%",
                    "38.0%",
                    "Increased toxicity, primarily haematological"
                  ],
                  [
                    "Trial population",
                    "n=831, mCRPC, PSMA PET positive, prior AR inhibitor + docetaxel",
                    "",
                    ""
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 mb-4", children: "FDA approved March 2022 (Pluvicto® / lutetium PSMA-617); EMA 2022. By 2024 an estimated 50,000+ patients treated globally; among the fastest commercial uptakes of any new radiopharmaceutical therapy. Multiple additional trials ongoing: earlier-stage prostate cancer, combination with pembrolizumab and olaparib." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "²²³Ra-Dichloride (Xofigo®): Alpha Therapy for Bone Metastases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Ra-223, a calcium mimic, selectively incorporates into hydroxyapatite at sites of osteoblastic bone metastases via the same mechanism as calcium. As an alpha emitter (with 4 alpha particles in its decay chain to Pb-207), it delivers extremely high LET radiation with a range of <100 μm in tissue — devastating to tumour cells in the bone microenvironment while largely sparing haematopoietic red marrow." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^{223}_{88}\\text{Ra} \\xrightarrow{\\alpha,\\,11.43\\,\\text{d}} {^{219}\\text{Rn}} \\xrightarrow{\\alpha,\\,3.96\\,\\text{s}} {^{215}\\text{Po}} \\xrightarrow{\\alpha,\\,1.78\\,\\text{ms}} {^{211}\\text{Pb}} \\xrightarrow{\\beta^-,\\,36.1\\,\\text{min}} {^{211}\\text{Bi}} \\xrightarrow{\\alpha,\\,2.14\\,\\text{min}} {^{207}\\text{Tl}} \\xrightarrow{\\beta^-,\\,4.77\\,\\text{min}} {^{207}\\text{Pb (stable)}}",
                annotation: "Ra-223 decay chain to stable Pb-207: 4 alpha particles (Q ≈ 6–7 MeV each) plus 2 beta particles in rapid succession. Total energy deposited per decay chain ≈ 28.3 MeV. Alpha particles have range <100 μm in soft tissue (approximately 2–10 cell diameters), concentrating the lethal dose burden within the tumour-bone interface microenvironment.",
                label: "Ra-223 Decay Chain (ALSYMPCA therapy)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ALSYMPCA Phase III trial" }),
                " ",
                "(Parker et al., ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "N Engl J Med" }),
                ", 2013): median OS 14.9 months (Ra-223) vs. 11.3 months (placebo); hazard ratio 0.695 (p<0.001). Significant improvements in time to SRE (skeletal related events), quality of life, ALP normalisation."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "FDA approval: 2013" }),
                " — first targeted alpha emitter approved for systemic cancer therapy globally; first agent to demonstrate overall survival benefit in bone-metastatic prostate cancer."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Regimen: 6 IV injections at 50 kBq/kg, 4 weeks apart. Well-tolerated: grade ≥3 haematological toxicity ~3% (vs. many chemotherapy regimens >30%)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Actinium-225 and the Next Generation of Alpha Therapies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Ac-225 (T½ = 9.92 days; decays through 4 alpha-emitting daughters to stable Bi-209) represents the next wave of targeted alpha therapy (TAT). Its decay chain delivers even more alpha particles per parent decay than Ra-223, potentially enabling single-injection eradication of small-volume disease. Ac-225-PSMA-617 has shown remarkable early results in compassionate-use series in patients who failed Lu-177-PSMA treatment. Key challenges:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Supply:" }),
                " Global Ac-225 supply was historically limited to ~1,500 Ci/yr from decay of Cold War era U-233 stockpiles (ORNL, USA; INR, Russia). New dedicated production via Th-229 generators (Th-229 → Ra-225 → Ac-225) and linear accelerator proton bombardment of Ra-226 targets is scaling supply toward ~100,000 Ci/yr by 2028 (US DOE Isotope Program target)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Daughter redistribution:" }),
                " ",
                "Unlike Lu-177 (single nuclide, single decay), Ac-225's alpha daughters (Fr-221, Bi-213, Po-213) have recoil energies and may redistribute from the targeting complex — potentially delivering off-target radiation to kidney, liver, or other organs. Chelator design (macropa, crown ethers) and careful dosimetry are active research areas."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Approved Radionuclide Therapies: Summary Table" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Agent",
                  "Nuclide",
                  "T½",
                  "Emission",
                  "Disease",
                  "Approval Year",
                  "Key Trial"
                ],
                rows: [
                  [
                    "Sodium iodide (I-131)",
                    "I-131",
                    "8.02 d",
                    "β⁻ + 364 keV γ",
                    "Thyroid cancer; hyperthyroidism",
                    "1951 (NDA)",
                    "Pioneer (1941, Hertz/Roberts)"
                  ],
                  [
                    "Zevalin® (ibritumomab tiuxetan)",
                    "Y-90",
                    "2.67 d",
                    "β⁻ (E_max 2.3 MeV)",
                    "Relapsed/refractory B-cell NHL",
                    "FDA 2002",
                    "Phase III: 80% ORR"
                  ],
                  [
                    "Xofigo® (Ra-223 dichloride)",
                    "Ra-223",
                    "11.43 d",
                    "α (×4 chain) + β⁻",
                    "Bone mets (mCRPC)",
                    "FDA/EMA 2013",
                    "ALSYMPCA (OS benefit)"
                  ],
                  [
                    "Lutathera® (¹⁷⁷Lu-DOTATATE)",
                    "Lu-177",
                    "6.65 d",
                    "β⁻ + 208 keV γ",
                    "GEP-NETs (somatostatin receptor+)",
                    "EMA 2017; FDA 2018",
                    "NETTER-1 (PFS benefit)"
                  ],
                  [
                    "Azedra® (¹³¹I-MIBG)",
                    "I-131",
                    "8.02 d",
                    "β⁻ + γ",
                    "Pheo/paraganglioma",
                    "FDA 2018",
                    "MIBG Phase II"
                  ],
                  [
                    "Pluvicto® (¹⁷⁷Lu-PSMA-617)",
                    "Lu-177",
                    "6.65 d",
                    "β⁻ + 208 keV γ",
                    "mCRPC (PSMA PET+)",
                    "FDA/EMA 2022",
                    "VISION (OS benefit)"
                  ],
                  [
                    "Erenumab + ¹⁷⁷Lu-DOTATATE (RLT)",
                    "Lu-177",
                    "6.65 d",
                    "β⁻ + γ",
                    "Aggressive pNETs",
                    "FDA 2023 (expanded)",
                    "NETTER-2"
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
          title: "Production of Medical Radioisotopes",
          badge: "advanced",
          ocid: "medicine.production",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "The physical properties that make a radioisotope clinically useful — short half-life, pure and appropriately energetic emissions, favourable pharmacokinetics — simultaneously create formidable supply chain challenges. Short-lived isotopes cannot be stockpiled; they must be produced continuously in facilities (reactors or cyclotrons), processed and formulated under aseptic and radiation safety conditions, quality-tested, and shipped to hospitals worldwide within hours to days. This requires an integrated global supply network." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Reactor-Produced Isotopes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Nuclear reactors produce medical isotopes via two principal mechanisms:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "neutron capture (n,γ)" }),
              " — a target nuclide absorbs a thermal neutron to yield the product — and",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "fission product recovery" }),
              " ",
              "— certain nuclides are recovered from the fission products of U-235 targets. Fission-based production (Mo-99, I-131) yields dramatically higher specific activities than (n,γ) routes, which is critical for radiolabelling efficiency and dose per injection."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Isotope",
                  "Production Route",
                  "Specific Activity",
                  "Key Reactors",
                  "Clinical Use"
                ],
                rows: [
                  [
                    "Mo-99 (→Tc-99m)",
                    "U-235 fission of LEU targets: high specific activity fission Mo-99",
                    "High (~10⁵ Ci/g)",
                    "HFR (NL), BR2 (BE), Safari-1 (SA), MURR (US), LVR-15 (CZ)",
                    "~80% of all diagnostic nuclear medicine; Mo-99/Tc-99m generator"
                  ],
                  [
                    "Mo-99 (→Tc-99m)",
                    "Mo-98(n,γ)Mo-99: low specific activity (neutron activation)",
                    "Low (~10 Ci/g)",
                    "Multiple research reactors; SHINE (accelerator-based)",
                    "Supplementary; acceptability of lower SA under investigation"
                  ],
                  [
                    "I-131",
                    "Te-130(n,γ)→Te-131→¹³¹I (β⁻ decay, T½=25 min); or U-235 fission product recovery",
                    "High (fission); medium (activation)",
                    "ILL, HIFAR, various high-flux reactors",
                    "Thyroid cancer therapy; MIBG therapy (radiolabelled)"
                  ],
                  [
                    "Lu-177 (n.c.a. — no carrier added)",
                    "Yb-176(n,γ)→Yb-177 (T½=1.9 h)→¹⁷⁷Lu via β⁻ decay; chemically separated from Yb matrix (high specific activity)",
                    "High (&gt;3,000 Ci/g)",
                    "ILL (Grenoble), BR2, NRU (hist.), MURR, ANSTO (Australia)",
                    "PRRT (Lutathera), PSMA therapy (Pluvicto); all commercial TRT Lu-177 is n.c.a."
                  ],
                  [
                    "Lu-177 (carrier added)",
                    "Lu-176(n,γ)→¹⁷⁷Lu direct activation; carrier-added (stable Lu-177 dilutes product)",
                    "Lower (~15–50 Ci/g)",
                    "Multiple reactors with moderate flux",
                    "Research; preclinical; some clinical centres in developing world"
                  ],
                  [
                    "Y-90",
                    "Sr-90 (fission product) → Zr-90 generator system; or Sr-90 decay isolation",
                    "High",
                    "Recovery from nuclear waste streams",
                    "SIR-Spheres/TheraSphere liver radioembolisation; Zevalin"
                  ],
                  [
                    "Sm-153",
                    "Sm-152(n,γ)Sm-153 (T½=46.3 h); complexed with EDTMP",
                    "Moderate",
                    "Multiple reactors",
                    "Bone pain palliation (Quadramet®); osteosarcoma"
                  ],
                  [
                    "Ra-223",
                    "Th-227 (from Ra-227 decay chain) → Ra-223 via alpha decay; Ra-225 from Th-229 → Ra-225 → Ac-225 (for TAT)",
                    "High (generator system)",
                    "ORNL (US); INR Dimitrovgrad (Russia); specialized facilities",
                    "Xofigo® bone metastases therapy (mCRPC)"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Cyclotron-Produced Isotopes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Medical cyclotrons (proton energy typically 11–30 MeV; deuteron 8–16 MeV for some targets) produce radionuclides via charged-particle nuclear reactions. Over",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1,500 cyclotrons" }),
              " ",
              "operate globally (IAEA 2023 database), with approximately 60% dedicated to radiopharmaceutical production. The dominant product is F-18 FDG, with >95% of all PET scans using F-18 as the radionuclide. Major production reactions:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Isotope",
                  "Nuclear Reaction",
                  "Target Material",
                  "Cyclotron Energy",
                  "T½",
                  "Key Use"
                ],
                rows: [
                  [
                    "F-18",
                    "¹⁸O(p,n)¹⁸F",
                    "Enriched ¹⁸O-water (H₂¹⁸O, ~98% enrichment)",
                    "16–18 MeV protons; 30–60 min; yields 50–150 GBq",
                    "109.8 min",
                    "FDG (oncology, neurology, cardiology); NaF (bone); PSMA-1007; DOPA"
                  ],
                  [
                    "Ga-68",
                    "⁶⁸Zn(p,n)⁶⁸Ga — cyclotron route",
                    "Electroplated ⁶⁸ZnO target",
                    "12–14 MeV",
                    "67.71 min",
                    "PSMA, DOTATATE, FAPI PET (generator supply adequate for many centres)"
                  ],
                  [
                    "Ga-68",
                    "⁶⁸Ge/⁶⁸Ga generator",
                    "No cyclotron; Ge-68 (T½=270.9 d) on column yields Ga-68 daughter",
                    "N/A",
                    "67.71 min",
                    "PSMA, DOTATATE PET at hospitals without cyclotron; dominant global supply route"
                  ],
                  [
                    "I-123",
                    "Xe-124(p,2n)Cs-123 → I-123 (EC, T½=5.9 min); or ¹²⁴Te(p,2n)¹²³I",
                    "Enriched Xe-124 gas; or Te-124 target",
                    "26–30 MeV (Xe-124 route); 18–22 MeV (Te route)",
                    "13.22 h",
                    "MIBG SPECT; thyroid imaging; NIS/DaTscan for Parkinson's"
                  ],
                  [
                    "Zr-89",
                    "Y-89(p,n)Zr-89",
                    "Y₂O₃ ceramic or Y metal foil",
                    "14–16 MeV",
                    "78.41 h",
                    "ImmunoPET: HER2 (⁸⁹Zr-trastuzumab), CD20, PD-L1 antibody imaging; theranostics development"
                  ],
                  [
                    "Cu-64",
                    "Ni-64(p,n)Cu-64 — cyclotron; or Zn-64(n,p)Cu-64 — reactor",
                    "Electroplated ⁶⁴Ni; or enriched ⁶⁴Zn",
                    "12–14 MeV",
                    "12.70 h",
                    "Theranostic agent; ATSM hypoxia imaging; Cu-PSMA (prostate); chelation-based TRT"
                  ],
                  [
                    "C-11",
                    "¹⁴N(p,α)¹¹C — internal gas target",
                    "N₂ + 1–2% O₂ (yields ¹¹CO₂); or N₂ + H₂ (yields ¹¹CH₄)",
                    "16–18 MeV",
                    "20.38 min",
                    "¹¹C-PiB (amyloid); ¹¹C-FMZ (GABA/epilepsy); ¹¹C-Choline (prostate); ¹¹C-Raclopride (dopamine D2); on-site cyclotron essential"
                  ],
                  [
                    "N-13",
                    "¹⁶O(p,α)¹³N — water target",
                    "Natural water (H₂O, internal liquid target)",
                    "16–18 MeV",
                    "9.97 min",
                    "¹³N-Ammonia cardiac PET: absolute myocardial blood flow quantification (mL/min/g); requires on-site cyclotron"
                  ],
                  [
                    "O-15",
                    "¹⁴N(d,n)¹⁵O; or ¹⁵N(p,n)¹⁵O",
                    "N₂ gas; or ¹⁵N₂ enriched gas",
                    "8–10 MeV deuterons",
                    "2.04 min",
                    "O-15 water brain blood flow PET; reference standard for cerebral perfusion; requires on-site cyclotron and synthesis"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Sources: IAEA Cyclotron Produced Radionuclides: Guidance on Facility Design and Production of Fluorodeoxyglucose (F-18) (IAEA Radioisotopes and Radiopharmaceuticals Series No. 3); IAEA Nuclear Medicine Database 2020." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Generator Systems: On-Demand Isotope Delivery Without Cyclotron" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: 'Generator systems allow hospitals without on-site reactors or cyclotrons to access short-lived radionuclides via a long-lived parent nuclide held on a column. The "daughter" grows in via radioactive decay and can be periodically eluted:' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["System", "Parent T½", "Daughter T½", "Eluent", "Use"],
                rows: [
                  [
                    "Mo-99/Tc-99m",
                    "66.02 h (~2.75 d)",
                    "6.01 h",
                    "0.9% NaCl saline",
                    "~80% of all diagnostic nuclear medicine; ~40 million procedures/yr"
                  ],
                  [
                    "Ge-68/Ga-68",
                    "270.9 d",
                    "67.71 min",
                    "0.05 M HCl or 0.1 M EDTA",
                    "PSMA, DOTATATE PET; viable at hospitals without cyclotron"
                  ],
                  [
                    "Sr-82/Rb-82",
                    "25.35 d",
                    "1.27 min",
                    "0.9% NaCl",
                    "Cardiac perfusion PET (cardiolite equivalent); very short T½ requires direct IV infusion from generator"
                  ],
                  [
                    "Sn-117m/In-113m",
                    "13.6 d",
                    "1.658 h",
                    "0.05 M HCl",
                    "Historical SPECT imaging agent; largely supplanted by Tc-99m"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Boron Neutron Capture Therapy (BNCT)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "BNCT is a two-step cancer therapy that harnesses nuclear physics at the cellular level. A boron-10-containing drug (typically boronophenylalanine, BPA) is administered and selectively concentrates in cancer cells (tumour:normal tissue ratios of 3–10:1 due to elevated amino acid transport). The tumour is then irradiated with thermal/epithermal neutrons. B-10 undergoes neutron capture with an enormous cross-section (σ = 3,837 barns):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^{10}_{5}\\text{B} + n_{\\text{th}} \\rightarrow [^{11}\\text{B}]^* \\rightarrow ^{7}_{3}\\text{Li}^* + ^{4}_{2}\\text{He} \\quad (Q = 2.79\\,\\text{MeV})",
                annotation: "The B-10(n,α)Li-7 reaction produces a Li-7 recoil ion (0.84 MeV, range ~5–9 μm) and an alpha particle (1.47 MeV, range ~4–9 μm), both with very high LET (~240 keV/μm). Both particles deposit their energy within approximately the diameter of a single cell (~10 μm), concentrating the lethal dose within the boron-loaded cancer cell. BNCT is the only radiotherapy modality where the selectivity is determined by molecular drug uptake, not geometric beam precision.",
                label: "Boron-10 Neutron Capture Reaction"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mt-3", children: "Historically limited to research reactor neutron beams (JRR-4 and KUR in Japan, MIT MITR in USA), BNCT has been transformed since 2020 by compact accelerator-based neutron sources (ABNS), which generate epithermal neutrons from proton (or deuteron) bombardment of Be or Li targets and can be installed in hospital settings. Japan's NeuBoron/Stella BNCT system (approved 2020 for recurrent H&N cancer) demonstrated the clinical viability of hospital-based BNCT. Clinical trials are now ongoing in the EU, USA, Finland, Israel, and China for glioblastoma, head and neck cancers, and liver metastases." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Radiation Safety in Nuclear Medicine",
          badge: "intermediate",
          ocid: "medicine.safety",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Nuclear medicine involves intentional administration of radioactive materials to patients — a situation requiring careful",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "justification, optimisation, and dose limitation" }),
              " ",
              '(the ICRP "JO" framework). Unlike industrial or reactor workers, patients are exposed as a direct intended consequence of a medical procedure, so the benefit-risk assessment is patient-specific and requires prescription by a nuclear medicine physician. The dose framework for patients is governed by ICRP Publication 128 (2015) and national regulatory guidance (e.g., NRC 10 CFR 35, EU Directive 2013/59/Euratom).'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { title: "Dose Estimation vs. Treatment Planning", children: "Effective dose values for nuclear medicine procedures are population-average estimates based on standard human biokinetic models (ICRP Reference Man, OLINDA/EXM dosimetry code). Individual patient doses vary with body habitus, organ function, and tracer biodistribution. For therapeutic procedures (I-131, Lu-177, Ra-223), patient-specific dosimetry using quantitative SPECT/PET imaging before and during treatment is increasingly standard practice to maximise tumour dose while protecting kidneys and red marrow." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Typical Patient Effective Doses: Diagnostic Procedures" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Procedure",
                  "Radiopharmaceutical",
                  "Activity (MBq)",
                  "Effective Dose (mSv)",
                  "Context"
                ],
                rows: [
                  [
                    "Bone scan (whole body)",
                    "⁹⁹ᵐTc-MDP",
                    "740–925 MBq",
                    "~4.2 mSv",
                    "~1.4 years average natural background (USA: ~3 mSv/yr)"
                  ],
                  [
                    "Myocardial perfusion (rest)",
                    "⁹⁹ᵐTc-sestamibi",
                    "300–400 MBq",
                    "~2.4 mSv",
                    "~0.8 years background"
                  ],
                  [
                    "Myocardial perfusion (stress+rest)",
                    "⁹⁹ᵐTc-sestamibi/tetrofosmin",
                    "~1,100 MBq total",
                    "~7–9 mSv",
                    "~2–3 years background"
                  ],
                  [
                    "¹⁸F-FDG PET (whole body)",
                    "¹⁸F-FDG",
                    "185–370 MBq",
                    "~5–8 mSv",
                    "Similar to CT colonoscopy; substantially less than staging CT+PET/CT"
                  ],
                  [
                    "¹⁸F-FDG PET/CT (diagnostic CT)",
                    "¹⁸F-FDG + CT",
                    "~250 MBq + CT",
                    "~12–18 mSv (CT dominates)",
                    "Comparable to one double-phase abdominal CT"
                  ],
                  [
                    "⁶⁸Ga-PSMA PET",
                    "⁶⁸Ga-PSMA-11",
                    "150–200 MBq",
                    "~5–6 mSv",
                    "~2 years background"
                  ],
                  [
                    "Thyroid scan",
                    "⁹⁹ᵐTc-pertechnetate",
                    "80–200 MBq",
                    "~1.0–1.5 mSv",
                    "~4–6 months background"
                  ],
                  [
                    "Renal scan (MAG3/GFR)",
                    "⁹⁹ᵐTc-MAG3/DTPA",
                    "100–200 MBq",
                    "~1.0–2.5 mSv",
                    "~4–10 months background"
                  ],
                  [
                    "Pulmonary V/Q (perfusion)",
                    "⁹⁹ᵐTc-MAA",
                    "74–370 MBq",
                    "~1.0–2.0 mSv",
                    "~4–8 months background; low dose PE diagnosis in young patients"
                  ],
                  [
                    "Annual natural background (USA average)",
                    "—",
                    "—",
                    "~3.1 mSv/yr",
                    "NCRP report 160 (2009): radon 2.3 + medical 3.0 = ~6.2 mSv total"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Sources: ICRP Publication 128 (2015); UNSCEAR 2008 Report; EPA/NRC guidance. Effective dose accounts for radiation weighting factor (1 for gamma/beta) and tissue weighting factors for radiosensitive organs (breast, gonad, thyroid, lung). Whole-body effective dose is a risk surrogate for population-level studies — not a precise individual risk predictor." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Radiation Safety for Therapy Patients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Patients receiving therapeutic amounts of radioactivity temporarily become radiation sources. The dose rate and required isolation period depend on the radionuclide, administered activity, and excretion kinetics:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Therapy",
                  "Typical Activity",
                  "Isolation Required?",
                  "Excretion Route",
                  "Post-Discharge Precautions"
                ],
                rows: [
                  [
                    "I-131 (thyroid cancer)",
                    "100–200 mCi (3.7–7.4 GBq)",
                    "Yes — inpatient isolation (lead-lined room) until residual &lt;400 MBq (US NRC threshold)",
                    "Urine (primary); saliva, sweat",
                    "Hand hygiene; avoid young children/pregnant women 1–2 weeks; separate laundry/toilets"
                  ],
                  [
                    "I-131 (hyperthyroidism)",
                    "10–15 mCi (370–555 MBq)",
                    "Usually not — outpatient; US NRC allows outpatient if &lt;1,110 MBq (30 mCi)",
                    "Urine primary",
                    "Limit close contact with young children/pregnant women 2–7 days"
                  ],
                  [
                    "¹⁷⁷Lu-DOTATATE (Lutathera)",
                    "7.4 GBq (200 mCi) × 4 cycles",
                    "No — outpatient infusion (2–5 h); low external dose rate due to low-energy gamma",
                    "Urine (90%+ within 24 h)",
                    "Flush toilet twice; hand hygiene; 1-metre distance from others ~2 days"
                  ],
                  [
                    "¹⁷⁷Lu-PSMA-617 (Pluvicto)",
                    "7.4 GBq × up to 6 cycles",
                    "No — outpatient or brief 4–6 h observation",
                    "Urine",
                    "Same as Lutathera"
                  ],
                  [
                    "Ra-223 (Xofigo)",
                    "55 kBq/kg × 6 cycles (4-week intervals)",
                    "No — IV injection, immediate discharge",
                    "Faecal primary (80%+ excreted in 7 days)",
                    "Avoid constipation; normal hygiene; minimal external dose (alpha does not penetrate skin)"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Occupational Radiation Exposure: Nuclear Medicine Staff" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Nuclear medicine department staff (technologists, radiopharmacists, physicians) are occupationally exposed during radiopharmaceutical preparation, dispensing, patient injection, and imaging. Modern shielding engineering (lead-glass syringe shields, Pb-glass dispensing isolators, dose calibrator enclosures) and time-distance optimisation have substantially reduced hand and whole-body doses compared to unshielded practice." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Worker Category",
                  "Typical Annual Effective Dose",
                  "Major Dose Driver",
                  "ICRP Occupational Limit"
                ],
                rows: [
                  [
                    "Nuclear medicine technologist",
                    "1–5 mSv/yr (whole body)",
                    "Patient proximity during injection; imaging room dose; Tc-99m (140 keV γ)",
                    "20 mSv/yr (5-year average); 50 mSv in any single year"
                  ],
                  [
                    "Nuclear medicine physician",
                    "0.5–2 mSv/yr",
                    "Patient proximity; ward rounds",
                    "20 mSv/yr average"
                  ],
                  [
                    "Radiopharmacist",
                    "Whole body: 1–8 mSv/yr; Hands (extremity): up to 100–150 mSv/yr",
                    "Extremity dose from syringe handling; dose calibrator measurements",
                    "500 mSv/yr (extremities); 20 mSv/yr (whole body)"
                  ],
                  [
                    "PET cyclotron operator (F-18 production)",
                    "0.5–3 mSv/yr",
                    "Prompt gamma and neutron activation from cyclotron; F-18 (511 keV) during dispensing",
                    "20 mSv/yr average"
                  ],
                  [
                    "Radionuclide therapy nurse",
                    "0.5–4 mSv/yr",
                    "Patient contact during I-131 isolation; Lu-177 patient visits",
                    "20 mSv/yr average"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "All values are well within regulatory occupational dose limits. For context, the US population average from all sources is ~6 mSv/yr (NCRP 2009), and airline crew receive 2–5 mSv/yr from cosmic radiation at altitude. Mandatory personal dosimetry (TLD, OSL, or electronic real-time dosimeter), regular bioassay for iodine workers (thyroid monitor), and quarterly dose reporting to regulatory authorities are standard practice at accredited nuclear medicine facilities." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Special Considerations: Pregnancy and Breastfeeding" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Pregnancy (absolute contraindication for most therapies):" }),
                " ",
                "The fetal thyroid concentrates iodine from gestational week 10 onward; I-131 therapy poses severe fetal thyroid ablation risk. Lu-177 beta radiation reaches the embryo/fetus; Ra-223 bone incorporation distributes near haematopoietic marrow. Mandatory pregnancy testing (urine/serum hCG) before any therapeutic radiopharmaceutical. For diagnostic studies: risks are low (fetal dose typically <5 mGy) but justification requires physician consultation; non-radiation alternatives preferred where equivalent."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Breastfeeding:" }),
                " Tc-99m and I-131 are excreted in breast milk. Standard guidance (ICRP 106; SNM practice guidelines): interrupt breastfeeding for 24 h after Tc-99m SPECT; permanently discontinue if I-131 therapy dose >30 mCi. Ga-68 PET: interruption not required (<1% excreted in milk given very short T½). Patient-specific guidance essential for all therapeutic procedures."
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  MedicinePage as default
};
