import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  BookMarked,
  BookOpen,
  Clock,
  Command,
  Search,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { type SearchResult, useGlobalSearch } from "../hooks/useGlobalSearch";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  pages: <BookOpen className="h-4 w-4" aria-hidden="true" />,
  elements: <Atom className="h-4 w-4" aria-hidden="true" />,
  tools: <Wrench className="h-4 w-4" aria-hidden="true" />,
  glossary: <BookMarked className="h-4 w-4" aria-hidden="true" />,
};

const categoryLabels: Record<string, string> = {
  pages: "Pages",
  elements: "Elements",
  tools: "Tools",
  glossary: "Glossary",
};

function groupResults(results: SearchResult[]) {
  const groups: Record<string, SearchResult[]> = {};
  for (const r of results) {
    if (!groups[r.category]) groups[r.category] = [];
    groups[r.category].push(r);
  }
  return groups;
}

function HighlightMatches({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, idx) =>
        terms.some((t) => part.toLowerCase() === t.toLowerCase()) ? (
          <mark
            key={`hl-${String(idx)}`}
            className="rounded-sm bg-yellow-400/30 px-0.5 text-inherit"
          >
            {part}
          </mark>
        ) : (
          <span key={`sp-${String(idx)}`}>{part}</span>
        ),
      )}
    </>
  );
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const {
    query,
    setQuery,
    results,
    selectedIndex,
    setSelectedIndex,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useGlobalSearch();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const flatResults = results;
  const groups = groupResults(flatResults);
  const groupOrder = ["pages", "elements", "tools", "glossary"];
  const flatOrdered: SearchResult[] = [];
  for (const cat of groupOrder) {
    if (groups[cat]) flatOrdered.push(...groups[cat]);
  }

  const handleSelect = useCallback(
    (result: SearchResult) => {
      addRecentSearch(result.title);
      onClose();
      navigate({ to: result.route });
    },
    [addRecentSearch, onClose, navigate],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const max = query.trim()
            ? flatOrdered.length - 1
            : recentSearches.length - 1;
          return Math.min(prev + 1, Math.max(0, max));
        });
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (query.trim() && flatOrdered[selectedIndex]) {
          handleSelect(flatOrdered[selectedIndex]);
        } else if (!query.trim() && recentSearches[selectedIndex]) {
          setQuery(recentSearches[selectedIndex]);
        }
        return;
      }
    },
    [
      onClose,
      setSelectedIndex,
      query,
      recentSearches,
      selectedIndex,
      handleSelect,
      setQuery,
    ],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll effect depends on selectedIndex
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>(
      "[data-selected='true']",
    );
    if (active) {
      active.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          // biome-ignore lint/a11y/useSemanticElements: motion.div used for AnimatePresence overlay
          role="dialog"
          aria-modal="true"
          aria-label="Global search"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search
                className="h-5 w-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, elements, tools, glossary..."
                className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
                aria-label="Search query"
                data-ocid="search.input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Clear search"
                  data-ocid="search.clear_button"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results area */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
              {query.trim() === "" && recentSearches.length > 0 && (
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="search.clear_recent_button"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        data-selected={idx === selectedIndex}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                          idx === selectedIndex
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        data-ocid={`search.recent.${idx + 1}`}
                      >
                        <Clock
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="flex-1 truncate">{term}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 opacity-50"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() === "" && recentSearches.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <Search
                    className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground">
                    Type to search pages, elements, tools, and glossary terms
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {[
                      "Uranium",
                      "Fission",
                      "Half-life",
                      "Reactor",
                      "Binding energy",
                    ].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                        data-ocid={`search.suggestion.${s.toLowerCase().replace(/\s+/g, "_")}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() !== "" && flatOrdered.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <Search
                    className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground">
                    No results for &quot;
                    <span className="font-medium text-foreground">{query}</span>
                    &quot;
                  </p>
                </div>
              )}

              {query.trim() !== "" && flatOrdered.length > 0 && (
                <div className="px-2 py-2">
                  {groupOrder.map((cat) => {
                    const items = groups[cat];
                    if (!items || items.length === 0) return null;
                    let runningIndex = 0;
                    for (const c of groupOrder) {
                      if (c === cat) break;
                      runningIndex += groups[c]?.length ?? 0;
                    }
                    return (
                      <div key={cat} className="mb-2">
                        <div className="flex items-center gap-2 px-3 py-1.5">
                          {categoryIcons[cat]}
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {categoryLabels[cat]}
                          </span>
                          <span className="text-xs text-muted-foreground/60">
                            {items.length}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {items.map((item, i) => {
                            const globalIdx = runningIndex + i;
                            const isSelected = globalIdx === selectedIndex;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(globalIdx)}
                                data-selected={isSelected}
                                className={cn(
                                  "flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted",
                                )}
                                data-ocid={`search.result.${item.id}`}
                              >
                                <div
                                  className={cn(
                                    "mt-0.5 shrink-0",
                                    isSelected
                                      ? "text-primary-foreground"
                                      : "text-muted-foreground",
                                  )}
                                >
                                  {categoryIcons[cat]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div
                                    className={cn(
                                      "text-sm font-medium",
                                      isSelected
                                        ? "text-primary-foreground"
                                        : "text-foreground",
                                    )}
                                  >
                                    <HighlightMatches
                                      text={item.title}
                                      query={query}
                                    />
                                  </div>
                                  <div
                                    className={cn(
                                      "text-xs mt-0.5 line-clamp-1",
                                      isSelected
                                        ? "text-primary-foreground/80"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    <HighlightMatches
                                      text={item.description}
                                      query={query}
                                    />
                                  </div>
                                  {item.metadata && (
                                    <div
                                      className={cn(
                                        "text-xs mt-0.5 font-mono",
                                        isSelected
                                          ? "text-primary-foreground/70"
                                          : "text-muted-foreground/70",
                                      )}
                                    >
                                      {item.metadata}
                                    </div>
                                  )}
                                </div>
                                <ArrowRight
                                  className={cn(
                                    "h-3.5 w-3.5 shrink-0 mt-1 opacity-0 transition-opacity",
                                    isSelected && "opacity-60",
                                  )}
                                  aria-hidden="true"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[10px] font-medium">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[10px] font-medium">
                    ↵
                  </kbd>
                  <span>Open</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[10px] font-medium">
                    esc
                  </kbd>
                  <span>Close</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Command className="h-3 w-3" aria-hidden="true" />
                <span>+ K to open</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
