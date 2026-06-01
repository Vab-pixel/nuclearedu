import { EquationBlock } from "@/components/EquationBlock";
import { SectionCard } from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import katex from "katex";
import "katex/dist/katex.min.css";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function InlineMath({ latex }: { latex: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(latex, ref.current, {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      if (ref.current) ref.current.textContent = latex;
    }
  }, [latex]);
  return <span ref={ref} aria-hidden="true" />;
}

function MatrixDisplay({
  label,
  rows,
  unit,
}: {
  label: string;
  rows: string[][];
  unit?: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="font-mono text-sm rounded-lg border border-border bg-muted/20 p-4 overflow-x-auto">
        <div
          className="inline-grid gap-x-4 gap-y-1"
          style={{
            gridTemplateColumns: `repeat(${rows[0]?.length ?? 1}, auto)`,
          }}
        >
          {rows.map((row, ri) =>
            row.map((cell, ci) => (
              <span
                key={`${ri}-${ci}-${cell}`}
                className={`text-right tabular-nums ${
                  ri === 0 && rows.length > 1
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
              >
                {cell}
              </span>
            )),
          )}
        </div>
        {unit && (
          <p className="mt-2 text-xs text-muted-foreground">units: {unit}</p>
        )}
      </div>
    </div>
  );
}

export function FourMomentumSection() {
  // 4-vector inputs
  const [energy, setEnergy] = useState<string>("938.272"); // MeV (proton at rest)
  const [px, setPx] = useState<string>("0");
  const [py, setPy] = useState<string>("0");
  const [pz, setPz] = useState<string>("0");
  const [betaBoost, setBetaBoost] = useState<string>("0.5");

  const E = Number.parseFloat(energy) || 0;
  const Px = Number.parseFloat(px) || 0;
  const Py = Number.parseFloat(py) || 0;
  const Pz = Number.parseFloat(pz) || 0;
  const beta = Math.min(
    0.9999,
    Math.max(-0.9999, Number.parseFloat(betaBoost) || 0),
  );

  const pMag2 = Px * Px + Py * Py + Pz * Pz;
  const m2 = E * E - pMag2; // (MeV)²
  const mInvariant = m2 >= 0 ? Math.sqrt(m2) : 0;
  const m2Display = m2.toFixed(4);
  const mInvDisplay = mInvariant.toFixed(4);

  // Lorentz boost in x-direction
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const Ep = gamma * E - gamma * beta * Px;
  const Pxp = -gamma * beta * E + gamma * Px;
  const Pyp = Py;
  const Pzp = Pz;

  const fmt = (v: number) => {
    if (!Number.isFinite(v)) return "—";
    const a = Math.abs(v);
    if (a === 0) return "0.0000";
    if (a < 0.001 || a >= 1e6) return v.toExponential(3);
    return v.toFixed(4);
  };

  const fmtMatrix = (v: number, digits = 4) =>
    Number.isFinite(v) ? v.toFixed(digits) : "—";

  // Boost matrix rows
  const boostMatrix: string[][] = [
    [fmtMatrix(gamma), fmtMatrix(-gamma * beta), "0", "0"],
    [fmtMatrix(-gamma * beta), fmtMatrix(gamma), "0", "0"],
    ["0", "0", "1", "0"],
    ["0", "0", "0", "1"],
  ];

  const origVector: string[][] = [[fmt(E)], [fmt(Px)], [fmt(Py)], [fmt(Pz)]];

  const boostedVector: string[][] = [
    [fmt(Ep)],
    [fmt(Pxp)],
    [fmt(Pyp)],
    [fmt(Pzp)],
  ];

  const valid = Number.isFinite(E) && E > 0;
  const isMasslike = m2 >= -1e-3;

  return (
    <div className="space-y-6">
      {/* --- Input Panel --- */}
      <SectionCard glowAccent data-ocid="rkc.fourmom.panel">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Four-Momentum
        </h2>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Enter the covariant 4-momentum{" "}
          <InlineMath latex="p^\mu = (E/c,\, p_x,\, p_y,\, p_z)" /> in MeV/c
          (natural units where c = 1 throughout).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {(
            [
              {
                label: "E (MeV)",
                value: energy,
                set: setEnergy,
                ocid: "rkc.fm_energy.input",
              },
              {
                label: "pₓ (MeV/c)",
                value: px,
                set: setPx,
                ocid: "rkc.fm_px.input",
              },
              {
                label: "pᵧ (MeV/c)",
                value: py,
                set: setPy,
                ocid: "rkc.fm_py.input",
              },
              {
                label: "p_z (MeV/c)",
                value: pz,
                set: setPz,
                ocid: "rkc.fm_pz.input",
              },
            ] as const
          ).map(({ label, value, set, ocid }) => (
            <div key={label} className="space-y-1">
              <Label className="text-xs text-muted-foreground">{label}</Label>
              <Input
                type="number"
                step="0.001"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="font-mono text-sm"
                aria-label={label}
                data-ocid={ocid}
              />
            </div>
          ))}
        </div>

        {valid && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-ocid="rkc.fourmom_result.panel"
          >
            <MatrixDisplay label="4-vector pᵘ" rows={origVector} unit="MeV/c" />

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Invariant Mass
              </p>
              <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-mono">
                    m² = E² − |p|²
                  </p>
                  <p className="font-mono text-lg font-bold text-primary">
                    {m2Display}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      MeV²
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-mono">
                    m = √(m²)
                  </p>
                  <p className="font-mono text-lg font-bold text-foreground">
                    {mInvDisplay}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      MeV/c²
                    </span>
                  </p>
                </div>
                <Badge
                  variant={isMasslike ? "default" : "secondary"}
                  className="text-xs"
                >
                  {isMasslike ? "Timelike / massive" : "Spacelike / tachyonic"}
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                |p| and rapidity
              </p>
              <div className="rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">|p|</span>
                  <span className="text-foreground">
                    {fmt(Math.sqrt(pMag2))} MeV/c
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">p_T</span>
                  <span className="text-foreground">
                    {fmt(Math.sqrt(Px * Px + Py * Py))} MeV/c
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">rapidity y</span>
                  <span className="text-foreground">
                    {E + Pz > 0 && E - Pz > 0
                      ? fmt(0.5 * Math.log((E + Pz) / (E - Pz)))
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    pseudorapidity η
                  </span>
                  <span className="text-foreground">
                    {(() => {
                      const cosTheta = Pz / (Math.sqrt(pMag2) || 1);
                      const theta = Math.acos(
                        Math.min(1, Math.max(-1, cosTheta)),
                      );
                      return theta === 0 || theta === Math.PI
                        ? "—"
                        : fmt(-Math.log(Math.tan(theta / 2)));
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </SectionCard>

      {/* --- Lorentz Boost Panel --- */}
      <SectionCard data-ocid="rkc.boost.panel">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Lorentz Boost (x-direction)
        </h3>
        <div className="flex flex-wrap items-end gap-4 mb-5">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              β_boost (−0.9999 … +0.9999)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="-0.9999"
              max="0.9999"
              value={betaBoost}
              onChange={(e) => setBetaBoost(e.target.value)}
              className="w-40 font-mono text-sm"
              aria-label="Boost beta"
              data-ocid="rkc.fm_beta_boost.input"
            />
          </div>
          <div className="flex gap-4 text-sm font-mono">
            <span className="text-muted-foreground">
              γ ={" "}
              <span className="text-primary font-semibold">
                {gamma.toFixed(5)}
              </span>
            </span>
            <span className="text-muted-foreground">
              γβ ={" "}
              <span className="text-foreground font-semibold">
                {(gamma * Math.abs(beta)).toFixed(5)}
              </span>
            </span>
          </div>
        </div>

        {valid && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start"
            data-ocid="rkc.boost_result.panel"
          >
            <MatrixDisplay
              label="Boost matrix Λ"
              rows={boostMatrix}
              unit="dimensionless"
            />
            <MatrixDisplay label="Input p^μ" rows={origVector} unit="MeV/c" />
            <MatrixDisplay
              label="Boosted p'^μ = Λ p^μ"
              rows={boostedVector}
              unit="MeV/c"
            />
          </motion.div>
        )}
      </SectionCard>

      {/* --- Reference Equations --- */}
      <SectionCard>
        <EquationBlock
          latex="p^\mu = \\left(\\frac{E}{c},\\, p_x,\\, p_y,\\, p_z\\right), \\quad m^2 c^2 = \\frac{E^2}{c^2} - |\\mathbf{p}|^2"
          annotation="Four-momentum. The Lorentz-scalar invariant m²c² equals E²/c² minus the three-momentum squared. Natural units: c = 1."
          label="Four-Momentum & Invariant Mass"
        />
        <EquationBlock
          latex="\\Lambda^\\mu{}_\\nu = \\begin{pmatrix} \\gamma & -\\gamma\\beta & 0 & 0 \\\\ -\\gamma\\beta & \\gamma & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}"
          annotation="Lorentz boost matrix in the x-direction. γ = 1/√(1−β²), β = v/c."
          label="Lorentz Boost Matrix (x-direction)"
        />
        <EquationBlock
          latex="y = \\frac{1}{2}\\ln\\frac{E + p_z}{E - p_z}, \\qquad \\eta = -\\ln\\tan\\frac{\\theta}{2}"
          annotation="Rapidity y and pseudorapidity η. Both are additive under longitudinal Lorentz boosts. For massless particles y = η."
          label="Rapidity & Pseudorapidity"
        />
      </SectionCard>
    </div>
  );
}
