import { PageHeader } from "@/components/PageHeader";
import { type NewsCategory, type NewsItem, newsItems } from "@/data/newsItems";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import Fuse from "fuse.js";
import {
  Calendar,
  ExternalLink,
  Newspaper,
  Search,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Category config ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  NewsCategory,
  { label: string; color: string; bg: string; border: string }
> = {
  research: {
    label: "Research",
    color: "text-cyan-300",
    bg: "bg-cyan-950/40",
    border: "border-cyan-700/50",
  },
  policy: {
    label: "Policy",
    color: "text-violet-300",
    bg: "bg-violet-950/40",
    border: "border-violet-700/50",
  },
  technology: {
    label: "Technology",
    color: "text-emerald-300",
    bg: "bg-emerald-950/40",
    border: "border-emerald-700/50",
  },
  safety: {
    label: "Safety",
    color: "text-amber-300",
    bg: "bg-amber-950/40",
    border: "border-amber-700/50",
  },
  medicine: {
    label: "Medicine",
    color: "text-rose-300",
    bg: "bg-rose-950/40",
    border: "border-rose-700/50",
  },
  fusion: {
    label: "Fusion",
    color: "text-orange-300",
    bg: "bg-orange-950/40",
    border: "border-orange-700/50",
  },
  history: {
    label: "History",
    color: "text-sky-300",
    bg: "bg-sky-950/40",
    border: "border-sky-700/50",
  },
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "category", label: "By Category" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

// ── Fuse.js config ───────────────────────────────────────────────────────────
const fuse = new Fuse(newsItems, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "summary", weight: 0.3 },
    { name: "tags", weight: 0.2 },
  ],
  threshold: 0.35,
  includeScore: true,
});

// ── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: NewsCategory }) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
        cfg.bg,
        cfg.color,
        cfg.border,
      )}
    >
      {cfg.label}
    </span>
  );
}

function AudienceChip({ audience }: { audience: NewsItem["audience"] }) {
  const labels: Record<string, string> = {
    public: "General",
    student: "Student",
    researcher: "Researcher",
  };
  const styles: Record<string, string> = {
    public: "bg-muted text-muted-foreground border-border",
    student: "bg-primary/10 text-primary border-primary/30",
    researcher: "bg-accent/10 text-accent border-accent/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs border",
        styles[audience],
      )}
    >
      {labels[audience]}
    </span>
  );
}

function NewsCard({
  item,
  index,
}: {
  item: NewsItem;
  index: number;
}) {
  return (
    <motion.article
      data-ocid={`news.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/30 hover:shadow-glow-accent transition-all duration-200"
    >
      {/* Header row */}
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={item.category} />
        <AudienceChip audience={item.audience} />
        <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          {item.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-semibold leading-snug text-foreground line-clamp-3">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
        {item.summary}
      </p>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
            >
              <Tag className="h-2.5 w-2.5" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Source + link */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-xs font-medium text-muted-foreground">
          {item.source}
        </span>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`news.source_link.${index + 1}`}
            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            aria-label={`Open source for ${item.title} (opens in new tab)`}
          >
            View Source
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function HeroCard({ item }: { item: NewsItem }) {
  const cfg = CATEGORY_CONFIG[item.category];
  return (
    <motion.article
      data-ocid="news.featured_card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8 shadow-card mb-8",
        cfg.border,
      )}
    >
      {/* Accent glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-10 blur-3xl",
          cfg.bg,
        )}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border",
              cfg.bg,
              cfg.color,
              cfg.border,
            )}
          >
            ★ Featured
          </span>
          <CategoryBadge category={item.category} />
          <AudienceChip audience={item.audience} />
          <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {item.date}
          </span>
        </div>

        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug">
          {item.title}
        </h2>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {item.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              <Tag className="h-2.5 w-2.5" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground">
            {item.source}
          </span>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="news.featured_source_link"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              aria-label={`Open source for ${item.title} (opens in new tab)`}
            >
              View Source
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function NuclearNewsFeed() {
  const { audienceLevel } = useAppStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "all">(
    "all",
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [audienceFilter, setAudienceFilter] = useState<
    "all" | "public" | "student" | "researcher"
  >("all");

  // Derive stats
  const latestDate = newsItems.reduce((a, b) => (a.date > b.date ? a : b)).date;
  const categoryCount = new Set(newsItems.map((n) => n.category)).size;

  // Filter + search + sort
  const filteredItems = useMemo(() => {
    let base: NewsItem[] =
      search.trim().length > 1
        ? fuse.search(search).map((r) => r.item)
        : [...newsItems];

    if (activeCategory !== "all") {
      base = base.filter((n) => n.category === activeCategory);
    }

    if (audienceFilter !== "all") {
      base = base.filter((n) => n.audience === audienceFilter);
    }

    // Apply audience store preference as soft suggestion (not hard filter)
    const audiencePriority: Record<string, number> = {
      public: 0,
      student: 1,
      researcher: 2,
    };
    const preferredLevel = audiencePriority[audienceLevel] ?? 0;

    return base.sort((a, b) => {
      if (sortBy === "newest") return b.date.localeCompare(a.date);
      if (sortBy === "oldest") return a.date.localeCompare(b.date);
      if (sortBy === "category") {
        const catCmp = a.category.localeCompare(b.category);
        if (catCmp !== 0) return catCmp;
        return b.date.localeCompare(a.date);
      }
      // default tiebreak by audience relevance
      const aPrio = Math.abs(audiencePriority[a.audience] - preferredLevel);
      const bPrio = Math.abs(audiencePriority[b.audience] - preferredLevel);
      return aPrio - bPrio;
    });
  }, [search, activeCategory, audienceFilter, sortBy, audienceLevel]);

  const featuredItems = filteredItems.filter((n) => n.highlighted);
  const regularItems = filteredItems.filter((n) => !n.highlighted);

  const categories: Array<NewsCategory | "all"> = [
    "all",
    "fusion",
    "technology",
    "research",
    "medicine",
    "safety",
    "policy",
    "history",
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12" data-ocid="news.page">
      <PageHeader
        title="Nuclear News & Research"
        subtitle="A curated educational feed of significant nuclear science and engineering developments from 2022–2024, drawn from peer-reviewed literature, IAEA reports, and authoritative news sources."
      />

      {/* Stats bar */}
      <section
        className="mb-8 flex flex-wrap gap-4 rounded-xl border border-border bg-muted/30 px-5 py-4"
        data-ocid="news.stats_bar"
        aria-label="Feed statistics"
      >
        <div className="flex items-center gap-2 text-sm">
          <Newspaper className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-semibold text-foreground">
            {newsItems.length}
          </span>
          <span className="text-muted-foreground">curated articles</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="text-muted-foreground">Latest:</span>
          <span className="font-semibold text-foreground">{latestDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-secondary" aria-hidden="true" />
          <span className="font-semibold text-foreground">{categoryCount}</span>
          <span className="text-muted-foreground">topic categories</span>
        </div>
      </section>
      <div className="mb-6 flex flex-col gap-4" data-ocid="news.controls">
        {/* Search */}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles, tags, summaries…"
            data-ocid="news.search_input"
            aria-label="Search news articles"
            className="w-full rounded-lg border border-input bg-card pl-9 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              data-ocid="news.search_clear"
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <fieldset className="flex flex-wrap gap-2 border-0 m-0 p-0">
          <legend className="sr-only">Filter by category</legend>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const cfg = cat !== "all" ? CATEGORY_CONFIG[cat] : null;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`news.category_filter.${cat}`}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                  isActive
                    ? cfg
                      ? cn(cfg.bg, cfg.color, cfg.border, "shadow-sm")
                      : "bg-primary/15 text-primary border-primary/40"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground",
                )}
              >
                {cat === "all" ? "All Topics" : CATEGORY_CONFIG[cat].label}
              </button>
            );
          })}
        </fieldset>

        {/* Second row: audience + sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Audience filter */}
          <fieldset className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
            <legend className="sr-only">Filter by audience</legend>
            {(["all", "public", "student", "researcher"] as const).map(
              (lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setAudienceFilter(lvl)}
                  data-ocid={`news.audience_filter.${lvl}`}
                  aria-pressed={audienceFilter === lvl}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 capitalize",
                    audienceFilter === lvl
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {lvl === "all"
                    ? "All Levels"
                    : lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                </button>
              ),
            )}
          </fieldset>

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            <label
              htmlFor="news-sort"
              className="text-xs text-muted-foreground whitespace-nowrap"
            >
              Sort by:
            </label>
            <select
              id="news-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              data-ocid="news.sort_select"
              className="rounded-lg border border-input bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <output
        className="mb-5 block text-sm text-muted-foreground"
        aria-live="polite"
        aria-atomic="true"
      >
        {filteredItems.length === newsItems.length
          ? `Showing all ${newsItems.length} articles`
          : `${filteredItems.length} of ${newsItems.length} articles`}
      </output>

      {/* Featured hero cards */}
      <AnimatePresence mode="sync">
        {featuredItems.length > 0 && (
          <motion.section
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Featured articles"
            data-ocid="news.featured_section"
          >
            {featuredItems.map((item) => (
              <HeroCard key={item.id} item={item} />
            ))}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="sync">
        {filteredItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            data-ocid="news.empty_state"
            className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 py-20 text-center"
            aria-label="No articles match your filters"
          >
            <Newspaper
              className="h-12 w-12 text-muted-foreground/40"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-foreground">No articles found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try different keywords, adjust the category filter, or clear
                your search.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setAudienceFilter("all");
              }}
              data-ocid="news.reset_filters_button"
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              Reset all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            data-ocid="news.grid"
          >
            <AnimatePresence mode="popLayout">
              {regularItems.map((item, idx) => (
                <NewsCard key={item.id} item={item} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer footer */}
      <footer
        className="mt-12 rounded-xl border border-border bg-muted/20 px-5 py-4 text-xs text-muted-foreground leading-relaxed"
        data-ocid="news.disclaimer"
      >
        <strong className="text-foreground">Educational Disclaimer:</strong>{" "}
        This is a curated educational feed. Content is based on publicly
        available sources including IAEA reports, peer-reviewed literature, and
        reputable news outlets. Summaries are written for educational purposes
        and may omit technical nuance. Always verify information through
        official primary sources before citing or acting on it. No classified,
        restricted, or export-controlled information is included.
      </footer>
    </div>
  );
}
