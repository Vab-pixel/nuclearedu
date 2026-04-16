import { j as jsxRuntimeExports, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-D72vKdFv.js";
import { E as EquationBlock } from "./EquationBlock-D9ydULky.js";
import { P as PageHeader } from "./PageHeader-ofvrIJP7.js";
import { S as SectionCard } from "./SectionCard-BzQex3f6.js";
function CollapsibleSection({
  title,
  badge,
  children,
  ocid,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(!open),
        className: "flex w-full items-center justify-between gap-3 text-left",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: title }),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary", children: badge })
          ] }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 shrink-0 text-muted-foreground" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children })
  ] });
}
const thermalFissionRows = [
  ["U-235", "584", "99", "0.169", "Primary fissile fuel in thermal reactors"],
  [
    "U-238",
    "2.7 × 10⁻⁶",
    "2.68",
    "—",
    "Fertile; not fissile at thermal energies"
  ],
  [
    "Pu-239",
    "748",
    "271",
    "0.362",
    "Bred from U-238; second major reactor fuel"
  ],
  ["Pu-241", "1011", "360", "0.356", "Build-up in high-burnup fuel"],
  ["Th-232", "~0", "7.4", "—", "Fertile; breeds U-233 in thorium cycle"],
  [
    "U-233",
    "530",
    "46",
    "0.087",
    "Bred from Th-232; favorable α for thermal reactors"
  ]
];
const fastSpectrumRows = [
  ["U-235", "584", "1.24", "471×"],
  ["Pu-239", "748", "1.80", "416×"],
  ["U-238", "~0", "0.54 (threshold)", "—"]
];
const endfLibraryRows = [
  [
    "ENDF/B-VIII.0 / VIII.1",
    "USA",
    "NNDC/BNL",
    "~380 materials; 2018 / 2024 revision"
  ],
  [
    "JEFF-3.3",
    "Europe",
    "JRC Geel (EURATOM)",
    "Widely used in European reactors"
  ],
  ["JENDL-5", "Japan", "JAEA", "Strong in medical & activation data"],
  ["CENDL-3.2", "China", "CIAE", "Updated 2020; growing international use"],
  [
    "BROND-3.1",
    "Russia",
    "VNIIEF/IPPE",
    "Includes unique Russian measurements"
  ],
  [
    "TENDL-2023",
    "International",
    "NRG/PSI (TALYS)",
    "Covers ~2,800 nuclides; auto-generated"
  ]
];
function CrossSections() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Neutron Cross-Sections",
        subtitle: "The probabilistic language of nuclear interactions — how barn units, quantum resonances, and energy-dependent reaction rates govern everything from reactor design to isotope production.",
        audienceLevel: "intermediate",
        readTimeMin: 28
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "cross_sections.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "What Is a Nuclear Cross-Section?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "A nuclear cross-section (σ) is an ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "effective area" }),
          " that quantifies the probability of a specific nuclear interaction occurring when a projectile (most commonly a neutron) encounters a target nucleus. It is not literally a geometric area — quantum effects mean σ can be orders of magnitude larger or smaller than the actual nuclear size."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-accent/10 border border-accent/20 p-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wider mb-2", children: "The Barn Unit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
            "Cross-sections are measured in",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "barns (b)" }),
            ': 1 b = 10⁻²⁴ cm² = 10⁻²⁸ m². The unit was coined during the Manhattan Project — physicists joked that uranium nuclei were "as big as a barn" compared to expected cross-sections. In context: the actual nuclear geometric area is ~10⁻³⁰ m² (nuclear radius ~1–8 fm), yet thermal neutron fission cross-sections for U-235 reach 584 barns — roughly',
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
              " ",
              "500× the geometric area"
            ] }),
            ". Conversely, fast-neutron cross-sections can fall to millibarns (10⁻³ b), far below geometric size."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Cross-Section Types" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5", children: [
          ["σ_T", "Total", "All interactions; σ_T = σ_el + σ_in + σ_abs"],
          [
            "σ_el",
            "Elastic scattering",
            "Neutron bounces; nucleus unchanged; kinetic energy conserved"
          ],
          [
            "σ_in",
            "Inelastic scattering",
            "Nucleus left in excited state; neutron loses energy; threshold reaction"
          ],
          [
            "σ_abs",
            "Absorption",
            "Neutron captured; σ_abs = σ_γ + σ_f + σ_α + ..."
          ],
          [
            "σ_f",
            "Fission",
            "Nucleus splits; releases ≥2 neutrons + ~200 MeV"
          ],
          [
            "σ_γ",
            "Radiative capture",
            "Neutron absorbed → compound nucleus → γ-ray emission"
          ]
        ].map(([sym, name, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg bg-muted/30 border border-border p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-primary font-semibold", children: sym }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
            ]
          },
          sym
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "R = n_1 \\, v \\, \\sigma \\, n_2",
            annotation: "Reaction rate R [reactions/cm³/s]: n₁ and n₂ are the number densities of projectile and target [cm⁻³], v is their relative velocity [cm/s], σ is the cross-section [cm²]. For a neutron beam: n₂ is the target atom density, n₁v is the neutron flux Φ.",
            label: "Reaction Rate"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "\\lambda = \\frac{1}{n\\,\\sigma}",
            annotation: "Mean free path λ [cm]: the average distance a projectile travels between successive interactions. n is the target atom number density [cm⁻³], σ is the cross-section [cm²].",
            label: "Mean Free Path"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mt-2", children: [
          "Cross-section depends on three things: the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "projectile type" }),
          " ",
          "(neutron, proton, photon, etc.), the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "projectile energy" }),
          " (can vary by 10 orders of magnitude for neutrons in a reactor), and the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "target nuclide" }),
          ". Understanding this energy dependence is the core of reactor physics."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "The 1/v Absorption Region",
          badge: "intermediate",
          ocid: "cross_sections.one_over_v_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "For thermal neutrons (energies below ~0.1 eV), the absorption cross-section of most nuclides follows a strikingly simple law: it is inversely proportional to neutron velocity. The physical reason is elegant — a slower neutron spends more time in the vicinity of a nucleus, giving a proportionally higher chance of interaction." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\sigma_a(E) = \\sigma_0 \\sqrt{\\frac{E_0}{E}} = \\sigma_0 \\frac{v_0}{v}",
                annotation: "The 1/v law: absorption cross-section at energy E equals the reference value σ₀ multiplied by the square root of the reference energy E₀ divided by E. Subscript 0 denotes the standard reference condition: v₀ = 2200 m/s (room temperature, kT ≈ 0.0253 eV).",
                label: "1/v Absorption Law"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "This means that in the thermal region, a factor-of-4 decrease in neutron energy doubles the absorption cross-section. Reactor design exploits this: moderators slow neutrons to the thermal range where σ_f for U-235 is ~584 barns — hundreds of times larger than at fast energies." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wider mb-3", children: "Thermal (2200 m/s) Cross-Sections of Key Nuclides" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Nuclide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "σ_f (barns)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "σ_γ (barns)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "α = σ_γ/σ_f" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Note" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: thermalFissionRows.map(([nuc, sf, sg, alpha, note]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-mono text-foreground", children: nuc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: sf }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: sg }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: alpha }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-xs text-muted-foreground", children: note })
              ] }, nuc)) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic mb-5", children: "Source: ENDF/B-VIII.0, NNDC/BNL. Values at 0.0253 eV (2200 m/s, 293.6 K)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Capture-to-Fission Ratio α and Reactor Economy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The parameter α = σ_γ/σ_f matters greatly for fuel economy. For every 100 thermal neutrons absorbed by U-235, on average 14 produce capture (wasted) while 86 produce fission (useful). Pu-239 has a worse α (0.362) but a larger absolute σ_f. U-233 has the best α (0.087) of the three fissile nuclei — a key advantage of the thorium fuel cycle." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Thermal Scattering: Water Moderation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Hydrogen-1 has a thermal neutron scattering cross-section of",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "σ_s = 82 barns" }),
                " at 2200 m/s — the highest of any stable nuclide (except H-2 at 3.4 b). This, combined with its low mass (maximizing energy transfer per collision) and low cost, makes ordinary water (H₂O) the overwhelmingly dominant reactor moderator worldwide. Hydrogen also has σ_γ = 0.332 b — a parasitic absorption that must be accounted for in reactor neutron balance."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Nuclear Resonances and the Breit-Wigner Formula",
          badge: "advanced",
          ocid: "cross_sections.resonance_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Between roughly 1 eV and 10 keV for heavy actinides, neutron cross-sections are dominated by sharp, towering peaks —",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "resonances" }),
              ". These arise from the compound nucleus model (Niels Bohr, 1936): the incoming neutron is temporarily captured to form an excited compound nucleus at a specific excitation energy. If that energy coincides with a discrete nuclear energy level, the cross-section peaks dramatically."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "U-238 First Resonance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-muted-foreground font-mono text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "E_r = ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "6.67 eV" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Γ_n = 1.493 × 10⁻³ eV" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Γ_γ = 23.0 × 10⁻³ eV" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "Peak σ_γ ≈",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "25,000 barns" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground/60 pt-1 text-[11px]", children: "ENDF/B-VIII.0" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "U-235 Dense Resonance Structure" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-muted-foreground text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "First resonance at",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1.14 eV" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "Resonance spacing:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "D₀ ≈ 0.5–2 eV" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Many fission resonances overlap with capture resonances" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Statistical treatment required above ~100 eV" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\sigma(E) = \\pi\\bar{\\lambda}^2 \\, g \\, \\frac{\\Gamma_n \\, \\Gamma_x}{(E - E_r)^2 + (\\Gamma/2)^2}",
                annotation: "Single-level Breit-Wigner formula. E_r = resonance energy; Γ = total width = Γ_n + Γ_γ + Γ_f + ...; Γ_n = neutron partial width; Γ_x = partial width for channel x (capture, fission, etc.); g = (2J+1)/[2(2I+1)] is the statistical spin factor; λ̄ = ℏ/p = reduced de Broglie wavelength of the neutron.",
                label: "Single-Level Breit-Wigner Formula"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "The resonance widths Γ are typically 0.01–100 eV for low-lying levels. The peak cross-section on resonance is σ_peak = 4πλ̄²g (Γ_n Γ_x)/Γ², which can be thousands of barns. Far from resonance, σ falls off as a Lorentzian (∝ 1/(E−E_r)²)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-2", children: "Doppler Broadening — The Critical Safety Feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "In a real reactor, fuel atoms are not stationary — they vibrate thermally at ~900 K. The relative velocity distribution between neutron and nucleus broadens each resonance peak. This is",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Doppler broadening" }),
              ": the resonance shape transforms from a Breit-Wigner Lorentzian to a Voigt profile (convolution with a Gaussian Maxwell-Boltzmann distribution)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Doppler coefficient of reactivity" }),
              " ",
              "(α_D) describes the feedback: as fuel temperature rises → resonances broaden → more neutrons are absorbed in U-238 resonances (especially at 6.67 eV) → fewer neutrons cause fission → reactor power drops. This negative temperature feedback is a fundamental passive safety mechanism in all thermal reactors — it is not an engineered system but a direct nuclear physics consequence."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mb-5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Why Doppler Broadening Matters for Safety" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "A power excursion that heats fuel by 100 K broadens the U-238 capture resonances enough to increase the resonance absorption integral by ~3–5%, reducing k_eff by ~0.003–0.005. This happens within milliseconds — far faster than any mechanical safety system can respond. The Chernobyl accident was partly exacerbated by a positive void coefficient that overpowered the (normally negative) Doppler feedback; modern reactor designs require strongly negative Doppler coefficients by regulation." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Resonance Regions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2", children: [
              [
                "Resolved Resonance Region (RRR)",
                "E < ~1 keV (actinides)",
                "Individual resonances distinguishable and measured; Breit-Wigner parameters tabulated in ENDF/B file MF2/MT151"
              ],
              [
                "Unresolved Resonance Region (URR)",
                "~1–100 keV",
                "Resonances overlap; statistical average cross-sections used; probability tables in ENDF/B MF2/MT153"
              ],
              [
                "Smooth Region (Continuum)",
                ">100 keV",
                "Resonances unresolvable; cross-sections smooth and decreasing; Hauser-Feshbach statistical model"
              ]
            ].map(([title, energy, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-1", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-primary mb-2", children: energy }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                ]
              },
              title
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Energy Regions of Neutron Cross-Sections",
          badge: "intermediate",
          ocid: "cross_sections.energy_regions_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "Neutron energies in a reactor span 12 orders of magnitude — from 10⁻⁵ eV cold neutrons to 20 MeV prompt fission neutrons. The cross-section landscape looks entirely different across this range, governing whether a reactor is thermal or fast." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-6", children: [
              {
                label: "a",
                title: "Thermal Region (E < 1 eV)",
                badge: "1/v law dominates",
                color: "bg-blue-500/10 border-blue-500/20",
                badgeColor: "text-blue-400",
                desc: "Smooth, well-behaved cross-sections following the 1/v law. U-235 σ_f = 584 b at 0.025 eV. This is the operating regime for light water reactors (LWRs), CANDU, and HTGR reactors.",
                facts: [
                  "U-235 σ_f = 584 b",
                  "Pu-239 σ_f = 748 b",
                  "U-233 σ_f = 530 b"
                ]
              },
              {
                label: "b",
                title: "Resolved Resonance Region (1 eV → ~10 keV)",
                badge: "Sharp resonance peaks",
                color: "bg-orange-500/10 border-orange-500/20",
                badgeColor: "text-orange-400",
                desc: "For heavy actinides: thousands of narrow Breit-Wigner resonances. U-238 has ~100,000 resolved resonances below 20 keV; each must be individually measured and stored. Slowing-down neutrons pass through this region; the resonance escape probability p describes how many survive without capture.",
                facts: [
                  "U-238: first resonance at 6.67 eV, σ_γ peak ~25,000 b",
                  "U-235: first resonance at 1.14 eV",
                  "Pu-240: large resonance at 1.056 eV (major heat source in MOX fuel)"
                ]
              },
              {
                label: "c",
                title: "Fast / High-Energy Region (>100 keV)",
                badge: "Smooth, low cross-sections",
                color: "bg-rose-500/10 border-rose-500/20",
                badgeColor: "text-rose-400",
                desc: "Cross-sections fall dramatically — barns to millibarns. Fission is still possible but requires much higher enrichment or plutonium fuel. The domain of fast breeder reactors (FBRs), sodium-cooled fast reactors (SFRs), and lead-cooled fast reactors (LFRs).",
                facts: [
                  "U-235 σ_f(1 MeV) ≈ 1.24 b",
                  "Pu-239 σ_f(1 MeV) ≈ 1.80 b",
                  "U-238 σ_f threshold at ~1 MeV"
                ]
              }
            ].map(({ label, title, badge, color, badgeColor, desc, facts }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border ${color} p-4`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold uppercase tracking-wider ${badgeColor}`,
                    children: badge
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-0.5", children: facts.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  className: "text-xs text-muted-foreground font-mono",
                  children: f
                },
                f
              )) })
            ] }, label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wider mb-3", children: "Thermal vs. Fast Spectrum: σ_f Comparison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Nuclide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Thermal σ_f (b)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Fast ~1 MeV σ_f (b)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Thermal/Fast Ratio" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: fastSpectrumRows.map(([nuc, thermal, fast, ratio]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-mono text-foreground", children: nuc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: thermal }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: fast }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: ratio })
              ] }, nuc)) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic mb-5", children: "Source: ENDF/B-VIII.0, NNDC/BNL." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Why Thermal Reactors Use Moderators" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Slowing neutrons from ~2 MeV (birth energy) to ~0.025 eV increases U-235 σ_f by ~470×. Moderators (H₂O, D₂O, graphite) accomplish this through elastic scattering collisions. A neutron loses the most energy per collision when the target mass equals its own — hence hydrogen (A=1) is the most effective moderator per unit mass, reaching thermal energy in ~18–25 collisions." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Why Fast Reactors Work Differently" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "With σ_f ~1 b vs. 584 b, fast reactors need far more fissile material (>15% enrichment or Pu fuel). But they gain a crucial advantage: η (neutrons per fission) is higher in the fast spectrum for Pu-239 (~3.0 vs. ~2.1 thermal), enabling breeding — producing more fissile material (Pu-239 from U-238) than is consumed. This is the basis for breeder reactor technology." })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "The ENDF/B Nuclear Data Library",
          badge: "intermediate",
          ocid: "cross_sections.endf_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Every neutron transport simulation — from reactor design to radiation shielding to nuclear medicine dose calculations — depends on evaluated nuclear data libraries. These are exhaustive compilations of cross-sections, angular distributions, fission yields, decay data, and more, produced by teams of nuclear data evaluators who combine experimental measurements with nuclear theory calculations." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "ENDF/B-VIII.0 at a Glance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                ["~380", "Materials covered"],
                ["20 MeV", "Max neutron energy"],
                ["~1 million", "Data points for U-235"],
                ["12 decades", "Energy range (10⁻⁵ eV to 20 MeV)"]
              ].map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold font-mono text-primary", children: val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: label })
              ] }, label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wider mb-3", children: "Major Nuclear Data Libraries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Library" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Region" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Maintainer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Notes" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: endfLibraryRows.map(([lib, region, org, notes]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-mono text-foreground font-semibold text-xs", children: lib }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: region }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground text-xs", children: org }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-xs text-muted-foreground", children: notes })
              ] }, lib)) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "File Structure and Formats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5", children: [
              [
                "ENDF-6 Format",
                "ASCII text format with MF (file) and MT (reaction) section identifiers. MF3/MT18 = fission cross-section. Used for library distribution."
              ],
              [
                "ACE Format",
                "A Compact ENDF — binary format optimized for Monte Carlo transport codes (MCNP, OpenMC, Serpent2). Contains continuous-energy cross-section tables."
              ],
              [
                "NJOY Processing",
                "NJOY2016 code converts ENDF-6 → ACE, applying Doppler broadening, thermal scattering corrections, and probability tables at specified temperatures."
              ],
              [
                "MATXS/GENDF Formats",
                "Multigroup formats for deterministic codes (SCALE, CASMO, SIMULATE). Energy-averaged over predefined group structures (e.g., 252-group VITAMIN-B7)."
              ]
            ].map(([title, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-1", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                ]
              },
              title
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Transport Codes Using ENDF/B" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-5", children: [
              ["MCNP6", "Monte Carlo, Los Alamos"],
              ["OpenMC", "Open-source Monte Carlo, MIT/ANL"],
              ["Serpent2", "Monte Carlo, VTT Finland"],
              ["SCALE 6.3", "Deterministic + MC, ORNL"],
              ["CASMO-5", "Lattice physics, Studsvik"],
              ["SIMULATE-3", "Core simulator, Studsvik"]
            ].map(([code, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border px-3 py-2 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-primary", children: code }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1", children: [
                    "— ",
                    desc
                  ] })
                ]
              },
              code
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Accessing Nuclear Data" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "NNDC (nndc.bnl.gov)" }),
                  " ",
                  "— ENSDF, ENDF/B, NuDat3 web interface"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "IAEA-NDS (nds.iaea.org)" }),
                  " ",
                  "— EXFOR (~25,000 experimental datasets), IAEA libraries"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "JANIS (oecd-nea.org/janisweb)" }),
                  " ",
                  "— NEA/OECD browser for cross-section comparison across libraries"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "EXFOR" }),
                  " — Experimental reactions database: raw experimental measurements before evaluation"
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Cross-Sections in Reactor Design",
          badge: "advanced",
          ocid: "cross_sections.reactor_design_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Reactor physics bridges microscopic nuclear data (individual nuclide cross-sections in barns) to macroscopic engineering quantities that govern criticality, flux distributions, and power generation. The key is the transition from microscopic to macroscopic cross-sections." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\Sigma = n\\,\\sigma \\quad [\\text{cm}^{-1}]",
                annotation: "Macroscopic cross-section Σ [cm⁻¹]: the product of atom number density n [atoms/cm³] and microscopic cross-section σ [cm²]. Σ represents the probability per unit path length of interaction. The mean free path λ = 1/Σ.",
                label: "Macroscopic Cross-Section"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "For a mixture of nuclides (as in any real reactor material), macroscopic cross-sections add: Σ_total = Σᵢ nᵢσᵢ. This applies separately for each reaction type (scattering, absorption, etc.)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-3", children: "Worked Example: Water (H₂O) at Room Temperature, Thermal Neutrons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-muted-foreground font-mono text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground/60 mb-2", children: "# Atom densities from ρ = 1.0 g/cm³, M(H₂O) = 18 g/mol" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "n_H = 2 × (6.022×10²³ / 18) × 1.0 =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "6.69 × 10²² H atoms/cm³" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "n_O = (6.022×10²³ / 18) × 1.0 =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "3.34 × 10²² O atoms/cm³" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-1 mt-2 mb-1 text-muted-foreground/60", children: "# Macroscopic cross-sections" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Σ_s(H) = 6.69×10²² × 82×10⁻²⁴ cm² =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "5.49 cm⁻¹" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Σ_a(H) = 6.69×10²² × 0.332×10⁻²⁴ =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "0.022 cm⁻¹" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Σ_s(O) = 3.34×10²² × 3.76×10⁻²⁴ =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "0.126 cm⁻¹" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-1 mt-2 mb-1 text-muted-foreground/60", children: "# Mean free paths" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "λ_s = 1 / (5.49 + 0.126) ≈",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "0.178 cm" }),
                  " for scattering"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "λ_a = 1 / 0.022 ≈",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "45 cm" }),
                  " for absorption"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "The Four-Factor Formula" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "For an infinite homogeneous reactor (no neutron leakage), the neutron multiplication factor k_∞ — the ratio of neutrons in one generation to the previous — is given by the four-factor formula, where each factor directly involves cross-section ratios:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "k_\\infty = \\eta \\cdot f \\cdot p \\cdot \\varepsilon",
                annotation: "k_∞ = neutron reproduction factor (avg. fission neutrons per thermal absorption in fuel) × thermal utilization (fraction of thermal absorption in fuel) × resonance escape probability (fraction escaping resonance capture while slowing down) × fast fission factor (extra neutrons from fast fission of U-238).",
                label: "Four-Factor Formula"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5", children: [
              {
                sym: "η (eta)",
                name: "Neutron Reproduction Factor",
                def: "η = ν σ_f / (σ_f + σ_γ) = ν / (1 + α)",
                desc: "Average fission neutrons per neutron absorbed in fuel. For U-235 at thermal: ν=2.42, α=0.169, η = 2.42/1.169 ≈ 2.07."
              },
              {
                sym: "f",
                name: "Thermal Utilization",
                def: "f = Σ_a(fuel) / Σ_a(total)",
                desc: "Fraction of thermal neutron absorptions that occur in fuel (vs. moderator, cladding, coolant, poisons). Maximized by fuel-to-moderator ratio optimization."
              },
              {
                sym: "p",
                name: "Resonance Escape Probability",
                def: "p = exp(−N_U I_eff / ξ Σ_s)",
                desc: "Fraction of fast neutrons that slow down past the resonance region without capture. Depends on U-238 resonance integral (~277 b effective), moderation ratio, and fuel lump geometry (self-shielding)."
              },
              {
                sym: "ε (epsilon)",
                name: "Fast Fission Factor",
                def: "ε = 1 + τ P_f N_U σ_f,fast / (Σ_a fuel)",
                desc: "Accounts for fast fissions in U-238 (threshold ~1 MeV) before thermalization. Typically ε ≈ 1.03–1.07 in LWRs."
              }
            ].map(({ sym, name, def, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border p-4 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm font-mono text-primary font-bold", children: sym }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground block mb-2", children: def }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                ]
              },
              sym
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Typical LWR Values at Beginning-of-Life (BOL)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                ["η ≈ 2.07", "3.5% enriched U-235"],
                ["f ≈ 0.71", "Water moderator"],
                ["p ≈ 0.87", "Resonance capture in U-238"],
                ["ε ≈ 1.05", "U-238 fast fissions"]
              ].map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-bold font-mono text-primary", children: val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: label })
              ] }, val)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border mt-3 pt-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono font-semibold", children: "k_∞ = 2.07 × 0.71 × 0.87 × 1.05 ≈ 1.34" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "(excess reactivity for burnup margin; controlled by absorbers)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "From k_∞ to k_eff: Leakage and Criticality" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "A real finite reactor also loses neutrons by leakage: k_eff = k_∞ × P_NL, where P_NL is the non-leakage probability. At criticality, k_eff = 1.000 exactly. The excess reactivity (ρ = (k_eff − 1)/k_eff) is controlled by control rods (B-4C, Ag-In-Cd), soluble boron (in PWRs), or burnable absorbers (Gd, Er in fuel pellets) — all chosen for their high absorption cross-sections at thermal energies." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "cross_sections.references_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "References & Further Reading" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2 text-sm text-muted-foreground list-decimal list-inside", children: [
          {
            id: "brown2018",
            text: "D.A. Brown et al. (2018). ENDF/B-VIII.0: The 8th Major Release of the Nuclear Reaction Data Library. Nuclear Data Sheets 148, 1–142. doi:10.1016/j.nds.2018.02.001"
          },
          {
            id: "lamarsh2001",
            text: "J.R. Lamarsh & A.J. Baratta (2001). Introduction to Nuclear Engineering, 3rd ed. Prentice Hall. Chapters 3–4."
          },
          {
            id: "krane1988",
            text: "K.S. Krane (1988). Introductory Nuclear Physics. Wiley. Chapter 11."
          },
          {
            id: "duderstadt1976",
            text: "J.J. Duderstadt & L.J. Hamilton (1976). Nuclear Reactor Analysis. Wiley. Chapter 2."
          },
          {
            id: "exfor2024",
            text: "IAEA-NDS. EXFOR — Experimental Nuclear Reaction Data. https://nds.iaea.org/exfor/ (Accessed 2024)."
          },
          {
            id: "nndc2024",
            text: "NNDC/BNL. Chart of Nuclides. https://www.nndc.bnl.gov/nudat3/ (Accessed 2024)."
          },
          {
            id: "bell1970",
            text: "G.I. Bell & S. Glasstone (1970). Nuclear Reactor Theory. Van Nostrand Reinhold. Chapter 1."
          }
        ].map(({ id, text }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "leading-relaxed", children: text }, id)) })
      ] })
    ] })
  ] });
}
export {
  CrossSections as default
};
