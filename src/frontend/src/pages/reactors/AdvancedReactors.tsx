import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Atom,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Globe,
  Rocket,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CollapsibleProps {
  title: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

// ─── Shared Components ─────────────────────────────────────────────────────────

function Collapsible({
  title,
  badge,
  badgeVariant = "secondary",
  icon,
  children,
  defaultOpen = false,
  id,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      id={id}
      className="border border-border rounded-xl overflow-hidden mb-6"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/40 transition-colors text-left gap-4"
        aria-expanded={open}
        data-ocid={id ? `${id}.toggle` : undefined}
      >
        <span className="flex items-center gap-3 font-display font-semibold text-lg text-foreground">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </span>
        <span className="flex items-center gap-2 shrink-0">
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
          {open ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-background border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

function SubSection({
  title,
  children,
  defaultOpen = false,
  id,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      id={id}
      className="border border-border/60 rounded-lg overflow-hidden mb-4"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 bg-muted/20 hover:bg-muted/40 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground">{title}</span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-5 py-4 bg-background border-t border-border/60 text-sm leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Equation({
  formula,
  label,
  note,
}: {
  formula: string;
  label?: string;
  note?: string;
}) {
  return (
    <div className="bg-muted/40 border border-border rounded-lg px-5 py-3 my-3 font-mono text-sm">
      <div className="text-primary font-semibold">{formula}</div>
      {label && (
        <div className="text-muted-foreground text-xs mt-1">{label}</div>
      )}
      {note && (
        <div className="text-foreground/70 text-xs mt-1 italic">{note}</div>
      )}
    </div>
  );
}

interface TableRow {
  key: string;
  cells: (string | React.ReactNode)[];
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: TableRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold text-foreground border-b border-border whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row.key}
              className={ri % 2 === 0 ? "bg-background" : "bg-muted/20"}
              data-ocid={`advanced_reactors.table.row.${ri + 1}`}
            >
              {row.cells.map((cell, ci) => (
                <td
                  key={`${row.key}-${headers[ci] ?? ci}`}
                  className="px-4 py-2.5 border-b border-border/50 text-foreground/90"
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

function InfoCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 text-center">
      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="text-xl font-bold text-primary font-display">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

function Citation({ id, text }: { id: number; text: string }) {
  return (
    <span className="group relative cursor-help">
      <sup className="text-primary font-bold hover:underline">[{id}]</sup>
      <span className="hidden group-hover:block absolute bottom-full left-0 z-10 w-72 p-3 bg-popover border border-border rounded-lg text-xs text-popover-foreground shadow-lg whitespace-normal">
        {text}
      </span>
    </span>
  );
}

// ─── SMR Table Data ───────────────────────────────────────────────────────────

const smrTableData: TableRow[] = [
  {
    key: "nuscale",
    cells: [
      "NuScale VOYGR",
      "LWR (PWR)",
      "77 MWe/module",
      "NuScale Power (USA)",
      <Badge key="ns-status" className="text-xs" variant="default">
        NRC Certified 2022
      </Badge>,
    ],
  },
  {
    key: "bwrx",
    cells: [
      "BWRX-300",
      "LWR (BWR)",
      "300 MWe",
      "GE-Hitachi (USA/Japan)",
      <Badge key="bwrx-status" className="text-xs" variant="secondary">
        Licensing — Canada
      </Badge>,
    ],
  },
  {
    key: "ap300",
    cells: [
      "AP300",
      "LWR (PWR)",
      "300 MWe",
      "Westinghouse (USA)",
      <Badge key="ap300-status" className="text-xs" variant="secondary">
        Pre-licensing
      </Badge>,
    ],
  },
  {
    key: "smr160",
    cells: [
      "SMR-160",
      "LWR (PWR)",
      "160 MWe",
      "Holtec International (USA)",
      <Badge key="smr160-status" className="text-xs" variant="secondary">
        Pre-licensing
      </Badge>,
    ],
  },
  {
    key: "xe100",
    cells: [
      "Xe-100",
      "HTGR (pebble-bed)",
      "80 MWe",
      "X-energy (USA)",
      <Badge key="xe100-status" className="text-xs" variant="secondary">
        US DOE ARDP
      </Badge>,
    ],
  },
  {
    key: "kpfhr",
    cells: [
      "KP-FHR",
      "Fluoride-salt HTR",
      "140 MWe",
      "Kairos Power (USA)",
      <Badge key="kpfhr-status" className="text-xs" variant="secondary">
        Demo permit 2023
      </Badge>,
    ],
  },
  {
    key: "arc100",
    cells: [
      "ARC-100",
      "SFR (sodium-cooled)",
      "100 MWe",
      "ARC Nuclear Canada",
      <Badge key="arc100-status" className="text-xs" variant="secondary">
        Licensing Canada
      </Badge>,
    ],
  },
  {
    key: "imsr",
    cells: [
      "IMSR-400",
      "MSR (molten salt)",
      "~195 MWe",
      "Terrestrial Energy (Canada)",
      <Badge key="imsr-status" className="text-xs" variant="secondary">
        Pre-licensing
      </Badge>,
    ],
  },
  {
    key: "mmrp",
    cells: [
      "MMRP",
      "HTGR (microreactor)",
      "5 MWe",
      "Ultra Safe Nuclear (USA)",
      <Badge key="mmrp-status" className="text-xs" variant="secondary">
        Pre-licensing
      </Badge>,
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdvancedReactors() {
  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="advanced_reactors.page"
    >
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border px-6 py-3">
        <nav className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to="/reactors"
            className="hover:text-foreground transition-colors"
          >
            Reactors
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Advanced Reactors</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="destructive"
              className="uppercase tracking-wide text-xs"
            >
              Advanced
            </Badge>
            <Badge variant="outline" className="text-xs">
              Generation IV · SMRs · Fusion · Space · Thorium
            </Badge>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Advanced Reactor Concepts
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Generation IV reactor systems, small modular reactors, fusion power,
            space nuclear systems, and the thorium fuel cycle — the nuclear
            technologies shaping the next half-century of energy and beyond.
          </p>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-5 bg-card border border-border rounded-xl">
          <InfoCard
            label="Gen IV Concepts"
            value="6"
            sub="Selected by GIF, 2002"
          />
          <InfoCard
            label="SMR Designs"
            value="70+"
            sub="In development worldwide"
          />
          <InfoCard
            label="ITER Q Factor"
            value="≥10"
            sub="Target plasma gain"
          />
          <InfoCard
            label="Th Abundance"
            value="3×"
            sub="More than uranium in crust"
          />
        </div>

        {/* Overview — always visible */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-5 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Generation IV Program
              </h3>
              <p className="text-muted-foreground mb-2">
                The Generation IV International Forum (GIF), established in
                2001, identified six reactor concepts for long-term development
                with four key goals: enhanced safety, sustainability (fuel use
                and waste minimization), economic competitiveness, and
                proliferation resistance.
                <Citation
                  id={1}
                  text="GIF 2002 Technology Roadmap. Generation IV International Forum. https://www.gen-4.org/gif/jcms/c_40481/technology-roadmap"
                />
              </p>
              <p className="text-muted-foreground">
                These designs represent a step-change from Generation III/III+
                light-water reactors — many use entirely different coolants,
                fuels, and operating temperatures, unlocking new industrial
                applications beyond electricity generation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Small Modular Reactors (SMRs)
              </h3>
              <p className="text-muted-foreground mb-2">
                SMRs are defined as reactors with electrical output below 300
                MWe, designed for factory fabrication and modular site
                deployment. The NuScale VOYGR became the first SMR to receive
                NRC design certification in September 2022.
                <Citation
                  id={2}
                  text="NRC. NuScale Standard Design Approval. https://www.nrc.gov/reactors/new-reactors/smr/nuscale.html"
                />
              </p>
              <p className="text-muted-foreground">
                The economic premise: lower upfront capital, factory quality
                control, and right-sized capacity for industrial heat
                applications, remote communities, and grid replacement of
                retiring fossil plants.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Generation IV Concepts */}
        <Collapsible
          title="Generation IV Reactor Concepts"
          badge="Advanced"
          badgeVariant="destructive"
          icon={<Atom className="h-5 w-5" />}
          id="gen4"
        >
          <p className="text-muted-foreground text-sm mb-5">
            The six Generation IV concepts span a wide range of coolants, fuels,
            and neutron spectra. Each addresses specific limitations of current
            light-water reactor technology — whether in fuel efficiency, waste
            transmutation, high-temperature process heat, or passive safety.
          </p>

          <SubSection
            title="1a. High-Temperature Gas-Cooled Reactor (HTGR)"
            id="htgr"
          >
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Coolant"
                value="Helium"
                sub="750–1000 °C outlet"
              />
              <InfoCard
                label="Thermal Efficiency"
                value="≥45%"
                sub="vs ~33% for LWRs"
              />
              <InfoCard
                label="Fuel"
                value="TRISO"
                sub="Ceramic-coated particles"
              />
            </div>
            <p className="text-muted-foreground">
              HTGRs use helium as coolant at outlet temperatures of 750–1000 °C,
              far exceeding the ~325 °C of conventional light-water reactors.
              The graphite moderator and ceramic TRISO fuel particles provide
              extraordinary inherent safety: the fuel retains fission products
              intact up to 1600 °C — temperatures unreachable in any credible
              accident scenario.
              <Citation
                id={3}
                text="Grover, R. B. (2017). TRISO fuel particle design and fabrication. Nuclear Engineering and Design, 360."
              />
            </p>
            <div className="bg-muted/30 rounded-lg p-4 my-3 text-sm">
              <div className="font-semibold text-foreground mb-2">
                TRISO Fuel Particle Architecture
              </div>
              <p className="text-muted-foreground">
                Each TRISO particle (~1 mm diameter) consists of a UO₂ or UC
                fuel kernel surrounded by five concentric layers:
              </p>
              <ol className="mt-2 space-y-1 text-muted-foreground list-decimal list-inside">
                <li>
                  <span className="font-medium text-foreground">
                    Porous carbon buffer
                  </span>{" "}
                  — absorbs fission recoil energy, accommodates fuel swelling
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Inner dense PyC
                  </span>{" "}
                  — protective barrier; prevents chemical attack of SiC layer
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Silicon carbide (SiC)
                  </span>{" "}
                  — primary pressure vessel; retains gaseous and metallic
                  fission products
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Outer dense PyC
                  </span>{" "}
                  — structural protection; prevents Cl⁻ attack during
                  fabrication
                </li>
              </ol>
              <p className="mt-2 text-muted-foreground text-xs">
                Tens of thousands of TRISO particles are embedded in graphite
                matrix to form a fuel compact (prismatic design) or pebble
                (pebble-bed design, 60 mm diameter). Failure rate &lt;10⁻⁵ per
                particle.
              </p>
            </div>
            <Equation
              formula="T_peak(fuel) ≤ 1600 °C at all conditions"
              label="TRISO fuel integrity limit — no active cooling required in loss-of-coolant events"
            />
            <div className="mt-3 text-muted-foreground">
              <div className="font-semibold text-foreground mb-2">
                Design Variants
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <span className="font-medium text-foreground">
                    Prismatic (block)
                  </span>
                  : fuel compacts inserted into hexagonal graphite fuel blocks;
                  columns form the core. Example: JAEA HTTR (Japan, 30 MWth
                  research reactor).
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Pebble-bed (PBR)
                  </span>
                  : graphite spheres circulate through the core continuously;
                  online refueling. Example: HTR-PM (China).
                </li>
              </ul>
            </div>
            <div className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-sm">
              <div className="font-semibold text-foreground mb-1">
                Operating Example: HTR-PM (China, 2021)
              </div>
              <p className="text-muted-foreground">
                World's first commercial pebble-bed HTGR; 2 × 250 MWth modules
                driving one 210 MWe steam turbine. Connected to the Shandong
                grid in December 2021. Operates at 750 °C helium outlet;
                demonstrates passive decay heat removal by natural convection
                and conduction alone.
                <Citation
                  id={4}
                  text="Zhang, Z. et al. (2021). Current status and technical description of Chinese 2×250 MWth HTR-PM demonstration plant. Nuclear Engineering and Design, 239."
                />
              </p>
            </div>
            <p className="mt-3 text-muted-foreground">
              High outlet temperature enables{" "}
              <span className="font-medium text-foreground">
                thermochemical hydrogen production
              </span>{" "}
              via the sulfur-iodine cycle (S-I cycle): 2H₂O → 2H₂ + O₂ using
              nuclear heat above 800 °C — avoiding CO₂ from steam methane
              reforming. Also viable: coal gasification, ammonia synthesis, and
              desalination process heat. This positions HTGR as a multi-energy
              product reactor, not solely an electricity source.
            </p>
          </SubSection>

          <SubSection title="1b. Molten Salt Reactor (MSR)" id="msr">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Operating Pressure"
                value="~1 atm"
                sub="vs 155 bar PWR"
              />
              <InfoCard
                label="Temperature"
                value="650–750 °C"
                sub="Fuel salt coolant"
              />
              <InfoCard
                label="Fuel Form"
                value="Dissolved"
                sub="No solid fuel cladding"
              />
            </div>
            <p className="text-muted-foreground">
              MSRs dissolve fissile material (uranium or thorium fluorides)
              directly into a molten salt carrier — typically LiF-BeF₂ (FLIBE)
              or LiF-NaF-KF (FLINAK). The liquid fuel concept eliminates solid
              fuel cladding failure as an accident scenario, enables online fuel
              processing, and operates at atmospheric pressure, removing the
              driving force for a loss-of-coolant event.
              <Citation
                id={5}
                text="Haubenreich, P. N. & Engel, J. R. (1970). Experience with the Molten-Salt Reactor Experiment. Nuclear Applications and Technology, 8(2)."
              />
            </p>
            <Equation
              formula="Th-232 + n → Th-233 → Pa-233 → U-233 (fissile)"
              label="Thorium breeding cycle in MSR; protactinium-233 T½ = 27 days"
              note="U-233 has excellent fissile properties: η ≈ 2.29 neutrons per absorption at thermal energies"
            />
            <div className="mt-3 text-muted-foreground">
              <div className="font-semibold text-foreground mb-2">
                Key Safety Feature: Freeze Plug (Drain Tank)
              </div>
              <p>
                A freeze plug of solidified salt is maintained at the bottom of
                the reactor vessel by active cooling. If power is lost or
                temperatures exceed limits, the plug melts, draining the fuel
                salt by gravity into a passively cooled, geometrically
                subcritical drain tank — achieving shutdown without operator
                action or any active systems. This is an intrinsic safety
                mechanism unavailable in solid-fuel reactors.
              </p>
            </div>
            <div className="mt-4 text-muted-foreground">
              <div className="font-semibold text-foreground mb-2">
                Engineering Challenges
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <span className="font-medium text-foreground">Corrosion</span>
                  : fluoride salts corrode structural metals; Hastelloy-N
                  developed at ORNL; modern materials research ongoing
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Tritium production
                  </span>
                  : Li-6 in FLIBE captures neutrons → ³H; tritium permeates
                  metalwork; requires dedicated tritium barrier system
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Salt processing
                  </span>
                  : removal of fission products (especially noble gases, noble
                  metals) from the salt stream — complex online chemistry plant
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Licensing framework
                  </span>
                  : regulatory frameworks are written for solid fuel; MSR
                  requires new fuel qualification and licensing approaches
                </li>
              </ul>
            </div>
            <div className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-sm">
              <div className="font-semibold text-foreground mb-1">
                Historical: MSRE at ORNL (1965–1969)
              </div>
              <p className="text-muted-foreground">
                The Molten Salt Reactor Experiment at Oak Ridge National
                Laboratory ran for ~4 years on U-235 salt, then U-233 — the only
                reactor ever to operate on U-233 fuel. Demonstrated stable
                operation, online refueling, and freeze plug safety. Shut down
                for budgetary reasons, not technical problems.
                <Citation
                  id={6}
                  text="MacPherson, H. G. (1985). The Molten Salt Reactor Adventure. Nuclear Science and Engineering, 90(4), 374–380."
                />
              </p>
            </div>
          </SubSection>

          <SubSection title="1c. Sodium-Cooled Fast Reactor (SFR)" id="sfr">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Coolant Temp"
                value="350–550 °C"
                sub="Low-pressure sodium"
              />
              <InfoCard
                label="Neutron Spectrum"
                value="Fast"
                sub="No moderator"
              />
              <InfoCard
                label="Conversion Ratio"
                value=">1.0"
                sub="Net fuel breeding"
              />
            </div>
            <p className="text-muted-foreground">
              SFRs use liquid sodium, which does not moderate neutrons —
              maintaining a fast neutron spectrum that breeds more fissile
              material than it consumes (conversion ratio &gt; 1.0) and can
              transmute long-lived minor actinides (Americium, Curium,
              Neptunium) into shorter-lived fission products, significantly
              reducing the hazard lifetime of nuclear waste.
            </p>
            <Equation
              formula="²³⁸U + n → ²³⁹Np → ²³⁹Pu (T½ = 2.35 days each β⁻ decay)"
              label="Plutonium breeding from fertile U-238 via fast neutron capture"
            />
            <div className="mt-3 text-muted-foreground">
              <div className="font-semibold text-foreground mb-2">
                Sodium Properties and Challenges
              </div>
              <p className="mb-2">
                Sodium's low viscosity, high thermal conductivity, and
                atmospheric-pressure operation at reactor temperatures make it
                an excellent coolant. However, sodium reacts vigorously with
                water and air (2Na + 2H₂O → 2NaOH + H₂), necessitating a
                hermetically sealed intermediate sodium loop between the primary
                (radioactive) sodium and the water/steam secondary system —
                adding complexity and cost.
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  Pool-type (immersed internals in large sodium pool) vs.
                  loop-type (piped external circuits) configurations
                </li>
                <li>
                  Sodium opacity complicates in-service inspection; ultrasonic
                  techniques required
                </li>
                <li>
                  Positive void coefficient in some designs: if sodium boils,
                  reactivity may increase — must be managed by design
                </li>
              </ul>
            </div>
            <DataTable
              headers={["Reactor", "Country", "Type", "Power", "Status"]}
              rows={[
                {
                  key: "bn800",
                  cells: [
                    "BN-800",
                    "Russia",
                    "SFR (pool)",
                    "800 MWe",
                    "Operational (2016)",
                  ],
                },
                {
                  key: "bn600",
                  cells: [
                    "BN-600",
                    "Russia",
                    "SFR (pool)",
                    "600 MWe",
                    "Operational (1980)",
                  ],
                },
                {
                  key: "bn1200",
                  cells: [
                    "BN-1200",
                    "Russia",
                    "SFR (pool)",
                    "1200 MWe",
                    "Under construction",
                  ],
                },
                {
                  key: "ebr2",
                  cells: [
                    "EBR-II",
                    "USA",
                    "SFR (pool)",
                    "20 MWe",
                    "Shut down 1994",
                  ],
                },
                {
                  key: "superphenix",
                  cells: [
                    "Superphénix",
                    "France",
                    "SFR (pool)",
                    "1240 MWe",
                    "Shut down 1996",
                  ],
                },
                {
                  key: "cfr600",
                  cells: [
                    "CFR-600",
                    "China",
                    "SFR",
                    "600 MWe",
                    "Construction phase",
                  ],
                },
              ]}
            />
          </SubSection>

          <SubSection title="1d. Lead-Cooled Fast Reactor (LFR)" id="lfr">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Coolant Bp"
                value="1740 °C"
                sub="Lead boiling point"
              />
              <InfoCard
                label="Operating P"
                value="~1 atm"
                sub="Atmospheric pressure"
              />
              <InfoCard
                label="Neutron Spectrum"
                value="Fast"
                sub="No moderation by Pb"
              />
            </div>
            <p className="text-muted-foreground">
              Lead-cooled fast reactors use molten lead or lead-bismuth eutectic
              (LBE, 44.5 wt% Pb / 55.5 wt% Bi) as coolant. Lead's high boiling
              point (1740 °C) virtually eliminates coolant boiling as an
              accident pathway; its high density and low neutron absorption
              provide natural radiation shielding; and lead does not react with
              air or water, removing the fire risk associated with sodium
              coolant.
              <Citation
                id={7}
                text="Smith, C. F. et al. (2008). SSTAR: The US Lead-cooled Fast Reactor. Journal of Nuclear Materials, 376(3)."
              />
            </p>
            <div className="mt-3 text-muted-foreground">
              <div className="font-semibold text-foreground mb-2">
                Lead-Bismuth Eutectic (LBE) Consideration
              </div>
              <p>
                LBE melts at 123.5 °C (much easier to handle than pure lead at
                327 °C) but generates significant Polonium-210 via
                ²⁰⁹Bi(n,γ)²¹⁰Bi → ²¹⁰Po (T½ = 138 days, α emitter). Po-210 is
                highly radiotoxic; LBE loops require careful sealing and off-gas
                treatment. Soviet Alpha-class submarines operated LBE-cooled
                reactors — providing significant operational experience and
                lessons on polonium management.
              </p>
            </div>
            <div className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-sm">
              <div className="font-semibold text-foreground mb-1">
                BREST-OD-300 (Russia) — Landmark Project
              </div>
              <p className="text-muted-foreground">
                A 300 MWe lead-cooled fast reactor under construction at Seversk
                (Tomsk region) since 2021, forming the core of Russia's pilot
                demonstration of a closed nuclear fuel cycle (PRORYV project).
                The co-located uranium-plutonium fuel fabrication and spent fuel
                reprocessing facility aims to demonstrate the full closed cycle
                on one site by ~2030.
                <Citation
                  id={8}
                  text="Adamov, E. O. et al. (2020). BREST-OD-300 reactor unit design development and validation. Nuclear Engineering and Design, 371."
                />
              </p>
            </div>
          </SubSection>

          <SubSection
            title="1e. Supercritical Water-Cooled Reactor (SCWR)"
            id="scwr"
          >
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Pressure"
                value="~25 MPa"
                sub="Above 22.1 MPa critical"
              />
              <InfoCard
                label="Temperature"
                value="~625 °C"
                sub="Supercritical water"
              />
              <InfoCard label="Efficiency" value="~44%" sub="vs ~33% LWR" />
            </div>
            <p className="text-muted-foreground">
              SCWRs extend the pressurized water concept beyond the
              thermodynamic critical point of water (374 °C, 22.1 MPa). Above
              this point, water exists as a single supercritical phase — no
              liquid-vapor phase transition, eliminating the need for steam
              generators or a pressurizer. The direct cycle (like a BWR)
              simplifies plant design considerably and raises thermal efficiency
              to ~44%.
            </p>
            <Equation
              formula="Critical point of H₂O: Tc = 373.95 °C, Pc = 22.064 MPa"
              label="Above this point, no distinction between liquid and vapor phases"
            />
            <p className="text-muted-foreground mt-2">
              SCWR remains in the research phase: no demonstration reactor has
              been built. The principal technical challenge is materials —
              structural alloys under supercritical water conditions experience
              stress corrosion cracking and radiation damage simultaneously,
              requiring extensive qualification testing. International research
              programs in Canada (CANDU-variant SCWR), Europe, Japan, and China
              are active.
            </p>
          </SubSection>

          <SubSection
            title="1f. Very High Temperature Reactor (VHTR)"
            id="vhtr"
          >
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Outlet Temp"
                value=">1000 °C"
                sub="Exceeds HTGR target"
              />
              <InfoCard
                label="Application"
                value="H₂ + Heat"
                sub="Thermochemical processes"
              />
              <InfoCard
                label="Basis"
                value="HTGR"
                sub="Evolved TRISO/He concept"
              />
            </div>
            <p className="text-muted-foreground">
              The VHTR is an evolution of the HTGR concept targeting outlet
              temperatures exceeding 1000 °C — sufficient for the thermochemical
              sulfur-iodine (S-I) cycle for hydrogen production at high
              efficiency (theoretical ~50% H₂ efficiency at 900 °C+). The S-I
              cycle:
            </p>
            <Equation
              formula="H₂SO₄ → SO₂ + H₂O + ½O₂  (850°C, nuclear heat)"
              label="Bunsen reaction + SO₂ splitting — net reaction: H₂O → H₂ + ½O₂"
              note="No CO₂ emissions; all reagents recycled. Nuclear heat replaces fossil fuel combustion."
            />
            <p className="text-muted-foreground mt-2">
              The US NGNP (Next Generation Nuclear Plant) program at Idaho
              National Laboratory targeted VHTR development; funding was paused
              after 2011. The concept remains attractive for decarbonizing
              hydrogen-intensive industries (ammonia fertilizer, petroleum
              refining, direct iron reduction).
            </p>
          </SubSection>
        </Collapsible>

        {/* Section 2: SMRs */}
        <Collapsible
          title="Small Modular Reactors (SMRs)"
          badge="Intermediate"
          badgeVariant="secondary"
          icon={<Zap className="h-5 w-5" />}
          id="smr"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Small Modular Reactors are generally defined as nuclear reactors
            with electrical output below 300 MWe that are designed for factory
            fabrication, modular deployment, and simplified operation. The SMR
            category spans conventional light-water designs, advanced non-LWR
            concepts, and microreactors (&lt;10 MWe).
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <InfoCard
              label="Size Threshold"
              value="<300 MWe"
              sub="IAEA SMR definition"
            />
            <InfoCard
              label="First NRC-Certified"
              value="Sep 2022"
              sub="NuScale VOYGR design"
            />
            <InfoCard
              label="Designs in Pipeline"
              value="70+"
              sub="IAEA ARIS database"
            />
          </div>

          <SubSection
            title="Economic Rationale and Tradeoffs"
            id="smr-economics"
          >
            <p className="text-muted-foreground mb-3">
              Large reactors benefit from economies of scale — cost per kWe
              decreases as unit size increases. SMRs sacrifice this advantage
              but aim to recover economics through:
            </p>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Factory fabrication
                </span>
                : controlled manufacturing environment; higher quality;
                reproducibility; no on-site construction cost inflation
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Economies of numbers
                </span>
                : cost reduction via learning curve as many identical units are
                built (unlike large plants where each is unique)
              </li>
              <li>
                <span className="font-medium text-foreground">Modularity</span>:
                capacity added incrementally; cash flow begins before full site
                build-out
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Siting flexibility
                </span>
                : smaller footprint, lower seismic and flood-plain requirements;
                can replace retiring fossil plants on existing grid connections
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Process heat market
                </span>
                : right-sized for industrial heat customers (district heating,
                desalination, hydrogen) that cannot use a 1,000 MWe baseload
                plant
              </li>
            </ul>
            <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm">
              <span className="font-semibold text-foreground">
                Economic Caution:{" "}
              </span>
              <span className="text-muted-foreground">
                NuScale's UAMPS Carbon Free Power Project cost estimate rose
                from ~$58/MWh (2017) to ~$89/MWh (2023) before cancellation of
                the first 12-module order in 2023. SMR economics remain unproven
                at commercial scale; the first-of-a-kind premium may be
                substantial before learning curve effects materialize.
                <Citation
                  id={9}
                  text="Power Magazine. (2023). NuScale, UAMPS terminate Carbon Free Power Project agreement. November 2023."
                />
              </span>
            </div>
          </SubSection>

          <SubSection
            title="NuScale VOYGR — First NRC-Certified SMR"
            id="nuscale"
          >
            <p className="text-muted-foreground mb-3">
              NuScale's VOYGR is a 77 MWe light-water SMR based on integral
              pressurized water reactor (iPWR) technology. The entire primary
              system — reactor core, pressurizer, and steam generators — is
              contained within a single sealed module approximately 4.6 m
              diameter × 23 m tall, sitting in an underground water-filled pool.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-foreground text-sm mb-2">
                  Safety Features
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Natural circulation cooling: no primary pumps needed</li>
                  <li>
                    Passive decay heat removal: gravity-fed pool water cooling
                    for 30+ days without operator action
                  </li>
                  <li>
                    No external AC power required for safe shutdown and cooling
                  </li>
                  <li>
                    Underground pool provides structural protection and
                    radiation shielding
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-2">
                  Key Parameters
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    77 MWe per module; up to 12 modules per site (924 MWe total)
                  </li>
                  <li>
                    Operating pressure: 12.8 MPa (below standard PWR 15.5 MPa)
                  </li>
                  <li>Coolant temperature: ~300 °C</li>
                  <li>
                    60-year design lifetime; 4.95% enriched UO₂ fuel; 24-month
                    refueling cycle
                  </li>
                  <li>
                    NRC Standard Design Approval: September 2022 (first ever for
                    an SMR)
                  </li>
                </ul>
              </div>
            </div>
          </SubSection>

          <SubSection title="SMR Design Comparison Table" id="smr-table">
            <DataTable
              headers={[
                "Design",
                "Type",
                "Power",
                "Developer / Country",
                "Status",
              ]}
              rows={smrTableData}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Sources: IAEA Advanced Reactors Information System (ARIS); NRC
              Design Certification database; developer announcements. Status as
              of 2024.
            </p>
          </SubSection>

          <SubSection title="Microreactors (&lt;10 MWe)" id="microreactors">
            <p className="text-muted-foreground mb-3">
              Microreactors extend the SMR concept to the smallest scale: 1–10
              MWe factory-built, truck-transportable units for remote
              communities, military bases, disaster relief, and space
              applications.
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Ultra Safe Nuclear MMRP
                </span>
                : 5 MWe heat-pipe-cooled reactor; TRISO fuel; air-cooled;
                10-year refueling interval; designed for 18-month factory build
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Westinghouse eVinci
                </span>
                : 5 MWe; heat pipe-cooled; 40% enriched TRISO; plug-and-play
                installation concept
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Project Pele (US DOD)
                </span>
                : 1–5 MWe TRISO-fueled microreactor; designed to fit in 3
                standard ISO shipping containers; NEPA review completed 2023
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Heat pipe-cooled designs are particularly attractive for
              microreactors: heat pipes passively transfer heat from the reactor
              core to a power conversion system with no pumps, no valves, and no
              active controls — extreme simplicity and reliability.
            </p>
          </SubSection>
        </Collapsible>

        {/* Section 3: Fusion */}
        <Collapsible
          title="Fusion Reactors: Status and Path Forward"
          badge="Advanced"
          badgeVariant="destructive"
          icon={<Globe className="h-5 w-5" />}
          id="fusion"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Controlled nuclear fusion offers the prospect of virtually unlimited
            energy from deuterium (from seawater) and tritium (bred from
            lithium). Despite decades of research, commercial fusion power
            remains challenging; however, major public projects (ITER, DEMO) and
            a surge of private investment since 2020 have substantially advanced
            the timeline.
          </p>

          <SubSection title="ITER and the International Program" id="iter">
            <div className="grid sm:grid-cols-4 gap-3 mb-4">
              <InfoCard
                label="Fusion Power"
                value="500 MW"
                sub="Target output"
              />
              <InfoCard label="Q Factor" value="≥10" sub="Plasma gain ratio" />
              <InfoCard label="First Plasma" value="~2027" sub="Projected" />
              <InfoCard
                label="D-T Ops"
                value="~2035"
                sub="Full deuterium-tritium"
              />
            </div>
            <p className="text-muted-foreground mb-3">
              ITER (International Thermonuclear Experimental Reactor) is the
              world's largest tokamak, under construction at Cadarache, France.
              Funded by 35 nations representing 85% of world GDP, ITER will
              demonstrate scientific feasibility of D-T fusion at reactor scale
              — producing 500 MW of fusion power from 50 MW of heating input (Q
              = 10), but will not generate electricity.
              <Citation
                id={10}
                text="ITER Organization. (2024). ITER — The World's Largest Tokamak. https://www.iter.org/proj/inafewlines"
              />
            </p>
            <Equation
              formula="D + T → ⁴He (3.5 MeV) + n (14.1 MeV)   Q_total = 17.6 MeV"
              label="Deuterium-Tritium fusion reaction — primary fuel cycle for ITER and near-term devices"
              note="80% of energy carried by 14.1 MeV neutrons — challenges for materials and tritium breeding"
            />
            <Equation
              formula="⁶Li + n → ⁴He + T + 4.8 MeV   (T½ = 12.3 yr)"
              label="Tritium breeding from lithium-6 in the breeding blanket"
              note="Li-7 also contributes: ⁷Li + n → ⁴He + T + n − 2.47 MeV (threshold reaction)"
            />
            <div className="mt-3 text-muted-foreground">
              <div className="font-semibold text-foreground mb-2">
                Plasma Conditions Required
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  Ion temperature: ~150 million °C (10× hotter than the Sun's
                  core; solar fusion relies on quantum tunneling at lower T)
                </li>
                <li>Plasma density: ~10²⁰ ions/m³</li>
                <li>Energy confinement time: ~3.7 s (ITER design)</li>
                <li>
                  Lawson criterion: n·τ_E·T ≥ 3 × 10²¹ keV·s/m³ for D-T ignition
                </li>
              </ul>
            </div>
          </SubSection>

          <SubSection title="DEMO and the Path to Commercial Fusion" id="demo">
            <p className="text-muted-foreground mb-3">
              DEMO (DEMOnstration Power Plant) is the planned successor to ITER
              — the first device to generate net electricity from fusion.
              European DEMO design targets ~2 GW fusion power, net ~300–500 MWe
              electricity to the grid, with construction targeted for the 2040s.
            </p>
            <DataTable
              headers={[
                "Device",
                "Country/Program",
                "Type",
                "Fusion Power",
                "Milestone",
              ]}
              rows={[
                {
                  key: "jet",
                  cells: [
                    "JET",
                    "EU/UK",
                    "Tokamak",
                    "59.5 MJ record (2022)",
                    "Final D-T record Feb 2024 (shutdown)",
                  ],
                },
                {
                  key: "iter",
                  cells: [
                    "ITER",
                    "International",
                    "Tokamak",
                    "500 MW",
                    "First plasma ~2027; D-T ~2035",
                  ],
                },
                {
                  key: "demo-eu",
                  cells: [
                    "DEMO (EU)",
                    "EU/Euratom",
                    "Tokamak",
                    "~2000 MW",
                    "Design phase; construction ~2040s",
                  ],
                },
                {
                  key: "cfetr",
                  cells: [
                    "CFETR",
                    "China",
                    "Tokamak",
                    "1–1.5 GW",
                    "Construction targeted 2030s",
                  ],
                },
                {
                  key: "dtt",
                  cells: [
                    "DTT",
                    "Italy (ENEA)",
                    "Tokamak",
                    "Divertor test",
                    "Construction 2024",
                  ],
                },
              ]}
            />
            <p className="text-sm text-muted-foreground mt-2">
              JET's 2022 record of 59.5 MJ of fusion energy (sustained over 5
              seconds) surpassed the previous record (21.7 MJ, 1997) by a factor
              of 2.8. JET's final D-T campaign in 2024 further validated ITER
              plasma scenarios and tritium breeding concepts.
              <Citation
                id={11}
                text="EUROfusion. (2022). EUROfusion consortium boosts fusion energy record. Feb 2022 press release."
              />
            </p>
          </SubSection>

          <SubSection
            title="Private Fusion Ventures (2024 Landscape)"
            id="private-fusion"
          >
            <p className="text-muted-foreground mb-3">
              Since 2021, private fusion investment has exceeded $6 billion
              globally. Several companies have moved beyond concept stage to
              hardware demonstration. Approaches span tokamaks, field-reversed
              configurations (FRC), magnetized target fusion, inertial
              confinement, and mirror machines.
            </p>
            <DataTable
              headers={[
                "Company",
                "Approach",
                "Fuel Target",
                "Key Milestone",
                "Target Date",
              ]}
              rows={[
                {
                  key: "cfs",
                  cells: [
                    "Commonwealth Fusion (SPARC)",
                    "HTS tokamak (12 T coils)",
                    "D-T",
                    "Proof Q~2 demonstration",
                    "~2027",
                  ],
                },
                {
                  key: "helion",
                  cells: [
                    "Helion Energy",
                    "FRC (field-reversed)",
                    "D-He³ / D-T",
                    "Q>1; Microsoft PPA signed",
                    "2028",
                  ],
                },
                {
                  key: "tae",
                  cells: [
                    "TAE Technologies",
                    "Beam-driven FRC",
                    "p-¹¹B (aneutronic)",
                    "300 keV plasma achieved",
                    "Long-term",
                  ],
                },
                {
                  key: "firstlight",
                  cells: [
                    "First Light Fusion",
                    "Projectile ICF",
                    "D-T",
                    "Fusion confirmed 2021",
                    "Power plant TBD",
                  ],
                },
                {
                  key: "realta",
                  cells: [
                    "Realta Fusion",
                    "Gas dynamic mirror",
                    "D-T",
                    "University spinout 2022",
                    "Early stage",
                  ],
                },
                {
                  key: "type1",
                  cells: [
                    "Type One Energy",
                    "Stellarator",
                    "D-T",
                    "Acquired HSX coil dataset",
                    "2030s",
                  ],
                },
              ]}
            />
            <div className="mt-3 p-4 bg-muted/30 rounded-lg text-sm">
              <div className="font-semibold text-foreground mb-2">
                High-Temperature Superconducting (HTS) Coils — The Key Enabler
              </div>
              <p className="text-muted-foreground">
                Commonwealth Fusion Systems demonstrated a 20 T HTS magnet
                (REBCO tape) in September 2021 — the world's strongest
                fusion-relevant electromagnet. Since magnetic confinement scales
                as ~B⁴ for fusion gain, doubling the field from ~5 T (ITER) to
                ~12 T (SPARC) reduces the required plasma volume by ~65×,
                enabling a compact device small enough to fit in a large room
                rather than a stadium.
                <Citation
                  id={12}
                  text="Creely, A. J. et al. (2020). Overview of the SPARC tokamak. Journal of Plasma Physics, 86(5)."
                />
              </p>
            </div>
          </SubSection>

          <SubSection
            title="Fusion Materials and First Wall Challenges"
            id="fusion-materials"
          >
            <p className="text-muted-foreground mb-3">
              The 14.1 MeV neutrons from D-T fusion pose a uniquely severe
              materials challenge. Fission reactors produce neutrons at ~2 MeV;
              fusion neutrons carry 7× more energy — causing substantially
              greater displacement damage and helium bubble formation in
              structural materials.
            </p>
            <Equation
              formula="dpa ∝ Φ × σ_displacement  [displacements per atom]"
              label="Radiation damage metric; fusion first wall may experience 10–20 dpa/year"
              note="ITER first wall: ~3.5 × 10¹⁷ n/cm²/s neutron flux at 14.1 MeV"
            />
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Tungsten divertor
                </span>
                : handles 10–20 MW/m² steady-state heat flux in ITER; highest
                melting point of any metal (3422 °C); low sputtering yield; but
                brittle at low temperatures
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Reduced activation ferritic-martensitic steels (RAFM)
                </span>
                : structural material for blanket; designed to minimize
                long-lived activation products (W, Mo, Nb excluded)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Silicon carbide composites (SiCf/SiC)
                </span>
                : advanced structural candidate; low activation; operates to
                1000 °C; joining technology still maturing
              </li>
              <li>
                <span className="font-medium text-foreground">IFMIF-DONES</span>
                : the International Fusion Materials Irradiation Facility (under
                construction in Spain) will use d+Li reactions to produce
                intense 14 MeV neutron flux for accelerated materials
                qualification
              </li>
            </ul>
          </SubSection>
        </Collapsible>

        {/* Section 4: Space Nuclear Power */}
        <Collapsible
          title="Space Nuclear Power Systems"
          badge="Intermediate"
          badgeVariant="secondary"
          icon={<Rocket className="h-5 w-5" />}
          id="space"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Nuclear power enables missions far beyond the reach of solar panels
            — from the outer planets to lunar and Martian surface bases. Two
            distinct technologies serve different power and mission profiles:
            Radioisotope Thermoelectric Generators (RTGs) for deep space;
            fission surface power for bases and high-power missions.
          </p>

          <SubSection
            title="Radioisotope Thermoelectric Generators (RTGs)"
            id="rtg"
          >
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard label="Isotope" value="Pu-238" sub="T½ = 87.7 years" />
              <InfoCard
                label="Power Density"
                value="~0.54 W/g"
                sub="Thermal heat output"
              />
              <InfoCard
                label="RTG Efficiency"
                value="~6–8%"
                sub="Thermoelectric conversion"
              />
            </div>
            <p className="text-muted-foreground mb-3">
              RTGs convert the steady heat from radioactive decay directly to
              electricity via thermoelectric effect — no moving parts, no
              maintenance, decades of reliable operation. Plutonium-238 is the
              preferred isotope: alpha emitter (minimal radiation shielding
              needed), 87.7-year half-life (graceful power decline over mission
              life), ~0.54 W/g specific thermal power.
              <Citation
                id={13}
                text="NASA. (2021). Multi-Mission Radioisotope Thermoelectric Generator (MMRTG). NASA Fact Sheet."
              />
            </p>
            <Equation
              formula="²³⁸Pu → ²³⁴U + ⁴He + 5.593 MeV  (T½ = 87.7 yr, α)"
              label="Pu-238 decay — heat source for RTG; ~0.39 W/g at 2024 (declining since launch)"
            />
            <DataTable
              headers={[
                "Mission",
                "RTG Type",
                "Launch",
                "Power at Launch",
                "Mission",
              ]}
              rows={[
                {
                  key: "voyager1",
                  cells: [
                    "Voyager 1",
                    "MHW-RTG (×3)",
                    "1977",
                    "~470 W",
                    "Interstellar space (1.6×10¹³ km)",
                  ],
                },
                {
                  key: "voyager2",
                  cells: [
                    "Voyager 2",
                    "MHW-RTG (×3)",
                    "1977",
                    "~470 W",
                    "Interstellar space (outer heliosphere)",
                  ],
                },
                {
                  key: "cassini",
                  cells: [
                    "Cassini",
                    "GPHS-RTG (×3)",
                    "1997",
                    "~882 W",
                    "Saturn system; ended 2017",
                  ],
                },
                {
                  key: "newhorizons",
                  cells: [
                    "New Horizons",
                    "GPHS-RTG (×1)",
                    "2006",
                    "~245 W",
                    "Pluto flyby 2015; Kuiper Belt",
                  ],
                },
                {
                  key: "curiosity",
                  cells: [
                    "Curiosity (MSL)",
                    "MMRTG (×1)",
                    "2011",
                    "~110 W",
                    "Mars surface — operating",
                  ],
                },
                {
                  key: "perseverance",
                  cells: [
                    "Perseverance (Mars 2020)",
                    "MMRTG (×1)",
                    "2020",
                    "~110 W",
                    "Mars surface — operating",
                  ],
                },
              ]}
            />
            <p className="text-sm text-muted-foreground mt-2">
              The MMRTG (Multi-Mission RTG) produces ~110 We from ~2000 Wth
              using 4.8 kg of Pu-238 encapsulated in iridium-clad PuO₂ pellets
              within a graphite impact shell — designed to survive launch
              accidents and reentry without Pu dispersal.
            </p>
          </SubSection>

          <SubSection
            title="Fission Surface Power: KRUSTY / Kilopower"
            id="kilopower"
          >
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <InfoCard
                label="Power Range"
                value="1–10 kWe"
                sub="Kilopower target"
              />
              <InfoCard label="Fuel" value="U-Mo" sub="~93% enriched HEU" />
              <InfoCard
                label="Demonstrated"
                value="2018"
                sub="KRUSTY test, Nevada"
              />
            </div>
            <p className="text-muted-foreground mb-3">
              The Kilopower project (NASA/DOE) demonstrated a compact fission
              surface power system in 2018 (Kilopower Reactor Using Stirling
              Technology — KRUSTY). The system uses a small uranium-molybdenum
              metal reactor core cooled by sodium heat pipes, driving
              free-piston Stirling cycle converters — elegant in its simplicity:
              no pumps, minimal moving parts.
              <Citation
                id={14}
                text="Gibson, M. A. et al. (2018). NASA's Kilopower Reactor Development and the Path to Higher Power Missions. Proceedings of Nuclear and Emerging Technologies for Space (NETS-2018)."
              />
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  KRUSTY test (2018)
                </span>
                : operated for 28 hours at full power; verified all safety,
                control, and shutdown systems; matched simulation predictions
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Passive safety
                </span>
                : negative temperature coefficient; reactor self-limits power if
                temperature rises — no operator action required for safe
                shutdown
              </li>
              <li>
                <span className="font-medium text-foreground">Scaling</span>: 1
                kWe unit demonstrated; 10 kWe lunar surface power unit design
                developed (KPLO-scale)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Lunar/Mars application
                </span>
                : four 10 kWe units provide 40 kWe — equivalent to continuous
                power for a 4–6 person surface habitat plus ISRU oxygen
                production
              </li>
            </ul>
          </SubSection>

          <SubSection
            title="Nuclear Electric and Pulse Propulsion Concepts"
            id="nuclear-propulsion"
          >
            <p className="text-muted-foreground mb-2">
              For human interplanetary travel, chemical propulsion (Isp ~450 s)
              requires transit times of 6–9 months to Mars. Nuclear propulsion
              dramatically reduces this:
            </p>
            <DataTable
              headers={["System", "Isp (s)", "Thrust", "TRL", "Mars Transit"]}
              rows={[
                {
                  key: "chem",
                  cells: [
                    "Chemical (LOX/LH₂)",
                    "~450",
                    "High",
                    "9",
                    "~6–9 months",
                  ],
                },
                {
                  key: "ntp",
                  cells: [
                    "Nuclear Thermal (NERVA-class)",
                    "~900",
                    "High",
                    "6",
                    "~4–5 months",
                  ],
                },
                {
                  key: "nep",
                  cells: [
                    "Nuclear Electric (NEP, ion)",
                    "3,000–10,000",
                    "Low",
                    "4–5",
                    "~6–9 months (continuous)",
                  ],
                },
                {
                  key: "orion",
                  cells: [
                    "Nuclear Pulse (Orion)",
                    ">10,000",
                    "Very High",
                    "1–2 (theory)",
                    "<90 days (theoretical)",
                  ],
                },
              ]}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Nuclear thermal propulsion (NTP) heats hydrogen propellant in a
              fission reactor and expels it through a nozzle — doubling specific
              impulse vs. chemical rockets. NERVA (Nuclear Engine for Rocket
              Vehicle Application) tested in the US 1960s–70s; NASA and DARPA's
              DRACO program (2023) aims to demonstrate NTP by 2027. Nuclear
              pulse propulsion (Project Orion, 1958) was theoretically the most
              powerful but was never developed due to the Partial Nuclear Test
              Ban Treaty (1963).
            </p>
          </SubSection>
        </Collapsible>

        {/* Section 5: Thorium Fuel Cycle */}
        <Collapsible
          title="Thorium Fuel Cycle"
          badge="Intermediate"
          badgeVariant="secondary"
          icon={<FlaskConical className="h-5 w-5" />}
          id="thorium"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Thorium is approximately 3× more abundant than uranium in Earth's
            crust, occurring mainly as monazite sand. Thorium-232 is entirely
            fertile (not directly fissile) but converts to fissile U-233 in a
            reactor — offering a distinct fuel cycle with both advantages and
            challenges compared to the uranium-plutonium cycle.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <InfoCard
              label="Crustal Abundance"
              value="~10 ppm"
              sub="vs ~3 ppm for uranium"
            />
            <InfoCard
              label="U-233 Fission σ"
              value="530 barns"
              sub="At 0.025 eV thermal"
            />
            <InfoCard
              label="U-233 η value"
              value="2.29"
              sub="Neutrons / absorption"
            />
          </div>

          <SubSection
            title="The Thorium-232 → Uranium-233 Conversion Chain"
            id="th-cycle"
          >
            <Equation
              formula="²³²Th + n → ²³³Th →(β⁻, 22.3 min)→ ²³³Pa →(β⁻, 26.97 d)→ ²³³U"
              label="Neutron capture on Th-232 initiates two-step beta decay chain to fissile U-233"
              note="Pa-233 T½ = 26.97 days: in-reactor, Pa-233 may capture another neutron (→ Pa-234 → U-234, non-fissile) — requires pa separation in MSR or 233Pa protactinium extraction"
            />
            <p className="text-muted-foreground mb-3">
              The relatively long half-life of Pa-233 creates a unique
              challenge: if Pa-233 remains in a high-flux reactor core, it
              parasitically captures neutrons before decaying to U-233. This
              reduces breeding efficiency. MSRs address this by continuously
              extracting Pa-233 into a low-flux region to decay to U-233
              undisturbed.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-foreground text-sm mb-2">
                  Why U-233 is Attractive
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    η = 2.29 at thermal energies (vs U-235: 2.07, Pu-239: 2.10)
                  </li>
                  <li>
                    Higher conversion ratio in thermal spectrum — enables
                    sustained breeding in LWR-like conditions
                  </li>
                  <li>
                    Fewer higher actinides produced (less long-lived waste)
                    compared to Pu cycle
                  </li>
                  <li>
                    Thorium cycle produces essentially no Pu-239 — altered
                    weapons material concern
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-2">
                  U-232 Contamination and Proliferation
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    U-233 is always contaminated with U-232 (T½ = 68.9 yr) via
                    ²³³Pa(n,2n) and other reactions
                  </li>
                  <li>
                    U-232 decay chain produces Tl-208 emitting 2.614 MeV γ-rays
                    — highly penetrating, detectable
                  </li>
                  <li>
                    U-233/U-232 mixture is difficult to handle safely without
                    heavy shielding
                  </li>
                  <li>
                    Not proliferation-proof: sufficient U-233 purity is
                    theoretically weaponizable; declared non-weapon-state use
                    requires IAEA safeguards
                  </li>
                </ul>
              </div>
            </div>
          </SubSection>

          <SubSection
            title="Historical Experience with Thorium"
            id="th-history"
          >
            <DataTable
              headers={["Program", "Country", "Period", "Type", "Th Role"]}
              rows={[
                {
                  key: "shippingport",
                  cells: [
                    "Shippingport PWR",
                    "USA",
                    "1977–1982",
                    "LWR (seed-blanket)",
                    "Th-U233 breeding blanket; achieved conversion ratio ~1.01",
                  ],
                },
                {
                  key: "msre",
                  cells: [
                    "MSRE (ORNL)",
                    "USA",
                    "1968–1969",
                    "MSR",
                    "U-233 from Th cycle used as fuel for first time ever",
                  ],
                },
                {
                  key: "india-phwr",
                  cells: [
                    "Indian PHWR fleet",
                    "India",
                    "1990s–present",
                    "PHWR (CANDU-type)",
                    "Th-232 blankets; minor fraction; Stage 2 of 3-stage plan",
                  ],
                },
                {
                  key: "ga-htgr",
                  cells: [
                    "HTGR programs (GA)",
                    "USA",
                    "1960s–70s",
                    "HTGR (Fort St. Vrain)",
                    "ThO₂/UO₂ mixed fuel; demonstrated Th-U cycle in TRISO",
                  ],
                },
                {
                  key: "dragon",
                  cells: [
                    "Dragon Reactor (UK)",
                    "UK",
                    "1965–1976",
                    "HTGR",
                    "Th fuel testing; international project",
                  ],
                },
              ]}
            />
            <p className="text-sm text-muted-foreground mt-2">
              The Shippingport reactor's final core configuration (Light Water
              Breeder Reactor) achieved a conversion ratio of 1.013 —
              demonstrating net breeding in a light-water reactor on the thorium
              cycle, a feat that was not widely publicized and remains the only
              commercial-scale thermal breeder demonstration.
              <Citation
                id={15}
                text="Edlund, M. C. (1985). Physics of the uranium-thorium fuel cycle in the light water breeder reactor. Transactions of the American Nuclear Society, 49."
              />
            </p>
          </SubSection>

          <SubSection
            title="India's Three-Stage Nuclear Program"
            id="india-thorium"
          >
            <p className="text-muted-foreground mb-3">
              India has the world's largest thorium reserves (~846,000 tonnes),
              motivating a long-term three-stage fuel cycle strategy explicitly
              designed to transition to thorium-based energy independence.
              <Citation
                id={16}
                text="Sinha, R. K. & Kakodkar, A. (2006). Design and development of the AHWR—The Indian thorium fuelled innovative nuclear reactor. Nuclear Engineering and Design, 236(7–8)."
              />
            </p>
            <div className="space-y-3">
              <div className="bg-muted/20 rounded-lg p-4 text-sm">
                <div className="font-semibold text-foreground mb-1">
                  Stage 1: Pressurized Heavy Water Reactors (PHWRs)
                </div>
                <p className="text-muted-foreground">
                  Use natural uranium fuel to produce Pu-239. Currently 22 PHWRs
                  operational (3.9 GWe). Spent fuel Pu-239 feeds Stage 2. Some
                  Th blankets tested.
                </p>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 text-sm">
                <div className="font-semibold text-foreground mb-1">
                  Stage 2: Fast Breeder Reactors (FBRs)
                </div>
                <p className="text-muted-foreground">
                  Prototype Fast Breeder Reactor (PFBR, 500 MWe) at Kalpakkam —
                  approaching commercial operation (delayed, originally targeted
                  2022). Uses Pu from Stage 1 with U-238 and Th-232 blankets to
                  breed both Pu-239 and U-233. U-233 stockpile feeds Stage 3.
                </p>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 text-sm">
                <div className="font-semibold text-foreground mb-1">
                  Stage 3: Advanced Heavy Water Reactors (AHWR)
                </div>
                <p className="text-muted-foreground">
                  AHWR-300 design: 300 MWe; Th-U233 fuel with self-sustaining
                  thorium cycle; heavy water moderated, boiling light water
                  cooled. Designed for passive safety (gravity-fed core cooling,
                  no operator action for 72 hours). Design complete; awaiting
                  construction decision.
                </p>
              </div>
            </div>
          </SubSection>

          <SubSection
            title="Challenges for Thorium Deployment"
            id="th-challenges"
          >
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  U-233 not commercially available
                </span>
                : the US Th-program produced ~2 tonnes of U-233 (stored at Oak
                Ridge); no commercial supply chain exists for new programs
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Pa-233 management
                </span>
                : protactinium extraction/separation requires chemical
                processing plant co-located with reactor for efficient breeding
                — significant complexity
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Regulatory framework
                </span>
                : U-233 fuel qualification, thorium fuel fabrication standards,
                and waste classification rules require new development in all
                major regulatory jurisdictions
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Startup fissile requirement
                </span>
                : thorium cycle requires a fissile "starter" charge (HEU, U-235,
                or Pu-239) until U-233 inventory builds up — transition period
                of years to decades
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Waste characterization
                </span>
                : Th-232 activation produces Th-228 (T½ = 1.9 yr) and Ra-228 in
                spent fuel — different waste stream from uranium cycle; requires
                separate long-term waste handling assessment
              </li>
            </ul>
          </SubSection>
        </Collapsible>

        {/* References */}
        <div className="mt-8 border-t border-border pt-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            References
          </h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              GIF Technology Roadmap 2002. Generation IV International Forum.{" "}
              <a
                href="https://www.gen-4.org"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                gen-4.org
              </a>
            </li>
            <li>
              NRC. NuScale Standard Design Approval (2022).{" "}
              <a
                href="https://www.nrc.gov"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                nrc.gov
              </a>
            </li>
            <li>
              Grover, R. B. (2017). TRISO fuel particle design. Nuclear
              Engineering and Design, 360.
            </li>
            <li>
              Zhang, Z. et al. (2021). HTR-PM demonstration plant description.
              Nuclear Engineering and Design, 239.
            </li>
            <li>
              Haubenreich, P. N. & Engel, J. R. (1970). MSRE experience. Nuclear
              Applications and Technology, 8(2).
            </li>
            <li>
              MacPherson, H. G. (1985). The Molten Salt Reactor Adventure.
              Nuclear Science and Engineering, 90(4).
            </li>
            <li>
              Smith, C. F. et al. (2008). SSTAR: US Lead-cooled Fast Reactor. J.
              Nuclear Materials, 376(3).
            </li>
            <li>
              Adamov, E. O. et al. (2020). BREST-OD-300 design validation.
              Nuclear Engineering and Design, 371.
            </li>
            <li>
              Power Magazine. (Nov 2023). NuScale/UAMPS CFPP project
              cancellation.
            </li>
            <li>
              ITER Organization. (2024). ITER — The World's Largest Tokamak.{" "}
              <a
                href="https://www.iter.org"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                iter.org
              </a>
            </li>
            <li>
              EUROfusion. (2022). Fusion energy world record Feb 2022.{" "}
              <a
                href="https://euro-fusion.org"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                euro-fusion.org
              </a>
            </li>
            <li>
              Creely, A. J. et al. (2020). Overview of the SPARC tokamak. J.
              Plasma Physics, 86(5).
            </li>
            <li>
              NASA. (2021). MMRTG Fact Sheet.{" "}
              <a
                href="https://rps.nasa.gov"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                rps.nasa.gov
              </a>
            </li>
            <li>
              Gibson, M. A. et al. (2018). Kilopower Reactor Development.
              NETS-2018 Proceedings.
            </li>
            <li>
              Edlund, M. C. (1985). Physics of the Th-U cycle in LWBR. Trans.
              ANS, 49.
            </li>
            <li>
              Sinha, R. K. & Kakodkar, A. (2006). AHWR design and development.
              Nuclear Engineering and Design, 236(7–8).
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
