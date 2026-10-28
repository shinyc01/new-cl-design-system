# IFS DS kit — component API

Kit version 0.1.0, generated 2026-10-28. Everything is available as `IFS.<Name>` in a prototype. Each entry has a **Tier**: *Component* = a published IFS DS Figma component (build screens from these); *Pattern helper* = a working composition that implements a pattern's rules, not a Figma component (allowed, but name it as a pattern helper in the plan). Example screens are not in this list — see the Examples in Storybook.
Each entry is the comment above the component in source (Figma name/node and props). For real usage of every variant,
read the family's examples file (linked per family). `IFS.Icon({ name, size: 12|16|24, variant })` takes Figma icon names — see icons.txt.

## core

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/button.jsx

### Icon
**Tier:** Component
Figma: Icons page (1399:9134). `name` is the Figma icon set name, `size` one of 12 | 16 | 24.
Figma draws every size from its own artwork, so pick the nearest exported size rather than scaling.
A few sets (cooper-*-icon, voice-input-animation) vary by state instead of size: pass `variant`.
`function Icon({ name, size = 16, variant, className, style, title })`

## activity

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/activity.jsx

### TimelineMarker
**Tier:** Component
Figma: marker-atom (3713:12836)
Props: size s (24) | m (32), children = slot content (an icon, an Avatar, a status icon). Default slot = the caret (Figma: arrow-caret-down-filled, drawn rotated to point right).
`function TimelineMarker({ size = 's', children, className, ...rest })`

### TimelineConnector
**Tier:** Component
Figma: connector-atom (3713:12835)
Props: type solid|dash. Fills the height of its parent column.
`function TimelineConnector({ type = 'solid', className, ...rest })`

### TimelineItem
**Tier:** Component
Figma: activity-organism (3713:13396) — "The timeline base". One entry = marker + connector + Content slot.
Props: marker = node for the marker slot (overrides avatar/icon), avatar = Avatar props (S 24 in the marker),
icon = icon name in the marker, markerSize s|m, connector solid|dash|none (none = last entry),
title (name, Heading/H3), badge = label text or Badge props (badge-atom White M), subtitle (role line),
time (right column), children = body text (Body/M regular, secondary), content = node that replaces the whole default
content (the Figma "Content slot"), aside = node replacing the right column.
`function TimelineItem({ marker, avatar, icon, markerSize = 's', connector = 'solid', title, badge, subtitle, time, children, content, aside, className, ...rest })`

### Timeline
**Tier:** Component
Timeline = a list of activity-organism entries (Figma "in use example"). The last entry drops its connector.
Props: items = TimelineItem props[] (each may carry `key`), or children = <TimelineItem>s; connector solid|dash for all entries.
`function Timeline({ items, connector = 'solid', children, className, ...rest })`

### ApprovalCard
**Tier:** Component
One approver card (the Content slot). Props: state awaiting|success|rejected|empty|disabled|setting, name, position,
avatar = Avatar props, date (show-date), comment (show-comment), actions = { secondary, primary } labels or false (show-buttons),
onPrimary / onSecondary, setting-only: role / roles / onRoleChange (dropdown-item), brief (show-brief; Cooper brief text),
onExpand. Disabled = outlined card (no fill); Figma keeps its buttons in their default look.
`function ApprovalCard({ state = 'awaiting', name, position, avatar, date, comment, actions, onPrimary, onSecondary, role, roles, onRoleChange, brief, onExpand, className, ...rest })`

### ApprovalChain
**Tier:** Component
Figma: approval-chain-timeline (1440:6174) — legacy; rebuilt as a configuration of the timeline base (activity-organism 3713:13396).
Props: steps = [{ key, state, name, position, avatar, date, comment, actions, role, roles, brief }], defaultSteps,
onChange(steps) — clicking Approve / Reject on an awaiting step really moves it to success / rejected.
onApprove(step, index) / onReject(step, index) also fire.
`function ApprovalChain({ steps, defaultSteps = [], onChange, onApprove, onReject, className, ...rest })`

### VersionEntry
**Tier:** Component
One version entry. Props: title (e.g. "Version 3"), badge (show-badge; label or Badge props, e.g. "Current"), description,
author = { name, avatar }, time, activity = TimelineItem props[] (shown when expanded), expanded / defaultExpanded / onExpandedChange,
onOpen (click the card or the name: open that version), menu (node in the top-right slot, e.g. an ActionMenu ⋮; default ⋯ =
onMenu, or Rename when absent).
Rename: renaming / defaultRenaming / onRenamingChange (controlled or not; double-click on the title also starts it),
renameValue / onRenameChange(value) (the draft; resets to the title when renaming starts), onRenameSubmit(value) (Enter / ✓;
return false to stay in rename, e.g. a duplicate name), renameError (message: red field, ✓ disabled with the message as tooltip),
onRenameCancel (Esc / ✕), onRename(value) (fires after a successful submit). state hover|rename (gallery).
`function VersionEntry({ title, badge, description, author, time, activity, expanded, defaultExpanded = false, onExpandedChange, onOpen, menu, onMenu, renaming, defaultRenaming = false, onRenamingChange, renameValue, onRenameChange, onRenameSubmit, renameError, onRenameCancel, onRename, state, last, className, ...rest })`

### VersionHistory
**Tier:** Component
Figma: version-history-timeline (2277:5299) — legacy; rebuilt as a configuration of the timeline base.
Props: versions = VersionEntry props[] (each may carry `key`); onRename(index, title). Uncontrolled titles update on rename.
`function VersionHistory({ versions = [], onRename, className, ...rest })`

### Comment
**Tier:** Component
Figma: comment-content-card (260:86722) — one reply. Variants State=Default|Hover, Tagged user=False|True.
Props: name, time (time ago), avatar = Avatar props, you (adds "(you)"), children = text (string: @mentions render as
tagged-user badges), mentions = names to match exactly, menuItems (⋯ menu shown on hover/focus — e.g. Edit / Delete on your
own reply; ActionMenu items), onMenu (plain ⋯ button instead of a menu), state hover (gallery).
`function Comment({ name, time, avatar, you, children, mentions, onMenu, menuItems, state, className, ...rest })`

### CommentComposer
**Tier:** Component
Figma: comment-input-atom (2290:15642) + comment-input-molecule (1660:10933, when `avatar` is passed).
Props: mode text|voice|cooper (value/defaultMode/onModeChange — switching never clears the draft), value / defaultValue /
onChange(text), onSubmit(text) (Enter or send; clears the draft), placeholder (defaults per mode: "Add a comment" /
"Say a comment" / "Working on your comment…" while generating), generating (Cooper drafting → send becomes stop),
onStop, avatar = Avatar props of the current user (molecule), disabled, autoFocus, state (gallery: multi).
@-mentions: mentionables = [{ name, role, avatar }] turns on the picker — typing "@" + letters lists the matching people
below the field (↑/↓ move, Enter/Tab pick, Esc drops the "@…"); picking inserts "@Name " and calls onMention(person).
renderMentionMenu({ people, query, activeIndex, onPick, onActiveChange }) replaces the default list (e.g. IFS.CommentMentionMenu).
Single line = pill; grows to Multi line (12px radius, buttons below) when the text wraps. It returns to one line only when the
text fits the single-line width with an 8px margin (measured off-layout), so a draft right at the wrap width can't flip-flop.
`function CommentComposer({ mode, defaultMode = 'text', onModeChange, value, defaultValue = '', onChange, onSubmit, placeholder, generating, onStop, avatar, disabled, autoFocus, state, mentionables, onMention, renderMentionMenu, className, style, ...rest })`

### CommentThread
**Tier:** Component
Figma: comment-popover-organism (260:88500) — the full thread. Variants Type=Default | Cooper suggestion | Edit.
Props: number (thread ID shown after "Comment", e.g. "#55"), comments / defaultComments / onCommentsChange
([{ id, name, time, text, avatar, you, mentions }]), currentUser = { name, avatar } (composer avatar + author of new replies),
resolved / defaultResolved / onResolvedChange, onClose (✕), cooperSuggestion = { label, onClick } (Type=Cooper suggestion),
onCopyLink (⋯ → Copy link; default copies the page URL), menuItems (extra ⋯ items), onMenu (plain ⋯ button instead of the menu),
mentionables / onMention / renderMentionMenu (composer @-picker; posted replies get `mentions` from mentionables),
composerProps (passed to CommentComposer), editingId (gallery: opens the editor on that reply).
Unresolved: header ⋯ (Copy link) + ✓ Resolve + ✕. Resolved (Patterns 12:44840): ⋯ (Unresolve, Copy link) + ✕, every author
avatar Inactive; text is not dimmed and the composer stays.
Your own reply's ⋯ = Edit / Delete (12:46616). Edit → inline editor with Cancel / Send (12:47187). Delete → modal
"Delete this comment?" (12:47578) → snackbar "Comment deleted" with Undo (Patterns "Comment deleted").
`function CommentThread({ number = '#00', comments, defaultComments = [], onCommentsChange, currentUser = { name: 'You' }, resolved, defaultResolved = false, onResolvedChange, onClose, onMenu, menuItems, onCopyLink, mentionables, onMention, renderMentionMenu, cooperSuggestion, composerProps, editingId, className, style, ...rest })`

### UserCard
**Tier:** Component
Figma: user-card (1440:5059) — legacy (guide: "can be content-card-organism").
Props: type assigned|owner, name, position, avatar = Avatar props (default Black M), badge (label, default "Owner"),
date (owner: under the badge), checked (show-checkmark-icon), onEdit (assigned: edit icon-button), draggable (assigned drag handle),
loading, state hover|drag|focus (gallery), onClick.
`function UserCard({ type = 'assigned', name, position, avatar, badge = 'Owner', date, checked, onEdit, loading, state, onClick, className, ...rest })`

### Collaborator
**Tier:** Component
Figma: collaborator (1440:6097) — legacy (guide: "can be content-card-organism").
Props: type joined|awaiting|recommended, name, position, avatar = Avatar props (default: Green joined, Awaiting, Black recommended),
role / defaultRole / roles / onRoleChange (dropdown-item; joined + awaiting), iconButton = { icon, label, onClick } (show-icon-button),
onAdd (recommended: "+" shown on hover/focus), loading, state hover|focus (gallery).
`function Collaborator({ type = 'joined', name, position, avatar, role, defaultRole, roles, onRoleChange, iconButton, onAdd, loading, state, className, ...rest })`

### FileCard
**Tier:** Component
Figma: file-card (1440:5465) — legacy ("Documents"; guide: "can be content-card-organism").
Props: name (long names truncate in the middle, full name as tooltip), date, error (State=error: red tile + delete / retry),
loading, onDownload (shown on hover/focus), onDelete, onRetry, onClick (open), actions (node replacing the right-hand buttons,
e.g. a ⋮ ActionMenu or Tooltip-wrapped icon-buttons; shown on hover/focus, always on error), active (keeps the hover look and
the actions visible, e.g. while its menu is open), state hover (gallery).
`function FileCard({ name, date, error, loading, onDownload, onDelete, onRetry, onClick, actions, active, state, className, ...rest })`

### VersionCard
**Tier:** Component
Figma: version-card (2104:4022) — legacy (guide: "can be content-card-organism").
Props: label (caption, default "Ready to publish"), items = [{ name, type (indicator colour, default orange), meta }] (the List slot),
secondaryAction / primaryAction = Button props incl. children (default "Schedule" / "Publish"), loading, state hover (gallery).
`function VersionCard({ label = 'Ready to publish', items = [], secondaryAction = { children: 'Schedule' }, primaryAction = { children: 'Publish' }, loading, state, className, ...rest })`

### 
**Tier:** Component
Controlled/uncontrolled value helper.
`function useActValue(value, defaultValue, onChange)`

## button

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/button.jsx

### Button
**Tier:** Component
Figma: button (65:3211)
Props: type primary|secondary|tertiary|ghost|cooper (Figma "Accent (Cooper)"), size l|m|s,
iconLeft / iconRight = icon names (Figma show-icon-* + Icon swap), children = Button label.
Leave out children for Figma show-label=false.
`function Button({ type = 'secondary', size = 'm', iconLeft, iconRight, children, state, className, ...rest })`

### IconButton
**Tier:** Component
Figma: icon-button (71:4250)
Props: icon (required), type ghost|primary|secondary|tertiary, size l|m|s, shape square|circle.
Always pass a `label` — it becomes the accessible name and tooltip.
`function IconButton({ icon, label, type = 'ghost', size = 'm', shape = 'square', state, className, ...rest })`

## canvas

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/canvas.jsx

### ValueMapButton
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: value-map-button (2590:20612)
Floating vertical overlay on the Value Framework canvas. Fit = view action (zoom to show all);
Expand all / Collapse all = structure actions on the whole tree.
Props: type shape|input (Figma Type=Shape: Collapse + Expand + Fit; Type=Input: Fit only),
selected fit|expand|collapse (Figma Selected; the last applied action shows pressed), defaultSelected,
onSelect(action), onFit, onExpand, onCollapse.
`function ValueMapButton({ type = 'shape', selected, defaultSelected, onSelect, onFit, onExpand, onCollapse, className, ...rest })`

### MapToolbar
**Tier:** Component
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
**Tier:** Component
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
**Tier:** Component
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
**Tier:** Component
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
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: node-button (1851:191153)
Contextual menu shown on hover over a framework node; the action depends on the node
(collapsed → Expand, expanded → Collapse). Acts on that node only — not for global toolbar actions.
Props: type expand|collapse|isolate-path|submodel (Figma Type; Submodel = Isolate path + Open formula),
actions = [{ id, icon, label }] to override the preset, onAction(id).
`function NodeHoverActions({ type = 'expand', actions, onAction, className, ...rest })`

### AddNodeButton
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: add-node-button (2879:7311)
Creates a new (grey, provisional) subnode on the framework canvas; confirmed via its check icon.
Click → typing state (Figma Pressed/Typing): Enter or ✓ confirms, Esc or ✕ cancels.
Props: onAdd(name), onCancel, placeholder ("Type..."), disabled, editing / defaultEditing / onEditingChange,
state hover|pressed|typing (forced, gallery), label (accessible name, default "Add node").
`function AddNodeButton({ onAdd, onCancel, placeholder = 'Type...', disabled, editing, defaultEditing = false, onEditingChange, state, label = 'Add node', defaultValue = '', className, ...rest })`

### NodeCard
**Tier:** Component
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
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: sidebar-node-card (2667:6608) — a node in a side list, dragged onto the canvas.
Figma marks it legacy ("can be content-card-organism"); kept because the canvas drag flow uses it.
Props: title, description, cooper (Cooper ring), dragData (string put on dataTransfer as text/plain),
onDragStart/onDragEnd, state hover|drag|focus|cooper-hover|cooper-drag (forced, gallery).
`function SidebarNodeCard({ title = '{card-title}', description, cooper, dragData, state, onDragStart, onDragEnd, className, ...rest })`

### MapPin
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: map-pin-teardrop (43:2020), Patterns › Map. Default location marker for one asset on an exact spot.
(Other pin sets on the page — map-pin-dot/-square/-pole/-defect/-flow — are not built here.)
Props: status neutral|error|warning, icon = asset icon name (Figma Asset icon=Yes; absent = white dot),
selected / defaultSelected / onSelectedChange (Figma Selected), dimmed (Figma Out of hover), opened (Figma Opened),
label (accessible name), state selected|opened|out-of-hover (forced, gallery).
`function MapPin({ status = 'neutral', icon, selected, defaultSelected = false, onSelectedChange, dimmed, opened, label = 'Asset', state, className, ...rest })`

### CanvasBackground
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: canvas-background (1395:196712), Surfaces.
"The infinite, pannable, zoomable ground plane for map-first and node-graph views" — not for document-flow pages.
Props: image (url; Figma State=Image — a map), view {x, y, zoom} / defaultView / onViewChange (drag to pan,
ctrl/⌘ + wheel or pinch to zoom, plain wheel pans), minZoom, maxZoom, children = world content (absolute-positioned
in world px), overlay = fixed UI on top (toolbars, mini-map), apiRef receives { setView, fit(bounds) }.
`function CanvasBackground({ image, view, defaultView = { x: 0, y: 0, zoom: 1 }, onViewChange, minZoom = 0.25, maxZoom = 2, children, overlay, apiRef, className, style, ...rest })`

### CanvasConnector
**Tier:** Component
Connector between two canvas nodes (world coordinates). Not a Figma component of its own: the framework
screens draw node links as plain hairlines (border/medium) — a horizontal-tangent curve between two points.
Props: from {x,y}, to {x,y}, highlighted (border/strong).
`function CanvasConnector({ from, to, highlighted })`

### DropZone
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: move-and-drop-background (4509:30446), Surfaces.
Dashboard edit mode: the dashed drop zone marking where a dragged widget will land.
Props: text (Figma bool `text`: shows "+ Drop here to place"), children = custom label, onDrop(data, event),
active (forced highlight). It accepts HTML5 drops and exposes data-over while something is dragged over it.
`function DropZone({ text = false, children, onDrop, active, className, ...rest })`

### SankeyNode
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: sankey-atom (1853:12325) — one Sankey node: connector stub + card.
Props: type default|measure, label, from, to (values, e.g. "$1.24B" → "$1.27B"; leave `to` out for a single value),
change (e.g. "4.5%"; Figma compare-data, shown on hover), changeDirection down|up, disabled, state hover (gallery),
accent = colour of the left accent bar used by the organism (css colour / var).
`function SankeyNode({ type = 'default', label, from, to, change, changeDirection = 'down', disabled, state, accent, className, style, ...rest })`

### SankeyHeader
**Tier:** Component
Figma: sankey-header (2698:64494) — column summary box ("MEAS. Q1 2025 29 → Q4 2026 24").
Props: abbr ("MEAS."), fromLabel, toLabel, from, to.
`function SankeyHeader({ abbr, fromLabel, toLabel, from, to, className, ...rest })`

### Sankey
**Tier:** Component
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
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: timiline-phase-molecule (3967:1765) — one phase row of the Gantt (+ its task list when expanded).
Props: title (Figma Title), subtitle ("Internal"), badge = red badge text (Figma Badge=True, e.g. "6 weeks behind"),
color teal|muted-purple|steel-blue|rose|… (data-viz family, data-4), start / end (fractional slot indexes on the axis),
tasks = [{ title, label ("Q1 2027"), start, end }], expanded / defaultExpanded / onExpandedChange,
onAdd, onMore (hover actions), slots (number of axis slots, set by the chart), state hover (gallery).
`function TimelinePhase({ title, subtitle, badge, color = 'teal', start = 0, end = 1, tasks = [], expanded, defaultExpanded = false, onExpandedChange, onAdd, onMore, slots = 20, groups = 5, state, className, ...rest })`

### TimelineChart
**Tier:** Component
Figma: timeline-chart-organism (3967:38286) — "use this". Gantt: phases on a time axis (e.g. investment phases
across a 5-year plan); shows sequential vs parallel work.
Props: groups = [{ label: '2027', slots: ['Q1','Q2','Q3','Q4'] }] (the axis), phases = TimelinePhase props[] (+ id),
title ("Phase"), onAddPhase (shows the header + on hover, Figma State=Hover), slot positions are global indexes
across all groups (Q1 2027 = 0, Q2 2027 = 1, … ).
`function TimelineChart({ groups = [], phases = [], title = 'Phase', onAddPhase, state, className, ...rest })`

## charts

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/charts.jsx

### DataVizBar
**Tier:** Component
Figma: bar-atom (4457:32996)
Props: state default|hover|out-of-focus|background|loading, color = data-viz group (default rose), step (default 4;
hover = step-1, out-of-focus = 9), children = the value label (show-value; absent = hidden). Fills its parent.
`function DataVizBar({ state = 'default', color = 'rose', step = 4, children, className, style, ...rest })`

### DataVizGroupedBar
**Tier:** Component
Figma: grouped-bar-molecule (4457:37362)
Props: type horizontal (segments stacked top→bottom) | vertical (segments side by side), progress (meter: value against max on a
neutral track), values = numbers (segment sizes; one group, steps 4,5,6,… of `color`), value + max (progress), showValues.
`function DataVizGroupedBar({ type = 'horizontal', progress = false, values = [], value = 0, max = 100, color = 'rose', showValues, format = defaultFormat, className, style, ...rest })`

### DataVizLine
**Tier:** Component
Figma: line-atom (4440:32650)
Props: dashed (3/5 dash — planned, median, reference), orientation horizontal|vertical. Fills its parent's width (or height).
`function DataVizLine({ dashed = false, orientation = 'horizontal', className, ...rest })`

### DataVizIndicator
**Tier:** Component
Figma: indicator-atom (4440:32643)
Props: type default (8px data point) | selected (point + white ring) | intended-target (2×16 target tick), color = data-viz group or CSS colour.
`function DataVizIndicator({ type = 'default', color = 'rose', className, style, ...rest })`

### ValueLabel
**Tier:** Component
Figma: value-label-atom (4440:32611)
Props: state primary|secondary|tertiary|empty|loading, children = the value text (Label/M/medium).
`function ValueLabel({ state = 'primary', children, className, ...rest })`

### LegendSwatch
**Tier:** Component
Figma: legend-swatch-atom (4440:32628)
Props: state default|hover|out-of-hover|intended-target, color = data-viz group or CSS colour, label, value (show-value),
step (group step, default 4; charts use 3), swatchOpacity (for opacity-coded ramps). Hover only — legend entries are not clickable (Figma).
`function LegendSwatch({ state = 'default', color = 'rose', step = 4, label, value, swatchOpacity, className, ...rest })`

### DataVizHeader
**Tier:** Component
Figma: data-viz-header-molecule (2154:2068)
Props: title, state default|hover (forced; real hover/focus of the header or its card also shows the hover row),
Right element: segments = SegmentedControl options (size S) with segmentValue/defaultSegmentValue/onSegmentChange,
or button = { label, onClick, iconRight } (Tertiary S). Hover row: drag handle (draggable), and ghost icon-buttons
for onEdit / onDelete / onMore. hoverActions = custom hover-only node, slot = always-visible right node (Figma "Slot").
`function DataVizHeader({ title, state, segments, segmentValue, defaultSegmentValue, onSegmentChange, button, onEdit, onDelete, onMore, draggable = true, hoverActions, slot, className, ...rest })`

### DataVizCard
**Tier:** Component
Figma: data-viz-card-organism (4457:33030)
Props: state default|hover|drag|cooper, title, header = extra DataVizHeader props, children = Content slot, legend (node, below content).
variant="chart" is the frame every core chart (chart-column … chart-funnel) is drawn in: 6px padding, header with the Cooper
button (onCooper) and, on hover, drag handle + "Edit with Cooper" (onEditWithCooper; false hides it) + the view-as-table toggle.
actions = extra header node (e.g. a ⋮ menu IconButton), shown in the hover row after "Edit with Cooper" (chart) or after the
header's own hover icons (organism). bare = no frame: no padding, fill, border or header — just the content and legend, for
a chart placed inside another frame that already draws the header (e.g. a dashboard widget).
`function DataVizCard({ variant = 'organism', state, title, header, legend, children, onCooper, onEditWithCooper, tableView, onToggleTable, actions, bare, className, ...rest })`

### DataVizTooltip
**Tier:** Component
Figma: data-viz-modal-organism (4440:32681) and the chart-info-modal tooltip used by every core chart.
Props: title, subtitle (Category line above the title → organism layout, value right of the title),
value (chart layout: second line), delta = { text, direction up|down, tone positive|negative }, items = [{ label, value, color }],
showValue (Figma show-value), variant chart (320 wide) | modal (256). children are appended under the items.
`function DataVizTooltip({ title, subtitle, value, delta, items = [], showValue = true, variant = 'modal', children, className, ...rest })`

### ColumnChart
**Tier:** Component
Figma: chart-column (9862:12468) — one measure across few or time-ordered categories; zero-based, one hue.
Props: data = [{ label, value, reference?, delta?, details? }], valueLabel (legend + table), referenceLabel (white peer-median tick),
color (data-viz group, default muted-purple), format(v) for values/axis, tooltip(datum, i) → DataVizTooltip props.
Shell props (every chart): title, state default|hover|cooper|empty|loading, view chart|table / defaultView / onViewChange,
onCooper, onEditWithCooper, emptyTitle, emptyText, height (default 328), className, style.
`function ColumnChart(props)`

### HistogramChart
**Tier:** Component
Figma: chart-histogram (9864:14012) — distribution of one measure across bins (contiguous zero-based columns).
Props: values = raw numbers + bins (count, default 10) or binWidth — or data = pre-binned [{ label, value }];
binFormat(lo, hi) for bin labels, valueLabel (default 'Count'), + ColumnChart props.
`function HistogramChart({ values, bins = 10, binWidth, binFormat, data, valueLabel = 'Count', ...props })`

### BarChart
**Tier:** Component
Figma: chart-bar (9862:12961) — horizontal bars for many categories, long labels or rankings (sort biggest → smallest).
Props: as ColumnChart + sort (true = biggest first), labelWidth (category column, default 96). Values are labelled at the bar end.
`function BarChart(props)`

### GroupedColumnChart
**Tier:** Component
Figma: chart-grouped-column (9862:13445) — 2–3 series side by side per category; consistent series order + legend.
Props: data = [{ label, [series.key]: number, reference?, delta?, details? }], series = [{ key, label, color? }],
referenceKey (default 'reference') + referenceLabel, format, tooltip. + shell props.
`function GroupedColumnChart(props)`

### StackedColumnChart
**Tier:** Component
Figma: chart-stacked-column (9863:11139) — composition of a total per category (series stack bottom → top in series order).
Props: data = [{ label, [series.key]: number, delta?, details? }], series = [{ key, label, color? }], format, tooltip. + shell props.
`function StackedColumnChart(props)`

### LineChart
**Tier:** Component
Figma: chart-line (9863:11650) — change over time; actual solid vs planned dashed; optional peer band + dashed median.
Props: data = [{ label, [series.key]: number, … }], series = [{ key, label, color?, dashed?, points? }] (first series shows its
points), band = { low, high, mid?, label } (keys into data; drawn as a white 16% band + dashed mid line), referenceKey/referenceLabel
(dashed white line), zeroBased (default false — lines need not start at 0), format, tooltip. Hover: point + tooltip at that point.
`function LineChart(props)`

### AreaChart
**Tier:** Component
Figma: chart-area (9863:12167) — cumulative volume over time; zero-based; series fill fades from 45% to 0 of its colour.
Props: as LineChart (zeroBased defaults to true; points hidden unless series.points).
`function AreaChart(props)`

### PieChart
**Tier:** Component
Figma: chart-pie (9866:12309) — parts of one whole with few slices (prefer DonutChart). Slices largest → smallest clockwise from 12.
Props: data = [{ label, value, color?, opacity?, delta?, details? }], sort (default true), valueLabel, format, tooltip. + shell props.
`function PieChart(props) { return <RoundChart {...props} donut={false} />; }`

### DonutChart
**Tier:** Component
Figma: chart-donut (9866:12774) — share of a whole; one legend; the hole carries the total.
Props: as PieChart + centerValue (big number) + centerLabel (caption under it).
`function DonutChart(props) { return <RoundChart {...props} donut />; }`

### ScatterChart
**Tier:** Component
Figma: chart-scatter (9866:13245) — relationship between two measures; clusters and outliers.
Props: data = [{ label, x, y, series?, size?, delta?, details? }], series = [{ key, label, color? }] (absent = one series),
xFormat, yFormat (default format), xUnit (suffix on the last x tick, e.g. "days"), xLabel/yLabel (table + tooltip names),
xReference / yReference (dashed white peer-median lines) + referenceLabel, bubble (size → radius), tooltip. + shell props.
`function ScatterChart(props)`

### BubbleChart
**Tier:** Component
Figma: chart-bubble (9866:13788) — scatter with a third measure as bubble area. Props: as ScatterChart; data items carry `size`.
`function BubbleChart(props) { return <ScatterChart {...props} bubble />; }`

### GaugeChart
**Tier:** Component
Figma: chart-gauge (9867:618) — one KPI against one reference value on a 180° arc.
Props: value, max (default 100), min (0), target (solid white tick reaching outside the arc), reference (dashed white tick across the arc), format (default v → v%),
label (caption under the number), valueLabel / targetLabel / referenceLabel (legend), color, delta, details, tooltip. + shell props.
`function GaugeChart(props)`

### WaterfallChart
**Tier:** Component
Figma: chart-waterfall (9866:16075) — bridge from a start value to an end value through increments.
Props: data = [{ label, value, total? }]: total:true bars stand on 0 (value given = reset the running total; omitted = show it),
other bars float as +/- steps. colors = { total, increase, decrease } (groups; default muted-purple / rose / teal),
labels = { total, increase, decrease } (legend), format, tooltip. + shell props.
`function WaterfallChart(props)`

### FunnelChart
**Tier:** Component
Figma: chart-funnel (9867:1065) — drop-off across ordered stages.
Props: data = [{ label, value, reference? (peer value for that stage → white ticks), delta?, details? }], color (stages; default
muted-purple, fading per stage), outcomeColor (last stage; default teal — set null to keep one colour), stageLabel/outcomeLabel/
referenceLabel (legend), format (default full number), tooltip. + shell props.
`function FunnelChart(props)`

### HeatmapChart
**Tier:** Component
Figma: chart-heatmap (9866:14280) — ordered magnitude across a matrix, one hue group (Figma: teal-3 with opacity by value).
Props: rows = [labels], columns = [labels], values = [[row][col] numbers], color (default teal), columnLabelEvery (auto),
lowLabel / highLabel (legend), valueLabel, format, tooltip(cell = { row, column, value, r, c }). + shell props.
`function HeatmapChart(props)`

### ProgressRing
**Tier:** Component
Figma: progress-ring-molecule (4619:18187)
Props: value 0–100 (Figma % variants 0/10/20/40/50/60/80/100 — any value works), size (default 24), label = accessible name.
`function ProgressRing({ value = 0, size = 24, label = 'Progress', className, ...rest })`

### EvidenceStrength
**Tier:** Component
Figma: evidence-strength-bar-molecule (67:6634)
Props: value (%), thresholds = [review, approve] (default [70, 90]), min (left end of the Reject band, default 50), title,
labels = [reject, review, approve] captions. Type (Reject|Review|Approve) follows the value: the active band is drawn solid.
`function EvidenceStrength({ value = 0, thresholds = [70, 90], min = 50, title = 'Evidence strength', labels, className, ...rest })`

### 
**Tier:** Component
color = a group name ('teal'), any CSS colour, or undefined (= palette slot i)
`function dvColor(color, i = 0, step = DV_STEP)`

## data

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/data.jsx

### Badge
**Tier:** Component
Figma: badge-atom (83:52162)
Props: color white|black|red|green|orange|info|false|loading (Figma "False" = no fill, uppercase caption; info = black fill
with text/info + icon/info, as the Patterns source-card draws it), borderless (drops the black badge's border/medium edge —
the library's Black variant has that stroke hidden), size l|m|s, iconLeft / iconRight (icon names; Figma default shows system-star-favourite on the left),
indicator = status-indicator state (show-indicator), avatar = Avatar props (show-avatar), flag = node (show-flag), children = label.
`function Badge({ color = 'white', size = 'm', borderless, iconLeft, iconRight, indicator, avatar, flag, children, className, ...rest })`

### StatusIndicator
**Tier:** Component
Figma: status-indicator-atom (789:39211)
Props: state default|error|success|cooper|warning|blue, stroke (Figma Stroke=True: 1.5px surface/primary ring).
`function StatusIndicator({ state = 'default', stroke, label, className, ...rest })`

### Avatar
**Tier:** Component
Figma: avatar-atom (260:17144) + avatar-organism (260:19923)
Props: initials (Figma Label, e.g. "UN") or name (initials derived), size xs|s|m|l|xl,
type black|red|dark-orange|orange|yellow|brown|dark-blue|blue|light-blue|green|lime|dark-purple|purple|light-purple|dark-pink|light-pink|image|awaiting|cooper|inactive|loading
  or "auto" (picks a collaboration colour from the name), src (Type=Image), status = risk-atom type check|online|offline|warning|error (Figma show-status; absent = hidden),
onClick makes it a button with Figma Hover/Pressed/Focus states.
`function Avatar({ initials, name, type = 'black', src, size = 'm', status, state, onClick, label, className, ...rest })`

### RiskStatus
**Tier:** Component
Figma: status-risk-molecule (69:1729)
Props: type success|warning|error|evaluated, state hover|focus (forced, gallery) , disabled, loading,
children = label (defaults to Figma's: auto-resolved / moderate risk / critical risk / evaluated), onClick → button.
`function RiskStatus({ type = 'success', state, disabled, loading, onClick, children, className, ...rest })`

### ReadinessStatus
**Tier:** Component
Figma: status-readiness-molecule (1440:5273)
Props: type done|warning|error|in-progress|active|loading (error = red, e.g. "Exceeded" in the Patterns file), children = label (Figma Label),
right = text (Right-section=Text) OR indicators = [{ type, label }] (Right-section=Status, XS indicators).
`function ReadinessStatus({ type = 'done', children, right, indicators, className, ...rest })`

### Indicator
**Tier:** Component
Figma: indicator-molecule (1074:180251)
Props: type orange|green|red|blue|purple|gray|cooper|archive|loading, size s|xs, children = text,
buttonRight = icon name (Figma "button right": tertiary S icon-button), onButtonClick, buttonLabel.
`function Indicator({ type = 'orange', size = 's', children, buttonRight, onButtonClick, buttonLabel, className, ...rest })`

### StatCard
**Tier:** Component
Figma: stat-card-organism (3643:35055)
Props: size m|s, title (show-title), value, description, descriptionPosition below|inline (below = value over an UPPERCASE
caption, as the Patterns file draws it; inline = the library's default slot: description beside the value), trend (e.g. "3 %"; show-trend), trendDirection up|down,
badge = Badge props (show-badge; Figma default Color=Red S), children = additional content slot, loading.
`function StatCard({ size = 'm', title, value, description, descriptionPosition = 'below', trend, trendDirection = 'up', badge, loading, children, className, ...rest })`

### ContentCard
**Tier:** Component
Figma: content-card-organism (3643:32067)
Props: size m|s, title, description (show-description), avatar = Avatar props (show-avatar, L 40),
control = node (show-checkbox / show-radio-button / show-switch → pass IFS.Checkbox etc.), iconRight = icon name (Figma arrow-right),
iconLeft = icon name before the title (show-icon-left; Figma default arrow-caret-right-filled),
iconButton = { icon, label, onClick } (show-icon-button), top / bottom = slot nodes (with no title/description/avatar/control/icons
the title block is skipped, so a slots-only card holds just its slots),
tertiaryAction / primaryAction = Button props incl. children (show-buttons, show-tertiary-button, show-primary-button),
selected, cooper (Figma State=Cooper), loading, state (forced: hover|pressed|focus|drag|selected|cooper), onClick → focusable role=button.
`function ContentCard({ size = 'm', title, description, avatar, control, iconLeft, iconRight, iconButton, top, bottom, tertiaryAction, primaryAction, selected, cooper, loading, state, onClick, className, ...rest })`

### Table
**Tier:** Component
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
  rowHeight = content-row min height in px (default 48; e.g. 60 for rows holding icon-button cells),
  rowProps(row) → { className, style, ...attributes } merged onto that content row (drag states, data-* hooks).
`function Table({ columns = [], rows = [], groupBy, defaultCollapsed = [], sort, defaultSort = null, onSortChange, selectedId, onRowClick, rowKey = 'id', rowHeight, rowProps, title, tabs, search, className, ...rest })`

### NotificationCard
**Tier:** Component
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
**Tier:** Component
Figma: progress-bar-molecule (1674:1902)
Props: value 0–100 (Figma % variants 0/10/20/40/50/60/80/100 — any value works), label = accessible name.
`function ProgressBar({ value = 0, label = 'Progress', className, ...rest })`

## extras

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/extras.jsx

### Hotkey
**Tier:** Component
Figma: hotkey-atom (67:6150)
Props: children = hotkey text (Figma "hotkey", default "⌘/").
`function Hotkey({ children = '⌘/', className, ...rest })`

### Counter
**Tier:** Component
Figma: counter-atom (88:24147)
Props: size s (18) | m (24), indicator (show-indicator: true = Blue, or a StatusIndicator state), children = number.
`function Counter({ size = 's', indicator, children, className, ...rest })`

### ScrollArea
**Tier:** Component
Figma: scroll-bar-atom (83:57650)
A scroll container with the Figma bar (8px track, 4px bar) in place of the native scrollbar.
Props: height / maxHeight (the scroll box), children, label (aria-label; makes the viewport keyboard-focusable),
plus any <div> attribute on the outer element.
`function ScrollArea({ height, maxHeight, children, label, className, style, ...rest })`

### ScrollBar
**Tier:** Component
Figma: scroll-bar-atom (83:57650) drawn alone (gallery / static mocks).
Props: location top|center|bottom, height (track length, Figma 1000).
`function ScrollBar({ location = 'top', height = 300, className })`

### CircularButton
**Tier:** Component
Figma: circular-button-molecule (72:9983)
Props: direction left|right|top|bottom (Figma Type = which side of the hub it sits on), children = button label,
hotkey (hotkey-atom text; absent = show-hotkey off), icon (arrow swap; defaults point at the hub), disabled,
state hover|pressed|focus (gallery), plus any <button> attribute.
`function CircularButton({ direction = 'left', children, hotkey, icon, state, className, ...rest })`

### CircularMenu
**Tier:** Component
Figma: circular-button-organism (72:10235)
A radial menu of 2–4 directional actions around a point on a canvas node (more than 4 → use a menu).
Props: actions = [{ direction top|right|bottom|left, label, hotkey (display text, e.g. "⌘1"),
  shortcut (key combo, e.g. "Mod+1"; works while the menu is mounted), onSelect, disabled }],
onSelect(action) (any action), onClose (Escape), hover (force the hover wedge: direction — gallery),
autoFocus (focus the first action). Arrow keys move between actions by direction; Enter/Space activate.
`function CircularMenu({ actions = [], onSelect, onClose, hover, autoFocus, className, style, ...rest })`

### NotificationButton
**Tier:** Component
Figma: icon-button-notification (357:53417). Ghost S bell; hasNew (Figma "Has new notiication?") shows the Error dot.
Props: hasNew, label (default "Notifications"), state (gallery), plus any <button> attribute.
`function NotificationButton({ label = 'Notifications', ...p }) { return <ExtrasDotButton kind="notification" icon="system-notification" type="ghost" label={label} {...p} />; }`

### CommentButton
**Tier:** Component
Figma: icon-button-comment (2563:8153). Tertiary S; hasNew ("Has a new comment?") shows the danger dot.
`function CommentButton({ label = 'Comments', ...p }) { return <ExtrasDotButton kind="comment" icon="system-comment" type="tertiary" label={label} {...p} />; }`

### FilterButton
**Tier:** Component
Figma: icon-button-filter (6955:768). Tertiary S; hasNew = filters applied.
shape round: 28px circle with the element/search/border/default outside stroke (next to a SmartSearch, explore-header).
`function FilterButton({ label = 'Filters', ...p }) { return <ExtrasDotButton kind="filter" icon="system-filter" type="tertiary" label={label} {...p} />; }`

### ArrowButton
**Tier:** Component
Figma: icon-button-arrow (6349:61950). Tertiary S |→ (direction right, the library default) or ←| (direction left: the
expand button of a collapsed panel rail, which the pattern screens draw as type ghost). hasNew = danger dot; dot warning = orange.
`function ArrowButton({ label = 'Open', direction = 'right', ...p })`

### PhoneField
**Tier:** Component
Figma: mobile-number-field-organism (8947:11306) — text-field shell + country select (single-select-atom S) + divider.
Props: size l|m, label (Title), hint (clue-icon tooltip), description (Hint text), error (true or message), disabled,
placeholder (default from the country mask, Figma "(000)000-0000"), value / defaultValue / onChange(value, { country, digits, e164 }),
country / defaultCountry ("US") / onCountryChange(code), countries ([{ code, name, dial, mask, flag }]),
cooper / generating (Cooper states), state hover|focus|typing (gallery), id, name, plus <input> attributes.
`function PhoneField({ size = 'l', label, hint, description, error, disabled, placeholder, value, defaultValue = '', onChange, country, defaultCountry = 'US', onCountryChange, countries = EXTRAS_COUNTRIES, cooper, generating, state, className, style, id, ...rest })`

### SliderTrack
**Tier:** Component
Figma: slider-molecule (3029:20933) with sliter-atom (3029:21077) thumbs.
Props: type default (zero is the floor) | centered (zero in the middle; fill from 0 toward the value) | range (two thumbs),
min, max, step, value / defaultValue / onChange(value) — a number, or [from, to] for range, disabled,
thumbState hover|drag|focus (gallery), label / labels (aria-label of the thumb(s)), formatValue (aria-valuetext).
`function SliderTrack({ type = 'default', min, max, step = 1, value, defaultValue, onChange, disabled, thumbState, label = 'Value', labels, formatValue, className, style })`

### Slider
**Tier:** Component
Figma: slider-organism (3029:20689) — title (+ clue icon) and Number on top, optional left icon-button + slider-molecule, hint text.
Props: label (Title; absent = show-title off), hint (clue-icon tooltip), description (Hint text), showValue (Number, default true),
formatValue(v) for the Number, icon (show-left-icon: a Ghost S circle icon-button, e.g. "system-star-favourite"), iconLabel, onIconClick,
and every SliderTrack prop (type, min, max, step, value/defaultValue/onChange, disabled, thumbState).
Use <Slider> without label for the bare molecule.
`function Slider({ label, hint, description, showValue = true, formatValue, icon, iconLabel, onIconClick, value, defaultValue, onChange, className, style, ...track })`

### FormCard
**Tier:** Component
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
**Tier:** Component
Figma: icon-picker-organism (5434:16926) = grid of icon-picker-atom (210:77686), single-select. Place it inside IFS.Popover.
Props: icons (icon names; default the Figma curated set), value / defaultValue / onChange(name), columns (default 4),
label (aria-label of the group, default "Choose icon"), bare (no 12px padding), itemState { [name]: hover|focus } (gallery).
Keyboard: one tab stop; arrows move, Home/End, Enter/Space select.
`function IconPicker({ icons = EXTRAS_PICKER_ICONS, value, defaultValue = null, onChange, columns = 4, label = 'Choose icon', bare, itemState, className, style, ...rest })`

### Weekday
**Tier:** Component
Figma: weekday-atom (2704:74414) — the weekday header cell of the calendar (Caption/semibold-UPPER, text/tertiary, 32×16).
Props: children = day text (Figma "day", e.g. "Wed"). Figma's show-badge / timeline props are not wired to any layer.
`function Weekday({ children, className, ...rest })`

### Weekdays
**Tier:** Component
A row of seven weekday-atoms as placed in date-picker-molecule. Props: weekStartsOn (0 = Sunday, 1 = Monday), locale.
`function Weekdays({ weekStartsOn = 1, locale = 'en-US', className, ...rest })`

### Logo
**Tier:** Component
Props: height (default 30; width keeps the 156:30 ratio), label (accessible name, default "IFS Copperleaf"),
color (CSS colour; default var(--icon-primary)).
`function Logo({ height = 30, label = 'IFS Copperleaf', color, className, style, ...rest })`

## forms

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/forms.jsx

### TextField
**Tier:** Component
Figma: text-field-organism (210:77559)
Props: size l|m, label (Figma Title), hint (tooltip text → question-hint icon), placeholder, description (Hint text),
error (true, or a string that replaces the description), disabled, iconLeft / iconRight (icon names),
suffix (Figma textRight), cooper (Figma State=Cooper ring), generating (Cooper Generating: loader),
value / defaultValue / onChange(value, event), state hover|focus|typing (gallery only), plus any <input> attribute.
`function TextField({ size = 'l', label, hint, description, error, disabled, iconLeft, iconRight, suffix, cooper, generating, value, defaultValue = '', onChange, state, className, style, id, type = 'text', ...rest })`

### TextArea
**Tier:** Component
Figma: text-area-organism (3024:9383)
Props: size l (140px tall) | m (100px), label, hint, placeholder, description, error, disabled, iconLeft,
cooper, generating, value / defaultValue / onChange(value, event), state hover|focus|typing (gallery only).
`function TextArea({ size = 'l', label, hint, description, error, disabled, iconLeft, cooper, generating, value, defaultValue = '', onChange, state, className, style, id, ...rest })`

### Search
**Tier:** Component
Figma: search-regular-organism (153:63462)
Props: placeholder (default "Search for..."), value / defaultValue / onChange(value, event), onSearch(value) on Enter,
filter (Figma Filter boolean → filter icon button; onFilter called on click), disabled, state hover|focus (gallery only).
A clear (×) button appears once there is text; Escape also clears.
`function Search({ placeholder = 'Search for...', value, defaultValue = '', onChange, onSearch, filter, onFilter, disabled, state, className, style, ...rest })`

### Checkbox
**Tier:** Component
Figma: checkbox-molecule (153:61241), using checkbox-atom (153:60798)
Props: children = label (omit for the bare 16px atom), checked / defaultChecked / onChange(checked, event),
indeterminate (Figma Type=Indeterminate), disabled, state hover|pressed|focus (gallery only), plus <input> attributes (name, value…).
`function Checkbox({ checked, defaultChecked = false, onChange, indeterminate, disabled, children, state, className, style, ...rest })`

### Radio
**Tier:** Component
Figma: radio-button-molecule (1387:222956), using radio-button-atom (210:113374)
Props: children = label (omit for the bare atom), value, checked, name, disabled, onChange(value, event),
state hover|pressed|focus (gallery only). Usually rendered by RadioGroup.
`function Radio({ value, checked, defaultChecked, name, onChange, disabled, children, state, className, style, ...rest })`

### RadioGroup
**Tier:** Component
Radio group (no separate Figma component; stacks radio-button-molecule rows).
Props: options = [{ value, label, disabled }] or <Radio> children, value / defaultValue / onChange(value, event),
name, disabled, direction vertical|horizontal, label (accessible group name).
`function RadioGroup({ options, children, value, defaultValue, onChange, name, disabled, direction = 'vertical', label, className, style })`

### Switch
**Tier:** Component
Figma: switch-molecule (88:22668), using switch-atom (88:23960)
Props: children = label (omit for the bare atom), description (Figma "Show text"), size m (24px) | s (12px)
("l" accepted: the atom calls 24px "L"), checked / defaultChecked / onChange(checked, event), disabled,
state hover|pressed|focus (gallery only). Renders a <button role="switch">.
`function Switch({ size = 'm', checked, defaultChecked = false, onChange, disabled, children, description, state, className, style, id, ...rest })`

## navigation

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/navigation.jsx

### NavItem
**Tier:** Component
Figma: navigation-panel-atom (1544:2681) — one sidebar row.
Props: type parent|child|submenu, active (Figma State=Active / Selected), disabled, cooper (Figma "Cooper recommended"),
action = { icon, label, onClick } (Figma show-button; Child shows it on hover), expanded (submenu only), state (forced gallery state).
`function NavItem({ type = 'parent', active, disabled, cooper, action, expanded, state, children, className, onClick, ...rest })`

### NavSubtitle
**Tier:** Component
Figma: navigation-panel-atom Type=Subtitle — section heading with optional "+" icon-button.
`function NavSubtitle({ children, action, className })`

### SideNav
**Tier:** Component
Figma: navigation-panel-organism (1545:2808) — the Level-2 sidebar (sidebar-pattern 4482:99996 is this filled in).
Props: title (Figma "Bar name"), items: array of
  { id, label, disabled, cooper, action }                         → Parent row
  { type:'section', label, action, items:[{ id, label, ... }] }   → Subtitle + Child rows
  { type:'submenu', id, label, defaultOpen, items:[...] }          → Submenu toggle + Child rows
value / defaultValue / onSelect(id, item) for the active row; collapsed / defaultCollapsed / onCollapsedChange (View=Collapsed).
children = Figma Content slot: custom content (e.g. a tree) shown under the title instead of / after the `items` rows.
`function SideNav({ title, items = [], value, defaultValue, onSelect, collapsed, defaultCollapsed = false, onCollapsedChange, children, className, ...rest })`

### Tab
**Tier:** Component
Figma: tab (1440:5039). Props: size m|l, selected, disabled, count (Figma show-counter + counter value), state.
`function Tab({ size = 'm', selected, disabled, count, state, children, className, ...rest })`

### Tabs
**Tier:** Component
Figma: tab-organism (3412:32038) — peer views of one page; also the table filter (tabs with counts).
Props: items [{ value, label, count, disabled }], value / defaultValue / onChange(value), size m|l, aria-label.
Arrow keys / Home / End move between tabs (automatic activation).
`function Tabs({ items = [], value, defaultValue, onChange, size = 'm', className, ...rest })`

### Crumb
**Tier:** Component
Figma: breadcrumb-atom (3492:9413). Props: type previous|current|next, icon (Figma show-icon-left, previous only), disabled, state.
`function Crumb({ type = 'previous', icon, disabled, state, children, className, ...rest })`

### Breadcrumb
**Tier:** Component
Figma: breadcrumb-organism (67:4698).
Props: items [{ label, onClick, disabled }], current (index of the current crumb, default last), onSelect(index, item),
back (default true: the first previous crumb carries the ‹ chevron, Figma show-icon-left). Crumbs after `current` render as Type=Next.
`function Breadcrumb({ items = [], current, onSelect, back = true, className, ...rest })`

### Step
**Tier:** Component
Figma: stepper-molecule (1219:169725). Non-interactive.
Props: status completed|in-progress|not-started (Figma State), active (Figma Active=Yes), tooltip (shown on hover, Figma Hover=True), state.
`function Step({ status = 'not-started', active, tooltip, state, children, className })`

### Stepper
**Tier:** Component
Figma: stepper-organism (3029:22750). Shows progress only — steps are not clickable (Figma rule); advance it from a button.
Props: steps [{ label, tooltip }], current (index of the in-progress step; earlier = completed, later = not started),
or give each step its own `status`. active = index of a highlighted step (Figma Active=Yes), optional.
`function Stepper({ steps = [], current = 0, active, className, ...rest })`

### Pager
**Tier:** Component
Figma: pagination-organism (3497:9660) — record pager for item-by-item content. Never for tables (Figma rule).
Props: page (1-based) / defaultPage / onChange(page), total, percent (Figma show-%; omit to hide),
progress (word after the percent, e.g. "resolved" → "(0% resolved)"; Figma's text override),
complete (Figma "show left icon": success icon before the count), onShowAll (Figma show-all-button; omit to hide), showAllLabel.
`function Pager({ page, defaultPage = 1, onChange, total = 1, percent, progress, complete, onShowAll, showAllLabel = 'Show all', className, ...rest })`

### CanvasColumn
**Tier:** Component
Figma: canvas-container-atom (1440:5305) — one column heading of the canvas header. Optional action = { icon, label, onClick }.
`function CanvasColumn({ children, action, className, ...rest })`

### CanvasHeader
**Tier:** Component
Figma: canvas-header (1440:5321) — column strip under the page header on map views, plus the zoom ruler.
Props: columns (array of labels) or children (CanvasColumn elements; Figma "columns" slot), ruler (default true).
`function CanvasHeader({ columns, children, ruler = true, className, ...rest })`

### NavBarItem
**Tier:** Component
Figma: nav-bar-page-atom (69:4012) — one stage in the Level-1 bar. Props: active, disabled, state.
`function NavBarItem({ active, disabled, state, children, className, ...rest })`

### NavBar
**Tier:** Component
Stage values: command | value | explore | build | plan | results ('home' is accepted as an alias of 'command').
Figma: global-header (69:3736) — the Level-1 bar the pattern screens instance (nav-bar-organism 3412:29453 is the
canvas-documented twin with the same 48px layout). Props: stages [{ value, label, disabled }], value / defaultValue / onChange,
logo (node; defaults to IFS.Logo), onSearch, onSettings, onNotifications, hasNotifications,
user = { initials, name } or avatar (node), actions (node: replaces the default search/settings/bell buttons).
`function NavBar({ stages = DEFAULT_STAGES, value, defaultValue, onChange, logo, onSearch, onSettings, onNotifications, hasNotifications, user, avatar, actions, className, ...rest })`

### PageHeader
**Tier:** Component
Figma: page-header (1588:1971) — Level-3 header at the top of the content area (the instance the Map overview screen uses;
page-header-pattern / header-pattern are near-duplicates). Props: title, id (Figma ID), onBack (Figma "Show button back"),
onTitleMenu (chevron after the title), status (node, e.g. an indicator), views (node, e.g. segmented icon control; a divider precedes it),
center (node, centred between left and right: e.g. the Stepper), actions (node, right side: e.g. Cooper chip, Share, primary button).
The blur sits on a ::before layer, so fixed popovers/modals opened from header actions aren't trapped by it.
`function PageHeader({ title, id, onBack, onTitleMenu, status, views, center, actions, className, ...rest })`

### PageTop
**Tier:** Component
Figma: page-top (244:117279, key c5e4c474…) — component set in IFS Design System Patterns (KmmVU2D0kqWr0dC1xXNzWw); variant
Type=Default 244:117280 and the older standalone copy 95:18889 both carry key 771d8425…. Not found in the published IFS Design System library.
The page intro on a library / list page (a single object's page uses PageHeader instead). Column, gap 20:
  title row (gap 8, bottom-aligned): text column (gap 8) = eyebrow + title (Heading/H1/medium) + description (Body/M/medium),
  then the actions on the right (Figma "Show button": button Secondary M "New" with system-pencil-plus);
  tabs row (40 tall, space-between, bottom-aligned, gap 32): tab-organism (tabs with counts) + smart-search-organism (360) ("show search").
Props: title, description (one line; omit for a title-only page-top), eyebrow (Figma "cooper": true → "Cooper", or a string)
with the Cooper Insight mark, actions (node, e.g. <IFS.Button type="secondary" size="m" iconLeft="system-pencil-plus">New</IFS.Button>),
tabs (IFS.Tabs props, or a node), search (IFS.SmartSearch props, or a node), headingLevel (default 1).
With neither description nor eyebrow the title row is 32 tall and centred (the Build / Idea Pad page-top).
`function PageTop({ title, description, eyebrow, actions, tabs, search, headingLevel = 1, className, ...rest })`

### AppShell
**Tier:** Component
AppShell — NOT a Figma component. Reproduces the shell of pattern screen "Map - Overview - Default" (4484:116532):
48px NavBar across the top, 240px SideNav below it on the left, then the content column with the PageHeader
(+ optional CanvasHeader) on top and a scrolling content area. Bar, sidebar and header stay put; only content scrolls.
Props: navBar, sideNav, header (nodes), bottom (node, e.g. a bottom sheet), children (content), height (default 100vh).
`function AppShell({ navBar, sideNav, header, bottom, children, height, className, style, ...rest })`

## patterns-activity

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-activity.jsx

### CompareDropdownList
**Tier:** Component
───────────────────────────── drop-down list ───────────────────────────── 
Figma: drop-down list (c5186fedd85d1a8db92485b5b848c56e500c3c33 cached in Patterns 52:82683; IFS DS publishes "drop-down list" ddd60a12…)
The open list of compare-dropdown: titled groups ("Top benchmarks", "All frameworks") split by a divider.
Props: groups [{ title, items: [{ value, label, status: { type, label } (indicator-molecule), badge (badge-atom White S text), disabled }] }],
value (selected value), activeValue (keyboard highlight = Figma hover row), onSelect(value, item), onActiveChange(value),
id (listbox id), inline (static position — gallery).
`function CompareDropdownList({ groups = [], value, activeValue, onSelect, onActiveChange, id, inline, className, style })`

### CompareDropdown
**Tier:** Component
───────────────────────────── compare-dropdown ───────────────────────────── 
Figma: compare-dropdown (59571d4df483e2b416ca034bafc72eabc902f8f3; Patterns copy 52:82756)
Variants: Property 1=Variant2 (filled: name + ✕ + caret), Variant3 (empty: "Select framework" in text/disabled), Default (open: caret up + list).
Props: groups (see CompareDropdownList), value / defaultValue / onChange(value, item) (✕ sets null),
open / defaultOpen / onOpenChange, placeholder, clearable (✕ when filled, default true), disabled, width (default 320),
state open (gallery), aria-label. Keyboard: Enter / Space / ↓ open; ↑ ↓ move; Enter picks; Esc closes.
`function CompareDropdown({ groups = [], value, defaultValue = null, onChange, open, defaultOpen = false, onOpenChange, placeholder = 'Select framework', clearable = true, disabled, width = 320, state, className, style, 'aria-label': ariaLabel = 'Compare to' })`

### CompareHeader
**Tier:** Component
───────────────────────────── compare-header ───────────────────────────── 
Figma: compare-header (0c79e831e79cbfa3259c5619e66bd0f64cc45b2a; Patterns copy 52:82780) — the "COMPARE TO" bar above a compare view.
A 440px blurred box (label + compare-dropdown) on a 42px full-width row; boolean "Show cooper-banner" adds a 398px
cooper-banner beside it (hidden by default; the banner itself is a separate component not built here).
Props: label (default "Compare to", drawn uppercase), cooperBanner (node → show-cooper-banner), every CompareDropdown prop.
`function CompareHeader({ label = 'Compare to', cooperBanner, className, style, ...dropdown })`

### CompareStatValue
**Tier:** Pattern helper
───────────────────────────── compare stat value ───────────────────────────── 
The value of a compare stat card (Figma compare-quick-stat-card 52:82588 = legacy stat-capital-flow-card Type=Compare):
two caption-over-value columns joined by arrow-right. Pass it as IFS.StatCard `value` with className "ifs-compare-stat".
Props: fromLabel, from (baseline: text/tertiary), toLabel, to (current: text/primary). Without `from` only the current value shows.
`function CompareStatValue({ fromLabel, from, toLabel, to, className })`

### CompareView
**Tier:** Pattern helper
───────────────────────────── CompareView (pattern) ───────────────────────────── 
Compare screen body ("Library - Strategy Framework - Active models", Patterns 52:84351): compare-header, a row of four
compare stat cards, then the Sankey with the current and baseline frameworks as its two source blocks.
Props: groups / value / defaultValue / onChange (the compare-dropdown), stats [{ key, title, trend, trendDirection, fromLabel, from, toLabel, to, description }]
(from/fromLabel are dropped while nothing is selected), sankey (IFS.Sankey props), height (Sankey body), cooperBanner.
`function CompareView({ groups, value, defaultValue = null, onChange, stats = [], sankey, height = 520, cooperBanner, className, style })`

### ActivityPanel
**Tier:** Pattern helper
`function ActivityPanel({ versions, defaultVersions = [], onVersionsChange, approvals, view, defaultView = 'versions', onViewChange, query, defaultQuery = '', onQueryChange, open, defaultOpen = true, onOpenChange, layout = 'overlay', title = 'Activity', recordLabel = 'framework', onOpenVersion, onCompare, onDuplicate, onRestore, onRename, defaultExpanded = [], defaultRename, versionSuggestions = PA_VERSION_SUGGESTIONS, approvalSuggestions = PA_APPROVAL_SUGGESTIONS, className, style })`

### filterVersions
**Tier:** Pattern helper
Result = the same list with fewer items (Figma note). Activity-level queries (person / type) keep only matching log entries and
expand those versions; other queries match the version's title, description, author, date and log text.
`function filterVersions(versions, q)`

## patterns-approval

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-approval.jsx

### ApprovalStatus
**Tier:** Component
===================================================== status ===================================================== 
Figma: status (12:210060 in the Patterns file; IFS DS set "status", key 84df17a7, library b0bad471) — the 32px state mark
in the approval chain's first column. Props: type success|rejected|awaiting|empty, label (accessible name; defaults per type).
awaiting = the reviewer is overdue ("it's time to notify the user", Figma note); empty = not acted yet.
`function ApprovalStatus({ type = 'empty', label, className, ...rest })`

### QuickStatCard
**Tier:** Component
===================================================== stat ===================================================== 
Figma: stat (12:121119) — one card of the row: quick-stat-card, or compare-quick-stat-card when `compare` is given.
Props: title, value, description (10px caption line under the value), trend (e.g. "4.8%") + trendDirection up|down,
compare = { from, to, fromLabel = 'Current', toLabel = 'Proposed' } (replaces value/description).
`function QuickStatCard({ title, value, description, trend, trendDirection = 'up', compare, className, ...rest })`

### Stat
**Tier:** Component
Figma: stat (12:121119, key c74437d8) — the executive-summary row of equal-width quick-stat cards (Figma draws 4: one compare + three plain).
Props: items = QuickStatCard props[].
`function Stat({ items = [], className, ...rest })`

### InfoHintItem
**Tier:** Component
===================================================== info-hint-item ===================================================== 
Figma: info-hint-item (12:121968, key d3dc02ed) — 16px rounded swatch + name (+ optional icon + value). Used as chart legend entries.
Props: label, color (any CSS colour, e.g. 'var(--data-viz-alert-data-5)'), neutral (the grey "Unchanged" swatch with a border),
icon (icon name, Figma masterIcon), value.
`function InfoHintItem({ label, color, neutral, icon, value, className, style, ...rest })`

### InvestmentValueImpact
**Tier:** Component
Figma: Investment-value-impact (12:121973, key fabd8e0b; IFS DS now publishes it as "review-data-visualisation") — the
review card: chart header, metric strip (dividers between), a caption, a distribution column chart and an info-hint legend.
Props: title, metrics = [{ title, value, direction up|down, tone danger|success }], description,
bins = [{ label, value, tone loss|unchanged|gain, step 3|4|5 (colour depth), color (override) }], max (axis top, default 250),
ticks (axis count, default 6), legend = InfoHintItem props[] (false hides), button (DataVizHeader right button),
format(bin) → tooltip text, onBinClick(bin, i).
`function InvestmentValueImpact({ title = 'Investment value impact', metrics = IVI_METRICS, description = "Value change measured as % of each investment's total value (NPV) under the proposed framework vs. current.", bins = IVI_BINS, max = 250, ticks = 6, legend = IVI_LEGEND, button, format, onBinClick, className, ...rest })`

### TableReview
**Tier:** Component
Figma: table-review (12:122378, key 8bd2618e; IFS DS now publishes it as "review-investment-table") — the grouped investment
table on review screens: Investment, Type (white badge), Total value (from → to), Value change (▲/▼), Value / cost ratio (from → to).
Built on the kit Table (grouping, sorting, filter icons). Property 1=Default shows the "Unchanged" group collapsed; Variant2 expanded.
Props: rows = [{ id, group, name, type, total: { from, to }, change: { value, direction up|down }, ratio: { from, to } }],
defaultCollapsed = group titles collapsed at first, labels = column-title overrides, onFilter(key) (filter icon on
Investment / Type), sort / defaultSort / onSortChange, onRowClick / selectedId.
`function TableReview({ rows = [], defaultCollapsed = [], labels, onFilter, sort, defaultSort, onSortChange, onRowClick, selectedId, className, ...rest })`

### SplitButton
**Tier:** Pattern helper
===================================================== SplitButton ===================================================== 
Pattern helper: header main action + dropdown menu — built from Button, IconButton, Menu. Figma draws it as (Figma: button + caret icon-button, the menu is a
single-select-list-molecule with a description line). Props: children = label, type (default primary), size (default s),
iconLeft, disabled, onClick, items = [{ label, description, onClick, disabled }] (absent/empty = no dropdown),
menuLabel (accessible name of the caret). Esc / outside click close the menu.
`function SplitButton({ children, type = 'primary', size = 's', iconLeft, disabled, onClick, items, menuLabel = 'More actions', className })`

### ReadinessFacts
**Tier:** Pattern helper
===================================================== Readiness evaluation ===================================================== 
Pattern helper: key/value rows inside a readiness section — built from table-header/table-cell looks (Figma: tableHeader type=row + tableCell text, 40px, rounded).
Props: rows = [[label, value, tone danger|success]] or [{ label, value, tone }].
`function ReadinessFacts({ rows = [], className, ...rest })`

### ReadinessSection
**Tier:** Pattern helper
Pattern helper: one collapsible readiness card — built from Badge, Counter, Icon (Figma: content-card-organism M with a caret title row and a badge-atom
Color=False or counter-atom on the right). Props: title, badge = { label, tone danger|success|neutral, icon } or a string,
count (counter instead of a badge), open / defaultOpen / onOpenChange, children (body: <p> text, ReadinessFacts, …).
`function ReadinessSection({ title, badge, count, open, defaultOpen = false, onOpenChange, children, className, ...rest })`

### ReadinessEvaluation
**Tier:** Pattern helper
Pattern helper: Readiness Evaluation sidebar content — built from ProgressRing, ReadinessStatus, ReadinessSection (place it in IFS.Panel). Figma: a content card (summary title + text, then
"Approval readiness" with a 16px progress ring and status-readiness rows) followed by ReadinessSections.
Props: summary = { title, text }, readiness (0–100; omit to hide the head), readinessLabel (default "Approval readiness"),
checks = [{ label, type done|warning, right }] (ReadinessStatus rows), sections = [{ id, title, badge, count, content }],
openSections / defaultOpenSections / onOpenSectionsChange (array of ids).
`function ReadinessEvaluation({ summary, readiness, readinessLabel = 'Approval readiness', checks = [], sections = [], openSections, defaultOpenSections = [], onOpenSectionsChange, className, ...rest })`

### ApprovalChainPanel
**Tier:** Pattern helper
===================================================== Approval chain ===================================================== 
Pattern helper: approval chain shell (sidebar / full / popover) — built from IconButton (Figma: sidebar-organism titled "Approval chain"; a floating card under the
"Approval chain" header button on the reviewer screen; the content area when expanded).
Props: mode sidebar | full | popover, collapsed (sidebar only: 84px rail), title, onExpandedChange(full: boolean)
(diagonal expand / collapse button), onCollapsedChange(collapsed) (sidebar bar-arrow button), onClose (popover ✕),
style (position the popover), children.
`function ApprovalChainPanel({ mode = 'sidebar', collapsed, title = 'Approval chain', onExpandedChange, onCollapsedChange, onClose, children, className, style })`

### ApprovalChainTable
**Tier:** Pattern helper
Pattern helper: the approval chain table with note/push/filter rules — built from ApprovalStatus, Avatar, Button, ActionMenu, Popover, Search, Chip, TextArea, Tooltip, EmptyState. Figma draws it on this page — a table with a status rail (status + dashed connector),
USER (filter when > 3 approvers), NOTE, and in the full view COMMENT, LAST NOTIFIED and an action column.
Props:
  approvers / defaultApprovers / onChange(approvers) — [{ id, name, role, avatar (Avatar props), status success|awaiting|empty|rejected|revisions,
    note: { text, authorId } | null, comment, lastNotified, pushedAt (ms), replaced: { name, avatar } (previous reviewer), action: { label, icon, onClick } }]
  currentUserId (adds "(You)", decides note rights), ownerId (the investment owner; owner = currentUserId === ownerId),
  view compact | full, details (full view: force the COMMENT / LAST NOTIFIED / action columns; default = when any row has that data), filterable (default: more than 3 approvers), onPush(approver) (owner's manual reminder on an awaiting row:
  shows the "Reminder sent." toast, stamps Last notified, then "Notified" + live countdown tooltip for pushCooldownHours, default 24),
  onNoteChange(approver, note|null, previous).
Rules built in (Figma notes): approvers add a note to their own row; the owner adds a note to any approver's row; only a
note's author can edit or delete it; the filter applies live (state chips + name/role search, Clear all, "No results found").
`function ApprovalChainTable({ approvers, defaultApprovers = [], onChange, currentUserId, ownerId, view = 'compact', details, filterable, onPush, onNoteChange, pushCooldownHours = 24, className, ...rest })`

## patterns-collaboration

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-collaboration.jsx

### CollaboratorCursor
**Tier:** Component
───────────────────────────── cursor-atom ─────────────────────────────
Figma: cursor-atom (55:1645; set key 80c816a4…) — live multiplayer cursor: cursor-pointer + name pill.
Props: user 1…16 | "cooper" (Figma User; pill = collaboration/user-N, Cooper = user-9 + Cooper visual), name (Figma "user name"),
  x / y (px; when given the cursor is absolutely positioned and glides between positions), label (accessible name).
Users 4, 6, 11, 13, 15 use dark text (text/primary-inverse), as in Figma.
`function CollaboratorCursor({ user = 1, name, x, y, className, style, ...rest })`

### LiveCursors
**Tier:** Pattern helper
───────────────────────────── LiveCursors ─────────────────────────────
Pattern component: layer over a canvas that shows the cursors of the other people who are online.
Props: users [{ id, name, avatar: { type } | user }], simulate (default true: each cursor wanders between random points,
  like a remote user moving; pass positions instead to drive them from real presence data), positions { [id]: { x, y } }, interval (ms).
The current user never sees their own cursor (inferred).
`function LiveCursors({ users = [], simulate = true, positions, interval = 1400, className, style })`

### CollaboratorsButton
**Tier:** Pattern helper
───────────────────────────── CollaboratorsButton ─────────────────────────────
Pattern component: the "who's in" indicator in the page header — button Tertiary S, users-group icon, "accepted/invited".
Props: accepted, invited (both include the owner: owner only = 1/1), plus Button props (onClick…).
`function CollaboratorsButton({ accepted = 1, invited = 1, className, ...rest })`

### RoleSelect
**Tier:** Pattern helper
───────────────────────────── RoleSelect ─────────────────────────────
Pattern component: access control on a collaborator row = single-select-atom (M, drawn 24 tall in Figma) +
single-select-list-molecule: Editor / Viewer, divider, Remove.
Props: value / defaultValue / onChange(role) ('editor' | 'viewer'), onRemove (adds the Remove item), disabled, label.
`function RoleSelect({ value, defaultValue = 'editor', onChange, onRemove, disabled, label = 'Access', className })`

### CollaboratorRow
**Tier:** Pattern helper
───────────────────────────── CollaboratorRow ─────────────────────────────
Pattern component: one person in the panel = content-card-organism (Size=M, 40 tall) with its top slot:
avatar M (dashed "Awaiting" avatar while the invite is open; online dot = risk-atom Online), name (+ " (you)"), job role,
then one control on the right.
Props: person { id, name, initials, title (job role), avatar: Avatar props, access, status owner|joined|awaiting|suggested|directory, online, you },
  control owner | role | add | none (default from status), onOpen (row click: open the brief), onAdd, onRoleChange(role), onRemove,
  push available | notified (awaiting rows: bell icon-button / disabled "Notified"), onPush, state hover (forced, gallery).
`function CollaboratorRow({ person, control, onOpen, onAdd, onRoleChange, onRemove, push, onPush, state, className })`

### CollaboratorSection
**Tier:** Pattern helper
Section of the panel: H4 UPPER heading (text/secondary, or the Cooper gradient + cooper dots for Cooper suggestions) + rows.
`function CollaboratorSection({ title, cooper, children })`

### RoleFilter
**Tier:** Pattern helper
───────────────────────────── RoleFilter ─────────────────────────────
Pattern component: the filter button (icon-button Secondary M, system-filter) + multiple-select-list-molecule of job roles
("All" first). Picking a role while All is on narrows to that role; clearing every role returns to All (inferred).
Props: roles, value (array; empty = All) / onChange.
`function RoleFilter({ roles = [], value = [], onChange, className })`

### CollaboratorsPanel
**Tier:** Pattern helper
───────────────────────────── CollaboratorsPanel ─────────────────────────────
Pattern component: popover-organism "Collaborators" (360 wide) opened from CollaboratorsButton.
Default: IN PROJECT (owner first, then joined) · AWAITING · SUGGESTED PEOPLE BY COOPER. Search "Invite by name or role…" + role filter:
  focused and empty → Suggested + Recently; typing → RESULTS (name or job role, filtered by role); nothing → empty-state-organism with
  suggestion chips that fill the query. Hovering a person who can be invited shows "+"; clicking opens InviteCollaboratorModal.
Props: controller (useCollaboration), open / onOpenChange, trigger (default CollaboratorsButton), onInvite(person), onOpen(person),
  onRemove(person), onPush(person), inline (render the card alone), defaultQuery, className, style.
`function CollaboratorsPanel({ controller: c, open, defaultOpen, onOpenChange, trigger, onInvite, onOpen, onRemove, onPush, inline, defaultQuery = '', className, style })`

### CollaboratorsMenu
**Tier:** Pattern helper
───────────────────────────── CollaboratorsMenu ─────────────────────────────
Pattern component: the drop-in for PageHeader actions. CollaboratorsButton + CollaboratorsPanel + invite / edit-brief / remove
modals + the push toast, all wired to one useCollaboration controller.
Props: controller, defaultOpen, open / onOpenChange.
`function CollaboratorsMenu({ controller: c, open, defaultOpen = false, onOpenChange })`

### InviteCollaboratorModal
**Tier:** Pattern helper
───────────────────────────── InviteCollaboratorModal ─────────────────────────────
Pattern component: modal-organism "Add Collaborator": person (content card, avatar L 40) + access select,
"Brief by Cooper" (cooper dots + gradient H4) + text-area-organism M with Cooper's brief for this person, editable.
Props: open, person, mode invite (Send invitation) | edit (Save; disabled until something changes), defaultAccess, defaultBrief,
  onCancel, onSubmit({ access, brief }), inline (card only — gallery).
`function InviteCollaboratorModal({ open, person, mode = 'invite', defaultAccess = 'editor', defaultBrief = '', onCancel, onSubmit, inline })`

### RemoveCollaboratorModal
**Tier:** Pattern helper
───────────────────────────── RemoveCollaboratorModal ─────────────────────────────
Pattern component: modal-organism "Remove this collaborator?": person card (avatar L) + "This action will revoke the collaborator's
invite to the framework" + Cancel / Remove. Props: open, person, onCancel, onConfirm, inline.
`function RemoveCollaboratorModal({ open, person, onCancel, onConfirm, inline })`

### useCollaboration
**Tier:** Pattern helper
`function useCollaboration({ people: init = [], suggested: sugInit = [], directory = [], recent = [], roles, brief = () => '', now = () => Date.now() } = {})`

### collaborationUser
**Tier:** Pattern helper
`const collaborationUser = avatarType => USER_OF_AVATAR[avatarType] || 16;  // ───────────────────────────── cursor-atom ───────────────────────────── // Figma: cursor-atom (55:1645; set key 80c816a4…) — live multiplayer cursor: cursor-pointer + name pill. // Props: user 1…16 | "cooper" (Figma User; pill = collaboration/user-N, Cooper = user-9 + Cooper visual), name (Figma "user name"), //   x / y (px; when given the cursor is absolutely positioned and glides between positions), label (accessible name). // Users 4, 6, 11, 13, 15 use dark text (text/primary-inverse), as in Figma. const DARK_TEXT = [4, 6, 11, 13, 15]; function CollaboratorCursor({ user = 1, name, x, y, className, style, ...rest })`

## patterns-comments

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-comments.jsx

### CommentPin
**Tier:** Component
Figma: comment-pin-organism (260:47160) — key 6c7355bd…; Patterns copy 12:30494.
The canvas anchor of a thread. Teardrop pill (sharp bottom-left corner = the anchor point) holding up to three Avatar M.
Props: type unread|read|cooper (Figma Type: blue / elevation-1 + blur / Cooper accent), avatars = [Avatar props] (1–3:
Figma show-2nd-avatar / show-3rd-avatar), count (number shown on one Inactive avatar instead of authors — the screens'
roll-up pin on a collapsed node), preview = { name, time, text, replies } (Figma State=Hover card: hover/focus shows it,
a preview only), state hover (forced, gallery), onClick (opens the thread), label (accessible name).
Place it with its bottom-left corner on the anchor: style={{ position:'absolute', left, top, transform:'translateY(-100%)' }}.
`function CommentPin({ type = 'unread', avatars = [], count, preview, state, onClick, label, className, style, ...rest })`

### CommentDrawerCard
**Tier:** Component
Figma: comment-drawer-card (1231:170874) — key 548d968e…; Patterns copy 12:30656. One thread row in the Comments drawer.
Props: type new|read|resolved|cooper (Figma Type: New = unread, blue dot; Read/Resolved = Inactive avatar; Cooper = author +
Cooper avatar and the "Need review" indicator), number ("#56"), place (where it is anchored, e.g. "Value models"),
name, time, children = the first comment (truncated to three lines; replies are never shown in the row),
avatar (author Avatar props; Read/Resolved render it Inactive), avatars (extra avatars, Figma show-2nd-avavtar),
actionRequired (Figma show-action-required: Badge "Action required"; never on Resolved), cooperLabel (Cooper indicator text),
selected (Figma State=Selected: the thread whose callout is open), state hover|selected|focus (forced, gallery),
onClick (open the thread), onResolve (✓ on hover — absent on Resolved), menu = ⋯ items [{ label, icon, onClick, copy }].
`function CommentDrawerCard({ type = 'read', number, place, name, time, children, avatar, avatars = [], actionRequired, cooperLabel = 'Need review', selected, state, onClick, onResolve, menu, className, ...rest })`

### CommentMenu
**Tier:** Pattern helper
Pattern helper: thin ⋯ menu (Copy link → "Copied" 2 s) — built from IconButton + ActionMenu (Table) inline list.
Duplicates ActionMenu / CooperMenu on purpose as a thin wrapper; replace with a shared Menu if one is added.
The ⋯ menus on this page: single-select-list-molecule (153:62054) of S (28) single-select-list-atoms, 160 wide,
drawn by the kit's ActionMenu list. An item with copy:true is "Copy link": on click its label turns to "Copied" (✓) and
reverts after 2 s (Figma note). Used by CommentDrawerCard and CommentCallout.
`function CommentMenu({ items = [], label = 'More actions', open, onOpenChange, className })`

### CommentMentionMenu
**Tier:** Pattern helper
Pattern helper: @-mention picker — built from Popover + ContentCard.
The "@" picker under the composer (Patterns › Mention 12:45593): popover-organism (4394:56471) with no title or search,
one content-card-organism S row per person (avatar, name, role). Props: people [{ name, role, avatar }], query (text after
"@", filters by name), activeIndex, onPick(person), onActiveChange(i).
`function CommentMentionMenu({ people = [], query = '', activeIndex = 0, onPick, onActiveChange, className, style })`

### CommentCallout
**Tier:** Pattern helper
Pattern helper: thread callout — built from CommentThread + CommentMentionMenu.
The thread opened in place from a pin or a drawer row: kit CommentThread (comment-popover-organism) wired to this page's
thread state. Props: thread = { number, resolved, comments: [{ id, name, time, text, avatar, you, mentions }] },
currentUser { name, avatar }, people (mention list), onCommentsChange(comments), onResolve, onUnresolve, onCopyLink, onClose,
cooperSuggestion ({ label, onClick } — Action required threads), autoFocus.
The kit thread owns the look and menus: resolved = ⋯ (Unresolve, Copy link) + ✕ with Inactive avatars (12:44840);
unresolved = ⋯ (Copy link) + ✓ + ✕; own reply ⋯ = Edit / Delete; the composer's @ picker draws CommentMentionMenu.
`function CommentCallout({ thread, currentUser = { name: 'You' }, people = [], onCommentsChange, onResolve, onUnresolve, onCopyLink, onClose, cooperSuggestion, className, style })`

### CommentsPanel
**Tier:** Pattern helper
Pattern helper: Comments drawer list — built from Drawer + SegmentedControl + SmartSearch + CommentDrawerCard + EmptyState.
The Comments panel (Figma "Map - Overview - Comments panel unresolved" 12:34047): kit Drawer titled "Comments" with an
Unresolved | Resolved SegmentedControl, the SmartSearch "Ask anything about comments", and one CommentDrawerCard per thread,
newest first. Rows never expand: a click opens the thread's callout on the canvas (onOpen).
Props: threads [{ id, number, place, type: action|question|info, unread, resolved, comments }], filter / defaultFilter /
onFilterChange ('unresolved' | 'resolved'), selectedId, onOpen(thread), onResolve(thread), onUnresolve(thread),
onCopyLink(thread), onClose, currentUser (marks "(you)"), search(threads, query) (default searchComments), style, className.
Empty states (EmptyState, section): all resolved → "All comments have been resolved / Ready to proceed to review.";
search without match → "No results found" + "You might be looking for" chip; nothing resolved yet → inferred copy.
`function CommentsPanel({ threads = [], filter, defaultFilter = 'unresolved', onFilterChange, selectedId, onOpen, onResolve, onUnresolve, onCopyLink, onClose, currentUser = { name: 'You' }, search = searchComments, className, style })`

### useCommentThreads
**Tier:** Pattern helper
Pattern helper: thread state hook — no visuals.
Thread state for the pattern. Returns { threads, setThreads, open(id) (marks read — the blue dot goes), resolve(id) →
next unresolved id (Figma: resolving the selected comment selects the next unresolved one), unresolve(id),
setComments(id, comments), add(thread) (newest first, next number; starts read — it is the sender's own), unreadCount, unresolvedCount }.
`function useCommentThreads({ defaultThreads = [] } = {})`

### searchComments
**Tier:** Pattern helper
Pattern helper: comment search stand-in — plain function, no visuals.
"Ask anything about comments" (Figma note 247:229908): Cooper reads the query and returns the matching threads — by author,
status, time, element or content — as the same list with fewer items. This stand-in matches every meaningful word of the
query against author, number, place, type, time and text. Returns { results, suggestion } — suggestion = the closest term
found in the comments when nothing matches (Figma "You might be looking for").
`function searchComments(threads = [], query = '')`

## patterns-cooper

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-cooper.jsx

### CooperRecommendations
**Tier:** Pattern helper
CooperRecommendations — the recommendation flow (pattern component; Patterns "Recommendation" 67:108295).
List grouped by framework column → Shape walks through them one by one (detail: Decline / Do it) → Do it shows
"Working on it…" then confirms and moves to the next → all applied closes the window. Decline removes one from the queue;
Decline all dismisses the queue. Every recommendation is also saved as a chat in the Recommendations smart folder.
Props: recommendations / defaultRecommendations / onRecommendationsChange ([{ id, group, title, description, impact }]),
onApply(rec), onDecline(rec), onAsk (opens Cooper chat — the two are never open together), onClose, onDone, speed (ms of the applying step).
`function CooperRecommendations({ recommendations, defaultRecommendations = [], onRecommendationsChange, onApply, onDecline, onAsk, onClose, onDone, speed = 1200, style, className })`

### CooperHistory
**Tier:** Pattern helper
CooperHistory — chat history behaviour (pattern component; Patterns "history - …" sections 67:125364…67:129441).
Renders HistoryPanel (+ FolderContent when a folder is open) with the row menus, Select mode, rename, pin, move-to-folder,
delete (→ Trash, kept 30 days), folders (create with icon, rename, delete — chats inside are kept) and the search overlay.
Smart folders (Reminders / Recommendations / Trash) are system-managed: no rename/delete.
Props: chats / defaultChats / onChatsChange ([{ id, title, time, group, pinned, folder, smart:'reminders'|'recommendations', trashed, badge, due }]),
folders / defaultFolders / onFoldersChange ([{ id, name, icon }]), activeChatId, onOpenChat(id), onNewChat, onCollapse,
openFolder / defaultOpenFolder / onOpenFolderChange.
`function CooperHistory({ chats, defaultChats = [], onChatsChange, folders, defaultFolders = [], onFoldersChange, activeChatId, onOpenChat, onNewChat, onCollapse, openFolder, defaultOpenFolder = null, onOpenFolderChange })`

### ChatHeader
**Tier:** Component
Figma: chat-header-molecule (e559f9be1d186aeb756bdca63f2f9d0628d0b3e0) — "chat header" in the Patterns file (12:263805).
Props: title (chat name; "New chat" until Cooper finishes a first answer), size full|compact (Figma Type=Full panel / float-window:
the window button shows minimize vs maximize), newChat (Figma New chat=True hides the ⋯ more button),
onNewChat, onHistory, historyOpen (history button pressed), onResize, onMore, onClose (system-minus: collapses Cooper),
onDragStart (pointerdown on the title area — compact window is draggable).
`function ChatHeader({ title = 'New chat', size = 'full', newChat, onNewChat, onHistory, historyOpen, onResize, onMore, onClose, onDragStart, className, ...rest })`

### UserMessage
**Tier:** Component
Figma: user-message-molecule (24d3417689866a2cd7c3af335c0d617a276587e1) — "user-message-bubble" (12:263541).
Props: children = message text, size inline|multi (default: inline for short one-line text — Figma Size=Inline is a pill,
>1 line is radius 12), onEdit(text) (shows edit on hover; Figma State=editing has Cancel / Save), onCopy (copy on hover),
editing / defaultEditing / onEditingChange, state hover (gallery).
`function UserMessage({ children, size, onEdit, onCopy, editing, defaultEditing = false, onEditingChange, state, className, ...rest })`

### Attachment
**Tier:** Component
Figma: attachments (02356d2dc7c5…) with "Attachments Mini" chips — one uploaded file in the message input.
Props: name, meta (e.g. "PDF · 2 MB"), icon (default system-file), onRemove (✕ on the chip).
`function Attachment({ name, meta, icon = 'system-file', onRemove, className, ...rest })`

### TextMessageInput
**Tier:** Component
Figma: text-message-input-molecule (2f407b5b2a20…) — the chat composer in compact/full panels (Patterns 67:120307).
States follow the content: Default (placeholder, mic only) → Typing (send arrow appears) → Typing multi-line (radius 12, buttons
below) → Analyzing (send becomes Stop while Cooper works). Enter sends, Shift+Enter adds a line.
Props: value / defaultValue / onChange, onSend(text, attachments), analyzing + onStop, placeholder, onAttach (+), onVoice (mic → voice mode),
attachments [{ id, name, meta }] + onRemoveAttachment(id) (a file switches the input to multi-line; max height 400px then scroll),
state typing|multi|analyzing|pressed (gallery), autoFocus.
`function TextMessageInput({ value, defaultValue = '', onChange, onSend, analyzing, onStop, placeholder = 'Ask a follow-up', onAttach, onVoice, attachments = [], onRemoveAttachment, state, autoFocus, className, ...rest })`

### VoiceMessageInput
**Tier:** Component
Figma: voice-message-input-molecule (b66c51b2fbcf…) (Patterns 67:107207). Voice mode composer: + · dot-wave · keyboard.
Props: state default|speaking|analyzing (Speaking animates the wave — Icon voice-input-animation variant True; Analyzing adds Stop),
onAttach, onKeyboard (switch to text), onStop.
`function VoiceMessageInput({ state = 'default', onAttach, onKeyboard, onStop, className, ...rest })`

### SpeakingControl
**Tier:** Component
Figma: speaking-control-molecule (agent-window header) — Cooper reads its message aloud; pause/resume.
Props: speaking / defaultSpeaking / onSpeakingChange.
`function SpeakingControl({ speaking, defaultSpeaking = true, onSpeakingChange, className, ...rest })`

### ChatCard
**Tier:** Component
Figma: chat-card-molecule (4153e3d4b49c…) (Patterns 67:120468). Cards inside a Cooper answer.
Props: type scenario|metric. Scenario: title, receipt (show-receipt), badges (labels → Badge White M with the star icon),
meta (strings joined by dots, e.g. ["$3.2M","2yr","saved 3:44 AM"]). Metric: category, value. onClick makes the card a button.
`function ChatCard({ type = 'scenario', title, receipt, badges = [], meta = [], category, value, onClick, className, ...rest })`

### ChatLink
**Tier:** Component
Figma: chat-link-molecule (d581a966d6ef…) "chat-link-item" (Patterns 12:265109) + chat-link-item/Default/source (16:18275).
Props: children = label, type follow-up|source (follow-up: ↳ arrow; clicking sends it as a new message. source: "[n]" number),
number (source), onClick, state hover (gallery).
`function ChatLink({ children, type = 'follow-up', number, onClick, state, className, ...rest })`

### CooperProgress
**Tier:** Pattern helper
Cooper progress line (Patterns "Cooper Message content" 67:134213): "Cooper is working on it (Step n/total): <step name>".
The total is per run (2 for a simple question, 3–4 for widgets/alternatives); only the text changes between steps.
Props: step, total, label, live (shimmer while running; frozen when stopped).
`function CooperProgress({ step = 1, total = 3, label = 'Reviewing framework structure', live = true, className, ...rest })`

### CooperMessage
**Tier:** Pattern helper
Cooper message (answer bubble). Anatomy (Figma dev note, 67:134213), top to bottom — a block with no content is hidden with its header:
1 "Analyzed your request" (collapsible reasoning; collapsed by default once the answer is complete),
2 content (text, cards, metrics, actions, supporting evidence), 3 follow-ups (hidden while clarifying options show),
4 clarifying options (selecting one sends it as the user's reply).
Props: status analyzing|streaming|answered|stopped|error|offline, step {n,total,label} (analyzing / stopped while analysing),
reasoning (strings), reasoningOpen / defaultReasoningOpen, text (answer text), streamed (chars shown while streaming),
scenarios { title, aside, cards:[ChatCard props], actions:[{label,onClick}] }, metrics [{category,value}], insight { title, text },
sources [{label}] (Supporting evidence), followUps (strings) + onFollowUp(text), options { title, intro, items } + onOption(text),
onRetry (error/offline/stopped-before-answer: "Try again"), onRegenerate (stopped mid-stream), children (extra content).
`function CooperMessage({ status = 'answered', step, reasoning = [], reasoningOpen, defaultReasoningOpen = false, onReasoningOpenChange, text, streamed, scenarios, metrics, insight, sources, followUps = [], onFollowUp, options, onOption, onRetry, onRegenerate, children, className, ...rest })`

### ChatCollapsedBar
**Tier:** Component
Figma: chat-collapsed-bar-organism (cf1fb8a41862…) — "chat-inline-quick-mode" (Patterns 12:263488). 320px pill above the bottom sheet.
Props: type voice|text|fab (Figma Type: Voice opens by default; FAB button = Cooper avatar only),
value / defaultValue / onChange (text), onSend(text), onTypeChange(type) (mic ↔ keyboard), onAttach, onExpand (hover control:
"Expand to floating window"), speech (voice transcript; replaces the placeholder while the user talks), onFab (type=fab),
state hover (gallery). Text over one line switches to the multi-line layout (radius 12).
`function ChatCollapsedBar({ type = 'voice', value, defaultValue = '', onChange, onSend, onTypeChange, onAttach, onExpand, speech, onFab, state, autoFocus, className, style, ...rest })`

### ChatCompactPanel
**Tier:** Component
Figma: chat-compact-panel-organism (e56a350db527…) — "floating-window" (Patterns 12:263560). 320×360 floating window.
Props: type voice|text, title, newChat, children (conversation: UserMessage / CooperMessage; omit for the empty state),
speech (voice transcript shown large while the user talks), input: inputValue/onInputChange/onSend/analyzing/onStop/attachments/
onRemoveAttachment/onAttach/onTypeChange, onFiles(files) (drag & drop → Figma State=Drop file), dropping (forced),
header: onNewChat/onHistory/onResize (→ full panel)/onMore/onClose, onDragStart (drag the window by its title).
`function ChatCompactPanel(props) { return <ChatPanel size="compact" {...props} />; }`

### ChatFullPanel
**Tier:** Component
Figma: chat-full-panel-organism (1b6802cb1c70…) — "right-side-panel-chat" (Patterns 67:119975 / 67:120161). 450px docked side panel.
Same props as ChatCompactPanel plus prompts (Figma show-chips: PromptButton L in the empty state) + onPrompt,
historyOpen, onResizeStart (pointerdown on the left edge: drag to make the panel wider/narrower).
`function ChatFullPanel(props) { return <ChatPanel size="full" {...props} />; }`

### FolderItem
**Tier:** Component
Figma: folder-item (3f47ea5f2935…) (Patterns 12:264108). One row in history: smart folder, user folder, Search, Start new chat.
Props: icon (default chat-folder), children = name, count (Show counter), active, onClick, onMore (⋯ on hover),
selectable + selected + onSelectedChange (multi-select mode: checkbox replaces the icon), renaming + onRename(name) + onCancelRename,
state hover (gallery).
`function FolderItem({ icon = 'chat-folder', iconVariant, children, count, active, onClick, onMore, selectable, selected, onSelectedChange, renaming, onRename, onCancelRename, state, className, ...rest })`

### SectionHeader
**Tier:** Component
Figma: section-header (a638f470f66c…) (Patterns 12:264342). "Folders 5" / "Chats 35" heading in history.
Props: heading, count (Show counter), icon (Figma shows chat-history; omit to hide), actions [{ icon, label, onClick }] (Show actions, on hover).
`function SectionHeader({ heading, count, icon, actions = [], state, className, ...rest })`

### ChatHistoryCard
**Tier:** Component
Figma: chat-history-card (a81629cbaf9e…) (Patterns 12:264367). One chat in history.
Props: title, time ("3h ago", "Mar 26"), pinned (Type=pinned: pin icon), active (open chat), onClick, onMore (⋯ on hover — replaces the time),
selectable/selected/onSelectedChange (Select mode), renaming/onRename/onCancelRename, state hover (gallery).
`function ChatHistoryCard({ title, time, pinned, active, onClick, onMore, selectable, selected, onSelectedChange, renaming, onRename, onCancelRename, state, className, ...rest })`

### SearchChatHistoryCard
**Tier:** Component
Figma: search-chat-history-card (94783d9b1419…) (Patterns 67:120339). A search hit: title with the query highlighted, time,
currentChat (badge "Current" — Figma current chat?), onClick.
`function SearchChatHistoryCard({ title, query = '', time, currentChat, onClick, state, className, ...rest })`

### ChatReminderCard
**Tier:** Component
Figma: chat-reminder-card (0dd1e3f87389…) (Patterns 12:265339). A chat with a reminder in the Reminders smart folder.
Props: title, badge ("In 4 days" — Badge Black M), due ("May 2"), active, onClick, onMore (hover).
`function ChatReminderCard({ title, badge, due, active, onClick, onMore, state, className, ...rest })`

### HistoryPanel
**Tier:** Component
Figma: history-panel-molecule (a0999afa6b27…) — "chat history" (Patterns 12:264137). 240px column docked left of the full panel.
Props: chats [{ id, title, time, group today|week|earlier, pinned }], folders [{ id, name, count, icon }], smart { reminders, recommendations, trash } counts,
activeChatId, onOpenChat(id), onNewChat, onSearch, onOpenFolder(id) ('reminders'|'recommendations'|'trash'|folder id), onCollapse,
folderLimit (default 3: "See all" expands), onFolderMore(folder, event), onChatMore(chat, event), onFoldersMore(event), onChatsMore(event),
selecting ('chats'|'folders'|null) + selected (ids) + onSelectedChange(ids), renamingId + onRename(id, name) + onCancelRename,
footer (node — e.g. the Move / Delete bar in Select mode). Empty chats → Figma Property 1=empty.
`function HistoryPanel({ chats = [], folders = [], smart = {}, activeChatId, onOpenChat, onNewChat, onSearch, onOpenFolder, onCollapse, folderLimit = 3, onFolderMore, onChatMore, onFoldersMore, onChatsMore, selecting, selected = [], onSelectedChange, renamingId, onRename, onCancelRename, footer, className, ...rest })`

### FolderContent
**Tier:** Component
Figma: folder content (3194c4515e7f…) (Patterns 12:264418). Second 240px column listing one folder's chats.
Props: type general|reminders|insight|trash (Smart folders reminders/insight(Recommendations)/trash are system-managed),
title, children (rows: ChatHistoryCard / ChatReminderCard), count, onBack (general folders), onMore, onCollapse, empty (text).
`function FolderContent({ type = 'general', title, count, children, onBack, onMore, onCollapse, empty = 'This folder is empty', className, ...rest })`

### ConfirmDeleteCard
**Tier:** Component
Figma: confirm-delete-card-molecule — one selected item listed in a Delete / Move modal; ✕ deselects it (the item is not deleted).
Props: children = name, icon (optional), onRemove.
`function ConfirmDeleteCard({ children, icon, onRemove, className, ...rest })`

### HistorySearch
**Tier:** Pattern helper
History search overlay (Patterns "History- search" 67:125364): search field + results grouped by time, matches highlighted.
Props: chats (as HistoryPanel), query / defaultQuery / onQueryChange, onOpenChat(id), onClose, activeChatId.
`function HistorySearch({ chats = [], query, defaultQuery = '', onQueryChange, onOpenChat, onClose, activeChatId, className, ...rest })`

### CooperMenu
**Tier:** Pattern helper
Pattern helper: action menu for history rows — built from Menu, anchored at the clicked ⋯ (a DOMRect) so the scroll area can't clip it.
Props: anchor (DOMRect), items [{ icon, label, onClick, hidden, danger }], onClose.
`function CooperMenu({ anchor, items = [], onClose })`

### AgentWindow
**Tier:** Component
Figma: agent-window-organism (31ba15a9885c…) (Patterns 12:264637 / "agent-window" 12:32092). Cooper's proactive window for recommendations.
Props: view expanded|collapsed (Figma View), speaking / defaultSpeaking / onSpeakingChange (speaking-control), text (insight text),
children (Content slot), secondaryAction / tertiaryAction = { label, onClick } (footer buttons; Figma Show all buttons), onAsk ("Ask" →
opens the Cooper chat; recommendations and chat are never open together), onViewChange(view), onClose.
`function AgentWindow({ view, defaultView = 'expanded', onViewChange, speaking, defaultSpeaking = true, onSpeakingChange, text, children, secondaryAction, tertiaryAction, onAsk, onClose, className, style, ...rest })`

### RecommendationImpact
**Tier:** Pattern helper
Impact table of a recommendation: the two metrics the backend marks as most affected (Figma note: the UI renders whichever two are passed).
Props: rows [{ label, value, delta }].
`function RecommendationImpact({ rows = [] })`

### RecommendationGroup
**Tier:** Pattern helper
Recommendation group (Figma: Slot with Caption title + counter inside agent-window). Props: title, count, children (RecommendationItems).
`function RecommendationGroup({ title, count, children })`

### RecommendationItem
**Tier:** Pattern helper
Recommendation item — Figma "list-item" (68fd47d4cc84…, = capex-card in IFS DS) inside agent-window: caret + title; expanded shows
description, impact table and an action (Explore). Props: title, description, impact rows, expanded / defaultExpanded / onExpandedChange,
action = { label, onClick } (default Explore).
`function RecommendationItem({ title, description, impact = [], expanded, defaultExpanded = false, onExpandedChange, action, className, ...rest })`

### RecommendationDetail
**Tier:** Pattern helper
One recommendation in Shape mode (Figma "Shape mode expanded" 67:108940): Back, title, description, impact, Decline / Do it.
Props: title, description, impact, onBack, onDecline, onApply.
`function RecommendationDetail({ title, description, impact = [], onBack, onDecline, onApply })`

### CooperChat
**Tier:** Pattern helper
CooperChat — the whole Cooper chat behaviour (pattern component; Patterns "Chat" section 67:121910).
Sizes: closed (avatar + prompt chips in the bottom sheet) → bar (chat-collapsed-bar, voice by default) → compact (floating window)
→ full (docked side panel). Sending a message adds a UserMessage, then a CooperMessage that runs Analysing (Step n/total) →
Streaming → Answered; Stop interrupts (keeps the user message; partial answer stays + Regenerate; before any text: Try again).
Props: size / defaultSize / onSizeChange ('closed'|'bar'|'compact'|'full'), mode / defaultMode ('voice'|'text'),
messages / defaultMessages / onMessagesChange ([{ id, role:'user'|'cooper', text, status, ... }]), answer(q) → answer data
(default canned answers), prompts (empty-state chips in the full panel), renderPanel (wrap the full panel, e.g. with HistoryPanel),
onHistory, historyOpen, speed (ms per streamed word, default 40; 0 = instant), position {right,bottom} for bar/compact,
fullInset (px around the docked panel), title / defaultTitle / onTitleChange, onNewChat,
apiRef receives { send(question), setSize(size) } — e.g. bottom-sheet prompt chips send straight into the chat.
`function CooperChat({ size, defaultSize = 'closed', onSizeChange, mode, defaultMode = 'voice', onModeChange, messages, defaultMessages = [], onMessagesChange, answer, prompts = ['Highlight all my transformers for me in this area', 'I want to explore flood risks along the coast', 'What happens if I don\'t act?'], onHistory, historyOpen, renderPanel, speed = 40, position = { right: 60, bottom: 131 }, fullInset = 8, title, defaultTitle = 'New chat', onTitleChange, onNewChat, apiRef, className })`

### 
**Tier:** Pattern helper
Figma: chat-header-molecule (e559f9be1d186aeb756bdca63f2f9d0628d0b3e0) — "chat header" in the Patterns file (12:263805).
Props: title (chat name; "New chat" until Cooper finishes a first answer), size full|compact (Figma Type=Full panel / float-window:
the window button shows minimize vs maximize), newChat (Figma New chat=True hides the ⋯ more button),
onNewChat, onHistory, historyOpen (history button pressed), onResize, onMore, onClose (system-minus: collapses Cooper),
onDragStart (pointerdown on the title area — compact window is draggable).
`function ChatHeader({ title = 'New chat', size = 'full', newChat, onNewChat, onHistory, historyOpen, onResize, onMore, onClose, onDragStart, className, ...rest })`

## patterns-documents

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-documents.jsx

### MapPinDot
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: map-pin-dot (key d2686af3…; Patterns copy 12:107153, Figma set name "dot-pin").
A round status marker: counts on clusters (text) or a status glyph (icon) at map points.
Props: size l (32) | m (24) | s (16) | xs (8), status error|warning|success (Figma Success is drawn grey: map-pin/fill/default),
type text|icon, counter (Figma "counter"; shown on L/M only), icon (type=icon glyph, default system-close),
highlight (Figma higlight=yes: glow ring), selected / defaultSelected / onSelectedChange (click toggles),
dimmed (Figma state=out of hover), label (accessible name), state default|selected|out-of-hover (forced, gallery).
`function MapPinDot({ size = 'm', status = 'error', type = 'text', counter = '999', icon = 'system-close', highlight, selected, defaultSelected = false, onSelectedChange, dimmed, label, state, className, onClick, ...rest })`

### MapPinDefect
**Tier:** Component
Figma: map-pin-defect (key 91cf9e42…; Patterns copy 12:106855, set name "Defect").
A weather/hazard defect at a point. Props: type cyclone|flood|heat|storm (icon map-risk-<type>),
state confirmed (red) | unconfirmed (amber) | monitoring (green), label, onClick (renders a button).
`function MapPinDefect({ type = 'cyclone', state = 'confirmed', label, onClick, className, ...rest })`

### MapPinFlow
**Tier:** Component
Figma: Electric Flow Direction Indicator (key a6c2010c…; Patterns copy 12:107306) — "map-pin-flow".
The small arrowhead drawn along a circuit to show the direction power flows. Props: type default|error,
rotate (degrees; the arrow points right at 0), label.
`function MapPinFlow({ type = 'default', rotate = 0, label = 'Flow direction', className, style, ...rest })`

### MapPinPole
**Tier:** Component
Figma: map-pin-pole (key b548a660…; Patterns copy 12:107120, set name "Pole").
A labelled asset on a circuit: a symbol above a number / name label.
Props: symbol pin|defect|dot|hierarchy-pin, number (Figma Number, the label), showNumber (default true),
pin (Figma bool "Pin": false hides the symbol — numbered poles along a route), selected / defaultSelected / onSelectedChange,
pinIcon (symbol=pin: the white asset icon; Figma Pin types Dum/Village/Station/… are drawn art, pass the nearest asset icon),
pinStatus neutral|error|warning|evaluated, hierarchy group|segment|structure (symbol=hierarchy-pin: asset-<type> icon),
defect = MapPinDefect props (symbol=defect), state default|selected (forced, gallery), label (accessible name).
`function MapPinPole({ symbol = 'pin', number = '235', showNumber = true, pin = true, selected, defaultSelected = false, onSelectedChange, pinIcon = 'asset type-substation', pinStatus = 'neutral', hierarchy = 'group', defect, state, label, className, onClick, ...rest })`

### BarChartItem
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: bar-chart-item (key 44fcce06…; Patterns copy 12:107849). One filled segment of a bar chart.
Props: color 1–9 (Figma colour index → data-viz/data-N), fill (any CSS colour/var — overrides color; the pattern
screens bind data-viz/muted purple/data-4), number (Figma bool, show the label, default true), children = label (default "40%").
`function BarChartItem({ color = 1, fill, number = true, children = '40%', className, style, ...rest })`

### VerticalBarChartItem
**Tier:** Component
Figma: vertical-bar-chart-item (key c06b1d19…; Patterns copy 12:107877). A stacked column of bar-chart-items
(2px gap and padding). Figma default-1 / default-2 are sample stacks; active adds the focus-outer ring.
Props: segments = [{ value, color, fill, label }] top → bottom (heights ∝ value; label shown when given),
value = column total as a share of `max` (height of the filled part; default: full), max, height (default 200), width (104),
active / defaultActive / onActiveChange (click toggles, renders a button when onActiveChange or onClick is set), state active (forced).
`function VerticalBarChartItem({ segments = [{ value: 1, color: 4 }], value, max, height = 200, width = 104, active, defaultActive = false, onActiveChange, onClick, state, label, className, style, ...rest })`

### useDocuments
**Tier:** Pattern helper
useDocuments — the state and rules behind the pattern. Pass the returned controller to the components below.
Options: documents / defaultDocuments / onDocumentsChange (rows: { id, name, date (Date or "Jan 15, 2026"), size, status done|uploading|error, file }),
editable (default true; false = read-only: no upload, no drop, no more menu — Download only), formats (default PDF DOCX XLSX PPTX TXT CSV),
maxSize (bytes, default 25 MB — inferred), uploadMs (simulated upload time, default 1200), shouldFail(file) → true simulates a network failure,
required (Cooper context required: progress bar until coverage 100), coverage (0–100; default 25 per usable document — inferred),
onOpen(doc) (default: opens the file in a new window), onDownload(doc), onRemove(doc), searchThreshold (default 10).
Returns: { docs, count, uploading, editable, required, coverage, open, setOpen, addFiles, remove, retry, openDoc, download,
  feedback, dismiss, dragItems, dragSource(file), failNext / setFailNext, searchThreshold, formats, maxSize }.
`function useDocuments({ documents, defaultDocuments = [], onDocumentsChange, editable = true, formats = DOC_FORMATS, maxSize = 25 * 1048576, uploadMs = 1200, shouldFail, required = false, coverage, onOpen, onDownload, onRemove, searchThreshold = 10 } = {})`

### DocumentRow
**Tier:** Pattern helper
Pattern: DocumentRow — one document in the list: FileCard (middle-truncated name with tooltip) + a ⋮ Menu or a Download button.
Props: doc { name, date, status done|uploading|error }, editable (more menu with Download / Remove; false = Download icon only),
onOpen (click / Enter: preview in a separate window), onDownload, onRemove, onRetry (error row: "Try again"),
state hover|menu (forced, gallery).
`function DocumentRow({ doc, editable = true, onOpen, onDownload, onRemove, onRetry, state, className, ...rest })`

### DocumentsPopover
**Tier:** Pattern helper
Pattern: DocumentsPopover — popover-organism titled "Documents" with the counter, the rows (newest first),
search from `searchThreshold` (10) documents, "No results found", max height 360 then scroll.
Props: documents (rows), count (usable documents; default = done rows), editable, onClose, onOpen, onDownload, onRemove, onRetry,
searchThreshold, defaultQuery, width (300), className, style.
`function DocumentsPopover({ documents = [], count, editable = true, onClose, onOpen, onDownload, onRemove, onRetry, searchThreshold = 10, defaultQuery = '', width = 300, className, style })`

### DocumentsContext
**Tier:** Pattern helper
Pattern: DocumentsContext — the left side of the value bottom sheet: "Cooper's Context", the progress bar (required context,
until 100 %), the documents button ("1 Document" / "N Documents"; hidden at 0; spinner while uploading), the Upload icon-button
(editable only) and the popover 4px above the bar (portalled, fixed). Pass it as BottomSheet `left`.
Props: controller (useDocuments()), popoverOffset (px from the bar's left edge, default 12), title (default "Cooper's Context").
`function DocumentsContext({ controller: c, popoverOffset = 12, title = "Cooper's Context", className })`

### DocumentsDropArea
**Tier:** Pattern helper
Pattern: DocumentsDropArea — wraps the content region. While files are dragged over it (editable only) it shows the purple dashed
overlay (kit DropZone = move-and-drop-background / change-position-overlay) and, for in-app drags started with controller.dragSource(file),
node-card Type=Document ghosts at the cursor. Drop = upload. Read-only records ignore drops.
Props: controller, children, className, style.
`function DocumentsDropArea({ controller: c, children, className, style, ...rest })`

### DocumentsFeedback
**Tier:** Pattern helper
Pattern: DocumentsFeedback — top-right stack under the page header (place it inside the screen, which must be position:relative).
Errors = alert-organism Type=Error with the error icon; they don't auto-dismiss and close on ✕ or on the user's next action.
"Several files, some rejected" adds "See details" (a modal listing each rejected file and why).
Removal = snackbar-organism "The document has been removed" + Undo: 4 s, paused on hover/focus, ✕ dismisses.
Props: controller, top (px, default 88 = under nav bar + page header).
`function DocumentsFeedback({ controller: c, top })`

## patterns-evidence

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-evidence.jsx

### SourceCard
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: source-card (fafdbabda4e12538ef46da239997daad283c2291; IFS DS 1440:5362). The Patterns file instances older copies
of the set: "Property 1=Default" (file + quote + badge, 12:192928), "Variant2" (file + plain text + badge, 12:192934),
"Variant3" (user + quote, 31:74319) and a second "source card" set "State=Default" (label + quote, 31:74840).
One piece of evidence behind a Cooper value: where it came from, what it says, and what it supports.
Props: type file|user (Figma Type) — file: `title` on a Tertiary S button (icon, default system-file; null = label only),
  onOpen opens the source; user: `user` = Avatar props ({ name, initials, type }) + name (Heading/H3/medium).
content quote|text (Figma Content: quote = left rule + inset, text = plain paragraph), children = the excerpt,
badge = label (or { label, icon }) of the claim it supports (badge-atom black S, info colour, system-access-point),
loading (Figma Loading=True skeleton).
`function SourceCard({ type = 'file', title, icon = 'system-file', onOpen, user, content = 'quote', children, badge, loading, className, ...rest })`

### EvidenceSection
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Figma: the "Slot" blocks of the Evidence chain drawer (Patterns 31:76667 / 31:76673 / 31:76678): a 1px top rule, a
Caption/regular-UPPER title and a list of source cards (8px apart). Titles in Figma: "Why it's flagged", "Decisions",
"Considered but not included". Props: title, items = [SourceCard props + key] or children.
`function EvidenceSection({ title, items, children, className, ...rest })`

### PeerBenchmark
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Figma: Peer benchmark tab of the Evidence chain drawer (Patterns 31:77627; empty 297:76637).
Props: description (Body/M, secondary), summary = [{ label, value }] (key/value rows under "Summary"),
scope = { label, value, legend: [{ label, color }], columns: [{ label, segments: [{ value, color }] }] (top → bottom),
  max (y-axis top, default 100), ticks (default 100…0 by 20), yTitle ('Number of utilities'), xTitle ('Years') },
empty (true → "Peer benchmark isn't available" empty state; no action — nothing the user does fills it),
emptyHeading / emptyBody to override the copy.
`function PeerBenchmark({ description, summary = [], scope, empty, emptyHeading = 'Peer benchmark isn’t available', emptyBody = 'There are too few comparable ideas to compare fairly. Cooper won’t show a benchmark it can’t stand behind.', className, ...rest })`

### EvidenceButton
**Tier:** Pattern helper
Figma: the circle Tertiary S icon-button with the Cooper evidence icon (content-card-organism show-icon-button,
panel-organism show-evidence-chain). The trigger sits next to every field, block or card Cooper filled in.
Props: onClick, active (the chain for this value is open → aria-expanded), label (accessible name).
`function EvidenceButton({ onClick, active, label = 'Evidence chain', className, ...rest })`

### EvidenceChainDrawer
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Figma: drawer-organism "Evidence chain" (Patterns 31:76682; same content in modal-organism 297:76633 on the empty-state frames).
The floating drawer that shows the sources and reasoning steps behind one Cooper value (glass box).
Header "Evidence chain" + ✕; content: EvidenceStrength (no title; captions <70% Reject · {value}% Review · >90% Approve),
SegmentedControl S Rationale | Peer benchmark, then the tab:
  Rationale = EvidenceSection list (`rationale` = [{ title, items: [SourceCard props] }]) — never empty;
  Peer benchmark = PeerBenchmark props (`benchmark`; null/{ empty: true} → empty state, tab stays selectable).
Props: open / defaultOpen / onOpenChange (✕ and Esc close), value (confidence %), thresholds,
tab / defaultTab ('rationale') / onTabChange, title, floating (slide-in animation), className, style.
Placement is the screen's job: it floats over the content, top-right, 12px in (see the pattern screens).
`function EvidenceChainDrawer({ open, defaultOpen = true, onOpenChange, value = 87, thresholds = [70, 90], tab, defaultTab = 'rationale', onTabChange, rationale = [], benchmark, title = 'Evidence chain', floating = true, className, style })`

### evidenceZone
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Confidence zones (Figma dev note 31:79279): <70 % Reject, 70–90 % Review, >90 % Approve. Boundaries follow EvidenceStrength
(value < 70 reject, < 90 review, else approve) so the bar and the behaviour never disagree. Returns { zone, label, autoApply, behaviour } for a value. Thresholds are the EvidenceStrength defaults.
`function evidenceZone(value, thresholds = [70, 90])`

## patterns-nav-bar

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-nav-bar.jsx

### NavBarCollapsed
**Tier:** Component
Figma: nav-bar-organism Type=Collapsed (12:2340) / Type=Collapsed opened (12:2352) — key 9083880d…
The Level-1 bar when the stage tabs don't fit: logo, a hamburger (icon-button Secondary S, system-hamburger-menu) in the
Pages slot, and the same Actions slot. Opened = single-select-list-molecule (240 wide, L rows, check on the current stage)
4px under the hamburger. Picking a stage closes the list. Escape / outside click close it; arrows move, Enter picks.
Props: stages [{ value, label, disabled }], value / defaultValue / onChange, open / defaultOpen / onOpenChange,
logo (node), onSearch, onSettings, onNotifications, hasNotifications, user = { initials, name } or avatar (node),
actions (node: replaces search/settings/bell), menuLabel (hamburger name, default "Stages").
`function NavBarCollapsed({ stages = NB_STAGES, value, defaultValue, onChange, open, defaultOpen = false, onOpenChange, logo, onSearch, onSettings, onNotifications, hasNotifications, user, avatar, actions, menuLabel = 'Stages', className, ...rest })`

### ResponsiveNavBar
**Tier:** Pattern helper
Pattern: ResponsiveNavBar — nav-bar-organism that switches Type=Default (IFS.NavBar, stage tabs) ↔ Type=Collapsed
(NavBarCollapsed, hamburger) by its own width. The stage value is shared, so switching keeps the current stage.
Props: everything NavBar / NavBarCollapsed take, plus collapseBelow (px, default 800 — inferred: the Default bar needs
~770px for logo + six tabs + actions), collapsed (force true/false; omit = by width).
`function ResponsiveNavBar({ stages = NB_STAGES, value, defaultValue, onChange, collapseBelow = 800, collapsed, className, style, ...rest })`

### ExploreHeader
**Tier:** Component
Figma: explore-header (key ae9026ad…; Patterns copy 12:175111) — the 40px bar under the nav bar on the Explore map.
Left (Figma "Content right slot"): smart-search-organism (248 wide, 28 tall, "Search for…") + icon-button-filter (round, 28).
Right ("container-left"): collaborators button (Button Tertiary S, users-group, "3/5") + icon-button-comment.
Props: search = SmartSearch props (placeholder, onSubmit, suggestions…), onFilter, filtersApplied (filter dot),
collaborators (label, default "3/5"; null hides), onCollaborators, onComments, hasNewComments, children (extra left content),
actions (node: replaces the right side).
`function ExploreHeader({ search = {}, onFilter, filtersApplied, collaborators = '3/5', onCollaborators, onComments, hasNewComments, children, actions, className, ...rest })`

### HomeRowCard
**Tier:** Component
Figma: home-row-card-organism (key c497ce96…; Patterns copy 244:117301). One ranked item on the Command (home) list.
Type=Primary (124 tall: the top item; copper→white gradient stroke, metrics under the text, media on the right) |
Secondary (72 tall: metrics in their own columns). State Default | Hover | Loading | Focus.
Props: type primary|secondary, rank (counter-atom S), title, badge (label → badge-atom White S), description,
metrics [{ value, label }] (show-metric; Figma shows two: CPV and V/C), liveAlert = MapPinDefect props (show-live-alert),
collaboration = Avatar props (show-collaboration), media (node: primary right side, e.g. a map), onOpen (card + arrow button),
openLabel (arrow name, default "Open"), loading, state hover|focus (forced, gallery).
`function HomeRowCard({ type = 'secondary', rank, title, badge, description, metrics = [], liveAlert, collaboration, media, onOpen, openLabel = 'Open', loading, state, className, ...rest })`

### SideNavTree
**Tier:** Pattern helper
Pattern: SideNavTree — navigation-panel-organism (sidebar-organism View=Expanded/Collapsed) whose Content slot holds a
folder tree, as the Plan stage draws it (Patterns 244:120655). Same shell as IFS.SideNav (title H3/UPPERCASE + collapse).
Tree row: 32px, padding 8/8/8/4, caret (folders) + chat-folder 16 + Body/M/medium label; children indent 18px with a
hairline guide. The open path (folders above the current row) gets a border/base outline; the current row also the
background/elevation-1/secondary fill. Sections (e.g. "Ad hoc plans") = NavSubtitle + flat rows.
Props: title, tree [{ id, label, folder (default: has children), children: [...] }], sections [{ label, action, items: [{ id, label }] }],
value / defaultValue / onSelect(id, item), expanded / defaultExpanded (ids) / onExpandedChange,
collapsed / defaultCollapsed / onCollapsedChange.
`function SideNavTree({ title, tree = [], sections = [], value, defaultValue, onSelect, expanded, defaultExpanded = [], onExpandedChange, collapsed, defaultCollapsed = false, onCollapsedChange, className, ...rest })`

### StagedAppShell
**Tier:** Pattern helper
Pattern: StagedAppShell — the three-level navigation model as one working shell: the L1 nav bar (ResponsiveNavBar) picks the
stage; each stage brings its own L2 sidebar, header, content and bottom sheet (IFS.AppShell slots). Below `collapseSideBelow`
the sidebar is handed `narrow: true` so it can start collapsed (icon rail) — inferred from the Navigation page rule
"the sidebar collapses to an icon rail on narrow widths before it disappears".
Props: stages, value / defaultValue / onChange (stage), screens = { [stage]: { sideNav, header, bottom, content } } where each
entry may be a node or a function ({ stage, narrow, width }) → node; navBar = extra ResponsiveNavBar props;
collapseNavBelow (default 800), collapseSideBelow (default 1280, inferred), height.
`function StagedAppShell({ stages = NB_STAGES, value, defaultValue, onChange, screens = {}, navBar = {}, collapseNavBelow = 800, collapseSideBelow = 1280, height, className, style, ...rest })`

## patterns-table

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-table.jsx

### SmartSearch
**Tier:** Component
───────────────────────────── smart-search-organism ─────────────────────────────
Figma: smart-search-organism (2145:3758) — the Cooper "Ask anything…" bar (shown in older screens as "ai smart search").
Props: type text|voice / defaultType / onTypeChange (Text shows the mic button, Voice shows the keyboard button and listens),
placeholder, value / defaultValue / onChange(value), onSubmit(value) on Enter or suggestion pick, onClear,
suggestions (strings or {label,type,query}; shown in a search-modal while focused), suggestionsTitle, listening (voice: "…" state),
disabled, width (default 360, Figma), size l (40, default) | s (28 tall, padding 8/0/8/8, 28px mic: the explore-header instance),
state hover|focus|pressed (gallery only), aria-label.
Ask a natural-language question here; for keyword search over a list use IFS.Search (search-regular-organism).
`function SmartSearch({ type, defaultType = 'text', onTypeChange, placeholder = 'Ask anything…', value, defaultValue = '', onChange, onSubmit, onClear, suggestions, suggestionsTitle = 'Suggested questions', listening, disabled, width = 360, size = 'l', state, className, style, 'aria-label': ariaLabel, ...rest })`

### SearchModal
**Tier:** Component
───────────────────────────── search-modal ─────────────────────────────
Figma: search-modal (d983e4df9bce16881c039833e232fa5916931330) — the suggestion list under the smart search.
Props: title (default "Suggested questions"), items = strings or { label, type, query }, activeIndex, onSelect(label, index),
maxHeight (Figma scroll bar 248), inline (static position — gallery), id (listbox id for aria-controls).
`function SearchModal({ title = 'Suggested questions', items = [], activeIndex = -1, onSelect, maxHeight = 248, inline, id, className, style })`

### SearchCard
**Tier:** Component
───────────────────────────── search-card ─────────────────────────────
Figma: search-card (205664d0d5dfd2acdd85ee23fe6e02618941b691) — one row of the smart-search suggestion list.
Props: type suggest|user-query (user-query = the typed text in primary + the suggested completion in tertiary),
children = suggestion text, query (user-query: the typed part), active (keyboard highlight = Figma hover), state hover (gallery), onClick.
`function SearchCard({ type = 'suggest', query, children, active, state, className, ...rest })`

### FollowButton
**Tier:** Component
───────────────────────────── icon-button-following ─────────────────────────────
Figma: icon-button-following (c0ebbac2a918ba61c650647fc685736391388744) — follow / unfollow a record (ghost S icon button).
Props: following / defaultFollowing / onChange(following), disabled.
`function FollowButton({ following, defaultFollowing = false, onChange, label, className, ...rest })`

### ColumnFilter
**Tier:** Pattern helper
Column filter panel — single-select-list-molecule (153:62054) holding chips (832:235895) and, per column kind,
a custom period (DatePicker range), a search field (search-regular-organism) or a From/To range.
Props: title ("Filter"), options [{ value, label }] (chips; "All" is added first and is on when nothing is selected),
value [] / defaultValue / onChange(values), multiple (default true; false = presets, one at a time),
period { value, onChange, placeholder } (custom period; combines with chips by AND), search { placeholder } (filters the chips),
range { value: { from, to }, onChange, step, min, max, unit } (numeric columns: never combined with chips),
onClearAll, inline (gallery), width (default 240).
`function ColumnFilter({ title = 'Filter', options = [], value, defaultValue = [], onChange, multiple = true, period, search, range, onClearAll, width = 240, inline = true, className, style })`

### CollaborationBadge
**Tier:** Pattern helper
───────────────────────────── Collaboration badge ─────────────────────────────
Collaboration column cell: badge-atom (Color=White, M, show-avatar) that opens the request; a read-only tooltip-organism shows
who asked what and when. Props: label (names the expected action, e.g. "View reply"), avatar = Avatar props,
request = { name, role, time, text, meta } (tooltip content; newest request), count (>1 requests → counter), onOpen.
`function CollaborationBadge({ label, avatar, request, count, onOpen, className })`

### TruncatedText
**Tier:** Pattern helper
Investment-name display (Figma "Name display"). Truncation is display-only; the full name shows in a tooltip whenever it is cut.
Props: children = full text (string), mode end|middle|start|wrap|segment (a table-level, per-tenant setting), className.
`function TruncatedText({ children, mode = 'end', className, tooltip = true })`

### ActionMenu
**Tier:** Pattern helper
───────────────────────────── More-actions menu ─────────────────────────────
Pattern helper: More-actions (⋮) menu — built from IconButton + Menu (single-select-list-molecule with single-select-list-atoms).
Props: items [{ label, icon, onClick(event), disabled, reason (tooltip shown on a disabled action), destructive, danger (red), divider,
shortcut, submenu (array of items) }], label (default "More actions"), open / defaultOpen / onOpenChange, align end|start,
inline (just the list), width (default 180).
Rules (Figma): an action that never applies is not listed; one that applies but is unavailable is disabled with a reason;
destructive actions (Archive, Delete) go last after a divider — the menu sorts them there.
`function ActionMenu({ items = [], label = 'More actions', open, defaultOpen = false, onOpenChange, align = 'end', inline, width = 180, className })`

### TableToolbar
**Tier:** Pattern helper
───────────────────────────── Table toolbar ─────────────────────────────
The bar above the table (Figma table-card "Frame" row, 40px): filter (SegmentedControl S with counts inside a table card,
or Tabs with counts on library pages), search (SmartSearch), onConfigure → divider + Tertiary S icon-button system-filter-settings
(opens the column settings). Props: filter, search, onConfigure, configureLabel, actions (extra nodes before the divider).
`function TableToolbar({ filter, search, onConfigure, configureLabel = 'Table configuration', actions, className })`

### ColumnSettings
**Tier:** Pattern helper
───────────────────────────── Column settings ─────────────────────────────
Content of the "Columns" drawer (Figma Table configuration): Cooper search for a column by description, "Shown in table"
(drag to reorder, eye to hide — the column hides at once but stays listed), "Suggested by Cooper" (+ adds the column).
Props: columns [{ key, title, hidden }] in table order, onChange(columns), suggestions [{ key, title }], onAdd(suggestion),
searchSuggestions (strings for the Cooper search list), findColumn(query) → Promise|array of suggestions (default: title match).
`function ColumnSettings({ columns = [], onChange, suggestions = [], onAdd, findColumn, className })`

### RecordPreview
**Tier:** Pattern helper
───────────────────────────── Record preview ─────────────────────────────
Preview sidebar for "table with preview" (Figma uses panel-organism): record ID, Details (navigates), ✕ closes.
The table stays fully interactive while it is open; a new preview replaces the current one.
Props: id (record code), onDetails, onClose, children (preview content), width (default 380).
`function RecordPreview({ id, onDetails, onClose, children, width = 380, className })`

### DataTable
**Tier:** Pattern helper
Every table behaviour on the Table pattern page, composed around IFS.Table (the kit table is not modified).
Props:
  columns: IFS.Table columns plus
    kind text|date|number — sorting only on date/number columns (Figma rule); text columns get chips, numbers a range.
    filter: 'chips' | 'presets' (date presets + custom period) | 'chips+period' | 'range' | 'search-chips' | false (default: chips for text, range for number, presets for date)
    filterValue(row) → value or array of values for chips; value(row) → number/Date for range/date/sort (default row[key]).
    filterOptions [{ value, label }] (default: values present in the rows — only values that exist are shown), maxChips (default 8).
    name: true marks the name column (pin, drag, folder icon, truncation, rename, preview). truncate end|middle|start|wrap|segment.
  rows / defaultRows / onRowsChange (pins, rank and renames write back), rowKey ('id').
  variant standard|ranked — standard: default order = defaultSort, sort cycles ↓/↑ with no "off"; ranked: manual order + pins,
    sort is a temporary override ↓ → ↑ → off, rows drag to re-rank, pinned rows stay on top.
  defaultSort { key, dir }, filterTabs { variant: 'segmented'|'tabs', items: [{ value, label, match(row) }], defaultValue },
  search { placeholder, suggestions, noResults (suggestion labels), match(row, query), delay } — Cooper search over the rows,
  onOpen(row) (row click), onPreview(row) + previewId (eye button on hover), rowActions(row) → ActionMenu items,
  follow (show icon-button-following in the actions column), onRename(row, name) (double-click the name; must be unique),
  collaboration: handled by columns with render → CollaborationBadge.
  configurable { suggestions: [{ key, title, ...column, value(row) }] } → toolbar settings button + Columns drawer,
  title / collapsible / defaultCollapsed / headerAction (section header of a table card on a page with several tables),
  maxHeight (fixed-height card, default 600 when `fixedHeight`) + Show more / Show less, progressive { pageSize } (single-table pages),
  loading (skeleton rows), toolbarOutside (library pages: tabs + search sit above the card),
  pageTop { title, description, eyebrow, actions } (library pages: render IFS.PageTop above the card with the table's tab filter and search in it).
`function DataTable({ columns: colsProp = [], rows, defaultRows = [], onRowsChange, rowKey = 'id', variant = 'standard', defaultSort, filterTabs, search, onOpen, onPreview, previewId, rowActions, follow, onRename, configurable, title, collapsible, defaultCollapsed = false, headerAction, fixedHeight, maxHeight = 600, progressive, loading, toolbarOutside, pageTop, emptyText, className, style })`

## patterns-trace

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-trace.jsx

### useIssueReport
**Tier:** Pattern helper
Pattern helper: issue-report state hook — built on React state (no Figma component). Controller for both panels. Issues: [{ id, kind, title, description, gate, solutions: [{ id, title, description,
recommended }], upload, answer, okay, status }]. The card layout follows the data (Figma "the system decides"):
solutions → "Solutions" list; upload / answer → the action buttons; okay → a single Okay button (acknowledge).
status = { applied (solution id), answer (text), file (name), uploading, viewed } — any of the first four (or viewed)
resolves the issue. gates = [{ id, label }] for the readiness rows; an issue with `gate` counts against that gate.
Returns state + actions; pass it as `controller` to the components below.
`function useIssueReport({ issues = [], kinds = CONFIDENCE_KINDS, gates = [], defaultKind, uploadDelay = 1200, onResolvedAll } = {})`

### IssueSolution
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Pattern helper: solution / applied / answered row — built from ContentCard, Icon, IconButton. Patterns (30:73116 recommended, 30:73123 plain,
30:76630 applied, 30:78117 answered). M card, 12 padding, radius 8, border/base stroke. recommended = Cooper's pick:
cooper-system-icon (Insight) + "cooper/Insight/text" gradient title on background/color-alpha/cooper-base.
Props: title, description, recommended, onSelect (click applies it), onUndo (shows the arrow-back-up icon-button;
Figma "the cancel button appears on hover"), undoLabel, loading (Figma uploading shimmer, 40px), state (gallery: hover).
`function IssueSolution({ title, description, recommended, onSelect, onUndo, undoLabel = 'Cancel', loading, state, className, ...rest })`

### IssueListItem
**Tier:** Pattern helper
Pattern helper: "All" list row — built from ContentCard, Counter, Icon. Patterns (30:75771 / 12:177000): counter-atom S with the position,
the issue title (Body/M/regular, text/secondary) and a 12px status-success-filled when resolved. Click opens the item.
`function IssueListItem({ number, title, resolved, onClick, state, className, ...rest })`

### IssueAnswerField
**Tier:** Pattern helper
Pattern helper: My-answer input — built from TextField M (State=Typing, ✕ + ✓ on the right). Patterns (30:77533).
Enter or ✓ submits, Esc or ✕ cancels. Props: value / defaultValue / onChange, onSubmit(text), onCancel, placeholder.
`function IssueAnswerField({ value, defaultValue = '', onChange, onSubmit, onCancel, placeholder = 'My answer', autoFocus = true, className })`

### ProgressPager
**Tier:** Pattern helper
Pattern helper: Pager with the progress word — built from Pager. Figma's pagination-organism text reads "(n% resolved)" / "(n% viewed)".
`function ProgressPager({ progress = 'resolved', ...p })`

### IssueKindSwitch
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Pattern helper: issue-kind switch — built from SegmentedControl. Segmented control between issue kinds (Figma: segmented-control-organism S with counters). Hidden when only one kind has
items (Figma: "when one of the types is completely missing, the segmented control is hidden").
`function IssueKindSwitch({ controller: c, className })`

### IssueNavigator
**Tier:** Pattern helper
Pattern helper: item-by-item walkthrough — built from ProgressPager, IssueSolution, IssueListItem, IssueAnswerField, Button. The walkthrough (Figma: pagination-organism + title + card). detail view: pager (n / total, % resolved,
"All", ‹ ›), the issue, then its card; list view ("All"): numbered rows, a click opens that item.
Props: controller (useIssueReport), solutionsLabel / appliedLabel / answeredLabel (captions), accept (file picker).
`function IssueNavigator({ controller: c, accept, className })`

### ConfidenceGates
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Pattern helper: approval-readiness gates — built from ProgressRing, ReadinessStatus, Indicator, Tooltip. "Approval readiness" + one status-readiness-molecule per gate (Figma: content-card top slot, 30:73048). Passed gates read
"Passed"; open ones show an XS indicator per kind, "resolved/total", with the kind as tooltip ("The tooltip appears on hover").
`function ConfidenceGates({ controller: c, label = 'Approval readiness', className })`

### PanelRail
**Tier:** Pattern helper
Pattern helper: collapsed panel rail — built from Panel (collapsed). The 48px rail of the right-hand panels (Figma: sidebar-organism
View=Collapsed, icon-button-arrow ←|). dot: error (red = open questions / errors), warning (orange = warnings only), none when all is OK.
`function PanelRail({ dot, label = 'Expand panel', onExpand, className, style })`

### SystemConfidence
**Tier:** Pattern helper
Pattern helper: System Confidence panel — built from Panel, ContentCard, ConfidenceGates, IssueKindSwitch, IssueNavigator. Patterns (30:72985) — the author's right-hand panel on Review screens: approval readiness
(gates) and the open questions / warnings to walk through. Panel (sidebar-organism) holding one content card.
Props: controller, title, expanded / defaultExpanded / onExpandedChange (collapsed → 48px rail with status dot),
onEvidence (round Cooper button), accept (upload types).
`function SystemConfidence({ controller: c, title = 'System confidence', expanded, defaultExpanded = true, onExpandedChange, onEvidence, accept, className, style })`

### TraceReport
**Tier:** Pattern helper
Pattern helper: Trace Report — built from Drawer / Panel, IssueKindSwitch, IssueNavigator, Button. Patterns (12:176606 drawer, 12:176205 sidebar) — appears after a change the system considers
incorrect. type drawer = floating drawer-organism over a canvas (collapse only, never closes); sidebar = Panel (collapse
to rail). onUndo adds the footer "Undo" (Tertiary L) that reverts the change. Closes itself: the parent unmounts it when
controller.allResolved (use useIssueReport onResolvedAll).
Props: controller, type drawer|sidebar, title, expanded / defaultExpanded / onExpandedChange, onUndo, accept, className, style.
`function TraceReport({ controller: c, type = 'drawer', title = 'Trace report', expanded, defaultExpanded = true, onExpandedChange, onUndo, accept, className, style })`

### CONFIDENCE_KINDS
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Default issue kinds. value = issue.kind; indicator = Indicator type in the readiness rows; progress = word after the
percentage in the pager ("resolved" for issues that need a fix, "viewed" for read-and-acknowledge ones).
`const CONFIDENCE_KINDS = [ { value: 'question', label: 'Open questions', indicator: 'red', tooltip: 'Errors', progress: 'resolved', dot: 'error' }, { value: 'warning', label: 'Warnings', indicator: 'orange', tooltip: 'Warnings', progress: 'viewed', dot: 'warning' }, ]; const TRACE_KINDS = [ { value: 'error', label: 'Errors', indicator: 'red', tooltip: 'Errors', progress: 'resolved', dot: 'error' }, { value: 'warning', label: 'Warnings', indicator: 'orange', tooltip: 'Warnings', progress: 'resolved', dot: 'warning' }, { value: 'note', label: 'Notes', indicator: 'gray', tooltip: 'Notes', progress: 'viewed' }, ];  const isDone = s => !!(s && (s.applied || s.answer || s.file || s.viewed)); `

### TRACE_KINDS
**Tier:** Pattern helper
`const TRACE_KINDS = [ { value: 'error', label: 'Errors', indicator: 'red', tooltip: 'Errors', progress: 'resolved', dot: 'error' }, { value: 'warning', label: 'Warnings', indicator: 'orange', tooltip: 'Warnings', progress: 'resolved', dot: 'warning' }, { value: 'note', label: 'Notes', indicator: 'gray', tooltip: 'Notes', progress: 'viewed' }, ];  const isDone = s => !!(s && (s.applied || s.answer || s.file || s.viewed));  // Pattern helper: issue-report state hook — built on React state (no Figma component). Controller for both panels. Issues: [{ id, kind, title, description, gate, solutions: [{ id, title, description, // recommended }], upload, answer, okay, status }]. The card layout follows the data (Figma "the system decides"): // solutions → "Solutions" list; upload / answer → the action buttons; okay → a single Okay button (acknowledge). // status = { applied (solution id), answer `

## patterns-widget-builder

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/patterns-widget-builder.jsx

### StatCardsRow
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: stat-cards-row (key 88ffaeba129d4876c6ded6e6f3bbe9e983a8b46c; Patterns copy 12:104002)
A row of stat-card-organism (StatCard). Props: rows 1 | 2 (Figma Type "1 row" = all cards in one line, equal width;
"2 rows" = two per line), cards = [StatCard props] (Figma draws 4), children = extra cards/nodes.
`function StatCardsRow({ rows = 1, cards = [], children, className, ...rest })`

### PreviewWidgetCard
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: preview-widget-card-organism (key c30262b5a98acb4175dc9c5a891d9198ce782de6; Patterns copy 331:492728)
The thumbnail inside a widget card: a 7px uppercase heading over a skeleton of the chart the widget adds.
Figma draws the skeleton as a raster image; here it is drawn with blank blocks (no data, never focusable).
Props: type strategic-objectives | framework-coverage | portfolio | investment-value, title (heading; defaults per type).
`function PreviewWidgetCard({ type = 'strategic-objectives', title, className, ...rest })`

### WidgetCard
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: widget-card-organism (key 7e67813d92e4e29cec4c7b5b790211a2cdcf1531; Patterns copy 331:492745)
One entry in the Widgets drawer: title, description, "+ Add" (Secondary S) and a preview.
Figma Number=1…4 picks the preview (PreviewWidgetCard type); State=Drag is the card lifted under the cursor.
Props: title, description, preview (PreviewWidgetCard type or a node), previewTitle, addLabel (default "Add"), onAdd,
state default | drag, badge (Badge props; Figma badge-atom, hidden by default), onGrab(event) = pointer-down on the card
(start a drag; the card body is the grab area — Figma shows the grab cursor over the preview).
`function WidgetCard({ title, description, preview = 'strategic-objectives', previewTitle, addLabel = 'Add', onAdd, state, badge, onGrab, className, style, ...rest })`

### ResizeHandle
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: resize-handle (key 190c6106f062702dcf8eefb3cab150c14bc6d4ed; Patterns copy 413:44028)
"Arrows show only the directions that are still possible" (Figma description).
Props: arrows both | right | left (Figma Both / Right only / Left only), none (no arrows: dragging, or nothing possible).
22×64: a 3px white/500 bar with the arrows centred on it.
`function ResizeHandle({ arrows = 'both', className, style, ...rest })`

### DropIndicator
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: drop-indicator-atom (key f78ffb9697f561fefbb73cd30090fb5e9adc8501; Patterns copy 413:43575)
The thin purple line that marks where a dragged widget would land: a 4px ring + 1px line (border/accent-purple).
Props: orientation horizontal (between rows → new row; Figma's only variant) | vertical (inside a row → insert; the
pattern notes ask for it — drawn as the same atom turned 90°).
`function DropIndicator({ orientation = 'horizontal', className, style, ...rest })`

### WidgetViewChangePosition
**Tier:** Component
------------------------------------------------------------------------------------------ 
Figma: widget-view-change-position (Patterns local component 331:509936)
The compact chip a widget collapses into while its position is being changed (follows the cursor).
Props: title (Label/L/UPPER, text/tertiary). The ghost icon-button carries the drag mark.
`function WidgetViewChangePosition({ title, className, ...rest })`

### WidgetFrame
**Tier:** Pattern helper
Pattern: WidgetFrame — the frame every widget on a dashboard / report is drawn in. It is the kit's chart frame
(DataVizCard variant chart: 6px padding, uppercase header, Cooper button; on hover ⋮⋮ + "Edit with Cooper") plus the
widget ⋮ menu. Figma draws widgets as content-card-organism (Size M, 6px padding) with this header in its top slot.
Props: title, children (body), state hover | drag | ghost (forced), menu = [{ label, icon, onClick, disabled, items }],
onEditWithCooper, onCooper, grabProps (spread on the ⋮⋮ handle), bare (body has no padding — kit charts bring their own; a single
component child gets `bare` too, so a kit chart drops its own frame and header: DataVizCard bare).
`function WidgetFrame({ title, children, state, menu, onEditWithCooper, onCooper, grabProps, bare, className, style, ...rest })`

### WidgetBoard
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Pattern: WidgetBoard — widgets on a 3-column grid in rows of 1–3, with the Widget Builder rules:
Auto / Fill widths (1/3 · 1/2 · 2/3 · 3/3), same height in a row, resize by edge handles (snap, limits, reflow),
drag & drop by ⋮⋮ (indicator line → drop zone after 300 ms, blocked rows with tooltips, Esc cancels), ⋮ menu
(Resize S/M/L, Remove), toast with Undo. A dashboard is one untitled section; a report has many titled sections.
Props:
  value / defaultValue / onChange(layout) — layout = { sections: [{ id, title, rows: [{ id, items: [widgetId], widths: null | [sixths] }] }] }
  widgets = { [id]: { kind: 'text'|'chart'|'metrics'|'wide', title, render(ctx) → node, bare } }
    render gets { state } and returns the widget body; `bare` = body brings its own padding (kit charts).
    kind 'metrics' renders render() without a frame (a stat-cards block: 3/3, no handle, not draggable).
  editable (Draft; default true: handles, ⋮⋮ and menus). During every drag both show at once: the raised ghost card follows
  the pointer (source faded to 30%) and the "Drop here to place" zone marks the current drop target.
  moveMessage(widget) / removeMessage(widget) → toast title, onRemove(id), external = { id, kind, title, pointer } to drop
  a widget that comes from outside (Widgets drawer), onExternalDrop(id, placed:boolean).
Imperative-free: everything is state; undo restores the previous layout.
`function WidgetBoard({ value, defaultValue, onChange, widgets, editable = true, moveMessage, removeMessage, onRemove, external, onExternalDrop, className, style })`

### WidgetsDrawer
**Tier:** Pattern helper
------------------------------------------------------------------------------------------ 
Pattern: WidgetsDrawer — "Widgets" side drawer: smart search (filters by title/description) + WidgetCard list.
Each card can be added (+ Add) or dragged onto the board (the drawer steps aside while dragging).
Props: open / onOpenChange, items = [{ id, title, description, preview, kind }], onAdd(item), onGrab(item, event),
title (default "Widgets"), description, searching (forced "searching" state, gallery).
`function WidgetsDrawer({ open, onOpenChange, items = [], onAdd, onGrab, title = 'Widgets', description = 'You can add or drag widgets below to your dashboards.', className, style })`

### widgetLayoutEngine
**Tier:** Pattern helper
`function makeEngine(widgets)`

## selection

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/selection.jsx

### Menu
**Tier:** Component
Figma: single-select-list-molecule (445715ff…, 153:62054) of single-select-list-atom (1e822b07…, 153:61939), Size S (28):
4px padding, radius 4, elevation-2 fill, border/base, blur/strong; rows Body/M/medium text/secondary, hover = button secondary hover.
A dropdown of commands anchored to a trigger. Rendered at the end of <body> (Floating), so no scrolling or blurred parent clips it.
Props: items = [{ label, icon, shortcut (Figma show-shortcut), description (Figma description line), danger, disabled, reason (tooltip on
a disabled item), selected (check), prefix (node before the label), items (submenu), keepOpen, onClick(item, event), hidden }
  | { divider: true } | { title: 'Section' }],
trigger (element; gets aria-haspopup/aria-expanded and the pressed look) or anchor (DOMRect or element, for menus opened elsewhere)
or inline (just the list, in place: galleries and custom popovers),
open / defaultOpen / onOpenChange, onSelect(item), align end|start, position down|up (flips when there is no room), width (default 200),
label (accessible name). Keyboard: ↑/↓ move, Home/End, Enter/Space run, → / ← open / close a submenu, Esc closes and refocuses the trigger.
`function Menu({ items = [], trigger, anchor, inline = false, open, defaultOpen = false, onOpenChange, onSelect, align = 'end', position = 'down', width = 200, label = 'Menu', className, style })`

### Select
**Tier:** Component
Figma: single-select-organism (3273:26820) = single-select-atom (789:18085) + single-select-list-molecule (153:62054)
Props: options (strings or {value,label,icon,disabled}; {divider:true} draws a separator; {action:true,label,icon,danger,onClick} is a
command row such as "Remove" (danger = red) that runs onClick and closes without selecting), value/defaultValue/onChange(value, option), open/defaultOpen/onOpenChange,
size s|m|l|xl, label (xl prefix / s text), placeholder, iconLeft, clearable (Figma show-remove-select, default true), loading, error,
disabled, listPosition down|up (Figma "List position"), listTitle (e.g. "Suggested"), listSize s|l, state hover|focus|open (gallery).
`function Select(props) { return <SelectBase {...props} multi={false} />; }`

### MultiSelect
**Tier:** Component
Figma: multiple-select-organism (3273:33904) = multiple-select-atom (3200:7897) + multiple-select-list-molecule (3273:33695)
Same props as Select; value is an array. maxTags (default 5) tags then "+N". Size s shows "N selected". List stays open while picking.
`function MultiSelect(props) { return <SelectBase {...props} multi={true} />; }`

### Combobox
**Tier:** Component
Figma: signle-combobox-organism (3375:5415). Type to filter.
Props: options, value/defaultValue/onChange(value, option), defaultOpen, defaultQuery, size m|l|xl, label, placeholder, iconLeft, clearable, loading, error,
disabled, listPosition, listTitle ("Suggested", shown before typing), resultsTitle ("Results", while typing),
emptyTitle / emptyText / suggestions (Figma "No results" state: heading, hint and suggestion chips that fill the query),
filter(option, query), state. While loading and open, the list shows Figma's "Searching..." panel.
`function Combobox({ options = [], value, defaultValue = null, onChange, defaultOpen = false, defaultQuery = null, size = 'm', label, placeholder = 'Search item', iconLeft, clearable = true, loading, error, disabled, listPosition = 'down', listTitle = 'Suggested', resultsTitle = 'Results', listSize = 's', emptyTitle = 'No results found', emptyText = 'You might be looking for', suggestions = [], state, className, style, id, filter = (o, q) => o.label.toLowerCase().includes(q.toLowerCase()), 'aria-label': ariaLabel, ...rest })`

### SegmentedControl
**Tier:** Component
Figma: segmented-control-organism (1387:244501) built from segmented-control-atom (1387:244511)
Props: options = [{ value, label, iconLeft, iconRight, counter, disabled, state }] (strings allowed), value/defaultValue/onChange,
size m (34) | s (24), fullWidth (stretches to its container; segments share the width equally). Arrow keys move the selection (radio group).
`function SegmentedControl({ options = [], value, defaultValue, onChange, size = 'm', fullWidth = false, className, ...rest })`

### Chip
**Tier:** Component
Figma: chips (832:235895)
Props: children = label, selected/defaultSelected/onChange(selected) (Figma Select=True|False), iconLeft, iconRight (icon names),
indicator warning|danger|success|info (Figma "Show indicator"), counter (Figma show-counter), onRemove (makes the right icon a
remove control, default system-close; Delete/Backspace also removes), disabled, state hover|pressed|focus.
`function Chip({ children, selected, defaultSelected = false, onChange, iconLeft, iconRight, indicator, counter, onRemove, disabled, state, className, onClick, onKeyDown, ...rest })`

### Calendar
**Tier:** Component
Figma: date-picker-molecule (3406:9510) with date-atom (1440:5201) cells
Props: value/defaultValue/onChange (Date; with range=true {start, end}), month/defaultMonth/onMonthChange (any Date in that month),
today (Date), events ({ 'YYYY-MM-DD': ['danger','warning','info'] }), weekStartsOn (default 1 = Monday), min/max (Dates).
Keyboard: arrows move a day/week, PageUp/PageDown change month, Home/End week start/end, Enter/Space select.
`function Calendar({ value, defaultValue = null, onChange, range = false, month, defaultMonth, onMonthChange, today = new Date(), events = {}, weekStartsOn = 1, min, max, autoFocus, className, ...rest })`

### DatePicker
**Tier:** Component
DatePicker = select trigger (single-select-atom look) + Calendar popup (date-picker-molecule 3406:9510).
Props: value/defaultValue/onChange (Date or {start,end} with range), open/defaultOpen/onOpenChange, size s|m|l|xl, label, placeholder,
format(date) → string, range, clearable, iconLeft (default system-calendar-date; null hides it), showApply (Figma show-apply-button:
picks stay a draft until the full-width Apply button commits them), applyLabel, error, disabled, listPosition down|up, state,
plus Calendar props (today, events, min, max).
`function DatePicker({ value, defaultValue = null, onChange, open, defaultOpen = false, onOpenChange, size = 'm', label, placeholder = 'Select date', format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), range = false, clearable = true, iconLeft = 'system-calendar-date', showApply = false, applyLabel = 'Apply', error, disabled, listPosition = 'down', state, today, events, min, max, className, style, id, 'aria-label': ariaLabel, ...rest })`

## states

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/states.jsx

### EmptyState
**Tier:** Component
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
**Tier:** Component
Figma: empty-state-spinner-molecule (3782:24081)
Indeterminate or shapeless wait where no layout can be previewed. Props: text (Figma "Loading..."), showText (show-text).
`function Spinner({ text = 'Loading...', showText = true, className, ...rest })`

### LoadingMore
**Tier:** Component
Figma: empty-state-loading-more-molecule (3782:24082) — appending items to a list that is already visible.
`function LoadingMore({ children = 'Loading more…', className, ...rest })`

### ProgressLoading
**Tier:** Component
Figma: progress-bar-loading (5530:11867) = progress-bar-molecule + percentage. Measurable work (uploads, steps).
Props: value 0–100, label (accessible name).
`function ProgressLoading({ value = 0, label = 'Loading', className, ...rest })`

### Skeleton
**Tier:** Component
Skeleton block — not a Figma component. Content States › Skeleton defines skeletons as blank shapes built inside the
component that owns the async data (stat card, content card, table cells already have Figma Loading variants: use those).
Use this only to compose a skeleton for an owning component that has no Loading variant.
Props: width, height, shape bar|circle|block. Always aria-hidden, never focusable, never contains text.
`function Skeleton({ width = '100%', height = 16, shape = 'bar', className, style })`

### LoadingRegion
**Tier:** Component
Loading wrapper for the component that owns async data (Skeleton notes, rules 7–9).
Props: loading, skeleton (node shown while loading — a Loading variant or Skeleton blocks; omit for an unknown shape → Spinner),
delay (ms before the skeleton shows; fast loads never flash, default 300), minDuration (ms it stays once shown, default 300),
label (announced "Loading <label>" / "Loaded"), children = loaded content (or the empty state — decided by the caller after loading).
`function LoadingRegion({ loading, skeleton, delay = 300, minDuration = 300, label = '', children, className, ...rest })`

### FtaButton
**Tier:** Component
Figma: FTA button (67:4758) — the Cooper FAB.
Props: stroke (Figma Stroke: true = 48px glass ring for non-black surfaces; false = bare 32px sphere for black footers/bottom sheets),
indicator (Show indicator), label (tooltip + accessible name, Figma tooltip "{label}" with hotkey "/"), hotkey, state hover|pressed|focus (gallery),
disabled, onClick. The FAB hides while Cooper chat is open (one entry point).
`function FtaButton({ stroke = true, indicator = true, label = 'Cooper', hotkey = '/', tooltip = true, state, className, ...rest })`

### PromptButton
**Tier:** Component
Figma: prompt-button (67:2937) — quick Cooper prompt next to the FAB.
Props: size l|m, children = Prompt label, state hover|pressed|focus (gallery), disabled, onClick.
`function PromptButton({ size = 'm', state, children, className, ...rest })`

### CooperChip
**Tier:** Component
Figma: cooper-chip-atom (3501:23480) — in-context marker where Cooper has a recommendation; click opens it.
Props: children (default "1 Recommendation"), selected/defaultSelected/onChange (Figma State=Selected while its recommendation is open),
disabled, state hover|focus (gallery), onClick.
`function CooperChip({ children = '1 Recommendation', selected, defaultSelected = false, onChange, state, className, onClick, ...rest })`

### ZoomSlider
**Tier:** Component
zoom-slider-atom (3275:483), used in the Explore bottom sheet. value 0–100 (Figma "%"), keyboard ←/→.
`function ZoomSlider({ value, defaultValue = 20, onChange, label = 'Zoom', className })`

### BottomSheet
**Tier:** Component
Figma: base-bottom-sheet-organism (4406:25590), value-bottom-sheet-organism (789:37502), explore-bottom-sheet (72:4676)
The Cooper entry point at the bottom of the content area, 40px tall, full width. Place it in AppShell's `bottom` slot.
Props (all types): type base|value|explore (base = any tab; value = Value tab; explore = Explore tab),
prompts (labels → PromptButton M; Figma shows two), onPrompt(label), showPrompts (default true), showCooper (show-cooper, default true),
onCooper (FAB click), cooperIndicator (FAB Show indicator; Figma sheets turn it off).
type="value": inProgress (Figma In progress: shows the coverage bar), coverage 0–100, cooperContext (cooper-context, default true),
  documents = { label, icon, onClick } (show-documents-button, tertiary M), onUpload (show-upload-button; omit on an Active framework = read-only).
type="explore": fields [{ key, label, options, value, zoom }], values/onFieldChange(key, value), zoom/onZoomChange, lastSync,
  tools [{ icon, label, onClick }] (ghost S icon buttons). `left` replaces the whole left side for any type.
Narrow widths (e.g. 600px): the left side shrinks first (coverage bar, then the map fields scroll sideways), then the
prompts scroll sideways; the FAB, buttons and map tools never get cut.
`function BottomSheet({ type = 'base', prompts = [], onPrompt, showPrompts = true, showCooper = true, onCooper, cooperIndicator = false, inProgress = false, coverage = 0, cooperContext = true, documents, onUpload, fields = DEFAULT_MAP_FIELDS, values, onFieldChange, zoom, defaultZoom = 20, onZoomChange, lastSync = '{label}', tools = DEFAULT_MAP_TOOLS, left, className, ...rest })`

## surfaces

Examples (read before using any component below — shows the data shapes props expect): https://shinyc01.github.io/new-cl-design-system/ifs-kit/src/gallery/surfaces.jsx

### Tooltip
**Tier:** Component
Figma: tooltip-organism (67:6151)
Props: content (Figma Label / Content slot), hotkey (hotkey-atom text, e.g. "⌘/"; absent = show-hotkey off),
color black|grey ("grey (for black bg)"), type bottom|top|left|right = side the ARROW is on
(bottom → bubble sits above the trigger, the default), arrow left|center|right (top/bottom only).
Wraps one trigger child; shows on hover (400ms delay) and focus, hides instantly, Esc dismisses.
open/onOpenChange to control. `inline` renders the bubble alone (gallery).
`function Tooltip({ content, hotkey, color = 'black', type = 'bottom', arrow = 'center', delay = 400, open, defaultOpen, onOpenChange, inline, children, className })`

### Alert
**Tier:** Component
Figma: alert-organism (1440:5440)
Props: type error|warning|success, title, children = Body text, showIcon (Figma show-icon, default off),
action = button label (Primary S; absent = show-button off), onAction, onClose (shows the close
icon-button; Figma show-close-icon), closable=false to hide it.
`function Alert({ type = 'error', title, children, showIcon = false, action, onAction, onClose, closable = true, className, ...rest })`

### Snackbar
**Tier:** Component
Figma: snackbar-organism (3795:29459)
Props: title, children = description (Content slot), secondaryAction / primaryAction = { label, onClick }
(Secondary S + Primary S; add iconLeft, e.g. Undo → 'arrow-back-up'), onClose (close icon-button; showClose=false hides it).
Use IFS.toast({...same props, duration}) to show one top-right that auto-dismisses.
`function Snackbar({ title, children, secondaryAction, primaryAction, onClose, showClose = true, className, ...rest })`

### toast
**Tier:** Component
toast({ title, description, primaryAction, secondaryAction, duration }) → id. toast.dismiss(id).
`function surfToast(opts)`

### useSnackbar
**Tier:** Component
Hook form: const show = useSnackbar(); show({ title: 'Saved' })
`function useSnackbar() { return surfToast; }`

### Overlay
**Tier:** Component
Figma: overlay-background (338:21403)
Props: type strong (overlay/screen-strong + blur/medium) | base (no blur), onClick, inline (absolute, not fixed).
`function Overlay({ type = 'strong', inline, className, ...rest })`

### Modal
**Tier:** Component
Figma: modal-organism (4169:208596)
Props: open / defaultOpen / onOpenChange, title (Header Slot), children (Content slot),
secondaryAction / primaryAction = { label, onClick, disabled, iconLeft } (Tertiary L + Primary L, split footer),
footer (custom footer node, replaces the two buttons), dismissible=false hides ✕ and blocks Esc/overlay close,
overlay strong|base|none, width, inline (renders the card in place without overlay — gallery).
`function Modal({ open, defaultOpen, onOpenChange, title, children, secondaryAction, primaryAction, footer, dismissible = true, overlay = 'strong', width, inline, className, style })`

### Drawer
**Tier:** Component
Figma: drawer-organism (4394:21241)
Props: open / defaultOpen / onOpenChange, title (Header slot), expanded / defaultExpanded=true / onExpandedChange
(Figma Expanded; False = header only), collapsible (show the diagonal collapse/expand button),
showClose (show-button-close), tabs (node, show-tabs), subtitle + segmented (node, show-subtitle /
show-segmented-control), children (Content slot), side right|left, overlay none|strong|base,
height, inline (renders in place — gallery). Esc closes.
`function Drawer({ open, defaultOpen, onOpenChange, title, expanded, defaultExpanded = true, onExpandedChange, collapsible = true, showClose = true, tabs, subtitle, segmented, children, side = 'right', overlay = 'none', height, inline, className, style })`

### Panel
**Tier:** Component
Figma: panel-organism (4305:365421); collapsed rail = sidebar-organism View=Collapsed as the pattern screens draw it.
Props: title, actions (node, header right, before the buttons), expanded / defaultExpanded=true / onExpandedChange
(Figma Expanded: 380px ↔ 48px rail holding only the ←| expand button), dot error|warning (status dot on the rail's button:
red = errors / open questions, orange = warnings only), showEvidence (show-evidence-chain, circle Tertiary S icon-button),
onEvidence, onClose (shows ✕ instead of the collapse toggle; the panel then never collapses), full (fills the content area),
children (Content slot). Lives in the page layout: no scrim, no focus trap.
`function Panel({ title, actions, expanded, defaultExpanded = true, onExpandedChange, dot, showEvidence = true, onEvidence, onClose, full, children, className, style })`

### Popover
**Tier:** Component
Figma: popover-organism (4394:56471)
Props: trigger (element; click toggles), open / defaultOpen / onOpenChange, align start|end,
title (Title slot; absent = show-title off), count (counter-atom), showClose,
search (show-search: true or placeholder string), searchValue / onSearchChange(value) to control it (onSearch = alias),
the field shows ✕ to clear once it has text, onFilter (show-filter: Secondary M icon-button),
children (Content slot), width, inline (renders the card alone — gallery). Esc / outside click / ✕ close.
`function Popover({ trigger, open, defaultOpen, onOpenChange, align = 'start', title, count, showClose = true, search, searchValue, onSearchChange, onSearch, onFilter, children, width, inline, className, style })`

### FloatingBar
**Tier:** Component
Figma: floating-bar-organism (7405:22521)
Props: category (type label, e.g. "Folder"), categoryIcon (default "chat-folder"), item (name or "3 items selected"),
badge (node next to the item, e.g. an indicator), secondaryAction / primaryAction = { label, onClick }
(Tertiary M + Primary M) or actions (node), onClose (✕ and Escape — clears the selection),
open (default true), inline (in place instead of fixed top-centre — gallery).
`function FloatingBar({ category, categoryIcon = 'chat-folder', item, badge, secondaryAction, primaryAction, actions, onClose, open = true, inline, className, style })`

