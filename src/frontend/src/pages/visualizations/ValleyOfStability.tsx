import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EquationBlock } from "@/components/EquationBlock";
import { InlineEquation } from "@/components/InlineEquation";
import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import {
  DECAY_COLORS,
  DECAY_LABELS,
  MAGIC_NUMBERS,
  betheWeizsacker,
  buildNuclearDataset,
} from "@/data/nuclearLandscape";
import type { DecayMode, Nuclide } from "@/data/nuclearLandscape";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const N_SCALE = 0.12;
const Z_SCALE = 0.15;
const BEA_SCALE = 0.9;
const N_OFFSET = -7.8;
const Z_OFFSET = -7.5;

function nuclideTo3D(nuc: Nuclide): [number, number, number] {
  return [
    nuc.N * N_SCALE + N_OFFSET,
    nuc.bea * BEA_SCALE,
    nuc.Z * Z_SCALE + Z_OFFSET,
  ];
}

const LEGEND_ITEMS: [DecayMode, string][] = [
  [0, "Stable"],
  [1, "\u03b2\u207b decay"],
  [2, "\u03b2\u207a/EC"],
  [3, "α decay"],
  [4, "Proton emitter"],
  [5, "Spont. Fission"],
];

const LEGEND_HEX: Record<DecayMode, string> = {
  0: "#22c55e",
  1: "#3b82f6",
  2: "#f97316",
  3: "#ef4444",
  4: "#ec4899",
  5: "#a855f7",
};

interface Controls {
  showDecayColors: boolean;
  showStabilityCurve: boolean;
  showMagicPlanes: boolean;
  showIron56: boolean;
  showDripLines: boolean;
  decayFilters: Record<DecayMode, boolean>;
}

const _ALL_DECAY_MODES: DecayMode[] = [0, 1, 2, 3, 4, 5];

const MAGIC_Z_LABELS: Record<number, string> = {
  2: "He",
  8: "O",
  20: "Ca",
  28: "Ni",
  50: "Sn",
  82: "Pb",
  114: "Fl",
};

export default function ValleyOfStability() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameRef = useRef<number>(0);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const stabilityLineRef = useRef<THREE.Line | null>(null);
  const magicPlanesRef = useRef<THREE.Group | null>(null);
  const iron56Ref = useRef<THREE.Mesh | null>(null);
  const dripLinesRef = useRef<THREE.Group | null>(null);
  const zLabelsRef = useRef<{ div: HTMLDivElement; z: number }[]>([]);
  const nuclidesRef = useRef<Nuclide[]>([]);

  const [selected, setSelected] = useState<Nuclide | null>(null);
  const [controls, setControls] = useState<Controls>({
    showDecayColors: true,
    showStabilityCurve: true,
    showMagicPlanes: false,
    showIron56: true,
    showDripLines: true,
    decayFilters: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleControl = (key: keyof Controls) => {
    setControls((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDecayFilter = (dm: DecayMode) => {
    setControls((prev) => ({
      ...prev,
      decayFilters: { ...prev.decayFilters, [dm]: !prev.decayFilters[dm] },
    }));
  };

  const animateCameraTo = useCallback(
    (targetPos: [number, number, number], lookAt: [number, number, number]) => {
      if (!cameraRef.current || !controlsRef.current) return;
      const cam = cameraRef.current;
      const startPos = cam.position.clone();
      const endPos = new THREE.Vector3(...targetPos);
      const startTarget = controlsRef.current.target.clone();
      const endTarget = new THREE.Vector3(...lookAt);
      const duration = 1200;
      const startTime = performance.now();
      const tick = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
        cam.position.lerpVectors(startPos, endPos, ease);
        controlsRef.current!.target.lerpVectors(startTarget, endTarget, ease);
        controlsRef.current!.update();
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    [],
  );

  // Build scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x050810, 1);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050810, 0.018);
    sceneRef.current = scene;

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 200);
    camera.position.set(6, 12, 18);
    cameraRef.current = camera;

    // Orbit controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.06;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 40;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 0.4;
    controlsRef.current = orbitControls;

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a2a4a, 2.5));
    const dirLight = new THREE.DirectionalLight(0x88aaff, 3);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x4466ff, 1.5);
    rimLight.position.set(-8, 5, -8);
    scene.add(rimLight);
    const pointLight = new THREE.PointLight(0x00aaff, 2, 30);
    pointLight.position.set(0, 6, 0);
    scene.add(pointLight);

    // Grid floor
    const gridHelper = new THREE.GridHelper(28, 30, 0x112244, 0x0a1a33);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Axes labels (simple lines)
    const axisMat = new THREE.LineBasicMaterial({
      color: 0x334477,
      linewidth: 1,
    });
    const xAxis = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, 0, -7.5),
      new THREE.Vector3(8, 0, -7.5),
    ]);
    scene.add(new THREE.Line(xAxis, axisMat));
    const zAxis = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, 0, -7.5),
      new THREE.Vector3(-8, 0, 7.5),
    ]);
    scene.add(new THREE.Line(zAxis, axisMat));

    // Build nuclide dataset
    const nuclides = buildNuclearDataset();
    nuclidesRef.current = nuclides;

    // Point cloud geometry
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    for (const nuc of nuclides) {
      const [x, y, z] = nuclideTo3D(nuc);
      positions.push(x, y, z);
      const col = new THREE.Color(DECAY_COLORS[nuc.decayMode]);
      colors.push(col.r, col.g, col.b);
      sizes.push(nuc.decayMode === 0 ? 18 : 10);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    const shaderMat = new THREE.ShaderMaterial({
      uniforms: { useColors: { value: 1.0 }, opacity: { value: 0.92 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vSize;
        void main() {
          vColor = color;
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float opacity;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float alpha = (1.0 - d * d) * opacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geom, shaderMat);
    scene.add(points);
    pointsRef.current = points;

    // Drip lines
    const dripGroup = new THREE.Group();
    const protonDripPoints: THREE.Vector3[] = [];
    const neutronDripPoints: THREE.Vector3[] = [];
    const zMap = new Map<number, { minN: number; maxN: number }>();
    for (const nuc of nuclides) {
      const entry = zMap.get(nuc.Z);
      if (!entry) {
        zMap.set(nuc.Z, { minN: nuc.N, maxN: nuc.N });
      } else {
        entry.minN = Math.min(entry.minN, nuc.N);
        entry.maxN = Math.max(entry.maxN, nuc.N);
      }
    }
    for (let Z = 1; Z <= 98; Z++) {
      const entry = zMap.get(Z);
      if (!entry) continue;
      const [px, py, pz] = nuclideTo3D({
        Z,
        N: entry.minN,
        bea: betheWeizsacker(Z, entry.minN),
      } as Nuclide);
      protonDripPoints.push(new THREE.Vector3(px, py + 0.05, pz));
      const [nx, ny, nz] = nuclideTo3D({
        Z,
        N: entry.maxN,
        bea: betheWeizsacker(Z, entry.maxN),
      } as Nuclide);
      neutronDripPoints.push(new THREE.Vector3(nx, ny + 0.05, nz));
    }
    const protonDripGeom = new THREE.BufferGeometry().setFromPoints(
      protonDripPoints,
    );
    const protonDripMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.9,
    });
    const protonDripLine = new THREE.Line(protonDripGeom, protonDripMat);
    dripGroup.add(protonDripLine);
    const neutronDripGeom = new THREE.BufferGeometry().setFromPoints(
      neutronDripPoints,
    );
    const neutronDripMat = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
    });
    const neutronDripLine = new THREE.Line(neutronDripGeom, neutronDripMat);
    dripGroup.add(neutronDripLine);
    scene.add(dripGroup);
    dripLinesRef.current = dripGroup;

    // Valley of stability curve (glowing white line)
    const stableNuclides = nuclides
      .filter((n) => n.decayMode === 0)
      .sort((a, b) => a.N - b.N);
    const linePoints = stableNuclides.map((n) => {
      const [x, y, z] = nuclideTo3D(n);
      return new THREE.Vector3(x, y + 0.05, z);
    });
    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const stabilityLine = new THREE.Line(lineGeom, lineMat);
    scene.add(stabilityLine);
    stabilityLineRef.current = stabilityLine;

    // Magic number planes (N and Z)
    const magicGroup = new THREE.Group();
    const nPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const nPlaneEdgeMat = new THREE.LineBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.3,
    });
    const zPlaneMat = new THREE.MeshBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const zPlaneEdgeMat = new THREE.LineBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.3,
    });
    for (const m of MAGIC_NUMBERS) {
      if (m > 130) continue;
      // N = m plane
      const nx = m * N_SCALE + N_OFFSET;
      const nPlaneGeom = new THREE.PlaneGeometry(0.05, 10);
      const nPlane = new THREE.Mesh(nPlaneGeom, nPlaneMat);
      nPlane.rotation.y = Math.PI / 2;
      nPlane.position.set(nx, 3.5, 0);
      magicGroup.add(nPlane);
      const nEdgePoints = [
        new THREE.Vector3(nx, 0, -7),
        new THREE.Vector3(nx, 7, -7),
        new THREE.Vector3(nx, 7, 7),
        new THREE.Vector3(nx, 0, 7),
      ];
      const nEdgeGeom = new THREE.BufferGeometry().setFromPoints(nEdgePoints);
      magicGroup.add(new THREE.Line(nEdgeGeom, nPlaneEdgeMat));
    }
    for (const m of [2, 8, 20, 28, 50, 82, 114]) {
      const nz = m * Z_SCALE + Z_OFFSET;
      const zPlaneGeom = new THREE.PlaneGeometry(10, 0.05);
      const zPlane = new THREE.Mesh(zPlaneGeom, zPlaneMat);
      zPlane.rotation.x = Math.PI / 2;
      zPlane.position.set(0, 3.5, nz);
      magicGroup.add(zPlane);
      const zEdgePoints = [
        new THREE.Vector3(-8, 0, nz),
        new THREE.Vector3(-8, 7, nz),
        new THREE.Vector3(8, 7, nz),
        new THREE.Vector3(8, 0, nz),
      ];
      const zEdgeGeom = new THREE.BufferGeometry().setFromPoints(zEdgePoints);
      magicGroup.add(new THREE.Line(zEdgeGeom, zPlaneEdgeMat));
      // Label
      const labelDiv = document.createElement("div");
      labelDiv.className = "magic-label";
      labelDiv.textContent = `Z=${m} (${MAGIC_Z_LABELS[m] ?? ""})`;
      labelDiv.style.cssText =
        "position:absolute;color:#ffaa66;font-size:10px;font-family:monospace;pointer-events:none;text-shadow:0 0 4px #ff8844;white-space:nowrap;";
      container.appendChild(labelDiv);
      zLabelsRef.current.push({ div: labelDiv, z: nz });
    }
    scene.add(magicGroup);
    magicPlanesRef.current = magicGroup;

    // Iron-56 highlight (Z=26, N=30)
    const fe56 = nuclides.find((n) => n.Z === 26 && n.N === 30);
    if (fe56) {
      const [x, y, z] = nuclideTo3D(fe56);
      const sphereGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0xffdd00,
        emissive: 0xffaa00,
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.9,
      });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.set(x, y + 0.1, z);
      scene.add(sphere);
      iron56Ref.current = sphere;

      // Glow ring around Fe-56
      const ringGeom = new THREE.RingGeometry(0.22, 0.38, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffdd00,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(x, y + 0.08, z);
      ring.rotation.x = -Math.PI / 2;
      scene.add(ring);
    }

    // Landscape mesh (surface)
    const meshW = 130;
    const meshH = 98;
    const landscapeGeom = new THREE.PlaneGeometry(
      meshW * N_SCALE,
      meshH * Z_SCALE,
      meshW - 1,
      meshH - 1,
    );
    landscapeGeom.rotateX(-Math.PI / 2);
    const posAttr = landscapeGeom.attributes.position as THREE.BufferAttribute;
    const lColors: number[] = [];
    const nMap = new Map<string, Nuclide>();
    for (const nuc of nuclides) nMap.set(`${nuc.N}-${nuc.Z}`, nuc);

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const N = Math.round((x - N_OFFSET) / N_SCALE);
      const Z = Math.round((z - Z_OFFSET) / Z_SCALE);
      const nuc = nMap.get(`${N}-${Z}`);
      const bea = nuc ? nuc.bea : 0;
      posAttr.setY(i, bea * BEA_SCALE - 0.08);
      const t = Math.max(0, Math.min(1, bea / 9.0));
      const c = new THREE.Color();
      c.setHSL(0.6 - t * 0.5, 0.7, 0.1 + t * 0.2);
      lColors.push(c.r, c.g, c.b);
    }
    landscapeGeom.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lColors, 3),
    );
    landscapeGeom.computeVertexNormals();

    const landscapeMat = new THREE.MeshLambertMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const landscapeMesh = new THREE.Mesh(landscapeGeom, landscapeMat);
    scene.add(landscapeMesh);

    // Wire frame overlay for the landscape
    const wireGeom = new THREE.WireframeGeometry(landscapeGeom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x1a3366,
      transparent: true,
      opacity: 0.12,
    });
    scene.add(new THREE.LineSegments(wireGeom, wireMat));

    // Raycaster for click selection
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.22 };
    const handleClick = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(points);
      if (hits.length > 0 && hits[0].index !== undefined) {
        const nuc = nuclidesRef.current[hits[0].index];
        if (nuc) setSelected(nuc);
      }
    };
    renderer.domElement.addEventListener("click", handleClick);

    // Pause auto-rotate on user interaction
    const pauseRotate = () => {
      if (controlsRef.current) controlsRef.current.autoRotate = false;
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setTimeout(() => {
        if (controlsRef.current) controlsRef.current.autoRotate = true;
      }, 4000);
    };
    renderer.domElement.addEventListener("pointerdown", pauseRotate);
    renderer.domElement.addEventListener("wheel", pauseRotate);

    // Update magic Z label positions each frame
    const updateLabels = () => {
      if (!cameraRef.current || !mountRef.current) return;
      const cam = cameraRef.current;
      const rect = mountRef.current.getBoundingClientRect();
      for (const lbl of zLabelsRef.current) {
        const pos = new THREE.Vector3(0, 6.5, lbl.z);
        pos.project(cam);
        const x = (pos.x * 0.5 + 0.5) * rect.width;
        const y = (-pos.y * 0.5 + 0.5) * rect.height;
        lbl.div.style.left = `${x}px`;
        lbl.div.style.top = `${y}px`;
        lbl.div.style.transform = "translate(-50%, -100%)";
        lbl.div.style.display = pos.z < 1 ? "block" : "none";
      }
    };

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      orbitControls.update();
      // Pulse iron-56 marker
      if (iron56Ref.current) {
        const t = performance.now() * 0.002;
        const mat = iron56Ref.current.material as THREE.MeshPhongMaterial;
        mat.emissiveIntensity = 1.5 + Math.sin(t) * 1.0;
      }
      updateLabels();
      renderer.render(scene, camera);
    };
    animate();
    setIsLoaded(true);

    // Resize
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("pointerdown", pauseRotate);
      renderer.domElement.removeEventListener("wheel", pauseRotate);
      renderer.dispose();
      for (const lbl of zLabelsRef.current) lbl.div.remove();
      zLabelsRef.current = [];
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, []);

  // Toggle visibility
  useEffect(() => {
    if (stabilityLineRef.current)
      stabilityLineRef.current.visible = controls.showStabilityCurve;
    if (magicPlanesRef.current)
      magicPlanesRef.current.visible = controls.showMagicPlanes;
    if (iron56Ref.current) iron56Ref.current.visible = controls.showIron56;
    if (dripLinesRef.current)
      dripLinesRef.current.visible = controls.showDripLines;
  }, [
    controls.showStabilityCurve,
    controls.showMagicPlanes,
    controls.showIron56,
    controls.showDripLines,
  ]);

  // Decay filter: hide/show points by scaling
  useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const sizeAttr = geom.attributes.size as THREE.BufferAttribute;
    if (!sizeAttr) return;
    const nuclides = nuclidesRef.current;
    for (let i = 0; i < nuclides.length; i++) {
      const dm = nuclides[i].decayMode;
      const visible = controls.decayFilters[dm];
      sizeAttr.setX(i, visible ? (dm === 0 ? 18 : 10) : 0);
    }
    sizeAttr.needsUpdate = true;
  }, [controls.decayFilters]);

  useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const colAttr = geom.attributes.color as THREE.BufferAttribute;
    if (!colAttr) return;
    const nuclides = nuclidesRef.current;
    for (let i = 0; i < nuclides.length; i++) {
      const nuc = nuclides[i];
      let hex: number;
      if (controls.showDecayColors) {
        hex = DECAY_COLORS[nuc.decayMode];
      } else {
        const t = Math.min(1, nuc.bea / 9);
        hex = new THREE.Color()
          .setHSL(0.6 - t * 0.55, 0.9, 0.3 + t * 0.4)
          .getHex();
      }
      const c = new THREE.Color(hex);
      colAttr.setXYZ(i, c.r, c.g, c.b);
    }
    colAttr.needsUpdate = true;
  }, [controls.showDecayColors]);

  const navigateToDecayChain = useCallback((nuc: Nuclide) => {
    const sym = `${nuc.A}${nuc.symbol}`;
    window.location.href = `/visualizations/decay-chain?nuclide=${encodeURIComponent(sym)}`;
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-4 pt-6 pb-2 md:px-8">
        <PageHeader
          title="Valley of Stability"
          subtitle="The 3D nuclear landscape — binding energy per nucleon across all known nuclides. The valley floor traces the stable isotopes; the walls reveal where nuclei decay toward stability."
          audienceLevel="professional"
        />
      </div>

      {/* Main layout: 3D canvas + sidebar */}
      <div className="flex flex-col lg:flex-row gap-4 px-4 pb-4 md:px-8 flex-1">
        {/* Canvas */}
        <div className="relative flex-1 min-h-[480px] lg:min-h-[640px] rounded-xl overflow-hidden border border-border shadow-glow-accent bg-[#050810]">
          <div
            ref={mountRef}
            className="w-full h-full"
            data-ocid="valley.canvas_target"
          />

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Building nuclear landscape…
                </span>
              </div>
            </div>
          )}

          {/* Axis labels overlay */}
          <div className="pointer-events-none absolute bottom-14 left-4 right-4 flex justify-between text-[10px] text-muted-foreground/70 font-mono">
            <span>N = 0</span>
            <span className="text-center">← Neutron Number (N) →</span>
            <span>N = 130</span>
          </div>
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/60 font-mono">
            Height = Binding Energy / Nucleon (MeV) · Color = Decay Mode
          </div>

          {/* Legend */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <p className="text-[10px] text-muted-foreground mb-1.5 font-semibold uppercase tracking-wider">
              Decay Mode
            </p>
            <div className="flex flex-col gap-1">
              {LEGEND_ITEMS.map(([dm, label]) => (
                <div key={dm} className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: LEGEND_HEX[dm] }}
                  />
                  <span className="text-[10px] text-foreground/80">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fe-56 label */}
          {controls.showIron56 && (
            <div className="absolute top-3 right-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-2.5 py-1.5">
              <p className="text-[11px] font-semibold text-yellow-400">
                ★ Fe-56 Peak
              </p>
              <p className="text-[10px] text-yellow-300/70">BE/A = 8.790 MeV</p>
            </div>
          )}

          {/* Camera preset buttons */}
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            <PresetButton
              label="Top View"
              onClick={() => animateCameraTo([0, 18, 0.1], [0, 0, 0])}
              ocid="valley.preset.top"
            />
            <PresetButton
              label="Side View"
              onClick={() => animateCameraTo([0, 6, 22], [0, 3, 0])}
              ocid="valley.preset.side"
            />
            <PresetButton
              label="Fe-56 Focus"
              onClick={() => {
                const fe56 = nuclidesRef.current.find(
                  (n) => n.Z === 26 && n.N === 30,
                );
                if (fe56) {
                  const [x, y, z] = nuclideTo3D(fe56);
                  animateCameraTo([x + 3, y + 5, z + 3], [x, y, z]);
                }
              }}
              ocid="valley.preset.fe56"
            />
            <PresetButton
              label="Reset"
              onClick={() => animateCameraTo([6, 12, 18], [0, 3, 0])}
              ocid="valley.preset.reset"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3 w-full lg:w-72 xl:w-80 flex-shrink-0">
          {/* Controls */}
          <SectionCard data-ocid="valley.controls.panel" glowAccent>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-lg">🎛</span> Visualization Controls
            </h3>
            <div className="flex flex-col gap-2">
              <ToggleButton
                active={controls.showDecayColors}
                onClick={() => toggleControl("showDecayColors")}
                label="Decay Mode Colors"
                ocid="valley.toggle.decay_colors"
              />
              <ToggleButton
                active={controls.showStabilityCurve}
                onClick={() => toggleControl("showStabilityCurve")}
                label="Valley Stability Curve"
                ocid="valley.toggle.stability_curve"
              />
              <ToggleButton
                active={controls.showMagicPlanes}
                onClick={() => toggleControl("showMagicPlanes")}
                label="Magic Number Planes"
                ocid="valley.toggle.magic_planes"
              />
              <ToggleButton
                active={controls.showIron56}
                onClick={() => toggleControl("showIron56")}
                label="Iron-56 Highlight"
                ocid="valley.toggle.iron56"
              />
              <ToggleButton
                active={controls.showDripLines}
                onClick={() => toggleControl("showDripLines")}
                label="Drip Lines"
                ocid="valley.toggle.drip_lines"
              />
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              🖱 Drag to rotate · Scroll to zoom · Click any point to inspect
            </p>
          </SectionCard>

          {/* Decay mode filters */}
          <SectionCard data-ocid="valley.decay_filters.panel">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-lg">🔘</span> Decay Mode Filters
            </h3>
            <div className="flex flex-col gap-2">
              {LEGEND_ITEMS.map(([dm, label]) => (
                <label
                  key={dm}
                  className="flex items-center gap-2 cursor-pointer"
                  data-ocid={`valley.filter.decay_${dm}`}
                >
                  <input
                    type="checkbox"
                    checked={controls.decayFilters[dm]}
                    onChange={() => toggleDecayFilter(dm)}
                    className="h-3.5 w-3.5 rounded border-border accent-primary"
                  />
                  <div
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: LEGEND_HEX[dm] }}
                  />
                  <span className="text-xs text-foreground/80">{label}</span>
                </label>
              ))}
            </div>
          </SectionCard>

          {/* Nuclide Inspector */}
          <SectionCard data-ocid="valley.inspector.panel">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-lg">🔬</span> Nuclide Inspector
            </h3>
            {selected ? (
              <NuclideInspector
                nuclide={selected}
                onDecayChain={navigateToDecayChain}
              />
            ) : (
              <div
                className="text-center py-6"
                data-ocid="valley.inspector.empty_state"
              >
                <div className="text-3xl mb-2 opacity-40">⚛</div>
                <p className="text-xs text-muted-foreground">
                  Click any point on the landscape to inspect a nuclide
                </p>
              </div>
            )}
          </SectionCard>

          {/* Magic numbers */}
          <SectionCard>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="text-lg">✨</span> Magic Numbers
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {MAGIC_NUMBERS.map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-bold"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              Nuclei with these proton or neutron counts have extra-filled
              shells, giving them enhanced binding energy and stability —
              analogous to noble gases in chemistry.
            </p>
          </SectionCard>
        </div>
      </div>

      {/* Educational sections */}
      <div className="px-4 pb-8 md:px-8 flex flex-col gap-4">
        <CollapsibleSection
          id="valley-explanation"
          title="Why does the Valley of Stability exist?"
          defaultOpen
          data-ocid="valley.explanation.section"
        >
          <div className="prose prose-sm prose-invert max-w-none space-y-3 text-muted-foreground">
            <p>
              The{" "}
              <strong className="text-foreground">Valley of Stability</strong>{" "}
              arises from the competition between two fundamental nuclear
              forces: the <em>strong nuclear force</em> (which binds nucleons
              together, favouring equal numbers of protons and neutrons for
              light nuclei) and the <em>Coulomb repulsion</em> between protons
              (which grows as Z², pushing heavy nuclei toward neutron-rich
              compositions).
            </p>
            <p>
              The valley floor — the region of highest binding energy per
              nucleon — traces the line of maximum stability for each mass
              number A. Nuclei on the proton-rich wall (right side) decay by β⁺
              emission or electron capture to shed a proton. Nuclei on the
              neutron-rich wall (left side) decay by β⁻ emission to gain a
              proton. Very heavy nuclei (Z&gt;83) preferentially shed an alpha
              <EquationBlock
                latex="\\frac{\\text{BE}}{A} = a_V - a_S A^{-1/3} - a_C \\frac{Z(Z-1)}{A^{4/3}} - a_A \\frac{(N-Z)^2}{A^2} \\pm a_P A^{-3/2}"
                annotation="Bethe\u2013Weizs\u00e4cker semi-empirical mass formula (SEMF). Terms: volume (a_V\u224815.8\u00a0MeV), surface (a_S\u224818.3\u00a0MeV), Coulomb (a_C\u22480.714\u00a0MeV), asymmetry (a_A\u224823.2\u00a0MeV), pairing (a_P\u224812\u00a0MeV). Pairing term is +, \u2212, or 0 for even-even, odd-odd, or odd-A nuclei."
                label="Bethe\u2013Weizs\u00e4cker SEMF"
              />
              surface, Coulomb, asymmetry, pairing.
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="iron56-peak"
          title="Iron-56: The Most Tightly Bound Nucleus"
          data-ocid="valley.iron56.section"
        >
          <div className="prose prose-sm prose-invert max-w-none text-muted-foreground space-y-3">
            <p>
              <strong className="text-yellow-400">
                Iron-56 (Z=26, N=30, A=56)
              </strong>{" "}
              has the highest binding energy per nucleon of any nucleus at{" "}
              <strong className="text-foreground">8.790 MeV/nucleon</strong>,
              placing it at the very bottom of the valley (the peak of the
              landscape in our height=BE/A convention).
            </p>
            <p>
              This is why stellar fusion proceeds up to iron and stops: fusing
              lighter nuclei releases energy (exothermic), but fusing iron-group
              nuclei <em>costs</em> energy (endothermic). Stars that attempt to
              fuse beyond iron rapidly collapse, triggering core-collapse
              supernovae.
            </p>
            <p>
              Conversely, fission of uranium and plutonium releases energy
              precisely because splitting a very heavy nucleus produces daughter
              fragments closer to the iron-56 peak with higher BE/A.
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="nucleosynthesis"
          title="Connection to Stellar Nucleosynthesis"
          data-ocid="valley.nucleosynthesis.section"
        >
          <div className="prose prose-sm prose-invert max-w-none text-muted-foreground space-y-3">
            <p>
              Every element heavier than hydrogen was forged inside a star or
              during a violent stellar event. The valley of stability is the
              roadmap of how nuclear burning progresses:
            </p>
            <ul className="space-y-1 list-disc list-inside text-sm">
              <li>
                <strong className="text-foreground">
                  Hydrogen burning (pp chain, CNO cycle):
                </strong>{" "}
                H → He (0–7 MeV/A)
              </li>
              <li>
                <strong className="text-foreground">Helium burning:</strong> He
                → C, O (7–8 MeV/A)
              </li>
              <li>
                <strong className="text-foreground">
                  Carbon/neon/oxygen/silicon burning:
                </strong>{" "}
                walk up the valley to Fe-group
              </li>
              <li>
                <strong className="text-foreground">
                  s-process (slow neutron capture):
                </strong>{" "}
                builds elements up to Bi-209 along the valley
              </li>
              <li>
                <strong className="text-foreground">
                  r-process (neutron star mergers):
                </strong>{" "}
                produces rapid neutron captures far into the neutron-rich wall,
                then decays back to the valley
              </li>
              <li>
                <strong className="text-foreground">p-process:</strong>{" "}
                photodisintegration on the proton-rich side
              </li>
            </ul>
            <p className="text-[11px] italic">
              Source: B²FH (1957), Burbidge, Burbidge, Fowler &amp; Hoyle; IAEA
              Nuclear Data Services.
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToggleButton({
  active,
  onClick,
  label,
  ocid,
}: { active: boolean; onClick: () => void; label: string; ocid: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
        active
          ? "bg-primary/20 text-primary border border-primary/40"
          : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50"
      }`}
    >
      <span>{label}</span>
      <span
        className={`h-4 w-4 rounded-full border ${
          active
            ? "bg-primary border-primary"
            : "bg-transparent border-muted-foreground"
        }`}
      />
    </button>
  );
}

function NuclideInspector({
  nuclide,
  onDecayChain,
}: { nuclide: Nuclide; onDecayChain: (n: Nuclide) => void }) {
  const { Z, N, A, symbol, name, bea, decayMode, halfLife } = nuclide;
  const totalBE = bea * A;
  const stabilityPct = Math.min(100, (bea / 8.79) * 100);
  const magicZ = MAGIC_NUMBERS.includes(Z) ? Z : null;
  const magicN = MAGIC_NUMBERS.includes(N) ? N : null;
  return (
    <div className="space-y-2" data-ocid="valley.nuclide.card">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/30">
          <span className="font-display text-lg font-bold text-primary">
            {symbol}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-foreground">
            {A}
            {symbol}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {name}-{A}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-xs">
        <DataRow label="Z (protons)" value={String(Z)} />
        <DataRow label="N (neutrons)" value={String(N)} />
        <DataRow label="A (mass no.)" value={String(A)} />
        <DataRow label="BE/A" value={`${bea.toFixed(3)} MeV`} highlight />
        <div className="col-span-2">
          <DataRow label="Total BE" value={`${totalBE.toFixed(1)} MeV`} />
        </div>
        <div className="col-span-2">
          <DataRow label="Decay mode" value={DECAY_LABELS[decayMode]} />
        </div>
        <div className="col-span-2">
          <DataRow label="Half-life" value={halfLife} />
        </div>
        {(magicZ || magicN) && (
          <div className="col-span-2">
            <DataRow
              label="Magic Numbers"
              value={`${magicZ ? `Z=${magicZ}` : ""}${magicZ && magicN ? ", " : ""}${magicN ? `N=${magicN}` : ""}`}
            />
          </div>
        )}
      </div>
      {/* Stability progress bar */}
      <div className="mt-1">
        <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
          <span>Relative Stability</span>
          <span>{stabilityPct.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${stabilityPct}%` }}
          />
        </div>
      </div>
      {decayMode !== 0 && (
        <button
          type="button"
          onClick={() => onDecayChain(nuclide)}
          data-ocid="valley.inspector.decay_chain_button"
          className="w-full mt-1 px-3 py-2 rounded-lg bg-primary/15 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/25 transition-colors"
        >
          Open in Decay Chain Explorer →
        </button>
      )}
    </div>
  );
}

function DataRow({
  label,
  value,
  highlight,
}: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center bg-muted/20 rounded px-2 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-mono font-medium ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function PresetButton({
  label,
  onClick,
  ocid,
}: { label: string; onClick: () => void; ocid: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-foreground/80 hover:bg-white/10 transition-colors"
    >
      {label}
    </button>
  );
}
