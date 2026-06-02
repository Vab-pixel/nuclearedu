import { j as jsxRuntimeExports, P as PageHeader, S as SectionCard, m as motion, A as AudienceBadge, E as EquationBlock, r as reactExports } from "./index-DTpTSWSe.js";
import { C as CitationMarker } from "./CitationMarker-INaQsZz7.js";
import { C as CollapsibleSection } from "./CollapsibleSection-DYK90tLB.js";
import { I as InlineEquation } from "./InlineEquation-CdIBZYFd.js";
import { W as WebGLRenderer, S as Scene, P as PerspectiveCamera, A as AmbientLight, D as DirectionalLight, a as SphereGeometry, M as MeshStandardMaterial, b as Mesh, V as Vector3, F as FrontSide, B as BufferGeometry, c as BufferAttribute, d as PointsMaterial, e as Points } from "./three.module-CiciN0sv.js";
const timelineEvents = [
  { year: 1803, label: "Dalton", id: "dalton" },
  { year: 1897, label: "Thomson", id: "thomson" },
  { year: 1909, label: "Rutherford", id: "rutherford" },
  { year: 1913, label: "Bohr", id: "bohr" },
  { year: 1924, label: "de Broglie", id: "debroglie" },
  { year: 1926, label: "Schrödinger", id: "schrodinger" },
  { year: 1928, label: "Dirac", id: "dirac" },
  { year: 1964, label: "Standard Model", id: "standard" }
];
function DaltonCanvas() {
  const mountRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 360;
    const H = 220;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    const ambient = new AmbientLight(16777215, 0.6);
    scene.add(ambient);
    const dir = new DirectionalLight(8956671, 1.2);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const sphereGeo = new SphereGeometry(0.5, 32, 32);
    const colors = [5214719, 16739179, 5307003, 16758892, 12424185];
    const balls = [];
    for (let i = 0; i < 5; i++) {
      const mat = new MeshStandardMaterial({
        color: colors[i],
        roughness: 0.3,
        metalness: 0.1
      });
      const mesh = new Mesh(sphereGeo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2,
        0
      );
      scene.add(mesh);
      balls.push({
        mesh,
        vel: new Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          0
        )
      });
    }
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      for (const b of balls) {
        b.mesh.position.addScaledVector(b.vel, 1);
        b.mesh.rotation.y += 0.01;
        if (Math.abs(b.mesh.position.x) > 2.2) b.vel.x *= -1;
        if (Math.abs(b.mesh.position.y) > 1.1) b.vel.y *= -1;
      }
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: mountRef,
      className: "w-full rounded-lg overflow-hidden",
      style: { height: 220 },
      "aria-label": "Dalton solid sphere model animation"
    }
  );
}
function ThomsonCanvas() {
  const mountRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 360;
    const H = 220;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);
    const ambient = new AmbientLight(16777215, 0.4);
    scene.add(ambient);
    const dir = new DirectionalLight(16755268, 1.5);
    dir.position.set(2, 3, 4);
    scene.add(dir);
    const sphereGeo = new SphereGeometry(1.8, 48, 48);
    const sphereMat = new MeshStandardMaterial({
      color: 16746564,
      transparent: true,
      opacity: 0.25,
      roughness: 0.3,
      metalness: 0,
      side: FrontSide
    });
    scene.add(new Mesh(sphereGeo, sphereMat));
    const eDots = [];
    for (let i = 0; i < 8; i++) {
      const g = new SphereGeometry(0.12, 12, 12);
      const m = new MeshStandardMaterial({
        color: 5227511,
        emissive: 1739007,
        emissiveIntensity: 0.8
      });
      const mesh = new Mesh(g, m);
      scene.add(mesh);
      const phi = Math.acos(1 - 2 * (i + 0.5) / 8);
      eDots.push({
        mesh,
        angle: i / 8 * Math.PI * 2,
        radius: 1.2,
        speed: 0.012 + i * 2e-3,
        phi
      });
    }
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      for (const e of eDots) {
        e.angle += e.speed;
        e.mesh.position.set(
          e.radius * Math.sin(e.phi) * Math.cos(e.angle),
          e.radius * Math.cos(e.phi),
          e.radius * Math.sin(e.phi) * Math.sin(e.angle)
        );
      }
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: mountRef,
      className: "w-full rounded-lg overflow-hidden",
      style: { height: 220 },
      "aria-label": "Thomson plum pudding model animation"
    }
  );
}
function RutherfordCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 220 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const nuclei = [];
    for (let i = 0; i < 12; i++) {
      nuclei.push({
        x: cx + (Math.random() - 0.5) * W * 0.8,
        y: cy + (Math.random() - 0.5) * H * 0.7,
        r: 3 * dpr
      });
    }
    const alphas = [];
    let frameId = 0;
    let t = 0;
    const spawnAlpha = () => {
      const y = cy + (Math.random() - 0.5) * H * 0.6;
      const speed = 2.5 * dpr;
      alphas.push({
        x: 10 * dpr,
        y,
        vx: speed,
        vy: (Math.random() - 0.5) * 0.2 * dpr,
        trail: [],
        active: true,
        color: `hsl(${40 + Math.random() * 20}, 90%, 60%)`
      });
    };
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      t += 1;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,215,0,0.3)";
      ctx.font = `${10 * dpr}px monospace`;
      ctx.fillText("Gold Foil", 8, 14);
      for (const n of nuclei) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
        g.addColorStop(0, "rgba(255,200,50,0.9)");
        g.addColorStop(0.5, "rgba(255,180,30,0.4)");
        g.addColorStop(1, "rgba(255,180,30,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffd700";
        ctx.fill();
      }
      if (t % 15 === 0 && alphas.length < 40) spawnAlpha();
      for (const a of alphas) {
        if (!a.active) continue;
        for (const n of nuclei) {
          const dx = a.x - n.x;
          const dy = a.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 80 * dpr * dpr / (dist * dist);
          a.vx += dx / dist * force;
          a.vy += dy / dist * force;
        }
        a.x += a.vx;
        a.y += a.vy;
        a.trail.push({ x: a.x, y: a.y });
        if (a.trail.length > 40) a.trail.shift();
        if (a.x > W + 20 || a.y < -20 || a.y > H + 20) a.active = false;
        if (a.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(a.trail[0].x, a.trail[0].y);
          for (let i = 1; i < a.trail.length; i++) {
            ctx.lineTo(a.trail[i].x, a.trail[i].y);
          }
          ctx.strokeStyle = a.color;
          ctx.lineWidth = 1.2 * dpr;
          ctx.globalAlpha = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        const ag = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, 5 * dpr);
        ag.addColorStop(0, "rgba(255,255,200,1)");
        ag.addColorStop(1, "rgba(255,255,200,0)");
        ctx.beginPath();
        ctx.arc(a.x, a.y, 5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = ag;
        ctx.fill();
      }
      for (let i = alphas.length - 1; i >= 0; i--) {
        if (!alphas[i].active) alphas.splice(i, 1);
      }
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "w-full rounded-lg",
      style: { height: 220 },
      "aria-label": "Rutherford gold foil alpha scattering simulation"
    }
  );
}
function BohrCanvas() {
  const canvasRef = reactExports.useRef(null);
  const [energy, setEnergy] = reactExports.useState(1);
  const energyRef = reactExports.useRef(energy);
  reactExports.useEffect(() => {
    energyRef.current = energy;
  }, [energy]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 220 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const radii = [0.18, 0.32, 0.46, 0.6, 0.74].map((r) => r * Math.min(W, H));
    const ringColors = ["#ffcc44", "#44ffaa", "#4488ff", "#ff44aa", "#aa44ff"];
    let angle = 0;
    let currentLevel = 0;
    let flashTimer = 0;
    let flashColor = "#ffff44";
    let frameId = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      const target = Math.min(Math.max(energyRef.current - 1, 0), 4);
      if (currentLevel !== target) {
        flashTimer = 30;
        const deltaE = 13.6 * (1 / (target + 1) ** 2 - 1 / (currentLevel + 1) ** 2);
        const nm = Math.abs(deltaE) > 1e-3 ? 1240 / Math.abs(deltaE) : 0;
        if (nm >= 380 && nm <= 700) {
          const r2 = Math.max(
            0,
            Math.min(
              255,
              Math.round(
                (nm < 440 ? (440 - nm) / 60 : nm < 490 ? 0 : nm < 580 ? (nm - 510) / 70 : 1) * 255
              )
            )
          );
          const g = Math.max(
            0,
            Math.min(
              255,
              Math.round(
                (nm < 440 ? 0 : nm < 490 ? (nm - 440) / 50 : nm < 580 ? 1 : nm < 645 ? (645 - nm) / 65 : 0) * 255
              )
            )
          );
          const b = Math.max(
            0,
            Math.min(
              255,
              Math.round((nm < 440 ? 1 : nm < 490 ? (510 - nm) / 20 : 0) * 255)
            )
          );
          flashColor = `rgb(${r2},${g},${b})`;
        } else {
          flashColor = "#ffffff";
        }
        currentLevel = target;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < radii.length; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, radii[i], 0, Math.PI * 2);
        ctx.strokeStyle = i === currentLevel ? ringColors[i] : `${ringColors[i]}44`;
        ctx.lineWidth = i === currentLevel ? 2.5 * dpr : 1 * dpr;
        ctx.setLineDash(i === currentLevel ? [] : [4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `${ringColors[i]}aa`;
        ctx.font = `${9 * dpr}px monospace`;
        ctx.fillText(`n=${i + 1}`, cx + radii[i] + 6, cy + 4);
      }
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 * dpr);
      ng.addColorStop(0, "rgba(255,100,60,1)");
      ng.addColorStop(1, "rgba(255,60,30,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = ng;
      ctx.fill();
      const r = radii[currentLevel];
      const speed = 0.025 - currentLevel * 4e-3;
      angle += speed;
      const ex = cx + r * Math.cos(angle);
      const ey = cy + r * Math.sin(angle);
      const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 10 * dpr);
      eg.addColorStop(0, "rgba(255,255,255,1)");
      eg.addColorStop(0.5, "rgba(79,195,247,0.9)");
      eg.addColorStop(1, "rgba(79,195,247,0)");
      ctx.beginPath();
      ctx.arc(ex, ey, 10 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = eg;
      ctx.fill();
      if (flashTimer > 0) {
        const alpha = flashTimer / 30;
        const fg = ctx.createRadialGradient(
          ex,
          ey,
          0,
          ex,
          ey,
          40 * dpr * alpha
        );
        fg.addColorStop(0, flashColor);
        fg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(ex, ey, 40 * dpr * alpha, 0, Math.PI * 2);
        ctx.fillStyle = fg;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        flashTimer -= 1;
      }
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
        style: { height: 220 },
        "aria-label": "Bohr quantized orbit model with photon emission"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "n=" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 5,
          value: energy,
          onChange: (e) => setEnergy(Number(e.target.value)),
          className: "flex-1 accent-primary h-1",
          "aria-label": "Electron energy level n",
          "data-ocid": "atoms.bohr_level_slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary w-4", children: energy })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InlineEquation, { tex: "E_n = -13.6/n^2 \\\\text{ eV}" }),
      " · ",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InlineEquation,
        {
          tex: `E_{${energy}} = ${(-13.6 / (energy * energy)).toFixed(3)}\\text{ eV}`
        }
      )
    ] })
  ] });
}
function DeBroglieCanvas() {
  const canvasRef = reactExports.useRef(null);
  const [mode, setMode] = reactExports.useState("integer");
  const modeRef = reactExports.useRef(mode);
  reactExports.useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 220 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.32;
    let t = 0;
    let frameId = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(10,12,20,1)";
      ctx.fillRect(0, 0, W, H);
      const ng = ctx.createRadialGradient(cx, cy, 2 * dpr, cx, cy, 22 * dpr);
      ng.addColorStop(0, "rgba(255,100,60,0.9)");
      ng.addColorStop(1, "rgba(255,60,60,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 22 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = ng;
      ctx.fill();
      const isInt = modeRef.current === "integer";
      const n = isInt ? 4 : 3.7;
      ctx.beginPath();
      const steps = 256;
      for (let i = 0; i <= steps; i++) {
        const angle = i / steps * Math.PI * 2;
        const wave = R + 14 * dpr * Math.sin(n * angle + t);
        const x = cx + wave * Math.cos(angle);
        const y = cy + wave * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, "rgba(99,179,237,0.9)");
      grad.addColorStop(0.5, "rgba(165,243,252,0.9)");
      grad.addColorStop(1, "rgba(99,179,237,0.9)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5 * dpr;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1 * dpr;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      const ea = t * 0.6;
      const er = R + 14 * dpr * Math.sin(n * ea + t);
      const ex = cx + er * Math.cos(ea);
      const ey = cy + er * Math.sin(ea);
      const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 9 * dpr);
      eg.addColorStop(0, "rgba(255,255,255,1)");
      eg.addColorStop(0.4, "rgba(63,185,255,0.9)");
      eg.addColorStop(1, "rgba(63,185,255,0)");
      ctx.beginPath();
      ctx.arc(ex, ey, 9 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = eg;
      ctx.fill();
      ctx.fillStyle = "rgba(200,200,200,0.6)";
      ctx.font = `${10 * dpr}px monospace`;
      ctx.fillText(
        isInt ? "n = 4 (stable standing wave)" : "n = 3.7 (destructive interference)",
        8,
        H - 8
      );
      t += 0.025;
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
        style: { height: 220 },
        "aria-label": "de Broglie standing wave model"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMode("integer"),
          className: `px-3 py-1 rounded text-xs font-medium transition-colors ${mode === "integer" ? "bg-primary/30 text-primary border border-primary/50" : "text-muted-foreground hover:bg-muted/30"}`,
          "data-ocid": "atoms.debroglie_integer",
          children: "Integer n (stable)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMode("noninteger"),
          className: `px-3 py-1 rounded text-xs font-medium transition-colors ${mode === "noninteger" ? "bg-primary/30 text-primary border border-primary/50" : "text-muted-foreground hover:bg-muted/30"}`,
          "data-ocid": "atoms.debroglie_noninteger",
          children: "Non-integer n (unstable)"
        }
      )
    ] })
  ] });
}
function SchrodingerCanvas() {
  const mountRef = reactExports.useRef(null);
  const [n, setN] = reactExports.useState(2);
  const [l, setL] = reactExports.useState(1);
  const [m, setM] = reactExports.useState(0);
  const paramsRef = reactExports.useRef({ n: 2, l: 1, m: 0 });
  reactExports.useEffect(() => {
    paramsRef.current = { n, l, m };
  }, [n, l, m]);
  reactExports.useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 360;
    const H = 220;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    scene.add(new AmbientLight(16777215, 0.6));
    const dir = new DirectionalLight(8956671, 1.2);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const generateCloud = (nn, ll, mm) => {
      const pts = [];
      const count = 800;
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 2.5 + 0.1;
        const prob = Math.exp(-2 * r / nn) * (2 * r / nn) ** (2 * ll);
        if (Math.random() > prob) continue;
        const theta = Math.acos(2 * Math.random() - 1);
        const phi = Math.random() * Math.PI * 2;
        const phiShift = mm !== 0 ? Math.cos(mm * phi) : 1;
        if (Math.abs(phiShift) < 0.3) continue;
        const rPx = r * 0.8;
        pts.push({
          x: rPx * Math.sin(theta) * Math.cos(phi),
          y: rPx * Math.sin(theta) * Math.sin(phi),
          z: rPx * Math.cos(theta),
          a: phi
        });
      }
      return pts;
    };
    let cloudPts = generateCloud(2, 1, 0);
    let frameId = 0;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const { n: cn, l: cl, m: cm } = paramsRef.current;
      if (Math.floor(t) % 60 === 0) {
        cloudPts = generateCloud(cn, cl, cm);
      }
      scene.clear();
      scene.add(new AmbientLight(16777215, 0.6));
      scene.add(dir);
      const geo = new BufferGeometry();
      const positions = new Float32Array(cloudPts.length * 3);
      const colors = new Float32Array(cloudPts.length * 3);
      for (let i = 0; i < cloudPts.length; i++) {
        const p = cloudPts[i];
        positions[i * 3] = p.x + Math.sin(t + p.a) * 0.02;
        positions[i * 3 + 1] = p.y + Math.cos(t + p.a * 0.7) * 0.02;
        positions[i * 3 + 2] = p.z;
        const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        colors[i * 3] = 0.4 + dist * 0.3;
        colors[i * 3 + 1] = 0.6 + dist * 0.2;
        colors[i * 3 + 2] = 1;
      }
      geo.setAttribute("position", new BufferAttribute(positions, 3));
      geo.setAttribute("color", new BufferAttribute(colors, 3));
      const mat = new PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
      });
      scene.add(new Points(geo, mat));
      const nucGeo = new SphereGeometry(0.12, 16, 16);
      const nucMat = new MeshStandardMaterial({
        color: 16729156,
        emissive: 16720418,
        emissiveIntensity: 0.8
      });
      scene.add(new Mesh(nucGeo, nucMat));
      scene.rotation.y = t * 0.15;
      scene.rotation.x = Math.sin(t * 0.1) * 0.1;
      renderer.render(scene, camera);
      t += 0.016;
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);
  const safeL = Math.min(l, n - 1);
  const safeM = Math.max(-safeL, Math.min(safeL, m));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: mountRef,
        className: "w-full rounded-lg overflow-hidden",
        style: { height: 220 },
        "aria-label": "Schrödinger 3D probability cloud"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-1 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "n=" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 4,
          value: n,
          onChange: (e) => setN(Number(e.target.value)),
          className: "w-16 accent-primary h-1",
          "aria-label": "Principal quantum number n",
          "data-ocid": "atoms.schrodinger_n"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary w-3", children: n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "l=" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: n - 1,
          value: safeL,
          onChange: (e) => setL(Number(e.target.value)),
          className: "w-16 accent-primary h-1",
          "aria-label": "Azimuthal quantum number l",
          "data-ocid": "atoms.schrodinger_l"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary w-3", children: safeL }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "m=" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: -safeL,
          max: safeL,
          value: safeM,
          onChange: (e) => setM(Number(e.target.value)),
          className: "w-16 accent-primary h-1",
          "aria-label": "Magnetic quantum number m",
          "data-ocid": "atoms.schrodinger_m"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary w-4", children: safeM })
    ] })
  ] });
}
const models = [
  {
    id: "dalton",
    year: 1803,
    title: "Dalton's Solid Sphere Model",
    scientist: "John Dalton",
    nationality: "British",
    keyEquation: {
      latex: "m = n \\cdot M",
      annotation: "Dalton's law of multiple proportions: the mass of a compound equals n moles times the molar mass M. This quantitative foundation underpinned atomic theory.",
      label: "Law of Definite Proportions"
    },
    description: "John Dalton proposed in his 'New System of Chemical Philosophy' (1808) that matter is composed of indivisible, solid, indestructible spheres — atoms. Each element consists of identical atoms with a characteristic atomic weight. Atoms of different elements combine in fixed whole-number ratios to form compounds. This was the first scientific atomic theory, explaining the laws of definite and multiple proportions observed by chemists.",
    evidence: "Gay-Lussac's law of combining volumes, Proust's law of definite proportions, Dalton's own measurements of atomic weights from gas reactions.",
    limitation: "Cannot explain subatomic structure, electrical phenomena, spectral lines, or chemical bonding mechanisms. Assumes atoms are indivisible — contradicted by Thomson's 1897 electron discovery.",
    refId: 1,
    accentColor: "border-blue-500/30",
    canvas: /* @__PURE__ */ jsxRuntimeExports.jsx(DaltonCanvas, {})
  },
  {
    id: "thomson",
    year: 1904,
    title: "Thomson's Plum Pudding Model",
    scientist: "J.J. Thomson",
    nationality: "British",
    keyEquation: {
      latex: "e/m = 1.758 \\times 10^{11} \\text{C/kg}",
      annotation: "Thomson's measured charge-to-mass ratio of the electron from cathode ray experiments (1897), establishing the electron as a universal constituent of all matter.",
      label: "Electron Charge-to-Mass Ratio"
    },
    description: "After discovering the electron in 1897 via cathode ray tube experiments, J.J. Thomson proposed in 1904 that atoms consist of a diffuse sphere of uniform positive charge (like a pudding) with electrons embedded throughout at equilibrium positions (like plums). The total negative charge of electrons exactly balances the positive sphere charge, giving the atom overall neutrality. Thomson won the 1906 Nobel Prize in Physics for discovering the electron.",
    evidence: "Discovery of the electron (cathode rays deflected by electric and magnetic fields). Measurement of e/m ratio. Millikan's later oil-drop measurement of e confirmed Thomson's value.",
    limitation: "Failed to explain the Geiger-Marsden gold foil experiment (1909): the plum-pudding model predicts only small deflections of alpha particles, not the large-angle scattering (including backscattering at >90°) that was observed. The positive charge is too diffuse.",
    refId: 2,
    accentColor: "border-orange-500/30",
    canvas: /* @__PURE__ */ jsxRuntimeExports.jsx(ThomsonCanvas, {})
  },
  {
    id: "rutherford",
    year: 1911,
    title: "Rutherford's Nuclear (Planetary) Model",
    scientist: "Ernest Rutherford",
    nationality: "New Zealand/British",
    keyEquation: {
      latex: "\\cot\\!\\left(\\frac{\\theta}{2}\\right) = \\frac{2E_k b}{Z_1 Z_2 e^2 / (4\\pi\\epsilon_0)}",
      annotation: "Rutherford scattering formula: the cotangent of half the deflection angle θ equals the impact parameter b times kinetic energy divided by the Coulomb interaction constant. Derived analytically to fit the 1909 Geiger-Marsden gold foil data.",
      label: "Rutherford Scattering Formula"
    },
    description: "Ernest Rutherford, Hans Geiger, and Ernest Marsden performed the landmark gold foil experiment (1909–1911). Alpha particles were fired at thin gold foil; most passed straight through, but ~1 in 8,000 bounced back at angles >90°. This was famously described by Rutherford as 'like firing artillery shells at tissue paper and having them come back at you.' He concluded that all positive charge and nearly all atomic mass is concentrated in a tiny dense nucleus (~10⁻¹⁵ m), with electrons orbiting at large distances (~10⁻¹⁰ m).",
    evidence: "Geiger-Marsden gold foil experiment (1909). The angular distribution of scattered alpha particles perfectly matched the Rutherford formula for a point-like nuclear charge, disproving Thomson's model.",
    limitation: "Classical electrodynamics predicts that accelerating electrons (orbiting nucleus) must radiate energy continuously (Larmor radiation) and spiral into the nucleus in ~10⁻¹¹ s — atoms would be unstable. Cannot explain atomic emission spectra.",
    refId: 3,
    accentColor: "border-red-500/30",
    canvas: /* @__PURE__ */ jsxRuntimeExports.jsx(RutherfordCanvas, {})
  },
  {
    id: "bohr",
    year: 1913,
    title: "Bohr's Quantized Orbit Model",
    scientist: "Niels Bohr",
    nationality: "Danish",
    keyEquation: {
      latex: "E_n = -\\frac{13.6\\text{ eV}}{n^2} \\quad n = 1,\\, 2,\\, 3,\\ldots",
      annotation: "The energy levels of the hydrogen atom in Bohr's model. Each orbit has a quantized energy. Photons are emitted when an electron transitions from level n₂ to n₁: hν = E(n₂) − E(n₁).",
      label: "Bohr Energy Levels (Hydrogen)"
    },
    description: "Niels Bohr incorporated Planck's quantum hypothesis into Rutherford's model, postulating that electrons occupy discrete, stationary orbits where the angular momentum is quantized in integer multiples of ℏ: L = nℏ. Electrons do not radiate while in these orbits. Photons are emitted or absorbed only when electrons jump between levels: E_photon = |E_n2 − E_n1|. This successfully explained the hydrogen emission spectrum (Lyman, Balmer, Paschen series) with extraordinary precision. Bohr received the 1922 Nobel Prize in Physics.",
    evidence: "Hydrogen emission spectrum — predicted wavelengths matched observed Balmer series to 4 significant figures. Franck-Hertz experiment (1914) directly confirmed discrete atomic energy levels through electron impact excitation. Rydberg formula derivation from first principles.",
    limitation: "Works only for hydrogen and hydrogen-like ions. Cannot predict spectra of multi-electron atoms, the relative intensities of spectral lines, or explain the Zeeman effect (magnetic splitting). The concept of fixed orbits contradicts the Heisenberg Uncertainty Principle.",
    refId: 4,
    accentColor: "border-yellow-500/30",
    canvas: /* @__PURE__ */ jsxRuntimeExports.jsx(BohrCanvas, {})
  },
  {
    id: "debroglie",
    // Bohr extra equations injected below in JSX
    year: 1924,
    title: "de Broglie Wave Model",
    scientist: "Louis de Broglie",
    nationality: "French",
    keyEquation: {
      latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
      annotation: "de Broglie wavelength: every particle with momentum p = mv has an associated wave of wavelength λ = h/p, where h is Planck's constant. For a 1 eV electron: λ ≈ 1.23 nm — comparable to atomic spacings.",
      label: "de Broglie Relation (1924)"
    },
    description: "In his 1924 doctoral thesis, Louis de Broglie proposed that all matter has wave-like properties, extending Einstein's photon concept to material particles. An electron in an atom forms a standing wave around the nucleus; stable orbits are those where the electron wavelength fits an integer number of times around the orbit circumference: 2πr = nλ = nh/mv. This elegantly derives Bohr's quantization condition from a physical wave picture and bridges quantum mechanics with classical wave theory. de Broglie received the Nobel Prize in Physics in 1929.",
    evidence: "Davisson-Germer experiment (1927): diffraction of electrons from nickel crystal confirmed electron wavelengths matching the de Broglie formula. G.P. Thomson also observed electron diffraction from thin metal films in the same year. Modern electron microscopes exploit this wave nature daily.",
    limitation: "A semiclassical approximation — treats the electron as a wave only in steady-state orbits. Does not provide a dynamical wave equation (Schrödinger's 1926 equation was needed). Cannot compute transition probabilities or multi-electron wavefunctions.",
    refId: 5,
    accentColor: "border-cyan-500/30",
    canvas: /* @__PURE__ */ jsxRuntimeExports.jsx(DeBroglieCanvas, {})
  },
  {
    id: "schrodinger",
    year: 1926,
    title: "Schrödinger Quantum Mechanical Model",
    scientist: "Erwin Schrödinger",
    nationality: "Austrian",
    keyEquation: {
      latex: "\\hat{H}\\psi = E\\psi \\;\\Rightarrow\\; -\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi",
      annotation: "The time-independent Schrödinger equation: the Hamiltonian operator H-hat (kinetic + potential energy) acting on the wavefunction ψ equals the energy eigenvalue E times ψ. Solutions give atomic orbitals — probability amplitude functions in 3D space.",
      label: "Time-Independent Schrödinger Equation (1926)"
    },
    description: "Erwin Schrödinger formulated the wave equation that gives exact solutions for hydrogen and approximate solutions for all atoms. The electron is described not by a trajectory but by a wavefunction ψ(r,θ,φ) — a complex-valued function in three dimensions. Max Born's (1926) probabilistic interpretation: |ψ|²dV is the probability of finding the electron in volume element dV. Solving the Schrödinger equation for hydrogen yields atomic orbitals labeled by quantum numbers n, ℓ, mℓ, ms. Schrödinger shared the 1933 Nobel Prize with Dirac. This remains the foundation of all modern chemistry and condensed matter physics.",
    evidence: "Exact hydrogen spectrum (including fine structure with Dirac equation). Explains periodic table structure via orbital filling. Molecular orbital theory predicts bond lengths, angles, and energies from first principles. X-ray diffraction maps electron density clouds matching predicted |ψ|² distributions.",
    limitation: "Non-relativistic; needs Dirac equation for heavy atoms (spin-orbit effects, relativistic core electrons — important for gold's yellow color, mercury's liquid state). Full many-body wavefunction for N electrons requires 3N coordinates — exact treatment is exponentially expensive (solved approximately via DFT, coupled cluster methods).",
    refId: 6,
    accentColor: "border-purple-500/30",
    canvas: /* @__PURE__ */ jsxRuntimeExports.jsx(SchrodingerCanvas, {})
  }
];
const compTable = [
  {
    model: "Dalton (1803)",
    electrons: "None (indivisible atom)",
    nucleus: "Entire atom is solid sphere",
    valid: "Conservation of mass",
    fails: "Electrical phenomena, spectra"
  },
  {
    model: "Thomson (1904)",
    electrons: "Embedded in +ve sphere",
    nucleus: "Diffuse positive sphere",
    valid: "Atom has electrons",
    fails: "Large-angle α-scattering"
  },
  {
    model: "Rutherford (1911)",
    electrons: "Orbiting at distance",
    nucleus: "Dense, tiny, +ve",
    valid: "Nuclear scattering",
    fails: "Stability, spectra"
  },
  {
    model: "Bohr (1913)",
    electrons: "Quantized circular orbits",
    nucleus: "Point charge",
    valid: "H spectrum, n=1-7",
    fails: "Multi-electron, intensities"
  },
  {
    model: "de Broglie (1924)",
    electrons: "Standing matter waves",
    nucleus: "Point charge",
    valid: "Derives Bohr quantization",
    fails: "Wave dynamics missing"
  },
  {
    model: "Schrödinger (1926)",
    electrons: "Probability orbitals |ψ|²",
    nucleus: "Coulomb potential center",
    valid: "All atomic properties",
    fails: "Relativistic effects (→Dirac)"
  }
];
function AtomicModels() {
  const scrollTo = (id) => {
    var _a;
    (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Historical Atomic Models",
        subtitle: "From Dalton's indivisible sphere (1803) to Schrödinger's quantum wavefunction (1926) — the 120-year journey that revolutionized our understanding of matter.",
        audienceLevel: "intermediate",
        readTimeMin: 45
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-8", "data-ocid": "atoms.timeline_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Interactive Timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-4 left-0 right-0 h-0.5 bg-border",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between relative", children: timelineEvents.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => scrollTo(ev.id),
            className: "flex flex-col items-center gap-1 group",
            "aria-label": `Jump to ${ev.label} ${ev.year} model`,
            "data-ocid": `atoms.timeline_${ev.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-primary border-2 border-background z-10 group-hover:scale-150 transition-transform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary", children: ev.year }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight text-center max-w-[52px]", children: ev.label })
            ]
          },
          ev.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8", children: models.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        id: m.id,
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-xl border bg-card shadow-card overflow-hidden ${m.accentColor}`,
            "data-ocid": `atoms.model_${m.id}_card`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-5 bg-muted/20 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded", children: m.year }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AudienceBadge,
                      {
                        level: i < 2 ? "beginner" : i < 4 ? "intermediate" : "advanced"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: m.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                    m.scientist,
                    " · ",
                    m.nationality
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: m.refId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-muted/5", children: m.canvas }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: m.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    CollapsibleSection,
                    {
                      id: `${m.id}-equation`,
                      title: "Key Equation",
                      defaultOpen: true,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          EquationBlock,
                          {
                            latex: m.keyEquation.latex,
                            annotation: m.keyEquation.annotation,
                            label: m.keyEquation.label
                          }
                        ),
                        m.id === "bohr" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EquationBlock,
                            {
                              label: "Bohr Radius",
                              latex: "a_0 = \\\\frac{4\\\\pi\\\\varepsilon_0 \\\\hbar^2}{m_e e^2} = 0.529\\\\,\\\\text{\\\\u00c5}",
                              annotation: "The Bohr radius a₀ = 0.529 Å is the most probable distance from the nucleus for a ground-state hydrogen electron. It sets the natural length scale for atomic physics."
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EquationBlock,
                            {
                              label: "Quantized Angular Momentum",
                              latex: "L = n\\\\hbar \\\\quad (n = 1,2,3,\\\\ldots)",
                              annotation: "Bohr's key postulate: the orbital angular momentum of the electron is quantized in integer multiples of ℏ = h/(2π). This restricts allowed orbits to discrete radii r_n = n²a₀."
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EquationBlock,
                            {
                              label: "de Broglie Standing Wave Condition",
                              latex: "2\\\\pi r_n = n\\\\lambda = \\\\frac{nh}{mv}",
                              annotation: "de Broglie (1924) re-derived Bohr's quantization from wave mechanics: the electron wavelength λ = h/mv must fit an integer number of times around the orbit circumference 2πr for a stable standing wave."
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CollapsibleSection,
                    {
                      id: `${m.id}-evidence`,
                      title: "Experimental Evidence",
                      defaultOpen: false,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: m.evidence })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CollapsibleSection,
                    {
                      id: `${m.id}-limits`,
                      title: "Limitations & Why It Was Superseded",
                      defaultOpen: false,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: m.limitation })
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      },
      m.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mt-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CollapsibleSection,
          {
            id: "model-comparison",
            title: "Model Comparison Table",
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
            defaultOpen: true,
            "data-ocid": "atoms.comparison_table_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-sm",
                "aria-label": "Comparison of atomic models",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-left", children: [
                    "Model",
                    "Electrons",
                    "Nucleus",
                    "Explains",
                    "Fails at"
                  ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "pb-2 pr-3 font-semibold text-foreground text-xs whitespace-nowrap",
                      children: h
                    },
                    h
                  )) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: compTable.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground text-xs whitespace-nowrap", children: row.model }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs", children: row.electrons }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs", children: row.nucleus }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs text-emerald-400/80", children: row.valid }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs text-rose-400/80", children: row.fails })
                  ] }, row.model)) })
                ]
              }
            ) })
          }
        )
      }
    )
  ] });
}
export {
  AtomicModels as default
};
