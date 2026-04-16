import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type DecayMode, type Nuclide, nuclides } from "@/data/nuclides";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const CELL_SIZE = 14;
const CELL_GAP = 1;
const STEP = CELL_SIZE + CELL_GAP;

type FilterMode = DecayMode | "all";
type Palette = "default" | "deuteranopia";

const COLOR_MAPS: Record<Palette, Record<string, string>> = {
  default: {
    stable: "#9ca3af",
    alpha: "#fbbf24",
    "beta-": "#60a5fa",
    "beta+": "#4ade80",
    gamma: "#c084fc",
    other: "#22d3ee",
  },
  deuteranopia: {
    stable: "#9ca3af",
    alpha: "#f97316",
    "beta-": "#3b82f6",
    "beta+": "#e879f9",
    gamma: "#facc15",
    other: "#22d3ee",
  },
};

const FILTER_OPTIONS: { label: string; value: FilterMode }[] = [
  { label: "All", value: "all" },
  { label: "Alpha", value: "alpha" },
  { label: "Beta⁻", value: "beta-" },
  { label: "Beta⁺", value: "beta+" },
  { label: "Stable", value: "stable" },
  { label: "Gamma", value: "gamma" },
];

function getColor(nuclide: Nuclide, palette: Palette): string {
  const primary = nuclide.decayModes[0] ?? "other";
  return COLOR_MAPS[palette][primary] ?? COLOR_MAPS[palette].other;
}

export default function NuclideChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<Nuclide | null>(null);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [palette, setPalette] = useState<Palette>("default");

  const displayed =
    filter === "all"
      ? nuclides
      : nuclides.filter((n) => n.decayModes.includes(filter as DecayMode));

  const maxN = Math.max(...nuclides.map((n) => n.N));
  const maxZ = Math.max(...nuclides.map((n) => n.Z));

  const svgW = (maxN + 2) * STEP + 60;
  const svgH = (maxZ + 2) * STEP + 60;

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".nuclide-cell").remove();
    svg.selectAll(".axis-label").remove();

    // Axis tick labels every 10
    for (let n = 0; n <= maxN; n += 10) {
      svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", 45 + n * STEP + CELL_SIZE / 2)
        .attr("y", 18)
        .attr("text-anchor", "middle")
        .attr("fill", "#6b7280")
        .attr("font-size", "9px")
        .text(n);
    }
    for (let z = 0; z <= maxZ; z += 10) {
      svg
        .append("text")
        .attr("class", "axis-label")
        .attr("x", 20)
        .attr("y", svgH - 35 - z * STEP + CELL_SIZE / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", "#6b7280")
        .attr("font-size", "9px")
        .text(z);
    }

    // Nuclide cells
    for (const n of displayed) {
      const cx = 45 + n.N * STEP;
      const cy = svgH - 35 - n.Z * STEP;
      const color = getColor(n, palette);

      svg
        .append("rect")
        .attr("class", "nuclide-cell")
        .attr("x", cx)
        .attr("y", cy)
        .attr("width", CELL_SIZE)
        .attr("height", CELL_SIZE)
        .attr("rx", 1.5)
        .attr("fill", color)
        .attr("opacity", selected?.symbol === n.symbol ? 1 : 0.85)
        .attr("stroke", selected?.symbol === n.symbol ? "#fff" : "transparent")
        .attr("stroke-width", 1.5)
        .attr("tabindex", "0")
        .attr("role", "button")
        .attr(
          "aria-label",
          `${n.name}, Z=${n.Z}, N=${n.N}, ${n.decayModes.join("/")} decay, half-life: ${n.halfLifeStr}`,
        )
        .style("cursor", "pointer")
        .on("click", () => setSelected(n))
        .on("keydown", (evt: KeyboardEvent) => {
          if (evt.key === "Enter" || evt.key === " ") setSelected(n);
        });
    }
  }, [displayed, palette, selected, maxN, maxZ, svgH]);

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      data-ocid="nuclide-chart.page"
    >
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="audience-badge audience-advanced">Advanced</Badge>
            <Badge className="audience-badge audience-professional">
              D3 · Heatmap
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Chart of Nuclides
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Interactive Z–N grid of {nuclides.length} nuclides colored by
            primary decay mode. Click any square for details. Data sourced from
            ENSDF/NNDC.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6 flex flex-col gap-5">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <fieldset
            className="flex flex-wrap gap-2 border-0 p-0 m-0"
            aria-label="Filter by decay mode"
            data-ocid="nuclide-chart.filter_group"
          >
            <legend className="sr-only">Filter by decay mode</legend>
            {FILTER_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                size="sm"
                variant={filter === opt.value ? "default" : "outline"}
                onClick={() => setFilter(opt.value)}
                aria-pressed={filter === opt.value}
                data-ocid={`nuclide-chart.filter_${opt.value}`}
              >
                {opt.label}
              </Button>
            ))}
          </fieldset>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPalette((p) => (p === "default" ? "deuteranopia" : "default"))
            }
            data-ocid="nuclide-chart.palette_toggle"
            aria-label={`Switch to ${palette === "default" ? "deuteranopia-safe" : "default"} color palette`}
          >
            {palette === "default"
              ? "🎨 Colorblind-Safe"
              : "🎨 Default Palette"}
          </Button>
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-4 text-xs text-muted-foreground"
          aria-label="Color legend"
        >
          {Object.entries(COLOR_MAPS[palette]).map(([mode, color]) => (
            <div key={mode} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ background: color }}
                aria-hidden="true"
              />
              {mode}
            </div>
          ))}
        </div>

        {/* SVG chart */}
        <div
          className="rounded-2xl border border-border bg-card overflow-auto"
          data-ocid="nuclide-chart.svg_container"
        >
          <div style={{ minWidth: Math.min(svgW, 900) }}>
            <svg
              ref={svgRef}
              width={svgW}
              height={svgH}
              role="img"
              aria-label={`Chart of Nuclides: ${displayed.length} nuclides shown. X-axis: neutron number N. Y-axis: proton number Z.`}
            >
              <title>Chart of Nuclides — Z vs N heatmap</title>
              {/* Axis labels */}
              <text
                x={svgW / 2}
                y={svgH - 8}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="10"
                fontFamily="monospace"
              >
                Neutron Number (N) →
              </text>
              <text
                transform={`translate(10, ${svgH / 2}) rotate(-90)`}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="10"
                fontFamily="monospace"
              >
                Proton Number (Z) →
              </text>
            </svg>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {displayed.length} of {nuclides.length} nuclides. Click any
          colored square to see details.
        </p>
      </div>

      {/* Detail Modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent
          className="max-w-md"
          data-ocid="nuclide-chart.detail_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              {selected && (
                <span
                  className="inline-block h-4 w-4 rounded-sm"
                  style={{
                    background: selected
                      ? getColor(selected, palette)
                      : "transparent",
                  }}
                  aria-hidden="true"
                />
              )}
              {selected?.name ?? "Nuclide"}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <dl className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: "Symbol", value: selected.symbol },
                { label: "Atomic number (Z)", value: selected.Z },
                { label: "Neutrons (N)", value: selected.N },
                { label: "Mass number (A)", value: selected.A },
                { label: "Half-life", value: selected.halfLifeStr },
                {
                  label: "Decay modes",
                  value: selected.decayModes.join(", "),
                },
                {
                  label: "Q-value",
                  value:
                    selected.Qvalue_MeV != null
                      ? `${selected.Qvalue_MeV} MeV`
                      : "—",
                },
                {
                  label: "Binding energy / nucleon",
                  value:
                    selected.bindingEnergyPerNucleon_MeV != null
                      ? `${selected.bindingEnergyPerNucleon_MeV} MeV`
                      : "—",
                },
                {
                  label: "Mass excess",
                  value:
                    selected.massExcess_keV != null
                      ? `${selected.massExcess_keV} keV`
                      : "—",
                },
                {
                  label: "Natural abundance",
                  value:
                    selected.abundance != null ? `${selected.abundance}%` : "—",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                    {label}
                  </dt>
                  <dd className="font-mono text-sm font-semibold text-foreground">
                    {String(value)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
