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
function FusionPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Fusion",
        subtitle: "The energy source of stars — combining light nuclei to release enormous amounts of energy. The long-sought goal of fusion energy research.",
        audienceLevel: "intermediate",
        readTimeMin: 35
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fusion.intro_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "How Fusion Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "Fusion occurs when two light nuclei come close enough for the strong nuclear force to bind them together. The challenge is overcoming the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Coulomb barrier" }),
          " — the electrostatic repulsion between their positive charges. In stars, extreme gravitational pressure and temperatures exceeding 10 million Kelvin achieve this. On Earth, magnetic confinement (tokamaks) and inertial confinement (lasers) are the leading approaches."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fusion.dt_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "The D-T Reaction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "The most favorable fusion reaction for terrestrial energy production:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "^2_1\\\\text{D} + ^3_1\\\\text{T} \\\\rightarrow ^4_2\\\\text{He} + n + 17.6\\\\text{ MeV}",
            annotation: "Deuterium (D) plus Tritium (T) fuse to produce a helium-4 nucleus and a neutron, releasing 17.6 MeV. About 80% of the energy goes to the neutron.",
            label: "D-T Fusion Reaction"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Deuterium is abundant in seawater (~33 g/m³). Tritium must be bred from lithium-6 using the fusion neutrons themselves — making the fuel cycle effectively inexhaustible if achieved." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fusion.pp_chain_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "The Proton-Proton Chain (Stars)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "4 ^1_1\\\\text{H} \\\\rightarrow ^4_2\\\\text{He} + 2e^+ + 2\\\\nu_e + 26.7\\\\text{ MeV}",
            annotation: "The net result of the proton-proton chain: four hydrogen nuclei fuse to form one helium-4, releasing two positrons, two neutrinos, and 26.7 MeV of energy. This powers the Sun.",
            label: "Net p-p Chain"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "fusion.status_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Current Status of Fusion Energy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ITER (France):" }),
              " ",
              "International tokamak under construction; designed to produce 500 MW from 50 MW input (Q = 10). First plasma targeted for late 2020s."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "NIF (USA):" }),
              " In December 2022, the National Ignition Facility achieved ignition for the first time — producing more energy from fusion than the laser energy delivered to the target (Q > 1)."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Private ventures:" }),
              " ",
              "Companies like Commonwealth Fusion Systems (SPARC tokamak) and TAE Technologies are pursuing compact, high-temperature superconducting magnet approaches targeting 2030s commercial plants."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Fusion Fuel Cycles: D-T, D-D, and Beyond",
          badge: "intermediate",
          ocid: "fusion.fuel_cycles_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "Different fusion fuel combinations offer radically different energy yields, optimal plasma temperatures, neutron production rates, and fuel availability. First-generation reactors will almost certainly use D-T; future generations may exploit aneutronic fuels to eliminate neutron activation of structural materials entirely." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Deuterium-Tritium (D-T)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^2_1\\\\text{H} + ^3_1\\\\text{H} \\\\rightarrow ^4_2\\\\text{He}\\\\,(3.52\\\\text{ MeV}) + n\\\\,(14.06\\\\text{ MeV}),\\\\quad Q = 17.59\\\\text{ MeV}",
                annotation: "The D-T reaction has the highest fusion cross-section of any fuel pair — peaking at approximately 5 barns at 64 keV (centre-of-mass). 80% of the released energy goes to the neutron, 20% to the helium-4 nucleus (alpha particle) which directly heats the plasma.",
                label: "D-T Reaction"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4 mb-5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "Tritium Breeding Blanket" }),
              "Tritium (T½ = 12.32 yr) does not occur naturally in useful quantities. It must be bred inside the reactor blanket by irradiating lithium-6 with the fusion neutrons:",
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-mono text-xs bg-muted/40 rounded px-2 py-1 inline-block", children: "⁶Li + n → ⁴He + ³H + 4.78 MeV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-2", children: "Natural lithium is 7.59% Li-6 and 92.41% Li-7; blankets use enriched Li-6. Each fusion neutron breeds approximately one tritium atom — a breeding ratio (TBR) of at least 1.05 is required to account for losses and provide startup inventory for future reactors." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Deuterium-Deuterium (D-D)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^2_1\\\\text{H} + ^2_1\\\\text{H} \\\\rightarrow \\\\begin{cases} ^3_1\\\\text{H}\\\\,(1.01\\\\text{ MeV}) + p\\\\,(3.02\\\\text{ MeV}), & Q = 4.03\\\\text{ MeV} \\\\;(50\\\\%) \\\\\\\\ ^3_2\\\\text{He}\\\\,(0.82\\\\text{ MeV}) + n\\\\,(2.45\\\\text{ MeV}), & Q = 3.27\\\\text{ MeV}\\\\;(50\\\\%) \\\\end{cases}",
                annotation: "D-D reactions occur with roughly equal probability in each branch. The cross-section peaks at much higher temperatures (~400 keV) than D-T and at a much lower maximum (~0.1 barns). However, deuterium alone is the fuel — no tritium breeding required.",
                label: "D-D Reactions (two branches)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "The appeal of D-D: deuterium occurs in seawater at 33 mg/L (essentially unlimited), eliminating tritium breeding complexity. The penalty is a much lower fusion rate at any achievable temperature — the D-D cross-section at 100 keV is roughly 100× less than D-T's peak. Both branches produce tritium or He-3 as secondaries, which then react further (catalysed D-D cycle), improving overall yield in a sufficiently large plasma." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Deuterium–Helium-3 (D-³He)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^2_1\\\\text{H} + ^3_2\\\\text{He} \\\\rightarrow ^4_2\\\\text{He}\\\\,(3.67\\\\text{ MeV}) + p\\\\,(14.67\\\\text{ MeV}),\\\\quad Q = 18.35\\\\text{ MeV}",
                annotation: "D-³He is nearly aneutronic: all primary reaction products are charged particles. The high-energy proton (14.67 MeV) and alpha particle can potentially be converted directly to electricity via direct energy conversion, bypassing the thermal cycle and achieving much higher efficiency.",
                label: "D-³He Reaction (nearly aneutronic)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: [
              "The primary advantage is the absence of primary neutrons — eliminating neutron activation of structural materials and dramatically simplifying radiation shielding. The critical problem is ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "He-3 scarcity" }),
              ": only ~15 kg exists in the US strategic stockpile, mostly a byproduct of tritium decay. Lunar regolith contains He-3 implanted by the solar wind at ~10–20 ppb by mass — estimated reserves of ~1 million tonnes, representing a long-term potential source."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Proton–Boron-11 (p-¹¹B)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "p + ^{11}_{5}\\\\text{B} \\\\rightarrow 3\\\\,^4_2\\\\text{He},\\\\quad Q = 8.68\\\\text{ MeV}",
                annotation: "p-B11 is fully aneutronic — three alpha particles carry all the energy as charged particles. This makes direct energy conversion theoretically possible with ~90% efficiency. However, the cross-section peaks only at plasma temperatures above 300 keV (~3.5 billion °C), far beyond the reach of current technology.",
                label: "p-B11 Reaction (fully aneutronic)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "Both fuels are abundant (hydrogen, boron-11 constitutes 80.1% of natural boron), and the zero-neutron output eliminates all activation concerns. The challenge is purely plasma physics: the ignition temperature exceeds current achievable limits by roughly 5–15×, and bremsstrahlung (X-ray) radiation losses from the hot electrons may exceed fusion power at the required temperatures unless very high plasma β (beta) is sustained. TAE Technologies is the primary company pursuing p-B11 as a long-term target." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wider mb-3", children: "Fusion Fuel Comparison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Reaction" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Q (MeV)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Peak σ (barns)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "T_optimal (keV)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-center font-semibold text-foreground", children: "Neutrons?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Fuel Availability" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
                [
                  "D-T",
                  "17.59",
                  "~5",
                  "~65",
                  "Yes (80%)",
                  "D: unlimited; T: bred from Li"
                ],
                ["D-D (→T+p)", "4.03", "~0.1", "~400", "No", "D: unlimited"],
                [
                  "D-D (→³He+n)",
                  "3.27",
                  "~0.1",
                  "~400",
                  "Yes (50%)",
                  "D: unlimited"
                ],
                [
                  "D-³He",
                  "18.35",
                  "~0.7",
                  "~250",
                  "Trace only",
                  "D: unlimited; He-3: very scarce"
                ],
                [
                  "p-¹¹B",
                  "8.68",
                  "~0.3",
                  ">300",
                  "None",
                  "Both abundant; T too high"
                ]
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/20 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-mono text-foreground", children: row[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[1] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[2] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[3] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-center text-muted-foreground", children: row[4] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[5] })
                  ]
                },
                String(row[0])
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Sources: Glasstone & Lovberg,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Controlled Thermonuclear Reactions" }),
              " (1960); IAEA-TECDOC-1557; Bosch & Hale, ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nucl. Fusion" }),
              " 32 (1992) 611."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "The Lawson Criterion and Triple Product",
          badge: "advanced",
          ocid: "fusion.lawson_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: [
              "For a fusion plasma to produce more energy than is required to heat and maintain it, three parameters must simultaneously exceed critical thresholds. John D. Lawson (1957) showed that the product of plasma density, temperature, and energy confinement time — the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "triple product" }),
              " — is the fundamental figure of merit for any fusion device."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6", children: [
              {
                label: "Density n",
                value: "~10²⁰ m⁻³",
                sub: "~10¹⁴ cm⁻³ (1/1000 of air)"
              },
              {
                label: "Temperature T",
                value: "10–20 keV",
                sub: "100–200 million °C"
              },
              {
                label: "Confinement τ_E",
                value: "≥ 3 s",
                sub: "energy e-folding time"
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border p-4 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-primary", children: item.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: item.sub })
                ]
              },
              item.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "n T \\\\tau_E \\\\geq 3 \\\\times 10^{21}\\\\;\\\\text{keV·s·m}^{-3}",
                annotation: "The Lawson triple product for D-T ignition. All three factors are required simultaneously. At T ≈ 10–20 keV (the optimum temperature range for D-T), the minimum triple product is easiest to achieve. Tokamaks such as ITER aim at nTτ_E ≈ 5 × 10²¹ keV·s/m³.",
                label: "Lawson Criterion (D-T ignition)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-6", children: "The Q-Factor and Energy Gain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "Q = \\\\frac{P_{\\\\text{fusion}}}{P_{\\\\text{heating}}}",
                annotation: "The plasma Q-factor (energy amplification) is the ratio of fusion power produced to external heating power supplied. Note: Q is defined here as plasma Q (laser energy on target for ICF; heating power to plasma for MCF). The 'wall-plug Q' accounting for driver efficiency is much lower.",
                label: "Q-Factor (Plasma Gain)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5 text-sm text-muted-foreground", children: [
              {
                q: "Q = 1",
                label: "Scientific breakeven",
                desc: "Fusion power equals external heating power. A necessary but insufficient step toward a power plant."
              },
              {
                q: "Q > 1",
                label: "Net plasma gain",
                desc: "Fusion produces more power than is injected. NIF achieved Q ≈ 1.54 in December 2022."
              },
              {
                q: "Q ≥ 10",
                label: "ITER design goal",
                desc: "500 MW fusion from 50 MW heating. Required to demonstrate viability at power-plant scale."
              },
              {
                q: "Q → ∞",
                label: "Ignition",
                desc: "Plasma self-heats entirely via alpha-particle deposition. No external heating required. The Holy Grail."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 items-start rounded-lg bg-muted/20 border border-border p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary font-bold shrink-0 w-16", children: item.q }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                      item.label,
                      ":"
                    ] }),
                    " ",
                    item.desc
                  ] })
                ]
              },
              item.q
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm uppercase tracking-wider mb-3", children: "Key Experimental Milestones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Device / Year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Fusion Output" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Input Energy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Plasma Q" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Significance" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
                [
                  "JET (UK) 1997",
                  "16.1 MJ",
                  "~25 MJ input",
                  "~0.65",
                  "MCF record for 20 years"
                ],
                [
                  "JET (UK) Feb 2022",
                  "59 MJ",
                  "~300 MJ (total)",
                  "~0.2 (plasma)",
                  "New MCF energy record; validated ITER scenarios"
                ],
                [
                  "NIF (USA) Aug 2021",
                  "1.37 MJ",
                  "1.35 MJ (laser)",
                  "~1.01",
                  "First 'near-ignition' ICF shot"
                ],
                [
                  "NIF (USA) Dec 2022",
                  "3.15 MJ",
                  "2.05 MJ (laser)",
                  "~1.54",
                  "First Q>1 in history — scientific ignition achieved"
                ],
                [
                  "ITER (design)",
                  "500 MW",
                  "50 MW",
                  "10",
                  "Design goal; D-T operations ~2035"
                ]
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/20 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-semibold text-foreground", children: row[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[1] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[2] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-primary", children: row[3] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[4] })
                  ]
                },
                String(row[0])
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "Wall-Plug Q vs. Plasma Q" }),
              "NIF's plasma Q ≈ 1.54 is a physics milestone. However, the NIF laser converts wall-plug electricity to UV light at only ~1% efficiency. Wall-plug Q = 3.15 MJ / (2.05 MJ / 0.01) ≈ 0.015. A commercial ICF power plant would need plasma Q ≈ 100–200 to compensate for driver inefficiency and thermal conversion losses. Current diode-pumped laser technology aims at ~20% driver efficiency, which would reduce the required plasma Q to ~15–30."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
              "Sources: Lawson, J.D. (1957) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Proc. Phys. Soc. B" }),
              " 70 6; Abu-Shawareb et al. (2022) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Phys. Rev. Lett." }),
              " 129, 075001; Zylstra et al. (2022) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nature" }),
              " 601, 542."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Magnetic Confinement: The Tokamak Principle",
          badge: "advanced",
          ocid: "fusion.magnetic_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "A plasma at 100–300 million °C cannot contact any material wall — it would immediately cool and be extinguished. Magnetic confinement exploits the Lorentz force: charged particles in a magnetic field spiral around field lines and cannot easily cross them, effectively suspending the hot plasma in a magnetic bottle far from any solid surface." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "The Lorentz Force Confinement Principle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\mathbf{F} = q(\\\\mathbf{v} \\\\times \\\\mathbf{B})",
                annotation: "A charged particle (charge q, velocity v) in magnetic field B experiences a force perpendicular to both its velocity and the field. This causes the particle to spiral around the field line with a gyroradius r_L = mv⊥ / (qB). In a strong field (B ≈ 5–12 T), even high-energy alpha particles are well-confined.",
                label: "Lorentz Force (magnetic confinement)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-5", children: "Tokamak Geometry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "A tokamak is a toroidal (donut-shaped) vessel. Two superimposed magnetic field components together create ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "helical" }),
              " field lines that wind around the torus, preventing the particle drifts that would otherwise cause the plasma to leak outward:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Toroidal Field B_T" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground font-medium mb-1", children: "External coils around the torus" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Produced by large superconducting coils. In ITER: B_T = 5.3 T (11.8 T at inner coil face). This is the dominant confining field." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Poloidal Field B_P" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground font-medium mb-1", children: "Induced by plasma current" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "A large current (15 MA in ITER) is driven through the plasma by transformer action. This current creates its own magnetic field that twists the field lines helically." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Stability Parameters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Safety Factor q" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground mb-1", children: "q = r·B_T / (R·B_P)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  "The number of toroidal turns a field line makes per poloidal turn. q must exceed 1 everywhere to prevent the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "kink instability" }),
                  "(Kruskal-Shafranov condition). In ITER: q at plasma edge ≈ 3."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Plasma Beta β" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground mb-1", children: "β = P_plasma / (B²/2μ₀)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Ratio of plasma kinetic pressure to magnetic pressure. Higher β means more efficient use of the magnetic field. Practical tokamaks operate at β ≈ 2–5%; above the Troyon limit, ballooning and tearing mode instabilities develop." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-5", children: "ITER Specifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
              ["Location", "Cadarache, Saint-Paul-lès-Durance, France"],
              [
                "Participating parties",
                "35 nations: EU-27, UK, Switzerland, China, India, Japan, South Korea, Russia, USA"
              ],
              ["Major radius (R)", "6.2 m"],
              ["Minor radius (a)", "2.0 m"],
              ["Aspect ratio (R/a)", "3.1"],
              ["Plasma volume", "840 m³"],
              ["Toroidal field (on-axis)", "5.3 T"],
              ["Peak field at coil", "11.8 T"],
              [
                "Magnet technology",
                "Nb₃Sn (TF coils) + NbTi (PF coils) at 4 K (−269 °C)"
              ],
              ["Plasma current (I_p)", "15 MA"],
              ["Additional heating", "50 MW (NBI + ICRF + ECRH)"],
              ["Design fusion power", "500 MW"],
              ["Q target", "≥ 10"],
              ["Plasma duration (inductive)", "~400–600 s per pulse"],
              ["First plasma (revised)", "~2026–2027"],
              ["D-T operations (planned)", "~2035"],
              ["Total construction cost", "~€20 billion (2023 estimate)"]
            ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-semibold text-foreground w-1/3", children: row[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[1] })
                ]
              },
              String(row[0])
            )) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-2 mt-5", children: "Plasma Instabilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "Magnetically confined plasmas are subject to numerous instabilities that can rapidly transport heat to the wall or trigger a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "disruption" }),
              " (sudden loss of confinement). Key instability types and their mitigations:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground mb-5", children: [
              {
                name: "Kink instability (m=1)",
                desc: "Occurs when q < 1. The plasma column bends laterally. Prevented by maintaining q > 1 at all radii."
              },
              {
                name: "Ballooning modes",
                desc: "Pressure-driven instabilities on the outboard side. Limit maximum plasma pressure (β limit)."
              },
              {
                name: "Tearing modes / NTMs",
                desc: "Magnetic reconnection events that form helical islands, degrading confinement. Mitigated by electron cyclotron current drive (ECCD)."
              },
              {
                name: "Edge-Localised Modes (ELMs)",
                desc: "Periodic bursts of energy from the plasma edge. In ITER, unmitigated ELMs could erode the divertor. Controlled via pellet injection or resonant magnetic perturbations (RMPs)."
              },
              {
                name: "Disruptions",
                desc: "Sudden complete loss of plasma current. In ITER, a disruption could deposit ~300 MJ on the first wall in milliseconds. A disruption prediction and mitigation system (DPMS) is a critical safety component."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  item.name,
                  ":"
                ] }),
                " ",
                item.desc
              ] })
            ] }, item.name)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-5", children: "Alternative Confinement Concepts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              {
                name: "Stellarator (W7-X)",
                desc: "No plasma current — all field shaping done by complex non-planar external coils. Inherently steady-state and disruption-free. Wendelstein 7-X (Greifswald, Germany): major radius 5.5 m, B up to 3 T, world's largest optimised stellarator."
              },
              {
                name: "Reversed Field Pinch (RFP)",
                desc: "Toroidal field reverses direction at the plasma edge. Confines plasma with weaker external fields. Less developed than tokamak; active research by RFX-mod (Italy) and MST (Wisconsin)."
              },
              {
                name: "Spherical Tokamak",
                desc: "Very low aspect ratio (R/a ≈ 1.2–1.8) — closer to a sphere than a donut. Higher β achievable; more compact. MAST-U (Culham) and ST40 (Tokamak Energy) are leading examples."
              },
              {
                name: "Field-Reversed Configuration (FRC)",
                desc: "Compact, high-β plasma held by its own internal magnetic field with no toroidal coils. Pursued by TAE Technologies and Helion Energy for potentially simpler reactor geometry."
              }
            ].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border p-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-1", children: v.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: v.desc })
                ]
              },
              v.name
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Inertial Confinement Fusion (ICF) and NIF",
          badge: "advanced",
          ocid: "fusion.icf_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "Inertial confinement fusion (ICF) takes the opposite approach to magnetic confinement: instead of confining a dilute hot plasma for seconds, it compresses a tiny D-T fuel pellet so rapidly and violently that fusion reactions are completed before the plasma can expand — confined by its own inertia during the nanosecond burn. The energy driver is either a high-power laser or particle beam." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "The Implosion Sequence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-5 text-sm text-muted-foreground", children: [
              {
                step: "1. Irradiation",
                desc: "192 UV laser beams (or X-rays from hohlraum) strike the outer surface of a cryogenic D-T capsule ~2 mm in diameter simultaneously, with 1% spatial uniformity."
              },
              {
                step: "2. Ablation",
                desc: "The outer shell ablates (rocket effect), driving an inward shock wave at velocities of ~300–400 km/s. The fuel is compressed from the outside in."
              },
              {
                step: "3. Stagnation",
                desc: "The implosion stagnates at peak compression. Fuel density reaches ~300–1,000 g/cm³ (100× lead), a 30–35× linear compression from initial conditions."
              },
              {
                step: "4. Hot Spot Ignition",
                desc: "A central hot spot of ~5–10 keV (50–100 million °C) forms. Alpha particles from D-T reactions deposit energy locally, raising the temperature further."
              },
              {
                step: "5. Burn Propagation",
                desc: "The alpha heating wave propagates outward through the surrounding denser, cooler fuel — a 'bootstrap' process that continues without external energy input."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-lg bg-muted/20 border border-border p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary font-bold shrink-0", children: item.step }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.desc })
                ]
              },
              item.step
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "P_{\\\\text{fusion}} = \\\\frac{1}{4}\\\\,n^2 \\\\langle\\\\sigma v\\\\rangle\\\\, Q_{\\\\text{DT}}",
                annotation: "ICF power density scales with density squared — the fundamental advantage of implosion. At 1,000× liquid D-T density, fusion power density is 10⁶× higher than in an MCF plasma, allowing the brief inertial confinement time (~10 ns) to be sufficient.",
                label: "ICF Fusion Power Density"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-5", children: "National Ignition Facility (NIF)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5", children: [
              { label: "Laser Beams", value: "192", sub: "UV (351 nm / 3ω)" },
              {
                label: "Max UV Energy",
                value: "2.05 MJ",
                sub: "delivered to hohlraum"
              },
              {
                label: "Dec 2022 Yield",
                value: "3.15 MJ",
                sub: "Q_laser ≈ 1.54"
              },
              {
                label: "Peak Power",
                value: "~500 TW",
                sub: "≈ 1,000× global electricity"
              }
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/30 border border-border p-4 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: s.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-primary", children: s.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.sub })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4 mb-5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-2", children: "Indirect Drive vs. Direct Drive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "Indirect Drive (NIF approach)" }),
                  "Lasers enter the open ends of a gold hohlraum (~1 cm cylinder). The hohlraum walls re-emit 80% of absorbed energy as soft X-rays (~250 eV), which then ablate the capsule in a highly uniform bath of radiation. Energy penalty: ~70–80% of laser energy is absorbed by the hohlraum before reaching the capsule. Advantage: superb implosion uniformity."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "Direct Drive" }),
                  "Laser beams hit the capsule surface directly. Higher coupling efficiency (60–80% vs. ~10–15% for indirect drive), but requires extreme beam uniformity (<1% variation) to avoid Rayleigh-Taylor instabilities during ablation. Pursued by LLE (Laboratory for Laser Energetics, Rochester) and the proposed LIFE concept."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-5", children: "NIF Key Experimental History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Laser Energy In" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Fusion Yield" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-semibold text-foreground", children: "Q_laser" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Milestone" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
                [
                  "Aug 8, 2021",
                  "1.92 MJ",
                  "1.37 MJ",
                  "~0.72",
                  "First 'burning plasma' (α-heating dominant)"
                ],
                [
                  "Dec 5, 2022",
                  "2.05 MJ",
                  "3.15 MJ",
                  "~1.54",
                  "First scientific ignition (Q>1) in history"
                ],
                [
                  "Jul 30, 2023",
                  "2.05 MJ",
                  "3.88 MJ",
                  "~1.9",
                  "Repeated and exceeded; highest yield to date"
                ],
                [
                  "Late 2023+",
                  "2.05 MJ",
                  ">3 MJ (multiple)",
                  ">1",
                  "Confirmed reproducibility of ignition shots"
                ]
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/20 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-semibold text-foreground", children: row[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[1] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: row[2] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-primary", children: row[3] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[4] })
                  ]
                },
                String(row[0])
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3 mt-5", children: "Obstacles to an IFE Power Plant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
              {
                title: "Repetition rate",
                desc: "NIF fires ~1 shot/day; a 1 GW power plant requires ~10 Hz (10 shots/second). No laser of sufficient energy can currently fire at that rate."
              },
              {
                title: "Target mass production",
                desc: "Millions of precision cryogenic D-T capsules per day at ~$0.01 each. Current NIF target cost: ~$100,000 per target. Engineering gap: ~7 orders of magnitude."
              },
              {
                title: "Driver efficiency",
                desc: "NIF's flashlamp-pumped Nd:glass lasers achieve ~1% wall-plug to UV efficiency. Diode-pumped solid-state lasers could reach ~20%, but remain undemonstrated at MJ scale."
              },
              {
                title: "First-wall and chamber",
                desc: "14 MeV neutron flux and intense X-ray pulses ablate and activate the chamber walls. Proposed solutions: liquid metal (flibe) flowing walls, magnetic diversion of charged debris."
              },
              {
                title: "Required plasma Q for economics",
                desc: "Even with 20% efficient lasers and 40% thermal conversion: plant Q_plasma must exceed ~50–100 for economic viability. NIF is currently at ~1.5."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  item.title,
                  ":"
                ] }),
                " ",
                item.desc
              ] })
            ] }, item.title)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4", children: [
              "Sources: Zylstra et al. (2022) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nature" }),
              " 601, 542; Abu-Shawareb et al. (2022) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Phys. Rev. Lett." }),
              " 129, 075001; Tollefson, J. (2022) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nature" }),
              " 612, 597."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Private Fusion and the Global Fusion Industry",
          badge: "intermediate",
          ocid: "fusion.private_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "A remarkable shift has occurred since 2015: fusion has moved from the domain of government megaprojects to a burgeoning private industry. Enabled by advances in high-temperature superconductors, additive manufacturing, and high-performance computing, private companies are pursuing approaches that were impractical a decade ago. Fusion Industry Association (FIA) data: over $7 billion USD invested in private fusion companies through the end of 2023." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "Leading Private Companies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Company" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Approach" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Key Technology" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-semibold text-foreground", children: "Status / Target" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
                [
                  "Commonwealth Fusion Systems (CFS)",
                  "High-field tokamak (SPARC, then ARC)",
                  "REBCO HTS tape coils at 20 T (tested Sept 2021)",
                  "SPARC Q>2 demo ~2025; ARC power plant ~2035"
                ],
                [
                  "Helion Energy",
                  "Pulsed FRC with direct energy conversion",
                  "Reversed FRC collided at 1 T; direct electric conversion",
                  "Microsoft PPA signed (2023); prototype ~2024; commercial ~2028"
                ],
                [
                  "TAE Technologies",
                  "Advanced beam-driven FRC (Norman machine)",
                  "Fast ion beam maintains hot plasma in FRC geometry",
                  "Targeting p-B11 (aneutronic); ~2030s commercial"
                ],
                [
                  "General Fusion",
                  "Magnetised target fusion (MTF)",
                  "Liquid metal vortex liner compressed by pistons",
                  "UK demonstration plant (Culham); ~2025 validation"
                ],
                [
                  "First Light Fusion",
                  "Projectile-driven ICF (hypervelocity impactor)",
                  "Railgun-accelerated impactor at 20+ km/s compresses target",
                  "Achieved fusion (2022); pursuing reactor concept"
                ],
                [
                  "Realta Fusion",
                  "Magnetic mirror (tandem mirror)",
                  "Ambipolar plugs to reduce end losses; Wisconsin design",
                  "Early stage; targeting compact industrial heat applications"
                ],
                [
                  "Zap Energy",
                  "Sheared-flow stabilised Z-pinch",
                  "High current through flowing plasma; flow suppresses instabilities",
                  "Achieved fusion; fundraising for FuZE-Q pilot device"
                ]
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/20 transition-colors align-top",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-semibold text-foreground", children: row[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[1] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[2] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: row[3] })
                  ]
                },
                String(row[0])
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "The Road from ITER to Commercial Power" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", children: [
              {
                phase: "ITER First Plasma",
                time: "~2026–2027",
                detail: "Non-nuclear hydrogen plasma; machine commissioning. No fusion energy produced at this stage."
              },
              {
                phase: "ITER D-T Operations",
                time: "~2035",
                detail: "D-T campaigns target Q ≥ 10, 500 MW fusion power. Critical scientific validation of burning plasma physics."
              },
              {
                phase: "DEMO (European)",
                time: "~2040–2050",
                detail: "Demonstration electricity generation plant; ~2 GW fusion power, continuous (steady-state or long-pulse). Validates tritium breeding blanket at full scale."
              },
              {
                phase: "CFS SPARC Demo",
                time: "~2025–2027",
                detail: "First compact high-field tokamak plasma; target Q > 2. If successful, ARC commercial reactor to follow."
              },
              {
                phase: "Private Commercial Plants",
                time: "2030s–2040s",
                detail: "Optimistic scenarios (CFS, Helion): first electricity by 2035–2040. More conservative: 2045–2050 for most approaches."
              }
            ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-4 text-sm rounded-lg bg-muted/20 border border-border p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-muted-foreground/70 w-28 shrink-0 pt-0.5", children: step.time }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: step.phase }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: step.detail })
                  ] })
                ]
              },
              step.phase
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: '"Fusion is Always 30 Years Away" — Myth or Reality?' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "The quip originated in the 1970s and reflects real frustration: plasma physics revealed instability after instability that required decades to understand and control. But the landscape has materially changed since ~2010:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground mb-5", children: [
              {
                title: "High-temperature superconductors (HTS)",
                desc: "REBCO tape coils (tested by CFS in 2021 at 20 T) enable compact tokamaks that would have been impossibly large with 1990s magnet technology — similar plasma performance at ~1/10 the volume."
              },
              {
                title: "NIF ignition (2022)",
                desc: "Proof that alpha-particle-driven self-heating (a burning plasma) is physically achievable on Earth — removing the longest-standing question about D-T ICF feasibility."
              },
              {
                title: "JET record (2022)",
                desc: "Validated the plasma scenarios ITER will use, reducing ITER's physics risk significantly."
              },
              {
                title: "Private capital",
                desc: "~$7B invested 2020–2023 alone (FIA survey). Capital enables parallel experimentation that government programs cannot afford — multiple approaches being tested simultaneously."
              },
              {
                title: "Key remaining challenge",
                desc: "Materials: no material has yet been tested under fusion-relevant 14 MeV neutron fluence (~100 displacements per atom). The IFMIF-DONES facility (Spain) is being built to address this but will not generate data until the 2030s."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  item.title,
                  ":"
                ] }),
                " ",
                item.desc
              ] })
            ] }, item.title)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "Current Expert Consensus" }),
              'A 2023 survey of fusion researchers (FIA) found the median estimate for first commercial fusion electricity on the grid is 2040–2045, with a meaningful probability of demonstration before 2035. This is the most optimistic mainstream estimate in the history of fusion research — but it is contingent on continued capital, materials science breakthroughs, and no major unexpected physics discoveries. Fusion is no longer "always 30 years away" — but it is not yet inevitable or guaranteed on any particular timeline.'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4", children: [
              "Sources: Fusion Industry Association,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Global Fusion Industry Report 2023" }),
              "; ",
              "Bigot, B. (2022) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nature" }),
              " 599, 368",
              "; ",
              "Ward, D.J. (2021) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Phil. Trans. R. Soc. A" }),
              " 379, 20200053."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Fusion Reactions and Q-Values (Summary)",
          badge: "advanced",
          ocid: "fusion.qvalues_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Q-value is the energy released (positive) or absorbed (negative) in a nuclear reaction, calculated from the mass difference between reactants and products via E = Δm·c². Different fusion fuels offer very different yields, neutron fractions, and required temperatures." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "^2_1\\\\text{D} + ^3_1\\\\text{T} \\\\rightarrow ^4_2\\\\text{He}\\\\,(3.52\\\\text{ MeV}) + n\\\\,(14.06\\\\text{ MeV}),\\\\quad Q = 17.59\\\\text{ MeV}",
                  annotation: "D-T reaction: most energetically favorable for first-generation fusion. The helium nucleus carries 3.52 MeV and the neutron carries 14.06 MeV (80% of the energy).",
                  label: "D-T Reaction"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "^2_1\\\\text{D} + ^2_1\\\\text{D} \\\\rightarrow \\\\begin{cases} ^3_1\\\\text{T} + p, & Q = 4.03\\\\text{ MeV} \\\\\\\\ ^3_2\\\\text{He} + n, & Q = 3.27\\\\text{ MeV} \\\\end{cases}",
                  annotation: "D-D reactions occur with roughly equal probability for each branch. Lower Q-values than D-T, but no need for tritium breeding — deuterium alone is the fuel.",
                  label: "D-D Reactions (two branches)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "^2_1\\\\text{D} + ^3_2\\\\text{He} \\\\rightarrow ^4_2\\\\text{He} + p,\\\\quad Q = 18.35\\\\text{ MeV}",
                  annotation: "D-³He is aneutronic — no neutrons produced. Higher Q-value than D-T, but requires much higher plasma temperature (~500 keV). ³He is scarce on Earth but potentially harvestable from the lunar regolith.",
                  label: "D-³He Reaction (aneutronic)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: "p + ^{11}_{5}\\\\text{B} \\\\rightarrow 3\\\\,^4_2\\\\text{He},\\\\quad Q = 8.68\\\\text{ MeV}",
                  annotation: "Proton-Boron-11 fusion is fully aneutronic — all energy released as charged alpha particles that can be converted directly to electricity. Requires plasma temperatures > 300 keV — extremely challenging.",
                  label: "p-B11 Reaction (fully aneutronic)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: [
              "D-T is preferred for first-generation fusion because the reaction cross-section σ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "DT" }),
              " peaks at approximately 5×10⁻²⁸ m² at a plasma temperature of ~65 keV (~750 million °C) — two orders of magnitude higher than other reactions at the same temperature.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Fuel resources:" }),
              " ",
              "deuterium occurs naturally in seawater at 33 mg/L (essentially unlimited); tritium (T½ = 12.3 yr) must be bred by irradiating lithium-6 with the fusion neutrons themselves via",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-muted/40 px-1 rounded", children: "n + ⁶Li → T + ⁴He + 4.8 MeV" }),
              "."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Materials, Waste, and the Long-Term Future",
          badge: "intermediate",
          ocid: "fusion.future_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5", children: "Fusion science has made more progress in the past decade than in the previous five. Two landmark results in 2022 — JET's record and NIF's ignition — mark a genuine turning point. The path from here to commercial power, while still long, is now clearer than ever." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-3", children: "2022 Milestones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-1", children: "JET (Feb 2022)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "59 MJ in 5 seconds = 11.8 MW average fusion power. Validated D-T plasma scenarios for ITER." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/10 border border-primary/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-1", children: "NIF (Dec 2022) ★" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "3.15 MJ fusion output / 2.05 MJ laser input. First Q > 1 in history — a 66-year milestone achieved." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base mb-2 mt-5", children: "Materials and Neutron Damage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
              "The 14.06 MeV neutrons from D-T fusion are uniquely challenging: they displace atoms in structural materials (",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "dpa" }),
              " — displacements per atom), transmuting them into radioactive isotopes and causing embrittlement. Current research focuses on",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "tungsten" }),
              " (plasma-facing components) and",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "reduced-activation ferritic-martensitic (RAFM) steels" }),
              " ",
              "(structural). Unlike fission waste, fusion structural materials become radioactive on relatively short timescales: most RAFM steels decay to hands-on levels within 100 years, and there are no long-lived actinides or fission products."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground block mb-1", children: "Second-Generation Fuels" }),
              "D-³He and p-B11 offer near-zero or zero neutron production, vastly simplifying materials challenges and radioactive waste. However, they require plasma temperatures 5–15× higher than D-T and have lower cross-sections, making them the fusion frontier beyond 2050."
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  FusionPage as default
};
