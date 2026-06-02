import { r as reactExports, y as katex, j as jsxRuntimeExports } from "./index-DTpTSWSe.js";
function InlineEquation({ tex, className }) {
  const ref = reactExports.useRef(null);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    setError(false);
    try {
      katex.render(tex, ref.current, {
        throwOnError: false,
        displayMode: false,
        strict: false
      });
    } catch {
      setError(true);
      if (ref.current) {
        ref.current.innerHTML = `<span class="math-error" title="${tex.replace(/"/g, "&quot;")}">${tex}</span>`;
      }
    }
  }, [tex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ref,
      className: `inline katex-inline ${error ? "math-error" : ""} ${className ?? ""}`,
      "aria-label": tex,
      title: error ? tex : void 0
    }
  );
}
export {
  InlineEquation as I
};
