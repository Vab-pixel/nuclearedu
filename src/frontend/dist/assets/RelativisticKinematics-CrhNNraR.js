import { r as reactExports, j as jsxRuntimeExports, q as cn, S as SectionCard, H as Input, m as motion, k as Badge, E as EquationBlock, y as katex, B as Button, P as PageHeader, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, ag as Legend, b as Line } from "./index-DWzjlv-D.js";
import { C as CitationMarker } from "./CitationMarker-BPCOmJ02.js";
import { P as Primitive } from "./index-B6f6qJN0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-xXqhovnQ.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bfh6NqBd.js";
import "./index-IXOTxK3N.js";
import "./index-CapERSdy.js";
import "./index-zGfMHkE8.js";
import "./Combination-hSYmt5gN.js";
import "./index-By65kP0U.js";
import "./index-C7eyTHr8.js";
import "./index-LWnW2fZN.js";
import "./chevron-up-YbQoZZQZ.js";
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function InlineMath({ latex }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(latex, ref.current, {
        displayMode: false,
        throwOnError: false
      });
    } catch {
      if (ref.current) ref.current.textContent = latex;
    }
  }, [latex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, "aria-hidden": "true" });
}
function MatrixDisplay({
  label,
  rows,
  unit
}) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm rounded-lg border border-border bg-muted/20 p-4 overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "inline-grid gap-x-4 gap-y-1",
          style: {
            gridTemplateColumns: `repeat(${((_a = rows[0]) == null ? void 0 : _a.length) ?? 1}, auto)`
          },
          children: rows.map(
            (row, ri) => row.map((cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-right tabular-nums ${ri === 0 && rows.length > 1 ? "text-primary font-semibold" : "text-foreground"}`,
                children: cell
              },
              `${ri}-${ci}-${cell}`
            ))
          )
        }
      ),
      unit && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
        "units: ",
        unit
      ] })
    ] })
  ] });
}
function FourMomentumSection() {
  const [energy, setEnergy] = reactExports.useState("938.272");
  const [px, setPx] = reactExports.useState("0");
  const [py, setPy] = reactExports.useState("0");
  const [pz, setPz] = reactExports.useState("0");
  const [betaBoost, setBetaBoost] = reactExports.useState("0.5");
  const E = Number.parseFloat(energy) || 0;
  const Px = Number.parseFloat(px) || 0;
  const Py = Number.parseFloat(py) || 0;
  const Pz = Number.parseFloat(pz) || 0;
  const beta = Math.min(
    0.9999,
    Math.max(-0.9999, Number.parseFloat(betaBoost) || 0)
  );
  const pMag2 = Px * Px + Py * Py + Pz * Pz;
  const m2 = E * E - pMag2;
  const mInvariant = m2 >= 0 ? Math.sqrt(m2) : 0;
  const m2Display = m2.toFixed(4);
  const mInvDisplay = mInvariant.toFixed(4);
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const Ep = gamma * E - gamma * beta * Px;
  const Pxp = -gamma * beta * E + gamma * Px;
  const Pyp = Py;
  const Pzp = Pz;
  const fmt = (v) => {
    if (!Number.isFinite(v)) return "—";
    const a = Math.abs(v);
    if (a === 0) return "0.0000";
    if (a < 1e-3 || a >= 1e6) return v.toExponential(3);
    return v.toFixed(4);
  };
  const fmtMatrix = (v, digits = 4) => Number.isFinite(v) ? v.toFixed(digits) : "—";
  const boostMatrix = [
    [fmtMatrix(gamma), fmtMatrix(-gamma * beta), "0", "0"],
    [fmtMatrix(-gamma * beta), fmtMatrix(gamma), "0", "0"],
    ["0", "0", "1", "0"],
    ["0", "0", "0", "1"]
  ];
  const origVector = [[fmt(E)], [fmt(Px)], [fmt(Py)], [fmt(Pz)]];
  const boostedVector = [
    [fmt(Ep)],
    [fmt(Pxp)],
    [fmt(Pyp)],
    [fmt(Pzp)]
  ];
  const valid = Number.isFinite(E) && E > 0;
  const isMasslike = m2 >= -1e-3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "rkc.fourmom.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Four-Momentum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: [
        "Enter the covariant 4-momentum",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(InlineMath, { latex: "p^\\mu = (E/c,\\, p_x,\\, p_y,\\, p_z)" }),
        " in MeV/c (natural units where c = 1 throughout)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: [
        {
          label: "E (MeV)",
          value: energy,
          set: setEnergy,
          ocid: "rkc.fm_energy.input"
        },
        {
          label: "pₓ (MeV/c)",
          value: px,
          set: setPx,
          ocid: "rkc.fm_px.input"
        },
        {
          label: "pᵧ (MeV/c)",
          value: py,
          set: setPy,
          ocid: "rkc.fm_py.input"
        },
        {
          label: "p_z (MeV/c)",
          value: pz,
          set: setPz,
          ocid: "rkc.fm_pz.input"
        }
      ].map(({ label, value, set, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            step: "0.001",
            value,
            onChange: (e) => set(e.target.value),
            className: "font-mono text-sm",
            "aria-label": label,
            "data-ocid": ocid
          }
        )
      ] }, label)) }),
      valid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "grid grid-cols-1 md:grid-cols-3 gap-4",
          "data-ocid": "rkc.fourmom_result.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixDisplay, { label: "4-vector pᵘ", rows: origVector, unit: "MeV/c" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Invariant Mass" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "m² = E² − |p|²" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-bold text-primary", children: [
                    m2Display,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "MeV²" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "m = √(m²)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-bold text-foreground", children: [
                    mInvDisplay,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "MeV/c²" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: isMasslike ? "default" : "secondary",
                    className: "text-xs",
                    children: isMasslike ? "Timelike / massive" : "Spacelike / tachyonic"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "|p| and rapidity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "|p|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    fmt(Math.sqrt(pMag2)),
                    " MeV/c"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "p_T" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    fmt(Math.sqrt(Px * Px + Py * Py)),
                    " MeV/c"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "rapidity y" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: E + Pz > 0 && E - Pz > 0 ? fmt(0.5 * Math.log((E + Pz) / (E - Pz))) : "—" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "pseudorapidity η" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: (() => {
                    const cosTheta = Pz / (Math.sqrt(pMag2) || 1);
                    const theta = Math.acos(
                      Math.min(1, Math.max(-1, cosTheta))
                    );
                    return theta === 0 || theta === Math.PI ? "—" : fmt(-Math.log(Math.tan(theta / 2)));
                  })() })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "rkc.boost.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Lorentz Boost (x-direction)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "β_boost (−0.9999 … +0.9999)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              step: "0.01",
              min: "-0.9999",
              max: "0.9999",
              value: betaBoost,
              onChange: (e) => setBetaBoost(e.target.value),
              className: "w-40 font-mono text-sm",
              "aria-label": "Boost beta",
              "data-ocid": "rkc.fm_beta_boost.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "γ =",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: gamma.toFixed(5) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "γβ =",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: (gamma * Math.abs(beta)).toFixed(5) })
          ] })
        ] })
      ] }),
      valid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "grid grid-cols-1 lg:grid-cols-3 gap-4 items-start",
          "data-ocid": "rkc.boost_result.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatrixDisplay,
              {
                label: "Boost matrix Λ",
                rows: boostMatrix,
                unit: "dimensionless"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixDisplay, { label: "Input p^μ", rows: origVector, unit: "MeV/c" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatrixDisplay,
              {
                label: "Boosted p'^μ = Λ p^μ",
                rows: boostedVector,
                unit: "MeV/c"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "p^\\mu = \\\\left(\\\\frac{E}{c},\\\\, p_x,\\\\, p_y,\\\\, p_z\\\\right), \\\\quad m^2 c^2 = \\\\frac{E^2}{c^2} - |\\\\mathbf{p}|^2",
          annotation: "Four-momentum. The Lorentz-scalar invariant m²c² equals E²/c² minus the three-momentum squared. Natural units: c = 1.",
          label: "Four-Momentum & Invariant Mass"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "\\\\Lambda^\\\\mu{}_\\\\nu = \\\\begin{pmatrix} \\\\gamma & -\\\\gamma\\\\beta & 0 & 0 \\\\\\\\ -\\\\gamma\\\\beta & \\\\gamma & 0 & 0 \\\\\\\\ 0 & 0 & 1 & 0 \\\\\\\\ 0 & 0 & 0 & 1 \\\\end{pmatrix}",
          annotation: "Lorentz boost matrix in the x-direction. γ = 1/√(1−β²), β = v/c.",
          label: "Lorentz Boost Matrix (x-direction)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "y = \\\\frac{1}{2}\\\\ln\\\\frac{E + p_z}{E - p_z}, \\\\qquad \\\\eta = -\\\\ln\\\\tan\\\\frac{\\\\theta}{2}",
          annotation: "Rapidity y and pseudorapidity η. Both are additive under longitudinal Lorentz boosts. For massless particles y = η.",
          label: "Rapidity & Pseudorapidity"
        }
      )
    ] })
  ] });
}
const PARTICLE_MASSES = {
  electron: {
    symbol: "e⁻",
    name: "Electron",
    mass: 0.51099895,
    spin: "1/2",
    charge: "−1"
  },
  muon: {
    symbol: "μ⁻",
    name: "Muon",
    mass: 105.6583755,
    spin: "1/2",
    charge: "−1"
  },
  pion0: {
    symbol: "π⁰",
    name: "Pion (neutral)",
    mass: 134.9768,
    spin: "0",
    charge: "0"
  },
  pionPM: {
    symbol: "π±",
    name: "Pion (charged)",
    mass: 139.57039,
    spin: "0",
    charge: "±1"
  },
  kaon: {
    symbol: "K±",
    name: "Kaon (charged)",
    mass: 493.677,
    spin: "0",
    charge: "±1"
  },
  proton: {
    symbol: "p",
    name: "Proton",
    mass: 938.27208816,
    spin: "1/2",
    charge: "+1"
  },
  neutron: {
    symbol: "n",
    name: "Neutron",
    mass: 939.56542052,
    spin: "1/2",
    charge: "0"
  },
  deuteron: {
    symbol: "d",
    name: "Deuteron",
    mass: 1875.61294,
    spin: "1",
    charge: "+1"
  },
  alpha: {
    symbol: "α",
    name: "Alpha (⁴He nucleus)",
    mass: 3727.3794,
    spin: "0",
    charge: "+2"
  },
  carbon12: {
    symbol: "¹²C",
    name: "Carbon-12 nucleus",
    mass: 11177.929,
    spin: "0",
    charge: "+6"
  }
};
function computeRelProps(m0, T) {
  const E = T + m0;
  const p = Math.sqrt(Math.max(0, E * E - m0 * m0));
  const gamma = m0 > 0 ? E / m0 : 1;
  const beta = m0 > 0 ? Math.sqrt(1 - 1 / (gamma * gamma)) : 1;
  return { E, p, gamma, beta };
}
function formatSci(val, digits = 6) {
  if (!Number.isFinite(val)) return "—";
  if (val < 1e6) return val.toFixed(digits);
  return val.toExponential(3);
}
const AMU_TO_MEV = 931.494102;
function parseParticleInput(inputs) {
  return inputs.map((p) => {
    const v = Number.parseFloat(p.massAMU);
    return Number.isNaN(v) ? 0 : v;
  });
}
const EMPTY_PARTICLE = () => ({ symbol: "", massAMU: "" });
function ParticleRow({
  index,
  particle,
  onChange,
  onRemove,
  canRemove,
  side
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Symbol (e.g. p, n, 4He)",
        value: particle.symbol,
        onChange: (e) => onChange({ ...particle, symbol: e.target.value }),
        className: "flex-1 min-w-0",
        "aria-label": `${side} particle ${index + 1} symbol`,
        "data-ocid": `rkc.qv_${side}_symbol.${index + 1}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Mass (AMU)",
        type: "number",
        step: "0.000001",
        value: particle.massAMU,
        onChange: (e) => onChange({ ...particle, massAMU: e.target.value }),
        className: "w-36 shrink-0",
        "aria-label": `${side} particle ${index + 1} mass`,
        "data-ocid": `rkc.qv_${side}_mass.${index + 1}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        onClick: onRemove,
        disabled: !canRemove,
        "aria-label": `Remove ${side} particle ${index + 1}`,
        className: "shrink-0 text-muted-foreground hover:text-destructive",
        children: "X"
      }
    )
  ] });
}
function QValueSection() {
  const [initial, setInitial] = reactExports.useState([
    { symbol: "p", massAMU: "1.007276" },
    { symbol: "n", massAMU: "1.008665" }
  ]);
  const [final, setFinal] = reactExports.useState([
    { symbol: "d", massAMU: "2.013553" },
    { symbol: "g", massAMU: "0" }
  ]);
  const updateParticle = (side, i, p) => {
    const setter = side === "initial" ? setInitial : setFinal;
    setter((prev) => prev.map((x, idx) => idx === i ? p : x));
  };
  const addParticle = (side) => {
    const setter = side === "initial" ? setInitial : setFinal;
    setter((prev) => prev.length < 4 ? [...prev, EMPTY_PARTICLE()] : prev);
  };
  const removeParticle = (side, i) => {
    const setter = side === "initial" ? setInitial : setFinal;
    setter(
      (prev) => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev
    );
  };
  const initialMasses = parseParticleInput(initial);
  const finalMasses = parseParticleInput(final);
  const sumInitial = initialMasses.reduce((a, b) => a + b, 0);
  const sumFinal = finalMasses.reduce((a, b) => a + b, 0);
  const Q_AMU = sumInitial - sumFinal;
  const Q_MeV = Q_AMU * AMU_TO_MEV;
  const isExothermic = Q_MeV > 0;
  const valid = sumInitial > 0 && sumFinal > 0;
  const m_target = finalMasses[0] || 1;
  const Eth = valid && !isExothermic ? Math.abs(Q_MeV) * (sumInitial + sumFinal) * AMU_TO_MEV / (2 * m_target * AMU_TO_MEV) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "rkc.qvalue.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Q-Value Calculator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: ["initial", "final"].map((side) => {
        const particles = side === "initial" ? initial : final;
        const masses = side === "initial" ? sumInitial : sumFinal;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold capitalize", children: [
            side,
            " State Particles"
          ] }),
          particles.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ParticleRow,
            {
              index: i,
              particle: p,
              onChange: (np) => updateParticle(side, i, np),
              onRemove: () => removeParticle(side, i),
              canRemove: particles.length > 1,
              side
            },
            `particle-${side}-${i}-${p.symbol}`
          )),
          particles.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => addParticle(side),
              "data-ocid": `rkc.qv_add_${side}.button`,
              className: "w-full text-xs",
              children: "+ Add particle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-mono", children: [
            "Total mass = ",
            masses.toFixed(6),
            " AMU =",
            " ",
            (masses * AMU_TO_MEV).toFixed(3),
            " MeV"
          ] })
        ] }, side);
      }) }),
      valid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          className: "mt-6 rounded-xl border border-border bg-muted/30 p-5 space-y-4",
          "data-ocid": "rkc.qvalue_result.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-display text-3xl font-bold",
                  style: {
                    color: isExothermic ? "var(--primary)" : "#f97316"
                  },
                  children: [
                    "Q = ",
                    Q_MeV.toFixed(4),
                    " MeV"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: isExothermic ? "default" : "secondary",
                  className: "text-sm",
                  children: isExothermic ? "Exothermic - energy released" : "Endothermic - energy required"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground font-mono", children: [
              "delta-M = ",
              Q_AMU.toFixed(8),
              " AMU (1 AMU = ",
              AMU_TO_MEV.toFixed(4),
              " ",
              "MeV)"
            ] }),
            !isExothermic && Eth > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 border border-border p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Threshold kinetic energy (lab frame)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono text-foreground", children: [
                "T_threshold =",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
                  Eth.toFixed(3),
                  " MeV"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Minimum projectile KE to initiate this endothermic reaction in the lab frame." })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "Q = \\\\left(\\\\sum_i M_i - \\\\sum_f M_f\\\\right)c^2 = \\\\Delta M \\\\cdot 931.494\\\\;\\\\text{MeV/AMU}",
          annotation: "Q > 0: energy released (exothermic). Q < 0: energy required (endothermic). Masses in AMU.",
          label: "Q-Value Definition"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "T_{\\\\mathrm{th}} = |Q|\\\\,\\\\frac{\\\\sum M_i + \\\\sum M_f}{2\\\\, M_{\\\\mathrm{target}}}",
          annotation: "Threshold kinetic energy in the lab frame for an endothermic reaction on a stationary target.",
          label: "Threshold Energy (Lab Frame)"
        }
      )
    ] })
  ] });
}
const C_HBAR_MEV_FM = 197.3269804;
function deBooglieWavelength(p_MeV) {
  if (p_MeV <= 0) return 0;
  return 2 * Math.PI * C_HBAR_MEV_FM / p_MeV;
}
function rapidity(E, p) {
  if (p <= 0 || E <= p) return 0;
  return 0.5 * Math.log((E + p) / (E - p));
}
function StatRow({
  label,
  value,
  unit,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between py-1.5 border-b border-border/50 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `font-mono text-sm ${highlight ? "text-primary font-semibold" : "text-foreground"}`,
        children: [
          value,
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: unit })
        ]
      }
    )
  ] });
}
function SingleParticleTab() {
  const [selectedKey, setSelectedKey] = reactExports.useState("proton");
  const [kineticEnergy, setKineticEnergy] = reactExports.useState("100");
  const particle = PARTICLE_MASSES[selectedKey];
  const m0 = particle.mass;
  const T = Math.max(0, Number.parseFloat(kineticEnergy) || 0);
  const rel = reactExports.useMemo(() => computeRelProps(m0, T), [m0, T]);
  const wavelength_fm = deBooglieWavelength(rel.p);
  const E_nr = m0 + T;
  const p_nr = Math.sqrt(2 * m0 * T);
  const gamma_nr = 1 + T / m0;
  const beta_nr = Math.sqrt(2 * T / m0);
  const relNRDiff = (relVal, nrVal) => {
    if (nrVal === 0) return "N/A";
    return `${((relVal - nrVal) / nrVal * 100).toFixed(2)}%`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "rkc.single.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Single Particle Kinematics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Particle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedKey,
              onValueChange: (v) => setSelectedKey(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-full",
                    "data-ocid": "rkc.particle_select.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select particle" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(PARTICLE_MASSES).map((key) => {
                  const p = PARTICLE_MASSES[key];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: p.symbol }),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: p.name })
                  ] }, key);
                }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Kinetic Energy T (MeV)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              step: "1",
              min: "0",
              value: kineticEnergy,
              onChange: (e) => setKineticEnergy(e.target.value),
              className: "font-mono",
              "aria-label": "Kinetic energy in MeV",
              "data-ocid": "rkc.kinetic_energy.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-xs", children: [
          "m₀ = ",
          formatSci(m0, 4),
          " MeV/c²"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-xs", children: [
          "spin ",
          particle.spin
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-xs", children: [
          "charge ",
          particle.charge
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: rel.beta > 0.9 ? "default" : "secondary",
            className: "text-xs",
            children: rel.beta > 0.9 ? "Ultra-relativistic" : rel.beta > 0.1 ? "Mildly relativistic" : "Non-relativistic"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
          "data-ocid": "rkc.single_result.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-3", children: "Relativistic" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Rest mass E₀ = m₀c²",
                  value: formatSci(m0, 4),
                  unit: "MeV"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Total energy E = T + m₀c²",
                  value: formatSci(rel.E, 4),
                  unit: "MeV",
                  highlight: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Momentum |p|",
                  value: formatSci(rel.p, 4),
                  unit: "MeV/c"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Lorentz γ",
                  value: rel.gamma.toFixed(5),
                  highlight: rel.gamma > 2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "β = v/c", value: rel.beta.toFixed(6) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Rapidity y",
                  value: rapidity(rel.E, rel.p).toFixed(5)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "de Broglie λ",
                  value: wavelength_fm.toFixed(4),
                  unit: "fm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Classical (NR)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "Rest mass", value: formatSci(m0, 4), unit: "MeV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Total energy (NR)",
                  value: formatSci(E_nr, 4),
                  unit: "MeV"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatRow,
                {
                  label: "Momentum (NR)",
                  value: formatSci(p_nr, 4),
                  unit: "MeV/c"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "γ (NR)≈ 1 + T/m₀c²", value: gamma_nr.toFixed(5) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "β (NR) = √(2T/m₀c²)", value: beta_nr.toFixed(6) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: "Rel vs NR error (Δ/NR)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "δE / E_NR", value: relNRDiff(rel.E, E_nr) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "δp / p_NR", value: relNRDiff(rel.p, p_nr) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatRow, { label: "δβ / β_NR", value: relNRDiff(rel.beta, beta_nr) })
            ] })
          ]
        },
        selectedKey + kineticEnergy
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "E = \\\\gamma m_0 c^2 = T + m_0 c^2, \\\\quad p = \\\\gamma m_0 v, \\\\quad \\\\gamma = \\\\frac{1}{\\\\sqrt{1-\\\\beta^2}}",
          annotation: "Einstein relation: total energy equals kinetic energy plus rest mass energy. Momentum p = γm₀v. Lorentz factor γ diverges as v → c.",
          label: "Relativistic Energy & Momentum"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "E^2 = (pc)^2 + (m_0 c^2)^2, \\\\quad \\\\lambda = \\\\frac{h}{p} = \\\\frac{2\\\\pi\\\\hbar c}{pc}",
          annotation: "Energy-momentum relation (dispersion relation). de Broglie wavelength in natural units: 2πħc = 1239.8 MeV·fm.",
          label: "Dispersion Relation & de Broglie Wavelength"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "P^\\mu = \\left(\\frac{E}{c},\\, \\vec{p}\\right) \\qquad P^\\mu P_\\mu = (m_0 c)^2",
          annotation: "Four-momentum P^μ in natural units. The Lorentz-invariant norm equals the rest mass squared. In natural units (c = 1): P^μ = (E, p⃗), invariant mass m² = E² − |p|².",
          label: "Four-Momentum & Lorentz Invariant"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "s = (p_1 + p_2)^2 = m_1^2 + m_2^2 + 2(E_1 E_2 - \\vec{p}_1\\cdot\\vec{p}_2)",
          annotation: "Mandelstam variable s: square of total four-momentum in the CM frame. √s = centre-of-mass energy. For a fixed-target experiment: s = m₁²c⁴ + m₂²c⁴ + 2m₂c²E₁.",
          label: "Mandelstam Variable s (CM Energy Squared)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "t = (p_1 - p_3)^2, \\quad u = (p_1 - p_4)^2 \\qquad s + t + u = \\sum_i m_i^2",
          annotation: "Mandelstam variables t (momentum transfer) and u (crossed channel). The constraint s + t + u = Σm_i² holds for 2→2 scattering. t is directly related to scattering angle.",
          label: "Mandelstam Variables t and u"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EquationBlock,
        {
          latex: "E_{\\mathrm{th}} = \\frac{\\left(\\sum_i m_i^{\\text{(f)}}\\right)^2 - \\left(m_1^2 + m_2^2\\right)}{2\\,m_2}\\,c^2",
          annotation: "Threshold kinetic energy for a reaction in a fixed-target frame. Σm_i(f) is the sum of final-state masses. E_th is the minimum lab-frame kinetic energy to produce the reaction.",
          label: "Threshold Energy (Fixed-Target)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
        "Source: PDG Review of Particle Physics ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 1 })
      ] })
    ] })
  ] });
}
function GammaBetaChart() {
  const points = reactExports.useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 300; i++) {
      const logT = -2 + i / 300 * 5;
      const T_ratio = 10 ** logT;
      const gamma = 1 + T_ratio;
      const beta = Math.sqrt(1 - 1 / (gamma * gamma));
      arr.push({ logT, T_ratio, gamma, beta });
    }
    return arr;
  }, []);
  const tickFormatter = (v) => {
    const t = 10 ** v;
    if (t < 0.1) return t.toFixed(3);
    if (t < 10) return t.toFixed(2);
    return t.toFixed(0);
  };
  const CustomTooltipContent = ({
    active,
    payload
  }) => {
    var _a, _b;
    if (!active || !(payload == null ? void 0 : payload.length)) return null;
    const logT = (_b = (_a = payload[0]) == null ? void 0 : _a.payload) == null ? void 0 : _b.logT;
    const T_ratio = 10 ** logT;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card px-3 py-2 text-xs font-mono shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-1", children: [
        "T/m₀c² = ",
        T_ratio.toExponential(2)
      ] }),
      payload.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: p.color }, children: [
        p.name,
        " = ",
        p.value.toFixed(5)
      ] }, p.name))
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "rkc.gamma_beta_chart.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "γ and β vs Kinetic Energy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Log-scale x-axis: T/m₀c². Non-relativistic regime (T ≪ m₀c²) on the left; ultra-relativistic (β → 1) on the right." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-full",
          style: { height: 380 },
          "data-ocid": "rkc.gamma_beta.chart",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            LineChart,
            {
              data: points,
              margin: { top: 8, right: 20, bottom: 30, left: 10 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "rgba(var(--border)/0.3)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "logT",
                    type: "number",
                    domain: [-2, 3],
                    tickFormatter,
                    label: {
                      value: "T / m₀c² (log scale)",
                      position: "insideBottom",
                      offset: -16,
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))"
                    },
                    tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    domain: [0, "auto"],
                    tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltipContent, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    wrapperStyle: {
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "gamma",
                    name: "γ (Lorentz factor)",
                    stroke: "hsl(var(--primary))",
                    dot: false,
                    strokeWidth: 2
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "beta",
                    name: "β = v/c",
                    stroke: "#22d3ee",
                    dot: false,
                    strokeWidth: 2
                  }
                )
              ]
            }
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-3", children: "Common Particle Masses (PDG 2022)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-sm",
          "data-ocid": "rkc.particles_table.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs uppercase tracking-widest text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4", children: "Particle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4", children: "Symbol" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4", children: "Mass (MeV/c²)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2 pr-4", children: "Spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2", children: "Charge" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Object.values(
              PARTICLE_MASSES
            ).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
                "data-ocid": `rkc.particles_table.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-foreground", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 font-mono text-primary", children: p.symbol }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-right font-mono tabular-nums", children: p.mass.toFixed(5) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-center font-mono", children: p.spin }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center font-mono", children: p.charge })
                ]
              },
              p.name
            )) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
        "Data: Particle Data Group ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 1 })
      ] })
    ] })
  ] });
}
function RelativisticKinematics() {
  const [activeTab, setActiveTab] = reactExports.useState("single");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Relativistic Kinematics Calculator",
        subtitle: "Compute relativistic observables (E, p, γ, β, rapidity, λ) for any particle. Q-value of nuclear reactions, four-momentum boosts, and γ–β curves in a single tool.",
        audienceLevel: "advanced",
        readTimeMin: 8
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "w-full",
        "data-ocid": "rkc.tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "mb-6 flex flex-wrap gap-1 h-auto bg-muted/30 p-1 rounded-xl", children: [
            { value: "single", label: "Single Particle" },
            { value: "qvalue", label: "Q-Value" },
            { value: "fourmom", label: "Four-Momentum" },
            { value: "chart", label: "γ–β Chart" }
          ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: tab.value,
              className: "px-4 py-2 text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
              "data-ocid": `rkc.tab.${tab.value}`,
              children: tab.label
            },
            tab.value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "single", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SingleParticleTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "qvalue", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QValueSection, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "fourmom", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FourMomentumSection, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chart", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GammaBetaChart, {}) })
        ]
      }
    )
  ] });
}
export {
  RelativisticKinematics as default
};
