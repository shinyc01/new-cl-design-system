# IFS Copperleaf — Design System

A design system for **IFS Copperleaf**, the decision-analytics suite that helps asset-intensive organizations (utilities, energy, transport, public infrastructure) turn investment data into defensible, board-ready capital plans. The product centers on strategy frameworks, portfolio optimization, capital allocation and asset-investment planning — dense, data-heavy enterprise surfaces.

This project is the machine-readable system: design tokens (CSS custom properties), webfonts, reusable React UI primitives, foundation specimen cards, and a full product UI-kit recreation. Consumers link the single root **`styles.css`** and pull components from the compiled bundle.

## Sources

- **Figma:** *“IFS Design System.fig”* — attached and explored via the mounted virtual filesystem. Foundations were read from the `1.0-Foundations` pages (Color / Typography / Spacing / Shape / Elevation / Motion tokens); button specs from the `Buttons` page; the product look from the `Dashboard`, `moment-1` (Strategy Framework) and `portfolio` / `strategic` frames; brand assets from the `Welcome/Cover` frame.
- Tokens were materialized from Figma Variables, then **curated by hand** into clean, deduplicated files (the raw export mixed several foreign library collections, which were dropped).
- Brand identity confirmed from the cover lockup: **IFS Copperleaf** — purple sunburst mark + wordmark. Real logo art copied into `assets/`.

> The reader is not assumed to have Figma access; everything needed is reproduced in this repo.

---

## Brand at a glance

- **Name / product:** IFS Copperleaf — decision analytics & asset investment planning.
- **Primary UI color:** **Neutral (white-on-dark).** Primary actions are white; secondary/tertiary/ghost controls and inputs are white-alpha. **Brand identity:** Purple `#8366F7` (the logo). **Brand accent:** Copper `#C87941` (the “Copperleaf” signature — recommendations, value, selected/active states). Purple is NOT a UI primary; it lives in the logo and data-viz. Focus is blue (`system/info`).
- **Mode:** Dark-first. Black/near-black canvases with low-key ambient elevation. A light theme exists under `[data-theme="light"]`.
- **Typeface:** **Inter** for everything (text + display), at a compact enterprise scale. Roboto Mono for monospace. The logo wordmark is set in **Parabole** (commercial) and ships as artwork, not a webfont.

---

## CONTENT FUNDAMENTALS — how IFS Copperleaf writes

- **Voice:** Confident, precise, analytical. It speaks the language of capital planning — *portfolio value, risk-adjusted value, optimization uplift, scenarios, objectives, framework coverage, capex burn, payback*. Outcomes are quantified.
- **Person:** Largely impersonal / system-authored (“The optimizer projects a 3.1% increase…”). Addresses the user as “you” in guidance microcopy (“Add context and define your Enterprise Goals”, “Build the framework based on enterprise goals”, “Send to approvers for review”).
- **Casing:** Sentence case for UI labels, titles and buttons (“Capital allocation by objective”, “Run optimization”, “Send to approvers for review”). UPPERCASE reserved for tiny overline/caption metadata. No Title Case headlines.
- **Tone of numbers:** Money in compact units (`$478M`, `$1.24B`); deltas signed and qualified (`+12% vs. baseline`, `+$51M`). Dates are long form (“June 2, 2026”, “02.03.2026”).
- **Status language:** Active · Draft · In review · At risk · Over budget · Optimized. Workflow stages: **Input → Shape → Review → Publish**.
- **Emoji:** None. This is enterprise software — no emoji, no exclamation marks, no hype.
- **Examples:** “Q1 2026 Strategy Framework”, “Rebalance $42M from Reliability into Growth”, “Strategic objectives by execution”, “1 Recommendation”, “Framework coverage 86%”.

## VISUAL FOUNDATIONS

- **Color & vibe:** Dark canvas (`#000` → `#0F0F0F` → `#1B1B1B` → `#373636`). **The UI is neutral-led:** primary actions are white, controls are white-alpha, focus is blue. **Copper** is the brand accent for interactive emphasis (selected/active) and value/recommendation moments; **purple** is the brand identity (logo) and one data-viz hue — not a UI primary. Five full status ramps (success/danger/warning/info + the two brand ramps), each 13 steps.
- **Surfaces / cards:** Cards are `surface-2` (`#1B1B1B`) with a 1px `white/10%` hairline border, `radius-md` (8px) corners, and a subtle top inner-edge highlight (`inset 0 1px 0 rgba(255,255,255,.06)`) rather than heavy drop shadows. Elevated cards add a soft ambient shadow. Large surfaces/modals use `radius-300` (12px).
- **Corner radii:** Figma scale is 0 / 2 / 4 / 8 / 12 / 40 / full — controls 4px (`radius-100`), cards/buttons-L 8px (`radius-200`), modals/large surfaces 12px (`radius-300`), hero surfaces 40px, pills full. (16px and 24px do **not** exist in the Figma foundations.)
- **Borders:** Hairlines everywhere — `white/10%` subtle, `white/20%` medium, `white/40%` strong, `#6D6D6D` grey. Borders carry structure; the system leans on borders + tint more than shadow.
- **Elevation / shadows:** Exactly **3 elevations** + floating: `elevation-1` (0 4 8 / 25%), `elevation-2` (0 8 12 -1 / 25%), `elevation-3` (0 12 16 -2 / 35%) — each pairs a drop shadow with a backdrop blur and a `background/elevation-N` fill. Used sparingly for menus, drawers and modals; most depth comes from the surface ladder + edge highlight.
- **Transparency & blur:** Glass overlays use `rgba(70,70,70,.55)` + `backdrop-filter: blur(20px)` with a `white/15%` hairline (see the cover chips). Status fills are 10–25% alpha tints of their hue.
- **Backgrounds:** Solid dark canvas — no decorative gradients in product chrome. **Purple is never used as a UI surface fill** (no purple cards/tiles/panels); it appears only as an interactive accent (buttons, links, focus, selection) and in data-viz. Purple gradients are reserved for off-product brand/marketing moments (e.g. the cover lockup). Imagery is occasional (avatars, cover); the product is chart- and data-led, not photographic.
- **Data-viz:** Two sets. The official **chart sequence** `chart/data-1..7` is the bright 400-step hues in order: green `#58C97D`, blue `#5599FF`, red `#F16362`, cooper `#D39467`, purple `#9C85F9`, amber `#FFBF58`, cyan `#7EDCE8`. A separate `data-viz/primary` collection of **deep solids** (`#BF302F`, `#A06D1C`, `#176932`, `#5238A4`, `#3556A0`, `#692917`, `#6A1766`) serves map/product solid surfaces. Dedicated palettes exist for **Asset Health**, **Failure Probability**, collaboration users (16), and map pins/highlights — see `tokens/palettes.css`; status/risk surfaces use the **gradient styles** in `tokens/gradients.css`. Charts favor stacked horizontal bars, treemaps and grouped columns.
- **Motion:** Quick and functional. Durations: instant 0 / fast 100 / moderate 200 / slow 300 / extra-slow 500 / extended 700ms. Eases: standard `cubic-bezier(.4,0,.2,1)` (default), decelerate (entering), accelerate (leaving), emphasize `cubic-bezier(.2,0,0,1)` (attention), linear (loops). Fades and short slides, no bounces, no infinite decorative loops. Reduced-motion respected (fall back to `instant`).
- **Hover states:** Lighten/raise alpha (e.g. secondary `white/10% → white/15%`, ghost → `white/15%`) and strengthen borders. **Press:** drop alpha (secondary → 5%, tertiary border → 10%, ghost label dims to `text/secondary`) — **never shift position**. **Focus:** two-layer ring — blue outer (`#5599FF`) over a dark inner ring — thickness scaling with control size (4/2, 3/1.5, 2/1).
- **Buttons (verified):** five variants — primary (white), secondary (white-alpha), tertiary (outlined over black/10), ghost, **accent-cooper** (Cooper AI: black/60 + cooper glow radial + 25% lavender sheen, exact gradients in `tokens/elements.css`). Sizes L 40 (pad 12/10, radius 8, Label L) · M 32 (pad 10/8, radius 4, Label M) · S 24 (pad 6/4, radius 4, Label M); icon↔label gap 4px. Plus icon buttons (square/circle; icons stay 16px at every size; square radius 8/4, ghost-L 6), pill **prompt chips** (secondary behavior, radius full, L/M), and a notification icon button with dot badge. The **Cooper FAB** uses the exact Figma artwork in `assets/fab/` (10 state SVGs + sphere/indicator/tooltip parts) — see `components/core/CooperFab.html`; never rebuild the sphere from CSS. **No solid-copper buttons and no destructive/red button component exist.**
- **Layout:** 4px spacing grid. Dense, information-rich layouts; fixed left rail + sticky header, scrolling content. Generous use of CSS grid/flex with `gap`.
- **Type in use:** Compact — body 12–14px, headings 12–24px, never below 10px. All headings (H1–H4) are **medium (500)** with slight negative tracking; UPPERCASE variants flip to positive tracking; Label UPPER variants are semibold; large figures are display-medium.

## ICONOGRAPHY

- **Set:** The product's **custom outline icon pack** — **1.5px stroke** (converted to fill in Figma), **only two sizes: 16px** (buttons L40/M32, toolbars, lists, cards) **and 12px** (small buttons S24, compact elements). Filled variants are used *exclusively* for status indicators (Critical, Warning, Success — primarily on the map). Never below 12px, no arbitrary sizes, kebab-case names.
- **The real set ships in this repo:** `icons/` holds all **177 glyphs** extracted from the Figma Icon Components library — individual SVGs (`icons/svg/<name>.svg`), a `<symbol>` sprite (`icons/sprite.svg`), a registry (`icons.json` — name, category, natural size), and `icons.js` (exposes `window.IFSIconSprite` + `window.IFSIcons` for file:// pages). Categories: arrow (25) · chat (19) · map (24) · system (73) · cursors (17) · filled (13) · cooper (6, incl. animation variants). Usage: inject the sprite once, then `<svg width="16" height="16"><use href="#system-search"/></svg>`, colored via `currentColor` / `--icon-*`. Tabler Icons is no longer needed except as fallback for glyphs the set lacks.
- **Delivery:** loaded as the **Tabler webfont** from CDN and used via CSS classes — `<i class="ti ti-<name>"></i>` — recolored with `currentColor` / the `--icon-*` tokens and sized by `font-size`. CDN (note the required `/dist/`): `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css`. (`@tabler/icons-react` / SVG sprite are equivalent options for production.)
- **In this kit:** the dashboard UI kit loads the Tabler webfont and renders icons through a small `Icon({name,size})` helper (`ui_kits/copperleaf-dashboard/index.html`) that maps semantic names to Tabler glyphs (e.g. `grid → layout-grid`, `map → map-2`, `layers → stack-2`, `bulb → bulb`, `share → share-3`, `comment → message`, `star`, `check`, `chevron-down`, `cube`, …). Components (`Button`, `Badge`, `Tabs`, …) take icons as a `ReactNode` prop, so pass any Tabler `<i>` glyph.
- **Color:** icons inherit `--icon-primary/secondary/tertiary` (white-alpha on dark) or accent tokens via `currentColor`.
- **Emoji / unicode as icons:** never.
- **Logo:** primary usage is the **plain white lockup on dark** — `assets/logo-white.png`. Also: `assets/cover-logo.png` (full-color lockup, transparent), `assets/logo-mark.svg` (monochrome symbol, recolorable), `assets/ifs-copperleaf-wordmark.svg` (wordmark).

---

## Index — what’s in here

| Path | What |
| --- | --- |
| `styles.css` | Root entry. `@import`s every token + font file. Consumers link this. |
| `tokens/colors.css` | Primitive ramps (purple, cooper, status), neutrals, white/black alpha. Figma names the copper hue "cooper"; legacy `--copper-*` aliased. |
| `tokens/palettes.css` | Data-viz sequence, Asset Health, Failure Probability, collaboration users, map tokens. |
| `tokens/semantic.css` | Semantic roles (surface / text / icon / border / background / overlay / focus) with 1:1 Figma names; dark default + derived light theme. |
| `tokens/elements.css` | Element state tokens from Figma: button variants × states, text-area, search, header-item. |
| `tokens/gradients.css` | Gradient styles: Cooper AI, Asset Health, Failure Probability, risk charts/cards, map highlights. |
| `tokens/typography.css` | Inter family, weight & size ramps, semantic type roles. |
| `tokens/spacing.css` | 4px spacing, radii, elevation, blur, motion, focus, z-index. |
| `tokens/fonts.css` | Inter + Roboto Mono webfonts. |
| `icons/` | The real product icon set: 177 SVGs, sprite, registry, JS bundle. |
| `assets/fab/` | Cooper FAB artwork SVGs (legacy state files; FAB is now inline SVG in `CooperFab.html`). |
| `components/core/` | `Button`, `Badge`, `Card`, `Avatar` + `AvatarGroup`, `CooperFab`. |
| `components/forms/` | `Input`, `Select`, `Checkbox`, `Switch`. |
| `components/navigation/` | `Tabs`, `SegmentedControl`, `Stepper`. |
| `ui_kits/copperleaf-dashboard/` | Full product recreation — Decision Analytics / Strategy Framework dashboard. |
| `assets/` | Logo lockup, symbol mark, wordmark. |
| `SKILL.md` | Agent-Skill manifest for use in Claude Code. |

**Components** (compiled to the bundle; mount as `const { Button } = window.IFSDesignSystem_6f71e3`): Avatar · AvatarGroup · Badge · Button · Card · Checkbox · Input · Select · SegmentedControl · Stepper · Switch · Tabs.

**Using a component in card/kit HTML:** link `styles.css`, load React 18 + Babel + `_ds_bundle.js` (relative path to project root), then read components off `window.IFSDesignSystem_6f71e3` inside a `<script type="text/babel">` block. (The bundle is generated by the compiler.)

---

## Caveats / open questions

1. **Fonts:** Inter & Roboto Mono are the genuine families, loaded from Google Fonts — faithful. The logo wordmark face **Parabole** is commercial and ships as artwork only; if you need live Parabole text, supply the licensed font files.
2. **Icons:** **Tabler Icons** (the product's set) loaded via the Tabler webfont CDN. Note: the html-to-image preview thumbnailer cannot rasterize webfont `::before` glyphs, so icons may look missing in a *static thumbnail* — they render correctly in the live browser/iframe and in print.
3. **Light theme** is a sensible derivation, not lifted 1:1 from Figma’s light-mode tokens — review if light surfaces matter to you.
4. **UI kit** recreates the Overview / Capital Flow surfaces of the Strategy Framework product; the geospatial **Map** view is intentionally left as an empty state (not reproduced from source). Tell me which additional product surfaces (portfolio optimizer, scenario compare, asset detail) you want built out.
