import { j as jsxRuntimeExports } from "./index-BllujZqD.js";
import { T as TriangleAlert } from "./triangle-alert-DlRFZmS1.js";
function SafetyCallout({
  title = "Restricted Technical Detail",
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "note",
      "aria-label": "Safety and content restriction notice",
      className: "my-6 rounded-lg border border-amber-500/40 bg-amber-950/30 p-4",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriangleAlert,
          {
            className: "mt-0.5 h-5 w-5 shrink-0 text-amber-400",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-amber-300", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-amber-200/80 leading-relaxed", children })
        ] })
      ] })
    }
  );
}
export {
  SafetyCallout as S
};
