import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Category =
  | "All"
  | "Discovery"
  | "Technology"
  | "Policy"
  | "Accidents"
  | "Milestone";

interface TimelineEvent {
  year: number;
  cat: Category;
  title: string;
  desc: string;
  figures: string;
}

const events: TimelineEvent[] = [
  {
    year: 1896,
    cat: "Discovery",
    title: "Becquerel Discovers Radioactivity",
    desc: "Henri Becquerel accidentally discovers that uranium emits penetrating radiation, founding nuclear science.",
    figures: "Henri Becquerel",
  },
  {
    year: 1898,
    cat: "Discovery",
    title: "Curies Discover Polonium and Radium",
    desc: "Marie and Pierre Curie isolate two new radioactive elements, coining the term 'radioactivity'.",
    figures: "Marie Curie, Pierre Curie",
  },
  {
    year: 1905,
    cat: "Milestone",
    title: "E = mc²",
    desc: "Albert Einstein publishes special relativity, establishing the mass-energy equivalence that underlies all nuclear energy.",
    figures: "Albert Einstein",
  },
  {
    year: 1911,
    cat: "Discovery",
    title: "Rutherford Nuclear Model",
    desc: "Ernest Rutherford's gold foil experiment reveals the nuclear structure of atoms.",
    figures: "Ernest Rutherford",
  },
  {
    year: 1919,
    cat: "Discovery",
    title: "First Artificial Transmutation",
    desc: "Rutherford achieves first artificial nuclear reaction: nitrogen-14 to oxygen-17 by alpha bombardment.",
    figures: "Ernest Rutherford",
  },
  {
    year: 1932,
    cat: "Discovery",
    title: "Neutron Discovery",
    desc: "James Chadwick discovers the neutron, completing the nuclear model and enabling fission research.",
    figures: "James Chadwick",
  },
  {
    year: 1934,
    cat: "Discovery",
    title: "Artificial Radioactivity",
    desc: "Irène and Frédéric Joliot-Curie create first artificial radioisotopes by bombarding aluminum with alpha particles.",
    figures: "Irène Joliot-Curie, Frédéric Joliot-Curie",
  },
  {
    year: 1938,
    cat: "Discovery",
    title: "Nuclear Fission Discovered",
    desc: "Otto Hahn and Fritz Strassmann split uranium; Lise Meitner and Otto Frisch provide theoretical explanation.",
    figures: "Lise Meitner, Otto Hahn, Fritz Strassmann",
  },
  {
    year: 1942,
    cat: "Technology",
    title: "Chicago Pile-1 — First Controlled Reaction",
    desc: "Enrico Fermi's team achieves world's first controlled nuclear chain reaction under Stagg Field, Chicago.",
    figures: "Enrico Fermi",
  },
  {
    year: 1945,
    cat: "Milestone",
    title: "Trinity Test — First Nuclear Detonation",
    desc: "First nuclear device detonated at Alamogordo, NM. Historical milestone in nuclear weapons development (high-level only).",
    figures: "J. Robert Oppenheimer",
  },
  {
    year: 1951,
    cat: "Technology",
    title: "EBR-1: First Nuclear Electricity",
    desc: "Experimental Breeder Reactor I (Idaho) produces the first usable electricity from nuclear fission.",
    figures: "Walter Zinn",
  },
  {
    year: 1953,
    cat: "Policy",
    title: "Atoms for Peace",
    desc: "President Eisenhower's UN speech proposes sharing nuclear technology for peaceful purposes, founding civil nuclear era.",
    figures: "Dwight Eisenhower",
  },
  {
    year: 1954,
    cat: "Technology",
    title: "Obninsk: World's First Grid-Connected Reactor",
    desc: "Soviet Union connects Obninsk reactor (5 MWe) to the grid, beginning the nuclear power era.",
    figures: "Igor Kurchatov",
  },
  {
    year: 1957,
    cat: "Policy",
    title: "IAEA Founded",
    desc: "International Atomic Energy Agency established to promote peaceful nuclear use and verify non-proliferation.",
    figures: "Dag Hammarskjöld",
  },
  {
    year: 1958,
    cat: "Technology",
    title: "Shippingport: First US Commercial Reactor",
    desc: "Shippingport Atomic Power Station begins operation, the world's first full-scale PWR commercial plant.",
    figures: "Hyman Rickover",
  },
  {
    year: 1960,
    cat: "Technology",
    title: "Nuclear Submarines Operational Fleet",
    desc: "Nuclear-powered submarine fleet becomes operational, revolutionizing naval warfare and demonstrating compact reactor design.",
    figures: "Hyman Rickover",
  },
  {
    year: 1968,
    cat: "Policy",
    title: "Nuclear Non-Proliferation Treaty Opened",
    desc: "NPT opened for signature; 191 states eventually join, the most widely adhered arms control treaty.",
    figures: "Lyndon B. Johnson",
  },
  {
    year: 1979,
    cat: "Accidents",
    title: "Three Mile Island Accident",
    desc: "Partial core meltdown at TMI-2 in Pennsylvania. No fatalities; major impact on US nuclear regulation and public opinion.",
    figures: "NRC Investigation",
  },
  {
    year: 1986,
    cat: "Accidents",
    title: "Chernobyl Disaster",
    desc: "Reactor No. 4 explosion and graphite fire release large amounts of radioactive material. 31 direct deaths; massive displacement.",
    figures: "IAEA/Soviet investigators",
  },
  {
    year: 1994,
    cat: "Technology",
    title: "First SMR Concepts Proposed",
    desc: "Small Modular Reactor designs begin emerging as alternative to large light-water reactors for flexible deployment.",
    figures: "Various engineers",
  },
  {
    year: 2005,
    cat: "Policy",
    title: "Generation IV Framework Established",
    desc: "GIF selects 6 advanced reactor concepts for international R&D (MSR, SFR, GFR, VHTR, LFR, SCWR).",
    figures: "Generation IV International Forum",
  },
  {
    year: 2011,
    cat: "Accidents",
    title: "Fukushima Daiichi Accident",
    desc: "Tsunami triggers loss of cooling at three BWR units. INES Level 7. Accelerated global reactor safety reviews.",
    figures: "TEPCO, IAEA",
  },
  {
    year: 2022,
    cat: "Milestone",
    title: "NIF Achieves Ignition",
    desc: "National Ignition Facility achieves fusion ignition for first time — energy output exceeds laser input. Major fusion milestone.",
    figures: "LLNL NIF Team",
  },
  {
    year: 2023,
    cat: "Technology",
    title: "First SMR Construction Approvals",
    desc: "Multiple countries approve and begin construction of small modular reactors, marking new era of nuclear deployment.",
    figures: "NuScale, Rolls-Royce SMR",
  },
  {
    year: 2024,
    cat: "Policy",
    title: "AI and Tech Companies Commit to Nuclear",
    desc: "Major technology companies sign agreements with nuclear operators and SMR developers to power data centers with nuclear energy.",
    figures: "Microsoft, Google, Amazon",
  },
];

const categories: Category[] = [
  "All",
  "Discovery",
  "Technology",
  "Policy",
  "Accidents",
  "Milestone",
];

const catColors: Record<string, string> = {
  Discovery: "bg-blue-900/40 text-blue-200 border-blue-700/40",
  Technology: "bg-emerald-900/40 text-emerald-200 border-emerald-700/40",
  Policy: "bg-purple-900/40 text-purple-200 border-purple-700/40",
  Accidents: "bg-orange-900/40 text-orange-200 border-orange-700/40",
  Milestone: "bg-amber-900/40 text-amber-200 border-amber-700/40",
};

const catDotColors: Record<string, string> = {
  Discovery: "bg-blue-400",
  Technology: "bg-emerald-400",
  Policy: "bg-purple-400",
  Accidents: "bg-orange-400",
  Milestone: "bg-amber-400",
};

export default function InteractiveTimeline() {
  const [filter, setFilter] = useState<Category>("All");
  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  const filtered =
    filter === "All" ? events : events.filter((e) => e.cat === filter);
  const minYear = Math.min(...events.map((e) => e.year));
  const maxYear = Math.max(...events.map((e) => e.year));
  const yearRange = maxYear - minYear;

  function yearToX(year: number): number {
    return ((year - minYear) / yearRange) * 100;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Nuclear History Timeline"
        subtitle="Interactive chronological timeline of nuclear science, technology, policy, and milestones from 1896 to present."
      />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all glow-focus flex items-center gap-2",
              filter === c
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
            )}
            data-ocid={`timeline.filter_${c.toLowerCase()}_tab`}
          >
            {c !== "All" && (
              <span className={cn("w-2 h-2 rounded-full", catDotColors[c])} />
            )}
            {c}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <SectionCard className="overflow-x-auto" data-ocid="timeline.container">
        <div className="relative min-w-[1200px] h-[600px] py-8">
          {/* Year markers */}
          {Array.from({ length: Math.floor((maxYear - minYear) / 10) + 1 }).map(
            (_, i) => {
              const year = minYear + i * 10;
              return (
                <div
                  key={year}
                  className="absolute top-0 text-xs text-muted-foreground font-mono"
                  style={{
                    left: `${yearToX(year)}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {year}
                </div>
              );
            },
          )}

          {/* Track */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />

          {/* Events */}
          {filtered.map((event, i) => {
            const x = yearToX(event.year);
            const isAbove = i % 2 === 0;
            return (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, y: isAbove ? -20 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="absolute"
                style={{ left: `${x}%`, top: isAbove ? "20px" : "40px" }}
              >
                {/* Connector line */}
                <div
                  className="absolute left-1/2 w-px bg-border"
                  style={{
                    top: isAbove ? "100%" : "auto",
                    bottom: isAbove ? "auto" : "100%",
                    height: isAbove ? "24px" : "24px",
                  }}
                />
                {/* Dot */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background",
                    catDotColors[event.cat],
                  )}
                  style={{ top: isAbove ? "24px" : "-12px" }}
                />
                {/* Card */}
                <button
                  type="button"
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-48 cursor-pointer text-left",
                    isAbove ? "bottom-8" : "top-8",
                  )}
                  onClick={() => setSelected(event)}
                  data-ocid={`timeline.event.${event.year}_${event.title.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-3 hover:border-primary/40 transition-all shadow-card hover:shadow-glow-accent">
                    <p className="text-xs font-mono text-muted-foreground">
                      {event.year}
                    </p>
                    <p className="text-sm font-semibold text-foreground line-clamp-2">
                      {event.title}
                    </p>
                    <span
                      className={cn(
                        "inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium border",
                        catColors[event.cat],
                      )}
                    >
                      {event.cat}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </SectionCard>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <SectionCard className="relative" data-ocid="timeline.detail_panel">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="timeline.close_detail_button"
              >
                ✕
              </button>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-mono font-bold text-primary">
                  {selected.year}
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium border",
                    catColors[selected.cat],
                  )}
                >
                  {selected.cat}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {selected.title}
              </h3>
              <p className="text-sm text-foreground mb-3">{selected.desc}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Key figures:</span>{" "}
                {selected.figures}
              </p>
            </SectionCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
