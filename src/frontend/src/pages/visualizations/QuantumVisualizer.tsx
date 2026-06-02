import { EquationBlock } from "@/components/EquationBlock";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ─── Quantum number definitions ───────────────────────────────────────────────
const ORBITALS = [
  { n: 1, l: 0, ml: 0, label: "1s", symbol: "1s" },
  { n: 2, l: 0, ml: 0, label: "2s", symbol: "2s" },
  { n: 2, l: 1, ml: -1, label: "2p₋₁", symbol: "2p_x" },
  { n: 2, l: 1, ml: 0, label: "2p₀", symbol: "2p_z" },
  { n: 2, l: 1, ml: 1, label: "2p₊₁", symbol: "2p_y" },
  { n: 3, l: 0, ml: 0, label: "3s", symbol: "3s" },
  { n: 3, l: 1, ml: -1, label: "3p₋₁", symbol: "3p_x" },
  { n: 3, l: 1, ml: 0, label: "3p₀", symbol: "3p_z" },
  { n: 3, l: 1, ml: 1, label: "3p₊₁", symbol: "3p_y" },
  { n: 3, l: 2, ml: -2, label: "3d₋₂", symbol: "3d_xy" },
  { n: 3, l: 2, ml: -1, label: "3d₋₁", symbol: "3d_xz" },
  { n: 3, l: 2, ml: 0, label: "3d₀", symbol: "3d_z2" },
  { n: 3, l: 2, ml: 1, label: "3d₊₁", symbol: "3d_yz" },
  { n: 3, l: 2, ml: 2, label: "3d₊₂", symbol: "3d_x2y2" },
  { n: 4, l: 0, ml: 0, label: "4s", symbol: "4s" },
  { n: 4, l: 1, ml: -1, label: "4p₋₁", symbol: "4p_x" },
  { n: 4, l: 1, ml: 0, label: "4p₀", symbol: "4p_z" },
  { n: 4, l: 1, ml: 1, label: "4p₊₁", symbol: "4p_y" },
  { n: 4, l: 2, ml: -2, label: "4d₋₂", symbol: "4d_xy" },
  { n: 4, l: 2, ml: -1, label: "4d₋₁", symbol: "4d_xz" },
  { n: 4, l: 2, ml: 0, label: "4d₀", symbol: "4d_z2" },
  { n: 4, l: 2, ml: 1, label: "4d₊₁", symbol: "4d_yz" },
  { n: 4, l: 2, ml: 2, label: "4d₊₂", symbol: "4d_x2y2" },
  { n: 4, l: 3, ml: -3, label: "4f₋₃", symbol: "4f_x3" },
  { n: 4, l: 3, ml: -2, label: "4f₋₂", symbol: "4f_x2y" },
  { n: 4, l: 3, ml: -1, label: "4f₋₁", symbol: "4f_xz2" },
  { n: 4, l: 3, ml: 0, label: "4f₀", symbol: "4f_z3" },
  { n: 4, l: 3, ml: 1, label: "4f₊₁", symbol: "4f_yz2" },
  { n: 4, l: 3, ml: 2, label: "4f₊₂", symbol: "4f_y3" },
  { n: 4, l: 3, ml: 3, label: "4f₊₃", symbol: "4f_xyz" },
  { n: 5, l: 0, ml: 0, label: "5s", symbol: "5s" },
  { n: 5, l: 1, ml: -1, label: "5p₋₁", symbol: "5p_x" },
  { n: 5, l: 1, ml: 0, label: "5p₀", symbol: "5p_z" },
  { n: 5, l: 1, ml: 1, label: "5p₊₁", symbol: "5p_y" },
  { n: 5, l: 2, ml: -2, label: "5d₋₂", symbol: "5d_xy" },
  { n: 5, l: 2, ml: -1, label: "5d₋₁", symbol: "5d_xz" },
  { n: 5, l: 2, ml: 0, label: "5d₀", symbol: "5d_z2" },
  { n: 5, l: 2, ml: 1, label: "5d₊₁", symbol: "5d_yz" },
  { n: 5, l: 2, ml: 2, label: "5d₊₂", symbol: "5d_x2y2" },
  { n: 5, l: 3, ml: -3, label: "5f₋₃", symbol: "5f_x3" },
  { n: 5, l: 3, ml: -2, label: "5f₋₂", symbol: "5f_x2y" },
  { n: 5, l: 3, ml: -1, label: "5f₋₁", symbol: "5f_xz2" },
  { n: 5, l: 3, ml: 0, label: "5f₀", symbol: "5f_z3" },
  { n: 5, l: 3, ml: 1, label: "5f₊₁", symbol: "5f_yz2" },
  { n: 5, l: 3, ml: 2, label: "5f₊₂", symbol: "5f_y3" },
  { n: 5, l: 3, ml: 3, label: "5f₊₃", symbol: "5f_xyz" },
  { n: 5, l: 4, ml: -4, label: "5g₋₄", symbol: "5g" },
  { n: 5, l: 4, ml: -3, label: "5g₋₃", symbol: "5g" },
  { n: 5, l: 4, ml: -2, label: "5g₋₂", symbol: "5g" },
  { n: 5, l: 4, ml: -1, label: "5g₋₁", symbol: "5g" },
  { n: 5, l: 4, ml: 0, label: "5g₀", symbol: "5g" },
  { n: 5, l: 4, ml: 1, label: "5g₊₁", symbol: "5g" },
  { n: 5, l: 4, ml: 2, label: "5g₊₂", symbol: "5g" },
  { n: 5, l: 4, ml: 3, label: "5g₊₃", symbol: "5g" },
  { n: 5, l: 4, ml: 4, label: "5g₊₄", symbol: "5g" },
  { n: 6, l: 0, ml: 0, label: "6s", symbol: "6s" },
  { n: 6, l: 1, ml: -1, label: "6p₋₁", symbol: "6p_x" },
  { n: 6, l: 1, ml: 0, label: "6p₀", symbol: "6p_z" },
  { n: 6, l: 1, ml: 1, label: "6p₊₁", symbol: "6p_y" },
  { n: 6, l: 2, ml: -2, label: "6d₋₂", symbol: "6d_xy" },
  { n: 6, l: 2, ml: -1, label: "6d₋₁", symbol: "6d_xz" },
  { n: 6, l: 2, ml: 0, label: "6d₀", symbol: "6d_z2" },
  { n: 6, l: 2, ml: 1, label: "6d₊₁", symbol: "6d_yz" },
  { n: 6, l: 2, ml: 2, label: "6d₊₂", symbol: "6d_x2y2" },
  { n: 6, l: 3, ml: -3, label: "6f₋₃", symbol: "6f_x3" },
  { n: 6, l: 3, ml: -2, label: "6f₋₂", symbol: "6f_x2y" },
  { n: 6, l: 3, ml: -1, label: "6f₋₁", symbol: "6f_xz2" },
  { n: 6, l: 3, ml: 0, label: "6f₀", symbol: "6f_z3" },
  { n: 6, l: 3, ml: 1, label: "6f₊₁", symbol: "6f_yz2" },
  { n: 6, l: 3, ml: 2, label: "6f₊₂", symbol: "6f_y3" },
  { n: 6, l: 3, ml: 3, label: "6f₊₃", symbol: "6f_xyz" },
  { n: 6, l: 4, ml: -4, label: "6g₋₄", symbol: "6g" },
  { n: 6, l: 4, ml: 0, label: "6g₀", symbol: "6g" },
  { n: 6, l: 4, ml: 4, label: "6g₊₄", symbol: "6g" },
  { n: 6, l: 5, ml: -5, label: "6h₋₅", symbol: "6h" },
  { n: 6, l: 5, ml: 0, label: "6h₀", symbol: "6h" },
  { n: 6, l: 5, ml: 5, label: "6h₊₅", symbol: "6h" },
] as const;

type OrbitalDef = (typeof ORBITALS)[number];

// ─── Maths: hydrogen wavefunctions ────────────────────────────────────────────
const a0 = 1; // Bohr radius units

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function assocLaguerre(n: number, alpha: number, x: number): number {
  if (n === 0) return 1;
  if (n === 1) return 1 + alpha - x;
  let L0 = 1;
  let L1 = 1 + alpha - x;
  for (let k = 2; k <= n; k++) {
    const L2 = ((2 * k - 1 + alpha - x) * L1 - (k - 1 + alpha) * L0) / k;
    L0 = L1;
    L1 = L2;
  }
  return L1;
}

function assocLegendre(l: number, m: number, x: number): number {
  const absM = Math.abs(m);
  let pmm = 1.0;
  if (absM > 0) {
    const somx2 = Math.sqrt((1.0 - x) * (1.0 + x));
    let fact = 1.0;
    for (let i = 1; i <= absM; i++) {
      pmm *= -fact * somx2;
      fact += 2.0;
    }
  }
  if (l === absM) return pmm;
  let pmmp1 = x * (2 * absM + 1) * pmm;
  if (l === absM + 1) return pmmp1;
  let pll = 0;
  for (let ll = absM + 2; ll <= l; ll++) {
    pll = (x * (2 * ll - 1) * pmmp1 - (ll + absM - 1) * pmm) / (ll - absM);
    pmm = pmmp1;
    pmmp1 = pll;
  }
  return pll;
}

function sphericalHarmonicY(
  l: number,
  m: number,
  theta: number,
  phi: number,
): [number, number] {
  const absM = Math.abs(m);
  const norm = Math.sqrt(
    ((2 * l + 1) / (4 * Math.PI)) * (factorial(l - absM) / factorial(l + absM)),
  );
  const P = assocLegendre(l, absM, Math.cos(theta));
  const re = norm * P * Math.cos(m * phi);
  const im = norm * P * Math.sin(m * phi);
  if (m < 0) {
    const s = m % 2 === 0 ? 1 : -1;
    return [s * re, s * im];
  }
  return [re, im];
}

function radialWavefunction(n: number, l: number, r: number): number {
  const rho = (2 * r) / (n * a0);
  const normFactor = Math.sqrt(
    ((2 / (n * a0)) ** 3 * factorial(n - l - 1)) /
      (2 * n * factorial(n + l) ** 3),
  );
  const laguerre = assocLaguerre(n - l - 1, 2 * l + 1, rho);
  return normFactor * Math.exp(-rho / 2) * rho ** l * laguerre;
}

function wavefunction(
  n: number,
  l: number,
  ml: number,
  r: number,
  theta: number,
  phi: number,
): [number, number] {
  const R = radialWavefunction(n, l, r);
  const [Yre, Yim] = sphericalHarmonicY(l, ml, theta, phi);
  return [R * Yre, R * Yim];
}

function probabilityDensity(
  n: number,
  l: number,
  ml: number,
  x: number,
  y: number,
  z: number,
): number {
  const r = Math.sqrt(x * x + y * y + z * z);
  if (r < 1e-10) return 0;
  const theta = Math.acos(z / r);
  const phi = Math.atan2(y, x);
  const [re, im] = wavefunction(n, l, ml, r, theta, phi);
  return re * re + im * im;
}

// ─── Plasma colormap ──────────────────────────────────────────────────────────
function plasmaColor(t: number): [number, number, number] {
  const clamp = Math.min(1, Math.max(0, t));
  // Approximate matplotlib plasma: dark purple → magenta → orange → yellow-white
  const r = Math.min(1, 0.05 + clamp * 2.2 - 0.8 * clamp * clamp);
  const g = Math.min(1, Math.max(0, -0.1 + clamp * 1.1));
  const b = Math.min(1, Math.max(0, 0.55 - clamp * 0.6 + 0.2 * clamp * clamp));
  return [r, g, b];
}

// biome-ignore lint/correctness/noUnusedVariables: reserved for future phase-color overlay
function phaseColor(phase: number, alpha: number): [number, number, number] {
  const hue = ((phase / (2 * Math.PI)) * 360 + 360) % 360;
  const s = 0.9;
  const v = 0.5 + 0.5 * alpha;
  // HSV to RGB
  const c = v * s;
  const x2 = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m2 = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hue < 60) {
    r = c;
    g = x2;
  } else if (hue < 120) {
    r = x2;
    g = c;
  } else if (hue < 180) {
    g = c;
    b = x2;
  } else if (hue < 240) {
    g = x2;
    b = c;
  } else if (hue < 300) {
    r = x2;
    b = c;
  } else {
    r = c;
    b = x2;
  }
  return [r + m2, g + m2, b + m2];
}

// ─── Radial probability distribution data ────────────────────────────────────
function buildRadialData(n: number, l: number) {
  const points: { r: number; prob: number }[] = [];
  const maxR = (n + 2) * n * 3;
  for (let i = 0; i <= 400; i++) {
    const r = (i / 400) * maxR;
    const R = radialWavefunction(n, l, r);
    points.push({ r: Number.parseFloat(r.toFixed(2)), prob: R * R * r * r });
  }
  return points;
}

function mostProbableRadius(n: number, l: number): number {
  const data = buildRadialData(n, l);
  let maxProb = 0;
  let maxR = 0;
  for (const pt of data) {
    if (pt.prob > maxProb) {
      maxProb = pt.prob;
      maxR = pt.r;
    }
  }
  return maxR;
}

// ─── Angular polar data ────────────────────────────────────────────────────────
function buildAngularData(l: number, ml: number) {
  const points: { angle: number; prob: number; x: number; y: number }[] = [];
  for (let i = 0; i <= 360; i++) {
    const theta = (i * Math.PI) / 180;
    const [re, im] = sphericalHarmonicY(l, ml, theta, 0);
    const prob = re * re + im * im;
    const r = Math.sqrt(prob) * 80;
    points.push({
      angle: i,
      prob: Number.parseFloat(prob.toFixed(5)),
      x: Number.parseFloat((r * Math.sin(theta)).toFixed(3)),
      y: Number.parseFloat((r * Math.cos(theta)).toFixed(3)),
    });
  }
  return points;
}

// ─── Superposition data ───────────────────────────────────────────────────────
function buildSuperpositionData(time: number) {
  const E1 = -13.6; // eV
  const E2 = -13.6 / 4;
  const omega = (E2 - E1) * 0.1; // scaled for animation
  const points: { r: number; re: number; im: number; density: number }[] = [];
  for (let i = 0; i <= 200; i++) {
    const r = (i / 200) * 20;
    const theta = Math.PI / 2;
    const phi = 0;
    const R1 = radialWavefunction(1, 0, r);
    const R2 = radialWavefunction(2, 1, r);
    const [Y1r] = sphericalHarmonicY(0, 0, theta, phi);
    const [Y2r, Y2i] = sphericalHarmonicY(1, 0, theta, phi);
    // 1/√2 (ψ₁s e^{-iE₁t/ℏ} + ψ₂p e^{-iE₂t/ℏ})
    const phase1 = 1 * time;
    const phase2 = omega * time;
    const re1 = (R1 * Y1r * Math.cos(phase1)) / Math.SQRT2;
    const im1 = (-R1 * Y1r * Math.sin(phase1)) / Math.SQRT2;
    const re2 =
      (R2 * Y2r * Math.cos(phase2) - R2 * Y2i * Math.sin(phase2)) / Math.SQRT2;
    const im2 =
      (R2 * Y2r * Math.sin(phase2) + R2 * Y2i * Math.cos(phase2)) / Math.SQRT2;
    const reTot = re1 + re2;
    const imTot = im1 + im2;
    points.push({
      r: Number.parseFloat(r.toFixed(2)),
      re: Number.parseFloat(reTot.toFixed(5)),
      im: Number.parseFloat(imTot.toFixed(5)),
      density: Number.parseFloat((reTot ** 2 + imTot ** 2).toFixed(5)),
    });
  }
  return points;
}

// ─── Three.js hook ─────────────────────────────────────────────────────────────
function useQuantumScene(
  containerRef: React.RefObject<HTMLDivElement>,
  orbital: OrbitalDef,
  showSlice: "none" | "xy" | "xz" | "yz",
  showPhase: boolean,
  phaseTime: number,
) {
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    points: THREE.Points;
    sliceMesh: THREE.Mesh | null;
    animId: number;
  } | null>(null);

  const buildPoints = useCallback(
    (
      n: number,
      l: number,
      ml: number,
      showPhase: boolean,
      phaseTime: number,
    ) => {
      const numPoints = 22000;
      const positions = new Float32Array(numPoints * 3);
      const colors = new Float32Array(numPoints * 3);
      const sizes = new Float32Array(numPoints);

      // Sample max probability for normalisation
      let maxProb = 0;
      const spread = Math.max(8, n * n * 5);
      const sampledPositions: [number, number, number][] = [];
      const sampledProbs: number[] = [];

      for (let i = 0; i < numPoints * 8; i++) {
        const x = (Math.random() - 0.5) * 2 * spread;
        const y = (Math.random() - 0.5) * 2 * spread;
        const z = (Math.random() - 0.5) * 2 * spread;
        const p = probabilityDensity(n, l, ml, x, y, z);
        sampledPositions.push([x, y, z]);
        sampledProbs.push(p);
        if (p > maxProb) maxProb = p;
      }

      // Rejection sampling — keep high-probability points
      let kept = 0;
      for (let i = 0; i < sampledPositions.length && kept < numPoints; i++) {
        const accept = sampledProbs[i] / (maxProb + 1e-30);
        if (Math.random() < accept * 4) {
          const [x, y, z] = sampledPositions[i];
          positions[kept * 3] = x;
          positions[kept * 3 + 1] = y;
          positions[kept * 3 + 2] = z;

          if (showPhase) {
            const r = Math.sqrt(x * x + y * y + z * z);
            const theta = Math.acos(z / Math.max(r, 1e-10));
            const phi = Math.atan2(y, x);
            const [re, im] = wavefunction(n, l, ml, r, theta, phi);
            const phase = Math.atan2(im, re) + phaseTime;
            const amp = Math.sqrt(re * re + im * im) / (maxProb + 1e-30) ** 0.5;
            // Positive lobe = bright blue (#60a5fa), negative lobe = bright red (#f87171)
            const sign = Math.cos(phase) >= 0 ? 1 : -1;
            const intensity = Math.min(1, amp * 2.5);
            const cr =
              sign >= 0 ? 0.376 + 0.624 * intensity : 0.973 * intensity;
            const cg =
              sign >= 0 ? 0.647 + 0.353 * intensity : 0.443 * intensity;
            const cb = sign >= 0 ? 0.98 : 0.443 * intensity;
            colors[kept * 3] = cr;
            colors[kept * 3 + 1] = cg;
            colors[kept * 3 + 2] = cb;
          } else {
            const t = Math.min(1, (sampledProbs[i] / maxProb) ** 0.35);
            const [cr, cg, cb] = plasmaColor(t);
            colors[kept * 3] = cr;
            colors[kept * 3 + 1] = cg;
            colors[kept * 3 + 2] = cb;
          }

          sizes[kept] = 0.15 + 0.4 * (sampledProbs[i] / (maxProb + 1e-30));
          kept++;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions.slice(0, kept * 3), 3),
      );
      geo.setAttribute(
        "color",
        new THREE.BufferAttribute(colors.slice(0, kept * 3), 3),
      );
      geo.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes.slice(0, kept), 1),
      );
      return geo;
    },
    [],
  );

  const buildSlice = useCallback(
    (n: number, l: number, ml: number, plane: "xy" | "xz" | "yz") => {
      const res = 128;
      const spread = Math.max(10, n * n * 6);
      const data = new Uint8Array(res * res * 4);
      let maxP = 0;
      const probs: number[] = [];
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          const u = ((i / res) * 2 - 1) * spread;
          const v = ((j / res) * 2 - 1) * spread;
          let x = 0;
          let y = 0;
          let z = 0;
          if (plane === "xy") {
            x = u;
            y = v;
            z = 0;
          } else if (plane === "xz") {
            x = u;
            y = 0;
            z = v;
          } else {
            x = 0;
            y = u;
            z = v;
          }
          const p = probabilityDensity(n, l, ml, x, y, z);
          probs.push(p);
          if (p > maxP) maxP = p;
        }
      }
      for (let k = 0; k < probs.length; k++) {
        const t = Math.min(1, (probs[k] / (maxP + 1e-30)) ** 0.4);
        const [r, g, b] = plasmaColor(t);
        data[k * 4] = r * 255;
        data[k * 4 + 1] = g * 255;
        data[k * 4 + 2] = b * 255;
        data[k * 4 + 3] = t > 0.02 ? 180 : 0;
      }
      const tex = new THREE.DataTexture(data, res, res, THREE.RGBAFormat);
      tex.needsUpdate = true;
      const geo = new THREE.PlaneGeometry(spread * 2, spread * 2);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      if (plane === "xz") mesh.rotation.x = Math.PI / 2;
      if (plane === "yz") mesh.rotation.y = Math.PI / 2;
      return mesh;
    },
    [],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Three.js scene setup — containerRef.current is stable after mount; buildPoints/buildSlice are stable useCallback refs
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth || 600;
    const h = el.clientHeight || 480;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x050510, 1);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
    camera.position.set(0, 0, orbital.n * orbital.n * 6 + 10);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    // Ambient glow
    const ambientLight = new THREE.AmbientLight(0x2222ff, 0.3);
    scene.add(ambientLight);

    // Axis lines
    const axisLen = orbital.n * orbital.n * 5 + 4;
    const axisMat = new THREE.LineBasicMaterial({
      color: 0x334466,
      opacity: 0.5,
      transparent: true,
    });
    for (const [ax, ay, az] of [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-ax * axisLen, -ay * axisLen, -az * axisLen),
        new THREE.Vector3(ax * axisLen, ay * axisLen, az * axisLen),
      ]);
      scene.add(new THREE.Line(geo, axisMat));
    }

    // Points
    const geo = buildPoints(
      orbital.n,
      orbital.l,
      orbital.ml,
      showPhase,
      phaseTime,
    );
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    // Slice
    let sliceMesh: THREE.Mesh | null = null;
    if (showSlice !== "none") {
      sliceMesh = buildSlice(orbital.n, orbital.l, orbital.ml, showSlice);
      scene.add(sliceMesh);
    }

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!el) return;
      const w2 = el.clientWidth;
      const h2 = el.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener("resize", handleResize);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      controls,
      points: pts,
      sliceMesh,
      animId,
    };

    return () => {
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      window.removeEventListener("resize", handleResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orbital, showSlice, showPhase, phaseTime]);

  const exportPNG = useCallback(() => {
    if (!sceneRef.current) return;
    const { renderer, scene, camera } = sceneRef.current;
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `orbital-${orbital.label}-quantum-visualizer.png`;
    a.click();
  }, [orbital.label]);

  return { exportPNG };
}

// ─── Orbital selector card ─────────────────────────────────────────────────────
const N_COLORS: Record<number, string> = {
  1: "text-cyan-400",
  2: "text-violet-400",
  3: "text-emerald-400",
  4: "text-amber-400",
  5: "text-rose-400",
  6: "text-sky-400",
};

function OrbitalCard({
  orbital,
  selected,
  onClick,
}: {
  orbital: OrbitalDef;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`quantum.orbital.${orbital.symbol}`}
      className={cn(
        "relative rounded-lg border px-3 py-2 text-center text-sm font-mono transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-primary bg-primary/20 shadow-lg shadow-primary/30 scale-105"
          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
      )}
    >
      <span
        className={cn("font-bold", N_COLORS[orbital.n] ?? "text-foreground")}
      >
        {orbital.label}
      </span>
      {selected && (
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
      )}
    </button>
  );
}

// ─── Quantum number display ────────────────────────────────────────────────────
function QuantumPanel({ orbital }: { orbital: OrbitalDef }) {
  const energy = -13.6 / (orbital.n * orbital.n);
  const L = Math.sqrt(orbital.l * (orbital.l + 1));
  const degeneracy = 2 * orbital.l + 1;
  const rows = [
    ["n (principal)", String(orbital.n)],
    ["ℓ (azimuthal)", String(orbital.l)],
    ["mₗ (magnetic)", String(orbital.ml)],
    ["Energy", `${energy.toFixed(3)} eV`],
    ["|L| (ang. momentum)", `${L.toFixed(3)} ℏ`],
    ["Degeneracy (2ℓ+1)", String(degeneracy)],
    ["Orbital name", orbital.symbol],
  ];
  return (
    <div className="rounded-xl border border-border bg-card/70 p-4 backdrop-blur-sm">
      <h3 className="mb-3 font-display text-base font-semibold text-foreground">
        Quantum Numbers
      </h3>
      <div className="mb-3 text-center">
        <span
          className={cn(
            "text-2xl font-bold font-display",
            N_COLORS[orbital.n] ?? "text-foreground",
          )}
        >
          {orbital.label}
        </span>
      </div>
      <dl className="space-y-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-2">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="font-mono text-sm font-semibold text-primary">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ─── Polar SVG plot ────────────────────────────────────────────────────────────
function PolarPlot({ l, ml }: { l: number; ml: number }) {
  const data = useMemo(() => buildAngularData(l, ml), [l, ml]);
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const pathD = `${data.reduce((acc, pt, i) => {
    const cmd = i === 0 ? "M" : "L";
    return `${acc} ${cmd} ${cx + pt.x} ${cy - pt.y}`;
  }, "")} Z`;
  return (
    <svg
      width={size}
      height={size}
      className="mx-auto"
      role="img"
      aria-label="Angular probability distribution"
    >
      <title>Angular Probability |Yₗₘ(θ,φ)|²</title>
      <circle
        cx={cx}
        cy={cy}
        r={cx - 4}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
      />
      {[0.25, 0.5, 0.75].map((f) => (
        <circle
          key={f}
          cx={cx}
          cy={cy}
          r={(cx - 4) * f}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.3"
          opacity="0.4"
        />
      ))}
      <line
        x1={cx}
        y1={4}
        x2={cx}
        y2={size - 4}
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
      />
      <line
        x1={4}
        y1={cy}
        x2={size - 4}
        y2={cy}
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
      />
      <path
        d={pathD}
        fill="oklch(0.7 0.2 280 / 0.4)"
        stroke="oklch(0.8 0.25 280)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ─── Wavefunction equation display ───────────────────────────────────────────
function OrbitalEquation({ n, l, ml }: { n: number; l: number; ml: number }) {
  if (n === 1 && l === 0) {
    return (
      <EquationBlock
        latex="\\psi_{1s} = \\frac{1}{\\sqrt{\\pi}} \\left(\\frac{1}{a_0}\\right)^{3/2} e^{-r/a_0}"
        annotation="Ground state hydrogen wavefunction. Spherically symmetric, no nodes."
        label="1s Wavefunction"
      />
    );
  }
  if (n === 2 && l === 0) {
    return (
      <EquationBlock
        latex="\\psi_{2s} = \\frac{1}{4\\sqrt{2\\pi}} \\left(\\frac{1}{a_0}\\right)^{3/2} \\left(2 - \\frac{r}{a_0}\\right) e^{-r/2a_0}"
        annotation="First excited s-state. One radial node at r = 2a₀."
        label="2s Wavefunction"
      />
    );
  }
  if (n === 2 && l === 1 && ml === 0) {
    return (
      <EquationBlock
        latex="\\psi_{2p_0} = \\frac{1}{4\\sqrt{2\\pi}} \\left(\\frac{1}{a_0}\\right)^{3/2} \\frac{r}{a_0} e^{-r/2a_0} \\cos\\theta"
        annotation="2p_z orbital. Dumbbell shape aligned along z-axis."
        label="2p₀ Wavefunction"
      />
    );
  }
  if (n === 3 && l === 0) {
    return (
      <EquationBlock
        latex="\\psi_{3s} = \\frac{1}{81\\sqrt{3\\pi}} \\left(\\frac{1}{a_0}\\right)^{3/2} \\left(27 - 18\\frac{r}{a_0} + 2\\frac{r^2}{a_0^2}\\right) e^{-r/3a_0}"
        annotation="3s orbital with two radial nodes."
        label="3s Wavefunction"
      />
    );
  }
  return (
    <EquationBlock
      latex={`\\psi_${n}${["s", "p", "d", "f", "g", "h"][l]} = R_${n}${l}(r) \\cdot Y_${l}^{${ml}}(\\theta,\\phi)`}
      annotation={`General hydrogen wavefunction for n=${n}, ℓ=${l}, mₗ=${ml}. Separates into radial and angular components.`}
      label={`${n}${["s", "p", "d", "f", "g", "h"][l]} Wavefunction`}
    />
  );
}

// ─── Energy Level Diagram ──────────────────────────────────────────────────────
function EnergyLevelDiagram({
  showAllTransitions,
  onToggle,
}: { showAllTransitions: boolean; onToggle: () => void }) {
  const levels = useMemo(() => {
    const ls: { n: number; energy: number; y: number }[] = [];
    for (let n = 1; n <= 6; n++) {
      ls.push({ n, energy: -13.6 / (n * n), y: 100 - (n - 1) * 14 });
    }
    return ls;
  }, []);

  const transitions = useMemo(() => {
    const t: {
      from: number;
      to: number;
      series: string;
      wavelength: number;
    }[] = [];
    for (let n = 2; n <= 6; n++) {
      const eV = 13.6 * (1 - 1 / (n * n));
      const nm = 1240 / eV;
      t.push({ from: n, to: 1, series: "Lyman", wavelength: nm });
    }
    for (let n = 3; n <= 6; n++) {
      const eV = 13.6 * (1 / 4 - 1 / (n * n));
      const nm = 1240 / eV;
      t.push({ from: n, to: 2, series: "Balmer", wavelength: nm });
    }
    for (let n = 4; n <= 6; n++) {
      const eV = 13.6 * (1 / 9 - 1 / (n * n));
      const nm = 1240 / eV;
      t.push({ from: n, to: 3, series: "Paschen", wavelength: nm });
    }
    return t;
  }, []);

  const seriesColors: Record<string, string> = {
    Lyman: "#60a5fa",
    Balmer: "#34d399",
    Paschen: "#fbbf24",
  };

  return (
    <div className="rounded-xl border border-border bg-card/70 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">
          Energy Levels (n = 1–6)
        </h3>
        <Button
          type="button"
          size="sm"
          variant={showAllTransitions ? "default" : "outline"}
          onClick={onToggle}
          className="h-6 px-2 text-xs"
        >
          {showAllTransitions ? "Hide Transitions" : "Show All Transitions"}
        </Button>
      </div>
      <svg
        viewBox="0 0 320 120"
        className="w-full h-auto"
        role="img"
        aria-label="Energy level diagram for n equals 1 through 6"
      >
        {/* Level lines */}
        {levels.map((lv) => (
          <g key={lv.n}>
            <line
              x1={40}
              y1={lv.y}
              x2={280}
              y2={lv.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            <text
              x={30}
              y={lv.y + 3}
              textAnchor="end"
              fill="hsl(var(--muted-foreground))"
              fontSize="9"
              fontFamily="monospace"
            >
              n={lv.n}
            </text>
            <text
              x={285}
              y={lv.y + 3}
              textAnchor="start"
              fill="hsl(var(--muted-foreground))"
              fontSize="8"
              fontFamily="monospace"
            >
              {lv.energy.toFixed(2)} eV
            </text>
          </g>
        ))}
        {/* Transition arrows */}
        {showAllTransitions &&
          transitions.map((tr, i) => {
            const fromY = levels.find((l) => l.n === tr.from)?.y ?? 0;
            const toY = levels.find((l) => l.n === tr.to)?.y ?? 0;
            const midX = 160 + ((i % 3) - 1) * 30;
            return (
              <g key={`${tr.from}-${tr.to}-${i}`}>
                <line
                  x1={midX}
                  y1={fromY}
                  x2={midX}
                  y2={toY + 2}
                  stroke={seriesColors[tr.series]}
                  strokeWidth="1"
                  markerEnd="url(#arrowhead)"
                  opacity="0.7"
                />
                <text
                  x={midX + 4}
                  y={(fromY + toY) / 2}
                  fill={seriesColors[tr.series]}
                  fontSize="7"
                  fontFamily="monospace"
                >
                  {tr.wavelength.toFixed(0)} nm
                </text>
              </g>
            );
          })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="4"
            refX="0"
            refY="2"
            orient="auto"
          >
            <polygon points="0 0, 6 2, 0 4" fill="#60a5fa" />
          </marker>
        </defs>
      </svg>
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-blue-400" /> Lyman (UV)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-emerald-400" /> Balmer
          (Vis)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-amber-400" /> Paschen (IR)
        </span>
      </div>
    </div>
  );
}

// ─── Orbital Comparison Panel ──────────────────────────────────────────────────
function OrbitalComparisonPanel({
  compareSet,
  onSetChange,
  onSelectOrbital,
}: {
  compareSet: "basics" | "n3" | "n4" | "n5";
  onSetChange: (s: "basics" | "n3" | "n4" | "n5") => void;
  onSelectOrbital: (o: OrbitalDef) => void;
}) {
  const presets: Record<string, OrbitalDef[]> = {
    basics: ORBITALS.filter(
      (o) =>
        o.symbol === "1s" ||
        o.symbol === "2s" ||
        o.symbol === "2p_z" ||
        o.symbol === "3d_z2",
    ),
    n3: ORBITALS.filter((o) => o.n === 3),
    n4: ORBITALS.filter((o) => o.n === 4),
    n5: ORBITALS.filter((o) => o.n === 5),
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="mt-6 rounded-xl border border-border bg-card p-5"
      data-ocid="quantum.comparison.panel"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Compare Orbitals
        </h2>
        <div className="flex gap-1.5">
          {(["basics", "n3", "n4", "n5"] as const).map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              variant={compareSet === s ? "default" : "outline"}
              onClick={() => onSetChange(s)}
              className="h-7 px-2.5 text-xs"
            >
              {s === "basics" ? "1s,2s,2p,3d" : `n=${s.slice(1)}`}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {presets[compareSet].map((orbital) => (
          <button
            key={orbital.symbol}
            type="button"
            onClick={() => onSelectOrbital(orbital)}
            className="rounded-lg border border-border bg-background p-3 text-center hover:border-primary/50 hover:bg-primary/5 transition-all"
            data-ocid={`quantum.compare.${orbital.symbol}`}
          >
            <MiniSlicePreview orbital={orbital} />
            <p className="mt-2 text-sm font-mono font-semibold text-foreground">
              {orbital.label}
            </p>
            <p className="text-xs text-muted-foreground">
              n={orbital.n}, ℓ={orbital.l}, m={orbital.ml}
            </p>
          </button>
        ))}
      </div>
    </motion.section>
  );
}

function MiniSlicePreview({ orbital }: { orbital: OrbitalDef }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const spread = Math.max(8, orbital.n * orbital.n * 4);
    const imageData = ctx.createImageData(size, size);
    let maxP = 0;
    const probs: number[] = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = ((i / size) * 2 - 1) * spread;
        const z = ((j / size) * 2 - 1) * spread;
        const p = probabilityDensity(orbital.n, orbital.l, orbital.ml, x, 0, z);
        probs.push(p);
        if (p > maxP) maxP = p;
      }
    }
    for (let k = 0; k < probs.length; k++) {
      const t = Math.min(1, (probs[k] / (maxP + 1e-30)) ** 0.4);
      const [r, g, b] = plasmaColor(t);
      imageData.data[k * 4] = r * 255;
      imageData.data[k * 4 + 1] = g * 255;
      imageData.data[k * 4 + 2] = b * 255;
      imageData.data[k * 4 + 3] = t > 0.02 ? 220 : 0;
    }
    ctx.putImageData(imageData, 0, 0);
  }, [orbital]);
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-md"
      style={{ imageRendering: "auto" }}
    />
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function QuantumVisualizer() {
  const [selectedOrbital, setSelectedOrbital] = useState<OrbitalDef>(
    ORBITALS[0],
  );
  const [showSlice, setShowSlice] = useState<"none" | "xy" | "xz" | "yz">(
    "none",
  );
  const [showPhase, setShowPhase] = useState(false);
  const [phaseTime, setPhaseTime] = useState(0);
  const [superTime, setSuperTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1.0);
  const [superpositionPlaying, setSuperpositionPlaying] = useState(false);
  const [showAllTransitions, setShowAllTransitions] = useState(false);
  const [compareSet, setCompareSet] = useState<"basics" | "n3" | "n4" | "n5">(
    "basics",
  );
  const animRef = useRef<number>(0);
  const superAnimRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null!);

  const { exportPNG } = useQuantumScene(
    containerRef,
    selectedOrbital,
    showSlice,
    showPhase,
    phaseTime,
  );

  // Phase animation loop
  useEffect(() => {
    if (isAnimating) {
      const tick = () => {
        setPhaseTime((t) => t + 0.03);
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(animRef.current);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isAnimating]);

  // Superposition time evolution loop
  useEffect(() => {
    if (superpositionPlaying) {
      const tick = () => {
        setSuperTime((t) => t + 0.03);
        superAnimRef.current = requestAnimationFrame(tick);
      };
      superAnimRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(superAnimRef.current);
    }
    return () => cancelAnimationFrame(superAnimRef.current);
  }, [superpositionPlaying]);

  const radialData = useMemo(
    () => buildRadialData(selectedOrbital.n, selectedOrbital.l),
    [selectedOrbital.n, selectedOrbital.l],
  );
  const mostProbR = useMemo(
    () => mostProbableRadius(selectedOrbital.n, selectedOrbital.l),
    [selectedOrbital.n, selectedOrbital.l],
  );
  const superData = useMemo(
    () => buildSuperpositionData(superTime),
    [superTime],
  );

  const superpositionFrequency = useMemo(() => {
    const E1 = -13.6;
    const E2 = -13.6 / 4;
    const deltaE = Math.abs(E2 - E1); // eV
    const h = 4.135667696e-15; // eV·s
    return deltaE / h; // Hz
  }, []);

  const orbitalsByN = useMemo(() => {
    const groups: Record<number, OrbitalDef[]> = {};
    for (const o of ORBITALS) {
      if (!groups[o.n]) groups[o.n] = [];
      groups[o.n].push(o);
    }
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <PageHeader
          title="Quantum Mechanics Visualizer"
          subtitle="Explore hydrogen atomic orbitals with interactive 3D probability density clouds, wavefunction phase animations, and spectroscopic analysis."
          audienceLevel="advanced"
        />

        {/* Orbital selector */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded-xl border border-border bg-card p-5"
          data-ocid="quantum.orbital_selector.panel"
        >
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Select Orbital
          </h2>
          {Object.entries(orbitalsByN).map(([n, orbs]) => (
            <div key={n} className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                n = {n} shell
              </p>
              <div className="flex flex-wrap gap-2">
                {orbs.map((o) => (
                  <OrbitalCard
                    key={o.symbol}
                    orbital={o}
                    selected={selectedOrbital.symbol === o.symbol}
                    onClick={() => setSelectedOrbital(o)}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Main layout: 3D canvas + side panel */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-border bg-[#050510] overflow-hidden">
              {/* Canvas toolbar */}
              <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card/50 px-4 py-2.5">
                <Badge
                  variant="outline"
                  className="font-mono text-primary border-primary/40"
                >
                  {selectedOrbital.label}
                </Badge>
                <div className="flex gap-1.5 ml-auto flex-wrap items-center">
                  {(["none", "xy", "xz", "yz"] as const).map((plane) => (
                    <Button
                      key={plane}
                      type="button"
                      size="sm"
                      variant={showSlice === plane ? "default" : "outline"}
                      onClick={() => setShowSlice(plane)}
                      data-ocid={`quantum.slice.${plane}`}
                      className="h-7 px-2.5 text-xs"
                    >
                      {plane === "none"
                        ? "No Slice"
                        : `${plane.toUpperCase()} Slice`}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant={showPhase ? "default" : "outline"}
                    onClick={() => setShowPhase((v) => !v)}
                    data-ocid="quantum.phase.toggle"
                    className="h-7 px-2.5 text-xs"
                  >
                    {showPhase ? "Phase ✓" : "Phase"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={isAnimating ? "default" : "outline"}
                    onClick={() => setIsAnimating((v) => !v)}
                    data-ocid="quantum.animate.toggle"
                    className="h-7 px-2.5 text-xs"
                  >
                    {isAnimating ? "■ Stop" : "▶ Animate"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={exportPNG}
                    data-ocid="quantum.export.button"
                    className="h-7 px-2.5 text-xs"
                  >
                    ⬇ PNG
                  </Button>
                </div>
                {/* Glow intensity slider */}
                <div className="w-full flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    Glow Intensity
                  </span>
                  <Slider
                    min={0.2}
                    max={3.0}
                    step={0.1}
                    value={[glowIntensity]}
                    onValueChange={([v]) => setGlowIntensity(v)}
                    data-ocid="quantum.glow_intensity.input"
                    className="flex-1"
                  />
                  <span className="text-xs font-mono text-primary w-8 text-right">
                    {glowIntensity.toFixed(1)}x
                  </span>
                </div>
              </div>
              {/* Three.js mount */}
              <div
                ref={containerRef}
                className="h-[480px] w-full cursor-grab active:cursor-grabbing"
                data-ocid="quantum.canvas_target"
                aria-label={`3D probability density cloud for the ${selectedOrbital.label} orbital`}
                role="img"
              />
              {/* Phase time slider */}
              {showPhase && (
                <div className="border-t border-border bg-card/30 px-4 py-3">
                  <p className="mb-2 text-xs text-muted-foreground">
                    Phase time: ωt = {(phaseTime % (2 * Math.PI)).toFixed(2)}{" "}
                    rad
                  </p>
                  <Slider
                    min={0}
                    max={6.28}
                    step={0.05}
                    value={[phaseTime % (2 * Math.PI)]}
                    onValueChange={([v]) => setPhaseTime(v)}
                    data-ocid="quantum.phase_time.input"
                    className="w-full"
                  />
                </div>
              )}
              {/* Wavefunction formula display */}
              <div className="border-t border-border bg-card/30 px-4 py-3">
                <p className="mb-1 text-xs font-semibold text-foreground">
                  Wavefunction
                </p>
                <div className="text-sm">
                  <OrbitalEquation
                    n={selectedOrbital.n}
                    l={selectedOrbital.l}
                    ml={selectedOrbital.ml}
                  />
                </div>
              </div>
              <p className="px-4 pb-2 pt-1 text-xs text-muted-foreground/60">
                Drag to orbit · Scroll to zoom · Right-drag to pan
              </p>
            </div>
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <QuantumPanel orbital={selectedOrbital} />

            {/* Colormap legend */}
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {showPhase ? "Phase Colormap" : "Probability Colormap (Plasma)"}
              </h3>
              {showPhase ? (
                <div className="space-y-1">
                  {[
                    ["0° (0 rad)", "bg-red-500"],
                    ["90° (π/2)", "bg-green-500"],
                    ["180° (π)", "bg-cyan-500"],
                    ["270° (3π/2)", "bg-purple-500"],
                  ].map(([label, cls]) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${cls}`} />
                      <span className="text-xs text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div
                    className="h-4 w-full rounded-sm"
                    style={{
                      background:
                        "linear-gradient(to right, #0d0221, #5f187f, #c23b8a, #f98c09, #f0f921)",
                    }}
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Low |ψ|²</span>
                    <span>High |ψ|²</span>
                  </div>
                </div>
              )}
            </div>

            {/* Angular polar plot */}
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                Angular Probability |Y_lm(θ,φ)|²
              </h3>
              <PolarPlot l={selectedOrbital.l} ml={selectedOrbital.ml} />
              <p className="mt-1 text-center text-xs text-muted-foreground">
                ℓ={selectedOrbital.l}, mₗ={selectedOrbital.ml}
              </p>
            </div>

            {/* Energy Level Diagram */}
            <EnergyLevelDiagram
              showAllTransitions={showAllTransitions}
              onToggle={() => setShowAllTransitions((v) => !v)}
            />
          </motion.div>
        </div>

        {/* Orbital Comparison Panel */}
        <OrbitalComparisonPanel
          compareSet={compareSet}
          onSetChange={setCompareSet}
          onSelectOrbital={setSelectedOrbital}
        />

        {/* Tabs: equations, radial, superposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6"
        >
          <Tabs defaultValue="radial" data-ocid="quantum.data_tabs">
            <TabsList className="mb-4 flex-wrap">
              <TabsTrigger value="radial" data-ocid="quantum.tab.radial">
                Radial Distribution
              </TabsTrigger>
              <TabsTrigger
                value="superposition"
                data-ocid="quantum.tab.superposition"
              >
                Time Evolution (1s+2p)
              </TabsTrigger>
              <TabsTrigger value="equations" data-ocid="quantum.tab.equations">
                Equations & Theory
              </TabsTrigger>
            </TabsList>

            {/* Radial probability */}
            <TabsContent value="radial">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-1 font-display text-base font-semibold text-foreground">
                  Radial Probability Distribution — {selectedOrbital.label}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  |R_nl(r)|² · r² vs r/a₀ — Most probable radius:{" "}
                  <span className="font-mono text-primary">
                    {mostProbR.toFixed(2)} a₀
                  </span>
                </p>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart
                    data={radialData}
                    margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="r"
                      label={{
                        value: "r / a₀",
                        position: "insideBottomRight",
                        offset: -8,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 11,
                      }}
                    />
                    <YAxis
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 11,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [v.toExponential(3), "|R|²r²"]}
                    />
                    <ReferenceLine
                      x={mostProbR}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="4 4"
                      label={{
                        value: `r_max=${mostProbR.toFixed(1)}`,
                        fill: "hsl(var(--primary))",
                        fontSize: 11,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="prob"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={false}
                      name="|R(r)|²·r²"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            {/* Time evolution / superposition */}
            <TabsContent value="superposition">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-1 font-display text-base font-semibold text-foreground">
                  Time-Dependent Schrödinger Equation — 1s + 2p Superposition
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  ψ(t) = c₁ψ₁ e^(-iE₁t/ℏ) + c₂ψ₂ e^(-iE₂t/ℏ) — beat frequency
                  visible as oscillating density
                </p>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={superpositionPlaying ? "default" : "outline"}
                    onClick={() => setSuperpositionPlaying((v) => !v)}
                    data-ocid="quantum.superposition.play_pause"
                  >
                    {superpositionPlaying ? "■ Pause" : "▶ Play"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setSuperTime(0)}
                    data-ocid="quantum.superposition.reset"
                  >
                    Reset
                  </Button>
                  <div className="ml-auto text-xs text-muted-foreground">
                    <span className="font-mono text-primary">
                      Δν = {superpositionFrequency.toExponential(2)} Hz
                    </span>
                    <span className="ml-2">(E₂−E₁)/h</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart
                    data={superData}
                    margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="r"
                      label={{
                        value: "r / a₀",
                        position: "insideBottomRight",
                        offset: -8,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 11,
                      }}
                    />
                    <YAxis
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 11,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="re"
                      stroke="#22d3ee"
                      strokeWidth={1.5}
                      dot={false}
                      name="Re(ψ)"
                    />
                    <Line
                      type="monotone"
                      dataKey="im"
                      stroke="#a855f7"
                      strokeWidth={1.5}
                      dot={false}
                      name="Im(ψ)"
                    />
                    <Line
                      type="monotone"
                      dataKey="density"
                      stroke="#f0f921"
                      strokeWidth={2}
                      dot={false}
                      name="|ψ|²"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            {/* Equations */}
            <TabsContent value="equations">
              <div className="space-y-4">
                <EquationBlock
                  latex="\\hat{H}\\psi = E\\psi, \\quad \\hat{H} = -\\frac{\\hbar^2}{2m}\\nabla^2 - \\frac{e^2}{4\\pi\\epsilon_0 r}"
                  annotation="Time-independent Schrödinger equation for the hydrogen atom. The Hamiltonian consists of the kinetic energy operator and the Coulomb potential."
                  label="Schrödinger Equation"
                />
                <EquationBlock
                  latex="\\psi_{nlm_l}(r,\\theta,\\phi) = R_{nl}(r) \\cdot Y_l^{m_l}(\\theta,\\phi)"
                  annotation="Hydrogen wavefunction separates into radial R_nl and angular Y_lm spherical harmonic components. n=principal, l=azimuthal, ml=magnetic quantum number."
                  label="Wavefunction (Spherical)"
                />
                <EquationBlock
                  latex="R_{nl}(r) = \\sqrt{\\left(\\frac{2}{na_0}\\right)^3 \\frac{(n-l-1)!}{2n[(n+l)!]^3}} e^{-r/na_0} \\left(\\frac{2r}{na_0}\\right)^l L_{n-l-1}^{2l+1}\\left(\\frac{2r}{na_0}\\right)"
                  annotation="Radial wavefunction involves associated Laguerre polynomials. The exponential factor ensures normalisation, and the polynomial determines the number of radial nodes (n-l-1)."
                  label="Radial Wavefunction"
                />
                <EquationBlock
                  latex="E_n = -\\frac{13.6\\text{ eV}}{n^2}, \\quad n = 1, 2, 3, \\ldots"
                  annotation="Hydrogen energy levels from Bohr model / quantum mechanics. Ground state (n=1) energy = −13.6 eV. Energy increases as n increases, converging to 0 at ionisation."
                  label="Energy Levels"
                />
                <EquationBlock
                  latex="P(r)\\,dr = |R_{nl}(r)|^2 r^2\\,dr"
                  annotation="Radial probability density. The r² factor accounts for the increasing volume of spherical shells. Peaks correspond to most-probable radii (Bohr radii for hydrogen)."
                  label="Radial Probability"
                />
                <EquationBlock
                  latex="\\Psi(\\mathbf{r}, t) = \\sum_n c_n \\psi_n(\\mathbf{r}) e^{-iE_n t/\\hbar}"
                  annotation="Time-dependent wavefunction as superposition of stationary states. Each state oscillates at its own frequency ω_n = E_n/ℏ. Superpositions create beating oscillations between energy levels."
                  label="Time Evolution"
                />
                <EquationBlock
                  latex="R_{10}(r) = 2\\left(\\frac{1}{a_0}\\right)^{3/2} e^{-r/a_0}"
                  annotation="Ground-state (n=1, l=0) radial wavefunction for hydrogen. Decays exponentially with the Bohr radius a₀ ≈ 0.529 Å as the characteristic length scale."
                  label="R₁₀ Radial Wavefunction"
                />
                <EquationBlock
                  latex="\\Delta l = \\pm 1, \\quad \\Delta m_l = 0, \\pm 1, \\quad \\Delta m_s = 0"
                  annotation="Electric dipole selection rules for allowed radiative transitions. Only transitions changing the azimuthal quantum number by ±1 carry significant oscillator strength; forbidden transitions are much weaker."
                  label="Selection Rules"
                />
                <EquationBlock
                  latex="\\langle r \\rangle_{1s} = \\frac{3a_0}{2} = 0.794\\,\\text{\\AA}"
                  annotation="Expectation value of the electron–nucleus distance in the 1s ground state. Slightly larger than the Bohr radius a₀ = 0.529 Å because the radial probability distribution is right-skewed."
                  label="Expectation Value ⟨r⟩₁s"
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
