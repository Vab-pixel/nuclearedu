import { AudienceBadge } from "@/components/AudienceBadge";
import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { SectionCard } from "@/components/SectionCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────

const keyParameters = [
  ["Thermal power (CANDU-6)", "~2,064 MWth"],
  ["Electric output (CANDU-6)", "~700 MWe"],
  ["Thermal efficiency", "~34%"],
  ["Fuel type", "Natural UO₂ (0.72% U-235)"],
  ["Moderator", "Heavy water (D₂O)"],
  ["Coolant", "Heavy water (D₂O), ~100 bar"],
  ["Coolant inlet / outlet temp.", "~267°C / ~312°C"],
  ["Calandria diameter × length", "~6.0 m × 5.9 m"],
  ["Fuel channels", "380 (CANDU-6)"],
  ["Fuel bundle length", "0.495 m (37-element)"],
  ["Bundles per channel", "12–13"],
  ["Discharge burnup", "~7–8 GWd/tHM"],
  ["Refueling", "On-power, ~12–15 bundles/day"],
];

const operatingFleet = [
  ["Canada", "Bruce A/B", "8", "CANDU-6", "~860 MWe each"],
  ["Canada", "Darlington", "4", "CANDU-6", "~881 MWe (refurb. ongoing)"],
  ["Canada", "Pickering", "6 active", "CANDU-6", "~515 MWe (retiring ~2026)"],
  ["Romania", "Cernavoda 1 & 2", "2", "CANDU-6", "~706 MWe each"],
  ["South Korea", "Wolsong 1–4", "4", "CANDU-6", "685–699 MWe"],
  [
    "India",
    "RAPS/MAPS/NAPS/KAPS",
    "Multiple",
    "PHWR (Indian CANDU)",
    "100–220 MWe (various)",
  ],
  ["China", "Qinshan III", "2", "CANDU-6", "~728 MWe"],
  ["Argentina", "Embalse", "1", "CANDU-6", "~648 MWe"],
  ["Pakistan", "Kanupp-1", "1 (retired 2021)", "CANDU predecessor", "137 MWe"],
];

const moderatorComparison = [
  [
    "Light water (H₂O)",
    "0.332",
    "—",
    "71",
    "Very good scatterer, high absorption → needs enriched fuel",
  ],
  [
    "Heavy water (D₂O)",
    "0.000506",
    "656×",
    "21,000",
    "Best moderating ratio; low absorption → natural U sufficient",
  ],
  [
    "Graphite",
    "0.0034",
    "98×",
    "216",
    "Good moderator; used in RBMK, Magnox, HTGR",
  ],
  [
    "Beryllium",
    "0.0092",
    "36×",
    "143",
    "Excellent, but toxic and expensive — limited use",
  ],
];

const sdsSystems = [
  {
    id: "SDS1",
    name: "Shutdown System 1 (SDS1)",
    description:
      "Cadmium adjuster/absorber rods that drop into the moderator by gravity within <2 seconds of a trip signal. The rods are above the core in normal operation; a trip signal cuts the electromagnets holding them up. Fully passive: gravity-actuated, requires no power to insert.",
  },
  {
    id: "SDS2",
    name: "Shutdown System 2 (SDS2)",
    description:
      "High-pressure injection of gadolinium nitrate (Gd(NO₃)₃) solution directly into the D₂O moderator. Gadolinium-155 and Gd-157 are among the highest thermal neutron absorbers known (σ_a ~ 49,000 and 254,000 barns respectively). SDS2 is physically diverse and spatially diverse from SDS1. Canadian regulations require each system to be independently capable of achieving and maintaining full shutdown.",
  },
];

// ─── Reusable Components ────────────────────────────────────────────────────

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
    <section aria-label={title} data-ocid={`candu.${id}_section`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-ocid={`candu.${id}_toggle`}
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
        <div className="mt-3 space-y-4" data-ocid={`candu.${id}_content`}>
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
                className="px-4 py-2 text-left font-semibold text-foreground whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {rows.map((row) => (
            <tr
              key={String(row[0]) + String(row[1])}
              className="text-muted-foreground"
            >
              {row.map((cell, ci) => (
                <td
                  key={`${String(row[0])}-${ci}`}
                  className={`px-4 py-2 ${ci > 0 ? "font-mono text-foreground" : ""}`}
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

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CANDUPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    heavyWater: false,
    pressureTubes: false,
    onPowerRefueling: false,
    safetySystems: false,
    operatingFleet: false,
  });

  function toggle(key: string) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="CANDU Reactor"
        subtitle="Canada's heavy-water reactor design — the only commercial power reactor capable of using natural uranium fuel while refueling continuously at full power."
        audienceLevel="advanced"
        readTimeMin={26}
      />

      <div className="grid gap-6">
        {/* ─── Overview ─── */}
        <SectionCard data-ocid="candu.overview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            How a CANDU Works
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            CANDU stands for <strong className="text-foreground">CA</strong>nada{" "}
            <strong className="text-foreground">D</strong>euterium{" "}
            <strong className="text-foreground">U</strong>ranium — a name that
            encodes its three defining features: Canadian origin, heavy water
            (deuterium oxide, D₂O) as both moderator and coolant, and natural
            uranium fuel. Developed by Atomic Energy of Canada Limited (AECL)
            beginning in the 1950s, the first commercial CANDU-6 unit came
            online at Pickering A in 1971.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Where a Pressurized Water Reactor keeps its entire core under high
            pressure in a single massive steel vessel, CANDU distributes fuel
            across hundreds of individual horizontal{" "}
            <strong className="text-foreground">pressure tubes</strong> running
            through a large, low-pressure tank of heavy water called the{" "}
            <strong className="text-foreground">calandria</strong>. The D₂O
            coolant flows through the pressure tubes at ~100 bar; the D₂O
            moderator surrounding them in the calandria sits at near-atmospheric
            pressure and a much lower temperature (~70°C). This physical
            separation of coolant and moderator is a unique CANDU safety
            feature.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The global CANDU fleet comprises approximately 40 operating reactors
            in Canada, Romania, South Korea, China, India, Pakistan, and
            Argentina. Variants include the standard CANDU-6 (~700 MWe), the
            larger CANDU 9 (900+ MWe), the Enhanced CANDU-6 (EC6), and India's
            domestic PHWR program which has scaled up to a 700 MWe design. [IAEA
            PRIS, 2024]
          </p>
        </SectionCard>

        {/* ─── Operating Parameters ─── */}
        <SectionCard data-ocid="candu.parameters_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Typical Operating Parameters — CANDU-6
          </h2>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="CANDU-6 operating parameters"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">
                    Parameter
                  </th>
                  <th className="pb-2 font-semibold text-foreground text-right">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {keyParameters.map(([p, v]) => (
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
            Source: AECL CANDU-6 Technical Summary; IAEA PRIS; NEA/OECD 2023.
          </p>
        </SectionCard>

        {/* ════════════════════════════════════════════
            COLLAPSIBLE SECTIONS
        ════════════════════════════════════════════ */}

        {/* 1 — Heavy Water: Why D₂O? */}
        <CollapsibleSection
          id="heavyWater"
          title="Heavy Water: Why D₂O?"
          badge="intermediate"
          open={open.heavyWater}
          onToggle={() => toggle("heavyWater")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Deuterium vs. Protium — The Neutron Absorption Difference
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Heavy water (D₂O) substitutes deuterium (²H, or D) for the
              ordinary hydrogen (¹H, or protium) in water. Chemically they are
              nearly identical, but their nuclear behavior is dramatically
              different. Ordinary hydrogen (¹H) has a large thermal neutron
              absorption cross-section of{" "}
              <strong className="text-foreground">σ_a(¹H) = 0.332 barns</strong>
              . Deuterium, with its extra neutron, is far less inclined to
              capture another:
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3 mb-3">
              <p className="text-sm font-semibold text-foreground mb-2">
                Thermal Neutron Absorption Cross-Sections (at 2200 m/s)
              </p>
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
                {`σ_a(¹H)  = 0.332000 barns
σ_a(²H)  = 0.000506 barns
Ratio:     0.332 / 0.000506 ≈ 656×`}
              </pre>
              <p className="mt-2 text-xs text-muted-foreground">
                Source: NNDC/BNL Atlas of Neutron Resonances, 6th ed. (2018);
                IAEA-NDS ENDF/B-VIII.0.
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              This 656-fold difference is the entire basis of the CANDU design
              philosophy. When a moderator captures very few neutrons, far more
              are available to sustain the chain reaction in each generation.
              The neutron economy is so favorable that <em>natural uranium</em>{" "}
              — with only 0.72% U-235 — provides enough fissile material for
              criticality. Light-water reactors must enrich their fuel to 3–5%
              U-235 precisely because ordinary water "wastes" so many neutrons.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The scattering cross-section of deuterium is also adequate:{" "}
              <strong className="text-foreground">σ_s(²H) ≈ 3.4 barns</strong>.
              D₂O is a slightly less effective scatterer per molecule than H₂O
              (H scatters neutrons more efficiently per collision due to mass
              matching), but the enormous gain in absorption economics more than
              compensates.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Moderating Ratio — The Key Figure of Merit
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The <strong className="text-foreground">moderating ratio</strong>{" "}
              is defined as:
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3 mb-3">
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
                {`Moderating Ratio = ξ · Σ_s / Σ_a

  ξ  = mean logarithmic energy decrement per collision
  Σ_s = macroscopic scattering cross-section [cm⁻¹]
  Σ_a = macroscopic absorption cross-section [cm⁻¹]`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A high moderating ratio means a material slows neutrons quickly
              (high ξΣ_s) without absorbing them (low Σ_a) — ideal for neutron
              economy in a thermal reactor. D₂O's ratio is orders of magnitude
              better than any competitor:
            </p>
            <TableBlock
              caption="Moderating ratio comparison"
              headers={[
                "Material",
                "σ_a (barns)",
                "vs. H₂O absorption",
                "Mod. Ratio (ξΣ_s/Σ_a)",
                "Consequence",
              ]}
              rows={moderatorComparison}
              source="Source: Lamarsh & Baratta, Introduction to Nuclear Engineering, 3rd ed.; Glasstone & Sesonske, Nuclear Reactor Engineering, 4th ed."
            />
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              D₂O's moderating ratio of ~21,000 — roughly 300× better than
              graphite and nearly 300× better than light water — is the single
              most important number in the CANDU design. It is what makes
              natural uranium fuel commercially viable.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              D₂O Production and Cost
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Deuterium occurs naturally in water at about 1 atom per 6,400
              hydrogen atoms. Separating it to produce heavy water is
              energy-intensive. Two processes dominate:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">
                    Girdler Sulfide (GS) Process:
                  </strong>{" "}
                  Uses the different deuterium partitioning between H₂S gas and
                  liquid water at different temperatures. The historic process
                  used at AECL's Bruce Heavy Water Plant (closed 1997) and at
                  Indian facilities. Low energy cost per kg but requires large
                  towers.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">
                    Electrolysis Cascade:
                  </strong>{" "}
                  Electrolysis of water concentrates D₂O in the residual liquid
                  because H₂O is preferentially electrolyzed. Used for final
                  enrichment stages. High energy cost; practical only for
                  small-scale topping.
                </div>
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Current D₂O prices are approximately{" "}
              <strong className="text-foreground">$300–$600 USD/kg</strong>,
              making the ~0.5 tonne per channel inventory of a full CANDU-6 (and
              ~250 tonnes total D₂O per reactor) a multi-hundred-million-dollar
              capital cost. D₂O is carefully managed: even small leaks into the
              ordinary water environment must be monitored, as D₂O dilution
              reduces reactor performance. A dedicated{" "}
              <strong className="text-foreground">D₂O Upgrading System</strong>{" "}
              re-enriches contaminated heavy water back to specification. [AECL
              CANDU-6 Technical Summary, 2005]
            </p>
          </SectionCard>
        </CollapsibleSection>

        {/* 2 — Horizontal Pressure Tube Design */}
        <CollapsibleSection
          id="pressureTubes"
          title="Horizontal Pressure Tube Design"
          badge="advanced"
          open={open.pressureTubes}
          onToggle={() => toggle("pressureTubes")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              The Calandria and Fuel Channels
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The reactor core is built around the{" "}
              <strong className="text-foreground">calandria</strong> — a large
              horizontal stainless steel cylinder approximately{" "}
              <strong className="text-foreground">
                6.0 m in diameter and 5.9 m long
              </strong>{" "}
              (CANDU-6), filled with low-pressure (~1 atm) D₂O moderator at
              about 70°C. Through this tank run 380 horizontal{" "}
              <strong className="text-foreground">fuel channels</strong>,
              arranged in a square lattice on a ~28.6 cm pitch. Each fuel
              channel consists of:
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground list-none mb-3">
              {[
                [
                  "1.",
                  "Pressure tube",
                  "Made of Zircaloy-2, ~103 mm ID, carries the high-pressure (~100 bar) D₂O coolant and fuel bundles.",
                ],
                [
                  "2.",
                  "Annular gas gap",
                  "A ~7 mm CO₂ gas annulus between the pressure tube and the calandria tube, acting as thermal insulation to protect the calandria from hot coolant temperatures.",
                ],
                [
                  "3.",
                  "Calandria tube",
                  "A thin Zircaloy-2 outer tube that interfaces with the cold D₂O moderator. The gas gap keeps it from being heated by the ~300°C coolant.",
                ],
              ].map(([n, t, d]) => (
                <li key={String(t)} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">{n}</span>
                  <div>
                    <strong className="text-foreground">{t}:</strong> {d}
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each channel holds 12–13 short fuel bundles (0.495 m each,
              37-element Zircaloy-4 cladded natural UO₂). The coolant flows in
              alternate directions in adjacent channels — a{" "}
              <strong className="text-foreground">bidirectional flow</strong>{" "}
              arrangement that averages fuel burnup and coolant temperature more
              uniformly across the core.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Pressure Tube vs. Pressure Vessel: Key Differences
            </h3>
            <TableBlock
              caption="Pressure tube vs. pressure vessel reactor comparison"
              headers={[
                "Feature",
                "CANDU (Pressure Tube)",
                "PWR/BWR (Pressure Vessel)",
              ]}
              rows={[
                [
                  "Pressure boundary",
                  "~380 individual Zircaloy tubes",
                  "Single large steel RPV vessel",
                ],
                [
                  "Vessel weight/cost",
                  "Many small tubes; calandria is low-pressure",
                  "Massive forged RPV (~500 t); difficult to manufacture",
                ],
                [
                  "Refueling access",
                  "Each channel accessed independently — enables on-power refueling",
                  "Core inaccessible under pressure — requires shutdown",
                ],
                [
                  "Inspection method",
                  "Each tube inspectable by remote tooling independently",
                  "Whole vessel inspected; limited access",
                ],
                [
                  "Failure mode",
                  "Individual tube failure: localized event affecting 1 channel",
                  "Vessel failure: whole-core event (extremely unlikely by design)",
                ],
                [
                  "Coolant pressure",
                  "~100 bar (D₂O coolant in tubes)",
                  "~155 bar (PWR primary circuit in vessel)",
                ],
                [
                  "Moderator",
                  "Separate, cool, low-pressure D₂O in calandria (~1 atm)",
                  "Same as coolant (H₂O under pressure)",
                ],
              ]}
              source="Source: AECL CANDU-6 Technical Summary; Knief, Nuclear Engineering, 2nd ed."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Pressure Tube Aging: Deuterium Absorption and Creep
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Zircaloy pressure tubes absorb small amounts of deuterium from the
              D₂O coolant over time, a process called{" "}
              <strong className="text-foreground">hydriding</strong> (or
              deuteriding in this case). Deuterium atoms migrate into the
              Zircaloy metal lattice; when the local concentration exceeds the
              terminal solid solubility, zirconium deuteride (ZrD₂) precipitates
              as brittle platelets. This progressively embrittles the pressure
              tube, reducing its fracture toughness.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Additionally, neutron irradiation causes{" "}
              <strong className="text-foreground">
                irradiation-induced creep and growth
              </strong>{" "}
              — the pressure tube elongates and sags slightly toward the
              calandria tube under sustained fast-neutron bombardment. If the
              gas gap is eliminated and pressure tube contacts calandria tube
              ("pressure tube contact"), a thermal excursion can occur. Routine
              surveillance programs measure tube sag and deuterium uptake.
            </p>
            <div className="rounded-md bg-amber-500/10 border border-amber-500/30 px-4 py-3">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                Pressure Tube Replacement — Major Maintenance Milestone
              </p>
              <p className="text-sm text-muted-foreground">
                All 380 pressure tubes require replacement approximately every
                25–30 years of operation. This is the major planned maintenance
                event for CANDU reactors (analogous to steam generator
                replacement in PWRs). Darlington and Bruce units are currently
                undergoing extensive refurbishment programs costing ~$12–15B CAD
                total, which include complete pressure tube replacement and are
                expected to extend plant life by 30+ years. [Canadian Nuclear
                Safety Commission (CNSC), Darlington Refurbishment, 2023]
              </p>
            </div>
          </SectionCard>
        </CollapsibleSection>

        {/* 3 — On-Power Refueling */}
        <CollapsibleSection
          id="onPowerRefueling"
          title="On-Power Refueling"
          badge="advanced"
          open={open.onPowerRefueling}
          onToggle={() => toggle("onPowerRefueling")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              The Fueling Machines
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              CANDU's most operationally distinctive feature is its ability to
              refuel continuously while the reactor operates at full power. Two
              remotely operated fueling machines — one at each end of the
              reactor face — connect to opposite ends of a selected fuel channel
              using a sealed coupling that maintains pressure integrity.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The procedure for refueling a single channel:
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground list-none mb-3">
              {[
                [
                  "1.",
                  "Both fueling machines travel on tracks to their target channel and lock onto the channel ends.",
                ],
                [
                  "2.",
                  "The channel closure plugs are removed and stored inside the machines (under pressure).",
                ],
                [
                  "3.",
                  "The downstream machine loads new fuel bundles into the channel; the upstream machine receives spent bundles as they are pushed through.",
                ],
                [
                  "4.",
                  "New fuel travels in the direction opposite to coolant flow in CANDU-6 — a bidirectional fueling scheme that balances flux and burnup.",
                ],
                [
                  "5.",
                  "Channel closures are reinstalled; machines unlock and move to the next target channel.",
                ],
              ].map(([n, d]) => (
                <li key={String(n)} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">{n}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Approximately{" "}
              <strong className="text-foreground">12–15 new bundles</strong> are
              inserted per day at full power, spread across multiple channels.
              Each channel is typically refueled as a complete batch of 8–12
              bundles at one time, about once every 18–24 months per channel.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Operating Implications: Burnup, Capacity Factor, and Fuel Economy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              On-power refueling has profound operational consequences:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "High Capacity Factor",
                  body: "PWRs and BWRs take scheduled shutdowns of 3–5 weeks every 12–18 months for batch refueling, reducing their annual capacity factor. CANDU reactors have no planned refueling outages — capacity factors can exceed 90% in well-operated plants (e.g., Darlington historically >90%).",
                },
                {
                  title: "Optimal Fuel Burnup",
                  body: "Individual bundles are removed when their reactivity drops below a target setpoint, rather than held in the core for a full cycle. This achieves near-optimal burnup without carrying less reactive fuel that would waste neutrons.",
                },
                {
                  title: "Fresh Fuel at All Times",
                  body: "There is always a gradient of fresh to near-spent bundles across each channel. This smooths flux peaking and reduces the severity of xenon oscillations that challenge PWR operators at end-of-cycle.",
                },
                {
                  title: "Low Discharge Burnup Trade-off",
                  body: "Natural uranium fuel has fewer fissile atoms per tonne than enriched fuel. Discharge burnup is only ~7–8 GWd/tHM vs. ~45–55 GWd/tHM for a PWR, meaning CANDU produces significantly more spent fuel mass per TWh. This is the key fuel cycle trade-off.",
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

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Alternative Fuel Capabilities
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              CANDU's exceptional neutron economy — a consequence of D₂O
              moderation — means it can operate on fuel types that would be
              impossible or uneconomical in a light-water reactor:
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">
                    Slightly Enriched Uranium (SEU):
                  </strong>{" "}
                  Enriching to just 0.9–1.2% U-235 (vs. natural 0.72%)
                  dramatically increases burnup and reduces spent fuel volume
                  with minimal fuel cycle cost addition. India's 700 MWe PHWRs
                  are designed for SEU.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">
                    Mixed Oxide (MOX) / Recovered Uranium:
                  </strong>{" "}
                  CANDU can burn PWR spent fuel ("DUPIC" — Direct Use of PWR
                  Spent Fuel in CANDU) because that fuel still contains ~0.9%
                  U-235 + Pu-239 — enough for criticality in CANDU's favorable
                  neutron economy.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">
                    Thorium-232 / U-233:
                  </strong>{" "}
                  India's three-stage nuclear program envisions using
                  CANDU-style PHWRs in Stage 2 to breed U-233 from Th-232
                  blankets, supplying fuel for advanced Stage 3 thorium
                  reactors. CANDU's neutron surplus makes it the preferred
                  vehicle for thorium irradiation. [IAEA TECDOC-1450; BARC
                  Annual Report]
                </div>
              </li>
            </ul>
          </SectionCard>
        </CollapsibleSection>

        {/* 4 — Safety Systems */}
        <CollapsibleSection
          id="safetySystems"
          title="Safety Systems and Accident Response"
          badge="advanced"
          open={open.safetySystems}
          onToggle={() => toggle("safetySystems")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Two Independent, Diverse Shutdown Systems
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Canadian nuclear regulations (CNSC REGDOC-2.4.1) require that
              CANDU reactors have{" "}
              <strong className="text-foreground">
                two fully independent and functionally diverse
              </strong>{" "}
              shutdown systems, each capable on its own of bringing the reactor
              to cold shutdown and maintaining it there. This is stronger than
              the U.S. NRC requirement for two diverse trip systems that
              collectively maintain shutdown.
            </p>
            <div className="space-y-4">
              {sdsSystems.map((sys) => (
                <div
                  key={sys.id}
                  className="rounded-lg border border-border bg-muted/20 p-4"
                  data-ocid={`candu.sds_${sys.id.toLowerCase()}`}
                >
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {sys.name}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {sys.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Emergency Core Cooling System (ECCS)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              CANDU's ECCS operates in three stages following a loss-of-coolant
              accident (LOCA):
            </p>
            <TableBlock
              caption="CANDU ECCS stages"
              headers={["Stage", "Source", "Function", "Timing"]}
              rows={[
                [
                  "1 — High-Pressure Injection",
                  "High-pressure water tanks (light water)",
                  "Injection into reactor headers at full coolant pressure to maintain cooling immediately after LOCA",
                  "0–30 s",
                ],
                [
                  "2 — Large-Volume Supply",
                  "Dousing tank (overhead, gravity-fed)",
                  "Large volume supply as system depressurizes; provides sustained core cooling",
                  "30 s – several minutes",
                ],
                [
                  "3 — Long-Term Recirculation",
                  "Sump recirculation pumps",
                  "Recirculates collected water through heat exchangers for indefinite decay heat removal",
                  "Minutes → hours → indefinite",
                ],
              ]}
              source="Source: AECL CANDU-6 Safety Analysis Report; CNSC INFO-0827."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              The Moderator as an Emergency Heat Sink — A Unique CANDU Feature
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Perhaps CANDU's most distinctive safety characteristic is that the
              cool, low-pressure D₂O moderator in the calandria{" "}
              <em>surrounds</em> the hot, high-pressure coolant channels. In a
              severe accident where primary coolant is lost, the moderator
              provides a large thermal mass and heat sink that can remove decay
              heat from the fuel through the calandria tubes — even if the
              primary heat transport system is unavailable.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              In a postulated severe core damage accident, fuel bundles within
              failed pressure tubes can be cooled by the surrounding moderator.
              This "grace period" gives operators substantially more time to
              restore emergency cooling compared to a PWR, where loss of coolant
              means the fuel is directly uncovered.
            </p>
            <div className="rounded-md bg-muted/30 border border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground mb-1">
                Moderator Cooling and Dump
              </p>
              <p className="text-sm text-muted-foreground">
                The moderator itself is cooled by a dedicated{" "}
                <strong className="text-foreground">
                  Moderator Heat Transport System
                </strong>{" "}
                (low-pressure, separate from primary coolant). In an extreme
                event, the moderator can be dumped into a tank below the
                calandria — draining the moderator removes the ability to
                moderate neutrons and provides an additional independent
                shutdown mechanism (though SDS1 or SDS2 would already have
                tripped the reactor). The dump tank also passively quenches any
                residual fuel heat. [AECL CANDU-6 Technical Summary; CNSC
                REGDOC-2.4.1]
              </p>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Historical Incidents and Lessons
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The NRX reactor at Chalk River (1952) — an early AECL research
              reactor and CANDU precursor — experienced a partial fuel melt due
              to a combination of operator error and control rod malfunction. No
              public health impact resulted; the reactor was repaired and
              continued operation until 1992. The event drove fundamental
              improvements to procedural controls, administrative limits, and
              the independence requirement for shutdown systems — lessons that
              were directly incorporated into CANDU design philosophy.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The NRU Chalk River incident (1958) involved a fuel rod fire
              following a failed fuel handling operation. Again, no public
              health consequence, but the event reinforced fuel handling
              procedure rigor and emergency response preparedness that have
              characterized Canadian nuclear safety culture since. [AECL
              Historical Archives; CNSC Canadian Nuclear Safety and Control Act
              Background Documents]
            </p>
          </SectionCard>
        </CollapsibleSection>

        {/* 5 — Operating Fleet and Variants */}
        <CollapsibleSection
          id="operatingFleet"
          title="CANDU Operating Fleet and Variants"
          badge="intermediate"
          open={open.operatingFleet}
          onToggle={() => toggle("operatingFleet")}
        >
          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Commercial Operating Reactors Worldwide
            </h3>
            <TableBlock
              caption="CANDU operating reactor fleet"
              headers={["Country", "Plant", "Units", "Type", "Capacity"]}
              rows={operatingFleet}
              source="Source: IAEA PRIS (Power Reactor Information System), 2024; Canadian Nuclear Association."
            />
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              India's PHWR Program — A Domestic CANDU Evolution
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              India has developed the world's largest independent CANDU-derived
              program. Following nuclear cooperation agreements with Canada and
              the construction of RAPS-1&2 (Rajasthan Atomic Power Station,
              1970s), India localized and progressively scaled up its
              Pressurized Heavy Water Reactor (PHWR) design:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">220 MWe PHWR:</strong>{" "}
                  First generation Indian design; 16 units operating at RAPS,
                  MAPS (Madras), NAPS (Narora), KAPS (Kakrapar), RAPS-3/4. Fuel:
                  natural UO₂; heavy water moderated and cooled.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">540 MWe PHWR:</strong>{" "}
                  Tarapur-3 and -4; uprated design proving indigenous
                  capability.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <div>
                  <strong className="text-foreground">
                    700 MWe PHWR (IPHWR-700):
                  </strong>{" "}
                  India's current standard design; 4 units at RAPP (Kakrapar-3/4
                  and Rajasthan-7/8) and 6 more planned. Designed for slightly
                  enriched uranium in advanced stages. This design is India's
                  Stage 1 reactor for the three-stage thorium fuel cycle.
                </div>
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              India's three-stage nuclear energy program, conceived by Dr. Homi
              Bhabha, uses PHWRs in Stage 1 to produce plutonium from natural
              uranium, fast breeder reactors in Stage 2 to breed more fuel, and
              advanced thorium reactors in Stage 3. The enormous Indian thorium
              reserves (~30% of global deposits) make this long-term path
              strategically important. [BARC; Department of Atomic Energy,
              India, Annual Report 2023]
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">
              Advanced CANDU Designs
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Enhanced CANDU-6 (EC6)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  An evolutionary upgrade of the CANDU-6 with improved fuel
                  cycle flexibility, passive safety enhancements, digital
                  instrumentation and control, and extended reactor life.
                  Designed for SEU, natural uranium, and recycled fuel. Canada
                  has licensed the EC6 as the basis for potential new Canadian
                  build. Submitted for licensing review in China and Romania.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-sm font-semibold text-foreground mb-1">
                  ACR-1000 (Advanced CANDU Reactor)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A significant departure from traditional CANDU design:{" "}
                  <em>light water</em> coolant (H₂O) rather than heavy water,
                  combined with heavy water moderator. Fuel: slightly enriched
                  uranium at ~2.1% U-235. Power: 1,080 MWe. The light water
                  coolant reduces capital cost (D₂O is expensive) while the
                  heavy water moderator preserves the favorable neutron economy.
                  A CANDU 9-type pressure tube design. The ACR-1000 passed
                  Canada's pre-licensing vendor design review (VDR Phase 2) but
                  has not entered construction; AECL's commercial division was
                  sold to SNC-Lavalin (now Candu Energy) in 2011.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Stable Salt Reactor — Wasteburner (SSR-W)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Concept under development by Moltex Energy (a Canadian SMR
                  developer): a stable salt reactor using CANDU-derived fuel
                  channels containing molten fuel salt rather than solid
                  pellets. Designed to burn actinides from CANDU spent fuel as a
                  "waste transmuter." In pre-licensing design phase with the
                  CNSC as of 2024. [CNSC Vendor Design Review; Moltex Energy
                  Technical Documentation]
                </p>
              </div>
            </div>
          </SectionCard>
        </CollapsibleSection>

        {/* ─── Safety Callout ─── */}
        <SafetyCallout title="Restricted: Detailed Engineering Specifications">
          Specific fuel channel geometry, critical assembly calculations,
          detailed control system schematics, and safety system setpoint values
          beyond publicly available CNSC and AECL documentation are not provided
          on this platform. For licensed engineering purposes, consult the
          Canadian Nuclear Safety Commission REGDOC library, AECL Technical
          Documents, and applicable vendor design control documents under
          appropriate regulatory oversight.
        </SafetyCallout>
      </div>
    </div>
  );
}
