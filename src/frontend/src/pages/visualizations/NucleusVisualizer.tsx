import { EquationBlock } from "@/components/EquationBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { nuclides } from "@/data/nuclides";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Activity,
  Atom,
  ChevronDown,
  Grid3x3,
  Layers,
  Minus,
  Play,
  Plus,
  RefreshCw,
  Square,
  Zap,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as THREE from "three";

// ─── Error Boundary ───────────────────────────────────────────────────────────
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

// ─── Fibonacci sphere ──────────────────────────────────────────────────────────
export function fibonacciSphere(
  count: number,
  radius: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = (2 * Math.PI * i) / goldenRatio;
    const r = radius * (0.65 + 0.35 * (i / Math.max(count - 1, 1)));
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

// ─── Shell model ───────────────────────────────────────────────────────────────
const SHELL_MAGIC = [2, 8, 20, 28, 50, 82, 126];

export function shellPositions(
  count: number,
  baseRadius: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  let remaining = count;
  let shellIdx = 0;
  let prevMagic = 0;
  while (remaining > 0 && shellIdx < SHELL_MAGIC.length) {
    const shellCapacity = SHELL_MAGIC[shellIdx] - prevMagic;
    const inShell = Math.min(remaining, shellCapacity);
    const r = baseRadius * (0.3 + shellIdx * 0.2);
    points.push(...fibonacciSphere(inShell, r));
    remaining -= inShell;
    prevMagic = SHELL_MAGIC[shellIdx];
    shellIdx++;
  }
  if (remaining > 0) {
    const r = baseRadius * (0.3 + shellIdx * 0.2);
    points.push(...fibonacciSphere(remaining, r));
  }
  return points;
}

export function getShellLabels(
  total: number,
  baseRadius: number,
): { label: string; radius: number; count: number; magic: number }[] {
  const shells: {
    label: string;
    radius: number;
    count: number;
    magic: number;
  }[] = [];
  const SUBSHELL_LABELS = [
    "1s",
    "1p",
    "1d/2s",
    "1f/2p",
    "2d/3s",
    "1g/2f",
    "1h/2g",
  ];
  let remaining = total;
  let shellIdx = 0;
  let prevMagic = 0;
  while (remaining > 0 && shellIdx < SHELL_MAGIC.length) {
    const shellCapacity = SHELL_MAGIC[shellIdx] - prevMagic;
    const inShell = Math.min(remaining, shellCapacity);
    const r = baseRadius * (0.3 + shellIdx * 0.2);
    const magic = SHELL_MAGIC[shellIdx];
    shells.push({
      label: SUBSHELL_LABELS[shellIdx] ?? `Shell ${shellIdx + 1}`,
      radius: r,
      count: inShell,
      magic,
    });
    remaining -= inShell;
    prevMagic = magic;
    shellIdx++;
  }
  return shells;
}

// ─── Decay animation types ─────────────────────────────────────────────────────
type DecayType = "alpha" | "beta-" | "beta+";
interface AnimParticle {
  type: "alpha" | "electron" | "positron" | "antineutrino";
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  t: number;
  color: string;
  radius: number;
  trailPositions: THREE.Vector3[];
}

// ─── Animated decay particles ─────────────────────────────────────────────────
export function DecayParticles({ particles }: { particles: AnimParticle[] }) {
  return (
    <>
      {particles.map((p, idx) => (
        <group key={`decay-${idx}-${p.type}`}>
          {/* Trail segments */}
          {p.trailPositions.map((trailPos, ti) => {
            const opacity =
              (ti / Math.max(p.trailPositions.length - 1, 1)) *
              0.5 *
              (1 - p.t * 0.4);
            const scale =
              0.3 + (ti / Math.max(p.trailPositions.length - 1, 1)) * 0.7;
            // Use a stable key based on position in trail, not array index alone
            const trailKey = `trail-${p.type}-${idx}-pos${ti}`;
            return (
              <mesh key={trailKey} position={trailPos.clone()}>
                <sphereGeometry args={[p.radius * scale * 0.5, 6, 6]} />
                <meshBasicMaterial
                  color={p.color}
                  transparent
                  opacity={opacity}
                />
              </mesh>
            );
          })}
          {/* Main particle */}
          <mesh position={p.pos.clone()} castShadow>
            <sphereGeometry args={[p.radius, 16, 16]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={1.8 + Math.sin(p.t * Math.PI * 4) * 0.5}
              roughness={0.05}
              metalness={0.1}
              transparent
              opacity={Math.max(0.2, 1 - p.t * 0.7)}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ─── Nucleon component ─────────────────────────────────────────────────────────
export function Nucleon({
  position,
  isProton,
  radius = 0.32,
  jitter = true,
  jitterSeed = 0,
}: {
  position: THREE.Vector3;
  isProton: boolean;
  radius?: number;
  jitter?: boolean;
  jitterSeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePos = useMemo(() => position.clone(), [position]);

  useFrame((state) => {
    if (!meshRef.current || !jitter) return;
    const t = state.clock.elapsedTime;
    const freq = 2.5 + (jitterSeed % 7) * 0.3;
    const amp = 0.028 + (jitterSeed % 5) * 0.006;
    meshRef.current.position.set(
      basePos.x + Math.sin(t * freq + jitterSeed) * amp,
      basePos.y + Math.cos(t * freq * 1.3 + jitterSeed * 1.7) * amp,
      basePos.z + Math.sin(t * freq * 0.9 + jitterSeed * 2.1) * amp,
    );
  });

  const color = isProton ? "#f87171" : "#60a5fa";
  const emissiveColor = isProton ? "#ef4444" : "#2563eb";
  const emissiveIntensity = isProton ? 0.85 : 0.65;

  return (
    <mesh ref={meshRef} position={basePos} castShadow>
      <sphereGeometry args={[radius, 20, 20]} />
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={0.15}
        metalness={0.35}
      />
    </mesh>
  );
}

// ─── Shell rings overlay ───────────────────────────────────────────────────────
export function ShellRings({
  total,
  baseRadius,
}: { total: number; baseRadius: number }) {
  const shells = getShellLabels(total, baseRadius);
  const colors = [
    "#60a5fa",
    "#34d399",
    "#a78bfa",
    "#f97316",
    "#f472b6",
    "#22d3ee",
    "#fbbf24",
  ];
  return (
    <>
      {shells.map((shell, shellIdx) => (
        <group key={`shell-${shell.label}-r${shell.radius.toFixed(3)}`}>
          {/* XY plane ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[shell.radius, 0.018, 8, 64]} />
            <meshBasicMaterial
              color={colors[shellIdx % colors.length]}
              opacity={0.25}
              transparent
            />
          </mesh>
          {/* XZ plane ring (perpendicular) */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[shell.radius, 0.012, 8, 64]} />
            <meshBasicMaterial
              color={colors[shellIdx % colors.length]}
              opacity={0.12}
              transparent
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ─── Nucleus glow sphere ───────────────────────────────────────────────────────
function NucleusGlow({ radius, color }: { radius: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.15 + Math.sin(t * 1.2) * 0.05;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 1.25, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.06}
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// ─── Nucleus scene ─────────────────────────────────────────────────────────────
export function NucleusScene({
  Z,
  N,
  autoRotate,
  shellModel,
  animParticles,
  decayZOverride,
  decayNOverride,
}: {
  Z: number;
  N: number;
  autoRotate: boolean;
  shellModel: boolean;
  animParticles: AnimParticle[];
  decayZOverride?: number;
  decayNOverride?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const dispZ = decayZOverride ?? Z;
  const dispN = decayNOverride ?? N;
  const total = dispZ + dispN;
  const baseRadius = Math.max(1.2, 0.78 * Math.cbrt(total) + 0.55);

  const positions = useMemo(
    () =>
      shellModel
        ? shellPositions(total, baseRadius)
        : fibonacciSphere(total, baseRadius),
    [total, baseRadius, shellModel],
  );

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  const nucleonRadius = Math.max(0.24, 0.38 - total * 0.0005);
  const glowColor = dispZ > dispN ? "#ef4444" : "#3b82f6";

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight
        position={[10, 10, 10]}
        intensity={2.0}
        castShadow
        color="#ffffff"
      />
      <pointLight position={[-8, -6, -6]} intensity={0.8} color="#7dd3fc" />
      <pointLight position={[0, 0, -12]} intensity={0.5} color="#f472b6" />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#a78bfa" />
      <group ref={groupRef}>
        <NucleusGlow radius={baseRadius} color={glowColor} />
        {positions.map((pos, i) => (
          <Nucleon
            key={`nucleon-${i}-${dispZ}-${dispN}-${shellModel ? "s" : "f"}`}
            position={pos}
            isProton={i < dispZ}
            radius={nucleonRadius}
            jitter={true}
            jitterSeed={i}
          />
        ))}
        {shellModel && <ShellRings total={total} baseRadius={baseRadius} />}
      </group>
      <DecayParticles particles={animParticles} />
    </>
  );
}

// ─── Camera controller ─────────────────────────────────────────────────────────
export function CameraController({
  total,
  targetDist,
  onDistChange,
}: {
  total: number;
  targetDist: number;
  onDistChange: (d: number) => void;
}) {
  const { camera } = useThree();

  useEffect(() => {
    const dist = Math.max(6, 2.4 * Math.cbrt(total) + 3.5);
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
    onDistChange(dist);
  }, [camera, total, onDistChange]);

  useFrame(() => {
    const current = camera.position.length();
    if (Math.abs(current - targetDist) > 0.01) {
      const next = THREE.MathUtils.lerp(current, targetDist, 0.1);
      camera.position.normalize().multiplyScalar(next);
    }
  });

  return null;
}

// ─── Element names ─────────────────────────────────────────────────────────────
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
  28: { symbol: "Ni", name: "Nickel" },
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

// ─── Bethe-Weizsäcker ─────────────────────────────────────────────────────────
const BW_AV = 15.85;
const BW_AS = 18.34;
const BW_AC = 0.711;
const BW_AA = 23.21;
const BW_AP = 12.0;

function pairingTerm(Z: number, N: number, A: number): number {
  const isEvenZ = Z % 2 === 0;
  const isEvenN = N % 2 === 0;
  if (isEvenZ && isEvenN) return BW_AP / Math.sqrt(A);
  if (!isEvenZ && !isEvenN) return -BW_AP / Math.sqrt(A);
  return 0;
}

interface BindingEnergyTerms {
  volume: number;
  surface: number;
  coulomb: number;
  asymmetry: number;
  pairing: number;
  total: number;
  perNucleon: number;
}

function calcBindingEnergy(Z: number, N: number): BindingEnergyTerms {
  const A = Z + N;
  if (A < 1)
    return {
      volume: 0,
      surface: 0,
      coulomb: 0,
      asymmetry: 0,
      pairing: 0,
      total: 0,
      perNucleon: 0,
    };
  const volume = BW_AV * A;
  const surface = -BW_AS * A ** (2 / 3);
  const coulomb = (-BW_AC * Z * (Z - 1)) / A ** (1 / 3);
  const asymmetry = (-BW_AA * (A - 2 * Z) ** 2) / A;
  const pairing = pairingTerm(Z, N, A);
  const total = volume + surface + coulomb + asymmetry + pairing;
  return {
    volume,
    surface,
    coulomb,
    asymmetry,
    pairing,
    total,
    perNucleon: total / A,
  };
}

// ─── Spin/parity lookup ────────────────────────────────────────────────────────
const SPIN_PARITY: Record<string, string> = {
  "1-0": "1/2+",
  "1-1": "1+",
  "1-2": "1/2+",
  "2-2": "0+",
  "3-3": "1+",
  "3-4": "3/2−",
  "6-6": "0+",
  "6-8": "0+",
  "7-7": "1+",
  "8-8": "0+",
  "9-9": "1/2+",
  "10-10": "0+",
  "11-11": "3+",
  "19-21": "4−",
  "20-20": "0+",
  "26-30": "0+",
  "27-33": "5+",
  "82-126": "0+",
  "82-124": "0+",
  "92-143": "7/2−",
  "92-146": "0+",
  "88-138": "0+",
  "83-126": "9/2−",
  "95-146": "5/2−",
};

function getSpinParity(Z: number, N: number): string | null {
  return SPIN_PARITY[`${Z}-${N}`] ?? null;
}

// ─── Magic number detection ────────────────────────────────────────────────────
function getMagicBadge(Z: number, N: number) {
  const magicZ = SHELL_MAGIC.includes(Z);
  const magicN = SHELL_MAGIC.includes(N);
  return { magicZ, magicN, doubleMagic: magicZ && magicN };
}

// ─── Isotope presets ────────────────────────────────────────────────────────────
const ISOTOPE_PRESETS = [
  { label: "H-1", Z: 1, N: 0 },
  { label: "²H", Z: 1, N: 1 },
  { label: "He-4", Z: 2, N: 2 },
  { label: "C-12", Z: 6, N: 6 },
  { label: "C-14", Z: 6, N: 8 },
  { label: "N-14", Z: 7, N: 7 },
  { label: "O-16", Z: 8, N: 8 },
  { label: "Ca-40", Z: 20, N: 20 },
  { label: "Fe-56", Z: 26, N: 30 },
  { label: "Kr-84", Z: 36, N: 48 },
  { label: "Pb-208", Z: 82, N: 126 },
  { label: "Bi-209", Z: 83, N: 126 },
  { label: "Ra-226", Z: 88, N: 138 },
  { label: "U-235", Z: 92, N: 143 },
  { label: "U-238", Z: 92, N: 146 },
  { label: "Am-241", Z: 95, N: 146 },
];

// ─── Stability heatmap gradient CSS ───────────────────────────────────────────
function getStabilityGradient(Z: number, N: number): string {
  const A = Z + N;
  const valleyN = A < 40 ? Z : Math.round(Z * (1 + 0.4 * (Z / 118)));
  const deviation = Math.abs(N - valleyN);
  const isNeutronRich = N > valleyN;
  const strength = Math.min(deviation / 20, 1);

  if (deviation < 2) {
    return `radial-gradient(ellipse 80% 70% at 50% 50%,
      oklch(0.18 0.10 260 / 0.98) 0%,
      oklch(0.14 0.14 252 / 0.92) 35%,
      oklch(0.10 0.07 245 / 0.80) 70%,
      oklch(0.07 0.03 240 / 0.95) 100%)`;
  }
  if (isNeutronRich) {
    return `radial-gradient(ellipse 80% 70% at 50% 50%,
      oklch(${0.16 + strength * 0.04} ${0.1 + strength * 0.08} ${155 + strength * 25} / 0.98) 0%,
      oklch(0.12 0.07 160 / 0.90) 40%,
      oklch(0.08 0.04 165 / 0.80) 70%,
      oklch(0.06 0.02 160 / 0.95) 100%)`;
  }
  return `radial-gradient(ellipse 80% 70% at 50% 50%,
    oklch(${0.16 + strength * 0.05} ${0.1 + strength * 0.08} ${35 + strength * 12} / 0.98) 0%,
    oklch(0.12 0.06 28 / 0.90) 40%,
    oklch(0.08 0.04 22 / 0.80) 70%,
    oklch(0.06 0.02 18 / 0.95) 100%)`;
}

// ─── Mini chart of nuclides ────────────────────────────────────────────────────
const MINI_MAX_Z = 30;
const MINI_MAX_N = 40;

function getMiniCellColor(
  z: number,
  n: number,
  activeZ: number,
  activeN: number,
): string {
  if (z === activeZ && n === activeN) return "#ffffff";
  const nd = nuclides.find((nuc) => nuc.Z === z && nuc.N === n);
  if (!nd) return "#0d0d1a";
  const mode = nd.decayModes[0];
  if (mode === "stable") return "#14b8a6";
  if (mode === "beta-") return "#84cc16";
  if (mode === "beta+") return "#f97316";
  if (mode === "alpha") return "#ef4444";
  if (mode === "gamma") return "#a78bfa";
  return "#6366f1";
}

function MiniNuclideChart({
  activeZ,
  activeN,
  onCellClick,
}: {
  activeZ: number;
  activeN: number;
  onCellClick: (z: number, n: number) => void;
}) {
  const cellSize = 5;
  const width = MINI_MAX_N * cellSize + 1;
  const height = MINI_MAX_Z * cellSize + 1;

  const cells = useMemo(() => {
    const result: { z: number; n: number; color: string }[] = [];
    for (let z = 1; z <= MINI_MAX_Z; z++) {
      for (let n = 0; n <= MINI_MAX_N; n++) {
        result.push({ z, n, color: getMiniCellColor(z, n, activeZ, activeN) });
      }
    }
    return result;
  }, [activeZ, activeN]);

  return (
    <div
      className="rounded-xl border border-border bg-card/80 p-3"
      data-ocid="nucleus-viz.mini_chart"
    >
      <div className="flex items-center gap-2 mb-2">
        <Grid3x3 className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Chart of Nuclides
        </p>
      </div>
      <div className="flex gap-2 items-start">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          aria-label="Mini Chart of Nuclides"
          role="img"
          style={{ cursor: "crosshair", display: "block" }}
        >
          <title>Mini Chart of Nuclides — click to select isotope</title>
          {cells.map(({ z, n, color }) => {
            const x = n * cellSize;
            const y = (MINI_MAX_Z - z) * cellSize;
            const isActive = z === activeZ && n === activeN;
            return (
              <rect
                key={`${z}-${n}`}
                x={x}
                y={y}
                width={cellSize - 0.5}
                height={cellSize - 0.5}
                fill={color}
                opacity={isActive ? 1 : 0.9}
                onClick={() => onCellClick(z, n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onCellClick(z, n);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select Z=${z} N=${n}`}
                style={{ cursor: "pointer" }}
                rx="0.5"
              />
            );
          })}
          {activeZ <= MINI_MAX_Z && activeN <= MINI_MAX_N && (
            <>
              <line
                x1={activeN * cellSize + cellSize / 2}
                y1={0}
                x2={activeN * cellSize + cellSize / 2}
                y2={height}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <line
                x1={0}
                y1={(MINI_MAX_Z - activeZ) * cellSize + cellSize / 2}
                x2={width}
                y2={(MINI_MAX_Z - activeZ) * cellSize + cellSize / 2}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <circle
                cx={activeN * cellSize + cellSize / 2}
                cy={(MINI_MAX_Z - activeZ) * cellSize + cellSize / 2}
                r={4}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
            </>
          )}
          <text
            x={width - 1}
            y={height + 6}
            fontSize="4"
            fill="#6b7280"
            textAnchor="end"
          >
            N→
          </text>
          <text x={0} y={5} fontSize="4" fill="#6b7280" textAnchor="start">
            Z↑
          </text>
        </svg>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground min-w-0">
          {[
            { color: "#14b8a6", label: "Stable" },
            { color: "#84cc16", label: "β⁻" },
            { color: "#f97316", label: "β⁺" },
            { color: "#ef4444", label: "α" },
            { color: "#a78bfa", label: "IT/γ" },
            { color: "#0d0d1a", label: "None", border: "#2d2d4a" },
          ].map(({ color, label, border }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0 border"
                style={{ background: color, borderColor: border ?? color }}
              />
              <span className="text-[10px] whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">
        Click cell to navigate
      </p>
    </div>
  );
}

// ─── BW Terms grouped bar chart ────────────────────────────────────────────────
const BW_BAR_COLORS = {
  Volume: "#60a5fa",
  Surface: "#f97316",
  Coulomb: "#f87171",
  Asymmetry: "#a78bfa",
  Pairing: "#34d399",
};

const BW_FORMULAS: Record<string, string> = {
  Volume: `+aV·A = +${BW_AV}·A`,
  Surface: `−aS·A^(2/3) = −${BW_AS}·A^0.667`,
  Coulomb: `−aC·Z(Z−1)/A^(1/3) = −${BW_AC}·Z(Z−1)/A^0.333`,
  Asymmetry: `−aA·(A−2Z)²/A = −${BW_AA}·(A−2Z)²/A`,
  Pairing: `δ(A,Z) = ±${BW_AP}/√A`,
};

function BWTermsBarChart({ Z, N }: { Z: number; N: number }) {
  const be = calcBindingEnergy(Z, N);
  const data = [
    {
      name: "Terms",
      Volume: +be.volume.toFixed(2),
      Surface: +be.surface.toFixed(2),
      Coulomb: +be.coulomb.toFixed(2),
      Asymmetry: +be.asymmetry.toFixed(2),
      Pairing: +be.pairing.toFixed(2),
    },
  ];

  interface TooltipPayload {
    name: string;
    value: number;
    color: string;
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs max-w-[220px]">
        {payload.map((entry) => (
          <div key={entry.name} className="mb-2 last:mb-0">
            <div className="flex items-center justify-between gap-3 mb-0.5">
              <span className="font-semibold" style={{ color: entry.color }}>
                {entry.name}
              </span>
              <span
                className={`font-mono font-bold ${entry.value >= 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {entry.value >= 0 ? "+" : ""}
                {entry.value.toFixed(2)} MeV
              </span>
            </div>
            <p className="text-muted-foreground font-mono text-[10px]">
              {BW_FORMULAS[entry.name]}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 11 }} />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            label={{
              value: "MeV",
              angle: -90,
              position: "insideLeft",
              fill: "#6b7280",
              fontSize: 10,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 10, color: "#9ca3af" }} />
          {(Object.keys(BW_BAR_COLORS) as (keyof typeof BW_BAR_COLORS)[]).map(
            (term) => (
              <Bar key={term} dataKey={term} name={term} stackId={undefined}>
                <Cell fill={BW_BAR_COLORS[term]} opacity={0.85} />
              </Bar>
            ),
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Binding energy curve chart ────────────────────────────────────────────────
function buildBEChartData(currentZ: number, currentN: number) {
  const theoreticalPoints: { A: number; bePerNucleon: number }[] = [];
  for (let A = 2; A <= 238; A += 2) {
    const Zt = Math.round(A / (1 + (BW_AC * A ** (2 / 3)) / (4 * BW_AA)));
    const Nt = A - Zt;
    if (Zt < 1 || Nt < 0) continue;
    const be = calcBindingEnergy(Zt, Nt);
    theoreticalPoints.push({ A, bePerNucleon: +be.perNucleon.toFixed(3) });
  }
  const experimentalMap = new Map<number, number>();
  for (const nuc of nuclides) {
    if (nuc.bindingEnergyPerNucleon_MeV && nuc.A > 1) {
      const prev = experimentalMap.get(nuc.A);
      if (!prev || nuc.bindingEnergyPerNucleon_MeV > prev) {
        experimentalMap.set(nuc.A, nuc.bindingEnergyPerNucleon_MeV);
      }
    }
  }
  const currentBE = calcBindingEnergy(currentZ, currentN);
  const currentA = currentZ + currentN;
  return { theoreticalPoints, experimentalMap, currentA, currentBE };
}

// ─── Static fallback ───────────────────────────────────────────────────────────
function StaticNucleusDiagram({ Z, N }: { Z: number; N: number }) {
  const el = getElement(Z);
  const A = Z + N;
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-card rounded-xl border border-border p-8 h-full">
      <svg
        width="200"
        height="200"
        viewBox="-100 -100 200 200"
        aria-label={`${el.name}-${A}`}
        role="img"
      >
        <title>{`${el.name}-${A} nucleus`}</title>
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
          return (
            <circle
              key={`p-a${angle.toFixed(4)}`}
              cx={r * Math.cos(angle)}
              cy={r * Math.sin(angle)}
              r="7"
              fill="#f87171"
              opacity="0.85"
            />
          );
        })}
        {Array.from({ length: Math.min(N, 20) }, (_, i) => {
          const angle = ((i + 0.5) / Math.min(N, 20)) * 2 * Math.PI;
          const r = 25 + (i % 3) * 12;
          return (
            <circle
              key={`n-a${angle.toFixed(4)}`}
              cx={r * Math.cos(angle)}
              cy={r * Math.sin(angle)}
              r="7"
              fill="#60a5fa"
              opacity="0.85"
            />
          );
        })}
      </svg>
      <p className="text-sm text-muted-foreground">
        Static fallback — WebGL not available
      </p>
    </div>
  );
}

const ZOOM_MIN = 3;
const ZOOM_MAX = 30;
const ZOOM_STEP_CAM = 2;

// ─── Main component ────────────────────────────────────────────────────────────
export function NucleusVisualizer() {
  const [Z, setZ] = useState(26);
  const [N, setN] = useState(30);
  const [interacting, setInteracting] = useState(false);
  const [cameraTarget, setCameraTarget] = useState(10);
  const [shellModel, setShellModel] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<
    "bw_terms" | "be_curve" | "formula"
  >("bw_terms");

  // Decay animation state
  const [animating, setAnimating] = useState(false);
  const [animType, setAnimType] = useState<DecayType | null>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const [animParticles, setAnimParticles] = useState<AnimParticle[]>([]);
  const [decayDisplayZ, setDecayDisplayZ] = useState<number | undefined>();
  const [decayDisplayN, setDecayDisplayN] = useState<number | undefined>();
  const animFrameRef = useRef<number | null>(null);
  const animStartRef = useRef<number>(0);

  const el = getElement(Z);
  const A = Z + N;
  const stability = checkStability(Z, N);
  const found = nuclides.find((n) => n.Z === Z && n.N === N);
  const magic = getMagicBadge(Z, N);
  const spinParity = getSpinParity(Z, N);
  const be = calcBindingEnergy(Z, N);

  const ariaLabel = `3D nucleus of ${el.name}-${A}: ${Z} protons (red), ${N} neutrons (blue). Stability: ${stability}.`;
  const handleDistChange = useCallback((d: number) => setCameraTarget(d), []);
  const zoomIn = () =>
    setCameraTarget((d) => Math.max(ZOOM_MIN, d - ZOOM_STEP_CAM));
  const zoomOut = () =>
    setCameraTarget((d) => Math.min(ZOOM_MAX, d + ZOOM_STEP_CAM));

  const shellLabels = useMemo(
    () => getShellLabels(Z + N, Math.max(1.2, 0.78 * Math.cbrt(Z + N) + 0.55)),
    [Z, N],
  );
  const stabilityGradient = useMemo(() => getStabilityGradient(Z, N), [Z, N]);

  // ─── Decay animation logic ──────────────────────────────────────────────────
  const ANIM_DURATION: Record<DecayType, number> = {
    alpha: 2800,
    "beta-": 2200,
    "beta+": 2200,
  };
  const TRAIL_STEPS = 8;

  function buildInitialParticles(type: DecayType): AnimParticle[] {
    const baseRadius = Math.max(1.2, 0.78 * Math.cbrt(Z + N) + 0.55);
    if (type === "alpha") {
      const dirs = [
        new THREE.Vector3(1, 0.3, 0.2).normalize(),
        new THREE.Vector3(-0.2, -1, 0.4).normalize(),
        new THREE.Vector3(0.5, 0.8, -0.6).normalize(),
        new THREE.Vector3(-0.8, 0.2, 0.8).normalize(),
      ];
      return dirs.map((dir) => ({
        type: "alpha" as const,
        pos: dir.clone().multiplyScalar(baseRadius * 0.9),
        vel: dir.clone().multiplyScalar(0.14),
        t: 0,
        color: "#fbbf24",
        radius: 0.48,
        trailPositions: Array.from({ length: TRAIL_STEPS }, (_, i) =>
          dir.clone().multiplyScalar(baseRadius * 0.9 - i * 0.2),
        ),
      }));
    }
    if (type === "beta-") {
      const dir1 = new THREE.Vector3(0.8, 0.5, 0.3).normalize();
      const dir2 = new THREE.Vector3(-0.6, -0.7, 0.4).normalize();
      return [
        {
          type: "electron" as const,
          pos: dir1.clone().multiplyScalar(baseRadius * 0.8),
          vel: dir1.clone().multiplyScalar(0.22),
          t: 0,
          color: "#38bdf8",
          radius: 0.2,
          trailPositions: Array.from({ length: TRAIL_STEPS }, (_, i) =>
            dir1.clone().multiplyScalar(baseRadius * 0.8 - i * 0.15),
          ),
        },
        {
          type: "antineutrino" as const,
          pos: dir2.clone().multiplyScalar(baseRadius * 0.8),
          vel: dir2.clone().multiplyScalar(0.28),
          t: 0,
          color: "#e879f9",
          radius: 0.14,
          trailPositions: Array.from({ length: TRAIL_STEPS }, (_, i) =>
            dir2.clone().multiplyScalar(baseRadius * 0.8 - i * 0.15),
          ),
        },
      ];
    }
    const dir1 = new THREE.Vector3(0.7, -0.5, 0.5).normalize();
    const dir2 = new THREE.Vector3(-0.5, 0.8, -0.3).normalize();
    return [
      {
        type: "positron" as const,
        pos: dir1.clone().multiplyScalar(baseRadius * 0.8),
        vel: dir1.clone().multiplyScalar(0.22),
        t: 0,
        color: "#fb923c",
        radius: 0.2,
        trailPositions: Array.from({ length: TRAIL_STEPS }, (_, i) =>
          dir1.clone().multiplyScalar(baseRadius * 0.8 - i * 0.15),
        ),
      },
      {
        type: "antineutrino" as const,
        pos: dir2.clone().multiplyScalar(baseRadius * 0.8),
        vel: dir2.clone().multiplyScalar(0.28),
        t: 0,
        color: "#e879f9",
        radius: 0.14,
        trailPositions: Array.from({ length: TRAIL_STEPS }, (_, i) =>
          dir2.clone().multiplyScalar(baseRadius * 0.8 - i * 0.15),
        ),
      },
    ];
  }

  function startDecayAnim(type: DecayType) {
    if (animating) return;
    setAnimType(type);
    setAnimating(true);
    setAnimProgress(0);
    const initial = buildInitialParticles(type);
    setAnimParticles(initial);
    if (type === "alpha") {
      setDecayDisplayZ(Z - 2);
      setDecayDisplayN(N - 2);
    } else if (type === "beta-") {
      setDecayDisplayZ(Z + 1);
      setDecayDisplayN(N - 1);
    } else {
      setDecayDisplayZ(Z - 1);
      setDecayDisplayN(N + 1);
    }
    animStartRef.current = performance.now();
    const duration = ANIM_DURATION[type];
    function tick() {
      const elapsed = performance.now() - animStartRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setAnimProgress(progress);
      setAnimParticles((prev) =>
        prev.map((p) => {
          const newPos = p.pos
            .clone()
            .add(p.vel.clone().multiplyScalar(progress * 20));
          const trailPositions = Array.from({ length: TRAIL_STEPS }, (_, i) => {
            const t = Math.max(0, progress - i * 0.015);
            return p.pos.clone().add(p.vel.clone().multiplyScalar(t * 20));
          });
          return { ...p, t: progress, pos: newPos, trailPositions };
        }),
      );
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        if (type === "alpha") {
          setZ((z) => Math.max(1, z - 2));
          setN((n) => Math.max(0, n - 2));
        } else if (type === "beta-") {
          setZ((z) => z + 1);
          setN((n) => Math.max(0, n - 1));
        } else {
          setZ((z) => Math.max(1, z - 1));
          setN((n) => n + 1);
        }
        setAnimParticles([]);
        setDecayDisplayZ(undefined);
        setDecayDisplayN(undefined);
        setAnimating(false);
        setAnimType(null);
        setAnimProgress(0);
      }
    }
    animFrameRef.current = requestAnimationFrame(tick);
  }

  function stopAnim() {
    if (animFrameRef.current !== null)
      cancelAnimationFrame(animFrameRef.current);
    setAnimating(false);
    setAnimType(null);
    setAnimProgress(0);
    setAnimParticles([]);
    setDecayDisplayZ(undefined);
    setDecayDisplayN(undefined);
  }

  useEffect(
    () => () => {
      if (animFrameRef.current !== null)
        cancelAnimationFrame(animFrameRef.current);
    },
    [],
  );

  const canAlpha = Z >= 3 && N >= 2 && A >= 4;
  const canBetaMinus = N >= 1;
  const canBetaPlus = Z >= 2;

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const match = ISOTOPE_PRESETS.find(
      (p) => p.label.toLowerCase() === query.toLowerCase(),
    );
    if (match) {
      setZ(match.Z);
      setN(match.N);
    }
  };

  // BW curve data
  const beChartData = useMemo(() => buildBEChartData(Z, N), [Z, N]);
  const theoreticalChartData = beChartData.theoreticalPoints.map((pt) => ({
    A: pt.A,
    theoretical: pt.bePerNucleon,
    experimental: beChartData.experimentalMap.get(pt.A) ?? null,
  }));

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      data-ocid="nucleus-viz.page"
    >
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="audience-badge audience-intermediate">
              Intermediate
            </Badge>
            <Badge className="audience-badge audience-advanced">
              3D · Three.js · Simulator
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Advanced Nucleus Visualizer
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
            High-fidelity 3D nucleus with dynamic nucleon physics, glowing
            emissive materials, decay mode animations, stability heatmap,
            Bethe-Weizsäcker binding energy analysis, and mini Chart of
            Nuclides.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Main two-panel layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 mb-6">
          {/* ─── Left: Canvas + Controls ───────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Canvas */}
            <div
              className="relative rounded-2xl overflow-hidden border border-border"
              style={{
                height: 460,
                background: showHeatmap ? stabilityGradient : "oklch(0.08 0 0)",
              }}
              data-ocid="nucleus-viz.canvas_target"
              aria-label={ariaLabel}
            >
              {/* Inner vignette */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              {/* Canvas glow filter */}
              <div
                className="w-full h-full"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(96,165,250,0.3)) drop-shadow(0 0 40px rgba(248,113,113,0.18))",
                }}
              >
                {prefersReduced ? (
                  <StaticNucleusDiagram Z={Z} N={N} />
                ) : (
                  <WebGLErrorBoundary
                    fallback={<StaticNucleusDiagram Z={Z} N={N} />}
                  >
                    <div
                      role="img"
                      aria-label={ariaLabel}
                      className="w-full h-full"
                    >
                      <Canvas
                        shadows
                        camera={{ position: [0, 0, 10], fov: 42 }}
                        gl={{
                          antialias: true,
                          powerPreference: "high-performance",
                          toneMapping: THREE.ACESFilmicToneMapping,
                        }}
                        onPointerDown={() => setInteracting(true)}
                        onPointerUp={() => setInteracting(false)}
                      >
                        <Suspense fallback={null}>
                          <CameraController
                            total={Z + N}
                            targetDist={cameraTarget}
                            onDistChange={handleDistChange}
                          />
                          <NucleusScene
                            Z={Z}
                            N={N}
                            autoRotate={
                              !interacting &&
                              !prefersReduced &&
                              autoRotate &&
                              !animating
                            }
                            shellModel={shellModel}
                            animParticles={animParticles}
                            decayZOverride={decayDisplayZ}
                            decayNOverride={decayDisplayN}
                          />
                          <OrbitControls
                            enablePan={false}
                            enableZoom
                            minDistance={ZOOM_MIN}
                            maxDistance={ZOOM_MAX}
                            makeDefault
                          />
                        </Suspense>
                      </Canvas>
                    </div>
                  </WebGLErrorBoundary>
                )}
              </div>

              {/* Nucleus label */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
                <span className="rounded-lg bg-card/90 backdrop-blur-md border border-border px-3 py-1.5 text-sm font-mono font-bold text-foreground shadow-lg">
                  {el.symbol}-{A}
                </span>
                {magic.doubleMagic && (
                  <span className="rounded-lg bg-amber-400/25 border border-amber-400/50 px-2.5 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-sm">
                    ✦ Double Magic
                  </span>
                )}
              </div>

              {/* Shell model badge */}
              {shellModel && (
                <div className="absolute top-3 left-[8.5rem] z-20 pointer-events-none">
                  <span className="rounded-lg bg-blue-500/25 border border-blue-400/45 px-2.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-sm">
                    Shell Model
                  </span>
                </div>
              )}

              {/* Stability badge */}
              <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <span
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm ${
                    stability === "stable"
                      ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30"
                      : "bg-amber-400/20 text-amber-300 border-amber-400/30"
                  }`}
                >
                  {stability === "stable" ? "⬤ Stable" : "⬤ Unstable"}
                </span>
              </div>

              {/* Animation progress */}
              {animating && (
                <div className="absolute bottom-14 left-3 right-3 z-20">
                  <div className="rounded-xl bg-card/85 backdrop-blur-md border border-border px-4 py-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-foreground">
                        {animType === "alpha"
                          ? "⚛ α Decay in progress…"
                          : animType === "beta-"
                            ? "⚡ β⁻ Decay in progress…"
                            : "⚡ β⁺ Decay in progress…"}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {Math.round(animProgress * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${animType === "alpha" ? "bg-amber-400" : animType === "beta-" ? "bg-blue-400" : "bg-orange-400"}`}
                        style={{ width: `${animProgress * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Zoom controls */}
              {!prefersReduced && (
                <div
                  className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-1 shadow-sm"
                  role="toolbar"
                  aria-label="Camera zoom controls"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 rounded-full p-0"
                    onClick={zoomIn}
                    aria-label="Zoom in"
                    data-ocid="nucleus-viz.zoom_in_button"
                    disabled={cameraTarget <= ZOOM_MIN}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="font-mono text-xs text-muted-foreground px-0.5 select-none">
                    zoom
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 rounded-full p-0"
                    onClick={zoomOut}
                    aria-label="Zoom out"
                    data-ocid="nucleus-viz.zoom_out_button"
                    disabled={cameraTarget >= ZOOM_MAX}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-3 pointer-events-none">
                <div className="flex items-center gap-1.5 rounded-full bg-card/75 backdrop-blur-sm border border-border px-2.5 py-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="text-[10px] text-muted-foreground">
                    Proton
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block ml-1" />
                  <span className="text-[10px] text-muted-foreground">
                    Neutron
                  </span>
                </div>
              </div>
            </div>

            {/* ─── Bottom controls bar ──────────────────────────────────────── */}
            <div
              className="rounded-xl border border-border bg-card p-4"
              data-ocid="nucleus-viz.bottom_controls"
            >
              <div className="flex flex-wrap items-center gap-2">
                {/* Stability Heatmap toggle */}
                <Button
                  size="sm"
                  variant={showHeatmap ? "secondary" : "outline"}
                  className="gap-1.5 text-xs"
                  onClick={() => setShowHeatmap((v) => !v)}
                  data-ocid="nucleus-viz.heatmap_toggle"
                  aria-pressed={showHeatmap}
                >
                  <Activity className="h-3.5 w-3.5" />
                  {showHeatmap ? "Heatmap ON" : "Heatmap OFF"}
                </Button>

                {/* Shell Model toggle */}
                <Button
                  size="sm"
                  variant={shellModel ? "secondary" : "outline"}
                  className="gap-1.5 text-xs"
                  onClick={() => setShellModel((v) => !v)}
                  data-ocid="nucleus-viz.shell_model_toggle"
                  aria-pressed={shellModel}
                >
                  <Layers className="h-3.5 w-3.5" />
                  {shellModel ? "Shell Model ON" : "Shell Model OFF"}
                </Button>

                {/* Auto-rotate toggle */}
                <Button
                  size="sm"
                  variant={autoRotate ? "secondary" : "outline"}
                  className="gap-1.5 text-xs"
                  onClick={() => setAutoRotate((v) => !v)}
                  data-ocid="nucleus-viz.autorotate_toggle"
                  aria-pressed={autoRotate}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  {autoRotate ? "Auto-Rotate ON" : "Auto-Rotate OFF"}
                </Button>

                {/* Search toggle */}
                <Button
                  size="sm"
                  variant={showSearch ? "secondary" : "outline"}
                  className="gap-1.5 text-xs"
                  onClick={() => setShowSearch((v) => !v)}
                  data-ocid="nucleus-viz.search_toggle"
                >
                  <Atom className="h-3.5 w-3.5" />
                  Search
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>

                <div className="h-6 w-px bg-border mx-1" />

                {/* Decay triggers */}
                <Button
                  size="sm"
                  variant={animType === "alpha" ? "secondary" : "outline"}
                  className="gap-1.5 text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/70"
                  disabled={!canAlpha || animating}
                  onClick={() => startDecayAnim("alpha")}
                  data-ocid="nucleus-viz.play_alpha_button"
                  title={
                    !canAlpha
                      ? "Alpha decay requires A≥4, Z≥3, N≥2"
                      : "Play alpha decay animation"
                  }
                >
                  <Play className="h-3 w-3" />
                  Play α Decay
                </Button>
                <Button
                  size="sm"
                  variant={animType === "beta-" ? "secondary" : "outline"}
                  className="gap-1.5 text-xs border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/70"
                  disabled={!canBetaMinus || animating}
                  onClick={() => startDecayAnim("beta-")}
                  data-ocid="nucleus-viz.play_betaminus_button"
                >
                  <Play className="h-3 w-3" />
                  Play β⁻ Decay
                </Button>
                <Button
                  size="sm"
                  variant={animType === "beta+" ? "secondary" : "outline"}
                  className="gap-1.5 text-xs border-orange-500/40 text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/70"
                  disabled={!canBetaPlus || animating}
                  onClick={() => startDecayAnim("beta+")}
                  data-ocid="nucleus-viz.play_betaplus_button"
                >
                  <Play className="h-3 w-3" />
                  Play β⁺ Decay
                </Button>
                {animating && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-1.5 text-xs"
                    onClick={stopAnim}
                    data-ocid="nucleus-viz.stop_anim_button"
                  >
                    <Square className="h-3 w-3" />
                    Stop
                  </Button>
                )}
              </div>

              {/* Search row */}
              {showSearch && (
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <Input
                    placeholder="Search isotope (e.g. Fe-56, U-238…)"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="h-8 text-xs max-w-xs"
                    data-ocid="nucleus-viz.search_input"
                  />
                  <span className="text-xs text-muted-foreground">
                    Type exact label to jump
                  </span>
                </div>
              )}

              {/* Shell occupancy row */}
              {shellModel && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Shell Occupancy (magic numbers: {SHELL_MAGIC.join(", ")})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {shellLabels.map((shell, idx) => (
                      <span
                        key={shell.label}
                        className="rounded-full px-2.5 py-0.5 text-xs font-mono"
                        style={{
                          background: `oklch(${0.2 + idx * 0.04} 0.12 ${200 + idx * 15} / 0.4)`,
                          border: `1px solid oklch(${0.5 + idx * 0.04} 0.18 ${200 + idx * 15} / 0.4)`,
                          color: `oklch(${0.75 + idx * 0.02} 0.2 ${200 + idx * 15})`,
                        }}
                      >
                        {shell.label}: {shell.count}/
                        {shell.magic - (idx > 0 ? SHELL_MAGIC[idx - 1] : 0)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Isotope presets */}
            <div
              className="rounded-xl border border-border bg-card p-4"
              data-ocid="nucleus-viz.presets"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Select Isotope
              </p>
              <div className="flex flex-wrap gap-2">
                {ISOTOPE_PRESETS.map((preset) => {
                  const isActive = Z === preset.Z && N === preset.N;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setZ(preset.Z);
                        setN(preset.N);
                      }}
                      data-ocid={`nucleus-viz.preset.${preset.label.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`}
                      aria-pressed={isActive}
                      className={`rounded-full border px-3 py-1 text-xs font-mono font-semibold transition-colors ${
                        isActive
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Right: Sidebar stats + mini chart + sliders ──────────────── */}
          <div className="flex flex-col gap-4">
            {/* Nuclide profile card */}
            <div
              className="rounded-xl border border-border bg-card p-5"
              data-ocid="nucleus-viz.info_panel"
            >
              <h2 className="font-display font-bold text-foreground mb-1 text-lg flex items-center gap-2 flex-wrap">
                <span>
                  {el.name}-{A}
                </span>
                {magic.doubleMagic && (
                  <span className="rounded-full bg-amber-400/20 border border-amber-400/50 px-2 py-0.5 text-xs font-bold text-amber-300">
                    ✦ Double Magic
                  </span>
                )}
              </h2>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {magic.magicZ && !magic.doubleMagic && (
                  <span className="rounded-full bg-violet-500/15 border border-violet-400/40 px-2 py-0.5 text-xs font-semibold text-violet-300">
                    Magic Z={Z}
                  </span>
                )}
                {magic.magicN && !magic.doubleMagic && (
                  <span className="rounded-full bg-cyan-500/15 border border-cyan-400/40 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                    Magic N={N}
                  </span>
                )}
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  {
                    label: "Protons (Z)",
                    value: Z,
                    mono: true,
                    tooltip: "Defines the element",
                  },
                  {
                    label: "Neutrons (N)",
                    value: N,
                    mono: true,
                    tooltip: "Defines the isotope",
                  },
                  {
                    label: "Mass Number A",
                    value: A,
                    mono: true,
                    tooltip: "Z + N = total nucleons",
                  },
                  {
                    label: "N/Z Ratio",
                    value: (N / Math.max(Z, 1)).toFixed(3),
                    mono: true,
                    tooltip:
                      "Stability indicator; ~1 for light nuclei, ~1.5 for heavy",
                  },
                  {
                    label: "Stability",
                    value: stability === "stable" ? "✓ Stable" : "⚠ Unstable",
                    mono: false,
                  },
                  {
                    label: "Half-life",
                    value: found?.halfLifeStr ?? "—",
                    mono: false,
                    tooltip: "Time for half of a sample to decay",
                  },
                  {
                    label: "Primary Decay",
                    value: found?.decayModes[0] ?? "—",
                    mono: false,
                  },
                  {
                    label: "B/A (data)",
                    value: found?.bindingEnergyPerNucleon_MeV
                      ? `${found.bindingEnergyPerNucleon_MeV.toFixed(3)} MeV`
                      : "—",
                    mono: true,
                    tooltip:
                      "Binding energy per nucleon from experimental data",
                  },
                  {
                    label: "B/A (BW calc)",
                    value: `${be.perNucleon.toFixed(3)} MeV`,
                    mono: true,
                    tooltip: "Bethe-Weizsäcker semi-empirical calculation",
                  },
                  {
                    label: "Total B.E.",
                    value: `${be.total.toFixed(1)} MeV`,
                    mono: true,
                    tooltip: "Total nuclear binding energy",
                  },
                ].map(({ label, value, mono }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
                      {label}
                    </dt>
                    <dd
                      className={`text-sm font-semibold text-foreground leading-snug ${mono ? "font-mono" : ""}`}
                    >
                      {String(value)}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Spin, parity, decay modes */}
              <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-1.5">
                {spinParity && (
                  <span className="rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground font-mono">
                    Jᵖ = {spinParity}
                  </span>
                )}
                {found?.decayModes.map((mode) => (
                  <span
                    key={mode}
                    className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"
                  >
                    {mode}
                  </span>
                ))}
              </div>

              {/* Educational note */}
              <div className="mt-3 rounded-lg bg-muted/40 border border-border p-2.5">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    N/Z ≈ {(N / Math.max(Z, 1)).toFixed(2)}.
                  </strong>{" "}
                  {N / Math.max(Z, 1) < 1.05
                    ? "Near equal proton/neutron count — typical of light stable nuclei where nuclear force and Coulomb repulsion are balanced."
                    : N / Math.max(Z, 1) > 1.6
                      ? "High neutron excess — common in heavy nuclei where extra neutrons provide additional nuclear binding without Coulomb repulsion."
                      : "Moderate neutron excess — necessary to counteract Coulomb repulsion as Z increases."}
                </p>
              </div>
            </div>

            {/* Z/N Sliders */}
            <div
              className="flex flex-col gap-3"
              data-ocid="nucleus-viz.controls"
            >
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
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
                  data-ocid="nucleus-viz.z_slider"
                  className="[&_[role=slider]]:bg-red-400"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Atomic number — defines the element ({el.name})
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
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
                  data-ocid="nucleus-viz.n_slider"
                  className="[&_[role=slider]]:bg-blue-400"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Neutron number — defines the isotope
                </p>
              </div>
            </div>

            {/* Mini Chart of Nuclides */}
            <MiniNuclideChart
              activeZ={Z}
              activeN={N}
              onCellClick={(z, n) => {
                setZ(z);
                setN(n);
              }}
            />
          </div>
        </div>

        {/* ─── Binding Energy Panel ─────────────────────────────────────────── */}
        <div
          className="rounded-xl border border-border bg-card p-6 mb-6"
          data-ocid="nucleus-viz.binding_energy"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-foreground text-lg">
                Binding Energy Analysis
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bethe-Weizsäcker SEMF for {el.name}-{A} · Total B ={" "}
                {be.total.toFixed(1)} MeV · B/A = {be.perNucleon.toFixed(3)}{" "}
                MeV/nucleon
              </p>
            </div>
            {/* Tab switcher */}
            <div
              className="flex rounded-lg border border-border overflow-hidden"
              role="tablist"
            >
              {(["bw_terms", "be_curve", "formula"] as const).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={activeTab === tab}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground bg-muted/30"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`nucleus-viz.tab.${tab}`}
                >
                  {tab === "bw_terms"
                    ? "BW Terms"
                    : tab === "be_curve"
                      ? "B/A Curve"
                      : "Formula"}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "bw_terms" && (
            <div data-ocid="nucleus-viz.bw_terms_chart">
              <p className="text-xs text-muted-foreground mb-4">
                All five Bethe-Weizsäcker terms for {el.name}-{A}. Hover each
                bar for the formula and MeV contribution. Volume term dominates;
                Coulomb and Surface terms reduce binding; Pairing favors
                even-even nuclei.
              </p>
              <BWTermsBarChart Z={Z} N={N} />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
                {(
                  [
                    "Volume",
                    "Surface",
                    "Coulomb",
                    "Asymmetry",
                    "Pairing",
                  ] as const
                ).map((term) => {
                  const values = {
                    Volume: be.volume,
                    Surface: be.surface,
                    Coulomb: be.coulomb,
                    Asymmetry: be.asymmetry,
                    Pairing: be.pairing,
                  };
                  const val = values[term];
                  return (
                    <div
                      key={term}
                      className="rounded-lg bg-muted/30 border border-border p-2.5"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ background: BW_BAR_COLORS[term] }}
                        />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {term}
                        </span>
                      </div>
                      <p
                        className={`font-mono text-sm font-bold ${val >= 0 ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {val >= 0 ? "+" : ""}
                        {val.toFixed(1)} MeV
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "be_curve" && (
            <div data-ocid="nucleus-viz.be_chart">
              <p className="text-xs text-muted-foreground mb-4">
                B/A vs. mass number A. Bethe-Weizsäcker theoretical curve (blue
                line) vs. experimental data (green dots). Current isotope{" "}
                {el.symbol}-{A} marked with amber dot. Iron-56 peak ~8.79
                MeV/nucleon.
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={theoreticalChartData}
                  margin={{ top: 5, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="A"
                    stroke="#6b7280"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    label={{
                      value: "Mass Number A",
                      position: "insideBottom",
                      offset: -8,
                      fill: "#9ca3af",
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    domain={[0, 9.5]}
                    label={{
                      value: "B/A (MeV/nucleon)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      fill: "#9ca3af",
                      fontSize: 11,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.15 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#e5e7eb" }}
                    formatter={(value: number, name: string) => [
                      `${value?.toFixed(3)} MeV/nucleon`,
                      name === "theoretical"
                        ? "BW Theoretical"
                        : "Experimental",
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
                  <Line
                    type="monotone"
                    dataKey="theoretical"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={false}
                    name="BW Theoretical"
                  />
                  <Line
                    type="monotone"
                    dataKey="experimental"
                    stroke="#34d399"
                    strokeWidth={0}
                    dot={{ r: 2.5, fill: "#34d399", strokeWidth: 0 }}
                    connectNulls={false}
                    name="Experimental"
                  />
                  {beChartData.currentA >= 2 && (
                    <ReferenceDot
                      x={beChartData.currentA}
                      y={+beChartData.currentBE.perNucleon.toFixed(3)}
                      r={6}
                      fill="#f59e0b"
                      stroke="#fbbf24"
                      strokeWidth={2}
                      label={{
                        value: `${el.symbol}-${A}`,
                        position: "top",
                        fill: "#fbbf24",
                        fontSize: 10,
                      }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "formula" && (
            <>
              <EquationBlock
                latex={
                  "B = a_V A - a_S A^{2/3} - a_C \\frac{Z(Z-1)}{A^{1/3}} - a_A \\frac{(A-2Z)^2}{A} + \\delta(A,Z)"
                }
                annotation="Bethe-Weizsäcker formula: Volume, Surface, Coulomb, Asymmetry, and Pairing terms"
                label="Semi-Empirical Mass Formula"
              />
              <EquationBlock
                latex="\\text{Magic numbers}: 2,\\,8,\\,20,\\,28,\\,50,\\,82,\\,126"
                annotation="Nuclei with these proton or neutron counts have completely filled nuclear shells, yielding exceptional stability — analogous to noble-gas electron configurations. Double-magic nuclei (e.g. ²⁰⁸Pb: Z=82, N=126) are the most bound."
                label="Nuclear Magic Numbers"
              />
              <EquationBlock
                latex="Q = \\frac{3Ze^2}{5R_0^2}\\beta_2\\left(1 + \\frac{1}{2}\\sqrt{\\frac{5}{\\pi}}\\beta_2\\right)"
                annotation="Electric quadrupole moment Q; β₂ is the deformation parameter. Positive β₂ = prolate (rugby-ball shaped), negative β₂ = oblate (flattened disc) nucleus. Q = 0 for a perfectly spherical nucleus."
                label="Electric Quadrupole Moment"
              />
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {[
                  {
                    label: "Volume",
                    value: be.volume,
                    note: `+aV·A = +${BW_AV}·${A}`,
                  },
                  { label: "Surface", value: be.surface, note: "−aS·A^(2/3)" },
                  {
                    label: "Coulomb",
                    value: be.coulomb,
                    note: "−aC·Z(Z−1)/A^(1/3)",
                  },
                  {
                    label: "Asymmetry",
                    value: be.asymmetry,
                    note: "−aA·(A−2Z)²/A",
                  },
                  {
                    label: "Pairing δ",
                    value: be.pairing,
                    note:
                      A % 2 === 0
                        ? Z % 2 === 0
                          ? "even-even: +"
                          : "odd-odd: −"
                        : "odd-A: 0",
                  },
                ].map(({ label, value, note }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      {label}
                    </dt>
                    <dd
                      className={`font-mono text-sm font-semibold ${value >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {value >= 0 ? "+" : ""}
                      {value.toFixed(2)} MeV
                    </dd>
                    <span className="text-xs text-muted-foreground/60 font-mono">
                      {note}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col gap-0.5 border-t border-border pt-3 col-span-2 sm:col-span-1">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                    Total B
                  </dt>
                  <dd className="font-mono text-base font-bold text-primary">
                    {be.total.toFixed(2)} MeV
                  </dd>
                  <span className="text-xs text-muted-foreground/60 font-mono">
                    B/A = {be.perNucleon.toFixed(3)} MeV/nucleon
                  </span>
                </div>
              </dl>
              <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
                <strong>Constants:</strong> aV = {BW_AV}, aS = {BW_AS}, aC ={" "}
                {BW_AC}, aA = {BW_AA}, aP = {BW_AP} MeV. Iron-56 (~8.79
                MeV/nucleon) peaks the curve — fusion releases energy up to Fe;
                fission releases it beyond Fe.
              </p>
            </>
          )}
        </div>

        {/* Decay key */}
        <div className="rounded-xl border border-border bg-card/50 p-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {[
            { color: "#f87171", label: "Proton (Z, positive charge)" },
            { color: "#60a5fa", label: "Neutron (N, no charge)" },
            { color: "#fbbf24", label: "α particle (He-4, 2p + 2n)" },
            { color: "#38bdf8", label: "β⁻ electron" },
            { color: "#fb923c", label: "β⁺ positron" },
            { color: "#e879f9", label: "Anti/neutrino" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full flex-shrink-0"
                style={{ background: color }}
                aria-hidden="true"
              />
              <span className="text-xs">{label}</span>
            </div>
          ))}
          <p className="w-full text-xs mt-1 text-muted-foreground/70">
            Background gradient: blue-purple = near valley of stability · green
            = neutron-rich · orange-red = proton-rich. Drag to rotate ·
            Scroll/±buttons to zoom · Click mini chart cells to navigate
            isotopes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NucleusVisualizer;
