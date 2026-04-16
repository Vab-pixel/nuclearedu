import { AudienceBadge } from "@/components/AudienceBadge";
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

export default function PowerPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="Nuclear Power Generation"
        subtitle="From controlled fission to grid electricity — how nuclear energy works, what it costs, and why it matters for the low-carbon transition."
        audienceLevel="intermediate"
        readTimeMin={28}
      />

      <div className="grid gap-6">
        {/* ── Overview (always visible) ── */}
        <SectionCard data-ocid="power.overview_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Nuclear Power: Global Role and Significance
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Nuclear energy supplies approximately{" "}
            <strong className="text-foreground">
              10% of the world's electricity
            </strong>
            . As of 2024, the IAEA's Power Reactor Information System (PRIS)
            records{" "}
            <strong className="text-foreground">413 operable reactors</strong>{" "}
            in 32 countries with a combined installed capacity of roughly{" "}
            <strong className="text-foreground">373 GWe</strong>. In 2022 these
            reactors collectively generated approximately{" "}
            <strong className="text-foreground">2,600 TWh</strong> — more than
            all renewable sources combined except hydropower (IAEA, 2023).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Nuclear's defining operational advantage over variable renewables is
            its <strong className="text-foreground">capacity factor</strong>:
            globally averaged near{" "}
            <strong className="text-foreground">90%</strong>, compared with
            approximately 35% for utility-scale solar PV and 30–40% for onshore
            wind. A 1,000 MWe nuclear plant running at 90% capacity factor
            delivers nine times more annual energy than a 1,000 MWe solar farm
            at equivalent rated capacity. This makes nuclear uniquely suited to
            serve as firm, dispatchable baseload electricity that can also
            follow load (particularly French PWRs, which ramp at 5% rated power
            per minute).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The IPCC (AR5/AR6) reports a lifecycle greenhouse-gas emission
            intensity for nuclear power of{" "}
            <strong className="text-foreground">
              12 g CO₂-equivalent per kWh
            </strong>{" "}
            — comparable to offshore wind and roughly 40× less than natural gas
            combined-cycle. France, which obtains roughly{" "}
            <strong className="text-foreground">70%</strong> of its electricity
            from nuclear, has among the lowest per-capita electricity CO₂
            intensities of any major industrialised nation (~56 g CO₂/kWh in
            2022, versus Germany's ~380 g CO₂/kWh).
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Top Nuclear Countries by Electricity Share (2023–2024)
          </h3>
          <DataTable
            headers={[
              "Country",
              "Nuclear Share (%)",
              "Net Capacity (GWe)",
              "Operating Reactors",
              "Notes",
            ]}
            rows={[
              ["France", "~70%", "61 GWe", "56", "Highest share; all PWR"],
              ["Slovakia", "~60%", "2.3 GWe", "4", "All VVER-440/213"],
              [
                "Ukraine",
                "~55%",
                "13.8 GWe",
                "15",
                "All VVER; wartime operations",
              ],
              ["Belgium", "~50%", "5.9 GWe", "7", "Extending life to 2035+"],
              ["South Korea", "~30%", "24.7 GWe", "25", "APR-1400 new builds"],
              [
                "Russia",
                "~20%",
                "28.4 GWe",
                "37",
                "VVER fleet + fast reactor BN-800",
              ],
              [
                "United States",
                "~18–19%",
                "97.4 GWe",
                "93",
                "Largest fleet by capacity",
              ],
              ["Canada", "~15%", "14.2 GWe", "19", "CANDU PHWR fleet"],
              ["United Kingdom", "~13%", "6.9 GWe", "9", "AGR fleet retiring"],
              [
                "China",
                "~5%",
                "55.6 GWe",
                "55+",
                "Largest pipeline under construction",
              ],
            ]}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Sources: IAEA PRIS 2024; IEA World Energy Statistics 2023. Share of
            electricity is approximate and varies year to year with capacity
            factor. China has ~22 reactors under construction as of 2024 — more
            than any other country.
          </p>
        </SectionCard>

        {/* ── Section 1: How Plants Generate Electricity ── */}
        <CollapsibleSection
          title="How Nuclear Plants Generate Electricity"
          badge="intermediate"
          ocid="power.generation"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every nuclear power plant is fundamentally a steam engine. Heat from
            controlled fission converts water into high-pressure steam, which
            spins a turbine coupled to an electrical generator. The
            thermodynamic cycle used in commercial plants is the{" "}
            <strong className="text-foreground">Rankine cycle</strong>,
            operating between the reactor as heat source and the condenser
            (river, ocean, or cooling tower) as heat sink.
          </p>

          <h3 className="font-semibold text-foreground mb-3">
            Rankine Cycle — Step by Step
          </h3>
          <ol className="space-y-3 mb-5 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              <strong className="text-foreground">
                Heat source — reactor core:
              </strong>{" "}
              Fission in UO₂ fuel rods heats the primary coolant to ~315°C at
              ~155 bar (PWR) or produces steam directly at ~288°C / 7 MPa (BWR).
              The fuel pellets reach centerline temperatures of 1,200–1,400°C in
              normal operation; peak temperatures up to ~1,800°C during
              design-basis transients.
            </li>
            <li>
              <strong className="text-foreground">
                Steam generation (PWR only):
              </strong>{" "}
              Pressurised primary coolant circulates through the steam generator
              — a large shell-and-tube heat exchanger housing 3,000–16,000
              thin-walled Inconel tubes. Heat transfers to a separate secondary
              water loop, which boils. The two-loop design ensures radioactive
              primary coolant never contacts the turbine or the environment
              during normal operation.
            </li>
            <li>
              <strong className="text-foreground">Turbine / generator:</strong>{" "}
              High-enthalpy steam expands through high-pressure (HP) turbine
              stages, is reheated (in some designs), then passes through
              low-pressure (LP) turbine stages, driving the rotor. A standard
              1,000 MWe plant turbine shaft rotates at 1,500 rpm (50 Hz grids)
              or 1,800 rpm (60 Hz), coupled to the synchronous generator.
            </li>
            <li>
              <strong className="text-foreground">Condenser:</strong> Exhaust
              steam at ~30–50°C / 0.005–0.012 MPa is condensed to liquid by
              cooling water drawn from a river, lake, sea, or circulated through
              cooling towers. The condenser is where waste heat is rejected to
              the environment.
            </li>
            <li>
              <strong className="text-foreground">Feedwater pump:</strong>{" "}
              Condenser condensate is pressurised by the main feedwater pump
              (consuming ~2–3% of gross output) and returned to the steam
              generator, completing the cycle.
            </li>
          </ol>

          <h3 className="font-semibold text-foreground mb-2">
            Thermal Efficiency and the Carnot Limit
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Carnot theorem sets the absolute maximum efficiency for any heat
            engine operating between two temperatures. A typical PWR with T_hot
            ≈ 330°C (603 K) and T_cold ≈ 30°C (303 K) has a Carnot limit of
            ~50%. Real gross thermal efficiencies are lower — ~33% for a
            standard PWR, ~34% for a BWR, up to ~36–38% for the European
            Pressurised Reactor (EPR) — due to:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>
              Steam quality limitations (moisture carryover to LP turbines)
            </li>
            <li>Irreversibilities in feedwater heating, pumping, and piping</li>
            <li>
              Auxiliary power consumption (~3–5% of gross electrical output)
            </li>
            <li>Heat losses from reactor vessel, piping, and buildings</li>
          </ul>

          <EquationBlock
            latex="\eta_C = 1 - \frac{T_{\text{cold}}}{T_{\text{hot}}} = 1 - \frac{303\,\text{K}}{603\,\text{K}} \approx 0.50 \quad (50\%)"
            annotation="Carnot upper-bound efficiency for a typical PWR. Real gross thermal efficiency is 33–36% — the gap from Carnot (14–17 percentage points) is lost to irreversibilities. High-temperature gas-cooled reactors (HTGRs) at T_hot ≈ 950°C achieve η ≈ 45%, approaching the efficiency of modern combined-cycle gas turbines."
            label="Carnot Efficiency — PWR Upper Bound"
          />

          <EquationBlock
            latex="P_{\text{thermal}} = P_{\text{electrical}} + Q_{\text{waste}} \quad \Rightarrow \quad 3{,}000\,\text{MWth} \approx 1{,}000\,\text{MWe} + 2{,}000\,\text{MWth}"
            annotation="Power balance for a typical 1,000 MWe nuclear unit at 33% thermal efficiency. Two-thirds of the reactor's thermal output (~2,000 MWth) must be rejected to the environment via the condenser — this waste heat appears as warm discharge water or visible water-vapour plumes from cooling towers. It represents no radioactive release, only low-grade heat."
            label="Nuclear Plant Power Balance (1,000 MWe unit)"
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Cooling System Options
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            After the turbine, steam must be condensed. This requires rejecting
            ~65% of reactor thermal output to a heat sink. Sites and regulations
            determine which method is used:
          </p>
          <DataTable
            headers={[
              "Cooling Method",
              "Heat Sink",
              "Water Consumption",
              "Efficiency Impact",
              "Usage",
            ]}
            rows={[
              [
                "Once-through (open cycle)",
                "River, lake, or ocean",
                "Very low (returned at +5–10°C)",
                "Minimal",
                "Coastal and large-river sites; many older plants",
              ],
              [
                "Wet mechanical-draft cooling towers",
                "Atmosphere via evaporation",
                "High (~2,500 L/MWh evaporated)",
                "Slight (higher condenser T)",
                "Majority of inland plants",
              ],
              [
                "Natural-draft cooling towers",
                "Atmosphere via convection",
                "Similar to mechanical-draft",
                "Slight",
                "Large plants; visible tall hyperboloid towers",
              ],
              [
                "Dry cooling",
                "Atmosphere via air convection only",
                "Near zero",
                "−5 to −7% efficiency",
                "Water-scarce regions; small modular designs",
              ],
              [
                "Combined wet/dry hybrid",
                "Atmosphere",
                "Reduced vs. full wet",
                "Minor",
                "Water-stressed areas requiring compromise",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Load-Following Capability
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A widely held misconception is that nuclear plants must operate at
            constant full power. France's operational experience demonstrates
            otherwise:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>
              French 900 MWe PWUs can ramp from{" "}
              <strong className="text-foreground">
                100% to 20% rated power at 5% per minute
              </strong>{" "}
              for load-following during night/weekend low-demand periods.
            </li>
            <li>
              EPR (Generation III+) design specifications include a 30-minute
              ramp from 25% to 100% power and back, meeting 1-in-20-year extreme
              scenarios without fuel damage.
            </li>
            <li>
              Constraint: xenon-135 buildup after rapid power reduction creates
              a transient reactivity penalty lasting 6–10 hours (the "xenon
              pit") — operators must account for this when scheduling restarts.
            </li>
            <li>
              US fleet historically maintains near-constant full power
              (maximising revenues under regulated or capacity-market pricing),
              but this is an economic choice, not a physical constraint.
            </li>
          </ul>
          <DataTable
            headers={[
              "Reactor Type",
              "Typical Capacity Factor",
              "Ramp Rate",
              "Load-Following Ability",
            ]}
            rows={[
              [
                "PWR (US fleet)",
                "~93%",
                "5% per min (French 900 MWe)",
                "Good; France demonstrates daily cycling",
              ],
              [
                "BWR (US fleet)",
                "~90%",
                "3–5% per min",
                "Moderate; mechanical control rod complexity",
              ],
              [
                "CANDU (PHWR)",
                "~80–85%",
                "2–3% per min",
                "Good; online refuelling enables smooth operation",
              ],
              [
                "RBMK (Russia)",
                "~70–80%",
                "<2% per min",
                "Poor at low power; graphite moderator instability",
              ],
              [
                "EPR (Gen III+)",
                "~92%",
                "5% per min (design)",
                "Excellent; designed for 25–100% daily cycling",
              ],
              [
                "AP1000 (Gen III+)",
                "~93%",
                "5% per min",
                "Good; passive safety systems enable flexibility",
              ],
            ]}
          />
        </CollapsibleSection>

        {/* ── Section 2: Economics ── */}
        <CollapsibleSection
          title="Economics: LCOE, Capital Costs, and Competitiveness"
          badge="intermediate"
          ocid="power.economics"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nuclear power economics are dominated by its unusual cost structure:
            extremely high upfront capital investment, but very low and stable
            fuel and operating costs over a 40–80 year plant lifetime. This
            contrasts sharply with gas plants (low capital, high and volatile
            fuel costs). Understanding nuclear economics requires distinguishing
            between new build LCOE, existing fleet economics, and the distinct
            economics of small modular reactors (SMRs).
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Levelized Cost of Energy (LCOE) — Methodology
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            LCOE is the net present value of all lifetime costs (capital, fuel,
            O&M, decommissioning) divided by total lifetime energy production —
            the minimum wholesale price needed to recover investment over the
            plant's life at a given discount rate. Nuclear LCOE is highly
            sensitive to the{" "}
            <strong className="text-foreground">discount rate</strong>: at 3%,
            nuclear is highly competitive; at 10%, high upfront capital costs
            are heavily penalised. IEA/NEA reference calculations use 7%
            discount rate.
          </p>
          <EquationBlock
            latex="\text{LCOE} = \frac{\sum_{t=0}^{T} \frac{C_t}{(1+r)^t}}{\sum_{t=0}^{T} \frac{E_t}{(1+r)^t}}"
            annotation="C_t = total costs in year t (capital, fuel, O&M, decommissioning); E_t = energy generated in year t (MWh); r = discount rate; T = plant lifetime (years). Nuclear's high C_0 (overnight capital cost, incurred before any energy is generated) means LCOE is very sensitive to r. At r = 3%, nuclear LCOE ≈ $50–70/MWh; at r = 10%, LCOE ≈ $90–150/MWh (IEA/NEA 2020)."
            label="Levelized Cost of Energy (LCOE)"
          />

          <h3 className="font-semibold text-foreground mt-4 mb-2">
            LCOE Comparison (IEA/NEA 2020, 7% Discount Rate)
          </h3>
          <DataTable
            headers={[
              "Technology",
              "LCOE (USD/MWh)",
              "Capacity Factor",
              "Fuel Cost Share",
              "Notes",
            ]}
            rows={[
              [
                "Nuclear (new build, OECD avg)",
                "$65–$110",
                "~90%",
                "~5–7%",
                "Heavily capital-dependent",
              ],
              [
                "Nuclear (existing US fleet)",
                "$20–$35",
                "~93%",
                "~20%",
                "Capital amortised; cheapest source",
              ],
              [
                "Offshore wind",
                "$70–$150",
                "~40–45%",
                "0%",
                "High marine installation costs",
              ],
              [
                "Onshore wind",
                "$35–$80",
                "~30–40%",
                "0%",
                "Highly location-dependent",
              ],
              [
                "Utility solar PV",
                "$25–$60",
                "~20–30%",
                "0%",
                "Low cost but needs storage for firm power",
              ],
              [
                "Gas CCGT (with CO₂ at $50/t)",
                "$55–$110",
                "~85%",
                "~40–60%",
                "Highly sensitive to gas price volatility",
              ],
              [
                "Gas CCGT + CCS",
                "$80–$130",
                "~80%",
                "~35%",
                "CCS adds capital; reduces CO₂ by ~90%",
              ],
              [
                "Coal (with CO₂ at $50/t)",
                "$100–$170",
                "~75%",
                "~25%",
                "Carbon cost makes coal increasingly uncompetitive",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Source: IEA/NEA Projected Costs of Generating Electricity 2020,
            Table 3.1. System integration costs (grid balancing, storage) not
            included, which would increase effective costs for variable
            renewables and decrease nuclear's relative disadvantage.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Capital Cost Escalation in Western Markets
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The primary economic challenge for new nuclear in the US and EU has
            been massive capital cost overruns on recent projects:
          </p>
          <DataTable
            headers={[
              "Project",
              "Country",
              "Type",
              "Budget (Announced)",
              "Final / Projected Cost",
              "Schedule Delay",
              "Capital Cost ($/kWe)",
            ]}
            rows={[
              [
                "Vogtle 3 & 4",
                "USA",
                "AP1000 (2×1,117 MWe)",
                "$14 billion (2009)",
                "~$35 billion (2023)",
                "7 years",
                "~$15,700/kWe",
              ],
              [
                "Hinkley Point C",
                "UK",
                "EPR (2×1,630 MWe)",
                "£18 billion (2016)",
                "£46+ billion (est. 2024)",
                "10+ years",
                "~$17,000+/kWe",
              ],
              [
                "Flamanville 3",
                "France",
                "EPR (1,630 MWe)",
                "€3.3 billion (2007)",
                "~€13.7 billion (2024)",
                "12 years",
                "~$10,000/kWe",
              ],
              [
                "Barakah 1–4",
                "UAE",
                "APR-1400 (4×1,400 MWe)",
                "$20 billion (2009)",
                "~$24.4 billion (2023)",
                "5–7 years",
                "~$4,400/kWe",
              ],
              [
                "Vogtle 1 & 2 (1970s)",
                "USA",
                "PWR",
                "$660M (1972)",
                "~$9.2B (1989)",
                "12 years",
                "Historical benchmark",
              ],
            ]}
          />
          <p className="text-muted-foreground leading-relaxed mt-3 mb-3">
            Contrast with East Asian experience: South Korea's APR-1400 units
            and China's Hualong One builds have achieved{" "}
            <strong className="text-foreground">$3,000–$5,500/kWe</strong> in
            recent domestic construction — two to five times cheaper per
            installed kilowatt. Contributing factors:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>
              <strong className="text-foreground">Serial construction:</strong>{" "}
              Korea has built 25+ APR/OPR units; China 50+ units — learning
              curve effects are steep (each additional unit 5–15% cheaper)
            </li>
            <li>
              <strong className="text-foreground">
                Pre-licensed standardised designs:
              </strong>{" "}
              No redesign between units; same contractor, same workforce
            </li>
            <li>
              <strong className="text-foreground">Supply chain depth:</strong>{" "}
              Domestic heavy forgings (reactor pressure vessel heads, steam
              generators) — the US lost this capability after decades without
              orders
            </li>
            <li>
              <strong className="text-foreground">
                Regulatory continuity:
              </strong>{" "}
              Stable licensing frameworks; fewer mid-construction regulatory
              changes
            </li>
          </ul>

          <h3 className="font-semibold text-foreground mb-2">
            Small Modular Reactors (SMRs) — Economic Rationale
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            SMRs (typically &lt;300 MWe, with many designs at 50–100 MWe) aim to
            restore nuclear competitiveness through a fundamentally different
            approach: factory fabrication of reactor modules shipped to site and
            assembled like modular construction. The economic thesis rests on:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>
              <strong className="text-foreground">
                Learning and series production:
              </strong>{" "}
              NuScale's 77 MWe iPWR module; Rolls-Royce 470 MWe SMR targeting
              factory production in Wales. Target: $5,000–$8,000/kWe FOAK
              falling to $3,500–$5,000/kWe by 10th unit.
            </li>
            <li>
              <strong className="text-foreground">
                Reduced financial risk:
              </strong>{" "}
              Smaller upfront outlay (~$0.5–$2B per module vs. $10–$35B for
              large plant); shorter construction time (3–4 years vs. 10–15)
            </li>
            <li>
              <strong className="text-foreground">Siting flexibility:</strong>{" "}
              Small footprint and passive safety systems allow siting near load
              centres, remote communities, industrial heat users, and hydrogen
              production facilities
            </li>
            <li>
              <strong className="text-foreground">Grid integration:</strong>{" "}
              Smaller unit size matches grid scale of developing nations and
              island grids
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">
            As of 2024, NuScale (USA), Rolls-Royce (UK), GE-Hitachi BWRX-300,
            Kairos Power (USA), and Terrestrial Energy (Canada/USA) are among
            the leading SMR designs in advanced licensing. First commercial SMR
            operations are targeted for the 2030–2035 timeframe.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For the <strong className="text-foreground">existing fleet</strong>,
            the economics are already compelling: once capital is amortised, US
            nuclear plants operate at $20–$35/MWh total cost (fuel ~$5–7/MWh;
            O&M ~$15–25/MWh) — among the lowest of any electricity source.
            License extensions to 60 years (and now 80 years for some US plants)
            unlock decades of further ultra-low-cost, zero-carbon generation
            from already-built assets.
          </p>
        </CollapsibleSection>

        {/* ── Section 3: Carbon Footprint and Climate Role ── */}
        <CollapsibleSection
          title="Carbon Footprint and the Climate Role of Nuclear Power"
          badge="intermediate"
          ocid="power.climate"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            The climate case for nuclear energy rests on its{" "}
            <strong className="text-foreground">
              lifecycle emissions intensity
            </strong>
            . Unlike coal or gas, nuclear power's CO₂ footprint does not arise
            from the energy conversion step — fission releases no combustion
            gases. Emissions arise from ancillary activities: uranium mining,
            milling, enrichment (energy-intensive), plant construction (steel
            and concrete production), and decommissioning. Enrichment accounts
            for roughly 50–60% of nuclear's lifecycle emissions, which is why
            centrifuge enrichment (replacing gaseous diffusion) significantly
            reduced nuclear's footprint.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Lifecycle Greenhouse Gas Emissions (IPCC AR5, 2014)
          </h3>
          <DataTable
            headers={[
              "Electricity Source",
              "Median GHG (g CO₂eq/kWh)",
              "Range (g CO₂eq/kWh)",
              "Primary Source of Emissions",
            ]}
            rows={[
              ["Wind (onshore)", "11", "7–56", "Manufacturing, installation"],
              [
                "Nuclear",
                "12",
                "4–110",
                "Enrichment, construction (~80% of lifecycle)",
              ],
              [
                "Wind (offshore)",
                "12",
                "8–35",
                "Marine installation, manufacturing",
              ],
              [
                "Hydropower",
                "24",
                "4–306",
                "Reservoir methane (tropical reservoirs highest)",
              ],
              [
                "Concentrated Solar (CSP)",
                "27",
                "9–63",
                "Steel/mirror manufacturing",
              ],
              [
                "Solar PV (utility)",
                "45",
                "20–217",
                "Silicon purification, panel manufacturing",
              ],
              [
                "Natural gas CCGT",
                "490",
                "410–650",
                "Combustion (90%) + upstream methane leaks",
              ],
              [
                "Coal (pulverised)",
                "820",
                "740–910",
                "Combustion (dominant); mining methane",
              ],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Source: IPCC Working Group III, AR5 (2014), Table A.III.2. Lifecycle
            analysis from cradle to grid delivery. Nuclear's high end of range
            (110 g) reflects older studies using gaseous diffusion enrichment;
            modern centrifuge enrichment yields median values of 4–15 g
            CO₂eq/kWh.
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Avoided CO₂ Emissions from the Current Fleet
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The 2,600 TWh generated by nuclear worldwide in 2022 avoided
            approximately{" "}
            <strong className="text-foreground">
              ~2 billion tonnes of CO₂
            </strong>{" "}
            compared to coal-equivalent generation — roughly 6% of total global
            energy sector emissions in one year. The IAEA estimates nuclear
            power has cumulatively avoided{" "}
            <strong className="text-foreground">
              &gt;70 billion tonnes of CO₂
            </strong>{" "}
            since 1970 (IAEA, 2023 Climate Report). This is larger than the
            total annual emissions of the US and EU combined, repeated every ~4
            years.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            IEA Net Zero Scenarios — Nuclear's Required Role
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The IEA Net Zero Emissions by 2050 (NZE2050) scenario — the world's
            most widely cited 1.5°C pathway — requires:
          </p>
          <DataTable
            headers={[
              "Scenario",
              "2022 Nuclear Capacity",
              "2030 Target",
              "2050 Target",
              "Required Growth Rate",
            ]}
            rows={[
              [
                "IEA NZE2050",
                "~413 GWe",
                "~520 GWe",
                "~1,200 GWe (~3× current)",
                "+20 GWe/yr new build",
              ],
              [
                "IEA Sustainable Development",
                "~413 GWe",
                "~490 GWe",
                "~800 GWe",
                "+10–15 GWe/yr",
              ],
              [
                "IPCC median scenarios (2°C)",
                "~413 GWe",
                "~450 GWe",
                "~900 GWe",
                "+12–18 GWe/yr",
              ],
              [
                "Historical peak build rate",
                "—",
                "—",
                "—",
                "~30 GWe/yr (1984–1986)",
              ],
            ]}
          />
          <p className="text-sm text-muted-foreground mt-3 mb-3">
            The 2023 COP28 pledge to "triple nuclear capacity by 2050" was
            signed by 22 nations including the US, France, Japan, South Korea,
            Canada, and UK — signaling growing political consensus.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Land Use: Nuclear's Compact Footprint
          </h3>
          <DataTable
            headers={["Energy Source", "Land Use (km² per TWh/yr)", "Includes"]}
            rows={[
              [
                "Nuclear",
                "0.3–3",
                "Plant + exclusion zone; fuel mining elsewhere",
              ],
              [
                "Natural gas",
                "0.4–1.0",
                "Plant only; excludes pipeline/extraction",
              ],
              [
                "Hydropower (reservoir)",
                "30–750",
                "Reservoir flooding; strongly site-dependent",
              ],
              [
                "Solar PV (utility)",
                "40–60",
                "Panel arrays + access roads + borders",
              ],
              [
                "Wind (onshore)",
                "70–150",
                "Including spacing between turbines (land often dual-use)",
              ],
              [
                "Wind (offshore)",
                "N/A",
                "Does not compete with land use but affects marine ecosystems",
              ],
            ]}
          />
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            Note: wind turbine land is often dual-use (grazing, agriculture),
            partially offsetting the land impact. Nuclear's small physical
            footprint is particularly important for densely populated or
            biodiversity-rich regions.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Phase-Out Effects: Germany as a Natural Experiment
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Germany's nuclear phase-out (Energiewende) provides an empirical
            dataset on the consequences of replacing nuclear with fossil fuels.
            After Fukushima (2011), Germany accelerated reactor closures,
            retiring 17 GWe of zero-carbon baseload between 2011 and 2023. The
            resulting electricity generation gap was filled primarily by coal
            and gas:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li>
              CO₂ emissions from electricity sector increased by approximately{" "}
              <strong className="text-foreground">36 million tonnes/yr</strong>{" "}
              (DIW Berlin study, Jarvis et al. 2022, <em>Nature Energy</em>)
            </li>
            <li>
              Approximately{" "}
              <strong className="text-foreground">
                1,100 additional deaths/yr
              </strong>{" "}
              attributable to increased air pollution from fossil fuel
              substitution (PM2.5, NOₓ; Jarvis et al.)
            </li>
            <li>
              Economic cost estimated at ~$12 billion/year (pollution, carbon
              costs, grid stabilisation)
            </li>
            <li>
              German electricity CO₂ intensity in 2022: ~380 g/kWh vs France's
              ~56 g/kWh — despite comparable industrialisation
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Conversely, the US, France, South Korea, and Finland maintaining or
            expanding nuclear have among the lowest grid carbon intensities of
            any industrialised nations. Finland's Olkiluoto-3 EPR (commissioned
            2023, 1,600 MWe) is expected to reduce Finnish electricity sector
            emissions by ~2.5 million tonnes CO₂/yr.
          </p>
        </CollapsibleSection>

        {/* ── Section 4: Uranium Resources and Fuel Cycle ── */}
        <CollapsibleSection
          title="Uranium Resources and the Nuclear Fuel Cycle"
          badge="intermediate"
          ocid="power.fuel_cycle"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            The nuclear fuel cycle encompasses every step from uranium ore in
            the ground to the final disposition of high-level waste. Unlike
            fossil fuel supply chains, the uranium fuel cycle is characterised
            by very small volumes of material at each stage — a 1,000 MWe plant
            consumes roughly 25–30 tonnes of enriched uranium per year, compared
            to roughly 2.5 million tonnes of coal for an equivalent coal plant.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Global Uranium Resources
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The NEA/IAEA Uranium Resources, Production and Demand ("Red Book,"
            2022 edition) identifies{" "}
            <strong className="text-foreground">
              ~8.07 million tonnes uranium (tU)
            </strong>{" "}
            in identified conventional resources recoverable at under $130/kgU.
            At current consumption of ~67,000 tU/year, this represents roughly
            120 years of supply at current demand. With reasonable uranium price
            increases and improvements in extraction technology, this expands to
            several centuries.
          </p>
          <DataTable
            headers={[
              "Resource Type",
              "Estimated Quantity",
              "Cost Basis",
              "Notes",
            ]}
            rows={[
              [
                "Identified conventional resources",
                "~8.07 million tU",
                "&lt;$130/kgU",
                "NEA Red Book 2022; includes reasonably assured + inferred",
              ],
              [
                "Undiscovered conventional",
                "~10 million tU",
                "Geological estimate",
                "Prognostic + speculative resources",
              ],
              [
                "Unconventional (phosphates)",
                "~22 million tU",
                "Currently uneconomic",
                "~100–200 ppm U in phosphate rock; co-product recovery feasible",
              ],
              [
                "Dissolved in seawater",
                "~4.5 billion tU",
                "Currently uneconomic (~$200–600/kgU experimental)",
                "3.3 ppb concentration; ~10,000× ocean volume × concentration; extraction prototypes demonstrated by ORNL and Japanese institutions",
              ],
              [
                "Thorium (fissile equivalent via U-233)",
                "~6.4 million tTh",
                "Various",
                "Th-232 → U-233 in fertile-to-fissile breeding; ~3× more common than uranium",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Major Uranium Producing Countries (2022)
          </h3>
          <DataTable
            headers={[
              "Country",
              "Production (tU)",
              "Share (%)",
              "Primary Mining Method",
            ]}
            rows={[
              [
                "Kazakhstan",
                "21,227",
                "~43%",
                "In-situ leaching (ISL) — ~100% of production",
              ],
              [
                "Canada",
                "7,351",
                "~15%",
                "Underground (Cigar Lake, McArthur River) — world's highest-grade ore",
              ],
              ["Namibia", "5,613", "~11%", "Open pit (Rössing, Husab)"],
              [
                "Australia",
                "4,553",
                "~9%",
                "Open pit (Olympic Dam, Four Mile)",
              ],
              ["Uzbekistan", "3,300", "~7%", "ISL"],
              ["Russia", "2,635", "~5%", "Open pit + underground"],
              ["Niger", "2,020", "~4%", "Open pit (Arlit)"],
              ["China", "1,700", "~3%", "Multiple methods"],
              ["World Total", "~49,355 tU", "100%", "ISL ~55% globally (2022)"],
            ]}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Source: World Nuclear Association, Uranium Supply 2023; NEA Red Book
            2022. Production significantly below reactor requirements (~67,000
            tU/yr); gap filled by secondary supplies (enrichment tails, recycled
            uranium, MOX fuel, military stockpile drawdowns).
          </p>

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Enrichment: From Natural Uranium to Reactor Fuel
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Natural uranium contains 0.7204% U-235 (fissile), 99.274% U-238
            (fertile), and trace U-234. Light water reactors (LWRs) require
            enrichment to 3–5% U-235 to sustain a chain reaction in ordinary
            (non-moderating) water. The enrichment process uses gas centrifuge
            technology: UF₆ is fed into cascades of thousands of centrifuges
            where the slight mass difference between ²³⁵UF₆ and ²³⁸UF₆ allows
            isotopic separation.
          </p>

          <EquationBlock
            latex="\text{SWU} = P \cdot V(x_p) + W \cdot V(x_w) - F \cdot V(x_f)"
            annotation="SWU (Separative Work Unit) quantifies the enrichment effort. V(x) = (2x−1) ln[x/(1−x)] is the value function; F = feed mass; P = product mass; W = waste (tails) mass; x_f = 0.00720 (natural U); x_p = desired enrichment (e.g. 0.044 for 4.4%); x_w = 0.003 (tails assay). Producing 1 kg of 4.4% enriched uranium from natural feed requires ~8.5 SWU. A 1,000 MWe PWR requires ~100,000 SWU/year. The centrifuge process uses ~50 kWh/SWU vs. ~2,500 kWh/SWU for obsolete gaseous diffusion."
            label="Separative Work Unit (SWU) — Enrichment Measure"
          />

          <h3 className="font-semibold text-foreground mt-4 mb-2">
            Complete Fuel Cycle Steps
          </h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-3 mb-5">
            <li>
              <strong className="text-foreground">Mining:</strong> Open-pit
              (Olympic Dam, Australia), underground (Cigar Lake, Canada, ~15%
              U₃O₈ ore grade — highest in world), or in-situ leaching (ISL, ~55%
              of global supply; Kazakhstan dominant). ISL dissolves uranium in
              place with acidic or alkaline solutions pumped underground —
              minimal surface disturbance.
            </li>
            <li>
              <strong className="text-foreground">Milling:</strong> Ore crushed,
              leached with acid or alkali; uranium precipitated as uranium oxide
              ("yellowcake," U₃O₈, ~80% U by weight). Radiological
              characterisation: yellowcake is only mildly radioactive (mainly
              U-238 + daughters), handled safely with standard dust control.
            </li>
            <li>
              <strong className="text-foreground">Conversion:</strong> U₃O₈ →
              UO₂ (for natural uranium reactors) or → UF₆ (for enrichment). UF₆
              is solid at room temperature (sublimes at 56°C); corrosive;
              transported in steel cylinders.
            </li>
            <li>
              <strong className="text-foreground">Enrichment:</strong> UF₆
              enriched from 0.72% to 3–5% U-235. Depleted uranium (DU) tails
              (~0.2–0.3% U-235) stored as UF₆, or converted to DUO₂/DUF₄ for
              potential future use in fast reactors or HALEU fuel cycles. Major
              enrichers: Urenco (EU/UK/USA), TENEX (Russia), CNNC (China), Orano
              (France), USEC/Centrus (USA).
            </li>
            <li>
              <strong className="text-foreground">Fuel Fabrication:</strong>{" "}
              Enriched UF₆ → UO₂ powder → sintered ceramic pellets (~8–10 mm
              diameter, ~10 mm tall; density ~95% theoretical). Pellets loaded
              into zircaloy-4 or M5 cladding tubes (~9.5 mm OD, 4 m long; wall
              ~0.57 mm). 264 rods per PWR assembly; assemblies 17×17 pin
              lattice. A 1,000 MWe PWR holds ~193 assemblies, replaced 1/3 at a
              time annually.
            </li>
            <li>
              <strong className="text-foreground">
                Irradiation in Reactor:
              </strong>{" "}
              Fuel operates in-core for 3–4 fuel cycles (total residence ~4
              years for 1/3-batch replacement). Burnup: 45,000–60,000 MWd/tU for
              standard LWR; modern high-burnup designs reaching 70,000–80,000
              MWd/tU. During irradiation, U-238 captures neutrons to produce
              Pu-239, and many fission products accumulate in the pellets. The
              ceramic pellet's crystal structure contains most fission gases at
              normal operating temperatures.
            </li>
            <li>
              <strong className="text-foreground">Spent Fuel Storage:</strong>{" "}
              Fresh spent fuel generates ~1–2 MW of decay heat (from fission
              product decay) and emits intense gamma radiation. Water-filled
              pools at the reactor site provide cooling and shielding for
              minimum 3 years; typically 10+ years before transfer to dry cask
              storage. 7 metres of water above the fuel provides sufficient
              shielding for plant personnel. US dry cask design (NUHOMS, Holtec
              HI-STORM): inert argon-filled steel canister in reinforced
              concrete overpack; rated for 60+ years passive storage without
              power.
            </li>
            <li>
              <strong className="text-foreground">
                Reprocessing (closed cycle):
              </strong>{" "}
              PUREX process (France, Russia, Japan, UK historically): spent fuel
              dissolved in HNO₃; uranium, plutonium extracted separately via TBP
              solvent; fission products remain in aqueous raffinate for
              vitrification. ~96% of mass becomes recyclable uranium; ~1% Pu
              (used in MOX fuel: 8–10% PuO₂ + UO₂); ~3% HLW fission products.
            </li>
            <li>
              <strong className="text-foreground">
                Final Disposal (open cycle HLW):
              </strong>{" "}
              High-level waste (fission products + minor actinides, whether
              spent fuel directly or vitrified reprocessing raffinate)
              ultimately requires deep geological repository (DGR). Finland's
              Onkalo repository (450 m depth in Precambrian granite; POSIVA,
              operational target ~2025) is the world's first licensed HLW
              repository. Sweden (Forsmark), France (Bure Callovo-Oxfordian
              clay), and the US (yucca Mountain — currently stalled) are in
              advanced stages of site characterisation or licensing.
            </li>
          </ol>

          <h3 className="font-semibold text-foreground mb-2">
            Open vs. Closed Fuel Cycle
          </h3>
          <DataTable
            headers={[
              "Parameter",
              "Once-Through (Open)",
              "Reprocessing (Closed)",
            ]}
            rows={[
              [
                "Used by",
                "USA, Canada, Sweden, Finland, most of EU",
                "France, Russia, Japan (partial); China (planned)",
              ],
              [
                "HLW volume",
                "Higher: all spent fuel classified as HLW",
                "Lower: ~5× reduction in HLW volume; but separated Pu in inventory",
              ],
              [
                "Uranium utilisation",
                "~0.6% of mined uranium (only U-235 fissioned)",
                "~0.8–1.0% (U-235 + Pu-239 from MOX) — marginal improvement",
              ],
              [
                "With fast reactors",
                "Not applicable",
                "60–80% of mined uranium (breed and burn U-238 → Pu-239)",
              ],
              [
                "Proliferation concern",
                "Lower (Pu remains in spent fuel matrix)",
                "Higher (separated Pu in commerce); IAEA-safeguarded",
              ],
              [
                "Current economics",
                "Currently cheaper in most markets",
                "Reprocessing adds ~$1,000–2,000/kgHM cost; only competitive at high U prices",
              ],
            ]}
          />
        </CollapsibleSection>

        {/* ── Section 5: Decommissioning ── */}
        <CollapsibleSection
          title="Decommissioning Nuclear Power Plants"
          badge="intermediate"
          ocid="power.decommissioning"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every nuclear power plant must eventually be permanently shut down
            and decommissioned — a planned process of safely removing or
            containing all radioactive materials so the site can be released for
            unrestricted or restricted use. The radioactivity in a
            decommissioned plant comes primarily from{" "}
            <strong className="text-foreground">
              neutron activation of structural materials
            </strong>
            : steel, concrete, and components that were irradiated by neutrons
            from the reactor core over decades of operation. The principal
            activation products are Co-60 (T½ = 5.27 yr), Fe-55 (T½ = 2.73 yr),
            Ni-63 (T½ = 100 yr), and in concrete: C-14 (T½ = 5,730 yr) and Cl-36
            (T½ = 301,000 yr) — the latter from trace chlorine in concrete
            aggregate.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Plant Lifetime and Life Extension
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Commercial nuclear plants were originally designed for 40-year
            operating lives; this was a regulatory and financial convention, not
            a physical limit. Most US plants have received 20-year license
            extensions to 60 years, and the NRC is now granting second license
            renewals (SLR) to 80 years for plants that demonstrate continued
            safe operation. As of 2024:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>
              <strong className="text-foreground">US fleet:</strong> 6 plants
              with SLR approval for 80-year operation; 14 more under review.
              Surry 1 & 2 (VA), North Anna 1 & 2 (VA), Peach Bottom 2 & 3 (PA),
              Turkey Point 3 & 4 (FL) are among those approved or pursuing
              80-year licences.
            </li>
            <li>
              <strong className="text-foreground">EU:</strong> Belgium extended
              Doel 4 and Tihange 3 to 2035 (from 2025) — 10-year life extension
              secured by $1.7B investment in safety upgrades.
            </li>
            <li>
              <strong className="text-foreground">France:</strong> EDF's Grand
              Carénage programme: ~€50B investment to extend the full 56-reactor
              fleet to 50–60 years.
            </li>
            <li>
              Key aging management issues: embrittlement of the reactor pressure
              vessel (neutron-induced irradiation hardening measured by Charpy
              impact testing); fatigue in piping (primary circuit), and concrete
              degradation (alkali-silica reaction in some designs).
            </li>
          </ul>

          <h3 className="font-semibold text-foreground mb-2">
            Decommissioning Strategies
          </h3>
          <DataTable
            headers={[
              "Strategy",
              "Description",
              "Timeline Post-Shutdown",
              "When Used",
            ]}
            rows={[
              [
                "DECON (Immediate Dismantlement)",
                "Plant dismantled promptly after shutdown; all activated/contaminated material removed and disposed of in licensed waste facilities. Site released for unrestricted use.",
                "7–15 years",
                "Most US and German plants; smaller reactors; where repository capacity available",
              ],
              [
                "SAFSTOR (Deferred Dismantlement)",
                "Plant placed in protective storage for 20–60 years to allow short-lived radioactive decay (principally Co-60, T½=5.27 yr, reduces 1,000-fold in 53 years). Then dismantled.",
                "40–70 years total (storage + D&D)",
                "Large complex plants; when repositories unavailable; to reduce worker dose",
              ],
              [
                "ENTOMB",
                "Radioactive materials encased in long-lasting concrete structure on the site indefinitely. Structurally not a licensed approach for commercial reactors in most countries.",
                "Permanent",
                "Extremely rare; Chernobyl Unit 4 (New Safe Confinement); considered last resort",
              ],
            ]}
          />
          <p className="text-sm text-muted-foreground mt-3 mb-4">
            The IAEA recommends prompt dismantlement (DECON) as the preferred
            strategy in most cases, as extended deferral concentrates
            decommissioning costs far in the future and can complicate
            institutional memory of radiologically sensitive areas.
          </p>

          <h3 className="font-semibold text-foreground mb-2">
            Waste Classification and Volumes
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Approximately{" "}
            <strong className="text-foreground">95% by volume</strong> of
            decommissioning waste is low-level waste (LLW) — slightly
            contaminated metal, concrete, piping, and equipment. Only a small
            fraction is intermediate-level waste (ILW), primarily the highly
            activated reactor pressure vessel, core barrel, and internal
            structures.
          </p>
          <DataTable
            headers={[
              "Waste Class",
              "Volume Share (typical)",
              "Activity Level",
              "Key Components",
              "Disposal Route",
            ]}
            rows={[
              [
                "Very Low Level Waste (VLLW)",
                "~60–70%",
                "Very low (bulk concrete, soils, scrap metal)",
                "Lightly contaminated building rubble; clearance below regulatory limits possible",
                "Industrial landfill (if below clearance) or near-surface VLLW facility",
              ],
              [
                "Low Level Waste (LLW)",
                "~20–30%",
                "Low (active work areas, piping)",
                "Contaminated metal, insulation, filters, tools, clothing",
                "Near-surface disposal facility (engineered vault)",
              ],
              [
                "Intermediate Level Waste (ILW)",
                "~2–5%",
                "Moderate to high (activated structural steel)",
                "Reactor pressure vessel; core barrel; core internals; biological shield",
                "Deeper vault or intermediate depth repository",
              ],
              [
                "High Level Waste / Spent Fuel",
                "&lt;1% by volume",
                "Very high (fission products, actinides)",
                "Spent fuel assemblies; vitrified HLW canisters",
                "Deep Geological Repository (DGR) — see Fuel Cycle section",
              ],
            ]}
          />

          <h3 className="font-semibold text-foreground mt-5 mb-2">
            Costs and Funding Mechanisms
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Decommissioning a large commercial power reactor typically costs{" "}
            <strong className="text-foreground">
              $300 million to $1 billion
            </strong>{" "}
            per reactor unit (range reflects design complexity, SAFSTOR vs.
            DECON strategy, national labour costs, and waste disposal access).
            The US fleet of ~93 operating reactors has accumulated roughly{" "}
            <strong className="text-foreground">$60 billion</strong> in
            dedicated decommissioning trust funds (NRC, 2023). Financial
            assurance requirements:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>
              <strong className="text-foreground">US:</strong> NRC requires
              operators to maintain decommissioning funds in external trusts;
              fund amount based on site-specific minimum decommissioning cost
              (~$400–500M/unit), adjusted for inflation.
            </li>
            <li>
              <strong className="text-foreground">UK:</strong> Nuclear
              Decommissioning Authority (NDA) manages Sellafield and legacy
              military/early commercial sites; total UK nuclear decommissioning
              liabilities estimated at ~£100 billion (NDA, 2023).
            </li>
            <li>
              <strong className="text-foreground">France:</strong> EDF
              decommissioning provisions: ~€37 billion for current fleet. French
              regulator (ASN) requires all funds to be secured before permanent
              shutdown.
            </li>
          </ul>

          <h3 className="font-semibold text-foreground mb-2">
            Notable Completed and In-Progress Decommissioning Projects
          </h3>
          <DataTable
            headers={["Plant", "Country", "Strategy", "Status", "Key Notes"]}
            rows={[
              [
                "Yankee Rowe (185 MWe)",
                "USA",
                "DECON",
                "Completed 2007",
                "First large US reactor fully decommissioned; license terminated 2007; site now unrestricted use; cost ~$450M",
              ],
              [
                "Maine Yankee (900 MWe)",
                "USA",
                "DECON",
                "Completed 2005",
                "Greenfield site in 9 years (shutdown 1996); cost ~$635M",
              ],
              [
                "San Onofre 2 & 3 (2,200 MWe)",
                "USA",
                "DECON",
                "Ongoing (2013–~2030s)",
                "~250,000 tonnes of material; ISFSI for spent fuel on site; ~$4.4B total est.",
              ],
              [
                "Calder Hall (240 MWe)",
                "UK",
                "SAFSTOR",
                "Ongoing (shutdown 2003)",
                "UK's first commercial power reactor (1956); Magnox design; expected completion 2050s",
              ],
              [
                "Greifswald (5×440 MWe, VVER)",
                "Germany",
                "DECON",
                "Largely complete",
                "East German VVER fleet; rapid decommissioning model; benchmark for SAFSTOR vs DECON debate",
              ],
              [
                "Zwentendorf (692 MWe)",
                "Austria",
                "N/A — never operated",
                "Preserved as training facility",
                "Completed construction 1978; referendum rejected nuclear; never fuelled; unique intact decommissioning training site",
              ],
            ]}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            By 2040, over 200 commercial nuclear reactors globally will have
            reached or exceeded their original 40-year design licences. The IAEA
            estimates the global decommissioning market will require in excess
            of $100 billion in investment over the next 30 years — making
            nuclear decommissioning one of the largest emerging industrial
            sectors in the energy transition.
          </p>
        </CollapsibleSection>
      </div>
    </div>
  );
}
