import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type DecayStep, u238DecayChain } from "@/data/decayChain";
import * as d3 from "d3";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const NODE_W = 80;
const NODE_H = 48;
const SPACING_X = 130;
const SVG_MARGIN = 20;

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
  const svgRef = useRef<SVGSVGElement>(null);

  const chain = u238DecayChain;
  const totalNodes = chain.length + 1; // include final daughter Pb-206 as a terminal node
  const svgWidth = totalNodes * SPACING_X + SVG_MARGIN * 2 + NODE_W;
  const svgHeight = 160;
  const centerY = svgHeight / 2;

  // Build node list (parents + final stable Pb-206 node)
  const nodes = chain.map((step, i) => ({
    x: SVG_MARGIN + i * SPACING_X,
    y: centerY - NODE_H / 2,
    label: step.nuclide,
    step,
  }));
  // Terminal node
  const terminalNode = {
    x: SVG_MARGIN + chain.length * SPACING_X,
    y: centerY - NODE_H / 2,
    label: "Pb-206",
    step: chain[chain.length - 1],
  };

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Draw edges
    svg.selectAll(".decay-edge").remove();
    chain.forEach((step, i) => {
      const x1 = SVG_MARGIN + i * SPACING_X + NODE_W;
      const x2 = SVG_MARGIN + (i + 1) * SPACING_X;
      const y = centerY;
      const color = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
      const isActive = i === activeStep;

      const g = svg
        .append("g")
        .attr("class", "decay-edge")
        .attr("opacity", isActive ? 1 : 0.35);

      // Arrow line
      g.append("line")
        .attr("x1", x1)
        .attr("y1", y)
        .attr("x2", x2 - 10)
        .attr("y2", y)
        .attr("stroke", color)
        .attr("stroke-width", isActive ? 2.5 : 1.5)
        .attr("stroke-dasharray", isActive ? "none" : "none");

      // Arrowhead
      g.append("polygon")
        .attr("points", `${x2 - 10},${y - 5} ${x2},${y} ${x2 - 10},${y + 5}`)
        .attr("fill", color);

      // Edge label (decay type)
      const midX = (x1 + x2) / 2;
      g.append("text")
        .attr("x", midX)
        .attr("y", y - 14)
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .attr("font-size", "9px")
        .attr("font-family", "monospace")
        .text(
          step.decayMode === "beta-"
            ? "β⁻"
            : step.decayMode === "beta+"
              ? "β⁺"
              : step.decayMode === "alpha"
                ? "α"
                : step.decayMode,
        );

      // half-life label
      g.append("text")
        .attr("x", midX)
        .attr("y", y + 22)
        .attr("text-anchor", "middle")
        .attr("fill", "#9ca3af")
        .attr("font-size", "8px")
        .attr("font-family", "monospace")
        .text(step.halfLifeStr);
    });
  }, [activeStep, chain, centerY]);

  const currentStep = chain[activeStep] ?? chain[chain.length - 1];

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

        {/* SVG Graph */}
        <div
          className="rounded-2xl border border-border bg-card overflow-x-auto"
          data-ocid="decay-chain.svg_graph"
        >
          <div style={{ minWidth: svgWidth }} className="p-4">
            <svg
              ref={svgRef}
              width={svgWidth}
              height={svgHeight}
              role="img"
              aria-label="U-238 decay chain to Pb-206, directed graph from left to right"
            >
              <title>U-238 Decay Chain to Pb-206</title>
              {/* Render node boxes */}
              {nodes.map((node, i) => {
                const isActive = i === activeStep;
                const modeColor =
                  DECAY_COLORS[node.step.decayMode] ?? DECAY_COLORS.other;
                const handleStep = () => setActiveStep(i);
                return (
                  <g key={node.label} data-ocid={`decay-chain.node.${i + 1}`}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx={6}
                      fill={isActive ? `${modeColor}22` : "transparent"}
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
                      y={node.y + 18}
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
                      y={node.y + 32}
                      textAnchor="middle"
                      fill="#9ca3af"
                      fontSize="9"
                      fontFamily="monospace"
                      pointerEvents="none"
                    >
                      Z={node.step.Z} N={node.step.N}
                    </text>
                  </g>
                );
              })}
              {/* Terminal Pb-206 node */}
              <g data-ocid={`decay-chain.node.${chain.length + 1}`}>
                <rect
                  x={terminalNode.x}
                  y={terminalNode.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill={
                    activeStep === chain.length - 1
                      ? "#9ca3af22"
                      : "transparent"
                  }
                  stroke="#9ca3af"
                  strokeWidth={1}
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
                  y={terminalNode.y + 18}
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
                  y={terminalNode.y + 32}
                  textAnchor="middle"
                  fill="#4ade80"
                  fontSize="9"
                  fontFamily="monospace"
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
