import { r as reactExports, j as jsxRuntimeExports, a as ChevronDown, C as ChevronRight } from "./index-DHpNeWFA.js";
import { E as EquationBlock } from "./EquationBlock-NVyAdYzd.js";
import { P as PageHeader } from "./PageHeader-DjzxfwqO.js";
import { S as SectionCard } from "./SectionCard-Dum9xY4U.js";
const detectors = [
  {
    name: "Geiger-Müller (GM) Counter",
    principle: "Ionizing radiation creates ion pairs in a gas-filled tube, generating an electrical pulse counted by electronics. Simple, robust, inexpensive.",
    strengths: "Excellent for count rate measurement. Responds to alpha, beta, gamma. Simple to use.",
    limitations: "Limited energy resolution — cannot distinguish photon energies. Susceptible to dead-time at high rates.",
    applications: [
      "Contamination surveys",
      "Personnel dosimetry",
      "Classroom demonstrations"
    ],
    color: "border-emerald-400/30 bg-emerald-400/5"
  },
  {
    name: "Scintillation Detector",
    principle: "Radiation excites a scintillator material (NaI(Tl), BGO, plastic), which emits light photons detected by a photomultiplier tube (PMT) or silicon photomultiplier (SiPM).",
    strengths: "Moderate energy resolution (NaI ~7% at 662 keV). High efficiency for gamma detection. Fast response.",
    limitations: "Hygroscopic (NaI). Moderate energy resolution limits isotope identification.",
    applications: [
      "Gamma spectroscopy",
      "Medical imaging (PET/SPECT)",
      "Portal monitors"
    ],
    color: "border-blue-400/30 bg-blue-400/5"
  },
  {
    name: "Semiconductor Detector",
    principle: "High-purity germanium (HPGe) or silicon detectors create electron-hole pairs directly. Excellent energy resolution due to low bandgap.",
    strengths: "Outstanding energy resolution (~0.2% at 1.33 MeV for HPGe). Enables precise isotope identification.",
    limitations: "HPGe must be cooled to liquid nitrogen temperature (77 K). Expensive. Fragile.",
    applications: [
      "Nuclear safeguards inspections",
      "Environmental monitoring",
      "Research laboratories"
    ],
    color: "border-purple-400/30 bg-purple-400/5"
  }
];
const scintillatorTable = [
  [
    "NaI(Tl)",
    "3.67",
    "415 nm",
    "250 ns",
    "~7% @ 662 keV",
    "Standard gamma spec, field surveys, SPECT"
  ],
  [
    "CsI(Tl)",
    "4.51",
    "550 nm",
    "1,000 ns",
    "~8% @ 662 keV",
    "Portal monitors, non-hygroscopic applications"
  ],
  [
    "BGO",
    "7.13",
    "480 nm",
    "300 ns",
    "10–15% @ 662 keV",
    "PET rings (high Z for 511 keV efficiency)"
  ],
  [
    "LaBr₃(Ce)",
    "5.06",
    "380 nm",
    "16 ns",
    "~2.5–3% @ 662 keV",
    "High-res portable spec, safeguards, fast timing"
  ],
  [
    "GAGG:Ce",
    "6.63",
    "520 nm",
    "90 ns",
    "~4–5% @ 662 keV",
    "Modern portable detectors, non-hygroscopic"
  ],
  [
    "Plastic (BC-408)",
    "1.03",
    "425 nm",
    "2.1 ns",
    "Poor (no photoelectric)",
    "Beta, fast neutron via PSD, charged particles"
  ],
  [
    "Stilbene",
    "1.16",
    "390 nm",
    "4 ns",
    "Poor",
    "n-γ discrimination (PSD), fast neutrons"
  ],
  [
    "Liquid (EJ-301)",
    "0.87",
    "425 nm",
    "3.2 ns",
    "Poor",
    "Tritium/C-14 counting, n-γ PSD"
  ]
];
const neutronDetectorTable = [
  [
    "BF₃ proportional counter",
    "¹⁰B + n → ⁷Li + ⁴He",
    "3,840 b @ 0.025 eV",
    "Thermal neutron flux; intrinsic gamma-blind"
  ],
  [
    "³He proportional counter",
    "³He + n → ³H + p + 0.764 MeV",
    "5,330 b @ 0.025 eV",
    "Best thermal sensitivity; ³He shortage since ~2009"
  ],
  [
    "Li-6 glass scintillator",
    "⁶Li + n → ⁴He + ³H + 4.78 MeV",
    "940 b @ 0.025 eV (⁶Li)",
    "Fast response; used with PMT; fast/thermal n detection"
  ],
  [
    "Boron-coated straw",
    "¹⁰B coating on inner tube wall",
    "~3,840 b",
    "³He replacement; portal monitors, homeland security"
  ],
  [
    "CLYC (Cs₂LiYCl₆:Ce)",
    "⁶Li capture + scintillation",
    "~940 b (⁶Li)",
    "Simultaneous n-γ discrimination; dual-mode PSD+energy"
  ],
  [
    "Fission chamber (U-235)",
    "²³⁵U + n → fission fragments",
    "585 b @ thermal",
    "High-flux environments (reactor cores, NPP monitoring)"
  ],
  [
    "Organic scintillator + PSD",
    "Proton recoil in H-rich medium",
    "n/a",
    "Fast neutrons; n-γ separation by pulse shape analysis"
  ]
];
const spectrumFeatures = [
  {
    label: "Full-Energy Peak (Photoelectric)",
    description: "All gamma energy deposited in one interaction. Appears as a sharp Gaussian at E = E_γ. Peak area is proportional to activity; FWHM determines energy resolution.",
    color: "border-emerald-400/30 bg-emerald-400/5"
  },
  {
    label: "Compton Continuum",
    description: "Continuum from zero to the Compton edge. Partial energy transfer via Compton scatter — electron escapes detector with remainder. Feature below every full-energy peak.",
    color: "border-blue-400/30 bg-blue-400/5"
  },
  {
    label: "Compton Edge",
    description: "Sharp drop at maximum Compton electron energy (θ = 180°). Position = E_γ − E_γ / (1 + 2E_γ / 0.511 MeV). Example: Cs-137 662 keV → Compton edge at 477 keV.",
    color: "border-blue-400/30 bg-blue-400/5"
  },
  {
    label: "Backscatter Peak",
    description: "Photons Compton-scattered backward (θ ≈ 180°) in shielding material re-enter detector with energy E_bs = E_γ − E_Compton_edge ≈ 180–200 keV, nearly independent of E_γ.",
    color: "border-amber-400/30 bg-amber-400/5"
  },
  {
    label: "Single Escape Peak",
    description: "When E_γ > 1.022 MeV, pair production occurs. One 511 keV photon escapes the detector. Peak at E_γ − 511 keV.",
    color: "border-purple-400/30 bg-purple-400/5"
  },
  {
    label: "Double Escape Peak",
    description: "Both 511 keV annihilation photons escape. Peak at E_γ − 1,022 keV. Only present when E_γ > ~2 MeV; most prominent in small detectors.",
    color: "border-purple-400/30 bg-purple-400/5"
  },
  {
    label: "Sum Peak",
    description: "Two gammas detected simultaneously. Appears at E₁ + E₂. Artifact of high count rates or detector geometry. Example: Co-60 has 1173 + 1332 keV sum peak at 2505 keV.",
    color: "border-rose-400/30 bg-rose-400/5"
  },
  {
    label: "X-Ray Fluorescence Peak",
    description: "Characteristic X-rays from photoelectric interactions in detector casing or nearby material. Pb K-alpha ≈ 75 keV is common in shielded systems.",
    color: "border-border bg-muted/20"
  }
];
function CollapsibleSection({
  id,
  title,
  badge,
  children,
  open,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SectionCard,
    {
      "data-ocid": `detection.${id}_card`,
      className: "p-0 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "w-full flex items-center justify-between p-6 text-left hover:bg-muted/20 transition-colors",
            "aria-expanded": open,
            "data-ocid": `detection.${id}_toggle`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold text-foreground", children: title }),
                badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium", children: badge })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 space-y-4 border-t border-border", children })
      ]
    }
  );
}
function RadiationDetection() {
  const [open, setOpen] = reactExports.useState({
    gm_tubes: false,
    scintillation: false,
    semiconductors: false,
    neutron_detection: false,
    gamma_spectrometry: false
  });
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Radiation Detection",
        subtitle: "How physicists and safety professionals detect, measure, and identify radiation using gas-filled tubes, scintillators, and semiconductor detectors.",
        audienceLevel: "intermediate",
        readTimeMin: 28
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "detection.intro_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Detection Principles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "All radiation detectors share a common principle: ionizing radiation deposits energy in a detector medium, which converts that energy into a measurable signal — an electrical pulse, light flash, or charge. The key properties of any detector are",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "efficiency" }),
          " (what fraction of incident radiation is detected),",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "energy resolution" }),
          " ",
          "(ability to distinguish different photon energies), and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "response time" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5", children: detectors.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl border p-5 ${d.color}`,
          "data-ocid": `detection.detector_card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: d.principle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Strengths" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: d.strengths })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Limitations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: d.limitations })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-2 border-t border-current/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: "Applications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2 list-none", children: d.applications.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  className: "text-xs rounded-full border border-current/20 px-2 py-0.5 text-muted-foreground",
                  children: a
                },
                a
              )) })
            ] })
          ]
        },
        d.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "detection.dose_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Dosimetry Basics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Radiation dose quantifies the biological impact of exposure. The absorbed dose (Gray) measures physical energy deposition; the effective dose (Sievert) weights by radiation type and tissue sensitivity:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "H = D \\\\cdot w_R",
            annotation: "Equivalent dose H (Sieverts) equals absorbed dose D (Grays) multiplied by the radiation weighting factor w_R. For gamma rays, w_R = 1; for alpha particles, w_R = 20.",
            label: "Equivalent Dose"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-3 text-sm", children: [
          [
            "Background radiation",
            "~2.4 mSv/yr",
            "Global average (UNSCEAR)"
          ],
          ["Chest X-ray", "~0.1 mSv", "Single procedure"],
          ["Annual occupational limit", "20 mSv/yr", "IAEA recommended"]
        ].map(([label, value, note]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-muted/30 p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs mb-1", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-primary font-bold", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: note })
            ]
          },
          label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "gm_tubes",
          title: "Geiger-Müller Tubes: Gas Ionization Detectors",
          badge: "Intermediate",
          open: open.gm_tubes,
          onToggle: () => toggle("gm_tubes"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "A Geiger-Müller (GM) tube is a cylindrical gas-filled detector with a central anode wire and an outer cathode. Radiation ionizes the fill gas (typically a noble gas — Ne or He — with a halogen quench gas such as Br₂ or Cl₂ at ~0.1% partial pressure). A high voltage of ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "600–900 V" }),
              " ",
              "is applied between anode and cathode."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Townsend Avalanche and the Geiger Region" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                "When an ion pair is created by radiation, the primary electron accelerates toward the anode. In the intense electric field near the thin anode wire (~10⁴–10⁵ V/cm), the electron gains enough energy to ionize more gas atoms — triggering a self-propagating",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Townsend avalanche" }),
                ". Crucially, this avalanche propagates along the entire length of the anode by UV photons exciting gas molecules, causing additional electron cascades."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Key property of the Geiger region:" }),
                " ",
                "Every ionizing event — regardless of whether 1 or 1,000 ion pairs were originally produced — triggers the same saturated avalanche and produces the same size output pulse (~1–2 V). This means the GM tube is excellent for ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "counting" }),
                " ",
                "radiation events but provides",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "zero energy information" }),
                ". A 50 keV gamma and a 1 MeV gamma produce identical output pulses."
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Quenching: Halting the Discharge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Without a quench gas, positive ion sheaths migrating toward the cathode would eject electrons upon impact, re-triggering the discharge indefinitely. Halogen molecules (Cl₂, Br₂) absorb UV photons and quench the discharge chemically:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "halogen ion + cathode → neutral halogen molecule + cathode" }),
                ". Halogen-quenched tubes self-regenerate (halogen dissociates and recombines), giving effectively unlimited lifetime — unlike older organic (ethanol) quenched tubes that consumed the quench gas irreversibly after ~10⁸ counts."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Dead Time and Count Rate Correction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                "After each discharge, the positive ion sheath suppresses the electric field near the anode. The tube is insensitive to new radiation events for a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "dead time τ ≈ 100–300 μs" }),
                ". At high count rates, a significant fraction of events are missed. The true count rate n is recovered from the observed count rate m by:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "n = \\\\frac{m}{1 - m \\\\cdot \\\\tau}",
                  annotation: "Dead time correction. n = true count rate (counts/s); m = measured count rate (counts/s); τ = dead time (seconds). At m = 1,000 cps and τ = 200 μs: n = 1,000 / (1 − 0.2) = 1,250 cps — 25% undercount. At m = 10,000 cps: the tube is paralyzed (mτ ≈ 2); the formula breaks down and a non-paralyzable (Type I) or paralyzable (Type II) model must be used.",
                  label: "Dead Time Correction (non-paralyzable model)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "For most radiation protection surveys, count rates are low enough that dead time is negligible. High-flux environments (near reactor cores, accelerator targets) require proportional counters or ionization chambers instead." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-3", children: "Detection Efficiency by Radiation Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3", children: [
                {
                  type: "Alpha (α)",
                  efficiency: "~100% (thin window)",
                  color: "border-rose-400/30 bg-rose-400/5",
                  detail: "Alpha particles are highly ionizing but have very short range (~4 cm in air). They must enter through a thin mica end-window (≤2 mg/cm²) — pancake GM configuration. Stopped completely by glass or standard tube walls."
                },
                {
                  type: "Beta (β)",
                  efficiency: "~90% (direct ionization)",
                  color: "border-blue-400/30 bg-blue-400/5",
                  detail: "Beta particles directly ionize the fill gas. Efficiency is high for most beta energies. Very low-energy betas (e.g., H-3, C-14) are stopped by the window — require liquid scintillation counting instead."
                },
                {
                  type: "Gamma (γ)",
                  efficiency: "~1% (wall interaction)",
                  color: "border-purple-400/30 bg-purple-400/5",
                  detail: "Gamma photons rarely interact with the low-density fill gas directly. Efficiency comes almost entirely from photoelectrons ejected from the cathode walls. Low Z and thin walls mean only ~1% of gammas are detected — adequate for contamination surveys but not spectrometry."
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg border p-4 ${item.color}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-1", children: item.type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold text-primary mb-2", children: item.efficiency }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.detail })
                  ]
                },
                item.type
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Typical Applications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 list-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radiation survey meters (Geiger probes):" }),
                  " ",
                  "Standard contamination check instruments used in nuclear power plants, hospitals, and research labs; respond in real-time with audible click-per-count output."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Personnel dosimetry alarms:" }),
                  " ",
                  "Small electronic personal dosimeters with GM or proportional counter elements provide real-time dose rate display and audible alarms at set thresholds."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Pancake GM probes:" }),
                  " ",
                  "Thin mica end-window allows alpha/beta surface contamination monitoring; standard instrument for soil, bench, and hand-and-foot contamination checks."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Portal radiation monitors:" }),
                  " ",
                  "Large-area GM arrays or ionization chambers at building exits and nuclear facility perimeters detect contaminated individuals or materials."
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "scintillation",
          title: "Scintillation Detectors: Crystals, Plastics, and Photodetectors",
          badge: "Advanced",
          open: open.scintillation,
          onToggle: () => toggle("scintillation"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "Scintillation detectors convert radiation energy into visible or near-UV light, which is then converted to an electronic pulse by a photodetector. The pulse height is proportional to the energy deposited, enabling",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "gamma-ray spectroscopy" }),
              ". Three stages determine performance: (1) scintillation yield (photons per keV), (2) photodetector quantum efficiency, and (3) statistical variance in photon collection — together these determine energy resolution."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Photomultiplier Tube (PMT)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                  "The classical photodetector. Light photons strike a photocathode (bialkali material, quantum efficiency ~25%), ejecting a photoelectron. Typically 8–14 dynodes successively multiply the electrons by a factor of ~6–8 each, yielding a total gain of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "10⁵–10⁷" }),
                  ". Output pulse arrives at the anode within a few nanoseconds — enabling coincidence timing in PET at sub-nanosecond resolution."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· High gain (~10⁶), low noise" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Fast: few-ns rise time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Requires ~1,000 V bias voltage" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Sensitive to magnetic fields (→ SiPM preferred for MRI-PET)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Fragile: glass vacuum tube; shock-sensitive" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Silicon Photomultiplier (SiPM)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "An array of Geiger-mode avalanche photodiodes (micro-APDs, ~10–100 μm pitch) operating just above breakdown voltage. Each micro-APD fires a fixed-amplitude Geiger discharge when struck by a photon; total output is the sum of all fired cells — proportional to photon count (provided illumination is below cell density saturation). Gain ~10⁵–10⁶." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Low bias voltage: 25–75 V (vs. ~1,000 V for PMT)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Rugged: solid-state; vibration resistant" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Magnetic-field tolerant: used in MRI-PET scanners" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· High quantum efficiency: ~50–60% (vs. ~25% for PMT)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Temperature-dependent gain → stabilization needed" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Energy Resolution — Sources of Broadening" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Energy resolution R (%) = FWHM / E_peak × 100. For NaI(Tl) at 662 keV, R ≈ 7%. The dominant contributions:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "R^2 = R_{\\\\rm stat}^2 + R_{\\\\rm inh}^2 + R_{\\\\rm collect}^2",
                  annotation: "Quadrature sum of resolution contributions: R_stat (statistical fluctuation in scintillation photon number, scales as 1/√N_ph — larger light yield → better resolution); R_inh (crystal non-uniformity, local light yield variations, impurity clustering in crystal growth); R_collect (light collection non-uniformity — optical coupling, reflector efficiency, solid angle to PMT photocathode). For NaI at 662 keV: N_ph ≈ 38,000 photons — statistical limit alone would give R_stat ≈ 0.5%, but other terms broaden resolution to 7%.",
                  label: "Scintillator Energy Resolution Components"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-3", children: "Scintillator Properties Comparison" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Sources: Saint-Gobain detector product guides; IEEE Trans. Nucl. Sci. review literature; IAEA-TECDOC-1539." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs border-collapse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
                  "Scintillator",
                  "Density (g/cm³)",
                  "Peak emission",
                  "Decay time",
                  "Energy resolution",
                  "Key applications"
                ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-left py-2 pr-3 text-muted-foreground font-medium",
                    children: h
                  },
                  h
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: scintillatorTable.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/50 hover:bg-muted/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-foreground font-semibold font-mono", children: row[0] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right text-foreground font-mono", children: row[1] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-foreground font-mono", children: row[2] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-foreground font-mono", children: row[3] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-primary font-mono font-semibold", children: row[4] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground", children: row[5] })
                    ]
                  },
                  row[0]
                )) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-400/20 bg-amber-400/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Pulse Shape Discrimination (PSD) — Neutron vs. Gamma Separation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Certain organic scintillators (stilbene, EJ-301/EJ-309 liquid, CLYC crystals) produce pulses with different time profiles for neutron vs. gamma interactions. Proton recoil (from fast neutrons) yields a longer tail component than Compton electrons. Plotting charge-ratio (tail / total) vs. energy creates two well-separated bands in the PSD parameter space. Stilbene achieves figure-of-merit (FOM) >2 at fast neutron energies — used extensively in nuclear security, fusion neutron diagnostics, and special nuclear material detection." })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "semiconductors",
          title: "Semiconductor Detectors: HPGe, Si, and CZT",
          badge: "Advanced",
          open: open.semiconductors,
          onToggle: () => toggle("semiconductors"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Semiconductor detectors operate as solid-state ionization chambers. Radiation creates electron-hole pairs directly in the detector crystal. An applied reverse-bias voltage sweeps carriers to electrodes, producing a pulse height proportional to deposited energy. The key advantage is the small average energy per electron-hole pair W — far below gas-filled tubes — yielding more carriers per keV and dramatically better statistical energy resolution." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-3", children: "Energy per Ion Pair — The Statistical Advantage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                {
                  material: "Gas (Ar)",
                  W: "26 eV/pair",
                  pairs_per_keV: "~38",
                  color: "border-border bg-muted/20"
                },
                {
                  material: "Scintillation (NaI→PMT)",
                  W: "~1,000 eV/equiv",
                  pairs_per_keV: "~1",
                  color: "border-blue-400/30 bg-blue-400/5"
                },
                {
                  material: "Si detector",
                  W: "3.62 eV/pair",
                  pairs_per_keV: "~276",
                  color: "border-emerald-400/30 bg-emerald-400/5"
                },
                {
                  material: "HPGe detector",
                  W: "2.98 eV/pair",
                  pairs_per_keV: "~336",
                  color: "border-purple-400/30 bg-purple-400/5"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg border p-3 ${item.color}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: item.material }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold text-primary", children: item.W }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      item.pairs_per_keV,
                      " pairs/keV"
                    ] })
                  ]
                },
                item.material
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: 'More pairs per keV → smaller relative statistical fluctuation (∝ 1/√N) → better energy resolution. HPGe resolution at 1,332 keV (Co-60): ~1.8 keV FWHM ≈ 0.14%. NaI at same energy: ~90 keV FWHM ≈ 7%. Sources: ORTEC detector specifications; Knoll, "Radiation Detection and Measurement," 4th ed.' })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "High-Purity Germanium (HPGe) Detectors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                "Germanium has a small bandgap (0.67 eV at 77 K) meaning thermal excitation at room temperature produces enough leakage current to swamp radiation signals.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "HPGe must be cooled to 77 K (−196°C, liquid nitrogen temperature)" }),
                " ",
                'to achieve usable signal-to-noise. Modern electromechanically cooled systems ("cryo-coolers") eliminate the need for liquid nitrogen but add mechanical complexity.'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "HPGe Detector Geometries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 list-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Coaxial (p-type or n-type):" }),
                      " ",
                      "Cylindrical; active volumes up to ~500 cm³; standard for high-efficiency gamma spectroscopy above ~100 keV."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Planar / Low-Energy HPGe (LEGe):" }),
                      " ",
                      "Thin contact; optimized for 3–200 keV X-ray and low-energy gamma spectroscopy."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Point-Contact (PPC):" }),
                      " ",
                      "Very small electrode → ultra-low capacitance → extremely low electronic noise; excellent for sub-keV energy threshold (dark matter search experiments)."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Segmented HPGe:" }),
                      " ",
                      "Electrode segmentation allows position determination of gamma interaction site; used in Compton cameras and advanced spectroscopy arrays (AGATA, GRETINA)."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Applications" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 list-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "IAEA nuclear safeguards:" }),
                      " ",
                      "Portable HPGe systems identify isotopic composition of nuclear material (U, Pu enrichment level) at declared and undeclared facilities."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Environmental monitoring:" }),
                      " ",
                      "Quantitative analysis of Cs-137, Co-60, Eu-152 in soil, water, and air samples; critical for post-accident monitoring (Fukushima, Chernobyl)."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Nuclear medicine QA:" }),
                      " ",
                      "Radionuclide purity verification of PET and SPECT radiopharmaceuticals per USP and European Pharmacopoeia standards."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Nuclear physics research:" }),
                      " ",
                      "Gamma-ray arrays (AGATA at GANIL; GRETINA at ANL) track gamma de-excitation from exotic nuclei for nuclear structure studies."
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Silicon Detectors" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Silicon is ideal for charged-particle spectroscopy (alpha, beta, heavy ions) because its thin active layer matches the short range of these particles.",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "PIPS detectors" }),
                  " ",
                  "(Passivated Implanted Planar Silicon) achieve alpha energy resolution of <12 keV FWHM — enabling identification of alpha emitters (Pu, Am, Cm) in environmental and waste characterization measurements."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Can operate at room temperature" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Strip detectors provide 2D position sensitivity (μm precision)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Used extensively in nuclear physics beamline experiments" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Radiation hardness matters for accelerator/space applications" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-amber-400/30 bg-amber-400/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "CdZnTe (CZT) — Room-Temperature Semiconductor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "CdZnTe has a bandgap of ~1.6 eV — large enough to suppress thermal leakage at room temperature. High Z (Cd: 48, Te: 52) gives good photoelectric efficiency for gamma rays. Single-polarity charge collection (electrons only) via pixelated anode geometries overcomes the poor hole mobility limitation. Energy resolution: ~1–3% at 662 keV — between NaI and HPGe." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· No cryogenic cooling required → portable, compact" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Used in: SPECT imaging (cardiac, brain), portal monitors," }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "  portable isotope identification devices (RIID)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· NASA NuSTAR telescope uses CZT focal-plane detector arrays" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Trapping of holes in crystal defects limits resolution vs. HPGe" })
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "neutron_detection",
          title: "Neutron Detection: Conversion Reactions and Specialized Detectors",
          badge: "Advanced",
          open: open.neutron_detection,
          onToggle: () => toggle("neutron_detection"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "Neutrons carry no electric charge and therefore cannot directly ionize detector materials. They must first be",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "converted" }),
              " to secondary charged particles through nuclear reactions. The choice of converter reaction and detector type depends critically on whether thermal or fast neutrons are being detected."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Thermal Neutron Conversion Reactions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [
                    "Detector type",
                    "Conversion reaction",
                    "Cross-section",
                    "Key use case"
                  ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "text-left py-2 pr-4 text-muted-foreground font-medium",
                      children: h
                    },
                    h
                  )) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: neutronDetectorTable.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-semibold text-xs", children: row[0] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-muted-foreground font-mono text-xs", children: row[1] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-primary font-mono text-xs font-semibold", children: row[2] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[3] })
                      ]
                    },
                    row[0]
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Cross-sections at 0.025 eV (thermal). Source: ENDF/B-VIII.0 via NNDC; IAEA-NDS. ³He cross-section drops as 1/v above thermal." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-rose-400/20 bg-rose-400/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-1 text-sm", children: "³He Worldwide Shortage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "³He is a rare stable isotope produced primarily as a byproduct of tritium decay in nuclear weapons stockpile maintenance programs. Post-9/11 demand for neutron detectors in cargo/portal monitors (homeland security) consumed global reserves far faster than production could replenish. Since ~2009, the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "³He supply crisis" }),
                " ",
                "has driven intense development of alternatives: boron-lined straw tubes, boron-10-coated proportional counters, LiF/ZnS scintillator panels, and CLYC crystals. Cost rose from ~$100/L to >$1,000/L. [PNNL-SA-68385; DoE Office of Science report, 2010]"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Fast Neutron Detection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                {
                  title: "Proton Recoil (Organic Scintillators)",
                  body: "Fast neutrons (>100 keV) scatter elastically off hydrogen nuclei in organic scintillators or proportional counters. The recoil proton is a high-LET charged particle that ionizes/scintillates efficiently. The maximum proton recoil energy equals the neutron kinetic energy (E_p,max = E_n) for head-on H–n collisions. With pulse shape discrimination (PSD), neutron and gamma events are separated, enabling fast neutron spectrometry.",
                  badge: "Most common method"
                },
                {
                  title: "Fission Chambers",
                  body: "A thin coating of fissile material (²³⁵U, ²³⁹Pu, or ²³²Th for threshold detection) on electrode surfaces enables neutron detection via fission fragment ionization. Fission fragments have ~80–100 MeV kinetic energy — far above most gamma backgrounds — giving virtually gamma-blind neutron response. Used in reactor control systems, flux mapping, and spent fuel monitoring.",
                  badge: "Reactor flux monitoring"
                },
                {
                  title: "Bonner Sphere Spectrometer (BSS)",
                  body: "A single thermal neutron detector (e.g., ³He tube or LiI crystal) is placed at the center of a series of spherical polyethylene moderators of different diameters (2–30 cm). Smaller spheres detect fast neutrons; larger spheres thermalize and detect slow neutrons. The response matrix R(d, E) maps sphere diameter d and neutron energy E to count rate — the neutron energy spectrum is unfolded using MAXED or FRUIT codes. Gold standard for workplace neutron spectrometry.",
                  badge: "Gold standard for spectroscopy"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-1 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm", children: item.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium shrink-0", children: item.badge })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.body })
                  ]
                },
                item.title
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Rem Meters: Dose-Equivalent Neutron Survey Instruments" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "The ambient dose equivalent H*(10) from neutrons is notoriously difficult to measure because it depends strongly on energy (w_R varies from 2 to 20). A",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "rem meter" }),
                " (e.g., Andersson-Braun or WENDI-II design) uses a spherical or cylindrical polyethylene moderator surrounding a thermal neutron detector, with additional high-Z absorbers and perforations engineered so the instrument response curve approximately tracks the ICRP fluence-to-dose conversion factor H*(10)/Φ across a wide neutron energy range (thermal to >100 MeV). The readout is directly in μSv/h, integrating flux-weighted dose equivalent across the energy spectrum."
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "gamma_spectrometry",
          title: "Gamma-Ray Spectrometry: Analysis, Calibration, and Identification",
          badge: "Advanced",
          open: open.gamma_spectrometry,
          onToggle: () => toggle("gamma_spectrometry"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "A gamma-ray spectrum is the fingerprint of a radionuclide mixture. Every isotope emits characteristic gamma lines at specific energies — identifying which lines are present (qualitative analysis) and how intense they are relative to a calibrated efficiency function (quantitative analysis) enables radionuclide identification and activity measurement. HPGe spectrometry is the gold standard; NaI is used when portability outweighs resolution requirements." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-3", children: "Key Spectral Features" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: spectrumFeatures.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg border p-4 ${feature.color}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-1", children: feature.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: feature.description })
                  ]
                },
                feature.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Compton Edge Energy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "E_{\\\\rm CE} = E_\\\\gamma \\\\cdot \\\\frac{2E_\\\\gamma / m_e c^2}{1 + 2E_\\\\gamma / m_e c^2}",
                  annotation: "Compton edge energy E_CE: maximum kinetic energy transferred to a Compton electron in a single backscatter interaction (θ = 180°). m_e c² = 0.511 MeV. For Cs-137 (E_γ = 662 keV): E_CE = 477 keV. The full-energy peak and Compton edge are the two most important features for gamma source identification. The gap between them (662 − 477 = 185 keV for Cs-137) contains only the Compton continuum.",
                  label: "Compton Edge Energy"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Energy and Efficiency Calibration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Before quantitative analysis, two calibrations are required:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Energy Calibration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Known sources (e.g., Co-57 at 122 keV, Cs-137 at 662 keV, Co-60 at 1,173 and 1,332 keV) establish a channel-number vs. energy linear (or polynomial) mapping. A minimum of 3–5 calibration points spanning the energy range is recommended. Residuals should be <0.1 keV for HPGe." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono text-primary space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Co-57: 122.06 keV" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cs-137: 661.66 keV" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Co-60: 1173.24 keV, 1332.50 keV" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Eu-152: 121.78, 344.28, 1408.01 keV" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Efficiency Calibration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "A calibrated multi-nuclide source (e.g., NIST-traceable Eu-152 point source) is counted in the exact geometry used for samples. Full-energy peak efficiency ε(E) = counts / (Bq × I_γ × time). Efficiency is fit as a smooth function of energy (polynomial in log–log space). Absolute activity of unknowns:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    EquationBlock,
                    {
                      latex: "A = \\\\frac{N_{\\\\rm net}}{\\\\varepsilon(E) \\\\cdot I_\\\\gamma \\\\cdot t}",
                      annotation: "Activity A (Bq) from net peak area N_net (background-subtracted counts), full-energy peak efficiency ε(E), gamma emission probability per decay I_γ, and live time t. Decay correction needed if T½ is comparable to measurement time.",
                      label: "Activity from Peak Area"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Minimum Detectable Activity (MDA)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "The MDA (Currie, 1968; MARLAP guidance) defines the smallest activity that can be distinguished from background at a specified confidence level (typically 95%, k = 1.645 for one-sided test):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "\\\\text{MDA} = \\\\frac{L_C + 2.71/2 + 1.645\\\\sqrt{2 B}}{\\\\varepsilon(E) \\\\cdot I_\\\\gamma \\\\cdot t}",
                  annotation: "MDA formula (Currie 1968, Poisson approximation). L_C = critical level = 1.645√B (counts); B = background counts in peak region. For long counting times and low background (typical HPGe in-lab): MDA can reach millibequerel levels. For field NaI instruments: typically 100–1,000 Bq/kg. Increasing counting time t reduces MDA as 1/√t — doubling time reduces MDA by √2.",
                  label: "Minimum Detectable Activity"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-3", children: "Detector Selection for Spectrometry Applications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Parameter", "NaI(Tl)", "LaBr₃(Ce)", "HPGe", "CZT"].map(
                    (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "th",
                      {
                        className: "text-left py-2 pr-4 text-muted-foreground font-medium",
                        children: h
                      },
                      h
                    )
                  ) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                    [
                      "Energy resolution @ 662 keV",
                      "~7%",
                      "~2.5%",
                      "~0.15%",
                      "~1–3%"
                    ],
                    [
                      "Cooling required",
                      "No",
                      "No",
                      "Yes (LN₂ or mech.)",
                      "No"
                    ],
                    ["Relative cost", "$", "$$", "$$$", "$$"],
                    [
                      "Gamma efficiency (3×3 in)",
                      "High",
                      "High",
                      "Medium–high",
                      "Low–medium"
                    ],
                    [
                      "Portability",
                      "Excellent",
                      "Excellent",
                      "Limited",
                      "Excellent"
                    ],
                    [
                      "Isotope ID capability",
                      "Limited",
                      "Good",
                      "Excellent",
                      "Good"
                    ],
                    [
                      "Typical use",
                      "Surveys, dose calibration",
                      "Emergency response, safeguards",
                      "Lab spectrometry, IAEA, env. monitoring",
                      "Portable RIID, medical SPECT, space"
                    ]
                  ].map(([param, ...vals]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground text-xs font-semibold", children: param }),
                        vals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: "py-2 pr-4 text-xs text-muted-foreground font-mono",
                            children: v
                          },
                          v
                        ))
                      ]
                    },
                    param
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Sources: ORTEC/Mirion/Canberra detector specifications; IAEA-TECDOC-1363; ANSI N42.14 performance standards." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Analysis Software and Applications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1.5", children: "Commercial" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-muted-foreground space-y-1 list-none text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· ORTEC GammaVision: industry standard HPGe analysis" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Canberra Genie 2000: full spectroscopy suite + efficiency" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· LABSOCS (Canberra): Monte Carlo efficiency simulation without physical calibration sources" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Maestro: ORTEC MCA emulator with peak analysis" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1.5", children: "Open-Source / Free" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-muted-foreground space-y-1 list-none text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· InterSpec (PNNL): portable, full-featured; DoE-released; iOS/Android/desktop" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Gamma Spy (NRC-funded): peak identification, nuclide library" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· ROOT (CERN): full scientific analysis framework; custom spectroscopy" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· FRAM (LANL): plutonium and uranium isotopic ratio analysis" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Key applications:" }),
                " ",
                "IAEA safeguards inspectors use portable HPGe + LaBr₃ to verify declared nuclear material. Emergency response teams deploy NaI and LaBr₃ for rapid isotope identification after radiological incidents. Environmental monitoring networks (e.g., IMS radionuclide stations under the CTBTO Comprehensive Test Ban Treaty) use HPGe detectors to monitor for clandestine nuclear tests — capable of detecting Xe-133 from a ~1 kt underground explosion at global distances."
              ] })
            ] })
          ] })
        }
      )
    ] })
  ] });
}
export {
  RadiationDetection as default
};
