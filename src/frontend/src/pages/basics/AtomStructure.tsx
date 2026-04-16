import { AudienceBadge } from "@/components/AudienceBadge";
import { CitationMarker } from "@/components/CitationMarker";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Atom, ChevronRight } from "lucide-react";
import React from "react";

const subpages = [
  {
    label: "Isotopes",
    href: "/basics/isotopes",
    desc: "Variants of the same element with different neutron counts",
  },
  {
    label: "Radioactivity",
    href: "/basics/radioactivity",
    desc: "Spontaneous nuclear transformation and emission of radiation",
  },
  {
    label: "Energy & Mass",
    href: "/basics/energy-mass",
    desc: "Einstein's mass-energy equivalence and nuclear binding",
  },
];

const shells = [
  {
    label: "Protons (Z)",
    value: "Defines the element (1 = H, 92 = U)",
    color: "text-rose-400",
  },
  {
    label: "Neutrons (N)",
    value: "Determines isotope; contributes to mass and stability",
    color: "text-blue-400",
  },
  {
    label: "Electrons",
    value: "Governs chemistry; equal to Z in neutral atom",
    color: "text-emerald-400",
  },
];

const fundamentalForces = [
  {
    force: "Strong (nuclear)",
    range: "~1–3 fm",
    relStrength: "1",
    boson: "Gluon (8 types)",
    role: "Binds quarks; residual force binds nucleons",
  },
  {
    force: "Electromagnetic",
    range: "∞",
    relStrength: "10⁻²",
    boson: "Photon (γ)",
    role: "Electron-nucleus attraction; Coulomb repulsion between protons",
  },
  {
    force: "Weak",
    range: "< 0.1 fm",
    relStrength: "10⁻⁶",
    boson: "W±, Z⁰ bosons",
    role: "Governs beta decay; converts neutron↔proton",
  },
  {
    force: "Gravitational",
    range: "∞",
    relStrength: "10⁻³⁸",
    boson: "Graviton (unconfirmed)",
    role: "Negligible at nuclear scale; dominant at cosmic scale",
  },
];

const magicNumberData = [
  {
    nuclide: "⁴He",
    Z: 2,
    N: 2,
    note: "Doubly magic; α-particle is exceptionally tightly bound",
    extraBE: "+3.1",
  },
  {
    nuclide: "¹⁶O",
    Z: 8,
    N: 8,
    note: "Doubly magic; anomalously high B/A = 7.976 MeV",
    extraBE: "+4.2",
  },
  {
    nuclide: "⁴⁰Ca",
    Z: 20,
    N: 20,
    note: "Doubly magic; lightest doubly-magic nucleus beyond He-4",
    extraBE: "+3.8",
  },
  {
    nuclide: "⁴⁸Ca",
    Z: 20,
    N: 28,
    note: "Very neutron-rich; used in superheavy element synthesis",
    extraBE: "+1.9",
  },
  {
    nuclide: "¹³²Sn",
    Z: 50,
    N: 82,
    note: "Doubly magic; important in r-process nucleosynthesis",
    extraBE: "+5.1",
  },
  {
    nuclide: "²⁰⁸Pb",
    Z: 82,
    N: 126,
    note: "Heaviest doubly-magic; T½ = stable (most protons of any stable nuclide)",
    extraBE: "+7.4",
  },
];

const semfTerms = [
  {
    term: "Volume",
    formula: "a_V · A",
    coeff: "15.75 MeV",
    meaning:
      "Every nucleon interacts with its nearest neighbors (saturation). Energy scales with volume (∝ A).",
  },
  {
    term: "Surface",
    formula: "−a_S · A²/³",
    coeff: "17.8 MeV",
    meaning:
      "Surface nucleons have fewer neighbors — analogous to surface tension in a liquid drop. Reduces binding.",
  },
  {
    term: "Coulomb",
    formula: "−a_C · Z²/A^{1/3}",
    coeff: "0.711 MeV",
    meaning:
      "Proton-proton electromagnetic repulsion lowers binding. Grows as Z².",
  },
  {
    term: "Asymmetry",
    formula: "−a_A · (A−2Z)²/A",
    coeff: "23.7 MeV",
    meaning:
      "Pauli exclusion principle favors N≈Z for light nuclei. Asymmetry costs energy.",
  },
  {
    term: "Pairing",
    formula: "±a_P / A^{1/2}",
    coeff: "12 MeV",
    meaning:
      "+12 MeV for even-even, 0 for odd-A, −12 MeV for odd-odd nuclei. Nucleons pair with opposite spin.",
  },
];

const nuclideTypes = [
  {
    type: "Isotopes",
    definition: "Same Z, different N",
    example: "¹H, ²H, ³H (Z=1; N=0,1,2)",
    note: "Same chemistry, different nuclear properties",
  },
  {
    type: "Isobars",
    definition: "Same A, different Z",
    example: "⁴⁰Ar, ⁴⁰K, ⁴⁰Ca",
    note: "Different elements; one stable isobar for each A typically",
  },
  {
    type: "Isotones",
    definition: "Same N, different Z",
    example: "¹³C (Z=6) and ¹⁴N (Z=7); both N=7",
    note: "Similar nuclear structure; important in shell model",
  },
  {
    type: "Nuclear isomers",
    definition: "Same Z and N, different energy state",
    example: "⁹⁹ᵐTc (excited, 140.5 keV) vs ⁹⁹Tc (ground)",
    note: "Metastable state; de-excites by γ or IC emission",
  },
  {
    type: "Mirror nuclei",
    definition: "Same A; Z and N swapped",
    example: "³He (Z=2,N=1) and ³H (Z=1,N=2)",
    note: "Test of charge symmetry of nuclear force",
  },
];

const nuclearSizeData = [
  {
    nuclide: "¹H",
    A: 1,
    r_fm: "0.85",
    V_fm3: "2.6",
    note: "Proton charge radius (CODATA 2018)",
  },
  {
    nuclide: "⁴He",
    A: 4,
    r_fm: "1.90",
    V_fm3: "28.7",
    note: "Alpha particle; doubly magic",
  },
  {
    nuclide: "¹²C",
    A: 12,
    r_fm: "2.73",
    V_fm3: "85.2",
    note: "Common accelerator target",
  },
  {
    nuclide: "⁵⁶Fe",
    A: 56,
    r_fm: "4.54",
    V_fm3: "392",
    note: "Most tightly bound nucleus",
  },
  {
    nuclide: "²⁰⁸Pb",
    A: 208,
    r_fm: "7.11",
    V_fm3: "1,503",
    note: "Doubly magic; heaviest stable nuclide",
  },
  {
    nuclide: "²³⁸U",
    A: 238,
    r_fm: "7.44",
    V_fm3: "1,726",
    note: "Heaviest natural nuclide",
  },
];

const shellOrbits = [
  { shell: "1s₁/₂", capacity: 2, cumulative: 2, magic: true },
  { shell: "1p₃/₂", capacity: 4, cumulative: 6, magic: false },
  { shell: "1p₁/₂", capacity: 2, cumulative: 8, magic: true },
  { shell: "1d₅/₂", capacity: 6, cumulative: 14, magic: false },
  { shell: "2s₁/₂", capacity: 2, cumulative: 16, magic: false },
  { shell: "1d₃/₂", capacity: 4, cumulative: 20, magic: true },
  { shell: "1f₇/₂", capacity: 8, cumulative: 28, magic: true },
  { shell: "2p₃/₂", capacity: 4, cumulative: 32, magic: false },
  { shell: "1f₅/₂", capacity: 6, cumulative: 38, magic: false },
  { shell: "2p₁/₂", capacity: 2, cumulative: 40, magic: false },
  { shell: "1g₉/₂", capacity: 10, cumulative: 50, magic: true },
];

const bindingEnergyPerA = [
  { nuclide: "²H", A: 2, BperA: 1.11, note: "Barely bound; lightest nucleus" },
  { nuclide: "³He", A: 3, BperA: 2.57, note: "" },
  {
    nuclide: "⁴He",
    A: 4,
    BperA: 7.07,
    note: "Magic; prominent peak for light nuclei",
  },
  { nuclide: "¹²C", A: 12, BperA: 7.68, note: "Triple-alpha fusion product" },
  { nuclide: "¹⁶O", A: 16, BperA: 7.98, note: "Doubly magic; local maximum" },
  {
    nuclide: "⁵⁶Fe",
    A: 56,
    BperA: 8.79,
    note: "Global maximum — endpoint of stellar burning",
  },
  { nuclide: "⁶³Cu", A: 63, BperA: 8.75, note: "" },
  { nuclide: "⁹⁰Zr", A: 90, BperA: 8.71, note: "N=50 magic" },
  { nuclide: "²⁰⁸Pb", A: 208, BperA: 7.87, note: "Doubly magic local maximum" },
  {
    nuclide: "²³⁵U",
    A: 235,
    BperA: 7.59,
    note: "Fissile; releases ~200 MeV per fission",
  },
  {
    nuclide: "²³⁸U",
    A: 238,
    BperA: 7.57,
    note: "Most abundant natural uranium isotope",
  },
];

export default function AtomStructure() {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Atom Structure"
        subtitle="Every element in the universe is built from atoms — each a tiny nucleus surrounded by a cloud of electrons. Understanding atomic structure is the gateway to all of nuclear science."
        audienceLevel="beginner"
        readTimeMin={35}
      />

      <div className="grid gap-6">
        {/* ── EXISTING: What Is an Atom ── */}
        <SectionCard data-ocid="basics.atom_overview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Atom className="h-5 w-5 text-primary" aria-hidden="true" />
            What Is an Atom?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            An atom is the smallest unit of a chemical element — the irreducible
            unit that retains the element's identity. At its center lies the{" "}
            <strong className="text-foreground">nucleus</strong>, a dense core
            of positively charged <em>protons</em> and electrically neutral{" "}
            <em>neutrons</em> bound together by the strong nuclear force.
            Orbiting this nucleus are negatively charged <em>electrons</em>,
            much lighter and spread over a volume roughly 100,000 times larger
            than the nucleus itself.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Almost all the mass of an atom is concentrated in its nucleus. A
            proton or neutron has a mass of ~1 atomic mass unit (u); an electron
            is ~1,836 times lighter. This enormous mass concentration in a tiny
            volume is what makes nuclear reactions release so much more energy
            than chemical reactions.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The diameter of a typical atom is on the order of 0.1–0.5 nm
            (angstrom scale), while the nucleus is approximately 10,000–100,000
            times smaller — on the femtometer (fm = 10⁻¹⁵ m) scale. If an atom
            were enlarged to the size of a football stadium, its nucleus would
            be a marble at the center. Yet that marble contains 99.97% of the
            atom's mass.
          </p>

          {/* Sub-collapsible: Quantum mechanical picture */}
          <div className="border border-border rounded-lg mt-5">
            <button
              type="button"
              onClick={() => toggle("atom-quantum")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["atom-quantum"]}
              data-ocid="basics.atom_quantum_toggle"
            >
              <span className="text-sm">
                Beyond the Bohr Model: The Quantum Mechanical Atom
              </span>
              <span className="text-xs text-muted-foreground">
                {open["atom-quantum"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["atom-quantum"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  The Bohr model (1913) — with electrons in fixed circular
                  orbits — correctly predicts the hydrogen spectrum but fails
                  for multi-electron atoms. Modern quantum mechanics replaces
                  fixed orbits with{" "}
                  <strong className="text-foreground">
                    probability density functions
                  </strong>{" "}
                  (orbitals) — regions of space where an electron is most likely
                  to be found.
                  <CitationMarker refId={11} />
                </p>
                <p>Each electron is described by four quantum numbers:</p>
                <ul className="ml-4 space-y-1 list-disc">
                  <li>
                    <strong className="text-foreground">n</strong> (principal):
                    shell energy level (1, 2, 3…)
                  </li>
                  <li>
                    <strong className="text-foreground">ℓ</strong> (azimuthal):
                    orbital shape (0=s, 1=p, 2=d, 3=f)
                  </li>
                  <li>
                    <strong className="text-foreground">mℓ</strong> (magnetic):
                    orientation in space (−ℓ to +ℓ)
                  </li>
                  <li>
                    <strong className="text-foreground">ms</strong> (spin): +½
                    or −½ (up or down)
                  </li>
                </ul>
                <p>
                  The{" "}
                  <strong className="text-foreground">
                    Pauli Exclusion Principle
                  </strong>{" "}
                  forbids two electrons from sharing all four quantum numbers.
                  This forces electrons into progressively higher energy states,
                  explaining the periodic table's structure. An identical
                  principle applies to nucleons in the nucleus — a key
                  ingredient of the nuclear shell model.
                </p>
                <p>
                  The wave function ψ(r,θ,φ) for an electron encodes all
                  measurable information. The probability of finding the
                  electron in a volume element dV is |ψ|² dV. For the hydrogen
                  1s ground state:
                </p>
                <div className="rounded bg-muted/40 p-3 font-mono text-xs">
                  ψ₁ₛ(r) = (1/√π) · (1/a₀)^(3/2) · exp(−r/a₀)
                  <br />
                  where a₀ = 0.0529 nm (Bohr radius)
                </div>
                <p>
                  The probability density peaks at r = a₀, confirming that the
                  electron is most likely found at the Bohr radius — but can be
                  anywhere from r=0 to r=∞.
                </p>
              </div>
            )}
          </div>

          {/* Sub-collapsible: Constituents of nucleons */}
          <div className="border border-border rounded-lg mt-3">
            <button
              type="button"
              onClick={() => toggle("atom-quarks")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["atom-quarks"]}
              data-ocid="basics.atom_quarks_toggle"
            >
              <span className="text-sm">
                Inside the Nucleon: Quarks and the Strong Force
              </span>
              <span className="text-xs text-muted-foreground">
                {open["atom-quarks"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["atom-quarks"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  Protons and neutrons are not elementary — they are composed of{" "}
                  <strong className="text-foreground">quarks</strong>,
                  point-like particles described by Quantum Chromodynamics
                  (QCD). Each nucleon contains three valence quarks (plus a sea
                  of virtual quark-antiquark pairs and gluons):
                  <CitationMarker refId={12} />
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded bg-rose-400/10 border border-rose-400/20 p-3">
                    <p className="font-semibold text-rose-400 mb-1">Proton</p>
                    <p className="font-mono text-xs">uud (two up + one down)</p>
                    <p className="text-xs mt-1">Charge: (+⅔ + ⅔ − ⅓) = +1</p>
                    <p className="text-xs">Mass: 938.272 MeV/c²</p>
                  </div>
                  <div className="rounded bg-blue-400/10 border border-blue-400/20 p-3">
                    <p className="font-semibold text-blue-400 mb-1">Neutron</p>
                    <p className="font-mono text-xs">udd (one up + two down)</p>
                    <p className="text-xs mt-1">Charge: (+ ⅔ − ⅓ − ⅓) = 0</p>
                    <p className="text-xs">Mass: 939.565 MeV/c²</p>
                  </div>
                </div>
                <p>
                  Quarks carry{" "}
                  <strong className="text-foreground">color charge</strong>{" "}
                  (red, green, blue — an analogy, not real color). The strong
                  force, mediated by{" "}
                  <strong className="text-foreground">gluons</strong>, keeps
                  quarks confined inside hadrons. A distinctive property of QCD
                  is{" "}
                  <strong className="text-foreground">
                    asymptotic freedom
                  </strong>
                  : at very short distances (high energies), quarks interact
                  weakly; at larger distances, the interaction strengthens —
                  like a rubber band — preventing individual quarks from being
                  isolated (color confinement).
                </p>
                <p>
                  The residual strong force between nucleons — what we call the
                  nuclear force — is analogous to the van der Waals force
                  between neutral molecules: an indirect consequence of the
                  underlying color interactions. It is described
                  phenomenologically by the{" "}
                  <strong className="text-foreground">Yukawa potential</strong>:
                </p>
                <div className="rounded bg-muted/40 p-3 font-mono text-xs">
                  V(r) = −g² · (e^(−r/r₀)) / r
                  <br />
                  where r₀ = ℏc/mπc² ≈ 1.4 fm (pion Compton wavelength)
                </div>
                <p>
                  The pion (π meson, mass ~140 MeV/c²) was predicted by Yukawa
                  in 1935 as the carrier of the nuclear force — a remarkable
                  theoretical success confirmed by experiment in 1947. Modern
                  nuclear potentials (Argonne v18, CD-Bonn) include
                  contributions from heavier meson exchange as well.
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── EXISTING: Three Fundamental Particles ── */}
        <SectionCard data-ocid="basics.nucleon_table_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            The Three Fundamental Particles
          </h2>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Fundamental atomic particles and their properties"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Particle
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Charge
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Mass (u)
                  </th>
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Mass (MeV/c²)
                  </th>
                  <th className="pb-2 font-semibold text-foreground">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  ["Proton", "+1 e", "1.007276", "938.272", "Nucleus"],
                  ["Neutron", "0", "1.008665", "939.565", "Nucleus"],
                  ["Electron", "−1 e", "0.000549", "0.511", "Electron cloud"],
                ].map(([p, c, m, mev, l]) => (
                  <tr key={p} className="text-muted-foreground">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      {p}
                    </td>
                    <td className="py-2 pr-4">{c}</td>
                    <td className="py-2 pr-4 font-mono">{m}</td>
                    <td className="py-2 pr-4 font-mono text-primary">{mev}</td>
                    <td className="py-2">{l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Values from CODATA 2018 [NIST]. 1 u = 931.494 MeV/c². Note: the
            neutron is 1.293 MeV/c² heavier than the proton — a consequence of
            quark mass differences and QCD contributions. Free neutrons are
            unstable (T½ = 611.0 s, decaying via n → p + e⁻ + ν̄ₑ), but are
            stable when bound in most nuclei.
            <CitationMarker refId={13} />
          </p>

          {/* Sub-collapsible: antiparticles */}
          <div className="border border-border rounded-lg mt-4">
            <button
              type="button"
              onClick={() => toggle("particle-antimatter")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["particle-antimatter"]}
              data-ocid="basics.antimatter_toggle"
            >
              <span className="text-sm">Antimatter Counterparts</span>
              <span className="text-xs text-muted-foreground">
                {open["particle-antimatter"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["particle-antimatter"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  Every particle has an antiparticle with identical mass but
                  opposite quantum numbers (charge, lepton number, baryon
                  number). When a particle meets its antiparticle, they{" "}
                  <strong className="text-foreground">annihilate</strong>,
                  converting all their rest mass energy into photons:
                </p>
                <div className="rounded bg-muted/40 p-3 font-mono text-xs">
                  e⁻ + e⁺ → 2γ (each photon: 511 keV — the positron emission
                  used in PET scanning)
                  <br />p + p̄ → multiple mesons + γ
                </div>
                <p>
                  The antiproton (p̄) and antineutron (n̄) were discovered at the
                  Bevatron (Berkeley) in 1955 and 1956 respectively.
                  Anti-hydrogen (p̄ + e⁺) has been produced and trapped at CERN's
                  ALPHA experiment, enabling precision comparisons of matter and
                  antimatter properties.
                  <CitationMarker refId={14} />
                </p>
                <p>
                  The observed predominance of matter over antimatter in the
                  universe is one of the great unsolved problems in physics —
                  known as{" "}
                  <strong className="text-foreground">baryogenesis</strong> or
                  the matter-antimatter asymmetry problem. CP violation
                  (measured in kaon and B-meson systems) is far too small to
                  explain the observed asymmetry, suggesting unknown physics
                  beyond the Standard Model.
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── EXISTING: Nuclear Notation ── */}
        <SectionCard data-ocid="basics.notation_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Nuclear Notation
          </h2>
          <p className="text-muted-foreground mb-4">
            A nuclide is fully specified by its atomic number Z (protons), mass
            number A (total nucleons), and neutron number N:
          </p>
          <EquationBlock
            latex="A = Z + N"
            annotation="Mass number A equals the number of protons Z plus neutrons N. For example, carbon-14 has Z=6, N=8, A=14."
            label="Mass Number"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {shells.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-muted/30 p-3"
              >
                <p className={`font-display text-sm font-bold ${s.color}`}>
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Standard notation:{" "}
            <span className="font-mono text-foreground">ᴬ꜀X</span> where X is
            the element symbol, A is the mass number (top left), and Z is the
            atomic number (bottom left). Example:{" "}
            <span className="font-mono text-primary">²³⁵₉₂U</span> — uranium
            with 92 protons and 143 neutrons. In running text, simply write
            U-235 or ²³⁵U.
          </p>

          {/* Sub-collapsible: Binding energy notation */}
          <div className="border border-border rounded-lg mt-4">
            <button
              type="button"
              onClick={() => toggle("notation-binding")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["notation-binding"]}
              data-ocid="basics.notation_binding_toggle"
            >
              <span className="text-sm">
                Atomic Mass vs. Nuclear Mass: The Binding Energy Deficit
              </span>
              <span className="text-xs text-muted-foreground">
                {open["notation-binding"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["notation-binding"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  The <strong className="text-foreground">atomic mass</strong>{" "}
                  M(Z,A) of a nuclide is always less than the sum of its
                  constituent proton and neutron masses. This difference is the{" "}
                  <strong className="text-foreground">mass defect</strong> Δm:
                </p>
                <EquationBlock
                  latex="\Delta m = Z \cdot m_p + N \cdot m_n - M(Z,A)"
                  annotation="Mass defect: the total mass of free protons and neutrons minus the actual nuclear mass. This mass is converted to binding energy holding the nucleus together."
                  label="Mass Defect"
                />
                <p>
                  Via E = mc², the binding energy is B = Δm · c². Using c² =
                  931.494 MeV/u:
                </p>
                <div className="rounded bg-muted/40 p-3 font-mono text-xs">
                  Fe-56: Δm = 26×1.007276 + 30×1.008665 − 55.934939 u
                  <br />= 26.18918 + 30.25995 − 55.93494 = 0.52819 u
                  <br />B = 0.52819 × 931.494 = 492.26 MeV
                  <br />
                  B/A = 492.26 / 56 ={" "}
                  <span className="text-primary font-bold">
                    8.790 MeV/nucleon
                  </span>
                </div>
                <p>
                  Tables of nuclear masses are published by the Atomic Mass
                  Evaluation (AME) group — the latest being AME2020 [Wang et
                  al., Chinese Physics C 45, 030003 (2021)], containing measured
                  masses of 2,457 nuclides.
                  <CitationMarker refId={15} />
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── EXISTING: Scale of the Nucleus ── */}
        <SectionCard data-ocid="basics.size_scale_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Scale of the Nucleus
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The atomic radius is roughly 10⁻¹⁰ m (0.1 nm). The nuclear radius
            scales with mass number A as:
          </p>
          <EquationBlock
            latex="r \approx r_0 \cdot A^{1/3} \quad (r_0 \approx 1.2 \text{ fm})"
            annotation="The nuclear radius r is approximately r₀ times the cube root of A, where r₀ ≈ 1.2 femtometers (10⁻¹⁵ m). An atom is about 100,000× larger than its nucleus."
            label="Nuclear Radius"
          />
          <p className="text-sm text-muted-foreground mt-3">
            If the nucleus were the size of a marble (~1 cm), the atom would be
            roughly the size of a football stadium. Yet nearly all the mass sits
            in that marble.
          </p>
        </SectionCard>

        {/* ══════════════════════════════════════════════════════
            NEW SECTION 1: The Four Fundamental Forces
        ══════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="atom-nuclear-force"
          title="The Four Fundamental Forces"
          badge={<AudienceBadge level="intermediate" />}
          defaultOpen={false}
          data-ocid="basics.nuclear_force_section"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            All interactions in the universe arise from just four fundamental
            forces. At the nuclear scale, two of these — the strong and weak
            nuclear forces — are normally invisible in everyday life, yet
            utterly dominate nuclear structure, stability, and reactions.
            <CitationMarker refId={1} />
          </p>

          <div className="overflow-x-auto mb-6">
            <table
              className="w-full text-sm"
              aria-label="Comparison of the four fundamental forces"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Force
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Range
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Relative Strength
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Gauge Boson
                  </th>
                  <th className="pb-2 font-semibold text-foreground">
                    Nuclear Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {fundamentalForces.map((f) => (
                  <tr key={f.force} className="text-muted-foreground">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {f.force}
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs">{f.range}</td>
                    <td className="py-2 pr-3 font-mono text-xs">
                      {f.relStrength}
                    </td>
                    <td className="py-2 pr-3 text-xs">{f.boson}</td>
                    <td className="py-2 text-xs">{f.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-5 text-sm text-muted-foreground">
            {/* Strong force */}
            <div className="rounded-lg bg-muted/20 border border-border p-4">
              <p className="font-semibold text-foreground mb-2">
                1. Strong Nuclear Force
              </p>
              <p className="mb-2">
                The residual strong force between nucleons is not a fundamental
                interaction in itself — it is a residue of the{" "}
                <em>color force</em> that binds quarks inside protons and
                neutrons via gluon exchange (quantum chromodynamics, QCD). Just
                as neutral molecules attract each other via van der Waals forces
                (a residue of their internal electromagnetism), nucleons attract
                each other via a residual QCD interaction.
                <CitationMarker refId={2} />
              </p>
              <ul className="ml-4 space-y-1 list-disc">
                <li>Range: ~1–3 fm; falls to essentially zero beyond ~3 fm</li>
                <li>
                  <strong className="text-foreground">
                    Charge-independence:
                  </strong>{" "}
                  p-p, n-n, and p-n strong forces are nearly equal — this is
                  isospin symmetry (SU(2) flavor symmetry of QCD)
                </li>
                <li>
                  <strong className="text-foreground">Saturation:</strong> each
                  nucleon interacts only with its few nearest neighbors (short
                  range), so binding energy ∝ A, not A²
                </li>
                <li>
                  <strong className="text-foreground">Repulsive core:</strong>{" "}
                  at r &lt; ~0.4 fm, the force becomes strongly repulsive —
                  preventing nuclear collapse and explaining why nucleons
                  maintain a finite size
                </li>
                <li>
                  Mediated at nuclear distances primarily by pion exchange
                  (Yukawa mechanism); heavier mesons (ρ, ω, σ) contribute at
                  shorter range
                </li>
              </ul>
            </div>

            {/* Electromagnetic force */}
            <div className="rounded-lg bg-muted/20 border border-border p-4">
              <p className="font-semibold text-foreground mb-2">
                2. Electromagnetic Force
              </p>
              <p className="mb-2">
                Electromagnetism — mediated by photons — has infinite range and
                governs the interaction between electrically charged particles.
                Inside a nucleus, it manifests primarily as{" "}
                <strong className="text-foreground">Coulomb repulsion</strong>
                between protons:
              </p>
              <EquationBlock
                latex="U_C = \frac{3}{5} \cdot \frac{Z(Z-1)e^2}{4\pi\epsilon_0 R}"
                annotation="Coulomb self-energy of a uniformly charged sphere of radius R containing Z protons. This grows roughly as Z², which is why very heavy nuclei become unstable."
                label="Nuclear Coulomb Energy"
              />
              <p>
                For uranium (Z=92): U_C ≈ 0.711 × 92 × 91 / 238^(1/3) ≈ 925 MeV.
                This enormous repulsive energy must be overcome by the strong
                force. As Z increases, each new proton repels all Z−1 existing
                protons (long-range), but the strong force only helps the
                nearest few neighbors (short-range). Above Z ≈ 83 (bismuth),
                this competition makes all nuclei unstable against alpha or
                spontaneous fission.
              </p>
            </div>

            {/* Weak force */}
            <div className="rounded-lg bg-muted/20 border border-border p-4">
              <p className="font-semibold text-foreground mb-2">
                3. Weak Nuclear Force
              </p>
              <p className="mb-2">
                The weak force, mediated by the massive W± and Z⁰ bosons,
                operates at ranges far below 0.1 fm (the boson mass ~80–91
                GeV/c² sets a range of ~0.002 fm via the Heisenberg uncertainty
                principle). It is uniquely responsible for processes that change
                quark flavor — and thus transform neutrons into protons or vice
                versa.
                <CitationMarker refId={3} />
              </p>
              <ul className="ml-4 space-y-1 list-disc">
                <li>
                  <strong className="text-foreground">β⁻ decay:</strong> n → p +
                  e⁻ + ν̄ₑ (neutron → proton; mediated by virtual W⁻)
                </li>
                <li>
                  <strong className="text-foreground">β⁺ decay:</strong> p → n +
                  e⁺ + νₑ (proton → neutron; requires energy input ≥ 2mₑc² =
                  1.022 MeV)
                </li>
                <li>
                  <strong className="text-foreground">
                    Electron capture (EC):
                  </strong>{" "}
                  p + e⁻ → n + νₑ (competes with β⁺ for proton-rich nuclei)
                </li>
                <li>
                  The emitted neutrino carries energy and essentially no
                  momentum is deposited in matter — solar neutrinos pass through
                  the Earth with ~10% interaction probability over the Earth's
                  entire diameter
                </li>
                <li>
                  The electroweak unification (Glashow-Weinberg-Salam model,
                  1967) demonstrated that electromagnetic and weak forces are
                  manifestations of a single force at energies above ~100 GeV —
                  confirmed by W/Z boson discovery at CERN (1983)
                </li>
              </ul>
            </div>

            {/* Stability competition */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <p className="font-semibold text-primary mb-2">
                The Stability Competition: Strong Force vs. Coulomb Repulsion
              </p>
              <p>
                The Coulomb repulsion between protons is long-range (scales as
                Z²) while the strong force is short-range (saturates after
                ~nearest neighbors). As Z increases:
              </p>
              <ul className="ml-4 mt-2 space-y-1 list-disc">
                <li>
                  Z = 1–20: Strong force comfortably dominates; N ≈ Z for most
                  stable nuclei
                </li>
                <li>
                  Z = 20–82: Coulomb grows; extra neutrons needed to "dilute"
                  proton density and add strong-force binding without Coulomb
                  penalty
                </li>
                <li>
                  Z &gt; 83: No stable nucleus exists. Coulomb wins; alpha decay
                  or spontaneous fission inevitable
                </li>
                <li>
                  Z &gt; ~104: Spontaneous fission half-lives drop to
                  microseconds or less
                </li>
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                Gravity is completely negligible at nuclear scales: the
                gravitational attraction between two protons is ~10³⁸× weaker
                than the Coulomb repulsion. Gravity only becomes relevant at the
                scale of neutron stars and black holes.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════
            NEW SECTION 2: Nuclear Size and Density
        ══════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="atom-nuclear-size"
          title="Nuclear Size and Density"
          badge={<AudienceBadge level="intermediate" />}
          defaultOpen={false}
          data-ocid="basics.nuclear_size_section"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Electron scattering experiments pioneered by Robert Hofstadter at
            Stanford in the 1950s — for which he received the 1961 Nobel Prize
            in Physics — established that nuclear charge is distributed roughly
            uniformly within a sphere whose radius follows the simple scaling:
            <CitationMarker refId={4} />
          </p>

          <EquationBlock
            latex="r = r_0 \cdot A^{1/3} \qquad r_0 = 1.2 \text{ fm} = 1.2 \times 10^{-15} \text{ m}"
            annotation="The charge radius of a nucleus scales as the cube root of the mass number A. r₀ ≈ 1.2 fm from electron scattering fits. For uranium-238: r = 1.2 × (238)^{1/3} = 7.44 fm."
            label="Nuclear Charge Radius (Hofstadter)"
          />

          <p className="text-sm text-muted-foreground mb-4">
            More precisely, nuclear charge distributions are described by the{" "}
            <strong className="text-foreground">
              Woods-Saxon (Fermi) distribution
            </strong>
            :
          </p>
          <EquationBlock
            latex="\rho(r) = \frac{\rho_0}{1 + \exp\!\left(\frac{r - R}{a}\right)}"
            annotation="The nuclear charge density ρ(r) as a function of radius r, where R ≈ r₀A^{1/3} is the half-density radius and a ≈ 0.54 fm is the surface diffuseness parameter. ρ₀ ≈ 0.16 fm⁻³ is the saturation density."
            label="Woods-Saxon Nuclear Density Profile"
          />

          <div className="mt-4 mb-4 overflow-x-auto">
            <p className="text-sm font-semibold text-foreground mb-2">
              Nuclear radii for selected nuclides (r₀ = 1.2 fm)
            </p>
            <table
              className="w-full text-sm"
              aria-label="Nuclear radii and volumes for selected nuclides"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    A
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    r (fm)
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    V (fm³)
                  </th>
                  <th className="pb-2 font-semibold text-foreground">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {nuclearSizeData.map((row) => (
                  <tr key={row.nuclide} className="text-muted-foreground">
                    <td className="py-2 pr-3 font-mono font-medium text-foreground">
                      {row.nuclide}
                    </td>
                    <td className="py-2 pr-3 text-right">{row.A}</td>
                    <td className="py-2 pr-3 text-right font-mono text-primary">
                      {row.r_fm}
                    </td>
                    <td className="py-2 pr-3 text-right font-mono">
                      {row.V_fm3}
                    </td>
                    <td className="py-2 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-4">
            <p className="font-semibold text-foreground mb-2">
              Worked Example: U-238 Nuclear Density
            </p>
            <div className="font-mono text-xs space-y-1 text-muted-foreground">
              <div>A = 238 → A^(1/3) = 6.204</div>
              <div>r = 1.2 × 6.204 = 7.44 fm = 7.44 × 10⁻¹⁵ m</div>
              <div>
                V = (4/3)π r³ = 4.189 × (7.44×10⁻¹⁵)³ = 1.726 × 10⁻⁴² m³
              </div>
              <div>m ≈ 238 × 1.6605 × 10⁻²⁷ kg = 3.952 × 10⁻²⁵ kg</div>
              <div>
                ρ = m/V = 3.952×10⁻²⁵ / 1.726×10⁻⁴² ={" "}
                <strong className="text-primary">2.29 × 10¹⁷ kg/m³</strong>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Nuclear density ≈ 2.3 × 10¹⁷ kg/m³
              </strong>{" "}
              and is approximately constant for all nuclei heavier than ~He-4 —
              direct evidence of the saturation property of the nuclear force.
              Compare:
            </p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>
                Water: 10³ kg/m³ (nuclear matter is 2.3 × 10¹⁴ times denser)
              </li>
              <li>Iron: 7.87 × 10³ kg/m³</li>
              <li>White dwarf core: ~10⁹ kg/m³</li>
              <li>
                Neutron star: ~10¹⁷–10¹⁸ kg/m³ (comparable to nuclear density —
                neutron stars are essentially giant nuclei)
              </li>
              <li>
                <strong className="text-foreground">
                  Earth at nuclear density:
                </strong>{" "}
                mass = 6 × 10²⁴ kg; V = 6×10²⁴ / 2.3×10¹⁷ = 2.6 × 10⁷ m³; r =
                (3V/4π)^(1/3) ≈ <strong className="text-primary">183 m</strong>{" "}
                (about the size of a baseball stadium)
              </li>
            </ul>

            {/* Sub-collapsible: Measurement techniques */}
            <div className="border border-border rounded-lg mt-3">
              <button
                type="button"
                onClick={() => toggle("size-measurement")}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
                aria-expanded={!!open["size-measurement"]}
                data-ocid="basics.size_measurement_toggle"
              >
                <span className="text-sm">How Nuclear Sizes Are Measured</span>
                <span className="text-xs text-muted-foreground">
                  {open["size-measurement"] ? "▲ Collapse" : "▼ Expand"}
                </span>
              </button>
              {open["size-measurement"] && (
                <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                  <p>
                    Nuclear size measurements require probes with de Broglie
                    wavelength λ = h/p comparable to or smaller than the nuclear
                    size (~1–10 fm). This requires high-energy particles:
                  </p>
                  <ul className="ml-4 space-y-2 list-disc">
                    <li>
                      <strong className="text-foreground">
                        Electron scattering (Hofstadter):
                      </strong>{" "}
                      Electrons at 100–500 MeV scatter from nuclear Coulomb
                      field; diffraction pattern gives charge distribution. λ ≈
                      hc/E ≈ 1240/300 = 4 fm at 300 MeV.
                    </li>
                    <li>
                      <strong className="text-foreground">Muonic atoms:</strong>{" "}
                      Muons (m_μ = 207 m_e) orbit much closer to the nucleus
                      (a_μ = a₀/207); X-ray transition energies depend
                      sensitively on nuclear size. Used for precision proton
                      radius measurements (the "proton radius puzzle").
                    </li>
                    <li>
                      <strong className="text-foreground">
                        α-particle scattering:
                      </strong>{" "}
                      At energies just above the Coulomb barrier, deviations
                      from Rutherford scattering signal strong-force contact,
                      giving the nuclear matter radius.
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Isotope shift spectroscopy:
                      </strong>{" "}
                      Comparing atomic transition wavelengths between isotopes
                      reveals the change in mean-square charge radius δ⟨r²⟩ —
                      powerful for exotic, short-lived nuclei.
                    </li>
                  </ul>
                  <p>
                    Modern nuclear charge radii are compiled in the NUBASE2020
                    and AME2020 evaluations.
                    <CitationMarker refId={16} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════
            NEW SECTION 3: Nuclear Shell Model and Magic Numbers
        ══════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="atom-shell-model"
          title="Nuclear Shell Model and Magic Numbers"
          badge={<AudienceBadge level="advanced" />}
          defaultOpen={false}
          data-ocid="basics.shell_model_section"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            The nuclear shell model — developed independently by Maria
            Goeppert-Mayer and J. Hans D. Jensen in 1949, earning the 1963 Nobel
            Prize in Physics — explains why certain nuclei are extraordinarily
            stable. The central insight is that nucleons move in a mean field
            (the average potential created by all other nucleons) and fill
            discrete energy levels, analogous to electrons filling atomic
            orbitals.
            <CitationMarker refId={5} />
          </p>

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 mb-5">
            <p className="font-semibold text-primary mb-2">Magic Numbers</p>
            <p className="font-mono text-xl text-foreground text-center my-3 tracking-widest">
              2 · 8 · 20 · 28 · 50 · 82 · 126
            </p>
            <p className="text-sm text-muted-foreground">
              Nuclei with these numbers of protons or neutrons (or both —
              "doubly magic") have completed nuclear shells. They exhibit
              enhanced stability, higher binding energy, anomalously high
              first-excited-state energies, and reduced reaction cross-sections.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            <strong className="text-foreground">
              Key experimental evidence for magic numbers:
            </strong>
          </p>
          <ul className="ml-4 mb-5 space-y-1 text-sm text-muted-foreground list-disc">
            <li>
              Natural abundances: nuclides with magic Z or N are anomalously
              abundant in solar-system material
            </li>
            <li>
              One-nucleon separation energies drop sharply above magic numbers
              (shell closure lowers energy of last nucleon)
            </li>
            <li>
              First 2⁺ excited state energies are highest at doubly-magic nuclei
            </li>
            <li>
              Alpha-decay Q-values have local minima at daughter nuclides with
              magic N
            </li>
            <li>
              Neutron capture cross-sections are anomalously small at magic N —
              critical for r-process nucleosynthesis bottlenecks
            </li>
          </ul>

          <div className="overflow-x-auto mb-5">
            <table
              className="w-full text-sm"
              aria-label="Doubly magic nuclei and their extra binding energy"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Nuclide
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    Z
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    N
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                    Extra B (MeV)
                  </th>
                  <th className="pb-2 font-semibold text-foreground">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {magicNumberData.map((n) => (
                  <tr key={n.nuclide} className="text-muted-foreground">
                    <td className="py-2 pr-3 font-mono font-medium text-foreground">
                      {n.nuclide}
                    </td>
                    <td className="py-2 pr-3 text-right">{n.Z}</td>
                    <td className="py-2 pr-3 text-right">{n.N}</td>
                    <td className="py-2 pr-3 text-right font-mono text-primary">
                      {n.extraBE}
                    </td>
                    <td className="py-2 text-xs">{n.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nuclear shell orbital table */}
          <div className="border border-border rounded-lg mb-5">
            <button
              type="button"
              onClick={() => toggle("shell-orbitals")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["shell-orbitals"]}
              data-ocid="basics.shell_orbitals_toggle"
            >
              <span className="text-sm">
                Nuclear Shell Orbital Filling Order
              </span>
              <span className="text-xs text-muted-foreground">
                {open["shell-orbitals"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["shell-orbitals"] && (
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  Orbital labels: n = radial quantum number, ℓ = angular
                  momentum, j = total angular momentum = ℓ ± ½. Capacity = 2j +
                  1. Spin-orbit splitting produces the large gaps at magic
                  numbers above 20.
                </p>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-xs"
                    aria-label="Nuclear shell orbital filling"
                  >
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 pr-3 font-semibold text-foreground">
                          Orbital (nlⱼ)
                        </th>
                        <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                          Capacity (2j+1)
                        </th>
                        <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                          Cumulative
                        </th>
                        <th className="pb-2 font-semibold text-foreground">
                          Shell closure?
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {shellOrbits.map((row) => (
                        <tr
                          key={row.shell}
                          className={
                            row.magic
                              ? "bg-primary/5 text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          <td className="py-1.5 pr-3 font-mono">{row.shell}</td>
                          <td className="py-1.5 pr-3 text-right">
                            {row.capacity}
                          </td>
                          <td
                            className={`py-1.5 pr-3 text-right font-mono ${row.magic ? "text-primary font-bold" : ""}`}
                          >
                            {row.cumulative}
                          </td>
                          <td className="py-1.5 text-xs">
                            {row.magic ? (
                              <span className="text-primary font-semibold">
                                ✓ Magic number {row.cumulative}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Why spin-orbit coupling is critical:
              </strong>{" "}
              Simple shell models using a harmonic oscillator or infinite square
              well potential reproduce magic numbers 2, 8, and 20, but predict
              incorrect shell closures above that. Goeppert-Mayer and Jensen
              found that adding a{" "}
              <strong className="text-foreground">
                strong spin-orbit term
              </strong>{" "}
              (proportional to ℓ·s, where ℓ is orbital angular momentum and s is
              intrinsic spin) splits each orbital nℓ into two sub-orbitals with
              j = ℓ + ½ and j = ℓ − ½, with the j = ℓ + ½ state lowered in
              energy. This produces large energy gaps exactly at the observed
              magic numbers (28, 50, 82, 126).
              <CitationMarker refId={5} />
            </p>
            <p>
              <strong className="text-foreground">Island of Stability:</strong>{" "}
              Nuclear theory predicts a closed spherical shell at Z=114, N=184 —
              a hypothetical "doubly magic" superheavy nucleus. If this shell
              exists, nuclei near it might have half-lives of hours, days, or
              longer — far exceeding the microsecond lifetimes of currently
              synthesized superheavy elements. Element 114 (Flerovium, Fl) was
              confirmed in 2012 by IUPAC, and elements up to oganesson (Z=118)
              have been synthesized. The exact location and extent of the island
              remains an active research frontier.
              <CitationMarker refId={6} />
            </p>
            <p>
              <strong className="text-foreground">Deformed nuclei:</strong> Not
              all nuclei are spherical. Between magic numbers, residual
              nucleon-nucleon interactions drive the nucleus away from spherical
              symmetry. Nuclei with numbers of protons or neutrons between magic
              numbers often adopt prolate (rugby-ball) or oblate (discus)
              shapes, described by the deformation parameter β. These deformed
              nuclei exhibit{" "}
              <strong className="text-foreground">rotational bands</strong> —
              sequences of excited states with energies E_J = (ℏ²/2I) · J(J+1) —
              directly observable in γ-ray spectra.
            </p>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════
            NEW SECTION 4: Liquid Drop Model and SEMF
        ══════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="atom-semf"
          title="Liquid Drop Model and the Semi-Empirical Mass Formula"
          badge={<AudienceBadge level="advanced" />}
          defaultOpen={false}
          data-ocid="basics.semf_section"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            The{" "}
            <strong className="text-foreground">
              Semi-Empirical Mass Formula
            </strong>{" "}
            (SEMF), also called the Bethe-Weizsäcker formula (1935–36), treats
            the nucleus as a charged, incompressible liquid drop. Despite its
            classical simplicity, it predicts nuclear binding energies to within
            ~1% for most nuclei — a remarkable achievement that encodes five
            distinct pieces of nuclear physics.
            <CitationMarker refId={7} />
          </p>

          <EquationBlock
            latex="B(Z,A) = a_V A \;-\; a_S A^{2/3} \;-\; a_C \frac{Z^2}{A^{1/3}} \;-\; a_A \frac{(A-2Z)^2}{A} \;+\; \delta"
            annotation="Total nuclear binding energy B(Z,A) in MeV. The five terms are: volume (aV=15.75), surface (aS=17.8), Coulomb (aC=0.711), asymmetry (aA=23.7), and pairing (δ=±12/√A MeV for even-even/odd-odd; 0 for odd-A)."
            label="Bethe-Weizsäcker SEMF"
          />

          <div className="mt-4 overflow-x-auto mb-5">
            <table
              className="w-full text-sm"
              aria-label="SEMF terms with physical meaning and standard coefficients"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Term
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Formula
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Coefficient
                  </th>
                  <th className="pb-2 font-semibold text-foreground">
                    Physical Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {semfTerms.map((t) => (
                  <tr key={t.term} className="text-muted-foreground align-top">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {t.term}
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs">{t.formula}</td>
                    <td className="py-2 pr-3 font-mono text-xs text-primary">
                      {t.coeff}
                    </td>
                    <td className="py-2 text-xs">{t.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-muted/30 border border-border p-4 mb-5">
            <p className="font-semibold text-foreground mb-2">
              Worked Example: Fe-56 (Z=26, N=30, A=56)
            </p>
            <div className="font-mono text-xs space-y-1 text-muted-foreground">
              <div>Volume: +15.75 × 56 = +882.0 MeV</div>
              <div>
                Surface: −17.80 × 56^(2/3) = −17.80 × 14.47 = −257.6 MeV
              </div>
              <div>
                Coulomb: −0.711 × 26² / 56^(1/3) = −0.711 × 676 / 3.826 = −125.6
                MeV
              </div>
              <div>
                Asymmetry: −23.7 × (56−52)² / 56 = −23.7 × 16 / 56 = −6.8 MeV
              </div>
              <div>Pairing: +12.0 / √56 = +1.6 MeV (even-even nucleus)</div>
              <div className="border-t border-border mt-2 pt-1 text-foreground font-semibold">
                B(SEMF) ≈ 493.6 MeV · Experimental (AME2020): 492.26 MeV ·
                Error: &lt;0.3%
              </div>
            </div>
          </div>

          {/* Binding energy per nucleon curve */}
          <div className="border border-border rounded-lg mb-5">
            <button
              type="button"
              onClick={() => toggle("semf-curve")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["semf-curve"]}
              data-ocid="basics.semf_curve_toggle"
            >
              <span className="text-sm">
                Binding Energy Per Nucleon: Key Values
              </span>
              <span className="text-xs text-muted-foreground">
                {open["semf-curve"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["semf-curve"] && (
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  B/A peaks at Fe-56 — the endpoint of stellar nucleosynthesis.
                  Both fission (heavy → medium) and fusion (light → medium)
                  release energy by moving toward this maximum. Values from
                  AME2020.
                  <CitationMarker refId={15} />
                </p>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-xs"
                    aria-label="Binding energy per nucleon for key nuclides"
                  >
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 pr-3 font-semibold text-foreground">
                          Nuclide
                        </th>
                        <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                          A
                        </th>
                        <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                          B/A (MeV)
                        </th>
                        <th className="pb-2 font-semibold text-foreground">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {bindingEnergyPerA.map((row) => (
                        <tr
                          key={row.nuclide}
                          className={
                            row.nuclide === "⁵⁶Fe"
                              ? "bg-primary/5 text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          <td className="py-1.5 pr-3 font-mono">
                            {row.nuclide}
                          </td>
                          <td className="py-1.5 pr-3 text-right">{row.A}</td>
                          <td
                            className={`py-1.5 pr-3 text-right font-mono ${row.nuclide === "⁵⁶Fe" ? "text-primary font-bold" : ""}`}
                          >
                            {row.BperA}
                          </td>
                          <td className="py-1.5 text-xs">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* SEMF limitations sub-section */}
          <div className="border border-border rounded-lg">
            <button
              type="button"
              onClick={() => toggle("semf-limits")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["semf-limits"]}
              data-ocid="basics.semf_limits_toggle"
            >
              <span className="text-sm">
                SEMF Limitations and Advanced Nuclear Mass Models
              </span>
              <span className="text-xs text-muted-foreground">
                {open["semf-limits"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["semf-limits"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  While the SEMF is extraordinarily useful, it systematically
                  deviates from experiment near magic numbers (shell effects add
                  up to ~8 MeV extra binding) and fails for light nuclei (A &lt;
                  ~12) where the liquid-drop approximation breaks down entirely.
                </p>
                <p>Modern nuclear mass models include:</p>
                <ul className="ml-4 space-y-2 list-disc">
                  <li>
                    <strong className="text-foreground">
                      Finite-Range Droplet Model (FRDM):
                    </strong>{" "}
                    Extensions of the liquid-drop model with microscopic shell
                    and pairing corrections (Möller, Nix, Myers, Swiatecki).
                    FRDM2012 achieves RMS error ~0.56 MeV for 2,353 measured
                    masses.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Hartree-Fock-Bogoliubov (HFB):
                    </strong>{" "}
                    Fully self-consistent mean-field theory using Skyrme or
                    Gogny effective interactions. HFB-31 achieves ~0.5 MeV RMS
                    error and can predict masses far from stability.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Ab initio methods:
                    </strong>{" "}
                    For light nuclei (A &lt; ~40), no-core shell model (NCSM)
                    and coupled cluster theory use realistic NN+3N forces from
                    chiral effective field theory (χEFT), achieving sub-MeV
                    accuracy. Computationally expensive — scales exponentially
                    with A.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Machine learning approaches:
                    </strong>{" "}
                    Neural network models trained on AME2020 data achieve ~0.3
                    MeV RMS error and can interpolate smoothly between measured
                    masses (Lovell et al., PRC 2022).
                  </li>
                </ul>
                <p className="text-xs">
                  All measured nuclear masses are tabulated in AME2020 (Wang et
                  al., Chinese Physics C 45, 030003, 2021) and available from
                  the IAEA Nuclear Data Services.
                  <CitationMarker refId={15} />
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Astrophysical significance:
              </strong>{" "}
              The binding energy curve directly determines which nuclear
              reactions are energetically favorable in stars:
            </p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>
                <strong className="text-foreground">Main sequence:</strong> H →
                He fusion (B/A: 0 → 7.07 MeV); releases ~26.7 MeV per He-4
                produced
              </li>
              <li>
                <strong className="text-foreground">Red giant:</strong> He → C →
                O fusion (triple-alpha process, B/A → 7.68 MeV)
              </li>
              <li>
                <strong className="text-foreground">Massive stars:</strong> C,
                O, Si burning → approach Fe-56; no more energy can be released;
                core collapses → supernova
              </li>
              <li>
                <strong className="text-foreground">
                  Supernova / neutron star merger:
                </strong>{" "}
                r-process (rapid neutron capture) builds elements heavier than
                iron — moving away from the peak, requiring energy input from
                the explosion
              </li>
            </ul>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════
            NEW SECTION 5: Valley of Stability and Nuclear Chart
        ══════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="atom-valley-stability"
          title="Valley of Stability and the Chart of Nuclides"
          badge={<AudienceBadge level="intermediate" />}
          defaultOpen={false}
          data-ocid="basics.valley_stability_section"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Plot all known nuclides on a grid of proton number Z (y-axis) vs.
            neutron number N (x-axis): this is the{" "}
            <strong className="text-foreground">Chart of Nuclides</strong>
            (also called the Segrè chart). As of AME2020, 2,512 nuclides have
            been experimentally characterized. Only ~254 are stable; the
            remainder decay on timescales from 10²⁴ years (Bi-209) to
            nanoseconds (extreme neutron-rich or proton-rich species).
            <CitationMarker refId={9} />
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-5 text-sm text-muted-foreground">
            <div className="rounded-lg bg-muted/30 border border-border p-3">
              <p className="font-semibold text-foreground mb-1">
                Light Nuclei (Z &lt; 20)
              </p>
              <p>
                N ≈ Z for stability (N/Z ≈ 1.0–1.1). Coulomb repulsion is weak;
                the SEMF asymmetry term drives N = Z. Example: ¹²C (Z=N=6), ¹⁶O
                (Z=N=8).
              </p>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-3">
              <p className="font-semibold text-foreground mb-1">
                Heavy Nuclei (Z &gt; 20)
              </p>
              <p>
                N &gt; Z needed to offset Coulomb repulsion with additional
                strong-force binding. For Pb-208: Z=82, N=126, N/Z = 1.54. For
                U-238: N/Z = 1.59.
              </p>
            </div>
            <div className="rounded-lg bg-blue-400/5 border border-blue-400/20 p-3">
              <p className="font-semibold text-blue-400 mb-1">
                Above the valley (neutron-rich)
              </p>
              <p>
                β⁻ decay: n → p + e⁻ + ν̄ₑ. Increases Z, decreases N, moves
                diagonally toward the valley. At extreme N: neutron drip line (N
                too large to bind).
              </p>
            </div>
            <div className="rounded-lg bg-amber-400/5 border border-amber-400/20 p-3">
              <p className="font-semibold text-amber-400 mb-1">
                Below the valley (proton-rich)
              </p>
              <p>
                β⁺ decay or electron capture (EC): p → n. Decreases Z, increases
                N. At extreme Z: proton drip line (proton emission direct).{" "}
              </p>
            </div>
          </div>

          {/* Nuclear drip lines sub-section */}
          <div className="border border-border rounded-lg mb-4">
            <button
              type="button"
              onClick={() => toggle("drip-lines")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["drip-lines"]}
              data-ocid="basics.drip_lines_toggle"
            >
              <span className="text-sm">
                Nuclear Drip Lines: The Limits of Existence
              </span>
              <span className="text-xs text-muted-foreground">
                {open["drip-lines"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["drip-lines"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  Nuclear existence is bounded by the{" "}
                  <strong className="text-foreground">drip lines</strong> — the
                  limits beyond which adding another proton or neutron produces
                  an unbound nucleus (the nucleon "drips off" immediately, T½
                  &lt; 10⁻²¹ s):
                </p>
                <ul className="ml-4 space-y-2 list-disc">
                  <li>
                    <strong className="text-foreground">
                      Proton drip line:
                    </strong>{" "}
                    Experimentally well-mapped up to Z~82. Beyond it, the last
                    proton has negative separation energy Sₚ &lt; 0 and tunnels
                    through the Coulomb barrier. Well-studied examples: ¹⁰¹Sn,
                    ¹⁰⁵Sb.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Neutron drip line:
                    </strong>{" "}
                    Experimentally reached only up to ~Z≈10 (Neon isotopes); all
                    heavier isotopes beyond the drip line are predicted but
                    unmeasured. The neutron drip line is critically important
                    for understanding neutron star crusts and r-process
                    nucleosynthesis. Recent RIKEN/RIBF experiments have pushed
                    the drip line to Ne-35 (Z=10, N=25, 2023).
                  </li>
                  <li>
                    <strong className="text-foreground">Halo nuclei:</strong>{" "}
                    Near the neutron drip line, certain nuclei form extended
                    neutron halos — one or two loosely bound "valence" neutrons
                    orbiting far outside the nuclear core. Classic example: ¹¹Li
                    (Z=3, N=8), with a matter radius nearly as large as ²⁰⁸Pb.
                    First discovered by Tanihata et al. (1985).
                  </li>
                </ul>
                <p>
                  Mapping the neutron drip line is a primary goal of Radioactive
                  Ion Beam (RIB) facilities: RIKEN-RIBF (Japan), FRIB (Michigan
                  State, USA), FAIR (GSI, Germany), ISOLDE (CERN, Switzerland).
                  <CitationMarker refId={17} />
                </p>
              </div>
            )}
          </div>

          {/* Stability and decay modes sub-section */}
          <div className="border border-border rounded-lg mb-4">
            <button
              type="button"
              onClick={() => toggle("valley-decay")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["valley-decay"]}
              data-ocid="basics.valley_decay_toggle"
            >
              <span className="text-sm">
                Decay Mode Patterns Across the Chart
              </span>
              <span className="text-xs text-muted-foreground">
                {open["valley-decay"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["valley-decay"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  The chart of nuclides is traditionally color-coded by dominant
                  decay mode:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      color:
                        "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
                      mode: "Stable (black/green)",
                      desc: "~254 nuclides; define the spine of the valley",
                    },
                    {
                      color:
                        "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
                      mode: "β⁻ decay (blue)",
                      desc: "Neutron-rich side; most common decay mode (~1,000 nuclides)",
                    },
                    {
                      color:
                        "bg-orange-500/20 border-orange-500/40 text-orange-400",
                      mode: "β⁺/EC (orange/red)",
                      desc: "Proton-rich side; EC competes with β⁺ for heavy nuclei",
                    },
                    {
                      color: "bg-rose-500/20 border-rose-500/40 text-rose-400",
                      mode: "α decay (yellow)",
                      desc: "Heavy nuclei (Z>82); simultaneous reduction of Z and N by 2",
                    },
                    {
                      color:
                        "bg-purple-500/20 border-purple-500/40 text-purple-400",
                      mode: "Spontaneous fission (SF)",
                      desc: "Very heavy nuclei (Z>90); increases rapidly with Z",
                    },
                    {
                      color: "bg-blue-500/20 border-blue-500/40 text-blue-400",
                      mode: "Proton/neutron emission",
                      desc: "Near drip lines; characteristic of extreme N or Z excess",
                    },
                  ].map((item) => (
                    <div
                      key={item.mode}
                      className={`rounded border p-2 ${item.color.replace("text-", "").split(" ")[0]} border-${item.color.split(" ")[1]}`}
                    >
                      <p
                        className={`font-semibold text-xs ${item.color.split(" ")[2]}`}
                      >
                        {item.mode}
                      </p>
                      <p className="text-xs mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs">
                  See the interactive Decay Chain Explorer and Chart of Nuclides
                  visualization on this site for hands-on exploration of these
                  patterns.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Lightest and heaviest stable nuclides:
              </strong>{" "}
              The lightest nucleus is ¹H (a single proton; T½ = infinite within
              current experimental limits). The heaviest stable nuclide is ²⁰⁸Pb
              (Z=82, N=126, doubly magic). Bi-209 (Z=83), long considered
              stable, was shown by Marcillac et al. (2003) to alpha-decay with
              T½ = 2.01 × 10¹⁹ yr — 1.4 billion times the age of the universe.
              <CitationMarker refId={10} />
            </p>
            <p>
              <strong className="text-foreground">
                Transuranium elements:
              </strong>{" "}
              All elements beyond uranium (Z &gt; 92) are absent from nature (or
              present in only trace amounts from natural fission or cosmic-ray
              spallation) because they have no stable isotopes and all have
              half-lives far shorter than Earth's age. They are produced
              synthetically in reactors (elements 93–100) or heavy-ion
              accelerators (elements 101–118). The longest-lived transuranic
              nuclide is Np-237 (T½ = 2.14 × 10⁶ yr), produced in trace
              quantities by neutron capture on U-235 in nuclear reactors.
            </p>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════
            NEW SECTION 6: Isotopes, Isobars, Isotones, Isomers
        ══════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="atom-nuclide-types"
          title="Isotopes, Isobars, Isotones, and Nuclear Isomers"
          badge={<AudienceBadge level="intermediate" />}
          defaultOpen={false}
          data-ocid="basics.nuclide_types_section"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nuclides are classified by which nuclear quantum numbers they share.
            Understanding this taxonomy is essential for reading the Chart of
            Nuclides, for nuclear medicine (isomers), and for reactor physics
            (isotopes).
          </p>

          <div className="overflow-x-auto mb-4">
            <table
              className="w-full text-sm"
              aria-label="Types of nuclides classified by shared quantum numbers"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Type
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Definition
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-foreground">
                    Example
                  </th>
                  <th className="pb-2 font-semibold text-foreground">
                    Significance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {nuclideTypes.map((t) => (
                  <tr key={t.type} className="text-muted-foreground align-top">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {t.type}
                    </td>
                    <td className="py-2 pr-3 text-xs">{t.definition}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{t.example}</td>
                    <td className="py-2 text-xs">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nuclear isomers deep-dive */}
          <div className="border border-border rounded-lg mb-4">
            <button
              type="button"
              onClick={() => toggle("isomers-detail")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["isomers-detail"]}
              data-ocid="basics.isomers_toggle"
            >
              <span className="text-sm">
                Nuclear Isomers in Depth: From Medicine to Energy Storage
              </span>
              <span className="text-xs text-muted-foreground">
                {open["isomers-detail"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["isomers-detail"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  A nuclear isomer (metastable state, denoted "m") is an excited
                  nuclear energy level whose transition to the ground state is
                  significantly hindered — often by a large angular momentum
                  difference (high multipolarity) between the isomeric and
                  ground states.
                  <CitationMarker refId={8} />
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded bg-muted/40 p-3">
                    <p className="font-semibold text-foreground mb-1">
                      ⁹⁹ᵐTc — Medical Imaging
                    </p>
                    <ul className="space-y-0.5 text-xs list-disc ml-3">
                      <li>
                        Excitation energy: 140.51 keV above ⁹⁹Tc ground state
                      </li>
                      <li>T½ = 6.0067 h (ideal for transport and imaging)</li>
                      <li>
                        Pure γ emission at 140.5 keV (no α or β — minimizes
                        dose)
                      </li>
                      <li>Used in &gt;20 million SPECT scans/year worldwide</li>
                      <li>
                        Produced via Mo-99 → Tc-99m via β⁻ decay (T½ = 65.94 h)
                      </li>
                    </ul>
                  </div>
                  <div className="rounded bg-muted/40 p-3">
                    <p className="font-semibold text-foreground mb-1">
                      ¹⁷⁸ᵐ²Hf — Gamma-Ray Research
                    </p>
                    <ul className="space-y-0.5 text-xs list-disc ml-3">
                      <li>Excitation energy: 2,446 keV (2.45 MeV!)</li>
                      <li>
                        T½ = 31 years (unusually long for a high-energy isomer)
                      </li>
                      <li>Investigated as theoretical energy storage medium</li>
                      <li>Transition hindered by ΔJ = 8 (K isomer)</li>
                      <li>
                        Energy density: ~1.3 GJ/g — if triggered, 10⁶× chemical
                        fuels
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  Isomers arise when the nuclear excited state has a spin/parity
                  configuration that requires a high-order (E2, M3, M4…)
                  multipole γ transition, which is strongly suppressed by the
                  Weisskopf single-particle estimates. The longer the half-life,
                  the higher the multipolarity difference or the smaller the
                  transition energy.
                </p>
                <p>
                  <strong className="text-foreground">K-isomers</strong> in
                  deformed nuclei arise from the projection of angular momentum
                  on the symmetry axis (quantum number K). Transitions that
                  change K by more than the transition multipolarity are
                  K-forbidden — the origin of extraordinarily long-lived isomers
                  like ¹⁷⁸ᵐ²Hf.
                </p>
              </div>
            )}
          </div>

          {/* Naturally occurring isotopes */}
          <div className="border border-border rounded-lg">
            <button
              type="button"
              onClick={() => toggle("isotope-abundance")}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
              aria-expanded={!!open["isotope-abundance"]}
              data-ocid="basics.isotope_abundance_toggle"
            >
              <span className="text-sm">
                Isotopic Abundances and Their Determination
              </span>
              <span className="text-xs text-muted-foreground">
                {open["isotope-abundance"] ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
            {open["isotope-abundance"] && (
              <div className="p-4 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>
                  Natural elements are mixtures of isotopes with fixed
                  fractional abundances (for most elements) determined by
                  nucleosynthesis in stars and the subsequent evolution of the
                  solar system. IUPAC maintains the Commission on Isotopic
                  Abundances and Atomic Weights (CIAAW), which publishes
                  recommended atomic weight values.
                </p>
                <p>Selected examples of isotopic composition (IUPAC 2021):</p>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-xs"
                    aria-label="Natural isotopic abundances of selected elements"
                  >
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 pr-3 font-semibold text-foreground">
                          Element
                        </th>
                        <th className="pb-2 pr-3 font-semibold text-foreground">
                          Isotope
                        </th>
                        <th className="pb-2 pr-3 font-semibold text-foreground text-right">
                          Natural abundance (%)
                        </th>
                        <th className="pb-2 font-semibold text-foreground">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {[
                        ["Hydrogen", "¹H", "99.9885", "Protium"],
                        [
                          "Hydrogen",
                          "²H (D)",
                          "0.0115",
                          "Deuterium; used as reactor moderator",
                        ],
                        [
                          "Carbon",
                          "¹²C",
                          "98.93",
                          "Mass standard (defines 1 u)",
                        ],
                        ["Carbon", "¹³C", "1.07", "Used in NMR spectroscopy"],
                        ["Oxygen", "¹⁶O", "99.757", "Magic N=Z=8"],
                        [
                          "Uranium",
                          "²³⁵U",
                          "0.720",
                          "Fissile; enriched for reactors and weapons",
                        ],
                        [
                          "Uranium",
                          "²³⁸U",
                          "99.274",
                          "Fertile; transmutes to Pu-239 in reactor",
                        ],
                        [
                          "Boron",
                          "¹⁰B",
                          "19.9",
                          "Strong neutron absorber; control rods",
                        ],
                        [
                          "Boron",
                          "¹¹B",
                          "80.1",
                          "Non-absorbing; natural abundance dominates",
                        ],
                      ].map(([el, iso, ab, note]) => (
                        <tr key={iso} className="text-muted-foreground">
                          <td className="py-1.5 pr-3">{el}</td>
                          <td className="py-1.5 pr-3 font-mono">{iso}</td>
                          <td className="py-1.5 pr-3 text-right font-mono text-primary">
                            {ab}
                          </td>
                          <td className="py-1.5 text-xs">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Isotopic abundances are measured by{" "}
                  <strong className="text-foreground">mass spectrometry</strong>{" "}
                  (TIMS, ICP-MS, IRMS). Small variations in natural abundances —
                  isotope fractionation — are exploited in geochemistry (dating)
                  and environmental science (tracing pollution sources, climate
                  records in ice cores).
                  <CitationMarker refId={13} />
                </p>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* ── Navigation ── */}
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="text-sm text-muted-foreground self-center">
            Continue exploring:
          </span>
          {subpages.map((sp) => (
            <Button
              key={sp.href}
              asChild
              variant="outline"
              size="sm"
              data-ocid={`basics.continue_${sp.label.toLowerCase().replace(/\s/g, "_")}`}
            >
              <Link to={sp.href}>
                {sp.label}{" "}
                <ChevronRight className="ml-1 h-3 w-3" aria-hidden="true" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
