import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import {
  BookOpen,
  ExternalLink,
  Filter,
  GraduationCap,
  Microscope,
  Rocket,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Difficulty = "Introductory" | "Intermediate" | "Advanced" | "Expert";
type Category =
  | "Reactor Physics"
  | "Radiation Safety"
  | "Nuclear Medicine"
  | "Fusion"
  | "Weapons History"
  | "Policy"
  | "General";
type SourceType =
  | "Textbook"
  | "IAEA"
  | "NRC"
  | "Nature/Science"
  | "Online"
  | "OECD";

interface ReadingItem {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: SourceType;
  difficulty: Difficulty;
  categories: Category[];
  abstract: string;
  url: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const readingItems: ReadingItem[] = [
  {
    id: "rl-01",
    title: "Nuclear Reactor Physics",
    authors: "Weston M. Stacey",
    year: 2018,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Reactor Physics"],
    abstract:
      "Comprehensive graduate-level treatment of reactor physics, covering neutron transport theory, diffusion, criticality, and reactor dynamics. Essential for advanced students and professionals.",
    url: "https://www.wiley.com/en-us/Nuclear+Reactor+Physics-p-9783527406791",
  },
  {
    id: "rl-02",
    title: "Introduction to Nuclear Engineering",
    authors: "John R. Lamarsh & Anthony J. Baratta",
    year: 2017,
    source: "Textbook",
    difficulty: "Intermediate",
    categories: ["Reactor Physics", "Radiation Safety"],
    abstract:
      "The standard undergraduate textbook covering nuclear reactions, reactor theory, radiation protection, and nuclear power systems. Widely used in university courses worldwide.",
    url: "https://www.pearson.com/en-us/subject-catalog/p/introduction-to-nuclear-engineering/P200000005792",
  },
  {
    id: "rl-03",
    title: "IAEA Safety Standards Series — Safety of Nuclear Power Plants",
    authors: "International Atomic Energy Agency",
    year: 2023,
    source: "IAEA",
    difficulty: "Intermediate",
    categories: ["Policy", "Radiation Safety"],
    abstract:
      "The IAEA's fundamental safety requirements for nuclear power plant design, operation, and decommissioning. Defines the global safety framework used by regulators worldwide.",
    url: "https://www.iaea.org/publications/standards",
  },
  {
    id: "rl-04",
    title: "Radiation Oncology Physics: A Handbook for Students and Teachers",
    authors: "IAEA-TECDOC",
    year: 2020,
    source: "IAEA",
    difficulty: "Advanced",
    categories: ["Nuclear Medicine", "Radiation Safety"],
    abstract:
      "Detailed guide to the physics of radiation therapy, covering dosimetry, treatment planning, and quality assurance for clinical medical physicists and radiation oncologists.",
    url: "https://www.iaea.org/publications/11928/radiation-oncology-physics",
  },
  {
    id: "rl-05",
    title: "The Making of the Atomic Bomb",
    authors: "Richard Rhodes",
    year: 1986,
    source: "Textbook",
    difficulty: "Introductory",
    categories: ["Weapons History", "General"],
    abstract:
      "Pulitzer Prize-winning historical narrative of the Manhattan Project, from the discovery of fission to the bombings of Hiroshima and Nagasaki. Accessible to general readers.",
    url: "https://www.simonandschuster.com/books/The-Making-of-the-Atomic-Bomb/Richard-Rhodes/9781451677614",
  },
  {
    id: "rl-06",
    title: "Nuclear Power Reactors in the World",
    authors: "IAEA Reference Data Series No. 2",
    year: 2024,
    source: "IAEA",
    difficulty: "Intermediate",
    categories: ["Reactor Physics", "Policy"],
    abstract:
      "Annual reference publication listing all nuclear power reactors worldwide, including operational status, type, capacity, and grid connection dates. Updated yearly.",
    url: "https://www.iaea.org/publications/15286/nuclear-power-reactors-in-the-world",
  },
  {
    id: "rl-07",
    title: "Fusion Energy Gain >1 at the National Ignition Facility",
    authors: "H. Abu-Shawareb et al. (NIF Collaboration)",
    year: 2022,
    source: "Nature/Science",
    difficulty: "Expert",
    categories: ["Fusion"],
    abstract:
      "Landmark paper reporting the first controlled fusion experiment to achieve energy gain greater than unity (Q > 1) using inertial confinement fusion at the NIF facility.",
    url: "https://www.nature.com/articles/s41586-022-05081-5",
  },
  {
    id: "rl-08",
    title:
      "NRC Regulatory Guide 1.174 — An Approach for Using Probabilistic Risk Assessment",
    authors: "U.S. Nuclear Regulatory Commission",
    year: 2018,
    source: "NRC",
    difficulty: "Intermediate",
    categories: ["Policy", "Radiation Safety"],
    abstract:
      "Guidance on using probabilistic risk assessment (PRA) in risk-informed regulatory decision-making for nuclear power plant licensing and operation.",
    url: "https://www.nrc.gov/reading-rm/doc-collections/reg-guides/power-reactors/",
  },
  {
    id: "rl-09",
    title: "Nuclear and Radiochemistry: Fundamentals and Applications",
    authors:
      "Gerhart Friedlander, Joseph W. Kennedy, Edward S. Macias, Julian M. Miller",
    year: 2018,
    source: "Textbook",
    difficulty: "Expert",
    categories: ["General", "Nuclear Medicine"],
    abstract:
      "The definitive reference on nuclear chemistry, covering radioactive decay, nuclear reactions, tracer applications, and radiochemical separation techniques.",
    url: "https://www.wiley.com/en-us/Nuclear+and+Radiochemistry%3A+Fundamentals+and+Applications-p-9783527323371",
  },
  {
    id: "rl-10",
    title: "Khan Academy — Nuclear Physics",
    authors: "Khan Academy",
    year: 2024,
    source: "Online",
    difficulty: "Introductory",
    categories: ["General"],
    abstract:
      "Free online course covering atomic nuclei, radioactive decay, half-life, nuclear reactions, and mass-energy equivalence. Includes practice exercises and videos.",
    url: "https://www.khanacademy.org/science/physics/quantum-physics/nuclei",
  },
  {
    id: "rl-11",
    title: "HyperPhysics — Nuclear Physics Section",
    authors: "Rod Nave, Georgia State University",
    year: 2024,
    source: "Online",
    difficulty: "Introductory",
    categories: ["General", "Reactor Physics"],
    abstract:
      "Extensive web-based physics resource with clear explanations, diagrams, and equations covering nuclear structure, decay modes, fission, fusion, and applications.",
    url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Nuclear/nuccon.html",
  },
  {
    id: "rl-12",
    title: "Small Modular Reactors: Nuclear Power Market Potential",
    authors: "OECD Nuclear Energy Agency",
    year: 2021,
    source: "OECD",
    difficulty: "Intermediate",
    categories: ["Reactor Physics", "Policy"],
    abstract:
      "Comprehensive assessment of SMR technology readiness, economics, licensing frameworks, and deployment scenarios across OECD member countries.",
    url: "https://www.oecd-nea.org/publications/small-modular-reactors",
  },
  {
    id: "rl-13",
    title: "Nuclear Medicine: The Requisites",
    authors: "Harvey A. Ziessman, Janis P. O'Malley, James H. Thrall",
    year: 2019,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Nuclear Medicine"],
    abstract:
      "Clinical reference for nuclear medicine physicians and technologists, covering diagnostic imaging, radionuclide therapy, PET/CT, and quality control procedures.",
    url: "https://www.elsevier.com/books/nuclear-medicine/ziessman/978-0-323-52499-2",
  },
  {
    id: "rl-14",
    title: "ITER: The World's Largest Tokamak",
    authors: "ITER Organization",
    year: 2024,
    source: "IAEA",
    difficulty: "Intermediate",
    categories: ["Fusion"],
    abstract:
      "Official documentation of the ITER project, the international experimental fusion reactor under construction in France, designed to demonstrate net fusion energy production.",
    url: "https://www.iter.org/",
  },
  {
    id: "rl-15",
    title: "Nuclear Reactor Safety: On the History of the Regulatory Process",
    authors: "David Okrent",
    year: 2015,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Policy", "Radiation Safety"],
    abstract:
      "Historical analysis of nuclear reactor safety regulation in the United States, examining the evolution of safety philosophy, major accidents, and regulatory responses.",
    url: "https://www.wiley.com/en-us/Nuclear+Reactor+Safety%3A+On+the+History+of+the+Regulatory+Process-p-9781119177910",
  },
  {
    id: "rl-16",
    title: "Physics of Uranium and Nuclear Energy",
    authors: "World Nuclear Association",
    year: 2024,
    source: "Online",
    difficulty: "Introductory",
    categories: ["Reactor Physics", "General"],
    abstract:
      "Accessible overview of uranium mining, enrichment, fuel fabrication, reactor physics, and the nuclear fuel cycle. Suitable for students and the general public.",
    url: "https://world-nuclear.org/nuclear-physics/introduction",
  },
  {
    id: "rl-17",
    title: "Nuclear Waste Management: An IAEA Source Book",
    authors: "International Atomic Energy Agency",
    year: 2022,
    source: "IAEA",
    difficulty: "Intermediate",
    categories: ["Policy", "Radiation Safety"],
    abstract:
      "Comprehensive guide to the management of radioactive waste, covering classification, treatment, storage, disposal, and international safety standards.",
    url: "https://www.iaea.org/topics/nuclear-waste",
  },
  {
    id: "rl-18",
    title: "The Effects of Nuclear Weapons",
    authors: "Samuel Glasstone & Philip J. Dolan",
    year: 1977,
    source: "Textbook",
    difficulty: "Expert",
    categories: ["Weapons History", "Radiation Safety"],
    abstract:
      "The classic reference on nuclear weapon effects, covering blast, thermal radiation, initial nuclear radiation, fallout, and electromagnetic pulse. Published by the U.S. DoD.",
    url: "https://www.fourmilab.ch/etexts/www/effects/",
  },
  {
    id: "rl-19",
    title: "Nuclear Physics: Principles and Applications",
    authors: "John Lilley",
    year: 2013,
    source: "Textbook",
    difficulty: "Intermediate",
    categories: ["General", "Reactor Physics"],
    abstract:
      "Undergraduate textbook bridging nuclear physics theory with real-world applications in medicine, energy, and industry. Includes problem sets and worked examples.",
    url: "https://www.wiley.com/en-us/Nuclear+Physics%3A+Principles+and+Applications-p-9780471979364",
  },
  {
    id: "rl-20",
    title: "NRC Reactor Concepts Manual",
    authors: "U.S. Nuclear Regulatory Commission",
    year: 2023,
    source: "NRC",
    difficulty: "Introductory",
    categories: ["Reactor Physics"],
    abstract:
      "Free educational resource explaining basic reactor concepts, reactor types, safety systems, and radiation protection for students and the general public.",
    url: "https://www.nrc.gov/reading-rm/basic-ref/teachers/reactor-concepts.html",
  },
  {
    id: "rl-21",
    title: "Fusion: The Energy of the Universe",
    authors: "Garry McCracken & Peter Stott",
    year: 2018,
    source: "Textbook",
    difficulty: "Intermediate",
    categories: ["Fusion"],
    abstract:
      "Accessible introduction to fusion energy science, covering plasma physics, magnetic confinement, inertial confinement, and the path to commercial fusion power.",
    url: "https://www.elsevier.com/books/fusion/mccracken/978-0-12-384656-3",
  },
  {
    id: "rl-22",
    title: "Nuclear Medicine and PET/CT: Technology and Techniques",
    authors: "Paul E. Christian, Kristen M. Waterstram-Rich",
    year: 2021,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Nuclear Medicine"],
    abstract:
      "Comprehensive clinical guide to nuclear medicine instrumentation, radiopharmacy, SPECT/CT, PET/CT, and therapeutic nuclear medicine procedures.",
    url: "https://www.elsevier.com/books/nuclear-medicine-and-pet-ct/christian/978-0-323-55331-2",
  },
  {
    id: "rl-23",
    title: "Atoms for Peace and War: The United States and Atomic Energy",
    authors: "Richard G. Hewlett & Jack M. Holl",
    year: 1989,
    source: "Textbook",
    difficulty: "Intermediate",
    categories: ["Weapons History", "Policy"],
    abstract:
      "Official history of the U.S. Atomic Energy Commission, documenting the transition from wartime weapons program to civilian nuclear power and international cooperation.",
    url: "https://www.energy.gov/history/atoms-peace-and-war",
  },
  {
    id: "rl-24",
    title: "Health Physics and Radiological Health",
    authors: "Thomas E. Johnson & Brian K. Birky",
    year: 2020,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Radiation Safety"],
    abstract:
      "Comprehensive reference on radiation protection, dosimetry, shielding, and regulatory compliance for health physicists and radiation safety officers.",
    url: "https://www.wiley.com/en-us/Health+Physics+and+Radiological+Health-p-9781119417856",
  },
  {
    id: "rl-25",
    title:
      "Nuclear Energy: An Introduction to the Concepts, Systems, and Applications",
    authors: "Raymond L. Murray & Keith E. Holbert",
    year: 2019,
    source: "Textbook",
    difficulty: "Intermediate",
    categories: ["Reactor Physics", "General"],
    abstract:
      "Broad overview of nuclear energy systems, from reactor physics and design to waste management and non-proliferation. Suitable for engineering students.",
    url: "https://www.elsevier.com/books/nuclear-energy/murray/978-0-12-416654-7",
  },
  {
    id: "rl-26",
    title: "Nuclear Non-Proliferation in International Law",
    authors: "Daniel H. Joyner",
    year: 2016,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Policy", "Weapons History"],
    abstract:
      "Legal analysis of the Nuclear Non-Proliferation Treaty (NPT), IAEA safeguards, and the international legal framework governing nuclear weapons and peaceful uses.",
    url: "https://www.e-elgar.com/shop/usd/nuclear-non-proliferation-in-international-law-9781784713456.html",
  },
  {
    id: "rl-27",
    title: "Nuclear Reactor Thermal Hydraulics",
    authors: "Robert E. Masterson",
    year: 2020,
    source: "Textbook",
    difficulty: "Expert",
    categories: ["Reactor Physics"],
    abstract:
      "Advanced treatment of heat transfer, fluid flow, and thermal design in nuclear reactors, covering single-phase and two-phase flow, critical heat flux, and safety analysis.",
    url: "https://www.springer.com/gp/book/9783030267377",
  },
  {
    id: "rl-28",
    title: "Nuclear Power: A Very Short Introduction",
    authors: "Maxwell Irvine",
    year: 2020,
    source: "Textbook",
    difficulty: "Introductory",
    categories: ["General", "Reactor Physics"],
    abstract:
      "Concise, accessible introduction to nuclear power for general readers. Covers reactor types, safety, waste, economics, and the future of nuclear energy.",
    url: "https://global.oup.com/academic/product/nuclear-power-a-very-short-introduction-9780198811998",
  },
  {
    id: "rl-29",
    title: "Nuclear Fuel Cycle Science and Engineering",
    authors: "Ian Crossland",
    year: 2012,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Reactor Physics", "Policy"],
    abstract:
      "Comprehensive coverage of the nuclear fuel cycle from uranium mining through enrichment, fuel fabrication, reactor use, reprocessing, and waste disposal.",
    url: "https://www.woodheadpublishing.com/book/9780857090737",
  },
  {
    id: "rl-30",
    title:
      "Nuclear Engineering: Theory and Technology of Commercial Nuclear Power",
    authors: "Ronald Allen Knief",
    year: 2008,
    source: "Textbook",
    difficulty: "Advanced",
    categories: ["Reactor Physics"],
    abstract:
      "Detailed engineering reference on commercial nuclear power plant design, operation, and safety systems. Includes reactor physics, thermal hydraulics, and materials.",
    url: "https://www.ans.org/store/item-690017/",
  },
  {
    id: "rl-31",
    title:
      "Nuclear Energy in the 21st Century: World Nuclear University Primer",
    authors: "Ian Hore-Lacy",
    year: 2022,
    source: "Textbook",
    difficulty: "Introductory",
    categories: ["General", "Policy"],
    abstract:
      "Introductory primer from the World Nuclear University, covering nuclear energy basics, reactor technology, safety, waste management, and the role of nuclear in climate change mitigation.",
    url: "https://www.world-nuclear-university.org/",
  },
  {
    id: "rl-32",
    title: "Nuclear Reactor Analysis",
    authors: "James J. Duderstadt & Louis J. Hamilton",
    year: 1976,
    source: "Textbook",
    difficulty: "Expert",
    categories: ["Reactor Physics"],
    abstract:
      "Classic graduate-level text on nuclear reactor theory, covering neutron transport, diffusion theory, criticality, reactor kinetics, and fuel depletion. Still widely referenced.",
    url: "https://www.wiley.com/en-us/Nuclear+Reactor+Analysis-p-9780471223635",
  },
  {
    id: "rl-33",
    title: "Nuclear Medicine Physics: The Basics",
    authors: "Ramesh Chandra",
    year: 2018,
    source: "Textbook",
    difficulty: "Intermediate",
    categories: ["Nuclear Medicine"],
    abstract:
      "Introductory text on the physics of nuclear medicine imaging and therapy, covering radiation detection, image formation, dosimetry, and quality assurance.",
    url: "https://www.wolterskluwer.com/en/solutions/ovid/nuclear-medicine-physics-the-basics",
  },
  {
    id: "rl-34",
    title: "Nuclear Power and the Environment",
    authors: "OECD Nuclear Energy Agency",
    year: 2023,
    source: "OECD",
    difficulty: "Intermediate",
    categories: ["Policy", "General"],
    abstract:
      "Assessment of the environmental impacts of nuclear power, including lifecycle emissions, land use, water consumption, and comparison with other low-carbon energy sources.",
    url: "https://www.oecd-nea.org/publications/environment",
  },
  {
    id: "rl-35",
    title: "Nuclear Criticality Safety: Theory and Practice",
    authors: "Ronald D. Carter, G. Elizabeth Whitesides, & G. Robert K. Dwight",
    year: 2019,
    source: "Textbook",
    difficulty: "Expert",
    categories: ["Radiation Safety", "Reactor Physics"],
    abstract:
      "Advanced reference on nuclear criticality safety, covering critical mass calculations, administrative controls, and engineering controls for fissile material handling.",
    url: "https://www.ans.org/store/item-690018/",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const difficultyOrder: Record<Difficulty, number> = {
  Introductory: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
};

const difficultyColors: Record<Difficulty, string> = {
  Introductory: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Advanced: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Expert: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

const sourceColors: Record<SourceType, string> = {
  Textbook: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  IAEA: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  NRC: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Nature/Science": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  Online: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  OECD: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
};

const audienceDifficultyMap: Record<string, Difficulty[]> = {
  public: ["Introductory"],
  student: ["Introductory", "Intermediate"],
  researcher: ["Introductory", "Intermediate", "Advanced", "Expert"],
};

// ── Component ────────────────────────────────────────────────────────────────

export default function ReadingList() {
  const { audienceLevel } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    "all",
  );
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<SourceType | "all">("all");
  const [sortBy, setSortBy] = useState<"year" | "difficulty" | "relevance">(
    "relevance",
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<"all" | "for-you">("all");

  const allCategories = useMemo(
    () => Array.from(new Set(readingItems.flatMap((i) => i.categories))).sort(),
    [],
  );

  const allSources = useMemo(
    () => Array.from(new Set(readingItems.map((i) => i.source))).sort(),
    [],
  );

  const filteredItems = useMemo(() => {
    let items = [...readingItems];

    // Tab filter
    if (activeTab === "for-you") {
      const allowed = audienceDifficultyMap[audienceLevel] ?? ["Introductory"];
      items = items.filter((i) => allowed.includes(i.difficulty));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.authors.toLowerCase().includes(q) ||
          i.categories.some((c) => c.toLowerCase().includes(q)) ||
          i.abstract.toLowerCase().includes(q),
      );
    }

    // Filters
    if (difficultyFilter !== "all") {
      items = items.filter((i) => i.difficulty === difficultyFilter);
    }
    if (categoryFilter !== "all") {
      items = items.filter((i) => i.categories.includes(categoryFilter));
    }
    if (sourceFilter !== "all") {
      items = items.filter((i) => i.source === sourceFilter);
    }

    // Sort
    items.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "year") cmp = a.year - b.year;
      else if (sortBy === "difficulty")
        cmp = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      else {
        // relevance: newer + higher difficulty first
        cmp = a.year - b.year;
        if (cmp === 0)
          cmp = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return items;
  }, [
    searchQuery,
    difficultyFilter,
    categoryFilter,
    sourceFilter,
    sortBy,
    sortDir,
    activeTab,
    audienceLevel,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setCategoryFilter("all");
    setSourceFilter("all");
    setSortBy("relevance");
    setSortDir("desc");
  };

  const hasActiveFilters =
    searchQuery ||
    difficultyFilter !== "all" ||
    categoryFilter !== "all" ||
    sourceFilter !== "all";

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <PageHeader
        title="Annotated Reading List"
        subtitle="Curated textbooks, technical reports, and online resources for nuclear science — from introductory primers to expert references."
        readTimeMin={8}
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          data-ocid="reading-list.tab.all"
          className={[
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
            activeTab === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
          ].join(" ")}
        >
          All Resources
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("for-you")}
          data-ocid="reading-list.tab.for-you"
          className={[
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border inline-flex items-center gap-1.5",
            activeTab === "for-you"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
          ].join(" ")}
        >
          {audienceLevel === "public" && <Rocket className="h-3.5 w-3.5" />}
          {audienceLevel === "student" && (
            <GraduationCap className="h-3.5 w-3.5" />
          )}
          {audienceLevel === "researcher" && (
            <Microscope className="h-3.5 w-3.5" />
          )}
          For Your Level
        </button>
      </div>

      {/* Search & Filters */}
      <SectionCard className="mb-6 p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-ocid="reading-list.search_input"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              Filters:
            </div>

            {/* Difficulty */}
            <select
              value={difficultyFilter}
              onChange={(e) =>
                setDifficultyFilter(e.target.value as Difficulty | "all")
              }
              data-ocid="reading-list.filter.difficulty"
              className="bg-background border border-border rounded-md px-2 py-1 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary"
            >
              <option value="all">All Levels</option>
              <option value="Introductory">Introductory</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as Category | "all")
              }
              data-ocid="reading-list.filter.category"
              className="bg-background border border-border rounded-md px-2 py-1 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary"
            >
              <option value="all">All Categories</option>
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Source */}
            <select
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(e.target.value as SourceType | "all")
              }
              data-ocid="reading-list.filter.source"
              className="bg-background border border-border rounded-md px-2 py-1 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary"
            >
              <option value="all">All Sources</option>
              {allSources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Sort */}
            <div className="flex items-center gap-1 ml-auto">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "year" | "difficulty" | "relevance",
                  )
                }
                data-ocid="reading-list.sort.select"
                className="bg-background border border-border rounded-md px-2 py-1 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="year">Year</option>
                <option value="difficulty">Difficulty</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                }
                data-ocid="reading-list.sort.direction"
                className="p-1 rounded-md border border-border hover:bg-muted/50 transition-colors"
                aria-label={
                  sortDir === "asc" ? "Sort descending" : "Sort ascending"
                }
              >
                {sortDir === "asc" ? (
                  <SortAsc className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <SortDesc className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </button>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground h-7"
                data-ocid="reading-list.clear_filters"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing{" "}
        <span className="font-medium text-foreground">
          {filteredItems.length}
        </span>{" "}
        of {readingItems.length} resources
        {activeTab === "for-you" && (
          <span className="ml-1">
            (filtered for <span className="capitalize">{audienceLevel}</span>{" "}
            level)
          </span>
        )}
      </p>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <SectionCard
          className="text-center py-12"
          data-ocid="reading-list.empty_state"
        >
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">
            No resources match your filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </SectionCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              data-ocid={`reading-list.item.${index + 1}`}
            >
              <SectionCard className="h-full flex flex-col hover:border-primary/30 transition-colors">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {item.authors}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] shrink-0 ${difficultyColors[item.difficulty]}`}
                  >
                    {item.difficulty}
                  </Badge>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${sourceColors[item.source]}`}
                  >
                    {item.source}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.year}
                  </span>
                  {item.categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-[10px] text-muted-foreground border-border"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                {/* Abstract */}
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                  {item.abstract}
                </p>

                {/* Link */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`reading-list.item.link.${index + 1}`}
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Resource
                </a>
              </SectionCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
