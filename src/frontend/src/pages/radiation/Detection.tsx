import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

// ── Shared data ──────────────────────────────────────────────────────────────

const detectors = [
  {
    name: "Geiger-Müller (GM) Counter",
    principle:
      "Ionizing radiation creates ion pairs in a gas-filled tube, generating an electrical pulse counted by electronics. Simple, robust, inexpensive.",
    strengths:
      "Excellent for count rate measurement. Responds to alpha, beta, gamma. Simple to use.",
    limitations:
      "Limited energy resolution — cannot distinguish photon energies. Susceptible to dead-time at high rates.",
    applications: [
      "Contamination surveys",
      "Personnel dosimetry",
      "Classroom demonstrations",
    ],
    color: "border-emerald-400/30 bg-emerald-400/5",
  },
  {
    name: "Scintillation Detector",
    principle:
      "Radiation excites a scintillator material (NaI(Tl), BGO, plastic), which emits light photons detected by a photomultiplier tube (PMT) or silicon photomultiplier (SiPM).",
    strengths:
      "Moderate energy resolution (NaI ~7% at 662 keV). High efficiency for gamma detection. Fast response.",
    limitations:
      "Hygroscopic (NaI). Moderate energy resolution limits isotope identification.",
    applications: [
      "Gamma spectroscopy",
      "Medical imaging (PET/SPECT)",
      "Portal monitors",
    ],
    color: "border-blue-400/30 bg-blue-400/5",
  },
  {
    name: "Semiconductor Detector",
    principle:
      "High-purity germanium (HPGe) or silicon detectors create electron-hole pairs directly. Excellent energy resolution due to low bandgap.",
    strengths:
      "Outstanding energy resolution (~0.2% at 1.33 MeV for HPGe). Enables precise isotope identification.",
    limitations:
      "HPGe must be cooled to liquid nitrogen temperature (77 K). Expensive. Fragile.",
    applications: [
      "Nuclear safeguards inspections",
      "Environmental monitoring",
      "Research laboratories",
    ],
    color: "border-purple-400/30 bg-purple-400/5",
  },
];

const scintillatorTable: [string, string, string, string, string, string][] = [
  [
    "NaI(Tl)",
    "3.67",
    "415 nm",
    "250 ns",
    "~7% @ 662 keV",
    "Standard gamma spec, field surveys, SPECT",
  ],
  [
    "CsI(Tl)",
    "4.51",
    "550 nm",
    "1,000 ns",
    "~8% @ 662 keV",
    "Portal monitors, non-hygroscopic applications",
  ],
  [
    "BGO",
    "7.13",
    "480 nm",
    "300 ns",
    "10–15% @ 662 keV",
    "PET rings (high Z for 511 keV efficiency)",
  ],
  [
    "LaBr₃(Ce)",
    "5.06",
    "380 nm",
    "16 ns",
    "~2.5–3% @ 662 keV",
    "High-res portable spec, safeguards, fast timing",
  ],
  [
    "GAGG:Ce",
    "6.63",
    "520 nm",
    "90 ns",
    "~4–5% @ 662 keV",
    "Modern portable detectors, non-hygroscopic",
  ],
  [
    "Plastic (BC-408)",
    "1.03",
    "425 nm",
    "2.1 ns",
    "Poor (no photoelectric)",
    "Beta, fast neutron via PSD, charged particles",
  ],
  [
    "Stilbene",
    "1.16",
    "390 nm",
    "4 ns",
    "Poor",
    "n-γ discrimination (PSD), fast neutrons",
  ],
  [
    "Liquid (EJ-301)",
    "0.87",
    "425 nm",
    "3.2 ns",
    "Poor",
    "Tritium/C-14 counting, n-γ PSD",
  ],
];

const neutronDetectorTable: [string, string, string, string][] = [
  [
    "BF₃ proportional counter",
    "¹⁰B + n → ⁷Li + ⁴He",
    "3,840 b @ 0.025 eV",
    "Thermal neutron flux; intrinsic gamma-blind",
  ],
  [
    "³He proportional counter",
    "³He + n → ³H + p + 0.764 MeV",
    "5,330 b @ 0.025 eV",
    "Best thermal sensitivity; ³He shortage since ~2009",
  ],
  [
    "Li-6 glass scintillator",
    "⁶Li + n → ⁴He + ³H + 4.78 MeV",
    "940 b @ 0.025 eV (⁶Li)",
    "Fast response; used with PMT; fast/thermal n detection",
  ],
  [
    "Boron-coated straw",
    "¹⁰B coating on inner tube wall",
    "~3,840 b",
    "³He replacement; portal monitors, homeland security",
  ],
  [
    "CLYC (Cs₂LiYCl₆:Ce)",
    "⁶Li capture + scintillation",
    "~940 b (⁶Li)",
    "Simultaneous n-γ discrimination; dual-mode PSD+energy",
  ],
  [
    "Fission chamber (U-235)",
    "²³⁵U + n → fission fragments",
    "585 b @ thermal",
    "High-flux environments (reactor cores, NPP monitoring)",
  ],
  [
    "Organic scintillator + PSD",
    "Proton recoil in H-rich medium",
    "n/a",
    "Fast neutrons; n-γ separation by pulse shape analysis",
  ],
];

const spectrumFeatures: {
  label: string;
  description: string;
  color: string;
}[] = [
  {
    label: "Full-Energy Peak (Photoelectric)",
    description:
      "All gamma energy deposited in one interaction. Appears as a sharp Gaussian at E = E_γ. Peak area is proportional to activity; FWHM determines energy resolution.",
    color: "border-emerald-400/30 bg-emerald-400/5",
  },
  {
    label: "Compton Continuum",
    description:
      "Continuum from zero to the Compton edge. Partial energy transfer via Compton scatter — electron escapes detector with remainder. Feature below every full-energy peak.",
    color: "border-blue-400/30 bg-blue-400/5",
  },
  {
    label: "Compton Edge",
    description:
      "Sharp drop at maximum Compton electron energy (θ = 180°). Position = E_γ − E_γ / (1 + 2E_γ / 0.511 MeV). Example: Cs-137 662 keV → Compton edge at 477 keV.",
    color: "border-blue-400/30 bg-blue-400/5",
  },
  {
    label: "Backscatter Peak",
    description:
      "Photons Compton-scattered backward (θ ≈ 180°) in shielding material re-enter detector with energy E_bs = E_γ − E_Compton_edge ≈ 180–200 keV, nearly independent of E_γ.",
    color: "border-amber-400/30 bg-amber-400/5",
  },
  {
    label: "Single Escape Peak",
    description:
      "When E_γ > 1.022 MeV, pair production occurs. One 511 keV photon escapes the detector. Peak at E_γ − 511 keV.",
    color: "border-purple-400/30 bg-purple-400/5",
  },
  {
    label: "Double Escape Peak",
    description:
      "Both 511 keV annihilation photons escape. Peak at E_γ − 1,022 keV. Only present when E_γ > ~2 MeV; most prominent in small detectors.",
    color: "border-purple-400/30 bg-purple-400/5",
  },
  {
    label: "Sum Peak",
    description:
      "Two gammas detected simultaneously. Appears at E₁ + E₂. Artifact of high count rates or detector geometry. Example: Co-60 has 1173 + 1332 keV sum peak at 2505 keV.",
    color: "border-rose-400/30 bg-rose-400/5",
  },
  {
    label: "X-Ray Fluorescence Peak",
    description:
      "Characteristic X-rays from photoelectric interactions in detector casing or nearby material. Pb K-alpha ≈ 75 keV is common in shielded systems.",
    color: "border-border bg-muted/20",
  },
];

// ── Local CollapsibleSection ──────────────────────────────────────────────────

interface CollapsibleSectionProps {
  id: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}

function CollapsibleSection({
  id,
  title,
  badge,
  children,
  open,
  onToggle,
}: CollapsibleSectionProps) {
  return (
    <SectionCard
      data-ocid={`detection.${id}_card`}
      className="p-0 overflow-hidden"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/20 transition-colors"
        aria-expanded={open}
        data-ocid={`detection.${id}_toggle`}
      >
        <span className="flex items-center gap-3">
          <span className="font-display text-lg font-semibold text-foreground">
            {title}
          </span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium">
              {badge}
            </span>
          )}
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-border">
          {children}
        </div>
      )}
    </SectionCard>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export default function RadiationDetection() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    gm_tubes: false,
    scintillation: false,
    semiconductors: false,
    neutron_detection: false,
    gamma_spectrometry: false,
  });

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Radiation Detection"
        subtitle="How physicists and safety professionals detect, measure, and identify radiation using gas-filled tubes, scintillators, and semiconductor detectors."
        audienceLevel="intermediate"
        readTimeMin={28}
      />

      <div className="grid gap-6">
        {/* ── Intro ── */}
        <SectionCard data-ocid="detection.intro_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Detection Principles
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            All radiation detectors share a common principle: ionizing radiation
            deposits energy in a detector medium, which converts that energy
            into a measurable signal — an electrical pulse, light flash, or
            charge. The key properties of any detector are{" "}
            <strong className="text-foreground">efficiency</strong> (what
            fraction of incident radiation is detected),{" "}
            <strong className="text-foreground">energy resolution</strong>{" "}
            (ability to distinguish different photon energies), and{" "}
            <strong className="text-foreground">response time</strong>.
          </p>
        </SectionCard>

        {/* ── Detector overview cards ── */}
        <div className="grid gap-5">
          {detectors.map((d, i) => (
            <div
              key={d.name}
              className={`rounded-xl border p-5 ${d.color}`}
              data-ocid={`detection.detector_card.${i + 1}`}
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {d.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {d.principle}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Strengths
                  </p>
                  <p className="text-muted-foreground">{d.strengths}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Limitations
                  </p>
                  <p className="text-muted-foreground">{d.limitations}</p>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-current/20">
                <p className="text-xs font-semibold text-foreground mb-1">
                  Applications
                </p>
                <ul className="flex flex-wrap gap-2 list-none">
                  {d.applications.map((a) => (
                    <li
                      key={a}
                      className="text-xs rounded-full border border-current/20 px-2 py-0.5 text-muted-foreground"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── Dosimetry Basics ── */}
        <SectionCard data-ocid="detection.dose_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Dosimetry Basics
          </h2>
          <p className="text-muted-foreground mb-4">
            Radiation dose quantifies the biological impact of exposure. The
            absorbed dose (Gray) measures physical energy deposition; the
            effective dose (Sievert) weights by radiation type and tissue
            sensitivity:
          </p>
          <EquationBlock
            latex="H = D \\cdot w_R"
            annotation="Equivalent dose H (Sieverts) equals absorbed dose D (Grays) multiplied by the radiation weighting factor w_R. For gamma rays, w_R = 1; for alpha particles, w_R = 20."
            label="Equivalent Dose"
          />
          <div className="mt-4 grid gap-2 sm:grid-cols-3 text-sm">
            {[
              [
                "Background radiation",
                "~2.4 mSv/yr",
                "Global average (UNSCEAR)",
              ],
              ["Chest X-ray", "~0.1 mSv", "Single procedure"],
              ["Annual occupational limit", "20 mSv/yr", "IAEA recommended"],
            ].map(([label, value, note]) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-muted/30 p-3"
              >
                <p className="font-semibold text-foreground text-xs mb-1">
                  {label}
                </p>
                <p className="font-mono text-primary font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{note}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — Geiger-Müller Tubes
        ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="gm_tubes"
          title="Geiger-Müller Tubes: Gas Ionization Detectors"
          badge="Intermediate"
          open={open.gm_tubes}
          onToggle={() => toggle("gm_tubes")}
        >
          <div className="pt-4 space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              A Geiger-Müller (GM) tube is a cylindrical gas-filled detector
              with a central anode wire and an outer cathode. Radiation ionizes
              the fill gas (typically a noble gas — Ne or He — with a halogen
              quench gas such as Br₂ or Cl₂ at ~0.1% partial pressure). A high
              voltage of <strong className="text-foreground">600–900 V</strong>{" "}
              is applied between anode and cathode.
            </p>

            {/* Operating mechanism */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Townsend Avalanche and the Geiger Region
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                When an ion pair is created by radiation, the primary electron
                accelerates toward the anode. In the intense electric field near
                the thin anode wire (~10⁴–10⁵ V/cm), the electron gains enough
                energy to ionize more gas atoms — triggering a self-propagating{" "}
                <strong className="text-foreground">Townsend avalanche</strong>.
                Crucially, this avalanche propagates along the entire length of
                the anode by UV photons exciting gas molecules, causing
                additional electron cascades.
              </p>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">
                    Key property of the Geiger region:
                  </strong>{" "}
                  Every ionizing event — regardless of whether 1 or 1,000 ion
                  pairs were originally produced — triggers the same saturated
                  avalanche and produces the same size output pulse (~1–2 V).
                  This means the GM tube is excellent for <em>counting</em>{" "}
                  radiation events but provides{" "}
                  <strong className="text-foreground">
                    zero energy information
                  </strong>
                  . A 50 keV gamma and a 1 MeV gamma produce identical output
                  pulses.
                </p>
              </div>
            </div>

            {/* Quenching */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Quenching: Halting the Discharge
              </h4>
              <p className="text-sm text-muted-foreground">
                Without a quench gas, positive ion sheaths migrating toward the
                cathode would eject electrons upon impact, re-triggering the
                discharge indefinitely. Halogen molecules (Cl₂, Br₂) absorb UV
                photons and quench the discharge chemically:{" "}
                <em>
                  halogen ion + cathode → neutral halogen molecule + cathode
                </em>
                . Halogen-quenched tubes self-regenerate (halogen dissociates
                and recombines), giving effectively unlimited lifetime — unlike
                older organic (ethanol) quenched tubes that consumed the quench
                gas irreversibly after ~10⁸ counts.
              </p>
            </div>

            {/* Dead Time */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Dead Time and Count Rate Correction
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                After each discharge, the positive ion sheath suppresses the
                electric field near the anode. The tube is insensitive to new
                radiation events for a{" "}
                <strong className="text-foreground">
                  dead time τ ≈ 100–300 μs
                </strong>
                . At high count rates, a significant fraction of events are
                missed. The true count rate n is recovered from the observed
                count rate m by:
              </p>
              <EquationBlock
                latex="n = \\frac{m}{1 - m \\cdot \\tau}"
                annotation="Dead time correction. n = true count rate (counts/s); m = measured count rate (counts/s); τ = dead time (seconds). At m = 1,000 cps and τ = 200 μs: n = 1,000 / (1 − 0.2) = 1,250 cps — 25% undercount. At m = 10,000 cps: the tube is paralyzed (mτ ≈ 2); the formula breaks down and a non-paralyzable (Type I) or paralyzable (Type II) model must be used."
                label="Dead Time Correction (non-paralyzable model)"
              />
              <p className="text-sm text-muted-foreground mt-2">
                For most radiation protection surveys, count rates are low
                enough that dead time is negligible. High-flux environments
                (near reactor cores, accelerator targets) require proportional
                counters or ionization chambers instead.
              </p>
            </div>

            {/* Efficiency by radiation type */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Detection Efficiency by Radiation Type
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    type: "Alpha (α)",
                    efficiency: "~100% (thin window)",
                    color: "border-rose-400/30 bg-rose-400/5",
                    detail:
                      "Alpha particles are highly ionizing but have very short range (~4 cm in air). They must enter through a thin mica end-window (≤2 mg/cm²) — pancake GM configuration. Stopped completely by glass or standard tube walls.",
                  },
                  {
                    type: "Beta (β)",
                    efficiency: "~90% (direct ionization)",
                    color: "border-blue-400/30 bg-blue-400/5",
                    detail:
                      "Beta particles directly ionize the fill gas. Efficiency is high for most beta energies. Very low-energy betas (e.g., H-3, C-14) are stopped by the window — require liquid scintillation counting instead.",
                  },
                  {
                    type: "Gamma (γ)",
                    efficiency: "~1% (wall interaction)",
                    color: "border-purple-400/30 bg-purple-400/5",
                    detail:
                      "Gamma photons rarely interact with the low-density fill gas directly. Efficiency comes almost entirely from photoelectrons ejected from the cathode walls. Low Z and thin walls mean only ~1% of gammas are detected — adequate for contamination surveys but not spectrometry.",
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className={`rounded-lg border p-4 ${item.color}`}
                  >
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {item.type}
                    </p>
                    <p className="font-mono text-xs font-bold text-primary mb-2">
                      {item.efficiency}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                Typical Applications
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-none">
                <li>
                  <strong className="text-foreground">
                    Radiation survey meters (Geiger probes):
                  </strong>{" "}
                  Standard contamination check instruments used in nuclear power
                  plants, hospitals, and research labs; respond in real-time
                  with audible click-per-count output.
                </li>
                <li>
                  <strong className="text-foreground">
                    Personnel dosimetry alarms:
                  </strong>{" "}
                  Small electronic personal dosimeters with GM or proportional
                  counter elements provide real-time dose rate display and
                  audible alarms at set thresholds.
                </li>
                <li>
                  <strong className="text-foreground">
                    Pancake GM probes:
                  </strong>{" "}
                  Thin mica end-window allows alpha/beta surface contamination
                  monitoring; standard instrument for soil, bench, and
                  hand-and-foot contamination checks.
                </li>
                <li>
                  <strong className="text-foreground">
                    Portal radiation monitors:
                  </strong>{" "}
                  Large-area GM arrays or ionization chambers at building exits
                  and nuclear facility perimeters detect contaminated
                  individuals or materials.
                </li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — Scintillation Detectors
        ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="scintillation"
          title="Scintillation Detectors: Crystals, Plastics, and Photodetectors"
          badge="Advanced"
          open={open.scintillation}
          onToggle={() => toggle("scintillation")}
        >
          <div className="pt-4 space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              Scintillation detectors convert radiation energy into visible or
              near-UV light, which is then converted to an electronic pulse by a
              photodetector. The pulse height is proportional to the energy
              deposited, enabling{" "}
              <strong className="text-foreground">
                gamma-ray spectroscopy
              </strong>
              . Three stages determine performance: (1) scintillation yield
              (photons per keV), (2) photodetector quantum efficiency, and (3)
              statistical variance in photon collection — together these
              determine energy resolution.
            </p>

            {/* PMT and SiPM */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-muted/20 p-5">
                <h4 className="font-semibold text-foreground mb-2">
                  Photomultiplier Tube (PMT)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The classical photodetector. Light photons strike a
                  photocathode (bialkali material, quantum efficiency ~25%),
                  ejecting a photoelectron. Typically 8–14 dynodes successively
                  multiply the electrons by a factor of ~6–8 each, yielding a
                  total gain of{" "}
                  <strong className="text-foreground">10⁵–10⁷</strong>. Output
                  pulse arrives at the anode within a few nanoseconds — enabling
                  coincidence timing in PET at sub-nanosecond resolution.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-none">
                  <li>· High gain (~10⁶), low noise</li>
                  <li>· Fast: few-ns rise time</li>
                  <li>· Requires ~1,000 V bias voltage</li>
                  <li>
                    · Sensitive to magnetic fields (→ SiPM preferred for
                    MRI-PET)
                  </li>
                  <li>· Fragile: glass vacuum tube; shock-sensitive</li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                <h4 className="font-semibold text-foreground mb-2">
                  Silicon Photomultiplier (SiPM)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  An array of Geiger-mode avalanche photodiodes (micro-APDs,
                  ~10–100 μm pitch) operating just above breakdown voltage. Each
                  micro-APD fires a fixed-amplitude Geiger discharge when struck
                  by a photon; total output is the sum of all fired cells —
                  proportional to photon count (provided illumination is below
                  cell density saturation). Gain ~10⁵–10⁶.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-none">
                  <li>· Low bias voltage: 25–75 V (vs. ~1,000 V for PMT)</li>
                  <li>· Rugged: solid-state; vibration resistant</li>
                  <li>· Magnetic-field tolerant: used in MRI-PET scanners</li>
                  <li>· High quantum efficiency: ~50–60% (vs. ~25% for PMT)</li>
                  <li>· Temperature-dependent gain → stabilization needed</li>
                </ul>
              </div>
            </div>

            {/* Energy resolution */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Energy Resolution — Sources of Broadening
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Energy resolution R (%) = FWHM / E_peak × 100. For NaI(Tl) at
                662 keV, R ≈ 7%. The dominant contributions:
              </p>
              <EquationBlock
                latex="R^2 = R_{\\rm stat}^2 + R_{\\rm inh}^2 + R_{\\rm collect}^2"
                annotation="Quadrature sum of resolution contributions: R_stat (statistical fluctuation in scintillation photon number, scales as 1/√N_ph — larger light yield → better resolution); R_inh (crystal non-uniformity, local light yield variations, impurity clustering in crystal growth); R_collect (light collection non-uniformity — optical coupling, reflector efficiency, solid angle to PMT photocathode). For NaI at 662 keV: N_ph ≈ 38,000 photons — statistical limit alone would give R_stat ≈ 0.5%, but other terms broaden resolution to 7%."
                label="Scintillator Energy Resolution Components"
              />
            </div>

            {/* Scintillator comparison table */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Scintillator Properties Comparison
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Sources: Saint-Gobain detector product guides; IEEE Trans. Nucl.
                Sci. review literature; IAEA-TECDOC-1539.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      {[
                        "Scintillator",
                        "Density (g/cm³)",
                        "Peak emission",
                        "Decay time",
                        "Energy resolution",
                        "Key applications",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left py-2 pr-3 text-muted-foreground font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scintillatorTable.map((row) => (
                      <tr
                        key={row[0]}
                        className="border-b border-border/50 hover:bg-muted/20"
                      >
                        <td className="py-2 pr-3 text-foreground font-semibold font-mono">
                          {row[0]}
                        </td>
                        <td className="py-2 pr-3 text-right text-foreground font-mono">
                          {row[1]}
                        </td>
                        <td className="py-2 pr-3 text-foreground font-mono">
                          {row[2]}
                        </td>
                        <td className="py-2 pr-3 text-foreground font-mono">
                          {row[3]}
                        </td>
                        <td className="py-2 pr-3 text-primary font-mono font-semibold">
                          {row[4]}
                        </td>
                        <td className="py-2 text-muted-foreground">{row[5]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PSD */}
            <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                Pulse Shape Discrimination (PSD) — Neutron vs. Gamma Separation
              </h4>
              <p className="text-sm text-muted-foreground">
                Certain organic scintillators (stilbene, EJ-301/EJ-309 liquid,
                CLYC crystals) produce pulses with different time profiles for
                neutron vs. gamma interactions. Proton recoil (from fast
                neutrons) yields a longer tail component than Compton electrons.
                Plotting charge-ratio (tail / total) vs. energy creates two
                well-separated bands in the PSD parameter space. Stilbene
                achieves figure-of-merit (FOM) &gt;2 at fast neutron energies —
                used extensively in nuclear security, fusion neutron
                diagnostics, and special nuclear material detection.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — Semiconductor Detectors
        ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="semiconductors"
          title="Semiconductor Detectors: HPGe, Si, and CZT"
          badge="Advanced"
          open={open.semiconductors}
          onToggle={() => toggle("semiconductors")}
        >
          <div className="pt-4 space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              Semiconductor detectors operate as solid-state ionization
              chambers. Radiation creates electron-hole pairs directly in the
              detector crystal. An applied reverse-bias voltage sweeps carriers
              to electrodes, producing a pulse height proportional to deposited
              energy. The key advantage is the small average energy per
              electron-hole pair W — far below gas-filled tubes — yielding more
              carriers per keV and dramatically better statistical energy
              resolution.
            </p>

            {/* W-value comparison */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Energy per Ion Pair — The Statistical Advantage
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    material: "Gas (Ar)",
                    W: "26 eV/pair",
                    pairs_per_keV: "~38",
                    color: "border-border bg-muted/20",
                  },
                  {
                    material: "Scintillation (NaI→PMT)",
                    W: "~1,000 eV/equiv",
                    pairs_per_keV: "~1",
                    color: "border-blue-400/30 bg-blue-400/5",
                  },
                  {
                    material: "Si detector",
                    W: "3.62 eV/pair",
                    pairs_per_keV: "~276",
                    color: "border-emerald-400/30 bg-emerald-400/5",
                  },
                  {
                    material: "HPGe detector",
                    W: "2.98 eV/pair",
                    pairs_per_keV: "~336",
                    color: "border-purple-400/30 bg-purple-400/5",
                  },
                ].map((item) => (
                  <div
                    key={item.material}
                    className={`rounded-lg border p-3 ${item.color}`}
                  >
                    <p className="text-xs font-semibold text-foreground mb-1">
                      {item.material}
                    </p>
                    <p className="font-mono text-sm font-bold text-primary">
                      {item.W}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.pairs_per_keV} pairs/keV
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                More pairs per keV → smaller relative statistical fluctuation (∝
                1/√N) → better energy resolution. HPGe resolution at 1,332 keV
                (Co-60): ~1.8 keV FWHM ≈ 0.14%. NaI at same energy: ~90 keV FWHM
                ≈ 7%. Sources: ORTEC detector specifications; Knoll, "Radiation
                Detection and Measurement," 4th ed.
              </p>
            </div>

            {/* HPGe */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                High-Purity Germanium (HPGe) Detectors
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Germanium has a small bandgap (0.67 eV at 77 K) meaning thermal
                excitation at room temperature produces enough leakage current
                to swamp radiation signals.{" "}
                <strong className="text-foreground">
                  HPGe must be cooled to 77 K (−196°C, liquid nitrogen
                  temperature)
                </strong>{" "}
                to achieve usable signal-to-noise. Modern electromechanically
                cooled systems ("cryo-coolers") eliminate the need for liquid
                nitrogen but add mechanical complexity.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    HPGe Detector Geometries
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-none">
                    <li>
                      <strong className="text-foreground">
                        Coaxial (p-type or n-type):
                      </strong>{" "}
                      Cylindrical; active volumes up to ~500 cm³; standard for
                      high-efficiency gamma spectroscopy above ~100 keV.
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Planar / Low-Energy HPGe (LEGe):
                      </strong>{" "}
                      Thin contact; optimized for 3–200 keV X-ray and low-energy
                      gamma spectroscopy.
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Point-Contact (PPC):
                      </strong>{" "}
                      Very small electrode → ultra-low capacitance → extremely
                      low electronic noise; excellent for sub-keV energy
                      threshold (dark matter search experiments).
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Segmented HPGe:
                      </strong>{" "}
                      Electrode segmentation allows position determination of
                      gamma interaction site; used in Compton cameras and
                      advanced spectroscopy arrays (AGATA, GRETINA).
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Applications
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-none">
                    <li>
                      <strong className="text-foreground">
                        IAEA nuclear safeguards:
                      </strong>{" "}
                      Portable HPGe systems identify isotopic composition of
                      nuclear material (U, Pu enrichment level) at declared and
                      undeclared facilities.
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Environmental monitoring:
                      </strong>{" "}
                      Quantitative analysis of Cs-137, Co-60, Eu-152 in soil,
                      water, and air samples; critical for post-accident
                      monitoring (Fukushima, Chernobyl).
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Nuclear medicine QA:
                      </strong>{" "}
                      Radionuclide purity verification of PET and SPECT
                      radiopharmaceuticals per USP and European Pharmacopoeia
                      standards.
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Nuclear physics research:
                      </strong>{" "}
                      Gamma-ray arrays (AGATA at GANIL; GRETINA at ANL) track
                      gamma de-excitation from exotic nuclei for nuclear
                      structure studies.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Si and CZT */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5">
                <h4 className="font-semibold text-foreground mb-2">
                  Silicon Detectors
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Silicon is ideal for charged-particle spectroscopy (alpha,
                  beta, heavy ions) because its thin active layer matches the
                  short range of these particles.{" "}
                  <strong className="text-foreground">PIPS detectors</strong>{" "}
                  (Passivated Implanted Planar Silicon) achieve alpha energy
                  resolution of &lt;12 keV FWHM — enabling identification of
                  alpha emitters (Pu, Am, Cm) in environmental and waste
                  characterization measurements.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-none">
                  <li>· Can operate at room temperature</li>
                  <li>
                    · Strip detectors provide 2D position sensitivity (μm
                    precision)
                  </li>
                  <li>
                    · Used extensively in nuclear physics beamline experiments
                  </li>
                  <li>
                    · Radiation hardness matters for accelerator/space
                    applications
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5">
                <h4 className="font-semibold text-foreground mb-2">
                  CdZnTe (CZT) — Room-Temperature Semiconductor
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  CdZnTe has a bandgap of ~1.6 eV — large enough to suppress
                  thermal leakage at room temperature. High Z (Cd: 48, Te: 52)
                  gives good photoelectric efficiency for gamma rays.
                  Single-polarity charge collection (electrons only) via
                  pixelated anode geometries overcomes the poor hole mobility
                  limitation. Energy resolution: ~1–3% at 662 keV — between NaI
                  and HPGe.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-none">
                  <li>· No cryogenic cooling required → portable, compact</li>
                  <li>
                    · Used in: SPECT imaging (cardiac, brain), portal monitors,
                  </li>
                  <li>
                    &nbsp;&nbsp;portable isotope identification devices (RIID)
                  </li>
                  <li>
                    · NASA NuSTAR telescope uses CZT focal-plane detector arrays
                  </li>
                  <li>
                    · Trapping of holes in crystal defects limits resolution vs.
                    HPGe
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — Neutron Detection
        ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="neutron_detection"
          title="Neutron Detection: Conversion Reactions and Specialized Detectors"
          badge="Advanced"
          open={open.neutron_detection}
          onToggle={() => toggle("neutron_detection")}
        >
          <div className="pt-4 space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              Neutrons carry no electric charge and therefore cannot directly
              ionize detector materials. They must first be{" "}
              <strong className="text-foreground">converted</strong> to
              secondary charged particles through nuclear reactions. The choice
              of converter reaction and detector type depends critically on
              whether thermal or fast neutrons are being detected.
            </p>

            {/* Thermal neutron detection */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Thermal Neutron Conversion Reactions
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      {[
                        "Detector type",
                        "Conversion reaction",
                        "Cross-section",
                        "Key use case",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left py-2 pr-4 text-muted-foreground font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {neutronDetectorTable.map((row) => (
                      <tr
                        key={row[0]}
                        className="border-b border-border/50 hover:bg-muted/20"
                      >
                        <td className="py-2 pr-4 text-foreground font-semibold text-xs">
                          {row[0]}
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground font-mono text-xs">
                          {row[1]}
                        </td>
                        <td className="py-2 pr-4 text-primary font-mono text-xs font-semibold">
                          {row[2]}
                        </td>
                        <td className="py-2 text-muted-foreground text-xs">
                          {row[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-1">
                  Cross-sections at 0.025 eV (thermal). Source: ENDF/B-VIII.0
                  via NNDC; IAEA-NDS. ³He cross-section drops as 1/v above
                  thermal.
                </p>
              </div>
            </div>

            {/* He-3 shortage note */}
            <div className="rounded-lg border border-rose-400/20 bg-rose-400/5 p-4">
              <h4 className="font-semibold text-foreground mb-1 text-sm">
                ³He Worldwide Shortage
              </h4>
              <p className="text-sm text-muted-foreground">
                ³He is a rare stable isotope produced primarily as a byproduct
                of tritium decay in nuclear weapons stockpile maintenance
                programs. Post-9/11 demand for neutron detectors in cargo/portal
                monitors (homeland security) consumed global reserves far faster
                than production could replenish. Since ~2009, the{" "}
                <strong className="text-foreground">³He supply crisis</strong>{" "}
                has driven intense development of alternatives: boron-lined
                straw tubes, boron-10-coated proportional counters, LiF/ZnS
                scintillator panels, and CLYC crystals. Cost rose from ~$100/L
                to &gt;$1,000/L. [PNNL-SA-68385; DoE Office of Science report,
                2010]
              </p>
            </div>

            {/* Fast neutron detection */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Fast Neutron Detection
              </h4>
              <div className="space-y-3">
                {[
                  {
                    title: "Proton Recoil (Organic Scintillators)",
                    body: "Fast neutrons (>100 keV) scatter elastically off hydrogen nuclei in organic scintillators or proportional counters. The recoil proton is a high-LET charged particle that ionizes/scintillates efficiently. The maximum proton recoil energy equals the neutron kinetic energy (E_p,max = E_n) for head-on H–n collisions. With pulse shape discrimination (PSD), neutron and gamma events are separated, enabling fast neutron spectrometry.",
                    badge: "Most common method",
                  },
                  {
                    title: "Fission Chambers",
                    body: "A thin coating of fissile material (²³⁵U, ²³⁹Pu, or ²³²Th for threshold detection) on electrode surfaces enables neutron detection via fission fragment ionization. Fission fragments have ~80–100 MeV kinetic energy — far above most gamma backgrounds — giving virtually gamma-blind neutron response. Used in reactor control systems, flux mapping, and spent fuel monitoring.",
                    badge: "Reactor flux monitoring",
                  },
                  {
                    title: "Bonner Sphere Spectrometer (BSS)",
                    body: "A single thermal neutron detector (e.g., ³He tube or LiI crystal) is placed at the center of a series of spherical polyethylene moderators of different diameters (2–30 cm). Smaller spheres detect fast neutrons; larger spheres thermalize and detect slow neutrons. The response matrix R(d, E) maps sphere diameter d and neutron energy E to count rate — the neutron energy spectrum is unfolded using MAXED or FRUIT codes. Gold standard for workplace neutron spectrometry.",
                    badge: "Gold standard for spectroscopy",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-muted/20 p-4"
                  >
                    <div className="flex items-start gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-foreground text-sm">
                        {item.title}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutron dosimetry note */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                Rem Meters: Dose-Equivalent Neutron Survey Instruments
              </h4>
              <p className="text-sm text-muted-foreground">
                The ambient dose equivalent H*(10) from neutrons is notoriously
                difficult to measure because it depends strongly on energy (w_R
                varies from 2 to 20). A{" "}
                <strong className="text-foreground">rem meter</strong> (e.g.,
                Andersson-Braun or WENDI-II design) uses a spherical or
                cylindrical polyethylene moderator surrounding a thermal neutron
                detector, with additional high-Z absorbers and perforations
                engineered so the instrument response curve approximately tracks
                the ICRP fluence-to-dose conversion factor H*(10)/Φ across a
                wide neutron energy range (thermal to &gt;100 MeV). The readout
                is directly in μSv/h, integrating flux-weighted dose equivalent
                across the energy spectrum.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — Gamma-Ray Spectrometry
        ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleSection
          id="gamma_spectrometry"
          title="Gamma-Ray Spectrometry: Analysis, Calibration, and Identification"
          badge="Advanced"
          open={open.gamma_spectrometry}
          onToggle={() => toggle("gamma_spectrometry")}
        >
          <div className="pt-4 space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              A gamma-ray spectrum is the fingerprint of a radionuclide mixture.
              Every isotope emits characteristic gamma lines at specific
              energies — identifying which lines are present (qualitative
              analysis) and how intense they are relative to a calibrated
              efficiency function (quantitative analysis) enables radionuclide
              identification and activity measurement. HPGe spectrometry is the
              gold standard; NaI is used when portability outweighs resolution
              requirements.
            </p>

            {/* Spectral features */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Key Spectral Features
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {spectrumFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className={`rounded-lg border p-4 ${feature.color}`}
                  >
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {feature.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compton edge equation */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Compton Edge Energy
              </h4>
              <EquationBlock
                latex="E_{\\rm CE} = E_\\gamma \\cdot \\frac{2E_\\gamma / m_e c^2}{1 + 2E_\\gamma / m_e c^2}"
                annotation="Compton edge energy E_CE: maximum kinetic energy transferred to a Compton electron in a single backscatter interaction (θ = 180°). m_e c² = 0.511 MeV. For Cs-137 (E_γ = 662 keV): E_CE = 477 keV. The full-energy peak and Compton edge are the two most important features for gamma source identification. The gap between them (662 − 477 = 185 keV for Cs-137) contains only the Compton continuum."
                label="Compton Edge Energy"
              />
            </div>

            {/* Calibration */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Energy and Efficiency Calibration
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Before quantitative analysis, two calibrations are required:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Energy Calibration
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Known sources (e.g., Co-57 at 122 keV, Cs-137 at 662 keV,
                    Co-60 at 1,173 and 1,332 keV) establish a channel-number vs.
                    energy linear (or polynomial) mapping. A minimum of 3–5
                    calibration points spanning the energy range is recommended.
                    Residuals should be &lt;0.1 keV for HPGe.
                  </p>
                  <div className="text-xs font-mono text-primary space-y-0.5">
                    <p>Co-57: 122.06 keV</p>
                    <p>Cs-137: 661.66 keV</p>
                    <p>Co-60: 1173.24 keV, 1332.50 keV</p>
                    <p>Eu-152: 121.78, 344.28, 1408.01 keV</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Efficiency Calibration
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    A calibrated multi-nuclide source (e.g., NIST-traceable
                    Eu-152 point source) is counted in the exact geometry used
                    for samples. Full-energy peak efficiency ε(E) = counts / (Bq
                    × I_γ × time). Efficiency is fit as a smooth function of
                    energy (polynomial in log–log space). Absolute activity of
                    unknowns:
                  </p>
                  <EquationBlock
                    latex="A = \\frac{N_{\\rm net}}{\\varepsilon(E) \\cdot I_\\gamma \\cdot t}"
                    annotation="Activity A (Bq) from net peak area N_net (background-subtracted counts), full-energy peak efficiency ε(E), gamma emission probability per decay I_γ, and live time t. Decay correction needed if T½ is comparable to measurement time."
                    label="Activity from Peak Area"
                  />
                </div>
              </div>
            </div>

            {/* MDA */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Minimum Detectable Activity (MDA)
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                The MDA (Currie, 1968; MARLAP guidance) defines the smallest
                activity that can be distinguished from background at a
                specified confidence level (typically 95%, k = 1.645 for
                one-sided test):
              </p>
              <EquationBlock
                latex="\\text{MDA} = \\frac{L_C + 2.71/2 + 1.645\\sqrt{2 B}}{\\varepsilon(E) \\cdot I_\\gamma \\cdot t}"
                annotation="MDA formula (Currie 1968, Poisson approximation). L_C = critical level = 1.645√B (counts); B = background counts in peak region. For long counting times and low background (typical HPGe in-lab): MDA can reach millibequerel levels. For field NaI instruments: typically 100–1,000 Bq/kg. Increasing counting time t reduces MDA as 1/√t — doubling time reduces MDA by √2."
                label="Minimum Detectable Activity"
              />
            </div>

            {/* Detector comparison for spectrometry */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Detector Selection for Spectrometry Applications
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      {["Parameter", "NaI(Tl)", "LaBr₃(Ce)", "HPGe", "CZT"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left py-2 pr-4 text-muted-foreground font-medium"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "Energy resolution @ 662 keV",
                        "~7%",
                        "~2.5%",
                        "~0.15%",
                        "~1–3%",
                      ],
                      [
                        "Cooling required",
                        "No",
                        "No",
                        "Yes (LN₂ or mech.)",
                        "No",
                      ],
                      ["Relative cost", "$", "$$", "$$$", "$$"],
                      [
                        "Gamma efficiency (3×3 in)",
                        "High",
                        "High",
                        "Medium–high",
                        "Low–medium",
                      ],
                      [
                        "Portability",
                        "Excellent",
                        "Excellent",
                        "Limited",
                        "Excellent",
                      ],
                      [
                        "Isotope ID capability",
                        "Limited",
                        "Good",
                        "Excellent",
                        "Good",
                      ],
                      [
                        "Typical use",
                        "Surveys, dose calibration",
                        "Emergency response, safeguards",
                        "Lab spectrometry, IAEA, env. monitoring",
                        "Portable RIID, medical SPECT, space",
                      ],
                    ].map(([param, ...vals]) => (
                      <tr
                        key={param}
                        className="border-b border-border/50 hover:bg-muted/20"
                      >
                        <td className="py-2 pr-4 text-foreground text-xs font-semibold">
                          {param}
                        </td>
                        {vals.map((v) => (
                          <td
                            key={v}
                            className="py-2 pr-4 text-xs text-muted-foreground font-mono"
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-1">
                  Sources: ORTEC/Mirion/Canberra detector specifications;
                  IAEA-TECDOC-1363; ANSI N42.14 performance standards.
                </p>
              </div>
            </div>

            {/* Software */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                Analysis Software and Applications
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground mb-1.5">
                    Commercial
                  </p>
                  <ul className="text-muted-foreground space-y-1 list-none text-xs">
                    <li>
                      · ORTEC GammaVision: industry standard HPGe analysis
                    </li>
                    <li>
                      · Canberra Genie 2000: full spectroscopy suite +
                      efficiency
                    </li>
                    <li>
                      · LABSOCS (Canberra): Monte Carlo efficiency simulation
                      without physical calibration sources
                    </li>
                    <li>· Maestro: ORTEC MCA emulator with peak analysis</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1.5">
                    Open-Source / Free
                  </p>
                  <ul className="text-muted-foreground space-y-1 list-none text-xs">
                    <li>
                      · InterSpec (PNNL): portable, full-featured; DoE-released;
                      iOS/Android/desktop
                    </li>
                    <li>
                      · Gamma Spy (NRC-funded): peak identification, nuclide
                      library
                    </li>
                    <li>
                      · ROOT (CERN): full scientific analysis framework; custom
                      spectroscopy
                    </li>
                    <li>
                      · FRAM (LANL): plutonium and uranium isotopic ratio
                      analysis
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                <strong className="text-foreground">Key applications:</strong>{" "}
                IAEA safeguards inspectors use portable HPGe + LaBr₃ to verify
                declared nuclear material. Emergency response teams deploy NaI
                and LaBr₃ for rapid isotope identification after radiological
                incidents. Environmental monitoring networks (e.g., IMS
                radionuclide stations under the CTBTO Comprehensive Test Ban
                Treaty) use HPGe detectors to monitor for clandestine nuclear
                tests — capable of detecting Xe-133 from a ~1 kt underground
                explosion at global distances.
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
