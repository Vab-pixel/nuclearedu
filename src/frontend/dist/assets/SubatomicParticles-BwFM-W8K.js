import { r as reactExports, j as jsxRuntimeExports, P as PageHeader, S as SectionCard, E as EquationBlock, A as AudienceBadge, m as motion } from "./index-DWzjlv-D.js";
import { C as CitationMarker } from "./CitationMarker-BPCOmJ02.js";
import { C as CollapsibleSection } from "./CollapsibleSection-QQsEekCS.js";
import { I as InlineEquation } from "./InlineEquation-m3CTHgTH.js";
import { W as WebGLRenderer, S as Scene, P as PerspectiveCamera, A as AmbientLight, D as DirectionalLight, a as SphereGeometry, M as MeshStandardMaterial, b as Mesh, V as Vector3, B as BufferGeometry, L as Line, f as LineBasicMaterial, C as Color } from "./three.module-CiciN0sv.js";
const quarks = [
  {
    name: "Up",
    symbol: "u",
    mass: "2.3 MeV/c²",
    charge: "+2/3",
    spin: "1/2",
    discovered: 1968,
    discoverer: "SLAC deep inelastic",
    category: "Quark",
    color: "text-orange-400"
  },
  {
    name: "Down",
    symbol: "d",
    mass: "4.8 MeV/c²",
    charge: "-1/3",
    spin: "1/2",
    discovered: 1968,
    discoverer: "SLAC deep inelastic",
    category: "Quark",
    color: "text-orange-400"
  },
  {
    name: "Charm",
    symbol: "c",
    mass: "1.27 GeV/c²",
    charge: "+2/3",
    spin: "1/2",
    discovered: 1974,
    discoverer: "Ting & Richter",
    category: "Quark",
    color: "text-orange-400"
  },
  {
    name: "Strange",
    symbol: "s",
    mass: "95 MeV/c²",
    charge: "-1/3",
    spin: "1/2",
    discovered: 1947,
    discoverer: "Rochester & Butler",
    category: "Quark",
    color: "text-orange-400"
  },
  {
    name: "Top",
    symbol: "t",
    mass: "172.76 GeV/c²",
    charge: "+2/3",
    spin: "1/2",
    discovered: 1995,
    discoverer: "CDF & D0 at Tevatron",
    category: "Quark",
    color: "text-orange-400"
  },
  {
    name: "Bottom",
    symbol: "b",
    mass: "4.18 GeV/c²",
    charge: "-1/3",
    spin: "1/2",
    discovered: 1977,
    discoverer: "Lederman et al., Fermilab",
    category: "Quark",
    color: "text-orange-400"
  }
];
const leptons = [
  {
    name: "Electron",
    symbol: "e-",
    mass: "0.511 MeV/c²",
    charge: "-1",
    spin: "1/2",
    discovered: 1897,
    discoverer: "J.J. Thomson",
    category: "Lepton",
    color: "text-emerald-400"
  },
  {
    name: "Muon",
    symbol: "mu-",
    mass: "105.7 MeV/c²",
    charge: "-1",
    spin: "1/2",
    discovered: 1936,
    discoverer: "Anderson & Neddermeyer",
    category: "Lepton",
    color: "text-emerald-400"
  },
  {
    name: "Tau",
    symbol: "tau-",
    mass: "1776.86 MeV/c²",
    charge: "-1",
    spin: "1/2",
    discovered: 1975,
    discoverer: "Perl et al., SLAC",
    category: "Lepton",
    color: "text-emerald-400"
  },
  {
    name: "e-neutrino",
    symbol: "nu_e",
    mass: "< 2 eV/c²",
    charge: "0",
    spin: "1/2",
    discovered: 1956,
    discoverer: "Cowan & Reines",
    category: "Lepton",
    color: "text-emerald-400"
  },
  {
    name: "mu-neutrino",
    symbol: "nu_mu",
    mass: "< 0.19 MeV/c²",
    charge: "0",
    spin: "1/2",
    discovered: 1962,
    discoverer: "Lederman et al.",
    category: "Lepton",
    color: "text-emerald-400"
  },
  {
    name: "tau-neutrino",
    symbol: "nu_tau",
    mass: "< 18.2 MeV/c²",
    charge: "0",
    spin: "1/2",
    discovered: 2e3,
    discoverer: "DONUT, Fermilab",
    category: "Lepton",
    color: "text-emerald-400"
  }
];
const bosons = [
  {
    name: "Photon",
    symbol: "y",
    mass: "0",
    charge: "0",
    spin: "1",
    discovered: 1905,
    discoverer: "Einstein (photoelectric)",
    category: "Gauge Boson",
    color: "text-yellow-400"
  },
  {
    name: "W Boson",
    symbol: "W+/-",
    mass: "80.377 GeV/c²",
    charge: "+/-1",
    spin: "1",
    discovered: 1983,
    discoverer: "UA1/UA2, CERN",
    category: "Gauge Boson",
    color: "text-yellow-400"
  },
  {
    name: "Z Boson",
    symbol: "Z0",
    mass: "91.188 GeV/c²",
    charge: "0",
    spin: "1",
    discovered: 1983,
    discoverer: "UA1/UA2, CERN",
    category: "Gauge Boson",
    color: "text-yellow-400"
  },
  {
    name: "Gluon",
    symbol: "g",
    mass: "0",
    charge: "0",
    spin: "1",
    discovered: 1979,
    discoverer: "PETRA, DESY",
    category: "Gauge Boson",
    color: "text-yellow-400"
  },
  {
    name: "Higgs",
    symbol: "H0",
    mass: "125.25 GeV/c²",
    charge: "0",
    spin: "0",
    discovered: 2012,
    discoverer: "ATLAS & CMS, LHC",
    category: "Scalar Boson",
    color: "text-purple-400"
  },
  {
    name: "Graviton",
    symbol: "G",
    mass: "0 (theory)",
    charge: "0",
    spin: "2",
    discovered: 0,
    discoverer: "Unobserved",
    category: "Hypothetical",
    color: "text-muted-foreground"
  }
];
function QuarkVisualizer({ isProton }) {
  const mountRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 320;
    const H = 260;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    scene.add(new AmbientLight(16777215, 0.5));
    const dir = new DirectionalLight(16777215, 1.4);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const nucleonGeo = new SphereGeometry(1.6, 48, 48);
    const nucleonMat = new MeshStandardMaterial({
      color: isProton ? 16733491 : 3368703,
      transparent: true,
      opacity: 0.1,
      roughness: 0.2,
      metalness: 0.1
    });
    scene.add(new Mesh(nucleonGeo, nucleonMat));
    const quarkColors = isProton ? [16729156, 16729156, 4474111] : [16729156, 4474111, 4474111];
    const quarkAngles = [0, Math.PI * 2 / 3, Math.PI * 4 / 3];
    const qMeshes = [];
    const qBase = [];
    for (let i = 0; i < 3; i++) {
      const g = new SphereGeometry(0.28, 24, 24);
      const m = new MeshStandardMaterial({
        color: quarkColors[i],
        emissive: quarkColors[i],
        emissiveIntensity: 0.5,
        roughness: 0.3
      });
      const mesh = new Mesh(g, m);
      const bp = new Vector3(
        0.9 * Math.cos(quarkAngles[i]),
        0.9 * Math.sin(quarkAngles[i]),
        0
      );
      mesh.position.copy(bp);
      scene.add(mesh);
      qMeshes.push(mesh);
      qBase.push(bp);
    }
    const gLines = [];
    const gColors = [4521864, 16777028, 16729343];
    for (let i = 0; i < 3; i++) {
      const next = (i + 1) % 3;
      const geo = new BufferGeometry().setFromPoints([
        qMeshes[i].position.clone(),
        qMeshes[next].position.clone()
      ]);
      const line = new Line(
        geo,
        new LineBasicMaterial({ color: gColors[i], linewidth: 2 })
      );
      scene.add(line);
      gLines.push(line);
    }
    let colorPhase = 0;
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      colorPhase += 0.02;
      for (let i = 0; i < 3; i++) {
        qMeshes[i].position.x = qBase[i].x + Math.sin(colorPhase * 1.3 + i * 2.1) * 0.12;
        qMeshes[i].position.y = qBase[i].y + Math.cos(colorPhase * 0.9 + i * 1.7) * 0.12;
      }
      for (let i = 0; i < 3; i++) {
        const next = (i + 1) % 3;
        const pos = gLines[i].geometry.attributes.position;
        pos.setXYZ(
          0,
          qMeshes[i].position.x,
          qMeshes[i].position.y,
          qMeshes[i].position.z
        );
        pos.setXYZ(
          1,
          qMeshes[next].position.x,
          qMeshes[next].position.y,
          qMeshes[next].position.z
        );
        pos.needsUpdate = true;
      }
      const t = colorPhase;
      const cols = [
        new Color(Math.abs(Math.sin(t)), 0, 0),
        new Color(0, Math.abs(Math.sin(t + 2.1)), 0),
        new Color(0, 0, Math.abs(Math.sin(t + 4.2)))
      ];
      for (let i = 0; i < 3; i++) {
        const mat = qMeshes[i].material;
        mat.emissive.copy(cols[i]);
        mat.emissiveIntensity = 0.6 + 0.4 * Math.abs(Math.sin(t + i));
      }
      scene.rotation.y += 5e-3;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [isProton]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: mountRef,
      className: "w-full rounded-lg overflow-hidden",
      style: { height: 260 },
      "aria-label": isProton ? "Proton quark composition" : "Neutron quark composition"
    }
  );
}
function LeptonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: leptons.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.85 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { delay: i * 0.06 },
      className: "rounded-lg border border-border bg-muted/20 p-3 text-center",
      "data-ocid": `atoms.lepton_${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-mono font-bold text-emerald-400", children: l.symbol }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground font-medium mt-1", children: l.name.split(" ")[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: l.mass }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
          "Q = ",
          l.charge
        ] })
      ]
    },
    l.symbol
  )) });
}
function HiggsFieldCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
    canvas.height = 160 * (window.devicePixelRatio || 1);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    let t = 0;
    let frameId = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      const cols = 50;
      const rows = 50;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const fx = ix / cols * 2 - 1;
          const fy = iy / rows * 2 - 1;
          const r2 = fx * fx + fy * fy;
          const V = -0.5 * r2 + 0.25 * r2 * r2 + 0.15 * Math.cos(8 * Math.atan2(fy, fx) + t);
          const brightness = Math.max(0, Math.min(1, 0.5 - V * 0.8));
          const hue = 260 + V * 40;
          const cxp = ix / cols * W;
          const cyp = iy / rows * H;
          const cw = W / cols + 1;
          const ch = H / rows + 1;
          ctx.fillStyle = `hsla(${hue},80%,${40 + brightness * 40}%,0.8)`;
          ctx.fillRect(cxp, cyp, cw, ch);
        }
      }
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = `bold ${11 * (window.devicePixelRatio || 1)}px monospace`;
      ctx.fillText(
        "Higgs Field -- Mexican Hat Potential V(phi) = -mu^2|phi|^2 + lambda|phi|^4",
        10,
        H - 10
      );
      t += 0.02;
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "w-full rounded-lg",
      style: { height: 160 },
      "aria-label": "Higgs field Mexican hat potential visualization"
    }
  );
}
function ParticleTable({
  particles,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base font-semibold text-foreground mb-3", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", "aria-label": `${title} particle data`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-left", children: [
        "Symbol",
        "Name",
        "Mass",
        "Charge",
        "Spin",
        "Discovered",
        "Discoverer"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "pb-2 pr-3 font-semibold text-foreground whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "text-muted-foreground hover:bg-muted/20 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: `py-2 pr-3 font-mono text-base font-bold ${p.color}`,
                children: p.symbol
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-foreground font-medium", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono", children: p.mass }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono", children: p.charge }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono", children: p.spin }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3", children: p.discovered > 0 ? p.discovered : "--" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: p.discoverer })
          ]
        },
        p.symbol
      )) })
    ] }) })
  ] });
}
function SubatomicParticles() {
  const [showNeutron, setShowNeutron] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Subatomic Particles",
        subtitle: "From electrons and nucleons to quarks, gluons, and the Higgs -- a complete tour of matter's fundamental constituents via the Standard Model.",
        audienceLevel: "advanced",
        readTimeMin: 40
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-8", "data-ocid": "atoms.sm_overview_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "The Standard Model of Particle Physics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 7 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "The Standard Model (SM), developed between 1961 and 1973, describes 17 known fundamental particles and three of the four fundamental forces (electromagnetic, weak, strong) under the gauge symmetry group SU(3) x SU(2) x U(1). Matter particles (fermions) carry half-integer spin; force carriers (bosons) carry integer spin. The Higgs boson, discovered at CERN in 2012, gives mass to W/Z bosons via electroweak symmetry breaking, and generates fermion masses through Yukawa couplings." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "\\\\mathcal{L}_{\\\\text{SM}} = -\\\\tfrac{1}{4}F_{\\\\mu\\\\nu}F^{\\\\mu\\\\nu} + i\\\\bar{\\\\psi}\\\\,\\\\slashed{D}\\\\psi + |D_\\\\mu H|^2 - V(H) + \\\\bar{\\\\psi}_i\\\\, y_{ij}\\\\, \\\\psi_j H + \\\\text{h.c.}",
          annotation: "The Standard Model Lagrangian: kinetic terms for gauge fields F_mn, Dirac fermionic matter, Higgs kinetic |D H|^2, Higgs self-potential V(H), and Yukawa couplings y_ij generating fermion masses after electroweak symmetry breaking.",
          label: "Standard Model Lagrangian (compact)"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "subatomic-quarks",
        title: "1. Quarks and Nucleon Structure",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
        defaultOpen: true,
        "data-ocid": "atoms.quarks_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5", children: [
            "Protons and neutrons are composite hadrons made of three valence quarks bound by gluons via QCD. The proton (uud) carries charge +1; the neutron (udd) is neutral. Color confinement prevents isolated quarks -- hadrons must be color-neutral (baryons: R+G+B; mesons: color+anticolor).",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 8 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowNeutron(false),
                className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!showNeutron ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                "data-ocid": "atoms.proton_tab",
                children: "Proton (uud)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowNeutron(true),
                className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${showNeutron ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                "data-ocid": "atoms.neutron_tab",
                children: "Neutron (udd)"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuarkVisualizer, { isProton: !showNeutron }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: showNeutron ? "Neutron (udd)" : "Proton (uud)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 text-muted-foreground text-xs", children: [
                  ["Mass", showNeutron ? "939.565 MeV/c2" : "938.272 MeV/c2"],
                  ["Charge", showNeutron ? "0" : "+1"],
                  ["Spin", "1/2"],
                  ["Baryon number", "+1"],
                  ["Quarks", showNeutron ? "u + d + d" : "u + u + d"],
                  ["Free half-life", showNeutron ? "611.0 s" : "Stable"]
                ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    label,
                    ":"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: value })
                ] }, label)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EquationBlock,
                {
                  latex: showNeutron ? "n \\to p^+ + e^- + \\bar{\\nu}_e \\quad Q = 0.782\\text{ MeV}" : "m_p = 938.272\\text{ MeV/c}^2 = 1.00728\\text{ u}",
                  annotation: showNeutron ? "Free neutron beta decay: a down quark converts to an up quark via W- emission, yielding a proton, electron, and antineutrino. Q = 0.782 MeV released." : "Proton mass from CODATA 2018. Experimental proton lifetime lower bound: > 10^34 years (Super-Kamiokande).",
                  label: showNeutron ? "Free Neutron Beta Decay" : "Proton Mass"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground bg-muted/20 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Color Charge (QCD)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Quarks carry color: red (R), green (G), or blue (B). The animated spheres cycle R to G to B. Gluons carry two color charges (e.g., R-bar-G). Hadrons must be color-neutral: baryons = R+G+B, mesons = color+anticolor." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ParticleTable,
            {
              particles: quarks,
              title: "Quark Properties (PDG 2022)"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "subatomic-leptons",
        title: "2. Leptons",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "intermediate" }),
        defaultOpen: false,
        "data-ocid": "atoms.leptons_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5", children: [
            "Leptons are fundamental fermions that do not feel the strong force. Six leptons in three generations: three charged (e, mu, tau) and three neutral neutrinos. Each has an associated lepton number conserved in all reactions (except neutrino oscillations, which require non-zero neutrino masses).",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 9 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LeptonGrid, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ParticleTable,
            {
              particles: leptons,
              title: "Lepton Properties (PDG 2022)"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "m_\\\\mu / m_e = 206.768 \\\\qquad m_\\\\tau / m_e = 3477.4",
              annotation: "The muon is 207x heavier than the electron; tau is 3477x heavier. Despite the mass difference, all three charged leptons behave identically under electroweak interactions -- the principle of lepton universality.",
              label: "Lepton Mass Hierarchy"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CollapsibleSection,
      {
        id: "subatomic-bosons",
        title: "3. Force Carriers: Gauge Bosons and Higgs",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
        defaultOpen: false,
        "data-ocid": "atoms.bosons_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5", children: [
            "Forces arise from exchange of gauge bosons: photon (electromagnetism), W/Z (weak force), gluons (strong force). The Higgs is a scalar -- not a force carrier but the quantum of the Higgs field responsible for electroweak symmetry breaking and mass generation.",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 10 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HiggsFieldCanvas, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ParticleTable,
            {
              particles: bosons,
              title: "Boson Properties (PDG 2022)"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "m_W = \\\\tfrac{1}{2}g\\,v \\\\approx 80.4\\\\text{ GeV} \\\\qquad m_Z = \\\\tfrac{v}{2}\\\\sqrt{g^2+g'^2} \\\\approx 91.2\\\\text{ GeV}",
              annotation: "W and Z masses arise from the Higgs vacuum expectation value v = 246 GeV. The ratio m_W/m_Z = cos(theta_W) defines the Weinberg weak mixing angle.",
              label: "Electroweak Symmetry Breaking Masses"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mt-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "subatomic-sm-grid",
            title: "Complete Standard Model: All 17 Fundamental Particles",
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "professional" }),
            defaultOpen: true,
            "data-ocid": "atoms.sm_grid_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3", children: "Fermions -- Matter Particles (Spin 1/2)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-orange-400", children: "Quarks (6)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: quarks.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-lg border border-orange-500/20 bg-orange-500/5 p-2 text-center",
                          "data-ocid": `atoms.quark_${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-mono font-bold text-orange-400", children: q.symbol }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-foreground", children: q.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: q.mass })
                          ]
                        },
                        q.symbol
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-400", children: "Leptons (6)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: leptons.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2 text-center",
                          "data-ocid": `atoms.lepton_full_${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-mono font-bold text-emerald-400", children: l.symbol }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-foreground", children: l.name.split(" ")[0] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: l.mass })
                          ]
                        },
                        l.symbol
                      )) })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3", children: "Bosons -- Force Carriers (Integer Spin)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-2", children: bosons.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `rounded-lg border p-2 text-center ${b.name === "Graviton" ? "border-border/30 bg-muted/5" : b.name === "Higgs" ? "border-purple-500/30 bg-purple-500/5" : "border-yellow-500/20 bg-yellow-500/5"}`,
                      "data-ocid": `atoms.boson_${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-lg font-mono font-bold ${b.color}`, children: b.symbol }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-foreground", children: b.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: b.mass })
                      ]
                    },
                    b.symbol
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CollapsibleSection,
                {
                  id: "subatomic-ckm",
                  title: "CKM Matrix & Quark Mixing",
                  badge: /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "professional" }),
                  defaultOpen: false,
                  "data-ocid": "atoms.ckm_section",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                      "Quarks of definite mass are not the same as those that couple to the W boson. The Cabibbo–Kobayashi–Maskawa (CKM) matrix",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(InlineEquation, { tex: "V_{\\\\text{CKM}}" }),
                      " describes the mismatch between mass eigenstates and weak eigenstates, encoding quark-flavor mixing and CP violation."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "CKM Matrix (PDG 2023 central values)",
                        latex: "V_{\\\\text{CKM}} = \\\\begin{pmatrix} V_{ud} & V_{us} & V_{ub} \\\\\\\\ V_{cd} & V_{cs} & V_{cb} \\\\\\\\ V_{td} & V_{ts} & V_{tb} \\\\end{pmatrix} \\\\approx \\\\begin{pmatrix} 0.974 & 0.225 & 0.004 \\\\\\\\ 0.225 & 0.973 & 0.041 \\\\\\\\ 0.009 & 0.040 & 0.999 \\\\end{pmatrix}",
                        annotation: "Nearly diagonal structure: u↔d (V_ud ≈ 0.974) and c↔s transitions dominate; b→u and b→c transitions are suppressed by |V_ub|² ≪ |V_cb|². CP violation is encoded in the complex phase δ ≈ 1.14 rad."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "QCD Running Coupling (Strong Force)",
                        latex: "\\\\alpha_s(\\\\mu^2) = \\\\frac{12\\\\pi}{(33 - 2n_f)\\\\ln(\\\\mu^2/\\\\Lambda_{\\\\text{QCD}}^2)}",
                        annotation: "The strong coupling constant αs decreases logarithmically with energy scale μ — asymptotic freedom (Gross, Politzer, Wilczek; Nobel 2004). At μ = M_Z (91.2 GeV): αs ≈ 0.118. At μ ≈ 1 GeV: αs ≈ 0.5. Λ_QCD ≈ 200 MeV sets the confinement scale."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      EquationBlock,
                      {
                        label: "Leptonic Weak Neutral Current (Z boson coupling)",
                        latex: "\\\\mathcal{M}_{\\\\text{NC}} \\\\propto \\\\bar{\\\\ell}\\\\gamma^\\\\mu(c_V - c_A\\\\gamma^5)\\\\ell \\\\cdot Z_\\\\mu, \\\\quad c_V = T_3 - 2Q\\\\sin^2\\\\theta_W",
                        annotation: "The Z boson couples to both left- and right-handed fermions via vector (c_V) and axial-vector (c_A = T_3) couplings. θ_W is the Weinberg angle (sin²θ_W ≈ 0.231). Neutrinos couple only via T₃ (purely left-handed)."
                      }
                    )
                  ] })
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  SubatomicParticles as default
};
