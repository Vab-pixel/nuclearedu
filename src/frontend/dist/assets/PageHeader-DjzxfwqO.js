import { j as jsxRuntimeExports, d as cn } from "./index-DHpNeWFA.js";
const levelConfig = {
  beginner: {
    label: "Beginner",
    className: "audience-badge audience-beginner"
  },
  intermediate: {
    label: "Intermediate",
    className: "audience-badge audience-intermediate"
  },
  advanced: {
    label: "Advanced",
    className: "audience-badge audience-advanced"
  },
  professional: {
    label: "Professional",
    className: "audience-badge audience-professional"
  }
};
function AudienceBadge({ level, className }) {
  const config = levelConfig[level];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(config.className, className),
      "aria-label": `Audience level: ${config.label}`,
      children: config.label
    }
  );
}
function PageHeader({
  title,
  subtitle,
  audienceLevel,
  readTimeMin,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: cn("mb-8 space-y-3", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      audienceLevel && /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceBadge, { level: audienceLevel }),
      readTimeMin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs text-muted-foreground",
          "aria-label": `Estimated reading time: ${readTimeMin} minutes`,
          children: [
            readTimeMin,
            " min read"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-2xl", children: subtitle })
  ] });
}
export {
  AudienceBadge as A,
  PageHeader as P
};
