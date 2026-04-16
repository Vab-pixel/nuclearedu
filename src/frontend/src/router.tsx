import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const AtomStructure = lazy(() => import("@/pages/basics/AtomStructure"));
const Isotopes = lazy(() => import("@/pages/basics/Isotopes"));
const Radioactivity = lazy(() => import("@/pages/basics/Radioactivity"));
const EnergyMass = lazy(() => import("@/pages/basics/EnergyMass"));
const DecayPage = lazy(() => import("@/pages/reactions/Decay"));
const FissionPage = lazy(() => import("@/pages/reactions/Fission"));
const FusionPage = lazy(() => import("@/pages/reactions/Fusion"));
const CrossSectionsPage = lazy(() => import("@/pages/reactions/CrossSections"));
const PWRPage = lazy(() => import("@/pages/reactors/PWR"));
const BWRPage = lazy(() => import("@/pages/reactors/BWR"));
const CANDUPage = lazy(() => import("@/pages/reactors/CANDU"));
const AdvancedReactorsPage = lazy(
  () => import("@/pages/reactors/AdvancedReactors"),
);
const RadiationTypes = lazy(() => import("@/pages/radiation/RadiationTypes"));
const RadiationDetection = lazy(() => import("@/pages/radiation/Detection"));
const PowerPage = lazy(() => import("@/pages/applications/Power"));
const MedicinePage = lazy(() => import("@/pages/applications/Medicine"));
const IndustryPage = lazy(() => import("@/pages/applications/Industry"));
const ResearchPage = lazy(() => import("@/pages/applications/Research"));
const PrinciplesPage = lazy(() => import("@/pages/safety/Principles"));
const RegulationPage = lazy(() => import("@/pages/safety/Regulation"));
const AccidentsPage = lazy(() => import("@/pages/safety/Accidents"));
const WasteManagementPage = lazy(
  () => import("@/pages/safety/WasteManagement"),
);
const TimelinePage = lazy(() => import("@/pages/history/Timeline"));
const KeyFiguresPage = lazy(() => import("@/pages/history/KeyFigures"));
const MilestonesPage = lazy(() => import("@/pages/history/Milestones"));
const GlossaryPage = lazy(() => import("@/pages/Glossary"));
const ReferencesPage = lazy(() => import("@/pages/References"));
const AboutPage = lazy(() => import("@/pages/About"));

// Visualization pages
const NucleusVisualizer = lazy(
  () => import("@/pages/visualizations/NucleusVisualizer"),
);
const DecayChainExplorer = lazy(
  () => import("@/pages/visualizations/DecayChainExplorer"),
);
const NuclideChart = lazy(() => import("@/pages/visualizations/NuclideChart"));
const ReactorCrossSection = lazy(
  () => import("@/pages/visualizations/ReactorCrossSection"),
);

function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh]"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

function LazyPage({
  component: Component,
}: { component: React.ComponentType }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// Basics redirect
const basicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/basics",
  beforeLoad: () => {
    throw redirect({ to: "/basics/atom-structure" });
  },
  component: () => null,
});
const atomStructureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/basics/atom-structure",
  component: () => <LazyPage component={AtomStructure} />,
});
const isotopesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/basics/isotopes",
  component: () => <LazyPage component={Isotopes} />,
});
const radioactivityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/basics/radioactivity",
  component: () => <LazyPage component={Radioactivity} />,
});
const energyMassRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/basics/energy-mass",
  component: () => <LazyPage component={EnergyMass} />,
});

// Reactions redirect
const reactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactions",
  beforeLoad: () => {
    throw redirect({ to: "/reactions/decay" });
  },
  component: () => null,
});
const decayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactions/decay",
  component: () => <LazyPage component={DecayPage} />,
});
const fissionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactions/fission",
  component: () => <LazyPage component={FissionPage} />,
});
const fusionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactions/fusion",
  component: () => <LazyPage component={FusionPage} />,
});
const crossSectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactions/cross-sections",
  component: () => <LazyPage component={CrossSectionsPage} />,
});

// Reactors redirect
const reactorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactors",
  beforeLoad: () => {
    throw redirect({ to: "/reactors/pwr" });
  },
  component: () => null,
});
const pwrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactors/pwr",
  component: () => <LazyPage component={PWRPage} />,
});
const bwrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactors/bwr",
  component: () => <LazyPage component={BWRPage} />,
});
const canduRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactors/candu",
  component: () => <LazyPage component={CANDUPage} />,
});
const advancedReactorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactors/advanced",
  component: () => <LazyPage component={AdvancedReactorsPage} />,
});

// Radiation redirect
const radiationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/radiation",
  beforeLoad: () => {
    throw redirect({ to: "/radiation/types" });
  },
  component: () => null,
});
const radiationTypesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/radiation/types",
  component: () => <LazyPage component={RadiationTypes} />,
});
const radiationDetectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/radiation/detection",
  component: () => <LazyPage component={RadiationDetection} />,
});

// Applications redirect
const applicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications",
  beforeLoad: () => {
    throw redirect({ to: "/applications/power" });
  },
  component: () => null,
});
const powerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/power",
  component: () => <LazyPage component={PowerPage} />,
});
const medicineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/medicine",
  component: () => <LazyPage component={MedicinePage} />,
});
const industryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/industry",
  component: () => <LazyPage component={IndustryPage} />,
});
const researchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/research",
  component: () => <LazyPage component={ResearchPage} />,
});

// Safety redirect
const safetyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety",
  beforeLoad: () => {
    throw redirect({ to: "/safety/principles" });
  },
  component: () => null,
});
const principlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety/principles",
  component: () => <LazyPage component={PrinciplesPage} />,
});
const regulationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety/regulation",
  component: () => <LazyPage component={RegulationPage} />,
});
const accidentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety/accidents",
  component: () => <LazyPage component={AccidentsPage} />,
});
const wasteManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety/waste-management",
  component: () => <LazyPage component={WasteManagementPage} />,
});

// History redirect
const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  beforeLoad: () => {
    throw redirect({ to: "/history/timeline" });
  },
  component: () => null,
});
const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history/timeline",
  component: () => <LazyPage component={TimelinePage} />,
});
const keyFiguresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history/key-figures",
  component: () => <LazyPage component={KeyFiguresPage} />,
});
const milestonesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history/milestones",
  component: () => <LazyPage component={MilestonesPage} />,
});

// Visualizations redirect
const visualizationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations",
  beforeLoad: () => {
    throw redirect({ to: "/visualizations/nucleus" });
  },
  component: () => null,
});
const nucleusVisualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/nucleus",
  component: () => <LazyPage component={NucleusVisualizer} />,
});
const decayChainExplorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/decay-chain",
  component: () => <LazyPage component={DecayChainExplorer} />,
});
const nuclideChartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/nuclide-chart",
  component: () => <LazyPage component={NuclideChart} />,
});
const reactorCrossSectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/reactor",
  component: () => <LazyPage component={ReactorCrossSection} />,
});

const glossaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/glossary",
  component: () => <LazyPage component={GlossaryPage} />,
});
const referencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/references",
  component: () => <LazyPage component={ReferencesPage} />,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <LazyPage component={AboutPage} />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  basicsRoute,
  atomStructureRoute,
  isotopesRoute,
  radioactivityRoute,
  energyMassRoute,
  reactionsRoute,
  decayRoute,
  fissionRoute,
  fusionRoute,
  crossSectionsRoute,
  reactorsRoute,
  pwrRoute,
  bwrRoute,
  canduRoute,
  advancedReactorsRoute,
  radiationRoute,
  radiationTypesRoute,
  radiationDetectionRoute,
  applicationsRoute,
  powerRoute,
  medicineRoute,
  industryRoute,
  researchRoute,
  safetyRoute,
  principlesRoute,
  regulationRoute,
  accidentsRoute,
  wasteManagementRoute,
  historyRoute,
  timelineRoute,
  keyFiguresRoute,
  milestonesRoute,
  visualizationsRoute,
  nucleusVisualizerRoute,
  decayChainExplorerRoute,
  nuclideChartRoute,
  reactorCrossSectionRoute,
  glossaryRoute,
  referencesRoute,
  aboutRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Breadcrumb label map
export const routeLabels: Record<string, string> = {
  "/basics": "Basics",
  "/basics/atom-structure": "Atom Structure",
  "/basics/isotopes": "Isotopes",
  "/basics/radioactivity": "Radioactivity",
  "/basics/energy-mass": "Energy & Mass",
  "/reactions": "Reactions",
  "/reactions/decay": "Decay",
  "/reactions/fission": "Fission",
  "/reactions/fusion": "Fusion",
  "/reactions/cross-sections": "Cross-Sections",
  "/reactors": "Reactors",
  "/reactors/pwr": "PWR",
  "/reactors/bwr": "BWR",
  "/reactors/candu": "CANDU",
  "/reactors/advanced": "Advanced Reactors",
  "/radiation": "Radiation",
  "/radiation/types": "Radiation Types",
  "/radiation/detection": "Detection",
  "/applications": "Applications",
  "/applications/power": "Nuclear Power",
  "/applications/medicine": "Nuclear Medicine",
  "/applications/industry": "Industrial Applications",
  "/applications/research": "Research Applications",
  "/safety": "Safety",
  "/safety/principles": "Safety Principles",
  "/safety/regulation": "Regulation",
  "/safety/accidents": "Accident Analysis",
  "/safety/waste-management": "Waste Management",
  "/history": "History",
  "/history/timeline": "Timeline",
  "/history/key-figures": "Key Figures",
  "/history/milestones": "Milestones",
  "/visualizations": "Visualizations",
  "/visualizations/nucleus": "Nucleus Visualizer",
  "/visualizations/decay-chain": "Decay Chain Explorer",
  "/visualizations/nuclide-chart": "Nuclide Chart",
  "/visualizations/reactor": "Reactor Cross-Section",
  "/glossary": "Glossary",
  "/references": "References",
  "/about": "About",
};
