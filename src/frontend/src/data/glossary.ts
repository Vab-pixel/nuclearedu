export type AudienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

export type GlossaryCategory =
  | "Physics"
  | "Reactor Engineering"
  | "Fuel Cycle"
  | "Safety"
  | "Isotopes & Decay"
  | "Detection"
  | "History"
  | "Regulation"
  | "Applications"
  | "Radiation & Biology";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: GlossaryCategory;
  audience: AudienceLevel;
  relatedTerms: string[];
  equation?: string;
  // legacy field kept for backward compat
  audienceLevel?: AudienceLevel;
}

export const glossaryTerms: GlossaryTerm[] = [
  // ────────────────────────────────────────────────
  // PHYSICS
  // ────────────────────────────────────────────────
  {
    id: "atom",
    term: "Atom",
    definition:
      "The smallest unit of a chemical element that retains its properties. An atom consists of a dense nucleus (protons + neutrons) surrounded by an electron cloud. Atoms are ~10⁻¹⁰ m in diameter, while the nucleus is ~10⁻¹⁵ m — a factor of 100,000 smaller.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["nucleus", "proton", "neutron", "electron", "isotope"],
  },
  {
    id: "nucleus",
    term: "Nucleus",
    definition:
      "The dense, positively charged core of an atom, containing protons and neutrons (collectively called nucleons). Nearly all atomic mass is concentrated in the nucleus. The nuclear radius scales as R = r₀ A^(1/3), where r₀ ≈ 1.2 fm and A is the mass number.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["proton", "neutron", "binding energy", "nuclide"],
    equation: "R = r₀ A^{1/3}",
  },
  {
    id: "proton",
    term: "Proton",
    definition:
      "A positively charged nucleon (charge +e, mass 938.272 MeV/c²). The number of protons (atomic number Z) uniquely defines the element. Protons are bound by the strong nuclear force, overcoming their mutual Coulomb repulsion.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["nucleus", "atomic-number", "neutron"],
  },
  {
    id: "neutron",
    term: "Neutron",
    definition:
      "An electrically neutral nucleon (mass 939.565 MeV/c²). Extra neutrons create isotopes of the same element. Free neutrons are unstable, decaying via β⁻ with a mean lifetime of ~881.5 s. Neutrons drive fission chain reactions.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["nucleus", "isotope", "thermal-neutron", "fast-neutron"],
  },
  {
    id: "electron",
    term: "Electron",
    definition:
      "A negatively charged lepton (charge −e, mass 0.511 MeV/c²) that occupies quantum orbitals around the nucleus. Beta-minus decay produces an electron; beta-plus decay produces a positron (anti-electron) with the same mass but opposite charge.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["beta-decay", "ionizing-radiation"],
  },
  {
    id: "isotope",
    term: "Isotope",
    definition:
      "Atoms of the same element (same Z) with different numbers of neutrons (different N, different A). For example, ¹²C (6p+6n) and ¹⁴C (6p+8n) are both carbon isotopes. About 3,300 nuclides are known; only ~254 are stable.",
    category: "Isotopes & Decay",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["nuclide", "neutron", "half-life", "radioactivity"],
  },
  {
    id: "nuclide",
    term: "Nuclide",
    definition:
      "A specific nuclear species characterized by a defined proton number Z and neutron number N. The notation is ^A_Z X, where A = Z+N is the mass number. 'Isotope' describes variants of one element; 'nuclide' refers to any specific nucleus regardless of element.",
    category: "Isotopes & Decay",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["isotope", "isobar", "isotone", "isomer-nuclear"],
  },
  {
    id: "isobar",
    term: "Isobar",
    definition:
      "Nuclides that have the same mass number A but different atomic numbers Z (and hence different elements). For example, ⁴⁰Ar and ⁴⁰Ca are isobars (A=40). Isobars lie on diagonal lines of the Chart of Nuclides.",
    category: "Isotopes & Decay",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["nuclide", "isotope", "isotone", "mass-parabola"],
  },
  {
    id: "isotone",
    term: "Isotone",
    definition:
      "Nuclides with the same neutron number N but different proton number Z. For example, ³H (Z=1, N=2) and ⁴He (Z=2, N=2) are isotones (N=2). Isotones share the same neutron-shell structure.",
    category: "Isotopes & Decay",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["nuclide", "isotope", "isobar"],
  },
  {
    id: "isomer-nuclear",
    term: "Isomer (nuclear)",
    definition:
      "A metastable excited state of a nucleus with a measurable half-life before gamma-ray emission. Denoted with 'm' (e.g., ⁹⁹ᵐTc). Tc-99m (T½ = 6.01 h) is the most widely used diagnostic radionuclide in nuclear medicine.",
    category: "Isotopes & Decay",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["gamma-radiation", "half-life", "nuclear-medicine"],
  },
  {
    id: "radioactivity",
    term: "Radioactivity",
    definition:
      "The spontaneous emission of radiation from an unstable nucleus as it transforms toward a more stable configuration. Quantified by activity A = λN (disintegrations/second). Henri Becquerel discovered radioactivity in uranium salts in 1896.",
    category: "Isotopes & Decay",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "half-life",
      "decay-constant",
      "alpha-decay",
      "beta-decay",
      "gamma-radiation",
    ],
    equation: "A = \\lambda N",
  },
  {
    id: "alpha-decay",
    term: "Alpha decay",
    definition:
      "Radioactive decay in which the nucleus emits an alpha particle (⁴He nucleus: 2 protons + 2 neutrons). Q-values are typically 4–9 MeV. Alpha particles have a range of only a few centimeters in air and are stopped by a sheet of paper, but are intensely ionizing if internalized.",
    category: "Isotopes & Decay",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "radioactivity",
      "q-value",
      "ionizing-radiation",
      "gamow-factor",
    ],
  },
  {
    id: "beta-decay",
    term: "Beta decay",
    definition:
      "Radioactive decay via the weak nuclear force. β⁻: neutron → proton + e⁻ + ν̄ₑ. β⁺: proton → neutron + e⁺ + νₑ. Electron capture (EC): proton + e⁻ → neutron + νₑ. Beta particles are more penetrating than alpha, less than gamma; 5–10 mm of aluminum provides effective shielding.",
    category: "Isotopes & Decay",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["radioactivity", "neutrino", "q-value"],
  },
  {
    id: "gamma-radiation",
    term: "Gamma radiation",
    definition:
      "Electromagnetic radiation (photons) emitted from an excited nucleus transitioning to a lower-energy state. Energies range from ~10 keV to >10 MeV. Highly penetrating; attenuation follows I = I₀ e^(−μx), where μ is the linear attenuation coefficient. Requires dense shielding (lead, concrete).",
    category: "Isotopes & Decay",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["ionizing-radiation", "dose", "shielding"],
    equation: "I = I_0 e^{-\\mu x}",
  },
  {
    id: "half-life",
    term: "Half-life",
    definition:
      "The time T½ required for half a quantity of radioactive nuclei to decay. N(t) = N₀ × (1/2)^(t/T½). Ranges from microseconds (Fr-223) to 4.5 billion years (U-238). Related to the decay constant by T½ = ln(2)/λ ≈ 0.693/λ.",
    category: "Isotopes & Decay",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["decay-constant", "radioactivity", "becquerel"],
    equation: "T_{1/2} = \\frac{\\ln 2}{\\lambda}",
  },
  {
    id: "decay-constant",
    term: "Decay constant",
    definition:
      "The probability per unit time (λ, units s⁻¹) that a given nucleus will decay. The decay law is N(t) = N₀ e^(−λt). Linked to half-life by λ = ln(2)/T½. The mean lifetime τ = 1/λ = T½/ln(2) ≈ 1.443 T½.",
    category: "Isotopes & Decay",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["half-life", "radioactivity"],
    equation: "N(t) = N_0 e^{-\\lambda t}",
  },
  {
    id: "binding-energy",
    term: "Binding energy",
    definition:
      "The energy required to completely disassemble a nucleus into free protons and neutrons. Equals the mass defect multiplied by c²: BE = (Zmp + Nmn − M(A,Z)) × c². The semi-empirical mass formula (Bethe-Weizsäcker) decomposes it into volume, surface, Coulomb, asymmetry, and pairing terms.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "mass-defect",
      "q-value",
      "semi-empirical-mass-formula",
      "fission",
      "fusion",
    ],
    equation: "BE = (Zm_p + Nm_n - M_{A,Z})c^2",
  },
  {
    id: "binding-energy-per-nucleon",
    term: "Binding energy per nucleon",
    definition:
      "The average binding energy divided by the number of nucleons (BE/A). This quantity peaks at ~8.8 MeV/nucleon near ⁵⁶Fe (iron-56). Nuclei lighter than iron release energy by fusion; nuclei heavier than iron release energy by fission — both moving toward the iron peak.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "binding-energy",
      "fission",
      "fusion",
      "valley-of-stability",
    ],
  },
  {
    id: "mass-defect",
    term: "Mass defect",
    definition:
      "The difference Δm between the sum of masses of individual free nucleons and the actual nuclear mass: Δm = Zmp + Nmn − M(A,Z). This 'missing' mass is stored as nuclear binding energy. For ⁵⁶Fe, Δm ≈ 0.529 u, corresponding to ~492 MeV of binding energy.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["binding-energy", "q-value", "e-mc2"],
  },
  {
    id: "mass-excess",
    term: "Mass excess",
    definition:
      "The difference between the actual atomic mass and A atomic mass units, expressed in keV: Δ = (M − A) × 931.494 MeV/u. Tabulated in the Atomic Mass Evaluation (AME2020). Used in calculating Q-values: Q = Σ(reactant Δ) − Σ(product Δ).",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["q-value", "binding-energy", "ame2020"],
    equation: "\\Delta = (M - A) \\times 931.494 \\text{ MeV/u}",
  },
  {
    id: "q-value",
    term: "Q-value",
    definition:
      "The energy released (Q > 0, exothermic) or absorbed (Q < 0, endothermic) in a nuclear reaction, equal to the mass difference between reactants and products multiplied by c². Calculated from mass excesses: Q = Σ(Δᵢₙ) − Σ(Δₒᵤₜ). For U-235 thermal fission, Q ≈ 200 MeV.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["binding-energy", "mass-defect", "e-mc2"],
    equation:
      "Q = \\sum \\Delta_{\\rm reactants} - \\sum \\Delta_{\\rm products}",
  },
  {
    id: "e-mc2",
    term: "E = mc²",
    definition:
      "Einstein's mass-energy equivalence: the rest energy of an object equals its mass times c² (≈ 9×10¹⁶ J/kg). In nuclear reactions, even tiny mass differences correspond to enormous energy releases. Converting 1 gram of matter fully to energy yields ~9×10¹³ J — comparable to a 21-kiloton explosion.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["mass-defect", "binding-energy", "q-value"],
    equation: "E = mc^2",
  },
  {
    id: "nuclear-force",
    term: "Nuclear force",
    definition:
      "The residual strong interaction that binds protons and neutrons in the nucleus, mediated by pion exchange at ranges ~1–3 fm. It is short-range (~2 fm), attractive at moderate distances, and strongly repulsive at very short distances (<0.5 fm). It is charge-independent (same for p-p, n-n, p-n).",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["binding-energy", "coulomb-barrier", "nucleus"],
  },
  {
    id: "coulomb-barrier",
    term: "Coulomb barrier",
    definition:
      "The electrostatic repulsion between two positively charged nuclei that must be overcome for a nuclear reaction to occur. The barrier height V_C = kZ₁Z₂e²/R ≈ 1.44 Z₁Z₂/R MeV·fm. Quantum tunneling (described by the Gamow factor) allows fusion reactions at energies well below the classical barrier.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["gamow-factor", "nuclear-force", "fusion"],
    equation: "V_C \\approx \\frac{1.44 Z_1 Z_2}{R} \\text{ (MeV·fm)}",
  },
  {
    id: "gamow-factor",
    term: "Gamow factor",
    definition:
      "The quantum tunneling probability G for two charged nuclei to penetrate the Coulomb barrier. G = exp(−2πη), where η = Z₁Z₂e²/ℏv is the Sommerfeld parameter (v = relative velocity). It strongly governs reaction rates in stellar nucleosynthesis and fusion reactors.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["coulomb-barrier", "cross-section-nuclear", "fusion"],
    equation: "G = e^{-2\\pi\\eta}",
  },
  {
    id: "cross-section-nuclear",
    term: "Cross section (nuclear)",
    definition:
      "A measure of the probability that a specific nuclear reaction will occur, with units of barns (1 b = 10⁻²⁴ cm²). The reaction rate R = σ × Φ × N, where σ is cross-section, Φ is neutron flux, and N is target atom density. Cross-sections are strongly energy-dependent and display resonance structure.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "barn",
      "neutron-flux",
      "resonance-nuclear",
      "1v-absorption",
    ],
    equation: "R = \\sigma \\Phi N",
  },
  {
    id: "barn",
    term: "Barn",
    definition:
      "The standard unit of nuclear cross-section: 1 barn = 10⁻²⁴ cm² = 10⁻²⁸ m². Named by Manhattan Project physicists who described U-235's large fission cross-section as 'as big as a barn.' Thermal fission cross-section of U-235 is ~585 barns; of Pu-239, ~750 barns.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["cross-section-nuclear"],
  },
  {
    id: "resonance-nuclear",
    term: "Resonance (nuclear)",
    definition:
      "A sharp peak in the nuclear cross-section at a specific neutron energy corresponding to formation of a compound nucleus in a discrete excited state. Resonances dominate the epithermal energy region (1 eV – 100 keV). U-238 has its first capture resonance at 6.67 eV.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["cross-section-nuclear", "compound-nucleus"],
  },
  {
    id: "compound-nucleus",
    term: "Compound nucleus",
    definition:
      "An excited intermediate nucleus formed when an incident particle is absorbed by the target nucleus. The compound nucleus 'forgets' the entry channel and decays via any energetically allowed exit channel: γ emission, neutron emission, fission, etc. Proposed by Niels Bohr in 1936.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["resonance-nuclear", "fission", "cross-section-nuclear"],
  },
  {
    id: "liquid-drop-model",
    term: "Liquid drop model",
    definition:
      "A macroscopic model of the nucleus analogous to a charged liquid drop. It accounts for binding energy through five terms in the semi-empirical mass formula: volume, surface, Coulomb, asymmetry, and pairing. Successfully predicts the gross features of nuclear masses and fission barriers.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "semi-empirical-mass-formula",
      "binding-energy",
      "shell-model",
      "fission",
    ],
  },
  {
    id: "semi-empirical-mass-formula",
    term: "Semi-empirical mass formula (SEMF)",
    definition:
      "The Bethe-Weizsäcker formula expressing nuclear binding energy: BE = aᵥA − aₛA^(2/3) − aC Z(Z-1)A^(-1/3) − aₐ(A-2Z)²/A ± δ(A,Z). The five terms correspond to volume, surface, Coulomb, asymmetry, and pairing contributions. With aᵥ=15.85, aₛ=18.34, aC=0.71, aₐ=23.23 MeV.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["liquid-drop-model", "binding-energy", "magic-numbers"],
    equation:
      "BE = a_v A - a_s A^{2/3} - a_C \\frac{Z(Z-1)}{A^{1/3}} - a_a \\frac{(A-2Z)^2}{A} \\pm \\delta",
  },
  {
    id: "shell-model",
    term: "Shell model",
    definition:
      "A microscopic nuclear model in which nucleons occupy quantized energy levels (shells) in an effective mean-field potential plus spin-orbit coupling. Predicts magic numbers (2, 8, 20, 28, 50, 82, 126) at closed shells, explaining anomalous stability. Developed independently by Maria Goeppert Mayer and J. Hans D. Jensen (Nobel Prize 1963).",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["magic-numbers", "liquid-drop-model", "binding-energy"],
  },
  {
    id: "magic-numbers",
    term: "Magic numbers",
    definition:
      "Nucleon numbers (2, 8, 20, 28, 50, 82, 126) at which nuclear shells are completely filled, leading to exceptional nuclear stability — analogous to noble gas electron configurations. Doubly magic nuclei (e.g., ⁴He, ¹⁶O, ⁴⁰Ca, ⁴⁸Ca, ²⁰⁸Pb) are especially stable.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["shell-model", "valley-of-stability", "binding-energy"],
  },
  {
    id: "valley-of-stability",
    term: "Valley of stability",
    definition:
      "The region of the nuclide chart where nuclear binding energy per nucleon is maximized. Stable nuclides lie along this valley; those above (proton-rich) undergo β⁺ or EC decay; those below (neutron-rich) undergo β⁻ decay. The valley curves away from N=Z for heavier nuclei due to the Coulomb term.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["binding-energy-per-nucleon", "beta-decay", "nuclide"],
  },
  {
    id: "mass-parabola",
    term: "Mass parabola",
    definition:
      "For a fixed mass number A, the binding energies of isobars follow a parabolic shape when plotted vs. Z (from the SEMF asymmetry term). The minimum of the parabola marks the most stable isobar. Odd-A chains have a single parabola; even-A chains have two (from the pairing term), allowing double beta decay.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["isobar", "semi-empirical-mass-formula", "beta-decay"],
  },
  {
    id: "nuclear-radius",
    term: "Nuclear radius",
    definition:
      "The approximate size of a nucleus, described by R = r₀ A^(1/3) where r₀ ≈ 1.2–1.25 fm (femtometers, 10⁻¹⁵ m). This A^(1/3) scaling reflects nearly constant nuclear density (≈ 0.17 nucleons/fm³). Electron scattering experiments at Hofstadter's lab (1950s) first measured nuclear charge distributions.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["nucleus", "binding-energy"],
    equation: "R = r_0 A^{1/3}, \\; r_0 \\approx 1.2 \\text{ fm}",
  },
  {
    id: "fission",
    term: "Fission",
    definition:
      "The splitting of a heavy nucleus (A>230) into two lighter fragments (fission products), releasing ~200 MeV of energy, 2–3 prompt neutrons, and gamma radiation. Induced fission requires an incident neutron (thermal for U-235, fast for U-238). Q ≈ Σ(BE_products) − BE_parent.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["chain-reaction", "neutron", "q-value", "fission-yield"],
  },
  {
    id: "fission-yield",
    term: "Fission yield",
    definition:
      "The percentage of fission events that produce a particular nuclide as a product, plotted as a function of mass number A. The distribution is bimodal ('double hump') with peaks near A≈95 and A≈138 for U-235 thermal fission. The asymmetric split is driven by nuclear shell effects near N=82.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fission", "magic-numbers"],
  },
  {
    id: "fusion",
    term: "Fusion",
    definition:
      "The combination of two light nuclei into a heavier one, releasing energy when the product has greater binding energy per nucleon than the reactants. The D-T reaction (²H + ³H → ⁴He + n + 17.6 MeV) has the highest cross-section at achievable plasma temperatures and is the primary target of fusion energy research.",
    category: "Physics",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "binding-energy",
      "q-value",
      "lawson-criterion",
      "coulomb-barrier",
    ],
    equation: "^2H + ^3H \\to ^4He + n + 17.6 \\text{ MeV}",
  },
  {
    id: "chain-reaction",
    term: "Chain reaction",
    definition:
      "A self-sustaining sequence of fission events in which neutrons from each fission event trigger at least one additional fission. The criticality condition is k_eff = 1. In a reactor, k_eff is maintained near 1 by control rods and moderator; the delayed neutron fraction (β_eff ≈ 0.0065 for U-235) makes this control possible.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fission", "keff", "control-rod", "delayed-neutron"],
  },
  {
    id: "neutron-flux",
    term: "Neutron flux",
    definition:
      "The product of neutron density n (neutrons/cm³) and their mean speed v: Φ = nv, in units of n/cm²·s. Typical thermal reactor core flux is ~10¹³ n/cm²·s. The reaction rate density R = σΦN depends linearly on flux. Also expressed as a scalar flux Φ = ∫Ψ dΩ over all directions.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["cross-section-nuclear", "reactor", "burnup"],
    equation: "\\Phi = nv",
  },
  {
    id: "fermi-energy",
    term: "Fermi energy",
    definition:
      "The highest occupied energy level of a Fermi gas of nucleons at T=0, approximately 33 MeV for nuclear matter. Related to nucleon density: E_F = (ℏ²/2m)(3π²ρ/2)^(2/3). The Fermi energy concept from condensed matter physics carries over to nuclear structure in the shell model.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["shell-model", "binding-energy"],
    equation:
      "E_F = \\frac{\\hbar^2}{2m}\\left(\\frac{3\\pi^2\\rho}{2}\\right)^{2/3}",
  },
  {
    id: "bethe-bloch-formula",
    term: "Bethe-Bloch formula",
    definition:
      "The relativistic quantum-mechanical formula for the mean energy loss per unit path length (stopping power) of a charged particle in matter: −dE/dx = Kz²Z/Aβ² [½ln(2m_e c²β²γ²T_max/I²) − β²]. It describes how protons, alpha particles, and heavy ions slow down in material.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["stopping-power", "bragg-peak", "let"],
    equation:
      "-\\frac{dE}{dx} \\propto \\frac{z^2}{\\beta^2} \\ln\\left(\\frac{2m_e c^2 \\beta^2 \\gamma^2}{I}\\right)",
  },
  {
    id: "stopping-power",
    term: "Stopping power",
    definition:
      "The energy loss per unit path length −dE/dx of a charged particle in a material (units: MeV/cm or keV/μm). Related to LET. Increases as the particle slows, peaking in the Bragg peak. Heavy charged particles deposit most energy near end of range. Governed by the Bethe-Bloch formula.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["bethe-bloch-formula", "bragg-peak", "let"],
  },
  {
    id: "bragg-peak",
    term: "Bragg peak",
    definition:
      "The sharp maximum in energy deposition at the end of a charged particle's (proton, ion) track in material, where the stopping power is highest. Exploited in proton therapy: protons deposit most dose at the tumor depth with minimal exit dose, reducing radiation damage to healthy tissue.",
    category: "Physics",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["stopping-power", "let", "proton-therapy"],
  },
  {
    id: "let",
    term: "LET (linear energy transfer)",
    definition:
      "Energy deposited by ionizing radiation per unit track length in a medium (keV/μm). High-LET radiation (alpha particles: ~100 keV/μm, heavy ions) causes densely ionizing tracks and is ~20× more damaging per unit absorbed dose than low-LET (gamma: ~0.3 keV/μm). The LET determines the radiation weighting factor w_R used in dose equivalent.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["sievert", "dose", "rbe", "bethe-bloch-formula"],
  },
  {
    id: "rbe",
    term: "RBE (relative biological effectiveness)",
    definition:
      "The ratio of the dose of a reference radiation (250 kVp X-rays) to the dose of the test radiation producing the same biological effect: RBE = D_ref/D_test. Increases with LET, peaks ~100–200 keV/μm, then decreases at very high LET ('overkill'). Alpha particles have RBE ≈ 20; protons ≈ 1.1.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["let", "dose", "sievert"],
  },
  {
    id: "1v-absorption",
    term: "1/v absorption",
    definition:
      "The property of many nuclides where the neutron absorption cross-section is inversely proportional to neutron speed (σ ∝ 1/v) in the thermal energy region (< 1 eV). The reaction rate R = σΦ is thus energy-independent in a 1/v absorber. Important for boron-based neutron absorption in reactor control.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["cross-section-nuclear", "thermal-neutron", "barn"],
  },
  // ────────────────────────────────────────────────
  // REACTOR ENGINEERING
  // ────────────────────────────────────────────────
  {
    id: "reactor",
    term: "Reactor",
    definition:
      "A device sustaining a controlled nuclear fission chain reaction. The five essential components are: fissile fuel, moderator (thermal reactors), coolant, control rods, and a pressure vessel/containment. As of 2024, ~440 commercial reactors operate worldwide, generating ~370 GWe (IAEA PRIS).",
    category: "Reactor Engineering",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "pwr",
      "bwr",
      "candu",
      "msr",
      "fission",
      "coolant",
      "moderator",
    ],
  },
  {
    id: "pwr",
    term: "PWR",
    definition:
      "Pressurized Water Reactor — the most common commercial reactor type (~70% of global fleet). The primary coolant is kept at ~155 bar so it remains liquid at 315°C. Heat transfers to a secondary steam loop via steam generators. Key vendors: Westinghouse AP1000, Framatome EPR, VVER (Russia).",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "bwr", "primary-loop", "steam-generator"],
  },
  {
    id: "bwr",
    term: "Boiling water reactor (BWR)",
    definition:
      "A light-water reactor in which coolant boils directly in the core, producing steam that drives the turbine without a secondary loop. Operating pressure ~75 bar (lower than PWR). Slightly simpler design but turbine contamination is a radiation concern. Key vendors: GE (BWR/6, ABWR).",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "pwr", "coolant", "void-coefficient"],
  },
  {
    id: "candu",
    term: "CANDU",
    definition:
      "CANada Deuterium Uranium reactor — a pressurized heavy-water reactor using natural uranium fuel (0.72% U-235). The heavy-water moderator has low neutron absorption, enabling on-power refueling via pressure tubes. 30+ units operate in Canada, South Korea, Romania, India, and China.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "moderator", "heavy-water", "on-power-refueling"],
  },
  {
    id: "msr",
    term: "MSR (molten salt reactor)",
    definition:
      "An advanced reactor where fuel is dissolved in a fluoride or chloride molten salt that serves as both fuel carrier and coolant. Potentially walk-away safe (passive drain to a freeze plug), operates at near-atmospheric pressure, and is compatible with thorium breeding. Pioneered at ORNL (1965 MSRE). Several commercial designs in development (2024).",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["reactor", "thorium-fuel-cycle", "passive-safety", "smr"],
  },
  {
    id: "htgr",
    term: "HTGR (high-temperature gas-cooled reactor)",
    definition:
      "A reactor using helium coolant and graphite moderator with TRISO fuel particles (ceramic-coated microspheres). Outlet temperatures >700°C enable industrial heat applications. Inherently safe: the strong negative temperature coefficient and passive heat removal allow graceful shutdown without active cooling.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["reactor", "passive-safety", "triso", "smr"],
  },
  {
    id: "smr",
    term: "SMR (small modular reactor)",
    definition:
      "Nuclear reactors with electrical output ≤ 300 MWe, designed for factory fabrication and modular deployment. Aim to reduce capital costs, enable flexibility in grid siting, and provide passive safety. Designs include NuScale VOYGR, Rolls-Royce SMR, GEH BWRX-300, and Kairos KP-FHR. The NRC approved the NuScale SMR design in January 2023.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "passive-safety", "advanced-reactor"],
  },
  {
    id: "moderator",
    term: "Moderator",
    definition:
      "A material that slows fast fission neutrons (~2 MeV) to thermal energies (~0.025 eV) via elastic scattering. Best moderators have low atomic mass and low neutron absorption. H₂O: short moderation length but absorbs neutrons; requires enriched fuel. D₂O: longer but lower absorption (enables natural U fuel in CANDU). Graphite: used in RBMK, HTGR.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "thermal-neutron",
      "fast-neutron",
      "reactor",
      "cross-section-nuclear",
    ],
  },
  {
    id: "coolant",
    term: "Coolant",
    definition:
      "The fluid carrying heat from the reactor core to the power cycle. H₂O (PWR/BWR): proven, cheap, doubles as moderator; limited to <330°C at high pressure. D₂O (CANDU): similar but with lower absorption. He gas (HTGR): chemically inert, high temp capability. Liquid Na (fast reactors): high thermal conductivity but chemically reactive.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "primary-loop", "steam-generator"],
  },
  {
    id: "control-rod",
    term: "Control rod",
    definition:
      "Rods containing strong neutron absorbers (B-10, Hf, Ag-In-Cd) that can be inserted/withdrawn from the core to control reactivity or initiate a SCRAM. The differential rod worth (dk/dx) varies with position; peak worth occurs in the region of highest flux. Rod ejection accidents are a key design basis event.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["chain-reaction", "reactor", "control-rod-worth", "scram"],
  },
  {
    id: "control-rod-worth",
    term: "Control rod worth",
    definition:
      "The reactivity change caused by inserting or withdrawing a control rod, expressed in dollars ($) or percent Δk/k. 1 dollar = β_eff. Total rod worth must exceed the shutdown margin by design margin. The integral worth is typically measured using reactor startup data and validated against physics models.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "control-rod",
      "keff",
      "delayed-neutron-fraction",
      "shutdown-margin",
    ],
  },
  {
    id: "keff",
    term: "k-effective (k_eff)",
    definition:
      "The effective neutron multiplication factor: the ratio of neutrons in one generation to the previous generation, accounting for leakage. k_eff = k∞ × P_NL (non-leakage probability). k_eff = 1: critical (steady state). k_eff < 1: subcritical. k_eff > 1: supercritical. Controlled to ~1.0 ± 0.001 during normal operation.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["criticality", "chain-reaction", "kinf", "reactivity"],
    equation: "k_{\\rm eff} = k_\\infty \\cdot P_{NL}",
  },
  {
    id: "kinf",
    term: "k-infinity (k∞)",
    definition:
      "The neutron multiplication factor for an infinite (non-leaking) medium: k∞ = η × f × p × ε (the four-factor formula). η: neutrons per absorption in fuel. f: thermal utilization. p: resonance escape probability. ε: fast fission factor. For typical LWR fuel, k∞ ≈ 1.3–1.8 (fresh fuel).",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["keff", "four-factor-formula", "criticality"],
    equation: "k_\\infty = \\eta f p \\varepsilon",
  },
  {
    id: "reactivity",
    term: "Reactivity",
    definition:
      "A measure of the deviation from criticality: ρ = (k_eff − 1)/k_eff. Expressed in %Δk/k, pcm (percent mille: 10⁻⁵ Δk/k), or 'dollars' (ρ/$= β_eff). Positive reactivity: power increasing. Negative: decreasing. At criticality, ρ = 0.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["keff", "delayed-neutron-fraction", "xenon-poisoning"],
    equation: "\\rho = \\frac{k_{\\rm eff}-1}{k_{\\rm eff}}",
  },
  {
    id: "criticality",
    term: "Criticality",
    definition:
      "The condition of a self-sustaining chain reaction where k_eff = 1. Prompt criticality (k_prompt > 1) is extremely rapid and cannot be controlled. Delayed criticality (controlled by delayed neutrons) is the operating regime of all power reactors. Criticality accidents in fuel facilities (e.g., Tokaimura 1999) have caused fatalities.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["chain-reaction", "keff", "delayed-neutron", "control-rod"],
  },
  {
    id: "delayed-neutron",
    term: "Delayed neutron",
    definition:
      "A neutron emitted seconds to minutes after fission, from radioactive decay of fission products ('delayed neutron precursors'). Although only ~0.65% of all fission neutrons (for U-235), delayed neutrons slow the effective reactor period to ~80 seconds, making control feasible. Without them, the reactor period would be ~0.001 s.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["delayed-neutron-fraction", "reactor-period", "prompt-jump"],
  },
  {
    id: "delayed-neutron-fraction",
    term: "Delayed neutron fraction (β_eff)",
    definition:
      "The effective fraction of total fission neutrons that are delayed, weighted by their importance in the reactor. For U-235 thermal fission β_eff ≈ 0.0065; for Pu-239, β_eff ≈ 0.0021 (more challenging to control). Reactivity is often measured in 'dollars' relative to β_eff.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["delayed-neutron", "reactivity", "keff"],
  },
  {
    id: "reactor-period",
    term: "Reactor period",
    definition:
      "The time T for reactor power to change by factor e (≈ 2.718). P(t) = P₀ × e^(t/T). Related to the inhour equation. At criticality with delayed neutrons, T ≈ 80 s for small reactivity insertions. The inhour equation gives T as a function of reactivity ρ.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["inhour-equation", "delayed-neutron", "reactivity"],
    equation: "P(t) = P_0 e^{t/T}",
  },
  {
    id: "inhour-equation",
    term: "Inhour equation",
    definition:
      "The transcendental equation relating reactor period T to reactivity ρ, accounting for delayed neutron groups: ρ = Λ/T + Σᵢ βᵢ/(1 + λᵢT). One 'inhour' (IH) is the reactivity that makes the stable period equal to one hour. The equation has as many positive roots as there are delayed groups.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["reactor-period", "reactivity", "delayed-neutron-fraction"],
  },
  {
    id: "xenon-poisoning",
    term: "Xenon poisoning",
    definition:
      "The buildup of Xe-135 (σ_a = 2.65×10⁶ barns, the largest known thermal cross-section) in the reactor core. Xe-135 is produced both directly from fission (~0.3%) and via β⁻ decay of I-135 (T½=6.6h). After shutdown, Xe-135 peaks ('xenon peak') ~8–10 hours later due to I-135 decay, potentially preventing restart for 20–40 hours ('xenon pit').",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["samarium-poisoning", "reactivity", "reactor"],
  },
  {
    id: "samarium-poisoning",
    term: "Samarium poisoning",
    definition:
      "The neutron absorption by Sm-149 (σ_a ≈ 40,800 barns), a stable fission product produced from decay of Pm-149. At equilibrium during operation, Sm-149 concentration is constant. After shutdown, Sm-149 builds up to ~1.5× equilibrium as Pm-149 decays (T½=53 h), causing a reactivity decrease that reverses over ~10 days of restart.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["xenon-poisoning", "reactivity"],
  },
  {
    id: "xenon-135",
    term: "Xenon-135",
    definition:
      "The principal neutron-absorbing fission product in thermal reactors. T½ = 9.17 h, σ_a = 2.65×10⁶ barns at 0.025 eV. Produced from I-135 decay (T½=6.57 h) and directly from fission. Spatial xenon oscillations can destabilize large reactor cores and require control rod action. Xenon buildup prevented the restart of Chernobyl Unit 4 on 26 April 1986.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["xenon-poisoning", "samarium-poisoning"],
  },
  {
    id: "void-coefficient",
    term: "Void coefficient",
    definition:
      "The change in reactivity per unit change in coolant void fraction (steam bubble content). In PWRs and BWRs with light water moderator, the void coefficient is strongly negative (adding voids reduces moderation, reduces reactivity). The RBMK reactor had a positive void coefficient at low power, contributing to the Chernobyl accident.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "moderator-temperature-coefficient",
      "reactivity",
      "chernobyl",
    ],
  },
  {
    id: "moderator-temperature-coefficient",
    term: "Moderator temperature coefficient",
    definition:
      "The change in reactivity per degree Celsius increase in moderator temperature (dρ/dT_mod). In LWRs, this is negative: hotter moderator is less dense, less effective at moderating neutrons, reducing fission. This negative feedback is an inherent safety feature. Values typically −10 to −50 pcm/°C.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["void-coefficient", "reactivity", "passive-safety"],
  },
  {
    id: "burnup",
    term: "Burn-up (fuel)",
    definition:
      "A measure of how much energy has been extracted from nuclear fuel, expressed in MWd/tU (megawatt-days per tonne of uranium) or GWd/tU. Typical LWR discharge burnup: 40,000–60,000 MWd/tU. Higher burnup extracts more energy from fuel but increases fission product inventory and structural challenges.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fuel-assembly", "spent-nuclear-fuel", "neutron-flux"],
  },
  {
    id: "on-power-refueling",
    term: "On-power refueling",
    definition:
      "The ability to replace fuel assemblies while the reactor continues operating at power. A unique feature of CANDU reactors (and some research reactors). Reduces refueling downtime and allows continuous optimization of reactivity, but requires specialized fueling machines and pressure tube design.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["candu", "fuel-assembly", "burnup"],
  },
  {
    id: "passive-safety",
    term: "Passive safety",
    definition:
      "Safety systems that function without active components (pumps, valves, power supplies) or operator action, using only natural physical laws: gravity, natural convection, evaporation. Examples: AP1000 gravity-fed accumulators, PBMR decay heat removal by conduction to soil. Reduces dependency on active systems and AC power (addressing station-blackout scenarios).",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["defense-in-depth", "eccs", "station-blackout"],
  },
  {
    id: "peaking-factor",
    term: "Peaking factor",
    definition:
      "The ratio of maximum local power density to average power density in the core. Limits the maximum fuel temperature. The radial peaking factor F_rΔH ≤ ~1.65 for PWRs (NRC limit). High peaking factors risk fuel damage and limit total power output. Controlled by control rod positioning, burnable absorbers, and fuel loading patterns.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["neutron-flux", "fuel-rod", "peak-cladding-temperature"],
  },
  {
    id: "scram",
    term: "SCRAM",
    definition:
      "Emergency shutdown of a nuclear reactor by rapid insertion of control rods (or in BWRs, injection of liquid poison). Reportedly an acronym for 'Safety Control Rod Axe Man' (from the first reactor, CP-1, where rods were attached to ropes cut by an axe as a backup). Reduces reactor power to near zero within seconds.",
    category: "Reactor Engineering",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["control-rod", "reactor", "shutdown-margin"],
  },
  {
    id: "shutdown-margin",
    term: "Shutdown margin",
    definition:
      "The amount of negative reactivity (subcriticality) that would exist in the core with the most reactive control rod fully withdrawn, after all other rods are fully inserted. Required by regulation to be negative (typically ≤ −1% Δk/k) at all temperatures and fuel conditions to ensure the reactor can be safely shutdown even with the highest-worth rod stuck out.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["control-rod-worth", "reactivity", "scram"],
  },
  {
    id: "prompt-jump",
    term: "Prompt jump approximation",
    definition:
      "When reactivity is inserted rapidly, reactor power jumps immediately by a factor ~1/(1−ρ/β_eff) due to prompt neutrons alone, before delayed neutrons respond. This 'prompt jump' is followed by a slower exponential rise or decline driven by delayed groups. The approximation assumes delayed neutron precursor concentrations remain constant during the initial transient.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["delayed-neutron", "reactivity", "reactor-period"],
  },
  {
    id: "boron-worth",
    term: "Boron worth",
    definition:
      "The reactivity change per unit change in dissolved boron concentration in the coolant (pcm/ppm). B-10 (natural abundance 19.8%) has σ_a = 3840 barns at 0.025 eV. PWRs typically start a fuel cycle with ~1000–2000 ppm boron, decreasing to ~0 ppm as burnup consumes fuel reactivity. Boron worth ≈ −10 pcm/ppm.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["reactivity", "pwr"],
  },
  {
    id: "neutron-generation-time",
    term: "Neutron generation time",
    definition:
      "The mean time between a neutron being born and producing the next generation, denoted Λ (lambda). For a thermal LWR Λ ≈ 10⁻⁵ s (prompt neutrons only). The effective generation time Λ_eff is extended to ~0.1 s by delayed neutrons, making control feasible.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["delayed-neutron", "reactor-period", "inhour-equation"],
  },
  {
    id: "load-factor",
    term: "Load factor",
    definition:
      "The ratio of actual electrical energy produced over a period to the maximum possible energy (at full rated power for the full period), expressed as a percentage. Also called capacity factor. Modern nuclear power plants average ~90% globally, among the highest of any generating technology (IEA, 2023).",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "burnup"],
  },
  {
    id: "lawson-criterion",
    term: "Lawson criterion",
    definition:
      "The condition for net fusion energy output: the product of plasma density n, energy confinement time τ_E, and plasma temperature T must exceed a threshold. For D-T fusion: nτ_E T ≥ ~3×10²¹ keV·s/m³. The NIF ignition experiment (August 2021) exceeded Q=1 (fusion energy out > laser energy in) for the first time.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fusion", "plasma"],
  },
  {
    id: "zircaloy",
    term: "Zircaloy",
    definition:
      "Zirconium-based alloys (Zircaloy-2, Zircaloy-4) used as fuel rod cladding due to their very low neutron absorption cross-section (~0.18 barns), high melting point (1850°C), and corrosion resistance in hot water. Zirconium reacts exothermically with steam at >1200°C: Zr + 2H₂O → ZrO₂ + 2H₂, a key concern in severe accidents.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["cladding", "fuel-rod", "loca", "severe-accident"],
  },
  {
    id: "thermal-neutron",
    term: "Thermal neutron",
    definition:
      "A neutron in thermal equilibrium with its surroundings (~0.025 eV at 20°C, velocity ~2200 m/s). Described by a Maxwell-Boltzmann distribution. Thermal neutrons have much larger fission cross-sections for fissile nuclides: σ_f(U-235)=585 barns vs. ~1 barn for fast neutrons. Essential for efficient operation of thermal reactors.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fast-neutron", "moderator", "cross-section-nuclear"],
  },
  {
    id: "fast-neutron",
    term: "Fast neutron",
    definition:
      "A neutron with kinetic energy > ~1 keV (fission neutrons average ~2 MeV). Fast reactors use unmoderated fast neutrons, enabling breeding of fissile Pu-239 from U-238. The fission cross-section of U-238 is ~0.3 barns for fast neutrons but effectively zero for thermal neutrons, making U-238 'fertile' in fast spectra.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["thermal-neutron", "moderator", "fast-reactor"],
  },
  {
    id: "enrichment-uranium",
    term: "Enrichment (uranium)",
    definition:
      "The process of increasing the ²³⁵U fraction above natural (0.72%). LEU (low-enriched uranium, < 20% U-235) is used in power reactors; typical LWR fuel is 3–5% U-235. HEU (highly enriched, ≥ 20%) is used in naval reactors and research reactors. The engineering details of enrichment processes are subject to export controls (INFCIRC/225).",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["swu", "heu", "leu", "fuel-rod"],
  },
  // ────────────────────────────────────────────────
  // FUEL CYCLE
  // ────────────────────────────────────────────────
  {
    id: "fuel-assembly",
    term: "Fuel assembly",
    definition:
      "A structured bundle of fuel rods forming the basic reload unit. A typical PWR assembly is a 17×17 array (~264 fuel rods + control rod guide tubes + instrumentation tube), ~4 m tall. A 1000 MWe PWR core contains ~157 assemblies (~83 tonnes of UO₂). Reload fraction is typically 1/3 per cycle (~18 months).",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fuel-rod", "burnup", "enrichment-uranium"],
  },
  {
    id: "spent-nuclear-fuel",
    term: "Spent nuclear fuel",
    definition:
      "Irradiated fuel assemblies removed from the reactor after reaching discharge burnup. Contains U-235 (depleted), Pu-239 (bred), minor actinides, and fission products. Highly radioactive; generates decay heat requiring cooling. Stored in water-filled spent fuel pools (SFPs) for years, then potentially in dry cask storage.",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "dry-cask-storage",
      "burnup",
      "high-level-waste",
      "reprocessing",
    ],
  },
  {
    id: "fissile",
    term: "Fissile",
    definition:
      "A nuclide capable of sustaining a fission chain reaction with thermal neutrons. The three primary fissile nuclides are: U-233, U-235 (natural), and Pu-239. All can also fission with fast neutrons. U-235 is the only naturally occurring fissile material in significant quantities (~0.72% of natural uranium).",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fertile", "enrichment-uranium", "plutonium"],
  },
  {
    id: "fertile",
    term: "Fertile",
    definition:
      "A nuclide that becomes fissile after neutron capture followed by beta decay. U-238 → (n,γ) → U-239 → β⁻ (23.5 min) → Np-239 → β⁻ (2.36 d) → Pu-239. Th-232 similarly breeds U-233. Fertile materials are the basis of 'breeder' reactor concepts.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "fissile",
      "plutonium",
      "thorium-fuel-cycle",
      "fast-reactor",
    ],
  },
  {
    id: "plutonium",
    term: "Plutonium",
    definition:
      "Element 94 (Pu). Produced in reactors from U-238 by neutron capture and beta decay. Pu-239 (T½=24,110 yr) is fissile and accumulates in irradiated LWR fuel (~1% of mass at discharge). Reprocessed plutonium is used in MOX fuel. Pu-238 (high heat output) powers RTGs for space missions.",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fertile", "mox", "reprocessing", "transuranics"],
  },
  {
    id: "mox",
    term: "Mixed oxide fuel (MOX)",
    definition:
      "Fuel consisting of a blend of uranium dioxide and plutonium dioxide (UO₂ + PuO₂). Used to 'burn' surplus weapons or reactor-grade plutonium in LWRs. Pu content typically 3–10%. Lower β_eff than UO₂ fuel (more Pu-239), requiring additional attention to reactor kinetics and control.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["plutonium", "fuel-assembly", "reprocessing"],
  },
  {
    id: "reprocessing",
    term: "Reprocessing",
    definition:
      "Chemical separation of uranium, plutonium, and fission products from spent nuclear fuel (the PUREX process: Plutonium Uranium Reduction EXtraction). Recovers ~96% of the original uranium and ~1% plutonium for re-fabrication into new fuel. Practiced commercially in France (La Hague), UK (Sellafield), Russia, and Japan.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "spent-nuclear-fuel",
      "mox",
      "high-level-waste",
      "transuranics",
    ],
  },
  {
    id: "thorium-fuel-cycle",
    term: "Thorium fuel cycle",
    definition:
      "Use of Th-232 as a fertile material that breeds U-233 for use as fuel. Thorium is ~3× more abundant than uranium. Thorium fuels produce less long-lived transuranic waste than uranium cycles. Challenges include initial fissile driver requirement, U-233 proliferation concerns, and hard gamma from ²³²U (daughter of U-233 breeding chain).",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fertile", "msr", "u233"],
  },
  {
    id: "swu",
    term: "SWU (separative work unit)",
    definition:
      "The unit of effort required to enrich uranium. SWU = P × V(x_p) + W × V(x_w) − F × V(x_f), where V(x) = (2x−1)ln(x/(1−x)) is the value function. Enriching 1 kg of 4.5% LEU from natural uranium feed requires ~8.5 SWU. Global enrichment capacity (2023): ~65 million SWU/yr.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["enrichment-uranium", "heu", "leu"],
  },
  {
    id: "heu",
    term: "HEU (highly enriched uranium)",
    definition:
      "Uranium enriched to ≥ 20% U-235. Weapons-grade HEU is typically ≥ 90% U-235. Used in naval reactors, research reactors, and nuclear weapons. Subject to strict IAEA safeguards (INFCIRC/153, Additional Protocol). The IAEA Global Threat Reduction Initiative promotes conversion from HEU to LEU.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["enrichment-uranium", "leu", "iaea-safeguards"],
  },
  {
    id: "leu",
    term: "LEU (low-enriched uranium)",
    definition:
      "Uranium enriched to < 20% U-235. Commercial power reactor fuel is typically 3–5% U-235 ('reactor-grade LEU'). HALEU (High-Assay LEU) at 5–20% U-235 is required by some advanced reactor designs (HTGRs, microreactors) and is currently in limited supply globally.",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["enrichment-uranium", "heu", "fuel-assembly"],
  },
  {
    id: "actinide",
    term: "Actinide",
    definition:
      "Elements 89 (Ac) through 103 (Lr), filling the 5f electron shell. In the nuclear fuel cycle, the major actinides are U, Np, Pu, Am, and Cm. Minor actinides (Np, Am, Cm) are produced in reactors and constitute much of the long-term radiotoxicity of spent fuel. Transmutation of minor actinides in fast reactors or ADS can reduce waste lifetime.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["transuranics", "spent-nuclear-fuel", "fertile"],
  },
  {
    id: "transuranics",
    term: "Transuranic elements",
    definition:
      "Elements with atomic number Z > 92 (uranium): Np, Pu, Am, Cm, Bk, Cf, etc. In spent nuclear fuel, transuranics represent ~1.3% of mass but dominate radiotoxicity for timescales > 10,000 years. Their management is the primary challenge of nuclear waste disposal.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["actinide", "high-level-waste", "reprocessing"],
  },
  {
    id: "depleted-uranium",
    term: "Depleted uranium",
    definition:
      "Uranium with U-235 content below natural abundance (< 0.72%), typically 0.2–0.3% U-235, remaining after enrichment. ~1.5 million tonnes exist globally as a byproduct. Uses include radiation shielding (high Z, density 19.1 g/cm³), armor-piercing projectiles, and as fertile fuel in fast reactors.",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["enrichment-uranium", "fertile"],
  },
  // ────────────────────────────────────────────────
  // SAFETY
  // ────────────────────────────────────────────────
  {
    id: "defense-in-depth",
    term: "Defense in depth",
    definition:
      "The IAEA fundamental nuclear safety principle requiring multiple independent barriers and layers of protection between radioactive material and the public: (1) fuel matrix, (2) cladding, (3) primary circuit boundary, (4) containment building, (5) exclusion zone. No single barrier failure should lead to radiological release.",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["passive-safety", "eccs", "containment"],
  },
  {
    id: "alara",
    term: "ALARA",
    definition:
      "As Low As Reasonably Achievable — the radiation protection principle requiring that exposures be kept as low as practicable, taking economic and social factors into account. Not simply minimum exposure, but optimized considering cost-benefit. Mandated by IAEA BSS (GSR Part 3) and NRC 10 CFR 20.",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["effective-dose", "occupational-exposure", "iaea"],
  },
  {
    id: "eccs",
    term: "ECCS (emergency core cooling system)",
    definition:
      "Systems designed to flood the reactor core with water to prevent fuel damage during a loss-of-coolant accident (LOCA). Consists of high-pressure injection (HPI), low-pressure injection (LPI), and accumulators. The AP1000 uses passive ECCS (gravity-driven from water tanks above the core) requiring no pumps or AC power.",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["loca", "passive-safety", "defense-in-depth"],
  },
  {
    id: "loca",
    term: "LOCA (loss-of-coolant accident)",
    definition:
      "A design basis accident involving a break in the reactor coolant pressure boundary, causing loss of coolant. Classified by break size: small (SBLOCA), medium (MBLOCA), large (LBLOCA). The design basis LBLOCA (double-ended guillotine break of largest pipe) is the most severe. ECCS must prevent peak cladding temperature exceeding 1200°C (NRC 10 CFR 50.46).",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["eccs", "peak-cladding-temperature", "defense-in-depth"],
  },
  {
    id: "peak-cladding-temperature",
    term: "Peak cladding temperature (PCT)",
    definition:
      "The maximum fuel cladding temperature during a postulated LOCA event. Regulatory limit in the USA (10 CFR 50.46): PCT ≤ 1204°C (2200°F) to prevent cladding embrittlement and hydrogen generation from zirconium-steam reactions. A key acceptance criterion for ECCS design qualification.",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["loca", "eccs", "zircaloy", "cladding"],
  },
  {
    id: "ines-scale",
    term: "INES scale",
    definition:
      "International Nuclear and Radiological Event Scale (IAEA, 1990) — a 7-level scale for communicating nuclear event severity to the public. Levels 1–3: incidents (no significant release). Levels 4–7: accidents (increasing off-site release). Level 7 (major accident): Chernobyl 1986, Fukushima 2011. Level 5: Three Mile Island 1979.",
    category: "Safety",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["chernobyl", "fukushima", "three-mile-island"],
  },
  {
    id: "pra",
    term: "PRA (probabilistic risk assessment)",
    definition:
      "Quantitative analysis answering: What can go wrong? How likely? What are the consequences? Uses event trees and fault trees. Results expressed as core damage frequency (CDF) and large early release frequency (LERF). Modern LWRs target CDF < 10⁻⁵/reactor-year; advanced reactor designs aim for < 10⁻⁶/reactor-year.",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["defense-in-depth", "safety-culture"],
  },
  {
    id: "safety-culture",
    term: "Safety culture",
    definition:
      "The assembly of characteristics and attitudes in organizations and individuals that establishes that nuclear safety is an overriding priority. Defined by INSAG-4 (IAEA, 1991) following Chernobyl. Encompasses leadership commitment, individual accountability, questioning attitude, and continuous learning. Both Chernobyl and Fukushima accident investigations identified safety culture weaknesses.",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["iaea", "defense-in-depth", "chernobyl"],
  },
  {
    id: "station-blackout",
    term: "Station blackout (SBO)",
    definition:
      "The complete loss of AC power to a nuclear plant (off-site power + emergency diesel generators). Requires the reactor to be cooled using battery-backed systems. Fukushima Daiichi's accident was exacerbated by an SBO caused by the 2011 tsunami. U.S. NRC SBO rule (10 CFR 50.63) requires 4–8 hours of coping capability.",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fukushima", "passive-safety", "eccs"],
  },
  {
    id: "dry-cask-storage",
    term: "Dry cask storage",
    definition:
      "Long-term storage of spent nuclear fuel in sealed steel and concrete containers (dry casks) once it has cooled in spent fuel pools for 5–10 years. Currently used at ~80 sites in the USA. No active cooling required; passive convection maintains safe temperatures. Licensed for 40 years, extendable. Not a permanent solution.",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["spent-nuclear-fuel", "high-level-waste"],
  },
  {
    id: "high-level-waste",
    term: "High-level waste (HLW)",
    definition:
      "Radioactive waste with high activity and/or long half-lives requiring geological disposal. Includes spent nuclear fuel (if not reprocessed) and vitrified reprocessing raffinates. Generates significant heat for hundreds to thousands of years. Deep geological repositories (DGRs) are the internationally accepted disposal pathway (Finland's Onkalo facility is the world's first; commissioned 2025).",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "intermediate-level-waste",
      "low-level-waste",
      "spent-nuclear-fuel",
      "dry-cask-storage",
    ],
  },
  {
    id: "intermediate-level-waste",
    term: "Intermediate-level waste (ILW)",
    definition:
      "Radioactive waste requiring shielding but generating negligible heat. Includes reactor components, resins, sludges, and contaminated equipment. Typically disposed in engineered near-surface or intermediate-depth repositories. Comprises ~7% of total waste activity but ~4% of volume globally (IAEA, 2022).",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["high-level-waste", "low-level-waste"],
  },
  {
    id: "low-level-waste",
    term: "Low-level waste (LLW)",
    definition:
      "Radioactive waste containing low concentrations of radioactivity: gloves, lab equipment, clothing, tools. No special shielding required for handling. ~90% of volume but only ~1% of activity of all nuclear waste. Disposed in engineered surface or near-surface repositories. Classified further into Class A, B, C in the USA (10 CFR 61).",
    category: "Safety",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["high-level-waste", "intermediate-level-waste"],
  },
  {
    id: "chernobyl",
    term: "Chernobyl",
    definition:
      "The INES Level 7 accident at Chernobyl Nuclear Power Plant Unit 4 (Ukraine, USSR) on 26 April 1986. A flawed reactor design (RBMK with positive void coefficient at low power) combined with safety culture failures led to a prompt power excursion, steam explosion, and graphite fire. ~31 direct deaths; estimated 5,000+ excess thyroid cancers in children from I-131 exposure (UNSCEAR 2008). Reshaped global nuclear safety regulation.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "ines-scale",
      "void-coefficient",
      "safety-culture",
      "fukushima",
    ],
  },
  {
    id: "fukushima",
    term: "Fukushima Daiichi",
    definition:
      "The INES Level 7 accident at Fukushima Daiichi Nuclear Power Plant (Japan) in March 2011, triggered by the magnitude-9.0 Tōhoku earthquake and subsequent 14-meter tsunami. All AC power was lost (station blackout); decay heat caused fuel melt in Units 1–3 and hydrogen explosions. No direct radiation deaths; ~2,000 stress-related deaths from evacuation. Led to post-Fukushima safety improvements globally.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["ines-scale", "station-blackout", "eccs", "chernobyl"],
  },
  {
    id: "three-mile-island",
    term: "Three Mile Island",
    definition:
      "The INES Level 5 accident at Three Mile Island Unit 2 (Pennsylvania, USA) on 28 March 1979. A stuck-open pressurizer relief valve combined with operator confusion led to partial core meltdown. No public health effects from radiation; however, it significantly changed U.S. nuclear regulation, training, and public perception.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["ines-scale", "loca", "safety-culture", "chernobyl"],
  },
  // ────────────────────────────────────────────────
  // DETECTION
  // ────────────────────────────────────────────────
  {
    id: "geiger-counter",
    term: "Geiger-Müller counter",
    definition:
      "A gas-filled tube (typically Ne or Ar with halogen quench gas) in which ionizing radiation creates a Townsend avalanche discharge across a high-voltage anode wire. Each ionizing event produces a standard voltage pulse, regardless of energy. Cheap and robust but provides no energy information. Saturates at high count rates (detector dead time ~100–300 μs).",
    category: "Detection",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "scintillator",
      "semiconductor-detector",
      "ionization-chamber",
    ],
  },
  {
    id: "ionization-chamber",
    term: "Ionization chamber",
    definition:
      "A gas-filled detector that collects ion pairs (without avalanche multiplication) produced by ionizing radiation. Operates in the saturation region. Provides accurate dose-rate measurement; used as primary standard dosimeters and in nuclear plant area monitors. Insensitive to individual particle counts at high dose rates.",
    category: "Detection",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["geiger-counter", "proportional-counter", "dose"],
  },
  {
    id: "proportional-counter",
    term: "Proportional counter",
    definition:
      "A gas-filled detector operating in the proportional region (moderate voltage), where the collected charge is proportional to the initial ionization, enabling energy measurement. Used for alpha/beta discrimination. ³He-filled proportional counters are the primary thermal neutron detectors (σ=5330 barns at 0.025 eV).",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["ionization-chamber", "geiger-counter", "neutron-detector"],
  },
  {
    id: "nai-scintillator",
    term: "NaI(Tl) scintillator",
    definition:
      "Sodium iodide activated with thallium — the most widely used gamma spectroscopy detector. High Z (I: Z=53) and high density give good gamma detection efficiency. Energy resolution ~7–8% at 662 keV (Cs-137). Hygroscopic; must be hermetically sealed. Less expensive than HPGe but lower resolution.",
    category: "Detection",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["scintillator", "hpge-detector", "gamma-radiation"],
  },
  {
    id: "hpge-detector",
    term: "HPGe detector (high-purity germanium)",
    definition:
      "A semiconductor gamma-ray spectrometer made from ultra-pure germanium (impurity < 10¹⁰ atoms/cm³). Energy resolution ~0.2% at 1.33 MeV (Co-60) — 10–40× better than NaI. Requires liquid nitrogen cooling (77 K) or electronic cooling. Essential for isotope identification in safeguards, environmental monitoring, and research.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "nai-scintillator",
      "semiconductor-detector",
      "energy-resolution",
    ],
  },
  {
    id: "semiconductor-detector",
    term: "Semiconductor detector",
    definition:
      "A solid-state detector using semiconductor material (Si, Ge) where ionizing radiation creates electron-hole pairs (3.6 eV per pair for Si). Operated with a reverse bias voltage that sweeps charge to electrodes. Superior energy resolution vs. gas detectors because of the low pair-creation energy and solid-state density. Used for alpha/beta/gamma spectrometry and X-ray fluorescence.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["hpge-detector", "scintillator", "energy-resolution"],
  },
  {
    id: "scintillator",
    term: "Scintillator",
    definition:
      "A material that emits visible/UV photons when traversed by ionizing radiation. Organic scintillators (plastic, liquid) detect fast neutrons via proton recoil (H atoms). Inorganic (NaI, CsI, BGO, LaBr₃) detect gamma rays with high efficiency. Light yield from BGO ≈ 8,200 photons/MeV; LaBr₃ offers both high efficiency and 3% energy resolution.",
    category: "Detection",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "nai-scintillator",
      "geiger-counter",
      "semiconductor-detector",
    ],
  },
  {
    id: "neutron-detector",
    term: "Neutron detector",
    definition:
      "Neutrons have no charge and cannot directly ionize; detection requires nuclear reactions producing charged particles. Methods: ³He or BF₃ proportional counters (thermal neutrons via ³He(n,p)T, Q=0.764 MeV); fission chambers (U-235 or Pu-239 coated); activation foils (Au, In, Mn); Li-glass scintillators (thermal); organic scintillators (fast neutrons via proton recoil).",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["proportional-counter", "scintillator", "neutron-flux"],
  },
  {
    id: "energy-resolution",
    term: "Energy resolution",
    definition:
      "The ability of a detector to distinguish between radiation events of slightly different energy, expressed as FWHM/E at a reference energy (e.g., 662 keV). HPGe: ~0.2% (1.3 keV at 662 keV). NaI: ~7%. Si (Li): ~0.5%. Important for isotope identification in mixed-source environments. Determined by statistical fluctuation in charge collection and electronic noise.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "hpge-detector",
      "nai-scintillator",
      "semiconductor-detector",
    ],
  },
  {
    id: "detector-dead-time",
    term: "Detector dead time",
    definition:
      "The minimum time between two events for both to be recorded separately. During dead time, the detector is unresponsive ('paralyzable' or 'non-paralyzable' models). GM tubes: ~100–300 μs (paralyzable). Scintillators: ~1–10 μs. HPGe: ~1–5 μs (electronic). Causes counting losses at high rates; corrected using true rate n = m/(1−mτ) for non-paralyzable detectors.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["geiger-counter", "absolute-efficiency"],
    equation: "n = \\frac{m}{1 - m\\tau}",
  },
  {
    id: "absolute-efficiency",
    term: "Absolute efficiency",
    definition:
      "The ratio of detected events to total events emitted by the source (in all directions). Depends on detector solid angle, intrinsic efficiency, and source-detector geometry. ε_abs = ε_intr × (Ω/4π). A 3-inch NaI detector at 10 cm has ε_abs ≈ 3–30% depending on energy. Calibrated using certified reference sources.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["intrinsic-efficiency", "detector-dead-time"],
    equation:
      "\\varepsilon_{abs} = \\varepsilon_{intr} \\times \\frac{\\Omega}{4\\pi}",
  },
  {
    id: "intrinsic-efficiency",
    term: "Intrinsic efficiency",
    definition:
      "The probability that a particle entering the detector sensitive volume will be detected: ε_intr = detected events / incident events. Depends on detector material, thickness, and particle energy. For a 3-cm NaI at 1 MeV gamma: ε_intr ≈ 40%. For HPGe at 1 MeV: ε_intr ≈ 20–40% depending on detector volume.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["absolute-efficiency", "energy-resolution"],
  },
  {
    id: "pulse-height-spectrum",
    term: "Pulse height spectrum",
    definition:
      "A histogram of detector output pulse amplitudes, proportional to energy deposited. For a monoenergetic gamma source, shows a full-energy peak, Compton continuum, and Compton edge. Photopeak area is proportional to source activity. Spectral features (sum peaks, single/double escape peaks, backscatter peak) aid in source identification.",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "energy-resolution",
      "semiconductor-detector",
      "gamma-radiation",
    ],
  },
  {
    id: "spectrometry",
    term: "Spectrometry (nuclear)",
    definition:
      "Measurement and analysis of the energy distribution of radiation (gamma, alpha, beta, neutron). Alpha spectrometry uses Si surface-barrier detectors (resolution ~20 keV, no matrix, vacuum). Gamma spectrometry uses HPGe or NaI. Identifies nuclides by their characteristic emission energies (nuclear fingerprints from ENSDF/NNDC).",
    category: "Detection",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "pulse-height-spectrum",
      "hpge-detector",
      "nai-scintillator",
    ],
  },
  // ────────────────────────────────────────────────
  // REGULATION
  // ────────────────────────────────────────────────
  {
    id: "iaea",
    term: "IAEA",
    definition:
      "International Atomic Energy Agency — established 1957 by treaty as an autonomous intergovernmental organization under UN auspices. Promotes peaceful nuclear use, maintains safety standards, and operates safeguards to verify nuclear materials are not diverted to weapons. Headquarters: Vienna. Budget ~€550 million (2024). Director General: Rafael Mariano Grossi.",
    category: "Regulation",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["nrc-regulation", "iaea-safeguards", "ines-scale"],
  },
  {
    id: "nrc-regulation",
    term: "NRC (Nuclear Regulatory Commission)",
    definition:
      "The independent U.S. federal agency (est. 1975, from former AEC) regulating civilian nuclear power plants, fuel facilities, and nuclear material use for safety and security. Key regulations: 10 CFR 50 (reactor licensing), 10 CFR 20 (radiation protection), 10 CFR 72 (dry cask storage), 10 CFR 100 (site criteria).",
    category: "Regulation",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["iaea", "iaea-safeguards", "ines-scale"],
  },
  {
    id: "iaea-safeguards",
    term: "IAEA safeguards",
    definition:
      "A system of verification measures (inspections, monitoring, material accounting) confirming that nuclear material is not diverted to weapons use. Based on Comprehensive Safeguards Agreements (INFCIRC/153) and the Additional Protocol (INFCIRC/540). ~190 states have safeguards agreements. Verified through declaration analysis, environmental sampling, and on-site inspections.",
    category: "Regulation",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["iaea", "additional-protocol", "heu"],
  },
  {
    id: "additional-protocol",
    term: "Additional Protocol (IAEA)",
    definition:
      "IAEA document INFCIRC/540 — a voluntary agreement that significantly strengthens safeguards verification by requiring states to declare all nuclear activities (including R&D, mining, fuel fabrication). Allows the IAEA to conduct short-notice inspections at any facility. In force for ~140 states as of 2024.",
    category: "Regulation",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["iaea-safeguards", "iaea"],
  },
  {
    id: "wano",
    term: "WANO (World Association of Nuclear Operators)",
    definition:
      "A non-governmental association of all nuclear power plant operators worldwide (established 1989 after Chernobyl). Promotes operational safety through peer reviews, benchmarking, and information exchange. WANO peer reviews assess plant performance against international best practices; hosting is now expected of all member plants.",
    category: "Regulation",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["safety-culture", "iaea"],
  },
  // ────────────────────────────────────────────────
  // APPLICATIONS
  // ────────────────────────────────────────────────
  {
    id: "nuclear-medicine",
    term: "Nuclear medicine",
    definition:
      "A medical specialty using open-source radioactive isotopes (radiopharmaceuticals) for diagnosis and therapy. Uses ~40 million procedures/year globally. Diagnostic: PET (F-18, Cu-64), SPECT (Tc-99m, I-123). Therapeutic: I-131 thyroid ablation, Lu-177-PSMA prostate cancer, Ra-223 bone metastases, Y-90 liver embolization.",
    category: "Applications",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "pet-scan",
      "spect",
      "radiopharmaceutical",
      "tc-99m",
      "brachytherapy",
    ],
  },
  {
    id: "pet-scan",
    term: "PET (positron emission tomography)",
    definition:
      "Nuclear medicine imaging using a positron-emitting radiotracer (most commonly ¹⁸F-FDG). The positron annihilates with an electron producing two 511-keV gamma rays detected in coincidence, enabling 3D reconstruction of metabolic activity. Widely used in oncology staging, cardiac viability, and neurological disorders.",
    category: "Applications",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["nuclear-medicine", "spect", "beta-decay"],
  },
  {
    id: "spect",
    term: "SPECT (single-photon emission CT)",
    definition:
      "3D nuclear medicine imaging using gamma-emitting tracers (Tc-99m, I-123, Tl-201). A rotating gamma camera acquires projections. Lower sensitivity than PET but lower cost and wider tracer availability. Used for myocardial perfusion, bone scintigraphy, thyroid imaging. SPECT/CT combines functional and anatomical data.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["nuclear-medicine", "pet-scan", "tc-99m"],
  },
  {
    id: "tc-99m",
    term: "Tc-99m",
    definition:
      "Technetium-99m — the workhorse diagnostic radionuclide in nuclear medicine. T½ = 6.01 h (suitable for same-day imaging). Emits a single 140-keV gamma (ideal for SPECT detection). Produced from Mo-99 → Tc-99m generators ('moly cows'). ~80% of all nuclear medicine procedures use Tc-99m (~30 million/yr globally). Mo-99 produced by reactor irradiation of U-235 targets.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "nuclear-medicine",
      "spect",
      "isomer-nuclear",
      "medical-isotope",
    ],
  },
  {
    id: "radiopharmaceutical",
    term: "Radiopharmaceutical",
    definition:
      "A radioactive drug used in nuclear medicine. Combines a radionuclide (for detection/therapy) with a biological carrier molecule targeting specific tissue. Examples: ¹⁸F-FDG (glucose analogue for PET oncology), ¹⁷⁷Lu-DOTATATE (neuroendocrine tumor therapy), ²²³Ra-dichloride (bone metastases). Must satisfy both radiopharmaceutical and pharmaceutical regulatory requirements.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["nuclear-medicine", "pet-scan", "therapeutic-isotope"],
  },
  {
    id: "brachytherapy",
    term: "Brachytherapy",
    definition:
      "Internal radiation therapy placing sealed radioactive sources (seeds, wires, catheters) directly into or adjacent to a tumor. Short-range irradiation destroys tumor cells while minimizing dose to surrounding tissue. Low-dose-rate (LDR): I-125, Pd-103 seeds in prostate cancer. High-dose-rate (HDR): Ir-192 for gynecological/breast/skin cancers.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["nuclear-medicine", "dose", "radiopharmaceutical"],
  },
  {
    id: "therapeutic-isotope",
    term: "Therapeutic isotope",
    definition:
      "A radionuclide used in targeted radiotherapy based on its decay properties. Key examples: Lu-177 (β⁻, T½=6.6d, Auger + gamma; PSMA-617 prostate therapy), Y-90 (β⁻, T½=2.7d; liver radioembolization), Ra-223 (α, T½=11.4d; bone metastases), I-131 (β⁻, T½=8d; thyroid cancer). FDA approved Lu-177-PSMA-617 (Pluvicto®) in March 2022.",
    category: "Applications",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["brachytherapy", "radiopharmaceutical", "nuclear-medicine"],
  },
  {
    id: "cyclotron",
    term: "Cyclotron",
    definition:
      "A circular particle accelerator using alternating electric fields and a static magnetic field to accelerate charged particles in a spiral path. Produces short-lived positron-emitting nuclides for PET (¹⁸F, ¹¹C, ¹³N, ¹⁵O) at hospital-based medical cyclotrons (11–30 MeV). Also produces Tl-201, I-123, Ga-67 for SPECT and research radionuclides.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["pet-scan", "nuclear-medicine", "medical-isotope"],
  },
  {
    id: "medical-isotope",
    term: "Medical isotope",
    definition:
      "A radionuclide produced for diagnostic or therapeutic medical use. Production routes: reactor irradiation (Mo-99, I-131, Lu-177, Ir-192); cyclotron (F-18, Ga-68, Cu-64, Tl-201); alpha generators (Ac-225 → Bi-213). Supply security is a global concern: Mo-99 supply chain disruptions (2009–2010) highlighted vulnerability of reactor-dependent isotope production.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["tc-99m", "cyclotron", "nuclear-medicine"],
  },
  {
    id: "food-irradiation",
    term: "Food irradiation",
    definition:
      "Application of ionizing radiation (gamma from Co-60/Cs-137, X-rays, or electron beams) to food to eliminate pathogens, extend shelf life, and inhibit sprouting. Approved by WHO, IAEA, and FAO as safe. Does not make food radioactive. Used in ~50 countries for products including spices (up to 30 kGy), fresh produce (1 kGy), and meat (4.5 kGy). Irradiated food labeled with the 'radura' symbol.",
    category: "Applications",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["dose", "ionizing-radiation"],
  },
  {
    id: "industrial-radiography",
    term: "Industrial radiography",
    definition:
      "Non-destructive testing using penetrating radiation (gamma from Ir-192, Se-75, Co-60; or X-rays) to inspect welds, castings, and structures for internal defects. Ir-192 (T½=73.8d) is the most used industrial source (energy 0.296–0.612 MeV). Governed by strict safety regulations due to numerous historical exposure accidents (high-activity portable sources).",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["ionizing-radiation", "dose"],
  },
  {
    id: "neutron-activation-analysis",
    term: "Neutron activation analysis (NAA)",
    definition:
      "An analytical technique for elemental composition: a sample is irradiated with neutrons (in a reactor or via ²⁵²Cf), producing radioactive isotopes; the resulting gamma spectrum identifies elements with ppm-to-ppb sensitivity. Non-destructive INAA or destructive RNAA. Used in archaeology, environmental monitoring, forensics, and semiconductor manufacturing.",
    category: "Applications",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["neutron-flux", "spectrometry", "gamma-radiation"],
  },
  {
    id: "tracer-technique",
    term: "Tracer technique",
    definition:
      "Using radioactive (or stable) isotopes as tracers to follow the movement of substances through physical, chemical, or biological systems. Environmental applications: ¹³⁷Cs fallout as a sediment dating chronometer; ³H/³He groundwater age; ²²⁶Ra in ocean circulation. Industrial: flow measurement, leak detection. Biological: ¹⁴C in metabolic studies.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["radioactivity", "nuclear-medicine"],
  },
  // ────────────────────────────────────────────────
  // HISTORY
  // ────────────────────────────────────────────────
  {
    id: "manhattan-project",
    term: "Manhattan Project",
    definition:
      "The U.S.-led secret research and development program (1942–1946) that produced the first nuclear weapons. Led by Maj. Gen. Leslie Groves with scientific leadership by J. Robert Oppenheimer at Los Alamos. Employed ~130,000 people at multiple secret sites (Oak Ridge, Hanford, Los Alamos). The first nuclear test was Trinity (16 July 1945, New Mexico), followed by the bombings of Hiroshima and Nagasaki in August 1945.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "oppenheimer",
      "trinity-test",
      "chicago-pile-1",
      "atoms-for-peace",
    ],
  },
  {
    id: "chicago-pile-1",
    term: "Chicago Pile-1",
    definition:
      "The world's first artificial nuclear reactor, built under Stagg Field at the University of Chicago. Achieved first criticality on 2 December 1942, under the scientific direction of Enrico Fermi. The reactor consisted of 40,000 kg of uranium and uranium oxide in a graphite moderator — no cooling system or radiation shielding. It demonstrated the feasibility of a controlled chain reaction, enabling the Manhattan Project.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["manhattan-project", "criticality", "fermi", "reactor"],
  },
  {
    id: "oppenheimer",
    term: "J. Robert Oppenheimer",
    definition:
      "American theoretical physicist (1904–1967) who served as scientific director of the Manhattan Project at Los Alamos (1943–1945). 'Father of the atomic bomb.' After the war, he chaired the Atomic Energy Commission's General Advisory Committee and opposed development of the hydrogen bomb. His security clearance was revoked in 1954 during the McCarthy era — a decision formally reversed by the U.S. government in December 2022.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["manhattan-project", "trinity-test"],
  },
  {
    id: "trinity-test",
    term: "Trinity test",
    definition:
      "The first nuclear weapon detonation, conducted by the U.S. Army at Jornada del Muerto desert, New Mexico, at 5:29 AM on 16 July 1945. Yield: ~21 kilotons TNT equivalent. The plutonium implosion device ('The Gadget') used the same design as the 'Fat Man' bomb dropped on Nagasaki. Oppenheimer's recollection: 'Now I am become Death, the destroyer of worlds.'",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["manhattan-project", "oppenheimer"],
  },
  {
    id: "obninsk-reactor",
    term: "Obninsk reactor (AM-1)",
    definition:
      "The world's first nuclear power plant to generate electricity for a power grid (5 MWe), connected on 27 June 1954 in Obninsk, USSR. A graphite-moderated, water-cooled design (predecessor to RBMK). It demonstrated the peaceful use of nuclear energy, a milestone in nuclear history. Operated until 2002.",
    category: "History",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["reactor", "atoms-for-peace"],
  },
  {
    id: "atoms-for-peace",
    term: "Atoms for Peace",
    definition:
      "President Eisenhower's speech to the UN General Assembly on 8 December 1953, proposing international sharing of nuclear materials and expertise for peaceful purposes. Led to the creation of the IAEA (1957) and bilateral agreements transferring research reactors and nuclear technology to many countries. Accelerated global nuclear power programs and nuclear medicine.",
    category: "History",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["iaea", "manhattan-project", "nuclear-medicine"],
  },
  {
    id: "npt",
    term: "Nuclear Non-Proliferation Treaty (NPT)",
    definition:
      "An international treaty (signed 1968, in force 1970) with three pillars: non-proliferation (non-nuclear states pledge not to acquire weapons), disarmament (nuclear weapon states pledge to pursue disarmament), and peaceful use (all states have the right to peaceful nuclear energy). 191 state parties. India, Pakistan, Israel never joined; North Korea withdrew in 2003.",
    category: "Regulation",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["iaea", "iaea-safeguards", "atoms-for-peace"],
  },
  {
    id: "nuclear-test-ban",
    term: "Nuclear Test Ban Treaty",
    definition:
      "The Partial Test Ban Treaty (PTBT, 1963) banned nuclear tests in atmosphere, underwater, and outer space. The Comprehensive Nuclear-Test-Ban Treaty (CTBT, 1996) bans all nuclear explosions; 186 signatories but not yet in force (key states including USA, China, India have not ratified). Monitoring by International Monitoring System (IMS) using seismic, hydroacoustic, infrasound, and radionuclide stations.",
    category: "Regulation",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["npt", "iaea"],
  },
  // ────────────────────────────────────────────────
  // RADIATION & BIOLOGY
  // ────────────────────────────────────────────────
  {
    id: "ionizing-radiation",
    term: "Ionizing radiation",
    definition:
      "Radiation with sufficient energy (>~10 eV) to remove electrons from atoms, creating ions. Includes directly ionizing (charged particles: alpha, beta, protons) and indirectly ionizing (neutral: gamma, X-rays, neutrons). Can break chemical bonds, including DNA. Biological effect depends on absorbed dose, radiation type (LET), and tissue sensitivity.",
    category: "Radiation & Biology",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: [
      "non-ionizing-radiation",
      "dose",
      "let",
      "alpha-decay",
      "gamma-radiation",
    ],
  },
  {
    id: "becquerel-unit",
    term: "Becquerel (Bq)",
    definition:
      "The SI unit of radioactivity: 1 Bq = 1 nuclear disintegration per second. Named after Henri Becquerel (1852–1908). Common multiples: kBq (10³), MBq (10⁶), GBq (10⁹), TBq (10¹²). 1 curie = 3.7×10¹⁰ Bq. A human body contains ~4,400 Bq of K-40 and ~3,000 Bq of C-14.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["curie", "activity", "radioactivity"],
  },
  {
    id: "gray-unit",
    term: "Gray (Gy)",
    definition:
      "The SI unit of absorbed radiation dose: 1 Gy = 1 J/kg. Measures physical energy deposited in matter per unit mass, regardless of radiation type. Whole-body doses: < 0.25 Gy: no acute effects; 2–6 Gy: acute radiation syndrome; > 6 Gy without treatment: likely fatal. Replaced the rad (1 rad = 0.01 Gy).",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["sievert-unit", "dose", "rad"],
  },
  {
    id: "sievert-unit",
    term: "Sievert (Sv)",
    definition:
      "The SI unit of effective dose (biologically weighted dose). H = D × w_R, where D is absorbed dose (Gy) and w_R is the radiation weighting factor (1 for gamma/beta, 20 for alpha, 5–20 for neutrons depending on energy). Tissue weighting factors (w_T) further account for organ sensitivity. Global average effective dose from natural background: ~2.4 mSv/yr.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["gray-unit", "dose", "rem", "let"],
    equation: "H = D \\times w_R",
  },
  {
    id: "effective-dose",
    term: "Effective dose",
    definition:
      "The sum of equivalent doses to all organs and tissues, weighted by tissue weighting factors (w_T, from ICRP 103): E = Σ_T w_T × H_T. Accounts for both the type of radiation and the radiosensitivity of exposed tissues. Lung: w_T=0.12; breast: 0.12; bone marrow: 0.12; gonads: 0.08. Expressed in sieverts. Used for radiation protection comparisons, not individual medical risk assessment.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "sievert-unit",
      "tissue-weighting-factor",
      "radiation-protection",
    ],
    equation: "E = \\sum_T w_T H_T",
  },
  {
    id: "tissue-weighting-factor",
    term: "Tissue weighting factor (w_T)",
    definition:
      "Dimensionless factors from ICRP 103 (2007) representing each organ's relative contribution to stochastic radiation risk when the whole body is uniformly irradiated. Values: gonads 0.08, colon/lung/stomach/breast/bone marrow 0.12 each, bladder/esophagus/liver/thyroid 0.04 each, bone surface/brain/salivary glands/skin 0.01 each. Sum = 1.0.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["effective-dose", "sievert-unit"],
  },
  {
    id: "radiation-weighting-factor",
    term: "Radiation weighting factor (w_R)",
    definition:
      "A dimensionless factor reflecting the relative biological damage per unit absorbed dose for different radiation types (ICRP 103). Gamma/X-ray/beta: w_R = 1. Protons (>2 MeV): 2. Alpha, fission fragments, heavy ions: 20. Neutrons: energy-dependent, 2.5–20 (peak at 1 MeV). H_T = D_T × w_R.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["effective-dose", "sievert-unit", "rbe"],
  },
  {
    id: "deterministic-effect",
    term: "Deterministic effect",
    definition:
      "A radiation health effect that occurs with certainty above a threshold dose, with severity proportional to dose. Examples: acute radiation syndrome (ARS, threshold ~1 Sv whole-body), skin erythema (~3 Gy), cataracts (~0.5 Gy to lens). Medical uses of high-dose radiation (radiotherapy) exploit deterministic effects to kill tumors.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["stochastic-effect", "dose", "gray-unit"],
  },
  {
    id: "stochastic-effect",
    term: "Stochastic effect",
    definition:
      "A radiation health effect with no dose threshold — probability increases with dose but severity is independent of dose. Cancer induction and heritable effects are stochastic. The LNT model assumes linearity with no threshold. UNSCEAR estimates ~5% lifetime cancer risk per Sv of effective dose (whole body, low LET).",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["deterministic-effect", "lnt-model", "effective-dose"],
  },
  {
    id: "lnt-model",
    term: "Linear no-threshold (LNT) model",
    definition:
      "The radiation protection assumption that cancer risk is directly proportional to effective dose with no threshold — even very low doses carry some risk proportional to dose. Supported by high-dose epidemiological data (A-bomb survivors, UNSCEAR 2006). Contested at low doses: some data suggest threshold or hormetic responses, but LNT is used conservatively by ICRP and NRC for regulation.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["stochastic-effect", "hormesis-radiation", "alara"],
  },
  {
    id: "hormesis-radiation",
    term: "Hormesis (radiation)",
    definition:
      "A hypothesis that low doses of ionizing radiation (< ~100 mSv) might be beneficial, stimulating adaptive protective mechanisms (DNA repair, immune function). Evidence from in vitro and animal studies; epidemiological evidence in humans remains controversial and contested. Not accepted by ICRP or UNSCEAR as a basis for radiation protection standards (LNT model prevails).",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["lnt-model", "stochastic-effect"],
  },
  {
    id: "background-radiation",
    term: "Natural background radiation",
    definition:
      "Radiation from natural sources: (1) cosmic rays (~0.39 mSv/yr at sea level, higher at altitude); (2) terrestrial (uranium/thorium series in rocks, soil: ~0.48 mSv/yr); (3) internal (K-40, C-14 in body: ~0.29 mSv/yr); (4) radon (²²²Rn from U decay in soil/buildings: ~1.26 mSv/yr, highest component). Global average total: ~2.4 mSv/yr (UNSCEAR 2008).",
    category: "Radiation & Biology",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["dose", "dose-rate", "radon"],
  },
  {
    id: "radon",
    term: "Radon",
    definition:
      "Radon-222, a naturally occurring radioactive noble gas (T½=3.82 d, alpha emitter) produced in the ²³⁸U decay chain from radium-226. The leading cause of lung cancer after cigarette smoking (~21,000 deaths/year in the USA, EPA). Accumulates in poorly ventilated buildings over uranium-bearing soil. WHO action level: 100 Bq/m³.",
    category: "Isotopes & Decay",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["background-radiation", "alpha-decay", "decay-chain"],
  },
  {
    id: "occupational-exposure",
    term: "Occupational exposure limit",
    definition:
      "Dose limits for radiation workers: ICRP 103 recommends 20 mSv/yr effective dose (averaged over 5 years, max 50 mSv in any single year); 500 mSv/yr to hands/feet; 150 mSv/yr to lens of eye (ICRP 118, 2011). U.S. NRC (10 CFR 20): 50 mSv/yr (5 rem/yr) total effective dose equivalent. Nuclear workers average ~1–3 mSv/yr — less than some high-altitude pilots.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["effective-dose", "alara", "sievert-unit"],
  },
  {
    id: "radiation-protection",
    term: "Radiation protection",
    definition:
      "The science and practice of minimizing harmful effects of ionizing radiation on humans and the environment. The three core principles (ICRP): (1) Justification — no practice unless benefit > harm. (2) Optimization (ALARA) — minimize doses. (3) Limitation — individual dose limits. The three practical means of protection: time, distance (inverse-square law), shielding.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "alara",
      "effective-dose",
      "sievert-unit",
      "deterministic-effect",
    ],
  },
  {
    id: "quality-factor",
    term: "Quality factor (Q)",
    definition:
      "An obsolescent term (replaced by radiation weighting factor w_R in ICRP 60, 1990) expressing the relative biological effectiveness of different radiation types for protection purposes. Q values: X-ray/gamma/beta = 1; neutrons = 5–20; alpha = 20. Used in older dose equivalent calculations: H = D × Q.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["radiation-weighting-factor", "sievert-unit", "dose"],
  },
  {
    id: "internal-dosimetry",
    term: "Internal dosimetry",
    definition:
      "Assessment of radiation dose from radionuclides deposited within the body. Dose depends on activity, radionuclide half-life, biological half-life (metabolic clearance), radiation type, and target organ. Calculated using ICRP biokinetic models. Important for nuclear medicine patients (e.g., I-131 thyroid dose) and nuclear workers following accidental intake.",
    category: "Applications",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "effective-dose",
      "radiopharmaceutical",
      "occupational-exposure",
    ],
  },
  {
    id: "fluence",
    term: "Fluence",
    definition:
      "The time-integrated particle flux: Φ_t = ∫Φ dt, with units n/cm² (for neutrons) or photons/cm². Used in reactor physics to describe total neutron exposure of materials (important for embrittlement of reactor pressure vessels) and in radiation therapy physics (photon fluence). Reactor pressure vessel fluence limit: ~10¹⁹ n/cm² (fast, E>1 MeV).",
    category: "Applications",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["neutron-flux", "dose"],
  },
  // ────────────────────────────────────────────────
  // PHYSICS (additional)
  // ────────────────────────────────────────────────
  {
    id: "nuclear-density",
    term: "Nuclear density",
    definition:
      "The approximately constant density of nuclear matter: ρ₀ ≈ 2.3×10¹⁷ kg/m³ (or ~0.17 nucleons/fm³). This saturation density arises because the nuclear force is repulsive at very short range. It is roughly the same for all nuclei (light or heavy), a consequence of the A^(1/3) scaling of the nuclear radius. Nuclear matter is ~10¹⁴ times denser than ordinary solid matter.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "nucleus",
      "nuclear-radius",
      "nuclear-force",
      "binding-energy",
    ],
  },
  {
    id: "nuclear-density-functional",
    term: "Nuclear density functional theory (DFT)",
    definition:
      "A self-consistent mean-field approach using an energy density functional (EDF) to calculate ground-state and excited-state properties of nuclei across the entire nuclear chart. Modern EDFs (Skyrme, Gogny, relativistic mean-field) reproduce nuclear masses, radii, and deformations for thousands of nuclides. Essential for predicting properties of exotic and superheavy nuclei inaccessible to experiment.",
    category: "Physics",
    audience: "professional",
    audienceLevel: "professional",
    relatedTerms: ["shell-model", "binding-energy", "liquid-drop-model"],
  },
  // ────────────────────────────────────────────────
  // REACTOR ENGINEERING (additional)
  // ────────────────────────────────────────────────
  {
    id: "neutron-economy",
    term: "Neutron economy",
    definition:
      "The balance sheet of neutron production and loss in a reactor. Every fission produces ~2.43 neutrons (U-235 thermal); one must sustain the chain reaction; the rest are either absorbed usefully (breeding, activation), absorbed parasitically (structural materials, moderator), or leak. Optimizing neutron economy maximizes fuel utilization and minimizes parasitic absorption.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "keff",
      "kinf",
      "neutron-flux",
      "moderator",
      "breeding-ratio",
    ],
  },
  {
    id: "neutron-lifetime",
    term: "Neutron lifetime",
    definition:
      "The mean time a neutron survives in a reactor before being absorbed or leaking: ℓ = 1/(Σ_a v + leakage term). In a thermal LWR, the prompt neutron lifetime is ~10⁻⁵ s (10 μs); delayed neutrons extend the effective lifetime to ~0.1 s. Distinct from the free-neutron β-decay mean lifetime (881.5 s) which is irrelevant in a reactor where neutrons are captured first.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "neutron-generation-time",
      "delayed-neutron",
      "reactor-period",
    ],
  },
  {
    id: "prompt-neutron",
    term: "Prompt neutron",
    definition:
      "A neutron emitted within ~10⁻¹⁴ s of a fission event, representing ~99.35% of all fission neutrons for U-235. Average energy ~2 MeV (fission spectrum, Watt distribution). If the reactor were critical on prompt neutrons alone (prompt criticality), the period would be ~10⁻⁵ s — far too fast for control. The delayed neutron fraction (β_eff) keeps the operating regime in 'delayed criticality' where control is feasible.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "delayed-neutron",
      "delayed-neutron-fraction",
      "reactor-period",
      "prompt-jump",
    ],
  },
  {
    id: "thermal-spectrum",
    term: "Thermal spectrum",
    definition:
      "The energy distribution of neutrons in a thermal reactor, which approximates a Maxwell-Boltzmann distribution peaked at ~0.025 eV (most probable at room temperature) modified by a 1/E epithermal tail. Most fissions in LWRs occur at thermal energies where fissile cross-sections are largest. The spectrum hardens (shifts to higher energies) with increasing fuel temperature (Doppler broadening) and coolant voiding.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "thermal-neutron",
      "moderator",
      "cross-section-nuclear",
      "fast-neutron",
    ],
  },
  {
    id: "thermal-hydraulic-loop",
    term: "Thermal-hydraulic loop",
    definition:
      "The coupled system of fluid flow and heat transfer within a reactor, describing how heat generated in the fuel is carried by coolant to the steam generator or turbine. Analyses include single-phase (PWR primary loop) and two-phase flow (BWR, LOCA scenarios). Codes such as RELAP5, TRACE, and CATHARE model the thermal-hydraulic behavior for safety analysis. Key parameters: coolant flow rate, inlet/outlet temperatures, pressure drop, critical heat flux (CHF).",
    category: "Reactor Engineering",
    audience: "professional",
    audienceLevel: "professional",
    relatedTerms: ["coolant", "pwr", "bwr", "loca", "critical-heat-flux"],
  },
  {
    id: "critical-heat-flux",
    term: "Critical heat flux (CHF)",
    definition:
      "The maximum heat flux that can be transferred from a heated surface to a boiling fluid before a vapor film forms (departure from nucleate boiling, DNB) causing a dramatic increase in surface temperature. In PWRs, DNB must be avoided in all normal and accident conditions. The departure from nucleate boiling ratio (DNBR) must exceed ~1.3 (NRC limit) at all points in the core.",
    category: "Reactor Engineering",
    audience: "professional",
    audienceLevel: "professional",
    relatedTerms: ["thermal-hydraulic-loop", "peaking-factor", "loca"],
  },
  {
    id: "neutron-moderation",
    term: "Neutron moderation (slowing-down)",
    definition:
      "The process of reducing fast fission neutron energies (~2 MeV) to thermal energies (~0.025 eV) through elastic collisions with light nuclei. Energy transferred per collision: ΔE/E = (1 − α) where α = ((A−1)/(A+1))². H (A=1) can thermalize a neutron in ~18 collisions; C (A=12) requires ~114. The logarithmic energy decrement ξ = 1 + (α·ln α)/(1−α) quantifies moderating efficiency.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["moderator", "thermal-neutron", "fast-neutron", "lethargy"],
    equation: "\\xi = 1 + \\frac{\\alpha \\ln\\alpha}{1-\\alpha}",
  },
  {
    id: "four-factor-formula",
    term: "Four-factor formula",
    definition:
      "The formula expressing k∞ = η × ε × p × f for an infinite homogeneous thermal reactor: η = neutrons produced per thermal absorption in fuel; ε = fast fission factor (extra fissions from fast neutrons, ~1.03–1.08); p = resonance escape probability (fraction avoiding capture in resonance region, ~0.75–0.90); f = thermal utilization (fraction of thermal absorptions occurring in fuel, ~0.7–0.9).",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["kinf", "keff", "moderator", "resonance-nuclear"],
    equation: "k_\\infty = \\eta \\varepsilon p f",
  },
  {
    id: "breeding-ratio",
    term: "Breeding ratio (BR)",
    definition:
      "The ratio of fissile material produced to fissile material consumed in a reactor. BR > 1 ('breeder') means more fissile fuel is produced than consumed, from the fertile blanket (U-238 → Pu-239 or Th-232 → U-233). Fast breeder reactors (FBRs) can achieve BR ~1.1–1.3. LWRs have a conversion ratio ~0.6 (less fissile material produced than consumed).",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fertile", "fissile", "fast-reactor", "thorium-fuel-cycle"],
  },
  {
    id: "doppler-broadening",
    term: "Doppler broadening",
    definition:
      "The thermal motion of fuel atoms at elevated temperature broadens resonance peaks in the neutron absorption cross-section, increasing the effective resonance integral and resonance capture probability. This produces a strong negative prompt temperature coefficient (Doppler coefficient, ~−2 to −4 pcm/°C in LWRs), providing immediate negative feedback when fuel temperature rises — a key inherent safety feature.",
    category: "Reactor Engineering",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "resonance-nuclear",
      "moderator-temperature-coefficient",
      "passive-safety",
    ],
  },
  {
    id: "decay-heat",
    term: "Decay heat",
    definition:
      "The heat generated in a reactor after shutdown from radioactive decay of fission products. Initially ~7% of full power, decaying approximately as P(t) ≈ 0.066 × P₀ × t⁻⁰·² (ANS-5.1 standard). After 1 hour, ~1.5% of full power; after 1 day, ~0.4%; after 1 week, ~0.2%. Must be removed continuously to prevent fuel damage — failure to do so caused fuel melt at Three Mile Island and Fukushima.",
    category: "Reactor Engineering",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["scram", "eccs", "station-blackout", "passive-safety"],
    equation: "P(t) \\approx 0.066 P_0 t^{-0.2}",
  },
  // ────────────────────────────────────────────────
  // FUEL CYCLE (additional)
  // ────────────────────────────────────────────────
  {
    id: "once-through-fuel-cycle",
    term: "Once-through fuel cycle",
    definition:
      "A nuclear fuel cycle strategy in which spent fuel is treated as waste and stored directly without reprocessing or recycling. Used in the USA, Canada, Sweden, Finland. Simpler and cheaper operationally but forgoes recovery of residual U-235 and Pu-239. Requires a permanent geological repository for spent fuel disposal. Contrasted with the closed fuel cycle (reprocessing) used in France, Russia, Japan.",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "spent-nuclear-fuel",
      "reprocessing",
      "dry-cask-storage",
      "high-level-waste",
    ],
  },
  {
    id: "nuclear-fuel-fabrication",
    term: "Nuclear fuel fabrication",
    definition:
      "The manufacturing process converting enriched uranium hexafluoride (UF₆) to uranium dioxide (UO₂) pellets, which are loaded into zircaloy tubes to form fuel rods, then bundled into fuel assemblies. Pellets are sintered at ~1700°C to a density of ~95% theoretical (10.4 g/cm³). Dimensional tolerances are sub-millimeter; quality control is stringent to prevent cladding failure in-service.",
    category: "Fuel Cycle",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fuel-assembly", "enrichment-uranium", "zircaloy"],
  },
  {
    id: "geological-repository",
    term: "Deep geological repository (DGR)",
    definition:
      "A permanent underground facility for disposing of high-level radioactive waste at depths of 300–1000 m in stable geological formations (granite, clay, salt). The multi-barrier system includes the waste form (glass or ceramic), metal canister, engineered backfill (bentonite clay), and the geosphere. Finland's Onkalo facility is the world's first operational DGR (began receiving fuel 2025). Sweden's is under construction.",
    category: "Fuel Cycle",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["high-level-waste", "spent-nuclear-fuel", "transuranics"],
  },
  // ────────────────────────────────────────────────
  // SAFETY (additional)
  // ────────────────────────────────────────────────
  {
    id: "confinement-barriers",
    term: "Confinement (multiple barriers)",
    definition:
      "The physical barriers preventing release of radioactive material, forming the core of defense in depth: (1) the ceramic UO₂ fuel matrix retains ~95% of fission products; (2) Zircaloy fuel rod cladding; (3) the primary coolant pressure boundary (reactor vessel, piping); (4) the reactor building/containment structure (reinforced concrete, ~1.5 m thick). Each barrier independently limits release.",
    category: "Safety",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["defense-in-depth", "loca", "eccs", "zircaloy"],
  },
  {
    id: "deterministic-safety-analysis",
    term: "Deterministic safety analysis (DSA)",
    definition:
      "A prescriptive approach to nuclear safety where a defined set of 'design basis accidents' (DBAs) and 'design basis events' (DBEs) must be shown to meet acceptance criteria (e.g., PCT < 1204°C). Based on conservative assumptions and bounding calculations. Complemented by probabilistic risk assessment (PRA). Required by IAEA GSR Part 4 and national regulatory frameworks.",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["pra", "loca", "defense-in-depth", "eccs"],
  },
  {
    id: "single-failure-criterion",
    term: "Single failure criterion",
    definition:
      "A nuclear safety design requirement that all safety systems must function correctly even if any single active component fails. Applied to ECCS, emergency power, containment isolation. Requires redundancy (typically N+1 or N+2 trains). Defined in IAEA NS-R-1 and U.S. NRC General Design Criterion 17. Forces designers to provide multiple independent, diverse safety trains.",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["defense-in-depth", "eccs", "redundancy"],
  },
  {
    id: "periodic-safety-review",
    term: "Periodic safety review (PSR)",
    definition:
      "A comprehensive assessment of nuclear plant safety conducted every 10 years to evaluate the cumulative effect of aging, modifications, and new knowledge against current safety standards. Covers 14 safety factors (IAEA SSG-25): design, actual condition, equipment qualification, aging management, deterministic safety analysis, probabilistic safety assessment, radiation protection, emergency preparedness, environmental impact. Required by IAEA and most national regulators as a condition of continued operation.",
    category: "Regulation",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "iaea",
      "nrc-regulation",
      "deterministic-safety-analysis",
      "pra",
    ],
  },
  {
    id: "severe-accident-management",
    term: "Severe accident management (SAM)",
    definition:
      "Measures to mitigate the consequences of accidents beyond the design basis, when core damage is occurring or has occurred. Includes hydrogen management (recombiners, igniters), core cooling restoration, containment protection, and filtered containment venting. Post-Fukushima, all operating reactors worldwide were required to implement enhanced SAM guidelines (SAMGs) and physical modifications.",
    category: "Safety",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: [
      "defense-in-depth",
      "fukushima",
      "containment",
      "station-blackout",
    ],
  },
  // ────────────────────────────────────────────────
  // REGULATION (additional)
  // ────────────────────────────────────────────────
  {
    id: "infcirc225",
    term: "INFCIRC/225",
    definition:
      "IAEA document 'The Physical Protection of Nuclear Material and Nuclear Facilities,' now in its fifth revision (Rev.5). Sets international recommendations for physical protection of nuclear materials and facilities: categorization of nuclear materials by attractiveness for weapons use, performance objectives, and requirements for nuclear security systems. Forms the basis for most national physical security regulations.",
    category: "Regulation",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["iaea-safeguards", "heu", "additional-protocol"],
  },
  {
    id: "operating-license",
    term: "Operating license",
    definition:
      "The regulatory authorization permitting a nuclear power plant to operate at specified power levels and conditions. In the USA, the NRC issues a Combined License (COL) under 10 CFR 52, covering both construction and operation. Typical initial license term: 40 years, with 20-year renewals permitted after license renewal review (aging management review required). License renewal requires updated safety analysis and aging management programs.",
    category: "Regulation",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["nrc-regulation", "periodic-safety-review", "iaea"],
  },
  // ────────────────────────────────────────────────
  // HISTORY (additional)
  // ────────────────────────────────────────────────
  {
    id: "nuclear-navy",
    term: "Nuclear Navy (USS Nautilus)",
    definition:
      "The U.S. nuclear submarine program pioneered by Admiral Hyman Rickover. USS Nautilus (SSN-571) launched in 1954 as the world's first nuclear-powered submarine, achieving 'underway on nuclear power' in January 1955. The nuclear propulsion program (PWR-based S2W reactor) proved the practicality of naval nuclear power and directly influenced the design of civilian PWRs. The U.S. nuclear fleet has operated ~200 reactors over 60+ years without a reactor accident.",
    category: "History",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["pwr", "reactor", "atoms-for-peace"],
  },
  {
    id: "tokamak",
    term: "Tokamak",
    definition:
      "A toroidal (donut-shaped) magnetic confinement device for fusion plasma, using a combination of toroidal and poloidal magnetic fields to confine hot plasma (~150 million °C). The most developed fusion confinement concept. Major tokamaks: JET (UK, world record D-T fusion energy: 59 MJ in 2022), ITER (35-nation project under construction in France, targeting Q≥10 by ~2035), KSTAR (South Korea), EAST (China). Commercial fusion remains ~decades away.",
    category: "Applications",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["fusion", "lawson-criterion", "plasma"],
  },
  {
    id: "plasma",
    term: "Plasma (fusion)",
    definition:
      "A fully ionized gas at very high temperature (~100–150 million °C for fusion) where electrons are separated from nuclei. The fourth state of matter. Fusion plasma must be simultaneously hot (high ion temperature), dense (sufficient pressure), and confined for sufficient time — quantified by the Lawson criterion. Plasma behavior is governed by magnetohydrodynamics (MHD) and is subject to instabilities (kink, ballooning, ELMs) that challenge confinement.",
    category: "Physics",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["fusion", "lawson-criterion", "tokamak"],
  },
  // ────────────────────────────────────────────────
  // RADIATION & BIOLOGY (additional)
  // ────────────────────────────────────────────────
  {
    id: "absorbed-dose",
    term: "Absorbed dose (Gy)",
    definition:
      "The energy imparted by ionizing radiation per unit mass of a material: D = dε/dm, SI unit: gray (Gy = J/kg). Measures the physical energy deposited regardless of radiation type or biological effect. Dose rate = D/t, in Gy/s or mGy/h. The absorbed dose must be combined with the radiation weighting factor (w_R) to obtain the equivalent dose in sieverts for radiation protection purposes.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "gray-unit",
      "sievert-unit",
      "effective-dose",
      "ionizing-radiation",
    ],
    equation: "D = \\frac{d\\varepsilon}{dm} \\; [\\text{Gy} = \\text{J/kg}]",
  },
  {
    id: "activity",
    term: "Activity (Bq)",
    definition:
      "The rate of radioactive decay of a source: A = λN = −dN/dt, measured in becquerels (Bq = s⁻¹) or curies (Ci). Activity decreases exponentially: A(t) = A₀ e^(−λt). Specific activity = activity per unit mass (Bq/kg); inversely proportional to half-life. Key for calculating dose rates from sources: Ḋ = A × Γ/r², where Γ is the dose-rate constant.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "becquerel-unit",
      "radioactivity",
      "decay-constant",
      "half-life",
    ],
    equation: "A = \\lambda N",
  },
  {
    id: "dose-equivalent",
    term: "Dose equivalent (Sv)",
    definition:
      "The product of absorbed dose and quality factor Q (older ICRP 26 system) or radiation weighting factor w_R (modern ICRP 103 system): H = D × w_R, in sieverts. Accounts for the differing biological effectiveness of radiation types. Operational quantities used in monitoring: ambient dose equivalent H*(10), directional dose equivalent H'(0.07), personal dose equivalent Hp(10).",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "sievert-unit",
      "absorbed-dose",
      "radiation-weighting-factor",
      "effective-dose",
    ],
    equation: "H = D \\times w_R",
  },
  {
    id: "effective-dose-rate",
    term: "Effective dose rate",
    definition:
      "The rate of effective dose accumulation per unit time (μSv/h, mSv/yr). Used in radiation monitoring and protection planning. Typical values: natural background ~0.27 μSv/h (2.4 mSv/yr); chest X-ray ~0.02 mSv; transatlantic flight ~0.06 mSv; nuclear plant worker ~1–3 mSv/yr; occupational limit 20 mSv/yr. Reduces with distance (inverse-square law) and shielding (exponential attenuation).",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "effective-dose",
      "sievert-unit",
      "alara",
      "background-radiation",
    ],
  },
  {
    id: "exposure-unit",
    term: "Exposure (C/kg)",
    definition:
      "A legacy radiation quantity measuring ionization in air by X or gamma rays: X = dQ/dm, in C/kg (SI) or roentgen (R, non-SI: 1 R = 2.58×10⁻⁴ C/kg). Replaced by absorbed dose for modern radiation protection purposes. One roentgen of gamma radiation deposits approximately 0.01 Gy (1 rad) in air and approximately 0.0096 Gy in muscle tissue.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["absorbed-dose", "gray-unit", "ionization-chamber"],
  },
  {
    id: "dna-damage-radiation",
    term: "DNA damage (radiation-induced)",
    definition:
      "Ionizing radiation damages DNA through direct ionization of the DNA molecule and indirect effects via radiolysis of water producing reactive oxygen species (·OH, O₂⁻). Single-strand breaks (SSBs) are readily repaired; double-strand breaks (DSBs) are more lethal if unrepaired or misrepaired. High-LET radiation produces clustered DSBs ('complex lesions') that are more difficult to repair, explaining higher RBE of alpha particles and heavy ions.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["let", "stochastic-effect", "deterministic-effect", "rbe"],
  },
  {
    id: "acute-radiation-syndrome",
    term: "Acute radiation syndrome (ARS)",
    definition:
      "A collection of health effects following whole-body absorbed dose > ~1 Gy over a short time. Syndromes: hematopoietic (1–6 Gy, bone marrow suppression, ~30 days onset); gastrointestinal (6–10 Gy, GI tract failure); cerebrovascular (>20 Gy, rapid incapacitation). Without treatment: LD50/60 (lethal dose for 50% in 60 days) is ~3–4 Gy for humans. Bone marrow transplants can improve survival at 4–8 Gy.",
    category: "Radiation & Biology",
    audience: "advanced",
    audienceLevel: "advanced",
    relatedTerms: ["absorbed-dose", "gray-unit", "deterministic-effect"],
  },
  {
    id: "shielding",
    term: "Radiation shielding",
    definition:
      "Materials placed between a radiation source and an area to attenuate the radiation dose. Photon attenuation: I = I₀ e^(−μx), where μ is the linear attenuation coefficient. Lead (ρ=11.3 g/cm³, high Z) is effective for X and gamma. Water/polyethylene for neutrons (hydrogenous materials for moderation). Concrete combines gamma shielding and neutron moderation. Half-value layer (HVL) = ln2/μ is the thickness reducing intensity by 50%.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: [
      "gamma-radiation",
      "neutron-detector",
      "alara",
      "radiation-protection",
    ],
    equation: "I = I_0 e^{-\\mu x}",
  },
  {
    id: "non-ionizing-radiation",
    term: "Non-ionizing radiation",
    definition:
      "Electromagnetic radiation with insufficient photon energy (<~10 eV) to ionize atoms. Includes UV (3–124 eV, borderline), visible light, infrared, microwave, radio, and ELF/static fields. Does not cause DNA strand breaks directly. UV causes pyrimidine dimers in DNA (sunburn, melanoma at high doses). Contrasted with ionizing radiation (X-rays, gamma, particles) used in nuclear technology.",
    category: "Radiation & Biology",
    audience: "beginner",
    audienceLevel: "beginner",
    relatedTerms: ["ionizing-radiation", "dose", "gamma-radiation"],
  },
  // ────────────────────────────────────────────────
  // DOSIMETRY UNITS (legacy, keeping existing terms)
  // ────────────────────────────────────────────────
  {
    id: "curie",
    term: "Curie",
    definition:
      "An older unit of radioactivity: 1 Ci = 3.7×10¹⁰ disintegrations per second — based on the activity of 1 gram of radium-226. Now superseded by the becquerel (1 Ci = 3.7×10¹⁰ Bq). Still widely used in medical and industrial practice.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["becquerel-unit", "activity", "radioactivity"],
  },
  {
    id: "rad",
    term: "Rad",
    definition:
      "Radiation Absorbed Dose — an older unit: 1 rad = 0.01 Gy = 0.01 J/kg. Still used in some U.S. contexts. 100 rad = 1 Gy.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["gray-unit", "rem"],
  },
  {
    id: "rem",
    term: "Rem",
    definition:
      "Roentgen Equivalent Man — older unit of dose equivalent: 1 rem = 0.01 Sv. Still widely used by the U.S. NRC for regulatory limits (5 rem/yr occupational limit). 100 rem = 1 Sv.",
    category: "Radiation & Biology",
    audience: "intermediate",
    audienceLevel: "intermediate",
    relatedTerms: ["sievert-unit", "gray-unit", "rad"],
  },
];

// Helper: get unique categories
export const glossaryCategories = Array.from(
  new Set(glossaryTerms.map((t) => t.category)),
) as GlossaryCategory[];
