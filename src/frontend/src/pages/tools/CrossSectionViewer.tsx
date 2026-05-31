import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  e: number;
  b: number;
}

interface Series {
  key: string;
  label: string;
  color: string;
  data: DataPoint[];
}

const allSeries: Series[] = [
  {
    key: "U235_fission",
    label: "U-235 Fission",
    color: "#ef4444",
    data: [
      { e: 0.025, b: 585 },
      { e: 1, b: 1.5 },
      { e: 100, b: 8 },
      { e: 1000, b: 25 },
      { e: 10000, b: 9 },
      { e: 1e6, b: 1.2 },
      { e: 1e7, b: 1.8 },
    ],
  },
  {
    key: "U235_capture",
    label: "U-235 Capture",
    color: "#3b82f6",
    data: [
      { e: 0.025, b: 99 },
      { e: 1, b: 2.0 },
      { e: 100, b: 15 },
      { e: 1000, b: 5 },
      { e: 1e6, b: 0.1 },
    ],
  },
  {
    key: "U238_capture",
    label: "U-238 Capture",
    color: "#60a5fa",
    data: [
      { e: 0.025, b: 2.7 },
      { e: 6.67, b: 2000 },
      { e: 21, b: 800 },
      { e: 37, b: 300 },
      { e: 1000, b: 40 },
      { e: 1e6, b: 0.5 },
    ],
  },
  {
    key: "U238_fission",
    label: "U-238 Fission",
    color: "#f87171",
    data: [
      { e: 1e6, b: 0.01 },
      { e: 2e6, b: 0.3 },
      { e: 1e7, b: 0.55 },
    ],
  },
  {
    key: "Pu239_fission",
    label: "Pu-239 Fission",
    color: "#dc2626",
    data: [
      { e: 0.025, b: 750 },
      { e: 1, b: 2 },
      { e: 100, b: 30 },
      { e: 1000, b: 15 },
      { e: 1e6, b: 1.8 },
      { e: 1e7, b: 2.1 },
    ],
  },
  {
    key: "H1_elastic",
    label: "H-1 Elastic",
    color: "#22c55e",
    data: [
      { e: 0.025, b: 20 },
      { e: 1, b: 18 },
      { e: 1000, b: 12 },
      { e: 1e6, b: 4 },
      { e: 1e7, b: 1 },
    ],
  },
  {
    key: "H1_capture",
    label: "H-1 Capture",
    color: "#86efac",
    data: [
      { e: 0.025, b: 0.33 },
      { e: 1, b: 0.1 },
      { e: 1000, b: 0.003 },
    ],
  },
  {
    key: "B10_nalpha",
    label: "B-10 (n,α)",
    color: "#f59e0b",
    data: [
      { e: 0.025, b: 3837 },
      { e: 1, b: 300 },
      { e: 100, b: 50 },
      { e: 1000, b: 15 },
      { e: 1e6, b: 0.5 },
    ],
  },
  {
    key: "Xe135_capture",
    label: "Xe-135 Capture",
    color: "#a855f7",
    data: [
      { e: 0.025, b: 2650000 },
      { e: 0.1, b: 800000 },
      { e: 1, b: 100000 },
      { e: 100, b: 5000 },
    ],
  },
  {
    key: "Cd113_capture",
    label: "Cd-113 Capture",
    color: "#c084fc",
    data: [
      { e: 0.025, b: 20600 },
      { e: 0.1, b: 8000 },
      { e: 1, b: 1000 },
      { e: 100, b: 50 },
    ],
  },
  {
    key: "Fe56_elastic",
    label: "Fe-56 Elastic",
    color: "#14b8a6",
    data: [
      { e: 0.025, b: 11 },
      { e: 1000, b: 8 },
      { e: 1e6, b: 4 },
      { e: 1e7, b: 2 },
    ],
  },
];

const nuclideOptions = [
  { key: "U235", label: "U-235" },
  { key: "U238", label: "U-238" },
  { key: "Pu239", label: "Pu-239" },
  { key: "H1", label: "H-1" },
  { key: "B10", label: "B-10" },
  { key: "Xe135", label: "Xe-135" },
  { key: "Cd113", label: "Cd-113" },
  { key: "Fe56", label: "Fe-56" },
];

const reactionTypes = [
  { key: "fission", label: "Fission", color: "#ef4444" },
  { key: "capture", label: "Capture", color: "#3b82f6" },
  { key: "elastic", label: "Elastic", color: "#22c55e" },
  { key: "nalpha", label: "(n,α)", color: "#f59e0b" },
];

function formatEnergy(v: number): string {
  if (v >= 1e6) return `${(v / 1e6).toFixed(0)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(0)}k`;
  if (v >= 1) return `${v.toFixed(0)}`;
  if (v >= 0.001) return `${v.toFixed(3)}`;
  return v.toExponential(1);
}

function formatBarns(v: number): string {
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}k`;
  return v.toFixed(2);
}

export default function CrossSectionViewer() {
  const [selectedNuclides, setSelectedNuclides] = useState<string[]>([
    "U235",
    "U238",
  ]);
  const [selectedReactions, setSelectedReactions] = useState<string[]>([
    "fission",
    "capture",
  ]);

  function toggleNuclide(n: string) {
    setSelectedNuclides((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
    );
  }

  function toggleReaction(r: string) {
    setSelectedReactions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    );
  }

  const activeSeries = allSeries.filter((s) => {
    const nuclideMatch = selectedNuclides.some((n) => s.key.startsWith(n));
    const reactionMatch = selectedReactions.some((r) =>
      s.key.toLowerCase().includes(r.toLowerCase()),
    );
    return nuclideMatch && reactionMatch;
  });

  // Build merged data for recharts
  const allEnergies = Array.from(
    new Set(activeSeries.flatMap((s) => s.data.map((d) => d.e))),
  ).sort((a, b) => a - b);

  const chartData = allEnergies.map((e) => {
    const row: Record<string, number | string> = {
      e: formatEnergy(e),
      rawE: e,
    };
    for (const s of activeSeries) {
      const pt = s.data.find((d) => d.e === e);
      row[s.key] = pt ? pt.b : Number.NaN;
    }
    return row;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Neutron Cross-Section Viewer"
        subtitle="Interactive visualization of neutron interaction cross-sections from the ENDF/B-VIII.0 evaluated nuclear data library."
      />

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SectionCard>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Nuclides
          </h3>
          <div className="flex flex-wrap gap-2">
            {nuclideOptions.map((n) => (
              <button
                key={n.key}
                type="button"
                onClick={() => toggleNuclide(n.key)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all glow-focus border",
                  selectedNuclides.includes(n.key)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40",
                )}
                data-ocid={`cross.nuclide_${n.key}_toggle`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Reaction Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {reactionTypes.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => toggleReaction(r.key)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all glow-focus border flex items-center gap-1.5",
                  selectedReactions.includes(r.key)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40",
                )}
                data-ocid={`cross.reaction_${r.key}_toggle`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                {r.label}
              </button>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Chart */}
      <SectionCard className="p-4 mb-6" data-ocid="cross.chart_container">
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
            >
              <XAxis
                dataKey="e"
                type="category"
                label={{
                  value: "Energy (eV)",
                  position: "insideBottom",
                  offset: -20,
                  fill: "#94a3b8",
                }}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                scale="log"
                domain={["auto", "auto"]}
                label={{
                  value: "Cross-section (barns)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#94a3b8",
                }}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(v: number) => formatBarns(v)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
                formatter={(value: number, name: string) => [
                  formatBarns(value),
                  name,
                ]}
              />
              {activeSeries.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: s.color }}
                  connectNulls={false}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* Educational callout */}
      <SectionCard className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Energy Regions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-primary">Thermal Region</p>
            <p className="text-muted-foreground">
              &lt; 1 eV — Neutrons in thermal equilibrium with moderator.
              Cross-sections follow 1/v law. U-235 thermal fission cross-section
              ~585 barns.
            </p>
          </div>
          <div>
            <p className="font-medium text-primary">Resonance Region</p>
            <p className="text-muted-foreground">
              1 eV – 1 keV — Sharp resonance peaks in heavy nuclei (U-238 at
              6.67 eV). Self-shielding and Doppler broadening are critical here.
            </p>
          </div>
          <div>
            <p className="font-medium text-primary">Fast Region</p>
            <p className="text-muted-foreground">
              &gt; 1 MeV — Fission neutrons born at ~2 MeV. Cross-sections
              smooth and lower. Fast reactors operate primarily in this region.
            </p>
          </div>
        </div>
      </SectionCard>

      <p className="text-xs text-muted-foreground text-center">
        Data approximated from ENDF/B-VIII.0 (BNL/NNDC)
      </p>
    </div>
  );
}
