import { r as reactExports, j as jsxRuntimeExports } from "./index-Dw4QPaCL.js";
import { k as katex } from "./katex.min-7aSmwJ3l.js";
function EquationBlock({
  latex,
  annotation,
  label
}) {
  const mathRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!mathRef.current) return;
    try {
      katex.render(latex, mathRef.current, {
        displayMode: true,
        throwOnError: false,
        trust: false
      });
    } catch {
      if (mathRef.current) {
        mathRef.current.innerHTML = `<code class="text-sm font-mono text-foreground">${latex}</code>`;
      }
    }
  }, [latex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "figure",
    {
      className: "my-6 rounded-lg border border-border bg-muted/30 p-5",
      "aria-label": label ?? annotation,
      children: [
        label && /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: mathRef,
            className: "overflow-x-auto text-foreground",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sr-only", children: annotation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm italic text-muted-foreground", children: annotation })
      ]
    }
  );
}
export {
  EquationBlock as E
};
