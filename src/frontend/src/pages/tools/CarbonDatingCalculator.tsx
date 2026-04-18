import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { useMemo, useState } from "react";
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
const C14_HALF_LIFE = 5730; // years (Libby conventional)
const C14_HALF_LIFE_SIGMA = 40; // ±40 years
const LAMBDA = Math.LN2 / C14_HALF_LIFE; // decay constant yr⁻¹
const ANALYTICAL_UNCERTAINTY = 0.005; // 0.5% default analytical uncertainty
const MAX_AGE_YEARS = 50_000;

// Sample types with typical initial pMC
const SAMPLE_TYPES: Record<
  string,
  { label: string; pMC: number; note: string }
> = {
  wood: {
    label: "Wood",
    pMC: 100,
    note: "Trees equilibrate with atmospheric CO₂; initial pMC ≈ 100 (modern standard)",
  },
  bone: {
    label: "Bone (collagen)",
    pMC: 100,
    note: "Collagen carbon derives from diet; pMC reflects atmospheric C-14 at time of death",
  },
  charcoal: {
    label: "Charcoal",
    pMC: 100,
    note: "Charcoal from wood retains the C-14 signature of the living wood",
  },
  cloth: {
    label: "Cloth / Linen",
    pMC: 100,
    note: "Plant-fiber textiles (flax, cotton) incorporate atmospheric C-14 during growth",
  },
  peat: {
    label: "Peat",
    pMC: 100,
    note: "Organic peat accumulates from contemporary plant material; initial pMC ≈ 100",
  },
  plant: {
    label: "Plant Material",
    pMC: 100,
    note: "General plant tissue exchanges CO₂ with atmosphere during photosynthesis",
  },
  custom: {
    label: "Custom",
    pMC: 100,
    note: "Enter a custom initial pMC based on your sample's specific context",
  },
};

// ─── Types ──────────────────────────────────────────────────────────────────────
interface CalcResult {
  ageYears: number;
  uncertaintyYears: number;
  calibrationNote: string;
  warning: string | null;
}

// ─── Chart helpers ──────────────────────────────────────────────────────────────
const X_MAX = 60_000;
const HALF_LIFE_MARKERS = [5730, 11460, 17190, 22920];

function buildDecayCurve(): {
  t: number;
  fraction: number;
  upper: number;
  lower: number;
}[] {
  return Array.from({ length: 201 }, (_, i) => {
    const t = (i / 200) * X_MAX;
    const fraction = Math.exp(-LAMBDA * t) * 100;
    // ±1σ bands: propagate half-life uncertainty through age-to-fraction conversion
    const sigmaBand =
      fraction * (C14_HALF_LIFE_SIGMA / C14_HALF_LIFE) * Math.abs(LAMBDA * t);
    return {
      t: Math.round(t),
      fraction: Number.parseFloat(fraction.toFixed(4)),
      upper: Number.parseFloat(Math.min(100, fraction + sigmaBand).toFixed(4)),
      lower: Number.parseFloat(Math.max(0, fraction - sigmaBand).toFixed(4)),
    };
  });
}

// ─── Calculation ────────────────────────────────────────────────────────────────
function calculateAge(n0pMC: number, nPMC: number): CalcResult {
  const ratio = nPMC / n0pMC;
  const ageYears = -Math.log(ratio) / LAMBDA;

  // σ_age = age * sqrt((σ_N/N)^2 + (σ_N0/N0)^2 + (σ_t½/t½)^2)
  const sigmaRatio = Math.sqrt(
    2 * ANALYTICAL_UNCERTAINTY ** 2 +
      (C14_HALF_LIFE_SIGMA / C14_HALF_LIFE) ** 2,
  );
  const uncertaintyYears = ageYears * sigmaRatio;

  let warning: string | null = null;
  if (ageYears > MAX_AGE_YEARS) {
    warning = `Calculated age (${Math.round(ageYears).toLocaleString()} yr) exceeds the practical detection limit of radiocarbon dating (~50,000 yr). Results unreliable.`;
  }

  return {
    ageYears,
    uncertaintyYears,
    calibrationNote:
      "Calibration via IntCal20 (Reimer et al., 2020) can shift the calendar age ±100–500 years relative to the conventional radiocarbon age reported here.",
    warning,
  };
}

// ─── CSV Export ────────────────────────────────────────────────────────────────
function exportCSV(
  sampleType: string,
  n0pMC: number,
  nPMC: number,
  result: CalcResult,
) {
  const rows = [
    [
      "sample_type",
      "initial_pMC",
      "current_pMC",
      "age_years",
      "uncertainty_years",
    ],
    [
      sampleType,
      n0pMC.toFixed(4),
      nPMC.toFixed(4),
      result.ageYears.toFixed(4),
      result.uncertaintyYears.toFixed(4),
    ],
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "carbon-dating-result.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Tooltip Component ─────────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  const main = payload.find((p) => p.name === "fraction");
  return (
    <div
      className="rounded-lg border border-border bg-popover p-3 text-xs shadow-lg"
      role="tooltip"
    >
      <p className="font-semibold text-foreground mb-1">
        {(label ?? 0).toLocaleString()} yr BP
      </p>
      {main && (
        <p className="text-primary">
          C-14 remaining:{" "}
          <span className="font-mono">{main.value.toFixed(2)}%</span>
        </p>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function CarbonDatingCalculator() {
  const [sampleType, setSampleType] = useState("wood");
  const [n0pMC, setN0pMC] = useState(100);
  const [nPMC, setNpMC] = useState(50);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const decayCurveData = useMemo(() => buildDecayCurve(), []);
  const sample = SAMPLE_TYPES[sampleType];

  function handleSampleTypeChange(type: string) {
    setSampleType(type);
    if (type !== "custom") {
      setN0pMC(SAMPLE_TYPES[type].pMC);
    }
    setResult(null);
    setHasCalculated(false);
    setInputError(null);
  }

  function validate(): boolean {
    if (nPMC <= 0) {
      setInputError(
        "Current pMC must be greater than 0 (below detection limit).",
      );
      return false;
    }
    if (nPMC >= n0pMC) {
      setInputError(
        "Current pMC must be less than initial pMC — C-14 can only decrease over time.",
      );
      return false;
    }
    if (n0pMC <= 0 || n0pMC > 200) {
      setInputError("Initial pMC must be between 0 and 200.");
      return false;
    }
    setInputError(null);
    return true;
  }

  function handleCalculate() {
    if (!validate()) return;
    setIsCalculating(true);
    // Small timeout to show loading state
    setTimeout(() => {
      setResult(calculateAge(n0pMC, nPMC));
      setHasCalculated(true);
      setIsCalculating(false);
    }, 200);
  }

  // User's sample point on the curve
  const samplePoint =
    hasCalculated && result
      ? {
          t: Math.round(result.ageYears),
          fraction: Number.parseFloat(nPMC.toFixed(4)),
        }
      : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Carbon Dating Calculator"
        subtitle="Calculate the radiocarbon age of organic samples using the ¹⁴C decay equation. Based on the Libby half-life (5,730 ± 40 yr) with IntCal20 calibration notes."
        audienceLevel="intermediate"
        readTimeMin={6}
      />

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── LEFT CARD: Input & Results ───────────────────────────────────── */}
        <div className="rounded-xl border border-border bg-card shadow-card p-6 space-y-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Sample Input
          </h2>

          {/* Sample Type */}
          <div>
            <label
              htmlFor="carbon-sample-type"
              className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
            >
              Sample Type
            </label>
            <select
              id="carbon-sample-type"
              value={sampleType}
              onChange={(e) => handleSampleTypeChange(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="carbon.sample_type.select"
            >
              {Object.entries(SAMPLE_TYPES).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {sample.note}
            </p>
          </div>

          {/* Initial pMC */}
          <div>
            <label
              htmlFor="carbon-n0pmc"
              className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
            >
              Initial ¹⁴C Activity — N₀{" "}
              <span className="font-mono text-primary">[pMC]</span>
            </label>
            <input
              id="carbon-n0pmc"
              type="number"
              min="0.001"
              max="200"
              step="0.1"
              value={n0pMC}
              onChange={(e) => {
                setN0pMC(Number.parseFloat(e.target.value) || 0);
                setResult(null);
                setHasCalculated(false);
              }}
              disabled={sampleType !== "custom"}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              data-ocid="carbon.n0pmc.input"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Percent Modern Carbon (pMC). Standard modern reference = 100 pMC.
              {sampleType !== "custom" && " Edit by selecting Custom above."}
            </p>
          </div>

          {/* Current pMC */}
          <div>
            <label
              htmlFor="carbon-npmc"
              className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
            >
              Current Measured Activity — N(t){" "}
              <span className="font-mono text-primary">[pMC]</span>
            </label>
            <input
              id="carbon-npmc"
              type="number"
              min="0.001"
              max="200"
              step="0.1"
              value={nPMC}
              onChange={(e) => {
                setNpMC(Number.parseFloat(e.target.value) || 0);
                setResult(null);
                setHasCalculated(false);
                setInputError(null);
              }}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="carbon.npmc.input"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Measured ¹⁴C activity in the sample. Values above N₀ are
              physically impossible.
            </p>
          </div>

          {/* Validation error */}
          {inputError && (
            <div
              className="rounded-lg border border-amber-500/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-300"
              role="alert"
              data-ocid="carbon.validation.error_state"
            >
              ⚠ {inputError}
            </div>
          )}

          {/* Decay equations */}
          <EquationBlock
            latex="N(t) = N_0 \cdot e^{-\lambda t} \qquad \lambda = \frac{\ln 2}{t_{1/2}}"
            annotation="N(t) is the remaining C-14 fraction at time t. N₀ is the initial C-14 fraction. λ is the decay constant = ln(2) divided by the half-life t½ = 5,730 years."
            label="Radiocarbon Decay Law (Libby 1949)"
          />

          {/* Calculate button */}
          <button
            type="button"
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-opacity disabled:opacity-60"
            data-ocid="carbon.calculate.primary_button"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"
                  aria-hidden="true"
                />
                Calculating…
              </span>
            ) : (
              "Calculate Age"
            )}
          </button>

          {/* Results */}
          {hasCalculated && result && (
            <div
              className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-4"
              data-ocid="carbon.result.card"
            >
              <h3 className="font-display text-base font-semibold text-foreground">
                Calculated Age
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Conventional Radiocarbon Age
                  </p>
                  <p className="font-mono text-2xl font-bold text-primary">
                    {Math.round(result.ageYears).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">yr BP</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    ±1σ Uncertainty
                  </p>
                  <p className="font-mono text-2xl font-bold text-foreground">
                    ±{Math.round(result.uncertaintyYears).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">yr</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-foreground">Age:</span>{" "}
                  <span className="font-mono text-primary">
                    {result.ageYears.toFixed(4)} ±{" "}
                    {result.uncertaintyYears.toFixed(4)} yr BP
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Precision:
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {(
                      (result.uncertaintyYears / result.ageYears) *
                      100
                    ).toFixed(2)}
                    % (includes analytical σ = 0.5% and t½ uncertainty σ = ±40
                    yr)
                  </span>
                </p>
              </div>

              {result.warning && (
                <div
                  className="rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-300"
                  role="alert"
                  data-ocid="carbon.age_limit.error_state"
                >
                  ⚠ {result.warning}
                </div>
              )}

              <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  Calibration note:
                </span>{" "}
                {result.calibrationNote}
              </div>

              {/* CSV Export */}
              <button
                type="button"
                onClick={() => exportCSV(sampleType, n0pMC, nPMC, result)}
                className="w-full rounded-lg border border-border bg-muted/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                data-ocid="carbon.export.secondary_button"
              >
                ↓ Export CSV
              </button>
            </div>
          )}
        </div>

        {/* ── RIGHT CARD: Decay Curve ──────────────────────────────────────── */}
        <div className="rounded-xl border border-border bg-card shadow-card p-6 space-y-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              ¹⁴C Decay Curve
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Exponential decay from N₀ to 0 over 60,000 years. Dashed lines
              mark half-life intervals. ±1σ uncertainty bands shown.
            </p>
          </div>

          <div
            className="rounded-lg border border-border bg-background/50 p-4"
            aria-label="Carbon-14 decay curve: exponential decay of C-14 fraction over 60,000 years with half-life markers at 5730, 11460, 17190, and 22920 years"
            role="img"
          >
            <ResponsiveContainer width="100%" height={380}>
              <LineChart
                data={decayCurveData}
                margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="t"
                  type="number"
                  domain={[0, X_MAX]}
                  tickFormatter={(v: number) =>
                    v === 0 ? "0" : `${(v / 1000).toFixed(0)}k`
                  }
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  label={{
                    value: "Time (years BP)",
                    position: "insideBottom",
                    offset: -15,
                    fontSize: 12,
                    fill: "var(--muted-foreground)",
                  }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(v: number) => `${v}%`}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  label={{
                    value: "¹⁴C Fraction (%)",
                    angle: -90,
                    position: "insideLeft",
                    offset: 15,
                    fontSize: 12,
                    fill: "var(--muted-foreground)",
                  }}
                />
                <Tooltip content={<ChartTooltip />} />

                {/* ±1σ upper band */}
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="#22d3ee"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  dot={false}
                  name="upper"
                  opacity={0.4}
                />
                {/* ±1σ lower band */}
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="#22d3ee"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  dot={false}
                  name="lower"
                  opacity={0.4}
                />
                {/* Main decay curve */}
                <Line
                  type="monotone"
                  dataKey="fraction"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  dot={false}
                  name="fraction"
                />

                {/* Half-life vertical markers */}
                {HALF_LIFE_MARKERS.map((yr, i) => (
                  <ReferenceLine
                    key={yr}
                    x={yr}
                    stroke="#a855f7"
                    strokeDasharray="6 3"
                    strokeWidth={1.5}
                    opacity={0.7}
                    label={{
                      value: `${i + 1} t½`,
                      position: "top",
                      fontSize: 10,
                      fill: "#a855f7",
                      offset: 4,
                    }}
                  />
                ))}

                {/* User sample point */}
                {samplePoint && (
                  <ReferenceLine
                    x={samplePoint.t}
                    stroke="#f59e0b"
                    strokeWidth={2}
                    label={{
                      value: `Sample: ${samplePoint.fraction.toFixed(1)}% @ ${samplePoint.t.toLocaleString()} yr`,
                      position: "insideTopRight",
                      fontSize: 10,
                      fill: "#f59e0b",
                      offset: 6,
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-6 bg-[#22d3ee]" />
              N(t)/N₀ decay curve
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-6 bg-[#22d3ee] opacity-40 border-t border-dashed border-[#22d3ee]" />
              ±1σ uncertainty bands
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-6 bg-[#a855f7]"
                style={{ borderTop: "2px dashed #a855f7" }}
              />
              Half-life markers (t½)
            </span>
            {samplePoint && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-4 bg-[#f59e0b]" />
                Your sample
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Educational Section ────────────────────────────────────────────────── */}
      <div className="mt-8 space-y-4">
        <h2 className="font-display text-2xl font-bold text-foreground">
          How Carbon Dating Works
        </h2>

        {/* High School */}
        <CollapsibleSection
          id="carbon-hs"
          title="High School — Plain Language Overview"
          badge={
            <span className="rounded-full bg-emerald-900/40 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              High School
            </span>
          }
          defaultOpen={true}
          data-ocid="carbon.education.hs.section"
        >
          <div className="prose prose-invert prose-sm max-w-none space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Step 1 — Cosmic rays make C-14 in the atmosphere.
              </strong>{" "}
              High-energy particles from space constantly bombard Earth's upper
              atmosphere, converting nitrogen-14 into carbon-14 (¹⁴C), a
              slightly heavier, radioactive form of carbon.
            </p>
            <p>
              <strong className="text-foreground">
                Step 2 — Plants absorb C-14 during photosynthesis.
              </strong>{" "}
              All plants take in CO₂ from the air, including CO₂ molecules
              containing ¹⁴C. As long as a plant is alive, the ratio of ¹⁴C to
              ordinary ¹²C in its tissues matches the atmosphere — approximately
              1 part per trillion.
            </p>
            <p>
              <strong className="text-foreground">
                Step 3 — Animals absorb C-14 by eating plants.
              </strong>{" "}
              When animals eat plants, the same ratio of ¹⁴C to ¹²C is passed up
              the food chain. All living things continuously exchange carbon
              with the environment.
            </p>
            <p>
              <strong className="text-foreground">
                Step 4 — The clock starts at death.
              </strong>{" "}
              When an organism dies, it stops exchanging carbon with the
              atmosphere. The ¹⁴C in its body begins to decay — slowly
              converting back to nitrogen-14. The amount of ¹⁴C decreases by
              half every 5,730 years.
            </p>
            <p>
              <strong className="text-foreground">
                Step 5 — Scientists measure the remaining C-14.
              </strong>{" "}
              By comparing the ¹⁴C fraction in a sample to the known initial
              fraction (100 pMC), scientists can calculate how long ago the
              organism died — up to about 50,000 years.
            </p>
          </div>
        </CollapsibleSection>

        {/* Undergraduate */}
        <CollapsibleSection
          id="carbon-ug"
          title="Undergraduate — Equations & Corrections"
          badge={
            <span className="rounded-full bg-blue-900/40 border border-blue-500/30 px-2 py-0.5 text-xs font-semibold text-blue-400">
              Undergraduate
            </span>
          }
          defaultOpen={false}
          data-ocid="carbon.education.ug.section"
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              The radiocarbon age t is derived from the first-order decay law.
              If N(t) is the measured ¹⁴C activity and N₀ is the initial
              activity (both in pMC), then:
            </p>
            <EquationBlock
              latex="t = -\frac{1}{\lambda} \ln\!\left(\frac{N(t)}{N_0}\right) = \frac{t_{1/2}}{\ln 2} \ln\!\left(\frac{N_0}{N(t)}\right)"
              annotation="Age t equals negative one over the decay constant λ multiplied by the natural log of the ratio N(t)/N₀. The decay constant λ = ln(2)/5730 yr⁻¹."
              label="Radiocarbon Age Equation (Stuiver & Polach, 1977)"
            />
            <p>
              <strong className="text-foreground">Libby Correction:</strong> The
              original 1950 Libby half-life was 5,568 yr. The modern consensus
              value of 5,730 yr is now used. Dates reported in the literature
              before ~1970 may use the old value; always check which half-life
              was assumed.
            </p>
            <p>
              <strong className="text-foreground">
                Secular variation in atmospheric C-14:
              </strong>{" "}
              The atmospheric ¹⁴C/¹²C ratio is not perfectly constant. Solar
              activity, oceanic overturning, and fossil fuel burning (the Suess
              effect — diluting atmospheric ¹⁴C with dead CO₂ since ~1850) all
              cause deviations of ±5–10% from the modern standard. Calibration
              curves correct for these variations.
            </p>
            <p>
              <strong className="text-foreground">
                Uncertainty propagation:
              </strong>{" "}
              The 1σ uncertainty in the age combines analytical measurement
              uncertainty (typically 0.3–0.5% for AMS) and the half-life
              uncertainty (±40 yr). The combined fractional uncertainty is
              approximately:
            </p>
            <EquationBlock
              latex="\sigma_t = t \sqrt{\left(\frac{\sigma_N}{N}\right)^2 + \left(\frac{\sigma_{N_0}}{N_0}\right)^2 + \left(\frac{\sigma_{t_{1/2}}}{t_{1/2}}\right)^2}"
              annotation="The age uncertainty σ_t equals age t times the square root of the sum of squared fractional uncertainties in N(t), N₀, and the half-life t½."
              label="Age Uncertainty Propagation"
            />
            <p className="text-xs">
              <strong className="text-foreground">Citation:</strong> Stuiver, M.
              & Polach, H. A. (1977). Reporting of ¹⁴C data.{" "}
              <em>Radiocarbon</em>, 19(3), 355–363.
            </p>
          </div>
        </CollapsibleSection>

        {/* Professional */}
        <CollapsibleSection
          id="carbon-pro"
          title="Professional — IntCal20, AMS & Bayesian Modeling"
          badge={
            <span className="rounded-full bg-violet-900/40 border border-violet-500/30 px-2 py-0.5 text-xs font-semibold text-violet-400">
              Professional
            </span>
          }
          defaultOpen={false}
          data-ocid="carbon.education.pro.section"
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                IntCal20 Calibration Curve:
              </strong>{" "}
              The IntCal20 dataset (Reimer et al., 2020) provides a continuous
              atmospheric ¹⁴C record extending to ~55,000 cal BP, derived from
              dendrochronologically-dated tree rings, marine foraminifera,
              speleothems, and lake sediments. Calibration converts conventional
              radiocarbon ages (yr BP, relative to AD 1950) to calendar ages,
              correcting for variations in past atmospheric ¹⁴C production.
            </p>
            <p>
              <strong className="text-foreground">
                Reservoir corrections:
              </strong>{" "}
              Marine samples exhibit a global ocean reservoir effect (Marine20
              correction, ~400 yr offset) plus local ΔR offsets that can range
              from −100 to +1,000 yr depending on upwelling dynamics.
              Terrestrial organisms near volcanic CO₂ sources or using C4
              photosynthetic pathways may also require corrections.
            </p>
            <p>
              <strong className="text-foreground">
                Accelerator Mass Spectrometry (AMS):
              </strong>{" "}
              Modern AMS facilities (e.g., Oxford, NOSAMS, Leibniz) can detect
              ¹⁴C/¹²C ratios of ~10⁻¹⁵ in milligram-scale samples, achieving
              precisions of ±0.2–0.5% (±20–50 yr analytical uncertainty). AMS
              has largely replaced decay-counting (Geiger-Müller, liquid
              scintillation) for routine dating due to speed and smaller sample
              requirements.
            </p>
            <p>
              <strong className="text-foreground">
                OxCal Bayesian Modeling:
              </strong>{" "}
              The OxCal program (Ramsey, 2009) implements Bayesian statistical
              modeling to combine multiple radiocarbon dates with stratigraphic,
              typological, or historical constraints. Posterior calendar age
              distributions are computed via Markov Chain Monte Carlo (MCMC)
              sampling through the IntCal20 calibration curve. Phase modeling
              allows assignment of start/end dates to archaeological horizons.
            </p>
            <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2 text-xs">
              <p className="font-semibold text-foreground uppercase tracking-widest text-xs mb-2">
                Key References
              </p>
              <p>
                • Libby, W. F. (1949). Age determination by radiocarbon content.{" "}
                <em>Science</em>, 110(2845), 678–680.
                doi:10.1126/science.110.2845.678
              </p>
              <p>
                • Stuiver, M. & Polach, H. A. (1977). Reporting of ¹⁴C data.{" "}
                <em>Radiocarbon</em>, 19(3), 355–363.
              </p>
              <p>
                • Reimer, P. J., et al. (2020). The IntCal20 Northern Hemisphere
                radiocarbon age calibration curve (0–55 cal kBP).{" "}
                <em>Radiocarbon</em>, 62(4), 725–757. doi:10.1017/RDC.2020.41
              </p>
              <p>
                • Ramsey, C. B. (2009). Bayesian analysis of radiocarbon dates.{" "}
                <em>Radiocarbon</em>, 51(1), 337–360.
              </p>
              <p>
                • Bard, E., et al. (2013). Radiocarbon calibration/comparison
                records from U/Th-dated corals and the marine radiocarbon
                reservoir. <em>Quaternary Science Reviews</em>, 279–286.
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Footer references */}
      <div className="mt-8 rounded-lg border border-border bg-muted/20 p-4 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground">Methodology:</strong> This
          calculator computes conventional radiocarbon ages using the Libby
          half-life of 5,730 ± 40 yr and the standard AD 1950 reference point.
          Uncertainty combines 0.5% analytical precision (representative of
          decay-counting methods; AMS achieves ~0.2%) and half-life uncertainty
          propagated via quadrature. Results are conventional radiocarbon ages
          in yr BP and should be calibrated against IntCal20 before use in
          research contexts.
        </p>
        <p className="mt-2">
          <strong className="text-foreground">Data sources:</strong> NNDC/BNL
          (ENSDF), Reimer et al. IntCal20 (2020), Libby (1949), Stuiver & Polach
          (1977), IAEA Nuclear Data Services.
        </p>
      </div>
    </div>
  );
}
