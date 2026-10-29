# Evidence Chain

Figma: IFS Design System Patterns › page "Evidence Chain" (12:339982), section 31:74911. Sub-sections: from a card (31:74912), from system confidence (31:76687), tabs (31:77235), confidence % states (31:78104), peer benchmark empty state (297:75583).

## What it is / when to use it
The Evidence chain is Cooper's glass box. It shows the sources and reasoning steps behind one value that Cooper filled in, and how confident Cooper is in that value. Use it on every field, block or card that Cooper wrote. Don't use it for content a person wrote, or as a general document viewer (→ Documents pattern).

## Anatomy (kit components)
- **Trigger:** `EvidenceButton` (the circle Tertiary S `IconButton`, `cooper-evidence-icon`). On a card, pass it in the card header: `DataVizCard header.slot`, or `ContentCard iconButton={{ icon:'cooper-evidence-icon', type:'tertiary', shape:'circle', … }}`. On a side panel, use `Panel showEvidence onEvidence`.
- **Drawer:** `EvidenceChainDrawer` = `Drawer` (title "Evidence chain", ✕ only, no collapse) holding:
  - `EvidenceStrength`, the confidence bar (no title; captions `<70% Reject` · `{value}% Review` · `>90% Approve`)
  - `SegmentedControl` S, full width: **Rationale** | **Peer benchmark**
  - Rationale: `EvidenceSection`s ("Why it's flagged", "Decisions", "Considered but not included"), each a list of `SourceCard`s
  - Peer benchmark: `PeerBenchmark`, made of a description, Summary key/value rows, and a "Typical scope" card (`LegendSwatch` legend + `VerticalBarChartItem` stacked columns). When there is too little data, it shows an `EmptyState` instead.
- **SourceCard** (IFS DS `source-card`): one piece of evidence.
  - `type="file"`: a Tertiary S button with the source name. It opens the source. The icon is optional: system sources such as "OMS · high" have none.
  - `type="user"`: avatar + name. Use it for a person's input.
  - `content="quote"` draws the excerpt with a left rule. `content="text"` is a plain paragraph, used for decisions.
  - An optional info-coloured `Badge` names the claim the evidence supports.
- **Helper:** `evidenceZone(value)` → `{ zone, label, autoApply, fills, behaviour }`.
- **Screen chrome, as in the frames:** `NavBar`, `PageHeader` + `Stepper`, collapsed `ArrowButton` rail, `Panel` ("System confidence"), `StatCardsRow`, `Tabs`, `DataVizCard`, `Table`, `StatCard`, `BarChartItem`, `MapPin*`, and `BottomSheet type="value"` (Cooper's context).

## Flows and states
1. **From a card** (31:74915 → 31:75728): click the round Cooper button on any Cooper-filled card (Idea overview, The need, Goals, Relevance, Assets, Alternative). The drawer floats over the content area, top-right, 12 px in from the page header, the right edge and the bottom sheet. Clicking another card's button switches the drawer to that value's chain. Clicking the same button again, ✕ or Esc closes it, and focus returns to the trigger.
2. **From system confidence** (31:76689 → 31:76841): the round button in the "System confidence" panel header opens the drawer in the panel's place. It sits right, below the nav bar, over the page header, and ends 12 px above the bottom sheet.
3. **Tabs** (31:77237 / 31:77627): Rationale (default) ↔ Peer benchmark. The tab choice persists while the drawer is open.
4. **Confidence states** (31:78108 / 31:78498 / 31:78888): 60 % Reject, 87 % Review, 96 % Approve. Only the marker and the downstream behaviour change. The drawer layout is the same.
5. **Peer benchmark empty** (297:76637): "Peer benchmark isn't available", with no action. The tab is still rendered and still selectable.

## Rules
- The Evidence chain is a floating drawer, opened by an "Evidence chain" button next to any field, block or card Cooper filled in. (Figma)
- It shows the sources and reasoning steps behind that value. This is the glass-box principle. (Figma)
- The trigger appears wherever Cooper-authored content exists, not only in specific modules. (Figma)
- The drawer structure is the same at every confidence level: Rationale / Peer benchmark tabs, "Why it's flagged" and "Decisions" blocks. (Figma)
- Each confidence zone sets what Cooper does with the value: (Figma)
  - **< 70 % (Reject):** Cooper does not apply the value. A reviewer decides manually.
  - **70–90 % (Review):** Cooper proposes the value and fills it in, then waits for a person to check it.
  - **> 90 % (Approve):** Cooper applies the value automatically. The Evidence chain stays available for transparency.
- Exactly 90 % counts as Approve, following `EvidenceStrength` (value < 90 is Review), so the bar and the behaviour always agree. (inferred)
- Peer benchmark compares the record with comparable records: same type, age band and duty. (Figma)
- Peer benchmark is the only tab that can be empty. With too few comparable records it reads "Peer benchmark isn't available". (Figma)
- The empty benchmark offers no action, because nothing the user does can fill it. (Figma)
- The empty benchmark tab stays rendered and selectable, so users don't look for the comparison elsewhere. (Figma)
- Rationale is never empty. (Figma)
- Evidence order in Rationale: Why it's flagged → Decisions → Considered but not included. Sections are 12 px apart, with a 1 px top rule and a Caption/UPPER title. Cards in a section are 8 px apart. (Figma)
- One chain is open at a time. It is tied to the value whose trigger opened it, and that trigger shows as expanded. (inferred)
- Every value carries its own confidence. The drawer's bar shows the confidence of the value that opened it. (inferred)

## Don'ts
- Don't hide the trigger on Cooper-written content because the confidence is high. The chain must stay accessible above 90 %.
- Don't remove or disable the Peer benchmark tab when it has no data. Show its empty state.
- Don't add an action (upload, retry, request) to the empty benchmark.
- Don't change the drawer layout per confidence zone. Only the marker moves.
- Don't use a modal with a scrim for the chain. It floats over the content without blocking it.

## Consolidated / unsure
- consolidated: hand-drawn "Evidence strength" frame (red/green dotted bands + 8 px orange bar + marker, 31:76682) → `EvidenceStrength` (evidence-strength-bar-molecule). Same bands, marker and captions. The drawer passes `labels` and hides the title.
- consolidated: `Evidence-strip-bar/all actions` (4512b2ec, 31:75718) → `BottomSheet type="value"`, as already decided in the Documents pattern. This holds here too: same "Cooper's context" label, documents button, upload, prompts and FAB at 40 px.
- consolidated: the three local "source card" sets (fafdbabd "Property 1=Default|Variant2|Variant3" 12:192927; c199d918 copy 31:74307; 8c43da20 "State=Default" 31:74839) → one `SourceCard` (type file|user × content quote|text, optional icon and badge).
- consolidated: `modal-organism` used as the drawer on the empty-state frames (297:76633) → `EvidenceChainDrawer` (drawer-organism). Same content and size.
- consolidated: `tabItem` (f15b3452, legacy 32 px segmented, 297:76531) → `SegmentedControl` size S, as the main frames use.
- consolidated: `tableHeader` / `tableCell` (9c9ffe32 / 4f4be618) in Peer benchmark → `PeerBenchmark` key/value rows. These are legacy table sets.
- consolidated: `vertical-bar-chart-item` columns in Typical scope → `VerticalBarChartItem` (patterns-documents).
- consolidated: `sidebar-organism` (navigation-panel-organism key, 31:76839) holding "System confidence" + the circle evidence button → `Panel` (panel-organism, show-evidence-chain). It behaves as a panel, not navigation.
- to swap later: `info-hint-item` (d3dc02ed, legend in Typical scope) → `LegendSwatch` for now. The `stat` block (c74437d8) → `StatCardsRow`. The approval-readiness content of the panel is composed from `ReadinessStatus`, `ProgressRing`, `SegmentedControl`, `Pager` and `ContentCard`. Swap these once the Approval pattern ships `stat` / `info-hint-item` / `status`.
- to swap later: `Investment-value-impact` (fabd8e0b) and `table-review` (8bd2618e) are composed from `DataVizCard` + `VerticalBarChartItem` + `LegendSwatch`, and from `Table groupBy`. They are not built as components.
- UNSURE: the IFS DS `source-card` set lists variants Type=[User|File] × Content=[Map|Quote|Image|Text] × Loading. The Patterns file only instances older copies (Property 1=Default/Variant2/Variant3). Built: File/User × Quote/Text + Loading. Map and Image content are not built. Library node 1440:5362 vs Patterns 12:192927.
- UNSURE: the middle caption of the strength bar reads "87% Review" on every confidence frame, including 60 % and 96 % (31:78108, 31:78888). Built as `{value}% Review` inside the Review band and `70–90% Review` outside it.
- UNSURE: drawer fill. The instances override drawer-organism to `background/color-alpha/black-base` + blur/strong. The kit `Drawer` uses `surface/secondary-alpha`. Kept the kit's.
- UNSURE: the source-card badge is badge-atom black S with label and icon recoloured to text/info / icon/info and no visible border. The kit black badge draws a border/medium ring.
- UNSURE: Typical-scope bar fills are raw hex (#541252 = rose-8; #096b42, #175c65, #312262 have no token). The legend swatch for "15+ feeders" is #226d65 (teal), but its bars are #312262 (indigo). Built with the bar colour.
