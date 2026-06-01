import { AudienceBadge } from "@/components/AudienceBadge";
import { CitationMarker } from "@/components/CitationMarker";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Double-slit animation ────────────────────────────────────────────────────────────
function DoubleSlit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const runRef = useRef(running);
  useEffect(() => {
    runRef.current = running;
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 260 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    // Accumulator for interference pattern
    const buckets = new Float32Array(H);
    let maxVal = 1;
    let frameId = 0;
    // Slit parameters (in canvas coords)
    const slitX = cx - W * 0.15;
    const slit1Y = H * 0.43;
    const slit2Y = H * 0.57;
    const slitW = H * 0.03;
    const _d = Math.abs(slit2Y - slit1Y); // slit separation
    const L = W * 0.45; // distance to screen
    const k = (2 * Math.PI) / (H * 0.08); // wave number
    let t = 0;

    const draw = () => {
      frameId = requestAnimationFrame(draw);
      if (!runRef.current) return;
      ctx.clearRect(0, 0, W, H);
      // Background
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      // Barrier
      ctx.fillStyle = "rgba(80,90,120,0.9)";
      ctx.fillRect(slitX - 4, 0, 8, slit1Y - slitW);
      ctx.fillRect(slitX - 4, slit1Y + slitW, 8, slit2Y - slit1Y - 2 * slitW);
      ctx.fillRect(slitX - 4, slit2Y + slitW, 8, H - (slit2Y + slitW));
      // Screen
      ctx.strokeStyle = "rgba(100,110,180,0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + L, 0);
      ctx.lineTo(cx + L, H);
      ctx.stroke();
      // Incoming plane wave
      for (let iy = 0; iy < H; iy += 12) {
        const wavex = (t % 40) * (W / 40);
        for (let ix = 0; ix < slitX; ix += 4) {
          const x = (ix + wavex) % slitX;
          const alpha =
            Math.sin((x / slitX) * Math.PI * 8 - t * 0.3) * 0.3 + 0.3;
          ctx.fillStyle = `rgba(80,140,255,${alpha.toFixed(2)})`;
          ctx.fillRect(x, iy, 2, 2);
        }
      }
      // Fire random electrons toward slits
      const numNew = 3;
      for (let i = 0; i < numNew; i++) {
        // Choose which slit
        const slitY = Math.random() < 0.5 ? slit1Y : slit2Y;
        if (
          Math.abs(slitY - slit1Y) > slitW &&
          Math.abs(slitY - slit2Y) > slitW
        )
          continue;
        // Interference intensity at screen position y
        const screenY = Math.floor(Math.random() * H);
        const r1 = Math.sqrt(L * L + (screenY - slit1Y) * (screenY - slit1Y));
        const r2 = Math.sqrt(L * L + (screenY - slit2Y) * (screenY - slit2Y));
        const intensity = Math.cos((k * (r1 - r2)) / 2) ** 2;
        if (Math.random() < intensity) {
          buckets[screenY] += 1;
          if (buckets[screenY] > maxVal) maxVal = buckets[screenY];
        }
      }
      // Draw accumulated interference pattern on screen
      for (let iy = 0; iy < H; iy++) {
        const brightness = buckets[iy] / maxVal;
        if (brightness < 0.01) continue;
        const r = Math.round(brightness * 100 + 155);
        const b = Math.round(255 - brightness * 80);
        ctx.fillStyle = `rgba(${r},180,${b},${Math.min(1, brightness * 1.5).toFixed(2)})`;
        ctx.fillRect(cx + L, iy, 18, 1);
      }
      // Wave propagation animation between slit and screen
      for (let iy = 0; iy < H; iy += 3) {
        for (let ix = slitX + 6; ix < cx + L - 4; ix += 6) {
          const dx = ix - slitX;
          const r1 = Math.sqrt(dx * dx + (iy - slit1Y) * (iy - slit1Y));
          const r2 = Math.sqrt(dx * dx + (iy - slit2Y) * (iy - slit2Y));
          const w1 = Math.cos(k * r1 - t * 0.4) / (r1 * 0.02 + 1);
          const w2 = Math.cos(k * r2 - t * 0.4) / (r2 * 0.02 + 1);
          const superpos = (w1 + w2) * 0.5;
          const alpha = Math.abs(superpos) * 0.35;
          ctx.fillStyle = `rgba(100,180,255,${Math.min(0.6, alpha).toFixed(2)})`;
          ctx.fillRect(ix, iy, 3, 3);
        }
      }
      t += 0.5;
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: 260 }}
        aria-label="Double-slit interference pattern simulation"
      />
      <div className="flex items-center gap-3 justify-center">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
          data-ocid="atoms.double_slit_toggle"
        >
          {running ? "Pause" : "Resume"}
        </button>
        <span className="text-xs text-muted-foreground">
          Electrons accumulate -- interference pattern emerges without "knowing"
          which slit they passed through
        </span>
      </div>
    </div>
  );
}

// ── Heisenberg Uncertainty Interactive (animated wave packet) ──────────────────
function HeisenbergSlider() {
  const [sigmaX, setSigmaX] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sigmaRef = useRef(sigmaX);
  useEffect(() => {
    sigmaRef.current = sigmaX;
  }, [sigmaX]);

  const hbar = 1.0546e-34;
  const sigmaXm = sigmaX * 1e-12;
  const minSigmaP = hbar / (2 * sigmaXm);
  const sigmaP_eVc = (minSigmaP * 3e8) / 1.602e-19 / 1e6;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 180 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    let t = 0;
    let frameId = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      const sx = sigmaRef.current;
      const cx = W / 2;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      // Position Gaussian (animated wave packet)
      const xSigmaPx = (sx / 200) * (W / 3);
      const pSigmaPx = Math.max(8, W / 3 / (sx / 200 + 0.3));
      const waveOffset = Math.sin(t * 0.03) * xSigmaPx * 0.5;
      // Left: position space
      ctx.strokeStyle = "rgba(99,179,237,0.9)";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      for (let px = 0; px < cx - 10; px++) {
        const x = px - cx / 2 + waveOffset;
        const val = H * 0.6 * Math.exp(-(x * x) / (2 * xSigmaPx * xSigmaPx));
        if (px === 0) ctx.moveTo(px, H - val - 20);
        else ctx.lineTo(px, H - val - 20);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(99,179,237,0.12)";
      ctx.fill();
      ctx.fillStyle = "rgba(180,220,255,0.8)";
      ctx.font = `${10 * dpr}px monospace`;
      ctx.fillText(`Δx = ${sx} pm`, 8, 14);
      // Divider
      ctx.strokeStyle = "rgba(80,90,120,0.6)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, H);
      ctx.stroke();
      // Right: momentum space
      ctx.strokeStyle = "rgba(251,191,36,0.9)";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      for (let px = cx + 10; px < W; px++) {
        const x = px - (cx + W / 4);
        const val = H * 0.6 * Math.exp(-(x * x) / (2 * pSigmaPx * pSigmaPx));
        if (px === cx + 10) ctx.moveTo(px, H - val - 20);
        else ctx.lineTo(px, H - val - 20);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(251,191,36,0.12)";
      ctx.fill();
      ctx.fillStyle = "rgba(251,191,36,0.9)";
      ctx.font = `${10 * dpr}px monospace`;
      ctx.fillText(`Δp ≥ ${sigmaP_eVc.toFixed(4)} MeV/c`, cx + 8, 14);
      // Labels
      ctx.fillStyle = "rgba(200,200,200,0.7)";
      ctx.font = `${9 * dpr}px monospace`;
      ctx.fillText("Position space |ψ(x)|²", 8, H - 6);
      ctx.fillText("Momentum space |φ(p)|²", cx + 8, H - 6);
      // HUP indicator bar
      const hupRatio =
        (sx * sigmaP_eVc) / ((hbar * 3e8) / 1.602e-19 / 1e6 / 2 / 1e-12);
      const barW = W * 0.3;
      const barX = cx - barW / 2;
      const barY = H - 28;
      ctx.fillStyle = "rgba(80,90,120,0.4)";
      ctx.fillRect(barX, barY, barW, 6);
      const fillW = Math.min(barW, barW * Math.min(hupRatio / 10, 1));
      ctx.fillStyle =
        hupRatio >= 1 ? "rgba(34,197,94,0.8)" : "rgba(239,68,68,0.8)";
      ctx.fillRect(barX, barY, fillW, 6);
      ctx.fillStyle = "rgba(200,200,200,0.6)";
      ctx.font = `${8 * dpr}px monospace`;
      ctx.fillText(`Δx·Δp ≥ ℏ/2  (${hupRatio.toFixed(2)}×)`, barX, barY - 4);
      t += 1;
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [sigmaP_eVc]);

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: 180 }}
        aria-label="Heisenberg uncertainty principle visualization"
      />
      <div className="flex items-center gap-3 px-1">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Narrow x
        </span>
        <input
          type="range"
          min={5}
          max={200}
          value={sigmaX}
          onChange={(e) => setSigmaX(Number(e.target.value))}
          className="flex-1 accent-primary h-1"
          aria-label="Position uncertainty sigma_x in picometers"
          data-ocid="atoms.hup_slider"
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Wide x
        </span>
      </div>
      <div className="text-xs text-center text-muted-foreground">
        Δx = {sigmaX} pm &nbsp;|&nbsp; min Δp = {sigmaP_eVc.toFixed(4)} MeV/c
        &nbsp;|&nbsp; Δx · Δp ≥ ℏ/2
      </div>
    </div>
  );
}

// ── Quantum Tunneling Animation ────────────────────────────────────────────────
// biome-ignore lint/correctness/noUnusedVariables: component used below
function QuantumTunneling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [barrierHeight, setBarrierHeight] = useState(60);
  const barrierRef = useRef(60);
  useEffect(() => {
    barrierRef.current = barrierHeight;
  }, [barrierHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 180 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    let t = 0;
    let frameId = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      const bh = barrierRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      // Barrier
      const bLeft = W * 0.45;
      const bRight = W * 0.55;
      const bTop = H - (bh / 100) * H * 0.7 - 20;
      ctx.fillStyle = "rgba(120,120,140,0.4)";
      ctx.fillRect(bLeft, bTop, bRight - bLeft, H - bTop);
      ctx.strokeStyle = "rgba(180,180,200,0.6)";
      ctx.lineWidth = 1 * dpr;
      ctx.strokeRect(bLeft, bTop, bRight - bLeft, H - bTop);
      // Wave packet approaching
      const packetX = ((t * 1.5) % (W + 100)) - 50;
      const packetSigma = 25 * dpr;
      const k = 0.15;
      // Incident wave
      if (packetX < bLeft - packetSigma) {
        for (let px = 0; px < bLeft; px += 2) {
          const dx = px - packetX;
          const envelope = Math.exp(
            -(dx * dx) / (2 * packetSigma * packetSigma),
          );
          const wave = envelope * Math.cos(k * dx - t * 0.08);
          const y = H / 2 + wave * 30 * dpr;
          ctx.fillStyle = `rgba(99,179,237,${Math.abs(wave).toFixed(2)})`;
          ctx.fillRect(px, y, 2, 2);
        }
      }
      // Transmitted wave (tunneling)
      const transmission = Math.exp(-bh / 25);
      if (packetX > bLeft) {
        for (let px = bRight; px < W; px += 2) {
          const dx = px - packetX;
          const envelope =
            Math.exp(-(dx * dx) / (2 * packetSigma * packetSigma)) *
            transmission;
          const wave = envelope * Math.cos(k * dx - t * 0.08);
          const y = H / 2 + wave * 30 * dpr;
          ctx.fillStyle = `rgba(167,139,250,${Math.abs(wave).toFixed(2)})`;
          ctx.fillRect(px, y, 2, 2);
        }
      }
      // Reflected wave
      if (packetX > bLeft - packetSigma && packetX < bLeft + packetSigma) {
        for (let px = 0; px < bLeft; px += 2) {
          const dx = px - (2 * bLeft - packetX);
          const envelope =
            Math.exp(-(dx * dx) / (2 * packetSigma * packetSigma)) *
            (1 - transmission) *
            0.5;
          const wave = envelope * Math.cos(-k * dx - t * 0.08);
          const y = H / 2 + wave * 30 * dpr;
          ctx.fillStyle = `rgba(251,191,36,${Math.abs(wave).toFixed(2)})`;
          ctx.fillRect(px, y, 2, 2);
        }
      }
      // Labels
      ctx.fillStyle = "rgba(200,200,200,0.6)";
      ctx.font = `${9 * dpr}px monospace`;
      ctx.fillText("Incident", 8, H - 8);
      ctx.fillText("Barrier", bLeft + 4, bTop - 4);
      ctx.fillText("Transmitted", bRight + 4, H - 8);
      ctx.fillStyle = "rgba(167,139,250,0.8)";
      ctx.fillText(
        `T ≈ ${(transmission * 100).toFixed(1)}%`,
        bRight + 4,
        H - 20,
      );
      t += 1;
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: 180 }}
        aria-label="Quantum tunneling animation"
      />
      <div className="flex items-center gap-3 px-1">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Low barrier
        </span>
        <input
          type="range"
          min={10}
          max={100}
          value={barrierHeight}
          onChange={(e) => setBarrierHeight(Number(e.target.value))}
          className="flex-1 accent-primary h-1"
          aria-label="Barrier height"
          data-ocid="atoms.tunneling_barrier"
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          High barrier
        </span>
      </div>
    </div>
  );
}

// ── Bloch Sphere Spin Visualizer ───────────────────────────────────────────────
// biome-ignore lint/correctness/noUnusedVariables: component used below
function BlochSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"up" | "down" | "plus" | "minus">("up");
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 200 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2 + 10 * dpr;
    const R = Math.min(W, H) * 0.35;
    let t = 0;
    let frameId = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      // Sphere wireframe
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R, R * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 0.4, R, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Axes
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, cy - R - 10);
      ctx.lineTo(cx, cy + R + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - R - 10, cy);
      ctx.lineTo(cx + R + 10, cy);
      ctx.stroke();
      // Labels
      ctx.fillStyle = "rgba(200,200,200,0.6)";
      ctx.font = `${10 * dpr}px monospace`;
      ctx.fillText("|0⟩", cx - 8, cy - R - 14);
      ctx.fillText("|1⟩", cx - 8, cy + R + 24);
      ctx.fillText("|+⟩", cx + R + 6, cy + 4);
      ctx.fillText("|−⟩", cx - R - 24, cy + 4);
      // State vector
      const st = stateRef.current;
      let theta = 0;
      let phi = 0;
      switch (st) {
        case "up":
          theta = 0;
          phi = 0;
          break;
        case "down":
          theta = Math.PI;
          phi = 0;
          break;
        case "plus":
          theta = Math.PI / 2;
          phi = 0;
          break;
        case "minus":
          theta = Math.PI / 2;
          phi = Math.PI;
          break;
      }
      // Animate transition
      const targetX =
        cx + R * Math.sin(theta) * Math.cos(phi) * Math.cos(t * 0.02);
      const targetY = cy - R * Math.cos(theta) * Math.cos(t * 0.02) * 0.6;
      // Draw vector
      ctx.strokeStyle = "rgba(239,68,68,0.9)";
      ctx.lineWidth = 2.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = "rgba(239,68,68,1)";
      ctx.beginPath();
      ctx.arc(targetX, targetY, 5 * dpr, 0, Math.PI * 2);
      ctx.fill();
      // State label
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = `${12 * dpr}px monospace`;
      const labels = {
        up: "|↑⟩ = |0⟩",
        down: "|↓⟩ = |1⟩",
        plus: "|+⟩",
        minus: "|−⟩",
      };
      ctx.fillText(labels[st], cx - 30, 20);
      t += 1;
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: 200 }}
        aria-label="Bloch sphere spin state visualizer"
      />
      <div className="flex gap-2 justify-center flex-wrap">
        {(["up", "down", "plus", "minus"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setState(s)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${state === s ? "bg-primary/30 text-primary border border-primary/50" : "text-muted-foreground hover:bg-muted/30"}`}
            data-ocid={`atoms.bloch_${s}`}
          >
            {s === "up"
              ? "|↑⟩"
              : s === "down"
                ? "|↓⟩"
                : s === "plus"
                  ? "|+⟩"
                  : "|−⟩"}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Quantum Numbers Interactive ─────────────────────────────────────────────────────────
function QuantumNumbers() {
  const [n, setN] = useState(3);
  const [l, setL] = useState(1);
  const [ml, setMl] = useState(0);
  const [ms, setMs] = useState<"up" | "down">("up");

  const maxL = n - 1;
  const _maxMl = l;
  const safeL = Math.min(l, maxL);
  const safeMl = Math.max(-safeL, Math.min(safeL, ml));

  const orbital = ["s", "p", "d", "f", "g", "h"][safeL] ?? "?";
  const subshell = `${n}${orbital}`;
  const maxElec = 2 * (2 * safeL + 1);
  const energy = (-13.6 / (n * n)).toFixed(4);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* n */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold text-primary mb-1">
            n (principal)
          </p>
          <input
            type="range"
            min={1}
            max={7}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-primary h-1 mb-2"
            aria-label="Principal quantum number n"
            data-ocid="atoms.qn_n_slider"
          />
          <p className="font-mono text-2xl font-bold text-foreground text-center">
            {n}
          </p>
          <p className="text-[10px] text-muted-foreground text-center mt-1">
            Shell: {["K", "L", "M", "N", "O", "P", "Q"][n - 1]}
          </p>
        </div>
        {/* l */}
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
          <p className="text-xs font-semibold text-yellow-400 mb-1">
            l (azimuthal)
          </p>
          <input
            type="range"
            min={0}
            max={maxL}
            value={safeL}
            onChange={(e) => setL(Number(e.target.value))}
            className="w-full accent-yellow-400 h-1 mb-2"
            aria-label="Azimuthal quantum number l"
            data-ocid="atoms.qn_l_slider"
          />
          <p className="font-mono text-2xl font-bold text-foreground text-center">
            {safeL}
          </p>
          <p className="text-[10px] text-muted-foreground text-center mt-1">
            Orbital: {orbital}-type
          </p>
        </div>
        {/* ml */}
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
          <p className="text-xs font-semibold text-emerald-400 mb-1">
            m_l (magnetic)
          </p>
          <input
            type="range"
            min={-safeL}
            max={safeL}
            value={safeMl}
            onChange={(e) => setMl(Number(e.target.value))}
            className="w-full accent-emerald-400 h-1 mb-2"
            aria-label="Magnetic quantum number ml"
            data-ocid="atoms.qn_ml_slider"
          />
          <p className="font-mono text-2xl font-bold text-foreground text-center">
            {safeMl}
          </p>
          <p className="text-[10px] text-muted-foreground text-center mt-1">
            Range: {-safeL} to {safeL}
          </p>
        </div>
        {/* ms */}
        <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
          <p className="text-xs font-semibold text-rose-400 mb-1">m_s (spin)</p>
          <div className="flex gap-2 justify-center my-2">
            <button
              type="button"
              onClick={() => setMs("up")}
              className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
                ms === "up"
                  ? "bg-rose-500/30 text-rose-300 border border-rose-500/40"
                  : "text-muted-foreground hover:bg-muted/30"
              }`}
              data-ocid="atoms.qn_spin_up"
            >
              +1/2 Up
            </button>
            <button
              type="button"
              onClick={() => setMs("down")}
              className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
                ms === "down"
                  ? "bg-rose-500/30 text-rose-300 border border-rose-500/40"
                  : "text-muted-foreground hover:bg-muted/30"
              }`}
              data-ocid="atoms.qn_spin_down"
            >
              -1/2 Down
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            Spin: {ms}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-muted/20 border border-border p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Subshell</p>
          <p className="font-mono text-primary font-bold">{subshell}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Orbital label</p>
          <p className="font-mono text-foreground">
            {subshell} m_l={safeMl} m_s={ms === "up" ? "+1/2" : "-1/2"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Subshell capacity</p>
          <p className="font-mono text-foreground">{maxElec} electrons</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">H Energy (n)</p>
          <p className="font-mono text-foreground">{energy} eV</p>
        </div>
      </div>

      {/* Orbital filling diagram (simplified) */}
      <div className="rounded-lg bg-muted/10 border border-border p-4">
        <p className="text-xs font-semibold text-foreground mb-3">
          Orbital filling (Pauli exclusion -- each box: one m_l, two arrows =
          two m_s)
        </p>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 2 * safeL + 1 }, (_, i) => i - safeL).map(
            (m) => (
              <div key={m} className="flex flex-col items-center gap-1">
                <div className="w-10 h-8 rounded border border-border bg-muted/20 flex items-center justify-center gap-0.5">
                  <span
                    className={`text-sm ${
                      Math.abs(m) <= Math.abs(safeMl)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    \u2191
                  </span>
                  <span
                    className={`text-sm ${
                      ms === "down" && m === safeMl
                        ? "text-rose-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    \u2193
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">m={m}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

// ── Orbital shapes (canvas-based simplified) ────────────────────────────────────────
function OrbitalShapes() {
  const orbitals = [
    {
      label: "1s (n=1, l=0)",
      color: "rgba(99,179,237,0.85)",
      type: "sphere" as const,
    },
    {
      label: "2p (n=2, l=1)",
      color: "rgba(251,191,36,0.85)",
      type: "dumbbell" as const,
    },
    {
      label: "3d (n=3, l=2)",
      color: "rgba(167,139,250,0.85)",
      type: "clover" as const,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {orbitals.map((orb) => (
        <div key={orb.label} className="text-center">
          <OrbitalCanvas type={orb.type} color={orb.color} />
          <p className="text-xs text-muted-foreground mt-1">{orb.label}</p>
        </div>
      ))}
    </div>
  );
}

function OrbitalCanvas({
  type,
  color,
}: { type: "sphere" | "dumbbell" | "clover"; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 120 * dpr;
    canvas.height = 120 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    ctx.clearRect(0, 0, W, H);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.4);
    grad.addColorStop(0, color.replace("0.85", "1"));
    grad.addColorStop(0.6, color);
    grad.addColorStop(1, color.replace("0.85", "0"));
    if (type === "sphere") {
      ctx.beginPath();
      ctx.arc(cx, cy, W * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    } else if (type === "dumbbell") {
      const rg1 = ctx.createRadialGradient(
        cx,
        cy - H * 0.26,
        2,
        cx,
        cy - H * 0.26,
        H * 0.26,
      );
      rg1.addColorStop(0, color.replace("0.85", "1"));
      rg1.addColorStop(1, color.replace("0.85", "0"));
      ctx.beginPath();
      ctx.arc(cx, cy - H * 0.26, H * 0.24, 0, Math.PI * 2);
      ctx.fillStyle = rg1;
      ctx.fill();
      const rg2 = ctx.createRadialGradient(
        cx,
        cy + H * 0.26,
        2,
        cx,
        cy + H * 0.26,
        H * 0.26,
      );
      rg2.addColorStop(0, color.replace("0.85", "1"));
      rg2.addColorStop(1, color.replace("0.85", "0"));
      ctx.beginPath();
      ctx.arc(cx, cy + H * 0.26, H * 0.24, 0, Math.PI * 2);
      ctx.fillStyle = rg2;
      ctx.fill();
    } else {
      for (let lobe = 0; lobe < 4; lobe++) {
        const angle = (lobe / 4) * Math.PI * 2;
        const lx = cx + Math.cos(angle) * H * 0.24;
        const ly = cy + Math.sin(angle) * H * 0.24;
        const rg = ctx.createRadialGradient(lx, ly, 2, lx, ly, H * 0.22);
        rg.addColorStop(0, color.replace("0.85", "1"));
        rg.addColorStop(1, color.replace("0.85", "0"));
        ctx.beginPath();
        ctx.arc(lx, ly, H * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();
      }
    }
  }, [type, color]);
  return (
    <canvas
      ref={canvasRef}
      style={{ width: 120, height: 120 }}
      className="mx-auto rounded"
      aria-label={`${type} orbital shape`}
    />
  );
}

export default function QuantumMechanics() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <PageHeader
        title="Quantum Mechanical Basis of Atomic Theory"
        subtitle="Wave-particle duality, the Schrodinger equation, Born's probability interpretation, Heisenberg's uncertainty principle, and quantum numbers -- the mathematical foundations of modern chemistry and nuclear physics."
        audienceLevel="advanced"
        readTimeMin={50}
      />

      {/* ── Wave-particle duality ── */}
      <SectionCard className="mb-8" data-ocid="atoms.wave_particle_card">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Wave-Particle Duality
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The double-slit experiment -- the most beautiful experiment in
              physics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AudienceBadge level="intermediate" />
            <CitationMarker refId={11} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          In 1801, Thomas Young showed that light passing through two narrow
          slits creates an interference pattern on a screen -- evidence of wave
          behavior. When repeated with single electrons (Jonsson, 1961;
          Tonomura, 1989), the same pattern emerges dot by dot, even when
          electrons are sent one at a time. Each electron interferes with itself
          -- it passes through both slits simultaneously as a probability wave,
          collapsing to a definite position only upon measurement. This is
          wave-particle duality in its most profound form.
        </p>
        <DoubleSlit />
        <EquationBlock
          latex="\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE_k}}"
          annotation="de Broglie wavelength: any particle with momentum p has an associated wavelength lambda. For a 50 eV electron: lambda = h/sqrt(2 * 9.109e-31 * 50*1.602e-19) = 0.174 nm -- comparable to interatomic spacings, enabling electron diffraction."
          label="de Broglie Wavelength"
        />
      </SectionCard>

      {/* ── Schrodinger Equation ── */}
      <CollapsibleSection
        id="qm-schrodinger"
        title="The Schrodinger Equation"
        badge={<AudienceBadge level="advanced" />}
        defaultOpen={true}
        data-ocid="atoms.schrodinger_section"
      >
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          In 1926, Erwin Schrodinger published the wave equation that governs
          all non-relativistic quantum systems. Unlike Newton's F=ma
          (deterministic trajectories), Schrodinger's equation propagates a
          wavefunction psi -- encoding all probabilistic information about the
          system.
          <CitationMarker refId={12} />
        </p>
        <EquationBlock
          latex="i\\hbar\\,\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t) = \\left[-\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)\\right]\\Psi(\\mathbf{r},t)"
          annotation="Time-dependent Schrodinger equation: i*hbar * d(Psi)/dt = H_hat * Psi. The left side is time evolution; the right side is the Hamiltonian (kinetic + potential energy operator) acting on the wavefunction. This is the quantum analog of Hamilton's classical equations of motion."
          label="Time-Dependent Schrodinger Equation"
        />
        <EquationBlock
          latex="\\hat{H}\\psi_n(\\mathbf{r}) = E_n\\,\\psi_n(\\mathbf{r}) \\qquad \\Psi(\\mathbf{r},t) = \\psi_n(\\mathbf{r})\,e^{-iE_n t/\\hbar}"
          annotation="Time-independent (stationary state) Schrodinger equation. For conservative potentials V(r), separating variables gives energy eigenstates psi_n with definite energies E_n. The full time-dependent wavefunction oscillates at frequency E_n/hbar."
          label="Time-Independent Schrodinger Equation"
        />
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            For hydrogen (V = -e^2/(4*pi*eps_0*r)), the exact solutions are:
          </p>
          <EquationBlock
            latex="\\psi_{n\\ell m}(r,\\theta,\\phi) = R_{n\\ell}(r)\\,Y_\\ell^m(\\theta,\\phi) \\qquad E_n = -\\frac{13.6\\text{ eV}}{n^2}"
            annotation="Hydrogen wavefunctions: radial part R_nl(r) times spherical harmonic Y_l^m(theta, phi). The radial functions involve associated Laguerre polynomials; the angular functions are standard spherical harmonics. Energy depends only on principal quantum number n."
            label="Hydrogen Atom Wavefunctions"
          />
        </div>
      </CollapsibleSection>

      {/* ── Born interpretation ── */}
      <CollapsibleSection
        id="qm-born"
        title="Born's Probability Interpretation of |psi|^2"
        badge={<AudienceBadge level="advanced" />}
        defaultOpen={false}
        data-ocid="atoms.born_section"
      >
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Max Born (1926) provided the physical interpretation of the
          wavefunction: |psi(r,t)|^2 dV is the probability of finding the
          particle in the volume element dV at position r and time t. This
          "Copenhagen interpretation" remains the standard view. The
          wavefunction itself is not directly observable -- only |psi|^2
          (probability density) has physical meaning.
          <CitationMarker refId={13} />
        </p>
        <EquationBlock
          latex="P(\\mathbf{r},t)\,dV = |\\Psi(\\mathbf{r},t)|^2\,dV \\qquad \\int_{\\text{all space}}|\\Psi|^2\,dV = 1"
          annotation="Born rule: the probability of finding the particle in volume dV equals |Psi|^2 * dV. The normalization condition (integral = 1) ensures total probability is 100%. Born received the Nobel Prize in Physics in 1954 for this contribution."
          label="Born Rule and Normalization"
        />
        <EquationBlock
          latex="\\langle A \\rangle = \\int \\Psi^* \\hat{A}\\, \\Psi\,dV"
          annotation="Expectation value: the average measured value of observable A (e.g., position, momentum, energy) is the integral of Psi-star times the operator A-hat times Psi over all space. Individual measurements are random; the expectation value is their statistical mean."
          label="Quantum Mechanical Expectation Value"
        />
        <div className="mt-4">
          <p className="text-sm font-semibold text-foreground mb-2">
            Atomic Orbital Shapes -- |psi|^2 Probability Density
          </p>
          <OrbitalShapes />
        </div>
      </CollapsibleSection>

      {/* ── Heisenberg Uncertainty ── */}
      <CollapsibleSection
        id="qm-heisenberg"
        title="Heisenberg Uncertainty Principle"
        badge={<AudienceBadge level="advanced" />}
        defaultOpen={false}
        data-ocid="atoms.heisenberg_section"
      >
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Werner Heisenberg (1927) derived a fundamental limit on the
          simultaneous precision of conjugate variables. This is not a
          technological limitation -- it is a mathematical consequence of wave
          mechanics. A particle described by a narrow wavepacket (precise
          position) must be a superposition of many momentum eigenstates (large
          momentum uncertainty).
          <CitationMarker refId={14} />
        </p>
        <EquationBlock
          latex="\\sigma_x\,\\sigma_p \\geq \\frac{\\hbar}{2} \\qquad \\sigma_E\,\\sigma_t \\geq \\frac{\\hbar}{2}"
          annotation="Heisenberg uncertainty relations: the product of standard deviations of position and momentum, or energy and time, must be at least hbar/2 = 5.27e-35 J*s. These constrain ALL quantum states, not just measurement devices."
          label="Heisenberg Uncertainty Principle"
        />
        <HeisenbergSlider />
        <div className="mt-4 rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">Physical consequences</p>
          <ul className="ml-4 space-y-1 list-disc">
            <li>
              Electrons cannot spiral into the nucleus: confining an electron to
              r less than 1 fm would require delta_p greater than hbar/(2*r) ~
              100 MeV/c, far exceeding the binding energy -- atoms are stable.
            </li>
            <li>
              Zero-point energy: even at T=0, quantum oscillators retain E =
              hbar*omega/2 (uncertainty prevents rest).
            </li>
            <li>
              Nuclear linewidths: unstable states with lifetime tau have energy
              spread delta_E ~ hbar/tau. The 14.4 keV Mossbauer line in Fe-57
              has delta_E/E ~ 10^-12.
            </li>
            <li>
              Electron capture and tunneling: alpha decay rates, tunnel diode
              currents, and enzyme catalysis all exploit quantum tunneling
              enabled by wavefunction spreading.
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* ── Quantum Numbers ── */}
      <CollapsibleSection
        id="qm-quantum-numbers"
        title="Quantum Numbers and Orbital Filling"
        badge={<AudienceBadge level="intermediate" />}
        defaultOpen={false}
        data-ocid="atoms.qn_section"
      >
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Each electron in an atom is uniquely characterized by four quantum
          numbers. The Pauli Exclusion Principle (1925) forbids any two
          electrons from sharing all four. This forces electrons into
          progressively higher energy states, generating the periodic table's
          structure.
          <CitationMarker refId={15} />
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs" aria-label="Quantum number summary">
            <thead>
              <tr className="border-b border-border text-left">
                {["Symbol", "Name", "Values", "Physical meaning"].map((h) => (
                  <th
                    key={h}
                    className="pb-2 pr-4 font-semibold text-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              {[
                [
                  "n",
                  "Principal",
                  "1, 2, 3, ... (integer)",
                  "Shell energy level; larger n = higher energy and larger orbital",
                ],
                [
                  "l",
                  "Azimuthal",
                  "0 to n-1",
                  "Orbital shape (0=s, 1=p, 2=d, 3=f); gives angular momentum L = sqrt(l(l+1))*hbar",
                ],
                [
                  "m_l",
                  "Magnetic",
                  "-l to +l (2l+1 values)",
                  "Orbital orientation in space; component of L along z-axis: L_z = m_l * hbar",
                ],
                [
                  "m_s",
                  "Spin",
                  "+1/2 or -1/2",
                  "Intrinsic angular momentum (spin); S_z = m_s * hbar; no classical analog",
                ],
              ].map(([sym, name, val, meaning]) => (
                <tr key={sym}>
                  <td className="py-2 pr-4 font-mono font-bold text-primary">
                    {sym}
                  </td>
                  <td className="py-2 pr-4 font-medium text-foreground">
                    {name}
                  </td>
                  <td className="py-2 pr-4 font-mono">{val}</td>
                  <td className="py-2 text-xs">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <QuantumNumbers />
      </CollapsibleSection>

      {/* ── Pauli Exclusion ── */}
      <CollapsibleSection
        id="qm-pauli"
        title="Pauli Exclusion Principle and Atomic Structure"
        badge={<AudienceBadge level="intermediate" />}
        defaultOpen={false}
        data-ocid="atoms.pauli_section"
      >
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Wolfgang Pauli (1925) postulated that no two fermions can occupy the
          same quantum state (same set of four quantum numbers). This applies to
          electrons in atoms AND to nucleons in nuclei. It is the reason matter
          is solid, the periodic table has its structure, and neutron stars
          resist gravitational collapse.
          <CitationMarker refId={16} />
        </p>
        <EquationBlock
          latex="\\Psi(1,2) = -\\Psi(2,1) \\implies \\Psi(1,1) = 0"
          annotation="Fermionic antisymmetry: the multi-particle wavefunction of two identical fermions must be antisymmetric under exchange of coordinates (1 and 2). If both particles are in the same state (same quantum numbers), swapping them gives Psi(1,1) = -Psi(1,1), so Psi = 0 -- zero probability. Pauli exclusion is a consequence of antisymmetry."
          label="Antisymmetry Principle (Pauli Exclusion)"
        />
        <div className="rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground mt-4 space-y-2">
          <p className="font-semibold text-foreground">
            Consequences across scales
          </p>
          <ul className="ml-4 space-y-1 list-disc">
            <li>
              <strong className="text-foreground">Periodic table:</strong>{" "}
              Electrons fill shells in order n, l, m_l, m_s (Aufbau principle +
              Hund's rules), creating the block structure.
            </li>
            <li>
              <strong className="text-foreground">Chemical bonds:</strong> Two
              electrons in a sigma bond occupy the same spatial orbital only
              because they have opposite spins (+1/2 and -1/2).
            </li>
            <li>
              <strong className="text-foreground">Nuclear shell model:</strong>{" "}
              Identical Pauli principle applies to protons and neutrons
              separately, giving magic numbers 2, 8, 20, 28, 50, 82, 126.
            </li>
            <li>
              <strong className="text-foreground">White dwarfs:</strong>{" "}
              Electron degeneracy pressure (Pauli) supports stars against
              gravitational collapse up to ~1.4 solar masses (Chandrasekhar
              limit).
            </li>
            <li>
              <strong className="text-foreground">Neutron stars:</strong>{" "}
              Neutron degeneracy pressure (Pauli) supports objects up to ~2-3
              solar masses at nuclear density.
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* ── Spectrum / Spectral Series ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <CollapsibleSection
          id="qm-spectra"
          title="Atomic Spectra and Spectral Series"
          badge={<AudienceBadge level="intermediate" />}
          defaultOpen={true}
          data-ocid="atoms.spectra_section"
        >
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            When electrons transition between energy levels, they emit or absorb
            photons of energy E = h*nu = |E_n2 - E_n1|. For hydrogen,
            transitions to each final level n_1 form named series.
            <CitationMarker refId={17} />
          </p>
          <EquationBlock
            latex="\\frac{1}{\\lambda} = R_\\infty \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right) \\qquad R_\\infty = 1.097 \\times 10^7\\text{ m}^{-1}"
            annotation="Rydberg formula: the wavenumber 1/lambda of emitted/absorbed photons equals the Rydberg constant R_inf times the difference of inverse squares of quantum numbers n_1 (lower) and n_2 (upper). Derived from Bohr's model and confirmed to 12+ significant figures in hydrogen."
            label="Rydberg Formula (1888)"
          />
          <div className="overflow-x-auto mt-4">
            <table
              className="w-full text-xs"
              aria-label="Hydrogen spectral series"
            >
              <thead>
                <tr className="border-b border-border text-left">
                  {[
                    "Series",
                    "n_1",
                    "n_2 range",
                    "Wavelength range",
                    "Region",
                    "Discovery",
                  ].map((h) => (
                    <th
                      key={h}
                      className="pb-2 pr-3 font-semibold text-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                {[
                  [
                    "Lyman",
                    "1",
                    "2 to inf",
                    "91.2 - 121.6 nm",
                    "Ultraviolet",
                    "T. Lyman, 1906-1914",
                  ],
                  [
                    "Balmer",
                    "2",
                    "3 to inf",
                    "364.6 - 656.3 nm",
                    "Visible/UV",
                    "J. Balmer, 1885",
                  ],
                  [
                    "Paschen",
                    "3",
                    "4 to inf",
                    "820.4 nm - 1.875 um",
                    "Near-infrared",
                    "F. Paschen, 1908",
                  ],
                  [
                    "Brackett",
                    "4",
                    "5 to inf",
                    "1.458 - 4.051 um",
                    "Mid-infrared",
                    "F. Brackett, 1922",
                  ],
                  [
                    "Pfund",
                    "5",
                    "6 to inf",
                    "2.279 - 7.459 um",
                    "Mid-infrared",
                    "A. Pfund, 1924",
                  ],
                  [
                    "Humphreys",
                    "6",
                    "7 to inf",
                    "3.282 - 12.37 um",
                    "Far-infrared",
                    "C. Humphreys, 1953",
                  ],
                ].map(([series, n1, n2, wl, region, who]) => (
                  <tr key={series}>
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {series}
                    </td>
                    <td className="py-2 pr-3 font-mono">{n1}</td>
                    <td className="py-2 pr-3 font-mono">{n2}</td>
                    <td className="py-2 pr-3 font-mono">{wl}</td>
                    <td className="py-2 pr-3">{region}</td>
                    <td className="py-2">{who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Visual spectral bar */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-foreground mb-2">
              Hydrogen Balmer Series (visible -- wavelengths in nm)
            </p>
            <div className="relative h-10 rounded overflow-hidden bg-muted/30">
              {[
                { wl: 656.3, color: "#FF4444", label: "H-alpha" },
                { wl: 486.1, color: "#44AAFF", label: "H-beta" },
                { wl: 434.0, color: "#8844FF", label: "H-gamma" },
                { wl: 410.2, color: "#AA44FF", label: "H-delta" },
              ].map((line) => (
                <div
                  key={line.label}
                  className="absolute top-0 bottom-0 w-1 group"
                  style={{
                    left: `${((line.wl - 380) / (780 - 380)) * 100}%`,
                    background: line.color,
                  }}
                  title={`${line.label}: ${line.wl} nm`}
                >
                  <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border px-1 rounded">
                    {line.label} {line.wl} nm
                  </span>
                </div>
              ))}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #8800ff, #0000ff, #00aaff, #00ff00, #ffff00, #ff8800, #ff0000)",
                  opacity: 0.3,
                }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">
              380 nm (violet) to 780 nm (red)
            </p>
          </div>
        </CollapsibleSection>
        {/* ── Advanced Quantum Operators ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <CollapsibleSection
            id="advanced-quantum-operators"
            title="Advanced Quantum Operators & Relations"
            badge={<AudienceBadge level="professional" />}
            defaultOpen={false}
            data-ocid="atoms.advanced_operators_section"
          >
            <div className="space-y-2 mt-2">
              <EquationBlock
                label="Canonical Commutation Relation"
                latex="[\\hat{x},\\hat{p}] = \\hat{x}\\hat{p} - \\hat{p}\\hat{x} = i\\hbar"
                annotation="The position and momentum operators do not commute. This non-commutativity is the mathematical origin of the Heisenberg uncertainty principle: it is impossible to simultaneously assign sharp values to x and p."
              />
              <EquationBlock
                label="Ladder (Creation / Annihilation) Operators"
                latex="\\hat{a}^\\pm = \\frac{1}{\\sqrt{2m\\hbar\\omega}}\\left(m\\omega\\hat{x} \\mp i\\hat{p}\\right), \\quad \\hat{H} = \\hbar\\omega\\left(\\hat{a}^+\\hat{a}^- + \\tfrac{1}{2}\\right)"
                annotation="Ladder operators factor the quantum harmonic oscillator Hamiltonian. â⁺ raises the energy eigenstate by one quantum ℏω; â⁻ lowers it. The number operator N̂ = â⁺â⁻ counts quanta."
              />
              <EquationBlock
                label="Zero-Point Energy (Quantum Harmonic Oscillator)"
                latex="E_0 = \\tfrac{1}{2}\\hbar\\omega \\neq 0"
                annotation="Even in the ground state (n=0), the harmonic oscillator retains energy ℏω/2. This zero-point energy is a direct consequence of the uncertainty principle — a perfectly stationary oscillator would violate Δx·Δp ≥ ℏ/2."
              />
              <EquationBlock
                label="Time-Dependent Schrödinger Equation (Operator Form)"
                latex="i\\hbar \\frac{\\partial \\Psi}{\\partial t} = \\hat{H}\\Psi = \\left(-\\frac{\\hbar^2}{2m}\\nabla^2 + V\\right)\\Psi"
                annotation="The TDSE governs the full dynamical evolution of the quantum state. The Hamiltonian operator Ĥ is kinetic (−ℏ²∇²/2m) plus potential (V). For a free particle (V=0) this reduces to the quantum wave equation."
              />
            </div>
          </CollapsibleSection>
        </motion.div>
      </motion.div>
    </div>
  );
}
