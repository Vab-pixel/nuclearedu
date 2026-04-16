import { r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, a as ChevronDown, C as ChevronRight } from "./index-D72vKdFv.js";
import { E as EquationBlock } from "./EquationBlock-D9ydULky.js";
import { P as PageHeader } from "./PageHeader-ofvrIJP7.js";
import { S as SectionCard } from "./SectionCard-BzQex3f6.js";
const radiationTypes = [
  {
    type: "Alpha (α)",
    composition: "2 protons + 2 neutrons (⁴He nucleus)",
    penetration: "Stopped by paper, skin, ~5 cm air",
    ionization: "Very high (high LET)",
    hazard: "External: minimal. Internal: very dangerous.",
    color: "border-rose-400/30 bg-rose-400/5 text-rose-400",
    examples: [
      "U-238 → Th-234",
      "Ra-226 → Rn-222",
      "Am-241 in smoke detectors"
    ]
  },
  {
    type: "Beta (β)",
    composition: "Electron (β⁻) or positron (β⁺)",
    penetration: "Stopped by ~1 cm plastic, light metal",
    ionization: "Medium",
    hazard: "External: skin/eye exposure possible. Internal: significant.",
    color: "border-blue-400/30 bg-blue-400/5 text-blue-400",
    examples: [
      "Sr-90 in nuclear waste",
      "C-14 in dating",
      "F-18 in PET imaging"
    ]
  },
  {
    type: "Gamma (γ)",
    composition: "High-energy photon (0.01–10 MeV)",
    penetration: "Requires cm of lead or meters of concrete",
    ionization: "Low (low LET)",
    hazard: "Whole-body external exposure; highly penetrating.",
    color: "border-purple-400/30 bg-purple-400/5 text-purple-400",
    examples: [
      "Tc-99m (140 keV) in medicine",
      "Co-60 in radiotherapy",
      "Cs-137 in industry"
    ]
  },
  {
    type: "Neutron (n)",
    composition: "Electrically neutral particle",
    penetration: "Penetrating; requires hydrogen-rich shielding",
    ionization: "Indirect (activates nuclei, produces recoil protons)",
    hazard: "Penetrating whole-body; can activate materials.",
    color: "border-amber-400/30 bg-amber-400/5 text-amber-400",
    examples: [
      "Reactor cores",
      "Cosmic ray interactions",
      "Californium-252 sources"
    ]
  }
];
const letComparisonData = [
  ["Gamma (1 MeV)", "0.3", "1", "Entire body (cm of Pb to attenuate)"],
  ["X-ray (100 keV)", "0.5–2", "1", "Entire body"],
  ["Beta / electrons", "0.2–2", "1", "mm–cm in tissue"],
  [
    "Proton (100 MeV)",
    "~0.5 (plateau), ~80 (Bragg peak)",
    "2–5",
    "~10 cm (tunable by energy)"
  ],
  ["Alpha (5 MeV)", "~80–100", "20", "~37 μm in tissue; ~3.7 cm in air"],
  [
    "Carbon ion (at Bragg peak)",
    "~30–100",
    "2–3",
    "Bragg peak depth tunable ~5–30 cm"
  ],
  [
    "Neutron (1 MeV, indirect)",
    "Varies via recoil protons",
    "5–20",
    "~10 cm penetration"
  ],
  ["Fission fragment", "~1,000–2,000", "20+", "~10–20 μm in tissue"]
];
const hvlData = [
  ["Cs-137 (662 keV)", "Water", "8.5 cm"],
  ["Cs-137 (662 keV)", "Concrete", "6.0 cm"],
  ["Cs-137 (662 keV)", "Lead", "0.65 cm"],
  ["Co-60 (1.25 MeV avg)", "Water", "11.0 cm"],
  ["Co-60 (1.25 MeV avg)", "Concrete", "7.8 cm"],
  ["Co-60 (1.25 MeV avg)", "Lead", "1.2 cm"],
  ["Ir-192 (0.38 MeV avg)", "Lead", "0.41 cm"]
];
const doseData = [
  ["Natural background (worldwide)", "2.4 mSv/yr", "UNSCEAR global average"],
  ["Chest X-ray", "0.02 mSv", "Very low dose"],
  ["Transatlantic flight", "0.03–0.1 mSv", "Cosmic ray increase at altitude"],
  ["Abdominal CT scan", "8 mSv", "Significant; justified medically"],
  ["NRC occupational limit", "50 mSv/yr", "Regulatory annual limit"],
  ["Fukushima evacuation zone", "<50 mSv/yr", "Below deterministic threshold"],
  [
    "Radiation therapy (tumor)",
    "60–70 Gy to target",
    "Very high, highly localized"
  ],
  ["Lethal dose LD₅₀/₃₀ (whole body)", "~4 Gy", "50% mortality within 30 days"]
];
const neutronEnergyRanges = [
  [
    "Thermal",
    "~0.025 eV (25 meV)",
    "In equilibrium with room-temperature matter; large capture cross-sections",
    "Nuclear reactors (moderated), neutron diffractometers"
  ],
  [
    "Epithermal",
    "1 eV – 100 keV",
    "Resonance region; many nuclides have sharp capture peaks",
    "Reactor moderation region, neutron activation analysis"
  ],
  [
    "Fast",
    ">100 keV (up to ~10 MeV)",
    "Produced directly by fission; little moderation",
    "Fast reactors, fusion neutrons (~14.1 MeV), cosmic ray spallation"
  ]
];
const neutronModerationData = [
  [
    "Hydrogen-1 (H₂O / CH₂)",
    "1",
    "1.00",
    "~18",
    "Best moderator; also good absorber"
  ],
  [
    "Deuterium (D₂O)",
    "2",
    "0.725",
    "~25",
    "Very low absorption; used in CANDU"
  ],
  [
    "Helium-4 (gas)",
    "4",
    "0.425",
    "~43",
    "Impractical as liquid; poor moderator"
  ],
  [
    "Beryllium-9",
    "9",
    "0.209",
    "~87",
    "Low absorption; used in research reactors"
  ],
  [
    "Carbon-12 (graphite)",
    "12",
    "0.158",
    "~115",
    "Used in gas-cooled reactors (AGR, RBMK)"
  ],
  ["Oxygen-16", "16", "0.120", "~152", "Present in H₂O; not primary moderator"],
  ["Uranium-238", "238", "0.0084", "~2,172", "Extremely poor moderator"]
];
const doseLimits = [
  [
    "General public — effective dose",
    "1 mSv/yr",
    "Above natural background; ICRP-103"
  ],
  ["General public — eye lens", "15 mSv/yr", "ICRP-103"],
  ["General public — skin, hands, feet", "50 mSv/yr", "ICRP-103"],
  [
    "Occupational workers — effective dose",
    "20 mSv/yr (5-yr avg), max 50 mSv/yr",
    "ICRP-103 §6.3"
  ],
  ["Occupational workers — eye lens", "20 mSv/yr", "ICRP-118 (2012 revision)"],
  ["Occupational workers — skin, hands, feet", "500 mSv/yr", "ICRP-103"],
  [
    "Emergency workers — life-saving",
    "Up to 1,000 mSv",
    "ICRP-103; only if benefits outweigh risks"
  ],
  [
    "Natural background worldwide",
    "2.4 mSv/yr (range 1–10)",
    "UNSCEAR 2008 Report"
  ],
  ["Chest X-ray", "0.02–0.1 mSv", "UNSCEAR 2008"],
  ["CT scan (abdomen/pelvis)", "2–20 mSv", "UNSCEAR 2008"],
  ["Nuclear medicine SPECT scan", "2–5 mSv", "UNSCEAR 2008"],
  ["PET/CT (F-18 FDG)", "~7–14 mSv", "IAEA safety standards"]
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
      "data-ocid": `radiation.${id}_card`,
      className: "p-0 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "w-full flex items-center justify-between p-6 text-left hover:bg-muted/20 transition-colors",
            "aria-expanded": open,
            "data-ocid": `radiation.${id}_toggle`,
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
function RadiationTypes() {
  const [open, setOpen] = reactExports.useState({
    let_stopping: false,
    bragg_peak: false,
    photon_interactions: false,
    neutron_moderation: false,
    dose_quantities: false,
    dose_weighting: false,
    rbe_effects: false,
    neutron_shielding: false
  });
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Types of Radiation",
        subtitle: "Not all radiation is the same — alpha particles, beta particles, gamma rays, and neutrons interact with matter in fundamentally different ways, governed by their charge, mass, and energy.",
        audienceLevel: "beginner",
        readTimeMin: 30
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "radiation.intro_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Ionizing vs. Non-Ionizing Radiation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
          "Nuclear radiation is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "ionizing" }),
          " — it carries enough energy to knock electrons from atoms, creating ion pairs along its path. This is fundamentally different from radio waves, visible light, or microwaves, which lack sufficient photon energy to ionize. The boundary lies around 10–12 eV: nuclear radiation carries energies from keV to hundreds of MeV — millions of times greater."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "Ionizing radiation can break chemical bonds, including the phosphodiester backbone of DNA. The biological consequence depends not only on the total energy deposited but on ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "how densely" }),
          " ",
          "that energy is deposited along the particle track — a property called Linear Energy Transfer (LET). A 5 MeV alpha particle deposits its energy in a cylindrical column of a few micrometres; a 1 MeV gamma photon produces sparse ionization over centimetres."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: radiationTypes.map((rt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl border p-5 ${rt.color}`,
          "data-ocid": `radiation.type_card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold mb-3", children: rt.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-1.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground shrink-0 w-24", children: "Composition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: rt.composition })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground shrink-0 w-24", children: "Penetration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: rt.penetration })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground shrink-0 w-24", children: "Ionization" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: rt.ionization })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground shrink-0 w-24", children: "Hazard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: rt.hazard })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-2 border-t border-current/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-semibold", children: "Examples" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs text-muted-foreground space-y-0.5 list-none", children: rt.examples.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-current", children: "·" }),
                ex
              ] }, ex)) })
            ] })
          ]
        },
        rt.type
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "radiation.inverse_square_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Inverse Square Law" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "For a point source emitting radiation isotropically, intensity decreases with the square of distance:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "I \\\\propto \\\\frac{1}{r^2}",
            annotation: "Radiation intensity I is inversely proportional to the square of the distance r from the source. Doubling distance reduces intensity to one-quarter. This is a key radiation protection principle — stepping back from 1 m to 3 m reduces dose rate nine-fold.",
            label: "Inverse Square Law"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
          "The three principles of radiation protection are",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "time" }),
          " (minimize exposure duration), ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "distance" }),
          " ",
          "(maximize separation from source), and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "shielding" }),
          " (place absorbing material between source and person). The inverse square law makes distance the most cost-effective first step."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "let_stopping",
          title: "Linear Energy Transfer (LET) and Stopping Power",
          badge: "Advanced",
          open: open.let_stopping,
          onToggle: () => toggle("let_stopping"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Linear Energy Transfer (LET)" }),
              " ",
              "quantifies how densely a charged particle deposits energy along its path through matter, measured in keV/μm (keV per micrometre) in water-equivalent tissue. LET is the single most important parameter linking radiation physics to radiobiology — it determines how clustered the ionization damage is, which controls the probability of DNA double-strand break (DSB) clusters that cells cannot efficiently repair."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Low-LET Radiation (0.2–2 keV/μm)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gamma rays, X-rays, and beta particles. Ionization events are sparse — separated by hundreds of nanometres along the track. DNA damage is predominantly single-strand breaks (SSBs) that cells repair via base excision repair (BER) or nucleotide excision repair (NER) with high fidelity." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "High-LET Radiation (>10 keV/μm)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Alpha particles (~80–100 keV/μm), fission fragments (~1,000–2,000 keV/μm), and heavy cosmic ray ions (Fe-56: several thousand keV/μm). Dense cylindrical ionization columns cause ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "clustered DSBs" }),
                  " within one helical turn of DNA (~3.4 nm) — far more difficult for cells to repair via homologous recombination, leading to higher biological damage per unit dose."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Bethe-Bloch Formula — Stopping Power of Heavy Charged Particles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "The mean energy loss per unit path length of a heavy charged particle moving through matter is described by the Bethe-Bloch equation. In the non-relativistic limit (v ≪ c), stopping power scales as z²/v², where z is the projectile charge number:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "-\\\\frac{dE}{dx} = \\\\frac{4\\\\pi e^4 N_A Z_{\\\\rm target} z^2}{m_e v^2} \\\\left[\\\\ln\\\\frac{2m_e v^2}{I} - \\\\beta^2\\\\right]",
                  annotation: "Bethe-Bloch stopping power. z = projectile charge; Z_target = target atomic number; N_A = Avogadro number × target electron density; m_e = electron mass; v = particle speed; I = mean excitation potential ≈ 10·Z eV for most materials (13.5 eV for water); β = v/c. Critical insight: stopping power ∝ z²/v² — as a particle slows down (v decreases), it loses energy faster, producing the Bragg peak near the end of range.",
                  label: "Bethe-Bloch Stopping Power"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "For electrons, the Bethe formula is modified (Møller scattering; bremsstrahlung terms become significant above ~1 MeV). Heavy charged particles lose energy almost entirely to ionization and excitation below ~100 MeV/nucleon; radiative losses are negligible." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-3", children: "LET Comparison Table" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Representative LET values, radiation weighting factors (w_R from ICRP-103), and penetration ranges in soft tissue. Sources: ICRU Report 16, ICRP-103, NIST PSTAR/ASTAR databases." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Radiation Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "LET (keV/μm)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "w_R (ICRP-103)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Range in Tissue" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: letComparisonData.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground", children: row[0] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs", children: row[1] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-semibold font-mono", children: row[2] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[3] })
                      ]
                    },
                    row[0]
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Sources: ICRU Report 16 (LET), ICRP-103 Table 2 (w_R), NIST PSTAR/ASTAR. LET values approximate; proton LET increases dramatically at the Bragg peak." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Track Structure and DNA Damage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "The ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "track structure" }),
                ' of low-LET radiation consists of sparse δ-ray (knock-on electron) tracks separated by large gaps — ionization events occur ~1,000 Å apart on average. High-LET heavy ions produce a dense core of direct ionization (~few nm radius) surrounded by a penumbra of energetic δ-rays extending up to micrometres. Within the core, ionization density exceeds the capacity of cellular repair pathways, producing complex clustered lesions (multiple DSBs within ~10 bp). These "multiply-damaged sites" are the primary cause of the elevated RBE of high-LET radiation for cell killing and carcinogenesis [Ward, 1988; ICRP-92, 2003].'
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "bragg_peak",
          title: "The Bragg Peak: Charged Particle Therapy",
          badge: "Advanced",
          open: open.bragg_peak,
          onToggle: () => toggle("bragg_peak"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "Because stopping power scales as 1/v² (Bethe-Bloch), a heavy charged particle deposits most of its energy near the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "end" }),
              " ",
              "of its track, just before stopping. This sharp maximum in dose deposition — the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Bragg peak" }),
              " — is one of the most clinically important phenomena in radiation physics. First observed by William Henry Bragg in 1904 using alpha particles from radium, it now forms the physical basis of proton and carbon ion cancer therapy."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Photons (X-rays, gammas)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Photon beams attenuate ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "exponentially" }),
                  " in tissue: I = I₀ e^(−μx). Maximum dose is deposited near the surface (or just below it for megavoltage beams, due to build-up). Dose continues beyond any tumor — surrounding and distal tissues receive significant dose."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· No abrupt distal dose cutoff" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Entrance and exit dose always present" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Requires multiple beams to concentrate dose in tumor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· IMRT/VMAT techniques optimize beam angles to spare OARs" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-rose-400/30 bg-rose-400/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Protons & Heavy Ions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Charged particles slow down continuously, reach peak LET at the Bragg peak, then stop abruptly.",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Dose beyond the peak ≈ 0." }),
                  " The beam range is precisely controlled by selecting beam energy."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Sharp distal dose falloff within ~few mm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Entrance dose is lower than peak dose" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Minimal exit dose → spares distal organs at risk (OARs)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Range tunable by degraders or energy-variable synchrotrons" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Range–Energy Relationship" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "In tissue (water equivalent), the CSDA (continuous-slowing-down approximation) range scales approximately as E^(4/3) for heavy charged particles. Key clinical benchmarks from NIST PSTAR database (protons in water):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
                {
                  energy: "10 MeV proton",
                  range: "~1.2 mm",
                  use: "Shallow superficial target"
                },
                {
                  energy: "100 MeV proton",
                  range: "~7.7 cm",
                  use: "Head & neck tumors"
                },
                {
                  energy: "200 MeV proton",
                  range: "~25.7 cm",
                  use: "Deep-seated tumors"
                },
                {
                  energy: "250 MeV proton",
                  range: "~38 cm",
                  use: "Maximum clinical depth"
                },
                {
                  energy: "5 MeV alpha",
                  range: "~37 μm",
                  use: "Stopped in dead skin cells"
                },
                {
                  energy: "290 MeV/u C-12",
                  range: "~15 cm",
                  use: "Standard carbon ion energy at HIT"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1 font-mono", children: item.energy }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary", children: item.range }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.use })
                  ]
                },
                item.energy
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Spread-Out Bragg Peak (SOBP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                "A single monoenergetic Bragg peak is only a few mm wide — insufficient to cover an extended tumor volume. In clinical practice, a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Spread-Out Bragg Peak (SOBP)" }),
                " ",
                "is created by superimposing multiple pencil beams of different energies (and thus different ranges). The resulting dose distribution is flat across the target volume and drops sharply at the distal edge. Modern",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "pencil beam scanning (PBS)" }),
                " ",
                "magnetically steers the beam in 3D across the tumor voxel-by-voxel, delivering the SOBP with superior dose conformality."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Carbon Ion Therapy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                "Carbon ions (C-12, Z=6) offer two advantages over protons: (1) sharper lateral penumbra due to higher mass reducing multiple Coulomb scattering, and (2) much higher LET at the Bragg peak (~80–100 keV/μm vs. ~80 keV/μm for protons at peak), giving RBE values of 2–3. This makes carbon ions effective against",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "radioresistant" }),
                " hypoxic tumors (sarcomas, adenoid cystic carcinoma, hepatocellular carcinoma) that respond poorly to photons."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Facilities Worldwide (2024)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· ~100 proton therapy centers operating globally" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· ~14 carbon ion therapy facilities in Asia and Europe" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· First carbon therapy: HIMAC, Chiba, Japan (1994)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· European flagship: HIT, Heidelberg, Germany (2009)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· NIRS (Japan): >11,000 patients treated with C-12" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Physical Challenges" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Range uncertainty: ±3–5 mm from CT Hounsfield unit conversion" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Nuclear fragmentation: C-12 breaks up in tissue → fragmentation tail distal to Bragg peak" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· RBE variation: requires biological dose optimization (LEM, MKM models)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Cost: carbon synchrotrons ~€200–400 M vs. ~€80–150 M for protons" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-amber-400/20 bg-amber-400/5 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Clinical Evidence:" }),
              " ",
              "Proton therapy demonstrates a 50–60% reduction in integral dose to normal tissue compared to IMRT for head-and-neck and pediatric tumors [Lomax et al., 2003; Miralbell et al., 2002]. For skull base chordomas, proton/carbon therapy achieves 5-year local control rates of 73–96% vs. <50% for photons [Amichetti et al., 2010; Schulz-Ertner et al., 2007]. The reduced exit dose is especially important in pediatric patients to minimize second-cancer risk."
            ] }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "photon_interactions",
          title: "Gamma Ray and X-Ray Interactions with Matter",
          badge: "Advanced",
          open: open.photon_interactions,
          onToggle: () => toggle("photon_interactions"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Unlike charged particles, photons (X-rays and gamma rays) travel through matter without continuous energy loss. They are removed from a beam through discrete, probabilistic interaction events. Three processes dominate, each controlling in a different regime of photon energy and target atomic number Z. The total linear attenuation coefficient μ = μ_PE + μ_C + μ_PP." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground mb-2 flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-400 border border-rose-400/30", children: "E < 0.5 MeV · high Z" }),
                  "1. Photoelectric Effect"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                  "The photon is ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "completely absorbed" }),
                  " by an inner-shell (K or L) bound electron. The electron is ejected with kinetic energy T = E_γ − B_e, where B_e is the electron binding energy. The resulting vacancy is filled by outer-shell electrons, emitting characteristic X-rays (fluorescence) or Auger electrons."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Cross-section: σ_PE ∝ Z⁴·⁵ / E^3.5 — extremely sensitive to atomic number and inversely to photon energy" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· At 100 keV in Pb (Z=82): photoelectric is dominant (~70% of total attenuation)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· In soft tissue (effective Z ≈ 7.4): dominant below ~25–30 keV" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    "·",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Basis of X-ray radiography:" }),
                    " ",
                    "bone (Ca, Z=20) absorbs far more than soft tissue (Z≈7.4) via σ ∝ Z⁴·⁵"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Iodine (Z=53) and barium (Z=56) contrast agents: K-edge at 33 and 37 keV — dramatic cross-section enhancement just above the K-edge energy" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground mb-2 flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-400 border border-blue-400/30", children: "0.1–10 MeV · any Z" }),
                  "2. Compton Scattering"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "The photon scatters inelastically off a quasi-free outer-shell electron. Both a scattered photon (reduced energy, longer wavelength) and a recoil electron emerge. Named after Arthur H. Compton (Nobel Prize, 1927)." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "E'_\\\\gamma = \\\\frac{E_\\\\gamma}{1 + \\\\dfrac{E_\\\\gamma}{m_e c^2}(1 - \\\\cos\\\\theta)}",
                    annotation: "Compton formula for scattered photon energy. E_γ = incident energy; m_e c² = 0.511 MeV (electron rest mass); θ = photon scattering angle. At θ=0° (forward scatter): E'_γ = E_γ (no energy loss). At θ=180° (backscatter): maximum energy transferred to electron; this defines the Compton edge in gamma-ray spectra.",
                    label: "Compton Scattered Photon Energy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Cross-section σ_C ∝ Z/E (Klein-Nishina formula) — dominant for soft tissue 50 keV – 10 MeV" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Nearly independent of Z per electron → poor material discrimination (no contrast between tissue types at these energies)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    "·",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Clinical implication:" }),
                    " ",
                    "Compton scatter degrades image contrast in nuclear medicine; scatter correction algorithms essential for SPECT and PET"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Compton edge: maximum energy deposited in a gamma detector in a single event — used in gamma spectroscopy for energy calibration" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground mb-2 flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-400 border border-purple-400/30", children: "E > 1.022 MeV · high Z" }),
                  "3. Pair Production"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "In the Coulomb field of a nucleus, a photon spontaneously converts into an electron-positron (e⁻e⁺) pair. This is a direct manifestation of E = mc². The threshold is exactly 2m_e c² = 1.022 MeV. Any excess photon energy above threshold is shared as kinetic energy of the pair. The positron rapidly slows, annihilates with an ambient electron, and emits two collinear 511 keV photons — the signature exploited in PET imaging." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Cross-section σ_PP ∝ Z² × ln(E_γ) — increases with energy; strongly favors high-Z materials" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Triplet production: pair creation in electron Coulomb field; threshold 4m_e c² = 2.044 MeV; cross-section ∝ Z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· At 10 MeV in Pb: pair production accounts for ~80% of total attenuation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    "· ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "PET imaging:" }),
                    " ",
                    "Coincidence detection of both 511 keV photons within ~5 ns time window defines the annihilation line-of-response; >10 million lines reconstructed per scan"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Beer-Lambert Attenuation Law and Half-Value Layer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "A narrow-beam monoenergetic photon beam traversing thickness x of a homogeneous attenuator is attenuated exponentially:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "I = I_0 \\\\, e^{-\\\\mu x}",
                    annotation: "Beer-Lambert exponential attenuation law. I₀ = initial beam intensity; μ = linear attenuation coefficient (cm⁻¹) = mass attenuation coefficient (μ/ρ in cm²/g) × density ρ. Valid for narrow-beam, monoenergetic photons. For broad beams or polyenergetic sources, a buildup factor B is introduced: I = B × I₀ × e^(−μx).",
                    label: "Photon Beam Attenuation"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "\\\\text{HVL} = \\\\frac{\\\\ln 2}{\\\\mu} = \\\\frac{0.693}{\\\\mu}",
                    annotation: "Half-Value Layer (HVL): the thickness that reduces beam intensity by exactly 50%. The Tenth-Value Layer (TVL) = 3.32 × HVL. Example: Co-60 (1.25 MeV) in lead — μ = 0.580 cm⁻¹, HVL = 1.20 cm. To achieve a dose reduction factor of 1,000 (typical for radiation room design), approximately 10 HVLs are required.",
                    label: "Half-Value Layer (HVL)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Source" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Shielding Material" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "μ (cm⁻¹)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-medium", children: "HVL" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: hvlData.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-mono text-xs", children: row[0] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground", children: row[1] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs", children: "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right text-foreground font-mono", children: row[2] })
                      ]
                    },
                    `${row[0]}-${row[1]}`
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Sources: NIST XCOM photon cross-section database; NCRP Report 49. HVL values for narrow-beam geometry. Broad-beam (buildup) HVLs are 10–30% larger." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Energy-Dominance Crossover Points (in soft tissue, effective Z ≈ 7.4)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: [
                {
                  regime: "PE → Compton",
                  energy: "~30 keV",
                  note: "Below ~30 keV, photoelectric dominates in tissue"
                },
                {
                  regime: "Compton → Pair Production",
                  energy: "~25 MeV",
                  note: "Above ~25 MeV, pair production exceeds Compton in tissue"
                },
                {
                  regime: "In Lead (high Z = 82)",
                  energy: "Crossover ~0.5 MeV & ~5 MeV",
                  note: "PE dominates below 0.5 MeV; PP above 5 MeV; Compton only 0.5–5 MeV"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: item.regime }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary font-mono", children: item.energy }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.note })
                  ]
                },
                item.regime
              )) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "neutron_moderation",
          title: "Neutron Interactions and Moderation",
          badge: "Advanced",
          open: open.neutron_moderation,
          onToggle: () => toggle("neutron_moderation"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "Neutrons carry no electric charge, so they pass through atomic electron clouds entirely unimpeded and interact ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "only" }),
              " via the strong nuclear force — through direct contact with nuclei. Their interactions are strongly energy-dependent and span elastic scattering, inelastic scattering, radiative capture, and fission."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                title: "Elastic Scattering — (n,n)",
                badge: "Primary moderation mechanism",
                body: "The neutron bounces off a nucleus with total kinetic energy conserved. In the center-of-mass frame, maximum fractional energy transfer per collision is ΔE/E_max = 4A/(1+A)² where A is target mass number. For hydrogen (A=1): 100% — a neutron can transfer all its energy to a proton in one head-on collision. For carbon (A=12): ΔE/E_max = 28.4%. This is the basis of neutron moderation in reactor design and shielding."
              },
              {
                title: "Inelastic Scattering — (n,n'γ)",
                badge: "Threshold reaction",
                body: "The neutron excites the nucleus to a higher energy state, losing kinetic energy in excess of the threshold. The nucleus de-excites by emitting a prompt gamma ray. Requires threshold energy typically 0.1–1 MeV. Important for fast-neutron attenuation in structural materials (iron, lead) — the neutron loses energy AND generates secondary gammas that must also be shielded."
              },
              {
                title: "Radiative Capture — (n,γ)",
                badge: "Basis of neutron detection",
                body: "The nucleus absorbs the neutron and emits one or more prompt gamma rays. Cross-sections peak at thermal energies and show sharp resonances in the epithermal region. Key absorbers: ¹⁰B (σ_th = 3,840 b), ¹¹³Cd (σ_th ≈ 20,000 b at 0.178 eV resonance), ¹⁵⁷Gd (σ_th ≈ 254,000 b — highest of any stable nuclide). Boron-10 capture: ¹⁰B + n → ⁷Li + ⁴He + 2.79 MeV (Q-value). No prompt gamma in 94% of reactions — favored for shielding and BF₃ detector tubes."
              },
              {
                title: "Proton Recoil in Tissue — Biological Damage Mechanism",
                badge: "Drives neutron RBE",
                body: "Fast neutrons (>100 keV) scatter elastically off hydrogen nuclei in tissue, producing high-energy recoil protons. These protons are high-LET secondary particles that cause the majority of biological damage from fast neutrons. Additionally, ¹⁴N(n,p)¹⁴C: neutron capture on nitrogen-14 (abundant in tissue proteins) produces a recoil proton (~0.58 MeV), transmuting N to C-14. These secondary charged particles drive the high RBE of neutrons (5–20), far above their w_R value of 2–20 per ICRP-103."
              },
              {
                title: "Fission — (n,f)",
                badge: "Fissile nuclei only",
                body: "Neutron absorption by a fissile nucleus (U-235, Pu-239, U-233) induces fission. U-235 has σ_f ≈ 585 b at thermal energies. U-238 fission requires fast neutrons above ~1.5 MeV threshold (σ_f peaks ~0.6 b at 2 MeV). Fission releases ~200 MeV total energy, plus 2–3 prompt neutrons per event. The chain reaction in a thermal reactor is sustained when k_eff = 1.000."
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
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Logarithmic Energy Decrement and Moderation Efficiency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "The average logarithmic energy decrement per elastic collision (ξ) is a material constant quantifying moderation efficiency. Number of collisions to thermalize neutrons from 2 MeV (fission spectrum peak) to 0.025 eV (thermal): n ≈ ln(E₀/E_th) / ξ = ln(8×10⁷) / ξ ≈ 18.2 / ξ." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "\\\\xi = 1 + \\\\frac{(A-1)^2}{2A}\\\\ln\\\\frac{A-1}{A+1}",
                  annotation: "Average logarithmic energy decrement per elastic collision, ξ. For A=1 (hydrogen): ξ=1.0 — maximum possible (neutron can transfer all energy to proton). For A=12 (carbon): ξ=0.158. For A=238 (uranium): ξ=0.0084. Larger ξ means fewer collisions needed to thermalize fission neutrons.",
                  label: "Logarithmic Energy Decrement"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Moderator" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "Mass Number A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "ξ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "Collisions to thermalize" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Notes" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: neutronModerationData.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-semibold", children: row[0] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs", children: row[1] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs", children: row[2] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs", children: row[3] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[4] })
                      ]
                    },
                    row[0]
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: 'Sources: Lamarsh & Baratta, "Introduction to Nuclear Engineering," 3rd ed.; IAEA-TECDOC-1234. Collisions from 2 MeV to 0.025 eV.' })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Neutron Energy Ranges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Region" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Energy Range" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Characteristics" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Typical Sources" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: neutronEnergyRanges.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/50 hover:bg-muted/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-semibold", children: row[0] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground font-mono text-xs", children: row[1] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-muted-foreground text-xs", children: row[2] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[3] })
                    ]
                  },
                  row[0]
                )) })
              ] }) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "dose_quantities",
          title: "Radiation Dose Quantities, Units, and Exposure Limits",
          badge: "Intermediate",
          open: open.dose_quantities,
          onToggle: () => toggle("dose_quantities"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "The dosimetric framework of ICRP Publication 103 (2007) uses a hierarchy of three dose quantities, each adding a layer of biological weighting. Understanding the distinction between absorbed dose (physics), equivalent dose (radiation type), and effective dose (organ sensitivity) is essential for interpreting radiation exposure data." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-1", children: "1. Absorbed Dose (D) — Gray [Gy = J/kg]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "The fundamental physical quantity: mean energy deposited by ionizing radiation per unit mass of tissue. Gy is radiation-type agnostic — 1 Gy of alpha deposits the same energy as 1 Gy of gamma per kilogram, but the biological consequences are vastly different. Old unit: rad = 0.01 Gy." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Absorbed dose is measurable by calorimetry (primary standard), ionization chambers (secondary standard), or film/TLD dosimetry. National metrology institutes (NIST, PTB, NPL) maintain primary dose standards traceable to SI units." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-1", children: "2. Equivalent Dose (H) — Sievert [Sv]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Accounts for the different biological effectiveness of radiation types for stochastic effects (cancer induction, heritable effects). Old unit: rem = 0.01 Sv." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "H = D \\\\times w_R",
                    annotation: "Equivalent dose H (Sv) = absorbed dose D (Gy) × radiation weighting factor w_R. The w_R values represent the ICRP's simplified approximation of RBE for stochastic effects. 1 Sv of any radiation type is considered equally harmful for radiation protection planning. Note: w_R ≠ true experimental RBE, which varies with dose, dose rate, tissue type, and biological endpoint.",
                    label: "Equivalent Dose"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Radiation Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-medium", children: "w_R (ICRP-103)" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                      ["Photons (X-rays, gamma) — all energies", "1"],
                      [
                        "Electrons and positrons (including beta) — all energies",
                        "1"
                      ],
                      ["Muons", "1"],
                      ["Protons and charged pions", "2"],
                      [
                        "Neutrons — E = 1 keV (rising from 2.5 at E→0)",
                        "2.5–10"
                      ],
                      ["Neutrons — E = 1 MeV (peak)", "20"],
                      ["Neutrons — E = 10 MeV", "~10"],
                      ["Neutrons — E = 100 MeV", "~7"],
                      [
                        "Alpha particles, fission fragments, heavy ions",
                        "20"
                      ]
                    ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-b border-border/50 hover:bg-muted/20",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground text-sm", children: row[0] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right text-foreground font-semibold font-mono", children: row[1] })
                        ]
                      },
                      row[0]
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Source: ICRP Publication 103, Table 2 (2007). Neutron w_R is a continuous function of neutron energy." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-1", children: "3. Effective Dose (E) — Sievert [Sv]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Accounts for different radiosensitivities of organs and tissues. Sums the equivalent dose to each tissue, weighted by its tissue weighting factor w_T. Allows comparison of heterogeneous partial-body exposures to whole-body exposures, and is the primary quantity for regulatory dose limits." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "E = \\\\sum_T w_T \\\\cdot H_T",
                    annotation: "Effective dose E (Sv) sums the equivalent dose H_T to each tissue T weighted by w_T, the tissue weighting factor reflecting that tissue's relative sensitivity to radiation-induced stochastic effects. By ICRP definition Σ w_T = 1.00. Effective dose is a protection quantity, not a measurable physical quantity — it cannot be measured directly, only estimated.",
                    label: "Effective Dose"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Tissue / Organ" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "w_T" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Rationale" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                      [
                        "Bone marrow (red), Colon, Lung, Stomach, Breast",
                        "0.12 each",
                        "High cancer risk; well-documented epidemiologically"
                      ],
                      [
                        "Gonads",
                        "0.08",
                        "Heritable effects + cancer; reduced from 0.20 in ICRP-60"
                      ],
                      [
                        "Bladder, Esophagus, Liver, Thyroid",
                        "0.04 each",
                        "Moderate cancer risk; thyroid particularly in children"
                      ],
                      [
                        "Bone surface, Brain, Salivary glands, Skin",
                        "0.01 each",
                        "Lower intrinsic sensitivity or rare cancer type"
                      ],
                      [
                        "Remainder (13 organs incl. adrenals, kidneys, pancreas, prostate)",
                        "0.12 total",
                        "Collective contribution from remaining organs"
                      ],
                      ["Sum — all tissues", "1.00", "By ICRP definition"]
                    ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-b border-border/50 hover:bg-muted/20",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground text-sm", children: row[0] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-semibold font-mono", children: row[1] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[2] })
                        ]
                      },
                      row[0]
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Source: ICRP Publication 103, Table 3 (2007). w_T values revised significantly from ICRP-60 (1991): gonads reduced 0.20→0.08; breast increased; brain added." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "ICRP Dose Limits and Representative Exposures" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                'Dose limits are recommended by ICRP and enacted by national regulators. They represent boundaries above which risk is considered unacceptable — not thresholds between "safe" and "dangerous." The limits are ',
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "in addition" }),
                " to natural background and exclude medical exposures of patients (which are governed by optimization and justification principles, not dose limits)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Exposure / Scenario" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "Dose" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Source / Authority" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: doseLimits.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground text-sm", children: row[0] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs font-semibold", children: row[1] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[2] })
                      ]
                    },
                    row[0]
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Sources: ICRP 103 (2007); ICRP 118 (2012); UNSCEAR 2008; U.S. NRC 10 CFR 20." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2 text-sm", children: "Stochastic Risk Coefficients (BEIR VII, ICRP-103)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "For low-dose, low-dose-rate whole-body gamma exposure, BEIR VII (NAS, 2006) estimates a lifetime attributable cancer incidence risk of approximately",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "0.055 per Sv (5.5% per Sv)" }),
                " ",
                "for a mixed-age population. The risk of cancer mortality is ~0.04 per Sv (4% per Sv). For comparison, the spontaneous cancer mortality risk in developed countries is ~23%. For radiation workers at the 20 mSv/yr occupational limit over a 40-year career (0.8 Sv total), the excess lifetime cancer mortality risk ≈ 3.2% — atop a 23% background. These are population-average estimates; individual risk varies with age at exposure, sex, and genetic factors [BEIR VII, National Academies, 2006]."
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "dose_weighting",
          title: "Dose Rate Effects, Fractionation, and ALARA",
          badge: "Intermediate",
          open: open.dose_weighting,
          onToggle: () => toggle("dose_weighting"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Biological response to radiation depends not only on total dose, but on how that dose is delivered over time. The dose-rate effect and fractionation are central to radiotherapy optimization and radiation protection policy." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Dose Rate Effect" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Low-LET radiation at low dose rates allows DNA repair between ionizing events, substantially reducing biological effectiveness. The",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Dose and Dose Rate Effectiveness Factor (DDREF)" }),
                  " ",
                  "for gamma radiation is estimated at 1.5–2 by ICRP-103, and up to 10 by BEIR VII for solid cancer induction. The same total dose at high dose rate is 1.5–10× more harmful than at low dose rate. This factor is applied when converting high-dose-rate experimental data to low-dose-rate risk estimates."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Fractionation in Radiotherapy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  'Radiotherapy exploits the "four Rs" of radiobiology:',
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Repair" }),
                  " (normal tissue repairs sublethal damage between fractions),",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Repopulation" }),
                  ",",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Redistribution" }),
                  " ",
                  "(cells cycle into sensitive phases), and",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Reoxygenation" }),
                  ". Standard fractionation: 2 Gy/fraction, 5 days/week, total 60–70 Gy over 6–7 weeks."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Linear-Quadratic (LQ) Model of Cell Survival" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "The most widely used model relating cell survival to fractionated dose:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "\\\\ln S = -\\\\alpha d - \\\\beta d^2",
                  annotation: "LQ model. S = cell survival fraction; d = dose per fraction (Gy); α = linear kill coefficient (Gy⁻¹); β = quadratic kill coefficient (Gy⁻²). The α/β ratio (units: Gy) characterizes tissue response: tumors and acutely responding tissues have high α/β (~10 Gy); late-responding tissues and prostate have low α/β (~1.5–3 Gy). Low α/β tissues benefit more from small fraction sizes — the biophysical basis of hypofractionation in prostate radiotherapy.",
                  label: "Linear-Quadratic Cell Survival Model"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "ALARA Principle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ALARA" }),
                " (As Low As Reasonably Achievable) is the guiding radiation protection principle under ICRP-103 and all major national regulatory frameworks. It requires that doses be kept as low as reasonably achievable, taking into account economic and social factors. ALARA does not mean reducing dose to zero regardless of cost; it means applying the ICRP optimization criterion: the net benefit of a practice must exceed its detriment, and within an acceptable practice, individual doses must be further optimized downward. In nuclear power plants, ALARA drives worker dose management programs, remote handling design, and outage planning."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Representative Dose Values" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-medium", children: "Exposure Scenario" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-medium", children: "Dose" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-muted-foreground font-medium", children: "Note" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: doseData.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border/50 hover:bg-muted/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground", children: row[0] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right text-foreground font-mono text-xs", children: row[1] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-muted-foreground text-xs", children: row[2] })
                      ]
                    },
                    row[0]
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Sources: UNSCEAR 2008 Report; ICRP 103; BEIR VII; U.S. NRC 10 CFR 20." })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "rbe_effects",
          title: "Relative Biological Effectiveness (RBE) and Stochastic vs. Deterministic Effects",
          badge: "Advanced",
          open: open.rbe_effects,
          onToggle: () => toggle("rbe_effects"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Radiation biology distinguishes two fundamental categories of effect — those that occur randomly regardless of dose (stochastic) and those that only appear above a threshold (deterministic). The concept of RBE bridges the physics of LET to quantitative biology." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Relative Biological Effectiveness (RBE)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "RBE is defined as the ratio of the reference radiation dose (typically 250 kVp X-rays or Co-60 gamma) to the test radiation dose required to produce the same biological effect:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground bg-muted/40 rounded px-3 py-2 my-2", children: "RBE = D_reference / D_test (for identical biological effect)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· RBE for alpha particles (cell killing, in vitro): 3–20 depending on cell line and endpoint" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· RBE for fast neutrons (~1 MeV): 10–20 for tumor induction in animal models" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· RBE for carbon ions at Bragg peak: 2–3 clinically; up to 5–6 for cell killing in vitro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· RBE depends on: LET, dose, dose rate, fractionation, tissue type, and biological endpoint" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· ICRP w_R values are simplified approximations of RBE for protection purposes — not used in clinical radiobiology" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Clinical carbon ion treatment planning uses the Local Effect Model (LEM, GSI Darmstadt) or Microdosimetric Kinetic Model (MKM, NIRS Japan) to compute RBE-weighted dose" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-blue-400/30 bg-blue-400/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Stochastic Effects" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Effects whose ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "probability" }),
                  " (not severity) increases with dose. Based on the Linear No-Threshold (LNT) model — no dose is considered zero-risk for regulatory purposes."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Radiation-induced solid cancers and leukemia" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Heritable mutations (germ cell damage)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Governed by LNT: stochastic risk ∝ dose" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· BEIR VII: 5.5% lifetime cancer incidence risk per Sv (low dose, low dose rate)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Latency: leukemia appears 2–5 yr post-exposure; solid tumors 10–30 yr" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Hormesis hypothesis: some evidence for adaptive responses at very low doses; not established for regulatory use" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-rose-400/30 bg-rose-400/5 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Deterministic (Tissue Reaction) Effects" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Effects with a definite ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "threshold dose" }),
                  "; severity increases above threshold. Caused by large-scale cell killing exceeding tissue regenerative capacity."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Skin erythema (reddening): threshold ~3–5 Gy acute" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Eye lens opacity/cataract: threshold ~0.5 Gy (ICRP-130, 2012)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Temporary epilation: ~3–5 Gy to scalp" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Permanent male sterility (testes): ~3.5–6 Gy" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Radiation pneumonitis: ~8–10 Gy whole-lung" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Threshold doses are lower for fractionated exposure" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Acute Radiation Syndrome (ARS)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "ARS is a deterministic syndrome following high acute whole-body or large partial-body doses. Three clinical subsyndromes are recognized, each reflecting the radiosensitivity of specific organ systems [IAEA Safety Reports Series No. 2, 1998]:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: [
                {
                  label: "Hematopoietic",
                  dose: "1–6 Gy",
                  color: "border-amber-400/30 bg-amber-400/5",
                  desc: "Bone marrow suppression. Neutropenia and thrombocytopenia within 2–4 weeks. Fatal without transfusion/marrow support above ~4 Gy. Managed with G-CSF, stem cell transplant."
                },
                {
                  label: "Gastrointestinal",
                  dose: "6–30 Gy",
                  color: "border-orange-400/30 bg-orange-400/5",
                  desc: "Destruction of intestinal crypt stem cells. Fluid/electrolyte loss, bacterial translocation, sepsis. Fatal within days to weeks even with intensive treatment."
                },
                {
                  label: "Cerebrovascular",
                  dose: ">30 Gy",
                  color: "border-rose-400/30 bg-rose-400/5",
                  desc: "CNS vascular endothelial damage. Cerebral edema, cardiovascular collapse. Death within hours to 2 days. Only seen in criticality accidents."
                }
              ].map((syn) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg border p-4 ${syn.color}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                      syn.label,
                      " Syndrome"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mb-2", children: syn.dose }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: syn.desc })
                  ]
                },
                syn.label
              )) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "neutron_shielding",
          title: "Neutron Sources, Activation, and Shielding Design",
          badge: "Intermediate",
          open: open.neutron_shielding,
          onToggle: () => toggle("neutron_shielding"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Neutron sources are encountered in nuclear reactors, accelerators, research facilities, and naturally (cosmic ray spallation, spontaneous fission in uranium ore). Neutron shielding requires a two-stage approach — moderation followed by absorption — that is fundamentally different from gamma shielding strategy." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Common Neutron Sources" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: [
                {
                  src: "Nuclear reactor (fission spectrum)",
                  energy: "Prompt: 0.1–10 MeV (mean ~2 MeV); thermal after moderation",
                  use: "Primary source for research, activation analysis, neutron therapy"
                },
                {
                  src: "Cf-252 (spontaneous fission)",
                  energy: "Fission spectrum, mean ~2.1 MeV; 2.31 × 10¹² n/s/g",
                  use: "Portable calibration source, brachytherapy trials, PFNTS"
                },
                {
                  src: "Am-Be source (α,n reaction)",
                  energy: "Continuous 0–11 MeV; mean ~4.5 MeV",
                  use: "Well logging, moisture gauges, detector calibration"
                },
                {
                  src: "D-T fusion neutron generator",
                  energy: "Monoenergetic 14.1 MeV",
                  use: "ITER, well logging, fast neutron imaging, interrogation systems"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: item.src }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Energy:" }),
                      " ",
                      item.energy
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Uses:" }),
                      " ",
                      item.use
                    ] })
                  ]
                },
                item.src
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Neutron Activation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "When materials absorb neutrons, they can become radioactive — a phenomenon called neutron activation. This has both practical applications and operational hazards:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Applications" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "· ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "NAA:" }),
                      " Trace element analysis at ppb levels — used in geology, archaeology, forensics"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "·",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Isotope production:" }),
                      " ",
                      "Co-60 (from Co-59), Ir-192 (from Ir-191), Mo-99/Tc-99m (fission product) via reactor irradiation"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "· ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "BNCT:" }),
                      " Boron Neutron Capture Therapy — B-10 in tumor cells, thermal neutrons → localized alpha emission"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Operational Hazards" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Reactor steel: Fe-58 → Co-58; Fe-54 → Mn-54 — becomes radioactive over years" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Coolant water: O-16 → N-16 (T½ = 7.1 s, 6 MeV γ) — primary loop is intensely radioactive during operation" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Concrete biological shield activation requires managed demolition decades later" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Accelerator tunnel activation limits access time for maintenance work" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Shielding Strategy for Neutrons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Step 1 — Moderate Fast Neutrons" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Use hydrogen-rich materials: polyethylene (CH₂), water, paraffin, or concrete. Multiple elastic collisions with protons reduce MeV neutrons to thermal energies (<0.1 eV) within a few centimetres. Rule of thumb: ~5–10 cm of polyethylene halves the fast neutron flux. Graphite slows neutrons more slowly (~115 collisions) but has very low neutron capture — used in gas-cooled reactors." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Step 2 — Absorb Thermal Neutrons" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "After moderation, thermal neutrons must be captured. Boron-doped polyethylene, borated concrete, and cadmium sheets are common. Gadolinium sheets (σ_th ≈ 254,000 b) are used in medical neutron capture therapy shields. Boron-10 capture: ¹⁰B + n → ⁷Li + ⁴He + 2.79 MeV (no prompt gamma in 94% of events)." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Reactor Biological Shield" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ordinary concrete (ρ ≈ 2.3 g/cm³) moderates and attenuates fast neutrons via elastic scattering on hydrogen (bound in cement hydration water) and inelastic scattering on Ca/Si nuclei. Thermal neutrons are captured by hydrogen and calcium. Typical PWR biological shield: 1.5–2 m ordinary concrete, or <1 m high-density barite concrete (ρ ≈ 3.5 g/cm³). Lead is added to shield secondary gammas from neutron capture reactions." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Energy Transfer per Collision (derivation):" }),
              " ",
              "For elastic scattering between a neutron (mass 1) and a nucleus (mass A) in the center-of-mass frame, conservation of momentum and energy gives maximum fractional energy transfer ΔE/E_max = 4A/(1+A)². For A=1 (hydrogen): 100%. For A=12 (carbon): 28.4%. For A=208 (lead): 1.9%. Lead is an excellent gamma shield but a poor neutron moderator — hence the two-stage shielding strategy (hydrogenous material first to moderate, then B/Cd to absorb thermalized neutrons, then Pb to attenuate capture gammas)."
            ] }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          size: "sm",
          "data-ocid": "radiation.detection_link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/radiation/detection", children: "Radiation Detection →" })
        }
      ) })
    ] })
  ] });
}
export {
  RadiationTypes as default
};
