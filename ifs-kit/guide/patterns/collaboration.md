# Collaboration

Figma: IFS Design System Patterns › page "Collaboration" (0:1), section Collaboration (12:8435). Sub-sections: States (12:9422), Invite by name or role (12:10433), Invite suggested (12:12285), Push awaiting user (12:12868), Collaborator / Edit brief (12:8849), Change role (12:8436), Remove (12:11812).

## In short
- Drop `CollaboratorsMenu` (wired by `useCollaboration`) into `PageHeader` actions next to `CommentButton`. Entry is always this indicator; not a page or drawer.
- `CollaboratorsButton` shows "joined / invited", both including the owner (1/1 with nobody invited). Never count approvers or reviewers.
- `CollaboratorsPanel` is a `Popover` (360 wide) with sections IN PROJECT (owner "(you)" first), AWAITING, SUGGESTED BY COOPER; hide empty sections.
- The panel is never empty (the owner is always there). Close with ✕, Esc or outside click.
- One owner per record, no ownership transfer; roles are only Editor and Viewer (`RoleSelect`, which also holds Remove).
- Search lists only people not on the record; no match → `EmptyState` with suggestion `Chip`s. `RoleFilter` narrows by job role; clearing all → All.
- Invite: hover → "+" → `InviteCollaboratorModal` (Editor default, editable Cooper brief) → person under AWAITING, second count goes up.
- Edit brief: click a collaborator → same dialog; Save disabled until access or brief changes.
- Remove always asks for confirmation (`RemoveCollaboratorModal`), then the count drops.
- Reminder bell on awaiting rows only ≥24h after the last notification (invite counts); click → toast + disabled "Notified". No new invite or count change.
- Toast: neutral, ~4s, pauses on hover/focus, ✕. Online people get a green dot; `LiveCursors` show only others, in their collaboration colour (never data-viz).
- Details below: What it is / when to use it, Anatomy (kit components), Flows and states, Rules, Don'ts, Consolidated / unsure

## What it is / when to use it
The owner of a framework (or any record with an owner) invites people to work on it, sets each person's access (Editor or Viewer), edits the Cooper brief they receive, reminds people who haven't accepted, and removes people. Use it wherever a record has a single owner and invited collaborators. The entry point is always the collaborators indicator in the page header. It is not a page or a drawer.

## Anatomy (kit components)
- **Indicator:** `CollaboratorsButton` (button Tertiary S, `users-group`, "accepted/invited") next to `CommentButton` in `PageHeader` actions.
- **Panel:** `CollaboratorsPanel` = `Popover` (360 wide, title "Collaborators", ✕) + `Search` ("Invite by name or role…") + `RoleFilter` (`IconButton` Secondary M + multiple-select list with `Checkbox`) + `CollaboratorSection`s of `CollaboratorRow`s. A no-match search shows `EmptyState` with suggestion `Chip`s.
- **Row:** `CollaboratorRow` = content-card-organism top slot: `Avatar` M (Awaiting = dashed avatar; online = risk-atom Online dot), name + job role, then one control: `Badge` "Owner", `RoleSelect` (Editor / Viewer / Remove), ghost "+" (people who can be invited), and on awaiting rows the reminder bell (`IconButton` Tertiary S) or a disabled "Notified" `Button`.
- **Dialogs:** `InviteCollaboratorModal` (`Modal` "Add Collaborator": person + `RoleSelect`, "Brief by Cooper" + `TextArea`), `RemoveCollaboratorModal` (`Modal` "Remove this collaborator?"). Reminder confirmation: `toast` (`Snackbar`).
- **Presence:** `CollaboratorCursor` (cursor-atom) and `LiveCursors` (the other online people's cursors over the canvas).
- **Wiring:** `useCollaboration` (state + rules) and `CollaboratorsMenu` (button + panel + dialogs + toast; drop it into `PageHeader` actions).

## Flows and states
- **Indicator states:** Owner only 1/1 · Owner + awaiting 1/5 · Some accepted 3/5 · All accepted 5/5.
- **Panel (default):** IN PROJECT (owner "(you)" first with the Owner badge, then people who joined) · AWAITING · SUGGESTED PEOPLE BY COOPER. Empty sections are hidden.
- **Search:** focus with an empty field → Suggested by Cooper + Recently. Typing → RESULTS by name or job role. Nothing found → "No results found / You might be looking for" + chips that fill the query.
- **Filter:** the filter button lists All + job roles. Picking a role narrows the results to it.
- **Invite (search or Cooper suggestion):** hover a person → "+" → Add Collaborator dialog (access defaults to Editor, Cooper's brief is pre-filled and editable) → Send invitation → the person appears under AWAITING and the indicator's second number goes up (3/5 → 3/6).
- **Edit brief:** click a collaborator → the same dialog in edit mode. Save stays disabled until the access or brief changes → Saved.
- **Change role:** the access select → Editor / Viewer. **Remove:** select → Remove → "Remove this collaborator?" → Remove → gone from the panel, and the count drops (3/5 → 3/4).
- **Push (reminder):** an awaiting row whose last notification was 24 h ago or more shows a bell. Clicking it shows the toast "Reminder sent. You can push again in 24h." and the row shows a disabled "Notified" button.
- **Live presence (demo):** the other people who are online show a green dot on their avatar and a moving cursor on the canvas. When an invitee accepts, they move to IN PROJECT and the first number goes up.

## Rules
1. A record has exactly one owner. Ownership cannot be transferred. The owner can only grant view or edit access. (Figma)
2. The panel is never empty: the current user is always present as the owner, so there is no empty-panel state to design or build. (Figma)
3. The indicator counts invited collaborators, not approvers or reviewers: "joined / invited", where both numbers include the owner. With nobody invited it shows 1/1. (Figma)
4. Close the panel with ✕ in its top-right corner. Esc and a click outside also close it. (Figma / inferred)
5. Reminders go to an AWAITING invitee by in-app notification (bell + toast) and email. Both deep-link to the invitation's Accept / Decline. (Figma)
6. Manual "Resend" (push) is attributed to the owner ("A. Singh invited you again"). It reuses the existing invite and its Cooper brief. It does not create a new invite or change the count. (Figma)
7. Push is limited to 1 per invitee per 24 h. The control is hidden until 24 h after the last notification, and sending the invite counts as a notification. (Figma)
8. Auto-reminders are system-sent after N days of inactivity, are impersonal (they mention the elapsed time), repeat at intervals and then stop. Manual and auto reminders are separate sources and are never merged. (Figma)
9. Reminders stop when the invitee accepts or declines, the owner removes the invite, the invitee is replaced, or the record is archived. Queued reminders are then cancelled. (Figma)
10. Every reminder (manual and auto) is written to the record's Activity log ("A. Singh resent the invitation to Becky Blackbell"). Per-user notification preferences apply (email off → in-app only). (Figma)
11. Toast: neutral confirmation only, about 4 s, pauses on hover and focus, dismissible with ✕. (Figma)
12. Collaboration events reach Command Center as notifications and cards. A card opens the record at the anchored comment. (Figma)
13. Each invite carries a Cooper brief written for that person. The owner can edit it before sending and later. (Figma)
14. Removing someone revokes their invite ("This action will revoke the collaborator's invite to the framework") and always asks for confirmation. (Figma)
15. Search and Cooper suggestions only list people who aren't on the record yet, and no-result chips suggest people who can be invited. (inferred)
16. Picking a role while "All" is on narrows to that role. Clearing every role returns to All. (inferred)
17. Live cursors show only other people who are online and joined. Each person's cursor colour is their avatar's collaboration colour. Nobody sees their own cursor. (inferred)

## Don'ts
- Don't design or show an empty collaborators panel.
- Don't offer ownership transfer, or roles other than Editor and Viewer.
- Don't count approvers or reviewers in the indicator.
- Don't show the reminder bell within 24 h of the last notification, and don't create a new invite or change the count when someone is reminded.
- Don't remove anyone without the confirmation dialog.
- Don't use the data-viz palette for people. Cursors and avatars use the collaboration colours.

## Consolidated / unsure
- consolidated: the collaborator rows are `content-card-organism` (Size=M) with the top slot filled, not the legacy `collaborator` / `user-card` sets → built as `CollaboratorRow` (no new visuals).
- consolidated: `single-select-atom` Size=M drawn 24 tall + `single-select-list-molecule` with a divider and "Remove" → `RoleSelect`. The kit `Select` has no divider or action item.
- consolidated: `cooper-dots` (Property 1=insight) in the section headings → `Icon name="cooper-system-icon" variant="Insight"`.
- consolidated: header-pattern's `collaboration` frame (button Tertiary S + icon-button-comment) → `CollaboratorsButton` + `CommentButton` in `PageHeader` actions.
- UNSURE: no avatar stack, presence list or cursors are drawn on this page. Presence is shown only by the online dot. `LiveCursors` / cursor-atom on the canvas is inferred from the cursor-atom guide entry. Should live cursors appear on framework canvases?
- UNSURE: the no-results chips in Figma (12:11069) suggest James Reyes, Katarina Olsson and Maria Chen, who are already on the record. The build suggests people who can still be invited.
- UNSURE: the role filter lists "Field Lead", while people's job role is "Field Team Lead". Also, "Jane Green" uses the initials "LG" in the search results (12:10913).
- UNSURE: Edit brief frames are named "medium" / "high" (12:9247, 12:9330). The difference isn't visible (Cooper's confidence?).
