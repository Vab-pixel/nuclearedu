import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { animate, useMotionValue } from "motion/react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useState } from "react";

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

// Animated dashed coolant path
function CoolantPath({
  d,
  color,
  animate: shouldAnimate,
}: {
  d: string;
  color: string;
  animate: boolean;
}) {
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
      const unsubscribe = dashOffset.on("change", (v) => {
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = String(v);
        }
      });
      return unsubscribe;
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

// Fuel rod component
function FuelRods({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const cols = 4;
  const rows = 5;
  const rodW = (width - 10) / cols - 3;
  const rodH = (height - 10) / rows - 3;
  const rods: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rods.push({ r, c });
    }
  }
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

export default function ReactorCrossSection() {
  const [insertion, setInsertion] = useState(40);
  const [showLabels, setShowLabels] = useState(true);
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;

  const power = getPowerState(insertion);

  // SVG viewBox constants
  const V_W = 600;
  const V_H = 420;

  // Pressure vessel
  const PV_X = 60;
  const PV_Y = 40;
  const PV_W = 280;
  const PV_H = 340;

  // Core region
  const CORE_X = PV_X + 30;
  const CORE_Y = PV_Y + 60;
  const CORE_W = 140;
  const CORE_H = 200;

  // Control rod insertion
  const MAX_ROD_H = CORE_H * 0.85;
  const rodH = (insertion / 100) * MAX_ROD_H;
  const rodW = 10;
  const numRods = 4;
  const rodSpacing = CORE_W / (numRods + 1);

  // Steam generator
  const SG_X = PV_X + PV_W + 30;
  const SG_Y = PV_Y + 40;
  const SG_W = 90;
  const SG_H = 200;

  // Pressurizer
  const PRESS_X = PV_X + PV_W / 2 - 20;
  const PRESS_Y = PV_Y - 50;
  const PRESS_W = 40;
  const PRESS_H = 40;

  // Coolant loop paths
  const hotLegIn = `M ${PV_X + PV_W} ${PV_Y + 80} C ${PV_X + PV_W + 20} ${PV_Y + 80} ${SG_X} ${SG_Y + 40} ${SG_X} ${SG_Y + 40}`;
  const coldLegReturn = `M ${SG_X} ${SG_Y + SG_H - 40} C ${SG_X} ${SG_Y + SG_H} ${PV_X + PV_W + 20} ${PV_Y + PV_H - 60} ${PV_X + PV_W} ${PV_Y + PV_H - 60}`;

  // Power indicator color
  const powerColor =
    insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";

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
            PWR Reactor Cross-Section
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Simplified side-view of a Pressurized Water Reactor. Drag the
            control rod slider to see how insertion level affects power output.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6">
        {/* Diagram — responsive aspect ratio, no hard maxHeight */}
        <div
          className="rounded-2xl border border-border bg-card p-3 sm:p-4"
          data-ocid="reactor-viz.svg_diagram"
        >
          <svg
            viewBox={`0 0 ${V_W} ${V_H}`}
            width="100%"
            style={{ aspectRatio: `${V_W} / ${V_H}`, display: "block" }}
            role="img"
            aria-label="Simplified PWR cross-section diagram with animated coolant flow"
          >
            <title>Pressurized Water Reactor Cross-Section (Schematic)</title>

            {/* Background */}
            <rect width={V_W} height={V_H} fill="transparent" />

            {/* Vessel shadow / glow */}
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

            {/* Core region background */}
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

            {/* Fuel rods */}
            <FuelRods
              x={CORE_X + 5}
              y={CORE_Y + 10}
              width={CORE_W - 10}
              height={CORE_H - 20}
            />

            {/* Control rods */}
            {Array.from({ length: numRods }, (_, i) => {
              const rx = CORE_X + rodSpacing * (i + 1) - rodW / 2;
              const rodKey = `ctrl-rod-x${rx.toFixed(0)}`;
              return (
                <g key={rodKey}>
                  {/* Rod guide tube */}
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
                  {/* Rod body */}
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
            {/* Pipe from pressurizer to vessel */}
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

            {/* Steam Generator */}
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
            {/* Internal heat exchanger tubes hint */}
            {([20, 52, 84, 116, 148] as const).map((yOffset) => (
              <line
                key={`sg-tube-${yOffset}`}
                x1={SG_X + 12}
                y1={SG_Y + yOffset}
                x2={SG_X + SG_W - 12}
                y2={SG_Y + yOffset}
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
                <CoolantPath d={hotLegIn} color="#f87171" animate />
                <CoolantPath d={coldLegReturn} color="#60a5fa" animate />
              </>
            ) : (
              <>
                <path
                  d={hotLegIn}
                  fill="none"
                  stroke="#f87171"
                  strokeWidth={3}
                  strokeDasharray="10 6"
                  opacity={0.75}
                />
                <path
                  d={coldLegReturn}
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

            {/* Scale note */}
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
              <span>0% — Withdrawn</span>
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

        {/* Component descriptions */}
        <div
          className="rounded-xl border border-border bg-card p-5"
          data-ocid="reactor-viz.component_descriptions"
        >
          <h2 className="font-display font-bold text-foreground mb-3">
            Component Guide
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                term: "Pressure Vessel",
                desc: "Heavy steel shell (typically 8–12 inches thick) containing the reactor core and primary coolant at ~155 bar. Maintains water liquid above 300 °C.",
              },
              {
                term: "Fuel Rods",
                desc: "Cylindrical UO₂ pellets enclosed in Zircaloy cladding tubes. Fission heat is generated here and transferred to the coolant.",
              },
              {
                term: "Control Rods",
                desc: "Boron or hafnium rods that absorb neutrons. Insertion reduces reactivity; full insertion shuts down the chain reaction.",
              },
              {
                term: "Pressurizer",
                desc: "Maintains system pressure so the primary coolant stays liquid. Electric heaters and spray nozzles regulate pressure.",
              },
              {
                term: "Steam Generator",
                desc: "Heat exchanger between primary (radioactive) and secondary (clean) loops. Secondary water boils and drives the turbine.",
              },
              {
                term: "Primary Coolant Loop",
                desc: "Hot leg (red) carries heat from the core to the steam generator. Cold leg (blue) returns cooled water back to the core.",
              },
            ].map(({ term, desc }) => (
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
