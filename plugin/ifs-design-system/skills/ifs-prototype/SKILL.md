---
name: ifs-prototype
description: >
  Builds interactive, coded HTML prototypes of IFS Copperleaf screens and flows using the real IFS Design System code kit
  (components rebuilt 1:1 from the Figma library). Use whenever the user wants a clickable prototype, coded mock, demo,
  or interactive screen in the IFS / Copperleaf design system — even if they just say "prototype this", "make this clickable",
  or describe a screen idea. Runs a fixed conversation: clarifying questions → plain-language layout for approval → build.
  Not for Figma wireframes and not for production code.
---

# IFS prototype

You turn the user's idea into a clickable prototype built **only** from the IFS DS code kit. The kit's components are exact code twins of the Figma library. The whole value of this skill is that prototypes look like the real design system, so never draw a component yourself.

## The kit (always the latest, published on GitHub Pages)
`BASE=https://shinyc01.github.io/new-cl-design-system/ifs-kit`

| Read | URL |
|---|---|
| Usage guide: screen anatomy, global rules, "pick the right component" | `$BASE/guide/components.md` |
| Component API: every `IFS.<Name>` with its props | `$BASE/dist/api.md` |
| Real usage of every variant, per family | `$BASE/src/gallery/<family>.jsx` (family names are the `##` headings in api.md) |
| Icon names | `$BASE/dist/icons.txt` |
| CSS token names and values, text-style (`.t-*`) and effect (`.fx-*`) classes | `$BASE/dist/tokens.txt` |
| Prototype starter | `$BASE/template.html` |
| Storybook, for the user to browse | `$BASE/dist/storybook/` |

At the start, make a work folder and download the guide, API, icon list, token list and template with `curl -fsSL` (e.g. into `<output folder>/.ifs/`), then read them from disk. **Before using a component, read its family's gallery file:** api.md lists prop names, while the gallery shows the data shapes they take (table columns and cells, nav items, chart data). Never guess a prop or a token name; check api.md and tokens.txt.

Scripts shipped with this skill, in `scripts/` next to this file:
- `inline.sh <in.src.html> <out.html>`: snapshots the published kit into one standalone file.
- `shot.sh <file.html> <out.png> [w] [h] ['#hash']`: headless-Chrome screenshot, used for self-checks. It needs Google Chrome. Without Chrome, use the browser pane, or skip it and say so.

## The flow — always in this order

### 1. Understand
Read the guide (sections 1–3 especially) and the API, then the user's description. Work out what you already know.

### 2. Ask what you need, once, in one batch
Ask only questions whose answers change what you build. Cover the gaps from this list, and skip anything already answered or obvious:
- **Who and why:** which role uses it, and what are they trying to get done?
- **Screens and flow:** which screens, and how does the user move between them? Where do they start?
- **Content:** what data appears (the main objects and their key fields)? Should it use real-looking sample data or specific examples?
- **Actions:** what can the user do on each screen, and what happens after (saved, moved on, confirmation)?
- **States:** which matter: empty, loading, error, success, permissions?
- **Scope:** which parts must be clickable, and which can be static?

Use `AskUserQuestion` (at most 4 questions per call), with a sensible default as the first option. Where you can make a reasonable assumption, don't ask. State it in step 3 so the user can correct it.

### 3. Lay out the plan in plain language, then stop
Write it for a designer to scan in a minute: no code, no jargon. For each screen:

```
Screen 1 — Investment list
Top: app bar with "Plan" selected, page title "Investments" and a primary button "New investment".
Left: sidebar with Overview · Investments (selected) · Reports.
Main: tabs All / Draft / Submitted to filter the table (no paging, all rows shown).
      Table columns: Name, Owner (avatar), Status (status badge), Cost, Updated. Rows open Screen 2.
Clicking "New investment" opens a modal with 3 fields → Save closes it and adds a row + success snackbar.
```
Name components in plain words, with the kit name in brackets when it helps, e.g. "status badge (StatusIndicator)". Then list:
- **Assumptions** you made.
- **Not in the design system:** anything the idea needs that the kit doesn't have, with your proposal (the closest kit component, or a labelled placeholder). Never quietly invent one.
- **Clashes with the guide's rules:** anything the idea asks for that a global rule forbids, with the compliant alternative. For example, a coloured badge for a meaningful status, where rule 8 asks for an icon + colour status (RiskStatus/StatusIndicator); or table paging, where rule 2 says filter instead.

End with: "Anything to change before I build it?" **Do not build until the user approves.** If they correct things, update the plan. Confirm again only if the changes were substantial.

### 4. Build
1. Save the starter as `<output folder>/<kebab-name>.src.html`. Default output folder: `./prototypes/` in the current working directory, unless the user named one.
2. Write the prototype in the template's `<script type="text/babel">` block. While you work, the `.src.html` loads the live kit from the web, so it opens in a browser as-is:
   - Destructure what you use from `IFS` (`const { Button, Table, Modal } = IFS;`). Use only names that exist in api.md.
   - **Use only kit components for UI.** Your own markup is limited to layout wrappers (div + flex/grid) and plain text using the `.t-*` text-style classes (e.g. `t-heading-h1-medium`, `t-body-m-regular`).
   - Use `var(--…)` tokens for all colours, spacing and radius. No hex, no new fonts, no box that imitates a component.
   - Build one `App` with a tiny screen router: `const [screen, setScreen] = React.useState(location.hash.slice(1) || 'list')`. Keep `location.hash` in sync, so every screen has a URL (`#list`, `#detail`) for screenshots and sharing.
   - Give important in-between states a hash too (`#new` = modal open, `#detail-approved` = after Approve), so screenshots can show them without clicking.
   - Table filters go in Table's `tabs` slot. The Figma table card puts a SegmentedControl there, with counts in the labels.
   - Put realistic sample data in plain arrays at the top of the script. Use the Copperleaf domain (investments, assets, portfolios, value frameworks, scenarios, approvals), and the user's examples first.
   - Everything marked clickable in the plan works: navigation, tabs, filters, modals, and form submit with a visible result.
3. Make the shareable single file: `bash <skill dir>/scripts/inline.sh <name>.src.html <name>.html`. It copies the current published kit into the file, so the prototype keeps looking the same even after the kit changes.

### 5. Check your own work before showing it
- **Screenshot every screen and state hash:** `bash <skill dir>/scripts/shot.sh <name>.html <tmp>/s1.png 1440 900 '#list'`, then Read each PNG.
- **Check against the approved plan:**
  - Every item is present, and nothing extra.
  - No clipped text and no overlaps.
  - No dashed red boxes. Those mean an unknown icon name; check it against icons.txt.
  - A blank page usually means a JSX error or a component name that isn't in api.md.
- **Run** `grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(' <name>.src.html`. It must find nothing outside comments.

### 6. Hand over
Tell the user where the file is (link the `.html`), what's clickable, and any assumptions or placeholders. Offer to publish it as a private shareable Artifact page; publish only if they say yes.

## Rules
- The kit is the design system. If a component looks wrong or is missing, say so in the hand-over (component and variant) so the kit maintainers can fix it. Never patch or restyle it inside a prototype.
- Missing component → say so and propose options in step 3. A placeholder is a dashed box with the text "Not in DS: <what>", never a styled fake.
- The guide's global rules apply to every prototype. For example: buttons rather than inline text links; tables never paginate (tabs filter instead); the stepper is display-only; every icon-only button gets a tooltip.
- Dark theme is the default, because it's the product default and light mode is still a work in progress in Figma.

## Maintaining the kit
Only for kit maintainers (it needs the repo and Figma access): see `references/maintenance.md`.
