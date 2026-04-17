import { j as jsxRuntimeExports, L as Link } from "./index-DHpNeWFA.js";
function CitationMarker({ refId }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/references",
      hash: `ref-${refId}`,
      className: "inline-flex items-center justify-center rounded-sm px-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "aria-label": `Reference ${refId}`,
      children: [
        "[",
        refId,
        "]"
      ]
    }
  );
}
export {
  CitationMarker as C
};
