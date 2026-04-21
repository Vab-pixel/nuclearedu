import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, Link2, Unlink2, X } from "lucide-react";
import { animate, useMotionValue } from "motion/react";
import { useReducedMotion } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CompareReactorType =
  | "PWR"
  | "BWR"
  | "CANDU"
  | "SMR"
  | "GAS"
  | "MSR";

interface ReactorTelemetry {
  label: string;
  thermalMW: number;
  electricalMW: number;
  fuel: string;
  coolant: string;
  moderator: string;
  inletC: number;
  outletC: number;
  pressureBar: number;
  efficiency: number;
  refueling: string;
  coreColor: string;
  coolantHotColor: string;
  coolantColdColor: string;
  description: string;
}

// ── Telemetry presets ─────────────────────────────────────────────────────────

const REACTOR_DATA: Record<CompareReactorType, ReactorTelemetry> = {
  PWR: {
    label: "Pressurized Water Reactor",
    thermalMW: 3411,
    electricalMW: 1150,
    fuel: "UO₂ (3–5% U-235)",
    coolant: "Light Water (H₂O)",
    moderator: "Light Water (H₂O)",
    inletC: 293,
    outletC: 328,
    pressureBar: 155,
    efficiency: 33.7,
    refueling: "Shutdown, ~18 months",
    coreColor: "#fbbf24",
    coolantHotColor: "#f87171",
    coolantColdColor: "#60a5fa",
    description:
      "Most common reactor type (~70% of global fleet). Primary coolant stays liquid under high pressure; heat transferred via steam generators.",
  },
  BWR: {
    label: "Boiling Water Reactor",
    thermalMW: 3930,
    electricalMW: 1380,
    fuel: "UO₂ (3–4% U-235)",
    coolant: "Water / Steam (H₂O)",
    moderator: "Light Water (H₂O)",
    inletC: 215,
    outletC: 286,
    pressureBar: 72,
    efficiency: 35.1,
    refueling: "Shutdown, ~18 months",
    coreColor: "#fbbf24",
    coolantHotColor: "#7dd3fc",
    coolantColdColor: "#60a5fa",
    description:
      "Water boils directly inside the vessel, driving the turbine without a steam generator. Simpler design but mildly radioactive turbine.",
  },
  CANDU: {
    label: "CANDU (Heavy Water)",
    thermalMW: 2064,
    electricalMW: 700,
    fuel: "Natural UO₂ (0.7% U-235)",
    coolant: "Heavy Water (D₂O)",
    moderator: "Heavy Water (D₂O)",
    inletC: 266,
    outletC: 313,
    pressureBar: 104,
    efficiency: 33.9,
    refueling: "Online — no shutdown",
    coreColor: "#fbbf24",
    coolantHotColor: "#f87171",
    coolantColdColor: "#22d3ee",
    description:
      "Uses unenriched natural uranium. Unique online refueling capability. Heavy water moderator enables high neutron economy.",
  },
  SMR: {
    label: "Small Modular Reactor",
    thermalMW: 160,
    electricalMW: 50,
    fuel: "UO₂ (4–20% U-235)",
    coolant: "Light Water (H₂O)",
    moderator: "Light Water (H₂O)",
    inletC: 280,
    outletC: 320,
    pressureBar: 160,
    efficiency: 31.3,
    refueling: "10–15 year sealed core",
    coreColor: "#a78bfa",
    coolantHotColor: "#f87171",
    coolantColdColor: "#60a5fa",
    description:
      "Factory-fabricated, passively safe, compact design. Ideal for remote locations or phased capacity additions. Integral primary systems.",
  },
  GAS: {
    label: "Gas-Cooled Reactor (AGR)",
    thermalMW: 1500,
    electricalMW: 660,
    fuel: "UO₂ (2.5–3.5% U-235)",
    coolant: "Carbon Dioxide (CO₂)",
    moderator: "Graphite",
    inletC: 290,
    outletC: 640,
    pressureBar: 40,
    efficiency: 44.0,
    refueling: "Online (some designs)",
    coreColor: "#fb923c",
    coolantHotColor: "#fb923c",
    coolantColdColor: "#94a3b8",
    description:
      "High outlet temperature enables high thermal efficiency. CO₂ coolant is non-corrosive. Graphite moderator enables use of slightly-enriched uranium.",
  },
  MSR: {
    label: "Thorium Molten Salt Reactor",
    thermalMW: 1000,
    electricalMW: 430,
    fuel: "Th-232 / U-233 dissolved salt",
    coolant: "Liquid Fluoride Salt",
    moderator: "Graphite",
    inletC: 565,
    outletC: 700,
    pressureBar: 1,
    efficiency: 43.0,
    refueling: "Continuous online addition",
    coreColor: "#4ade80",
    coolantHotColor: "#f59e0b",
    coolantColdColor: "#4ade80",
    description:
      "Liquid fuel dissolved in molten fluoride salt. Atmospheric pressure operation. Thorium fuel cycle — ~3× more abundant than uranium.",
  },
};

const REACTOR_OPTIONS: { value: CompareReactorType; label: string }[] = [
  { value: "PWR", label: "PWR — Pressurized Water" },
  { value: "BWR", label: "BWR — Boiling Water" },
  { value: "CANDU", label: "CANDU — Heavy Water" },
  { value: "SMR", label: "SMR — Small Modular" },
  { value: "GAS", label: "Gas-Cooled (AGR)" },
  { value: "MSR", label: "Thorium MSR" },
];

// ── Animated coolant path ─────────────────────────────────────────────────────

function CoolantPath({
  d,
  color,
  shouldAnimate,
}: {
  d: string;
  color: string;
  shouldAnimate: boolean;
}) {
  const dashOffset = useMotionValue(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      dashOffset.set(0);
      return;
    }
    const controls = animate(dashOffset, -240, {
      duration: 3.2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    });
    return () => controls.stop();
  }, [shouldAnimate, dashOffset]);

  useEffect(() => {
    if (pathRef.current) {
      return dashOffset.on("change", (v) => {
        if (pathRef.current) pathRef.current.style.strokeDashoffset = String(v);
      });
    }
  }, [dashOffset]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeDasharray="10 6"
      strokeDashoffset="0"
      opacity="0.8"
    />
  );
}

// ── Power badge helper ────────────────────────────────────────────────────────

function powerIndicator(W: number, insertion: number) {
  const powerColor =
    insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const powerLabel =
    insertion < 30 ? "HIGH" : insertion < 70 ? "NORMAL" : "LOW";
  return (
    <>
      <rect
        x={W - 100}
        y={10}
        width={86}
        height={44}
        rx={7}
        fill="#0d111888"
        stroke={powerColor}
        strokeWidth={1.5}
      />
      <text
        x={W - 57}
        y={26}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="7.5"
        fontFamily="monospace"
      >
        POWER
      </text>
      <text
        x={W - 57}
        y={44}
        textAnchor="middle"
        fill={powerColor}
        fontSize="11"
        fontWeight="bold"
        fontFamily="monospace"
      >
        {powerLabel}
      </text>
    </>
  );
}

// ── PWR/SMR Diagram ───────────────────────────────────────────────────────────

function PWRSVGDiagram({
  type,
  insertion,
  shouldAnimate,
  data,
}: {
  type: "PWR" | "SMR";
  insertion: number;
  shouldAnimate: boolean;
  data: ReactorTelemetry;
}) {
  const W = 480;
  const H = 300;
  const fluxOpacity = 0.15 + (1 - insertion / 100) * 0.55;
  const isSmr = type === "SMR";
  const VX = isSmr ? 100 : 60;
  const VY = 30;
  const VW = isSmr ? 100 : 160;
  const VH = isSmr ? 200 : 230;
  const CX = VX + VW * 0.18;
  const CY = VY + VH * 0.2;
  const CW = VW * 0.6;
  const CH = VH * 0.55;
  const rodH = (insertion / 100) * CH * 0.82;
  const SGX = VX + VW + 30;
  const SGY = VY + 20;
  const SGW = 60;
  const SGH = isSmr ? 100 : 150;
  const hotLeg = `M ${VX + VW} ${VY + VH * 0.25} C ${VX + VW + 15} ${VY + VH * 0.25} ${SGX} ${SGY + 25} ${SGX} ${SGY + 25}`;
  const coldLeg = `M ${SGX} ${SGY + SGH - 25} C ${SGX} ${SGY + SGH + 10} ${VX + VW + 15} ${VY + VH * 0.8} ${VX + VW} ${VY + VH * 0.8}`;
  const PRESS_X = isSmr ? VX + VW * 0.35 : VX + VW * 0.38;
  const PRESS_Y = VY - 30;
  const FUEL_IDS = [
    "r0c0",
    "r0c1",
    "r0c2",
    "r1c0",
    "r1c1",
    "r1c2",
    "r2c0",
    "r2c1",
    "r2c2",
  ] as const;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`${data.label} schematic`}
    >
      <defs>
        <radialGradient id={`flux-${type}`} cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={data.coreColor}
            stopOpacity={fluxOpacity}
          />
          <stop
            offset="60%"
            stopColor={data.coreColor}
            stopOpacity={fluxOpacity * 0.3}
          />
          <stop offset="100%" stopColor={data.coreColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={CX + CW / 2}
        cy={CY + CH / 2}
        rx={CW * 0.7}
        ry={CH * 0.5}
        fill={`url(#flux-${type})`}
      />
      <rect
        x={VX}
        y={VY}
        width={VW}
        height={VH}
        rx={10}
        fill="#0d1117"
        stroke="#4b5563"
        strokeWidth={2}
      />
      <rect
        x={CX}
        y={CY}
        width={CW}
        height={CH}
        rx={4}
        fill={`${data.coreColor}18`}
        stroke={`${data.coreColor}60`}
        strokeWidth={1.5}
      />
      {FUEL_IDS.map((id, i) => {
        const r = Math.floor(i / 3);
        const c = i % 3;
        return (
          <rect
            key={`fuel-${id}`}
            x={CX + 6 + c * ((CW - 12) / 3 + 1)}
            y={CY + 5 + r * ((CH - 10) / 3 + 2)}
            width={(CW - 12) / 3 - 1}
            height={(CH - 10) / 3 - 2}
            rx={1}
            fill={data.coreColor}
            opacity={0.8}
          />
        );
      })}
      {(["p30", "p50", "p70"] as const).map((pos) => {
        const frac = pos === "p30" ? 0.3 : pos === "p50" ? 0.5 : 0.7;
        return (
          <rect
            key={`cr-${pos}`}
            x={CX + CW * frac - 4}
            y={CY}
            width={8}
            height={rodH}
            rx={2}
            fill="#374151"
            stroke="#6b7280"
            strokeWidth={1}
            opacity={0.95}
          />
        );
      })}
      {!isSmr && (
        <>
          <rect
            x={PRESS_X}
            y={PRESS_Y}
            width={24}
            height={24}
            rx={5}
            fill="#1d4ed820"
            stroke="#3b82f6"
            strokeWidth={1.5}
          />
          <line
            x1={PRESS_X + 12}
            y1={PRESS_Y + 24}
            x2={PRESS_X + 12}
            y2={VY}
            stroke="#3b82f640"
            strokeWidth={3}
          />
        </>
      )}
      <rect
        x={SGX}
        y={SGY}
        width={SGW}
        height={SGH}
        rx={7}
        fill="#581c8720"
        stroke="#a855f7"
        strokeWidth={1.5}
      />
      {([12, 32, 52, 72] as const).slice(0, isSmr ? 3 : 4).map((yOff) => (
        <line
          key={`sg-${yOff}`}
          x1={SGX + 8}
          y1={SGY + yOff}
          x2={SGX + SGW - 8}
          y2={SGY + yOff}
          stroke="#a855f730"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      {shouldAnimate ? (
        <>
          <CoolantPath d={hotLeg} color={data.coolantHotColor} shouldAnimate />
          <CoolantPath
            d={coldLeg}
            color={data.coolantColdColor}
            shouldAnimate
          />
        </>
      ) : (
        <>
          <path
            d={hotLeg}
            fill="none"
            stroke={data.coolantHotColor}
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
          <path
            d={coldLeg}
            fill="none"
            stroke={data.coolantColdColor}
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
        </>
      )}
      <text
        x={VX + 3}
        y={VY - 6}
        fill="#6b7280"
        fontSize="8.5"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        {isSmr ? "SMR Vessel" : "Pressure Vessel"}
      </text>
      <text
        x={CX + CW / 2}
        y={CY + CH + 13}
        textAnchor="middle"
        fill={data.coreColor}
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Core
      </text>
      <text
        x={SGX + SGW / 2}
        y={SGY - 6}
        textAnchor="middle"
        fill="#c084fc"
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        S/G
      </text>
      {powerIndicator(W, insertion)}
      <text x={4} y={H - 5} fill="#374151" fontSize="7" fontFamily="sans-serif">
        Schematic — not to scale
      </text>
    </svg>
  );
}

// ── BWR Diagram ───────────────────────────────────────────────────────────────

function BWRSVGDiagram({
  insertion,
  shouldAnimate,
}: {
  insertion: number;
  shouldAnimate: boolean;
}) {
  const W = 480;
  const H = 300;
  const fluxOpacity = 0.15 + (1 - insertion / 100) * 0.55;
  const VX = 70;
  const VY = 30;
  const VW = 180;
  const VH = 220;
  const CX = VX + 30;
  const CY = VY + 100;
  const CW = 110;
  const CH = 90;
  const rodH = (insertion / 100) * CH * 0.85;
  const SEP_X = VX + 20;
  const SEP_Y = VY + 20;
  const SEP_W = VW - 40;
  const SEP_H = 50;
  const TURB_X = VX + VW + 30;
  const TURB_Y = VY + 20;
  const steamLine = `M ${VX + VW / 2} ${VY} L ${VX + VW / 2} ${VY - 15} L ${TURB_X} ${TURB_Y + 25}`;
  const BWR_FUEL = [
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
  ] as const;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="BWR schematic"
    >
      <defs>
        <radialGradient id="flux-BWR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity={fluxOpacity} />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={CX + CW / 2}
        cy={CY + CH / 2}
        rx={CW * 0.7}
        ry={CH * 0.55}
        fill="url(#flux-BWR)"
      />
      <rect
        x={VX}
        y={VY}
        width={VW}
        height={VH}
        rx={10}
        fill="#0d1117"
        stroke="#4b5563"
        strokeWidth={2}
      />
      <rect
        x={SEP_X}
        y={SEP_Y}
        width={SEP_W}
        height={SEP_H}
        rx={4}
        fill="#7dd3fc12"
        stroke="#7dd3fc50"
        strokeWidth={1.5}
        strokeDasharray="4 2"
      />
      <text
        x={SEP_X + SEP_W / 2}
        y={SEP_Y + SEP_H / 2 + 4}
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="8"
        fontFamily="sans-serif"
      >
        Steam Separator
      </text>
      <rect
        x={CX}
        y={CY}
        width={CW}
        height={CH}
        rx={4}
        fill="#fbbf2418"
        stroke="#fbbf2450"
        strokeWidth={1.5}
      />
      {BWR_FUEL.map((id, i) => (
        <rect
          key={`bwr-fuel-${id}`}
          x={CX + 6 + (i % 3) * 34}
          y={CY + 5 + Math.floor(i / 3) * 26}
          width={26}
          height={20}
          rx={1}
          fill="#fbbf24"
          opacity={0.8}
        />
      ))}
      {(["p30", "p50", "p70"] as const).map((pos) => {
        const frac = pos === "p30" ? 0.3 : pos === "p50" ? 0.5 : 0.7;
        const ry = CY + CH - rodH;
        return (
          <rect
            key={`bwr-cr-${pos}`}
            x={CX + CW * frac - 4}
            y={ry}
            width={8}
            height={rodH}
            rx={2}
            fill="#374151"
            stroke="#6b7280"
            strokeWidth={1}
            opacity={0.95}
          />
        );
      })}
      <rect
        x={TURB_X}
        y={TURB_Y}
        width={80}
        height={50}
        rx={7}
        fill="#0f172a"
        stroke="#7dd3fc"
        strokeWidth={1.5}
      />
      <text
        x={TURB_X + 40}
        y={TURB_Y + 20}
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="9"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Turbine /
      </text>
      <text
        x={TURB_X + 40}
        y={TURB_Y + 34}
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="9"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Generator
      </text>
      {shouldAnimate ? (
        <CoolantPath d={steamLine} color="#7dd3fc" shouldAnimate />
      ) : (
        <path
          d={steamLine}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth={3}
          strokeDasharray="10 6"
          opacity={0.75}
        />
      )}
      <rect
        x={VX - 15}
        y={VY + VH + 12}
        width={VW + 30}
        height={36}
        rx={6}
        fill="#1e3a5f"
        stroke="#3b82f6"
        strokeWidth={1.5}
      />
      <text
        x={VX + VW / 2}
        y={VY + VH + 35}
        textAnchor="middle"
        fill="#60a5fa"
        fontSize="9"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Suppression Pool (Wetwell)
      </text>
      {powerIndicator(W, insertion)}
      <text x={4} y={H - 5} fill="#374151" fontSize="7" fontFamily="sans-serif">
        Schematic — not to scale
      </text>
    </svg>
  );
}

// ── CANDU Diagram ─────────────────────────────────────────────────────────────

function CANDUSVGDiagram({
  insertion,
  shouldAnimate,
}: {
  insertion: number;
  shouldAnimate: boolean;
}) {
  const W = 480;
  const H = 300;
  const CAL_X = 30;
  const CAL_Y = 60;
  const CAL_W = 240;
  const CAL_H = 140;
  const numTubes = 6;
  const tubeSpacing = CAL_H / (numTubes + 1);
  const SGX = CAL_X + CAL_W + 35;
  const SGY = CAL_Y + 10;
  const SGW = 60;
  const SGH = 120;
  const hotLeg = `M ${CAL_X + CAL_W} ${CAL_Y + CAL_H / 2} C ${CAL_X + CAL_W + 18} ${CAL_Y + CAL_H / 2} ${SGX} ${SGY + 25} ${SGX} ${SGY + 25}`;
  const coldLeg = `M ${SGX} ${SGY + SGH - 25} C ${SGX} ${SGY + SGH} ${CAL_X + CAL_W + 18} ${CAL_Y + CAL_H - 18} ${CAL_X + CAL_W} ${CAL_Y + CAL_H - 18}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="CANDU reactor schematic"
    >
      <rect
        x={CAL_X}
        y={CAL_Y}
        width={CAL_W}
        height={CAL_H}
        rx={8}
        fill="#0d1117"
        stroke="#4b5563"
        strokeWidth={2}
      />
      <rect
        x={CAL_X + 2}
        y={CAL_Y + 2}
        width={CAL_W - 4}
        height={CAL_H - 4}
        rx={7}
        fill="#0e7490"
        opacity={0.08}
      />
      <text
        x={CAL_X + 4}
        y={CAL_Y - 6}
        fill="#6b7280"
        fontSize="8.5"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Calandria (D₂O Moderator)
      </text>
      {Array.from({ length: numTubes }, (_, i) => {
        const ty = CAL_Y + tubeSpacing * (i + 1);
        const tubeKey = `tube-y${Math.round(ty)}`;
        return (
          <g key={tubeKey}>
            <line
              x1={CAL_X}
              y1={ty}
              x2={CAL_X + CAL_W}
              y2={ty}
              stroke="#fbbf24"
              strokeWidth={6}
              strokeLinecap="round"
              opacity={0.82}
            />
            {([1, 2, 3, 4] as const).map((n) => (
              <circle
                key={`${tubeKey}-b${n}`}
                cx={CAL_X + (CAL_W / 5) * n}
                cy={ty}
                r={3.5}
                fill="#fbbf24"
                opacity={0.9}
              />
            ))}
          </g>
        );
      })}
      <rect
        x={CAL_X - 44}
        y={CAL_Y + CAL_H / 2 - 10}
        width={40}
        height={20}
        rx={4}
        fill="#1f293780"
        stroke="#4ade80"
        strokeWidth={1.5}
      />
      <rect
        x={CAL_X + CAL_W + 4}
        y={CAL_Y + CAL_H / 2 - 10}
        width={40}
        height={20}
        rx={4}
        fill="#1f293780"
        stroke="#4ade80"
        strokeWidth={1.5}
      />
      <text
        x={CAL_X - 24}
        y={CAL_Y + CAL_H / 2 + 4}
        textAnchor="middle"
        fill="#4ade80"
        fontSize="7.5"
        fontFamily="sans-serif"
      >
        Fuel-A
      </text>
      <text
        x={CAL_X + CAL_W + 24}
        y={CAL_Y + CAL_H / 2 + 4}
        textAnchor="middle"
        fill="#4ade80"
        fontSize="7.5"
        fontFamily="sans-serif"
      >
        Fuel-B
      </text>
      <rect
        x={SGX}
        y={SGY}
        width={SGW}
        height={SGH}
        rx={7}
        fill="#581c8720"
        stroke="#a855f7"
        strokeWidth={1.5}
      />
      {([12, 35, 58, 82, 100] as const).map((yOff) => (
        <line
          key={`csg-${yOff}`}
          x1={SGX + 8}
          y1={SGY + yOff}
          x2={SGX + SGW - 8}
          y2={SGY + yOff}
          stroke="#a855f730"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      <text
        x={SGX + SGW / 2}
        y={SGY - 6}
        textAnchor="middle"
        fill="#c084fc"
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        S/G
      </text>
      {shouldAnimate ? (
        <>
          <CoolantPath d={hotLeg} color="#f87171" shouldAnimate />
          <CoolantPath d={coldLeg} color="#22d3ee" shouldAnimate />
        </>
      ) : (
        <>
          <path
            d={hotLeg}
            fill="none"
            stroke="#f87171"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
          <path
            d={coldLeg}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
        </>
      )}
      {powerIndicator(W, insertion)}
      <text x={4} y={H - 5} fill="#374151" fontSize="7" fontFamily="sans-serif">
        Schematic — not to scale
      </text>
    </svg>
  );
}

// ── Gas-Cooled Diagram ────────────────────────────────────────────────────────

function GASSVGDiagram({
  insertion,
  shouldAnimate,
}: {
  insertion: number;
  shouldAnimate: boolean;
}) {
  const W = 480;
  const H = 300;
  const CORE_X = 60;
  const CORE_Y = 40;
  const CORE_W = 200;
  const CORE_H = 200;
  const HEX_R = 22;
  const hexCenters: [number, number][] = [
    [CORE_X + 100, CORE_Y + 55],
    [CORE_X + 55, CORE_Y + 95],
    [CORE_X + 145, CORE_Y + 95],
    [CORE_X + 100, CORE_Y + 135],
    [CORE_X + 55, CORE_Y + 165],
    [CORE_X + 145, CORE_Y + 165],
    [CORE_X + 100, CORE_Y + 195],
  ];
  const hexPath = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  };
  const SG_X = CORE_X + CORE_W + 35;
  const SG_Y = CORE_Y + 20;
  const hotPath = `M ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 - 15} C ${CORE_X + CORE_W + 20} ${CORE_Y + CORE_H / 2 - 15} ${SG_X} ${SG_Y + 20} ${SG_X} ${SG_Y + 20}`;
  const coldPath = `M ${SG_X} ${SG_Y + 130} C ${SG_X} ${SG_Y + 150} ${CORE_X + CORE_W + 20} ${CORE_Y + CORE_H / 2 + 15} ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 + 15}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Gas-cooled reactor schematic"
    >
      <rect
        x={CORE_X - 10}
        y={CORE_Y - 10}
        width={CORE_W + 20}
        height={CORE_H + 20}
        rx={8}
        fill="#0d1117"
        stroke="#4b5563"
        strokeWidth={2}
      />
      <rect
        x={CORE_X - 8}
        y={CORE_Y - 8}
        width={CORE_W + 16}
        height={CORE_H + 16}
        rx={7}
        fill="#92400e"
        opacity={0.07}
      />
      <text
        x={CORE_X - 8}
        y={CORE_Y - 14}
        fill="#6b7280"
        fontSize="8.5"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Graphite Core
      </text>
      {hexCenters.map(([cx, cy]) => (
        <g key={`hex-cx${Math.round(cx)}-cy${Math.round(cy)}`}>
          <path
            d={hexPath(cx, cy, HEX_R)}
            fill="#92400e20"
            stroke="#fb923c60"
            strokeWidth={1.5}
          />
          <rect
            x={cx - 4}
            y={cy - HEX_R * 0.5}
            width={8}
            height={HEX_R}
            rx={2}
            fill="#374151"
            stroke="#6b7280"
            strokeWidth={0.8}
            opacity={0.9}
          />
          <circle cx={cx} cy={cy} r={5} fill="#fb923c" opacity={0.85} />
        </g>
      ))}
      <rect
        x={SG_X}
        y={SG_Y}
        width={65}
        height={150}
        rx={7}
        fill="#581c8720"
        stroke="#a855f7"
        strokeWidth={1.5}
      />
      {([18, 42, 66, 90, 114, 132] as const).map((yOff) => (
        <line
          key={`gsg-${yOff}`}
          x1={SG_X + 8}
          y1={SG_Y + yOff}
          x2={SG_X + 57}
          y2={SG_Y + yOff}
          stroke="#a855f730"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      <text
        x={SG_X + 33}
        y={SG_Y - 6}
        textAnchor="middle"
        fill="#c084fc"
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Heat Exch.
      </text>
      {shouldAnimate ? (
        <>
          <CoolantPath d={hotPath} color="#fb923c" shouldAnimate />
          <CoolantPath d={coldPath} color="#94a3b8" shouldAnimate />
        </>
      ) : (
        <>
          <path
            d={hotPath}
            fill="none"
            stroke="#fb923c"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
          <path
            d={coldPath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
        </>
      )}
      <text
        x={CORE_X + CORE_W + 5}
        y={CORE_Y + CORE_H / 2 - 18}
        fill="#fb923c"
        fontSize="7.5"
        fontFamily="sans-serif"
      >
        CO₂ →
      </text>
      <text
        x={CORE_X + CORE_W + 5}
        y={CORE_Y + CORE_H / 2 + 26}
        fill="#94a3b8"
        fontSize="7.5"
        fontFamily="sans-serif"
      >
        ← CO₂
      </text>
      {powerIndicator(W, insertion)}
      <text x={4} y={H - 5} fill="#374151" fontSize="7" fontFamily="sans-serif">
        Schematic — not to scale
      </text>
    </svg>
  );
}

// ── MSR Diagram ───────────────────────────────────────────────────────────────

function MSRSVGDiagram({
  insertion,
  shouldAnimate,
}: {
  insertion: number;
  shouldAnimate: boolean;
}) {
  const W = 480;
  const H = 300;
  const CORE_X = 60;
  const CORE_Y = 60;
  const CORE_W = 120;
  const CORE_H = 160;
  const HX_X = CORE_X + CORE_W + 50;
  const HX_Y = CORE_Y + 20;
  const saltLoop = `M ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 - 20} C ${CORE_X + CORE_W + 25} ${CORE_Y + CORE_H / 2 - 20} ${HX_X} ${HX_Y + 20} ${HX_X} ${HX_Y + 20}`;
  const saltReturn = `M ${HX_X} ${HX_Y + 110} C ${HX_X} ${HX_Y + 130} ${CORE_X + CORE_W + 25} ${CORE_Y + CORE_H / 2 + 20} ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 + 20}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Thorium MSR schematic"
    >
      <rect
        x={CORE_X}
        y={CORE_Y}
        width={CORE_W}
        height={CORE_H}
        rx={8}
        fill="#0d1117"
        stroke="#4ade8060"
        strokeWidth={2}
      />
      <rect
        x={CORE_X + 2}
        y={CORE_Y + 2}
        width={CORE_W - 4}
        height={CORE_H - 4}
        rx={7}
        fill="#4ade80"
        opacity={0.05}
      />
      <text
        x={CORE_X + 4}
        y={CORE_Y - 6}
        fill="#4ade80"
        fontSize="8.5"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        MSR Core (Liquid Salt)
      </text>
      {(["ch25", "ch50", "ch75"] as const).map((id) => {
        const frac = id === "ch25" ? 0.25 : id === "ch50" ? 0.5 : 0.75;
        return (
          <rect
            key={`msr-ch-${id}`}
            x={CORE_X + 10}
            y={CORE_Y + CORE_H * frac - 8}
            width={CORE_W - 20}
            height={16}
            rx={4}
            fill="#4ade8025"
            stroke="#4ade8050"
            strokeWidth={1}
          />
        );
      })}
      {(["g38", "g62"] as const).map((id) => {
        const frac = id === "g38" ? 0.38 : 0.62;
        return (
          <rect
            key={`msr-g-${id}`}
            x={CORE_X + 8}
            y={CORE_Y + CORE_H * frac - 4}
            width={CORE_W - 16}
            height={8}
            rx={2}
            fill="#374151"
            opacity={0.7}
          />
        );
      })}
      <text
        x={CORE_X + CORE_W / 2}
        y={CORE_Y + CORE_H + 14}
        textAnchor="middle"
        fill="#4ade80"
        fontSize="8"
        fontFamily="sans-serif"
      >
        Liquid Th-U Fluoride Salt
      </text>
      <rect
        x={HX_X}
        y={HX_Y}
        width={65}
        height={130}
        rx={7}
        fill="#78350f20"
        stroke="#f59e0b"
        strokeWidth={1.5}
      />
      {([15, 36, 57, 78, 99, 115] as const).map((yOff) => (
        <line
          key={`mhx-${yOff}`}
          x1={HX_X + 8}
          y1={HX_Y + yOff}
          x2={HX_X + 57}
          y2={HX_Y + yOff}
          stroke="#f59e0b30"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      <text
        x={HX_X + 33}
        y={HX_Y - 6}
        textAnchor="middle"
        fill="#f59e0b"
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Heat Exch.
      </text>
      <text
        x={HX_X + 33}
        y={HX_Y + 145}
        textAnchor="middle"
        fill="#6b7280"
        fontSize="7.5"
        fontFamily="sans-serif"
      >
        → secondary salt
      </text>
      {shouldAnimate ? (
        <>
          <CoolantPath d={saltLoop} color="#f59e0b" shouldAnimate />
          <CoolantPath d={saltReturn} color="#4ade80" shouldAnimate />
        </>
      ) : (
        <>
          <path
            d={saltLoop}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
          <path
            d={saltReturn}
            fill="none"
            stroke="#4ade80"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
        </>
      )}
      <rect
        x={CORE_X - 55}
        y={CORE_Y + CORE_H / 2 - 20}
        width={42}
        height={40}
        rx={6}
        fill="#1f293780"
        stroke="#4ade8060"
        strokeWidth={1.5}
        strokeDasharray="3 2"
      />
      <text
        x={CORE_X - 34}
        y={CORE_Y + CORE_H / 2 - 6}
        textAnchor="middle"
        fill="#4ade80"
        fontSize="7"
        fontFamily="sans-serif"
      >
        Drain
      </text>
      <text
        x={CORE_X - 34}
        y={CORE_Y + CORE_H / 2 + 7}
        textAnchor="middle"
        fill="#4ade80"
        fontSize="7"
        fontFamily="sans-serif"
      >
        Tank
      </text>
      <line
        x1={CORE_X - 13}
        y1={CORE_Y + CORE_H / 2}
        x2={CORE_X}
        y2={CORE_Y + CORE_H / 2}
        stroke="#4ade8040"
        strokeWidth={2}
        strokeDasharray="3 2"
      />
      <text
        x={CORE_X + CORE_W / 2}
        y={CORE_Y - 20}
        textAnchor="middle"
        fill="#6b7280"
        fontSize="7.5"
        fontFamily="monospace"
      >
        ≈1 bar (near-atmospheric)
      </text>
      {powerIndicator(W, insertion)}
      <text x={4} y={H - 5} fill="#374151" fontSize="7" fontFamily="sans-serif">
        Schematic — not to scale
      </text>
    </svg>
  );
}

// ── Dispatch SVG by type ──────────────────────────────────────────────────────

function CompactReactorSVG({
  type,
  insertion,
  shouldAnimate,
  data,
}: {
  type: CompareReactorType;
  insertion: number;
  shouldAnimate: boolean;
  data: ReactorTelemetry;
}) {
  if (type === "PWR" || type === "SMR") {
    return (
      <PWRSVGDiagram
        type={type}
        insertion={insertion}
        shouldAnimate={shouldAnimate}
        data={data}
      />
    );
  }
  if (type === "BWR") {
    return (
      <BWRSVGDiagram insertion={insertion} shouldAnimate={shouldAnimate} />
    );
  }
  if (type === "CANDU") {
    return (
      <CANDUSVGDiagram insertion={insertion} shouldAnimate={shouldAnimate} />
    );
  }
  if (type === "GAS") {
    return (
      <GASSVGDiagram insertion={insertion} shouldAnimate={shouldAnimate} />
    );
  }
  return <MSRSVGDiagram insertion={insertion} shouldAnimate={shouldAnimate} />;
}

// ── Single reactor pane ────────────────────────────────────────────────────────

interface PaneProps {
  paneId: "left" | "right";
  reactorType: CompareReactorType;
  insertion: number;
  onReactorChange: (t: CompareReactorType) => void;
  onInsertionChange: (v: number) => void;
  shouldAnimate: boolean;
}

function ReactorPane({
  paneId,
  reactorType,
  insertion,
  onReactorChange,
  onInsertionChange,
  shouldAnimate,
}: PaneProps) {
  const data = REACTOR_DATA[reactorType];
  const powerColor =
    insertion < 30
      ? "text-red-400"
      : insertion < 70
        ? "text-emerald-400"
        : "text-blue-400";
  const powerLabel =
    insertion < 30 ? "HIGH" : insertion < 70 ? "NORMAL" : "LOW / SHUTDOWN";
  const tempScale = 1 - insertion / 100;
  const inletTemp = Math.round(
    data.inletC - tempScale * 20 + (1 - tempScale) * 20,
  );
  const outletTemp = Math.round(
    data.outletC - tempScale * 20 + (1 - tempScale) * 20,
  );
  const thermalPower = Math.round(data.thermalMW * (0.35 + 0.65 * tempScale));

  const telemetryItems = [
    { label: "THERMAL", value: `${thermalPower} MWth`, className: "" },
    { label: "ELECTRICAL", value: `${data.electricalMW} MWe`, className: "" },
    { label: "PRESSURE", value: `${data.pressureBar} bar`, className: "" },
    { label: "INLET", value: `${inletTemp}°C`, className: "text-blue-400" },
    { label: "OUTLET", value: `${outletTemp}°C`, className: "text-red-400" },
    { label: "POWER", value: powerLabel, className: powerColor },
  ] as const;

  return (
    <div
      className="flex flex-col gap-0 h-full"
      data-ocid={`reactor-compare.pane.${paneId}`}
    >
      {/* Pane header with selector */}
      <div className="flex items-center gap-2 p-3 border-b border-border/60 bg-card/40">
        <Select
          value={reactorType}
          onValueChange={(v) => onReactorChange(v as CompareReactorType)}
        >
          <SelectTrigger
            className="flex-1 h-8 text-xs font-semibold bg-background/60 border-border/60"
            aria-label={`Reactor type for ${paneId} pane`}
            data-ocid={`reactor-compare.${paneId}_type_select`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REACTOR_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SVG diagram with Cherenkov glow border */}
      <div className="relative flex-1 min-h-0 p-3">
        <div
          className="relative rounded-lg overflow-hidden border border-cyan-500/20 bg-background/30"
          style={{
            boxShadow:
              "0 0 16px oklch(0.72 0.22 200 / 0.15), 0 0 48px oklch(0.72 0.22 200 / 0.06), inset 0 0 20px oklch(0.72 0.22 200 / 0.04)",
          }}
        >
          <CompactReactorSVG
            type={reactorType}
            insertion={insertion}
            shouldAnimate={shouldAnimate}
            data={data}
          />
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="grid grid-cols-3 gap-px bg-border/40 border-t border-b border-border/60 text-[10px] font-mono">
        {telemetryItems.map(({ label, value, className }) => (
          <div
            key={label}
            className="bg-card/40 px-2 py-1.5 flex flex-col gap-0.5"
          >
            <span className="text-muted-foreground">{label}</span>
            <span className={`font-bold ${className || "text-foreground"}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Control rod slider */}
      <div className="px-3 py-3 bg-card/30 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor={`rod-${paneId}`}
            className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
          >
            Control Rod Insertion
          </label>
          <span className="font-mono text-xs font-bold text-foreground">
            {insertion}%
          </span>
        </div>
        <Slider
          id={`rod-${paneId}`}
          min={0}
          max={100}
          step={1}
          value={[insertion]}
          onValueChange={([v]) => onInsertionChange(v)}
          aria-label={`Control rod insertion for ${paneId} pane`}
          data-ocid={`reactor-compare.${paneId}_rod_slider`}
        />
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>0% — High Power</span>
          <span>100% — Shutdown</span>
        </div>
      </div>
    </div>
  );
}

// ── Telemetry comparison table ─────────────────────────────────────────────────

function TelemetryTable({
  leftType,
  rightType,
}: {
  leftType: CompareReactorType;
  rightType: CompareReactorType;
}) {
  const L = REACTOR_DATA[leftType];
  const R = REACTOR_DATA[rightType];

  const rows: { label: string; left: string; right: string }[] = [
    {
      label: "Thermal Power",
      left: `${L.thermalMW} MWth`,
      right: `${R.thermalMW} MWth`,
    },
    {
      label: "Electrical Output",
      left: `${L.electricalMW} MWe`,
      right: `${R.electricalMW} MWe`,
    },
    {
      label: "Thermal Efficiency",
      left: `${L.efficiency}%`,
      right: `${R.efficiency}%`,
    },
    { label: "Fuel Type", left: L.fuel, right: R.fuel },
    { label: "Coolant", left: L.coolant, right: R.coolant },
    { label: "Moderator", left: L.moderator, right: R.moderator },
    { label: "Inlet Temp", left: `${L.inletC}°C`, right: `${R.inletC}°C` },
    { label: "Outlet Temp", left: `${L.outletC}°C`, right: `${R.outletC}°C` },
    {
      label: "Pressure",
      left: `${L.pressureBar} bar`,
      right: `${R.pressureBar} bar`,
    },
    { label: "Refueling", left: L.refueling, right: R.refueling },
  ];

  return (
    <div
      className="overflow-x-auto"
      data-ocid="reactor-compare.telemetry_table"
    >
      <table
        className="w-full text-[11px]"
        aria-label="Reactor telemetry comparison"
      >
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-left py-2 px-3 font-mono text-muted-foreground uppercase tracking-wider text-[10px] w-[30%]">
              Parameter
            </th>
            <th className="text-center py-2 px-3 font-semibold text-cyan-400 uppercase tracking-wider text-[10px] w-[35%]">
              {L.label.split(" ").slice(0, 2).join(" ")}
            </th>
            <th className="text-center py-2 px-3 font-semibold text-violet-400 uppercase tracking-wider text-[10px] w-[35%]">
              {R.label.split(" ").slice(0, 2).join(" ")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/20" : ""}`}
              data-ocid={`reactor-compare.telemetry_row.${i + 1}`}
            >
              <td className="py-1.5 px-3 text-muted-foreground font-medium">
                {row.label}
              </td>
              <td className="py-1.5 px-3 text-center font-mono font-semibold text-foreground">
                {row.left}
              </td>
              <td className="py-1.5 px-3 text-center font-mono font-semibold text-foreground">
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main modal component ───────────────────────────────────────────────────────

interface ReactorComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReactorComparisonModal({
  isOpen,
  onClose,
}: ReactorComparisonModalProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;

  const [leftType, setLeftType] = useState<CompareReactorType>("PWR");
  const [rightType, setRightType] = useState<CompareReactorType>("BWR");
  const [leftInsertion, setLeftInsertion] = useState(40);
  const [rightInsertion, setRightInsertion] = useState(40);
  const [syncPanes, setSyncPanes] = useState(false);
  const [timeline, setTimeline] = useState(50);
  const [activeTab, setActiveTab] = useState<"specs" | "telemetry">("specs");

  const modalRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleLeftInsertion = useCallback(
    (v: number) => {
      setLeftInsertion(v);
      if (syncPanes) setRightInsertion(v);
    },
    [syncPanes],
  );

  const handleRightInsertion = useCallback(
    (v: number) => {
      setRightInsertion(v);
      if (syncPanes) setLeftInsertion(v);
    },
    [syncPanes],
  );

  const handleTimeline = useCallback(
    (v: number) => {
      setTimeline(v);
      if (syncPanes) {
        setLeftInsertion(v);
        setRightInsertion(v);
      }
    },
    [syncPanes],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleExportCSV = useCallback(() => {
    const L = REACTOR_DATA[leftType];
    const R = REACTOR_DATA[rightType];
    const rows = [
      ["Parameter", L.label, R.label],
      ["Thermal Power (MWth)", String(L.thermalMW), String(R.thermalMW)],
      [
        "Electrical Output (MWe)",
        String(L.electricalMW),
        String(R.electricalMW),
      ],
      ["Thermal Efficiency (%)", String(L.efficiency), String(R.efficiency)],
      ["Fuel", L.fuel, R.fuel],
      ["Coolant", L.coolant, R.coolant],
      ["Moderator", L.moderator, R.moderator],
      ["Inlet Temp (°C)", String(L.inletC), String(R.inletC)],
      ["Outlet Temp (°C)", String(L.outletC), String(R.outletC)],
      ["Pressure (bar)", String(L.pressureBar), String(R.pressureBar)],
      ["Refueling", L.refueling, R.refueling],
      [
        "Control Rod Insertion (%)",
        String(leftInsertion),
        String(rightInsertion),
      ],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reactor-comparison-${leftType}-vs-${rightType}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [leftType, rightType, leftInsertion, rightInsertion]);

  const handleBackdropKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") onClose();
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            role="button"
            tabIndex={0}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm cursor-default"
            onClick={onClose}
            onKeyDown={handleBackdropKeyDown}
            aria-label="Close modal"
          />

          {/* Modal panel */}
          <motion.dialog
            ref={modalRef}
            aria-modal="true"
            aria-label="Reactor Comparison Dashboard"
            open
            className="relative z-10 flex flex-col bg-card border border-border/60 rounded-2xl overflow-hidden shadow-2xl p-0"
            style={{
              width: "95vw",
              maxWidth: "1400px",
              height: "90vh",
              boxShadow:
                "0 0 0 1px oklch(0.72 0.22 200 / 0.18), 0 0 40px oklch(0.72 0.22 200 / 0.12), 0 32px 64px rgba(0,0,0,0.6)",
            }}
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onKeyDown={handleKeyDown}
            data-ocid="reactor-compare.dialog"
          >
            {/* Animated Cherenkov top border */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, oklch(0.72 0.22 200 / 0.5) 30%, oklch(0.75 0.2 256 / 0.7) 50%, oklch(0.72 0.22 200 / 0.5) 70%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-card/80 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"
                  aria-hidden="true"
                />
                <h2 className="font-display text-base font-bold text-foreground">
                  Reactor Comparison Dashboard
                </h2>
                <span className="hidden sm:inline text-xs text-muted-foreground">
                  Side-by-side simulator
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1.5 border-border/60"
                  onClick={handleExportCSV}
                  aria-label="Export comparison data as CSV"
                  data-ocid="reactor-compare.export_button"
                >
                  <Download className="h-3 w-3" />
                  <span className="hidden sm:inline">Export CSV</span>
                </Button>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 rounded-full"
                  onClick={onClose}
                  aria-label="Close comparison modal"
                  data-ocid="reactor-compare.close_button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Body — split panes */}
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
              {/* Dual pane area */}
              <div className="grid grid-cols-2 flex-1 min-h-0 divide-x divide-border/60 overflow-hidden">
                {/* Left pane */}
                <div
                  className="overflow-y-auto flex flex-col"
                  style={{
                    borderLeft: "2px solid transparent",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to bottom, oklch(0.72 0.22 200 / 0.6), oklch(0.75 0.2 256 / 0.2))",
                  }}
                >
                  <ReactorPane
                    paneId="left"
                    reactorType={leftType}
                    insertion={leftInsertion}
                    onReactorChange={setLeftType}
                    onInsertionChange={handleLeftInsertion}
                    shouldAnimate={shouldAnimate}
                  />
                </div>

                {/* Right pane */}
                <div
                  className="overflow-y-auto flex flex-col"
                  style={{
                    borderRight: "2px solid transparent",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(to bottom, oklch(0.78 0.2 286 / 0.6), oklch(0.78 0.2 286 / 0.2))",
                  }}
                >
                  <ReactorPane
                    paneId="right"
                    reactorType={rightType}
                    insertion={rightInsertion}
                    onReactorChange={setRightType}
                    onInsertionChange={handleRightInsertion}
                    shouldAnimate={shouldAnimate}
                  />
                </div>
              </div>

              {/* Bottom panel */}
              <div className="shrink-0 border-t border-border/60 bg-card/60 flex flex-col max-h-[45%] overflow-y-auto">
                {/* Timeline + sync controls */}
                <div className="flex items-center gap-4 px-4 py-2 border-b border-border/40 bg-card/40">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">
                    Timeline
                  </span>
                  <div className="flex-1">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[timeline]}
                      onValueChange={([v]) => handleTimeline(v)}
                      aria-label="Simulation timeline scrub"
                      data-ocid="reactor-compare.timeline_slider"
                    />
                  </div>
                  <span className="font-mono text-xs text-foreground shrink-0 w-10 text-right">
                    {timeline}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setSyncPanes((v) => !v)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-colors ${
                      syncPanes
                        ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                        : "bg-muted/40 border-border/40 text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={syncPanes}
                    aria-label={syncPanes ? "Unsync panes" : "Sync panes"}
                    data-ocid="reactor-compare.sync_toggle"
                  >
                    {syncPanes ? (
                      <Link2 className="h-3 w-3" />
                    ) : (
                      <Unlink2 className="h-3 w-3" />
                    )}
                    <span>Sync Panes</span>
                  </button>
                </div>

                {/* Tabs */}
                <div
                  className="flex items-center gap-0 border-b border-border/40"
                  role="tablist"
                  aria-label="Bottom panel tabs"
                >
                  {(["specs", "telemetry"] as const).map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      type="button"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 ${
                        activeTab === tab
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid={`reactor-compare.${tab}_tab`}
                    >
                      {tab === "specs"
                        ? "Reactor Specs"
                        : "Telemetry Comparison"}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="overflow-y-auto">
                  {activeTab === "specs" ? (
                    <div className="grid grid-cols-2 divide-x divide-border/40 text-xs">
                      {(
                        [
                          {
                            type: leftType,
                            label: "Left Pane",
                            color: "text-cyan-400",
                          },
                          {
                            type: rightType,
                            label: "Right Pane",
                            color: "text-violet-400",
                          },
                        ] as const
                      ).map(({ type, label, color }) => {
                        const d = REACTOR_DATA[type];
                        return (
                          <div
                            key={type}
                            className="px-4 py-3 flex flex-col gap-1.5"
                          >
                            <p
                              className={`text-[10px] font-mono uppercase tracking-wider ${color}`}
                            >
                              {label} — {d.label}
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-[11px]">
                              {d.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <TelemetryTable leftType={leftType} rightType={rightType} />
                  )}
                </div>
              </div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
