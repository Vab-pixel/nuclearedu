import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { useEffect, useRef, useState } from "react";

// ─── Stage Data ────────────────────────────────────────────────────────────────
interface StageInfo {
  id: string;
  label: string;
  description: string;
  quantity: string;
  facilities: string;
  timeScale: string;
  environmental: string;
  color: string;
  x: number;
  y: number;
}

const STAGES: StageInfo[] = [
  {
    id: "mining",
    label: "Uranium Mining",
    description:
      "Uranium ore is extracted from open-pit or underground mines. Typical ore grade is 0.1–0.5% U₃O₈.",
    quantity: "~200 tonnes U₃O₈ / yr (1000 MWe PWR)",
    facilities:
      "McArthur River (Canada), Olympic Dam (Australia), Cigar Lake (Canada)",
    timeScale: "Decades (mine life)",
    environmental: "Tailings management, radon control, groundwater monitoring",
    color: "#8B6914",
    x: 80,
    y: 80,
  },
  {
    id: "milling",
    label: "Milling",
    description:
      "Ore is crushed and leached to produce yellowcake (U₃O₈), typically 70–90% uranium oxide.",
    quantity: "~200 tonnes U₃O₈ → ~170 tonnes U",
    facilities: "Rabbit Lake (Canada), Ranger (Australia), Rossing (Namibia)",
    timeScale: "Days to weeks per batch",
    environmental: "Acid/alkaline leach tailings, radium-226 management",
    color: "#D4AF37",
    x: 280,
    y: 80,
  },
  {
    id: "conversion",
    label: "Conversion",
    description:
      "U₃O₈ is converted to uranium hexafluoride (UF₆) gas for enrichment.",
    quantity: "~170 tonnes U → ~250 tonnes UF₆",
    facilities: "Cameco (Canada), ConverDyn (USA), Orano (France)",
    timeScale: "Weeks",
    environmental: "Fluorine handling, minor UF₆ emissions",
    color: "#00CED1",
    x: 480,
    y: 80,
  },
  {
    id: "enrichment",
    label: "Enrichment",
    description:
      "UF₆ is enriched from 0.7% to 3–5% U-235 using gas centrifuge cascades.",
    quantity: "~25 tonnes enriched UF₆ (3.5% U-235)",
    facilities:
      "Urenco (EU/USA), Orano (France), Centrus (USA), TENEX (Russia)",
    timeScale: "Days per SWU",
    environmental: "Depleted uranium tails (0.2–0.3% U-235), fluorine recovery",
    color: "#20B2AA",
    x: 680,
    y: 80,
  },
  {
    id: "fabrication",
    label: "Fuel Fabrication",
    description:
      "Enriched UF₆ is converted to UO₂ powder, pressed into pellets, sintered, and loaded into zircaloy tubes.",
    quantity: "~25 tonnes UO₂ fuel pellets",
    facilities: "Westinghouse (USA), Framatome (France), TVEL (Russia)",
    timeScale: "Months",
    environmental: "Ceramic dust control, zircaloy machining",
    color: "#4169E1",
    x: 880,
    y: 80,
  },
  {
    id: "reactor",
    label: "Reactor Operation",
    description:
      "Fuel assemblies are loaded into the reactor core. A 1000 MWe PWR generates ~7.5 TWh/yr.",
    quantity: "~27 tonnes spent fuel discharged / yr",
    facilities: "440+ reactors worldwide (IAEA PRIS)",
    timeScale: "3–5 year fuel cycle",
    environmental:
      "Zero CO₂ during operation; thermal discharge to cooling water",
    color: "#32CD32",
    x: 880,
    y: 280,
  },
  {
    id: "wet-storage",
    label: "Wet Storage",
    description:
      "Spent fuel is stored in cooling pools for 5–10 years to allow decay heat to decrease.",
    quantity: "~27 tonnes / yr into pools",
    facilities: "All nuclear power plants",
    timeScale: "5–10 years",
    environmental: "Pool water chemistry, tritium management",
    color: "#708090",
    x: 680,
    y: 280,
  },
  {
    id: "dry-storage",
    label: "Dry Cask Storage",
    description:
      "After cooling, fuel is transferred to dry casks (concrete/steel) for interim storage.",
    quantity: "~32 assemblies per cask",
    facilities: "Independent Spent Fuel Storage Installations (ISFSI)",
    timeScale: "Decades to centuries (interim)",
    environmental: "Passive air cooling, minimal emissions",
    color: "#696969",
    x: 480,
    y: 280,
  },
  {
    id: "reprocessing",
    label: "Reprocessing (PUREX)",
    description:
      "Spent fuel is dissolved and separated into uranium, plutonium, and high-level waste. Plutonium can be fabricated into MOX fuel.",
    quantity: "~97% U, ~1% Pu, ~3% fission products",
    facilities: "La Hague (France), Sellafield (UK), Rokkasho (Japan)",
    timeScale: "Years",
    environmental:
      "Liquid high-level waste vitrification, gaseous effluent treatment",
    color: "#9370DB",
    x: 280,
    y: 280,
  },
  {
    id: "disposal",
    label: "Geological Disposal",
    description:
      "High-level waste is immobilized in glass (vitrified) and placed in deep geological repositories (~300–1000 m underground).",
    quantity: "~3 tonnes vitrified waste / reactor / yr",
    facilities:
      "Onkalo (Finland), planned in Sweden, France, USA (Yucca Mountain)",
    timeScale: "100,000+ years (isolation)",
    environmental:
      "Multi-barrier system: waste form, container, buffer, host rock",
    color: "#2F4F4F",
    x: 80,
    y: 280,
  },
];

// Connections between stages
const CONNECTIONS: { from: string; to: string; label?: string }[] = [
  { from: "mining", to: "milling" },
  { from: "milling", to: "conversion" },
  { from: "conversion", to: "enrichment" },
  { from: "enrichment", to: "fabrication" },
  { from: "fabrication", to: "reactor" },
  { from: "reactor", to: "wet-storage" },
  { from: "wet-storage", to: "dry-storage" },
  { from: "dry-storage", to: "reprocessing", label: "Closed cycle" },
  { from: "dry-storage", to: "disposal", label: "Open cycle" },
  { from: "reprocessing", to: "fabrication", label: "MOX fuel" },
];

// ─── Particle Animation ──────────────────────────────────────────────────────
interface Particle {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  progress: number;
  speed: number;
}

export default function FuelCycleVisualizer() {
  const [selectedStage, setSelectedStage] = useState<StageInfo | null>(null);
  const [cycleMode, setCycleMode] = useState<"open" | "closed">("open");
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animRef = useRef<number>(0);
  const particleIdRef = useRef(0);

  // Filter connections based on cycle mode
  const visibleConnections = CONNECTIONS.filter((c) => {
    if (cycleMode === "open")
      return c.to !== "reprocessing" && c.from !== "reprocessing";
    return true;
  });

  // Spawn particles
  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      const conn =
        visibleConnections[
          Math.floor(Math.random() * visibleConnections.length)
        ];
      const fromStage = STAGES.find((s) => s.id === conn.from);
      const toStage = STAGES.find((s) => s.id === conn.to);
      if (!fromStage || !toStage) return;

      const newParticle: Particle = {
        id: particleIdRef.current++,
        from: { x: fromStage.x + 60, y: fromStage.y + 25 },
        to: { x: toStage.x + 60, y: toStage.y + 25 },
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
      };
      setParticles((prev) => [...prev.slice(-50), newParticle]);
    }, 300);

    return () => clearInterval(spawnInterval);
  }, [isPlaying, visibleConnections]);

  // Animate particles
  useEffect(() => {
    if (!isPlaying) return;

    function animate() {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + p.speed }))
          .filter((p) => p.progress < 1),
      );
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Nuclear Fuel Cycle Visualizer"
        subtitle="Interactive flow diagram of the nuclear fuel cycle from uranium mining to waste disposal. Toggle between open and closed cycle modes."
        audienceLevel="intermediate"
        readTimeMin={6}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cycle:
          </span>
          {(["open", "closed"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setCycleMode(mode)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                cycleMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/40"
              }`}
              data-ocid={`fuelcycle.mode.${mode}.toggle`}
            >
              {mode === "open" ? "Open Cycle" : "Closed Cycle"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            isPlaying
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
              : "bg-primary text-primary-foreground"
          }`}
          data-ocid="fuelcycle.play.button"
        >
          {isPlaying ? "⏸ Pause Flow" : "▶ Play Flow"}
        </button>

        <p className="text-xs text-muted-foreground">
          Click any stage for details. Quantities shown for a 1000 MWe PWR per
          year.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── SVG Flow Diagram ─────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-2"
          data-ocid="fuelcycle.diagram.panel"
        >
          <div className="relative w-full overflow-auto">
            <svg
              viewBox="0 0 1000 400"
              className="w-full h-auto"
              style={{ minHeight: 320 }}
              aria-label="Nuclear fuel cycle flow diagram"
            >
              <title>Nuclear Fuel Cycle Diagram</title>
              {/* Arrow markers */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="var(--muted-foreground)"
                  />
                </marker>
                <marker
                  id="arrowhead-reprocessing"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#9370DB" />
                </marker>
              </defs>

              {/* Connection lines */}
              {visibleConnections.map((conn) => {
                const from = STAGES.find((s) => s.id === conn.from);
                const to = STAGES.find((s) => s.id === conn.to);
                if (!from || !to) return null;
                const isReprocessing =
                  conn.from === "reprocessing" || conn.to === "reprocessing";
                return (
                  <g key={`${conn.from}-${conn.to}`}>
                    <line
                      x1={from.x + 60}
                      y1={from.y + 25}
                      x2={to.x + 60}
                      y2={to.y + 25}
                      stroke={
                        isReprocessing ? "#9370DB" : "var(--muted-foreground)"
                      }
                      strokeWidth={isReprocessing ? 2 : 1.5}
                      strokeDasharray={isReprocessing ? "6 3" : "none"}
                      markerEnd={`url(#arrowhead${isReprocessing ? "-reprocessing" : ""})`}
                      opacity={0.6}
                    />
                    {conn.label && (
                      <text
                        x={(from.x + to.x) / 2 + 60}
                        y={(from.y + to.y) / 2 + 20}
                        fontSize="10"
                        fill="var(--muted-foreground)"
                        textAnchor="middle"
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Stage nodes */}
              {STAGES.map((stage) => {
                const isReprocessing = stage.id === "reprocessing";
                const isHidden = cycleMode === "open" && isReprocessing;
                if (isHidden) return null;

                return (
                  <g
                    key={stage.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedStage(stage)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedStage(stage);
                      }
                    }}
                    data-ocid={`fuelcycle.stage.${stage.id}.button`}
                  >
                    <rect
                      x={stage.x}
                      y={stage.y}
                      width={120}
                      height={50}
                      rx={8}
                      fill={stage.color}
                      fillOpacity={selectedStage?.id === stage.id ? 0.9 : 0.7}
                      stroke={
                        selectedStage?.id === stage.id
                          ? "var(--primary)"
                          : "none"
                      }
                      strokeWidth={2}
                      className="transition-all"
                    />
                    <text
                      x={stage.x + 60}
                      y={stage.y + 30}
                      fontSize="11"
                      fontWeight="600"
                      fill="white"
                      textAnchor="middle"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      {stage.label}
                    </text>
                  </g>
                );
              })}

              {/* Animated particles */}
              {particles.map((p) => {
                const x = p.from.x + (p.to.x - p.from.x) * p.progress;
                const y = p.from.y + (p.to.y - p.from.y) * p.progress;
                return (
                  <circle
                    key={p.id}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="#22d3ee"
                    opacity={0.8}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.8;0.3;0.8"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#8B6914" }}
              />
              Mining
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#D4AF37" }}
              />
              Milling
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#00CED1" }}
              />
              Conversion
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#20B2AA" }}
              />
              Enrichment
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#4169E1" }}
              />
              Fabrication
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#32CD32" }}
              />
              Reactor
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#708090" }}
              />
              Storage
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#9370DB" }}
              />
              Reprocessing
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: "#2F4F4F" }}
              />
              Disposal
            </span>
          </div>
        </SectionCard>

        {/* ── Info Panel ─────────────────────────────────────────────────── */}
        <SectionCard className="lg:col-span-1" data-ocid="fuelcycle.info.panel">
          {selectedStage ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-sm"
                  style={{ backgroundColor: selectedStage.color }}
                />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {selectedStage.label}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedStage.description}
              </p>

              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-muted/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Typical Quantity
                  </p>
                  <p className="text-sm text-foreground font-mono">
                    {selectedStage.quantity}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Key Facilities
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedStage.facilities}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Time Scale
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedStage.timeScale}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Environmental Considerations
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedStage.environmental}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStage(null)}
                className="w-full rounded-lg border border-border bg-muted/20 px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40 transition-colors"
                data-ocid="fuelcycle.close_info.button"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <p className="text-muted-foreground text-sm">
                Click any stage in the flow diagram to view detailed
                information.
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      {/* ── Quantities Summary ───────────────────────────────────────────── */}
      <SectionCard className="mt-6" data-ocid="fuelcycle.quantities.section">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Fuel Cycle Mass Flow (1000 MWe PWR, per year)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { stage: "Mining", value: "200 t", note: "U₃O₈ ore" },
            { stage: "Conversion", value: "250 t", note: "UF₆ gas" },
            { stage: "Enrichment", value: "25 t", note: "3.5% enriched" },
            { stage: "Fabrication", value: "25 t", note: "UO₂ pellets" },
            { stage: "Spent Fuel", value: "27 t", note: "Discharged" },
          ].map((item) => (
            <div
              key={item.stage}
              className="rounded-lg border border-border bg-muted/20 p-3 text-center"
            >
              <p className="text-xs text-muted-foreground mb-1">{item.stage}</p>
              <p className="font-mono text-lg font-bold text-primary">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Values are approximate and vary by reactor type, burnup, and fuel
          management strategy. Source: IAEA Nuclear Fuel Cycle Information
          System (NFCIS), World Nuclear Association.
        </p>
      </SectionCard>
    </div>
  );
}
