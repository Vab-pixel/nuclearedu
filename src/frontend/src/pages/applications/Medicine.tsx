import { AudienceBadge } from "@/components/AudienceBadge";
import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
import { NuclearNotation } from "@/components/NuclearNotation";
import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { SectionCard } from "@/components/SectionCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  badge?: "intermediate" | "advanced";
  children: React.ReactNode;
  defaultOpen?: boolean;
  ocid?: string;
}

function CollapsibleSection({
  title,
  badge,
  children,
  defaultOpen = false,
  ocid,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <SectionCard data-ocid={ocid}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid={ocid ? `${ocid}.toggle` : undefined}
      >
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="font-display text-xl font-semibold text-foreground truncate">
            {title}
          </h2>
          {badge && <AudienceBadge level={badge} />}
        </div>
        {open ? (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform" />
        ) : (
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </SectionCard>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={String(row[0])}
              className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={headers[j] ?? j}
                  className="px-4 py-2 text-muted-foreground"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoBox({
  title,
  items,
}: { title: string; items: [string, string][] }) {
  return (
    <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm mb-4">
      {title && (
        <div className="font-semibold text-foreground mb-2">{title}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(([k, v]) => (
          <div key={k}>
            <span className="font-semibold text-foreground">{k}: </span>
            <span className="text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MedicinePage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Nuclear Medicine"
        subtitle="Radioactive isotopes as precision tools for diagnosis and therapy — imaging metabolic function in living patients and delivering targeted radiation doses to cancer cells."
        audienceLevel="intermediate"
        readTimeMin={38}
      />

      <div className="grid gap-6">
        {/* ── Overview ── */}
        <SectionCard data-ocid="medicine.overview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Nuclear Medicine: Diagnosis and Therapy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Nuclear medicine exploits the behaviour of{" "}
            <strong className="text-foreground">radioactive tracers</strong> in
            the human body to image physiological function and deliver
            therapeutic radiation doses with cellular-level precision. Unlike
            X-ray, CT, or MRI, which primarily reveal anatomy, nuclear medicine
            uniquely measures{" "}
            <strong className="text-foreground">
              metabolic activity, blood flow, receptor density, and gene
              expression
            </strong>{" "}
            — functional information invisible to purely structural imaging. A
            gamma camera or PET scanner does not see a tumour because of its
            shape, but because it consumes more glucose, overexpresses a
            receptor, or accumulates a tracer through specific biological uptake
            mechanisms.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The IAEA estimates approximately{" "}
            <strong className="text-foreground">
              60 million nuclear medicine procedures
            </strong>{" "}
            are performed annually worldwide, growing at ~5% per year driven by
            ageing populations, increasing cancer incidence, and the dramatic
            expansion of targeted radionuclide therapy (IAEA Nuclear Medicine
            Database, 2022).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The emerging paradigm of{" "}
            <strong className="text-foreground">theranostics</strong> — using
            the same molecular target for both diagnosis (with an
            imaging-suitable radionuclide) and therapy (with a therapeutic
            radionuclide) — is fundamentally changing oncology. The canonical
            example is PSMA (prostate-specific membrane antigen): image with
            ⁶⁸Ga-PSMA PET to confirm expression, then treat with ¹⁷⁷Lu-PSMA-617
            targeting the same receptor.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mb-2">
            {[
              {
                title: "Diagnostic Imaging",
                subtitle: "SPECT & PET",
                desc: "Gamma and positron-emitting tracers reveal organ function, metabolism, and receptor expression in 3D.",
              },
              {
                title: "Radionuclide Therapy",
                subtitle: "Targeted radiotherapy",
                desc: "Beta and alpha emitters attached to targeting vectors deliver lethal radiation doses to tumour cells from within.",
              },
              {
                title: "Theranostics",
                subtitle: "Diagnose + treat",
                desc: "One targeting molecule, two radionuclides — PSMA (prostate) and DOTATATE (NETs) are FDA-approved examples.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-border bg-muted/30 p-4"
              >
                <p className="font-semibold text-foreground text-sm">
                  {c.title}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-1">
                  {c.subtitle}
                </p>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Radiobiology Principles ── */}
        <CollapsibleSection
          title="Radiobiology Principles: RBE, LET, and the LNT Model"
          badge="advanced"
          ocid="medicine.radiobiology"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Understanding radiobiology is essential for nuclear medicine
            practitioners. Ionizing radiation kills cells primarily through DNA
            double-strand breaks (DSBs). The biological effectiveness of
            radiation depends heavily on how densely it deposits energy along
            its track — described by{" "}
            <strong className="text-foreground">
              Linear Energy Transfer (LET)
            </strong>{" "}
            in keV/μm.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Absorbed Dose and Effective Dose
          </h3>
          <EquationBlock
            latex="D = \\frac{E}{m} \\quad [\\text{Gray, Gy} = \\text{J/kg}]"
            annotation="Absorbed dose D is the fundamental physical quantity: energy E deposited per unit mass m of tissue. 1 Gy = 1 J/kg. The gray replaced the older 'rad' (1 rad = 0.01 Gy). Absorbed dose is the same regardless of radiation type — biological effects differ."
            label="Absorbed Dose"
          />

          <EquationBlock
            latex="H = D \\times w_R \\quad [\\text{Sievert, Sv}]"
            annotation="Equivalent dose H multiplies absorbed dose by the radiation weighting factor w_R: 1 for gamma/beta; 20 for alpha particles; 5–20 for neutrons. H accounts for differing biological damage per unit energy deposited. The sievert (Sv) replaced the older 'rem' (1 rem = 0.01 Sv)."
            label="Equivalent Dose (Sv)"
          />

          <EquationBlock
            latex="E = \\sum_T w_T \\cdot H_T \\quad [\\text{Sievert, Sv}]"
            annotation="Effective dose E sums equivalent doses across all organs, each weighted by a tissue weighting factor w_T reflecting the organ's radiosensitivity (ICRP 103, 2007). Red bone marrow w_T = 0.12; thyroid w_T = 0.04; gonads w_T = 0.08. Effective dose is used for comparing risks across different exposure scenarios, not for individual patient risk quantification."
            label="Effective Dose (Sv) — ICRP 103"
          />

          <EquationBlock
            latex="H_{\\text{committed}} = \\int_0^{50\\,\\text{yr}} \\dot{H}(t)\\,dt"
            annotation="Committed effective dose is the integral of effective dose rate over 50 years following intake of a radioactive substance (or to age 70 for children). Used to assess internal contamination and nuclear medicine patient doses from long-lived radiopharmaceuticals. For short-lived nuclides like Tc-99m (T½=6h), the committed dose equals essentially the entire dose delivered within days."
            label="Committed Effective Dose (nuclear medicine patients)"
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            RBE and LET in Nuclear Medicine
          </h3>
          <DataTable
            headers={[
              "Radiation Type",
              "Typical LET (keV/μm)",
              "w_R (ICRP 103)",
              "RBE (typical)",
              "Nuclear Medicine Context",
            ]}
            rows={[
              [
                "Gamma (140 keV, Tc-99m)",
                "~0.3",
                "1",
                "~1",
                "SPECT imaging; low-dose diagnostic",
              ],
              [
                "Beta⁻ (Lu-177, E_mean 133 keV)",
                "~0.2–0.4",
                "1",
                "~1",
                "PRRT therapy; moderate penetration",
              ],
              [
                "Beta⁻ (Y-90, E_max 2.3 MeV)",
                "~0.2",
                "1",
                "~1",
                "Liver radioembolization; high energy",
              ],
              [
                "Alpha (Ra-223, ~6 MeV)",
                "~80–100",
                "20",
                "~15–25",
                "Bone-targeted therapy; very short range",
              ],
              [
                "Auger electrons (In-111)",
                "~4–26 (nuclear)",
                "1 (nominal)",
                "~8–12 (nuclear)",
                "Requires internalisation to cell nucleus",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            The Linear No-Threshold (LNT) Model
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Radiation protection for nuclear medicine is guided by the{" "}
            <strong className="text-foreground">ALARA principle</strong> (As Low
            As Reasonably Achievable) and the LNT (Linear No-Threshold) model,
            which assumes cancer risk is proportional to dose with no safe
            threshold. In nuclear medicine, patient doses are explicitly
            justified: the diagnostic benefit must outweigh the small radiation
            risk.
          </p>
          <div className="rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground mb-4">
            <strong className="text-foreground block mb-1">
              Typical Patient Doses (Effective Dose)
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {[
                ["Tc-99m bone scan (25 mCi)", "~6.3 mSv"],
                ["Tc-99m cardiac stress (20 mCi)", "~5.6 mSv"],
                ["¹⁸F-FDG PET (10 mCi)", "~7 mSv"],
                [
                  "¹³¹I thyroid ablation (100 mCi)",
                  "~300–1,000 mSv (thyroid: ~50,000 mSv)",
                ],
                [
                  "¹⁷⁷Lu-DOTATATE (200 mCi × 4)",
                  "~2–4 Sv cumulative (kidney dose)",
                ],
                ["Background radiation/yr", "~2.4 mSv (UNSCEAR 2008)"],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <span className="font-semibold text-foreground">{k}: </span>
                  <span className="text-muted-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Sources: ICRP Publication 128 (Radiation Dose to Patients from
            Radiopharmaceuticals, 2015); SNMMI dosimetry guidelines; NRC nuclear
            medicine regulatory guides (10 CFR 35).
          </p>
        </CollapsibleSection>

        {/* ── Isotope Selection ── */}
        <CollapsibleSection
          title="Diagnostic Isotope Selection Criteria"
          badge="advanced"
          ocid="medicine.isotope_selection"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Selecting a radionuclide for diagnostic nuclear medicine requires
            optimizing across physical, chemical, and biological constraints
            simultaneously. No isotope is perfect; each represents a compromise.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Physical Selection Criteria
          </h3>
          <div className="space-y-2 mb-5 text-sm text-muted-foreground">
            {[
              {
                criterion: "Half-life",
                optimal:
                  "Similar to examination duration (~1–24 hours for SPECT; ~2 h for PET)",
                reason:
                  "Too short: insufficient time for distribution and imaging. Too long: unnecessary patient dose after imaging complete.",
              },
              {
                criterion: "Gamma energy",
                optimal: "100–250 keV for SPECT; 511 keV for PET",
                reason:
                  "Below 100 keV: excessive tissue attenuation. Above 400 keV: poor NaI crystal detection efficiency; collimator penetration.",
              },
              {
                criterion: "Emission purity",
                optimal: "Minimal particulate emissions (no α, minimal β)",
                reason:
                  "Alpha/beta particles increase absorbed dose without contributing to the image. Pure γ or IT emitters minimize unnecessary irradiation.",
              },
              {
                criterion: "Specific activity",
                optimal: "As high as possible (GBq/μmol)",
                reason:
                  "Low specific activity means too many non-radioactive 'cold' molecules competing with labeled molecules for receptor binding sites, reducing image quality and dose calculations.",
              },
              {
                criterion: "Availability",
                optimal: "Generator-based or regional cyclotron distribution",
                reason:
                  "Short-lived nuclides require on-site production or rapid logistics; clinical programs require reliable 24/7 supply chains.",
              },
            ].map((item) => (
              <div
                key={item.criterion}
                className="rounded-lg bg-muted/20 border border-border p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-foreground w-32 shrink-0">
                    {item.criterion}
                  </span>
                  <div>
                    <div className="text-foreground/80 font-medium">
                      Optimal: {item.optimal}
                    </div>
                    <div className="text-muted-foreground text-xs mt-0.5">
                      {item.reason}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            Why Tc-99m is the Perfect SPECT Nuclide
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Tc-99m satisfies nearly every criterion simultaneously — its
            discovery and development as a universal radiolabelling scaffold is
            one of the great achievements of applied nuclear science:
          </p>
          <InfoBox
            title="Tc-99m Physical Properties"
            items={[
              [
                "Half-life",
                "6.01 hours — optimal exam duration; minimal residual dose",
              ],
              [
                "Gamma energy",
                "140.5 keV — NaI crystal peak efficiency; above scattered photons",
              ],
              [
                "Emission type",
                "Isomeric transition (IT) only — no beta; minimal absorbed dose",
              ],
              [
                "Chemistry",
                "TcO₄⁻ (pertechnetate) reduced and chelated in minutes with kit",
              ],
              [
                "Generator delivery",
                "Mo-99/Tc-99m 'moly cow' — no on-site cyclotron needed",
              ],
              [
                "Specific activity",
                "Very high from fission-produced Mo-99 (~10⁵ Ci/g)",
              ],
            ]}
          />

          <EquationBlock
            latex="^{99}_{42}\\text{Mo} \\xrightarrow{\\beta^-,\\,T_{1/2}=66\\,\\text{h}} {^{99m}_{43}\\text{Tc}} \\xrightarrow{\\text{IT},\\,140.5\\,\\text{keV},\\,T_{1/2}=6.01\\,\\text{h}} {^{99}_{43}\\text{Tc}}"
            annotation="Mo-99 is produced with ~6.1% fission yield from U-235. The secular equilibrium in the generator column means 87% of theoretical max Tc-99m is available 24 h after elution. Global Mo-99 supply is concentrated at 5 research reactors, creating supply chain vulnerability; the 2009–2010 shortage cancelled hundreds of thousands of cardiac and cancer scans worldwide (OECD/NEA, 2022)."
            label="Mo-99 → Tc-99m Decay Chain (Generator System)"
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            <NuclearNotation A={18} Z={9} symbol="F" />: The Dominant PET
            Radionuclide
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            F-18 has emerged as the dominant PET radionuclide due to a unique
            combination of favourable properties. Production via{" "}
            <InlineEquation tex="{}^{18}\\text{O}(p,n){}^{18}\\text{F}" /> at
            16–18 MeV proton energies in medical cyclotrons yields 50–150 GBq
            per 30-minute bombardment from H₂¹⁸O targets. The decay equation is:
          </p>
          <EquationBlock
            latex="{}^{18}_{9}\\text{F} \\rightarrow {}^{18}_{8}\\text{O} + e^+ + \\nu_e \\quad (T_{1/2} = 109.8\\,\\text{min},\\; E_{\\beta^+}^{\\max} = 634\\,\\text{keV})"
            annotation="F-18 positron decay to O-18. The emitted positron travels ~0.6 mm in tissue before annihilating with an electron to produce two collinear 511 keV gamma photons — the basis of PET coincidence detection."
            label="F-18 Positron Decay"
          />
          <DataTable
            headers={["Property", "F-18 Value", "Why Optimal"]}
            rows={[
              [
                "Half-life",
                "109.8 min",
                "Distribution radius: ~300 km from cyclotron; full clinical workflow",
              ],
              [
                "Max β⁺ energy",
                "634 keV",
                "Short positron range (~0.6 mm in tissue): minimizes blurring",
              ],
              [
                "Positron fraction",
                "97%",
                "Almost all decays produce the 511 keV pair; high PET efficiency",
              ],
              [
                "F-C bond strength",
                "~544 kJ/mol (strongest C-heteroatom)",
                "Metabolically stable: FDG-6-phosphate is trapped intracellularly",
              ],
              [
                "Fluorine size",
                "van der Waals radius 1.47 Å (≈ OH)",
                "F can substitute for OH/H in many pharmacophores without major conformational change",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            <NuclearNotation A={68} Z={31} symbol="Ga" />: Generator-Based PET
            Without a Cyclotron
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            <InlineEquation tex="{}^{68}\\text{Ga}" /> (T½ = 67.7 min) has
            transformed PET access at hospitals without on-site cyclotrons. The{" "}
            <InlineEquation tex="{}^{68}\\text{Ge}/{}^{68}\\text{Ga}" />{" "}
            generator (<InlineEquation tex="{}^{68}\\text{Ge}" /> T½ = 270.95
            days; daughter <InlineEquation tex="{}^{68}\\text{Ga}" /> by
            electron capture) provides reliable daily supply for 1–2 years per
            generator, enabling PSMA and DOTATATE PET programs at institutions
            globally. ⁶⁸Ga chelates readily with DOTA-peptide conjugates
            (DOTATATE, DOTATOC, PSMA-11) via rapid kit-based chemistry at room
            temperature.
          </p>
          <p className="text-xs text-muted-foreground">
            Sources: IAEA Radiopharmacy: A Technologist's Guide (2014);
            Decristoforo et al., Eur J Nucl Med (2021); Velikyan I., Molecules
            (2015).
          </p>
        </CollapsibleSection>

        {/* ── SPECT ── */}
        <CollapsibleSection
          title="SPECT: The Workhorse of Nuclear Medicine"
          badge="intermediate"
          ocid="medicine.spect"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            SPECT (Single Photon Emission Computed Tomography) accounts for ~75%
            of all nuclear medicine scans globally. Two or three NaI(Tl)
            detector heads rotate around the patient; lead collimators define
            photon directionality; iterative OSEM reconstruction generates 3D
            radiotracer distribution maps at ~10–15 mm spatial resolution.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Common SPECT Applications and Tracers
          </h3>
          <DataTable
            headers={["Tracer", "T½", "Key Application", "Annual Volume (US)"]}
            rows={[
              [
                "⁹⁹ᵐTc-sestamibi / tetrofosmin",
                "6.01 h",
                "Myocardial perfusion imaging: ischaemia vs. infarct",
                "~9 million/yr",
              ],
              [
                "⁹⁹ᵐTc-MDP",
                "6.01 h",
                "Bone scan: metastases, fractures, osteomyelitis",
                "~5 million/yr",
              ],
              [
                "⁹⁹ᵐTc-MAG3 / DTPA",
                "6.01 h",
                "Renal function: GFR, tubular secretion, split function",
                "~1.5 million/yr",
              ],
              [
                "⁹⁹ᵐTc-pertechnetate",
                "6.01 h",
                "Thyroid scan; Meckel's diverticulum; salivary glands",
                "~0.5 million/yr",
              ],
              [
                "⁹⁹ᵐTc-MAA",
                "6.01 h",
                "Pulmonary perfusion (V/Q scan) — pulmonary embolism",
                "~0.8 million/yr",
              ],
              [
                "¹²³I-MIBG",
                "13.2 h",
                "Pheochromocytoma; neuroblastoma; cardiac innervation",
                "~0.1 million/yr",
              ],
              [
                "²⁰¹Tl-chloride",
                "73 h",
                "Historical cardiac perfusion (declining); parathyroid",
                "Declining",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Sources: SNM/EANM procedural guidelines; IAEA Human Health Reports;
            SNMMI Image Gently data.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Mo-99/Tc-99m Global Supply Chain
          </h3>
          <DataTable
            headers={[
              "Reactor",
              "Country",
              "Power",
              "Mo-99 Share",
              "Status (2024)",
            ]}
            rows={[
              [
                "HFR (High Flux Reactor)",
                "Netherlands",
                "45 MW",
                "~30%",
                "Operating; replacement PALLAS planned ~2030",
              ],
              [
                "BR2",
                "Belgium",
                "100 MW",
                "~25%",
                "Operating; SCK-CEN; refurbishment ongoing",
              ],
              [
                "Safari-1",
                "South Africa",
                "20 MW",
                "~15–20%",
                "Operating; Necsa; first full LEU target conversion",
              ],
              [
                "MURR (Missouri Univ.)",
                "USA",
                "10 MW",
                "~5–10%",
                "Operating; increasing capacity",
              ],
              [
                "LVR-15",
                "Czech Republic",
                "10 MW",
                "~5%",
                "Operating; ÚJV Řež",
              ],
              [
                "NRU (historic)",
                "Canada",
                "135 MW",
                "~30% (historic)",
                "Shutdown May 2018 permanently",
              ],
            ]}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Accelerator-based Mo-99 (SHINE Medical Technologies, WI, USA) now
            supplements reactor supply via photofission of U solutions with
            electron linear accelerators (OECD/NEA Mo-99 Security of Supply
            Report, 2022).
          </p>
        </CollapsibleSection>

        {/* ── PET ── */}
        <CollapsibleSection
          title="PET: High-Resolution Molecular Imaging"
          badge="intermediate"
          ocid="medicine.pet"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            PET achieves higher spatial resolution and sensitivity than SPECT by
            exploiting positron-electron annihilation physics. The{" "}
            <strong className="text-foreground">
              two 511 keV photons emitted simultaneously at 180°
            </strong>{" "}
            enable electronic collimation via coincidence detection, giving PET
            10–100× greater sensitivity.
          </p>

          <EquationBlock
            latex="e^+ + e^- \\rightarrow \\gamma_1 + \\gamma_2 \\quad (511\\,\\text{keV each},\\ 180^\\circ \\pm 0.25^\\circ)"
            annotation="Positron-electron annihilation. The 0.25° FWHM angular deviation (from residual momentum of the pair) limits spatial resolution to ~2–3 mm in modern scanners. Time-of-flight (TOF) PET uses coincidence timing as short as 210 ps to localize annihilation along the LOR to within ~3 cm, substantially improving image quality."
            label="Positron-Electron Annihilation — PET Principle"
          />

          <EquationBlock
            latex="\\text{SUV} = \\frac{\\text{Tissue radioactivity concentration (kBq/mL)}}{\\text{Injected activity (kBq)} / \\text{Body weight (g)}}"
            annotation="Standardised Uptake Value (SUV). SUVmax > 2.5 is a widely used (though imperfect) threshold for metabolically active malignancy on FDG PET. Deauville 5-point scale for lymphoma uses SUV relative to mediastinal blood pool and liver. PERCIST criteria: SUVmax decrease >30% indicates metabolic response to therapy."
            label="Standardised Uptake Value (SUV)"
          />

          <h3 className="font-semibold text-foreground mt-4 mb-2">
            PET vs. SPECT: Technical Comparison
          </h3>
          <DataTable
            headers={["Parameter", "PET", "SPECT"]}
            rows={[
              [
                "Spatial resolution",
                "4–6 mm clinical; 1–2 mm pre-clinical",
                "10–15 mm standard; 6–8 mm CZT-based",
              ],
              [
                "Sensitivity",
                "~10⁻¹¹–10⁻¹² mol/L",
                "~10⁻⁸–10⁻⁹ mol/L (100–1,000× lower)",
              ],
              [
                "Quantification",
                "Absolute (Bq/mL, SUV)",
                "Semi-quantitative; attenuation correction required",
              ],
              [
                "Collimation",
                "Electronic coincidence; no physical collimator",
                "Physical lead collimator (rejects ~99.9% photons)",
              ],
              ["Typical scan duration", "15–30 min", "15–45 min"],
              [
                "Cost (scanner)",
                "~$1.5–3M + cyclotron ~$2–5M if on-site",
                "~$300K–1M; generator ~$1,000–5,000/wk",
              ],
              ["Annual US procedures", "~8 million", "~20 million"],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Key PET Tracers
          </h3>
          <DataTable
            headers={[
              "Tracer",
              "T½",
              "Target / Mechanism",
              "Key Applications",
              "FDA Status",
            ]}
            rows={[
              [
                "¹⁸F-FDG",
                "110 min",
                "Glucose metabolism (GLUT, hexokinase)",
                "Oncology staging; Alzheimer's; epilepsy",
                "Approved",
              ],
              [
                "⁶⁸Ga-PSMA-11 / ¹⁸F-PSMA-1007",
                "68 / 110 min",
                "PSMA receptor on prostate cancer cells",
                "Prostate cancer staging; recurrence; pre-therapy",
                "FDA approved (2020/2021)",
              ],
              [
                "⁶⁸Ga-DOTATATE / DOTATOC",
                "68 min",
                "Somatostatin receptors SSTR2/5 on NETs",
                "NET staging; PRRT patient selection",
                "FDA approved (2016)",
              ],
              [
                "¹⁸F-NaF (sodium fluoride)",
                "110 min",
                "Bone hydroxyapatite incorporation",
                "Bone metastases; superior to ⁹⁹ᵐTc bone scan",
                "FDA approved",
              ],
              [
                "¹⁸F-Florbetapir / Florbetaben / Flutemetamol",
                "110 min",
                "Amyloid-β plaques",
                "Exclude Alzheimer's in atypical dementia",
                "FDA approved",
              ],
              [
                "¹⁸F-Flortaucipir",
                "110 min",
                "Tau neurofibrillary tangles",
                "Alzheimer's staging; tauopathy differentiation",
                "FDA approved (2020)",
              ],
              [
                "⁶⁸Ga-FAPI",
                "68 min",
                "Fibroblast activation protein (cancer stroma)",
                "Broad-spectrum oncology; low-FDG tumours",
                "Investigational",
              ],
              [
                "¹³N-Ammonia",
                "9.97 min",
                "Myocardial blood flow (flow tracer)",
                "Cardiac perfusion PET; quantitative MBF",
                "FDA approved",
              ],
              [
                "⁶⁴Cu-DOTATATE",
                "12.7 h",
                "SSTR2 on NETs (longer T½ vs Ga-68)",
                "NETs; dosimetry planning for ¹⁷⁷Lu-DOTATATE",
                "Approved",
              ],
            ]}
          />
        </CollapsibleSection>

        {/* ── Radionuclide Therapy ── */}
        <CollapsibleSection
          title="Radionuclide Therapy — Targeted Radiation to Treat Cancer"
          badge="intermediate"
          ocid="medicine.therapy"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Targeted radionuclide therapy (TRT) delivers therapeutic radiation
            specifically to cancer cells by attaching a therapeutic radionuclide
            to a targeting vector that preferentially accumulates in tumour
            tissue via specific biological uptake. Radiation — typically beta or
            alpha particles — destroys cancer cells from within, while the short
            emission range limits damage to surrounding healthy tissue.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Particle Types and Radiobiology
          </h3>
          <DataTable
            headers={[
              "Particle",
              "Nuclides",
              "Range in Tissue",
              "LET (keV/μm)",
              "Optimal Tumour Size",
            ]}
            rows={[
              [
                "Beta⁻ (β⁻)",
                "Lu-177, I-131, Y-90, P-32",
                "0.2–12 mm",
                "Low (~0.2)",
                "Medium-large; crossfire compensates heterogeneous uptake",
              ],
              [
                "Alpha (α)",
                "Ra-223, At-211, Bi-213, Ac-225",
                "40–100 μm",
                "Very high (~80)",
                "Micro-metastases; circulating cells",
              ],
              [
                "Auger electrons",
                "In-111, Ga-67, I-125",
                "2–500 nm (subcellular)",
                "Very high (localised)",
                "Requires nuclear internalisation",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Iodine-131: Nuclear Medicine's Oldest Success
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The thyroid gland concentrates iodine via the sodium-iodide
            symporter (NIS) protein for thyroid hormone synthesis. I-131
            exploits this selectivity: first used clinically in 1941 (Hertz and
            Roberts, MGH Boston) — the oldest targeted radionuclide therapy in
            clinical use.
          </p>
          <InfoBox
            title="I-131 Properties"
            items={[
              [
                "Half-life",
                "8.02 days (physical); effective T½ in thyroid ~5–6 days",
              ],
              [
                "Beta emission",
                "E_max = 606 keV, E_mean = 192 keV; range ~2 mm in tissue",
              ],
              [
                "Gamma emission",
                "364 keV (81% abundance) — enables post-therapy imaging",
              ],
              ["Production", "Reactor fission product of U-235 (yield ~2.8%)"],
              [
                "Differentiated thyroid cancer",
                "Remnant ablation: 30–100 mCi (1.1–3.7 GBq)",
              ],
              [
                "Hyperthyroidism",
                "10–15 mCi ablative; >80% curative (Graves' disease)",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mb-2">
            ¹⁷⁷Lu-DOTATATE (Lutathera®): NETs
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Neuroendocrine tumours overexpress somatostatin receptors (SSTR2) at
            10–1,000× higher density than normal tissue. The NETTER-1 Phase III
            RCT (Strosberg et al., <em>N Engl J Med</em>, 2017) established the
            evidence base:
          </p>
          <InfoBox
            title="NETTER-1 Trial Results — ¹⁷⁷Lu-DOTATATE vs. Octreotide LAR (n=229)"
            items={[
              [
                "Primary endpoint",
                "PFS: 65.2% at 20 months (Lu-177) vs. 10.8% (control); HR 0.18 (p<0.0001)",
              ],
              [
                "Objective response rate",
                "18% partial response (Lu-177) vs. 3% (control)",
              ],
              ["Dose regimen", "4 cycles × 7.4 GBq (200 mCi) every 8 weeks"],
              [
                "FDA approval",
                "January 2018 (Lutathera®); first theranostic radiopharmaceutical era",
              ],
              [
                "Lu-177 T½",
                "6.65 d; E_β_mean = 133 keV; 208/113 keV γ allows post-therapy imaging",
              ],
              [
                "Protection",
                "Amino acid infusion co-administered to protect kidneys",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mb-2">
            ¹⁷⁷Lu-PSMA-617 (Pluvicto®): Prostate Cancer
          </h3>
          <DataTable
            headers={[
              "Parameter",
              "¹⁷⁷Lu-PSMA-617 + SoC",
              "SoC Alone",
              "Significance",
            ]}
            rows={[
              [
                "Median Overall Survival",
                "15.3 months",
                "11.3 months",
                "HR 0.62 (95% CI 0.52–0.74); p<0.001",
              ],
              [
                "Median rPFS",
                "8.7 months",
                "3.4 months",
                "HR 0.40 (95% CI 0.29–0.57); p<0.001",
              ],
              [
                "Objective Response Rate",
                "29.8%",
                "1.7%",
                "Dramatic improvement",
              ],
              [
                "Population",
                "n=831, mCRPC, PSMA PET+, prior AR inhibitor + docetaxel",
                "",
                "",
              ],
            ]}
          />
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            FDA approved March 2022 (Pluvicto®). Source: Sartor et al.,{" "}
            <em>N Engl J Med</em>, 2021.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            ²²³Ra-Dichloride (Xofigo®): Alpha Therapy
          </h3>
          <EquationBlock
            latex="^{223}_{88}\\text{Ra} \\xrightarrow{\\alpha,\\,11.43\\,\\text{d}} {^{219}\\text{Rn}} \\xrightarrow{\\alpha,\\,3.96\\,\\text{s}} {^{215}\\text{Po}} \\xrightarrow{\\alpha,\\,1.78\\,\\text{ms}} {^{211}\\text{Pb}} \\xrightarrow{\\beta^-,\\,36.1\\,\\text{min}} {^{211}\\text{Bi}} \\xrightarrow{\\alpha,\\,2.14\\,\\text{min}} {^{207}\\text{Tl}} \\xrightarrow{\\beta^-} {^{207}\\text{Pb (stable)}}"
            annotation="Ra-223 decay chain: 4 alpha particles + 2 beta particles. Total energy per chain ≈ 28.3 MeV. Alpha range < 100 μm in tissue (~2–10 cell diameters), concentrating lethal dose at tumor-bone interface. Ra-223, a calcium mimic, selectively incorporates into hydroxyapatite at osteoblastic metastases."
            label="Ra-223 Decay Chain (ALSYMPCA therapy)"
          />
          <p className="text-muted-foreground text-sm mb-3">
            ALSYMPCA Phase III (Parker et al., <em>N Engl J Med</em>, 2013):
            median OS 14.9 vs. 11.3 months, HR 0.695 (p&lt;0.001). FDA approved
            2013 — first targeted alpha emitter approved for systemic cancer
            therapy globally.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Approved Radionuclide Therapies
          </h3>
          <DataTable
            headers={[
              "Agent",
              "Nuclide",
              "T½",
              "Emission",
              "Disease",
              "Approval Year",
            ]}
            rows={[
              [
                "Sodium iodide (I-131)",
                "I-131",
                "8.02 d",
                "β⁻ + 364 keV γ",
                "Thyroid cancer; hyperthyroidism",
                "1951 (NDA)",
              ],
              [
                "Zevalin® (ibritumomab tiuxetan)",
                "Y-90",
                "2.67 d",
                "β⁻ (E_max 2.3 MeV)",
                "B-cell NHL",
                "FDA 2002",
              ],
              [
                "Xofigo® (Ra-223 dichloride)",
                "Ra-223",
                "11.43 d",
                "α (×4 chain)",
                "Bone mets (mCRPC)",
                "FDA/EMA 2013",
              ],
              [
                "Lutathera® (¹⁷⁷Lu-DOTATATE)",
                "Lu-177",
                "6.65 d",
                "β⁻ + 208 keV γ",
                "GEP-NETs (SSTR+)",
                "EMA 2017; FDA 2018",
              ],
              [
                "Azedra® (¹³¹I-MIBG)",
                "I-131",
                "8.02 d",
                "β⁻ + γ",
                "Pheo/paraganglioma",
                "FDA 2018",
              ],
              [
                "Pluvicto® (¹⁷⁷Lu-PSMA-617)",
                "Lu-177",
                "6.65 d",
                "β⁻ + 208 keV γ",
                "mCRPC (PSMA PET+)",
                "FDA/EMA 2022",
              ],
            ]}
          />
        </CollapsibleSection>

        {/* ── Production ── */}
        <CollapsibleSection
          title="Production of Medical Radioisotopes"
          badge="advanced"
          ocid="medicine.production"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Short half-lives that make isotopes clinically useful simultaneously
            create formidable supply chain challenges. Isotopes must be produced
            continuously in dedicated facilities (reactors or cyclotrons),
            processed under aseptic and radiation safety conditions,
            quality-tested, and shipped worldwide within hours to days.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Reactor-Produced Isotopes
          </h3>
          <DataTable
            headers={[
              "Isotope",
              "Production Route",
              "Key Reactors / Facilities",
              "Clinical Use",
            ]}
            rows={[
              [
                "Mo-99 (→Tc-99m)",
                "U-235 fission (LEU targets); fission yield ~6.1%",
                "HFR (NL), BR2 (BE), Safari-1 (SA)",
                "~80% of diagnostic nuclear medicine globally",
              ],
              [
                "I-131",
                "Te-130(n,γ)→Te-131→¹³¹I; or U-235 fission product",
                "Multiple reactors; hot cell processing",
                "Thyroid cancer; hyperthyroidism; pheochromocytoma",
              ],
              [
                "Lu-177 (n.c.a.)",
                "⁷⁶Yb(p,n)⁷⁶Lu (indirect); ¹⁷⁶Lu(n,γ)¹⁷⁷Lu (direct)",
                "ORNL, ITG (DE), Isotope Technologies Munich",
                "PRRT (NETs, prostate cancer therapy)",
              ],
              [
                "Sr-89",
                "⁸⁸Sr(n,γ)⁸⁹Sr; research reactors",
                "Multiple",
                "Bone pain palliation (prostate cancer mets)",
              ],
              [
                "Sm-153",
                "¹⁵²Sm(n,γ)¹⁵³Sm; high flux reactors",
                "Research reactors",
                "Bone pain palliation (QUADRAMET®)",
              ],
              [
                "Re-186 / Re-188",
                "¹⁸⁵Re(n,γ)¹⁸⁶Re; W-188/Re-188 generator",
                "High-flux reactors",
                "Bone palliation; investigational therapies",
              ],
              [
                "Ac-225",
                "U-233 decay (Th-229 parent); Ra-226(p,2n)Ac-225",
                "ORNL (US), INR (Russia)",
                "Targeted alpha therapy (Ac-225-PSMA, pipeline)",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Cyclotron-Produced Isotopes
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Medical cyclotrons (typically 11–30 MeV proton energy) at hospital
            sites or regional radiopharmacies produce short-lived PET nuclides.
            Global fleet: ~1,500 medical cyclotrons (IAEA, 2023).
          </p>
          <DataTable
            headers={["Isotope", "Nuclear Reaction", "T½", "Key Compound(s)"]}
            rows={[
              [
                "¹⁸F",
                "¹⁸O(p,n)¹⁸F (enriched H₂¹⁸O target)",
                "109.8 min",
                "FDG, NaF, PSMA-1007, florbetapir, flortaucipir",
              ],
              [
                "¹¹C",
                "¹⁴N(p,α)¹¹C (N₂ gas target)",
                "20.4 min",
                "PiB (amyloid), methionine, raclopride (dopamine); requires on-site cyclotron",
              ],
              [
                "¹³N",
                "¹⁶O(p,α)¹³N (H₂O target)",
                "9.97 min",
                "¹³N-ammonia cardiac PET; on-site only",
              ],
              [
                "¹⁵O",
                "¹⁴N(d,n)¹⁵O or ¹⁵N(p,n)¹⁵O",
                "2.04 min",
                "¹⁵O-water brain blood flow; on-site only",
              ],
              [
                "⁶⁸Ga",
                "⁶⁸Ge/⁶⁸Ga generator (T½(⁶⁸Ge) = 271 d)",
                "67.7 min",
                "DOTATATE, DOTATOC, PSMA-11, FAPI",
              ],
              [
                "⁶⁴Cu",
                "⁶⁴Ni(p,n)⁶⁴Cu",
                "12.7 h",
                "DOTATATE, antibody conjugates (immuno-PET)",
              ],
              [
                "⁸⁹Zr",
                "⁸⁹Y(p,n)⁸⁹Zr",
                "78.4 h",
                "Antibody-based immuno-PET (long T½ matches IgG kinetics)",
              ],
              [
                "¹²³I",
                "¹²⁴Te(p,2n)¹²³I or ¹²³Xe(p,xn)¹²³I",
                "13.2 h",
                "MIBG imaging; DaTscan (dopamine transporter)",
              ],
            ]}
          />
        </CollapsibleSection>

        {/* ── Dosimetry & Safety ── */}
        <CollapsibleSection
          title="Dosimetry, Radiation Safety, and Regulatory Oversight"
          badge="advanced"
          ocid="medicine.dosimetry"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nuclear medicine dosimetry quantifies the absorbed dose received by
            patients, caregivers, and occupationally exposed staff. Regulatory
            oversight ensures procedures are justified and optimized per the
            ALARA principle.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Patient Dosimetry: The MIRD Formalism
          </h3>
          <EquationBlock
            latex="\\tilde{A}_s = \\int_0^\\infty A_s(t)\\,dt \\quad \\rightarrow \\quad D(r_T \\leftarrow r_S) = \\tilde{A}_s \\cdot S(r_T \\leftarrow r_S)"
            annotation="MIRD (Medical Internal Radiation Dose) formalism: the cumulated activity Ã_s in a source organ (time-integral of activity A_s(t)) is multiplied by the S-value (mean absorbed dose in target organ per unit cumulated activity in source organ) to yield absorbed dose D. S-values are published by MIRD for standard organ geometries and all relevant radionuclides. Personalized dosimetry integrates patient-specific pharmacokinetics from serial SPECT/CT or PET imaging."
            label="MIRD Dosimetry Formalism"
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Regulatory Framework (USA and International)
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            {[
              {
                body: "US NRC (10 CFR 35)",
                role: "Regulates medical use of radioactive material; licenses facilities; sets dose limits for patients (medical events if thyroid dose >45 Gy unintended) and staff; requires radiation safety officers, written directives for therapy doses >1.22 GBq.",
              },
              {
                body: "US FDA",
                role: "Regulates radiopharmaceuticals as drugs (NDA/ANDA pathway); Good Manufacturing Practice (GMP) requirements for commercial products; separate IND pathway for investigational radiopharmaceuticals.",
              },
              {
                body: "IAEA (Safety Reports Series No. 63)",
                role: "International guidance on radiation protection in nuclear medicine; provides reference values for patient doses; coordinates global supply chain security for critical medical isotopes (e.g., Mo-99 supply).",
              },
              {
                body: "SNMMI / EANM",
                role: "Professional bodies issuing evidence-based procedural guidelines, dosimetry standards, and appropriate use criteria for all nuclear medicine procedures.",
              },
            ].map((item) => (
              <div
                key={item.body}
                className="rounded-lg bg-muted/20 border border-border p-3"
              >
                <div className="font-semibold text-foreground">{item.body}</div>
                <div className="mt-1">{item.role}</div>
              </div>
            ))}
          </div>

          <SafetyCallout title="Radiation Safety in Therapeutic Nuclear Medicine">
            High-activity radiopharmaceutical therapies (¹³¹I thyroid ablation
            ≥30 mCi; ¹⁷⁷Lu-PSMA-617, ¹⁷⁷Lu-DOTATATE) require patient isolation,
            lead shielding of waste, and restricted contact with pregnant women
            and children for 1–7 days post-treatment. Facilities must meet NRC
            10 CFR 35 requirements for RAM licensing, written directives, and
            post-therapy surveying. Emergency procedures for unintended dose are
            mandatory.
          </SafetyCallout>
        </CollapsibleSection>

        {/* ── Future: Alpha Therapy & Theranostics ── */}
        <CollapsibleSection
          title="Future Directions: Targeted Alpha Therapy and Theranostics"
          badge="advanced"
          ocid="medicine.future"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            The next decade in nuclear medicine will be defined by two
            convergent trends: the clinical maturation of{" "}
            <strong className="text-foreground">
              targeted alpha therapy (TAT)
            </strong>{" "}
            and the proliferation of{" "}
            <strong className="text-foreground">theranostic pairs</strong>{" "}
            across more tumour types. Together they represent the most precise
            radiation delivery platform in oncology.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Actinium-225: Next-Generation Alpha Therapy
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Ac-225 (T½ = 9.92 days; 4 alpha particles in decay to stable Bi-209)
            is the most clinically advanced next-generation alpha emitter.
            Ac-225-PSMA-617 showed remarkable results in compassionate-use
            series in patients who failed Lu-177-PSMA treatment. Key challenges
            limiting wider clinical adoption:
          </p>
          <DataTable
            headers={["Challenge", "Current Status", "Solution Pathway"]}
            rows={[
              [
                "Global Ac-225 supply",
                "~1,500 Ci/yr from Cold War U-233 decay (ORNL/Russia)",
                "Ra-226(p,2n)Ac-225 at particle accelerators; US DOE target: ~100,000 Ci/yr by 2028",
              ],
              [
                "Daughter redistribution",
                "Fr-221, Bi-213, Po-213 daughters may redistribute from chelate after recoil",
                "Macropa, crown ether chelators; linker design; dosimetry modelling",
              ],
              [
                "Radiolabelling chemistry",
                "Ac³⁺ requires macrocyclic chelators; less versatile than Lu³⁺ + DOTA",
                "MACROPA-ligands; bifunctional chelators enabling broader biomolecule attachment",
              ],
              [
                "Dosimetry",
                "Alpha dosimetry requires microdosimetric models; no standardised approach",
                "Monte Carlo microdosimetry; ex vivo autoradiography; α-camera imaging systems",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            The Theranostics Pipeline (2024–2030)
          </h3>
          <DataTable
            headers={[
              "Target",
              "Diagnostic Agent",
              "Therapeutic Agent",
              "Disease",
              "Pipeline Stage",
            ]}
            rows={[
              [
                "PSMA",
                "⁶⁸Ga-PSMA-11 / ¹⁸F-PSMA-1007",
                "¹⁷⁷Lu-PSMA-617 (Pluvicto®)",
                "Prostate cancer (mCRPC)",
                "FDA approved 2022; earlier lines in trials",
              ],
              [
                "SSTR (somatostatin)",
                "⁶⁸Ga-DOTATATE (NETSPOT®)",
                "¹⁷⁷Lu-DOTATATE (Lutathera®)",
                "GEP-NETs, pNETs",
                "FDA approved 2016/2018; NETTER-2 data",
              ],
              [
                "FAP (fibroblast activation protein)",
                "⁶⁸Ga-FAPI-04",
                "¹⁷⁷Lu-FAPI / ⁹⁰Y-FAPI",
                "Pan-cancer (breast, pancreatic, sarcoma)",
                "Phase I/II trials; highly promising early data",
              ],
              [
                "HER2",
                "⁸⁹Zr-trastuzumab (PET)",
                "¹⁷⁷Lu-DOTAMTATE-HER2 / Ac-225-NM600",
                "Breast, gastric, HER2+ cancers",
                "Phase I/II; investigational",
              ],
              [
                "NTSR1 (neurotensin receptor)",
                "¹⁸F-neurotensin analogue",
                "¹⁷⁷Lu-3BP-227",
                "Pancreatic cancer (NTSR1 overexpressed)",
                "Phase I; orphan disease setting",
              ],
              [
                "Carbonic anhydrase IX",
                "¹⁸F-CAHISA",
                "²¹²Pb-TCMC-cG250",
                "Clear cell renal carcinoma",
                "Early phase; exploratory",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Terbium Isotopes: A Theranostic Quadruplet
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The terbium (Tb) element uniquely provides four isotopes usable in a
            single theranostic strategy — all chelated with the same DOTANOC
            ligand at the same geometry, guaranteeing identical
            pharmacokinetics:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              {
                iso: "¹⁴⁹Tb (α)",
                "T½": "4.12 h",
                use: "Targeted alpha therapy; ultra-short range; micrometastases",
              },
              {
                iso: "¹⁵²Tb (β⁺)",
                "T½": "17.5 h",
                use: "PET imaging; theranostic planning/dosimetry",
              },
              {
                iso: "¹⁵⁵Tb (EC/γ)",
                "T½": "5.32 d",
                use: "SPECT imaging; same biodistribution confirmation",
              },
              {
                iso: "¹⁶¹Tb (β⁻ + Auger)",
                "T½": "6.89 d",
                use: "Therapy; comparable kinetics to ¹⁷⁷Lu; Auger electron bonus",
              },
            ].map((t) => (
              <div
                key={t.iso}
                className="rounded-lg bg-muted/20 border border-border p-3 text-sm"
              >
                <div className="font-semibold text-foreground">
                  {t.iso} — T½: {t["T½"]}
                </div>
                <div className="text-muted-foreground mt-1">{t.use}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Sources: Müller C. et al. (2019) <em>J Nucl Med</em> 60, 1457; Baum
            R.P. et al. (2021) <em>J Nucl Med</em> 62(suppl 3); Sartor et al.
            (2021) <em>N Engl J Med</em> 385, 1091. Fusion Industry Association
            (2023); SNMMI 2024 Annual Meeting abstracts.
          </p>
        </CollapsibleSection>
      </div>
    </div>
  );
}
