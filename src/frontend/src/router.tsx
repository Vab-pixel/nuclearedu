import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import InteractiveTimeline from "@/pages/history/InteractiveTimeline";
import ReadingList from "@/pages/learning/ReadingList";
import CriticalityCalculator from "@/pages/tools/CriticalityCalculator";
import CrossSectionViewer from "@/pages/tools/CrossSectionViewer";
import DoseRateCalculator from "@/pages/tools/DoseRateCalculator";
import FuelCycleVisualizer from "@/pages/tools/FuelCycleVisualizer";
import MonteCarloSim from "@/pages/tools/MonteCarloSim";
import RadioisotopeDatabase from "@/pages/tools/RadioisotopeDatabase";
import ReactorWorldMap from "@/pages/visualizations/ReactorWorldMap";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Atoms pages
const OrbitalsPage = lazy(() => import("@/pages/atoms/Orbitals"));
const ElectronConfigPage = lazy(() => import("@/pages/atoms/ElectronConfig"));
const SpectralSeriesPage = lazy(() => import("@/pages/atoms/SpectralSeries"));
const AtomicModelsPage = lazy(() => import("@/pages/atoms/AtomicModels"));
const SubatomicParticlesPage = lazy(
  () => import("@/pages/atoms/SubatomicParticles"),
);
const QuantumMechanicsPage = lazy(
  () => import("@/pages/atoms/QuantumMechanics"),
);

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
const RadiationSafetyPage = lazy(() =>
  import("@/pages/safety/RadiationSafety").then((m) => ({
    default: m.RadiationSafety,
  })),
);
const TimelinePage = lazy(() => import("@/pages/history/Timeline"));
const KeyFiguresPage = lazy(() => import("@/pages/history/KeyFigures"));
const MilestonesPage = lazy(() => import("@/pages/history/Milestones"));
const GlossaryPage = lazy(() => import("@/pages/Glossary"));
const ReferencesPage = lazy(() => import("@/pages/References"));
const AboutPage = lazy(() => import("@/pages/About"));

// Tools pages
const CarbonDatingCalculator = lazy(() =>
  import("@/pages/tools/CarbonDatingCalculator").then((m) => ({
    default: m.CarbonDatingCalculator,
  })),
);
const DataExplorer = lazy(() => import("@/pages/tools/DataExplorer"));
const IsotopeComparison = lazy(() => import("@/pages/tools/IsotopeComparison"));
const DosimetryCalculator = lazy(
  () => import("@/pages/tools/DosimetryCalculator"),
);
const NuclearNewsFeed = lazy(() => import("@/pages/tools/NuclearNewsFeed"));
const ScienceNewsFeed = lazy(() => import("@/pages/tools/ScienceNewsFeed"));
const RelativisticKinematics = lazy(
  () => import("@/pages/tools/RelativisticKinematics"),
);

// Learning pages
const LearningLab = lazy(() => import("@/pages/learning/LearningLab"));
const Quiz = lazy(() => import("@/pages/learning/Quiz"));

// Visualization pages
const ValleyOfStability = lazy(
  () => import("@/pages/visualizations/ValleyOfStability"),
);
const NucleusVisualizer = lazy(
  () => import("@/pages/visualizations/NucleusVisualizer"),
);
const PeriodicTable = lazy(
  () => import("@/pages/visualizations/PeriodicTable"),
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
const radiationSafetyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety/radiation",
  component: () => <LazyPage component={RadiationSafetyPage} />,
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
const interactiveTimelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history/interactive-timeline",
  component: () => <LazyPage component={InteractiveTimeline} />,
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
const reactorWorldMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/reactor-world-map",
  component: () => <LazyPage component={ReactorWorldMap} />,
});
const periodicTableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/periodic-table",
  component: () => <LazyPage component={PeriodicTable} />,
});
const valleyOfStabilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/valley-of-stability",
  component: () => <LazyPage component={ValleyOfStability} />,
});
const QuantumVisualizer = lazy(
  () => import("@/pages/visualizations/QuantumVisualizer"),
);
const FeynmanDiagrams = lazy(
  () => import("@/pages/visualizations/FeynmanDiagrams"),
);
const quantumVisualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/quantum",
  component: () => <LazyPage component={QuantumVisualizer} />,
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

// Tools routes
const toolsDataExplorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/data-explorer",
  component: () => <LazyPage component={DataExplorer} />,
});
const toolsIsotopeComparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/isotope-comparison",
  component: () => <LazyPage component={IsotopeComparison} />,
});
const toolsDosimetryCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/dosimetry-calculator",
  component: () => <LazyPage component={DosimetryCalculator} />,
});
const toolsRadioisotopeDatabaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/radioisotope-database",
  component: () => <LazyPage component={RadioisotopeDatabase} />,
});
const toolsCrossSectionViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/cross-section-viewer",
  component: () => <LazyPage component={CrossSectionViewer} />,
});
const toolsCriticalityCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/criticality-calculator",
  component: () => <LazyPage component={CriticalityCalculator} />,
});
const toolsDoseRateCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/dose-rate-calculator",
  component: () => <LazyPage component={DoseRateCalculator} />,
});
const toolsFuelCycleVisualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/fuel-cycle",
  component: () => <LazyPage component={FuelCycleVisualizer} />,
});
const toolsMonteCarloSimRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/monte-carlo-sim",
  component: () => <LazyPage component={MonteCarloSim} />,
});
const toolsCarbonDatingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/carbon-dating",
  component: () => <LazyPage component={CarbonDatingCalculator} />,
});
const toolsRelativisticKinematicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/relativistic-kinematics",
  component: () => <LazyPage component={RelativisticKinematics} />,
});

// New lazy imports for new tool pages
const CrossSectionPlotterPage = lazy(
  () => import("@/pages/tools/CrossSectionPlotter"),
);
const RadiationMapPage = lazy(() => import("@/pages/tools/RadiationMap"));
const MLNuclearEmulatorPage = lazy(
  () => import("@/pages/tools/MLNuclearEmulator"),
);
const LabToursPage = lazy(() => import("@/pages/tools/LabTours"));
const NuclideDatabasePage = lazy(() => import("@/pages/tools/NuclideDatabase"));
// New tools routes
const toolsCrossSectionPlotterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/cross-section-plotter",
  component: () => <LazyPage component={CrossSectionPlotterPage} />,
});
const toolsRadiationMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/radiation-map",
  component: () => <LazyPage component={RadiationMapPage} />,
});
const toolsMLEmulatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/ml-emulator",
  component: () => <LazyPage component={MLNuclearEmulatorPage} />,
});
const toolsLabToursRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/lab-tours",
  component: () => <LazyPage component={LabToursPage} />,
});
const toolsNuclideDatabaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/nuclide-database",
  component: () => <LazyPage component={NuclideDatabasePage} />,
});

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/news",
  component: () => <LazyPage component={NuclearNewsFeed} />,
});
const scienceNewsFeedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/science-news",
  component: () => <LazyPage component={ScienceNewsFeed} />,
});
const learningLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning-lab",
  component: () => <LazyPage component={LearningLab} />,
});
const readingListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning-lab/reading-list",
  component: () => <LazyPage component={ReadingList} />,
});
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning-lab/$topicId",
  component: () => <LazyPage component={Quiz} />,
});

const orbitalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atoms/orbitals",
  component: () => <LazyPage component={OrbitalsPage} />,
});
const electronConfigRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atoms/electron-config",
  component: () => <LazyPage component={ElectronConfigPage} />,
});
const spectralSeriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atoms/spectral-series",
  component: () => <LazyPage component={SpectralSeriesPage} />,
});
const atomicModelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atoms/atomic-models",
  component: () => <LazyPage component={AtomicModelsPage} />,
});
const subatomicParticlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atoms/subatomic-particles",
  component: () => <LazyPage component={SubatomicParticlesPage} />,
});
const quantumMechanicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atoms/quantum-mechanics",
  component: () => <LazyPage component={QuantumMechanicsPage} />,
});
const feynmanDiagramsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visualizations/feynman-diagrams",
  component: () => <LazyPage component={FeynmanDiagrams} />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  orbitalsRoute,
  electronConfigRoute,
  spectralSeriesRoute,
  atomicModelsRoute,
  subatomicParticlesRoute,
  quantumMechanicsRoute,
  feynmanDiagramsRoute,
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
  radiationSafetyRoute,
  historyRoute,
  timelineRoute,
  keyFiguresRoute,
  interactiveTimelineRoute,
  milestonesRoute,
  visualizationsRoute,
  valleyOfStabilityRoute,
  nucleusVisualizerRoute,
  decayChainExplorerRoute,
  nuclideChartRoute,
  reactorCrossSectionRoute,
  reactorWorldMapRoute,
  periodicTableRoute,
  quantumVisualizerRoute,
  glossaryRoute,
  referencesRoute,
  aboutRoute,
  toolsDataExplorerRoute,
  toolsIsotopeComparisonRoute,
  toolsDosimetryCalculatorRoute,
  toolsRadioisotopeDatabaseRoute,
  toolsCrossSectionViewerRoute,
  toolsCarbonDatingRoute,
  toolsCriticalityCalculatorRoute,
  toolsDoseRateCalculatorRoute,
  toolsFuelCycleVisualizerRoute,
  toolsMonteCarloSimRoute,
  toolsRelativisticKinematicsRoute,
  toolsCrossSectionPlotterRoute,
  toolsRadiationMapRoute,
  toolsMLEmulatorRoute,
  toolsLabToursRoute,
  toolsNuclideDatabaseRoute,
  newsRoute,
  scienceNewsFeedRoute,
  learningLabRoute,
  readingListRoute,
  quizRoute,
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
  "/safety/radiation": "Radiation Safety",
  "/history": "History",
  "/history/timeline": "Timeline",
  "/history/key-figures": "Key Figures",
  "/history/interactive-timeline": "Interactive Timeline",
  "/history/milestones": "Milestones",
  "/visualizations": "Visualizations",
  "/visualizations/nucleus": "Nucleus Visualizer",
  "/visualizations/decay-chain": "Decay Chain Explorer",
  "/visualizations/nuclide-chart": "Nuclide Chart",
  "/visualizations/reactor": "Reactor Cross-Section",
  "/visualizations/periodic-table": "Periodic Table",
  "/visualizations/valley-of-stability": "Valley of Stability",
  "/visualizations/quantum": "Quantum Visualizer",
  "/visualizations/reactor-world-map": "Reactor World Map",
  "/atoms/orbitals": "Electron Orbitals",
  "/atoms/electron-config": "Electronic Configuration",
  "/atoms/spectral-series": "Spectral Series",
  "/atoms/atomic-models": "Atomic Models",
  "/atoms/subatomic-particles": "Subatomic Particles",
  "/atoms/quantum-mechanics": "Quantum Mechanics",
  "/visualizations/feynman-diagrams": "Feynman Diagrams",
  "/tools/cross-section-plotter": "Cross-Section Plotter",
  "/tools/radiation-map": "Radiation Map",
  "/tools/ml-emulator": "ML Nuclear Emulator",
  "/tools/lab-tours": "Virtual Lab Tours",
  "/tools/nuclide-database": "Nuclide Database",
  "/glossary": "Glossary",
  "/references": "References",
  "/about": "About",
  "/tools/data-explorer": "Data Explorer",
  "/tools/isotope-comparison": "Isotope Comparison",
  "/tools/dosimetry-calculator": "Dosimetry Calculator",
  "/tools/radioisotope-database": "Radioisotope Database",
  "/tools/cross-section-viewer": "Cross-Section Viewer",
  "/tools/carbon-dating": "Carbon Dating Calculator",
  "/tools/criticality-calculator": "Criticality Calculator",
  "/tools/dose-rate-calculator": "Dose Rate Calculator",
  "/tools/fuel-cycle": "Fuel Cycle Visualizer",
  "/tools/monte-carlo-sim": "Monte Carlo Simulation",
  "/tools/relativistic-kinematics": "Relativistic Kinematics",
  "/learning-lab/reading-list": "Reading List",
  "/news": "News & Research",
  "/tools/science-news": "Science News Feed",
  "/learning-lab": "Learning Lab",
  "/learning-lab/$topicId": "Quiz",
};
