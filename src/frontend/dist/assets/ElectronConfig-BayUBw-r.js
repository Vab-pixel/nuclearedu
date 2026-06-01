import { r as reactExports, j as jsxRuntimeExports, m as motion, P as PageHeader, S as SectionCard, A as AudienceBadge, E as EquationBlock, c as AnimatePresence } from "./index-DWzjlv-D.js";
import { C as CitationMarker } from "./CitationMarker-BPCOmJ02.js";
import { C as CollapsibleSection } from "./CollapsibleSection-QQsEekCS.js";
const AUFBAU_ORDER = [
  "1s",
  "2s",
  "2p",
  "3s",
  "3p",
  "4s",
  "3d",
  "4p",
  "5s",
  "4d",
  "5p",
  "6s",
  "4f",
  "5d",
  "6p",
  "7s",
  "5f",
  "6d",
  "7p"
];
const CAPACITY = { s: 2, p: 6, d: 10, f: 14 };
const BLOCK_COLORS = {
  s: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/40"
  },
  p: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/40"
  },
  d: {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    border: "border-orange-500/40"
  },
  f: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/40"
  }
};
const EXCEPTIONS = {
  24: "[Ar] 3d⁵ 4s¹ (Cr — half-filled d is extra stable)",
  29: "[Ar] 3d¹⁰ 4s¹ (Cu — fully-filled d is extra stable)",
  41: "[Kr] 4d⁴ 5s¹ (Nb)",
  42: "[Kr] 4d⁵ 5s¹ (Mo)",
  44: "[Kr] 4d⁷ 5s¹ (Ru)",
  45: "[Kr] 4d⁸ 5s¹ (Rh)",
  46: "[Kr] 4d¹⁰ (Pd)",
  47: "[Kr] 4d¹⁰ 5s¹ (Ag)",
  57: "[Xe] 5d¹ 6s² (La)",
  78: "[Xe] 4f¹⁴ 5d⁹ 6s¹ (Pt)",
  79: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹ (Au)"
};
const NOBLE_GAS_CORES = {
  2: "[He]",
  10: "[Ne]",
  18: "[Ar]",
  36: "[Kr]",
  54: "[Xe]",
  86: "[Rn]"
};
const ELEMENTS = [
  { Z: 1, sym: "H", period: 1, group: 1, block: "s" },
  { Z: 2, sym: "He", period: 1, group: 18, block: "s" },
  { Z: 3, sym: "Li", period: 2, group: 1, block: "s" },
  { Z: 4, sym: "Be", period: 2, group: 2, block: "s" },
  { Z: 5, sym: "B", period: 2, group: 13, block: "p" },
  { Z: 6, sym: "C", period: 2, group: 14, block: "p" },
  { Z: 7, sym: "N", period: 2, group: 15, block: "p" },
  { Z: 8, sym: "O", period: 2, group: 16, block: "p" },
  { Z: 9, sym: "F", period: 2, group: 17, block: "p" },
  { Z: 10, sym: "Ne", period: 2, group: 18, block: "p" },
  { Z: 11, sym: "Na", period: 3, group: 1, block: "s" },
  { Z: 12, sym: "Mg", period: 3, group: 2, block: "s" },
  { Z: 13, sym: "Al", period: 3, group: 13, block: "p" },
  { Z: 14, sym: "Si", period: 3, group: 14, block: "p" },
  { Z: 15, sym: "P", period: 3, group: 15, block: "p" },
  { Z: 16, sym: "S", period: 3, group: 16, block: "p" },
  { Z: 17, sym: "Cl", period: 3, group: 17, block: "p" },
  { Z: 18, sym: "Ar", period: 3, group: 18, block: "p" },
  { Z: 19, sym: "K", period: 4, group: 1, block: "s" },
  { Z: 20, sym: "Ca", period: 4, group: 2, block: "s" },
  { Z: 21, sym: "Sc", period: 4, group: 3, block: "d" },
  { Z: 22, sym: "Ti", period: 4, group: 4, block: "d" },
  { Z: 23, sym: "V", period: 4, group: 5, block: "d" },
  { Z: 24, sym: "Cr", period: 4, group: 6, block: "d" },
  { Z: 25, sym: "Mn", period: 4, group: 7, block: "d" },
  { Z: 26, sym: "Fe", period: 4, group: 8, block: "d" },
  { Z: 27, sym: "Co", period: 4, group: 9, block: "d" },
  { Z: 28, sym: "Ni", period: 4, group: 10, block: "d" },
  { Z: 29, sym: "Cu", period: 4, group: 11, block: "d" },
  { Z: 30, sym: "Zn", period: 4, group: 12, block: "d" },
  { Z: 31, sym: "Ga", period: 4, group: 13, block: "p" },
  { Z: 32, sym: "Ge", period: 4, group: 14, block: "p" },
  { Z: 33, sym: "As", period: 4, group: 15, block: "p" },
  { Z: 34, sym: "Se", period: 4, group: 16, block: "p" },
  { Z: 35, sym: "Br", period: 4, group: 17, block: "p" },
  { Z: 36, sym: "Kr", period: 4, group: 18, block: "p" },
  { Z: 37, sym: "Rb", period: 5, group: 1, block: "s" },
  { Z: 38, sym: "Sr", period: 5, group: 2, block: "s" },
  { Z: 39, sym: "Y", period: 5, group: 3, block: "d" },
  { Z: 40, sym: "Zr", period: 5, group: 4, block: "d" },
  { Z: 41, sym: "Nb", period: 5, group: 5, block: "d" },
  { Z: 42, sym: "Mo", period: 5, group: 6, block: "d" },
  { Z: 43, sym: "Tc", period: 5, group: 7, block: "d" },
  { Z: 44, sym: "Ru", period: 5, group: 8, block: "d" },
  { Z: 45, sym: "Rh", period: 5, group: 9, block: "d" },
  { Z: 46, sym: "Pd", period: 5, group: 10, block: "d" },
  { Z: 47, sym: "Ag", period: 5, group: 11, block: "d" },
  { Z: 48, sym: "Cd", period: 5, group: 12, block: "d" },
  { Z: 49, sym: "In", period: 5, group: 13, block: "p" },
  { Z: 50, sym: "Sn", period: 5, group: 14, block: "p" },
  { Z: 51, sym: "Sb", period: 5, group: 15, block: "p" },
  { Z: 52, sym: "Te", period: 5, group: 16, block: "p" },
  { Z: 53, sym: "I", period: 5, group: 17, block: "p" },
  { Z: 54, sym: "Xe", period: 5, group: 18, block: "p" },
  { Z: 55, sym: "Cs", period: 6, group: 1, block: "s" },
  { Z: 56, sym: "Ba", period: 6, group: 2, block: "s" },
  { Z: 57, sym: "La", period: 6, group: 3, block: "f" },
  { Z: 58, sym: "Ce", period: 6, group: 4, block: "f" },
  { Z: 59, sym: "Pr", period: 6, group: 5, block: "f" },
  { Z: 60, sym: "Nd", period: 6, group: 6, block: "f" },
  { Z: 61, sym: "Pm", period: 6, group: 7, block: "f" },
  { Z: 62, sym: "Sm", period: 6, group: 8, block: "f" },
  { Z: 63, sym: "Eu", period: 6, group: 9, block: "f" },
  { Z: 64, sym: "Gd", period: 6, group: 10, block: "f" },
  { Z: 65, sym: "Tb", period: 6, group: 11, block: "f" },
  { Z: 66, sym: "Dy", period: 6, group: 12, block: "f" },
  { Z: 67, sym: "Ho", period: 6, group: 13, block: "f" },
  { Z: 68, sym: "Er", period: 6, group: 14, block: "f" },
  { Z: 69, sym: "Tm", period: 6, group: 15, block: "f" },
  { Z: 70, sym: "Yb", period: 6, group: 16, block: "f" },
  { Z: 71, sym: "Lu", period: 6, group: 17, block: "d" },
  { Z: 72, sym: "Hf", period: 6, group: 4, block: "d" },
  { Z: 73, sym: "Ta", period: 6, group: 5, block: "d" },
  { Z: 74, sym: "W", period: 6, group: 6, block: "d" },
  { Z: 75, sym: "Re", period: 6, group: 7, block: "d" },
  { Z: 76, sym: "Os", period: 6, group: 8, block: "d" },
  { Z: 77, sym: "Ir", period: 6, group: 9, block: "d" },
  { Z: 78, sym: "Pt", period: 6, group: 10, block: "d" },
  { Z: 79, sym: "Au", period: 6, group: 11, block: "d" },
  { Z: 80, sym: "Hg", period: 6, group: 12, block: "d" },
  { Z: 81, sym: "Tl", period: 6, group: 13, block: "p" },
  { Z: 82, sym: "Pb", period: 6, group: 14, block: "p" },
  { Z: 83, sym: "Bi", period: 6, group: 15, block: "p" },
  { Z: 84, sym: "Po", period: 6, group: 16, block: "p" },
  { Z: 85, sym: "At", period: 6, group: 17, block: "p" },
  { Z: 86, sym: "Rn", period: 6, group: 18, block: "p" },
  { Z: 87, sym: "Fr", period: 7, group: 1, block: "s" },
  { Z: 88, sym: "Ra", period: 7, group: 2, block: "s" },
  { Z: 89, sym: "Ac", period: 7, group: 3, block: "f" },
  { Z: 90, sym: "Th", period: 7, group: 4, block: "f" },
  { Z: 91, sym: "Pa", period: 7, group: 5, block: "f" },
  { Z: 92, sym: "U", period: 7, group: 6, block: "f" },
  { Z: 93, sym: "Np", period: 7, group: 7, block: "f" },
  { Z: 94, sym: "Pu", period: 7, group: 8, block: "f" },
  { Z: 95, sym: "Am", period: 7, group: 9, block: "f" },
  { Z: 96, sym: "Cm", period: 7, group: 10, block: "f" },
  { Z: 97, sym: "Bk", period: 7, group: 11, block: "f" },
  { Z: 98, sym: "Cf", period: 7, group: 12, block: "f" },
  { Z: 99, sym: "Es", period: 7, group: 13, block: "f" },
  { Z: 100, sym: "Fm", period: 7, group: 14, block: "f" },
  { Z: 101, sym: "Md", period: 7, group: 15, block: "f" },
  { Z: 102, sym: "No", period: 7, group: 16, block: "f" },
  { Z: 103, sym: "Lr", period: 7, group: 17, block: "d" },
  { Z: 104, sym: "Rf", period: 7, group: 4, block: "d" },
  { Z: 105, sym: "Db", period: 7, group: 5, block: "d" },
  { Z: 106, sym: "Sg", period: 7, group: 6, block: "d" },
  { Z: 107, sym: "Bh", period: 7, group: 7, block: "d" },
  { Z: 108, sym: "Hs", period: 7, group: 8, block: "d" },
  { Z: 109, sym: "Mt", period: 7, group: 9, block: "d" },
  { Z: 110, sym: "Ds", period: 7, group: 10, block: "d" },
  { Z: 111, sym: "Rg", period: 7, group: 11, block: "d" },
  { Z: 112, sym: "Cn", period: 7, group: 12, block: "d" },
  { Z: 113, sym: "Nh", period: 7, group: 13, block: "p" },
  { Z: 114, sym: "Fl", period: 7, group: 14, block: "p" },
  { Z: 115, sym: "Mc", period: 7, group: 15, block: "p" },
  { Z: 116, sym: "Lv", period: 7, group: 16, block: "p" },
  { Z: 117, sym: "Ts", period: 7, group: 17, block: "p" },
  { Z: 118, sym: "Og", period: 7, group: 18, block: "p" }
];
function buildConfig(Z) {
  if (EXCEPTIONS[Z]) return [];
  const result = [];
  let remaining = Z;
  for (const orb of AUFBAU_ORDER) {
    if (remaining <= 0) break;
    const blockType = orb.slice(-1);
    const cap = CAPACITY[blockType];
    const fill = Math.min(remaining, cap);
    result.push({ orbital: orb, electrons: fill, block: blockType });
    remaining -= fill;
  }
  return result;
}
function formatConfig(config) {
  return config.map((c) => `${c.orbital}${superscript(c.electrons)}`).join(" ");
}
function withNobleGasCore(config, Z) {
  const coreZ = [86, 54, 36, 18, 10, 2].find((nZ) => nZ < Z);
  if (!coreZ) return formatConfig(config);
  const core = buildConfig(coreZ);
  const remaining = config.slice(core.length);
  return `${NOBLE_GAS_CORES[coreZ]} ${formatConfig(remaining)}`;
}
function superscript(n) {
  const sup = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹"
  };
  return String(n).split("").map((d) => sup[d] ?? d).join("");
}
function buildBoxNotation(config) {
  return config.map((c) => {
    const cap = CAPACITY[c.block];
    const half = cap / 2;
    const slots = [];
    for (let i = 0; i < half; i++) {
      if (i < c.electrons) slots.push("up");
      else slots.push("empty");
    }
    for (let i = 0; i < half; i++) {
      const paired = c.electrons - half;
      if (i < paired) slots.push("down");
      else slots.push("empty");
    }
    return { label: c.orbital, slots, block: c.block };
  });
}
function SpinArrow({ spin }) {
  if (spin === "empty")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/20 text-base", children: "−" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      initial: { opacity: 0, y: spin === "up" ? 6 : -6 },
      animate: { opacity: 1, y: 0 },
      className: `text-base font-bold ${spin === "up" ? "text-blue-400" : "text-orange-400"}`,
      children: spin === "up" ? "↑" : "↓"
    }
  );
}
function OrbitalBox({
  box,
  animStep,
  idx
}) {
  const colors = BLOCK_COLORS[box.block];
  const half = box.slots.length / 2;
  const groups = [];
  for (let i = 0; i < half; i++)
    groups.push([box.slots[i], box.slots[i + half]]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded border ${colors.border} ${colors.bg} px-2 py-1 flex flex-col items-center gap-0.5`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: groups.map((pair, gi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "border border-border/40 rounded px-1 py-0.5 flex flex-col items-center",
            style: { minWidth: 22 },
            children: pair.map((spin, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: idx <= animStep ? /* @__PURE__ */ jsxRuntimeExports.jsx(SpinArrow, { spin }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/10 text-base", children: "−" }) }, `s-${si}-${spin}`))
          },
          `g-${gi}-${box.label}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-mono ${colors.text}`, children: box.label })
      ]
    }
  );
}
function MiniPeriodicTable({
  selected,
  onSelect
}) {
  const maxGroup = 18;
  const maxPeriod = 7;
  const grid = {};
  for (const el of ELEMENTS) {
    grid[`${el.period}-${el.group}`] = el;
  }
  const fRow = ELEMENTS.filter((e) => e.block === "f" && e.period === 6);
  const aRow = ELEMENTS.filter((e) => e.block === "f" && e.period === 7);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${maxGroup}, minmax(28px,1fr))`,
          gap: 2,
          minWidth: 560
        },
        children: Array.from(
          { length: maxPeriod },
          (_, pi) => Array.from({ length: maxGroup }, (_2, gi) => {
            const el = grid[`${pi + 1}-${gi + 1}`];
            if (el && el.block === "f")
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `cell-f-${pi}-${gi}`);
            if (!el) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `cell-empty-${pi}-${gi}`);
            const colors = BLOCK_COLORS[el.block];
            const isSel = el.Z === selected;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `electron_config.element_btn.${el.Z}`,
                onClick: () => onSelect(el.Z),
                title: `Z=${el.Z} ${el.sym}`,
                className: `rounded text-center transition-all duration-150 cursor-pointer ${isSel ? `${colors.bg} ring-2 ring-offset-1 ring-offset-card ${colors.text}` : `${colors.bg} ${colors.text} opacity-70 hover:opacity-100`}`,
                style: { padding: "2px 0", fontSize: 9 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold", children: el.sym }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-muted-foreground",
                      style: { fontSize: 8 },
                      children: el.Z
                    }
                  )
                ]
              },
              el.Z
            );
          })
        ).flat()
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground pl-1", children: "Lanthanides / Actinides:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: [fRow, aRow].map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          marginBottom: 4
        },
        children: row.map((el) => {
          const isSel = el.Z === selected;
          const colors = BLOCK_COLORS.f;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `electron_config.element_btn.${el.Z}`,
              onClick: () => onSelect(el.Z),
              title: `Z=${el.Z} ${el.sym}`,
              className: `rounded text-center transition-all duration-150 cursor-pointer ${isSel ? `${colors.bg} ring-2 ring-offset-1 ring-offset-card ${colors.text}` : `${colors.bg} ${colors.text} opacity-70 hover:opacity-100`}`,
              style: { padding: "2px 4px", fontSize: 9, minWidth: 28 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold", children: el.sym }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-muted-foreground",
                    style: { fontSize: 8 },
                    children: el.Z
                  }
                )
              ]
            },
            el.Z
          );
        })
      },
      ri === 0 ? "lanthanides" : "actinides"
    )) })
  ] });
}
function AufbauBuilder() {
  const [filledElectrons, setFilledElectrons] = reactExports.useState(0);
  const [targetZ, setTargetZ] = reactExports.useState(26);
  const [animating, setAnimating] = reactExports.useState(false);
  const maxElectrons = 36;
  const getConfigUpTo = (electrons) => {
    const result = [];
    let remaining = electrons;
    for (const orb of AUFBAU_ORDER) {
      if (remaining <= 0) break;
      const blockType = orb.slice(-1);
      const cap = CAPACITY[blockType];
      const fill = Math.min(remaining, cap);
      result.push({ orbital: orb, electrons: fill, block: blockType });
      remaining -= fill;
    }
    return result;
  };
  const currentConfig = getConfigUpTo(filledElectrons);
  const boxNotation = buildBoxNotation(currentConfig);
  const configString = formatConfig(currentConfig);
  const handleFillNext = () => {
    if (filledElectrons >= maxElectrons) return;
    setFilledElectrons((prev) => Math.min(prev + 1, maxElectrons));
  };
  const handleReset = () => {
    setFilledElectrons(0);
    setAnimating(false);
  };
  const handleAutoFill = () => {
    setAnimating(true);
    let e = 0;
    const interval = setInterval(() => {
      e++;
      setFilledElectrons(e);
      if (e >= targetZ) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 120);
  };
  const handleElementSelect = (Z) => {
    setTargetZ(Z);
    setFilledElectrons(Z);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Auto-fill to element:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: targetZ,
          onChange: (e) => handleElementSelect(Number(e.target.value)),
          className: "rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "electron_config.element_select",
          children: ELEMENTS.filter((e) => e.Z <= 36).map((el) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: el.Z, children: [
            el.sym,
            " (Z=",
            el.Z,
            ")"
          ] }, el.Z))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleFillNext,
            disabled: animating || filledElectrons >= maxElectrons,
            className: "rounded-lg bg-primary/20 border border-primary/50 text-primary px-4 py-1.5 text-sm font-medium transition-all hover:bg-primary/30 disabled:opacity-50",
            "data-ocid": "electron_config.fill_next",
            children: "+1 Electron"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleAutoFill,
            disabled: animating,
            className: "rounded-lg bg-primary/20 border border-primary/50 text-primary px-4 py-1.5 text-sm font-medium transition-all hover:bg-primary/30 disabled:opacity-50",
            "data-ocid": "electron_config.autofill",
            children: animating ? "Filling…" : "▶ Auto Fill"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleReset,
            className: "rounded-lg bg-muted/30 border border-border text-muted-foreground px-4 py-1.5 text-sm font-medium transition-all hover:bg-muted/50",
            "data-ocid": "electron_config.reset",
            children: "Reset"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary transition-all duration-300",
          style: { width: `${filledElectrons / maxElectrons * 100}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
        filledElectrons,
        "/",
        maxElectrons
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/10 border border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-foreground mb-3", children: "Energy Level Diagram (Aufbau Order)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: AUFBAU_ORDER.slice(0, 10).map((orb, _i) => {
        const blockType = orb.slice(-1);
        const colors = BLOCK_COLORS[blockType];
        const cfg = currentConfig.find((c) => c.orbital === orb);
        const isFilled = !!cfg;
        const cap = CAPACITY[blockType];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-mono w-8 ${isFilled ? colors.text : "text-muted-foreground/40"}`,
              children: orb
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-6 rounded border border-border/40 bg-muted/20 flex items-center px-1 gap-0.5", children: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14"
          ].slice(0, cap).map((slotNum) => {
            const si = Number.parseInt(slotNum, 10) - 1;
            const isUp = si < ((cfg == null ? void 0 : cfg.electrons) ?? 0);
            const isDown = si >= cap / 2 && si < cap / 2 + Math.max(0, ((cfg == null ? void 0 : cfg.electrons) ?? 0) - cap / 2);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-3 h-4 border border-border/30 rounded flex items-center justify-center",
                children: isUp && !isDown ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-blue-400", children: "↑" }) : isDown ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-orange-400", children: "↓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/20", children: "−" })
              },
              `${orb}-slot-${slotNum}`
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground w-6", children: cfg ? `${cfg.electrons}/${cap}` : "0" })
        ] }, orb);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Electron Configuration:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-foreground break-all", children: configString || "(empty)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: boxNotation.map((box) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `rounded border ${BLOCK_COLORS[box.block].border} ${BLOCK_COLORS[box.block].bg} px-2 py-1 flex flex-col items-center gap-0.5`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: box.slots.map((spin, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "border border-border/40 rounded px-1 py-0.5 flex flex-col items-center",
              style: { minWidth: 22 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm ${spin === "up" ? "text-blue-400" : spin === "down" ? "text-orange-400" : "text-muted-foreground/20"}`,
                  children: spin === "up" ? "↑" : spin === "down" ? "↓" : "−"
                }
              )
            },
            `${box.label}-spin-${si}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-mono ${BLOCK_COLORS[box.block].text}`,
              children: box.label
            }
          )
        ]
      },
      box.label
    )) })
  ] });
}
function ElectronConfig() {
  const [selectedZ, setSelectedZ] = reactExports.useState(26);
  const [animStep, setAnimStep] = reactExports.useState(999);
  const [animating, setAnimating] = reactExports.useState(false);
  const el = ELEMENTS.find((e) => e.Z === selectedZ);
  const config = buildConfig(selectedZ);
  const isException = !!EXCEPTIONS[selectedZ];
  const fullConfig = isException ? EXCEPTIONS[selectedZ] : formatConfig(config);
  const shortConfig = isException ? EXCEPTIONS[selectedZ] : withNobleGasCore(config, selectedZ);
  const boxNotation = buildBoxNotation(config);
  const totalOrbitals = config.length;
  const handleAnimate = reactExports.useCallback(() => {
    setAnimating(true);
    setAnimStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimStep(step);
      if (step >= totalOrbitals) {
        clearInterval(interval);
        setAnimating(false);
        setAnimStep(999);
      }
    }, 350);
  }, [totalOrbitals]);
  const handleSelect = (Z) => {
    setSelectedZ(Z);
    setAnimStep(999);
  };
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
            title: "Electronic Configuration & Orbital Filling",
            subtitle: "Click any element to see its full electron configuration, animated orbital filling with Hund's rule, Aufbau energy diagram, and exceptions for transition metals.",
            audienceLevel: "intermediate",
            readTimeMin: 14
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: true, "data-ocid": "electron_config.table_panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Select an Element" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex gap-4 flex-wrap text-xs", children: Object.entries(BLOCK_COLORS).map(([b, c]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `px-2 py-0.5 rounded border ${c.border} ${c.bg} ${c.text} font-mono`,
              children: [
                b,
                "-block"
              ]
            },
            b
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniPeriodicTable, { selected: selectedZ, onSelect: handleSelect })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "electron_config.aufbau_builder", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Aufbau Principle Builder" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: `Build electron configurations step-by-step. Click "+1 Electron" to add electrons following Aufbau + Hund's rules, or select an element to auto-fill.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AufbauBuilder, {})
        ] }),
        el && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { "data-ocid": "electron_config.config_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-4xl font-display font-bold ${BLOCK_COLORS[el.block].text}`,
                        children: el.sym
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl text-muted-foreground font-mono", children: [
                      "Z = ",
                      selectedZ
                    ] }),
                    isException && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2 py-0.5 text-xs font-semibold", children: "Aufbau Exception" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Full configuration:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-foreground text-sm bg-muted/30 rounded px-3 py-2 break-all", children: fullConfig }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2", children: "Noble gas shorthand:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-foreground text-sm bg-muted/30 rounded px-3 py-2", children: shortConfig })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "Period",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: el.period })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "Group",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: el.group })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "Block",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono ${BLOCK_COLORS[el.block].text}`, children: el.block.toUpperCase() })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "electron_config.box_notation", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground", children: "Orbital Filling Diagram" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Box notation showing electron spins (↑ = spin up, ↓ = spin down) with Hund's rule." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "electron_config.animate_button",
                      onClick: handleAnimate,
                      disabled: animating,
                      className: "rounded-lg bg-primary/20 border border-primary/50 text-primary px-4 py-1.5 text-sm font-medium transition-all hover:bg-primary/30 disabled:opacity-50",
                      children: animating ? "Filling…" : "▶ Animate Filling"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: boxNotation.map((box, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OrbitalBox,
                  {
                    box,
                    animStep,
                    idx
                  },
                  box.label
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "electron_config.aufbau_diagram", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-3", children: "Aufbau Filling Order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: AUFBAU_ORDER.map((orb, i) => {
                  const blockType = orb.slice(-1);
                  const colors = BLOCK_COLORS[blockType];
                  const isFilled = config.some((c) => c.orbital === orb);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono text-xs rounded px-2 py-1 border transition-all duration-200 ${isFilled ? `${colors.bg} ${colors.text} ${colors.border}` : "border-border text-muted-foreground/40"}`,
                      children: [
                        i + 1,
                        ". ",
                        orb
                      ]
                    },
                    orb
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "Highlighted orbitals are occupied for the selected element. Note: 4s fills before 3d (penetration effect)." })
              ] })
            ]
          },
          selectedZ
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "ec-exceptions",
            title: "Aufbau Exceptions: Cr, Cu & More",
            defaultOpen: true,
            "data-ocid": "electron_config.exceptions_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "advanced" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground mb-4", children: "Several transition metals have configurations that differ from Aufbau predictions. Half-filled (d⁵) and fully-filled (d¹⁰) d-subshells are especially stable due to exchange energy effects." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: Object.entries(EXCEPTIONS).map(([Z, cfg]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-orange-500/30 bg-orange-500/10 p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-orange-400 font-semibold mb-1", children: [
                      "Z = ",
                      Z
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: cfg })
                  ]
                },
                Z
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "ec-equations",
            title: "Principles: Aufbau, Pauli, Hund's Rule",
            "data-ocid": "electron_config.principles_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Pauli Exclusion Principle",
                    latex: "\\\\psi(\\\\mathbf{r}_1,\\\\mathbf{r}_2) = -\\\\psi(\\\\mathbf{r}_2,\\\\mathbf{r}_1)",
                    annotation: "No two electrons can have the same set of four quantum numbers (n, l, m, s). Each orbital holds at most two electrons, which must have opposite spins."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Aufbau Principle (energy ordering)",
                    latex: "E_{nl} \\\\propto n + l \\\\quad \\\\text{(Madelung rule: lower } n+l \\\\text{ fills first)}",
                    annotation: "Orbitals fill in order of increasing n+l. When two orbitals have the same n+l, the one with smaller n fills first. This gives the 4s < 3d ordering."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Hund's First Rule",
                    latex: "S_{\\\\max} = \\\\frac{1}{2} \\\\times N_{\\\\text{unpaired}}",
                    annotation: "For degenerate orbitals, electrons occupy separate orbitals with parallel spins before pairing. Maximizing total spin S minimizes electron repulsion through exchange energy."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Exchange Energy Stabilization",
                    latex: "K = \\\\sum_{i<j} \\\\langle i,j | \\\\hat{H} | j,i \\\\rangle",
                    annotation: "Exchange integral K arises from the antisymmetry requirement for parallel spins. Cr ([Ar] 3d⁵ 4s¹) has 10 exchange interactions vs 6 for [Ar] 3d⁴ 4s² — this extra stabilization drives the anomalous configuration."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Spin–Orbit Coupling",
                    latex: "\\\\hat{H}_{\\\\text{SO}} = \\\\frac{1}{2m_e^2 c^2} \\\\frac{1}{r}\\\\frac{dV}{dr}\\\\,\\\\hat{\\\\mathbf{L}}\\\\cdot\\\\hat{\\\\mathbf{S}}, \\\\quad \\\\mathbf{J} = \\\\mathbf{L} + \\\\mathbf{S}",
                    annotation: "Spin–orbit coupling arises from the interaction of the electron's intrinsic spin S with the magnetic field seen in its rest frame due to orbital motion L. Total angular momentum J = L + S. This splits degenerate l-levels into j = l±½ fine-structure doublets."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    label: "Term Symbol & Hund's Second Rule",
                    latex: "^{2S+1}L_J, \\\\quad J_{\\\\text{gs}} = \\\\begin{cases} |L-S| & \\\\text{less than half-filled} \\\\\\\\ L+S & \\\\text{more than half-filled} \\\\end{cases}",
                    annotation: "The term symbol encodes total spin S, total orbital angular momentum L (S,P,D,F...), and total angular momentum J. Hund's third rule: for less-than-half-filled shells, the ground state has the smallest J; for more-than-half-filled, the largest J."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 3 })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CollapsibleSection,
          {
            id: "ec-theory",
            title: "Many-Electron Atoms & SCF Theory",
            "data-ocid": "electron_config.theory_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: "professional" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In hydrogen, energy depends only on n. In multi-electron atoms, electron-electron repulsion lifts the l-degeneracy: within a shell, s orbitals penetrate more toward the nucleus and are stabilized compared to p, d, f." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hartree-Fock theory solves N coupled integro-differential equations via the SCF procedure. Each electron sees an effective potential from all others. The Slater determinant ensures antisymmetry." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Density Functional Theory (DFT) uses the electron density ρ(r) as the fundamental variable (Hohenberg-Kohn theorems). Kohn-Sham equations introduce auxiliary non-interacting orbitals, and exchange-correlation functionals (LDA, GGA, hybrid) approximate the many-body effects." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationMarker, { refId: 4 })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  ElectronConfig as default
};
