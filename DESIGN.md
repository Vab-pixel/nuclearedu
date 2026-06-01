# Design Brief: Atoms & Quantum Visualizers

## Direction
Atoms & Quantum Mechanics — High-fidelity 3D orbital probability density visualizations with quantum glow effects, Feynman diagram builder with particle color palette, and atomic model timeline from classical to modern quantum theory. Cinematic scientific aesthetic matching Obsidian dark theme with hyper-realistic particle interactions.

## Tone
Cinematic quantum wonder with scientific precision. Deep purples for wavefunctions, electric yellows for phase effects, and bright cyan for probability density create an immersive quantum exploration experience inspired by particle physics simulations and quantum mechanical visualization software.

## Differentiation
Dynamic 3D orbital rendering with wavefunction phase coloring (purple→gold→cyan gradients), real-time particle animations in Feynman diagrams, and era-based atomic model visualization (classical steel→quantum violet→modern teal) enable intuitive understanding of quantum mechanics at multiple complexity levels without sacrificing visual beauty or scientific accuracy.

## Color Palette

| Token | OKLCH | Role |
|---|---|---|
| **Quantum Wavefunction** | 0.68 0.28 276 (dark) | Orbital probability density, electron cloud visualization |
| **Quantum Phase** | 0.86 0.22 72 (dark) | Phase angle coloring in wavefunction displays |
| **Quantum Density** | 0.78 0.28 192 (dark) | Electron density heatmaps, orbital intensity |
| **Quark Red** | 0.72 0.32 22 | Up/down quark particles in Feynman diagrams |
| **Quark Green** | 0.76 0.28 120 | Strange/charm quark particles |
| **Quark Blue** | 0.74 0.26 256 | Top/bottom quark particles |
| **Lepton Cyan** | 0.82 0.3 192 | Electrons, muons, tau leptons |
| **Boson Yellow** | 0.88 0.24 88 | W/Z bosons, Higgs particle |
| **Photon White** | 0.96 0.06 0 | Photon particles, light interaction |
| **Gluon Orange** | 0.78 0.28 45 | Gluon force carrier particles |
| **Classical Steel** | 0.6 0.16 256 | Bohr model, classical atomic models |
| **Quantum Violet** | 0.72 0.28 276 | Schrödinger wave equation, quantum mechanics |
| **Modern Teal** | 0.75 0.24 180 | Modern quantum field theory, current physics |

## Typography
- **Display:** Space Grotesk — section titles, wavefunction labels, Feynman diagram annotations
- **Body:** Plus Jakarta Sans — orbital descriptions, particle names, educational notes
- **Mono:** Geist Mono — quantum numbers, mathematical expressions, energies in eV

## Elevation & Depth
Multi-layer glow hierarchy creates quantum immersion: wavefunctions pulse with 48px cyan glow on dark backgrounds, Feynman particles emit 20–24px colored glows matched to particle type, orbital probability surfaces use bloom post-processing on 3D canvas. Inset glows add depth to probability clouds.

## Structural Zones

| Zone | Background | Border | Notes |
|---|---|---|---|
| **Header** | bg-card (0.11 L dark) | border-quantum-violet | Title + model selector (Bohr, Schrödinger, field theory) |
| **3D Canvas** | bg-background (0.06 L dark) | border-quantum-density/30 | Three.js orbital renderer with glow pass |
| **Feynman Builder** | bg-card | border-primary/20 | Particle palette + interaction diagram canvas |
| **Data Panel** | bg-muted/10 | border-primary/15 | Quantum numbers, energy levels, wavefunction coefficients |
| **Timeline** | bg-background | — | Era-based atomic model progression (1900–present) |

## Spacing & Rhythm
8px base unit. Canvas padding: 12px. Panel gaps: 16px. Feynman palette rows: 3 particles × 4 gaps. Timeline era cards: 20px horizontal spacing. Dense quantum number table: 6px row height.

## Component Patterns
- **Orbital Tile:** Glowing canvas element with `quantum-orbital-pulse` animation (3s infinite). Border: `border-quantum-violet/50`. Hover: glow intensity +40%.
- **Feynman Particle Palette:** 10 particle buttons (Q-red/green/blue, lepton-cyan, boson-yellow, photon-white, gluon-orange, each with matching glow). Drag to canvas to create interaction diagram.
- **Wavefunction Visualizer:** 3D surface render with phase-mapped colors. Y-axis = wavefunction amplitude, Z-axis = probability density, X = orbital position. Post-processing bloom 0.3–0.7.
- **Era Badge:** Inline badge with `quantum-{era}` class (classical-steel, quantum-violet, modern-teal). Text glow with matching particle-trail shadow.

## Motion
- **Entrance:** Orbitals fade in (400ms), particles shimmer into place (500ms staggered). Timeline era cards slide in from left (300ms per era).
- **Orbital Pulse:** `quantum-orbital-pulse` 3s infinite on all orbital visualizations. Intensity correlates with electron probability density.
- **Feynman Interaction:** Particles emit 2s `quantum-particle-trail` bursts on creation, fade to nothing. Interaction lines pulse yellow on drag.
- **Wavefunction Shimmer:** `quantum-wavefunction-shimmer` 2.5s infinite on density heatmap for continuous visual interest.

## Constraints
- ✓ WCAG 2.1 AA contrast (0.96 L foreground on 0.06 L background = 7.4+ ratio)
- ✓ All quantum glows use raw OKLCH in JavaScript context (canvas/Three.js cannot resolve CSS vars)
- ✓ Feynman diagrams render particles as DOM elements for accessibility, with keyboard-navigable palette
- ✓ Wavefunction visualization available in 2D heatmap mode (accessible) and 3D (enhanced, optional)
- ✓ All color tokens compatible with 8 existing atomic themes (Obsidian, Cherenkov Blue, Reactor Orange, Fusion White, Atomic Green, Plasma Purple, Neon Fusion, Retro Nuclear)

## Signature Detail
Quantum glow effects (wavefunction purple at 0.68 L, orbital cyan at 0.78 L, with synchronized pulse animations) create premium scientific immersion matching particle physics research dashboards and quantum simulation software. Feynman diagram particle colors (quark/lepton/boson/photon/gluon with individual glow signatures) enable intuitive particle type recognition without labels. Era-based atomic model coloring (classical steel→quantum violet→modern teal progression) tells the story of quantum physics discovery visually. Overall aesthetic: cinematic quantum wonder inspired by CERN particle detectors, quantum mechanics textbooks, and Unreal Engine 5 technical visualizations.
