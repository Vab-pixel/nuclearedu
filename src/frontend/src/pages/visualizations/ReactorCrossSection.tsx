import { ReactorComparisonModal } from "@/components/ReactorComparisonModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Environment, Html, OrbitControls } from "@react-three/drei";
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
import { motion, useReducedMotion } from "motion/react";
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
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import InteractiveSimMode from "./InteractiveSimMode";

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
  powerLevel = 1800,
}: {
  neutronFlux: number;
  coreTemp: number;
  powerLevel?: number;
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

    // Drive emissive color and intensity based on powerLevel (requirement #7)
    const maxPower = 3400;
    const powerT = Math.min(1, powerLevel / maxPower);
    if (powerT < 0.5) {
      // 0% → 50%: interpolate from #331100 (dim) to #ff6600 (orange)
      const t2 = powerT * 2;
      mat.emissive.setRGB(
        0.2 + t2 * (1.0 - 0.2),
        0.067 + t2 * (0.4 - 0.067),
        0,
      );
      mat.emissiveIntensity = 0.3 + t2 * (0.8 - 0.3) + glowIntensity * 0.5;
    } else {
      // 50% → 100%: interpolate from #ff6600 to #ffaa00 (hot yellow-orange)
      const t2 = (powerT - 0.5) * 2;
      mat.emissive.setRGB(1.0, 0.4 + t2 * (0.667 - 0.4), 0);
      mat.emissiveIntensity = 0.8 + t2 * (1.5 - 0.8) + glowIntensity * 0.8;
    }

    // Also factor in core temperature for fine-grain variation
    const tempT = Math.min(1, (coreTemp - 280) / 300);
    mat.emissive = getTempColor(tempT * powerT);
    mat.emissiveIntensity = Math.max(
      mat.emissiveIntensity,
      glowIntensity * 4 * neutronFlux + 0.5,
    );
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

// ─── Lissajous Orbit Neutron Flux Particles (600+) ───────────────────────────

interface OrbitParam {
  r: number;
  freq: number;
  phaseX: number;
  phaseY: number;
  phaseZ: number;
}

const LISSAJOUS_COUNT = 650;

const LissajousOrbitParticles = memo(function LissajousOrbitParticles({
  active,
  flux,
}: { active: boolean; flux: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const orbitParams = useRef<OrbitParam[]>([]);
  const posArray = useRef<Float32Array | null>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(LISSAJOUS_COUNT * 3);
    posArray.current = positions;
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color(0xaaddff),
        size: 0.05,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [],
  );

  useEffect(() => {
    orbitParams.current = Array.from({ length: LISSAJOUS_COUNT }, () => ({
      r: 0.6 + Math.random() * 1.6,
      freq: 0.4 + Math.random() * 1.2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !posArray.current) return;
    if (!active || flux < 0.02) return;
    const t = clock.getElapsedTime();
    const params = orbitParams.current;
    const pos = posArray.current;
    for (let i = 0; i < LISSAJOUS_COUNT; i++) {
      const p = params[i];
      const idx = i * 3;
      pos[idx] = p.r * Math.sin(t * p.freq + p.phaseX);
      pos[idx + 1] = p.r * 0.55 * Math.cos(t * p.freq * 0.7 + p.phaseY);
      pos[idx + 2] = p.r * Math.sin(t * p.freq * 1.3 + p.phaseZ);
    }
    (
      pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    ).needsUpdate = true;
    mat.opacity = 0.5 + flux * 0.45;
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
});

// ─── Cherenkov Sphere Glow (concentric spheres for core center) ───────────────

const CherenkovSpherePulse = memo(function CherenkovSpherePulse({
  flux,
}: { flux: number }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1.0 + Math.sin(t * 2) * 0.05;
    if (innerRef.current) innerRef.current.scale.setScalar(pulse);
    if (pointLightRef.current) {
      pointLightRef.current.intensity =
        3.0 + flux * 5.0 + Math.sin(t * 2) * 0.8;
    }
    const alpha = 0.08 + flux * 0.08;
    if (innerRef.current)
      (innerRef.current.material as THREE.MeshBasicMaterial).opacity =
        alpha * 1.5;
    if (midRef.current)
      (midRef.current.material as THREE.MeshBasicMaterial).opacity =
        alpha * 0.75;
    if (outerRef.current)
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity =
        alpha * 0.35;
  });

  const innerGeo = useMemo(() => new THREE.SphereGeometry(1.8, 32, 32), []);
  const midGeo = useMemo(() => new THREE.SphereGeometry(2.8, 32, 32), []);
  const outerGeo = useMemo(() => new THREE.SphereGeometry(4.0, 32, 32), []);

  const innerMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x0066ff),
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );
  const midMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x0066ff),
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );
  const outerMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x0066ff),
        transparent: true,
        opacity: 0.025,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={innerRef} geometry={innerGeo} material={innerMat} />
      <mesh ref={midRef} geometry={midGeo} material={midMat} />
      <mesh ref={outerRef} geometry={outerGeo} material={outerMat} />
      <pointLight
        ref={pointLightRef}
        color={0x0066ff}
        intensity={3.0}
        distance={8}
        decay={1.5}
      />
    </group>
  );
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

const CoolantPipes = memo(function CoolantPipes({
  flux = 0.5,
  active = true,
}: {
  flux?: number;
  active?: boolean;
}) {
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

  const fluxRef = useRef(flux);
  const activeRef = useRef(active);
  useEffect(() => {
    fluxRef.current = flux;
  }, [flux]);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useFrame(({ clock }) => {
    if (!activeRef.current) return;
    const t = clock.getElapsedTime();
    const f = fluxRef.current;
    // "Flow pulse" traveling through pipes — emissive intensity oscillates
    pipeMat.emissiveIntensity = 0.4 + f * (0.6 + 0.5 * Math.sin(t * 3.0));
    // Color pulses between deep blue and bright cyan
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.5);
    pipeMat.emissive.setRGB(0, pulse * 0.4 * f, 0.2 + pulse * 0.6 * f);
  });

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
  const innerRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (
      !innerRef.current ||
      !midRef.current ||
      !outerRef.current ||
      !diskRef.current ||
      !coneRef.current
    )
      return;
    const t = clock.getElapsedTime();
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.8);
    const intensity = pulse * flux;

    (
      innerRef.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = 4.0 + intensity * 6.0;
    (innerRef.current.material as THREE.MeshStandardMaterial).opacity =
      0.55 + intensity * 0.3;

    (midRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      2.5 + intensity * 3.5;
    (midRef.current.material as THREE.MeshStandardMaterial).opacity =
      0.3 + intensity * 0.2;

    (
      outerRef.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = 1.0 + intensity * 1.5;
    (outerRef.current.material as THREE.MeshStandardMaterial).opacity =
      0.1 + intensity * 0.12;

    (diskRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      3.0 + intensity * 4.0;
    (diskRef.current.material as THREE.MeshStandardMaterial).opacity =
      0.35 + intensity * 0.25;

    (coneRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      2.0 + intensity * 3.0;
    coneRef.current.rotation.y = t * 0.3;
  });

  const innerGeo = useMemo(
    () => new THREE.CylinderGeometry(0.85, 0.85, 2.8, 48, 1, true),
    [],
  );
  const midGeo = useMemo(
    () => new THREE.CylinderGeometry(1.1, 1.1, 3.1, 48, 1, true),
    [],
  );
  const outerGeo = useMemo(
    () => new THREE.CylinderGeometry(1.45, 1.45, 3.4, 48, 1, true),
    [],
  );
  const diskGeo = useMemo(() => new THREE.CircleGeometry(0.85, 48), []);
  const coneGeo = useMemo(
    () => new THREE.ConeGeometry(0.9, 1.2, 32, 1, true),
    [],
  );

  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x001020),
        emissive: new THREE.Color(0x00e8ff),
        emissiveIntensity: 5.0,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const midMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000810),
        emissive: new THREE.Color(0x0066ff),
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const outerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000510),
        emissive: new THREE.Color(0x0033cc),
        emissiveIntensity: 1.0,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const diskMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000820),
        emissive: new THREE.Color(0x00aaff),
        emissiveIntensity: 3.0,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const coneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000510),
        emissive: new THREE.Color(0x00ccff),
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
        wireframe: true,
      }),
    [],
  );

  return (
    <group>
      <mesh ref={innerRef} geometry={innerGeo} material={innerMat} />
      <mesh ref={midRef} geometry={midGeo} material={midMat} />
      <mesh ref={outerRef} geometry={outerGeo} material={outerMat} />
      <mesh
        ref={diskRef}
        geometry={diskGeo}
        material={diskMat}
        position={[0, 1.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        ref={coneRef}
        geometry={coneGeo}
        material={coneMat}
        position={[0, 1.8, 0]}
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
  const rimRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current || !hotRef.current || !rimRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.5);
    const baseIntensity = (0.8 + pulse * 0.8) * flux * (powerLevel / 3000) * 8;
    coreRef.current.intensity = baseIntensity + 1.5;
    hotRef.current.intensity = baseIntensity * 0.6 + 0.8;
    rimRef.current.intensity = 0.6 + flux * 0.8;
  });

  return (
    <>
      {/* Key light — warm top */}
      <directionalLight
        position={[6, 10, 5]}
        intensity={3.2}
        color={0xfff0e0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      {/* Fill light — cool blue */}
      <directionalLight
        position={[-5, 2, -4]}
        intensity={0.9}
        color={0x4488cc}
      />
      {/* Back rim light — teal for metallic edge highlights */}
      <directionalLight
        position={[0, -4, -6]}
        intensity={0.5}
        color={0x00aadd}
      />
      {/* Cherenkov core light — pulsing blue */}
      <pointLight
        ref={coreRef}
        position={[0, 0, 0]}
        color={0x00c8ff}
        intensity={4}
        distance={9}
        decay={1.8}
        castShadow
      />
      {/* Hot fuel glow — orange */}
      <pointLight
        ref={hotRef}
        position={[0, 0.3, 0]}
        color={0xff7000}
        intensity={2.5}
        distance={6}
        decay={2}
      />
      {/* Rim accent — teal */}
      <pointLight
        ref={rimRef}
        position={[-3, 1, -3]}
        color={0x00ffcc}
        intensity={1.0}
        distance={8}
        decay={2}
      />
      {/* Soft ambient */}
      <ambientLight intensity={0.04} color={0x050f18} />
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
    gl.toneMappingExposure = 1.4;
  }, [gl]);
  return null;
}

// ─── Unreal Bloom Post-Processing ─────────────────────────────────────────────

function BloomComposer({ strength }: { strength: number }) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      strength, // intensity — boosted to 2.0+
      0.8, // radius — wider bloom halo
      0.15, // luminance threshold — picks up more glow sources
    );
    const outputPass = new OutputPass();
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);
    composerRef.current = composer;
    return () => {
      composer.dispose();
      composerRef.current = null;
    };
  }, [gl, scene, camera, size, strength]);

  useEffect(() => {
    if (!composerRef.current) return;
    const bloomPass = composerRef.current.passes[1] as UnrealBloomPass;
    if (bloomPass && "strength" in bloomPass) {
      bloomPass.strength = strength;
    }
  }, [strength]);

  useFrame(() => {
    if (composerRef.current) {
      gl.autoClear = false;
      composerRef.current.render();
    }
  }, 1);

  return null;
}

// ─── Floating HUD Label (3D-space) ────────────────────────────────────────────

function HudLabel3D({
  position,
  label,
  sub,
  value,
  color = "#00d4ff",
}: {
  position: [number, number, number];
  label: string;
  sub?: string;
  value?: string;
  color?: string;
}) {
  return (
    <Html
      position={position}
      distanceFactor={8}
      zIndexRange={[10, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          background: "rgba(0,8,20,0.88)",
          border: `1px solid ${color}55`,
          borderLeft: `2px solid ${color}`,
          borderRadius: "4px",
          padding: "4px 8px",
          minWidth: "100px",
          backdropFilter: "blur(4px)",
          boxShadow: `0 0 12px ${color}22`,
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            color,
            fontSize: "9px",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1.3,
            textShadow: `0 0 8px ${color}`,
          }}
        >
          {label}
          {value && (
            <span
              style={{
                color: "#ffffff",
                marginLeft: "6px",
                fontSize: "10px",
              }}
            >
              {value}
            </span>
          )}
        </div>
        {sub && (
          <div
            style={{
              color: "rgba(180,200,220,0.65)",
              fontSize: "8px",
              fontFamily: "monospace",
              marginTop: "1px",
              lineHeight: 1.2,
            }}
          >
            {sub}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: "-6px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </Html>
  );
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────

const ReactorScene = memo(function ReactorScene({
  sim,
  reducedMotion,
  showLabels,
}: {
  sim: ReactorSimState;
  reducedMotion: boolean;
  showLabels: boolean;
}) {
  const active = sim.isPlaying && !reducedMotion;
  // Boost bloom to 2.0+ for cinematic UE5 feel
  const bloomStrength = 2.0 + sim.neutronFluxDensity * 0.8;

  return (
    <>
      <SceneSetup />
      <BloomComposer strength={bloomStrength} />
      <fog attach="fog" args={[0x020609, 12, 30]} />
      <Environment preset="night" />
      <CoreLighting flux={sim.neutronFluxDensity} powerLevel={sim.powerLevel} />
      <PressureVessel />
      <CoolantPipes flux={sim.neutronFluxDensity} active={active} />
      <FuelRodAssembly
        neutronFlux={sim.neutronFluxDensity}
        coreTemp={sim.coreAvgTemp}
        powerLevel={sim.powerLevel}
      />
      <ControlRods insertion={sim.controlRodInsertion} />
      {/* Volumetric Cherenkov cylinder layers */}
      <CherenkovGlow flux={sim.neutronFluxDensity} />
      {/* Concentric sphere Cherenkov halos at core center */}
      <CherenkovSpherePulse flux={sim.neutronFluxDensity} />
      <CoolantParticles flux={sim.neutronFluxDensity} active={active} />
      <NeutronParticles flux={sim.neutronFluxDensity} active={active} />
      {/* 650 Lissajous-orbit neutron flux particles */}
      <LissajousOrbitParticles active={active} flux={sim.neutronFluxDensity} />
      <SteamParticles active={active && sim.coolantTempOut > 320} />

      {/* 3D HUD labels anchored in world space */}
      {showLabels && (
        <>
          <HudLabel3D
            position={[1.2, 0.2, 0.8]}
            label="FUEL ROD ARRAY"
            sub="UO₂ Zircaloy-4 Clad"
            color="#ffa040"
          />
          <HudLabel3D
            position={[0.4, 2.1, 0.4]}
            label="CONTROL RODS"
            sub="B₄C Neutron Absorber"
            value={`${sim.controlRodInsertion}%`}
            color="#cc88ff"
          />
          <HudLabel3D
            position={[-1.8, -0.5, 0.8]}
            label="PRIMARY COOLANT"
            sub="H₂O @ 15.5 MPa"
            value={`${sim.coolantTempOut.toFixed(0)}°C`}
            color="#00d4ff"
          />
          <HudLabel3D
            position={[1.8, -0.2, -0.5]}
            label="CHERENKOV GLOW"
            sub="β⁻ → Čerenkov Radiation"
            color="#0088ff"
          />
          <HudLabel3D
            position={[-1.2, 0.8, -1.0]}
            label="CORE SHROUD"
            sub="316L Stainless Steel"
            color="#44aacc"
          />
          <HudLabel3D
            position={[0, -2.0, 1.5]}
            label="THERMAL POWER"
            sub="Fission Heat Output"
            value={`${(sim.thermalPower / 1000).toFixed(2)} GWth`}
            color="#ff6600"
          />
        </>
      )}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={0.2}
        maxPolarAngle={1.9}
        minDistance={4}
        maxDistance={20}
        autoRotate={false}
        makeDefault
      />
    </>
  );
});

// ─── Holographic Labels ───────────────────────────────────────────────────────

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
  const [viewMode, setViewMode] = useState<"classic" | "3d" | "sim">("classic");
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
        <button
          type="button"
          onClick={() => setViewMode("sim")}
          aria-pressed={viewMode === "sim"}
          className={`px-5 py-2 rounded-lg text-sm font-mono font-bold transition-all duration-200 ${
            viewMode === "sim"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="reactor.tab_sim_view"
        >
          🔬 Interactive Sim
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
          className="relative rounded-xl overflow-hidden border reactor-core-glow"
          style={{
            minHeight: 640,
            maxHeight: "82vh",
            borderColor: "rgba(0, 180, 255, 0.25)",
            boxShadow:
              "0 0 60px rgba(0, 100, 200, 0.2), 0 0 120px rgba(0, 50, 150, 0.1), inset 0 0 40px rgba(0, 30, 60, 0.3)",
          }}
          data-ocid="reactor.viewport_3d"
        >
          <WebGLErrorBoundary fallback={fallback}>
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  <div className="text-center space-y-3">
                    <div className="relative mx-auto w-12 h-12">
                      <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping" />
                      <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-xs text-muted-foreground font-mono tracking-widest">
                      INITIALIZING REACTOR CORE…
                    </p>
                    <p className="text-[10px] text-muted-foreground/50 font-mono">
                      Loading 3D engine & PBR materials
                    </p>
                  </div>
                </div>
              }
            >
              <Canvas
                camera={{ position: [6, 4, 8], fov: 40 }}
                gl={{ antialias: true, alpha: false }}
                style={{
                  height: "64vh",
                  minHeight: 580,
                  background:
                    "radial-gradient(ellipse at 50% 60%, #020f1e 0%, #010608 60%, #000304 100%)",
                  display: "block",
                  width: "100%",
                }}
                shadows
              >
                <ReactorScene
                  sim={sim}
                  reducedMotion={reducedMotion}
                  showLabels={showLabels}
                />
              </Canvas>
            </Suspense>
          </WebGLErrorBoundary>

          {/* Scan-line overlay for UE5 feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
              zIndex: 5,
            }}
            aria-hidden="true"
          />

          {/* Corner brackets — cinematic frame */}
          {(
            [
              "top-2 left-2",
              "top-2 right-2",
              "bottom-2 left-2",
              "bottom-2 right-2",
            ] as const
          ).map((pos, i) => (
            <div
              key={pos}
              className={`absolute ${pos} w-8 h-8 pointer-events-none`}
              style={{
                borderTop: i < 2 ? "2px solid rgba(0,200,255,0.4)" : "none",
                borderBottom: i >= 2 ? "2px solid rgba(0,200,255,0.4)" : "none",
                borderLeft:
                  i % 2 === 0 ? "2px solid rgba(0,200,255,0.4)" : "none",
                borderRight:
                  i % 2 === 1 ? "2px solid rgba(0,200,255,0.4)" : "none",
                zIndex: 15,
              }}
              aria-hidden="true"
            />
          ))}

          {/* TOP-LEFT: Digital Twin Title */}
          <div className="absolute top-4 left-4 z-20">
            <div
              className="rounded-lg px-3 py-2 flex items-center gap-2"
              style={{
                background: "rgba(0,8,20,0.85)",
                border: "1px solid rgba(0,200,255,0.3)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 0 20px rgba(0,100,200,0.2)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div
                  className="text-xs font-mono tracking-widest"
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 10px rgba(0,212,255,0.8)",
                    letterSpacing: "0.18em",
                  }}
                >
                  3D REACTOR DIGITAL TWIN
                </div>
                <div className="text-[9px] text-muted-foreground font-mono opacity-70">
                  {REACTOR_TYPE_DATA[sim.reactorType].full}
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-[9px] ml-2"
                style={{
                  borderColor: "rgba(52,211,153,0.5)",
                  color: "#34d399",
                }}
              >
                ONLINE
              </Badge>
            </div>
          </div>

          {/* TOP-RIGHT: Command Center Panel */}
          <div
            className="absolute top-4 right-4 z-20 w-56"
            data-ocid="reactor.command_panel"
          >
            <div
              className="rounded-lg p-3 space-y-1.5"
              style={{
                background: "rgba(0,8,20,0.88)",
                border: "1px solid rgba(0,200,255,0.25)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 0 24px rgba(0,80,160,0.2)",
              }}
            >
              <div
                className="text-[9px] font-mono tracking-widest mb-2 pb-1.5"
                style={{
                  color: "#00d4ff",
                  borderBottom: "1px solid rgba(0,200,255,0.15)",
                  textShadow: "0 0 8px rgba(0,212,255,0.6)",
                }}
              >
                ▸ COMMAND CENTER
              </div>
              <div className="space-y-1.5">
                {[
                  {
                    label: "CORE TEMP:",
                    val: `${sim.coreAvgTemp.toFixed(0)}°C`,
                    color: "#ff8040",
                  },
                  {
                    label: "POWER OUTPUT:",
                    val: `${(sim.thermalPower / 1000).toFixed(2)} GWth`,
                    color: "#ffdd00",
                  },
                  {
                    label: "COOLANT FLOW:",
                    val: `${(sim.coolantFlow / 1000).toFixed(1)}k kg/s`,
                    color: "#00d4ff",
                  },
                  {
                    label: "keff:",
                    val: sim.keff.toFixed(4),
                    color:
                      sim.keff > 1.05
                        ? "#ef4444"
                        : sim.keff > 0.99
                          ? "#f59e0b"
                          : "#00d4ff",
                  },
                  {
                    label: "STATUS:",
                    val:
                      sim.keff > 1.05
                        ? "SUPERCRITICAL"
                        : sim.keff > 0.99
                          ? "OPERATIONAL"
                          : "SUBCRITICAL",
                    color:
                      sim.keff > 1.05
                        ? "#ef4444"
                        : sim.keff > 0.99
                          ? "#34d399"
                          : "#94a3b8",
                  },
                  {
                    label: "NEUTRON FLUX:",
                    val: `${(sim.neutronFluxDensity * 3e13).toExponential(1)}`,
                    color: "#88eeff",
                  },
                ].map(({ label, val, color }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span
                      className="text-[9px] font-mono"
                      style={{ color: "rgba(150,190,220,0.7)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color, textShadow: `0 0 6px ${color}66` }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Core Physics Gauges — circular SVG arc gauges */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-48"
            data-ocid="reactor.gauges_panel"
          >
            <div
              className="rounded-lg p-3"
              style={{
                background: "rgba(0,8,20,0.85)",
                border: "1px solid rgba(0,200,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="text-[9px] font-mono tracking-widest mb-3 pb-1.5"
                style={{
                  color: "#00d4ff",
                  borderBottom: "1px solid rgba(0,200,255,0.12)",
                }}
              >
                ▸ CORE PHYSICS
              </div>
              {/* 2×2 SVG arc gauge grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "REACTIVITY",
                    pct: Math.min(
                      100,
                      Math.max(0, ((sim.keff - 0.8) / 0.4) * 100),
                    ),
                    display: sim.keff.toFixed(3),
                    color:
                      sim.keff > 1.05
                        ? "#ef4444"
                        : sim.keff > 0.99
                          ? "#f59e0b"
                          : "#00d4ff",
                  },
                  {
                    label: "THERMAL PWR",
                    pct: Math.min(100, (sim.thermalPower / 3600) * 100),
                    display: `${(sim.thermalPower / 1000).toFixed(1)}GW`,
                    color: "#ff8800",
                  },
                  {
                    label: "CORE TEMP",
                    pct: Math.min(
                      100,
                      Math.max(0, ((sim.coreAvgTemp - 280) / 300) * 100),
                    ),
                    display: `${sim.coreAvgTemp.toFixed(0)}°`,
                    color: sim.coreAvgTemp > 500 ? "#ef4444" : "#ff6622",
                  },
                  {
                    label: "COOLANT",
                    pct: Math.min(100, (sim.coolantFlow / 20000) * 100),
                    display: `${(sim.coolantFlow / 1000).toFixed(0)}k`,
                    color: "#00aaff",
                  },
                ].map(({ label, pct, display, color }) => {
                  // SVG arc gauge: 270° sweep, starts at -225°
                  const R = 28;
                  const cx = 40;
                  const cy = 40;
                  const startAngle = -225 * (Math.PI / 180);
                  const totalAngle = 270 * (Math.PI / 180);
                  const endAngle = startAngle + (pct / 100) * totalAngle;
                  const bgEnd = startAngle + totalAngle;
                  const bgX = cx + R * Math.cos(bgEnd);
                  const bgY = cy + R * Math.sin(bgEnd);
                  const fgX = cx + R * Math.cos(endAngle);
                  const fgY = cy + R * Math.sin(endAngle);
                  const startX = cx + R * Math.cos(startAngle);
                  const startY = cy + R * Math.sin(startAngle);
                  const fgLargeArc = (pct / 100) * 270 > 180 ? 1 : 0;
                  return (
                    <div key={label} className="flex flex-col items-center">
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <title>{label} gauge</title>
                        {/* Background arc */}
                        <path
                          d={`M ${startX.toFixed(2)},${startY.toFixed(2)} A ${R},${R} 0 1 1 ${bgX.toFixed(2)},${bgY.toFixed(2)}`}
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        {/* Foreground arc */}
                        {pct > 0 && (
                          <path
                            d={`M ${startX.toFixed(2)},${startY.toFixed(2)} A ${R},${R} 0 ${fgLargeArc} 1 ${fgX.toFixed(2)},${fgY.toFixed(2)}`}
                            fill="none"
                            stroke={color}
                            strokeWidth="5"
                            strokeLinecap="round"
                            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                          />
                        )}
                        {/* Center value text */}
                        <text
                          x={cx}
                          y={cy + 4}
                          textAnchor="middle"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                          fill={color}
                        >
                          {display}
                        </text>
                      </svg>
                      <span
                        className="text-[8px] font-mono text-center leading-tight"
                        style={{ color: "rgba(150,190,220,0.7)" }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* HOLOGRAPHIC HUD OVERLAY — Framer Motion pulsing labels */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 10,
            }}
            aria-hidden="true"
          >
            {[
              {
                label: "CORE TEMP",
                value: `${(320 + sim.powerLevel / 60).toFixed(0)}°C`,
                style: { top: "20%", left: "5%" },
                color: "#ff8040",
              },
              {
                label: "NEUTRON FLUX",
                value: `${(sim.neutronFluxDensity * 3.2e13).toExponential(1)} n/cm²s`,
                style: { top: "15%", right: "22%" },
                color: "#88eeff",
              },
              {
                label: "COOLANT FLOW",
                value: `${(60 + sim.powerLevel / 5).toFixed(0)} m³/s`,
                style: { bottom: "28%", left: "5%" },
                color: "#00d4ff",
              },
              {
                label: "THERMAL POWER",
                value: `${Math.round((sim.powerLevel / 3400) * 3200)} MWth`,
                style: { bottom: "22%", right: "22%" },
                color: "#ffaa00",
              },
            ].map(({ label, value, style, color }) => (
              <motion.div
                key={label}
                className="absolute font-mono"
                style={{
                  ...style,
                  background: "rgba(0,0,0,0.6)",
                  border: `1px solid ${color}55`,
                  borderLeft: `2px solid ${color}`,
                  borderRadius: "4px",
                  padding: "6px 10px",
                  backdropFilter: "blur(4px)",
                  boxShadow: `0 0 16px ${color}22`,
                }}
                animate={{ opacity: [0.7, 1.0, 0.7] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div
                  style={{
                    color: color,
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "11px",
                    textShadow: `0 0 8px ${color}`,
                  }}
                >
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM-LEFT: labels toggle */}
          <div className="absolute bottom-16 left-4 z-20">
            <button
              type="button"
              onClick={() => setShowLabels((v) => !v)}
              className="text-[9px] font-mono px-2.5 py-1.5 rounded"
              style={{
                background: showLabels
                  ? "rgba(0,200,255,0.15)"
                  : "rgba(0,8,20,0.7)",
                border: "1px solid rgba(0,200,255,0.25)",
                color: showLabels ? "#00d4ff" : "rgba(0,200,255,0.4)",
                backdropFilter: "blur(4px)",
              }}
              data-ocid="reactor.toggle_labels_3d"
            >
              {showLabels ? "◉ LABELS ON" : "○ LABELS OFF"}
            </button>
          </div>

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

      {/* ── INTERACTIVE SIM VIEW ── */}
      {viewMode === "sim" && (
        <InteractiveSimMode reactorType={sim.reactorType} />
      )}

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
