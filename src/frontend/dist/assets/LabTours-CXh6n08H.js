import { w as createLucideIcon, j as jsxRuntimeExports, m as motion, k as Badge, P as PageHeader, Z as Zap, F as FlaskConical, M as Microscope, x as BookOpen, o as TriangleAlert, G as Globe, r as reactExports, N as ExternalLink, B as Button } from "./index-DWzjlv-D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
];
const Radio = createLucideIcon("radio", __iconNode);
const TOURS = [
  {
    id: "cern-lhc",
    name: "CERN LHC Tunnel",
    location: "Geneva, Switzerland / France",
    facilityType: "Particle Accelerator",
    facilityTypeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
    description: "Home of the Large Hadron Collider — a 27 km underground ring where protons collide at 99.9999991% of the speed of light. The world's most powerful particle accelerator, enabling discovery of the Higgs boson in 2012.",
    embedType: "sketchfab",
    embedSrc: "https://sketchfab.com/models/e267b7c7cdd040a99c8a1ad9f0c7ed34/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0",
    externalLink: "https://visit.cern/",
    stats: [
      { label: "Circumference", value: "27 km" },
      { label: "Depth", value: "50–175 m" },
      { label: "Year Built", value: "1998–2008" },
      { label: "Peak Energy", value: "13.6 TeV" }
    ],
    facts: [
      "Accelerates protons to 99.9999991% the speed of light",
      "Operates at −271.3°C, colder than outer space",
      "Contains 9,600 superconducting magnets",
      "Led to discovery of the Higgs boson in July 2012"
    ],
    researchFocus: "Fundamental particle physics — studying the building blocks of matter and the forces that govern the universe at the smallest scales."
  },
  {
    id: "iter-tokamak",
    name: "ITER Tokamak Assembly",
    location: "Saint-Paul-lès-Durance, France",
    facilityType: "Fusion Reactor",
    facilityTypeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-5 w-5" }),
    description: "The world's largest experimental fusion reactor under construction, designed to demonstrate that fusion power can produce 10× more energy than it consumes. A global collaboration of 35 nations aiming to deliver 500 MW from 50 MW input.",
    embedType: "youtube",
    embedSrc: "https://www.youtube.com/embed/9T1DikXVbIg?rel=0&modestbranding=1",
    externalLink: "https://www.iter.org/",
    stats: [
      { label: "Plasma Volume", value: "840 m³" },
      { label: "Expected Output", value: "500 MW" },
      { label: "First Plasma", value: "2025 (est.)" },
      { label: "Nations Involved", value: "35" }
    ],
    facts: [
      "Will heat plasma to 150 million °C — 10× hotter than the Sun's core",
      "Central solenoid magnet generates a 13-tesla field",
      "Q=10 fusion gain ratio target — 10× energy out vs. in",
      "Largest superconducting magnet system ever built"
    ],
    researchFocus: "Demonstrating net-energy-gain fusion at scale — the critical step toward commercial fusion power plants that could provide virtually unlimited clean energy."
  },
  {
    id: "nif-laser",
    name: "National Ignition Facility (NIF)",
    location: "Livermore, California, USA",
    facilityType: "Laser Fusion",
    facilityTypeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
    description: "Lawrence Livermore National Laboratory's laser fusion facility — the world's largest and most energetic laser system. In December 2022, NIF achieved the first-ever fusion ignition, producing more fusion energy than the laser energy delivered to the target.",
    embedType: "youtube",
    embedSrc: "https://www.youtube.com/embed/bQ4kfMIFWx4?rel=0&modestbranding=1",
    externalLink: "https://lasers.llnl.gov/",
    stats: [
      { label: "Laser Beams", value: "192" },
      { label: "Target Chamber", value: "10 m diameter" },
      { label: "Peak Power", value: "500 TW" },
      { label: "Ignition Year", value: "2022" }
    ],
    facts: [
      "192 laser beams deliver 2.05 MJ to a 2mm fuel capsule",
      "Achieved ignition in Dec 2022 — a 60-year scientific goal",
      "Target implosion reaches 100 million °C in nanoseconds",
      "Also used for stockpile stewardship and astrophysics research"
    ],
    researchFocus: "Inertial confinement fusion (ICF) — studying the physics of nuclear weapons without underground testing, and developing laser-driven fusion energy."
  },
  {
    id: "berkeley-cyclotron",
    name: "Lawrence Berkeley 88-Inch Cyclotron",
    location: "Berkeley, California, USA",
    facilityType: "Cyclotron",
    facilityTypeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-5 w-5" }),
    description: "Lawrence Berkeley National Laboratory's 88-Inch Cyclotron — one of the world's oldest particle accelerators still in active operation. A pioneering facility for nuclear science, isotope production, and heavy-ion physics since 1961.",
    embedType: "placeholder",
    embedSrc: "",
    externalLink: "https://cyclotron.lbl.gov/",
    stats: [
      { label: "Magnet Diameter", value: "88 inches" },
      { label: "Year Built", value: "1961" },
      { label: "Beam Energy", value: "up to 32 MeV/A" },
      { label: "Location", value: "LBNL, Berkeley" }
    ],
    facts: [
      "Discovered 16+ new elements and hundreds of isotopes over 60 years",
      "One of few cyclotrons still producing superheavy element beams",
      "Used to test electronics for space missions (radiation hardness)",
      "Key facility for nuclear astrophysics reaction rate measurements"
    ],
    researchFocus: "Nuclear structure, heavy-ion collisions, superheavy element synthesis, isotope production for medicine and materials research, and radiation effects in electronics."
  },
  {
    id: "jet-tokamak",
    name: "JET Tokamak (EUROfusion)",
    location: "Culham, Oxfordshire, UK",
    facilityType: "Fusion Reactor",
    facilityTypeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-5 w-5" }),
    description: "The Joint European Torus at Culham Centre for Fusion Energy — the world's largest operational tokamak until its retirement in 2023. JET held the world record for fusion energy output (59 megajoules in February 2022) and was a key proving ground for ITER design choices.",
    embedType: "youtube",
    embedSrc: "https://www.youtube.com/embed/TlKGCp8tEUk?rel=0&modestbranding=1",
    externalLink: "https://euro-fusion.org/devices/jet/",
    stats: [
      { label: "Plasma Volume", value: "100 m³" },
      { label: "Record Output", value: "59 MJ (2022)" },
      { label: "Year Built", value: "1973–1983" },
      { label: "Plasma Temp.", value: "100 million °C" }
    ],
    facts: [
      "Set world fusion energy record of 59 MJ in February 2022",
      "First machine to use DT (deuterium-tritium) fuel at scale",
      "Operated for 40 years — longest-running major tokamak",
      "Results directly validated physics models used in ITER design"
    ],
    researchFocus: "Magnetic confinement fusion — validating plasma physics models, DT fuel performance, and materials testing under fusion-neutron bombardment for ITER and future fusion power plants."
  },
  {
    id: "slac-linac",
    name: "SLAC National Accelerator Laboratory",
    location: "Menlo Park, California, USA",
    facilityType: "Linear Accelerator",
    facilityTypeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "h-5 w-5" }),
    description: "Stanford Linear Accelerator Center's 3.2 km linear accelerator — the longest linac in the world. Originally built to accelerate electrons for particle physics, it now drives the Linac Coherent Light Source (LCLS), the world's first and most powerful X-ray free-electron laser.",
    embedType: "placeholder",
    embedSrc: "",
    externalLink: "https://www6.slac.stanford.edu/",
    stats: [
      { label: "Length", value: "3.2 km" },
      { label: "Year Built", value: "1962–1966" },
      { label: "LCLS Photon Energy", value: "0.25–25 keV" },
      { label: "Pulse Duration", value: "< 1 femtosecond" }
    ],
    facts: [
      "World's longest linear accelerator at 3.2 km",
      "LCLS X-ray laser takes 'molecular movies' of chemical reactions",
      "Enabled 3 Nobel Prizes in Physics through particle experiments",
      "Reveals protein and virus structures at atomic resolution"
    ],
    researchFocus: "Structural biology, materials science, ultrafast chemistry, and astrophysics via X-ray free-electron laser pulses of unprecedented brightness and brevity."
  }
];
const FACILITY_CONTEXT = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5 text-blue-400" }),
    title: "Particle Accelerators",
    body: "Machines like CERN's LHC and SLAC's linac use electromagnetic fields to accelerate charged particles to near-light speeds. Collisions recreate conditions of the early universe, revealing the fundamental particles and forces that govern all matter — from quarks to the Higgs boson."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-5 w-5 text-orange-400" }),
    title: "Tokamak Fusion Reactors",
    body: "Tokamaks like ITER and JET use powerful magnetic fields to confine a plasma of hydrogen isotopes at temperatures exceeding 100 million °C — hotter than the Sun's core — to drive fusion reactions. Success would provide a near-limitless, low-carbon energy source."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-5 w-5 text-green-400" }),
    title: "Cyclotrons & Isotope Production",
    body: "Cyclotrons like Berkeley's 88-Inch accelerate ions in a spiral path using alternating electric fields. They produce rare isotopes used in nuclear medicine (PET scans), test radiation effects in electronics destined for space, and probe nuclear structure at the femtometer scale."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5 text-purple-400" }),
    title: "Global Research Collaboration",
    body: "Major nuclear and particle physics facilities are cooperative international endeavors. CERN has 23 member states; ITER involves 35 nations representing over half of humanity. This reflects both the enormous scale and cost of frontier research and the universal nature of fundamental science."
  }
];
function EmbedFrame({ tour }) {
  const [failed, setFailed] = reactExports.useState(false);
  if (tour.embedType === "placeholder" || failed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-56 bg-muted/30 rounded-lg border border-border/50 gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-7 w-7 text-primary/70" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Interactive 3D Tour" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "Visit the official site for immersive 360° tours and interactive models of this facility." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => window.open(tour.externalLink, "_blank", "noopener,noreferrer"),
          className: "gap-2 text-xs",
          "data-ocid": `${tour.id}.view_external_link`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
            "Open Official Virtual Tour"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative w-full overflow-hidden rounded-lg",
      style: { paddingBottom: "56.25%" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          className: "absolute inset-0 h-full w-full border-0 rounded-lg",
          src: tour.embedSrc,
          title: `${tour.name} virtual tour`,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; xr-spatial-tracking",
          allowFullScreen: true,
          loading: "lazy",
          onError: () => setFailed(true)
        }
      )
    }
  );
}
function TourCardComponent({
  tour,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        duration: 0.45,
        delay: index % 2 * 0.12,
        ease: "easeOut"
      },
      className: "flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300",
      "data-ocid": `lab-tours.tour.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbedFrame, { tour }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 border border-primary/20 text-primary", children: tour.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground leading-tight truncate", children: tour.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: tour.location })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs flex-shrink-0 border ${tour.facilityTypeColor}`,
                children: tour.facilityType
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: tour.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: tour.stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-md bg-muted/40 border border-border/40 px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-mono", children: stat.value })
              ]
            },
            stat.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setExpanded((p) => !p),
                className: "flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors glow-focus rounded px-1",
                "data-ocid": `${tour.id}.facts_toggle`,
                "aria-expanded": expanded,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
                  expanded ? "Hide" : "Show",
                  " Key Facts"
                ]
              }
            ),
            expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.ul,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.2 },
                className: "mt-2 space-y-1.5",
                children: tour.facts.map((fact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-xs text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" }),
                      fact
                    ]
                  },
                  fact
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto rounded-md bg-primary/5 border border-primary/15 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1", children: "Research Focus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: tour.researchFocus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: tour.externalLink,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors glow-focus rounded",
              "data-ocid": `${tour.id}.learn_more_link`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                "Learn More at",
                " ",
                new URL(tour.externalLink).hostname.replace("www.", "")
              ]
            }
          )
        ] })
      ]
    }
  );
}
function LabTours() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden border-b border-border/50",
        style: {
          background: "linear-gradient(135deg, oklch(0.12 0.04 260) 0%, oklch(0.08 0.02 240) 100%)"
        },
        "data-ocid": "lab-tours.hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-20",
              style: {
                backgroundImage: "url(/assets/generated/lab-tours-hero.dim_1200x400.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              "aria-hidden": "true",
              children: [...Array(20)].map((_, particleIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute h-1 w-1 rounded-full bg-primary/40",
                  style: {
                    left: `${particleIdx * 5.3 % 100}%`,
                    top: `${particleIdx * 7.1 % 100}%`
                  },
                  animate: {
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.8, 1]
                  },
                  transition: {
                    duration: 2.5 + particleIdx % 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: particleIdx * 0.18
                  }
                },
                `particle-${particleIdx}`
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55, ease: "easeOut" },
              className: "max-w-3xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "bg-primary/10 border-primary/30 text-primary text-xs",
                      children: "Interactive"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "bg-muted/50 border-border text-muted-foreground text-xs",
                      children: "6 Facilities"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PageHeader,
                  {
                    title: "Virtual Laboratory Tours",
                    subtitle: "Step inside the world's most advanced nuclear science and particle physics facilities. Explore 360° tours, cinematic fly-throughs, and interactive models of the machines pushing the frontiers of human knowledge.",
                    audienceLevel: "beginner"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-2", children: [
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
                    label: "Particle Accelerators"
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3.5 w-3.5" }),
                    label: "Fusion Reactors"
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-3.5 w-3.5" }),
                    label: "Cyclotrons"
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "h-3.5 w-3.5" }),
                    label: "Linear Accelerators"
                  }
                ].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5 rounded-full bg-muted/60 border border-border/60 px-3 py-1 text-xs text-muted-foreground",
                    children: [
                      tag.icon,
                      tag.label
                    ]
                  },
                  tag.label
                )) })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-b border-border/40",
        "data-ocid": "lab-tours.context_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.45 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
                "About These Facilities"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: FACILITY_CONTEXT.map((ctx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.08 },
                  className: "rounded-lg bg-card border border-border/50 p-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      ctx.icon,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: ctx.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: ctx.body })
                  ]
                },
                ctx.title
              )) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "container mx-auto px-4 py-12",
        "data-ocid": "lab-tours.tours_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Explore Facilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground rounded-md bg-muted/40 border border-border/40 px-3 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-400" }),
              "All content from public educational sources"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ul",
            {
              className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
              "aria-label": "Virtual laboratory tours",
              children: TOURS.map((tour, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TourCardComponent, { tour, index: i }) }, tour.id))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Educational Sources" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "All embedded tours and videos are sourced from official facility channels (CERN, ITER Organization, Lawrence Livermore National Laboratory, EUROfusion, SLAC National Accelerator Laboratory) and are provided for educational purposes under their respective open-access or public communications policies. 3D models via Sketchfab are shared under Creative Commons licenses where applicable." })
      ] })
    ] }) }) })
  ] });
}
export {
  LabTours as default
};
