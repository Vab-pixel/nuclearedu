import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
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

const thermalFissionRows = [
  ["U-235", "584", "99", "0.169", "Primary fissile fuel in thermal reactors"],
  [
    "U-238",
    "2.7 × 10⁻⁶",
    "2.68",
    "—",
    "Fertile; not fissile at thermal energies",
  ],
  [
    "Pu-239",
    "748",
    "271",
    "0.362",
    "Bred from U-238; second major reactor fuel",
  ],
  ["Pu-241", "1011", "360", "0.356", "Build-up in high-burnup fuel"],
  ["Th-232", "~0", "7.4", "—", "Fertile; breeds U-233 in thorium cycle"],
  [
    "U-233",
    "530",
    "46",
    "0.087",
    "Bred from Th-232; favorable α for thermal reactors",
  ],
] as const;

const fastSpectrumRows = [
  ["U-235", "584", "1.24", "471×"],
  ["Pu-239", "748", "1.80", "416×"],
  ["U-238", "~0", "0.54 (threshold)", "—"],
] as const;

const endfLibraryRows = [
  [
    "ENDF/B-VIII.0 / VIII.1",
    "USA",
    "NNDC/BNL",
    "~380 materials; 2018 / 2024 revision",
  ],
  [
    "JEFF-3.3",
    "Europe",
    "JRC Geel (EURATOM)",
    "Widely used in European reactors",
  ],
  ["JENDL-5", "Japan", "JAEA", "Strong in medical & activation data"],
  ["CENDL-3.2", "China", "CIAE", "Updated 2020; growing international use"],
  [
    "BROND-3.1",
    "Russia",
    "VNIIEF/IPPE",
    "Includes unique Russian measurements",
  ],
  [
    "TENDL-2023",
    "International",
    "NRG/PSI (TALYS)",
    "Covers ~2,800 nuclides; auto-generated",
  ],
] as const;

export default function CrossSections() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Neutron Cross-Sections"
        subtitle="The probabilistic language of nuclear interactions — how barn units, quantum resonances, and energy-dependent reaction rates govern everything from reactor design to isotope production."
        audienceLevel="intermediate"
        readTimeMin={28}
      />

      <div className="grid gap-6">
        {/* ── Overview (always visible) ── */}
        <SectionCard data-ocid="cross_sections.overview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            What Is a Nuclear Cross-Section?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A nuclear cross-section (σ) is an <em>effective area</em> that
            quantifies the probability of a specific nuclear interaction
            occurring when a projectile (most commonly a neutron) encounters a
            target nucleus. It is not literally a geometric area — quantum
            effects mean σ can be orders of magnitude larger or smaller than the
            actual nuclear size.
          </p>

          <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 mb-5">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-2">
              The Barn Unit
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cross-sections are measured in{" "}
              <strong className="text-foreground">barns (b)</strong>: 1 b =
              10⁻²⁴ cm² = 10⁻²⁸ m². The unit was coined during the Manhattan
              Project — physicists joked that uranium nuclei were "as big as a
              barn" compared to expected cross-sections. In context: the actual
              nuclear geometric area is ~10⁻³⁰ m² (nuclear radius ~1–8 fm), yet
              thermal neutron fission cross-sections for U-235 reach 584 barns —
              roughly
              <strong className="text-foreground">
                {" "}
                500× the geometric area
              </strong>
              . Conversely, fast-neutron cross-sections can fall to millibarns
              (10⁻³ b), far below geometric size.
            </p>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Cross-Section Types
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              ["σ_T", "Total", "All interactions; σ_T = σ_el + σ_in + σ_abs"],
              [
                "σ_el",
                "Elastic scattering",
                "Neutron bounces; nucleus unchanged; kinetic energy conserved",
              ],
              [
                "σ_in",
                "Inelastic scattering",
                "Nucleus left in excited state; neutron loses energy; threshold reaction",
              ],
              [
                "σ_abs",
                "Absorption",
                "Neutron captured; σ_abs = σ_γ + σ_f + σ_α + ...",
              ],
              [
                "σ_f",
                "Fission",
                "Nucleus splits; releases ≥2 neutrons + ~200 MeV",
              ],
              [
                "σ_γ",
                "Radiative capture",
                "Neutron absorbed → compound nucleus → γ-ray emission",
              ],
            ].map(([sym, name, desc]) => (
              <div
                key={sym}
                className="rounded-lg bg-muted/30 border border-border p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs font-mono text-primary font-semibold">
                    {sym}
                  </code>
                  <span className="text-sm font-semibold text-foreground">
                    {name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <EquationBlock
            latex="R = n_1 \, v \, \sigma \, n_2"
            annotation="Reaction rate R [reactions/cm³/s]: n₁ and n₂ are the number densities of projectile and target [cm⁻³], v is their relative velocity [cm/s], σ is the cross-section [cm²]. For a neutron beam: n₂ is the target atom density, n₁v is the neutron flux Φ."
            label="Reaction Rate"
          />

          <EquationBlock
            latex="\lambda = \frac{1}{n\,\sigma}"
            annotation="Mean free path λ [cm]: the average distance a projectile travels between successive interactions. n is the target atom number density [cm⁻³], σ is the cross-section [cm²]."
            label="Mean Free Path"
          />

          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            Cross-section depends on three things: the{" "}
            <strong className="text-foreground">projectile type</strong>{" "}
            (neutron, proton, photon, etc.), the{" "}
            <strong className="text-foreground">projectile energy</strong> (can
            vary by 10 orders of magnitude for neutrons in a reactor), and the{" "}
            <strong className="text-foreground">target nuclide</strong>.
            Understanding this energy dependence is the core of reactor physics.
          </p>
        </SectionCard>

        {/* ── 1/v Region ── */}
        <CollapsibleSection
          title="The 1/v Absorption Region"
          badge="intermediate"
          ocid="cross_sections.one_over_v_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            For thermal neutrons (energies below ~0.1 eV), the absorption
            cross-section of most nuclides follows a strikingly simple law: it
            is inversely proportional to neutron velocity. The physical reason
            is elegant — a slower neutron spends more time in the vicinity of a
            nucleus, giving a proportionally higher chance of interaction.
          </p>

          <EquationBlock
            latex="\sigma_a(E) = \sigma_0 \sqrt{\frac{E_0}{E}} = \sigma_0 \frac{v_0}{v}"
            annotation="The 1/v law: absorption cross-section at energy E equals the reference value σ₀ multiplied by the square root of the reference energy E₀ divided by E. Subscript 0 denotes the standard reference condition: v₀ = 2200 m/s (room temperature, kT ≈ 0.0253 eV)."
            label="1/v Absorption Law"
          />

          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            This means that in the thermal region, a factor-of-4 decrease in
            neutron energy doubles the absorption cross-section. Reactor design
            exploits this: moderators slow neutrons to the thermal range where
            σ_f for U-235 is ~584 barns — hundreds of times larger than at fast
            energies.
          </p>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Thermal (2200 m/s) Cross-Sections of Key Nuclides
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    σ_f (barns)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    σ_γ (barns)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    α = σ_γ/σ_f
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {thermalFissionRows.map(([nuc, sf, sg, alpha, note]) => (
                  <tr key={nuc} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground">
                      {nuc}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {sf}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {sg}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {alpha}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic mb-5">
            Source: ENDF/B-VIII.0, NNDC/BNL. Values at 0.0253 eV (2200 m/s,
            293.6 K).
          </p>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Capture-to-Fission Ratio α and Reactor Economy
            </div>
            <p className="text-muted-foreground">
              The parameter α = σ_γ/σ_f matters greatly for fuel economy. For
              every 100 thermal neutrons absorbed by U-235, on average 14
              produce capture (wasted) while 86 produce fission (useful). Pu-239
              has a worse α (0.362) but a larger absolute σ_f. U-233 has the
              best α (0.087) of the three fissile nuclei — a key advantage of
              the thorium fuel cycle.
            </p>
          </div>

          <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Thermal Scattering: Water Moderation
            </div>
            <p className="text-muted-foreground">
              Hydrogen-1 has a thermal neutron scattering cross-section of{" "}
              <strong className="text-foreground">σ_s = 82 barns</strong> at
              2200 m/s — the highest of any stable nuclide (except H-2 at 3.4
              b). This, combined with its low mass (maximizing energy transfer
              per collision) and low cost, makes ordinary water (H₂O) the
              overwhelmingly dominant reactor moderator worldwide. Hydrogen also
              has σ_γ = 0.332 b — a parasitic absorption that must be accounted
              for in reactor neutron balance.
            </p>
          </div>
        </CollapsibleSection>

        {/* ── Resonances ── */}
        <CollapsibleSection
          title="Nuclear Resonances and the Breit-Wigner Formula"
          badge="advanced"
          ocid="cross_sections.resonance_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Between roughly 1 eV and 10 keV for heavy actinides, neutron
            cross-sections are dominated by sharp, towering peaks —{" "}
            <em>resonances</em>. These arise from the compound nucleus model
            (Niels Bohr, 1936): the incoming neutron is temporarily captured to
            form an excited compound nucleus at a specific excitation energy. If
            that energy coincides with a discrete nuclear energy level, the
            cross-section peaks dramatically.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
              <div className="font-semibold text-foreground mb-2">
                U-238 First Resonance
              </div>
              <div className="space-y-1 text-muted-foreground font-mono text-xs">
                <div>
                  E_r = <strong className="text-foreground">6.67 eV</strong>
                </div>
                <div>Γ_n = 1.493 × 10⁻³ eV</div>
                <div>Γ_γ = 23.0 × 10⁻³ eV</div>
                <div>
                  Peak σ_γ ≈{" "}
                  <strong className="text-foreground">25,000 barns</strong>
                </div>
                <div className="text-muted-foreground/60 pt-1 text-[11px]">
                  ENDF/B-VIII.0
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
              <div className="font-semibold text-foreground mb-2">
                U-235 Dense Resonance Structure
              </div>
              <div className="space-y-1 text-muted-foreground text-xs">
                <div>
                  First resonance at{" "}
                  <strong className="text-foreground">1.14 eV</strong>
                </div>
                <div>
                  Resonance spacing:{" "}
                  <strong className="text-foreground">D₀ ≈ 0.5–2 eV</strong>
                </div>
                <div>
                  Many fission resonances overlap with capture resonances
                </div>
                <div>Statistical treatment required above ~100 eV</div>
              </div>
            </div>
          </div>

          <EquationBlock
            latex="\sigma(E) = \pi\bar{\lambda}^2 \, g \, \frac{\Gamma_n \, \Gamma_x}{(E - E_r)^2 + (\Gamma/2)^2}"
            annotation="Single-level Breit-Wigner formula. E_r = resonance energy; Γ = total width = Γ_n + Γ_γ + Γ_f + ...; Γ_n = neutron partial width; Γ_x = partial width for channel x (capture, fission, etc.); g = (2J+1)/[2(2I+1)] is the statistical spin factor; λ̄ = ℏ/p = reduced de Broglie wavelength of the neutron."
            label="Single-Level Breit-Wigner Formula"
          />

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The resonance widths Γ are typically 0.01–100 eV for low-lying
            levels. The peak cross-section on resonance is σ_peak = 4πλ̄²g (Γ_n
            Γ_x)/Γ², which can be thousands of barns. Far from resonance, σ
            falls off as a Lorentzian (∝ 1/(E−E_r)²).
          </p>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Doppler Broadening — The Critical Safety Feature
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            In a real reactor, fuel atoms are not stationary — they vibrate
            thermally at ~900 K. The relative velocity distribution between
            neutron and nucleus broadens each resonance peak. This is{" "}
            <em>Doppler broadening</em>: the resonance shape transforms from a
            Breit-Wigner Lorentzian to a Voigt profile (convolution with a
            Gaussian Maxwell-Boltzmann distribution).
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The{" "}
            <strong className="text-foreground">
              Doppler coefficient of reactivity
            </strong>{" "}
            (α_D) describes the feedback: as fuel temperature rises → resonances
            broaden → more neutrons are absorbed in U-238 resonances (especially
            at 6.67 eV) → fewer neutrons cause fission → reactor power drops.
            This negative temperature feedback is a fundamental passive safety
            mechanism in all thermal reactors — it is not an engineered system
            but a direct nuclear physics consequence.
          </p>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-1">
              Why Doppler Broadening Matters for Safety
            </div>
            <p className="text-muted-foreground">
              A power excursion that heats fuel by 100 K broadens the U-238
              capture resonances enough to increase the resonance absorption
              integral by ~3–5%, reducing k_eff by ~0.003–0.005. This happens
              within milliseconds — far faster than any mechanical safety system
              can respond. The Chernobyl accident was partly exacerbated by a
              positive void coefficient that overpowered the (normally negative)
              Doppler feedback; modern reactor designs require strongly negative
              Doppler coefficients by regulation.
            </p>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Resonance Regions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
            {[
              [
                "Resolved Resonance Region (RRR)",
                "E < ~1 keV (actinides)",
                "Individual resonances distinguishable and measured; Breit-Wigner parameters tabulated in ENDF/B file MF2/MT151",
              ],
              [
                "Unresolved Resonance Region (URR)",
                "~1–100 keV",
                "Resonances overlap; statistical average cross-sections used; probability tables in ENDF/B MF2/MT153",
              ],
              [
                "Smooth Region (Continuum)",
                ">100 keV",
                "Resonances unresolvable; cross-sections smooth and decreasing; Hauser-Feshbach statistical model",
              ],
            ].map(([title, energy, desc]) => (
              <div
                key={title}
                className="rounded-lg bg-muted/30 border border-border p-3"
              >
                <div className="font-semibold text-foreground text-sm mb-1">
                  {title}
                </div>
                <div className="text-xs font-mono text-primary mb-2">
                  {energy}
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* ── Energy Regions ── */}
        <CollapsibleSection
          title="Energy Regions of Neutron Cross-Sections"
          badge="intermediate"
          ocid="cross_sections.energy_regions_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Neutron energies in a reactor span 12 orders of magnitude — from
            10⁻⁵ eV cold neutrons to 20 MeV prompt fission neutrons. The
            cross-section landscape looks entirely different across this range,
            governing whether a reactor is thermal or fast.
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                label: "a",
                title: "Thermal Region (E < 1 eV)",
                badge: "1/v law dominates",
                color: "bg-blue-500/10 border-blue-500/20",
                badgeColor: "text-blue-400",
                desc: "Smooth, well-behaved cross-sections following the 1/v law. U-235 σ_f = 584 b at 0.025 eV. This is the operating regime for light water reactors (LWRs), CANDU, and HTGR reactors.",
                facts: [
                  "U-235 σ_f = 584 b",
                  "Pu-239 σ_f = 748 b",
                  "U-233 σ_f = 530 b",
                ],
              },
              {
                label: "b",
                title: "Resolved Resonance Region (1 eV → ~10 keV)",
                badge: "Sharp resonance peaks",
                color: "bg-orange-500/10 border-orange-500/20",
                badgeColor: "text-orange-400",
                desc: "For heavy actinides: thousands of narrow Breit-Wigner resonances. U-238 has ~100,000 resolved resonances below 20 keV; each must be individually measured and stored. Slowing-down neutrons pass through this region; the resonance escape probability p describes how many survive without capture.",
                facts: [
                  "U-238: first resonance at 6.67 eV, σ_γ peak ~25,000 b",
                  "U-235: first resonance at 1.14 eV",
                  "Pu-240: large resonance at 1.056 eV (major heat source in MOX fuel)",
                ],
              },
              {
                label: "c",
                title: "Fast / High-Energy Region (>100 keV)",
                badge: "Smooth, low cross-sections",
                color: "bg-rose-500/10 border-rose-500/20",
                badgeColor: "text-rose-400",
                desc: "Cross-sections fall dramatically — barns to millibarns. Fission is still possible but requires much higher enrichment or plutonium fuel. The domain of fast breeder reactors (FBRs), sodium-cooled fast reactors (SFRs), and lead-cooled fast reactors (LFRs).",
                facts: [
                  "U-235 σ_f(1 MeV) ≈ 1.24 b",
                  "Pu-239 σ_f(1 MeV) ≈ 1.80 b",
                  "U-238 σ_f threshold at ~1 MeV",
                ],
              },
            ].map(({ label, title, badge, color, badgeColor, desc, facts }) => (
              <div key={label} className={`rounded-lg border ${color} p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {label}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm">
                    {title}
                  </h3>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${badgeColor}`}
                  >
                    {badge}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {desc}
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  {facts.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-muted-foreground font-mono"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Thermal vs. Fast Spectrum: σ_f Comparison
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Thermal σ_f (b)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Fast ~1 MeV σ_f (b)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Thermal/Fast Ratio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {fastSpectrumRows.map(([nuc, thermal, fast, ratio]) => (
                  <tr key={nuc} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground">
                      {nuc}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {thermal}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {fast}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                      {ratio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic mb-5">
            Source: ENDF/B-VIII.0, NNDC/BNL.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
              <div className="font-semibold text-foreground mb-2">
                Why Thermal Reactors Use Moderators
              </div>
              <p className="text-muted-foreground text-sm">
                Slowing neutrons from ~2 MeV (birth energy) to ~0.025 eV
                increases U-235 σ_f by ~470×. Moderators (H₂O, D₂O, graphite)
                accomplish this through elastic scattering collisions. A neutron
                loses the most energy per collision when the target mass equals
                its own — hence hydrogen (A=1) is the most effective moderator
                per unit mass, reaching thermal energy in ~18–25 collisions.
              </p>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
              <div className="font-semibold text-foreground mb-2">
                Why Fast Reactors Work Differently
              </div>
              <p className="text-muted-foreground text-sm">
                With σ_f ~1 b vs. 584 b, fast reactors need far more fissile
                material (&gt;15% enrichment or Pu fuel). But they gain a
                crucial advantage: η (neutrons per fission) is higher in the
                fast spectrum for Pu-239 (~3.0 vs. ~2.1 thermal), enabling
                breeding — producing more fissile material (Pu-239 from U-238)
                than is consumed. This is the basis for breeder reactor
                technology.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* ── ENDF/B ── */}
        <CollapsibleSection
          title="The ENDF/B Nuclear Data Library"
          badge="intermediate"
          ocid="cross_sections.endf_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Every neutron transport simulation — from reactor design to
            radiation shielding to nuclear medicine dose calculations — depends
            on evaluated nuclear data libraries. These are exhaustive
            compilations of cross-sections, angular distributions, fission
            yields, decay data, and more, produced by teams of nuclear data
            evaluators who combine experimental measurements with nuclear theory
            calculations.
          </p>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              ENDF/B-VIII.0 at a Glance
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["~380", "Materials covered"],
                ["20 MeV", "Max neutron energy"],
                ["~1 million", "Data points for U-235"],
                ["12 decades", "Energy range (10⁻⁵ eV to 20 MeV)"],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-lg font-bold font-mono text-primary">
                    {val}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Major Nuclear Data Libraries
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Library
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Region
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Maintainer
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {endfLibraryRows.map(([lib, region, org, notes]) => (
                  <tr key={lib} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-foreground font-semibold text-xs">
                      {lib}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {region}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">
                      {org}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            File Structure and Formats
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              [
                "ENDF-6 Format",
                "ASCII text format with MF (file) and MT (reaction) section identifiers. MF3/MT18 = fission cross-section. Used for library distribution.",
              ],
              [
                "ACE Format",
                "A Compact ENDF — binary format optimized for Monte Carlo transport codes (MCNP, OpenMC, Serpent2). Contains continuous-energy cross-section tables.",
              ],
              [
                "NJOY Processing",
                "NJOY2016 code converts ENDF-6 → ACE, applying Doppler broadening, thermal scattering corrections, and probability tables at specified temperatures.",
              ],
              [
                "MATXS/GENDF Formats",
                "Multigroup formats for deterministic codes (SCALE, CASMO, SIMULATE). Energy-averaged over predefined group structures (e.g., 252-group VITAMIN-B7).",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-lg bg-muted/30 border border-border p-3"
              >
                <div className="font-semibold text-foreground text-sm mb-1">
                  {title}
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Transport Codes Using ENDF/B
          </h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              ["MCNP6", "Monte Carlo, Los Alamos"],
              ["OpenMC", "Open-source Monte Carlo, MIT/ANL"],
              ["Serpent2", "Monte Carlo, VTT Finland"],
              ["SCALE 6.3", "Deterministic + MC, ORNL"],
              ["CASMO-5", "Lattice physics, Studsvik"],
              ["SIMULATE-3", "Core simulator, Studsvik"],
            ].map(([code, desc]) => (
              <div
                key={code}
                className="rounded-lg bg-muted/30 border border-border px-3 py-2 text-xs"
              >
                <span className="font-mono font-bold text-primary">{code}</span>
                <span className="text-muted-foreground ml-1">— {desc}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Accessing Nuclear Data
            </div>
            <div className="space-y-1 text-muted-foreground text-xs">
              <div>
                <strong className="text-foreground">NNDC (nndc.bnl.gov)</strong>{" "}
                — ENSDF, ENDF/B, NuDat3 web interface
              </div>
              <div>
                <strong className="text-foreground">
                  IAEA-NDS (nds.iaea.org)
                </strong>{" "}
                — EXFOR (~25,000 experimental datasets), IAEA libraries
              </div>
              <div>
                <strong className="text-foreground">
                  JANIS (oecd-nea.org/janisweb)
                </strong>{" "}
                — NEA/OECD browser for cross-section comparison across libraries
              </div>
              <div>
                <strong className="text-foreground">EXFOR</strong> —
                Experimental reactions database: raw experimental measurements
                before evaluation
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* ── Reactor Design ── */}
        <CollapsibleSection
          title="Cross-Sections in Reactor Design"
          badge="advanced"
          ocid="cross_sections.reactor_design_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Reactor physics bridges microscopic nuclear data (individual nuclide
            cross-sections in barns) to macroscopic engineering quantities that
            govern criticality, flux distributions, and power generation. The
            key is the transition from microscopic to macroscopic
            cross-sections.
          </p>

          <EquationBlock
            latex="\Sigma = n\,\sigma \quad [\text{cm}^{-1}]"
            annotation="Macroscopic cross-section Σ [cm⁻¹]: the product of atom number density n [atoms/cm³] and microscopic cross-section σ [cm²]. Σ represents the probability per unit path length of interaction. The mean free path λ = 1/Σ."
            label="Macroscopic Cross-Section"
          />

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            For a mixture of nuclides (as in any real reactor material),
            macroscopic cross-sections add: Σ_total = Σᵢ nᵢσᵢ. This applies
            separately for each reaction type (scattering, absorption, etc.).
          </p>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-3">
              Worked Example: Water (H₂O) at Room Temperature, Thermal Neutrons
            </div>
            <div className="space-y-1 text-muted-foreground font-mono text-xs">
              <div className="text-muted-foreground/60 mb-2">
                # Atom densities from ρ = 1.0 g/cm³, M(H₂O) = 18 g/mol
              </div>
              <div>
                n_H = 2 × (6.022×10²³ / 18) × 1.0 ={" "}
                <strong className="text-foreground">
                  6.69 × 10²² H atoms/cm³
                </strong>
              </div>
              <div>
                n_O = (6.022×10²³ / 18) × 1.0 ={" "}
                <strong className="text-foreground">
                  3.34 × 10²² O atoms/cm³
                </strong>
              </div>
              <div className="border-t border-border pt-1 mt-2 mb-1 text-muted-foreground/60">
                # Macroscopic cross-sections
              </div>
              <div>
                Σ_s(H) = 6.69×10²² × 82×10⁻²⁴ cm² ={" "}
                <strong className="text-foreground">5.49 cm⁻¹</strong>
              </div>
              <div>
                Σ_a(H) = 6.69×10²² × 0.332×10⁻²⁴ ={" "}
                <strong className="text-foreground">0.022 cm⁻¹</strong>
              </div>
              <div>
                Σ_s(O) = 3.34×10²² × 3.76×10⁻²⁴ ={" "}
                <strong className="text-foreground">0.126 cm⁻¹</strong>
              </div>
              <div className="border-t border-border pt-1 mt-2 mb-1 text-muted-foreground/60">
                # Mean free paths
              </div>
              <div>
                λ_s = 1 / (5.49 + 0.126) ≈{" "}
                <strong className="text-foreground">0.178 cm</strong> for
                scattering
              </div>
              <div>
                λ_a = 1 / 0.022 ≈{" "}
                <strong className="text-foreground">45 cm</strong> for
                absorption
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            The Four-Factor Formula
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            For an infinite homogeneous reactor (no neutron leakage), the
            neutron multiplication factor k_∞ — the ratio of neutrons in one
            generation to the previous — is given by the four-factor formula,
            where each factor directly involves cross-section ratios:
          </p>

          <EquationBlock
            latex="k_\infty = \eta \cdot f \cdot p \cdot \varepsilon"
            annotation="k_∞ = neutron reproduction factor (avg. fission neutrons per thermal absorption in fuel) × thermal utilization (fraction of thermal absorption in fuel) × resonance escape probability (fraction escaping resonance capture while slowing down) × fast fission factor (extra neutrons from fast fission of U-238)."
            label="Four-Factor Formula"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {[
              {
                sym: "η (eta)",
                name: "Neutron Reproduction Factor",
                def: "η = ν σ_f / (σ_f + σ_γ) = ν / (1 + α)",
                desc: "Average fission neutrons per neutron absorbed in fuel. For U-235 at thermal: ν=2.42, α=0.169, η = 2.42/1.169 ≈ 2.07.",
              },
              {
                sym: "f",
                name: "Thermal Utilization",
                def: "f = Σ_a(fuel) / Σ_a(total)",
                desc: "Fraction of thermal neutron absorptions that occur in fuel (vs. moderator, cladding, coolant, poisons). Maximized by fuel-to-moderator ratio optimization.",
              },
              {
                sym: "p",
                name: "Resonance Escape Probability",
                def: "p = exp(−N_U I_eff / ξ Σ_s)",
                desc: "Fraction of fast neutrons that slow down past the resonance region without capture. Depends on U-238 resonance integral (~277 b effective), moderation ratio, and fuel lump geometry (self-shielding).",
              },
              {
                sym: "ε (epsilon)",
                name: "Fast Fission Factor",
                def: "ε = 1 + τ P_f N_U σ_f,fast / (Σ_a fuel)",
                desc: "Accounts for fast fissions in U-238 (threshold ~1 MeV) before thermalization. Typically ε ≈ 1.03–1.07 in LWRs.",
              },
            ].map(({ sym, name, def, desc }) => (
              <div
                key={sym}
                className="rounded-lg bg-muted/30 border border-border p-4 text-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-mono text-primary font-bold">
                    {sym}
                  </code>
                  <span className="font-semibold text-foreground text-sm">
                    {name}
                  </span>
                </div>
                <code className="text-xs font-mono text-muted-foreground block mb-2">
                  {def}
                </code>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5 text-sm">
            <div className="font-semibold text-foreground mb-2">
              Typical LWR Values at Beginning-of-Life (BOL)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["η ≈ 2.07", "3.5% enriched U-235"],
                ["f ≈ 0.71", "Water moderator"],
                ["p ≈ 0.87", "Resonance capture in U-238"],
                ["ε ≈ 1.05", "U-238 fast fissions"],
              ].map(([val, label]) => (
                <div key={val} className="text-center">
                  <div className="text-base font-bold font-mono text-primary">
                    {val}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-3 pt-3 text-center">
              <span className="text-foreground font-mono font-semibold">
                k_∞ = 2.07 × 0.71 × 0.87 × 1.05 ≈ 1.34
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                (excess reactivity for burnup margin; controlled by absorbers)
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm">
            <strong className="text-foreground block mb-1">
              From k_∞ to k_eff: Leakage and Criticality
            </strong>
            <p className="text-muted-foreground">
              A real finite reactor also loses neutrons by leakage: k_eff = k_∞
              × P_NL, where P_NL is the non-leakage probability. At criticality,
              k_eff = 1.000 exactly. The excess reactivity (ρ = (k_eff −
              1)/k_eff) is controlled by control rods (B-4C, Ag-In-Cd), soluble
              boron (in PWRs), or burnable absorbers (Gd, Er in fuel pellets) —
              all chosen for their high absorption cross-sections at thermal
              energies.
            </p>
          </div>
        </CollapsibleSection>

        {/* ── Citations ── */}
        <SectionCard data-ocid="cross_sections.references_card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            References &amp; Further Reading
          </h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            {[
              {
                id: "brown2018",
                text: "D.A. Brown et al. (2018). ENDF/B-VIII.0: The 8th Major Release of the Nuclear Reaction Data Library. Nuclear Data Sheets 148, 1–142. doi:10.1016/j.nds.2018.02.001",
              },
              {
                id: "lamarsh2001",
                text: "J.R. Lamarsh & A.J. Baratta (2001). Introduction to Nuclear Engineering, 3rd ed. Prentice Hall. Chapters 3–4.",
              },
              {
                id: "krane1988",
                text: "K.S. Krane (1988). Introductory Nuclear Physics. Wiley. Chapter 11.",
              },
              {
                id: "duderstadt1976",
                text: "J.J. Duderstadt & L.J. Hamilton (1976). Nuclear Reactor Analysis. Wiley. Chapter 2.",
              },
              {
                id: "exfor2024",
                text: "IAEA-NDS. EXFOR — Experimental Nuclear Reaction Data. https://nds.iaea.org/exfor/ (Accessed 2024).",
              },
              {
                id: "nndc2024",
                text: "NNDC/BNL. Chart of Nuclides. https://www.nndc.bnl.gov/nudat3/ (Accessed 2024).",
              },
              {
                id: "bell1970",
                text: "G.I. Bell & S. Glasstone (1970). Nuclear Reactor Theory. Van Nostrand Reinhold. Chapter 1.",
              },
            ].map(({ id, text }) => (
              <li key={id} className="leading-relaxed">
                {text}
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>
    </div>
  );
}
