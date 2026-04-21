import { d as createLucideIcon, j as jsxRuntimeExports, X, e as cn, r as reactExports, b as Badge, B as Button } from "./index-BllujZqD.js";
import { R as Root, C as Content, b as Close, a as Title, P as Portal, O as Overlay } from "./index-8WvW6N7p.js";
import { n as nuclides } from "./nuclides-BRGIWNJL.js";
import { s as select } from "./transform-DXkNLPGV.js";
import { M as Minus } from "./minus-DHBAPoJ6.js";
import { P as Plus } from "./plus-aVrMxFRt.js";
import { R as RotateCcw } from "./rotate-ccw-BOFUVrcG.js";
import "./index-Djikuig1.js";
import "./string-CugKFzKt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const CELL_SIZE = 14;
const CELL_GAP = 1;
const STEP = CELL_SIZE + CELL_GAP;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.15;
const COLOR_MAPS = {
  default: {
    stable: "#9ca3af",
    alpha: "#fbbf24",
    "beta-": "#60a5fa",
    "beta+": "#4ade80",
    gamma: "#c084fc",
    other: "#22d3ee"
  },
  deuteranopia: {
    stable: "#9ca3af",
    alpha: "#f97316",
    "beta-": "#3b82f6",
    "beta+": "#e879f9",
    gamma: "#facc15",
    other: "#22d3ee"
  }
};
function getFreshnessColor(nuclide) {
  if (!nuclide.lastUpdated) return "#374151";
  const diffMs = Date.now() - new Date(nuclide.lastUpdated).getTime();
  const diffDays = diffMs / (1e3 * 60 * 60 * 24);
  if (diffDays <= 7) return "#10b981";
  if (diffDays <= 30) return "#f59e0b";
  return "#6b7280";
}
const FRESHNESS_LEGEND = [
  { label: "0–7 days", color: "#10b981" },
  { label: "8–30 days", color: "#f59e0b" },
  { label: ">30 days / no data", color: "#6b7280" }
];
const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Alpha", value: "alpha" },
  { label: "Beta⁻", value: "beta-" },
  { label: "Beta⁺", value: "beta+" },
  { label: "Stable", value: "stable" },
  { label: "Gamma", value: "gamma" }
];
function getColor(nuclide, palette, colorMode) {
  if (colorMode === "freshness") return getFreshnessColor(nuclide);
  const primary = nuclide.decayModes[0] ?? "other";
  return COLOR_MAPS[palette][primary] ?? COLOR_MAPS[palette].other;
}
function NuclideChart() {
  const svgRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("all");
  const [palette, setPalette] = reactExports.useState("default");
  const [colorMode, setColorMode] = reactExports.useState("decay");
  const [zoom, setZoom] = reactExports.useState(1);
  const [fitZoom, setFitZoom] = reactExports.useState(1);
  const [pan, setPan] = reactExports.useState({ x: 0, y: 0 });
  const isDragging = reactExports.useRef(false);
  const hasDragged = reactExports.useRef(false);
  const dragStart = reactExports.useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const displayed = filter === "all" ? nuclides : nuclides.filter((n) => n.decayModes.includes(filter));
  const maxN = Math.max(...nuclides.map((n) => n.N));
  const maxZ = Math.max(...nuclides.map((n) => n.Z));
  const svgW = (maxN + 2) * STEP + 60;
  const svgH = (maxZ + 2) * STEP + 60;
  const recalcFit = reactExports.useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerW = rect.width || 900;
    const containerH = Math.min(rect.height || 520, window.innerHeight * 0.6);
    const fit = Math.min(containerW / svgW, containerH / svgH, 1);
    setFitZoom(fit);
    setZoom(fit);
    const scaledW = svgW * fit;
    const scaledH = svgH * fit;
    setPan({
      x: (containerW - scaledW) / 2,
      y: (containerH - scaledH) / 2
    });
  }, [svgW, svgH]);
  reactExports.useLayoutEffect(() => {
    recalcFit();
  }, [recalcFit]);
  reactExports.useEffect(() => {
    const obs = new ResizeObserver(recalcFit);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [recalcFit]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement)
        return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
      } else if (e.key === "0") {
        setZoom(fitZoom);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fitZoom]);
  reactExports.useEffect(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);
    svg.selectAll(".nuclide-cell").remove();
    svg.selectAll(".axis-label").remove();
    for (let n = 0; n <= maxN; n += 10) {
      svg.append("text").attr("class", "axis-label").attr("x", 45 + n * STEP + CELL_SIZE / 2).attr("y", 18).attr("text-anchor", "middle").attr("fill", "#6b7280").attr("font-size", "9px").text(n);
    }
    for (let z = 0; z <= maxZ; z += 10) {
      svg.append("text").attr("class", "axis-label").attr("x", 20).attr("y", svgH - 35 - z * STEP + CELL_SIZE / 2 + 4).attr("text-anchor", "middle").attr("fill", "#6b7280").attr("font-size", "9px").text(z);
    }
    for (const n of displayed) {
      const cx = 45 + n.N * STEP;
      const cy = svgH - 35 - n.Z * STEP;
      const color = getColor(n, palette, colorMode);
      svg.append("rect").attr("class", "nuclide-cell").attr("x", cx).attr("y", cy).attr("width", CELL_SIZE).attr("height", CELL_SIZE).attr("rx", 1.5).attr("fill", color).attr("opacity", (selected == null ? void 0 : selected.symbol) === n.symbol ? 1 : 0.85).attr("stroke", (selected == null ? void 0 : selected.symbol) === n.symbol ? "#fff" : "transparent").attr("stroke-width", 1.5).attr("tabindex", "0").attr("role", "button").attr(
        "aria-label",
        `${n.name}, Z=${n.Z}, N=${n.N}, ${n.decayModes.join("/")} decay, half-life: ${n.halfLifeStr}`
      ).style("cursor", "pointer").on("click", () => setSelected(n)).on("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") setSelected(n);
      });
    }
  }, [displayed, palette, colorMode, selected, maxN, maxZ, svgH]);
  const handlePointerDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
    e.target.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDragged.current = true;
    }
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom(
      (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2)))
    );
  };
  const zoomPct = Math.round(zoom * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      "data-ocid": "nuclide-chart.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-advanced", children: "Advanced" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-professional", children: "D3 · Heatmap" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Chart of Nuclides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm max-w-xl", children: [
            "Interactive Z–N grid of ",
            nuclides.length,
            " nuclides colored by primary decay mode. Click any square for details. Data sourced from ENSDF/NNDC."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "fieldset",
              {
                className: "flex flex-wrap gap-2 border-0 p-0 m-0",
                "aria-label": "Filter by decay mode",
                "data-ocid": "nuclide-chart.filter_group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter by decay mode" }),
                  FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: filter === opt.value ? "default" : "outline",
                      onClick: () => setFilter(opt.value),
                      "aria-pressed": filter === opt.value,
                      "data-ocid": `nuclide-chart.filter_${opt.value}`,
                      children: opt.label
                    },
                    opt.value
                  ))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => setPalette((p) => p === "default" ? "deuteranopia" : "default"),
                "data-ocid": "nuclide-chart.palette_toggle",
                "aria-label": `Switch to ${palette === "default" ? "deuteranopia-safe" : "default"} color palette`,
                children: palette === "default" ? "🎨 Colorblind-Safe" : "🎨 Default Palette"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-lg border border-border bg-card/60 p-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: colorMode === "decay" ? "default" : "ghost",
                  className: "h-7 px-2.5 text-xs",
                  onClick: () => setColorMode("decay"),
                  "aria-pressed": colorMode === "decay",
                  "data-ocid": "nuclide-chart.colormode_decay",
                  children: "Decay Mode"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: colorMode === "freshness" ? "default" : "ghost",
                  className: "h-7 px-2.5 text-xs",
                  onClick: () => setColorMode("freshness"),
                  "aria-pressed": colorMode === "freshness",
                  "data-ocid": "nuclide-chart.colormode_freshness",
                  children: "Data Freshness"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-4 text-xs text-muted-foreground",
              "aria-label": "Color legend",
              children: colorMode === "decay" ? Object.entries(COLOR_MAPS[palette]).map(([mode, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block h-3 w-3 rounded-sm",
                    style: { background: color },
                    "aria-hidden": "true"
                  }
                ),
                mode
              ] }, mode)) : FRESHNESS_LEGEND.map(({ label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block h-3 w-3 rounded-sm",
                    style: { background: color },
                    "aria-hidden": "true"
                  }
                ),
                label
              ] }, label))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 self-start",
              role: "toolbar",
              "aria-label": "Zoom controls",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-1 shadow-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 w-7 rounded-full p-0",
                      onClick: () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2))),
                      "aria-label": "Zoom out",
                      "data-ocid": "nuclide-chart.zoom_out_button",
                      disabled: zoom <= MIN_ZOOM,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono text-xs text-foreground min-w-[3.2rem] text-center select-none",
                      "aria-live": "polite",
                      "aria-label": `Current zoom: ${zoomPct}%`,
                      children: [
                        zoomPct,
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 w-7 rounded-full p-0",
                      onClick: () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2))),
                      "aria-label": "Zoom in",
                      "data-ocid": "nuclide-chart.zoom_in_button",
                      disabled: zoom >= MAX_ZOOM,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border mx-1", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 rounded-full text-xs gap-1",
                      onClick: () => {
                        setZoom(fitZoom);
                        recalcFit();
                      },
                      "aria-label": "Reset zoom to fit",
                      "data-ocid": "nuclide-chart.zoom_reset_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
                        "Fit"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 px-3 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ZoomIn,
                    {
                      className: "h-3 w-3 text-muted-foreground",
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Drag to pan · Scroll to zoom ·",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "font-mono", children: "+/-" }),
                    " keys"
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: containerRef,
              className: "rounded-2xl border border-border bg-card overflow-hidden cursor-grab active:cursor-grabbing",
              style: {
                height: Math.max(380, Math.round(window.innerHeight * 0.52)),
                position: "relative"
              },
              "data-ocid": "nuclide-chart.svg_container",
              onPointerDown: handlePointerDown,
              onPointerMove: handlePointerMove,
              onPointerUp: handlePointerUp,
              onPointerLeave: handlePointerUp,
              onWheel: handleWheel,
              "aria-label": "Chart of Nuclides — drag to pan, scroll to zoom",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    transform: `translate(${pan.x}px, ${pan.y}px)`,
                    transformOrigin: "0 0",
                    willChange: "transform"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      ref: svgRef,
                      width: svgW,
                      height: svgH,
                      style: {
                        transform: `scale(${zoom})`,
                        transformOrigin: "0 0",
                        display: "block"
                      },
                      role: "img",
                      "aria-label": `Chart of Nuclides: ${displayed.length} nuclides shown. X-axis: neutron number N. Y-axis: proton number Z.`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Chart of Nuclides — Z vs N heatmap" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: svgW / 2,
                            y: svgH - 8,
                            textAnchor: "middle",
                            fill: "#6b7280",
                            fontSize: "10",
                            fontFamily: "monospace",
                            children: "Neutron Number (N) →"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            transform: `translate(10, ${svgH / 2}) rotate(-90)`,
                            textAnchor: "middle",
                            fill: "#6b7280",
                            fontSize: "10",
                            fontFamily: "monospace",
                            children: "Proton Number (Z) →"
                          }
                        )
                      ]
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            displayed.length,
            " of ",
            nuclides.length,
            " nuclides. Click any colored square to see details."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!selected,
            onOpenChange: (open) => !open && setSelected(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                className: "max-w-md",
                "data-ocid": "nuclide-chart.detail_dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
                    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block h-4 w-4 rounded-sm",
                        style: {
                          background: selected ? getColor(selected, palette, colorMode) : "transparent"
                        },
                        "aria-hidden": "true"
                      }
                    ),
                    (selected == null ? void 0 : selected.name) ?? "Nuclide"
                  ] }) }),
                  selected && /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 gap-3 mt-2", children: [
                    { label: "Symbol", value: selected.symbol },
                    { label: "Atomic number (Z)", value: selected.Z },
                    { label: "Neutrons (N)", value: selected.N },
                    { label: "Mass number (A)", value: selected.A },
                    { label: "Half-life", value: selected.halfLifeStr },
                    {
                      label: "Decay modes",
                      value: selected.decayModes.join(", ")
                    },
                    {
                      label: "Q-value",
                      value: selected.Qvalue_MeV != null ? `${selected.Qvalue_MeV} MeV` : "—"
                    },
                    {
                      label: "Binding energy / nucleon",
                      value: selected.bindingEnergyPerNucleon_MeV != null ? `${selected.bindingEnergyPerNucleon_MeV} MeV` : "—"
                    },
                    {
                      label: "Mass excess",
                      value: selected.massExcess_keV != null ? `${selected.massExcess_keV} keV` : "—"
                    },
                    {
                      label: "Natural abundance",
                      value: selected.abundance != null ? `${selected.abundance}%` : "—"
                    }
                  ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-sm font-semibold text-foreground", children: String(value) })
                  ] }, label)) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  NuclideChart as default
};
