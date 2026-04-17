import { j as jsxRuntimeExports, L as Link, C as ChevronRight, b as Badge, A as Atom, Z as Zap, F as FlaskConical, r as reactExports, a as ChevronDown } from "./index-DHpNeWFA.js";
import { G as Globe } from "./globe-pfKXzHax.js";
import { R as Rocket } from "./rocket-CvmP0FwJ.js";
function Collapsible({
  title,
  badge,
  badgeVariant = "secondary",
  icon,
  children,
  defaultOpen = false,
  id
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id,
      className: "border border-border rounded-xl overflow-hidden mb-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/40 transition-colors text-left gap-4",
            "aria-expanded": open,
            "data-ocid": id ? `${id}.toggle` : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 font-display font-semibold text-lg text-foreground", children: [
                icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
                title
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 shrink-0", children: [
                badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: badgeVariant, children: badge }),
                open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
              ] })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 bg-background border-t border-border", children })
      ]
    }
  );
}
function SubSection({
  title,
  children,
  defaultOpen = false,
  id
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id,
      className: "border border-border/60 rounded-lg overflow-hidden mb-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between px-5 py-3 bg-muted/20 hover:bg-muted/40 transition-colors text-left",
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: title }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 bg-background border-t border-border/60 text-sm leading-relaxed space-y-3", children })
      ]
    }
  );
}
function Equation({
  formula,
  label,
  note
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg px-5 py-3 my-3 font-mono text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary font-semibold", children: formula }),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs mt-1", children: label }),
    note && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/70 text-xs mt-1 italic", children: note })
  ] });
}
function DataTable({
  headers,
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border my-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50", children: headers.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "th",
      {
        className: "px-4 py-3 text-left font-semibold text-foreground border-b border-border whitespace-nowrap",
        children: h
      },
      h
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "tr",
      {
        className: ri % 2 === 0 ? "bg-background" : "bg-muted/20",
        "data-ocid": `advanced_reactors.table.row.${ri + 1}`,
        children: row.cells.map((cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: "px-4 py-2.5 border-b border-border/50 text-foreground/90",
            children: cell
          },
          `${row.key}-${headers[ci] ?? ci}`
        ))
      },
      row.key
    )) })
  ] }) });
}
function InfoCard({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-primary font-display", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: sub })
  ] });
}
function Citation({ id, text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "group relative cursor-help", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("sup", { className: "text-primary font-bold hover:underline", children: [
      "[",
      id,
      "]"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-hover:block absolute bottom-full left-0 z-10 w-72 p-3 bg-popover border border-border rounded-lg text-xs text-popover-foreground shadow-lg whitespace-normal", children: text })
  ] });
}
const smrTableData = [
  {
    key: "nuscale",
    cells: [
      "NuScale VOYGR",
      "LWR (PWR)",
      "77 MWe/module",
      "NuScale Power (USA)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "default", children: "NRC Certified 2022" }, "ns-status")
    ]
  },
  {
    key: "bwrx",
    cells: [
      "BWRX-300",
      "LWR (BWR)",
      "300 MWe",
      "GE-Hitachi (USA/Japan)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Licensing — Canada" }, "bwrx-status")
    ]
  },
  {
    key: "ap300",
    cells: [
      "AP300",
      "LWR (PWR)",
      "300 MWe",
      "Westinghouse (USA)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Pre-licensing" }, "ap300-status")
    ]
  },
  {
    key: "smr160",
    cells: [
      "SMR-160",
      "LWR (PWR)",
      "160 MWe",
      "Holtec International (USA)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Pre-licensing" }, "smr160-status")
    ]
  },
  {
    key: "xe100",
    cells: [
      "Xe-100",
      "HTGR (pebble-bed)",
      "80 MWe",
      "X-energy (USA)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "US DOE ARDP" }, "xe100-status")
    ]
  },
  {
    key: "kpfhr",
    cells: [
      "KP-FHR",
      "Fluoride-salt HTR",
      "140 MWe",
      "Kairos Power (USA)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Demo permit 2023" }, "kpfhr-status")
    ]
  },
  {
    key: "arc100",
    cells: [
      "ARC-100",
      "SFR (sodium-cooled)",
      "100 MWe",
      "ARC Nuclear Canada",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Licensing Canada" }, "arc100-status")
    ]
  },
  {
    key: "imsr",
    cells: [
      "IMSR-400",
      "MSR (molten salt)",
      "~195 MWe",
      "Terrestrial Energy (Canada)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Pre-licensing" }, "imsr-status")
    ]
  },
  {
    key: "mmrp",
    cells: [
      "MMRP",
      "HTGR (microreactor)",
      "5 MWe",
      "Ultra Safe Nuclear (USA)",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Pre-licensing" }, "mmrp-status")
    ]
  }
];
function AdvancedReactors() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "advanced_reactors.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "max-w-5xl mx-auto flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/reactors",
              className: "hover:text-foreground transition-colors",
              children: "Reactors"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Advanced Reactors" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "destructive",
                  className: "uppercase tracking-wide text-xs",
                  children: "Advanced"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Generation IV · SMRs · Fusion · Space · Thorium" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-3", children: "Advanced Reactor Concepts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-3xl", children: "Generation IV reactor systems, small modular reactors, fusion power, space nuclear systems, and the thorium fuel cycle — the nuclear technologies shaping the next half-century of energy and beyond." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-5 bg-card border border-border rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoCard,
              {
                label: "Gen IV Concepts",
                value: "6",
                sub: "Selected by GIF, 2002"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoCard,
              {
                label: "SMR Designs",
                value: "70+",
                sub: "In development worldwide"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoCard,
              {
                label: "ITER Q Factor",
                value: "≥10",
                sub: "Target plasma gain"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoCard,
              {
                label: "Th Abundance",
                value: "3×",
                sub: "More than uranium in crust"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-5 text-sm leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Generation IV Program" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2", children: [
                  "The Generation IV International Forum (GIF), established in 2001, identified six reactor concepts for long-term development with four key goals: enhanced safety, sustainability (fuel use and waste minimization), economic competitiveness, and proliferation resistance.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Citation,
                    {
                      id: 1,
                      text: "GIF 2002 Technology Roadmap. Generation IV International Forum. https://www.gen-4.org/gif/jcms/c_40481/technology-roadmap"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "These designs represent a step-change from Generation III/III+ light-water reactors — many use entirely different coolants, fuels, and operating temperatures, unlocking new industrial applications beyond electricity generation." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Small Modular Reactors (SMRs)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2", children: [
                  "SMRs are defined as reactors with electrical output below 300 MWe, designed for factory fabrication and modular site deployment. The NuScale VOYGR became the first SMR to receive NRC design certification in September 2022.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Citation,
                    {
                      id: 2,
                      text: "NRC. NuScale Standard Design Approval. https://www.nrc.gov/reactors/new-reactors/smr/nuscale.html"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The economic premise: lower upfront capital, factory quality control, and right-sized capacity for industrial heat applications, remote communities, and grid replacement of retiring fossil plants." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Collapsible,
            {
              title: "Generation IV Reactor Concepts",
              badge: "Advanced",
              badgeVariant: "destructive",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-5 w-5" }),
              id: "gen4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "The six Generation IV concepts span a wide range of coolants, fuels, and neutron spectra. Each addresses specific limitations of current light-water reactor technology — whether in fuel efficiency, waste transmutation, high-temperature process heat, or passive safety." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "1a. High-Temperature Gas-Cooled Reactor (HTGR)",
                    id: "htgr",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Coolant",
                            value: "Helium",
                            sub: "750–1000 °C outlet"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Thermal Efficiency",
                            value: "≥45%",
                            sub: "vs ~33% for LWRs"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Fuel",
                            value: "TRISO",
                            sub: "Ceramic-coated particles"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                        "HTGRs use helium as coolant at outlet temperatures of 750–1000 °C, far exceeding the ~325 °C of conventional light-water reactors. The graphite moderator and ceramic TRISO fuel particles provide extraordinary inherent safety: the fuel retains fission products intact up to 1600 °C — temperatures unreachable in any credible accident scenario.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Citation,
                          {
                            id: 3,
                            text: "Grover, R. B. (2017). TRISO fuel particle design and fabrication. Nuclear Engineering and Design, 360."
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-4 my-3 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "TRISO Fuel Particle Architecture" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Each TRISO particle (~1 mm diameter) consists of a UO₂ or UC fuel kernel surrounded by five concentric layers:" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-2 space-y-1 text-muted-foreground list-decimal list-inside", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Porous carbon buffer" }),
                            " ",
                            "— absorbs fission recoil energy, accommodates fuel swelling"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Inner dense PyC" }),
                            " ",
                            "— protective barrier; prevents chemical attack of SiC layer"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Silicon carbide (SiC)" }),
                            " ",
                            "— primary pressure vessel; retains gaseous and metallic fission products"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Outer dense PyC" }),
                            " ",
                            "— structural protection; prevents Cl⁻ attack during fabrication"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-xs", children: "Tens of thousands of TRISO particles are embedded in graphite matrix to form a fuel compact (prismatic design) or pebble (pebble-bed design, 60 mm diameter). Failure rate <10⁻⁵ per particle." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Equation,
                        {
                          formula: "T_peak(fuel) ≤ 1600 °C at all conditions",
                          label: "TRISO fuel integrity limit — no active cooling required in loss-of-coolant events"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Design Variants" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc list-inside", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Prismatic (block)" }),
                            ": fuel compacts inserted into hexagonal graphite fuel blocks; columns form the core. Example: JAEA HTTR (Japan, 30 MWth research reactor)."
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Pebble-bed (PBR)" }),
                            ": graphite spheres circulate through the core continuously; online refueling. Example: HTR-PM (China)."
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Operating Example: HTR-PM (China, 2021)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                          "World's first commercial pebble-bed HTGR; 2 × 250 MWth modules driving one 210 MWe steam turbine. Connected to the Shandong grid in December 2021. Operates at 750 °C helium outlet; demonstrates passive decay heat removal by natural convection and conduction alone.",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Citation,
                            {
                              id: 4,
                              text: "Zhang, Z. et al. (2021). Current status and technical description of Chinese 2×250 MWth HTR-PM demonstration plant. Nuclear Engineering and Design, 239."
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground", children: [
                        "High outlet temperature enables",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "thermochemical hydrogen production" }),
                        " ",
                        "via the sulfur-iodine cycle (S-I cycle): 2H₂O → 2H₂ + O₂ using nuclear heat above 800 °C — avoiding CO₂ from steam methane reforming. Also viable: coal gasification, ammonia synthesis, and desalination process heat. This positions HTGR as a multi-energy product reactor, not solely an electricity source."
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "1b. Molten Salt Reactor (MSR)", id: "msr", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Operating Pressure",
                        value: "~1 atm",
                        sub: "vs 155 bar PWR"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Temperature",
                        value: "650–750 °C",
                        sub: "Fuel salt coolant"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Fuel Form",
                        value: "Dissolved",
                        sub: "No solid fuel cladding"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                    "MSRs dissolve fissile material (uranium or thorium fluorides) directly into a molten salt carrier — typically LiF-BeF₂ (FLIBE) or LiF-NaF-KF (FLINAK). The liquid fuel concept eliminates solid fuel cladding failure as an accident scenario, enables online fuel processing, and operates at atmospheric pressure, removing the driving force for a loss-of-coolant event.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Citation,
                      {
                        id: 5,
                        text: "Haubenreich, P. N. & Engel, J. R. (1970). Experience with the Molten-Salt Reactor Experiment. Nuclear Applications and Technology, 8(2)."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Equation,
                    {
                      formula: "Th-232 + n → Th-233 → Pa-233 → U-233 (fissile)",
                      label: "Thorium breeding cycle in MSR; protactinium-233 T½ = 27 days",
                      note: "U-233 has excellent fissile properties: η ≈ 2.29 neutrons per absorption at thermal energies"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Key Safety Feature: Freeze Plug (Drain Tank)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A freeze plug of solidified salt is maintained at the bottom of the reactor vessel by active cooling. If power is lost or temperatures exceed limits, the plug melts, draining the fuel salt by gravity into a passively cooled, geometrically subcritical drain tank — achieving shutdown without operator action or any active systems. This is an intrinsic safety mechanism unavailable in solid-fuel reactors." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Engineering Challenges" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc list-inside", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Corrosion" }),
                        ": fluoride salts corrode structural metals; Hastelloy-N developed at ORNL; modern materials research ongoing"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Tritium production" }),
                        ": Li-6 in FLIBE captures neutrons → ³H; tritium permeates metalwork; requires dedicated tritium barrier system"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Salt processing" }),
                        ": removal of fission products (especially noble gases, noble metals) from the salt stream — complex online chemistry plant"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Licensing framework" }),
                        ": regulatory frameworks are written for solid fuel; MSR requires new fuel qualification and licensing approaches"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Historical: MSRE at ORNL (1965–1969)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      "The Molten Salt Reactor Experiment at Oak Ridge National Laboratory ran for ~4 years on U-235 salt, then U-233 — the only reactor ever to operate on U-233 fuel. Demonstrated stable operation, online refueling, and freeze plug safety. Shut down for budgetary reasons, not technical problems.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Citation,
                        {
                          id: 6,
                          text: "MacPherson, H. G. (1985). The Molten Salt Reactor Adventure. Nuclear Science and Engineering, 90(4), 374–380."
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "1c. Sodium-Cooled Fast Reactor (SFR)", id: "sfr", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Coolant Temp",
                        value: "350–550 °C",
                        sub: "Low-pressure sodium"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Neutron Spectrum",
                        value: "Fast",
                        sub: "No moderator"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Conversion Ratio",
                        value: ">1.0",
                        sub: "Net fuel breeding"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "SFRs use liquid sodium, which does not moderate neutrons — maintaining a fast neutron spectrum that breeds more fissile material than it consumes (conversion ratio > 1.0) and can transmute long-lived minor actinides (Americium, Curium, Neptunium) into shorter-lived fission products, significantly reducing the hazard lifetime of nuclear waste." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Equation,
                    {
                      formula: "²³⁸U + n → ²³⁹Np → ²³⁹Pu (T½ = 2.35 days each β⁻ decay)",
                      label: "Plutonium breeding from fertile U-238 via fast neutron capture"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Sodium Properties and Challenges" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "Sodium's low viscosity, high thermal conductivity, and atmospheric-pressure operation at reactor temperatures make it an excellent coolant. However, sodium reacts vigorously with water and air (2Na + 2H₂O → 2NaOH + H₂), necessitating a hermetically sealed intermediate sodium loop between the primary (radioactive) sodium and the water/steam secondary system — adding complexity and cost." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc list-inside", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pool-type (immersed internals in large sodium pool) vs. loop-type (piped external circuits) configurations" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sodium opacity complicates in-service inspection; ultrasonic techniques required" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Positive void coefficient in some designs: if sodium boils, reactivity may increase — must be managed by design" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataTable,
                    {
                      headers: ["Reactor", "Country", "Type", "Power", "Status"],
                      rows: [
                        {
                          key: "bn800",
                          cells: [
                            "BN-800",
                            "Russia",
                            "SFR (pool)",
                            "800 MWe",
                            "Operational (2016)"
                          ]
                        },
                        {
                          key: "bn600",
                          cells: [
                            "BN-600",
                            "Russia",
                            "SFR (pool)",
                            "600 MWe",
                            "Operational (1980)"
                          ]
                        },
                        {
                          key: "bn1200",
                          cells: [
                            "BN-1200",
                            "Russia",
                            "SFR (pool)",
                            "1200 MWe",
                            "Under construction"
                          ]
                        },
                        {
                          key: "ebr2",
                          cells: [
                            "EBR-II",
                            "USA",
                            "SFR (pool)",
                            "20 MWe",
                            "Shut down 1994"
                          ]
                        },
                        {
                          key: "superphenix",
                          cells: [
                            "Superphénix",
                            "France",
                            "SFR (pool)",
                            "1240 MWe",
                            "Shut down 1996"
                          ]
                        },
                        {
                          key: "cfr600",
                          cells: [
                            "CFR-600",
                            "China",
                            "SFR",
                            "600 MWe",
                            "Construction phase"
                          ]
                        }
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "1d. Lead-Cooled Fast Reactor (LFR)", id: "lfr", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Coolant Bp",
                        value: "1740 °C",
                        sub: "Lead boiling point"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Operating P",
                        value: "~1 atm",
                        sub: "Atmospheric pressure"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Neutron Spectrum",
                        value: "Fast",
                        sub: "No moderation by Pb"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                    "Lead-cooled fast reactors use molten lead or lead-bismuth eutectic (LBE, 44.5 wt% Pb / 55.5 wt% Bi) as coolant. Lead's high boiling point (1740 °C) virtually eliminates coolant boiling as an accident pathway; its high density and low neutron absorption provide natural radiation shielding; and lead does not react with air or water, removing the fire risk associated with sodium coolant.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Citation,
                      {
                        id: 7,
                        text: "Smith, C. F. et al. (2008). SSTAR: The US Lead-cooled Fast Reactor. Journal of Nuclear Materials, 376(3)."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Lead-Bismuth Eutectic (LBE) Consideration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "LBE melts at 123.5 °C (much easier to handle than pure lead at 327 °C) but generates significant Polonium-210 via ²⁰⁹Bi(n,γ)²¹⁰Bi → ²¹⁰Po (T½ = 138 days, α emitter). Po-210 is highly radiotoxic; LBE loops require careful sealing and off-gas treatment. Soviet Alpha-class submarines operated LBE-cooled reactors — providing significant operational experience and lessons on polonium management." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "BREST-OD-300 (Russia) — Landmark Project" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      "A 300 MWe lead-cooled fast reactor under construction at Seversk (Tomsk region) since 2021, forming the core of Russia's pilot demonstration of a closed nuclear fuel cycle (PRORYV project). The co-located uranium-plutonium fuel fabrication and spent fuel reprocessing facility aims to demonstrate the full closed cycle on one site by ~2030.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Citation,
                        {
                          id: 8,
                          text: "Adamov, E. O. et al. (2020). BREST-OD-300 reactor unit design development and validation. Nuclear Engineering and Design, 371."
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "1e. Supercritical Water-Cooled Reactor (SCWR)",
                    id: "scwr",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Pressure",
                            value: "~25 MPa",
                            sub: "Above 22.1 MPa critical"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Temperature",
                            value: "~625 °C",
                            sub: "Supercritical water"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { label: "Efficiency", value: "~44%", sub: "vs ~33% LWR" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "SCWRs extend the pressurized water concept beyond the thermodynamic critical point of water (374 °C, 22.1 MPa). Above this point, water exists as a single supercritical phase — no liquid-vapor phase transition, eliminating the need for steam generators or a pressurizer. The direct cycle (like a BWR) simplifies plant design considerably and raises thermal efficiency to ~44%." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Equation,
                        {
                          formula: "Critical point of H₂O: Tc = 373.95 °C, Pc = 22.064 MPa",
                          label: "Above this point, no distinction between liquid and vapor phases"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "SCWR remains in the research phase: no demonstration reactor has been built. The principal technical challenge is materials — structural alloys under supercritical water conditions experience stress corrosion cracking and radiation damage simultaneously, requiring extensive qualification testing. International research programs in Canada (CANDU-variant SCWR), Europe, Japan, and China are active." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "1f. Very High Temperature Reactor (VHTR)",
                    id: "vhtr",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Outlet Temp",
                            value: ">1000 °C",
                            sub: "Exceeds HTGR target"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Application",
                            value: "H₂ + Heat",
                            sub: "Thermochemical processes"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Basis",
                            value: "HTGR",
                            sub: "Evolved TRISO/He concept"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The VHTR is an evolution of the HTGR concept targeting outlet temperatures exceeding 1000 °C — sufficient for the thermochemical sulfur-iodine (S-I) cycle for hydrogen production at high efficiency (theoretical ~50% H₂ efficiency at 900 °C+). The S-I cycle:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Equation,
                        {
                          formula: "H₂SO₄ → SO₂ + H₂O + ½O₂  (850°C, nuclear heat)",
                          label: "Bunsen reaction + SO₂ splitting — net reaction: H₂O → H₂ + ½O₂",
                          note: "No CO₂ emissions; all reagents recycled. Nuclear heat replaces fossil fuel combustion."
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "The US NGNP (Next Generation Nuclear Plant) program at Idaho National Laboratory targeted VHTR development; funding was paused after 2011. The concept remains attractive for decarbonizing hydrogen-intensive industries (ammonia fertilizer, petroleum refining, direct iron reduction)." })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Collapsible,
            {
              title: "Small Modular Reactors (SMRs)",
              badge: "Intermediate",
              badgeVariant: "secondary",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
              id: "smr",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Small Modular Reactors are generally defined as nuclear reactors with electrical output below 300 MWe that are designed for factory fabrication, modular deployment, and simplified operation. The SMR category spans conventional light-water designs, advanced non-LWR concepts, and microreactors (<10 MWe)." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      label: "Size Threshold",
                      value: "<300 MWe",
                      sub: "IAEA SMR definition"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      label: "First NRC-Certified",
                      value: "Sep 2022",
                      sub: "NuScale VOYGR design"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      label: "Designs in Pipeline",
                      value: "70+",
                      sub: "IAEA ARIS database"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Economic Rationale and Tradeoffs",
                    id: "smr-economics",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Large reactors benefit from economies of scale — cost per kWe decreases as unit size increases. SMRs sacrifice this advantage but aim to recover economics through:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 list-disc list-inside text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Factory fabrication" }),
                          ": controlled manufacturing environment; higher quality; reproducibility; no on-site construction cost inflation"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Economies of numbers" }),
                          ": cost reduction via learning curve as many identical units are built (unlike large plants where each is unique)"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Modularity" }),
                          ": capacity added incrementally; cash flow begins before full site build-out"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Siting flexibility" }),
                          ": smaller footprint, lower seismic and flood-plain requirements; can replace retiring fossil plants on existing grid connections"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Process heat market" }),
                          ": right-sized for industrial heat customers (district heating, desalination, hydrogen) that cannot use a 1,000 MWe baseload plant"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                          "Economic Caution:",
                          " "
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                          "NuScale's UAMPS Carbon Free Power Project cost estimate rose from ~$58/MWh (2017) to ~$89/MWh (2023) before cancellation of the first 12-module order in 2023. SMR economics remain unproven at commercial scale; the first-of-a-kind premium may be substantial before learning curve effects materialize.",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Citation,
                            {
                              id: 9,
                              text: "Power Magazine. (2023). NuScale, UAMPS terminate Carbon Free Power Project agreement. November 2023."
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "NuScale VOYGR — First NRC-Certified SMR",
                    id: "nuscale",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "NuScale's VOYGR is a 77 MWe light-water SMR based on integral pressurized water reactor (iPWR) technology. The entire primary system — reactor core, pressurizer, and steam generators — is contained within a single sealed module approximately 4.6 m diameter × 23 m tall, sitting in an underground water-filled pool." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-2", children: "Safety Features" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-sm text-muted-foreground list-disc list-inside", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Natural circulation cooling: no primary pumps needed" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Passive decay heat removal: gravity-fed pool water cooling for 30+ days without operator action" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "No external AC power required for safe shutdown and cooling" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Underground pool provides structural protection and radiation shielding" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-2", children: "Key Parameters" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-sm text-muted-foreground list-disc list-inside", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "77 MWe per module; up to 12 modules per site (924 MWe total)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Operating pressure: 12.8 MPa (below standard PWR 15.5 MPa)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Coolant temperature: ~300 °C" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "60-year design lifetime; 4.95% enriched UO₂ fuel; 24-month refueling cycle" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "NRC Standard Design Approval: September 2022 (first ever for an SMR)" })
                          ] })
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "SMR Design Comparison Table", id: "smr-table", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataTable,
                    {
                      headers: [
                        "Design",
                        "Type",
                        "Power",
                        "Developer / Country",
                        "Status"
                      ],
                      rows: smrTableData
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Sources: IAEA Advanced Reactors Information System (ARIS); NRC Design Certification database; developer announcements. Status as of 2024." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "Microreactors (<10 MWe)", id: "microreactors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Microreactors extend the SMR concept to the smallest scale: 1–10 MWe factory-built, truck-transportable units for remote communities, military bases, disaster relief, and space applications." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 list-disc list-inside text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Ultra Safe Nuclear MMRP" }),
                      ": 5 MWe heat-pipe-cooled reactor; TRISO fuel; air-cooled; 10-year refueling interval; designed for 18-month factory build"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Westinghouse eVinci" }),
                      ": 5 MWe; heat pipe-cooled; 40% enriched TRISO; plug-and-play installation concept"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Project Pele (US DOD)" }),
                      ": 1–5 MWe TRISO-fueled microreactor; designed to fit in 3 standard ISO shipping containers; NEPA review completed 2023"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "Heat pipe-cooled designs are particularly attractive for microreactors: heat pipes passively transfer heat from the reactor core to a power conversion system with no pumps, no valves, and no active controls — extreme simplicity and reliability." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Collapsible,
            {
              title: "Fusion Reactors: Status and Path Forward",
              badge: "Advanced",
              badgeVariant: "destructive",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
              id: "fusion",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Controlled nuclear fusion offers the prospect of virtually unlimited energy from deuterium (from seawater) and tritium (bred from lithium). Despite decades of research, commercial fusion power remains challenging; however, major public projects (ITER, DEMO) and a surge of private investment since 2020 have substantially advanced the timeline." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "ITER and the International Program", id: "iter", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-4 gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "Fusion Power",
                        value: "500 MW",
                        sub: "Target output"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { label: "Q Factor", value: "≥10", sub: "Plasma gain ratio" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { label: "First Plasma", value: "~2027", sub: "Projected" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InfoCard,
                      {
                        label: "D-T Ops",
                        value: "~2035",
                        sub: "Full deuterium-tritium"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-3", children: [
                    "ITER (International Thermonuclear Experimental Reactor) is the world's largest tokamak, under construction at Cadarache, France. Funded by 35 nations representing 85% of world GDP, ITER will demonstrate scientific feasibility of D-T fusion at reactor scale — producing 500 MW of fusion power from 50 MW of heating input (Q = 10), but will not generate electricity.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Citation,
                      {
                        id: 10,
                        text: "ITER Organization. (2024). ITER — The World's Largest Tokamak. https://www.iter.org/proj/inafewlines"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Equation,
                    {
                      formula: "D + T → ⁴He (3.5 MeV) + n (14.1 MeV)   Q_total = 17.6 MeV",
                      label: "Deuterium-Tritium fusion reaction — primary fuel cycle for ITER and near-term devices",
                      note: "80% of energy carried by 14.1 MeV neutrons — challenges for materials and tritium breeding"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Equation,
                    {
                      formula: "⁶Li + n → ⁴He + T + 4.8 MeV   (T½ = 12.3 yr)",
                      label: "Tritium breeding from lithium-6 in the breeding blanket",
                      note: "Li-7 also contributes: ⁷Li + n → ⁴He + T + n − 2.47 MeV (threshold reaction)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "Plasma Conditions Required" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc list-inside", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Ion temperature: ~150 million °C (10× hotter than the Sun's core; solar fusion relies on quantum tunneling at lower T)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Plasma density: ~10²⁰ ions/m³" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Energy confinement time: ~3.7 s (ITER design)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Lawson criterion: n·τ_E·T ≥ 3 × 10²¹ keV·s/m³ for D-T ignition" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SubSection, { title: "DEMO and the Path to Commercial Fusion", id: "demo", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "DEMO (DEMOnstration Power Plant) is the planned successor to ITER — the first device to generate net electricity from fusion. European DEMO design targets ~2 GW fusion power, net ~300–500 MWe electricity to the grid, with construction targeted for the 2040s." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataTable,
                    {
                      headers: [
                        "Device",
                        "Country/Program",
                        "Type",
                        "Fusion Power",
                        "Milestone"
                      ],
                      rows: [
                        {
                          key: "jet",
                          cells: [
                            "JET",
                            "EU/UK",
                            "Tokamak",
                            "59.5 MJ record (2022)",
                            "Final D-T record Feb 2024 (shutdown)"
                          ]
                        },
                        {
                          key: "iter",
                          cells: [
                            "ITER",
                            "International",
                            "Tokamak",
                            "500 MW",
                            "First plasma ~2027; D-T ~2035"
                          ]
                        },
                        {
                          key: "demo-eu",
                          cells: [
                            "DEMO (EU)",
                            "EU/Euratom",
                            "Tokamak",
                            "~2000 MW",
                            "Design phase; construction ~2040s"
                          ]
                        },
                        {
                          key: "cfetr",
                          cells: [
                            "CFETR",
                            "China",
                            "Tokamak",
                            "1–1.5 GW",
                            "Construction targeted 2030s"
                          ]
                        },
                        {
                          key: "dtt",
                          cells: [
                            "DTT",
                            "Italy (ENEA)",
                            "Tokamak",
                            "Divertor test",
                            "Construction 2024"
                          ]
                        }
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
                    "JET's 2022 record of 59.5 MJ of fusion energy (sustained over 5 seconds) surpassed the previous record (21.7 MJ, 1997) by a factor of 2.8. JET's final D-T campaign in 2024 further validated ITER plasma scenarios and tritium breeding concepts.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Citation,
                      {
                        id: 11,
                        text: "EUROfusion. (2022). EUROfusion consortium boosts fusion energy record. Feb 2022 press release."
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Private Fusion Ventures (2024 Landscape)",
                    id: "private-fusion",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Since 2021, private fusion investment has exceeded $6 billion globally. Several companies have moved beyond concept stage to hardware demonstration. Approaches span tokamaks, field-reversed configurations (FRC), magnetized target fusion, inertial confinement, and mirror machines." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DataTable,
                        {
                          headers: [
                            "Company",
                            "Approach",
                            "Fuel Target",
                            "Key Milestone",
                            "Target Date"
                          ],
                          rows: [
                            {
                              key: "cfs",
                              cells: [
                                "Commonwealth Fusion (SPARC)",
                                "HTS tokamak (12 T coils)",
                                "D-T",
                                "Proof Q~2 demonstration",
                                "~2027"
                              ]
                            },
                            {
                              key: "helion",
                              cells: [
                                "Helion Energy",
                                "FRC (field-reversed)",
                                "D-He³ / D-T",
                                "Q>1; Microsoft PPA signed",
                                "2028"
                              ]
                            },
                            {
                              key: "tae",
                              cells: [
                                "TAE Technologies",
                                "Beam-driven FRC",
                                "p-¹¹B (aneutronic)",
                                "300 keV plasma achieved",
                                "Long-term"
                              ]
                            },
                            {
                              key: "firstlight",
                              cells: [
                                "First Light Fusion",
                                "Projectile ICF",
                                "D-T",
                                "Fusion confirmed 2021",
                                "Power plant TBD"
                              ]
                            },
                            {
                              key: "realta",
                              cells: [
                                "Realta Fusion",
                                "Gas dynamic mirror",
                                "D-T",
                                "University spinout 2022",
                                "Early stage"
                              ]
                            },
                            {
                              key: "type1",
                              cells: [
                                "Type One Energy",
                                "Stellarator",
                                "D-T",
                                "Acquired HSX coil dataset",
                                "2030s"
                              ]
                            }
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-4 bg-muted/30 rounded-lg text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-2", children: "High-Temperature Superconducting (HTS) Coils — The Key Enabler" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                          "Commonwealth Fusion Systems demonstrated a 20 T HTS magnet (REBCO tape) in September 2021 — the world's strongest fusion-relevant electromagnet. Since magnetic confinement scales as ~B⁴ for fusion gain, doubling the field from ~5 T (ITER) to ~12 T (SPARC) reduces the required plasma volume by ~65×, enabling a compact device small enough to fit in a large room rather than a stadium.",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Citation,
                            {
                              id: 12,
                              text: "Creely, A. J. et al. (2020). Overview of the SPARC tokamak. Journal of Plasma Physics, 86(5)."
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Fusion Materials and First Wall Challenges",
                    id: "fusion-materials",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "The 14.1 MeV neutrons from D-T fusion pose a uniquely severe materials challenge. Fission reactors produce neutrons at ~2 MeV; fusion neutrons carry 7× more energy — causing substantially greater displacement damage and helium bubble formation in structural materials." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Equation,
                        {
                          formula: "dpa ∝ Φ × σ_displacement  [displacements per atom]",
                          label: "Radiation damage metric; fusion first wall may experience 10–20 dpa/year",
                          note: "ITER first wall: ~3.5 × 10¹⁷ n/cm²/s neutron flux at 14.1 MeV"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 list-disc list-inside text-sm text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Tungsten divertor" }),
                          ": handles 10–20 MW/m² steady-state heat flux in ITER; highest melting point of any metal (3422 °C); low sputtering yield; but brittle at low temperatures"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Reduced activation ferritic-martensitic steels (RAFM)" }),
                          ": structural material for blanket; designed to minimize long-lived activation products (W, Mo, Nb excluded)"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Silicon carbide composites (SiCf/SiC)" }),
                          ": advanced structural candidate; low activation; operates to 1000 °C; joining technology still maturing"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "IFMIF-DONES" }),
                          ": the International Fusion Materials Irradiation Facility (under construction in Spain) will use d+Li reactions to produce intense 14 MeV neutron flux for accelerated materials qualification"
                        ] })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Collapsible,
            {
              title: "Space Nuclear Power Systems",
              badge: "Intermediate",
              badgeVariant: "secondary",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-5 w-5" }),
              id: "space",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Nuclear power enables missions far beyond the reach of solar panels — from the outer planets to lunar and Martian surface bases. Two distinct technologies serve different power and mission profiles: Radioisotope Thermoelectric Generators (RTGs) for deep space; fission surface power for bases and high-power missions." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Radioisotope Thermoelectric Generators (RTGs)",
                    id: "rtg",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { label: "Isotope", value: "Pu-238", sub: "T½ = 87.7 years" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Power Density",
                            value: "~0.54 W/g",
                            sub: "Thermal heat output"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "RTG Efficiency",
                            value: "~6–8%",
                            sub: "Thermoelectric conversion"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-3", children: [
                        "RTGs convert the steady heat from radioactive decay directly to electricity via thermoelectric effect — no moving parts, no maintenance, decades of reliable operation. Plutonium-238 is the preferred isotope: alpha emitter (minimal radiation shielding needed), 87.7-year half-life (graceful power decline over mission life), ~0.54 W/g specific thermal power.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Citation,
                          {
                            id: 13,
                            text: "NASA. (2021). Multi-Mission Radioisotope Thermoelectric Generator (MMRTG). NASA Fact Sheet."
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Equation,
                        {
                          formula: "²³⁸Pu → ²³⁴U + ⁴He + 5.593 MeV  (T½ = 87.7 yr, α)",
                          label: "Pu-238 decay — heat source for RTG; ~0.39 W/g at 2024 (declining since launch)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DataTable,
                        {
                          headers: [
                            "Mission",
                            "RTG Type",
                            "Launch",
                            "Power at Launch",
                            "Mission"
                          ],
                          rows: [
                            {
                              key: "voyager1",
                              cells: [
                                "Voyager 1",
                                "MHW-RTG (×3)",
                                "1977",
                                "~470 W",
                                "Interstellar space (1.6×10¹³ km)"
                              ]
                            },
                            {
                              key: "voyager2",
                              cells: [
                                "Voyager 2",
                                "MHW-RTG (×3)",
                                "1977",
                                "~470 W",
                                "Interstellar space (outer heliosphere)"
                              ]
                            },
                            {
                              key: "cassini",
                              cells: [
                                "Cassini",
                                "GPHS-RTG (×3)",
                                "1997",
                                "~882 W",
                                "Saturn system; ended 2017"
                              ]
                            },
                            {
                              key: "newhorizons",
                              cells: [
                                "New Horizons",
                                "GPHS-RTG (×1)",
                                "2006",
                                "~245 W",
                                "Pluto flyby 2015; Kuiper Belt"
                              ]
                            },
                            {
                              key: "curiosity",
                              cells: [
                                "Curiosity (MSL)",
                                "MMRTG (×1)",
                                "2011",
                                "~110 W",
                                "Mars surface — operating"
                              ]
                            },
                            {
                              key: "perseverance",
                              cells: [
                                "Perseverance (Mars 2020)",
                                "MMRTG (×1)",
                                "2020",
                                "~110 W",
                                "Mars surface — operating"
                              ]
                            }
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "The MMRTG (Multi-Mission RTG) produces ~110 We from ~2000 Wth using 4.8 kg of Pu-238 encapsulated in iridium-clad PuO₂ pellets within a graphite impact shell — designed to survive launch accidents and reentry without Pu dispersal." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Fission Surface Power: KRUSTY / Kilopower",
                    id: "kilopower",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Power Range",
                            value: "1–10 kWe",
                            sub: "Kilopower target"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { label: "Fuel", value: "U-Mo", sub: "~93% enriched HEU" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          InfoCard,
                          {
                            label: "Demonstrated",
                            value: "2018",
                            sub: "KRUSTY test, Nevada"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-3", children: [
                        "The Kilopower project (NASA/DOE) demonstrated a compact fission surface power system in 2018 (Kilopower Reactor Using Stirling Technology — KRUSTY). The system uses a small uranium-molybdenum metal reactor core cooled by sodium heat pipes, driving free-piston Stirling cycle converters — elegant in its simplicity: no pumps, minimal moving parts.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Citation,
                          {
                            id: 14,
                            text: "Gibson, M. A. et al. (2018). NASA's Kilopower Reactor Development and the Path to Higher Power Missions. Proceedings of Nuclear and Emerging Technologies for Space (NETS-2018)."
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 list-disc list-inside text-sm text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "KRUSTY test (2018)" }),
                          ": operated for 28 hours at full power; verified all safety, control, and shutdown systems; matched simulation predictions"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Passive safety" }),
                          ": negative temperature coefficient; reactor self-limits power if temperature rises — no operator action required for safe shutdown"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Scaling" }),
                          ": 1 kWe unit demonstrated; 10 kWe lunar surface power unit design developed (KPLO-scale)"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Lunar/Mars application" }),
                          ": four 10 kWe units provide 40 kWe — equivalent to continuous power for a 4–6 person surface habitat plus ISRU oxygen production"
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Nuclear Electric and Pulse Propulsion Concepts",
                    id: "nuclear-propulsion",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "For human interplanetary travel, chemical propulsion (Isp ~450 s) requires transit times of 6–9 months to Mars. Nuclear propulsion dramatically reduces this:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DataTable,
                        {
                          headers: ["System", "Isp (s)", "Thrust", "TRL", "Mars Transit"],
                          rows: [
                            {
                              key: "chem",
                              cells: [
                                "Chemical (LOX/LH₂)",
                                "~450",
                                "High",
                                "9",
                                "~6–9 months"
                              ]
                            },
                            {
                              key: "ntp",
                              cells: [
                                "Nuclear Thermal (NERVA-class)",
                                "~900",
                                "High",
                                "6",
                                "~4–5 months"
                              ]
                            },
                            {
                              key: "nep",
                              cells: [
                                "Nuclear Electric (NEP, ion)",
                                "3,000–10,000",
                                "Low",
                                "4–5",
                                "~6–9 months (continuous)"
                              ]
                            },
                            {
                              key: "orion",
                              cells: [
                                "Nuclear Pulse (Orion)",
                                ">10,000",
                                "Very High",
                                "1–2 (theory)",
                                "<90 days (theoretical)"
                              ]
                            }
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Nuclear thermal propulsion (NTP) heats hydrogen propellant in a fission reactor and expels it through a nozzle — doubling specific impulse vs. chemical rockets. NERVA (Nuclear Engine for Rocket Vehicle Application) tested in the US 1960s–70s; NASA and DARPA's DRACO program (2023) aims to demonstrate NTP by 2027. Nuclear pulse propulsion (Project Orion, 1958) was theoretically the most powerful but was never developed due to the Partial Nuclear Test Ban Treaty (1963)." })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Collapsible,
            {
              title: "Thorium Fuel Cycle",
              badge: "Intermediate",
              badgeVariant: "secondary",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-5 w-5" }),
              id: "thorium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Thorium is approximately 3× more abundant than uranium in Earth's crust, occurring mainly as monazite sand. Thorium-232 is entirely fertile (not directly fissile) but converts to fissile U-233 in a reactor — offering a distinct fuel cycle with both advantages and challenges compared to the uranium-plutonium cycle." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      label: "Crustal Abundance",
                      value: "~10 ppm",
                      sub: "vs ~3 ppm for uranium"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      label: "U-233 Fission σ",
                      value: "530 barns",
                      sub: "At 0.025 eV thermal"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      label: "U-233 η value",
                      value: "2.29",
                      sub: "Neutrons / absorption"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "The Thorium-232 → Uranium-233 Conversion Chain",
                    id: "th-cycle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Equation,
                        {
                          formula: "²³²Th + n → ²³³Th →(β⁻, 22.3 min)→ ²³³Pa →(β⁻, 26.97 d)→ ²³³U",
                          label: "Neutron capture on Th-232 initiates two-step beta decay chain to fissile U-233",
                          note: "Pa-233 T½ = 26.97 days: in-reactor, Pa-233 may capture another neutron (→ Pa-234 → U-234, non-fissile) — requires pa separation in MSR or 233Pa protactinium extraction"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "The relatively long half-life of Pa-233 creates a unique challenge: if Pa-233 remains in a high-flux reactor core, it parasitically captures neutrons before decaying to U-233. This reduces breeding efficiency. MSRs address this by continuously extracting Pa-233 into a low-flux region to decay to U-233 undisturbed." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-2", children: "Why U-233 is Attractive" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-sm text-muted-foreground list-disc list-inside", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "η = 2.29 at thermal energies (vs U-235: 2.07, Pu-239: 2.10)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Higher conversion ratio in thermal spectrum — enables sustained breeding in LWR-like conditions" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Fewer higher actinides produced (less long-lived waste) compared to Pu cycle" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Thorium cycle produces essentially no Pu-239 — altered weapons material concern" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mb-2", children: "U-232 Contamination and Proliferation" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-sm text-muted-foreground list-disc list-inside", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "U-233 is always contaminated with U-232 (T½ = 68.9 yr) via ²³³Pa(n,2n) and other reactions" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "U-232 decay chain produces Tl-208 emitting 2.614 MeV γ-rays — highly penetrating, detectable" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "U-233/U-232 mixture is difficult to handle safely without heavy shielding" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not proliferation-proof: sufficient U-233 purity is theoretically weaponizable; declared non-weapon-state use requires IAEA safeguards" })
                          ] })
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "Historical Experience with Thorium",
                    id: "th-history",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DataTable,
                        {
                          headers: ["Program", "Country", "Period", "Type", "Th Role"],
                          rows: [
                            {
                              key: "shippingport",
                              cells: [
                                "Shippingport PWR",
                                "USA",
                                "1977–1982",
                                "LWR (seed-blanket)",
                                "Th-U233 breeding blanket; achieved conversion ratio ~1.01"
                              ]
                            },
                            {
                              key: "msre",
                              cells: [
                                "MSRE (ORNL)",
                                "USA",
                                "1968–1969",
                                "MSR",
                                "U-233 from Th cycle used as fuel for first time ever"
                              ]
                            },
                            {
                              key: "india-phwr",
                              cells: [
                                "Indian PHWR fleet",
                                "India",
                                "1990s–present",
                                "PHWR (CANDU-type)",
                                "Th-232 blankets; minor fraction; Stage 2 of 3-stage plan"
                              ]
                            },
                            {
                              key: "ga-htgr",
                              cells: [
                                "HTGR programs (GA)",
                                "USA",
                                "1960s–70s",
                                "HTGR (Fort St. Vrain)",
                                "ThO₂/UO₂ mixed fuel; demonstrated Th-U cycle in TRISO"
                              ]
                            },
                            {
                              key: "dragon",
                              cells: [
                                "Dragon Reactor (UK)",
                                "UK",
                                "1965–1976",
                                "HTGR",
                                "Th fuel testing; international project"
                              ]
                            }
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
                        "The Shippingport reactor's final core configuration (Light Water Breeder Reactor) achieved a conversion ratio of 1.013 — demonstrating net breeding in a light-water reactor on the thorium cycle, a feat that was not widely publicized and remains the only commercial-scale thermal breeder demonstration.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Citation,
                          {
                            id: 15,
                            text: "Edlund, M. C. (1985). Physics of the uranium-thorium fuel cycle in the light water breeder reactor. Transactions of the American Nuclear Society, 49."
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SubSection,
                  {
                    title: "India's Three-Stage Nuclear Program",
                    id: "india-thorium",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-3", children: [
                        "India has the world's largest thorium reserves (~846,000 tonnes), motivating a long-term three-stage fuel cycle strategy explicitly designed to transition to thorium-based energy independence.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Citation,
                          {
                            id: 16,
                            text: "Sinha, R. K. & Kakodkar, A. (2006). Design and development of the AHWR—The Indian thorium fuelled innovative nuclear reactor. Nuclear Engineering and Design, 236(7–8)."
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-4 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Stage 1: Pressurized Heavy Water Reactors (PHWRs)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Use natural uranium fuel to produce Pu-239. Currently 22 PHWRs operational (3.9 GWe). Spent fuel Pu-239 feeds Stage 2. Some Th blankets tested." })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-4 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Stage 2: Fast Breeder Reactors (FBRs)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Prototype Fast Breeder Reactor (PFBR, 500 MWe) at Kalpakkam — approaching commercial operation (delayed, originally targeted 2022). Uses Pu from Stage 1 with U-238 and Th-232 blankets to breed both Pu-239 and U-233. U-233 stockpile feeds Stage 3." })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-lg p-4 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground mb-1", children: "Stage 3: Advanced Heavy Water Reactors (AHWR)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "AHWR-300 design: 300 MWe; Th-U233 fuel with self-sustaining thorium cycle; heavy water moderated, boiling light water cooled. Designed for passive safety (gravity-fed core cooling, no operator action for 72 hours). Design complete; awaiting construction decision." })
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SubSection,
                  {
                    title: "Challenges for Thorium Deployment",
                    id: "th-challenges",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 list-disc list-inside text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "U-233 not commercially available" }),
                        ": the US Th-program produced ~2 tonnes of U-233 (stored at Oak Ridge); no commercial supply chain exists for new programs"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Pa-233 management" }),
                        ": protactinium extraction/separation requires chemical processing plant co-located with reactor for efficient breeding — significant complexity"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Regulatory framework" }),
                        ": U-233 fuel qualification, thorium fuel fabrication standards, and waste classification rules require new development in all major regulatory jurisdictions"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Startup fissile requirement" }),
                        ': thorium cycle requires a fissile "starter" charge (HEU, U-235, or Pu-239) until U-233 inventory builds up — transition period of years to decades'
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Waste characterization" }),
                        ": Th-232 activation produces Th-228 (T½ = 1.9 yr) and Ra-228 in spent fuel — different waste stream from uranium cycle; requires separate long-term waste handling assessment"
                      ] })
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 border-t border-border pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "References" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-2 text-sm text-muted-foreground list-decimal list-inside", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "GIF Technology Roadmap 2002. Generation IV International Forum.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://www.gen-4.org",
                    className: "text-primary hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "gen-4.org"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "NRC. NuScale Standard Design Approval (2022).",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://www.nrc.gov",
                    className: "text-primary hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "nrc.gov"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Grover, R. B. (2017). TRISO fuel particle design. Nuclear Engineering and Design, 360." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Zhang, Z. et al. (2021). HTR-PM demonstration plant description. Nuclear Engineering and Design, 239." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Haubenreich, P. N. & Engel, J. R. (1970). MSRE experience. Nuclear Applications and Technology, 8(2)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "MacPherson, H. G. (1985). The Molten Salt Reactor Adventure. Nuclear Science and Engineering, 90(4)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Smith, C. F. et al. (2008). SSTAR: US Lead-cooled Fast Reactor. J. Nuclear Materials, 376(3)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Adamov, E. O. et al. (2020). BREST-OD-300 design validation. Nuclear Engineering and Design, 371." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Power Magazine. (Nov 2023). NuScale/UAMPS CFPP project cancellation." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "ITER Organization. (2024). ITER — The World's Largest Tokamak.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://www.iter.org",
                    className: "text-primary hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "iter.org"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "EUROfusion. (2022). Fusion energy world record Feb 2022.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://euro-fusion.org",
                    className: "text-primary hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "euro-fusion.org"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Creely, A. J. et al. (2020). Overview of the SPARC tokamak. J. Plasma Physics, 86(5)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "NASA. (2021). MMRTG Fact Sheet.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://rps.nasa.gov",
                    className: "text-primary hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "rps.nasa.gov"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Gibson, M. A. et al. (2018). Kilopower Reactor Development. NETS-2018 Proceedings." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Edlund, M. C. (1985). Physics of the Th-U cycle in LWBR. Trans. ANS, 49." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sinha, R. K. & Kakodkar, A. (2006). AHWR design and development. Nuclear Engineering and Design, 236(7–8)." })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  AdvancedReactors as default
};
