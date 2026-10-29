# Cooper (AI assistant)

Figma: IFS Design System Patterns › page "Cooper" (12:263487). Sections: Recommendation (67:107340), Chat (67:121910), Chat interactions (67:216492), prompt chips (67:307397).

## In short
- Cooper floats over or docks into the AppShell content area. Never open it as a modal or a full page.
- Open via the avatar (`FtaButton`) in `BottomSheet`, `/`, or "Hey Cooper". Voice is the default mode; the keyboard icon switches to text.
- Sizes: `ChatCollapsedBar` → `ChatCompactPanel` → `ChatFullPanel`. − or a click outside collapses to the avatar; it never fully closes.
- While the chat is open, hide the bottom-sheet prompt chips and avatar. Sending from the bar opens the compact panel.
- Answer: `UserMessage`, then `CooperMessage` Analysing ("Step n/total") → Streaming → Answered. Send becomes Stop while Cooper works.
- Stop in Analysing: freeze + "Stopped" + Try again. Stop in Streaming: keep partial + Regenerate. Never delete the user's message.
- Errors: "Something went wrong on our side" / "Connection lost" with retry; keep any partial answer above the line.
- Message blocks: summary (collapsed when done), content, follow-ups, options. Hide empty blocks; never show follow-ups and options together.
- Title stays "New chat" until the first answer. The chat must not overlap a widget it generates (widget goes on the opposite side).
- `HistoryPanel` only beside the full panel. Smart folders (Reminders, Recommendations, Trash) can't be created/renamed/deleted; deleting a folder keeps its chats.
- Recommendations: `CooperChip` in `PageHeader` → `AgentWindow`. Decline updates the count, chip gone at 0, "Decline all" only if >1. Never open with the chat.
- Text selection shows "Ask Cooper to explain". After a canvas change Cooper shows a working message, result and Undo (undoes only its recalculation).
- Details below: What it is / when to use it, Anatomy (kit components), Flows and states, Rules, Don'ts, Consolidated / unsure

## What it is / when to use it
Cooper is the AI assistant available on every stage screen. Use this pattern when the user can ask a question about the current screen, when Cooper proactively has recommendations for it, or when the user needs to come back to earlier conversations. It always sits over the content area of an AppShell screen. It is not a full page.

## Anatomy (kit components)
- **Entry point:** `BottomSheet` with prompt chips (`PromptButton`) and the Cooper avatar (`FtaButton`). Shortcut `/`.
- **Three chat sizes:** `ChatCollapsedBar` (320px pill above the bottom sheet), `ChatCompactPanel` (320×360 floating window), `ChatFullPanel` (450px panel docked in the content area, 8px inset). All three use `ChatHeader`, plus `TextMessageInput` or `VoiceMessageInput`, `Attachment` and the empty-state `PromptButton`s.
- **Conversation:** `UserMessage` bubbles and `CooperMessage` answers. Inside an answer: `CooperProgress`, `ChatCard` (scenario / metric), `ChatLink` (follow-up / source) and `Button`.
- **History:** `HistoryPanel` (240px, docked to the left of the full panel) with `FolderItem`, `SectionHeader` and `ChatHistoryCard`. `FolderContent` opens as a second column and holds `ChatReminderCard` or `ChatHistoryCard` rows. `HistorySearch` holds `SearchChatHistoryCard` rows. Delete and move dialogs use `Modal` + `ConfirmDeleteCard`. Create folder uses `Modal` + `TextField` + `IconPicker`.
- **Recommendations:** `CooperChip` ("N Recommendations") in `PageHeader` opens `AgentWindow`, which contains `SpeakingControl`, `RecommendationGroup`, `RecommendationItem`, `RecommendationDetail` and `RecommendationImpact`.
- **Behaviour components:** `CooperChat` (sizes and conversation), `CooperHistory` (history actions) and `CooperRecommendations` (the recommendation flow).

## Flows and states
- **Open:** avatar click, `/`, or "Hey Cooper" → collapsed bar in **voice** mode ("Say anything, I'm listening"). The keyboard icon switches to text ("Write anything, I'm reading"), and the mic switches back. A prompt chip sends its text straight away.
- **Sizes:** bar → expand control on hover (tooltip "Expand to floating window") → compact. Compact window icon → full panel, and the full panel's window icon → compact. `−` or a click outside collapses Cooper back to the avatar. It never closes completely. While the chat is open, the bottom sheet hides its prompt chips and avatar.
- **Send:** sending from the bar opens the compact panel. A `UserMessage` is added, then a `CooperMessage` goes through **Analysing** ("Cooper is working on it (Step n/total): …") → **Streaming** → **Answered**. The send button becomes **Stop** while Cooper works.
- **Answer states:** Answered, Answer with options, Stopped by user, Regenerate, Didn't reply ("Something went wrong on our side"), Network error ("Connection lost").
- **Input:** Default → Typing (send appears) → Typing multi-line (radius 12, buttons below) → Analysing (Stop). In voice mode the panel shows the transcript large while the user speaks.
- **Attachments:** add a file with `+` or by dragging it onto the panel (panel state Drop file). The send button can send a file with no text.
- **Message actions:** hover your message to copy or edit it. Saving an edit resends it.
- **History:** Search, Start a new chat, smart folders, your folders (See all after 3), and chats grouped Today / This week / Earlier. A chat's ⋯ menu offers Pin/Unpin, Rename, Move to folder, Select and Delete. The section ⋯ menus offer Select and Delete all (chats), and Create folder, Select and Delete all (folders). Select mode adds a footer with Move, Delete and "Selected n ✕".
- **Recommendations:** chip → window listing recommendations grouped by framework column → expand an item (description, impact, Explore) → **Shape** walks through them one at a time (Back, Decline, Do it) → "Working on it: Applying…" → "I've added … Let's go to the next" → after the last one, "All selected recommendations have been applied…" and the window closes.

## Rules
1. By default Cooper opens in voice mode. It opens by saying "Hey Cooper", by pressing `/`, or by clicking the avatar. (Figma)
2. Hey Cooper: the avatar expands into the inline field, a sound plays and the prompt chips hide. Cooper does not reply by voice. After about 1.5 s of silence the question is sent and the floating window opens. If nothing is said for about 6 s, the field collapses back to the avatar and the chips return. (Figma)
3. Closing (− or a click outside) collapses the chat back into the avatar. It never fully closes. (Figma)
4. The full panel can be resized from its edge up to a maximum width. The bar and the floating window can be dragged anywhere on the screen, so that they don't cover critical content. (Figma)
5. The chat must not overlap a widget it generates. The widget appears on the opposite side. (Figma)
6. A message has four blocks, top to bottom: the "Analyzed your request" summary (collapsed by default once the answer is complete), the content, follow-ups, and clarifying options. Only the content is always present. A block with no content is hidden together with its header. Follow-ups are hidden while clarifying options show. (Figma)
7. Selecting a follow-up or option sends it as the user's message. The user can also type their own answer. (Figma)
8. The step count is dynamic: "Step {n}/{total}", where total is 2 for a simple question and 3–4 for building a widget or an alternative. Step names describe the current work, and only the text changes between steps. (Figma)
9. If Stop is pressed during Analysing, the progress line freezes and is followed by "Stopped". There is no answer body, and Try again resends the question. If Stop is pressed during Streaming, the partial answer stays and Regenerate is offered. Blocks that had not rendered are not shown. Stop never deletes the user's message. (Figma)
10. The chat title stays "New chat" until Cooper finishes a first answer. Cooper then generates the title from the conversation. (Figma)
11. Error: "Something went wrong on our side" with a retry icon (tooltip "Try again"). Offline: "Connection lost" with a retry icon. The question is resent automatically when the connection returns. If either happens mid-stream, the partial answer is kept and the line appears below it. (Figma)
12. Uploading a file switches an inline input to multi-line. Any number of files can be added. The input grows up to 400px, then scrolls. ✕ on a file chip removes the file. (Figma)
13. Smart folders (Reminders, Recommendations, Trash) are system-managed: users cannot create, rename or delete them. Deleted chats stay in Trash for 30 days. (Figma)
14. Users can create, rename, choose an icon for, multi-select, bulk move and delete their own folders, and can delete all folders from ⋯. Deleting a folder never deletes its chats. They return to the main history. (Figma)
15. ✕ on an item in a Delete or Move dialog only deselects that item. Cancel in Select mode clears the selection. (Figma)
16. Every Cooper recommendation is saved automatically as a chat in the Recommendations smart folder. (Figma)
17. Decline removes a recommendation from the queue and updates the chip count. The chip disappears at 0. "Decline all" appears only when there is more than one recommendation. Declined recommendations stay in history. (Figma)
18. Recommendations and the Cooper chat are never open at the same time. "Ask" in the recommendations window switches to the chat. (Figma)
19. Each recommendation shows the two impact metrics that the backend marks as most affected. The UI only renders what it is given. (Figma)
20. After a change on the canvas (for example a new stage), Cooper opens with a working message ("Recalculating costs…"), then a result and an Undo. Undo discards only Cooper's recalculation and keeps the user's change. (Figma)
21. Selecting text anywhere shows "Ask Cooper to explain". Clicking it opens the chat with the selected text already in context. (Figma)
22. If the user closes a walkthrough ("Walk me through this framework") before it ends, it resumes where it stopped when reopened. "Start over" restarts it. (Figma)
23. Show the history panel only next to the full panel. From the compact window, the history button first docks the chat. (inferred)

## Don'ts
- Don't open Cooper as a modal or a full page. It always floats over or docks into the content area.
- Don't show the bottom-sheet prompt chips or the avatar while the chat is open, because there is only one entry point at a time.
- Don't delete the user's message when they press Stop or an error occurs.
- Don't show follow-ups and clarifying options together.
- Don't let users rename or delete smart folders.
- Don't open the recommendations window and the chat at the same time.

## Consolidated / unsure
- consolidated: `cooper-dots` / `cooper-icons` (272b6bfc) → `Icon name="cooper-system-icon"` (same mark: Insight / Default variants).
- consolidated: `prompt-chip` (1f08a7fa, the same key as prompt-button) → `PromptButton` size L.
- consolidated: `FTA button / style=with stroke` inside the collapsed bar → `FtaButton`.
- consolidated: `counter` / `counter-atom` (d1fbe5eb) → `Counter`. `checkbox-item` (2fd66408) → the checkbox inside history rows (the kit `Checkbox` atom look).
- consolidated: `chat-inline-quick-mode` / `floating-window` / `right-side-panel-chat` / `chat header` / `user-message-bubble` / `chat history` are older local names in the Patterns file for the same keys as chat-collapsed-bar-organism / chat-compact-panel-organism / chat-full-panel-organism / chat-header-molecule / user-message-molecule / history-panel-molecule.
- consolidated: `Scroll bar` (e0af1521) → native thin scrollbar (`ScrollArea` look). `overlay` (29a182db) → `Overlay`. `popover-organism` and `single-select-list-molecule` (row menus) → `Popover` + ghost `Button`s (`CooperMenu`).
- UNSURE: `list-item` (68fd47d4 = capex-card, marked legacy "can be content-card-organism") is used as the recommendation card in agent-window (67:108505), and also with a checkbox and a badge in 12:265397. It is built as `RecommendationItem`. Should it be `ContentCard`?
- UNSURE: `source card` (fafdbabd = source-card, legacy) in answers (67:126739). It is shown as `ChatLink type="source"` under "Supporting evidence". Should it be a `ContentCard` with a quote?
- UNSURE: `chat-link-item/Default/source` (8c76696d) uses the raw colour white/850, while the follow-up uses text/secondary.
- Not built: the `timeline` set (2d17d0e2), its row-timeline, today-line-atom-timeline and cell-base-atom-timeline atoms, and the Chat interactions widgets (quick-stat-card, portfolio, strategic, framework-coverage, Capex burn…), which belong to other families.
