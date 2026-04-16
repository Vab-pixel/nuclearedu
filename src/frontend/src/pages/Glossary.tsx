import { AudienceBadge } from "@/components/AudienceBadge";
import type { BadgeLevel } from "@/components/AudienceBadge";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { glossaryTerms } from "@/data/glossary";
import type { AudienceLevel, GlossaryCategory } from "@/data/glossary";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

const audienceFilters: { label: string; value: AudienceLevel | "all" }[] = [
  { label: "All Levels", value: "all" },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
  { label: "Professional", value: "professional" },
];

const categories: GlossaryCategory[] = [
  "Physics",
  "Reactor Engineering",
  "Fuel Cycle",
  "Safety",
  "Isotopes & Decay",
  "Detection",
  "History",
  "Regulation",
  "Applications",
  "Radiation & Biology",
];

const levelBadge: Record<AudienceLevel, BadgeLevel> = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  professional: "professional",
};

const fuse = new Fuse(glossaryTerms, {
  keys: ["term", "definition"],
  threshold: 0.3,
  includeScore: true,
});

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<AudienceLevel | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<
    GlossaryCategory | "all"
  >("all");

  const results = useMemo(() => {
    let base = glossaryTerms;

    if (levelFilter !== "all") {
      base = base.filter(
        (t) => (t.audienceLevel ?? t.audience) === levelFilter,
      );
    }
    if (categoryFilter !== "all") {
      base = base.filter((t) => t.category === categoryFilter);
    }
    if (query.trim().length > 1) {
      const fuseResults = fuse.search(query.trim());
      const matchedTerms = new Set(fuseResults.map((r) => r.item.term));
      return base.filter((t) => matchedTerms.has(t.term));
    }
    return base.sort((a, b) => a.term.localeCompare(b.term));
  }, [query, levelFilter, categoryFilter]);

  const hasFilters =
    levelFilter !== "all" ||
    categoryFilter !== "all" ||
    query.trim().length > 0;

  function clearAll() {
    setQuery("");
    setLevelFilter("all");
    setCategoryFilter("all");
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <PageHeader
        title="Glossary"
        subtitle="Definitions for key terms in nuclear science and engineering — from beginner concepts to advanced reactor physics. Browse all 200+ terms or filter by level and category."
        readTimeMin={undefined}
      />

      {/* Search bar */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search terms and definitions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-10"
          aria-label="Search glossary"
          data-ocid="glossary.search_input"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Audience level filter */}
      <div className="mb-3">
        <fieldset>
          <legend className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Audience Level
          </legend>
          <div className="flex flex-wrap gap-2">
            {audienceFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setLevelFilter(f.value)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  levelFilter === f.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                aria-pressed={levelFilter === f.value}
                data-ocid={`glossary.level_filter_${f.value}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <fieldset>
          <legend className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Category
          </legend>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategoryFilter("all")}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                categoryFilter === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              aria-pressed={categoryFilter === "all"}
              data-ocid="glossary.category_filter_all"
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                aria-pressed={categoryFilter === cat}
                data-ocid={`glossary.category_filter_${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Results count + clear */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {results.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {glossaryTerms.length}
          </span>{" "}
          terms
          {query ? ` matching "${query}"` : ""}
          {categoryFilter !== "all" ? ` in "${categoryFilter}"` : ""}
        </p>
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs shrink-0"
            data-ocid="glossary.clear_filters_button"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <div
          className="rounded-xl border border-border bg-card p-12 text-center"
          data-ocid="glossary.empty_state"
        >
          <p className="font-display font-semibold text-foreground mb-2">
            No terms found
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Try a different search query, level, or category.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={clearAll}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <dl className="space-y-3" data-ocid="glossary.terms_list">
          {results.map((term, i) => {
            const level = term.audienceLevel ?? term.audience;
            return (
              <div
                key={term.term}
                className="rounded-lg border border-border bg-card p-5 scroll-mt-20"
                id={`term-${term.term.toLowerCase().replace(/\s+/g, "-")}`}
                data-ocid={`glossary.term.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    <dt className="font-display text-base font-semibold text-foreground">
                      {term.term}
                    </dt>
                    <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      {term.category}
                    </span>
                  </div>
                  <AudienceBadge level={levelBadge[level]} />
                </div>
                <dd className="text-sm text-muted-foreground leading-relaxed">
                  {term.definition}
                </dd>
                {term.equation && (
                  <div className="mt-2 font-mono text-xs bg-muted/50 rounded px-3 py-1.5 text-foreground/80 w-fit">
                    {term.equation}
                  </div>
                )}
                {term.relatedTerms.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">
                      Related:
                    </span>
                    {term.relatedTerms.map((rt) => (
                      <Badge
                        key={rt}
                        variant="outline"
                        className="text-xs cursor-pointer hover:border-primary/40"
                        onClick={() => setQuery(rt)}
                      >
                        {rt}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
