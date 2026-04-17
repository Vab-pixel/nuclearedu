import { r as reactExports, j as jsxRuntimeExports, a as ChevronDown, d as cn } from "./index-DHpNeWFA.js";
function CollapsibleSection({
  id,
  title,
  defaultOpen = false,
  badge,
  children,
  className,
  "data-ocid": dataOcid
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id,
      className: cn(
        "rounded-xl border border-border bg-card shadow-card overflow-hidden",
        className
      ),
      "data-ocid": dataOcid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((o) => !o),
            "aria-expanded": open,
            "aria-controls": `${id}-content`,
            className: "w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold text-foreground truncate", children: title }),
                badge
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: cn(
                    "h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    open && "rotate-180"
                  ),
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            id: `${id}-content`,
            hidden: !open,
            className: "px-6 pb-6 border-t border-border/50",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children })
          }
        )
      ]
    }
  );
}
export {
  CollapsibleSection as C
};
