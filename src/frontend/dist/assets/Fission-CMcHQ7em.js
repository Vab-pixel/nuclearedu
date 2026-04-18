import { j as jsxRuntimeExports, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-jNE18aF1.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DealqQgJ.js";
import { E as EquationBlock } from "./EquationBlock-ChluCQ53.js";
import { S as SafetyCallout } from "./SafetyCallout-DWVbDsTQ.js";
import { S as SectionCard } from "./SectionCard-CFwP6_86.js";
import "./triangle-alert-DDjxJG49.js";
function CollapsibleSection({
  title,
  badge,
  children,
  defaultOpen = false,
  ocid
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "flex w-full items-center justify-between gap-3 text-left",
        onClick: () => setOpen((v) => !v),
        "aria-expanded": open,
        "data-ocid": ocid ? `${ocid}.toggle` : void 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: title }),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: badge })
          ] }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children })
  ] });
}
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
            className: "px-4 py-2 text-muted-foreground",
            children: cell
          },
          headers[j] ?? j
        ))
      },
      String(row[0])
    )) })
  ] }) });
}
function FissionPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear Fission",
        subtitle: "The splitting of a heavy nucleus into two lighter fragments — releasing ~200 MeV of energy, neutrons, and the possibility of a self-sustaining chain reaction.",
        audienceLevel: "intermediate",
        readTimeMin: 18
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fission.intro_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Discovery & Mechanism" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "In December 1938, Otto Hahn and Fritz Strassmann bombarded uranium with neutrons and detected barium — an element roughly half the mass of uranium. Lise Meitner and Otto Frisch quickly provided the theoretical interpretation: the uranium nucleus had split. They coined the term ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "fission" }),
          " from the Latin for splitting."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "When a fissile nucleus (such as U-235) absorbs a thermal neutron, it becomes highly excited and deforms until the electrostatic repulsion between the two forming fragments overcomes the short-range nuclear force — causing the nucleus to split. The fragments fly apart with ~167 MeV of kinetic energy; additional ~33 MeV comes from gamma radiation, beta decay of fission products, and neutrinos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fission.equation_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "A Typical Fission Reaction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "^{235}_{92}\\\\text{U} + n \\\\rightarrow ^{141}_{56}\\\\text{Ba} + ^{92}_{36}\\\\text{Kr} + 3n + {\\\\sim}200\\\\text{ MeV}",
            annotation: "Uranium-235 absorbs a neutron and splits into Barium-141 and Krypton-92, releasing 3 neutrons and approximately 200 MeV of energy. This is one of hundreds of possible fission product pairs.",
            label: "Example Fission Event"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "Q = \\\\bigl(M_{\\\\text{U-235}} + m_n - M_{\\\\text{Ba-141}} - M_{\\\\text{Kr-92}} - 3m_n\\\\bigr)c^2",
            annotation: "The Q-value equals the mass of reactants (U-235 plus one neutron) minus the mass of products (Ba-141, Kr-92, three neutrons), all multiplied by c².",
            label: "Fission Q-value"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fission.chain_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "The Chain Reaction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "Each fission event releases 2–3 neutrons on average. If these neutrons cause further fissions, a self-sustaining chain reaction is possible. The ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "effective neutron multiplication factor" }),
          " k",
          /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "eff" }),
          " characterizes the state:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "k_{\\\\text{eff}} = k_\\\\infty \\\\cdot P_{NL}",
            annotation: "k-effective equals the infinite-medium multiplication factor k∞ multiplied by the non-leakage probability P_NL. k < 1: subcritical (dies out). k = 1: critical (sustained). k > 1: supercritical (growing).",
            label: "Neutron Multiplication"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { children: "Details of critical assembly geometries, fissile material mass thresholds, and neutron reflector configurations are restricted topics that could enable harm. This site provides only the conceptual physics of fission and chain reactions as described in publicly available textbooks and IAEA educational materials." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "fission.products_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Fission Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Fission rarely splits nuclei into exactly equal halves. The most probable mass split produces an asymmetric distribution peaking around A ≈ 95 (light fragment, e.g., Kr, Sr) and A ≈ 140 (heavy fragment, e.g., Ba, Cs). These fission products are neutron-rich and undergo a series of beta-minus decays to reach stability. Key fission products include:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1 text-sm text-muted-foreground list-none", children: [
          ["Sr-90", "28.8 yr, β⁻", "Bone-seeking; long-term waste concern"],
          [
            "Cs-137",
            "30 yr, β⁻/γ",
            "Widely dispersed; Chernobyl cleanup challenge"
          ],
          [
            "I-131",
            "8 d, β⁻/γ",
            "Thyroid uptake; medical use + fallout concern"
          ],
          [
            "Xe-133",
            "5.2 d, β⁻",
            "Gaseous; noble gas — important for safeguards monitoring"
          ]
        ].map(([nuc, decay, note]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex gap-2 py-1 border-b border-border/40 last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium text-foreground w-16 shrink-0", children: nuc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 w-20 shrink-0", children: decay }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: note })
            ]
          },
          nuc
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Fission Fragment Distribution and Energy Release",
          badge: "advanced",
          ocid: "fission.fragment_dist",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Slow neutron-induced fission of U-235 produces a characteristic",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "asymmetric" }),
              " (bimodal) mass distribution. Symmetric splits (each fragment ~118 u) occur in fewer than 0.01% of events. Instead, the yield peaks sharply at two mass regions:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Light peak:" }),
                " A ≈ 90–100 u (e.g., Kr-92, Rb-93, Sr-94)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Heavy peak:" }),
                " A ≈ 130–145 u (e.g., Ba-141, Te-134, Xe-140)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Two of the most probable splits are:",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: "²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n" }),
              " ",
              "and",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: "²³⁵U + n → ¹³⁴Te + ⁹⁹Zr + 3n" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-2", children: "The asymmetry arises from nuclear shell structure: fragments near closed shells (Z = 50, N = 82) are energetically favored. This is a quantum mechanical effect — not a classical one." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Energy Budget per U-235 Fission (~207 MeV total)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Energy Form", "MeV", "%", "When Released"],
                rows: [
                  ["Fragment kinetic energy", "168", "81%", "Prompt (10⁻¹⁴ s)"],
                  ["Prompt gamma rays", "7", "3.4%", "Prompt"],
                  ["Prompt neutrons", "5", "2.4%", "Prompt"],
                  ["Beta decay energy", "8", "3.9%", "Delayed (fission products)"],
                  ["Gamma from beta decay", "7", "3.4%", "Delayed"],
                  ["Antineutrinos", "12", "5.8%", "Lost — undetectable"],
                  [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Total recoverable (in-reactor)" }, "total"),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "~195" }, "195"),
                    "~94%",
                    "Deposited as heat"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "The 12 MeV carried away by antineutrinos cannot be captured and represents the fundamental thermodynamic loss from fission power. The remaining ~195 MeV is ultimately converted to heat in the reactor core." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Average Neutron Yield (ν̄) by Fuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Fuel", "ν̄ (avg neutrons per fission)"],
                rows: [
                  ["U-233", "2.47"],
                  ["U-235", "2.43"],
                  ["Pu-239", "2.88"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "The higher ν̄ for Pu-239 makes plutonium-fueled reactors more neutron-rich, facilitating breeding of new fissile material from U-238 blankets in fast reactors." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "^{235}_{92}\\\\text{U} + n \\\\xrightarrow{\\\\text{fission}} \\\\sum_i Y_i A_i + \\\\bar{\\\\nu}\\\\, n + Q_{\\\\text{total}}",
                annotation: "The general fission equation: U-235 plus a neutron yields fission products with yield fractions Y_i, an average of ν̄ neutrons, and total energy Q_total ≈ 195 MeV recoverable in-reactor.",
                label: "Generalized Fission Energy Release"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Delayed Neutrons and Their Importance",
          badge: "advanced",
          ocid: "fission.delayed_neutrons",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "The vast majority of fission neutrons are",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "prompt" }),
              " — emitted within 10⁻¹⁴ s of fission. However, a small but critically important fraction are ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "delayed" }),
              ", emitted by excited fission product nuclei (called",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "precursors" }),
              ") with measurable half-lives ranging from fractions of a second to nearly a minute."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Delayed Neutron Fraction (β_eff) by Fuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Fuel",
                  "β_eff",
                  "Prompt neutron lifetime ℓ",
                  "Controllability"
                ],
                rows: [
                  ["U-233", "0.0026 (0.26%)", "~4 × 10⁻⁵ s", "More challenging"],
                  ["U-235", "0.0065 (0.65%)", "~2 × 10⁻⁵ s", "Standard"],
                  ["Pu-239", "0.0021 (0.21%)", "~1.7 × 10⁻⁵ s", "More challenging"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "The Keepin Six-Group Model" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Delayed neutrons are modeled as six groups of precursors, each with a group fraction β_i and decay constant λ_i (s⁻¹). For U-235 (Keepin 1965):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Group", "Half-life T½ (s)", "β_i", "λ_i (s⁻¹)"],
                rows: [
                  ["1", "55.7", "0.000215", "0.0124"],
                  ["2", "22.7", "0.001424", "0.0305"],
                  ["3", "6.22", "0.001274", "0.111"],
                  ["4", "2.30", "0.002568", "0.301"],
                  ["5", "0.610", "0.000748", "1.14"],
                  ["6", "0.230", "0.000273", "3.01"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Sum of all β_i ≈ 0.0065 = β_eff for U-235." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Why Delayed Neutrons Are What Make Reactors Controllable" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 mt-2 text-sm text-muted-foreground space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Without delayed neutrons:" }),
                " ",
                "Prompt neutron lifetime ≈ 10⁻⁵ s → reactor period would be ~10⁻⁴ s → power doubles thousands of times per second → mechanically uncontrollable."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "With delayed neutrons:" }),
                " ",
                "Effective neutron lifetime ≈ β_eff / λ̄ ≈ 0.65% / 0.4 s⁻¹ ≈",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "~0.1 s" }),
                " → reactor period of tens of seconds to minutes → mechanical control rods can respond."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Key design constraint:" }),
                " ",
                "Reactors are designed to remain subcritical on",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "prompt neutrons alone" }),
                " (k_prompt ",
                "<",
                " 1), using only the small fraction of delayed neutrons to achieve steady-state criticality. If k exceeds 1 on prompt neutrons alone (",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "prompt criticality" }),
                "), control is lost."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Reactor Kinetics and the Point Kinetics Equations",
          badge: "advanced",
          ocid: "fission.reactor_kinetics",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Reactor kinetics quantifies how neutron population (and thus power) changes over time in response to changes in reactivity. The fundamental parameter is",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "reactivity ρ" }),
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\rho = \\\\frac{k_{\\\\text{eff}} - 1}{k_{\\\\text{eff}}}",
                annotation: "Reactivity ρ is dimensionless. ρ = 0 means exactly critical (steady-state). Positive ρ means supercritical (rising power). Negative ρ means subcritical (falling power).",
                label: "Reactivity Definition"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Reactivity Units" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Unit", "Definition", "Physical meaning"],
                rows: [
                  ["Dimensionless", "ρ directly", "Fundamental"],
                  [
                    "pcm (percent mille)",
                    "10⁻⁵ × ρ",
                    "Fine-grained operational unit"
                  ],
                  [
                    "$ (dollar)",
                    "ρ / β_eff",
                    "1 dollar = prompt critical threshold"
                  ],
                  ["¢ (cent)", "ρ / (100 × β_eff)", "One-hundredth of a dollar"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Operational Reactivity States" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Reactivity (U-235)", "pcm", "dollars", "Reactor state"],
                rows: [
                  ["ρ = 0", "0", "$0", "Critical — steady power"],
                  [
                    "ρ = +0.0001",
                    "+10",
                    "$0.015",
                    "Slightly supercritical — power slowly rising"
                  ],
                  ["ρ = +0.0033", "+330", "$0.50", "Power doubles every ~10 s"],
                  [
                    "ρ = β_eff = 0.0065",
                    "+650",
                    "$1.00",
                    "Prompt critical — dangerous excursion"
                  ],
                  ["ρ < 0", "negative", "negative", "Subcritical — power falling"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "The Inhour Equation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-3", children: [
              "The stable reactor period T (time for power to increase by factor",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "e" }),
              ") relates to reactivity via the inhour equation:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\rho = \\\\frac{\\\\ell}{T} + \\\\sum_{i=1}^{6} \\\\frac{\\\\beta_i}{1 + \\\\lambda_i T}",
                annotation: "The inhour equation: reactivity ρ equals the prompt term (ℓ/T, where ℓ is prompt neutron lifetime) plus a sum over 6 delayed neutron groups, each contributing β_i / (1 + λ_i T). For large T (slow transients), the prompt term is negligible.",
                label: "Inhour Equation (6-group)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-msm text-muted-foreground mt-1", children: 'For slow transients (large T): the prompt term ℓ/T → 0, and the inhour equation simplifies. The "inhour" unit (one inverse hour of reactor period) was the original measure of reactivity before the dollar/pcm conventions were adopted.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Prompt Jump Approximation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "When a step reactivity ρ is suddenly inserted (|ρ| ≪ β_eff), power instantly jumps by a factor given by the prompt jump approximation:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "P_+ = P_0 \\\\cdot \\\\frac{1}{1 - \\\\rho/\\\\beta_{\\\\text{eff}}}",
                annotation: "Immediately after a step reactivity insertion ρ, power jumps from P₀ to P₊. For ρ = 0.5·β_eff (half a dollar), power doubles instantly, then continues to rise on the delayed neutron timescale.",
                label: "Prompt Jump Approximation"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Xenon-135 Poisoning and the Iodine Pit",
          badge: "advanced",
          ocid: "fission.xenon_poisoning",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "Xenon-135 is the single most important fission product poison — it has the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "largest thermal neutron absorption cross-section of any known nuclide" }),
              ": σ_a(Xe-135) = 2.65 × 10⁶ barns (compared to ~680 barns for U-235 fission). A modest buildup of Xe-135 can absorb enough neutrons to shut down an operating reactor."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Production and Destruction Pathways" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm font-mono text-foreground mb-4 overflow-x-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Fission → I-135 (T½ = 6.57 h, β⁻) → Xe-135 (T½ = 9.17 h, β⁻) → Cs-135" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "+ Direct fission yield to Xe-135 (~0.3% vs ~6.4% for I-135 path)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "In-reactor: Xe-135 + n → Xe-136 (neutron absorption burnup)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Xenon Transient Behavior" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Phase", "Time", "Xe-135 level", "Why"],
                rows: [
                  [
                    "Startup",
                    "0 → ~40 h",
                    "Rising",
                    "I-135 builds up, feeds Xe-135"
                  ],
                  [
                    "Steady-state operation",
                    ">40 h",
                    "Equilibrium",
                    "Production = absorption + decay"
                  ],
                  [
                    "After shutdown (0–6 h)",
                    "0 → 6 h",
                    "Still rising",
                    "Flux drops → less burnup; I-135 still decaying to Xe"
                  ],
                  [
                    "Xenon peak",
                    "~6–10 h after shutdown",
                    "Maximum",
                    "Xe-135 no longer burned by neutrons"
                  ],
                  [
                    "Iodine pit recovery",
                    "~2–3 days",
                    "Declining",
                    "Xe-135 decays (T½ 9.17 h); I-135 depleted"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-600 dark:text-amber-400 mb-1", children: "Chernobyl Connection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: `On April 25–26, 1986, operators at RBMK Unit 4 attempted to run a turbine coast-down safety test after an unplanned partial shutdown. The reactor had been running at reduced power and was deep in the "iodine pit" — Xe-135 had built up to levels that suppressed reactivity far below the minimum required for the test. Operators withdrew control rods far beyond safe limits to overcome xenon poisoning and achieve the required power level. This left the reactor in a dangerously unstable positive-void-coefficient regime. The subsequent power excursion and steam explosion caused the world's worst nuclear accident. Xe-135 poisoning was a key contributing factor.` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\frac{d[\\\\text{Xe}]}{dt} = \\\\gamma_{Xe}\\\\,\\\\Sigma_f \\\\phi + \\\\lambda_I [\\\\text{I}] - \\\\lambda_{Xe}[\\\\text{Xe}] - \\\\sigma_{a,Xe}\\\\,\\\\phi\\\\,[\\\\text{Xe}]",
                annotation: "Xe-135 rate equation: production from direct fission yield (γ_Xe · Σ_f · φ) plus iodine-135 decay (λ_I [I]), minus Xe-135 radioactive decay (λ_Xe [Xe]), minus neutron absorption burnup (σ_a,Xe · φ · [Xe]). At shutdown φ = 0, so the burnup term vanishes and Xe-135 spikes.",
                label: "Xe-135 Balance Equation"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Samarium-149 Poisoning",
          badge: "intermediate",
          ocid: "fission.samarium_poisoning",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
              "After xenon-135, Samarium-149 is the second most important fission product neutron poison. Unlike Xe-135, Sm-149",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "has no radioactive decay" }),
              " ",
              "— it is only removed from the core by neutron absorption."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Key Properties" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: ["Property", "Value"],
                rows: [
                  ["Thermal absorption cross-section σ_a(Sm-149)", "41,200 barns"],
                  ["Fission yield (indirect, via Nd-149 → Pm-149)", "~1.1%"],
                  ["Pm-149 half-life", "53.1 hours"],
                  ["Sm-149 radioactive decay", "Stable — none"],
                  ["Sm-149 removal in-reactor", "n + Sm-149 → Sm-150"]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Samarium Transient Behavior" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm text-muted-foreground space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "At steady-state power:" }),
                " ",
                "Sm-149 reaches a constant equilibrium concentration that is",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "independent of power level" }),
                " — unlike Xe-135, which scales with flux. The equilibrium is determined by production rate (from Pm-149 decay) = absorption rate (neutron burnup of Sm-149)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "After shutdown:" }),
                " ",
                "Neutron absorption stops. Pm-149 continues to decay to Sm-149 with no burnup sink → Sm-149 builds up for ~50–100 h, then slowly declines as no new Pm-149 is produced."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Restart reactivity penalty:" }),
                " ",
                "The post-shutdown Sm-149 overshoot introduces a negative reactivity worth ~800–900 pcm in typical LWR designs — smaller and much slower than the xenon effect, but significant for power cycling."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\frac{d[\\\\text{Sm}]}{dt} = \\\\lambda_{Pm}[\\\\text{Pm}] - \\\\sigma_{a,Sm}\\\\,\\\\phi\\\\,[\\\\text{Sm}]",
                annotation: "Sm-149 rate equation: production equals Pm-149 decay rate λ_Pm · [Pm]. Removal equals neutron absorption rate σ_a,Sm · φ · [Sm]. Since Sm-149 is stable (no decay term), at shutdown (φ = 0) the concentration only increases until all Pm-149 is consumed.",
                label: "Sm-149 Balance Equation"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Critical Mass and Criticality Concepts",
          badge: "intermediate",
          ocid: "fission.criticality",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "A nuclear reactor achieves criticality when exactly one neutron from each fission event goes on to cause exactly one more fission. Mathematically: k_eff = 1.000 exactly." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "The Six-Factor Formula" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "In a finite, moderated reactor, k_eff is the product of six factors:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "k_{\\\\text{eff}} = \\\\eta \\\\cdot f \\\\cdot p \\\\cdot \\\\varepsilon \\\\cdot P_{FNL} \\\\cdot P_{TNL}",
                annotation: "Six-factor formula: η = neutrons produced per neutron absorbed in fuel. f = thermal utilization (fraction of thermal absorptions in fuel). p = resonance escape probability. ε = fast fission factor. P_FNL = fast non-leakage probability. P_TNL = thermal non-leakage probability.",
                label: "Six-Factor Formula"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataTable,
              {
                headers: [
                  "Factor",
                  "Symbol",
                  "Typical LWR value",
                  "Physical meaning"
                ],
                rows: [
                  [
                    "Neutrons per absorption in fuel",
                    "η",
                    "~2.06",
                    "Reproduction factor for fissile nuclide"
                  ],
                  [
                    "Thermal utilization",
                    "f",
                    "~0.71",
                    "Fraction of thermal neutrons absorbed by fuel"
                  ],
                  [
                    "Resonance escape probability",
                    "p",
                    "~0.87",
                    "Fraction avoiding U-238 resonance capture"
                  ],
                  [
                    "Fast fission factor",
                    "ε",
                    "~1.02",
                    "Extra fissions from fast neutrons in U-238"
                  ],
                  [
                    "Fast non-leakage probability",
                    "P_FNL",
                    "~0.97",
                    "Fraction of fast neutrons not leaking"
                  ],
                  [
                    "Thermal non-leakage probability",
                    "P_TNL",
                    "~0.99",
                    "Fraction of thermal neutrons not leaking"
                  ]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Product ≈ 2.06 × 0.71 × 0.87 × 1.02 × 0.97 × 0.99 ≈ 1.000 (critical). Each factor is engineered to keep the product exactly at 1 under operating conditions." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-5 mb-2", children: "Effect of Moderation and Enrichment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-4 text-sm text-muted-foreground space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Moderation thermalizes neutrons" }),
                " ",
                "from ~2 MeV (fission energy) to ~0.025 eV (thermal). At thermal energies, σ_f(U-235) ≈ 584 barns vs. ~1 barn at 2 MeV — a factor of ~600. This dramatically reduces the required U-235 enrichment."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "LWR enrichment:" }),
                " ~3–5% U-235. Without moderation (fast spectrum), enrichment requirements rise significantly."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "With neutron reflector" }),
                " ",
                "(water, beryllium): back-scattered neutrons effectively reduce the critical mass requirement by reducing neutron leakage (increasing P_NL)."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { children: "Bare critical mass figures, specific enrichment thresholds, and reflector configurations for weapons-applicable geometries are restricted information. The values discussed here (LWR enrichment levels and conceptual criticality factors) are taken directly from publicly available IAEA and NRC educational documents. No operational weapons-applicable data is provided." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mt-4 mb-2", children: "Criticality Safety Note" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed text-sm", children: [
              "Accidental criticality in nuclear fuel processing facilities (",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "criticality accidents" }),
              ") can occur when fissile material accumulates in unforeseen geometries — for example, if liquid containing dissolved uranium is transferred to a vessel of unfavorable shape. The Tokaimura criticality accident (Japan, 1999) resulted from workers manually adding enriched uranium solution to a precipitation tank, exceeding the safe mass limit. Two workers died from acute radiation syndrome. Criticality safety relies on strict mass controls, geometry controls, and neutron absorbers (poisons) in processing equipment."
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  FissionPage as default
};
