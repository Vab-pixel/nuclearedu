import { j as jsxRuntimeExports, e as cn } from "./index-jNE18aF1.js";
function SectionCard({
  children,
  className,
  glowAccent,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": dataOcid,
      className: cn(
        "rounded-xl border border-border bg-card p-6 shadow-card",
        glowAccent && "border-primary/20 shadow-glow-accent",
        className
      ),
      children
    }
  );
}
export {
  SectionCard as S
};
