import { j as jsxRuntimeExports } from "./index-DTpTSWSe.js";
function NuclearNotation({
  symbol,
  A,
  Z,
  charge
}) {
  const displayName = `${symbol}-${A}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-baseline font-mono text-inherit",
      "aria-label": displayName,
      title: displayName,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex flex-col text-[0.6em] leading-[1.1] mr-[0.05em] select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center leading-none", children: A }),
          Z !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center leading-none opacity-70", children: Z })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: symbol }),
        charge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.6em] leading-none self-start ml-[0.05em]", children: charge })
      ]
    }
  );
}
export {
  NuclearNotation as N
};
