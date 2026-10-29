import{I as n}from"./patterns-widget-builder-8Ndxqjcf.js";import{I as r}from"./patterns-trace-BESFmCOG.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-x-G-dxfr.js";import"./index-CwPCC0ZT.js";const s=n.find(i=>i.name==="Pattern: Report widgets — resize, drag & drop rules"),m={title:"Examples/Widget builder/Report widgets — resize, drag & drop rules",component:r["Pattern: Report widgets — resize, drag & drop rules"],tags:["autodocs","needs-review"],parameters:{docs:{description:{component:`> ⚠️ **Needs review** — check these against Figma:
>
> - Two charts in one row: the old frame 331:507955 shows a resize handle between them; the rules (413:56466) lock them at ½ + ½. The kit locks them (notes win).

**Figma:** Page / 1 · Drag a widget into a row of 2 [patterns] (413:45297)

# Widget Builder

Source: IFS Design System Patterns › Widget Builder (page 331:492638): sections "Widget Builder" (331:551716) and "Widget resize, drag&drop — rules & states" (413:44071).

## In short
- Use \`WidgetBoard\` with each widget in a \`WidgetFrame\` (kit charts inside with \`bare\`); \`StatCardsRow\` is the metrics block; "Widgets" opens \`WidgetsDrawer\`.
- Dashboard: widgets on one page grid. Report: blocks inside sections, each with its own grid. Editing (handles, ⋮⋮, menus) only in Draft.
- 3-column grid, 12px gap. Widths only 1/3, 1/2, 2/3, 3/3. A row holds 1–3 widgets, the last fills the rest; never an empty column.
- Auto widths: 1 → 3/3, 2 → 1/2+1/2, 3 → 1/3 each; chart+text → 2/3+1/3; chart+chart locked 1/2+1/2. Row height = tallest; never resize height.
- Limits: metrics 3/3, whole row, no handle; text 1/3–3/3; chart min 1/2, never 1/3 or in a row of 3; wide chart/table 3/3. Rows never span sections.
- Resize: edge handle on hover (not in the ~40px header zone, only possible directions), snaps on release; limit tooltips; or ⋮ → Resize S/M/L.
- Drag only from ⋮⋮: ghost follows pointer, source at 30%, indicator line, then after ~300ms "+ Drop here to place" zone. Don't reflow while the line shows.
- Blocked drop (full row, min doesn't fit, next to metrics): no line, tooltip "Row is full — max 3 widgets" / "…max 2 widgets with a chart" / "Metrics take the whole row".
- On drop, source and target rows go Auto and an empty row disappears. Report: blocks can move to another section.
- Add: drawer "+ Add" or drag a card (card leaves the list); drawer search filters by description, with an empty state. Remove: ⋮ → Remove.
- Add/move/remove → toast with Undo (4s, pauses on hover). Esc or release outside → ghost flies back, no change, no toast.
- Details below: What it is / when to use it, Anatomy, Flows and states, Rules, Don'ts, Consolidated / unsure, Review

## What it is / when to use it
A page of widgets that people arrange themselves: add widgets from a catalog, reorder them by drag and drop, resize them on a 3-column grid, remove them. Use it for a dashboard page (widgets lie directly on the page, one grid) or a report page (widgets, called blocks, live inside sections, and each section has its own grid). Both use the same widgets and the same rules (Figma). Editing (handles, ⋮⋮, menus) is only available while the page is in Draft (Figma).

## Anatomy
- \`AppShell\` + \`NavBar\` + \`SideNav\` (collapsed rail on a dashboard; the "Sections" list on a report) + \`PageHeader\` + \`BottomSheet type="value"\`; optional \`Panel\` on the right (dashboard: System confidence).
- Page intro: title, subtitle and a secondary "Widgets" button (opens the drawer). (Figma)
- \`StatCardsRow\` (stat-cards-row): the metric cards row above the grid; inside a report it is the "metrics block".
- \`WidgetBoard\`: the grid engine. Each widget is drawn in a \`WidgetFrame\` (uppercase title, Cooper button; on hover ⋮⋮, "Edit with Cooper", ⋮ menu). Kit charts (\`ColumnChart\`, \`BarChart\`, \`DonutChart\`…) go inside with \`bare\`.
- Drag feedback, always together: the ghost card under the pointer (\`WidgetFrame state="ghost"\`; from the drawer, \`WidgetCard state="drag"\`), the source faded to 30 %, \`DropIndicator\` (line) and then \`DropZone\` "+ Drop here to place" at the current target; \`Tooltip\` for a blocked drop. \`WidgetViewChangePosition\` stays in the kit but the board does not use it.
- Resize feedback: \`ResizeHandle\` (arrows = directions still possible), \`Tooltip\` ("Maximum / Minimum width reached").
- \`WidgetsDrawer\`: \`Drawer\` + search + \`WidgetCard\` list (each with a \`PreviewWidgetCard\`).
- Feedback: \`toast\` with Undo.

## Flows and states
1. **Add a widget**: Widgets → drawer (overlay Base) → "+ Add" puts the widget on the page and removes its card from the list; toast \`"<name>" widget added\` + Undo. Or drag the card: the drawer steps aside, the card follows the cursor (WidgetCard Drag state), and it drops with the same indicators as a move. (Figma)
2. **Search the catalog**: the drawer's search filters cards by description; no match → empty state. (Figma frames: Search / Typing / Searching / Results yes / no)
3. **Move (change position)**: hover → ⋮⋮ appears → drag starts after ~4 px → the ghost card follows the pointer and the source fades → indicator line → "+ Drop here to place" zone at the target after ~300 ms → release. Ghost and zone show together in every drag, on the board and from the drawer (designer decision). Toast \`"<name>" widget moved\` / "Block moved" + Undo. (Figma)
4. **Resize**: hover an edge below the header → handle; drag → live reflow preview; release snaps; double-click the divider → Auto. Or ⋮ → Resize → S (1/3) / M (2/3) / L (3/3). (Figma)
5. **Remove**: ⋮ → Remove; row reflows; toast \`"<name>" widget removed\` + Undo. (Figma)
6. **Cancel**: Esc or release outside a target → the ghost flies back, nothing changes, no toast. Esc during a resize restores the widths. (Figma)

## Rules
Grid and rows
- A section is a 3-column grid with a 12 px gap; widths are only 1/3, 1/2, 2/3 or 3/3. (Figma)
- A row holds 1–3 widgets; nobody picks the row type. Auto widths: 1 → 3/3, 2 → 1/2 + 1/2, 3 → 1/3 each; chart + text → chart 2/3, text 1/3; chart + chart → 1/2 + 1/2 locked. (Figma)
- The last widget in a row fills the rest: there is never an empty column. Widgets in a row share the height of the tallest one; height is never resized by hand. (Figma)
- A row of 2 can be 1/2 + 1/2, 1/3 + 2/3 or 2/3 + 1/3; a row of 3 is always 1/3 each. Manual widths last until the count or order changes (row → Auto) or the divider is double-clicked. (Figma)
- A row never spans two sections; widths, Auto, Fill and limits count inside one section. (Figma)
- Width is part of the layout, saved with the edition and the same for everyone. (Figma)

Widget types and limits (Figma)

| Type | Min | Max | Handle |
|---|---|---|---|
| Metrics block (1–3 stat cards, equal width) | 3/3 | 3/3 | none, takes a whole row |
| Text (Summary, Reliability…) | 1/3 | 3/3 | dividers + section edge (shrink only) |
| Chart | 1/2 | 3/3 alone | only next to a text widget; alone or two charts: none |
| Wide chart / table | 3/3 | 3/3 | none (proposal) |

Resize
- The handle shows on edge hover only (8 px hit zone each side), never in the top ~40 px header zone where the buttons win. The widget the cursor came from keeps its Hover actions; resizing switches it to Drag state and hides the actions. (Figma)
- A divider is shared: dragging it sets the left widget's width, the right one takes the rest. The left edge of the first widget has no handle; the right section edge can only shrink; in chart rows section edges have no handle. (Figma)
- Arrows show only the possible directions; no direction → no handle, default cursor. Dragging past a limit shows "Maximum width reached" / "Minimum width reached" above the handle without cancelling. (Figma)
- Release snaps to the nearest allowed step; less than half a step → back. (Figma)
- Widening: neighbours that no longer fit at their min move to the start of the next row if they fit there, otherwise into a new row. Shrinking: the next widget(s) move up if their min fits; if nothing can (last in section, or the next is a chart) the widget can't shrink. Charts are never moved between rows by a resize. (Figma)

Drag and drop
- Only ⋮⋮ starts a drag; a click on it does not. (Figma)
- Phase 1, indicator: vertical line inside a row (insert), horizontal line between rows (new row); nothing moves. Phase 2, preview: resting ~300 ms (or hovering the line) opens a zone at the final size and the row reflows to Auto; a new row zone is full width at the dragged widget's height; a taller widget makes the row grow. Moving away collapses the zone. (Figma)
- Can't drop into a full row (3 widgets, or a chart + 1), a row where the widget's min doesn't fit, or next to a metrics block: no line, no slot; tooltip "Row is full — max 3 widgets" / "Row is full — max 2 widgets with a chart" / "Metrics take the whole row"; only the lines above/below are targets. (Figma)
- On release both the source and target rows become Auto; an empty row disappears; ≈200 ms move animation. Report only: blocks can move to another section. (Figma)
- Toasts last 4 s, pause on hover; Undo lives in the toast and expires with it (later: Activity → Revert). (Figma)
- A chart dropped over a row of two texts gets no tooltip, only the new-row lines. (inferred)
- Metrics blocks are not draggable here; the notes only say they are not resizable. (inferred)

## Don'ts
- Don't offer widths other than 1/3, 1/2, 2/3, 3/3, or leave an empty column. (Figma)
- Don't let a chart become 1/3 or join a row of 3. (Figma)
- Don't move the layout while the indicator line is showing. (Figma)
- Don't show resize handles outside Draft, in the header zone, or where no direction is possible. (Figma)

## Consolidated / unsure
Consolidated
- change-position-overlay → \`DropZone\` (it is move-and-drop-background Type=change-position-overlay, already in the kit).
- Widget frames (content-card-organism, Size M, 6 px padding, header slot) → \`WidgetFrame\`, built on the kit chart frame (DataVizCard variant chart / DataVizHeader), which draws the same header and hover actions.
- Widgets drawer (a plain 400 px frame with title + description) → \`Drawer\` (drawer-organism) with the description as the first content line.
- coverage-item (747d414e…) appears only inside value-bottom-sheet-organism → already drawn by \`BottomSheet type="value" inProgress\`.
- tableHeader / tableCell (9c9ffe32…, 4f4be618…, 609b40c3…, 81b10bef…) → \`Table\`.
- ⋮ menu (single-select-list-molecule) → the kit Select list visuals.

UNSURE
- **Resize S/M/L menu vs edge handles**: 331:507578 resizes from ⋮ → Resize → S/M/L; the rules section only uses edge handles. Both are built; S/M/L follow the same limits (often disabled for charts).
- **Switcher** (90875214…) sits hidden inside widget-view-change-position; looks like a 2-option \`SegmentedControl\` S. Not built.
- **identity** (457552c0…, Generate widget frames) is an empty 488×356 component; not built.
- **Generate / Edit widget with Cooper** (331:512992, 331:516733) use the chat-compact-panel family, not in this kit; not rebuilt here.

## Review
Conflicts resolved by the rule "when frames and notes disagree, the notes win" (plus one designer decision). Check these:
- **Drag visuals (designer decision)**: the chip-only frames (Change widget position 331:509710) and the ghost frames (413:53329) are combined. The ghost card follows the pointer and the "+ Drop here to place" zone marks the target, both shown in every drag. The chip-only mode was removed.
- **Source opacity**: notes (413:57113) say ~30 %, frames (e.g. 413:45297) draw 40 %. Built at 30 %.
- **Chart + chart resize**: frame 331:507955 shows a handle between two charts; notes (413:56466, 413:56810) lock them at 1/2 + 1/2. Built locked.
- **Ghost width**: notes (413:57113) say the ghost keeps the widget's current width; frame 413:45297 draws ≈330 px for a 3/3 widget. Built at the current width.
- **Resize S/M/L menu (331:507578) vs edge handles (413:56463)**: no conflict in the limits. Both are kept, and S/M/L follow the notes' limits.

`}},design:{type:"figma",url:"https://www.figma.com/design/KmmVU2D0kqWr0dC1xXNzWw/IFS-Design-System-Patterns?node-id=413-45297"}}},e={name:"All variants & states",render:()=>s.render()};var t,a,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: 'All variants & states',
  render: () => section.render()
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const p=["AllVariants"];export{e as AllVariants,p as __namedExportsOrder,m as default};
