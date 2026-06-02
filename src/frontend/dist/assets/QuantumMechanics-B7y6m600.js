import { j as jsxRuntimeExports, P as PageHeader, S as SectionCard, A as AudienceBadge, E as EquationBlock, m as motion, r as reactExports } from "./index-DTpTSWSe.js";
import { C as CitationMarker } from "./CitationMarker-INaQsZz7.js";
import { C as CollapsibleSection } from "./CollapsibleSection-DYK90tLB.js";
function DoubleSlit() {
  const canvasRef = reactExports.useRef(null);
  const [running, setRunning] = reactExports.useState(true);
  const runRef = reactExports.useRef(running);
  reactExports.useEffect(() => {
    runRef.current = running;
  }, [running]);
  reactExports.useEffect(() => {
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
    const buckets = new Float32Array(H);
    let maxVal = 1;
    let frameId = 0;
    const slitX = cx - W * 0.15;
    const slit1Y = H * 0.43;
    const slit2Y = H * 0.57;
    const slitW = H * 0.03;
    const L = W * 0.45;
    const k = 2 * Math.PI / (H * 0.08);
    let t = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      if (!runRef.current) return;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(80,90,120,0.9)";
      ctx.fillRect(slitX - 4, 0, 8, slit1Y - slitW);
      ctx.fillRect(slitX - 4, slit1Y + slitW, 8, slit2Y - slit1Y - 2 * slitW);
      ctx.fillRect(slitX - 4, slit2Y + slitW, 8, H - (slit2Y + slitW));
      ctx.strokeStyle = "rgba(100,110,180,0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + L, 0);
      ctx.lineTo(cx + L, H);
      ctx.stroke();
      for (let iy = 0; iy < H; iy += 12) {
        const wavex = t % 40 * (W / 40);
        for (let ix = 0; ix < slitX; ix += 4) {
          const x = (ix + wavex) % slitX;
          const alpha = Math.sin(x / slitX * Math.PI * 8 - t * 0.3) * 0.3 + 0.3;
          ctx.fillStyle = `rgba(80,140,255,${alpha.toFixed(2)})`;
          ctx.fillRect(x, iy, 2, 2);
        }
      }
      const numNew = 3;
      for (let i = 0; i < numNew; i++) {
        const slitY = Math.random() < 0.5 ? slit1Y : slit2Y;
        if (Math.abs(slitY - slit1Y) > slitW && Math.abs(slitY - slit2Y) > slitW)
          continue;
        const screenY = Math.floor(Math.random() * H);
        const r1 = Math.sqrt(L * L + (screenY - slit1Y) * (screenY - slit1Y));
        const r2 = Math.sqrt(L * L + (screenY - slit2Y) * (screenY - slit2Y));
        const intensity = Math.cos(k * (r1 - r2) / 2) ** 2;
        if (Math.random() < intensity) {
          buckets[screenY] += 1;
          if (buckets[screenY] > maxVal) maxVal = buckets[screenY];
        }
      }
      for (let iy = 0; iy < H; iy++) {
        const brightness = buckets[iy] / maxVal;
        if (brightness < 0.01) continue;
        const r = Math.round(brightness * 100 + 155);
        const b = Math.round(255 - brightness * 80);
        ctx.fillStyle = `rgba(${r},180,${b},${Math.min(1, brightness * 1.5).toFixed(2)})`;
        ctx.fillRect(cx + L, iy, 18, 1);
      }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "w-full rounded-lg",
        style: { height: 260 },
        "aria-label": "Double-slit interference pattern simulation"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setRunning((r) => !r),
          className: "px-4 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors",
          "data-ocid": "atoms.double_slit_toggle",
          children: running ? "Pause" : "Resume"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: 'Electrons accumulate -- interference pattern emerges without "knowing" which slit they passed through' })
    ] })
  ] });
}
function HeisenbergSlider() {
  const [sigmaX, setSigmaX] = reactExports.useState(50);
  const canvasRef = reactExports.useRef(null);
  const sigmaRef = reactExports.useRef(sigmaX);
  reactExports.useEffect(() => {
    sigmaRef.current = sigmaX;
  }, [sigmaX]);
  const hbar = 10546e-38;
  const sigmaXm = sigmaX * 1e-12;
  const minSigmaP = hbar / (2 * sigmaXm);
  const sigmaP_eVc = minSigmaP * 3e8 / 1602e-22 / 1e6;
  reactExports.useEffect(() => {
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
      const xSigmaPx = sx / 200 * (W / 3);
      const pSigmaPx = Math.max(8, W / 3 / (sx / 200 + 0.3));
      const waveOffset = Math.sin(t * 0.03) * xSigmaPx * 0.5;
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
      ctx.strokeStyle = "rgba(80,90,120,0.6)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, H);
      ctx.stroke();
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
      ctx.fillStyle = "rgba(200,200,200,0.7)";
      ctx.font = `${9 * dpr}px monospace`;
      ctx.fillText("Position space |ψ(x)|²", 8, H - 6);
      ctx.fillText("Momentum space |φ(p)|²", cx + 8, H - 6);
      const hupRatio = sx * sigmaP_eVc / (hbar * 3e8 / 1602e-22 / 1e6 / 2 / 1e-12);
      const barW = W * 0.3;
      const barX = cx - barW / 2;
      const barY = H - 28;
      ctx.fillStyle = "rgba(80,90,120,0.4)";
      ctx.fillRect(barX, barY, barW, 6);
      const fillW = Math.min(barW, barW * Math.min(hupRatio / 10, 1));
      ctx.fillStyle = hupRatio >= 1 ? "rgba(34,197,94,0.8)" : "rgba(239,68,68,0.8)";
      ctx.fillRect(barX, barY, fillW, 6);
      ctx.fillStyle = "rgba(200,200,200,0.6)";
      ctx.font = `${8 * dpr}px monospace`;
      ctx.fillText(`Δx·Δp ≥ ℏ/2  (${hupRatio.toFixed(2)}×)`, barX, barY - 4);
      t += 1;
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [sigmaP_eVc]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "w-full rounded-lg",
        style: { height: 180 },
        "aria-label": "Heisenberg uncertainty principle visualization"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: "Narrow x" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 5,
          max: 200,
          value: sigmaX,
          onChange: (e) => setSigmaX(Number(e.target.value)),
          className: "flex-1 accent-primary h-1",
          "aria-label": "Position uncertainty sigma_x in picometers",
          "data-ocid": "atoms.hup_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: "Wide x" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-center text-muted-foreground", children: [
      "Δx = ",
      sigmaX,
      " pm  |  min Δp = ",
      sigmaP_eVc.toFixed(4),
      " MeV/c  |  Δx · Δp ≥ ℏ/2"
    ] })
  ] });
}
function QuantumNumbers() {
  const [n, setN] = reactExports.useState(3);
  const [l, setL] = reactExports.useState(1);
  const [ml, setMl] = reactExports.useState(0);
  const [ms, setMs] = reactExports.useState("up");
  const maxL = n - 1;
  const safeL = Math.min(l, maxL);
  const safeMl = Math.max(-safeL, Math.min(safeL, ml));
  const orbital = ["s", "p", "d", "f", "g", "h"][safeL] ?? "?";
  const subshell = `${n}${orbital}`;
  const maxElec = 2 * (2 * safeL + 1);
  const energy = (-13.6 / (n * n)).toFixed(4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "n (principal)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 1,
            max: 7,
            value: n,
            onChange: (e) => setN(Number(e.target.value)),
            className: "w-full accent-primary h-1 mb-2",
            "aria-label": "Principal quantum number n",
            "data-ocid": "atoms.qn_n_slider"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-foreground text-center", children: n }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center mt-1", children: [
          "Shell: ",
          ["K", "L", "M", "N", "O", "P", "Q"][n - 1]
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-yellow-400 mb-1", children: "l (azimuthal)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: maxL,
            value: safeL,
            onChange: (e) => setL(Number(e.target.value)),
            className: "w-full accent-yellow-400 h-1 mb-2",
            "aria-label": "Azimuthal quantum number l",
            "data-ocid": "atoms.qn_l_slider"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-foreground text-center", children: safeL }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center mt-1", children: [
          "Orbital: ",
          orbital,
          "-type"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-400 mb-1", children: "m_l (magnetic)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: -safeL,
            max: safeL,
            value: safeMl,
            onChange: (e) => setMl(Number(e.target.value)),
            className: "w-full accent-emerald-400 h-1 mb-2",
            "aria-label": "Magnetic quantum number ml",
            "data-ocid": "atoms.qn_ml_slider"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-foreground text-center", children: safeMl }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center mt-1", children: [
          "Range: ",
          -safeL,
          " to ",
          safeL
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-rose-500/20 bg-rose-500/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-rose-400 mb-1", children: "m_s (spin)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center my-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMs("up"),
              className: `px-3 py-1 rounded text-sm font-bold transition-colors ${ms === "up" ? "bg-rose-500/30 text-rose-300 border border-rose-500/40" : "text-muted-foreground hover:bg-muted/30"}`,
              "data-ocid": "atoms.qn_spin_up",
              children: "+1/2 Up"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMs("down"),
              className: `px-3 py-1 rounded text-sm font-bold transition-colors ${ms === "down" ? "bg-rose-500/30 text-rose-300 border border-rose-500/40" : "text-muted-foreground hover:bg-muted/30"}`,
              "data-ocid": "atoms.qn_spin_down",
              children: "-1/2 Down"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center", children: [
          "Spin: ",
          ms
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Subshell" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-primary font-bold", children: subshell })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Orbital label" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-foreground", children: [
          subshell,
          " m_l=",
          safeMl,
          " m_s=",
          ms === "up" ? "+1/2" : "-1/2"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Subshell capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-foreground", children: [
          maxElec,
          " electrons"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "H Energy (n)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-foreground", children: [
          energy,
          " eV"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/10 border border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-3", children: "Orbital filling (Pauli exclusion -- each box: one m_l, two arrows = two m_s)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: Array.from({ length: 2 * safeL + 1 }, (_, i) => i - safeL).map(
        (m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-10 h-8 rounded border border-border bg-muted/20 flex items-center justify-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm ${Math.abs(m) <= Math.abs(safeMl) ? "text-primary" : "text-muted-foreground"}`,
                children: "\\u2191"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm ${ms === "down" && m === safeMl ? "text-rose-400" : "text-muted-foreground"}`,
                children: "\\u2193"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "m=",
            m
          ] })
        ] }, m)
      ) })
    ] })
  ] });
}
function OrbitalShapes() {
  const orbitals = [
    {
      label: "1s (n=1, l=0)",
      color: "rgba(99,179,237,0.85)",
      type: "sphere"
    },
    {
      label: "2p (n=2, l=1)",
      color: "rgba(251,191,36,0.85)",
      type: "dumbbell"
    },
    {
      label: "3d (n=3, l=2)",
      color: "rgba(167,139,250,0.85)",
      type: "clover"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: orbitals.map((orb) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitalCanvas, { type: orb.type, color: orb.color }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: orb.label })
  ] }, orb.label)) });
}
function OrbitalCanvas({
  type,
  color
}) {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
        H * 0.26
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
        H * 0.26
      );
      rg2.addColorStop(0, color.replace("0.85", "1"));
      rg2.addColorStop(1, color.replace("0.85", "0"));
      ctx.beginPath();
      ctx.arc(cx, cy + H * 0.26, H * 0.24, 0, Math.PI * 2);
      ctx.fillStyle = rg2;
      ctx.fill();
    } else {
      for (let lobe = 0; lobe < 4; lobe++) {
        const angle = lobe / 4 * Math.PI * 2;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      style: { width: 120, height: 120 },
      className: "mx-auto rounded",
      "aria-label": `${type} orbital shape`
    }
  );
}
function QuantumMechanics() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Quantum Mechanical Basis of Atomic Theory",
        subtitle: "Wave-particle duality, the Schrodinger equation, Born's probability interpretation, Heisenberg's uncertainty principle, and quantum numbers -- the mathematical foundations of modern chemistry and nuclear physics.",
        audienceLevel: "advanced",
        readTimeMin: 50
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-8", "data-ocid": "atoms.wave_particle_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Wave-Particle Duality" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "The double-slit experiment -- the most beautiful experiment in physics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 11 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: "In 1801, Thomas Young showed that light passing through two narrow slits creates an interference pattern on a screen -- evidence of wave behavior. When repeated with single electrons (Jonsson, 1961; Tonomura, 1989), the same pattern emerges dot by dot, even when electrons are sent one at a time. Each electron interferes with itself -- it passes through both slits simultaneously as a probability wave, collapsing to a definite position only upon measurement. This is wave-particle duality in its most profound form." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DoubleSlit, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "\\\\lambda = \\\\frac{h}{p} = \\\\frac{h}{mv} = \\\\frac{h}{\\\\sqrt{2mE_k}}",
          annotation: "de Broglie wavelength: any particle with momentum p has an associated wavelength lambda. For a 50 eV electron: lambda = h/sqrt(2 * 9.109e-31 * 50*1.602e-19) = 0.174 nm -- comparable to interatomic spacings, enabling electron diffraction.",
          label: "de Broglie Wavelength"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "qm-schrodinger",
        title: "The Schrodinger Equation",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
        defaultOpen: true,
        "data-ocid": "atoms.schrodinger_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
            "In 1926, Erwin Schrodinger published the wave equation that governs all non-relativistic quantum systems. Unlike Newton's F=ma (deterministic trajectories), Schrodinger's equation propagates a wavefunction psi -- encoding all probabilistic information about the system.",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 12 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "i\\\\hbar\\\\,\\\\frac{\\\\partial}{\\\\partial t}\\\\Psi(\\\\mathbf{r},t) = \\\\hat{H}\\\\Psi(\\\\mathbf{r},t) = \\\\left[-\\\\frac{\\\\hbar^2}{2m}\\\\nabla^2 + V(\\\\mathbf{r},t)\\\\right]\\\\Psi(\\\\mathbf{r},t)",
              annotation: "Time-dependent Schrodinger equation: i*hbar * d(Psi)/dt = H_hat * Psi. The left side is time evolution; the right side is the Hamiltonian (kinetic + potential energy operator) acting on the wavefunction. This is the quantum analog of Hamilton's classical equations of motion.",
              label: "Time-Dependent Schrodinger Equation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "\\\\hat{H}\\\\psi_n(\\\\mathbf{r}) = E_n\\\\,\\\\psi_n(\\\\mathbf{r}) \\\\qquad \\\\Psi(\\\\mathbf{r},t) = \\\\psi_n(\\\\mathbf{r})\\\\,e^{-iE_n t/\\\\hbar}",
              annotation: "Time-independent (stationary state) Schrodinger equation. For conservative potentials V(r), separating variables gives energy eigenstates psi_n with definite energies E_n. The full time-dependent wavefunction oscillates at frequency E_n/hbar.",
              label: "Time-Independent Schrodinger Equation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For hydrogen (V = -e^2/(4*pi*eps_0*r)), the exact solutions are:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EquationBlock,
              {
                latex: "\\\\psi_{n\\\\ell m}(r,\\\\theta,\\\\phi) = R_{n\\\\ell}(r)\\\\,Y_\\\\ell^m(\\\\theta,\\\\phi) \\\\qquad E_n = -\\\\frac{13.6\\\\text{ eV}}{n^2}",
                annotation: "Hydrogen wavefunctions: radial part R_nl(r) times spherical harmonic Y_l^m(theta, phi). The radial functions involve associated Laguerre polynomials; the angular functions are standard spherical harmonics. Energy depends only on principal quantum number n.",
                label: "Hydrogen Atom Wavefunctions"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "qm-born",
        title: "Born's Probability Interpretation of |psi|^2",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
        defaultOpen: false,
        "data-ocid": "atoms.born_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
            'Max Born (1926) provided the physical interpretation of the wavefunction: |psi(r,t)|^2 dV is the probability of finding the particle in the volume element dV at position r and time t. This "Copenhagen interpretation" remains the standard view. The wavefunction itself is not directly observable -- only |psi|^2 (probability density) has physical meaning.',
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 13 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "P(\\\\mathbf{r},t)\\\\,dV = |\\\\Psi(\\\\mathbf{r},t)|^2\\\\,dV \\\\qquad \\\\int_{\\\\text{all space}}|\\\\Psi|^2\\\\,dV = 1",
              annotation: "Born rule: the probability of finding the particle in volume dV equals |Psi|^2 * dV. The normalization condition (integral = 1) ensures total probability is 100%. Born received the Nobel Prize in Physics in 1954 for this contribution.",
              label: "Born Rule and Normalization"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "\\\\langle A \\\\rangle = \\\\int \\\\Psi^* \\\\hat{A}\\\\, \\\\Psi\\\\,dV",
              annotation: "Expectation value: the average measured value of observable A (e.g., position, momentum, energy) is the integral of Psi-star times the operator A-hat times Psi over all space. Individual measurements are random; the expectation value is their statistical mean.",
              label: "Quantum Mechanical Expectation Value"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Atomic Orbital Shapes -- |psi|^2 Probability Density" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitalShapes, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "qm-heisenberg",
        title: "Heisenberg Uncertainty Principle",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
        defaultOpen: false,
        "data-ocid": "atoms.heisenberg_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
            "Werner Heisenberg (1927) derived a fundamental limit on the simultaneous precision of conjugate variables. This is not a technological limitation -- it is a mathematical consequence of wave mechanics. A particle described by a narrow wavepacket (precise position) must be a superposition of many momentum eigenstates (large momentum uncertainty).",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 14 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "\\\\sigma_x\\\\,\\\\sigma_p \\\\geq \\\\frac{\\\\hbar}{2} \\\\qquad \\\\sigma_E\\\\,\\\\sigma_t \\\\geq \\\\frac{\\\\hbar}{2}",
              annotation: "Heisenberg uncertainty relations: the product of standard deviations of position and momentum, or energy and time, must be at least hbar/2 = 5.27e-35 J*s. These constrain ALL quantum states, not just measurement devices.",
              label: "Heisenberg Uncertainty Principle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeisenbergSlider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Physical consequences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Electrons cannot spiral into the nucleus: confining an electron to r less than 1 fm would require delta_p greater than hbar/(2*r) ~ 100 MeV/c, far exceeding the binding energy -- atoms are stable." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Zero-point energy: even at T=0, quantum oscillators retain E = hbar*omega/2 (uncertainty prevents rest)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Nuclear linewidths: unstable states with lifetime tau have energy spread delta_E ~ hbar/tau. The 14.4 keV Mossbauer line in Fe-57 has delta_E/E ~ 10^-12." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Electron capture and tunneling: alpha decay rates, tunnel diode currents, and enzyme catalysis all exploit quantum tunneling enabled by wavefunction spreading." })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "qm-quantum-numbers",
        title: "Quantum Numbers and Orbital Filling",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
        defaultOpen: false,
        "data-ocid": "atoms.qn_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5", children: [
            "Each electron in an atom is uniquely characterized by four quantum numbers. The Pauli Exclusion Principle (1925) forbids any two electrons from sharing all four. This forces electrons into progressively higher energy states, generating the periodic table's structure.",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 15 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", "aria-label": "Quantum number summary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-left", children: ["Symbol", "Name", "Values", "Physical meaning"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "pb-2 pr-4 font-semibold text-foreground",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50 text-muted-foreground", children: [
              [
                "n",
                "Principal",
                "1, 2, 3, ... (integer)",
                "Shell energy level; larger n = higher energy and larger orbital"
              ],
              [
                "l",
                "Azimuthal",
                "0 to n-1",
                "Orbital shape (0=s, 1=p, 2=d, 3=f); gives angular momentum L = sqrt(l(l+1))*hbar"
              ],
              [
                "m_l",
                "Magnetic",
                "-l to +l (2l+1 values)",
                "Orbital orientation in space; component of L along z-axis: L_z = m_l * hbar"
              ],
              [
                "m_s",
                "Spin",
                "+1/2 or -1/2",
                "Intrinsic angular momentum (spin); S_z = m_s * hbar; no classical analog"
              ]
            ].map(([sym, name, val, meaning]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono font-bold text-primary", children: sym }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-medium text-foreground", children: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono", children: val }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: meaning })
            ] }, sym)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumNumbers, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "qm-pauli",
        title: "Pauli Exclusion Principle and Atomic Structure",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
        defaultOpen: false,
        "data-ocid": "atoms.pauli_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
            "Wolfgang Pauli (1925) postulated that no two fermions can occupy the same quantum state (same set of four quantum numbers). This applies to electrons in atoms AND to nucleons in nuclei. It is the reason matter is solid, the periodic table has its structure, and neutron stars resist gravitational collapse.",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 16 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "\\\\Psi(1,2) = -\\\\Psi(2,1) \\\\implies \\\\Psi(1,1) = 0",
              annotation: "Fermionic antisymmetry: the multi-particle wavefunction of two identical fermions must be antisymmetric under exchange of coordinates (1 and 2). If both particles are in the same state (same quantum numbers), swapping them gives Psi(1,1) = -Psi(1,1), so Psi = 0 -- zero probability. Pauli exclusion is a consequence of antisymmetry.",
              label: "Antisymmetry Principle (Pauli Exclusion)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4 text-sm text-muted-foreground mt-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Consequences across scales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-4 space-y-1 list-disc", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Periodic table:" }),
                " ",
                "Electrons fill shells in order n, l, m_l, m_s (Aufbau principle + Hund's rules), creating the block structure."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Chemical bonds:" }),
                " Two electrons in a sigma bond occupy the same spatial orbital only because they have opposite spins (+1/2 and -1/2)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Nuclear shell model:" }),
                " ",
                "Identical Pauli principle applies to protons and neutrons separately, giving magic numbers 2, 8, 20, 28, 50, 82, 126."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "White dwarfs:" }),
                " ",
                "Electron degeneracy pressure (Pauli) supports stars against gravitational collapse up to ~1.4 solar masses (Chandrasekhar limit)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Neutron stars:" }),
                " ",
                "Neutron degeneracy pressure (Pauli) supports objects up to ~2-3 solar masses at nuclear density."
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mt-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CollapsibleSection,
            {
              id: "qm-spectra",
              title: "Atomic Spectra and Spectral Series",
              badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
              defaultOpen: true,
              "data-ocid": "atoms.spectra_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: [
                  "When electrons transition between energy levels, they emit or absorb photons of energy E = h*nu = |E_n2 - E_n1|. For hydrogen, transitions to each final level n_1 form named series.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 17 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: "\\\\frac{1}{\\\\lambda} = R_\\\\infty \\\\left(\\\\frac{1}{n_1^2} - \\\\frac{1}{n_2^2}\\\\right) \\\\qquad R_\\\\infty = 1.097 \\\\times 10^7\\\\text{ m}^{-1}",
                    annotation: "Rydberg formula: the wavenumber 1/lambda of emitted/absorbed photons equals the Rydberg constant R_inf times the difference of inverse squares of quantum numbers n_1 (lower) and n_2 (upper). Derived from Bohr's model and confirmed to 12+ significant figures in hydrogen.",
                    label: "Rydberg Formula (1888)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-xs",
                    "aria-label": "Hydrogen spectral series",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-left", children: [
                        "Series",
                        "n_1",
                        "n_2 range",
                        "Wavelength range",
                        "Region",
                        "Discovery"
                      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "pb-2 pr-3 font-semibold text-foreground whitespace-nowrap",
                          children: h
                        },
                        h
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50 text-muted-foreground", children: [
                        [
                          "Lyman",
                          "1",
                          "2 to inf",
                          "91.2 - 121.6 nm",
                          "Ultraviolet",
                          "T. Lyman, 1906-1914"
                        ],
                        [
                          "Balmer",
                          "2",
                          "3 to inf",
                          "364.6 - 656.3 nm",
                          "Visible/UV",
                          "J. Balmer, 1885"
                        ],
                        [
                          "Paschen",
                          "3",
                          "4 to inf",
                          "820.4 nm - 1.875 um",
                          "Near-infrared",
                          "F. Paschen, 1908"
                        ],
                        [
                          "Brackett",
                          "4",
                          "5 to inf",
                          "1.458 - 4.051 um",
                          "Mid-infrared",
                          "F. Brackett, 1922"
                        ],
                        [
                          "Pfund",
                          "5",
                          "6 to inf",
                          "2.279 - 7.459 um",
                          "Mid-infrared",
                          "A. Pfund, 1924"
                        ],
                        [
                          "Humphreys",
                          "6",
                          "7 to inf",
                          "3.282 - 12.37 um",
                          "Far-infrared",
                          "C. Humphreys, 1953"
                        ]
                      ].map(([series, n1, n2, wl, region, who]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground", children: series }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono", children: n1 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono", children: n2 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono", children: wl }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3", children: region }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: who })
                      ] }, series)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: "Hydrogen Balmer Series (visible -- wavelengths in nm)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-10 rounded overflow-hidden bg-muted/30", children: [
                    [
                      { wl: 656.3, color: "#FF4444", label: "H-alpha" },
                      { wl: 486.1, color: "#44AAFF", label: "H-beta" },
                      { wl: 434, color: "#8844FF", label: "H-gamma" },
                      { wl: 410.2, color: "#AA44FF", label: "H-delta" }
                    ].map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute top-0 bottom-0 w-1 group",
                        style: {
                          left: `${(line.wl - 380) / (780 - 380) * 100}%`,
                          background: line.color
                        },
                        title: `${line.label}: ${line.wl} nm`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border px-1 rounded", children: [
                          line.label,
                          " ",
                          line.wl,
                          " nm"
                        ] })
                      },
                      line.label
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                          background: "linear-gradient(to right, #8800ff, #0000ff, #00aaff, #00ff00, #ffff00, #ff8800, #ff0000)",
                          opacity: 0.3
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1 text-right", children: "380 nm (violet) to 780 nm (red)" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "mt-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CollapsibleSection,
                {
                  id: "advanced-quantum-operators",
                  title: "Advanced Quantum Operators & Relations",
                  badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "professional" }),
                  defaultOpen: false,
                  "data-ocid": "atoms.advanced_operators_section",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "Canonical Commutation Relation",
                        latex: "[\\\\hat{x},\\\\hat{p}] = \\\\hat{x}\\\\hat{p} - \\\\hat{p}\\\\hat{x} = i\\\\hbar",
                        annotation: "The position and momentum operators do not commute. This non-commutativity is the mathematical origin of the Heisenberg uncertainty principle: it is impossible to simultaneously assign sharp values to x and p."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "Ladder (Creation / Annihilation) Operators",
                        latex: "\\\\hat{a}^\\\\pm = \\\\frac{1}{\\\\sqrt{2m\\\\hbar\\\\omega}}\\\\left(m\\\\omega\\\\hat{x} \\\\mp i\\\\hat{p}\\\\right), \\\\quad \\\\hat{H} = \\\\hbar\\\\omega\\\\left(\\\\hat{a}^+\\\\hat{a}^- + \\\\tfrac{1}{2}\\\\right)",
                        annotation: "Ladder operators factor the quantum harmonic oscillator Hamiltonian. â⁺ raises the energy eigenstate by one quantum ℏω; â⁻ lowers it. The number operator N̂ = â⁺â⁻ counts quanta."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "Zero-Point Energy (Quantum Harmonic Oscillator)",
                        latex: "E_0 = \\\\tfrac{1}{2}\\\\hbar\\\\omega \\\\neq 0",
                        annotation: "Even in the ground state (n=0), the harmonic oscillator retains energy ℏω/2. This zero-point energy is a direct consequence of the uncertainty principle — a perfectly stationary oscillator would violate Δx·Δp ≥ ℏ/2."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "Time-Dependent Schrödinger Equation (Operator Form)",
                        latex: "i\\\\hbar \\\\frac{\\\\partial \\\\Psi}{\\\\partial t} = \\\\hat{H}\\\\Psi = \\\\left(-\\\\frac{\\\\hbar^2}{2m}\\\\nabla^2 + V\\\\right)\\\\Psi",
                        annotation: "The TDSE governs the full dynamical evolution of the quantum state. The Hamiltonian operator Ĥ is kinetic (−ℏ²∇²/2m) plus potential (V). For a free particle (V=0) this reduces to the quantum wave equation."
                      }
                    )
                  ] })
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
export {
  QuantumMechanics as default
};
