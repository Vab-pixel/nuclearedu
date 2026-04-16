import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { Atom, BookOpen, Shield, Users } from "lucide-react";

const contentPolicyAllowed = [
  "Qualitative descriptions of fission, fusion, decay mechanisms",
  "Publicly available reactor operating parameters from IAEA/NRC documents",
  "Historical accounts of nuclear energy development (educational framing)",
  "Radiation dose comparisons from UNSCEAR",
  "High-level description of enrichment as a concept",
  "Isotope data from ENSDF, AME2020, NIST",
];

const contentPolicyProhibited = [
  "Critical assembly geometries or specific mass thresholds",
  "Enrichment cascade engineering details",
  "Weapon component design or actionable implosion physics",
  "Instructions for bypassing radiation monitoring or safety interlocks",
  "Any classified or ITAR-restricted technical data",
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="About NuclearEdu"
        subtitle="A comprehensive, interactive educational resource covering nuclear science and engineering — built with scientific rigor, accessibility, and content safety as core principles."
      />

      <div className="grid gap-6">
        <SectionCard data-ocid="about.mission_card">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
              <Atom className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mt-1">
              Mission
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            NuclearEdu exists to make nuclear science accessible, authoritative,
            and engaging for everyone — from curious citizens to nuclear
            engineers. Every atom in your body was forged in a star. Nuclear
            science is the study of matter at its most fundamental — the forces
            that hold atomic nuclei together, the energy released when they
            split or fuse, and the technologies that harness these processes to
            power cities, cure cancers, and reveal the deepest structures of
            matter.
          </p>
        </SectionCard>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Authoritative",
              desc: "All data sourced from IAEA, NNDC/ENSDF, NIST, and peer-reviewed literature. Citations on every factual claim.",
              color: "text-primary",
            },
            {
              icon: Users,
              title: "Accessible",
              desc: "WCAG 2.1 AA throughout. Dark mode by default. Keyboard navigation. Static fallbacks for all interactive elements.",
              color: "text-emerald-400",
            },
            {
              icon: Shield,
              title: "Safe",
              desc: "Content safety review for every page. No restricted technical details. Clear SafetyCallout markers for sensitive topics.",
              color: "text-amber-400",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-5"
              data-ocid={`about.principle_card.${i + 1}`}
            >
              <item.icon
                className={`h-5 w-5 mb-3 ${item.color}`}
                aria-hidden="true"
              />
              <h3 className="font-display font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <SectionCard data-ocid="about.content_policy_card">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/30">
              <Shield className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mt-1">
              Content Policy
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">
                ✓ Permitted content
              </h3>
              <ul className="space-y-1.5 list-none">
                {contentPolicyAllowed.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs text-muted-foreground"
                  >
                    <span className="text-emerald-400 shrink-0 mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-rose-400 mb-2">
                ✗ Prohibited content
              </h3>
              <ul className="space-y-1.5 list-none">
                {contentPolicyProhibited.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs text-muted-foreground"
                  >
                    <span className="text-rose-400 shrink-0 mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard data-ocid="about.audience_card">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Audience Levels
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            All content is tagged with an audience level indicator:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                level: "Beginner",
                color: "bg-emerald-950 border-emerald-600 text-emerald-300",
                desc: "Plain-language explanations, no mathematics required. For general public and early learners.",
              },
              {
                level: "Intermediate",
                color: "bg-blue-950 border-blue-600 text-blue-300",
                desc: "Conceptual math included. For high-school and early undergraduate students.",
              },
              {
                level: "Advanced",
                color: "bg-amber-950 border-amber-600 text-amber-300",
                desc: "Full derivations and engineering context. For senior undergraduates and engineers.",
              },
              {
                level: "Professional",
                color: "bg-purple-950 border-purple-600 text-purple-300",
                desc: "Technical reference material. For nuclear engineers, physicists, and researchers.",
              },
            ].map((aud) => (
              <div
                key={aud.level}
                className={`rounded-lg border p-3 ${aud.color}`}
              >
                <p className="font-semibold text-sm mb-1">{aud.level}</p>
                <p className="text-xs opacity-80">{aud.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
