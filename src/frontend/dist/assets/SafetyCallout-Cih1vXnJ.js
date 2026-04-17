import { e as createLucideIcon, j as jsxRuntimeExports } from "./index-DHpNeWFA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
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
  SafetyCallout as S,
  TriangleAlert as T
};
