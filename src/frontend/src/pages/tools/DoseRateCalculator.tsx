import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { SectionCard } from "@/components/SectionCard";
import { useId, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Nuclide Data ────────────────────────────────────────────────────────────
interface NuclideData {
  label: string;
  gammaConstant: number; // µSv·m²/(h·GBq)
  energies: number[]; // MeV
  halfLife: string;
}

const NUCLIDES: Record<string, NuclideData> = {
  "Cs-137": {
    label: "Cesium-137",
    gammaConstant: 0.092,
    energies: [0.662],
    halfLife: "30.2 yr",
  },
  "Co-60": {
    label: "Cobalt-60",
    gammaConstant: 0.351,
    energies: [1.17, 1.33],
    halfLife: "5.27 yr",
  },
  "I-131": {
    label: "Iodine-131",
    gammaConstant: 0.059,
    energies: [0.364],
    halfLife: "8.02 days",
  },
  "Ir-192": {
    label: "Iridium-192",
    gammaConstant: 0.13,
    energies: [0.316, 0.468],
    halfLife: "73.8 days",
  },
  "Ra-226": {
    label: "Radium-226",
    gammaConstant: 0.195,
    energies: [0.186, 0.262],
    halfLife: "1,600 yr",
  },
  "Am-241": {
    label: "Americium-241",
    gammaConstant: 0.006,
    energies: [0.059],
    halfLife: "432 yr",
  },
  "Ba-133": {
    label: "Barium-133",
    gammaConstant: 0.032,
    energies: [0.081, 0.276, 0.303],
    halfLife: "10.5 yr",
  },
  "Ga-67": {
    label: "Gallium-67",
    gammaConstant: 0.021,
    energies: [0.093, 0.184, 0.296],
    halfLife: "3.26 days",
  },
  "Tc-99m": {
    label: "Technetium-99m",
    gammaConstant: 0.018,
    energies: [0.141],
    halfLife: "6.01 hr",
  },
  custom: {
    label: "Custom Source",
    gammaConstant: 0.1,
    energies: [1.0],
    halfLife: "N/A",
  },
};

// Linear attenuation coefficients μ (cm⁻¹) at ~1 MeV
const ATTENUATION: Record<string, Record<string, number>> = {
  "Cs-137": { water: 0.086, concrete: 0.12, lead: 1.2, steel: 0.6 },
  "Co-60": { water: 0.067, concrete: 0.1, lead: 0.65, steel: 0.45 },
  "I-131": { water: 0.1, concrete: 0.14, lead: 1.5, steel: 0.75 },
  "Ir-192": { water: 0.095, concrete: 0.13, lead: 1.3, steel: 0.68 },
  "Ra-226": { water: 0.12, concrete: 0.16, lead: 1.8, steel: 0.9 },
  "Am-241": { water: 0.38, concrete: 0.45, lead: 15.0, steel: 5.0 },
  "Ba-133": { water: 0.16, concrete: 0.22, lead: 3.0, steel: 1.5 },
  "Ga-67": { water: 0.14, concrete: 0.19, lead: 2.5, steel: 1.3 },
  "Tc-99m": { water: 0.15, concrete: 0.2, lead: 2.8, steel: 1.4 },
  custom: { water: 0.1, concrete: 0.15, lead: 1.5, steel: 0.7 },
};

const MATERIALS = [
  { key: "none", label: "None" },
  { key: "water", label: "Water" },
  { key: "concrete", label: "Concrete" },
  { key: "lead", label: "Lead" },
  { key: "steel", label: "Steel" },
];

// IAEA dose limits (mSv/yr)
const OCCUPATIONAL_LIMIT = 20;
const PUBLIC_LIMIT = 1;

// ─── Main Component ──────────────────────────────────────────────────────────
export default function DoseRateCalculator() {
  const id = useId();
  const [nuclide, setNuclide] = useState("Cs-137");
  const [activity, setActivity] = useState(1);
  const [activityUnit, setActivityUnit] = useState<"GBq" | "mCi">("GBq");
  const [distance, setDistance] = useState(1);
  const [shieldMaterial, setShieldMaterial] = useState("none");
  const [shieldThickness, setShieldThickness] = useState(0);
  const [doseUnit, setDoseUnit] = useState<"mSv/h" | "µSv/h">("µSv/h");
  const [customGamma, setCustomGamma] = useState(0.1);

  const nuclideData = NUCLIDES[nuclide];
  const isCustom = nuclide === "custom";

  // Convert activity to GBq
  const activityGBq = activityUnit === "GBq" ? activity : activity * 0.037;

  // Gamma constant
  const gammaConst = isCustom ? customGamma : nuclideData.gammaConstant;

  // Dose rate calculation: Ḣ = Γ × A / r² × exp(-μx)
  const doseRateUnshielded = (gammaConst * activityGBq) / (distance * distance);
  const mu =
    shieldMaterial !== "none"
      ? (ATTENUATION[nuclide]?.[shieldMaterial] ?? 0.1)
      : 0;
  const transmission =
    shieldMaterial !== "none" ? Math.exp(-mu * shieldThickness) : 1;
  const doseRateShielded = doseRateUnshielded * transmission;
  const attenuationFactor = transmission;

  // Convert to selected unit
  const displayDose =
    doseUnit === "mSv/h" ? doseRateShielded / 1000 : doseRateShielded;
  const displayUnshielded =
    doseUnit === "mSv/h" ? doseRateUnshielded / 1000 : doseRateUnshielded;

  // Annual dose at this rate
  const annualDoseMSv = (doseRateShielded * 2000) / 1000; // 2000 hr/yr occupational

  // Distance curve data
  const distanceCurve = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const r = 0.5 + i * 2;
      const dr = ((gammaConst * activityGBq) / (r * r)) * transmission;
      return {
        distance: Number(r.toFixed(1)),
        doseRate: Number((doseUnit === "mSv/h" ? dr / 1000 : dr).toFixed(4)),
      };
    });
  }, [gammaConst, activityGBq, transmission, doseUnit]);

  // Shielding comparison (same thickness, different materials)
  const shieldingComparison = useMemo(() => {
    if (shieldThickness <= 0) return [];
    return MATERIALS.filter((m) => m.key !== "none").map((m) => {
      const muVal = ATTENUATION[nuclide]?.[m.key] ?? 0.1;
      const trans = Math.exp(-muVal * shieldThickness);
      const dr = ((gammaConst * activityGBq) / (distance * distance)) * trans;
      return {
        material: m.label,
        doseRate: Number((doseUnit === "mSv/h" ? dr / 1000 : dr).toFixed(4)),
      };
    });
  }, [nuclide, gammaConst, activityGBq, distance, shieldThickness, doseUnit]);

  // Half-value layers
  const hvlData = useMemo(() => {
    return MATERIALS.filter((m) => m.key !== "none").map((m) => {
      const muVal = ATTENUATION[nuclide]?.[m.key] ?? 0.1;
      return {
        material: m.label,
        hvl:
          muVal > 0
            ? Number((Math.LN2 / muVal).toFixed(2))
            : Number.POSITIVE_INFINITY,
      };
    });
  }, [nuclide]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Dose Rate Calculator"
        subtitle="Calculate radiation dose rate from a radioactive point source using the inverse-square law with shielding attenuation. Based on specific gamma-ray constants from NIST and IAEA data."
        audienceLevel="professional"
        readTimeMin={8}
      />

      <SafetyCallout title="Educational Use Only">
        This calculator uses simplified point-source approximations for
        educational purposes. Real radiation protection calculations require
        qualified health physicists and site-specific surveys.
      </SafetyCallout>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        {/* ── Inputs ─────────────────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-1 space-y-5"
          data-ocid="doserate.inputs.panel"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">
            Source Configuration
          </h2>

          <div>
            <label
              htmlFor={`${id}-nuclide`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Radionuclide
            </label>
            <select
              id={`${id}-nuclide`}
              value={nuclide}
              onChange={(e) => setNuclide(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="doserate.nuclide.select"
            >
              {Object.entries(NUCLIDES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label} (Γ = {v.gammaConstant} µSv·m²/h·GBq)
                </option>
              ))}
            </select>
          </div>

          {isCustom && (
            <div>
              <label
                htmlFor={`${id}-custom-gamma`}
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Custom Γ Constant{" "}
                <span className="font-mono text-primary">[µSv·m²/(h·GBq)]</span>
              </label>
              <input
                id={`${id}-custom-gamma`}
                type="number"
                step="0.001"
                value={customGamma}
                onChange={(e) =>
                  setCustomGamma(Number.parseFloat(e.target.value) || 0)
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="doserate.custom_gamma.input"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="dr-activity"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Activity
            </label>
            <div className="flex gap-2">
              <input
                id="dr-activity"
                type="number"
                min="0"
                step="0.1"
                value={activity}
                onChange={(e) =>
                  setActivity(Number.parseFloat(e.target.value) || 0)
                }
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="doserate.activity.input"
              />
              <select
                value={activityUnit}
                onChange={(e) =>
                  setActivityUnit(e.target.value as "GBq" | "mCi")
                }
                className="rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="doserate.activity_unit.select"
              >
                <option>GBq</option>
                <option>mCi</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {nuclideData.halfLife} half-life
            </p>
          </div>

          <div>
            <label
              htmlFor={`${id}-dist`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Distance:{" "}
              <span className="font-mono text-primary">{distance} m</span>
            </label>
            <input
              id={`${id}-dist`}
              type="range"
              min="0.1"
              max="50"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(Number.parseFloat(e.target.value))}
              className="w-full accent-primary"
              data-ocid="doserate.distance.toggle"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.1 m</span>
              <span>50 m</span>
            </div>
          </div>

          <div>
            <label
              htmlFor={`${id}-shield-mat`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Shielding Material
            </label>
            <select
              id={`${id}-shield-mat`}
              value={shieldMaterial}
              onChange={(e) => setShieldMaterial(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="doserate.shield_material.select"
            >
              {MATERIALS.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {shieldMaterial !== "none" && (
            <div>
              <label
                htmlFor={`${id}-shield-thick`}
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Thickness:{" "}
                <span className="font-mono text-primary">
                  {shieldThickness} cm
                </span>
              </label>
              <input
                id={`${id}-shield-thick`}
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={shieldThickness}
                onChange={(e) =>
                  setShieldThickness(Number.parseFloat(e.target.value))
                }
                className="w-full accent-primary"
                data-ocid="doserate.shield_thickness.toggle"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 cm</span>
                <span>30 cm</span>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="dr-dose-unit"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Dose Unit
            </label>
            <div className="flex gap-2" id="dr-dose-unit">
              {(["µSv/h", "mSv/h"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setDoseUnit(u)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    doseUnit === u
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40"
                  }`}
                  data-ocid={`doserate.unit.${u === "µSv/h" ? "usv" : "msv"}.toggle`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ── Results ────────────────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-2 space-y-6"
          data-ocid="doserate.results.panel"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Dose Rate (unshielded)",
                value: displayUnshielded.toFixed(4),
                unit: doseUnit,
              },
              {
                label: "Dose Rate (shielded)",
                value: displayDose.toFixed(4),
                unit: doseUnit,
              },
              {
                label: "Attenuation Factor",
                value: `${(attenuationFactor * 100).toFixed(2)}%`,
                unit: "",
              },
              {
                label: "Annual Dose (2000 hr)",
                value: `${annualDoseMSv.toFixed(3)}`,
                unit: "mSv/yr",
              },
            ].map(({ label, value, unit }) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-muted/20 px-3 py-3 text-center"
              >
                <p className="text-xs text-muted-foreground mb-1 leading-tight">
                  {label}
                </p>
                <p className="font-mono text-lg font-bold text-primary">
                  {value}
                </p>
                {unit && (
                  <p className="text-xs text-muted-foreground">{unit}</p>
                )}
              </div>
            ))}
          </div>

          {/* Safety context */}
          <div className="rounded-lg border border-border bg-muted/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Safety Context (IAEA Limits)
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Occupational limit (20 mSv/yr)
                </span>
                <div className="flex-1 mx-3 h-2 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.min((annualDoseMSv / OCCUPATIONAL_LIMIT) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-xs">
                  {((annualDoseMSv / OCCUPATIONAL_LIMIT) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Public limit (1 mSv/yr)
                </span>
                <div className="flex-1 mx-3 h-2 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{
                      width: `${Math.min((annualDoseMSv / PUBLIC_LIMIT) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-xs">
                  {((annualDoseMSv / PUBLIC_LIMIT) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Distance curve */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Dose Rate vs Distance ({doseUnit})
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={distanceCurve}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="distance"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    label={{
                      value: "Distance (m)",
                      position: "insideBottom",
                      offset: -2,
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [`${v} ${doseUnit}`, "Dose Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="doseRate"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Shielding comparison */}
            {shieldingComparison.length > 0 && (
              <div className="rounded-lg border border-border bg-muted/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Shielding Comparison ({shieldThickness} cm, {doseUnit})
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={shieldingComparison}
                    layout="vertical"
                    margin={{ left: 60 }}
                  >
                    <CartesianGrid
                      stroke="var(--border)"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="material"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      width={55}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                      formatter={(v: number) => [
                        `${v} ${doseUnit}`,
                        "Dose Rate",
                      ]}
                    />
                    <Bar
                      dataKey="doseRate"
                      fill="#a855f7"
                      radius={[0, 3, 3, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* ── HVL Table ────────────────────────────────────────────────────── */}
      <SectionCard className="mt-6" data-ocid="doserate.hvl.table">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Half-Value Layers for {nuclideData.label}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pr-4">Material</th>
                <th className="pb-2 pr-4">μ (cm⁻¹)</th>
                <th className="pb-2 pr-4">HVL (cm)</th>
                <th className="pb-2">TVL (cm)</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {hvlData.map((row) => (
                <tr key={row.material} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-foreground">{row.material}</td>
                  <td className="py-2 pr-4 font-mono">
                    {(
                      ATTENUATION[nuclide]?.[row.material.toLowerCase()] ?? 0
                    ).toFixed(3)}
                  </td>
                  <td className="py-2 pr-4 font-mono text-primary">
                    {row.hvl === Number.POSITIVE_INFINITY ? "∞" : row.hvl}
                  </td>
                  <td className="py-2 font-mono">
                    {row.hvl === Number.POSITIVE_INFINITY
                      ? "∞"
                      : (row.hvl * 3.32).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          HVL = ln(2)/μ, TVL = ln(10)/μ ≈ 3.32 × HVL. Attenuation coefficients
          approximate values at the primary gamma energy of the selected
          nuclide. Source: NIST XCOM database, IAEA Safety Reports Series No.
          44.
        </p>
      </SectionCard>

      {/* ── Equation ─────────────────────────────────────────────────────── */}
      <SectionCard className="mt-6" data-ocid="doserate.equation.section">
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          Physics Model
        </h2>
        <EquationBlock
          latex="\\dot{H} = \\frac{\\Gamma \\cdot A}{r^2} \\cdot e^{-\\mu x}"
          annotation="Dose rate Ḣ (µSv/h) from a point source. Γ = specific gamma-ray constant (µSv·m²/h·GBq), A = activity (GBq), r = distance (m), μ = linear attenuation coefficient (cm⁻¹), x = shielding thickness (cm). Source: IAEA Safety Reports Series No. 44."
          label="Point Source Dose Rate with Shielding"
        />
        <EquationBlock
          latex="I = I_0\\,e^{-\\mu x} \\qquad \\mathrm{HVL} = \\frac{\\ln 2}{\\mu}, \\quad \\mathrm{TVL} = \\frac{\\ln 10}{\\mu} \\approx 3.32 \\cdot \\mathrm{HVL}"
          annotation="Exponential attenuation law. HVL (half-value layer) is the thickness that reduces intensity by 50%. TVL (tenth-value layer) reduces intensity by 90%. μ values from NIST XCOM database."
          label="Photon Attenuation & HVL/TVL"
        />
        <EquationBlock
          latex="I \\propto \\frac{1}{r^2} \\qquad \\Rightarrow \\qquad \\frac{I_2}{I_1} = \\left(\\frac{r_1}{r_2}\\right)^2"
          annotation="Inverse-square law: intensity (dose rate) decreases with the square of distance from a point source in air. Doubling the distance reduces dose rate by a factor of 4. Valid for point sources in open geometry."
          label="Inverse-Square Law"
        />
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Ḣ</strong> = Dose rate (µSv/h or
            mSv/h)
          </p>
          <p>
            <strong className="text-foreground">Γ</strong> = Specific gamma-ray
            constant (µSv·m²/h·GBq)
          </p>
          <p>
            <strong className="text-foreground">A</strong> = Activity (GBq)
          </p>
          <p>
            <strong className="text-foreground">r</strong> = Distance from
            source (m)
          </p>
          <p>
            <strong className="text-foreground">μ</strong> = Linear attenuation
            coefficient (cm⁻¹)
          </p>
          <p>
            <strong className="text-foreground">x</strong> = Shielding thickness
            (cm)
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
