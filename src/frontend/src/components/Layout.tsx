import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import type { BreadcrumbItem } from "@/components/BreadcrumbNav";
import { Navbar } from "@/components/Navbar";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Atom, BookOpen, Github } from "lucide-react";

const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  "/basics/atom-structure": [
    { label: "Basics", href: "/basics/atom-structure" },
    { label: "Atom Structure" },
  ],
  "/basics/isotopes": [
    { label: "Basics", href: "/basics/atom-structure" },
    { label: "Isotopes" },
  ],
  "/basics/radioactivity": [
    { label: "Basics", href: "/basics/atom-structure" },
    { label: "Radioactivity" },
  ],
  "/basics/energy-mass": [
    { label: "Basics", href: "/basics/atom-structure" },
    { label: "Energy & Mass" },
  ],
  "/reactions/decay": [
    { label: "Reactions", href: "/reactions/decay" },
    { label: "Radioactive Decay" },
  ],
  "/reactions/fission": [
    { label: "Reactions", href: "/reactions/decay" },
    { label: "Fission" },
  ],
  "/reactions/fusion": [
    { label: "Reactions", href: "/reactions/decay" },
    { label: "Fusion" },
  ],
  "/reactors/pwr": [
    { label: "Reactors", href: "/reactors/pwr" },
    { label: "Pressurized Water Reactor" },
  ],
  "/radiation/types": [
    { label: "Radiation", href: "/radiation/types" },
    { label: "Types of Radiation" },
  ],
  "/radiation/detection": [
    { label: "Radiation", href: "/radiation/types" },
    { label: "Detection" },
  ],
  "/glossary": [{ label: "Glossary" }],
  "/references": [{ label: "References" }],
  "/about": [{ label: "About" }],
  "/tools/data-explorer": [
    { label: "Tools", href: "/tools/data-explorer" },
    { label: "Data Explorer" },
  ],
  "/tools/isotope-comparison": [
    { label: "Tools", href: "/tools/data-explorer" },
    { label: "Isotope Comparison" },
  ],
  "/tools/dosimetry-calculator": [
    { label: "Tools", href: "/tools/data-explorer" },
    { label: "Dosimetry Calculator" },
  ],
  "/news": [{ label: "News & Research" }],
  "/learning-lab": [{ label: "Learning Lab" }],
};

export function Layout() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isHome = pathname === "/";
  const breadcrumbs =
    routeBreadcrumbs[pathname] ??
    (pathname.startsWith("/learning-lab/")
      ? [{ label: "Learning Lab", href: "/learning-lab" }, { label: "Quiz" }]
      : undefined);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {!isHome && breadcrumbs && (
        <div className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-4">
            <BreadcrumbNav items={breadcrumbs} />
          </div>
        </div>
      )}

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card/80 py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                  <Atom className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-foreground">
                  Nuclear<span className="text-primary">Edu</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A comprehensive, interactive educational resource covering
                nuclear science and engineering — from atoms to reactors.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Explore
              </p>
              <nav
                className="grid grid-cols-2 gap-1"
                aria-label="Footer navigation"
              >
                {[
                  { label: "Basics", href: "/basics/atom-structure" },
                  { label: "Reactions", href: "/reactions/decay" },
                  { label: "Reactors", href: "/reactors/pwr" },
                  { label: "Radiation", href: "/radiation/types" },
                  { label: "Glossary", href: "/glossary" },
                  { label: "References", href: "/references" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors glow-focus rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Data Sources
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <BookOpen
                    className="h-3.5 w-3.5 text-primary/60"
                    aria-hidden="true"
                  />
                  IAEA Nuclear Data Services
                </li>
                <li className="flex items-center gap-1.5">
                  <BookOpen
                    className="h-3.5 w-3.5 text-primary/60"
                    aria-hidden="true"
                  />
                  NNDC / ENSDF (BNL)
                </li>
                <li className="flex items-center gap-1.5">
                  <BookOpen
                    className="h-3.5 w-3.5 text-primary/60"
                    aria-hidden="true"
                  />
                  NIST Physical Reference Data
                </li>
                <li className="flex items-center gap-1.5">
                  <BookOpen
                    className="h-3.5 w-3.5 text-primary/60"
                    aria-hidden="true"
                  />
                  AME2020 Atomic Mass Evaluation
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline glow-focus rounded"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-3">
              <span>
                All data for educational use. Sources: IAEA, NNDC, NIST.
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors glow-focus rounded"
                aria-label="Source code on GitHub"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
