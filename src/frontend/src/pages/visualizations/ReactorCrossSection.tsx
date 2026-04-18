import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { animate, useMotionValue } from "motion/react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ReactorType = "PWR" | "BWR" | "CANDU";

// Power indicator derived from rod insertion 0-100
function getPowerState(insertion: number): {
  label: string;
  color: string;
  textColor: string;
  description: string;
} {
  if (insertion < 30) {
    return {
      label: "HIGH",
      color: "bg-red-500/20 border-red-500/40",
      textColor: "text-red-400",
      description:
        "Control rods withdrawn — high neutron flux, maximum heat generation",
    };
  }
  if (insertion < 70) {
    return {
      label: "NORMAL",
      color: "bg-emerald-500/20 border-emerald-500/40",
      textColor: "text-emerald-400",
      description:
        "Partial rod insertion — controlled chain reaction at rated power",
    };
  }
  return {
    label: "LOW / SHUTDOWN",
    color: "bg-blue-500/20 border-blue-500/40",
    textColor: "text-blue-400",
    description:
      "Rods fully inserted — chain reaction suppressed, decay heat only",
  };
}

// Temperature readouts for PWR (scale linearly with rod insertion)
function getPWRTemps(insertion: number): { inlet: number; outlet: number } {
  // insertion 0 = high power (hotter), insertion 100 = low power (cooler)
  const t = insertion / 100;
  const inlet = Math.round(295 - t * 25); // 295°C at high power, 270°C at shutdown
  const outlet = Math.round(330 - t * 25); // 330°C at high power, 305°C at shutdown
  return { inlet, outlet };
}

// Animated dashed coolant path
function CoolantPath({
  d,
  color,
  animate: shouldAnimate,
}: { d: string; color: string; animate: boolean }) {
  const dashOffset = useMotionValue(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      dashOffset.set(0);
      return;
    }
    const controls = animate(dashOffset, -200, {
      duration: 3,
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
      opacity="0.75"
    />
  );
}

// Fuel rod grid
function FuelRods({
  x,
  y,
  width,
  height,
}: { x: number; y: number; width: number; height: number }) {
  const cols = 4;
  const rows = 5;
  const rodW = (width - 10) / cols - 3;
  const rodH = (height - 10) / rows - 3;
  const rods: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) rods.push({ r, c });
  return (
    <>
      {rods.map(({ r, c }) => (
        <rect
          key={`rod-${r}-${c}`}
          x={x + 5 + c * (rodW + 3)}
          y={y + 5 + r * (rodH + 3)}
          width={rodW}
          height={rodH}
          rx={1.5}
          fill="#fbbf24"
          opacity={0.88}
        />
      ))}
    </>
  );
}

// ── PWR Diagram ──────────────────────────────────────────────────────────────
function PWRDiagram({
  insertion,
  showLabels,
  shouldAnimate,
}: {
  insertion: number;
  showLabels: boolean;
  shouldAnimate: boolean;
}) {
  const V_W = 600;
  const V_H = 420;
  const PV_X = 60;
  const PV_Y = 40;
  const PV_W = 280;
  const PV_H = 340;
  const CORE_X = PV_X + 30;
  const CORE_Y = PV_Y + 60;
  const CORE_W = 140;
  const CORE_H = 200;
  const MAX_ROD_H = CORE_H * 0.85;
  const rodH = (insertion / 100) * MAX_ROD_H;
  const rodW = 10;
  const numRods = 4;
  const rodSpacing = CORE_W / (numRods + 1);
  const SG_X = PV_X + PV_W + 30;
  const SG_Y = PV_Y + 40;
  const SG_W = 90;
  const SG_H = 200;
  const PRESS_X = PV_X + PV_W / 2 - 20;
  const PRESS_Y = PV_Y - 50;
  const PRESS_W = 40;
  const PRESS_H = 40;
  const hotLeg = `M ${PV_X + PV_W} ${PV_Y + 80} C ${PV_X + PV_W + 20} ${PV_Y + 80} ${SG_X} ${SG_Y + 40} ${SG_X} ${SG_Y + 40}`;
  const coldLeg = `M ${SG_X} ${SG_Y + SG_H - 40} C ${SG_X} ${SG_Y + SG_H} ${PV_X + PV_W + 20} ${PV_Y + PV_H - 60} ${PV_X + PV_W} ${PV_Y + PV_H - 60}`;
  const powerColor =
    insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const power = getPowerState(insertion);
  const temps = getPWRTemps(insertion);

  return (
    <svg
      viewBox={`0 0 ${V_W} ${V_H}`}
      width="100%"
      style={{ aspectRatio: `${V_W} / ${V_H}`, display: "block" }}
      role="img"
      aria-label="Simplified PWR cross-section with animated coolant flow"
    >
      <title>Pressurized Water Reactor Cross-Section (Schematic)</title>
      <rect width={V_W} height={V_H} fill="transparent" />
      {/* Vessel glow */}
      <rect
        x={PV_X - 4}
        y={PV_Y - 4}
        width={PV_W + 8}
        height={PV_H + 8}
        rx={15}
        fill="none"
        stroke="#374151"
        strokeWidth={1}
        opacity={0.4}
      />
      {/* Pressure Vessel */}
      <rect
        x={PV_X}
        y={PV_Y}
        width={PV_W}
        height={PV_H}
        rx={12}
        fill="#111827"
        stroke="#6b7280"
        strokeWidth={2.5}
      />
      {showLabels && (
        <text
          x={PV_X + 4}
          y={PV_Y - 9}
          fill="#9ca3af"
          fontSize="11"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Pressure Vessel
        </text>
      )}
      {/* Core */}
      <rect
        x={CORE_X}
        y={CORE_Y}
        width={CORE_W}
        height={CORE_H}
        rx={5}
        fill="#fbbf2410"
        stroke="#fbbf2450"
        strokeWidth={1.5}
      />
      {showLabels && (
        <text
          x={CORE_X + CORE_W / 2}
          y={CORE_Y + CORE_H + 18}
          textAnchor="middle"
          fill="#fbbf24"
          fontSize="10"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Reactor Core
        </text>
      )}
      <FuelRods
        x={CORE_X + 5}
        y={CORE_Y + 10}
        width={CORE_W - 10}
        height={CORE_H - 20}
      />
      {/* Control rods */}
      {Array.from({ length: numRods }, (_, i) => {
        const rx = CORE_X + rodSpacing * (i + 1) - rodW / 2;
        return (
          <g key={`pwr-ctrl-rx${rx.toFixed(0)}`}>
            <rect
              x={rx - 1}
              y={CORE_Y - 12}
              width={rodW + 2}
              height={14}
              rx={2}
              fill="#1f2937"
              stroke="#4b5563"
              strokeWidth={0.8}
              opacity={0.7}
            />
            <rect
              x={rx}
              y={CORE_Y}
              width={rodW}
              height={rodH}
              rx={2}
              fill="#374151"
              stroke="#6b7280"
              strokeWidth={1}
              opacity={0.95}
            />
          </g>
        );
      })}
      {showLabels && rodH > 10 && (
        <text
          x={CORE_X + CORE_W / 2}
          y={CORE_Y - 16}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="10"
          fontFamily="sans-serif"
        >
          Control Rods
        </text>
      )}
      {/* Pressurizer */}
      <rect
        x={PRESS_X}
        y={PRESS_Y}
        width={PRESS_W}
        height={PRESS_H}
        rx={7}
        fill="#1d4ed820"
        stroke="#3b82f6"
        strokeWidth={1.5}
      />
      <line
        x1={PRESS_X + PRESS_W / 2}
        y1={PRESS_Y + PRESS_H}
        x2={PRESS_X + PRESS_W / 2}
        y2={PV_Y}
        stroke="#3b82f640"
        strokeWidth={4}
      />
      {showLabels && (
        <text
          x={PRESS_X + PRESS_W / 2}
          y={PRESS_Y - 7}
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="10"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Pressurizer
        </text>
      )}
      {/* Steam generator */}
      <rect
        x={SG_X}
        y={SG_Y}
        width={SG_W}
        height={SG_H}
        rx={8}
        fill="#581c8720"
        stroke="#a855f7"
        strokeWidth={1.5}
      />
      {([20, 52, 84, 116, 148] as const).map((yOff) => (
        <line
          key={`sg-${yOff}`}
          x1={SG_X + 12}
          y1={SG_Y + yOff}
          x2={SG_X + SG_W - 12}
          y2={SG_Y + yOff}
          stroke="#a855f730"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
      {showLabels && (
        <>
          <text
            x={SG_X + SG_W / 2}
            y={SG_Y - 9}
            textAnchor="middle"
            fill="#c084fc"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Steam Generator
          </text>
          <text
            x={SG_X + SG_W / 2}
            y={SG_Y + SG_H + 16}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="9"
            fontFamily="sans-serif"
          >
            → to turbine
          </text>
        </>
      )}
      {/* Coolant flow */}
      {shouldAnimate ? (
        <>
          <CoolantPath d={hotLeg} color="#f87171" animate />
          <CoolantPath d={coldLeg} color="#60a5fa" animate />
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
            stroke="#60a5fa"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
        </>
      )}
      {showLabels && (
        <>
          <text
            x={PV_X + PV_W + 8}
            y={PV_Y + 68}
            fill="#f87171"
            fontSize="8.5"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            hot leg →
          </text>
          <text
            x={PV_X + PV_W + 8}
            y={PV_Y + PV_H - 48}
            fill="#60a5fa"
            fontSize="8.5"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            ← cold leg
          </text>
        </>
      )}
      {/* Power indicator box */}
      <rect
        x={V_W - 124}
        y={18}
        width={108}
        height={58}
        rx={9}
        fill="#0d111888"
        stroke={powerColor}
        strokeWidth={1.5}
      />
      <text
        x={V_W - 70}
        y={36}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="8.5"
        fontFamily="monospace"
        letterSpacing="0.05em"
      >
        POWER OUTPUT
      </text>
      <text
        x={V_W - 70}
        y={58}
        textAnchor="middle"
        fill={powerColor}
        fontSize="13"
        fontWeight="bold"
        fontFamily="monospace"
      >
        {power.label}
      </text>
      {/* Temperature readouts */}
      <rect
        x={PV_X}
        y={V_H - 80}
        width={115}
        height={60}
        rx={8}
        fill="#0d111888"
        stroke="#374151"
        strokeWidth={1}
      />
      <text
        x={PV_X + 8}
        y={V_H - 63}
        fill="#9ca3af"
        fontSize="8"
        fontFamily="monospace"
        letterSpacing="0.04em"
      >
        COOLANT TEMPS
      </text>
      <text
        x={PV_X + 8}
        y={V_H - 48}
        fill="#60a5fa"
        fontSize="9"
        fontFamily="monospace"
      >
        In: {temps.inlet}°C
      </text>
      <text
        x={PV_X + 8}
        y={V_H - 34}
        fill="#f87171"
        fontSize="9"
        fontFamily="monospace"
      >
        Out: {temps.outlet}°C
      </text>
      <text
        x={PV_X}
        y={V_H - 10}
        fill="#4b5563"
        fontSize="8"
        fontFamily="sans-serif"
      >
        Schematic only — not to scale, not for operational use
      </text>
    </svg>
  );
}

// ── BWR Diagram ──────────────────────────────────────────────────────────────
function BWRDiagram({
  insertion,
  showLabels,
  shouldAnimate,
}: {
  insertion: number;
  showLabels: boolean;
  shouldAnimate: boolean;
}) {
  const V_W = 600;
  const V_H = 420;
  const RPV_X = 80;
  const RPV_Y = 50;
  const RPV_W = 260;
  const RPV_H = 300;
  const CORE_X = RPV_X + 40;
  const CORE_Y = RPV_Y + 120;
  const CORE_W = 130;
  const CORE_H = 120;
  const MAX_ROD_H = CORE_H * 0.85;
  const rodH = (insertion / 100) * MAX_ROD_H;
  const rodW = 10;
  const numRods = 4;
  const rodSpacing = CORE_W / (numRods + 1);
  const SEP_X = RPV_X + 30;
  const SEP_Y = RPV_Y + 30;
  const SEP_W = RPV_W - 60;
  const SEP_H = 60;
  const POOL_X = RPV_X - 20;
  const POOL_Y = RPV_Y + RPV_H + 20;
  const POOL_W = RPV_W + 40;
  const POOL_H = 50;
  const TURB_X = RPV_X + RPV_W + 40;
  const TURB_Y = RPV_Y + 30;
  const TURB_W = 110;
  const TURB_H = 60;
  // Steam line from vessel top to turbine
  const steamLine = `M ${RPV_X + RPV_W / 2} ${RPV_Y} L ${RPV_X + RPV_W / 2} ${RPV_Y - 20} L ${TURB_X} ${TURB_Y + TURB_H / 2}`;
  const condensateLine = `M ${TURB_X + TURB_W} ${TURB_Y + TURB_H} C ${TURB_X + TURB_W + 20} ${TURB_Y + TURB_H + 40} ${RPV_X + RPV_W} ${RPV_Y + RPV_H - 30} ${RPV_X + RPV_W} ${RPV_Y + RPV_H - 30}`;
  const powerColor =
    insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const power = getPowerState(insertion);
  const temps = getPWRTemps(insertion);
  const bwrInlet = Math.round(temps.inlet - 10);
  const bwrOutlet = Math.round(temps.outlet - 5);

  return (
    <svg
      viewBox={`0 0 ${V_W} ${V_H}`}
      width="100%"
      style={{ aspectRatio: `${V_W} / ${V_H}`, display: "block" }}
      role="img"
      aria-label="Simplified BWR cross-section diagram"
    >
      <title>Boiling Water Reactor Cross-Section (Schematic)</title>
      <rect width={V_W} height={V_H} fill="transparent" />
      {/* Reactor Pressure Vessel */}
      <rect
        x={RPV_X}
        y={RPV_Y}
        width={RPV_W}
        height={RPV_H}
        rx={12}
        fill="#111827"
        stroke="#6b7280"
        strokeWidth={2.5}
      />
      {showLabels && (
        <text
          x={RPV_X + 4}
          y={RPV_Y - 9}
          fill="#9ca3af"
          fontSize="11"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Reactor Pressure Vessel
        </text>
      )}
      {/* Steam separator zone */}
      <rect
        x={SEP_X}
        y={SEP_Y}
        width={SEP_W}
        height={SEP_H}
        rx={5}
        fill="#7dd3fc18"
        stroke="#7dd3fc50"
        strokeWidth={1.5}
        strokeDasharray="4 2"
      />
      {showLabels && (
        <text
          x={SEP_X + SEP_W / 2}
          y={SEP_Y + SEP_H / 2 + 4}
          textAnchor="middle"
          fill="#7dd3fc"
          fontSize="9"
          fontFamily="sans-serif"
        >
          Steam Separator / Dryer
        </text>
      )}
      {/* Core region */}
      <rect
        x={CORE_X}
        y={CORE_Y}
        width={CORE_W}
        height={CORE_H}
        rx={5}
        fill="#fbbf2410"
        stroke="#fbbf2450"
        strokeWidth={1.5}
      />
      {showLabels && (
        <text
          x={CORE_X + CORE_W / 2}
          y={CORE_Y + CORE_H + 16}
          textAnchor="middle"
          fill="#fbbf24"
          fontSize="10"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Reactor Core
        </text>
      )}
      <FuelRods
        x={CORE_X + 5}
        y={CORE_Y + 5}
        width={CORE_W - 10}
        height={CORE_H - 10}
      />
      {/* Control rods (insert from bottom in BWR) */}
      {Array.from({ length: numRods }, (_, i) => {
        const rx = CORE_X + rodSpacing * (i + 1) - rodW / 2;
        const ry = CORE_Y + CORE_H - rodH;
        return (
          <g key={`bwr-ctrl-rx${rx.toFixed(0)}`}>
            <rect
              x={rx}
              y={ry}
              width={rodW}
              height={rodH}
              rx={2}
              fill="#374151"
              stroke="#6b7280"
              strokeWidth={1}
              opacity={0.95}
            />
          </g>
        );
      })}
      {showLabels && (
        <text
          x={CORE_X + CORE_W / 2}
          y={CORE_Y + CORE_H + 30}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="9"
          fontFamily="sans-serif"
        >
          ↑ Control Rods (bottom-entry)
        </text>
      )}
      {/* Steam line */}
      {shouldAnimate ? (
        <CoolantPath d={steamLine} color="#7dd3fc" animate />
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
      {showLabels && (
        <text
          x={RPV_X + RPV_W / 2 + 8}
          y={RPV_Y - 24}
          fill="#7dd3fc"
          fontSize="8.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Steam →
        </text>
      )}
      {/* Turbine box */}
      <rect
        x={TURB_X}
        y={TURB_Y}
        width={TURB_W}
        height={TURB_H}
        rx={8}
        fill="#0f172a"
        stroke="#7dd3fc"
        strokeWidth={1.5}
      />
      <text
        x={TURB_X + TURB_W / 2}
        y={TURB_Y + 22}
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Turbine /
      </text>
      <text
        x={TURB_X + TURB_W / 2}
        y={TURB_Y + 36}
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Generator
      </text>
      <text
        x={TURB_X + TURB_W / 2}
        y={TURB_Y + 52}
        textAnchor="middle"
        fill="#4b5563"
        fontSize="8"
        fontFamily="sans-serif"
      >
        (direct cycle)
      </text>
      {/* Condensate return */}
      {shouldAnimate ? (
        <CoolantPath d={condensateLine} color="#60a5fa" animate />
      ) : (
        <path
          d={condensateLine}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={3}
          strokeDasharray="10 6"
          opacity={0.75}
        />
      )}
      {showLabels && (
        <text
          x={TURB_X + TURB_W + 8}
          y={TURB_Y + TURB_H + 14}
          fill="#60a5fa"
          fontSize="8"
          fontFamily="sans-serif"
        >
          ← Condensate return
        </text>
      )}
      {/* Suppression pool */}
      <rect
        x={POOL_X}
        y={POOL_Y}
        width={POOL_W}
        height={POOL_H}
        rx={8}
        fill="#1e3a5f"
        stroke="#3b82f6"
        strokeWidth={1.5}
      />
      {showLabels && (
        <text
          x={POOL_X + POOL_W / 2}
          y={POOL_Y + POOL_H / 2 + 4}
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="10"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Suppression Pool (Wetwell)
        </text>
      )}
      {/* Vent pipes from vessel to pool */}
      {[0.3, 0.7].map((frac) => (
        <line
          key={`vent-${frac}`}
          x1={RPV_X + frac * RPV_W}
          y1={RPV_Y + RPV_H}
          x2={POOL_X + frac * POOL_W}
          y2={POOL_Y}
          stroke="#3b82f650"
          strokeWidth={6}
        />
      ))}
      {showLabels && (
        <text
          x={POOL_X + POOL_W / 2}
          y={POOL_Y - 6}
          textAnchor="middle"
          fill="#4b5563"
          fontSize="8"
          fontFamily="sans-serif"
        >
          ↓ Emergency vent lines
        </text>
      )}
      {/* Power indicator */}
      <rect
        x={V_W - 124}
        y={18}
        width={108}
        height={58}
        rx={9}
        fill="#0d111888"
        stroke={powerColor}
        strokeWidth={1.5}
      />
      <text
        x={V_W - 70}
        y={36}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="8.5"
        fontFamily="monospace"
        letterSpacing="0.05em"
      >
        POWER OUTPUT
      </text>
      <text
        x={V_W - 70}
        y={58}
        textAnchor="middle"
        fill={powerColor}
        fontSize="13"
        fontWeight="bold"
        fontFamily="monospace"
      >
        {power.label}
      </text>
      {/* Temperature readouts */}
      <rect
        x={TURB_X}
        y={TURB_Y + TURB_H + 30}
        width={115}
        height={55}
        rx={8}
        fill="#0d111888"
        stroke="#374151"
        strokeWidth={1}
      />
      <text
        x={TURB_X + 8}
        y={TURB_Y + TURB_H + 47}
        fill="#9ca3af"
        fontSize="8"
        fontFamily="monospace"
        letterSpacing="0.04em"
      >
        COOLANT TEMPS
      </text>
      <text
        x={TURB_X + 8}
        y={TURB_Y + TURB_H + 62}
        fill="#60a5fa"
        fontSize="9"
        fontFamily="monospace"
      >
        In: {bwrInlet}°C
      </text>
      <text
        x={TURB_X + 8}
        y={TURB_Y + TURB_H + 76}
        fill="#f87171"
        fontSize="9"
        fontFamily="monospace"
      >
        Out: {bwrOutlet}°C (steam)
      </text>
      <text
        x={RPV_X}
        y={V_H - 10}
        fill="#4b5563"
        fontSize="8"
        fontFamily="sans-serif"
      >
        Schematic only — not to scale, not for operational use
      </text>
    </svg>
  );
}

// ── CANDU Diagram ─────────────────────────────────────────────────────────────
function CANDUDiagram({
  insertion,
  showLabels,
  shouldAnimate,
}: {
  insertion: number;
  showLabels: boolean;
  shouldAnimate: boolean;
}) {
  const V_W = 600;
  const V_H = 420;
  const CAL_X = 60;
  const CAL_Y = 100;
  const CAL_W = 320;
  const CAL_H = 180;
  const numTubes = 7;
  const tubeSpacing = CAL_H / (numTubes + 1);
  const SG_X = CAL_X + CAL_W + 40;
  const SG_Y = CAL_Y + 20;
  const SG_W = 80;
  const SG_H = 140;
  const ARM_X = CAL_X - 60;
  const ARM_Y = CAL_Y + CAL_H / 2 - 10;
  const ARM_W = 55;
  const ARM_H = 20;
  const ARM2_X = CAL_X + CAL_W;
  const ARM2_Y = ARM_Y;
  const ARM2_W = 55;
  const ARM2_H = 20;
  const coolantLoop = `M ${CAL_X + CAL_W} ${CAL_Y + CAL_H / 2} C ${CAL_X + CAL_W + 20} ${CAL_Y + CAL_H / 2} ${SG_X} ${SG_Y + 30} ${SG_X} ${SG_Y + 30}`;
  const returnLoop = `M ${SG_X} ${SG_Y + SG_H - 30} C ${SG_X} ${SG_Y + SG_H} ${CAL_X + CAL_W + 20} ${CAL_Y + CAL_H - 20} ${CAL_X + CAL_W} ${CAL_Y + CAL_H - 20}`;
  const powerColor =
    insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const power = getPowerState(insertion);
  const temps = getPWRTemps(insertion);
  const canduInlet = Math.round(temps.inlet - 15);
  const canduOutlet = Math.round(temps.outlet - 15);

  return (
    <svg
      viewBox={`0 0 ${V_W} ${V_H}`}
      width="100%"
      style={{ aspectRatio: `${V_W} / ${V_H}`, display: "block" }}
      role="img"
      aria-label="Simplified CANDU reactor cross-section diagram"
    >
      <title>CANDU Reactor Cross-Section (Schematic)</title>
      <rect width={V_W} height={V_H} fill="transparent" />
      {/* Calandria vessel */}
      <rect
        x={CAL_X}
        y={CAL_Y}
        width={CAL_W}
        height={CAL_H}
        rx={10}
        fill="#111827"
        stroke="#6b7280"
        strokeWidth={2.5}
      />
      {showLabels && (
        <>
          <text
            x={CAL_X + 4}
            y={CAL_Y - 9}
            fill="#9ca3af"
            fontSize="11"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Calandria Vessel
          </text>
          <text
            x={CAL_X + CAL_W / 2}
            y={CAL_Y + CAL_H + 18}
            textAnchor="middle"
            fill="#22d3ee"
            fontSize="9"
            fontFamily="sans-serif"
          >
            Heavy Water Moderator (D₂O)
          </text>
        </>
      )}
      {/* D2O moderator fill hint */}
      <rect
        x={CAL_X + 2}
        y={CAL_Y + 2}
        width={CAL_W - 4}
        height={CAL_H - 4}
        rx={9}
        fill="#0e7490"
        opacity={0.08}
      />
      {/* Pressure tubes / fuel channels (horizontal) */}
      {Array.from({ length: numTubes }, (_, i) => {
        const ty = CAL_Y + tubeSpacing * (i + 1);
        const isFueled = i < 5;
        return (
          <g key={`tube-ty${Math.round(CAL_Y + tubeSpacing * (i + 1))}`}>
            {/* Pressure tube */}
            <line
              x1={CAL_X}
              y1={ty}
              x2={CAL_X + CAL_W}
              y2={ty}
              stroke={isFueled ? "#fbbf24" : "#4b5563"}
              strokeWidth={isFueled ? 7 : 5}
              strokeLinecap="round"
              opacity={0.85}
            />
            {/* Fuel bundles inside tube */}
            {isFueled &&
              Array.from({ length: 4 }, (__, j) => (
                <circle
                  key={`bundle-cx${Math.round(CAL_X + (CAL_W / 5) * (j + 1))}-ty${Math.round(ty)}`}
                  cx={CAL_X + (CAL_W / 5) * (j + 1)}
                  cy={ty}
                  r={4}
                  fill="#fbbf24"
                  opacity={0.9}
                />
              ))}
          </g>
        );
      })}
      {showLabels && (
        <text
          x={CAL_X + CAL_W / 2}
          y={CAL_Y + tubeSpacing - 6}
          textAnchor="middle"
          fill="#fbbf24"
          fontSize="9"
          fontFamily="sans-serif"
        >
          ← Pressure Tube + Fuel Bundles (UO₂, natural U) →
        </text>
      )}
      {/* Online refueling arms */}
      <rect
        x={ARM_X}
        y={ARM_Y}
        width={ARM_W}
        height={ARM_H}
        rx={5}
        fill="#1f293780"
        stroke="#4ade80"
        strokeWidth={1.5}
      />
      <rect
        x={ARM2_X}
        y={ARM2_Y}
        width={ARM2_W}
        height={ARM2_H}
        rx={5}
        fill="#1f293780"
        stroke="#4ade80"
        strokeWidth={1.5}
      />
      {showLabels && (
        <>
          <text
            x={ARM_X + ARM_W / 2}
            y={ARM_Y - 7}
            textAnchor="middle"
            fill="#4ade80"
            fontSize="8.5"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Fueling
          </text>
          <text
            x={ARM_X + ARM_W / 2}
            y={ARM_Y + ARM_H + 12}
            textAnchor="middle"
            fill="#4ade80"
            fontSize="7.5"
            fontFamily="sans-serif"
          >
            Machine A
          </text>
          <text
            x={ARM2_X + ARM2_W / 2}
            y={ARM2_Y - 7}
            textAnchor="middle"
            fill="#4ade80"
            fontSize="8.5"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Fueling
          </text>
          <text
            x={ARM2_X + ARM2_W / 2}
            y={ARM2_Y + ARM2_H + 12}
            textAnchor="middle"
            fill="#4ade80"
            fontSize="7.5"
            fontFamily="sans-serif"
          >
            Machine B
          </text>
          <text
            x={CAL_X + CAL_W / 2}
            y={CAL_Y + CAL_H + 32}
            textAnchor="middle"
            fill="#4ade80"
            fontSize="8.5"
            fontFamily="sans-serif"
          >
            ↕ Online refueling — no shutdown required
          </text>
        </>
      )}
      {/* Steam generator */}
      <rect
        x={SG_X}
        y={SG_Y}
        width={SG_W}
        height={SG_H}
        rx={8}
        fill="#581c8720"
        stroke="#a855f7"
        strokeWidth={1.5}
      />
      {([15, 40, 65, 90, 115] as const).map((yOff) => (
        <line
          key={`candu-sg-${yOff}`}
          x1={SG_X + 10}
          y1={SG_Y + yOff}
          x2={SG_X + SG_W - 10}
          y2={SG_Y + yOff}
          stroke="#a855f730"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
      {showLabels && (
        <>
          <text
            x={SG_X + SG_W / 2}
            y={SG_Y - 9}
            textAnchor="middle"
            fill="#c084fc"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Steam Generator
          </text>
          <text
            x={SG_X + SG_W / 2}
            y={SG_Y + SG_H + 16}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="9"
            fontFamily="sans-serif"
          >
            → to turbine
          </text>
        </>
      )}
      {/* Coolant flow */}
      {shouldAnimate ? (
        <>
          <CoolantPath d={coolantLoop} color="#f87171" animate />
          <CoolantPath d={returnLoop} color="#60a5fa" animate />
        </>
      ) : (
        <>
          <path
            d={coolantLoop}
            fill="none"
            stroke="#f87171"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
          <path
            d={returnLoop}
            fill="none"
            stroke="#60a5fa"
            strokeWidth={3}
            strokeDasharray="10 6"
            opacity={0.75}
          />
        </>
      )}
      {showLabels && (
        <>
          <text
            x={CAL_X + CAL_W + 8}
            y={CAL_Y + CAL_H / 2 - 6}
            fill="#f87171"
            fontSize="8"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            hot →
          </text>
          <text
            x={CAL_X + CAL_W + 8}
            y={CAL_Y + CAL_H - 8}
            fill="#60a5fa"
            fontSize="8"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            ← cold
          </text>
        </>
      )}
      {/* Power indicator */}
      <rect
        x={V_W - 124}
        y={18}
        width={108}
        height={58}
        rx={9}
        fill="#0d111888"
        stroke={powerColor}
        strokeWidth={1.5}
      />
      <text
        x={V_W - 70}
        y={36}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="8.5"
        fontFamily="monospace"
        letterSpacing="0.05em"
      >
        POWER OUTPUT
      </text>
      <text
        x={V_W - 70}
        y={58}
        textAnchor="middle"
        fill={powerColor}
        fontSize="13"
        fontWeight="bold"
        fontFamily="monospace"
      >
        {power.label}
      </text>
      {/* Temperature readouts */}
      <rect
        x={CAL_X}
        y={V_H - 80}
        width={115}
        height={60}
        rx={8}
        fill="#0d111888"
        stroke="#374151"
        strokeWidth={1}
      />
      <text
        x={CAL_X + 8}
        y={V_H - 63}
        fill="#9ca3af"
        fontSize="8"
        fontFamily="monospace"
        letterSpacing="0.04em"
      >
        COOLANT TEMPS
      </text>
      <text
        x={CAL_X + 8}
        y={V_H - 48}
        fill="#60a5fa"
        fontSize="9"
        fontFamily="monospace"
      >
        In: {canduInlet}°C
      </text>
      <text
        x={CAL_X + 8}
        y={V_H - 34}
        fill="#f87171"
        fontSize="9"
        fontFamily="monospace"
      >
        Out: {canduOutlet}°C
      </text>
      <text
        x={CAL_X}
        y={V_H - 10}
        fill="#4b5563"
        fontSize="8"
        fontFamily="sans-serif"
      >
        Schematic only — not to scale, not for operational use
      </text>
    </svg>
  );
}

// Reactor type descriptions
const REACTOR_INFO: Record<
  ReactorType,
  {
    title: string;
    shortDesc: string;
    components: { term: string; desc: string }[];
  }
> = {
  PWR: {
    title: "Pressurized Water Reactor (PWR)",
    shortDesc:
      "Most common reactor type worldwide. Primary coolant is kept liquid under ~155 bar pressure. Heat transferred via steam generators to a separate secondary loop.",
    components: [
      {
        term: "Pressure Vessel",
        desc: "Heavy steel shell (8–12 in thick) containing core and primary coolant at ~155 bar. Keeps water liquid above 300 °C.",
      },
      {
        term: "Fuel Rods",
        desc: "Cylindrical UO₂ pellets in Zircaloy cladding. Fission heat is generated here and transferred to the coolant.",
      },
      {
        term: "Control Rods",
        desc: "Boron or hafnium rods that absorb neutrons. Insertion from above reduces reactivity; full insertion shuts down the reaction.",
      },
      {
        term: "Pressurizer",
        desc: "Maintains system pressure so primary coolant stays liquid. Heaters and spray nozzles regulate pressure precisely.",
      },
      {
        term: "Steam Generator",
        desc: "Heat exchanger between primary (radioactive) and secondary (clean) loops. Secondary water boils to drive the turbine.",
      },
      {
        term: "Primary Coolant",
        desc: "Hot leg (red) carries heat from core to steam generator. Cold leg (blue) returns cooled water to the core.",
      },
    ],
  },
  BWR: {
    title: "Boiling Water Reactor (BWR)",
    shortDesc:
      "Water boils directly inside the reactor vessel, producing steam that drives the turbine directly — no steam generator needed. Control rods insert from the bottom.",
    components: [
      {
        term: "Reactor Pressure Vessel",
        desc: "Houses both the reactor core and the steam separator. Water boils at ~70 bar, producing steam directly at ~285 °C.",
      },
      {
        term: "Steam Separator / Dryer",
        desc: "Located above the core inside the vessel. Separates steam from liquid water before it reaches the turbine.",
      },
      {
        term: "Control Rods (bottom-entry)",
        desc: "Unlike PWRs, BWR control rods insert from below using hydraulic drives. This simplifies the vessel head.",
      },
      {
        term: "Direct Steam Cycle",
        desc: "Steam from the reactor goes directly to the turbine. No secondary loop needed, but turbine becomes mildly radioactive.",
      },
      {
        term: "Suppression Pool (Wetwell)",
        desc: "Large water pool below the vessel. In an accident, excess steam is vented here to rapidly condense it and reduce pressure.",
      },
      {
        term: "Fuel Assemblies",
        desc: "Similar UO₂ fuel in Zircaloy cladding, grouped in 8×8 or 10×10 arrays. Slightly lower enrichment than PWR.",
      },
    ],
  },
  CANDU: {
    title: "CANDU Reactor (CANadian Deuterium Uranium)",
    shortDesc:
      "Uses heavy water (D₂O) as both moderator and coolant in separate systems. Pressure tubes replace a large pressure vessel, enabling online refueling without shutdown.",
    components: [
      {
        term: "Calandria Vessel",
        desc: "Large horizontal tank filled with heavy water moderator at low pressure and near room temperature. Not a pressure vessel.",
      },
      {
        term: "Pressure Tubes",
        desc: "Individual horizontal zirconium-alloy tubes through the calandria carry pressurized D₂O coolant and fuel bundles at ~100 bar.",
      },
      {
        term: "Natural Uranium Fuel",
        desc: "CANDU uses unenriched natural uranium (0.7% U-235). Low fuel costs, but larger core required than enriched-fuel reactors.",
      },
      {
        term: "Online Refueling",
        desc: "Two fueling machines work simultaneously from each end while the reactor operates at full power — a unique CANDU advantage.",
      },
      {
        term: "Heavy Water Moderator",
        desc: "D₂O has low neutron absorption, enabling use of natural uranium. Separate from the pressurized coolant circuit.",
      },
      {
        term: "Steam Generators",
        desc: "Heavy water coolant transfers heat to light water in steam generators, producing steam for the turbine generator.",
      },
    ],
  },
};

const REACTOR_TABS: { id: ReactorType; label: string; badge: string }[] = [
  { id: "PWR", label: "PWR", badge: "Pressurized Water" },
  { id: "BWR", label: "BWR", badge: "Boiling Water" },
  { id: "CANDU", label: "CANDU", badge: "Heavy Water" },
];

export default function ReactorCrossSection() {
  const [insertion, setInsertion] = useState(40);
  const [showLabels, setShowLabels] = useState(true);
  const [reactorType, setReactorType] = useState<ReactorType>("PWR");
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;

  const power = getPowerState(insertion);
  const info = REACTOR_INFO[reactorType];

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      data-ocid="reactor-viz.page"
    >
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge className="audience-badge audience-intermediate">
              Intermediate
            </Badge>
            <Badge className="audience-badge audience-advanced">
              SVG · Animated
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Reactor Cross-Section Explorer
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Simplified schematic views of PWR, BWR, and CANDU reactors. Adjust
            the control rod slider to see how insertion affects power output and
            coolant temperatures.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6">
        {/* Reactor type tabs */}
        <div
          className="flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm p-1 w-fit shadow-sm"
          role="tablist"
          aria-label="Reactor type selector"
        >
          {REACTOR_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={reactorType === tab.id}
              onClick={() => setReactorType(tab.id)}
              data-ocid={`reactor-viz.type_tab.${tab.id.toLowerCase()}`}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                reactorType === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs font-normal hidden sm:inline ${reactorType === tab.id ? "opacity-80" : "opacity-50"}`}
              >
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Diagram */}
        <div
          className="rounded-2xl border border-border bg-card p-3 sm:p-4"
          data-ocid="reactor-viz.svg_diagram"
        >
          {reactorType === "PWR" && (
            <PWRDiagram
              insertion={insertion}
              showLabels={showLabels}
              shouldAnimate={shouldAnimate}
            />
          )}
          {reactorType === "BWR" && (
            <BWRDiagram
              insertion={insertion}
              showLabels={showLabels}
              shouldAnimate={shouldAnimate}
            />
          )}
          {reactorType === "CANDU" && (
            <CANDUDiagram
              insertion={insertion}
              showLabels={showLabels}
              shouldAnimate={shouldAnimate}
            />
          )}
        </div>

        {/* Controls row */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="reactor-viz.controls"
        >
          {/* Control Rod Slider */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="rod-insertion"
                className="text-sm font-semibold text-foreground"
              >
                Control Rod Insertion
              </label>
              <span className="font-mono text-base font-bold text-foreground">
                {insertion}%
              </span>
            </div>
            <Slider
              id="rod-insertion"
              min={0}
              max={100}
              step={1}
              value={[insertion]}
              onValueChange={([v]) => setInsertion(v)}
              aria-label="Control rod insertion percentage"
              aria-valuenow={insertion}
              aria-valuemin={0}
              aria-valuemax={100}
              data-ocid="reactor-viz.rod_slider"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>0% — Withdrawn (High Power)</span>
              <span>100% — Full Insertion</span>
            </div>
          </div>

          {/* Power Status */}
          <div
            className={`rounded-xl border p-5 ${power.color}`}
            aria-live="polite"
            data-ocid="reactor-viz.power_status"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${insertion < 30 ? "bg-red-400" : insertion < 70 ? "bg-emerald-400" : "bg-blue-400"}`}
                aria-hidden="true"
              />
              <span
                className={`font-mono text-sm font-bold ${power.textColor}`}
              >
                {power.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {power.description}
            </p>
            {/* Temperature readout panel */}
            {reactorType === "PWR" &&
              (() => {
                const t = getPWRTemps(insertion);
                return (
                  <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Coolant In
                      </p>
                      <p className="font-mono text-sm font-bold text-blue-400">
                        {t.inlet}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Coolant Out
                      </p>
                      <p className="font-mono text-sm font-bold text-red-400">
                        {t.outlet}°C
                      </p>
                    </div>
                  </div>
                );
              })()}
            {reactorType === "BWR" &&
              (() => {
                const t = getPWRTemps(insertion);
                return (
                  <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Feed Water In
                      </p>
                      <p className="font-mono text-sm font-bold text-blue-400">
                        {t.inlet - 10}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Steam Out
                      </p>
                      <p className="font-mono text-sm font-bold text-red-400">
                        {t.outlet - 5}°C
                      </p>
                    </div>
                  </div>
                );
              })()}
            {reactorType === "CANDU" &&
              (() => {
                const t = getPWRTemps(insertion);
                return (
                  <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        D₂O Coolant In
                      </p>
                      <p className="font-mono text-sm font-bold text-blue-400">
                        {t.inlet - 15}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        D₂O Coolant Out
                      </p>
                      <p className="font-mono text-sm font-bold text-red-400">
                        {t.outlet - 15}°C
                      </p>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>

        {/* Labels toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-1 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-7 px-3 text-xs"
              onClick={() => setShowLabels((v) => !v)}
              data-ocid="reactor-viz.toggle_labels_button"
              aria-pressed={showLabels}
            >
              {showLabels ? "Hide Labels" : "Show Labels"}
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {showLabels
              ? "Click to hide diagram labels"
              : "Click to show diagram labels"}
          </span>
        </div>

        {/* Reactor description */}
        <div className="rounded-xl border border-border bg-card/60 px-5 py-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {info.shortDesc}
          </p>
        </div>

        {/* Component descriptions */}
        <div
          className="rounded-xl border border-border bg-card p-5"
          data-ocid="reactor-viz.component_descriptions"
        >
          <h2 className="font-display font-bold text-foreground mb-3">
            {info.title} — Component Guide
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {info.components.map(({ term, desc }) => (
              <div key={term} className="flex flex-col gap-0.5">
                <dt className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {term}
                </dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
