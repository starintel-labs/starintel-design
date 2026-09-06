# StarIntel Agent Design Guide

Operating manual for coding agents building StarIntel web surfaces.

## 1. Use the shared system

- Consume **`@starintel/design`**. Never fork the palette, never copy CSS
  from another StarIntel app into a new one.
- The default theme is **`obsidian-gold`** and is set via
  `<html data-si-theme="obsidian-gold">`. Do not invent a new palette, do not
  introduce a second accent color, do not "improve" the gold.

## 2. What obsidian-gold is

- The canvas is black (`--si-bg-canvas`). Surfaces rise from it.
- **Gold is structural and scarce.** It marks: selected navigation, primary
  actions, graph emphasis, symbolic marks, important state, focus.
  If everything is gold, the design has failed. If a screen has no gold at
  all, check whether it is missing hierarchy.
- **Ivory carries readable text** (`--si-text-primary`, `--si-text-bright`).
  Secondary/muted text uses the warm gray ramp, never gold.
- Feels like: symbolic computing, intelligence analysis, Common Lisp, graph
  systems, expert-systems research, an engineering workstation.
- Must NOT feel like: generic SaaS, crypto marketing, luxury branding, a
  casino, neon cyberpunk, glassmorphism soup, gradient-heavy AI startup.

## 3. Tokens are the API

- Use semantic custom properties (`--si-bg-canvas`, `--si-text-primary`,
  `--si-accent-primary`, `--si-border`, `--si-focus`, `--si-space-*`, ...).
  Never raw hex values in app CSS.
- Use the `.si-*` component classes (`.si-panel`, `.si-card`, `.si-btn`,
  `.si-chip`, `.si-status`, `.si-doclist`, `.si-terminal`, ...) instead of
  restyling raw elements per app.
- The `--si-*` legacy aliases in `tokens.css` are deprecated. Do not use them
  in new code; they exist only to keep pre-extraction properties rendering.

## 4. Identity geometry

- The lambda (`λ`) is the recurring motif: wordmarks (`(starintel(λx.xx))`,
  compact `starintel (λ)`), `.si-rule` divider tick, graph center nodes,
  empty-state marks.
- For visuals, use the shared assets (`lambda-network.svg`, `lambda-mark.svg`,
  `graph-grid.svg`, ...) or compose new ones from the same vocabulary:
  nodes, edges, relations, typed documents, symbolic expressions. Inline SVG
  can hook `.si-anim-node` / `.si-anim-edge` (auto-disabled under
  reduced motion).
- Do not use a generic globe, do not use raster artwork, do not use stock 3D.

## 5. Product claims come from the code

- Copy must be grounded in the current implementation of the system you are
  writing about. Check source, tests, schemas, pinned manifests, and CI — in
  that order of authority. Stale README prose is not authority.
- Label surfaces honestly: `implemented`, `experimental`,
  `in development`, `research` (`.si-badge--*` variants exist for this).
- Never fabricate: runtime status, activity feeds, research counts,
  operational metrics, dashboard values. If real data is unavailable, show a
  designed empty state (`.si-empty`) or omit the section. Descriptive UI
  mockups must be visibly labeled as such.

## 6. Accessibility (required, not optional)

- WCAG AA contrast for ordinary text. Ivory on obsidian passes; muted grays
  are for supporting text only.
- Keyboard navigable, visible focus (`:focus-visible` is themed — do not
  remove outlines), semantic HTML, correct heading order.
- Never convey state by color alone: `.si-status` pairs a dot with text and
  an error crossmark.
- Honor `prefers-reduced-motion` — `motion.css` already does; new animations
  must register there.

## 7. Responsive (required)

- Layouts must be intentionally designed at 1920×1080, 1440×900, 1280×800,
  768×1024, and 390×844.
- Mobile is a layout transformation (stacked bands, scrollable nav), not a
  squeezed desktop.

## 8. Screenshots are mandatory

- No significant UI work is complete because `npm run build` passes.
- Render the real running implementation (Playwright/Chromium), capture all
  required viewports, open the screenshots, inspect them, and iterate.
- Record review notes per pass. Screenshots of mockups are not evidence.

## 9. Showcase is the reference

`examples/showcase/` is the canonical visual reference. When you add or
change a component, token, or state, update the showcase in the same change
so the next agent sees current truth.
