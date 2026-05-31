import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { SectionCard } from "@/components/SectionCard";
import { useId, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Physics Constants ─────────────────────────────────────────────────────────
const MATERIALS: Record<
  string,
  { label: string; nu: number; eta: number; L: number }
> = {
  "U-235": { label: "Uranium-235 (enriched)", nu: 2.43, eta: 2.06, L: 2.85 },
  "Pu-239": { label: "Plutonium-239", nu: 2.87, eta: 2.12, L: 1.85 },
  "U-233": { label: "Uranium-233", nu: 2.48, eta: 2.3, L: 2.55 },
};

const MODERATORS: Record<
  string,
  { label: string; p: number; fFactor: number }
> = {
  none: { label: "None (bare metal)", p: 0.15, fFactor: 0.95 },
  water: { label: "Light Water (H₂O)", p: 0.75, fFactor: 0.82 },
  "heavy-water": { label: "Heavy Water (D₂O)", p: 0.88, fFactor: 0.92 },
  graphite: { label: "Graphite", p: 0.82, fFactor: 0.9 },
  beryllium: { label: "Beryllium", p: 0.85, fFactor: 0.91 },
};

const REFLECTORS: Record<string, { label: string; reflFactor: number }> = {
  none: { label: "None", reflFactor: 1.0 },
  water: { label: "Water", reflFactor: 0.55 },
  beryllium: { label: "Beryllium", reflFactor: 0.45 },
  steel: { label: "Steel", reflFactor: 0.7 },
};

const GEOMETRIES: Record<string, { label: string; shapeFactor: number }> = {
  sphere: { label: "Sphere", shapeFactor: 1.0 },
  cylinder: { label: "Cylinder (H/D = 1)", shapeFactor: 1.14 },
  slab: { label: "Infinite Slab", shapeFactor: 1.57 },
};

// Known critical masses (kg) for reference table
const REFERENCE_MASSES = [
  {
    material: "U-235",
    geometry: "Sphere",
    moderator: "None",
    reflector: "None",
    mass: 52,
    source: "IAEA-TECDOC-1450",
  },
  {
    material: "U-235",
    geometry: "Sphere",
    moderator: "None",
    reflector: "Water",
    mass: 15,
    source: "NRC NUREG/CR-6361",
  },
  {
    material: "U-235",
    geometry: "Sphere",
    moderator: "None",
    reflector: "Beryllium",
    mass: 14,
    source: "LA-UR-09-03800",
  },
  {
    material: "Pu-239",
    geometry: "Sphere",
    moderator: "None",
    reflector: "None",
    mass: 10,
    source: "IAEA-TECDOC-1450",
  },
  {
    material: "Pu-239",
    geometry: "Sphere",
    moderator: "None",
    reflector: "Steel",
    mass: 5.5,
    source: "NRC NUREG/CR-6361",
  },
  {
    material: "U-233",
    geometry: "Sphere",
    moderator: "None",
    reflector: "None",
    mass: 16,
    source: "LA-UR-09-03800",
  },
  {
    material: "U-235",
    geometry: "Cylinder",
    moderator: "Water",
    reflector: "Water",
    mass: 0.8,
    source: "IAEA Safety Guide SSG-27",
  },
];

// ─── Calculation ───────────────────────────────────────────────────────────────
function calculateKeff(
  material: string,
  enrichment: number,
  moderator: string,
  reflector: string,
  geometry: string,
  mass: number,
): { keff: number; criticalMass: number; status: string; statusColor: string } {
  const mat = MATERIALS[material] ?? MATERIALS["U-235"];
  const mod = MODERATORS[moderator] ?? MODERATORS.none;
  const refl = REFLECTORS[reflector] ?? REFLECTORS.none;
  const geo = GEOMETRIES[geometry] ?? GEOMETRIES.sphere;

  // Four-factor formula: k∞ = η * ε * p * f
  // Simplified: ε ≈ 1.03 for fast fission, p from moderator, f from moderator
  const epsilon = 1.03;
  const kInfinity = mat.eta * epsilon * mod.p * mod.fFactor;

  // Enrichment scaling: k∞ scales roughly with enrichment fraction (simplified)
  const enrichmentFactor = Math.max(0.01, enrichment / 100);
  const scaledKInfinity = 1 + (kInfinity - 1) * enrichmentFactor;

  // Critical radius for bare sphere: Rc = π * L / sqrt(k∞ - 1)
  // With reflector: effective Rc reduced by reflector factor
  const kExcess = Math.max(0.001, scaledKInfinity - 1);
  const bareRc = (Math.PI * mat.L) / Math.sqrt(kExcess);
  const effectiveRc = bareRc * refl.reflFactor * geo.shapeFactor;

  // Density approximation (kg/m³)
  const density = material === "Pu-239" ? 19800 : 18900;
  const criticalMass = (4 / 3) * Math.PI * (effectiveRc / 100) ** 3 * density;

  // k-eff for given mass: keff ≈ k∞ / (1 + M²B²) where B² ~ (π/R)²
  // Simplified: keff scales with mass/criticalMass
  const massRatio = mass / Math.max(criticalMass, 0.001);
  const bucklingFactor = 1 / (1 + 0.5 / Math.max(massRatio, 0.01));
  const keff = scaledKInfinity * bucklingFactor;

  let status = "Subcritical";
  let statusColor = "text-emerald-400";
  if (keff >= 0.98 && keff <= 1.02) {
    status = "Critical";
    statusColor = "text-amber-400";
  } else if (keff > 1.02) {
    status = "Supercritical";
    statusColor = "text-rose-400";
  }

  return { keff, criticalMass, status, statusColor };
}

// ─── Semi-circular Gauge ───────────────────────────────────────────────────────
function KeffGauge({ keff }: { keff: number }) {
  const radius = 80;
  const stroke = 12;
  const cx = 100;
  const cy = 90;
  const arc = Math.PI;
  const normalized = Math.min(Math.max(keff, 0), 1.5);
  const angle = (normalized / 1.5) * arc;

  const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  // Color stops
  const getColor = (v: number) => {
    if (v < 0.8) return "#34d399";
    if (v < 1.0) return "#fbbf24";
    return "#f87171";
  };

  // Needle position
  const needleX = cx - radius * Math.cos(angle);
  const needleY = cy - radius * Math.sin(angle);

  return (
    <div className="flex flex-col items-center">
      <svg
        width="200"
        height="110"
        viewBox="0 0 200 110"
        role="img"
        aria-label={`k-effective gauge showing ${keff.toFixed(3)}`}
      >
        {/* Background arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Colored arc segments */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx - radius * Math.cos(arc * 0.53)} ${cy - radius * Math.sin(arc * 0.53)}`}
          fill="none"
          stroke="#34d399"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - radius * Math.cos(arc * 0.53)} ${cy - radius * Math.sin(arc * 0.53)} A ${radius} ${radius} 0 0 1 ${cx - radius * Math.cos(arc * 0.67)} ${cy - radius * Math.sin(arc * 0.67)}`}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - radius * Math.cos(arc * 0.67)} ${cy - radius * Math.sin(arc * 0.67)} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#f87171"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#e2e8f0"
          strokeWidth={2}
        />
        <circle cx={cx} cy={cy} r={5} fill="#e2e8f0" />
        {/* Labels */}
        <text
          x={cx - radius - 10}
          y={cy + 18}
          fontSize="10"
          fill="var(--muted-foreground)"
        >
          0
        </text>
        <text
          x={cx - 8}
          y={cy - radius - 8}
          fontSize="10"
          fill="var(--muted-foreground)"
        >
          0.75
        </text>
        <text
          x={cx + radius - 5}
          y={cy + 18}
          fontSize="10"
          fill="var(--muted-foreground)"
        >
          1.5
        </text>
      </svg>
      <p
        className="font-mono text-2xl font-bold"
        style={{ color: getColor(keff) }}
      >
        kₑff = {keff.toFixed(3)}
      </p>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function CriticalityCalculator() {
  const id = useId();
  const [geometry, setGeometry] = useState("sphere");
  const [material, setMaterial] = useState("U-235");
  const [enrichment, setEnrichment] = useState(90);
  const [moderator, setModerator] = useState("none");
  const [reflector, setReflector] = useState("none");
  const [mass, setMass] = useState(30);

  const result = useMemo(
    () =>
      calculateKeff(material, enrichment, moderator, reflector, geometry, mass),
    [material, enrichment, moderator, reflector, geometry, mass],
  );

  // Critical mass vs enrichment curve
  const enrichmentCurve = useMemo(() => {
    return Array.from({ length: 51 }, (_, i) => {
      const e = 1 + i * 2; // 1% to 100%
      const r = calculateKeff(material, e, moderator, reflector, geometry, 100);
      return { enrichment: e, criticalMass: Number(r.criticalMass.toFixed(2)) };
    });
  }, [material, moderator, reflector, geometry]);

  // k-eff vs mass curve
  const massCurve = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const m = 0.5 + i * 1.5;
      const r = calculateKeff(
        material,
        enrichment,
        moderator,
        reflector,
        geometry,
        m,
      );
      return { mass: Number(m.toFixed(1)), keff: Number(r.keff.toFixed(3)) };
    });
  }, [material, enrichment, moderator, reflector, geometry]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Criticality Safety Calculator"
        subtitle="Educational tool for estimating k-effective and critical mass using simplified one-group diffusion theory. For safety analysis training only — not for actual criticality safety engineering."
        audienceLevel="professional"
        readTimeMin={10}
      />

      <SafetyCallout title="Educational Use Only — Not for Safety Engineering">
        This calculator uses{" "}
        <strong>simplified physics for educational purposes only</strong>.
        Actual criticality safety calculations require detailed Monte Carlo
        codes (MCNP, SCALE, Serpent) and must be performed by licensed nuclear
        engineers under IAEA/NRC regulations.
      </SafetyCallout>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        {/* ── Inputs Panel ───────────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-1 space-y-5"
          data-ocid="criticality.inputs.panel"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">
            Configuration
          </h2>

          <div>
            <label
              htmlFor={`${id}-geom`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Geometry
            </label>
            <select
              id={`${id}-geom`}
              value={geometry}
              onChange={(e) => setGeometry(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="criticality.geometry.select"
            >
              {Object.entries(GEOMETRIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`${id}-mat`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Fissile Material
            </label>
            <select
              id={`${id}-mat`}
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="criticality.material.select"
            >
              {Object.entries(MATERIALS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`${id}-enr`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Enrichment:{" "}
              <span className="font-mono text-primary">{enrichment}%</span>
            </label>
            <input
              id={`${id}-enr`}
              type="range"
              min="1"
              max="100"
              value={enrichment}
              onChange={(e) => setEnrichment(Number.parseInt(e.target.value))}
              className="w-full accent-primary"
              data-ocid="criticality.enrichment.toggle"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label
              htmlFor={`${id}-mod`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Moderator
            </label>
            <select
              id={`${id}-mod`}
              value={moderator}
              onChange={(e) => setModerator(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="criticality.moderator.select"
            >
              {Object.entries(MODERATORS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`${id}-refl`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Reflector
            </label>
            <select
              id={`${id}-refl`}
              value={reflector}
              onChange={(e) => setReflector(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="criticality.reflector.select"
            >
              {Object.entries(REFLECTORS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`${id}-mass`}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Mass: <span className="font-mono text-primary">{mass} kg</span>
            </label>
            <input
              id={`${id}-mass`}
              type="range"
              min="0.5"
              max="100"
              step="0.5"
              value={mass}
              onChange={(e) => setMass(Number.parseFloat(e.target.value))}
              className="w-full accent-primary"
              data-ocid="criticality.mass.toggle"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.5 kg</span>
              <span>100 kg</span>
            </div>
          </div>
        </SectionCard>

        {/* ── Results Panel ──────────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-2 space-y-6"
          data-ocid="criticality.results.panel"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-muted/20 p-4">
              <KeffGauge keff={result.keff} />
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4 text-center flex flex-col justify-center">
              <p className="text-xs text-muted-foreground mb-1">
                Criticality Status
              </p>
              <p
                className={`font-display text-xl font-bold ${result.statusColor}`}
              >
                {result.status}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {result.keff < 0.98
                  ? "System is safely subcritical"
                  : result.keff > 1.02
                    ? "System exceeds criticality"
                    : "System is at critical point"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4 text-center flex flex-col justify-center">
              <p className="text-xs text-muted-foreground mb-1">
                Estimated Critical Mass
              </p>
              <p className="font-mono text-2xl font-bold text-primary">
                {result.criticalMass.toFixed(2)}{" "}
                <span className="text-sm text-muted-foreground">kg</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                For current geometry &amp; moderator
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Critical mass vs enrichment */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Critical Mass vs Enrichment
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={enrichmentCurve}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="enrichment"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    label={{
                      value: "Enrichment (%)",
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
                    formatter={(v: number) => [`${v} kg`, "Critical Mass"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="criticalMass"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* k-eff vs mass */}
            <div className="rounded-lg border border-border bg-muted/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                k-eff vs Mass (Current Config)
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={massCurve}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="mass"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    label={{
                      value: "Mass (kg)",
                      position: "insideBottom",
                      offset: -2,
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                    }}
                  />
                  <YAxis
                    domain={[0, 1.5]}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [`${v}`, "k-eff"]}
                  />
                  <ReferenceLine
                    y={1.0}
                    stroke="#fbbf24"
                    strokeDasharray="4 4"
                    label={{
                      value: "Critical (k=1)",
                      fontSize: 9,
                      fill: "#fbbf24",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="keff"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── Reference Data Table ─────────────────────────────────────────── */}
      <SectionCard className="mt-6" data-ocid="criticality.reference.table">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Reference Critical Masses (Literature Values)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pr-4">Material</th>
                <th className="pb-2 pr-4">Geometry</th>
                <th className="pb-2 pr-4">Moderator</th>
                <th className="pb-2 pr-4">Reflector</th>
                <th className="pb-2 pr-4">Critical Mass</th>
                <th className="pb-2">Source</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {REFERENCE_MASSES.map((row) => (
                <tr key={row.material} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-foreground">
                    {row.material}
                  </td>
                  <td className="py-2 pr-4">{row.geometry}</td>
                  <td className="py-2 pr-4">{row.moderator}</td>
                  <td className="py-2 pr-4">{row.reflector}</td>
                  <td className="py-2 pr-4 font-mono text-primary">
                    {row.mass} kg
                  </td>
                  <td className="py-2 text-xs">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Sources: IAEA-TECDOC-1450 — Nuclear Security Recommendations on
          Physical Protection; NRC NUREG/CR-6361 — Criticality Benchmarks; LANL
          LA-UR-09-03800 — Critical Mass Handbook.
        </p>
      </SectionCard>

      {/* ── Physics Explanation ──────────────────────────────────────────── */}
      <SectionCard className="mt-6" data-ocid="criticality.physics.section">
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          Simplified Physics Model
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            This calculator uses a{" "}
            <strong className="text-foreground">
              simplified one-group diffusion theory
            </strong>{" "}
            approach for educational demonstration:
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>
              <strong className="text-foreground">Four-factor formula:</strong>{" "}
              k∞ = η × ε × p × f, where η is neutrons per absorption, ε is fast
              fission factor, p is resonance escape probability, and f is
              thermal utilization.
            </li>
            <li>
              <strong className="text-foreground">Critical radius:</strong> For
              a bare sphere, Rc = π × L / √(k∞ − 1), where L is the diffusion
              length (~2–3 cm for common fissile materials).
            </li>
            <li>
              <strong className="text-foreground">Reflector effect:</strong> A
              reflector reduces the critical radius by returning leaked
              neutrons. Water reflectors can reduce critical mass by ~70%.
            </li>
            <li>
              <strong className="text-foreground">Geometry factor:</strong>{" "}
              Cylinders and slabs have larger surface-to-volume ratios than
              spheres, requiring more mass for criticality.
            </li>
          </ol>
          <p className="text-xs mt-2">
            <strong className="text-foreground">Important:</strong> Real
            criticality safety analysis uses continuous-energy Monte Carlo
            transport (MCNP6, Serpent, SCALE/KENO) with detailed ENDF/B nuclear
            data, temperature feedback, and geometric fidelity. These simplified
            estimates may deviate by 20–50% from actual values.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
