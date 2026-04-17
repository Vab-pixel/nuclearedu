import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type DecayStep, u238DecayChain } from "@/data/decayChain";
import * as d3 from "d3";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const DECAY_COLORS: Record<string, string> = {
  alpha: "#f87171",
  "beta-": "#60a5fa",
  "beta+": "#4ade80",
  gamma: "#c084fc",
  stable: "#9ca3af",
  other: "#22d3ee",
};

const DECAY_LABELS: Record<string, string> = {
  alpha: "α decay",
  "beta-": "β⁻ decay",
  "beta+": "β⁺ decay",
  gamma: "γ emission",
  stable: "Stable",
};

function decayDescription(step: DecayStep): string {
  const descriptions: Record<string, string> = {
    alpha: `${step.nuclide} emits a helium-4 nucleus (α particle), losing 2 protons and 2 neutrons to become ${step.daughter}. Q-value: ${step.Qvalue_MeV} MeV — roughly ${(step.Qvalue_MeV * 700000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}× the energy of a typical chemical bond.`,
    "beta-": `${step.nuclide} undergoes β⁻ decay: a neutron converts to a proton by emitting an electron and an antineutrino. The daughter nucleus is ${step.daughter}. Q-value: ${step.Qvalue_MeV} MeV.`,
    "beta+": `${step.nuclide} undergoes β⁺ decay: a proton converts to a neutron by emitting a positron and a neutrino, forming ${step.daughter}. Q-value: ${step.Qvalue_MeV} MeV.`,
    gamma: `${step.nuclide} is a metastable isomer that de-excites by emitting a gamma photon to reach the ground state ${step.daughter}.`,
    stable: `${step.nuclide} is the stable end product of the U-238 decay chain — lead-206 is the final, non-radioactive daughter.`,
  };
  return (
    descriptions[step.decayMode] ??
    `${step.nuclide} → ${step.daughter} via ${step.decayMode}.`
  );
}

const NODE_W = 84;
const NODE_H = 52;
const SPACING_X = 136;
const SVG_MARGIN_X = 28;
const SVG_MARGIN_Y = 40;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.15;

function downloadCSV(data: DecayStep[]) {
  const header =
    "Step,Nuclide,Z,N,A,Decay Mode,Daughter,Half-life,Q-value (MeV),Branching (%),Particle\n";
  const rows = data
    .map(
      (s) =>
        `${s.stepIndex},${s.nuclide},${s.Z},${s.N},${s.A},${s.decayMode},${s.daughter},"${s.halfLifeStr}",${s.Qvalue_MeV},${s.branchingPercent},"${s.particleEmitted}"`,
    )
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "u238_decay_chain.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function DecayChainExplorer() {
  const [activeStep, setActiveStep] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fitZoom, setFitZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const chain = u238DecayChain;
  const totalNodes = chain.length + 1;
  const svgW = totalNodes * SPACING_X + SVG_MARGIN_X * 2 + NODE_W;
  const svgH = NODE_H + SVG_MARGIN_Y * 2;
  const centerY = svgH / 2;

  const nodes = chain.map((step, i) => ({
    x: SVG_MARGIN_X + i * SPACING_X,
    y: centerY - NODE_H / 2,
    label: step.nuclide,
    step,
  }));

  const terminalNode = {
    x: SVG_MARGIN_X + chain.length * SPACING_X,
    y: centerY - NODE_H / 2,
    label: "Pb-206",
    step: chain[chain.length - 1],
  };

  // Fit-to-container
  const recalcFit = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerW = rect.width || 800;
    const fit = Math.min(containerW / svgW, 1.5);
    setFitZoom(fit);
    setZoom(fit);
    const scaledW = svgW * fit;
    setPan({ x: (containerW - scaledW) / 2, y: 0 });
  }, [svgW]);

  useLayoutEffect(() => {
    recalcFit();
  }, [recalcFit]);
  useEffect(() => {
    const obs = new ResizeObserver(recalcFit);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [recalcFit]);

  // Draw D3 edges
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".decay-edge").remove();

    chain.forEach((step, i) => {
      const x1 = SVG_MARGIN_X + i * SPACING_X + NODE_W;
      const x2 = SVG_MARGIN_X + (i + 1) * SPACING_X;
      const y = centerY;
      const color = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
      const isActive = i === activeStep;

      const g = svg
        .append("g")
        .attr("class", "decay-edge")
        .attr("opacity", isActive ? 1 : 0.28);

      // Animated active edge glow
      if (isActive) {
        g.append("line")
          .attr("x1", x1)
          .attr("y1", y)
          .attr("x2", x2 - 12)
          .attr("y2", y)
          .attr("stroke", color)
          .attr("stroke-width", 8)
          .attr("opacity", 0.15);
      }

      g.append("line")
        .attr("x1", x1)
        .attr("y1", y)
        .attr("x2", x2 - 12)
        .attr("y2", y)
        .attr("stroke", color)
        .attr("stroke-width", isActive ? 2.5 : 1.5);

      // Arrowhead
      g.append("polygon")
        .attr("points", `${x2 - 12},${y - 5} ${x2},${y} ${x2 - 12},${y + 5}`)
        .attr("fill", color);

      const midX = (x1 + x2) / 2;

      // Decay mode badge background
      const badgeLabel =
        step.decayMode === "beta-"
          ? "β⁻"
          : step.decayMode === "beta+"
            ? "β⁺"
            : step.decayMode === "alpha"
              ? "α"
              : step.decayMode;

      g.append("rect")
        .attr("x", midX - 14)
        .attr("y", y - 27)
        .attr("width", 28)
        .attr("height", 16)
        .attr("rx", 8)
        .attr("fill", `${color}22`)
        .attr("stroke", `${color}55`)
        .attr("stroke-width", 0.8);

      g.append("text")
        .attr("x", midX)
        .attr("y", y - 15)
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .attr("font-size", "9.5px")
        .attr("font-family", "monospace")
        .attr("font-weight", isActive ? "bold" : "normal")
        .text(badgeLabel);

      // half-life below
      g.append("text")
        .attr("x", midX)
        .attr("y", y + 24)
        .attr("text-anchor", "middle")
        .attr("fill", isActive ? "#d1d5db" : "#6b7280")
        .attr("font-size", "7.5px")
        .attr("font-family", "monospace")
        .text(step.halfLifeStr);
    });
  }, [activeStep, chain, centerY]);

  // Drag panning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2))),
    );
  };

  const currentStep = chain[activeStep] ?? chain[chain.length - 1];
  const zoomPct = Math.round(zoom * 100);

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      data-ocid="decay-chain.page"
    >
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-5">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="audience-badge audience-intermediate">
              Intermediate
            </Badge>
            <Badge className="audience-badge audience-professional">
              D3 · SVG
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            U-238 Decay Chain Explorer
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Step through all 14 decay transitions from Uranium-238 to stable
            Lead-206. Each step shows the decay mode, half-life, and energy
            released.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8 flex flex-col gap-6">
        {/* Legend */}
        <div
          className="flex flex-wrap gap-4 text-xs text-muted-foreground"
          aria-label="Decay mode color legend"
        >
          {Object.entries(DECAY_LABELS).map(([mode, label]) => (
            <div key={mode} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: DECAY_COLORS[mode] }}
                aria-hidden="true"
              />
              {label}
            </div>
          ))}
        </div>

        {/* Zoom toolbar */}
        <div
          className="flex items-center gap-2"
          role="toolbar"
          aria-label="Zoom controls"
        >
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-1 shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 rounded-full p-0"
              onClick={() =>
                setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
              }
              aria-label="Zoom out"
              data-ocid="decay-chain.zoom_out_button"
              disabled={zoom <= MIN_ZOOM}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span
              className="font-mono text-xs text-foreground min-w-[3.2rem] text-center select-none"
              aria-live="polite"
            >
              {zoomPct}%
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 rounded-full p-0"
              onClick={() =>
                setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
              }
              aria-label="Zoom in"
              data-ocid="decay-chain.zoom_in_button"
              disabled={zoom >= MAX_ZOOM}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <div className="h-4 w-px bg-border mx-1" aria-hidden="true" />
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 rounded-full text-xs gap-1"
              onClick={() => {
                setZoom(fitZoom);
                recalcFit();
              }}
              aria-label="Reset zoom to fit"
              data-ocid="decay-chain.zoom_reset_button"
            >
              <RotateCcw className="h-3 w-3" />
              Fit
            </Button>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Drag to pan · Scroll to zoom
          </span>
        </div>

        {/* SVG Graph */}
        <div
          ref={containerRef}
          className="rounded-2xl border border-border bg-card overflow-hidden cursor-grab active:cursor-grabbing"
          style={{
            height: Math.max(svgH * fitZoom + 32, 160),
            position: "relative",
          }}
          data-ocid="decay-chain.svg_graph"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          aria-label="U-238 decay chain — drag to pan, scroll to zoom"
        >
          <div
            style={{
              position: "absolute",
              transform: `translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: "0 0",
              willChange: "transform",
              pointerEvents: "none",
            }}
          >
            <svg
              ref={svgRef}
              width={svgW}
              height={svgH}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "0 0",
                display: "block",
              }}
              role="img"
              aria-label="U-238 decay chain to Pb-206, directed graph from left to right"
            >
              <title>U-238 Decay Chain to Pb-206</title>
              {/* Node boxes rendered in SVG for proper hit-testing */}
              {nodes.map((node, i) => {
                const isActive = i === activeStep;
                const modeColor =
                  DECAY_COLORS[node.step.decayMode] ?? DECAY_COLORS.other;
                const handleStep = () => setActiveStep(i);
                return (
                  <g
                    key={node.label}
                    data-ocid={`decay-chain.node.${i + 1}`}
                    style={{ pointerEvents: "auto" }}
                  >
                    {/* Active glow */}
                    {isActive && (
                      <rect
                        x={node.x - 3}
                        y={node.y - 3}
                        width={NODE_W + 6}
                        height={NODE_H + 6}
                        rx={10}
                        fill={`${modeColor}18`}
                        stroke={`${modeColor}40`}
                        strokeWidth={1}
                      />
                    )}
                    <rect
                      x={node.x}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx={7}
                      fill={isActive ? `${modeColor}20` : "#1f293788"}
                      stroke={isActive ? modeColor : "#374151"}
                      strokeWidth={isActive ? 2 : 1}
                      tabIndex={0}
                      role="button"
                      aria-label={`${node.label}, step ${i + 1}`}
                      onClick={handleStep}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleStep();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x={node.x + NODE_W / 2}
                      y={node.y + 20}
                      textAnchor="middle"
                      fill={isActive ? modeColor : "#e5e7eb"}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                      pointerEvents="none"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + NODE_W / 2}
                      y={node.y + 35}
                      textAnchor="middle"
                      fill={isActive ? "#9ca3af" : "#6b7280"}
                      fontSize="9"
                      fontFamily="monospace"
                      pointerEvents="none"
                    >
                      Z={node.step.Z} A={node.step.A}
                    </text>
                  </g>
                );
              })}
              {/* Terminal Pb-206 node */}
              <g
                data-ocid={`decay-chain.node.${chain.length + 1}`}
                style={{ pointerEvents: "auto" }}
              >
                <rect
                  x={terminalNode.x}
                  y={terminalNode.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={7}
                  fill={
                    activeStep === chain.length - 1 ? "#4ade8020" : "#1f293788"
                  }
                  stroke={
                    activeStep === chain.length - 1 ? "#4ade80" : "#374151"
                  }
                  strokeWidth={activeStep === chain.length - 1 ? 2 : 1}
                  tabIndex={0}
                  role="button"
                  aria-label="Pb-206, stable end product"
                  onClick={() => setActiveStep(chain.length - 1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setActiveStep(chain.length - 1);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <text
                  x={terminalNode.x + NODE_W / 2}
                  y={terminalNode.y + 20}
                  textAnchor="middle"
                  fill="#e5e7eb"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                  pointerEvents="none"
                >
                  Pb-206
                </text>
                <text
                  x={terminalNode.x + NODE_W / 2}
                  y={terminalNode.y + 35}
                  textAnchor="middle"
                  fill="#4ade80"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  STABLE
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Step controls */}
        <div
          className="flex items-center justify-between gap-4"
          data-ocid="decay-chain.step_controls"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
            disabled={activeStep === 0}
            aria-label="Previous decay step"
            data-ocid="decay-chain.step_back_button"
          >
            <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
            Step Back
          </Button>
          <span className="text-sm text-muted-foreground">
            Step{" "}
            <span className="font-mono font-bold text-foreground">
              {activeStep + 1}
            </span>{" "}
            of{" "}
            <span className="font-mono font-bold text-foreground">
              {chain.length}
            </span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setActiveStep((s) => Math.min(chain.length - 1, s + 1))
            }
            disabled={activeStep === chain.length - 1}
            aria-label="Next decay step"
            data-ocid="decay-chain.step_forward_button"
          >
            Step Forward
            <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Button>
        </div>

        {/* Details panel */}
        <div
          className="rounded-xl border border-border bg-card p-6"
          data-ocid="decay-chain.details_panel"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background:
                      DECAY_COLORS[currentStep.decayMode] ?? DECAY_COLORS.other,
                  }}
                  aria-hidden="true"
                />
                <h2 className="font-display font-bold text-foreground text-lg">
                  {currentStep.nuclide} → {currentStep.daughter}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {currentStep.decayMode === "beta-"
                  ? "β⁻ decay"
                  : currentStep.decayMode === "beta+"
                    ? "β⁺ decay"
                    : currentStep.decayMode === "alpha"
                      ? "α decay"
                      : currentStep.decayMode}{" "}
                · {currentStep.particleEmitted}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadCSV(chain)}
              aria-label="Download decay chain as CSV"
              data-ocid="decay-chain.csv_download_button"
            >
              <Download className="h-4 w-4 mr-1.5" aria-hidden="true" />
              Export CSV
            </Button>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Parent", value: currentStep.nuclide },
              { label: "Daughter", value: currentStep.daughter },
              { label: "Half-life", value: currentStep.halfLifeStr },
              {
                label: "Q-value",
                value: `${currentStep.Qvalue_MeV} MeV`,
              },
              { label: "Branching", value: `${currentStep.branchingPercent}%` },
              { label: "Particle", value: currentStep.particleEmitted },
              { label: "Z (parent)", value: currentStep.Z },
              { label: "A (parent)", value: currentStep.A },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                  {label}
                </dt>
                <dd className="font-mono text-sm font-semibold text-foreground">
                  {String(value)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-lg bg-muted/40 border border-border p-4 text-sm text-muted-foreground leading-relaxed">
            {decayDescription(currentStep)}
          </div>
        </div>

        {/* Accessibility table fallback */}
        <details
          className="rounded-xl border border-border bg-card"
          data-ocid="decay-chain.table_fallback"
        >
          <summary className="cursor-pointer px-5 py-3 text-sm font-semibold text-foreground select-none hover:bg-muted/40 rounded-xl">
            Accessible Table — All 14 Decay Steps
          </summary>
          <div className="overflow-x-auto p-4">
            <table
              className="w-full text-xs text-left"
              aria-label="U-238 decay chain data table"
            >
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  {[
                    "Step",
                    "Nuclide",
                    "Mode",
                    "Daughter",
                    "Half-life",
                    "Q (MeV)",
                    "Branching",
                  ].map((h) => (
                    <th
                      key={h}
                      className="pb-2 pr-4 font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chain.map((step) => (
                  <tr
                    key={step.stepIndex}
                    className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                    data-ocid={`decay-chain.table_row.${step.stepIndex}`}
                  >
                    <td className="py-2 pr-4 font-mono">{step.stepIndex}</td>
                    <td className="py-2 pr-4 font-mono font-bold">
                      {step.nuclide}
                    </td>
                    <td
                      className="py-2 pr-4 font-mono"
                      style={{ color: DECAY_COLORS[step.decayMode] }}
                    >
                      {step.decayMode}
                    </td>
                    <td className="py-2 pr-4 font-mono">{step.daughter}</td>
                    <td className="py-2 pr-4 font-mono">{step.halfLifeStr}</td>
                    <td className="py-2 pr-4 font-mono">{step.Qvalue_MeV}</td>
                    <td className="py-2 font-mono">{step.branchingPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}
