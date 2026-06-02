import { AudienceBadge } from "@/components/AudienceBadge";
import { CitationMarker } from "@/components/CitationMarker";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Orbital type ─────────────────────────────────────────────────────────────
type OrbitalKey = "1s" | "2s" | "2p" | "3s" | "3p" | "3d" | "4s" | "4f";

interface OrbitalInfo {
  label: string;
  n: number;
  l: number;
  m: number;
  shape: string;
  description: string;
  color: string;
  glowColor: string;
}

const ORBITALS: Record<OrbitalKey, OrbitalInfo> = {
  "1s": {
    label: "1s",
    n: 1,
    l: 0,
    m: 0,
    shape: "Spherical",
    description:
      "The lowest-energy orbital — a perfect sphere centred on the nucleus. Contains the electron 90% of the time inside a single lobe.",
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,0.4)",
  },
  "2s": {
    label: "2s",
    n: 2,
    l: 0,
    m: 0,
    shape: "Spherical (with node)",
    description:
      "Like 1s but larger, with one radial node — a spherical shell of zero probability between two density regions.",
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.4)",
  },
  "2p": {
    label: "2p",
    n: 2,
    l: 1,
    m: 0,
    shape: "Dumbbell",
    description:
      "Two lobes of high density along one axis. There are three degenerate 2p orbitals (m = −1, 0, +1) aligned along x, y, z.",
    color: "#f97316",
    glowColor: "rgba(249,115,22,0.4)",
  },
  "3s": {
    label: "3s",
    n: 3,
    l: 0,
    m: 0,
    shape: "Spherical (2 nodes)",
    description:
      "Third shell s-orbital with two radial nodes. The electron density is diffuse and extends further from the nucleus.",
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,0.4)",
  },
  "3p": {
    label: "3p",
    n: 3,
    l: 1,
    m: 0,
    shape: "Dumbbell (larger)",
    description:
      "Like 2p but with one radial node per lobe, making the orbital significantly larger and more diffuse.",
    color: "#fb923c",
    glowColor: "rgba(251,146,60,0.4)",
  },
  "3d": {
    label: "3d",
    n: 3,
    l: 2,
    m: 0,
    shape: "Four-lobed (clover)",
    description:
      "Four petal-like lobes in two planes (for d_z² a donut around a central lobe). Five degenerate 3d orbitals (m = −2 to +2). Critical for transition metal chemistry.",
    color: "#fbbf24",
    glowColor: "rgba(251,191,36,0.4)",
  },
  "4s": {
    label: "4s",
    n: 4,
    l: 0,
    m: 0,
    shape: "Spherical (3 nodes)",
    description:
      "Fourth shell s-orbital. Fills before 3d due to penetration effects (Aufbau). Three radial nodes, very diffuse.",
    color: "#38bdf8",
    glowColor: "rgba(56,189,248,0.4)",
  },
  "4f": {
    label: "4f",
    n: 4,
    l: 3,
    m: 0,
    shape: "Complex multi-lobed",
    description:
      "Seven degenerate 4f orbitals with complex angular dependence. Key for lanthanide and actinide electron configurations.",
    color: "#e879f9",
    glowColor: "rgba(232,121,249,0.4)",
  },
};

// ── Orbital 3D Canvas ─────────────────────────────────────────────────────────
function OrbitalCanvas({
  orbital,
  slice,
}: { orbital: OrbitalKey; slice: "3d" | "xy" | "xz" | "yz" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const computeDensity = useCallback(
    (x: number, y: number, z: number, key: OrbitalKey): number => {
      const r = Math.sqrt(x * x + y * y + z * z);
      if (r < 1e-6) return 0;
      const cosTheta = z / r;
      const _sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
      const phi = Math.atan2(y, x);

      switch (key) {
        case "1s": {
          const a = 4;
          const psi = Math.exp(-r / a);
          return psi * psi;
        }
        case "2s": {
          const a = 4;
          const rho = r / (2 * a);
          const R = Math.exp(-rho) * (1 - rho);
          return R * R;
        }
        case "2p": {
          const a = 4;
          const rho = r / (2 * a);
          const R = rho * Math.exp(-rho);
          return R * R * cosTheta * cosTheta;
        }
        case "3s": {
          const a = 5;
          const rho = r / (3 * a);
          const R =
            Math.exp(-rho / 3) * (1 - (2 * rho) / 3 + (2 * rho * rho) / 27);
          return R * R;
        }
        case "3p": {
          const a = 5;
          const rho = r / (3 * a);
          const R = rho * Math.exp(-rho / 3) * (1 - rho / 6);
          return R * R * cosTheta * cosTheta;
        }
        case "3d": {
          const a = 5;
          const rho = r / (3 * a);
          const R = rho * rho * Math.exp(-rho / 3);
          const Y = 3 * cosTheta * cosTheta - 1;
          return R * R * Y * Y;
        }
        case "4s": {
          const a = 6;
          const rho = r / (4 * a);
          const R =
            Math.exp(-rho) *
            (1 - 3 * rho + 1.5 * rho * rho - (rho * rho * rho) / 6);
          return R * R;
        }
        case "4f": {
          const a = 6;
          const rho = r / (4 * a);
          const R = rho * rho * rho * Math.exp(-rho);
          const Y = cosTheta * (5 * cosTheta * cosTheta - 3) * Math.cos(phi);
          return R * R * Y * Y;
        }
        default:
          return 0;
      }
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const info = ORBITALS[orbital];
    const particles: { x: number; y: number; z: number; opacity: number }[] =
      [];
    const N = slice === "3d" ? 1800 : 2500;
    const scale = 28;

    // Sample via rejection
    let attempts = 0;
    while (particles.length < N && attempts < N * 30) {
      attempts++;
      const px = (Math.random() - 0.5) * 2 * scale;
      const py = (Math.random() - 0.5) * 2 * scale;
      const pz = slice === "3d" ? (Math.random() - 0.5) * 2 * scale : 0;
      const d = computeDensity(px, py, pz, orbital);
      const threshold = 0.06;
      if (Math.random() < d / (d + threshold)) {
        const screenX = W / 2 + px * (W / (2.2 * scale));
        const screenY = H / 2 - py * (H / (2.2 * scale));
        particles.push({
          x: screenX,
          y: screenY,
          z: pz,
          opacity: Math.min(1, d * 40 + 0.2),
        });
      }
    }

    let t = 0;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0c14";
      ctx.fillRect(0, 0, W, H);

      // Nucleus
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 6);
      grad.addColorStop(0, "rgba(255,200,100,1)");
      grad.addColorStop(1, "rgba(255,100,50,0)");
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.02 + i * 0.1);
        const alpha = Math.min(1, p.opacity * pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, slice === "3d" ? 1.5 : 2, 0, Math.PI * 2);
        // Parse color
        const hex = info.color;
        const r2 = Number.parseInt(hex.slice(1, 3), 16);
        const g2 = Number.parseInt(hex.slice(3, 5), 16);
        const b2 = Number.parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r2},${g2},${b2},${alpha})`;
        ctx.fill();
      }

      // Glow ring
      const ringR = 18 + 4 * Math.sin(t * 0.025);
      const ringGrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        ringR - 4,
        W / 2,
        H / 2,
        ringR + 10,
      );
      ringGrad.addColorStop(0, info.glowColor.replace("0.4", "0.15"));
      ringGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = info.glowColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      t++;
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [orbital, slice, computeDensity]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg"
      style={{ height: 320, background: "#0a0c14" }}
      aria-label={`${orbital} orbital probability density - ${slice} view`}
    />
  );
}

// ── Radial Distribution Chart ──────────────────────────────────────────────
function RadialDistributionChart({ orbital }: { orbital: OrbitalKey }) {
  const info = ORBITALS[orbital];
  const data = Array.from({ length: 120 }, (_, i) => {
    const r = (i + 0.5) * 0.5;
    let R2r2 = 0;
    const a = 1;
    switch (orbital) {
      case "1s":
        R2r2 = 4 * r * r * Math.exp((-2 * r) / a);
        break;
      case "2s": {
        const rho = r / (2 * a);
        R2r2 = r * r * (1 - rho / 2) ** 2 * Math.exp(-r / (2 * a));
        break;
      }
      case "2p": {
        const rho = r / (2 * a);
        R2r2 = r * r * rho * rho * Math.exp(-r / (2 * a));
        break;
      }
      case "3s": {
        const rho = (2 * r) / (3 * a);
        R2r2 =
          r * r * (1 - rho + (rho * rho) / 9) ** 2 * Math.exp(-r / (3 * a));
        break;
      }
      case "3p": {
        const rho = (2 * r) / (3 * a);
        R2r2 = r * r * rho * rho * (1 - rho / 6) ** 2 * Math.exp(-r / (3 * a));
        break;
      }
      case "3d": {
        const rho = (2 * r) / (3 * a);
        R2r2 = r * r * rho * rho * rho * rho * Math.exp(-r / (3 * a));
        break;
      }
      case "4s": {
        const rho = r / (4 * a);
        R2r2 =
          r *
          r *
          (1 - (3 * rho) / 2 + (rho * rho) / 4 - (rho * rho * rho) / 96) ** 2 *
          Math.exp(-r / (4 * a));
        break;
      }
      case "4f": {
        const rho = r / (4 * a);
        R2r2 = r * r * (rho * rho * rho) ** 2 * Math.exp(-r / (2 * a));
        break;
      }
    }
    return { r: Math.round(r * 10) / 10, P: Math.max(0, R2r2) };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="r"
          stroke="#666"
          tick={{ fontSize: 11 }}
          label={{
            value: "r (a₀)",
            position: "insideBottomRight",
            offset: -5,
            fill: "#888",
            fontSize: 12,
          }}
        />
        <YAxis stroke="#666" tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={{
            background: "#0a0c14",
            border: "1px solid #333",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <ReferenceLine
          x={info.n * info.n * 0.529 * 2}
          stroke={info.color}
          strokeDasharray="4 2"
          opacity={0.6}
        />
        <Line
          type="monotone"
          dataKey="P"
          stroke={info.color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          name="P(r)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Energy Level Diagram ───────────────────────────────────────────────────
const ENERGY_LEVELS: {
  key: OrbitalKey;
  energy: number;
  capacity: number;
  block: string;
}[] = [
  { key: "1s", energy: -13.6, capacity: 2, block: "s" },
  { key: "2s", energy: -3.4, capacity: 2, block: "s" },
  { key: "2p", energy: -3.4, capacity: 6, block: "p" },
  { key: "3s", energy: -1.51, capacity: 2, block: "s" },
  { key: "3p", energy: -1.51, capacity: 6, block: "p" },
  { key: "4s", energy: -0.85, capacity: 2, block: "s" },
  { key: "3d", energy: -0.85, capacity: 10, block: "d" },
  { key: "4f", energy: -0.54, capacity: 14, block: "f" },
];

function EnergyDiagram({
  selected,
  onSelect,
}: { selected: OrbitalKey; onSelect: (k: OrbitalKey) => void }) {
  const eMin = -14;
  const eMax = 0.2;
  const H = 320;

  const yPos = (e: number) => 16 + ((e - eMax) / (eMin - eMax)) * (H - 32);
  const blockColors: Record<string, string> = {
    s: "#60a5fa",
    p: "#f97316",
    d: "#fbbf24",
    f: "#e879f9",
  };

  return (
    <div className="relative" style={{ height: H }}>
      <svg width="100%" height={H} aria-label="Hydrogen energy level diagram">
        <title>Orbital visualization</title>
        {ENERGY_LEVELS.map((lvl) => {
          const y = yPos(lvl.energy);
          const isSelected = lvl.key === selected;
          const color = blockColors[lvl.block];
          return (
            <g
              key={lvl.key}
              className="cursor-pointer"
              onClick={() => onSelect(lvl.key)}
              onKeyDown={(e) => e.key === "Enter" && onSelect(lvl.key)}
              tabIndex={0}
              aria-label={`Select ${lvl.key} orbital`}
            >
              <line
                x1="60"
                y1={y}
                x2="240"
                y2={y}
                stroke={isSelected ? color : "rgba(255,255,255,0.25)"}
                strokeWidth={isSelected ? 3 : 1.5}
              />
              <text x="48" y={y + 4} fill="#aaa" fontSize="12" textAnchor="end">
                {lvl.energy} eV
              </text>
              <text
                x="248"
                y={y + 4}
                fill={color}
                fontSize="12"
                fontWeight={isSelected ? "bold" : "normal"}
              >
                {lvl.key}
              </text>
              {isSelected && (
                <rect
                  x="57"
                  y={y - 10}
                  width={186}
                  height={20}
                  fill={color}
                  fillOpacity={0.12}
                  rx={3}
                />
              )}
            </g>
          );
        })}
        <line
          x1="58"
          y1={16}
          x2="58"
          y2={H - 16}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />
        <text x="58" y={12} fill="#666" fontSize="11" textAnchor="middle">
          Energy
        </text>
      </svg>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Orbitals() {
  const [selectedOrbital, setSelectedOrbital] = useState<OrbitalKey>("1s");
  const [sliceView, setSliceView] = useState<"3d" | "xy" | "xz" | "yz">("3d");
  const [showPhase, setShowPhase] = useState(false);
  const info = ORBITALS[selectedOrbital];

  const sliceViews: { key: "3d" | "xy" | "xz" | "yz"; label: string }[] = [
    { key: "3d", label: "3D Cloud" },
    { key: "xy", label: "XY Plane" },
    { key: "xz", label: "XZ Plane" },
    { key: "yz", label: "YZ Plane" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <PageHeader
        title="The Quantum Mechanical Model: Electron Orbitals"
        subtitle="Explore the probability density clouds that define where electrons exist — from spherical s-orbitals to complex f-orbitals — with real-time interactive 3D visualizations."
        audienceLevel="advanced"
        readTimeMin={18}
      />

      {/* Orbital Selector + 3D View */}
      <SectionCard glowAccent data-ocid="orbitals.main_panel">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selector panel */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Select Orbital
            </h2>
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
              {(Object.keys(ORBITALS) as OrbitalKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  data-ocid={`orbitals.orbital_btn.${key}`}
                  onClick={() => setSelectedOrbital(key)}
                  style={{
                    borderColor:
                      selectedOrbital === key ? ORBITALS[key].color : undefined,
                    boxShadow:
                      selectedOrbital === key
                        ? `0 0 12px ${ORBITALS[key].glowColor}`
                        : undefined,
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm font-mono font-semibold transition-all duration-200 ${
                    selectedOrbital === key
                      ? "bg-muted text-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Quantum numbers */}
            <div className="rounded-lg bg-muted/30 p-4 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Quantum Numbers
              </h3>
              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span className="text-muted-foreground">n (principal)</span>
                <span
                  className="font-mono text-foreground"
                  style={{ color: info.color }}
                >
                  {info.n}
                </span>
                <span className="text-muted-foreground">l (azimuthal)</span>
                <span className="font-mono text-foreground">{info.l}</span>
                <span className="text-muted-foreground">m (magnetic)</span>
                <span className="font-mono text-foreground">{info.m}</span>
                <span className="text-muted-foreground">Shape</span>
                <span className="text-foreground">{info.shape}</span>
              </div>
            </div>

            {/* Phase toggle */}
            <button
              type="button"
              data-ocid="orbitals.phase_toggle"
              onClick={() => setShowPhase((p) => !p)}
              className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors border ${
                showPhase
                  ? "bg-primary/20 border-primary/50 text-primary"
                  : "bg-muted border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {showPhase ? "Phase: Real/Imaginary ON" : "Show Phase Coloring"}
            </button>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {info.description}
            </p>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              {sliceViews.map((sv) => (
                <button
                  key={sv.key}
                  type="button"
                  data-ocid={`orbitals.slice_view.${sv.key}`}
                  onClick={() => setSliceView(sv.key)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors border ${
                    sliceView === sv.key
                      ? "bg-primary/20 border-primary/50 text-primary"
                      : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sv.label}
                </button>
              ))}
            </div>
            <OrbitalCanvas
              key={`${selectedOrbital}-${sliceView}`}
              orbital={selectedOrbital}
              slice={sliceView}
            />
          </div>
        </div>
      </SectionCard>

      {/* Radial Distribution + Energy Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard data-ocid="orbitals.radial_chart">
          <h2 className="font-display text-lg font-semibold text-foreground mb-1">
            Radial Probability Distribution
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            P(r) = r² |R<sub>nl</sub>(r)|² — probability of finding the electron
            in a shell at radius r.
          </p>
          <RadialDistributionChart orbital={selectedOrbital} />
          <p className="text-xs text-muted-foreground mt-2">
            The dashed vertical line marks the most probable radius. Units: Bohr
            radii (a₀ ≈ 0.529 Å).
          </p>
        </SectionCard>

        <SectionCard data-ocid="orbitals.energy_diagram">
          <h2 className="font-display text-lg font-semibold text-foreground mb-1">
            Energy Level Diagram
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Click any level to jump to that orbital. Energies in eV for
            hydrogen.
          </p>
          <EnergyDiagram
            selected={selectedOrbital}
            onSelect={setSelectedOrbital}
          />
        </SectionCard>
      </div>

      {/* Equations */}
      <CollapsibleSection
        id="orbitals-equations"
        title="Hydrogen Wavefunctions & Probability Density"
        defaultOpen={true}
        data-ocid="orbitals.equations_section"
      >
        <div className="space-y-2">
          <AudienceBadge level="advanced" />
          <EquationBlock
            label="Hydrogen Wavefunction"
            latex="\\psi_{nlm}(r,\\theta,\\phi) = R_{nl}(r) \\cdot Y_l^m(\\theta,\\phi)"
            annotation="The full hydrogen wavefunction is the product of a radial function R_nl and a spherical harmonic Y_lm. n, l, m are the principal, azimuthal, and magnetic quantum numbers."
          />
          <EquationBlock
            label="Radial Wavefunction (1s)"
            latex="R_{10}(r) = 2\\left(\\frac{1}{a_0}\\right)^{3/2} e^{-r/a_0}"
            annotation="The 1s radial function is a simple decreasing exponential. a₀ = 0.529 Å is the Bohr radius. Maximum at r = 0, decaying smoothly outward."
          />
          <EquationBlock
            label="Probability Density"
            latex="P(r) = r^2 |R_{nl}(r)|^2"
            annotation="The radial probability density includes an r² factor from the spherical volume element 4πr² dr. This shifts the most probable radius away from zero."
          />
          <EquationBlock
            label="Spherical Harmonics (l=0)"
            latex="Y_0^0(\\theta,\\phi) = \\frac{1}{2\\sqrt{\\pi}}"
            annotation="s-orbitals (l=0) have spherically symmetric angular wavefunctions — constant in all directions. This is why 1s, 2s, 3s are perfect spheres."
          />
          <EquationBlock
            label="Spherical Harmonics (l=1)"
            latex="Y_1^0(\\theta,\\phi) = \\sqrt{\\frac{3}{4\\pi}} \\cos\\theta"
            annotation="p-orbitals (l=1, m=0) have a cos θ angular dependence, creating two lobes along the z-axis — the characteristic dumbbell shape of 2p_z."
          />
          <EquationBlock
            label="Energy Eigenvalues"
            latex="E_n = -\\frac{13.6\\,\\text{eV}}{n^2}"
            annotation="Hydrogen orbital energies depend only on n (in the non-relativistic, no-spin approximation). All orbitals with the same n are degenerate in hydrogen."
          />
          <EquationBlock
            label="Radial Wavefunction R₂₀ (2s)"
            latex="R_{20}(r) = \\frac{1}{2\\sqrt{2}}\\left(\\frac{1}{a_0}\\right)^{3/2}\\left(2 - \\frac{r}{a_0}\\right)e^{-r/2a_0}"
            annotation="The 2s radial function has one radial node at r = 2a₀ (where the bracket vanishes). It decays more slowly than 1s (exp(−r/2a₀)), so the 2s orbital extends further from the nucleus."
          />
          <EquationBlock
            label="Radial Wavefunction R₂₁ (2p)"
            latex="R_{21}(r) = \\frac{1}{2\\sqrt{6}}\\left(\\frac{1}{a_0}\\right)^{3/2}\\frac{r}{a_0}e^{-r/2a_0}"
            annotation="The 2p radial function has no radial nodes and vanishes at r = 0 (due to the r/a₀ factor — centrifugal barrier for l=1). Combined with Y₁ᵐ spherical harmonics, it gives the dumbbell p-orbital shapes."
          />
          <EquationBlock
            label="Expectation Value ⟨r⟩ for 1s"
            latex="\\langle r \\rangle_{1s} = \\int_0^\\infty r \\cdot r^2 |R_{10}|^2 \\, dr = \\frac{3}{2}a_0 = 0.794\\,\\text{\\AA}"
            annotation="The average distance from the nucleus in the ground state is ⟨r⟩ = 3a₀/2, which is larger than the Bohr radius a₀ (the most probable radius). This difference is due to the asymmetric r² P(r) distribution."
          />
        </div>
      </CollapsibleSection>

      {/* Orbital Shapes */}
      <CollapsibleSection
        id="orbitals-shapes"
        title="Orbital Shapes: s, p, d, f"
        defaultOpen={true}
        data-ocid="orbitals.shapes_section"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              block: "s",
              color: "#60a5fa",
              title: "s Orbitals (l = 0)",
              body: "Perfect spheres. Only one orbital per shell (m = 0). No angular nodes. Maximum electron density at the nucleus (for 1s). Radial nodes = n − 1.",
            },
            {
              block: "p",
              color: "#f97316",
              title: "p Orbitals (l = 1)",
              body: "Two-lobed dumbbell shapes. Three degenerate orbitals per shell (m = −1, 0, +1), oriented along x, y, z. One angular node (a nodal plane through the nucleus). n ≥ 2.",
            },
            {
              block: "d",
              color: "#fbbf24",
              title: "d Orbitals (l = 2)",
              body: "Five degenerate orbitals (m = −2, −1, 0, +1, +2). Four have four-leaf clover shapes; d_z² has two lobes and a torus. Two angular nodes. Critical for transition metal bonding, color, and magnetism. n ≥ 3.",
            },
            {
              block: "f",
              color: "#e879f9",
              title: "f Orbitals (l = 3)",
              body: "Seven degenerate orbitals with complex, multi-lobed shapes. Three angular nodes. Responsible for the chemistry of lanthanides and actinides. High angular momentum shields less effectively from the nucleus. n ≥ 4.",
            },
          ].map((item) => (
            <div
              key={item.block}
              className="rounded-lg border border-border bg-muted/20 p-4"
            >
              <h3
                className="font-display text-base font-semibold mb-2"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Student & Researcher content */}
      <CollapsibleSection
        id="orbitals-student"
        title="Conceptual Understanding (Student Level)"
        data-ocid="orbitals.student_section"
      >
        <AudienceBadge level="intermediate" />
        <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            In quantum mechanics, we cannot know both the exact position and
            momentum of an electron simultaneously (Heisenberg's uncertainty
            principle). Instead, we describe where an electron is{" "}
            <em>most likely</em> to be found using probability density functions
            called orbitals.
          </p>
          <p>
            An orbital is not a fixed orbit like a planet around the sun — it is
            a 3D region of space where there is a 90% probability of finding the
            electron. The probability cloud is denser where the electron spends
            more time.
          </p>
          <p>
            The four quantum numbers (n, l, m, s) completely describe each
            electron state. No two electrons in the same atom can share all four
            quantum numbers (Pauli exclusion principle).
          </p>
          <p>
            The shape of an orbital depends on the angular momentum quantum
            number l: l=0 gives spheres (s), l=1 gives dumbbells (p), l=2 gives
            clovers (d), l=3 gives complex shapes (f).
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        id="orbitals-researcher"
        title="Advanced Treatment (Researcher Level)"
        data-ocid="orbitals.researcher_section"
      >
        <AudienceBadge level="professional" />
        <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            The hydrogen wavefunctions are exact analytical solutions to the
            Schrödinger equation with the Coulomb potential V(r) = −e²/(4πε₀r).
            Separation of variables yields radial and angular components
            independently.
          </p>
          <p>
            The radial part R_nl involves associated Laguerre polynomials L_n^l
            and exponentials. The angular part Y_l^m are the spherical
            harmonics, common to all central-force problems.
          </p>
          <p>
            For multi-electron atoms, exact solutions don't exist. Hartree-Fock
            theory introduces a self-consistent field (SCF) where each electron
            sees an effective potential from all others. Density Functional
            Theory (DFT) replaces the many-body wavefunction with the electron
            density, greatly reducing computational cost.
          </p>
          <p>
            Relativistic effects (Dirac equation) are significant for heavy
            atoms, causing orbital contraction of s and p orbitals and expansion
            of d and f orbitals. This explains the "inert pair effect" and the
            anomalous color of gold.
          </p>
          <CitationMarker refId={1} />
          <CitationMarker refId={2} />
        </div>
      </CollapsibleSection>
    </motion.div>
  );
}
