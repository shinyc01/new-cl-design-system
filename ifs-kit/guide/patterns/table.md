# Table pattern

Source: IFS Design System Patterns › page **Table** (92:16787), section Table (95:106476). Kit family: `patterns-table` (`src/components/patterns-table.jsx`).

## In short
- Use `DataTable` for any list of records; bare `Table` only for static tables. Don't rebuild rows from legacy `tableCell` / `tableHeader`.
- Never paginate or hide rows: a sole/last table loads on scroll (`progressive`); with other blocks, each table is a 600px card with Show more/less (`fixedHeight`).
- Row filter with counts: `SegmentedControl` S inside the card when the page already has tabs; on library pages `Tabs` in `PageTop` (`pageTop`).
- Toolbar right: `SmartSearch` (never `Search` for questions), divider, `system-filter-settings` IconButton → Columns drawer (hide/reorder apply at once).
- Sort only date/number columns; empties sort last. Standard: Last modified newest first, ↓↔↑, no off, no pin/rank. Ranked: manual order, ↓→↑→off.
- Ranked tables only: hover shows pin + drag handle; pinned rows on top, no limit; drag across zones pins/unpins; drop line; no drag while sorted/searched/filtered.
- Column filter: chips (only values in the table, ~6–8) or From/To range (numbers, dates) — never both. Show `FILTER n`, Clear all, funnel dot; filters AND.
- Clear filters resets column filters only, not search or tab. No-match filters keep the header and show `EmptyState` + Clear filters.
- Search: suggested questions on focus, "Searching..." row; no match hides header, shows suggestion chips, zero tabs disabled. Prompts must match the query.
- Row: hover highlight, click opens record, double-click name to rename (must be unique, else error); confirm with toast + Undo (5s, pauses on hover).
- ⋮ `ActionMenu`: omit actions that never apply, disable unavailable ones with a tooltip, destructive last after a divider.
- Eye button → `RecordPreview` sidebar (ID, Details, ✕); table stays interactive, a new preview replaces the old one.
- Collaboration badge opens the record at the request; its tooltip is read-only. Names: full name tooltip; INV code never truncated. Loading: `Skeleton` rows.
- Details below: What it is / when to use it, Anatomy, Flows and states, Rules, Don'ts, Consolidated / unsure

## What it is / when to use it
How data tables behave in the product: filtering, search, sorting, pinning and manual ranking, row actions, inline rename, column configuration, display on single- and multi-table pages, and the empty, searching and loading states. Use `IFS.DataTable` for any list of records (libraries such as the Idea Pad, Strategy Framework, Value Framework and Value Models libraries, and relationship tables on detail pages). Use bare `IFS.Table` only for a static table with no behaviour.

## Anatomy
- **Card**: `DataTable` (16px padding, 12px gap, radius 8, `surface/secondary-alpha`) around the kit `Table` (table-header-molecule, table-cell-atom, table-sort-atom, table-filter-atom, content-row-molecule).
- **Toolbar** (`TableToolbar`, 40px):
  - left: the row filter with counts. Inside the card this is a `SegmentedControl` S. On library pages it is `Tabs`, which sit above the card inside `PageTop` (`pageTop`).
  - right: `SmartSearch` (smart-search-organism), a divider, and a Tertiary S `IconButton` `system-filter-settings` that opens the Columns drawer.
- **Column filter**: the table-filter-atom opens a `ColumnFilter`, built from single-select-list-molecule with `Chip`s. Depending on the column it also holds `DatePicker` (custom period), `Search` (long vocabularies) or From/To range fields.
- **Cells** (kit cell types):
  - `Indicator` and `Badge` for status and stage.
  - `CollaborationBadge` (badge-atom with avatar, plus a read-only `Tooltip`).
  - `TruncatedText` for names.
  - `Avatar` user cells.
  - `ProgressBar`.
- **Row controls**:
  - pin `IconButton` (`chat-pin`) and a drag handle (ranked tables).
  - an actions column with the preview `IconButton` (`eye-opened`), `ActionMenu` (⋮) and `FollowButton` (icon-button-following).
  - `IFS.DropIndicator` (drop-indicator-atom, from the widget-builder family) while dragging.
- **Surfaces**:
  - `RecordPreview`: a sidebar shown in the layout, panel-organism in Figma.
  - Columns drawer: `Drawer` + `ColumnSettings`, which uses `ContentCard` S rows.
  - `EmptyState` for no results.
  - `Skeleton` cells while loading.
  - `LoadingMore` for progressive loading.
  - `toast` (snackbar) after a rename.
- **Page chrome**: `NavBar`, `SideNav` (library pages), page title + description + Secondary "New" button, `BottomSheet` with prompts.

## Flows and states
- **Filter by tab or segment**: All / subtype tabs with counts. Search changes the counts. Tabs with zero results are hidden while a search has results.
- **Column filter**:
  - The default is All.
  - Picking a chip deselects All.
  - The header shows `FILTER n` and Clear all.
  - The funnel shows a dot while a filter is active.
  - Close the panel by clicking outside it.
- **Search**: Suggested questions on focus → type → Enter → "Searching..." row → results. If nothing matches: "No results found" with the suggestion chips, the tabs disabled at 0, and the header hidden.
- **Filter combination with no matches**: the header stays and the `EmptyState` shows "No results found / Try a different term, or clear filters to see everything." plus Clear filters. The tab counts show 0.
- **Sort**: click a date or number header. Ranked tables cycle ↓ → ↑ → off. Standard tables cycle ↓ ↔ ↑.
- **Pin and rank** (ranked tables):
  - On hover, a row shows the pin and a drag handle.
  - Drag shows a drop line.
  - Pinned rows stay on top.
- **Row**: hover highlights the row. Click opens the record. Double-click the name to rename it inline. ⋮ opens more actions. The eye button opens the preview.
- **Columns drawer**:
  - Cooper search ("Find a suitable column by description").
  - Shown in table: drag to reorder, eye to hide.
  - Suggested by Cooper: + adds the column, and its cells load before the values appear.
- **Display**: a single table loads more rows as you scroll (`progressive`). With several tables, each card is 600px high and has Show more / Show less (`fixedHeight`).
- **Loading**: skeleton rows inside the card. The toolbar, tabs and header stay live.

## Rules
1. Tables are never paginated (kit rule). A table that is the only or last block on the page loads more rows as you scroll. When several tables or other blocks share the page, each table sits in a fixed 600px card with Show more / Show less. (Figma)
2. The row filter has two forms, and the page shows both:
   - Inside a table card it is a **SegmentedControl S with counts**, for example the Build › Idea Pad card under the page Tabs.
   - On library pages it is **Tabs with counts** in the `PageTop` above the card, next to the smart search.
   - The guide's "filter with tabs" and "the table card uses a segmented control" are therefore both true. Use the segmented control when the page already has tabs. (Figma frames; the reason is inferred)
3. Only date and number columns sort, for example Last modified, Cost, BCR, Score and counters. Text columns (names, statuses, authors, owners, collaboration) are narrowed with the column filter instead. The header shows only the controls the column supports. (Figma)
4. Empty date or number values always sort to the end, in both directions. (Figma)
5. There are two library table types, built on one component. (Figma)
   - **Standard**: the default order is Last modified, newest first. Sort toggles newest↔oldest and has no "off" state. There is no pin, rank or drag.
   - **Ranked**, for example the Build library: the default order is the user's manual order with pinned rows on top. Sort is a temporary override, ↓ → ↑ → off. Turn ranking on only where the user sets priorities.
6. Pinning and ranking: (Figma)
   - Pinned rows always show the pin. On hover, Pin becomes Unpin.
   - Pins have no limit. A new pin joins the bottom of the pinned group.
   - While sorted, the pinned group stays on top and each group is sorted separately.
   - Dragging within a zone re-orders it. Dragging across zones pins or unpins the row where it is dropped.
   - A thin drop line marks the insertion point.
   - Drag is turned off while a sort, search or filter is active. (inferred)
7. Filters: (Figma)
   - Use chips for a finite vocabulary (status, type, owner, segment).
   - Use a From/To range for numbers, currency, percentages and dates.
   - A column never has both.
8. Chip filters: (Figma)
   - Show only values present in the table.
   - Keep to about 6–8 chips. The rest is covered by smart search.
   - Ideas and Collaboration chips are generated by AI from keywords or frequent values. Users don't manage them.
9. Combined chips + period filters (Horizon, Modified) combine with AND. (Figma)
   - A horizon matches when it overlaps the period.
   - Modified presets are Last 7/30/90 days and This year, counted back from today in the user's time zone. Only one preset can be on at a time.
   - Custom periods include their start and end dates and apply on Apply.
10. Range bounds are optional and include their limits. (Figma)
    - Filling only From means "from X up". Filling only To means "up to X". The unit is not repeated.
    - The arrows step by one unit of the column (1, 0.1 for ratios, $0.1M for currency) and repeat while held.
    - A value applies live and commits on blur.
11. Clear filters resets every column filter. It does not clear the search or change the tab. Filters can also be cleared one column at a time. (Figma)
12. Prompt chips under the search (Suggested questions, "You might be looking for") must relate to the current query. Never show generic prompts. (Figma)
13. Collaboration badge: (Figma)
    - Clicking it opens the record at the exact place the request came from. The label names what is expected ("View reply", "Provide asset health").
    - The hover tooltip is read-only (who, what, when) and follows the badge.
    - With more than one request, the badge shows a count and opens the newest request.
14. Name truncation is a per-tenant table setting: end, middle (≈50/50), start, wrap to 2 lines, or segment (whole words removed from the middle). (Figma)
    - Every mode shows the full name in a tooltip.
    - The INV code under the name is never truncated.
    - Truncation is display-only.
15. Rename: (Figma)
    - Double-click the name to edit it inline.
    - On save the name must be unique. If it isn't, block the save with an error.
    - Confirm with a toast that has Undo. It auto-dismisses after 5s and pauses on hover.
16. More actions: (Figma)
    - Each library sets its own list, which can depend on the record's status.
    - Omit an action that never applies.
    - Disable an action that is unavailable now, with a tooltip explaining why.
    - Destructive actions go last, after a divider.
17. Preview (tables with preview only): (Figma)
    - The row shows an eye button on hover. It opens a sidebar with the ID, Details and ✕.
    - The table stays fully interactive while the preview is open.
    - A new preview replaces the current one.
    - Row click still opens the record page.
18. Column configuration: hiding a column takes effect at once but keeps it in the settings list. Dragging reorders the table at once. (Figma)

## Don'ts
- Don't paginate tables or hide rows.
- Don't add sort to text columns, and don't put chips and a range on the same column.
- Don't render chips for values that aren't in the table, or more than about 8.
- Don't put interactive content (reply fields, buttons) in the collaboration tooltip.
- Don't use the keyword `Search` for natural-language questions. Use `SmartSearch`.
- Don't rebuild rows from the legacy `tableCell` / `tableHeader` sets (see below).

## Consolidated / unsure
- **consolidated: `tableCell` 4f4be618… and `tableCell` 81b10bef… → table-cell-atom (688040eb).**
  - Neither is published in any enabled library (no `search_design_system` hit). They are remote, orphaned copies of an older table-cell-atom.
  - This file still caches 688040eb at that older version (Cooper page 12:215403) with the identical variant set: `type=empty|text|status|User|action-icons|check|in progress|Counter`, the same text props, and four `action-n` booleans.
  - Tokens, 12px padding and text styles are identical. Legacy `type=text` with a description = kit `Text + description`.
  - Where they are used: 81b10bef in every Library screen (95:113514…), and 4f4be618 on Cooper, Widget Builder and Trace Report.
- **consolidated: `tableHeader` 9c9ffe32… and `tableHeader` 609b40c3… → table-header-molecule (da7b4eb4).**
  - Both are unpublished and have identical properties: `sort`, `filter`, `title`, `state default|hover|active sort &filters`, `type column|row`.
  - Both are 32px with 8/12 padding, Heading/H4/UPPER and `text/tertiary`. The only difference is a 6px gap instead of 8.
  - Their sort and filter items are the kit table-sort-atom and table-filter-atom states.
  - 609b40c3 also sits inside the current content-row-molecule header as the empty last-column header (95:106546).
- **consolidated: `ai-search` (b419c093) → `Icon cooper-system-icon variant="Smart search"`.** Same artwork at 24px (the paths are the 16px icon scaled by 1.5). It only appears inside older smart-search instances.
- **consolidated: "ai smart search" (cfb1a43e at an older version: `Property 1`, `input=text`) → `SmartSearch`.**
- **consolidated: `table-filter-sort` (d0b0b2dd) = table-sort-atom.** Same key; this file caches it under its old name.
- `page-top` → `PageTop` (designer decision, Oct 2026: library pages use PageTop; a single object's page uses PageHeader). `DataTable pageTop={…}` puts the row tabs and search in it.
- **UNSURE: the table card is a local "section" frame (16px padding, 12px gap) vs `table-card-organism` (kit `Table` title/tabs/search: 12px padding, 8px gap).** None of these screens instance table-card-organism. `DataTable` follows the screens.
- **UNSURE: the Table view section's Gantt "Table view"** (`table-header-timeline`, `cell-base-atom-timeline`, `row-timeline`, `section-header-timeline`, `today-line-atom-timeline`, 190:229607) is IFS DS but not in the kit, and was not built here. It is a timeline view, not a data table.
