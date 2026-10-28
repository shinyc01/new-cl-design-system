# IFS DS kit — component API

Kit version 0.1.0, generated 2026-10-28. Every component is available as `IFS.<Name>` in a prototype.
Each entry is the comment above the component in source (Figma name/node and props). For real usage of every variant,
read the family's examples file (linked per family). `IFS.Icon({ name, size: 12|16|24, variant })` takes Figma icon names — see icons.txt.

## core

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/button.jsx

### Icon
Figma: Icons page (1399:9134). `name` is the Figma icon set name, `size` one of 12 | 16 | 24.
Figma draws every size from its own artwork, so pick the nearest exported size rather than scaling.
A few sets (cooper-*-icon, voice-input-animation) vary by state instead of size: pass `variant`.
`function Icon({ name, size = 16, variant, className, style, title })`

## activity

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/activity.jsx

### TimelineMarker
Figma: marker-atom (3713:12836)
Props: size s (24) | m (32), children = slot content (an icon, an Avatar, a status icon). Default slot = the caret (Figma: arrow-caret-down-filled, drawn rotated to point right).
`function TimelineMarker({ size = 's', children, className, ...rest })`

### TimelineConnector
Figma: connector-atom (3713:12835)
Props: type solid|dash. Fills the height of its parent column.
`function TimelineConnector({ type = 'solid', className, ...rest })`

### TimelineItem
Figma: activity-organism (3713:13396) — "The timeline base". One entry = marker + connector + Content slot.
Props: marker = node for the marker slot (overrides avatar/icon), avatar = Avatar props (S 24 in the marker),
icon = icon name in the marker, markerSize s|m, connector solid|dash|none (none = last entry),
title (name, Heading/H3), badge = label text or Badge props (badge-atom White M), subtitle (role line),
time (right column), children = body text (Body/M regular, secondary), content = node that replaces the whole default
content (the Figma "Content slot"), aside = node replacing the right column.
`function TimelineItem({ marker, avatar, icon, markerSize = 's', connector = 'solid', title, badge, subtitle, time, children, content, aside, className, ...rest })`

### Timeline
Timeline = a list of activity-organism entries (Figma "in use example"). The last entry drops its connector.
Props: items = TimelineItem props[] (each may carry `key`), or children = <TimelineItem>s; connector solid|dash for all entries.
`function Timeline({ items, connector = 'solid', children, className, ...rest })`

### ApprovalCard
One approver card (the Content slot). Props: state awaiting|success|rejected|empty|disabled|setting, name, position,
avatar = Avatar props, date (show-date), comment (show-comment), actions = { secondary, primary } labels or false (show-buttons),
onPrimary / onSecondary, setting-only: role / roles / onRoleChange (dropdown-item), brief (show-brief; Cooper brief text),
onExpand. Disabled = outlined card (no fill); Figma keeps its buttons in their default look.
`function ApprovalCard({ state = 'awaiting', name, position, avatar, date, comment, actions, onPrimary, onSecondary, role, roles, onRoleChange, brief, onExpand, className, ...rest })`

### ApprovalChain
Figma: approval-chain-timeline (1440:6174) — legacy; rebuilt as a configuration of the timeline base (activity-organism 3713:13396).
Props: steps = [{ key, state, name, position, avatar, date, comment, actions, role, roles, brief }], defaultSteps,
onChange(steps) — clicking Approve / Reject on an awaiting step really moves it to success / rejected.
onApprove(step, index) / onReject(step, index) also fire.
`function ApprovalChain({ steps, defaultSteps = [], onChange, onApprove, onReject, className, ...rest })`

### VersionEntry
One version entry. Props: title (e.g. "Version 3"), badge (show-badge; label or Badge props), description, author = { name, avatar },
time, activity = TimelineItem props[] (shown when expanded), expanded / defaultExpanded / onExpandedChange,
onRename(newTitle) — the ⋯ button (or double-click on the title) enters Rename; Enter/✓ saves, Esc/✕ cancels.
onMenu replaces the ⋯ behaviour. state hover|rename (gallery).
`function VersionEntry({ title, badge, description, author, time, activity, expanded, defaultExpanded = false, onExpandedChange, onRename, onMenu, state, last, className, ...rest })`

### VersionHistory
Figma: version-history-timeline (2277:5299) — legacy; rebuilt as a configuration of the timeline base.
Props: versions = VersionEntry props[] (each may carry `key`); onRename(index, title). Uncontrolled titles update on rename.
`function VersionHistory({ versions = [], onRename, className, ...rest })`

### Comment
Figma: comment-content-card (260:86722) — one reply. Variants State=Default|Hover, Tagged user=False|True.
Props: name, time (time ago), avatar = Avatar props, you (adds "(you)"), children = text (string: @mentions render as
accent tokens — Figma Tagged user), mentions = names to match exactly, onMenu (⋯ shown on hover/focus; Figma Hover),
state hover (gallery).
`function Comment({ name, time, avatar, you, children, mentions, onMenu, state, className, ...rest })`

### CommentComposer
Figma: comment-input-atom (2290:15642) + comment-input-molecule (1660:10933, when `avatar` is passed).
Props: mode text|voice|cooper (value/defaultMode/onModeChange — switching never clears the draft), value / defaultValue /
onChange(text), onSubmit(text) (Enter or send; clears the draft), placeholder (defaults per mode: "Add a comment" /
"Say a comment" / "Working on your comment…" while generating), generating (Cooper drafting → send becomes stop),
onStop, avatar = Avatar props of the current user (molecule), disabled, autoFocus, state (gallery: multi).
Single line = pill; grows to Multi line (12px radius, buttons below) when the text wraps.
`function CommentComposer({ mode, defaultMode = 'text', onModeChange, value, defaultValue = '', onChange, onSubmit, placeholder, generating, onStop, avatar, disabled, autoFocus, state, className, style, ...rest })`

### CommentThread
Figma: comment-popover-organism (260:88500) — the full thread. Variants Type=Default | Cooper suggestion | Edit.
Props: number (thread ID shown after "Comment", e.g. "#55"), comments / defaultComments / onCommentsChange
([{ id, name, time, text, avatar, you, mentions }]), currentUser = { name, avatar } (composer avatar + author of new replies),
resolved / defaultResolved / onResolvedChange (✓ in the header; resolved threads hide the composer until reopened),
onClose (✕), onMenu (⋯), cooperSuggestion = { label, onClick } (Type=Cooper suggestion: Accent (Cooper) L button),
composerProps (passed to CommentComposer), editingId (gallery: opens Type=Edit on that reply).
Posting really appends a reply ("Just now", marked (you)); ⋯ on your own reply opens the inline editor.
`function CommentThread({ number = '#00', comments, defaultComments = [], onCommentsChange, currentUser = { name: 'You' }, resolved, defaultResolved = false, onResolvedChange, onClose, onMenu, cooperSuggestion, composerProps, editingId, className, style, ...rest })`

### UserCard
Figma: user-card (1440:5059) — legacy (guide: "can be content-card-organism").
Props: type assigned|owner, name, position, avatar = Avatar props (default Black M), badge (label, default "Owner"),
date (owner: under the badge), checked (show-checkmark-icon), onEdit (assigned: edit icon-button), draggable (assigned drag handle),
loading, state hover|drag|focus (gallery), onClick.
`function UserCard({ type = 'assigned', name, position, avatar, badge = 'Owner', date, checked, onEdit, loading, state, onClick, className, ...rest })`

### Collaborator
Figma: collaborator (1440:6097) — legacy (guide: "can be content-card-organism").
Props: type joined|awaiting|recommended, name, position, avatar = Avatar props (default: Green joined, Awaiting, Black recommended),
role / defaultRole / roles / onRoleChange (dropdown-item; joined + awaiting), iconButton = { icon, label, onClick } (show-icon-button),
onAdd (recommended: "+" shown on hover/focus), loading, state hover|focus (gallery).
`function Collaborator({ type = 'joined', name, position, avatar, role, defaultRole, roles, onRoleChange, iconButton, onAdd, loading, state, className, ...rest })`

### FileCard
Figma: file-card (1440:5465) — legacy ("Documents"; guide: "can be content-card-organism").
Props: name, date, error (State=error: red tile + delete / retry), loading, onDownload (shown on hover/focus), onDelete, onRetry,
onClick (open), state hover (gallery).
`function FileCard({ name, date, error, loading, onDownload, onDelete, onRetry, onClick, state, className, ...rest })`

### VersionCard
Figma: version-card (2104:4022) — legacy (guide: "can be content-card-organism").
Props: label (caption, default "Ready to publish"), items = [{ name, type (indicator colour, default orange), meta }] (the List slot),
secondaryAction / primaryAction = Button props incl. children (default "Schedule" / "Publish"), loading, state hover (gallery).
`function VersionCard({ label = 'Ready to publish', items = [], secondaryAction = { children: 'Schedule' }, primaryAction = { children: 'Publish' }, loading, state, className, ...rest })`

### 
Controlled/uncontrolled value helper.
`function useActValue(value, defaultValue, onChange)`

## button

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/button.jsx

### Button
Figma: button (65:3211)
Props: type primary|secondary|tertiary|ghost|cooper (Figma "Accent (Cooper)"), size l|m|s,
iconLeft / iconRight = icon names (Figma show-icon-* + Icon swap), children = Button label.
Leave out children for Figma show-label=false.
`function Button({ type = 'secondary', size = 'm', iconLeft, iconRight, children, state, className, ...rest })`

### IconButton
Figma: icon-button (71:4250)
Props: icon (required), type ghost|primary|secondary|tertiary, size l|m|s, shape square|circle.
Always pass a `label` — it becomes the accessible name and tooltip.
`function IconButton({ icon, label, type = 'ghost', size = 'm', shape = 'square', state, className, ...rest })`

## canvas

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/canvas.jsx

### ValueMapButton
------------------------------------------------------------------------------------------ 
Figma: value-map-button (2590:20612)
Floating vertical overlay on the Value Framework canvas. Fit = view action (zoom to show all);
Expand all / Collapse all = structure actions on the whole tree.
Props: type shape|input (Figma Type=Shape: Collapse + Expand + Fit; Type=Input: Fit only),
selected fit|expand|collapse (Figma Selected; the last applied action shows pressed), defaultSelected,
onSelect(action), onFit, onExpand, onCollapse.
`function ValueMapButton({ type = 'shape', selected, defaultSelected, onSelect, onFit, onExpand, onCollapse, className, ...rest })`

### MapToolbar
------------------------------------------------------------------------------------------ 
Figma: explore-map-button (7404:34866) = map-tool-bar-organism, a stack of
explore-map-button-base (7404:34867) clusters. Canvas note: "Floating vertical overlay on the map canvas.
A stack of clusters (rounded surfaces with border + shadow); hairline dividers separate action families
inside a cluster, gaps separate clusters."
MapToolbar: children = MapToolCluster elements; with no children it renders the Figma default
(zoom in/out · lasso, select area | layers, map settings) and calls onAction(id).
MapToolCluster: children = MapToolButton / MapToolDivider. MapToolDivider: hairline between action families.
MapToolButton: icon, label (accessible name + tooltip), active (pressed state, aria-pressed), onClick.
`function MapToolbar({ children, tool, defaultTool = null, onToolChange, onAction, className, ...rest })`

### MapToolCluster
------------------------------------------------------------------------------------------ 
Figma: explore-map-button (7404:34866) = map-tool-bar-organism, a stack of
explore-map-button-base (7404:34867) clusters. Canvas note: "Floating vertical overlay on the map canvas.
A stack of clusters (rounded surfaces with border + shadow); hairline dividers separate action families
inside a cluster, gaps separate clusters."
MapToolbar: children = MapToolCluster elements; with no children it renders the Figma default
(zoom in/out · lasso, select area | layers, map settings) and calls onAction(id).
MapToolCluster: children = MapToolButton / MapToolDivider. MapToolDivider: hairline between action families.
MapToolButton: icon, label (accessible name + tooltip), active (pressed state, aria-pressed), onClick.
`function MapToolCluster({ children, label, className, ...rest })`

### MapToolButton
------------------------------------------------------------------------------------------ 
Figma: explore-map-button (7404:34866) = map-tool-bar-organism, a stack of
explore-map-button-base (7404:34867) clusters. Canvas note: "Floating vertical overlay on the map canvas.
A stack of clusters (rounded surfaces with border + shadow); hairline dividers separate action families
inside a cluster, gaps separate clusters."
MapToolbar: children = MapToolCluster elements; with no children it renders the Figma default
(zoom in/out · lasso, select area | layers, map settings) and calls onAction(id).
MapToolCluster: children = MapToolButton / MapToolDivider. MapToolDivider: hairline between action families.
MapToolButton: icon, label (accessible name + tooltip), active (pressed state, aria-pressed), onClick.
`function MapToolButton({ icon, label, active, className, ...rest })`

### MapToolDivider
------------------------------------------------------------------------------------------ 
Figma: explore-map-button (7404:34866) = map-tool-bar-organism, a stack of
explore-map-button-base (7404:34867) clusters. Canvas note: "Floating vertical overlay on the map canvas.
A stack of clusters (rounded surfaces with border + shadow); hairline dividers separate action families
inside a cluster, gaps separate clusters."
MapToolbar: children = MapToolCluster elements; with no children it renders the Figma default
(zoom in/out · lasso, select area | layers, map settings) and calls onAction(id).
MapToolCluster: children = MapToolButton / MapToolDivider. MapToolDivider: hairline between action families.
MapToolButton: icon, label (accessible name + tooltip), active (pressed state, aria-pressed), onClick.
`function MapToolDivider() { return <span className="ifs-map-cluster__divider" role="separator" />; }`

### NodeHoverActions
------------------------------------------------------------------------------------------ 
Figma: node-button (1851:191153)
Contextual menu shown on hover over a framework node; the action depends on the node
(collapsed → Expand, expanded → Collapse). Acts on that node only — not for global toolbar actions.
Props: type expand|collapse|isolate-path|submodel (Figma Type; Submodel = Isolate path + Open formula),
actions = [{ id, icon, label }] to override the preset, onAction(id).
`function NodeHoverActions({ type = 'expand', actions, onAction, className, ...rest })`

### AddNodeButton
------------------------------------------------------------------------------------------ 
Figma: add-node-button (2879:7311)
Creates a new (grey, provisional) subnode on the framework canvas; confirmed via its check icon.
Click → typing state (Figma Pressed/Typing): Enter or ✓ confirms, Esc or ✕ cancels.
Props: onAdd(name), onCancel, placeholder ("Type..."), disabled, editing / defaultEditing / onEditingChange,
state hover|pressed|typing (forced, gallery), label (accessible name, default "Add node").
`function AddNodeButton({ onAdd, onCancel, placeholder = 'Type...', disabled, editing, defaultEditing = false, onEditingChange, state, label = 'Add node', defaultValue = '', className, ...rest })`

### NodeCard
------------------------------------------------------------------------------------------ 
Figma: node-card (1440:4401) — the node on the framework/map canvas.
Props:
  type strategic-objective|value-model|enterprise-goal|value-framework|measure (solid colour nodes),
       subnode|document|user (neutral), skeleton (loading)  — Figma Type.
  title, caption (show-caption-bottom), badge = label text (show-badge-top), counter (show-counter),
  stackIcons (show-stack-icons: the hover icons — drag handle, and open/delete on Document/User; default true),
  user = { name, role, initials } for type=user (badge defaults to "Manager"-style role label).
  Interactive (real): selected/defaultSelected/onSelectedChange (click), draggable (HTML5 drag, onDragStart),
  checkbox + checked/defaultChecked/onCheckedChange (Figma Checkbox), editing + onRename(title)/onCancelEdit (Figma Edit),
  cooper (Cooper ring), outOfFocus (dimmed), disabled, loading (= Skeleton).
  state hover|drag|select|cooper|focus|cooper-drag|out-of-focus|disabled|checkbox|edit|loading forces a Figma State (gallery).
`function NodeCard({ type = 'strategic-objective', state, title = '{card-title}', caption, badge, counter, stackIcons = true, user, selected, defaultSelected = false, onSelectedChange, checkbox, checked, defaultChecked = true, onCheckedChange, editing, onRename, onCancelEdit, cooper, outOfFocus, disabled, loading, draggable, onDragStart, onDragEnd, onOpen, onDelete, onClick, className, style, ...rest })`

### SidebarNodeCard
------------------------------------------------------------------------------------------ 
Figma: sidebar-node-card (2667:6608) — a node in a side list, dragged onto the canvas.
Figma marks it legacy ("can be content-card-organism"); kept because the canvas drag flow uses it.
Props: title, description, cooper (Cooper ring), dragData (string put on dataTransfer as text/plain),
onDragStart/onDragEnd, state hover|drag|focus|cooper-hover|cooper-drag (forced, gallery).
`function SidebarNodeCard({ title = '{card-title}', description, cooper, dragData, state, onDragStart, onDragEnd, className, ...rest })`

### MapPin
------------------------------------------------------------------------------------------ 
Figma: map-pin-teardrop (43:2020), Patterns › Map. Default location marker for one asset on an exact spot.
(Other pin sets on the page — map-pin-dot/-square/-pole/-defect/-flow — are not built here.)
Props: status neutral|error|warning, icon = asset icon name (Figma Asset icon=Yes; absent = white dot),
selected / defaultSelected / onSelectedChange (Figma Selected), dimmed (Figma Out of hover), opened (Figma Opened),
label (accessible name), state selected|opened|out-of-hover (forced, gallery).
`function MapPin({ status = 'neutral', icon, selected, defaultSelected = false, onSelectedChange, dimmed, opened, label = 'Asset', state, className, ...rest })`

### CanvasBackground
------------------------------------------------------------------------------------------ 
Figma: canvas-background (1395:196712), Surfaces.
"The infinite, pannable, zoomable ground plane for map-first and node-graph views" — not for document-flow pages.
Props: image (url; Figma State=Image — a map), view {x, y, zoom} / defaultView / onViewChange (drag to pan,
ctrl/⌘ + wheel or pinch to zoom, plain wheel pans), minZoom, maxZoom, children = world content (absolute-positioned
in world px), overlay = fixed UI on top (toolbars, mini-map), apiRef receives { setView, fit(bounds) }.
`function CanvasBackground({ image, view, defaultView = { x: 0, y: 0, zoom: 1 }, onViewChange, minZoom = 0.25, maxZoom = 2, children, overlay, apiRef, className, style, ...rest })`

### CanvasConnector
Connector between two canvas nodes (world coordinates). Not a Figma component of its own: the framework
screens draw node links as plain hairlines (border/medium) — a horizontal-tangent curve between two points.
Props: from {x,y}, to {x,y}, highlighted (border/strong).
`function CanvasConnector({ from, to, highlighted })`

### DropZone
------------------------------------------------------------------------------------------ 
Figma: move-and-drop-background (4509:30446), Surfaces.
Dashboard edit mode: the dashed drop zone marking where a dragged widget will land.
Props: text (Figma bool `text`: shows "+ Drop here to place"), children = custom label, onDrop(data, event),
active (forced highlight). It accepts HTML5 drops and exposes data-over while something is dragged over it.
`function DropZone({ text = false, children, onDrop, active, className, ...rest })`

### SankeyNode
------------------------------------------------------------------------------------------ 
Figma: sankey-atom (1853:12325) — one Sankey node: connector stub + card.
Props: type default|measure, label, from, to (values, e.g. "$1.24B" → "$1.27B"; leave `to` out for a single value),
change (e.g. "4.5%"; Figma compare-data, shown on hover), changeDirection down|up, disabled, state hover (gallery),
accent = colour of the left accent bar used by the organism (css colour / var).
`function SankeyNode({ type = 'default', label, from, to, change, changeDirection = 'down', disabled, state, accent, className, style, ...rest })`

### SankeyHeader
Figma: sankey-header (2698:64494) — column summary box ("MEAS. Q1 2025 29 → Q4 2026 24").
Props: abbr ("MEAS."), fromLabel, toLabel, from, to.
`function SankeyHeader({ abbr, fromLabel, toLabel, from, to, className, ...rest })`

### Sankey
Figma: sankey-organism (4457:53304) = column strip + sankey-chart (1853:12398) built from sankey-atom/-header.
"Flow: how a total splits through stages (budget allocation, value decomposition, goal → objective → model lineage);
band width = value."
Props:
  columns = [{ id, label, header?: SankeyHeader props }]   (left → right)
  nodes   = [{ id, column, label, from, to, change, type: default|measure|source, count?, color?: violet|green }]
            type=source draws the tall coloured source block (first column, e.g. "6 Goals").
  links   = [{ source, target, value }]  — band colour follows the source block it descends from.
  height (chart body px, default 575), onNodeClick(node), showFit + onFit (value-map-button Input in the corner).
`function Sankey({ columns = [], nodes = [], links = [], height = 575, onNodeClick, showFit = true, onFit, className, ...rest })`

### TimelinePhase
------------------------------------------------------------------------------------------ 
Figma: timiline-phase-molecule (3967:1765) — one phase row of the Gantt (+ its task list when expanded).
Props: title (Figma Title), subtitle ("Internal"), badge = red badge text (Figma Badge=True, e.g. "6 weeks behind"),
color teal|muted-purple|steel-blue|rose|… (data-viz family, data-4), start / end (fractional slot indexes on the axis),
tasks = [{ title, label ("Q1 2027"), start, end }], expanded / defaultExpanded / onExpandedChange,
onAdd, onMore (hover actions), slots (number of axis slots, set by the chart), state hover (gallery).
`function TimelinePhase({ title, subtitle, badge, color = 'teal', start = 0, end = 1, tasks = [], expanded, defaultExpanded = false, onExpandedChange, onAdd, onMore, slots = 20, groups = 5, state, className, ...rest })`

### TimelineChart
Figma: timeline-chart-organism (3967:38286) — "use this". Gantt: phases on a time axis (e.g. investment phases
across a 5-year plan); shows sequential vs parallel work.
Props: groups = [{ label: '2027', slots: ['Q1','Q2','Q3','Q4'] }] (the axis), phases = TimelinePhase props[] (+ id),
title ("Phase"), onAddPhase (shows the header + on hover, Figma State=Hover), slot positions are global indexes
across all groups (Q1 2027 = 0, Q2 2027 = 1, … ).
`function TimelineChart({ groups = [], phases = [], title = 'Phase', onAddPhase, state, className, ...rest })`

## charts

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/charts.jsx

### DataVizBar
Figma: bar-atom (4457:32996)
Props: state default|hover|out-of-focus|background|loading, color = data-viz group (default rose), step (default 4;
hover = step-1, out-of-focus = 9), children = the value label (show-value; absent = hidden). Fills its parent.
`function DataVizBar({ state = 'default', color = 'rose', step = 4, children, className, style, ...rest })`

### DataVizGroupedBar
Figma: grouped-bar-molecule (4457:37362)
Props: type horizontal (segments stacked top→bottom) | vertical (segments side by side), progress (meter: value against max on a
neutral track), values = numbers (segment sizes; one group, steps 4,5,6,… of `color`), value + max (progress), showValues.
`function DataVizGroupedBar({ type = 'horizontal', progress = false, values = [], value = 0, max = 100, color = 'rose', showValues, format = defaultFormat, className, style, ...rest })`

### DataVizLine
Figma: line-atom (4440:32650)
Props: dashed (3/5 dash — planned, median, reference), orientation horizontal|vertical. Fills its parent's width (or height).
`function DataVizLine({ dashed = false, orientation = 'horizontal', className, ...rest })`

### DataVizIndicator
Figma: indicator-atom (4440:32643)
Props: type default (8px data point) | selected (point + white ring) | intended-target (2×16 target tick), color = data-viz group or CSS colour.
`function DataVizIndicator({ type = 'default', color = 'rose', className, style, ...rest })`

### ValueLabel
Figma: value-label-atom (4440:32611)
Props: state primary|secondary|tertiary|empty|loading, children = the value text (Label/M/medium).
`function ValueLabel({ state = 'primary', children, className, ...rest })`

### LegendSwatch
Figma: legend-swatch-atom (4440:32628)
Props: state default|hover|out-of-hover|intended-target, color = data-viz group or CSS colour, label, value (show-value),
step (group step, default 4; charts use 3), swatchOpacity (for opacity-coded ramps). Hover only — legend entries are not clickable (Figma).
`function LegendSwatch({ state = 'default', color = 'rose', step = 4, label, value, swatchOpacity, className, ...rest })`

### DataVizHeader
Figma: data-viz-header-molecule (2154:2068)
Props: title, state default|hover (forced; real hover/focus of the header or its card also shows the hover row),
Right element: segments = SegmentedControl options (size S) with segmentValue/defaultSegmentValue/onSegmentChange,
or button = { label, onClick, iconRight } (Tertiary S). Hover row: drag handle (draggable), and ghost icon-buttons
for onEdit / onDelete / onMore. hoverActions = custom hover-only node, slot = always-visible right node (Figma "Slot").
`function DataVizHeader({ title, state, segments, segmentValue, defaultSegmentValue, onSegmentChange, button, onEdit, onDelete, onMore, draggable = true, hoverActions, slot, className, ...rest })`

### DataVizCard
Figma: data-viz-card-organism (4457:33030)
Props: state default|hover|drag|cooper, title, header = extra DataVizHeader props, children = Content slot, legend (node, below content).
variant="chart" is the frame every core chart (chart-column … chart-funnel) is drawn in: 6px padding, header with the Cooper
button (onCooper) and, on hover, drag handle + "Edit with Cooper" (onEditWithCooper; false hides it) + the view-as-table toggle.
`function DataVizCard({ variant = 'organism', state, title, header, legend, children, onCooper, onEditWithCooper, tableView, onToggleTable, className, ...rest })`

### DataVizTooltip
Figma: data-viz-modal-organism (4440:32681) and the chart-info-modal tooltip used by every core chart.
Props: title, subtitle (Category line above the title → organism layout, value right of the title),
value (chart layout: second line), delta = { text, direction up|down, tone positive|negative }, items = [{ label, value, color }],
showValue (Figma show-value), variant chart (320 wide) | modal (256). children are appended under the items.
`function DataVizTooltip({ title, subtitle, value, delta, items = [], showValue = true, variant = 'modal', children, className, ...rest })`

### ColumnChart
Figma: chart-column (9862:12468) — one measure across few or time-ordered categories; zero-based, one hue.
Props: data = [{ label, value, reference?, delta?, details? }], valueLabel (legend + table), referenceLabel (white peer-median tick),
color (data-viz group, default muted-purple), format(v) for values/axis, tooltip(datum, i) → DataVizTooltip props.
Shell props (every chart): title, state default|hover|cooper|empty|loading, view chart|table / defaultView / onViewChange,
onCooper, onEditWithCooper, emptyTitle, emptyText, height (default 328), className, style.
`function ColumnChart(props)`

### HistogramChart
Figma: chart-histogram (9864:14012) — distribution of one measure across bins (contiguous zero-based columns).
Props: values = raw numbers + bins (count, default 10) or binWidth — or data = pre-binned [{ label, value }];
binFormat(lo, hi) for bin labels, valueLabel (default 'Count'), + ColumnChart props.
`function HistogramChart({ values, bins = 10, binWidth, binFormat, data, valueLabel = 'Count', ...props })`

### BarChart
Figma: chart-bar (9862:12961) — horizontal bars for many categories, long labels or rankings (sort biggest → smallest).
Props: as ColumnChart + sort (true = biggest first), labelWidth (category column, default 96). Values are labelled at the bar end.
`function BarChart(props)`

### GroupedColumnChart
Figma: chart-grouped-column (9862:13445) — 2–3 series side by side per category; consistent series order + legend.
Props: data = [{ label, [series.key]: number, reference?, delta?, details? }], series = [{ key, label, color? }],
referenceKey (default 'reference') + referenceLabel, format, tooltip. + shell props.
`function GroupedColumnChart(props)`

### StackedColumnChart
Figma: chart-stacked-column (9863:11139) — composition of a total per category (series stack bottom → top in series order).
Props: data = [{ label, [series.key]: number, delta?, details? }], series = [{ key, label, color? }], format, tooltip. + shell props.
`function StackedColumnChart(props)`

### LineChart
Figma: chart-line (9863:11650) — change over time; actual solid vs planned dashed; optional peer band + dashed median.
Props: data = [{ label, [series.key]: number, … }], series = [{ key, label, color?, dashed?, points? }] (first series shows its
points), band = { low, high, mid?, label } (keys into data; drawn as a white 16% band + dashed mid line), referenceKey/referenceLabel
(dashed white line), zeroBased (default false — lines need not start at 0), format, tooltip. Hover: point + tooltip at that point.
`function LineChart(props)`

### AreaChart
Figma: chart-area (9863:12167) — cumulative volume over time; zero-based; series fill fades from 45% to 0 of its colour.
Props: as LineChart (zeroBased defaults to true; points hidden unless series.points).
`function AreaChart(props)`

### PieChart
Figma: chart-pie (9866:12309) — parts of one whole with few slices (prefer DonutChart). Slices largest → smallest clockwise from 12.
Props: data = [{ label, value, color?, opacity?, delta?, details? }], sort (default true), valueLabel, format, tooltip. + shell props.
`function PieChart(props) { return <RoundChart {...props} donut={false} />; }`

### DonutChart
Figma: chart-donut (9866:12774) — share of a whole; one legend; the hole carries the total.
Props: as PieChart + centerValue (big number) + centerLabel (caption under it).
`function DonutChart(props) { return <RoundChart {...props} donut />; }`

### ScatterChart
Figma: chart-scatter (9866:13245) — relationship between two measures; clusters and outliers.
Props: data = [{ label, x, y, series?, size?, delta?, details? }], series = [{ key, label, color? }] (absent = one series),
xFormat, yFormat (default format), xUnit (suffix on the last x tick, e.g. "days"), xLabel/yLabel (table + tooltip names),
xReference / yReference (dashed white peer-median lines) + referenceLabel, bubble (size → radius), tooltip. + shell props.
`function ScatterChart(props)`

### BubbleChart
Figma: chart-bubble (9866:13788) — scatter with a third measure as bubble area. Props: as ScatterChart; data items carry `size`.
`function BubbleChart(props) { return <ScatterChart {...props} bubble />; }`

### GaugeChart
Figma: chart-gauge (9867:618) — one KPI against one reference value on a 180° arc.
Props: value, max (default 100), min (0), target (solid white tick reaching outside the arc), reference (dashed white tick across the arc), format (default v → v%),
label (caption under the number), valueLabel / targetLabel / referenceLabel (legend), color, delta, details, tooltip. + shell props.
`function GaugeChart(props)`

### WaterfallChart
Figma: chart-waterfall (9866:16075) — bridge from a start value to an end value through increments.
Props: data = [{ label, value, total? }]: total:true bars stand on 0 (value given = reset the running total; omitted = show it),
other bars float as +/- steps. colors = { total, increase, decrease } (groups; default muted-purple / rose / teal),
labels = { total, increase, decrease } (legend), format, tooltip. + shell props.
`function WaterfallChart(props)`

### FunnelChart
Figma: chart-funnel (9867:1065) — drop-off across ordered stages.
Props: data = [{ label, value, reference? (peer value for that stage → white ticks), delta?, details? }], color (stages; default
muted-purple, fading per stage), outcomeColor (last stage; default teal — set null to keep one colour), stageLabel/outcomeLabel/
referenceLabel (legend), format (default full number), tooltip. + shell props.
`function FunnelChart(props)`

### HeatmapChart
Figma: chart-heatmap (9866:14280) — ordered magnitude across a matrix, one hue group (Figma: teal-3 with opacity by value).
Props: rows = [labels], columns = [labels], values = [[row][col] numbers], color (default teal), columnLabelEvery (auto),
lowLabel / highLabel (legend), valueLabel, format, tooltip(cell = { row, column, value, r, c }). + shell props.
`function HeatmapChart(props)`

### ProgressRing
Figma: progress-ring-molecule (4619:18187)
Props: value 0–100 (Figma % variants 0/10/20/40/50/60/80/100 — any value works), size (default 24), label = accessible name.
`function ProgressRing({ value = 0, size = 24, label = 'Progress', className, ...rest })`

### EvidenceStrength
Figma: evidence-strength-bar-molecule (67:6634)
Props: value (%), thresholds = [review, approve] (default [70, 90]), min (left end of the Reject band, default 50), title,
labels = [reject, review, approve] captions. Type (Reject|Review|Approve) follows the value: the active band is drawn solid.
`function EvidenceStrength({ value = 0, thresholds = [70, 90], min = 50, title = 'Evidence strength', labels, className, ...rest })`

### 
color = a group name ('teal'), any CSS colour, or undefined (= palette slot i)
`function dvColor(color, i = 0, step = DV_STEP)`

## data

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/data.jsx

### Badge
Figma: badge-atom (83:52162)
Props: color white|black|red|green|orange|false|loading (Figma "False" = no fill, uppercase caption),
size l|m|s, iconLeft / iconRight (icon names; Figma default shows system-star-favourite on the left),
indicator = status-indicator state (show-indicator), avatar = Avatar props (show-avatar), flag = node (show-flag), children = label.
`function Badge({ color = 'white', size = 'm', iconLeft, iconRight, indicator, avatar, flag, children, className, ...rest })`

### StatusIndicator
Figma: status-indicator-atom (789:39211)
Props: state default|error|success|cooper|warning|blue, stroke (Figma Stroke=True: 1.5px surface/primary ring).
`function StatusIndicator({ state = 'default', stroke, label, className, ...rest })`

### Avatar
Figma: avatar-atom (260:17144) + avatar-organism (260:19923)
Props: initials (Figma Label, e.g. "UN") or name (initials derived), size xs|s|m|l|xl,
type black|red|dark-orange|orange|yellow|brown|dark-blue|blue|light-blue|green|lime|dark-purple|purple|light-purple|dark-pink|light-pink|image|awaiting|cooper|inactive|loading
  or "auto" (picks a collaboration colour from the name), src (Type=Image), status = risk-atom type check|online|offline|warning|error (Figma show-status; absent = hidden),
onClick makes it a button with Figma Hover/Pressed/Focus states.
`function Avatar({ initials, name, type = 'black', src, size = 'm', status, state, onClick, label, className, ...rest })`

### RiskStatus
Figma: status-risk-molecule (69:1729)
Props: type success|warning|error|evaluated, state hover|focus (forced, gallery) , disabled, loading,
children = label (defaults to Figma's: auto-resolved / moderate risk / critical risk / evaluated), onClick → button.
`function RiskStatus({ type = 'success', state, disabled, loading, onClick, children, className, ...rest })`

### ReadinessStatus
Figma: status-readiness-molecule (1440:5273)
Props: type done|warning|in-progress|active|loading, children = label (Figma Label),
right = text (Right-section=Text) OR indicators = [{ type, label }] (Right-section=Status, XS indicators).
`function ReadinessStatus({ type = 'done', children, right, indicators, className, ...rest })`

### Indicator
Figma: indicator-molecule (1074:180251)
Props: type orange|green|red|blue|purple|gray|cooper|archive|loading, size s|xs, children = text,
buttonRight = icon name (Figma "button right": tertiary S icon-button), onButtonClick, buttonLabel.
`function Indicator({ type = 'orange', size = 's', children, buttonRight, onButtonClick, buttonLabel, className, ...rest })`

### StatCard
Figma: stat-card-organism (3643:35055)
Props: size m|s, title (show-title), value, description, trend (e.g. "3 %"; show-trend), trendDirection up|down,
badge = Badge props (show-badge; Figma default Color=Red S), children = additional content slot, loading.
`function StatCard({ size = 'm', title, value, description, trend, trendDirection = 'up', badge, loading, children, className, ...rest })`

### ContentCard
Figma: content-card-organism (3643:32067)
Props: size m|s, title, description (show-description), avatar = Avatar props (show-avatar, L 40),
control = node (show-checkbox / show-radio-button / show-switch → pass IFS.Checkbox etc.), iconRight = icon name (Figma arrow-right),
iconButton = { icon, label, onClick } (show-icon-button), top / bottom = slot nodes,
tertiaryAction / primaryAction = Button props incl. children (show-buttons, show-tertiary-button, show-primary-button),
selected, cooper (Figma State=Cooper), loading, state (forced: hover|pressed|focus|drag|selected|cooper), onClick → focusable role=button.
`function ContentCard({ size = 'm', title, description, avatar, control, iconRight, iconButton, top, bottom, tertiaryAction, primaryAction, selected, cooper, loading, state, onClick, className, ...rest })`

### Table
Figma: table-card-organism (4835:4031) with table-header-molecule (1440:5904), table-cell-atom (1440:5941),
table-sort-atom (1440:5921), table-filter-atom (1440:5932), group-row-molecule (4833:19072), content-row-molecule (4835:3501).
Figma rule: tables show every row (no pagination). Filter with the `tabs` slot: the Figma table card puts a
SegmentedControl there (prop "show-segmanted-control"); the canvas notes call it "tabs with counts".
Props:
  columns = [{ key, title, width ('1fr' | 240 | 'auto'), align left|center|right, sortable, sortValue(row),
              type text|description|counter|badge|status|check|user|user-description|custom, render(row), filter: { applied, onClick } }]
    cell values by type: text → row[key]; description → { text, description }; counter → { text, value, direction };
    badge → Badge props; status → { type, label, description }; check → label; user → { name, initials, type, description }.
  rows = [{ id, ...data }], groupBy = key or fn(row) → group title (group-row-molecule, expand/collapse), defaultCollapsed = [titles],
  sort / defaultSort = { key, dir: 'asc'|'desc' }, onSortChange, selectedId / onRowClick (row hover + selected),
  title (show-table-name), tabs (show-segmanted-control), search (right side of the bar). Without title/tabs/search it renders the bare table.
`function Table({ columns = [], rows = [], groupBy, defaultCollapsed = [], sort, defaultSort = null, onSortChange, selectedId, onRowClick, rowKey = 'id', title, tabs, search, className, ...rest })`

### NotificationCard
Figma: notification-card (9943:5373)
Type = what happened: all (avatar + action tag), specific (avatar, no tag), grouped (Cooper avatar + count).
Read: read hides the unread dot. critical (show-critical) adds status-error-filled on the leading icon's top-right (aria-label "Critical").
actionRequired (show-action-required, default on): the tag in the title row — only for Action needed / Outcome; turn off once
Resolved / Acknowledged / Unavailable or for a successful outcome. Hidden for type="specific".
Props: title, details (show-details), meta ("{item} · {area}"), time, status = Badge props (show-status),
actions = [{ label, onClick }] up to two (show-actions: Secondary + Tertiary S buttons), avatar = Avatar props, count (grouped),
actionLabel (tag text, default "Action required"), onClick → focusable card.
`function NotificationCard({ type = 'all', read = false, title, details, meta, time, critical, status, actions, actionRequired = true, actionLabel = 'Action required', avatar, count, onClick, className, ...rest })`

### ProgressBar
Figma: progress-bar-molecule (1674:1902)
Props: value 0–100 (Figma % variants 0/10/20/40/50/60/80/100 — any value works), label = accessible name.
`function ProgressBar({ value = 0, label = 'Progress', className, ...rest })`

## extras

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/extras.jsx

### Hotkey
Figma: hotkey-atom (67:6150)
Props: children = hotkey text (Figma "hotkey", default "⌘/").
`function Hotkey({ children = '⌘/', className, ...rest })`

### Counter
Figma: counter-atom (88:24147)
Props: size s (18) | m (24), indicator (show-indicator: true = Blue, or a StatusIndicator state), children = number.
`function Counter({ size = 's', indicator, children, className, ...rest })`

### ScrollArea
Figma: scroll-bar-atom (83:57650)
A scroll container with the Figma bar (8px track, 4px bar) in place of the native scrollbar.
Props: height / maxHeight (the scroll box), children, label (aria-label; makes the viewport keyboard-focusable),
plus any <div> attribute on the outer element.
`function ScrollArea({ height, maxHeight, children, label, className, style, ...rest })`

### ScrollBar
Figma: scroll-bar-atom (83:57650) drawn alone (gallery / static mocks).
Props: location top|center|bottom, height (track length, Figma 1000).
`function ScrollBar({ location = 'top', height = 300, className })`

### CircularButton
Figma: circular-button-molecule (72:9983)
Props: direction left|right|top|bottom (Figma Type = which side of the hub it sits on), children = button label,
hotkey (hotkey-atom text; absent = show-hotkey off), icon (arrow swap; defaults point at the hub), disabled,
state hover|pressed|focus (gallery), plus any <button> attribute.
`function CircularButton({ direction = 'left', children, hotkey, icon, state, className, ...rest })`

### CircularMenu
Figma: circular-button-organism (72:10235)
A radial menu of 2–4 directional actions around a point on a canvas node (more than 4 → use a menu).
Props: actions = [{ direction top|right|bottom|left, label, hotkey (display text, e.g. "⌘1"),
  shortcut (key combo, e.g. "Mod+1"; works while the menu is mounted), onSelect, disabled }],
onSelect(action) (any action), onClose (Escape), hover (force the hover wedge: direction — gallery),
autoFocus (focus the first action). Arrow keys move between actions by direction; Enter/Space activate.
`function CircularMenu({ actions = [], onSelect, onClose, hover, autoFocus, className, style, ...rest })`

### NotificationButton
Figma: icon-button-notification (357:53417). Ghost S bell; hasNew (Figma "Has new notiication?") shows the Error dot.
Props: hasNew, label (default "Notifications"), state (gallery), plus any <button> attribute.
`function NotificationButton({ label = 'Notifications', ...p }) { return <ExtrasDotButton kind="notification" icon="system-notification" type="ghost" label={label} {...p} />; }`

### CommentButton
Figma: icon-button-comment (2563:8153). Tertiary S; hasNew ("Has a new comment?") shows the danger dot.
`function CommentButton({ label = 'Comments', ...p }) { return <ExtrasDotButton kind="comment" icon="system-comment" type="tertiary" label={label} {...p} />; }`

### FilterButton
Figma: icon-button-filter (6955:768). Tertiary S; hasNew = filters applied.
`function FilterButton({ label = 'Filters', ...p }) { return <ExtrasDotButton kind="filter" icon="system-filter" type="tertiary" label={label} {...p} />; }`

### ArrowButton
Figma: icon-button-arrow (6349:61950). Tertiary S arrow-bar-right with the same dot.
`function ArrowButton({ label = 'Open', ...p }) { return <ExtrasDotButton kind="arrow" icon="arrow-bar-right" type="tertiary" label={label} {...p} />; }`

### PhoneField
Figma: mobile-number-field-organism (8947:11306) — text-field shell + country select (single-select-atom S) + divider.
Props: size l|m, label (Title), hint (clue-icon tooltip), description (Hint text), error (true or message), disabled,
placeholder (default from the country mask, Figma "(000)000-0000"), value / defaultValue / onChange(value, { country, digits, e164 }),
country / defaultCountry ("US") / onCountryChange(code), countries ([{ code, name, dial, mask, flag }]),
cooper / generating (Cooper states), state hover|focus|typing (gallery), id, name, plus <input> attributes.
`function PhoneField({ size = 'l', label, hint, description, error, disabled, placeholder, value, defaultValue = '', onChange, country, defaultCountry = 'US', onCountryChange, countries = EXTRAS_COUNTRIES, cooper, generating, state, className, style, id, ...rest })`

### SliderTrack
Figma: slider-molecule (3029:20933) with sliter-atom (3029:21077) thumbs.
Props: type default (zero is the floor) | centered (zero in the middle; fill from 0 toward the value) | range (two thumbs),
min, max, step, value / defaultValue / onChange(value) — a number, or [from, to] for range, disabled,
thumbState hover|drag|focus (gallery), label / labels (aria-label of the thumb(s)), formatValue (aria-valuetext).
`function SliderTrack({ type = 'default', min, max, step = 1, value, defaultValue, onChange, disabled, thumbState, label = 'Value', labels, formatValue, className, style })`

### Slider
Figma: slider-organism (3029:20689) — title (+ clue icon) and Number on top, optional left icon-button + slider-molecule, hint text.
Props: label (Title; absent = show-title off), hint (clue-icon tooltip), description (Hint text), showValue (Number, default true),
formatValue(v) for the Number, icon (show-left-icon: a Ghost S circle icon-button, e.g. "system-star-favourite"), iconLabel, onIconClick,
and every SliderTrack prop (type, min, max, step, value/defaultValue/onChange, disabled, thumbState).
Use <Slider> without label for the bare molecule.
`function Slider({ label, hint, description, showValue = true, formatValue, icon, iconLabel, onIconClick, value, defaultValue, onChange, className, style, ...track })`

### FormCard
Figma: form-card-organism (5826:24755)
A surface that wraps a form: header (title, description, one action) → optional divider → body (fields) → optional footer.
Form rules (Figma canvas notes): every visible field is required (no markers); the primary never disables to signal
"incomplete"; submit validates every field at once, shows errors, focuses (and scrolls to) the first invalid field;
more than three invalid fields adds a summary above the footer.
Props: title, description, action (node, e.g. an IconButton), divider (bool),
fields = [{ name, label, type text|email|password|phone|textarea|select, placeholder, hint, description, options (select),
  defaultValue, validate(value, values) → message | undefined, requiredMessage }],
children (extra body content after the fields), values / defaultValues / onValuesChange(values),
primaryAction = { label } (submit), secondaryAction = { label, onClick }, footer (node replacing the actions),
onSubmit(values, event) — only called when everything is valid, validate(values) → { name: message } (extra form checks),
error (form-level message, e.g. rejected credentials), loading (field skeletons, actions disabled),
submitting (primary spinner, form locked), size of fields (l|m, default l), className, style.
`function FormCard({ title, description, action, divider, fields = [], children, values, defaultValues, onValuesChange, primaryAction = { label: 'Submit' }, secondaryAction, footer, onSubmit, validate, error, loading, submitting, fieldSize = 'l', className, style, ...rest })`

### IconPicker
Figma: icon-picker-organism (5434:16926) = grid of icon-picker-atom (210:77686), single-select. Place it inside IFS.Popover.
Props: icons (icon names; default the Figma curated set), value / defaultValue / onChange(name), columns (default 4),
label (aria-label of the group, default "Choose icon"), bare (no 12px padding), itemState { [name]: hover|focus } (gallery).
Keyboard: one tab stop; arrows move, Home/End, Enter/Space select.
`function IconPicker({ icons = EXTRAS_PICKER_ICONS, value, defaultValue = null, onChange, columns = 4, label = 'Choose icon', bare, itemState, className, style, ...rest })`

### Weekday
Figma: weekday-atom (2704:74414) — the weekday header cell of the calendar (Caption/semibold-UPPER, text/tertiary, 32×16).
Props: children = day text (Figma "day", e.g. "Wed"). Figma's show-badge / timeline props are not wired to any layer.
`function Weekday({ children, className, ...rest })`

### Weekdays
A row of seven weekday-atoms as placed in date-picker-molecule. Props: weekStartsOn (0 = Sunday, 1 = Monday), locale.
`function Weekdays({ weekStartsOn = 1, locale = 'en-US', className, ...rest })`

### Logo
Props: height (default 30; width keeps the 156:30 ratio), label (accessible name, default "IFS Copperleaf"),
color (CSS colour; default var(--icon-primary)).
`function Logo({ height = 30, label = 'IFS Copperleaf', color, className, style, ...rest })`

## forms

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/forms.jsx

### TextField
Figma: text-field-organism (210:77559)
Props: size l|m, label (Figma Title), hint (tooltip text → question-hint icon), placeholder, description (Hint text),
error (true, or a string that replaces the description), disabled, iconLeft / iconRight (icon names),
suffix (Figma textRight), cooper (Figma State=Cooper ring), generating (Cooper Generating: loader),
value / defaultValue / onChange(value, event), state hover|focus|typing (gallery only), plus any <input> attribute.
`function TextField({ size = 'l', label, hint, description, error, disabled, iconLeft, iconRight, suffix, cooper, generating, value, defaultValue = '', onChange, state, className, style, id, type = 'text', ...rest })`

### TextArea
Figma: text-area-organism (3024:9383)
Props: size l (140px tall) | m (100px), label, hint, placeholder, description, error, disabled, iconLeft,
cooper, generating, value / defaultValue / onChange(value, event), state hover|focus|typing (gallery only).
`function TextArea({ size = 'l', label, hint, description, error, disabled, iconLeft, cooper, generating, value, defaultValue = '', onChange, state, className, style, id, ...rest })`

### Search
Figma: search-regular-organism (153:63462)
Props: placeholder (default "Search for..."), value / defaultValue / onChange(value, event), onSearch(value) on Enter,
filter (Figma Filter boolean → filter icon button; onFilter called on click), disabled, state hover|focus (gallery only).
A clear (×) button appears once there is text; Escape also clears.
`function Search({ placeholder = 'Search for...', value, defaultValue = '', onChange, onSearch, filter, onFilter, disabled, state, className, style, ...rest })`

### Checkbox
Figma: checkbox-molecule (153:61241), using checkbox-atom (153:60798)
Props: children = label (omit for the bare 16px atom), checked / defaultChecked / onChange(checked, event),
indeterminate (Figma Type=Indeterminate), disabled, state hover|pressed|focus (gallery only), plus <input> attributes (name, value…).
`function Checkbox({ checked, defaultChecked = false, onChange, indeterminate, disabled, children, state, className, style, ...rest })`

### Radio
Figma: radio-button-molecule (1387:222956), using radio-button-atom (210:113374)
Props: children = label (omit for the bare atom), value, checked, name, disabled, onChange(value, event),
state hover|pressed|focus (gallery only). Usually rendered by RadioGroup.
`function Radio({ value, checked, defaultChecked, name, onChange, disabled, children, state, className, style, ...rest })`

### RadioGroup
Radio group (no separate Figma component; stacks radio-button-molecule rows).
Props: options = [{ value, label, disabled }] or <Radio> children, value / defaultValue / onChange(value, event),
name, disabled, direction vertical|horizontal, label (accessible group name).
`function RadioGroup({ options, children, value, defaultValue, onChange, name, disabled, direction = 'vertical', label, className, style })`

### Switch
Figma: switch-molecule (88:22668), using switch-atom (88:23960)
Props: children = label (omit for the bare atom), description (Figma "Show text"), size m (24px) | s (12px)
("l" accepted: the atom calls 24px "L"), checked / defaultChecked / onChange(checked, event), disabled,
state hover|pressed|focus (gallery only). Renders a <button role="switch">.
`function Switch({ size = 'm', checked, defaultChecked = false, onChange, disabled, children, description, state, className, style, id, ...rest })`

## navigation

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/navigation.jsx

### NavItem
Figma: navigation-panel-atom (1544:2681) — one sidebar row.
Props: type parent|child|submenu, active (Figma State=Active / Selected), disabled, cooper (Figma "Cooper recommended"),
action = { icon, label, onClick } (Figma show-button; Child shows it on hover), expanded (submenu only), state (forced gallery state).
`function NavItem({ type = 'parent', active, disabled, cooper, action, expanded, state, children, className, onClick, ...rest })`

### NavSubtitle
Figma: navigation-panel-atom Type=Subtitle — section heading with optional "+" icon-button.
`function NavSubtitle({ children, action, className })`

### SideNav
Figma: navigation-panel-organism (1545:2808) — the Level-2 sidebar (sidebar-pattern 4482:99996 is this filled in).
Props: title (Figma "Bar name"), items: array of
  { id, label, disabled, cooper, action }                         → Parent row
  { type:'section', label, action, items:[{ id, label, ... }] }   → Subtitle + Child rows
  { type:'submenu', id, label, defaultOpen, items:[...] }          → Submenu toggle + Child rows
value / defaultValue / onSelect(id, item) for the active row; collapsed / defaultCollapsed / onCollapsedChange (View=Collapsed).
`function SideNav({ title, items = [], value, defaultValue, onSelect, collapsed, defaultCollapsed = false, onCollapsedChange, className, ...rest })`

### Tab
Figma: tab (1440:5039). Props: size m|l, selected, disabled, count (Figma show-counter + counter value), state.
`function Tab({ size = 'm', selected, disabled, count, state, children, className, ...rest })`

### Tabs
Figma: tab-organism (3412:32038) — peer views of one page; also the table filter (tabs with counts).
Props: items [{ value, label, count, disabled }], value / defaultValue / onChange(value), size m|l, aria-label.
Arrow keys / Home / End move between tabs (automatic activation).
`function Tabs({ items = [], value, defaultValue, onChange, size = 'm', className, ...rest })`

### Crumb
Figma: breadcrumb-atom (3492:9413). Props: type previous|current|next, icon (Figma show-icon-left, previous only), disabled, state.
`function Crumb({ type = 'previous', icon, disabled, state, children, className, ...rest })`

### Breadcrumb
Figma: breadcrumb-organism (67:4698).
Props: items [{ label, onClick, disabled }], current (index of the current crumb, default last), onSelect(index, item),
back (default true: the first previous crumb carries the ‹ chevron, Figma show-icon-left). Crumbs after `current` render as Type=Next.
`function Breadcrumb({ items = [], current, onSelect, back = true, className, ...rest })`

### Step
Figma: stepper-molecule (1219:169725). Non-interactive.
Props: status completed|in-progress|not-started (Figma State), active (Figma Active=Yes), tooltip (shown on hover, Figma Hover=True), state.
`function Step({ status = 'not-started', active, tooltip, state, children, className })`

### Stepper
Figma: stepper-organism (3029:22750). Shows progress only — steps are not clickable (Figma rule); advance it from a button.
Props: steps [{ label, tooltip }], current (index of the in-progress step; earlier = completed, later = not started),
or give each step its own `status`. active = index of a highlighted step (Figma Active=Yes), optional.
`function Stepper({ steps = [], current = 0, active, className, ...rest })`

### Pager
Figma: pagination-organism (3497:9660) — record pager for item-by-item content. Never for tables (Figma rule).
Props: page (1-based) / defaultPage / onChange(page), total, percent (Figma show-%; omit to hide),
complete (Figma "show left icon": success icon before the count), onShowAll (Figma show-all-button; omit to hide), showAllLabel.
`function Pager({ page, defaultPage = 1, onChange, total = 1, percent, complete, onShowAll, showAllLabel = 'Show all', className, ...rest })`

### CanvasColumn
Figma: canvas-container-atom (1440:5305) — one column heading of the canvas header. Optional action = { icon, label, onClick }.
`function CanvasColumn({ children, action, className, ...rest })`

### CanvasHeader
Figma: canvas-header (1440:5321) — column strip under the page header on map views, plus the zoom ruler.
Props: columns (array of labels) or children (CanvasColumn elements; Figma "columns" slot), ruler (default true).
`function CanvasHeader({ columns, children, ruler = true, className, ...rest })`

### NavBarItem
Figma: nav-bar-page-atom (69:4012) — one stage in the Level-1 bar. Props: active, disabled, state.
`function NavBarItem({ active, disabled, state, children, className, ...rest })`

### NavBar
Stage values: home | value | explore | build | plan | results.
Figma: global-header (69:3736) — the Level-1 bar the pattern screens instance (nav-bar-organism 3412:29453 is the
canvas-documented twin with the same 48px layout). Props: stages [{ value, label, disabled }], value / defaultValue / onChange,
logo (node; defaults to IFS.Logo), onSearch, onSettings, onNotifications, hasNotifications,
user = { initials, name } or avatar (node), actions (node: replaces the default search/settings/bell buttons).
`function NavBar({ stages = DEFAULT_STAGES, value, defaultValue, onChange, logo, onSearch, onSettings, onNotifications, hasNotifications, user, avatar, actions, className, ...rest })`

### PageHeader
Figma: page-header (1588:1971) — Level-3 header at the top of the content area (the instance the Map overview screen uses;
page-header-pattern / header-pattern are near-duplicates). Props: title, id (Figma ID), onBack (Figma "Show button back"),
onTitleMenu (chevron after the title), status (node, e.g. an indicator), views (node, e.g. segmented icon control; a divider precedes it),
actions (node, right side: e.g. Cooper chip, Share, primary button).
`function PageHeader({ title, id, onBack, onTitleMenu, status, views, actions, className, ...rest })`

### AppShell
AppShell — NOT a Figma component. Reproduces the shell of pattern screen "Map - Overview - Default" (4484:116532):
48px NavBar across the top, 240px SideNav below it on the left, then the content column with the PageHeader
(+ optional CanvasHeader) on top and a scrolling content area. Bar, sidebar and header stay put; only content scrolls.
Props: navBar, sideNav, header (nodes), bottom (node, e.g. a bottom sheet), children (content), height (default 100vh).
`function AppShell({ navBar, sideNav, header, bottom, children, height, className, style, ...rest })`

## selection

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/selection.jsx

### Select
Figma: single-select-organism (3273:26820) = single-select-atom (789:18085) + single-select-list-molecule (153:62054)
Props: options (strings or {value,label,icon,disabled}), value/defaultValue/onChange(value, option), open/defaultOpen/onOpenChange,
size s|m|l|xl, label (xl prefix / s text), placeholder, iconLeft, clearable (Figma show-remove-select, default true), loading, error,
disabled, listPosition down|up (Figma "List position"), listTitle (e.g. "Suggested"), listSize s|l, state hover|focus|open (gallery).
`function Select(props) { return <SelectBase {...props} multi={false} />; }`

### MultiSelect
Figma: multiple-select-organism (3273:33904) = multiple-select-atom (3200:7897) + multiple-select-list-molecule (3273:33695)
Same props as Select; value is an array. maxTags (default 5) tags then "+N". Size s shows "N selected". List stays open while picking.
`function MultiSelect(props) { return <SelectBase {...props} multi={true} />; }`

### Combobox
Figma: signle-combobox-organism (3375:5415). Type to filter.
Props: options, value/defaultValue/onChange(value, option), defaultOpen, defaultQuery, size m|l|xl, label, placeholder, iconLeft, clearable, loading, error,
disabled, listPosition, listTitle ("Suggested", shown before typing), resultsTitle ("Results", while typing),
emptyTitle / emptyText / suggestions (Figma "No results" state: heading, hint and suggestion chips that fill the query),
filter(option, query), state. While loading and open, the list shows Figma's "Searching..." panel.
`function Combobox({ options = [], value, defaultValue = null, onChange, defaultOpen = false, defaultQuery = null, size = 'm', label, placeholder = 'Search item', iconLeft, clearable = true, loading, error, disabled, listPosition = 'down', listTitle = 'Suggested', resultsTitle = 'Results', listSize = 's', emptyTitle = 'No results found', emptyText = 'You might be looking for', suggestions = [], state, className, style, id, filter = (o, q) => o.label.toLowerCase().includes(q.toLowerCase()), 'aria-label': ariaLabel, ...rest })`

### SegmentedControl
Figma: segmented-control-organism (1387:244501) built from segmented-control-atom (1387:244511)
Props: options = [{ value, label, iconLeft, iconRight, counter, disabled, state }] (strings allowed), value/defaultValue/onChange,
size m (34) | s (24). Arrow keys move the selection (radio group).
`function SegmentedControl({ options = [], value, defaultValue, onChange, size = 'm', className, ...rest })`

### Chip
Figma: chips (832:235895)
Props: children = label, selected/defaultSelected/onChange(selected) (Figma Select=True|False), iconLeft, iconRight (icon names),
indicator warning|danger|success|info (Figma "Show indicator"), counter (Figma show-counter), onRemove (makes the right icon a
remove control, default system-close; Delete/Backspace also removes), disabled, state hover|pressed|focus.
`function Chip({ children, selected, defaultSelected = false, onChange, iconLeft, iconRight, indicator, counter, onRemove, disabled, state, className, onClick, onKeyDown, ...rest })`

### Calendar
Figma: date-picker-molecule (3406:9510) with date-atom (1440:5201) cells
Props: value/defaultValue/onChange (Date; with range=true {start, end}), month/defaultMonth/onMonthChange (any Date in that month),
today (Date), events ({ 'YYYY-MM-DD': ['danger','warning','info'] }), weekStartsOn (default 1 = Monday), min/max (Dates).
Keyboard: arrows move a day/week, PageUp/PageDown change month, Home/End week start/end, Enter/Space select.
`function Calendar({ value, defaultValue = null, onChange, range = false, month, defaultMonth, onMonthChange, today = new Date(), events = {}, weekStartsOn = 1, min, max, autoFocus, className, ...rest })`

### DatePicker
DatePicker = select trigger (single-select-atom look) + Calendar popup (date-picker-molecule 3406:9510).
Props: value/defaultValue/onChange (Date or {start,end} with range), open/defaultOpen/onOpenChange, size s|m|l|xl, label, placeholder,
format(date) → string, range, clearable, error, disabled, listPosition down|up, state, plus Calendar props (today, events, min, max).
`function DatePicker({ value, defaultValue = null, onChange, open, defaultOpen = false, onOpenChange, size = 'm', label, placeholder = 'Select date', format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), range = false, clearable = true, error, disabled, listPosition = 'down', state, today, events, min, max, className, style, id, 'aria-label': ariaLabel, ...rest })`

## states

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/states.jsx

### EmptyState
Figma: empty-state-organism (3782:18464)
Figma has no cause/size variants (one placeholder axis "Size=Frame 2147228119" + six booleans); the canvas notes define
the causes and two sizes, so they are props here. Each cause sets the defaults Figma draws for it; any part can be overridden.
Props: cause first-run|empty-container|all-done|error|no-access|no-results-similar|no-results (notes' "When" column),
size section|full (Section = inside a card/panel, hugs; Full = page/main region, fills and centres),
heading (required), body, icon (media icon name; null hides media = show-media-icon), tone neutral|success|warning,
suggestions (array of labels → chips = show-suggestion-chips), onSuggestion(label),
primaryAction / secondaryAction = { label, icon, onClick, type } (show-primary-button / show-tertiary-button; secondary is Tertiary).
`function EmptyState({ cause = 'first-run', size = 'section', heading, body, icon, tone, suggestions, onSuggestion, primaryAction, secondaryAction, className, ...rest })`

### Spinner
Figma: empty-state-spinner-molecule (3782:24081)
Indeterminate or shapeless wait where no layout can be previewed. Props: text (Figma "Loading..."), showText (show-text).
`function Spinner({ text = 'Loading...', showText = true, className, ...rest })`

### LoadingMore
Figma: empty-state-loading-more-molecule (3782:24082) — appending items to a list that is already visible.
`function LoadingMore({ children = 'Loading more…', className, ...rest })`

### ProgressLoading
Figma: progress-bar-loading (5530:11867) = progress-bar-molecule + percentage. Measurable work (uploads, steps).
Props: value 0–100, label (accessible name).
`function ProgressLoading({ value = 0, label = 'Loading', className, ...rest })`

### Skeleton
Skeleton block — not a Figma component. Content States › Skeleton defines skeletons as blank shapes built inside the
component that owns the async data (stat card, content card, table cells already have Figma Loading variants: use those).
Use this only to compose a skeleton for an owning component that has no Loading variant.
Props: width, height, shape bar|circle|block. Always aria-hidden, never focusable, never contains text.
`function Skeleton({ width = '100%', height = 16, shape = 'bar', className, style })`

### LoadingRegion
Loading wrapper for the component that owns async data (Skeleton notes, rules 7–9).
Props: loading, skeleton (node shown while loading — a Loading variant or Skeleton blocks; omit for an unknown shape → Spinner),
delay (ms before the skeleton shows; fast loads never flash, default 300), minDuration (ms it stays once shown, default 300),
label (announced "Loading <label>" / "Loaded"), children = loaded content (or the empty state — decided by the caller after loading).
`function LoadingRegion({ loading, skeleton, delay = 300, minDuration = 300, label = '', children, className, ...rest })`

### FtaButton
Figma: FTA button (67:4758) — the Cooper FAB.
Props: stroke (Figma Stroke: true = 48px glass ring for non-black surfaces; false = bare 32px sphere for black footers/bottom sheets),
indicator (Show indicator), label (tooltip + accessible name, Figma tooltip "{label}" with hotkey "/"), hotkey, state hover|pressed|focus (gallery),
disabled, onClick. The FAB hides while Cooper chat is open (one entry point).
`function FtaButton({ stroke = true, indicator = true, label = 'Cooper', hotkey = '/', tooltip = true, state, className, ...rest })`

### PromptButton
Figma: prompt-button (67:2937) — quick Cooper prompt next to the FAB.
Props: size l|m, children = Prompt label, state hover|pressed|focus (gallery), disabled, onClick.
`function PromptButton({ size = 'm', state, children, className, ...rest })`

### CooperChip
Figma: cooper-chip-atom (3501:23480) — in-context marker where Cooper has a recommendation; click opens it.
Props: children (default "1 Recommendation"), selected/defaultSelected/onChange (Figma State=Selected while its recommendation is open),
disabled, state hover|focus (gallery), onClick.
`function CooperChip({ children = '1 Recommendation', selected, defaultSelected = false, onChange, state, className, onClick, ...rest })`

### ZoomSlider
zoom-slider-atom (3275:483), used in the Explore bottom sheet. value 0–100 (Figma "%"), keyboard ←/→.
`function ZoomSlider({ value, defaultValue = 20, onChange, label = 'Zoom', className })`

### BottomSheet
Figma: base-bottom-sheet-organism (4406:25590), value-bottom-sheet-organism (789:37502), explore-bottom-sheet (72:4676)
The Cooper entry point at the bottom of the content area, 40px tall, full width. Place it in AppShell's `bottom` slot.
Props (all types): type base|value|explore (base = any tab; value = Value tab; explore = Explore tab),
prompts (labels → PromptButton M; Figma shows two), onPrompt(label), showPrompts (default true), showCooper (show-cooper, default true),
onCooper (FAB click), cooperIndicator (FAB Show indicator; Figma sheets turn it off).
type="value": inProgress (Figma In progress: shows the coverage bar), coverage 0–100, cooperContext (cooper-context, default true),
  documents = { label, icon, onClick } (show-documents-button, tertiary M), onUpload (show-upload-button; omit on an Active framework = read-only).
type="explore": fields [{ key, label, options, value, zoom }], values/onFieldChange(key, value), zoom/onZoomChange, lastSync,
  tools [{ icon, label, onClick }] (ghost S icon buttons). `left` replaces the whole left side for any type.
`function BottomSheet({ type = 'base', prompts = [], onPrompt, showPrompts = true, showCooper = true, onCooper, cooperIndicator = false, inProgress = false, coverage = 0, cooperContext = true, documents, onUpload, fields = DEFAULT_MAP_FIELDS, values, onFieldChange, zoom, defaultZoom = 20, onZoomChange, lastSync = '{label}', tools = DEFAULT_MAP_TOOLS, left, className, ...rest })`

## surfaces

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/surfaces.jsx

### Tooltip
Figma: tooltip-organism (67:6151)
Props: content (Figma Label / Content slot), hotkey (hotkey-atom text, e.g. "⌘/"; absent = show-hotkey off),
color black|grey ("grey (for black bg)"), type bottom|top|left|right = side the ARROW is on
(bottom → bubble sits above the trigger, the default), arrow left|center|right (top/bottom only).
Wraps one trigger child; shows on hover (400ms delay) and focus, hides instantly, Esc dismisses.
open/onOpenChange to control. `inline` renders the bubble alone (gallery).
`function Tooltip({ content, hotkey, color = 'black', type = 'bottom', arrow = 'center', delay = 400, open, defaultOpen, onOpenChange, inline, children, className })`

### Alert
Figma: alert-organism (1440:5440)
Props: type error|warning|success, title, children = Body text, showIcon (Figma show-icon, default off),
action = button label (Primary S; absent = show-button off), onAction, onClose (shows the close
icon-button; Figma show-close-icon), closable=false to hide it.
`function Alert({ type = 'error', title, children, showIcon = false, action, onAction, onClose, closable = true, className, ...rest })`

### Snackbar
Figma: snackbar-organism (3795:29459)
Props: title, children = description (Content slot), secondaryAction / primaryAction = { label, onClick }
(Secondary S + Primary S), onClose (close icon-button; showClose=false hides it).
Use IFS.toast({...same props, duration}) to show one top-right that auto-dismisses.
`function Snackbar({ title, children, secondaryAction, primaryAction, onClose, showClose = true, className, ...rest })`

### toast
toast({ title, description, primaryAction, secondaryAction, duration }) → id. toast.dismiss(id).
`function surfToast(opts)`

### useSnackbar
Hook form: const show = useSnackbar(); show({ title: 'Saved' })
`function useSnackbar() { return surfToast; }`

### Overlay
Figma: overlay-background (338:21403)
Props: type strong (overlay/screen-strong + blur/medium) | base (no blur), onClick, inline (absolute, not fixed).
`function Overlay({ type = 'strong', inline, className, ...rest })`

### Modal
Figma: modal-organism (4169:208596)
Props: open / defaultOpen / onOpenChange, title (Header Slot), children (Content slot),
secondaryAction / primaryAction = { label, onClick } (Tertiary L + Primary L, split footer),
footer (custom footer node, replaces the two buttons), dismissible=false hides ✕ and blocks Esc/overlay close,
overlay strong|base|none, width, inline (renders the card in place without overlay — gallery).
`function Modal({ open, defaultOpen, onOpenChange, title, children, secondaryAction, primaryAction, footer, dismissible = true, overlay = 'strong', width, inline, className, style })`

### Drawer
Figma: drawer-organism (4394:21241)
Props: open / defaultOpen / onOpenChange, title (Header slot), expanded / defaultExpanded=true / onExpandedChange
(Figma Expanded; False = header only), collapsible (show the diagonal collapse/expand button),
showClose (show-button-close), tabs (node, show-tabs), subtitle + segmented (node, show-subtitle /
show-segmented-control), children (Content slot), side right|left, overlay none|strong|base,
height, inline (renders in place — gallery). Esc closes.
`function Drawer({ open, defaultOpen, onOpenChange, title, expanded, defaultExpanded = true, onExpandedChange, collapsible = true, showClose = true, tabs, subtitle, segmented, children, side = 'right', overlay = 'none', height, inline, className, style })`

### Panel
Figma: panel-organism (4305:365421)
Props: title, expanded / defaultExpanded=true / onExpandedChange (Figma Expanded: 380px ↔ 84px rail),
showEvidence (show-evidence-chain, circle Tertiary S icon-button), onEvidence, full (fills the content area),
children (Content slot). Lives in the page layout: no scrim, no focus trap.
`function Panel({ title, expanded, defaultExpanded = true, onExpandedChange, showEvidence = true, onEvidence, full, children, className, style })`

### Popover
Figma: popover-organism (4394:56471)
Props: trigger (element; click toggles), open / defaultOpen / onOpenChange, align start|end,
title (Title slot; absent = show-title off), count (counter-atom), showClose,
search (show-search: true or placeholder string), onSearch(value), onFilter (show-filter: Secondary M icon-button),
children (Content slot), width, inline (renders the card alone — gallery). Esc / outside click / ✕ close.
`function Popover({ trigger, open, defaultOpen, onOpenChange, align = 'start', title, count, showClose = true, search, onSearch, onFilter, children, width, inline, className, style })`

### FloatingBar
Figma: floating-bar-organism (7405:22521)
Props: category (type label, e.g. "Folder"), categoryIcon (default "chat-folder"), item (name or "3 items selected"),
badge (node next to the item, e.g. an indicator), secondaryAction / primaryAction = { label, onClick }
(Tertiary M + Primary M) or actions (node), onClose (✕ and Escape — clears the selection),
open (default true), inline (in place instead of fixed top-centre — gallery).
`function FloatingBar({ category, categoryIcon = 'chat-folder', item, badge, secondaryAction, primaryAction, actions, onClose, open = true, inline, className, style })`

