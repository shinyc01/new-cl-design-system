import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { ChatHeader, UserMessage, Attachment, TextMessageInput, VoiceMessageInput, SpeakingControl, ChatCard, ChatLink, CooperProgress, CooperMessage,
    ChatCollapsedBar, ChatCompactPanel, ChatFullPanel, FolderItem, SectionHeader, ChatHistoryCard, SearchChatHistoryCard, ChatReminderCard,
    HistoryPanel, FolderContent, ConfirmDeleteCard, HistorySearch, AgentWindow, RecommendationGroup, RecommendationItem, RecommendationDetail,
    CooperChat, CooperHistory, CooperRecommendations } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={{ alignItems: 'flex-start', ...style }}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Cap = ({ title, children, w }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: w }}><span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>{title}</span>{children}</div>;
  // Cooper surfaces are glass: show them on the dark canvas they sit on in the product.
  const stage = { padding: 24, borderRadius: 8, background: 'var(--background-canvas-primary)', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' };

  // ---------- sample content (from the Figma frames) ----------
  const Q = 'Can you give me a quick overview of our current Strategy Framework? How healthy is it overall?';
  const reasoning = [
    'Cross-referenced your current network state with 31 external benchmarks from utilities operating in similar geographic and load conditions',
    'Executed 4 simulation scenarios (Balanced, Cost-Sensitive, Aggressive Maintenance, and Full Load Redistribution) and performed multi-objective optimization',
  ];
  const answerText = 'Your Strategy Framework is in good shape overall. Coverage across all three Enterprise Goals is strong, and 18 of 21 value models are up to date. Two areas need attention: the Carbon footprint model hasn’t been updated in 7 months, and two measures still have no owner.';
  const scenarios = { title: 'Saved scenarios', aside: 'Capture · Recent Activity', cards: [
    { title: 'West District Feeder - Balanced', badges: ['T-902', 'T-887'], meta: ['$3.2M', '2yr', 'saved 3:44 AM'] },
    { title: 'West District - Cost-Sensitive', badges: ['T-902'], meta: ['$1.4M', '1yr', 'saved 4:15 AM'] },
    { title: 'Harbor Substation upgrade', badges: ['Sub-H'], meta: ['$4.8M', '3yr', 'saved 1:40 AM'] },
  ], actions: [{ label: 'Open recommended' }, { label: 'View all scenarios' }] };
  const metrics = [{ category: 'Risk reduction', value: '28–35%' }, { category: 'Payback period', value: '2.1 years' }, { category: 'Estimated savings', value: '$3.2M' }, { category: 'Efficiency gain', value: '+21%' }];
  const followUps = ['What decisions are waiting?', 'Show agent conflict', 'Auto-confirmed?', 'Defer impact?'];
  const answer = { status: 'answered', reasoning, defaultReasoningOpen: true, text: answerText, scenarios, metrics, followUps };
  const step = { n: 1, total: 3, label: 'Reviewing framework structure' };
  const prompts = ['Highlight all my transformers for me in this area', 'I want to explore flood risks along the coast', 'What happens if I don\'t act?'];

  const chats = [
    { id: 'c1', title: 'Current Strategy Overview', time: '3h ago', group: 'today' },
    { id: 'c2', title: 'Power Line Risk Assessment', time: '6h ago', group: 'today', folder: 'f3' },
    { id: 'c3', title: 'Power Line Risk Evaluation', time: '1d ago', group: 'week', folder: 'f3' },
    { id: 'c4', title: 'Network Capacity Review', time: '3d ago', group: 'week' },
    { id: 'c5', title: 'Infrastructure Upgrade Planning', time: '6d ago', group: 'week', folder: 'f1' },
    { id: 'c6', title: 'Outage History Analysis', time: 'Mar 26', group: 'earlier' },
    { id: 'c7', title: 'System Performance Review', time: 'Mar 20', group: 'earlier' },
    { id: 'c8', title: 'Saved Scenarios Review', time: 'Mar 20', group: 'earlier' },
    { id: 'r1', title: 'Check thermal status of T-902', time: '2d ago', group: 'week', smart: 'reminders', badge: 'In 4 days', due: 'May 2' },
    { id: 'r2', title: 'Inspect corrosion on TL-107 joint', time: 'Mar 18', group: 'earlier', smart: 'reminders', badge: 'In 12 days', due: 'May 14' },
    { id: 'r3', title: 'Check for leaks on T-491 valve', time: 'Mar 16', group: 'earlier', smart: 'reminders', badge: 'In 3 days', due: 'Apr 29' },
    { id: 'i1', title: 'Add Waste Reduction Objective', time: '1d ago', group: 'week', smart: 'recommendations' },
    { id: 'i2', title: 'Refine Investment Prioritization', time: '1d ago', group: 'week', smart: 'recommendations' },
    { id: 't1', title: 'API Error Trends', time: 'Feb 28', group: 'earlier', trashed: true },
    { id: 't2', title: 'Server Maintenance Log', time: 'Feb 15', group: 'earlier', trashed: true },
  ];
  const folders = [{ id: 'f1', name: 'Strategy', icon: 'chat-folder' }, { id: 'f2', name: 'Harbor Substation', icon: 'system-building' }, { id: 'f3', name: 'Risk Analysis', icon: 'chat-folder' }, { id: 'f4', name: 'Board prep', icon: 'system-briefcase' }, { id: 'f5', name: 'Field work', icon: 'map-pin' }];
  const liveChats = chats.filter(c => !c.trashed);

  const impactA = [{ label: 'Total capital', value: '62nd', delta: '1' }, { label: 'Risk coverage', value: '94%', delta: '3 %' }];
  const recs = [
    { id: 'r1', group: 'Strategic objectives', title: 'Add Waste Reduction Objective', description: 'This objective could improve resource efficiency and strengthen sustainability performance across the portfolio.', impact: [{ label: 'Total capital', value: '$1.24B', delta: '0.23%' }, { label: 'Risk coverage', value: '94%', delta: '3 %' }] },
    { id: 'r2', group: 'Measures', title: 'Add Carbon Intensity Measure', description: 'Introduce a Carbon Intensity measure to capture environmental impact more directly at the portfolio level.', impact: [{ label: 'Total capital', value: '62nd', delta: '1' }, { label: 'Portfolio benefit score', value: '2.5', delta: '0.3' }] },
    { id: 'r3', group: 'Value models', title: 'Refine Investment Prioritization', description: 'Weight long-lead procurement risk in the prioritization model so delayed assets rank correctly.', impact: impactA },
    { id: 'r4', group: 'Value models', title: 'Update Risk Calculation Inputs', description: 'Refresh probability-of-failure inputs with the latest 12 months of telemetry.', impact: impactA },
  ];

  // ---------- map screen scaffold (as the Figma frames: Map - Cooper - …) ----------
  const valueNav = [
    { id: 'active', label: 'Active Framework' },
    { type: 'section', label: 'Library', items: [{ id: 'strategy', label: 'Strategy Frameworks' }, { id: 'value', label: 'Value Frameworks' }, { id: 'models', label: 'Value Models' }] },
    { id: 'human', label: 'Human Performance' },
  ];
  const Status = () => (
    <span className="t-label-m-medium" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
      <IFS.StatusIndicator state="success" />Active
    </span>
  );
  const stages = [{ value: 'command', label: 'Command' }, { value: 'value', label: 'Value' }, { value: 'explore', label: 'Explore' }, { value: 'build', label: 'Build' }, { value: 'plan', label: 'Plan' }, { value: 'results', label: 'Results' }];
  const nodes = [['enterprise-goal', 'Enterprise Goals', 5], ['value-framework', 'Value Framework v12'], ['strategic-objective', 'Strategic Objectives', 5], ['value-model', 'Value Models', 7], ['measure', 'Measures', 29]];
  function MapScreen({ children, sheet, recCount = 4, onRecs, recSelected, sideCollapsed = true }) {
    const [view, setView] = React.useState({ x: 30, y: 0, zoom: 0.72 });
    return (
      <div style={{ width: 1440, height: 900, maxWidth: '100%', border: '1px solid var(--border-base)', overflow: 'hidden' }}>
        <IFS.AppShell height={900}
          navBar={<IFS.NavBar stages={stages} defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
          sideNav={<IFS.SideNav title="Value" items={valueNav} defaultValue="active" defaultCollapsed={sideCollapsed} />}
          header={<>
            <IFS.PageHeader title="Q1 2026 Strategy Framework" onBack={() => {}} onTitleMenu={() => {}} status={<Status />}
              views={<IFS.SegmentedControl size="s" defaultValue="map" options={[{ value: 'grid', iconLeft: 'layout-gallery' }, { value: 'map', iconLeft: 'node-map' }, { value: 'tree', iconLeft: 'isolate-path' }]} />}
              actions={recCount > 0 ? <IFS.CooperChip selected={recSelected} onClick={onRecs}>{`${recCount} Recommendation${recCount === 1 ? '' : 's'}`}</IFS.CooperChip> : null} />
            <IFS.CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} />
          </>}
          bottom={sheet}>
          <div style={{ position: 'relative', height: '100%' }}>
            <IFS.CanvasBackground view={view} onViewChange={setView} style={{ position: 'absolute', inset: 0 }}
              overlay={<div style={{ position: 'absolute', left: 12, bottom: 12 }}><IFS.ValueMapButton type="shape" /></div>}>
              {nodes.map(([t, title, count], i) => <div key={t} style={{ position: 'absolute', left: 40 + i * 400, top: 470, width: 200 }}><IFS.NodeCard type={t} title={title} counter={count} stackIcons={false} /></div>)}
              {nodes.slice(1).map((n, i) => <IFS.CanvasConnector key={i} from={{ x: 240 + i * 400, y: 509 }} to={{ x: 440 + i * 400, y: 509 }} />)}
            </IFS.CanvasBackground>
            {children}
          </div>
        </IFS.AppShell>
      </div>
    );
  }
  const sheetProps = { type: 'value', documents: { label: '16 Documents' } };

  /* ================================================================ components */

  IFS_GALLERY.push({ name: 'ChatCollapsedBar', figma: 'chat-collapsed-bar-organism "chat-inline-quick-mode" [patterns] (12:263488)', render: () => <div style={stage}>
    <Cap title="Type=Voice · Default (opens by default)" w={320}><ChatCollapsedBar type="voice" /></Cap>
    <Cap title="Voice · Hover (expand control)" w={320}><ChatCollapsedBar type="voice" state="hover" onExpand={() => {}} /></Cap>
    <Cap title="Voice · Speaking" w={320}><ChatCollapsedBar type="voice" speech="Show me" /></Cap>
    <Cap title="Voice · Speaking multi-line" w={320}><ChatCollapsedBar type="voice" speech="Show me transformer T-902 on the map, the one that had the oil leak" /></Cap>
    <Cap title="Type=Text · Default" w={320}><ChatCollapsedBar type="text" /></Cap>
    <Cap title="Text · Typing (interactive)" w={320}><ChatCollapsedBar type="text" defaultValue="Show me" onExpand={() => {}} /></Cap>
    <Cap title="Text · Typing multi-line" w={320}><ChatCollapsedBar type="text" defaultValue="Can you give me a quick overview of our current Strategy Framework? How" /></Cap>
    <Cap title="Type=FAB button" w={320}><ChatCollapsedBar type="fab" /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ChatHeader', figma: 'chat-header-molecule "chat header" [patterns] (12:263805)', render: () => <div style={stage}>
    <Cap title="Full panel · New chat" w={450}><div className="ifs-cooper-surface"><ChatHeader size="full" newChat /></div></Cap>
    <Cap title="Full panel · existing chat (more ⋯)" w={450}><div className="ifs-cooper-surface"><ChatHeader size="full" title="Current strategy overview" historyOpen /></div></Cap>
    <Cap title="Compact · New chat" w={320}><div className="ifs-cooper-surface"><ChatHeader size="compact" newChat /></div></Cap>
    <Cap title="Compact · long name" w={320}><div className="ifs-cooper-surface"><ChatHeader size="compact" title="Current strategy overview for the board" /></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'UserMessage', figma: 'user-message-molecule "user-message-bubble" [patterns] (12:263541)', render: () => <div style={stage}>
    <Cap title="Size=Inline" w={426}><UserMessage>Strategic priorities</UserMessage></Cap>
    <Cap title="Size=>1" w={426}><UserMessage>{Q}</UserMessage></Cap>
    <Cap title="Hover (copy · edit)" w={426}><UserMessage state="hover" onEdit={() => {}}>{Q}</UserMessage></Cap>
    <Cap title="Editing" w={426}><UserMessage defaultEditing onEdit={() => {}}>{Q}</UserMessage></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'TextMessageInput', figma: 'text-message-input-molecule [patterns] (67:120307)', render: () => <div style={stage}>
    <Cap title="State=Default" w={426}><TextMessageInput /></Cap>
    <Cap title="State=Typing (interactive)" w={426}><TextMessageInput defaultValue="Show me transformer" /></Cap>
    <Cap title="State=Typing multi-line" w={426}><TextMessageInput defaultValue="Show me transformer T-902 on the map, the one that had the oil leak last quarter" /></Cap>
    <Cap title="State=Analyzing (Stop)" w={426}><TextMessageInput analyzing /></Cap>
    <Cap title="With attachments" w={426}><TextMessageInput defaultValue="Summarise these" attachments={[{ id: 'a', name: 'Board directive.pdf', meta: 'PDF · 240 KB' }, { id: 'b', name: 'Q1 capex plan.xlsx', meta: 'XLSX · 1 MB' }]} onRemoveAttachment={() => {}} /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'VoiceMessageInput', figma: 'voice-message-input-molecule [patterns] (67:107207)', render: () => <div style={stage}>
    <Cap title="State=Default" w={320}><VoiceMessageInput /></Cap>
    <Cap title="State=Speaking" w={320}><VoiceMessageInput state="speaking" /></Cap>
    <Cap title="State=Analyzing" w={320}><VoiceMessageInput state="analyzing" /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'SpeakingControl', figma: 'speaking-control-molecule [patterns] (67:108505)', render: () => <div style={stage}>
    <Cap title="Speaking"><SpeakingControl /></Cap><Cap title="Paused"><SpeakingControl defaultSpeaking={false} /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'Attachment', figma: 'attachments [patterns] (16:18042)', render: () => <div style={stage}>
    <Attachment name="Board directive.pdf" meta="PDF · 240 KB" onRemove={() => {}} /><Attachment name="Q1 capex plan with a very long file name.xlsx" meta="XLSX · 1 MB" onRemove={() => {}} />
  </div> });

  IFS_GALLERY.push({ name: 'ChatCard', figma: 'chat-card-molecule [patterns] (67:120468)', render: () => <div style={stage}>
    <Cap title="Type=Scenario" w={426}><ChatCard title="West District Feeder - Balanced" badges={['T-902', 'T-887']} meta={['$3.2M', '2yr', 'saved 3:44 AM']} /></Cap>
    <Cap title="Scenario · show-receipt · clickable" w={426}><ChatCard title="Harbor Substation upgrade" receipt="Receipt #438" badges={['Sub-H']} meta={['$4.8M', '3yr', 'saved 1:40 AM']} onClick={() => {}} /></Cap>
    <Cap title="Type=Metric" w={211}><ChatCard type="metric" category="Risk reduction" value="28–35%" /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ChatLink', figma: 'chat-link-molecule "chat-link-item" [patterns] (12:265109)', render: () => <div style={stage}>
    <Cap title="follow-up · Default / Hover" w={426}><div><ChatLink>What decisions are waiting?</ChatLink><ChatLink state="hover">Show agent conflict</ChatLink></div></Cap>
    <Cap title="source" w={426}><div><ChatLink type="source" number={1}>Q1 2026 Strategy Framework — coverage report</ChatLink><ChatLink type="source" number={2}>Asset health telemetry, last 12 months</ChatLink></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'CooperMessage', figma: 'Cooper Message content — anatomy & states [patterns] (67:134213)', render: () => <div style={stage}>
    <Cap title="Analysing (Step n/total)" w={426}><CooperProgress {...step} /></Cap>
    <Cap title="Streaming" w={426}><CooperMessage status="streaming" text={answerText} streamed={120} /></Cap>
    <Cap title="Stopped while analysing → Try again" w={426}><CooperMessage status="stopped" step={step} onRetry={() => {}} /></Cap>
    <Cap title="Stopped while streaming → Regenerate" w={426}><CooperMessage status="stopped" text={answerText} streamed={120} onRegenerate={() => {}} /></Cap>
    <Cap title="Didn’t reply (error)" w={426}><CooperMessage status="error" onRetry={() => {}} /></Cap>
    <Cap title="Network error" w={426}><CooperMessage status="offline" onRetry={() => {}} /></Cap>
    <Cap title="Answered — full anatomy" w={426}><CooperMessage {...answer} sources={[{ label: 'Q1 2026 Strategy Framework — coverage report' }]} /></Cap>
    <Cap title="Answer with clarifying options (follow-ups hidden)" w={426}><CooperMessage status="answered" text="I need a little more context. Which would you like to start with?" followUps={followUps}
      options={{ title: 'Let’s build your priorities together', intro: 'I’ll suggest a few options that are common for enterprises like yours — select one or type another in your message:', items: ['Grow recurring revenue', 'Improve operating margin', 'Deepen customer retention'] }} /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ChatCompactPanel', figma: 'chat-compact-panel-organism "floating-window" [patterns] (12:263560)', render: () => <div style={stage}>
    <Cap title="Text · Default"><ChatCompactPanel type="text" newChat /></Cap>
    <Cap title="Voice · Speaking"><ChatCompactPanel type="voice" newChat speech="Can you give me" /></Cap>
    <Cap title="Text · Analyzing"><ChatCompactPanel type="text" newChat analyzing><UserMessage>{Q}</UserMessage><CooperProgress {...step} /></ChatCompactPanel></Cap>
    <Cap title="Voice · Interrupted"><ChatCompactPanel type="voice" newChat><UserMessage>{Q}</UserMessage><CooperMessage status="stopped" onRetry={() => {}} /></ChatCompactPanel></Cap>
    <Cap title="Text · Answered"><ChatCompactPanel type="text" title="Current strategy overview"><UserMessage>{Q}</UserMessage><CooperMessage {...answer} /></ChatCompactPanel></Cap>
    <Cap title="Text · Drop file"><ChatCompactPanel type="text" newChat dropping /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ChatFullPanel', figma: 'chat-full-panel-organism [patterns] (67:120161)', render: () => <div style={stage}>
    <Cap title="Text · Default (show-chips)"><ChatFullPanel type="text" newChat prompts={prompts} /></Cap>
    <Cap title="Text · Analyzing"><ChatFullPanel type="text" newChat analyzing><UserMessage>{Q}</UserMessage><CooperProgress {...step} /></ChatFullPanel></Cap>
    <Cap title="Text · Answered"><ChatFullPanel type="text" title="Current strategy overview"><UserMessage>{Q}</UserMessage><CooperMessage {...answer} /></ChatFullPanel></Cap>
    <Cap title="Voice · Answered"><ChatFullPanel type="voice" title="Current strategy overview"><UserMessage>{Q}</UserMessage><CooperMessage {...answer} /></ChatFullPanel></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'FolderItem', figma: 'folder-item [patterns] (12:264108)', render: () => <div style={stage}>
    <Cap title="Default · Hover · Active" w={231}><div className="ifs-history__list"><FolderItem count={3}>Strategy</FolderItem><FolderItem state="hover" onMore={() => {}} count={3}>Harbor Substation</FolderItem><FolderItem active count={2}>Risk Analysis</FolderItem></div></Cap>
    <Cap title="Select active · Selected" w={231}><div className="ifs-history__list"><FolderItem selectable>Strategy</FolderItem><FolderItem selectable selected>Risk Analysis</FolderItem></div></Cap>
    <Cap title="Rename" w={231}><FolderItem renaming>Strategy</FolderItem></Cap>
    <Cap title="Smart folders" w={231}><div className="ifs-history__list"><FolderItem icon="system-clock-time" count={3}>Reminders</FolderItem><FolderItem icon="cooper-system-icon" iconVariant="Default" count={2}>Recommendations</FolderItem><FolderItem icon="system-trash-delete" count={2}>Trash</FolderItem></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'SectionHeader', figma: 'section-header [patterns] (12:264342)', render: () => <div style={stage}>
    <Cap title="default" w={239}><SectionHeader heading="Chats" count={35} /></Cap>
    <Cap title="hover (actions)" w={239}><SectionHeader heading="Folders" count={5} icon="chat-folder" state="hover" actions={[{ icon: 'chat-folder-add', label: 'Create folder' }, { icon: 'system-dots-horizont', label: 'More' }]} /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ChatHistoryCard', figma: 'chat-history-card [patterns] (12:264367)', render: () => <div style={stage}>
    <Cap title="default · hover · active" w={234}><div className="ifs-history__list"><ChatHistoryCard title="Network Capacity Review" time="3d ago" /><ChatHistoryCard title="Power Line Risk Assessment" time="6h ago" state="hover" onMore={() => {}} /><ChatHistoryCard title="Current Strategy Overview" time="Now" active /></div></Cap>
    <Cap title="pinned · select · selected" w={234}><div className="ifs-history__list"><ChatHistoryCard title="Board prep notes" time="Mar 2" pinned /><ChatHistoryCard title="Outage History Analysis" time="Mar 26" selectable /><ChatHistoryCard title="System Performance Review" time="Mar 20" selectable selected /></div></Cap>
    <Cap title="rename" w={234}><ChatHistoryCard title="Network Capacity Review" renaming /></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'SearchChatHistoryCard', figma: 'search-chat-history-card [patterns] (67:120339)', render: () => <div style={stage}>
    <Cap title="default · current chat · hover" w={360}><div><SearchChatHistoryCard title="Power Line Risk Assessment" query="Risk" time="6h ago" /><SearchChatHistoryCard title="Risk Analysis" query="Risk" time="Now" currentChat /><SearchChatHistoryCard title="Power Line Risk Evaluation" query="Risk" time="1d ago" state="hover" /></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ChatReminderCard', figma: 'chat-reminder-card [patterns] (12:265339)', render: () => <div style={stage}>
    <Cap title="Default · active · hover" w={234}><div className="ifs-history__list">
      <ChatReminderCard title="Inspect corrosion on TL-107 joint" badge="In 12 days" due="May 14" />
      <ChatReminderCard title="Check thermal status of T-902" badge="In 4 days" due="May 2" active />
      <ChatReminderCard title="Check for leaks on T-491 valve" badge="In 3 days" due="Apr 29" state="hover" onMore={() => {}} />
    </div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'ConfirmDeleteCard', figma: 'confirm-delete-card-molecule [patterns] (67:129201)', render: () => <div style={stage}>
    <Cap title="in Delete modal" w={414}><div className="ifs-confirm-list"><ConfirmDeleteCard onRemove={() => {}}>Saved Scenarios Review</ConfirmDeleteCard><ConfirmDeleteCard icon="chat-folder" onRemove={() => {}}>Risk Analysis</ConfirmDeleteCard></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'HistoryPanel', figma: 'history-panel-molecule "chat history" [patterns] (12:264137)', render: () => <div style={stage}>
    <Cap title="Default"><div className="ifs-cooper-surface" style={{ height: 725, borderRadius: 12 }}><HistoryPanel chats={liveChats.filter(c => !c.smart)} folders={folders} smart={{ reminders: 3, recommendations: 2, trash: 2 }} activeChatId="c1" onCollapse={() => {}} onChatMore={() => {}} onFolderMore={() => {}} onFoldersMore={() => {}} onChatsMore={() => {}} /></div></Cap>
    <Cap title="Select (chats)"><div className="ifs-cooper-surface" style={{ height: 725, borderRadius: 12 }}><HistoryPanel chats={liveChats.filter(c => !c.smart)} folders={folders.slice(0, 2)} smart={{ reminders: 3, recommendations: 2, trash: 2 }} selecting="chats" selected={['c4', 'c6']}
      footer={<div className="ifs-history__bar"><div className="ifs-history__bar-buttons"><IFS.Button iconLeft="chat-folder-move">Move</IFS.Button><IFS.Button iconLeft="system-trash-delete">Delete</IFS.Button></div><div className="ifs-history__bar-count">Selected <IFS.Counter>2</IFS.Counter></div></div>} /></div></Cap>
    <Cap title="empty"><div className="ifs-cooper-surface" style={{ height: 725, borderRadius: 12 }}><HistoryPanel /></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'FolderContent', figma: 'folder content [patterns] (12:264418)', render: () => <div style={stage}>
    <Cap title="type=reminders"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent type="reminders" title="Reminders" onCollapse={() => {}}>
      {chats.filter(c => c.smart === 'reminders').map((c, i) => <ChatReminderCard key={c.id} title={c.title} badge={c.badge} due={c.due} active={i === 0} />)}</FolderContent></div></Cap>
    <Cap title="type=insight (Recommendations)"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent type="insight" title="Recommendations">
      {chats.filter(c => c.smart === 'recommendations').map(c => <ChatHistoryCard key={c.id} title={c.title} time={c.time} />)}</FolderContent></div></Cap>
    <Cap title="type=trash"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent type="trash" title="Trash">
      {chats.filter(c => c.trashed).map(c => <ChatHistoryCard key={c.id} title={c.title} time={c.time} />)}</FolderContent></div></Cap>
    <Cap title="type=general (empty)"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent title="Board prep" onBack={() => {}} onMore={() => {}} empty="No chats in this folder yet" /></div></Cap>
  </div> });

  IFS_GALLERY.push({ name: 'HistorySearch', figma: 'History- search [patterns] (67:125529)', render: () => <div style={stage}>
    <HistorySearch chats={liveChats} defaultQuery="Risk" activeChatId="c1" onClose={() => {}} />
  </div> });

  IFS_GALLERY.push({ name: 'AgentWindow', figma: 'agent-window-organism [patterns] (12:264637)', render: () => <div style={stage}>
    <Cap title="View=Expanded · list"><AgentWindow text="I’ve found 4 recommendations that could meaningfully improve how investments are evaluated, prioritized, and aligned with organizational goals."
      onAsk={() => {}} onClose={() => {}} tertiaryAction={{ label: 'Decline all' }} secondaryAction={{ label: 'Shape' }}>
      {['Strategic objectives', 'Measures', 'Value models'].map(g => <RecommendationGroup key={g} title={g}>{recs.filter(r => r.group === g).map((r, i) => <RecommendationItem key={r.id} {...r} defaultExpanded={g === 'Strategic objectives'} action={{ label: 'Explore' }} />)}</RecommendationGroup>)}
    </AgentWindow></Cap>
    <Cap title="Shape mode · one recommendation"><AgentWindow onAsk={() => {}} onClose={() => {}}><RecommendationDetail {...recs[0]} onBack={() => {}} /></AgentWindow></Cap>
    <Cap title="Applying"><AgentWindow onAsk={() => {}} onClose={() => {}} text="Working on it: Applying to framework structure…" /></Cap>
    <Cap title="View=Collapsed · Speaking=False"><AgentWindow defaultView="collapsed" defaultSpeaking={false} onAsk={() => {}} onClose={() => {}} text="x" /></Cap>
  </div> });

  /* ================================================================ pattern screens */

  IFS_GALLERY.push({ name: 'Pattern: Cooper chat', figma: 'Chat — Text: Default → inline → floating window → sidebar [patterns] (67:122974)', render: () => {
    const [size, setSize] = React.useState('closed');
    const [mode, setMode] = React.useState('voice');
    const api = React.useRef();
    const open = size !== 'closed';
    return (
      <div>
        <p className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', margin: '0 0 12px' }}>
          Click the Cooper avatar (or press /) → collapsed bar (voice by default; keyboard icon switches to text) → send → floating window with Analysing, streaming and Stop →
          window icon docks it as the side panel; − collapses back to the avatar. Prompt chips send straight away.</p>
        <MapScreen sheet={<IFS.BottomSheet {...sheetProps} prompts={['Walk me through this framework', 'What hasn’t been updated in a while?']} showPrompts={!open} showCooper={!open}
          onCooper={() => { setMode('voice'); setSize('bar'); }} onPrompt={p => { setMode('text'); api.current.send(p); }} />}>
          <CooperChat size={size} onSizeChange={setSize} mode={mode} onModeChange={setMode} apiRef={api} />
        </MapScreen>
      </div>
    );
  } });

  IFS_GALLERY.push({ name: 'Pattern: Cooper conversation', figma: 'Map - Cooper - Interrupted / Answered 4 - detail [patterns] (67:123835)', render: () => {
    const seeded = [{ id: 'u0', role: 'user', text: Q }, { id: 'c0', role: 'cooper', q: Q, ...answer, defaultReasoningOpen: true, sources: [{ label: 'Q1 2026 Strategy Framework — coverage report' }] }];
    const [key, setKey] = React.useState(0);
    return (
      <div>
        <p className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', margin: '0 0 12px' }}>
          Docked full panel with an answered message. Click a follow-up or type a question: a user bubble appears, then Cooper runs Step 1/2…, streams, and answers; press Stop to interrupt (Try again / Regenerate).
          Hover your message to copy or edit it. Drag a file onto the panel to attach it. <button type="button" className="t-body-m-regular" style={{ color: 'var(--text-secondary)', background: 'none', border: 0, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setKey(key + 1)}>Reset</button></p>
        <MapScreen key={key} sheet={<IFS.BottomSheet {...sheetProps} showPrompts={false} showCooper={false} />}>
          <CooperChat defaultSize="full" defaultMode="text" defaultMessages={seeded} defaultTitle="Current strategy overview" />
        </MapScreen>
      </div>
    );
  } });

  IFS_GALLERY.push({ name: 'Pattern: Cooper chat history', figma: 'history - smart folders / user folders / chats [patterns] (67:126290)', render: () => {
    const [historyOpen, setHistoryOpen] = React.useState(true);
    const [active, setActive] = React.useState('c1');
    const [list, setList] = React.useState(chats);
    const [fols, setFols] = React.useState(folders);
    // Each saved chat reopens with its conversation (sample: the strategy answer, asked with the chat's title).
    const convo = id => { const t = (list.find(c => c.id === id) || {}).title; return id ? [{ id: 'u' + id, role: 'user', text: t === 'Current Strategy Overview' ? Q : t }, { id: 'a' + id, role: 'cooper', q: t, ...answer, defaultReasoningOpen: false }] : []; };
    const [msgs, setMsgs] = React.useState(() => convo('c1'));
    const [title, setTitle] = React.useState('Current Strategy Overview');
    const open = id => { setActive(id); setMsgs(convo(id)); setTitle(id ? (list.find(c => c.id === id) || {}).title : 'New chat'); };
    return (
      <div>
        <p className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', margin: '0 0 12px' }}>
          History docks left of the side panel (history icon in the chat header). Hover a chat for ⋯ (Pin, Rename, Move to folder, Select, Delete → Trash).
          Folders ⋯ creates folders with an icon; smart folders (Reminders, Recommendations, Trash) open in a second column; Search opens the search overlay.</p>
        <MapScreen sheet={<IFS.BottomSheet {...sheetProps} showPrompts={false} showCooper={false} />}>
          <CooperChat defaultSize="full" defaultMode="text" messages={msgs} onMessagesChange={setMsgs} title={title} onTitleChange={setTitle}
            historyOpen={historyOpen} onHistory={setHistoryOpen} onNewChat={() => open(null)}
            renderPanel={panel => historyOpen ? <div className="ifs-cooper-dock ifs-cooper-surface">
              <CooperHistory chats={list} onChatsChange={setList} folders={fols} onFoldersChange={setFols} activeChatId={active} onOpenChat={open} onNewChat={() => open(null)} onCollapse={() => setHistoryOpen(false)} />
              {panel}</div> : panel} />
        </MapScreen>
      </div>
    );
  } });

  IFS_GALLERY.push({ name: 'Pattern: Cooper recommendations', figma: 'Recommendation — Shape / Decline [patterns] (67:108295)', render: () => {
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState(recs);
    const [chat, setChat] = React.useState('closed');
    return (
      <div>
        <p className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', margin: '0 0 12px' }}>
          The “N Recommendations” chip opens Cooper’s window. Expand an item, Explore or Shape to walk through them, Decline / Do it; the count updates and the chip disappears at 0.
          Ask opens the Cooper chat (the two are never open together).</p>
        <MapScreen recCount={list.length} recSelected={open} onRecs={() => { setChat('closed'); setOpen(!open); }}
          sheet={<IFS.BottomSheet {...sheetProps} prompts={['Walk me through this framework', 'What hasn’t been updated in a while?']} showPrompts={chat === 'closed' && !open} showCooper={chat === 'closed' && !open} onCooper={() => { setOpen(false); setChat('bar'); }} />}>
          {open && list.length > 0 && <div className="ifs-cooper-float ifs-cooper-fade" style={{ top: 8, right: 8, maxHeight: 'calc(100% - 16px)', display: 'flex' }}>
            <CooperRecommendations recommendations={list} onRecommendationsChange={setList} onClose={() => setOpen(false)} onDone={() => setOpen(false)}
              onAsk={() => { setOpen(false); setChat('full'); }} />
          </div>}
          <CooperChat size={chat} onSizeChange={setChat} defaultMode="text" />
        </MapScreen>
      </div>
    );
  } });
}
