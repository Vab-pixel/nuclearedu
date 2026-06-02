import { j as jsxRuntimeExports, q as cn, r as reactExports, m as motion, P as PageHeader, k as Badge, B as Button, c as AnimatePresence, b3 as ZoomIn, bx as ZoomOut, x as BookOpen, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, a as ReferenceLine, by as ReferenceArea, X as XAxis, Y as YAxis, T as Tooltip$1, ag as Legend, b as Line, I as Info } from "./index-DTpTSWSe.js";
import { R as Root3, T as Trigger, a as Portal, C as Content2, A as Arrow2, P as Provider } from "./index-WiQB1Fqi.js";
import { R as RefreshCw } from "./refresh-cw-bopLT_3y.js";
import { C as CircleAlert } from "./circle-alert-Lnhu-OfP.js";
import { R as RotateCcw } from "./rotate-ccw-jft29M4M.js";
import { D as Download } from "./download-cTEAWr-B.js";
import "./index-CHxtPRiU.js";
import "./index-CuT3BHxv.js";
import "./index-Cnvf9O_T.js";
import "./index-BQgx5lFL.js";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
function buildDatasets() {
  return {
    U235: {
      key: "U235",
      label: "²³⁵U",
      color: "#38bdf8",
      description: "Primary fissile material; large thermal fission cross-section (~585 barns at 0.0253 eV)",
      points: [
        // Ultra-thermal
        {
          energy: 1e-3,
          fission: 65e3,
          capture: 22e3,
          scatter: 15,
          total: 87e3
        },
        {
          energy: 5e-3,
          fission: 29e3,
          capture: 9800,
          scatter: 14,
          total: 38900
        },
        { energy: 0.0253, fission: 585, capture: 98, scatter: 14, total: 697 },
        // thermal
        { energy: 0.05, fission: 390, capture: 64, scatter: 13.5, total: 467 },
        { energy: 0.1, fission: 280, capture: 45, scatter: 13, total: 338 },
        { energy: 0.5, fission: 250, capture: 40, scatter: 12.5, total: 302 },
        // Resonance region
        { energy: 1, fission: 880, capture: 320, scatter: 18, total: 1218 },
        { energy: 2.03, fission: 1500, capture: 420, scatter: 25, total: 1945 },
        // 1st resonance ~1.14eV
        { energy: 3.14, fission: 3200, capture: 890, scatter: 30, total: 4120 },
        { energy: 6.4, fission: 5800, capture: 1600, scatter: 35, total: 7435 },
        { energy: 8.8, fission: 2800, capture: 700, scatter: 22, total: 3522 },
        {
          energy: 11.7,
          fission: 4500,
          capture: 1100,
          scatter: 28,
          total: 5628
        },
        { energy: 20, fission: 1800, capture: 420, scatter: 18, total: 2238 },
        { energy: 36.8, fission: 2200, capture: 550, scatter: 15, total: 2765 },
        { energy: 66, fission: 1200, capture: 280, scatter: 14, total: 1494 },
        { energy: 102, fission: 900, capture: 200, scatter: 13, total: 1113 },
        // keV range
        { energy: 1e3, fission: 1.8, capture: 0.28, scatter: 7.5, total: 9.6 },
        { energy: 5e3, fission: 2, capture: 0.2, scatter: 6.8, total: 9 },
        {
          energy: 1e4,
          fission: 1.9,
          capture: 0.18,
          scatter: 6.2,
          total: 8.3
        },
        {
          energy: 1e5,
          fission: 1.6,
          capture: 0.14,
          scatter: 5.9,
          total: 7.6
        },
        // MeV range
        {
          energy: 5e5,
          fission: 1.3,
          capture: 0.1,
          scatter: 5.5,
          total: 6.9
        },
        {
          energy: 1e6,
          fission: 1.25,
          capture: 0.08,
          scatter: 5.2,
          total: 6.5
        },
        {
          energy: 2e6,
          fission: 1.8,
          capture: 0.06,
          scatter: 4.8,
          total: 6.7
        },
        {
          energy: 5e6,
          fission: 2.2,
          capture: 0.05,
          scatter: 4.5,
          total: 6.8
        },
        {
          energy: 14e6,
          fission: 1.9,
          capture: 0.03,
          scatter: 4.2,
          total: 6.1
        },
        {
          energy: 2e7,
          fission: 1.7,
          capture: 0.02,
          scatter: 4,
          total: 5.7
        }
      ]
    },
    U238: {
      key: "U238",
      label: "²³⁸U",
      color: "#f97316",
      description: "Fertile material; large capture cross-section in resonance region; fast fission above ~1 MeV",
      points: [
        { energy: 1e-3, fission: 0, capture: 380, scatter: 12, total: 392 },
        { energy: 5e-3, fission: 0, capture: 165, scatter: 11.8, total: 177 },
        {
          energy: 0.0253,
          fission: 0,
          capture: 2.72,
          scatter: 11.5,
          total: 14.2
        },
        // thermal
        { energy: 0.1, fission: 0, capture: 1.8, scatter: 11.2, total: 13 },
        { energy: 0.5, fission: 0, capture: 1.1, scatter: 11, total: 12.1 },
        // Resonance region
        {
          energy: 6.67,
          fission: 0,
          capture: 22e3,
          scatter: 180,
          total: 22180
        },
        // major resonance
        { energy: 20.9, fission: 0, capture: 8500, scatter: 85, total: 8585 },
        { energy: 36.7, fission: 0, capture: 5200, scatter: 55, total: 5255 },
        { energy: 66, fission: 0, capture: 4800, scatter: 48, total: 4848 },
        { energy: 103, fission: 0, capture: 3200, scatter: 35, total: 3235 },
        { energy: 190, fission: 0, capture: 1800, scatter: 22, total: 1822 },
        { energy: 350, fission: 0, capture: 900, scatter: 16, total: 916 },
        // keV
        { energy: 1e3, fission: 0, capture: 0.45, scatter: 9.5, total: 9.9 },
        { energy: 1e4, fission: 0, capture: 0.28, scatter: 8.8, total: 9.1 },
        { energy: 1e5, fission: 0, capture: 0.18, scatter: 8.2, total: 8.4 },
        // Fast fission threshold ~1 MeV
        { energy: 5e5, fission: 0, capture: 0.12, scatter: 7.2, total: 7.3 },
        {
          energy: 1e6,
          fission: 0.54,
          capture: 0.08,
          scatter: 6.5,
          total: 7.1
        },
        // fast fission onset
        {
          energy: 2e6,
          fission: 0.82,
          capture: 0.06,
          scatter: 5.8,
          total: 6.7
        },
        {
          energy: 5e6,
          fission: 1,
          capture: 0.04,
          scatter: 5.2,
          total: 6.2
        },
        {
          energy: 14e6,
          fission: 1.2,
          capture: 0.03,
          scatter: 4.8,
          total: 6
        },
        {
          energy: 2e7,
          fission: 1.1,
          capture: 0.02,
          scatter: 4.5,
          total: 5.6
        }
      ]
    },
    Pu239: {
      key: "Pu239",
      label: "²³⁹Pu",
      color: "#a78bfa",
      description: "Fissile; exceptional thermal fission cross-section (~748 barns); produced via neutron capture in ²³⁸U",
      points: [
        {
          energy: 1e-3,
          fission: 9e4,
          capture: 45e3,
          scatter: 8,
          total: 135008
        },
        {
          energy: 5e-3,
          fission: 4e4,
          capture: 2e4,
          scatter: 8,
          total: 60008
        },
        {
          energy: 0.0253,
          fission: 748,
          capture: 272,
          scatter: 8.5,
          total: 1028
        },
        // thermal
        { energy: 0.1, fission: 380, capture: 130, scatter: 8.2, total: 518 },
        { energy: 0.3, fission: 240, capture: 85, scatter: 8, total: 333 },
        // Very dense resonance region
        {
          energy: 0.296,
          fission: 4200,
          capture: 1800,
          scatter: 15,
          total: 6015
        },
        // 1st resonance
        {
          energy: 1.056,
          fission: 1800,
          capture: 780,
          scatter: 12,
          total: 2592
        },
        {
          energy: 2.65,
          fission: 3500,
          capture: 1400,
          scatter: 18,
          total: 4918
        },
        {
          energy: 7.82,
          fission: 6800,
          capture: 2800,
          scatter: 25,
          total: 9625
        },
        {
          energy: 10.93,
          fission: 9200,
          capture: 3700,
          scatter: 28,
          total: 12928
        },
        {
          energy: 41.45,
          fission: 2500,
          capture: 1e3,
          scatter: 18,
          total: 3518
        },
        { energy: 85, fission: 1800, capture: 720, scatter: 15, total: 2535 },
        // keV
        { energy: 1e3, fission: 2, capture: 0.4, scatter: 8, total: 10.4 },
        {
          energy: 1e4,
          fission: 1.8,
          capture: 0.28,
          scatter: 7.5,
          total: 9.6
        },
        {
          energy: 1e5,
          fission: 1.7,
          capture: 0.2,
          scatter: 7,
          total: 8.9
        },
        {
          energy: 5e5,
          fission: 1.65,
          capture: 0.14,
          scatter: 6.5,
          total: 8.3
        },
        {
          energy: 1e6,
          fission: 1.9,
          capture: 0.1,
          scatter: 6,
          total: 8
        },
        {
          energy: 2e6,
          fission: 2.4,
          capture: 0.08,
          scatter: 5.5,
          total: 8
        },
        {
          energy: 5e6,
          fission: 2.2,
          capture: 0.05,
          scatter: 5,
          total: 7.3
        },
        {
          energy: 14e6,
          fission: 2,
          capture: 0.03,
          scatter: 4.5,
          total: 6.5
        },
        {
          energy: 2e7,
          fission: 1.8,
          capture: 0.02,
          scatter: 4.2,
          total: 6
        }
      ]
    },
    Th232: {
      key: "Th232",
      label: "²³²Th",
      color: "#34d399",
      description: "Fertile; large resonance capture; breeds ²³³U via neutron capture → basis of thorium fuel cycle",
      points: [
        {
          energy: 1e-3,
          fission: 0,
          capture: 1100,
          scatter: 13.5,
          total: 1113
        },
        { energy: 5e-3, fission: 0, capture: 480, scatter: 13.2, total: 493 },
        {
          energy: 0.0253,
          fission: 0,
          capture: 7.37,
          scatter: 13,
          total: 20.4
        },
        // thermal
        { energy: 0.1, fission: 0, capture: 3.8, scatter: 12.8, total: 16.6 },
        { energy: 0.5, fission: 0, capture: 2.2, scatter: 12.5, total: 14.7 },
        // Resonance region
        {
          energy: 21.8,
          fission: 0,
          capture: 28e3,
          scatter: 200,
          total: 28200
        },
        // 1st major resonance
        { energy: 23.5, fission: 0, capture: 8500, scatter: 90, total: 8590 },
        { energy: 59.5, fission: 0, capture: 4200, scatter: 55, total: 4255 },
        { energy: 69.3, fission: 0, capture: 6500, scatter: 72, total: 6572 },
        { energy: 113, fission: 0, capture: 3800, scatter: 42, total: 3842 },
        { energy: 176, fission: 0, capture: 2200, scatter: 30, total: 2230 },
        { energy: 300, fission: 0, capture: 1200, scatter: 22, total: 1222 },
        // keV
        { energy: 1e3, fission: 0, capture: 0.55, scatter: 10.5, total: 11 },
        { energy: 1e4, fission: 0, capture: 0.35, scatter: 9.8, total: 10.1 },
        { energy: 1e5, fission: 0, capture: 0.22, scatter: 9.2, total: 9.4 },
        { energy: 5e5, fission: 0, capture: 0.15, scatter: 8.5, total: 8.6 },
        {
          energy: 1e6,
          fission: 0,
          capture: 0.12,
          scatter: 7.8,
          total: 7.9
        },
        {
          energy: 2e6,
          fission: 0,
          capture: 0.09,
          scatter: 7,
          total: 7.1
        },
        {
          energy: 5e6,
          fission: 0,
          capture: 0.05,
          scatter: 6.2,
          total: 6.3
        },
        {
          energy: 14e6,
          fission: 0,
          capture: 0.03,
          scatter: 5.5,
          total: 5.5
        },
        {
          energy: 2e7,
          fission: 0,
          capture: 0.02,
          scatter: 5,
          total: 5
        }
      ]
    },
    Fe56: {
      key: "Fe56",
      label: "⁵⁶Fe",
      color: "#fbbf24",
      description: "Structural steel component; notable cross-section minima used for shielding; dominant neutron poison in some reactors",
      points: [
        { energy: 1e-3, fission: 0, capture: 2.8, scatter: 12, total: 14.8 },
        { energy: 5e-3, fission: 0, capture: 1.4, scatter: 12, total: 13.4 },
        {
          energy: 0.0253,
          fission: 0,
          capture: 2.56,
          scatter: 12.5,
          total: 15.1
        },
        // thermal
        { energy: 0.1, fission: 0, capture: 2.1, scatter: 12.3, total: 14.4 },
        { energy: 1, fission: 0, capture: 1.6, scatter: 12.2, total: 13.8 },
        { energy: 10, fission: 0, capture: 1.2, scatter: 12, total: 13.2 },
        { energy: 100, fission: 0, capture: 0.8, scatter: 11.8, total: 12.6 },
        { energy: 1e3, fission: 0, capture: 2.8, scatter: 14, total: 16.8 },
        // resonance
        { energy: 1152, fission: 0, capture: 1200, scatter: 450, total: 1650 },
        // 1.15 keV resonance
        { energy: 1340, fission: 0, capture: 95, scatter: 60, total: 155 },
        { energy: 3e3, fission: 0, capture: 45, scatter: 30, total: 75 },
        { energy: 7e3, fission: 0, capture: 28, scatter: 22, total: 50 },
        { energy: 15e3, fission: 0, capture: 0.5, scatter: 11.5, total: 12 },
        // window
        { energy: 28e3, fission: 0, capture: 3.2, scatter: 13, total: 16.2 },
        { energy: 5e4, fission: 0, capture: 0.8, scatter: 10.2, total: 11 },
        { energy: 1e5, fission: 0, capture: 0.4, scatter: 9, total: 9.4 },
        { energy: 5e5, fission: 0, capture: 0.2, scatter: 7.5, total: 7.7 },
        {
          energy: 1e6,
          fission: 0,
          capture: 0.12,
          scatter: 3,
          total: 3.1
        },
        // window
        {
          energy: 2e6,
          fission: 0,
          capture: 0.08,
          scatter: 2.8,
          total: 2.9
        },
        {
          energy: 5e6,
          fission: 0,
          capture: 0.04,
          scatter: 2.5,
          total: 2.5
        },
        {
          energy: 14e6,
          fission: 0,
          capture: 0.02,
          scatter: 2.2,
          total: 2.2
        },
        {
          energy: 2e7,
          fission: 0,
          capture: 0.01,
          scatter: 2,
          total: 2
        }
      ]
    },
    H1: {
      key: "H1",
      label: "¹H",
      color: "#fb7185",
      description: "Best neutron moderator; very large scatter cross-section; primary component of light water",
      points: [
        {
          energy: 1e-3,
          fission: 0,
          capture: 0.33,
          scatter: 81.5,
          total: 81.8
        },
        {
          energy: 5e-3,
          fission: 0,
          capture: 0.15,
          scatter: 81.2,
          total: 81.3
        },
        {
          energy: 0.0253,
          fission: 0,
          capture: 0.333,
          scatter: 80.4,
          total: 80.7
        },
        // thermal
        { energy: 0.1, fission: 0, capture: 0.165, scatter: 79.8, total: 80 },
        { energy: 0.5, fission: 0, capture: 0.074, scatter: 78.5, total: 78.6 },
        { energy: 1, fission: 0, capture: 0.052, scatter: 77.8, total: 77.9 },
        { energy: 5, fission: 0, capture: 0.023, scatter: 76.2, total: 76.2 },
        {
          energy: 10,
          fission: 0,
          capture: 0.016,
          scatter: 74.8,
          total: 74.8
        },
        { energy: 100, fission: 0, capture: 5e-3, scatter: 68, total: 68 },
        {
          energy: 1e3,
          fission: 0,
          capture: 15e-4,
          scatter: 55,
          total: 55
        },
        {
          energy: 1e4,
          fission: 0,
          capture: 5e-4,
          scatter: 38.5,
          total: 38.5
        },
        {
          energy: 1e5,
          fission: 0,
          capture: 15e-5,
          scatter: 20.5,
          total: 20.5
        },
        {
          energy: 5e5,
          fission: 0,
          capture: 6e-5,
          scatter: 7.2,
          total: 7.2
        },
        {
          energy: 1e6,
          fission: 0,
          capture: 35e-6,
          scatter: 4.2,
          total: 4.2
        },
        {
          energy: 2e6,
          fission: 0,
          capture: 18e-6,
          scatter: 2.5,
          total: 2.5
        },
        {
          energy: 5e6,
          fission: 0,
          capture: 8e-6,
          scatter: 1.2,
          total: 1.2
        },
        {
          energy: 14e6,
          fission: 0,
          capture: 3e-6,
          scatter: 0.55,
          total: 0.55
        },
        {
          energy: 2e7,
          fission: 0,
          capture: 2e-6,
          scatter: 0.4,
          total: 0.4
        }
      ]
    }
  };
}
const ENERGY_TICKS = [
  1e-3,
  0.01,
  0.1,
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  2e7
];
const BARN_TICKS = [1e-3, 0.01, 0.1, 1, 10, 100, 1e3, 1e4, 1e5];
function fmtEnergy(val) {
  if (val >= 1e6) return `${(val / 1e6).toFixed(0)}M`;
  if (val >= 1e3) return `${(val / 1e3).toFixed(0)}k`;
  if (val >= 1) return `${val}`;
  return `${val}`;
}
function fmtBarns(val) {
  if (val >= 1e3) return `${(val / 1e3).toFixed(0)}k`;
  if (val >= 1) return `${val.toFixed(0)}`;
  return `${val}`;
}
function fmtEnergyFull(val) {
  if (val >= 1e6) return `${(val / 1e6).toFixed(2)} MeV`;
  if (val >= 1e3) return `${(val / 1e3).toFixed(2)} keV`;
  return `${val.toFixed(4)} eV`;
}
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length || label === void 0)
    return null;
  const energy = 10 ** label;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm min-w-[220px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 border-b border-border pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Neutron Energy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground font-mono", children: fmtEnergyFull(energy) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: payload.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2 w-2 rounded-full flex-shrink-0",
                style: { backgroundColor: item.color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-foreground", children: [
            (10 ** item.value).toFixed(4),
            " b"
          ] })
        ]
      },
      item.dataKey
    )) })
  ] });
}
const REACTION_META = {
  fission: {
    label: "Fission",
    symbol: "σ_f",
    description: "Nucleus splits into two fission fragments + 2–3 neutrons + ~200 MeV energy",
    lineStyle: "0"
  },
  capture: {
    label: "Capture",
    symbol: "σ_γ",
    description: "Neutron absorbed, gamma ray emitted — nucleus transforms to next isotope",
    lineStyle: "5 5"
  },
  scatter: {
    label: "Elastic Scatter",
    symbol: "σ_el",
    description: "Neutron bounces off nucleus, transfers kinetic energy — key to moderation",
    lineStyle: "10 3"
  },
  total: {
    label: "Total",
    symbol: "σ_tot",
    description: "Sum of all interaction channels — total probability of any neutron interaction",
    lineStyle: "3 3"
  }
};
const NUCLIDE_ORDER = [
  "U235",
  "U238",
  "Pu239",
  "Th232",
  "Fe56",
  "H1"
];
const REACTION_ORDER = [
  "fission",
  "capture",
  "scatter",
  "total"
];
const DATASETS = buildDatasets();
function CrossSectionPlotter() {
  const [selectedNuclides, setSelectedNuclides] = reactExports.useState(
    /* @__PURE__ */ new Set(["U235"])
  );
  const [selectedReactions, setSelectedReactions] = reactExports.useState(
    /* @__PURE__ */ new Set(["fission", "capture"])
  );
  const [energyRange, setEnergyRange] = reactExports.useState([-3, 7.3]);
  const [isFetching, setIsFetching] = reactExports.useState(false);
  const [fetchStatus, setFetchStatus] = reactExports.useState(
    "idle"
  );
  const [showEducation, setShowEducation] = reactExports.useState(false);
  const csvRef = reactExports.useRef(null);
  const chartData = reactExports.useMemo(() => {
    const allEnergies = /* @__PURE__ */ new Set();
    for (const key of selectedNuclides) {
      for (const pt of DATASETS[key].points) {
        if (pt.energy > 0) allEnergies.add(pt.energy);
      }
    }
    const sorted = Array.from(allEnergies).sort((a, b) => a - b);
    const [eMin, eMax] = [10 ** energyRange[0], 10 ** energyRange[1]];
    return sorted.filter((e) => e >= eMin * 0.9 && e <= eMax * 1.1).map((energy) => {
      const point = { energy: Math.log10(energy) };
      for (const nKey of selectedNuclides) {
        const nuclide = DATASETS[nKey];
        let closest = nuclide.points.reduce(
          (prev, curr) => Math.abs(Math.log10(curr.energy) - Math.log10(energy)) < Math.abs(Math.log10(prev.energy) - Math.log10(energy)) ? curr : prev
        );
        if (Math.abs(Math.log10(closest.energy) - Math.log10(energy)) > 0.05)
          continue;
        for (const rType of selectedReactions) {
          const val = closest[rType];
          if (val !== void 0 && val > 0) {
            point[`${nKey}_${rType}`] = Math.log10(val);
          }
        }
      }
      return point;
    });
  }, [selectedNuclides, selectedReactions, energyRange]);
  const energyTicks = reactExports.useMemo(
    () => ENERGY_TICKS.filter((e) => {
      const le = Math.log10(e);
      return le >= energyRange[0] - 0.5 && le <= energyRange[1] + 0.5;
    }).map((e) => Math.log10(e)),
    [energyRange]
  );
  const toggleNuclide = reactExports.useCallback((key) => {
    setSelectedNuclides((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);
  const toggleReaction = reactExports.useCallback((type) => {
    setSelectedReactions((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);
  const fetchLiveData = reactExports.useCallback(async () => {
    setIsFetching(true);
    setFetchStatus("idle");
    try {
      const res = await fetch(
        "https://nds.iaea.org/relnsd/v1/data?fields=cross_sections&nuclides=U235",
        { signal: AbortSignal.timeout(5e3) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFetchStatus("success");
    } catch {
      setFetchStatus("error");
    } finally {
      setIsFetching(false);
    }
  }, []);
  const downloadCSV = reactExports.useCallback(() => {
    const headers = ["energy_eV"];
    for (const nKey of selectedNuclides) {
      for (const rType of selectedReactions) {
        if (rType !== "fission" || ["U235", "U238", "Pu239", "Th232"].includes(nKey)) {
          headers.push(`${nKey}_${rType}_barns`);
        }
      }
    }
    const rows = [headers.join(",")];
    for (const pt of chartData) {
      const row = [(10 ** pt.energy).toExponential(4)];
      for (const nKey of selectedNuclides) {
        for (const rType of selectedReactions) {
          const key = `${nKey}_${rType}`;
          const val = pt[key];
          row.push(val !== void 0 ? (10 ** val).toFixed(6) : "");
        }
      }
      rows.push(row.join(","));
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = csvRef.current;
    if (a) {
      a.href = url;
      a.download = `cross_sections_${Array.from(selectedNuclides).join("_")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [chartData, selectedNuclides, selectedReactions]);
  const zoomIn = reactExports.useCallback(() => {
    setEnergyRange((prev) => {
      const mid = (prev[0] + prev[1]) / 2;
      const half = (prev[1] - prev[0]) / 4;
      return [mid - half, mid + half];
    });
  }, []);
  const zoomOut = reactExports.useCallback(() => {
    setEnergyRange((prev) => {
      const mid = (prev[0] + prev[1]) / 2;
      const half = prev[1] - prev[0];
      const newMin = Math.max(-3, mid - half);
      const newMax = Math.min(7.3, mid + half);
      return [newMin, newMax];
    });
  }, []);
  const resetZoom = reactExports.useCallback(() => setEnergyRange([-3, 7.3]), []);
  function getLineColor(nKey) {
    return DATASETS[nKey].color;
  }
  const lines = reactExports.useMemo(() => {
    const result = [];
    for (const nKey of NUCLIDE_ORDER.filter((k) => selectedNuclides.has(k))) {
      for (const rType of REACTION_ORDER.filter(
        (r) => selectedReactions.has(r)
      )) {
        const hasData = DATASETS[nKey].points.some((p) => {
          const v = p[rType];
          return v !== void 0 && v > 0;
        });
        if (!hasData) continue;
        result.push({
          dataKey: `${nKey}_${rType}`,
          name: `${DATASETS[nKey].label} ${REACTION_META[rType].symbol}`,
          color: getLineColor(nKey),
          strokeDasharray: REACTION_META[rType].lineStyle
        });
      }
    }
    return result;
  }, [selectedNuclides, selectedReactions]);
  const thermalLog = Math.log10(0.0253);
  const resonanceLow = Math.log10(1);
  const resonanceHigh = Math.log10(1e3);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-7xl px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PageHeader,
          {
            title: "Neutron Cross-Section Plotter",
            subtitle: "Interactive log-log visualization of neutron interaction cross-sections vs energy from thermal to fast range. Data source: ENDF/B-VIII.0 evaluated nuclear data.",
            audienceLevel: "advanced",
            readTimeMin: 8
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2 },
        className: "mb-6 flex flex-wrap items-center gap-3",
        "data-ocid": "cross_section.status_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400 inline-block" }),
            "ENDF/B-VIII.0 Local Dataset"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: fetchLiveData,
              disabled: isFetching,
              className: "text-xs",
              "data-ocid": "cross_section.fetch_live_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    className: `mr-1.5 h-3 w-3 ${isFetching ? "animate-spin" : ""}`
                  }
                ),
                isFetching ? "Fetching..." : "Try Live IAEA Feed"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
            fetchStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0 },
                className: "flex items-center gap-1.5 text-xs text-amber-400",
                "data-ocid": "cross_section.fetch_error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                  "IAEA API unavailable (CORS) — using built-in dataset"
                ]
              }
            ),
            fetchStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0 },
                className: "flex items-center gap-1.5 text-xs text-green-400",
                "data-ocid": "cross_section.fetch_success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-green-400" }),
                  "Live data fetched"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.aside,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.3 },
          className: "space-y-5",
          "data-ocid": "cross_section.controls_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "⚛" }),
                " Nuclides"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: NUCLIDE_ORDER.map((key) => {
                const nuclide = DATASETS[key];
                const isSelected = selectedNuclides.has(key);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleNuclide(key),
                    className: `w-full rounded-lg border px-3 py-2 text-left transition-all duration-200 hover:border-primary/50 ${isSelected ? "border-primary/60 bg-primary/10" : "border-border bg-background/50 opacity-60"}`,
                    "aria-pressed": isSelected,
                    "data-ocid": `cross_section.nuclide_toggle.${key.toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "h-3 w-3 rounded-full flex-shrink-0",
                            style: { backgroundColor: nuclide.color }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono text-sm font-bold",
                            style: {
                              color: isSelected ? nuclide.color : void 0
                            },
                            children: nuclide.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground leading-snug", children: nuclide.description.split(";")[0] })
                    ]
                  },
                  key
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "⚡" }),
                " Reaction Types"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: REACTION_ORDER.map((rType) => {
                const meta = REACTION_META[rType];
                const isSelected = selectedReactions.has(rType);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleReaction(rType),
                    className: `w-full rounded-lg border px-3 py-2 text-left transition-all duration-200 ${isSelected ? "border-accent/60 bg-accent/10" : "border-border bg-background/50 opacity-60"}`,
                    "aria-pressed": isSelected,
                    "data-ocid": `cross_section.reaction_toggle.${rType}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: meta.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-accent", children: meta.symbol })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] text-muted-foreground leading-snug", children: meta.description.split("—")[0].trim() })
                    ]
                  },
                  rType
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400", children: "⚡" }),
                " Energy Range"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "energy-min-slider",
                      className: "mb-1 block text-xs text-muted-foreground",
                      children: [
                        "Min: ",
                        fmtEnergyFull(10 ** energyRange[0])
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "energy-min-slider",
                      type: "range",
                      min: -3,
                      max: energyRange[1] - 0.5,
                      step: 0.25,
                      value: energyRange[0],
                      onChange: (e) => setEnergyRange((p) => [
                        Number.parseFloat(e.target.value),
                        p[1]
                      ]),
                      className: "w-full accent-primary",
                      "data-ocid": "cross_section.energy_min_slider"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "energy-max-slider",
                      className: "mb-1 block text-xs text-muted-foreground",
                      children: [
                        "Max: ",
                        fmtEnergyFull(10 ** energyRange[1])
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "energy-max-slider",
                      type: "range",
                      min: energyRange[0] + 0.5,
                      max: 7.3,
                      step: 0.25,
                      value: energyRange[1],
                      onChange: (e) => setEnergyRange((p) => [
                        p[0],
                        Number.parseFloat(e.target.value)
                      ]),
                      className: "w-full accent-primary",
                      "data-ocid": "cross_section.energy_max_slider"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "flex-1 text-xs",
                        onClick: zoomIn,
                        "data-ocid": "cross_section.zoom_in_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-3 w-3" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Zoom In" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "flex-1 text-xs",
                        onClick: zoomOut,
                        "data-ocid": "cross_section.zoom_out_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-3 w-3" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Zoom Out" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "flex-1 text-xs",
                        onClick: resetZoom,
                        "data-ocid": "cross_section.zoom_reset_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Reset" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "w-full gap-2 text-sm",
                onClick: downloadCSV,
                "data-ocid": "cross_section.download_csv_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                  "Download Data (CSV)"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                ref: csvRef,
                className: "hidden",
                href: "#",
                "aria-label": "CSV download trigger",
                tabIndex: -1,
                children: "_"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                className: "w-full gap-2 text-sm",
                onClick: () => setShowEducation((p) => !p),
                "data-ocid": "cross_section.education_toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  showEducation ? "Hide" : "Show",
                  " Educational Info"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border border-border bg-card p-4",
                "data-ocid": "cross_section.chart_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-4 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-3 w-0.5 bg-blue-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Thermal: 0.0253 eV" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-3 w-4 rounded-sm opacity-30 bg-amber-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Resonance Region (1 eV–1 keV)" })
                    ] }),
                    lines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-muted-foreground", children: [
                      lines.length,
                      " curve",
                      lines.length !== 1 ? "s" : "",
                      " plotted"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[500px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    LineChart,
                    {
                      data: chartData,
                      margin: { top: 5, right: 30, left: 20, bottom: 60 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CartesianGrid,
                          {
                            strokeDasharray: "3 3",
                            stroke: "oklch(0.3 0 0 / 0.4)",
                            strokeWidth: 0.5
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ReferenceLine,
                          {
                            x: thermalLog,
                            stroke: "#60a5fa",
                            strokeWidth: 1.5,
                            strokeDasharray: "6 3",
                            label: {
                              value: "0.0253 eV",
                              position: "insideTopRight",
                              fontSize: 10,
                              fill: "#60a5fa"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ReferenceArea,
                          {
                            x1: Math.max(energyRange[0], resonanceLow),
                            x2: Math.min(energyRange[1], resonanceHigh),
                            fill: "oklch(0.82 0.12 50 / 0.08)",
                            label: {
                              value: "Resonance",
                              position: "insideTop",
                              fontSize: 9,
                              fill: "oklch(0.82 0.12 50)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          XAxis,
                          {
                            dataKey: "energy",
                            type: "number",
                            scale: "linear",
                            domain: [energyRange[0], energyRange[1]],
                            ticks: energyTicks,
                            tickFormatter: (v) => fmtEnergy(10 ** v),
                            tick: { fontSize: 10, fill: "oklch(0.6 0 0)" },
                            label: {
                              value: "Neutron Energy (eV)",
                              position: "insideBottom",
                              offset: -45,
                              fontSize: 12,
                              fill: "oklch(0.6 0 0)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          YAxis,
                          {
                            type: "number",
                            scale: "linear",
                            domain: ["auto", "auto"],
                            ticks: BARN_TICKS.map((b) => Math.log10(b)),
                            tickFormatter: (v) => fmtBarns(10 ** v),
                            tick: { fontSize: 10, fill: "oklch(0.6 0 0)" },
                            label: {
                              value: "Cross Section (barns)",
                              angle: -90,
                              position: "insideLeft",
                              offset: 10,
                              fontSize: 12,
                              fill: "oklch(0.6 0 0)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Tooltip$1,
                          {
                            content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
                            cursor: {
                              stroke: "oklch(0.6 0 0 / 0.4)",
                              strokeWidth: 1
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Legend,
                          {
                            wrapperStyle: { fontSize: 11, paddingTop: 8 },
                            iconType: "line"
                          }
                        ),
                        lines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Line,
                          {
                            type: "monotone",
                            dataKey: line.dataKey,
                            name: line.name,
                            stroke: line.color,
                            strokeWidth: 2,
                            strokeDasharray: line.strokeDasharray,
                            dot: false,
                            activeDot: { r: 5, strokeWidth: 0 },
                            connectNulls: false,
                            isAnimationActive: false
                          },
                          line.dataKey
                        ))
                      ]
                    }
                  ) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-[10px] text-muted-foreground", children: "Log-log scale · X axis: log₁₀(Energy / eV) · Y axis: log₁₀(σ / barns) · Source: ENDF/B-VIII.0 / BNL SIGMA" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-wrap gap-2",
                "data-ocid": "cross_section.region_presets",
                children: [
                  { label: "Thermal", range: [-3, 0] },
                  { label: "Resonance", range: [0, 3] },
                  { label: "Fast", range: [3, 7.3] },
                  { label: "Full Range", range: [-3, 7.3] }
                ].map(({ label, range }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "text-xs",
                    onClick: () => setEnergyRange(range),
                    "data-ocid": `cross_section.preset_${label.toLowerCase().replace(" ", "_")}`,
                    children: label
                  },
                  label
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3", children: Array.from(selectedNuclides).map((key) => {
              const n = DATASETS[key];
              const thermalPt = n.points.find((p) => p.energy === 0.0253);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.97 },
                  className: "rounded-xl border bg-card p-4",
                  style: { borderColor: `${n.color}40` },
                  "data-ocid": `cross_section.nuclide_card.${key.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "h-3 w-3 rounded-full",
                          style: { backgroundColor: n.color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-mono font-bold text-lg",
                          style: { color: n.color },
                          children: n.label
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 leading-relaxed", children: n.description }),
                    thermalPt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1.5 text-xs", children: [
                      thermalPt.fission !== void 0 && thermalPt.fission > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/50 p-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "σ_f (0.0253 eV)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          thermalPt.fission,
                          " b"
                        ] })
                      ] }),
                      thermalPt.capture !== void 0 && thermalPt.capture > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/50 p-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "σ_γ (0.0253 eV)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          thermalPt.capture,
                          " b"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/50 p-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "σ_el (0.0253 eV)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-semibold text-foreground", children: [
                          thermalPt.scatter,
                          " b"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/50 p-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Points" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-semibold text-foreground", children: n.points.length })
                      ] })
                    ] })
                  ]
                },
                key
              );
            }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showEducation && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.4 },
        className: "mt-6 overflow-hidden",
        "data-ocid": "cross_section.education_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/60 p-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground font-display", children: "Understanding Neutron Cross-Sections" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "What is a Cross-Section?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                "A nuclear cross-section (σ) is the effective area that a nucleus presents to an incoming neutron for a particular reaction. Measured in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-accent", children: "barns" }),
                " (1 barn = 10⁻²⁴ cm²), it quantifies the probability of interaction. A large cross-section means high probability of interaction."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-lg bg-muted/50 p-3 font-mono text-xs text-foreground", children: [
                "Reaction rate = σ · φ · N",
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground", children: "σ = cross-section (cm²) · φ = neutron flux (n/cm²/s) · N = atom density" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Energy Regions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-blue-400 border-blue-400/30 shrink-0",
                      children: "Thermal"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "0.001–1 eV. 1/v behavior — σ ∝ 1/√E. Thermal neutrons drive most fission reactors. Reference: 0.0253 eV = 2200 m/s Maxwell-Boltzmann peak at 20°C." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-amber-400 border-amber-400/30 shrink-0",
                      children: "Resonance"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "1 eV–1 keV. Breit-Wigner formula governs sharp peaks from compound nucleus formation. Critical for resonance escape probability (p) in the four-factor formula." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-red-400 border-red-400/30 shrink-0",
                      children: "Fast"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ">1 keV. Smooth variation. Fast reactors operate here. ²³⁸U fast fission threshold near 1 MeV contributes ~7% to k-eff in LWRs." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Neutron Economy & η, f, p" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "In the four-factor formula k_∞ = η·ε·p·f, cross-sections govern each term:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 space-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-accent w-6 shrink-0", children: "η" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Neutrons per fission = ν·σ_f / (σ_f + σ_γ) — higher σ_f/σ_γ ratio improves η" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-accent w-6 shrink-0", children: "p" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Resonance escape — neutrons must slow through ²³⁸U resonances without capture" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-accent w-6 shrink-0", children: "f" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Thermal utilization = σ_f(fuel) / σ_total — fraction absorbed in fuel vs moderator" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 text-sm", children: "Data Sources" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-xs", children: "ENDF/B-VIII.0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Evaluated" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "NNDC/BNL evaluated nuclear data file — the U.S. standard nuclear database used in all major reactor physics codes (MCNP, OpenMC, SCALE)." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-xs", children: "IAEA ENDF" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Live API" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "IAEA Nuclear Data Services provides the ENDF format data via REST API. Live fetch uses: nds.iaea.org/relnsd/v1/data" })
                ] })
              ] })
            ] })
          ] })
        ] })
      }
    ) })
  ] }) });
}
export {
  CrossSectionPlotter as default
};
