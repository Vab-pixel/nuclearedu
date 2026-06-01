import { EquationBlock } from "@/components/EquationBlock";
import { SectionCard } from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { useState } from "react";
import { AMU_TO_MEV, type ParticleInput, parseParticleInput } from "./rkUtils";

const EMPTY_PARTICLE = (): ParticleInput => ({ symbol: "", massAMU: "" });

function ParticleRow({
  index,
  particle,
  onChange,
  onRemove,
  canRemove,
  side,
}: {
  index: number;
  particle: ParticleInput;
  onChange: (p: ParticleInput) => void;
  onRemove: () => void;
  canRemove: boolean;
  side: "initial" | "final";
}) {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Symbol (e.g. p, n, 4He)"
        value={particle.symbol}
        onChange={(e) => onChange({ ...particle, symbol: e.target.value })}
        className="flex-1 min-w-0"
        aria-label={`${side} particle ${index + 1} symbol`}
        data-ocid={`rkc.qv_${side}_symbol.${index + 1}`}
      />
      <Input
        placeholder="Mass (AMU)"
        type="number"
        step="0.000001"
        value={particle.massAMU}
        onChange={(e) => onChange({ ...particle, massAMU: e.target.value })}
        className="w-36 shrink-0"
        aria-label={`${side} particle ${index + 1} mass`}
        data-ocid={`rkc.qv_${side}_mass.${index + 1}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label={`Remove ${side} particle ${index + 1}`}
        className="shrink-0 text-muted-foreground hover:text-destructive"
      >
        X
      </Button>
    </div>
  );
}

export function QValueSection() {
  const [initial, setInitial] = useState<ParticleInput[]>([
    { symbol: "p", massAMU: "1.007276" },
    { symbol: "n", massAMU: "1.008665" },
  ]);
  const [final, setFinal] = useState<ParticleInput[]>([
    { symbol: "d", massAMU: "2.013553" },
    { symbol: "g", massAMU: "0" },
  ]);

  const updateParticle = (
    side: "initial" | "final",
    i: number,
    p: ParticleInput,
  ) => {
    const setter = side === "initial" ? setInitial : setFinal;
    setter((prev) => prev.map((x, idx) => (idx === i ? p : x)));
  };
  const addParticle = (side: "initial" | "final") => {
    const setter = side === "initial" ? setInitial : setFinal;
    setter((prev) => (prev.length < 4 ? [...prev, EMPTY_PARTICLE()] : prev));
  };
  const removeParticle = (side: "initial" | "final", i: number) => {
    const setter = side === "initial" ? setInitial : setFinal;
    setter((prev) =>
      prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev,
    );
  };

  const initialMasses = parseParticleInput(initial);
  const finalMasses = parseParticleInput(final);
  const sumInitial = initialMasses.reduce((a, b) => a + b, 0);
  const sumFinal = finalMasses.reduce((a, b) => a + b, 0);
  const Q_AMU = sumInitial - sumFinal;
  const Q_MeV = Q_AMU * AMU_TO_MEV;
  const isExothermic = Q_MeV > 0;
  const valid = sumInitial > 0 && sumFinal > 0;

  const m_target = finalMasses[0] || 1;
  const Eth =
    valid && !isExothermic
      ? (Math.abs(Q_MeV) * (sumInitial + sumFinal) * AMU_TO_MEV) /
        (2 * m_target * AMU_TO_MEV)
      : 0;

  return (
    <div className="space-y-6">
      <SectionCard glowAccent data-ocid="rkc.qvalue.panel">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Q-Value Calculator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["initial", "final"] as const).map((side) => {
            const particles = side === "initial" ? initial : final;
            const masses = side === "initial" ? sumInitial : sumFinal;
            return (
              <div key={side} className="space-y-3">
                <Label className="text-sm font-semibold capitalize">
                  {side} State Particles
                </Label>
                {particles.map((p, i) => (
                  <ParticleRow
                    key={`particle-${side}-${i}-${p.symbol}`}
                    index={i}
                    particle={p}
                    onChange={(np) => updateParticle(side, i, np)}
                    onRemove={() => removeParticle(side, i)}
                    canRemove={particles.length > 1}
                    side={side}
                  />
                ))}
                {particles.length < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addParticle(side)}
                    data-ocid={`rkc.qv_add_${side}.button`}
                    className="w-full text-xs"
                  >
                    + Add particle
                  </Button>
                )}
                <div className="text-xs text-muted-foreground font-mono">
                  Total mass = {masses.toFixed(6)} AMU ={" "}
                  {(masses * AMU_TO_MEV).toFixed(3)} MeV
                </div>
              </div>
            );
          })}
        </div>

        {valid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 rounded-xl border border-border bg-muted/30 p-5 space-y-4"
            data-ocid="rkc.qvalue_result.panel"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="font-display text-3xl font-bold"
                style={{
                  color: isExothermic ? "var(--primary)" : "#f97316",
                }}
              >
                Q = {Q_MeV.toFixed(4)} MeV
              </span>
              <Badge
                variant={isExothermic ? "default" : "secondary"}
                className="text-sm"
              >
                {isExothermic
                  ? "Exothermic - energy released"
                  : "Endothermic - energy required"}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              delta-M = {Q_AMU.toFixed(8)} AMU (1 AMU = {AMU_TO_MEV.toFixed(4)}{" "}
              MeV)
            </div>
            {!isExothermic && Eth > 0 && (
              <div className="rounded-lg bg-muted/20 border border-border p-3">
                <p className="text-xs text-muted-foreground mb-1">
                  Threshold kinetic energy (lab frame)
                </p>
                <p className="text-sm font-mono text-foreground">
                  T_threshold ={" "}
                  <span className="font-semibold text-primary">
                    {Eth.toFixed(3)} MeV
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum projectile KE to initiate this endothermic reaction in
                  the lab frame.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </SectionCard>

      <SectionCard>
        <EquationBlock
          latex="Q = \\left(\\sum_i M_i - \\sum_f M_f\\right)c^2 = \\Delta M \\cdot 931.494\\;\\text{MeV/AMU}"
          annotation="Q > 0: energy released (exothermic). Q < 0: energy required (endothermic). Masses in AMU."
          label="Q-Value Definition"
        />
        <EquationBlock
          latex="T_{\\mathrm{th}} = |Q|\\,\\frac{\\sum M_i + \\sum M_f}{2\\, M_{\\mathrm{target}}}"
          annotation="Threshold kinetic energy in the lab frame for an endothermic reaction on a stationary target."
          label="Threshold Energy (Lab Frame)"
        />
      </SectionCard>
    </div>
  );
}
