import { r as reactExports, y as katex, j as jsxRuntimeExports } from "./index-DWzjlv-D.js";
function InlineEquation({ tex, className }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, {
        throwOnError: false,
        displayMode: false,
        strict: false
      });
    } catch {
      if (ref.current) ref.current.textContent = tex;
    }
  }, [tex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ref,
      className: `inline katex-inline ${className ?? ""}`,
      "aria-label": tex
    }
  );
}
export {
  InlineEquation as I
};
