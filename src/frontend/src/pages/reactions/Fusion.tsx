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

export default function FusionPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Nuclear Fusion"
        subtitle="The energy source of stars — combining light nuclei to release enormous amounts of energy. The long-sought goal of fusion energy research."
        audienceLevel="intermediate"
        readTimeMin={35}
      />

      <div className="grid gap-6">
        {/* ── Existing Intro ── */}
        <SectionCard data-ocid="fusion.intro_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            How Fusion Works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Fusion occurs when two light nuclei come close enough for the strong
            nuclear force to bind them together. The challenge is overcoming the{" "}
            <em>Coulomb barrier</em> — the electrostatic repulsion between their
            positive charges. In stars, extreme gravitational pressure and
            temperatures exceeding 10 million Kelvin achieve this. On Earth,
            magnetic confinement (tokamaks) and inertial confinement (lasers)
            are the leading approaches.
          </p>
        </SectionCard>

        {/* ── Existing D-T Reaction ── */}
        <SectionCard data-ocid="fusion.dt_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            The D-T Reaction
          </h2>
          <p className="text-muted-foreground mb-4">
            The most favorable fusion reaction for terrestrial energy
            production:
          </p>
          <EquationBlock
            latex="^2_1\\text{D} + ^3_1\\text{T} \\rightarrow ^4_2\\text{He} + n + 17.6\\text{ MeV}"
            annotation="Deuterium (D) plus Tritium (T) fuse to produce a helium-4 nucleus and a neutron, releasing 17.6 MeV. About 80% of the energy goes to the neutron."
            label="D-T Fusion Reaction"
          />
          <p className="text-sm text-muted-foreground">
            Deuterium is abundant in seawater (~33 g/m³). Tritium must be bred
            from lithium-6 using the fusion neutrons themselves — making the
            fuel cycle effectively inexhaustible if achieved.
          </p>
        </SectionCard>

        {/* ── Existing p-p Chain ── */}
        <SectionCard data-ocid="fusion.pp_chain_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            The Proton-Proton Chain (Stars)
          </h2>
          <EquationBlock
            latex="4 ^1_1\\text{H} \\rightarrow ^4_2\\text{He} + 2e^+ + 2\\nu_e + 26.7\\text{ MeV}"
            annotation="The net result of the proton-proton chain: four hydrogen nuclei fuse to form one helium-4, releasing two positrons, two neutrinos, and 26.7 MeV of energy. This powers the Sun."
            label="Net p-p Chain"
          />
        </SectionCard>

        {/* ── Existing Status Card ── */}
        <SectionCard glowAccent data-ocid="fusion.status_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Current Status of Fusion Energy
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary mt-0.5 shrink-0">▸</span>
              <span>
                <strong className="text-foreground">ITER (France):</strong>{" "}
                International tokamak under construction; designed to produce
                500 MW from 50 MW input (Q = 10). First plasma targeted for late
                2020s.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5 shrink-0">▸</span>
              <span>
                <strong className="text-foreground">NIF (USA):</strong> In
                December 2022, the National Ignition Facility achieved ignition
                for the first time — producing more energy from fusion than the
                laser energy delivered to the target (Q &gt; 1).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5 shrink-0">▸</span>
              <span>
                <strong className="text-foreground">Private ventures:</strong>{" "}
                Companies like Commonwealth Fusion Systems (SPARC tokamak) and
                TAE Technologies are pursuing compact, high-temperature
                superconducting magnet approaches targeting 2030s commercial
                plants.
              </span>
            </li>
          </ul>
        </SectionCard>

        {/* ── SECTION 1: Fusion Fuel Cycles ── */}
        <CollapsibleSection
          title="Fusion Fuel Cycles: D-T, D-D, and Beyond"
          badge="intermediate"
          ocid="fusion.fuel_cycles_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Different fusion fuel combinations offer radically different energy
            yields, optimal plasma temperatures, neutron production rates, and
            fuel availability. First-generation reactors will almost certainly
            use D-T; future generations may exploit aneutronic fuels to
            eliminate neutron activation of structural materials entirely.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Deuterium-Tritium (D-T)
          </h3>
          <EquationBlock
            latex="^2_1\\text{H} + ^3_1\\text{H} \\rightarrow ^4_2\\text{He}\\,(3.52\\text{ MeV}) + n\\,(14.06\\text{ MeV}),\\quad Q = 17.59\\text{ MeV}"
            annotation="The D-T reaction has the highest fusion cross-section of any fuel pair — peaking at approximately 5 barns at 64 keV (centre-of-mass). 80% of the released energy goes to the neutron, 20% to the helium-4 nucleus (alpha particle) which directly heats the plasma."
            label="D-T Reaction"
          />
          <div className="rounded-lg bg-muted/20 border border-border p-4 mb-5 text-sm text-muted-foreground">
            <strong className="text-foreground block mb-1">
              Tritium Breeding Blanket
            </strong>
            Tritium (T½ = 12.32 yr) does not occur naturally in useful
            quantities. It must be bred inside the reactor blanket by
            irradiating lithium-6 with the fusion neutrons:
            <div className="mt-2 font-mono text-xs bg-muted/40 rounded px-2 py-1 inline-block">
              ⁶Li + n → ⁴He + ³H + 4.78 MeV
            </div>
            <span className="block mt-2">
              Natural lithium is 7.59% Li-6 and 92.41% Li-7; blankets use
              enriched Li-6. Each fusion neutron breeds approximately one
              tritium atom — a breeding ratio (TBR) of at least 1.05 is required
              to account for losses and provide startup inventory for future
              reactors.
            </span>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Deuterium-Deuterium (D-D)
          </h3>
          <EquationBlock
            latex="^2_1\\text{H} + ^2_1\\text{H} \\rightarrow \\begin{cases} ^3_1\\text{H}\\,(1.01\\text{ MeV}) + p\\,(3.02\\text{ MeV}), & Q = 4.03\\text{ MeV} \\;(50\\%) \\\\ ^3_2\\text{He}\\,(0.82\\text{ MeV}) + n\\,(2.45\\text{ MeV}), & Q = 3.27\\text{ MeV}\\;(50\\%) \\end{cases}"
            annotation="D-D reactions occur with roughly equal probability in each branch. The cross-section peaks at much higher temperatures (~400 keV) than D-T and at a much lower maximum (~0.1 barns). However, deuterium alone is the fuel — no tritium breeding required."
            label="D-D Reactions (two branches)"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            The appeal of D-D: deuterium occurs in seawater at 33 mg/L
            (essentially unlimited), eliminating tritium breeding complexity.
            The penalty is a much lower fusion rate at any achievable
            temperature — the D-D cross-section at 100 keV is roughly 100× less
            than D-T's peak. Both branches produce tritium or He-3 as
            secondaries, which then react further (catalysed D-D cycle),
            improving overall yield in a sufficiently large plasma.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Deuterium–Helium-3 (D-³He)
          </h3>
          <EquationBlock
            latex="^2_1\\text{H} + ^3_2\\text{He} \\rightarrow ^4_2\\text{He}\\,(3.67\\text{ MeV}) + p\\,(14.67\\text{ MeV}),\\quad Q = 18.35\\text{ MeV}"
            annotation="D-³He is nearly aneutronic: all primary reaction products are charged particles. The high-energy proton (14.67 MeV) and alpha particle can potentially be converted directly to electricity via direct energy conversion, bypassing the thermal cycle and achieving much higher efficiency."
            label="D-³He Reaction (nearly aneutronic)"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            The primary advantage is the absence of primary neutrons —
            eliminating neutron activation of structural materials and
            dramatically simplifying radiation shielding. The critical problem
            is <strong className="text-foreground">He-3 scarcity</strong>: only
            ~15 kg exists in the US strategic stockpile, mostly a byproduct of
            tritium decay. Lunar regolith contains He-3 implanted by the solar
            wind at ~10–20 ppb by mass — estimated reserves of ~1 million
            tonnes, representing a long-term potential source.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Proton–Boron-11 (p-¹¹B)
          </h3>
          <EquationBlock
            latex="p + ^{11}_{5}\\text{B} \\rightarrow 3\\,^4_2\\text{He},\\quad Q = 8.68\\text{ MeV}"
            annotation="p-B11 is fully aneutronic — three alpha particles carry all the energy as charged particles. This makes direct energy conversion theoretically possible with ~90% efficiency. However, the cross-section peaks only at plasma temperatures above 300 keV (~3.5 billion °C), far beyond the reach of current technology."
            label="p-B11 Reaction (fully aneutronic)"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Both fuels are abundant (hydrogen, boron-11 constitutes 80.1% of
            natural boron), and the zero-neutron output eliminates all
            activation concerns. The challenge is purely plasma physics: the
            ignition temperature exceeds current achievable limits by roughly
            5–15×, and bremsstrahlung (X-ray) radiation losses from the hot
            electrons may exceed fusion power at the required temperatures
            unless very high plasma β (beta) is sustained. TAE Technologies is
            the primary company pursuing p-B11 as a long-term target.
          </p>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Fusion Fuel Comparison
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Reaction
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Q (MeV)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Peak σ (barns)
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    T_optimal (keV)
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-foreground">
                    Neutrons?
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Fuel Availability
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "D-T",
                    "17.59",
                    "~5",
                    "~65",
                    "Yes (80%)",
                    "D: unlimited; T: bred from Li",
                  ],
                  ["D-D (→T+p)", "4.03", "~0.1", "~400", "No", "D: unlimited"],
                  [
                    "D-D (→³He+n)",
                    "3.27",
                    "~0.1",
                    "~400",
                    "Yes (50%)",
                    "D: unlimited",
                  ],
                  [
                    "D-³He",
                    "18.35",
                    "~0.7",
                    "~250",
                    "Trace only",
                    "D: unlimited; He-3: very scarce",
                  ],
                  [
                    "p-¹¹B",
                    "8.68",
                    "~0.3",
                    ">300",
                    "None",
                    "Both abundant; T too high",
                  ],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-mono text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[2]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[3]}
                    </td>
                    <td className="px-4 py-2 text-center text-muted-foreground">
                      {row[4]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[5]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Sources: Glasstone &amp; Lovberg,{" "}
            <em>Controlled Thermonuclear Reactions</em> (1960);
            IAEA-TECDOC-1557; Bosch &amp; Hale, <em>Nucl. Fusion</em> 32 (1992)
            611.
          </p>
        </CollapsibleSection>

        {/* ── SECTION 2: Lawson Criterion and Triple Product ── */}
        <CollapsibleSection
          title="The Lawson Criterion and Triple Product"
          badge="advanced"
          ocid="fusion.lawson_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            For a fusion plasma to produce more energy than is required to heat
            and maintain it, three parameters must simultaneously exceed
            critical thresholds. John D. Lawson (1957) showed that the product
            of plasma density, temperature, and energy confinement time — the{" "}
            <em>triple product</em> — is the fundamental figure of merit for any
            fusion device.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                label: "Density n",
                value: "~10²⁰ m⁻³",
                sub: "~10¹⁴ cm⁻³ (1/1000 of air)",
              },
              {
                label: "Temperature T",
                value: "10–20 keV",
                sub: "100–200 million °C",
              },
              {
                label: "Confinement τ_E",
                value: "≥ 3 s",
                sub: "energy e-folding time",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {item.label}
                </div>
                <div className="font-mono text-lg font-bold text-primary">
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          <EquationBlock
            latex="n T \\tau_E \\geq 3 \\times 10^{21}\\;\\text{keV·s·m}^{-3}"
            annotation="The Lawson triple product for D-T ignition. All three factors are required simultaneously. At T ≈ 10–20 keV (the optimum temperature range for D-T), the minimum triple product is easiest to achieve. Tokamaks such as ITER aim at nTτ_E ≈ 5 × 10²¹ keV·s/m³."
            label="Lawson Criterion (D-T ignition)"
          />

          <h3 className="font-semibold text-foreground text-base mb-3 mt-6">
            The Q-Factor and Energy Gain
          </h3>
          <EquationBlock
            latex="Q = \\frac{P_{\\text{fusion}}}{P_{\\text{heating}}}"
            annotation="The plasma Q-factor (energy amplification) is the ratio of fusion power produced to external heating power supplied. Note: Q is defined here as plasma Q (laser energy on target for ICF; heating power to plasma for MCF). The 'wall-plug Q' accounting for driver efficiency is much lower."
            label="Q-Factor (Plasma Gain)"
          />
          <div className="space-y-3 mb-5 text-sm text-muted-foreground">
            {[
              {
                q: "Q = 1",
                label: "Scientific breakeven",
                desc: "Fusion power equals external heating power. A necessary but insufficient step toward a power plant.",
              },
              {
                q: "Q > 1",
                label: "Net plasma gain",
                desc: "Fusion produces more power than is injected. NIF achieved Q ≈ 1.54 in December 2022.",
              },
              {
                q: "Q ≥ 10",
                label: "ITER design goal",
                desc: "500 MW fusion from 50 MW heating. Required to demonstrate viability at power-plant scale.",
              },
              {
                q: "Q → ∞",
                label: "Ignition",
                desc: "Plasma self-heats entirely via alpha-particle deposition. No external heating required. The Holy Grail.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="flex gap-3 items-start rounded-lg bg-muted/20 border border-border p-3"
              >
                <span className="font-mono text-primary font-bold shrink-0 w-16">
                  {item.q}
                </span>
                <div>
                  <strong className="text-foreground">{item.label}:</strong>{" "}
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
            Key Experimental Milestones
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Device / Year
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Fusion Output
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Input Energy
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Plasma Q
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Significance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "JET (UK) 1997",
                    "16.1 MJ",
                    "~25 MJ input",
                    "~0.65",
                    "MCF record for 20 years",
                  ],
                  [
                    "JET (UK) Feb 2022",
                    "59 MJ",
                    "~300 MJ (total)",
                    "~0.2 (plasma)",
                    "New MCF energy record; validated ITER scenarios",
                  ],
                  [
                    "NIF (USA) Aug 2021",
                    "1.37 MJ",
                    "1.35 MJ (laser)",
                    "~1.01",
                    "First 'near-ignition' ICF shot",
                  ],
                  [
                    "NIF (USA) Dec 2022",
                    "3.15 MJ",
                    "2.05 MJ (laser)",
                    "~1.54",
                    "First Q>1 in history — scientific ignition achieved",
                  ],
                  [
                    "ITER (design)",
                    "500 MW",
                    "50 MW",
                    "10",
                    "Design goal; D-T operations ~2035",
                  ],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[2]}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-primary">
                      {row[3]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground">
            <strong className="text-foreground block mb-1">
              Wall-Plug Q vs. Plasma Q
            </strong>
            NIF's plasma Q ≈ 1.54 is a physics milestone. However, the NIF laser
            converts wall-plug electricity to UV light at only ~1% efficiency.
            Wall-plug Q = 3.15 MJ / (2.05 MJ / 0.01) ≈ 0.015. A commercial ICF
            power plant would need plasma Q ≈ 100–200 to compensate for driver
            inefficiency and thermal conversion losses. Current diode-pumped
            laser technology aims at ~20% driver efficiency, which would reduce
            the required plasma Q to ~15–30.
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Sources: Lawson, J.D. (1957) <em>Proc. Phys. Soc. B</em> 70 6;
            Abu-Shawareb et al. (2022) <em>Phys. Rev. Lett.</em> 129, 075001;
            Zylstra et al. (2022) <em>Nature</em> 601, 542.
          </p>
        </CollapsibleSection>

        {/* ── SECTION 3: Magnetic Confinement / Tokamak ── */}
        <CollapsibleSection
          title="Magnetic Confinement: The Tokamak Principle"
          badge="advanced"
          ocid="fusion.magnetic_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            A plasma at 100–300 million °C cannot contact any material wall — it
            would immediately cool and be extinguished. Magnetic confinement
            exploits the Lorentz force: charged particles in a magnetic field
            spiral around field lines and cannot easily cross them, effectively
            suspending the hot plasma in a magnetic bottle far from any solid
            surface.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            The Lorentz Force Confinement Principle
          </h3>
          <EquationBlock
            latex="\\mathbf{F} = q(\\mathbf{v} \\times \\mathbf{B})"
            annotation="A charged particle (charge q, velocity v) in magnetic field B experiences a force perpendicular to both its velocity and the field. This causes the particle to spiral around the field line with a gyroradius r_L = mv⊥ / (qB). In a strong field (B ≈ 5–12 T), even high-energy alpha particles are well-confined."
            label="Lorentz Force (magnetic confinement)"
          />

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            Tokamak Geometry
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            A tokamak is a toroidal (donut-shaped) vessel. Two superimposed
            magnetic field components together create <em>helical</em> field
            lines that wind around the torus, preventing the particle drifts
            that would otherwise cause the plasma to leak outward:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Toroidal Field B_T
              </div>
              <div className="text-sm text-foreground font-medium mb-1">
                External coils around the torus
              </div>
              <div className="text-xs text-muted-foreground">
                Produced by large superconducting coils. In ITER: B_T = 5.3 T
                (11.8 T at inner coil face). This is the dominant confining
                field.
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Poloidal Field B_P
              </div>
              <div className="text-sm text-foreground font-medium mb-1">
                Induced by plasma current
              </div>
              <div className="text-xs text-muted-foreground">
                A large current (15 MA in ITER) is driven through the plasma by
                transformer action. This current creates its own magnetic field
                that twists the field lines helically.
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Stability Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Safety Factor q
              </div>
              <div className="font-mono text-sm text-foreground mb-1">
                q = r·B_T / (R·B_P)
              </div>
              <div className="text-xs text-muted-foreground">
                The number of toroidal turns a field line makes per poloidal
                turn. q must exceed 1 everywhere to prevent the{" "}
                <em>kink instability</em>
                (Kruskal-Shafranov condition). In ITER: q at plasma edge ≈ 3.
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Plasma Beta β
              </div>
              <div className="font-mono text-sm text-foreground mb-1">
                β = P_plasma / (B²/2μ₀)
              </div>
              <div className="text-xs text-muted-foreground">
                Ratio of plasma kinetic pressure to magnetic pressure. Higher β
                means more efficient use of the magnetic field. Practical
                tokamaks operate at β ≈ 2–5%; above the Troyon limit, ballooning
                and tearing mode instabilities develop.
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            ITER Specifications
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {[
                  ["Location", "Cadarache, Saint-Paul-lès-Durance, France"],
                  [
                    "Participating parties",
                    "35 nations: EU-27, UK, Switzerland, China, India, Japan, South Korea, Russia, USA",
                  ],
                  ["Major radius (R)", "6.2 m"],
                  ["Minor radius (a)", "2.0 m"],
                  ["Aspect ratio (R/a)", "3.1"],
                  ["Plasma volume", "840 m³"],
                  ["Toroidal field (on-axis)", "5.3 T"],
                  ["Peak field at coil", "11.8 T"],
                  [
                    "Magnet technology",
                    "Nb₃Sn (TF coils) + NbTi (PF coils) at 4 K (−269 °C)",
                  ],
                  ["Plasma current (I_p)", "15 MA"],
                  ["Additional heating", "50 MW (NBI + ICRF + ECRH)"],
                  ["Design fusion power", "500 MW"],
                  ["Q target", "≥ 10"],
                  ["Plasma duration (inductive)", "~400–600 s per pulse"],
                  ["First plasma (revised)", "~2026–2027"],
                  ["D-T operations (planned)", "~2035"],
                  ["Total construction cost", "~€20 billion (2023 estimate)"],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground w-1/3">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-5">
            Plasma Instabilities
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Magnetically confined plasmas are subject to numerous instabilities
            that can rapidly transport heat to the wall or trigger a{" "}
            <em>disruption</em> (sudden loss of confinement). Key instability
            types and their mitigations:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-5">
            {[
              {
                name: "Kink instability (m=1)",
                desc: "Occurs when q < 1. The plasma column bends laterally. Prevented by maintaining q > 1 at all radii.",
              },
              {
                name: "Ballooning modes",
                desc: "Pressure-driven instabilities on the outboard side. Limit maximum plasma pressure (β limit).",
              },
              {
                name: "Tearing modes / NTMs",
                desc: "Magnetic reconnection events that form helical islands, degrading confinement. Mitigated by electron cyclotron current drive (ECCD).",
              },
              {
                name: "Edge-Localised Modes (ELMs)",
                desc: "Periodic bursts of energy from the plasma edge. In ITER, unmitigated ELMs could erode the divertor. Controlled via pellet injection or resonant magnetic perturbations (RMPs).",
              },
              {
                name: "Disruptions",
                desc: "Sudden complete loss of plasma current. In ITER, a disruption could deposit ~300 MJ on the first wall in milliseconds. A disruption prediction and mitigation system (DPMS) is a critical safety component.",
              },
            ].map((item) => (
              <li key={item.name} className="flex gap-2">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">{item.name}:</strong>{" "}
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            Alternative Confinement Concepts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                name: "Stellarator (W7-X)",
                desc: "No plasma current — all field shaping done by complex non-planar external coils. Inherently steady-state and disruption-free. Wendelstein 7-X (Greifswald, Germany): major radius 5.5 m, B up to 3 T, world's largest optimised stellarator.",
              },
              {
                name: "Reversed Field Pinch (RFP)",
                desc: "Toroidal field reverses direction at the plasma edge. Confines plasma with weaker external fields. Less developed than tokamak; active research by RFX-mod (Italy) and MST (Wisconsin).",
              },
              {
                name: "Spherical Tokamak",
                desc: "Very low aspect ratio (R/a ≈ 1.2–1.8) — closer to a sphere than a donut. Higher β achievable; more compact. MAST-U (Culham) and ST40 (Tokamak Energy) are leading examples.",
              },
              {
                name: "Field-Reversed Configuration (FRC)",
                desc: "Compact, high-β plasma held by its own internal magnetic field with no toroidal coils. Pursued by TAE Technologies and Helion Energy for potentially simpler reactor geometry.",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="rounded-lg bg-muted/30 border border-border p-4"
              >
                <div className="font-semibold text-foreground text-sm mb-1">
                  {v.name}
                </div>
                <div className="text-xs text-muted-foreground">{v.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* ── SECTION 4: Inertial Confinement Fusion / NIF ── */}
        <CollapsibleSection
          title="Inertial Confinement Fusion (ICF) and NIF"
          badge="advanced"
          ocid="fusion.icf_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Inertial confinement fusion (ICF) takes the opposite approach to
            magnetic confinement: instead of confining a dilute hot plasma for
            seconds, it compresses a tiny D-T fuel pellet so rapidly and
            violently that fusion reactions are completed before the plasma can
            expand — confined by its own inertia during the nanosecond burn. The
            energy driver is either a high-power laser or particle beam.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            The Implosion Sequence
          </h3>
          <div className="space-y-2 mb-5 text-sm text-muted-foreground">
            {[
              {
                step: "1. Irradiation",
                desc: "192 UV laser beams (or X-rays from hohlraum) strike the outer surface of a cryogenic D-T capsule ~2 mm in diameter simultaneously, with 1% spatial uniformity.",
              },
              {
                step: "2. Ablation",
                desc: "The outer shell ablates (rocket effect), driving an inward shock wave at velocities of ~300–400 km/s. The fuel is compressed from the outside in.",
              },
              {
                step: "3. Stagnation",
                desc: "The implosion stagnates at peak compression. Fuel density reaches ~300–1,000 g/cm³ (100× lead), a 30–35× linear compression from initial conditions.",
              },
              {
                step: "4. Hot Spot Ignition",
                desc: "A central hot spot of ~5–10 keV (50–100 million °C) forms. Alpha particles from D-T reactions deposit energy locally, raising the temperature further.",
              },
              {
                step: "5. Burn Propagation",
                desc: "The alpha heating wave propagates outward through the surrounding denser, cooler fuel — a 'bootstrap' process that continues without external energy input.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-3 rounded-lg bg-muted/20 border border-border p-3"
              >
                <span className="font-mono text-primary font-bold shrink-0">
                  {item.step}
                </span>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>

          <EquationBlock
            latex="P_{\\text{fusion}} = \\frac{1}{4}\\,n^2 \\langle\\sigma v\\rangle\\, Q_{\\text{DT}}"
            annotation="ICF power density scales with density squared — the fundamental advantage of implosion. At 1,000× liquid D-T density, fusion power density is 10⁶× higher than in an MCF plasma, allowing the brief inertial confinement time (~10 ns) to be sufficient."
            label="ICF Fusion Power Density"
          />

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            National Ignition Facility (NIF)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Laser Beams", value: "192", sub: "UV (351 nm / 3ω)" },
              {
                label: "Max UV Energy",
                value: "2.05 MJ",
                sub: "delivered to hohlraum",
              },
              {
                label: "Dec 2022 Yield",
                value: "3.15 MJ",
                sub: "Q_laser ≈ 1.54",
              },
              {
                label: "Peak Power",
                value: "~500 TW",
                sub: "≈ 1,000× global electricity",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {s.label}
                </div>
                <div className="font-mono text-lg font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted/20 border border-border p-4 mb-5 text-sm text-muted-foreground">
            <strong className="text-foreground block mb-2">
              Indirect Drive vs. Direct Drive
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <strong className="text-foreground block mb-1">
                  Indirect Drive (NIF approach)
                </strong>
                Lasers enter the open ends of a gold hohlraum (~1 cm cylinder).
                The hohlraum walls re-emit 80% of absorbed energy as soft X-rays
                (~250 eV), which then ablate the capsule in a highly uniform
                bath of radiation. Energy penalty: ~70–80% of laser energy is
                absorbed by the hohlraum before reaching the capsule. Advantage:
                superb implosion uniformity.
              </div>
              <div>
                <strong className="text-foreground block mb-1">
                  Direct Drive
                </strong>
                Laser beams hit the capsule surface directly. Higher coupling
                efficiency (60–80% vs. ~10–15% for indirect drive), but requires
                extreme beam uniformity (&lt;1% variation) to avoid
                Rayleigh-Taylor instabilities during ablation. Pursued by LLE
                (Laboratory for Laser Energetics, Rochester) and the proposed
                LIFE concept.
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            NIF Key Experimental History
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Date
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Laser Energy In
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Fusion Yield
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Q_laser
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Milestone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Aug 8, 2021",
                    "1.92 MJ",
                    "1.37 MJ",
                    "~0.72",
                    "First 'burning plasma' (α-heating dominant)",
                  ],
                  [
                    "Dec 5, 2022",
                    "2.05 MJ",
                    "3.15 MJ",
                    "~1.54",
                    "First scientific ignition (Q>1) in history",
                  ],
                  [
                    "Jul 30, 2023",
                    "2.05 MJ",
                    "3.88 MJ",
                    "~1.9",
                    "Repeated and exceeded; highest yield to date",
                  ],
                  [
                    "Late 2023+",
                    "2.05 MJ",
                    ">3 MJ (multiple)",
                    ">1",
                    "Confirmed reproducibility of ignition shots",
                  ],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {row[2]}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-primary">
                      {row[3]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            Obstacles to an IFE Power Plant
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              {
                title: "Repetition rate",
                desc: "NIF fires ~1 shot/day; a 1 GW power plant requires ~10 Hz (10 shots/second). No laser of sufficient energy can currently fire at that rate.",
              },
              {
                title: "Target mass production",
                desc: "Millions of precision cryogenic D-T capsules per day at ~$0.01 each. Current NIF target cost: ~$100,000 per target. Engineering gap: ~7 orders of magnitude.",
              },
              {
                title: "Driver efficiency",
                desc: "NIF's flashlamp-pumped Nd:glass lasers achieve ~1% wall-plug to UV efficiency. Diode-pumped solid-state lasers could reach ~20%, but remain undemonstrated at MJ scale.",
              },
              {
                title: "First-wall and chamber",
                desc: "14 MeV neutron flux and intense X-ray pulses ablate and activate the chamber walls. Proposed solutions: liquid metal (flibe) flowing walls, magnetic diversion of charged debris.",
              },
              {
                title: "Required plasma Q for economics",
                desc: "Even with 20% efficient lasers and 40% thermal conversion: plant Q_plasma must exceed ~50–100 for economic viability. NIF is currently at ~1.5.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-2">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">{item.title}:</strong>{" "}
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            Sources: Zylstra et al. (2022) <em>Nature</em> 601, 542;
            Abu-Shawareb et al. (2022) <em>Phys. Rev. Lett.</em> 129, 075001;
            Tollefson, J. (2022) <em>Nature</em> 612, 597.
          </p>
        </CollapsibleSection>

        {/* ── SECTION 5: Private Fusion Industry ── */}
        <CollapsibleSection
          title="Private Fusion and the Global Fusion Industry"
          badge="intermediate"
          ocid="fusion.private_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            A remarkable shift has occurred since 2015: fusion has moved from
            the domain of government megaprojects to a burgeoning private
            industry. Enabled by advances in high-temperature superconductors,
            additive manufacturing, and high-performance computing, private
            companies are pursuing approaches that were impractical a decade
            ago. Fusion Industry Association (FIA) data: over $7 billion USD
            invested in private fusion companies through the end of 2023.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Leading Private Companies
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Company
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Approach
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Key Technology
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Status / Target
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Commonwealth Fusion Systems (CFS)",
                    "High-field tokamak (SPARC, then ARC)",
                    "REBCO HTS tape coils at 20 T (tested Sept 2021)",
                    "SPARC Q>2 demo ~2025; ARC power plant ~2035",
                  ],
                  [
                    "Helion Energy",
                    "Pulsed FRC with direct energy conversion",
                    "Reversed FRC collided at 1 T; direct electric conversion",
                    "Microsoft PPA signed (2023); prototype ~2024; commercial ~2028",
                  ],
                  [
                    "TAE Technologies",
                    "Advanced beam-driven FRC (Norman machine)",
                    "Fast ion beam maintains hot plasma in FRC geometry",
                    "Targeting p-B11 (aneutronic); ~2030s commercial",
                  ],
                  [
                    "General Fusion",
                    "Magnetised target fusion (MTF)",
                    "Liquid metal vortex liner compressed by pistons",
                    "UK demonstration plant (Culham); ~2025 validation",
                  ],
                  [
                    "First Light Fusion",
                    "Projectile-driven ICF (hypervelocity impactor)",
                    "Railgun-accelerated impactor at 20+ km/s compresses target",
                    "Achieved fusion (2022); pursuing reactor concept",
                  ],
                  [
                    "Realta Fusion",
                    "Magnetic mirror (tandem mirror)",
                    "Ambipolar plugs to reduce end losses; Wisconsin design",
                    "Early stage; targeting compact industrial heat applications",
                  ],
                  [
                    "Zap Energy",
                    "Sheared-flow stabilised Z-pinch",
                    "High current through flowing plasma; flow suppresses instabilities",
                    "Achieved fusion; fundraising for FuZE-Q pilot device",
                  ],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors align-top"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[2]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            The Road from ITER to Commercial Power
          </h3>
          <div className="space-y-3 mb-5">
            {[
              {
                phase: "ITER First Plasma",
                time: "~2026–2027",
                detail:
                  "Non-nuclear hydrogen plasma; machine commissioning. No fusion energy produced at this stage.",
              },
              {
                phase: "ITER D-T Operations",
                time: "~2035",
                detail:
                  "D-T campaigns target Q ≥ 10, 500 MW fusion power. Critical scientific validation of burning plasma physics.",
              },
              {
                phase: "DEMO (European)",
                time: "~2040–2050",
                detail:
                  "Demonstration electricity generation plant; ~2 GW fusion power, continuous (steady-state or long-pulse). Validates tritium breeding blanket at full scale.",
              },
              {
                phase: "CFS SPARC Demo",
                time: "~2025–2027",
                detail:
                  "First compact high-field tokamak plasma; target Q > 2. If successful, ARC commercial reactor to follow.",
              },
              {
                phase: "Private Commercial Plants",
                time: "2030s–2040s",
                detail:
                  "Optimistic scenarios (CFS, Helion): first electricity by 2035–2040. More conservative: 2045–2050 for most approaches.",
              },
            ].map((step) => (
              <div
                key={step.phase}
                className="flex gap-4 text-sm rounded-lg bg-muted/20 border border-border p-3"
              >
                <div className="font-mono text-muted-foreground/70 w-28 shrink-0 pt-0.5">
                  {step.time}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {step.phase}
                  </div>
                  <div className="text-muted-foreground">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            "Fusion is Always 30 Years Away" — Myth or Reality?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The quip originated in the 1970s and reflects real frustration:
            plasma physics revealed instability after instability that required
            decades to understand and control. But the landscape has materially
            changed since ~2010:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-5">
            {[
              {
                title: "High-temperature superconductors (HTS)",
                desc: "REBCO tape coils (tested by CFS in 2021 at 20 T) enable compact tokamaks that would have been impossibly large with 1990s magnet technology — similar plasma performance at ~1/10 the volume.",
              },
              {
                title: "NIF ignition (2022)",
                desc: "Proof that alpha-particle-driven self-heating (a burning plasma) is physically achievable on Earth — removing the longest-standing question about D-T ICF feasibility.",
              },
              {
                title: "JET record (2022)",
                desc: "Validated the plasma scenarios ITER will use, reducing ITER's physics risk significantly.",
              },
              {
                title: "Private capital",
                desc: "~$7B invested 2020–2023 alone (FIA survey). Capital enables parallel experimentation that government programs cannot afford — multiple approaches being tested simultaneously.",
              },
              {
                title: "Key remaining challenge",
                desc: "Materials: no material has yet been tested under fusion-relevant 14 MeV neutron fluence (~100 displacements per atom). The IFMIF-DONES facility (Spain) is being built to address this but will not generate data until the 2030s.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-2">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">{item.title}:</strong>{" "}
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground block mb-1">
              Current Expert Consensus
            </strong>
            A 2023 survey of fusion researchers (FIA) found the median estimate
            for first commercial fusion electricity on the grid is 2040–2045,
            with a meaningful probability of demonstration before 2035. This is
            the most optimistic mainstream estimate in the history of fusion
            research — but it is contingent on continued capital, materials
            science breakthroughs, and no major unexpected physics discoveries.
            Fusion is no longer "always 30 years away" — but it is not yet
            inevitable or guaranteed on any particular timeline.
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Sources: Fusion Industry Association,{" "}
            <em>Global Fusion Industry Report 2023</em>
            {"; "}
            Bigot, B. (2022) <em>Nature</em> 599, 368{"; "}
            Ward, D.J. (2021) <em>Phil. Trans. R. Soc. A</em> 379, 20200053.
          </p>
        </CollapsibleSection>

        {/* ── NEW SECTION: ITER ── */}
        <CollapsibleSection
          title="ITER — The International Thermonuclear Experimental Reactor"
          badge="student"
          ocid="fusion.iter_deepdive"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            ITER is the world's most complex scientific project, representing
            humanity's most ambitious attempt to demonstrate the scientific and
            technological feasibility of fusion energy. A 35-nation
            collaboration (EU-27, UK, Switzerland, China, India, Japan, South
            Korea, Russia, USA) is constructing the machine at Cadarache in the
            south of France, backed by a budget exceeding{" "}
            <strong className="text-foreground">$22 billion USD</strong> —
            making it one of the most expensive scientific instruments in
            history, alongside the Large Hadron Collider and the James Webb
            Space Telescope.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Nations", value: "35", sub: "85% of world GDP" },
              { label: "Fusion Power", value: "500 MW", sub: "Design target" },
              {
                label: "Q Factor",
                value: "≥10",
                sub: "500 MW / 50 MW heating",
              },
              { label: "Budget", value: ">$22B", sub: "2023 estimate" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {s.label}
                </div>
                <div className="font-mono text-lg font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Scientific Goal: Prove Q ≥ 10 is Achievable
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            ITER will not generate electricity — it is a scientific experiment
            designed to demonstrate burning plasma physics at scale. Its mission
            is to prove that more fusion energy can be extracted than heating
            energy injected by a factor of at least 10. ITER is designed to
            produce{" "}
            <strong className="text-foreground">500 MW of fusion power</strong>{" "}
            from only{" "}
            <strong className="text-foreground">
              50 MW of external heating
            </strong>{" "}
            (NBI + ICRF + ECRH), sustaining this for 400–600 second pulses —
            long enough to study "burning plasma" physics where the plasma heats
            itself predominantly via alpha-particle deposition rather than
            external heating.
          </p>

          <EquationBlock
            latex="P_{\text{fusion}} = \frac{1}{4}\,n^2 \langle\sigma v\rangle\, Q_{\text{DT}} \quad (Q_{\text{DT}} = 17.6\,\text{MeV})"
            annotation="Fusion power density scales with the square of plasma density n, and the thermally-averaged reaction rate coefficient ⟨σv⟩ which peaks at ~65 keV for D-T. Q_DT = 17.6 MeV is the total energy released per D-T reaction. In ITER's plasma: n ≈ 10²⁰ m⁻³, T_ion ≈ 8–10 keV, target ⟨σv⟩ ≈ 3×10⁻²² m³/s — yielding ~500 MW in the 840 m³ plasma volume."
            label="D-T Fusion Power Density (ITER design basis)"
          />

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            D-T Fuel Cycle
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            ITER will consume approximately{" "}
            <strong className="text-foreground">
              0.5 kg of D-T fuel per day
            </strong>{" "}
            during full D-T operation to produce 500 MW of fusion power (~10⁸
            J/s = ~24 GWh/day). Deuterium (D) is readily separated from
            seawater; tritium (T) is the challenging component:
          </p>
          <div className="rounded-lg bg-muted/20 border border-border p-4 mb-5 text-sm text-muted-foreground">
            <strong className="text-foreground block mb-2">
              Tritium Supply for ITER
            </strong>
            <p>
              ITER requires ~0.35 kg T/day during D-T campaigns. Global tritium
              supply is ~25 kg (from CANDU reactor production, stored primarily
              at Chalk River Isotopes and SRB Technologies in Canada). ITER's
              tritium needs are supplied from existing stockpiles — it will not
              breed its own tritium (ITER blankets are "test blanket modules"
              for R&D, not full breeding blankets). DEMO will need a tritium
              breeding blanket, making breeding technology demonstration one of
              ITER's secondary objectives.
            </p>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Key Subsystems
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {[
              {
                name: "Superconducting magnets (TF coils)",
                detail:
                  "18 Nb₃Sn toroidal field coils at 4 K (−269 °C), generating 5.3 T on-axis (11.8 T at coil face). Nb₃Sn enables ITER's field — impossible with conventional NbTi magnets in this geometry.",
              },
              {
                name: "Poloidal field (PF) coils",
                detail:
                  "6 large PF coils + central solenoid (NbTi); plasma current is inductively driven to 15 MA by the central solenoid — the world's most powerful pulsed electromagnet at 13 T.",
              },
              {
                name: "Blanket modules",
                detail:
                  "440 blanket modules cover the plasma-facing first wall. Primary shielding function; test blanket modules (TBMs) from multiple nations test lithium-ceramic and lithium-lead breeding concepts.",
              },
              {
                name: "Divertor",
                detail:
                  "54 tungsten/carbon divertor cassettes at the bottom of the plasma vessel; absorbs particle and heat flux from the scrape-off layer plasma; handles 10–20 MW/m² peak heat flux.",
              },
              {
                name: "Heating systems (50 MW)",
                detail:
                  "NBI (neutral beam injection): 33 MW at 1 MeV D°. ICRF (ion cyclotron resonance frequency): 20 MW at 40–55 MHz. ECRH (electron cyclotron resonance heating): 20 MW at 170 GHz.",
              },
              {
                name: "Vacuum vessel",
                detail:
                  "Primary confinement barrier; double-walled stainless steel; 8,500 tonnes; 840 m³ plasma volume; built in 9 sectors shipped from USA, Korea, India, Europe.",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="rounded-lg bg-muted/30 border border-border p-4"
              >
                <div className="font-semibold text-foreground text-sm mb-1">
                  {v.name}
                </div>
                <div className="text-xs text-muted-foreground">{v.detail}</div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Construction Timeline
          </h3>
          <div className="space-y-2 mb-4 text-sm">
            {[
              {
                year: "2010",
                event: "Construction license granted; site preparation begins",
              },
              {
                year: "2013",
                event: "First safety documents approved; building construction",
              },
              {
                year: "2020–2024",
                event:
                  "Assembly phase: vacuum vessel sectors, TF coils, cryostat",
              },
              {
                year: "~2027",
                event:
                  "First plasma (hydrogen, non-nuclear — machine commissioning; no D-T at this stage)",
              },
              {
                year: "~2029–2032",
                event:
                  "PFPO-1 phase: deuterium-deuterium plasmas; heating power integration",
              },
              {
                year: "~2035",
                event:
                  "PFPO-2 / DT-1: First D-T plasmas; target Q ≥ 10 burning plasma demonstration",
              },
            ].map((step) => (
              <div
                key={step.year}
                className="flex gap-4 rounded-lg bg-muted/20 border border-border p-3"
              >
                <span className="font-mono text-primary font-semibold w-20 shrink-0">
                  {step.year}
                </span>
                <span className="text-muted-foreground">{step.event}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Sources: ITER Organization (2024);{" "}
            <em>ITER — The Way to New Energy</em>, ITER IO Publication; Bigot,
            B. (2022) <em>Nature</em> 599, 368.
          </p>
        </CollapsibleSection>

        {/* ── NEW SECTION: NIF and Inertial Confinement Fusion ── */}
        <CollapsibleSection
          title="NIF and Inertial Confinement Fusion: The December 2022 Ignition"
          badge="advanced"
          ocid="fusion.nif_deepdive"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            On December 5, 2022, the National Ignition Facility (NIF) at
            Lawrence Livermore National Laboratory (LLNL) achieved a landmark in
            66 years of fusion research: a fusion implosion that produced{" "}
            <strong className="text-foreground">
              3.15 MJ of fusion energy from 2.05 MJ of laser energy
            </strong>
            , achieving a plasma Q &gt; 1 (Q ≈ 1.54) for the first time in
            history. This milestone — termed "ignition" (Q_laser &gt; 1) by the
            scientific community — demonstrated that a burning plasma on Earth
            was physically achievable via laser-driven inertial confinement
            fusion (ICF).
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            NIF Specifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Laser Beams", value: "192", sub: "UV, 351 nm (3ω)" },
              {
                label: "Max Energy",
                value: "2.05 MJ",
                sub: "UV energy on target",
              },
              {
                label: "Peak Power",
                value: "~500 TW",
                sub: "≈ 1,000× global electric grid",
              },
              {
                label: "Target Size",
                value: "~2 mm",
                sub: "Cryogenic D-T capsule",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {s.label}
                </div>
                <div className="font-mono text-lg font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            ICF Principle: Compression, Hot Spot, Burn Wave
          </h3>
          <p className="text-muted-foreforward text-sm leading-relaxed mb-3">
            ICF achieves fusion not by confining a hot plasma for seconds
            (magnetic confinement), but by{" "}
            <strong className="text-foreground">
              compressing a tiny D-T target so rapidly
            </strong>{" "}
            that fusion reactions complete before the plasma can expand —
            confined by its own inertia during the ~10 ns implosion. The NIF
            uses the indirect-drive approach:
          </p>
          <div className="space-y-2 mb-5 text-sm text-muted-foreground">
            {[
              {
                step: "1. Hohlraum irradiation",
                desc: "192 UV laser beams enter a gold hohlraum cylinder (2×10 mm), converting laser energy to a ~300 eV (3.5 million °C) bath of soft X-rays with ~1% uniformity",
              },
              {
                step: "2. Ablation-driven implosion",
                desc: "X-rays ablate the outer ablator shell (HDC: high-density carbon); rocket-effect drives inward implosion at 300–400 km/s",
              },
              {
                step: "3. Stagnation and compression",
                desc: "Fuel compresses to ~300–1,000 g/cm³ (density of lead is 11 g/cm³); 30–35× linear compression; fuel assembly aspect ratio must stay below Rayleigh-Taylor instability threshold",
              },
              {
                step: "4. Hot spot ignition",
                desc: "Central hot spot reaches ~5–10 keV (60–100 million °C); alpha particles from D-T reactions deposit energy locally, raising temperature — self-reinforcing alpha heating begins",
              },
              {
                step: "5. Burn wave propagation",
                desc: "Alpha heating wave propagates outward into the cold dense fuel ('thermonuclear burn'); ~10 ns total burn time; >10¹⁶ D-T reactions per shot",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-3 rounded-lg bg-muted/20 border border-border p-3"
              >
                <span className="font-mono text-primary font-semibold shrink-0 w-40">
                  {item.step}
                </span>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>

          <EquationBlock
            latex="\rho R \geq 0.3\,\text{g/cm}^2 \quad \text{(ICF ignition condition)}"
            annotation="The Lawson criterion for ICF: the product of compressed fuel density ρ (g/cm³) and the hot-spot radius R (cm) must exceed approximately 0.3 g/cm² for alpha-particle self-heating to dominate and initiate burn wave propagation. At NIF's December 2022 shot: ρR ≈ 1.4 g/cm² was achieved — well above the ignition threshold. This is the ICF equivalent of the n·T·τ_E triple product for magnetic confinement."
            label="ICF Lawson Criterion: ρR Product for Ignition"
          />

          <h3 className="font-semibold text-foreground text-base mb-3 mt-5">
            NIF Experimental Milestones
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {[
                    "Date",
                    "Laser In",
                    "Fusion Yield",
                    "Q_laser",
                    "Milestone",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-semibold text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Aug 2021",
                    "1.92 MJ",
                    "1.37 MJ",
                    "~0.72",
                    "First 'burning plasma' — α-heating dominant",
                  ],
                  [
                    "Dec 5, 2022",
                    "2.05 MJ",
                    "3.15 MJ",
                    "~1.54",
                    "IGNITION: Q>1 first time in history ★",
                  ],
                  [
                    "Jul 30, 2023",
                    "2.05 MJ",
                    "3.88 MJ",
                    "~1.9",
                    "Repeated and exceeded prior record",
                  ],
                  [
                    "Late 2023+",
                    "~2.05 MJ",
                    ">3 MJ (×4)",
                    ">1",
                    "Confirmed reproducibility of ignition-class shots",
                  ],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[2]}
                    </td>
                    <td className="px-4 py-2 font-mono text-primary">
                      {row[3]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Challenges on the Path to an IFE Power Plant
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            NIF's Q ≈ 1.54 is a landmark physics result, but a commercial
            inertial fusion energy (IFE) power plant faces engineering hurdles
            of many orders of magnitude beyond the NIF:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              {
                label: "Repetition rate",
                current: "~1 shot/day (NIF)",
                required: "~10 Hz for 1 GW plant (10 shots/second)",
                gap: "~86,400× improvement",
              },
              {
                label: "Target cost",
                current: "~$100,000 per target (NIF)",
                required: "~$0.01–0.10 per target",
                gap: "~6–7 orders of magnitude",
              },
              {
                label: "Driver efficiency",
                current: "~1% (flashlamp Nd:glass laser)",
                required: "~20% (diode-pumped DPSSL)",
                gap: "~20× improvement; technology exists at small scale",
              },
              {
                label: "Required plasma Q",
                current: "~1.5 (NIF Dec 2022)",
                required: "~50–100 for wall-plug viability at 20% driver",
                gap: "~50× physics improvement needed",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-sm"
              >
                <div className="font-semibold text-foreground mb-2">
                  {c.label}
                </div>
                <div className="text-muted-foreground">
                  <span className="text-xs uppercase tracking-wide block text-muted-foreground/60 mb-1">
                    Current
                  </span>
                  {c.current}
                </div>
                <div className="mt-2 text-muted-foreground">
                  <span className="text-xs uppercase tracking-wide block text-muted-foreground/60 mb-1">
                    Required
                  </span>
                  {c.required}
                </div>
                <div className="mt-2 text-primary text-xs font-semibold">
                  Gap: {c.gap}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Other ICF Approaches
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {[
              {
                name: "Z-Machine (Sandia, USA)",
                desc: "Z-pinch pulsed power: 2.7 MA current pulse in ~100 ns; X-ray drive via plasma implosion. Highest X-ray power pulse of any facility. MagLIF (Magnetized Liner Inertial Fusion) approach showing promising results.",
              },
              {
                name: "OMEGA Laser (LLE, Rochester)",
                desc: "60-beam direct-drive laser, 30 kJ UV energy. The premier academic ICF research facility for direct-drive, shock-timing, and ICF physics studies. Platform for NIF capsule design experiments.",
              },
              {
                name: "First Light Fusion (UK)",
                desc: "Projectile-driven ICF: hypervelocity impactor (20+ km/s) accelerated by electromagnetic launcher drives a shaped shockwave through a D-T target. Simpler driver concept than lasers; achieved fusion in 2022.",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="rounded-lg bg-muted/30 border border-border p-4"
              >
                <div className="font-semibold text-foreground text-sm mb-1">
                  {v.name}
                </div>
                <div className="text-xs text-muted-foreground">{v.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Sources: Zylstra et al. (2022) <em>Nature</em> 601, 542;
            Abu-Shawareb et al. (2022) <em>Phys. Rev. Lett.</em> 129, 075001;
            Hurricane et al. (2023) <em>Rev. Mod. Phys.</em> 95, 025005.
          </p>
        </CollapsibleSection>

        {/* ── NEW SECTION: Stellarators and Alternative Fusion ── */}
        <CollapsibleSection
          title="Stellarators and Alternative Fusion Concepts"
          badge="researcher"
          ocid="fusion.stellarators"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            While tokamaks dominate the magnetic confinement fusion landscape,
            stellarators and a diverse ecosystem of alternative approaches are
            attracting renewed interest — for different reasons. Stellarators
            offer steady-state operation and intrinsic disruption-freedom;
            compact private ventures leverage new materials science and
            computational design to challenge the traditional large-tokamak
            model.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Stellarator vs. Tokamak: Key Distinction
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="font-semibold text-foreground text-sm mb-2">
                Tokamak
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                <li>
                  Requires a large plasma current (15 MA in ITER) to create the
                  poloidal field for helical confinement
                </li>
                <li>
                  Plasma current is unstable — must be actively controlled
                  against disruptions (sudden loss of current and confinement)
                </li>
                <li>
                  Inherently pulsed (inductive drive); steady-state requires
                  auxiliary current drive (bootstrap + ECCD/NBCD) — challenging
                </li>
                <li>
                  Simpler coil geometry but complex plasma control; decades of
                  operational experience
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <div className="font-semibold text-foreground text-sm mb-2">
                Stellarator
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                <li>
                  No plasma current required — helical field entirely produced
                  by complex 3D external coil geometry optimised by computation
                </li>
                <li>
                  Intrinsically steady-state: no inductive drive, no plasma
                  current to lose — no disruptions possible
                </li>
                <li>
                  Lower stored magnetic energy in plasma — inherently safer
                </li>
                <li>
                  Complex, precisely shaped non-planar coils: historically
                  impossible to manufacture; now feasible with modern CNC
                  fabrication and advanced computing
                </li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Wendelstein 7-X (W7-X): World's Largest Optimised Stellarator
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Wendelstein 7-X at the Max Planck Institute for Plasma Physics in
            Greifswald, Germany, is the culmination of decades of stellarator
            optimization theory. W7-X is the largest and most precisely built
            stellarator in the world, designed to demonstrate that a
            quasi-isodynamically optimised stellarator can confine plasma as
            well as — or better than — a comparably sized tokamak.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {[
              ["Major radius", "5.5 m"],
              ["Toroidal field", "Up to 3 T (on-axis)"],
              ["Plasma volume", "~30 m³"],
              ["Heating power", "10 MW ECRH + NBI (planned)"],
              [
                "Record (2023)",
                "H-mode plasma: 8 minutes at 10⁷ K with neodymium-glass pellet fuelling",
              ],
              [
                "Key result",
                "Energy confinement consistent with optimisation predictions — validates quasisymmetry concept",
              ],
            ].map(([k, v]) => (
              <div
                key={String(k)}
                className="rounded-lg bg-muted/20 border border-border p-3 text-sm"
              >
                <span className="font-semibold text-foreground">{k}: </span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Compact Fusion: The Private Sector Approach
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The insight driving private fusion companies: ITER-scale devices
            (~€20B, 35 nations, 30-year timeline) are not the only path. If
            higher magnetic fields are achievable (via HTS magnets), plasma
            confinement scales as B⁴, allowing fusion-relevant conditions in a
            much smaller, cheaper device. Commonwealth Fusion Systems (CFS) is
            the leading HTS tokamak company:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {[
                    "Company",
                    "Concept",
                    "Key Technology",
                    "Status (2024)",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-semibold text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  [
                    "Commonwealth Fusion (SPARC)",
                    "High-field tokamak",
                    "REBCO HTS coils at 12–20 T (Sept 2021: 20 T demonstrated)",
                    "SPARC device construction; target first plasma ~2025",
                  ],
                  [
                    "Helion Energy",
                    "Pulsed FRC (field-reversed configuration)",
                    "D-He³ / D-D FRC collision; direct electric conversion",
                    "Microsoft 2028 electricity PPA; 7th-gen device testing",
                  ],
                  [
                    "TAE Technologies",
                    "Advanced beam-driven FRC (Norman)",
                    "Fast ion beam sustains hot FRC; long-term target: p-¹¹B aneutronic",
                    "300 keV plasma achieved; round 3 fundraising",
                  ],
                  [
                    "Type One Energy",
                    "Optimised stellarator",
                    "Computational coil optimisation + CNC manufacturing",
                    "STAR device design phase; ARPA-E funding",
                  ],
                  [
                    "Zap Energy",
                    "Sheared-flow Z-pinch",
                    "High current through flowing plasma; flow suppresses kink instabilities",
                    "Achieved fusion; FuZE-Q pilot device fundraising",
                  ],
                ].map((row) => (
                  <tr
                    key={String(row[0])}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold text-foreground">
                      {row[0]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[1]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[2]}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Private Fusion Investment: 2022–2024
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Fusion Industry Association (FIA) Annual Reports show explosive
            growth in private fusion investment:
          </p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              {
                year: "2020",
                amount: "$0.4B",
                note: "Mostly pre-existing ventures",
              },
              {
                year: "2021–2022",
                amount: "$4.7B",
                note: "CFS Series B ($1.8B); Helion ($2.2B)",
              },
              {
                year: "2023",
                amount: ">$7B total",
                note: "Cumulative private investment (FIA)",
              },
            ].map((s) => (
              <div
                key={s.year}
                className="rounded-lg bg-muted/30 border border-border p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {s.year}
                </div>
                <div className="font-mono text-xl font-bold text-primary">
                  {s.amount}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.note}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Realistic Timeline to Commercial Fusion Power
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The Fusion Industry Association's 2023 survey of fusion scientists
            found median estimates of 2040–2045 for first commercial fusion
            electricity. The most optimistic scenario (CFS/Helion): electricity
            from fusion by 2035. The ITER/DEMO pathway: first electricity
            demonstration ~2050. Sober assessment: fusion is closer than ever
            but remains contingent on materials science breakthroughs (14 MeV
            neutron damage), tritium breeding validation, and sustained capital
            through inevitable experimental setbacks.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Sources: Fusion Industry Association,{" "}
            <em>Global Fusion Industry Report 2023</em>
            {"; "}
            Pedersen, T.S. et al. (2022) W7-X <em>Phys. Rev. Lett.</em> 128,
            085003{"; "}
            Klinger, T. et al. (2023) W7-X progress <em>Nucl. Fusion</em> 63,
            112023.
          </p>
        </CollapsibleSection>

        {/* ── NEW SECTION: Fusion Fuel Resources and Economics ── */}
        <CollapsibleSection
          title="Fusion Fuel Resources and Net Energy Economics"
          badge="student"
          ocid="fusion.fuel_economics"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            One of fusion's most compelling attributes is the
            near-inexhaustibility of its fuel. Deuterium is effectively
            unlimited; tritium must be bred from lithium, which is abundant
            globally. The true challenge is not fuel supply but net energy: can
            a fusion power plant deliver more electricity to the grid than it
            consumes?
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Deuterium: Extracted from Seawater
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Deuterium occurs naturally in seawater at a ratio of approximately 1
            in 6,420 hydrogen atoms — corresponding to 33 mg of D per litre of
            seawater. Electrolytic or chemical isotope separation (Girdler
            sulfide process) extracts D₂O (heavy water) from ordinary water at
            industrial scale. Key facts:
          </p>
          <div className="rounded-lg bg-muted/20 border border-border p-4 mb-5 text-sm text-muted-foreground">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                ["D in seawater", "~33 g/m³ (~33 mg/L)"],
                ["World ocean D₂O", "~4.6 × 10¹⁶ kg of D"],
                [
                  "Fusion energy from D",
                  "~5 × 10³⁰ J — ~10 billion years at current world consumption",
                ],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <span className="font-semibold text-foreground block">
                    {k}
                  </span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Tritium: Bred from Lithium-6
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Tritium (T½ = 12.32 years) does not exist in nature in useful
            quantities. First-generation D-T fusion reactors must breed their
            own tritium from lithium using the fusion neutrons:
          </p>
          <EquationBlock
            latex="{}^6_3\text{Li} + n \rightarrow {}^4_2\text{He} + {}^3_1\text{T} + 4.78\,\text{MeV}"
            annotation="Li-6 + thermal neutron → He-4 + tritium + 4.78 MeV. This exothermic reaction is the primary breeding path. Natural lithium is 7.59% Li-6; breeding blankets use enriched Li-6 (up to 90%) in ceramic form (Li₄SiO₄, Li₂TiO₃) or liquid lithium-lead eutectic (LiPb: 17% Li, 83% Pb). The tritium breeding ratio (TBR) must exceed ~1.05 to account for losses and provide startup inventory for new reactors — each reactor must breed approximately its own fuel supply plus surplus for the next reactor."
            label="Tritium Breeding from Li-6 (Primary D-T Fuel Cycle Reaction)"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Li-7, which constitutes 92.4% of natural lithium, also breeds
            tritium at higher neutron energies:{" "}
            <span className="font-mono text-xs bg-muted/40 px-1 rounded">
              ⁷Li + n → ⁴He + T + n − 2.47 MeV
            </span>{" "}
            (endothermic; threshold ~2 MeV). This reaction also regenerates a
            neutron, allowing a breeding ratio &gt; 1 from a natural lithium
            blanket.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Lithium Resources
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {[
              {
                label: "Land reserves",
                value: "~22 Mt",
                sub: "USGS 2023; Australia, Chile, Argentina, China dominate",
              },
              {
                label: "Ocean lithium",
                value: "~230,000 Gt",
                sub: "~0.18 ppm in seawater; economically unfeasible at present",
              },
              {
                label: "Fusion requirement",
                value: "~130 kg Li/yr",
                sub: "Per 1 GWe fusion plant (for tritium breeding)",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-muted/30 border border-border p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {s.label}
                </div>
                <div className="font-mono text-lg font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            At 130 kg Li/yr per GWe plant, and 100 GWe of global fusion
            capacity, annual consumption would be ~13,000 tonnes of Li
            (predominantly Li-6). World land reserves of ~22 million tonnes
            could support ~1,700 years of such consumption. Even without ocean
            extraction, lithium for fusion is effectively unlimited on
            civilisation timescales.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            Net Energy Economics: Wall-Plug to Grid
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The distinction between plasma Q (fusion energy / heating energy)
            and wall-plug Q (fusion energy / total electricity consumed) is
            critical for evaluating commercial viability:
          </p>
          <div className="space-y-2 mb-5 text-sm">
            {[
              {
                step: "Plasma Q ≥ 10",
                desc: "ITER design goal. 500 MW fusion from 50 MW heating. This is a scientific milestone, not a commercial one.",
              },
              {
                step: "Heating efficiency",
                desc: "Converting wall-plug electricity to plasma heating (NBI ~50%; ICRF ~80%; ECRH ~50–70%). ITER: ~50 MW plasma heating requires ~100 MW wall-plug electricity.",
              },
              {
                step: "Thermal conversion",
                desc: "Converting fusion heat to electricity via steam Rankine cycle: ~35–40% efficiency. 500 MW thermal → ~175–200 MWe output.",
              },
              {
                step: "Plant parasitic load",
                desc: "Magnets (superconducting coils need refrigeration), vacuum pumps, controls, coolant pumps: ~100–200 MWe for ITER-scale plant.",
              },
              {
                step: "Net electricity export",
                desc: "For a 1 GWe fusion plant: ~3 GW thermal output needed (at 35% conversion), requiring Q_plasma ~15–20 with 50% heating efficiency. This is achievable with ITER-class devices at commercial scale.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-3 rounded-lg bg-muted/20 border border-border p-3"
              >
                <span className="font-semibold text-foreground text-xs uppercase tracking-wide w-40 shrink-0 pt-0.5">
                  {item.step}
                </span>
                <span className="text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2">
            Grid Parity Projections
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Levelised Cost of Energy (LCOE) projections for first-of-a-kind
            (FOAK) fusion power plants: European DEMO studies estimate
            €60–80/MWh for the first commercial plant (2050s), declining to
            ~€40/MWh for nth-of-a-kind (NOAK) as learning curve effects reduce
            capital costs. This is competitive with nuclear fission and offshore
            wind on a long-run marginal cost basis, but capital intensity
            remains the key risk. Fuel costs (~$0.10/GJ for D; ~$40/GJ for bred
            T) would be essentially negligible in the LCOE compared to capital
            charges.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Sources: USGS Mineral Commodity Summaries 2023 (Lithium); Franza, F.
            et al. (2022) Fusion Engineering and Design 134; Fusion Industry
            Association, <em>Global Fusion Industry Report 2023</em>.
          </p>
        </CollapsibleSection>

        {/* ── Existing: Fusion Reactions and Q-Values ── */}
        <CollapsibleSection
          title="Fusion Reactions and Q-Values (Summary)"
          badge="advanced"
          ocid="fusion.qvalues_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Q-value is the energy released (positive) or absorbed (negative) in
            a nuclear reaction, calculated from the mass difference between
            reactants and products via E = Δm·c². Different fusion fuels offer
            very different yields, neutron fractions, and required temperatures.
          </p>

          <div className="space-y-4 mb-6">
            <EquationBlock
              latex="^2_1\\text{D} + ^3_1\\text{T} \\rightarrow ^4_2\\text{He}\\,(3.52\\text{ MeV}) + n\\,(14.06\\text{ MeV}),\\quad Q = 17.59\\text{ MeV}"
              annotation="D-T reaction: most energetically favorable for first-generation fusion. The helium nucleus carries 3.52 MeV and the neutron carries 14.06 MeV (80% of the energy)."
              label="D-T Reaction"
            />
            <EquationBlock
              latex="^2_1\\text{D} + ^2_1\\text{D} \\rightarrow \\begin{cases} ^3_1\\text{T} + p, & Q = 4.03\\text{ MeV} \\\\ ^3_2\\text{He} + n, & Q = 3.27\\text{ MeV} \\end{cases}"
              annotation="D-D reactions occur with roughly equal probability for each branch. Lower Q-values than D-T, but no need for tritium breeding — deuterium alone is the fuel."
              label="D-D Reactions (two branches)"
            />
            <EquationBlock
              latex="^2_1\\text{D} + ^3_2\\text{He} \\rightarrow ^4_2\\text{He} + p,\\quad Q = 18.35\\text{ MeV}"
              annotation="D-³He is aneutronic — no neutrons produced. Higher Q-value than D-T, but requires much higher plasma temperature (~500 keV). ³He is scarce on Earth but potentially harvestable from the lunar regolith."
              label="D-³He Reaction (aneutronic)"
            />
            <EquationBlock
              latex="p + ^{11}_{5}\\text{B} \\rightarrow 3\\,^4_2\\text{He},\\quad Q = 8.68\\text{ MeV}"
              annotation="Proton-Boron-11 fusion is fully aneutronic — all energy released as charged alpha particles that can be converted directly to electricity. Requires plasma temperatures > 300 keV — extremely challenging."
              label="p-B11 Reaction (fully aneutronic)"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            D-T is preferred for first-generation fusion because the reaction
            cross-section σ<sub>DT</sub> peaks at approximately 5×10⁻²⁸ m² at a
            plasma temperature of ~65 keV (~750 million °C) — two orders of
            magnitude higher than other reactions at the same temperature.{" "}
            <strong className="text-foreground">Fuel resources:</strong>{" "}
            deuterium occurs naturally in seawater at 33 mg/L (essentially
            unlimited); tritium (T½ = 12.3 yr) must be bred by irradiating
            lithium-6 with the fusion neutrons themselves via{" "}
            <span className="font-mono text-xs bg-muted/40 px-1 rounded">
              n + ⁶Li → T + ⁴He + 4.8 MeV
            </span>
            .
          </p>
        </CollapsibleSection>

        {/* ── Future of Fusion ── */}
        <CollapsibleSection
          title="Materials, Waste, and the Long-Term Future"
          badge="intermediate"
          ocid="fusion.future_section"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Fusion science has made more progress in the past decade than in the
            previous five. Two landmark results in 2022 — JET's record and NIF's
            ignition — mark a genuine turning point. The path from here to
            commercial power, while still long, is now clearer than ever.
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">
            2022 Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg bg-muted/30 border border-border p-4">
              <div className="font-semibold text-foreground text-sm mb-1">
                JET (Feb 2022)
              </div>
              <div className="text-xs text-muted-foreground">
                59 MJ in 5 seconds = 11.8 MW average fusion power. Validated D-T
                plasma scenarios for ITER.
              </div>
            </div>
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
              <div className="font-semibold text-foreground text-sm mb-1">
                NIF (Dec 2022) ★
              </div>
              <div className="text-xs text-muted-foreground">
                3.15 MJ fusion output / 2.05 MJ laser input. First Q &gt; 1 in
                history — a 66-year milestone achieved.
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-base mb-2 mt-5">
            Materials and Neutron Damage
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The 14.06 MeV neutrons from D-T fusion are uniquely challenging:
            they displace atoms in structural materials (<em>dpa</em> —
            displacements per atom), transmuting them into radioactive isotopes
            and causing embrittlement. Current research focuses on{" "}
            <strong className="text-foreground">tungsten</strong> (plasma-facing
            components) and{" "}
            <strong className="text-foreground">
              reduced-activation ferritic-martensitic (RAFM) steels
            </strong>{" "}
            (structural). Unlike fission waste, fusion structural materials
            become radioactive on relatively short timescales: most RAFM steels
            decay to hands-on levels within 100 years, and there are no
            long-lived actinides or fission products.
          </p>

          <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground block mb-1">
              Second-Generation Fuels
            </strong>
            D-³He and p-B11 offer near-zero or zero neutron production, vastly
            simplifying materials challenges and radioactive waste. However,
            they require plasma temperatures 5–15× higher than D-T and have
            lower cross-sections, making them the fusion frontier beyond 2050.
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
