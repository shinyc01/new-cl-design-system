# IFS Design System — component usage guide

Source: Figma file `atgUmwcA1AE5sjFoWBT7ar` ("IFS Design System"), read 2026-10-28.
Shared by the Figma-wireframe skill and the coded-prototype skill.

How to read this guide
- Every usage line is tagged **(Figma)** when it comes from a note written on the Figma canvas, or **(inferred)** when it was deduced from the component name, its properties, or how pattern screens use it. Inferred lines are not Figma's guidance.
- Each entry gives `key` (component-set key, for `importComponentSetByKeyAsync`), `node` (id in the source file), and the property axes: `variants` (VARIANT options), `bool` (BOOLEAN), `text` (TEXT), `swap` (INSTANCE_SWAP / slots).
- Naming: **organisms** are what a screen should normally place. **Atoms** and **molecules** are building blocks that organisms are made of; place them directly only when no organism covers the need. On the canvas, the designer marks the preferred set with "💠 … (use this)".
- Sets whose names start with `.` or `_` are private and not listed.

---

## 1. Screen anatomy

The standard product screen (Navigation pattern page, screen "Map - Overview - Default", 1440×900) is a sticky shell around one content area:

| Region | Component | Position / size | Source |
|---|---|---|---|
| Level 1 nav bar | `global-header` (logo + stage tabs Home · Value · Explore · Build · Plan · Results + search/settings/notifications + avatar) | top, full width, 48px | pattern screen (inferred that this is the L1 bar; the canvas documents the L1 bar as `nav-bar-organism`, see Gaps) |
| Level 2 sidebar | `sidebar-pattern` (built on `navigation-panel-organism`) | left, 240px, below nav bar | (Figma) "The 2nd tier of navigation … Level 1 picks the stage; Level 2 picks where you are within it." |
| Level 3 page header | single object's page: `page-header` / `page-header-pattern` / `header-pattern` (kit `PageHeader`); on map views add `canvas-header` underneath. Library/list page: `page-top` (kit `PageTop`) | top of content area | (Figma) "the page header frames the specific page … holding the controls and actions that act on the page's content." |
| Content | 12-column grid (dashboards, content pages) **or** `canvas-background` (map / node-graph views) | fills remaining space | (Figma, Layout) |
| Bottom sheet | `base-bottom-sheet-organism` (Value tab: `value-bottom-sheet-organism`; Explore tab: `explore-bottom-sheet`) — Cooper FAB + prompt chips | bottom of content area, 40px | (Figma) "Baseline for all tabs. If a tab has no special bottom-sheet needs, it uses this." |
| Optional right column | `panel-organism` | 380px expanded / 84px collapsed, full height, in the layout (no overlay) | (Figma) |

Layout rules (Foundations › Layout, Figma):
- Sidebars and header stay sticky while content scrolls; the sidebar collapses to an icon rail on narrow widths before it disappears.
- Hierarchy comes from elevation (blur, shadow, opacity); most elements float.
- Desktop reference frame 1440 × 810 (inside the 1280–1599 range). Minimum supported width 320px. Breakpoints: 320–639, 640–959, 960–1279, 1280–1599, 1600+. Each uses its own `margins/margin-*` and `gutters/gutter-*` token; the grid is fluid inside a breakpoint (columns grow, margins and gutters stay fixed).
- Grid layout: 12 columns, centred, for dashboards and content pages. Sticky header spans full width above it. Cooper FAB anchored bottom-right.
- Map layout: the map background is a draggable canvas filling all space between the sticky header and the bottom bar; bottom bar is sticky.
- Spacing, padding, radius and border use semantic tokens (`paddings/padding-*`, `gap-*`, `radius-*`, `border-*`), never arbitrary values. Layout primitives: Box, Stack (vertical), Flex (horizontal), Visually Hidden (screen-reader-only labels).
- Log-in screen has no product chrome: split layout, brand panel + auth form (`log-in-form-pattern`). (Figma, Log in)

Overlay layers, lowest to highest (Surfaces, Figma): panel (in layout) → popover (anchored to trigger) → drawer (edge, over content) → modal (centred, scrim, blocking). Toasts (`alert-organism`, `snackbar-organism`) float top-right over everything.

---

## 2. Global rules

Each rule is quoted from a canvas note (Figma) and cited by page.

1. **Buttons, not links.** "Inline text links are not used in the interface — any page-to-page move, opening an object, going back a level … is a button." Exceptions: links inside user-authored content and external resources. Use Ghost button where a text link would go. — Action
1b. **Two page headers.** Use `PageTop` on library/list pages (title, description, New action, tabs with counts and smart search) and `PageHeader` on a single object's page (slim bar: back, name, status, actions). (designer decision, Oct 2026)
2. **No table pagination.** "No hidden rows in tables. We don't paginate table content." Narrow with filters that carry counts: on a library/list page, **Tabs** with counts sit above the table card; inside a table card, a **SegmentedControl S** with counts sits in the card's bar (Idea Pad). The table scrolls with a sticky header. A fixed-height card (600px) may use "Show more". — Navigation, Data Display › Table; Patterns › Table (see guide/patterns/table.md)
3. **Stepper is non-interactive.** "Users cannot click or tap a step to navigate between steps." A button or completion event advances it. — Navigation
4. **Every visible field is required.** No asterisks or required markers; optional fields are not shown. — Inputs & Forms
5. **Never disable the primary action to signal an incomplete form.** Let the user submit, then validate all fields, focus the first error; show a form-level summary if more than three fields are invalid. — Inputs & Forms › Form
6. **Every icon-only control gets a tooltip and an aria-label.** Tooltips are non-interactive; anything interactive belongs in a popover. — Feedback › Tooltip
7. **Alerts have three intents only** (error, warning, success). "No info/neutral alert — if it's not one of these three, it's not an alert." Neutral confirmations of a user's action are snackbars; critical messages never go in a snackbar. — Feedback
8. **Never colour alone for status.** Meaningful status uses an icon + colour (`status-risk-*`); colour-only dots are for categories where a label carries the meaning. — Data Display › Status
9. **Cooper orange is attribution only, never severity.** — Comments
10. **Don't create new card, timeline or chart components.** Build cards from `content-card-organism` / `stat-card-organism`, timelines from the timeline base, charts from the data-viz Base atoms. Older one-off sets remain only because handover references them. — Data Display, Data Visualisation
11. **Modal: at most two primary actions.** More means the modal is doing too much; split the flow. — Surfaces
12. **Skeletons only inside the component that owns the async data.** Shell, nav, sidebar, header and static labels render immediately. Unknown shape → spinner; user-triggered action → button loading state. — Content States
13. **Empty-state variant is chosen by cause, never by surface.** — Content States
14. **Charts:** zero-based bars, one series = one colour group, exact values always available (tooltip + data-table fallback). — Data Visualisation
15. **Filters:** a surface is either instant (chips only) or deferred (contains fields, commits on Apply); "instant and deferred never mix on one surface." — Selection › Filter
16. **Field size follows the surface:** L for full-page forms, M for modals/drawers/panels, S for footers/toolbars, XL for view-level selectors that change what the page shows. — Selection, Inputs & Forms

---

## 3. Pick the right component

| Need / intent | Use | Don't confuse with |
|---|---|---|
| Trigger an action, or navigate anywhere | `button` (Primary = single main action, Secondary, Tertiary = dense areas, Ghost = replaces a text link, Accent (Cooper) = hand task to Cooper) | inline links (not used) |
| Action where a label won't fit | `icon-button` + tooltip | `button` with `show-label` off |
| 2–4 directional actions on a canvas node, with shortcuts | `circular-button-organism` | menus/popovers for more than ~4 actions |
| Open Cooper chat | `FTA button` (Cooper FAB) | `prompt-button` (a quick prompt next to the FAB) |
| Single-line text | `text-field-organism` (L full page, M in modals/drawers) | `text-area-organism` (multi-line) |
| Phone number | `mobile-number-field-organism` | `text-field-organism` |
| Search by name/keyword | `search-regular-organism` | `smart-search-organism` (natural-language / Cooper) |
| Wrap a form on a page | `form-card-organism` | `modal-organism` (blocking task) |
| Pick one of 2–5 options, all visible | `segmented-control-organism` (`Number=2…5`) | `tab-organism` (switches peer views of a page) |
| Pick one of many options | `single-select-organism`; typeable / long list → `signle-combobox-organism` | `segmented-control-organism` |
| Pick several options | `multiple-select-organism`; typeable / long list → `multiple-combobox-organism` | `checkbox-molecule` list |
| Binary on/off setting | `switch-molecule` | `checkbox-molecule` (select item in a set) |
| Choose one of a few labelled options in a form | `radio-button-molecule` | `segmented-control-organism` (compact, view-level) |
| Value on a scale / range | `slider-organism` (`slider-molecule Type=Default|Centered|Range`) | text field |
| Date or date range | `date-picker-molecule` | text field |
| Filter / applied value, clickable | `chips` | `badge-atom` (read-only marker) |
| Read-only status or category label | `badge-atom` | `chips` |
| Status that matters (risk, health) | `status-risk-molecule` / `status-risk-atom` | `status-indicator-atom` (colour dot only) |
| Readiness / completion gate | `status-readiness-molecule` / `-atom` | `status-risk-*` |
| L1 navigation between product stages | `global-header` / `nav-bar-organism` | `tab-organism` |
| L2 navigation within a stage | `sidebar-pattern` (`navigation-panel-organism`) | `tab-organism` |
| Switch peer views inside a page; filter a table | `tab-organism` | `segmented-control-organism` |
| Show progress through a multi-step flow | `stepper-organism` (non-interactive) | `tab-organism` |
| Show location in a hierarchy, go up a level | `breadcrumb-organism` | `button` Ghost |
| Step through items one at a time (e.g. Trace Report) | `pagination-organism` | table pagination (not allowed) |
| Short hint on hover/focus | `tooltip-organism` | `popover-organism` (interactive) |
| Error / warning / success message | `alert-organism` | `snackbar-organism` (neutral confirmation, e.g. Undo) |
| Blocking must-complete task | `modal-organism` | `drawer-organism` |
| Larger on-demand task without leaving the view | `drawer-organism` | `panel-organism` (always on) |
| Always-on side context (inspector, confidence rail) | `panel-organism` | `drawer-organism` |
| Small anchored list / picker / mini-form | `popover-organism` | `tooltip-organism`, `drawer-organism` |
| Actions on a current map selection | `floating-bar-organism` | page header actions |
| Any content card | `content-card-organism` (Size M main areas, S nested) | legacy `*-card` sets |
| One key metric | `stat-card-organism` | `content-card-organism` |
| Tabular data | `table-card-organism` | card lists |
| Nothing to show | `empty-state-organism` | blank region, alert |
| Loading with a known shape | skeleton in the owning component | spinner (`empty-state-spinner-molecule`) for unknown shape |
| Chart in a dashboard tile | `data-viz-card-organism` + a core chart (`chart-bar`, `chart-line` …) | legacy named charts |
| Comment on a canvas object | `comment-pin-organism` → `comment-popover-organism` | `tooltip-organism` |

---

## 4. Components by page

### Action (page 1399:9453)

Family note: `button` and `icon-button` have no atom/molecule split. `circular-button-molecule` is a building block of `circular-button-organism`. Icon-button presets (`-notification`, `-comment`, `-arrow`, `-filter`) are ready-made icon buttons with an indicator dot.

### button
key: 4586a1ce53e8ee3578bf548ea04a80f4c4d3c610 · node: 65:3211 · variants: Type=[Primary|Secondary|Tertiary|Ghost|Accent (Cooper)] State=[Default|Disabled|Hover|Pressed|focus] Size=[L (40)|M (32)|S (24)] Focus=[No|Yes] · bool: show-icon-left, show-icon-right, show-label · text: Button label · swap: Icon left, Icon right
**Use for** (Figma) Every action and every navigation move (open object, go to screen, go up a level). Primary = the single main action; Secondary = alternative/frequent actions; Tertiary = secondary actions in dense areas (tables, cards, headers); Ghost = replacement for a text link; Accent (Cooper) = hands the task to Cooper.
**Don't use for** (Figma) Links inside user-authored content or to external resources — those stay links.
**Notes** (inferred) One Primary per region. Size L for full pages, M in modals/drawers, S in dense rows.

### icon-button
key: 582aeb6b8e507436ea2f1e38479b8905e14914ba · node: 71:4250 · variants: Shape=[Square|Circle] Type=[Ghost|Primary|Secondary|Tertiary] State=[Default|Hover|Pressed|Disabled|Focus] Size=[L (40)|M (32)|S (24)] Focus=[No|Yes] · swap: Icon
**Use for** (Figma) An action in a dense context where a label won't fit.
**Notes** (Figma) Must have a tooltip and aria-label (Feedback › Tooltip).

### circular-button-molecule
key: 1f6b2300a76c2cecfdb5fb5406627bbd2e579d52 · node: 72:9983 · variants: Type=[Left|Right|Bottom|Top] State=[Default|Hover|Pressed|Disabled|Focus] Focus=[False|True] · bool: show-hotkey · text: button label · swap: icons-right, icon-left, icon-up, arrow-down
**Use for** (inferred) One directional trigger inside `circular-button-organism`; not placed alone.

### circular-button-organism
key: 6e7baa1e2e8e9a1bf3ffd2d7b0b22b86549bc02b · node: 72:10235 · variants: Buttons number=[4|3|2] Hover=[False|Left|Right|Top|Bottom] State=[Default|Hover] · swap: top/bottom/left/right × default/hover
**Use for** (Figma) A small fixed set (2–4) of related actions tied to a point on a canvas/map node, each with direction + keyboard shortcut, for fast repeat use.
**Don't use for** (Figma) More than ~4 actions; actions not memorable by position; primary page actions (those belong in toolbars/labelled buttons).

### icon-button-notification
key: 7765a80b459106a12e7bc784588ee9950323fddb · node: 357:53417 · variants: Has new notiication?=[True|False] State=[Focus|Default] · swap: Instance
**Use for** (inferred) The bell in `global-header`; True shows the unread dot.

### icon-button-comment
key: a7a4c01882674becff0f88528ad6a670f786318a · node: 2563:8153 · variants: Has a new comment?=[False|True] State=[Default|Focus]
**Use for** (inferred) Opening comments; True shows a new-comment dot.

### icon-button-arrow
key: 3d9d366e342e3ebfd1eaab9dad3f21b849dd706e · node: 6349:61950 · variants: Has a new comment?=[False|True] State=[Default|Focus]
**Use for** (inferred) An arrow icon button with indicator dot. Property name copied from icon-button-comment (see Gaps).

### icon-button-filter
key: aad1dda484839677bec8e32bc7208281054dde05 · node: 6955:768 · variants: Has a new comment?=[False|True] State=[Default|Focus]
**Use for** (inferred) Opening a filter surface; dot = filters applied. Property name copied (see Gaps).

### FTA button
key: 86d029a8385b902196b1d68d01f3979c7a909b75 · node: 67:4758 · variants: State=[Default|Hover|Pressed|Disabled|Focus] Stroke=[True|False] · bool: Show indicator
**Use for** (Figma) The Cooper FAB. Stroke/no-stroke depends on the surface: on a non-black surface (Explore) vs. on a black footer (Value).
**Notes** (Figma, Cooper page) The FAB and the open chat are one entry point; the FAB hides while chat is open.

### prompt-button
key: 1f08a7fa657073060084e796a3ab50fe58e91a34 · node: 67:2937 · variants: State=[Default|Hover|Pressed|Disabled|Focus] size=[L|M] · text: Prompt label
**Use for** (Figma) Quick prompt placed near the Cooper FAB for fast interaction.
**Don't use for** (inferred) General actions — use `button`.

### value-map-button
key: d6f9202c20963796bfcba29f18b9d1711ee76ad8 · node: 2590:20612 · variants: Type=[Input|Shape] Selected=[Default|Fit|Expand|Collapse]
**Use for** (Figma) Map canvas view controls: Fit (zoom to show all, view only), Expand all, Collapse all.
**Notes** (Figma) Floating vertical overlay on the map canvas, grouped in clusters.

### explore-map-button-base
key: c24ad7cfbe456cd753e4f4632f5b258bae381833 · node: 7404:34867 · variants: Type=[Component 1] Selected=[map-action-bar-molecule] · swap: Content slot
**Use for** (inferred) Building block for `explore-map-button`.

### explore-map-button
key: 7c319d0f3bce5cabc95fb0a2244470e05a920559 · node: 7404:34866 · variants: Property 1=[map-tool-bar-organism] · swap: Content slot
**Use for** (inferred) The Explore map's floating tool bar.

### node-button
key: 3b1065e04d0764d228aa583bd159134a461e9e55 · node: 1851:191153 · variants: Type=[Collapse|Expand|Isolate path|Submodel]
**Use for** (Figma) Contextual control shown on hover over a framework node; the action depends on node type/state (collapsed → Expand, expanded → Collapse). Acts on that node only.
**Don't use for** (Figma) Global toolbar actions.

### add-node-button
key: 59936144c1e209d879c8e49d9cd36300523f91de · node: 2879:7311 · variants: State=[Default|Hover|Pressed|Typing|Disabled]
**Use for** (Figma) Creating a new (grey, provisional) subnode on the framework canvas; confirmed via its check icon.

---

### Inputs & Forms (page 1399:17879)

Family note: organisms are the fields to place. `checkbox`, `radio-button`, `switch`, `slider` have atom (bare control) → molecule (control + label); use the molecule in forms. (Figma) Several frames say the compact/molecule variant is for "secondary contexts (drawers, modals) … where space is limited".

### text-field-organism
key: f87f1ea7fbce08976308ea1626d2927f29d57b7f · node: 210:77559 · variants: State=[Default|Hover|Active|Typing|Filled|Overflow|Error|Disabled|Focus|Filled-active|Cooper|Cooper Generating] Size=[L (40)|M (32)] · bool: show-right-text, show-title, show-text-hint, clue-icon, show-left-icon, show-right-icon, show-right-icon2 · text: Placeholder, Title, Hint text
**Use for** (Figma) Single-line input. L = full-page contexts where the input is central; M = drawers, modals, embedded surfaces.
**Notes** (Figma) All visible fields are required; no required markers. Cooper / Cooper Generating states show Cooper-filled values.

### mobile-number-field-organism
key: 1ece9b6a46779254456e89febd0fad022c848ce1 · node: 8947:11306 · variants: State=[Default|Hover|Active|Typing|Filled|Error|Disabled|Focus|Filled-active|Cooper|Cooper Generating] Size=[L (40)|M (32)] · bool/text: same as text-field-organism
**Use for** (Figma) Phone numbers; supports country/region selection and international format. L full page, M compact.

### text-area-organism
key: 6e70ce63c8eb1dec36e8451ffb4da387607cd408 · node: 3024:9383 · variants: State=[Default|Hover|Focus|Typing|Filled|Error|Disabled|Active|Overflow|Cooper|Cooper Generated] Size=[L (140)|M (100)] · bool: show-right-text, show-title, show-hont-text, show-clue-icon, show-input-icon, show-edit-icon · text: Placeholder, Title, Hint text
**Use for** (Figma) Multi-line text. L full page (grows 140→300px), M compact (100→260px); then scrolls internally. Width 140–400px.

### search-regular-organism
key: ca0bad6ca0f94500ecdb651d4b6d0019c036ceab · node: 153:63462 · variants: State=[Default|Hover|Pressed|Typing|Filled|Disabled|Focus|Overflow] · bool: Filter
**Use for** (inferred) Keyword/name search over a list or table.
**Don't use for** (Figma, Table) Natural-language questions — that is the separate Cooper "Ask anything…" bar.

### smart-search-organism
key: cfb1a43e05a8a95ec29184aaf6ffb10a1a978792 · node: 2145:3758 · variants: Type=[Text|Voice] State=[Default|Hover|Disabled|Focus|Pressed|Typing|Filled|Overflow|Recording|Listening]
**Use for** (Figma) Natural-language queries and prompts, where the system interprets intent instead of only matching names.
**Notes** (Figma, Table) Keep it visually distinct from column filters.

### form-card-organism
key: 392abc20ede4670b102f96d6d6006a6291614144 · node: 5826:24755 · variants: Type=[Default] · swap: Footer content, Content slot
**Use for** (Figma) A surface that wraps a form on a consistent backdrop. Slots: header (title, optional description, one optional action) → optional divider → body (fields) → optional footer (actions).
**Notes** (Figma) Width 464–680px (content slot min 400px, 32px padding); height hugs content up to the viewport, then the body scrolls between pinned header and footer. Primary stays enabled; on submit validate all fields. Loading = field skeletons; submitting = primary spinner, form locks.

### checkbox-atom
key: 2fd66408cf49dad48be910477510d1ea6283ee7e · node: 153:60798 · variants: Type=[Unselected|Selected|Indeterminate] State=[Default|Hover|Pressed|Disabled|Focus]
**Use for** (inferred) Bare checkbox inside tables, list rows and cards; supports indeterminate for parent rows.

### checkbox-molecule
key: fe60581e1cb0f327a2b2e40acb463c7206a66e26 · node: 153:61241 · variants: State=[Default|Hover|Pressed|Disabled|Focus] Selected=[True|False]
**Use for** (inferred) Labelled checkbox in forms — selecting any number of items.
**Don't use for** (inferred) An immediate on/off setting — use `switch-molecule`.

### radio-button-atom
key: a23f78cc52294a66a4875c645c2935309465525d · node: 210:113374 · variants: Selected=[False|True] State=[Default|Hover|Pressed|Disabled|Focus]
**Use for** (inferred) Bare radio inside list rows (e.g. single-select filter categories).

### radio-button-molecule
key: 6ee4434fcab8fdd957c6d2689e814035ba5a377c · node: 1387:222956 · variants: Selected=[True|False] State=[Default|Hover|Pressed|Disabled|Focus]
**Use for** (inferred) Labelled exclusive choice among a few options in a form.

### switch-atom
key: 2d6cad5c1d66427be5b7bc45abbb060275ce6b3d · node: 88:23960 · variants: Active=[True|False] State=[Default|Hover|Pressed|Disabled|Focus] size=[L (24)|S (12)]
**Use for** (inferred) Bare toggle inside cards/rows (e.g. map layer cards).

### switch-molecule
key: 281f01b5b04a2d604569db7dc75847f32904a603 · node: 88:22668 · variants: Active=[False|True] State=[Default|Hover|Pressed|Disabled|Focus] size=[M (24)|S (12)] · bool: Show text · text: Label
**Use for** (inferred) Labelled on/off setting that applies immediately.

### sliter-atom
key: d5efc4d25fa8afc167cff6c7642431bbb5d2aa8e · node: 3029:21077 · variants: State=[Default|Drag|Disabled|Focus|Hover]
**Use for** (inferred) The slider thumb; building block only. Name is a typo (see Gaps).

### slider-molecule
key: aeb56b2671755e1c030f6f5f27bb296496737c94 · node: 3029:20933 · variants: Type=[Default|Centered|Range] State=[0 → −|0 → max|0 → +|0|Default] · swap: Slot
**Use for** (Figma) Default = one thumb, zero is the floor, fill length = magnitude. Range = two thumbs, choosing an interval. Centered = zero in the middle, fill left for negative, right for positive.

### slider-organism
key: cc1a72bf908afac72acdf852209f2f53f90b5d8a · node: 3029:20689 · variants: State=[Default|Drag|Hove|Focus|Disabled] · bool: show-hint-text, show-clue-icon, show-title · text: Number, Title, Hint text · swap: show-left-icon, Slot
**Use for** (inferred) A slider as a form field, with title, value and hint; put the right `slider-molecule` type in its slot.

---

### Selection (page 1399:25312)

Family note: (Figma) "single-select-organism (use this)", "multiple-select-dropdown-organism (use this)" [set is named `multiple-select-organism`], "signle-combobox-organism (use this)", "multiple-combobox-organism (use this)". The `-atom` sets are the closed field and list rows; `-list-molecule` is the popup list. Sizes (Figma): S = footers/status bars/compact toolbars (max 240px); M = modals, drawers, side panels, forms (140–400px); L = full-page forms; XL = page-level view selectors that change what the page shows (200–400px). Size labels conflict between notes (see Gaps).
Time Picker and Filter are documented compositions with no own component set (see Gaps).

### single-select-atom
key: 11a0d893cc7607f610f6a47b65c61d410da787a4 · node: 789:18085 · variants: Size=[S (28–24)|M (32)|L (40)|XL (44)] State=[Default|Hover|Focus|Open|Loading|Filled|Error|Overflow|Disabled|Overflow hover] · bool: show-icon-left, show-remove-select, flag · swap: icon-left
**Use for** (inferred) The closed dropdown field; part of `single-select-organism`. Use alone only for S toolbar/footer selectors or XL view selectors.

### single-select-list-atom
key: 1e822b0788d92859ccef310dc14e833c0d4f7d4c · node: 153:61939 · variants: Size=[L (40)|S (28)|User] State=[Default|Hover|Select|Select hover|Active selected|Overflow|Overflow hover|Disabled|Active|Loading] · bool: show-left-icon, description, show-right-icon, show-status, show-suggest, show-shortcut, Flag · text: Text
**Use for** (inferred) One option row in a single-select popup.

### single-select-list-molecule
key: 445715ffc4f2e6d072e576b8ceb05991fb5d72b2 · node: 153:62054 · variants: State=[Default] · swap: Slot
**Use for** (Figma) The option popup. Group headers appear only when the list mixes kinds/sources (e.g. Recent / Suggested / Results); a plain or short list has no header.
**Code** `Select`'s option list, and **`Menu`**: the same list used as a command menu anchored to a trigger (⋮ row menus, split-button menus, "more actions"). Items take an icon, shortcut, description, danger, disabled with reason, a selected check, dividers, section titles and submenus. (inferred) Use `Menu` for every ⋮ / overflow menu rather than a one-off list; pattern helpers such as ActionMenu, CooperMenu and SplitButton are built on it.

### single-select-organism
key: a75ef0a0942e69679ba6f4dd043aabdc29d3856a · node: 3273:26820 · variants: List position=[Down|Up]
**Use for** (Figma) Choosing one option from a list (marked "use this").
**Don't use for** (inferred) 2–5 options that should all be visible — use `segmented-control-organism`; long lists the user needs to type into — use `signle-combobox-organism`.

### multiple-select-atom
key: 6d063cd14644192f7429f82e652abed35c78d25e · node: 3200:7897 · variants: Size=[S (28–24)|M (32)|L (40)|XL (44)] State=[Default|Hover|Focus|Open|Loading|Filled|Overflow|Overflow hover|Error|Disabled] · bool: show-icon-left, show-remove-select · swap: icon-left, Slot … Slot 5
**Use for** (inferred) The closed multi-select field showing chips + "+N"; part of `multiple-select-organism`.

### multiple-select-list-atom
key: 080824eec809ecd0e2b24b55ea838742323ea8e9 · node: 3273:32692 · variants: Size=[L (40)|S (28)|User] State=[Default|Hover|Select|Select hover|Active|Overflow|Overflow hover|Disabled|Active selected|Loading] · bool: show-left-icon, description, show-right-icon, show-status, show-suggest, show-shortcut · text: Text
**Use for** (inferred) One checkable option row in a multi-select popup.

### multiple-select-list-molecule
key: 92e610f9f6f23bb5eea7eec92bb51ec238cef3cd · node: 3273:33695 · variants: State=[Default] · swap: Slot
**Use for** (inferred) The multi-select option popup.

### multiple-select-organism
key: cabd068dfbb1fd08f8ba59578c9a2d8bf54b913f · node: 3273:33904 · variants: List position=[Down|Up]
**Use for** (Figma) Choosing several options (marked "use this").
**Notes** (Figma) Chips in the field are display-only (no ✕, not focusable); editing happens in the popup. ✕ / Delete clears all, recoverable via an Undo toast. Anchor is the only tab stop.

### signle-combobox-organism
key: d6ef5cb4a073c1115378c08060449b6139b41387 · node: 3375:5415 · variants: Size=[M (32)|L (40)|XL (44)] State=[Default|Hover|Focus|Pressed|Loading|Results|No results|Filled|Overflow|Overflow hover|Error|Disabled] · bool: show-icon-left, show-remove-select · swap: Slot
**Use for** (Figma) Single choice where the user types to filter the list (marked "use this").
**Notes** (Figma) "No results" shows the headline with the query; suggestions only when real fallbacks exist. Popup sizes to content. Name is a typo (see Gaps).

### multiple-combobox-organism
key: d17ddcd252d013d1357d830fa198409a2d3e7901 · node: 3375:17949 · variants: Size=[L (40)|XL (44)|M (32)] State=[Default|Hover|Focus|Pressed|Loading|Results|No results|Filled|Overflow|Overflow hover|Filled search|Error|Disabled] · bool: show-remove-select · swap: Slot
**Use for** (Figma) Several choices with type-to-filter (marked "use this").
**Notes** (Figma) While searching the field shows the query, not the selection; clearing the query keeps selections; selected items are grouped on top on open and don't jump while open.

### segmented-control-atom
key: dd6a2aea2480832cf1e489af8fb9ab1d6d2e41ee · node: 1387:244511 · variants: State=[Default|Hover|Pressed|Disabled|Focus] Selected=[True|False] Size=[M (34)|S (24)] · bool: show-left-icon, show-right-icon, show-counter, show-label, show indicator · text: label · swap: icon-left, iconl-right
**Use for** (inferred) One segment; building block.

### segmented-control-organism
key: 8f0ba0e8233ecb28d0c394bc340f993d87fa036f · node: 1387:244501 · variants: Number=[2|3|4|5] Size=[S|M]
**Use for** (inferred) Picking one of 2–5 always-visible options, usually switching a view mode in a card, drawer or chart header.
**Notes** (Figma) S for dense surfaces (modals, lists, compact toolbars); M for roomier surfaces (drawers, side panels).
**Don't use for** (inferred) More than 5 options — use `single-select-organism`.

### chips
key: 187f0c1deb6ce76d8ac35be18e8652e464af0101 · node: 832:235895 · variants: Select=[False|True] State=[Default|Pressed|Disabled|Hover|Focus] · bool: show-icon-left, show-icon-right, Show indicator, show-counter · text: label
**Use for** (Figma) A clickable token for one discrete value. Selection chip = stateful applied filter value, removable with ✕. Suggestion chip = fire-once next action/prompt, no ✕, no checked state.
**Don't use for** (Figma, Badge) Read-only labels — that's a badge.
**Notes** (Figma, Filter) In a chip group values combine as OR; "All" is exclusive; selection is instant.

### cooper-chip-atom
key: 5b2a67a2b679fd24555eb3ae89814bb8ddb67922 · node: 3501:23480 · variants: State=[Default|Hover|Focus|Selected|Disabled]
**Use for** (Figma) In-context marker where Cooper has a recommendation for something that already exists (node, asset, field, row); click opens the recommendation.

### icon-picker-atom
key: 37142e563e3da5e2983b5b4ae440f879e3e0d417 · node: 210:77686 · variants: State=[Default|Hover|Selected]
**Use for** (inferred) One selectable icon cell; building block.

### icon-picker-variants
key: 9bd0e91f3149b83e74f6d254a0dc80ea37d400a2 · node: 210:77815 · variants: Property 1=[Default]
**Use for** (inferred) Icon grid content; building block.

### icon-picker-organism
key: cda4402e69b9c55d6cb27cc5af0f079a9d8269b6 · node: 5434:16926 · variants: Property 1=[Container]
**Use for** (Figma) Choosing an icon for a user-created object (e.g. chat folder) from a curated set; single-select. Place it inside `popover-organism`.

### weekday-atom
key: ea3dc8e507c3a96eeca1cc2a0b0ad4b68fc07dbf · node: 2704:74414 · variants: state=[dayItem] · bool: Show badge · text: day · swap: timeline
**Use for** (inferred) Weekday header cell in the calendar.

### date-atom
key: 3cd956aef880be83c45344518b64bf9e3e1b97de · node: 1440:5201 · variants: State=[Empty|Last|Default|Today|Next month|Selected|Focus|Endpoint|Hover|Event] · text: number
**Use for** (inferred) One day cell in the calendar.

### date-picker-molecule
key: 14442abad0a3dd37bf0cdbe5105a95229d8188a6 · node: 3406:9510 · variants: type=[calendar] · bool: show-apply-button · swap: Slot, title
**Use for** (Figma) Single date: click a day commits and closes, no Apply. Range: two clicks, then Apply confirms. Field is typeable (DD.MM.YYYY) and stays in sync with the grid; header opens month/year view.

---

### Navigation (page 1399:26124)

Family note: (Figma) "organism (use this for patterns)" on Sidebar. Atoms are items; organisms are the containers with slots.

### navigation-panel-atom
key: 71e439562b5331b87a87e8d6d02eb0216868e575 · node: 1544:2681 · variants: Type=[Parent|Child|Subtitle|Submenu] State=[Default|Hover|Active / Selected|Focus|Disabled] · bool: show-icon, show-button, Cooper recommended
**Use for** (inferred) One sidebar row: section (Parent), sub-section (Child), group header (Subtitle).

### navigation-panel-organism
key: 9e6ee63e434c3e6e0b902c2ad2bebd51f329a7c4 · node: 1545:2808 · variants: View=[Expanded|Collapsed] · swap: Content slot
**Use for** (Figma) Level 2 navigation: the persistent sidebar listing sections of the active nav-bar stage. Sticky; collapses to an icon rail.
**Notes** (Figma, Navigation pattern) One sidebar for all stages; only the list changes. Only the header (stage title + collapse) is sticky if the list scrolls. Exactly one item is current.

### tab
key: f88613869d94124c60166c995b6b21c0025e0b09 · node: 1440:5039 · variants: Size=[M (36)|L (40)] State=[Default|Disabled|Focus|Hover|Selected] · bool: show-counter · text: Text
**Use for** (inferred) One tab; use `show-counter` for table filter tabs.

### tab-organism
key: 9de24e7425b53e593158bf9545205cde0983de19 · node: 3412:32038 · variants: Size=[M (36)|L (40)] · swap: Slot
**Use for** (Figma) Switching between peer views within the same page (sections of equal standing, no order). Also the primary table filter, with counts (Table notes).
**Don't use for** (inferred) Stage or section navigation (nav bar / sidebar) or step progress (stepper).

### canvas-container-atom
key: 7d3041cd8cec779820a577b6cec9b63be6d982c7 · node: 1440:5305 · variants: State=[Default]
**Use for** (inferred, verified on canvas) One column label (240×26, e.g. "Enterprise Goals") inside `canvas-header`. Code: `CanvasColumn`.
**Notes** It is not the mini-map. The Navigation page describes a mini-map navigator (Figma: "compact overview of the full canvas… current viewport indicated") but has no component for it, only a flat image. Treat the mini-map as **not in the DS**.

### canvas-header
key: d776a405e8007c5b16160c7b962ecc42be4b5f08 · node: 1440:5321 · variants: State=[Default] · swap: columns
**Use for** (inferred) Column header strip across a framework canvas (Enterprise goals · Value framework · …), placed under the page header on map views.

### sunkey-canvas-header
key: ce04ed8adbf361badb78d2f1174a863abc3b0b4c · node: 1865:15498 · variants: Expanded=[False|True]
**Use for** (inferred) Column header for the Sankey canvas view. Name typo "sunkey" (see Gaps).

### stepper-molecule
key: c0f909fd7397868be1b10000e9a6587ca26e324f · node: 1219:169725 · variants: State=[Completed|In progress|Not started] Hover=[False|True] Active=[No|Yes] · text: Text
**Use for** (inferred) One step; building block.

### stepper-organism
key: e41e57775d6407a432ca1ff680005332fd3b90b2 · node: 3029:22750 · variants: State=[Default] · swap: Slot
**Use for** (Figma) Indicating progress through a multi-step flow; any number of steps.
**Don't use for** (Figma) Navigation — it is non-interactive; a button or completion event advances it.

### breadcrumb-atom
key: 1f0dfbd6d7a5e86837e49589ffbb03275f6ffb61 · node: 3492:9413 · variants: Type=[Previous|Current|Next] State=[Default|Hover|Focus|Disabled] · bool: show-icon-left
**Use for** (inferred) One crumb; building block.

### breadcrumb-organism
key: cd2fc2f32033a183bdeab68914c9659037b6092b · node: 67:4698 · variants: State=[Default] · swap: Slot
**Use for** (inferred) Showing where the page sits in a hierarchy, with a back ‹ control.
**Notes** (Figma) Each crumb is a tab stop; the current crumb is plain text with aria-current="page"; separators are not focusable.

### pagination-organism
key: f1d3bbde85fc0354bdef49638fab38f9e53b08f7 · node: 3497:9660 · variants: State=[Default] · bool: show-%, show-all-button, show left icon
**Use for** (Figma) A record-pager for item-by-item content where the user focuses on one item then steps to the next (e.g. Trace Report).
**Don't use for** (Figma) Tables — tables are never paginated.

---

### Feedback (page 3786:15406)

### tooltip-organism
key: 746b91f06e64d6a6c02614c5f3fe2fc1ba7d4488 · node: 67:6151 · variants: Color=[black|grey (for black bg)] Type=[Bottom|Top|Left|Righ] Arrow=[Left|Center|Right] · bool: show-hotkey · text: Label · swap: Conetnt slot
**Use for** (Figma) A small transient label on hover and keyboard focus that names or clarifies an element; required on every icon-only control. Simple non-interactive content (text, status, date, avatar, metadata).
**Don't use for** (Figma) Essential content, headings, links, buttons or forms — use `popover-organism`.
**Notes** (Figma) ~300–500ms delay in, instant out; Esc dismisses; never tap-only.

### alert-organism
key: cf5233607e4a9a48322a2b6862c2d052cbfe3ea8 · node: 1440:5440 · variants: Type=[Error|Warning|Success] · bool: show-button, show-icon, show-close-icon · text: Body, Title
**Use for** (Figma) Error (persistent, dismissible only once resolved), Warning (persistent while the condition holds), Success (auto-dismiss ~4s, may carry Undo). Floats top-right over the layout.
**Don't use for** (Figma) Info/neutral messages — use inline text, a tooltip, or a snackbar for action confirmations.

### snackbar-organism
key: 591596218d7f22f72eaa4036436a2837f5ca866c · node: 3795:29459 · variants: Property 1=[Default] · bool: Show button, Show description, show-content-slot, show-actions, show-close-icon-button, show-primary-button, show-secondary-button · swap: Content slot
**Use for** (Figma) Neutral, transient confirmation of an action the user just took, with an optional recovery action (1–2 actions). Top-right, auto-dismiss ~4s, newest on top.
**Don't use for** (Figma) Critical messages or red/amber/green intents — use `alert-organism`.

---

### Surfaces (page 1399:13914)

Family note: all surfaces are organisms with a free content slot; the slot holds any content with its own spacing.

### modal-organism
key: 5f4826b2338dec1eddf08575ee2e3b53b11047b0 · node: 4169:208596 · variants: Color=[modal] · swap: Content slot, Slot, stack
**Use for** (Figma) A focused must-complete-or-cancel task over a dimming scrim (confirm collaborator + role, critical decision, short Save/Cancel form).
**Don't use for** (inferred) Long tasks that don't need to block the page — use `drawer-organism`.
**Notes** (Figma) Header (title, never wraps, + ✕ always top-right), content slot (scrolls), footer actions right-aligned, max two primary actions. Width 300–600px; height up to ~80–90vh.

### floating-bar-organism
key: e09f61a3d506abeb1f2cbfc8e0f5d551a9bf7e9e · node: 7405:22521 · variants: Color=[floating bar] · swap: Content slot, Slot, stack
**Use for** (Figma) Contextual action bar, top-centre, shown while something is selected on the map: what is selected + actions (secondary buttons, then one primary) + ✕ to clear.
**Notes** (Figma) Multi-select shows a count and only actions valid for the whole set.

### panel-organism
key: f0e3c9a42ff7672fb98146c09103ce63ae364044 · node: 4305:365421 · variants: Expanded=[True|False] · bool: show-evidence-chain · swap: Content slot
**Use for** (Figma) Persistent, always-relevant side context inside the page layout (confidence/insight rail, inspector, secondary reading pane). 380px expanded / 84px collapsed, full height, divider not shadow.
**Don't use for** (Figma) Temporary tasks or on-demand detail (→ drawer or popover); anything with a scrim or focus trap.

### popover-organism
key: b1a1290539605f4cb6e823a69ae880e057eec65f · node: 4394:56471 · variants: State=[Default] · bool: show-scroll-bar, show-search, show-title, show-filter · swap: Content slot, Title slot
**Use for** (Figma) A small floating surface anchored to its trigger: detail preview, small picker, quick action list, view switcher, compact display settings, searchable list behind a count ("16 Documents").
**Don't use for** (Figma) Full tasks or long content (→ drawer), always-on context (→ panel), one-line hints (→ tooltip).
**Notes** (Figma) 160–600px wide, max 600px tall; header/search pinned.

### drawer-organism
key: 3c178c91da5d2bb92785e559d3150c4af26290be · node: 4394:21241 · variants: Expanded=[True|False] · bool: show-segmented-control, show-subtitle, show-scroll-bar, show-tabs, show-button-close · swap: Content slot, Header slot
**Use for** (Figma) A focused, self-contained task or detail larger than a popover, opened on demand from a screen edge over the content (e.g. node details on the map).
**Don't use for** (Figma) Always-on context (→ panel) or small anchored snippets (→ popover).
**Notes** (Figma) Informative → close only; actionable → collapse + close; error/blocking → neither until resolved. Can expand to fill the content area.

### canvas-background
key: 469b20dc88f36eb27b9051d17744419f31e4b176 · node: 1395:196712 · variants: State=[Default|Image]
**Use for** (Figma) The infinite, pannable, zoomable ground plane for map-first and node-graph views (Value framework, Explore map).
**Don't use for** (Figma) Document-flow pages — those use the 12-column grid.

### overlay-background
key: 29a182dbd1e5eec6fe8fb4b8271a62a5de4fc884 · node: 338:21403 · variants: Type=[Strong|Base] · bool: text
**Use for** (Figma — link to this set inferred from position) The dimming scrim behind a blocking modal.

### move-and-drop-background
key: f7c32a9cbc4e55d8cfa64b7ae0d2ad6f026c1899 · node: 4509:30446 · variants: Type=[change-position-overlay] · bool: text
**Use for** (Figma) Dashboard edit mode: widgets become draggable tiles and the background shows the dashed drop zone.

---

### Data Display (page 3501:10172)

Family note: (Figma) "content-card-organism (use this)", "stat-card-organism (use this)", "table-card-organism (use this)". Status, Table and Activity sets are atom → molecule → organism; place organisms/molecules in screens.

### badge-atom
key: 452878e49ba2f0ac28993857d55f0d9f0522c910 · node: 83:52162 · variants: Color=[White|Black|Red|False|Loading|Green|Orange] Size=[L (32)|M (24)|S (20)] · bool: show-icon-left, show-icon-right, show-indicator, avatar, flag · text: Text, Label · swap: icon-left, icon-right
**Use for** (Figma) A small read-only marker of status or category attached to another object (Passed / At risk / Failed; Active / Draft / Archived; Critical / Recommended).
**Don't use for** (Figma) Anything clickable, removable or selectable (→ chip), the primary content (→ text), or triggering an action (→ button). Don't badge everything.

### avatar-atom
key: d8d17241bdd28df16639fd1226171fb439167bca · node: 260:17144 · variants: Type=[Black|Red|Dark orange|Orange|Yellow|Brown|Dark blue|Blue|Light blue|Green|Lime|Dark purple|Purple|Light purple|Dark pink|Light pink|Image|Awaiting|Cooper|Inactive|Loading] State=[Default|Hover|Focus|Pressed] Focus=[False|True] · text: Label
**Use for** (inferred) The avatar face (initials colour, image, Cooper); building block.

### avatar-organism
key: 816f2bea663ec437b58eedc5de21e1147ffe355d · node: 260:19923 · variants: Size=[XL (56)|L (40)|M (32)|S (24)|XS (16)] · bool: show-status
**Use for** (inferred) A person or Cooper anywhere in the UI (header user menu, cards, comments).

### cursor-atom
key: 80c816a43cbc41bec71fac866f5e54a974d55234 · node: 55:1645 · variants: User=[1…16|Cooper] · text: user name
**Use for** (Figma) Live multiplayer cursor with name label; one stable colour per user (Collaboration colours, not data-viz palette).

### content-card-organism
key: 99713332efed795904a7f1559ac2c03084a677d5 · node: 3643:32067 · variants: Size=[S|M] State=[Default|Focus|Hover|Drag|Cooper|Loading|Selected] · bool: show-top-content-slot, show-bottom-content-slot, show-icon-left, show-icon-right, show-checkbox, show-radio-button, show-switch, show-description, show-icon-button, show-buttons, show-tertiary-button, show-primary-button, show-avatar · swap: Bottom-content-slot, Top-content-slot, Top-content-slot2
**Use for** (Figma) Every content card (content, selectable, settings, link, media); vary it with props. Size M = main element with room (primary areas, dashboards, full-width lists); S = nested in drawers, side panels, popovers, dense lists.
**Don't use for** (Figma) Cards with behaviour the base can't model (drag/connect on a canvas, map-tied selection) — those get their own component, e.g. `node-card`.

### stat-card-organism
key: 6702e8e153b03745386c71b217787a31fd26acbd · node: 3643:35055 · variants: Size=[M|S] Loading=[False|True] · bool: show-title, show-trend, show-additional-content-slot, show-badge · swap: Value-slot, Additional content slot
**Use for** (Figma) Displaying one key metric (title + value + optional trend/badge).
**Notes** (Figma) Read-only: no hover/focus/selected/disabled; only a loading skeleton.

### marker-atom
key: c048f05b9c277f8652fcceb6edf982798cc1a0cd · node: 3713:12836 · variants: Size=[M (32)|S (24)] · swap: Slot
**Use for** (inferred) Timeline marker (icon/avatar circle); building block of `activity-organism`.

### connector-atom
key: 85326c8575fb30ef4816afcc998b3b6b170e76c8 · node: 3713:12835 · variants: Type=[Dash|Solid]
**Use for** (inferred) Line between timeline markers; building block.

### activity-organism
key: 8ba3870c0d51b9262604f15ac34f8f05d601454c · node: 3713:13396 · variants: Type=[timeline activity component] · swap: Content slot
**Use for** (Figma) The timeline base: build any activity/timeline entry type from slots.
**Notes** (Figma, Timeline List) "Don't create a new timeline component. Use Timeline Base instead."

Legacy cards (Cards List frame). (Figma) "Many cards were built before the card base existed … don't create a new card component unless the card is genuinely unique." Each of the following "can refer to content-card-organism": prefer `content-card-organism` for new screens; use the legacy set only to match an existing handover screen.

### question-card
key: d3ecfa2e5f8620ad9de4b1b3b51d47a171e194fe · node: 2704:72490 · variants: State=[Default|Loading|Hover|Pressed|Focus]
**Use for** (inferred) A suggested question tile. **Notes** (Figma) Legacy; can be `content-card-organism`.

### portfolio-card
key: ce06c53dbb05702c1a90be68865a255d55a5f873 · node: 1440:5847 · variants: Loading=[False|True]
**Use for** (inferred) Portfolio summary tile. **Notes** (Figma) Legacy; can be `content-card-organism`.

### submodel-card
key: ce27903940f94600cae5f50cd01c8b5bbea86c50 · node: 2670:6376 · variants: State=[Default|Hover|Focus] Select=[False|True]
**Use for** (inferred) Selectable value-submodel item. **Notes** (Figma) Legacy; can be `content-card-organism`.

### version-card
key: f0dd8a3fa252b83c2f062077b2091018fc71d077 · node: 2104:4022 · variants: State=[Default|Hover|Loading] · swap: List
**Use for** (inferred) A version entry with change list. **Notes** (Figma) Legacy; can be `content-card-organism`.

### impact-usage-card
key: 43ba41516c42071a26820731ad55a53efdcddd5c · node: 1440:5297 · variants: Type=[Ready|In progress] Expand=[True|False] · bool: show-badge-1, show-badge-2 · text: Label
**Use for** (inferred) Where an item is used / its impact. **Notes** (Figma) Legacy; can be `content-card-organism`.

### file-card
key: c216b81e4d1814f9e33b9781d0662c01e11d1175 · node: 1440:5465 · variants: State=[Default|Hover|Loading|error]
**Use for** (inferred) An uploaded document. **Notes** (Figma) Legacy ("Documents"); can be `content-card-organism`.

### photo-item
key: 32310d3dc14f8be8765ecd9cc213d15056cf7dcf · node: 4448:2460 · variants: Property 1=[Hover|Default|No image] Size=[L|S]
**Use for** (inferred) One photo thumbnail. **Notes** (Figma) Legacy; can be `content-card-organism`.

### photo-gallery
key: 89913362cbb1a7fb983cb568cd96e9b7f2b244d5 · node: 4450:10180 · variants: state=[Default]
**Use for** (inferred) A grid of photo items. **Notes** (Figma) Legacy; can be `content-card-organism`.

### stat-capital-flow-card
key: 35bab0755c38e4ea52ad43fb1f25359f15548085 · node: 1858:15408 · variants: Type=[Metrics (M)|Metrics (S)|Default|Badges|Compare] Score=[Default|Up|Down] Loading=[False|True] · bool: description, badge · text: title, value, descr-text, number
**Use for** (inferred) Capital-flow metric. **Notes** (Figma) Legacy; can be `content-card-organism` (inferred: `stat-card-organism` fits better).

### collaborator
key: 9c03ed9c19bfbc2a0acc10f891c9a91e8eb66851 · node: 1440:6097 · variants: Type=[Joined|Awaiting|Recommended] State=[Default|Hover|Loading|Focus] · bool: show-icon-button
**Use for** (inferred) A collaborator row with invite status. **Notes** (Figma) Legacy; can be `content-card-organism`.

### user-card
key: 44e5e704468d3fc2e1656cdc8ce46e6989ee71ca · node: 1440:5059 · variants: Type=[Assigned|Owner] State=[Default|Hover|Drag|Loading|Focus] · bool: show-checkmark-icon · swap: Slot
**Use for** (inferred) An assigned person / owner. **Notes** (Figma) Legacy; can be `content-card-organism`.

### capex-card
key: 68fd47d4cc84ea5a533bb2de20006a7cf02f5a34 · node: 2095:9245 · variants: Type=[Expand|Default|Expand full] Loading=[True|False] · bool: show-checkmark-icon · swap: Slot
**Use for** (inferred) CAPEX summary. **Notes** (Figma) Legacy; can be `content-card-organism`.

### source-card
key: fafdbabda4e12538ef46da239997daad283c2291 · node: 1440:5362 · variants: Type=[User|File] Content=[Map|Quote|Image|Text] Loading=[False|True]
**Use for** (inferred) Evidence/source behind a Cooper answer. **Notes** (Figma) Legacy; can be `content-card-organism`.

### create-card
key: 99b13fe83f738c1ee3a0498f813df124cff3652c · node: 1557:2849 · variants: State=[Default|Hover|Pressed|Focus|Loading] · text: Description, Title
**Use for** (inferred) "Create new …" tile. **Notes** (Figma) Legacy; can be `content-card-organism`.

### sidebar-node-card
key: 9bc97598536ce202f5c19ad91ddb1644f28fd37e · node: 2667:6608 · variants: State=[Default|Hover|Drag|Focus|Cooper hover|Coper drag]
**Use for** (inferred) Draggable node in a side list, dropped onto the canvas. **Notes** (Figma) Legacy; can be `content-card-organism`.

### duplicate-framework-card
key: 0a5f42482d431ed542ea98c9ef5743df3bce26db · node: 2479:26951 · variants: State=[Default|Hover|Pressed|Focus|Loading] · bool: Show source, Show cooper description, Show badge, checkbox
**Use for** (inferred) Picking a framework to duplicate. **Notes** (Figma) Legacy; can be `content-card-organism`.

### node-card
key: 750f201be58e7755aac819efdb6b7b3ed3bb7290 · node: 1440:4401 · variants: Type=[Strategic objective|Value model|Enterprise goal|Value framework|Document|Measure|Subnode|Skeleton|User] State=[Default|Hover|Drag|Select|Cooper|Focus|Cooper drag|Out of focus|Disabled|Checkbox|Edit|Loading] · bool: show-caption-bottom, show-badge-top, show-counter, show-stack-icons · text: Title, Caption · swap: badge
**Use for** (Figma) The node on the framework/map canvas — the named exception that earns its own component because of canvas behaviour (drag/connect, map-tied selection).

### approval-chain-timeline
key: 40e7aa77d80a31efbd6aa77b304cd6ab967b3476 · node: 1440:6174 · variants: State=[Awaiting|Success|Rejected|Empty|Setting|Disabled] · bool: show-comment, show-date, show-buttons, show-brief · text: Comment text, User name, Position, Date text
**Use for** (inferred) One approver step in an approval chain. **Notes** (Figma) Legacy timeline; new ones use the timeline base (`activity-organism`).

### version-history-timeline
key: e90e29e6ecce4050feb291ae1a91f65329a31049 · node: 2277:5299 · variants: State=[Default|Hover|Rename] Expand=[False|True] · bool: show-badge · swap: Timeline slot, content, content2
**Use for** (inferred) A version-history entry. **Notes** (Figma) Legacy timeline; use timeline base for new work.

### activity-timeline
key: bc78050b665650abad8881247451ab78062edaa7 · node: 1440:5630 · variants: Type=[Action|Comment|Udpate]
**Use for** (inferred) Activity feed entry. **Notes** (Figma) Legacy timeline; use timeline base for new work.

### status-indicator-atom
key: ffa7c941b362082a990cbd0a4da668c1d1d22c82 · node: 789:39211 · variants: State=[Default|Error|Success|Cooper|Warning|Blue] Stroke=[False|True]
**Use for** (Figma — mapping of note to set inferred) Colour-only dot for category/identity (legend, series marker, online dot) where a label next to it carries the meaning.
**Don't use for** (Figma) Anything the user must act on — colour alone isn't enough.

### status-risk-atom
key: debedb08a6fea7536abfaf154793b70a4bdf6b7a · node: 260:18430 · variants: Type=[Online|Offline|Check|Warning|Error|Reload]
**Use for** (Figma — mapping inferred) Icon + colour status for risk, health or process state; the default for meaningful status.

### status-readiness-atom
key: 0f8e5a391621bc46d0ef25ecfdf78ea3c2f8350f · node: 1440:6243 · variants: Type=[Success|Rejected|Awaiting|Empty]
**Use for** (Figma — mapping inferred) Readiness/completion gates: ready, passed, waiting, not begun (stepper stages, checklists, approval gates).

### indicator-molecule
key: b502bee1de01b0a19c389e8ec5999d82c94691a4 · node: 1074:180251 · variants: Size=[S|XS] Type=[Orange|Green|Red|Blue|Purple|Gray|Cooper|Archive|Loading] · bool: button right · text: text
**Use for** (inferred) Dot + text status label (e.g. "● Active" next to a page title).

### status-readiness-molecule
key: 7e46b792a0b5f29535e4f66bd1d98990eaac66c3 · node: 1440:5273 · variants: Type=[Done|Warning|In progress|Loading|Active] Right-section=[Text|Status] · text: Label
**Use for** (inferred) Labelled readiness row (label + readiness icon/text).

### status-risk-molecule
key: 278dd7af4049ffb137c5db5679b59b99b62a6993 · node: 69:1729 · variants: Type=[Success|Warning|Error|Evaluated] State=[Default|Hover|Disabled|Focus|Loading]
**Use for** (inferred) Interactive risk status chip on cards, rows, assets.

### hotkey-atom
key: a2085d1d932d63599bf9eac687a3d9beff5b71cf · node: 67:6150 · variants: Property 1=[Default] · text: hotkey
**Use for** (inferred) Keyboard-shortcut label inside tooltips, menus and circular buttons.

### counter-atom
key: d1fbe5eba174501f6b3340a70cd928d127e1ae6b · node: 88:24147 · variants: Size=[S (18)|M (24)] · bool: show-indicator
**Use for** (inferred) Numeric count on tabs, chips, segmented controls.

### scroll-bar-atom
key: e0af1521d2c348787605e36a7c038d9db9efd8e3 · node: 83:57650 · variants: Location=[Top|Center|Bottom]
**Use for** (inferred) Custom scrollbar inside scrolling surfaces (popover, drawer).

### table-sort-atom
key: d0b0b2ddb9d5196588f822cfe9487510e360fa61 · node: 1440:5921 · variants: State=[Default|Hover|Selected up|Selected down]
**Use for** (Figma) Per-column sort control; one active sort at a time, active column shows ↑/↓.

### table-filter-atom
key: 98141b94b2ed7e1429cb0fe9ab5c9191fbf49d7b · node: 1440:5932 · variants: State=[Default|Hover|Applied]
**Use for** (Figma) Per-column funnel filter, composable with tab filters.

### table-header-molecule
key: da7b4eb424b891f91adde562bd02dfd924b4d8d8 · node: 1440:5904 · variants: Type=[Column|Row] State=[Default|Hover|Empty] · bool: show-sort, show-title, show-filter, show-clue-icon · text: title-text
**Use for** (Figma) Sticky column header: short, uppercase, muted labels; align to the column's content.

### table-cell-atom
key: 688040eb82c8d6fa44426f329b11676e7155e59c · node: 1440:5941 · variants: Type=[Text|Badge|Status|Check|In progress|Counter|Action|Action icons|User|User description|Comment|Text and button (hover)|Text + description|Text + counter] State=[Default|Hover|Edit|Loading] · bool: show-description, show-acion, Show badge, Evidence · text: Label, description-text, user-name · swap: container, Slot
**Use for** (inferred) Every table cell; pick Type by content.
**Notes** (Figma) Text left, numbers right (consistent decimals), dates left in one format.

### group-row-molecule
key: bca74fe30c1def518e280fae97fe03b9bc984049 · node: 4833:19072 · variants: Expand=[True|False]
**Use for** (inferred) Collapsible group row in a grouped table.

### content-row-molecule
key: 59fa4f1a0ba0eeb6dd0f00dc44c6a4499f7d84f0 · node: 4835:3501 · variants: Type=[Header|Content] · swap: Content slot
**Use for** (inferred) A table row (header or content) holding cells.

### table-card-organism
key: 25c7d3168ccea0f233a83f49870008d946efbd01 · node: 4835:4031 · variants: State=[Default] · bool: show-table-name, show-segmanted-control · swap: Content slot, Content slot2
**Use for** (Figma) Any data table (marked "use this"): no pagination, scrolls with sticky header, tabs with counts as primary filter, column filters, one density per table, hairline row separators at most.

### notification-card
key: cdb272f432a62ab202e69c42f3904218e9535928 · node: 9943:5373 · variants: Type=[All|Specific|Grouped] Read=[Unread|Read] · bool: show-critical, show-status, show-details, show-actions, show-action-required · text: title, meta, time, details
**Use for** (Figma, component description) Notification tray card. Type = what happened; Read = unread dot + contrast; show-critical adds the error status.
**Notes** (inferred) Sits loose on the page, outside any documented frame (see Gaps).

---

### Data Visualisation (page 3487:19894)

Family note: (Figma) "don't create a new data-viz-chart component unless the graph is genuinely unique — if not use Base to build graphs." Build charts from Base atoms inside `data-viz-card-organism`. Rules (Figma): zero-based bars; one series = one colour group, sequential ramps use hues within one group; every chart backed by exact values (tooltip + data-table fallback).

Base (building blocks; atoms/molecules) and chart containers:

### data-viz-card-organism
key: c8f7de2643016ae6e5743710549e304b7e24323f · node: 4457:33030 · variants: State=[Default|Hover|Drag|Cooper] · swap: Content slot
**Use for** (inferred) The card that holds any chart on a dashboard; Drag for dashboard edit mode.

### data-viz-header-molecule
key: b323b7775864a732f980974ebcb25ef773c03e30 · node: 2154:2068 · variants: State=[Default|Hover] Right element=[False|Segmented control|Button] · swap: button-wrapper, button-wrapper2, button-wrapper3, Slot
**Use for** (inferred) Chart title row with optional view toggle or button.

### data-viz-modal-organism
key: 9cb50333d44ceec89e04a79af8f04089bbf4c6f4 · node: 4440:32681 · variants: State=[chart-info-modal] · bool: show-value · swap: content
**Use for** (inferred) Chart tooltip / info pop-up showing exact values on hover.

### indicator-atom
key: bf0624ed66300f5689d56fd8c8eed609cc9edccb · node: 4440:32643 · variants: Type=[Default|Intended target|Selected] · bool: show-value
**Use for** (inferred) Target/selection marker on a chart (e.g. bullet-chart target).

### value-label-atom
key: 21a7ab077caeced7dfceccf6b94566c82f1503f5 · node: 4440:32611 · variants: State=[Primary|Secondary|Tertiary|Empty|Loading] · bool: show-value
**Use for** (inferred) Axis or data value label.

### line-atom
key: bd367cef6cfa7638ed82f88c457288c2ee81971d · node: 4440:32650 · variants: Dashed=[True|False]
**Use for** (inferred) Gridline / reference line; dashed for planned or median.

### legend-swatch-atom
key: 4b6f18b32314e18223626d18273c25d79561216f · node: 4440:32628 · variants: State=[Default|Hover|Out of hover|intended target] · bool: show-value
**Use for** (Figma, Donut/Radar — mapping inferred) Legend entry; follows slice/series order; hover-only, not clickable.

### bar-atom
key: 3fc09fd3ca10bf9bd417e4085083473ea48449c7 · node: 4457:32996 · variants: State=[Default|Hover|Out of focus|Background|Loading] · bool: show-value
**Use for** (inferred) One bar; Background = the meter track.

### grouped-bar-molecule
key: 9c57f4912d2699186e92628c197ca422b95a7b1e · node: 4457:37362 · variants: Type=[Horizontal|Vertical] Progress=[False|True] · swap: Content slot
**Use for** (Figma, Bar Chart) Grouped bars: compare 2–3 series across the same categories; Progress=True = meter bar against a max.

### donut-chart-atom
key: bc5be0933481cf9a89eb91186ccb2535f937b84a · node: 2393:2672 · variants: Property 1=[Variant3]
**Use for** (Figma, Donut Chart) Share of a whole; legend right for wide cards, below for narrow; direct labels for 2–3 slices.

### radar-chart-atom
key: 20efe1045ff2a683d816ff215a0fe13342944a17 · node: 4457:42493 · variants: State=[Default]
**Use for** (Figma, Radar Chart) Comparing 3–6 options across 5–8 criteria; hover dims other polygons to 15%.

### progress-bar-molecule
key: dd5fce1be40692bc8ac61c7d0eb6c2bb075fcc96 · node: 1674:1902 · variants: %=[100|80|60|50|40|20|10|0]
**Use for** (inferred) Linear progress toward completion.
**Notes** (Figma, Content States) Use a progress indicator for measurable work (uploads, steps).

### progress-ring-molecule
key: 66485e7c2150ef45fef0c4182ec9d6c5b77e5b82 · node: 4619:18187 · variants: %=[100|80|60|50|40|20|10|0]
**Use for** (inferred) Circular progress in tight spaces (cards, KPI tiles).

### evidence-strength-bar-molecule
key: 84d44038daa06f1e043442daaeda90138ada6dca · node: 67:6634 · variants: Type=[Reject|Review|Approve]
**Use for** (inferred) Strength of evidence behind a Cooper recommendation, mapped to Reject/Review/Approve.

### sankey-header
key: 51e1165aef83b131a258d998dcd3fef85bac0d53 · node: 2698:64494 · variants: type=[column-header]
**Use for** (inferred) Column header of a Sankey chart; building block.

### sankey-atom
key: 3389a5488a733b837c2c33c8f32a212af11b7a8e · node: 1853:12325 · variants: Type=[Default|Measure] state=[Default|hover|Disabled] · bool: compare-data
**Use for** (inferred) One Sankey node; building block.

### sankey-chart
key: 16b4af67fa417f01e5fcad7ac956bb29009a24db · node: 1853:12398 · variants: Type=[Container|Sunkey] · swap: Content slot
**Use for** (inferred) Sankey canvas body; building block of `sankey-organism`.

### sankey-organism
key: ac1c8cbd6b31f42b22a4ca3431a9b6b8b33118dd · node: 4457:53304 · variants: Type=[Card-body]
**Use for** (Figma) Flow: how a total splits through stages (budget allocation, value decomposition, goal → objective → model lineage); band width = value.

### timiline-phase-molecule
key: 5e4ded3ec85a833d56c6702ec61d8d8d2651b7e9 · node: 3967:1765 · variants: Expanded=[False|True] State=[Default|Hover] Badge=[False|True] · text: Title · swap: Content slot, List slot
**Use for** (inferred) One phase row of the Gantt; building block. Name typo (see Gaps).

### timeline-chart-organism
key: e9d0e868e8690eb4539b49e689597ab2fabe4b0c · node: 3967:38286 · variants: State=[Default|Hover] · swap: Content slot
**Use for** (Figma) Gantt: tasks/phases on a time axis (e.g. investment phases across a 5-year plan); shows sequential vs parallel work. Marked "use this".

Core chart types (Plan & Portfolio · Core chart types). All share `variants: State=[Default|Hover|Empty|Loading|Cooper]` and have no other props. Use-for lines are (inferred) from the chart type unless a Figma chart-rules frame applies.

### chart-column
key: 26ac44002bc42654a851e80bb6987cfcbcc4cc0a · node: 9862:12468 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Bar Chart) One measure across few or time-ordered categories ("which is biggest"); zero-based, one hue.

### chart-bar
key: c7ded12ed119e336dacaa53339537cd96d21b310 · node: 9862:12961 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Bar Chart) Horizontal bars for many categories, long labels or rankings (sort biggest → smallest).

### chart-grouped-column
key: 1cf9a0d603150f23cc903ae3f2338f521867b5b1 · node: 9862:13445 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Bar Chart) A few series side by side per category; 2–3 series max, legend, consistent series order.

### chart-stacked-column
key: 2f30427861bb364075baa1bfff92d9287195c6e2 · node: 9863:11139 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Composition of a total per category.

### chart-line
key: 99e82665f301f00cb568f0f3442a41f919bf9d73 · node: 9863:11650 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Line Chart) Change over time — spend/burn tracking, actual (solid) vs planned (dashed), trend and rate of change.

### chart-area
key: fc1f08170e72e2321189fb380fba2a3b86598baa · node: 9863:12167 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Cumulative volume over time.

### chart-histogram
key: e527d2a15ad4d6d550911b71c0551d9271f04cb6 · node: 9864:14012 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Distribution of one measure across bins.

### chart-pie
key: 715fa4d6878fec0a2c0f2448062430864713b865 · node: 9866:12309 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Parts of one whole with few slices. Prefer `chart-donut` (documented).

### chart-donut
key: 392ff23a56f74c11d0335f73212796503293e509 · node: 9866:12774 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Donut Chart) Share of a whole; slices largest → smallest clockwise from top; one legend (right or bottom).

### chart-scatter
key: 3d90c587bae013987119d07c6bf7693c605b8add · node: 9866:13245 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Relationship between two measures; clusters and outliers.

### chart-bubble
key: 32d3b58873d7cf13fd30d4ad0db641b6b05eb7a3 · node: 9866:13788 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Scatter with a third measure as size.

### chart-heatmap
key: 4dff675f1db6461b77aabd9f2f50619a4c66ad56 · node: 9866:14280 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Rules) Ordered magnitude across a matrix, using a sequential ramp within one hue group.

### chart-box-plot
key: 55bc608ee4354b133688d4820bc1ab1554dc6d44 · node: 9866:14997 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Comparing distributions side by side.

### chart-radar
key: 701802771bd705aca1dd97d48ecdd1e73874bcd1 · node: 9866:15559 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (Figma, Radar Chart) Profile of 3–6 options across 5–8 criteria.

### chart-waterfall
key: 87f6afe21601a27ba4b87c959c59f0f286e8d4b8 · node: 9866:16075 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Bridge from a start value to an end value through increments.

### chart-treemap
key: 0ab799c152817b77416efcae920d41326606d42a · node: 9867:132 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Hierarchical part-to-whole by area.

### chart-gauge
key: 974091cc4d290593f37ec6f1056a71a6cf47ad9a · node: 9867:618 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) One KPI against one reference value.

### chart-funnel
key: d5b0bfd196792b6096a9f7068a0b0adfd2626fa5 · node: 9867:1065 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Drop-off across ordered stages.

Legacy / domain charts (Chart List frame). (Figma) Built before the base; kept because handover references them. Use only to match an existing screen; build new charts from Base + core types. All entries below: **Use for** (inferred) the metric in the name.

### chart-portfolio
key: b6dd889617fd07025d4a3e4fa1e895910f1b1fa7 · node: 2154:2497 · variants: Type=[By weight|By budget|Loading|Empty]
**Use for** (inferred) Portfolio split by weight or budget.

### chart-projects
key: 684b42ac9b917ba6936950ced415b56b35cdede6 · node: 2219:1161 · variants: Type=[Default|Empty]
**Use for** (inferred) Project counts/status chart.

### chart-strategic-objectives-breakdown
key: b85eb9de67b215577c1177ecd9c0f79aa02eab6e · node: 2154:2572 · variants: type=[By budget|By investment|empty|sceleton|vertical (S)] · swap: bars, bars2
**Use for** (inferred) Strategic objectives split by budget or investment.

### chart-strategic-objectives (1 of 5)
key: d75eb31791d0016bf7d48b1d718fd734af1f8df7 · node: 2219:1754 · variants: Type=[Default|Loading|Empty]
**Use for** (inferred) Strategic-objectives chart. Duplicate name (see Gaps).

### chart-strategic-objectives (2 of 5)
key: 5ca6446f186b91b8fb27fc3c0d1d85abf0f0e3ec · node: 4457:41517 · variants: Type=[Default|Loading|Empty]
**Use for** (inferred) As above. Duplicate name (see Gaps).

### chart-strategic-objectives (3 of 5)
key: e4f32bc90f0455eedb6ba12faa4e50a01db4d32a · node: 4699:26724 · variants: Type=[Default|Loading|Empty]
**Use for** (inferred) As above. Duplicate name (see Gaps).

### chart-strategic-objectives (4 of 5)
key: 2c6877c2d0d3614cae92c550ebdebf7bfeecca9c · node: 4457:42683 · variants: Type=[Default|Loading|Empty]
**Use for** (inferred) As above. Duplicate name (see Gaps).

### chart-strategic-objectives (5 of 5)
key: 4fa95d2606136cbc34b924a739bdb08f63693fb8 · node: 5967:55151 · variants: Type=[Default|Loading|Empty]
**Use for** (inferred) As above. Duplicate name (see Gaps).

### chart-coverage-measure
key: 9a4dedcbb18378474c1324b9f21bf84a15a8a34f · node: 2701:28167 · variants: Type=[Default]
**Use for** (inferred) Measure coverage.

### Capex burn by quarter
key: 30c80a597171828b44d1f176edb7f42aedd36ceb · node: 2356:1498 · variants: Type=[Line|Bar] Cooper=[False|True]
**Use for** (inferred) Quarterly CAPEX spend; line or bar form.

### chart-framework-coverage
key: 31142689c935c0d26dee1389f17565f02b46fba0 · node: 4699:26635 · variants: State=[Default|Hover|Vertical (S)|Empty|Loading]
**Use for** (inferred) Value-framework coverage.

### investment value
key: a1ad172ac42f508d160cc95e9ca3d2b3e78113f5 · node: 4699:27100 · variants: State=[Default|Empty|Sceleton] · swap: bars
**Use for** (inferred) Investment value by item.

### scatter chart
key: 0c11145d394f66b2dbd52f60181996288a55856a · node: 5967:55232 · variants: State=[Default|Empty|Sceleton] · swap: bars
**Use for** (inferred) Legacy scatter; prefer `chart-scatter`.

### chart-draft-disposition
key: ba4853eaa0d5ba8811248a70b2df296de07d9b7a · node: 9827:14449 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Admin: how users responded to Cooper's drafts (override rate).

### chart-brief-to-decision
key: 0615c162d4ce5383116e2c12d2a0c670c42c4846 · node: 9827:14789 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Admin: median days from brief to decision.

### chart-cooper-findings
key: fb51572b86b2f3d59fce935d8bc0e39ea21a4d37 · node: 9827:15042 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Admin: Cooper findings acted on (part of whole).

### chart-needs-you-flags
key: 8705d58ca2ad5e19d73fa74992983be13e6bc2aa · node: 9827:15249 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Admin: flags needing the user, resolved % per quarter.

### chart-capital-by-cycle
key: 2f209b779f4d69d2f56e70ae755dba385b695385 · node: 9827:15560 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Sponsor: capital under management per planning cycle.

### chart-decisions-by-source
key: c4c34516bae8736300e30d97f1642c6126c220bf · node: 9827:15813 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Sponsor: decisions split by source (manual vs Cooper).

### chart-benefits-realized
key: c248099ae019f3f2c264e3d07d7cd6dcf5c06bda · node: 9827:16004 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Sponsor: benefits realised vs business case.

### chart-risk-reduction
key: d9910b2e54aff600040c04b9afabb5dbd345f077 · node: 9827:16262 · variants: State=[Default|Empty|Loading|Hover|Cooper]
**Use for** (inferred) Sponsor: risk reduced per $1M.

### planned-vs-actual
key: 145d7e3b85b72f1a87358077c8e419fc3fc554ca · node: 9827:17573 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Dashboard: plan, budget and actual per item.

### retained-risk-by-feeder
key: dfee28dfb25613923ca8e409fd6a39dd4dccaafa · node: 9827:17850 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Dashboard: retained risk per feeder.

### outage-minutes-vs-peers
key: 4ed72853c24183a728dec58d73f6e4fc59c921ed · node: 9827:18110 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Dashboard: reliability benchmark against peers.

### capex-variance-by-project
key: 12f60389900037adf898dcf8bd6db23c7bad04a6 · node: 9827:18719 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Dashboard: project cost variance vs estimate (σ).

### feeders-by-outage-minutes
key: 8d668dc7f86aaa795d759245ea6e7dae4f4270db · node: 9827:18294 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Dashboard: distribution of feeders by outage minutes.

### cost-per-km-vs-peer-range
key: 8e1621f09c3d16c49c73348563f72a346dd85ee2 · node: 9827:18525 · variants: State=[Default|Hover|Empty|Loading|Cooper]
**Use for** (inferred) Dashboard: unit cost per km against the peer range.

---

### Components that live on pattern pages

These sets are defined on pattern pages, not component pages, but screens need them.

#### Shell (Navigation pattern page 3487:24652)

### global-header
key: 8a567522193088d557faa4ed26b701f83882cb74 · node: 69:3736 · variants: state=[Default] page=[value] · bool: Show recomendation
**Use for** (inferred) The 48px top bar used in pattern screens: logo, L1 stage tabs, utility icons, avatar.
**Notes** (inferred) Its node has no page parent in the file (orphaned/hidden); see Gaps.

### nav-bar-organism
key: 9083880d7e8eaf599782322f5b7ba3442abe33b6 · node: 3412:29453 · variants: Type=[Default|Collapsed|Collapsed opened] · swap: Pages slot, Actions slot
**Use for** (Figma) Level 1 navigation between product stages; persistent, sticky; "organism (use this for patterns)".

### nav-bar-page-atom
key: 3a69091ef320fd3b62c876b8f0175f4fca8bbb2d · node: 69:4012 · variants: State=[Default|Hover|Pressed|Active|Disabled|Focus] · text: Page name
**Use for** (inferred) One stage tab in the nav bar; building block.

### logo
key: cd50ca13da80980e20b45897cb2a2814e439f287 · node: 788:52389 · variants: Property 1=[Default]
**Use for** (inferred) IFS Copperleaf logo in the nav bar and log-in screen.

### sidebar-pattern
key: 74a2a21caf87e028a7115c8d80334805fadd89cc · node: 4482:99996 · variants: Page=[Value|Build|Investment]
**Use for** (Figma) The ready-made L2 sidebar for a stage; one component, each stage supplies its own section list.

### header-pattern
key: 1dca605202426cb234cd77fa51edae359142c6b4 · node: 4485:119266 · variants: State=[Default] · bool: show-canvas, show-stepper, show-recommendation, show-collaboration, show-button, show-overview, Show split-button, Show secondary button · swap: Content right slot
**Use for** (Figma) The one header pattern that frames a scope: title, status/context and the actions for it; toggles add stepper, canvas header, Cooper recommendation, collaborators.

### page-header-pattern
key: a66c690107f3282fdb0d83674f46e62441794963 · node: 4485:119917 · variants: State=[Default] · bool: show-button, show-content-slot · swap: Content slot, text
**Use for** (Figma) Level 3 page header: page title, status and page-level actions.

### page-header
key: 9175f001185d8545d21a5915e5794992587351cc · node: 1588:1971
**Use for** (inferred) The page header instance used in the Map overview screen (title + status + view toggles + recommendation). Overlaps with `page-header-pattern` (see Gaps).

### page-top
key: c5e4c47466b6a214434547fc54bd5678b6658fd1 (set; variant Type=Default 771d842501a13c89539875ae993aca11fbcbfa82) · node: 244:117279 (IFS Design System Patterns; not found in the published IFS Design System library) · variants: Type=[Default] · bool: cooper, show search, Show button
**Use for** (designer decision) The intro of a library/list page: Cooper eyebrow (optional), H1 title, one-line description, a "New" (or other) Secondary M button on the right, then `Tabs` with counts and a 360px `SmartSearch`. Kit: `PageTop`; on a DataTable library page pass `pageTop` to `DataTable` so its tab filter and search sit in it. Also the Command home intro (cooper on, no button) and the Build page (title only, Tabs L, no search).
**Don't use for** a single object's page (framework, investment, report): that's `PageHeader`. Don't stack `PageHeader` above `PageTop`.

### explore-header-pattern
key: 0f49a18bdc8ebc72618b4449574b2cf88757dc00 · node: 7205:33581 · variants: show-cooper-badge=[no|yes] · bool: show-selected, show-action-buttons, show-back-button
**Use for** (inferred) Page header for the Explore map.

### base-bottom-sheet-organism
key: efe6a84561faffba92800a50ad90bd6b8896208f · node: 4406:25590 · variants: State=[Default] · bool: show-cooper
**Use for** (Figma) Default bottom sheet for any tab: Cooper FAB + prompt chips.

### value-bottom-sheet-organism
key: 492f095cf04285dd68a296c651207ba17897936a · node: 789:37502 · variants: In progress=[False|True] · bool: show-prompts, cooper-context, show-cooper, show-upload-button · swap: show-documents-button
**Use for** (Figma) Value tab only: base + document upload to build Cooper's context; read-only (no upload) once the framework is Active.

### explore-bottom-sheet
key: 57f61210740f9ada34f24e015e9bf954d5e10dca · node: 72:4676 · variants: State=[Default]
**Use for** (Figma) Explore tab only: base + map controls. Canvas calls it `explore-bottom-sheet-organism` (see Gaps).

#### Content States (page 4759:9172)

### empty-state-organism
key: 3560062eec09e589b3ca8e5732db29394c4dd061 · node: 3782:18464 · variants: Size=[Frame 2147228119] · bool: show-media-icon, show-body-text, show-suggestion-chips, show-buttons, show-primary-button, show-tertiary-button
**Use for** (Figma) A region with no content: heading (required) + optional icon, body, suggestion chips, one primary + one secondary action. Cause → action: no objects yet → invite creation; filter found similar → clear/adjust/use suggestions; filter excludes all → clear/adjust; terminal positive → none; load failed → retry; not permitted → request access; parent empty → invite adding. Sizes: Full (page/main region) or Section (inside card/panel).
**Notes** (Figma) Never show loading → empty → content; hold the skeleton until the final state is known.

### empty-state-spinner-molecule
key: f838ccd0d5a224f91be002cddc557c2a40207162 · node: 3782:24081 · bool: show-text
**Use for** (Figma — mapping inferred) Indeterminate or shapeless waits where no layout can be previewed.

### empty-state-loading-more-molecule
key: 505c9d42d9aaa8508e5715bf1915ee7b5e8fb650 · node: 3782:24082
**Use for** (Figma — mapping inferred) Appending items to an already visible list.

### progress-bar-loading
key: a1b0c5cd5518115be244af4b07a9f3cff4f5900e · node: 5530:11867
**Use for** (Figma — mapping inferred) Measurable work (uploads, steps, known duration).

#### Comments (page 1399:9455)

### comment-input-atom
key: fa669eb3c99a339f91be8c20943f72cf79306e27 · node: 2290:15642 · variants: Type=[Text|Voice|Cooper] State=[Default|Filling|1 line|Multi line]
**Use for** (Figma) The comment input pill; modes switch without clearing the draft; Cooper mode has an orange border (attribution).

### comment-input-molecule
key: c29aecd3d1d9b5f862f1dbd70d16cb23ea88125f · node: 1660:10933 · variants: state=[Default] · bool: avatar · swap: Chat input
**Use for** (Figma) Input + current-user avatar; used inline on the canvas next to an anchor.

### comment-input-organism
key: adccc23151e65541029aa171a200b8bc375ec8c5 · node: 4775:27174 · variants: Pressed=[False|True]
**Use for** (Figma) Molecule + stacked thread indicators; used at anchored threads with history.

### comment-pin-organism
key: 6c7355bdd0cde1b43c261757975f9681c3db6145 · node: 260:47160 · variants: Type=[Unread|Read|Cooper] State=[Default|Hover] · bool: show-3rd-avatar, Show replies, show-2nd-avatar · text: Name, Time ago, Comment text, Qty replies
**Use for** (Figma) Canvas anchor for a thread, attached to an entity; hover = preview only, click opens the thread.

### comment-popover-organism
key: 378d44d99e897855492862476458e3f0d113f122 · node: 260:88500 · variants: Type=[Default|Cooper suggestion|Edit] · swap: Content slot
**Use for** (Figma) Full thread opened in place from a pin: header (ID, ⋯, resolve ✓, ✕), replies, input docked at the bottom.

### comment-content-card
key: 8015b6ac39d1e24537ebd46bafb3e507e262a9d6 · node: 260:86722 · variants: State=[Default|Hover] Tagged user=[False|True] · text: Name, Time ago
**Use for** (inferred) One reply inside a thread.

### comment-drawer-card
key: 548d968e242b55d861175f30fa949710d1d260ef · node: 1231:170874 · variants: Type=[Read|New|Cooper|Resolved] State=[Default|Hover|Selected|Focus] · bool: show-2nd-avavtar, show-action-required · text: User name, Time ago, Comment number, Place
**Use for** (inferred) A thread entry in the Comments panel/drawer list.

#### Cooper (page 4174:209903)

### agent-window-organism
key: 31ba15a9885c5b95097b519e85721b390ba77984 · node: 67:4398 · variants: View=[Expanded|Collapsed] Type=[Speaking|Paused|Analyzing|Finished|User not speaking|User speaking|User not writing|User writing] Actor=[Cooper|User] · bool: show-content-slot, show-tertiary-button, Show secondary button, Show all buttons · text: Text · swap: Content slot
**Use for** (Figma) Floating panel where Cooper surfaces recommendations and the user accepts or rejects them; opened from the Cooper badge or by Cooper itself. Cooper never auto-commits.

### chat-collapsed-bar-organism
key: cf1fb8a418622055eb26e01ef7ba82dbaf19488e · node: 83:34109 · variants: Type=[FAB button|Voice|Text] State=[Default|Active|Hover|Expand hover|Speaking / Typing|Speaking / Typing multi-line|Send|Send multi-line]
**Use for** (Figma) Cooper chat size S — the default when chat opens; quick exchanges.

### chat-compact-panel-organism
key: e56a350db527fcf6c6862cacd23774e7d1311974 · node: 83:74896 · variants: Type=[Voice|Text] State=[Default|Speaking / Typing|Analyzing|Answered|Interrupted|Drop file] · bool: show-cooper-text, show-scroll-bar · swap: Content slot
**Use for** (Figma) Cooper chat size M — enlarged from S for longer threads.

### chat-full-panel-organism
key: 1b6802cb1c703de622674d239425e1ba4ef3ac85 · node: 83:60542 · variants: Type=[Voice|Text] State=[Default|Speaking / Typing|Interrupted|Drop file|Analyzing|Answered] · bool: show-chips · swap: Content slot
**Use for** (Figma) Cooper chat size L — full workspace with folders and history.

### agent-bottom-sheet
key: 7c7b4439586398c735cf7bb3f85325d294bb1e01 · node: 9155:26876 · variants: type=[Analyzing]
**Use for** (inferred) Bottom sheet while Cooper is analysing.

### speaking-control-molecule
key: 0944c5d2588c15d2671489c657a788d6b500390c · node: 9155:26809 · variants: State=[Speaking|Paused|Listening|Reading|Respondong]
**Use for** (Figma) Voice-conversation control; "Paused" stops speech while generation continues.

### text-message-input-molecule
key: 2f407b5b2a200e59ca722cbaa0d1fdc80ab0f39d · node: 83:57015 · variants: State=[Typing multi-line|Typing|Default|Pressed|Analyzing] · bool: Show top slot · swap: Slot
**Use for** (inferred) Text input footer of Cooper chat.

### voice-message-input-molecule
key: b66c51b2fbcf5d9e513652e4e581b69c62493a3d · node: 83:74957 · variants: State=[Default|Speaking|Analyzing] · bool: Show top slot · swap: Slot
**Use for** (Figma) Voice input: speak, pause, message auto-sends.

#### Map (page 1399:13911)

### card-asset-organism
key: 980649df5ac9194a028e91f06f9f6a122819da5a · node: 3295:37852 · variants: Priority=[High|Medium|low] State=[Default|Hover|Applied]
**Use for** (Figma) Asset summary tile (name · type · corridor) with risk indicator.

### card-layer-organism
key: 0df762628e9ea558ef9f7a37658a4465d7af5887 · node: 88:23410 · variants: Active=[True|False] State=[Default|Hover] · text: label
**Use for** (Figma — mapping inferred) Toggle card that turns a map layer on/off.

### card-category-layer-organism
key: efab07ce5c1a4862a348a9e851780739b7ce9d6c · node: 88:23459 · variants: Active=[False|True] State=[Default|Hover|Applied]
**Use for** (Figma — mapping inferred) Layer category card with active count ("1/5 layers on").

### map-pin-teardrop
key: 1e235ddf5a740ed928aa2b3ccb7cd96e4d7b6bfe · node: 43:2020 · variants: Asset icon=[No|Yes] Status=[Neutral|Error|Warning] State=[Default|Opened|Selected|Out of hover]
**Use for** (Figma) Default location marker for one asset on an exact spot. Other pins on the page (`map-pin-dot`, `-square`, `-pole`, `-defect`, `-flow`) cover counts, clusters, readings, defects and direction.

### map-status-risk
key: afa87a85df441d6eb4a38fdfe293aa73c0bda334 · node: 3639:4517 · variants: Type=[Error|Warning] · bool: show-%
**Use for** (Figma) Planning-risk severity on a map asset (icon + %).

### map-status-event
key: 95f838ed32351ac18ab1679e7c88144818d00808 · node: 85:6416 · variants: Title=[False|True]
**Use for** (Figma) Live measured value on a map asset (real-time state, not planning risk).

### object-card-molecule
key: 4611c87ad7e72c51f397c195b35a6106d253862e · node: 3535:7844 · variants: Type=[Assets|Segement|Group] · swap: Assent container slot, Segment container slot, Group container slot
**Use for** (Figma) Scrollable grouped list of map objects ranked by risk.

### locationItem
key: 91460248c9b367204277859247f814a9001961b6 · node: 233:14754 · variants: State=[Default|Hover|Applied] · bool: show-coordinates · text: Location, Coordinates
**Use for** (Figma) Single-select row to pick/confirm a location.

### hierarchy-slider-pattern
key: da24ff1e034c167f4da74f9144a40ef675946058 · node: 7406:25037 · variants: %=[modal-hierarchy]
**Use for** (inferred) Map hierarchy level slider.

#### Other pattern pages

### log-in-form-pattern
node: 4509:24703 (Log in) — **Use for** (Figma) The auth form: SSO first, "OR sign in with email", email + password, Forgot password / Remember me, Sign in, footer links. Key not captured.

### home-row-card-organism, stat-cards-row, review-investment-table, review-data-visualisation
nodes: 3938:1011 (Home), 2757:9205, 2757:9283, 4850:46005 (Review) — **Use for** (inferred) Ready-made Home and Review screen sections. Keys not captured; no canvas guidance.

---

### Icons (page 1399:9134)

215 icon component sets plus 22 standalone icon components. Names are kebab-case, prefixed by family: `arrow-*` (arrow-left, arrow-chevron-down, arrow-trend-up …), `chat-*` (chat-folder, chat-microphone-voice …), and so on. Almost every set has one variant axis `size` with values from `24 | 16 | 12` (94 sets have 24/16 only; the rest also 12). Exceptions: one set with `State=[Default|Insight|Smart search]`, one with `Type=[strong|medium|low]`. (inferred) Use 24 for standalone icons and L/M buttons, 16 inside S controls and dense rows, 12 inside badges and chips.

---

## 5. Patterns — how things work together

Patterns come from the Figma file **IFS Design System Patterns** (`KmmVU2D0kqWr0dC1xXNzWw`). Each one has a write-up in `guide/patterns/<slug>.md`: what it's for, its anatomy in kit components, flows and states, and its rules from the canvas notes. When an idea touches a pattern, read its file and follow its rules. When a pattern's frames and its written notes disagree, **the notes win**; every such case is listed in `guide/review.md` for the designer to check.

| Pattern (slug) | Use when the screen involves… | Main pieces |
|---|---|---|
| Nav bar (`nav-bar`) | the app shell: stage switching (Command · Value · Explore · Build · Plan · Results), sidebars per stage, collapsed/responsive nav | NavBar, NavBarCollapsed, ResponsiveNavBar, SideNav, SideNavTree, ExploreHeader |
| Cooper (`cooper`) | the AI assistant: chat bar → compact → full panel, conversations, sources, follow-ups, chat history and folders, recommendations | CooperChat, ChatCompactPanel, ChatFullPanel, CooperMessage, HistoryPanel, CooperRecommendations |
| Documents (`documents`) | Cooper's document context in the bottom sheet: upload, drag & drop, remove with undo, read-only, empty and error states | DocumentsContext, DocumentsPopover, DocumentRow, BottomSheet |
| Table (`table`) | any list of records: filter counts, column filters, search, sort, ranked vs standard, rename, preview, column settings, table states | DataTable (on Table), ColumnFilter, TableToolbar, SmartSearch |
| Widget builder (`widget-builder`) | dashboards and reports made of widgets: add from a drawer, drag to reorder, resize with limits, undo | WidgetBoard, WidgetFrame, WidgetsDrawer, StatCardsRow, WidgetCard |
| Collaboration (`collaboration`) | people on a record: invite by name or role, roles, remove, push reminders, collaborator panel | CollaboratorsMenu, CollaboratorsPanel, InviteCollaboratorModal |
| Comments (`comments`) | commenting on canvas nodes: pins, threads, mentions, resolve, the comments drawer, search | CommentPin, CommentDrawerCard, CommentsPanel, CommentThread |
| Approval chain (`approval`) | review and approval: reviewer approve / request info, owner push and publish, readiness | ApprovalChainTable, ApprovalChainPanel, ReadinessEvaluation, SplitButton |
| Confidence · Trace · Readiness (`trace`) | system confidence gates, the trace report (item-by-item issues with apply/answer/upload), readiness evaluation | SystemConfidence, TraceReport, useIssueReport, Pager |
| Evidence chain (`evidence`) | why a value is trusted: confidence zones, rationale with sources, peer benchmark | EvidenceChainDrawer, SourceCard, PeerBenchmark, EvidenceStrength |
| Activity & versions (`activity`) | the activity log, version history (open, rename, duplicate, restore) and comparing two versions | ActivityPanel, VersionHistory, CompareHeader, CompareView |

Tiers: Components are published Figma components; pattern helpers (DataTable, CooperChat, WidgetBoard…) implement a pattern's rules and are allowed, but say so in the plan; Examples are demo screens to learn from, never to copy wholesale.

## 6. Gaps

No canvas guidance at all (usage is inferred only):
- Avatar (`avatar-atom`, `avatar-organism`), `hotkey-atom`, `counter-atom`, `scroll-bar-atom`, `indicator-molecule`, `status-readiness-molecule`, `status-risk-molecule`.
- `progress-bar-molecule`, `progress-ring-molecule`, `evidence-strength-bar-molecule`, `data-viz-card-organism`, `data-viz-header-molecule`, `data-viz-modal-organism`, most Base atoms.
- `canvas-header`, `sunkey-canvas-header`; `explore-map-button(-base)`; `icon-button-notification/-comment/-arrow/-filter`.
- `checkbox-*`, `radio-button-*`, `switch-*`: only "compact variant for secondary contexts"; no rule on when to choose each.
- All legacy charts and all chart core types except bar/line/donut/radar/heatmap/sankey/timeline.
- `global-header`, `page-header`, `explore-header-pattern`, Home and Review screen sections.

Ambiguities and fixes for the designer:
1. **Five sets named `chart-strategic-objectives`** (2219:1754, 4457:41517, 4699:26724, 4457:42683, 5967:55151) with identical variants. Which one is canonical?
2. **Two L1 nav bars:** pattern screens use `global-header` (69:3736, which has no page parent — orphaned or on a hidden page), while the canvas documents `nav-bar-organism` as "use this". Which should screens use?
3. **Three page headers:** `page-header` (1588:1971, used in screens), `page-header-pattern`, `header-pattern`. Which is canonical for L3?
4. **Select size labels conflict:** one note says M=32 (modals), L=40 (full page), XL=44 (view selector); another says "M (40) modals", "L (44) page-level". Segmented-control notes say S (28) / M (38) but the variants are S (24) / M (34).
5. **Breadcrumbs vs "no links":** Breadcrumb notes say crumbs "are links, they behave like links", which conflicts with the buttons-not-links rule.
6. **Typo names:** `signle-combobox-organism`, `sliter-atom`, `timiline-phase-molecule`, `sunkey-canvas-header`; option and property typos `Righ`, `Hove`, `Udpate`, `Respondong`, `Coper drag`, `Segement`, `sceleton/Sceleton`, `Has new notiication?`, `show-hont-text`, `show-acion`, `show-segmanted-control`, `show-2nd-avavtar`, `Conetnt slot`, `Assent container slot`, `iconl-right`.
7. **Names in notes don't match sets:** "multiple-select-dropdown-organism (use this)" → set is `multiple-select-organism`; "explore-bottom-sheet-organism" → set is `explore-bottom-sheet`; "FAB Cooper Button" frame → set is `FTA button`.
8. **Copied property names:** `icon-button-arrow` and `icon-button-filter` use `Has a new comment?`.
9. **Placeholder axes:** `Property 1=…`, `Size=[Frame 2147228119]` (empty-state-organism), `donut-chart-atom Property 1=[Variant3]`, `explore-map-button-base Type=[Component 1]`; `badge-atom Color` includes `False`. Non-kebab names: `Capex burn by quarter`, `investment value`, `scatter chart`, `FTA button`, `locationItem`; `scatter chart` duplicates `chart-scatter`.
10. **Undocumented compositions:** Time Picker and Filter (Selection page) have detailed rules but no component set; `empty-state-organism` has no cause/size variant even though notes define six causes and two sizes.
11. **Stray notes:** the Pagination frame contains unrelated objective-weighting copy; the Tab frame contains a Time Picker note ("Applied state…"); Drawer and Panel both claim the Approval chain full-screen example.
12. **Status notes not labelled:** three Status notes (colour-only / icon / readiness) are not tied to set names; the mapping above is inferred.
13. **`notification-card`** (9943:5373) sits on the Data Display page outside any frame; it is the only set with a component description.
14. **Legacy cards** (16 sets) and legacy timelines (3) are kept "because handover references them"; a deprecation flag in the set name or description would stop AI builders from picking them.
