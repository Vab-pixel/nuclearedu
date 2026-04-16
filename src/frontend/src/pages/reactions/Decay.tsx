import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { u238DecayChain } from "@/data/decayChain";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  ocid: string;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  badge,
  children,
  ocid,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <SectionCard data-ocid={ocid}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {title}
          </h2>
          {badge && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {badge}
            </span>
          )}
        </div>
        {open ? (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </SectionCard>
  );
}

export default function DecayPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Radioactive Decay"
        subtitle="How unstable nuclei spontaneously transform — releasing alpha particles, electrons, positrons, and gamma rays to reach more stable configurations."
        audienceLevel="intermediate"
        readTimeMin={20}
      />

      <div className="grid gap-6">
        {/* ── Existing: Quantum Nature ── */}
        <SectionCard data-ocid="decay.intro_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            The Quantum Nature of Decay
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Radioactive decay is an inherently quantum mechanical process. It is
            impossible to predict <em>when</em> a specific nucleus will decay —
            only the probability per unit time (the decay constant λ). For
            macroscopic samples containing trillions of nuclei, the statistical
            average gives rise to precise, reproducible exponential decay
            curves.
          </p>
        </SectionCard>

        {/* ── Existing: Alpha / Beta / Secular Equilibrium ── */}
        <SectionCard data-ocid="decay.types_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Alpha Decay
          </h2>
          <EquationBlock
            latex="^A_Z X \rightarrow ^{A-4}_{Z-2}Y + ^4_2\\text{He} + Q"
            annotation="Parent nucleus X decays to daughter Y by emitting an alpha particle (helium-4 nucleus), releasing Q MeV of energy."
            label="Alpha Decay"
          />
          <p className="text-muted-foreground text-sm">
            Alpha particles are stopped by a sheet of paper or a few centimeters
            of air, but are highly damaging if ingested or inhaled due to their
            high ionizing density (high LET).
          </p>

          <h2 className="font-display text-xl font-semibold text-foreground mb-4 mt-6">
            Beta-Minus Decay
          </h2>
          <EquationBlock
            latex="n \rightarrow p + e^- + \\bar{\\nu}_e"
            annotation="A neutron (n) transforms into a proton (p) by emitting an electron (e⁻) and an electron antineutrino (ν̄ₑ). The nucleus gains one proton and loses one neutron."
            label="Beta-Minus Decay"
          />

          <h2 className="font-display text-xl font-semibold text-foreground mb-4 mt-6">
            Secular Equilibrium
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            In a decay chain where the parent has a much longer half-life than
            all daughters, the system reaches <em>secular equilibrium</em>: the
            activity of each daughter equals the activity of the parent. This
            means uranium ore contains all 14 decay products, each at an
            activity proportional to the reciprocal of its half-life.
          </p>
        </SectionCard>

        {/* ── Existing: Chain Preview ── */}
        <SectionCard data-ocid="decay.chain_preview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            U-238 Decay Series (First 6 Steps)
          </h2>
          <div className="space-y-2">
            {u238DecayChain.slice(0, 6).map((step) => (
              <div
                key={step.stepIndex}
                className="flex items-center gap-3 text-sm"
              >
                <span className="font-mono text-foreground w-16 shrink-0">
                  {step.nuclide}
                </span>
                <span className="text-muted-foreground/50">→</span>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${step.decayMode === "alpha" ? "bg-rose-400/10 text-rose-400" : "bg-blue-400/10 text-blue-400"}`}
                >
                  {step.decayMode}
                </span>
                <span className="font-mono text-muted-foreground">
                  {step.daughter}
                </span>
                <span className="ml-auto text-muted-foreground/60 shrink-0">
                  {step.halfLifeStr}
                </span>
              </div>
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-4"
            data-ocid="decay.view_full_chain_button"
          >
            <Link to="/basics/radioactivity">See full U-238 chain →</Link>
          </Button>
        </SectionCard>

        {/* ── NEW: Mechanics of Alpha Decay ── */}
        <CollapsibleSection
          title="The Mechanics of Alpha Decay"
          badge="advanced"
          ocid="decay.alpha_mechanics_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Alpha decay is a quantum tunneling phenomenon. An alpha cluster
            pre-forms inside the nucleus, then tunnels through the Coulomb
            potential barrier — classically forbidden, but quantum-mechanically
            possible with a probability that depends exponentially on the
            barrier height and width.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Q-Value Calculation
          </h3>
          <EquationBlock
            latex="Q_\\alpha = \\bigl[M(^A_Z X) - M(^{A-4}_{Z-2}Y) - M(^4_2\\text{He})\\bigr] \\times 931.494\\;\\text{MeV/u}"
            annotation="Q-value from atomic mass difference: parent mass minus daughter mass minus helium-4 mass, multiplied by 931.494 MeV/u (the atomic mass unit in energy)."
            label="Alpha Decay Q-Value"
          />
          <EquationBlock
            latex="T_\\alpha = Q_\\alpha \\times \\frac{M_d}{M_d + M_\\alpha}"
            annotation="The alpha particle kinetic energy is less than Q because the daughter nucleus recoils. M_d = daughter mass, M_α = alpha mass. The recoil kinetic energy = Q − T_α."
            label="Alpha Particle Kinetic Energy"
          />

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Worked Example: U-238 Alpha Decay
            </div>
            <div className="space-y-1 text-muted-foreground font-mono text-xs">
              <div>M(U-238) = 238.050788 u</div>
              <div>M(Th-234) = 234.043601 u</div>
              <div>M(He-4) = 4.002602 u</div>
              <div className="border-t border-border pt-1 mt-1">
                Δm = 238.050788 − 234.043601 − 4.002602 = 0.004585 u
              </div>
              <div>
                Q = 0.004585 × 931.494 ={" "}
                <strong className="text-foreground">4.270 MeV</strong>
              </div>
              <div>
                T_α = 4.270 × 234/238 ={" "}
                <strong className="text-foreground">4.198 MeV</strong> (discrete
                energy)
              </div>
              <div>
                T_recoil = 4.270 − 4.198 ={" "}
                <strong className="text-foreground">0.072 MeV</strong>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Geiger-Nuttall Law
          </h3>
          <EquationBlock
            latex="\\log_{10}(T_{1/2}) = A + B \\cdot \\frac{Z}{\\sqrt{Q_\\alpha}}"
            annotation="The Geiger-Nuttall law (1911) relates half-life to Z and Q-value empirically. It captures the enormous range of alpha decay lifetimes (from microseconds to billions of years) with just two parameters A and B per decay series."
            label="Geiger-Nuttall Law"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            The exponential sensitivity to Q explains why small changes in Q
            lead to enormous changes in half-life: a 1 MeV increase in Q_α
            reduces T½ by roughly 4–5 orders of magnitude. This is why Th-228
            (Q=5.52 MeV, T½=1.9 yr) decays 10⁷× faster than Th-232 (Q=4.08 MeV,
            T½=14.1 Gyr).
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            <strong className="text-foreground">Fine structure:</strong> Many
            alpha emitters produce multiple alpha groups at discrete energies
            because the daughter can be left in excited states. For Pu-238, six
            distinct alpha lines are observed (the dominant one at 5.499 MeV;
            others ranging down to 5.358 MeV). Alpha spectrometry exploits these
            discrete energies as nuclide fingerprints — each nuclide has a
            unique spectral signature.
          </p>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Important Alpha Emitters
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Q_α (MeV)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Application
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "U-238",
                    "4.270",
                    "4.468 × 10⁹ yr",
                    "Geological age dating, fuel",
                  ],
                  [
                    "Ra-226",
                    "4.871",
                    "1,600 yr",
                    "Historical radiotherapy, radon source",
                  ],
                  [
                    "Rn-222",
                    "5.590",
                    "3.82 days",
                    "Indoor radon hazard assessment",
                  ],
                  [
                    "Po-210",
                    "5.304",
                    "138.4 days",
                    "Neutron source (Po/Be), historic poison",
                  ],
                  [
                    "Am-241",
                    "5.486",
                    "432.6 yr",
                    "Smoke detectors, calibration sources",
                  ],
                  [
                    "Pu-238",
                    "5.499",
                    "87.7 yr",
                    "RTG power sources (Voyager, Cassini, New Horizons)",
                  ],
                ].map(([nuc, q, t, app]) => (
                  <tr key={nuc} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground">
                      {nuc}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {q}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground font-mono text-xs">
                      {t}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>

        {/* ── NEW: Beta Decay and Fermi Theory ── */}
        <CollapsibleSection
          title="Beta Decay and the Fermi Theory"
          badge="advanced"
          ocid="decay.beta_theory_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Enrico Fermi's 1934 theory of beta decay was the first successful
            quantum field theory of a nuclear process, treating the weak
            interaction as a current-current interaction analogous to
            electromagnetism. The modern form is the V−A (vector minus
            axial-vector) theory.
          </p>

          <EquationBlock
            latex="\\frac{d N}{d t} = -\\lambda N = -\\frac{\\ln 2}{t_{1/2}} N"
            annotation="The fundamental decay law: activity equals decay constant λ times number of nuclei N. The decay constant is related to the half-life by λ = ln(2)/T½."
            label="Radioactive Decay Law"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            Fermi Matrix Elements
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The transition rate W depends on two nuclear matrix elements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="font-semibold text-foreground mb-1">
                Fermi transitions (|M_F|²)
              </div>
              <div className="text-xs text-muted-foreground">
                ΔJ=0, Δπ=no. Mediated by vector current. Prototype: superallowed
                0⁺→0⁺ β decays used for CKM V<sub>ud</sub> measurements.
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="font-semibold text-foreground mb-1">
                Gamow-Teller transitions (|M_GT|²)
              </div>
              <div className="text-xs text-muted-foreground">
                ΔJ=0,±1 (not 0→0), Δπ=no. Mediated by axial-vector current.
                Dominant in most real beta decays.
              </div>
            </div>
          </div>

          <EquationBlock
            latex="ft_{1/2} = \\frac{K}{G_F^2 \\cos^2\\theta_C \\left(|M_F|^2 + g_A^2 |M_{GT}|^2\\right)}"
            annotation="The comparative half-life (ft value) isolates nuclear structure from phase space and weak coupling. K is a phase-space factor; G_F is the Fermi coupling constant; θ_C is the Cabibbo angle; g_A ≈ 1.27 is the axial coupling ratio."
            label="Comparative Half-Life (ft value)"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            log(ft) Classification
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Transition Type
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    log(ft) range
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Selection Rules
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Superallowed",
                    "3.0–3.7",
                    "ΔJ=0, Δπ=no, ΔT=0",
                    "¹⁴O → ¹⁴N*",
                  ],
                  [
                    "Allowed (Gamow-Teller)",
                    "4–6",
                    "ΔJ=0,±1, Δπ=no",
                    "³H → ³He (log ft=3.05)",
                  ],
                  [
                    "First-forbidden",
                    "6–9",
                    "ΔJ=0,±1, Δπ=yes",
                    "¹³⁷Cs → ¹³⁷Ba",
                  ],
                  [
                    "Higher forbidden",
                    ">9",
                    "Larger ΔJ or Δπ",
                    "¹¹⁵In → ¹¹⁵Sn (log ft≈22.7)",
                  ],
                ].map(([type, lft, sel, ex]) => (
                  <tr
                    key={type}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {type}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {lft}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {sel}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {ex}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Double Beta Decay
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Some nuclei cannot undergo single β decay (energetically forbidden
            or spin-parity mismatched) but can undergo two simultaneous β decays
            — an incredibly rare second-order weak process:
          </p>
          <EquationBlock
            latex="(Z,A) \\rightarrow (Z+2, A) + 2e^- + 2\\bar{\\nu}_e"
            annotation="Two-neutrino double beta decay (2νββ): two neutrons simultaneously convert to protons with emission of two electrons and two antineutrinos. Observed in ~20 nuclei with T½ ~ 10¹⁹–10²¹ yr."
            label="Two-Neutrino Double Beta Decay (2νββ)"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            If neutrinos are their own antiparticles (<em>Majorana fermions</em>
            ), neutrinoless double beta decay (0νββ) is possible — the
            antineutrino emitted at one vertex is reabsorbed as a neutrino at
            the other. Its discovery would establish lepton number violation and
            constrain the neutrino mass hierarchy.
          </p>
          <EquationBlock
            latex="(Z,A) \\rightarrow (Z+2, A) + 2e^-"
            annotation="Neutrinoless double beta decay (0νββ): if observed, proves neutrinos are Majorana particles. Current experimental limits: T½(0νββ) > 10²⁵–10²⁶ yr (GERDA, KamLAND-Zen, CUORE)."
            label="Neutrinoless Double Beta Decay (0νββ) — Not Yet Observed"
          />

          <div className="rounded-lg border border-border bg-muted/20 p-4 mt-4 text-sm">
            <strong className="text-foreground block mb-1">
              Neutrino Mass from Beta Endpoint
            </strong>
            <span className="text-muted-foreground">
              The KATRIN experiment at Karlsruhe measures the endpoint of the
              tritium beta spectrum with sub-eV precision. A non-zero neutrino
              mass distorts the endpoint shape. Current bound:{" "}
              <span className="font-mono">
                m<sub>ν</sub> &lt; 0.8 eV/c²
              </span>{" "}
              (2022 result). This is the most direct kinematic neutrino mass
              limit.
            </span>
          </div>
        </CollapsibleSection>

        {/* ── NEW: Electron Capture and Internal Conversion ── */}
        <CollapsibleSection
          title="Electron Capture and Internal Conversion"
          badge="intermediate"
          ocid="decay.ec_ic_section"
        >
          <h3 className="font-semibold text-foreground text-base mb-2">
            Electron Capture (EC)
          </h3>
          <EquationBlock
            latex="p + e^-_K \\rightarrow n + \\nu_e"
            annotation="A proton captures an inner-shell (usually K-shell) electron, converting to a neutron and emitting a neutrino. The nucleus decreases Z by 1, A unchanged."
            label="Electron Capture"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            EC competes with β⁺ emission for neutron-deficient nuclei.{" "}
            <strong className="text-foreground">Key constraint:</strong> if Q
            &lt; 2m_e c² = 1.022 MeV, β⁺ emission is energetically forbidden and
            only EC occurs (no positron mass penalty). The K-shell vacancy left
            by the captured electron is filled by outer electrons, producing
            characteristic X-rays (K-X-rays) or Auger electrons — the signature
            of EC.
          </p>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Medical Example: I-125
            </div>
            <div className="text-muted-foreground">
              Iodine-125 (T½ = 59.5 days) undergoes pure EC to Te-125. The
              process emits 27–32 keV characteristic X-rays from the tellurium
              K-shell. These low-energy photons have a very short range in
              tissue — ideal for <em>brachytherapy seeds</em> placed directly
              within prostate tumors, minimising dose to surrounding healthy
              tissue.
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            Internal Conversion (IC)
          </h3>
          <EquationBlock
            latex="\\alpha_{IC} = \\frac{N_e}{N_\\gamma}"
            annotation="The internal conversion coefficient α_IC is the ratio of conversion electrons emitted to gamma rays emitted. α_IC >> 1 means IC dominates; α_IC << 1 means gamma emission dominates."
            label="Internal Conversion Coefficient"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Internal conversion is a competing process to gamma emission:
            instead of emitting a photon, the nucleus transfers excitation
            energy directly to an atomic electron, which is then ejected with
            kinetic energy T_e = E* − E_binding. IC is not due to photoelectric
            absorption of an emitted gamma; it is a direct quantum-mechanical
            process.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            <strong className="text-foreground">E0 transitions</strong> (ΔJ = 0,
            no change in parity) cannot proceed by single gamma emission
            (photons carry ≥1ℏ of angular momentum), so IC is the <em>only</em>{" "}
            electromagnetic decay mode — making IC coefficients very large (α_IC
            → ∞) for E0. Shell contributions decrease outward: α<sub>K</sub> ≫ α
            <sub>L</sub> ≫ α<sub>M</sub> because K-shell electrons have the
            highest probability density at the nucleus.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            Auger Electrons and Targeted Therapy
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            When an IC electron is ejected from the K-shell, the vacancy is
            filled by an outer electron, releasing energy as either a
            characteristic X-ray or an <em>Auger electron</em> (radiationless
            transition). For high-Z elements, this initiates an Auger cascade —
            multiple low-energy electrons (50 eV – 30 keV) emitted from a single
            decay event.
          </p>
          <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Targeted Auger Therapy (Radiopharmaceuticals)
            </div>
            <div className="text-muted-foreground">
              Auger emitters like{" "}
              <strong className="text-foreground">In-111</strong> (EC, T½ = 2.8
              days, emits 4–5 Auger electrons per decay) and{" "}
              <strong className="text-foreground">I-125</strong> deposit their
              dose within ~2–10 nm of the decay site — the scale of a DNA double
              helix. When attached to targeting vectors (antibodies, peptides,
              DNA intercalators) that deliver the radionuclide to the cell
              nucleus, Auger emitters can achieve highly efficient, localised
              cell killing with minimal bystander effects. Clinical trials are
              ongoing for several constructs.
            </div>
          </div>
        </CollapsibleSection>

        {/* ── NEW: Spontaneous Fission ── */}
        <CollapsibleSection
          title="Spontaneous Fission"
          badge="advanced"
          ocid="decay.sf_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Very heavy nuclei can split into two fragments without any external
            neutron — a process called spontaneous fission (SF). Like alpha
            decay, it proceeds by quantum tunneling through the fission barrier,
            but through a much wider and higher barrier, making it far less
            probable. For transuranics, SF competes directly with alpha decay.
          </p>

          <EquationBlock
            latex="T_{1/2}^{\\text{SF}} \\propto \\exp\\!\\left(\\frac{2}{\\hbar}\\int_{r_1}^{r_2}\\sqrt{2M[V(r)-Q_{\\text{SF}}]}\\,dr\\right)"
            annotation="The SF half-life scales exponentially with the tunneling integral through the fission barrier V(r), evaluated between classical turning points r₁ and r₂. The double-humped barrier in actinides (shape isomers) makes this integral highly sensitive to nuclear deformation."
            label="Spontaneous Fission WKB Tunneling"
          />

          <h3 className="font-semibold text-foreground text-base mb-3 mt-4">
            Californium-252: The Practical Neutron Source
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Cf-252 undergoes SF with a branch ratio of 3.09% (T½(SF) = 85.5 yr;
            T½(α) = 2.65 yr). Each spontaneous fission releases an average of{" "}
            <strong className="text-foreground">ν̄ = 3.73 neutrons</strong> —
            higher than thermal-neutron-induced fission of U-235 (ν̄ = 2.42). A 1
            μg source emits 2.3 × 10⁶ neutrons/s. Applications include neutron
            activation analysis, PGNAA bulk analysers, neutron radiography, and
            starting sources for research reactors.
          </p>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Spontaneous Fission Half-Lives
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½ (total)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½ (SF)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    SF Branch (%)
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "U-235",
                    "7.04 × 10⁸ yr",
                    "3.5 × 10¹⁷ yr",
                    "7×10⁻⁹ %",
                    "Fissile fuel; negligible SF",
                  ],
                  [
                    "U-238",
                    "4.47 × 10⁹ yr",
                    "8.2 × 10¹⁵ yr",
                    "5.5×10⁻⁵ %",
                    "Background neutron source",
                  ],
                  [
                    "Pu-239",
                    "2.41 × 10⁴ yr",
                    "5.5 × 10¹⁵ yr",
                    "4.4×10⁻¹⁰ %",
                    "Weapons-grade Pu — very low SF",
                  ],
                  [
                    "Pu-240",
                    "6,561 yr",
                    "1.16 × 10¹¹ yr",
                    "5.7×10⁻³ %",
                    "Reactor-grade Pu — problematic SF",
                  ],
                  [
                    "Cm-248",
                    "3.4 × 10⁵ yr",
                    "4.15 × 10⁶ yr",
                    "8.26%",
                    "High SF, strong neutron emitter",
                  ],
                  [
                    "Cf-252",
                    "2.645 yr",
                    "85.5 yr",
                    "3.09%",
                    "Standard neutron source (2.3×10⁶ n/μg/s)",
                  ],
                ].map(([nuc, tt, tsf, br, note]) => (
                  <tr key={nuc} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground">
                      {nuc}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground font-mono text-xs">
                      {tt}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground font-mono text-xs">
                      {tsf}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {br}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm">
            <strong className="text-foreground block mb-1">
              Shape Isomers and the Double-Humped Barrier
            </strong>
            <span className="text-muted-foreground">
              Actinide fission barriers have a double-humped shape in the
              deformation energy landscape, creating a secondary minimum where
              nuclei can exist in metastable superdeformed states (fission
              isomers). Am-242m is a classic example: T½ = 14 ms for SF from the
              second minimum vs. 16 hr for the ground state. The double hump
              arises from shell corrections to the liquid-drop model (Strutinsky
              shell correction method, 1967).
            </span>
          </div>
        </CollapsibleSection>

        {/* ── NEW 1: Radioactive Decay Law ── */}
        <CollapsibleSection
          title="Radioactive Decay Law: Derivation and Applications"
          badge="intermediate"
          ocid="decay.decay_law_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The exponential decay law is a direct consequence of quantum
            mechanics: each nucleus decays independently with a constant
            probability per unit time. Starting from this principle, the full
            mathematical framework follows by integration.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Derivation from First Principles
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Let N(t) be the number of undecayed nuclei at time t, and λ (s⁻¹)
            the decay constant — the probability of decay per nucleus per unit
            time. The rate of loss is proportional to how many nuclei are
            present:
          </p>
          <EquationBlock
            latex="\frac{dN}{dt} = -\lambda N"
            annotation="The rate of decay is proportional to the number of undecayed nuclei N. The minus sign indicates N is decreasing. λ has units of s⁻¹ (or yr⁻¹, d⁻¹, etc.)."
            label="Differential Decay Law"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Separating variables and integrating from t=0 to t, with N(0) = N₀:
          </p>
          <EquationBlock
            latex="N(t) = N_0\, e^{-\lambda t}"
            annotation="The fundamental exponential decay law. N₀ is the initial number of nuclei; λ is the decay constant. The activity A(t) = λN(t) = A₀ e^{−λt} has the same form."
            label="Radioactive Decay Law"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-5">
            Half-Life and Mean Lifetime
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The <strong className="text-foreground">half-life</strong> T½ is the
            time for N to fall to N₀/2. Setting N(T½) = N₀/2 and solving:
          </p>
          <EquationBlock
            latex="T_{1/2} = \frac{\ln 2}{\lambda} = \frac{0.6931}{\lambda}"
            annotation="Half-life T½ relates inversely to the decay constant λ. A large λ means fast decay and a short half-life. ln 2 ≈ 0.6931."
            label="Half-Life"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The <strong className="text-foreground">mean lifetime</strong> τ is
            the statistical average time a nucleus survives before decaying:
          </p>
          <EquationBlock
            latex="\tau = \frac{1}{\lambda} = \frac{T_{1/2}}{\ln 2} = 1.4427 \times T_{1/2}"
            annotation="The mean lifetime τ = 1/λ is longer than T½ by a factor of 1/ln(2) ≈ 1.4427. At t = τ, the fraction remaining is N/N₀ = e⁻¹ ≈ 36.79%."
            label="Mean Lifetime"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-sm">
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="font-semibold text-foreground mb-1">
                At t = τ (one mean lifetime)
              </div>
              <div className="text-xs text-muted-foreground">
                N = N₀/e ≈ <strong className="text-foreground">36.79%</strong>{" "}
                remains. The mean lifetime always exceeds the half-life by ~44%.
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="font-semibold text-foreground mb-1">
                After n half-lives
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                N = N₀ / 2ⁿ
                <br />
                <span className="not-italic text-muted-foreground">
                  10 T½ → N₀/1024 ≈{" "}
                  <strong className="text-foreground">0.1% remaining</strong>
                </span>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-2">
            Worked Example: I-131 Medical Dosimetry
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Iodine-131 (T½ = 8.02 days) is administered at 370 MBq for thyroid
            therapy. What is the activity remaining after 24 days?
          </p>
          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Step-by-step solution
            </div>
            <div className="space-y-1 text-muted-foreground font-mono text-xs">
              <div>
                n = t / T½ = 24 / 8.02 ={" "}
                <strong className="text-foreground">2.993 half-lives</strong>
              </div>
              <div>A = A₀ × (0.5)ⁿ = 370 × (0.5)^2.993</div>
              <div>A = 370 × e^(−2.993 × ln 2) = 370 × e^(−2.075)</div>
              <div>
                A = 370 × 0.1256 ={" "}
                <strong className="text-foreground">46.5 MBq</strong>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Cross-check:{" "}
              <span className="font-mono">λ = 0.6931/8.02 = 0.0865 d⁻¹</span>;{" "}
              <span className="font-mono">
                A = 370 × e^(−0.0865 × 24) = 46.5 MBq ✓
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Activity and Becquerel
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Activity A = λN, measured in{" "}
            <strong className="text-foreground">becquerel (Bq)</strong> — 1 Bq =
            1 decay per second. The older unit curie (Ci) = 3.7 × 10¹⁰ Bq
            (defined as the activity of 1 gram of Ra-226). For practical
            sources: 370 MBq = 10 mCi.
          </p>
          <EquationBlock
            latex="A(t) = \lambda N(t) = A_0\, e^{-\lambda t}, \quad A_0 = \lambda N_0"
            annotation="Activity A = λN. Since N decays exponentially, so does A. The specific activity (Bq/g) = λ N_A / M, where N_A is Avogadro's number and M is molar mass."
            label="Activity"
          />

          <div className="overflow-x-auto rounded-lg border border-border mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    τ (mean)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Specific Activity
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Application
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "C-14",
                    "5,730 yr",
                    "8,267 yr",
                    "1.65 × 10¹¹ Bq/g",
                    "Radiocarbon dating",
                  ],
                  [
                    "I-131",
                    "8.02 days",
                    "11.57 days",
                    "4.60 × 10¹⁵ Bq/g",
                    "Thyroid therapy",
                  ],
                  [
                    "Tc-99m",
                    "6.01 h",
                    "8.67 h",
                    "1.94 × 10¹⁷ Bq/g",
                    "Medical imaging (SPECT)",
                  ],
                  [
                    "Ra-226",
                    "1,600 yr",
                    "2,309 yr",
                    "3.66 × 10¹⁰ Bq/g",
                    "Historical brachytherapy",
                  ],
                  [
                    "U-238",
                    "4.468 Gyr",
                    "6.445 Gyr",
                    "1.24 × 10⁴ Bq/g",
                    "Geochronology, fuel",
                  ],
                  [
                    "Po-210",
                    "138.4 days",
                    "199.6 days",
                    "1.66 × 10¹⁴ Bq/g",
                    "α source, RTG history",
                  ],
                ].map(([nuc, t, tau, sa, app]) => (
                  <tr key={nuc} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground">
                      {nuc}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {t}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {tau}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {sa}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {app}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>

        {/* ── NEW 2: All Decay Modes ── */}
        <CollapsibleSection
          title="All Decay Modes: Classification and Examples"
          badge="intermediate"
          ocid="decay.all_modes_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Nuclear decay modes extend well beyond alpha and beta. Each mode is
            governed by conservation laws (charge, mass-energy, angular
            momentum, parity) and energy availability. The chart below
            summarises every significant mode, its effect on Z and N, and a
            representative example.
          </p>

          <div className="overflow-x-auto rounded-lg border border-border mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Mode
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-foreground">
                    Symbol
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-foreground">
                    ΔZ
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-foreground">
                    ΔN
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Example
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Q range
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Alpha", "α", "−2", "−2", "U-238 → Th-234 + α", "4–9 MeV"],
                  [
                    "Beta-minus",
                    "β⁻",
                    "+1",
                    "−1",
                    "Co-60 → Ni-60 + e⁻ + ν̄",
                    "0–10 MeV",
                  ],
                  [
                    "Beta-plus",
                    "β⁺",
                    "−1",
                    "+1",
                    "F-18 → O-18 + e⁺ + ν",
                    "0–10 MeV",
                  ],
                  [
                    "Electron capture",
                    "ε / EC",
                    "−1",
                    "+1",
                    "Fe-55 → Mn-55 + ν",
                    "> 0",
                  ],
                  [
                    "Isomeric transition",
                    "IT",
                    "0",
                    "0",
                    "Tc-99m → Tc-99 + γ",
                    "0.1–5 MeV",
                  ],
                  [
                    "Spontaneous fission",
                    "SF",
                    "varies",
                    "varies",
                    "Cf-252 → 2 fragments + nν",
                    "~200 MeV",
                  ],
                  [
                    "Neutron emission",
                    "n",
                    "0",
                    "−1",
                    "Be-13 → Be-12 + n",
                    "0–8 MeV",
                  ],
                  [
                    "Proton emission",
                    "p",
                    "−1",
                    "0",
                    "Co-53 → Fe-52 + p",
                    "0.5–2 MeV",
                  ],
                  [
                    "Double beta decay",
                    "2β⁻",
                    "+2",
                    "−2",
                    "Ge-76 → Se-76 + 2e⁻ + 2ν̄",
                    "Q ~2 MeV; T½ ~10²¹ yr",
                  ],
                  [
                    "Cluster decay",
                    "C",
                    "varies",
                    "varies",
                    "Ra-223 → Pb-209 + C-14",
                    "~30 MeV; b ~10⁻¹⁰",
                  ],
                ].map(([mode, sym, dz, dn, ex, q]) => (
                  <tr
                    key={mode}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {mode}
                    </td>
                    <td className="px-4 py-2 text-center font-mono text-foreground">
                      {sym}
                    </td>
                    <td className="px-4 py-2 text-center font-mono text-muted-foreground">
                      {dz}
                    </td>
                    <td className="px-4 py-2 text-center font-mono text-muted-foreground">
                      {dn}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {ex}
                    </td>
                    <td className="px-4 py-2 text-right text-xs text-muted-foreground">
                      {q}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Selection Rules: Which Mode Dominates?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              {
                label: "Heavy nuclei (A > 150)",
                text: "Alpha decay preferred when Q_α > 0 and Coulomb tunneling is energetically favorable. Heavier nuclei have larger Z², raising Q_α above the threshold for observable tunneling rates.",
              },
              {
                label: "Neutron-rich nuclei",
                text: "β⁻ decay dominates — converts excess neutrons to protons, moving the nucleus toward the N/Z valley of stability. Rate governed by Gamow-Teller and Fermi matrix elements.",
              },
              {
                label: "Proton-rich / neutron-deficient",
                text: "β⁺ emission (if Q > 2m_ec² = 1.022 MeV) or electron capture (EC always allowed if Q > 0). For low-Q nuclides (Q < 1.022 MeV), only EC is possible — no positrons emitted.",
              },
              {
                label: "Magic-number shells or isomers",
                text: "Isomeric transition (IT) dominates when the nucleus is trapped in a long-lived excited state (isomer). Gamma emission or internal conversion de-excites the isomer.",
              },
              {
                label: "Very heavy (A > 240)",
                text: "Spontaneous fission competes with alpha decay. The SF-to-alpha branching ratio rises steeply with Z²/A (fissility parameter), becoming dominant near and beyond Z = 104.",
              },
              {
                label: "Far from stability (exotic beams)",
                text: "Neutron or proton emission observed in extremely neutron-rich or proton-rich nuclei beyond the drip lines. Timescales as short as 10⁻²¹ s (prompt particle emission).",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-sm"
              >
                <div className="font-semibold text-foreground mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground">{item.text}</div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Isomeric Transition: Technetium-99m
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Tc-99m is the workhorse of nuclear medicine imaging. It is a nuclear
            isomer — Tc-99 in an excited state at 142.7 keV above ground, with
            T½ = 6.01 hours. It decays by IT, emitting a 140.5 keV gamma ray
            with 89% probability. The 140.5 keV energy is near-ideal for gamma
            cameras (SPECT): high enough to escape tissue with minimal
            attenuation, low enough to be efficiently detected by NaI crystals.
            Generated on-site from Mo-99/Tc-99m generators (Mo-99 T½ = 65.9 h).
          </p>
          <EquationBlock
            latex="^{99m}_{43}\text{Tc} \xrightarrow{\text{IT},\,T_{1/2}=6.01\,\text{h}} ^{99}_{43}\text{Tc} + \gamma\,(140.5\,\text{keV})"
            annotation="Tc-99m isomeric transition: the metastable excited state decays to the ground state via 140.5 keV gamma emission or internal conversion. About 80 million Tc-99m scans are performed annually worldwide."
            label="Tc-99m Isomeric Transition"
          />
        </CollapsibleSection>

        {/* ── NEW 3: Branching Ratios and Partial Half-Lives ── */}
        <CollapsibleSection
          title="Branching Ratios and Partial Half-Lives"
          badge="advanced"
          ocid="decay.branching_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            When a nucleus has more than one open decay channel — for example
            K-40 which can undergo both β⁻ decay and electron capture — each
            channel has its own partial decay constant λᵢ. The total decay
            constant is the sum of all partial constants, and the observed
            half-life corresponds to the total rate.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Formalism
          </h3>
          <EquationBlock
            latex="\lambda_{\text{total}} = \lambda_1 + \lambda_2 + \cdots + \lambda_n"
            annotation="When n decay modes compete, the total decay constant is the sum of all partial decay constants. Each λᵢ is independent; the nucleus can 'choose' any available channel on each decay event."
            label="Total Decay Constant"
          />
          <EquationBlock
            latex="b_i = \frac{\lambda_i}{\lambda_{\text{total}}}, \quad T_{1/2,i} = \frac{T_{1/2}}{b_i} = \frac{\ln 2}{\lambda_i}"
            annotation="Branching ratio bᵢ is the fractional probability of decay via mode i. Partial half-life T½,i is always longer than the observed T½ because the partial rate is slower. Sum of all bᵢ = 1."
            label="Branching Ratio and Partial Half-Life"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-5">
            Example: Potassium-40
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            K-40 (T½ = 1.248 × 10⁹ yr) is the most important natural radioactive
            isotope in the human body (~4,400 Bq in a 70 kg adult, predominantly
            from muscle). It has two decay branches:
          </p>
          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              K-40 Branching Analysis
            </div>
            <div className="space-y-2 text-xs text-muted-foreground font-mono">
              <div>
                β⁻ → Ca-40: b = 89.28% → T½(β⁻) = 1.248 Gyr / 0.8928 ={" "}
                <strong className="text-foreground">1.398 Gyr</strong>
              </div>
              <div>
                EC → Ar-40: b = 10.72% → T½(EC) = 1.248 Gyr / 0.1072 ={" "}
                <strong className="text-foreground">11.64 Gyr</strong>
              </div>
              <div className="border-t border-border pt-1">
                The Ar-40 branch is the source of most atmospheric argon (99.6%
                of natural Ar). The K-Ar ratio in rocks is used for age dating —
                one of the most widely used geochronometers.
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Example: Copper-64 (Three-Branch Decay)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Cu-64 (T½ = 12.70 h) is a rare nuclide with three simultaneously
            active decay channels — a textbook case for branching ratio
            calculations and clinically relevant for PET/therapy theranostics:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Mode
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Daughter
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Branch b (%)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Partial T½
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Clinical relevance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "β⁻",
                    "Zn-64",
                    "38.5",
                    "33.0 h",
                    "Radiotherapy (Auger + β⁻ dose)",
                  ],
                  [
                    "β⁺",
                    "Ni-64",
                    "17.6",
                    "72.2 h",
                    "PET imaging (511 keV annihilation γ)",
                  ],
                  [
                    "EC",
                    "Ni-64",
                    "43.9",
                    "28.9 h",
                    "Companion to β⁺; X-ray emission",
                  ],
                ].map(([mode, d, b, pt, cr]) => (
                  <tr
                    key={mode}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-mono text-foreground">
                      {mode}
                    </td>
                    <td className="px-4 py-2 font-mono text-muted-foreground">
                      {d}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {b}%
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {pt}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {cr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Example: Iodine-131 (Multi-Branch Beta + Gamma)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            I-131 (T½ = 8.02 d) has 7 significant beta branches populating
            different Xe-131 excited states, each followed by gamma cascades.
            This complex decay scheme is why the dosimetry requires detailed
            spectral data:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    β branch
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Branch (%)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    E_max (keV)
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Gamma(s) emitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "→ Xe-131 (gnd)",
                    "89.4",
                    "333",
                    "None (ground state daughter)",
                  ],
                  [
                    "→ Xe-131m (80 keV)",
                    "36.5",
                    "606",
                    "364 keV (81.7%) — primary imaging line",
                  ],
                  ["→ Xe-131* (164 keV)", "7.3", "248", "284 keV (6.1%)"],
                  [
                    "→ Xe-131* (637 keV)",
                    "1.7",
                    "—",
                    "636 keV (7.2%), 723 keV (1.8%)",
                  ],
                ].map(([br, b, e, g]) => (
                  <tr key={br} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-xs text-foreground">
                      {br}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {b}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {e}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {g}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm">
            <strong className="text-foreground block mb-1">
              Spontaneous Fission Branching: U-238
            </strong>
            <span className="text-muted-foreground text-xs">
              U-238's SF branch is{" "}
              <span className="font-mono text-foreground">
                b_SF = 5.45 × 10⁻⁵ %
              </span>{" "}
              (partial T½(SF) = 8.2 × 10¹⁵ yr), completely negligible compared
              to alpha decay (T½(α) = 4.47 × 10⁹ yr). However, the neutrons
              produced by SF in natural uranium ore are the seed neutrons
              responsible for natural fission chain reactions — most famously at
              Oklo, Gabon (~2 billion years ago).
            </span>
          </div>
        </CollapsibleSection>

        {/* ── NEW 4: Bateman Equations ── */}
        <CollapsibleSection
          title="Decay Chain Mathematics: Bateman Equations"
          badge="advanced"
          ocid="decay.bateman_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            When a radioactive parent decays to a radioactive daughter, which in
            turn decays to a granddaughter, the populations of all members of
            the chain are coupled. Harry Bateman (1910) derived the general
            analytic solution for a chain of arbitrary length starting from a
            pure parent.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Coupled Rate Equations (A → B → C)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            For the simplest chain A → B → C (stable), the three coupled ODEs
            are:
          </p>
          <EquationBlock
            latex="\frac{dN_A}{dt} = -\lambda_A N_A"
            annotation="Parent A decays with decay constant λ_A. No production — only loss."
            label="Parent Population"
          />
          <EquationBlock
            latex="\frac{dN_B}{dt} = +\lambda_A N_A - \lambda_B N_B"
            annotation="Daughter B is produced by parent decay (λ_A N_A) and lost by its own decay (λ_B N_B). The solution is a sum of two exponentials."
            label="Daughter Population"
          />
          <EquationBlock
            latex="\frac{dN_C}{dt} = +\lambda_B N_B"
            annotation="Stable end product C accumulates only; it does not decay. N_C(t) = N_A(0) − N_A(t) − N_B(t) by conservation of nucleons."
            label="Stable Product Accumulation"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            Bateman Solution
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            With initial condition N_1(0) = N₀, all other members zero, the
            general Bateman solution for the i-th member of an n-member chain
            is:
          </p>
          <EquationBlock
            latex="N_i(t) = N_1(0) \prod_{j=1}^{i-1}\lambda_j \;\sum_{j=1}^{i} \frac{e^{-\lambda_j t}}{\displaystyle\prod_{\substack{k=1\\k\neq j}}^{i}(\lambda_k - \lambda_j)}"
            annotation="The Bateman formula gives the exact population of each chain member as a sum of exponentials. For i=2 (first daughter): N_2(t) = N_1(0) × λ₁/(λ₂−λ₁) × (e^{−λ₁t} − e^{−λ₂t})."
            label="General Bateman Solution"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-5">
            Secular Equilibrium (T½,parent ≫ T½,daughter)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            When the parent half-life is much longer than all daughters (e.g.,
            U-238 → Ra-226 → Rn-222 chain), after sufficient time the activity
            of each daughter equals the parent activity:
          </p>
          <EquationBlock
            latex="\lambda_1 N_1 = \lambda_2 N_2 = \cdots = \lambda_n N_n \quad (A_1 = A_2 = \cdots = A_n)"
            annotation="At secular equilibrium, every daughter has the same activity as the parent. The total activity of uranium ore in secular equilibrium is ~14× the U-238 activity alone (14 radioactive daughters)."
            label="Secular Equilibrium"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Uranium ore reaches secular equilibrium on timescales of ~10 ×
            T½(longest daughter). For U-238, the longest-lived daughter is
            Pa-234m (T½ = 1.17 min) except for U-234 (T½ = 245 kyr) — so true
            secular equilibrium for the full chain takes ~2.5 Myr.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Transient Equilibrium (T½,parent slightly &gt; T½,daughter)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            When the parent is longer-lived than the daughter but not enormously
            so (e.g., Mo-99/Tc-99m generator: T½(Mo) = 65.9 h, T½(Tc-99m) = 6.01
            h), the system reaches a state where the daughter-to-parent activity
            ratio is constant but greater than 1:
          </p>
          <EquationBlock
            latex="\frac{A_2}{A_1} = \frac{\lambda_2}{\lambda_2 - \lambda_1} > 1"
            annotation="At transient equilibrium the daughter activity exceeds the parent activity by the factor λ₂/(λ₂−λ₁). For Mo-99/Tc-99m: ratio = (0.1153 h⁻¹)/(0.1153−0.01051 h⁻¹) ≈ 1.10 (daughter 10% above parent)."
            label="Transient Equilibrium Ratio"
          />

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 mt-5">
            U-238 → Pb-206 Full Decay Chain (14 Steps)
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    #
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Mode
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Daughter
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">
                    T½
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-foreground">
                    Q (MeV)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [1, "U-238", "α", "Th-234", "4.468 × 10⁹ yr", "4.270"],
                  [2, "Th-234", "β⁻", "Pa-234m", "24.10 days", "0.273"],
                  [3, "Pa-234m", "β⁻", "U-234", "1.17 min", "2.197"],
                  [4, "U-234", "α", "Th-230", "2.455 × 10⁵ yr", "4.858"],
                  [5, "Th-230", "α", "Ra-226", "7.538 × 10⁴ yr", "4.771"],
                  [6, "Ra-226", "α", "Rn-222", "1,600 yr", "4.871"],
                  [7, "Rn-222", "α", "Po-218", "3.8235 days", "5.590"],
                  [
                    8,
                    "Po-218",
                    "α (99.98%) / β⁻ (0.02%)",
                    "Pb-214 / At-218",
                    "3.098 min",
                    "6.115",
                  ],
                  [9, "Pb-214", "β⁻", "Bi-214", "26.8 min", "1.024"],
                  [
                    10,
                    "Bi-214",
                    "β⁻ (99.98%) / α (0.02%)",
                    "Po-214 / Tl-210",
                    "19.7 min",
                    "3.270",
                  ],
                  [11, "Po-214", "α", "Pb-210", "164.3 μs", "7.834"],
                  [12, "Pb-210", "β⁻", "Bi-210", "22.20 yr", "0.064"],
                  [13, "Bi-210", "β⁻", "Po-210", "5.013 days", "1.163"],
                  [14, "Po-210", "α", "Pb-206 (stable)", "138.4 days", "5.408"],
                ].map(([n, nuc, mode, dau, t, q]) => (
                  <tr
                    key={String(n)}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-3 py-1.5 text-muted-foreground">{n}</td>
                    <td className="px-3 py-1.5 font-mono font-semibold text-foreground">
                      {nuc}
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-bold uppercase ${String(mode).startsWith("α") ? "bg-rose-400/10 text-rose-400" : String(mode).startsWith("β") ? "bg-blue-400/10 text-blue-400" : "bg-muted text-muted-foreground"}`}
                      >
                        {mode}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 font-mono text-muted-foreground">
                      {dau}
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">
                      {t}
                    </td>
                    <td className="px-3 py-1.5 text-right text-muted-foreground">
                      {q}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Source: ENSDF/NNDC. Q-values from AME2020 atomic mass evaluation.
          </p>
        </CollapsibleSection>

        {/* ── NEW 5: Spontaneous Fission and Exotic Decays ── */}
        <CollapsibleSection
          title="Spontaneous Fission and Exotic Decays"
          badge="advanced"
          ocid="decay.exotic_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Beyond the classical alpha, beta, and gamma modes lie rarer nuclear
            decay processes: spontaneous fission, cluster decay, double-beta
            decay, and neutrinoless double-beta decay. Each probes different
            aspects of nuclear structure or fundamental particle physics.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Spontaneous Fission (SF): Physics
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            In SF, a heavy nucleus (A &gt; 230) splits into two large fragments
            plus 2–4 neutrons, without any external trigger. The fissility
            parameter x = Z²/A governs whether fission is energetically
            favorable:
          </p>
          <EquationBlock
            latex="x = \frac{Z^2/A}{(Z^2/A)_{\text{crit}}} \approx \frac{Z^2}{50.88 A\left(1 - 1.7826\left(\frac{N-Z}{A}\right)^2\right)}"
            annotation="Fissility x: when x approaches 1, the Coulomb energy overcomes surface tension and the nucleus is unstable to fission. For U-235: Z²/A ≈ 36; for the critical value: Z²/A ≈ 50. Superheavy elements reach x ≈ 0.8–0.9."
            label="Liquid-Drop Fissility Parameter"
          />

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            Californium-252: The Standard Neutron Source
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Cf-252 is the most widely used portable neutron source. Its SF
            branch ratio of 3.09% means that every gram emits an enormous flux
            of fission neutrons:
          </p>
          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Cf-252 Key Data (NNDC/IAEA)
            </div>
            <div className="space-y-1 text-xs text-muted-foreground font-mono">
              <div>Total T½ = 2.645 yr (α dominates; T½(α) = 2.73 yr)</div>
              <div>SF T½ = 85.5 yr; SF branch = 3.09%</div>
              <div>
                ν̄(SF) ={" "}
                <strong className="text-foreground">
                  3.757 neutrons/fission
                </strong>{" "}
                (ENDF/B-VIII.0)
              </div>
              <div>
                Neutron emission rate ={" "}
                <strong className="text-foreground">
                  2.314 × 10¹² n s⁻¹ g⁻¹
                </strong>
              </div>
              <div>Average neutron energy = 2.1 MeV (Watt spectrum)</div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Applications of Cf-252: neutron activation analysis (NAA), prompt
            gamma neutron activation analysis (PGNAA) for bulk composition in
            mining and cement, neutron radiography, borehole logging in oil/gas
            exploration, and as starting sources for new reactor fuel loads.
            Small sources (~10–100 μg) are used in research; industrial sources
            can be up to 1 mg.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-2">
            Cluster Decay
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Cluster decay is a generalisation of alpha decay where the emitted
            cluster is heavier than a helium-4 nucleus — carbon-14, neon-20,
            magnesium-24, silicon-28 nuclei have all been observed. First
            predicted by Sandulescu, Poenaru, and Greiner in 1980; first
            observed experimentally by Rose and Jones (Oxford, 1984) for the
            Ra-223 → Pb-209 + ¹⁴C decay.
          </p>
          <EquationBlock
            latex="^{223}_{88}\text{Ra} \rightarrow ^{209}_{82}\text{Pb} + ^{14}_{6}\text{C}, \quad b = 8.5 \times 10^{-10}"
            annotation="First experimentally observed cluster decay. The tiny branching ratio (~10⁻¹⁰) makes cluster decay extraordinarily rare. The daughter Pb-209 has a doubly magic character (Z=82 is magic), which drives the preference for this fragment pair."
            label="Ra-223 Cluster Decay (1984)"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The preferred cluster partner is always the daughter closest to a
            doubly-magic nucleus (Pb-208 for most observed cases), reflecting
            the same shell-model enhancement that stabilises alpha decay.
            Half-lives for cluster decay range from 10¹¹ to 10²⁶ seconds, all
            measurable only in dedicated low-background experiments.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Double Beta Decay and the Neutrino Mass
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Some nuclei where single β decay is forbidden can undergo two
            simultaneous β decays:
          </p>
          <EquationBlock
            latex="(Z,A) \rightarrow (Z+2, A) + 2e^- + 2\bar{\nu}_e \quad (2\nu\beta\beta)"
            annotation="Two-neutrino double beta decay (2νββ): two neutrons decay simultaneously, emitting two electrons and two antineutrinos. Observed in ~13 nuclei. T½ ~ 10¹⁸–10²⁴ yr. The two-neutrino continuous spectrum is the signature."
            label="Two-Neutrino Double Beta Decay"
          />
          <EquationBlock
            latex="(Z,A) \rightarrow (Z+2, A) + 2e^- \quad (0\nu\beta\beta) \text{ [NOT YET OBSERVED]}"
            annotation="Neutrinoless double beta decay (0νββ): if the antineutrino emitted at one vertex is reabsorbed as a neutrino at the other, this is only possible if ν = ν̄ (Majorana particle). Discovery would establish lepton number violation and provide the absolute neutrino mass."
            label="Neutrinoless Double Beta Decay (Hypothetical)"
          />

          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½(2νββ) measured
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½(0νββ) limit
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Experiment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Ge-76",
                    "2.022 × 10²¹ yr",
                    "> 1.8 × 10²⁶ yr",
                    "GERDA (2020)",
                  ],
                  [
                    "Xe-136",
                    "2.165 × 10²¹ yr",
                    "> 1.07 × 10²⁶ yr",
                    "KamLAND-Zen (2022)",
                  ],
                  ["Mo-100", "6.9 × 10¹⁸ yr", "> 1.8 × 10²⁴ yr", "NEMO-3"],
                  [
                    "Te-130",
                    "7.91 × 10²⁰ yr",
                    "> 2.2 × 10²⁵ yr",
                    "CUORE (2022)",
                  ],
                  ["Nd-150", "9.11 × 10¹⁸ yr", "> 2.0 × 10²² yr", "SNO+"],
                ].map(([nuc, m, lim, exp]) => (
                  <tr key={nuc} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground">
                      {nuc}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {m}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-xs text-muted-foreground">
                      {lim}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {exp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm">
            <strong className="text-foreground block mb-1">
              KamLAND-Zen: World's Most Sensitive 0νββ Search (2022)
            </strong>
            <span className="text-muted-foreground text-xs">
              The KamLAND-Zen 800 experiment dissolved 745 kg of xenon-136 in
              liquid scintillator inside the KamLAND detector (Kamioka mine,
              Japan). After 1,782 kg·yr of exposure, no 0νββ signal was
              observed, setting the world-leading limit T½ &gt; 1.07 × 10²⁶ yr
              (90% CL). This corresponds to an effective Majorana mass m_ββ &lt;
              36–156 meV (depending on nuclear matrix element calculation). The
              next phase (KamLAND2-Zen with 1 tonne Xe-136) targets T½
              sensitivity of ~10²⁷ yr.
              <br />
              <br />
              <strong className="text-foreground">Citation:</strong> KamLAND-Zen
              Collaboration, Phys. Rev. Lett. 130, 051802 (2023).
            </span>
          </div>
        </CollapsibleSection>

        {/* ── EXISTING: Decay Chains and Radioactive Series ── */}
        <CollapsibleSection
          title="Decay Chains and Radioactive Series"
          badge="intermediate"
          ocid="decay.series_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Heavy nuclides do not decay directly to stability in one step. They
            undergo a cascade of alpha and beta decays — a decay chain or
            radioactive series — ultimately reaching a stable lead or bismuth
            isotope. There are four classical natural series, classified by mass
            number modulo 4.
          </p>

          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Series
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Head Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T½ (Gyr)
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Stable End
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Steps
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "4n (Thorium)",
                    "Th-232",
                    "14.05",
                    "Pb-208",
                    "10",
                    "Primordial; no Rn in chain",
                  ],
                  [
                    "4n+1 (Neptunium)",
                    "Np-237",
                    "0.00214",
                    "Bi-209*",
                    "12",
                    "Extinct (T½ << Earth age); produced in reactors",
                  ],
                  [
                    "4n+2 (Uranium)",
                    "U-238",
                    "4.47",
                    "Pb-206",
                    "14",
                    "Includes Ra-226, Rn-222 (radon hazard)",
                  ],
                  [
                    "4n+3 (Actinium)",
                    "U-235",
                    "0.704",
                    "Pb-207",
                    "11",
                    "Provides Ac-227, Pa-231; U-Pb geochronology",
                  ],
                ].map(([ser, head, t, end, steps, note]) => (
                  <tr key={ser} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {ser}
                    </td>
                    <td className="px-4 py-2 font-mono text-muted-foreground">
                      {head}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {t}
                    </td>
                    <td className="px-4 py-2 font-mono text-muted-foreground">
                      {end}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {steps}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mb-5 italic">
            *Bi-209 was long assumed stable; in 2003 it was found to alpha-decay
            with T½ = 2.0 × 10¹⁹ yr.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Branching in Chains
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Decay chains are not always linear. Astatine-218 in the U-238 chain
            branches: 99.98% alpha decay (to Pb-214) and 0.02% beta-minus decay
            (to Rn-218). Similarly, Bi-212 (Th-232 chain) has a famous branch:
            64% β⁻ (to Po-212 → Pb-208) and 36% α (to Tl-208 → Pb-208), both
            paths converging on stable Pb-208. Understanding branching ratios is
            essential for calculating equilibrium activities.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            Radon-222 and Indoor Air Quality
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Radon-222 is the sixth member of the U-238 chain (Ra-226 → Rn-222 +
            α, T½ = 3.82 days). As a noble gas, it can diffuse through soil and
            building materials and accumulate in poorly ventilated spaces. Its
            short-lived daughters (Po-218, Pb-214, Bi-214, Po-214) are solid and
            can attach to airborne particles, depositing in lung tissue. Rn-222
            is the leading cause of lung cancer in non-smokers and the
            second-largest cause overall (EPA estimate: ~21,000 deaths/yr in the
            USA). The WHO reference level is 100 Bq/m³; the EPA action level is
            148 Bq/m³ (4 pCi/L).
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-4">
            U-Pb Geochronology
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The two uranium decay chains produce different stable lead isotopes:
            U-238 → Pb-206 and U-235 → Pb-207. By measuring the ratios
            ²⁰⁶Pb/²³⁸U, ²⁰⁷Pb/²³⁵U, and ²⁰⁷Pb/²⁰⁶Pb in a rock mineral (typically
            zircon, ZrSiO₄), geologists can calculate the age of crystallisation
            and check for concordance between the two systems. The method works
            from ~1 million to over 4 billion years, making it the gold standard
            for dating the oldest terrestrial rocks (Acasta Gneiss, ~4.03 Gyr)
            and meteorites (age of Solar System: 4.568 ± 0.001 Gyr from Canyon
            Diablo troilite).
          </p>
        </CollapsibleSection>
      </div>
    </div>
  );
}
