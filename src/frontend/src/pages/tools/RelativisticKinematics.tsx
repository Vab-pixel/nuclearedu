import { CitationMarker } from "@/components/CitationMarker";
import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FourMomentumSection } from "./relativisticKinematics/FourMomentumSection";
import { QValueSection } from "./relativisticKinematics/QValueSection";
import {
  PARTICLE_MASSES,
  type RelProps,
  computeRelProps,
  formatSci,
} from "./relativisticKinematics/rkUtils";

type ParticleKey = keyof typeof PARTICLE_MASSES;

const C_HBAR_MEV_FM = 197.3269804; // MeV·fm

function deBooglieWavelength(p_MeV: number): number {
  // λ = h/p = 2π ħc / (pc) in fm then convert to pm (1 fm = 1e-3 pm)
  if (p_MeV <= 0) return 0;
  return (2 * Math.PI * C_HBAR_MEV_FM) / p_MeV; // fm
}

function rapidity(E: number, p: number): number {
  if (p <= 0 || E <= p) return 0;
  return 0.5 * Math.log((E + p) / (E - p));
}

// ----------------------------------------------------------------
// Stat row helper
// ----------------------------------------------------------------
function StatRow({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`font-mono text-sm ${
          highlight ? "text-primary font-semibold" : "text-foreground"
        }`}
      >
        {value}
        {unit && (
          <span className="text-xs text-muted-foreground ml-1">{unit}</span>
        )}
      </span>
    </div>
  );
}

// ----------------------------------------------------------------
// Single Particle Tab
// ----------------------------------------------------------------
function SingleParticleTab() {
  const [selectedKey, setSelectedKey] = useState<ParticleKey>("proton");
  const [kineticEnergy, setKineticEnergy] = useState<string>("100");

  const particle = PARTICLE_MASSES[selectedKey];
  const m0 = particle.mass; // MeV/c²
  const T = Math.max(0, Number.parseFloat(kineticEnergy) || 0);

  const rel: RelProps = useMemo(() => computeRelProps(m0, T), [m0, T]);
  const wavelength_fm = deBooglieWavelength(rel.p);

  // Non-relativistic approximations
  const E_nr = m0 + T;
  const p_nr = Math.sqrt(2 * m0 * T);
  const gamma_nr = 1 + T / m0;
  const beta_nr = Math.sqrt((2 * T) / m0); // v/c classical

  const relNRDiff = (relVal: number, nrVal: number) => {
    if (nrVal === 0) return "N/A";
    return `${(((relVal - nrVal) / nrVal) * 100).toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <SectionCard glowAccent data-ocid="rkc.single.panel">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Single Particle Kinematics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="space-y-1.5">
            <Label className="text-sm">Particle</Label>
            <Select
              value={selectedKey}
              onValueChange={(v) => setSelectedKey(v as ParticleKey)}
            >
              <SelectTrigger
                className="w-full"
                data-ocid="rkc.particle_select.select"
              >
                <SelectValue placeholder="Select particle" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(PARTICLE_MASSES) as ParticleKey[]).map((key) => {
                  const p = PARTICLE_MASSES[key];
                  return (
                    <SelectItem key={key} value={key}>
                      <span className="font-mono">{p.symbol}</span>{" "}
                      <span className="text-muted-foreground text-xs">
                        {p.name}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Kinetic Energy T (MeV)</Label>
            <Input
              type="number"
              step="1"
              min="0"
              value={kineticEnergy}
              onChange={(e) => setKineticEnergy(e.target.value)}
              className="font-mono"
              aria-label="Kinetic energy in MeV"
              data-ocid="rkc.kinetic_energy.input"
            />
          </div>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <Badge variant="outline" className="font-mono text-xs">
            m₀ = {formatSci(m0, 4)} MeV/c²
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            spin {particle.spin}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            charge {particle.charge}
          </Badge>
          <Badge
            variant={rel.beta > 0.9 ? "default" : "secondary"}
            className="text-xs"
          >
            {rel.beta > 0.9
              ? "Ultra-relativistic"
              : rel.beta > 0.1
                ? "Mildly relativistic"
                : "Non-relativistic"}
          </Badge>
        </div>

        <motion.div
          key={selectedKey + kineticEnergy}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-ocid="rkc.single_result.panel"
        >
          {/* Relativistic column */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Relativistic
            </p>
            <StatRow
              label="Rest mass E₀ = m₀c²"
              value={formatSci(m0, 4)}
              unit="MeV"
            />
            <StatRow
              label="Total energy E = T + m₀c²"
              value={formatSci(rel.E, 4)}
              unit="MeV"
              highlight
            />
            <StatRow
              label="Momentum |p|"
              value={formatSci(rel.p, 4)}
              unit="MeV/c"
            />
            <StatRow
              label="Lorentz γ"
              value={rel.gamma.toFixed(5)}
              highlight={rel.gamma > 2}
            />
            <StatRow label="β = v/c" value={rel.beta.toFixed(6)} />
            <StatRow
              label="Rapidity y"
              value={rapidity(rel.E, rel.p).toFixed(5)}
            />
            <StatRow
              label="de Broglie λ"
              value={wavelength_fm.toFixed(4)}
              unit="fm"
            />
          </div>

          {/* Non-relativistic column */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Classical (NR)
            </p>
            <StatRow label="Rest mass" value={formatSci(m0, 4)} unit="MeV" />
            <StatRow
              label="Total energy (NR)"
              value={formatSci(E_nr, 4)}
              unit="MeV"
            />
            <StatRow
              label="Momentum (NR)"
              value={formatSci(p_nr, 4)}
              unit="MeV/c"
            />
            <StatRow label="γ (NR)≈ 1 + T/m₀c²" value={gamma_nr.toFixed(5)} />
            <StatRow label="β (NR) = √(2T/m₀c²)" value={beta_nr.toFixed(6)} />
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Rel vs NR error (Δ/NR)
            </p>
            <StatRow label="δE / E_NR" value={relNRDiff(rel.E, E_nr)} />
            <StatRow label="δp / p_NR" value={relNRDiff(rel.p, p_nr)} />
            <StatRow label="δβ / β_NR" value={relNRDiff(rel.beta, beta_nr)} />
          </div>
        </motion.div>
      </SectionCard>

      {/* Equations */}
      <SectionCard>
        <EquationBlock
          latex="E = \\gamma m_0 c^2 = T + m_0 c^2, \\quad p = \\gamma m_0 v, \\quad \\gamma = \\frac{1}{\\sqrt{1-\\beta^2}}"
          annotation="Einstein relation: total energy equals kinetic energy plus rest mass energy. Momentum p = γm₀v. Lorentz factor γ diverges as v → c."
          label="Relativistic Energy & Momentum"
        />
        <EquationBlock
          latex="E^2 = (pc)^2 + (m_0 c^2)^2, \\quad \\lambda = \\frac{h}{p} = \\frac{2\\pi\\hbar c}{pc}"
          annotation="Energy-momentum relation (dispersion relation). de Broglie wavelength in natural units: 2πħc = 1239.8 MeV·fm."
          label="Dispersion Relation & de Broglie Wavelength"
        />
        <EquationBlock
          latex="P^\mu = \left(\frac{E}{c},\, \vec{p}\right) \qquad P^\mu P_\mu = (m_0 c)^2"
          annotation="Four-momentum P^μ in natural units. The Lorentz-invariant norm equals the rest mass squared. In natural units (c = 1): P^μ = (E, p⃗), invariant mass m² = E² − |p|²."
          label="Four-Momentum & Lorentz Invariant"
        />
        <EquationBlock
          latex="s = (p_1 + p_2)^2 = m_1^2 + m_2^2 + 2(E_1 E_2 - \vec{p}_1\cdot\vec{p}_2)"
          annotation="Mandelstam variable s: square of total four-momentum in the CM frame. √s = centre-of-mass energy. For a fixed-target experiment: s = m₁²c⁴ + m₂²c⁴ + 2m₂c²E₁."
          label="Mandelstam Variable s (CM Energy Squared)"
        />
        <EquationBlock
          latex="t = (p_1 - p_3)^2, \quad u = (p_1 - p_4)^2 \qquad s + t + u = \sum_i m_i^2"
          annotation="Mandelstam variables t (momentum transfer) and u (crossed channel). The constraint s + t + u = Σm_i² holds for 2→2 scattering. t is directly related to scattering angle."
          label="Mandelstam Variables t and u"
        />
        <EquationBlock
          latex="E_{\mathrm{th}} = \frac{\left(\sum_i m_i^{\text{(f)}}\right)^2 - \left(m_1^2 + m_2^2\right)}{2\,m_2}\,c^2"
          annotation="Threshold kinetic energy for a reaction in a fixed-target frame. Σm_i(f) is the sum of final-state masses. E_th is the minimum lab-frame kinetic energy to produce the reaction."
          label="Threshold Energy (Fixed-Target)"
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Source: PDG Review of Particle Physics <CitationMarker refId={1} />
        </div>
      </SectionCard>
    </div>
  );
}

// ----------------------------------------------------------------
// γ-β Chart Tab
// ----------------------------------------------------------------
function GammaBetaChart() {
  const points = useMemo(() => {
    const arr: {
      logT: number;
      T_ratio: number;
      gamma: number;
      beta: number;
    }[] = [];
    // log-space from 0.01 to 1000 in 300 steps
    for (let i = 0; i <= 300; i++) {
      const logT = -2 + (i / 300) * 5; // -2..3 => 0.01..1000
      const T_ratio = 10 ** logT; // T / m0c²
      const gamma = 1 + T_ratio;
      const beta = Math.sqrt(1 - 1 / (gamma * gamma));
      arr.push({ logT, T_ratio, gamma, beta });
    }
    return arr;
  }, []);

  const tickFormatter = (v: number) => {
    const t = 10 ** v;
    if (t < 0.1) return t.toFixed(3);
    if (t < 10) return t.toFixed(2);
    return t.toFixed(0);
  };

  const CustomTooltipContent = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
  }) => {
    if (!active || !payload?.length) return null;
    const logT = (payload[0] as unknown as { payload: { logT: number } })
      ?.payload?.logT as number;
    const T_ratio = 10 ** logT;
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-mono shadow-lg">
        <p className="text-muted-foreground mb-1">
          T/m₀c² = {T_ratio.toExponential(2)}
        </p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name} = {(p.value as number).toFixed(5)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <SectionCard glowAccent data-ocid="rkc.gamma_beta_chart.panel">
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          γ and β vs Kinetic Energy
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Log-scale x-axis: T/m₀c². Non-relativistic regime (T ≪ m₀c²) on the
          left; ultra-relativistic (β → 1) on the right.
        </p>
        <div
          className="w-full"
          style={{ height: 380 }}
          data-ocid="rkc.gamma_beta.chart"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={points}
              margin={{ top: 8, right: 20, bottom: 30, left: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(var(--border)/0.3)"
              />
              <XAxis
                dataKey="logT"
                type="number"
                domain={[-2, 3]}
                tickFormatter={tickFormatter}
                label={{
                  value: "T / m₀c² (log scale)",
                  position: "insideBottom",
                  offset: -16,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                }}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                domain={[0, "auto"]}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip content={<CustomTooltipContent />} />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  color: "hsl(var(--muted-foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="gamma"
                name="γ (Lorentz factor)"
                stroke="hsl(var(--primary))"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="beta"
                name="β = v/c"
                stroke="#22d3ee"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* Reference table */}
      <SectionCard>
        <h3 className="font-display text-base font-semibold text-foreground mb-3">
          Common Particle Masses (PDG 2022)
        </h3>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            data-ocid="rkc.particles_table.table"
          >
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
                <th className="text-left py-2 pr-4">Particle</th>
                <th className="text-left py-2 pr-4">Symbol</th>
                <th className="text-right py-2 pr-4">Mass (MeV/c²)</th>
                <th className="text-center py-2 pr-4">Spin</th>
                <th className="text-center py-2">Charge</th>
              </tr>
            </thead>
            <tbody>
              {(
                Object.values(
                  PARTICLE_MASSES,
                ) as (typeof PARTICLE_MASSES)[keyof typeof PARTICLE_MASSES][]
              ).map((p, i) => (
                <tr
                  key={p.name}
                  className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                  data-ocid={`rkc.particles_table.item.${i + 1}`}
                >
                  <td className="py-2 pr-4 text-foreground">{p.name}</td>
                  <td className="py-2 pr-4 font-mono text-primary">
                    {p.symbol}
                  </td>
                  <td className="py-2 pr-4 text-right font-mono tabular-nums">
                    {p.mass.toFixed(5)}
                  </td>
                  <td className="py-2 pr-4 text-center font-mono">{p.spin}</td>
                  <td className="py-2 text-center font-mono">{p.charge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data: Particle Data Group <CitationMarker refId={1} />
        </p>
      </SectionCard>
    </div>
  );
}

// ----------------------------------------------------------------
// Main page
// ----------------------------------------------------------------
export default function RelativisticKinematics() {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <PageHeader
        title="Relativistic Kinematics Calculator"
        subtitle="Compute relativistic observables (E, p, γ, β, rapidity, λ) for any particle. Q-value of nuclear reactions, four-momentum boosts, and γ–β curves in a single tool."
        audienceLevel="advanced"
        readTimeMin={8}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        data-ocid="rkc.tabs"
      >
        <TabsList className="mb-6 flex flex-wrap gap-1 h-auto bg-muted/30 p-1 rounded-xl">
          {(
            [
              { value: "single", label: "Single Particle" },
              { value: "qvalue", label: "Q-Value" },
              { value: "fourmom", label: "Four-Momentum" },
              { value: "chart", label: "γ–β Chart" },
            ] as const
          ).map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid={`rkc.tab.${tab.value}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="single" className="mt-0">
          <SingleParticleTab />
        </TabsContent>

        <TabsContent value="qvalue" className="mt-0">
          <QValueSection />
        </TabsContent>

        <TabsContent value="fourmom" className="mt-0">
          <FourMomentumSection />
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <GammaBetaChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
