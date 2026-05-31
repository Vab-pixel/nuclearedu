# Design Brief: Interactive Periodic Table

## Direction
Interactive Periodic Table — A premium scientific visualization of all 118 elements with Obsidian dark aesthetic, interactive heatmap color scales, and glowing element tiles.

## Tone
Authoritative precision with cinematic depth. Cherenkov cyan glow and ultra-deep black backgrounds create immersive scientific exploration experience matching Unreal Engine 5 technical showcase quality.

## Differentiation
Dynamic heatmap color scales (10+ modes: Viridis, Plasma, Cividis, Inferno, Magma, Turbo, density, abundance, reactivity, stability) with smooth 500ms transitions. Element category colors (10 distinct categories) create visual taxonomy. Phase state indicators (solid/liquid/gas/plasma) add dimensional classification. Glowing tile hover states with cherenkov-glow effects elevate scientific precision.

## Color Palette

| Token | OKLCH | Role |
|---|---|---|
| **Primary (Cherenkov Cyan)** | 0.75 0.22 256 | Element tile glow, focus states, interactive highlights |
| **Heatmap Viridis** | 0.27→0.5→0.92 (cold→mid→hot) | Default intensity visualization (purple→cyan→yellow) |
| **Heatmap Plasma** | 0.13→0.55→0.96 (cold→mid→hot) | High-energy properties (purple→orange→yellow) |
| **Heatmap Cividis** | 0.12→0.52→0.96 (cold→mid→hot) | Deuteranopia-safe alternative (black→cyan→white) |
| **Element Categories** | See below | Per-category classification colors |
| **Phase States** | See below | Solid (blue), Liquid (cyan), Gas (orange), Plasma (pink) |
| **Background** | 0.06 0 0 | Ultra-deep obsidian (dark mode primary) |
| **Card** | 0.11 0 0 | Elevated panel surfaces |
| **Foreground** | 0.96 0 0 | High-contrast body text |

### Element Category Tokens
- **Alkali Metals:** 0.72 0.22 48 (warm gold)
- **Alkaline Earth:** 0.68 0.16 48 (muted gold)
- **Transition Metals:** 0.58 0.18 240 (steel blue)
- **Post-Transition:** 0.65 0.12 240 (pale blue)
- **Metalloid:** 0.62 0.16 192 (teal)
- **Nonmetal:** 0.72 0.18 192 (cyan)
- **Halogen:** 0.68 0.24 22 (red-orange)
- **Noble Gas:** 0.65 0.18 286 (purple)
- **Lanthanide:** 0.68 0.2 326 (pink)
- **Actinide:** 0.62 0.22 18 (deep orange)
- **Unknown:** 0.45 0 0 (neutral gray)

### Phase State Tokens
- **Solid:** 0.55 0.12 240 (cool blue badge)
- **Liquid:** 0.65 0.18 192 (cyan-green badge)
- **Gas:** 0.72 0.2 48 (warm orange badge)
- **Plasma:** 0.68 0.24 326 (hot pink badge)

## Typography
- **Display:** Space Grotesk — section titles, heatmap mode labels
- **Body:** Plus Jakarta Sans — element names, data labels, descriptions
- **Mono:** Geist Mono — atomic numbers, numerical data in inspector

## Elevation & Depth
Multi-layer shadow hierarchy with inset glow creates depth. Element tiles float above background with 24px cyan glow on hover. Legend gradient uses smooth OKLCH interpolation. Heatmap mode selector uses elevated shadow with subtle backdrop blur.

## Structural Zones

| Zone | Background | Border | Notes |
|---|---|---|---|
| **Header** | bg-card (0.11 L) | border-b border-primary/20 | Title + heatmap mode selector |
| **Periodic Grid** | bg-background (0.06 L) | — | 18-column SVG grid layout, element tiles |
| **Heatmap Legend** | bg-muted/20 | border border-primary/15 | Gradient bar + min/max labels |
| **Inspector Panel** | bg-card with holo-panel | border-primary/35 | Floating detail panel on tile click |
| **Mode Selector** | bg-card with shadow | — | Dropdown/button group for 10+ heatmap modes |

## Spacing & Rhythm
8px base unit. Grid gaps: 4px between tiles. Section gaps: 24px. Panel padding: 16px. Legend height: 32px. Dense inspection tables: 8px row height.

## Component Patterns
- **Element Tiles:** heatmap-tile class (rounded-md, p-3, 1px border-primary/20). Heatmap color via inline `background-color: oklch(...)`. Hover glow: `0 0 24px oklch(var(--primary) / 0.5), inset 0 0 12px oklch(var(--primary) / 0.15)`. Transition: 500ms heatmap-transition on color change.
- **Category Badge:** category-{name} class applies OKLCH color token + text glow.
- **Phase Badge:** phase-{state} class (inline-block, small text, semi-transparent background, colored text).
- **Heatmap Legend:** heatmap-legend gradient uses linear-gradient with three OKLCH stops. Smooth interpolation across color scale range.
- **Mode Buttons:** Primary style on active, outline on inactive. Instant visual feedback with glow-focus ring.

## Motion
- **Entrance:** Tiles fade in staggered 50ms per tile, float animation 0.3s ease-out on mount.
- **Heatmap Transition:** 500ms ease-out color shift when mode changes. Opacity flicker prevented with CSS ease-out.
- **Hover:** Immediate glow-pulse animation (2s infinite), scale-102 on tile hover, no lag.
- **Legend Shift:** Gradient updates instantly with heatmap-shift keyframe (4s loop) for continuous visual interest.

## Constraints
- ✓ WCAG 2.1 AA contrast (0.96 L foreground on 0.06–0.11 L background = 7+ ratio)
- ✓ Color-blind safe heatmap palettes (Viridis, Cividis, Plasma tested)
- ✓ No element data fetched except atomic number, symbol, name, category, phase state (no trend lines, no bonding visualization, no custom heatmap creation)
- ✓ Smooth 500ms transitions on all heatmap mode changes
- ✓ All tiles rendered as DOM elements (not canvas) for accessibility

## Signature Detail
Cherenkov cyan (0.75 0.22 256) glow on element tile hover creates premium scientific immersion. 10+ dynamically swappable heatmap color scales (Viridis, Plasma, Cividis, Inferno, Magma, Turbo) enable intuitive multi-dimensional data exploration without clutter. Obsidian ultra-deep background (0.06 L) makes glowing tiles visually prominent. Category-based coloring + phase state badges create layered visual information density. Smooth 500ms OKLCH color transitions preserve perceptual smoothness across color mode changes. Overall aesthetic: premium research-grade periodic table visualization inspired by CERN dashboards, Unreal Engine 5 technical showcases, and premium astronomy publications.
