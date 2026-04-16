import { e as createLucideIcon, j as jsxRuntimeExports, b as Badge, A as Atom, Z as Zap, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-D72vKdFv.js";
import { G as Globe } from "./globe-BtNp8mwp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",
      key: "1ir223"
    }
  ],
  ["path", { d: "m5 22 14-4", key: "1brv4h" }],
  ["path", { d: "m5 18 14 4", key: "lgyyje" }]
];
const FlameKindling = createLucideIcon("flame-kindling", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
const Power = createLucideIcon("power", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10.189V14", key: "1p8cqu" }],
  ["path", { d: "M12 2v3", key: "qbqxhf" }],
  ["path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6", key: "qpkstq" }],
  [
    "path",
    {
      d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",
      key: "7tigtc"
    }
  ],
  [
    "path",
    {
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "1924j5"
    }
  ]
];
const Ship = createLucideIcon("ship", __iconNode);
function CollapsibleSection({
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "w-full flex items-center justify-between px-5 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: title }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 text-sm text-foreground/90 leading-relaxed space-y-3", children })
  ] });
}
function MilestoneCard({ milestone }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `milestone.item.${milestone.id}`,
      className: "border border-border rounded-xl overflow-hidden bg-card shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `milestone.toggle.${milestone.id}`,
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-start gap-4 p-6 hover:bg-muted/20 transition-colors text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary", children: milestone.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded", children: milestone.year }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: milestone.level === "advanced" ? "destructive" : "secondary",
                      className: "text-xs capitalize",
                      children: milestone.level
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground leading-tight", children: milestone.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: milestone.summary })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-1", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground" }) })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-6 pb-6 pt-5 space-y-4", children: milestone.content })
      ]
    }
  );
}
function InfoRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-semibold text-foreground w-40", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: value })
  ] });
}
function Equation({ tex, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-2 flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-primary bg-muted px-3 py-1.5 rounded text-sm inline-block", children: tex }),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
const milestones = [
  {
    id: "1",
    year: "December 2, 1942",
    title: "Chicago Pile-1: The First Sustained Chain Reaction",
    level: "intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-5 w-5" }),
    summary: "Under the west stands of Stagg Field, Enrico Fermi and 49 colleagues achieved the world's first artificial self-sustaining nuclear chain reaction — proving nuclear power was not only possible, but controllable.",
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Date & Time", value: "December 2, 1942 — 3:25 PM CST" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Location",
            value: "Squash court, Stagg Field, University of Chicago"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Team Lead", value: "Enrico Fermi (Nobel Prize, 1938)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Team Size", value: "~49 scientists and engineers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Power Achieved",
            value: "200 watts (enough to light a single bulb)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Duration", value: "28 minutes sustained reaction" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Construction of the Pile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chicago Pile-1 was hand-assembled over approximately 18 days. The structure consisted of 57 alternating layers of graphite and uranium blocks, arranged in a roughly spherical shape within a wooden frame." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "6 tons of uranium metal (highest grade available)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "34 tons of uranium oxide (UO₂) blocks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "385 tons of graphite moderator blocks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Total mass: ~425 tons; roughly 6 meters across" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "The graphite acted as a neutron moderator — slowing fast neutrons to thermal energies where the fission cross-section of U-235 is orders of magnitude larger (~580 barns vs. ~1 barn for fast neutrons)." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Critical Mass and Physics", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The pile needed to exceed the critical condition — where on average exactly one neutron from each fission event causes another fission, sustaining the reaction. Fermi pre-calculated the required geometry using available cross-section data." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "k_eff = k∞ × P_NL",
            label: "Effective neutron multiplication factor; P_NL = non-leakage probability"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "k_eff = 1.0006 (slightly supercritical)",
            label: "At criticality on December 2; greater than 1 means a growing reaction"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "k∞ (the infinite medium multiplication factor) depends on the four-factor formula: η (neutrons per fission), ε (fast fission factor), p (resonance escape probability), and f (thermal utilization). Fermi's graphite purity was critical — even trace boron impurities absorb thermal neutrons strongly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Control rods coated in cadmium (which has an enormous thermal neutron absorption cross-section, ~2,500 barns) were inserted through the pile. Fermi orchestrated step-by-step withdrawal, calling out each increment guided by slow-neutron counters. The neutron count rate followed a predictable 1/(1−k) divergence once the rods were sufficiently withdrawn." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Safety Systems and the Origin of SCRAM", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The safety architecture was rudimentary by modern standards but carefully designed for the circumstances:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ZIP rod:" }),
            " A cadmium safety rod tied by rope to the balcony above — pulled out during operation, gravity would drop it back in if cut."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Safety Control Rod Axe Man (SCRAM):" }),
            ' An engineer standing by with an axe, ready to sever the rope if ordered. The acronym "SCRAM" — now used globally for emergency reactor shutdown — originated here.'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Suicide squad":' }),
            " Three men on the balcony with bottles of cadmium sulfate solution, prepared to douse the pile if all else failed."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Given the primitive neutron cross-section data available and the relatively low power output (200 W), no significant radiation hazard was encountered. However, the pile produced no shielding whatsoever." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "The Coded Message and Aftermath", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Following success, Arthur Compton sent the famous coded telegram to James Conant in Washington:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"The Italian navigator has just landed in the new world. The natives are friendly."' }),
          " ",
          '("Italian navigator" = Fermi; "new world" = nuclear age.)'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The pile was quickly disassembled and rebuilt more safely at Site A/Plot M in the Palos Hills forest. Its successor, CP-3, became the basis for the Hanford Site reactors used to produce plutonium-239 for the Trinity test and Fat Man bomb. CP-1 remains the direct technological ancestor of every nuclear reactor operating today." })
      ] })
    ] })
  },
  {
    id: "2",
    year: "December 20, 1951",
    title: "EBR-I: First Electricity Generated from Nuclear Energy",
    level: "intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
    summary: "At a remote site in Idaho, Experimental Breeder Reactor I lit four light bulbs with nuclear electricity — the first time in history that a controlled fission reaction generated usable electrical power.",
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Date", value: "December 20, 1951" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Location",
            value: "Arco, Idaho (now Idaho National Laboratory)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Designer",
            value: "Argonne National Laboratory (Walter Zinn, team)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Reactor Type",
            value: "Sodium-cooled fast breeder reactor"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "First output",
            value: "4 light bulbs in the reactor room"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Peak power", value: "~200 kWe (eventually)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Fast Breeder Reactor Physics", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'EBR-I was a fast reactor — neutrons were not thermalized/slowed, but kept at high ("fast") energies. This had a crucial implication: fast neutrons can convert fertile U-238 (which does not fission easily) into fissile Pu-239 via neutron capture:' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "²³⁸U + n → ²³⁹U → ²³⁹Np → ²³⁹Pu",
            label: "Beta decay chain from neutron capture on U-238; half-lives 23.5 min → 2.36 days → 24,100 yr"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `The "breeding" concept: for every fission event consuming one U-235 nucleus, more than one new Pu-239 atom was produced in the U-238 blanket surrounding the core. EBR-I demonstrated a breeding ratio slightly above 1.0 — confirming that a reactor could in principle produce more fuel than it consumed, dramatically extending the world's uranium supply.` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "Breeding Ratio (BR) = fissile produced / fissile consumed > 1",
            label: "BR > 1 means net fuel production; EBR-I demonstrated this for the first time"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "The 1955 Partial Melt Incident", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In 1955, during a controlled power transient experiment, an operator made an error — instead of allowing the reactor to cool during the ramp-up as planned, they held power high. The fuel rods experienced a partial meltdown." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Crucially: there was no explosion, no significant radiation release outside the building, and the reactor shut down safely. The incident demonstrated that even in a partial melt scenario, a properly designed fast reactor could contain damage. The fuel was carefully excavated and analyzed — providing invaluable data on fuel behavior under accident conditions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "EBR-I's response to accident conditions was in fact passive-safe: the fast reactor's positive void coefficient was countered by the Doppler broadening effect and thermal expansion of the fuel, causing a natural power reduction at high temperatures." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Legacy and National Historic Landmark", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "EBR-I was decommissioned in 1964, but its significance was immediately recognized. It was designated a National Historic Landmark in 1966 and remains open for public tours at the Idaho National Laboratory. Visitors can stand in the original reactor room where the first nuclear electricity was generated." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The breeder reactor concept EBR-I demonstrated was refined through EBR-II (operational 1964–1994), which ran on reprocessed metallic fuel and proved passive safety principles. These findings directly informed Generation IV reactor designs, including the proposed Natrium reactor from TerraPower." })
      ] })
    ] })
  },
  {
    id: "3",
    year: "January 17, 1955",
    title: "USS Nautilus: Nuclear Naval Propulsion",
    level: "intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ship, { className: "h-5 w-5" }),
    summary: `At 11:00 AM EST, USS Nautilus transmitted four words that changed naval warfare forever: "Underway on nuclear power." The world's first nuclear-powered vessel could now remain submerged indefinitely.`,
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Date", value: "January 17, 1955 — 11:00 AM EST" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Historic Message",
            value: /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary font-semibold", children: '"Underway on nuclear power"' })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Vessel", value: "USS Nautilus (SSN-571)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Dimensions",
            value: "97.5 m length; 3,500 ton submerged displacement"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Reactor",
            value: "Westinghouse S2W PWR; 15,000 shaft horsepower"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Program Director",
            value: "Admiral Hyman G. Rickover, USN"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "The S2W Reactor and Rickover's Program", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Admiral Hyman Rickover drove an almost impossibly demanding 4-year development schedule for a submarine-grade pressurized water reactor. The Westinghouse S2W used highly enriched uranium (naval-grade HEU), allowing a compact core that could fit within the pressure hull. Key parameters:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reactor type: S2W PWR (submarine, 2nd generation, Westinghouse)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Coolant: pressurized water at ~150 bar; steam generator drives turbines directly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Fuel: 93% enriched uranium; initial fuel load lasted >100,000 miles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Shielding: lead + polyethylene surrounding the reactor compartment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Rickover's Naval Reactors organization imposed extraordinary quality standards that became the template for nuclear safety culture worldwide. Every weld, every valve, every procedure was documented and traceable — a standard later adopted by commercial nuclear power." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "First Voyage and the North Pole Transit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nautilus's first nuclear-powered transit ran from New London, Connecticut to San Juan, Puerto Rico — 2,100 nautical miles entirely submerged, completed in 90 hours. Previously, no submarine could remain submerged for more than a few days before needing to surface to recharge diesel-electric batteries." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'On August 3, 1958, Nautilus made history again: it became the first vessel of any kind to navigate the geographic North Pole, traveling entirely submerged beneath the Arctic ice cap. The operation, codenamed "Operation Nautilus," covered 1,830 nautical miles under the ice in 96 hours.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The practical military implication was profound: a nuclear submarine could in principle circle the Earth multiple times without surfacing, limited only by food stores and crew endurance. The Soviet Navy immediately accelerated its own nuclear submarine program." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Impact on Commercial Nuclear Power", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The S2W reactor technology did not remain military. Admiral Rickover adapted it directly for the civilian Shippingport Atomic Power Station (1957), which used the same PWR principles: pressurized water primary loop, steam generator, turbine-generator. This lineage made the PWR the dominant reactor type for commercial nuclear power worldwide:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "~70% of all operating commercial reactors today are PWRs or derivatives" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Westinghouse AP1000 (Generation III+) is a direct evolutionary descendant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "French nuclear fleet (58 reactors) entirely PWR-based" })
        ] })
      ] })
    ] })
  },
  {
    id: "4",
    year: "1956–1957",
    title: "Calder Hall & Shippingport: Dawn of Commercial Nuclear Power",
    level: "intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-5 w-5" }),
    summary: "Within fourteen months, the United Kingdom and the United States both opened their first commercial nuclear power stations — Calder Hall and Shippingport — inaugurating the era of nuclear electricity generation.",
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Calder Hall, UK (October 17, 1956)",
          defaultOpen: false,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Calder Hall, located at Sellafield in Cumbria, England, was officially opened by Queen Elizabeth II and connected to the National Grid on October 17, 1956 — making it the world's first commercial nuclear power station." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Reactor type", value: "Magnox (4 × 50 MWe units)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Moderator", value: "Graphite" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InfoRow,
                {
                  label: "Fuel",
                  value: "Natural uranium metal in magnesium-alloy cans"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InfoRow,
                {
                  label: "Coolant",
                  value: "CO₂ gas at ~7 bar; 335°C outlet temperature"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InfoRow,
                {
                  label: "Operated",
                  value: "1956–2003 (47 years — remarkable longevity)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3", children: "Calder Hall was dual-purpose: its plutonium output was essential to the UK's nuclear weapons program. This was common for first-generation reactors — the economics of commercial power were secondary to weapons material production. The Magnox design (named for the magnesium-alloy fuel cladding) was inherently suited to low burn-up natural uranium fuel, which maximizes Pu-239 production per gram of natural uranium." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          title: "Shippingport, USA (December 2, 1957)",
          defaultOpen: false,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Shippingport Atomic Power Station, in Beaver County, Pennsylvania, began operation on December 2, 1957 — exactly 15 years after CP-1. It was the first US civilian full-scale nuclear power station and the first in the world built expressly for commercial power (not weapons material)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Capacity", value: "60 MWe" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InfoRow,
                {
                  label: "Reactor type",
                  value: "PWR (designed by Admiral Rickover's team)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InfoRow,
                {
                  label: "Fuel",
                  value: "Initially 93% HEU; later light water breeder core"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Operator", value: "Duquesne Light Company" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InfoRow,
                {
                  label: "Decommissioned",
                  value: "1982; entire reactor vessel shipped to Hanford"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3", children: "In 1977, Shippingport was converted to demonstrate the Light Water Breeder Reactor (LWBR) concept — using a thorium-232/uranium-233 fuel cycle rather than the conventional uranium cycle. This was the first large-scale demonstration of thorium fuel in a commercial-scale PWR environment, and it confirmed breeding ratios near 1.0 were achievable with thorium in a light water reactor." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "At decommissioning, the reactor vessel was entombed and shipped intact by barge up the Columbia River to the Hanford Site — a landmark demonstration of safe decommissioning techniques." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Significance and What Followed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Together, these two plants proved three things the nuclear industry needed:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Nuclear fission could produce electricity reliably at commercial scale." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Long operating lifetimes (Calder Hall's 47-year run) were achievable." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Safe decommissioning of a reactor was technically feasible (Shippingport)." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "The 1960s and 1970s saw a massive nuclear build-out worldwide, driven directly by these demonstrations. By 1979 (the year of Three Mile Island), there were over 70 operating reactors in the United States alone, and the global installed base was growing rapidly." })
      ] })
    ] })
  },
  {
    id: "5",
    year: "1997 & 2022",
    title: "JET Tokamak: World Fusion Power Records",
    level: "advanced",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlameKindling, { className: "h-5 w-5" }),
    summary: "The Joint European Torus at Culham set the world record for D-T fusion power in 1997 (16.1 MW), then shattered its own record 25 years later with 59.7 megajoules in a 5-second pulse — directly validating ITER's design.",
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Location",
            value: "Culham Centre for Fusion Energy, Oxfordshire, UK"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Operational", value: "1983–2023 (40 years)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Type",
            value: "Tokamak; major radius 2.96 m; plasma volume 100 m³"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Plasma fuel",
            value: "Deuterium-Tritium (D-T) for record shots"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "1997 record",
            value: "16.1 MW fusion power for 0.65 s; Q ≈ 0.65"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "2022 record",
            value: "59.7 MJ in 5 s; 11.8 MW average fusion power"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "D-T Fusion Reaction Physics", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The dominant fusion reaction used in tokamak experiments — and the one ITER will use — is:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "²H + ³H → ⁴He (3.52 MeV) + n (14.1 MeV)    Q = 17.6 MeV",
            label: "Deuterium-Tritium fusion; 80% of energy carried by the neutron"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This reaction requires the plasma to reach temperatures of ~100–200 million °C — ten times hotter than the Sun's core. At these temperatures, the D and T nuclei have sufficient kinetic energy to overcome the Coulomb barrier and fuse. The energy gain Q is defined as:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "Q = P_fusion / P_input",
            label: "Q = 0.65 (JET 1997) means fusion produced 65% of the heating energy input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `Q ≥ 1 ("scientific breakeven") was not achieved by JET — but was not the goal. JET's mission was to demonstrate sustained D-T operation, validate plasma physics models at scale, and characterize tritium-handling systems. All were achieved.` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "The 2022 Record in Detail", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "On February 9, 2022, JET's final D-T experimental campaign (DTE3) produced 59.7 megajoules of fusion energy over a 5-second pulse — nearly tripling the 1997 record of 21.7 MJ. The key improvements over the intervening 25 years:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ITER-like wall:" }),
            " JET replaced its carbon wall with beryllium and tungsten (the same materials ITER will use) in 2011. This reduced impurity influx into the plasma, a major performance limiter."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Heating power:" }),
            " Combined neutral beam injection + ion cyclotron resonance heating delivering ~30 MW to the plasma."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tritium mix:" }),
            " Optimized 50:50 D:T ratio; approximately 0.2 mg of tritium consumed per 5-second pulse."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Plasma control:" }),
            " Improved real-time control systems to maintain plasma stability (avoid disruptions) throughout the record pulse."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "The 2022 result directly validated ITER's projected performance — if JET's plasma physics models scale correctly, ITER should achieve Q ≥ 10 (500 MW from 50 MW heating)." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { title: "Tritium Handling and Safety", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tritium (³H) is radioactive — it decays by beta emission with a 12.3-year half-life. Over JET's career, hundreds of grams of tritium were handled safely within the facility. This was itself a major achievement: demonstrating that kg-scale tritium handling could be done in a regulated, safe industrial environment. The tritium processing and accountancy systems developed for JET are now being scaled up for ITER, which will eventually require a tritium inventory of ~3 kg on site." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "JET Decommissioning and Legacy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "JET conducted its final plasma experiment on December 18, 2023, ending 40 years of operation. It now enters a 16-year decommissioning program. The scientific legacy includes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Over 100,000 plasma pulses; petabytes of plasma physics data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Validation of the ITER scaling laws and design choices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "First operational experience with beryllium/tungsten plasma-facing components at scale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Training of an entire generation of fusion scientists and engineers for ITER" })
        ] })
      ] })
    ] })
  },
  {
    id: "6",
    year: "December 5, 2022",
    title: "NIF Fusion Ignition: Energy In Exceeds Energy Out",
    level: "advanced",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }),
    summary: "For the first time in history, a fusion device produced more energy than was put into the fuel — 3.15 MJ of fusion energy from 2.05 MJ of laser energy. The 54-year quest for ignition was achieved at the National Ignition Facility.",
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Date", value: "December 5, 2022" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Facility",
            value: "National Ignition Facility (NIF), Lawrence Livermore National Laboratory, CA"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Energy in (laser)", value: "2.05 MJ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Fusion energy out", value: "3.15 MJ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Q (laser-to-fusion)", value: "≈ 1.54" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Q (wall-to-fusion)",
            value: "≈ 0.15–0.20 (laser efficiency ~10–15%)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Inertial Confinement Fusion Mechanism", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "NIF uses inertial confinement fusion (ICF) — a fundamentally different approach from magnetic confinement (tokamaks). The sequence:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "192 laser beams" }),
            " (NIF's full complement) fire simultaneously at a gold cylinder (hohlraum) about 1 cm tall, delivering 2.05 MJ in ~20 nanoseconds."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "The laser energy is absorbed by the hohlraum walls, which re-emit it as a uniform bath of",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " soft X-rays" }),
            " inside the cylinder."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "The X-rays ablate (vaporize) the outer surface of a",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "2 mm spherical D-T capsule" }),
            " suspended at the center, generating an inward rocket reaction."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "The capsule implodes to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "~100× the density of solid lead" }),
            '; the center ("hot spot") reaches temperatures exceeding',
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "100 million °C" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "D-T fusion ignites in the hot spot;",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "alpha particles" }),
            ' (the 3.52 MeV He-4 product) are trapped in the dense fuel and heat the surrounding shell — "alpha heating."'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Alpha heating propagates outward through the dense fuel layer:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "self-sustaining burn" }),
            " — true ignition."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "²H + ³H → ⁴He (α, 3.52 MeV) + n (14.1 MeV)",
            label: "The alpha particle is key: trapped in dense plasma, it heats the surrounding fuel"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "What 'Ignition' Means (and Doesn't Mean)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "The December 2022 shot achieved ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "scientific ignition" }),
          ": fusion energy output exceeded the energy delivered to the fusion fuel by the lasers (Q_laser > 1). This is the physically meaningful threshold — it means the fusion plasma was generating more energy than was used to compress it."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "However, the laser system itself is highly inefficient. NIF's 192 laser amplifiers consume approximately 400–500 MJ of electricity from the grid to produce 2.05 MJ of laser light. Wall-plug-to-fusion Q is approximately 0.003–0.006 — far below what would be needed for commercial power." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "The path to commercial ICF power requires:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Target gain of ~100× (fusion Q ≈ 100)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Laser efficiency >10× current (diode-pumped systems, currently in development)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Target fabrication at scale: ~1 million targets/year at <$0.20 each" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Repetition rate: ~10–15 shots/second (NIF fires ~1 shot/day)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Subsequent Shots and Progress (2023–2024)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "NIF followed the record-breaking December 2022 shot with multiple repeat demonstrations in 2023, confirming the result was reproducible and understanding its physics better. Key subsequent results:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "July 30, 2023: ~3.88 MJ fusion yield (Q ≈ 1.9) — improvement through refined target design" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "October 2023: ~4.3 MJ fusion yield — highest confirmed as of early 2024" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The alpha-heating physics model is now validated; teams are exploring higher laser energies and improved capsule symmetry to push gain further." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Private companies (Commonwealth Fusion, Helion, TAE Technologies, and others) are pursuing alternative pathways to commercial fusion — ICF-based startups include Xcimer Energy and Focused Energy, who are directly building on NIF's alpha-heating results." })
      ] })
    ] })
  },
  {
    id: "7",
    year: "Ongoing (2020s)",
    title: "ITER: The International Fusion Engineering Milestone",
    level: "intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
    summary: "ITER — a collaboration of 35 nations — is assembling the world's largest tokamak in Cadarache, France. Designed to produce 500 MW from 50 MW of heating (Q ≥ 10), it will be the decisive engineering proof of fusion power.",
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Full name",
            value: "International Thermonuclear Experimental Reactor"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Location",
            value: "Cadarache, Saint-Paul-lès-Durance, France"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Members",
            value: "EU, USA, Russia, China, India, South Korea, Japan (35 nations total)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Design goal",
            value: "500 MW fusion power from 50 MW heating input (Q ≥ 10)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Plasma volume", value: "840 m³ (major radius 6.2 m)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Total mass", value: "~23,000 tonnes total assembly" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            label: "Cost estimate",
            value: "~€20 billion (shared in-kind among members)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Superconducting Magnets: The Engineering Core", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "ITER's magnetic confinement system is an unprecedented engineering achievement. The 18 toroidal field (TF) coils that create the main confining magnetic field each stand 14 m tall and weigh approximately 360 tonnes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Superconducting material:" }),
            " Nb₃Sn (niobium-tin) at 4 K (−269°C); operates at 13 T field at the conductor"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Central solenoid:" }),
            ` 13.5 T; 73,000 A; 6-module stack assembled on site; often called "the world's most powerful superconducting electromagnet"`
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Combined stored magnetic energy:" }),
            " 51 GJ — comparable to a large flywheel battery"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cooling:" }),
            " Supercritical helium at 4 K circulated through all coils"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Equation,
          {
            tex: "B_toroidal = 5.3 T  (at plasma center;  13 T at conductor)",
            label: "Magnetic field in the plasma; the high-field Nb₃Sn conductor enables compact design"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Mission: Proof of Concept, Not a Power Plant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "ITER is explicitly a science and engineering experiment — not a power plant. Its mission has three components:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal pl-5 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Achieve Q ≥ 10:" }),
            " Demonstrate that a fusion plasma can produce at least 10× more energy than the heating input. This is the fundamental scientific milestone that no device has yet reached (JET's best was Q ≈ 0.65)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tritium breeding demonstration:" }),
            " Test tritium breeding blanket modules in the actual neutron flux of a burning D-T plasma. Future power plants must breed their own tritium (only 20 kg of natural tritium exists worldwide)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Integrated engineering test:" }),
            " Operate superconducting magnets, plasma-facing components, heating systems, and tritium handling together at scale for sustained periods."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Assembly Progress and Timeline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "ITER assembly is underway at Cadarache. Key milestones:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "2015: Tokamak pit excavation complete; bioshield concrete poured" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: '2020: "First Plasma" preparation begins; first major components delivered to site' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "2021: Assembly formally commenced with first sector/coil module integration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "2023–2027: Ongoing tokamak assembly; multiple sector and coil modules being integrated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Target first plasma: ~2025–2027 (schedule under revision)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "D-T operations (full Q ≥ 10 campaign): ~2035 target" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "ITER's successor, DEMO (Demonstration Power Plant), is under conceptual design by EUROfusion. DEMO aims to demonstrate net electricity generation to the grid — targeting operation in the 2040–2060 timeframe." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "International Collaboration and Cost Sharing", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'ITER is the most complex international scientific collaboration in history, rivaling and arguably exceeding the International Space Station in technical scope. Each member nation contributes components ("in-kind contributions") rather than cash:' }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "EU: largest single contributor (~45%); provides vacuum vessel sectors, TF coils, buildings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Japan: central solenoid conductor, neutral beam injectors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "USA: central solenoid modules (built by General Atomics)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "China, South Korea: various coil winding packs, cryostat sections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "India: cryostat (the largest stainless steel high-vacuum vessel ever built)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "This structure requires extraordinary coordination: components manufactured on three continents must meet tolerances of fractions of a millimeter and interface seamlessly on site. The ITER Organization has become a proving ground for international high-technology project management." })
      ] })
    ] })
  }
];
function Milestones() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-12 space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-4", "data-ocid": "milestones.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-mono", children: "History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-mono", children: "Milestone Experiments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground leading-tight", children: "Milestone Experiments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl leading-relaxed", children: "Nuclear science has several landmark experiments and achievements that changed the world. This page explores the key milestones in detail — the physics behind them, the people involved, and their lasting consequences." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70 italic", children: "Select any milestone to expand detailed analysis, equations, and historical context." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-4 border-l-2 border-primary/30 space-y-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1942" }),
        " — First chain reaction  · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1951" }),
        " — First nuclear electricity  · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1955" }),
        " — Nuclear propulsion"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1956–57" }),
        " — Commercial power  · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1997 & 2022" }),
        " — Fusion records  · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2022" }),
        " — Fusion ignition  · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2020s" }),
        " — ITER assembly"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "milestones.list", className: "space-y-4", children: milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneCard, { milestone: m }, m.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border pt-6 space-y-2 text-xs text-muted-foreground/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-muted-foreground text-sm", children: "Sources & Further Reading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc pl-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Fermi, E. et al. (1942). Chicago Pile-1.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Atomic Energy Commission Records." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Zinn, W. H. (1952). EBR-I first operation reports.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Argonne National Laboratory." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Rickover, H. G. (1958). Naval Reactors — S2W program.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "U.S. Navy / AEC." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "IAEA PRIS (2024). Calder Hall & Shippingport reactor data.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "iaea.org/PRIS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "EUROfusion (2022). JET D-T record: 59.7 MJ. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "euro-fusion.org" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Zylstra, A. B. et al. (2022). Burning plasma achieved in inertial fusion. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Nature 601, 542–548." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Abu-Shawareb, H. et al. (2022). Lawson Criterion for Ignition Exceeded in an Inertial Fusion Experiment.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Phys. Rev. Lett. 129, 075001." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "ITER Organization (2023). ITER Project — Progress and Status.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "iter.org" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Milestones as default
};
