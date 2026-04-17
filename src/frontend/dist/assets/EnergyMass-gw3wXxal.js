import { R as React, j as jsxRuntimeExports, a as ChevronDown, C as ChevronRight } from "./index-DHpNeWFA.js";
import { E as EquationBlock } from "./EquationBlock-NVyAdYzd.js";
import { P as PageHeader } from "./PageHeader-DjzxfwqO.js";
import { S as SectionCard } from "./SectionCard-Dum9xY4U.js";
import { n as nuclides } from "./nuclides-CjJxlGKK.js";
const bindingData = nuclides.filter(
  (n) => n.bindingEnergyPerNucleon_MeV !== null && n.bindingEnergyPerNucleon_MeV > 0
).sort(
  (a, b) => (b.bindingEnergyPerNucleon_MeV ?? 0) - (a.bindingEnergyPerNucleon_MeV ?? 0)
).slice(0, 8);
const BINDING_CURVE_DATA = [
  { nuclide: "H-1", A: 1, ba: 0, note: "Proton — no binding" },
  { nuclide: "H-2 (D)", A: 2, ba: 1.11, note: "Deuteron — loosely bound" },
  { nuclide: "He-4", A: 4, ba: 7.07, note: "Doubly magic, very stable" },
  { nuclide: "C-12", A: 12, ba: 7.68, note: "CNO cycle product" },
  {
    nuclide: "Fe-56",
    A: 56,
    ba: 8.79,
    note: "Most stable per nucleon",
    peak: true
  },
  { nuclide: "Mo-98", A: 98, ba: 8.64, note: "Mid-heavy" },
  { nuclide: "Xe-132", A: 132, ba: 8.45, note: "Common fission product" },
  { nuclide: "Pb-208", A: 208, ba: 7.87, note: "Doubly magic endpoint" },
  { nuclide: "U-235", A: 235, ba: 7.59, note: "Primary fissile fuel" },
  { nuclide: "U-238", A: 238, ba: 7.57, note: "Natural uranium" }
];
const ENERGY_SCALES = [
  {
    source: "Chemical (TNT)",
    perReaction: "~3.5 eV/molecule",
    perKg: "~4.6 MJ/kg",
    notes: "Reference explosive"
  },
  {
    source: "Chemical (coal)",
    perReaction: "~3 eV/molecule",
    perKg: "~24 MJ/kg",
    notes: "Combustion"
  },
  {
    source: "Chemical (gasoline)",
    perReaction: "~6 eV/molecule",
    perKg: "~46 MJ/kg",
    notes: "Best hydrocarbon"
  },
  {
    source: "Nuclear fission (U-235)",
    perReaction: "~200 MeV/fission",
    perKg: "~8.2 × 10¹³ J/kg",
    notes: "2 million× coal",
    highlight: true
  },
  {
    source: "Nuclear fusion (D-T)",
    perReaction: "~17.6 MeV/fusion",
    perKg: "~3.4 × 10¹⁴ J/kg",
    notes: "4× more than fission",
    highlight: true
  },
  {
    source: "Nuclear fusion (p-B11)",
    perReaction: "~8.7 MeV/fusion",
    perKg: "~6.7 × 10¹³ J/kg",
    notes: "Aneutronic, lower yield"
  },
  {
    source: "Matter-antimatter",
    perReaction: "2m₀c² per pair (min)",
    perKg: "9 × 10¹⁶ J/kg",
    notes: "Theoretical maximum"
  }
];
function CollapsibleSection({
  id,
  title,
  badge,
  badgeColor = "bg-primary/10 text-primary border-primary/20",
  open,
  onToggle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": `energy.${id}_card`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between gap-3 text-left group",
        onClick: onToggle,
        "aria-expanded": open,
        "aria-controls": `${id}-body`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors", children: title }),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `hidden sm:inline-flex text-xs font-semibold px-2 py-0.5 rounded border ${badgeColor} shrink-0`,
                children: badge
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground group-hover:text-primary transition-colors", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 20 }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `${id}-body`, className: "mt-5 space-y-4", children })
  ] });
}
function EnergyMass() {
  const [open, setOpen] = React.useState({});
  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Energy & Mass",
        subtitle: "Einstein's famous equation E = mc² is not just a formula — it is the key to understanding why nuclear reactions release millions of times more energy than chemical reactions.",
        audienceLevel: "intermediate",
        readTimeMin: 18
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "energy.emc2_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Mass-Energy Equivalence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "In 1905, Albert Einstein derived one of physics' most famous results: mass and energy are equivalent, related by the speed of light squared. This is not a metaphor — mass literally ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "is" }),
          " a form of energy. In nuclear reactions, small changes in mass produce enormous energy because c² ≈ 9 × 10¹⁶ J/kg."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "E = mc^2",
            annotation: "Energy E equals mass m times the speed of light squared (c ≈ 3×10⁸ m/s). Converting 1 gram of matter fully to energy yields 90 terajoules — equivalent to ~21 kilotons of TNT.",
            label: "Einstein's Mass-Energy Equivalence"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "energy.binding_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Nuclear Binding Energy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "A nucleus is lighter than the sum of its separate protons and neutrons. This ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "mass defect" }),
          " (Δm) represents the binding energy — the energy that was released when nucleons came together and that must be supplied to tear them apart."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "B = \\Delta m \\cdot c^2 = \\bigl(Z \\cdot m_p + N \\cdot m_n - M_{\\text{nucleus}}\\bigr) c^2",
            annotation: "Binding energy B equals the mass defect Δm times c². Δm is the difference between the sum of proton and neutron masses and the actual nuclear mass.",
            label: "Binding Energy"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "energy.curve_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Binding Energy Per Nucleon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
          "The binding energy per nucleon peaks near iron-56 (~8.79 MeV/nucleon). Nuclei lighter than iron release energy by",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "fusion" }),
          "; heavier nuclei release energy by",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "fission" }),
          ". This is the fundamental reason both processes are exothermic."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "aria-label": "Binding energy per nucleon for selected nuclides, sorted highest to lowest",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Nuclide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground text-right", children: "A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground text-right", children: "B/A (MeV/nucleon)" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: bindingData.map((n) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono font-medium text-foreground", children: n.symbol }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right", children: n.A }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: n.bindingEnergyPerNucleon_MeV && n.bindingEnergyPerNucleon_MeV > 8.5 ? "text-primary font-bold" : "",
                      children: (_a = n.bindingEnergyPerNucleon_MeV) == null ? void 0 : _a.toFixed(3)
                    }
                  ) })
                ] }, n.symbol);
              }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground italic", children: "Iron-56 (Fe-56) highlighted in cyan — the peak of the binding energy curve." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "energy.qvalue_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Q-Value: Energy Released" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4", children: [
          "For any nuclear reaction, the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Q-value" }),
          " tells you the energy released (positive Q) or absorbed (negative Q):"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EquationBlock,
          {
            latex: "Q = \\bigl(M_{\\text{reactants}} - M_{\\text{products}}\\bigr) c^2",
            annotation: "Q equals the mass of reactants minus the mass of products, multiplied by c². A positive Q means the reaction releases energy as kinetic energy of the products and radiation.",
            label: "Q-Value"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "For example, the fission of U-235 releases ~200 MeV — roughly 50 million times more than the combustion of a single carbon atom (~4 eV). This is why a few kilograms of nuclear fuel can power a city for a year." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "special_relativity",
          title: "Special Relativity and the Origin of E = mc²",
          badge: "Intermediate",
          open: !!open.special_relativity,
          onToggle: () => toggle("special_relativity"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "Einstein's 1905 paper",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"Does the inertia of a body depend upon its energy content?"' }),
              " ",
              "(one of the four ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Annus Mirabilis" }),
              " papers) showed that if a body emits energy L as radiation, its mass decreases by L/c². This was the first statement of mass-energy equivalence. The full implications were developed in subsequent years into the framework of special relativity."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Key Relativistic Energy Quantities" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "E₀ = m₀c²" }),
                  " —",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Rest mass energy" }),
                  ": the energy an object possesses simply by virtue of having mass, even when stationary."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "E = γm₀c²" }),
                  " —",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Total relativistic energy" }),
                  ": includes kinetic energy; γ is the Lorentz factor."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "K = (γ−1)m₀c²" }),
                  " ",
                  "— ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Kinetic energy" }),
                  ": at low speeds (v ≪ c), this reduces to the classical ½m₀v²."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "E = \\gamma m_0 c^2 = \\frac{m_0 c^2}{\\sqrt{1 - v^2/c^2}}",
                annotation: "Total relativistic energy equals the rest mass energy m₀c² multiplied by the Lorentz factor γ. At rest (v=0), γ=1 and E=m₀c². As v→c, γ→∞, meaning a massive object can never be accelerated to the speed of light.",
                label: "Total Relativistic Energy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "E^2 = (pc)^2 + (m_0 c^2)^2",
                annotation: "The energy-momentum relation (from the relativistic 4-vector): energy squared equals momentum p times c, all squared, plus the rest mass energy squared. For photons (m₀=0), this gives E=pc.",
                label: "Energy-Momentum Relation"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Critical Unit Conversion" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Nuclear physics uses the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "atomic mass unit (u)" }),
                ", defined as 1/12 the mass of a C-12 atom:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm bg-background/60 rounded p-3 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: "1 u = 1.66054 × 10⁻²⁷ kg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: "1 u × c² = 1.66054 × 10⁻²⁷ × (2.998 × 10⁸)² J" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold", children: "1 u = 931.494 MeV/c²" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This conversion is used constantly in nuclear physics: every mass defect measured in atomic mass units can be immediately converted to energy in MeV by multiplying by 931.494." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Energy Scale Demonstration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "1 kg × (3 × 10⁸ m/s)² =",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "9 × 10¹⁶ J" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "= ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "25 billion kWh" }),
                  " of electrical energy"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "By comparison: burning 1 kg of coal yields only ~3.3 kWh. The ratio is almost 10 billion to one — a direct consequence of c² being so astronomically large. Nuclear reactions convert a tiny fraction (typically 0.08–0.1%) of rest mass to energy; even that fraction dwarfs chemical processes." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "mass_defect",
          title: "Mass Defect and Nuclear Binding Energy",
          badge: "Intermediate",
          open: !!open.mass_defect,
          onToggle: () => toggle("mass_defect"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "A free proton (m",
              /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "p" }),
              " = 1.007276 u) and a free neutron (m",
              /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "n" }),
              " = 1.008665 u) together have a combined mass of 2.015941 u. Yet the bound deuteron — a proton and neutron fused into a nucleus — has mass m",
              /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "d" }),
              " = 2.013553 u. The difference, 0.002388 u, is the",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: " mass defect" }),
              ": the mass that was converted to binding energy when the nucleons came together."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "B = \\bigl[Z \\cdot m_H + N \\cdot m_n - M(Z,A)\\bigr] \\times 931.494 \\text{ MeV/u}",
                annotation: "Binding energy in MeV. Z is the number of protons, m_H is the atomic hydrogen mass (1.007825 u, including the electron), N is the number of neutrons, m_n is the neutron mass (1.008665 u), and M(Z,A) is the measured atomic mass. Using atomic masses (not nuclear masses) avoids tracking electron masses separately.",
                label: "Binding Energy from Atomic Masses"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-semibold text-foreground", children: [
                "Worked Example: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "⁵⁶Fe" }),
                " (Iron-56)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Z = 26 protons, N = 30 neutrons. Masses from AME2020." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "26 × m",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "H" }),
                    " = 26 × 1.007825 u =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "26.20345 u" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "30 × m",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "n" }),
                    " = 30 × 1.008665 u =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "30.25995 u" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Sum of free masses =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "56.46340 u" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Measured M(Fe-56) =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "55.934939 u" }),
                    " ",
                    "(AME2020)"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Δm = 56.46340 − 55.93494 =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "0.52846 u" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "B = 0.52846 × 931.494 MeV/u =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary font-bold", children: "492.3 MeV" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-bold text-primary", children: "Step 7" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "B/A = 492.3 / 56 =",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary font-bold", children: "8.79 MeV/nucleon" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Binding energy comparison for selected light nuclei",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Nuclide" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground text-right", children: "B (MeV)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground text-right", children: "B/A (MeV/nucleon)" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border/50 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-foreground", children: "H-2 (Deuteron)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: "2.225" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right font-mono", children: [
                        "1.113 ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1", children: "(loosely bound)" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-foreground", children: "He-4 (Alpha)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: "28.30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right font-mono", children: [
                        "7.074 ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1", children: "(doubly magic)" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-primary font-bold", children: "Fe-56" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono text-primary font-bold", children: "492.3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right font-mono text-primary font-bold", children: [
                        "8.790 ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1", children: "(peak)" })
                      ] })
                    ] })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Physical meaning:" }),
              " To fully disassemble Fe-56 into 56 free nucleons would require injecting 492.3 MeV — roughly the energy released by 2,500 alpha decays of U-238. This is why iron is the endpoint of energy-releasing stellar fusion: no further fusion can release net energy once iron is reached."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "Source: W.J. Huang et al., AME2020, Chinese Physics C 45, 030002 (2021)." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "be_curve",
          title: "The Binding Energy per Nucleon Curve",
          badge: "Intermediate",
          open: !!open.be_curve,
          onToggle: () => toggle("be_curve"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "The plot of binding energy per nucleon (B/A) versus mass number A is one of the most important graphs in all of science. It explains, in a single curve, why stars shine, why nuclear reactors produce power, and where the elements were forged in the universe." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Why Fusion Releases Energy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "D (1.11 MeV/A) + T (2.83 MeV/A) → He-4 (7.07 MeV/A) + n",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "Average B/A gain ≈ 4.2 MeV/A × 5 nucleons ≈",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "17.6 MeV total" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Why Fission Releases Energy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "U-235 (~7.59) → Ba (~8.3) + Kr (~8.7) + neutrons",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "B/A gain ≈ 0.8 MeV/A × 235 nucleons ≈",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "~200 MeV total" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Key Features of the Curve" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground list-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "①" }),
                  " Very light nuclei (H, He, Li): B/A = 0–5 MeV/A. Loosely bound — large fusion energy gains possible here."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "②" }),
                  " Rapid rise from H-2 (1.11) to He-4 (7.07): one of the largest per-nucleon jumps in the table, driving the CNO cycle in stars."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "③" }),
                  " ",
                  "Even-odd oscillations: even-even nuclei (both Z and N even) sit above the smooth curve due to pairing energy."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "④" }),
                  " Broad maximum near Fe-56 to Ni-62 (~8.79 MeV/A): the most stable nuclei per nucleon."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "⑤" }),
                  " ",
                  "Gradual decline for A > 60: Coulomb repulsion increasingly destabilizes heavy nuclei (U-238: ~7.57 MeV/A)."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold shrink-0", children: "⑥" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Iron peak = stellar endpoint:" }),
                  " ",
                  "stars cannot release energy by fusing beyond iron. Heavier elements are built by neutron capture (s-process, r-process) during stellar death."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Binding energy per nucleon for key nuclides along the curve",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Nuclide" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground text-right", children: "A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground text-right", children: "B/A (MeV/A)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Note" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50 text-muted-foreground", children: BINDING_CURVE_DATA.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: row.peak ? "bg-primary/5" : "",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: `py-2 pr-4 font-mono ${row.peak ? "text-primary font-bold" : "text-foreground"}`,
                            children: row.nuclide
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: row.A }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: `py-2 pr-4 text-right font-mono ${row.peak ? "text-primary font-bold" : ""}`,
                            children: row.ba.toFixed(2)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: row.note })
                      ]
                    },
                    row.nuclide
                  )) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "Fe-56 highlighted as peak. Data: ENSDF/NNDC, AME2020." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "semf",
          title: "The Semi-Empirical Mass Formula (SEMF)",
          badge: "Advanced",
          badgeColor: "bg-destructive/10 text-destructive border-destructive/20",
          open: !!open.semf,
          onToggle: () => toggle("semf"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Bethe-Weizsäcker formula" }),
              " ",
              "(proposed independently by Carl Friedrich von Weizsäcker and Hans Bethe, ~1935–1936) treats the nucleus as a charged liquid drop and parametrizes binding energy using five physically motivated terms. Despite its simplicity, it predicts binding energies to within ~1% for most stable nuclei."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "B(Z,A) = a_V A - a_S A^{2/3} - a_C \\frac{Z(Z-1)}{A^{1/3}} - a_A \\frac{(A-2Z)^2}{A} \\pm \\delta",
                annotation: "SEMF binding energy in MeV. Five terms: volume (aV≈15.85), surface (aS≈18.34), Coulomb (aC≈0.711), asymmetry (aA≈23.21), and pairing (δ). The ± on δ is +aP/√A for even-even, 0 for odd-A, and −aP/√A for odd-odd nuclei (aP≈11.2 MeV).",
                label: "Semi-Empirical Mass Formula (Bethe-Weizsäcker)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                label: "Term 1 — Volume Energy",
                formula: "+a_V × A",
                coeff: "a_V ≈ 15.85 MeV",
                color: "border-l-primary",
                text: "Every nucleon contributes equally (nuclear saturation: strong force is short-range, so each nucleon only 'sees' its nearest neighbors). Analogous to the bulk cohesive energy of a liquid drop."
              },
              {
                label: "Term 2 — Surface Energy",
                formula: "−a_S × A^(2/3)",
                coeff: "a_S ≈ 18.34 MeV",
                color: "border-l-secondary",
                text: "Surface nucleons have fewer neighbors → less binding. Surface area ∝ r² ∝ A^(2/3). Acts like surface tension. More important for small nuclei (large surface-to-volume ratio)."
              },
              {
                label: "Term 3 — Coulomb Energy",
                formula: "−a_C × Z(Z−1)/A^(1/3)",
                coeff: "a_C ≈ 0.711 MeV",
                color: "border-l-destructive",
                text: "All Z protons repel each other electrostatically. Energy of a uniformly charged sphere ∝ Z²/R ∝ Z²/A^(1/3). Grows as Z², eventually dominating — responsible for the instability of very heavy nuclei."
              },
              {
                label: "Term 4 — Asymmetry Energy",
                formula: "−a_A × (A−2Z)²/A",
                coeff: "a_A ≈ 23.21 MeV",
                color: "border-l-amber-500",
                text: "Pauli exclusion forces extra nucleons into higher energy levels when N≠Z. Symmetric nuclei (N=Z) are most stable for light nuclides. The (A−2Z)² factor means any deviation from symmetry costs binding energy."
              },
              {
                label: "Term 5 — Pairing Energy",
                formula: "δ = ±a_P / A^(1/2) or 0",
                coeff: "a_P ≈ 11.2 MeV",
                color: "border-l-emerald-500",
                text: "Nucleons pair up with opposite spins, gaining extra binding. Even-even (both Z,N even): +δ (extra stable). Odd-A: δ=0 (one unpaired nucleon). Odd-odd (both Z,N odd): −δ (least stable, only 4 stable odd-odd nuclei exist)."
              }
            ].map((term) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-r-lg border-l-4 ${term.color} border border-border bg-muted/10 pl-4 pr-4 py-3`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: term.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono bg-background/60 px-2 py-0.5 rounded text-foreground", children: term.formula }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground", children: term.coeff })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: term.text })
                ]
              },
              term.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "SEMF prediction vs experiment for Fe-56 and U-238",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Nuclide" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground text-right", children: "SEMF B (MeV)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground text-right", children: "Experimental B (MeV)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground text-right", children: "Error (%)" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border/50 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-foreground", children: "Fe-56" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: "~490.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: "492.3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-mono text-green-600", children: "~0.4%" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-foreground", children: "U-238" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: "~1771" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono", children: "1801.7" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-mono text-amber-600", children: "~1.7%" })
                    ] })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Limitations:" }),
              " ",
              "The SEMF systematically underestimates binding energy at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "magic numbers" }),
              " (Z or N = 2, 8, 20, 28, 50, 82, 126), where shell structure gives extra stability not captured by the liquid-drop model. The full shell model is needed to explain these deviations."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "energy_scales",
          title: "Energy Scales: Nuclear vs. Chemical vs. Other",
          badge: "Beginner",
          badgeColor: "bg-green-500/10 text-green-700 border-green-500/20",
          open: !!open.energy_scales,
          onToggle: () => toggle("energy_scales"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'Numbers like "200 MeV per fission" are only meaningful in context. The table below places nuclear energy densities alongside chemical and theoretical limits, all on a common per-kilogram basis.' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Energy density comparison: nuclear, chemical, and other sources",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground", children: "Energy Source" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Per Reaction" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-3 font-semibold text-foreground text-right", children: "Per kg Fuel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground", children: "Notes" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50 text-muted-foreground", children: ENERGY_SCALES.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: row.highlight ? "bg-primary/5" : "",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: `py-2 pr-3 ${row.highlight ? "text-foreground font-medium" : ""}`,
                            children: row.source
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: `py-2 pr-3 text-right font-mono text-xs ${row.highlight ? "text-primary font-semibold" : ""}`,
                            children: row.perReaction
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: `py-2 pr-3 text-right font-mono text-xs ${row.highlight ? "text-primary font-semibold" : ""}`,
                            children: row.perKg
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: row.notes })
                      ]
                    },
                    row.source
                  )) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Why Nuclear Fuel is So Dense" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Chemical bonds involve electron rearrangements with energy scales of a few ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "eV" }),
                ". Nuclear reactions involve rearrangements of nucleons bound by the strong force, with energy scales of hundreds of",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "MeV" }),
                " — a factor of ~10",
                /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children: "8" }),
                ' larger. The Q = Δm·c² formula encodes this: nuclear mass defects are millions of times larger than the equivalent "mass defect" in molecular reactions.'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-background/60 p-3 space-y-1 font-mono text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: "1 UO₂ fuel pellet (1 cm³, ~10 g)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "≈ energy from",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "1 tonne of coal" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "≈",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "820 litres of oil" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "≈",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "17,000 m³ of natural gas" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Power Plant Fuel Comparison (1 GWe)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-background/60 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Nuclear (PWR)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "~0.7 tonnes U-235/day" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "~27 kg/hour of fissile material consumed" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-background/60 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Coal Plant" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "~3,000 tonnes coal/day" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "~125 tonnes/hour; plus ~8,000 t CO₂/day" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "Illustrative values. Actual consumption depends on thermal efficiency, capacity factor, and fuel enrichment. Source: World Nuclear Association, NEA (2023)." })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  EnergyMass as default
};
