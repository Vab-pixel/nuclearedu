import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Atom,
  BookOpen,
  ChevronRight,
  Clock,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Microscope,
  Network,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const topicCards = [
  {
    icon: Atom,
    title: "Nuclear Basics",
    description:
      "Explore atomic structure, isotopes, radioactivity, and mass-energy equivalence.",
    href: "/basics/atom-structure",
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
    available: true,
  },
  {
    icon: Zap,
    title: "Nuclear Reactions",
    description:
      "Understand radioactive decay, fission chain reactions, and the promise of fusion energy.",
    href: "/reactions/decay",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10 border-amber-400/20",
    available: true,
  },
  {
    icon: Activity,
    title: "Nuclear Reactors",
    description:
      "PWR, BWR, CANDU, and advanced Generation IV designs — how they work, components, and safety systems.",
    href: "/reactors/pwr",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
    available: true,
  },
  {
    icon: Shield,
    title: "Radiation & Detection",
    description:
      "Radiation types, interaction with matter, detection methods, dosimetry, and biological effects.",
    href: "/radiation/types",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/20",
    available: true,
  },
  {
    icon: FlaskConical,
    title: "Applications",
    description:
      "Nuclear power generation, medical imaging and cancer therapy, industrial tracers, and research reactors.",
    href: "/applications/power",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10 border-purple-400/20",
    available: true,
  },
  {
    icon: BookOpen,
    title: "Safety & Policy",
    description:
      "Regulatory frameworks, IAEA safeguards, accident analysis (TMI, Chernobyl, Fukushima), and waste management.",
    href: "/safety/principles",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10 border-rose-400/20",
    available: true,
  },
  {
    icon: Clock,
    title: "History of Nuclear Science",
    description:
      "From Becquerel's 1896 discovery through the Manhattan Project to modern fusion milestones.",
    href: "/history/timeline",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10 border-orange-400/20",
    available: true,
  },
  {
    icon: Network,
    title: "Data Explorer",
    description:
      "Interactive Chart of Nuclides, neutron cross-sections, decay chains, and live IAEA reactor data.",
    href: "/visualizations/nuclide-chart",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10 border-cyan-400/20",
    available: true,
  },
];

const vizCards = [
  {
    title: "Nucleus Visualizer",
    description:
      "3D interactive nucleus — adjust proton and neutron count, rotate, and inspect shell structure.",
    href: "/visualizations/nucleus",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10 border-cyan-400/20",
    badge: "WebGL · Three.js",
  },
  {
    title: "Decay Chain Explorer",
    description:
      "Step through the U-238 → Pb-206 decay chain, with Q-values, half-lives, and CSV export.",
    href: "/visualizations/decay-chain",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10 border-amber-400/20",
    badge: "D3 · SVG",
  },
  {
    title: "Chart of Nuclides",
    description:
      "Interactive Z–N heatmap of 50+ nuclides colored by decay mode, with filterable detail cards.",
    href: "/visualizations/nuclide-chart",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
    badge: "D3 · Heatmap",
  },
  {
    title: "Reactor Cross-Section",
    description:
      "Animated PWR cross-section — drag the control rod slider and watch power levels respond.",
    href: "/visualizations/reactor",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10 border-purple-400/20",
    badge: "SVG · Animated",
  },
];

const facts = [
  {
    icon: "⚛️",
    title: "Iron-56 is the most tightly bound nucleus",
    body: "At 8.79 MeV per nucleon, iron-56 has the highest binding energy per nucleon of any nucleus — the peak on the binding energy curve that explains why both fission and fusion release energy.",
  },
  {
    icon: "☢️",
    title: "One fuel pellet = 17,000 kWh",
    body: "A single uranium fuel pellet about the size of your fingertip contains the equivalent energy of 17,000 kilowatt-hours of electricity — equal to burning about 800 kg of coal.",
  },
  {
    icon: "🌟",
    title: "The Sun fuses 620 million tons of hydrogen every second",
    body: "Through the proton-proton chain, the Sun converts 620 million metric tons of hydrogen into helium each second — releasing energy equivalent to 4×10²⁶ watts continuously.",
  },
  {
    icon: "🌍",
    title: "Nuclear power: ~10% of global electricity, lowest land use",
    body: "Nuclear power provides approximately 10% of the world's electricity and has the lowest land footprint of any clean energy source — far less than wind or solar farms per unit of energy produced.",
  },
  {
    icon: "🔬",
    title: "Fusion ignition achieved December 5, 2022",
    body: "The National Ignition Facility (NIF) at Lawrence Livermore achieved nuclear fusion ignition — the first experiment where fusion energy output exceeded laser energy input — a landmark in the 70-year pursuit of fusion power.",
  },
  {
    icon: "💊",
    title: "Tc-99m powers 80% of nuclear medicine procedures",
    body: "Technetium-99m is the workhorse of nuclear medicine, used in ~40 million diagnostic procedures per year worldwide — yet its half-life is just 6 hours, requiring continuous production from Mo-99 generators.",
  },
  {
    icon: "🏔️",
    title: "World's first permanent nuclear waste repository: Onkalo",
    body: "Finland's Onkalo repository, carved 450 m deep into 1.9-billion-year-old granite bedrock, is the world's first approved permanent storage facility for high-level nuclear waste — designed to isolate it for 100,000 years.",
  },
  {
    icon: "🚀",
    title: "Fermium: discovered in the fallout of a hydrogen bomb",
    body: "Fermium (Z=100) was identified in 1952 in fallout from the Ivy Mike thermonuclear test — synthesized by rapid neutron capture in the intense nuclear flux of the explosion, and kept classified for two years.",
  },
  {
    icon: "🛸",
    title: "Nuclear batteries power Voyager, 22 billion km away",
    body: "Radioisotope thermoelectric generators (RTGs) fueled by Pu-238 have powered the Voyager spacecraft since 1977, now the most distant human-made objects at over 22 billion km from Earth — still transmitting data.",
  },
];

const learningPaths = [
  {
    icon: Users,
    audience: "Curious Citizen",
    dotClass: "bg-emerald-400",
    color: "border-emerald-400/30 hover:border-emerald-400/60",
    steps: [
      "Atom Structure & Isotopes",
      "Radioactivity Basics",
      "Nuclear Reactors (How They Work)",
      "Safety Principles & Accidents",
      "History: Manhattan Project to Today",
    ],
    cta: "/basics/atom-structure",
    description: "Start with the fundamentals. No math required.",
  },
  {
    icon: GraduationCap,
    audience: "Students",
    dotClass: "bg-blue-400",
    color: "border-blue-400/30 hover:border-blue-400/60",
    steps: [
      "Radioactivity & Decay Equations",
      "Fission, Fusion & Q-values",
      "Neutron Cross-Sections",
      "Applications: Power & Medicine",
      "Radiation Detection & Dosimetry",
    ],
    cta: "/basics/radioactivity",
    description: "Equations, worked examples, and interactive simulations.",
  },
  {
    icon: Microscope,
    audience: "Researchers & Engineers",
    dotClass: "bg-purple-400",
    color: "border-purple-400/30 hover:border-purple-400/60",
    steps: [
      "Chart of Nuclides & Cross-Sections",
      "Advanced Reactor Designs (Gen IV)",
      "Safety Principles & Regulatory Frameworks",
      "Decay Chains & Nuclear Data Export",
      "Technical References & Data Sources",
    ],
    cta: "/visualizations/nuclide-chart",
    description: "Nuclear data, derivations, and authoritative sources.",
  },
];

const faqs = [
  {
    q: "Is nuclear energy safe?",
    a: "Modern nuclear plants are among the safest energy sources per unit of electricity generated. Studies by the WHO and UNSCEAR consistently show nuclear power causes fewer deaths per terawatt-hour than fossil fuels. Passive safety features in Generation III+ and IV designs prevent accidents without operator action.",
  },
  {
    q: "What is radioactivity?",
    a: "Radioactivity is the spontaneous emission of radiation from an unstable atomic nucleus as it transforms toward a more stable configuration. Henri Becquerel discovered this phenomenon in 1896. Common types include alpha (helium nuclei), beta (electrons or positrons), and gamma (high-energy photons) radiation.",
  },
  {
    q: "What's the difference between fission and fusion?",
    a: "Fission splits heavy nuclei (like uranium-235) into lighter fragments, releasing ~200 MeV of energy per reaction. It powers all commercial nuclear plants today. Fusion combines light nuclei (like deuterium and tritium) into heavier ones, releasing even more energy per unit mass. Fusion powers stars — sustainable terrestrial fusion is under active research (ITER, NIF).",
  },
  {
    q: "What are Generation IV reactors?",
    a: "Generation IV (Gen IV) is a set of six advanced reactor concepts — including molten salt reactors (MSR), very high temperature reactors (VHTR), and sodium-cooled fast reactors (SFR) — selected by the Generation IV International Forum (GIF) for their potential to improve safety, sustainability, and economics. Key goals include passive safety (no operator action needed to prevent meltdown), closed fuel cycles that dramatically reduce long-lived waste, and the ability to use existing nuclear waste as fuel.",
  },
  {
    q: "Can nuclear waste ever become safe?",
    a: "Yes — on geological timescales. High-level waste is most hazardous in the first few hundred years as short-lived fission products decay. After 300–500 years, activity falls below uranium ore levels for most components. Long-lived actinides (plutonium, americium) require management over ~100,000 years, motivating deep geological repositories like Finland's Onkalo facility (450 m depth in granite) and advanced reactor designs that can transmute these actinides back into shorter-lived isotopes.",
  },
  {
    q: "Has nuclear fusion been achieved?",
    a: "Yes — in December 2022, the National Ignition Facility (NIF) at Lawrence Livermore National Laboratory achieved fusion ignition: the laser-driven fusion reaction produced more energy than the laser energy delivered to the target (yield >3.15 MJ vs. 2.05 MJ laser input). This was a historic scientific milestone. Commercial fusion power still faces major engineering challenges — containing a 100-million-degree plasma indefinitely — but ITER (under construction in France) and private ventures like Commonwealth Fusion Systems are making rapid progress.",
  },
  {
    q: "Is nuclear waste dangerous forever?",
    a: "No. High-level waste from reactors is intensely radioactive initially but most of that activity comes from fission products with half-lives of 30–100 years. After 300–500 years, the majority has decayed to below uranium ore radioactivity levels. Long-lived actinides (notably plutonium) require management over thousands of years — a key motivation for advanced reactor fuel cycles.",
  },
  {
    q: "Can a nuclear power plant explode like a bomb?",
    a: "No. Reactor-grade uranium fuel is enriched to 3–5% U-235 — far below the 90%+ needed for weapons. Reactor designs physically cannot sustain the supercritical excursion needed for a nuclear explosion. The Chernobyl accident was a steam explosion driven by reactor design flaws and operator error, not a nuclear detonation.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-background"
        aria-label="Hero section"
        data-ocid="home.hero_section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.75_0.2_256_/_0.12),transparent)]" />
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-36">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Badge className="audience-badge audience-intermediate">
                  Interactive Learning
                </Badge>
                <Badge className="audience-badge audience-advanced">
                  Nuclear Science
                </Badge>
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-tight">
                Explore <span className="text-primary">Everything</span> Nuclear
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
                A comprehensive, interactive educational platform covering
                nuclear science and engineering — from atomic structure and
                reactions to reactor design, radiation safety, applications in
                medicine and industry, waste management, and the history of
                nuclear discovery. Rigorous data, equations, and simulations for
                every audience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="font-semibold"
                  data-ocid="home.start_public_button"
                >
                  <Link to="/basics/atom-structure">
                    <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                    Start Exploring
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  data-ocid="home.student_button"
                >
                  <Link to="/basics/radioactivity">
                    <GraduationCap
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Student Track
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  data-ocid="home.visualizations_button"
                >
                  <Link to="/visualizations/nucleus">
                    <Network className="mr-2 h-4 w-4" aria-hidden="true" />
                    Interactive Tools
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-110"
                  aria-hidden="true"
                />
                <img
                  src="/assets/generated/hero-atom.dim_800x800.png"
                  alt="Stylized atom with glowing orbital rings representing nuclear science"
                  className="relative w-full max-w-sm lg:max-w-md rounded-2xl"
                  width={500}
                  height={500}
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Topic Cards */}
      <section
        className="bg-muted/20 py-16"
        aria-label="Topic areas"
        data-ocid="home.topics_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Explore by Topic
            </h2>
            <p className="mt-2 text-muted-foreground">
              Eight subject areas — from fundamental physics to safety, policy,
              and history
            </p>
          </motion.div>

          <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {topicCards.map((card, i) => (
              <motion.li
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                data-ocid={`home.topic_card.${i + 1}`}
              >
                {card.available ? (
                  <Link
                    to={card.href}
                    className={`group flex flex-col gap-3 rounded-xl border p-5 h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated bg-card ${card.bgColor}`}
                    aria-label={`${card.title} — ${card.description}`}
                  >
                    <TopicCardInner card={card} />
                  </Link>
                ) : (
                  <div
                    className={`flex flex-col gap-3 rounded-xl border p-5 h-full bg-card opacity-50 cursor-not-allowed ${card.bgColor}`}
                  >
                    <TopicCardInner card={card} comingSoon />
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Tools */}
      <section
        className="bg-background py-16"
        aria-label="Interactive visualization tools"
        data-ocid="home.viz_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <Network className="h-3.5 w-3.5" aria-hidden="true" />
              Interactive Tools
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Explore the Data Visually
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Four fully interactive visualizations — from a 3D nucleus builder
              to an animated reactor cross-section
            </p>
          </motion.div>

          <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {vizCards.map((card, i) => (
              <motion.li
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                data-ocid={`home.viz_card.${i + 1}`}
              >
                <Link
                  to={card.href}
                  className={`group flex flex-col gap-3 rounded-xl border p-5 h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated bg-card ${card.bgColor}`}
                  aria-label={`${card.title} — ${card.description}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-display font-semibold ${card.color}`}>
                      {card.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-muted-foreground/20 px-2 py-0.5 text-xs text-muted-foreground font-mono">
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${card.color} group-hover:gap-2 transition-all`}
                  >
                    Launch{" "}
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Did You Know */}
      <section
        className="bg-muted/20 py-16"
        aria-label="Nuclear science facts"
        data-ocid="home.facts_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Did You Know?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Nine surprising facts about nuclear science — from the cosmos to
              the clinic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact, i) => (
              <motion.article
                key={fact.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-xl border border-border bg-card p-5"
                data-ocid={`home.fact_card.${i + 1}`}
              >
                <div className="mb-3 text-2xl" aria-hidden="true">
                  {fact.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 leading-snug">
                  {fact.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fact.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section
        className="bg-background py-16"
        aria-label="Learning paths by audience"
        data-ocid="home.learning_paths_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Choose Your Learning Path
            </h2>
            <p className="mt-2 text-muted-foreground">
              Curated sequences designed for your background and goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {learningPaths.map((path, i) => (
              <motion.div
                key={path.audience}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`rounded-xl border p-5 bg-card transition-colors ${path.color}`}
                data-ocid={`home.learning_path.${i + 1}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${path.dotClass}`}
                    aria-hidden="true"
                  />
                  <span className="font-display font-semibold text-foreground">
                    {path.audience}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {path.description}
                </p>
                <ul
                  className="space-y-1.5 mb-5"
                  aria-label={`${path.audience} learning sequence`}
                >
                  {path.steps.map((step, si) => (
                    <li
                      key={step}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground"
                        aria-hidden="true"
                      >
                        {si + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                  data-ocid={`home.learning_path_cta.${i + 1}`}
                >
                  <Link to={path.cta}>
                    Start Path{" "}
                    <ChevronRight
                      className="ml-1 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-muted/20 py-16"
        aria-label="Frequently asked questions"
        data-ocid="home.faq_section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <div className="flex justify-center mb-3">
              <HelpCircle className="h-7 w-7 text-primary" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about nuclear science answered
            </p>
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            data-ocid="home.faq_accordion"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-lg border border-border bg-card px-4 data-[state=open]:border-primary/30"
                data-ocid={`home.faq_item.${i + 1}`}
              >
                <AccordionTrigger className="font-display text-sm font-semibold text-foreground hover:no-underline text-left py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function TopicCardInner({
  card,
  comingSoon,
}: {
  card: (typeof topicCards)[0];
  comingSoon?: boolean;
}) {
  const Icon = card.icon;
  return (
    <>
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg border ${card.bgColor}`}
      >
        <Icon className={`h-5 w-5 ${card.color}`} aria-hidden="true" />
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-foreground">
          {card.title}
        </h3>
        {comingSoon && (
          <span className="shrink-0 rounded-full border border-muted-foreground/30 px-2 py-0.5 text-xs text-muted-foreground">
            Soon
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {card.description}
      </p>
      {!comingSoon && (
        <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
          Explore <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
