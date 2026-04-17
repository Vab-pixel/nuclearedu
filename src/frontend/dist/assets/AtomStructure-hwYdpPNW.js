import { R as React, j as jsxRuntimeExports, A as Atom, B as Button, L as Link, C as ChevronRight } from "./index-DHpNeWFA.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DjzxfwqO.js";
import { C as CitationMarker } from "./CitationMarker-faPAFJpJ.js";
import { C as CollapsibleSection } from "./CollapsibleSection-C-WYJXLb.js";
import { E as EquationBlock } from "./EquationBlock-NVyAdYzd.js";
import { S as SectionCard } from "./SectionCard-Dum9xY4U.js";
const subpages = [
  {
    label: "Isotopes",
    href: "/basics/isotopes",
    desc: "Variants of the same element with different neutron counts"
  },
  {
    label: "Radioactivity",
    href: "/basics/radioactivity",
    desc: "Spontaneous nuclear transformation and emission of radiation"
  },
  {
    label: "Energy & Mass",
    href: "/basics/energy-mass",
    desc: "Einstein's mass-energy equivalence and nuclear binding"
  }
];
const shells = [
  {
    label: "Protons (Z)",
    value: "Defines the element (1 = H, 92 = U)",
    color: "text-rose-400"
  },
  {
    label: "Neutrons (N)",
    value: "Determines isotope; contributes to mass and stability",
    color: "text-blue-400"
  },
  {
    label: "Electrons",
    value: "Governs chemistry; equal to Z in neutral atom",
    color: "text-emerald-400"
  }
];
const fundamentalForces = [
  {
    force: "Strong (nuclear)",
    range: "~1–3 fm",
    relStrength: "1",
    boson: "Gluon (8 types)",
    role: "Binds quarks; residual force binds nucleons"
  },
  {
    force: "Electromagnetic",
    range: "∞",
    relStrength: "10⁻²",
    boson: "Photon (γ)",
    role: "Electron-nucleus attraction; Coulomb repulsion between protons"
  },
  {
    force: "Weak",
    range: "< 0.1 fm",
    relStrength: "10⁻⁶",
    boson: "W±, Z⁰ bosons",
    role: "Governs beta decay; converts neutron↔proton"
  },
  {
    force: "Gravitational",
    range: "∞",
    relStrength: "10⁻³⁸",
    boson: "Graviton (unconfirmed)",
    role: "Negligible at nuclear scale; dominant at cosmic scale"
  }
];
const magicNumberData = [
  {
    nuclide: "⁴He",
    Z: 2,
    N: 2,
    note: "Doubly magic; α-particle is exceptionally tightly bound",
    extraBE: "+3.1"
  },
  {
    nuclide: "¹⁶O",
    Z: 8,
    N: 8,
    note: "Doubly magic; anomalously high B/A = 7.976 MeV",
    extraBE: "+4.2"
  },
  {
    nuclide: "⁴⁰Ca",
    Z: 20,
    N: 20,
    note: "Doubly magic; lightest doubly-magic nucleus beyond He-4",
    extraBE: "+3.8"
  },
  {
    nuclide: "⁴⁸Ca",
    Z: 20,
    N: 28,
    note: "Very neutron-rich; used in superheavy element synthesis",
    extraBE: "+1.9"
  },
  {
    nuclide: "¹³²Sn",
    Z: 50,
    N: 82,
    note: "Doubly magic; important in r-process nucleosynthesis",
    extraBE: "+5.1"
  },
  {
    nuclide: "²⁰⁸Pb",
    Z: 82,
    N: 126,
    note: "Heaviest doubly-magic; T½ = stable (most protons of any stable nuclide)",
    extraBE: "+7.4"
  }
];
const semfTerms = [
  {
    term: "Volume",
    formula: "a_V · A",
    coeff: "15.75 MeV",
    meaning: "Every nucleon interacts with its nearest neighbors (saturation). Energy scales with volume (∝ A)."
  },
  {
    term: "Surface",
    formula: "−a_S · A²/³",
    coeff: "17.8 MeV",
    meaning: "Surface nucleons have fewer neighbors — analogous to surface tension in a liquid drop. Reduces binding."
  },
  {
    term: "Coulomb",
    formula: "−a_C · Z²/A^{1/3}",
    coeff: "0.711 MeV",
    meaning: "Proton-proton electromagnetic repulsion lowers binding. Grows as Z²."
  },
  {
    term: "Asymmetry",
    formula: "−a_A · (A−2Z)²/A",
    coeff: "23.7 MeV",
    meaning: "Pauli exclusion principle favors N≈Z for light nuclei. Asymmetry costs energy."
  },
  {
    term: "Pairing",
    formula: "±a_P / A^{1/2}",
    coeff: "12 MeV",
    meaning: "+12 MeV for even-even, 0 for odd-A, −12 MeV for odd-odd nuclei. Nucleons pair with opposite spin."
  }
];
const nuclideTypes = [
  {
    type: "Isotopes",
    definition: "Same Z, different N",
    example: "¹H, ²H, ³H (Z=1; N=0,1,2)",
    note: "Same chemistry, different nuclear properties"
  },
  {
    type: "Isobars",
    definition: "Same A, different Z",
    example: "⁴⁰Ar, ⁴⁰K, ⁴⁰Ca",
    note: "Different elements; one stable isobar for each A typically"
  },
  {
    type: "Isotones",
    definition: "Same N, different Z",
    example: "¹³C (Z=6) and ¹⁴N (Z=7); both N=7",
    note: "Similar nuclear structure; important in shell model"
  },
  {
    type: "Nuclear isomers",
    definition: "Same Z and N, different energy state",
    example: "⁹⁹ᵐTc (excited, 140.5 keV) vs ⁹⁹Tc (ground)",
    note: "Metastable state; de-excites by γ or IC emission"
  },
  {
    type: "Mirror nuclei",
    definition: "Same A; Z and N swapped",
    example: "³He (Z=2,N=1) and ³H (Z=1,N=2)",
    note: "Test of charge symmetry of nuclear force"
  }
];
const nuclearSizeData = [
  {
    nuclide: "¹H",
    A: 1,
    r_fm: "0.85",
    V_fm3: "2.6",
    note: "Proton charge radius (CODATA 2018)"
  },
  {
    nuclide: "⁴He",
    A: 4,
    r_fm: "1.90",
    V_fm3: "28.7",
    note: "Alpha particle; doubly magic"
  },
  {
    nuclide: "¹²C",
    A: 12,
    r_fm: "2.73",
    V_fm3: "85.2",
    note: "Common accelerator target"
  },
  {
    nuclide: "⁵⁶Fe",
    A: 56,
    r_fm: "4.54",
    V_fm3: "392",
    note: "Most tightly bound nucleus"
  },
  {
    nuclide: "²⁰⁸Pb",
    A: 208,
    r_fm: "7.11",
    V_fm3: "1,503",
    note: "Doubly magic; heaviest stable nuclide"
  },
  {
    nuclide: "²³⁸U",
    A: 238,
    r_fm: "7.44",
    V_fm3: "1,726",
    note: "Heaviest natural nuclide"
  }
];
const shellOrbits = [
  { shell: "1s₁/₂", capacity: 2, cumulative: 2, magic: true },
  { shell: "1p₃/₂", capacity: 4, cumulative: 6, magic: false },
  { shell: "1p₁/₂", capacity: 2, cumulative: 8, magic: true },
  { shell: "1d₅/₂", capacity: 6, cumulative: 14, magic: false },
  { shell: "2s₁/₂", capacity: 2, cumulative: 16, magic: false },
  { shell: "1d₃/₂", capacity: 4, cumulative: 20, magic: true },
  { shell: "1f₇/₂", capacity: 8, cumulative: 28, magic: true },
  { shell: "2p₃/₂", capacity: 4, cumulative: 32, magic: false },
  { shell: "1f₅/₂", capacity: 6, cumulative: 38, magic: false },
  { shell: "2p₁/₂", capacity: 2, cumulative: 40, magic: false },
  { shell: "1g₉/₂", capacity: 10, cumulative: 50, magic: true }
];
const bindingEnergyPerA = [
  { nuclide: "²H", A: 2, BperA: 1.11, note: "Barely bound; lightest nucleus" },
  { nuclide: "³He", A: 3, BperA: 2.57, note: "" },
  {
    nuclide: "⁴He",
    A: 4,
    BperA: 7.07,
    note: "Magic; prominent peak for light nuclei"
  },
  { nuclide: "¹²C", A: 12, BperA: 7.68, note: "Triple-alpha fusion product" },
  { nuclide: "¹⁶O", A: 16, BperA: 7.98, note: "Doubly magic; local maximum" },
  {
    nuclide: "⁵⁶Fe",
    A: 56,
    BperA: 8.79,
    note: "Global maximum — endpoint of stellar burning"
  },
  { nuclide: "⁶³Cu", A: 63, BperA: 8.75, note: "" },
  { nuclide: "⁹⁰Zr", A: 90, BperA: 8.71, note: "N=50 magic" },
  { nuclide: "²⁰⁸Pb", A: 208, BperA: 7.87, note: "Doubly magic local maximum" },
  {
    nuclide: "²³⁵U",
    A: 235,
    BperA: 7.59,
    note: "Fissile; releases ~200 MeV per fission"
  },
  {
    nuclide: "²³⁸U",
    A: 238,
    BperA: 7.57,
    note: "Most abundant natural uranium isotope"
  }
];
function AtomStructure() {
  const [open, setOpen] = React.useState({});
  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Atom Structure",
        subtitle: "Every element in the universe is built from atoms — each a tiny nucleus surrounded by a cloud of electrons. Understanding atomic structure is the gateway to all of nuclear science.",
        audienceLevel: "beginner",
        readTimeMin: 35
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "basics.atom_overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
          "What Is an Atom?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "An atom is the smallest unit of a chemical element — the irreducible unit that retains the element's identity. At its center lies the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "nucleus" }),
          ", a dense core of positively charged ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "protons" }),
          " and electrically neutral",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "neutrons" }),
          " bound together by the strong nuclear force. Orbiting this nucleus are negatively charged ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "electrons" }),
          ", much lighter and spread over a volume roughly 100,000 times larger than the nucleus itself."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "Almost all the mass of an atom is concentrated in its nucleus. A proton or neutron has a mass of ~1 atomic mass unit (u); an electron is ~1,836 times lighter. This enormous mass concentration in a tiny volume is what makes nuclear reactions release so much more energy than chemical reactions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "The diameter of a typical atom is on the order of 0.1–0.5 nm (angstrom scale), while the nucleus is approximately 10,000–100,000 times smaller — on the femtometer (fm = 10⁻¹⁵ m) scale. If an atom were enlarged to the size of a football stadium, its nucleus would be a marble at the center. Yet that marble contains 99.97% of the atom's mass." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle("atom-quantum"),
              className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
              "aria-expanded": !!open["atom-quantum"],
              "data-ocid": "basics.atom_quantum_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Beyond the Bohr Model: The Quantum Mechanical Atom" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["atom-quantum"] ? "▲ Collapse" : "▼ Expand" })
              ]
            }
          ),
          open["atom-quantum"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The Bohr model (1913) — with electrons in fixed circular orbits — correctly predicts the hydrogen spectrum but fails for multi-electron atoms. Modern quantum mechanics replaces fixed orbits with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "probability density functions" }),
              " ",
              "(orbitals) — regions of space where an electron is most likely to be found.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 11 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Each electron is described by four quantum numbers:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "n" }),
                " (principal): shell energy level (1, 2, 3…)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ℓ" }),
                " (azimuthal): orbital shape (0=s, 1=p, 2=d, 3=f)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "mℓ" }),
                " (magnetic): orientation in space (−ℓ to +ℓ)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ms" }),
                " (spin): +½ or −½ (up or down)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Pauli Exclusion Principle" }),
              " ",
              "forbids two electrons from sharing all four quantum numbers. This forces electrons into progressively higher energy states, explaining the periodic table's structure. An identical principle applies to nucleons in the nucleus — a key ingredient of the nuclear shell model."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The wave function ψ(r,θ,φ) for an electron encodes all measurable information. The probability of finding the electron in a volume element dV is |ψ|² dV. For the hydrogen 1s ground state:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/40 p-3 font-mono text-xs", children: [
              "ψ₁ₛ(r) = (1/√π) · (1/a₀)^(3/2) · exp(−r/a₀)",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "where a₀ = 0.0529 nm (Bohr radius)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The probability density peaks at r = a₀, confirming that the electron is most likely found at the Bohr radius — but can be anywhere from r=0 to r=∞." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle("atom-quarks"),
              className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
              "aria-expanded": !!open["atom-quarks"],
              "data-ocid": "basics.atom_quarks_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Inside the Nucleon: Quarks and the Strong Force" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["atom-quarks"] ? "▲ Collapse" : "▼ Expand" })
              ]
            }
          ),
          open["atom-quarks"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Protons and neutrons are not elementary — they are composed of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "quarks" }),
              ", point-like particles described by Quantum Chromodynamics (QCD). Each nucleon contains three valence quarks (plus a sea of virtual quark-antiquark pairs and gluons):",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 12 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-rose-400/10 border border-rose-400/20 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-rose-400 mb-1", children: "Proton" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs", children: "uud (two up + one down)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Charge: (+⅔ + ⅔ − ⅓) = +1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Mass: 938.272 MeV/c²" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-blue-400/10 border border-blue-400/20 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-blue-400 mb-1", children: "Neutron" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs", children: "udd (one up + two down)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Charge: (+ ⅔ − ⅓ − ⅓) = 0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Mass: 939.565 MeV/c²" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Quarks carry",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "color charge" }),
              " ",
              "(red, green, blue — an analogy, not real color). The strong force, mediated by",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "gluons" }),
              ", keeps quarks confined inside hadrons. A distinctive property of QCD is",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "asymptotic freedom" }),
              ": at very short distances (high energies), quarks interact weakly; at larger distances, the interaction strengthens — like a rubber band — preventing individual quarks from being isolated (color confinement)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The residual strong force between nucleons — what we call the nuclear force — is analogous to the van der Waals force between neutral molecules: an indirect consequence of the underlying color interactions. It is described phenomenologically by the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Yukawa potential" }),
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/40 p-3 font-mono text-xs", children: [
              "V(r) = −g² · (e^(−r/r₀)) / r",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "where r₀ = ℏc/mπc² ≈ 1.4 fm (pion Compton wavelength)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The pion (π meson, mass ~140 MeV/c²) was predicted by Yukawa in 1935 as the carrier of the nuclear force — a remarkable theoretical success confirmed by experiment in 1947. Modern nuclear potentials (Argonne v18, CD-Bonn) include contributions from heavier meson exchange as well." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "basics.nucleon_table_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "The Three Fundamental Particles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "aria-label": "Fundamental atomic particles and their properties",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Particle" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Charge" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Mass (u)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Mass (MeV/c²)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Location" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                ["Proton", "+1 e", "1.007276", "938.272", "Nucleus"],
                ["Neutron", "0", "1.008665", "939.565", "Nucleus"],
                ["Electron", "−1 e", "0.000549", "0.511", "Electron cloud"]
              ].map(([p, c, m, mev, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-medium text-foreground", children: p }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: c }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono", children: m }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-primary", children: mev }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: l })
              ] }, p)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
          "Values from CODATA 2018 [NIST]. 1 u = 931.494 MeV/c². Note: the neutron is 1.293 MeV/c² heavier than the proton — a consequence of quark mass differences and QCD contributions. Free neutrons are unstable (T½ = 611.0 s, decaying via n → p + e⁻ + ν̄ₑ), but are stable when bound in most nuclei.",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle("particle-antimatter"),
              className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
              "aria-expanded": !!open["particle-antimatter"],
              "data-ocid": "basics.antimatter_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Antimatter Counterparts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["particle-antimatter"] ? "▲ Collapse" : "▼ Expand" })
              ]
            }
          ),
          open["particle-antimatter"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Every particle has an antiparticle with identical mass but opposite quantum numbers (charge, lepton number, baryon number). When a particle meets its antiparticle, they",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "annihilate" }),
              ", converting all their rest mass energy into photons:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/40 p-3 font-mono text-xs", children: [
              "e⁻ + e⁺ → 2γ (each photon: 511 keV — the positron emission used in PET scanning)",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "p + p̄ → multiple mesons + γ"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The antiproton (p̄) and antineutron (n̄) were discovered at the Bevatron (Berkeley) in 1955 and 1956 respectively. Anti-hydrogen (p̄ + e⁺) has been produced and trapped at CERN's ALPHA experiment, enabling precision comparisons of matter and antimatter properties.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 14 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The observed predominance of matter over antimatter in the universe is one of the great unsolved problems in physics — known as",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "baryogenesis" }),
              " or the matter-antimatter asymmetry problem. CP violation (measured in kaon and B-meson systems) is far too small to explain the observed asymmetry, suggesting unknown physics beyond the Standard Model."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "basics.notation_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Nuclear Notation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "A nuclide is fully specified by its atomic number Z (protons), mass number A (total nucleons), and neutron number N:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "A = Z + N",
            annotation: "Mass number A equals the number of protons Z plus neutrons N. For example, carbon-14 has Z=6, N=8, A=14.",
            label: "Mass Number"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-3", children: shells.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-muted/30 p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-sm font-bold ${s.color}`, children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: s.value })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm text-muted-foreground", children: [
          "Standard notation:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "ᴬ꜀X" }),
          " where X is the element symbol, A is the mass number (top left), and Z is the atomic number (bottom left). Example:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: "²³⁵₉₂U" }),
          " — uranium with 92 protons and 143 neutrons. In running text, simply write U-235 or ²³⁵U."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle("notation-binding"),
              className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
              "aria-expanded": !!open["notation-binding"],
              "data-ocid": "basics.notation_binding_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Atomic Mass vs. Nuclear Mass: The Binding Energy Deficit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["notation-binding"] ? "▲ Collapse" : "▼ Expand" })
              ]
            }
          ),
          open["notation-binding"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "The ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "atomic mass" }),
              " ",
              "M(Z,A) of a nuclide is always less than the sum of its constituent proton and neutron masses. This difference is the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "mass defect" }),
              " Δm:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\Delta m = Z \\cdot m_p + N \\cdot m_n - M(Z,A)",
                annotation: "Mass defect: the total mass of free protons and neutrons minus the actual nuclear mass. This mass is converted to binding energy holding the nucleus together.",
                label: "Mass Defect"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Via E = mc², the binding energy is B = Δm · c². Using c² = 931.494 MeV/u:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/40 p-3 font-mono text-xs", children: [
              "Fe-56: Δm = 26×1.007276 + 30×1.008665 − 55.934939 u",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "= 26.18918 + 30.25995 − 55.93494 = 0.52819 u",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "B = 0.52819 × 931.494 = 492.26 MeV",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "B/A = 492.26 / 56 =",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: "8.790 MeV/nucleon" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Tables of nuclear masses are published by the Atomic Mass Evaluation (AME) group — the latest being AME2020 [Wang et al., Chinese Physics C 45, 030003 (2021)], containing measured masses of 2,457 nuclides.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 15 })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "basics.size_scale_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-3", children: "Scale of the Nucleus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "The atomic radius is roughly 10⁻¹⁰ m (0.1 nm). The nuclear radius scales with mass number A as:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "r \\approx r_0 \\cdot A^{1/3} \\quad (r_0 \\approx 1.2 \\text{ fm})",
            annotation: "The nuclear radius r is approximately r₀ times the cube root of A, where r₀ ≈ 1.2 femtometers (10⁻¹⁵ m). An atom is about 100,000× larger than its nucleus.",
            label: "Nuclear Radius"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "If the nucleus were the size of a marble (~1 cm), the atom would be roughly the size of a football stadium. Yet nearly all the mass sits in that marble." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "atom-nuclear-force",
          title: "The Four Fundamental Forces",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          defaultOpen: false,
          "data-ocid": "basics.nuclear_force_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "All interactions in the universe arise from just four fundamental forces. At the nuclear scale, two of these — the strong and weak nuclear forces — are normally invisible in everyday life, yet utterly dominate nuclear structure, stability, and reactions.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 1 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Comparison of the four fundamental forces",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Force" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Range" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Relative Strength" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Gauge Boson" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Nuclear Role" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: fundamentalForces.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground", children: f.force }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono text-xs", children: f.range }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono text-xs", children: f.relStrength }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs", children: f.boson }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: f.role })
                  ] }, f.force)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "1. Strong Nuclear Force" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2", children: [
                  "The residual strong force between nucleons is not a fundamental interaction in itself — it is a residue of the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "color force" }),
                  " that binds quarks inside protons and neutrons via gluon exchange (quantum chromodynamics, QCD). Just as neutral molecules attract each other via van der Waals forces (a residue of their internal electromagnetism), nucleons attract each other via a residual QCD interaction.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 2 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Range: ~1–3 fm; falls to essentially zero beyond ~3 fm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Charge-independence:" }),
                    " ",
                    "p-p, n-n, and p-n strong forces are nearly equal — this is isospin symmetry (SU(2) flavor symmetry of QCD)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Saturation:" }),
                    " each nucleon interacts only with its few nearest neighbors (short range), so binding energy ∝ A, not A²"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Repulsive core:" }),
                    " ",
                    "at r < ~0.4 fm, the force becomes strongly repulsive — preventing nuclear collapse and explaining why nucleons maintain a finite size"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Mediated at nuclear distances primarily by pion exchange (Yukawa mechanism); heavier mesons (ρ, ω, σ) contribute at shorter range" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "2. Electromagnetic Force" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2", children: [
                  "Electromagnetism — mediated by photons — has infinite range and governs the interaction between electrically charged particles. Inside a nucleus, it manifests primarily as",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Coulomb repulsion" }),
                  "between protons:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "U_C = \\frac{3}{5} \\cdot \\frac{Z(Z-1)e^2}{4\\pi\\epsilon_0 R}",
                    annotation: "Coulomb self-energy of a uniformly charged sphere of radius R containing Z protons. This grows roughly as Z², which is why very heavy nuclei become unstable.",
                    label: "Nuclear Coulomb Energy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For uranium (Z=92): U_C ≈ 0.711 × 92 × 91 / 238^(1/3) ≈ 925 MeV. This enormous repulsive energy must be overcome by the strong force. As Z increases, each new proton repels all Z−1 existing protons (long-range), but the strong force only helps the nearest few neighbors (short-range). Above Z ≈ 83 (bismuth), this competition makes all nuclei unstable against alpha or spontaneous fission." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "3. Weak Nuclear Force" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2", children: [
                  "The weak force, mediated by the massive W± and Z⁰ bosons, operates at ranges far below 0.1 fm (the boson mass ~80–91 GeV/c² sets a range of ~0.002 fm via the Heisenberg uncertainty principle). It is uniquely responsible for processes that change quark flavor — and thus transform neutrons into protons or vice versa.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 3 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "β⁻ decay:" }),
                    " n → p + e⁻ + ν̄ₑ (neutron → proton; mediated by virtual W⁻)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "β⁺ decay:" }),
                    " p → n + e⁺ + νₑ (proton → neutron; requires energy input ≥ 2mₑc² = 1.022 MeV)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Electron capture (EC):" }),
                    " ",
                    "p + e⁻ → n + νₑ (competes with β⁺ for proton-rich nuclei)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The emitted neutrino carries energy and essentially no momentum is deposited in matter — solar neutrinos pass through the Earth with ~10% interaction probability over the Earth's entire diameter" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The electroweak unification (Glashow-Weinberg-Salam model, 1967) demonstrated that electromagnetic and weak forces are manifestations of a single force at energies above ~100 GeV — confirmed by W/Z boson discovery at CERN (1983)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary mb-2", children: "The Stability Competition: Strong Force vs. Coulomb Repulsion" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Coulomb repulsion between protons is long-range (scales as Z²) while the strong force is short-range (saturates after ~nearest neighbors). As Z increases:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 mt-2 space-y-1 list-disc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Z = 1–20: Strong force comfortably dominates; N ≈ Z for most stable nuclei" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Z = 20–82: Coulomb grows; extra neutrons needed to "dilute" proton density and add strong-force binding without Coulomb penalty' }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Z > 83: No stable nucleus exists. Coulomb wins; alpha decay or spontaneous fission inevitable" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Z > ~104: Spontaneous fission half-lives drop to microseconds or less" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Gravity is completely negligible at nuclear scales: the gravitational attraction between two protons is ~10³⁸× weaker than the Coulomb repulsion. Gravity only becomes relevant at the scale of neutron stars and black holes." })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "atom-nuclear-size",
          title: "Nuclear Size and Density",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          defaultOpen: false,
          "data-ocid": "basics.nuclear_size_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Electron scattering experiments pioneered by Robert Hofstadter at Stanford in the 1950s — for which he received the 1961 Nobel Prize in Physics — established that nuclear charge is distributed roughly uniformly within a sphere whose radius follows the simple scaling:",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 4 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "r = r_0 \\cdot A^{1/3} \\qquad r_0 = 1.2 \\text{ fm} = 1.2 \\times 10^{-15} \\text{ m}",
                annotation: "The charge radius of a nucleus scales as the cube root of the mass number A. r₀ ≈ 1.2 fm from electron scattering fits. For uranium-238: r = 1.2 × (238)^{1/3} = 7.44 fm.",
                label: "Nuclear Charge Radius (Hofstadter)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
              "More precisely, nuclear charge distributions are described by the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Woods-Saxon (Fermi) distribution" }),
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\rho(r) = \\frac{\\rho_0}{1 + \\exp\\!\\left(\\frac{r - R}{a}\\right)}",
                annotation: "The nuclear charge density ρ(r) as a function of radius r, where R ≈ r₀A^{1/3} is the half-density radius and a ≈ 0.54 fm is the surface diffuseness parameter. ρ₀ ≈ 0.16 fm⁻³ is the saturation density.",
                label: "Woods-Saxon Nuclear Density Profile"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 mb-4 overflow-x-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Nuclear radii for selected nuclides (r₀ = 1.2 fm)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "table",
                {
                  className: "w-full text-sm",
                  "aria-label": "Nuclear radii and volumes for selected nuclides",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "A" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "r (fm)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "V (fm³)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: nuclearSizeData.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono font-medium text-foreground", children: row.nuclide }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right", children: row.A }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right font-mono text-primary", children: row.r_fm }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right font-mono", children: row.V_fm3 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: row.note })
                    ] }, row.nuclide)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Worked Example: U-238 Nuclear Density" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs space-y-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "A = 238 → A^(1/3) = 6.204" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "r = 1.2 × 6.204 = 7.44 fm = 7.44 × 10⁻¹⁵ m" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "V = (4/3)π r³ = 4.189 × (7.44×10⁻¹⁵)³ = 1.726 × 10⁻⁴² m³" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "m ≈ 238 × 1.6605 × 10⁻²⁷ kg = 3.952 × 10⁻²⁵ kg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "ρ = m/V = 3.952×10⁻²⁵ / 1.726×10⁻⁴² =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "2.29 × 10¹⁷ kg/m³" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Nuclear density ≈ 2.3 × 10¹⁷ kg/m³" }),
                " ",
                "and is approximately constant for all nuclei heavier than ~He-4 — direct evidence of the saturation property of the nuclear force. Compare:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Water: 10³ kg/m³ (nuclear matter is 2.3 × 10¹⁴ times denser)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Iron: 7.87 × 10³ kg/m³" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "White dwarf core: ~10⁹ kg/m³" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Neutron star: ~10¹⁷–10¹⁸ kg/m³ (comparable to nuclear density — neutron stars are essentially giant nuclei)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Earth at nuclear density:" }),
                  " ",
                  "mass = 6 × 10²⁴ kg; V = 6×10²⁴ / 2.3×10¹⁷ = 2.6 × 10⁷ m³; r = (3V/4π)^(1/3) ≈ ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "183 m" }),
                  " ",
                  "(about the size of a baseball stadium)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggle("size-measurement"),
                    className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                    "aria-expanded": !!open["size-measurement"],
                    "data-ocid": "basics.size_measurement_toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "How Nuclear Sizes Are Measured" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["size-measurement"] ? "▲ Collapse" : "▼ Expand" })
                    ]
                  }
                ),
                open["size-measurement"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nuclear size measurements require probes with de Broglie wavelength λ = h/p comparable to or smaller than the nuclear size (~1–10 fm). This requires high-energy particles:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-2 list-disc", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Electron scattering (Hofstadter):" }),
                      " ",
                      "Electrons at 100–500 MeV scatter from nuclear Coulomb field; diffraction pattern gives charge distribution. λ ≈ hc/E ≈ 1240/300 = 4 fm at 300 MeV."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Muonic atoms:" }),
                      " ",
                      'Muons (m_μ = 207 m_e) orbit much closer to the nucleus (a_μ = a₀/207); X-ray transition energies depend sensitively on nuclear size. Used for precision proton radius measurements (the "proton radius puzzle").'
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "α-particle scattering:" }),
                      " ",
                      "At energies just above the Coulomb barrier, deviations from Rutherford scattering signal strong-force contact, giving the nuclear matter radius."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Isotope shift spectroscopy:" }),
                      " ",
                      "Comparing atomic transition wavelengths between isotopes reveals the change in mean-square charge radius δ⟨r²⟩ — powerful for exotic, short-lived nuclei."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "Modern nuclear charge radii are compiled in the NUBASE2020 and AME2020 evaluations.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 16 })
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "atom-shell-model",
          title: "Nuclear Shell Model and Magic Numbers",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          defaultOpen: false,
          "data-ocid": "basics.shell_model_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "The nuclear shell model — developed independently by Maria Goeppert-Mayer and J. Hans D. Jensen in 1949, earning the 1963 Nobel Prize in Physics — explains why certain nuclei are extraordinarily stable. The central insight is that nucleons move in a mean field (the average potential created by all other nucleons) and fill discrete energy levels, analogous to electrons filling atomic orbitals.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 5 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/20 p-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary mb-2", children: "Magic Numbers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xl text-foreground text-center my-3 tracking-widest", children: "2 · 8 · 20 · 28 · 50 · 82 · 126" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Nuclei with these numbers of protons or neutrons (or both — "doubly magic") have completed nuclear shells. They exhibit enhanced stability, higher binding energy, anomalously high first-excited-state energies, and reduced reaction cross-sections.' })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Key experimental evidence for magic numbers:" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 mb-5 space-y-1 text-sm text-muted-foreground list-disc", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Natural abundances: nuclides with magic Z or N are anomalously abundant in solar-system material" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "One-nucleon separation energies drop sharply above magic numbers (shell closure lowers energy of last nucleon)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "First 2⁺ excited state energies are highest at doubly-magic nuclei" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Alpha-decay Q-values have local minima at daughter nuclides with magic N" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Neutron capture cross-sections are anomalously small at magic N — critical for r-process nucleosynthesis bottlenecks" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Doubly magic nuclei and their extra binding energy",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "N" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Extra B (MeV)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: magicNumberData.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono font-medium text-foreground", children: n.nuclide }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right", children: n.Z }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right", children: n.N }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right font-mono text-primary", children: n.extraBE }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: n.note })
                  ] }, n.nuclide)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("shell-orbitals"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["shell-orbitals"],
                  "data-ocid": "basics.shell_orbitals_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Nuclear Shell Orbital Filling Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["shell-orbitals"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["shell-orbitals"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Orbital labels: n = radial quantum number, ℓ = angular momentum, j = total angular momentum = ℓ ± ½. Capacity = 2j + 1. Spin-orbit splitting produces the large gaps at magic numbers above 20." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Nuclear shell orbital filling",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Orbital (nlⱼ)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Capacity (2j+1)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Cumulative" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Shell closure?" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: shellOrbits.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: row.magic ? "bg-primary/5 text-foreground" : "text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-mono", children: row.shell }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 text-right", children: row.capacity }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                className: `py-1.5 pr-3 text-right font-mono ${row.magic ? "text-primary font-bold" : ""}`,
                                children: row.cumulative
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-xs", children: row.magic ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
                              "✓ Magic number ",
                              row.cumulative
                            ] }) : "—" })
                          ]
                        },
                        row.shell
                      )) })
                    ]
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Why spin-orbit coupling is critical:" }),
                " ",
                "Simple shell models using a harmonic oscillator or infinite square well potential reproduce magic numbers 2, 8, and 20, but predict incorrect shell closures above that. Goeppert-Mayer and Jensen found that adding a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "strong spin-orbit term" }),
                " ",
                "(proportional to ℓ·s, where ℓ is orbital angular momentum and s is intrinsic spin) splits each orbital nℓ into two sub-orbitals with j = ℓ + ½ and j = ℓ − ½, with the j = ℓ + ½ state lowered in energy. This produces large energy gaps exactly at the observed magic numbers (28, 50, 82, 126).",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 5 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Island of Stability:" }),
                " ",
                'Nuclear theory predicts a closed spherical shell at Z=114, N=184 — a hypothetical "doubly magic" superheavy nucleus. If this shell exists, nuclei near it might have half-lives of hours, days, or longer — far exceeding the microsecond lifetimes of currently synthesized superheavy elements. Element 114 (Flerovium, Fl) was confirmed in 2012 by IUPAC, and elements up to oganesson (Z=118) have been synthesized. The exact location and extent of the island remains an active research frontier.',
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 6 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Deformed nuclei:" }),
                " Not all nuclei are spherical. Between magic numbers, residual nucleon-nucleon interactions drive the nucleus away from spherical symmetry. Nuclei with numbers of protons or neutrons between magic numbers often adopt prolate (rugby-ball) or oblate (discus) shapes, described by the deformation parameter β. These deformed nuclei exhibit",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "rotational bands" }),
                " — sequences of excited states with energies E_J = (ℏ²/2I) · J(J+1) — directly observable in γ-ray spectra."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "atom-semf",
          title: "Liquid Drop Model and the Semi-Empirical Mass Formula",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
          defaultOpen: false,
          "data-ocid": "basics.semf_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Semi-Empirical Mass Formula" }),
              " ",
              "(SEMF), also called the Bethe-Weizsäcker formula (1935–36), treats the nucleus as a charged, incompressible liquid drop. Despite its classical simplicity, it predicts nuclear binding energies to within ~1% for most nuclei — a remarkable achievement that encodes five distinct pieces of nuclear physics.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 7 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "B(Z,A) = a_V A \\;-\\; a_S A^{2/3} \\;-\\; a_C \\frac{Z^2}{A^{1/3}} \\;-\\; a_A \\frac{(A-2Z)^2}{A} \\;+\\; \\delta",
                annotation: "Total nuclear binding energy B(Z,A) in MeV. The five terms are: volume (aV=15.75), surface (aS=17.8), Coulomb (aC=0.711), asymmetry (aA=23.7), and pairing (δ=±12/√A MeV for even-even/odd-odd; 0 for odd-A).",
                label: "Bethe-Weizsäcker SEMF"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "SEMF terms with physical meaning and standard coefficients",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Term" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Formula" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Coefficient" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Physical Meaning" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: semfTerms.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground align-top", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground", children: t.term }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono text-xs", children: t.formula }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono text-xs text-primary", children: t.coeff }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: t.meaning })
                  ] }, t.term)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "Worked Example: Fe-56 (Z=26, N=30, A=56)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs space-y-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Volume: +15.75 × 56 = +882.0 MeV" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Surface: −17.80 × 56^(2/3) = −17.80 × 14.47 = −257.6 MeV" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Coulomb: −0.711 × 26² / 56^(1/3) = −0.711 × 676 / 3.826 = −125.6 MeV" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Asymmetry: −23.7 × (56−52)² / 56 = −23.7 × 16 / 56 = −6.8 MeV" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Pairing: +12.0 / √56 = +1.6 MeV (even-even nucleus)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border mt-2 pt-1 text-foreground font-semibold", children: "B(SEMF) ≈ 493.6 MeV · Experimental (AME2020): 492.26 MeV · Error: <0.3%" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("semf-curve"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["semf-curve"],
                  "data-ocid": "basics.semf_curve_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Binding Energy Per Nucleon: Key Values" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["semf-curve"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["semf-curve"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                  "B/A peaks at Fe-56 — the endpoint of stellar nucleosynthesis. Both fission (heavy → medium) and fusion (light → medium) release energy by moving toward this maximum. Values from AME2020.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 15 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Binding energy per nucleon for key nuclides",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "A" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "B/A (MeV)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: bindingEnergyPerA.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: row.nuclide === "⁵⁶Fe" ? "bg-primary/5 text-foreground" : "text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-mono", children: row.nuclide }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 text-right", children: row.A }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                className: `py-1.5 pr-3 text-right font-mono ${row.nuclide === "⁵⁶Fe" ? "text-primary font-bold" : ""}`,
                                children: row.BperA
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-xs", children: row.note })
                          ]
                        },
                        row.nuclide
                      )) })
                    ]
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("semf-limits"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["semf-limits"],
                  "data-ocid": "basics.semf_limits_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "SEMF Limitations and Advanced Nuclear Mass Models" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["semf-limits"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["semf-limits"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "While the SEMF is extraordinarily useful, it systematically deviates from experiment near magic numbers (shell effects add up to ~8 MeV extra binding) and fails for light nuclei (A < ~12) where the liquid-drop approximation breaks down entirely." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Modern nuclear mass models include:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-2 list-disc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Finite-Range Droplet Model (FRDM):" }),
                    " ",
                    "Extensions of the liquid-drop model with microscopic shell and pairing corrections (Möller, Nix, Myers, Swiatecki). FRDM2012 achieves RMS error ~0.56 MeV for 2,353 measured masses."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Hartree-Fock-Bogoliubov (HFB):" }),
                    " ",
                    "Fully self-consistent mean-field theory using Skyrme or Gogny effective interactions. HFB-31 achieves ~0.5 MeV RMS error and can predict masses far from stability."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Ab initio methods:" }),
                    " ",
                    "For light nuclei (A < ~40), no-core shell model (NCSM) and coupled cluster theory use realistic NN+3N forces from chiral effective field theory (χEFT), achieving sub-MeV accuracy. Computationally expensive — scales exponentially with A."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Machine learning approaches:" }),
                    " ",
                    "Neural network models trained on AME2020 data achieve ~0.3 MeV RMS error and can interpolate smoothly between measured masses (Lovell et al., PRC 2022)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
                  "All measured nuclear masses are tabulated in AME2020 (Wang et al., Chinese Physics C 45, 030003, 2021) and available from the IAEA Nuclear Data Services.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 15 })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Astrophysical significance:" }),
                " ",
                "The binding energy curve directly determines which nuclear reactions are energetically favorable in stars:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Main sequence:" }),
                  " H → He fusion (B/A: 0 → 7.07 MeV); releases ~26.7 MeV per He-4 produced"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Red giant:" }),
                  " He → C → O fusion (triple-alpha process, B/A → 7.68 MeV)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Massive stars:" }),
                  " C, O, Si burning → approach Fe-56; no more energy can be released; core collapses → supernova"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Supernova / neutron star merger:" }),
                  " ",
                  "r-process (rapid neutron capture) builds elements heavier than iron — moving away from the peak, requiring energy input from the explosion"
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "atom-valley-stability",
          title: "Valley of Stability and the Chart of Nuclides",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          defaultOpen: false,
          "data-ocid": "basics.valley_stability_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Plot all known nuclides on a grid of proton number Z (y-axis) vs. neutron number N (x-axis): this is the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Chart of Nuclides" }),
              "(also called the Segrè chart). As of AME2020, 2,512 nuclides have been experimentally characterized. Only ~254 are stable; the remainder decay on timescales from 10²⁴ years (Bi-209) to nanoseconds (extreme neutron-rich or proton-rich species).",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 9 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mb-5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Light Nuclei (Z < 20)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "N ≈ Z for stability (N/Z ≈ 1.0–1.1). Coulomb repulsion is weak; the SEMF asymmetry term drives N = Z. Example: ¹²C (Z=N=6), ¹⁶O (Z=N=8)." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Heavy Nuclei (Z > 20)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "N > Z needed to offset Coulomb repulsion with additional strong-force binding. For Pb-208: Z=82, N=126, N/Z = 1.54. For U-238: N/Z = 1.59." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-blue-400/5 border border-blue-400/20 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-blue-400 mb-1", children: "Above the valley (neutron-rich)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "β⁻ decay: n → p + e⁻ + ν̄ₑ. Increases Z, decreases N, moves diagonally toward the valley. At extreme N: neutron drip line (N too large to bind)." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-amber-400/5 border border-amber-400/20 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-400 mb-1", children: "Below the valley (proton-rich)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "β⁺ decay or electron capture (EC): p → n. Decreases Z, increases N. At extreme Z: proton drip line (proton emission direct).",
                  " "
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("drip-lines"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["drip-lines"],
                  "data-ocid": "basics.drip_lines_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Nuclear Drip Lines: The Limits of Existence" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["drip-lines"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["drip-lines"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Nuclear existence is bounded by the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "drip lines" }),
                  ' — the limits beyond which adding another proton or neutron produces an unbound nucleus (the nucleon "drips off" immediately, T½ < 10⁻²¹ s):'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-2 list-disc", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Proton drip line:" }),
                    " ",
                    "Experimentally well-mapped up to Z~82. Beyond it, the last proton has negative separation energy Sₚ < 0 and tunnels through the Coulomb barrier. Well-studied examples: ¹⁰¹Sn, ¹⁰⁵Sb."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Neutron drip line:" }),
                    " ",
                    "Experimentally reached only up to ~Z≈10 (Neon isotopes); all heavier isotopes beyond the drip line are predicted but unmeasured. The neutron drip line is critically important for understanding neutron star crusts and r-process nucleosynthesis. Recent RIKEN/RIBF experiments have pushed the drip line to Ne-35 (Z=10, N=25, 2023)."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Halo nuclei:" }),
                    " ",
                    'Near the neutron drip line, certain nuclei form extended neutron halos — one or two loosely bound "valence" neutrons orbiting far outside the nuclear core. Classic example: ¹¹Li (Z=3, N=8), with a matter radius nearly as large as ²⁰⁸Pb. First discovered by Tanihata et al. (1985).'
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Mapping the neutron drip line is a primary goal of Radioactive Ion Beam (RIB) facilities: RIKEN-RIBF (Japan), FRIB (Michigan State, USA), FAIR (GSI, Germany), ISOLDE (CERN, Switzerland).",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 17 })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("valley-decay"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["valley-decay"],
                  "data-ocid": "basics.valley_decay_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Decay Mode Patterns Across the Chart" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["valley-decay"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["valley-decay"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The chart of nuclides is traditionally color-coded by dominant decay mode:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                  {
                    color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
                    mode: "Stable (black/green)",
                    desc: "~254 nuclides; define the spine of the valley"
                  },
                  {
                    color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
                    mode: "β⁻ decay (blue)",
                    desc: "Neutron-rich side; most common decay mode (~1,000 nuclides)"
                  },
                  {
                    color: "bg-orange-500/20 border-orange-500/40 text-orange-400",
                    mode: "β⁺/EC (orange/red)",
                    desc: "Proton-rich side; EC competes with β⁺ for heavy nuclei"
                  },
                  {
                    color: "bg-rose-500/20 border-rose-500/40 text-rose-400",
                    mode: "α decay (yellow)",
                    desc: "Heavy nuclei (Z>82); simultaneous reduction of Z and N by 2"
                  },
                  {
                    color: "bg-purple-500/20 border-purple-500/40 text-purple-400",
                    mode: "Spontaneous fission (SF)",
                    desc: "Very heavy nuclei (Z>90); increases rapidly with Z"
                  },
                  {
                    color: "bg-blue-500/20 border-blue-500/40 text-blue-400",
                    mode: "Proton/neutron emission",
                    desc: "Near drip lines; characteristic of extreme N or Z excess"
                  }
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded border p-2 ${item.color.replace("text-", "").split(" ")[0]} border-${item.color.split(" ")[1]}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `font-semibold text-xs ${item.color.split(" ")[2]}`,
                          children: item.mode
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", children: item.desc })
                    ]
                  },
                  item.mode
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "See the interactive Decay Chain Explorer and Chart of Nuclides visualization on this site for hands-on exploration of these patterns." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Lightest and heaviest stable nuclides:" }),
                " ",
                "The lightest nucleus is ¹H (a single proton; T½ = infinite within current experimental limits). The heaviest stable nuclide is ²⁰⁸Pb (Z=82, N=126, doubly magic). Bi-209 (Z=83), long considered stable, was shown by Marcillac et al. (2003) to alpha-decay with T½ = 2.01 × 10¹⁹ yr — 1.4 billion times the age of the universe.",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 10 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Transuranium elements:" }),
                " ",
                "All elements beyond uranium (Z > 92) are absent from nature (or present in only trace amounts from natural fission or cosmic-ray spallation) because they have no stable isotopes and all have half-lives far shorter than Earth's age. They are produced synthetically in reactors (elements 93–100) or heavy-ion accelerators (elements 101–118). The longest-lived transuranic nuclide is Np-237 (T½ = 2.14 × 10⁶ yr), produced in trace quantities by neutron capture on U-235 in nuclear reactors."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "atom-nuclide-types",
          title: "Isotopes, Isobars, Isotones, and Nuclear Isomers",
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          defaultOpen: false,
          "data-ocid": "basics.nuclide_types_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Nuclides are classified by which nuclear quantum numbers they share. Understanding this taxonomy is essential for reading the Chart of Nuclides, for nuclear medicine (isomers), and for reactor physics (isotopes)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Types of nuclides classified by shared quantum numbers",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Definition" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Example" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Significance" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: nuclideTypes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground align-top", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground", children: t.type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs", children: t.definition }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono text-xs", children: t.example }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: t.note })
                  ] }, t.type)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("isomers-detail"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["isomers-detail"],
                  "data-ocid": "basics.isomers_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Nuclear Isomers in Depth: From Medicine to Energy Storage" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["isomers-detail"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["isomers-detail"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  'A nuclear isomer (metastable state, denoted "m") is an excited nuclear energy level whose transition to the ground state is significantly hindered — often by a large angular momentum difference (high multipolarity) between the isomeric and ground states.',
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 8 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/40 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "⁹⁹ᵐTc — Medical Imaging" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-0.5 text-xs list-disc ml-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Excitation energy: 140.51 keV above ⁹⁹Tc ground state" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "T½ = 6.0067 h (ideal for transport and imaging)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pure γ emission at 140.5 keV (no α or β — minimizes dose)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Used in >20 million SPECT scans/year worldwide" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Produced via Mo-99 → Tc-99m via β⁻ decay (T½ = 65.94 h)" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/40 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "¹⁷⁸ᵐ²Hf — Gamma-Ray Research" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-0.5 text-xs list-disc ml-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Excitation energy: 2,446 keV (2.45 MeV!)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "T½ = 31 years (unusually long for a high-energy isomer)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Investigated as theoretical energy storage medium" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Transition hindered by ΔJ = 8 (K isomer)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Energy density: ~1.3 GJ/g — if triggered, 10⁶× chemical fuels" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Isomers arise when the nuclear excited state has a spin/parity configuration that requires a high-order (E2, M3, M4…) multipole γ transition, which is strongly suppressed by the Weisskopf single-particle estimates. The longer the half-life, the higher the multipolarity difference or the smaller the transition energy." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "K-isomers" }),
                  " in deformed nuclei arise from the projection of angular momentum on the symmetry axis (quantum number K). Transitions that change K by more than the transition multipolarity are K-forbidden — the origin of extraordinarily long-lived isomers like ¹⁷⁸ᵐ²Hf."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggle("isotope-abundance"),
                  className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                  "aria-expanded": !!open["isotope-abundance"],
                  "data-ocid": "basics.isotope_abundance_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Isotopic Abundances and Their Determination" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open["isotope-abundance"] ? "▲ Collapse" : "▼ Expand" })
                  ]
                }
              ),
              open["isotope-abundance"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Natural elements are mixtures of isotopes with fixed fractional abundances (for most elements) determined by nucleosynthesis in stars and the subsequent evolution of the solar system. IUPAC maintains the Commission on Isotopic Abundances and Atomic Weights (CIAAW), which publishes recommended atomic weight values." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Selected examples of isotopic composition (IUPAC 2021):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Natural isotopic abundances of selected elements",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Element" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Isotope" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Natural abundance (%)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Notes" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                        ["Hydrogen", "¹H", "99.9885", "Protium"],
                        [
                          "Hydrogen",
                          "²H (D)",
                          "0.0115",
                          "Deuterium; used as reactor moderator"
                        ],
                        [
                          "Carbon",
                          "¹²C",
                          "98.93",
                          "Mass standard (defines 1 u)"
                        ],
                        ["Carbon", "¹³C", "1.07", "Used in NMR spectroscopy"],
                        ["Oxygen", "¹⁶O", "99.757", "Magic N=Z=8"],
                        [
                          "Uranium",
                          "²³⁵U",
                          "0.720",
                          "Fissile; enriched for reactors and weapons"
                        ],
                        [
                          "Uranium",
                          "²³⁸U",
                          "99.274",
                          "Fertile; transmutes to Pu-239 in reactor"
                        ],
                        [
                          "Boron",
                          "¹⁰B",
                          "19.9",
                          "Strong neutron absorber; control rods"
                        ],
                        [
                          "Boron",
                          "¹¹B",
                          "80.1",
                          "Non-absorbing; natural abundance dominates"
                        ]
                      ].map(([el, iso, ab, note]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3", children: el }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 font-mono", children: iso }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 text-right font-mono text-primary", children: ab }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-xs", children: note })
                      ] }, iso)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Isotopic abundances are measured by",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "mass spectrometry" }),
                  " ",
                  "(TIMS, ICP-MS, IRMS). Small variations in natural abundances — isotope fractionation — are exploited in geochemistry (dating) and environmental science (tracing pollution sources, climate records in ice cores).",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground self-center", children: "Continue exploring:" }),
        subpages.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            size: "sm",
            "data-ocid": `basics.continue_${sp.label.toLowerCase().replace(/\s/g, "_")}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: sp.href, children: [
              sp.label,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 h-3 w-3", "aria-hidden": "true" })
            ] })
          },
          sp.href
        ))
      ] })
    ] })
  ] });
}
export {
  AtomStructure as default
};
