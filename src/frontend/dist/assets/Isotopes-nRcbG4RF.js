import { R as React, j as jsxRuntimeExports, m as motion } from "./index-D72vKdFv.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-ofvrIJP7.js";
import { C as CitationMarker } from "./CitationMarker-CPsy_hl4.js";
import { E as EquationBlock } from "./EquationBlock-D9ydULky.js";
import { S as SectionCard } from "./SectionCard-BzQex3f6.js";
import { n as nuclides } from "./nuclides-CjJxlGKK.js";
const stableExamples = nuclides.filter((n) => n.decayModes.includes("stable")).slice(0, 6);
const radioactiveExamples = nuclides.filter((n) => !n.decayModes.includes("stable")).slice(0, 6);
const elementAbundances = [
  {
    element: "Hydrogen",
    isotope: "¹H (protium)",
    A: 1,
    abundance: "99.9885",
    mass: "1.007825",
    note: "—"
  },
  {
    element: "Hydrogen",
    isotope: "²H (deuterium)",
    A: 2,
    abundance: "0.0115",
    mass: "2.014102",
    note: "Fusion fuel (D-T, D-D); NMR solvent (D₂O)"
  },
  {
    element: "Hydrogen",
    isotope: "³H (tritium)",
    A: 3,
    abundance: "trace",
    mass: "3.016049",
    note: "Cosmogenic + reactor-produced; T½=12.32 yr; β⁻ emitter"
  },
  {
    element: "Carbon",
    isotope: "¹²C",
    A: 12,
    abundance: "98.93",
    mass: "12.000000",
    note: "Mass standard (exactly 12 u by definition)"
  },
  {
    element: "Carbon",
    isotope: "¹³C",
    A: 13,
    abundance: "1.07",
    mass: "13.003355",
    note: "NMR spectroscopy tracer; stable isotope biochemistry"
  },
  {
    element: "Oxygen",
    isotope: "¹⁶O",
    A: 16,
    abundance: "99.757",
    mass: "15.994915",
    note: "Most abundant O isotope; product of He burning in stars"
  },
  {
    element: "Oxygen",
    isotope: "¹⁷O",
    A: 17,
    abundance: "0.038",
    mass: "16.999132",
    note: "Non-zero nuclear spin; NMR-active oxygen tracer"
  },
  {
    element: "Oxygen",
    isotope: "¹⁸O",
    A: 18,
    abundance: "0.205",
    mass: "17.999161",
    note: "Palaeoclimate tracer (δ¹⁸O in ice cores); F-18 production target"
  },
  {
    element: "Chlorine",
    isotope: "³⁵Cl",
    A: 35,
    abundance: "75.77",
    mass: "34.968853",
    note: "Highest-abundance Cl isotope"
  },
  {
    element: "Chlorine",
    isotope: "³⁷Cl",
    A: 37,
    abundance: "24.23",
    mass: "36.965903",
    note: "Chlorine average mass ~35.45 u; isotope ratio used in mass spec"
  },
  {
    element: "Potassium",
    isotope: "³⁹K",
    A: 39,
    abundance: "93.258",
    mass: "38.963707",
    note: "Most abundant stable K isotope"
  },
  {
    element: "Potassium",
    isotope: "⁴⁰K",
    A: 40,
    abundance: "0.01167",
    mass: "39.963998",
    note: "Radioactive; T½=1.248 Gyr; β⁻(89%), EC(11%); ~4,400 Bq in human body"
  },
  {
    element: "Potassium",
    isotope: "⁴¹K",
    A: 41,
    abundance: "6.730",
    mass: "40.961826",
    note: "Stable; used as tracer in nutrition research"
  },
  {
    element: "Iron",
    isotope: "⁵⁴Fe",
    A: 54,
    abundance: "5.845",
    mass: "53.939611",
    note: "—"
  },
  {
    element: "Iron",
    isotope: "⁵⁶Fe",
    A: 56,
    abundance: "91.754",
    mass: "55.934938",
    note: "Highest BE/A of all nuclides (~8.79 MeV/A); endpoint of stellar fusion"
  },
  {
    element: "Iron",
    isotope: "⁵⁷Fe",
    A: 57,
    abundance: "2.119",
    mass: "56.935394",
    note: "Mössbauer spectroscopy (14.4 keV resonance; I=1/2)"
  },
  {
    element: "Iron",
    isotope: "⁵⁸Fe",
    A: 58,
    abundance: "0.282",
    mass: "57.933276",
    note: "—"
  },
  {
    element: "Uranium",
    isotope: "²³⁸U",
    A: 238,
    abundance: "99.274",
    mass: "238.050789",
    note: "Fertile; breeds Pu-239; parent of U-238 decay chain (4n+2)"
  },
  {
    element: "Uranium",
    isotope: "²³⁵U",
    A: 235,
    abundance: "0.720",
    mass: "235.043930",
    note: "Only naturally fissile isotope; σf(thermal)=584 b"
  },
  {
    element: "Uranium",
    isotope: "²³⁴U",
    A: 234,
    abundance: "0.0054",
    mass: "234.040952",
    note: "Secular equilibrium daughter of U-238; α emitter"
  },
  {
    element: "Lead",
    isotope: "²⁰⁴Pb",
    A: 204,
    abundance: "1.4",
    mass: "203.973044",
    note: "Non-radiogenic; primordial; reference for Pb isotope ratios"
  },
  {
    element: "Lead",
    isotope: "²⁰⁶Pb",
    A: 206,
    abundance: "24.1",
    mass: "205.974466",
    note: "Stable endpoint of U-238 (4n+2) decay chain"
  },
  {
    element: "Lead",
    isotope: "²⁰⁷Pb",
    A: 207,
    abundance: "22.1",
    mass: "206.975897",
    note: "Stable endpoint of U-235 (4n+3) decay chain"
  },
  {
    element: "Lead",
    isotope: "²⁰⁸Pb",
    A: 208,
    abundance: "52.4",
    mass: "207.976653",
    note: "Stable endpoint of Th-232 (4n) decay chain; most abundant Pb isotope"
  }
];
const nuclideTypes = [
  {
    type: "Isotopes",
    definition: "Same Z, different N (same element)",
    example: "¹H, ²H, ³H (all hydrogen, Z=1)",
    property: "Identical chemical behaviour; different nuclear & physical properties"
  },
  {
    type: "Isobars",
    definition: "Same A (= Z + N), different Z",
    example: "⁴⁰Ar (Z=18), ⁴⁰K (Z=19), ⁴⁰Ca (Z=20)",
    property: "Same mass number; β-decay connects isobar pairs; only one (or few) are stable"
  },
  {
    type: "Isotones",
    definition: "Same N, different Z",
    example: "N=7: ¹³C (Z=6), ¹⁴N (Z=7), ¹⁵O (Z=8)",
    property: "Same number of neutrons; similar neutron shell effects"
  },
  {
    type: "Nuclear isomers",
    definition: "Same Z and N, different nuclear energy state",
    example: "⁹⁹Tc and ⁹⁹ᵐTc (metastable excited state)",
    property: '"m" notation; deexcitation by internal transition (IT) or isomeric transition'
  },
  {
    type: "Mirror nuclei",
    definition: "Same A; Z and N are interchanged",
    example: "³He (Z=2, N=1) ↔ ³H (Z=1, N=2)",
    property: "Probe charge symmetry of nuclear force; nearly identical structure"
  }
];
const primordalNuclides = [
  {
    nuclide: "U-238",
    halfLife: "4.468 × 10⁹ yr",
    abundance: "99.274% of U",
    note: "Parent of 4n+2 decay chain; ~40 ppb in Earth's crust; drives ~50% of Earth's internal heat"
  },
  {
    nuclide: "Th-232",
    halfLife: "1.405 × 10¹⁰ yr",
    abundance: "100% of Th",
    note: "Parent of 4n chain; ~10 ppm in crust; fertile material for Th fuel cycle"
  },
  {
    nuclide: "U-235",
    halfLife: "7.038 × 10⁸ yr",
    abundance: "0.720% of U",
    note: "Parent of 4n+3 chain; only naturally fissile isotope; T½ shorter → 4.4× less than U-238 at Earth formation"
  },
  {
    nuclide: "K-40",
    halfLife: "1.248 × 10⁹ yr",
    abundance: "0.01167% of K",
    note: "β⁻ (89%) and EC/β⁺ (11%); ~4,400 Bq in human body; ~300 mg/kg in seawater"
  },
  {
    nuclide: "Rb-87",
    halfLife: "4.92 × 10¹⁰ yr",
    abundance: "27.83% of Rb",
    note: "β⁻ decay; used in Rb-Sr radiometric dating (geological timescales)"
  },
  {
    nuclide: "La-138",
    halfLife: "1.02 × 10¹¹ yr",
    abundance: "0.0902% of La",
    note: "β⁻ (34%) and EC (66%); extremely long T½ — almost stable by comparison"
  }
];
const backgroundDoses = [
  {
    source: "Radon-222 + daughters (inhalation)",
    dose_mSv: "~1.15",
    fraction: "~48%",
    notes: "Largest single contributor; from U-238 chain in soil/rock; highly variable indoors"
  },
  {
    source: "Terrestrial gamma (external)",
    dose_mSv: "~0.48",
    fraction: "~20%",
    notes: "From U, Th, K-40 in soil and building materials; higher in granite regions"
  },
  {
    source: "Cosmic radiation (external)",
    dose_mSv: "~0.39",
    fraction: "~16%",
    notes: "Increases with altitude; 2× at 2,000 m vs. sea level; higher for aircrew"
  },
  {
    source: "Internal radionuclides (K-40, C-14)",
    dose_mSv: "~0.29",
    fraction: "~12%",
    notes: "Unavoidable — K-40 in all body potassium; C-14 in all organic carbon"
  },
  {
    source: "Cosmogenic (Be-7, Na-22, etc.)",
    dose_mSv: "~0.006",
    fraction: "<1%",
    notes: "Minor contribution from various cosmogenic nuclides deposited via rain"
  },
  {
    source: "Global average total (UNSCEAR 2020)",
    dose_mSv: "~2.4",
    fraction: "100%",
    notes: "Range: ~1–10+ mSv/yr depending on location, altitude, building materials"
  }
];
const medicalIsotopes = [
  {
    nuclide: "Tc-99m",
    halfLife: "6.01 h",
    decay: "IT (140 keV γ)",
    production: "Mo-99/Tc generator (reactor-produced Mo-99)",
    application: "SPECT bone, cardiac, renal, thyroid imaging",
    scale: "~40 million procedures/yr worldwide"
  },
  {
    nuclide: "F-18",
    halfLife: "109.8 min",
    decay: "β⁺ (97%), EC (3%)",
    production: "Cyclotron: ¹⁸O(p,n)¹⁸F",
    application: "PET/CT: FDG oncology, cardiology, neurology",
    scale: "~6 million PET scans/yr"
  },
  {
    nuclide: "I-131",
    halfLife: "8.02 d",
    decay: "β⁻ (γ 364 keV)",
    production: "Reactor fission product / neutron capture",
    application: "Thyroid cancer therapy & diagnosis; hyperthyroidism",
    scale: "~10 million doses/yr"
  },
  {
    nuclide: "Lu-177",
    halfLife: "6.65 d",
    decay: "β⁻ (γ 208 keV)",
    production: "Reactor: ¹⁷⁶Lu(n,γ)¹⁷⁷Lu",
    application: "PSMA-617 prostate cancer; DOTATATE NETs (FDA 2018/22)",
    scale: "Rapidly growing post-FDA approvals"
  },
  {
    nuclide: "Ra-223",
    halfLife: "11.43 d",
    decay: "α (5 daughters)",
    production: "Ac-227 generator (reactor irradiation)",
    application: "Bone metastases therapy (Xofigo® 2013 FDA)",
    scale: "First approved α-therapy for solid tumors"
  },
  {
    nuclide: "Ga-68",
    halfLife: "67.7 min",
    decay: "β⁺ (89%), EC (11%)",
    production: "Ge-68/Ga-68 generator or cyclotron",
    application: "PET: PSMA prostate, DOTATATE NETs, infection imaging",
    scale: "Rapidly growing; ~1 million doses/yr"
  },
  {
    nuclide: "Ir-192",
    halfLife: "73.83 d",
    decay: "β⁻ (γ 317, 468 keV)",
    production: "Reactor: ¹⁹¹Ir(n,γ)¹⁹²Ir",
    application: "HDR brachytherapy; industrial weld radiography",
    scale: "Widely used globally"
  },
  {
    nuclide: "Co-60",
    halfLife: "5.271 yr",
    decay: "β⁻ (γ 1173+1333 keV)",
    production: "Reactor: ⁵⁹Co(n,γ)⁶⁰Co",
    application: "Gamma Knife; food irradiation; sterilisation; EBRT",
    scale: "~200 PBq produced/yr; billions of devices"
  },
  {
    nuclide: "Am-241",
    halfLife: "432.2 yr",
    decay: "α (γ 59.5 keV)",
    production: "⁴¹Pu(n,γ) → ⁴²Pu(β⁻) → ²⁴¹Am (reactor)",
    application: "Smoke detectors (~1 μCi each); industrial gauges",
    scale: "Billions of smoke detectors worldwide"
  },
  {
    nuclide: "Cs-137",
    halfLife: "30.17 yr",
    decay: "β⁻ (γ 662 keV via Ba-137m)",
    production: "Fission product (U-235 fission yield ~6.1%)",
    application: "Thickness gauges; irradiators; obsolete teletherapy",
    scale: "Ubiquitous nuclear industry; ~50 TBq global stock"
  },
  {
    nuclide: "Mo-99",
    halfLife: "65.94 h",
    decay: "β⁻",
    production: "²³⁵U(n,f) fission product; Mo-98(n,γ) reactor",
    application: "Tc-99m generator parent — global supply chain",
    scale: "~30,000 Tc generators/wk; 5 production reactors worldwide"
  },
  {
    nuclide: "Se-75",
    halfLife: "119.8 d",
    decay: "EC (γ 136, 265, 280 keV)",
    production: "Reactor: ⁷⁴Se(n,γ)⁷⁵Se",
    application: "Industrial radiography (steel pipe welds, castings)",
    scale: "Lower energy than Ir-192; preferred for thinner materials"
  }
];
function Isotopes() {
  const [open, setOpen] = React.useState({});
  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Isotopes",
        subtitle: "Atoms of the same element with different numbers of neutrons — same chemical behaviour, vastly different nuclear properties.",
        audienceLevel: "beginner",
        readTimeMin: 35
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "isotopes.definition_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "What Are Isotopes?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "All atoms of an element have the same number of protons (Z), which determines their chemical identity. But the nucleus can contain varying numbers of neutrons (N). Atoms of the same element with different N are called",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "isotopes" }),
          ". For example, hydrogen has three naturally occurring isotopes: protium (¹H, no neutrons), deuterium (²H, one neutron), and tritium (³H, two neutrons)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: [
          "There are ~3,300 known nuclides. Only ~254 are stable — the rest are radioactive with half-lives ranging from less than a femtosecond to billions of years. The region of nuclear stability on the Z–N plane is called the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "valley of stability" }),
          " or nuclear valley. Moving away from it in either direction (too many or too few neutrons relative to protons) leads to radioactive nuclides."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "isotopes.notation_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Nuclide Notation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "^A_Z\\text{X}",
            annotation: "Standard nuclide notation: X is the element symbol, A is the mass number (protons + neutrons), Z is the atomic number (protons). Example: ²³⁸₉₂U is Uranium-238. In text, the hyphen notation U-238 is equally standard.",
            label: "Nuclide Notation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-muted/30 rounded-lg p-3 text-sm font-mono space-y-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "²³⁸U" }),
            " — Uranium-238: Z=92, N=146, A=238"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "⁹⁹ᵐTc" }),
            ' — Technetium-99m: "m" = metastable nuclear isomer'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "¹⁷⁸ᵐ²Hf" }),
            " — Hafnium-178m2: second known isomeric state"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "²³⁸₉₂U" }),
            " — Full notation with Z subscript (implied by element symbol; optional)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "isotopes.stable_table_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Selected Stable Isotopes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "aria-label": "Selected stable isotopes with properties",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "N" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "BE/A (MeV)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground text-right", children: "Abundance (%)" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: stableExamples.map((n) => {
                var _a, _b;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono font-medium text-foreground", children: n.symbol }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right", children: n.Z }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right", children: n.N }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right", children: ((_a = n.bindingEnergyPerNucleon_MeV) == null ? void 0 : _a.toFixed(3)) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: ((_b = n.abundance) == null ? void 0 : _b.toFixed(3)) ?? "—" })
                ] }, n.symbol);
              }) })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "isotopes.radioactive_table_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Selected Radioactive Nuclides" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "aria-label": "Selected radioactive nuclides with decay properties",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Nuclide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Half-life" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Decay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground text-right", children: "Q (MeV)" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: radioactiveExamples.map((n) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono font-medium text-foreground", children: n.symbol }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3", children: n.halfLifeStr }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3", children: n.decayModes.join(", ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: ((_a = n.Qvalue_MeV) == null ? void 0 : _a.toFixed(3)) ?? "—" })
                ] }, n.symbol);
              }) })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "isotopes.applications_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-3", children: "Why Isotopes Matter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Medicine:" }),
                  " Tc-99m (T½ = 6 hr) is the most widely used diagnostic radioisotope — ~40 million procedures per year worldwide. Lu-177 and Ra-223 represent a new generation of targeted radionuclide therapies."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Energy:" }),
                  " U-235 (0.72% of natural uranium) is the primary fissile fuel for nuclear reactors; U-238 (99.27%) is a fertile material that breeds Pu-239. Th-232 is the cornerstone of the thorium fuel cycle."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Dating:" }),
                  " C-14 (T½ = 5,730 yr) enables radiocarbon dating of organic materials up to ~50,000 years old; U-Pb and Rb-Sr systems date rocks to billions of years."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Research:" }),
                  " Stable isotope tracers (e.g., ¹³C, ¹⁵N, ¹⁸O) are used in biochemistry, geology, palaeoclimatology, and nutrition science."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Industry:" }),
                  " Am-241 (T½ = 432 yr) powers billions of smoke detectors; Cs-137 and Co-60 sterilise medical equipment and irradiate food; Ir-192 inspects welds and pipelines via radiography."
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded-lg mb-2",
          "data-ocid": "isotopes.natural_abundance_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle("naturalAbundance"),
                className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                "aria-expanded": !!open.naturalAbundance,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                    "Natural Isotopic Abundance",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "beginner" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: open.naturalAbundance ? "▲" : "▼" })
                ]
              }
            ),
            open.naturalAbundance && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "Most elements occur in nature as a mixture of isotopes. The relative amounts — expressed as mole fractions — are called",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "natural isotopic abundances" }),
                ". These are remarkably constant across the solar system (variations at the 0.01–0.1% level only), set by nucleosynthesis in stars and subsequent solar system processing.",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 9 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "The",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "standard atomic weight" }),
                " ",
                "of an element is the weighted average of all naturally occurring isotope masses:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "A_r(\\text{X}) = \\sum_i \\theta_i \\cdot m_i",
                  annotation: "Aᵣ is the standard atomic weight; θᵢ is the fractional abundance of isotope i; mᵢ is its atomic mass in unified atomic mass units (u). 1 u = 1/12 of the mass of ¹²C = 931.494 MeV/c².",
                  label: "Standard Atomic Weight"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Worked Example: Atomic Weight of Carbon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold mb-1", children: "Given (NIST 2021):" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "¹²C: θ = 0.9893, m = 12.000000 u" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "¹³C: θ = 0.0107, m = 13.003355 u" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-t border-border/50 pt-1 mt-1", children: "¹²C contribution: 0.9893 × 12.000000 = 11.8716 u" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "¹³C contribution: 0.0107 × 13.003355 = 0.1392 u" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "border-t border-border/50 pt-1 mt-1 font-bold text-foreground", children: [
                    "Aᵣ(C) = 11.8716 + 0.1392 =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "12.011 u" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "(IUPAC 2021 standard atomic weight: 12.011 ± 0.002)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Selected Natural Isotopic Abundances" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "table",
                    {
                      className: "w-full text-xs",
                      "aria-label": "Natural isotopic abundances for selected elements",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Element" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Isotope" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground text-right", children: "A" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground text-right", children: "Abundance (%)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground text-right", children: "Mass (u)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Notable Use / Property" })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: elementAbundances.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-medium text-foreground whitespace-nowrap", children: r.element }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono whitespace-nowrap", children: r.isotope }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-right", children: r.A }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-right font-mono", children: r.abundance }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-right font-mono", children: r.mass }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: r.note })
                        ] }, r.isotope)) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground italic", children: [
                    "Source: NIST Atomic Weights and Isotopic Compositions 2021; IUPAC 2021 Standard Atomic Weights.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 9 })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1.5 text-sm", children: "Lead: The Terminal Isotope Puzzle" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed", children: [
                  "Lead has four stable isotopes, but their abundances vary significantly across rock samples of different age. Pb-206, Pb-207, and Pb-208 are the final stable daughters of the U-238, U-235, and Th-232 decay chains respectively. Only Pb-204 is purely primordial (non-radiogenic). The",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "⁲⁰⁷Pb/²⁰⁶Pb ratio" }),
                  " ",
                  "is the foundation of U-Pb geochronology, enabling dating of the oldest terrestrial minerals (zircons in Western Australia, ~4.4 Gyr)."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1.5 text-sm", children: "Mono-isotopic Elements" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed", children: [
                  "Twenty elements have a single naturally occurring stable isotope:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "F-19, Na-23, Al-27, P-31, Mn-55, Co-59, As-75, Y-89, Nb-93, Rh-103, I-127, Cs-133, Pr-141, Tb-159, Ho-165, Tm-169, Au-197, Bi-209" }),
                  " ",
                  "and others. Their atomic weight equals the mass of that single isotope exactly. Bismuth-209 was historically considered stable; its α-decay was confirmed in 2003 with T½ = 2.0 × 10¹⁹ yr — effectively stable for all practical purposes."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded-lg mb-2",
          "data-ocid": "isotopes.classification_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle("classification"),
                className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                "aria-expanded": !!open.classification,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                    "Isotopes, Isobars, Isotones, and Nuclear Isomers",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: open.classification ? "▲" : "▼" })
                ]
              }
            ),
            open.classification && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Nuclear physicists use several terms to classify nuclides that share one quantum number while differing in others. Understanding these distinctions is essential for reading nuclear databases and literature." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "table",
                {
                  className: "w-full text-xs",
                  "aria-label": "Nuclide classification types",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Type" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Definition" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Example" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Key Property" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: nuclideTypes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2 font-semibold text-foreground whitespace-nowrap", children: r.type }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2", children: r.definition }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2 font-mono", children: r.example }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: r.property })
                    ] }, r.type)) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Isobars in Detail: The A = 40 Chain" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed mb-2", children: "A=40 is one of the most instructive isobar chains. Three isobars coexist in nature:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-3 mb-2", children: [
                  {
                    nuc: "⁴⁰Ar (Z=18)",
                    stable: true,
                    abund: "99.6% of Ar",
                    note: "EC daughter of K-40; highest noble gas abundance"
                  },
                  {
                    nuc: "⁴⁰K (Z=19)",
                    stable: false,
                    abund: "0.0117% of K",
                    note: "β⁻ 89% → Ca-40; EC 11% → Ar-40; T½=1.248 Gyr"
                  },
                  {
                    nuc: "⁴⁰Ca (Z=20)",
                    stable: true,
                    abund: "96.94% of Ca",
                    note: "β⁻ daughter of K-40; most abundant Ca isotope"
                  }
                ].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-lg border p-3 text-xs ${a.stable ? "border-border bg-muted/20" : "border-primary/40 bg-primary/5"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1 font-mono", children: a.nuc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-xs mb-1 font-semibold ${a.stable ? "text-green-400" : "text-yellow-400"}`,
                          children: a.stable ? "Stable" : "Radioactive"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: a.abund }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: a.note })
                    ]
                  },
                  a.nuc
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "K-40 decays in two competing channels, producing both its neighbours. This is why argon accumulates in closed geological systems (K-Ar dating) and why Ca-40 is the most abundant calcium isotope despite calcium having five stable isotopes." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Nuclear Isomers: Tc-99m in Detail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed mb-2", children: [
                  "A ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "nuclear isomer" }),
                  " ",
                  'is the same nuclide in an excited nuclear energy state, denoted by "m" (metastable) when the excited state has a measurable half-life. Technetium-99m is the most medically important nuclear isomer:'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs space-y-1.5 text-muted-foreground font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "⁹⁹Mo" }),
                    " (T½=65.9 h) → β⁻ → ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "⁹⁹ᵐTc" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "⁹⁹ᵐTc" }),
                    " (T½=6.01 h, E*=140.5 keV) → IT →",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "⁹⁹Tc" }),
                    " + γ (140 keV)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "⁹⁹Tc" }),
                    " (T½=211,100 yr) → β⁻ → ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "⁹⁹Ru" }),
                    " ",
                    "(stable)"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-2", children: 'The 140 keV gamma ray is ideal for SPECT cameras (optimal detection efficiency, low tissue dose). Mo-99 is produced by U-235 fission in reactors and shipped globally as a Mo-99/Tc-99m generator ("technetium cow"), where Tc-99m is eluted daily for 1–2 weeks.' })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "High-Energy Isomers: Hf-178m2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: "Hafnium-178m2 holds the record for stored nuclear excitation energy per unit mass. Its second isomeric state (E* = 2.446 MeV, T½ = 31 yr, J^π = 16⁺) can in principle be stimulated to release energy by X-ray or γ-ray bombardment — a phenomenon studied in the 1990s–2000s that generated significant controversy regarding its potential as a gamma-ray amplifier. Current consensus is that triggered emission at practical energy gains is not achievable. The isomer remains a subject of fundamental nuclear structure research." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Mirror Nuclei" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: "Mirror nuclei have the same A but with Z and N swapped. For example:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2 mt-2", children: [
                  {
                    pair: "³H (Z=1, N=2) ↔ ³He (Z=2, N=1)",
                    note: "Hydrogen-3 (tritium) and Helium-3 are mirrors; ³H is radioactive (β⁻), ³He is stable"
                  },
                  {
                    pair: "¹⁴C (Z=6, N=8) ↔ ¹⁴O (Z=8, N=6)",
                    note: "Both radioactive; C-14 by β⁻, O-14 by β⁺; compare to stable N-14 (Z=7,N=7)"
                  },
                  {
                    pair: "³¹S (Z=16, N=15) ↔ ³¹P (Z=15, N=16)",
                    note: "S-31 is radioactive (β⁻); P-31 is the only stable phosphorus isotope (mono-isotopic)"
                  }
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg border border-border bg-muted/20 p-2.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground text-xs mb-1", children: m.pair }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: m.note })
                    ]
                  },
                  m.pair
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-2", children: [
                  "Mirror nuclei probe",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "charge symmetry" }),
                  " ",
                  "of the nuclear force: the strong interaction is approximately the same whether you swap protons and neutrons (isospin symmetry). Small differences between mirror pairs test isospin-symmetry breaking and Coulomb effects."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded-lg mb-2",
          "data-ocid": "isotopes.mass_parabola_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle("massParabola"),
                className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                "aria-expanded": !!open.massParabola,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                    "The Mass Parabola and Beta Stability",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: open.massParabola ? "▲" : "▼" })
                ]
              }
            ),
            open.massParabola && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "For a fixed mass number A (an isobar chain), the Semi-Empirical Mass Formula (SEMF / Weizsäcker formula) predicts nuclear binding energy — and hence atomic mass — varies quadratically with Z. The most stable nuclide in any isobar chain sits at the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "minimum of the mass parabola" }),
                " ",
                "(maximum binding energy). Nuclides on either side decay by β⁻ (if neutron-rich) or β⁺/EC (if proton-rich) toward the valley of stability.",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 5 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "M(Z, A) \\approx M_0(A) + \\alpha Z + \\beta Z^2",
                  annotation: "For fixed A, atomic mass M(Z,A) follows a parabola in Z. M₀(A), α, and β are functions of SEMF coefficients and A. Minimum mass (maximum stability) occurs at dM/dZ = 0.",
                  label: "Isobaric Mass Parabola"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Most Stable Z as a Function of A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mb-2 leading-relaxed", children: [
                  "Setting dM/dZ = 0 and solving using SEMF coefficients gives the most stable atomic number for mass number A. This formula incorporates the competition between the asymmetry term (favouring N≈Z for light nuclei) and the Coulomb term (favouring N",
                  ">",
                  ">",
                  "Z for heavy nuclei):"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "Z_{\\text{stable}}(A) \\approx \\frac{A}{2 + 0.015 A^{2/3}}",
                    annotation: "Approximate most stable proton number Z for a given A. The factor 0.015 A^(2/3) accounts for the Coulomb term increasing with A, driving the stability line progressively below Z=N for heavy nuclei. For ¹²C: Z ≈ 6.0 (correct). For ²⁰⁸Pb: Z ≈ 82 (correct).",
                    label: "Optimal Z Formula (SEMF)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs font-mono text-muted-foreground mt-2 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Verification examples:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "A=12: Z = 12 / (2 + 0.015×12^(2/3)) = 12 / (2 + 0.070) =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "5.97 ≈ 6" }),
                    " → ¹²C ✓"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "A=40: Z = 40 / (2 + 0.015×40^(2/3)) = 40 / (2 + 0.200) =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "18.2" }),
                    " → ⁴⁰Ar (Z=18) or ⁴⁰Ca (Z=20) ✓"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "A=120: Z = 120 / (2 + 0.015×120^(2/3)) = 120 / (2 + 0.733) =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "43.9 ≈ 50" }),
                    " → ¹²⁰Sn (Z=50) ✓"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "A=208: Z = 208 / (2 + 0.015×208^(2/3)) = 208 / (2 + 1.546) =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "58.7" }),
                    " (approximate; actual ²⁰⁸Pb Z=82)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-muted-foreground", children: "(SEMF is approximate; magic numbers deviate)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Odd-A vs. Even-A Isobars" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-3 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Odd-A (single parabola)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                      "Exactly one nuclide at the minimum is stable. All others β-decay toward it. The pairing energy δ = 0 for odd-A, so there is only one parabola.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Example: A=99 → only Ru-99 (Z=44) is stable. Y-99 → Zr-99 → Nb-99 → Mo-99 → Tc-99 → Ru-99 (stable). Beyond Ru, Rh-99 → Pd-99 → ... all β⁺-decay back to Ru-99."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-3 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Even-A (two parabolas)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                      "Even-even nuclei (even Z, even N) sit on a lower parabola (+|δ| pairing energy). Odd-odd nuclei sit on a higher parabola (−|δ|). Result: 1–4 even-even isobars are often simultaneously stable.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Example: A=64 →",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Ni-64 (Z=28)" }),
                      " ",
                      "and",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Zn-64 (Z=30)" }),
                      " ",
                      "both stable (even-even); Cu-64 (Z=29, odd-odd) is unstable, T½=12.7 h, decays BOTH ways: β⁻ (38%) → Zn-64 and β⁺/EC (62%) → Ni-64."
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "β-Decay Kinematics on the Parabola" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed mb-2", children: "Each β-decay step moves one unit along the isobar chain:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "β⁻ decay: Z → Z+1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono", children: "n → p + e⁻ + ν̄ₑ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Occurs when N/Z is too high (neutron-rich; left side of parabola). Converts a neutron to a proton, moving the nuclide toward higher Z (rightward on isobar chain)." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "β⁺ / EC: Z → Z−1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono", children: "p → n + e⁺ + νₑ (β⁺)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono", children: "p + e⁻ → n + νₑ (EC)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
                      "Occurs when Z/N is too high (proton-rich; right side). Converts proton to neutron. EC dominates for heavy nuclides where β⁺ Q-value ",
                      "<",
                      " 1.022 MeV (2mₑc²)."
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Why Only 4 Odd-Odd Stable Nuclides Exist" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed", children: [
                  "Odd-odd nuclei (odd Z and odd N) sit on the ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "upper" }),
                  " ",
                  "parabola due to the negative pairing energy contribution. For A ",
                  ">",
                  " 14, this means all odd-odd isobars lie above at least one even-even isobar. They decay (usually β⁻ or β⁺) toward the lower parabola. The four exceptions —",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "²H, ⁶Li, ¹⁰B, ¹⁴N" }),
                  " ",
                  "— survive because at low A the Coulomb term is negligible, the parabola curvature is shallow, and no isobaric even-even nuclide is energetically more favourable."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded-lg mb-2",
          "data-ocid": "isotopes.natural_radioactivity_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle("naturalRadioactivity"),
                className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                "aria-expanded": !!open.naturalRadioactivity,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                    "Radioactive Isotopes in Nature",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: open.naturalRadioactivity ? "▲" : "▼" })
                ]
              }
            ),
            open.naturalRadioactivity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                'Naturally Occurring Radioactive Material (NORM) is ubiquitous. Every rock, every litre of seawater, every living cell contains radioactive nuclides. The concept of "natural radioactivity" covers three distinct categories, each with its own origin and time profile.',
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 10 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "A. Primordial Radionuclides" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-2 leading-relaxed", children: "Primordial nuclides have half-lives comparable to or greater than the age of the Solar System (~4.57 Gyr). They were synthesised in stellar nucleosynthesis events before Earth's formation and have persisted to the present day." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Key primordial radionuclides",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Nuclide" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Half-life" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Abundance" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Significance" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: primordalNuclides.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono font-medium text-foreground", children: r.nuclide }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-mono whitespace-nowrap", children: r.halfLife }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 whitespace-nowrap", children: r.abundance }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: r.note })
                      ] }, r.nuclide)) })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "B. Cosmogenic Radionuclides" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-2 leading-relaxed", children: "Produced continuously by high-energy cosmic-ray particles (primarily protons and alpha particles from supernovae) interacting with atmospheric nuclei. Their steady-state concentration in the atmosphere represents an equilibrium between production and decay." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-3", children: [
                  {
                    nuc: "C-14 (T½=5,730 yr)",
                    reaction: "¹⁴N(n,p)¹⁴C",
                    use: "Radiocarbon dating of organic material up to ~50,000 yr. Steady-state ~226 Bq/kg C in living organisms. Nobel Prize, Libby 1960."
                  },
                  {
                    nuc: "Be-10 (T½=1.387 Myr)",
                    reaction: "Spallation of N and O",
                    use: "Cosmogenic exposure dating of rock surfaces; ice core archives of solar/galactic cosmic ray flux history."
                  },
                  {
                    nuc: "H-3 Tritium (T½=12.32 yr)",
                    reaction: "¹⁴N(n,³H)¹²C",
                    use: "Natural tracer in oceanography/hydrology (ocean circulation, groundwater age). Peak atmospheric inventory ~3× normal post weapons testing (1960s)."
                  }
                ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg border border-border bg-muted/20 p-2.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs mb-1", children: c.nuc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-mono mb-1", children: c.reaction }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: c.use })
                    ]
                  },
                  c.nuc
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "C. Radiogenic Chain Products" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs leading-relaxed mb-2", children: [
                  "Daughters of the three major decay chains reach secular equilibrium with their primordial parents. The most radiologically significant is",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Radon-222" }),
                  " ",
                  "(T½=3.82 days), a gaseous α-emitter in the U-238 chain. Rn-222 seeps from uranium-bearing rocks and soils into buildings, where it accounts for approximately 50% of the average global natural radiation dose."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs font-mono text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold mb-1", children: "Part of the U-238 chain near radon:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "²²⁶Ra (T½=1,600 yr) → α →",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "²²²Rn (T½=3.82 d)" }),
                    " ",
                    "→ α → ²¹⁸Po → ..."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Ra-226 is present wherever U-238 is (secular equilibrium in old rocks). Rn-222 is a gas and migrates; short-lived Po/Pb/Bi daughters deposit in lungs." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Natural Background Radiation Dose (UNSCEAR 2020)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "table",
                    {
                      className: "w-full text-xs",
                      "aria-label": "Natural background radiation dose contributions UNSCEAR 2020",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Source" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground text-right", children: "Dose (mSv/yr)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground text-right", children: "Fraction" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Notes" })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: backgroundDoses.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 font-medium text-foreground", children: r.source }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-right font-mono", children: r.dose_mSv }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-2 text-right font-mono", children: r.fraction }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5", children: r.notes })
                        ] }, r.source)) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground italic", children: [
                    "Source: UNSCEAR 2020 Annex B. ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 10 })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "K-40 in the Human Body" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs space-y-1 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A 70 kg human contains ~140 g of potassium (required for nerve/muscle function)." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Of natural potassium, 0.01167% is radioactive K-40." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "Mass of K-40 = 0.0001167 × 140 g =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "0.0163 g" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "Number of K-40 atoms: N = (0.0163 × 10⁻³ kg × 6.022×10²³) / (0.040 kg/mol) =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2.45 × 10²⁰" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "Activity A = λN = (ln2 / T½) × N = (0.693 / 3.94×10¹⁶ s) × 2.45×10²⁰ =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "~4,300 Bq" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground italic", children: "This is internal, unavoidable, and contributes ~0.17 mSv/yr effective dose." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-3 text-xs", children: [
                { source: "Typical soil", value: "~40 Bq/kg (UNSCEAR 2020)" },
                { source: "Seawater (K-40 dominant)", value: "~12 Bq/L" },
                {
                  source: "Human body total",
                  value: "~7,400 Bq (≈100 Bq/kg)"
                },
                {
                  source: "Radon-222 indoor (global avg)",
                  value: "~40 Bq/m³"
                },
                {
                  source: "Granite building materials",
                  value: "~1,000 Bq/kg (U+Th+K)"
                },
                { source: "Banana (K-40 only)", value: "~15 Bq per banana" }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: s.source }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: s.value })
                  ]
                },
                s.source
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded-lg mb-2",
          "data-ocid": "isotopes.medical_table_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle("medicalIndustrial"),
                className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                "aria-expanded": !!open.medicalIndustrial,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                    "Medically and Industrially Important Isotopes",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: open.medicalIndustrial ? "▲" : "▼" })
                ]
              }
            ),
            open.medicalIndustrial && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "Nuclear medicine and industrial radiography depend on isotopes chosen for their",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "radiation type" }),
                " (α particles deliver localised dose; β⁻ treats tissue; γ enables imaging or penetrates materials),",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "half-life" }),
                " (long enough for logistics, short enough for safety), and",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "chemical properties" }),
                " ",
                "(can be attached to targeting molecules). The following table covers the most clinically and commercially significant radionuclides.",
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 7 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Medically and industrially important radioisotopes",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Nuclide" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "T½" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Decay" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Production" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-2 font-semibold text-foreground", children: "Application" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Scale / Context" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: medicalIsotopes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2 font-mono font-medium text-foreground whitespace-nowrap", children: r.nuclide }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2 font-mono whitespace-nowrap", children: r.halfLife }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2 whitespace-nowrap", children: r.decay }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2", children: r.production }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-2", children: r.application }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: r.scale })
                      ] }, r.nuclide)) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground italic", children: [
                  "Sources: IAEA Nuclear Medicine Resources Manual 2020; NNDC NuDat 3.0; FDA approval databases.",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 7 })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Targeted Alpha Therapy (TAT): The Frontier" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: "Alpha-emitting radionuclides (Ra-223, At-211, Ac-225, Bi-213) deliver highly localised cytotoxic dose (range ~50–100 μm in tissue ≈ 2–10 cell diameters). This limits off-target damage while achieving high linear energy transfer (LET, ~80 keV/μm vs ~0.2 keV/μm for γ). Ra-223 dichloride (Xofigo) was the first alpha-emitter approved for oncology (FDA 2013, prostate cancer bone metastases). Ac-225 supplies Bi-213 via a generator system and is under active development for numerous cancer targets." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "The Mo-99 / Tc-99m Global Supply Chain" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: `~30,000 Tc-99m "generators" are shipped worldwide every week from five primary production reactors (BR2 Belgium, HFR Netherlands, NRU Canada, SAFARI-1 South Africa, Maria Poland). Mo-99's 65.9-hour half-life means any reactor shutdown halts supply within days. The 2009–2010 NRU and HFR simultaneous outages caused a global crisis, triggering OECD/NEA establishment of a nuclear medicine supply security framework. Non-reactor production via Mo-100(γ,n)Mo-99 using electron linacs is now being commercialised (NorthStar Medical Radioisotopes, SHINE Technologies).` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-yellow-400 mb-1", children: "⚠ Regulatory Note" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All isotopes listed are produced, transported, and used under strict regulatory oversight (NRC/Agreement States in the US; national nuclear regulatory bodies internationally; IAEA safety standards). Medical administration requires specific licensing. Industrial radiography sources are sealed sources under Category 2–3 classification." })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded-lg mb-2",
          "data-ocid": "isotopes.databases_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle("databases"),
                className: "w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors",
                "aria-expanded": !!open.databases,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                    "Isotope Notation, Charts, and Authoritative Databases",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "beginner" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: open.databases ? "▲" : "▼" })
                ]
              }
            ),
            open.databases && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "The global nuclear science community maintains rigorously evaluated databases for nuclear masses, decay data, and nuclear structure. These are the authoritative sources used by this site and by all professional nuclear data work:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                {
                  name: "ENSDF (NNDC / BNL)",
                  desc: "Evaluated Nuclear Structure Data File. Spin-parities, level energies, gamma transitions, and decay data for ~3,300 nuclides. Updated continuously via international collaboration (IAEA CRP network).",
                  url: "nndc.bnl.gov/ensdf"
                },
                {
                  name: "AME2020",
                  desc: "Atomic Mass Evaluation 2020 (Huang et al., Chinese Physics C 45, 030002, 2021). Ground-truth atomic masses, mass excesses, and Q-values derived from 19,000+ experimental measurements.",
                  url: "nds.iaea.org/amdc"
                },
                {
                  name: "NUBASE2020",
                  desc: "Nuclear properties database: half-lives, spin-parities, excitation energies, and isomer data for all known nuclides. Published alongside AME2020 by the same team (Wang et al., CPC 45, 030003, 2021).",
                  url: "nds.iaea.org/amdc"
                },
                {
                  name: "IAEA Live Chart of Nuclides",
                  desc: "Interactive online chart with ENSDF data: decay modes, half-lives, gamma energies, nuclear levels, Q-values. Colour-coded by decay mode. Exportable. Used in this site's visualisations.",
                  url: "nds.iaea.org/relnsd/vcharthtml"
                },
                {
                  name: "NuDat 3.0 (NNDC)",
                  desc: "Web interface for ENSDF data retrieval. Searchable by nuclide, radiation type, or energy. CSV and XML export. REST API available for programmatic access.",
                  url: "nndc.bnl.gov/nudat3"
                },
                {
                  name: "NIST CODATA / Atomic Weights",
                  desc: "Fundamental constants (c, ħ, mₑ, mₙ, mₚ): 1 u = 931.494 MeV/c². NIST also maintains isotopic abundances and atomic weights (updated 2021).",
                  url: "physics.nist.gov"
                }
              ].map((db) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-3 text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: db.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-1.5", children: db.desc }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-primary/80", children: db.url })
                  ]
                },
                db.name
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Reading Nuclide Notation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-sm font-mono space-y-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "²³⁸U" }),
                    " or",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "U-238" }),
                    " — Uranium-238: Z=92, N=146, A=238"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "⁹⁹ᵐTc" }),
                    " or",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Tc-99m" }),
                    " — metastable nuclear isomer (lowercase m)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "¹⁷⁸ᵐ²Hf" }),
                    " — second isomeric state (m2 or superscript 2)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "²³⁸₉₂U" }),
                    " — full notation with Z subscript (Z is redundant; implied by element symbol)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "n, p, d, t, ³He, α" }),
                    " ",
                    "— shorthand for neutron, proton, deuteron, triton, helium-3, alpha particle"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Nuclear Reaction Notation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mb-2 leading-relaxed", children: [
                  "Reactions are written in a compact shorthand:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "target(projectile, ejectile)product" }),
                  ". Examples from production of medical isotopes:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-xs font-mono space-y-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "¹⁸O(p,n)¹⁸F" }),
                    " — Oxygen-18 bombarded by protons, emits neutron, produces F-18 [PET production]"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "⁹⁸Mo(n,γ)⁹⁹Mo" }),
                    " — Mo-98 captures thermal neutron, emits gamma, produces Mo-99 [Tc-99m chain]"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "¹⁴N(n,p)¹⁴C" }),
                    " — Nitrogen-14 captures cosmic neutron, ejects proton, produces C-14 [radiocarbon]"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "²³⁵U(n,f)" }),
                    " — U-235 fission induced by neutron [reactor fuel; Mo-99 production byproduct]"
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Isotopes as default
};
