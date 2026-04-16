import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { nuclides } from "@/data/nuclides";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

// Error boundary to catch WebGL / R3F failures and show static fallback
class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("WebGL canvas error:", error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Fibonacci sphere distribution for nucleon positions
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = (2 * Math.PI * i) / goldenRatio;
    const r = radius * (0.7 + 0.3 * (i / count));
    points.push(
      new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta),
      ),
    );
  }
  return points;
}

function Nucleon({
  position,
  color,
  radius = 0.32,
}: {
  position: THREE.Vector3;
  color: string;
  radius?: number;
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.15} />
    </mesh>
  );
}

function NucleusScene({
  Z,
  N,
  autoRotate,
}: {
  Z: number;
  N: number;
  autoRotate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const total = Z + N;
  const radius = Math.max(1.2, 0.8 * Math.cbrt(total) + 0.5);

  const positions = useMemo(
    () => fibonacciSphere(total, radius),
    [total, radius],
  );

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 8, 8]} intensity={1.2} castShadow />
      <pointLight position={[-8, -4, -4]} intensity={0.4} color="#7dd3fc" />
      <group ref={groupRef}>
        {positions.map((pos, i) => (
          <Nucleon
            key={`nucleon-${i}-${Z}-${N}`}
            position={pos}
            color={i < Z ? "#f87171" : "#60a5fa"}
            radius={0.3 + (0.02 * Math.min(total, 20)) / 20}
          />
        ))}
      </group>
    </>
  );
}

function CameraAdjuster({ total }: { total: number }) {
  const { camera } = useThree();
  useEffect(() => {
    const dist = Math.max(6, 2.5 * Math.cbrt(total) + 3);
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
  }, [camera, total]);
  return null;
}

// Lookup element name/symbol from Z
const ELEMENT_NAMES: Record<number, { symbol: string; name: string }> = {
  1: { symbol: "H", name: "Hydrogen" },
  2: { symbol: "He", name: "Helium" },
  3: { symbol: "Li", name: "Lithium" },
  4: { symbol: "Be", name: "Beryllium" },
  5: { symbol: "B", name: "Boron" },
  6: { symbol: "C", name: "Carbon" },
  7: { symbol: "N", name: "Nitrogen" },
  8: { symbol: "O", name: "Oxygen" },
  9: { symbol: "F", name: "Fluorine" },
  10: { symbol: "Ne", name: "Neon" },
  11: { symbol: "Na", name: "Sodium" },
  12: { symbol: "Mg", name: "Magnesium" },
  13: { symbol: "Al", name: "Aluminium" },
  14: { symbol: "Si", name: "Silicon" },
  15: { symbol: "P", name: "Phosphorus" },
  16: { symbol: "S", name: "Sulfur" },
  17: { symbol: "Cl", name: "Chlorine" },
  18: { symbol: "Ar", name: "Argon" },
  19: { symbol: "K", name: "Potassium" },
  20: { symbol: "Ca", name: "Calcium" },
  26: { symbol: "Fe", name: "Iron" },
  27: { symbol: "Co", name: "Cobalt" },
  36: { symbol: "Kr", name: "Krypton" },
  38: { symbol: "Sr", name: "Strontium" },
  42: { symbol: "Mo", name: "Molybdenum" },
  43: { symbol: "Tc", name: "Technetium" },
  44: { symbol: "Ru", name: "Ruthenium" },
  49: { symbol: "In", name: "Indium" },
  53: { symbol: "I", name: "Iodine" },
  54: { symbol: "Xe", name: "Xenon" },
  55: { symbol: "Cs", name: "Caesium" },
  56: { symbol: "Ba", name: "Barium" },
  82: { symbol: "Pb", name: "Lead" },
  83: { symbol: "Bi", name: "Bismuth" },
  84: { symbol: "Po", name: "Polonium" },
  86: { symbol: "Rn", name: "Radon" },
  88: { symbol: "Ra", name: "Radium" },
  90: { symbol: "Th", name: "Thorium" },
  91: { symbol: "Pa", name: "Protactinium" },
  92: { symbol: "U", name: "Uranium" },
  94: { symbol: "Pu", name: "Plutonium" },
  95: { symbol: "Am", name: "Americium" },
};

function getElement(Z: number) {
  return ELEMENT_NAMES[Z] ?? { symbol: `Z${Z}`, name: `Element ${Z}` };
}

function checkStability(Z: number, N: number): "stable" | "unstable" {
  const found = nuclides.find((n) => n.Z === Z && n.N === N);
  if (!found) return "unstable";
  return found.decayModes.includes("stable") ? "stable" : "unstable";
}

// Static SVG fallback
function StaticNucleusDiagram({ Z, N }: { Z: number; N: number }) {
  const el = getElement(Z);
  const A = Z + N;
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-card rounded-xl border border-border p-8">
      <svg
        width="200"
        height="200"
        viewBox="-100 -100 200 200"
        aria-label={`Static diagram of ${el.name}-${A} nucleus`}
        role="img"
      >
        <title>{`${el.name}-${A} nucleus diagram`}</title>
        <circle
          cx="0"
          cy="0"
          r="55"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.3"
        />
        {Array.from({ length: Math.min(Z, 20) }, (_, i) => {
          const angle = (i / Math.min(Z, 20)) * 2 * Math.PI;
          const r = 30 + (i % 3) * 12;
          const cx = r * Math.cos(angle);
          const cy = r * Math.sin(angle);
          return (
            <circle
              key={`p-${Z}-${cx.toFixed(1)}-${cy.toFixed(1)}`}
              cx={cx}
              cy={cy}
              r="7"
              fill="#f87171"
              opacity="0.85"
            />
          );
        })}
        {Array.from({ length: Math.min(N, 20) }, (_, i) => {
          const angle = ((i + 0.5) / Math.min(N, 20)) * 2 * Math.PI;
          const r = 25 + (i % 3) * 12;
          const cx = r * Math.cos(angle);
          const cy = r * Math.sin(angle);
          return (
            <circle
              key={`n-${N}-${cx.toFixed(1)}-${cy.toFixed(1)}`}
              cx={cx}
              cy={cy}
              r="7"
              fill="#60a5fa"
              opacity="0.85"
            />
          );
        })}
        <text
          x="-38"
          y="80"
          fontSize="10"
          fill="#f87171"
          fontFamily="monospace"
        >
          ● Proton (Z={Z})
        </text>
        <text x="0" y="80" fontSize="10" fill="#60a5fa" fontFamily="monospace">
          ● Neutron (N={N})
        </text>
      </svg>
      <p className="text-sm text-muted-foreground text-center">
        Static fallback — WebGL not available or reduced motion is on
      </p>
    </div>
  );
}

export default function NucleusVisualizer() {
  const [Z, setZ] = useState(92);
  const [N, setN] = useState(146);
  const [interacting, setInteracting] = useState(false);
  const prefersReduced = useReducedMotion();
  const el = getElement(Z);
  const A = Z + N;
  const stability = checkStability(Z, N);
  const found = nuclides.find((n) => n.Z === Z && n.N === N);

  const ariaLabel = `3D nucleus of ${el.name}-${A}: ${Z} protons (red), ${N} neutrons (blue). Stability: ${stability}.`;

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      data-ocid="nucleus-viz.page"
    >
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-5">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="audience-badge audience-intermediate">
              Intermediate
            </Badge>
            <Badge className="audience-badge audience-advanced">
              3D Visualization
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Nucleus Visualizer
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Adjust the proton (Z) and neutron (N) sliders to build any nucleus.
            Red spheres are protons, blue are neutrons, arranged using Fibonacci
            distribution.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8 flex flex-col gap-8">
        {/* Canvas */}
        <div
          className="relative rounded-2xl overflow-hidden border border-border bg-card"
          style={{ height: 420 }}
          data-ocid="nucleus-viz.canvas_target"
        >
          {prefersReduced ? (
            <StaticNucleusDiagram Z={Z} N={N} />
          ) : (
            <WebGLErrorBoundary fallback={<StaticNucleusDiagram Z={Z} N={N} />}>
              {/* Accessible wrapper — R3F doesn't guarantee aria attr forwarding to canvas */}
              <div role="img" aria-label={ariaLabel} className="w-full h-full">
                <Canvas
                  shadows
                  camera={{ position: [0, 0, 10], fov: 45 }}
                  gl={{ antialias: true }}
                  onPointerDown={() => setInteracting(true)}
                  onPointerUp={() => setInteracting(false)}
                >
                  <Suspense fallback={null}>
                    <CameraAdjuster total={Z + N} />
                    <NucleusScene
                      Z={Z}
                      N={N}
                      autoRotate={!interacting && !prefersReduced}
                    />
                    <OrbitControls
                      enablePan={false}
                      enableZoom
                      minDistance={3}
                      maxDistance={30}
                      makeDefault
                    />
                  </Suspense>
                </Canvas>
              </div>
            </WebGLErrorBoundary>
          )}
          {/* Overlay label */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="rounded-lg bg-card/80 backdrop-blur-sm border border-border px-3 py-1.5 text-sm font-mono font-bold text-foreground">
              {el.symbol}-{A}
            </span>
          </div>
          <div className="absolute top-3 right-3 pointer-events-none">
            <span
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${stability === "stable" ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30" : "bg-amber-400/20 text-amber-300 border-amber-400/30"}`}
            >
              {stability === "stable" ? "Stable" : "Unstable"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-ocid="nucleus-viz.controls"
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="z-slider"
                className="text-sm font-semibold text-foreground"
              >
                Protons (Z)
              </label>
              <span className="font-mono text-lg font-bold text-red-400">
                {Z}
              </span>
            </div>
            <Slider
              id="z-slider"
              min={1}
              max={118}
              step={1}
              value={[Z]}
              onValueChange={([v]) => setZ(v)}
              aria-label="Number of protons"
              aria-valuenow={Z}
              aria-valuemin={1}
              aria-valuemax={118}
              data-ocid="nucleus-viz.z_slider"
              className="[&_[role=slider]]:bg-red-400"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Atomic number — defines the element
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="n-slider"
                className="text-sm font-semibold text-foreground"
              >
                Neutrons (N)
              </label>
              <span className="font-mono text-lg font-bold text-blue-400">
                {N}
              </span>
            </div>
            <Slider
              id="n-slider"
              min={0}
              max={180}
              step={1}
              value={[N]}
              onValueChange={([v]) => setN(v)}
              aria-label="Number of neutrons"
              aria-valuenow={N}
              aria-valuemin={0}
              aria-valuemax={180}
              data-ocid="nucleus-viz.n_slider"
              className="[&_[role=slider]]:bg-blue-400"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Neutron number — defines the isotope
            </p>
          </div>
        </div>

        {/* Info panel */}
        <div
          className="rounded-xl border border-border bg-card p-6"
          data-ocid="nucleus-viz.info_panel"
        >
          <h2 className="font-display font-bold text-foreground mb-4 text-lg">
            {el.name}-{A}
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Element", value: el.name },
              { label: "Symbol", value: `${el.symbol}-${A}` },
              { label: "Protons (Z)", value: Z },
              { label: "Neutrons (N)", value: N },
              { label: "Mass number (A)", value: A },
              {
                label: "Stability",
                value: stability === "stable" ? "Stable" : "Unstable/Unknown",
              },
              {
                label: "Half-life",
                value: found?.halfLifeStr ?? "—",
              },
              {
                label: "Binding energy / nucleon",
                value: found?.bindingEnergyPerNucleon_MeV
                  ? `${found.bindingEnergyPerNucleon_MeV} MeV`
                  : "—",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                  {label}
                </dt>
                <dd className="font-mono text-sm font-semibold text-foreground">
                  {String(value)}
                </dd>
              </div>
            ))}
          </dl>
          {found && found.decayModes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Decay modes
              </p>
              <div className="flex flex-wrap gap-2">
                {found.decayModes.map((mode) => (
                  <span
                    key={mode}
                    className="rounded-full border border-border bg-muted px-3 py-0.5 text-xs font-semibold text-foreground"
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          )}
          {!found && (
            <p className="mt-4 text-sm text-muted-foreground italic">
              This nuclide is not in the current dataset. It may be
              experimentally unobserved or highly exotic.
            </p>
          )}
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-4 text-sm text-muted-foreground"
          aria-label="Color legend"
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full bg-red-400"
              aria-hidden="true"
            />
            Proton (positively charged)
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full bg-blue-400"
              aria-hidden="true"
            />
            Neutron (no charge)
          </div>
          <p className="w-full text-xs">
            Tip: Click and drag to rotate. Scroll to zoom. Use sliders to change
            the nucleus.
          </p>
        </div>
      </div>
    </div>
  );
}
