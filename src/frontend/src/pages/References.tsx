import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { references } from "@/data/references";
import type { ReferenceType } from "@/data/references";
import {
  BarChart2,
  BookOpen,
  Database,
  ExternalLink,
  FileText,
  Globe,
  Radiation,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const typeConfig: Record<
  ReferenceType,
  { label: string; description: string; icon: typeof Globe; color: string }
> = {
  iaea: {
    label: "IAEA",
    description: "International Atomic Energy Agency standards, reports & data",
    icon: Globe,
    color: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  },
  nndc: {
    label: "NNDC / Nuclear Data",
    description: "Evaluated nuclear data libraries and nuclide databases",
    icon: Database,
    color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  },
  nist: {
    label: "NIST",
    description: "National Institute of Standards and Technology physical data",
    icon: Database,
    color: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  },
  paper: {
    label: "Peer-reviewed Papers",
    description: "Primary scientific literature and journal publications",
    icon: FileText,
    color: "text-purple-400 border-purple-400/30 bg-purple-400/5",
  },
  book: {
    label: "Textbooks",
    description: "Authoritative reference textbooks in nuclear science",
    icon: BookOpen,
    color: "text-rose-400 border-rose-400/30 bg-rose-400/5",
  },
  wna: {
    label: "World Nuclear Association",
    description: "Industry data and nuclear information library",
    icon: Globe,
    color: "text-primary border-primary/30 bg-primary/5",
  },
  regulatory: {
    label: "Regulatory",
    description:
      "National and international regulatory frameworks and requirements",
    icon: ShieldCheck,
    color: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  },
  unscear: {
    label: "UNSCEAR",
    description: "UN Scientific Committee on the Effects of Atomic Radiation",
    icon: Radiation,
    color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
  },
  oecd: {
    label: "OECD / NEA / IEA / IPCC",
    description:
      "International energy, climate and nuclear energy agency reports",
    icon: BarChart2,
    color: "text-teal-400 border-teal-400/30 bg-teal-400/5",
  },
};

// Canonical display order
const typeOrder: ReferenceType[] = [
  "iaea",
  "nndc",
  "nist",
  "paper",
  "book",
  "wna",
  "regulatory",
  "unscear",
  "oecd",
];

export default function ReferencesPage() {
  const [activeType, setActiveType] = useState<ReferenceType | "all">("all");

  const grouped = references.reduce<
    Partial<Record<ReferenceType, typeof references>>
  >((acc, ref) => {
    acc[ref.type] = [...(acc[ref.type] ?? []), ref];
    return acc;
  }, {});

  const filteredEntries = typeOrder
    .filter((t) => grouped[t] && grouped[t]!.length > 0)
    .filter((t) => activeType === "all" || t === activeType)
    .map((t) => [t, grouped[t]!] as [ReferenceType, typeof references]);

  const totalShown = filteredEntries.reduce(
    (sum, [, refs]) => sum + refs.length,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <PageHeader
        title="References"
        subtitle="All nuclear data and content on this platform is sourced from authoritative, peer-reviewed, and publicly available scientific literature and databases."
      />

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveType("all")}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            activeType === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
          aria-pressed={activeType === "all"}
          data-ocid="references.filter_all"
        >
          All ({references.length})
        </button>
        {typeOrder
          .filter((t) => grouped[t] && grouped[t]!.length > 0)
          .map((t) => {
            const cfg = typeConfig[t];
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveType(t)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeType === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                aria-pressed={activeType === t}
                data-ocid={`references.filter_${t}`}
              >
                {cfg.label} ({grouped[t]!.length})
              </button>
            );
          })}
      </div>

      <p className="text-sm text-muted-foreground mb-8" aria-live="polite">
        Showing{" "}
        <span className="font-semibold text-foreground">{totalShown}</span> of{" "}
        <span className="font-semibold text-foreground">
          {references.length}
        </span>{" "}
        references
      </p>

      {filteredEntries.map(([type, refs]) => {
        const config = typeConfig[type];
        const Icon = config.icon;
        return (
          <section
            key={type}
            className="mb-10"
            aria-label={`${config.label} references`}
            data-ocid={`references.${type}_section`}
          >
            <div className="mb-4">
              <div
                className={`flex items-center gap-2 mb-1 rounded-lg border px-4 py-2 w-fit ${config.color}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <h2 className="font-display text-sm font-bold">
                  {config.label}
                </h2>
                <Badge variant="secondary" className="text-xs ml-1">
                  {refs.length}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pl-1">
                {config.description}
              </p>
            </div>
            <ol className="space-y-2.5 list-none">
              {refs
                .slice()
                .sort((a, b) => a.id - b.id)
                .map((ref) => (
                  <li
                    key={ref.id}
                    id={`ref-${ref.id}`}
                    className="rounded-lg border border-border bg-card p-4 scroll-mt-20 group"
                    data-ocid={`references.ref.${ref.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                          {ref.id}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground leading-snug">
                            {ref.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {ref.authors} —{" "}
                            <span className="italic">{ref.source}</span> (
                            {ref.year})
                          </p>
                        </div>
                      </div>
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 flex items-center gap-1 text-xs text-primary hover:underline transition-colors opacity-60 group-hover:opacity-100"
                          aria-label={`Open reference ${ref.id}: ${ref.title} in new tab`}
                          data-ocid={`references.ref_link.${ref.id}`}
                        >
                          <ExternalLink
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          <span className="hidden sm:inline">Visit</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        );
      })}

      <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-5 mt-4">
        <h3 className="font-display text-sm font-semibold text-amber-300 mb-2">
          Data Provenance Note
        </h3>
        <p className="text-xs text-amber-200/70 leading-relaxed">
          All nuclear data (half-lives, Q-values, binding energies, decay modes)
          used in this platform is sourced from the ENSDF (Evaluated Nuclear
          Structure Data File) at BNL/NNDC and AME2020. Reactor operational
          parameters are from IAEA PRIS. Data is curated for educational
          accuracy but should not be used for engineering calculations — consult
          primary sources directly.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-5 mt-4">
        <h3 className="font-display text-sm font-semibold text-foreground mb-2">
          How to cite this platform
        </h3>
        <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap break-words font-mono bg-card rounded p-3 border border-border">
          {`NuclearEdu. (2025). [Topic title].
Retrieved from https://[domain]/[path].
Data sources: ENSDF/NNDC, IAEA, as applicable.`}
        </pre>
      </div>
    </div>
  );
}
