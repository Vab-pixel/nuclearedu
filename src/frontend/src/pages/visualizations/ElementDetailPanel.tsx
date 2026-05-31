import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { ChemicalElement } from "@/data/elements";
import { type Nuclide, nuclides } from "@/data/nuclides";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useNavigate } from "@tanstack/react-router";
import katex from "katex";
import {
  Activity,
  Atom,
  BookOpen,
  Database,
  ExternalLink,
  FlaskConical,
  GitBranch,
  Scale,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type * as THREE from "three";
import "katex/dist/katex.min.css";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ElementDetailPanelProps {
  element: ChemicalElement;
  onClose: () => void;
  onCompare: (el: ChemicalElement) => void;
  expertMode?: boolean;
  currentTemperatureK?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAGIC_NUMBERS = new Set([2, 8, 20, 28, 50, 82, 126]);

const CATEGORY_COLORS: Record<string, string> = {
  "alkali-metal": "oklch(0.82 0.28 48)",
  "alkaline-earth": "oklch(0.78 0.22 48)",
  "transition-metal": "oklch(0.68 0.24 240)",
  "post-transition-metal": "oklch(0.75 0.18 240)",
  metalloid: "oklch(0.72 0.22 192)",
  nonmetal: "oklch(0.82 0.24 192)",
  halogen: "oklch(0.78 0.32 22)",
  "noble-gas": "oklch(0.75 0.24 286)",
  lanthanide: "oklch(0.78 0.26 326)",
  actinide: "oklch(0.72 0.28 18)",
  unknown: "oklch(0.5 0 0)",
};

const COSMIC_ORIGIN: Record<string, string> = {
  H: "Big Bang nucleosynthesis",
  He: "Big Bang nucleosynthesis",
  Li: "Big Bang nucleosynthesis",
  Be: "Cosmic ray spallation",
  B: "Cosmic ray spallation",
  C: "Stellar nucleosynthesis",
  N: "Stellar nucleosynthesis",
  O: "Stellar nucleosynthesis",
  Fe: "Supernovae",
  Ni: "Supernovae",
  U: "Neutron star mergers",
  Th: "Neutron star mergers",
  Au: "Neutron star mergers",
  Pt: "Neutron star mergers",
};

const BODY_ELEMENTS = new Set([
  "H",
  "O",
  "C",
  "N",
  "Ca",
  "P",
  "K",
  "S",
  "Na",
  "Cl",
  "Mg",
  "Fe",
  "F",
  "Zn",
  "Si",
  "Cu",
  "I",
  "Mn",
  "Se",
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatHalfLife(s: number | null): string {
  if (s === null) return "Stable";
  if (s > 1e20) return "Effectively stable";
  const units: [number, string][] = [
    [3.156e16, "Gyr"],
    [3.156e13, "Myr"],
    [3.156e10, "kyr"],
    [3.156e7, "yr"],
    [86400, "d"],
    [3600, "hr"],
    [60, "min"],
    [1, "s"],
    [1e-3, "ms"],
    [1e-6, "μs"],
    [1e-9, "ns"],
  ];
  for (const [div, label] of units) {
    if (s >= div) return `${(s / div).toPrecision(4)} ${label}`;
  }
  return `${s.toExponential(2)} s`;
}

function fmt(v: number | null | undefined, decimals = 3): string {
  if (v == null || !Number.isFinite(v)) return "—";
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.0001 && v !== 0))
    return v.toExponential(2);
  return v.toFixed(decimals).replace(/\.?0+$/, "");
}

function KaTeXBlock({ latex }: { latex: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return latex;
    }
  }, [latex]);
  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX renders sanitized HTML
      dangerouslySetInnerHTML={{ __html: html }}
      className="overflow-x-auto py-2"
    />
  );
}

// ─── 3D Atom Components ───────────────────────────────────────────────────────

function NucleusCore({
  protons,
  neutrons,
}: { protons: number; neutrons: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRadius = Math.cbrt(protons + neutrons) * 0.18 + 0.25;
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[coreRadius, 32, 32]} />
        <meshStandardMaterial
          color="#00b4ff"
          emissive="#003c7a"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <pointLight color="#00d4ff" intensity={3} distance={4} />
    </group>
  );
}

function ElectronShell({
  radius,
  electronCount,
  speed,
  color,
}: {
  radius: number;
  electronCount: number;
  speed: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * speed;
  });
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.025, 8, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>
      {Array.from({ length: Math.min(electronCount, 8) }).map((_, i) => {
        const angle = (i / Math.min(electronCount, 8)) * Math.PI * 2;
        return (
          <mesh
            // biome-ignore lint/suspicious/noArrayIndexKey: electron shell position is index-stable
            key={`electron-${i}`}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
          >
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function AtomScene({
  protons,
  neutrons,
}: { protons: number; neutrons: number }) {
  const shellConfig = useMemo(() => {
    const shells: { cap: number; color: string }[] = [
      { cap: 2, color: "#00eaff" },
      { cap: 8, color: "#a78bfa" },
      { cap: 8, color: "#34d399" },
      { cap: 18, color: "#f472b6" },
      { cap: 18, color: "#fb923c" },
      { cap: 32, color: "#facc15" },
      { cap: 32, color: "#60a5fa" },
    ];
    let remaining = protons;
    const result: { count: number; color: string; radius: number }[] = [];
    for (let i = 0; i < shells.length && remaining > 0; i++) {
      const count = Math.min(remaining, shells[i].cap);
      result.push({ count, color: shells[i].color, radius: 0.7 + i * 0.45 });
      remaining -= count;
    }
    return result;
  }, [protons]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <NucleusCore protons={protons} neutrons={neutrons} />
      {shellConfig.map((shell, i) => (
        <ElectronShell
          key={`shell-${shell.radius}`}
          radius={shell.radius}
          electronCount={shell.count}
          speed={0.6 / (i + 1)}
          color={shell.color}
        />
      ))}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={1}
        maxDistance={12}
      />
    </>
  );
}

// ─── Category badge helper ────────────────────────────────────────────────────

function getCategoryClass(cat: ChemicalElement["category"]): string {
  const map: Record<string, string> = {
    "alkali-metal": "bg-amber-900/40 text-amber-300 border-amber-600/40",
    "alkaline-earth": "bg-orange-900/40 text-orange-300 border-orange-600/40",
    "transition-metal": "bg-blue-900/40 text-blue-300 border-blue-600/40",
    "post-transition-metal":
      "bg-slate-800/60 text-slate-300 border-slate-500/40",
    metalloid: "bg-teal-900/40 text-teal-300 border-teal-600/40",
    nonmetal: "bg-green-900/40 text-green-300 border-green-600/40",
    halogen: "bg-red-900/40 text-red-300 border-red-600/40",
    "noble-gas": "bg-purple-900/40 text-purple-300 border-purple-600/40",
    lanthanide: "bg-pink-900/40 text-pink-300 border-pink-600/40",
    actinide: "bg-amber-900/40 text-amber-300 border-amber-700/40",
    unknown: "bg-muted/40 text-muted-foreground border-border",
  };
  return map[cat] ?? map.unknown;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function DataCard({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-border/40 bg-muted/10 p-2.5 ${full ? "col-span-2" : ""}`}
    >
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-mono text-foreground">{value}</p>
    </div>
  );
}

function AbundanceCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | null;
  unit: string;
}) {
  return (
    <div className="rounded-lg border border-border/40 bg-muted/10 p-2 text-center">
      <p className="text-[9px] text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-xs font-mono text-foreground">
        {value != null ? value.toExponential(1) : "—"}
      </p>
      <p className="text-[9px] text-muted-foreground">{unit}</p>
    </div>
  );
}

// ─── Nuclear Tab ──────────────────────────────────────────────────────────────

function NuclearTab({
  element,
  expertMode,
}: {
  element: ChemicalElement;
  expertMode: boolean;
}) {
  const elementNuclides = useMemo(
    () => nuclides.filter((n) => n.Z === element.z).sort((a, b) => a.A - b.A),
    [element.z],
  );
  const [selectedNuclide, setSelectedNuclide] = useState<Nuclide | null>(
    () =>
      elementNuclides.find((n) => n.decayModes.includes("stable")) ??
      elementNuclides[0] ??
      null,
  );

  const decayModeColors: Record<string, string> = {
    alpha: "oklch(0.72 0.28 18)",
    "beta-": "oklch(0.7 0.24 286)",
    "beta+": "oklch(0.8 0.24 48)",
    stable: "oklch(0.72 0.22 145)",
    gamma: "oklch(0.82 0.24 192)",
    other: "oklch(0.65 0.14 240)",
  };

  const bwTerms = useMemo(() => {
    if (!selectedNuclide) return [];
    const { Z, A } = selectedNuclide;
    const N = A - Z;
    if (A < 2) return [];
    const aV = 15.75;
    const aS = 17.8;
    const aC = 0.711;
    const aA = 23.7;
    const volume = aV * A;
    const surface = -aS * A ** (2 / 3);
    const coulomb = -aC * Z * (Z - 1) * A ** (-1 / 3);
    const asymmetry = (-aA * (N - Z) ** 2) / A;
    const pairing =
      Z % 2 === 0 && N % 2 === 0
        ? 12 / Math.sqrt(A)
        : Z % 2 !== 0 && N % 2 !== 0
          ? -12 / Math.sqrt(A)
          : 0;
    return [
      {
        term: "Volume",
        value: Number.parseFloat((volume / A).toFixed(3)),
        fill: "oklch(0.72 0.22 145)",
      },
      {
        term: "Surface",
        value: Number.parseFloat((surface / A).toFixed(3)),
        fill: "oklch(0.7 0.24 22)",
      },
      {
        term: "Coulomb",
        value: Number.parseFloat((coulomb / A).toFixed(3)),
        fill: "oklch(0.7 0.24 48)",
      },
      {
        term: "Asymmetry",
        value: Number.parseFloat((asymmetry / A).toFixed(3)),
        fill: "oklch(0.7 0.24 286)",
      },
      {
        term: "Pairing",
        value: Number.parseFloat((pairing / A).toFixed(3)),
        fill: "oklch(0.74 0.28 326)",
      },
    ];
  }, [selectedNuclide]);

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="isotope-select"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block"
        >
          Isotope
        </label>
        <select
          id="isotope-select"
          value={selectedNuclide?.symbol ?? ""}
          onChange={(e) =>
            setSelectedNuclide(
              elementNuclides.find((n) => n.symbol === e.target.value) ?? null,
            )
          }
          className="w-full rounded-lg border border-border bg-card/60 text-foreground text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
          aria-label="Select isotope"
          data-ocid="detail.isotope_select"
        >
          {elementNuclides.map((n) => (
            <option key={n.symbol} value={n.symbol}>
              {n.symbol} — {n.halfLifeStr}
              {n.abundance != null ? ` (${n.abundance}%)` : ""}
            </option>
          ))}
        </select>
      </div>

      {selectedNuclide && (
        <motion.div
          key={selectedNuclide.symbol}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <DataCard
              label="Half-Life"
              value={formatHalfLife(selectedNuclide.halfLifeSeconds)}
            />
            <DataCard
              label="Mass Excess"
              value={
                selectedNuclide.massExcess_keV != null
                  ? `${fmt(selectedNuclide.massExcess_keV, 2)} keV`
                  : "—"
              }
            />
            <DataCard
              label="Q-Value"
              value={
                selectedNuclide.Qvalue_MeV != null
                  ? `${fmt(selectedNuclide.Qvalue_MeV, 3)} MeV`
                  : "—"
              }
            />
            <DataCard
              label="B/A (binding energy)"
              value={
                selectedNuclide.bindingEnergyPerNucleon_MeV != null
                  ? `${fmt(selectedNuclide.bindingEnergyPerNucleon_MeV, 3)} MeV`
                  : "—"
              }
            />
          </div>

          {(MAGIC_NUMBERS.has(element.z) ||
            MAGIC_NUMBERS.has(selectedNuclide.N)) && (
            <div className="flex gap-2 flex-wrap">
              {MAGIC_NUMBERS.has(element.z) && (
                <Badge className="bg-yellow-900/40 text-yellow-300 border border-yellow-600/40">
                  ✨ Magic proton Z={element.z}
                </Badge>
              )}
              {MAGIC_NUMBERS.has(selectedNuclide.N) && (
                <Badge className="bg-yellow-900/40 text-yellow-300 border border-yellow-600/40">
                  ✨ Magic neutron N={selectedNuclide.N}
                </Badge>
              )}
            </div>
          )}

          {selectedNuclide.decayModes.length > 0 &&
            !selectedNuclide.decayModes.includes("stable") && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Decay Modes
                </p>
                <div className="space-y-1.5">
                  {selectedNuclide.decayModes.map((mode, i) => {
                    const ratio =
                      selectedNuclide.branchingRatios?.[i] ??
                      100 / selectedNuclide.decayModes.length;
                    return (
                      <div key={mode}>
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span
                            className="font-mono"
                            style={{
                              color: decayModeColors[mode] ?? "oklch(0.7 0 0)",
                            }}
                          >
                            {mode
                              .replace("beta-", "β⁻")
                              .replace("beta+", "β⁺")
                              .replace("alpha", "α")
                              .replace("gamma", "γ")}
                          </span>
                          <span className="text-muted-foreground">
                            {fmt(ratio, 1)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${ratio}%`,
                              backgroundColor:
                                decayModeColors[mode] ?? "oklch(0.7 0 0)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {bwTerms.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Binding Energy Terms (Bethe-Weizsäcker)
              </p>
              <div
                className="h-36"
                aria-label={`Bethe-Weizsäcker binding energy terms for ${selectedNuclide.symbol}`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bwTerms}
                    margin={{ top: 4, right: 4, bottom: 4, left: -20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.25 0 0)"
                    />
                    <XAxis
                      dataKey="term"
                      tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }}
                    />
                    <YAxis tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }} />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.11 0 0)",
                        border: "1px solid oklch(0.18 0 0)",
                        borderRadius: 8,
                      }}
                      formatter={(v: number) => [`${v} MeV/A`, "Value"]}
                    />
                    <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                      {bwTerms.map((entry) => (
                        <Cell key={entry.term} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {expertMode && (
            <div className="rounded-lg border border-border/40 bg-muted/10 p-3">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Bethe-Weizsäcker Formula (NNDC/BNL)
              </p>
              <KaTeXBlock latex="B(Z,A) = a_V A - a_S A^{2/3} - a_C \\frac{Z(Z-1)}{A^{1/3}} - a_A \\frac{(N-Z)^2}{A} + \\delta(A,Z)" />
              <p className="text-[10px] text-muted-foreground mt-1">
                a_V=15.75, a_S=17.8, a_C=0.711, a_A=23.7 MeV
              </p>
            </div>
          )}

          {element.neutronCrossSection != null && (
            <DataCard
              label="Neutron Cross-Section (thermal)"
              value={`${fmt(element.neutronCrossSection, 3)} b`}
              full
            />
          )}

          <p className="text-[10px] text-muted-foreground">
            Data: NNDC/BNL ENSDF · IAEA Nuclear Data Services · AME2020
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Chemistry Tab ────────────────────────────────────────────────────────────

function ChemistryTab({
  element,
  expertMode,
}: {
  element: ChemicalElement;
  expertMode: boolean;
}) {
  const ionizationData = useMemo(() => {
    if (!element.ionizationEnergy) return [];
    return [
      { ie: "IE1", value: element.ionizationEnergy },
      { ie: "IE2", value: element.ionizationEnergy * 2.2 },
      { ie: "IE3", value: element.ionizationEnergy * 4.8 },
    ];
  }, [element.ionizationEnergy]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
          Electron Configuration
        </p>
        <code className="text-sm font-mono bg-muted/20 px-2.5 py-1 rounded border border-border/40 text-foreground block">
          {element.electronConfiguration}
        </code>
      </div>

      {element.oxidationStates.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Oxidation States
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {element.oxidationStates.map((os) => (
              <span
                key={os}
                className="px-2 py-0.5 rounded-full text-xs font-mono border"
                style={{
                  backgroundColor:
                    os > 0
                      ? "oklch(0.25 0.08 22/0.4)"
                      : os < 0
                        ? "oklch(0.25 0.08 240/0.4)"
                        : "oklch(0.2 0 0/0.4)",
                  borderColor:
                    os > 0
                      ? "oklch(0.55 0.16 22/0.5)"
                      : os < 0
                        ? "oklch(0.55 0.16 240/0.5)"
                        : "oklch(0.35 0 0)",
                  color:
                    os > 0
                      ? "oklch(0.82 0.22 22)"
                      : os < 0
                        ? "oklch(0.75 0.2 256)"
                        : "oklch(0.65 0 0)",
                }}
              >
                {os > 0 ? `+${os}` : os}
              </span>
            ))}
          </div>
        </div>
      )}

      {element.electronegativity != null && (
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-muted-foreground uppercase tracking-wider">
              Electronegativity (Pauling)
            </span>
            <span className="font-mono text-foreground">
              {element.electronegativity}
            </span>
          </div>
          <div
            className="h-2 rounded-full bg-muted/30 overflow-hidden"
            role="progressbar"
            tabIndex={0}
            aria-valuenow={element.electronegativity}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label={`Electronegativity ${element.electronegativity} on Pauling scale 0-4`}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${(element.electronegativity / 4) * 100}%`,
                background:
                  "linear-gradient(to right, oklch(0.55 0.18 256), oklch(0.78 0.28 22))",
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
            <span>0 (Cs)</span>
            <span>4.0 (F)</span>
          </div>
        </div>
      )}

      {ionizationData.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Ionization Energies
          </p>
          <div
            className="h-28"
            aria-label={`Ionization energies chart: IE1=${fmt(element.ionizationEnergy, 2)}eV (estimated IE2/IE3)`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ionizationData}
                margin={{ top: 4, right: 4, bottom: 4, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
                <XAxis
                  dataKey="ie"
                  tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.11 0 0)",
                    border: "1px solid oklch(0.18 0 0)",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => [`${fmt(v, 2)} eV`, "IE"]}
                />
                <Bar
                  dataKey="value"
                  fill="oklch(0.74 0.28 286)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        {element.electronAffinity != null && (
          <DataCard
            label="Electron Affinity"
            value={`${fmt(element.electronAffinity, 1)} kJ/mol`}
          />
        )}
        {element.crystalStructure && (
          <DataCard
            label="Crystal Structure"
            value={element.crystalStructure}
          />
        )}
      </div>

      {expertMode && element.ionizationEnergy != null && (
        <div className="rounded-lg border border-border/40 bg-muted/10 p-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Koopmans' Theorem (NIST)
          </p>
          <KaTeXBlock latex="\\text{IE}_k = -\\varepsilon_k" />
          <p className="text-[10px] text-muted-foreground mt-1">
            where ε_k is the Hartree-Fock orbital energy of orbital k
          </p>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground">
        Data: NIST WebBook · IUPAC 2016
      </p>
    </div>
  );
}

// ─── Physical Tab ─────────────────────────────────────────────────────────────

function PhysicalTab({
  element,
  currentTemperatureK,
}: {
  element: ChemicalElement;
  currentTemperatureK?: number;
}) {
  const tempK = currentTemperatureK ?? 298;
  const mpK =
    element.meltingPoint != null ? element.meltingPoint + 273.15 : null;
  const bpK =
    element.boilingPoint != null ? element.boilingPoint + 273.15 : null;

  const stateAtTemp = useMemo(() => {
    if (mpK == null) return element.phase;
    if (bpK != null && tempK >= bpK) return "gas";
    if (tempK >= mpK) return "liquid";
    return "solid";
  }, [tempK, mpK, bpK, element.phase]);

  const stateColors: Record<string, string> = {
    solid: "oklch(0.62 0.14 240)",
    liquid: "oklch(0.72 0.2 192)",
    gas: "oklch(0.8 0.24 48)",
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2.5">
        <DataCard
          label="Atomic Mass"
          value={`${fmt(element.atomicMass, 4)} u`}
        />
        <DataCard
          label="Density"
          value={
            element.density != null ? `${fmt(element.density, 4)} g/cm³` : "—"
          }
        />
      </div>

      {mpK != null && (
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-muted-foreground uppercase tracking-wider">
              Phase Range (K)
            </span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-full border"
              style={{
                color: stateColors[stateAtTemp],
                borderColor: `${stateColors[stateAtTemp]}60`,
              }}
            >
              {stateAtTemp} @ {tempK}K
            </span>
          </div>
          <div
            className="relative h-4 rounded-full bg-muted/30 overflow-hidden"
            role="img"
            aria-label={`Phase range: melting ${mpK?.toFixed(0)}K${bpK != null ? `, boiling ${bpK?.toFixed(0)}K` : ""}`}
          >
            <div
              className="absolute h-full rounded-full"
              style={{
                left: `${((mpK ?? 0) / 6000) * 100}%`,
                right: bpK != null ? `${100 - (bpK / 6000) * 100}%` : "10%",
                background:
                  "linear-gradient(to right, oklch(0.72 0.2 192), oklch(0.8 0.24 48))",
              }}
            />
            {currentTemperatureK != null && (
              <div
                className="absolute top-0 h-full w-0.5 bg-foreground/60"
                style={{ left: `${(tempK / 6000) * 100}%` }}
              />
            )}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
            <span>0K</span>
            <span>MP: {mpK?.toFixed(0)}K</span>
            {bpK != null && <span>BP: {bpK.toFixed(0)}K</span>}
            <span>6000K</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        <DataCard
          label="Melting Point"
          value={
            element.meltingPoint != null
              ? `${fmt(element.meltingPoint, 1)}°C`
              : "—"
          }
        />
        <DataCard
          label="Boiling Point"
          value={
            element.boilingPoint != null
              ? `${fmt(element.boilingPoint, 1)}°C`
              : "—"
          }
        />
      </div>

      <p className="text-[10px] text-muted-foreground">
        Data: NIST Chemistry WebBook · CRC Handbook
      </p>
    </div>
  );
}

// ─── Applications Tab ─────────────────────────────────────────────────────────

function ApplicationsTab({ element }: { element: ChemicalElement }) {
  const cosmicOrigin =
    COSMIC_ORIGIN[element.symbol] ?? "Stellar nucleosynthesis";
  const inHumanBody = BODY_ELEMENTS.has(element.symbol);

  return (
    <div className="space-y-5">
      {element.applications.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Industrial & Scientific Applications
          </p>
          <div className="space-y-1.5">
            {element.applications.map((app) => (
              <div key={app} className="flex items-start gap-2 text-sm">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: CATEGORY_COLORS[element.category],
                  }}
                />
                <span className="text-foreground/90">{app}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(element.discoverer || element.discoveryYear) && (
        <div className="rounded-lg border border-border/40 bg-muted/10 p-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Discovery
          </p>
          <div className="space-y-1 text-sm">
            {element.discoverer && (
              <div>
                <span className="text-muted-foreground">Discoverer: </span>
                <span className="text-foreground">{element.discoverer}</span>
              </div>
            )}
            {element.discoveryYear && (
              <div>
                <span className="text-muted-foreground">Year: </span>
                <span className="text-foreground font-mono">
                  {element.discoveryYear}
                </span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Name origin: </span>
              <span className="text-foreground/80 text-xs">
                {element.nameOrigin}
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Abundance
        </p>
        <div className="grid grid-cols-3 gap-2">
          <AbundanceCard
            label="Earth's Crust"
            value={element.crustAbundance}
            unit="ppm"
          />
          <AbundanceCard
            label="Seawater"
            value={element.seaAbundance}
            unit="ppb"
          />
          <AbundanceCard
            label="Cosmic"
            value={element.cosmicAbundance}
            unit="/Si"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge className="bg-indigo-900/40 text-indigo-300 border-indigo-600/40">
          🌌 {cosmicOrigin}
        </Badge>
        {inHumanBody && (
          <Badge className="bg-green-900/40 text-green-300 border-green-600/40">
            🫀 Present in human body
          </Badge>
        )}
        {element.isRadioactive && (
          <Badge className="bg-red-900/40 text-red-300 border-red-600/40">
            ☢ Radioactive
          </Badge>
        )}
      </div>
    </div>
  );
}

// ─── Quick-link buttons ───────────────────────────────────────────────────────

function QuickLinks({ element }: { element: ChemicalElement }) {
  const navigate = useNavigate();

  const links = [
    {
      label: "Decay Chain",
      icon: GitBranch,
      to: "/visualizations/decay-chain",
      search: { element: element.symbol },
      ocid: "detail.decay_chain_link",
    },
    {
      label: "Nucleus",
      icon: Atom,
      to: "/visualizations/nucleus",
      search: { z: String(element.z) },
      ocid: "detail.nucleus_link",
    },
    {
      label: "Data Explorer",
      icon: Database,
      to: "/tools/data-explorer",
      search: { search: element.symbol },
      ocid: "detail.data_explorer_link",
    },
    {
      label: "Isotopes",
      icon: Activity,
      to: "/tools/isotope-comparison",
      search: { a: String(element.z) },
      ocid: "detail.isotope_comparison_link",
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {links.map(({ label, icon: Icon, to, search, ocid }) => (
        <button
          key={label}
          type="button"
          data-ocid={ocid}
          onClick={() =>
            navigate({
              to,
              search: search as unknown as Record<string, string>,
            })
          }
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-card/60 text-xs text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
        >
          <Icon className="w-3.5 h-3.5 group-hover:text-primary" />
          {label}
          <ExternalLink className="w-2.5 h-2.5 opacity-50" />
        </button>
      ))}
    </div>
  );
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: "nuclear", label: "Nuclear", icon: Atom },
  { id: "chemistry", label: "Chemistry", icon: FlaskConical },
  { id: "physical", label: "Physical", icon: Scale },
  { id: "applications", label: "Applications", icon: BookOpen },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ElementDetailPanel({
  element,
  onClose,
  onCompare,
  expertMode = false,
  currentTemperatureK,
}: ElementDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("nuclear");
  const catColor = CATEGORY_COLORS[element.category] ?? CATEGORY_COLORS.unknown;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = TABS.findIndex((t) => t.id === activeTab);
      if (e.key === "ArrowRight")
        setActiveTab(TABS[(idx + 1) % TABS.length].id);
      if (e.key === "ArrowLeft")
        setActiveTab(TABS[(idx + TABS.length - 1) % TABS.length].id);
      if (e.key === "Escape") onClose();
    },
    [activeTab, onClose],
  );

  return (
    <motion.aside
      role="complementary"
      aria-label={`Element detail panel for ${element.name}`}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed right-0 top-0 bottom-0 z-50 w-[380px] max-w-full flex flex-col bg-card border-l border-border shadow-2xl"
      style={{
        boxShadow: `0 0 40px ${catColor}25, inset 0 0 20px ${catColor}08`,
      }}
      data-ocid="detail.panel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div
        className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-border/60"
        style={{
          background: `linear-gradient(135deg, ${catColor}15, transparent)`,
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="text-5xl font-bold font-display leading-none shrink-0"
            style={{ color: catColor, textShadow: `0 0 24px ${catColor}80` }}
          >
            {element.symbol}
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground leading-tight truncate">
              {element.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Z = {element.z} · A = {fmt(element.atomicMass, 3)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onCompare(element)}
            data-ocid="detail.compare_button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label={`Compare ${element.name} with another element`}
          >
            <Zap className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            data-ocid="detail.close_button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
            aria-label="Close element detail panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-4">
          {/* 3D Atom */}
          <div
            className="rounded-xl overflow-hidden border border-border/40 bg-black/40"
            style={{ height: 260 }}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  Loading 3D model…
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                gl={{ antialias: true }}
              >
                <AtomScene
                  protons={element.protons}
                  neutrons={element.neutrons}
                />
              </Canvas>
            </Suspense>
          </div>
          <p className="sr-only">
            3D model of {element.name} showing {element.protons} protons and{" "}
            {element.neutrons} neutrons in nucleus with electron shells
          </p>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <Badge
              className={`${getCategoryClass(element.category)} border capitalize`}
            >
              {element.category.replace(/-/g, " ")}
            </Badge>
            <Badge
              className="border"
              style={{
                backgroundColor: `${catColor}20`,
                borderColor: `${catColor}50`,
                color: catColor,
              }}
            >
              {element.phase} at 298K
            </Badge>
            <Badge className="bg-muted/30 text-muted-foreground border-border/40 border">
              {element.block}-block
            </Badge>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Element property tabs"
            className="flex gap-0.5 bg-muted/20 rounded-lg p-0.5"
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`tabpanel-${id}`}
                onClick={() => setActiveTab(id)}
                data-ocid={`detail.tab.${id}`}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  activeTab === id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-label={`${activeTab} properties`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {activeTab === "nuclear" && (
                  <NuclearTab element={element} expertMode={expertMode} />
                )}
                {activeTab === "chemistry" && (
                  <ChemistryTab element={element} expertMode={expertMode} />
                )}
                {activeTab === "physical" && (
                  <PhysicalTab
                    element={element}
                    currentTemperatureK={currentTemperatureK}
                  />
                )}
                {activeTab === "applications" && (
                  <ApplicationsTab element={element} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick links */}
          <Separator className="my-1" />
          <QuickLinks element={element} />
        </div>
      </ScrollArea>
    </motion.aside>
  );
}

export { ElementDetailPanel };
