import { j as jsxRuntimeExports, c as BreadcrumbNav } from "./index-D72vKdFv.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-ofvrIJP7.js";
import { C as CollapsibleSection } from "./CollapsibleSection-C049lckT.js";
import { E as EquationBlock } from "./EquationBlock-D9ydULky.js";
import { S as SectionCard } from "./SectionCard-BzQex3f6.js";
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
  variant = "default",
  title
}) {
  const styles = {
    default: "bg-muted/30 border-border",
    accent: "bg-secondary/10 border-secondary/40",
    info: "bg-primary/10 border-primary/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-lg border p-4 text-sm text-muted-foreground space-y-2 mt-4 ${styles[variant]}`,
      children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: title }),
        children
      ]
    }
  );
}
function Research() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbNav,
      {
        items: [
          { label: "Applications", href: "/applications" },
          { label: "Research Applications" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Techniques in Fundamental Research",
        subtitle: "Neutron beams reveal protein structures at atomic resolution; accelerator mass spectrometry dates events 50,000 years in the past; superheavy element synthesis probes the limits of the periodic table — nuclear tools underpin discoveries across every branch of science.",
        audienceLevel: "advanced",
        readTimeMin: 28
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "research.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Nuclear Tools Across Scientific Disciplines" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Nuclear reactors and particle accelerators do far more than generate electricity or power weapons — they are among the most powerful scientific instruments ever built. Research reactors provide intense, tunable neutron beams that probe matter at atomic and molecular length scales with a sensitivity X-rays cannot match. Accelerator mass spectrometry measures isotope ratios at concentrations of one atom in a quadrillion, enabling chronology at geological and cosmological timescales. Nuclear astrophysics experiments recreate the interior conditions of stars to understand how every heavy atom in the universe was forged." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "The scale of this scientific infrastructure is substantial:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "neutron scattering alone contributes to approximately 8,000 peer-reviewed publications per year" }),
          " ",
          "(Institut Laue-Langevin annual report), spanning condensed matter physics, structural biology, polymer science, engineering materials, and magnetism."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Major Research Facilities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            headers: ["Facility", "Country", "Type", "Notable Capability"],
            rows: [
              [
                "Institut Laue-Langevin (ILL)",
                "France",
                "High-flux research reactor (58 MW)",
                "World's highest continuous neutron flux: 1.5 × 10¹⁵ n/cm²/s"
              ],
              [
                "Spallation Neutron Source (SNS)",
                "USA (ORNL)",
                "Spallation (accelerator-based)",
                "World's most intense pulsed neutron source; 24 instruments"
              ],
              [
                "ISIS Neutron and Muon Source",
                "UK (RAL)",
                "Spallation (pulsed)",
                "Muon beams + neutrons; key for magnetism and hydrogen dynamics"
              ],
              [
                "J-PARC (MLF)",
                "Japan",
                "Spallation (pulsed)",
                "High repetition rate; world-leading cold neutron intensity"
              ],
              [
                "NIST Center for Neutron Research (NCNR)",
                "USA",
                "Research reactor (20 MW)",
                "Leading SANS facility; reference standards for neutron physics"
              ],
              [
                "GSI Helmholtzzentrum",
                "Germany",
                "Heavy-ion accelerator (SIS18/FAIR)",
                "Superheavy element synthesis; exotic beam physics"
              ],
              [
                "LUNA (Gran Sasso)",
                "Italy",
                "Underground accelerator",
                "Cosmic-ray-free nuclear astrophysics measurements at stellar energies"
              ]
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "research.neutron_scattering",
          title: "Neutron Scattering and Diffraction",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "research.neutron_scattering",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Why Neutrons Are Unique Probes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Neutrons have four properties that make them uniquely valuable for materials characterization:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-2 text-sm text-muted-foreground mb-5", children: [
              {
                prop: "Electrical neutrality:",
                desc: "Neutrons penetrate deeply into most materials (cm in metals, not surface-sensitive like electrons), sampling bulk rather than surface. A neutron beam passes through aluminum containers, furnaces, cryostats, and pressure cells — enabling in situ experiments under extreme conditions."
              },
              {
                prop: "Wave–particle duality at atomic wavelengths:",
                desc: "At thermal energies (~25 meV, 20°C), neutron de Broglie wavelength λ = h/(mv) ≈ 1–3 Å, comparable to atomic bond lengths and lattice spacings. This makes them ideal for diffraction experiments to determine atomic positions."
              },
              {
                prop: "Magnetic moment:",
                desc: "The neutron has a magnetic dipole moment (μ_n = −1.913 μ_N) that interacts with unpaired electron spins. Neutron diffraction can determine the arrangement and magnitude of magnetic moments in a material — information completely inaccessible by X-ray diffraction."
              },
              {
                prop: "Hydrogen sensitivity:",
                desc: "X-rays are scattered by electron density — they barely detect hydrogen (Z=1). Neutrons scatter off nuclei; the coherent scattering length of ¹H (−3.74 fm) and ²D (6.67 fm) differ dramatically, enabling hydrogen localization and isotope labeling contrast experiments."
              }
            ].map(({ prop, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: prop }),
                " ",
                desc
              ] })
            ] }, prop)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Neutron Diffraction: Crystal Structure Determination" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Bragg's law governs all diffraction:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground text-xs bg-muted px-1 rounded", children: "nλ = 2d·sinθ" }),
              ". Neutron diffraction locates atomic positions — including hydrogen — with sub-ångström precision. Critical applications include:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground mb-4", children: [
              "Locate hydrogen in metal hydrides (battery materials, hydrogen storage)",
              "Determine proton positions in enzyme active sites (pharmaceutical drug design)",
              "Map magnetic ordering in antiferromagnets, frustrated magnets, multiferroics",
              "Measure residual stress in engineering components (welds, turbine blades) non-destructively",
              "Track lithium-ion positions in battery cathode materials during cycling"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Small-Angle Neutron Scattering (SANS)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "While diffraction probes atomic-scale order (1–5 Å), SANS probes mesoscale structures from 10 to 1,000 Å — the scale of polymer chains, protein complexes, micelles, nanoparticles, and magnetic domains. By deuterium-labeling selected components of a complex mixture (replacing ¹H with ²D changes scattering contrast without altering chemistry), researchers can isolate the form factor of a single component in a multi-component system." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoBox,
              {
                title: "SANS Discovery: Block Copolymer Phase Diagrams",
                variant: "info",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nobel Prize-winning polymer physicist Pierre-Gilles de Gennes predicted that symmetric block copolymers would self-assemble into periodic lamellar, cylindrical, or spherical microstructures. SANS was the definitive experimental tool that mapped these phase diagrams, measuring structure factors at the 10–100 nm scale. This work underpins the modern microelectronics industry, where block copolymer lithography is used to pattern features below 10 nm." })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Inelastic Neutron Scattering: Atomic Dynamics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "In inelastic scattering, neutrons exchange energy with the sample, measuring how atoms and spins move. The technique maps phonon (lattice vibration) and magnon (spin wave) dispersion relations across the full Brillouin zone — information critical for understanding:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Material Class", "What INS Reveals", "Impact"],
                rows: [
                  [
                    "High-Tc superconductors (cuprates, Fe-pnictides)",
                    "Spin fluctuation spectrum; spin resonance peak at T_c",
                    "Evidence for magnetic pairing mechanism in unconventional superconductors"
                  ],
                  [
                    "Thermoelectric materials (PbTe, SnSe)",
                    "Soft phonon modes; anharmonic lattice dynamics",
                    "Explains ultralow thermal conductivity → high figure of merit ZT"
                  ],
                  [
                    "Battery materials (LiFePO₄, Li₂TiO₃)",
                    "Li⁺ jump diffusion rates; phonon-mediated transport",
                    "Guides cathode design for higher power density"
                  ],
                  [
                    "Molecular magnets and spin liquids",
                    "Crystal electric field levels; quantum tunneling of magnetization",
                    "Tests quantum information storage concepts"
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
          id: "research.ams",
          title: "Accelerator Mass Spectrometry (AMS) and Geochronology",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "research.ams",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Principle of AMS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Accelerator Mass Spectrometry pushes an atom through a particle accelerator and identifies it by its charge-to-mass ratio and energy loss in a detector — measuring isotope ratios at concentrations of 10⁻¹² to 10⁻¹⁸ (one atom in a quintillion) that are impossibly low for conventional mass spectrometry. The breakthrough is that the accelerator strips electrons from the atoms to high charge states at terminal voltages of 0.5–25 MV, completely destroying molecular isobars that would otherwise swamp the signal. A sample of 0.1–1 mg of carbon is sufficient — smaller than a match head." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Radiocarbon Dating (¹⁴C)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Cosmic ray spallation in the upper atmosphere continuously produces ¹⁴C from ¹⁴N. The ratio ¹⁴C/¹²C in atmospheric CO₂ — and therefore in all living organisms — is maintained at approximately 1.2 × 10⁻¹² (pre-industrial). At death, metabolic exchange with the environment stops and ¹⁴C decays (T½ = 5,730 yr) without replenishment:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\frac{^{14}\\\\text{C}}{^{12}\\\\text{C}}(t) = \\\\left(\\\\frac{^{14}\\\\text{C}}{^{12}\\\\text{C}}\\\\right)_0 \\\\cdot e^{-\\\\lambda_{14} t}",
                annotation: "Radiocarbon age equation: the measured ¹⁴C/¹²C ratio decreases exponentially from its initial value at death. Solving for t gives the age. The initial ratio is calibrated against tree-ring (dendrochronology) and coral records. λ₁₄ = ln2 / 5730 yr⁻¹.",
                label: "Radiocarbon Age Equation"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-3 mb-4", children: "AMS has extended the age range to ~50,000 years (10 half-lives) and reduced sample size by a factor of 1,000 compared to decay counting, enabling dating of microscopic samples, individual seeds, single insect legs, or a few μg of parchment from a document — a revolutionary capability for archaeology and forensics." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { variant: "accent", title: "The Suess Effect", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Since the Industrial Revolution, burning fossil fuels has released vast quantities of geologically ancient CO₂ (essentially ¹⁴C-dead) into the atmosphere, diluting the ¹⁴C/¹²C ratio — the Suess effect (Hans Suess, 1955). By ~2030, the atmospheric ¹⁴C ratio will have dropped enough that objects made in 2030 will appear ~1,000 years old by raw ¹⁴C measurement without correction. AMS laboratories apply the IntCal calibration curve (updated regularly with new dendrochronological and speleothem data) to convert raw ¹⁴C ages to calendar ages." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Cosmogenic Radionuclide Chronometers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Nuclide", "T½", "Production", "Primary Applications"],
                rows: [
                  [
                    "¹⁴C",
                    "5,730 yr",
                    "Cosmic ray spallation on N-14",
                    "Archaeology, climate history, ocean circulation, fraud detection"
                  ],
                  [
                    "¹⁰Be",
                    "1.387 Myr",
                    "Cosmic ray spallation on O/N (atmosphere); accumulates in surface rocks",
                    "Exposure age dating (glacial polish, fault scarps, erosion rates); ocean sediment paleo-flux"
                  ],
                  [
                    "²⁶Al",
                    "0.717 Myr",
                    "Cosmic ray spallation on Si",
                    "Paired with ¹⁰Be for burial dating; meteorite exposure ages"
                  ],
                  [
                    "³⁶Cl",
                    "0.301 Myr",
                    "Cosmic ray spallation on Ca/K/Ar; neutron activation of Cl",
                    "Groundwater age (≤1 Myr), nuclear fallout tracing (Cl-36 spike 1954–1958)"
                  ],
                  [
                    "¹²⁹I",
                    "15.7 Myr",
                    "Cosmic ray (minor); fission product from nuclear industry (major)",
                    "Trace nuclear reprocessing releases (Sellafield, La Hague); ocean water mass age"
                  ],
                  [
                    "²³⁹Pu / ²⁴⁰Pu",
                    "24,100 yr / 6,561 yr",
                    "Atmospheric weapons testing fallout (1945–1963 peak)",
                    "Sediment dating (fallout horizon = 1963 marker), nuclear forensics"
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
          id: "research.nuclear_astrophysics",
          title: "Nuclear Astrophysics: The Origin of the Elements",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "research.nuclear_astrophysics",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: 'Every atom heavier than hydrogen in your body was synthesized inside a star or during a stellar explosion. Nuclear astrophysics — pioneered by Burbidge, Burbidge, Fowler, and Hoyle in the landmark 1957 "B²FH" paper — identifies the nuclear reaction networks that built the periodic table, and laboratory nuclear physicists measure the cross-sections needed to quantify these networks.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Nucleosynthesis Channels" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Process",
                  "Site",
                  "Temperature",
                  "Timescale",
                  "Products"
                ],
                rows: [
                  [
                    "Big Bang nucleosynthesis (BBN)",
                    "Early universe, 1–20 min after Big Bang",
                    "~10⁹–10¹⁰ K",
                    "~20 min",
                    "H, He-4 (~25% by mass), D, He-3, trace Li-7"
                  ],
                  [
                    "Hydrogen burning (pp chain, CNO cycle)",
                    "Main-sequence stars (Sun: pp; massive stars: CNO)",
                    "~1–5 × 10⁷ K",
                    "Billions of years (Sun) to millions (massive)",
                    "He-4 from H; CNO cycle: C, N, O as catalysts"
                  ],
                  [
                    "Helium burning (triple-α + α-capture)",
                    "Red giant cores; horizontal branch stars",
                    "~10⁸ K",
                    "10⁷–10⁸ yr",
                    "C-12 (triple-α); O-16 (¹²C + α); neon, magnesium"
                  ],
                  [
                    "s-process (slow n-capture)",
                    "AGB stars (thermal pulses); weak s: massive stars",
                    "~3 × 10⁸ K",
                    "Thousands of years per cycle",
                    "~50% of nuclei above Fe: Sr, Ba, Pb, Bi"
                  ],
                  [
                    "r-process (rapid n-capture)",
                    "Neutron star mergers (kilonovae); core-collapse SNe",
                    ">10⁹ K",
                    "Nanoseconds to seconds",
                    "~50% of nuclei above Fe: Au, Pt, Eu, Th, U"
                  ],
                  [
                    "p-process (photodisintegration)",
                    "Supernova shockwaves through O/Ne layer",
                    "~2–3 × 10⁹ K",
                    "Seconds",
                    "~35 proton-rich isotopes: ¹⁸⁰Ta, ¹⁸⁴Os, ¹⁹²Pt"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "The r-Process Confirmed: GW170817" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              'The astrophysical site of the r-process was debated for 60 years. The answer came on August 17, 2017: LIGO/Virgo detected gravitational wave event GW170817 — the merger of two neutron stars 130 million light-years away. Within 1.7 seconds, a gamma-ray burst was detected. In the following days, the electromagnetic follow-up (the "kilonova" AT2017gfo) showed infrared spectral features consistent with',
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "strontium, lanthanides" }),
              ", and other r-process elements newly synthesized in the merger ejecta. The kilonova produced roughly",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "10 Earth masses of gold and platinum" }),
              ". This single event confirmed neutron star mergers as a major (likely dominant) r-process site and inaugurated the era of multi-messenger nuclear astrophysics."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Stellar Energy Generation: The CNO Cycle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "In stars more massive than the Sun (M > ~1.3 M☉), the CNO (Carbon-Nitrogen-Oxygen) cycle dominates hydrogen burning. Carbon-12 acts as a catalyst: four protons are consumed, one helium-4 and two neutrinos are produced, and C-12 is regenerated:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center font-mono text-sm text-foreground bg-muted/40 rounded-lg px-4 py-3 mb-4", children: "¹²C(p,γ)¹³N(β⁺)¹³C(p,γ)¹⁴N(p,γ)¹⁵O(β⁺)¹⁵N(p,α)¹²C" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "The bottleneck reaction ¹⁴N(p,γ)¹⁵O determines the CNO cycle rate. Its cross-section at stellar energies (E_Gamow ≈ 25–50 keV for the Sun) is extraordinarily small (~10⁻¹² barns). Measuring it in a laboratory above ground is impossible — cosmic ray backgrounds overwhelm the signal. The LUNA (Laboratory for Underground Nuclear Astrophysics) facility at Gran Sasso (Italy) operates a 0.4 MV accelerator under 1,400 m of rock (shielding equivalent to 3,800 m of water), reducing cosmic-ray background by six orders of magnitude and making the measurement possible." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoBox,
              {
                title: "Big Bang Nucleosynthesis Precision Test",
                variant: "info",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'BBN predicts primordial mass fractions of D, He-3, He-4, and Li-7 from a single parameter: the baryon-to-photon ratio η. The He-4 mass fraction Y_p ≈ 0.2476 ± 0.0002 is predicted and measured (from metal-poor HII regions) to 0.1% agreement — one of the most precise concordances in all of cosmology. The one remaining tension is the "cosmological lithium problem": BBN predicts Li-7/H ≈ 5.1 × 10⁻¹⁰, but observations of old metal-poor halo stars give ~1.6 × 10⁻¹⁰ — a factor of 3 discrepancy unresolved after 30 years of investigation. Nuclear physics solutions (unknown resonance in ⁷Be(d,p)²⁴He) are being actively searched for at underground accelerators.' })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "research.superheavy",
          title: "Superheavy Element Synthesis",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "research.superheavy",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: 'Beyond element 103 (lawrencium), the transactinides — or superheavy elements (SHE) — are synthetic and exist only for fractions of a second. Their production pushes accelerators, detectors, and nuclear theory to the absolute frontier. The primary scientific motivation: understanding how nuclear and electronic structure evolve at the limits of the Segré chart, and whether a theoretically predicted "island of stability" exists near Z=114, N=184.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Production Method: Hot and Cold Fusion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Superheavy elements are produced by bombarding a heavy target nucleus with an accelerated heavy-ion beam. The two nuclei momentarily fuse into a highly excited compound nucleus (CN) which must survive without fissioning:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center font-mono text-sm text-foreground bg-muted/40 rounded-lg px-4 py-3 mb-4", children: "Projectile + Target → [Compound Nucleus]* → SHE + xn" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-none space-y-2 text-sm text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Cold fusion" }),
                  " (GSI method, Pb/Bi targets): CN excitation energy ~10–15 MeV; typically emits 1n. Produced Z=107–112. Higher cross-sections for lighter SHE, but Pb/Bi targets limit attainable Z."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Hot fusion" }),
                  " (Dubna method, actinide targets): CN excitation 40–50 MeV; emits 3–5n. Actinide targets (Pu, Am, Cm, Bk, Cf) allow production of Z=113–118. Cross-sections at the femtobarn (10⁻⁴³ m²) level — roughly one event per month of beam time."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Discovery History: The Seventh Period Completed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Element (Z)",
                  "Name",
                  "Symbol",
                  "Discovery",
                  "Laboratory",
                  "Year"
                ],
                rows: [
                  [
                    "107",
                    "Bohrium",
                    "Bh",
                    "Cr-54 + Bi-209",
                    "GSI, Germany",
                    "1981"
                  ],
                  [
                    "108",
                    "Hassium",
                    "Hs",
                    "Fe-58 + Pb-208",
                    "GSI, Germany",
                    "1984"
                  ],
                  [
                    "109",
                    "Meitnerium",
                    "Mt",
                    "Fe-58 + Bi-209",
                    "GSI, Germany",
                    "1982"
                  ],
                  [
                    "110",
                    "Darmstadtium",
                    "Ds",
                    "Ni-64 + Pb-208",
                    "GSI, Germany",
                    "1994"
                  ],
                  [
                    "111",
                    "Roentgenium",
                    "Rg",
                    "Ni-64 + Bi-209",
                    "GSI, Germany",
                    "1994"
                  ],
                  [
                    "112",
                    "Copernicium",
                    "Cn",
                    "Zn-70 + Pb-208",
                    "GSI, Germany",
                    "1996"
                  ],
                  [
                    "113",
                    "Nihonium",
                    "Nh",
                    "Zn-70 + Bi-209",
                    "RIKEN, Japan",
                    "2004–2012"
                  ],
                  [
                    "114",
                    "Flerovium",
                    "Fl",
                    "Ca-48 + Pu-244",
                    "JINR, Russia",
                    "1999"
                  ],
                  ["115", "Moscovium", "Mc", "Ca-48 + Am-243", "JINR/LLNL", "2003"],
                  [
                    "116",
                    "Livermorium",
                    "Lv",
                    "Ca-48 + Cm-248",
                    "JINR/LLNL",
                    "2000"
                  ],
                  [
                    "117",
                    "Tennessine",
                    "Ts",
                    "Ca-48 + Bk-249",
                    "JINR/ORNL/Vanderbilt",
                    "2010"
                  ],
                  ["118", "Oganesson", "Og", "Ca-48 + Cf-249", "JINR/LLNL", "2002"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoBox,
              {
                variant: "accent",
                title: "Oganesson — The Heaviest Known Element",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Oganesson (Z=118, named for Yuri Oganessian) is the heaviest element confirmed in the periodic table. Only five atoms have ever been observed. Its half-life is T½ ≈ 0.89 ms — it decays by alpha emission before any chemical experiment could be done. Relativistic effects on its electrons are so extreme (outer electrons move at ~80% of light speed) that its chemistry would be completely unlike its noble gas congeners (He, Ne, Ar, Kr, Xe, Rn). Theoretical calculations predict it might actually be a semiconductor rather than a noble gas — a consequence of relativistic contraction and spin-orbit splitting of its 7p shell." })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "The Island of Stability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: 'Nuclear shell theory predicts a region of enhanced stability near the doubly-magic configuration Z=114, N=184. Elements near the center of this "island" might have half-lives of seconds, hours, or even longer — a dramatic contrast to the millisecond half-lives of nuclei synthesized so far. Reaching N=184 with current beam-target combinations requires producing isotopes considerably more neutron-rich than accessible today. The current frontier: Z=119 attempts at GSI (using titanium beams on Cf targets) and Z=120 at multiple facilities. Production rates are expected below 1 event per month, requiring months-long beam campaigns for a single atom.' })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "research.radiation_materials",
          title: "Radiation Effects in Materials Science",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "research.radiation_materials",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Understanding how radiation damages structural materials is fundamental to safe and extended operation of nuclear reactors, to the design of future fusion reactors, and to the qualification of materials for space applications. Radiation damage physics is also a scientifically rich field: cascade dynamics, defect clustering, and radiation-induced phase transformations involve non-equilibrium phenomena far from classical thermodynamics." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Primary Damage Mechanisms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-3 text-sm text-muted-foreground mb-5", children: [
              {
                title: "Displacement damage (dpa):",
                desc: "A fast neutron (or heavy ion) transfers kinetic energy to a lattice atom — the primary knock-on atom (PKA). If the transferred energy exceeds the threshold displacement energy (E_d ≈ 25–40 eV for most metals), the PKA leaves its site, creating a vacancy. The PKA collides with neighbors in a collision cascade, displacing hundreds of atoms before losing energy. The Norgett-Robinson-Torrens (NRT) model gives displacements per atom: dpa = (0.8 T_dam) / (2 E_d), where T_dam is the damage energy."
              },
              {
                title: "Frenkel pairs:",
                desc: "Each displacement creates a vacancy (empty lattice site) and an interstitial (atom lodged between sites) — a Frenkel pair. At room temperature many recombine within the cascade. Those that escape are metastable and migrate through the lattice, clustering into defect agglomerates."
              },
              {
                title: "Void swelling:",
                desc: "Under sustained irradiation, vacancy clusters stabilize into voids — three-dimensional vacancy agglomerates. As voids grow, the material expands macroscopically. Austenitic stainless steels can swell up to ~100% volume increase in fast reactor environments (≥100 dpa). Void swelling is the primary barrier to austenitic steel cladding in fast reactors."
              },
              {
                title: "Radiation-induced segregation (RIS):",
                desc: "Point defects created by radiation migrate to grain boundaries, dragging solute atoms along. In stainless steel, Cr depletes at grain boundaries (chromium migrates away with vacancies) while Ni enriches. Cr depletion creates a sensitized zone susceptible to intergranular stress corrosion cracking (IGSCC) — a major BWR material challenge. RIS is distinct from thermal diffusion and occurs well below temperatures where thermal segregation would be significant."
              },
              {
                title: "Helium embrittlement:",
                desc: "Fast neutrons (E > 1 MeV) cause (n,α) reactions with ¹⁰B and ⁵⁸Ni impurities, producing helium-4 atoms that are insoluble in metals. He atoms diffuse to grain boundaries and bubble, reducing grain boundary cohesion. In D-T fusion reactors, 14 MeV neutrons create ~10× more He than fission neutrons per dpa — a severe challenge for first-wall materials. A 100 MW/m² first wall in a fusion reactor would experience ~10 dpa/year with ~100 appm He/dpa."
              }
            ].map(({ title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: title }),
                " ",
                desc
              ] })
            ] }, title)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Reactor Pressure Vessel (RPV) Embrittlement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "The reactor pressure vessel is the most safety-critical structural component of a light water reactor — it cannot be replaced. Neutron irradiation of the ferritic steel vessel wall shifts the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ductile-to-brittle transition temperature (DBTT)" }),
              " ",
              "upward: irradiated steel fractures in a brittle manner at temperatures where unirradiated steel would be ductile. The key embrittlement contributors are:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Factor", "Effect on DBTT", "Mechanism"],
                rows: [
                  [
                    "Copper content (impurity)",
                    "+10 to +50°C per 0.1 wt% Cu",
                    "Cu-rich clusters precipitate under irradiation; pin dislocations"
                  ],
                  [
                    "Nickel content",
                    "Synergistic with Cu",
                    "Ni stabilizes Cu clusters; amplifies embrittlement above ~0.5 wt% Cu"
                  ],
                  [
                    "Neutron fluence",
                    "Increases monotonically",
                    "More displacements → more defect clusters and precipitates"
                  ],
                  [
                    "Irradiation temperature",
                    "Lower T → more embrittlement",
                    "At higher T, defects anneal more readily"
                  ],
                  [
                    "Phosphorus (impurity)",
                    "+5 to +15°C per 0.01 wt% P",
                    "Segregates to grain boundaries under irradiation; reduces cohesion"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoBox,
              {
                variant: "info",
                title: "Surveillance Program (10 CFR Part 50 Appendix H)",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "U.S. commercial reactors are required to include surveillance capsules inside the RPV containing steel specimens from the same heat as the vessel wall. Capsules are withdrawn at intervals (after specified neutron fluences), and Charpy impact testing measures the current DBTT. This allows extrapolation of future embrittlement and sets the minimum temperature for pressurized thermal shock (PTS) analysis — preventing cold-water emergency injection into a embrittled vessel from causing brittle fracture. The capsule data directly feeds into decisions about continued plant operation beyond the original 40-year license." })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-6 mb-2", children: "Ion Beam Irradiation: Accelerated Testing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "Qualifying materials for Gen IV reactors (to 200 dpa) or fusion (to 150 dpa with high He) would require decades of irradiation in a research reactor. Ion beams from accelerators offer a shortcut:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "damage rates 10³–10⁵× faster" }),
              " ",
              "than reactor neutrons, enabling 100 dpa experiments in days. Challenges:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-none space-y-1 text-sm text-muted-foreground", children: [
              "Ions have limited penetration depth (1–50 μm), requiring nano-scale characterization (TEM, APT, nanoindentation) rather than bulk mechanical testing",
              "Injected species (self-ions vs. neutrons) change local stoichiometry",
              "Absence of transmutation products (He, H from n-reactions) means separate He implantation experiments are needed",
              "Temperature control critical: 'ion beam heating' can elevate sample temperature above target"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-1", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: "Despite these limitations, ion irradiation is the workhorse for screening candidate materials for Generation IV fission systems (SFR, GFR, VHTR, MSR) and for the ITER and DEMO fusion program. The proposed MYRRHA facility (Belgium) — a subcritical, accelerator-driven system — would provide the neutron irradiation conditions needed to bridge the gap between ion beam data and reactor-relevant testing." })
          ]
        }
      )
    ] })
  ] });
}
export {
  Research as default
};
