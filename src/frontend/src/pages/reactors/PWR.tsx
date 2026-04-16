import { AudienceBadge } from "@/components/AudienceBadge";
import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { SectionCard } from "@/components/SectionCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const systems = [
  {
    name: "Reactor Vessel",
    description:
      "Thick-walled steel vessel containing the reactor core, coolant, and fuel assemblies. Designed to withstand ~155 bar at 325°C.",
  },
  {
    name: "Fuel Assemblies",
    description:
      "Bundles of ~264 zirconium-clad fuel rods containing UO₂ pellets enriched to ~3–5% U-235. A typical PWR has ~193 fuel assemblies.",
  },
  {
    name: "Control Rods",
    description:
      "Rods of boron carbide or hafnium inserted into the core to absorb neutrons, controlling reaction rate and enabling shutdown.",
  },
  {
    name: "Primary Loop",
    description:
      "Pressurized water (155 bar) circulated through the core by main coolant pumps, heated to ~325°C, then cooled in the steam generators.",
  },
  {
    name: "Steam Generators",
    description:
      "Large heat exchangers where primary coolant heats secondary water to produce steam, keeping radioactive and non-radioactive loops separate.",
  },
  {
    name: "Pressurizer",
    description:
      "Maintains primary system pressure by electric heaters and spray nozzles, preventing the coolant from boiling.",
  },
  {
    name: "Containment Building",
    description:
      "Reinforced concrete and steel dome containing the reactor systems. Last barrier to prevent release of radioactive material in an accident.",
  },
];

const safetyFeatures = [
  {
    feature: "Passive core cooling",
    description:
      "Emergency core cooling systems that function by gravity and natural convection, not pumps.",
  },
  {
    feature: "Negative temperature coefficient",
    description:
      "As coolant heats up, neutron moderation decreases, naturally reducing reactor power — a self-stabilizing feedback.",
  },
  {
    feature: "Triple containment",
    description:
      "Fuel pellet → cladding → reactor vessel → containment building: four independent barriers to fission product release.",
  },
  {
    feature: "Defense in depth",
    description:
      "IAEA principle requiring multiple independent and redundant safety systems, so no single failure can cause a major accident.",
  },
];

function CollapsibleSection({
  id,
  title,
  badge,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  badge?: "intermediate" | "advanced";
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} data-ocid={`pwr.${id}_section`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-ocid={`pwr.${id}_toggle`}
      >
        <span className="flex items-center gap-3">
          <span className="font-display text-lg font-semibold text-foreground">
            {title}
          </span>
          {badge && <AudienceBadge level={badge} />}
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="mt-3 space-y-4" data-ocid={`pwr.${id}_content`}>
          {children}
        </div>
      )}
    </section>
  );
}

function TableBlock({
  caption,
  headers,
  rows,
  source,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
  source?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm" aria-label={caption}>
        <thead>
          <tr className="border-b border-border bg-muted/30">
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
        <tbody className="divide-y divide-border/50">
          {rows.map((row) => (
            <tr key={String(row[0])} className="text-muted-foreground">
              {row.map((cell) => (
                <td
                  key={`${String(row[0])}-${cell}`}
                  className={`px-4 py-2 ${cell === row[0] ? "" : "font-mono text-foreground"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {source && (
        <p className="px-4 py-2 text-xs text-muted-foreground italic border-t border-border/50">
          {source}
        </p>
      )}
    </div>
  );
}

function EqBlock({ content, note }: { content: string; note?: string }) {
  return (
    <div className="rounded-md bg-muted/30 border border-border px-4 py-3 my-3">
      <pre className="text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
        {content}
      </pre>
      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

export default function PWRPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    coolantLoops: false,
    fuelRods: false,
    controlSystems: false,
    eccs: false,
    passiveSafety: false,
    severeAccidents: false,
    fuelCoreDesign: false,
    thermalHydraulics: false,
    reactivityMgmt: false,
    eccsSystems: false,
    genIIIPlus: false,
    severeAccidentMgmt: false,
  });

  function toggle(key: string) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Pressurized Water Reactor"
        subtitle="The world's most common nuclear reactor design — powering ~70% of the world's 440 commercial nuclear plants through controlled fission in a pressurized water cooling system."
        audienceLevel="advanced"
        readTimeMin={34}
      />

      <div className="grid gap-6">
        {/* ─── Overview ─── */}
        <SectionCard data-ocid="pwr.overview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            How a PWR Works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A Pressurized Water Reactor keeps its primary coolant under roughly
            155 bar of pressure — high enough that water remains liquid at over
            300°C. Heat generated by controlled fission in the fuel rods is
            carried by this primary coolant loop to a steam generator, where a
            separate secondary loop of water boils to drive a turbine. This
            two-loop design means the radioactive primary coolant never contacts
            the turbine or the wider plant — a fundamental safety feature.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Today, PWRs account for approximately 70% of the world's operating
            commercial nuclear reactors. [IAEA PRIS, 2024]
          </p>
        </SectionCard>

        {/* ─── Operating Parameters ─── */}
        <SectionCard data-ocid="pwr.parameters_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Typical Operating Parameters
          </h2>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Typical PWR operating parameters"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Parameter
                  </th>
                  <th className="pb-2 font-semibold text-foreground text-right">
                    Typical Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  ["Thermal power", "~3,000 MWth"],
                  ["Electric output", "~1,000 MWe"],
                  ["Thermal efficiency", "~33%"],
                  ["Primary pressure", "~155 bar"],
                  ["Primary temp (outlet)", "~325°C"],
                  ["Fuel enrichment", "3–5% U-235"],
                  ["Fuel cycle length", "12–24 months"],
                  ["Core height", "~3.7 m"],
                ].map(([p, v]) => (
                  <tr key={p} className="text-muted-foreground">
                    <td className="py-2 pr-4">{p}</td>
                    <td className="py-2 text-right font-mono text-foreground">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground italic">
            Source: IAEA Nuclear Power Reactors in the World, 2023 edition.
          </p>
        </SectionCard>

        {/* ─── Major Systems ─── */}
        <section aria-label="PWR major systems" data-ocid="pwr.systems_section">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Major Systems
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {systems.map((s, i) => (
              <div
                key={s.name}
                className="rounded-lg border border-border bg-card p-4"
                data-ocid={`pwr.system_card.${i + 1}`}
              >
                <p className="font-display text-sm font-semibold text-primary mb-1">
                  {s.name}
                </p>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Safety Features ─── */}
        <section
          aria-label="PWR safety features"
          data-ocid="pwr.safety_section"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            <span className="flex items-center gap-2">
              Safety Features
              <AudienceBadge level="advanced" />
            </span>
          </h2>
          <SectionCard>
            <ul className="space-y-3">
              {safetyFeatures.map((sf) => (
                <li key={sf.feature} className="flex gap-3">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {sf.feature}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sf.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </section>

        {/* ════════════════════════════════════════════
            COLLAPSIBLE ADVANCED SECTIONS (ORIGINAL)
        ════════════════════════════════════════════ */}

        {/* 1 — Primary & Secondary Coolant Loops */}
        <CollapsibleSection
          id="coolantLoops"
          title="The Primary and Secondary Coolant Loops"
          badge="advanced"
          open={open.coolantLoops}
          onToggle={() => toggle("coolantLoops")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Primary Loop
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The primary loop is the heart of the PWR thermal circuit. Water is
              maintained at ~155 bar — well above the saturation pressure at
              operating temperature — keeping it in a <em>subcooled</em> liquid
              state throughout. Coolant enters the reactor vessel at the{" "}
              <strong className="text-foreground">cold leg</strong> (~293°C),
              flows upward through the fuel assemblies, exits the{" "}
              <strong className="text-foreground">hot leg</strong> (~325°C), and
              travels to the steam generators. Reactor Coolant Pumps (RCPs)
              drive a flow rate of roughly 20,000 kg/s per loop in a standard
              4-loop 3,000 MWth plant.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The <strong className="text-foreground">pressurizer</strong> is a
              tall vertical vessel connected to one hot leg. Electric immersion
              heaters at the bottom and spray nozzles at the top allow operators
              to raise or lower system pressure. The pressurizer keeps the bulk
              primary coolant a{" "}
              <strong className="text-foreground">
                subcooling margin of 15–30°C
              </strong>{" "}
              below the saturation temperature T<sub>sat</sub>(P). This margin
              is the critical buffer preventing bulk boiling — if it drops to
              zero, coolant begins flashing to steam, disrupting neutron
              moderation and heat removal.
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3 mb-3">
              <p className="text-sm font-semibold text-foreground mb-1">
                DNBR — Departure from Nucleate Boiling Ratio
              </p>
              <p className="text-sm text-muted-foreground">
                At each point on a fuel rod surface, the ratio of the{" "}
                <em>critical heat flux</em> (at which film boiling begins) to
                the <em>actual heat flux</em> is the DNBR. Regulators require
                DNBR ≥ 1.3 everywhere in the core during normal operation and
                design-basis accidents. Film boiling insulates the cladding,
                causing rapid temperature spikes; preventing it is a first-line
                safety criterion. [NRC, 10 CFR 50 Appendix A GDC-27]
              </p>
            </div>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Secondary Loop and Turbine Building
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              On the secondary side, water enters the steam generators at ~220°C
              as feedwater and exits as dry steam at roughly 70 bar / 282°C.
              This steam drives the high-pressure turbine, then a low-pressure
              turbine, and is condensed back to liquid by the condenser (cooled
              by the ultimate heat sink — ocean, river, or cooling tower).
              Because the secondary loop never contacts radioactive primary
              coolant, the entire turbine building is radiologically clean. This
              is a key PWR safety advantage over the Boiling Water Reactor,
              where steam from the core directly drives the turbine.
            </p>
            <TableBlock
              caption="Primary vs. secondary loop comparison"
              headers={["Parameter", "Primary Loop", "Secondary Loop"]}
              rows={[
                ["Pressure", "~155 bar", "~70 bar"],
                [
                  "Inlet temperature",
                  "~293°C (cold leg)",
                  "~220°C (feedwater)",
                ],
                ["Outlet temperature", "~325°C (hot leg)", "~282°C (steam)"],
                ["Phase", "Subcooled liquid", "Two-phase → dry steam"],
                [
                  "Mass flow (4-loop)",
                  "~80,000 kg/s total",
                  "~1,500 kg/s steam per loop",
                ],
                [
                  "Radioactivity",
                  "Activated (¹⁶N, tritium, fission products)",
                  "Non-radioactive (trace only on tube leak)",
                ],
              ]}
              source="Source: IAEA Safety Reports Series No. 57; Westinghouse AP1000 DCD Rev. 19."
            />
          </SectionCard>
        </CollapsibleSection>

        {/* 2 — Fuel Rods, Assemblies, and Cladding */}
        <CollapsibleSection
          id="fuelRods"
          title="Fuel Rods, Assemblies, and Cladding"
          badge="intermediate"
          open={open.fuelRods}
          onToggle={() => toggle("fuelRods")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              UO₂ Fuel Pellets
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Nuclear fuel begins as uranium oxide (UO₂) powder pressed into
              cylindrical pellets roughly 1 cm in diameter and 1 cm tall, then
              sintered at ~1700°C to produce a dense ceramic. UO₂ has a very
              high melting point (~2865°C) and excellent radiation stability,
              making it the overwhelmingly preferred fuel form for light-water
              reactors. Each pellet releases approximately 45 GJ/kg at full
              burnup — about 45,000 times the energy density of coal by mass.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A small gap of ~0.1 mm is maintained between the pellet surface
              and the inner cladding wall. This{" "}
              <strong className="text-foreground">pellet-cladding gap</strong>{" "}
              accommodates thermal expansion and radiation-induced fuel swelling
              during irradiation. As burnup increases, the gap closes and
              pellet-cladding mechanical interaction (PCMI) loads become a
              design constraint for accident analysis.
            </p>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Zircaloy Cladding
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The cladding — typically Zircaloy-4 or advanced Zr-Nb alloys (e.g.
              M5®, ZIRLO™) — serves as the{" "}
              <strong className="text-foreground">
                first fission product barrier
              </strong>
              . Each sealed tube is ~12 mm OD and 3–4 m long, pressurized
              internally with helium gas to reduce mechanical stresses and
              improve pellet-to-cladding heat conduction. The melting point of
              Zircaloy is ~1800°C.
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3 mb-3">
              <p className="text-sm font-semibold text-foreground mb-1">
                Why Zirconium?
              </p>
              <p className="text-sm text-muted-foreground">
                Zirconium has an exceptionally low thermal neutron absorption
                cross-section: σ<sub>a</sub>(Zr) ≈ 0.18 barn — more than 17×
                lower than stainless steel (~3.1 b). Using steel cladding in a
                thermal reactor would require significantly higher fuel
                enrichment to compensate for parasitic neutron capture, making
                Zr-based alloys essentially irreplaceable in LWR economics.
                [NNDC/BNL, 2024]
              </p>
            </div>
            <div className="rounded-md bg-amber-500/10 border border-amber-500/30 px-4 py-3">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                Zircaloy Oxidation (Safety-Critical)
              </p>
              <p className="text-sm text-muted-foreground">
                Zirconium oxidizes slowly in water at normal operating
                temperatures — forming a thin, protective ZrO₂ layer. Above
                ~1200°C this reaction becomes rapid and strongly exothermic:
              </p>
              <pre className="mt-2 text-sm font-mono text-foreground bg-muted/40 rounded px-3 py-2 overflow-x-auto">
                Zr + 2 H₂O → ZrO₂ + 2 H₂ + 6.3 MJ/kgZr
              </pre>
              <p className="mt-2 text-sm text-muted-foreground">
                This reaction is self-heating and produces hydrogen gas —
                central to both the Three Mile Island and Fukushima accident
                sequences. Preventing cladding temperatures from exceeding
                1204°C is the primary design-basis limit for ECCS performance.
                [10 CFR 50.46; IAEA TECDOC-1726]
              </p>
            </div>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Fuel Assembly Configuration
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A Westinghouse 17×17 fuel assembly contains 264 fuel rods arranged
              in a square lattice, 24 guide tubes (for control rod clusters),
              and 1 central instrumentation tube. The lattice pitch is ~12.6 mm
              and assembly height is ~4.8 m including top and bottom fittings. A
              typical 1,000 MWe PWR core holds 157–193 assemblies, giving an
              active core height of ~3.66 m.
            </p>
            <TableBlock
              caption="Fuel assembly and burnup parameters"
              headers={["Parameter", "Typical Value"]}
              rows={[
                ["Assembly lattice", "17×17 (Westinghouse standard)"],
                ["Fuel rods per assembly", "264"],
                ["Guide tubes per assembly", "24 (+ 1 instrumentation)"],
                ["Fuel rod OD", "~9.5 mm (W) to ~10.75 mm (Framatome)"],
                ["Active fuel length", "~3.66 m"],
                ["Discharge burnup (current)", "~45–55 GWd/tU"],
                [
                  "Discharge burnup (advanced Zr)",
                  "65–70 GWd/tU (in licensing)",
                ],
                ["Cycle length", "18–24 months"],
                ["Fraction replaced per outage", "1/3 to 1/4 of assemblies"],
              ]}
              source="Source: NEA/OECD Nuclear Fuel Behaviour in Loss-of-Coolant Accident (LOCA) Conditions, 2009; NRC Information Digest 2023."
            />
          </SectionCard>
        </CollapsibleSection>

        {/* 3 — Control Systems and Reactivity Management */}
        <CollapsibleSection
          id="controlSystems"
          title="Control Systems and Reactivity Management"
          badge="intermediate"
          open={open.controlSystems}
          onToggle={() => toggle("controlSystems")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Control Rod Clusters and Soluble Boron
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              PWRs use two parallel reactivity control mechanisms. Control Rod
              Clusters (RCCs) — typically 24 rods of{" "}
              <strong className="text-foreground">
                Ag–In–Cd (80% Ag / 15% In / 5% Cd)
              </strong>{" "}
              or B₄C — are inserted into the guide tubes of selected assemblies.
              Ag–In–Cd is preferred in many plants because it distributes
              neutron absorption broadly across the thermal spectrum with
              moderate Doppler broadening, and it is less abrasive to guide
              tubes than hard B₄C pellets.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Soluble boron (H₃BO₃, boric acid) dissolved in the primary coolant
              provides bulk, spatially uniform reactivity worth. The{" "}
              <strong className="text-foreground">
                Chemical and Volume Control System (CVCS)
              </strong>{" "}
              continuously adjusts boron concentration: at the beginning of a
              fuel cycle, the concentration may reach 1,000–1,500 ppm; as the
              cycle progresses and fuel depletes, boron is diluted to
              compensate, maintaining criticality. At end-of-cycle, the
              concentration approaches zero, and the control rods carry the
              remaining shutdown margin.
            </p>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Reactivity Feedback Mechanisms
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              PWRs are designed with inherently negative reactivity feedback —
              any power increase triggers physical effects that suppress further
              power growth. This is a fundamental safety requirement for
              civilian power reactor licensing.
            </p>
            <TableBlock
              caption="Reactivity feedback mechanisms in PWRs"
              headers={[
                "Mechanism",
                "Coefficient",
                "Sign",
                "Timescale",
                "Physical Cause",
              ]}
              rows={[
                [
                  "Doppler broadening",
                  "αD ≈ −3 to −5 pcm/°C",
                  "Negative",
                  "Microseconds",
                  "Higher fuel T → broader U-238 resonance capture → more parasitic absorption",
                ],
                [
                  "Moderator temp. coeff. (MTC)",
                  "αM ≈ −10 to −40 pcm/°C",
                  "Negative",
                  "Seconds",
                  "Hotter water is less dense → less moderation → harder neutron spectrum → less fission",
                ],
                [
                  "Void coefficient",
                  "αvoid < 0",
                  "Negative",
                  "Seconds",
                  "Steam bubbles reduce moderator density further than absorption; PWR remains negative",
                ],
                [
                  "Power coefficient",
                  "αP (sum of above)",
                  "Negative",
                  "Combined",
                  "Net effect; must be negative at all power levels for licensing",
                ],
              ]}
              source="Source: Glasstone & Sesonske, Nuclear Reactor Engineering, 4th ed.; NRC Reactor Concepts Manual."
            />
            <div className="mt-4 rounded-md bg-muted/30 border border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground mb-1">
                SCRAM — Automatic Emergency Shutdown
              </p>
              <p className="text-sm text-muted-foreground">
                A SCRAM (historically: <em>Safety Control Rod Axe Man</em>)
                inserts all control rods into the core within ~2 seconds of an
                automatic trip signal. Typical trip setpoints include: high
                neutron flux, high coolant outlet temperature, low coolant flow,
                high reactor coolant system pressure, low pressurizer level,
                safety injection actuation, and seismic acceleration. Two
                independent and diverse trip systems are required by NRC
                regulations. [10 CFR 50, Appendix A, GDC-20]
              </p>
            </div>
          </SectionCard>
        </CollapsibleSection>

        {/* 4 — ECCS */}
        <CollapsibleSection
          id="eccs"
          title="Emergency Core Cooling System (ECCS)"
          badge="advanced"
          open={open.eccs}
          onToggle={() => toggle("eccs")}
        >
          <SectionCard>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              ECCS is the collection of systems designed to deliver borated
              water to the core following a Loss-of-Coolant Accident (LOCA) or
              other event that could uncover the fuel. The overriding criterion
              is that peak cladding temperature (PCT) must not exceed{" "}
              <strong className="text-foreground">1204°C (2200°F)</strong> — the
              point above which runaway Zr oxidation accelerates. [10 CFR 50.46]
            </p>
            <TableBlock
              caption="ECCS subsystem summary for a typical US PWR"
              headers={[
                "Subsystem",
                "Function",
                "Actuation",
                "Injection Pressure",
                "Capacity",
              ]}
              rows={[
                [
                  "High-Pressure Injection System (HPIS)",
                  "Inject borated water at full RCS pressure — covers small-break LOCAs",
                  "Low pressurizer pressure signal (~130 bar)",
                  "~155 bar (full system pressure)",
                  "~100–200 kg/s (varies by plant)",
                ],
                [
                  "Accumulator / Passive Injection Tank",
                  "Passive gravity + nitrogen injection once RCS depressurizes — no power needed",
                  "Automatic when RCS < ~50 bar (check valves open)",
                  "~50 bar nitrogen pre-charge",
                  "~40–60 m³ per accumulator; 4 tanks",
                ],
                [
                  "Low-Pressure Injection System (LPIS) / Safety Injection",
                  "Large-volume, low-pressure borated water for large-break LOCA reflood",
                  "Low RCS pressure + safety injection signal",
                  "< 10 bar",
                  "~500–1,000 kg/s (refueling water storage tank source)",
                ],
                [
                  "Residual Heat Removal (RHR)",
                  "Long-term decay heat removal after shutdown; transitions from LPIS mode",
                  "Automatic ~1–4 hours post-trip",
                  "Atmospheric",
                  "Sustains cooling for months; recirculates sump water",
                ],
              ]}
              source="Source: NUREG-0800 (Standard Review Plan); IAEA Nuclear Safety Standards SSR-2/1 Rev. 1."
            />
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Design-Basis Large Break LOCA
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The most severe design-basis accident is a{" "}
              <strong className="text-foreground">
                double-ended guillotine break (DEGB)
              </strong>{" "}
              of the largest primary coolant pipe (~750 mm ID). Within
              milliseconds, the reactor SCRAMs on low pressurizer pressure.
              Primary coolant inventory blows down through both break ends.
              Accumulator check valves open as RCS pressure falls below ~50 bar,
              providing rapid passive injection (within 10–30 seconds). LPIS
              then provides sustained reflood over subsequent minutes. ECCS is
              designed to maintain PCT &lt; 1204°C throughout this sequence.
            </p>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Passive ECCS in the AP1000 (Gen III+)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The Westinghouse AP1000 replaces active pumped ECCS with a fully
              passive system relying on gravity, natural circulation, and
              compressed gas. Core Makeup Tanks (CMTs) are mounted above the
              core and connected directly to the primary circuit; when a valve
              opens, coolant flows by gravity and pressure differential — no AC
              power required. The In-Containment Refueling Water Storage Tank
              (IRWST) provides 72 hours of core cooling without any operator
              action or external power source. This passive capability survived
              the post-Fukushima safety reexamination intact. [NRC AP1000 Design
              Certification, 2011]
            </p>
          </SectionCard>
        </CollapsibleSection>

        {/* 5 — Passive Safety Features Gen III+ */}
        <CollapsibleSection
          id="passiveSafety"
          title="Passive Safety Features in Gen III+ Reactors"
          badge="advanced"
          open={open.passiveSafety}
          onToggle={() => toggle("passiveSafety")}
        >
          <SectionCard>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              After the lessons of Three Mile Island (1979) and Chernobyl
              (1986), the nuclear industry undertook a fundamental redesign of
              safety philosophy. Generation III and III+ reactors use passive
              safety systems — those requiring no pumps, AC power, or operator
              action — to achieve a core damage frequency (CDF) &lt; 10⁻⁶ per
              reactor-year, roughly two orders of magnitude better than typical
              Gen II plants.
            </p>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              AP1000 (Westinghouse)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              With 24 units operating or under construction in China, and
              licensing underway in the US and Poland, the AP1000 represents the
              most widely deployed Gen III+ PWR. Its passive safety systems
              include gravity-fed CMTs and accumulators, IRWST (gravity drain to
              core), and a passive containment cooling system (PCCS) that
              circulates outside air over the steel containment shell by natural
              convection. In any accident, this system passively removes decay
              heat for 72 hours with no operator action, no AC power, and no
              diesel generators. [Westinghouse AP1000 DCD Rev. 19; NRC
              NUREG-1793]
            </p>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              EPR (Framatome / EDF)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The 1,650 MWe EPR (European Pressurized Reactor) prioritizes
              active redundancy rather than passive systems. It features a
              4-train safety architecture (any 2 of 4 trains suffice),
              double-wall containment, and a{" "}
              <strong className="text-foreground">
                corium spreading chamber
              </strong>{" "}
              — a dedicated compartment beneath the reactor vessel where molten
              core material is spread, cooled, and immobilized if core melt
              occurs. Units are operational at Taishan (China) and Olkiluoto-3
              (Finland). [IAEA TECDOC-1390]
            </p>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              VVER-1200 (Rosatom AES-2006)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The Russian VVER-1200 combines active and passive safety. Its
              passive flooding system (PHRS) removes decay heat by natural
              circulation for 24 hours without power. It also includes a core
              catcher below the vessel, passive hydrogen recombiners, and a
              double containment. The design meets post-Fukushima requirements
              in the IAEA SSNI framework. [IAEA SMR Booklet; Rosatom Technical
              Spec.]
            </p>
          </SectionCard>
          <SectionCard>
            <TableBlock
              caption="Gen II vs. Gen III+ key safety metrics"
              headers={[
                "Metric",
                "Gen II (e.g., PWR-900)",
                "Gen III+ AP1000",
                "Gen III+ EPR",
              ]}
              rows={[
                [
                  "Core damage frequency (CDF)",
                  "~10⁻⁴/reactor-year",
                  "&lt; 5×10⁻⁷/reactor-year",
                  "&lt; 10⁻⁶/reactor-year",
                ],
                [
                  "Large early release freq. (LERF)",
                  "~10⁻⁵/reactor-year",
                  "&lt; 5×10⁻⁸/reactor-year",
                  "&lt; 10⁻⁷/reactor-year",
                ],
                [
                  "Passive safety duration",
                  "~30 min (battery backup)",
                  "72 hours (no AC/operator action)",
                  "24+ hours (active + passive combo)",
                ],
                [
                  "Core catcher",
                  "Not provided (Gen II)",
                  "In-Vessel Retention (IVR)",
                  "Ex-vessel corium spreading chamber",
                ],
                [
                  "Hydrogen management",
                  "Limited — recombiners added post-TMI",
                  "Passive autocatalytic recombiners (PARs)",
                  "PARs in all compartments",
                ],
                [
                  "Containment cooling",
                  "Active spray systems",
                  "Passive natural air convection (PCCS)",
                  "Active fan coolers + double shell",
                ],
              ]}
              source="Source: NRC NUREG-1793 (AP1000 Final Safety Evaluation Report); IAEA TECDOC-1535; Atomic Energy Commission of Finland STUK."
            />
          </SectionCard>
        </CollapsibleSection>

        {/* 6 — Severe Accident Progression */}
        <CollapsibleSection
          id="severeAccidents"
          title="Severe Accident Progression and Management"
          badge="advanced"
          open={open.severeAccidents}
          onToggle={() => toggle("severeAccidents")}
        >
          <SectionCard>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A severe accident is defined as an event that exceeds design-basis
              assumptions and results in significant damage to the reactor core
              — including partial or complete core melt. While extremely rare
              (~10⁻⁶/reactor-year for modern plants), their consequences if
              unmanaged can be severe. Understanding the progression is
              essential for designing mitigation systems.
            </p>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Accident Progression Sequence
            </h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-none">
              {[
                [
                  "1 — Initiating Event",
                  "Typically a station blackout (SBO) or loss-of-coolant accident (LOCA) combined with failure of emergency systems.",
                ],
                [
                  "2 — Core Heat-Up",
                  "Without active cooling, decay heat (initially ~7% of full power) heats the core. Cladding temperature begins rising.",
                ],
                [
                  "3 — Fuel Damage Onset (~1200°C)",
                  "Zircaloy oxidation becomes significant: Zr + 2H₂O → ZrO₂ + 2H₂. Exothermic heat accelerates temperature rise. Fuel rods begin to fail structurally.",
                ],
                [
                  "4 — Core Melt (~2800°C)",
                  "UO₂ fuel melts, Zircaloy liquefies at ~1760°C. Molten mixture (corium: UO₂ + ZrO₂ + FPs + steel) relocates downward. Temperature ~2,600–3,000°C.",
                ],
                [
                  "5 — Reactor Pressure Vessel (RPV) Failure Risk",
                  "Corium pools on the lower vessel head. If uncooled, vessel steel ablates and corium exits the vessel (ex-vessel release).",
                ],
                [
                  "6 — Ex-Vessel Corium",
                  "On the basemat, corium can cause Molten Core–Concrete Interaction (MCCI), releasing CO₂, CO, steam, and fission products. Risk of basemat melt-through mitigated by core catchers in EPR/VVER-1200.",
                ],
              ].map(([title, desc]) => (
                <li key={String(title)} className="flex gap-3">
                  <span className="text-primary mt-0.5 shrink-0 font-semibold text-xs">
                    {String(title).split("—")[0].trim()}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-xs mb-0.5">
                      {String(title).split("—")[1]?.trim()}
                    </p>
                    <p className="leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Hydrogen Risk and Management
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Hydrogen generation from Zircaloy oxidation poses a detonation
              risk if concentrations exceed ~4% vol in air. At Three Mile Island
              Unit 2 (1979), roughly 25 m³ of hydrogen generated a non-damaging
              bubble in the reactor vessel dome. At Fukushima Daiichi (2011),
              hydrogen migrated into reactor buildings and caused explosive
              detonations that destroyed the upper structure of Units 1, 3, and
              4 — dramatically complicating the accident response.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Post-Fukushima, most regulatory bodies now mandate{" "}
              <strong className="text-foreground">
                Passive Autocatalytic Recombiners (PARs)
              </strong>{" "}
              throughout containment. PARs passively combine H₂ + O₂ → H₂O at
              concentrations well below the detonation limit, require no power,
              and cannot be disabled by the accident itself. The AP1000 and EPR
              both incorporate PARs as a standard feature. [IAEA Nuclear Safety
              Review 2023; NRC Bulletin 2012-01]
            </p>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Severe Accident Management Strategies
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "SAMGs (Severe Accident Management Guidelines)",
                  body: "Formalized operator procedures for managing beyond-design-basis events. Required by NRC post-TMI; mandate pre-staged resources and decision frameworks for events where normal EOPs are no longer applicable.",
                },
                {
                  title: "In-Vessel Retention (IVR)",
                  body: "Strategy of flooding the cavity outside the reactor vessel with water to cool the outside of the lower head, keeping corium inside the vessel. Validated for AP600, AP1000, and several Korean APR-1400 units. Key condition: vessel integrity must be maintained.",
                },
                {
                  title: "Core Catchers (Ex-Vessel)",
                  body: "The EPR's spreading device and the VVER-1200's core catcher both collect and cool ex-vessel corium by spreading it thin over a large area, maximizing contact with cooling water. Prevents basemat melt-through (so-called 'China syndrome').",
                },
                {
                  title: "Filtered Containment Venting (FCVS)",
                  body: "A controlled, filtered pathway to release containment pressure while retaining most fission products (except noble gases). Post-Fukushima, FCVS is mandated for BWR Mark I/II in the US and broadly adopted in Europe for both BWRs and PWRs.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-muted/20 p-3"
                >
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </CollapsibleSection>

        {/* ════════════════════════════════════════════
            NEW DEEP-DIVE SECTIONS
        ════════════════════════════════════════════ */}

        {/* NEW 1 — Fuel and Core Design */}
        <CollapsibleSection
          id="fuelCoreDesign"
          title="Fuel and Core Design — Advanced"
          badge="advanced"
          open={open.fuelCoreDesign}
          onToggle={() => toggle("fuelCoreDesign")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              UO₂ Ceramic Pellets — Material Properties
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The standard PWR fuel form is sintered uranium dioxide (UO₂)
              ceramic pellets: approximately 1 cm in diameter and 1 cm in
              height, stacked end-to-end in sealed Zircaloy cladding tubes. UO₂
              is chosen for its exceptional stability under neutron irradiation,
              chemical inertness in water, and high melting point (2865°C),
              which provides a large safety margin above peak operating
              temperatures.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              During normal full-power operation, the fuel centerline
              temperature reaches up to ~1800°C, while the average fuel
              temperature is ~800°C. Because UO₂ has relatively low thermal
              conductivity (λ ≈ 3–6 W/m·K, decreasing with temperature and
              burnup), a steep radial temperature gradient is unavoidable: the
              pellet periphery is close to coolant temperature (~300°C), while
              the center approaches 1800°C. This gradient drives fission gas
              migration toward grain boundaries and eventual release to the fuel
              rod plenum.
            </p>
            <EqBlock
              note="Radial heat conduction in a cylindrical fuel pellet. q‴ = volumetric heat generation rate (W/m³), λ = thermal conductivity (W/m·K), R = pellet radius, r = radial coordinate"
              content={
                "T(r) = T_surface + (q\u2034 / 4\u03BB) \u00D7 (R\u00B2 \u2212 r\u00B2)\n\nExample: q\u2034 = 4\u00D710\u2078 W/m\u00B3, \u03BB = 3 W/m\u00B7K, R = 4.1 mm\n  \u0394T_centerline = (4\u00D710\u2078 / (4\u00D73)) \u00D7 (0.0041)\u00B2 \u2248 560\u00B0C above surface\n  \u2192 T_centerline \u2248 300 + 560 = 860\u00B0C at low power; up to ~1800\u00B0C at full power"
              }
            />
            <TableBlock
              caption="UO₂ fuel material properties at operating conditions"
              headers={["Property", "Value", "Notes"]}
              rows={[
                ["Melting point", "2865°C", "IAEA-TECDOC-1495"],
                [
                  "Thermal conductivity (25°C)",
                  "~9.5 W/m·K",
                  "Fresh, stoichiometric UO₂",
                ],
                [
                  "Thermal conductivity (800°C)",
                  "~3–4 W/m·K",
                  "Decreases with T and burnup",
                ],
                [
                  "Density (sintered)",
                  "~10.4 g/cm³ (~96% TD)",
                  "Typical pellet specification",
                ],
                [
                  "Centerline temperature (full power)",
                  "Up to ~1800°C",
                  "Depends on linear heat rate",
                ],
                [
                  "Fuel average temperature",
                  "~800°C",
                  "4-loop, 3000 MWth core",
                ],
                [
                  "Fission gas release onset",
                  ">~1000°C centerline",
                  "Xe, Kr release to plenum",
                ],
                [
                  "Pellet diameter (W 17×17)",
                  "~8.19 mm",
                  "Varies by vendor and design",
                ],
              ]}
              source="Source: IAEA-TECDOC-1495 (Thermophysical Properties of UO₂); NRC Fuel Performance Report 2022."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Zircaloy-4 Cladding — Composition and Nuclear Properties
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Zircaloy-4 (Zr-4) composition: ~98.23% Zr, 1.45% Sn, 0.21% Fe,
              0.10% Cr (weight %). The additions of tin and iron/chromium
              improve corrosion resistance and creep strength over pure
              zirconium. Advanced alloys M5® (Zr-1%Nb, Framatome) and ZIRLO™
              (Zr-Nb-Sn-Fe, Westinghouse) offer improved corrosion and hydrogen
              pickup at high burnup.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The key nuclear property: σ<sub>a</sub>(Zr-nat) ≈ 0.18 barn at
              0.025 eV — 17× lower than stainless steel (~3.1 b). In a 1,000 MWe
              core with ~80 tonnes of Zr cladding, replacing Zr with steel would
              require ~1–1.5% additional U-235 enrichment to maintain
              criticality — a major economic and nonproliferation consideration.
              [NNDC BNL; Knief, 1992]
            </p>
            <TableBlock
              caption="Zircaloy alloy comparison for PWR cladding"
              headers={[
                "Alloy",
                "Composition",
                "Key Advantage",
                "Applications",
              ]}
              rows={[
                [
                  "Zircaloy-4",
                  "Zr-1.45Sn-0.21Fe-0.10Cr",
                  "Established dataset, widely licensed",
                  "US/European Gen II–III PWRs",
                ],
                [
                  "M5® (Framatome)",
                  "Zr-1Nb-O",
                  "Superior corrosion at high burnup",
                  "EPR, CE System 80, AFA 3G",
                ],
                [
                  "ZIRLO™ (Westinghouse)",
                  "Zr-1Nb-1Sn-0.1Fe",
                  "Balanced corrosion & creep",
                  "AP1000, Vantage 5/6 assemblies",
                ],
                [
                  "E110 (TVEL/Russia)",
                  "Zr-1Nb",
                  "VVER-440/1000 standard",
                  "All Russian PWR (VVER) fleet",
                ],
                [
                  "Cr-coated ATF",
                  "Zr-4 + CrFe coating",
                  "Delayed Zr-H₂O reaction onset above 1200°C",
                  "Qualification ongoing; EDF/W/GE",
                ],
              ]}
              source="Source: NRC ML20208A227 (ATF Roadmap); NEA/CSNI/R(2020)7 (Fuel Safety Criteria)."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              17×17 Fuel Assembly — Detailed Configuration
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The Westinghouse 17×17 Optimized Fuel Assembly (OFA) is the de
              facto standard for US PWRs. A 17×17 grid contains 289 positions:
              264 fuel rods, 24 guide tubes for control rod clusters or
              instrumentation thimbles, and 1 central instrumentation tube.
              Assembly square pitch is ~12.6 mm, giving a fuel-to-moderator
              volume ratio of ~0.5 — slightly over-moderated to maximize neutron
              economy.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A 3,411 MWth, 4-loop core contains 193 fuel assemblies totaling
              ~82 metric tons of UO₂. The core uses a "low-leakage" loading
              pattern: highest burnup assemblies on the periphery minimize
              neutron leakage and reduce fast-neutron fluence on the reactor
              pressure vessel, extending its service life.
            </p>
            <TableBlock
              caption="17×17 fuel assembly detailed parameters"
              headers={["Parameter", "Value", "Reference"]}
              rows={[
                [
                  "Grid positions",
                  "17×17 = 289 total",
                  "Westinghouse OFA standard",
                ],
                ["Fuel rod positions", "264", ""],
                [
                  "Guide tube positions",
                  "24 (+ 1 central instrumentation)",
                  "For CRCAs or thimble plugs",
                ],
                ["Fuel rod pitch", "~12.6 mm", "Square lattice"],
                ["Fuel rod active length", "~3.66 m (144 in.)", ""],
                [
                  "Assembly overall length",
                  "~4.06 m (160 in.)",
                  "Including top/bottom nozzles",
                ],
                [
                  "Assembly weight (fresh)",
                  "~660 kg total (~462 kg UO₂)",
                  "Varies by enrichment",
                ],
                [
                  "Core assemblies (3411 MWth)",
                  "193",
                  "4-loop Westinghouse plant",
                ],
                [
                  "Total UO₂ per core",
                  "~82 metric tonnes",
                  "193 × ~425 kg UO₂",
                ],
                ["Core active diameter", "~3.37 m", "Circular approximation"],
              ]}
              source="Source: Westinghouse Electric Company, AP1000 DCD Rev. 19, Ch. 4; NRC NUREG/CR-6150."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Enrichment, Fuel Cycle Length, and Burnup
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Fresh PWR fuel is enriched to 3.5–5.0% U-235. An 18-month cycle
              requires higher enrichment (~4.5%) than a 12-month cycle (~3.5%).
              Discharge burnup of 45–55 GWd/tHM is standard; advanced alloys
              allow 60–65 GWd/tHM; licensing extensions may reach 70–80 GWd/tHM.
              Higher burnup reduces outage frequency and spent fuel volume but
              increases fission gas release and pellet-cladding interaction.
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3 mb-4">
              <p className="text-sm font-semibold text-foreground mb-1">
                Pellet-Cladding Mechanical Interaction (PCMI)
              </p>
              <p className="text-sm text-muted-foreground">
                The initial ~100 µm pellet-cladding gap closes at ~10–30 GWd/tHM
                as UO₂ swells from fission product accumulation (Xe, Kr, Cs,
                Ba), thermal expansion, and radiation damage. Beyond gap
                closure, power ramps impose direct mechanical load on the
                cladding. Rapid power increases can cause Pellet-Cladding
                Interaction (PCI) failures if ramp rates exceed fuel design
                limits. Controlled ramp rates during startup and power increases
                are specified in plant operating procedures. [IAEA Safety
                Reports Series No. 57]
              </p>
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Burnable Absorbers
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <div>
                  <strong className="text-foreground">
                    Gadolinia rods (Gd₂O₃/UO₂ mix):
                  </strong>{" "}
                  ¹⁵⁷Gd has σ<sub>a</sub> ≈ 254,000 b — among the highest of any
                  nuclide. Gd depletes at roughly the same rate as fuel,
                  providing an ideal "self-compensating" reactivity suppressor.
                  Typical loading: 2–8 wt% Gd₂O₃ in 4–20 selected rods per
                  assembly.
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <div>
                  <strong className="text-foreground">
                    IFBA (Integral Fuel Burnable Absorber):
                  </strong>{" "}
                  A thin ZrB₂ coating (0.08–0.16 mg ¹⁰B/cm) on the pellet
                  surface. ¹⁰B (σ<sub>a</sub> ≈ 3,840 b) burns out in the first
                  ~1/3 of the cycle with near-zero residual reactivity penalty —
                  unlike Gd rods, which slightly depress uranium content in
                  their rod positions throughout life.
                </div>
              </li>
            </ul>
          </SectionCard>
        </CollapsibleSection>

        {/* NEW 2 — Thermal-Hydraulic Systems */}
        <CollapsibleSection
          id="thermalHydraulics"
          title="Thermal-Hydraulic Systems — In Depth"
          badge="advanced"
          open={open.thermalHydraulics}
          onToggle={() => toggle("thermalHydraulics")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Primary Coolant System — Loop Parameters
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A standard 4-loop PWR (e.g., Westinghouse 3411 MWth) has four
              parallel primary coolant loops: each with a hot leg (~325°C),
              steam generator, reactor coolant pump (RCP), and cold leg
              (~293°C). The four loops share a single pressurizer connected to
              one hot leg.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Total primary coolant flow is approximately 80,000 kg/s (~20,000
              kg/s per loop), with each RCP consuming ~7–8 MW electrical.
              Primary system volume is ~340 m³. Loop transit time is ~12–15
              seconds.
            </p>
            <TableBlock
              caption="Primary Coolant System parameters (4-loop, 3411 MWth)"
              headers={["Parameter", "Value", "Notes"]}
              rows={[
                ["Number of loops", "4", "2-loop or 3-loop in smaller plants"],
                [
                  "Total coolant flow rate",
                  "~80,000 kg/s",
                  "~20,000 kg/s per loop",
                ],
                [
                  "Cold leg temperature",
                  "~292.7°C",
                  "RCP outlet → reactor inlet",
                ],
                ["Hot leg temperature", "~325.5°C", "Core outlet → SG inlet"],
                [
                  "Operating pressure",
                  "155.1 bar (2250 psia)",
                  "Pressurizer setpoint",
                ],
                ["Primary coolant volume", "~340 m³", "Including pressurizer"],
                ["RCP power per pump", "~7.5 MWe", "At full flow"],
                ["Loop transit time", "~12–15 s", "Core outlet to core inlet"],
                [
                  "Pressurizer volume",
                  "~51 m³",
                  "~60% water / 40% steam normal ops",
                ],
                [
                  "Pressurizer heater power",
                  "~1,800 kW total",
                  "Backup pressure control",
                ],
              ]}
              source="Source: Westinghouse AP1000 DCD Rev. 19, Table 5.1-1; IAEA Safety Reports Series No. 57."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Pressurizer — Pressure Control and Safety Function
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The pressurizer (~51 m³) maintains primary system pressure by
              controlling the saturation equilibrium in its steam space. At 155
              bar, the saturation temperature is T<sub>sat</sub> = 344°C —
              keeping bulk primary coolant (~325°C) subcooled by ~19°C,
              preventing bulk boiling throughout the circuit.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-3">
              <li className="flex gap-2">
                <span className="text-primary shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">
                    Heaters (1,800 kW):
                  </strong>{" "}
                  Lower head immersion heaters raise pressure by boiling water
                  into the steam space. Used for pressure increases during
                  heatup or transient response.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">Spray nozzle:</strong>{" "}
                  Cold-leg water injected as a fine spray condenses steam,
                  lowering pressure. Used for controlled pressure reductions and
                  overpressure protection.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">
                    PORV (Power Operated Relief Valve):
                  </strong>{" "}
                  Opens at ~156 bar for controlled pressure relief. Block valve
                  installed downstream prevents loss of coolant if PORV sticks
                  open — a direct lesson from TMI-2 (1979).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0">▸</span>
                <span>
                  <strong className="text-foreground">
                    Safety valves (2):
                  </strong>{" "}
                  Spring-loaded; open at ~158–162 bar as final overpressure
                  protection. Discharge to pressurizer relief tank (PRT) or
                  containment sump.
                </span>
              </li>
            </ul>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Steam Generators — U-Tube Design and Heat Transfer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The vertical U-tube SG (UTSG) contains ~3,588 Inconel 690 U-tubes
              (~22 mm OD, 1.27 mm wall). Primary coolant flows inside the tubes;
              secondary feedwater rises on the shell side and boils to steam.
              Total heat transfer area: ~5,110 m² per SG (Westinghouse Model F).
            </p>
            <EqBlock
              note="Overall heat transfer equation for steam generator. U = overall heat transfer coefficient (~3,000 W/m²·K), A = tube area, ΔTLMTD = log-mean temperature difference"
              content={
                "Q_SG = U \u00D7 A \u00D7 \u0394T_LMTD\n\n\u0394T\u2081 = T_primary_in \u2212 T_secondary_out = 325 \u2212 285 = 40\u00B0C\n\u0394T\u2082 = T_primary_out \u2212 T_secondary_in = 293 \u2212 225 = 68\u00B0C\n\u0394T_LMTD = (68 \u2212 40) / ln(68/40) \u2248 53\u00B0C\n\nQ_SG \u2248 3,000 \u00D7 5,110 \u00D7 53 \u2248 813 MW per SG\n\u00D7 4 SGs \u2248 3,250 MWth (matches ~3,411 MWth core power)"
              }
            />
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Steam generator tube rupture (SGTR) is a design-basis event: a
              single tube failing allows radioactive primary coolant to enter
              the secondary loop, potentially bypassing containment via steam
              lines. SG tubes are inspected by eddy-current testing (ECT) during
              every outage; degraded tubes are plugged or sleeved. Plants with
              &gt;20% tubes plugged face derating. [NRC GL 04-01; EPRI SG
              Program Guidelines]
            </p>
            <TableBlock
              caption="Steam Generator design parameters (Westinghouse Model F)"
              headers={["Parameter", "Value"]}
              rows={[
                ["Type", "Vertical U-tube (UTSG)"],
                ["Number per plant (4-loop)", "4"],
                ["Number of U-tubes", "~3,588 Inconel 690 tubes"],
                ["Tube OD / wall thickness", "~22.2 mm / 1.27 mm"],
                ["Total heat transfer area", "~5,110 m²"],
                ["Primary inlet temperature", "~325.5°C"],
                ["Primary outlet temperature", "~292.7°C"],
                ["Secondary steam pressure", "~70 bar"],
                ["Steam outlet temperature (sat.)", "~285°C"],
                ["Steam production rate", "~1,600 kg/s (all 4 SGs)"],
                ["SG overall height", "~20.6 m"],
                ["SG total weight (full)", "~760 metric tonnes"],
              ]}
              source="Source: Westinghouse Steam Generator Design Documentation; IAEA TECDOC-981."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Secondary System — Rankine Cycle and Thermal Efficiency
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The secondary side follows a modified Rankine cycle. Steam from
              the SG (~285°C, ~70 bar) drives the HP turbine, then passes
              through moisture separator-reheaters (MSR) — removing entrained
              droplets and reheating steam — before entering the LP turbine
              stages. The condenser rejects heat to the ultimate heat sink.
            </p>
            <EqBlock
              note="Rankine cycle thermal efficiency. QH = heat from SGs, QC = heat rejected to condenser, W_net = net electrical output"
              content={
                "\u03B7_thermal = W_net / Q_H = (Q_H \u2212 Q_C) / Q_H\n\nTypical PWR: Q_H \u2248 3,411 MWth, W_net \u2248 1,150 MWe\n\u2192 \u03B7_thermal \u2248 33.7%\n\nFor comparison:\n  Modern gas turbine (CCGT): \u03B7 \u2248 58\u201362%\n  Coal supercritical steam: \u03B7 \u2248 40\u201345%\n  Carnot limit at same temps: \u03B7_Carnot = 1 \u2212 308/558 \u2248 44.8%\n\nThe PWR efficiency gap is due to lower max steam temperature\n(~285\u00B0C / 70 bar) imposed by primary circuit pressure constraint (155 bar / 325\u00B0C)"
              }
            />
          </SectionCard>
        </CollapsibleSection>

        {/* NEW 3 — Reactivity Control Deep Dive */}
        <CollapsibleSection
          id="reactivityMgmt"
          title="Reactivity Control — Deep Dive"
          badge="advanced"
          open={open.reactivityMgmt}
          onToggle={() => toggle("reactivityMgmt")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Control Rod Cluster Assemblies (CRCAs) — Operation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Each CRCA has 24 absorber rods (Ag-In-Cd: 80% Ag / 15% In / 5% Cd,
              or B₄C in lower sections) joined to a spider hub lifted by a
              magnetic jack mechanism. On SCRAM, power to the electromagnet is
              cut; the rod drops by gravity in ~2 s. CRCA groups are divided
              functionally: Bank D (power control, slightly inserted during
              operation) and Banks A–C (shutdown banks, fully withdrawn at
              power).
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3 mb-3">
              <p className="text-sm font-semibold text-foreground mb-1">
                Shutdown Margin and Rod Worth
              </p>
              <p className="text-sm text-muted-foreground">
                Total control rod worth: ~−5,000 to −8,000 pcm (10⁻⁵ Δk/k).
                Technical Specifications require shutdown margin (SDM) ≥ −1,300
                pcm with the highest-worth rod stuck fully withdrawn (10 CFR
                50.36). A single peripheral rod contributes ~100 pcm; a central
                rod up to ~400 pcm. The sum of all rods minus the highest-worth
                rod must exceed the SDM requirement.
              </p>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Chemical Shim — Soluble Boron (CVCS)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Boric acid (H₃BO₃) dissolved in primary coolant provides spatially
              uniform reactivity control. ¹⁰B (19.8% of natural boron) has σ
              <sub>a</sub> ≈ 3,840 b. Boron worth is ~−8 to −12 pcm/ppm. The
              CVCS manages concentration via charging pumps, letdown, the Volume
              Control Tank (VCT), and boric acid makeup tanks.
            </p>
            <EqBlock
              note="Boron worth calculation. dρ/dC_B = differential boron worth (pcm/ppm). Used to plan dilutions/borations for power changes or cycle management."
              content={
                "\u0394\u03C1 = (d\u03C1/dC_B) \u00D7 \u0394C_B\n\nTo compensate 1,000 pcm (1% \u0394k/k) reactivity increase:\n  \u0394C_B = 1000 / 10 = 100 ppm boron dilution required\n\nTypical concentrations:\n  BOC (Begin of Cycle): ~1,000\u20131,500 ppm (fresh, hot full power)\n  EOC (End of Cycle):   ~0\u201350 ppm (burned, near critical with rods only)"
              }
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Reactivity Coefficients — Quantitative Analysis
            </h3>
            <TableBlock
              caption="Reactivity coefficients for a 3411 MWth 4-loop PWR (HFP conditions)"
              headers={[
                "Coefficient",
                "BOC Value",
                "EOC Value",
                "Physical Mechanism",
                "Licensing Limit",
              ]}
              rows={[
                [
                  "Doppler (fuel temp) α_D",
                  "−1.0 to −2.0 pcm/°C",
                  "−1.5 to −3.0 pcm/°C",
                  "Thermal broadening of U-238 resonance absorption XS",
                  "Must be negative; measured at startup",
                ],
                [
                  "Moderator temp (MTC) α_M",
                  "−10 to −20 pcm/°C (HFP)",
                  "−30 to −50 pcm/°C (HFP)",
                  "Density decrease → less moderation → harder spectrum",
                  "≤ 0 pcm/°C at HFP; slightly positive at CZP acceptable",
                ],
                [
                  "Void coefficient α_void",
                  "−50 to −200 pcm/%void",
                  "−100 to −300 pcm/%void",
                  "Voided water provides less moderation than absorption",
                  "Negative at all power levels",
                ],
                [
                  "Power coefficient α_P",
                  "−10 to −20 pcm/% power",
                  "−20 to −40 pcm/% power",
                  "Sum of fuel and coolant temperature feedback",
                  "Negative at all power levels",
                ],
              ]}
              source="Source: Todreas & Kazimi, Nuclear Systems I, 2nd ed.; NRC Regulatory Guide 1.105; IAEA Safety Series 35-G1."
            />
            <div className="mt-4 rounded-md bg-muted/30 border border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground mb-1">
                Temperature Defect and Power Defect
              </p>
              <p className="text-sm text-muted-foreground">
                <em>Temperature defect:</em> total reactivity change from cold
                zero power (CZP, ~20°C) to hot zero power (HZP, ~292°C, all rods
                out): typically −1,500 to −2,000 pcm. <em>Power defect:</em>{" "}
                additional change from HZP to hot full power (HFP): typically
                −1,000 to −1,500 pcm. Together (~−2,500 to −3,500 pcm total)
                these defects must be compensated by boron addition and control
                rod insertion during reactor startup from cold shutdown.
              </p>
            </div>
          </SectionCard>
        </CollapsibleSection>

        {/* NEW 4 — ECCS and Defense in Depth Detailed */}
        <CollapsibleSection
          id="eccsSystems"
          title="ECCS and Defense in Depth — Detailed Analysis"
          badge="advanced"
          open={open.eccsSystems}
          onToggle={() => toggle("eccsSystems")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              LOCA Classification and Break Physics
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Loss-of-Coolant Accidents (LOCAs) are classified by break size and
              location:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Small-Break LOCA (SB-LOCA):
                  </strong>{" "}
                  Break area &lt;~0.01 m² (stuck-open PORV, instrument line).
                  Pressure decreases slowly (~minutes). HPSI provides makeup.
                  Most dangerous risk: potential loss of natural circulation if
                  break is in hot leg.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Large-Break LOCA (LB-LOCA):
                  </strong>{" "}
                  Break area ≥~0.06 m²; design basis is DEGB (double-ended
                  guillotine break) of the 750 mm cold leg pipe. Blowdown in
                  ~20–30 s; passive accumulator injection required. Traditional
                  design-limiting case for ECCS.
                </span>
              </li>
            </ul>
            <EqBlock
              note="Critical flow (Moody model) from a large break. P_0 = stagnation pressure, \u03C1_f = liquid density, C_D = discharge coefficient (~0.6), A = break area"
              content={
                "G_c = C_D \u00D7 \u221A(2 \u00D7 \u03C1_f \u00D7 P_0)\n\nFor saturated water at 155 bar:\n  \u03C1_f \u2248 720 kg/m\u00B3, P_0 = 15.5 MPa\n  G_c \u2248 0.6 \u00D7 \u221A(2 \u00D7 720 \u00D7 15.5\u00D710\u2076) \u2248 28,200 kg/(m\u00B2\u00B7s)\n\nFor 0.44 m\u00B2 break (DEGB of 0.75 m pipe): flow \u2248 12,400 kg/s\n\u2192 Primary inventory (~340 m\u00B3, ~245,000 kg): drains in ~20 seconds"
              }
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Single Failure Criterion and Train Redundancy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              NRC's Single Failure Criterion (10 CFR 50, Appendix A, GDC-17)
              requires all safety systems to perform with any single active
              component failed. This drives 4-train ECCS designs, each train in
              a separate building with independent EDGs, pumps, and piping.
            </p>
            <TableBlock
              caption="ECCS redundancy and independence requirements"
              headers={["Requirement", "Implementation", "Regulatory Basis"]}
              rows={[
                [
                  "Single failure criterion",
                  "4 ECCS trains; any 2 of 4 sufficient for LB-LOCA",
                  "GDC-17, 10 CFR 50 App. A",
                ],
                [
                  "Train independence",
                  "Separate buildings/divisions; separate EDG power feeds",
                  "GDC-5, 10 CFR 50 App. A",
                ],
                [
                  "Common cause prevention",
                  "Design diversity; staggered testing; Appendix R fire protection",
                  "NRC 10 CFR 50 App. R",
                ],
                [
                  "Testability",
                  "Each train testable individually during plant operation",
                  "GDC-40",
                ],
                [
                  "Seismic qualification",
                  "Safety-related SSCs: Seismic Category I (SSE design)",
                  "10 CFR 50 App. S; RG 1.60",
                ],
              ]}
              source="Source: 10 CFR 50, Appendix A; NRC NUREG-0800, Chapter 6."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Defense in Depth — Four Physical Barriers
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The IAEA Defense in Depth concept (INSAG-10) defines four physical
              barriers between fission products and the environment:
            </p>
            <ol className="space-y-3 text-sm text-muted-foreground list-none">
              {[
                [
                  "Barrier 1 — UO₂ Fuel Matrix",
                  "95–98% of fission products (Cs, Sr, I, Ba, rare earths) remain bound in the ceramic matrix under normal operation. Noble gases (Xe, Kr) migrate to grain boundaries and the fuel-cladding gap but remain within the rod.",
                ],
                [
                  "Barrier 2 — Zircaloy Cladding",
                  "The sealed Zr-alloy tube retains all fuel material and gaseous fission products released from the pellet. Cladding failure (hydriding, PCI, overtemperature) is a 'fuel failure' event tracked by primary coolant activity (fission product monitors).",
                ],
                [
                  "Barrier 3 — Reactor Coolant System Boundary",
                  "The ~160 mm thick reactor pressure vessel, primary piping, steam generators, pressurizer, and valves form the RCS boundary. RCS leakage is continuously monitored (≤150 gal/day 'identified' limit per T.S.). Fission products entering the coolant remain within this boundary.",
                ],
                [
                  "Barrier 4 — Containment Building",
                  "~1.5 m thick reinforced concrete shell with a steel liner, designed to withstand design-basis accident pressure (~4–5 bar absolute, ~150°C). Isolation valves close on high radiation or high pressure signals. This is the final environmental barrier.",
                ],
              ].map(([title, desc]) => (
                <li key={String(title)} className="flex gap-3">
                  <span className="text-primary shrink-0 font-semibold text-xs mt-1 min-w-4">
                    {String(title)
                      .split("—")[0]
                      .replace("Barrier ", "B")
                      .trim()}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-xs mb-1">
                      {String(title).split("—")[1]?.trim()}
                    </p>
                    <p className="leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Passive Accumulator Injection — Detailed Mechanics
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Each accumulator (~60 m³) is filled with borated water
              (~2,000–2,500 ppm ¹⁰B) and pressurized to ~45–55 bar with nitrogen
              gas. A check valve opens automatically when RCS pressure falls
              below the nitrogen pre-charge pressure (no operator action, no
              electrical power).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              During LB-LOCA, RCS pressure falls from 155 bar to below 50 bar in
              ~20–30 s. Accumulators then inject ~200–400 kg/s per unit, rapidly
              filling the lower plenum and beginning core reflood. This passive
              system is robust against station blackouts — requiring no pumps,
              motors, or AC power. 4 accumulators per plant (one per cold leg).
              [10 CFR 50.46; IAEA-TECDOC-1729]
            </p>
          </SectionCard>
        </CollapsibleSection>

        {/* NEW 5 — Generation III+ */}
        <CollapsibleSection
          id="genIIIPlus"
          title="Generation III+ and Advanced PWR Designs"
          badge="intermediate"
          open={open.genIIIPlus}
          onToggle={() => toggle("genIIIPlus")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              What Defines Generation III+?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Generation III+ designs, developed post-1995, incorporate lessons
              from TMI and Chernobyl and — critically post-Fukushima (2011) —
              mandate passive safety systems capable of 72+ hours of core
              cooling without AC power, diesel generators, or operator action.
              This requirement emerged from Fukushima Daiichi, where station
              blackout (caused by a 15.5 m tsunami, vs. 5.7 m design basis)
              disabled all backup power for 48 hours.
            </p>
            <TableBlock
              caption="Major Generation III+ PWR designs worldwide (IAEA PRIS, 2024)"
              headers={[
                "Design",
                "Developer",
                "Power (MWe)",
                "Safety Philosophy",
                "Operating",
                "Under Construction",
              ]}
              rows={[
                [
                  "AP1000",
                  "Westinghouse",
                  "1,117",
                  "Passive safety — no pumps/AC for 72 h",
                  "8 (China + Vogtle 3–4, USA)",
                  "~6 (China, Poland licensing)",
                ],
                [
                  "EPR",
                  "EDF/Framatome",
                  "1,600–1,650",
                  "Active redundancy — 4 independent trains",
                  "4 (Taishan 1–2; OL3; Flamanville-3)",
                  "2 (Hinkley Point C, UK)",
                ],
                [
                  "VVER-1200 (AES-2006)",
                  "Rosatom",
                  "1,198–1,254",
                  "Combined active/passive; core catcher; 24-h PHRS",
                  "6 (Russia; Belarus)",
                  "~10 (Turkey; Egypt; India 3–6)",
                ],
                [
                  "APR1400",
                  "KEPCO",
                  "1,400",
                  "Active 4-train; passive accumulators",
                  "4 (UAE Barakah 1–4)",
                  "4 (Shin Hanul 3–4, Korea)",
                ],
                [
                  "CAP1400 (SNPTC)",
                  "State Nuclear (China)",
                  "1,500",
                  "Passive, AP1000 derivative",
                  "0 (first unit in construction)",
                  "2 (Shidao Bay)",
                ],
                [
                  "HPR1000 / Hualong One",
                  "CGN/CNNC (China)",
                  "1,000–1,161",
                  "Active 3-train + passive; dual-containment",
                  "4 (Fuqing 5–6, Fangchenggang 3–4)",
                  "~16 (China + Pakistan + UK bid)",
                ],
              ]}
              source="Source: IAEA PRIS Database, 2024; World Nuclear Association Reactor Database, April 2024."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              AP1000 — Passive Safety Architecture
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The AP1000 is the first large commercial reactor where passive
              systems are the <em>primary</em> (not backup) safety layer —
              eliminating the 750+ safety-related pumps, fans, and diesel
              generators of a Gen II design. Core Damage Frequency:
              &lt;5×10⁻⁷/reactor-year (vs. ~10⁻⁴ for Gen II).
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-3">
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Core Makeup Tanks (CMTs, 2×):
                  </strong>{" "}
                  71 m³ each, above the core, directly connected to cold legs.
                  Gravity-driven injection begins automatically on valve opening
                  — no pump needed. Provides high-pressure makeup for SB-LOCAs
                  and transients.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Passive Residual Heat Removal HX (PRHR):
                  </strong>{" "}
                  Submerged in the IRWST. Natural circulation removes decay heat
                  for 1+ hours without pumps, cooling the primary to safe
                  temperatures passively.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    In-Containment Refueling Water Storage Tank (IRWST, ~2,000
                    m³):
                  </strong>{" "}
                  Located inside the steel containment; gravity-feeds the core
                  after CMTs drain. Provides 72 hours of passive cooling.
                  Long-term sump recirculation via gravity-siphon valves.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Passive Containment Cooling System (PCCS):
                  </strong>{" "}
                  1,700 m³ water tank on top of the steel containment shell.
                  Water flows by gravity over the shell; evaporation and natural
                  air convection remove heat for 72 hours — no fans or pumps.
                  [NRC NUREG-1793]
                </span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground italic">
              Operating units: Sanmen-1/-2 and Haiyang-1/-2 (China, 2018–2019);
              Vogtle-3/-4 (USA, 2023–2024). Source: Westinghouse AP1000 DCD Rev.
              19; NRC NUREG-1793.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              EPR — Four-Train Active Safety with Severe Accident Features
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The 1,650 MWe EPR (European Pressurized Reactor) uses massive
              active redundancy: 4 fully independent, 100%-capable safety trains
              housed in physically separate buildings at the four corners of the
              plant. Any 2 of 4 trains suffice for all design-basis accidents
              (N+2 redundancy), providing simultaneous protection against
              flooding, fire, and projectile impact on two trains.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              For severe accidents, the EPR includes a dedicated{" "}
              <strong className="text-foreground">
                Core Melt Stabilization System (CMSS)
              </strong>
              : a spreading compartment beneath the reactor pit where corium
              spreads over ~170 m² of ceramic-lined floor, cooled by
              top-flooding from a dedicated water tank. Validated to prevent
              basemat erosion and explosive hydrogen from MCCI. Operating units:
              Taishan 1–2 (China); Olkiluoto-3 (Finland); Flamanville-3 (France,
              2024). [IAEA TECDOC-1535; Framatome EPR Pre-licensing, 2019]
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              APR1400 — Korea's Export Success at UAE Barakah
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Advanced Power Reactor 1400 (APR1400, KEPCO/KHNP) achieved a
              historic first: four 1,400 MWe units built and operated in the UAE
              — the first Arab state with civilian nuclear power and the first
              country with no prior nuclear experience to commission multiple
              Gen III+ units. All four Barakah units entered commercial
              operation 2021–2024. The APR1400 features 4-train ECCS, passive
              accumulators, a 60-year design life, and seismic qualification to
              0.3 g peak ground acceleration. [IAEA SSNI Review, 2019; KEPCO NF,
              2023]
            </p>
          </SectionCard>
        </CollapsibleSection>

        {/* NEW 6 — Severe Accident Management Post-Fukushima */}
        <CollapsibleSection
          id="severeAccidentMgmt"
          title="Severe Accident Management — Post-Fukushima Analysis"
          badge="advanced"
          open={open.severeAccidentMgmt}
          onToggle={() => toggle("severeAccidentMgmt")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Three Mile Island Unit 2 — 1979 Accident Analysis
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The TMI-2 accident (March 28–29, 1979) is the most thoroughly
              studied severe accident in PWR history. The initiating event was a
              loss of feedwater to the steam generators (turbine trip), causing
              primary pressurization and a PORV to open. The PORV stuck open for
              2h 22min, draining ~120 m³ of primary coolant. Operators — misled
              by a "PORV closed" indicator (showing solenoid de-energized, not
              valve position) and high pressurizer level (indicating
              steam/flashing, not adequate inventory) — throttled ECCS for ~80
              minutes.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Result: ~45% core melt (~52 tonnes of corium relocated to the
              lower plenum), but the RPV was not breached — quenched by restored
              cooling ~16 hours after accident initiation. No deaths resulted;
              offsite dose was ~1 mrem average within 10-mile EPZ. The accident
              triggered fundamental global changes to reactor safety regulation,
              operator training (simulator use), and instrumentation design.
            </p>
            <TableBlock
              caption="TMI-2 accident timeline summary"
              headers={["Time (h:m)", "Event", "Key Implication"]}
              rows={[
                [
                  "0:00",
                  "Loss of feedwater; turbine trip; PORV opens on demand",
                  "Normal design-basis transient initiator",
                ],
                [
                  "0:02",
                  "PORV fails to reseat — stuck open",
                  "Begins uncontrolled primary coolant loss",
                ],
                [
                  "0:08",
                  "ECCS actuates automatically on low pressurizer pressure",
                  "Correct automatic safety response",
                ],
                [
                  "0:08–1:20",
                  "Operators throttle ECCS; misread pressurizer level",
                  "Core begins to uncover; key human error",
                ],
                [
                  "2:22",
                  "Operators manually close PORV block valve; coolant loss stops",
                  "Too late; significant core damage ongoing",
                ],
                [
                  "~10:00",
                  "H₂ gas pocket (~35 m³) forms in vessel dome",
                  "Non-damaging; later drove hydrogen management requirements",
                ],
                [
                  "~16:00",
                  "Operators restore adequate cooling; core quenched",
                  "Prevents RPV failure",
                ],
                [
                  "Post-accident",
                  "~52 t corium; 2/3 core melt; RPV intact; no off-site deaths",
                  "No breach; major release averted",
                ],
              ]}
              source="Source: NRC NUREG-0600 (TMI Report); B.J. Remick, NRC, 1980; IAEA Safety Series 75-INSAG-1."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Post-Fukushima Regulatory Improvements for PWRs
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Although Fukushima Daiichi involved BWRs (GE Mark I), the 2011
              accident triggered global re-evaluation of all reactor types. The
              station blackout cause (15.5 m tsunami vs. 5.7 m design basis)
              drove the NRC's Near-Term Task Force (NTTF) recommendations, which
              became regulatory requirements for all US nuclear plants:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-3">
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">FLEX (EA-12-049):</strong>{" "}
                  Pre-positioned portable generators, pumps, and hoses
                  sufficient for 72-hour coping without any fixed plant systems.
                  Stored in protected buildings resistant to flooding and
                  seismic events.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Spent Fuel Pool (SFP) Instrumentation (EA-12-051):
                  </strong>{" "}
                  Mandatory robust water level and temperature monitoring for
                  SFPs — Fukushima Unit 4 SFP lost cooling with no reliable
                  instrumentation.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Seismic/Flooding Re-evaluation (10 CFR 50.54f):
                  </strong>{" "}
                  All US plants required to re-evaluate site seismic and
                  flooding hazards with updated probabilistic models; implement
                  protective measures where design basis is insufficient.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0 font-bold">▸</span>
                <span>
                  <strong className="text-foreground">
                    Hardened Venting / FCVS:
                  </strong>{" "}
                  Required for BWR Mark I/II; PWRs evaluated for filtered
                  containment venting capability. European regulators (ENSREG)
                  mandated FCVS broadly for both BWR and PWR designs.
                </span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground italic">
              Source: NRC SECY-11-0093 (NTTF Recommendations); NRC Orders
              EA-12-049, EA-12-050, EA-12-051; IAEA Action Plan on Nuclear
              Safety, 2011.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              In-Vessel Melt Retention (IVR) — Quantitative Basis
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              IVR keeps molten corium inside the reactor pressure vessel by
              flooding the reactor cavity and cooling the outer surface of the
              lower head. Feasibility requires that the heat flux through the
              lower head not exceed the critical heat flux (CHF) for
              nucleate-to-film boiling transition on the external surface.
            </p>
            <EqBlock
              note="IVR feasibility criterion. q\u2033_decay = decay heat flux through vessel wall at angle \u03B8. q\u2033_CHF = critical heat flux for nucleate boiling on outer surface. \u03B8 = angle from vessel bottom."
              content={
                "IVR feasible if: q\u2033_decay(\u03B8) \u2264 q\u2033_CHF(\u03B8)  at all \u03B8\n\nFor AP1000 lower head (hemispherical, ~4 m diameter):\n  Peak q\u2033_decay (\u03B8 \u2248 45\u00B0): ~200\u2013400 kW/m\u00B2\n  q\u2033_CHF (external flooding, \u03B8 \u2248 45\u00B0): ~800\u20131,200 kW/m\u00B2 (SULTAN/ULPU test data)\n  \u2192 Safety margin: ~2\u20134\u00D7 (NRC NUREG-1793 analysis)\n\nKey challenge: metallic layer heat focusing effect \u2014 Fe-rich metal layer atop\noxide pool concentrates flux into upper sidewall; reduces local safety margin."
              }
            />
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              IVR has been validated for AP600, AP1000, and assessed for
              APR1400. The "focusing effect" is the primary analytical challenge
              for IVR qualification in higher power density designs (&gt;1,000
              MWe). [NUREG-1953; INL/EXT-13-30704; Theofanous et al., Nuc. Eng.
              Des., 1996]
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Hydrogen Risk — Detonation Analysis and PAR Mitigation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              During severe accidents with significant Zircaloy oxidation, H₂
              production can exceed 100 kg/s. Risk depends on local
              concentration and geometry.
            </p>
            <TableBlock
              caption="Hydrogen risk thresholds in air (25°C, 1 atm)"
              headers={["Threshold", "H₂ Vol % in Air", "Consequence"]}
              rows={[
                [
                  "Lower Flammability Limit (LFL)",
                  "~4%",
                  "Minimum for sustained combustion with ignition source",
                ],
                [
                  "Deflagration regime",
                  "4–18%",
                  "Slow flame; containment pressure rise; structural risk",
                ],
                [
                  "Deflagration-to-Detonation (DDT)",
                  "~15–18% (favorable geometry)",
                  "Violent detonation; pressure pulse up to 15× atmospheric",
                ],
                [
                  "Upper Flammability Limit (UFL)",
                  "~75%",
                  "Too rich without oxidant dilution",
                ],
                [
                  "Stoichiometric mixture",
                  "~29.6%",
                  "Most energetic combustion",
                ],
              ]}
              source="Source: IAEA TECDOC-1661 (Hydrogen in Water-Cooled NPPs); NUREG/CR-6554."
            />
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              <strong className="text-foreground">
                Passive Autocatalytic Recombiners (PARs)
              </strong>{" "}
              use Pd or Pt catalyst to combine H₂ + O₂ → H₂O passively at
              concentrations as low as 0.3% H₂ — far below the LFL. A typical
              large PWR containment requires 30–60 PAR units with ~5–15 kg/h
              combined H₂ removal capacity. PARs require no electrical power and
              cannot be disabled by the accident. [IAEA TECDOC-1661; NRC
              NUREG-1861]
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Severe Accident Analysis Codes
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "MELCOR (NRC/Sandia)",
                  body: "Fully integrated severe accident code for NRC regulatory analysis and PRA support. Models fission product transport, hydrogen generation, MCCI, and containment failure modes. Used for Fukushima accident reconstruction and SOARCA studies. [NUREG/CR-6119]",
                },
                {
                  title: "MAAP (EPRI/Fauske)",
                  body: "Industry-standard code used by most US utilities for Probabilistic Risk Assessment and to define Severe Accident Management Guideline boundaries. Version 5 models all Gen III+ passive safety features including AP1000 passive ECCS.",
                },
                {
                  title: "RELAP5 / TRACE (NRC)",
                  body: "Thermal-hydraulic system codes for design-basis and beyond-design-basis analysis. TRACE (TRAC/RELAP Advanced Computational Engine) is the NRC's current best-estimate code for LOCA and transient analysis. Used for 10 CFR 50.46 ECCS evaluation.",
                },
                {
                  title: "COCOSYS (GRS, Germany)",
                  body: "Containment analysis code for hydrogen distribution and combustion, fission product deposition, and containment thermal-hydraulics. Used for EPR containment evaluation and multi-compartment hydrogen risk assessment.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-muted/20 p-3"
                >
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </CollapsibleSection>

        {/* ─── Safety Callout ─── */}
        <SafetyCallout title="Restricted: Detailed Engineering Specifications">
          Detailed core loading patterns, specific control system schematics,
          and neutron economy calculations beyond publicly available NRC
          documents are not provided on this platform. For licensed engineering
          purposes, consult the NRC ADAMS database and vendor design documents
          under appropriate regulatory oversight.
        </SafetyCallout>
      </div>
    </div>
  );
}
