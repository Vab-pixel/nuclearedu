import { r as reactExports, j as jsxRuntimeExports, m as motion, P as PageHeader, S as SectionCard, E as EquationBlock, A as AudienceBadge } from "./index-DTpTSWSe.js";
import { C as CitationMarker } from "./CitationMarker-INaQsZz7.js";
import { C as CollapsibleSection } from "./CollapsibleSection-DYK90tLB.js";
const EM_REGIONS = [
  {
    name: "Radio",
    wMin: 1e9,
    wMax: 1e12,
    color: "#6366f1",
    freq: "< 300 GHz",
    energy: "< 1.2 meV"
  },
  {
    name: "Microwave",
    wMin: 1e6,
    wMax: 1e9,
    color: "#8b5cf6",
    freq: "300 MHz–300 GHz",
    energy: "1.2 μeV–1.2 meV"
  },
  {
    name: "Infrared",
    wMin: 700,
    wMax: 1e6,
    color: "#ef4444",
    freq: "300 GHz–430 THz",
    energy: "1.2 meV–1.7 eV"
  },
  {
    name: "Visible",
    wMin: 380,
    wMax: 700,
    color: "linear",
    freq: "430–750 THz",
    energy: "1.65–3.26 eV"
  },
  {
    name: "UV",
    wMin: 10,
    wMax: 380,
    color: "#a855f7",
    freq: "750 THz–30 PHz",
    energy: "3.3–124 eV"
  },
  {
    name: "X-ray",
    wMin: 0.01,
    wMax: 10,
    color: "#06b6d4",
    freq: "30 PHz–30 EHz",
    energy: "124 eV–124 keV"
  },
  {
    name: "Gamma",
    wMin: 0,
    wMax: 0.01,
    color: "#10b981",
    freq: "> 30 EHz",
    energy: "> 124 keV"
  }
];
function nmToRgb(nm) {
  if (nm < 380 || nm > 700) return "#888";
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm < 440) {
    r = (440 - nm) / (440 - 380);
    b = 1;
  } else if (nm < 490) {
    g = (nm - 440) / (490 - 440);
    b = 1;
  } else if (nm < 510) {
    g = 1;
    b = (510 - nm) / (510 - 490);
  } else if (nm < 580) {
    g = 1;
    r = (nm - 510) / (580 - 510);
  } else if (nm < 645) {
    r = 1;
    g = (645 - nm) / (645 - 580);
  } else {
    r = 1;
  }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}
function EMSpectrumSlider() {
  const [nm, setNm] = reactExports.useState(486);
  const wavelengthM = nm * 1e-9;
  const freq = 3e8 / wavelengthM;
  const energy = 6626e-37 * freq / 1602e-22;
  const color = nmToRgb(nm);
  const region = EM_REGIONS.find((r) => nm >= r.wMin && nm <= r.wMax) ?? EM_REGIONS[3];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "spectral.em_slider", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative h-10 rounded-full overflow-hidden",
        style: {
          background: "linear-gradient(to right, #6366f1, #8b5cf6, #ef4444, violet, blue, cyan, green, yellow, orange, red, #ef4444)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 flex items-center",
            style: {
              left: `${Math.max(0, Math.min(100, (nm - 350) / 450 * 100))}%`,
              transform: "translateX(-50%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-3 h-10 rounded border-2 border-white",
                style: { background: color, boxShadow: `0 0 12px ${color}` }
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min: 200,
        max: 800,
        value: nm,
        onChange: (e) => setNm(Number(e.target.value)),
        className: "w-full accent-primary",
        "aria-label": "Wavelength slider",
        "data-ocid": "spectral.wavelength_input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Wavelength" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-foreground font-semibold", children: [
          nm,
          " nm"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Frequency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-foreground font-semibold", children: [
          (freq / 1e12).toFixed(2),
          " THz"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Photon Energy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-foreground font-semibold", children: [
          energy.toFixed(3),
          " eV"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg bg-muted/30 p-3",
          style: {
            borderColor: region.color !== "linear" ? region.color : void 0
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Region" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "font-semibold",
                style: { color: region.color !== "linear" ? region.color : color },
                children: region.name
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const SERIES = [
  {
    name: "Lyman",
    n1: 1,
    nMin: 2,
    nMax: 7,
    region: "UV",
    color: "#a855f7",
    transitions: [
      { n2: 2, wl: 121.567, name: "Lyman α" },
      { n2: 3, wl: 102.572, name: "Lyman β" },
      { n2: 4, wl: 97.232, name: "Lyman γ" },
      { n2: 5, wl: 94.974, name: "Lyman δ" },
      { n2: 6, wl: 93.78, name: "Lyman ε" }
    ]
  },
  {
    name: "Balmer",
    n1: 2,
    nMin: 3,
    nMax: 8,
    region: "Visible/UV",
    color: "#ef4444",
    transitions: [
      { n2: 3, wl: 656.279, name: "Hα", visColor: "#ef4444" },
      { n2: 4, wl: 486.134, name: "Hβ", visColor: "#3b82f6" },
      { n2: 5, wl: 434.047, name: "Hγ", visColor: "#8b5cf6" },
      { n2: 6, wl: 410.174, name: "Hδ", visColor: "#6366f1" },
      { n2: 7, wl: 397.007, name: "Hε" }
    ]
  },
  {
    name: "Paschen",
    n1: 3,
    nMin: 4,
    nMax: 9,
    region: "Near IR",
    color: "#f97316",
    transitions: [
      { n2: 4, wl: 1875.1, name: "Paschen α" },
      { n2: 5, wl: 1281.8, name: "Paschen β" },
      { n2: 6, wl: 1093.8, name: "Paschen γ" }
    ]
  },
  {
    name: "Brackett",
    n1: 4,
    nMin: 5,
    nMax: 10,
    region: "Mid IR",
    color: "#f59e0b",
    transitions: [
      { n2: 5, wl: 4051.2, name: "Brackett α" },
      { n2: 6, wl: 2624.6, name: "Brackett β" }
    ]
  },
  {
    name: "Pfund",
    n1: 5,
    nMin: 6,
    nMax: 11,
    region: "Far IR",
    color: "#10b981",
    transitions: [
      { n2: 6, wl: 7457.8, name: "Pfund α" },
      { n2: 7, wl: 4652.3, name: "Pfund β" }
    ]
  },
  {
    name: "Humphreys",
    n1: 6,
    nMin: 7,
    nMax: 12,
    region: "Far IR",
    color: "#06b6d4",
    transitions: [{ n2: 7, wl: 12368, name: "Humphreys α" }]
  }
];
const MAX_N = 7;
const eV_n = (n) => -13.6 / (n * n);
function EnergyLevelDiagram({
  onSelect,
  selected
}) {
  const W = 400;
  const H = 360;
  const leftMargin = 70;
  const rightMargin = 40;
  const topMargin = 20;
  const bottomMargin = 24;
  const drawH = H - topMargin - bottomMargin;
  const drawW = W - leftMargin - rightMargin;
  const eMin = -14;
  const eMax = 0;
  const yE = (eV) => topMargin + drawH * (1 - (eV - eMin) / (eMax - eMin));
  const levels = Array.from({ length: MAX_N }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      className: "w-full",
      style: { maxHeight: 360 },
      "aria-label": "Hydrogen energy level diagram for spectral transitions",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Spectral series diagram" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: W, height: H, fill: "#0a0c14", rx: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: leftMargin,
            y1: topMargin,
            x2: leftMargin + drawW,
            y2: topMargin,
            stroke: "rgba(255,255,255,0.15)",
            strokeWidth: 0.5,
            strokeDasharray: "3 3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: leftMargin - 4,
            y: topMargin + 4,
            fill: "#666",
            fontSize: 9,
            textAnchor: "end",
            children: "0 eV"
          }
        ),
        levels.map((n) => {
          const y = yE(eV_n(n));
          const label = n === 7 ? "n=7 (−0.28 eV)" : `n=${n} (${eV_n(n).toFixed(2)} eV)`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: leftMargin,
                y1: y,
                x2: leftMargin + drawW,
                y2: y,
                stroke: "rgba(255,255,255,0.25)",
                strokeWidth: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: leftMargin - 4,
                y: y + 4,
                fill: "#888",
                fontSize: 9,
                textAnchor: "end",
                children: label
              }
            )
          ] }, n);
        }),
        SERIES.flatMap(
          (series, si) => series.transitions.map((tr, ti) => {
            const x = leftMargin + si * drawW / 6.5 + ti * 12;
            const y1 = yE(eV_n(tr.n2));
            const y2 = yE(eV_n(series.n1));
            const isSelected = (selected == null ? void 0 : selected.n1) === series.n1 && (selected == null ? void 0 : selected.n2) === tr.n2;
            const energy = eV_n(series.n1) - eV_n(tr.n2);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "g",
              {
                className: "cursor-pointer",
                tabIndex: 0,
                "aria-label": `${tr.name}: ${tr.wl} nm, ${Math.abs(energy).toFixed(2)} eV`,
                onKeyDown: (e) => {
                  if (e.key === "Enter")
                    onSelect({
                      n1: series.n1,
                      n2: tr.n2,
                      seriesName: series.name,
                      color: series.color,
                      wl: tr.wl,
                      energy: Math.abs(energy)
                    });
                },
                onClick: () => onSelect({
                  n1: series.n1,
                  n2: tr.n2,
                  seriesName: series.name,
                  color: series.color,
                  wl: tr.wl,
                  energy: Math.abs(energy)
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: x,
                      y1,
                      x2: x,
                      y2,
                      stroke: series.color,
                      strokeWidth: isSelected ? 3 : 1.5,
                      opacity: isSelected ? 1 : 0.6
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polygon",
                    {
                      points: `${x},${y2} ${x - 4},${y2 + 8} ${x + 4},${y2 + 8}`,
                      fill: series.color,
                      opacity: isSelected ? 1 : 0.6
                    }
                  ),
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: x - 20,
                      y: (y1 + y2) / 2 - 8,
                      width: 40,
                      height: 16,
                      rx: 4,
                      fill: series.color,
                      fillOpacity: 0.15
                    }
                  )
                ]
              },
              `${series.name}-${tr.n2}`
            );
          })
        ),
        SERIES.map((series, si) => {
          const x = leftMargin + si * drawW / 6.5;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: x + 8,
              y: H - 6,
              fill: series.color,
              fontSize: 8,
              fontWeight: "bold",
              children: series.name
            },
            series.name
          );
        })
      ]
    }
  );
}
function BalmerSpectrum() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.clientWidth;
    canvas.width = W * (window.devicePixelRatio || 1);
    canvas.height = 80 * (window.devicePixelRatio || 1);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    const H = 80;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    for (let px = 0; px < W; px++) {
      const nm = 380 + px / W * 320;
      ctx.fillStyle = nmToRgb(nm);
      ctx.globalAlpha = 0.6;
      ctx.fillRect(px, 0, 1, H);
    }
    ctx.globalAlpha = 1;
    const balmerLines = [
      { wl: 656.279, label: "Hα", color: "#ef4444", width: 3 },
      { wl: 486.134, label: "Hβ", color: "#3b82f6", width: 2 },
      { wl: 434.047, label: "Hγ", color: "#8b5cf6", width: 2 },
      { wl: 410.174, label: "Hδ", color: "#6366f1", width: 1.5 },
      { wl: 397.007, label: "Hε", color: "#a855f7", width: 1.5 }
    ];
    for (const line of balmerLines) {
      const px = (line.wl - 380) / 320 * W;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = line.width + 1;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, H);
      ctx.stroke();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, H);
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px monospace";
      ctx.globalAlpha = 0.9;
      ctx.fillText(line.label, px - 10, H - 4);
    }
    ctx.globalAlpha = 1;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "380 nm (UV)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "← Visible spectrum →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "700 nm (IR)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "w-full rounded",
        style: { height: 80 },
        "aria-label": "Balmer series spectral lines"
      }
    )
  ] });
}
function RydbergCalculator() {
  const [n1, setN1] = reactExports.useState(2);
  const [n2, setN2] = reactExports.useState(3);
  const R_H = 1097e4;
  const valid = n2 > n1;
  const wavenumber = valid ? R_H * (1 / (n1 * n1) - 1 / (n2 * n2)) : 0;
  const wlNm = valid ? 1e9 / wavenumber : 0;
  const freqTHz = valid ? 3e8 * wavenumber / 1e12 : 0;
  const energyEV = valid ? 6626e-37 * 3e8 * wavenumber / 1602e-22 : 0;
  const seriesMatch = SERIES.find((s) => s.n1 === n1);
  const transMatch = seriesMatch == null ? void 0 : seriesMatch.transitions.find((t) => t.n2 === n2);
  const colorVis = wlNm >= 380 && wlNm <= 700 ? nmToRgb(wlNm) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "spectral.rydberg_calc", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-xs text-muted-foreground mb-1",
            htmlFor: "ryd-n1",
            children: "Lower level n₁"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "ryd-n1",
            type: "number",
            min: 1,
            max: 10,
            value: n1,
            onChange: (e) => setN1(Math.max(1, Number.parseInt(e.target.value) || 1)),
            "data-ocid": "spectral.n1_input",
            className: "w-full rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-xs text-muted-foreground mb-1",
            htmlFor: "ryd-n2",
            children: "Upper level n₂"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "ryd-n2",
            type: "number",
            min: 2,
            max: 20,
            value: n2,
            onChange: (e) => setN2(Math.max(n1 + 1, Number.parseInt(e.target.value) || n1 + 1)),
            "data-ocid": "spectral.n2_input",
            className: "w-full rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] })
    ] }),
    !valid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "n₂ must be greater than n₁" }),
    valid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Wavelength" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "font-mono font-semibold",
                style: colorVis ? { color: colorVis } : {},
                children: [
                  wlNm.toFixed(3),
                  " nm"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Frequency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
              freqTHz.toFixed(3),
              " THz"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Energy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
              energyEV.toFixed(4),
              " eV"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Wavenumber" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
              (wavenumber / 100).toFixed(1),
              " cm⁻¹"
            ] })
          ] }),
          colorVis && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "col-span-2 sm:col-span-4 rounded-lg p-3 flex items-center gap-3",
              style: {
                background: `${colorVis}22`,
                borderColor: colorVis,
                borderWidth: 1
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-full flex-shrink-0",
                    style: {
                      background: colorVis,
                      boxShadow: `0 0 16px ${colorVis}`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground", children: [
                    "Visible light — ",
                    colorVis
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    (seriesMatch == null ? void 0 : seriesMatch.name) ?? "",
                    " series",
                    transMatch ? ` — ${transMatch.name}` : ""
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function EmissionAbsorptionCompare() {
  const lines = [
    { wl: 656.279, label: "Hα" },
    { wl: 486.134, label: "Hβ" },
    { wl: 434.047, label: "Hγ" },
    { wl: 410.174, label: "Hδ" }
  ];
  const pct = (wl) => `${(wl - 380) / 320 * 100}%`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "spectral.emission_absorption", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground mb-1", children: "Emission Spectrum (bright lines on black)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded overflow-hidden",
          style: { height: 48, background: "#000" },
          children: [
            lines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 bottom-0",
                style: {
                  left: pct(line.wl),
                  width: 3,
                  background: nmToRgb(line.wl),
                  boxShadow: `0 0 8px ${nmToRgb(line.wl)}`,
                  transform: "translateX(-50%)"
                },
                title: `${line.label} — ${line.wl} nm`
              },
              line.wl
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 w-full flex justify-around", children: lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-white/70",
                style: {
                  position: "absolute",
                  left: pct(l.wl),
                  transform: "translateX(-50%)"
                },
                children: l.label
              },
              l.wl
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground mb-1", children: "Absorption Spectrum (dark lines on rainbow)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative rounded overflow-hidden",
          style: {
            height: 48,
            background: "linear-gradient(to right, violet, blue, cyan, green, yellow, orange, red)"
          },
          children: lines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 bottom-0",
              style: {
                left: pct(line.wl),
                width: 3,
                background: "#000",
                opacity: 0.9,
                transform: "translateX(-50%)"
              },
              title: `${line.label} — ${line.wl} nm`
            },
            line.wl
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Emission: excited gas emits photons at discrete wavelengths. Absorption: a cooler gas in front of a continuum source absorbs at exactly the same wavelengths — Kirchhoff's law." })
  ] });
}
const ALL_SPECTRAL_LINES = [
  ...SERIES[0].transitions.map((t) => ({
    ...t,
    series: "Lyman",
    color: SERIES[0].color
  })),
  ...SERIES[1].transitions.map((t) => ({
    ...t,
    series: "Balmer",
    color: SERIES[1].color
  })),
  ...SERIES[2].transitions.map((t) => ({
    ...t,
    series: "Paschen",
    color: SERIES[2].color
  })),
  ...SERIES[3].transitions.map((t) => ({
    ...t,
    series: "Brackett",
    color: SERIES[3].color
  })),
  ...SERIES[4].transitions.map((t) => ({
    ...t,
    series: "Pfund",
    color: SERIES[4].color
  })),
  ...SERIES[5].transitions.map((t) => ({
    ...t,
    series: "Humphreys",
    color: SERIES[5].color
  }))
];
function InteractiveSpectrumBar() {
  const [hovered, setHovered] = reactExports.useState(
    null
  );
  const [clicked, setClicked] = reactExports.useState(
    null
  );
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = 120 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const H = 120;
    let anim = 0;
    const draw = () => {
      anim += 0.02;
      ctx.fillStyle = "#0a0c14";
      ctx.fillRect(0, 0, W, H);
      for (let px = 0; px < W; px++) {
        const nm = 380 + px / W * 320;
        ctx.fillStyle = nmToRgb(nm);
        ctx.globalAlpha = 0.08;
        ctx.fillRect(px, 0, 1, H);
      }
      ctx.globalAlpha = 1;
      for (const line of ALL_SPECTRAL_LINES) {
        const px = (line.wl - 380) / 320 * W;
        if (px < 0 || px > W) continue;
        const isHovered = (hovered == null ? void 0 : hovered.name) === line.name;
        const isClicked = (clicked == null ? void 0 : clicked.name) === line.name;
        const glow = isHovered || isClicked;
        const h = glow ? H * 0.85 : H * 0.55;
        const y = (H - h) / 2;
        const w = glow ? 3 : 1.5;
        ctx.shadowColor = line.color;
        ctx.shadowBlur = glow ? 16 : 4;
        ctx.strokeStyle = line.color;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(px, y);
        ctx.lineTo(px, y + h);
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (glow) {
          ctx.fillStyle = "#fff";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(line.name, px, y - 6);
          ctx.fillStyle = line.color;
          ctx.font = "9px monospace";
          ctx.fillText(`${line.wl.toFixed(1)} nm`, px, y + h + 14);
        }
      }
      if (clicked) {
        const px = (clicked.wl - 380) / 320 * W;
        for (let i = 0; i < 5; i++) {
          const yOff = (Math.sin(anim + i * 1.2) + 1) / 2 * H;
          ctx.fillStyle = clicked.color;
          ctx.globalAlpha = 0.6 + 0.4 * Math.sin(anim * 2 + i);
          ctx.beginPath();
          ctx.arc(px, yOff, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(draw);
    };
    const raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [hovered, clicked]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "spectral.interactive_bar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "380 nm (UV)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "← Visible spectrum →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "700 nm (IR)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "w-full rounded cursor-crosshair",
        style: { height: 120 },
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
        },
        tabIndex: 0,
        role: "img",
        onMouseMove: (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          380 + x / rect.width * 320;
          const closest = ALL_SPECTRAL_LINES.reduce(
            (best, line) => {
              const px = (line.wl - 380) / 320 * rect.width;
              const d = Math.abs(px - x);
              return d < best.d ? { line, d } : best;
            },
            { line: ALL_SPECTRAL_LINES[0], d: Number.POSITIVE_INFINITY }
          );
          setHovered(closest.d < 12 ? closest.line : null);
        },
        onMouseLeave: () => setHovered(null),
        onClick: () => setClicked((c) => (c == null ? void 0 : c.name) === (hovered == null ? void 0 : hovered.name) ? null : hovered),
        "aria-label": "Interactive hydrogen spectral lines bar"
      }
    ),
    clicked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        className: "rounded-lg border border-border bg-muted/20 p-3 space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-3 h-3 rounded-full",
                style: {
                  background: clicked.color,
                  boxShadow: `0 0 8px ${clicked.color}`
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: clicked.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              clicked.series,
              " series)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "Wavelength: ",
            clicked.wl.toFixed(3),
            " nm · Energy:",
            " ",
            (1240 / clicked.wl).toFixed(4),
            " eV"
          ] })
        ]
      }
    )
  ] });
}
function SpectralSeries() {
  const [selectedTransition, setSelectedTransition] = reactExports.useState(null);
  const [activeSeries, setActiveSeries] = reactExports.useState("Balmer");
  const handleTransitionSelect = reactExports.useCallback((t) => {
    setSelectedTransition(t);
    setActiveSeries(t.seriesName);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PageHeader,
          {
            title: "Atomic Spectra & Spectral Series",
            subtitle: "From the electromagnetic spectrum to hydrogen's spectral series — interactive energy level diagrams, Rydberg formula calculator, emission vs absorption spectra, and real-world spectroscopy applications.",
            audienceLevel: "intermediate",
            readTimeMin: 16
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "spectral.em_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "The Electromagnetic Spectrum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EMSpectrumSlider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-4", children: EM_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg bg-muted/20 p-2 text-center border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-xs font-semibold",
                    style: { color: r.color !== "linear" ? r.color : "#e879f9" },
                    children: r.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: r.energy })
              ]
            },
            r.name
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              label: "Photon Energy",
              latex: "E = h\\\\nu = \\\\frac{hc}{\\\\lambda}",
              annotation: "E is photon energy, h = 6.626×10⁻³⁴ J·s (Planck's constant), ν is frequency, c = 3×10⁸ m/s, λ is wavelength. Higher frequency = shorter wavelength = more energy."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "spectral.energy_diagram", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Hydrogen Energy Levels & Transitions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Click any transition arrow to see wavelength, energy, and series details." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnergyLevelDiagram,
              {
                onSelect: handleTransitionSelect,
                selected: selectedTransition
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "spectral.transition_inspector", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-3", children: "Transition Inspector" }),
              selectedTransition ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  className: "space-y-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-lg p-3 text-center",
                        style: {
                          background: `${selectedTransition.color}22`,
                          borderColor: selectedTransition.color,
                          borderWidth: 1
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "font-display text-xl font-bold",
                              style: { color: selectedTransition.color },
                              children: selectedTransition.seriesName
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                            "n = ",
                            selectedTransition.n2,
                            " → n = ",
                            selectedTransition.n1
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Wavelength" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          selectedTransition.wl.toFixed(3),
                          " nm"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Energy" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          selectedTransition.energy.toFixed(4),
                          " eV"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Wavenumber" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          (1e7 / selectedTransition.wl).toFixed(1),
                          " cm⁻¹"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded p-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Frequency" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          (3e8 / (selectedTransition.wl * 1e-9) / 1e12).toFixed(2),
                          " ",
                          "THz"
                        ] })
                      ] })
                    ] }),
                    selectedTransition.wl >= 380 && selectedTransition.wl <= 700 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-lg p-3 flex items-center gap-2",
                        style: {
                          background: `${nmToRgb(selectedTransition.wl)}33`
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-6 h-6 rounded-full flex-shrink-0",
                              style: {
                                background: nmToRgb(selectedTransition.wl),
                                boxShadow: `0 0 12px ${nmToRgb(selectedTransition.wl)}`
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Visible light" })
                        ]
                      }
                    )
                  ]
                },
                `${selectedTransition.n1}-${selectedTransition.n2}`
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "spectral.transition_empty_state",
                  className: "text-center py-8 text-muted-foreground text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: "⚡" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Click a transition arrow in the diagram to inspect it" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "spectral.series_selector", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-3", children: "Spectral Series" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: SERIES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `spectral.series_btn.${s.name.toLowerCase()}`,
                  onClick: () => setActiveSeries(s.name),
                  className: `w-full text-left rounded-lg px-3 py-2 text-sm transition-all border ${activeSeries === s.name ? "border-current bg-muted/40" : "border-transparent hover:bg-muted/20 text-muted-foreground"}`,
                  style: {
                    color: s.color,
                    borderColor: activeSeries === s.name ? s.color : void 0
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      "n→",
                      s.n1,
                      " · ",
                      s.region
                    ] })
                  ]
                },
                s.name
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "spectral.balmer_spectrum", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Balmer Series — Visible Hydrogen Spectrum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BalmerSpectrum, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3", children: SERIES[1].transitions.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded bg-muted/30 p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "font-mono text-sm font-semibold",
                style: {
                  color: t.wl >= 380 && t.wl <= 700 ? nmToRgb(t.wl) : "#aaa"
                },
                children: [
                  t.wl.toFixed(1),
                  " nm"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.name })
          ] }, t.n2)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "spectral.interactive_spectrum", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Interactive Hydrogen Spectrum Bar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Hover over the spectrum to identify lines. Click a line to lock it and see photon emission animation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InteractiveSpectrumBar, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "spectral-rydberg",
            title: "Rydberg Formula Calculator",
            defaultOpen: true,
            "data-ocid": "spectral.rydberg_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Calculate wavelength, frequency, energy, and wavenumber for any hydrogen transition." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RydbergCalculator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Rydberg Formula",
                  latex: "\\\\frac{1}{\\\\lambda} = R_H \\\\left(\\\\frac{1}{n_1^2} - \\\\frac{1}{n_2^2}\\\\right)",
                  annotation: "R_H = 1.097 × 10⁷ m⁻¹ is the Rydberg constant for hydrogen. n₁ is the lower level, n₂ > n₁ is the upper level. Originally empirical (Rydberg, 1888); later derived from quantum mechanics."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Energy Levels (Bohr model)",
                  latex: "E_n = -\\\\frac{13.6\\\\,\\\\text{eV}}{n^2} = -\\\\frac{m_e e^4}{8\\\\epsilon_0^2 h^2 n^2}",
                  annotation: "The Bohr model predicts discrete energy levels E_n. Photon energy equals |E_n₂ − E_n₁|. For n→∞, E→0 (ionization threshold)."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Balmer Series (original formula, 1885)",
                  latex: "\\\\lambda = B\\\\cdot\\\\frac{n^2}{n^2 - 4}, \\\\quad B = 364.56\\\\,\\\\text{nm}",
                  annotation: "Balmer's empirical formula (1885) — predated quantum mechanics. It matched the visible hydrogen lines for n = 3, 4, 5, 6. The Rydberg formula generalized this to all series."
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CollapsibleSection,
          {
            id: "spectral-ea",
            title: "Emission vs Absorption Spectra",
            defaultOpen: true,
            "data-ocid": "spectral.emission_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmissionAbsorptionCompare, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "spectral-applications",
            title: "Real-World Spectroscopy Applications",
            "data-ocid": "spectral.applications_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-2", children: [
                {
                  title: "Stellar Classification",
                  color: "#f97316",
                  body: "The Harvard spectral classification (OBAFGKM) uses absorption line patterns to classify stars by surface temperature. The Sun (G-type) shows ~5780 K blackbody + Fraunhofer absorption lines from the photosphere and chromosphere. Hydrogen Balmer lines are strongest in A-type stars (~10,000 K)."
                },
                {
                  title: "Nebula Composition",
                  color: "#a855f7",
                  body: "Emission nebulae (e.g., Orion, Crab) glow from excited gas ionized by nearby hot stars. The characteristic red color is H-alpha (656.3 nm), green from [O III] at 495.9/500.7 nm, and blue from [O II]. Spectroscopic maps reveal composition, temperature, and density."
                },
                {
                  title: "Medical Spectroscopy",
                  color: "#10b981",
                  body: "Atomic absorption spectroscopy (AAS) measures trace metals in blood (lead, mercury, iron). Near-infrared (NIR) spectroscopy enables non-invasive blood glucose monitoring. MRI uses NMR spectroscopy (hydrogen nuclei) for tissue contrast. LIBS is used for in-situ elemental analysis in surgery."
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/20 p-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h4",
                      {
                        className: "font-display font-semibold mb-2",
                        style: { color: item.color },
                        children: item.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.body })
                  ]
                },
                item.title
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 5 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 6 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 7 })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "spectral-advanced",
            title: "Fine Structure, Selection Rules & Beyond",
            "data-ocid": "spectral.advanced_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "professional" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The simple Bohr/Rydberg model ignores spin-orbit coupling, relativistic corrections, and quantum electrodynamic (QED) effects. These produce fine structure — splitting of spectral lines. The Hα line actually consists of 7 closely-spaced transitions." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'Electric dipole selection rules restrict allowed transitions: Δl = ±1, Δm = 0, ±1, Δs = 0. Transitions violating these are "forbidden" but occur weakly via magnetic dipole or electric quadrupole. Forbidden lines from [O III], [N II] in nebulae require very low densities (≪ atmospheric) for collisional de-excitation to be slow enough.' }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Lamb shift (1947, Nobel 1955) — a tiny splitting of 2s₁/₂ and 2p₁/₂ states in hydrogen — confirmed QED. The Casimir-Polder and vacuum fluctuation effects contribute ~1058 MHz to the 2s energy." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Fine Structure Constant",
                    latex: "\\\\alpha = \\\\frac{e^2}{4\\\\pi\\\\varepsilon_0\\\\hbar c} = \\\\frac{1}{137.036} \\\\approx 7.297 \\\\times 10^{-3}",
                    annotation: "The dimensionless fine-structure constant α characterizes the strength of the electromagnetic interaction. It sets the scale of all fine-structure (spin–orbit) splittings and appears in the Lamb shift, hyperfine structure, and QED corrections throughout atomic physics."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Fine Structure Energy Correction",
                    latex: "E_{nj} = E_n \\\\left[1 + \\\\frac{\\\\alpha^2}{n^2}\\\\left(\\\\frac{n}{j+\\\\frac{1}{2}} - \\\\frac{3}{4}\\\\right)\\\\right]",
                    annotation: "α ≈ 1/137 is the fine-structure constant. j is the total angular momentum quantum number. This Dirac-derived correction splits degenerate l-levels, producing fine structure doublets. For hydrogen, fine-structure splittings are of order α²E_n."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Rydberg Constant in cm⁻¹",
                    latex: "R_\\\\infty = \\\\frac{m_e e^4}{8\\\\varepsilon_0^2 h^3 c} = 1.097\\\\,373 \\\\times 10^7\\\\,\\\\text{m}^{-1} = 109\\\\,737.3\\\\,\\\\text{cm}^{-1}",
                    annotation: "The Rydberg constant R∞ (in units of m⁻¹ or cm⁻¹) is the most precisely measured fundamental constant. The wavenumber of any hydrogen transition is ν̃ = R∞(1/n₁² − 1/n₂²) cm⁻¹."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 8 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 9 })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  SpectralSeries as default
};
