import { j as jsxRuntimeExports } from "./index-DHpNeWFA.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DjzxfwqO.js";
import { C as CitationMarker } from "./CitationMarker-faPAFJpJ.js";
import { C as CollapsibleSection } from "./CollapsibleSection-C-WYJXLb.js";
import { E as EquationBlock } from "./EquationBlock-NVyAdYzd.js";
import { S as SectionCard } from "./SectionCard-Dum9xY4U.js";
import { u as u238DecayChain } from "./decayChain-CwO6tbOq.js";
const decayTypes = [
  {
    type: "Alpha (α)",
    description: "Emission of a helium-4 nucleus (2 protons, 2 neutrons). Occurs in heavy nuclei (A > 150). Least penetrating — stopped by paper or skin. Internally highly dangerous.",
    example: "²³⁸U → ²³⁴Th + ⁴He",
    color: "text-rose-400 border-rose-400/30 bg-rose-400/5"
  },
  {
    type: "Beta-minus (β⁻)",
    description: "A neutron converts to a proton, emitting an electron (β⁻ particle) and an electron antineutrino. Increases Z by 1, N decreases by 1.",
    example: "¹⁴C → ¹⁴N + e⁻ + ν̄ₑ",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/5"
  },
  {
    type: "Beta-plus (β⁺)",
    description: "A proton converts to a neutron, emitting a positron and an electron neutrino. Decreases Z by 1. The positron annihilates with an electron to produce two 511 keV gamma photons — the basis of PET imaging.",
    example: "¹⁸F → ¹⁸O + e⁺ + νₑ",
    color: "text-amber-400 border-amber-400/30 bg-amber-400/5"
  },
  {
    type: "Gamma (γ)",
    description: "High-energy photon emitted when an excited nucleus transitions to a lower energy state. Does not change Z or N. Highly penetrating — requires dense shielding (lead, concrete).",
    example: "⁹⁹ᵐTc → ⁹⁹Tc + γ (140 keV)",
    color: "text-purple-400 border-purple-400/30 bg-purple-400/5"
  }
];
const betaTransitions = [
  {
    order: "Superallowed",
    deltaJ: "0 (0⁺→0⁺)",
    deltaPi: "No",
    ft: "~3000 s",
    example: "¹⁴O→¹⁴N, ²⁶Al→²⁶Mg"
  },
  {
    order: "Allowed",
    deltaJ: "0, 1",
    deltaPi: "No",
    ft: "10³–10⁶ s",
    example: "n→p, ¹⁴C→¹⁴N"
  },
  {
    order: "1st Forbidden",
    deltaJ: "0, 1, 2",
    deltaPi: "Yes",
    ft: "10⁶–10⁹ s",
    example: "⁹⁰Sr→⁹⁰Y, ¹³⁷Cs→¹³⁷Ba"
  },
  {
    order: "2nd Forbidden",
    deltaJ: "2, 3",
    deltaPi: "No",
    ft: "10¹³–10¹⁶ s",
    example: "²²Na→²²Ne, ⁶⁰Co→⁶⁰Ni"
  },
  {
    order: "3rd Forbidden",
    deltaJ: "3, 4",
    deltaPi: "Yes",
    ft: ">10¹⁹ s",
    example: "⁸⁷Rb→⁸⁷Sr (T½=49 Gyr)"
  }
];
const gammaTable = [
  {
    type: "E1 (Electric dipole)",
    deltaJ: "1",
    parity: "Yes",
    typical: "~10⁻¹⁶ s",
    example: "Most γ transitions in medium nuclei"
  },
  {
    type: "M1 (Magnetic dipole)",
    deltaJ: "1",
    parity: "No",
    typical: "~10⁻¹⁴ s",
    example: "⁵⁷Fe (14.4 keV Mössbauer)"
  },
  {
    type: "E2 (Electric quadrupole)",
    deltaJ: "2",
    parity: "No",
    typical: "~10⁻¹² s",
    example: "Rotational transitions in deformed nuclei"
  },
  {
    type: "M2 (Magnetic quadrupole)",
    deltaJ: "2",
    parity: "Yes",
    typical: "~10⁻⁸ s",
    example: "Rare, often competes with IC"
  },
  {
    type: "E0 (Monopole)",
    deltaJ: "0",
    parity: "No",
    typical: "IC only",
    example: "⁷²Ge isomers, ⁰⁺→⁰⁺ transitions"
  },
  {
    type: "IT (Isomeric)",
    deltaJ: "Large (≥4)",
    parity: "Yes",
    typical: "ms–yr",
    example: "⁹⁹ᵐTc (M4, T½=6.01 h)"
  }
];
const gammaDoseConstants = [
  {
    nuclide: "Co-60",
    gamma_keV: "1173 + 1333",
    Gamma: "3.09 × 10⁻¹³ Gy·m²/(Bq·s)",
    note: "High energy; requires thick Pb shielding"
  },
  {
    nuclide: "Cs-137",
    gamma_keV: "662",
    Gamma: "7.74 × 10⁻¹⁴ Gy·m²/(Bq·s)",
    note: "Common industrial/medical calibration source"
  },
  {
    nuclide: "Ir-192",
    gamma_keV: "317–612 (complex)",
    Gamma: "1.10 × 10⁻¹³ Gy·m²/(Bq·s)",
    note: "HDR brachytherapy; ~15 dominant lines"
  }
];
function Radioactivity() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Radioactivity",
        subtitle: "The spontaneous transformation of an unstable nucleus — releasing energy as radiation and transmuting one element into another.",
        audienceLevel: "beginner",
        readTimeMin: 25
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "radioactivity.intro_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "What Is Radioactivity?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "In 1896, Henri Becquerel discovered that uranium compounds spontaneously emit radiation without any external energy input. Marie and Pierre Curie subsequently isolated polonium and radium, coining the term ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "radioactivity" }),
          ". We now understand this as: nuclei with unfavorable proton-to-neutron ratios are energetically unstable and spontaneously transform toward stability, emitting radiation in the process."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "radioactivity.law_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "The Radioactive Decay Law" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Radioactive decay is a statistical quantum process — any individual nucleus may decay at any moment, but for a large population the rate is precisely predictable:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "N(t) = N_0 \\cdot e^{-\\lambda t}",
            annotation: "The number of nuclei N(t) at time t equals the initial number N₀ times e to the power of minus λt, where λ is the decay constant.",
            label: "Exponential Decay"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}",
            annotation: "The half-life T½ is the time for half the nuclei to decay. It equals the natural log of 2 divided by the decay constant λ.",
            label: "Half-life Definition"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "\\tau = \\frac{1}{\\lambda} = \\frac{T_{1/2}}{\\ln 2} \\approx 1.443\\,T_{1/2}",
            annotation: "Mean lifetime τ: the average time a nucleus survives before decaying. It is longer than T½ by factor 1/ln2 ≈ 1.443. At t = τ, N(τ) = N₀/e ≈ 0.368 N₀ (36.8% remain). Mean lifetime is useful in relativistic contexts (muon decay, pion decay).",
            label: "Mean Lifetime"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Activity A = λN [Bq] decreases at the same exponential rate as N(t). After n half-lives: A(nT½) = A₀/2ⁿ. After 10 half-lives, only 1/1024 ≈ 0.1% of initial activity remains." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          "aria-label": "Types of radioactive decay",
          "data-ocid": "radioactivity.types_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Types of Decay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: decayTypes.map((dt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-xl border p-4 ${dt.color}`,
                "data-ocid": `radioactivity.decay_type_${dt.type.split(" ")[0].toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-2", children: dt.type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: dt.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono bg-muted/50 rounded px-2 py-0.5", children: dt.example })
                ]
              },
              dt.type
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "radioactivity.chain_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Decay Chain: U-238 → Pb-206" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
          "A single heavy nucleus often undergoes multiple successive decays before reaching a stable configuration. Uranium-238 transforms through 14 steps over billions of years before reaching stable Lead-206. The total energy released by the complete chain is approximately ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "47.4 MeV" }),
          " ",
          "— each step listed with its Q-value below."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-xs",
            "aria-label": "U-238 decay chain steps",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "#" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Nuclide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Daughter" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Half-life" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Q (MeV)" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: u238DecayChain.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-muted-foreground/60", children: step.stepIndex }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono font-medium text-foreground", children: step.nuclide }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold ${step.decayMode === "alpha" ? "text-rose-400" : step.decayMode === "stable" ? "text-emerald-400" : "text-blue-400"}`,
                    children: step.decayMode
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: step.daughter }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: step.halfLifeStr }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 font-mono text-muted-foreground/80", children: step.Qvalue_MeV > 0 ? step.Qvalue_MeV.toFixed(4) : "—" })
              ] }, step.stepIndex)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground italic", children: [
          "Data: ENSDF/NNDC, Brookhaven National Laboratory.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-gamow",
          title: "Alpha Decay Theory: Gamow Tunneling",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "radioactivity.gamow_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "The alpha particle (⁴He nucleus) is preformed as a cluster inside the parent nucleus, held in a potential well by the attractive strong nuclear force. Outside the nuclear surface, the repulsive Coulomb barrier rises steeply to a height of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "30–40 MeV" }),
              " for heavy nuclei like uranium — yet Q_α is only 4–6 MeV. Classically, the alpha particle ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "cannot escape" }),
              ". Quantum mechanically, it has a small but non-zero probability of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "tunnelling through" }),
              " the Coulomb barrier. This was the first successful application of quantum mechanics to nuclear physics (Gamow; Condon and Gurney, 1928).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 11 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Q-value of Alpha Decay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "The Q-value is the net energy released, computed from atomic masses (electron masses cancel correctly when using atomic, not nuclear, masses):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "Q_\\alpha = \\bigl[M(Z,A) - M(Z{-}2,A{-}4) - M({}^4\\text{He})\\bigr] \\times 931.5\\ \\text{MeV/u}",
                annotation: "All three masses in atomic mass units (u). If Q_α > 0, the decay is energetically allowed. The alpha particle carries kinetic energy T_α = Q_α × (A−4)/A, and the daughter recoils with T_recoil = Q_α × 4/A.",
                label: "Alpha Decay Q-value"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "T_\\alpha = Q_\\alpha \\cdot \\frac{A-4}{A}, \\quad T_{\\rm recoil} = Q_\\alpha \\cdot \\frac{4}{A}",
                annotation: "Two-body kinematics. For U-238 (A=238, Q=4.270 MeV): T_α = 4.270 × 234/238 = 4.198 MeV; T_recoil = 4.270 × 4/238 = 0.072 MeV. The 72 keV Th-234 recoil is enough to displace ~100 atoms in a crystal lattice.",
                label: "Alpha Kinematic Energies"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "The Gamow Factor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "The tunnelling probability is determined by the Gamow factor G, derived from WKB approximation of the Schrödinger equation through the Coulomb barrier:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "G = \\sqrt{\\frac{2\\mu}{\\hbar^2}} \\int_{R_n}^{R_C} \\sqrt{V_C(r) - Q_\\alpha} \\, dr",
                annotation: "G is the Gamow integral. μ = reduced mass of alpha+daughter system, R_n = nuclear surface radius (≈1.2 A^(1/3) fm), R_C = classical turning point where V_C(r) = Q_α. Larger G → slower tunnelling → exponentially longer half-life.",
                label: "Gamow Tunnelling Integral (WKB)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "T_{1/2} \\propto e^{+2\\pi\\eta}, \\quad \\eta = \\frac{Z_d \\cdot 2e^2}{\\hbar v_\\alpha}",
                annotation: "η = Sommerfeld parameter (dimensionless). v_α = velocity of emitted alpha. Z_d = daughter charge (Z−2). Higher Z_d or lower v_α (lower Q) increases η and exponentially increases T½. This is the exact result from integrating the Coulomb barrier analytically.",
                label: "Gamow-Sommerfeld Half-life"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "The Geiger-Nuttall Law" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Empirically discovered in 1911 by Geiger and Nuttall, before quantum mechanics existed:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\log_{10}(T_{1/2}) \\approx \\frac{a}{\\sqrt{Q_\\alpha}} + b",
                annotation: "Log of half-life is proportional to 1/√Q. Higher Q → shorter half-life, exponentially. Constants a, b depend on Z. This directly follows from the Gamow calculation.",
                label: "Geiger-Nuttall Law"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 bg-muted/30 rounded-lg p-4 text-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "Dramatic Range of Alpha Half-lives" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Q_α (MeV)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "T½" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Range in air" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                  {
                    n: "Th-232",
                    Q: "4.083",
                    t: "1.40×10¹⁰ yr",
                    r: "~2.5 cm"
                  },
                  { n: "U-238", Q: "4.270", t: "4.47×10⁹ yr", r: "~2.8 cm" },
                  { n: "U-235", Q: "4.679", t: "7.04×10⁸ yr", r: "~3.0 cm" },
                  { n: "Ra-226", Q: "4.871", t: "1600 yr", r: "~3.3 cm" },
                  { n: "Po-210", Q: "5.407", t: "138.4 d", r: "~3.9 cm" },
                  { n: "Po-214", Q: "7.834", t: "164.3 μs", r: "~6.9 cm" },
                  { n: "Po-212", Q: "8.954", t: "0.299 μs", r: "~8.6 cm" }
                ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono font-medium text-foreground", children: r.n }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: r.Q }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3", children: r.t }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1", children: r.r })
                ] }, r.n)) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 italic text-xs text-muted-foreground", children: [
                "Q varies by only ×2 (4–9 MeV), yet T½ spans",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "29 orders of magnitude" }),
                ". This is the exponential power of Gamow tunnelling.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Fine Structure of Alpha Spectra" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-3", children: [
              "Alpha energy spectra are ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "discrete" }),
              " (not continuous), since the alpha particle carries away a precise fraction of Q while the daughter recoils. Multiple discrete lines correspond to population of different excited states of the daughter nucleus."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Ra-226 alpha spectrum:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "α₀: 4.784 MeV (94.9%) → Rn-222 ground state (0⁺)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "α₁: 4.601 MeV (5.1%) → Rn-222 first excited state (2⁺, 186 keV)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "→ followed immediately by 186 keV E2 gamma from Rn-222" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "The doubly-magic nature of ⁴He (Z=2, N=2) explains why the alpha cluster is preferentially emitted rather than, say, a proton or tritium. The alpha particle's high binding energy (28.3 MeV) contributes directly to the positive Q-value for most heavy nuclei." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-beta",
          title: "Beta Decay: Fermi Theory and Neutrinos",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "radioactivity.beta_theory_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Beta decay involves conversion of a nucleon type, governed by the weak nuclear force. Three modes exist, each governed by slightly different kinematics:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3 mb-4", children: [
              {
                mode: "β⁻ decay",
                eq: "n → p + e⁻ + ν̄ₑ",
                color: "border-blue-400/30 bg-blue-400/5",
                constraint: "Q_{β⁻} = [M(Z,A) − M(Z+1,A)]c² > 0",
                note: "Neutron-rich nuclei; increases Z by 1. Excess mass goes to products."
              },
              {
                mode: "β⁺ decay",
                eq: "p → n + e⁺ + νₑ",
                color: "border-amber-400/30 bg-amber-400/5",
                constraint: "Q_{β⁺} = [M(Z,A) − M(Z−1,A) − 2mₑ]c² > 0",
                note: "Requires Q > 1.022 MeV (energy for two electron masses). Proton-rich nuclei."
              },
              {
                mode: "Electron Capture",
                eq: "p + e⁻ → n + νₑ",
                color: "border-emerald-400/30 bg-emerald-400/5",
                constraint: "Q_{EC} = [M(Z,A) − M(Z−1,A)]c² > 0",
                note: "Competes with β⁺. Always possible when β⁺ occurs; only mode when 0 < Q < 1.022 MeV."
              }
            ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border p-3 text-sm ${m.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: m.mode }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs mb-2", children: m.eq }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-mono", children: m.constraint }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: m.note })
                ]
              },
              m.mode
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "The Pauli Neutrino Hypothesis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-4", children: [
              "Before 1930, beta spectra appeared to violate energy conservation — electrons were emitted with a ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "continuous" }),
              ' energy distribution from 0 to Q_β, not a single discrete energy (as expected for a two-body decay). Wolfgang Pauli proposed in a famous 1930 letter ("Dear radioactive ladies and gentlemen") that an undetected neutral particle (the neutrino, ν) carries away the missing energy. Enrico Fermi formalised this in 1934, and the electron (anti)neutrino was experimentally confirmed by Reines and Cowan in 1956 (Nobel Prize 1995).',
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 12 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "Q_{\\beta^-} = [M(Z,A) - M(Z+1,A)]c^2",
                annotation: "Q for β⁻ decay uses atomic masses M (including all electrons). The mass difference converts directly to kinetic energy shared between the electron and antineutrino. Q_β⁺ requires an additional −2m_e c² = −1.022 MeV for positron mass creation.",
                label: "β⁻ Q-value"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "The Beta Spectrum and Kurie Plot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "The electron energy spectrum in beta decay is continuous from 0 to Q_β, distorted by the Coulomb field of the daughter nucleus (Fermi function F):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\frac{dN}{dE} \\propto F(Z,E) \\cdot p^2 \\cdot (Q_\\beta - E)^2",
                annotation: "Beta spectrum shape: F(Z,E) = Fermi function (Coulomb correction), p = electron momentum, (Q−E)² = phase space factor for the neutrino. The Kurie plot linearises this: plotting √[N/(F·p²)] vs E gives a straight line; its x-intercept = Q_β. Used to measure Q precisely.",
                label: "Beta Spectrum (Fermi Theory)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Fermi's Selection Rules" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Fermi's golden rule predicts the decay rate ∝ phase-space integral × |nuclear matrix element|². Allowed vs. forbidden transitions depend on changes in nuclear spin ΔJ and parity Δπ. Each degree of forbiddenness suppresses the rate by ~10⁻⁵:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-xs",
                "aria-label": "Beta decay selection rules",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Transition Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "ΔJ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Parity Change?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Typical log ft" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Example" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: betaTransitions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-medium text-foreground", children: r.order }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3", children: r.deltaJ }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3", children: r.deltaPi }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-mono", children: r.ft }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 font-mono", children: r.example })
                  ] }, r.order)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic mb-4", children: [
              "log ft (comparative half-life) is used to compare transition strengths independent of Q-value kinematics. Lower log ft = faster (more allowed) transition. ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 12 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Double Beta Decay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-3", children: [
              "In even-even nuclei where single beta decay is energetically forbidden or highly suppressed by large ΔJ, two simultaneous beta decays can occur:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "two-neutrino double beta decay" }),
              " ",
              "(2νββ): (Z,A) → (Z+2,A) + 2e⁻ + 2ν̄ₑ. This is extremely rare but has been measured in several nuclei:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1 sm:grid-cols-2", children: [
              { n: "⁷⁶Ge", t: "1.8 × 10²¹ yr", det: "GERDA/MaGe experiment" },
              { n: "¹³⁶Xe", t: "2.2 × 10²¹ yr", det: "EXO-200, KamLAND-Zen" },
              { n: "⁸²Se", t: "9.2 × 10¹⁹ yr", det: "NEMO-3 experiment" },
              {
                n: "¹³⁰Te",
                t: "7.9 × 10²⁰ yr",
                det: "CUORE bolometer array"
              }
            ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground w-10 flex-shrink-0", children: [
                r.n,
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 flex-shrink-0", children: r.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: r.det })
            ] }, r.n)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "The hypothetical",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "neutrinoless double beta decay" }),
              " ",
              "(0νββ: no neutrinos emitted) would demonstrate that neutrinos are Majorana particles (their own antiparticle). Its discovery would resolve the matter-antimatter asymmetry puzzle. Current best limit: T½(0νββ) > 1.8 × 10²⁶ yr for ¹³⁶Xe (KamLAND-Zen 800, 2023).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 12 })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-gamma",
          title: "Gamma Decay, Multipole Transitions, and Internal Conversion",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "radioactivity.gamma_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Gamma decay is not an independent decay mode but a de-excitation process: after an alpha or beta decay, the daughter nucleus is often left in an excited state. It transitions to the ground state (or a lower excited level) within picoseconds, emitting a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "gamma photon" }),
              " with energy equal to the level difference (corrected for nuclear recoil).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "E_\\gamma = E_i - E_f - \\frac{E_\\gamma^2}{2Mc^2}",
                annotation: "Gamma energy equals initial minus final nuclear level energy, minus a tiny recoil correction. For a 1 MeV gamma from mass-100 nucleus, the recoil is ~5 eV — negligible for detector spectroscopy but crucial for Mössbauer spectroscopy, which exploits recoil-free emission in crystals.",
                label: "Gamma Transition Energy (with recoil)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Multipole Classification and Selection Rules" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Gamma transitions are classified by electromagnetic multipole order L (1=dipole, 2=quadrupole, etc.) and character (Electric E or Magnetic M). Selection rules:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• |J_i − J_f| ≤ L ≤ J_i + J_f (triangle rule)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• For EL: parity change Δπ = (−1)^L" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• For ML: parity change Δπ = (−1)^(L+1)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• L = 0 (monopole E0): single-photon forbidden → internal conversion only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Lowest allowed multipole dominates; higher multipoles slower by ~10⁻⁵ per step" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-xs",
                "aria-label": "Gamma transition multipole types",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "ΔJ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Parity?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Typical T½" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Example" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: gammaTable.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-medium text-foreground", children: r.type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: r.deltaJ }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: r.parity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.typical }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: r.example })
                  ] }, r.type)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Weisskopf Single-Particle Estimates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "The Weisskopf model estimates transition rates assuming a single nucleon moves in a nuclear potential. These are order-of-magnitude benchmarks — actual rates can deviate by 10–1000× due to collective nuclear effects:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "T_W(E1) \\approx 1.0 \\times 10^{14}\\,A^{2/3}\\,E_\\gamma^3 \\quad \\text{s}^{-1}",
                annotation: "Weisskopf estimate for E1 (electric dipole) transition rate, where E_γ is in MeV and A is the mass number. Example: 1 MeV E1 in A=100 nucleus → T_W ≈ 2×10¹⁴ s⁻¹, T½ ≈ 3×10⁻¹⁵ s. Enhanced E2 transitions in strongly deformed nuclei (rotational states) can exceed Weisskopf units by 100-fold.",
                label: "Weisskopf E1 Estimate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Internal Conversion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-3", children: [
              "Instead of emitting a gamma photon, the excited nucleus can transfer its energy directly to an inner-shell electron (K, L, M shells), which is then ejected as an",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "internal conversion electron" }),
              " ",
              "with kinetic energy T_IC = E_γ − E_binding:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\alpha_{IC} = \\frac{N_e}{N_\\gamma}",
                annotation: "αIC is the ratio of conversion electrons to gamma photons. αIC is high for: high multipole order L, low transition energy, high Z nucleus, E0 transitions. Total αT = αK + αL + αM + ... For Tc-99m M4 transition: αK ≈ 0.114, αT ≈ 0.123.",
                label: "Internal Conversion Coefficient"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Tc-99m: Ideal Medical Isotope" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• 140.5 keV gamma: optimal for Anger gamma camera (99% photopeak efficiency)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• M4 isomeric transition: high L → long T½ = 6.01 h (convenient for patient dosing)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• αT ≈ 0.123 → 89% gamma, 11% IC electrons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• 18–21 keV Pb X-rays from K-shell IC vacancy filling" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Daughter Tc-99: T½ = 2.11×10⁵ yr → negligible patient dose from ingrowth" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "After IC, the shell vacancy is filled by a cascade of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Auger electrons" }),
              " (very short range, deposit energy at atomic scale) and characteristic X-rays. In high-Z atoms, K Auger electrons deliver highly localised dose — relevant for Auger-emitter radiotherapy (e.g., I-125 in DNA proximity)."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-equilibrium",
          title: "Secular and Transient Equilibrium in Decay Chains",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          "data-ocid": "radioactivity.equilibrium_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "When a parent nuclide (1) decays to a daughter (2) which is itself radioactive, the daughter activity evolves according to the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Bateman equations" }),
              ". The long-term behaviour depends on the ratio of half-lives.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 2 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "A_2(t) = A_1^{(0)} \\frac{\\lambda_2}{\\lambda_2 - \\lambda_1}\\left(e^{-\\lambda_1 t} - e^{-\\lambda_2 t}\\right)",
                annotation: "Activity of daughter A₂(t) for pure parent at t=0. λ₁, λ₂ are decay constants of parent and daughter. Valid for the simplest two-member chain.",
                label: "Bateman Equation (2-member chain)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3 mt-4 mb-4", children: [
              {
                title: "Secular Equilibrium",
                color: "border-emerald-400/30 bg-emerald-400/5",
                condition: "T½(parent) >> T½(daughter)",
                result: "A₂ → A₁ (daughter activity equals parent activity)",
                example: "Ra-226 (1600 yr) → Rn-222 (3.82 d). In sealed old radium source, Rn-222 activity = Ra-226 activity after ~5×T½(Rn) = 19 days.",
                timescale: "Reached after ~7 × T½(daughter)"
              },
              {
                title: "Transient Equilibrium",
                color: "border-blue-400/30 bg-blue-400/5",
                condition: "T½(parent) > T½(daughter) by 10–100×",
                result: "A₂ → A₁ × λ₂/(λ₂−λ₁) > A₁",
                example: "Mo-99 (65.9 h) → Tc-99m (6.01 h). Tc-99m activity exceeds Mo-99 by ~λ₂/(λ₂−λ₁) = 1.11×. Maximises at t_max = ln(λ₂/λ₁)/(λ₂−λ₁) ≈ 22.8 h.",
                timescale: "Reached after ~5–7 × T½(daughter)"
              },
              {
                title: "No Equilibrium",
                color: "border-rose-400/30 bg-rose-400/5",
                condition: "T½(parent) < T½(daughter)",
                result: "Parent decays away; daughter peaks then decays independently",
                example: "I-131 (8.02 d) → Xe-131m (11.9 d). Xe-131m activity peaks after parent decays, then decays with its own T½.",
                timescale: "No equilibrium state reached"
              }
            ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border p-3 text-sm ${c.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: c.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1 font-semibold", children: [
                    "Condition: ",
                    c.condition
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: c.result }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: c.example })
                ]
              },
              c.title
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Mo-99 / Tc-99m Generator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-2", children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "technetium generator" }),
              " ",
              `(or "moly cow") is the world's most important medical isotope supply system, providing Tc-99m for nuclear medicine departments worldwide:`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mo-99 (T½ = 65.9 h, β⁻) → Tc-99m (T½ = 6.01 h, IT 140.5 keV γ) → Tc-99 (T½ = 2.11×10⁵ yr)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mo-99 loaded as ⁹⁸MoO₄²⁻ on alumina column → ⁹⁹ᵐTcO₄⁻ (pertechnetate) elutes in saline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Eluted every 24 h; Tc-99m re-ingrows to ~50% of Mo-99 activity in 6 h, 70% in 12 h, 89% in 24 h" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mo-99 produced by fission of ²³⁵U targets or neutron activation of ⁹⁸Mo" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-activity",
          title: "Activity, Specific Activity, and Gamma Dose Rate Constants",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "radioactivity.activity_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Activity quantifies how many decays occur per second. The SI unit is the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "becquerel" }),
              " (Bq): 1 Bq = 1 disintegration per second. The traditional unit, still common in medicine, is the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "curie" }),
              " (Ci): 1 Ci = 3.7 × 10¹⁰ Bq (originally the activity of 1 g of Ra-226).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "A = \\lambda N = \\frac{\\ln 2}{T_{1/2}} \\cdot N",
                annotation: "Activity A (in Bq) equals decay constant λ times the number of atoms N. Equivalently, ln(2)/T½ × N.",
                label: "Activity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "a_{sp} = \\frac{N_A \\cdot \\ln 2}{T_{1/2} \\cdot M_r} \\quad [\\text{Bq/g}]",
                annotation: "Specific activity (activity per gram) depends only on T½ and molar mass Mr. Short-lived isotopes have enormous specific activities.",
                label: "Specific Activity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Worked Example: Co-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "T½(Co-60) = 5.271 yr = 1.663 × 10⁸ s; M_r = 59.934 g/mol; N_A = 6.022 × 10²³" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "a_sp = (6.022×10²³ × 0.6931) / (1.663×10⁸ × 59.934)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                " ",
                "= 4.173×10²³ / (9.967×10⁹) =",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "4.19 × 10¹³ Bq/g = 1133 Ci/g" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Compare: Ra-226: 3.7×10¹⁰ Bq/g = 1.000 Ci/g (by definition)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Gamma Dose Rate Constants" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "For a point source of activity A at distance r (in air), the absorbed dose rate is:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\dot{H} = \\Gamma \\cdot \\frac{A}{r^2}",
                annotation: "Dose rate Ḣ (Sv/h) equals gamma dose rate constant Γ times activity A (Bq) divided by distance squared r² (m²). Note: this is in-air, no scatter or attenuation.",
                label: "Point Source Dose Rate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "table",
                {
                  className: "w-full text-xs",
                  "aria-label": "Gamma dose rate constants for common sources",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Gamma Energies" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Γ (Gy·m²/Bq·s)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: gammaDoseConstants.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-mono font-medium text-foreground", children: r.nuclide }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 pr-3 font-mono", children: [
                        r.gamma_keV,
                        " keV"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-mono", children: r.Gamma }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: r.note })
                    ] }, r.nuclide)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground italic", children: [
                "Source: IAEA Safety Reports Series No. 16 (1999). For educational purposes only — actual radiation protection calculations require dedicated software. ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-amber-400/5 border border-amber-400/30 p-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "⚠ Disclaimer:" }),
              " These values are for educational illustration only. Real radiation protection calculations must account for geometry, scatter, self-absorption, and shielding. Always consult a qualified medical physicist or health physicist."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-stability",
          title: "Nuclear Stability: The Valley of Beta Stability",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "radioactivity.stability_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "The stable nuclides occupy a narrow region in the Z–N plane called the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "valley of beta stability" }),
              ". For light nuclei (A < 40), stability occurs near N = Z. For heavier nuclei, Coulomb repulsion between protons requires increasingly more neutrons — the valley curves toward higher N/Z ratios, reaching N/Z ≈ 1.54 for ²⁰⁸Pb (Z=82, N=126). Of ~3,300 known nuclides, only 256 are stable.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 1 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Semi-Empirical Mass Formula (SEMF)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "The Bethe-Weizsäcker formula models nuclear binding energy as the sum of volume, surface, Coulomb, asymmetry, and pairing contributions:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "B(Z,A) = a_V A - a_S A^{2/3} - a_C \\frac{Z(Z-1)}{A^{1/3}} - a_A \\frac{(A-2Z)^2}{A} + \\delta(A,Z)",
                annotation: "SEMF coefficients: aᵥ=15.8, aₛ=18.3, aC=0.714, aA=23.2 MeV. Volume term: all nucleons attract neighbors. Surface: fewer bonds at surface. Coulomb: proton-proton repulsion. Asymmetry: penalty for N≠Z from Pauli exclusion. Pairing δ: +aₚ/√A for even-even, 0 for odd-A, −aₚ/√A for odd-odd.",
                label: "Semi-Empirical Mass Formula (Bethe-Weizsäcker)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Stability Line from SEMF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "Z_{stable}(A) \\approx \\frac{A}{2 + 0.015 A^{2/3}}",
                annotation: "Most stable isobar for given A. For A=56: Z≈26 (iron, most tightly bound). For A=238: Z≈92 (uranium). The formula slightly overestimates Z for very heavy nuclei due to shell effects.",
                label: "Valley of Stability (SEMF)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Magic Numbers and Shell Structure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Nuclei with proton or neutron numbers equal to the magic numbers (2, 8, 20, 28, 50, 82, 126) are anomalously tightly bound — the nuclear analogs of noble-gas electron configurations. Doubly-magic nuclei are the most stable:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-3 mb-4", children: [
              {
                nuclide: "⁴He",
                Z: "2",
                N: "2",
                note: "Doubly magic; exceptional alpha stability"
              },
              {
                nuclide: "¹⁶O",
                Z: "8",
                N: "8",
                note: "Doubly magic; most abundant O isotope"
              },
              {
                nuclide: "⁴⁰Ca",
                Z: "20",
                N: "20",
                note: "Doubly magic; anomalously long T½"
              },
              {
                nuclide: "⁴⁸Ca",
                Z: "20",
                N: "28",
                note: "Double magic; 0νββ experiment target"
              },
              {
                nuclide: "¹³²Sn",
                Z: "50",
                N: "82",
                note: "Doubly magic; r-process waiting point"
              },
              {
                nuclide: "²⁰⁸Pb",
                Z: "82",
                N: "126",
                note: "Doubly magic; heaviest stable nuclide"
              }
            ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded border border-border/50 bg-muted/20 p-2 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: m.nuclide }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                    "Z=",
                    m.Z,
                    ", N=",
                    m.N
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground italic", children: m.note })
                ]
              },
              m.nuclide
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Decay Mode Map" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 text-xs text-muted-foreground", children: [
              {
                position: "Left of valley (neutron-rich)",
                mode: "β⁻ decay",
                reason: "Too many neutrons → n converts to p, nucleus moves toward stability",
                color: "border-blue-400/30 bg-blue-400/5"
              },
              {
                position: "Right of valley (proton-rich)",
                mode: "β⁺ or Electron Capture",
                reason: "Too many protons → p converts to n; β⁺ if Q > 1.022 MeV, EC otherwise",
                color: "border-amber-400/30 bg-amber-400/5"
              },
              {
                position: "Heavy nuclei (A > 150, below Pb)",
                mode: "α decay",
                reason: "Coulomb repulsion: He-4 cluster emission is energetically favored",
                color: "border-rose-400/30 bg-rose-400/5"
              },
              {
                position: "Very heavy (A > 230), proton-rich",
                mode: "Spontaneous fission",
                reason: "Liquid-drop barrier vanishes; complete nuclear split. Cf-252 T½(SF)=2.65 yr",
                color: "border-purple-400/30 bg-purple-400/5"
              }
            ].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border p-3 ${d.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: d.position }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mb-1", children: [
                    "Mode: ",
                    d.mode
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: d.reason })
                ]
              },
              d.position
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-natural",
          title: "Natural and Artificial Radioactivity",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "beginner" }),
          "data-ocid": "radioactivity.natural_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Radioactivity is not a product of nuclear technology alone — it is intrinsic to nature. All matter contains trace radioactive nuclides. Natural radionuclides are classified as ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "primordial" }),
              " (present since Earth formed, T½ comparable to Solar System age),",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "cosmogenic" }),
              " (continuously created by cosmic-ray interactions), or ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "in-situ produced" }),
              " (by naturally occurring nuclear reactions).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 14 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-xs",
                "aria-label": "Natural radioactive nuclides",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Nuclide" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "T½" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Origin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                    {
                      cat: "Primordial",
                      n: "U-238",
                      t: "4.47×10⁹ yr",
                      o: "Pre-solar nebula",
                      note: "Parent of 4n+2 series; present since Earth's formation"
                    },
                    {
                      cat: "Primordial",
                      n: "U-235",
                      t: "7.04×10⁸ yr",
                      o: "r-process supernovae",
                      note: "Was ~17% of total U at Solar System formation; now 0.72%"
                    },
                    {
                      cat: "Primordial",
                      n: "Th-232",
                      t: "1.40×10¹⁰ yr",
                      o: "Pre-solar nebula",
                      note: "Most abundant natural radioactive element in Earth's crust"
                    },
                    {
                      cat: "Primordial",
                      n: "K-40",
                      t: "1.25×10⁹ yr",
                      o: "Stellar nucleosynthesis",
                      note: "0.0117% of natural K; ~4400 Bq inside a human body"
                    },
                    {
                      cat: "Primordial",
                      n: "Rb-87",
                      t: "4.92×10¹⁰ yr",
                      o: "s-process",
                      note: "27.83% of natural Rb; used in Rb-Sr geochronology"
                    },
                    {
                      cat: "Cosmogenic",
                      n: "C-14",
                      t: "5,730 yr",
                      o: "¹⁴N(n,p)¹⁴C cosmic neutrons",
                      note: "1.2×10⁻¹² of total C; basis of radiocarbon dating"
                    },
                    {
                      cat: "Cosmogenic",
                      n: "Be-10",
                      t: "1.39×10⁶ yr",
                      o: "O,N spallation",
                      note: "Exposure dating of glacial deposits, ice cores"
                    },
                    {
                      cat: "Cosmogenic",
                      n: "H-3 (Tritium)",
                      t: "12.32 yr",
                      o: "¹⁴N(n,³H)¹²C",
                      note: "Elevated post-1952 weapons tests; hydrological tracer"
                    }
                  ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-semibold ${r.cat === "Primordial" ? "text-amber-400" : "text-blue-400"}`,
                        children: r.cat
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono font-medium text-foreground", children: r.n }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.t }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: r.o }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 italic", children: r.note })
                  ] }, r.n)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Radioactivity in the Human Body" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Activity in a 70 kg adult (approximate):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1 sm:grid-cols-2", children: [
                {
                  n: "K-40",
                  a: "~4,400 Bq",
                  src: "Dietary potassium (~150 g body K)"
                },
                {
                  n: "C-14",
                  a: "~3,700 Bq",
                  src: "Carbon in all organic molecules"
                },
                { n: "Rb-87", a: "~600 Bq", src: "Trace rubidium in tissues" },
                {
                  n: "Po-210",
                  a: "~40 Bq",
                  src: "Dietary; elevated in seafood consumers"
                },
                {
                  n: "Pb-210",
                  a: "~40 Bq",
                  src: "U-238 chain; inhaled radon progeny"
                },
                {
                  n: "Ra-226",
                  a: "~1 Bq",
                  src: "Trace in bones (mimics Ca²⁺)"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground w-14 flex-shrink-0", children: [
                  item.n,
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold w-20 flex-shrink-0", children: item.a }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.src })
              ] }, item.n)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 italic", children: "Total internal activity ≈ 9,000–10,000 Bq, delivering ~0.3 mSv/yr — part of the global natural background of ~2.4 mSv/yr (UNSCEAR 2000)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Artificial (Induced) Radioactivity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "In 1934, Irène and Frédéric Joliot-Curie discovered artificial radioactivity by bombarding aluminium with alpha particles (²⁷Al + ⁴He → ³⁰P* + n, then ³⁰P → ³⁰Si + e⁺ + ν). Today thousands of artificial radionuclides are made via:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3 text-xs mb-4", children: [
              {
                method: "Neutron Activation",
                reaction: "⁵⁸Ni(n,γ)⁵⁹Ni",
                products: "Medical: Mo-99, I-131, Lu-177; industrial: Co-60, Ir-192",
                color: "border-emerald-400/30 bg-emerald-400/5"
              },
              {
                method: "Charged Particle (Cyclotron)",
                reaction: "¹⁸O(p,n)¹⁸F",
                products: "PET isotopes: F-18 (110 min), C-11 (20 min), N-13 (10 min), O-15 (2 min)",
                color: "border-blue-400/30 bg-blue-400/5"
              },
              {
                method: "Fission Products",
                reaction: "²³⁵U(n,f) → ~200 nuclides",
                products: "Sr-90, Cs-137, I-131, Mo-99; span Z=30–65, T½ from seconds to 30 years",
                color: "border-purple-400/30 bg-purple-400/5"
              }
            ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border p-3 ${m.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: m.method }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-muted-foreground mb-2", children: m.reaction }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: m.products })
                ]
              },
              m.method
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Radon: The Dominant Natural Dose" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Radon-222 (T½=3.82 d, U-238 chain) emanates from soil and rock into indoor air. Its daughters — Po-218, Pb-214, Bi-214, Po-214 — deposit on lung surfaces delivering alpha/beta dose. Radon accounts for ~1.2 mSv/yr of the 2.4 mSv/yr global natural background: roughly half the total, and the second largest contributor to lung cancer after cigarette smoking. WHO action level: 100 Bq/m³ indoor (world average: ~40 Bq/m³).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 14 })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-dating",
          title: "Radioactive Dating: Geochronology and Archaeology",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "radioactivity.dating_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Radioactive decay provides a natural clock. If the initial isotope ratio and decay constant are known, measuring the current parent/daughter ratio gives the elapsed time. The method requires a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "closed system" }),
              " — no gain or loss of parent or daughter since the event being dated.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 15 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "t = \\frac{1}{\\lambda} \\ln\\!\\left(1 + \\frac{D - D_0}{P}\\right)",
                annotation: "Age equation: λ = decay constant of parent, D = measured daughter, D₀ = initial daughter at t=0 (must be known or solved via isochron), P = present-day parent count. For radiocarbon: D₀ set by known atmospheric ¹⁴C/¹²C ratio at time of organism's death.",
                label: "Radiometric Age Equation"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-xs",
                "aria-label": "Radioactive dating systems",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "System" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "T½" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Useful Range" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Material" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Limitation" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                    {
                      sys: "¹⁴C/¹²C",
                      t: "5,730 yr",
                      r: "100–50,000 yr",
                      m: "Organic carbon (wood, bone, charcoal)",
                      lim: "Works only in living exchange reservoirs; post-mortem clock"
                    },
                    {
                      sys: "⁴⁰K/⁴⁰Ar",
                      t: "1.25×10⁹ yr",
                      r: "100 kyr – 4.5 Gyr",
                      m: "K-bearing minerals, volcanic rocks, micas",
                      lim: "Argon loss by diffusion if rock reheated; closed-system required"
                    },
                    {
                      sys: "²³⁸U/²⁰⁶Pb",
                      t: "4.468×10⁹ yr",
                      r: "1 Myr – 4.6 Gyr",
                      m: "Zircon, monazite, uraninite",
                      lim: "Common lead correction required; open-system in metamorphics"
                    },
                    {
                      sys: "²³⁵U/²⁰⁷Pb",
                      t: "7.04×10⁸ yr",
                      r: "1 Myr – 4.6 Gyr",
                      m: "Zircon (concordia with U-238)",
                      lim: "Very low U-235 abundance at solar system age"
                    },
                    {
                      sys: "⁸⁷Rb/⁸⁷Sr",
                      t: "4.92×10¹⁰ yr",
                      r: "100 Myr – Solar System",
                      m: "Rb-bearing minerals, whole-rock isochrons",
                      lim: "Initial ⁸⁷Sr/⁸⁶Sr ratio correction needed"
                    },
                    {
                      sys: "¹⁴⁷Sm/¹⁴³Nd",
                      t: "1.06×10¹¹ yr",
                      r: "100 Myr – 4.6 Gyr",
                      m: "Garnet, pyroxene, whole-rock igneous",
                      lim: "Small Sm/Nd variation requires high-precision TIMS"
                    }
                  ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono font-medium text-foreground", children: r.sys }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.t }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: r.r }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2", children: r.m }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 italic", children: r.lim })
                  ] }, r.sys)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Radiocarbon Dating: Worked Example" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: '¹⁴C is produced continuously in the upper atmosphere by ¹⁴N(n,p)¹⁴C. Atmospheric ¹⁴C/¹²C ≈ 1.2 × 10⁻¹² (the "modern" standard, A₀ = 0.226 Bq/g carbon). After death, exchange stops and ¹⁴C decays:' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "t = -\\frac{T_{1/2}}{\\ln 2} \\ln\\!\\left(\\frac{A(t)}{A_0}\\right) = -8267\\,\\text{yr} \\times \\ln\\!\\left(\\frac{A(t)}{A_0}\\right)",
                annotation: "A(t) = measured specific activity (Bq/g carbon), A₀ = 0.226 Bq/g (modern reference). The 8,267 yr factor = T½/ln2 = 5730/0.693. Calibration against the IntCal23 tree-ring curve converts raw radiocarbon age to calendar age (the two differ by up to 3,000+ years).",
                label: "Radiocarbon Age Equation"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs font-mono text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Example:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sample A(t) = 0.0840 Bq/g; A₀ = 0.226 Bq/g" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "t = −8267 × ln(0.0840/0.226) = −8267 × ln(0.372) = −8267 × (−0.989)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "t ≈ 8,175 radiocarbon years BP" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "italic mt-1", children: "After IntCal23 calibration: ≈ 9,150–9,300 calendar years BP (Early Neolithic)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "U-Pb Concordia Diagram" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-3", children: [
              "Zircon incorporates U but excludes Pb at crystallisation (D₀ = 0), giving two independent clocks from ²³⁸U→²⁰⁶Pb and ²³⁵U→²⁰⁷Pb. The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Wetherill concordia diagram" }),
              " ",
              "plots both simultaneously:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs font-mono text-muted-foreground mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "x-axis: ²⁰⁷Pb*/²³⁵U = e^(λ₂₃₅t) − 1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "y-axis: ²⁰⁶Pb*/²³⁸U = e^(λ₂₃₈t) − 1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Concordia: locus of concordant ages (t = 0 to 4.57 Gyr)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Discordant data (Pb loss) plot on a chord; upper intercept = crystallization age" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "This technique dated the Jack Hills zircons of Western Australia at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "4.404 ± 0.008 Gyr" }),
              " — the oldest known terrestrial material, formed just 160 Myr after Solar System formation.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 15 })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-statistics",
          title: "Statistical Nature of Decay: Poisson Statistics and Counting",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "radioactivity.statistics_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Radioactive decay is an irreducibly quantum-statistical process. Each nucleus decays independently with a fixed probability per unit time. For a large ensemble and short counting intervals (Δt ≪ T½), the count distribution is",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Poisson" }),
              ":",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 16 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "P(n;\\,\\mu) = \\frac{\\mu^n e^{-\\mu}}{n!}, \\quad \\sigma = \\sqrt{\\mu}",
                annotation: "Probability of exactly n counts when the mean is μ = A·Δt. The standard deviation equals √μ. The fractional uncertainty in a measurement of n counts is always ±√n / n = 1/√n. To halve the relative uncertainty, quadruple the counting time.",
                label: "Poisson Distribution"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm mb-2", children: "Poisson probabilities for μ = 4 (expected counts = 4)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Poisson distribution table",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "n" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "P(n|μ=4)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Cumul P(≤n)" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                        { n: 0, p: "0.0183", cum: "0.0183" },
                        { n: 1, p: "0.0733", cum: "0.0916" },
                        { n: 2, p: "0.1465", cum: "0.2381" },
                        { n: 3, p: "0.1954", cum: "0.4335" },
                        { n: 4, p: "0.1954", cum: "0.6289" },
                        { n: 5, p: "0.1563", cum: "0.7851" },
                        { n: 6, p: "0.1042", cum: "0.8893" },
                        { n: 7, p: "0.0595", cum: "0.9489" },
                        { n: 8, p: "0.0298", cum: "0.9786" }
                      ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: r.n }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: r.p }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 font-mono", children: r.cum })
                      ] }, r.n)) })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Counting statistics guide:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "100 counts → σ = 10 → 10% relative uncertainty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1,000 counts → σ = 31.6 → 3.2% relative uncertainty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "10,000 counts → σ = 100 → 1.0% relative uncertainty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1,000,000 counts → σ = 1000 → 0.1% relative uncertainty" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "Rule of thumb: to improve precision by 2×, count 4× as long or use 4× higher activity sample." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Detector Dead Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "After each detected count, a detector (especially GM tubes) is insensitive for a dead time τ_d. At high rates, corrections are essential:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "n_{true} = \\frac{n_{obs}}{1 - n_{obs}\\,\\tau_d}",
                annotation: "True count rate from observed rate n_obs and dead time τ_d (seconds). Example: n_obs = 10,000 cps, τ_d = 100 μs → n_true = 10,000 / (1 − 10,000 × 10⁻⁴) = 11,111 cps (11.1% correction). Above 20% correction, the model breaks down and a paralyzable (extended) dead-time model is required.",
                label: "Dead Time Correction (Non-paralyzable Model)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Background Subtraction and MDA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "A_{net} = \\frac{n_s}{t_s} - \\frac{n_b}{t_b}, \\quad \\sigma_{net} = \\sqrt{\\frac{n_s}{t_s^2} + \\frac{n_b}{t_b^2}}",
                annotation: "Net activity: gross sample counts n_s in time t_s minus background counts n_b in time t_b. Poisson uncertainties add in quadrature. Optimal time split: t_s/t_b = √(count-rate_s / count-rate_b).",
                label: "Net Activity and Statistical Uncertainty"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\text{MDA} = \\frac{4.65\\sqrt{R_b/t_b} + 3/t_s}{\\varepsilon\\,\\gamma\\,t_s}",
                annotation: "Currie (1968) Minimum Detectable Activity. R_b = background count rate, t_b = background counting time, t_s = sample counting time, ε = detection efficiency, γ = gamma emission probability per decay. This is the activity just detectable at 95% confidence. Critical for environmental monitoring and safeguards.",
                label: "Currie Minimum Detectable Activity (MDA)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "These concepts — Poisson statistics, dead time, background subtraction, and MDA — underpin all quantitative radiation measurement: from clinical nuclear medicine dosimetry to ultra-sensitive environmental monitoring for nuclear safeguards.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 16 })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "radioactivity-shielding",
          title: "Radiation Penetration, Attenuation, and Shielding",
          defaultOpen: false,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          "data-ocid": "radioactivity.shielding_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "The penetrating power of each radiation type varies by orders of magnitude. Each type interacts with matter differently, requiring different shielding strategies.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Charged Particle Stopping: Bethe-Bloch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Heavy charged particles (alpha, protons, heavy ions) lose energy primarily through Coulomb collisions with orbital electrons:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "-\\frac{dE}{dx} = \\frac{4\\pi e^4 z^2}{m_e v^2} \\cdot \\frac{NZ}{A} \\cdot \\ln\\!\\left(\\frac{2m_e v^2}{I}\\right)",
                annotation: "Bethe-Bloch formula (simplified): z = projectile charge, v = velocity, N = Avogadro's number, Z/A = target atomic number/mass ratio, I = mean excitation energy (~10Z eV). At low v, −dE/dx ∝ 1/v², giving the Bragg peak: maximum energy deposition at end of range — the basis of proton and carbon-ion radiotherapy.",
                label: "Bethe-Bloch Stopping Power"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Gamma-Ray Exponential Attenuation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "I(x) = I_0\\,e^{-\\mu x}, \\quad \\text{HVL} = \\frac{\\ln 2}{\\mu}, \\quad \\text{TVL} = \\frac{\\ln 10}{\\mu}",
                annotation: "μ = total linear attenuation coefficient (cm⁻¹): sum of photoelectric (τ), Compton (σ), and pair production (κ) cross-sections. HVL = half-value layer (50% reduction). TVL = tenth-value layer (90% reduction) = 3.32 × HVL. Example: 1 MeV gamma in lead: μ = 0.720 cm⁻¹, HVL = 0.96 cm, TVL = 3.2 cm.",
                label: "Gamma Attenuation Law"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Three Gamma Interaction Mechanisms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3 mb-4", children: [
              {
                process: "Photoelectric Effect",
                energy: "Dominant < 0.5 MeV (high Z)",
                Z: "∝ Z⁴–Z⁵ / E³",
                detail: "Gamma absorbed; inner-shell electron ejected with T_e = E_γ − B_e. Followed by X-ray fluorescence or Auger electrons. Complete energy transfer to electron.",
                color: "border-amber-400/30 bg-amber-400/5"
              },
              {
                process: "Compton Scattering",
                energy: "Dominant 0.1–10 MeV (soft tissue)",
                Z: "∝ Z (electron density)",
                detail: "Gamma partially scattered; electron recoils. Scattered photon continues with reduced energy. Compton edge in spectrum at T_e = Q·(2α/(1+2α)), α = E_γ/m_e c².",
                color: "border-blue-400/30 bg-blue-400/5"
              },
              {
                process: "Pair Production",
                energy: "Dominant > 5–10 MeV (high Z)",
                Z: "∝ Z² (nuclear Coulomb field)",
                detail: "E_γ → e⁺e⁻ pair in nuclear field. Requires E_γ > 1.022 MeV (2m_e c²). Positron annihilates → two 511 keV photons (PET imaging basis).",
                color: "border-rose-400/30 bg-rose-400/5"
              }
            ].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg border p-3 text-xs ${p.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: p.process }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Energy range:" }),
                    " ",
                    p.energy
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Z-dependence:" }),
                    " ",
                    p.Z
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: p.detail })
                ]
              },
              p.process
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Comparative Ranges in Common Materials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-xs",
                "aria-label": "Radiation ranges and HVLs in materials",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Radiation" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "In Air" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "In Water/Tissue" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "In Al" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "In Pb" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                    {
                      r: "Alpha (5 MeV)",
                      air: "~3.7 cm",
                      water: "~0.04 mm",
                      al: "~0.02 mm",
                      pb: "~0.01 mm",
                      note: "Stopped by dead skin; serious only as internal emitter"
                    },
                    {
                      r: "Beta (1 MeV)",
                      air: "~4 m",
                      water: "~4 mm",
                      al: "~2 mm",
                      pb: "~1 mm",
                      note: "Use low-Z shield (plastic/Al) to avoid bremsstrahlung X-rays"
                    },
                    {
                      r: "Gamma (1 MeV)",
                      air: "HVL ~100 m",
                      water: "HVL ~12 cm",
                      al: "HVL ~4.4 cm",
                      pb: "HVL ~0.96 cm",
                      note: "Exponential — never fully stopped, only attenuated"
                    },
                    {
                      r: "Neutrons (thermal)",
                      air: "HVL ~10 m",
                      water: "HVL ~2.9 cm",
                      al: "HVL ~3.3 cm",
                      pb: "HVL ~12 cm",
                      note: "Moderated by H-rich materials; absorbed by B, Cd, Li"
                    }
                  ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-medium text-foreground", children: r.r }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.air }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.water }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.al }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono", children: r.pb }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 italic", children: r.note })
                  ] }, r.r)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic", children: [
              "HVL = half-value layer. Data: NIST XCOM/ASTAR/PSTAR databases, ICRU Reports. ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Radioactivity as default
};
