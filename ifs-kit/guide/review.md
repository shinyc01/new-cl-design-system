# Review queue

Things to check in Storybook, one entry per story. Each one is a place where Figma disagrees with itself, something was invented or approximated, or a legacy part was kept. The designer's standing decision: **when frames and written notes disagree, the notes win**, and the conflict is listed here.

Format (read by tools/gen-stories.mjs): `### <story section name>`, then one bullet per item. Each item says what Figma shows, what the kit does, and the node ids. Delete an item once it's checked; a story with no items left loses its warning.

## Patterns — Widget builder

### Pattern: Widget builder — Investment overview
- Drag visuals: both shown together. The ghost card follows the pointer, and "Drop here to place" marks the target (designer decision). Frames: chip 331:509710, ghost 413:53329.
- Source opacity while dragging: the notes say ~30%, the frames draw 40%. The kit uses 30% (notes win).
- Ghost width: the notes say "current width", the frames draw ~330px. The kit keeps the full widget width (notes win).
- Resize from the ⋮ menu (S/M/L, 331:507578) as well as edge handles (rules 413:44071 mention only handles). Both are built, with the same limits.

### Pattern: Report widgets — resize, drag & drop rules
- Two charts in one row: the old frame 331:507955 shows a resize handle between them; the rules (413:56466) lock them at ½ + ½. The kit locks them (notes win).

### PreviewWidgetCard
- The Figma previews are raster images; the kit draws blank placeholder blocks.

## Patterns — Cooper

### Pattern: Cooper recommendations
- The recommendation card is the legacy `list-item` (capex-card, 68fd47d4) in 67:108505. Kept as drawn (`RecommendationItem`). Decide: keep it, or move to ContentCard.

### CooperMessage
- Answer sources use the legacy `source card` (fafdbabd) in the frames. The kit shows them as `ChatLink type="source"`, plus `SourceCard` (built by the Evidence pattern). Decide which belongs in chat answers.
- The source link colour is raw white/850 in Figma; follow-ups use text/secondary.

## Patterns — Documents

### MapPinDot
- "Success" is drawn grey (fill/default), while the defect pin's "Monitoring" is green. Possibly a Figma binding bug.

### BarChartItem
- Bars bind `data-viz/data-N` variables that aren't in the exported tokens; the kit uses the Figma values as fallbacks. The forecast bars use muted-purple.

### Pattern: Documents — long names
- The hover frame shows a Download icon; the note says editable rows get ⋮ (Download / Remove). The kit follows the note.

### Pattern: Documents on an investment (editable)
- One dev note says errors use a snackbar; the frames and the other notes use alert-organism. The kit uses the alert.

## Patterns — Table

### Pattern: Library table (standard)
- The table card in every screen is a local "section" frame (16 padding / 12 gap), not `table-card-organism` (12 / 8). The kit follows the screens.
- Horizon and Modified filters mix instant chips with a period that applies on Apply. That conflicts with guide rule 15 ("instant and deferred never mix").
- The Horizon notes say custom periods use fiscal years; the frames show a date picker. The kit uses the date picker. **Notes-win says fiscal years: needs a decision.**

### Pattern: Idea Pad table (ranked)
- Ranked rows are 60px; library rows are 48px.

### CollaborationBadge
- A clickable badge-atom, which conflicts with "badges aren't clickable".

## Patterns — Evidence chain

### SourceCard
- The library source-card lists Map and Image content variants, but the Patterns file only uses older copies. The kit has File/User × Quote/Text + Loading (library 1440:5362 vs Patterns 12:192927).
- The badge is info-coloured with no border; the kit's black badge draws a border.

### Pattern: Evidence chain confidence states
- The middle strength caption reads "87% Review" on the 60% and 96% frames too. The kit shows `{value}% Review` inside the band and "70–90% Review" outside it.
- At exactly 90%: the dev note says ">90% is Approve"; the kit's EvidenceStrength treats 90 as Approve.

### EvidenceChainDrawer
- The drawer instances use a black-base fill; the kit's Drawer uses surface/secondary-alpha.

### PeerBenchmark
- The "15+ feeders" legend swatch is teal (#226d65) but its bars are indigo (#312262). Most bar fills are raw hex with no token.

## Patterns — Nav bar

### Pattern: Nav bar — Command
- The kit's NavBar defaults to a "Home" stage; Figma now says "Command".

### ExploreHeader
- Built from `explore-header` (ae9026ad, no variants), but a published `explore-header-pattern` (0f49a18b, 7205:33581) has four toggles. Which is current?

### SideNavTree
- Figma builds the Plan tree from detached table cells; there is no tree component in the DS. The kit's tree is composed.

### ResponsiveNavBar
- The collapse breakpoint (800px) and sidebar rails below 1280px are inferred, not specified.

## Patterns — Collaboration

### LiveCursors
- **Invented.** The Collaboration section has no live cursors or presence lists, only a green online dot on avatars. The cursor art is the real cursor-atom (55:1645). Should live cursors appear on framework canvases at all?

### CollaboratorsPanel
- The no-results chips (12:11069) name people already on the record. The kit suggests people who can still be invited.
- The filter says "Field Lead" but the job role is "Field Team Lead"; "Jane Green" shows initials LG (12:10913).

### InviteCollaboratorModal
- What's the difference between the Edit brief "medium" and "high" frames?

## Patterns — Activity & versions

### Pattern: Activity panel — version history
- The Activity panel is panel-organism with an overlay, but the guide says panels have no scrim (that's a drawer). Figma also swaps the collapse toggle for ✕.
- The "Version history" and "Approval chain" sticky labels are swapped over their frames.

### Pattern: Compare versions
- The compare stat cards compare "Best in class", while the Sankey compares Version 4 with Version 3.

### CompareDropdownList
- Cached in the Patterns file under key c5186fed; IFS DS publishes it as ddd60a12. It may duplicate the single-select list.

## Patterns — Comments

### Pattern: Commenting on the canvas
- Editing your own reply now follows 12:47187: ⋯ → Edit/Delete, a white field with Cancel + Send, and no Mention button. Delete asks for confirmation, then shows Undo. Check it.
- Posted @mentions are now a badge with the mention icon (12:46575). Check it.
- Map nodes: the kit's NodeCard at zoom 0.6 is taller than Figma's 24px map bars.

### CommentDrawerCard
- Read cards use an Inactive avatar, but the "Comment open" frames keep the opened author's avatar coloured.

## Patterns — Approval chain

### Pattern: Approval chain — reviewer review & approve
- Note rights 253:53983 vs frames 138:292115 / 138:292305 disagree. Built per the notes.
- Chip filter: multi-select (157:114730) vs single-select (157:119210). Built per the notes.
- Budget envelope: a Warning type with a red icon (138:293545).

### ApprovalChainTable
- The kit's ApprovalChain (cards, from the IFS DS timeline) vs this page's table-style chain: which is canonical?
- The library now publishes newer versions of parts used here: status b0bad471, review-investment-table, review-data-visualisation. The kit follows the Patterns file copies.

### Stat
- `stat` and StatCardsRow are near-duplicates; stat adds a compare card.

## Patterns — Confidence, trace & readiness

### Pattern: Trace report
- The "OVER BY $140M" badge is bound to text/success but drawn red (12:194704). The kit draws it red.
- The upload "Answered" frame (30:78117) shows typed text instead of a file name. The kit shows the file name.
- Undo/cancel on Applied/Answered cards: the note (30:77198) says hover only; the frames show it at rest (30:76774, 30:77690, 30:78117). The kit uses hover only (notes win).

### CommentPin
- A blue unread dot on the sender's own new comment: frame 12:36031 shows it, but note 12:47974 says the dot means "not yet viewed". Removed (notes win).

## Components

### CommentThread
- The resolved look is now rebuilt to match 12:44840: ⋯ (Unresolve, Copy link) and ✕, Inactive avatars, the composer kept, nothing dimmed. The invented look is gone.
- Figma has two resolved looks: 12:44840 (above) and 12:36500 (green filled ✓, coloured avatars). Which is current?

### Canvas demo
- **Invented.** The mini-map is a stand-in. Figma describes a navigator but has no component for it.

### LineChart
- The y-axis starts at 80; Figma's starts at 60.

### ColumnChart
- The "view as table" toggle reuses the hover ⋮ button; Figma shows no table control.

## Pattern helpers that might deserve a Figma component

These are pattern helpers: compositions built from kit components to implement a pattern's rules. They have no Figma component. Decide for each: promote it to a real IFS DS component (design it in Figma, then the kit will match), keep it as a helper, or drop it.

### ActionMenu
- Three near-identical menus exist: `ActionMenu` (Table), `CooperMenu` (Cooper) and `CommentMenu` (Comments). All are single-select-list-molecule used as an action menu. Several agents asked for one standalone **Menu** component. Recommend: add Menu to the DS.

### WidgetFrame
- The frame every dashboard widget sits in (header, hover actions, ⋮ menu). Figma draws it as content-card variations. Candidate for a real `widget-frame` component.

### WidgetBoard
- The drag/resize grid engine. It's behaviour, not visuals, so it should probably stay a helper.

### CooperMessage
- The Cooper answer bubble: reasoning, text, cards, sources and follow-ups, assembled from a dev-note anatomy (67:134213). Is there, or should there be, a published `cooper-message` component?

### SideNavTree
- The Plan folder-tree sidebar. Figma builds it from detached table cells; there is no tree component.

### ColumnFilter
- The table column filter panel (chips, presets, range). Composed from single-select-list + chips.

### TableToolbar
- The table's filter, search and actions bar. Possibly part of table-card-organism.

### DocumentRow
- One document row, built from the legacy file-card classes. Candidate for an updated file-card component.

### SplitButton
- A primary button with an attached dropdown (Approval). Not in the DS: should it be?
