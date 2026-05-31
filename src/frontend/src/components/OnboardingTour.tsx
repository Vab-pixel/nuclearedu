import { useAppStore } from "@/store/useAppStore";
import { Link } from "@tanstack/react-router";
import {
  Atom,
  BookOpen,
  FlaskConical,
  Microscope,
  Rocket,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STEPS = [
  {
    id: "welcome",
    title: "Welcome to NuclearEdu",
    description: "Select your role to personalize your experience.",
  },
  {
    id: "visualizations",
    title: "Explore Visualizations",
    description: "Dive into interactive 3D models and data visualizations.",
  },
  {
    id: "tools",
    title: "Powerful Tools",
    description: "Use calculators, simulators, and research tools.",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Start exploring nuclear science.",
  },
];

const ROLE_CARDS = [
  {
    id: "student" as const,
    label: "Student",
    description: "Learning nuclear science for school or university",
    icon: BookOpen,
    level: "student" as const,
  },
  {
    id: "researcher" as const,
    label: "Researcher / Professional",
    description: "Working in nuclear energy, medicine, or research",
    icon: Microscope,
    level: "researcher" as const,
  },
  {
    id: "public" as const,
    label: "Curious Explorer",
    description: "Interested in nuclear science and want to explore",
    icon: Rocket,
    level: "public" as const,
  },
];

const VIZ_HIGHLIGHTS = [
  {
    title: "3D Nucleus Visualizer",
    description: "Interactive 3D model of atomic nuclei with decay animations",
    href: "/visualizations/nucleus",
    icon: Atom,
  },
  {
    title: "Chart of Nuclides",
    description: "Comprehensive map of all known isotopes with live data",
    href: "/visualizations/nuclide-chart",
    icon: FlaskConical,
  },
  {
    title: "Reactor Digital Twin",
    description: "Real-time reactor simulation with physics controls",
    href: "/visualizations/reactor",
    icon: Atom,
  },
];

const TOOL_HIGHLIGHTS = [
  {
    title: "Carbon Dating Calculator",
    description: "Calculate sample ages using radiocarbon decay",
    href: "/tools/carbon-dating",
    icon: FlaskConical,
  },
  {
    title: "Decay Chain Explorer",
    description: "Visualize radioactive decay series interactively",
    href: "/visualizations/decay-chain",
    icon: Atom,
  },
  {
    title: "Monte Carlo Sim",
    description: "Stochastic neutron transport simulation",
    href: "/tools/monte-carlo-sim",
    icon: FlaskConical,
  },
];

export default function OnboardingTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const setAudienceLevel = useAppStore((s) => s.setAudienceLevel);

  useEffect(() => {
    const completed = localStorage.getItem("onboardingComplete");
    if (!completed) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShow(false);
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShow(false);
  };

  const handleRoleSelect = (level: "student" | "researcher" | "public") => {
    setSelectedRole(level);
    setAudienceLevel(level);
  };

  const canProceed = step !== 0 || selectedRole !== null;

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const getWelcomeMessage = () => {
    switch (selectedRole) {
      case "student":
        return "Welcome, Student! Start with the Basics section or take a quiz in the Learning Lab.";
      case "researcher":
        return "Welcome, Researcher! Explore the Data Explorer and advanced visualizations.";
      default:
        return "Welcome, Explorer! Start with the 3D Nucleus Visualizer or browse the Basics.";
    }
  };

  const getCTAs = () => {
    switch (selectedRole) {
      case "student":
        return [
          { label: "Start Learning", href: "/basics/atom-structure" },
          { label: "Take a Quiz", href: "/learning-lab" },
          { label: "Explore Visualizations", href: "/visualizations/nucleus" },
        ];
      case "researcher":
        return [
          { label: "Data Explorer", href: "/tools/data-explorer" },
          { label: "Nuclide Chart", href: "/visualizations/nuclide-chart" },
          { label: "Reactor Sim", href: "/visualizations/reactor" },
        ];
      default:
        return [
          { label: "3D Nucleus", href: "/visualizations/nucleus" },
          { label: "Basics", href: "/basics/atom-structure" },
          { label: "Learning Lab", href: "/learning-lab" },
        ];
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleSkip();
        }}
        data-ocid="onboarding-tour.modal"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[600px] mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                <Atom className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground text-sm">
                Nuclear<span className="text-primary">Edu</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              aria-label="Skip tour"
              data-ocid="onboarding-tour.skip_button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 px-6 py-3">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (i < step || (i === 1 && selectedRole !== null))
                    setStep(i);
                }}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === step
                    ? "w-6 bg-primary"
                    : i < step
                      ? "w-2 bg-primary/60"
                      : "w-2 bg-muted",
                ].join(" ")}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 pb-2 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-lg font-display font-bold text-foreground mb-1">
                  {STEPS[step].title}
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {STEPS[step].description}
                </p>

                {/* Step 1: Role Selection */}
                {step === 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    {ROLE_CARDS.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRole === role.level;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelect(role.level)}
                          data-ocid={`onboarding-tour.role.${role.id}`}
                          className={[
                            "flex items-start gap-3 p-4 rounded-lg border text-left transition-all",
                            isSelected
                              ? "border-cyan-400/60 bg-cyan-400/5 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                              : "border-border hover:border-foreground/30 hover:bg-muted/30",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
                              isSelected ? "bg-cyan-400/15" : "bg-muted/50",
                            ].join(" ")}
                          >
                            <Icon
                              className={[
                                "h-4.5 w-4.5",
                                isSelected
                                  ? "text-cyan-400"
                                  : "text-muted-foreground",
                              ].join(" ")}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {role.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {role.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                    {!selectedRole && (
                      <p className="text-xs text-amber-400 text-center">
                        Select a role to continue
                      </p>
                    )}
                  </div>
                )}

                {/* Step 2: Visualizations */}
                {step === 1 && (
                  <div className="grid grid-cols-1 gap-3">
                    {VIZ_HIGHLIGHTS.map((viz) => {
                      const Icon = viz.icon;
                      return (
                        <Link
                          key={viz.title}
                          to={viz.href}
                          onClick={handleClose}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/30 transition-all"
                          data-ocid={`onboarding-tour.viz.${viz.href.replace(/\//g, "_")}`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {viz.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {viz.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Step 3: Tools */}
                {step === 2 && (
                  <div className="grid grid-cols-1 gap-3">
                    {TOOL_HIGHLIGHTS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.title}
                          to={tool.href}
                          onClick={handleClose}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/30 transition-all"
                          data-ocid={`onboarding-tour.tool.${tool.href.replace(/\//g, "_")}`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {tool.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Step 4: Complete */}
                {step === 3 && (
                  <div className="text-center py-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <Rocket className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-sm text-foreground mb-5">
                      {getWelcomeMessage()}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {getCTAs().map((cta) => (
                        <Link
                          key={cta.href}
                          to={cta.href}
                          onClick={handleClose}
                          data-ocid={`onboarding-tour.cta.${cta.href.replace(/\//g, "_")}`}
                        >
                          <button
                            type="button"
                            className="rounded-lg px-4 py-2 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            {cta.label}
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="onboarding-tour.skip_text"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium border border-border hover:bg-muted/50 transition-colors"
                  data-ocid="onboarding-tour.prev_button"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className={[
                  "rounded-lg px-4 py-1.5 text-xs font-medium transition-colors",
                  canProceed
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                ].join(" ")}
                data-ocid="onboarding-tour.next_button"
              >
                {step === STEPS.length - 1 ? "Get Started" : "Next"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
