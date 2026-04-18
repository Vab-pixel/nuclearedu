import { AudienceBadge } from "@/components/AudienceBadge";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Shield, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Helpers ────────────────────────────────────────────────────────────────

function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border mt-4">
      <table className="w-full text-sm" aria-label={caption}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            {headers.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={cn(
                  "px-4 py-2.5 text-left font-semibold text-foreground",
                  i > 0 && "border-l border-border/40",
                )}
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
              {row.map((cell, ci) => (
                <td
                  key={headers[ci] ?? ci}
                  className={cn(
                    "px-4 py-2.5 text-muted-foreground align-top",
                    ci === 0 && "font-medium text-foreground",
                    ci > 0 && "border-l border-border/40",
                  )}
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
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warning" | "safety";
  title: string;
  children: React.ReactNode;
}) {
  const configs = {
    info: {
      border: "border-primary/30",
      bg: "bg-primary/5",
      icon: <Info className="h-4 w-4 text-primary shrink-0" />,
    },
    warning: {
      border: "border-secondary/40",
      bg: "bg-secondary/5",
      icon: <AlertTriangle className="h-4 w-4 text-secondary shrink-0" />,
    },
    safety: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      icon: <Shield className="h-4 w-4 text-emerald-500 shrink-0" />,
    },
  };
  const c = configs[variant];
  return (
    <div
      className={cn("rounded-lg border p-4 flex gap-3 mt-4", c.border, c.bg)}
    >
      {c.icon}
      <div>
        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

// ── Dose chart data ───────────────────────────────────────────────────────

type DoseEntry = {
  label: string;
  mSv: number;
  color: string;
  pattern: string;
};

const doseData: DoseEntry[] = [
  {
    label: "Transatlantic flight",
    mSv: 0.08,
    color: "#22c55e",
    pattern: "low",
  },
  { label: "Chest X-ray", mSv: 0.1, color: "#22c55e", pattern: "low" },
  { label: "Mammogram", mSv: 0.4, color: "#22c55e", pattern: "low" },
  {
    label: "Background radiation/yr",
    mSv: 2.4,
    color: "#eab308",
    pattern: "medium",
  },
  {
    label: "Annual occupational limit",
    mSv: 20,
    color: "#eab308",
    pattern: "medium",
  },
  { label: "CT abdomen", mSv: 8, color: "#eab308", pattern: "medium" },
  {
    label: "Fukushima max worker dose",
    mSv: 250,
    color: "#f97316",
    pattern: "high",
  },
  {
    label: "Acute lethal dose (ARS)",
    mSv: 4000,
    color: "#ef4444",
    pattern: "very-high",
  },
  {
    label: "Chernobyl firefighters",
    mSv: 6000,
    color: "#ef4444",
    pattern: "very-high",
  },
];

const sortedDoseData = [...doseData].sort((a, b) => a.mSv - b.mSv);

function colorForDose(mSv: number) {
  if (mSv < 1) return "#22c55e";
  if (mSv <= 20) return "#eab308";
  if (mSv <= 1000) return "#f97316";
  return "#ef4444";
}

function DoseChart() {
  return (
    <div
      className="mt-6 rounded-xl border border-border bg-muted/20 p-4"
      role="img"
      aria-label="Horizontal bar chart comparing radiation doses from common sources on a logarithmic scale"
    >
      <p className="text-sm font-semibold text-foreground mb-1">
        Comparative Radiation Doses (log scale, mSv)
      </p>
      <p className="text-xs text-muted-foreground mb-3">
        Sources: UNSCEAR 2020; ICRP Publication 103; NRC Backgrounder on
        Radiation Exposure
      </p>

      {/* Legend — color + shape description for color-blind accessibility */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        {[
          { color: "#22c55e", label: "< 1 mSv (Low)", shape: "●" },
          { color: "#eab308", label: "1–20 mSv (Moderate)", shape: "■" },
          { color: "#f97316", label: "20–1,000 mSv (High)", shape: "▲" },
          { color: "#ef4444", label: "> 1,000 mSv (Very High)", shape: "◆" },
        ].map(({ color, label, shape }) => (
          <span key={label} className="flex items-center gap-1">
            <span style={{ color }} aria-hidden="true">
              {shape}
            </span>
            <span className="text-muted-foreground">{label}</span>
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={sortedDoseData}
          layout="vertical"
          margin={{ top: 0, right: 80, left: 0, bottom: 4 }}
          aria-label="Radiation dose comparison chart"
        >
          <XAxis
            type="number"
            scale="log"
            domain={[0.01, 10000]}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${v / 1000}k` : String(v)
            }
            tick={{ fontSize: 10, fill: "var(--foreground)" }}
            label={{
              value: "Dose (mSv, log scale)",
              position: "insideBottom",
              offset: -2,
              fontSize: 10,
              fill: "var(--muted-foreground)",
            }}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={180}
            tick={{ fontSize: 10, fill: "var(--foreground)" }}
          />
          <Tooltip
            formatter={(value: number) => [`${value} mSv`, "Dose"]}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              fontSize: "12px",
              color: "var(--foreground)",
            }}
          />
          <Bar dataKey="mSv" radius={[0, 4, 4, 0]} minPointSize={2}>
            {sortedDoseData.map((entry) => (
              <Cell key={entry.label} fill={colorForDose(entry.mSv)} />
            ))}
            <LabelList
              dataKey="mSv"
              position="right"
              formatter={(v: number) => `${v} mSv`}
              style={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Accessible table alternative */}
      <details className="mt-4">
        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
          View as table (accessible alternative)
        </summary>
        <DataTable
          caption="Radiation doses from common sources"
          headers={["Source", "Dose (mSv)", "Risk Level"]}
          rows={sortedDoseData.map((d) => [
            d.label,
            `${d.mSv} mSv`,
            d.mSv < 1
              ? "Low"
              : d.mSv <= 20
                ? "Moderate"
                : d.mSv <= 1000
                  ? "High"
                  : "Very High",
          ])}
        />
      </details>
    </div>
  );
}

// ── Radiation type badges ──────────────────────────────────────────────────

const radiationTypes = [
  {
    symbol: "α",
    name: "Alpha",
    mass: "~4 amu",
    charge: "+2",
    penetration: "Paper / few cm air",
    bio: "High (w_R = 20)",
    example: "Radon-222 decay",
    color: "bg-red-500/10 border-red-500/30 text-red-400",
  },
  {
    symbol: "β",
    name: "Beta",
    mass: "~0.00055 amu",
    charge: "−1 or +1",
    penetration: "Plastic / few mm Al",
    bio: "Moderate (w_R = 1)",
    example: "C-14, Sr-90 decay",
    color: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    symbol: "γ",
    name: "Gamma",
    mass: "0",
    charge: "0",
    penetration: "Thick lead / concrete",
    bio: "Moderate (w_R = 1)",
    example: "Co-60, Cs-137",
    color: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    symbol: "n",
    name: "Neutron",
    mass: "~1 amu",
    charge: "0",
    penetration: "Dense polyethylene / water",
    bio: "Very high (w_R = 2–20)",
    example: "Reactor core, Cf-252",
    color: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    symbol: "X",
    name: "X-Ray",
    mass: "0",
    charge: "0",
    penetration: "Lead aprons / thick Al",
    bio: "Moderate (w_R = 1)",
    example: "Medical imaging",
    color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
];

// ── Main page ──────────────────────────────────────────────────────────────

export function RadiationSafety() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl" id="main-content">
      <BreadcrumbNav
        items={[
          { label: "Safety", href: "/safety" },
          { label: "Radiation Safety" },
        ]}
      />
      <PageHeader
        title="Radiation Safety"
        subtitle="Principles, dose limits, measurement units, shielding, and emergency response — from intuitive analogies for beginners to quantitative IAEA/NCRP standards for professionals."
        audienceLevel="intermediate"
        readTimeMin={22}
      />

      <div className="grid gap-6">
        {/* ── Section 1: What is Radiation? ── */}
        <SectionCard data-ocid="radiation_safety.intro_card" glowAccent>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            1. What is Radiation?
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <AudienceBadge level="beginner" />
            <AudienceBadge level="intermediate" />
            <AudienceBadge level="professional" />
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Radiation is energy travelling through space. It comes in two
            fundamental categories:{" "}
            <strong className="text-foreground">ionizing</strong> radiation,
            which carries enough energy to knock electrons out of atoms
            (creating ions), and{" "}
            <strong className="text-foreground">non-ionizing</strong> radiation
            (visible light, radio waves, microwaves) which does not. Nuclear
            safety concerns itself exclusively with <em>ionizing</em> radiation.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 mb-5">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                <p className="font-semibold text-foreground text-sm">
                  Ionizing Radiation
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Alpha, beta, gamma, neutron, and X-rays. Sufficient energy to
                break chemical bonds and damage DNA. Source of both medical
                benefit and biological risk.
              </p>
            </div>
            <div className="rounded-lg border border-muted bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="font-semibold text-foreground text-sm">
                  Non-Ionizing Radiation
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                UV light, visible light, infrared, microwaves, radio waves.
                Insufficient energy to ionize atoms — different biological
                mechanisms and generally lower health risk per unit energy.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-3">
            The Five Types of Ionizing Radiation
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {radiationTypes.map((rt) => (
              <div
                key={rt.name}
                className={cn("rounded-lg border p-4", rt.color)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-mono text-lg font-bold"
                    aria-label={rt.name}
                  >
                    {rt.symbol}
                  </span>
                  <span className="font-semibold text-sm text-foreground">
                    {rt.name}
                  </span>
                </div>
                <dl className="text-xs space-y-0.5 text-muted-foreground">
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground/80 w-20 shrink-0">
                      Penetration
                    </dt>
                    <dd>{rt.penetration}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground/80 w-20 shrink-0">
                      Bio weight
                    </dt>
                    <dd>{rt.bio}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground/80 w-20 shrink-0">
                      Example
                    </dt>
                    <dd>{rt.example}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mt-6 mb-2">
            Natural vs. Artificial Sources
          </h3>
          <DataTable
            caption="Natural and artificial sources of ionizing radiation"
            headers={["Category", "Source", "Typical Dose Contribution"]}
            rows={[
              [
                "Natural — Cosmic",
                "High-energy particles from outer space; increases with altitude",
                "~0.39 mSv/yr at sea level (UNSCEAR 2020)",
              ],
              [
                "Natural — Terrestrial",
                "Radionuclides in soil and rock (U-238, Th-232, K-40)",
                "~0.48 mSv/yr world average",
              ],
              [
                "Natural — Internal",
                "K-40 in body tissues; C-14 in soft tissues",
                "~0.29 mSv/yr",
              ],
              [
                "Natural — Radon/Thoron",
                "Inhalation of radon-222 daughters in indoor air",
                "~1.26 mSv/yr (dominant natural source)",
              ],
              [
                "Artificial — Medical",
                "Diagnostic X-rays, CT scans, nuclear medicine",
                "~0.6 mSv/yr (world average)",
              ],
              [
                "Artificial — Occupational",
                "Nuclear workers, radiologists, flight crew",
                "< 20 mSv/yr limit (IAEA BSS)",
              ],
              [
                "Artificial — Fallout",
                "Residual atmospheric nuclear test fallout (C-14, Cs-137)",
                "< 0.005 mSv/yr (declining)",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: UNSCEAR 2020 Report, Annex B. World average total natural
            background ≈ 2.4 mSv/yr.
          </p>
        </SectionCard>

        {/* ── Section 2: Health Effects ── */}
        <CollapsibleSection
          id="radiation_safety_health"
          title="2. How Radiation Affects the Body"
          data-ocid="radiation_safety.health_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
          defaultOpen={false}
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ionizing radiation deposits energy in biological tissue, breaking
            chemical bonds and generating reactive oxygen species. The primary
            target is DNA — strand breaks, base damage, and cross-links can lead
            to cell death or, if misrepaired, mutations that may cause cancer
            decades later.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="font-semibold text-foreground mb-1 text-sm">
                Deterministic Effects (Tissue Reactions)
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Occur above a <em>threshold dose</em>. Severity increases with
                dose. Examples: acute radiation syndrome (ARS), erythema,
                cataracts, sterility.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Acute Radiation Syndrome: &gt; 1 Gy whole-body in hours</li>
                <li>Skin erythema: &gt; 2 Gy local dose</li>
                <li>
                  Lens opacification: &gt; 0.5 Gy (ICRP 2011 updated threshold)
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="font-semibold text-foreground mb-1 text-sm">
                Stochastic Effects
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                No threshold — probability (not severity) increases with dose.
                Severity is the same regardless of dose. Examples: cancer,
                hereditary effects.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>
                  Lifetime cancer risk: ~5.5% per Sv effective dose (ICRP-103)
                </li>
                <li>
                  Heritable effects: ~0.2% per Sv (much lower than cancer risk)
                </li>
                <li>
                  Risk is additive — applies from any dose above zero (LNT
                  model)
                </li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            The Linear No-Threshold (LNT) Model
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The LNT model assumes that any dose of radiation, however small,
            carries some finite probability of causing cancer — there is no
            completely safe dose. Risk is proportional to dose. This is the
            model adopted by ICRP, NCRP, UNSCEAR, and most national regulators
            for radiation protection purposes, though it remains debated at very
            low doses (&lt; 10 mSv).
          </p>

          <InfoBox variant="info" title="Why LNT Matters for Regulation">
            Even if the biological evidence at very low doses is uncertain,
            regulators use LNT to be conservative. It means dose limits are set
            to keep risk as low as reasonably achievable (ALARA), not merely
            below a known threshold. NCRP Report No. 136 (2001) and ICRP
            Publication 103 both endorse LNT for radiation protection.
          </InfoBox>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Acute Radiation Syndrome (ARS) — Dose–Response
          </h3>
          <DataTable
            caption="Acute Radiation Syndrome dose-response relationship"
            headers={[
              "Whole-Body Dose",
              "Syndrome / Effect",
              "Onset",
              "Outcome (untreated)",
            ]}
            rows={[
              [
                "< 0.1 Gy",
                "No clinically detectable effect",
                "—",
                "Full recovery",
              ],
              [
                "0.1–1 Gy",
                "Minor transient changes in blood counts; nausea possible at upper end",
                "Days–weeks",
                "Full recovery",
              ],
              [
                "1–2 Gy",
                "Hematopoietic syndrome: significant bone marrow suppression, fatigue, infection risk",
                "1–3 weeks",
                "Recovery likely with supportive care",
              ],
              [
                "2–6 Gy",
                "Moderate–severe hematopoietic syndrome; GI effects begin at > 6 Gy",
                "Days–weeks",
                "50% lethal dose LD50/60 ≈ 3–5 Gy",
              ],
              [
                "6–10 Gy",
                "Severe hematopoietic + GI syndrome; massive diarrhea, hemorrhage",
                "Hours–days",
                "Near-lethal without intensive support",
              ],
              [
                "> 10 Gy",
                "Neurovascular syndrome (cerebrovascular effects); cardiovascular collapse",
                "Hours",
                "Fatal within days to weeks",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: NCRP Report No. 161 (2010); Donnelly et al., NEJM 2010;
            Waselenko et al., Ann. Intern. Med. 2004.
          </p>

          <EquationBlock
            latex="\\text{RIED} = \\sum_i D_i \\cdot w_{R,i} \\cdot w_{T,i}"
            annotation="Effective dose (in Sv) sums absorbed dose D_i in each tissue T weighted by radiation weighting factor w_R (accounts for radiation quality) and tissue weighting factor w_T (accounts for cancer sensitivity of that tissue). This allows comparing doses from different radiation types across different body regions on a single risk-equivalent scale."
            label="Effective Dose (ICRP-103)"
          />
        </CollapsibleSection>

        {/* ── Section 3: Units & Measurement ── */}
        <CollapsibleSection
          id="radiation_safety_units"
          title="3. Radiation Units & Measurement"
          data-ocid="radiation_safety.units_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="beginner" />
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Multiple measurement systems exist because different quantities
            matter for different purposes: absorbed energy, biological damage,
            and source activity each require different units. The SI system (Gy,
            Sv, Bq) is now standard, but legacy US units (rad, rem, Ci) remain
            in widespread use.
          </p>

          <DataTable
            caption="Radiation measurement units, SI and legacy"
            headers={[
              "Unit",
              "Symbol",
              "Quantity Measured",
              "SI Equivalent / Conversion",
            ]}
            rows={[
              [
                "Gray",
                "Gy",
                "Absorbed dose — energy deposited per unit mass of tissue",
                "1 Gy = 1 J/kg; 1 Gy = 100 rad",
              ],
              [
                "rad",
                "rad",
                "Absorbed dose (legacy US unit)",
                "1 rad = 0.01 Gy = 10 mGy",
              ],
              [
                "Sievert",
                "Sv",
                "Effective/equivalent dose — dose weighted for biological effect",
                "1 Sv = 100 rem; for gamma/X-ray: 1 Sv = 1 Gy",
              ],
              [
                "rem",
                "rem",
                "Equivalent dose (legacy US unit — Röntgen Equivalent Man)",
                "1 rem = 0.01 Sv = 10 mSv",
              ],
              [
                "Becquerel",
                "Bq",
                "Activity — number of radioactive disintegrations per second",
                "1 Bq = 1 disintegration/s; SI unit",
              ],
              [
                "Curie",
                "Ci",
                "Activity (legacy unit — based on Ra-226 decay rate)",
                "1 Ci = 3.7 × 10¹⁰ Bq = 37 GBq",
              ],
              [
                "Röntgen",
                "R",
                "Exposure — ionization in air (X-ray and gamma only)",
                "1 R ≈ 0.00877 Gy in air; obsolete but still seen",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Sources: IAEA Safety Reports Series No. 16; NIST SP 811 (2008).
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Radiation Weighting Factors (w_R) — ICRP-103
          </h3>
          <DataTable
            caption="Radiation weighting factors by radiation type"
            headers={[
              "Radiation Type",
              "Energy Range",
              "w_R Value",
              "Biological Significance",
            ]}
            rows={[
              [
                "X-rays and gamma rays",
                "All energies",
                "1",
                "Reference — all other types compared to this",
              ],
              [
                "Electrons and muons (beta)",
                "All energies",
                "1",
                "Same RBE as photons at low LET",
              ],
              [
                "Protons and charged pions",
                "All energies",
                "2",
                "Slightly higher ionization density",
              ],
              [
                "Alpha particles, fission fragments, heavy ions",
                "All energies",
                "20",
                "Very high LET — dense ionization track; internalized sources most dangerous",
              ],
              [
                "Neutrons",
                "< 1 MeV",
                "2.5–20 (varies with energy)",
                "Peak w_R ≈ 20 at 1 MeV; decreases at higher energies",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Tissue Weighting Factors (w_T) — ICRP-103
          </h3>
          <DataTable
            caption="Tissue weighting factors for effective dose calculation"
            headers={["Tissue/Organ", "w_T", "Rationale"]}
            rows={[
              [
                "Bone marrow (red), Colon, Lung, Stomach, Breast, Remainder",
                "0.12 each",
                "Highest cancer risk from uniform whole-body irradiation",
              ],
              [
                "Gonads",
                "0.08",
                "Reduced from 0.20 in ICRP-60; hereditary effects lower than originally estimated",
              ],
              [
                "Bladder, Oesophagus, Liver, Thyroid",
                "0.04 each",
                "Moderate cancer incidence from radiation",
              ],
              [
                "Bone surface, Brain, Salivary glands, Skin",
                "0.01 each",
                "Lower but non-zero cancer risk",
              ],
              [
                "Sum (all tissues)",
                "1.00",
                "Normalized so effective dose equals sum of weighted equivalent doses",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: ICRP Publication 103 (2007), Table 3. The thyroid w_T of
            0.04 is key for KI prophylaxis rationale — thyroid is a sensitive
            target for radioiodine.
          </p>
        </CollapsibleSection>

        {/* ── Section 4: Dose Reference Chart ── */}
        <CollapsibleSection
          id="radiation_safety_doses"
          title="4. Dose Reference Chart"
          data-ocid="radiation_safety.doses_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="beginner" />
              <AudienceBadge level="intermediate" />
            </span>
          }
          defaultOpen
        >
          <p className="text-muted-foreground leading-relaxed mb-2">
            The chart below compares doses from everyday and occupational
            exposures. The logarithmic scale spans six orders of magnitude —
            from 0.08 mSv (transatlantic flight) to 6,000 mSv (Chernobyl
            firefighter exposures). Colors encode risk tier; shapes distinguish
            them for color-blind accessibility.
          </p>

          <DoseChart />

          <InfoBox variant="warning" title="Context for High-Dose Events">
            The Chernobyl firefighter and Fukushima worker doses shown are
            extreme historical events under emergency conditions, not typical
            operational doses. Modern nuclear power plant workers average less
            than 2 mSv/year in the US — below the dose from a single chest CT
            scan.
            <br />
            <span className="block mt-1">
              Source: NRC 2023 Occupational Radiation Exposure Annual Report.
            </span>
          </InfoBox>
        </CollapsibleSection>

        {/* ── Section 5: ALARA Principles ── */}
        <CollapsibleSection
          id="radiation_safety_alara"
          title="5. Radiation Safety Principles (ALARA)"
          data-ocid="radiation_safety.alara_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="beginner" />
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">
              ALARA — As Low As Reasonably Achievable
            </strong>{" "}
            — is the cornerstone operational principle of radiation protection.
            It requires that all exposures be reduced as far as practical,
            balancing benefits and costs. ALARA does not mean "zero dose at any
            cost" — it means optimizing protection within the constraints of
            technology, economics, and social factors.
          </p>

          <h3 className="font-semibold text-foreground mb-3">
            The Time–Distance–Shielding Triad
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Time",
                icon: "⏱",
                desc: "Reduce time in a radiation field. Dose is proportional to time: D = Ḋ × t. Pre-plan tasks, use mockups to practice, assign multiple workers to rotate.",
                tip: "Practical: Work in short rotations near high-dose sources; use robotic tools for repetitive tasks near reactors.",
              },
              {
                title: "Distance",
                icon: "📏",
                desc: "Increase distance from the source. For a point source, dose rate follows the inverse-square law: Ḋ ∝ 1/r². Doubling distance reduces dose by 75%.",
                tip: "Practical: Use remote handling tools, long-handled manipulators, and keep non-essential personnel away from work areas.",
              },
              {
                title: "Shielding",
                icon: "🛡",
                desc: "Interpose absorbing material between source and person. Gamma requires dense materials (lead, concrete); neutrons need hydrogen-rich materials; alpha is stopped by paper.",
                tip: "Practical: Lead aprons in fluoroscopy suites; polyethylene bricks for portable neutron sources; concrete walls in nuclear plant work areas.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <p className="font-semibold text-foreground">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.desc}
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mt-6 mb-2">
            IAEA Basic Safety Standards (IAEA GSR Part 3, 2014)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The IAEA General Safety Requirements (GSR) Part 3 — "Radiation
            Protection and Safety of Radiation Sources: International Basic
            Safety Standards" — is the foundational international document
            setting dose limits and protection principles. It replaces the 1996
            BSS (Safety Series 115) and incorporates ICRP-103 recommendations.
          </p>

          <h3 className="font-semibold text-foreground mb-2">Dose Limits</h3>
          <DataTable
            caption="Radiation dose limits per IAEA BSS and ICRP-103"
            headers={["Population", "Quantity", "Limit", "Basis"]}
            rows={[
              [
                "Occupational",
                "Effective dose",
                "20 mSv/yr averaged over 5 consecutive years; max 50 mSv in any single year",
                "IAEA GSR Part 3, Req. 23; ICRP-103",
              ],
              [
                "Occupational",
                "Equivalent dose — eye lens",
                "20 mSv/yr averaged over 5 years (revised 2011)",
                "ICRP Statement 2011; implemented in IAEA GSR Part 3",
              ],
              [
                "Occupational",
                "Equivalent dose — skin / extremities",
                "500 mSv/yr (localized, averaged over 1 cm²)",
                "ICRP-103 Table 6",
              ],
              [
                "Pregnant occupational worker",
                "Equivalent dose to embryo/fetus",
                "1 mSv after declaration of pregnancy",
                "IAEA GSR Part 3",
              ],
              [
                "Public",
                "Effective dose",
                "1 mSv/yr from all licensed sources combined",
                "ICRP-103; IAEA GSR Part 3",
              ],
              [
                "Public — single facility constraint",
                "Effective dose",
                "0.3 mSv/yr (ICRP optimization constraint)",
                "ICRP Publication 101",
              ],
            ]}
          />

          <EquationBlock
            latex="\\dot{D}(r) = \\dot{D}_0 \\cdot \\left(\\frac{r_0}{r}\\right)^2"
            annotation="Inverse-square law: dose rate Ḋ at distance r equals the reference dose rate Ḋ₀ at reference distance r₀ times (r₀/r)². For example, moving from 1 m to 2 m from a point source reduces dose rate by a factor of 4 (inverse of 2² = 4). This assumes no buildup or scattering — real sources require correction factors."
            label="Inverse-Square Law for Radiation Dose Rate"
          />
        </CollapsibleSection>

        {/* ── Section 6: Shielding Table ── */}
        <CollapsibleSection
          id="radiation_safety_shielding"
          title="6. Shielding Materials"
          data-ocid="radiation_safety.shielding_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Shielding effectiveness is expressed as the{" "}
            <strong className="text-foreground">Half-Value Layer (HVL)</strong>{" "}
            — the thickness of material needed to reduce radiation intensity by
            half. Ten HVLs (TVL = Tenth-Value Layer × 3.32) reduces intensity by
            a factor of ~1,000. Material choice depends critically on radiation
            type: gamma requires dense materials, neutrons require hydrogen-rich
            materials.
          </p>

          <DataTable
            caption="Shielding properties of common materials"
            headers={[
              "Material",
              "Density (g/cm³)",
              "HVL — 1 MeV gamma (cm)",
              "HVL — beta shielding (mm Al equiv.)",
              "Alpha penetration",
            ]}
            rows={[
              [
                "Lead (Pb)",
                "11.34",
                "~0.87",
                "N/A (bremsstrahlung concern — use low-Z first)",
                "Stopped by < 0.05 mm",
              ],
              [
                "Concrete (ordinary)",
                "2.35",
                "~10.8",
                "~6 mm for 1 MeV beta",
                "Stopped by < 0.01 mm surface",
              ],
              [
                "Water (H₂O)",
                "1.00",
                "~18.0",
                "~5.4 mm for 1 MeV beta; excellent neutron moderator",
                "Stopped by < 0.03 mm",
              ],
              [
                "Steel (Fe)",
                "7.87",
                "~2.2",
                "~5 mm for 1 MeV beta",
                "Stopped by any solid surface",
              ],
              [
                "Polyethylene (HDPE)",
                "0.95",
                "~30+ (poor for gamma)",
                "~6 mm; excellent for neutrons — high H content",
                "N/A",
              ],
              [
                "Air (dry, STP)",
                "0.00120",
                "~130 m",
                "~4 m for 1 MeV beta particles",
                "3–7 cm (5 MeV alpha)",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            HVL values for 1 MeV gamma from NIST XCOM Photon Cross Sections
            database (Berger et al., 2010). Beta HVL values from NIST ESTAR
            database. Values are approximate; actual effectiveness depends on
            geometry, source spectrum, and build-up factors.
          </p>

          <InfoBox variant="info" title="Shielding Design Principle">
            For mixed-field environments (gamma + beta), the correct sequence is
            low-Z material first (to minimize bremsstrahlung X-ray production
            from beta slowing down), then high-Z material. Lead directly on a
            beta source can worsen the total dose from secondary X-rays. For
            neutron + gamma fields, a combination of polyethylene (neutron
            moderation), boron (neutron capture), and steel/lead (gamma
            attenuation) is standard.
          </InfoBox>

          <EquationBlock
            latex="I(x) = I_0 \\cdot e^{-\\mu x}"
            annotation="Exponential attenuation: beam intensity I at depth x through shielding material equals initial intensity I₀ times e^(−μx), where μ is the linear attenuation coefficient (cm⁻¹). The HVL = ln(2)/μ ≈ 0.693/μ. For broad-beam geometry, a build-up factor B is applied: I(x) = B · I₀ · e^(−μx), since scattered photons contribute to dose beyond the primary beam."
            label="Gamma-Ray Attenuation in Shielding (Narrow Beam)"
          />
        </CollapsibleSection>

        {/* ── Section 7: PPE ── */}
        <CollapsibleSection
          id="radiation_safety_ppe"
          title="7. Personal Protective Equipment & Dosimetry"
          data-ocid="radiation_safety.ppe_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="beginner" />
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Personal dosimetry records individual radiation exposures for
            occupational monitoring and regulatory compliance. Protective
            clothing and respiratory equipment prevent contamination — they do
            not shield against external penetrating radiation.
          </p>

          <h3 className="font-semibold text-foreground mb-3">
            Dosimetry Devices
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "TLD (Thermoluminescent Dosimeter)",
                badge: "Standard",
                desc: "Lithium fluoride or calcium fluoride crystals store energy from ionizing radiation; heated to release light proportional to absorbed dose. Monthly exchange. Sensitive to gamma, X-ray, beta. Official dose of record in most countries.",
                color: "border-primary/20",
              },
              {
                name: "OSL (Optically Stimulated Luminescence)",
                badge: "Modern Standard",
                desc: "Aluminum oxide (Al₂O₃:C) crystals stimulated by laser light to release stored energy as luminescence. Can be re-read multiple times without erasing. Higher sensitivity than TLD; distinguishes radiation types. Now the dominant badge in US nuclear power.",
                color: "border-accent/20",
              },
              {
                name: "Film Badge",
                badge: "Legacy",
                desc: "Photographic film blackened by radiation; different filter regions distinguish radiation types and energies. Largely replaced by TLD/OSL but still used in some international programs.",
                color: "border-muted",
              },
              {
                name: "Electronic Personal Dosimeter (EPD)",
                badge: "Real-Time",
                desc: "Silicon diode or ion chamber providing real-time dose rate and accumulated dose readout with audible alarm. Mandatory in many controlled areas as a supplement to passive dosimetry for immediate dose rate awareness.",
                color: "border-secondary/20",
              },
              {
                name: "Ring / Extremity Dosimeter",
                badge: "Specialty",
                desc: "TLD or OSL in ring form for monitoring hand doses in radiology procedures, nuclear medicine injection work, and radiation oncology brachytherapy. Extremity doses can greatly exceed whole-body doses in manual handling procedures.",
                color: "border-muted",
              },
              {
                name: "Neutron Dosimeter",
                badge: "Nuclear Facilities",
                desc: "Track-etch detectors (CR-39 plastic) or superheated bubble detectors for personnel neutron dosimetry. Required for workers in reactor areas, critical facilities, and accelerator environments.",
                color: "border-muted",
              },
            ].map((device) => (
              <div
                key={device.name}
                className={`rounded-lg border bg-muted/20 p-4 ${device.color}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-foreground text-sm leading-tight">
                    {device.name}
                  </p>
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium text-muted-foreground shrink-0">
                    {device.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {device.desc}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Protective Clothing Overview
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Protective clothing in radiological environments prevents skin
            contamination and inhalation of radioactive particles. It does{" "}
            <em>not</em> provide any shielding against penetrating gamma or
            neutron radiation.
          </p>
          <DataTable
            caption="Radiation protective clothing and their purposes"
            headers={["Equipment", "Protection Against", "Typical Use"]}
            rows={[
              [
                "Coveralls (Tyvek or cotton)",
                "Beta particles; surface contamination; alpha",
                "Routine nuclear plant work; laboratory hot work; decontamination",
              ],
              [
                "Rubber gloves (double)",
                "Skin contamination; alpha and weak beta particles",
                "All radiological handling; nuclear medicine preparation",
              ],
              [
                "Respiratory protection (N95, PAPR, SCBA)",
                "Inhalation of radioactive particles; radioiodine with charcoal filter",
                "Airborne contamination areas; nuclear accident response; sealed source work with fire risk",
              ],
              [
                "Lead apron (~0.5 mm Pb)",
                "Scattered low-energy X-rays; fluoroscopy",
                "Radiology rooms; cardiac catheterization; fluoroscopy-guided interventions",
              ],
              [
                "Lead thyroid collar",
                "Scattered X-rays to thyroid",
                "Fluoroscopy; interventional radiology",
              ],
              [
                "Lead glasses",
                "Scattered X-rays to eye lens",
                "High-volume fluoroscopy; vascular interventionalists",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: IAEA Safety Reports Series No. 16; NCRP Report No. 105.
            Note: lead aprons are protective against scattered X-rays in
            fluoroscopy but provide minimal protection against the primary 511
            keV annihilation photons in PET/nuclear medicine.
          </p>
        </CollapsibleSection>

        {/* ── Section 8: Contamination Control ── */}
        <CollapsibleSection
          id="radiation_safety_contamination"
          title="8. Contamination Control (Overview)"
          data-ocid="radiation_safety.contamination_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
        >
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mb-4 flex gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-500/90">
              <strong>Content Safety Note:</strong> This section provides
              high-level conceptual information only. Step-by-step
              decontamination procedures and detailed radiological surveys are
              beyond the scope of this educational overview. For operational
              guidance, refer to IAEA Safety Standards and qualified health
              physics professionals.
            </p>
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            External vs. Internal Contamination
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">
                External Contamination
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Radioactive material deposited on skin, hair, clothing, or
                surfaces. Can be detected with survey instruments and generally
                removed by washing with mild soap and water.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>
                  Primary concern: beta-emitters on skin (direct dose to skin)
                </li>
                <li>
                  Detection: GM survey meters, alpha monitors, contamination
                  swipes
                </li>
                <li>
                  Decontamination: generally follows ALARA, normal hygiene first
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">
                Internal Contamination
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Radioactive material entering the body through inhalation,
                ingestion, or wounds. More serious — material delivers dose
                directly to organs, often for an extended period determined by
                the isotope's biological half-life.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>
                  Most hazardous pathway: inhalation of radioactive aerosols
                  (Pu-239, Am-241)
                </li>
                <li>
                  Detection: whole-body counting (in-vivo); bioassay (urine,
                  fecal)
                </li>
                <li>
                  Committed dose: continues after exposure ends, over biological
                  retention period
                </li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            Key Monitoring Concepts
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Radiological monitoring falls into two categories: area monitoring
            (fixed instruments and periodic surveys measuring contamination
            levels and dose rates in workspaces) and personal monitoring
            (dosimetry devices and periodic bioassay programs for workers in
            contamination-controlled areas).
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Contamination Control Principles
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              {
                title: "Containment at source",
                desc: "Prevent spread by conducting contamination-prone work inside gloveboxes, fume hoods, or demarcated controlled zones with negative-pressure air handling.",
              },
              {
                title: "Contamination monitoring",
                desc: "Exit monitoring — survey portals and hand/shoe monitors at zone boundaries prevent inadvertent spread from controlled to uncontrolled areas.",
              },
              {
                title: "Waste segregation",
                desc: "Radioactive waste is segregated by physical form, activity level, and half-life for compliant disposal. Short-lived waste (< 90-day rule) may be stored for decay.",
              },
              {
                title: "Respiratory hazard assessment",
                desc: "Airborne contamination sampling determines when respiratory protection is required. Trigger levels are set as fractions of Derived Air Concentrations (DAC).",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <p className="text-sm font-semibold text-foreground mb-1">
                  {p.title}
                </p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* ── Section 9: Emergency Response ── */}
        <CollapsibleSection
          id="radiation_safety_emergency"
          title="9. Emergency Response (High-Level Overview)"
          data-ocid="radiation_safety.emergency_section"
          badge={
            <span className="flex gap-1.5">
              <AudienceBadge level="beginner" />
              <AudienceBadge level="intermediate" />
              <AudienceBadge level="professional" />
            </span>
          }
        >
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mb-5 flex gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-500/90">
              High-level framework overview only. Actual emergency response is
              directed by national authorities (NRC, national regulators) and
              trained emergency responders. Follow instructions from official
              authorities during any radiological emergency.
            </p>
          </div>

          <h3 className="font-semibold text-foreground mb-3">
            Shelter-in-Place vs. Evacuation Decision Framework
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The primary decision in a nuclear emergency is whether the public
            should stay indoors (shelter in place) or evacuate. Both actions
            reduce dose; the optimal choice depends on release magnitude,
            timing, and weather.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 mb-5">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">
                Shelter-in-Place
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Effective for short-duration releases</li>
                <li>
                  A well-sealed modern building reduces gamma dose by ~50% and
                  inhalation dose by ~90%
                </li>
                <li>Can be implemented faster than mass evacuation</li>
                <li>
                  Preferred when release is expected to pass quickly (&lt; 24
                  hours)
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">
                Evacuation
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>
                  Effective for large, sustained releases with long
                  contamination persistence
                </li>
                <li>Removes people from contaminated area entirely</li>
                <li>
                  Can itself cause harm (accidents, stress, disruption of
                  medical care)
                </li>
                <li>
                  IAEA reference level: consider evacuation when projected dose
                  exceeds 20–100 mSv
                </li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            Emergency Planning Zones (EPZ)
          </h3>
          <DataTable
            caption="Nuclear emergency planning zones"
            headers={["Zone", "Radius (typical)", "Purpose"]}
            rows={[
              [
                "Precautionary Action Zone (PAZ)",
                "~3–5 km (IAEA) / 10 miles (US NRC)",
                "Pre-planned protective actions (shelter, evacuation, KI) can be implemented quickly before significant releases",
              ],
              [
                "Urgent Protective Action Zone (UPZ)",
                "~15–25 km (IAEA) / 10-mile plume zone",
                "Area where urgent protective actions (shelter, evacuation) are implemented based on actual measurements and projections",
              ],
              [
                "Ingestion and Commodities Zone (ICZ)",
                "Up to 300 km",
                "Area where food, water, and commodity restrictions may be needed following significant releases; 50-mile ingestion pathway zone in US",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: IAEA General Safety Guide GSG-2 (2011); US NRC emergency
            planning regulations (10 CFR 50 Appendix E).
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Potassium Iodide (KI) for Thyroid Protection
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Stable (non-radioactive) potassium iodide saturates the thyroid
            gland with non-radioactive iodine, blocking uptake of radioactive
            iodine-131 that may be released in a nuclear accident. KI is
            specifically protective against thyroid cancer from I-131 only — it
            does not protect against other radiation or other radioactive
            materials.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox variant="safety" title="KI Effectiveness">
              When taken immediately before or shortly after radioiodine
              exposure, KI reduces thyroid dose by up to 95%. Effectiveness
              drops rapidly if taken more than 4 hours after exposure. Age,
              dose, and timing all determine whether KI distribution is
              warranted by public health authorities.
            </InfoBox>
            <InfoBox variant="warning" title="KI Limitations">
              KI only protects the thyroid, and only against radioiodine. It
              does not protect against external radiation, other internal
              emitters, or other cancers. Distribution is controlled by public
              health authorities — do not stockpile or use without
              medical/government guidance. Sources: FDA Guidance on KI Use
              (2001); WHO guidance on iodine thyroid blocking (2017).
            </InfoBox>
          </div>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Key Emergency Agencies
          </h3>
          <DataTable
            caption="International nuclear emergency response agencies"
            headers={["Agency", "Role in Radiological Emergencies"]}
            rows={[
              [
                "IAEA — Emergency Preparedness and Response",
                "Operates IAEA Response and Assistance Network (RANET); provides international assistance, dose assessment, and technical guidance; runs INES incident reporting scale",
              ],
              [
                "IAEA INES (International Nuclear Event Scale)",
                "7-level scale rating severity of nuclear and radiological events; INES 7 = major accident (Chernobyl, Fukushima); INES 1–3 = anomaly/incident; INES 4–6 = accident",
              ],
              [
                "WHO (World Health Organization)",
                "Coordinates public health response; health effect assessment; risk communication guidance",
              ],
              [
                "US NRC",
                "Regulates US commercial nuclear plants; manages federal response coordination with FEMA; protective action recommendations for EPZ populations",
              ],
              [
                "National authorities (country-specific)",
                "First responders for nuclear/radiological events; IAEA member states maintain National Emergency Organizations per IAEA GSG-2 requirements",
              ],
            ]}
          />
        </CollapsibleSection>

        {/* ── Section 10: References ── */}
        <CollapsibleSection
          id="radiation_safety_references"
          title="10. References & Further Reading"
          data-ocid="radiation_safety.references_section"
          badge={<AudienceBadge level="professional" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                org: "IAEA",
                title:
                  "General Safety Requirements Part 3: Radiation Protection and Safety of Radiation Sources: International Basic Safety Standards",
                ref: "IAEA Safety Standards GSR Part 3, 2014",
                url: "https://www.iaea.org/publications/8930/radiation-protection-and-safety-of-radiation-sources-international-basic-safety-standards",
                color: "border-primary/20",
              },
              {
                org: "NCRP",
                title:
                  "Ionizing Radiation Exposure of the Population of the United States",
                ref: "NCRP Report No. 160, 2009",
                url: "https://ncrponline.org/publications/reports/ncrp-report-160/",
                color: "border-accent/20",
              },
              {
                org: "IAEA",
                title:
                  "Arrangements for Preparedness for a Nuclear or Radiological Emergency",
                ref: "IAEA Safety Guide GS-G-2.1 / GSG-2 (2011)",
                url: "https://www.iaea.org/publications/8604/arrangements-for-preparedness-for-a-nuclear-or-radiological-emergency",
                color: "border-primary/20",
              },
              {
                org: "ICRP",
                title:
                  "The 2007 Recommendations of the International Commission on Radiological Protection",
                ref: "ICRP Publication 103, Ann. ICRP 37(2–4), 2007",
                url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20103",
                color: "border-secondary/20",
              },
              {
                org: "NRC",
                title:
                  "Regulatory Guide 8.29: Instruction Concerning Risks from Occupational Radiation Exposure",
                ref: "US NRC Regulatory Guide 8.29, Revision 2, 2017",
                url: "https://www.nrc.gov/docs/ML1712/ML17121A043.pdf",
                color: "border-muted",
              },
              {
                org: "UNSCEAR",
                title: "Sources, Effects and Risks of Ionizing Radiation",
                ref: "UNSCEAR 2020 Report, Annex B",
                url: "https://www.unscear.org/unscear/en/publications/2020_2021_1.html",
                color: "border-muted",
              },
              {
                org: "NIST",
                title: "XCOM Photon Cross Sections Database",
                ref: "NIST Standard Reference Database 8 (XGAM); Berger et al., 2010",
                url: "https://www.nist.gov/pml/xcom-photon-cross-sections-database",
                color: "border-muted",
              },
              {
                org: "WHO",
                title:
                  "Iodine Thyroid Blocking: Guidelines for Use in Planning and Responding to Radiological and Nuclear Emergencies",
                ref: "World Health Organization, 2017. ISBN 978-92-4-155000-3",
                url: "https://www.who.int/publications/i/item/9789241550000",
                color: "border-muted",
              },
            ].map((ref) => (
              <div
                key={ref.ref}
                className={`rounded-lg border bg-muted/20 p-4 ${ref.color}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                  {ref.org}
                </span>
                <p className="text-sm font-medium text-foreground mb-1 leading-snug">
                  {ref.title}
                </p>
                <p className="text-xs text-muted-foreground mb-2">{ref.ref}</p>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline glow-focus rounded"
                  data-ocid="radiation_safety.reference_link"
                >
                  View publication ↗
                </a>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
