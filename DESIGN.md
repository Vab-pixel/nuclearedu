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
- **Focus States:** All interactive elements: glow-focus utility (ring-2 ring-accent ring-offset-2, dark-offset-background).
- **Tables:** Striped rows (even: bg-muted/20), hover highlight, sortable headers bold, sticky headers.

## Motion & Animation
- **Transition default:** transition-smooth (0.3s cubic-bezier(0.4, 0, 0.2, 1)) on all interactive elements.
- **Fade-in:** 0.4s ease-out for content reveals.
- **Pulse-glow:** 2s infinite subtle glow on interactive accents (Cerenkov radiation inspired).
- **Page transitions:** Fade-in on route change, staggered content entrance (200ms per element).
- **Interactions:** Click response 150ms, hover response immediate (no delay).

## Signature Detail
**Cerenkov Glow Border:** Nuclear data visualization areas + prominent interactive CTAs feature a subtle glowing left or top border (cyan 0.6 0.05 240) with 0.2 opacity, strengthening on focus. Subtly conveys "radiation" + "energy" metaphor without melodrama.

## Accessibility Constraints
- **WCAG 2.1 AA minimum:** All text contrast ≥ 4.5:1 (AAA where practical, ≥ 3:1 for large text).
- **Color-blind safe:** Data viz palette tested for deuteranopia; never color-only encoding.
- **Keyboard navigation:** Tab order logical, all interactive elements reachable.
- **Focus visibility:** Focus indicators always visible (ring-2 ring-accent), never subtle.
- **Type scale:** Minimum 16px body font, scalable to 200% without layout breakage.
- **Reduced motion:** Respect `prefers-reduced-motion` — disable pulse-glow + fade animations.
- **Screen readers:** ARIA labels on all data viz, semantic HTML, live regions for updates.

## Anti-Patterns Rejected
- ❌ Full-page gradients (use depth via layering)
- ❌ Color-only distinction (always add pattern, icon, or label)
- ❌ Bouncy animations on core content
- ❌ Same surface treatment throughout (use elevation differentiation)
- ❌ System font fallback (always deliver bundled fonts)
- ❌ Uniform border-radius (vary intentionally: 0, 4px, 6px, 12px, full)

## Dark Mode Tuning
Primary design in dark mode. Light mode inverts intelligently (not just lightness swap): backgrounds become near-white (0.98), text near-black (0.12), accents darken to preserve gamut and prevent blow-out. Borders lighten (0.88). Shadows become subtle (opacity-reduced).

## Differentiation
**What makes this unforgettable:** Glowing cyan accent (Cerenkov radiation metaphor) combined with restraint. No gradients except subtle hero background. Typography pair (geometric SpaceGrotesk + clean PlusJakartaSans) signals "scientific precision meets modern UX." Data viz palette optimized for accessibility, not RGB rainbow cliché. Footer + header borders create distinct zones. Overall effect: premium journal + CERN monitor room.
