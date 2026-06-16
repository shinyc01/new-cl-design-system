---
name: ifs-copperleaf-design
description: Use this skill to generate well-branded interfaces and assets for IFS Copperleaf (decision analytics & asset investment planning), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create
static HTML files for the user to view. If working on production code, you can copy assets and read
the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## Quick orientation

- **Brand:** IFS Copperleaf — dark-first decision-analytics product. **Neutral-led UI** (white-on-dark
  primary actions; white-alpha controls; blue focus). **Copper** `#C87941` is the brand accent
  (recommendations/value/selected); **purple** `#8366F7` is the brand identity (logo) + a data-viz
  hue, never a UI primary. Inter typeface, compact enterprise scale.
- **Foundations:** `styles.css` `@import`s all tokens. Token names map **1:1 to the Figma
  variables** (Figma spells the copper hue "cooper"). Use the CSS custom properties — never
  hard-code hexes. Key tokens: `--surface-0..3`, `--text-primary/secondary/tertiary`,
  `--accent-brand` (= cooper, for selected/active), `--accent-cooper`, `--accent-purple`,
  status `--text-success/danger/warning/info`, `--radius-100/200/300` (4/8/12 — no 16/24),
  `--padding-*`/`--gap-*`, `--chart-data-1..7` (bright chart sequence),
  `--data-viz-primary-*` (deep solids), element states `--button-*`/`--text-area-*`/`--search-*`,
  gradients `--gradient-*` (Cooper AI, Asset Health, Failure Probability, risk, map),
  `--elevation-1..3` + `--blur-light/medium/strong` (10/40/80),
  `--motion-duration-*` (0–700ms) + `--motion-ease-*`, `--z-*` ladder (0–999).
- **Components:** React primitives in `components/**`. They compile into the design-system bundle
  and expose on `window.IFSDesignSystem_6f71e3` (Button, Badge, Card, Avatar/AvatarGroup, Input,
  Select, Checkbox, Switch, Tabs, SegmentedControl, Stepper). Each has a `.prompt.md` with usage.
- **Product look:** see `ui_kits/copperleaf-dashboard/` for the real Strategy Framework dashboard —
  app rail + header (title/status/tabs/stepper/actions), allocation bars, treemaps, capex charts,
  and a recommendation drawer.
- **Icons:** the **real product set ships in `icons/`** — 177 glyphs (custom outline pack, 1.5px
  stroke, sizes **16px and 12px only**, filled variants only for status). Load `icons/icons.js`,
  inject `window.IFSIconSprite` once, then `<svg width="16" height="16"><use href="#system-search"/></svg>`,
  recolored with `currentColor` / `--icon-*`. Names + categories in `icons/icons.json`
  (arrow/chat/map/system/cursors/filled/cooper). Tabler webfont only as fallback for missing glyphs.
- **Assets:** `assets/cover-logo.png` (lockup), `assets/logo-mark.svg`, `assets/ifs-copperleaf-wordmark.svg`.

## Rules of thumb

- Dark canvas by default; cards are `--surface-card` with a `--border-subtle` hairline + 8px radius.
- Sentence case everywhere; no emoji; quantify outcomes; money in compact units ($478M / $1.24B).
- Icons at 16px (primary) or 12px (compact) only — use the real set via the `icons/` sprite,
  recolored with `currentColor` / `--icon-*`. Filled icons only for status.
- Motion is quick & functional: fast 100 / moderate 200 / slow 300ms, `--motion-ease-standard`;
  no bounces or infinite loops; reduced-motion falls back to instant.
- When a product surface isn’t in the source, omit it or show a labeled empty state — don’t invent.
