import { PageHeader } from "@/components/PageHeader";
import { SafetyCallout } from "@/components/SafetyCallout";
import { SectionCard } from "@/components/SectionCard";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Simulation Constants ──────────────────────────────────────────────────────
const CANVAS_W = 600;
const CANVAS_H = 400;

// Region definitions (x, y, width, height)
const REGIONS = {
  fuel: { x: 220, y: 120, w: 160, h: 160, label: "Fuel Region" },
  moderator: { x: 120, y: 60, w: 360, h: 280, label: "Moderator" },
  reflector: { x: 40, y: 20, w: 520, h: 360, label: "Reflector" },
  controlRod1: { x: 260, y: 60, w: 20, h: 280, label: "Control Rod" },
  controlRod2: { x: 320, y: 60, w: 20, h: 280, label: "Control Rod" },
};

// Cross-section inspired probabilities
function getProbabilities(region: string, energy: number) {
  if (region === "fuel") {
    const fissionProb = energy < 0.1 ? 0.55 : 0.25; // thermal neutrons more likely to fission
    const captureProb = energy < 0.1 ? 0.15 : 0.1;
    const scatterProb = 1 - fissionProb - captureProb;
    return {
      fission: fissionProb,
      capture: captureProb,
      scatter: Math.max(0, scatterProb),
    };
  }
  if (region === "moderator") {
    const captureProb = 0.02;
    const scatterProb = 0.85;
    return { fission: 0, capture: captureProb, scatter: scatterProb };
  }
  if (region.startsWith("controlRod")) {
    return { fission: 0, capture: 0.75, scatter: 0.2 };
  }
  // reflector
  return { fission: 0, capture: 0.05, scatter: 0.8 };
}

function getRegion(x: number, y: number): string {
  for (const [key, r] of Object.entries(REGIONS)) {
    if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return key;
  }
  return "outside";
}

// Neutron energy color
function neutronColor(energy: number): string {
  if (energy > 1.0) return "#60a5fa"; // blue = fast
  if (energy > 0.1) return "#22d3ee"; // cyan = epithermal
  if (energy > 0.01) return "#fbbf24"; // yellow = thermal
  return "#f87171"; // red = about to fission
}

interface Neutron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  alive: boolean;
  path: { x: number; y: number }[];
}

interface SimStats {
  inFlight: number;
  fissions: number;
  absorbed: number;
  leaked: number;
  keff: number;
}

export default function MonteCarloSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [batchSize, setBatchSize] = useState(10);
  const [simSpeed, setSimSpeed] = useState(5);
  const [showPaths, setShowPaths] = useState(false);
  const [controlRodDepth, setControlRodDepth] = useState(50);
  const [stats, setStats] = useState<SimStats>({
    inFlight: 0,
    fissions: 0,
    absorbed: 0,
    leaked: 0,
    keff: 0,
  });

  const neutronsRef = useRef<Neutron[]>([]);
  const statsRef = useRef({
    fissions: 0,
    absorbed: 0,
    leaked: 0,
    totalProduced: 0,
    totalStarted: 0,
  });
  const animRef = useRef<number>(0);

  // Draw the reactor cross-section
  const drawReactor = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Background
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Reflector
      ctx.fillStyle = "rgba(148, 163, 184, 0.15)";
      ctx.fillRect(
        REGIONS.reflector.x,
        REGIONS.reflector.y,
        REGIONS.reflector.w,
        REGIONS.reflector.h,
      );
      ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
      ctx.strokeRect(
        REGIONS.reflector.x,
        REGIONS.reflector.y,
        REGIONS.reflector.w,
        REGIONS.reflector.h,
      );

      // Moderator
      ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
      ctx.fillRect(
        REGIONS.moderator.x,
        REGIONS.moderator.y,
        REGIONS.moderator.w,
        REGIONS.moderator.h,
      );
      ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
      ctx.strokeRect(
        REGIONS.moderator.x,
        REGIONS.moderator.y,
        REGIONS.moderator.w,
        REGIONS.moderator.h,
      );

      // Fuel
      ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
      ctx.fillRect(
        REGIONS.fuel.x,
        REGIONS.fuel.y,
        REGIONS.fuel.w,
        REGIONS.fuel.h,
      );
      ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
      ctx.strokeRect(
        REGIONS.fuel.x,
        REGIONS.fuel.y,
        REGIONS.fuel.w,
        REGIONS.fuel.h,
      );

      // Control rods (position based on depth)
      const rodOffset = (controlRodDepth / 100) * 200;
      for (const rod of [REGIONS.controlRod1, REGIONS.controlRod2]) {
        const rodY = rod.y + rodOffset;
        const rodH = Math.max(20, rod.h - rodOffset);
        ctx.fillStyle = "rgba(75, 85, 99, 0.7)";
        ctx.fillRect(rod.x, rodY, rod.w, rodH);
        ctx.strokeStyle = "rgba(156, 163, 175, 0.5)";
        ctx.strokeRect(rod.x, rodY, rod.w, rodH);
      }

      // Labels
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.fillText(
        "Reflector",
        REGIONS.reflector.x + 5,
        REGIONS.reflector.y + 15,
      );
      ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
      ctx.fillText(
        "Moderator",
        REGIONS.moderator.x + 5,
        REGIONS.moderator.y + 15,
      );
      ctx.fillStyle = "rgba(248, 113, 113, 0.8)";
      ctx.fillText("Fuel", REGIONS.fuel.x + 5, REGIONS.fuel.y + 15);
      ctx.fillStyle = "rgba(156, 163, 175, 0.7)";
      ctx.fillText(
        "Control Rods",
        REGIONS.controlRod1.x - 20,
        REGIONS.controlRod1.y + 12,
      );
    },
    [controlRodDepth],
  );

  // Spawn neutrons
  const spawnNeutrons = useCallback((count: number) => {
    const newNeutrons: Neutron[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 2;
      newNeutrons.push({
        x: REGIONS.fuel.x + REGIONS.fuel.w / 2 + (Math.random() - 0.5) * 40,
        y: REGIONS.fuel.y + REGIONS.fuel.h / 2 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        energy: 2.0 + Math.random() * 3.0, // MeV (fast)
        alive: true,
        path: [],
      });
    }
    neutronsRef.current.push(...newNeutrons);
    statsRef.current.totalStarted += count;
  }, []);

  // Simulation step
  const simStep = useCallback(() => {
    const neutrons = neutronsRef.current;
    const speedMult = simSpeed / 5;

    for (const n of neutrons) {
      if (!n.alive) continue;

      // Store path
      if (showPaths && n.path.length < 200) {
        n.path.push({ x: n.x, y: n.y });
      }

      // Move
      n.x += n.vx * speedMult;
      n.y += n.vy * speedMult;

      // Boundary check
      if (n.x < 0 || n.x > CANVAS_W || n.y < 0 || n.y > CANVAS_H) {
        n.alive = false;
        statsRef.current.leaked++;
        continue;
      }

      // Region interaction
      const region = getRegion(n.x, n.y);
      if (region === "outside") continue;

      const probs = getProbabilities(region, n.energy);
      const rand = Math.random();

      if (region === "fuel" && rand < probs.fission) {
        // Fission!
        n.alive = false;
        statsRef.current.fissions++;
        statsRef.current.totalProduced += 2 + Math.floor(Math.random() * 2);

        // Spawn fission neutrons
        for (let f = 0; f < 2 + Math.floor(Math.random() * 2); f++) {
          const fAngle = Math.random() * Math.PI * 2;
          const fSpeed = 1.5 + Math.random() * 2;
          neutrons.push({
            x: n.x,
            y: n.y,
            vx: Math.cos(fAngle) * fSpeed,
            vy: Math.sin(fAngle) * fSpeed,
            energy: 2.0 + Math.random() * 3.0,
            alive: true,
            path: [],
          });
        }
      } else if (rand < probs.fission + probs.capture) {
        // Capture
        n.alive = false;
        statsRef.current.absorbed++;
      } else {
        // Scatter
        const scatterAngle = (Math.random() - 0.5) * Math.PI;
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const currentAngle = Math.atan2(n.vy, n.vx);
        const newAngle = currentAngle + scatterAngle;
        n.vx = Math.cos(newAngle) * speed;
        n.vy = Math.sin(newAngle) * speed;

        // Energy loss in moderator
        if (region === "moderator") {
          n.energy *= 0.7; // Simplified slowing down
        }
      }
    }

    // Remove dead neutrons (keep last 500 for display)
    neutronsRef.current = neutrons.filter((n) => n.alive).slice(-500);

    // Update stats
    const alive = neutronsRef.current.filter((n) => n.alive).length;
    const total = statsRef.current.totalStarted;
    const produced = statsRef.current.totalProduced;
    const keff = total > 0 ? produced / Math.max(total, 1) : 0;

    setStats({
      inFlight: alive,
      fissions: statsRef.current.fissions,
      absorbed: statsRef.current.absorbed,
      leaked: statsRef.current.leaked,
      keff: Number(keff.toFixed(3)),
    });
  }, [simSpeed, showPaths]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function render(ctx: CanvasRenderingContext2D) {
      drawReactor(ctx);

      // Draw paths
      if (showPaths) {
        ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
        ctx.lineWidth = 0.5;
        for (const n of neutronsRef.current) {
          if (n.path.length < 2) continue;
          ctx.beginPath();
          ctx.moveTo(n.path[0].x, n.path[0].y);
          for (let i = 1; i < n.path.length; i++) {
            ctx.lineTo(n.path[i].x, n.path[i].y);
          }
          ctx.stroke();
        }
      }

      // Draw neutrons
      for (const n of neutronsRef.current) {
        if (!n.alive) continue;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = neutronColor(n.energy);
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `${neutronColor(n.energy)}30`;
        ctx.fill();
      }

      if (isRunning) {
        simStep();
        animRef.current = requestAnimationFrame(() => render(ctx));
      }
    }

    render(ctx);
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, drawReactor, simStep, showPaths]);

  const handleReset = () => {
    setIsRunning(false);
    neutronsRef.current = [];
    statsRef.current = {
      fissions: 0,
      absorbed: 0,
      leaked: 0,
      totalProduced: 0,
      totalStarted: 0,
    };
    setStats({ inFlight: 0, fissions: 0, absorbed: 0, leaked: 0, keff: 0 });

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) drawReactor(ctx);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Monte Carlo Neutron Transport"
        subtitle="Simplified stochastic neutron transport simulation demonstrating fission, moderation, absorption, and leakage in a 2D reactor cross-section."
        audienceLevel="professional"
        readTimeMin={10}
      />

      <SafetyCallout title="Educational Simulation Only">
        This is a <strong>highly simplified</strong> demonstration of Monte
        Carlo neutron transport. Real reactor physics uses continuous-energy
        cross-sections (ENDF/B), detailed geometry, and millions of neutron
        histories in codes like MCNP, Serpent, or OpenMC.
      </SafetyCallout>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        {/* ── Canvas ─────────────────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-2"
          data-ocid="montecarlo.canvas.panel"
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="w-full rounded-lg border border-border"
            style={{ imageRendering: "auto" }}
            aria-label="Monte Carlo neutron transport simulation canvas"
          />

          {/* Tooltip hints */}
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400" />
              Fast neutron (&gt;1 MeV)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Epithermal (0.1–1 MeV)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
              Thermal (&lt;0.1 MeV)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400" />
              About to fission
            </span>
          </div>
        </SectionCard>

        {/* ── Controls & Stats ───────────────────────────────────────────── */}
        <SectionCard
          className="lg:col-span-1 space-y-5"
          data-ocid="montecarlo.controls.panel"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">
            Controls
          </h2>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                isRunning
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "bg-primary text-primary-foreground"
              }`}
              data-ocid="montecarlo.play.button"
            >
              {isRunning ? "⏸ Pause" : "▶ Play"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-border bg-muted/20 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/40 transition-colors"
              data-ocid="montecarlo.reset.button"
            >
              ↺ Reset
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => spawnNeutrons(batchSize)}
              className="w-full rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              data-ocid="montecarlo.spawn.button"
            >
              Spawn {batchSize} Neutrons
            </button>
          </div>

          <div>
            <label
              htmlFor="mc-batch"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Batch Size:{" "}
              <span className="font-mono text-primary">{batchSize}</span>
            </label>
            <input
              id="mc-batch"
              type="range"
              min="1"
              max="100"
              step="1"
              value={batchSize}
              onChange={(e) => setBatchSize(Number.parseInt(e.target.value))}
              className="w-full accent-primary"
              data-ocid="montecarlo.batch_size.toggle"
            />
          </div>

          <div>
            <label
              htmlFor="mc-speed"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Sim Speed:{" "}
              <span className="font-mono text-primary">{simSpeed}x</span>
            </label>
            <input
              id="mc-speed"
              type="range"
              min="1"
              max="20"
              step="1"
              value={simSpeed}
              onChange={(e) => setSimSpeed(Number.parseInt(e.target.value))}
              className="w-full accent-primary"
              data-ocid="montecarlo.speed.toggle"
            />
          </div>

          <div>
            <label
              htmlFor="mc-rod"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Control Rod Insertion:{" "}
              <span className="font-mono text-primary">{controlRodDepth}%</span>
            </label>
            <input
              id="mc-rod"
              type="range"
              min="0"
              max="100"
              value={controlRodDepth}
              onChange={(e) =>
                setControlRodDepth(Number.parseInt(e.target.value))
              }
              className="w-full accent-primary"
              data-ocid="montecarlo.control_rod.toggle"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher insertion = more absorption in control rods
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-paths"
              checked={showPaths}
              onChange={(e) => setShowPaths(e.target.checked)}
              className="rounded border-border"
              data-ocid="montecarlo.show_paths.checkbox"
            />
            <label
              htmlFor="show-paths"
              className="text-sm text-muted-foreground"
            >
              Show neutron paths
            </label>
          </div>

          {/* Stats */}
          <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Statistics
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "In Flight",
                  value: stats.inFlight,
                  color: "text-primary",
                },
                {
                  label: "Fissions",
                  value: stats.fissions,
                  color: "text-amber-400",
                },
                {
                  label: "Absorbed",
                  value: stats.absorbed,
                  color: "text-rose-400",
                },
                {
                  label: "Leaked",
                  value: stats.leaked,
                  color: "text-cyan-400",
                },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`font-mono text-lg font-bold ${s.color}`}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
              <p className="text-xs text-muted-foreground">Estimated k-eff</p>
              <p
                className={`font-mono text-2xl font-bold ${stats.keff >= 1.0 ? "text-amber-400" : "text-emerald-400"}`}
              >
                {stats.keff.toFixed(3)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stats.keff < 0.95
                  ? "Subcritical"
                  : stats.keff > 1.05
                    ? "Supercritical"
                    : "Near Critical"}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── Educational Annotations ──────────────────────────────────────── */}
      <SectionCard className="mt-6" data-ocid="montecarlo.education.section">
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          How the Simulation Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <p>
              <strong className="text-foreground">Fuel Region (Red):</strong>{" "}
              Neutrons undergo fission (spawn 2–3 new neutrons), capture
              (disappear), or elastic scatter (change direction).
            </p>
            <p>
              <strong className="text-foreground">Moderator (Blue):</strong>{" "}
              Neutrons lose energy with each scatter collision, slowing from
              fast to thermal energies. Small capture probability.
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <strong className="text-foreground">Control Rods (Gray):</strong>{" "}
              High absorption probability. Deeper insertion increases neutron
              capture, reducing k-effective.
            </p>
            <p>
              <strong className="text-foreground">
                Reflector (Light Gray):
              </strong>{" "}
              Scatters leaked neutrons back into the core. Some absorption,
              mostly elastic scatter.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground">
          <strong className="text-foreground">k-effective estimation:</strong>{" "}
          k-eff ≈ (neutrons produced by fission) / (neutrons started). In a real
          reactor, k-eff = 1.0 means critical (steady power), &lt;1 means
          subcritical (power decreasing), &gt;1 means supercritical (power
          increasing). Control rods are used to maintain k-eff ≈ 1.0 during
          operation.
        </div>
      </SectionCard>
    </div>
  );
}
