import { d as createLucideIcon, h as create, p as persist } from "./index-BllujZqD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const atomicStructureQuestions = [
  {
    id: "as-01",
    topicId: "atomic-structure",
    question: "What determines the chemical identity (element) of an atom?",
    options: [
      "Number of neutrons",
      "Number of protons",
      "Number of electrons",
      "Atomic mass number"
    ],
    correctIndex: 1,
    explanation: "The atomic number (Z) — the number of protons — uniquely identifies an element. Isotopes of the same element have the same proton count but different neutron counts.",
    audience: "beginner"
  },
  {
    id: "as-02",
    topicId: "atomic-structure",
    question: "Carbon-12 and Carbon-14 are examples of:",
    options: ["Isobars", "Isotones", "Isotopes", "Isomers"],
    correctIndex: 2,
    explanation: "Isotopes are atoms of the same element (same Z) but with different numbers of neutrons (and thus different mass numbers A). Carbon-12 has 6 neutrons; Carbon-14 has 8.",
    audience: "beginner"
  },
  {
    id: "as-03",
    topicId: "atomic-structure",
    question: "The mass number (A) of a nucleus is defined as:",
    options: [
      "Number of protons only",
      "Number of neutrons only",
      "Number of protons + neutrons",
      "Number of electrons + protons"
    ],
    correctIndex: 2,
    explanation: "A = Z + N, where Z is the proton number and N is the neutron number. Together, protons and neutrons are called nucleons.",
    audience: "beginner",
    equation: "A = Z + N"
  },
  {
    id: "as-04",
    topicId: "atomic-structure",
    question: "Two atoms with the same mass number but different atomic numbers are called:",
    options: ["Isotopes", "Isotones", "Isobars", "Mirror nuclei"],
    correctIndex: 2,
    explanation: "Isobars have the same A but different Z (and therefore different N). Example: Argon-40 (Z=18) and Calcium-40 (Z=20) are isobars.",
    audience: "intermediate"
  },
  {
    id: "as-05",
    topicId: "atomic-structure",
    question: "The nuclear radius is approximately given by R = r₀A^(1/3). What does r₀ represent?",
    options: [
      "Bohr radius (~0.53 Å)",
      "Empirical constant ~1.2 fm",
      "Electron charge radius",
      "Planck length"
    ],
    correctIndex: 1,
    explanation: "r₀ ≈ 1.2 fm (femtometers) is the empirical nuclear radius constant. This relation shows that nuclear volume is proportional to the number of nucleons A.",
    audience: "intermediate",
    equation: "R = r_0 A^{1/3}, \\quad r_0 \\approx 1.2 \\text{ fm}"
  },
  {
    id: "as-06",
    topicId: "atomic-structure",
    question: "Which nuclear model introduced the concept of magic numbers?",
    options: [
      "Liquid drop model",
      "Nuclear shell model",
      "Fermi gas model",
      "Collective model"
    ],
    correctIndex: 1,
    explanation: "The nuclear shell model (developed by Maria Goeppert Mayer and J.H.D. Jensen, 1949) explained magic numbers (2, 8, 20, 28, 50, 82, 126) as closed nuclear shells with enhanced stability.",
    audience: "advanced"
  },
  {
    id: "as-07",
    topicId: "atomic-structure",
    question: "Binding energy per nucleon peaks around which element?",
    options: [
      "Hydrogen (A=1)",
      "Iron-56 (A=56)",
      "Uranium-238 (A=238)",
      "Carbon-12 (A=12)"
    ],
    correctIndex: 1,
    explanation: "Iron-56 has the highest binding energy per nucleon (~8.79 MeV/nucleon), making it the most tightly bound nucleus. This is why both fission (heavy nuclei) and fusion (light nuclei) release energy.",
    audience: "intermediate",
    equation: "B/A \\text{ max at } ^{56}\\text{Fe} \\approx 8.79 \\text{ MeV/nucleon}"
  },
  {
    id: "as-08",
    topicId: "atomic-structure",
    question: "The semi-empirical mass formula (Bethe-Weizsäcker) includes a pairing term that:",
    options: [
      "Adds to BE for all nuclei equally",
      "Adds to BE for even-even nuclei, subtracts for odd-odd",
      "Only applies to magic number nuclei",
      "Accounts for nuclear spin"
    ],
    correctIndex: 1,
    explanation: "The pairing term δ is +aₚ/A^(1/2) for even-even nuclei (most stable), 0 for odd-A, and −aₚ/A^(1/2) for odd-odd nuclei (least stable), reflecting the tendency of nucleons to pair up.",
    audience: "advanced"
  },
  {
    id: "as-09",
    topicId: "atomic-structure",
    question: "Approximately how large is a typical atomic nucleus compared to the atom itself?",
    options: [
      "1/10 the size",
      "1/100 the size",
      "1/1,000 the size",
      "1/100,000 the size"
    ],
    correctIndex: 3,
    explanation: "An atom is roughly 1 Å (10⁻¹⁰ m) in diameter, while a nucleus is ~1–10 fm (10⁻¹⁵ m). The ratio is about 1:100,000, meaning the atom is almost entirely empty space.",
    audience: "beginner"
  },
  {
    id: "as-10",
    topicId: "atomic-structure",
    question: "What is a nuclide?",
    options: [
      "Any atom of a given element",
      "A specific nucleus characterized by both Z and N",
      "A radioactive nucleus only",
      "The nucleus of the most abundant isotope"
    ],
    correctIndex: 1,
    explanation: "A nuclide is a specific species of nucleus defined by both its proton number Z and neutron number N (equivalently Z and A). There are ~3,000 known nuclides, of which ~256 are stable.",
    audience: "beginner"
  },
  {
    id: "as-11",
    topicId: "atomic-structure",
    question: "The chart of nuclides plots nuclides as a function of:",
    options: [
      "Z (protons) on x-axis and A (mass number) on y-axis",
      "N (neutrons) on x-axis and Z (protons) on y-axis",
      "A on x-axis and binding energy on y-axis",
      "Z on x-axis and half-life on y-axis"
    ],
    correctIndex: 1,
    explanation: "The chart of nuclides (Segrè chart) plots Z on the y-axis and N on the x-axis. Each cell represents a nuclide, with stable nuclides forming the 'valley of stability'.",
    audience: "intermediate"
  },
  {
    id: "as-12",
    topicId: "atomic-structure",
    question: "The nuclear force (strong force) between nucleons is:",
    options: [
      "Long-range and strongly repulsive",
      "Short-range (< ~3 fm) and attractive at typical distances",
      "Identical to the electromagnetic force but stronger",
      "Inversely proportional to atomic number Z"
    ],
    correctIndex: 1,
    explanation: "The strong nuclear force is short-range (~1–3 fm), charge-independent, and attractive at distances beyond ~0.8 fm but strongly repulsive at very short distances. It saturates, meaning nucleons only interact with nearest neighbors.",
    audience: "intermediate"
  },
  {
    id: "as-13",
    topicId: "atomic-structure",
    question: "Mass defect (Δm) is defined as:",
    options: [
      "The difference between atomic mass and molecular mass",
      "The difference between the sum of free nucleon masses and the actual nuclear mass",
      "The mass lost during beta decay",
      "The relativistic mass increase of fast nucleons"
    ],
    correctIndex: 1,
    explanation: "Δm = Z·mₚ + N·mₙ − M(nucleus). This missing mass is converted to binding energy via E = Δm·c². A larger mass defect means more tightly bound nucleons.",
    audience: "intermediate",
    equation: "\\Delta m = Zm_p + Nm_n - M_{\\text{nucleus}}"
  },
  {
    id: "as-14",
    topicId: "atomic-structure",
    question: "Hydrogen has three naturally occurring isotopes: ¹H (protium), ²H (deuterium), and ³H (tritium). Which is radioactive?",
    options: ["Only ¹H", "Only ²H", "Only ³H", "All three"],
    correctIndex: 2,
    explanation: "Tritium (³H) is radioactive with a half-life of ~12.3 years, undergoing beta-minus decay to helium-3. Protium and deuterium are stable.",
    audience: "beginner"
  },
  {
    id: "as-15",
    topicId: "atomic-structure",
    question: "Spin-orbit coupling in the nuclear shell model was critical because it:",
    options: [
      "Explained why nucleons attract each other",
      "Correctly reproduced the observed magic numbers 28, 50, 82, 126",
      "Predicted the existence of neutrons",
      "Described nuclear fission cross-sections"
    ],
    correctIndex: 1,
    explanation: "By including a strong spin-orbit interaction (l·s coupling), Mayer and Jensen's shell model reproduced all magic numbers including the higher ones (28, 50, 82, 126) that the simple harmonic oscillator potential missed.",
    audience: "advanced"
  }
];
const radioactivityQuestions = [
  {
    id: "rd-01",
    topicId: "radioactivity",
    question: "In alpha (α) decay, the daughter nucleus has:",
    options: ["Z−1, A−1", "Z−2, A−4", "Z+1, A", "Z, A−1"],
    correctIndex: 1,
    explanation: "Alpha decay emits a ⁴He nucleus (2 protons + 2 neutrons). The parent loses 2 protons and 2 neutrons, so Z decreases by 2 and A decreases by 4.",
    audience: "beginner",
    equation: "^A_Z X \\rightarrow ^{A-4}_{Z-2} Y + ^4_2 \\text{He}"
  },
  {
    id: "rd-02",
    topicId: "radioactivity",
    question: "Beta-minus (β⁻) decay involves the emission of:",
    options: [
      "A proton and antineutrino",
      "An electron and antineutrino",
      "A positron and neutrino",
      "A neutron and gamma ray"
    ],
    correctIndex: 1,
    explanation: "In β⁻ decay, a neutron converts to a proton, emitting an electron (β⁻ particle) and an electron antineutrino: n → p + e⁻ + ν̄ₑ. Z increases by 1, N decreases by 1.",
    audience: "beginner",
    equation: "n \\rightarrow p + e^- + \\bar{\\nu}_e"
  },
  {
    id: "rd-03",
    topicId: "radioactivity",
    question: "The radioactive decay law states that the number of undecayed nuclei N(t) follows:",
    options: [
      "N(t) = N₀ · t · λ",
      "N(t) = N₀ · e^(−λt)",
      "N(t) = N₀ / (1 + λt)",
      "N(t) = N₀ · cos(λt)"
    ],
    correctIndex: 1,
    explanation: "Radioactive decay is exponential: N(t) = N₀e^(−λt), where λ is the decay constant. This arises because each nucleus has a constant probability λ of decaying per unit time.",
    audience: "beginner",
    equation: "N(t) = N_0 e^{-\\lambda t}"
  },
  {
    id: "rd-04",
    topicId: "radioactivity",
    question: "The half-life T₁/₂ and decay constant λ are related by:",
    options: ["T₁/₂ = λ", "T₁/₂ = 1/λ", "T₁/₂ = ln(2)/λ", "T₁/₂ = λ/ln(2)"],
    correctIndex: 2,
    explanation: "At t = T₁/₂, N = N₀/2. Substituting into the decay law: 1/2 = e^(−λT₁/₂), so T₁/₂ = ln(2)/λ ≈ 0.693/λ.",
    audience: "beginner",
    equation: "T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}"
  },
  {
    id: "rd-05",
    topicId: "radioactivity",
    question: "Activity (A) of a radioactive source is defined as:",
    options: ["N₀/T₁/₂", "λN (decays per second)", "N·T₁/₂", "N/(λ·t)"],
    correctIndex: 1,
    explanation: "Activity A = λN = number of decays per second. The SI unit is the Becquerel (1 Bq = 1 decay/s). A higher activity means more decays per second.",
    audience: "beginner",
    equation: "A = \\lambda N = \\frac{\\ln 2}{T_{1/2}} N"
  },
  {
    id: "rd-06",
    topicId: "radioactivity",
    question: "Gamma (γ) decay differs from alpha and beta decay in that:",
    options: [
      "It changes both Z and N of the nucleus",
      "It is purely an electromagnetic transition — no change in Z or N",
      "It only occurs in light nuclei (A < 20)",
      "It always accompanies alpha decay but never beta decay"
    ],
    correctIndex: 1,
    explanation: "Gamma decay is the emission of a high-energy photon from an excited nuclear state to a lower energy state. Z and N remain the same; only the nuclear energy level changes.",
    audience: "beginner"
  },
  {
    id: "rd-07",
    topicId: "radioactivity",
    question: "The Q-value of a nuclear decay is:",
    options: [
      "The charge of the emitted particle",
      "The energy released (= mass difference × c²)",
      "The number of daughter nuclei produced",
      "The decay constant in MeV"
    ],
    correctIndex: 1,
    explanation: "Q = (M_parent − M_daughter − M_emitted) · c². A positive Q means the decay is energetically favorable (spontaneous). The Q-value equals the kinetic energy available to the products.",
    audience: "intermediate",
    equation: "Q = (M_i - M_f)c^2"
  },
  {
    id: "rd-08",
    topicId: "radioactivity",
    question: "Electron capture (EC) is a competing process to β⁺ decay. It occurs when:",
    options: [
      "An electron from the nucleus escapes",
      "An inner-shell electron is captured by the nucleus, converting p → n",
      "A gamma ray captures an electron in the atom",
      "An atom emits two electrons simultaneously"
    ],
    correctIndex: 1,
    explanation: "In electron capture, a proton in the nucleus captures an orbital electron (usually K-shell): p + e⁻ → n + νₑ. Z decreases by 1. It competes with β⁺ decay and always occurs when Q < 1.022 MeV.",
    audience: "intermediate",
    equation: "p + e^- \\rightarrow n + \\nu_e"
  },
  {
    id: "rd-09",
    topicId: "radioactivity",
    question: "In a decay chain, secular equilibrium is reached when:",
    options: [
      "All daughters have the same half-life",
      "The activity of each daughter equals the activity of the parent",
      "The parent has completely decayed",
      "Only stable daughters remain"
    ],
    correctIndex: 1,
    explanation: "Secular equilibrium occurs when the parent's half-life >> all daughter half-lives. After ~7 half-lives of the longest-lived daughter, each intermediate member has the same activity as the parent.",
    audience: "advanced"
  },
  {
    id: "rd-10",
    topicId: "radioactivity",
    question: "Radon-222 is a significant public health concern because it is:",
    options: [
      "A beta emitter with a 30-year half-life",
      "A noble gas alpha emitter that accumulates indoors from uranium decay",
      "Released only from nuclear power plants",
      "A stable isotope used in smoke detectors"
    ],
    correctIndex: 1,
    explanation: "Radon-222 (T₁/₂ = 3.82 days) is an alpha emitter from the ²³⁸U decay chain. Being a noble gas, it migrates from soil into buildings. Its short-lived daughters (Po-218, Po-214) deliver alpha doses to lung tissue.",
    audience: "intermediate"
  },
  {
    id: "rd-11",
    topicId: "radioactivity",
    question: "The mean (average) lifetime τ of a radioactive nucleus relates to λ by:",
    options: ["τ = λ", "τ = 1/λ", "τ = ln(2)/λ", "τ = λ²"],
    correctIndex: 1,
    explanation: "The mean lifetime τ = 1/λ. Note that τ = T₁/₂/ln(2) ≈ 1.443 · T₁/₂. After time τ, the activity has fallen to 1/e (~36.8%) of its initial value.",
    audience: "intermediate",
    equation: "\\tau = \\frac{1}{\\lambda} = \\frac{T_{1/2}}{\\ln 2}"
  },
  {
    id: "rd-12",
    topicId: "radioactivity",
    question: "Internal conversion (IC) is an alternative to gamma emission where:",
    options: [
      "The nucleus converts a neutron to a proton internally",
      "The nuclear excitation energy is transferred to an orbital electron, which is then ejected",
      "A proton is converted to a neutron with no external emission",
      "The gamma ray is internally reflected before emission"
    ],
    correctIndex: 1,
    explanation: "In internal conversion, the excited nucleus transfers energy directly to an inner orbital electron (rather than emitting a gamma photon). The electron is then ejected with kinetic energy Eₑ = E* − Eᵦᵢₙ_ᵈᵢₙ_ᵍ.",
    audience: "advanced"
  },
  {
    id: "rd-13",
    topicId: "radioactivity",
    question: "Carbon-14 (¹⁴C) is used for radiocarbon dating because:",
    options: [
      "It is stable and always present in the same ratio",
      "It is continually produced in the atmosphere and has a half-life of ~5,730 years",
      "It emits alpha particles that leave distinctive tracks",
      "Its half-life matches the age of the Earth"
    ],
    correctIndex: 1,
    explanation: "¹⁴C is produced in the upper atmosphere by cosmic-ray neutrons reacting with ¹⁴N. Living organisms maintain a constant ¹⁴C/¹²C ratio. After death, ¹⁴C decays (T₁/₂ = 5,730 yr), allowing age determination up to ~50,000 years.",
    audience: "intermediate"
  },
  {
    id: "rd-14",
    topicId: "radioactivity",
    question: "Gamow's quantum tunneling theory explains why alpha particles can escape the nucleus despite:",
    options: [
      "Having insufficient energy to reach the nuclear surface",
      "Facing a Coulomb barrier higher than their kinetic energy",
      "Being too heavy to travel at the speed of light",
      "Being repelled by the strong nuclear force"
    ],
    correctIndex: 1,
    explanation: "Alpha particles have kinetic energies of 4–9 MeV, yet the Coulomb barrier at the nuclear surface can be 20–30 MeV. Quantum tunneling (Gamow, 1928) allows the alpha particle a finite probability of penetrating the classically forbidden barrier.",
    audience: "advanced"
  },
  {
    id: "rd-15",
    topicId: "radioactivity",
    question: "The Bateman equations describe:",
    options: [
      "The energy spectrum of beta particles",
      "The time evolution of nuclide populations in a decay chain",
      "Neutron moderation in reactor coolant",
      "The probability of alpha tunneling"
    ],
    correctIndex: 1,
    explanation: "The Bateman equations are a set of coupled first-order ODEs describing the population Nᵢ(t) of each member in a decay chain. They are essential for predicting radioactive buildup and decay of daughter products.",
    audience: "advanced"
  }
];
const nuclearReactionsQuestions = [
  {
    id: "nr-01",
    topicId: "nuclear-reactions",
    question: "In nuclear fission of U-235, the average energy released per fission event is approximately:",
    options: ["0.2 MeV", "2 MeV", "200 MeV", "2,000 MeV"],
    correctIndex: 2,
    explanation: "Each fission of ²³⁵U releases ~200 MeV (compared to ~4 eV for combustion). About 85% is kinetic energy of fission fragments; the rest goes to neutrons, gamma rays, and delayed beta/gamma from fission products.",
    audience: "beginner",
    equation: "E_{\\text{fission}} \\approx 200 \\text{ MeV per event}"
  },
  {
    id: "nr-02",
    topicId: "nuclear-reactions",
    question: "The neutron multiplication factor k is defined as:",
    options: [
      "Number of neutrons absorbed / number produced",
      "Number of neutrons in one generation / number in previous generation",
      "Average neutron energy in MeV",
      "Ratio of fast to thermal neutrons"
    ],
    correctIndex: 1,
    explanation: "k = neutrons in generation n+1 / neutrons in generation n. For a self-sustaining chain reaction: k=1 (critical), k>1 (supercritical), k<1 (subcritical).",
    audience: "intermediate"
  },
  {
    id: "nr-03",
    topicId: "nuclear-reactions",
    question: "The D-T fusion reaction (deuterium + tritium) produces:",
    options: [
      "Helium-4 + proton",
      "Helium-4 + neutron (14.1 MeV)",
      "Helium-3 + deuterium",
      "Lithium-6 + photon"
    ],
    correctIndex: 1,
    explanation: "²H + ³H → ⁴He (3.5 MeV) + n (14.1 MeV). Total Q ≈ 17.6 MeV. The D-T reaction has the highest cross-section at achievable temperatures, making it the primary candidate for fusion power.",
    audience: "intermediate",
    equation: "^2\\text{H} + ^3\\text{H} \\rightarrow ^4\\text{He} + n + 17.6 \\text{ MeV}"
  },
  {
    id: "nr-04",
    topicId: "nuclear-reactions",
    question: "A neutron cross-section (σ) measures:",
    options: [
      "The physical size of the nucleus in cm²",
      "The effective target area for a specific reaction (in barns, 1 b = 10⁻²⁴ cm²)",
      "The rate of neutron production per second",
      "The neutron's wavelength in the nucleus"
    ],
    correctIndex: 1,
    explanation: "Cross-section σ is an effective area expressing the probability of a specific reaction. 1 barn = 10⁻²⁴ cm² = 10⁻²⁸ m². For thermal neutron fission of ²³⁵U, σ_f ≈ 585 b.",
    audience: "intermediate",
    equation: "1 \\text{ barn} = 10^{-24} \\text{ cm}^2"
  },
  {
    id: "nr-05",
    topicId: "nuclear-reactions",
    question: "Prompt neutrons (emitted instantly during fission) and delayed neutrons differ primarily in:",
    options: [
      "Energy — delayed neutrons have much higher energies",
      "Timing — delayed neutrons are emitted by fission products seconds to minutes later",
      "Origin — delayed neutrons come from the moderator",
      "Number — there are more delayed neutrons than prompt neutrons"
    ],
    correctIndex: 1,
    explanation: "~99.35% of fission neutrons are prompt (emitted in <10⁻¹⁴ s); ~0.65% are delayed (emitted by excited fission products over 0.2–55 s). Delayed neutrons are essential for reactor control — they lengthen the effective neutron lifetime.",
    audience: "intermediate"
  },
  {
    id: "nr-06",
    topicId: "nuclear-reactions",
    question: "The Lawson criterion for fusion requires a minimum product of:",
    options: [
      "Plasma pressure × volume",
      "Ion density × confinement time (n·τ)",
      "Temperature × magnetic field strength",
      "Fusion cross-section × plasma density"
    ],
    correctIndex: 1,
    explanation: "The Lawson criterion states that for D-T fusion, nτ > ~10²⁰ m⁻³·s (at T ≈ 10 keV) is needed for net energy production. Modern formulations use the triple product: n·T·τ > 3×10²¹ keV·m⁻³·s.",
    audience: "advanced",
    equation: "n \\tau \\gtrsim 10^{20} \\text{ m}^{-3}\\text{s} \\text{ (D-T, } T \\approx 10 \\text{ keV)}"
  },
  {
    id: "nr-07",
    topicId: "nuclear-reactions",
    question: "Thermal neutrons are preferred for fission in most reactors because:",
    options: [
      "They carry more kinetic energy than fast neutrons",
      "They have much larger fission cross-sections for ²³⁵U",
      "They produce more delayed neutrons",
      "They do not cause radiation damage to fuel"
    ],
    correctIndex: 1,
    explanation: "Thermal neutron fission cross-section of ²³⁵U is ~585 barns versus ~1 barn for fast neutrons. A moderator slows fast fission neutrons (~2 MeV) to thermal energies (~0.025 eV), dramatically increasing reaction probability.",
    audience: "intermediate"
  },
  {
    id: "nr-08",
    topicId: "nuclear-reactions",
    question: "The four-factor formula for an infinite reactor is k∞ = η · ε · p · f. What does p represent?",
    options: [
      "Prompt neutron fraction",
      "Resonance escape probability (neutrons that avoid absorption while slowing down)",
      "Power output factor",
      "Parasitic capture ratio"
    ],
    correctIndex: 1,
    explanation: "p = resonance escape probability: the fraction of neutrons that avoid resonance capture (mainly by ²³⁸U) while slowing from fast to thermal energies. η = neutrons/absorption in fuel; ε = fast fission factor; f = thermal utilization.",
    audience: "advanced",
    equation: "k_\\infty = \\eta \\cdot \\varepsilon \\cdot p \\cdot f"
  },
  {
    id: "nr-09",
    topicId: "nuclear-reactions",
    question: "Criticality of a nuclear reactor means:",
    options: [
      "The reactor is in a dangerous state",
      "k_eff = 1 — the chain reaction is exactly self-sustaining",
      "Reactivity is at maximum",
      "The reactor is shutting down"
    ],
    correctIndex: 1,
    explanation: "At criticality, exactly one neutron from each fission event causes another fission, keeping the chain reaction constant. This is the normal steady-state operating condition — it is not dangerous per se.",
    audience: "beginner"
  },
  {
    id: "nr-10",
    topicId: "nuclear-reactions",
    question: "Spallation reactions (used in spallation neutron sources) involve:",
    options: [
      "Thermal neutron absorption followed by fission",
      "High-energy protons striking a heavy metal target, producing many neutrons",
      "D-T fusion in a compact device",
      "Photoneutron reactions with gamma rays"
    ],
    correctIndex: 1,
    explanation: "Spallation occurs when high-energy protons (typically 500 MeV–1 GeV) strike a heavy target (W, Hg, Pb). Each proton can eject 20–30 neutrons by violently disrupting nuclei. Used at ISIS, SNS, and J-PARC facilities.",
    audience: "advanced"
  },
  {
    id: "nr-11",
    topicId: "nuclear-reactions",
    question: "In the CNO cycle (stellar fusion), the net result is the same as the proton-proton chain: converting",
    options: [
      "Helium to carbon with energy release",
      "4 protons into He-4, 2 positrons, 2 neutrinos, and energy",
      "Deuterium to tritium using carbon as a catalyst",
      "Neutrons into protons and electrons"
    ],
    correctIndex: 1,
    explanation: "Both the p-p chain and CNO cycle achieve the same net reaction: 4¹H → ⁴He + 2e⁺ + 2νₑ + 26.7 MeV. Carbon, nitrogen, and oxygen act as catalysts in the CNO cycle, which dominates in stars more massive than the Sun.",
    audience: "advanced",
    equation: "4 {}^1\\text{H} \\rightarrow {}^4\\text{He} + 2e^+ + 2\\nu_e + 26.7 \\text{ MeV}"
  },
  {
    id: "nr-12",
    topicId: "nuclear-reactions",
    question: "The Q-value of the thermal fission of ²³⁵U is positive, which means:",
    options: [
      "Energy must be supplied for the reaction",
      "Energy is released — the products are less massive than the reactants",
      "The reaction is in equilibrium",
      "Neutrons are consumed without being replaced"
    ],
    correctIndex: 1,
    explanation: "A positive Q-value means the total rest mass of products is less than the reactants. The mass difference is released as kinetic energy and radiation, consistent with E = mc².",
    audience: "beginner"
  },
  {
    id: "nr-13",
    topicId: "nuclear-reactions",
    question: "Resonance absorption in reactors mainly refers to absorption of neutrons at specific energies by:",
    options: [
      "Water molecules in the coolant",
      "²³⁸U nuclei (particularly in the 1–100 eV range)",
      "Control rod materials",
      "Xenon-135 fission product"
    ],
    correctIndex: 1,
    explanation: "²³⁸U has dense resonance absorption peaks between ~1–1000 eV. This is the primary challenge for thermal reactors, addressed by fuel lump geometry (Dancoff factor) and moderator design to maximize resonance escape probability p.",
    audience: "advanced"
  },
  {
    id: "nr-14",
    topicId: "nuclear-reactions",
    question: "What does the notation ²³⁵U(n,f) represent in nuclear reaction notation?",
    options: [
      "Uranium-235 emitting a neutron and forming fluoride",
      "A neutron incident on ²³⁵U producing fission",
      "Fast neutron capture in uranium-235",
      "Uranium-235 fusion product"
    ],
    correctIndex: 1,
    explanation: "Standard reaction notation is Target(projectile,ejectile)Residual. So ²³⁵U(n,f) means a neutron (n) hits ²³⁵U and causes fission (f). Similarly, ²³⁸U(n,γ)²³⁹U is neutron capture with gamma emission.",
    audience: "intermediate"
  },
  {
    id: "nr-15",
    topicId: "nuclear-reactions",
    question: "The Breit-Wigner formula describes:",
    options: [
      "The energy spectrum of fission fragments",
      "The shape of cross-section resonance peaks as a function of neutron energy",
      "The temperature dependence of moderator density",
      "The decay probability of excited nuclear states"
    ],
    correctIndex: 1,
    explanation: "The Breit-Wigner single-level formula gives the energy-dependent cross-section near a resonance: σ(E) ∝ Γ²/[(E−E₀)² + (Γ/2)²], where E₀ is the resonance energy and Γ is the total width. It's fundamental to nuclear data evaluation.",
    audience: "advanced"
  }
];
const reactorTypesQuestions = [
  {
    id: "rt-01",
    topicId: "reactor-types",
    question: "A Pressurized Water Reactor (PWR) operates with primary coolant at approximately:",
    options: [
      "1 bar, 100°C",
      "155 bar, 320°C",
      "70 bar, 285°C",
      "300 bar, 450°C"
    ],
    correctIndex: 1,
    explanation: "PWR primary coolant is pressurized to ~155 bar (15.5 MPa) to prevent boiling, maintaining liquid water at ~315–325°C. Heat is transferred to a secondary steam loop via steam generators.",
    audience: "intermediate"
  },
  {
    id: "rt-02",
    topicId: "reactor-types",
    question: "The key operational difference between a BWR and a PWR is that a BWR:",
    options: [
      "Uses heavy water as moderator",
      "Allows steam to form directly in the reactor vessel and uses a single coolant loop",
      "Uses gas rather than liquid as coolant",
      "Operates at higher pressure than a PWR"
    ],
    correctIndex: 1,
    explanation: "In a BWR, water boils directly in the reactor core (at ~70 bar, 285°C), producing steam that drives the turbines directly. This simplifies the plant design (no steam generators) but means the turbine may contact slightly radioactive steam.",
    audience: "intermediate"
  },
  {
    id: "rt-03",
    topicId: "reactor-types",
    question: "CANDU reactors use heavy water (D₂O) as moderator because:",
    options: [
      "It is cheaper than light water",
      "D₂O absorbs fewer neutrons, allowing natural (unenriched) uranium fuel",
      "It provides better heat transfer than light water",
      "It has a higher boiling point, allowing higher temperatures"
    ],
    correctIndex: 1,
    explanation: "D₂O has a much smaller neutron absorption cross-section than H₂O (0.001 b vs. 0.332 b for the 2200 m/s neutron), allowing the neutron economy to sustain a chain reaction with natural uranium (0.7% ²³⁵U) without enrichment.",
    audience: "intermediate"
  },
  {
    id: "rt-04",
    topicId: "reactor-types",
    question: "Control rods in a nuclear reactor are made of materials such as:",
    options: [
      "Lead and steel",
      "Boron, cadmium, or hafnium — high neutron absorbers",
      "Graphite and beryllium",
      "Zirconium alloys"
    ],
    correctIndex: 1,
    explanation: "Control rod materials must have large neutron absorption cross-sections: boron-10 (σ_abs ≈ 3840 b), cadmium-113 (≈20,000 b), hafnium. Zircaloy is used for fuel cladding (low absorption), not control rods.",
    audience: "beginner"
  },
  {
    id: "rt-05",
    topicId: "reactor-types",
    question: "The primary purpose of moderation in a thermal reactor is to:",
    options: [
      "Cool the reactor fuel",
      "Slow fast fission neutrons (2 MeV) to thermal energies (0.025 eV)",
      "Shield radiation from escaping the core",
      "Convert neutrons to protons"
    ],
    correctIndex: 1,
    explanation: "Moderators (light water, heavy water, graphite) slow fast neutrons via elastic scattering collisions, maximizing energy transfer when the scatterer mass ≈ neutron mass. Thermal neutrons have much higher fission cross-sections in ²³⁵U.",
    audience: "beginner"
  },
  {
    id: "rt-06",
    topicId: "reactor-types",
    question: "A negative temperature coefficient of reactivity in a reactor means:",
    options: [
      "The reactor shuts down at low temperatures",
      "As temperature increases, reactivity decreases — an inherent safety feature",
      "Colder coolant decreases power output",
      "Control rods must be inserted when temperature rises"
    ],
    correctIndex: 1,
    explanation: "Negative temperature coefficients provide passive safety: if power (and temperature) rise, reactivity decreases, moderating the increase. The Doppler broadening of ²³⁸U resonances is a key contributor in LWRs.",
    audience: "intermediate"
  },
  {
    id: "rt-07",
    topicId: "reactor-types",
    question: "Generation IV reactor designs include which of the following?",
    options: [
      "PWR, BWR, CANDU — all current commercial designs",
      "Molten Salt Reactor, Sodium Fast Reactor, Very High Temperature Reactor, and three others",
      "Only advanced PWRs with passive safety systems",
      "Designs using antimatter as fuel"
    ],
    correctIndex: 1,
    explanation: "The Generation IV International Forum (GIF) selected six concepts: Sodium-Cooled Fast Reactor (SFR), Lead-Cooled Fast Reactor (LFR), Gas-Cooled Fast Reactor (GFR), Very High Temperature Reactor (VHTR), Supercritical Water Reactor (SCWR), and Molten Salt Reactor (MSR).",
    audience: "intermediate"
  },
  {
    id: "rt-08",
    topicId: "reactor-types",
    question: "Small Modular Reactors (SMRs) are generally defined as having an electrical output of:",
    options: ["< 10 MWe", "< 300 MWe", "300–600 MWe", "> 1000 MWe"],
    correctIndex: 1,
    explanation: "SMRs are defined by the IAEA as reactors producing < 300 MWe. Their smaller size allows factory fabrication, shorter construction times, passive safety systems, and deployment in remote areas where large grids don't exist.",
    audience: "intermediate"
  },
  {
    id: "rt-09",
    topicId: "reactor-types",
    question: "What is the role of the pressurizer in a PWR?",
    options: [
      "Pumps coolant around the primary loop",
      "Maintains primary coolant pressure to prevent bulk boiling",
      "Controls reactor power via neutron absorption",
      "Transfers heat from primary to secondary loop"
    ],
    correctIndex: 1,
    explanation: "The pressurizer in a PWR is a vessel partially filled with water and steam, with heaters and spray nozzles. It maintains primary system pressure at ~155 bar. If pressure drops, heaters activate; if it rises, sprays condense steam.",
    audience: "advanced"
  },
  {
    id: "rt-10",
    topicId: "reactor-types",
    question: "Enriched uranium fuel is used in most light water reactors because:",
    options: [
      "Natural uranium is too radioactive to handle",
      "The higher ²³⁵U fraction (3–5%) compensates for neutron absorption by ordinary water",
      "Enriched uranium is cheaper to produce",
      "Natural uranium produces too much heat"
    ],
    correctIndex: 1,
    explanation: "Light water (H₂O) absorbs some neutrons, making it impossible to sustain a chain reaction with natural uranium (0.7% ²³⁵U). Enriching to 3–5% increases the fissile fraction enough to overcome these losses.",
    audience: "intermediate"
  },
  {
    id: "rt-11",
    topicId: "reactor-types",
    question: "Xenon-135 is a significant concern in reactor operations because:",
    options: [
      "It is a highly radioactive fission product that contaminates coolant",
      "It has an enormous thermal neutron absorption cross-section (2.6×10⁶ b), causing reactivity swings",
      "It corrodes zircaloy fuel cladding rapidly",
      "It is the primary source of decay heat after shutdown"
    ],
    correctIndex: 1,
    explanation: "¹³⁵Xe has σ_abs ≈ 2.6×10⁶ b (the largest of any nuclide). It is produced via ¹³⁵I decay and directly from fission, causing the 'xenon pit' — a reactivity dip that can make restart impossible for 24–48 hours after shutdown.",
    audience: "advanced"
  },
  {
    id: "rt-12",
    topicId: "reactor-types",
    question: "The defense-in-depth principle in reactor safety involves:",
    options: [
      "Military protection of nuclear facilities from attack",
      "Multiple independent barriers and layers of protection (fuel matrix, cladding, pressure boundary, containment)",
      "Redundant control rods in case of rod ejection",
      "Using multiple fuel types to prevent single-mode failure"
    ],
    correctIndex: 1,
    explanation: "Defense-in-depth consists of multiple physical barriers (fuel pellet, cladding, primary pressure boundary, reactor building) and multiple layers of safety systems (inherent passive safety, engineered active safety, passive safety injection, containment).",
    audience: "intermediate"
  },
  {
    id: "rt-13",
    topicId: "reactor-types",
    question: "The RBMK reactor (used at Chernobyl) differed from LWRs in that it had a:",
    options: [
      "Negative void coefficient — safer at high power",
      "Positive void coefficient — increased reactivity if coolant boiled",
      "Sealed containment building like Western designs",
      "Passive safety system with gravity-fed water injection"
    ],
    correctIndex: 1,
    explanation: "The RBMK's graphite moderator + water coolant design produced a positive void coefficient: if coolant boiled away, moderation by graphite continued while neutron absorption by water decreased, increasing reactivity — a fundamental instability that contributed to the Chernobyl accident.",
    audience: "advanced"
  },
  {
    id: "rt-14",
    topicId: "reactor-types",
    question: "Fast reactors (sodium-cooled) do not use a moderator because:",
    options: [
      "Sodium absorbs all thermal neutrons",
      "They are designed to sustain fission with fast neutrons, enabling breeding of new fuel",
      "Moderators are too expensive at high temperatures",
      "Fast reactors use plutonium which doesn't require thermal neutrons"
    ],
    correctIndex: 1,
    explanation: "Fast reactors maintain a fast neutron spectrum intentionally. In this spectrum, ²³⁸U has a higher probability of fast fission and especially of neutron capture to produce ²³⁹Pu (fertile-to-fissile breeding). Moderating to thermal would eliminate this breeding advantage.",
    audience: "advanced"
  },
  {
    id: "rt-15",
    topicId: "reactor-types",
    question: "The thermal efficiency of a nuclear power plant (fraction of thermal energy converted to electricity) is typically:",
    options: ["10–15%", "30–35%", "60–70%", "85–95%"],
    correctIndex: 1,
    explanation: "LWR power plants typically achieve 30–35% thermal efficiency, limited by the relatively low steam temperatures (~300°C) compared to fossil fuel plants. Advanced high-temperature designs aim for >40% efficiency using the Brayton cycle.",
    audience: "intermediate"
  }
];
const radiationBiologyQuestions = [
  {
    id: "rb-01",
    topicId: "radiation-biology",
    question: "Linear Energy Transfer (LET) describes:",
    options: [
      "The total energy of the radiation beam",
      "Energy deposited per unit path length (keV/μm) as radiation passes through tissue",
      "The rate of energy transfer from photons to electrons",
      "The electrical charge of the radiation particle"
    ],
    correctIndex: 1,
    explanation: "LET = energy deposited per unit path length (keV/μm). High-LET radiation (alpha, heavy ions) deposits energy densely, causing more clustered DNA damage. Low-LET radiation (X-rays, gamma) causes sparse, more repairable damage.",
    audience: "intermediate",
    equation: "\\text{LET} = -\\frac{dE}{dx} \\quad [\\text{keV}/\\mu\\text{m}]"
  },
  {
    id: "rb-02",
    topicId: "radiation-biology",
    question: "The Sievert (Sv) differs from the Gray (Gy) in that it accounts for:",
    options: [
      "The decay rate of the source",
      "The biological effectiveness of different radiation types via the radiation weighting factor (wᴿ)",
      "The energy of the radiation source",
      "The distance from the radiation source"
    ],
    correctIndex: 1,
    explanation: "1 Gy = 1 J/kg (absorbed dose, physical). Dose equivalent H (Sv) = D (Gy) × wᴿ. For X-rays/gamma, wᴿ = 1; for alpha particles, wᴿ = 20, reflecting their much greater biological damage per unit absorbed energy.",
    audience: "intermediate",
    equation: "H [\\text{Sv}] = D [\\text{Gy}] \\times w_R"
  },
  {
    id: "rb-03",
    topicId: "radiation-biology",
    question: "The ALARA principle in radiation protection stands for:",
    options: [
      "All Low-Activity Radioactive Advice",
      "As Low As Reasonably Achievable",
      "Absorbed Linear Activity Radiation Assessment",
      "Authorized Levels for Acute Radiation Allowance"
    ],
    correctIndex: 1,
    explanation: "ALARA means keeping radiation exposures as low as reasonably achievable, taking into account social and economic factors. It's the cornerstone of occupational and public radiation protection, implemented through time, distance, and shielding.",
    audience: "beginner"
  },
  {
    id: "rb-04",
    topicId: "radiation-biology",
    question: "The average effective dose from natural background radiation in the US is approximately:",
    options: ["0.03 mSv/year", "0.3 mSv/year", "3 mSv/year", "30 mSv/year"],
    correctIndex: 2,
    explanation: "The US average is ~3.1 mSv/year: ~2.3 mSv from natural sources (radon 1.26, cosmic 0.27, terrestrial 0.28, internal 0.28) and ~0.8 mSv from medical procedures. Global average is ~2.4 mSv/year.",
    audience: "beginner"
  },
  {
    id: "rb-05",
    topicId: "radiation-biology",
    question: "Acute Radiation Syndrome (ARS) typically begins at whole-body doses above approximately:",
    options: ["1 mSv", "100 mSv", "1 Sv", "10 Sv"],
    correctIndex: 2,
    explanation: "ARS requires a whole-body dose of ~1 Sv or more received in a short time. At 1–2 Sv: mild nausea/fatigue. At 4–5 Sv: LD50 (50% lethal dose) without treatment. At >6 Sv: very likely fatal without aggressive medical intervention.",
    audience: "intermediate"
  },
  {
    id: "rb-06",
    topicId: "radiation-biology",
    question: "Relative Biological Effectiveness (RBE) compares the biological effect of a test radiation relative to:",
    options: [
      "Alpha particles",
      "250 kVp X-rays (reference radiation)",
      "Neutrons at 1 MeV",
      "Background gamma radiation"
    ],
    correctIndex: 1,
    explanation: "RBE = dose of 250 kVp X-rays causing a specific effect / dose of test radiation causing the same effect. X-rays at 250 kVp are the standard reference. Alpha particles typically have RBE of 10–20 for cell killing.",
    audience: "advanced"
  },
  {
    id: "rb-07",
    topicId: "radiation-biology",
    question: "Which tissue is most sensitive to radiation according to ICRP tissue weighting factors (wT)?",
    options: [
      "Skin (wT = 0.01)",
      "Bone marrow and colon (wT = 0.12 each)",
      "Lung (wT = 0.12)",
      "Brain (wT = 0.01)"
    ],
    correctIndex: 1,
    explanation: "According to ICRP Publication 103, the highest tissue weighting factors are for bone marrow (red, 0.12), colon (0.12), lung (0.12), and stomach (0.12). Skin and bone surface have the lowest (0.01). These factors reflect stochastic cancer risk.",
    audience: "advanced"
  },
  {
    id: "rb-08",
    topicId: "radiation-biology",
    question: "Alpha particles are most dangerous when:",
    options: [
      "Outside the body, since they penetrate deeply into organs",
      "Inhaled or ingested (internal exposure), as they deposit all energy in sensitive tissues",
      "Shielded by just a few centimeters of air",
      "Traveling at low velocity"
    ],
    correctIndex: 1,
    explanation: "Alpha particles are stopped by a sheet of paper or ~5 cm of air, making them nearly harmless as external sources. However, when alpha emitters are inhaled or ingested (like Radon daughters or Polonium-210), they deposit all their energy in sensitive internal tissues.",
    audience: "beginner"
  },
  {
    id: "rb-09",
    topicId: "radiation-biology",
    question: "The Linear No-Threshold (LNT) model assumes:",
    options: [
      "Radiation causes no harm below a threshold dose",
      "Cancer risk is proportional to dose with no safe threshold, even at very low doses",
      "High doses are proportionally safer than predicted by linearity",
      "Only ionizing radiation above 100 mSv poses health risks"
    ],
    correctIndex: 1,
    explanation: "LNT is the regulatory assumption used by ICRP/IAEA: risk is directly proportional to dose, with zero threshold. While scientifically contested at low doses (hormesis debate), LNT is used conservatively for radiation protection purposes.",
    audience: "intermediate"
  },
  {
    id: "rb-10",
    topicId: "radiation-biology",
    question: "Radiation-induced DNA damage is most harmful when it causes:",
    options: [
      "Single-strand breaks, which are easily repaired",
      "Double-strand breaks (DSBs), which are harder to repair faithfully",
      "Cytoplasmic membrane damage",
      "Protein denaturation in enzymes"
    ],
    correctIndex: 1,
    explanation: "Double-strand breaks (both DNA strands broken at similar locations) are the most critical lesion. They can be repaired by homologous recombination (high fidelity) or non-homologous end joining (error-prone, leading to mutations). High-LET radiation preferentially creates DSBs.",
    audience: "advanced"
  },
  {
    id: "rb-11",
    topicId: "radiation-biology",
    question: "The occupational radiation dose limit for radiation workers in most countries is:",
    options: [
      "5 mSv/year",
      "20 mSv/year (averaged over 5 years)",
      "100 mSv/year",
      "500 mSv/year"
    ],
    correctIndex: 1,
    explanation: "ICRP recommends 20 mSv/year averaged over any 5 years, with no year exceeding 50 mSv. The public limit is 1 mSv/year (effective dose). These limits apply above background and medical exposures.",
    audience: "intermediate"
  },
  {
    id: "rb-12",
    topicId: "radiation-biology",
    question: "Gamma rays and X-rays cause biological damage primarily through:",
    options: [
      "Direct ionization of DNA molecules",
      "Producing secondary electrons that ionize and generate free radicals in water (indirect effect)",
      "Transmuting atoms in cells to radioactive isotopes",
      "Heating tissue directly"
    ],
    correctIndex: 1,
    explanation: "About 70% of radiation-induced DNA damage from photons is indirect: gamma/X-rays ionize water (radiolysis), producing OH• radicals that then attack DNA. Only ~30% is from direct ionization of the DNA backbone.",
    audience: "advanced"
  },
  {
    id: "rb-13",
    topicId: "radiation-biology",
    question: "Potassium iodide (KI) pills taken after a nuclear accident protect by:",
    options: [
      "Blocking all radiation from entering the body",
      "Saturating the thyroid with stable iodine so it won't absorb radioactive ¹³¹I",
      "Neutralizing radiation-induced free radicals",
      "Preventing radon from being absorbed in the lungs"
    ],
    correctIndex: 1,
    explanation: "KI provides stable iodine-127 to saturate thyroid iodine receptors. When taken before or shortly after exposure to radioactive ¹³¹I (from reactor accidents), it prevents the thyroid from concentrating the radioactive isotope, reducing thyroid cancer risk.",
    audience: "intermediate"
  },
  {
    id: "rb-14",
    topicId: "radiation-biology",
    question: "Stochastic effects of radiation (such as cancer) differ from deterministic effects in that:",
    options: [
      "Stochastic effects have a clear dose threshold; deterministic effects do not",
      "Stochastic effects have no threshold — only probability increases with dose; severity is independent of dose",
      "Stochastic effects only occur above 1 Sv",
      "Stochastic effects are reversible; deterministic effects are not"
    ],
    correctIndex: 1,
    explanation: "Stochastic effects (cancer, hereditary effects): probability increases with dose, no threshold, severity independent of dose. Deterministic effects (cataracts, erythema, ARS): threshold dose exists below which no effect occurs, and severity increases with dose above threshold.",
    audience: "intermediate"
  },
  {
    id: "rb-15",
    topicId: "radiation-biology",
    question: "Which type of shielding is most effective for gamma/X-ray radiation?",
    options: [
      "Paper or thin plastic (high electron density)",
      "High-Z materials like lead or thick concrete (photoelectric absorption + Compton scattering)",
      "Water (hydrogen-rich for neutron moderation)",
      "Aluminum foil"
    ],
    correctIndex: 1,
    explanation: "High-Z materials (lead, steel, thick concrete) are most effective for gamma shielding because the photoelectric cross-section scales as Z⁴–Z⁵, and they also attenuate via Compton scattering. Lead's high density and Z=82 make it very efficient.",
    audience: "beginner"
  }
];
const nuclearSafetyQuestions = [
  {
    id: "ns-01",
    topicId: "nuclear-safety",
    question: "The INES (International Nuclear Event Scale) rates nuclear events from level 0 to 7. What was Chernobyl (1986)?",
    options: [
      "Level 4 — accident with local consequences",
      "Level 5 — accident with wider consequences",
      "Level 6 — serious accident",
      "Level 7 — major accident (maximum)"
    ],
    correctIndex: 3,
    explanation: "Both Chernobyl (1986) and Fukushima Daiichi (2011) are rated INES Level 7. Three Mile Island (1979) was Level 5. Level 7 is characterized by major release of radioactive material with widespread effects requiring extended protective actions.",
    audience: "beginner"
  },
  {
    id: "ns-02",
    topicId: "nuclear-safety",
    question: "The Three Mile Island accident (1979) was primarily caused by:",
    options: [
      "A tsunami flooding the reactor building",
      "Operator errors following a stuck-open PORV valve, leading to a partial core meltdown",
      "A runaway fission chain reaction (prompt criticality)",
      "Hydrogen explosion in the containment building"
    ],
    correctIndex: 1,
    explanation: "TMI-2's accident began with a stuck-open pilot-operated relief valve (PORV), which drained coolant. Combined with operator confusion (incorrect instrumentation led operators to shut off emergency cooling), it resulted in ~50% core damage. INES Level 5.",
    audience: "intermediate"
  },
  {
    id: "ns-03",
    topicId: "nuclear-safety",
    question: "The primary cause of the Chernobyl disaster was:",
    options: [
      "Tsunami disabling backup generators",
      "An explosion during a safety test — attributed to positive void coefficient and inadequate safety culture",
      "Metal fatigue in reactor vessel causing a steam explosion",
      "Operator deliberately increasing reactor power for an experiment"
    ],
    correctIndex: 1,
    explanation: "During a turbine rundown safety test at low power, operators (violating procedures) created conditions where the RBMK's positive void coefficient led to a massive power surge. Prompt criticality caused a steam explosion and graphite fire, releasing ~5% of the core's inventory.",
    audience: "intermediate"
  },
  {
    id: "ns-04",
    topicId: "nuclear-safety",
    question: "Decay heat — heat produced after reactor shutdown — is primarily from:",
    options: [
      "Continued fission of ²³⁵U",
      "Beta and gamma decay of fission products",
      "Alpha decay of uranium fuel",
      "Chemical reactions between coolant and fuel"
    ],
    correctIndex: 1,
    explanation: "After shutdown, fission products continue to beta/gamma decay, producing ~7% of full power immediately, declining to ~1% after 1 hour, ~0.1% after 1 day. This decay heat drove the Fukushima meltdowns after SCRAM — without cooling, it is sufficient to melt fuel.",
    audience: "intermediate"
  },
  {
    id: "ns-05",
    topicId: "nuclear-safety",
    question: "The Fukushima Daiichi accident (2011) was triggered by:",
    options: [
      "An operator error during a safety test",
      "An earthquake (M9.0) and subsequent tsunami disabling all AC and backup DC power",
      "A hydrogen explosion in the containment building without external cause",
      "A criticality accident in spent fuel pool"
    ],
    correctIndex: 1,
    explanation: "The March 11, 2011 Tōhoku earthquake and ~14 m tsunami overwhelmed all 13 backup diesel generators and battery systems at Fukushima Daiichi, causing station blackout. Without cooling, decay heat caused hydrogen buildup and meltdowns in Units 1, 2, and 3.",
    audience: "intermediate"
  },
  {
    id: "ns-06",
    topicId: "nuclear-safety",
    question: "High-level radioactive waste (HLW) is primarily characterized by:",
    options: [
      "Large volume, low activity — requires 100 years isolation",
      "High heat generation and long-lived radionuclides — requires deep geological isolation for ~100,000 years",
      "Mainly alpha emitters with no heat generation",
      "Only fission products with half-lives < 30 years"
    ],
    correctIndex: 1,
    explanation: "HLW (primarily spent nuclear fuel and reprocessing waste) contains intense beta/gamma emitters (fission products) and long-lived actinides (plutonium, americium). It generates significant heat and remains hazardous for 100,000+ years, requiring deep geological repositories (DGR).",
    audience: "intermediate"
  },
  {
    id: "ns-07",
    topicId: "nuclear-safety",
    question: "The IAEA's primary role in nuclear safety includes:",
    options: [
      "Commanding national nuclear regulatory bodies",
      "Setting international safety standards and conducting safety reviews (IRRS missions)",
      "Directly operating nuclear power plants",
      "Providing military security for nuclear materials"
    ],
    correctIndex: 1,
    explanation: "The IAEA (International Atomic Energy Agency, est. 1957) develops safety standards (INSAG, NS-R, SSG series), conducts IRRS (Integrated Regulatory Review Service) peer reviews, and provides technical cooperation. Regulatory authority remains with each member state's national body.",
    audience: "intermediate"
  },
  {
    id: "ns-08",
    topicId: "nuclear-safety",
    question: "The US Nuclear Regulatory Commission (NRC) uses a risk-informed, performance-based approach where risk is measured by:",
    options: [
      "Core damage frequency (CDF) and large early release frequency (LERF)",
      "Number of incidents per reactor-year",
      "Fraction of reactors meeting dose limits",
      "Annual radiation exposure of workers"
    ],
    correctIndex: 1,
    explanation: "NRC's Reactor Oversight Process uses Probabilistic Risk Assessment (PRA). Key metrics: CDF (core damage frequency, target < 10⁻⁴/reactor-year) and LERF (large early release frequency, target < 10⁻⁵/reactor-year). This quantitative framework guides safety inspections and enforcement.",
    audience: "advanced"
  },
  {
    id: "ns-09",
    topicId: "nuclear-safety",
    question: "The concept of 'passive safety' in modern reactor designs means:",
    options: [
      "The reactor automatically shuts down if operators ignore procedures",
      "Safety systems operate using gravity, natural circulation, or compressed gas — without active pumps or operator action",
      "The reactor runs at passively low power levels",
      "Safety systems are passively monitored by computer"
    ],
    correctIndex: 1,
    explanation: "Passive safety systems (as in AP1000, ESBWR) rely on natural phenomena: gravity-driven water injection, natural circulation for decay heat removal, compressed gas. They don't require AC power, pumps, or active operator intervention — providing 72 hours of coping time without any action.",
    audience: "intermediate"
  },
  {
    id: "ns-10",
    topicId: "nuclear-safety",
    question: "Nuclear safeguards (as implemented by the IAEA) are designed to:",
    options: [
      "Prevent reactor accidents through safety inspections",
      "Verify that nuclear materials are not diverted from peaceful uses to weapons programs",
      "Protect nuclear facilities from terrorist attacks",
      "Set operational dose limits for nuclear workers"
    ],
    correctIndex: 1,
    explanation: "IAEA safeguards are a system of nuclear material accountancy, containment, and surveillance designed to verify that states fulfill their non-proliferation commitments. This is distinct from nuclear safety (accident prevention) and nuclear security (protecting against malicious acts).",
    audience: "intermediate"
  },
  {
    id: "ns-11",
    topicId: "nuclear-safety",
    question: "A Loss-of-Coolant Accident (LOCA) in a PWR is managed by:",
    options: [
      "Immediately inserting all control rods only",
      "Emergency Core Cooling System (ECCS) injection of water to prevent fuel melt",
      "Reducing reactor power to 50% via control rods",
      "Draining the primary coolant system"
    ],
    correctIndex: 1,
    explanation: "ECCS provides high-pressure injection (early phase) and low-pressure injection (later phase) to replace lost coolant and remove decay heat. It includes passive accumulators with borated water that inject upon pressure drop. TMI and Fukushima demonstrated the criticality of sustained ECCS operation.",
    audience: "advanced"
  },
  {
    id: "ns-12",
    topicId: "nuclear-safety",
    question: "The nuclear waste classification system generally uses which categories?",
    options: [
      "Class A, B, C, D (alphabetical by hazard)",
      "Low-level waste (LLW), Intermediate-level waste (ILW), and High-level waste (HLW)",
      "Short-lived, medium-lived, long-lived only",
      "Thermal waste and non-thermal waste"
    ],
    correctIndex: 1,
    explanation: "International waste classification: LLW (protective clothing, tools — disposed in near-surface facilities), ILW (reactor components, resins — requires engineered barriers), HLW (spent fuel, reprocessing liquids — requires deep geological disposal). The IAEA's waste classification system (2009) adds VLLW and VSLW categories.",
    audience: "intermediate"
  },
  {
    id: "ns-13",
    topicId: "nuclear-safety",
    question: "A criticality accident (like Tokaimura 1999) occurs when:",
    options: [
      "A reactor reaches full design power for the first time",
      "A fissile material assembly inadvertently becomes supercritical outside a controlled reactor",
      "The primary loop pressure exceeds design limits",
      "Fuel cladding failure allows fission products into coolant"
    ],
    correctIndex: 1,
    explanation: "The 1999 JCO Tokaimura criticality accident occurred when workers poured excessive quantities of enriched uranium solution into a precipitation tank, creating a prompt critical assembly. Two workers died from acute radiation syndrome. Such accidents are distinct from reactor accidents.",
    audience: "advanced"
  },
  {
    id: "ns-14",
    topicId: "nuclear-safety",
    question: "Finland is a global leader in nuclear waste management because it:",
    options: [
      "Reprocesses all its spent nuclear fuel to eliminate long-lived waste",
      "Has received construction license for Onkalo — the world's first deep geological repository for HLW",
      "Has the highest nuclear waste recycling rate in the world",
      "Uses transmutation to reduce waste radioactivity in 100 years"
    ],
    correctIndex: 1,
    explanation: "Finland's Posiva Oy received a construction license in 2015 for Onkalo ('hiding place'), a deep geological repository in Olkiluoto bedrock at ~400–450 m depth. It is the world's first licensed HLW repository, designed to isolate spent fuel for at least 100,000 years.",
    audience: "intermediate"
  },
  {
    id: "ns-15",
    topicId: "nuclear-safety",
    question: "Probabilistic Risk Assessment (PRA) for nuclear plants involves:",
    options: [
      "Setting regulatory limits based on worker dose statistics",
      "Systematically modeling sequences from initiating events to final outcomes, estimating probabilities and consequences",
      "Random testing of safety systems without advance notice",
      "Calculating the probability that natural disasters will occur near a plant"
    ],
    correctIndex: 1,
    explanation: "PRA uses event trees, fault trees, and human reliability analysis to model accident sequences. It quantifies CDF and LERF, identifies dominant risk contributors, and prioritizes safety improvements. Post-Fukushima, Level 3 PRA (off-site consequences) is increasingly required.",
    audience: "advanced"
  }
];
const nuclearHistoryQuestions = [
  {
    id: "nh-01",
    topicId: "nuclear-history",
    question: "Who discovered radioactivity in 1896?",
    options: [
      "Marie Curie",
      "Ernest Rutherford",
      "Henri Becquerel",
      "Wilhelm Röntgen"
    ],
    correctIndex: 2,
    explanation: "Henri Becquerel discovered natural radioactivity in 1896 when he found that uranium salts emitted radiation that fogged photographic plates even in the dark. He shared the 1903 Nobel Prize in Physics with Pierre and Marie Curie.",
    audience: "beginner"
  },
  {
    id: "nh-02",
    topicId: "nuclear-history",
    question: "Marie Curie was the first person to win two Nobel Prizes. She won them in:",
    options: [
      "Chemistry (1898) and Physics (1911)",
      "Physics (1903) and Chemistry (1911)",
      "Physics (1903) and Medicine (1913)",
      "Chemistry (1903) and Physics (1911)"
    ],
    correctIndex: 1,
    explanation: "Marie Curie shared the 1903 Nobel Prize in Physics (with Becquerel and Pierre Curie) for radiation research, and won the 1911 Nobel Prize in Chemistry for discovering polonium and radium. She remains the only person to win Nobel Prizes in two different sciences.",
    audience: "beginner"
  },
  {
    id: "nh-03",
    topicId: "nuclear-history",
    question: "Lise Meitner's crucial contribution to nuclear physics was:",
    options: [
      "Discovering radioactivity in 1896",
      "Providing the theoretical explanation of nuclear fission in 1938 with Otto Frisch",
      "Building the first nuclear reactor in Chicago",
      "Developing the first nuclear weapon design"
    ],
    correctIndex: 1,
    explanation: "Lise Meitner (with nephew Otto Frisch) provided the theoretical explanation of nuclear fission in late 1938, interpreting the experimental results of Hahn and Strassmann. She coined the term 'fission' using the liquid drop model analogy. She was controversially denied the Nobel Prize.",
    audience: "intermediate"
  },
  {
    id: "nh-04",
    topicId: "nuclear-history",
    question: "Chicago Pile-1 (CP-1), the world's first artificial nuclear reactor, achieved criticality on:",
    options: [
      "August 6, 1945",
      "July 16, 1945",
      "December 2, 1942",
      "June 6, 1944"
    ],
    correctIndex: 2,
    explanation: "CP-1, built under Stagg Field at the University of Chicago by Enrico Fermi's team, achieved the first self-sustaining chain reaction on December 2, 1942 at 2:25 PM. The coded message sent to Washington: 'The Italian navigator has just landed in the new world.'",
    audience: "beginner"
  },
  {
    id: "nh-05",
    topicId: "nuclear-history",
    question: "The Manhattan Project was a secret WWII program that developed the first atomic bombs. It was led by:",
    options: [
      "General Leslie Groves and J. Robert Oppenheimer",
      "President Roosevelt and Secretary Stimson",
      "Enrico Fermi and Niels Bohr",
      "Edward Teller and Klaus Fuchs"
    ],
    correctIndex: 0,
    explanation: "The Manhattan Project (1942–1946) was led administratively by Army General Leslie Groves and scientifically by J. Robert Oppenheimer at Los Alamos. It employed ~130,000 people at sites in Oak Ridge (Tennessee), Hanford (Washington), and Los Alamos (New Mexico).",
    audience: "beginner"
  },
  {
    id: "nh-06",
    topicId: "nuclear-history",
    question: "The first nuclear test, Trinity, took place on July 16, 1945 in:",
    options: [
      "Nevada Test Site",
      "Bikini Atoll, Marshall Islands",
      "Alamogordo, New Mexico (Jornada del Muerto desert)",
      "Los Alamos, New Mexico"
    ],
    correctIndex: 2,
    explanation: "Trinity was detonated at 5:29:45 AM on July 16, 1945, at the Jornada del Muerto desert in New Mexico, producing a yield of ~21 kt TNT equivalent. Oppenheimer famously recalled the Bhagavad Gita: 'Now I am become Death, the destroyer of worlds.'",
    audience: "intermediate"
  },
  {
    id: "nh-07",
    topicId: "nuclear-history",
    question: "The Nautilus (SSN-571) was historically significant because it was:",
    options: [
      "The first nuclear weapon deployed at sea",
      "The world's first nuclear-powered submarine, commissioned in 1954",
      "The first commercial nuclear power plant",
      "The submarine that carried the Manhattan Project scientists"
    ],
    correctIndex: 1,
    explanation: "USS Nautilus (SSN-571) was the world's first operational nuclear-powered vessel, commissioned January 21, 1955. Powered by a Westinghouse S2W reactor, she was the first ship to complete a submerged transiting of the North Pole in 1958.",
    audience: "intermediate"
  },
  {
    id: "nh-08",
    topicId: "nuclear-history",
    question: "The world's first commercial nuclear power plant to generate electricity for a national grid was:",
    options: [
      "Shippingport, Pennsylvania (USA), 1957",
      "Obninsk Nuclear Power Plant (USSR), 1954",
      "Calder Hall, Cumberland (UK), 1956",
      "EBR-1, Idaho (USA), 1951"
    ],
    correctIndex: 1,
    explanation: "Obninsk AES-1 (USSR) began delivering electricity on June 27, 1954, making it the world's first grid-connected nuclear plant (5 MWe). Calder Hall (UK, 1956) was the first industrial-scale nuclear power station. EBR-1 (1951) was the first to generate electricity but not connected to a grid.",
    audience: "intermediate"
  },
  {
    id: "nh-09",
    topicId: "nuclear-history",
    question: "The Nuclear Non-Proliferation Treaty (NPT) entered into force in:",
    options: ["1945", "1963", "1970", "1986"],
    correctIndex: 2,
    explanation: "The NPT opened for signatures on July 1, 1968, and entered into force on March 5, 1970. It has three pillars: non-proliferation, disarmament, and peaceful use of nuclear energy. 191 states are parties. India, Pakistan, Israel, and North Korea are not members.",
    audience: "intermediate"
  },
  {
    id: "nh-10",
    topicId: "nuclear-history",
    question: "Otto Hahn and Fritz Strassmann's 1938 experiment demonstrated fission by:",
    options: [
      "Bombarding uranium with alpha particles and detecting helium",
      "Bombarding uranium with neutrons and identifying barium in the products",
      "Splitting a uranium nucleus with a particle accelerator",
      "Observing spontaneous fission of uranium-235"
    ],
    correctIndex: 1,
    explanation: "Hahn and Strassmann bombarded uranium with slow neutrons in December 1938 and chemically identified barium (Z=56) in the products — an element far lighter than uranium. This was inexplicable by classical nuclear reactions and led Meitner and Frisch to propose fission.",
    audience: "intermediate"
  },
  {
    id: "nh-11",
    topicId: "nuclear-history",
    question: "James Chadwick discovered the neutron in 1932 using which method?",
    options: [
      "Observing beta decay of hydrogen",
      "Bombarding beryllium with alpha particles and detecting neutral particles by proton recoil",
      "Splitting uranium with a cyclotron",
      "Measuring charge-to-mass ratio in a magnetic field"
    ],
    correctIndex: 1,
    explanation: "Chadwick (1932) bombarded beryllium with alpha particles from polonium: ⁴He + ⁹Be → ¹²C + n. The neutral particles ejected protons from paraffin wax. By measuring proton recoil energies, he determined the neutron mass, earning the 1935 Nobel Prize.",
    audience: "intermediate"
  },
  {
    id: "nh-12",
    topicId: "nuclear-history",
    question: "The Partial Nuclear Test Ban Treaty (PTBT, 1963) prohibited nuclear tests in:",
    options: [
      "Underground locations only",
      "Atmosphere, outer space, and under water (all environments except underground)",
      "All environments including underground",
      "Allied nations' territories only"
    ],
    correctIndex: 1,
    explanation: "The PTBT (signed August 5, 1963) banned nuclear tests in the atmosphere, underwater, and in outer space — driven by public health concerns over radioactive fallout. Underground tests continued until the Comprehensive Nuclear-Test-Ban Treaty (CTBT) was adopted in 1996.",
    audience: "intermediate"
  },
  {
    id: "nh-13",
    topicId: "nuclear-history",
    question: "Ernest Rutherford's gold foil experiment (1909–1911) revealed that:",
    options: [
      "Atoms contain electrons distributed throughout a positive 'plum pudding' of charge",
      "Most atomic mass is concentrated in a small, dense, positively charged nucleus",
      "The electron has a negative charge",
      "Protons and neutrons are composite particles"
    ],
    correctIndex: 1,
    explanation: "When Geiger and Marsden (under Rutherford) fired alpha particles at gold foil, most passed through, but some deflected at large angles — even back. Rutherford concluded: the atom is mostly empty space with a tiny, dense, positive nucleus. The Thomson 'plum pudding' model was overturned.",
    audience: "beginner"
  },
  {
    id: "nh-14",
    topicId: "nuclear-history",
    question: "The Einstein–Szilard letter (1939) to President Roosevelt led directly to:",
    options: [
      "US entry into World War II",
      "The creation of the Advisory Committee on Uranium, eventually leading to the Manhattan Project",
      "The development of the hydrogen bomb",
      "The founding of the IAEA"
    ],
    correctIndex: 1,
    explanation: "Szilard drafted and Einstein signed the letter (dated August 2, 1939) warning Roosevelt that Germany might develop an atomic bomb and urging US research. Roosevelt established the Advisory Committee on Uranium (Briggs Committee), which eventually became the Manhattan Project.",
    audience: "intermediate"
  },
  {
    id: "nh-15",
    topicId: "nuclear-history",
    question: "The Atoms for Peace program, launched by President Eisenhower in 1953, proposed:",
    options: [
      "Complete nuclear disarmament by all nations within 10 years",
      "International sharing of nuclear technology for peaceful purposes (energy, medicine, research) under IAEA oversight",
      "A treaty banning nuclear weapons from space",
      "Direct US assistance to rebuild Japan's nuclear infrastructure"
    ],
    correctIndex: 1,
    explanation: "Eisenhower's December 8, 1953 UN speech proposed that nuclear nations contribute fissile material to an international pool under IAEA oversight for peaceful applications — nuclear power, medicine, agriculture. It led directly to the founding of the IAEA in 1957.",
    audience: "intermediate"
  }
];
const advancedTopicsQuestions = [
  {
    id: "at-01",
    topicId: "advanced-topics",
    question: "ITER (International Thermonuclear Experimental Reactor) in France aims to demonstrate:",
    options: [
      "The first commercial fusion power plant producing 1 GW",
      "Fusion burning plasma with Q ≥ 10 (10× more power out than in)",
      "A working tritium breeding blanket for commercial reactors",
      "Magnetic confinement of plasma using superconducting mirrors"
    ],
    correctIndex: 1,
    explanation: "ITER's goal is to achieve Q ≥ 10 in a D-T fusion plasma (producing 500 MW from 50 MW heating input) — the first fusion experiment to demonstrate net fusion energy gain. It is a tokamak design and is not designed to produce electricity.",
    audience: "intermediate"
  },
  {
    id: "at-02",
    topicId: "advanced-topics",
    question: "The National Ignition Facility (NIF) at Lawrence Livermore achieved fusion ignition in 2022. Their approach uses:",
    options: [
      "Tokamak magnetic confinement of D-T plasma",
      "Inertial confinement fusion (ICF) — 192 lasers compressing a D-T pellet to extreme density and temperature",
      "Muon-catalyzed fusion at room temperature",
      "Z-pinch plasma compression with high-current pulsed power"
    ],
    correctIndex: 1,
    explanation: "NIF's 192-beam laser system delivers 2.05 MJ to a gold hohlraum, generating X-rays that implode a D-T pellet. In December 2022, NIF achieved ignition (fusion energy output > laser energy delivered to the target: ~3.15 MJ output from 2.05 MJ input). This was a landmark scientific milestone.",
    audience: "intermediate"
  },
  {
    id: "at-03",
    topicId: "advanced-topics",
    question: "In PET (Positron Emission Tomography) scanning, the tracer ¹⁸F-FDG works because:",
    options: [
      "¹⁸F emits gamma rays that penetrate the body and are detected externally",
      "¹⁸F decays by β⁺ emission; the positron annihilates with an electron to produce two 511 keV gamma rays detected in coincidence",
      "FDG is selectively taken up by bones and imaged by X-ray fluorescence",
      "¹⁸F is paramagnetic and enhances MRI signal in tumors"
    ],
    correctIndex: 1,
    explanation: "¹⁸F (T₁/₂ = 110 min) undergoes β⁺ decay. The emitted positron travels ~1–2 mm before annihilating with an electron, producing two 511 keV gamma photons emitted at ~180°. PET cameras detect these coincident gammas to reconstruct 3D metabolic activity maps.",
    audience: "intermediate",
    equation: "e^+ + e^- \\rightarrow 2\\gamma \\text{ (511 keV each)}"
  },
  {
    id: "at-04",
    topicId: "advanced-topics",
    question: "Technetium-99m (⁹⁹ᵐTc) is the most widely used medical diagnostic isotope because it has:",
    options: [
      "A very long half-life (50 years) for stable imaging",
      "A 6-hour half-life and 140 keV gamma energy ideal for gamma cameras, produced on-site from Mo-99 generators",
      "Pure alpha emission for internal radiation therapy",
      "High yield from U-235 fission, making it cheap to produce"
    ],
    correctIndex: 1,
    explanation: "⁹⁹ᵐTc (T₁/₂ = 6.01 h) emits a 140 keV gamma (ideal for Anger cameras — not too soft to be absorbed, not too hard to collimate). It is produced from ⁹⁹Mo (T₁/₂ = 66 h) using 'moly generators' — effectively a technetium 'cow' milked daily at hospitals.",
    audience: "advanced"
  },
  {
    id: "at-05",
    topicId: "advanced-topics",
    question: "Boron Neutron Capture Therapy (BNCT) is a cancer treatment that works by:",
    options: [
      "Injecting boron nanoparticles that block tumor blood vessels",
      "Delivering ¹⁰B to tumor cells, then irradiating with thermal neutrons — the ¹⁰B(n,α)⁷Li reaction deposits energy locally",
      "Using boron as a radiation sensitizer for conventional X-ray therapy",
      "Implanting boron-coated seeds that emit alpha particles continuously"
    ],
    correctIndex: 1,
    explanation: "BNCT exploits the large thermal neutron cross-section of ¹⁰B (3838 b). When ¹⁰B-labeled drugs (like BSH or BPA) concentrate in tumors and are irradiated by thermal neutrons, the ¹⁰B(n,α)⁷Li reaction releases ~2.79 MeV deposited within ~10 μm — killing the tumor cell while sparing adjacent tissue.",
    audience: "advanced"
  },
  {
    id: "at-06",
    topicId: "advanced-topics",
    question: "Molten Salt Reactors (MSRs, a Gen IV concept) offer potential advantages including:",
    options: [
      "Higher neutron energy than conventional reactors",
      "Liquid fuel allows online refueling and fission product removal; strongly negative temperature coefficient",
      "No radioactive waste production",
      "Can operate without any moderator or neutron reflector"
    ],
    correctIndex: 1,
    explanation: "MSRs dissolve fissile material in a molten fluoride salt (e.g., FLiBe). Advantages: online refueling without shutdown, continuous removal of gaseous fission products (reducing poison buildup), strongly negative temperature coefficient (thermal expansion reduces criticality), and atmospheric pressure operation.",
    audience: "advanced"
  },
  {
    id: "at-07",
    topicId: "advanced-topics",
    question: "The effective dose coefficient (dose per unit intake) for ²³⁹Pu by inhalation is much higher than for most other nuclides because:",
    options: [
      "Plutonium is denser than other metals and deposits more energy",
      "²³⁹Pu is an alpha emitter with long biological retention in bone and liver, giving high committed dose",
      "Plutonium produces more gamma rays than beta emitters",
      "Inhaled plutonium is exhaled within 24 hours"
    ],
    correctIndex: 1,
    explanation: "²³⁹Pu (T₁/₂ = 24,100 years) is an alpha emitter (wR=20) that, when inhaled, deposits in lung and translocates to bone and liver with long biological half-lives (decades). Committed effective dose coefficient: ~5×10⁻⁵ Sv/Bq inhaled — among the highest of any radionuclide.",
    audience: "advanced"
  },
  {
    id: "at-08",
    topicId: "advanced-topics",
    question: "Accelerator-Driven Systems (ADS) combine a particle accelerator with a subcritical reactor to:",
    options: [
      "Produce more fuel than they consume (breeding)",
      "Transmute long-lived actinides and fission products from HLW into shorter-lived nuclides",
      "Operate at higher thermal efficiency than critical reactors",
      "Generate neutrons for fusion ignition"
    ],
    correctIndex: 1,
    explanation: "ADS (proposed by Carlo Rubbia, 1993) use an accelerator to provide spallation neutrons to a subcritical assembly. The subcritical design enhances safety (shuts down if beam stops). The fast neutron spectrum transmutes minor actinides (Am, Cm, Np) and long-lived fission products, reducing HLW volume and toxicity.",
    audience: "advanced"
  },
  {
    id: "at-09",
    topicId: "advanced-topics",
    question: "The radiation dosimetry quantity 'committed effective dose' accounts for:",
    options: [
      "Only external radiation doses received in one year",
      "All doses to be received over 50 years (adult) or 70 years (child) after an intake of radioactive material",
      "The dose received from a single diagnostic X-ray",
      "Worker doses over a 5-year averaging period"
    ],
    correctIndex: 1,
    explanation: "Committed effective dose E(τ) is the sum of committed equivalent doses in all organs, weighted by tissue weighting factors, over time τ = 50 years for adults, 70 years for children. It captures the full dose from internally deposited radionuclides in a single number.",
    audience: "advanced"
  },
  {
    id: "at-10",
    topicId: "advanced-topics",
    question: "Stellarators differ from tokamaks (like ITER) primarily in:",
    options: [
      "Using inertial rather than magnetic confinement",
      "Using external coils to create a twisted magnetic field without needing a plasma current",
      "Operating at much higher plasma temperatures",
      "Using deuterium-helium-3 rather than D-T fusion"
    ],
    correctIndex: 1,
    explanation: "Tokamaks require a toroidal plasma current (driven by transformer action) to create the helical field needed for stability — this current can be disruptive. Stellarators (like Wendelstein 7-X) use complex external coils to create the twisted field externally, enabling steady-state operation without disruptions.",
    audience: "advanced"
  },
  {
    id: "at-11",
    topicId: "advanced-topics",
    question: "The thorium fuel cycle is attractive because:",
    options: [
      "Thorium is fissile and can sustain a chain reaction directly",
      "²³²Th breeds ²³³U (fissile) via neutron capture and beta decay; thorium is ~3× more abundant than uranium",
      "Thorium produces no long-lived actinides as waste",
      "Thorium reactors operate at room temperature"
    ],
    correctIndex: 1,
    explanation: "²³²Th (fertile) + n → ²³³Th →(β⁻)→ ²³³Pa →(β⁻)→ ²³³U (fissile, T₁/₂=159,200 y). Thorium is ~3× as abundant as uranium and produces less transuranics in the waste stream. India and China have active thorium reactor R&D programs.",
    audience: "advanced",
    equation: "^{232}\\text{Th} + n \\rightarrow ^{233}\\text{Th} \\xrightarrow{\\beta^-} ^{233}\\text{Pa} \\xrightarrow{\\beta^-} ^{233}\\text{U}"
  },
  {
    id: "at-12",
    topicId: "advanced-topics",
    question: "The concept of 'breed-and-burn' reactors (like TerraPower's TWR) aims to:",
    options: [
      "Produce both fissile material and electricity simultaneously, exporting fuel to other reactors",
      "Breed ²³⁹Pu from ²³⁸U in-situ and burn it without reprocessing, using natural or depleted uranium as fuel",
      "Use breeding in a blanket while burning only imported enriched uranium in the core",
      "Burn HLW from LWRs and breed tritium for fusion"
    ],
    correctIndex: 1,
    explanation: "Breed-and-burn (or 'traveling wave') reactors use a neutron wave that breeds ²³⁹Pu from ²³⁸U ahead of the wave and burns it as the wave propagates. This could run on depleted uranium (vast existing stocks) without enrichment or reprocessing — potentially transformative for fuel sustainability.",
    audience: "advanced"
  },
  {
    id: "at-13",
    topicId: "advanced-topics",
    question: "Nuclear batteries (radioisotope thermoelectric generators — RTGs) power deep space missions because they:",
    options: [
      "Can be refueled in space using solar collectors",
      "Convert decay heat from ²³⁸PuO₂ into electricity via thermoelectrics — lasting decades without sunlight",
      "Use nuclear fission to generate power at low weight",
      "Produce electricity from cosmic ray interactions with uranium"
    ],
    correctIndex: 1,
    explanation: "RTGs (e.g., MMRTG on Curiosity and Perseverance) use ²³⁸PuO₂ (T₁/₂=87.7 yr, α emitter). Heat from alpha decay is converted by silicon-germanium or BiTe thermoelectrics. Voyager's RTGs have operated for 47+ years, providing ~4 W still — essential beyond ~3 AU where solar panels become impractical.",
    audience: "intermediate"
  },
  {
    id: "at-14",
    topicId: "advanced-topics",
    question: "Radiation hardening of electronics (for space/military applications) addresses the problem that:",
    options: [
      "Radiation causes physical shattering of microchips",
      "Ionizing radiation deposits charge in semiconductor oxide layers and causes single-event upsets in memory cells",
      "Radiation heats electronics above operating temperature",
      "Radiation causes electromagnetic interference in circuits"
    ],
    correctIndex: 1,
    explanation: "Two main radiation effects in electronics: (1) Total Ionizing Dose (TID) — charge buildup in gate oxides shifts transistor thresholds; (2) Single-Event Effects (SEE) — a single heavy ion or proton can flip a memory bit (SEU), latch up a circuit, or cause destructive burnout. Radiation-hardened chips use SOI, triple modular redundancy, and specialized layouts.",
    audience: "advanced"
  },
  {
    id: "at-15",
    topicId: "advanced-topics",
    question: "The recently emerging field of nuclear microreactors (< 10 MWe) targets applications such as:",
    options: [
      "Replacing large grid-scale nuclear plants in urban areas",
      "Remote military bases, disaster response, off-grid communities, and space propulsion",
      "Powering aircraft and ships larger than submarines",
      "Providing peak power to existing nuclear plant sites"
    ],
    correctIndex: 1,
    explanation: "Nuclear microreactors (1 kWe to 10 MWe) being developed by companies like Westinghouse (eVinci), X-energy, and USNC target remote communities in Alaska/Canada, military forward operating bases (Project Pele), disaster response, and ultimately nuclear thermal propulsion for Mars missions.",
    audience: "intermediate"
  }
];
const quizTopics = [
  {
    id: "atomic-structure",
    title: "Atomic Structure & Isotopes",
    description: "Protons, neutrons, nuclear radius, binding energy, isotopes, and the chart of nuclides.",
    icon: "Atom",
    color: "text-cyan-400",
    relatedRoute: "/basics/atom-structure",
    questions: atomicStructureQuestions
  },
  {
    id: "radioactivity",
    title: "Radioactivity & Decay",
    description: "Alpha, beta, gamma decay, half-life, decay law, activity, decay chains, and Q-values.",
    icon: "Radiation",
    color: "text-amber-400",
    relatedRoute: "/basics/radioactivity",
    questions: radioactivityQuestions
  },
  {
    id: "nuclear-reactions",
    title: "Nuclear Reactions",
    description: "Fission, fusion, neutron cross-sections, criticality, chain reactions, and energy release.",
    icon: "Zap",
    color: "text-yellow-400",
    relatedRoute: "/reactions/fission",
    questions: nuclearReactionsQuestions
  },
  {
    id: "reactor-types",
    title: "Reactor Types & Design",
    description: "PWR, BWR, CANDU, Gen IV, SMRs, moderation, safety systems, and fuel cycles.",
    icon: "Factory",
    color: "text-emerald-400",
    relatedRoute: "/reactors/pwr",
    questions: reactorTypesQuestions
  },
  {
    id: "radiation-biology",
    title: "Radiation & Biology",
    description: "LET, dose units (Gy, Sv), RBE, ALARA, biological effects, and radiation protection.",
    icon: "HeartPulse",
    color: "text-rose-400",
    relatedRoute: "/radiation/types",
    questions: radiationBiologyQuestions
  },
  {
    id: "nuclear-safety",
    title: "Nuclear Safety & Regulation",
    description: "Defense-in-depth, INES scale, TMI, Chernobyl, Fukushima, IAEA, NRC, and waste management.",
    icon: "ShieldCheck",
    color: "text-sky-400",
    relatedRoute: "/safety/principles",
    questions: nuclearSafetyQuestions
  },
  {
    id: "nuclear-history",
    title: "Nuclear History",
    description: "Manhattan Project, key figures (Curie, Fermi, Meitner), first reactor, and nuclear milestones.",
    icon: "BookOpen",
    color: "text-purple-400",
    relatedRoute: "/history/timeline",
    questions: nuclearHistoryQuestions
  },
  {
    id: "advanced-topics",
    title: "Advanced Topics",
    description: "Gen IV reactors, SMRs, ITER/NIF fusion, nuclear medicine, dosimetry, and emerging technologies.",
    icon: "FlaskConical",
    color: "text-violet-400",
    relatedRoute: "/reactors/advanced",
    questions: advancedTopicsQuestions
  }
];
const MAX_HISTORY = 50;
const useLearningStore = create()(
  persist(
    (set, get) => ({
      topicProgress: {},
      quizHistory: [],
      syncStatus: "idle",
      lastSyncTimestamp: null,
      setProgress: (topicId, topicTitle, result) => {
        set((state) => {
          const existing = state.topicProgress[topicId];
          const updated = {
            bestScore: existing ? Math.max(existing.bestScore, result.score) : result.score,
            attempts: existing ? existing.attempts + 1 : 1,
            questionsAttempted: result.questionsAttempted,
            lastAttempt: result.dateTaken
          };
          const historyEntry = {
            topicId,
            topicTitle,
            score: result.score,
            attempts: updated.attempts,
            questionsAttempted: result.questionsAttempted,
            completedAt: new Date(result.dateTaken).getTime(),
            durationSeconds: result.durationSeconds ?? 0
          };
          const newHistory = [historyEntry, ...state.quizHistory].slice(
            0,
            MAX_HISTORY
          );
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: updated
            },
            quizHistory: newHistory
          };
        });
      },
      resetProgress: () => set({
        topicProgress: {},
        quizHistory: [],
        syncStatus: "idle",
        lastSyncTimestamp: null
      }),
      resetTopicProgress: (topicId) => {
        set((state) => {
          const { [topicId]: _removed, ...rest } = state.topicProgress;
          return {
            topicProgress: rest,
            quizHistory: state.quizHistory.filter((h) => h.topicId !== topicId)
          };
        });
      },
      getTopicProgress: (topicId) => {
        return get().topicProgress[topicId];
      },
      setSyncStatus: (status, timestamp) => {
        set({
          syncStatus: status,
          ...timestamp !== void 0 ? { lastSyncTimestamp: timestamp } : {}
        });
      }
    }),
    { name: "nuclear-lab-progress" }
  )
);
export {
  ArrowRight as A,
  Trophy as T,
  quizTopics as q,
  useLearningStore as u
};
