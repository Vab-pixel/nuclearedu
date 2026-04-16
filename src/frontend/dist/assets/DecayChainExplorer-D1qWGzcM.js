import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Badge, B as Button, C as ChevronRight } from "./index-D72vKdFv.js";
import { u as u238DecayChain } from "./decayChain-CwO6tbOq.js";
import { s as select } from "./transform-BMcWkg2x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const DECAY_COLORS = {
  alpha: "#f87171",
  "beta-": "#60a5fa",
  "beta+": "#4ade80",
  gamma: "#c084fc",
  stable: "#9ca3af",
  other: "#22d3ee"
};
const DECAY_LABELS = {
  alpha: "α decay",
  "beta-": "β⁻ decay",
  "beta+": "β⁺ decay",
  gamma: "γ emission",
  stable: "Stable"
};
function decayDescription(step) {
  const descriptions = {
    alpha: `${step.nuclide} emits a helium-4 nucleus (α particle), losing 2 protons and 2 neutrons to become ${step.daughter}. Q-value: ${step.Qvalue_MeV} MeV — roughly ${(step.Qvalue_MeV * 7e5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}× the energy of a typical chemical bond.`,
    "beta-": `${step.nuclide} undergoes β⁻ decay: a neutron converts to a proton by emitting an electron and an antineutrino. The daughter nucleus is ${step.daughter}. Q-value: ${step.Qvalue_MeV} MeV.`,
    "beta+": `${step.nuclide} undergoes β⁺ decay: a proton converts to a neutron by emitting a positron and a neutrino, forming ${step.daughter}. Q-value: ${step.Qvalue_MeV} MeV.`,
    gamma: `${step.nuclide} is a metastable isomer that de-excites by emitting a gamma photon to reach the ground state ${step.daughter}.`,
    stable: `${step.nuclide} is the stable end product of the U-238 decay chain — lead-206 is the final, non-radioactive daughter.`
  };
  return descriptions[step.decayMode] ?? `${step.nuclide} → ${step.daughter} via ${step.decayMode}.`;
}
const NODE_W = 80;
const NODE_H = 48;
const SPACING_X = 130;
const SVG_MARGIN = 20;
function downloadCSV(data) {
  const header = "Step,Nuclide,Z,N,A,Decay Mode,Daughter,Half-life,Q-value (MeV),Branching (%),Particle\n";
  const rows = data.map(
    (s) => `${s.stepIndex},${s.nuclide},${s.Z},${s.N},${s.A},${s.decayMode},${s.daughter},"${s.halfLifeStr}",${s.Qvalue_MeV},${s.branchingPercent},"${s.particleEmitted}"`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "u238_decay_chain.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function DecayChainExplorer() {
  const [activeStep, setActiveStep] = reactExports.useState(0);
  const svgRef = reactExports.useRef(null);
  const chain = u238DecayChain;
  const totalNodes = chain.length + 1;
  const svgWidth = totalNodes * SPACING_X + SVG_MARGIN * 2 + NODE_W;
  const svgHeight = 160;
  const centerY = svgHeight / 2;
  const nodes = chain.map((step, i) => ({
    x: SVG_MARGIN + i * SPACING_X,
    y: centerY - NODE_H / 2,
    label: step.nuclide,
    step
  }));
  const terminalNode = {
    x: SVG_MARGIN + chain.length * SPACING_X,
    y: centerY - NODE_H / 2,
    step: chain[chain.length - 1]
  };
  reactExports.useEffect(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);
    svg.selectAll(".decay-edge").remove();
    chain.forEach((step, i) => {
      const x1 = SVG_MARGIN + i * SPACING_X + NODE_W;
      const x2 = SVG_MARGIN + (i + 1) * SPACING_X;
      const y = centerY;
      const color = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
      const isActive = i === activeStep;
      const g = svg.append("g").attr("class", "decay-edge").attr("opacity", isActive ? 1 : 0.35);
      g.append("line").attr("x1", x1).attr("y1", y).attr("x2", x2 - 10).attr("y2", y).attr("stroke", color).attr("stroke-width", isActive ? 2.5 : 1.5).attr("stroke-dasharray", isActive ? "none" : "none");
      g.append("polygon").attr("points", `${x2 - 10},${y - 5} ${x2},${y} ${x2 - 10},${y + 5}`).attr("fill", color);
      const midX = (x1 + x2) / 2;
      g.append("text").attr("x", midX).attr("y", y - 14).attr("text-anchor", "middle").attr("fill", color).attr("font-size", "9px").attr("font-family", "monospace").text(
        step.decayMode === "beta-" ? "β⁻" : step.decayMode === "beta+" ? "β⁺" : step.decayMode === "alpha" ? "α" : step.decayMode
      );
      g.append("text").attr("x", midX).attr("y", y + 22).attr("text-anchor", "middle").attr("fill", "#9ca3af").attr("font-size", "8px").attr("font-family", "monospace").text(step.halfLifeStr);
    });
  }, [activeStep, chain, centerY]);
  const currentStep = chain[activeStep] ?? chain[chain.length - 1];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      "data-ocid": "decay-chain.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-intermediate", children: "Intermediate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-professional", children: "D3 · SVG" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "U-238 Decay Chain Explorer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xl", children: "Step through all 14 decay transitions from Uranium-238 to stable Lead-206. Each step shows the decay mode, half-life, and energy released." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl px-4 py-8 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-4 text-xs text-muted-foreground",
              "aria-label": "Decay mode color legend",
              children: Object.entries(DECAY_LABELS).map(([mode, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block h-2.5 w-2.5 rounded-full",
                    style: { background: DECAY_COLORS[mode] },
                    "aria-hidden": "true"
                  }
                ),
                label
              ] }, mode))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-2xl border border-border bg-card overflow-x-auto",
              "data-ocid": "decay-chain.svg_graph",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minWidth: svgWidth }, className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  ref: svgRef,
                  width: svgWidth,
                  height: svgHeight,
                  role: "img",
                  "aria-label": "U-238 decay chain to Pb-206, directed graph from left to right",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "U-238 Decay Chain to Pb-206" }),
                    nodes.map((node, i) => {
                      const isActive = i === activeStep;
                      const modeColor = DECAY_COLORS[node.step.decayMode] ?? DECAY_COLORS.other;
                      const handleStep = () => setActiveStep(i);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { "data-ocid": `decay-chain.node.${i + 1}`, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: node.x,
                            y: node.y,
                            width: NODE_W,
                            height: NODE_H,
                            rx: 6,
                            fill: isActive ? `${modeColor}22` : "transparent",
                            stroke: isActive ? modeColor : "#374151",
                            strokeWidth: isActive ? 2 : 1,
                            tabIndex: 0,
                            role: "button",
                            "aria-label": `${node.label}, step ${i + 1}`,
                            onClick: handleStep,
                            onKeyDown: (e) => {
                              if (e.key === "Enter" || e.key === " ") handleStep();
                            },
                            style: { cursor: "pointer" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: node.x + NODE_W / 2,
                            y: node.y + 18,
                            textAnchor: "middle",
                            fill: isActive ? modeColor : "#e5e7eb",
                            fontSize: "12",
                            fontWeight: "bold",
                            fontFamily: "monospace",
                            pointerEvents: "none",
                            children: node.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "text",
                          {
                            x: node.x + NODE_W / 2,
                            y: node.y + 32,
                            textAnchor: "middle",
                            fill: "#9ca3af",
                            fontSize: "9",
                            fontFamily: "monospace",
                            pointerEvents: "none",
                            children: [
                              "Z=",
                              node.step.Z,
                              " N=",
                              node.step.N
                            ]
                          }
                        )
                      ] }, node.label);
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { "data-ocid": `decay-chain.node.${chain.length + 1}`, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: terminalNode.x,
                          y: terminalNode.y,
                          width: NODE_W,
                          height: NODE_H,
                          rx: 6,
                          fill: activeStep === chain.length - 1 ? "#9ca3af22" : "transparent",
                          stroke: "#9ca3af",
                          strokeWidth: 1,
                          tabIndex: 0,
                          role: "button",
                          "aria-label": "Pb-206, stable end product",
                          onClick: () => setActiveStep(chain.length - 1),
                          onKeyDown: (e) => {
                            if (e.key === "Enter" || e.key === " ")
                              setActiveStep(chain.length - 1);
                          },
                          style: { cursor: "pointer" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: terminalNode.x + NODE_W / 2,
                          y: terminalNode.y + 18,
                          textAnchor: "middle",
                          fill: "#e5e7eb",
                          fontSize: "12",
                          fontWeight: "bold",
                          fontFamily: "monospace",
                          pointerEvents: "none",
                          children: "Pb-206"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: terminalNode.x + NODE_W / 2,
                          y: terminalNode.y + 32,
                          textAnchor: "middle",
                          fill: "#4ade80",
                          fontSize: "9",
                          fontFamily: "monospace",
                          pointerEvents: "none",
                          children: "STABLE"
                        }
                      )
                    ] })
                  ]
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-4",
              "data-ocid": "decay-chain.step_controls",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setActiveStep((s) => Math.max(0, s - 1)),
                    disabled: activeStep === 0,
                    "aria-label": "Previous decay step",
                    "data-ocid": "decay-chain.step_back_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1", "aria-hidden": "true" }),
                      "Step Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  "Step",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: activeStep + 1 }),
                  " ",
                  "of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: chain.length })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setActiveStep((s) => Math.min(chain.length - 1, s + 1)),
                    disabled: activeStep === chain.length - 1,
                    "aria-label": "Next decay step",
                    "data-ocid": "decay-chain.step_forward_button",
                    children: [
                      "Step Forward",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1", "aria-hidden": "true" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-6",
              "data-ocid": "decay-chain.details_panel",
              "aria-live": "polite",
              "aria-atomic": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "h-3 w-3 rounded-full",
                          style: {
                            background: DECAY_COLORS[currentStep.decayMode] ?? DECAY_COLORS.other
                          },
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground text-lg", children: [
                        currentStep.nuclide,
                        " → ",
                        currentStep.daughter
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-mono", children: [
                      currentStep.decayMode === "beta-" ? "β⁻ decay" : currentStep.decayMode === "beta+" ? "β⁺ decay" : currentStep.decayMode === "alpha" ? "α decay" : currentStep.decayMode,
                      " ",
                      "· ",
                      currentStep.particleEmitted
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => downloadCSV(chain),
                      "aria-label": "Download decay chain as CSV",
                      "data-ocid": "decay-chain.csv_download_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-1.5", "aria-hidden": "true" }),
                        "Export CSV"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4", children: [
                  { label: "Parent", value: currentStep.nuclide },
                  { label: "Daughter", value: currentStep.daughter },
                  { label: "Half-life", value: currentStep.halfLifeStr },
                  {
                    label: "Q-value",
                    value: `${currentStep.Qvalue_MeV} MeV`
                  },
                  { label: "Branching", value: `${currentStep.branchingPercent}%` },
                  { label: "Particle", value: currentStep.particleEmitted },
                  { label: "Z (parent)", value: currentStep.Z },
                  { label: "A (parent)", value: currentStep.A }
                ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-0.5", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-sm font-semibold text-foreground", children: String(value) })
                ] }, label)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/40 border border-border p-4 text-sm text-muted-foreground leading-relaxed", children: decayDescription(currentStep) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "details",
            {
              className: "rounded-xl border border-border bg-card",
              "data-ocid": "decay-chain.table_fallback",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer px-5 py-3 text-sm font-semibold text-foreground select-none hover:bg-muted/40 rounded-xl", children: "Accessible Table — All 14 Decay Steps" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs text-left",
                    "aria-label": "U-238 decay chain data table",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-muted-foreground", children: [
                        "Step",
                        "Nuclide",
                        "Mode",
                        "Daughter",
                        "Half-life",
                        "Q (MeV)",
                        "Branching"
                      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "pb-2 pr-4 font-semibold uppercase tracking-wider",
                          children: h
                        },
                        h
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: chain.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: "border-b border-border/40 hover:bg-muted/30 transition-colors",
                          "data-ocid": `decay-chain.table_row.${step.stepIndex}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono", children: step.stepIndex }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono font-bold", children: step.nuclide }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                className: "py-2 pr-4 font-mono",
                                style: { color: DECAY_COLORS[step.decayMode] },
                                children: step.decayMode
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono", children: step.daughter }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono", children: step.halfLifeStr }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono", children: step.Qvalue_MeV }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 font-mono", children: [
                              step.branchingPercent,
                              "%"
                            ] })
                          ]
                        },
                        step.stepIndex
                      )) })
                    ]
                  }
                ) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  DecayChainExplorer as default
};
