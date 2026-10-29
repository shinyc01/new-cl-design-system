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
| Level 1 nav bar | `nav-bar-organism` (kit `NavBar`; logo + stage tabs Home · Value · Explore · Build · Plan · Results + search/settings/notifications + avatar) | top, full width, 48px | handovers: `nav-bar-organism` placed 2,340× in all 5 files, `global-header` 15× |
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

## 3b. What the product screens actually use

From the audit of the five product handover files (Build, Explore, Command, Plan, Value; Oct 2026, about 100k placed components). The rules above win. Use this to choose between the options they allow and to set props. Every kit entry in api.md has an **In handovers** line with its usual values; `guide/usage.md` has screens, containers and sample text per component.

- **Shell on every screen:** `NavBar` (2,355 placed, in all 5 files) + `BottomSheet` (Cooper strip, all 5 files). `SideNav` appears only on stages that have sections; `guide/patterns/nav-bar.md` decides which. Where there is one, it's collapsed on 75% of screens, so pass `defaultCollapsed` unless the sidebar's content is the point of the screen.
- **Page header:**
  - Single object (an investment, alternative, framework): `PageHeader`. 67% of uses carry the stage progress bar. Take its steps from the user or the pattern; don't invent them.
  - Library/list pages: `PageTop` (title, one-line description, New button).
  - Explore map: `ExploreHeader`. Value/Plan canvases add `CanvasHeader` under the page header.
- **Collections are tables:** `Table` is by far the most used (18k cells). Cells are text 63%, then status and text + description. Lists of investments, alternatives and versions are tables, not card grids. The exception is comparing 2–4 alternatives side by side: use `ContentCard` M columns with `BarChartItem` rows (Build › Compare Alternatives).
- **Cards:**
  - `ContentCard` M (70%) in lists and option pickers; S (28%) when nested or in side lists; `selected` for pick-one options.
  - The Command home list uses `HomeRowCard`; value-model canvases and trees use `NodeCard`.
- **Buttons:**
  - `Button` is Secondary (56%) or Tertiary (27%) at size M or S. Primary is rare: one per page.
  - `IconButton` is Ghost, square, size S in 90% of uses, so pass `size="s"`.
- **Filters and view switches:**
  - `SegmentedControl` is always size S (`size="s"`), usually 2 options (sometimes 4), with counts ("Drafts · 6"). It sits in card headers, table headers and data-viz headers.
  - `Tabs` size M or L for page-level views.
  - `Chip` for applied filters and tags (Value, Explore).
- **Small markers:** `Counter` S next to labels. `Badge` white, size S (`size="s"`). `StatusIndicator` dot without stroke inside tabs, segments and badges. Meaningful status still uses RiskStatus / ReadinessStatus (rule 8).
- **Charts:**
  - Compare and Plan screens build breakdowns from `BarChartItem` rows (3,190) with `InfoHintItem` legends (808).
  - The core chart components (`BarChart`, `LineChart` …) are newer than the handovers. Use them for standard charts in a `DataVizCard` + `DataVizHeader`.
- **Comments:** `CommentDrawerCard` in the comments drawer, `CommentPin` on canvases, `CommentButton` in headers.
- **Cooper:** `FtaButton` bottom-right + `BottomSheet` prompts; `ChatCard` / `ChatLink` inside answers.
- **Common in handovers but not in the kit.** Say "Not in DS" and offer the closest component:
  - Gantt-style schedule timeline (cells, rows, today line; Build › Alternatives Cost and Schedule)
  - Formula builder rows (`formula item`, `function row`; Value)
  - Calendar day/date items
  - Map layer list (Explore)

---

## 4. Components by page

Per-component Figma details (keys, nodes, variant axes, canvas notes) are in components.md section 4. Look a component up there only if its api.md entry and these rules leave a question open.

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

