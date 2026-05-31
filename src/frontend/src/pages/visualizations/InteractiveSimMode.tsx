import {
  Activity,
  Atom,
  ExternalLink,
  Pause,
  Play,
  RefreshCw,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface InteractiveSimModeProps {
  reactorType: "PWR" | "BWR" | "CANDU" | "SMR";
}

type SimSubTab = "chain" | "kinetics" | "transient" | "models";

// ─── Chain Reaction Types ──────────────────────────────────────────────────────

interface Nucleus {
  id: number;
  x: number;
  y: number;
  radius: number;
  spent: boolean;
  burstTime: number; // frames remaining for burst (12 frames total)
  pulseOffset: number; // random offset for breathing anim
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number; // 0-30 frames
  maxAge: number;
}

interface NeutronTrailPoint {
  x: number;
  y: number;
}

interface Neutron {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number; // frames alive
  maxAge: number; // 600 frames = 10 seconds at 60fps
  trail: NeutronTrailPoint[];
}

interface ChainSimState {
  nuclei: Nucleus[];
  neutrons: Neutron[];
  burstParticles: BurstParticle[];
  fissionCount: number;
  nextId: number;
  frame: number;
  // For k-eff calculation
  neutronsProducedInWindow: number;
  neutronsConsumedInWindow: number;
  windowStartFrame: number;
}

interface ChartDataPoint {
  t: number;
  fissions: number;
  neutrons: number;
  kEff: number;
}

// ─── PKE Types ─────────────────────────────────────────────────────────────────

interface PKEState {
  n: number; // normalized neutron population
  C: [number, number, number, number, number, number]; // precursor concentrations
  t: number;
}

interface PKEChartPoint {
  t: number;
  power: number;
}

// ─── Chain Reaction Canvas Constants ──────────────────────────────────────────

const CANVAS_HEIGHT = 520;
const NEUTRON_R = 4;
const NUCLEUS_R_MIN = 12;
const NUCLEUS_R_MAX = 14;
const MAX_NEUTRONS = 300;
const MAX_BURST_PARTICLES = 200;
const NEUTRON_MAX_AGE = 600; // 10s @ 60fps
const TRAIL_LENGTH = 8;

// ─── PKE Physics Constants ─────────────────────────────────────────────────────

const BETA_TOTAL = 0.0065;
const LAMBDA_PROMPT = 0.00005; // seconds
const BETA_I = [
  0.000215, 0.001424, 0.001274, 0.002568, 0.000748, 0.000273,
] as const;
const LAMBDA_I = [0.0124, 0.0305, 0.111, 0.301, 1.14, 3.01] as const;
const REF_POWERS = { research: 100, test: 1_000_000, power: 3_200_000_000 };

// ─── Utility: build nuclei grid ────────────────────────────────────────────────

function buildNuclei(width: number, count: number): Nucleus[] {
  const result: Nucleus[] = [];
  const margin = 30;
  const attempts = count * 10;
  let placed = 0;
  for (let i = 0; i < attempts && placed < count; i++) {
    const x = margin + Math.random() * (width - margin * 2);
    const y = margin + Math.random() * (CANVAS_HEIGHT - margin * 2);
    const radius =
      NUCLEUS_R_MIN + Math.random() * (NUCLEUS_R_MAX - NUCLEUS_R_MIN);
    // Check minimum distance from existing
    let ok = true;
    for (const n of result) {
      const dx = n.x - x;
      const dy = n.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < radius + NUCLEUS_R_MAX + 8) {
        ok = false;
        break;
      }
    }
    if (ok) {
      result.push({
        id: placed,
        x,
        y,
        radius,
        spent: false,
        burstTime: 0,
        pulseOffset: Math.random() * Math.PI * 2,
      });
      placed++;
    }
  }
  return result;
}

// ─── Utility: fire neutron from edge ──────────────────────────────────────────

function fireNeutronFromEdge(
  width: number,
  speed: number,
  nextId: number,
): Neutron {
  const edge = Math.floor(Math.random() * 4);
  let x: number;
  let y: number;
  let vx: number;
  let vy: number;
  const spd = speed * (0.8 + Math.random() * 0.4);
  if (edge === 0) {
    x = Math.random() * width;
    y = 0;
  } else if (edge === 1) {
    x = width;
    y = Math.random() * CANVAS_HEIGHT;
  } else if (edge === 2) {
    x = Math.random() * width;
    y = CANVAS_HEIGHT;
  } else {
    x = 0;
    y = Math.random() * CANVAS_HEIGHT;
  }
  const cx = width / 2 + (Math.random() - 0.5) * width * 0.4;
  const cy = CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * CANVAS_HEIGHT * 0.4;
  const len = Math.sqrt((cx - x) ** 2 + (cy - y) ** 2);
  vx = ((cx - x) / len) * spd;
  vy = ((cy - y) / len) * spd;
  return {
    id: nextId,
    x,
    y,
    vx,
    vy,
    age: 0,
    maxAge: NEUTRON_MAX_AGE,
    trail: [],
  };
}

// ─── ChainReactionSim Component ────────────────────────────────────────────────

function ChainReactionSim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const simRef = useRef<ChainSimState | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(700);
  const [playing, setPlaying] = useState(true);
  const [autoFire, setAutoFire] = useState(false);
  const autoFireRef = useRef(false);
  const lastAutoFireRef = useRef(0);

  // Slider state
  const [nucleiCount, setNucleiCount] = useState(80);
  const [controlRods, setControlRods] = useState(3);
  const [insertionDepth, setInsertionDepth] = useState(40);
  const [neutronSpeed, setNeutronSpeed] = useState(1.5);
  const [fissionProb, setFissionProb] = useState(85);
  const [neutronsPerFission, setNeutronsPerFission] = useState(2);

  // UI state synced from sim (every 500ms)
  const [uiStats, setUiStats] = useState({
    activNeutrons: 0,
    totalFissions: 0,
    intactNuclei: 0,
    spentNuclei: 0,
    kEff: 1.0,
  });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Refs for slider values used inside rAF loop
  const sliderRefs = useRef({
    controlRods,
    insertionDepth,
    neutronSpeed,
    fissionProb,
    neutronsPerFission,
  });
  useEffect(() => {
    sliderRefs.current = {
      controlRods,
      insertionDepth,
      neutronSpeed,
      fissionProb,
      neutronsPerFission,
    };
  }, [
    controlRods,
    insertionDepth,
    neutronSpeed,
    fissionProb,
    neutronsPerFission,
  ]);

  // Resize observer
  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 700;
      setCanvasWidth(Math.max(400, Math.floor(w)));
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Init sim
  const initSim = useCallback((width: number, count: number) => {
    simRef.current = {
      nuclei: buildNuclei(width, count),
      neutrons: [],
      burstParticles: [],
      fissionCount: 0,
      nextId: 1000,
      frame: 0,
      neutronsProducedInWindow: 0,
      neutronsConsumedInWindow: 0,
      windowStartFrame: 0,
    };
  }, []);

  // Init on mount and when nucleiCount changes
  useEffect(() => {
    initSim(canvasWidth, nucleiCount);
  }, [nucleiCount, canvasWidth, initSim]);

  // Keep autoFire ref in sync
  useEffect(() => {
    autoFireRef.current = autoFire;
  }, [autoFire]);

  // ─── Main render loop ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastStatUpdate = 0;
    let lastChartUpdate = 0;

    function tick(_timestamp: number) {
      if (!ctx || !canvas) return;
      const sim = simRef.current;
      if (!sim) return;
      const {
        controlRods: rods,
        insertionDepth: insertion,
        neutronSpeed: speed,
        fissionProb: fProb,
        neutronsPerFission: nPerF,
      } = sliderRefs.current;

      const width = canvas.width;
      const height = CANVAS_HEIGHT;
      sim.frame++;

      // ── Background ──
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, width, height);

      // ── Subtle grid ──
      ctx.strokeStyle = "rgba(0,100,180,0.08)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < width; gx += 50) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += 50) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // ── Control Rods ──
      const rodHeight = (insertion / 100) * height;
      const spacing = rods > 0 ? width / (rods + 1) : 0;
      for (let ri = 1; ri <= rods; ri++) {
        const rx = spacing * ri;
        ctx.save();
        const rodGrad = ctx.createLinearGradient(rx - 4, 0, rx + 4, 0);
        rodGrad.addColorStop(0, "rgba(200,30,30,0.9)");
        rodGrad.addColorStop(0.5, "rgba(255,80,80,1)");
        rodGrad.addColorStop(1, "rgba(200,30,30,0.9)");
        ctx.fillStyle = rodGrad;
        ctx.shadowColor = "rgba(255,50,50,0.7)";
        ctx.shadowBlur = 12;
        ctx.fillRect(rx - 4, 0, 8, rodHeight);
        ctx.strokeStyle = "rgba(255,120,120,0.6)";
        ctx.lineWidth = 1;
        ctx.strokeRect(rx - 4, 0, 8, rodHeight);
        ctx.restore();
        // Rod tip indicator
        ctx.fillStyle = "rgba(255,100,100,0.9)";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`CR${ri}`, rx, rodHeight + 13);
      }

      // ── Update + draw nuclei ──
      const t = sim.frame / 60; // seconds
      for (const nuc of sim.nuclei) {
        if (nuc.burstTime > 0) nuc.burstTime--;

        // Breathing pulse
        const pulse = nuc.spent
          ? 0
          : 0.06 * Math.sin(t * 1.5 + nuc.pulseOffset);
        const r = nuc.radius * (1 + pulse);

        ctx.save();
        ctx.beginPath();
        ctx.arc(nuc.x, nuc.y, r, 0, Math.PI * 2);

        if (nuc.spent) {
          ctx.fillStyle = "rgba(20,20,50,0.85)";
          ctx.strokeStyle = "rgba(60,60,90,0.5)";
          ctx.lineWidth = 1;
        } else if (nuc.burstTime > 0) {
          const flashFrac = nuc.burstTime / 12;
          ctx.shadowColor = `rgba(255,220,0,${flashFrac * 0.9})`;
          ctx.shadowBlur = 30 * flashFrac;
          ctx.fillStyle = `rgba(255,${200 - flashFrac * 50},0,${0.7 + flashFrac * 0.3})`;
          ctx.strokeStyle = `rgba(255,255,100,${flashFrac * 0.8})`;
          ctx.lineWidth = 2;
        } else {
          ctx.shadowColor = "rgba(0,229,255,0.5)";
          ctx.shadowBlur = 14;
          ctx.fillStyle = "rgba(0,180,220,0.3)";
          ctx.strokeStyle = "#00e5ff";
          ctx.lineWidth = 1.5;
        }
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // ── Burst particles ──
      const survivingParticles: BurstParticle[] = [];
      for (const p of sim.burstParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.age++;
        if (p.age < p.maxAge) {
          const alpha = 1 - p.age / p.maxAge;
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * alpha, 0, Math.PI * 2);
          ctx.shadowColor = `rgba(255,255,100,${alpha * 0.8})`;
          ctx.shadowBlur = 6 * alpha;
          ctx.fillStyle = `rgba(255,230,50,${alpha})`;
          ctx.fill();
          ctx.restore();
          survivingParticles.push(p);
        }
      }
      sim.burstParticles = survivingParticles;

      // ── Helper: is neutron absorbed by any control rod ──
      function absorbedByRod(nx: number, ny: number): boolean {
        if (rods === 0 || insertion === 0) return false;
        for (let ri = 1; ri <= rods; ri++) {
          const rx = spacing * ri;
          const rh = rodHeight;
          if (nx >= rx - 5 && nx <= rx + 5 && ny >= 0 && ny <= rh) {
            return Math.random() < 0.8;
          }
        }
        return false;
      }

      // ── Update neutrons ──
      const newNeutronBatch: Neutron[] = [];
      const consumed = new Set<number>();

      for (const n of sim.neutrons) {
        // Move
        n.x += n.vx * speed;
        n.y += n.vy * speed;
        n.age++;

        // Trail
        n.trail.push({ x: n.x, y: n.y });
        if (n.trail.length > TRAIL_LENGTH) n.trail.shift();

        // Wall bounce
        if (n.x < NEUTRON_R) {
          n.x = NEUTRON_R;
          n.vx = Math.abs(n.vx);
        } else if (n.x > width - NEUTRON_R) {
          n.x = width - NEUTRON_R;
          n.vx = -Math.abs(n.vx);
        }
        if (n.y < NEUTRON_R) {
          n.y = NEUTRON_R;
          n.vy = Math.abs(n.vy);
        } else if (n.y > height - NEUTRON_R) {
          n.y = height - NEUTRON_R;
          n.vy = -Math.abs(n.vy);
        }

        // Lifetime expired
        if (n.age >= n.maxAge) {
          consumed.add(n.id);
          sim.neutronsConsumedInWindow++;
          continue;
        }

        // Control rod absorption
        if (absorbedByRod(n.x, n.y)) {
          // Orange flash at absorption point
          for (let k = 0; k < 4; k++) {
            const angle = Math.random() * Math.PI * 2;
            sim.burstParticles.push({
              id: sim.nextId++,
              x: n.x,
              y: n.y,
              vx: Math.cos(angle) * 1.5,
              vy: Math.sin(angle) * 1.5,
              age: 0,
              maxAge: 15,
            });
          }
          consumed.add(n.id);
          sim.neutronsConsumedInWindow++;
          continue;
        }

        // Fission check
        let fissioned = false;
        for (const nuc of sim.nuclei) {
          if (nuc.spent) continue;
          const dx = n.x - nuc.x;
          const dy = n.y - nuc.y;
          if (Math.sqrt(dx * dx + dy * dy) < nuc.radius + NEUTRON_R) {
            // Fission probability check
            if (Math.random() * 100 > fProb) break;
            // Fission!
            nuc.spent = true;
            nuc.burstTime = 12;
            sim.fissionCount++;
            consumed.add(n.id);
            sim.neutronsConsumedInWindow++;
            // Burst particles
            for (let k = 0; k < 8; k++) {
              const angle = (k / 8) * Math.PI * 2;
              const spd2 = 2 + Math.random() * 3;
              if (sim.burstParticles.length < MAX_BURST_PARTICLES) {
                sim.burstParticles.push({
                  id: sim.nextId++,
                  x: nuc.x,
                  y: nuc.y,
                  vx: Math.cos(angle) * spd2,
                  vy: Math.sin(angle) * spd2,
                  age: 0,
                  maxAge: 30,
                });
              }
            }
            // New neutrons
            const count = nPerF + (Math.random() < 0.3 ? 1 : 0);
            for (
              let k = 0;
              k < count &&
              sim.neutrons.length + newNeutronBatch.length < MAX_NEUTRONS;
              k++
            ) {
              const angle = Math.random() * Math.PI * 2;
              const spd2 = (1 + Math.random()) * speed;
              newNeutronBatch.push({
                id: sim.nextId++,
                x: nuc.x + Math.cos(angle) * (nuc.radius + 4),
                y: nuc.y + Math.sin(angle) * (nuc.radius + 4),
                vx: Math.cos(angle) * spd2,
                vy: Math.sin(angle) * spd2,
                age: 0,
                maxAge: NEUTRON_MAX_AGE,
                trail: [],
              });
              sim.neutronsProducedInWindow++;
            }
            fissioned = true;
            break;
          }
        }
        if (fissioned) continue;
      }

      sim.neutrons = sim.neutrons.filter((n) => !consumed.has(n.id));
      sim.neutrons = [...sim.neutrons, ...newNeutronBatch].slice(-MAX_NEUTRONS);

      // Auto-fire logic
      if (autoFireRef.current && playing) {
        const now = Date.now();
        if (now - lastAutoFireRef.current > 2000) {
          lastAutoFireRef.current = now;
          if (sim.neutrons.length < MAX_NEUTRONS) {
            sim.neutrons.push(fireNeutronFromEdge(width, speed, sim.nextId++));
          }
        }
      }

      // ── Draw neutron trails + neutrons ──
      for (const n of sim.neutrons) {
        // Trail
        if (n.trail.length > 1) {
          ctx.save();
          for (let ti = 1; ti < n.trail.length; ti++) {
            const alpha = (ti / n.trail.length) * 0.6;
            ctx.beginPath();
            ctx.moveTo(n.trail[ti - 1].x, n.trail[ti - 1].y);
            ctx.lineTo(n.trail[ti].x, n.trail[ti].y);
            ctx.strokeStyle = `rgba(255,255,136,${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.restore();
        }
        // Fade out near end of life
        const lifeFrac = n.age / n.maxAge;
        const alpha = lifeFrac > 0.85 ? 1 - (lifeFrac - 0.85) / 0.15 : 1;
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, NEUTRON_R, 0, Math.PI * 2);
        ctx.shadowColor = `rgba(255,255,200,${alpha * 0.9})`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(255,255,136,${alpha})`;
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // ── k-eff window calc (every 60 frames) ──
      let kEff = 1.0;
      if (sim.frame - sim.windowStartFrame >= 60) {
        const produced = sim.neutronsProducedInWindow;
        const consumed2 = sim.neutronsConsumedInWindow;
        if (consumed2 > 0) {
          kEff = Math.min(2.5, Math.max(0, produced / consumed2));
        }
        sim.neutronsProducedInWindow = 0;
        sim.neutronsConsumedInWindow = 0;
        sim.windowStartFrame = sim.frame;
      } else {
        kEff = uiStatsRef.current.kEff;
      }

      // ── Sync UI every 500ms ──
      const now = Date.now();
      if (now - lastStatUpdate > 500) {
        lastStatUpdate = now;
        const intact = sim.nuclei.filter((n) => !n.spent).length;
        const spent = sim.nuclei.length - intact;
        uiStatsRef.current = {
          activNeutrons: sim.neutrons.length,
          totalFissions: sim.fissionCount,
          intactNuclei: intact,
          spentNuclei: spent,
          kEff,
        };
        setUiStats({ ...uiStatsRef.current });
      }

      if (now - lastChartUpdate > 500) {
        lastChartUpdate = now;
        const tSec = Math.round(sim.frame / 60);
        setChartData((prev) => {
          const next = [
            ...prev,
            {
              t: tSec,
              fissions: sim.fissionCount,
              neutrons: sim.neutrons.length,
              kEff,
            },
          ];
          return next.slice(-60);
        });
      }

      if (playing) rafRef.current = requestAnimationFrame(tick);
    }

    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // Ref for current stats (needed inside rAF without triggering re-render)
  const uiStatsRef = useRef(uiStats);
  useEffect(() => {
    uiStatsRef.current = uiStats;
  }, [uiStats]);

  function handleFireNeutron() {
    const sim = simRef.current;
    if (!sim) return;
    sim.neutrons.push(
      fireNeutronFromEdge(
        canvasWidth,
        sliderRefs.current.neutronSpeed,
        sim.nextId++,
      ),
    );
  }

  function handleReset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    initSim(canvasWidth, nucleiCount);
    setChartData([]);
    setUiStats({
      activNeutrons: 0,
      totalFissions: 0,
      intactNuclei: nucleiCount,
      spentNuclei: 0,
      kEff: 1.0,
    });
    setTimeout(() => setPlaying(true), 50);
  }

  const kEff = uiStats.kEff;
  const criticality =
    kEff < 0.9
      ? {
          label: "SUBCRITICAL",
          color: "#3b9eff",
          bg: "rgba(59,158,255,0.12)",
          border: "rgba(59,158,255,0.3)",
        }
      : kEff <= 1.1
        ? {
            label: "CRITICAL",
            color: "#34d399",
            bg: "rgba(52,211,153,0.12)",
            border: "rgba(52,211,153,0.3)",
          }
        : {
            label: "SUPERCRITICAL",
            color: "#f59e0b",
            bg: "rgba(245,158,11,0.12)",
            border: "rgba(245,158,11,0.3)",
          };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="space-y-4">
      {isMobile && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <Atom className="w-12 h-12 text-cyan-400 opacity-60" />
          <p className="text-sm font-mono text-muted-foreground max-w-xs">
            This simulation works best on desktop. Please use a wider screen for
            the best experience.
          </p>
        </div>
      )}
      {!isMobile && (
        <div className="flex gap-5 flex-col xl:flex-row">
          {/* ─── Canvas Panel ── */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Status bar */}
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-xl border"
              style={{
                background: "rgba(5,5,20,0.95)",
                borderColor: "rgba(0,180,255,0.18)",
              }}
            >
              <div
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${kEff > 1.1 ? "animate-pulse" : ""}`}
                style={{
                  background: criticality.bg,
                  border: `1px solid ${criticality.border}`,
                  color: criticality.color,
                }}
                data-ocid="chain.criticality_badge"
              >
                {criticality.label}
              </div>
              <span
                className="text-xs font-mono"
                style={{ color: criticality.color }}
              >
                k<sub>eff</sub> = {kEff.toFixed(3)}
              </span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={handleFireNeutron}
                  aria-label="Fire a neutron"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(0,229,255,0.12)",
                    border: "1px solid rgba(0,229,255,0.35)",
                    color: "#00e5ff",
                  }}
                  data-ocid="chain.fire_neutron_button"
                >
                  <Zap className="w-3 h-3" /> Fire Neutron
                </button>
                <button
                  type="button"
                  onClick={() => setAutoFire((v) => !v)}
                  aria-label={autoFire ? "Stop auto-fire" : "Start auto-fire"}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all hover:scale-105"
                  style={{
                    background: autoFire
                      ? "rgba(245,158,11,0.18)"
                      : "rgba(100,100,150,0.12)",
                    border: `1px solid ${autoFire ? "rgba(245,158,11,0.4)" : "rgba(100,100,150,0.25)"}`,
                    color: autoFire ? "#f59e0b" : "rgba(180,180,220,0.8)",
                  }}
                  data-ocid="chain.autofire_toggle"
                >
                  <Target className="w-3 h-3" />{" "}
                  {autoFire ? "Auto: ON" : "Auto: OFF"}
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying((v) => !v)}
                  aria-label={
                    playing ? "Pause simulation" : "Resume simulation"
                  }
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all hover:scale-105"
                  style={{
                    background: playing
                      ? "rgba(248,113,113,0.12)"
                      : "rgba(52,211,153,0.12)",
                    border: `1px solid ${playing ? "rgba(248,113,113,0.35)" : "rgba(52,211,153,0.35)"}`,
                    color: playing ? "#f87171" : "#34d399",
                  }}
                  data-ocid="chain.play_pause_button"
                >
                  {playing ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset simulation"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(100,100,140,0.12)",
                    border: "1px solid rgba(100,100,140,0.25)",
                    color: "rgba(180,180,220,0.8)",
                  }}
                  data-ocid="chain.reset_button"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div
              ref={containerRef}
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(0,180,255,0.18)",
                background: "#050510",
              }}
            >
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={CANVAS_HEIGHT}
                role="img"
                aria-label="Nuclear chain reaction simulation canvas showing nuclei and neutrons"
                style={{
                  display: "block",
                  width: "100%",
                  height: CANVAS_HEIGHT,
                }}
              />
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-2">
              {[
                {
                  label: "Active Neutrons",
                  value: uiStats.activNeutrons,
                  color: "#ffff88",
                },
                {
                  label: "Total Fissions",
                  value: uiStats.totalFissions.toLocaleString(),
                  color: "#00e5ff",
                },
                {
                  label: "Intact Nuclei",
                  value: `${uiStats.intactNuclei} / ${nucleiCount}`,
                  color: "#34d399",
                },
                {
                  label: "Spent Nuclei",
                  value: uiStats.spentNuclei,
                  color: "rgba(150,150,180,0.8)",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl px-3 py-2.5 border text-center"
                  style={{
                    background: "rgba(5,5,20,0.9)",
                    borderColor: "rgba(0,180,255,0.14)",
                  }}
                >
                  <div
                    className="text-[11px] font-mono font-bold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Energy Output */}
              <div
                className="rounded-xl p-3 border"
                style={{
                  background: "rgba(5,5,20,0.95)",
                  borderColor: "rgba(0,180,255,0.14)",
                }}
              >
                <div
                  className="text-[9px] font-mono uppercase tracking-wider mb-2"
                  style={{ color: "#00e5ff" }}
                >
                  Energy Output
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#00e5ff"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00e5ff"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,180,255,0.07)"
                    />
                    <XAxis
                      dataKey="t"
                      tick={{
                        fontSize: 8,
                        fill: "rgba(140,180,200,0.6)",
                        fontFamily: "monospace",
                      }}
                    />
                    <YAxis
                      tick={{
                        fontSize: 8,
                        fill: "rgba(140,180,200,0.6)",
                        fontFamily: "monospace",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#050510",
                        border: "1px solid rgba(0,229,255,0.3)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="fissions"
                      stroke="#00e5ff"
                      strokeWidth={1.5}
                      fill="url(#cyanGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              {/* Neutron Population */}
              <div
                className="rounded-xl p-3 border"
                style={{
                  background: "rgba(5,5,20,0.95)",
                  borderColor: "rgba(0,180,255,0.14)",
                }}
              >
                <div
                  className="text-[9px] font-mono uppercase tracking-wider mb-2"
                  style={{ color: "#ffff88" }}
                >
                  Neutron Population
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,180,255,0.07)"
                    />
                    <XAxis
                      dataKey="t"
                      tick={{
                        fontSize: 8,
                        fill: "rgba(140,180,200,0.6)",
                        fontFamily: "monospace",
                      }}
                    />
                    <YAxis
                      tick={{
                        fontSize: 8,
                        fill: "rgba(140,180,200,0.6)",
                        fontFamily: "monospace",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#050510",
                        border: "1px solid rgba(255,255,136,0.3)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="neutrons"
                      stroke="#ffff88"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* k-effective */}
              <div
                className="rounded-xl p-3 border"
                style={{
                  background: "rgba(5,5,20,0.95)",
                  borderColor: "rgba(0,180,255,0.14)",
                }}
              >
                <div
                  className="text-[9px] font-mono uppercase tracking-wider mb-2"
                  style={{ color: "#34d399" }}
                >
                  k-effective
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,180,255,0.07)"
                    />
                    <XAxis
                      dataKey="t"
                      tick={{
                        fontSize: 8,
                        fill: "rgba(140,180,200,0.6)",
                        fontFamily: "monospace",
                      }}
                    />
                    <YAxis
                      domain={[0, 2.5]}
                      tick={{
                        fontSize: 8,
                        fill: "rgba(140,180,200,0.6)",
                        fontFamily: "monospace",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#050510",
                        border: "1px solid rgba(52,211,153,0.3)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    />
                    <ReferenceLine
                      y={0.9}
                      stroke="rgba(59,158,255,0.5)"
                      strokeDasharray="4 2"
                    />
                    <ReferenceLine
                      y={1.1}
                      stroke="rgba(245,158,11,0.5)"
                      strokeDasharray="4 2"
                    />
                    <ReferenceLine
                      y={1.0}
                      stroke="rgba(52,211,153,0.4)"
                      strokeDasharray="2 2"
                    />
                    <Line
                      type="monotone"
                      dataKey="kEff"
                      stroke="#34d399"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ─── Controls Sidebar ── */}
          <div className="w-full xl:w-64 flex-shrink-0 space-y-3">
            {/* Main sliders */}
            <div
              className="rounded-xl p-4 border space-y-4"
              style={{
                background: "rgba(5,5,20,0.95)",
                borderColor: "rgba(0,180,255,0.15)",
              }}
            >
              <div
                className="text-[9px] font-mono uppercase tracking-widest"
                style={{ color: "#00e5ff" }}
              >
                Reactor Controls
              </div>
              {[
                {
                  label: "Nuclei Count",
                  value: nucleiCount,
                  min: 10,
                  max: 200,
                  step: 5,
                  set: setNucleiCount,
                  unit: "",
                  id: "nuclei_count",
                },
                {
                  label: "Control Rods",
                  value: controlRods,
                  min: 0,
                  max: 10,
                  step: 1,
                  set: setControlRods,
                  unit: "",
                  id: "control_rods",
                },
                {
                  label: "Insertion Depth",
                  value: insertionDepth,
                  min: 0,
                  max: 100,
                  step: 1,
                  set: setInsertionDepth,
                  unit: "%",
                  id: "insertion_depth",
                },
                {
                  label: "Neutron Speed",
                  value: neutronSpeed,
                  min: 0.5,
                  max: 5,
                  step: 0.1,
                  set: setNeutronSpeed,
                  unit: "×",
                  id: "neutron_speed",
                },
                {
                  label: "Fission Probability",
                  value: fissionProb,
                  min: 10,
                  max: 100,
                  step: 1,
                  set: setFissionProb,
                  unit: "%",
                  id: "fission_prob",
                },
                {
                  label: "Neutrons/Fission",
                  value: neutronsPerFission,
                  min: 1,
                  max: 4,
                  step: 1,
                  set: setNeutronsPerFission,
                  unit: "",
                  id: "neutrons_per_fission",
                },
              ].map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between mb-1">
                    <label
                      htmlFor={`ctrl-${s.id}`}
                      className="text-[10px] font-mono"
                      style={{ color: "rgba(140,180,200,0.9)" }}
                    >
                      {s.label}
                    </label>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: "#00e5ff" }}
                    >
                      {typeof s.value === "number" && s.step < 1
                        ? s.value.toFixed(1)
                        : s.value}
                      {s.unit}
                    </span>
                  </div>
                  <input
                    id={`ctrl-${s.id}`}
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    aria-label={s.label}
                    onChange={(e) => s.set(Number(e.target.value) as never)}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #00e5ff ${((s.value - s.min) / (s.max - s.min)) * 100}%, rgba(20,30,60,0.8) ${((s.value - s.min) / (s.max - s.min)) * 100}%)`,
                      accentColor: "#00e5ff",
                    }}
                    data-ocid={`chain.slider_${s.id}`}
                  />
                </div>
              ))}
            </div>

            {/* Physics panel */}
            <div
              className="rounded-xl p-4 border space-y-2"
              style={{
                background: "rgba(5,5,20,0.95)",
                borderColor: "rgba(0,180,255,0.15)",
              }}
            >
              <div
                className="text-[9px] font-mono uppercase tracking-widest mb-2"
                style={{ color: "#00e5ff" }}
              >
                Physics Parameters
              </div>
              {[
                { label: "Prompt n Lifetime", value: "50 μs" },
                { label: "Delayed n Fraction β", value: "0.0065" },
                { label: "Fuel Isotope", value: "U-235" },
                { label: "Avg. Energy/Fission", value: "200 MeV" },
                {
                  label: "Neutron Generations",
                  value: Math.ceil(
                    uiStats.totalFissions / Math.max(1, nucleiCount / 10),
                  ).toString(),
                },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between py-0.5 border-b"
                  style={{ borderColor: "rgba(0,180,255,0.07)" }}
                >
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "rgba(140,180,200,0.7)" }}
                  >
                    {r.label}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{ color: "#00e5ff" }}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div
              className="rounded-xl p-4 border space-y-2"
              style={{
                background: "rgba(5,5,20,0.95)",
                borderColor: "rgba(0,180,255,0.15)",
              }}
            >
              <div
                className="text-[9px] font-mono uppercase tracking-widest mb-2"
                style={{ color: "#00e5ff" }}
              >
                Legend
              </div>
              {[
                { color: "#00e5ff", label: "Intact nucleus (fissile)" },
                {
                  color: "rgba(30,30,60,0.9)",
                  label: "Spent nucleus",
                  border: "rgba(60,60,90,0.6)",
                },
                { color: "#ffff88", label: "Neutron + trail" },
                { color: "#ff3333", label: "Control rod (absorbs)" },
                { color: "#ffd700", label: "Fission burst particles" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: l.color,
                      border: `1px solid ${l.border ?? l.color}`,
                    }}
                  />
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "rgba(140,180,200,0.8)" }}
                  >
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Point Kinetics Simulator ──────────────────────────────────────────────────

function rk4Step(state: PKEState, dt: number, reactivity: number): PKEState {
  function derivatives(s: PKEState): { dn: number; dC: PKEState["C"] } {
    const sumLC = s.C.reduce((acc, Ci, i) => acc + LAMBDA_I[i] * Ci, 0);
    const dn = ((reactivity - BETA_TOTAL) / LAMBDA_PROMPT) * s.n + sumLC;
    const dC = s.C.map(
      (Ci, i) => (BETA_I[i] / LAMBDA_PROMPT) * s.n - LAMBDA_I[i] * Ci,
    ) as PKEState["C"];
    return { dn, dC };
  }

  const d1 = derivatives(state);
  const s2: PKEState = {
    n: state.n + (d1.dn * dt) / 2,
    C: state.C.map((Ci, i) => Ci + (d1.dC[i] * dt) / 2) as PKEState["C"],
    t: state.t + dt / 2,
  };
  const d2 = derivatives(s2);
  const s3: PKEState = {
    n: state.n + (d2.dn * dt) / 2,
    C: state.C.map((Ci, i) => Ci + (d2.dC[i] * dt) / 2) as PKEState["C"],
    t: state.t + dt / 2,
  };
  const d3 = derivatives(s3);
  const s4: PKEState = {
    n: state.n + d3.dn * dt,
    C: state.C.map((Ci, i) => Ci + d3.dC[i] * dt) as PKEState["C"],
    t: state.t + dt,
  };
  const d4 = derivatives(s4);

  const newN = Math.max(
    1e-10,
    state.n + (dt / 6) * (d1.dn + 2 * d2.dn + 2 * d3.dn + d4.dn),
  );
  const newC = state.C.map((Ci, i) =>
    Math.max(
      0,
      Ci + (dt / 6) * (d1.dC[i] + 2 * d2.dC[i] + 2 * d3.dC[i] + d4.dC[i]),
    ),
  ) as PKEState["C"];
  return { n: newN, C: newC, t: state.t + dt };
}

function PointKineticsSim() {
  const [rho, setRho] = useState(0.0);
  const [refPower, setRefPower] = useState<keyof typeof REF_POWERS>("power");
  const [timeScale, setTimeScale] = useState(1);
  const [running, setRunning] = useState(false);
  const [logScale, setLogScale] = useState(false);
  const [challengeMode, setChallengeMode] = useState(false);
  const [targetPower, setTargetPower] = useState(3500e6);
  const [steadySeconds, setSteadySeconds] = useState(0);
  const [achievementMsg, setAchievementMsg] = useState("");

  const stateRef = useRef<PKEState>({
    n: 1.0,
    C: BETA_I.map(
      (bi, i) => bi / (LAMBDA_I[i] * LAMBDA_PROMPT),
    ) as PKEState["C"],
    t: 0,
  });
  const [chartData, setChartData] = useState<PKEChartPoint[]>([
    { t: 0, power: REF_POWERS[refPower] },
  ]);
  const [liveReadouts, setLiveReadouts] = useState({
    kEff: 1.0,
    period: 999,
    n: 1.0,
    power: REF_POWERS[refPower],
    elapsed: 0,
  });

  const rhoRef = useRef(rho);
  useEffect(() => {
    rhoRef.current = rho;
  }, [rho]);
  const timeScaleRef = useRef(timeScale);
  useEffect(() => {
    timeScaleRef.current = timeScale;
  }, [timeScale]);

  useEffect(() => {
    if (!running) return;
    const P0 = REF_POWERS[refPower];
    const DT = 0.01; // simulation dt
    const STEPS_PER_TICK = Math.round((0.05 * timeScaleRef.current) / DT);

    const interval = setInterval(() => {
      const currentRho = rhoRef.current;
      let s = stateRef.current;
      for (let i = 0; i < STEPS_PER_TICK; i++) {
        s = rk4Step(s, DT, currentRho);
      }
      stateRef.current = s;
      const power = s.n * P0;
      const kEff = currentRho + 1;
      const period =
        Math.abs(currentRho) < 0.0001
          ? 999
          : LAMBDA_PROMPT / (currentRho - BETA_TOTAL);
      setLiveReadouts({
        kEff,
        period: Math.min(999, Math.max(-999, period)),
        n: s.n,
        power,
        elapsed: s.t,
      });
      setChartData((prev) => {
        const next = [...prev, { t: Math.round(s.t * 10) / 10, power }];
        return next.slice(-1000);
      });

      // Challenge mode
      if (challengeMode) {
        const diff = Math.abs(power - targetPower) / targetPower;
        if (diff < 0.05) {
          setSteadySeconds((prev) => {
            const next = prev + 0.05 * timeScaleRef.current;
            if (next >= 10 && prev < 10)
              setAchievementMsg("⚛ Reactor Controlled! +10 sec steady state");
            return next;
          });
        } else {
          setSteadySeconds(0);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [running, refPower, challengeMode, targetPower]);

  function handleReset() {
    setRunning(false);
    stateRef.current = {
      n: 1.0,
      C: BETA_I.map(
        (bi, i) => bi / (LAMBDA_I[i] * LAMBDA_PROMPT),
      ) as PKEState["C"],
      t: 0,
    };
    setChartData([{ t: 0, power: REF_POWERS[refPower] }]);
    setLiveReadouts({
      kEff: 1.0,
      period: 999,
      n: 1.0,
      power: REF_POWERS[refPower],
      elapsed: 0,
    });
    setSteadySeconds(0);
    setAchievementMsg("");
  }

  function formatPower(w: number): string {
    if (w >= 1e9) return `${(w / 1e9).toFixed(3)} GW`;
    if (w >= 1e6) return `${(w / 1e6).toFixed(3)} MW`;
    if (w >= 1e3) return `${(w / 1e3).toFixed(3)} kW`;
    return `${w.toFixed(1)} W`;
  }

  function formatPeriod(p: number): string {
    if (Math.abs(p) >= 999) return "∞ s (steady)";
    return `${p > 0 ? "+" : ""}${p.toFixed(2)} s`;
  }

  const P0 = REF_POWERS[refPower];
  const progressPct = Math.min(100, (liveReadouts.power / targetPower) * 100);

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Controls column */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
          {/* Reactivity slider */}
          <div
            className="rounded-xl p-4 border space-y-4"
            style={{
              background: "rgba(5,5,20,0.95)",
              borderColor: "rgba(0,180,255,0.15)",
            }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-widest"
              style={{ color: "#00e5ff" }}
            >
              Reactor Inputs
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label
                  htmlFor="pke-rho"
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(140,180,200,0.9)" }}
                >
                  Reactivity (ρ)
                </label>
                <span
                  className="text-[10px] font-mono font-bold"
                  style={{
                    color:
                      rho > 0 ? "#f59e0b" : rho < 0 ? "#3b9eff" : "#34d399",
                  }}
                >
                  {rho >= 0 ? "+" : ""}
                  {rho.toFixed(4)} Δk/k
                </span>
              </div>
              <input
                id="pke-rho"
                type="range"
                min={-0.01}
                max={0.01}
                step={0.0001}
                value={rho}
                aria-label="Reactivity input"
                onChange={(e) => setRho(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b9eff ${((rho + 0.01) / 0.02) * 100}%, rgba(20,30,60,0.8) ${((rho + 0.01) / 0.02) * 100}%)`,
                  accentColor: "#3b9eff",
                }}
                data-ocid="pke.rho_slider"
              />
              <div className="flex justify-between mt-0.5">
                <span
                  className="text-[8px] font-mono"
                  style={{ color: "rgba(100,130,160,0.6)" }}
                >
                  -0.010
                </span>
                <span
                  className="text-[8px] font-mono"
                  style={{ color: "rgba(100,130,160,0.6)" }}
                >
                  0
                </span>
                <span
                  className="text-[8px] font-mono"
                  style={{ color: "rgba(100,130,160,0.6)" }}
                >
                  +0.010
                </span>
              </div>
            </div>

            {/* Reference power */}
            <div>
              <div
                className="text-[10px] font-mono mb-1.5"
                style={{ color: "rgba(140,180,200,0.9)" }}
              >
                Reference Power
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["research", "test", "power"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setRefPower(k)}
                    className="px-2 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all"
                    style={{
                      background:
                        refPower === k
                          ? "rgba(0,229,255,0.15)"
                          : "rgba(20,30,60,0.6)",
                      border: `1px solid ${refPower === k ? "rgba(0,229,255,0.4)" : "rgba(0,180,255,0.1)"}`,
                      color:
                        refPower === k ? "#00e5ff" : "rgba(140,180,200,0.7)",
                    }}
                    data-ocid={`pke.ref_power_${k}`}
                  >
                    {k === "research" ? "100W" : k === "test" ? "1MW" : "3.2GW"}
                  </button>
                ))}
              </div>
            </div>

            {/* Time scale */}
            <div>
              <div
                className="text-[10px] font-mono mb-1.5"
                style={{ color: "rgba(140,180,200,0.9)" }}
              >
                Time Scale
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 5, 10].map((ts) => (
                  <button
                    key={ts}
                    type="button"
                    onClick={() => setTimeScale(ts)}
                    className="px-2 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all"
                    style={{
                      background:
                        timeScale === ts
                          ? "rgba(52,211,153,0.15)"
                          : "rgba(20,30,60,0.6)",
                      border: `1px solid ${timeScale === ts ? "rgba(52,211,153,0.4)" : "rgba(0,180,255,0.1)"}`,
                      color:
                        timeScale === ts ? "#34d399" : "rgba(140,180,200,0.7)",
                    }}
                    data-ocid={`pke.timescale_${ts}x`}
                  >
                    {ts}×
                  </button>
                ))}
              </div>
            </div>

            {/* Start/Stop/Reset */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRunning((v) => !v)}
                aria-label={
                  running ? "Stop PKE simulation" : "Start PKE simulation"
                }
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                style={{
                  background: running
                    ? "rgba(248,113,113,0.15)"
                    : "rgba(52,211,153,0.15)",
                  border: `1px solid ${running ? "rgba(248,113,113,0.4)" : "rgba(52,211,153,0.4)"}`,
                  color: running ? "#f87171" : "#34d399",
                }}
                data-ocid="pke.start_stop_button"
              >
                {running ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                {running ? "Stop" : "Start"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset PKE simulation"
                className="px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                style={{
                  background: "rgba(100,100,140,0.12)",
                  border: "1px solid rgba(100,100,140,0.25)",
                  color: "rgba(180,180,220,0.8)",
                }}
                data-ocid="pke.reset_button"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live readouts */}
          <div
            className="rounded-xl p-4 border space-y-2.5"
            style={{
              background: "rgba(5,5,20,0.95)",
              borderColor: "rgba(0,180,255,0.15)",
            }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-widest mb-1"
              style={{ color: "#00e5ff" }}
            >
              Live Readouts
            </div>
            {[
              {
                label: "k-effective",
                value: liveReadouts.kEff.toFixed(5),
                color:
                  Math.abs(liveReadouts.kEff - 1) < 0.001
                    ? "#34d399"
                    : liveReadouts.kEff > 1
                      ? "#f59e0b"
                      : "#3b9eff",
              },
              {
                label: "Reactor Period",
                value: formatPeriod(liveReadouts.period),
                color:
                  Math.abs(liveReadouts.period) < 10
                    ? "#f87171"
                    : Math.abs(liveReadouts.period) < 60
                      ? "#f59e0b"
                      : "#34d399",
              },
              {
                label: "Neutron Population",
                value: liveReadouts.n.toFixed(4),
                color: "#ffff88",
              },
              {
                label: "Thermal Power",
                value: formatPower(liveReadouts.power),
                color: "#00e5ff",
              },
              {
                label: "Time Elapsed",
                value: `${liveReadouts.elapsed.toFixed(1)} s`,
                color: "rgba(140,180,200,0.8)",
              },
            ].map((r) => (
              <div
                key={r.label}
                className="flex justify-between items-baseline py-1 border-b"
                style={{ borderColor: "rgba(0,180,255,0.07)" }}
              >
                <span
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(140,180,200,0.7)" }}
                >
                  {r.label}
                </span>
                <span
                  className="text-[11px] font-mono font-bold"
                  style={{ color: r.color }}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          {/* Challenge mode */}
          <div
            className="rounded-xl p-4 border space-y-3"
            style={{
              background: "rgba(5,5,20,0.95)",
              borderColor: "rgba(245,158,11,0.2)",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="text-[9px] font-mono uppercase tracking-widest"
                style={{ color: "#f59e0b" }}
              >
                Challenge Mode
              </div>
              <button
                type="button"
                onClick={() => {
                  setChallengeMode((v) => !v);
                  setTargetPower(
                    Math.round((2800e6 + Math.random() * 800e6) / 1e8) * 1e8,
                  );
                  setSteadySeconds(0);
                  setAchievementMsg("");
                }}
                aria-label={
                  challengeMode
                    ? "Disable challenge mode"
                    : "Enable challenge mode"
                }
                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded transition-all"
                style={{
                  background: challengeMode
                    ? "rgba(245,158,11,0.2)"
                    : "rgba(100,100,140,0.15)",
                  border: `1px solid ${challengeMode ? "rgba(245,158,11,0.5)" : "rgba(100,100,140,0.3)"}`,
                  color: challengeMode ? "#f59e0b" : "rgba(140,180,200,0.6)",
                }}
                data-ocid="pke.challenge_toggle"
              >
                {challengeMode ? "ON" : "OFF"}
              </button>
            </div>
            {challengeMode && (
              <div className="space-y-2">
                <div
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(245,158,11,0.8)" }}
                >
                  Target: {formatPower(targetPower)}
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(20,30,60,0.8)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPct}%`,
                      background:
                        Math.abs(progressPct - 100) < 5 ? "#34d399" : "#f59e0b",
                    }}
                  />
                </div>
                <div
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(140,180,200,0.7)" }}
                >
                  Hold Steady: {steadySeconds.toFixed(1)} / 10 s
                </div>
                {achievementMsg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg px-3 py-2 text-[10px] font-mono font-bold text-center"
                    style={{
                      background: "rgba(52,211,153,0.15)",
                      border: "1px solid rgba(52,211,153,0.4)",
                      color: "#34d399",
                    }}
                  >
                    {achievementMsg}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chart column */}
        <div className="flex-1 min-w-0 space-y-3">
          <div
            className="rounded-xl p-4 border"
            style={{
              background: "rgba(5,5,20,0.95)",
              borderColor: "rgba(0,180,255,0.15)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-[9px] font-mono uppercase tracking-widest"
                style={{ color: "#f59e0b" }}
              >
                Power vs. Time — PKE Solution (RK4)
              </div>
              <button
                type="button"
                onClick={() => setLogScale((v) => !v)}
                aria-label={
                  logScale ? "Switch to linear scale" : "Switch to log scale"
                }
                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded transition-all"
                style={{
                  background: logScale
                    ? "rgba(245,158,11,0.2)"
                    : "rgba(100,100,140,0.15)",
                  border: `1px solid ${logScale ? "rgba(245,158,11,0.4)" : "rgba(100,100,140,0.3)"}`,
                  color: logScale ? "#f59e0b" : "rgba(140,180,200,0.6)",
                }}
                data-ocid="pke.log_scale_toggle"
              >
                {logScale ? "Log" : "Linear"}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,180,255,0.07)"
                />
                <XAxis
                  dataKey="t"
                  tick={{
                    fontSize: 9,
                    fill: "rgba(140,180,200,0.6)",
                    fontFamily: "monospace",
                  }}
                  label={{
                    value: "time (s)",
                    position: "insideBottomRight",
                    offset: -5,
                    fontSize: 9,
                    fill: "rgba(140,180,200,0.5)",
                  }}
                />
                <YAxis
                  scale={logScale ? "log" : "linear"}
                  domain={logScale ? ["auto", "auto"] : ["auto", "auto"]}
                  tick={{
                    fontSize: 9,
                    fill: "rgba(140,180,200,0.6)",
                    fontFamily: "monospace",
                  }}
                  tickFormatter={(v) => {
                    if (v >= 1e9) return `${(v / 1e9).toFixed(1)}GW`;
                    if (v >= 1e6) return `${(v / 1e6).toFixed(1)}MW`;
                    if (v >= 1e3) return `${(v / 1e3).toFixed(1)}kW`;
                    return String(Math.round(v));
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#050510",
                    border: "1px solid rgba(245,158,11,0.3)",
                    fontSize: 10,
                    fontFamily: "monospace",
                  }}
                  formatter={(v: number) => [formatPower(v), "Power"]}
                  labelFormatter={(l: number) => `t = ${l.toFixed(1)} s`}
                />
                <ReferenceLine
                  y={P0}
                  stroke="rgba(52,211,153,0.3)"
                  strokeDasharray="4 2"
                  label={{ value: "P₀", fill: "#34d399", fontSize: 9 }}
                />
                <Area
                  type="monotone"
                  dataKey="power"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#amberGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Physics explanation */}
          <div
            className="rounded-xl p-4 border space-y-2"
            style={{
              background: "rgba(5,5,20,0.95)",
              borderColor: "rgba(0,180,255,0.12)",
            }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-widest mb-2"
              style={{ color: "#00e5ff" }}
            >
              Point Kinetics Equations (U-235, 6 Precursor Groups)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                className="rounded-lg p-2.5 space-y-1"
                style={{
                  background: "rgba(0,180,255,0.04)",
                  border: "1px solid rgba(0,180,255,0.1)",
                }}
              >
                <div
                  className="text-[9px] font-mono font-bold"
                  style={{ color: "#00e5ff" }}
                >
                  Neutron equation
                </div>
                <div
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(180,200,220,0.85)" }}
                >
                  dn/dt = ((ρ−β)/Λ)·n + Σᵢ λᵢCᵢ
                </div>
              </div>
              <div
                className="rounded-lg p-2.5 space-y-1"
                style={{
                  background: "rgba(0,180,255,0.04)",
                  border: "1px solid rgba(0,180,255,0.1)",
                }}
              >
                <div
                  className="text-[9px] font-mono font-bold"
                  style={{ color: "#00e5ff" }}
                >
                  Precursor equations
                </div>
                <div
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(180,200,220,0.85)" }}
                >
                  dCᵢ/dt = (βᵢ/Λ)·n − λᵢCᵢ
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
              {[
                { param: "β", val: "0.0065", desc: "Delayed n fraction" },
                { param: "Λ", val: "50 μs", desc: "Prompt lifetime" },
                { param: "Groups", val: "6", desc: "Precursor groups" },
                { param: "Method", val: "RK4", desc: "4th order Runge-Kutta" },
              ].map((p) => (
                <div
                  key={p.param}
                  className="rounded-lg p-2 text-center"
                  style={{
                    background: "rgba(0,180,255,0.05)",
                    border: "1px solid rgba(0,180,255,0.08)",
                  }}
                >
                  <div
                    className="text-[11px] font-mono font-bold"
                    style={{ color: "#00e5ff" }}
                  >
                    {p.param} = {p.val}
                  </div>
                  <div
                    className="text-[8px] font-mono"
                    style={{ color: "rgba(140,180,200,0.6)" }}
                  >
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── External Resources & 3D Models ───────────────────────────────────────────

interface EmbedCardProps {
  title: string;
  description: string;
  attribution: string;
  src: string;
  height?: number;
  fallbackLink?: string;
}

function EmbedCard({
  title,
  description,
  attribution,
  src,
  height = 450,
  fallbackLink,
}: EmbedCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: "rgba(5,5,20,0.95)",
        borderColor: "rgba(0,180,255,0.18)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-start justify-between gap-3"
        style={{
          borderColor: "rgba(0,180,255,0.1)",
          background: "rgba(0,180,255,0.05)",
        }}
      >
        <div>
          <h4
            className="text-sm font-mono font-bold"
            style={{
              color: "#00e5ff",
              textShadow: "0 0 8px rgba(0,229,255,0.4)",
            }}
          >
            {title}
          </h4>
          <p
            className="text-[10px] font-mono mt-0.5"
            style={{ color: "rgba(140,180,200,0.7)" }}
          >
            {description}
          </p>
        </div>
        <a
          href={fallbackLink ?? src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} in new tab`}
          className="flex items-center gap-1 text-[10px] font-mono transition-all hover:scale-105 flex-shrink-0"
          style={{
            color: "#00e5ff",
            border: "1px solid rgba(0,229,255,0.3)",
            padding: "3px 8px",
            borderRadius: 6,
            background: "rgba(0,229,255,0.08)",
          }}
          data-ocid="models.open_external_link"
        >
          <ExternalLink className="w-3 h-3" /> New Tab
        </a>
      </div>

      {/* Embed / fallback */}
      {failed ? (
        <div
          className="flex flex-col items-center justify-center gap-4 py-10 px-6 text-center"
          style={{ minHeight: height * 0.6 }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.2)",
            }}
          >
            <ExternalLink className="w-6 h-6" style={{ color: "#00e5ff" }} />
          </div>
          <div>
            <div
              className="text-sm font-mono font-bold mb-1"
              style={{ color: "#00e5ff" }}
            >
              {title}
            </div>
            <p
              className="text-[10px] font-mono mb-3"
              style={{ color: "rgba(140,180,200,0.7)" }}
            >
              This resource blocks embedded frames. Open it directly for the
              full interactive experience.
            </p>
            <a
              href={fallbackLink ?? src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} in new tab`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(0,229,255,0.12)",
                border: "1px solid rgba(0,229,255,0.35)",
                color: "#00e5ff",
              }}
              data-ocid="models.fallback_open_button"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
            </a>
          </div>
        </div>
      ) : (
        <div className="relative" style={{ height }}>
          {!loaded && !failed && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ background: "rgba(5,5,16,0.95)" }}
            >
              <div className="text-center space-y-3">
                <div
                  className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto"
                  style={{
                    borderColor: "rgba(0,229,255,0.6)",
                    borderTopColor: "transparent",
                  }}
                />
                <p
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(140,180,200,0.7)" }}
                >
                  Loading {title}…
                </p>
              </div>
            </div>
          )}
          <iframe
            title={title}
            src={src}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "#050510",
            }}
            aria-label={`Interactive embed: ${title}`}
          />
        </div>
      )}

      {/* Attribution */}
      <div
        className="px-4 py-2 border-t text-[9px] font-mono"
        style={{
          borderColor: "rgba(0,180,255,0.1)",
          color: "rgba(100,130,160,0.6)",
        }}
      >
        {attribution}
      </div>
    </div>
  );
}

function ExternalResourcesPanel() {
  return (
    <div className="space-y-6">
      <EmbedCard
        title="PWR Nuclear Reactor — Interactive 3D Model"
        description="Explore a Pressurized Water Reactor in full 3D. Rotate, zoom, and inspect all major components including fuel assemblies, control rods, and coolant piping."
        attribution="PWR Nuclear Reactor by Nuclear Power group on Sketchfab — CC Attribution. Embedded via Sketchfab iframe API."
        src="https://sketchfab.com/models/e93a8031d7e1486eae36f2074969f3cb/embed?autostart=1&ui_theme=dark"
        height={420}
        fallbackLink="https://sketchfab.com/models/e93a8031d7e1486eae36f2074969f3cb"
      />

      <EmbedCard
        title="Nuclear Chain Reaction Simulation"
        description="Interactive chain reaction simulator from Explore Nuclear. Insert and withdraw control rods to go sub/supercritical and watch fission spread through fissile material."
        attribution="Nuclear Chain Reaction Simulation by explorenuclear.com — Educational resource. If blocked, use the Open in New Tab button."
        src="https://explorenuclear.com/nuclear-chain-reaction-simulation/"
        height={520}
        fallbackLink="https://explorenuclear.com/nuclear-chain-reaction-simulation/"
      />

      <EmbedCard
        title="Nuclear Reactor Kinetics Simulator"
        description="Adjust control rods and watch real-time power dynamics using point kinetics equations with 6 delayed neutron groups, by whatisnuclear.com."
        attribution="Nuclear Reactor Kinetics by whatisnuclear.com — Adjust control rods and watch power dynamics using real point kinetics equations with 6 delayed neutron groups."
        src="https://live.whatisnuclear.com/"
        height={520}
        fallbackLink="https://live.whatisnuclear.com/"
      />
    </div>
  );
}

// ─── Reactor Transient Simulator ───────────────────────────────────────────────

function ReactorTransientSim() {
  const [transientScenario, setTransientScenario] = useState<string>("");
  const [powerLevel, setPowerLevel] = useState(100);
  const [powerHistory, setPowerHistory] = useState<{ t: number; p: number }[]>([
    { t: 0, p: 100 },
  ]);
  const [isTransientRunning, setIsTransientRunning] = useState(false);
  const transientRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(0);

  const clearTransient = useCallback(() => {
    if (transientRef.current) {
      clearInterval(transientRef.current);
      transientRef.current = null;
    }
  }, []);

  function resetTransient() {
    clearTransient();
    setTransientScenario("");
    setPowerLevel(100);
    setPowerHistory([{ t: 0, p: 100 }]);
    setIsTransientRunning(false);
    timeRef.current = 0;
  }

  function startScenario(scenario: string) {
    clearTransient();
    resetTransient();
    setTransientScenario(scenario);
    setIsTransientRunning(true);
    timeRef.current = 0;

    if (scenario === "SCRAM Shutdown") {
      let p = 100;
      transientRef.current = setInterval(() => {
        timeRef.current += 0.1;
        p = p * 0.9;
        if (p < 0.5) {
          p = 0.1;
          clearTransient();
          setIsTransientRunning(false);
        }
        setPowerLevel(p);
        setPowerHistory((prev) => {
          const next = [...prev, { t: timeRef.current, p }];
          return next.slice(-300);
        });
      }, 100);
    } else if (scenario === "Rod Withdrawal") {
      let p = 100;
      transientRef.current = setInterval(() => {
        timeRef.current += 0.1;
        p = p * 1.02;
        if (p >= 200) {
          p = 200;
          clearTransient();
          setIsTransientRunning(false);
        }
        setPowerLevel(p);
        setPowerHistory((prev) => {
          const next = [...prev, { t: timeRef.current, p }];
          return next.slice(-300);
        });
      }, 100);
    } else if (scenario === "Power Pulse") {
      let p = 100;
      let rising = true;
      transientRef.current = setInterval(() => {
        timeRef.current += 0.1;
        if (rising) {
          p = p + (150 - 100) / 25; // rise to 150 over 2.5s
          if (p >= 150) {
            p = 150;
            rising = false;
          }
        } else {
          p = p - (150 - 100) / 25; // fall back to 100 over 2.5s
          if (p <= 100) {
            p = 100;
            clearTransient();
            setIsTransientRunning(false);
          }
        }
        setPowerLevel(p);
        setPowerHistory((prev) => {
          const next = [...prev, { t: timeRef.current, p }];
          return next.slice(-300);
        });
      }, 100);
    } else if (scenario === "Normal Ops") {
      let p = 100;
      transientRef.current = setInterval(() => {
        timeRef.current += 0.1;
        // small random fluctuation ±1%
        p = 100 + (Math.random() - 0.5) * 2;
        setPowerLevel(p);
        setPowerHistory((prev) => {
          const next = [...prev, { t: timeRef.current, p }];
          return next.slice(-300);
        });
      }, 100);
    }
  }

  useEffect(() => {
    return () => clearTransient();
  }, [clearTransient]);

  const powerColor =
    powerLevel < 100 ? "#34d399" : powerLevel <= 120 ? "#f59e0b" : "#f87171";

  const statusText =
    transientScenario === "SCRAM Shutdown"
      ? "SCRAM ACTIVATED"
      : transientScenario === "Rod Withdrawal"
        ? "WARNING: POSITIVE REACTIVITY"
        : transientScenario === "Power Pulse"
          ? "POWER PULSE"
          : transientScenario === "Normal Ops"
            ? "NORMAL OPERATIONS"
            : "";

  const statusColor =
    transientScenario === "SCRAM Shutdown"
      ? "#f87171"
      : transientScenario === "Rod Withdrawal"
        ? "#f59e0b"
        : transientScenario === "Power Pulse"
          ? "#fb923c"
          : transientScenario === "Normal Ops"
            ? "#34d399"
            : "rgba(140,180,200,0.6)";

  return (
    <div className="space-y-5">
      {/* Scenario buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          {
            label: "SCRAM Shutdown",
            border: "rgba(248,113,113,0.5)",
            bg: "rgba(248,113,113,0.12)",
            color: "#f87171",
          },
          {
            label: "Rod Withdrawal",
            border: "rgba(245,158,11,0.5)",
            bg: "rgba(245,158,11,0.12)",
            color: "#f59e0b",
          },
          {
            label: "Power Pulse",
            border: "rgba(251,146,60,0.5)",
            bg: "rgba(251,146,60,0.12)",
            color: "#fb923c",
          },
          {
            label: "Normal Ops",
            border: "rgba(52,211,153,0.5)",
            bg: "rgba(52,211,153,0.12)",
            color: "#34d399",
          },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => startScenario(s.label)}
            disabled={isTransientRunning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            style={{
              background:
                transientScenario === s.label ? s.bg : "rgba(20,30,60,0.6)",
              border: `1px solid ${transientScenario === s.label ? s.border : "rgba(0,180,255,0.1)"}`,
              color:
                transientScenario === s.label
                  ? s.color
                  : "rgba(140,180,200,0.7)",
            }}
            data-ocid={`transient.scenario_${s.label.replace(/\s+/g, "_").toLowerCase()}_button`}
          >
            <Zap className="w-3 h-3" />
            {s.label}
          </button>
        ))}
        <button
          type="button"
          onClick={resetTransient}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all hover:scale-105"
          style={{
            background: "rgba(100,100,140,0.12)",
            border: "1px solid rgba(100,100,140,0.25)",
            color: "rgba(180,180,220,0.8)",
          }}
          data-ocid="transient.reset_button"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Power display + status */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div
          className="rounded-xl p-5 border flex flex-col items-center justify-center min-w-[200px]"
          style={{
            background: "rgba(5,5,20,0.95)",
            borderColor: "rgba(0,180,255,0.15)",
          }}
        >
          <div
            className="text-[9px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "rgba(140,180,200,0.6)" }}
          >
            Reactor Power
          </div>
          <div
            className="text-4xl font-mono font-bold"
            style={{ color: powerColor }}
          >
            {powerLevel.toFixed(1)}%
          </div>
          {statusText && (
            <div
              className="mt-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded"
              style={{
                color: statusColor,
                background: `${statusColor}15`,
                border: `1px solid ${statusColor}40`,
              }}
            >
              {statusText}
            </div>
          )}
        </div>

        {/* Chart */}
        <div
          className="flex-1 min-w-0 rounded-xl p-4 border"
          style={{
            background: "rgba(5,5,20,0.95)",
            borderColor: "rgba(0,180,255,0.15)",
          }}
        >
          <div
            className="text-[9px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "#00e5ff" }}
          >
            Power vs. Time
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={powerHistory}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,180,255,0.07)"
              />
              <XAxis
                dataKey="t"
                tick={{
                  fontSize: 8,
                  fill: "rgba(140,180,200,0.6)",
                  fontFamily: "monospace",
                }}
                label={{
                  value: "time (s)",
                  position: "insideBottomRight",
                  offset: -5,
                  fontSize: 8,
                  fill: "rgba(140,180,200,0.5)",
                }}
              />
              <YAxis
                domain={[0, 250]}
                tick={{
                  fontSize: 8,
                  fill: "rgba(140,180,200,0.6)",
                  fontFamily: "monospace",
                }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: "#050510",
                  border: "1px solid rgba(0,229,255,0.3)",
                  fontSize: 10,
                  fontFamily: "monospace",
                }}
                formatter={(v: number) => [`${v.toFixed(1)}%`, "Power"]}
                labelFormatter={(l: number) => `t = ${l.toFixed(1)} s`}
              />
              <ReferenceLine
                y={100}
                stroke="rgba(52,211,153,0.3)"
                strokeDasharray="4 2"
              />
              <ReferenceLine
                y={120}
                stroke="rgba(245,158,11,0.3)"
                strokeDasharray="4 2"
              />
              <Line
                type="monotone"
                dataKey="p"
                stroke={powerColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Educational callout */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: "rgba(5,5,20,0.95)",
          borderColor: "rgba(0,180,255,0.12)",
        }}
      >
        <div
          className="text-[9px] font-mono uppercase tracking-widest mb-2"
          style={{ color: "#00e5ff" }}
        >
          About SCRAM
        </div>
        <p
          className="text-[11px] font-mono leading-relaxed"
          style={{ color: "rgba(180,200,220,0.85)" }}
        >
          SCRAM (Safety Control Rod Axial Magnets) rapidly inserts all control
          rods. This is the primary emergency shutdown system in all commercial
          reactors.
        </p>
      </div>
    </div>
  );
}

// ─── Sub-tab config ─────────────────────────────────────────────────────────────

const SUB_TABS: { id: SimSubTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "chain",
    label: "Chain Reaction",
    icon: <Atom className="w-3.5 h-3.5" />,
  },
  {
    id: "kinetics",
    label: "Point Kinetics",
    icon: <Activity className="w-3.5 h-3.5" />,
  },
  {
    id: "transient",
    label: "Reactor Transient",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    id: "models",
    label: "3D Models & Resources",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
  },
];

// ─── InteractiveSimMode root ────────────────────────────────────────────────────

export default function InteractiveSimMode({
  reactorType: _reactorType,
}: InteractiveSimModeProps) {
  const [subTab, setSubTab] = useState<SimSubTab>("chain");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* Header */}
      <div
        className="rounded-2xl p-4 border"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,180,255,0.07) 0%, rgba(5,5,20,0.95) 100%)",
          borderColor: "rgba(0,180,255,0.2)",
        }}
      >
        <h2
          className="text-sm font-mono font-bold mb-0.5"
          style={{
            color: "#00e5ff",
            textShadow: "0 0 12px rgba(0,229,255,0.5)",
          }}
        >
          ⚛ Interactive Simulation Mode
        </h2>
        <p
          className="text-[10px] font-mono"
          style={{ color: "rgba(140,180,200,0.7)" }}
        >
          High-fidelity nuclear physics simulations — canvas-based chain
          reaction physics, RK4 point kinetics solver, and curated external 3D
          models.
        </p>
      </div>

      {/* Sub-tab switcher */}
      <div
        className="flex flex-wrap gap-1.5 p-1.5 rounded-xl border w-fit"
        style={{
          background: "rgba(5,5,20,0.95)",
          borderColor: "rgba(0,180,255,0.15)",
        }}
        role="tablist"
        aria-label="Interactive simulation sub-modes"
        data-ocid="sim.subtab_switcher"
      >
        {SUB_TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={subTab === id}
            onClick={() => setSubTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-mono font-bold transition-all duration-200"
            style={{
              background:
                subTab === id ? "rgba(0,229,255,0.15)" : "transparent",
              border: `1px solid ${subTab === id ? "rgba(0,229,255,0.4)" : "transparent"}`,
              color: subTab === id ? "#00e5ff" : "rgba(140,180,200,0.6)",
              boxShadow:
                subTab === id ? "0 0 12px rgba(0,229,255,0.15)" : "none",
            }}
            data-ocid={`sim.subtab_${id}`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={subTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          role="tabpanel"
          aria-label={SUB_TABS.find((t) => t.id === subTab)?.label ?? ""}
        >
          {subTab === "chain" && <ChainReactionSim />}
          {subTab === "kinetics" && <PointKineticsSim />}
          {subTab === "transient" && <ReactorTransientSim />}
          {subTab === "models" && <ExternalResourcesPanel />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
