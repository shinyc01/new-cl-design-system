# IFS Copperleaf Design System — Project Instructions

## Token architecture

```
DS/tokens/colors.css      ← primitives (raw values live HERE only)
DS/tokens/palettes.css    ← data-viz, collaboration users, map pins
DS/tokens/semantic.css    ← semantic roles (surface/*, text/*, border/*, etc.)
DS/tokens/gradients.css   ← gradient styles
DS/tokens/elements.css    ← component-level states (buttons, inputs, search)
DS/tokens/typography.css  ← type scale
DS/tokens/spacing.css     ← spacing, radius, border widths, elevation, blur, motion, z-index

DS/styles.css             ← single entry point — imports all of the above
website/site.css          ← docs site chrome — built on DS tokens only
DS/components/            ← component reference implementations
```

The rule: **raw hex and rgba values belong only in the foundation token files (`colors.css`, `palettes.css`, `spacing.css`). Everything else must reference a token via `var(--...)`.**

---

## Token audit — run after every change

After any edit to a token file or component, check the files you touched:

1. **Scan for raw values** — search for `#[hex]`, `rgba(`, and bare `px` values in the edited file.
2. **For each raw value:** does a token exist for it in the foundations? If yes, replace with `var(--token-name)`.
3. **Flag any value with no matching token.** Determine whether:
   - It should be added to the appropriate foundation file as a new token, OR
   - It's a known exempt case (see below)

### Known exempt categories (raw values allowed)

| Location | Pattern | Reason |
|---|---|---|
| `colors.css`, `palettes.css`, `spacing.css` | Any raw value | These ARE the foundations — raw values belong here |
| `gradients.css` color stops | `#hex`, `rgba(...)` | CSS `var()` doesn't work inside gradient functions |
| Cooper FAB `@keyframes` aurora | rgba drop-shadow colors | Animation art direction; hues don't map to any token |
| Cooper FAB tooltip drop-shadow | `rgba(0,0,0,0.25)` | `filter: drop-shadow()` takes different format than `box-shadow`; no black-250 token |
| `--edge-top` | `rgba(255,255,255,0.06)` | Intentional Figma value; sits between white-50 and white-100 |
| Elevation shadow colors | `rgba(0,0,0,0.25/0.35)` | No black-250 or black-350 token; Figma-specified values |
| Fixed layout dimensions | `max-width`, `width`, icon `px` sizes | Layout geometry, not design tokens |

If a raw value doesn't fit any of these categories, it must either get a token or get an explicit explanation in a comment.

---

## File responsibilities

| File | Owns | Does NOT own |
|---|---|---|
| `colors.css` | Color primitives (all hues, alpha scales) | Semantic meaning |
| `palettes.css` | Chart data, collaboration, map, data-viz | Any UI color decisions |
| `semantic.css` | Meaning-bearing roles (surface, text, border, background, overlay, focus) | Component states |
| `elements.css` | Per-state component fills/borders (buttons, inputs, search, header items) | Any raw hex |
| `gradients.css` | Gradient styles (CSS limitation: stops use raw hex) | Box shadows, blur |
| `spacing.css` | Space, shape, elevation, motion, z-index | Color decisions |
| `typography.css` | Font family, weight, size/line-height/tracking ramps | Color |
| `site.css` | Docs site chrome only | Any token definitions |
| `DS/components/` | Component markup and self-contained styles | Any raw color/shadow values |

---

## Expressive palette note

Several tokens in `colors.css` are marked `/* PLACEHOLDER */` (fuchsia, violet, electric-blue, lime, coral-orange). Do not use these for production components until the Figma variables are finalised. Collaboration users 1, 5, 6, 7, 8, 10, 11, 14, 15 in `palettes.css` are also PLACEHOLDER for the same reason.
