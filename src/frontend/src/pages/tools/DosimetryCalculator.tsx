import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { useId, useMemo, useState } from "react";
import {
  CartesianGrid,
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

const BKG_MILLI_SV = 2.4;
const TIME_FACTORS: Record<string, number> = {
  s: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  yr: 3.156e7,
};

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
      {/* Gy ↔ rad */}
      <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
        <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
          Absorbed Dose
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-gy`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              Gray <span className="font-mono text-primary">[Gy]</span>
            </label>
            <input
              id={`${id}-gy`}
              type="number"
              value={gyVal}
              onChange={(e) => setGyVal(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <span className="text-muted-foreground text-sm pb-2">⇄</span>
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-rad`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              rad <span className="font-mono text-primary">[rad]</span>
            </label>
            <input
              id={`${id}-rad`}
              type="text"
              readOnly
              value={gyToRad(gyVal)}
              className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm font-mono text-foreground"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">1 Gy = 100 rad</p>
      </div>
      {/* Sv ↔ rem */}
      <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
        <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
          Equivalent Dose
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-sv`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              Sievert <span className="font-mono text-primary">[Sv]</span>
            </label>
            <input
              id={`${id}-sv`}
              type="number"
              value={svVal}
              onChange={(e) => setSvVal(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <span className="text-muted-foreground text-sm pb-2">⇄</span>
          <div className="flex-1 min-w-28">
            <label
              htmlFor={`${id}-rem`}
              className="block text-xs font-semibold text-muted-foreground mb-1.5"
            >
              rem <span className="font-mono text-primary">[rem]</span>
            </label>
            <input
              id={`${id}-rem`}
              type="text"
              readOnly
              value={svToRem(svVal)}
              className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm font-mono text-foreground"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">1 Sv = 100 rem</p>
      </div>
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
  const chestXrays = (E * 1000) / 0.1;

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
        latex="H = w_R \cdot D \qquad E = w_T \cdot H"
        annotation="Equivalent dose H (Sv) = radiation weighting factor × absorbed dose (Gy). Effective dose E (Sv) = tissue weighting factor × equivalent dose."
        label="Dose Equations (ICRP 103)"
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
        chest X-rays (0.1 mSv each). Natural background radiation is
        approximately{" "}
        <span className="font-mono text-primary">{BKG_MILLI_SV} mSv/year</span>.
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
              className="text-xs mt-0.5"
              style={{ color: isSafe ? "#34d399" : "#fbbf24" }}
            >
              {decayPct.toFixed(1)}% decayed ·{" "}
              {isSafe ? "Below 1 µCi" : "Above 1 µCi threshold"}
            </p>
          </div>
        </div>
      </div>

      <EquationBlock
        latex="A(t) = A_0 \cdot e^{-\lambda t}, \quad \lambda = \frac{\ln 2}{t_{1/2}}"
        annotation="Radioactive decay law: activity at time t equals initial activity times e to the power of negative decay constant times t. Decay constant λ = ln(2) divided by half-life."
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

// ─── Dose Rate from Point Source ───────────────────────────────────────────────
function DoseRateCalc() {
  const id = useId();
  const [activity, setActivity] = useState("1e9");
  const [distance, setDistance] = useState(1);
  const [gammaProb, setGammaProb] = useState("0.85");
  const [energy, setEnergy] = useState("0.662");

  // Simplified point-source dose rate (µSv/h) using Γ factor approximation
  const GAMMA_CONST = 5.76e-13;
  const A = Number.parseFloat(activity) || 0;
  const Py = Number.parseFloat(gammaProb) || 0;
  const Eg = Number.parseFloat(energy) || 0;

  const doseRateAtDist =
    ((A * Py * Eg * GAMMA_CONST) / (distance * distance)) * 3600 * 1e6;

  const chartData = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const r = 0.1 + i * 0.2;
      const dr = ((A * Py * Eg * GAMMA_CONST) / (r * r)) * 3600 * 1e6;
      return { r: Number(r.toFixed(2)), doseRate: Number(dr.toFixed(3)) };
    });
  }, [A, Py, Eg]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>

      <EquationBlock
        latex="\dot{H} = \frac{A \cdot P_\gamma \cdot E_\gamma \cdot \Gamma}{r^2}"
        annotation="Dose rate Ḣ equals activity A times gamma emission probability Pγ times photon energy Eγ times gamma constant Γ divided by distance squared (inverse square law)."
        label="Point Source Dose Rate (simplified)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center"
          data-ocid="dosimetry.dose_rate.result_card"
        >
          <p className="text-xs text-muted-foreground mb-1">
            Dose Rate at {distance} m
          </p>
          <p className="font-mono text-2xl font-bold text-primary">
            {doseRateAtDist.toExponential(3)}
          </p>
          <p className="text-sm text-muted-foreground">µSv/h</p>
          {doseRateAtDist > 25000 && (
            <p className="text-xs text-amber-400 mt-1 font-semibold">
              ⚠ Exceeds 25 mSv/h occupational limit
            </p>
          )}
        </div>
        <div className="rounded-lg border border-border bg-muted/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Dose Rate vs Distance (µSv/h)
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={chartData}>
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
        subtitle="Interactive calculators for unit conversion, effective dose, radioactive decay activity, and point-source dose rates. All formulas shown with references."
        audienceLevel="professional"
        readTimeMin={8}
      />

      <SafetyCallout title="Educational Use Only — Not for Medical or Safety Decisions">
        These calculators are provided for{" "}
        <strong>educational and training purposes only</strong>. They use
        simplified models and should never be used to make actual radiation
        safety, medical, or regulatory decisions. Always consult qualified
        health physicists, medical professionals, and relevant regulatory
        guidance (IAEA, NRC, ICRP) for real-world assessments.
      </SafetyCallout>

      <div className="space-y-4 mt-6">
        <CollapsibleSection
          id="unit-converter"
          title="Unit Converter"
          defaultOpen={true}
          data-ocid="dosimetry.unit_converter.section"
        >
          <UnitConverter />
        </CollapsibleSection>

        <CollapsibleSection
          id="effective-dose"
          title="Effective Dose Calculator"
          defaultOpen={true}
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
          id="dose-rate"
          title="Dose Rate from Point Source"
          defaultOpen={false}
          data-ocid="dosimetry.dose_rate.section"
        >
          <DoseRateCalc />
        </CollapsibleSection>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/20 p-4 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground">References:</strong> ICRP
          Publication 103 (2007) — The 2007 Recommendations of the International
          Commission on Radiological Protection. NIST Standard Reference
          Database 126. IAEA Safety Standards Series No. GSR Part 3.
        </p>
      </div>
    </div>
  );
}
