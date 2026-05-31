import { j as jsxRuntimeExports, P as PageHeader, c as SafetyCallout, r as reactExports, k as ResponsiveContainer, x as LineChart, y as CartesianGrid, X as XAxis, Y as YAxis, n as Tooltip, z as Line, l as BarChart, o as Bar, p as Cell, D as ReferenceLine } from "./index-Dw4QPaCL.js";
import { C as CollapsibleSection } from "./CollapsibleSection-DdrMxK49.js";
import { E as EquationBlock } from "./EquationBlock-B6X8LZeX.js";
import "./katex.min-7aSmwJ3l.js";
const RAD_WEIGHTS = {
  gamma: 1,
  "x-ray": 1,
  beta: 1,
  proton: 2,
  neutron: 10,
  alpha: 20
};
const TISSUE_WEIGHTS = {
  "whole-body": 1,
  thyroid: 0.04,
  lung: 0.12,
  "bone-marrow": 0.12,
  gonads: 0.08,
  skin: 0.01
};
const COMMON_ISOTOPES = {
  "C-14": { halfLifeStr: "5,730 yr", halfLifeSec: 1807e8 },
  "I-131": { halfLifeStr: "8.02 days", halfLifeSec: 693e3 },
  "Cs-137": { halfLifeStr: "30.2 yr", halfLifeSec: 954e6 },
  "Co-60": { halfLifeStr: "5.27 yr", halfLifeSec: 166e6 },
  "Ra-226": { halfLifeStr: "1,600 yr", halfLifeSec: 505e8 },
  "U-235": { halfLifeStr: "7.04×10⁸ yr", halfLifeSec: 222e14 },
  "U-238": { halfLifeStr: "4.47×10⁹ yr", halfLifeSec: 141e15 }
};
const BKG_MILLI_SV = 3.1;
const TIME_FACTORS = {
  s: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  yr: 3156e4
};
const DOSE_BENCHMARKS = [
  { label: "Dental X-ray", mSv: 5e-3, color: "#22d3ee" },
  { label: "Chest X-ray", mSv: 0.1, color: "#22d3ee" },
  { label: "Transatlantic flight", mSv: 0.06, color: "#22d3ee" },
  { label: "Background/yr", mSv: 3.1, color: "#a78bfa" },
  { label: "Chest CT scan", mSv: 5, color: "#fb923c" },
  { label: "Annual limit (public)", mSv: 1, color: "#f472b6" },
  { label: "Rad worker limit/yr", mSv: 50, color: "#f87171" },
  { label: "Fukushima zone", mSv: 20, color: "#f97316" },
  { label: "Acute effects threshold", mSv: 1e3, color: "#ef4444" }
];
function alaraGuidance(mSv) {
  if (mSv < 0.01)
    return {
      level: "Negligible",
      color: "text-emerald-400",
      text: "Dose is negligible — no specific precautions needed beyond routine good practice."
    };
  if (mSv < 1)
    return {
      level: "Low",
      color: "text-emerald-400",
      text: "Below 1 mSv — within IAEA public dose limit per year. Standard ALARA: minimize time, maximize distance."
    };
  if (mSv < 5)
    return {
      level: "Moderate",
      color: "text-amber-400",
      text: "Approaching annual background dose level. Justify this exposure and apply all feasible ALARA measures: Time–Distance–Shielding."
    };
  if (mSv < 20)
    return {
      level: "Elevated",
      color: "text-orange-400",
      text: "Above IAEA 1 mSv public limit. Occupational work only. Dose monitoring required. Reduce time, increase distance, add shielding."
    };
  if (mSv < 50)
    return {
      level: "High",
      color: "text-rose-400",
      text: "Approaching Fukushima evacuation threshold (20 mSv). Serious protective action required. Qualified Health Physicist must supervise."
    };
  return {
    level: "Critical",
    color: "text-red-400",
    text: "Exceeds annual radiation worker dose limit (50 mSv). Immediate withdrawal and medical assessment. Emergency protocols apply."
  };
}
function UnitConverter() {
  const id = reactExports.useId();
  const [gyVal, setGyVal] = reactExports.useState("1");
  const [svVal, setSvVal] = reactExports.useState("1");
  const [bqVal, setBqVal] = reactExports.useState("1");
  const [ciVal, setCiVal] = reactExports.useState(() => (1 / 37e9).toExponential(4));
  const [rVal, setRVal] = reactExports.useState("1");
  const [cgVal, setCgVal] = reactExports.useState(() => 258e-6.toExponential(4));
  const gyToRad = (v) => {
    const n = Number.parseFloat(v);
    return Number.isNaN(n) ? "" : (n * 100).toExponential(3);
  };
  const svToRem = (v) => {
    const n = Number.parseFloat(v);
    return Number.isNaN(n) ? "" : (n * 100).toExponential(3);
  };
  const handleBq = (v) => {
    setBqVal(v);
    const n = Number.parseFloat(v);
    setCiVal(Number.isNaN(n) ? "" : (n / 37e9).toExponential(4));
  };
  const handleCi = (v) => {
    setCiVal(v);
    const n = Number.parseFloat(v);
    setBqVal(Number.isNaN(n) ? "" : (n * 37e9).toExponential(4));
  };
  const handleR = (v) => {
    setRVal(v);
    const n = Number.parseFloat(v);
    setCgVal(Number.isNaN(n) ? "" : (n * 258e-6).toExponential(4));
  };
  const handleCg = (v) => {
    setCgVal(v);
    const n = Number.parseFloat(v);
    setRVal(Number.isNaN(n) ? "" : (n / 258e-6).toExponential(4));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
    [
      {
        title: "Absorbed Dose",
        note: "1 Gy = 100 rad",
        left: {
          id: `${id}-gy`,
          label: "Gray",
          unit: "Gy",
          val: gyVal,
          onChange: setGyVal,
          readOnly: false
        },
        right: {
          id: `${id}-rad`,
          label: "rad",
          unit: "rad",
          val: gyToRad(gyVal),
          readOnly: true
        }
      },
      {
        title: "Equivalent Dose",
        note: "1 Sv = 100 rem",
        left: {
          id: `${id}-sv`,
          label: "Sievert",
          unit: "Sv",
          val: svVal,
          onChange: setSvVal,
          readOnly: false
        },
        right: {
          id: `${id}-rem`,
          label: "rem",
          unit: "rem",
          val: svToRem(svVal),
          readOnly: true
        }
      }
    ].map(({ title, note, left, right }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border bg-muted/20 p-4 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest font-semibold text-muted-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-28", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: left.id,
                  className: "block text-xs font-semibold text-muted-foreground mb-1.5",
                  children: [
                    left.label,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary", children: [
                      "[",
                      left.unit,
                      "]"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: left.id,
                  type: "number",
                  value: left.val,
                  onChange: (e) => {
                    var _a;
                    return (_a = left.onChange) == null ? void 0 : _a.call(left, e.target.value);
                  },
                  className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm pb-2", children: "⇄" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-28", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: right.id,
                  className: "block text-xs font-semibold text-muted-foreground mb-1.5",
                  children: [
                    right.label,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary", children: [
                      "[",
                      right.unit,
                      "]"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: right.id,
                  type: "text",
                  readOnly: true,
                  value: right.val,
                  className: "w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm font-mono text-foreground"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: note })
        ]
      },
      title
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest font-semibold text-muted-foreground", children: "Activity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `${id}-bq`,
              className: "block text-xs font-semibold text-muted-foreground mb-1.5",
              children: [
                "Becquerel ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: "[Bq]" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-bq`,
              type: "number",
              value: bqVal,
              onChange: (e) => handleBq(e.target.value),
              className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm pb-2", children: "⇄" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `${id}-ci`,
              className: "block text-xs font-semibold text-muted-foreground mb-1.5",
              children: [
                "Curie ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: "[Ci]" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-ci`,
              type: "number",
              value: ciVal,
              onChange: (e) => handleCi(e.target.value),
              className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "1 Ci = 3.7×10¹⁰ Bq" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest font-semibold text-muted-foreground", children: "Exposure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `${id}-roentgen`,
              className: "block text-xs font-semibold text-muted-foreground mb-1.5",
              children: [
                "Roentgen ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: "[R]" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-roentgen`,
              type: "number",
              value: rVal,
              onChange: (e) => handleR(e.target.value),
              className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm pb-2", children: "⇄" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `${id}-ckg`,
              className: "block text-xs font-semibold text-muted-foreground mb-1.5",
              children: [
                "C/kg ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: "[C/kg]" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-ckg`,
              type: "number",
              value: cgVal,
              onChange: (e) => handleCg(e.target.value),
              className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "1 R = 2.58×10⁻⁴ C/kg" })
    ] })
  ] });
}
function DoseRateCalc() {
  const id = reactExports.useId();
  const [activity, setActivity] = reactExports.useState("1e9");
  const [distance, setDistance] = reactExports.useState(1);
  const [exposureHr, setExposureHr] = reactExports.useState(1);
  const [gammaProb, setGammaProb] = reactExports.useState("0.85");
  const [energy, setEnergy] = reactExports.useState("0.662");
  const [shieldHVL, setShieldHVL] = reactExports.useState(0);
  const [targetDoseMsv, setTargetDoseMsv] = reactExports.useState("1");
  const GAMMA_CONST = 576e-15;
  const A = Number.parseFloat(activity) || 0;
  const Py = Number.parseFloat(gammaProb) || 0;
  const Eg = Number.parseFloat(energy) || 0;
  const doseRateRaw = A * Py * Eg * GAMMA_CONST / (distance * distance) * 3600 * 1e6;
  const transmission = shieldHVL > 0 ? 0.5 ** shieldHVL : 1;
  const doseRateShielded = doseRateRaw * transmission;
  const totalDoseMicroSv = doseRateShielded * exposureHr;
  const totalDoseMSv = totalDoseMicroSv / 1e3;
  const targetRateMicroSv = Number.parseFloat(targetDoseMsv) * 1e3 / exposureHr;
  const requiredHVLs = doseRateRaw > 0 ? Math.log2(doseRateRaw / Math.max(targetRateMicroSv, 1e-10)) : 0;
  const guidance = alaraGuidance(totalDoseMSv);
  const distanceChartData = reactExports.useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const r = 0.1 + i * 0.2;
      const dr = A * Py * Eg * GAMMA_CONST / (r * r) * 3600 * 1e6 * transmission;
      return { r: Number(r.toFixed(2)), doseRate: Number(dr.toFixed(3)) };
    });
  }, [A, Py, Eg, transmission]);
  const benchmarkData = reactExports.useMemo(() => {
    const calcBar = { label: "Your dose", mSv: totalDoseMSv, color: "#22d3ee" };
    return [...DOSE_BENCHMARKS, calcBar].sort((a, b) => a.mSv - b.mSv);
  }, [totalDoseMSv]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-act`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Activity [Bq]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-act`,
            type: "number",
            value: activity,
            onChange: (e) => setActivity(e.target.value),
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "dosimetry.dose_rate.activity_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-gp`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Gamma Probability (0–1)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-gp`,
            type: "number",
            min: "0",
            max: "1",
            step: "0.01",
            value: gammaProb,
            onChange: (e) => setGammaProb(e.target.value),
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "dosimetry.dose_rate.gamma_prob_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-eng`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Photon Energy [MeV]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-eng`,
            type: "number",
            min: "0",
            step: "0.01",
            value: energy,
            onChange: (e) => setEnergy(e.target.value),
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "dosimetry.dose_rate.energy_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: `${id}-dist`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: [
              "Distance:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-mono", children: [
                distance,
                " m"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-dist`,
            type: "range",
            min: "0.1",
            max: "10",
            step: "0.1",
            value: distance,
            onChange: (e) => setDistance(Number.parseFloat(e.target.value)),
            className: "w-full accent-primary",
            "data-ocid": "dosimetry.dose_rate.distance.toggle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0.1 m" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10 m" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: `${id}-exp`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: [
              "Exposure Time:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-mono", children: [
                exposureHr,
                " hr"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-exp`,
            type: "range",
            min: "0.0167",
            max: "8",
            step: "0.0167",
            value: exposureHr,
            onChange: (e) => setExposureHr(Number.parseFloat(e.target.value)),
            className: "w-full accent-primary",
            "data-ocid": "dosimetry.dose_rate.exposure.toggle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1 min" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "8 hr" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: `${id}-hvl`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: [
              "Shielding:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-mono", children: [
                shieldHVL,
                " HVL"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-hvl`,
            type: "range",
            min: "0",
            max: "10",
            step: "0.5",
            value: shieldHVL,
            onChange: (e) => setShieldHVL(Number.parseFloat(e.target.value)),
            className: "w-full accent-primary",
            "data-ocid": "dosimetry.dose_rate.hvl.toggle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No shield" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "10 HVL (",
            (100 * (1 - 0.5 ** 10)).toFixed(1),
            "% blocked)"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EquationBlock,
      {
        latex: "\\dot{H} = \\frac{A \\cdot P_\\gamma \\cdot E_\\gamma \\cdot \\Gamma}{r^2} \\cdot 0.5^{n_{HVL}}",
        annotation: "Dose rate Ḣ equals activity A × gamma probability × photon energy × Γ constant ÷ r² × shielding transmission (0.5 per HVL).",
        label: "Point Source Dose Rate with Shielding"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Dose Rate (unshielded)",
        value: doseRateRaw.toExponential(3),
        unit: "µSv/h"
      },
      {
        label: `Dose Rate (${shieldHVL} HVL shield)`,
        value: doseRateShielded.toExponential(3),
        unit: "µSv/h"
      },
      {
        label: `Total Dose (${exposureHr.toFixed(1)} hr)`,
        value: totalDoseMicroSv.toExponential(3),
        unit: "µSv"
      },
      {
        label: "Equiv. to Annual BKG",
        value: `${(totalDoseMSv / BKG_MILLI_SV * 100).toFixed(2)}%`,
        unit: ""
      }
    ].map(({ label, value, unit }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border bg-muted/20 px-4 py-3 text-center",
        "data-ocid": "dosimetry.dose_rate.result_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 leading-tight", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-lg font-bold text-primary", children: value }),
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: unit })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border bg-muted/10 p-4 flex items-start gap-3",
        "data-ocid": "dosimetry.alara.callout",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${guidance.level === "Negligible" || guidance.level === "Low" ? "bg-emerald-400" : guidance.level === "Moderate" ? "bg-amber-400" : "bg-rose-400"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm font-semibold ${guidance.color} mb-1`, children: [
              "ALARA: ",
              guidance.level,
              " Dose Level"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: guidance.text })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: [
          "Dose Rate vs Distance (µSv/h, ",
          shieldHVL,
          " HVL shield)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: distanceChartData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "r",
              label: {
                value: "Distance (m)",
                position: "insideBottom",
                offset: -2,
                fontSize: 10,
                fill: "var(--muted-foreground)"
              },
              tick: { fontSize: 10, fill: "var(--muted-foreground)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 10, fill: "var(--muted-foreground)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 11
              },
              formatter: (v) => [`${v} µSv/h`, "Dose Rate"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "doseRate",
              stroke: "#a855f7",
              strokeWidth: 2,
              dot: false
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Dose Comparison (Log Scale, mSv)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: benchmarkData,
            layout: "vertical",
            margin: { top: 0, right: 40, left: 110, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  type: "number",
                  scale: "log",
                  domain: [1e-3, 2e3],
                  tick: { fontSize: 9, fill: "var(--muted-foreground)" },
                  tickFormatter: (v) => v >= 1 ? `${v}` : `${v.toFixed(3)}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  type: "category",
                  dataKey: "label",
                  tick: { fontSize: 9, fill: "var(--muted-foreground)" },
                  width: 105
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 11
                  },
                  formatter: (v) => [`${v} mSv`, "Dose"]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "mSv", radius: [0, 3, 3, 0], children: benchmarkData.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: d.label === "Your dose" ? "#22d3ee" : d.color,
                  fillOpacity: d.label === "Your dose" ? 1 : 0.65
                },
                d.label
              )) })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Shielding Requirement Calculator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `${id}-target`,
              className: "block text-xs font-semibold text-muted-foreground mb-1.5",
              children: "Target Total Dose (mSv)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-target`,
              type: "number",
              min: "0.001",
              step: "0.1",
              value: targetDoseMsv,
              onChange: (e) => setTargetDoseMsv(e.target.value),
              className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "dosimetry.shielding.target_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-4 py-3 text-center min-w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Required Shielding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xl font-bold text-primary", children: [
            requiredHVLs > 0 ? requiredHVLs.toFixed(2) : "0",
            " HVL"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Transmission:",
            " ",
            (0.5 ** Math.max(0, requiredHVLs) * 100).toFixed(2),
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "HVL (Half-Value Layer) varies by material: ~1.5 cm lead, ~4 cm concrete, ~11 cm water for 1 MeV gamma." })
    ] })
  ] });
}
function EffectiveDoseCalc() {
  const id = reactExports.useId();
  const [dose, setDose] = reactExports.useState("0.01");
  const [radType, setRadType] = reactExports.useState("gamma");
  const [tissue, setTissue] = reactExports.useState("whole-body");
  const wR = RAD_WEIGHTS[radType] ?? 1;
  const wT = TISSUE_WEIGHTS[tissue] ?? 1;
  const d = Number.parseFloat(dose);
  const H = Number.isNaN(d) ? 0 : d * wR;
  const E = H * wT;
  const EMsv = E * 1e3;
  const chestXrays = EMsv / 0.1;
  const guidance = alaraGuidance(EMsv);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: `${id}-dose`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: [
              "Absorbed Dose ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: "[Gy]" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `${id}-dose`,
            type: "number",
            min: "0",
            step: "0.001",
            value: dose,
            onChange: (e) => setDose(e.target.value),
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "dosimetry.effective_dose.dose_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-radtype`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Radiation Type"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: `${id}-radtype`,
            value: radType,
            onChange: (e) => setRadType(e.target.value),
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "dosimetry.effective_dose.rad_type.select",
            children: Object.entries(RAD_WEIGHTS).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: k, children: [
              `${k.charAt(0).toUpperCase()}${k.slice(1)}`,
              " (wᴿ = ",
              v,
              ")"
            ] }, k))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-tissue`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Tissue/Organ"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: `${id}-tissue`,
            value: tissue,
            onChange: (e) => setTissue(e.target.value),
            className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "dosimetry.effective_dose.tissue.select",
            children: Object.entries(TISSUE_WEIGHTS).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: k, children: [
              `${k.charAt(0).toUpperCase()}${k.slice(1).replace("-", " ")}`,
              " ",
              "(wᴛ = ",
              v,
              ")"
            ] }, k))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EquationBlock,
      {
        latex: "H = w_R \\cdot D \\qquad E = w_T \\cdot H",
        annotation: "Equivalent dose H (Sv) = radiation weighting factor × absorbed dose (Gy). Effective dose E (Sv) = tissue weighting factor × equivalent dose.",
        label: "Dose Equations (ICRP 103)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "wᴿ (Radiation)", val: wR, unit: "" },
      { label: "Equivalent Dose H", val: H.toExponential(3), unit: "Sv" },
      { label: "wᴛ (Tissue)", val: wT, unit: "" },
      { label: "Effective Dose E", val: E.toExponential(3), unit: "Sv" }
    ].map(({ label, val, unit }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border bg-muted/20 px-4 py-3 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-bold text-primary", children: [
            val,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: unit })
          ] })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Context: " }),
      "This effective dose equals ≈",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: chestXrays.toFixed(2) }),
      " ",
      "chest X-rays (0.1 mSv each). Natural background is",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary", children: [
        BKG_MILLI_SV,
        " mSv/year"
      ] }),
      " ",
      "(UNSCEAR global average)."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/10 p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${guidance.level === "Negligible" || guidance.level === "Low" ? "bg-emerald-400" : "bg-amber-400"}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm font-semibold ${guidance.color} mb-1`, children: [
          "ALARA: ",
          guidance.level
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: guidance.text })
      ] })
    ] })
  ] });
}
function ActivityCalc() {
  var _a;
  const id = reactExports.useId();
  const [a0, setA0] = reactExports.useState("1e9");
  const [a0Unit, setA0Unit] = reactExports.useState("Bq");
  const [hlMode, setHlMode] = reactExports.useState("select");
  const [selectedIsotope, setSelectedIsotope] = reactExports.useState("I-131");
  const [manualHl, setManualHl] = reactExports.useState("600");
  const [tElapsed, setTElapsed] = reactExports.useState("86400");
  const [tElapsedUnit, setTElapsedUnit] = reactExports.useState("s");
  const hlSec = hlMode === "select" ? ((_a = COMMON_ISOTOPES[selectedIsotope]) == null ? void 0 : _a.halfLifeSec) ?? 1 : Number.parseFloat(manualHl) || 1;
  const a0Bq = Number.parseFloat(a0) * (a0Unit === "Ci" ? 37e9 : 1);
  const tSec = Number.parseFloat(tElapsed) * (TIME_FACTORS[tElapsedUnit] ?? 1);
  const lambda = Math.LN2 / hlSec;
  const At = a0Bq * Math.exp(-lambda * tSec);
  const chartData = reactExports.useMemo(() => {
    const steps = 60;
    const totalT = hlSec * 6;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const tt = i / steps * totalT;
      return {
        t: Number((tt / hlSec).toFixed(2)),
        A: Number((a0Bq * Math.exp(-lambda * tt) / a0Bq * 100).toFixed(2))
      };
    });
  }, [a0Bq, lambda, hlSec]);
  const decayPct = (1 - At / a0Bq) * 100;
  const isSafe = At < 37e3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-a0`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Initial Activity A₀"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-a0`,
              type: "number",
              value: a0,
              onChange: (e) => setA0(e.target.value),
              className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "dosimetry.activity.a0_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: a0Unit,
              onChange: (e) => setA0Unit(e.target.value),
              "aria-label": "Activity unit",
              className: "rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Bq" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Ci" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-hlmode`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Half-life"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: `${id}-hlmode`,
              value: hlMode,
              onChange: (e) => setHlMode(e.target.value),
              className: "rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "select", children: "Preset" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manual", children: "Manual (s)" })
              ]
            }
          ),
          hlMode === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: selectedIsotope,
              onChange: (e) => setSelectedIsotope(e.target.value),
              "aria-label": "Select isotope preset",
              className: "flex-1 rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "dosimetry.activity.isotope.select",
              children: Object.entries(COMMON_ISOTOPES).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: k, children: [
                k,
                " (",
                v.halfLifeStr,
                ")"
              ] }, k))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: manualHl,
              onChange: (e) => setManualHl(e.target.value),
              placeholder: "seconds",
              "aria-label": "Manual half-life in seconds",
              className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "dosimetry.activity.halflife_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `${id}-t`,
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Time Elapsed"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `${id}-t`,
              type: "number",
              value: tElapsed,
              onChange: (e) => setTElapsed(e.target.value),
              className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "dosimetry.activity.time_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: tElapsedUnit,
              onChange: (e) => setTElapsedUnit(e.target.value),
              "aria-label": "Time unit",
              className: "rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: Object.keys(TIME_FACTORS).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: u }, u))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-lg border px-4 py-3 text-center ${isSafe ? "border-emerald-500/30 bg-emerald-950/30" : "border-amber-500/30 bg-amber-950/30"}`,
          "data-ocid": "dosimetry.activity.result_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Remaining Activity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-bold text-primary", children: [
              At.toExponential(3),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Bq" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-xs mt-0.5 ${isSafe ? "text-emerald-400" : "text-amber-400"}`,
                children: [
                  decayPct.toFixed(1),
                  "% decayed ·",
                  " ",
                  isSafe ? "Below 1 µCi" : "Above 1 µCi"
                ]
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EquationBlock,
      {
        latex: "A(t) = A_0 \\cdot e^{-\\lambda t}, \\quad \\lambda = \\frac{\\ln 2}{t_{1/2}}",
        annotation: "Radioactive decay law: activity at time t equals initial activity × e^(−λt). Decay constant λ = ln(2) / half-life.",
        label: "Radioactive Decay Law"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/10 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Decay Curve (% of Initial Activity)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "t",
            label: {
              value: "Half-lives elapsed",
              position: "insideBottom",
              offset: -2,
              fontSize: 11,
              fill: "var(--muted-foreground)"
            },
            tick: { fontSize: 11, fill: "var(--muted-foreground)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            unit: "%",
            tick: { fontSize: 11, fill: "var(--muted-foreground)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12
            },
            formatter: (v) => [`${v}%`, "Activity"]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReferenceLine,
          {
            y: 50,
            stroke: "var(--muted-foreground)",
            strokeDasharray: "4 4",
            label: {
              value: "50%",
              fontSize: 10,
              fill: "var(--muted-foreground)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "A",
            stroke: "#22d3ee",
            strokeWidth: 2,
            dot: false
          }
        )
      ] }) })
    ] })
  ] });
}
function DosimetryCalculator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Radiation Dosimetry Calculator",
        subtitle: "Interactive calculators for dose rate (with log-scale benchmarks and shielding), effective dose, unit conversion, and radioactive decay activity.",
        audienceLevel: "professional",
        readTimeMin: 8
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SafetyCallout, { title: "Educational Use Only — Not for Medical or Safety Decisions", children: [
      "These calculators use",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "simplified models for educational purposes only" }),
      ". Never use them for real radiation safety, medical, or regulatory decisions. Always consult qualified health physicists and IAEA/NRC/ICRP guidance."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "dose-rate",
          title: "Dose Rate from Point Source (with Shielding & ALARA)",
          defaultOpen: true,
          "data-ocid": "dosimetry.dose_rate.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoseRateCalc, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "effective-dose",
          title: "Effective Dose Calculator",
          defaultOpen: false,
          "data-ocid": "dosimetry.effective_dose.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EffectiveDoseCalc, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "activity-calc",
          title: "Activity / Radioactive Decay Calculator",
          defaultOpen: false,
          "data-ocid": "dosimetry.activity_calc.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityCalc, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CollapsibleSection,
        {
          id: "unit-converter",
          title: "Unit Converter (Gy, Sv, Bq, Ci, R)",
          defaultOpen: false,
          "data-ocid": "dosimetry.unit_converter.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(UnitConverter, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-lg border border-border bg-muted/20 p-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "References:" }),
      " ICRP Publication 103 (2007) — Radiation weighting and tissue weighting factors. NIST Standard Reference Database 126. IAEA Safety Standards Series No. GSR Part 3. UNSCEAR 2020 Report — Sources and Effects of Ionizing Radiation."
    ] }) })
  ] });
}
export {
  DosimetryCalculator as default
};
