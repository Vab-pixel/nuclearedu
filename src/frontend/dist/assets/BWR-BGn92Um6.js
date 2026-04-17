import { r as reactExports, j as jsxRuntimeExports, a as ChevronDown, C as ChevronRight } from "./index-DHpNeWFA.js";
import { P as PageHeader, A as AudienceBadge } from "./PageHeader-DjzxfwqO.js";
import { S as SafetyCallout } from "./SafetyCallout-Cih1vXnJ.js";
import { S as SectionCard } from "./SectionCard-Dum9xY4U.js";
const systems = [
  {
    name: "Reactor Pressure Vessel",
    description: "Larger-diameter vessel than a comparable PWR, accommodating the steam separators and dryers above the core. Operates at ~70 bar — roughly half the pressure of a PWR — reducing material demands but increasing vessel diameter."
  },
  {
    name: "Fuel Assemblies",
    description: "UO₂ pellets in Zircaloy cladding; 8×8, 9×9, or 10×10 rod arrays enclosed in a zircaloy channel box. A typical BWR core holds ~750 assemblies at ~4 m active length. Lower average enrichment (~3–4% U-235) than PWR due to direct boiling."
  },
  {
    name: "Control Rods (Cruciform, Bottom Entry)",
    description: "Blade-shaped rods with cruciform cross-section, inserted from BELOW the core. Driven hydraulically by Fine Motion Control Rod Drives (FMCRDs) — scram is achieved by high-pressure water injection, not gravity fall."
  },
  {
    name: "Recirculation System",
    description: "Two external recirculation pumps and 20 internal jet pumps drive core flow. No moving parts inside the reactor vessel for the jet pumps — driven by high-pressure motive flow from external pumps. Recirculation flow rate is the primary power-control mechanism."
  },
  {
    name: "Steam Separators and Dryers",
    description: "Mounted above the core inside the reactor vessel. Cyclone steam separators remove ~90% of entrained water; the steam then passes through chevron-type dryers before exiting. Steam quality at the dryer exit is >99.9%."
  },
  {
    name: "Direct Steam Turbine (Single Loop)",
    description: "Steam generated in the core goes directly to the turbine — no separate steam generators. Simplifies the design but makes the turbine building mildly radioactive (primarily ¹⁶N with a 7.1-second half-life); personnel entry requires short post-shutdown delay."
  },
  {
    name: "Containment (Mark I/II/III)",
    description: "Three principal GE containment designs, each with a pressure suppression pool (wetwell) to condense steam blowdown. Mark I uses a torus suppression pool; Mark II integrates it below the drywell; Mark III uses a large free-volume outer building."
  }
];
const safetyFeatures = [
  {
    feature: "Void coefficient (strongly negative)",
    description: "As power rises, more boiling increases void fraction → less moderation → lower k_eff. One of the strongest self-regulating feedback mechanisms in any commercial reactor."
  },
  {
    feature: "Recirculation flow control",
    description: "Adjusting recirculation pump speed changes coolant flow, void profile, and therefore power — continuously and smoothly, without any control rod movement."
  },
  {
    feature: "Bottom-entry control rods with FMCRD",
    description: "Fine Motion Control Rod Drives allow millimeter-precision rod positioning and rapid hydraulic scram; no dependence on gravity for rod insertion."
  },
  {
    feature: "RCIC — steam-driven isolation cooling",
    description: "Reactor Core Isolation Cooling uses a steam-turbine-driven pump requiring no AC power; can maintain water level during a station blackout for hours."
  }
];
function CollapsibleSection({
  id,
  title,
  badge,
  open,
  onToggle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": title, "data-ocid": `bwr.${id}_section`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onToggle,
        "aria-expanded": open,
        className: "w-full flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "data-ocid": `bwr.${id}_toggle`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold text-foreground", children: title }),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: badge })
          ] }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-4", "data-ocid": `bwr.${id}_content`, children })
  ] });
}
function TableBlock({
  caption,
  headers,
  rows,
  source
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "aria-label": caption, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: headers.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-2 text-left font-semibold text-foreground",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-muted-foreground", children: row.map((cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          className: `px-4 py-2 ${ci === 0 ? "" : "font-mono text-foreground"}`,
          children: cell
        },
        `${String(row[0])}-${ci}`
      )) }, String(row[0]))) })
    ] }),
    source && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-2 text-xs text-muted-foreground italic border-t border-border/50", children: source })
  ] });
}
function BWRPage() {
  const [open, setOpen] = reactExports.useState({
    coreCoolant: false,
    reactivityControl: false,
    containment: false,
    eccs: false,
    globalFleet: false
  });
  function toggle(key) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Boiling Water Reactor",
        subtitle: "The second most common commercial reactor design globally — generating steam directly inside the reactor core, eliminating the need for separate steam generators.",
        audienceLevel: "advanced",
        readTimeMin: 20
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "bwr.overview_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "How a BWR Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "A Boiling Water Reactor allows water to boil",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "directly inside the reactor core" }),
          ". Unlike the Pressurized Water Reactor, there is no secondary loop: steam generated at ~285°C and ~70 bar travels straight to the turbine, drives it, and is condensed and pumped back to the reactor vessel. This",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "direct cycle" }),
          " eliminates the large steam generators of a PWR but means the turbine building is mildly radioactive — primarily from ¹⁶N (T½ = 7.1 s) produced by neutron activation of oxygen in the coolant."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "BWRs were pioneered by General Electric. The first commercial unit, Dresden-1, began operation in 1960 in Illinois. Today approximately 70 BWRs operate worldwide — roughly 18% of the global commercial fleet — concentrated in the United States, Japan, Sweden, Switzerland, and Taiwan. [IAEA PRIS, 2024]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "The lower operating pressure (~70 bar vs. ~155 bar for a PWR) reduces vessel wall requirements, but the reactor vessel is physically larger to accommodate the steam separators and dryers that must sit above the core before steam exits. Thermal efficiency is ~32–34%, slightly below the PWR's ~33–35%, partly because the lower steam pressure limits turbine thermodynamic performance." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "bwr.parameters_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Typical Operating Parameters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "aria-label": "Typical BWR operating parameters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-semibold text-foreground", children: "Parameter" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-semibold text-foreground text-right", children: "Typical Value" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: [
                ["Thermal power", "~3,300 MWth"],
                ["Electric output", "~1,000–1,100 MWe"],
                ["Thermal efficiency", "~32–34%"],
                ["Reactor pressure", "~70 bar (~1,020 psi)"],
                ["Core outlet temp (steam)", "~285°C"],
                ["Coolant inlet temp", "~215°C (subcooled)"],
                ["Steam quality at core exit", "~15–20% (void fraction)"],
                ["Fuel enrichment", "~3–4% U-235 (average)"],
                ["Fuel assemblies (typical)", "~748 (BWR/6)"],
                ["Active fuel height", "~3.81 m"],
                ["Fuel cycle length", "12–24 months"],
                [
                  "Number of recirculation pumps",
                  "2 external + 20 jet pumps"
                ]
              ].map(([p, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: p }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-mono text-foreground", children: v })
              ] }, p)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground italic", children: "Source: IAEA Nuclear Power Reactors in the World, 2023 edition; GE BWR/6 General Description, 1980." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "BWR major systems", "data-ocid": "bwr.systems_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Major Systems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: systems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-card p-4",
            "data-ocid": `bwr.system_card.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-primary mb-1", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s.description })
            ]
          },
          s.name
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          "aria-label": "BWR safety features",
          "data-ocid": "bwr.safety_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              "Key Safety Characteristics",
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: safetyFeatures.map((sf) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: sf.feature }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: sf.description })
              ] })
            ] }, sf.feature)) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "coreCoolant",
          title: "BWR Core and Coolant System",
          badge: "advanced",
          open: open.coreCoolant,
          onToggle: () => toggle("coreCoolant"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Two-Phase Flow and Void Fraction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "Unlike a PWR where coolant remains liquid throughout the core, a BWR core operates in a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "two-phase flow regime" }),
                ". Subcooled water enters the bottom of the fuel assemblies at ~215°C. As it rises through the ~3.8 m active length, it absorbs heat from the fuel rods and begins to boil. The",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "void fraction" }),
                " (steam volume fraction) increases from near zero at the core inlet to 15–20% at the core exit — a strongly axially varying density profile."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "This void distribution has direct reactivity implications. Because steam is a far poorer neutron moderator than liquid water, high void fractions reduce local moderation — creating a large, inherently negative void coefficient. Any power increase that accelerates boiling simultaneously suppresses the chain reaction, giving the BWR exceptional self-regulating behavior." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/30 border border-border px-4 py-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Axial Power Shape in a BWR Core" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Because voids reduce moderation in the upper core, the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "neutron flux peak" }),
                  " is displaced toward the bottom of the active fuel length where density is highest. This is the opposite of a PWR (where flux peaks near the center). Control rod insertion from the bottom is therefore ideal: bottom rods address the high-power region and allow fine-grained power shaping."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Recirculation System and Jet Pumps" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "Core flow in a BWR is maintained by a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "jet pump recirculation system" }),
                " ",
                "— a design with no large rotating machinery inside the reactor vessel. Two external recirculation pumps (typically motor-driven, variable-speed) take suction from the downcomer annulus between the core shroud and reactor vessel wall. This high-pressure flow is injected through 20 jet pump nozzles distributed symmetrically around the reactor vessel lower plenum."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "Each jet pump operates on the ejector principle: the high-velocity motive flow entrains and accelerates surrounding coolant (suction flow), increasing total core mass flow rate to approximately",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2× the motive flow alone" }),
                ". Jet pump flow amplification ratio is typically 1.5–2.5. Total core flow rate in a BWR/6 is ~48,000 kg/s at 100% power."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/30 border border-border px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Flow Control = Power Control" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Varying recirculation pump speed changes jet pump output, which changes total core flow, which changes void profile from top to bottom. Higher flow → fewer voids → more moderation → higher k",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "eff" }),
                  " → higher power. This smooth, continuous power adjustment is done without any control rod movement — a significant operational advantage over PWRs, which rely on control rods and boron concentration changes for load-following."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Fuel Assemblies: Channel Boxes and Array Designs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "BWR fuel assemblies are enclosed in individual",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "channel boxes" }),
                " — Zircaloy square tubes that direct coolant flow through each assembly independently. The channel box increases pressure drop and allows the two-phase flow to be controlled within each assembly, but adds neutron-absorbing material and complicates refueling."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableBlock,
                {
                  caption: "BWR vs. PWR operating parameters comparison",
                  headers: ["Parameter", "BWR (typical)", "PWR (typical)"],
                  rows: [
                    ["Coolant pressure", "~70 bar", "~155 bar"],
                    [
                      "Core outlet temperature",
                      "~285°C (steam)",
                      "~325°C (liquid)"
                    ],
                    ["Average enrichment", "~3–4% U-235", "~3–5% U-235"],
                    ["Fuel assemblies", "~748 (BWR/6)", "~193 (W 4-loop)"],
                    ["Fuel array", "10×10 (modern)", "17×17 (Westinghouse)"],
                    ["Active fuel length", "~3.81 m", "~3.66 m"],
                    ["Control rod entry", "Bottom (hydraulic)", "Top (gravity)"],
                    [
                      "Power control method",
                      "Rods + recirculation flow",
                      "Rods + soluble boron"
                    ],
                    ["Thermal efficiency", "~32–34%", "~33–35%"],
                    [
                      "Direct cycle?",
                      "Yes — steam to turbine",
                      "No — via steam generators"
                    ]
                  ],
                  source: "Source: IAEA Nuclear Power Reactors in the World 2023; NRC Information Digest 2023; GE BWR/6 General Description."
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "reactivityControl",
          title: "Reactivity Control in a BWR",
          badge: "advanced",
          open: open.reactivityControl,
          onToggle: () => toggle("reactivityControl"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Cruciform Control Rods and Bottom Entry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "BWR control rods have a distinctive",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "cruciform cross-section" }),
                " ",
                "— four neutron-absorbing blades arranged in a + shape. Each blade contains B₄C powder sealed in stainless steel tubes. A single cruciform rod occupies the gap between four fuel assemblies, absorbing neutrons on all four faces simultaneously. A typical BWR/6 core has 177 control rod positions for 748 fuel assemblies."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "Unlike PWR control rods (inserted from the top, driven by gravity in a scram), BWR rods enter from the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "bottom of the core" }),
                ". This positions them in the most reactive region (high-flux, low-void near the bottom) and allows fine power-shaping. However, because gravity would ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "withdraw" }),
                " them rather than insert them, scram cannot rely on gravity. Instead, Fine Motion Control Rod Drives (FMCRDs) use high-pressure water injection to drive rods in within ~3 seconds for a scram signal."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/30 border border-border px-4 py-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Fine Motion Control Rod Drives (FMCRDs)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Modern FMCRDs (introduced in ABWR and BWR/6 upgrades) combine a ball-screw electric motor drive for fine positioning (steps of ~18 mm) with a hydraulic drive for rapid scram insertion. Normal operation uses the motor for precise rod position control; scram uses stored hydraulic pressure (~130 bar) to fully insert a rod in ~3 s regardless of AC power availability. This dual mechanism eliminates the need for standby DC power buses purely for rod drive operation. [GE-Hitachi ABWR DCD Rev. 4; NRC NUREG-1503]" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "No Soluble Boron in Normal Operation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "A significant BWR distinction from the PWR is the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "absence of soluble boron in the primary coolant" }),
                " ",
                "during normal operation. In a PWR, boric acid dissolved in the primary loop compensates for fuel burnup and provides a large positive shutdown margin; in a BWR, this is unnecessary because recirculation flow control provides continuous, rapid reactivity adjustment across a wide range."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "Borated water ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "is" }),
                " available in emergency systems (Standby Liquid Control, SLC) — a backup shutdown mechanism that injects sodium pentaborate solution under high pressure directly into the reactor vessel. SLC is a single-failure-proof backup to the control rod system. [NRC NUREG-0800 SRP 4.6]"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableBlock,
                {
                  caption: "Reactivity feedback mechanisms in BWRs",
                  headers: [
                    "Mechanism",
                    "Coefficient",
                    "Sign",
                    "Timescale",
                    "Physical Cause"
                  ],
                  rows: [
                    [
                      "Void coefficient",
                      "αvoid ≈ −100 to −200 pcm/% void",
                      "Strongly Negative",
                      "Milliseconds–seconds",
                      "More boiling → more steam voids → far less moderation → k_eff drops sharply"
                    ],
                    [
                      "Doppler broadening (fuel temp.)",
                      "αD ≈ −2 to −4 pcm/°C",
                      "Negative",
                      "Microseconds",
                      "Higher UO₂ temperature → U-238 resonance broadening → more parasitic neutron capture"
                    ],
                    [
                      "Moderator temp. coefficient",
                      "αM (smaller than void)",
                      "Negative",
                      "Seconds",
                      "Hotter water is less dense → less moderation; subsumed in void effect in BWR"
                    ],
                    [
                      "Power coefficient (net)",
                      "αP (sum of above)",
                      "Negative",
                      "Combined",
                      "Strong net negative feedback; larger absolute magnitude than PWR due to void dominance"
                    ]
                  ],
                  source: "Source: Glasstone & Sesonske, Nuclear Reactor Engineering 4th ed.; NRC Reactor Concepts Manual NUREG/CR-6042."
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "containment",
          title: "Mark I, II, and III Containments",
          badge: "advanced",
          open: open.containment,
          onToggle: () => toggle("containment"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "The Pressure Suppression Concept" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "All GE BWR containment designs employ the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "pressure suppression principle" }),
                ": rather than designing containment to withstand the full pressure generated by a pipe break (as in a PWR large dry containment), BWR containment uses a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "suppression pool" }),
                " of cold water. Steam released in a pipe break is directed through submerged blowdown pipes and rapidly condensed, limiting peak containment pressure. This allows the containment to be physically smaller than a PWR dry containment for an equivalent thermal power."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "The trade-off is that the suppression pool must be maintained at low temperature and high water inventory. If the pool heats up (e.g., long station blackout with no heat removal), its condensation effectiveness degrades — a scenario that became critical at Fukushima Daiichi." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Mark I: Lightbulb Drywell and Torus Suppression Pool" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "The Mark I containment (used on BWR/1–BWR/4 plants, 1960s–early 1970s) consists of a steel",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "drywell" }),
                " — roughly inverted-lightbulb shaped — housing the reactor pressure vessel and primary system piping. Below and surrounding the drywell is a steel",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "torus suppression pool" }),
                " ",
                "(wetwell) filled with ~3,000 m³ of water. Blowdown pipes connect the drywell to the wetwell; any steam released from primary piping is diverted into the pool and condensed."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-amber-500/10 border border-amber-500/30 px-4 py-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1", children: "Mark I Limitations and Fukushima" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "The Mark I has the smallest free volume of any GE containment design. Under station blackout conditions with degraded pool cooling, containment pressure can rise more rapidly than in larger-volume designs. All six reactor units at Fukushima Daiichi used Mark I or Mark II containments. Post-accident analyses showed that early implementation of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "hardened containment venting (HCVS)" }),
                  " ",
                  "might have prevented hydrogen buildup that led to explosions in Unit 1 and Unit 3 reactor buildings. Following Fukushima, the NRC (Order EA-12-050) and Japan's NRA both mandated HCVS installation on all Mark I plants. [NRC Order EA-12-050; IAEA Safety Report No. 86]"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Mark II and Mark III Improvements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "The",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Mark II containment" }),
                " ",
                "(mid-1970s) replaced the separate torus with an integrated annular suppression pool beneath the drywell. The cylindrical drywell sits above a larger-volume wetwell, improving structural robustness and increasing suppression pool surface area for better condensation. The Mark II provides a larger suppression pool volume and a more compact, robust structure than the Mark I."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "The",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Mark III containment" }),
                " ",
                "is a fundamentally redesigned system used on BWR/6 plants. It features a large, cylindrical outer reinforced concrete building with a suppression pool at its base. The significantly greater free volume (~850 m³ drywell vs. ~4,300 m³ outer building) reduces pressure transients, improves hydrogen management, and provides more margin for accident management. The Mark III design was influenced by PWR large dry containment philosophy."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableBlock,
                {
                  caption: "GE BWR containment design comparison",
                  headers: [
                    "Feature",
                    "Mark I",
                    "Mark II",
                    "Mark III",
                    "ABWR (Mark III evolved)"
                  ],
                  rows: [
                    [
                      "Era",
                      "1960s–early 1970s",
                      "Mid-1970s",
                      "Late 1970s–1980s",
                      "1990s–present"
                    ],
                    [
                      "Drywell shape",
                      "Lightbulb (steel)",
                      "Cylinder (reinforced concrete)",
                      "Cylinder (RC)",
                      "Cylinder (RC + steel liner)"
                    ],
                    [
                      "Suppression pool",
                      "Separate torus",
                      "Annular below drywell",
                      "Annular in outer building base",
                      "Annular (below RPV pedestal)"
                    ],
                    [
                      "Free volume (approx.)",
                      "~3,600 m³ (drywell + wetwell)",
                      "~5,000 m³",
                      "~7,800 m³",
                      "~7,200 m³ (improved)"
                    ],
                    [
                      "Post-Fukushima upgrade",
                      "HCVS mandatory",
                      "HCVS installed",
                      "Upgraded venting",
                      "Design already includes passive venting"
                    ],
                    [
                      "Example plants",
                      "Fukushima D-1 (Units 1–4), Dresden, Oyster Creek",
                      "Fukushima D-2, Limerick",
                      "Clinton, Grand Gulf",
                      "Kashiwazaki-Kariwa 6&7"
                    ]
                  ],
                  source: "Source: NRC NUREG-1745 (Mark I/II ECCS performance); IAEA TECDOC-1536; GE-Hitachi ABWR DCD."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Advanced BWR (ABWR)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "The ABWR (developed jointly by GE, Hitachi, and Toshiba) is a Generation III design rated at ~1,350 MWe. Its major innovations over the earlier BWR/6 include:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
                {
                  id: "abwr-1",
                  text: "Internal recirculation pumps (10 motor pumps inside the lower reactor vessel; eliminates large external recirculation loops and their associated large-break LOCA scenarios)"
                },
                {
                  id: "abwr-2",
                  text: "Fine Motion Control Rod Drives (FMCRDs) as standard"
                },
                {
                  id: "abwr-3",
                  text: "Mark III–based reinforced concrete containment with significantly improved free volume"
                },
                {
                  id: "abwr-4",
                  text: "Three independent trains of safety systems (instead of two) for improved redundancy"
                },
                {
                  id: "abwr-5",
                  text: "Reduced reactor building footprint compared to BWR/6 despite higher power output"
                },
                {
                  id: "abwr-6",
                  text: "Operating units: Kashiwazaki-Kariwa Units 6 & 7 (Japan, 1996–1997); Lungmen (Taiwan, constructed but not operated as of 2024)"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.text })
              ] }, item.id)) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "eccs",
          title: "Safety Systems and Emergency Core Cooling (ECCS)",
          badge: "advanced",
          open: open.eccs,
          onToggle: () => toggle("eccs"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
                "The BWR ECCS is designed to maintain peak cladding temperature below ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "1204°C (2200°F)" }),
                " ",
                "following a design-basis Loss-of-Coolant Accident (LOCA). Because the BWR operates at lower pressure than a PWR, a high-pressure injection system capable of injecting at full system pressure is required for small-break LOCAs; a separate low-pressure system addresses large-break LOCAs after depressurization. [10 CFR 50.46]"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableBlock,
                {
                  caption: "BWR ECCS subsystem summary (BWR/6)",
                  headers: [
                    "Subsystem",
                    "Function",
                    "Actuation",
                    "Pressure Range",
                    "Notes"
                  ],
                  rows: [
                    [
                      "High-Pressure Core Spray (HPCS)",
                      "Spray water over top of core at high pressure — prevents cladding heatup during small-break LOCA",
                      "Low reactor water level (Level 2) + high drywell pressure",
                      "~70 to 8.6 bar",
                      "Single active train; diesel-backed; powered by dedicated emergency bus"
                    ],
                    [
                      "Low-Pressure Core Spray (LPCS)",
                      "High-flow spray for reflood after large-break LOCA and vessel depressurization",
                      "Low reactor water level (Level 1) + low vessel pressure",
                      "< 8.6 bar",
                      "Two trains; draws from suppression pool; minimum flow 0.7 m³/s per train"
                    ],
                    [
                      "Low-Pressure Coolant Injection (LPCI)",
                      "High-volume flooding injection into reactor vessel lower plenum — primary large-break LOCA mitigation",
                      "Low reactor water level (Level 1)",
                      "< 8.6 bar",
                      "4 trains via RHR pumps; highest flow capacity in BWR ECCS"
                    ],
                    [
                      "Residual Heat Removal (RHR)",
                      "Long-term decay heat removal in shutdown; suppression pool cooling; containment spray",
                      "Automatic in LPCI mode; manual in RHR shutdown cooling mode",
                      "Atmospheric (long-term)",
                      "Multiple modes: LPCI, shutdown cooling, suppression pool cooling, containment spray"
                    ],
                    [
                      "RCIC (Reactor Core Isolation Cooling)",
                      "Maintain reactor water level during isolation events and station blackout using steam-driven turbine pump — no AC power needed",
                      "Reactor isolation + low water level (Level 2)",
                      "High-pressure (~70 bar)",
                      "Critical SBO survival system; draws from condensate storage tank then suppression pool; operated at Fukushima for many hours"
                    ],
                    [
                      "HPCI (High Pressure Coolant Injection)",
                      "High-flow injection at high pressure for major coolant leaks — steam-turbine driven pump",
                      "Low water level (Level 2) + high drywell pressure",
                      "~70 to 10 bar",
                      "Larger flow than RCIC; also steam-driven, no AC required; transitions to LPCS/LPCI as pressure falls"
                    ]
                  ],
                  source: "Source: NUREG-0800 Standard Review Plan 6.3; IAEA Safety Reports Series No. 82; NRC Information Digest 2023."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "Station Blackout and Steam-Driven Systems" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "The RCIC and HPCI systems are unique to BWRs: they are powered by reactor steam rather than electricity. As long as the reactor vessel remains pressurized and produces steam from decay heat, these systems can inject water and maintain core cooling without any AC power source. At Fukushima Daiichi in March 2011, RCIC systems operated for 8–70 hours (varying by unit) following the loss of all AC power from the tsunami, substantially delaying core damage progression." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-amber-500/10 border border-amber-500/30 px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1", children: "Post-Fukushima Recognition: Steam Dependency Limitation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "RCIC and HPCI depend on steam pressure. If the reactor vessel depressurizes (due to operator action or failure), or if core damage progresses to the point of steam generation reduction, these systems lose motive force. At Fukushima Daiichi Unit 1, RCIC injection may have ceased earlier than optimal. Post-Fukushima regulatory orders (NRC Mitigating Strategies Rule) required all US plants to have additional portable diesel-driven pumps and backup power independent of the permanent plant systems. [NRC Order EA-12-049; IAEA Nuclear Safety Review 2014]" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CollapsibleSection,
        {
          id: "globalFleet",
          title: "BWR Economics and Global Fleet",
          badge: "intermediate",
          open: open.globalFleet,
          onToggle: () => toggle("globalFleet"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
                "As of 2024, approximately",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "70 BWRs operate commercially worldwide" }),
                ", representing about 18% of the global commercial nuclear fleet. The BWR fleet is concentrated in the United States (the largest operator), Japan (many units in post-Fukushima restart review), Sweden, Switzerland, and Taiwan. Germany has retired all its BWR units as part of its nuclear phase-out."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableBlock,
                {
                  caption: "Notable BWR plants worldwide",
                  headers: ["Plant", "Country", "Units", "Type", "Status"],
                  rows: [
                    ["Dresden", "USA", "2", "BWR/3", "Retired 2017"],
                    ["Peach Bottom", "USA", "2", "BWR/4", "Operating"],
                    ["Clinton", "USA", "1", "BWR/6", "Operating"],
                    ["Grand Gulf", "USA", "1", "BWR/6", "Operating"],
                    [
                      "Kashiwazaki-Kariwa",
                      "Japan",
                      "7",
                      "BWR/5 + ABWR (6,7)",
                      "Post-Fukushima restart review"
                    ],
                    [
                      "Fukushima Daiichi",
                      "Japan",
                      "6",
                      "BWR/3 + BWR/4 (Mark I)",
                      "Decommissioning"
                    ],
                    ["Forsmark", "Sweden", "3", "BWR/75 (ASEA-ATOM)", "Operating"],
                    [
                      "Oskarshamn",
                      "Sweden",
                      "1 (Unit 3)",
                      "ABB/ASEA BWR",
                      "Operating; 1&2 retired"
                    ],
                    ["Leibstadt", "Switzerland", "1", "BWR/6", "Operating"],
                    ["KKM Mühleberg", "Switzerland", "1", "BWR/4", "Retired 2019"],
                    ["Lungmen", "Taiwan", "2", "ABWR", "Constructed; not operated"]
                  ],
                  source: "Source: IAEA PRIS database, 2024; World Nuclear Association BWR fleet data."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "BWRX-300: Small Modular Reactor Descendant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: [
                "GE-Hitachi Nuclear Energy is developing the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "BWRX-300" }),
                ", a 300 MWe Small Modular Reactor (SMR) based on ESBWR technology (the Economic Simplified BWR, a passively safe Gen III+ design). The BWRX-300 represents a step-change simplification compared to the ESBWR:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
                {
                  id: "bwrx-1",
                  text: "Ten-fold reduction in concrete and steel compared to the ESBWR per MWe (simplified layout, eliminates traditional reactor building structure)"
                },
                {
                  id: "bwrx-2",
                  text: "Fully passive safety systems — no pumps required for core cooling for 72 hours"
                },
                {
                  id: "bwrx-3",
                  text: "Operating pressure ~72 bar; natural circulation-assisted core cooling without recirculation pumps"
                },
                {
                  id: "bwrx-4",
                  text: "Below-grade reactor placement improves seismic and external hazard resistance"
                },
                {
                  id: "bwrx-5",
                  text: "License application filed with Canadian Nuclear Safety Commission (CNSC) in 2022; Phase 1 Pre-Licensing review ongoing"
                },
                {
                  id: "bwrx-6",
                  text: "Tennessee Valley Authority (TVA) announced intent to deploy at Clinch River site (USA) as early as 2032"
                },
                {
                  id: "bwrx-7",
                  text: "Ontario Power Generation (Canada) targeting Darlington New Nuclear as the first BWRX-300 site"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.text })
              ] }, item.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground italic", children: "Source: GE-Hitachi BWRX-300 Technology Overview; CNSC Pre-Licensing Review 2022; TVA Clinch River ESPA, 2023." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "BWR vs. PWR: Operational Comparison" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: "Neither design has a decisive overall advantage; each excels in different dimensions. The choice of BWR or PWR for a new plant historically reflected vendor relationships, national regulatory traditions, and grid requirements as much as technical factors." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableBlock,
                {
                  caption: "BWR vs. PWR operational characteristics",
                  headers: ["Aspect", "BWR Advantage", "PWR Advantage"],
                  rows: [
                    [
                      "Steam generation",
                      "Direct cycle — simpler thermodynamic path",
                      "Two-loop — clean, non-radioactive turbine building"
                    ],
                    [
                      "Pressure system complexity",
                      "Lower pressure (70 bar) — thinner walls",
                      "Higher pressure requires thicker vessel walls"
                    ],
                    [
                      "Power control",
                      "Smooth via recirculation flow; no boron changes",
                      "Boron dilution allows slower but larger reactivity changes"
                    ],
                    [
                      "Maintenance access",
                      "Core accessible from top without steam generator removal",
                      "Steam generators and pressurizer add maintenance points"
                    ],
                    [
                      "Fuel management",
                      "4-batch loading; 10×10 array; modest reload batches",
                      "Larger refueling outages but greater lattice uniformity"
                    ],
                    [
                      "Containment volume",
                      "Smaller (pressure suppression)",
                      "Larger (dry containment with more margin)"
                    ],
                    [
                      "Safeguards simplicity",
                      "Single coolant loop to monitor",
                      "Two loops but radioactivity isolated from turbine"
                    ],
                    [
                      "Capacity factor (US fleet)",
                      "~90% (historically slightly lower than US PWR fleet)",
                      "~92% (US fleet average, EIA 2023)"
                    ]
                  ],
                  source: "Source: EIA Electric Power Annual 2023; NEA/OECD Comparing Nuclear Reactor Technologies, 2021; IAEA Safety Reports."
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SafetyCallout, { title: "Restricted: Detailed Engineering Specifications", children: "Detailed core loading patterns, specific control system schematics, critical mass parameters, neutron economy calculations, and site-specific safety analysis reports beyond publicly available NRC and IAEA documents are not provided on this platform. For licensed engineering purposes, consult the NRC ADAMS database, the IAEA Nuclear Data Services, and vendor design control documents under appropriate regulatory oversight." })
    ] })
  ] });
}
export {
  BWRPage as default
};
