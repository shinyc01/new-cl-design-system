# Documents (Cooper's context)

Patterns file `KmmVU2D0kqWr0dC1xXNzWw`, page "Documents" 12:101272, section 12:111195.

## What it is / when to use it
The files attached to a record (investment, value framework) that build Cooper's context. They live in the bottom sheet, never on a page of their own: a documents button with the count opens a popover list. Upload is by the Upload icon-button or by dropping files on the content area. Use it on any record whose documents feed Cooper. Don't use it as a general file manager.

## Anatomy
- `BottomSheet type="value"` with `left={<DocumentsContext controller={c} />}`: "Cooper's Context", an optional `ProgressBar` coverage, the documents `Button` (tertiary M, `system-file`), the Upload `IconButton` (tertiary M, `system-upload`). The prompts and `FtaButton` are on the right.
- `DocumentsPopover`: `Popover` (title "Documents", `Counter`, search, ✕) holding `DocumentRow`s.
- `DocumentRow`: a `FileCard` row. Name and upload date; hover shows ⋮ (editable, menu with Download / Remove) or a Download icon-button (read-only). Error rows show Remove + Retry. Uploading rows show the `FileCard` loading skeleton.
- `DocumentsDropArea`: wraps the content region. While files are dragged over it, it shows `DropZone` (move-and-drop-background, change-position-overlay) and `NodeCard type="document"` ghosts.
- `DocumentsFeedback`: `Alert type="error"` and `Snackbar`, top-right under the page header.
- State and rules: `useDocuments({ defaultDocuments, editable, required, … })`, passed as `controller` to all of the above.
- Screen chrome as in the frames: `NavBar`, `PageHeader` (+ `Stepper`), `SideNav` / collapsed rail, `CanvasHeader`, `CanvasBackground`, `StatCardsRow`, `DataVizCard`. The investment map uses `MapPinPole`, `MapPinDot`, `MapPinDefect` and `MapPinFlow`. The forecast uses `VerticalBarChartItem` / `BarChartItem`.

## Flows and states
1. **Count** — The button reads "1 Document" / "N Documents". The popover height follows the item count. 1–7 docs: no search, no scroll. 8–9: max height 360 + scroll. 10+: search appears.
2. **Open / preview / download** — The button toggles the popover. ✕, Esc or an outside click closes it. Clicking a row opens a preview in a separate window. Download saves the file.
3. **Search** (10+) — Filters by name as you type, and the height changes with the matches. No match: "No results found", with no counter.
4. **Upload** — Upload button → file picker (multiple), or drop on the content (purple dashed overlay while dragging, gone on drop/leave). Each file is checked first. Accepted files show as loading rows and the button icon spins. On success the count goes up and the list opens with the new file on top.
5. **Remove** (editable) — ⋮ → Remove. The row goes and the count drops. A snackbar says "The document has been removed", with Undo.
6. **Errors**
   - Unsupported format, file too large, or several files with some rejected: an alert. See Rules for the wording.
   - Network failure: the row stays in the list with "Upload failed" and Retry ("Try again"). It isn't counted until a retry succeeds.
7. **Empty**
   - Context required: progress bar + Upload. The bar fills as documents are processed, and at 100 % it gives way to the normal state.
   - Context optional: Upload only.
   - In both, the documents button is hidden at 0 documents.
8. **Read-only** — Published or archived records. No Upload, no drop, no ⋮. Rows keep Download. Search and the counter still work.
9. **Long names** — Middle truncation; tooltip with the full name on hover.

## Rules
- The popover is at most 360 px tall. Search appears only at ≥ 10 documents. (Figma)
- Label: "1 Document", "2 Documents" (plural from 2). (Figma)
- Sort by upload date, newest first. (Figma)
- Two ways to attach: the Upload button and drag & drop. While files are dragged over the content the background turns purple, and it returns to default when the drag ends. (Figma)
- Each file is checked before upload, and a rejected file is not added to the list. The counter and the popover stay unchanged, so the user can pick another file. (Figma)
  - Unsupported format: «Can't add "{file}" — supported formats are {list}.» (Figma frame: PDF, DOCX, XLSX, PPTX, TXT and CSV)
  - Too large: «Can't add "{file}" — the file is {size}, the limit is {limit}.» No Retry. (Figma) The limit used here is 25 MB. (inferred)
  - Several files, some rejected: one message, «{n} of {total} files added. {m} files were skipped — unsupported format or too large.», with "See details" listing each rejected file and why. (Figma)
- Error messages carry the error icon and don't auto-dismiss. They close on ✕ or on the user's next action. (Figma) Shown as `alert-organism` Type=Error, as the frames draw it. (Figma)
- Network failure: the row keeps its place in the error state ("Upload failed" + retry, tooltip "Try again"). It is not counted and is not in Cooper's context until it uploads. Retry re-sends the same file, one row at a time. Completed files of a multi-upload stay. The row goes only if the user removes it. (Figma)
- Removal snackbar: 4000 ms, paused on hover and focus, neutral confirmation, dismissible with ✕. (Figma) It offers Undo. (Figma frame)
- Clicking a row opens a preview in a separate window. Download downloads. Remove removes. (Figma)
- Empty state depends on whether Cooper's context is *required* to leave the stage, not on the count. Cooper's context stays in place. The counter appears with the first document, and the list replaces the empty state. (Figma) Coverage here grows 25 % per usable document. (inferred)
- The mode follows the record's stage. Editable up to publication (Input, Shape … ). Read-only once Active, Scheduled or Archived. (Figma)
- Unavailable actions are not rendered — never shown greyed. The list never disappears on a published record. To change the documents, create a new version. (Figma)
- Long names: truncate in the middle so the start and the extension stay visible, and never wrap. Every row keeps the same height, and the date is never truncated. The tooltip shows the full name after the standard delay and is anchored to the row, not the cursor. (Figma)
- The popover sits 4 px above the bottom sheet, clear of left-side canvas tools. (Figma frames)

## Don'ts
- Don't show the documents button at 0 documents.
- Don't add rejected files to the list or the count.
- Don't count failed or uploading files.
- Don't grey out Upload / Remove on read-only records — omit them.
- Don't truncate names at the end or wrap them.
- Don't use a snackbar for errors, or an alert for the removal confirmation.

## Consolidated / unsure
- consolidated: `Evidence-strip-bar/all actions` (key 4512b2ec, not in the IFS DS library) → `BottomSheet type="value"`. Same label, buttons, prompts and FAB at 40 px.
- consolidated: `content-card-organism` with Top/Bottom slots (investment cards) → `DataVizCard`. The kit `ContentCard` always draws its title block.
- consolidated: `chart-strategic-objectives-breakdown` type=By budget ("Yearly forecast") → composed from `VerticalBarChartItem` (muted purple). `investment value` → composed from `BarChartItem`. Both are legacy charts that aren't in the kit.
- consolidated: `tableHeader` / `tableCell` (9c9ffe32, 4f4be618) inside the investment card → plain key/value rows. They are legacy table sets.
- consolidated: the floating "Share the context, I'm listening" Cooper input on the draft frame is not part of this pattern. Not rebuilt.
- UNSURE: map-pin-dot `status=Success` is bound to `map-pin/fill/default` (grey), while map-pin-defect "Monitoring" uses `fill/success` (green). Built as drawn. Node 12:107208 vs 12:106856.
- UNSURE: `vertical-bar-chart-item` and `bar-chart-item` fills inside the forecast instance are `data-viz/muted purple/data-4`, but the set binds `data-viz/data-N` variables that aren't exported to the kit. Built with the set's values as fallbacks. Node 12:107849 vs I168:433196;2154:2597.
- UNSURE: the "Long name" hover frame (168:434629, editable record) shows a Download icon, but the list-type note says editable rows show ⋮ (Download / Remove). Built per the note.
- UNSURE: the error dev note (168:436689) says "snackbar", but the frames and the per-case notes use alert-organism. Built as an alert.
