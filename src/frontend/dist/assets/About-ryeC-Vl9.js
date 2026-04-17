import { j as jsxRuntimeExports, A as Atom, f as BookOpen, U as Users, S as Shield } from "./index-DHpNeWFA.js";
import { P as PageHeader } from "./PageHeader-DjzxfwqO.js";
import { S as SectionCard } from "./SectionCard-Dum9xY4U.js";
const contentPolicyAllowed = [
  "Qualitative descriptions of fission, fusion, decay mechanisms",
  "Publicly available reactor operating parameters from IAEA/NRC documents",
  "Historical accounts of nuclear energy development (educational framing)",
  "Radiation dose comparisons from UNSCEAR",
  "High-level description of enrichment as a concept",
  "Isotope data from ENSDF, AME2020, NIST"
];
const contentPolicyProhibited = [
  "Critical assembly geometries or specific mass thresholds",
  "Enrichment cascade engineering details",
  "Weapon component design or actionable implosion physics",
  "Instructions for bypassing radiation monitoring or safety interlocks",
  "Any classified or ITAR-restricted technical data"
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "About NuclearEdu",
        subtitle: "A comprehensive, interactive educational resource covering nuclear science and engineering — built with scientific rigor, accessibility, and content safety as core principles."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "about.mission_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mt-1", children: "Mission" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "NuclearEdu exists to make nuclear science accessible, authoritative, and engaging for everyone — from curious citizens to nuclear engineers. Every atom in your body was forged in a star. Nuclear science is the study of matter at its most fundamental — the forces that hold atomic nuclei together, the energy released when they split or fuse, and the technologies that harness these processes to power cities, cure cancers, and reveal the deepest structures of matter." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        {
          icon: BookOpen,
          title: "Authoritative",
          desc: "All data sourced from IAEA, NNDC/ENSDF, NIST, and peer-reviewed literature. Citations on every factual claim.",
          color: "text-primary"
        },
        {
          icon: Users,
          title: "Accessible",
          desc: "WCAG 2.1 AA throughout. Dark mode by default. Keyboard navigation. Static fallbacks for all interactive elements.",
          color: "text-emerald-400"
        },
        {
          icon: Shield,
          title: "Safe",
          desc: "Content safety review for every page. No restricted technical details. Clear SafetyCallout markers for sensitive topics.",
          color: "text-amber-400"
        }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-5",
          "data-ocid": `about.principle_card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              item.icon,
              {
                className: `h-5 w-5 mb-3 ${item.color}`,
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.desc })
          ]
        },
        item.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "about.content_policy_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-amber-400", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mt-1", children: "Content Policy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-emerald-400 mb-2", children: "✓ Permitted content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 list-none", children: contentPolicyAllowed.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex gap-2 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 shrink-0 mt-0.5", children: "▸" }),
                  item
                ]
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-rose-400 mb-2", children: "✗ Prohibited content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 list-none", children: contentPolicyProhibited.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex gap-2 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400 shrink-0 mt-0.5", children: "▸" }),
                  item
                ]
              },
              item
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "about.audience_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: "Audience Levels" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "All content is tagged with an audience level indicator:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          {
            level: "Beginner",
            color: "bg-emerald-950 border-emerald-600 text-emerald-300",
            desc: "Plain-language explanations, no mathematics required. For general public and early learners."
          },
          {
            level: "Intermediate",
            color: "bg-blue-950 border-blue-600 text-blue-300",
            desc: "Conceptual math included. For high-school and early undergraduate students."
          },
          {
            level: "Advanced",
            color: "bg-amber-950 border-amber-600 text-amber-300",
            desc: "Full derivations and engineering context. For senior undergraduates and engineers."
          },
          {
            level: "Professional",
            color: "bg-purple-950 border-purple-600 text-purple-300",
            desc: "Technical reference material. For nuclear engineers, physicists, and researchers."
          }
        ].map((aud) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-lg border p-3 ${aud.color}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm mb-1", children: aud.level }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-80", children: aud.desc })
            ]
          },
          aud.level
        )) })
      ] })
    ] })
  ] });
}
export {
  AboutPage as default
};
