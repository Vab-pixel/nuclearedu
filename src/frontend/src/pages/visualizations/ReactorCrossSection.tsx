import { ReactorComparisonModal } from "@/components/ReactorComparisonModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Activity,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  RefreshCw,
  SkipBack,
  SkipForward,
  Thermometer,
  Zap,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  Component,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReactorSimState {
  reactorType: "PWR" | "BWR" | "CANDU" | "SMR";
  controlRodInsertion: number;
  powerLevel: number;
  coolantTempIn: number;
  coolantFlow: number;
  isPlaying: boolean;
  simTime: number;
  keff: number;
  thermalPower: number;
  coolantTempOut: number;
  neutronFluxDensity: number;
  coreAvgTemp: number;
  moderatorVoided: boolean;
}

interface HolographicLabel {
  id: string;
  text: string;
  subtext?: string;
  screenX: number;
  screenY: number;
  visible: boolean;
}

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

// ─── Simulation Math ──────────────────────────────────────────────────────────

function computeSimState(
  base: Pick<
    ReactorSimState,
    | "controlRodInsertion"
    | "powerLevel"
    | "coolantTempIn"
    | "coolantFlow"
    | "reactorType"
    | "moderatorVoided"
  >,
): Pick<
  ReactorSimState,
  | "keff"
  | "thermalPower"
  | "coolantTempOut"
  | "neutronFluxDensity"
  | "coreAvgTemp"
> {
  const {
    controlRodInsertion,
    powerLevel,
    coolantTempIn,
    coolantFlow,
    moderatorVoided,
  } = base;
  const voidPenalty = moderatorVoided ? 0.08 : 0;
  const keff = Math.max(
    0,
    1.0 +
      (1 - controlRodInsertion / 100) * 0.15 -
      (coolantTempIn - 300) * 0.0002 -
      voidPenalty,
  );
  const thermalPower = powerLevel * (keff > 0.99 ? 1.0 + (keff - 1) * 10 : 0.5);
  const coolantTempOut = coolantTempIn + thermalPower / (coolantFlow * 4.2);
  const neutronFluxDensity = Math.min(1, thermalPower / 3000);
  const coreAvgTemp = (coolantTempIn + coolantTempOut) / 2;
  return {
    keff,
    thermalPower,
    coolantTempOut,
    neutronFluxDensity,
    coreAvgTemp,
  };
}

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

// ─── Color helpers ────────────────────────────────────────────────────────────

function getTempColor(t: number): THREE.Color {
  if (t < 0.33)
    return new THREE.Color().lerpColors(
      new THREE.Color(0x000080),
      new THREE.Color(0x00ffff),
      t / 0.33,
    );
  if (t < 0.66)
    return new THREE.Color().lerpColors(
      new THREE.Color(0x00ffff),
      new THREE.Color(0xffff00),
      (t - 0.33) / 0.33,
    );
  return new THREE.Color().lerpColors(
    new THREE.Color(0xffff00),
    new THREE.Color(0xff4400),
    (t - 0.66) / 0.34,
  );
}

// ─── Fuel Rod Grid (Instanced) ────────────────────────────────────────────────

const FUEL_ROD_ROWS = 9;
const FUEL_ROD_COLS = 9;
const ROD_RADIUS = 0.055;
const ROD_HEIGHT = 2.6;
const ROD_SPACING = 0.2;

const FuelRodAssembly = memo(function FuelRodAssembly({
  neutronFlux,
  coreTemp,
}: {
  neutronFlux: number;
  coreTemp: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const count = FUEL_ROD_ROWS * FUEL_ROD_COLS;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current || !glowRef.current) return;
    let idx = 0;
    for (let r = 0; r < FUEL_ROD_ROWS; r++) {
      for (let c = 0; c < FUEL_ROD_COLS; c++) {
        const x = (r - (FUEL_ROD_ROWS - 1) / 2) * ROD_SPACING;
        const z = (c - (FUEL_ROD_COLS - 1) / 2) * ROD_SPACING;
        dummy.position.set(x, 0, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        glowRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const t = clock.getElapsedTime();
    const glowIntensity = 0.5 + 0.5 * Math.sin(t * 2.5) * neutronFlux;
    const mat = glowRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = glowIntensity * 4 * neutronFlux + 0.5;
    const tempT = Math.min(1, (coreTemp - 280) / 300);
    mat.emissive = getTempColor(tempT);
  });

  const fuelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2a2a2a),
        metalness: 0.9,
        roughness: 0.1,
      }),
    [],
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x001122),
        emissive: new THREE.Color(0x00c8ff),
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0.5,
        metalness: 0,
        roughness: 1,
      }),
    [],
  );

  const cylGeo = useMemo(
    () => new THREE.CylinderGeometry(ROD_RADIUS, ROD_RADIUS, ROD_HEIGHT, 10),
    [],
  );
  const glowGeo = useMemo(
    () =>
      new THREE.CylinderGeometry(
        ROD_RADIUS * 2.0,
        ROD_RADIUS * 2.0,
        ROD_HEIGHT * 1.05,
        10,
      ),
    [],
  );

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh
        ref={meshRef}
        args={[cylGeo, fuelMat, count]}
        castShadow
        receiveShadow
      />
      <instancedMesh ref={glowRef} args={[glowGeo, glowMat, count]} />
    </group>
  );
});

// ─── Control Rod Cluster ──────────────────────────────────────────────────────

const CONTROL_ROD_POSITIONS: [number, number][] = [
  [0, 0],
  [0.44, 0],
  [-0.44, 0],
  [0, 0.44],
  [0, -0.44],
  [0.44, 0.44],
  [-0.44, -0.44],
];

const ControlRods = memo(function ControlRods({
  insertion,
}: { insertion: number }) {
  const yOffset = 1.3 - (insertion / 100) * 2.6;

  const rodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a1a2e),
        metalness: 0.95,
        roughness: 0.05,
        emissive: new THREE.Color(0x0a0a20),
        emissiveIntensity: 0.3,
      }),
    [],
  );

  const capMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x6a6a8a),
        metalness: 0.98,
        roughness: 0.02,
      }),
    [],
  );

  const cylGeo = useMemo(
    () => new THREE.CylinderGeometry(0.035, 0.035, 3.0, 8),
    [],
  );
  const capGeo = useMemo(
    () => new THREE.CylinderGeometry(0.065, 0.065, 0.1, 8),
    [],
  );

  return (
    <group>
      {CONTROL_ROD_POSITIONS.map(([x, z]) => (
        <group key={`cr-${x}-${z}`} position={[x, yOffset, z]}>
          <mesh geometry={cylGeo} material={rodMat} castShadow />
          <mesh
            geometry={capGeo}
            material={capMat}
            position={[0, 1.55, 0]}
            castShadow
          />
        </group>
      ))}
    </group>
  );
});

// ─── Coolant Flow Particles ───────────────────────────────────────────────────

const COOLANT_COUNT = 120;

const CoolantParticles = memo(function CoolantParticles({
  flux,
  active,
}: {
  flux: number;
  active: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<ParticleData[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const initParticle = useCallback((): ParticleData => {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.6 + Math.random() * 0.5;
    return {
      position: new THREE.Vector3(
        Math.cos(angle) * r * 0.8,
        -1.3 + Math.random() * 0.3,
        Math.sin(angle) * r * 0.8,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        0.5 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.01,
      ),
      life: Math.random(),
      maxLife: 2.5 + Math.random() * 2,
    };
  }, []);

  useEffect(() => {
    particles.current = Array.from({ length: COOLANT_COUNT }, initParticle);
  }, [initParticle]);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x00ffff),
        emissive: new THREE.Color(0x00aaff),
        emissiveIntensity: 3.5,
        transparent: true,
        opacity: 0.85,
        metalness: 0,
        roughness: 0,
      }),
    [],
  );

  const geo = useMemo(() => new THREE.SphereGeometry(0.03, 4, 4), []);

  useFrame((_, delta) => {
    if (!meshRef.current || !active) return;
    const speed = 0.5 + flux * 2.0;
    particles.current.forEach((p, i) => {
      p.life += delta * speed;
      p.position.addScaledVector(p.velocity, delta * speed);
      if (p.life > p.maxLife || p.position.y > 1.6) {
        Object.assign(p, initParticle());
      }
      dummy.position.copy(p.position);
      const s = 0.8 + 0.4 * (p.life / p.maxLife);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, COOLANT_COUNT]} />;
});

// ─── Neutron Flux Particles ───────────────────────────────────────────────────

const NEUTRON_COUNT = 200;

const NeutronParticles = memo(function NeutronParticles({
  flux,
  active,
}: {
  flux: number;
  active: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<ParticleData[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const initNeutron = useCallback((): ParticleData => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * 0.5;
    return {
      position: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 2.0,
        r * Math.sin(phi) * Math.sin(theta),
      ),
      velocity: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      )
        .normalize()
        .multiplyScalar(1.2 + Math.random() * 1.2),
      life: Math.random() * 0.5,
      maxLife: 0.4 + Math.random() * 0.8,
    };
  }, []);

  useEffect(() => {
    particles.current = Array.from({ length: NEUTRON_COUNT }, initNeutron);
  }, [initNeutron]);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffffff),
        emissive: new THREE.Color(0x88eeff),
        emissiveIntensity: 6,
        transparent: true,
        opacity: 0.95,
      }),
    [],
  );

  const geo = useMemo(() => new THREE.SphereGeometry(0.015, 4, 4), []);

  useFrame((_, delta) => {
    if (!meshRef.current || !active || flux < 0.05) return;
    const speed = flux * 3;
    particles.current.forEach((p, i) => {
      p.life += delta * speed;
      p.position.addScaledVector(p.velocity, delta * speed * 0.5);
      if (p.life > p.maxLife || p.position.length() > 1.8) {
        Object.assign(p, initNeutron());
      }
      dummy.position.copy(p.position);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, NEUTRON_COUNT]} />;
});

// ─── Steam Particles ──────────────────────────────────────────────────────────

const STEAM_COUNT = 35;

const SteamParticles = memo(function SteamParticles({
  active,
}: { active: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<ParticleData[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const initSteam = useCallback(
    (): ParticleData => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 1.2,
        1.3 + Math.random() * 0.2,
        (Math.random() - 0.5) * 1.2,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.08,
        0.25 + Math.random() * 0.35,
        (Math.random() - 0.5) * 0.08,
      ),
      life: Math.random() * 2,
      maxLife: 3 + Math.random() * 2,
    }),
    [],
  );

  useEffect(() => {
    particles.current = Array.from({ length: STEAM_COUNT }, initSteam);
  }, [initSteam]);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffffff),
        emissive: new THREE.Color(0xaaccee),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.3,
      }),
    [],
  );

  const geo = useMemo(() => new THREE.SphereGeometry(0.07, 4, 4), []);

  useFrame((_, delta) => {
    if (!meshRef.current || !active) return;
    particles.current.forEach((p, i) => {
      p.life += delta;
      p.position.addScaledVector(p.velocity, delta);
      if (p.life > p.maxLife || p.position.y > 4.0) {
        Object.assign(p, initSteam());
      }
      dummy.position.copy(p.position);
      const fade = 1 - p.life / p.maxLife;
      dummy.scale.setScalar(fade * 1.8 + 0.5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, STEAM_COUNT]} />;
});

// ─── Pressure Vessel (Cutaway) ────────────────────────────────────────────────

const PressureVessel = memo(function PressureVessel() {
  const outerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2a3a4a),
        metalness: 0.92,
        roughness: 0.08,
        side: THREE.DoubleSide,
        envMapIntensity: 1.5,
      }),
    [],
  );
  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a2530),
        metalness: 0.8,
        roughness: 0.2,
        side: THREE.BackSide,
      }),
    [],
  );

  const outerGeo = useMemo(
    () => new THREE.CylinderGeometry(1.65, 1.65, 3.5, 64, 1, true),
    [],
  );
  const bottomGeo = useMemo(() => new THREE.RingGeometry(1.4, 1.65, 64), []);
  const headGeo = useMemo(
    () =>
      new THREE.SphereGeometry(1.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    [],
  );
  const shroudGeo = useMemo(
    () => new THREE.CylinderGeometry(1.05, 1.05, 3.1, 32, 1, true),
    [],
  );
  const bottomDishGeo = useMemo(
    () =>
      new THREE.SphereGeometry(
        1.65,
        32,
        16,
        0,
        Math.PI * 2,
        Math.PI / 2,
        Math.PI / 2,
      ),
    [],
  );
  const gridGeo = useMemo(() => new THREE.RingGeometry(0.2, 1.05, 32, 1), []);

  const gridMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x445566),
        metalness: 0.9,
        roughness: 0.1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  return (
    <group>
      <mesh geometry={outerGeo} material={outerMat} castShadow receiveShadow />
      <mesh geometry={outerGeo} material={innerMat} />
      <mesh
        geometry={headGeo}
        material={outerMat}
        position={[0, 1.75, 0]}
        castShadow
      />
      <mesh
        geometry={bottomDishGeo}
        material={outerMat}
        position={[0, -1.75, 0]}
        rotation={[Math.PI, 0, 0]}
        castShadow
      />
      <mesh geometry={shroudGeo} material={gridMat} castShadow />
      {([-0.9, 0, 0.9] as const).map((y) => (
        <mesh
          key={`grid-${y}`}
          geometry={gridGeo}
          material={gridMat}
          position={[0, y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
      <mesh
        geometry={bottomGeo}
        material={outerMat}
        position={[0, -1.75, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

// ─── Coolant Pipes ────────────────────────────────────────────────────────────

const CoolantPipes = memo(function CoolantPipes() {
  const pipeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1e3a5f),
        metalness: 0.95,
        roughness: 0.05,
        emissive: new THREE.Color(0x003366),
        emissiveIntensity: 0.5,
      }),
    [],
  );
  const pipeGeo = useMemo(
    () => new THREE.TorusGeometry(1.4, 0.045, 8, 32, Math.PI * 0.6),
    [],
  );
  const vertGeo = useMemo(
    () => new THREE.CylinderGeometry(0.045, 0.045, 0.9, 8),
    [],
  );

  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh
            geometry={pipeGeo}
            material={pipeMat}
            position={[0, -0.7, 0]}
            rotation={[Math.PI / 2, 0, Math.PI * 0.2]}
          />
          <mesh
            geometry={vertGeo}
            material={pipeMat}
            position={[1.4, -0.25, 0]}
          />
        </group>
      ))}
    </group>
  );
});

// ─── Cherenkov Glow Pool ──────────────────────────────────────────────────────

const CherenkovGlow = memo(function CherenkovGlow({ flux }: { flux: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !diskRef.current || !outerRef.current) return;
    const t = clock.getElapsedTime();
    const intensity = (0.5 + 0.5 * Math.sin(t * 2.5)) * flux;

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = intensity * 3.5 + 0.5;
    mat.opacity = 0.35 + intensity * 0.4;

    const dMat = diskRef.current.material as THREE.MeshStandardMaterial;
    dMat.emissiveIntensity = intensity * 2.0;
    dMat.opacity = 0.2 + intensity * 0.3;

    const oMat = outerRef.current.material as THREE.MeshStandardMaterial;
    oMat.emissiveIntensity = intensity * 1.5 + 0.2;
    oMat.opacity = 0.1 + intensity * 0.15;
  });

  const cylinderGeo = useMemo(
    () => new THREE.CylinderGeometry(0.9, 0.9, 2.8, 32, 1, true),
    [],
  );
  const outerCylGeo = useMemo(
    () => new THREE.CylinderGeometry(1.2, 1.2, 3.0, 32, 1, true),
    [],
  );
  const diskGeo = useMemo(() => new THREE.CircleGeometry(0.9, 32), []);

  const glowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x001133),
        emissive: new THREE.Color(0x00c8ff),
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  const outerGlowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000820),
        emissive: new THREE.Color(0x0055ff),
        emissiveIntensity: 1.0,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  const diskMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000820),
        emissive: new THREE.Color(0x0080ff),
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      }),
    [],
  );

  return (
    <group>
      <mesh ref={meshRef} geometry={cylinderGeo} material={glowMat} />
      <mesh ref={outerRef} geometry={outerCylGeo} material={outerGlowMat} />
      <mesh
        ref={diskRef}
        geometry={diskGeo}
        material={diskMat}
        position={[0, 1.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

// ─── Core Lighting ────────────────────────────────────────────────────────────

const CoreLighting = memo(function CoreLighting({
  flux,
  powerLevel,
}: {
  flux: number;
  powerLevel: number;
}) {
  const coreRef = useRef<THREE.PointLight>(null);
  const hotRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current || !hotRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.5);
    const baseIntensity = (0.8 + pulse * 0.8) * flux * (powerLevel / 3000) * 6;
    coreRef.current.intensity = baseIntensity;
    hotRef.current.intensity = baseIntensity * 0.8;
  });

  return (
    <>
      <directionalLight
        position={[5, 8, 4]}
        intensity={2.8}
        color={0xfff5e0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.7}
        color={0x6090ff}
      />
      <directionalLight
        position={[0, -3, 5]}
        intensity={0.35}
        color={0x0088cc}
      />
      {/* Cherenkov blue core light */}
      <pointLight
        ref={coreRef}
        position={[0, 0, 0]}
        color={0x00c8ff}
        intensity={3}
        distance={8}
        decay={2}
        castShadow
      />
      {/* Hot orange center */}
      <pointLight
        ref={hotRef}
        position={[0, 0.5, 0]}
        color={0xff8800}
        intensity={2}
        distance={5}
        decay={2}
      />
      {/* Ambient */}
      <ambientLight intensity={0.06} color={0x0a1a2a} />
    </>
  );
});

// ─── Scene Setup ──────────────────────────────────────────────────────────────

function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);
  return null;
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────

const ReactorScene = memo(function ReactorScene({
  sim,
  reducedMotion,
}: {
  sim: ReactorSimState;
  reducedMotion: boolean;
}) {
  const active = sim.isPlaying && !reducedMotion;

  return (
    <>
      <SceneSetup />
      <fog attach="fog" args={[0x030810, 10, 28]} />
      <CoreLighting flux={sim.neutronFluxDensity} powerLevel={sim.powerLevel} />
      <PressureVessel />
      <CoolantPipes />
      <FuelRodAssembly
        neutronFlux={sim.neutronFluxDensity}
        coreTemp={sim.coreAvgTemp}
      />
      <ControlRods insertion={sim.controlRodInsertion} />
      <CherenkovGlow flux={sim.neutronFluxDensity} />
      <CoolantParticles flux={sim.neutronFluxDensity} active={active} />
      <NeutronParticles flux={sim.neutronFluxDensity} active={active} />
      <SteamParticles active={active && sim.coolantTempOut > 320} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={0.3}
        maxPolarAngle={1.8}
        minDistance={4}
        maxDistance={18}
        autoRotate={false}
        makeDefault
      />
    </>
  );
});

// ─── Holographic Labels ───────────────────────────────────────────────────────

const HOLO_LABELS: HolographicLabel[] = [
  {
    id: "fuel",
    text: "FUEL ROD ARRAY",
    subtext: "UO₂ Zircaloy-4 Clad",
    screenX: 55,
    screenY: 42,
    visible: true,
  },
  {
    id: "control",
    text: "CONTROL RODS",
    subtext: "B₄C Neutron Absorber",
    screenX: 52,
    screenY: 22,
    visible: true,
  },
  {
    id: "coolant",
    text: "PRIMARY COOLANT",
    subtext: "H₂O @ 15.5 MPa",
    screenX: 20,
    screenY: 55,
    visible: true,
  },
  {
    id: "cherenkov",
    text: "CHERENKOV GLOW",
    subtext: "β⁻ → Čerenkov Radiation",
    screenX: 72,
    screenY: 35,
    visible: true,
  },
  {
    id: "shroud",
    text: "CORE SHROUD",
    subtext: "316L Stainless Steel",
    screenX: 18,
    screenY: 38,
    visible: true,
  },
];

function HoloLabels({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {HOLO_LABELS.map((lbl) => (
        <div
          key={lbl.id}
          className="absolute flex items-center gap-1.5"
          style={{ left: `${lbl.screenX}%`, top: `${lbl.screenY}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <div
            className="holo-panel px-2 py-1 rounded"
            style={{ borderLeft: "1px solid oklch(0.72 0.25 286 / 0.6)" }}
          >
            <div className="holo-text text-[10px] leading-tight">
              {lbl.text}
            </div>
            {lbl.subtext && (
              <div className="text-[9px] text-muted-foreground font-mono opacity-70">
                {lbl.subtext}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Gauge Bar ────────────────────────────────────────────────────────────────

function GaugeBar({
  label,
  value,
  min,
  max,
  unit,
  warnAbove,
  dangerAbove,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  warnAbove?: number;
  dangerAbove?: number;
}) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const isDanger = dangerAbove !== undefined && value > dangerAbove;
  const isWarn = !isDanger && warnAbove !== undefined && value > warnAbove;
  const barColor = isDanger ? "#ef4444" : isWarn ? "#f59e0b" : "#00d4ff";
  const glowColor = isDanger
    ? "rgba(239,68,68,0.5)"
    : isWarn
      ? "rgba(245,158,11,0.5)"
      : "rgba(0,212,255,0.5)";

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`text-xs font-mono font-bold ${isDanger ? "text-red-400" : isWarn ? "text-amber-400" : "text-foreground"}`}
        >
          {typeof value === "number"
            ? value.toFixed(value < 10 ? 3 : 0)
            : value}{" "}
          {unit}
        </span>
      </div>
      <div
        className="h-2 bg-muted/30 rounded-full overflow-hidden"
        style={{ boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: barColor,
            boxShadow: `0 0 8px ${glowColor}`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Simulation Timeline ──────────────────────────────────────────────────────

function SimTimeline({
  simTime,
  isPlaying,
  onToggle,
  onReset,
  onSeek,
}: {
  simTime: number;
  isPlaying: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSeek: (t: number) => void;
}) {
  const MAX_TIME = 120;
  const pct = (simTime / MAX_TIME) * 100;

  return (
    <div className="holo-panel rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          SIMULATION TIMELINE
        </span>
        <span className="text-[10px] font-mono text-foreground">
          {simTime.toFixed(1)}s / {MAX_TIME}s
        </span>
      </div>
      <div className="space-y-1.5 mb-3">
        {["NEUTRON FLUX", "COOLANT FLOW", "FUEL TEMP"].map((track, ti) => (
          <div key={track} className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground font-mono w-20 shrink-0">
              {track}
            </span>
            <div className="timeline-track flex-1 relative">
              <div
                className="absolute inset-y-0 left-0 bg-primary/40 rounded-full"
                style={{ width: `${pct * (0.85 + ti * 0.05)}%` }}
              />
              <div
                className="timeline-handle"
                style={{
                  left: `calc(${Math.min(95, pct * (0.85 + ti * 0.05))}% - 8px)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-muted-foreground hover:text-foreground"
          onClick={onReset}
          data-ocid="reactor.timeline_skip_back"
        >
          <SkipBack className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-primary/20 text-primary hover:bg-primary/30"
          onClick={onToggle}
          data-ocid="reactor.sim_play_button"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-muted-foreground hover:text-foreground"
          data-ocid="reactor.timeline_skip_forward"
        >
          <SkipForward className="w-3 h-3" />
        </Button>
        <div className="flex-1 relative">
          <input
            type="range"
            min={0}
            max={MAX_TIME}
            step={0.5}
            value={simTime}
            onChange={(e) => onSeek(Number.parseFloat(e.target.value))}
            className="w-full h-2 appearance-none bg-muted/40 rounded-full cursor-pointer accent-primary"
            data-ocid="reactor.timeline_scrubber"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Reactor Type Config ──────────────────────────────────────────────────────

const REACTOR_TYPE_DATA = {
  PWR: {
    name: "PWR",
    full: "Pressurized Water Reactor",
    coolantFlow: 18000,
    maxPower: 3400,
    country: "USA/FR/CN",
  },
  BWR: {
    name: "BWR",
    full: "Boiling Water Reactor",
    coolantFlow: 14000,
    maxPower: 3300,
    country: "USA/JP",
  },
  CANDU: {
    name: "CANDU",
    full: "CANDU Pressurized Heavy Water",
    coolantFlow: 16000,
    maxPower: 2000,
    country: "CA",
  },
  SMR: {
    name: "SMR",
    full: "Small Modular Reactor",
    coolantFlow: 5000,
    maxPower: 300,
    country: "Multi",
  },
} as const;

// ─── Classic View (2D Digital Twin) ──────────────────────────────────────────

function ClassicReactorView({
  sim,
  updateSim,
  handleReset,
}: {
  sim: ReactorSimState;
  updateSim: (patch: Partial<ReactorSimState>) => void;
  handleReset: () => void;
}) {
  const [classicTab, setClassicTab] = useState<"depletion" | "transients">(
    "depletion",
  );
  const [animTime, setAnimTime] = useState(0);

  useEffect(() => {
    if (!sim.isPlaying) return;
    const id = setInterval(() => setAnimTime((t) => t + 0.05), 50);
    return () => clearInterval(id);
  }, [sim.isPlaying]);

  const coreGlowIntensity = sim.neutronFluxDensity;
  const powerPct = Math.min(100, (sim.powerLevel / 3400) * 100);
  const keffStatus =
    sim.keff > 1.05
      ? "SUPERCRITICAL"
      : sim.keff > 0.99
        ? "CRITICAL"
        : "SUBCRITICAL";
  const keffColor =
    sim.keff > 1.05 ? "#ef4444" : sim.keff > 0.99 ? "#f59e0b" : "#00d4ff";
  const efficiency = 34;

  // Neutron particles (CSS-based)
  const neutronDots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360 + animTime * (30 + i * 5),
    r: 60 + (i % 3) * 20,
    opacity: 0.4 + 0.6 * ((i % 3) / 3),
  }));

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050a14 0%, #0a0e1a 50%, #070d18 100%)",
        border: "1px solid rgba(0, 212, 255, 0.25)",
        boxShadow:
          "0 0 40px rgba(0, 100, 200, 0.15), inset 0 0 60px rgba(0, 50, 100, 0.1)",
        fontFamily: "'Geist Mono', monospace",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          background: "rgba(0,20,40,0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00ff88",
              boxShadow: "0 0 8px #00ff88",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              color: "#00d4ff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            REACTOR THEORY &amp; DESIGN — DIGITAL TWIN
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={() => updateSim({ isPlaying: !sim.isPlaying })}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              border: "1px solid rgba(0,255,136,0.4)",
              background: sim.isPlaying
                ? "rgba(0,255,136,0.2)"
                : "rgba(0,255,136,0.08)",
              color: "#00ff88",
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.1em",
            }}
            data-ocid="reactor.classic_play_button"
          >
            {sim.isPlaying ? "⏸ PAUSE" : "▶ START SIMULATOR"}
          </button>
          <button
            type="button"
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(0,212,255,0.3)",
              background: "rgba(0,212,255,0.08)",
              color: "#00d4ff",
              fontSize: 10,
              cursor: "pointer",
            }}
            data-ocid="reactor.classic_load"
          >
            LOAD DESIGN
          </button>
          <button
            type="button"
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(0,212,255,0.3)",
              background: "rgba(0,212,255,0.08)",
              color: "#00d4ff",
              fontSize: 10,
              cursor: "pointer",
            }}
            data-ocid="reactor.classic_save"
          >
            SAVE DESIGN
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(255,100,100,0.3)",
              background: "rgba(255,60,60,0.08)",
              color: "#ff6060",
              fontSize: 10,
              cursor: "pointer",
            }}
            data-ocid="reactor.classic_reset"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Main grid: left sidebar | center canvas | right panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr 220px",
          gap: 0,
          minHeight: 520,
        }}
      >
        {/* LEFT SIDEBAR */}
        <div
          style={{
            borderRight: "1px solid rgba(0,212,255,0.15)",
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            background: "rgba(0,10,25,0.6)",
          }}
        >
          <div
            style={{
              color: "#00d4ff",
              fontSize: 10,
              letterSpacing: "0.18em",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            REACTOR THEORY &amp; DESIGN
          </div>

          {/* Reactor type nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(["PWR", "BWR", "CANDU", "SMR"] as const).map((type) => (
              <button
                type="button"
                key={type}
                onClick={() =>
                  updateSim({
                    reactorType: type,
                    coolantFlow: REACTOR_TYPE_DATA[type].coolantFlow,
                  })
                }
                style={{
                  padding: "6px 10px",
                  borderRadius: 4,
                  border: `1px solid ${sim.reactorType === type ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.15)"}`,
                  background:
                    sim.reactorType === type
                      ? "rgba(0,212,255,0.15)"
                      : "transparent",
                  color:
                    sim.reactorType === type
                      ? "#00d4ff"
                      : "rgba(0,212,255,0.5)",
                  fontSize: 10,
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                data-ocid={`reactor.classic_type_${type.toLowerCase()}`}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background:
                      sim.reactorType === type
                        ? "#00d4ff"
                        : "rgba(0,212,255,0.3)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {REACTOR_TYPE_DATA[type].full}
              </button>
            ))}
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(0,212,255,0.1)",
            }}
          />

          {/* Control sliders */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "rgba(0,212,255,0.6)", fontSize: 9 }}>
                  CONTROL RODS
                </span>
                <span style={{ color: "#00d4ff", fontSize: 9 }}>
                  {sim.controlRodInsertion}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={sim.controlRodInsertion}
                onChange={(e) =>
                  updateSim({ controlRodInsertion: Number(e.target.value) })
                }
                style={{ width: "100%", accentColor: "#00d4ff" }}
                data-ocid="reactor.classic_rod_slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(0,212,255,0.4)", fontSize: 8 }}>
                  OUT
                </span>
                <span style={{ color: "rgba(0,212,255,0.4)", fontSize: 8 }}>
                  IN
                </span>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "rgba(0,212,255,0.6)", fontSize: 9 }}>
                  COOLANT FLOW
                </span>
                <span style={{ color: "#00d4ff", fontSize: 9 }}>
                  {(sim.coolantFlow / 1000).toFixed(0)}k kg/s
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={20000}
                step={500}
                value={sim.coolantFlow}
                onChange={(e) =>
                  updateSim({ coolantFlow: Number(e.target.value) })
                }
                style={{ width: "100%", accentColor: "#00ffaa" }}
                data-ocid="reactor.classic_flow_slider"
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "rgba(0,212,255,0.6)", fontSize: 9 }}>
                  POWER LEVEL
                </span>
                <span style={{ color: "#00d4ff", fontSize: 9 }}>
                  {sim.powerLevel} MWth
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={REACTOR_TYPE_DATA[sim.reactorType].maxPower}
                step={50}
                value={sim.powerLevel}
                onChange={(e) =>
                  updateSim({ powerLevel: Number(e.target.value) })
                }
                style={{ width: "100%", accentColor: "#ffaa00" }}
                data-ocid="reactor.classic_power_slider"
              />
            </div>
          </div>
        </div>

        {/* CENTER: Reactor SVG visualization */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 10px",
            gap: 10,
          }}
        >
          <div
            style={{
              color: "#00d4ff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textAlign: "center",
              marginBottom: 4,
              textShadow: "0 0 12px rgba(0,212,255,0.8)",
            }}
          >
            HYPER-DETAILED 3D REACTOR DIGITAL TWIN
          </div>

          {/* SVG Reactor cross-section */}
          <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
            <svg
              viewBox="0 0 380 400"
              style={{
                width: "100%",
                filter: `brightness(${0.9 + coreGlowIntensity * 0.3}) saturate(1.3)`,
              }}
              aria-label="Reactor cross-section visualization"
            >
              <title>Nuclear Reactor Cross-Section</title>
              <defs>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffff00" stopOpacity="0.95" />
                  <stop offset="30%" stopColor="#ff8c00" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#ff4400" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#220000" stopOpacity="0.3" />
                </radialGradient>
                <radialGradient id="cherenkovGlow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor="#0088ff"
                    stopOpacity={0.3 + coreGlowIntensity * 0.4}
                  />
                  <stop
                    offset="50%"
                    stopColor="#0044aa"
                    stopOpacity={0.2 + coreGlowIntensity * 0.2}
                  />
                  <stop offset="100%" stopColor="#000033" stopOpacity="0.05" />
                </radialGradient>
                <radialGradient id="vesselGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="100%" stopColor="#0a1520" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="vesselClip">
                  <ellipse cx="190" cy="210" rx="130" ry="160" />
                </clipPath>
              </defs>

              {/* Outer containment ring */}
              <ellipse
                cx="190"
                cy="210"
                rx="165"
                ry="190"
                fill="none"
                stroke="rgba(30,60,100,0.6)"
                strokeWidth="8"
              />
              <ellipse
                cx="190"
                cy="210"
                rx="157"
                ry="182"
                fill="none"
                stroke="rgba(0,212,255,0.12)"
                strokeWidth="2"
                strokeDasharray="8,4"
              />

              {/* Pressure vessel */}
              <ellipse
                cx="190"
                cy="210"
                rx="135"
                ry="165"
                fill="url(#vesselGrad)"
                stroke="#1e4a7a"
                strokeWidth="3"
              />
              <ellipse
                cx="190"
                cy="210"
                rx="128"
                ry="158"
                fill="none"
                stroke="rgba(0,212,255,0.25)"
                strokeWidth="1"
              />

              {/* Cherenkov glow inside vessel */}
              <ellipse
                cx="190"
                cy="210"
                rx="100"
                ry="130"
                fill="url(#cherenkovGlow)"
              />

              {/* Core region */}
              <ellipse
                cx="190"
                cy="210"
                rx="78"
                ry="100"
                fill="url(#coreGradient)"
                filter="url(#strongGlow)"
              />

              {/* Fuel rod array (7x7 grid) */}
              {(() => {
                const rods: ReactElement[] = [];
                for (let row = 0; row < 7; row++) {
                  for (let col = 0; col < 7; col++) {
                    const cx = 190 - 3 * 20 + col * 20;
                    const cy = 210 - 3 * 25 + row * 25;
                    const dx = Math.abs(col - 3);
                    const dy = Math.abs(row - 3);
                    if (dx * 1.2 + dy > 4.5) continue;
                    const tempT = Math.min(1, 1 - (dx + dy) / 5);
                    const rc = 204 + Math.round(tempT * 51);
                    const gc = Math.round(100 + tempT * 80);
                    rods.push(
                      <rect
                        key={`rod-${row}-${col}`}
                        x={cx - 4}
                        y={cy - 10}
                        width={8}
                        height={20}
                        rx={2}
                        fill={`rgb(${rc},${gc},0)`}
                        stroke="rgba(255,255,100,0.3)"
                        strokeWidth="0.5"
                        filter={tempT > 0.7 ? "url(#glow)" : undefined}
                        opacity={0.85 + tempT * 0.15}
                      />,
                    );
                  }
                }
                return rods;
              })()}

              {/* Control rods (inserted from top) */}
              {[170, 190, 210].map((cx) => (
                <g key={cx}>
                  <rect
                    x={cx - 3}
                    y={60}
                    width={6}
                    height={100 + (sim.controlRodInsertion / 100) * 80}
                    rx={2}
                    fill="#1a1a3e"
                    stroke="#6666cc"
                    strokeWidth={1}
                    opacity={0.9}
                  />
                </g>
              ))}

              {/* Coolant flow channels (animated dashes) */}
              {[150, 190, 230].map((x, i) => (
                <line
                  key={x}
                  x1={x}
                  y1="350"
                  x2={x}
                  y2="70"
                  stroke="rgba(0,200,255,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="6,8"
                  strokeDashoffset={-(animTime * 80 + i * 20) % 28}
                />
              ))}

              {/* Animated neutron dots radiating from core */}
              {neutronDots.map((dot) => {
                const rad = (dot.angle * Math.PI) / 180;
                const x = 190 + Math.cos(rad) * dot.r;
                const y = 210 + Math.sin(rad) * dot.r * 0.78;
                return (
                  <circle
                    key={dot.id}
                    cx={x}
                    cy={y}
                    r={2.5}
                    fill="white"
                    opacity={dot.opacity}
                    filter="url(#glow)"
                  />
                );
              })}

              {/* Labels with connector lines */}
              {/* FUEL RODS label */}
              <line
                x1="248"
                y1="210"
                x2="295"
                y2="190"
                stroke="rgba(0,212,255,0.5)"
                strokeWidth="1"
              />
              <rect
                x="296"
                y="180"
                width="70"
                height="20"
                rx="3"
                fill="rgba(0,10,30,0.9)"
                stroke="rgba(0,212,255,0.5)"
                strokeWidth="1"
              />
              <text
                x="330"
                y="194"
                fill="#00d4ff"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
                fontWeight="bold"
              >
                FUEL RODS
              </text>

              {/* CONTROL RODS label */}
              <line
                x1="190"
                y1="140"
                x2="240"
                y2="105"
                stroke="rgba(150,150,255,0.5)"
                strokeWidth="1"
              />
              <rect
                x="241"
                y="96"
                width="80"
                height="20"
                rx="3"
                fill="rgba(0,10,30,0.9)"
                stroke="rgba(150,150,255,0.5)"
                strokeWidth="1"
              />
              <text
                x="281"
                y="110"
                fill="#9999ff"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
                fontWeight="bold"
              >
                CONTROL RODS
              </text>

              {/* COOLANT FLOW label */}
              <line
                x1="60"
                y1="310"
                x2="90"
                y2="310"
                stroke="rgba(0,200,255,0.5)"
                strokeWidth="1"
              />
              <rect
                x="0"
                y="300"
                width="88"
                height="20"
                rx="3"
                fill="rgba(0,10,30,0.9)"
                stroke="rgba(0,200,255,0.5)"
                strokeWidth="1"
              />
              <text
                x="44"
                y="314"
                fill="#00c8ff"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
                fontWeight="bold"
              >
                COOLANT FLOW
              </text>

              {/* PRESSURE VESSEL label */}
              <line
                x1="60"
                y1="150"
                x2="93"
                y2="170"
                stroke="rgba(0,212,255,0.4)"
                strokeWidth="1"
              />
              <rect
                x="0"
                y="140"
                width="90"
                height="20"
                rx="3"
                fill="rgba(0,10,30,0.9)"
                stroke="rgba(0,212,255,0.4)"
                strokeWidth="1"
              />
              <text
                x="45"
                y="154"
                fill="#00d4ff"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                PRESSURE VESSEL
              </text>

              {/* CORE TEMP label */}
              <line
                x1="190"
                y1="270"
                x2="190"
                y2="330"
                stroke="rgba(255,150,0,0.5)"
                strokeWidth="1"
              />
              <rect
                x="138"
                y="331"
                width="104"
                height="20"
                rx="3"
                fill="rgba(0,10,30,0.9)"
                stroke="rgba(255,150,0,0.5)"
                strokeWidth="1"
              />
              <text
                x="190"
                y="345"
                fill="#ffaa00"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
                fontWeight="bold"
              >
                CORE TEMP: {sim.coreAvgTemp.toFixed(0)}°C
              </text>

              {/* Cooling circuit outer path */}
              <ellipse
                cx="190"
                cy="210"
                rx="150"
                ry="180"
                fill="none"
                stroke="rgba(0,180,255,0.2)"
                strokeWidth="2"
                strokeDasharray="12,6"
                strokeDashoffset={-(animTime * 60) % 36}
              />
            </svg>
          </div>

          {/* Bottom TIME-SCRUB */}
          <div
            style={{
              width: "100%",
              background: "rgba(0,10,25,0.8)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: 8,
              padding: "10px 14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <button
                type="button"
                onClick={() => setClassicTab("depletion")}
                style={{
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: `1px solid ${classicTab === "depletion" ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)"}`,
                  background:
                    classicTab === "depletion"
                      ? "rgba(0,212,255,0.15)"
                      : "transparent",
                  color:
                    classicTab === "depletion"
                      ? "#00d4ff"
                      : "rgba(0,212,255,0.4)",
                  fontSize: 9,
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                }}
                data-ocid="reactor.classic_tab_depletion"
              >
                FUEL DEPLETION
              </button>
              <button
                type="button"
                onClick={() => setClassicTab("transients")}
                style={{
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: `1px solid ${classicTab === "transients" ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)"}`,
                  background:
                    classicTab === "transients"
                      ? "rgba(0,212,255,0.15)"
                      : "transparent",
                  color:
                    classicTab === "transients"
                      ? "#00d4ff"
                      : "rgba(0,212,255,0.4)",
                  fontSize: 9,
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                }}
                data-ocid="reactor.classic_tab_transients"
              >
                TRANSIENTS
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => updateSim({ isPlaying: !sim.isPlaying })}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  border: "1px solid rgba(0,212,255,0.4)",
                  background: "rgba(0,212,255,0.12)",
                  color: "#00d4ff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                data-ocid="reactor.classic_timeline_play"
              >
                {sim.isPlaying ? "⏸" : "▶"}
              </button>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  fontSize: 8,
                  color: "rgba(0,212,255,0.5)",
                  flexShrink: 0,
                }}
              >
                {["SEC", "MIN", "HR", "DAY", "MON"].map((u) => (
                  <span
                    key={u}
                    style={{
                      padding: "2px 5px",
                      border: "1px solid rgba(0,212,255,0.15)",
                      borderRadius: 3,
                    }}
                  >
                    {u}
                  </span>
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={120}
                step={0.5}
                value={sim.simTime}
                onChange={(e) => updateSim({ simTime: Number(e.target.value) })}
                style={{ flex: 1, accentColor: "#00d4ff" }}
                data-ocid="reactor.classic_timeline_scrubber"
              />
              <span style={{ color: "#00d4ff", fontSize: 9, flexShrink: 0 }}>
                {sim.simTime.toFixed(1)}s
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANELS */}
        <div
          style={{
            borderLeft: "1px solid rgba(0,212,255,0.15)",
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            background: "rgba(0,10,25,0.6)",
          }}
        >
          {/* TECHNICAL OVERLAY heatmap */}
          <div
            style={{
              border: "1px solid rgba(0,212,255,0.25)",
              borderRadius: 6,
              padding: "10px 10px",
              background: "rgba(0,5,15,0.8)",
            }}
          >
            <div
              style={{
                color: "#00d4ff",
                fontSize: 9,
                letterSpacing: "0.18em",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              TECHNICAL OVERLAY
            </div>
            <div
              style={{
                color: "rgba(0,212,255,0.5)",
                fontSize: 8,
                marginBottom: 6,
              }}
            >
              Core Temperature Distribution
            </div>
            <svg
              viewBox="0 0 160 90"
              style={{ width: "100%", borderRadius: 4, overflow: "hidden" }}
            >
              <title>Core Temperature Heatmap</title>
              <defs>
                <radialGradient id="heatmap" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffff00" stopOpacity="1" />
                  <stop offset="25%" stopColor="#ff8800" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ff2200" stopOpacity="0.9" />
                  <stop offset="75%" stopColor="#006688" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#000033" stopOpacity="1" />
                </radialGradient>
              </defs>
              <rect width="160" height="90" fill="#000033" />
              <ellipse cx="80" cy="45" rx="70" ry="42" fill="url(#heatmap)" />
              {/* Grid lines */}
              {[40, 80, 120].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="5"
                  x2={x}
                  y2="85"
                  stroke="rgba(0,212,255,0.15)"
                  strokeWidth="0.5"
                />
              ))}
              {[22, 45, 67].map((y) => (
                <line
                  key={y}
                  x1="5"
                  y1={y}
                  x2="155"
                  y2={y}
                  stroke="rgba(0,212,255,0.15)"
                  strokeWidth="0.5"
                />
              ))}
              {/* Legend */}
              <text
                x="5"
                y="88"
                fill="#000088"
                fontSize="6"
                fontFamily="monospace"
              >
                280°C
              </text>
              <text
                x="130"
                y="88"
                fill="#ffff00"
                fontSize="6"
                fontFamily="monospace"
              >
                580°C+
              </text>
            </svg>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                marginTop: 6,
                background:
                  "linear-gradient(to right, #000080, #0088ff, #00ffff, #ffff00, #ff8800, #ff0000)",
              }}
            />
          </div>

          {/* CORE PHYSICS */}
          <div
            style={{
              border: "1px solid rgba(0,212,255,0.25)",
              borderRadius: 6,
              padding: "10px 10px",
              background: "rgba(0,5,15,0.8)",
            }}
          >
            <div
              style={{
                color: "#00d4ff",
                fontSize: 9,
                letterSpacing: "0.18em",
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              CORE PHYSICS
            </div>

            {/* keff circular gauge */}
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <svg viewBox="0 0 80 50" style={{ width: "100%" }}>
                <title>k-eff Gauge</title>
                <path
                  d="M10 45 A 30 30 0 0 1 70 45"
                  fill="none"
                  stroke="rgba(0,212,255,0.2)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 45 A 30 30 0 0 1 70 45"
                  fill="none"
                  stroke={keffColor}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="94.2"
                  strokeDashoffset={
                    94.2 - Math.min(94.2, ((sim.keff - 0.8) / 0.4) * 94.2)
                  }
                  style={{ filter: `drop-shadow(0 0 4px ${keffColor})` }}
                />
                <text
                  x="40"
                  y="38"
                  fill={keffColor}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {sim.keff.toFixed(3)}
                </text>
                <text
                  x="40"
                  y="48"
                  fill="rgba(0,212,255,0.5)"
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="monospace"
                >
                  k-eff (0–2)
                </text>
              </svg>
            </div>

            {/* Gauge bars */}
            {[
              {
                label: "THERMAL POWER",
                val: sim.thermalPower,
                max: 3600,
                unit: "MWth",
                color: "#ff8800",
              },
              {
                label: "CONTROL FLOW",
                val: sim.controlRodInsertion,
                max: 100,
                unit: "%",
                color: "#00aaff",
              },
              {
                label: "NEUTRON FLUX",
                val: sim.neutronFluxDensity * 100,
                max: 100,
                unit: "%",
                color: "#88ffff",
              },
            ].map(({ label, val, max, unit, color }) => (
              <div key={label} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <span style={{ color: "rgba(0,212,255,0.5)", fontSize: 8 }}>
                    {label}
                  </span>
                  <span style={{ color, fontSize: 8, fontWeight: "bold" }}>
                    {val.toFixed(0)} {unit}
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: "rgba(0,212,255,0.1)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, (val / max) * 100)}%`,
                      background: color,
                      borderRadius: 3,
                      boxShadow: `0 0 6px ${color}88`,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* DATA OUTPUT */}
          <div
            style={{
              border: "1px solid rgba(0,212,255,0.25)",
              borderRadius: 6,
              padding: "10px 10px",
              background: "rgba(0,5,15,0.8)",
              flex: 1,
            }}
          >
            <div
              style={{
                color: "#00d4ff",
                fontSize: 9,
                letterSpacing: "0.18em",
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              DATA OUTPUT
            </div>
            {[
              {
                label: "Power Level",
                value: `${powerPct.toFixed(0)}% MWe`,
                color: "#ffff00",
                big: true,
              },
              { label: "Core Status", value: keffStatus, color: keffColor },
              {
                label: "Efficiency",
                value: `${efficiency}%`,
                color: "#00ff88",
              },
              {
                label: "Coolant Temp",
                value: `${sim.coolantTempOut.toFixed(0)}°C`,
                color: "#00c8ff",
              },
              {
                label: "Steam Flow",
                value: `${(sim.coolantFlow * 0.12).toFixed(0)} kg/s`,
                color: "#aaccff",
              },
              {
                label: "Sim Time",
                value: `${sim.simTime.toFixed(1)}s`,
                color: "rgba(0,212,255,0.6)",
              },
            ].map(({ label, value, color, big }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 7,
                  paddingBottom: 7,
                  borderBottom: "1px solid rgba(0,212,255,0.08)",
                }}
              >
                <span
                  style={{
                    color: "rgba(0,212,255,0.5)",
                    fontSize: big ? 9 : 8,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    color,
                    fontSize: big ? 12 : 9,
                    fontWeight: "bold",
                    textShadow: `0 0 8px ${color}88`,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

// ─── SVG Diagrams preserved ───────────────────────────────────────────────────

function PWRSchemDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 600 380"
        className="w-full max-w-2xl mx-auto h-auto"
        role="img"
        aria-label="PWR Schematic Diagram"
      >
        <title>PWR Simplified Schematic</title>
        <defs>
          <linearGradient id="vesselGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0a1a2e" />
          </linearGradient>
          <linearGradient id="coreGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6600" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect width="600" height="380" fill="#050e1a" />
        <rect
          x="60"
          y="60"
          width="160"
          height="240"
          rx="20"
          fill="url(#vesselGrad2)"
          stroke="#4a90d9"
          strokeWidth="2"
        />
        <text
          x="140"
          y="52"
          fill="#7ab3e0"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
        >
          REACTOR VESSEL
        </text>
        <rect
          x="90"
          y="100"
          width="100"
          height="160"
          rx="4"
          fill="url(#coreGrad2)"
        />
        <text
          x="140"
          y="188"
          fill="#fff"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
        >
          CORE
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={100 + i * 14}
            y="105"
            width="6"
            height="150"
            rx="2"
            fill="#333"
            stroke="#666"
            strokeWidth="0.5"
          />
        ))}
        {[1, 3, 5].map((i) => (
          <rect
            key={i}
            x={100 + i * 14 + 1}
            y="60"
            width="4"
            height="60"
            rx="1"
            fill="#1a1a3e"
            stroke="#6666cc"
            strokeWidth="0.5"
          />
        ))}
        <rect
          x="320"
          y="80"
          width="100"
          height="200"
          rx="12"
          fill="#1a2a3a"
          stroke="#4a90d9"
          strokeWidth="1.5"
        />
        <text
          x="370"
          y="72"
          fill="#7ab3e0"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
        >
          STEAM GEN
        </text>
        <path
          d="M340 120 Q370 160 340 200 Q370 240 340 260"
          fill="none"
          stroke="#0088cc"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M220 140 C270 140 280 120 320 120"
          fill="none"
          stroke="#ff6600"
          strokeWidth="3"
          strokeDasharray="8 4"
          opacity="0.8"
        />
        <text
          x="265"
          y="112"
          fill="#ff9944"
          fontSize="9"
          fontFamily="monospace"
        >
          HOT LEG 290°C
        </text>
        <path
          d="M320 240 C280 240 270 250 220 240"
          fill="none"
          stroke="#0099ff"
          strokeWidth="3"
          strokeDasharray="8 4"
          opacity="0.8"
        />
        <text
          x="258"
          y="256"
          fill="#66bbff"
          fontSize="9"
          fontFamily="monospace"
        >
          COLD LEG 260°C
        </text>
        <rect
          x="240"
          y="60"
          width="40"
          height="70"
          rx="6"
          fill="#1a2a40"
          stroke="#4a90d9"
          strokeWidth="1"
        />
        <text
          x="260"
          y="52"
          fill="#7ab3e0"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
        >
          PRSZR
        </text>
        <ellipse
          cx="500"
          cy="160"
          rx="50"
          ry="60"
          fill="#0e2233"
          stroke="#4a90d9"
          strokeWidth="1.5"
        />
        <text
          x="500"
          y="164"
          fill="#7ab3e0"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
        >
          TURBINE
        </text>
        <path d="M420 140 L450 150" stroke="#999" strokeWidth="2" />
        <path
          d="M420 220 L450 170"
          stroke="#66bbff"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <text
          x="300"
          y="358"
          fill="#445566"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
        >
          PWR SIMPLIFIED SCHEMATIC — NuclearEdu
        </text>
      </svg>
    </div>
  );
}

// ─── Technical Info Panels ────────────────────────────────────────────────────

function TechSpecsPanel({
  reactorType,
}: { reactorType: keyof typeof REACTOR_TYPE_DATA }) {
  const d = REACTOR_TYPE_DATA[reactorType];
  const specs = {
    PWR: [
      { label: "Fuel Type", value: "UO₂ (3–5% ²³⁵U enriched)" },
      { label: "Coolant", value: "Light Water (H₂O), 155 bar" },
      { label: "Moderator", value: "Light Water (H₂O)" },
      { label: "Fuel Cladding", value: "Zircaloy-4" },
      { label: "Core Temp (avg)", value: "~310°C" },
      { label: "Steam Temp", value: "~280°C secondary" },
      { label: "Thermal Efficiency", value: "~33%" },
      { label: "Fuel Assembly", value: "17×17 array, 264 fuel rods" },
      { label: "Refueling", value: "Every 12–18 months offline" },
    ],
    BWR: [
      { label: "Fuel Type", value: "UO₂ (3–5% enriched)" },
      { label: "Coolant", value: "Light Water (H₂O), 75 bar" },
      { label: "Moderator", value: "Boiling Light Water" },
      { label: "Steam Gen", value: "Direct — no secondary loop" },
      { label: "Core Temp (avg)", value: "~288°C" },
      { label: "Steam Temp", value: "~288°C (direct to turbine)" },
      { label: "Thermal Efficiency", value: "~32%" },
    ],
    CANDU: [
      { label: "Fuel Type", value: "Natural UO₂ (0.7% ²³⁵U)" },
      { label: "Coolant", value: "Heavy Water (D₂O), 100 bar" },
      { label: "Moderator", value: "Heavy Water (D₂O)" },
      { label: "Pressure Tubes", value: "480 horizontal Zircaloy tubes" },
      { label: "Core Temp", value: "~266°C inlet / 310°C outlet" },
      { label: "Refueling", value: "On-power continuous" },
    ],
    SMR: [
      { label: "Fuel Type", value: "UO₂ or HALEU (5–20% enriched)" },
      { label: "Coolant", value: "Light Water or Gas" },
      { label: "Power Output", value: "≤ 300 MWe per module" },
      { label: "Design", value: "Integral / modular, factory-built" },
      { label: "Safety", value: "Passive safety systems" },
      { label: "Applications", value: "Remote, district heat, H₂ prod." },
    ],
  };

  return (
    <div className="space-y-3">
      <div className="holo-panel rounded-lg p-4">
        <h3 className="holo-text text-sm mb-1">{d.full}</h3>
        <p className="text-xs text-muted-foreground font-mono">
          Country of Origin: {d.country}
        </p>
      </div>
      <div className="grid gap-1.5">
        {specs[reactorType].map((s) => (
          <div
            key={s.label}
            className="flex justify-between items-start gap-2 py-1 border-b border-border/30"
          >
            <span className="text-xs text-muted-foreground font-mono">
              {s.label}
            </span>
            <span className="text-xs text-foreground font-mono text-right">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksPanel() {
  const steps = [
    {
      title: "1. Fission Chain Reaction",
      body: "U-235 nuclei absorb thermal neutrons and split (fission), releasing ~200 MeV of energy and 2–3 prompt neutrons per fission. The neutron multiplication factor keff controls whether the reaction is sustaining (keff = 1), growing (keff > 1), or diminishing (keff < 1).",
    },
    {
      title: "2. Neutron Moderation",
      body: "Fast neutrons (2 MeV) collide with moderator atoms (H₂O in PWR/BWR), losing kinetic energy until they reach thermal energies (~0.025 eV) where fission cross-sections are orders of magnitude higher. The Four-Factor Formula (k∞ = η·ε·p·f) quantifies this process.",
    },
    {
      title: "3. Heat Transfer",
      body: "Fission energy appears as kinetic energy in fission fragments and prompt neutrons, rapidly thermalized in the UO₂ fuel pellets. Heat conducts through the Zircaloy cladding into the pressurized coolant, raising its temperature by ~30–40°C per pass through the core.",
    },
    {
      title: "4. Power Regulation",
      body: "Control rod insertion reduces neutron population by absorbing thermal neutrons in B₄C or Ag-In-Cd absorber material. Temperature feedback (Doppler broadening in U-238) provides inherent negative reactivity feedback — self-regulating behavior is a fundamental safety feature.",
    },
    {
      title: "5. Steam Generation & Turbine",
      body: "In PWR: Hot primary coolant (155 bar, ~310°C) transfers heat via steam generators to a secondary loop that flashes to steam at ~280°C/70 bar. In BWR: Primary coolant boils directly at ~288°C/75 bar. Steam drives a turbine-generator at ~33% thermal efficiency.",
    },
  ];
  return (
    <div className="space-y-3">
      {steps.map((s) => (
        <div key={s.title} className="holo-panel rounded-lg p-3">
          <h4 className="text-sm font-display font-semibold text-foreground mb-1">
            {s.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function SafetySystemsPanel() {
  const systems = [
    {
      name: "SCRAM / Emergency Shutdown",
      desc: "All control rods drop by gravity within 2–3 seconds. Boron injection provides backup negative reactivity.",
      color: "text-red-400",
    },
    {
      name: "ECCS (Emergency Core Cooling)",
      desc: "High/low pressure injection and accumulators deliver water to the core within seconds of loss-of-coolant accident (LOCA) detection.",
      color: "text-amber-400",
    },
    {
      name: "Negative Reactivity Coefficients",
      desc: "Doppler broadening in U-238 and moderator temperature/void coefficients provide self-limiting feedback — physics inherently opposes runaway.",
      color: "text-primary",
    },
    {
      name: "Containment Structure",
      desc: "Reinforced concrete/steel containment vessel (≥1m thick) surrounds the reactor building, designed to withstand extreme pressure and projectile impact.",
      color: "text-cyan-400",
    },
    {
      name: "Passive Safety (Gen III+)",
      desc: "AP1000, EPR, and SMR designs rely on gravity, natural circulation, and compressed gas — no pumps needed — for 72-hour passive safety.",
      color: "text-emerald-400",
    },
    {
      name: "Defense in Depth",
      desc: "Five independent barriers: UO₂ pellet → Zircaloy cladding → Reactor coolant boundary → Reactor building → Containment building.",
      color: "text-violet-400",
    },
  ];
  return (
    <div className="space-y-2.5">
      {systems.map((s) => (
        <div
          key={s.name}
          className="flex gap-3 p-3 bg-card rounded-lg border border-border/40"
        >
          <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${s.color}`} />
          <div>
            <h4 className={`text-xs font-bold font-mono mb-0.5 ${s.color}`}>
              {s.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DataGlossaryPanel() {
  const terms = [
    {
      term: "keff",
      def: "Effective neutron multiplication factor. keff = 1 → critical (steady). keff > 1 → supercritical (power rising). keff < 1 → subcritical (shutdown).",
    },
    {
      term: "Reactivity (ρ)",
      def: "ρ = (keff − 1) / keff. Measure of deviation from criticality. Units: pcm (per cent mille = 10⁻⁵).",
    },
    {
      term: "Thermal Power (MWth)",
      def: "Total heat generated in the reactor core by fission. Electrical output = Thermal × η (typically ~33%).",
    },
    {
      term: "Neutron Flux (Φ)",
      def: "Φ = n·v (neutrons/cm²/s). Typical PWR core: ~3×10¹³ n/cm²/s. Determines fission rate and material activation.",
    },
    {
      term: "Burnup (GWd/tU)",
      def: "Energy extracted per ton of uranium fuel. Modern PWR reaches ~45 GWd/tU per cycle before refueling.",
    },
    {
      term: "Doppler Broadening",
      def: "As fuel temperature rises, U-238 resonance capture cross-section widens → absorbs more neutrons → negative reactivity feedback (k drops).",
    },
    {
      term: "Void Coefficient",
      def: "Change in reactivity per % increase in coolant void fraction. Negative in PWR (safe); slightly positive in BWR under some conditions.",
    },
    {
      term: "SCRAM",
      def: "Safety Control Rod Axe Man — emergency shutdown by rapid full rod insertion. Acronym attributed to CP-1 (Chicago Pile, 1942).",
    },
    {
      term: "Decay Heat",
      def: "Residual heat from radioactive decay of fission products after reactor shutdown. ~7% initial power → requires continuous cooling for days-weeks.",
    },
    {
      term: "PCM",
      def: "Per cent mille (10⁻⁵) — standard unit for reactivity worth. A 100 pcm insertion reduces keff by 0.001.",
    },
  ];
  return (
    <div className="space-y-2">
      {terms.map((t) => (
        <div key={t.term} className="py-2 border-b border-border/30">
          <div className="flex gap-2 items-baseline">
            <span className="text-xs font-bold font-mono text-primary shrink-0 w-32">
              {t.term}
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.def}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReactorCrossSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const [showCompare, setShowCompare] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [activeTab, setActiveTab] = useState("technical");
  const [viewMode, setViewMode] = useState<"classic" | "3d">("classic");
  const simTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sim, setSim] = useState<ReactorSimState>(() => {
    const base = {
      reactorType: "PWR" as const,
      controlRodInsertion: 45,
      powerLevel: 1800,
      coolantTempIn: 295,
      coolantFlow: 18000,
      isPlaying: true,
      simTime: 0,
      moderatorVoided: false,
    };
    return { ...base, ...computeSimState(base) };
  });

  useEffect(() => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    if (sim.isPlaying) {
      simTimerRef.current = setInterval(() => {
        setSim((prev) => {
          const newTime = prev.simTime >= 120 ? 0 : prev.simTime + 0.1;
          const fluxMod = 1 + 0.03 * Math.sin(newTime * 0.5);
          const newPower = Math.round(prev.powerLevel * fluxMod);
          return {
            ...prev,
            simTime: newTime,
            ...computeSimState({ ...prev, powerLevel: newPower }),
          };
        });
      }, 100);
    }
    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, [sim.isPlaying]);

  const updateSim = useCallback((patch: Partial<ReactorSimState>) => {
    setSim((prev) => {
      const next = { ...prev, ...patch };
      return { ...next, ...computeSimState(next) };
    });
  }, []);

  const handleReset = useCallback(() => {
    const base = {
      reactorType: "PWR" as const,
      controlRodInsertion: 45,
      powerLevel: 1800,
      coolantTempIn: 295,
      coolantFlow: 18000,
      isPlaying: false,
      simTime: 0,
      moderatorVoided: false,
    };
    setSim({ ...base, ...computeSimState(base) });
  }, []);

  const keffColor =
    sim.keff > 1.05
      ? "text-red-400"
      : sim.keff > 1.0
        ? "text-amber-400"
        : "text-primary";

  const fallback = (
    <div className="flex items-center justify-center h-full bg-card rounded-xl border border-border">
      <div className="text-center p-6">
        <Zap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          3D Reactor visualization unavailable
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          WebGL not supported in this environment
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Reactor Digital Twin
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Interactive simulation of a nuclear reactor core — Classic 2D &amp;
            Cinematic 3D views
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLabels((v) => !v)}
            className="text-xs"
            data-ocid="reactor.toggle_labels"
          >
            <Zap className="w-3 h-3 mr-1" />
            {showLabels ? "Hide" : "Show"} Labels
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCompare(true)}
            className="text-xs"
            data-ocid="reactor.compare_button"
          >
            <Maximize2 className="w-3 h-3 mr-1" />
            Compare Reactors
          </Button>
        </div>
      </div>

      {/* ── View Mode Tab Switcher ── */}
      <div
        className="flex gap-2 p-1 bg-muted/30 rounded-xl border border-border/50 w-fit"
        data-ocid="reactor.view_switcher"
      >
        <button
          type="button"
          onClick={() => setViewMode("classic")}
          className={`px-5 py-2 rounded-lg text-sm font-mono font-bold transition-all duration-200 ${
            viewMode === "classic"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="reactor.tab_classic_view"
        >
          ⚡ Classic View
        </button>
        <button
          type="button"
          onClick={() => setViewMode("3d")}
          className={`px-5 py-2 rounded-lg text-sm font-mono font-bold transition-all duration-200 ${
            viewMode === "3d"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="reactor.tab_3d_view"
        >
          🔷 3D Cinematic View
        </button>
      </div>

      {/* ── CLASSIC VIEW ── */}
      {viewMode === "classic" && (
        <ClassicReactorView
          sim={sim}
          updateSim={updateSim}
          handleReset={handleReset}
        />
      )}

      {/* ── 3D CINEMATIC VIEW ── */}
      {viewMode === "3d" && (
        <div
          className="relative rounded-xl overflow-hidden border border-border reactor-core-glow"
          style={{
            minHeight: 600,
            maxHeight: "80vh",
            filter: "brightness(1.1) saturate(1.2)",
          }}
          data-ocid="reactor.viewport_3d"
        >
          <WebGLErrorBoundary fallback={fallback}>
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-muted-foreground">
                      Initializing Reactor Core…
                    </p>
                  </div>
                </div>
              }
            >
              <Canvas
                camera={{ position: [5, 3.5, 7], fov: 42 }}
                style={{
                  height: "62vh",
                  minHeight: 560,
                  background: "#030810",
                  display: "block",
                  width: "100%",
                }}
                shadows
              >
                <ReactorScene sim={sim} reducedMotion={reducedMotion} />
              </Canvas>
            </Suspense>
          </WebGLErrorBoundary>

          {/* TOP-LEFT: Digital Twin Title */}
          <div className="absolute top-3 left-3 z-20">
            <div className="holo-panel rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="holo-text text-xs font-mono tracking-widest">
                  3D REACTOR DIGITAL TWIN
                </div>
                <div className="text-[9px] text-muted-foreground font-mono">
                  {REACTOR_TYPE_DATA[sim.reactorType].full}
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-[9px] border-emerald-500/40 text-emerald-400 ml-2"
              >
                ONLINE
              </Badge>
            </div>
          </div>

          {/* TOP-RIGHT: Command Center Panel */}
          <div
            className="absolute top-3 right-3 z-20 w-52"
            data-ocid="reactor.command_panel"
          >
            <div className="holo-panel rounded-lg p-3 space-y-1.5">
              <div className="holo-text text-[9px] font-mono tracking-widest mb-2">
                COMMAND CENTER
              </div>
              <div className="data-overlay-grid space-y-1.5">
                {[
                  {
                    label: "CORE TEMP:",
                    val: `${sim.coreAvgTemp.toFixed(0)}°C`,
                  },
                  {
                    label: "POWER OUTPUT:",
                    val: `${(sim.thermalPower / 1000).toFixed(2)} GWth`,
                  },
                  {
                    label: "COOLANT FLOW:",
                    val: `${(sim.coolantFlow / 1000).toFixed(1)}k kg/s`,
                  },
                  { label: "keff:", val: sim.keff.toFixed(4), highlight: true },
                  {
                    label: "STATUS:",
                    val:
                      sim.keff > 1.05
                        ? "SUPERCRITICAL"
                        : sim.keff > 0.99
                          ? "OPERATIONAL"
                          : "SUBCRITICAL",
                  },
                ].map(({ label, val, highlight }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span
                      className={`font-bold ${highlight ? keffColor : "text-foreground"}`}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Core Physics Gauges */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-3 z-20 w-48"
            data-ocid="reactor.gauges_panel"
          >
            <div className="holo-panel rounded-lg p-3">
              <div className="holo-text text-[9px] font-mono tracking-widest mb-2">
                CORE PHYSICS
              </div>
              <GaugeBar
                label="keff"
                value={sim.keff}
                min={0.8}
                max={1.2}
                unit=""
                warnAbove={1.0}
                dangerAbove={1.05}
              />
              <GaugeBar
                label="Thermal Power"
                value={sim.thermalPower}
                min={0}
                max={3600}
                unit="MWth"
                warnAbove={3200}
              />
              <GaugeBar
                label="Coolant Flow"
                value={sim.coolantFlow}
                min={0}
                max={20000}
                unit="kg/s"
              />
              <GaugeBar
                label="Core Avg Temp"
                value={sim.coreAvgTemp}
                min={280}
                max={580}
                unit="°C"
                warnAbove={500}
                dangerAbove={550}
              />
            </div>
          </div>

          {/* Holographic Labels */}
          <HoloLabels visible={showLabels} />

          {/* BOTTOM: Timeline */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
            <SimTimeline
              simTime={sim.simTime}
              isPlaying={sim.isPlaying}
              onToggle={() => updateSim({ isPlaying: !sim.isPlaying })}
              onReset={handleReset}
              onSeek={(t) => updateSim({ simTime: t })}
            />
          </div>
        </div>
      )}

      {/* ── Simulation Controls (shared) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="lg:col-span-2 holo-panel rounded-xl p-4 space-y-4"
          data-ocid="reactor.controls_panel"
        >
          <div className="flex items-center justify-between">
            <h3 className="holo-text text-sm">Simulation Controls</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleReset}
              data-ocid="reactor.reset_button"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Reset Nominal
            </Button>
          </div>

          <div>
            <span className="text-xs text-muted-foreground font-mono mb-2 block">
              REACTOR TYPE
            </span>
            <div
              className="flex gap-2 flex-wrap"
              role="radiogroup"
              aria-label="Reactor type selector"
            >
              {(["PWR", "BWR", "CANDU", "SMR"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() =>
                    updateSim({
                      reactorType: type,
                      coolantFlow: REACTOR_TYPE_DATA[type].coolantFlow,
                      powerLevel: Math.min(
                        sim.powerLevel,
                        REACTOR_TYPE_DATA[type].maxPower,
                      ),
                    })
                  }
                  aria-pressed={sim.reactorType === type}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-200 ${
                    sim.reactorType === type
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                  data-ocid={`reactor.type_${type.toLowerCase()}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground font-mono">
                  CONTROL ROD INSERTION
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {sim.controlRodInsertion}%
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[sim.controlRodInsertion]}
                onValueChange={([v]) => updateSim({ controlRodInsertion: v })}
                aria-label="Control rod insertion percentage"
                data-ocid="reactor.control_rod_slider"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted-foreground font-mono">
                  WITHDRAWN
                </span>
                <span className="text-[9px] text-muted-foreground font-mono">
                  INSERTED
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground font-mono">
                  POWER LEVEL
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {sim.powerLevel} MWth
                </span>
              </div>
              <Slider
                min={0}
                max={REACTOR_TYPE_DATA[sim.reactorType].maxPower}
                step={50}
                value={[sim.powerLevel]}
                onValueChange={([v]) => updateSim({ powerLevel: v })}
                aria-label="Power level in MWth"
                data-ocid="reactor.power_slider"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted-foreground font-mono">
                  0
                </span>
                <span className="text-[9px] text-muted-foreground font-mono">
                  {REACTOR_TYPE_DATA[sim.reactorType].maxPower} MWth
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground font-mono">
                  COOLANT INLET TEMP
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {sim.coolantTempIn}°C
                </span>
              </div>
              <Slider
                min={280}
                max={360}
                step={1}
                value={[sim.coolantTempIn]}
                onValueChange={([v]) => updateSim({ coolantTempIn: v })}
                aria-label="Coolant inlet temperature"
                data-ocid="reactor.coolant_temp_slider"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground font-mono">
                  COOLANT FLOW RATE
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {sim.coolantFlow.toLocaleString()} kg/s
                </span>
              </div>
              <Slider
                min={1000}
                max={20000}
                step={100}
                value={[sim.coolantFlow]}
                onValueChange={([v]) => updateSim({ coolantFlow: v })}
                aria-label="Coolant flow rate"
                data-ocid="reactor.coolant_flow_slider"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div>
              <div className="text-xs text-muted-foreground font-mono">
                MODERATOR DENSITY
              </div>
              <div className="text-[9px] text-muted-foreground/60 font-mono mt-0.5">
                Void = steam bubbles reduce moderation, affects keff
              </div>
            </div>
            <div
              className="flex gap-2"
              role="radiogroup"
              aria-label="Moderator density mode"
            >
              {["Normal", "Voided"].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() =>
                    updateSim({ moderatorVoided: mode === "Voided" })
                  }
                  aria-pressed={(mode === "Voided") === sim.moderatorVoided}
                  className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
                    (mode === "Voided") === sim.moderatorVoided
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-muted/20 text-muted-foreground border-border hover:border-primary/30"
                  }`}
                  data-ocid={`reactor.moderator_${mode.toLowerCase()}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Telemetry */}
        <div
          className="holo-panel rounded-xl p-4"
          data-ocid="reactor.telemetry_panel"
        >
          <h3 className="holo-text text-sm mb-3">Live Telemetry</h3>
          <div className="data-overlay-grid space-y-2">
            {[
              {
                label: "keff",
                value: sim.keff.toFixed(4),
                highlight: sim.keff > 1.0,
              },
              {
                label: "Thermal Power",
                value: `${sim.thermalPower.toFixed(0)} MWth`,
              },
              {
                label: "Electrical ~33%",
                value: `${(sim.thermalPower * 0.33).toFixed(0)} MWe`,
              },
              { label: "Coolant In", value: `${sim.coolantTempIn}°C` },
              {
                label: "Coolant Out",
                value: `${sim.coolantTempOut.toFixed(1)}°C`,
              },
              {
                label: "ΔT Coolant",
                value: `${(sim.coolantTempOut - sim.coolantTempIn).toFixed(1)}°C`,
              },
              {
                label: "Core Avg Temp",
                value: `${sim.coreAvgTemp.toFixed(0)}°C`,
              },
              {
                label: "Neutron Flux",
                value: `${(sim.neutronFluxDensity * 3.0e13).toExponential(1)} n/cm²/s`,
              },
              {
                label: "Flow Rate",
                value: `${sim.coolantFlow.toLocaleString()} kg/s`,
              },
              {
                label: "Moderator",
                value: sim.moderatorVoided ? "VOIDED ⚠" : "NORMAL",
              },
              { label: "Sim Time", value: `${sim.simTime.toFixed(1)}s` },
              {
                label: "Status",
                value:
                  sim.keff > 1.05
                    ? "SUPERCRITICAL"
                    : sim.keff > 0.99
                      ? "CRITICAL"
                      : "SUBCRITICAL",
              },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className="flex justify-between items-center py-0.5 border-b border-border/20"
              >
                <span className="text-muted-foreground text-[10px] font-mono">
                  {label}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold ${highlight ? "text-amber-400" : "text-foreground"}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="text-[9px] text-muted-foreground font-mono mb-1.5 uppercase tracking-wider">
              <Thermometer className="inline w-3 h-3 mr-1" />
              Core Heatmap
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(to right, #000080, #00ffff, #ffff00, #ff4400)",
              }}
            />
            <div className="flex justify-between mt-0.5">
              <span className="text-[8px] text-muted-foreground font-mono">
                280°C
              </span>
              <span className="text-[8px] text-muted-foreground font-mono">
                580°C
              </span>
            </div>
            <div
              className="w-2 h-2 bg-foreground rounded-full mt-1 transition-all duration-500"
              style={{
                marginLeft: `calc(${Math.min(95, Math.max(2, ((sim.coreAvgTemp - 280) / 300) * 100))}% - 4px)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Info Tabs ── */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="reactor.info_tabs"
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="technical" data-ocid="reactor.tab_technical">
            Technical Specs
          </TabsTrigger>
          <TabsTrigger value="how" data-ocid="reactor.tab_how">
            How It Works
          </TabsTrigger>
          <TabsTrigger value="safety" data-ocid="reactor.tab_safety">
            Safety Systems
          </TabsTrigger>
          <TabsTrigger value="glossary" data-ocid="reactor.tab_glossary">
            Data Glossary
          </TabsTrigger>
          <TabsTrigger value="schematic" data-ocid="reactor.tab_schematic">
            Schematic
          </TabsTrigger>
        </TabsList>
        <TabsContent value="technical" className="mt-4">
          <TechSpecsPanel reactorType={sim.reactorType} />
        </TabsContent>
        <TabsContent value="how" className="mt-4">
          <HowItWorksPanel />
        </TabsContent>
        <TabsContent value="safety" className="mt-4">
          <SafetySystemsPanel />
        </TabsContent>
        <TabsContent value="glossary" className="mt-4">
          <DataGlossaryPanel />
        </TabsContent>
        <TabsContent value="schematic" className="mt-4">
          <div className="holo-panel rounded-xl p-4">
            <h3 className="holo-text text-sm mb-3">PWR Simplified Schematic</h3>
            <PWRSchemDiagram />
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Comparison Modal ── */}
      {showCompare && (
        <ReactorComparisonModal
          isOpen={showCompare}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
