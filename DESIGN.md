# Design Brief: Nuclear Science Education Platform

## Visual Direction
Premium scientific authority crossed with cosmic scale — CERN visualization aesthetic meets premium astronomy publication. Dark mode optimized. Electric cyan Cerenkov glow accent contrasts warm amber nuclear energy warmth on minimal deep-navy foundation.

## Tone & Purpose
Authoritative, accessible, precise. Build trust with clean hierarchy and restrained visual language. Complex data must feel navigable. Every interaction reveals, never distracts.

## Color Palette

| Token | Light (OKLCH) | Dark (OKLCH) | Usage |
|---|---|---|---|
| **Primary** | 0.6 0.05 240 (Blue) | 0.75 0.2 256 (Bright Blue) | Interactive elements, focus states, links |
| **Secondary** | 0.82 0.12 50 (Amber) | 0.85 0.15 48 (Warm Gold) | Nuclear energy warmth, highlights, secondary CTAs |
| **Accent** | 0.65 0.18 276 (Purple) | 0.72 0.25 286 (Bright Purple) | Emphasis, decorative elements, special states |
| **Destructive** | 0.58 0.22 22 (Red) | 0.68 0.25 22 (Bright Red) | Errors, warnings, critical actions |
| **Background** | 0.98 0 0 (Near-white) | 0.09 0 0 (Deep navy/black) | Page background |
| **Card** | 0.99 0 0 (White) | 0.12 0 0 (Dark navy) | Elevated surfaces, modals |
| **Foreground** | 0.12 0 0 (Dark text) | 0.96 0 0 (Near-white text) | Body text, primary labels |
| **Border** | 0.88 0 0 (Light gray) | 0.2 0 0 (Dark border) | Dividers, subtle outlines |
| **Muted** | 0.92 0 0 (Light muted) | 0.18 0 0 (Muted dark) | Secondary text, disabled states |

### Data Visualization Palette (WCAG AAA + Deuteranopia-safe)
- **Chart-1 (Red):** 0.68 0.22 22 (dark) — alpha decay
- **Chart-2 (Green):** 0.68 0.22 120 (dark) — beta-minus decay
- **Chart-3 (Yellow):** 0.75 0.18 90 (dark) — stable nuclei
- **Chart-4 (Purple):** 0.72 0.25 286 (dark) — beta-plus decay
- **Chart-5 (Gold):** 0.68 0.22 48 (dark) — other decay modes

## Typography

| Tier | Font | Size | Weight | Usage |
|---|---|---|---|---|
| **Display** | Space Grotesk | 2.25rem–3rem | 700 | Page titles, hero text |
| **Heading-1** | Space Grotesk | 1.875rem | 600 | Major sections |
| **Heading-2** | Space Grotesk | 1.5rem | 600 | Subsections |
| **Heading-3** | Space Grotesk | 1.25rem | 600 | Cards, modules |
| **Body-Large** | Plus Jakarta Sans | 1.125rem | 400 | Article body, long-form |
| **Body** | Plus Jakarta Sans | 1rem | 400 | Default paragraph text |
| **Body-Small** | Plus Jakarta Sans | 0.875rem | 400 | Labels, helper text |
| **Mono** | Geist Mono | 0.875rem | 400 | Equations, data, code |

Line-height: 1.6 (body), 1.3 (display). Letter-spacing: -0.02em (display), normal (body).

## Structural Zones

| Zone | Treatment | Rationale |
|---|---|---|
| **Header / Nav** | bg-card with border-b, slight elevation | Clear separation, navigational anchor |
| **Main Content** | bg-background, card surfaces use bg-card | Breathing room, hierarchy through depth |
| **Data Viz Areas** | bg-card with nuclear-glow accent border (cyan/10) | Emphasizes data importance without distraction |
| **Sidebar (if present)** | bg-sidebar slightly darker than card | Clear visual grouping, logical drawer |
| **Footer** | bg-muted/30 with border-t | Contained, de-emphasized but visible |

## Spacing & Rhythm
8px base unit. Padding/margin: 8px, 16px, 24px, 32px, 48px. Card gaps: 16px. Section gaps: 48px. Dense layouts (data tables): 8–12px. Breathing layouts (learning modules): 24–32px.

## Component Patterns
- **Buttons:** Filled primary (solid bg-primary), secondary (outline border-primary), tertiary (text-primary no bg). Focus: ring-2 ring-accent ring-offset-2. Hover: opacity shift, never color shift.
- **Cards:** bg-card with border border-border, shadow-card, rounded-md. Hover state: shadow-elevated + scale-102 transition-smooth.
- **Inputs:** bg-input border-border focus:ring-2 focus:ring-accent. Clearance: 12px padding.
- **Audience Badges:** audience-badge class + audience-{level} for semantic colors (green/blue/amber/purple).
- **Data Refresh Badges:** data-refresh-badge with live (emerald pulse)/synced (blue static)/pending (amber pulse) states.
- **Focus States:** All interactive elements: glow-focus utility (ring-2 ring-accent ring-offset-2, dark-offset-background).
- **Tables:** Striped rows (even: bg-muted/20), hover highlight, sortable headers bold, sticky headers.
- **Split-pane Modals:** split-pane-container (grid 2-col) with cherenkov-glow-border on left pane. Compare reactor types side-by-side with synchronized scroll.
- **Progress Rings:** progress-ring wrapper with animated progress indicator + export button. Status indicator pulse for live sync.
- **3D Reactor Visualization:** Rendered canvas (Three.js + React Three Fiber) with reactor-core-glow container. Holo-text for data overlays (holo-text + holo-flicker animations). Holo-panel for dashboard cards (semi-transparent bg-card with inset glow). Heatmap overlays layer on 3D geometry using heatmap-cold → heatmap-warm → heatmap-hot gradient. Timeline scrubber uses timeline-track + timeline-handle (glowing interactive element). Particle systems rendered as point clouds with particle-glow effect. Data output grid uses data-overlay-grid (monospace labels, muted color for readability over 3D scene).

## Motion & Animation
- **Transition default:** transition-smooth (0.3s cubic-bezier(0.4, 0, 0.2, 1)) on all interactive elements.
- **Fade-in:** 0.4s ease-out for content reveals.
- **Pulse-glow:** 2s infinite subtle glow on interactive accents (Cerenkov radiation inspired).
- **Data-refresh:** 1.5s infinite for live data sync cycles, subtle opacity pulse without jarring effects.
- **Pulse-live:** 2.5s infinite for active live data indicators, slower than standard pulse.
- **Reactor-pulse:** 3s infinite for 3D core respiration effect, combining outer glow + inset shadow for depth.
- **Holo-flicker:** 0.15s for holographic UI text, subtle realistic flicker without distraction.
- **Particle-float:** 2s ease-out for neutron flux and decay particle animations rising/fading through 3D scene.
- **Heatmap-shift:** 4s infinite for temperature gradient overlay pulsing across reactor core.
- **Page transitions:** Fade-in on route change, staggered content entrance (200ms per element).
- **Interactions:** Click response 150ms, hover response immediate (no delay).
- **Split-pane animations:** Left pane cherenkov-glow-border strengthens on active comparison, smooth transitions between reactor types.
- **3D Scene interactions:** Smooth camera rotation with OrbitControls, real-time material property updates tied to timeline scrub, particle system time acceleration/deceleration tied to simulation speed slider.

## Signature Detail
**Cerenkov Glow + 3D Reactor Hyper-Detail:** Glowing cyan border (0.75 0.2 256) on data viz + split-pane modals. New cutaway core: ray-traced reflections, soft blue Cherenkov glow from cooling systems, particle effects. Primary glow uses oklch(var(--primary)), secondary warmth from oklch(var(--secondary)) for fuel rod incandescence. Temperature heatmap overlays: cyan (cold) → amber (warm) → red (hot). Holographic UI elements use text-shadow glow in oklch(var(--accent)) (0.72 0.25 286). Dashboard panels: glass-morphism (backdrop-blur-sm, border-primary/30, inset glow). Reactor respiration pulse (3s animation) creates breathing effect. Particle systems (neutron flux, decay) float upward with fade-out (2s) at 30–60 fps via Three.js. Overall: premium CERN monitor + real-time research dashboard.

## Accessibility Constraints
WCAG 2.1 AA minimum (AAA where practical). All text contrast ≥ 4.5:1. Color-blind safe palette. Keyboard navigation logical. Focus indicators always visible (ring-2 ring-accent). Type scale minimum 16px, scalable to 200%. Respect `prefers-reduced-motion`. ARIA labels on all data viz.

## Anti-Patterns Rejected
❌ Full-page gradients (use layering), ❌ Color-only distinction, ❌ Bouncy animations, ❌ Same surface treatment, ❌ System font fallback, ❌ Uniform border-radius

## Dark Mode Tuning
Primary design in dark mode. Light mode inverts intelligently (not just lightness swap): backgrounds become near-white (0.98), text near-black (0.12), accents darken to preserve gamut and prevent blow-out. Borders lighten (0.88). Shadows become subtle (opacity-reduced). Live data indicators (emerald/blue/amber) remain saturated in both modes for clarity. Split-pane borders maintain Cherenkov glow effect in both modes with appropriate opacity adjustments.

## Differentiation
**What makes this unforgettable:** Glowing cyan accent (Cerenkov radiation metaphor) combined with restraint. No gradients except subtle hero background. Typography pair (geometric SpaceGrotesk + clean PlusJakartaSans) signals "scientific precision meets modern UX." Data viz palette optimized for accessibility, not RGB rainbow cliché. Footer + header borders create distinct zones. Live data badges with emerald pulse (active sync) provide real-time feedback without visual noise. Split-pane reactor comparison modals elevate cinematic detail with inset glows and synchronized animations. Overall effect: premium journal + CERN monitor room + real-time research dashboard.
