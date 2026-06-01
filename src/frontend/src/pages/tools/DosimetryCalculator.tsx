import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { useId, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Constants ─────────────────────────────────────────────────────────────────
const RAD_WEIGHTS: Record<string, number> = {
  gamma: 1,
  "x-ray": 1,
  beta: 1,
  proton: 2,
  neutron: 10,
  alpha: 20,
};
const TISSUE_WEIGHTS: Record<string, number> = {
  "whole-body": 1,
  thyroid: 0.04,
  lung: 0.12,
  "bone-marrow": 0.12,
  gonads: 0.08,
  skin: 0.01,
};

const COMMON_ISOTOPES: Record<
  string,
  { halfLifeStr: string; halfLifeSec: number }
> = {
  "C-14": { halfLifeStr: "5,730 yr", halfLifeSec: 1.807e11 },
  "I-131": { halfLifeStr: "8.02 days", halfLifeSec: 6.93e5 },
  "Cs-137": { halfLifeStr: "30.2 yr", halfLifeSec: 9.54e8 },
  "Co-60": { halfLifeStr: "5.27 yr", halfLifeSec: 1.66e8 },
  "Ra-226": { halfLifeStr: "1,600 yr", halfLifeSec: 5.05e10 },
  "U-235": { halfLifeStr: "7.04×10⁸ yr", halfLifeSec: 2.22e16 },
  "U-238": { halfLifeStr: "4.47×10⁹ yr", halfLifeSec: 1.41e17 },
};

const BKG_MILLI_SV = 3.1;
const TIME_FACTORS: Record<string, number> = {
  s: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  yr: 3.156e7,
};

// ─── Dose Reference Benchmarks (mSv) ──────────────────────────────────────────
const DOSE_BENCHMARKS = [
  { label: "Dental X-ray", mSv: 0.005, color: "#22d3ee" },
  { label: "Chest X-ray", mSv: 0.1, color: "#22d3ee" },
  { label: "Transatlantic flight", mSv: 0.06, color: "#22d3ee" },
  { label: "Background/yr", mSv: 3.1, color: "#a78bfa" },
  { label: "Chest CT scan", mSv: 5.0, color: "#fb923c" },
  { label: "Annual limit (public)", mSv: 1.0, color: "#f472b6" },
  { label: "Rad worker limit/yr", mSv: 50, color: "#f87171" },
  { label: "Fukushima zone", mSv: 20, color: "#f97316" },
  { label: "Acute effects threshold", mSv: 1000, color: "#ef4444" },
];

// ─── ALARA guidance based on dose level ───────────────────────────────────────
function alaraGuidance(mSv: number): {
  level: string;
  color: string;
  text: string;
} {
  if (mSv < 0.01)
    return {
      level: "Negligible",
      color: "text-emerald-400",
      text: "Dose is negligible — no specific precautions needed beyond routine good practice.",
    };
  if (mSv < 1)
    return {
      level: "Low",
      color: "text-emerald-400",
      text: "Below 1 mSv — within IAEA public dose limit per year. Standard ALARA: minimize time, maximize distance.",
    };
  if (mSv < 5)
    return {
      level: "Moderate",
      color: "text-amber-400",
      text: "Approaching annual background dose level. Justify this exposure and apply all feasible ALARA measures: Time–Distance–Shielding.",
    };
  if (mSv < 20)
    return {
      level: "Elevated",
      color: "text-orange-400",
      text: "Above IAEA 1 mSv public limit. Occupational work only. Dose monitoring required. Reduce time, increase distance, add shielding.",
    };
  if (mSv < 50)
    return {
      level: "High",
      color: "text-rose-400",
      text: "Approaching Fukushima evacuation threshold (20 mSv). Serious protective action required. Qualified Health Physicist must supervise.",
    };
  return {
    level: "Critical",
    color: "text-red-400",
    text: "Exceeds annual radiation worker dose limit (50 mSv). Immediate withdrawal and medical assessment. Emergency protocols apply.",
  };
}

// ─── Unit Converter ────────────────────────────────────────────────────────────
function UnitConverter() {
  const id = useId();
  const [gyVal, setGyVal] = useState("1");
  const [svVal, setSvVal] = useState("1");
  const [bqVal, setBqVal] = useState("1");
  const [ciVal, setCiVal] = useState(() => (1 / 3.7e10).toExponential(4));
  const [rVal, setRVal] = useState("1");
  const [cgVal, setCgVal] = useState(() => (2.58e-4).toExponential(4));

  const gyToRad = (v: string) => {
    const n = Number.parseFloat(v);
    return Number.isNaN(n) ? "" : (n * 100).toExponential(3);
  };
  const svToRem = (v: string) => {
    const n = Number.parseFloat(v);
    return Number.isNaN(n) ? "" : (n * 100).toExponential(3);
  };

  const handleBq = (v: string) => {
    setBqVal(v);
    const n = Number.parseFloat(v);
    setCiVal(Number.isNaN(n) ? "" : (n / 3.7e10).toExponential(4));
  };
  const handleCi = (v: string) => {
    setCiVal(v);
    const n = Number.parseFloat(v);
    setBqVal(Number.isNaN(n) ? "" : (n * 3.7e10).toExponential(4));
  };
  const handleR = (v: string) => {
    setRVal(v);
    const n = Number.parseFloat(v);
    setCgVal(Number.isNaN(n) ? "" : (n * 2.58e-4).toExponential(4));
  };
  const handleCg = (v: string) => {
    setCgVal(v);
    const n = Number.parseFloat(v);
    setRVal(Number.isNaN(n) ? "" : (n / 2.58e-4).toExponential(4));
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[
        {
          title: "Absorbed Dose",
          note: "1 Gy = 100 rad",
          left: {
            id: `${id}-gy`,
            label: "Gray",
            unit: "Gy",
            val: gyVal,
            onChange: setGyVal,
            readOnly: false,
          },
          right: {
            id: `${id}-rad`,
            label: "rad",
            unit: "rad",
            val: gyToRad(gyVal),
            readOnly: true,
          },
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
            readOnly: false,
          },
          right: {
            id: `${id}-rem`,
            label: "rem",
            unit: "rem",
            val: svToRem(svVal),
            readOnly: true,
          },
        },
      ].map(({ title, note, left, right }) => (
        <div
          key={title}
          className="rounded-lg border border-border bg-muted/20 p-4 space-y-3"
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            {title}
          </p>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-28">
              <label
                htmlFor={left.id}
                className="block text-xs font-semibold text-muted-foreground mb-1.5"
              >
                {left.label}{" "}
                <span className="font-mono text-primary">[{left.unit}]</span>
              </label>
              <input
                id={left.id}
                type="number"
                value={left.val}
                onChange={(e) => left.onChange?.(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <span className="text-muted-foreground text-sm pb-2">⇄</span>
            <div className="flex-1 min-w-28">
              <label
                htmlFor={right.id}
                className="block text-xs font-semibold text-muted-foreground mb-1.5"
              >
                {right.label}{" "}
                <span className="font-mono text-primary">[{right.unit}]</span>
              </label>
              <input
                id={right.id}
                type="text"
                readOnly
                value={right.val}
                className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm font-mono text-foreground"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{note}</p>
        </div>
      ))}
      {/* Bq ↔ Ci */}
      <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
        <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
          Activity
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-bq`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              Becquerel <span className="font-mono text-primary">[Bq]</span>
            </label>
            <input
              id={`${id}-bq`}
              type="number"
              value={bqVal}
              onChange={(e) => handleBq(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <span className="text-muted-foreground text-sm pb-2">⇄</span>
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-ci`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              Curie <span className="font-mono text-primary">[Ci]</span>
            </label>
            <input
              id={`${id}-ci`}
              type="number"
              value={ciVal}
              onChange={(e) => handleCi(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">1 Ci = 3.7×10¹⁰ Bq</p>
      </div>
      {/* R ↔ C/kg */}
      <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
        <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
          Exposure
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-roentgen`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              Roentgen <span className="font-mono text-primary">[R]</span>
            </label>
            <input
              id={`${id}-roentgen`}
              type="number"
              value={rVal}
              onChange={(e) => handleR(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <span className="text-muted-foreground text-sm pb-2">⇄</span>
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-ckg`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              C/kg <span className="font-mono text-primary">[C/kg]</span>
            </label>
            <input
              id={`${id}-ckg`}
              type="number"
              value={cgVal}
              onChange={(e) => handleCg(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">1 R = 2.58×10⁻⁴ C/kg</p>
      </div>
    </div>
  );
}

// ─── Dose Rate Calculator (Point Source) with Log-Scale Benchmark Chart ────────
function DoseRateCalc() {
  const id = useId();
  const [activity, setActivity] = useState("1e9");
  const [distance, setDistance] = useState(1);
  const [exposureHr, setExposureHr] = useState(1);
  const [gammaProb, setGammaProb] = useState("0.85");
  const [energy, setEnergy] = useState("0.662");
  const [shieldHVL, setShieldHVL] = useState(0);
  const [targetDoseMsv, setTargetDoseMsv] = useState("1");

  const GAMMA_CONST = 5.76e-13;
  const A = Number.parseFloat(activity) || 0;
  const Py = Number.parseFloat(gammaProb) || 0;
  const Eg = Number.parseFloat(energy) || 0;

  // Dose rate µSv/h at given distance
  const doseRateRaw =
    ((A * Py * Eg * GAMMA_CONST) / (distance * distance)) * 3600 * 1e6;
  // Shielding transmission
  const transmission = shieldHVL > 0 ? 0.5 ** shieldHVL : 1;
  const doseRateShielded = doseRateRaw * transmission;

  // Total dose for exposure time
  const totalDoseMicroSv = doseRateShielded * exposureHr;
  const totalDoseMSv = totalDoseMicroSv / 1000;

  // Shielding calc: required HVLs to reach target dose rate
  const targetRateMicroSv =
    (Number.parseFloat(targetDoseMsv) * 1000) / exposureHr;
  const requiredHVLs =
    doseRateRaw > 0
      ? Math.log2(doseRateRaw / Math.max(targetRateMicroSv, 1e-10))
      : 0;

  const guidance = alaraGuidance(totalDoseMSv);

  // Distance curve
  const distanceChartData = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const r = 0.1 + i * 0.2;
      const dr =
        ((A * Py * Eg * GAMMA_CONST) / (r * r)) * 3600 * 1e6 * transmission;
      return { r: Number(r.toFixed(2)), doseRate: Number(dr.toFixed(3)) };
    });
  }, [A, Py, Eg, transmission]);

  // Log-scale benchmark bar chart data
  const benchmarkData = useMemo(() => {
    const calcBar = { label: "Your dose", mSv: totalDoseMSv, color: "#22d3ee" };
    return [...DOSE_BENCHMARKS, calcBar].sort((a, b) => a.mSv - b.mSv);
  }, [totalDoseMSv]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor={`${id}-act`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Activity [Bq]
          </label>
          <input
            id={`${id}-act`}
            type="number"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="dosimetry.dose_rate.activity_input"
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-gp`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Gamma Probability (0–1)
          </label>
          <input
            id={`${id}-gp`}
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={gammaProb}
            onChange={(e) => setGammaProb(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="dosimetry.dose_rate.gamma_prob_input"
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-eng`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Photon Energy [MeV]
          </label>
          <input
            id={`${id}-eng`}
            type="number"
            min="0"
            step="0.01"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="dosimetry.dose_rate.energy_input"
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-dist`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Distance:{" "}
            <span className="text-primary font-mono">{distance} m</span>
          </label>
          <input
            id={`${id}-dist`}
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
            className="w-full accent-primary"
            data-ocid="dosimetry.dose_rate.distance.toggle"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0.1 m</span>
            <span>10 m</span>
          </div>
        </div>

        <div>
          <label
            htmlFor={`${id}-exp`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Exposure Time:{" "}
            <span className="text-primary font-mono">{exposureHr} hr</span>
          </label>
          <input
            id={`${id}-exp`}
            type="range"
            min="0.0167"
            max="8"
            step="0.0167"
            value={exposureHr}
            onChange={(e) => setExposureHr(Number.parseFloat(e.target.value))}
            className="w-full accent-primary"
            data-ocid="dosimetry.dose_rate.exposure.toggle"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 min</span>
            <span>8 hr</span>
          </div>
        </div>

        <div>
          <label
            htmlFor={`${id}-hvl`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Shielding:{" "}
            <span className="text-primary font-mono">{shieldHVL} HVL</span>
          </label>
          <input
            id={`${id}-hvl`}
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={shieldHVL}
            onChange={(e) => setShieldHVL(Number.parseFloat(e.target.value))}
            className="w-full accent-primary"
            data-ocid="dosimetry.dose_rate.hvl.toggle"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>No shield</span>
            <span>10 HVL ({(100 * (1 - 0.5 ** 10)).toFixed(1)}% blocked)</span>
          </div>
        </div>
      </div>

      <EquationBlock
        latex="\dot{H} = \frac{A \cdot P_\gamma \cdot E_\gamma \cdot \Gamma}{r^2} \cdot 0.5^{n_{HVL}}"
        annotation="Dose rate Ḣ equals activity A × gamma probability × photon energy × Γ constant ÷ r² × shielding transmission (0.5 per HVL)."
        label="Point Source Dose Rate with Shielding"
      />

      {/* Result Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Dose Rate (unshielded)",
            value: doseRateRaw.toExponential(3),
            unit: "µSv/h",
          },
          {
            label: `Dose Rate (${shieldHVL} HVL shield)`,
            value: doseRateShielded.toExponential(3),
            unit: "µSv/h",
          },
          {
            label: `Total Dose (${exposureHr.toFixed(1)} hr)`,
            value: totalDoseMicroSv.toExponential(3),
            unit: "µSv",
          },
          {
            label: "Equiv. to Annual BKG",
            value: `${((totalDoseMSv / BKG_MILLI_SV) * 100).toFixed(2)}%`,
            unit: "",
          },
        ].map(({ label, value, unit }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center"
            data-ocid="dosimetry.dose_rate.result_card"
          >
            <p className="text-xs text-muted-foreground mb-1 leading-tight">
              {label}
            </p>
            <p className="font-mono text-lg font-bold text-primary">{value}</p>
            {unit && <p className="text-xs text-muted-foreground">{unit}</p>}
          </div>
        ))}
      </div>

      {/* ALARA Guidance */}
      <div
        className="rounded-lg border border-border bg-muted/10 p-4 flex items-start gap-3"
        data-ocid="dosimetry.alara.callout"
      >
        <div
          className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${guidance.level === "Negligible" || guidance.level === "Low" ? "bg-emerald-400" : guidance.level === "Moderate" ? "bg-amber-400" : "bg-rose-400"}`}
        />
        <div>
          <p className={`text-sm font-semibold ${guidance.color} mb-1`}>
            ALARA: {guidance.level} Dose Level
          </p>
          <p className="text-sm text-muted-foreground">{guidance.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Distance decay chart */}
        <div className="rounded-lg border border-border bg-muted/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Dose Rate vs Distance (µSv/h, {shieldHVL} HVL shield)
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={distanceChartData}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="r"
                label={{
                  value: "Distance (m)",
                  position: "insideBottom",
                  offset: -2,
                  fontSize: 10,
                  fill: "var(--muted-foreground)",
                }}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                formatter={(v: number) => [`${v} µSv/h`, "Dose Rate"]}
              />
              <Line
                type="monotone"
                dataKey="doseRate"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Log-scale benchmark chart */}
        <div className="rounded-lg border border-border bg-muted/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Dose Comparison (Log Scale, mSv)
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={benchmarkData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 110, bottom: 0 }}
            >
              <XAxis
                type="number"
                scale="log"
                domain={[0.001, 2000]}
                tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                tickFormatter={(v: number) =>
                  v >= 1 ? `${v}` : `${v.toFixed(3)}`
                }
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                width={105}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                formatter={(v: number) => [`${v} mSv`, "Dose"]}
              />
              <Bar dataKey="mSv" radius={[0, 3, 3, 0]}>
                {benchmarkData.map((d) => (
                  <Cell
                    key={d.label}
                    fill={d.label === "Your dose" ? "#22d3ee" : d.color}
                    fillOpacity={d.label === "Your dose" ? 1 : 0.65}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shielding Calculator */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Shielding Requirement Calculator
        </p>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-40">
            <label
              htmlFor={`${id}-target`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              Target Total Dose (mSv)
            </label>
            <input
              id={`${id}-target`}
              type="number"
              min="0.001"
              step="0.1"
              value={targetDoseMsv}
              onChange={(e) => setTargetDoseMsv(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="dosimetry.shielding.target_input"
            />
          </div>
          <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center min-w-40">
            <p className="text-xs text-muted-foreground mb-0.5">
              Required Shielding
            </p>
            <p className="font-mono text-xl font-bold text-primary">
              {requiredHVLs > 0 ? requiredHVLs.toFixed(2) : "0"} HVL
            </p>
            <p className="text-xs text-muted-foreground">
              Transmission:{" "}
              {(0.5 ** Math.max(0, requiredHVLs) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          HVL (Half-Value Layer) varies by material: ~1.5 cm lead, ~4 cm
          concrete, ~11 cm water for 1 MeV gamma.
        </p>
      </div>
    </div>
  );
}

// ─── Effective Dose Calculator ─────────────────────────────────────────────────
function EffectiveDoseCalc() {
  const id = useId();
  const [dose, setDose] = useState("0.01");
  const [radType, setRadType] = useState("gamma");
  const [tissue, setTissue] = useState("whole-body");

  const wR = RAD_WEIGHTS[radType] ?? 1;
  const wT = TISSUE_WEIGHTS[tissue] ?? 1;
  const d = Number.parseFloat(dose);
  const H = Number.isNaN(d) ? 0 : d * wR;
  const E = H * wT;
  const EMsv = E * 1000;
  const chestXrays = EMsv / 0.1;
  const guidance = alaraGuidance(EMsv);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor={`${id}-dose`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Absorbed Dose <span className="font-mono text-primary">[Gy]</span>
          </label>
          <input
            id={`${id}-dose`}
            type="number"
            min="0"
            step="0.001"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="dosimetry.effective_dose.dose_input"
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-radtype`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Radiation Type
          </label>
          <select
            id={`${id}-radtype`}
            value={radType}
            onChange={(e) => setRadType(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="dosimetry.effective_dose.rad_type.select"
          >
            {Object.entries(RAD_WEIGHTS).map(([k, v]) => (
              <option key={k} value={k}>
                {`${k.charAt(0).toUpperCase()}${k.slice(1)}`} (wᴿ = {v})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`${id}-tissue`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Tissue/Organ
          </label>
          <select
            id={`${id}-tissue`}
            value={tissue}
            onChange={(e) => setTissue(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="dosimetry.effective_dose.tissue.select"
          >
            {Object.entries(TISSUE_WEIGHTS).map(([k, v]) => (
              <option key={k} value={k}>
                {`${k.charAt(0).toUpperCase()}${k.slice(1).replace("-", " ")}`}{" "}
                (wᴛ = {v})
              </option>
            ))}
          </select>
        </div>
      </div>

      <EquationBlock
        latex="D = \frac{E_{\mathrm{dep}}}{m} \qquad [D] = \mathrm{Gy} = \mathrm{J\,kg^{-1}}"
        annotation="Absorbed dose D equals energy deposited per unit mass. The SI unit is the gray (Gy) = 1 joule per kilogram. Source: ICRP Publication 103 (2007)."
        label="Absorbed Dose (ICRP-103)"
      />
      <EquationBlock
        latex="H_T = \sum_R w_R \cdot D_{T,R} \qquad [H_T] = \mathrm{Sv}"
        annotation="Equivalent dose H_T to tissue T is the sum over all radiation types R of the radiation weighting factor w_R times the mean absorbed dose D_{T,R}. w_R: photons/electrons = 1, protons = 2, neutrons = 2.5–20 (energy-dependent), alpha = 20."
        label="Equivalent Dose — Radiation Weighting (ICRP-103)"
      />
      <EquationBlock
        latex="E = \sum_T w_T \cdot H_T \qquad [E] = \mathrm{Sv}"
        annotation="Effective dose E is the sum over tissues T of the tissue weighting factor w_T times the equivalent dose H_T. Tissue weights: gonads 0.08, lung 0.12, thyroid 0.04, bone marrow 0.12, skin 0.01, whole-body 1.0. Sum of all w_T = 1."
        label="Effective Dose — Tissue Weighting (ICRP-103)"
      />
      <EquationBlock
        latex="E_{50} = \sum_T w_T \cdot H_{T,50} \qquad H_{T,50} = \int_0^{50\,\mathrm{yr}} \dot{H}_T(t)\,dt"
        annotation="Committed effective dose E₅₀: integral of equivalent dose rate over 50 years after a single intake of radionuclide. Used for internal dosimetry and inhalation/ingestion dose assessment."
        label="Committed Effective Dose (ICRP-103)"
      />
      <EquationBlock
        latex="S = E \cdot N \qquad [S] = \mathrm{man\cdot Sv}"
        annotation="Collective dose S is the product of mean effective dose E and the number of individuals N exposed. Used for population-level risk assessment. Source: ICRP-103 §4.4."
        label="Collective Effective Dose"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "wᴿ (Radiation)", val: wR, unit: "" },
          { label: "Equivalent Dose H", val: H.toExponential(3), unit: "Sv" },
          { label: "wᴛ (Tissue)", val: wT, unit: "" },
          { label: "Effective Dose E", val: E.toExponential(3), unit: "Sv" },
        ].map(({ label, val, unit }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center"
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="font-mono text-lg font-bold text-primary">
              {val}{" "}
              <span className="text-sm text-muted-foreground">{unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Context: </span>
        This effective dose equals ≈{" "}
        <span className="font-mono text-primary">{chestXrays.toFixed(2)}</span>{" "}
        chest X-rays (0.1 mSv each). Natural background is{" "}
        <span className="font-mono text-primary">{BKG_MILLI_SV} mSv/year</span>{" "}
        (UNSCEAR global average).
      </div>

      <div className="rounded-lg border border-border bg-muted/10 p-4 flex items-start gap-3">
        <div
          className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${guidance.level === "Negligible" || guidance.level === "Low" ? "bg-emerald-400" : "bg-amber-400"}`}
        />
        <div>
          <p className={`text-sm font-semibold ${guidance.color} mb-1`}>
            ALARA: {guidance.level}
          </p>
          <p className="text-sm text-muted-foreground">{guidance.text}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Activity / Decay Calculator ──────────────────────────────────────────────
function ActivityCalc() {
  const id = useId();
  const [a0, setA0] = useState("1e9");
  const [a0Unit, setA0Unit] = useState("Bq");
  const [hlMode, setHlMode] = useState<"select" | "manual">("select");
  const [selectedIsotope, setSelectedIsotope] = useState("I-131");
  const [manualHl, setManualHl] = useState("600");
  const [tElapsed, setTElapsed] = useState("86400");
  const [tElapsedUnit, setTElapsedUnit] = useState("s");

  const hlSec =
    hlMode === "select"
      ? (COMMON_ISOTOPES[selectedIsotope]?.halfLifeSec ?? 1)
      : Number.parseFloat(manualHl) || 1;

  const a0Bq = Number.parseFloat(a0) * (a0Unit === "Ci" ? 3.7e10 : 1);
  const tSec = Number.parseFloat(tElapsed) * (TIME_FACTORS[tElapsedUnit] ?? 1);
  const lambda = Math.LN2 / hlSec;
  const At = a0Bq * Math.exp(-lambda * tSec);

  const chartData = useMemo(() => {
    const steps = 60;
    const totalT = hlSec * 6;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const tt = (i / steps) * totalT;
      return {
        t: Number((tt / hlSec).toFixed(2)),
        A: Number((((a0Bq * Math.exp(-lambda * tt)) / a0Bq) * 100).toFixed(2)),
      };
    });
  }, [a0Bq, lambda, hlSec]);

  const decayPct = (1 - At / a0Bq) * 100;
  const isSafe = At < 3.7e4;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor={`${id}-a0`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Initial Activity A₀
          </label>
          <div className="flex gap-2">
            <input
              id={`${id}-a0`}
              type="number"
              value={a0}
              onChange={(e) => setA0(e.target.value)}
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="dosimetry.activity.a0_input"
            />
            <select
              value={a0Unit}
              onChange={(e) => setA0Unit(e.target.value)}
              aria-label="Activity unit"
              className="rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option>Bq</option>
              <option>Ci</option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor={`${id}-hlmode`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Half-life
          </label>
          <div className="flex gap-2">
            <select
              id={`${id}-hlmode`}
              value={hlMode}
              onChange={(e) => setHlMode(e.target.value as "select" | "manual")}
              className="rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="select">Preset</option>
              <option value="manual">Manual (s)</option>
            </select>
            {hlMode === "select" ? (
              <select
                value={selectedIsotope}
                onChange={(e) => setSelectedIsotope(e.target.value)}
                aria-label="Select isotope preset"
                className="flex-1 rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="dosimetry.activity.isotope.select"
              >
                {Object.entries(COMMON_ISOTOPES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {k} ({v.halfLifeStr})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                value={manualHl}
                onChange={(e) => setManualHl(e.target.value)}
                placeholder="seconds"
                aria-label="Manual half-life in seconds"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="dosimetry.activity.halflife_input"
              />
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor={`${id}-t`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Time Elapsed
          </label>
          <div className="flex gap-2">
            <input
              id={`${id}-t`}
              type="number"
              value={tElapsed}
              onChange={(e) => setTElapsed(e.target.value)}
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="dosimetry.activity.time_input"
            />
            <select
              value={tElapsedUnit}
              onChange={(e) => setTElapsedUnit(e.target.value)}
              aria-label="Time unit"
              className="rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {Object.keys(TIME_FACTORS).map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div
            className={`rounded-lg border px-4 py-3 text-center ${isSafe ? "border-emerald-500/30 bg-emerald-950/30" : "border-amber-500/30 bg-amber-950/30"}`}
            data-ocid="dosimetry.activity.result_card"
          >
            <p className="text-xs text-muted-foreground mb-0.5">
              Remaining Activity
            </p>
            <p className="font-mono text-lg font-bold text-primary">
              {At.toExponential(3)}{" "}
              <span className="text-sm text-muted-foreground">Bq</span>
            </p>
            <p
              className={`text-xs mt-0.5 ${isSafe ? "text-emerald-400" : "text-amber-400"}`}
            >
              {decayPct.toFixed(1)}% decayed ·{" "}
              {isSafe ? "Below 1 µCi" : "Above 1 µCi"}
            </p>
          </div>
        </div>
      </div>

      <EquationBlock
        latex="A(t) = A_0 \cdot e^{-\lambda t}, \quad \lambda = \frac{\ln 2}{t_{1/2}}"
        annotation="Radioactive decay law: activity at time t equals initial activity × e^(−λt). Decay constant λ = ln(2) / half-life."
        label="Radioactive Decay Law"
      />

      <div className="rounded-lg border border-border bg-muted/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Decay Curve (% of Initial Activity)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              label={{
                value: "Half-lives elapsed",
                position: "insideBottom",
                offset: -2,
                fontSize: 11,
                fill: "var(--muted-foreground)",
              }}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              unit="%"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}%`, "Activity"]}
            />
            <ReferenceLine
              y={50}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{
                value: "50%",
                fontSize: 10,
                fill: "var(--muted-foreground)",
              }}
            />
            <Line
              type="monotone"
              dataKey="A"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function DosimetryCalculator() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Radiation Dosimetry Calculator"
        subtitle="Interactive calculators for dose rate (with log-scale benchmarks and shielding), effective dose, unit conversion, and radioactive decay activity."
        audienceLevel="professional"
        readTimeMin={8}
      />

      <SafetyCallout title="Educational Use Only — Not for Medical or Safety Decisions">
        These calculators use{" "}
        <strong>simplified models for educational purposes only</strong>. Never
        use them for real radiation safety, medical, or regulatory decisions.
        Always consult qualified health physicists and IAEA/NRC/ICRP guidance.
      </SafetyCallout>

      <div className="space-y-4 mt-6">
        <CollapsibleSection
          id="dose-rate"
          title="Dose Rate from Point Source (with Shielding & ALARA)"
          defaultOpen={true}
          data-ocid="dosimetry.dose_rate.section"
        >
          <DoseRateCalc />
        </CollapsibleSection>

        <CollapsibleSection
          id="effective-dose"
          title="Effective Dose Calculator"
          defaultOpen={false}
          data-ocid="dosimetry.effective_dose.section"
        >
          <EffectiveDoseCalc />
        </CollapsibleSection>

        <CollapsibleSection
          id="activity-calc"
          title="Activity / Radioactive Decay Calculator"
          defaultOpen={false}
          data-ocid="dosimetry.activity_calc.section"
        >
          <ActivityCalc />
        </CollapsibleSection>

        <CollapsibleSection
          id="unit-converter"
          title="Unit Converter (Gy, Sv, Bq, Ci, R)"
          defaultOpen={false}
          data-ocid="dosimetry.unit_converter.section"
        >
          <UnitConverter />
        </CollapsibleSection>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/20 p-4 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground">References:</strong> ICRP
          Publication 103 (2007) — Radiation weighting and tissue weighting
          factors. NIST Standard Reference Database 126. IAEA Safety Standards
          Series No. GSR Part 3. UNSCEAR 2020 Report — Sources and Effects of
          Ionizing Radiation.
        </p>
      </div>
    </div>
  );
}
