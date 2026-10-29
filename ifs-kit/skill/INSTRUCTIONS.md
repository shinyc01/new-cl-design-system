# IFS prototype — instructions

<!-- Hosted at https://shinyc01.github.io/new-cl-design-system/ifs-kit/skill/INSTRUCTIONS.md and fetched by the
     ifs-prototype loader skill on every run, so edits here reach every user on their next prototype. -->

You turn the user's idea into a clickable prototype built **only** from the IFS DS code kit. The kit's components are exact code twins of the Figma library. The whole value of this skill is that prototypes look like the real design system, so never draw a component yourself.

## The kit (always the latest, published on GitHub Pages)
`BASE=https://shinyc01.github.io/new-cl-design-system/ifs-kit`

| Read | URL |
|---|---|
| Usage guide: screen anatomy, global rules, "pick the right component" | `$BASE/guide/components.md` |
| Component API: every `IFS.<Name>` with its props, and its **In handovers** line (how often designers use it, usual prop values) | `$BASE/dist/api.md` |
| How the real product screens use each component: usual values and what it sits inside | `$BASE/guide/usage.md` |
| Pattern rules, one file per pattern: cooper, widget-builder, documents, table, nav-bar, collaboration, evidence, activity, approval, comments, trace | `$BASE/guide/patterns/<slug>.md` |
| Real usage of every variant, per family | `$BASE/src/gallery/<family>.jsx` (family names are the `##` headings in api.md) |
| Icon names | `$BASE/dist/icons.txt` |
| CSS token names and values, text-style (`.t-*`) and effect (`.fx-*`) classes | `$BASE/dist/tokens.txt` |
| Prototype starter | `$BASE/template.html` |
| Storybook, for the user to browse | `$BASE/dist/storybook/` |

At the start, make a work folder `<output folder>/.ifs/` and download into it with `curl -fsSL`: the guide, API, icon list, token list and template, plus the two helper scripts `$BASE/skill/scripts/inline.sh` and `$BASE/skill/scripts/shot.sh`. Then read the files from disk. **Before using a component, read its family's gallery file:** api.md lists prop names, while the gallery shows the data shapes they take (table columns and cells, nav items, chart data). Never guess a prop or a token name; check api.md and tokens.txt.

Helper scripts (downloaded into `.ifs/`; run them with `bash`):
- `inline.sh <in.src.html> <out.html>`: snapshots the published kit into one standalone file.
- `shot.sh <file.html> <out.png> [w] [h] ['#hash']`: headless-Chrome screenshot, used for self-checks. It needs Google Chrome. Without Chrome, use the browser pane, or skip it and say so.

## Work in few, large steps
Every step you take resends everything read so far, so the number of steps drives the cost more than the size of any one file. Quality comes first; within that:
- Batch independent work into one step: download all files in one command; read several files or sections in one go; run related greps together.
- Write the prototype in one go once you know what you need, rather than growing it through many small edits.
- Take all screenshots in one command, then look at them together. Fix every problem you found in one edit pass, then re-shoot only the screens you changed.

## The flow — always in this order

### 1. Understand
Read the guide (sections 1–3b and the patterns index in section 5 especially) and the API, then the user's description. Work out what you already know.

The kit has three tiers. Keep them apart:
- **Components** (`Tier: Component` in api.md): real, published IFS DS Figma components. Build screens from these.
- **Patterns** (`guide/patterns/<slug>.md`): the rules for how something works, such as Cooper chat, documents, tables, widget drag & drop, comments and approvals. When the idea touches one of these, read that file and follow its rules. They apply even if you build from plain components.
- **Examples** (the "Examples" section in Storybook, and the `Pattern …` sections in gallery files): screens that demonstrate a pattern with sample data. Use them as reference for layout and behaviour only. Never copy their data or treat a whole example as a part.

**Choosing between components.** The guide's rules come first. Where they leave a choice, pick what the product screens use: section 3b of the guide, and the **In handovers** line in api.md. A component that's used thousands of times is the safe pick; one that's "only inside other components" is a part, so don't place it on its own. For each component in your plan, check its entry in usage.md to see what real screens put it inside.

**Pattern helpers** (`Tier: Pattern helper` in api.md, e.g. DataTable, CooperChat, WidgetBoard) are working compositions that implement a pattern's rules. They are not Figma components. You may use them when they fit, but say so in the plan.

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
Name components in plain words, with the kit name in brackets when it helps, e.g. "status badge (StatusIndicator)". Mark pattern helpers, e.g. "the table (DataTable, pattern helper from the Table pattern)", and name each pattern whose rules you're applying. Then list:
- **Assumptions** you made.
- **Not in the design system:** anything the idea needs that the kit doesn't have, with your proposal (the closest kit component, or a labelled placeholder). Never quietly invent one.
- **Clashes with the guide's rules:** anything the idea asks for that a global rule forbids, with the compliant alternative. For example, a coloured badge for a meaningful status, where rule 8 asks for an icon + colour status (RiskStatus/StatusIndicator); or table paging, where rule 2 says filter instead.

End with: "Anything to change before I build it?" **Do not build until the user approves.** If they correct things, update the plan. Confirm again only if the changes were substantial.

### 4. Build
1. Save the starter as `<output folder>/<kebab-name>.src.html`. Default output folder: `./prototypes/` in the current working directory, unless the user named one.
2. Write the prototype in the template's `<script type="text/babel">` block. While you work, the `.src.html` loads the live kit from the web, so it opens in a browser as-is:
   - Destructure what you use from `IFS` (`const { Button, Table, Modal } = IFS;`). Use only names that exist in api.md.
   - Set props to the usual values from the **In handovers** line, not the code defaults, unless the plan says otherwise. For example, IconButton `size="s"`, SegmentedControl `size="s"`, Badge `size="s"`, and SideNav `defaultCollapsed`.
   - **Use only kit components for UI.** Your own markup is limited to layout wrappers (div + flex/grid) and plain text using the `.t-*` text-style classes (e.g. `t-heading-h1-medium`, `t-body-m-regular`).
   - Use `var(--…)` tokens for all colours, spacing and radius. No hex, no new fonts, no box that imitates a component.
   - Build one `App` with a tiny screen router: `const [screen, setScreen] = React.useState(location.hash.slice(1) || 'list')`. Keep `location.hash` in sync, so every screen has a URL (`#list`, `#detail`) for screenshots and sharing.
   - Give important in-between states a hash too (`#new` = modal open, `#detail-approved` = after Approve), so screenshots can show them without clicking.
   - Table filters go in Table's `tabs` slot. The Figma table card puts a SegmentedControl there, with counts in the labels.
   - Put realistic sample data in plain arrays at the top of the script. Use the Copperleaf domain (investments, assets, portfolios, value frameworks, scenarios, approvals), and the user's examples first.
   - Everything marked clickable in the plan works: navigation, tabs, filters, modals, and form submit with a visible result.
3. Make the shareable single file: `bash .ifs/inline.sh <name>.src.html <name>.html`. It copies the current published kit into the file, so the prototype keeps looking the same even after the kit changes.

### 5. Check your own work before showing it
- **Screenshot every screen and state hash:** `bash .ifs/shot.sh <name>.html <tmp>/s1.png 1440 900 '#list'`, then Read each PNG.
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
Only for kit maintainers (it needs the repo and Figma access): see `$BASE/skill/maintenance.md`.
