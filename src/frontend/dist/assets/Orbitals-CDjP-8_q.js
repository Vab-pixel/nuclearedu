import { r as reactExports, j as jsxRuntimeExports, m as motion, P as PageHeader, S as SectionCard, A as AudienceBadge, E as EquationBlock, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as ReferenceLine, b as Line } from "./index-DWzjlv-D.js";
import { C as CitationMarker } from "./CitationMarker-BPCOmJ02.js";
import { C as CollapsibleSection } from "./CollapsibleSection-QQsEekCS.js";
const ORBITALS = {
  "1s": {
    label: "1s",
    n: 1,
    l: 0,
    m: 0,
    shape: "Spherical",
    description: "The lowest-energy orbital — a perfect sphere centred on the nucleus. Contains the electron 90% of the time inside a single lobe.",
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,0.4)"
  },
  "2s": {
    label: "2s",
    n: 2,
    l: 0,
    m: 0,
    shape: "Spherical (with node)",
    description: "Like 1s but larger, with one radial node — a spherical shell of zero probability between two density regions.",
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.4)"
  },
  "2p": {
    label: "2p",
    n: 2,
    l: 1,
    m: 0,
    shape: "Dumbbell",
    description: "Two lobes of high density along one axis. There are three degenerate 2p orbitals (m = −1, 0, +1) aligned along x, y, z.",
    color: "#f97316",
    glowColor: "rgba(249,115,22,0.4)"
  },
  "3s": {
    label: "3s",
    n: 3,
    l: 0,
    m: 0,
    shape: "Spherical (2 nodes)",
    description: "Third shell s-orbital with two radial nodes. The electron density is diffuse and extends further from the nucleus.",
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,0.4)"
  },
  "3p": {
    label: "3p",
    n: 3,
    l: 1,
    m: 0,
    shape: "Dumbbell (larger)",
    description: "Like 2p but with one radial node per lobe, making the orbital significantly larger and more diffuse.",
    color: "#fb923c",
    glowColor: "rgba(251,146,60,0.4)"
  },
  "3d": {
    label: "3d",
    n: 3,
    l: 2,
    m: 0,
    shape: "Four-lobed (clover)",
    description: "Four petal-like lobes in two planes (for d_z² a donut around a central lobe). Five degenerate 3d orbitals (m = −2 to +2). Critical for transition metal chemistry.",
    color: "#fbbf24",
    glowColor: "rgba(251,191,36,0.4)"
  },
  "4s": {
    label: "4s",
    n: 4,
    l: 0,
    m: 0,
    shape: "Spherical (3 nodes)",
    description: "Fourth shell s-orbital. Fills before 3d due to penetration effects (Aufbau). Three radial nodes, very diffuse.",
    color: "#38bdf8",
    glowColor: "rgba(56,189,248,0.4)"
  },
  "4f": {
    label: "4f",
    n: 4,
    l: 3,
    m: 0,
    shape: "Complex multi-lobed",
    description: "Seven degenerate 4f orbitals with complex angular dependence. Key for lanthanide and actinide electron configurations.",
    color: "#e879f9",
    glowColor: "rgba(232,121,249,0.4)"
  }
};
function OrbitalCanvas({
  orbital,
  slice
}) {
  const canvasRef = reactExports.useRef(null);
  const animRef = reactExports.useRef(0);
  const computeDensity = reactExports.useCallback(
    (x, y, z, key) => {
      const r = Math.sqrt(x * x + y * y + z * z);
      if (r < 1e-6) return 0;
      const cosTheta = z / r;
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
          const R = Math.exp(-rho / 3) * (1 - 2 * rho / 3 + 2 * rho * rho / 27);
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
          const R = Math.exp(-rho) * (1 - 3 * rho + 1.5 * rho * rho - rho * rho * rho / 6);
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
    []
  );
  reactExports.useEffect(() => {
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
    const particles = [];
    const N = slice === "3d" ? 1800 : 2500;
    const scale = 28;
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
          opacity: Math.min(1, d * 40 + 0.2)
        });
      }
    }
    let t = 0;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0c14";
      ctx.fillRect(0, 0, W, H);
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 6);
      grad.addColorStop(0, "rgba(255,200,100,1)");
      grad.addColorStop(1, "rgba(255,100,50,0)");
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.02 + i * 0.1);
        const alpha = Math.min(1, p.opacity * pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, slice === "3d" ? 1.5 : 2, 0, Math.PI * 2);
        const hex = info.color;
        const r2 = Number.parseInt(hex.slice(1, 3), 16);
        const g2 = Number.parseInt(hex.slice(3, 5), 16);
        const b2 = Number.parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r2},${g2},${b2},${alpha})`;
        ctx.fill();
      }
      const ringR = 18 + 4 * Math.sin(t * 0.025);
      const ringGrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        ringR - 4,
        W / 2,
        H / 2,
        ringR + 10
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "w-full rounded-lg",
      style: { height: 320, background: "#0a0c14" },
      "aria-label": `${orbital} orbital probability density - ${slice} view`
    }
  );
}
function RadialDistributionChart({ orbital }) {
  const info = ORBITALS[orbital];
  const data = Array.from({ length: 120 }, (_, i) => {
    const r = (i + 0.5) * 0.5;
    let R2r2 = 0;
    const a = 1;
    switch (orbital) {
      case "1s":
        R2r2 = 4 * r * r * Math.exp(-2 * r / a);
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
        const rho = 2 * r / (3 * a);
        R2r2 = r * r * (1 - rho + rho * rho / 9) ** 2 * Math.exp(-r / (3 * a));
        break;
      }
      case "3p": {
        const rho = 2 * r / (3 * a);
        R2r2 = r * r * rho * rho * (1 - rho / 6) ** 2 * Math.exp(-r / (3 * a));
        break;
      }
      case "3d": {
        const rho = 2 * r / (3 * a);
        R2r2 = r * r * rho * rho * rho * rho * Math.exp(-r / (3 * a));
        break;
      }
      case "4s": {
        const rho = r / (4 * a);
        R2r2 = r * r * (1 - 3 * rho / 2 + rho * rho / 4 - rho * rho * rho / 96) ** 2 * Math.exp(-r / (4 * a));
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data, margin: { top: 5, right: 10, left: 0, bottom: 5 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.05)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "r",
        stroke: "#666",
        tick: { fontSize: 11 },
        label: {
          value: "r (a₀)",
          position: "insideBottomRight",
          offset: -5,
          fill: "#888",
          fontSize: 12
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#666", tick: { fontSize: 11 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          background: "#0a0c14",
          border: "1px solid #333",
          borderRadius: 8,
          fontSize: 12
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferenceLine,
      {
        x: info.n * info.n * 0.529 * 2,
        stroke: info.color,
        strokeDasharray: "4 2",
        opacity: 0.6
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        type: "monotone",
        dataKey: "P",
        stroke: info.color,
        strokeWidth: 2,
        dot: false,
        isAnimationActive: false,
        name: "P(r)"
      }
    )
  ] }) });
}
const ENERGY_LEVELS = [
  { key: "1s", energy: -13.6, capacity: 2, block: "s" },
  { key: "2s", energy: -3.4, capacity: 2, block: "s" },
  { key: "2p", energy: -3.4, capacity: 6, block: "p" },
  { key: "3s", energy: -1.51, capacity: 2, block: "s" },
  { key: "3p", energy: -1.51, capacity: 6, block: "p" },
  { key: "4s", energy: -0.85, capacity: 2, block: "s" },
  { key: "3d", energy: -0.85, capacity: 10, block: "d" },
  { key: "4f", energy: -0.54, capacity: 14, block: "f" }
];
function EnergyDiagram({
  selected,
  onSelect
}) {
  const eMin = -14;
  const eMax = 0.2;
  const H = 320;
  const yPos = (e) => 16 + (e - eMax) / (eMin - eMax) * (H - 32);
  const blockColors = {
    s: "#60a5fa",
    p: "#f97316",
    d: "#fbbf24",
    f: "#e879f9"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", style: { height: H }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "100%", height: H, "aria-label": "Hydrogen energy level diagram", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Orbital visualization" }),
    ENERGY_LEVELS.map((lvl) => {
      const y = yPos(lvl.energy);
      const isSelected = lvl.key === selected;
      const color = blockColors[lvl.block];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "g",
        {
          className: "cursor-pointer",
          onClick: () => onSelect(lvl.key),
          onKeyDown: (e) => e.key === "Enter" && onSelect(lvl.key),
          tabIndex: 0,
          "aria-label": `Select ${lvl.key} orbital`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: "60",
                y1: y,
                x2: "240",
                y2: y,
                stroke: isSelected ? color : "rgba(255,255,255,0.25)",
                strokeWidth: isSelected ? 3 : 1.5
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "48", y: y + 4, fill: "#aaa", fontSize: "12", textAnchor: "end", children: [
              lvl.energy,
              " eV"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: "248",
                y: y + 4,
                fill: color,
                fontSize: "12",
                fontWeight: isSelected ? "bold" : "normal",
                children: lvl.key
              }
            ),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x: "57",
                y: y - 10,
                width: 186,
                height: 20,
                fill: color,
                fillOpacity: 0.12,
                rx: 3
              }
            )
          ]
        },
        lvl.key
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: "58",
        y1: 16,
        x2: "58",
        y2: H - 16,
        stroke: "rgba(255,255,255,0.15)",
        strokeWidth: 1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "58", y: 12, fill: "#666", fontSize: "11", textAnchor: "middle", children: "Energy" })
  ] }) });
}
function Orbitals() {
  const [selectedOrbital, setSelectedOrbital] = reactExports.useState("1s");
  const [sliceView, setSliceView] = reactExports.useState("3d");
  const [showPhase, setShowPhase] = reactExports.useState(false);
  const info = ORBITALS[selectedOrbital];
  const sliceViews = [
    { key: "3d", label: "3D Cloud" },
    { key: "xy", label: "XY Plane" },
    { key: "xz", label: "XZ Plane" },
    { key: "yz", label: "YZ Plane" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PageHeader,
          {
            title: "The Quantum Mechanical Model: Electron Orbitals",
            subtitle: "Explore the probability density clouds that define where electrons exist — from spherical s-orbitals to complex f-orbitals — with real-time interactive 3D visualizations.",
            audienceLevel: "advanced",
            readTimeMin: 18
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { glowAccent: true, "data-ocid": "orbitals.main_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Select Orbital" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 lg:grid-cols-2 gap-2", children: Object.keys(ORBITALS).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `orbitals.orbital_btn.${key}`,
                onClick: () => setSelectedOrbital(key),
                style: {
                  borderColor: selectedOrbital === key ? ORBITALS[key].color : void 0,
                  boxShadow: selectedOrbital === key ? `0 0 12px ${ORBITALS[key].glowColor}` : void 0
                },
                className: `rounded-lg border px-3 py-2 text-sm font-mono font-semibold transition-all duration-200 ${selectedOrbital === key ? "bg-muted text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50"}`,
                children: key
              },
              key
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Quantum Numbers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "n (principal)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-foreground",
                    style: { color: info.color },
                    children: info.n
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "l (azimuthal)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: info.l }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "m (magnetic)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: info.m }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shape" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: info.shape })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "orbitals.phase_toggle",
                onClick: () => setShowPhase((p) => !p),
                className: `w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors border ${showPhase ? "bg-primary/20 border-primary/50 text-primary" : "bg-muted border-border text-muted-foreground hover:text-foreground"}`,
                children: showPhase ? "Phase: Real/Imaginary ON" : "Show Phase Coloring"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: info.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: sliceViews.map((sv) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `orbitals.slice_view.${sv.key}`,
                onClick: () => setSliceView(sv.key),
                className: `rounded-md px-3 py-1 text-xs font-medium transition-colors border ${sliceView === sv.key ? "bg-primary/20 border-primary/50 text-primary" : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"}`,
                children: sv.label
              },
              sv.key
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrbitalCanvas,
              {
                orbital: selectedOrbital,
                slice: sliceView
              },
              `${selectedOrbital}-${sliceView}`
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "orbitals.radial_chart", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "Radial Probability Distribution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
              "P(r) = r² |R",
              /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "nl" }),
              "(r)|² — probability of finding the electron in a shell at radius r."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadialDistributionChart, { orbital: selectedOrbital }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "The dashed vertical line marks the most probable radius. Units: Bohr radii (a₀ ≈ 0.529 Å)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "orbitals.energy_diagram", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "Energy Level Diagram" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Click any level to jump to that orbital. Energies in eV for hydrogen." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnergyDiagram,
              {
                selected: selectedOrbital,
                onSelect: setSelectedOrbital
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CollapsibleSection,
          {
            id: "orbitals-equations",
            title: "Hydrogen Wavefunctions & Probability Density",
            defaultOpen: true,
            "data-ocid": "orbitals.equations_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Hydrogen Wavefunction",
                  latex: "\\\\psi_{nlm}(r,\\\\theta,\\\\phi) = R_{nl}(r) \\\\cdot Y_l^m(\\\\theta,\\\\phi)",
                  annotation: "The full hydrogen wavefunction is the product of a radial function R_nl and a spherical harmonic Y_lm. n, l, m are the principal, azimuthal, and magnetic quantum numbers."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Radial Wavefunction (1s)",
                  latex: "R_{10}(r) = 2\\\\left(\\\\frac{1}{a_0}\\\\right)^{3/2} e^{-r/a_0}",
                  annotation: "The 1s radial function is a simple decreasing exponential. a₀ = 0.529 Å is the Bohr radius. Maximum at r = 0, decaying smoothly outward."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Probability Density",
                  latex: "P(r) = r^2 |R_{nl}(r)|^2",
                  annotation: "The radial probability density includes an r² factor from the spherical volume element 4πr² dr. This shifts the most probable radius away from zero."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Spherical Harmonics (l=0)",
                  latex: "Y_0^0(\\\\theta,\\\\phi) = \\\\frac{1}{2\\\\sqrt{\\\\pi}}",
                  annotation: "s-orbitals (l=0) have spherically symmetric angular wavefunctions — constant in all directions. This is why 1s, 2s, 3s are perfect spheres."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Spherical Harmonics (l=1)",
                  latex: "Y_1^0(\\\\theta,\\\\phi) = \\\\sqrt{\\\\frac{3}{4\\\\pi}} \\\\cos\\\\theta",
                  annotation: "p-orbitals (l=1, m=0) have a cos θ angular dependence, creating two lobes along the z-axis — the characteristic dumbbell shape of 2p_z."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Energy Eigenvalues",
                  latex: "E_n = -\\\\frac{13.6\\\\,\\\\text{eV}}{n^2}",
                  annotation: "Hydrogen orbital energies depend only on n (in the non-relativistic, no-spin approximation). All orbitals with the same n are degenerate in hydrogen."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Radial Wavefunction R₂₀ (2s)",
                  latex: "R_{20}(r) = \\\\frac{1}{2\\\\sqrt{2}}\\\\left(\\\\frac{1}{a_0}\\\\right)^{3/2}\\\\left(2 - \\\\frac{r}{a_0}\\\\right)e^{-r/2a_0}",
                  annotation: "The 2s radial function has one radial node at r = 2a₀ (where the bracket vanishes). It decays more slowly than 1s (exp(−r/2a₀)), so the 2s orbital extends further from the nucleus."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Radial Wavefunction R₂₁ (2p)",
                  latex: "R_{21}(r) = \\\\frac{1}{2\\\\sqrt{6}}\\\\left(\\\\frac{1}{a_0}\\\\right)^{3/2}\\\\frac{r}{a_0}e^{-r/2a_0}",
                  annotation: "The 2p radial function has no radial nodes and vanishes at r = 0 (due to the r/a₀ factor — centrifugal barrier for l=1). Combined with Y₁ᵐ spherical harmonics, it gives the dumbbell p-orbital shapes."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  label: "Expectation Value ⟨r⟩ for 1s",
                  latex: "\\\\langle r \\\\rangle_{1s} = \\\\int_0^\\\\infty r \\\\cdot r^2 |R_{10}|^2 \\\\, dr = \\\\frac{3}{2}a_0 = 0.794\\\\,\\\\text{\\u00c5}",
                  annotation: "The average distance from the nucleus in the ground state is ⟨r⟩ = 3a₀/2, which is larger than the Bohr radius a₀ (the most probable radius). This difference is due to the asymmetric r² P(r) distribution."
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CollapsibleSection,
          {
            id: "orbitals-shapes",
            title: "Orbital Shapes: s, p, d, f",
            defaultOpen: true,
            "data-ocid": "orbitals.shapes_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              {
                block: "s",
                color: "#60a5fa",
                title: "s Orbitals (l = 0)",
                body: "Perfect spheres. Only one orbital per shell (m = 0). No angular nodes. Maximum electron density at the nucleus (for 1s). Radial nodes = n − 1."
              },
              {
                block: "p",
                color: "#f97316",
                title: "p Orbitals (l = 1)",
                body: "Two-lobed dumbbell shapes. Three degenerate orbitals per shell (m = −1, 0, +1), oriented along x, y, z. One angular node (a nodal plane through the nucleus). n ≥ 2."
              },
              {
                block: "d",
                color: "#fbbf24",
                title: "d Orbitals (l = 2)",
                body: "Five degenerate orbitals (m = −2, −1, 0, +1, +2). Four have four-leaf clover shapes; d_z² has two lobes and a torus. Two angular nodes. Critical for transition metal bonding, color, and magnetism. n ≥ 3."
              },
              {
                block: "f",
                color: "#e879f9",
                title: "f Orbitals (l = 3)",
                body: "Seven degenerate orbitals with complex, multi-lobed shapes. Three angular nodes. Responsible for the chemistry of lanthanides and actinides. High angular momentum shields less effectively from the nucleus. n ≥ 4."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-muted/20 p-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-display text-base font-semibold mb-2",
                      style: { color: item.color },
                      children: item.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.body })
                ]
              },
              item.block
            )) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "orbitals-student",
            title: "Conceptual Understanding (Student Level)",
            "data-ocid": "orbitals.student_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "In quantum mechanics, we cannot know both the exact position and momentum of an electron simultaneously (Heisenberg's uncertainty principle). Instead, we describe where an electron is",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "most likely" }),
                  " to be found using probability density functions called orbitals."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "An orbital is not a fixed orbit like a planet around the sun — it is a 3D region of space where there is a 90% probability of finding the electron. The probability cloud is denser where the electron spends more time." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The four quantum numbers (n, l, m, s) completely describe each electron state. No two electrons in the same atom can share all four quantum numbers (Pauli exclusion principle)." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The shape of an orbital depends on the angular momentum quantum number l: l=0 gives spheres (s), l=1 gives dumbbells (p), l=2 gives clovers (d), l=3 gives complex shapes (f)." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "orbitals-researcher",
            title: "Advanced Treatment (Researcher Level)",
            "data-ocid": "orbitals.researcher_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "professional" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The hydrogen wavefunctions are exact analytical solutions to the Schrödinger equation with the Coulomb potential V(r) = −e²/(4πε₀r). Separation of variables yields radial and angular components independently." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The radial part R_nl involves associated Laguerre polynomials L_n^l and exponentials. The angular part Y_l^m are the spherical harmonics, common to all central-force problems." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For multi-electron atoms, exact solutions don't exist. Hartree-Fock theory introduces a self-consistent field (SCF) where each electron sees an effective potential from all others. Density Functional Theory (DFT) replaces the many-body wavefunction with the electron density, greatly reducing computational cost." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'Relativistic effects (Dirac equation) are significant for heavy atoms, causing orbital contraction of s and p orbitals and expansion of d and f orbitals. This explains the "inert pair effect" and the anomalous color of gold.' }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 2 })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  Orbitals as default
};
