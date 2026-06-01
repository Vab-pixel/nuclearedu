import { AudienceBadge } from "@/components/AudienceBadge";
import { CitationMarker } from "@/components/CitationMarker";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
import { NuclearNotation } from "@/components/NuclearNotation";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { nuclides } from "@/data/nuclides";
import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";

const bindingData = nuclides
  .filter(
    (n) =>
      n.bindingEnergyPerNucleon_MeV !== null &&
      n.bindingEnergyPerNucleon_MeV > 0,
  )
  .sort(
    (a, b) =>
      (b.bindingEnergyPerNucleon_MeV ?? 0) -
      (a.bindingEnergyPerNucleon_MeV ?? 0),
  )
  .slice(0, 8);

const BINDING_CURVE_DATA = [
  { nuclide: "H-1", A: 1, ba: 0, note: "Proton — no binding" },
  { nuclide: "H-2 (D)", A: 2, ba: 1.11, note: "Deuteron — loosely bound" },
  { nuclide: "He-4", A: 4, ba: 7.07, note: "Doubly magic, very stable" },
  { nuclide: "Li-6", A: 6, ba: 5.33, note: "Low B/A; fusion fuel candidate" },
  { nuclide: "C-12", A: 12, ba: 7.68, note: "CNO cycle product" },
  { nuclide: "O-16", A: 16, ba: 7.98, note: "Doubly magic; local max" },
  {
    nuclide: "Fe-56",
    A: 56,
    ba: 8.79,
    note: "Most stable per nucleon — stellar endpoint",
    peak: true,
  },
  { nuclide: "Ni-62", A: 62, ba: 8.79, note: "Highest B/A by some measures" },
  { nuclide: "Mo-98", A: 98, ba: 8.64, note: "Mid-heavy" },
  { nuclide: "Xe-132", A: 132, ba: 8.45, note: "Common fission product" },
  { nuclide: "Pb-208", A: 208, ba: 7.87, note: "Doubly magic endpoint" },
  { nuclide: "U-235", A: 235, ba: 7.59, note: "Primary fissile fuel" },
  { nuclide: "U-238", A: 238, ba: 7.57, note: "Natural uranium" },
];

const ENERGY_SCALES = [
  {
    source: "Chemical (TNT)",
    perReaction: "~3.5 eV/molecule",
    perKg: "~4.6 MJ/kg",
    notes: "Reference explosive",
  },
  {
    source: "Chemical (coal)",
    perReaction: "~3 eV/molecule",
    perKg: "~24 MJ/kg",
    notes: "Combustion",
  },
  {
    source: "Nuclear fission (U-235)",
    perReaction: "~200 MeV/fission",
    perKg: "~8.2 × 10¹³ J/kg",
    notes: "~2 million× coal",
    highlight: true,
  },
  {
    source: "Nuclear fusion (D-T)",
    perReaction: "~17.6 MeV/fusion",
    perKg: "~3.4 × 10¹⁴ J/kg",
    notes: "4× more than fission per kg",
    highlight: true,
  },
  {
    source: "Nuclear fusion (p-B11)",
    perReaction: "~8.7 MeV/fusion",
    perKg: "~6.7 × 10¹³ J/kg",
    notes: "Aneutronic; lower yield",
  },
  {
    source: "Matter-antimatter",
    perReaction: "2m₀c² per pair",
    perKg: "9 × 10¹⁶ J/kg",
    notes: "Theoretical maximum (E = mc²)",
  },
];

const NIST_CONSTANTS = [
  {
    symbol: "c",
    name: "Speed of light in vacuum",
    latex: "c = 2.99792458 \\times 10^8 \\text{ m/s}",
    note: "Exact by definition (SI 2019)",
  },
  {
    symbol: "ħ",
    name: "Reduced Planck constant",
    latex: "\\hbar = 1.054571817 \\times 10^{-34} \\text{ J·s}",
    note: "ħ = h/(2π)",
  },
  {
    symbol: "e",
    name: "Elementary charge",
    latex: "e = 1.602176634 \\times 10^{-19} \\text{ C}",
    note: "Exact by definition (SI 2019)",
  },
  {
    symbol: "mₑ",
    name: "Electron rest mass",
    latex:
      "m_e = 9.1093837015 \\times 10^{-31} \\text{ kg} = 0.51099895\\,\\text{MeV}/c^2",
    note: "CODATA 2018",
  },
  {
    symbol: "mₚ",
    name: "Proton rest mass",
    latex:
      "m_p = 1.67262192369 \\times 10^{-27} \\text{ kg} = 938.27208816\\,\\text{MeV}/c^2",
    note: "CODATA 2018",
  },
  {
    symbol: "mₙ",
    name: "Neutron rest mass",
    latex:
      "m_n = 1.67492749804 \\times 10^{-27} \\text{ kg} = 939.56542052\\,\\text{MeV}/c^2",
    note: "CODATA 2018; free neutron T½ = 611.0 s",
  },
  {
    symbol: "u",
    name: "Atomic mass unit",
    latex:
      "1\\,u = 1.66053906660 \\times 10^{-27} \\text{ kg} = 931.49410242\\,\\text{MeV}/c^2",
    note: "1/12 mass of ¹²C atom",
  },
];

export default function EnergyMass() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Energy & Mass"
        subtitle="Einstein's E = mc² is not merely a formula — it is the key to understanding why nuclear reactions release millions of times more energy than chemical reactions."
        audienceLevel="intermediate"
        readTimeMin={22}
      />

      <div className="grid gap-6">
        {/* ── 1. Mass-Energy Equivalence ── */}
        <SectionCard data-ocid="energy.emc2_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Mass-Energy Equivalence
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In 1905, Albert Einstein showed that mass and energy are equivalent,
            related by the speed of light squared. In nuclear reactions, small
            changes in mass produce enormous energy because{" "}
            <InlineEquation tex="c^2 \approx 9 \times 10^{16}\,\text{J/kg}" />.
          </p>
          <EquationBlock
            latex="E_0 = m_0 c^2"
            annotation="Rest-mass energy: a body of mass m₀ at rest contains energy E₀ = m₀c². For 1 g: E₀ = 10⁻³ × (2.998×10⁸)² = 9×10¹³ J ≈ 21 kilotons TNT. c = 2.99792458×10⁸ m/s (exact)."
            label="Einstein's Mass-Energy Equivalence (1905)"
          />
          <EquationBlock
            latex="E = \gamma m_0 c^2, \quad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}"
            annotation="Total relativistic energy. At rest (v=0), γ=1 and E=m₀c². As v→c, γ→∞. Kinetic energy K = (γ−1)m₀c², which reduces to ½m₀v² for v ≪ c."
            label="Total Relativistic Energy (Lorentz factor)"
          />
          <EquationBlock
            latex="E^2 = (pc)^2 + (m_0 c^2)^2"
            annotation="Energy-momentum invariant (four-vector relation). For massless photons: E = pc. For a proton with p = 1 GeV/c: E = √(1000² + 938.3²) = 1368 MeV."
            label="Energy-Momentum Relation"
          />
          <div className="rounded-lg bg-muted/20 border border-border p-4">
            <EquationBlock
              latex="1\,u = 1.66053906660 \times 10^{-27}\,\text{kg} = 931.49410242\,\text{MeV}/c^2"
              annotation="The atomic mass unit u: 1/12 the mass of ¹²C. Every mass defect in u × 931.494 MeV/u gives the energy equivalent in MeV — used constantly in nuclear physics."
              label="Atomic Mass Unit (NIST CODATA 2018)"
            />
          </div>
        </SectionCard>

        {/* ── 2. Nuclear Binding Energy ── */}
        <SectionCard data-ocid="energy.binding_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Nuclear Binding Energy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A nucleus is lighter than the sum of its separate protons and
            neutrons. This <em>mass defect</em>{" "}
            <InlineEquation tex="\Delta m" /> represents the binding energy —
            the energy released when nucleons bind together.
          </p>
          <EquationBlock
            latex="B(Z,A) = \bigl[Z\,m_p + N\,m_n - M_{\rm nucleus}(Z,A)\bigr]\,c^2"
            annotation="Binding energy from nuclear masses. Z protons of mass mₚ = 938.272 MeV/c², N = A−Z neutrons of mass mₙ = 939.565 MeV/c², minus the actual nuclear mass."
            label="Binding Energy (nuclear masses)"
          />
          <EquationBlock
            latex="B(Z,A) = \bigl[Z\,m_H + N\,m_n - M_{\rm atom}(Z,A)\bigr] \times 931.494\,\text{MeV/u}"
            annotation="Practical formula using atomic masses (electron masses cancel). mH = 1.00782503207 u (hydrogen atom), mₙ = 1.00866491588 u, M_atom from AME2020."
            label="Binding Energy (atomic masses, practical)"
          />
          <EquationBlock
            latex="\frac{B}{A}\bigg|_{{}^{56}\text{Fe}} = \frac{492.26\,\text{MeV}}{56} = 8.790\,\text{MeV/nucleon}"
            annotation="Iron-56 has the highest binding energy per nucleon (by conventional atomic-mass definition). It is the endpoint of energy-releasing stellar fusion — no further net energy can be released by fusing beyond iron."
            label="Peak Binding Energy Per Nucleon — Fe-56"
          />
        </SectionCard>

        {/* ── 3. Q-Value ── */}
        <SectionCard data-ocid="energy.qvalue_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Q-Value: Energy Released in Nuclear Reactions
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The <em>Q-value</em> of a nuclear reaction quantifies the energy
            released (positive Q) or required (negative Q — endothermic):
          </p>
          <EquationBlock
            latex="Q = \bigl(\sum m_{\rm reactants} - \sum m_{\rm products}\bigr)\,c^2 = \Delta m \times 931.494\,\text{MeV/u}"
            annotation="Q = Δm·c². Positive Q: exothermic (energy released as kinetic energy + radiation). Negative Q: endothermic (threshold reaction). Q is frame-independent."
            label="Q-Value of a Nuclear Reaction"
          />
          <EquationBlock
            latex="Q_{\alpha} = \bigl[M(Z,A) - M(Z-2,\,A-4) - M(^4\text{He})\bigr] \times 931.494\,\text{MeV/u}"
            annotation="Alpha decay Q-value. For U-238: Q_α = (238.050789 − 234.043601 − 4.002602) × 931.494 = 4.270 MeV. Alpha kinetic energy: T_α = Q × (A−4)/A = 4.198 MeV."
            label="Alpha Decay Q-value"
          />
          <EquationBlock
            latex="Q_{\beta^-} = \bigl[M(Z,A) - M(Z+1,A)\bigr]\,c^2"
            annotation="Beta-minus Q-value (using atomic masses — electron masses cancel). Q_β⁺ = [M(Z,A) − M(Z−1,A) − 2mₑ]c² — requires extra 2mₑc² = 1.022 MeV for positron creation."
            label="Beta Decay Q-value"
          />
          <EquationBlock
            latex="Q_{\rm D\text{-}T} = \bigl[M(^2\text{H}) + M(^3\text{H}) - M(^4\text{He}) - m_n\bigr] \times 931.494 = 17.59\,\text{MeV}"
            annotation="D-T fusion: 14.07 MeV carried by the neutron (4/5 by momentum conservation), 3.52 MeV to the alpha. This is the highest Q-value of any binary fusion reaction with low Coulomb barrier."
            label="D-T Fusion Q-value"
          />
        </SectionCard>

        {/* ── 4. Binding energy curve ── */}
        <SectionCard data-ocid="energy.curve_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            The Binding Energy Per Nucleon Curve
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            The plot of <InlineEquation tex="B/A" /> vs mass number{" "}
            <InlineEquation tex="A" /> explains why stars shine, why reactors
            produce power, and where heavy elements form. Peak near{" "}
            <NuclearNotation symbol="Fe" A={56} Z={26} /> at 8.79 MeV/nucleon.
          </p>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Binding energy per nucleon for selected nuclides"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground text-right">
                    A
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground text-right">
                    B/A (MeV)
                  </th>
                  <th className="pb-2 font-semibold text-foreground">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                {BINDING_CURVE_DATA.map((row) => (
                  <tr
                    key={row.nuclide}
                    className={row.peak ? "bg-primary/5" : ""}
                  >
                    <td
                      className={`py-2 pr-4 font-mono ${
                        row.peak ? "text-primary font-bold" : "text-foreground"
                      }`}
                    >
                      {row.nuclide}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono">{row.A}</td>
                    <td
                      className={`py-2 pr-4 text-right font-mono ${
                        row.peak ? "text-primary font-bold" : ""
                      }`}
                    >
                      {row.ba.toFixed(2)}
                    </td>
                    <td className="py-2 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground italic">
            Data: AME2020 (NNDC/IAEA). <CitationMarker refId={15} />
          </p>
        </SectionCard>

        {/* ── 5. Comprehensive equations collapsible ── */}
        <CollapsibleSection
          id="comprehensive-eqs"
          title="Comprehensive Mass-Energy Equations"
          badge={<AudienceBadge level="advanced" />}
          defaultOpen={false}
          data-ocid="energy.comprehensive_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            The following equations form the complete quantitative toolkit for
            nuclear mass-energy calculations, from rest-mass equivalence through
            the Semi-Empirical Mass Formula and nucleon separation energies.
          </p>

          <h3 className="font-semibold text-foreground mb-2">Mass Excess</h3>
          <p className="text-muted-foreground text-sm mb-2">
            Rather than tabulating full atomic masses, nuclear physicists use
            the <em>mass excess</em> <InlineEquation tex="\Delta" />:
          </p>
          <EquationBlock
            latex="\Delta(Z,A) = \bigl[M(Z,A) - A\bigr] \times 931.494\,\text{MeV}"
            annotation="Mass excess in MeV: departure of atomic mass from integer A. Examples: Δ(²H) = +13.136 MeV; Δ(⁵⁶Fe) = −60.605 MeV (most negative stable nuclide); Δ(²³⁸U) = +47.309 MeV."
            label="Mass Excess Definition"
          />

          <h3 className="font-semibold text-foreground mb-2 mt-5">
            Neutron and Proton Separation Energies
          </h3>
          <EquationBlock
            latex="S_n(Z,A) = \bigl[M(Z,A{-}1) + m_n - M(Z,A)\bigr]\,c^2"
            annotation="Neutron separation energy: minimum energy to remove one neutron. S_n drops sharply above magic neutron numbers — direct evidence of shell closures. Example: S_n(¹⁷O) = 4.143 MeV; S_n(¹⁷O → magic N=8) = 4.143 MeV."
            label="Neutron Separation Energy S_n"
          />
          <EquationBlock
            latex="S_p(Z,A) = \bigl[M(Z{-}1,A{-}1) + m_H - M(Z,A)\bigr]\,c^2"
            annotation="Proton separation energy (using hydrogen atom mass mH to track electrons). S_p anomalously high above magic proton numbers. Example: S_p(¹⁷F) = 0.601 MeV (proton-rich, near drip line)."
            label="Proton Separation Energy S_p"
          />
          <EquationBlock
            latex="S_{2n}(Z,A) = \bigl[M(Z,A{-}2) + 2m_n - M(Z,A)\bigr]\,c^2"
            annotation="Two-neutron separation energy: averages over odd-even staggering to reveal shell effects cleanly. Large drops in S_2n signal N = magic number shell closures."
            label="Two-Neutron Separation Energy S_{2n}"
          />

          <h3 className="font-semibold text-foreground mb-2 mt-5">
            Bethe-Weizsäcker SEMF (Liquid Drop Model)
          </h3>
          <EquationBlock
            latex="B(Z,A) = a_V A - a_S A^{2/3} - a_C \frac{Z(Z-1)}{A^{1/3}} - a_A \frac{(A-2Z)^2}{A} + \delta(Z,A)"
            annotation="Semi-Empirical Mass Formula. Five terms: Volume (aV = 15.75 MeV) — nuclear saturation; Surface (aS = 17.80 MeV) — surface tension; Coulomb (aC = 0.711 MeV) — proton repulsion; Asymmetry (aA = 23.70 MeV) — Pauli exclusion; Pairing (δ) — spin coupling."
            label="Bethe-Weizsäcker SEMF"
          />
          <EquationBlock
            latex="\delta(Z,A) = \begin{cases} +a_P A^{-1/2} & \text{even-even} \\ 0 & \text{odd-}A \\ -a_P A^{-1/2} & \text{odd-odd} \end{cases} \qquad a_P = 11.18\,\text{MeV}"
            annotation="Pairing term: even-even nuclei gain extra binding (both Z and N even → paired nucleons). Odd-A: one unpaired nucleon, δ=0. Odd-odd (Z and N both odd): least stable; only 4 stable odd-odd nuclei exist (²H, ⁶Li, ¹⁰B, ¹⁴N)."
            label="SEMF Pairing Term δ"
          />

          <div className="rounded-lg bg-muted/30 border border-border p-4 my-4">
            <p className="font-semibold text-foreground mb-2">
              SEMF Worked Example: <NuclearNotation symbol="Fe" A={56} Z={26} />{" "}
              (Z=26, N=30, A=56)
            </p>
            <div className="font-mono text-xs space-y-1 text-muted-foreground">
              <div>Volume: +15.75 × 56 = +882.0 MeV</div>
              <div>
                Surface: −17.80 × 56^(2/3) = −17.80 × 14.47 = −257.6 MeV
              </div>
              <div>
                Coulomb: −0.711 × 26×25 / 56^(1/3) = −0.711 × 650 / 3.826 =
                −120.8 MeV
              </div>
              <div>
                Asymmetry: −23.70 × (56−52)² / 56 = −23.70 × 0.286 = −6.77 MeV
              </div>
              <div>Pairing: +11.18 / √56 = +1.49 MeV (even-even)</div>
              <div className="border-t border-border mt-2 pt-2 text-foreground font-semibold">
                B(SEMF) ≈ 498.3 MeV | Experimental: 492.26 MeV | Error: ~1.2%
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-xs"
              aria-label="SEMF predictions vs experimental binding energies"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    SEMF B (MeV)
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    Exp. B (MeV)
                  </th>
                  <th className="pb-2 font-semibold text-foreground text-right">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                {(
                  [
                    ["He-4", 28.5, 28.3, "0.7%"],
                    ["O-16", 127.6, 127.62, "0.0%"],
                    ["Ca-40", 341.2, 342.05, "0.2%"],
                    ["Fe-56", 498.3, 492.26, "1.2%"],
                    ["Sn-120", 1019.6, 1020.55, "0.1%"],
                    ["Pb-208", 1635.4, 1636.43, "0.1%"],
                    ["U-238", 1776.4, 1801.69, "1.4%"],
                  ] as const
                ).map(([n, semf, exp, err]) => (
                  <tr key={n}>
                    <td className="py-1.5 pr-3 font-mono text-foreground">
                      {n}
                    </td>
                    <td className="py-1.5 pr-3 text-right font-mono">{semf}</td>
                    <td className="py-1.5 pr-3 text-right font-mono">{exp}</td>
                    <td className="py-1.5 text-right font-mono text-primary">
                      {err}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground italic">
            AME2020 experimental values. <CitationMarker refId={15} />
          </p>
        </CollapsibleSection>

        {/* ── 6. NIST Constants ── */}
        <CollapsibleSection
          id="nist-constants"
          title="NIST CODATA 2018 Physical Constants"
          badge={<AudienceBadge level="advanced" />}
          defaultOpen={false}
          data-ocid="energy.constants_section"
        >
          <p className="text-muted-foreground text-sm mb-4">
            All nuclear calculations use these fundamental constants. Values
            from NIST CODATA 2018 — exact or best-fit determinations.
          </p>
          <div className="space-y-3">
            {NIST_CONSTANTS.map((c) => (
              <div
                key={c.symbol}
                className="rounded-lg border border-border bg-muted/10 px-4 py-3"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-primary font-bold text-sm w-8 shrink-0">
                    {c.symbol}
                  </span>
                  <span className="text-sm text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {c.note}
                  </span>
                </div>
                <EquationBlock latex={c.latex} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: NIST CODATA 2018.{" "}
            <a
              href="https://physics.nist.gov/cuu/Constants/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              physics.nist.gov/cuu/Constants
            </a>
          </p>
        </CollapsibleSection>

        {/* ── 7. Energy Scales ── */}
        <CollapsibleSection
          id="energy-scales"
          title="Energy Scales: Nuclear vs. Chemical vs. Other"
          badge={<AudienceBadge level="beginner" />}
          defaultOpen={false}
          data-ocid="energy.scales_section"
        >
          <p className="text-muted-foreground leading-relaxed">
            Numbers like "200 MeV per fission" are only meaningful in context.
          </p>
          <div className="overflow-x-auto mt-4">
            <table
              className="w-full text-sm"
              aria-label="Energy density comparison"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Energy Source
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    Per Reaction
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    Per kg Fuel
                  </th>
                  <th className="pb-2 font-semibold text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                {ENERGY_SCALES.map((row) => (
                  <tr
                    key={row.source}
                    className={row.highlight ? "bg-primary/5" : ""}
                  >
                    <td
                      className={`py-2 pr-3 ${
                        row.highlight ? "text-foreground font-medium" : ""
                      }`}
                    >
                      {row.source}
                    </td>
                    <td
                      className={`py-2 pr-3 text-right font-mono text-xs ${
                        row.highlight ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {row.perReaction}
                    </td>
                    <td
                      className={`py-2 pr-3 text-right font-mono text-xs ${
                        row.highlight ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {row.perKg}
                    </td>
                    <td className="py-2 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>

        {/* ── 8. B/A top table ── */}
        <CollapsibleSection
          id="peak-be"
          title="Most Tightly Bound Nuclei"
          badge={<AudienceBadge level="intermediate" />}
          defaultOpen={false}
          data-ocid="energy.peak_be_section"
        >
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Top binding energy per nucleon"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground text-right">
                    A
                  </th>
                  <th className="pb-2 font-semibold text-foreground text-right">
                    B/A (MeV/nucleon)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {bindingData.map((n) => (
                  <tr key={n.symbol} className="text-muted-foreground">
                    <td className="py-2 pr-4 font-mono font-medium text-foreground">
                      {n.symbol}
                    </td>
                    <td className="py-2 pr-4 text-right">{n.A}</td>
                    <td className="py-2 text-right font-mono">
                      <span
                        className={
                          n.bindingEnergyPerNucleon_MeV &&
                          n.bindingEnergyPerNucleon_MeV > 8.5
                            ? "text-primary font-bold"
                            : ""
                        }
                      >
                        {n.bindingEnergyPerNucleon_MeV?.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
