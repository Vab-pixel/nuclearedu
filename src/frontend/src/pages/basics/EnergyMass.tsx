import { EquationBlock } from "@/components/EquationBlock";
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
  { nuclide: "C-12", A: 12, ba: 7.68, note: "CNO cycle product" },
  {
    nuclide: "Fe-56",
    A: 56,
    ba: 8.79,
    note: "Most stable per nucleon",
    peak: true,
  },
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
    source: "Chemical (gasoline)",
    perReaction: "~6 eV/molecule",
    perKg: "~46 MJ/kg",
    notes: "Best hydrocarbon",
  },
  {
    source: "Nuclear fission (U-235)",
    perReaction: "~200 MeV/fission",
    perKg: "~8.2 × 10¹³ J/kg",
    notes: "2 million× coal",
    highlight: true,
  },
  {
    source: "Nuclear fusion (D-T)",
    perReaction: "~17.6 MeV/fusion",
    perKg: "~3.4 × 10¹⁴ J/kg",
    notes: "4× more than fission",
    highlight: true,
  },
  {
    source: "Nuclear fusion (p-B11)",
    perReaction: "~8.7 MeV/fusion",
    perKg: "~6.7 × 10¹³ J/kg",
    notes: "Aneutronic, lower yield",
  },
  {
    source: "Matter-antimatter",
    perReaction: "2m₀c² per pair (min)",
    perKg: "9 × 10¹⁶ J/kg",
    notes: "Theoretical maximum",
  },
];

interface CollapsibleSectionProps {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  id,
  title,
  badge,
  badgeColor = "bg-primary/10 text-primary border-primary/20",
  open,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <SectionCard data-ocid={`energy.${id}_card`}>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 text-left group"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-body`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h2>
          {badge && (
            <span
              className={`hidden sm:inline-flex text-xs font-semibold px-2 py-0.5 rounded border ${badgeColor} shrink-0`}
            >
              {badge}
            </span>
          )}
        </div>
        <span className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
          {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </span>
      </button>
      {open && (
        <div id={`${id}-body`} className="mt-5 space-y-4">
          {children}
        </div>
      )}
    </SectionCard>
  );
}

export default function EnergyMass() {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Energy & Mass"
        subtitle="Einstein's famous equation E = mc² is not just a formula — it is the key to understanding why nuclear reactions release millions of times more energy than chemical reactions."
        audienceLevel="intermediate"
        readTimeMin={18}
      />

      <div className="grid gap-6">
        {/* ── Existing sections (kept verbatim) ───────────────────────────── */}
        <SectionCard data-ocid="energy.emc2_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Mass-Energy Equivalence
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In 1905, Albert Einstein derived one of physics' most famous
            results: mass and energy are equivalent, related by the speed of
            light squared. This is not a metaphor — mass literally <em>is</em> a
            form of energy. In nuclear reactions, small changes in mass produce
            enormous energy because c² ≈ 9 × 10¹⁶ J/kg.
          </p>
          <EquationBlock
            latex="E = mc^2"
            annotation="Energy E equals mass m times the speed of light squared (c ≈ 3×10⁸ m/s). Converting 1 gram of matter fully to energy yields 90 terajoules — equivalent to ~21 kilotons of TNT."
            label="Einstein's Mass-Energy Equivalence"
          />
        </SectionCard>

        <SectionCard data-ocid="energy.binding_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Nuclear Binding Energy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A nucleus is lighter than the sum of its separate protons and
            neutrons. This <em>mass defect</em> (Δm) represents the binding
            energy — the energy that was released when nucleons came together
            and that must be supplied to tear them apart.
          </p>
          <EquationBlock
            latex="B = \Delta m \cdot c^2 = \bigl(Z \cdot m_p + N \cdot m_n - M_{\text{nucleus}}\bigr) c^2"
            annotation="Binding energy B equals the mass defect Δm times c². Δm is the difference between the sum of proton and neutron masses and the actual nuclear mass."
            label="Binding Energy"
          />
        </SectionCard>

        <SectionCard data-ocid="energy.curve_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Binding Energy Per Nucleon
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            The binding energy per nucleon peaks near iron-56 (~8.79
            MeV/nucleon). Nuclei lighter than iron release energy by{" "}
            <strong className="text-foreground">fusion</strong>; heavier nuclei
            release energy by{" "}
            <strong className="text-foreground">fission</strong>. This is the
            fundamental reason both processes are exothermic.
          </p>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Binding energy per nucleon for selected nuclides, sorted highest to lowest"
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
          <p className="mt-3 text-xs text-muted-foreground italic">
            Iron-56 (Fe-56) highlighted in cyan — the peak of the binding energy
            curve.
          </p>
        </SectionCard>

        <SectionCard data-ocid="energy.qvalue_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Q-Value: Energy Released
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For any nuclear reaction, the <em>Q-value</em> tells you the energy
            released (positive Q) or absorbed (negative Q):
          </p>
          <EquationBlock
            latex="Q = \bigl(M_{\text{reactants}} - M_{\text{products}}\bigr) c^2"
            annotation="Q equals the mass of reactants minus the mass of products, multiplied by c². A positive Q means the reaction releases energy as kinetic energy of the products and radiation."
            label="Q-Value"
          />
          <p className="text-sm text-muted-foreground">
            For example, the fission of U-235 releases ~200 MeV — roughly 50
            million times more than the combustion of a single carbon atom (~4
            eV). This is why a few kilograms of nuclear fuel can power a city
            for a year.
          </p>
        </SectionCard>

        {/* ── NEW collapsible sections ─────────────────────────────────────── */}

        {/* 1. Special Relativity */}
        <CollapsibleSection
          id="special_relativity"
          title="Special Relativity and the Origin of E = mc²"
          badge="Intermediate"
          open={!!open.special_relativity}
          onToggle={() => toggle("special_relativity")}
        >
          <p className="text-muted-foreground leading-relaxed">
            Einstein's 1905 paper{" "}
            <em>
              "Does the inertia of a body depend upon its energy content?"
            </em>{" "}
            (one of the four <em>Annus Mirabilis</em> papers) showed that if a
            body emits energy L as radiation, its mass decreases by L/c². This
            was the first statement of mass-energy equivalence. The full
            implications were developed in subsequent years into the framework
            of special relativity.
          </p>

          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Key Relativistic Energy Quantities
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-mono text-foreground">E₀ = m₀c²</span> —{" "}
                <em>Rest mass energy</em>: the energy an object possesses simply
                by virtue of having mass, even when stationary.
              </li>
              <li>
                <span className="font-mono text-foreground">E = γm₀c²</span> —{" "}
                <em>Total relativistic energy</em>: includes kinetic energy; γ
                is the Lorentz factor.
              </li>
              <li>
                <span className="font-mono text-foreground">K = (γ−1)m₀c²</span>{" "}
                — <em>Kinetic energy</em>: at low speeds (v ≪ c), this reduces
                to the classical ½m₀v².
              </li>
            </ul>
          </div>

          <EquationBlock
            latex="E = \gamma m_0 c^2 = \frac{m_0 c^2}{\sqrt{1 - v^2/c^2}}"
            annotation="Total relativistic energy equals the rest mass energy m₀c² multiplied by the Lorentz factor γ. At rest (v=0), γ=1 and E=m₀c². As v→c, γ→∞, meaning a massive object can never be accelerated to the speed of light."
            label="Total Relativistic Energy"
          />

          <EquationBlock
            latex="E^2 = (pc)^2 + (m_0 c^2)^2"
            annotation="The energy-momentum relation (from the relativistic 4-vector): energy squared equals momentum p times c, all squared, plus the rest mass energy squared. For photons (m₀=0), this gives E=pc."
            label="Energy-Momentum Relation"
          />

          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Critical Unit Conversion
            </h3>
            <p className="text-sm text-muted-foreground">
              Nuclear physics uses the{" "}
              <strong className="text-foreground">atomic mass unit (u)</strong>,
              defined as 1/12 the mass of a C-12 atom:
            </p>
            <div className="font-mono text-sm bg-background/60 rounded p-3 space-y-1">
              <p className="text-foreground">1 u = 1.66054 × 10⁻²⁷ kg</p>
              <p className="text-foreground">
                1 u × c² = 1.66054 × 10⁻²⁷ × (2.998 × 10⁸)² J
              </p>
              <p className="text-primary font-semibold">1 u = 931.494 MeV/c²</p>
            </div>
            <p className="text-sm text-muted-foreground">
              This conversion is used constantly in nuclear physics: every mass
              defect measured in atomic mass units can be immediately converted
              to energy in MeV by multiplying by 931.494.
            </p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Energy Scale Demonstration
            </h3>
            <div className="font-mono text-sm space-y-1">
              <p className="text-muted-foreground">
                1 kg × (3 × 10⁸ m/s)² ={" "}
                <span className="text-foreground font-semibold">
                  9 × 10¹⁶ J
                </span>
              </p>
              <p className="text-muted-foreground">
                = <span className="text-foreground">25 billion kWh</span> of
                electrical energy
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              By comparison: burning 1 kg of coal yields only ~3.3 kWh. The
              ratio is almost 10 billion to one — a direct consequence of c²
              being so astronomically large. Nuclear reactions convert a tiny
              fraction (typically 0.08–0.1%) of rest mass to energy; even that
              fraction dwarfs chemical processes.
            </p>
          </div>
        </CollapsibleSection>

        {/* 2. Mass Defect Worked Example */}
        <CollapsibleSection
          id="mass_defect"
          title="Mass Defect and Nuclear Binding Energy"
          badge="Intermediate"
          open={!!open.mass_defect}
          onToggle={() => toggle("mass_defect")}
        >
          <p className="text-muted-foreground leading-relaxed">
            A free proton (m<sub>p</sub> = 1.007276 u) and a free neutron (m
            <sub>n</sub> = 1.008665 u) together have a combined mass of 2.015941
            u. Yet the bound deuteron — a proton and neutron fused into a
            nucleus — has mass m<sub>d</sub> = 2.013553 u. The difference,
            0.002388 u, is the
            <strong className="text-foreground"> mass defect</strong>: the mass
            that was converted to binding energy when the nucleons came
            together.
          </p>

          <EquationBlock
            latex="B = \bigl[Z \cdot m_H + N \cdot m_n - M(Z,A)\bigr] \times 931.494 \text{ MeV/u}"
            annotation="Binding energy in MeV. Z is the number of protons, m_H is the atomic hydrogen mass (1.007825 u, including the electron), N is the number of neutrons, m_n is the neutron mass (1.008665 u), and M(Z,A) is the measured atomic mass. Using atomic masses (not nuclear masses) avoids tracking electron masses separately."
            label="Binding Energy from Atomic Masses"
          />

          <div className="rounded-lg border border-border bg-muted/20 p-5 space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              Worked Example: <span className="font-mono">⁵⁶Fe</span> (Iron-56)
            </h3>
            <p className="text-xs text-muted-foreground">
              Z = 26 protons, N = 30 neutrons. Masses from AME2020.
            </p>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 1</span>
                <span className="text-muted-foreground">
                  26 × m<sub>H</sub> = 26 × 1.007825 u ={" "}
                  <span className="font-mono text-foreground">26.20345 u</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 2</span>
                <span className="text-muted-foreground">
                  30 × m<sub>n</sub> = 30 × 1.008665 u ={" "}
                  <span className="font-mono text-foreground">30.25995 u</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 3</span>
                <span className="text-muted-foreground">
                  Sum of free masses ={" "}
                  <span className="font-mono text-foreground">56.46340 u</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 4</span>
                <span className="text-muted-foreground">
                  Measured M(Fe-56) ={" "}
                  <span className="font-mono text-foreground">55.934939 u</span>{" "}
                  (AME2020)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 5</span>
                <span className="text-muted-foreground">
                  Δm = 56.46340 − 55.93494 ={" "}
                  <span className="font-mono text-foreground">0.52846 u</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 6</span>
                <span className="text-muted-foreground">
                  B = 0.52846 × 931.494 MeV/u ={" "}
                  <span className="font-mono text-primary font-bold">
                    492.3 MeV
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-primary">Step 7</span>
                <span className="text-muted-foreground">
                  B/A = 492.3 / 56 ={" "}
                  <span className="font-mono text-primary font-bold">
                    8.79 MeV/nucleon
                  </span>
                </span>
              </li>
            </ol>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Binding energy comparison for selected light nuclei"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground text-right">
                    B (MeV)
                  </th>
                  <th className="pb-2 font-semibold text-foreground text-right">
                    B/A (MeV/nucleon)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                <tr>
                  <td className="py-2 pr-4 font-mono text-foreground">
                    H-2 (Deuteron)
                  </td>
                  <td className="py-2 pr-4 text-right font-mono">2.225</td>
                  <td className="py-2 text-right font-mono">
                    1.113 <span className="text-xs ml-1">(loosely bound)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-foreground">
                    He-4 (Alpha)
                  </td>
                  <td className="py-2 pr-4 text-right font-mono">28.30</td>
                  <td className="py-2 text-right font-mono">
                    7.074 <span className="text-xs ml-1">(doubly magic)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-primary font-bold">
                    Fe-56
                  </td>
                  <td className="py-2 pr-4 text-right font-mono text-primary font-bold">
                    492.3
                  </td>
                  <td className="py-2 text-right font-mono text-primary font-bold">
                    8.790 <span className="text-xs ml-1">(peak)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Physical meaning:</strong> To
            fully disassemble Fe-56 into 56 free nucleons would require
            injecting 492.3 MeV — roughly the energy released by 2,500 alpha
            decays of U-238. This is why iron is the endpoint of
            energy-releasing stellar fusion: no further fusion can release net
            energy once iron is reached.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Source: W.J. Huang et al., AME2020, Chinese Physics C 45, 030002
            (2021).
          </p>
        </CollapsibleSection>

        {/* 3. Binding Energy per Nucleon Curve */}
        <CollapsibleSection
          id="be_curve"
          title="The Binding Energy per Nucleon Curve"
          badge="Intermediate"
          open={!!open.be_curve}
          onToggle={() => toggle("be_curve")}
        >
          <p className="text-muted-foreground leading-relaxed">
            The plot of binding energy per nucleon (B/A) versus mass number A is
            one of the most important graphs in all of science. It explains, in
            a single curve, why stars shine, why nuclear reactors produce power,
            and where the elements were forged in the universe.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Why Fusion Releases Energy
              </h3>
              <p className="text-sm text-muted-foreground">
                D (1.11 MeV/A) + T (2.83 MeV/A) → He-4 (7.07 MeV/A) + n<br />
                Average B/A gain ≈ 4.2 MeV/A × 5 nucleons ≈{" "}
                <span className="text-primary font-semibold">
                  17.6 MeV total
                </span>
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Why Fission Releases Energy
              </h3>
              <p className="text-sm text-muted-foreground">
                U-235 (~7.59) → Ba (~8.3) + Kr (~8.7) + neutrons
                <br />
                B/A gain ≈ 0.8 MeV/A × 235 nucleons ≈{" "}
                <span className="text-primary font-semibold">
                  ~200 MeV total
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Key Features of the Curve
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-none">
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">①</span> Very
                light nuclei (H, He, Li): B/A = 0–5 MeV/A. Loosely bound — large
                fusion energy gains possible here.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">②</span> Rapid
                rise from H-2 (1.11) to He-4 (7.07): one of the largest
                per-nucleon jumps in the table, driving the CNO cycle in stars.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">③</span>{" "}
                Even-odd oscillations: even-even nuclei (both Z and N even) sit
                above the smooth curve due to pairing energy.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">④</span> Broad
                maximum near Fe-56 to Ni-62 (~8.79 MeV/A): the most stable
                nuclei per nucleon.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">⑤</span>{" "}
                Gradual decline for A &gt; 60: Coulomb repulsion increasingly
                destabilizes heavy nuclei (U-238: ~7.57 MeV/A).
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold shrink-0">⑥</span>{" "}
                <strong className="text-foreground">
                  Iron peak = stellar endpoint:
                </strong>{" "}
                stars cannot release energy by fusing beyond iron. Heavier
                elements are built by neutron capture (s-process, r-process)
                during stellar death.
              </li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Binding energy per nucleon for key nuclides along the curve"
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
                    B/A (MeV/A)
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
                      className={`py-2 pr-4 font-mono ${row.peak ? "text-primary font-bold" : "text-foreground"}`}
                    >
                      {row.nuclide}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono">{row.A}</td>
                    <td
                      className={`py-2 pr-4 text-right font-mono ${row.peak ? "text-primary font-bold" : ""}`}
                    >
                      {row.ba.toFixed(2)}
                    </td>
                    <td className="py-2 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Fe-56 highlighted as peak. Data: ENSDF/NNDC, AME2020.
          </p>
        </CollapsibleSection>

        {/* 4. SEMF */}
        <CollapsibleSection
          id="semf"
          title="The Semi-Empirical Mass Formula (SEMF)"
          badge="Advanced"
          badgeColor="bg-destructive/10 text-destructive border-destructive/20"
          open={!!open.semf}
          onToggle={() => toggle("semf")}
        >
          <p className="text-muted-foreground leading-relaxed">
            The{" "}
            <strong className="text-foreground">
              Bethe-Weizsäcker formula
            </strong>{" "}
            (proposed independently by Carl Friedrich von Weizsäcker and Hans
            Bethe, ~1935–1936) treats the nucleus as a charged liquid drop and
            parametrizes binding energy using five physically motivated terms.
            Despite its simplicity, it predicts binding energies to within ~1%
            for most stable nuclei.
          </p>

          <EquationBlock
            latex="B(Z,A) = a_V A - a_S A^{2/3} - a_C \frac{Z(Z-1)}{A^{1/3}} - a_A \frac{(A-2Z)^2}{A} \pm \delta"
            annotation="SEMF binding energy in MeV. Five terms: volume (aV≈15.85), surface (aS≈18.34), Coulomb (aC≈0.711), asymmetry (aA≈23.21), and pairing (δ). The ± on δ is +aP/√A for even-even, 0 for odd-A, and −aP/√A for odd-odd nuclei (aP≈11.2 MeV)."
            label="Semi-Empirical Mass Formula (Bethe-Weizsäcker)"
          />

          <div className="space-y-3">
            {[
              {
                label: "Term 1 — Volume Energy",
                formula: "+a_V × A",
                coeff: "a_V ≈ 15.85 MeV",
                color: "border-l-primary",
                text: "Every nucleon contributes equally (nuclear saturation: strong force is short-range, so each nucleon only 'sees' its nearest neighbors). Analogous to the bulk cohesive energy of a liquid drop.",
              },
              {
                label: "Term 2 — Surface Energy",
                formula: "−a_S × A^(2/3)",
                coeff: "a_S ≈ 18.34 MeV",
                color: "border-l-secondary",
                text: "Surface nucleons have fewer neighbors → less binding. Surface area ∝ r² ∝ A^(2/3). Acts like surface tension. More important for small nuclei (large surface-to-volume ratio).",
              },
              {
                label: "Term 3 — Coulomb Energy",
                formula: "−a_C × Z(Z−1)/A^(1/3)",
                coeff: "a_C ≈ 0.711 MeV",
                color: "border-l-destructive",
                text: "All Z protons repel each other electrostatically. Energy of a uniformly charged sphere ∝ Z²/R ∝ Z²/A^(1/3). Grows as Z², eventually dominating — responsible for the instability of very heavy nuclei.",
              },
              {
                label: "Term 4 — Asymmetry Energy",
                formula: "−a_A × (A−2Z)²/A",
                coeff: "a_A ≈ 23.21 MeV",
                color: "border-l-amber-500",
                text: "Pauli exclusion forces extra nucleons into higher energy levels when N≠Z. Symmetric nuclei (N=Z) are most stable for light nuclides. The (A−2Z)² factor means any deviation from symmetry costs binding energy.",
              },
              {
                label: "Term 5 — Pairing Energy",
                formula: "δ = ±a_P / A^(1/2) or 0",
                coeff: "a_P ≈ 11.2 MeV",
                color: "border-l-emerald-500",
                text: "Nucleons pair up with opposite spins, gaining extra binding. Even-even (both Z,N even): +δ (extra stable). Odd-A: δ=0 (one unpaired nucleon). Odd-odd (both Z,N odd): −δ (least stable, only 4 stable odd-odd nuclei exist).",
              },
            ].map((term) => (
              <div
                key={term.label}
                className={`rounded-r-lg border-l-4 ${term.color} border border-border bg-muted/10 pl-4 pr-4 py-3`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-sm font-semibold text-foreground">
                    {term.label}
                  </span>
                  <code className="text-xs font-mono bg-background/60 px-2 py-0.5 rounded text-foreground">
                    {term.formula}
                  </code>
                  <code className="text-xs font-mono text-muted-foreground">
                    {term.coeff}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground">{term.text}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto mt-2">
            <table
              className="w-full text-sm"
              aria-label="SEMF prediction vs experiment for Fe-56 and U-238"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground text-right">
                    SEMF B (MeV)
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground text-right">
                    Experimental B (MeV)
                  </th>
                  <th className="pb-2 font-semibold text-foreground text-right">
                    Error (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                <tr>
                  <td className="py-2 pr-4 font-mono text-foreground">Fe-56</td>
                  <td className="py-2 pr-4 text-right font-mono">~490.5</td>
                  <td className="py-2 pr-4 text-right font-mono">492.3</td>
                  <td className="py-2 text-right font-mono text-green-600">
                    ~0.4%
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-foreground">U-238</td>
                  <td className="py-2 pr-4 text-right font-mono">~1771</td>
                  <td className="py-2 pr-4 text-right font-mono">1801.7</td>
                  <td className="py-2 text-right font-mono text-amber-600">
                    ~1.7%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Limitations:</span>{" "}
            The SEMF systematically underestimates binding energy at{" "}
            <em>magic numbers</em> (Z or N = 2, 8, 20, 28, 50, 82, 126), where
            shell structure gives extra stability not captured by the
            liquid-drop model. The full shell model is needed to explain these
            deviations.
          </div>
        </CollapsibleSection>

        {/* 5. Energy Scales */}
        <CollapsibleSection
          id="energy_scales"
          title="Energy Scales: Nuclear vs. Chemical vs. Other"
          badge="Beginner"
          badgeColor="bg-green-500/10 text-green-700 border-green-500/20"
          open={!!open.energy_scales}
          onToggle={() => toggle("energy_scales")}
        >
          <p className="text-muted-foreground leading-relaxed">
            Numbers like "200 MeV per fission" are only meaningful in context.
            The table below places nuclear energy densities alongside chemical
            and theoretical limits, all on a common per-kilogram basis.
          </p>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Energy density comparison: nuclear, chemical, and other sources"
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
                      className={`py-2 pr-3 ${row.highlight ? "text-foreground font-medium" : ""}`}
                    >
                      {row.source}
                    </td>
                    <td
                      className={`py-2 pr-3 text-right font-mono text-xs ${row.highlight ? "text-primary font-semibold" : ""}`}
                    >
                      {row.perReaction}
                    </td>
                    <td
                      className={`py-2 pr-3 text-right font-mono text-xs ${row.highlight ? "text-primary font-semibold" : ""}`}
                    >
                      {row.perKg}
                    </td>
                    <td className="py-2 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Why Nuclear Fuel is So Dense
            </h3>
            <p className="text-sm text-muted-foreground">
              Chemical bonds involve electron rearrangements with energy scales
              of a few <strong className="text-foreground">eV</strong>. Nuclear
              reactions involve rearrangements of nucleons bound by the strong
              force, with energy scales of hundreds of{" "}
              <strong className="text-foreground">MeV</strong> — a factor of ~10
              <sup>8</sup> larger. The Q = Δm·c² formula encodes this: nuclear
              mass defects are millions of times larger than the equivalent
              "mass defect" in molecular reactions.
            </p>
            <div className="rounded-lg bg-background/60 p-3 space-y-1 font-mono text-sm">
              <p className="text-foreground">
                1 UO₂ fuel pellet (1 cm³, ~10 g)
              </p>
              <p className="text-muted-foreground">
                ≈ energy from{" "}
                <span className="text-foreground font-semibold">
                  1 tonne of coal
                </span>
              </p>
              <p className="text-muted-foreground">
                ≈{" "}
                <span className="text-foreground font-semibold">
                  820 litres of oil
                </span>
              </p>
              <p className="text-muted-foreground">
                ≈{" "}
                <span className="text-foreground font-semibold">
                  17,000 m³ of natural gas
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Power Plant Fuel Comparison (1 GWe)
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-background/60 p-3">
                <p className="font-semibold text-foreground">Nuclear (PWR)</p>
                <p className="text-muted-foreground">~0.7 tonnes U-235/day</p>
                <p className="text-muted-foreground text-xs mt-1">
                  ~27 kg/hour of fissile material consumed
                </p>
              </div>
              <div className="rounded bg-background/60 p-3">
                <p className="font-semibold text-foreground">Coal Plant</p>
                <p className="text-muted-foreground">~3,000 tonnes coal/day</p>
                <p className="text-muted-foreground text-xs mt-1">
                  ~125 tonnes/hour; plus ~8,000 t CO₂/day
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Illustrative values. Actual consumption depends on thermal
              efficiency, capacity factor, and fuel enrichment. Source: World
              Nuclear Association, NEA (2023).
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
