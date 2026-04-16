import { Badge } from "@/components/ui/badge";
import {
  Atom,
  ChevronDown,
  ChevronRight,
  FlameKindling,
  Globe,
  Layers,
  Power,
  Ship,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Milestone {
  id: string;
  year: string;
  title: string;
  level: "intermediate" | "advanced";
  icon: React.ReactNode;
  summary: string;
  content: React.ReactNode;
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
      >
        <span className="font-semibold text-foreground text-sm">{title}</span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 py-4 text-sm text-foreground/90 leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      data-ocid={`milestone.item.${milestone.id}`}
      className="border border-border rounded-xl overflow-hidden bg-card shadow-sm"
    >
      <button
        type="button"
        data-ocid={`milestone.toggle.${milestone.id}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-4 p-6 hover:bg-muted/20 transition-colors text-left"
      >
        <div className="shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {milestone.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {milestone.year}
            </span>
            <Badge
              variant={
                milestone.level === "advanced" ? "destructive" : "secondary"
              }
              className="text-xs capitalize"
            >
              {milestone.level}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-lg text-foreground leading-tight">
            {milestone.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {milestone.summary}
          </p>
        </div>
        <div className="shrink-0 mt-1">
          {open ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-border px-6 pb-6 pt-5 space-y-4">
          {milestone.content}
        </div>
      )}
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3">
      <span className="shrink-0 font-semibold text-foreground w-40">
        {label}
      </span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

function Equation({ tex, label }: { tex: string; label?: string }) {
  return (
    <div className="my-2 flex flex-col gap-1">
      <code className="font-mono text-primary bg-muted px-3 py-1.5 rounded text-sm inline-block">
        {tex}
      </code>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}

const milestones: Milestone[] = [
  {
    id: "1",
    year: "December 2, 1942",
    title: "Chicago Pile-1: The First Sustained Chain Reaction",
    level: "intermediate",
    icon: <Atom className="h-5 w-5" />,
    summary:
      "Under the west stands of Stagg Field, Enrico Fermi and 49 colleagues achieved the world's first artificial self-sustaining nuclear chain reaction — proving nuclear power was not only possible, but controllable.",
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow label="Date & Time" value="December 2, 1942 — 3:25 PM CST" />
          <InfoRow
            label="Location"
            value="Squash court, Stagg Field, University of Chicago"
          />
          <InfoRow label="Team Lead" value="Enrico Fermi (Nobel Prize, 1938)" />
          <InfoRow label="Team Size" value="~49 scientists and engineers" />
          <InfoRow
            label="Power Achieved"
            value="200 watts (enough to light a single bulb)"
          />
          <InfoRow label="Duration" value="28 minutes sustained reaction" />
        </div>

        <CollapsibleSection title="Construction of the Pile">
          <p>
            Chicago Pile-1 was hand-assembled over approximately 18 days. The
            structure consisted of 57 alternating layers of graphite and uranium
            blocks, arranged in a roughly spherical shape within a wooden frame.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>6 tons of uranium metal (highest grade available)</li>
            <li>34 tons of uranium oxide (UO₂) blocks</li>
            <li>385 tons of graphite moderator blocks</li>
            <li>Total mass: ~425 tons; roughly 6 meters across</li>
          </ul>
          <p className="mt-2">
            The graphite acted as a neutron moderator — slowing fast neutrons to
            thermal energies where the fission cross-section of U-235 is orders
            of magnitude larger (~580 barns vs. ~1 barn for fast neutrons).
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Critical Mass and Physics">
          <p>
            The pile needed to exceed the critical condition — where on average
            exactly one neutron from each fission event causes another fission,
            sustaining the reaction. Fermi pre-calculated the required geometry
            using available cross-section data.
          </p>
          <Equation
            tex="k_eff = k∞ × P_NL"
            label="Effective neutron multiplication factor; P_NL = non-leakage probability"
          />
          <Equation
            tex="k_eff = 1.0006 (slightly supercritical)"
            label="At criticality on December 2; greater than 1 means a growing reaction"
          />
          <p>
            k∞ (the infinite medium multiplication factor) depends on the
            four-factor formula: η (neutrons per fission), ε (fast fission
            factor), p (resonance escape probability), and f (thermal
            utilization). Fermi's graphite purity was critical — even trace
            boron impurities absorb thermal neutrons strongly.
          </p>
          <p className="mt-2">
            Control rods coated in cadmium (which has an enormous thermal
            neutron absorption cross-section, ~2,500 barns) were inserted
            through the pile. Fermi orchestrated step-by-step withdrawal,
            calling out each increment guided by slow-neutron counters. The
            neutron count rate followed a predictable 1/(1−k) divergence once
            the rods were sufficiently withdrawn.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Safety Systems and the Origin of SCRAM">
          <p>
            The safety architecture was rudimentary by modern standards but
            carefully designed for the circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>ZIP rod:</strong> A cadmium safety rod tied by rope to the
              balcony above — pulled out during operation, gravity would drop it
              back in if cut.
            </li>
            <li>
              <strong>Safety Control Rod Axe Man (SCRAM):</strong> An engineer
              standing by with an axe, ready to sever the rope if ordered. The
              acronym "SCRAM" — now used globally for emergency reactor shutdown
              — originated here.
            </li>
            <li>
              <strong>"Suicide squad":</strong> Three men on the balcony with
              bottles of cadmium sulfate solution, prepared to douse the pile if
              all else failed.
            </li>
          </ul>
          <p className="mt-2">
            Given the primitive neutron cross-section data available and the
            relatively low power output (200 W), no significant radiation hazard
            was encountered. However, the pile produced no shielding whatsoever.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="The Coded Message and Aftermath">
          <p>
            Following success, Arthur Compton sent the famous coded telegram to
            James Conant in Washington:{" "}
            <em>
              "The Italian navigator has just landed in the new world. The
              natives are friendly."
            </em>{" "}
            ("Italian navigator" = Fermi; "new world" = nuclear age.)
          </p>
          <p>
            The pile was quickly disassembled and rebuilt more safely at Site
            A/Plot M in the Palos Hills forest. Its successor, CP-3, became the
            basis for the Hanford Site reactors used to produce plutonium-239
            for the Trinity test and Fat Man bomb. CP-1 remains the direct
            technological ancestor of every nuclear reactor operating today.
          </p>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: "2",
    year: "December 20, 1951",
    title: "EBR-I: First Electricity Generated from Nuclear Energy",
    level: "intermediate",
    icon: <Zap className="h-5 w-5" />,
    summary:
      "At a remote site in Idaho, Experimental Breeder Reactor I lit four light bulbs with nuclear electricity — the first time in history that a controlled fission reaction generated usable electrical power.",
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow label="Date" value="December 20, 1951" />
          <InfoRow
            label="Location"
            value="Arco, Idaho (now Idaho National Laboratory)"
          />
          <InfoRow
            label="Designer"
            value="Argonne National Laboratory (Walter Zinn, team)"
          />
          <InfoRow
            label="Reactor Type"
            value="Sodium-cooled fast breeder reactor"
          />
          <InfoRow
            label="First output"
            value="4 light bulbs in the reactor room"
          />
          <InfoRow label="Peak power" value="~200 kWe (eventually)" />
        </div>

        <CollapsibleSection title="Fast Breeder Reactor Physics">
          <p>
            EBR-I was a fast reactor — neutrons were not thermalized/slowed, but
            kept at high ("fast") energies. This had a crucial implication: fast
            neutrons can convert fertile U-238 (which does not fission easily)
            into fissile Pu-239 via neutron capture:
          </p>
          <Equation
            tex="²³⁸U + n → ²³⁹U → ²³⁹Np → ²³⁹Pu"
            label="Beta decay chain from neutron capture on U-238; half-lives 23.5 min → 2.36 days → 24,100 yr"
          />
          <p>
            The "breeding" concept: for every fission event consuming one U-235
            nucleus, more than one new Pu-239 atom was produced in the U-238
            blanket surrounding the core. EBR-I demonstrated a breeding ratio
            slightly above 1.0 — confirming that a reactor could in principle
            produce more fuel than it consumed, dramatically extending the
            world's uranium supply.
          </p>
          <Equation
            tex="Breeding Ratio (BR) = fissile produced / fissile consumed > 1"
            label="BR > 1 means net fuel production; EBR-I demonstrated this for the first time"
          />
        </CollapsibleSection>

        <CollapsibleSection title="The 1955 Partial Melt Incident">
          <p>
            In 1955, during a controlled power transient experiment, an operator
            made an error — instead of allowing the reactor to cool during the
            ramp-up as planned, they held power high. The fuel rods experienced
            a partial meltdown.
          </p>
          <p>
            Crucially: there was no explosion, no significant radiation release
            outside the building, and the reactor shut down safely. The incident
            demonstrated that even in a partial melt scenario, a properly
            designed fast reactor could contain damage. The fuel was carefully
            excavated and analyzed — providing invaluable data on fuel behavior
            under accident conditions.
          </p>
          <p>
            EBR-I's response to accident conditions was in fact passive-safe:
            the fast reactor's positive void coefficient was countered by the
            Doppler broadening effect and thermal expansion of the fuel, causing
            a natural power reduction at high temperatures.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Legacy and National Historic Landmark">
          <p>
            EBR-I was decommissioned in 1964, but its significance was
            immediately recognized. It was designated a National Historic
            Landmark in 1966 and remains open for public tours at the Idaho
            National Laboratory. Visitors can stand in the original reactor room
            where the first nuclear electricity was generated.
          </p>
          <p>
            The breeder reactor concept EBR-I demonstrated was refined through
            EBR-II (operational 1964–1994), which ran on reprocessed metallic
            fuel and proved passive safety principles. These findings directly
            informed Generation IV reactor designs, including the proposed
            Natrium reactor from TerraPower.
          </p>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: "3",
    year: "January 17, 1955",
    title: "USS Nautilus: Nuclear Naval Propulsion",
    level: "intermediate",
    icon: <Ship className="h-5 w-5" />,
    summary:
      'At 11:00 AM EST, USS Nautilus transmitted four words that changed naval warfare forever: "Underway on nuclear power." The world\'s first nuclear-powered vessel could now remain submerged indefinitely.',
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow label="Date" value="January 17, 1955 — 11:00 AM EST" />
          <InfoRow
            label="Historic Message"
            value={
              <em className="text-primary font-semibold">
                "Underway on nuclear power"
              </em>
            }
          />
          <InfoRow label="Vessel" value="USS Nautilus (SSN-571)" />
          <InfoRow
            label="Dimensions"
            value="97.5 m length; 3,500 ton submerged displacement"
          />
          <InfoRow
            label="Reactor"
            value="Westinghouse S2W PWR; 15,000 shaft horsepower"
          />
          <InfoRow
            label="Program Director"
            value="Admiral Hyman G. Rickover, USN"
          />
        </div>

        <CollapsibleSection title="The S2W Reactor and Rickover's Program">
          <p>
            Admiral Hyman Rickover drove an almost impossibly demanding 4-year
            development schedule for a submarine-grade pressurized water
            reactor. The Westinghouse S2W used highly enriched uranium
            (naval-grade HEU), allowing a compact core that could fit within the
            pressure hull. Key parameters:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Reactor type: S2W PWR (submarine, 2nd generation, Westinghouse)
            </li>
            <li>
              Coolant: pressurized water at ~150 bar; steam generator drives
              turbines directly
            </li>
            <li>
              Fuel: 93% enriched uranium; initial fuel load lasted &gt;100,000
              miles
            </li>
            <li>
              Shielding: lead + polyethylene surrounding the reactor compartment
            </li>
          </ul>
          <p className="mt-2">
            Rickover's Naval Reactors organization imposed extraordinary quality
            standards that became the template for nuclear safety culture
            worldwide. Every weld, every valve, every procedure was documented
            and traceable — a standard later adopted by commercial nuclear
            power.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="First Voyage and the North Pole Transit">
          <p>
            Nautilus's first nuclear-powered transit ran from New London,
            Connecticut to San Juan, Puerto Rico — 2,100 nautical miles entirely
            submerged, completed in 90 hours. Previously, no submarine could
            remain submerged for more than a few days before needing to surface
            to recharge diesel-electric batteries.
          </p>
          <p>
            On August 3, 1958, Nautilus made history again: it became the first
            vessel of any kind to navigate the geographic North Pole, traveling
            entirely submerged beneath the Arctic ice cap. The operation,
            codenamed "Operation Nautilus," covered 1,830 nautical miles under
            the ice in 96 hours.
          </p>
          <p>
            The practical military implication was profound: a nuclear submarine
            could in principle circle the Earth multiple times without
            surfacing, limited only by food stores and crew endurance. The
            Soviet Navy immediately accelerated its own nuclear submarine
            program.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Impact on Commercial Nuclear Power">
          <p>
            The S2W reactor technology did not remain military. Admiral Rickover
            adapted it directly for the civilian Shippingport Atomic Power
            Station (1957), which used the same PWR principles: pressurized
            water primary loop, steam generator, turbine-generator. This lineage
            made the PWR the dominant reactor type for commercial nuclear power
            worldwide:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              ~70% of all operating commercial reactors today are PWRs or
              derivatives
            </li>
            <li>
              Westinghouse AP1000 (Generation III+) is a direct evolutionary
              descendant
            </li>
            <li>French nuclear fleet (58 reactors) entirely PWR-based</li>
          </ul>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: "4",
    year: "1956–1957",
    title: "Calder Hall & Shippingport: Dawn of Commercial Nuclear Power",
    level: "intermediate",
    icon: <Power className="h-5 w-5" />,
    summary:
      "Within fourteen months, the United Kingdom and the United States both opened their first commercial nuclear power stations — Calder Hall and Shippingport — inaugurating the era of nuclear electricity generation.",
    content: (
      <div className="space-y-4">
        <CollapsibleSection
          title="Calder Hall, UK (October 17, 1956)"
          defaultOpen={false}
        >
          <p>
            Calder Hall, located at Sellafield in Cumbria, England, was
            officially opened by Queen Elizabeth II and connected to the
            National Grid on October 17, 1956 — making it the world's first
            commercial nuclear power station.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm mt-3">
            <InfoRow label="Reactor type" value="Magnox (4 × 50 MWe units)" />
            <InfoRow label="Moderator" value="Graphite" />
            <InfoRow
              label="Fuel"
              value="Natural uranium metal in magnesium-alloy cans"
            />
            <InfoRow
              label="Coolant"
              value="CO₂ gas at ~7 bar; 335°C outlet temperature"
            />
            <InfoRow
              label="Operated"
              value="1956–2003 (47 years — remarkable longevity)"
            />
          </div>
          <p className="mt-3">
            Calder Hall was dual-purpose: its plutonium output was essential to
            the UK's nuclear weapons program. This was common for
            first-generation reactors — the economics of commercial power were
            secondary to weapons material production. The Magnox design (named
            for the magnesium-alloy fuel cladding) was inherently suited to low
            burn-up natural uranium fuel, which maximizes Pu-239 production per
            gram of natural uranium.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Shippingport, USA (December 2, 1957)"
          defaultOpen={false}
        >
          <p>
            Shippingport Atomic Power Station, in Beaver County, Pennsylvania,
            began operation on December 2, 1957 — exactly 15 years after CP-1.
            It was the first US civilian full-scale nuclear power station and
            the first in the world built expressly for commercial power (not
            weapons material).
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm mt-3">
            <InfoRow label="Capacity" value="60 MWe" />
            <InfoRow
              label="Reactor type"
              value="PWR (designed by Admiral Rickover's team)"
            />
            <InfoRow
              label="Fuel"
              value="Initially 93% HEU; later light water breeder core"
            />
            <InfoRow label="Operator" value="Duquesne Light Company" />
            <InfoRow
              label="Decommissioned"
              value="1982; entire reactor vessel shipped to Hanford"
            />
          </div>
          <p className="mt-3">
            In 1977, Shippingport was converted to demonstrate the Light Water
            Breeder Reactor (LWBR) concept — using a thorium-232/uranium-233
            fuel cycle rather than the conventional uranium cycle. This was the
            first large-scale demonstration of thorium fuel in a
            commercial-scale PWR environment, and it confirmed breeding ratios
            near 1.0 were achievable with thorium in a light water reactor.
          </p>
          <p>
            At decommissioning, the reactor vessel was entombed and shipped
            intact by barge up the Columbia River to the Hanford Site — a
            landmark demonstration of safe decommissioning techniques.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Significance and What Followed">
          <p>
            Together, these two plants proved three things the nuclear industry
            needed:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Nuclear fission could produce electricity reliably at commercial
              scale.
            </li>
            <li>
              Long operating lifetimes (Calder Hall's 47-year run) were
              achievable.
            </li>
            <li>
              Safe decommissioning of a reactor was technically feasible
              (Shippingport).
            </li>
          </ol>
          <p className="mt-2">
            The 1960s and 1970s saw a massive nuclear build-out worldwide,
            driven directly by these demonstrations. By 1979 (the year of Three
            Mile Island), there were over 70 operating reactors in the United
            States alone, and the global installed base was growing rapidly.
          </p>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: "5",
    year: "1997 & 2022",
    title: "JET Tokamak: World Fusion Power Records",
    level: "advanced",
    icon: <FlameKindling className="h-5 w-5" />,
    summary:
      "The Joint European Torus at Culham set the world record for D-T fusion power in 1997 (16.1 MW), then shattered its own record 25 years later with 59.7 megajoules in a 5-second pulse — directly validating ITER's design.",
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow
            label="Location"
            value="Culham Centre for Fusion Energy, Oxfordshire, UK"
          />
          <InfoRow label="Operational" value="1983–2023 (40 years)" />
          <InfoRow
            label="Type"
            value="Tokamak; major radius 2.96 m; plasma volume 100 m³"
          />
          <InfoRow
            label="Plasma fuel"
            value="Deuterium-Tritium (D-T) for record shots"
          />
          <InfoRow
            label="1997 record"
            value="16.1 MW fusion power for 0.65 s; Q ≈ 0.65"
          />
          <InfoRow
            label="2022 record"
            value="59.7 MJ in 5 s; 11.8 MW average fusion power"
          />
        </div>

        <CollapsibleSection title="D-T Fusion Reaction Physics">
          <p>
            The dominant fusion reaction used in tokamak experiments — and the
            one ITER will use — is:
          </p>
          <Equation
            tex="²H + ³H → ⁴He (3.52 MeV) + n (14.1 MeV)    Q = 17.6 MeV"
            label="Deuterium-Tritium fusion; 80% of energy carried by the neutron"
          />
          <p>
            This reaction requires the plasma to reach temperatures of ~100–200
            million °C — ten times hotter than the Sun's core. At these
            temperatures, the D and T nuclei have sufficient kinetic energy to
            overcome the Coulomb barrier and fuse. The energy gain Q is defined
            as:
          </p>
          <Equation
            tex="Q = P_fusion / P_input"
            label="Q = 0.65 (JET 1997) means fusion produced 65% of the heating energy input"
          />
          <p>
            Q ≥ 1 ("scientific breakeven") was not achieved by JET — but was not
            the goal. JET's mission was to demonstrate sustained D-T operation,
            validate plasma physics models at scale, and characterize
            tritium-handling systems. All were achieved.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="The 2022 Record in Detail">
          <p>
            On February 9, 2022, JET's final D-T experimental campaign (DTE3)
            produced 59.7 megajoules of fusion energy over a 5-second pulse —
            nearly tripling the 1997 record of 21.7 MJ. The key improvements
            over the intervening 25 years:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>ITER-like wall:</strong> JET replaced its carbon wall with
              beryllium and tungsten (the same materials ITER will use) in 2011.
              This reduced impurity influx into the plasma, a major performance
              limiter.
            </li>
            <li>
              <strong>Heating power:</strong> Combined neutral beam injection +
              ion cyclotron resonance heating delivering ~30 MW to the plasma.
            </li>
            <li>
              <strong>Tritium mix:</strong> Optimized 50:50 D:T ratio;
              approximately 0.2 mg of tritium consumed per 5-second pulse.
            </li>
            <li>
              <strong>Plasma control:</strong> Improved real-time control
              systems to maintain plasma stability (avoid disruptions)
              throughout the record pulse.
            </li>
          </ul>
          <p className="mt-2">
            The 2022 result directly validated ITER's projected performance — if
            JET's plasma physics models scale correctly, ITER should achieve Q ≥
            10 (500 MW from 50 MW heating).
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Tritium Handling and Safety">
          <p>
            Tritium (³H) is radioactive — it decays by beta emission with a
            12.3-year half-life. Over JET's career, hundreds of grams of tritium
            were handled safely within the facility. This was itself a major
            achievement: demonstrating that kg-scale tritium handling could be
            done in a regulated, safe industrial environment. The tritium
            processing and accountancy systems developed for JET are now being
            scaled up for ITER, which will eventually require a tritium
            inventory of ~3 kg on site.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="JET Decommissioning and Legacy">
          <p>
            JET conducted its final plasma experiment on December 18, 2023,
            ending 40 years of operation. It now enters a 16-year
            decommissioning program. The scientific legacy includes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Over 100,000 plasma pulses; petabytes of plasma physics data
            </li>
            <li>Validation of the ITER scaling laws and design choices</li>
            <li>
              First operational experience with beryllium/tungsten plasma-facing
              components at scale
            </li>
            <li>
              Training of an entire generation of fusion scientists and
              engineers for ITER
            </li>
          </ul>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: "6",
    year: "December 5, 2022",
    title: "NIF Fusion Ignition: Energy In Exceeds Energy Out",
    level: "advanced",
    icon: <Layers className="h-5 w-5" />,
    summary:
      "For the first time in history, a fusion device produced more energy than was put into the fuel — 3.15 MJ of fusion energy from 2.05 MJ of laser energy. The 54-year quest for ignition was achieved at the National Ignition Facility.",
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow label="Date" value="December 5, 2022" />
          <InfoRow
            label="Facility"
            value="National Ignition Facility (NIF), Lawrence Livermore National Laboratory, CA"
          />
          <InfoRow label="Energy in (laser)" value="2.05 MJ" />
          <InfoRow label="Fusion energy out" value="3.15 MJ" />
          <InfoRow label="Q (laser-to-fusion)" value="≈ 1.54" />
          <InfoRow
            label="Q (wall-to-fusion)"
            value="≈ 0.15–0.20 (laser efficiency ~10–15%)"
          />
        </div>

        <CollapsibleSection title="Inertial Confinement Fusion Mechanism">
          <p>
            NIF uses inertial confinement fusion (ICF) — a fundamentally
            different approach from magnetic confinement (tokamaks). The
            sequence:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>192 laser beams</strong> (NIF's full complement) fire
              simultaneously at a gold cylinder (hohlraum) about 1 cm tall,
              delivering 2.05 MJ in ~20 nanoseconds.
            </li>
            <li>
              The laser energy is absorbed by the hohlraum walls, which re-emit
              it as a uniform bath of
              <strong> soft X-rays</strong> inside the cylinder.
            </li>
            <li>
              The X-rays ablate (vaporize) the outer surface of a{" "}
              <strong>2 mm spherical D-T capsule</strong> suspended at the
              center, generating an inward rocket reaction.
            </li>
            <li>
              The capsule implodes to{" "}
              <strong>~100× the density of solid lead</strong>; the center ("hot
              spot") reaches temperatures exceeding{" "}
              <strong>100 million °C</strong>.
            </li>
            <li>
              D-T fusion ignites in the hot spot;{" "}
              <strong>alpha particles</strong> (the 3.52 MeV He-4 product) are
              trapped in the dense fuel and heat the surrounding shell — "alpha
              heating."
            </li>
            <li>
              Alpha heating propagates outward through the dense fuel layer:{" "}
              <strong>self-sustaining burn</strong> — true ignition.
            </li>
          </ol>
          <Equation
            tex="²H + ³H → ⁴He (α, 3.52 MeV) + n (14.1 MeV)"
            label="The alpha particle is key: trapped in dense plasma, it heats the surrounding fuel"
          />
        </CollapsibleSection>

        <CollapsibleSection title="What 'Ignition' Means (and Doesn't Mean)">
          <p>
            The December 2022 shot achieved <strong>scientific ignition</strong>
            : fusion energy output exceeded the energy delivered to the fusion
            fuel by the lasers (Q_laser &gt; 1). This is the physically
            meaningful threshold — it means the fusion plasma was generating
            more energy than was used to compress it.
          </p>
          <p className="mt-2">
            However, the laser system itself is highly inefficient. NIF's 192
            laser amplifiers consume approximately 400–500 MJ of electricity
            from the grid to produce 2.05 MJ of laser light. Wall-plug-to-fusion
            Q is approximately 0.003–0.006 — far below what would be needed for
            commercial power.
          </p>
          <p className="mt-2">The path to commercial ICF power requires:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Target gain of ~100× (fusion Q ≈ 100)</li>
            <li>
              Laser efficiency &gt;10× current (diode-pumped systems, currently
              in development)
            </li>
            <li>
              Target fabrication at scale: ~1 million targets/year at &lt;$0.20
              each
            </li>
            <li>
              Repetition rate: ~10–15 shots/second (NIF fires ~1 shot/day)
            </li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Subsequent Shots and Progress (2023–2024)">
          <p>
            NIF followed the record-breaking December 2022 shot with multiple
            repeat demonstrations in 2023, confirming the result was
            reproducible and understanding its physics better. Key subsequent
            results:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              July 30, 2023: ~3.88 MJ fusion yield (Q ≈ 1.9) — improvement
              through refined target design
            </li>
            <li>
              October 2023: ~4.3 MJ fusion yield — highest confirmed as of early
              2024
            </li>
            <li>
              The alpha-heating physics model is now validated; teams are
              exploring higher laser energies and improved capsule symmetry to
              push gain further.
            </li>
          </ul>
          <p className="mt-2">
            Private companies (Commonwealth Fusion, Helion, TAE Technologies,
            and others) are pursuing alternative pathways to commercial fusion —
            ICF-based startups include Xcimer Energy and Focused Energy, who are
            directly building on NIF's alpha-heating results.
          </p>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: "7",
    year: "Ongoing (2020s)",
    title: "ITER: The International Fusion Engineering Milestone",
    level: "intermediate",
    icon: <Globe className="h-5 w-5" />,
    summary:
      "ITER — a collaboration of 35 nations — is assembling the world's largest tokamak in Cadarache, France. Designed to produce 500 MW from 50 MW of heating (Q ≥ 10), it will be the decisive engineering proof of fusion power.",
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow
            label="Full name"
            value="International Thermonuclear Experimental Reactor"
          />
          <InfoRow
            label="Location"
            value="Cadarache, Saint-Paul-lès-Durance, France"
          />
          <InfoRow
            label="Members"
            value="EU, USA, Russia, China, India, South Korea, Japan (35 nations total)"
          />
          <InfoRow
            label="Design goal"
            value="500 MW fusion power from 50 MW heating input (Q ≥ 10)"
          />
          <InfoRow label="Plasma volume" value="840 m³ (major radius 6.2 m)" />
          <InfoRow label="Total mass" value="~23,000 tonnes total assembly" />
          <InfoRow
            label="Cost estimate"
            value="~€20 billion (shared in-kind among members)"
          />
        </div>

        <CollapsibleSection title="Superconducting Magnets: The Engineering Core">
          <p>
            ITER's magnetic confinement system is an unprecedented engineering
            achievement. The 18 toroidal field (TF) coils that create the main
            confining magnetic field each stand 14 m tall and weigh
            approximately 360 tonnes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Superconducting material:</strong> Nb₃Sn (niobium-tin) at
              4 K (−269°C); operates at 13 T field at the conductor
            </li>
            <li>
              <strong>Central solenoid:</strong> 13.5 T; 73,000 A; 6-module
              stack assembled on site; often called "the world's most powerful
              superconducting electromagnet"
            </li>
            <li>
              <strong>Combined stored magnetic energy:</strong> 51 GJ —
              comparable to a large flywheel battery
            </li>
            <li>
              <strong>Cooling:</strong> Supercritical helium at 4 K circulated
              through all coils
            </li>
          </ul>
          <Equation
            tex="B_toroidal = 5.3 T  (at plasma center;  13 T at conductor)"
            label="Magnetic field in the plasma; the high-field Nb₃Sn conductor enables compact design"
          />
        </CollapsibleSection>

        <CollapsibleSection title="Mission: Proof of Concept, Not a Power Plant">
          <p>
            ITER is explicitly a science and engineering experiment — not a
            power plant. Its mission has three components:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Achieve Q ≥ 10:</strong> Demonstrate that a fusion plasma
              can produce at least 10× more energy than the heating input. This
              is the fundamental scientific milestone that no device has yet
              reached (JET's best was Q ≈ 0.65).
            </li>
            <li>
              <strong>Tritium breeding demonstration:</strong> Test tritium
              breeding blanket modules in the actual neutron flux of a burning
              D-T plasma. Future power plants must breed their own tritium (only
              20 kg of natural tritium exists worldwide).
            </li>
            <li>
              <strong>Integrated engineering test:</strong> Operate
              superconducting magnets, plasma-facing components, heating
              systems, and tritium handling together at scale for sustained
              periods.
            </li>
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="Assembly Progress and Timeline">
          <p>ITER assembly is underway at Cadarache. Key milestones:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              2015: Tokamak pit excavation complete; bioshield concrete poured
            </li>
            <li>
              2020: "First Plasma" preparation begins; first major components
              delivered to site
            </li>
            <li>
              2021: Assembly formally commenced with first sector/coil module
              integration
            </li>
            <li>
              2023–2027: Ongoing tokamak assembly; multiple sector and coil
              modules being integrated
            </li>
            <li>Target first plasma: ~2025–2027 (schedule under revision)</li>
            <li>D-T operations (full Q ≥ 10 campaign): ~2035 target</li>
          </ul>
          <p className="mt-2">
            ITER's successor, DEMO (Demonstration Power Plant), is under
            conceptual design by EUROfusion. DEMO aims to demonstrate net
            electricity generation to the grid — targeting operation in the
            2040–2060 timeframe.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="International Collaboration and Cost Sharing">
          <p>
            ITER is the most complex international scientific collaboration in
            history, rivaling and arguably exceeding the International Space
            Station in technical scope. Each member nation contributes
            components ("in-kind contributions") rather than cash:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              EU: largest single contributor (~45%); provides vacuum vessel
              sectors, TF coils, buildings
            </li>
            <li>Japan: central solenoid conductor, neutral beam injectors</li>
            <li>USA: central solenoid modules (built by General Atomics)</li>
            <li>
              China, South Korea: various coil winding packs, cryostat sections
            </li>
            <li>
              India: cryostat (the largest stainless steel high-vacuum vessel
              ever built)
            </li>
          </ul>
          <p className="mt-2">
            This structure requires extraordinary coordination: components
            manufactured on three continents must meet tolerances of fractions
            of a millimeter and interface seamlessly on site. The ITER
            Organization has become a proving ground for international
            high-technology project management.
          </p>
        </CollapsibleSection>
      </div>
    ),
  },
];

export default function Milestones() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4" data-ocid="milestones.page">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            History
          </Badge>
          <Badge variant="outline" className="text-xs font-mono">
            Milestone Experiments
          </Badge>
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground leading-tight">
          Milestone Experiments
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Nuclear science has several landmark experiments and achievements that
          changed the world. This page explores the key milestones in detail —
          the physics behind them, the people involved, and their lasting
          consequences.
        </p>
        <p className="text-sm text-muted-foreground/70 italic">
          Select any milestone to expand detailed analysis, equations, and
          historical context.
        </p>
      </header>

      {/* Timeline accent */}
      <div className="relative pl-4 border-l-2 border-primary/30 space-y-1 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">1942</strong> — First chain
          reaction &nbsp;·&nbsp;
          <strong className="text-foreground">1951</strong> — First nuclear
          electricity &nbsp;·&nbsp;
          <strong className="text-foreground">1955</strong> — Nuclear propulsion
        </p>
        <p>
          <strong className="text-foreground">1956–57</strong> — Commercial
          power &nbsp;·&nbsp;
          <strong className="text-foreground">1997 & 2022</strong> — Fusion
          records &nbsp;·&nbsp;
          <strong className="text-foreground">2022</strong> — Fusion ignition
          &nbsp;·&nbsp;
          <strong className="text-foreground">2020s</strong> — ITER assembly
        </p>
      </div>

      {/* Milestones */}
      <section data-ocid="milestones.list" className="space-y-4">
        {milestones.map((m) => (
          <MilestoneCard key={m.id} milestone={m} />
        ))}
      </section>

      {/* Sources */}
      <footer className="border-t border-border pt-6 space-y-2 text-xs text-muted-foreground/70">
        <p className="font-semibold text-muted-foreground text-sm">
          Sources & Further Reading
        </p>
        <ul className="space-y-1 list-disc pl-4">
          <li>
            Fermi, E. et al. (1942). Chicago Pile-1.{" "}
            <em>Atomic Energy Commission Records.</em>
          </li>
          <li>
            Zinn, W. H. (1952). EBR-I first operation reports.{" "}
            <em>Argonne National Laboratory.</em>
          </li>
          <li>
            Rickover, H. G. (1958). Naval Reactors — S2W program.{" "}
            <em>U.S. Navy / AEC.</em>
          </li>
          <li>
            IAEA PRIS (2024). Calder Hall & Shippingport reactor data.{" "}
            <em>iaea.org/PRIS</em>
          </li>
          <li>
            EUROfusion (2022). JET D-T record: 59.7 MJ. <em>euro-fusion.org</em>
          </li>
          <li>
            Zylstra, A. B. et al. (2022). Burning plasma achieved in inertial
            fusion. <em>Nature 601, 542–548.</em>
          </li>
          <li>
            Abu-Shawareb, H. et al. (2022). Lawson Criterion for Ignition
            Exceeded in an Inertial Fusion Experiment.{" "}
            <em>Phys. Rev. Lett. 129, 075001.</em>
          </li>
          <li>
            ITER Organization (2023). ITER Project — Progress and Status.{" "}
            <em>iter.org</em>
          </li>
        </ul>
      </footer>
    </div>
  );
}
