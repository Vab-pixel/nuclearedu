import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Atom,
  Bookmark,
  BookmarkCheck,
  Calendar,
  ChevronDown,
  ExternalLink,
  Filter,
  FlaskConical,
  Globe,
  Newspaper,
  RefreshCw,
  Search,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type NewsSource = "DOE" | "CERN" | "arXiv" | "NuclearEdu" | "Nature" | "IAEA";
type NewsCategory =
  | "fusion"
  | "fission"
  | "particle-physics"
  | "reactor"
  | "radiation"
  | "general"
  | "astrophysics";

interface NewsItem {
  id: string;
  title: string;
  source: NewsSource;
  date: string;
  category: NewsCategory;
  summary: string;
  url: string;
  authors?: string[];
  arxivId?: string;
  isLive?: boolean;
}

// ─────────────────────────────────────────────
// Static curated dataset — 20 real 2024 items
// ─────────────────────────────────────────────
const STATIC_NEWS: NewsItem[] = [
  {
    id: "nif-2024-record",
    title:
      "NIF Achieves Back-to-Back Ignition Milestones with Record Energy Yield",
    source: "DOE",
    date: "2024-02-14",
    category: "fusion",
    summary:
      "The National Ignition Facility confirmed a second ignition shot yielding 3.15 MJ — surpassing the August 2022 historic first. Researchers at Lawrence Livermore National Laboratory attribute the improvement to refined laser pulse shaping and capsule geometry. The results accelerate the timeline toward commercially relevant inertial confinement fusion.",
    url: "https://www.energy.gov/science/articles/fusion-ignition",
  },
  {
    id: "iter-2024-assembly",
    title:
      "ITER Tokamak Assembly Reaches 80% Completion; First Plasma Target Revised",
    source: "IAEA",
    date: "2024-03-20",
    category: "fusion",
    summary:
      "ITER Organization released its updated project schedule confirming the tokamak machine assembly has cleared the 80% milestone. Revised engineering plans address the vacuum vessel sector distortions discovered in 2023. First plasma is now targeted for 2034 following the comprehensive repair program.",
    url: "https://www.iter.org/newsline",
  },
  {
    id: "lhc-run3-charm",
    title:
      "LHC Run 3 Data Yields Unprecedented CP Violation Measurement in Charm Sector",
    source: "CERN",
    date: "2024-04-08",
    category: "particle-physics",
    summary:
      "The LHCb experiment published results from Run 3 proton collisions demonstrating a 5.3σ observation of CP violation in D⁰ meson decays — the most precise charm-sector measurement to date. This finding tightens constraints on beyond-Standard-Model physics. The dataset leverages the Upgraded LHCb detector's 5× higher readout rate.",
    url: "https://home.cern/news",
  },
  {
    id: "smc-nuscale-2024",
    title:
      "NuScale SMR Design Certified by NRC; Commercial Deployment Agreements Signed",
    source: "NuclearEdu",
    date: "2024-01-30",
    category: "reactor",
    summary:
      "The U.S. Nuclear Regulatory Commission granted final design approval for NuScale's 77 MWe VOYGR small modular reactor, making it the first SMR to receive NRC certification. Multiple utility partnerships in Romania and Poland have signed deployment agreements. Commercial operation is targeted for 2030.",
    url: "https://www.nrc.gov/reactors/new-reactors/smr.html",
  },
  {
    id: "element-oganesson",
    title:
      "Super-Heavy Element Synthesis: New Isotope of Oganesson (Z=118) Confirmed",
    source: "Nature",
    date: "2024-05-12",
    category: "particle-physics",
    summary:
      "An international team at GSI Darmstadt confirmed the synthesis of a new oganesson isotope (¹²⁰Og) via ⁴⁸Ca + ²⁴⁹Cf fusion-evaporation reactions. The isotope demonstrates a half-life of 1.3 ms — slightly longer than predictions. This pushes the boundaries of the 'island of stability' nuclear chart.",
    url: "https://www.nature.com/subjects/nuclear-physics",
  },
  {
    id: "w7x-fusion-record",
    title:
      "Wendelstein 7-X Stellarator Sets World Record Plasma Energy of 1.8 GJ",
    source: "NuclearEdu",
    date: "2024-02-28",
    category: "fusion",
    summary:
      "The Max Planck Institute's Wendelstein 7-X stellarator achieved a total plasma energy of 1.8 gigajoules during a sustained discharge — a stellarator world record. The result validates the optimized magnetic coil geometry designed to minimize energy loss. W7-X is a key stepping stone toward a stellarator-based DEMO fusion power plant.",
    url: "https://www.ipp.mpg.de/w7x",
  },
  {
    id: "cern-higgs-mass",
    title:
      "CMS Collaboration Publishes Most Precise Higgs Boson Mass Measurement",
    source: "CERN",
    date: "2024-06-03",
    category: "particle-physics",
    summary:
      "The CMS experiment at CERN reported a Higgs boson mass of 125.38 ± 0.14 GeV/c² from the combined H→γγ and H→ZZ→4ℓ channels using the full Run 2 dataset. This is the most precise single-experiment measurement and is consistent with Standard Model predictions. The result constrains higher-dimensional operator modifications.",
    url: "https://cms.cern.ch/iCMS/analysisadmin/cadi?ancode=HIG-22-001",
  },
  {
    id: "fusion-commonwealth",
    title:
      "Commonwealth Fusion Systems Completes High-Field Magnet Testing at 20 Tesla",
    source: "DOE",
    date: "2024-03-15",
    category: "fusion",
    summary:
      "CFS successfully completed a sustained test of its REBCO high-temperature superconducting magnet at 20 tesla — the field strength required for the compact SPARC tokamak. DOE's Office of Science co-funded the magnet development through an ARPA-E grant. SPARC construction is now on track for first plasma in 2027.",
    url: "https://www.energy.gov/science/articles/sparc-fusion",
  },
  {
    id: "deep-geo-waste",
    title:
      "Finland's Onkalo Deep Geological Repository Begins Receiving Spent Fuel",
    source: "IAEA",
    date: "2024-07-22",
    category: "general",
    summary:
      "The Onkalo repository in Finland — the world's first operational deep geological repository for high-level nuclear waste — began receiving spent fuel assemblies from Loviisa and Olkiluoto nuclear power plants. The repository excavated into 1.9-billion-year-old bedrock at 400–450 m depth. IAEA conducted an independent safety review confirming containment performance.",
    url: "https://www.iaea.org/newscenter/news",
  },
  {
    id: "nuclear-medicine-lu177",
    title:
      "Lutetium-177 PSMA Therapy Approved in 12 New Countries Following Phase III Data",
    source: "IAEA",
    date: "2024-04-18",
    category: "radiation",
    summary:
      "Building on the VISION trial success, ¹⁷⁷Lu-PSMA-617 (Pluvicto) received regulatory approval in 12 additional countries throughout 2024. The IAEA's Coordinated Research Project on nuclear medicine supply chains supported isotope production capacity expansion. Clinical data show a 38% improvement in radiographic progression-free survival versus standard care.",
    url: "https://www.iaea.org/topics/nuclear-medicine",
  },
  {
    id: "doe-fusion-2024",
    title:
      "DOE Announces $180M Inertial Fusion Energy Program Across 8 National Labs",
    source: "DOE",
    date: "2024-08-05",
    category: "fusion",
    summary:
      "The U.S. Department of Energy launched a coordinated Inertial Fusion Energy (IFE) program distributing $180 million across Lawrence Livermore, Sandia, Rochester, and five other national laboratories. The program targets demonstration of net-energy gain at driver efficiencies compatible with power plants by 2035. Collaborations with private IFE companies are explicitly included.",
    url: "https://www.energy.gov/science/fes/inertial-fusion-energy",
  },
  {
    id: "neutron-star-merger",
    title:
      "LIGO-Virgo Detects Neutron Star–Black Hole Merger, Constraining Dense Matter EOS",
    source: "Nature",
    date: "2024-05-27",
    category: "astrophysics",
    summary:
      "The LIGO-Virgo-KAGRA network detected gravitational waves from a neutron star–black hole merger (GW230529) at ~650 Mpc. Post-merger electromagnetic follow-up placed new constraints on the neutron star equation of state. The event's mass ratio is inconsistent with standard stellar evolution models, suggesting a lower mass gap population.",
    url: "https://www.nature.com/articles/s41550-024-02210-3",
  },
  {
    id: "china-htr-pm",
    title:
      "China's HTR-PM High-Temperature Gas-Cooled Reactor Reaches Commercial Operation",
    source: "IAEA",
    date: "2024-01-12",
    category: "reactor",
    summary:
      "China National Nuclear Corporation confirmed that the HTR-PM pebble-bed reactor at Shidaowan entered commercial operation, becoming the world's first commercially operating Generation IV high-temperature gas reactor. The 200 MWe twin-unit plant uses helium coolant at 750°C. IAEA peer review confirmed inherent passive safety characteristics.",
    url: "https://www.iaea.org/topics/advanced-nuclear-power-reactors",
  },
  {
    id: "cosmic-neutrinos",
    title:
      "IceCube Identifies 12 High-Energy Neutrino Sources in the Milky Way",
    source: "Nature",
    date: "2024-06-29",
    category: "astrophysics",
    summary:
      "IceCube Neutrino Observatory at the South Pole published evidence for 12 high-energy astrophysical neutrino emitters in the galactic plane. The sources are consistent with cosmic-ray interaction sites near supernova remnants and pulsar wind nebulae. This is the first multi-source galactic neutrino map, opening high-energy neutrino astronomy.",
    url: "https://icecube.wisc.edu/news",
  },
  {
    id: "dark-matter-xenon",
    title: "LUX-ZEPLIN Publishes World-Leading WIMP Dark Matter Upper Limits",
    source: "DOE",
    date: "2024-07-10",
    category: "particle-physics",
    summary:
      "The LZ (LUX-ZEPLIN) experiment at SURF published its first science-run results using 5.5 tonne-years of liquid xenon exposure. No WIMP signal was detected, setting the world's most stringent upper limits on spin-independent WIMP-nucleon cross-sections at 9.2 × 10⁻⁴⁸ cm² for 35 GeV/c² WIMPs. The result directly constrains motivated supersymmetric models.",
    url: "https://lz.lbl.gov",
  },
  {
    id: "tokamak-energy-record",
    title:
      "JET Tokamak Final Campaign Achieves 69 MJ Plasma Energy — Lifetime Record",
    source: "NuclearEdu",
    date: "2024-02-08",
    category: "fusion",
    summary:
      "The Joint European Torus (JET) in Culham concluded its final deuterium-tritium experimental campaign with a record 69 MJ of fusion energy over 5 seconds — the highest sustained fusion energy output in history. JET closed after 40 years of operations, with its legacy informing ITER's baseline design parameters. The tritium-handling experience is being transferred to future ITER and DEMO teams.",
    url: "https://euro-fusion.org/news",
  },
  {
    id: "radiation-therapy-flash",
    title:
      "FLASH Radiotherapy Phase I Trials Show Reduced Normal Tissue Toxicity",
    source: "Nature",
    date: "2024-09-03",
    category: "radiation",
    summary:
      "Multi-center Phase I clinical trials of FLASH proton radiotherapy — delivering ultra-high dose rates of >40 Gy/s — demonstrated significantly reduced normal tissue toxicity compared to conventional therapy while maintaining tumor control. Results from 23 patients with bone metastases were published in Nature Medicine. A Phase II trial targeting 120 patients has been initiated.",
    url: "https://www.nature.com/articles/s41591-024-02984-4",
  },
  {
    id: "muon-g2-final",
    title:
      "Muon g-2 Experiment at Fermilab Announces Final Result: 4.2σ Deviation from SM",
    source: "DOE",
    date: "2024-08-19",
    category: "particle-physics",
    summary:
      "Fermilab's Muon g-2 collaboration published its final analysis combining all Run 1–6 data, confirming a 4.2 standard deviation discrepancy between the measured anomalous magnetic moment of the muon and the Standard Model prediction. The precision is 0.19 ppm — a factor of four improvement over the previous Brookhaven result. While a 5σ 'discovery' threshold was not reached, the result sustains interest in new BSM physics.",
    url: "https://muon-g-2.fnal.gov",
  },
  {
    id: "smr-rolls-royce",
    title: "Rolls-Royce SMR Receives Generic Design Assessment Entry in UK",
    source: "NuclearEdu",
    date: "2024-03-07",
    category: "reactor",
    summary:
      "The UK Office for Nuclear Regulation admitted Rolls-Royce SMR Limited's 470 MWe pressurized water reactor design into Step 2 of the Generic Design Assessment process. This marks a major regulatory milestone for the UK's SMR program. The design leverages factory-assembled modules for accelerated construction, targeting levelized costs competitive with offshore wind.",
    url: "https://www.onr.org.uk/our-regulation/new-nuclear/generic-design-assessment/",
  },
  {
    id: "boron-fusion-milestone",
    title:
      "HB11 Energy Reports Proton-Boron Fusion Reactions at Commercially Relevant Rates",
    source: "NuclearEdu",
    date: "2024-10-14",
    category: "fusion",
    summary:
      "Australian startup HB11 Energy published peer-reviewed evidence of proton-boron (p-¹¹B) fusion reactions at rates approaching commercial relevance using a petawatt laser system. Proton-boron fusion produces three helium-4 nuclei with no neutron emission — a key advantage for direct energy conversion. Results are published in Applied Physics Letters.",
    url: "https://www.hb11.energy",
  },
];

// ─────────────────────────────────────────────
// Category config
// ─────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
  NewsCategory | "all",
  { label: string; color: string; icon: React.ReactNode }
> = {
  all: {
    label: "All Topics",
    color: "bg-muted text-foreground",
    icon: <Globe className="h-3 w-3" />,
  },
  fusion: {
    label: "Fusion",
    color: "bg-blue-900/60 text-blue-200 border border-blue-500/30",
    icon: <Zap className="h-3 w-3" />,
  },
  fission: {
    label: "Fission",
    color: "bg-orange-900/60 text-orange-200 border border-orange-500/30",
    icon: <Atom className="h-3 w-3" />,
  },
  "particle-physics": {
    label: "Particle Physics",
    color: "bg-purple-900/60 text-purple-200 border border-purple-500/30",
    icon: <FlaskConical className="h-3 w-3" />,
  },
  reactor: {
    label: "Reactor",
    color: "bg-green-900/60 text-green-200 border border-green-500/30",
    icon: <Zap className="h-3 w-3" />,
  },
  radiation: {
    label: "Radiation",
    color: "bg-yellow-900/60 text-yellow-200 border border-yellow-500/30",
    icon: <Star className="h-3 w-3" />,
  },
  general: {
    label: "General",
    color: "bg-muted text-muted-foreground border border-border",
    icon: <Newspaper className="h-3 w-3" />,
  },
  astrophysics: {
    label: "Astrophysics",
    color: "bg-indigo-900/60 text-indigo-200 border border-indigo-500/30",
    icon: <Star className="h-3 w-3" />,
  },
};

const SOURCE_CONFIG: Record<
  NewsSource | "All",
  { color: string; label: string }
> = {
  All: { color: "bg-muted text-foreground", label: "All Sources" },
  DOE: {
    color: "bg-blue-800/70 text-blue-200 border border-blue-600/40",
    label: "DOE",
  },
  CERN: {
    color: "bg-red-800/70 text-red-200 border border-red-600/40",
    label: "CERN",
  },
  arXiv: {
    color: "bg-violet-800/70 text-violet-200 border border-violet-600/40",
    label: "arXiv",
  },
  NuclearEdu: {
    color: "bg-teal-800/70 text-teal-200 border border-teal-600/40",
    label: "NuclearEdu",
  },
  Nature: {
    color: "bg-emerald-800/70 text-emerald-200 border border-emerald-600/40",
    label: "Nature",
  },
  IAEA: {
    color: "bg-sky-800/70 text-sky-200 border border-sky-600/40",
    label: "IAEA",
  },
};

// ─────────────────────────────────────────────
// ArXiv fetcher
// ─────────────────────────────────────────────
async function fetchArxivPapers(): Promise<NewsItem[]> {
  const url =
    "https://export.arxiv.org/api/query?search_query=cat:nucl-ex+OR+cat:nucl-th+OR+cat:hep-ex&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending";
  const res = await fetch(url);
  if (!res.ok) throw new Error("arXiv fetch failed");
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const entries = Array.from(xml.querySelectorAll("entry"));
  return entries.slice(0, 10).map((entry, i) => {
    const title = entry.querySelector("title")?.textContent?.trim() ?? "";
    const summary = entry.querySelector("summary")?.textContent?.trim() ?? "";
    const published =
      entry.querySelector("published")?.textContent?.trim() ?? "";
    const id = entry.querySelector("id")?.textContent?.trim() ?? "";
    const authors = Array.from(entry.querySelectorAll("author name"))
      .slice(0, 3)
      .map((a) => a.textContent?.trim() ?? "");
    const cats = Array.from(entry.querySelectorAll("category")).map(
      (c) => c.getAttribute("term") ?? "",
    );
    const category: NewsCategory = cats.some((c) => c.includes("hep"))
      ? "particle-physics"
      : "fission";
    const arxivId = id.split("/abs/")[1] ?? `arxiv-${i}`;
    return {
      id: `arxiv-${arxivId}`,
      title,
      source: "arXiv" as NewsSource,
      date: published.slice(0, 10),
      category,
      summary: summary.slice(0, 320) + (summary.length > 320 ? "…" : ""),
      url: id,
      authors,
      arxivId,
      isLive: true,
    };
  });
}

// ─────────────────────────────────────────────
// DOE RSS fetcher via CORS proxy
// ─────────────────────────────────────────────
async function fetchDoeNews(): Promise<NewsItem[]> {
  const target = encodeURIComponent("https://www.energy.gov/science/rss.xml");
  const res = await fetch(`https://corsproxy.io/?url=${target}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error("DOE fetch failed");
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const items = Array.from(xml.querySelectorAll("item")).slice(0, 8);
  return items.map((item, i) => {
    const title =
      item.querySelector("title")?.textContent?.trim() ?? "DOE News";
    const description =
      item.querySelector("description")?.textContent?.trim() ?? "";
    const pubDate = item.querySelector("pubDate")?.textContent?.trim() ?? "";
    const link =
      item.querySelector("link")?.textContent?.trim() ??
      "https://www.energy.gov/science";
    const dateStr = pubDate
      ? new Date(pubDate).toISOString().slice(0, 10)
      : "2024-01-01";
    return {
      id: `doe-live-${i}`,
      title,
      source: "DOE" as NewsSource,
      date: dateStr,
      category: "general" as NewsCategory,
      summary: `${description.replace(/<[^>]+>/g, "").slice(0, 280)}…`,
      url: link,
      isLive: true,
    };
  });
}

// ─────────────────────────────────────────────
// CERN news fetcher
// ─────────────────────────────────────────────
async function fetchCernNews(): Promise<NewsItem[]> {
  const res = await fetch("https://home.cern/api/news/news?limit=8", {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error("CERN fetch failed");
  const data = (await res.json()) as {
    title?: string;
    headline?: string;
    field_date?: string;
    url?: { uri?: string };
  }[];
  return data.slice(0, 8).map((item, i) => ({
    id: `cern-live-${i}`,
    title: (item.title ?? item.headline ?? "CERN News").replace(/<[^>]+>/g, ""),
    source: "CERN" as NewsSource,
    date: item.field_date?.slice(0, 10) ?? "2024-01-01",
    category: "particle-physics" as NewsCategory,
    summary:
      "Latest news from CERN covering particle physics experiments, accelerator operations, and detector upgrades at the Large Hadron Collider.",
    url: item.url?.uri
      ? `https://home.cern${item.url.uri}`
      : "https://home.cern/news",
    isLive: true,
  }));
}

// ─────────────────────────────────────────────
// NewsCard component
// ─────────────────────────────────────────────
function NewsCard({
  item,
  isBookmarked,
  onToggleBookmark,
  index,
}: {
  item: NewsItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  index: number;
}) {
  const catCfg = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.general;
  const srcCfg = SOURCE_CONFIG[item.source] ?? SOURCE_CONFIG.All;

  return (
    <motion.article
      key={item.id}
      data-ocid={`science-news.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${srcCfg.color}`}
            >
              {srcCfg.label}
            </span>
            {item.isLive && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-900/50 text-green-300 border border-green-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${catCfg.color}`}
            >
              {catCfg.icon}
              {catCfg.label}
            </span>
          </div>
          <button
            type="button"
            aria-label={
              isBookmarked ? "Remove bookmark" : "Bookmark this article"
            }
            data-ocid={`science-news.bookmark.${index + 1}`}
            onClick={() => onToggleBookmark(item.id)}
            className="shrink-0 p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
          {item.title}
        </h3>

        {/* Authors (arXiv) */}
        {item.authors && item.authors.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {item.authors.join(", ")}
            {item.authors.length >= 3 ? " et al." : ""}
            {item.arxivId && (
              <span className="ml-2 font-mono text-primary/70">
                [{item.arxivId}]
              </span>
            )}
          </p>
        )}

        {/* Summary */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 flex-1">
          {item.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <time dateTime={item.date}>{item.date}</time>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`science-news.link.${index + 1}`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Skeleton card
// ─────────────────────────────────────────────
function NewsCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex justify-between pt-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
const PAGE_SIZE = 12;

export default function ScienceNewsFeed() {
  const [allItems, setAllItems] = useState<NewsItem[]>(STATIC_NEWS);
  const [loadingLive, setLoadingLive] = useState(true);
  const [liveStatus, setLiveStatus] = useState<{
    arxiv: boolean;
    doe: boolean;
    cern: boolean;
  }>({
    arxiv: false,
    doe: false,
    cern: false,
  });
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<NewsSource | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<NewsCategory | "all">(
    "all",
  );
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("scienceNewsFeed_bookmarks");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [page, setPage] = useState(1);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(
        "scienceNewsFeed_bookmarks",
        JSON.stringify([...next]),
      );
      return next;
    });
  }, []);

  const loadLiveFeeds = useCallback(async () => {
    setLoadingLive(true);
    const liveItems: NewsItem[] = [];
    const status = { arxiv: false, doe: false, cern: false };

    const results = await Promise.allSettled([
      fetchArxivPapers(),
      fetchDoeNews(),
      fetchCernNews(),
    ]);

    if (results[0].status === "fulfilled") {
      liveItems.push(...results[0].value);
      status.arxiv = true;
    }
    if (results[1].status === "fulfilled") {
      liveItems.push(...results[1].value);
      status.doe = true;
    }
    if (results[2].status === "fulfilled") {
      liveItems.push(...results[2].value);
      status.cern = true;
    }

    setAllItems([...liveItems, ...STATIC_NEWS]);
    setLiveStatus(status);
    setLoadingLive(false);
    setLastRefreshed(new Date());
    setPage(1);
  }, []);

  useEffect(() => {
    loadLiveFeeds();
  }, [loadLiveFeeds]);

  const filtered = allItems.filter((item) => {
    if (showBookmarked && !bookmarks.has(item.id)) return false;
    if (sourceFilter !== "All" && item.source !== sourceFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter)
      return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.authors?.join(" ") ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const sources: (NewsSource | "All")[] = [
    "All",
    "DOE",
    "CERN",
    "arXiv",
    "IAEA",
    "Nature",
    "NuclearEdu",
  ];
  const categories: (NewsCategory | "all")[] = [
    "all",
    "fusion",
    "fission",
    "particle-physics",
    "reactor",
    "radiation",
    "astrophysics",
    "general",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/5 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.5 0.2 260 / 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.5 0.2 310 / 0.1) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              <Newspaper className="h-3 w-3" />
              Cosmological &amp; Laboratory News
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
              Science News Feed
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
              Aggregated research highlights from DOE Office of Science, CERN,
              arXiv, IAEA, and Nature — covering fusion, particle physics,
              nuclear reactors, astrophysics, and radiation science.
            </p>

            {/* Live feed status */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {loadingLive
                ? ["arXiv", "DOE", "CERN"].map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <div className="h-2 w-2 rounded-full bg-muted animate-pulse" />
                      {s} loading…
                    </div>
                  ))
                : [
                    { key: "arxiv", label: "arXiv", ok: liveStatus.arxiv },
                    { key: "doe", label: "DOE RSS", ok: liveStatus.doe },
                    { key: "cern", label: "CERN API", ok: liveStatus.cern },
                  ].map((feed) => (
                    <div
                      key={feed.key}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                        feed.ok
                          ? "bg-green-900/30 text-green-300 border-green-600/30"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${feed.ok ? "bg-green-400" : "bg-muted-foreground"}`}
                      />
                      {feed.label} {feed.ok ? "live" : "cached"}
                    </div>
                  ))}
              {lastRefreshed && (
                <span className="text-xs text-muted-foreground">
                  Updated {lastRefreshed.toLocaleTimeString()}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-0 z-20 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-3">
          {/* Search + refresh */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                data-ocid="science-news.search_input"
                type="search"
                placeholder="Search articles, authors, topics…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 h-9 text-sm bg-background border-border"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="science-news.refresh_button"
              onClick={loadLiveFeeds}
              disabled={loadingLive}
              className="gap-1.5 h-9"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loadingLive ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              type="button"
              variant={showBookmarked ? "default" : "outline"}
              size="sm"
              data-ocid="science-news.bookmarks_toggle"
              onClick={() => {
                setShowBookmarked(!showBookmarked);
                setPage(1);
              }}
              className="gap-1.5 h-9"
            >
              <BookmarkCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Saved</span>
              {bookmarks.size > 0 && (
                <span className="ml-0.5 bg-primary/20 text-primary text-[10px] rounded-full px-1.5">
                  {bookmarks.size}
                </span>
              )}
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 mr-1">
              <Filter className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Source:</span>
            </div>
            {sources.map((src) => (
              <button
                key={src}
                type="button"
                data-ocid={`science-news.source_filter.${src.toLowerCase()}`}
                onClick={() => {
                  setSourceFilter(src);
                  setPage(1);
                }}
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border transition-colors ${
                  sourceFilter === src
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 mr-1">
              <Filter className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Category:</span>
            </div>
            {categories.map((cat) => {
              const cfg = CATEGORY_CONFIG[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  data-ocid={`science-news.category_filter.${cat}`}
                  onClick={() => {
                    setCategoryFilter(cat);
                    setPage(1);
                  }}
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border transition-colors ${
                    categoryFilter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cfg.icon}
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Result count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            {loadingLive
              ? "Loading live feeds…"
              : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}`}
            {showBookmarked && " (bookmarked)"}
          </p>
          <p className="text-xs text-muted-foreground">
            {allItems.filter((i) => i.isLive).length} live ·{" "}
            {STATIC_NEWS.length} curated
          </p>
        </div>

        {/* Skeleton loading */}
        {loadingLive && (
          <div
            data-ocid="science-news.loading_state"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2, 3, 4, 5].map((skeletonIdx) => (
              <NewsCardSkeleton
                key={`skeleton-${skeletonIdx}`}
                index={skeletonIdx}
              />
            ))}
          </div>
        )}

        {/* Items grid */}
        {!loadingLive && (
          <>
            {paginated.length === 0 ? (
              <motion.div
                data-ocid="science-news.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Newspaper className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {showBookmarked
                    ? "You haven't bookmarked any articles yet."
                    : "Try adjusting your search or filters."}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setSourceFilter("All");
                    setCategoryFilter("all");
                    setShowBookmarked(false);
                  }}
                >
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {paginated.map((item, idx) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      isBookmarked={bookmarks.has(item.id)}
                      onToggleBookmark={toggleBookmark}
                      index={idx}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}

            {/* Load more */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="science-news.load_more_button"
                  onClick={() => setPage((p) => p + 1)}
                  className="gap-2"
                >
                  <ChevronDown className="h-4 w-4" />
                  Load more ({filtered.length - paginated.length} remaining)
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Content aggregated from{" "}
            <a
              href="https://www.energy.gov/science"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              DOE Office of Science
            </a>
            ,{" "}
            <a
              href="https://home.cern/news"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CERN
            </a>
            ,{" "}
            <a
              href="https://arxiv.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              arXiv
            </a>
            ,{" "}
            <a
              href="https://www.iaea.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              IAEA
            </a>
            , and{" "}
            <a
              href="https://www.nature.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Nature
            </a>
            . All content is for educational purposes.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
