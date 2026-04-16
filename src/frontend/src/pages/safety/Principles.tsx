import { AudienceBadge } from "@/components/AudienceBadge";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
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
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
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

export default function PrinciplesPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <BreadcrumbNav
        items={[{ label: "Safety", href: "/safety" }, { label: "Principles" }]}
      />
      <PageHeader
        title="Nuclear Safety Principles"
        subtitle="The interlocking technical, organizational, and regulatory frameworks that keep nuclear installations safe — from defense in depth and ALARA dose optimization to probabilistic risk assessment and safety culture."
        audienceLevel="intermediate"
        readTimeMin={20}
      />

      <div className="grid gap-6">
        {/* ── Section 1: Foundations (always open) ── */}
        <SectionCard data-ocid="principles.foundations_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            The Foundations of Nuclear Safety
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nuclear safety is defined by the IAEA as{" "}
            <em>
              the achievement of proper operating conditions, prevention of
              accidents, and mitigation of accident consequences, resulting in
              protection of workers, the public, and the environment from undue
              radiation hazards
            </em>{" "}
            (IAEA Safety Fundamentals SF-1, 2006). This deceptively concise
            definition encompasses an entire field of engineering, policy, and
            organizational science.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The cornerstone legal principle, enshrined in SF-1 and in the
            national laws of all nuclear-operating states, is:{" "}
            <strong className="text-foreground">
              "The primary responsibility for safety must rest with the person
              or organization responsible for activities that give rise to
              radiation risks."
            </strong>{" "}
            This means the license holder (operator) cannot delegate safety
            responsibility — the regulator provides independent oversight, not
            day-to-day management of safety.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Three Fundamental Safety Objectives
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Protect People",
                desc: "Workers and the public must not be exposed to undue radiation risk. Dose limits and ALARA form the quantitative backbone.",
                color: "border-l-4 border-l-primary/60",
              },
              {
                label: "Protect the Environment",
                desc: "Radioactive releases to air, water, and soil must be controlled at the source. Long-lived isotopes (Cs-137, Sr-90) require particular attention.",
                color: "border-l-4 border-l-secondary/60",
              },
              {
                label: "Protect Future Generations",
                desc: "Waste must be managed so that those who come centuries from now are not burdened with a hazard they did not create — the ethical basis of deep geological repositories.",
                color: "border-l-4 border-l-accent/60",
              },
            ].map((obj) => (
              <div
                key={obj.label}
                className={`rounded-lg bg-muted/30 p-4 ${obj.color}`}
              >
                <p className="font-semibold text-foreground text-sm mb-1">
                  {obj.label}
                </p>
                <p className="text-sm text-muted-foreground">{obj.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mt-6 mb-2">
            IAEA Safety Fundamentals: Ten Principles (SF-1, 2006)
          </h3>
          <DataTable
            headers={["#", "Principle", "Core Requirement"]}
            rows={[
              [
                "1",
                "Responsibility for safety",
                "Primary responsibility lies with the license holder",
              ],
              [
                "2",
                "Role of government",
                "Legal/regulatory framework; independent regulator",
              ],
              [
                "3",
                "Leadership and management",
                "Safety culture embedded at all levels",
              ],
              [
                "4",
                "Justification of facilities/activities",
                "Net benefit must outweigh detriment",
              ],
              [
                "5",
                "Optimization of protection",
                "Doses ALARA; risks minimized given economic/social factors",
              ],
              [
                "6",
                "Limitation of risks to individuals",
                "Dose limits protect individuals beyond which no practice is justified",
              ],
              [
                "7",
                "Protection of present and future generations",
                "Intergenerational equity in waste management",
              ],
              [
                "8",
                "Prevention of accidents",
                "All reasonable measures to prevent abnormal conditions",
              ],
              [
                "9",
                "Emergency preparedness and response",
                "On-site and off-site plans required for all licensed facilities",
              ],
              [
                "10",
                "Protective actions to reduce existing or unregulated risks",
                "Remediation of legacy sites (uranium mines, contaminated areas)",
              ],
            ]}
          />
          <p className="mt-3 text-xs text-muted-foreground italic">
            Source: IAEA Safety Fundamentals No. SF-1, "Fundamental Safety
            Principles," 2006. ISBN 92–0–110706–4.
          </p>
        </SectionCard>

        {/* ── Section 2: Defense in Depth ── */}
        <CollapsibleSection
          title="Defense in Depth"
          badge="intermediate"
          ocid="principles.did"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Defense in depth (DiD) is the central organizing principle of
            nuclear safety — the deliberate provision of multiple independent
            barriers and safety systems so that no single failure, or even a
            plausible combination of independent failures, can lead to
            unacceptable consequences. The concept was formalized by the IAEA
            and the International Nuclear Safety Advisory Group (INSAG) in
            INSAG-12 (1996) and later refined in INSAG-10 and IAEA SSR-2/1.
          </p>

          <h3 className="font-semibold text-foreground mb-3">
            The Five Levels of Defense in Depth
          </h3>
          <div className="space-y-3">
            {[
              {
                level: "Level 1",
                title: "Prevention of Abnormal Operation",
                desc: "Conservative design, high-quality manufacturing, thorough testing, and operational margins ensure that abnormal conditions simply do not occur. Quality assurance programs, design codes (ASME, RCC-M), and seismic qualification standards all contribute.",
                examples:
                  "Fuel cladding design margins; ASME Boiler & Pressure Vessel Code for primary piping; plant maintenance procedures",
              },
              {
                level: "Level 2",
                title: "Detection and Control",
                desc: "Instrumentation and control systems detect abnormal conditions and return the plant to normal operation before they escalate. Automatic reactor trip (SCRAM) systems are the primary Level 2 safety function.",
                examples:
                  "High-flux trip setpoints; overtemperature ΔT trip; SCRAM logic; automatic turbine runback",
              },
              {
                level: "Level 3",
                title: "Control of Accidents Within Design Basis",
                desc: "For postulated Design Basis Accidents (DBAs), engineered safety features (ESFs) limit the consequences within pre-established acceptance criteria. ESFs include Emergency Core Cooling Systems (ECCS) and containment spray.",
                examples:
                  "ECCS injection (high-pressure, low-pressure); accumulator injection; containment isolation; safety injection signal",
              },
              {
                level: "Level 4",
                title: "Accident Management (Beyond Design Basis)",
                desc: "If a DBA escalates beyond design expectations (a severe accident), Severe Accident Management Guidelines (SAMGs) guide operators to stabilize the plant, prevent core damage from progressing, and maintain containment integrity. Post-Fukushima, this level was substantially strengthened.",
                examples:
                  "Hydrogen recombiners; passive autocatalytic recombiners (PARs); FLEX portable power and pump equipment; filtered containment venting",
              },
              {
                level: "Level 5",
                title: "Off-site Emergency Response",
                desc: "Even if all on-site safety measures fail and radioactivity is released, off-site emergency planning protects the public. This includes evacuation zones, sheltering, stable iodine (KI) distribution, and food/water monitoring.",
                examples:
                  "Emergency Planning Zones (EPZ): typically 10-mile plume exposure zone, 50-mile ingestion pathway zone (US NRC); IAEA EPZ guidance in GSG-2",
              },
            ].map((item) => (
              <div
                key={item.level}
                className="rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-primary/20 text-primary font-mono text-xs px-2 py-0.5 font-semibold">
                    {item.level}
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.desc}
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  Examples: {item.examples}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mt-6 mb-2">
            The Three Physical Barriers
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Defense in depth in a light water reactor relies on three concentric
            physical barriers that must all fail before significant release to
            the environment occurs:
          </p>
          <DataTable
            headers={["Barrier", "Description", "Failure Mode"]}
            rows={[
              [
                "Fuel matrix (UO₂)",
                "Ceramic uranium dioxide retains >95% of fission products as solid solutions or gas bubbles within the crystal lattice under normal conditions",
                "Fuel melting at T > ~2840°C; significant release at T > 1200°C (cladding oxidation begins first)",
              ],
              [
                "Fuel cladding (Zircaloy-4 or Zr-Nb)",
                "~0.6 mm thick zirconium alloy tube encapsulates fuel pellets; first metallic barrier against fission product release",
                "Oxidation at T > 1200°C by steam: Zr + 2H₂O → ZrO₂ + 2H₂; creep rupture at high temperature/pressure",
              ],
              [
                "Reactor coolant pressure boundary",
                "Reactor pressure vessel (~200 mm steel), primary piping, pressurizer, and steam generators form the pressure-retaining boundary for the primary coolant",
                "Large-break LOCA if guillotine pipe fracture; small-break LOCA from stuck-open valve (TMI-2 sequence)",
              ],
              [
                "Containment building",
                "Reinforced concrete (typically ~1.2 m thick) and steel liner that encloses the entire reactor system; designed to withstand a postulated LOCA and retain fission product release",
                "H₂ deflagration (Fukushima Units 1, 3); direct containment heating; basemat erosion by corium (not confirmed in any accident to date)",
              ],
            ]}
          />

          <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="font-semibold text-foreground text-sm mb-1">
              Independence Requirement
            </p>
            <p className="text-sm text-muted-foreground">
              A fundamental requirement of defense in depth is{" "}
              <strong className="text-foreground">independence</strong>: failure
              of one level must not impair the function of the next. This rules
              out common-cause failures across safety trains — a single fire,
              flood, or design flaw must not defeat multiple levels
              simultaneously. Post-TMI, fire protection requirements (10 CFR 50,
              Appendix R) were greatly strengthened after investigators found
              that fires had the potential to defeat redundant safety systems
              simultaneously.
            </p>
          </div>
        </CollapsibleSection>

        {/* ── Section 3: ALARA and Dose Limits ── */}
        <CollapsibleSection
          title="ALARA Principle and Dose Limits"
          badge="intermediate"
          ocid="principles.alara"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            The ALARA principle —{" "}
            <strong className="text-foreground">
              As Low As Reasonably Achievable
            </strong>{" "}
            — requires that radiation exposures be reduced as far as reasonably
            practicable, with economic and social factors taken into account.
            ALARA does not mean "as low as technically possible" regardless of
            cost; it means optimizing protection while recognizing that further
            reduction beyond some point yields no proportionate benefit.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            The Three Principles of Radiation Protection (ICRP-103, 2007)
          </h3>
          <div className="grid gap-3 sm:grid-cols-3 mb-5">
            {[
              {
                name: "Justification",
                desc: "No practice involving radiation exposure is introduced unless it produces a net benefit. A CT scan is justified by diagnostic value; random whole-body CT scans of healthy people are not justified.",
              },
              {
                name: "Optimization (ALARA)",
                desc: "For any justified practice, exposures must be kept ALARA, taking social and economic factors into account. The tool is constrained optimization — reduce dose further only when the cost (economic, social, safety of workers) is not disproportionate.",
              },
              {
                name: "Dose Limitation",
                desc: "Individual doses must not exceed limits. Limits apply after justification and optimization — they are the backstop, not the target. Exceeding a limit indicates failure of optimization, not a trigger to begin reducing doses.",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-lg border border-border bg-muted/20 p-4"
              >
                <p className="font-semibold text-foreground text-sm mb-1">
                  {p.name}
                </p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            Occupational Dose Limits
          </h3>
          <DataTable
            headers={[
              "Body/Tissue",
              "ICRP-103 Limit",
              "US NRC (10 CFR 20)",
              "EU (BSS 2013/59/Euratom)",
            ]}
            rows={[
              [
                "Effective dose (whole body)",
                "20 mSv/yr averaged over 5 years (max 50 mSv in any single year)",
                "50 mSv/yr (5 rem/yr) TEDE",
                "20 mSv/yr (5-year average); 50 mSv in any single year",
              ],
              [
                "Eye lens",
                "20 mSv/yr (lowered from 150 mSv in 2011; ICRP Statement 2011)",
                "150 mSv/yr",
                "20 mSv/yr (post-2018 implementation)",
              ],
              [
                "Skin (localized, 1 cm²)",
                "500 mSv/yr",
                "500 mSv/yr",
                "500 mSv/yr",
              ],
              [
                "Hands and feet (extremities)",
                "500 mSv/yr",
                "500 mSv/yr",
                "500 mSv/yr",
              ],
              [
                "Pregnant worker (embryo/fetus)",
                "1 mSv over the remainder of pregnancy after declaration",
                "5 mSv over 9 months (to declared pregnant worker)",
                "1 mSv to embryo/fetus over remainder of pregnancy",
              ],
            ]}
          />
          <p className="mt-3 text-xs text-muted-foreground italic">
            Note: The ICRP eye lens limit reduction was based on evidence of
            deterministic lens opacification at lower doses than previously
            assumed. US NRC has not yet adopted the 20 mSv/yr ICRP eye lens
            limit. Sources: ICRP Publication 103 (2007); US 10 CFR Part 20; EU
            Council Directive 2013/59/Euratom.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Public Dose Limits
          </h3>
          <DataTable
            headers={["Scenario", "Limit (above natural background)", "Basis"]}
            rows={[
              [
                "Planned exposure (nuclear facilities, all pathways)",
                "1 mSv/yr effective dose",
                "ICRP-103; enshrined in most national laws",
              ],
              [
                "Single facility constraint (optimization)",
                "0.3 mSv/yr (ICRP recommendation)",
                "Ensures total from all sources stays below 1 mSv",
              ],
              [
                "Medical exposures (patients)",
                "Not limited — justified individually by diagnostic/therapeutic benefit",
                "Justification principle applies; carers may have minor subsidiary limits",
              ],
              [
                "Emergency exposure (protective action criteria)",
                "Ref. level 20–100 mSv (residual dose to trigger sheltering/evacuation)",
                "ICRP-109; IAEA GSG-2; FEMA/NRC protective action guidelines",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Practical ALARA Tools
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
            <li>
              <strong className="text-foreground">Zoning:</strong> Controlled
              areas (occupational dose possible), supervised areas (monitoring
              required), and uncontrolled areas (no dose expected above public
              limits) — physical segregation using shielding, access controls,
              and air monitoring.
            </li>
            <li>
              <strong className="text-foreground">
                Time-Distance-Shielding:
              </strong>{" "}
              The three classical tools for dose reduction — minimize time in
              field, maximize distance from source, interpose shielding. These
              are taught to all radiation workers as the ALARA triad.
            </li>
            <li>
              <strong className="text-foreground">Outage dose planning:</strong>{" "}
              Before refueling outages, dose rates in work areas are mapped and
              work packages include pre-job ALARA reviews with estimated dose,
              dose goals, and contingency plans.
            </li>
            <li>
              <strong className="text-foreground">
                Collective dose (person-Sv):
              </strong>{" "}
              The total dose to a workforce. US nuclear plants average ~0.5
              person-Sv per year (vs. ~2 person-Sv in the 1980s) due to ALARA
              improvements in decontamination, source term reduction, and
              tooling.
            </li>
          </ul>

          <EquationBlock
            latex="H_T = \\sum_R w_R \\cdot D_{T,R}"
            annotation="Equivalent dose H_T (in Sv) to tissue T is the absorbed dose D_{T,R} weighted by radiation weighting factor w_R. For gamma and X-rays, w_R = 1. For alpha particles, w_R = 20. This is how 'dose' is made biologically comparable across radiation types."
            label="Equivalent Dose (ICRP)"
          />
          <EquationBlock
            latex="E = \\sum_T w_T \\cdot H_T"
            annotation="Effective dose E (in Sv) sums equivalent doses across tissues T, weighted by tissue weighting factor w_T. Tissue weights reflect relative cancer/heritable risk: gonads w_T = 0.08, colon = 0.12, lung = 0.12, bone marrow = 0.12, etc. Effective dose is used for dose limit compliance."
            label="Effective Dose (ICRP-103)"
          />
        </CollapsibleSection>

        {/* ── Section 4: Deterministic and Probabilistic Safety Analysis ── */}
        <CollapsibleSection
          title="Deterministic and Probabilistic Safety Analysis"
          badge="advanced"
          ocid="principles.safety_analysis"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nuclear safety analysis uses two complementary approaches to
            demonstrate that a plant's design is adequate:{" "}
            <strong className="text-foreground">
              Deterministic Safety Analysis (DSA)
            </strong>
            , which evaluates the plant's response to prescribed bounding
            accident scenarios, and{" "}
            <strong className="text-foreground">
              Probabilistic Risk Assessment (PRA/PSA)
            </strong>
            , which quantifies the probability of harmful outcomes from all
            accident sequences.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Deterministic Safety Analysis (DSA)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            DSA postulates specific accidents (Design Basis Accidents, DBAs) and
            applies conservative assumptions to show that acceptance criteria
            are met. The hierarchy of plant conditions is:
          </p>
          <DataTable
            headers={["Category", "Definition", "Example", "Frequency"]}
            rows={[
              [
                "Normal operation",
                "Planned operating states including start-up, power operation, shutdown",
                "Full-power operation; controlled load-following",
                "> 1/yr",
              ],
              [
                "Anticipated Operational Occurrences (AOOs)",
                "Deviations from normal expected to occur once or more in plant lifetime; transients that safety systems must handle",
                "Loss of feedwater flow; inadvertent rod ejection; turbine trip",
                "1–10⁻²/yr",
              ],
              [
                "Design Basis Accidents (DBAs)",
                "Postulated accidents used to establish design requirements; rare or hypothetical but bounded",
                "Large-break LOCA (guillotine break in main coolant pipe); main steam line break; stuck-open MSSV",
                "10⁻²–10⁻⁴/yr",
              ],
              [
                "Beyond Design Basis Accidents (BDBAs)",
                "Accidents more severe than DBAs, where multiple safety systems may fail; severe accidents",
                "Station blackout + ECCS failure → core damage; Fukushima-type sequence",
                "< 10⁻⁴/yr",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            DBA Acceptance Criteria (LWR Example — US NRC 10 CFR 50.46)
          </h3>
          <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm text-muted-foreground space-y-2 mb-4">
            <p>
              <strong className="text-foreground">
                Peak cladding temperature (PCT):
              </strong>{" "}
              ≤ 1204°C (2200°F) — below the threshold for rapid Zircaloy
              oxidation and loss of cladding structural integrity
            </p>
            <p>
              <strong className="text-foreground">
                Maximum cladding oxidation:
              </strong>{" "}
              ≤ 17% of cladding wall thickness — limits hydrogen generation and
              structural degradation
            </p>
            <p>
              <strong className="text-foreground">
                Core-wide cladding oxidation:
              </strong>{" "}
              ≤ 1% of total cladding metal — limits total hydrogen released
            </p>
            <p>
              <strong className="text-foreground">
                Coolable core geometry:
              </strong>{" "}
              Fuel rods must remain in a coolable configuration — no gross fuel
              relocation or channel blocking
            </p>
            <p>
              <strong className="text-foreground">Long-term cooling:</strong>{" "}
              Core cooling must be maintained for extended period after the DBA
              — decay heat removal must work
            </p>
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            Conservative vs. Best-Estimate Analysis
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Historically, DSA used purely conservative (bounding) assumptions at
            every step — leading to very large safety margins but unrealistic
            results. Modern practice (NUREG-1855, IAEA SSG-96) uses{" "}
            <strong className="text-foreground">
              Best Estimate Plus Uncertainty (BEPU)
            </strong>{" "}
            methods: best-estimate thermal-hydraulic codes (RELAP5, TRACE,
            CATHARE) with quantified uncertainty bands, providing more realistic
            safety margins.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-3">
            Probabilistic Risk Assessment (PRA/PSA)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            PRA systematically models all accident sequences from initiating
            events to outcomes, quantifying their probabilities using event
            trees and fault trees. PRA metrics:
          </p>
          <DataTable
            headers={[
              "Metric",
              "Definition",
              "US Fleet (approximate)",
              "NRC Goal",
            ]}
            rows={[
              [
                "Core Damage Frequency (CDF)",
                "Probability per reactor-year of core damage (severe fuel damage)",
                "~5 × 10⁻⁵/yr (mean)",
                "< 10⁻⁴/yr (new plants)",
              ],
              [
                "Large Early Release Frequency (LERF)",
                "Probability per reactor-year of a large early release from containment before evacuation",
                "~5 × 10⁻⁶/yr",
                "< 10⁻⁵/yr",
              ],
              [
                "Individual risk (cancer fatality)",
                "Annual fatal cancer risk to maximally exposed individual near plant",
                "~10⁻⁷/yr (NRC estimate)",
                "< 10⁻⁶/yr NRC safety goal; < 0.1% of background cancer risk",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Three Levels of PRA
          </h3>
          <div className="space-y-2">
            {[
              {
                level: "Level 1",
                scope: "Core damage",
                desc: "Identifies accident sequences leading to significant fuel damage (core melt). Output: Core Damage Frequency (CDF). Uses event trees from initiating events and fault trees for safety system failures.",
              },
              {
                level: "Level 2",
                scope: "Radioactive release",
                desc: "Extends Level 1 to model containment performance — how much radioactivity is released to the environment. Output: source term characterization and Large Early Release Frequency (LERF).",
              },
              {
                level: "Level 3",
                scope: "Public health consequences",
                desc: "Extends Level 2 through atmospheric dispersion, ingestion pathway modeling, and health effect estimation. Output: individual and societal risk metrics (latent cancer fatalities, early fatalities).",
              },
            ].map((l) => (
              <div
                key={l.level}
                className="rounded-lg border border-border bg-muted/20 p-3 flex gap-3"
              >
                <div className="rounded-md bg-primary/20 text-primary text-xs font-mono px-2 py-1 shrink-0 h-fit font-bold">
                  {l.level}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {l.scope}
                  </p>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Single Failure Criterion
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            A fundamental deterministic requirement: a{" "}
            <strong className="text-foreground">single active failure</strong>{" "}
            (one pump fails to start, one valve fails to open, one signal fails
            to actuate) must not prevent a safety system from performing its
            function. This is why safety injection systems are typically
            provided in{" "}
            <strong className="text-foreground">
              two or four independent trains
            </strong>
            : any single active failure still leaves adequate injection
            capacity.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong className="text-foreground">
              Common cause failure (CCF)
            </strong>{" "}
            analysis examines scenarios where all redundant trains fail
            simultaneously due to a shared cause — a common design flaw, a
            common environmental stress (flooding), or a common maintenance
            error. The β-factor model and the Multiple Greek Letter (MGL) model
            are standard CCF quantification methods used in LWR PRAs.
          </p>
        </CollapsibleSection>

        {/* ── Section 5: Safety Culture and Regulatory Oversight ── */}
        <CollapsibleSection
          title="Safety Culture and Regulatory Oversight"
          badge="intermediate"
          ocid="principles.safety_culture"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Safety culture is not a soft concept — it has measurable attributes
            and a direct causal link to accidents. Both Chernobyl (1986) and
            Fukushima (2011) were ultimately safety culture failures: in each
            case, organizational norms, management pressures, and regulatory
            oversight failures allowed known risks to go unaddressed.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Definition and Attributes
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The concept was first formally codified in{" "}
            <strong className="text-foreground">INSAG-4 (1991)</strong> — the
            IAEA report that emerged directly from the analysis of the Chernobyl
            accident — defining safety culture as:{" "}
            <em>
              "that assembly of characteristics and attitudes in organizations
              and individuals which establishes that, as an overriding priority,
              nuclear plant safety issues receive the attention warranted by
              their significance."
            </em>{" "}
            INSAG-15 (2002) refined this definition to emphasize the role of
            leadership: safety culture cannot exist without visible, sustained
            leadership commitment that makes safety the <em>overriding</em>{" "}
            priority — not merely one among several.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 mb-5">
            {[
              {
                attr: "Questioning Attitude",
                desc: "Every assumption is challenged; no condition is accepted as permanently safe without re-evaluation. Workers are encouraged to raise concerns without fear of retaliation.",
              },
              {
                attr: "Rigorous and Prudent Approach",
                desc: "Thoroughness in operations and maintenance. Non-conservative shortcutting is not tolerated. Procedures are followed precisely, and deviations require formal authorization.",
              },
              {
                attr: "Open Communication",
                desc: "Safety information flows freely up, down, and across the organization. Bad news is reported promptly. Near-misses are viewed as learning opportunities, not embarrassments.",
              },
              {
                attr: "Learning Organization",
                desc: "Lessons from accidents and near-misses (internal and worldwide) are systematically captured, analyzed, and incorporated into procedures and training. WANO OpEx and IAEA event reports are reviewed.",
              },
              {
                attr: "Leadership Commitment",
                desc: "Visible, consistent leadership engagement with safety at all levels — not just nominal. Senior managers spend time on the plant floor; safety concerns are escalated and resolved quickly.",
              },
              {
                attr: "Accountability",
                desc: "Individuals and organizations are held responsible for safety performance. Performance indicators (safety system unavailability, corrective action closure rates) are tracked and acted upon.",
              },
            ].map((item) => (
              <div
                key={item.attr}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <p className="text-sm font-semibold text-foreground mb-1">
                  {item.attr}
                </p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground mb-2">
            Key International Organizations
          </h3>
          <DataTable
            headers={["Organization", "Role", "Mechanism"]}
            rows={[
              [
                "IAEA (International Atomic Energy Agency)",
                "Sets international safety standards; provides technical guidance and peer review",
                "Safety Standards Series (SSR, SSG, GS, NS); OSART/IRRS review missions; incident reporting (IRS/IRSN)",
              ],
              [
                "INSAG (International Nuclear Safety Advisory Group)",
                "Independent advisory group to IAEA Director General; issues foundational safety documents",
                "INSAG reports (INSAG-4 Safety Culture 1991; INSAG-12 Defense in Depth 1996; INSAG-15 2002)",
              ],
              [
                "WANO (World Association of Nuclear Operators)",
                "Industry peer organization; peer reviews and operational experience exchange among all nuclear operators",
                "~25 peer reviews/year globally; Performance Indicators program; Technical Support and Exchange (TSSE); stringent expectation: safety not limited to licensed requirements",
              ],
              [
                "US NRC (Nuclear Regulatory Commission)",
                "US independent federal regulatory body for commercial nuclear reactors and fuel cycle",
                "10 CFR regulations; RIS and NRC Bulletins; Reactor Oversight Process (ROP) using performance indicators and inspection findings",
              ],
              [
                "ASN (Autorité de sûreté nucléaire, France)",
                "French independent nuclear regulator; oversees EDF's 56-reactor fleet",
                "Prescriptions, inspections; ASN guides (Guides de l'ASN); participation in WENRA harmonization",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            WANO Peer Reviews
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The{" "}
            <strong className="text-foreground">
              World Association of Nuclear Operators (WANO)
            </strong>
            , established in 1989 following Chernobyl, conducts approximately{" "}
            <strong className="text-foreground">
              25 peer reviews per year
            </strong>{" "}
            at nuclear power plant sites worldwide. Each review is conducted by
            a team of experienced nuclear professionals from other member
            organizations — an independent assessment by operating peers rather
            than a regulatory inspection. WANO peer review teams evaluate:
          </p>
          <div className="grid gap-2 sm:grid-cols-2 mb-4">
            {[
              {
                area: "Operations",
                desc: "Control room practices, shift supervisor authority, use of procedures, conservative decision-making, shift turnover rigor.",
              },
              {
                area: "Maintenance",
                desc: "Preventive maintenance programme effectiveness, work order backlog, maintenance-induced failures, post-maintenance testing.",
              },
              {
                area: "Engineering",
                desc: "Design change control, ageing management, operability determinations, 10-year inservice inspection programme.",
              },
              {
                area: "Radiation Protection",
                desc: "ALARA performance, dose tracking, contamination control, radiological postings accuracy.",
              },
              {
                area: "Chemistry",
                desc: "Primary coolant chemistry control, out-of-specification events, fuel integrity indicators.",
              },
              {
                area: "Safety Culture",
                desc: "Organizational attributes across all work areas; leadership behaviours; corrective action programme health.",
              },
            ].map((item) => (
              <div
                key={item.area}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <p className="text-sm font-semibold text-foreground mb-1">
                  {item.area}
                </p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            WANO findings are issued as Significant Areas for Improvement
            (SAFIs) and Areas for Improvement (AFIs). A follow-up mission is
            typically conducted 18–24 months later to verify improvements.
            Unlike NRC inspection findings, WANO findings carry no regulatory
            consequence — but peer pressure within the nuclear industry is an
            effective driver. Plants with repeated SAFIs may face heightened
            WANO scrutiny, and industry association membership benefits may be
            affected. US nuclear plants are also required by the NRC to
            implement the INPO Systematic Evaluation Program (SEP), which is the
            US domestic equivalent.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Safety Culture Surveys and Self-Assessments
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Nuclear organizations periodically conduct organization-wide safety
            culture surveys — anonymous questionnaires completed by all
            employees that probe attitudes on topics such as leadership
            accessibility, willingness to raise concerns, quality of the
            corrective action programme, and management responsiveness to safety
            issues. Survey results are analyzed for trends and departmental
            differences, and action plans are developed to address identified
            weaknesses.{" "}
            <strong className="text-foreground">
              The NRC expects licensees to periodically assess their safety
              culture
            </strong>{" "}
            and has issued a Safety Culture Policy Statement (76 FR 34773, 2011)
            identifying nine safety culture components as characteristics of a
            positive nuclear safety culture.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            NRC Significance Determination Process (SDP)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Within the Reactor Oversight Process (ROP), every NRC inspection
            finding is characterized for safety significance using the{" "}
            <strong className="text-foreground">
              Significance Determination Process (SDP)
            </strong>
            , which uses the plant's Individual Plant Examination (IPE/PRA) to
            evaluate whether the finding increased core damage frequency or
            large early release frequency. Findings are assigned a significance
            color:
          </p>
          <DataTable
            headers={["Color", "Significance", "Basis", "Typical NRC Response"]}
            rows={[
              [
                <span
                  key="green"
                  className="font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  Green
                </span>,
                "Very low safety significance",
                "ΔCDF < 10⁻⁶/yr; no measurable risk increase",
                "Documented; addressed through normal follow-up; tracked in NRC inspection database",
              ],
              [
                <span key="white" className="font-semibold text-foreground">
                  White
                </span>,
                "Low to moderate safety significance",
                "10⁻⁶/yr ≤ ΔCDF < 10⁻⁵/yr",
                "Supplemental inspection (SDP Phase 2); increased NRC monitoring; enforcement conference",
              ],
              [
                <span key="yellow" className="font-semibold text-yellow-500">
                  Yellow
                </span>,
                "Substantial safety significance",
                "10⁻⁵/yr ≤ ΔCDF < 10⁻⁴/yr",
                "Expanded supplemental inspection; public meeting; potential civil penalty",
              ],
              [
                <span key="red" className="font-semibold text-destructive">
                  Red
                </span>,
                "High safety significance — unacceptable",
                "ΔCDF ≥ 10⁻⁴/yr or direct threat to key safety function",
                "NRC determines whether continued operation is authorized; possible shutdown order; mandatory enforcement action",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: NRC Inspection Procedure 95001/95002/95003; NRC Regulatory
            Basis document for the Significance Determination Process. ΔCDF =
            change in core damage frequency attributed to the finding.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Corrective Action Programme (CAP)
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            The{" "}
            <strong className="text-foreground">
              Corrective Action Programme (CAP)
            </strong>{" "}
            is the primary internal mechanism by which nuclear plants identify,
            evaluate, and resolve safety-significant conditions. Every concern —
            whether a minor equipment deficiency, a near-miss, a procedure
            non-conformance, or a safety culture observation — is entered into a
            database as a{" "}
            <strong className="text-foreground">Condition Report (CR)</strong>.
            The CR is assigned a significance threshold, triaged by condition
            screening, and tracked through root cause analysis to corrective
            actions and verification of effectiveness.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground mb-4">
            <p className="font-semibold text-foreground mb-2">
              CAP Health Indicators (INPO/WANO benchmarks)
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>
                <strong className="text-foreground">CR initiation rate:</strong>{" "}
                High CR rates are a positive indicator — it means the workforce
                is identifying and reporting conditions rather than ignoring
                them. Declining CR rates may signal a chilling effect on
                concern-raising.
              </li>
              <li>
                <strong className="text-foreground">
                  Overdue corrective actions:
                </strong>{" "}
                Percentage of CRs with overdue corrective actions; a growing
                backlog signals a breakdown in the programme.
              </li>
              <li>
                <strong className="text-foreground">
                  Repeat significant conditions:
                </strong>{" "}
                Recurrence of a previously corrected condition indicates
                inadequate root cause determination.
              </li>
              <li>
                <strong className="text-foreground">
                  Effectiveness reviews:
                </strong>{" "}
                Verification that corrective actions actually resolved the root
                cause, typically performed 12–18 months after implementation.
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The NRC evaluates the health of a licensee's CAP during baseline
            inspections (Inspection Procedure 71152 — Problem Identification and
            Resolution). Systematic breakdowns in CAP — characterized by
            significant conditions going unidentified, unresolved, or
            re-occurring — are treated as indicators of declining safety culture
            and trigger enhanced NRC oversight. The NRC Davis-Besse (2002) head
            degradation event and the Crystal River containment delamination are
            landmark cases where CAP failures allowed emerging problems to go
            unaddressed until they became major safety issues.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Regulatory Independence Requirement
          </h3>
          <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm text-muted-foreground">
            <p className="mb-2">
              IAEA SSG-16 (2010) and Principle 2 of SF-1 require that the
              nuclear regulatory body be{" "}
              <strong className="text-foreground">
                effectively independent from organizations that have
                responsibilities or interests that could unduly influence
                decision-making on nuclear safety
              </strong>{" "}
              — specifically, from organizations that promote nuclear energy.
            </p>
            <p className="mb-2">
              This is why, for example, the US NRC is independent of the
              Department of Energy (which promotes nuclear energy), and the UK
              ONR is independent of BEIS. Separation of promotional and
              regulatory functions is a condition for IAEA safety peer reviews
              (IRRS missions). Countries where the same ministry both promotes
              and regulates nuclear energy are flagged in IRRS reports.
            </p>
            <p>
              Post-Fukushima, Japan established the Nuclear Regulation Authority
              (NRA, 2012) as an independent agency, replacing the Nuclear and
              Industrial Safety Agency (NISA), which had been housed within the
              Ministry of Economy, Trade and Industry (METI) — the same ministry
              promoting nuclear energy. The Fukushima Independent Investigation
              Commission cited this lack of independence as a contributing
              factor to the accident.
            </p>
          </div>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Chernobyl: A Safety Culture Case Study
          </h3>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground space-y-2">
            <p>
              The IAEA post-accident review mission (INSAG-7, 1992) identified
              safety culture failure as a root cause of the Chernobyl accident:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                The turbine coast-down test had been deferred for months; there
                was management pressure to complete it before an outage
              </li>
              <li>
                Operators disabled the Emergency Core Cooling System (ECCS) to
                prevent it from activating during the test and interrupting it
              </li>
              <li>
                The reactor was operated in an unstable low-power regime that
                operators were not adequately trained to manage
              </li>
              <li>
                The RBMK positive void coefficient and control rod design flaw
                were known to designers but not communicated clearly to
                operators
              </li>
              <li>
                The Soviet nuclear industry had a culture of minimizing problems
                rather than communicating them — safety concerns were not
                escalated
              </li>
            </ul>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
