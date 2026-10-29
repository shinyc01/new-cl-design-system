# Approval chain pattern

Source: IFS Design System Patterns › page **Approval chain** (12:157840), sections "Stakeholder (Reviewer) Review and Approve" (12:216578) and "Owner - Approve" (12:220976). Kit family: `patterns-approval` (`src/components/patterns-approval.jsx`).

## What it is / when to use it
The Approve stage of a framework or investment. Reviewers see the change's impact and a readiness evaluation. Each reviewer then approves it or requests more information. The owner follows every reviewer's state in the approval chain, nudges reviewers who are late, and publishes once everyone has approved, or sends the item back for review after revisions. Use it on any object that passes Input → Shape → Review → Approve.

## Anatomy
- **Page chrome**: `NavBar`, `SideNav` (collapsed), `BottomSheet type="value"` (16 Documents, two prompts).
- **`PageHeader`**:
  - `Indicator` xs for the status: Draft / Shaping (gray), Pending approval (orange), Revisions required (red), Ready to publish (blue), Active (green).
  - `SegmentedControl` S with icons.
  - `Stepper` Input/Shape/Review/Approve.
  - Actions: "3/5" `Button`, comments `IconButton`, then "Approval chain" `Button` (reviewer only), then the main `SplitButton`.
- **Main column** (Executive summary):
  - title and description
  - `Stat`: one compare `QuickStatCard` and three plain ones
  - `Tabs` (Portfolio Impact / Strategic Alignment)
  - `InvestmentValueImpact`: `DataVizHeader`, metric strip, distribution bars, `InfoHintItem` legend
  - `TableReview`: kit `Table` with groups, sort and filter
- **Reviewer sidebar**: `Panel` "Readiness Evaluation" holding `ReadinessEvaluation`:
  - the summary card, "Approval readiness" with `ProgressRing` 16 and `ReadinessStatus` rows
  - `ReadinessSection`s with a `Badge color="false"` or a `Counter`
  - `ReadinessFacts` key/value rows inside the sections
- **Approval chain**: `ApprovalChainPanel` (sidebar 380 / popover 440 / full) around `ApprovalChainTable`, which is made of:
  - an `ApprovalStatus` rail with a dashed connector
  - user cells (`Avatar` S)
  - notes: ghost `Button` "Add note", `TextArea`, `ActionMenu` Edit/Delete
  - the filter: `Popover` + `Search` + `Chip`s, and `EmptyState` when nothing matches
  - Push: secondary S `IconButton` `system-notification`, then a disabled "Notified" `Button` with a `Tooltip`
- **Confirmations**: `Modal` (overlay base). **Feedback**: `toast`.

## Flows and states
**Reviewer** (frames 138:290099 … 138:291235):
1. Review the summary, the value impact, the table and the readiness evaluation. Readiness is either 100 % ("Ready to Approve") or 40 % ("Budget Envelope Exceeded"), with the failing check and an extra Budget envelope section.
2. "Approval chain" opens the chain as a popover under the header. ⤢ makes it full screen, which collapses the Readiness sidebar. ✕ closes it.
3. Notes: add, edit or delete your note in the chain. "Reviewer notes" counts them.
4. **Approve**: the confirm modal "Approve this framework?", then a toast "Framework approved" with Undo. The button becomes **Approved**, disabled with a check. Your chain row turns success.
5. **Request more information** (caret menu): a modal with a Note. On submit the status becomes **Revisions required**, the toast "Revision requested — sent back to {author}" offers Undo, and the button becomes **Info requested** (disabled). The "Approval chain" button is hidden. Your row turns rejected, and your note becomes its comment.

**Owner** (frames 157:105911 … 320:157833):
1. The chain sits in the right sidebar (USER + NOTE). It collapses to a rail (|→) or goes full screen (⤢). Full screen adds COMMENT, LAST NOTIFIED and an action column once any row has that data.
2. **Push** an awaiting (clock) reviewer: the toast reads "Reminder sent. You can push again in 24h.", Last notified is stamped, and the cell shows "Notified" (disabled) with a live countdown tooltip.
3. While reviewers are pending, **Publish** is disabled. When all have approved, the status becomes Ready to publish, Approve is complete and Publish is enabled. Publish opens "Publish this framework?", then "Publish now" sets the status to Active, shows the toast "…is now active", and the button becomes **Published**.
4. When a reviewer requests revisions, their row turns rejected and shows the comment plus a **Shape** action. Shape moves the item to Shaping (stepper on Shape). **Send for review** opens "Send for review?", then "Send now" resets the reviewers to not-acted and the status back to Pending approval.
5. A replaced reviewer shows the old avatar › the new avatar, plus an ⓘ tooltip "This reviewer was replaced by another stakeholder."

## Rules
- The readiness panel is assembled from the case's data. It lists only the gates, checks and metrics that exist for that framework. (Figma)
- A reviewer who blocks the framework uses "Request more info". The status then goes from Pending approval to Revision required, and the author sees the reviewer's comment in the activity log. (Figma)
- Approve → **Approved**, disabled. The Approval chain button stays active. Once all reviewers approve, the framework is ready to publish. (Figma)
- Info requested → **Info requested**, disabled. It returns to **Approve** only after the author revises and sends the item for approval again. (Figma)
- Expanding the approval chain to full screen collapses the Readiness Evaluation sidebar. (Figma)
- Toasts:
  - approve and request-info toasts auto-dismiss after 5 s and pause on hover (Figma)
  - note edit/delete, push and publish toasts last 4 s, pause on hover and focus, are a neutral confirmation only, and can be dismissed (Figma)
- Notes:
  - approvers add a note to their own row, and the owner can add a note to any approver's row (Figma)
  - only a note's author can edit or delete it, so the owner cannot edit or delete approvers' notes (Figma)
  - click outside the editor to save (Figma)
  - Esc cancels the edit (inferred)
- The COMMENT column shows what the approver wrote themselves at decision time, exactly as written. It updates when they edit it there, and is empty when they left no comment. (Figma)
- Push and reminders:
  - a reviewer with a pending approval who hasn't acted for {N} days is notified in-app (bell + toast) and by email (Figma)
  - a manual push is attributed to the owner, is limited to one per reviewer per 24 h, and has no threshold (Figma)
  - auto-reminders come after {N} days, then every {N} days, 3 at most, and use impersonal wording (Figma)
  - everything stops when the reviewer acts, the version is withdrawn, the reviewer is replaced or the approval closes (Figma)
  - every push is logged in the Activity log, and the user's notification preferences apply (Figma)
  - the "24h" in the Notified tooltip is a live countdown, rounded up to the hour, and switches to minutes under 1 h (Figma)
- The clock status means it's time to notify the reviewer, and only clock rows get a Push button. (Figma)
- The USER filter:
  - it appears only when the chain has more than 3 approvers (Figma)
  - it applies live, with no Apply button (Figma)
  - chips (All, Approved, Awaiting, Rejected, Revisions required) are multi-select, and All resets them (Figma)
  - search matches name or role as you type, and ✕ clears it (Figma)
  - search and chips combine (Figma)
  - the counter shows the number of active conditions: 1 for a chip other than All, 1 for a non-empty query (Figma)
  - Clear all resets both (Figma)
  - when nothing matches, "No results found" shows while the filter stays open (Figma)
  - clicking outside closes it (Figma)
  - Awaiting also matches not-acted rows (inferred)
- In the compact chain, notes are clamped to 4 lines, and the full text shows in the full view. (inferred)

## Don'ts
- Don't approve or request information without the confirm modal.
- Don't give the owner Edit/Delete on an approver's note, or invent text for an empty COMMENT cell.
- Don't show Push on rows that aren't awaiting, or more than once per 24 h.
- Don't enable Publish until every reviewer has approved.
- Don't use the kit `ApprovalChain` (card timeline) for this table-style chain.

## Consolidated / unsure
- consolidated: `tab` (04fe5ad6, state default/hover/selected) → kit `Tabs`. It's an older copy of tab-atom with the same look.
- consolidated: `tableHeader` (da7b4eb4 / 609b40c3 / 9c9ffe32) and `tableCell` (688040eb / 81b10bef / 4f4be618) → kit `Table` cells, and the chain's own header/cell styling.
- consolidated: `badge` (452878e4) → `Badge color="white" size="m"`. `counter` (d1fbe5eb) → `Counter`.
- consolidated: `chart-header` (b323b777) → `DataVizHeader`. `cooper-evidence` (23c26b5d, Type=medium) in the readiness header → `Panel`'s evidence button.
- consolidated: `sidebar-organism` (9e6ee63e) holding the readiness card → `Panel`. `sidebar-value` (7d91409b) / `sidebar-pattern` → `SideNav`. `header-pattern` → `PageHeader`. `value-bottom-sheet-organism` / `Evidence-strip-bar` → `BottomSheet`.
- consolidated: `single-select-list-molecule` → `SplitButton` menu / `ActionMenu`. `snackbar-organism` → `toast`. `modal-organism` + `overlay` → `Modal`. `text-area-organism` → `TextArea`. `search-regular-organism` + `chips` → the chain filter. `empty-state-organism` → `EmptyState`.
- consolidated: `stat` is close to `StatCardsRow`/`StatCard`, but it has a compare card and 10px uppercase sub-lines, so it is built as `Stat`.
- **UNSURE: `approval-chain-item` (40e7aa77) / kit `ApprovalChain` vs this page's chain.** This page never instances approval-chain-item. Its chain is a local table (sidebar-organism → content-card → `status` + tableHeader + tableCell "user expanded"), e.g. 157:106020 and 157:114827, with notes, comments, push, filter and replaced reviewers. The kit `ApprovalChain` is a card timeline with Approve/Reject buttons and can't do any of these. Built as `ApprovalChainTable`.
- **UNSURE: who may add notes.** The dev note (253:53983) says approvers add notes to their own row. The reviewer frames (138:292115, 138:292305) show "Add note" on every row except the reviewer's own. Built per the note.
- **UNSURE: readiness Warning icon.** "Budget envelope — Exceeded" is drawn red in Figma (status-readiness-molecule Type=Warning, 138:293545), but kit `ReadinessStatus type="warning"` renders the orange warning icon.
- **UNSURE: `status` keys.** The Patterns file instances `status` 84df17a7, while the IFS DS library publishes `status` b0bad471. `Investment-value-impact` and `table-review` now appear in the library as "review-data-visualisation" (870f29f2) and "review-investment-table" (2e9a2874).
- Not built: the Schedule publish path (309:55377 …, 313:61635), Edit/Publish-now-from-scheduled, the Collaboration frame (157:119094) and the Strategy Framework list after publishing (309:55262).
