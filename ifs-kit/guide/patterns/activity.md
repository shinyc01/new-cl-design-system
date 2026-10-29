# Activity, Versions pattern

Source: IFS Design System Patterns › page **Activity, Versions** (12:339984), section Activity log (52:83648). Kit family: `patterns-activity` (`src/components/patterns-activity.jsx`).

## In short
- Use `ActivityPanel` wherever a record offers "Activity" (row ⋮ › Activity, or title ⌄ › Activity); use `CompareView` for a framework's Compare view.
- `ActivityPanel`: `Overlay` + 380px full-height `Panel` titled ACTIVITY with ✕; ✕, overlay or Esc closes.
- `SegmentedControl` S Version History | Approval Chain only if the record has an approval process; otherwise no control (`approvals={undefined}`).
- Approval process but no chain yet: keep the control, show `EmptyState` "No approval chain yet". Approval rows are display-only, never clickable.
- `SmartSearch` filters the list (by person, type, status…); never answer in a chat bubble. No match → "No results found" + chips.
- Versions newest first, current has `Badge` "Current"; card shows last-activity author; caret expands a nested activity `Timeline`; ⋮ on hover.
- Click a version → opens it read-only. ⋮ Compare → `CompareView` against current (current compares with previous).
- ⋮ Duplicate → new framework in Draft. ⋮ Restore (not on current) → confirm `Modal`, then a new draft. Never roll back in place.
- ⋮ Rename: inline input with ✕/✓, Enter/Esc; name must be unique (red error, ✓ disabled); success toast with Undo. Renames only the version label.
- Entries: `Avatar` (Cooper: `type="cooper"`), name, type `Badge` (Comment / Action / Auto-action), role, time, text.
- Compare: `CompareHeader` dropdown baseline; four `StatCard`s (`ifs-compare-stat`) with `CompareStatValue`; two-source `Sankey`; ✕ clears to current only.
- Don't build version cards from legacy `version-history` / `timeline activity component`; use the kit timeline base (`TimelineItem`).
- Details below: What it is / when to use it, Anatomy, Flows and states, Rules, Don'ts, Consolidated / unsure

## What it is / when to use it
The record's history: who did what (activity log), the saved versions of the record (version history), the approval chain, and a side-by-side comparison of two versions or benchmarks. Use `IFS.ActivityPanel` whenever a record (strategy framework, value framework, investment, study) offers "Activity". Use `IFS.CompareView` for the Compare view of a framework.

## Anatomy
- **ActivityPanel**: `Overlay` (Type=Base) + `Panel` (380px, full height, title ACTIVITY, ✕).
  - `SegmentedControl` S, full width: Version History | Approval Chain.
  - `SmartSearch` ("Ask anything about version history / approval chain") with suggested questions.
  - Version history: the kit timeline base (`TimelineItem` with the M marker as expand toggle). Each version card has a title, a `Badge` "Current", a description, the last-activity author (`Avatar` XS) and time, and a ⋮ `ActionMenu`.
  - Expanded version: a nested `Timeline` of activity entries. Each entry has an `Avatar`, name, a type `Badge` (Comment / Action / Auto-action), role, time and text. Cooper uses `Avatar type="cooper"`.
  - Approval chain: `ApprovalChain` (display-only steps).
  - `EmptyState` for no results and for no approval chain. `Modal` to confirm Restore. `toast` with Undo after a rename.
- **CompareView**:
  - `CompareHeader` (compare-header): the "COMPARE TO" box with a `CompareDropdown` (compare-dropdown + `CompareDropdownList`).
  - Four `StatCard`s with `className="ifs-compare-stat"`, each with a `CompareStatValue` (baseline → current).
  - `Sankey` with two source blocks: current and baseline.
- **Page chrome**:
  - Library: `AppShell`, `NavBar`, `SideNav`, `PageTop` + `DataTable` (Tabs with counts, smart search, row ⋮).
  - Framework: `PageHeader` (title ⌄ menu, status `Indicator`, view `SegmentedControl` grid / map / compare, `CooperChip`), `CanvasHeader`, `CanvasBackground` + `NodeCard`s, `BottomSheet` type value.

## Flows and states
- **Open Activity**:
  - From a library row ⋮ › Activity.
  - From the framework title ⌄ › Activity.
  - The panel slides over the page with a dim overlay. ✕, the overlay or Esc closes it.
- **Version history**:
  - Collapsed cards, newest first. The current version carries "Current".
  - Hovering a card shows ⋮.
  - The caret expands the version's full activity log. The author row hides while it is expanded.
- **Open a version**: click the card or its name. That version opens read-only in the framework view.
- **⋮ Compare**: opens the Compare view with this version as the baseline against the current one.
- **⋮ Duplicate**: creates a new framework in Draft from that version and opens it (map, stepper at Input/Shape).
- **⋮ Rename**:
  - The title becomes an input with ✕ (cancel) and ✓ (apply). Enter applies and Esc cancels.
  - A duplicate name shows an error and blocks the save.
  - A successful rename shows a toast with Undo.
- **⋮ Restore**: a confirm modal "Restore this version?", then Cancel or Restore. Restore creates a new draft and opens it.
- **Activity log filter**: ask in the smart search, by person ("What did A. Singh do?"), type ("Show comments only", "What did Cooper change automatically?") or both ("comments by Shiny"). Matching versions expand and show only the matching entries. Other questions match version names, descriptions, authors, dates and log text. No match shows "No results found" with "You might be looking for" chips. ✕ clears the search.
- **Approval chain**:
  - Reviewers appear with their status (approved, awaiting, rejected) and are filtered by the search ("Who hasn't responded yet?", "Show me everyone who approved").
  - With no chain yet, the panel shows "No approval chain yet".
- **Compare view**:
  - Pick a baseline in the dropdown: Top benchmarks, Versions or All frameworks. The stat cards and Sankey update.
  - ✕ clears the baseline. Only current values show, and the Sankey has one source.

## Rules
1. The panel holds two views behind a segmented control, and the control exists only when both views have something to show. A record with no approval process at all (e.g. a study) opens straight on Version history, with no control. The header still reads ACTIVITY and the search still searches the version history. Pass `approvals={undefined}`. (Figma)
2. A record that has an approval process but no chain yet keeps the control and shows "No approval chain yet / Approvers appear here after you send this framework for approval". (Figma)
3. The smart search filters the panel. Cooper reads the query (by author, date, status or what changed) and returns the same list with fewer items. It is not a chat answer. (Figma)
4. Clicking a version card or name opens the record view for that version in read-only mode. (Figma)
5. Compare uses the current version as the baseline for any non-current version. For the current version it compares with the previous version. (Figma for non-current; inferred for current)
6. Duplicate creates a new framework in Draft with the selected version's content. It is a new framework, not a new version. (Figma)
7. Rename changes only the version's label. The parent framework's name stays the same. (Figma)
8. Restore creates a new draft from the selected version, after confirmation. The history is unchanged: it is a fork, not an in-place rollback. The new draft must go through approval and publishing before it can become active. (Figma)
9. Rename validation: (Figma)
   - On save, the name must be unique among the record's versions.
   - If it isn't, the input turns red with the error text, ✓ is disabled, and ✓ shows a tooltip with the same message.
   - ✕ closes without saving and keeps the original name.
10. Each version card shows the last activity user, the person who made the most recent change in that version. The caret opens that version's full activity log. (Figma)
11. Approval chain reviewer rows are display-only: they are not clickable and have no hover or pointer affordance. (Figma)
12. The current version carries the "Current" badge. Restore is not offered on it. (Figma badge; inferred omission)
13. Push reminders (approval chain): (Figma; not built here)
    - The owner taps Push on a pending reviewer. This sends an in-app notification and an email, attributed to the owner, at most once per reviewer per 24h. The tooltip shows "Reminder sent. You can push again in 24h", and the hours are a live countdown.
    - Auto-reminders come from the system after N days of inactivity and are capped.
    - Every push is logged to the Activity log ("A. Singh pushed Becky Blackbell").
    - Queued reminders are cancelled when the reviewer acts, the owner withdraws the version, the reviewer is replaced or the approval is closed.

## Don'ts
- Don't answer an activity question in a chat bubble. Filter the list instead.
- Don't roll a framework back in place. Restore and Duplicate always create a new Draft.
- Don't make approval rows clickable.
- Don't show the segmented control on records without an approval process.
- Don't build version cards from the legacy `version-history` / `timeline activity component` sets.

## Consolidated / unsure
- **consolidated: `timeline activity component` (bc78050b, activity-timeline, e.g. I52:83990;…;2277:6391) → `Timeline` / `TimelineItem` (activity.jsx).**
  - Both are an avatar marker, name, type badge (Action / Comment / Update), role, time and text on the timeline base.
  - Its Type variants map to the `badge` label.
- **consolidated: `version-history` (e90e29e6, version-history-timeline, e.g. I52:83756;…;52:83752) → the kit timeline base, as used by `VersionHistory` / `VersionEntry`.**
  - Same card (padding 12, radius 8, surface/secondary-alpha), M marker toggle and nested activity.
  - `ActivityPanel` composes `TimelineItem` itself instead of `VersionEntry`, because VersionEntry lacks: a ⋮ menu (it has ⋯ = rename), a controlled rename, and the rename error / disabled-apply state. See Kit changes.
- **consolidated: `compare-quick-stat-card` (35bab075 = IFS DS `stat-capital-flow-card`, legacy; Patterns 52:82588) → `StatCard` + `CompareStatValue` as its `value`.**
  - The title is text/secondary (StatCard uses tertiary) and the description is bottom-aligned. Both are scoped by `className="ifs-compare-stat"`.
  - Variant2 is not used on this page.
- **consolidated: `sunkey-item` 3389a548 = sankey-atom → `SankeyNode`; `sunkey-item` 7b5c534e (an older copy without the `compare-data` boolean) → `SankeyNode` (leave out `change`); `sunkey-header` (ce04ed8a = IFS DS sunkey-canvas-header) → the column strip that `Sankey` draws.** All of these sit inside `Sankey` (52:84351).
- **consolidated (as in table.md): `tableCell` / `tableHeader` legacy sets, `ai smart search` → `SmartSearch`, `overlay` → `Overlay`, `single-select-list-molecule` row menus → `ActionMenu`, `panel-organism` → `Panel`.**
- `page-top` → `PageTop` on the library screen (designer decision, Oct 2026); the framework screen keeps `PageHeader`.
- **UNSURE: the Activity panel is `panel-organism` + `overlay`.**
  - The Panel guide says a panel lives in the layout with no scrim, but this panel is on demand with a scrim, which is how the guide describes a drawer.
  - Figma also replaces the panel's collapse toggle with ✕.
  - Built as Panel + Overlay to match Figma.
- **UNSURE: "drop-down list" inside compare-dropdown: this file caches key c5186fed, but IFS DS publishes "drop-down list" as ddd60a12.** Built as `CompareDropdownList`. It may duplicate the single-select list.
