# IFS DS kit — component index

One line per `IFS.<Name>`. Pick from this list; then, **before using a component, read its full entry** (props and data shapes) with `bash .ifs/entry.sh Name1 Name2 …`.
Format: **Name** — what it's for · how often designers place it in the product handovers · usual props. *helper* = pattern helper (a working composition, not a Figma component); *part* = only used inside other components, don't place it alone.

## core
- **Icon** — Any icon, by its Figma name (check dist/icons.txt); size 12 | 16 | 24

## activity
- **TimelineMarker** — Timeline marker (icon/avatar circle) · unused
- **TimelineConnector** — Line between timeline markers · 42× · usual Type solid 100%
- **TimelineItem** — The timeline base: build any activity/timeline entry type from slots · unused
- **Timeline** — Timeline = a list of activity-organism entries (Figma "in use example")
- **ApprovalCard** — One approver card (the Content slot)
- **ApprovalChain** — One approver step in an approval chain · 77×
- **VersionEntry** — One version entry
- **VersionHistory** — A version-history entry · 97× · usual open no 94%, Expand false 88%
- **Comment** — One reply inside a thread · 33× · usual taggedUser no 100%
- **CommentComposer** — The comment input pill · 17×
- **CommentThread** — Full thread opened in place from a pin: header (ID, ⋯, resolve ✓, ✕), replies,… · 93× · usual Type default 87%
- **UserCard** — An assigned person / owner · unused
- **Collaborator** — A collaborator row with invite status · 9× · usual type recommended 100%
- **FileCard** — An uploaded document · 4×
- **VersionCard** — A version entry with change list · 5×

## button
- **Button** — Every action and every navigation move (open object, go to screen, go up a level) · 1,903× · usual Type secondary 56% / tertiary 27%, Size m (32) 49% / s (24) 44%
- **IconButton** — An action in a dense context where a label won't fit · 1,999× · usual Shape square 88%, Type ghost 66%, Size s (24) 90%

## canvas
- **ValueMapButton** — Map canvas view controls: Fit (zoom to show all, view only), Expand all, Collapse all · 208× · usual Type input 79%, Selected default 79%
- **MapToolbar** — The Explore map's floating tool bar · 271×
- **MapToolCluster** — The Explore map's floating tool bar · 271×
- **MapToolButton** — The Explore map's floating tool bar · 271×
- **MapToolDivider** — The Explore map's floating tool bar · 271×
- **NodeHoverActions** — Contextual control shown on hover over a framework node · 28× · usual Type expand 39% / submodel 25%
- **AddNodeButton** — Creating a new (grey, provisional) subnode on the framework canvas · 220×
- **NodeCard** — The node on the framework/map canvas — the named exception that earns its own… · 10,865× · usual type default 45% / measure 14%
- **SidebarNodeCard** — Draggable node in a side list, dropped onto the canvas · 180× · usual open no 100%, type value model 100%
- **MapPin** — Default location marker for one asset on an exact spot · 17× · usual Type solar 69%, Status neutral 100%, Asset icon no 100%
- **CanvasBackground** — The infinite, pannable, zoomable ground plane for map-first and node-graph views… · 701×
- **CanvasConnector** — Connector between two canvas nodes (world coordinates)
- **DropZone** — Dashboard edit mode: widgets become draggable tiles and the background shows the… · 8× · usual Type change-position-overlay 100%
- **SankeyNode** — One Sankey node · 691× · usual type default 52% / measure 48%
- **SankeyHeader** — Column header of a Sankey chart · 57×
- **Sankey** — Flow: how a total splits through stages (budget allocation, value decomposition,… · part
- **TimelinePhase** — One phase row of the Gantt · unused
- **TimelineChart** — Gantt: tasks/phases on a time axis (e.g. investment phases across a 5-year plan) · unused

## charts
- **DataVizBar** — One bar · 4×
- **DataVizGroupedBar** — Grouped bars: compare 2–3 series across the same categories · 4× · usual Type vertical 100%, Progress false 100%
- **DataVizLine** — Gridline / reference line · 18× · usual Dashed true 89%
- **DataVizIndicator** — Target/selection marker on a chart (e.g. bullet-chart target) · 165× · usual Type point 99%
- **ValueLabel** — Axis or data value label · 58×
- **LegendSwatch** — Legend entry · 12×
- **DataVizHeader** — Chart title row with optional view toggle or button · 123× · usual Right element false 72%
- **DataVizCard** — The card that holds any chart on a dashboard · 23×
- **DataVizTooltip** — Chart tooltip / info pop-up showing exact values on hover · 5×
- **ColumnChart** — One measure across few or time-ordered categories ("which is biggest") · unused
- **HistogramChart** — Distribution of one measure across bins · unused
- **BarChart** — Horizontal bars for many categories, long labels or rankings (sort biggest →… · unused
- **GroupedColumnChart** — A few series side by side per category · unused
- **StackedColumnChart** — Composition of a total per category · unused
- **LineChart** — Change over time — spend/burn tracking, actual (solid) vs planned (dashed), trend… · unused
- **AreaChart** — Cumulative volume over time · unused
- **PieChart** — Parts of one whole with few slices · unused
- **DonutChart** — Share of a whole · unused
- **ScatterChart** — Relationship between two measures · unused
- **BubbleChart** — Scatter with a third measure as size · unused
- **GaugeChart** — One KPI against one reference value · unused
- **WaterfallChart** — Bridge from a start value to an end value through increments · unused
- **FunnelChart** — Drop-off across ordered stages · unused
- **HeatmapChart** — Ordered magnitude across a matrix, using a sequential ramp within one hue group · unused
- **ProgressRing** — Circular progress in tight spaces (cards, KPI tiles) · 37× · usual % 60 86%
- **EvidenceStrength** — Strength of evidence behind a Cooper recommendation, mapped to Reject/Review/Approve · unused

## data
- **Badge** — A small read-only marker of status or category attached to another object (Passed… · 363× · usual Color white 84%, Size s (20) 64%
- **StatusIndicator** — Colour-only dot for category/identity (legend, series marker, online dot) where a… · 864× · usual Stroke false 92%
- **Avatar** — The avatar face (initials colour, image, Cooper) · 196× · usual Size m (32) 42% / 24px 17%
- **RiskStatus** — Interactive risk status chip on cards, rows, assets · part
- **ReadinessStatus** — Labelled readiness row (label + readiness icon/text) · 66× · usual Type done 48% / in progress 45%, Right-section text 56% / status 38%
- **Indicator** — Dot + text status label (e.g. "● Active" next to a page title) · 138× · usual Size s 63%, Type blue 67%
- **StatCard** — Displaying one key metric (title + value + optional trend/badge) · 104× · usual Size m 100%, Loading false 100%
- **ContentCard** — Every content card (content, selectable, settings, link, media) · 3,076× · usual Size m 70%
- **Table** — Any data table (marked "use this"): no pagination, scrolls with sticky header,… · 18,250× · usual Type text 63%, Loading false 100%
- **NotificationCard** — Notification tray card · unused
- **ProgressBar** — Linear progress toward completion · 10× · usual % 0 100%

## extras
- **Hotkey** — Keyboard-shortcut label inside tooltips, menus and circular buttons · 3×
- **Counter** — Numeric count on tabs, chips, segmented controls · 1,548× · usual Size s (18) 65%
- **ScrollArea** — Custom scrollbar inside scrolling surfaces (popover, drawer) · 1,265× · usual top default 100%, Location top 100%
- **ScrollBar** — Custom scrollbar inside scrolling surfaces (popover, drawer) · 1,265× · usual top default 100%, Location top 100%
- **CircularButton** — One directional trigger inside circular-button-organism · part
- **CircularMenu** — A small fixed set (2–4) of related actions tied to a point on a canvas/map node,… · 3× · usual Buttons number 4 100%, type 2 buttons 100%
- **NotificationButton** — The bell in global-header · part
- **CommentButton** — Opening comments · 122× · usual Has a new comment? false 99%
- **FilterButton** — Opening a filter surface · part
- **ArrowButton** — An arrow icon button with indicator dot · part
- **PhoneField** — Phone numbers · unused
- **SliderTrack** — Default = one thumb, zero is the floor, fill length = magnitude · 73× · usual Type default 100%
- **Slider** — A slider as a form field, with title, value and hint · part
- **FormCard** — A surface that wraps a form on a consistent backdrop · unused
- **IconPicker** — Choosing an icon for a user-created object (e.g. chat folder) from a curated set · unused
- **Weekday** — Weekday header cell in the calendar · part
- **Weekdays** — A row of seven weekday-atoms as placed in date-picker-molecule
- **Logo** — color (CSS colour

## forms
- **TextField** — Single-line input · 30× · usual size m (32) 93%
- **TextArea** — Multi-line text · 5× · usual Size l (140) 100%
- **Search** — Keyword/name search over a list or table · 37× · usual type general 100%
- **Checkbox** — Labelled checkbox in forms — selecting any number of items · 12× · usual type selected 100%
- **Radio** — Labelled exclusive choice among a few options in a form · part
- **RadioGroup** — Radio group (no separate Figma component
- **Switch** — Labelled on/off setting that applies immediately · 2× · usual active yes 50% / no 50%, size xs 100%

## navigation
- **NavItem** — One sidebar row: section (Parent), sub-section (Child), group header (Subtitle) · part
- **NavSubtitle** — section heading with optional "+" icon-button
- **SideNav** — Level 2 navigation: the persistent sidebar listing sections of the active nav-bar… · 2,718× · usual View collapsed 75%, Page build 95%
- **Tab** — One tab · 950× · usual Size m (36) 41% / l (40) 32%
- **Tabs** — Switching between peer views within the same page (sections of equal standing, no… · unused
- **Crumb** — One crumb · unused
- **Breadcrumb** — Showing where the page sits in a hierarchy, with a back ‹ control · 618×
- **Step** — One step · 20×
- **Stepper** — Indicating progress through a multi-step flow · 15×
- **Pager** — A record-pager for item-by-item content where the user focuses on one item then… · unused
- **CanvasColumn** — One column label (240×26, e.g. "Enterprise Goals") inside canvas-header · part
- **CanvasHeader** — Column header strip across a framework canvas (Enterprise goals · Value framework… · 184×
- **NavBarItem** — One stage tab in the nav bar · part
- **NavBar** — The 48px top bar used in pattern screens: logo, L1 stage tabs, utility icons, avatar · 2,355× · usual page value 100%, Type default 100%, bottom panel no 100%
- **PageHeader** — The page header instance used in the Map overview screen (title + status + view… · 1,023× · usual status progress bar 67%
- **PageTop** — The intro of a library/list page: Cooper eyebrow (optional), H1 title, one-line… · 405× · usual Type default 100%
- **AppShell** — AppShell — NOT a Figma component

## patterns-activity
- **CompareDropdownList** — The open list of compare-dropdown: titled groups ("Top benchmarks", "All… · 47×
- **CompareDropdown** — Variants: Property 1=Variant2 (filled: name + ✕ + caret), Variant3 (empty:… · 1×
- **CompareHeader** — the "COMPARE TO" bar above a compare view · 29×
- **CompareStatValue** *helper* — The value of a compare stat card (Figma compare-quick-stat-card 52:82588 = legacy…
- **CompareView** *helper* — Compare screen body ("Library - Strategy Framework - Active models", Patterns…
- **ActivityPanel** *helper* — —

## patterns-approval
- **ApprovalStatus** — the 32px state mark · 398× · usual type empty 32% / success 27%, Size s 63%
- **QuickStatCard** — one card of the row: quick-stat-card, or compare-quick-stat-card when compare is… · 36×
- **Stat** — the executive-summary row of equal-width quick-stat cards (Figma draws 4: one… · 36×
- **InfoHintItem** — 16px rounded swatch + name (+ optional icon + value) · 808×
- **InvestmentValueImpact** — review card: chart header, metric strip (dividers between), a caption, a… · 36×
- **TableReview** — the grouped investment · 34×
- **SplitButton** *helper* — ===================================================== SplitButton…
- **ReadinessFacts** *helper* — ===================================================== Readiness evaluation…
- **ReadinessSection** *helper* — Pattern helper: one collapsible readiness card — built from Badge, Counter, Icon…
- **ReadinessEvaluation** *helper* — Pattern helper: Readiness Evaluation sidebar content — built from ProgressRing,…
- **ApprovalChainPanel** *helper* — ===================================================== Approval chain…
- **ApprovalChainTable** *helper* — Pattern helper: the approval chain table with note/push/filter rules — built from…

## patterns-collaboration
- **CollaboratorCursor** — Live multiplayer cursor with name label · 59× · usual user cooper 100%
- **LiveCursors** *helper* — Pattern component: layer over a canvas that shows the cursors of the other people…
- **CollaboratorsButton** *helper* — Pattern component: the "who's in" indicator in the page header — button Tertiary…
- **RoleSelect** *helper* — Pattern component: access control on a collaborator row = single-select-atom (M,…
- **CollaboratorRow** *helper* — Pattern component: one person in the panel = content-card-organism (Size=M, 40…
- **CollaboratorSection** *helper* — Section of the panel: H4 UPPER heading (text/secondary, or the Cooper gradient +…
- **RoleFilter** *helper* — Pattern component: the filter button (icon-button Secondary M, system-filter) +…
- **CollaboratorsPanel** *helper* — Pattern component: popover-organism "Collaborators" (360 wide) opened from…
- **CollaboratorsMenu** *helper* — Pattern component: the drop-in for PageHeader actions
- **InviteCollaboratorModal** *helper* — Pattern component: modal-organism "Add Collaborator": person (content card,…
- **RemoveCollaboratorModal** *helper* — Pattern component: modal-organism "Remove this collaborator?": person card…

## patterns-comments
- **CommentPin** — Canvas anchor for a thread, attached to an entity · 143× · usual Type unread 69%
- **CommentDrawerCard** — A thread entry in the Comments panel/drawer list · 551× · usual type new 64%
- **CommentMenu** *helper* — Pattern helper: thin ⋯ menu (Copy link → "Copied" 2 s) — built from IconButton +…
- **CommentMentionMenu** *helper* — Pattern helper: @-mention picker — built from Popover + ContentCard
- **CommentCallout** *helper* — Pattern helper: thread callout — built from CommentThread + CommentMentionMenu
- **CommentsPanel** *helper* — Pattern helper: Comments drawer list — built from Drawer + SegmentedControl +…

## patterns-cooper
- **CooperRecommendations** *helper* — CooperRecommendations — the recommendation flow (pattern component
- **CooperHistory** *helper* — CooperHistory — chat history behaviour (pattern component
- **ChatHeader** — "chat header" in the Patterns file (12:263805) · 129× · usual type float-window 65%, new chat yes 65%
- **UserMessage** — "user-message-bubble" (12:263541) · 206× · usual size >1 93%
- **Attachment** — one uploaded file in the message input · 274×
- **TextMessageInput** — Text input footer of Cooper chat · 76×
- **VoiceMessageInput** — Voice input: speak, pause, message auto-sends · 51×
- **SpeakingControl** — Voice-conversation control
- **ChatCard** — meta (strings joined by dots, e.g. ["$3.2M","2yr","saved 3:44 AM"]) · 123× · usual type metric 59% / scenario 41%
- **ChatLink** — number (source), onClick, state hover (gallery) · 194× · usual type follow up question 100%
- **CooperProgress** *helper* — Cooper progress line (Patterns "Cooper Message content" 67:134213): "Cooper is…
- **CooperMessage** *helper* — Cooper message (answer bubble)
- **ChatCollapsedBar** — Cooper chat size S — the default when chat opens · 119× · usual Type voice-input 86%
- **ChatCompactPanel** — Cooper chat size M — enlarged from S for longer threads · 113× · usual Type voice 72%
- **ChatFullPanel** — Cooper chat size L — full workspace with folders and history · 136× · usual Type text 98%, size default 100%, input type voice 92%
- **FolderItem** — selectable + selected + onSelectedChange (multi-select mode: checkbox replaces… · 14×
- **SectionHeader** — — · 11×
- **ChatHistoryCard** — selectable/selected/onSelectedChange (Select mode),… · 47× · usual type general 72%
- **SearchChatHistoryCard** — currentChat (badge "Current" — Figma current chat?), onClick · 23×
- **ChatReminderCard** — — · part
- **HistoryPanel** — "chat history" (Patterns 12:264137) · 52×
- **FolderContent** — title, children (rows: ChatHistoryCard / ChatReminderCard), count, onBack… · 24× · usual type general 83%
- **ConfirmDeleteCard** — one selected item listed in a Delete / Move modal
- **HistorySearch** *helper* — History search overlay (Patterns "History- search" 67:125364): search field +…
- **CooperMenu** *helper* — Pattern helper: action menu for history rows — built from Menu, anchored at the…
- **AgentWindow** — Floating panel where Cooper surfaces recommendations and the user accepts or… · 128× · usual view expanded 93%, speaking? yes 97%, Speaking true 100%
- **RecommendationImpact** *helper* — Impact table of a recommendation: the two metrics the backend marks as most…
- **RecommendationGroup** *helper* — Recommendation group (Figma: Slot with Caption title + counter inside agent-window)
- **RecommendationItem** *helper* — Recommendation item — Figma "list-item" (68fd47d4cc84…, = capex-card in IFS DS)…
- **RecommendationDetail** *helper* — One recommendation in Shape mode (Figma "Shape mode expanded" 67:108940): Back,…
- **CooperChat** *helper* — CooperChat — the whole Cooper chat behaviour (pattern component

## patterns-documents
- **MapPinDot** — A round status marker: counts on clusters (text) or a status glyph (icon) at map… · 2,394× · usual higlight no 100%, size xs 74%, status success 78%
- **MapPinDefect** — A weather/hazard defect at a point · 57× · usual Type cyclone 100%
- **MapPinFlow** — The small arrowhead drawn along a circuit to show the direction power flows · 1,513× · usual Type default 96%
- **MapPinPole** — A labelled asset on a circuit: a symbol above a number / name label · 1,948× · usual Symbol pin 89%
- **BarChartItem** — screens bind data-viz/muted purple/data-4), number (Figma bool, show the label,… · 3,190× · usual color 5 87%
- **VerticalBarChartItem** — (2px gap and padding) · 15×
- **DocumentRow** *helper* — Pattern: DocumentRow — one document in the list: FileCard (middle-truncated name…
- **DocumentsPopover** *helper* — Pattern: DocumentsPopover — popover-organism titled "Documents" with the counter,…
- **DocumentsContext** *helper* — Pattern: DocumentsContext — the left side of the value bottom sheet: "Cooper's…
- **DocumentsDropArea** *helper* — Pattern: DocumentsDropArea — wraps the content region
- **DocumentsFeedback** *helper* — Pattern: DocumentsFeedback — top-right stack under the page header (place it…

## patterns-evidence
- **SourceCard** — Evidence/source behind a Cooper answer · 53×
- **EvidenceSection** *helper* — Caption/regular-UPPER title and a list of source cards (8px apart)
- **PeerBenchmark** *helper* — scope = { label, value, legend: [{ label, color }], columns: [{ label, segments:…
- **EvidenceButton** *helper* — panel-organism show-evidence-chain)
- **EvidenceChainDrawer** *helper* — The floating drawer that shows the sources and reasoning steps behind one Cooper…

## patterns-nav-bar
- **NavBarCollapsed** — The Level-1 bar when the stage tabs don't fit: logo, a hamburger (icon-button… · unused
- **ResponsiveNavBar** *helper* — Pattern: ResponsiveNavBar — nav-bar-organism that switches Type=Default…
- **ExploreHeader** — the 40px bar under the nav bar on the Explore map · 274× · usual Cooper badge no 63%
- **HomeRowCard** — Type=Primary (124 tall: the top item · 164× · usual Type secondary 84%
- **SideNavTree** *helper* — Pattern: SideNavTree — navigation-panel-organism (sidebar-organism…
- **StagedAppShell** *helper* — Pattern: StagedAppShell — the three-level navigation model as one working shell:…

## patterns-table
- **SmartSearch** — Natural-language queries and prompts, where the system interprets intent instead… · 418× · usual Type text 100%, input text 100%
- **SearchModal** — the suggestion list under the smart search · 13×
- **SearchCard** — one row of the smart-search suggestion list · part
- **FollowButton** — follow / unfollow a record (ghost S icon button) · part
- **ColumnFilter** *helper* — Column filter panel — single-select-list-molecule (153:62054) holding chips…
- **CollaborationBadge** *helper* — Collaboration column cell: badge-atom (Color=White, M, show-avatar) that opens…
- **TruncatedText** *helper* — Investment-name display (Figma "Name display")
- **ActionMenu** *helper* — Pattern helper: More-actions (⋮) menu — built from IconButton + Menu…
- **TableToolbar** *helper* — The bar above the table (Figma table-card "Frame" row, 40px): filter…
- **ColumnSettings** *helper* — Content of the "Columns" drawer (Figma Table configuration): Cooper search for a…
- **RecordPreview** *helper* — Preview sidebar for "table with preview" (Figma uses panel-organism): record ID,…
- **DataTable** *helper* — Every table behaviour on the Table pattern page, composed around IFS.Table (the…

## patterns-trace
- **IssueSolution** *helper* — Pattern helper: solution / applied / answered row — built from ContentCard, Icon,…
- **IssueListItem** *helper* — Pattern helper: "All" list row — built from ContentCard, Counter, Icon
- **IssueAnswerField** *helper* — Pattern helper: My-answer input — built from TextField M (State=Typing, ✕ + ✓ on…
- **ProgressPager** *helper* — Pattern helper: Pager with the progress word — built from Pager
- **IssueKindSwitch** *helper* — Pattern helper: issue-kind switch — built from SegmentedControl
- **IssueNavigator** *helper* — Pattern helper: item-by-item walkthrough — built from ProgressPager,…
- **ConfidenceGates** *helper* — Pattern helper: approval-readiness gates — built from ProgressRing,…
- **PanelRail** *helper* — Pattern helper: collapsed panel rail — built from Panel (collapsed)
- **SystemConfidence** *helper* — Pattern helper: System Confidence panel — built from Panel, ContentCard,…
- **TraceReport** *helper* — Pattern helper: Trace Report — built from Drawer / Panel, IssueKindSwitch,…
- **CONFIDENCE_KINDS** *helper* — Default issue kinds
- **TRACE_KINDS** *helper* — const TRACE_KINDS = [ { value: 'error', label: 'Errors', indicator: 'red',…

## patterns-widget-builder
- **StatCardsRow** — A row of stat-card-organism (StatCard) · 93× · usual Type 1 row 100%
- **PreviewWidgetCard** — The thumbnail inside a widget card: a 7px uppercase heading over a skeleton of… · part
- **WidgetCard** — One entry in the Widgets drawer: title, description, "+ Add" (Secondary S) and a… · 38× · usual Number 1 100%
- **ResizeHandle** — "Arrows show only the directions that are still possible" (Figma description) · unused
- **DropIndicator** — The thin purple line that marks where a dragged widget would land: a 4px ring +… · 4×
- **WidgetViewChangePosition** — The compact chip a widget collapses into while its position is being changed… · unused
- **WidgetFrame** *helper* — Pattern: WidgetFrame — the frame every widget on a dashboard / report is drawn in
- **WidgetBoard** *helper* — Pattern: WidgetBoard — widgets on a 3-column grid in rows of 1–3, with the Widget…
- **WidgetsDrawer** *helper* — Pattern: WidgetsDrawer — "Widgets" side drawer: smart search (filters by…

## selection
- **Menu** — The option popup · 82×
- **Select** — Choosing one option from a list (marked "use this") · 13× · usual Size m (32) 100%
- **MultiSelect** — Choosing several options (marked "use this") · 48× · usual Size m (40) 86%
- **Combobox** — Single choice where the user types to filter the list (marked "use this") · part
- **SegmentedControl** — Picking one of 2–5 always-visible options, usually switching a view mode in a… · 511× · usual Number 2 48% / 4 27%, Size s 100%, type 4 72%
- **Chip** — A clickable token for one discrete value · 634× · usual active no 80%, Select false 76%
- **Calendar** — Single date: click a day commits and closes, no Apply · 3× · usual type calendar 100%
- **DatePicker** — DatePicker = select trigger (single-select-atom look) + Calendar popup…

## states
- **EmptyState** — A region with no content: heading (required) + optional icon, body, suggestion… · 2× · usual Size frame 2147228119 100%
- **Spinner** — Indeterminate or shapeless waits where no layout can be previewed · unused
- **LoadingMore** — Appending items to an already visible list · unused
- **ProgressLoading** — Measurable work (uploads, steps, known duration) · 2×
- **Skeleton** — Skeleton block — not a Figma component
- **LoadingRegion** — Loading wrapper for the component that owns async data (Skeleton notes, rules 7–9)
- **FtaButton** — The Cooper FAB. Stroke/no-stroke depends on the surface: on a non-black surface… · 239× · usual Stroke true 100%, style no 100%
- **PromptButton** — Quick prompt placed near the Cooper FAB for fast interaction · 53× · usual size m 75%
- **CooperChip** — In-context marker where Cooper has a recommendation for something that already… · 41×
- **ZoomSlider** — zoom-slider-atom (3275:483), used in the Explore bottom sheet
- **BottomSheet** — Default bottom sheet for any tab: Cooper FAB + prompt chips · 2,128× · usual In progress true 97%

## surfaces
- **Tooltip** — A small transient label on hover and keyboard focus that names or clarifies an… · 122× · usual Color black 67%, Type bottom 69%, Arrow center 60%
- **Alert** — Error (persistent, dismissible only once resolved), Warning (persistent while the… · 6× · usual Type success 83%
- **Snackbar** — Neutral, transient confirmation of an action the user just took, with an optional… · 59×
- **Overlay** — The dimming scrim behind a blocking modal · 197× · usual Type base 98%
- **Modal** — A focused must-complete-or-cancel task over a dimming scrim (confirm collaborator… · 93× · usual Color modal 100%
- **Drawer** — A focused, self-contained task or detail larger than a popover, opened on demand… · 1× · usual Expanded true 100%
- **Panel** — Persistent, always-relevant side context inside the page layout… · unused
- **Popover** — A small floating surface anchored to its trigger: detail preview, small picker,… · 16×
- **FloatingBar** — Contextual action bar, top-centre, shown while something is selected on the map:… · 121×

