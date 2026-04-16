import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { AudienceLevel } from "@/store/useAppStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { Atom, ChevronDown, FlaskConical, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Basics", href: "/basics/atom-structure" },
  { label: "Reactions", href: "/reactions/decay" },
  { label: "Reactors", href: "/reactors/pwr" },
  { label: "Radiation", href: "/radiation/types" },
  { label: "Glossary", href: "/glossary" },
  { label: "About", href: "/about" },
];

const vizLinks = [
  { label: "Nucleus Visualizer", href: "/visualizations/nucleus" },
  { label: "Decay Chain Explorer", href: "/visualizations/decay-chain" },
  { label: "Chart of Nuclides", href: "/visualizations/nuclide-chart" },
  { label: "Reactor Cross-Section", href: "/visualizations/reactor" },
];

const audienceOptions: {
  value: AudienceLevel;
  label: string;
  dotClass: string;
}[] = [
  { value: "public", label: "General Public", dotClass: "bg-emerald-400" },
  { value: "student", label: "Student", dotClass: "bg-blue-400" },
  { value: "researcher", label: "Researcher", dotClass: "bg-purple-400" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [vizOpen, setVizOpen] = useState(false);
  const { audienceLevel, setAudienceLevel } = useAppStore();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const currentAudience =
    audienceOptions.find((a) => a.value === audienceLevel) ??
    audienceOptions[0];

  function selectAudience(val: AudienceLevel) {
    setAudienceLevel(val);
    setAudienceOpen(false);
  }

  function isNavActive(href: string) {
    const parts = href.split("/");
    const base = `/${parts[1]}`;
    return pathname.startsWith(base) && base.length > 1;
  }

  const isVizActive = pathname.startsWith("/visualizations");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 glow-focus rounded-md"
          aria-label="NuclearEdu — Home"
          data-ocid="nav.home_link"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Atom className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Nuclear<span className="text-primary">Edu</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = isNavActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-colors glow-focus",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}

          {/* Visualizations dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setVizOpen((v) => !v)}
              className={cn(
                "relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors glow-focus",
                isVizActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-expanded={vizOpen}
              aria-haspopup="true"
              data-ocid="nav.visualizations_dropdown"
            >
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              Visualizations
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  vizOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
              {isVizActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
            <AnimatePresence>
              {vizOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-lg border border-border bg-popover p-1 shadow-elevated"
                  role="menu"
                  aria-label="Visualization pages"
                >
                  {vizLinks.map((v) => (
                    <Link
                      key={v.href}
                      to={v.href}
                      role="menuitem"
                      onClick={() => setVizOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted glow-focus",
                        pathname === v.href
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground",
                      )}
                      data-ocid={`nav.viz_${v.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    >
                      {v.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {vizOpen && (
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setVizOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && setVizOpen(false)}
                aria-hidden="true"
              />
            )}
          </div>
        </nav>

        {/* Audience Selector */}
        <div className="hidden md:flex items-center relative">
          <button
            type="button"
            onClick={() => setAudienceOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted glow-focus"
            aria-expanded={audienceOpen}
            aria-haspopup="true"
            aria-label={`Audience: ${currentAudience.label}`}
            data-ocid="nav.audience_select"
          >
            <span
              className={cn("h-2 w-2 rounded-full", currentAudience.dotClass)}
              aria-hidden="true"
            />
            <span className="text-foreground">{currentAudience.label}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                audienceOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
          <AnimatePresence>
            {audienceOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-popover p-1 shadow-elevated"
                role="menu"
                aria-label="Select audience level"
              >
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="menuitem"
                    onClick={() => selectAudience(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted glow-focus",
                      audienceLevel === opt.value
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground",
                    )}
                    data-ocid={`nav.audience_option_${opt.value}`}
                  >
                    <span
                      className={cn("h-2 w-2 rounded-full", opt.dotClass)}
                      aria-hidden="true"
                    />
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {audienceOpen && (
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setAudienceOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setAudienceOpen(false)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors glow-focus"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          data-ocid="nav.mobile_menu_toggle"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden border-t border-border bg-card"
          >
            <nav
              className="flex flex-col p-4 gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors glow-focus",
                    isNavActive(link.href)
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                  data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Visualizations */}
              <div className="mt-1 border-t border-border pt-2">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Visualizations
                </p>
                {vizLinks.map((v) => (
                  <Link
                    key={v.href}
                    to={v.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted glow-focus",
                      pathname === v.href
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    data-ocid="nav.mobile_viz_link"
                  >
                    <FlaskConical
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {v.label}
                  </Link>
                ))}
              </div>

              <div className="mt-2 border-t border-border pt-3">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Audience
                </p>
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setAudienceLevel(opt.value);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted glow-focus",
                      audienceLevel === opt.value
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                    data-ocid={`nav.mobile_audience_${opt.value}`}
                  >
                    <span
                      className={cn("h-2 w-2 rounded-full", opt.dotClass)}
                      aria-hidden="true"
                    />
                    {opt.label}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
