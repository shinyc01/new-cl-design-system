# System Confidence · Trace Report · Readiness Evaluation

Patterns file `KmmVU2D0kqWr0dC1xXNzWw`, page 12:121114. Sections: System confidence 30:72980, Trace report 12:175763, Readiness Evaluation 12:192947.

## What it is / when to use it
These are three right-hand panels that all show the system's verdict on a framework. (Figma, 30:75462)
- **System Confidence** is for the framework's **author** on Review. It shows approval readiness by gate, plus the open questions and warnings to work through.
- **Trace Report** is a **reaction to a user change** the system considers incorrect. It lists errors, warnings and notes, one at a time.
- **Readiness Evaluation** is for a **stakeholder reviewing someone else's framework**. It shows whether the framework is ready to approve against that reviewer's gates.

## Anatomy
- State: `useIssueReport({ issues, kinds, gates, onResolvedAll })` is the controller for System Confidence and Trace Report. Kinds come from `CONFIDENCE_KINDS` (Open questions, Warnings) or `TRACE_KINDS` (Errors, Warnings, Notes).
- `SystemConfidence` is built from `Panel` holding one `ContentCard`. The card contains:
  - `ConfidenceGates`: `ProgressRing`, plus one `ReadinessStatus` per gate with XS `Indicator`s and a `Tooltip` on each.
  - `IssueKindSwitch` (`SegmentedControl` S with counters).
  - `IssueNavigator`.
- `TraceReport`: `type="drawer"` builds on `Drawer` (inline, floating over the canvas, collapse only). `type="sidebar"` builds on `Panel`. Both have the `SegmentedControl` in the sub-header, `IssueNavigator`, and the footer **Undo** (`Button` tertiary L).
- `IssueNavigator`:
  - `ProgressPager` (`Pager` with "(n% resolved|viewed)", All, ‹ ›), then the issue title (H2) and description.
  - Then one of these: a "Solutions" list of `IssueSolution`s, the **Upload file** / **My answer** buttons (`IssueAnswerField` = `TextField` M with ✕ ✓), a single **Okay** (`Button` secondary M), or the "Applied" / "Answered" card with undo.
  - The "All" view lists `IssueListItem`s (`Counter` + title + ✓).
- `PanelRail` is the collapsed 48 px rail: `ArrowButton` (arrow-bar-left) with a red or orange dot.
- Readiness Evaluation reuses `ReadinessEvaluation` / `ReadinessSection` / `ReadinessFacts` (patterns-approval) inside `Panel`. Reviewer notes are `SourceCard type="user"`. The header uses `SplitButton` (Approve ▾ → Request more info).
- Screen: `AppShell`, `NavBar`, collapsed `SideNav`, `PageHeader` + `Stepper`, `BottomSheet type="value"`.
  - On Review screens, the content is `Stat`, `Tabs`, `InvestmentValueImpact` and `TableReview`.
  - On the map, it is `CanvasHeader`, `CanvasBackground`, `NodeCard` and `ValueMapButton`.

## Flows and states
1. **Walk item by item**: ‹ › move through the current list. The first item has ‹ disabled, the last has › disabled, and middle items have both. **All** shows the numbered list, and clicking a row opens that item.
2. **Switch kind**: the segmented control changes the list. The position resets to 1, but the % stays, because it describes the list.
3. **Resolve**. Each of these resolves the item: picking a solution (shown under "Applied", with undo), saving My answer (shown under "Answered"), uploading a file (shimmer row, then "Answered"), or pressing Okay (warnings and notes are "viewed").
   - A resolved item shows ✓ before the count and in the list.
   - Its gate turns to Passed (green check) once all of its items are resolved.
   - The readiness % and the indicators ("resolved/total") update.
4. **Undo** an applied or answered item: the icon-button on its card puts the item back to unresolved.
5. **100 %**: every gate is Passed and the pager reads "(100% resolved)". Send for approval enables.
6. **Collapse**: System Confidence and the sidebar Trace Report collapse to the rail. The drawer Trace Report collapses to its header only.
7. **Trace Report lifecycle**: it opens on an incorrect change and closes by itself when everything is resolved (`onResolvedAll`). Undo in the footer reverts the change.
8. **Readiness Evaluation states**:
   - Approved view: 100 %, "Ready to Approve".
   - Blocked view: for example 40 %, "Budget Envelope Exceeded", with a red gate and an extra section.
   - Sections expand one by one.
   - Request more info changes the status from Pending approval to Revision required.

## Rules
- Red indicators are Open questions or Errors; orange are Warnings. The issue total in Approval readiness matches the segmented counters. (Figma, 30:73560)
- If a kind has no items, the segmented control is hidden. In Trace Report, it is hidden as soon as only one kind is left. (Figma, 30:73560, 12:179851)
- The tooltip on an indicator appears on hover. (Figma, 30:73267)
- Card layout depends on context, and the system chooses it. Solutions can have a description or not. Upload file, My answer and Okay appear only when needed. (Figma, 30:74581)
- The rail dot is red for open questions, orange for warnings, and absent when everything is OK. (Figma, 30:75447)
- The counter "1 / 2" is a position. "(n% resolved)" is progress across the same list, independent of the position. The position resets when the list or filter changes, and the % doesn't. (Figma, 242:66361)
- A Passed item gets a green check. (Figma, 30:76049)
- The cancel (undo) button on an applied or answered card appears on hover. (Figma, 30:77198)
- Trace Report errors and warnings can't simply be dismissed. The report can't be closed, only collapsed, and it closes automatically when everything is resolved. (Figma, 12:176195)
- Trace Report is a sidebar or a floating drawer depending on the screen. Its content and behaviour are the same in both. (Figma, 12:176590)
- Trace Report uses the same cards and buttons as System Confidence. (Figma, 12:176595)
- The Readiness Evaluation panel is assembled from the case's data, meaning the gates and metrics that actually exist. It does not follow a fixed template. (Figma, 12:193507)
- In the Blocked view, "Request more info" sets the framework to Revision required. The author sees the reviewer's comment in the activity log. (Figma, 12:193512)
- The recommended solution is Cooper's pick. It gets the Cooper insight icon, the cooper gradient title and the cooper-base fill. (Figma frames)
- Warnings and notes count as "viewed"; questions and errors count as "resolved". (Figma frames)

## Don'ts
- Don't add a close button to Trace Report, and don't let its items be dismissed without action.
- Don't show the segmented control for a single kind.
- Don't paginate tables with the Pager. It is for items one at a time.
- Don't use System Confidence for a reviewer (use Readiness Evaluation), or Trace Report for a standing audit.
- Don't grey out the actions an issue doesn't need. Leave them out.

## Consolidated / unsure
- consolidated: `sidebar-organism` (9e6ee63e) with a custom Content slot → `Panel`. Its collapsed View is rebuilt as `PanelRail` (48 px), because Panel's own rail is 84 px with two buttons.
- consolidated: the nested content-card holding the gate rows (no fill, no padding) → plain list.
- consolidated: `tab` (04fe5ad605, not IFS DS) → `Tabs`.
- consolidated: `tableHeader` / `tableCell` (9c9ffe32 / 4f4be618) in readiness sections → `ReadinessFacts`.
- consolidated: the readiness accordion (content-card with caret + badge) → `ReadinessSection` (Approval agent).
- UNSURE: the "OVER BY $140M" badge text is bound to `text/success` but drawn red (12:194704). Built red.
- UNSURE: the uploaded-file "Answered" frame (30:78117) shows the typed-answer text rather than a file name. Built with the file name.

## Review
- The notes say the undo (cancel) button on Applied / Answered cards appears on hover (30:77198, 30:77203, 30:77822, 30:78249). The frames show it at rest (30:76774, 30:77690, 30:78117). Built per the notes.
