import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { SmartSearch, SearchModal, SearchCard, FollowButton, ColumnFilter, CollaborationBadge, TruncatedText, ActionMenu,
    TableToolbar, ColumnSettings, RecordPreview, DataTable } = IFS;
  const Row = ({ label, children }) => <div className="g-row"><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Cell = ({ title, children, w = 376 }) => (
    <div style={{ width: w, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>{title}</span>{children}
    </div>
  );
  const grid = { display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24, alignItems: 'flex-start' };
  const QUESTIONS = ['Which investments address the Northgate cluster?', 'What was deferred in this planning cycle?', 'What changed since the last review?',
    'Which drafts haven\'t moved in 30 days?', 'Drafts created by P. Nair'];
  const STAGES = [{ value: 'command', label: 'Command' }, { value: 'value', label: 'Value' }, { value: 'explore', label: 'Explore' },
    { value: 'build', label: 'Build' }, { value: 'plan', label: 'Plan' }, { value: 'results', label: 'Results' }];
  const Screen = ({ children, h = 900 }) => <div style={{ position: 'relative', width: 1440, height: h, overflow: 'hidden', background: 'var(--surface-primary)', transform: 'translateZ(0)' }}>{children}</div>;
  const PageTop = ({ title, description, action, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, minHeight: description ? 48 : 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 className="t-heading-h1-medium" style={{ margin: 0, color: 'var(--text-primary)' }}>{title}</h1>
          {description && <span className="t-body-m-medium" style={{ color: 'var(--text-secondary)' }}>{description}</span>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );

  // ── SmartSearch ──
  IFS_GALLERY.push({ name: 'SmartSearch', figma: 'smart-search-organism (2145:3758)', render: () => {
    const ph = 'Ask anything about strategy frameworks';
    return <>
      <div style={grid}>
        {['text', 'voice'].map(t => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>Type={t}</span>
            <SmartSearch type={t} placeholder={ph} />
            <SmartSearch type={t} placeholder={ph} state="hover" />
            <SmartSearch type={t} placeholder={ph} state="pressed" listening={t === 'voice'} />
            <SmartSearch type={t} placeholder={ph} state="pressed" defaultValue={t === 'voice' ? 'Strategy...' : 'Strategy'} />
            <SmartSearch type={t} placeholder={ph} defaultValue="Strategy plan" />
            <SmartSearch type={t} placeholder={ph} state="pressed" defaultValue="Explain how our current pricing model impacts different customer segments" />
            <SmartSearch type={t} placeholder={ph} disabled />
            <SmartSearch type={t} placeholder={ph} state="focus" />
          </div>
        ))}
      </div>
      <Row label="size s (28, explore-header)"><SmartSearch size="s" width={248} placeholder="Search for..." /><SmartSearch size="s" width={248} defaultValue="Northgate" /></Row>
      <Row label="live, with suggestions"><div style={{ height: 300 }}><SmartSearch placeholder="Ask anything about idea pad" suggestions={QUESTIONS} onSubmit={v => IFS.toast({ title: `Asked: ${v}` })} /></div></Row>
    </>;
  } });

  IFS_GALLERY.push({ name: 'SearchModal', figma: 'search-modal [patterns] (95:21781)', render: () => (
    <div style={grid}>
      <Cell title="suggestions" w={462}><SearchModal inline items={QUESTIONS} /></Cell>
      <Cell title="active (keyboard)" w={462}><SearchModal inline items={QUESTIONS.slice(0, 3)} activeIndex={1} /></Cell>
    </div>
  ) });

  IFS_GALLERY.push({ name: 'SearchCard', figma: 'search-card [patterns] (95:21751)', render: () => (
    <div style={{ width: 450, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SearchCard>Where is wildfire risk used?</SearchCard>
      <SearchCard state="hover">Where is wildfire risk used?</SearchCard>
      <SearchCard type="user-query" query="Where is wild">Where is wildfire risk used?</SearchCard>
      <SearchCard type="user-query" query="Where is wild" state="hover">Where is wildfire risk used?</SearchCard>
    </div>
  ) });

  IFS_GALLERY.push({ name: 'FollowButton', figma: 'icon-button-following [patterns] (95:16985)', render: () => (
    <Row label="following? no / yes"><FollowButton /><FollowButton defaultFollowing /></Row>
  ) });

  // ── ColumnFilter ──
  IFS_GALLERY.push({ name: 'ColumnFilter', figma: 'single-select-list-molecule + chips — Filter [patterns] (95:107049)', render: () => {
    const [name, setName] = React.useState([]);
    const [hz, setHz] = React.useState(['Long']); const [per, setPer] = React.useState(null);
    const [mod, setMod] = React.useState(['7d']);
    const [col, setCol] = React.useState(['Replied', 'Input required']);
    const [rng, setRng] = React.useState({ from: null, to: null });
    return (
      <div style={grid}>
        <Cell title="chips (Ideas: AI keywords)" w={240}><ColumnFilter options={['Replacement', 'Refurbishment', 'Upgrade', 'Feeder', 'Substation'].map(v => ({ value: v, label: v }))} value={name} onChange={setName} /></Cell>
        <Cell title="chips + custom period (Horizon)" w={240}><ColumnFilter options={['Long', 'Mid', 'Short'].map(v => ({ value: v, label: v }))} value={hz} onChange={setHz} period={{ value: per, onChange: setPer }} /></Cell>
        <Cell title="presets + custom period (Modified)" w={240}><ColumnFilter multiple={false} options={[{ value: '7d', label: 'Last 7 days' }, { value: '30d', label: 'Last 30 days' }, { value: '90d', label: 'Last 90 days' }, { value: 'this-year', label: 'This Year' }, { value: '2026', label: '2026' }]} value={mod} onChange={setMod} period={{ value: null, onChange: () => {} }} /></Cell>
        <Cell title="search + chips (Collaboration)" w={240}><ColumnFilter search={{ placeholder: 'Search by name, role...', onFilter: () => {} }} options={['Replied', 'Input required', 'Review required', 'A. Singh', 'P. Nair'].map(v => ({ value: v, label: v }))} value={col} onChange={setCol} /></Cell>
        <Cell title="range (Progress)" w={240}><ColumnFilter range={{ value: rng, onChange: setRng, min: 11, max: 89, step: 1 }} /></Cell>
      </div>
    );
  } });

  IFS_GALLERY.push({ name: 'CollaborationBadge', figma: 'badge-atom in Collaboration column [patterns] (95:132266)', render: () => (
    <Row label="types">
      <CollaborationBadge label="View reply" avatar={{ initials: 'IO', type: 'purple' }} request={{ name: 'Ivy Okafor', role: 'Asset Planning', time: '2h ago', text: '“Added the outage history you asked for — see the 2024 tab.”', meta: 'INV-2026-0812 · replied' }} />
      <CollaborationBadge label="Provide asset health" avatar={{ initials: 'MR', type: 'red' }} request={{ name: 'Matthew Ridderikhoff', role: 'Engineering Review', time: '1h ago', text: '“Cost model is locked. Focus on the risk-deferral trade-off in Alternative B.”', meta: 'INV-2026-0840 · sent for review' }} />
      <CollaborationBadge label="Review alternative B" avatar={{ initials: 'MR', type: 'red' }} count={3} request={{ name: 'Matthew Ridderikhoff', role: 'Engineering Review', time: '1h ago', text: '“Newest of three requests.”' }} />
    </Row>
  ) });

  IFS_GALLERY.push({ name: 'TruncatedText', figma: 'Name display [patterns] (190:230621)', render: () => {
    const n = 'Northgate Substation Transformer Replacement and Feeder 5 Backup Tie — Phase 2';
    return <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['end', 'middle', 'start', 'wrap', 'segment'].map(m => <Row key={m} label={`mode=${m}`}><div className="t-body-m-medium" style={{ width: 260, color: 'var(--text-primary)' }}><TruncatedText mode={m}>{n}</TruncatedText></div></Row>)}
    </div>;
  } });

  const VF_ACTIONS = [{ label: 'Compare', icon: 'compare' }, { label: 'Activity', icon: 'users-group' }, { label: 'Duplicate & Update', icon: 'duplicate' }, { label: 'Rename', icon: 'system-edit-rename' }];
  IFS_GALLERY.push({ name: 'ActionMenu', figma: 'more actions — single-select-list-molecule [patterns] (95:127626)', render: () => (
    <div style={grid}>
      <Cell title="inline list" w={200}><ActionMenu inline items={VF_ACTIONS} /></Cell>
      <Cell title="disabled with reason + destructive last" w={200}><ActionMenu inline items={[{ label: 'Compare', icon: 'compare', disabled: true, reason: 'Compare is not available for a Draft in the Input stage' }, { label: 'Archive', icon: 'chat-archive', destructive: true }, ...VF_ACTIONS.slice(1)]} /></Cell>
      <Cell title="trigger (⋮)" w={200}><div style={{ height: 180, display: 'flex', justifyContent: 'flex-end' }}><ActionMenu items={VF_ACTIONS} /></div></Cell>
    </div>
  ) });

  IFS_GALLERY.push({ name: 'TableToolbar', figma: 'table card bar [patterns] (95:106479)', render: () => (
    <div style={{ width: 1000, padding: 16, borderRadius: 8, background: 'var(--surface-secondary-alpha)' }}>
      <TableToolbar filter={<IFS.SegmentedControl size="s" options={[{ value: 'all', label: 'All ideas', counter: 11 }, { value: 'p', label: 'Project ideas', counter: 8 }, { value: 'g', label: 'Program ideas', counter: 3 }]} />}
        search={<SmartSearch placeholder="Ask anything about idea pad" />} onConfigure={() => {}} />
    </div>
  ) });

  IFS_GALLERY.push({ name: 'ColumnSettings', figma: 'Table configuration — Columns [patterns] (95:119449)', render: () => {
    const [cols, setCols] = React.useState([{ key: 'name', title: 'Name' }, { key: 'status', title: 'Status' }, { key: 'horizon', title: 'Horizon', hidden: true }, { key: 'modified', title: 'Modified' }, { key: 'collab', title: 'Collaboration' }]);
    return <div style={{ width: 380 }}><IFS.Drawer inline title="Columns" collapsible={false} subtitle="You can add, drag, or toggle column visibility in your table." className="ifs-data-table__drawer" height={560}>
      <ColumnSettings columns={cols} onChange={setCols} suggestions={[{ key: 'conf', title: 'Data confidence' }, { key: 'chg', title: 'Changed since approval' }, { key: 'down', title: 'Downstream exposure' }]} onAdd={s => setCols(c => [...c, s])} />
    </IFS.Drawer></div>;
  } });

  IFS_GALLERY.push({ name: 'RecordPreview', figma: 'panel-organism preview [patterns] (95:128070)', render: () => (
    <div style={{ height: 320, display: 'flex' }}>
      <RecordPreview id="INV-2026-0912" onDetails={() => {}} onClose={() => {}}>
        <h3 className="t-heading-h2-medium" style={{ margin: '0 0 6px', color: 'var(--text-primary)' }}>Southern Feeder Replacement — Circuit 17C</h3>
        <IFS.Indicator type="purple">Shaping</IFS.Indicator>
        <p className="t-body-l-regular" style={{ color: 'var(--text-secondary)' }}>7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising.</p>
      </RecordPreview>
    </div>
  ) });

  // ───────────────────────── Pattern screens ─────────────────────────
  const d = s => new Date(`${s}T00:00`); // local dates
  const today = new Date();
  const ago = n => new Date(today.getFullYear(), today.getMonth(), today.getDate() - n);
  const IDEAS = [
    { id: 'i1', name: 'Northgate Substation Transformer Replacement', program: true, pinned: true, status: { type: 'orange', label: 'Under review', count: '0/4' }, horizon: 'FY29–FY43', hz: [29, 43], term: 'Long', modified: ago(3), collab: { label: 'View reply', avatar: { initials: 'IO', type: 'purple' }, kind: 'Replied', who: 'I. Okafor', request: { name: 'Ivy Okafor', role: 'Asset Planning', time: '2h ago', text: '“Added the outage history you asked for — see the 2024 tab.”', meta: 'INV-2026-0812 · replied' } }, keywords: ['Replacement', 'Substation'] },
    { id: 'i2', name: 'Ridgeview Village Backup Tie to Feeder 5', program: true, status: { type: 'blue', label: 'New' }, horizon: 'FY30–FY50', hz: [30, 50], term: 'Long', modified: ago(20), keywords: ['Feeder'] },
    { id: 'i3', name: 'Cedar Park Feeder Hardening Program', program: true, status: { type: 'gray', label: 'Deferred' }, horizon: 'FY29–FY39', hz: [29, 39], term: 'Long', modified: d('2026-04-29'), collab: { label: 'Provide asset health', avatar: { initials: 'MR', type: 'red' }, kind: 'Input required', who: 'M. Ridderikhoff', count: 2, request: { name: 'Matthew Ridderikhoff', role: 'Engineering Review', time: '1h ago', text: '“Cost model is locked. Focus on the risk-deferral trade-off in Alternative B.”', meta: 'INV-2026-0840 · sent for review' } }, keywords: ['Feeder', 'Refurbishment'] },
    { id: 'i4', name: 'Southern Feeder Replacement — Circuit 17C', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY34–FY41', hz: [34, 41], term: 'Mid', modified: d('2026-03-11'), keywords: ['Replacement', 'Feeder'] },
    { id: 'i5', name: 'Elmwood Feeder 2 Underground Cable Renewal', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY34–FY36', hz: [34, 36], term: 'Short', modified: d('2026-02-09'), keywords: ['Feeder', 'Refurbishment'] },
    { id: 'i6', name: 'West Corridor Protection Relay Upgrade', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: d('2026-05-18'), collab: { label: 'View reply', avatar: { initials: 'TN', type: 'blue' }, kind: 'Replied', who: 'T. Nguyen', request: { name: 'Tam Nguyen', role: 'Protection', time: '1d ago', text: '“Relay settings attached.”', meta: 'INV-2026-0790 · replied' } }, keywords: ['Upgrade'] },
    { id: 'i7', name: 'Battery Storage at Northgate to Defer Feeder Upgrade', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: ago(5), collab: { label: 'Provide asset condition', avatar: { initials: 'SC', type: 'green' }, kind: 'Input required', who: 'S. Chen', request: { name: 'Sam Chen', role: 'Asset Health', time: '3h ago', text: '“Need the latest condition score for T2.”', meta: 'INV-2026-0811 · input required' } }, keywords: ['Upgrade', 'Feeder'] },
    { id: 'i8', name: 'Reccloser Swap-outs on Northgate Leftovers (F2, F7)', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: d('2026-06-15'), keywords: ['Replacement'] },
    { id: 'i9', name: 'Flood Erosion Protection at River Crossing Structure', status: { type: 'archive', label: 'Rejected' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: d('2026-01-28'), keywords: [] },
    { id: 'i10', name: 'Birchwood Lateral Undergrounding Study', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY31–FY35', hz: [31, 35], term: 'Mid', modified: null, keywords: ['Feeder'] },
    { id: 'i11', name: 'Harbor Road Pole Line Rebuild', status: { type: 'blue', label: 'New' }, horizon: 'FY33–FY38', hz: [33, 38], term: 'Mid', modified: ago(40), keywords: ['Replacement'] },
  ].map(r => ({ ...r, icon: r.program ? 'chat-folder' : undefined }));
  const fmt = v => (v ? v.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');
  const ideaCols = (onOpenCollab) => [
    { key: 'name', title: 'Ideas', name: true, width: '1fr', truncate: 'end', filterValue: r => r.keywords, filter: 'chips' },
    { key: 'status', title: 'Status', width: 200, type: 'custom', filterValue: r => r.status.label,
      render: r => <><IFS.Indicator type={r.status.type}>{r.status.label}</IFS.Indicator>{r.status.count && <IFS.Badge color="white" size="m">{r.status.count}</IFS.Badge>}</> },
    { key: 'horizon', title: 'Horizon', width: 140, filter: 'chips+period', filterValue: r => r.term, filterOptions: ['Long', 'Mid', 'Short'].map(v => ({ value: v, label: v })),
      overlaps: (r, s, e) => r.hz[0] <= e.getFullYear() - 2000 + 1 && r.hz[1] >= s.getFullYear() - 2000 + 1 },
    { key: 'modified', title: 'Modified', width: 140, kind: 'date', render: r => fmt(r.modified), type: 'custom' },
    { key: 'collab', title: 'Collaboration', width: 200, type: 'custom', filter: 'search-chips', filterValue: r => (r.collab ? [r.collab.kind, r.collab.who] : []),
      render: r => r.collab && <CollaborationBadge {...r.collab} onOpen={() => onOpenCollab(r)} /> },
  ];
  const SUGGESTED_COLS = [
    { key: 'conf', title: 'Data confidence', width: 140, render: r => `${60 + (r.id.length * 7) % 35}%` },
    { key: 'chg', title: 'Changed since approval', width: 180, render: r => (r.pinned ? 'Scope +2 assets' : '—') },
    { key: 'down', title: 'Downstream exposure', width: 160, render: r => `${(r.hz[1] - r.hz[0]) * 310} customers` },
  ];
  const ideaTabs = { variant: 'segmented', items: [{ value: 'all', label: 'All ideas' }, { value: 'project', label: 'Project ideas', match: r => !r.program }, { value: 'program', label: 'Program ideas', match: r => r.program }] };
  const ideaActions = (r) => [{ label: 'Navigate to', icon: 'capital-flow', submenu: true }, { label: 'View on map', icon: 'map' }, { label: 'Activity', icon: 'users-group' }, { label: 'Duplicate', icon: 'duplicate' }];
  const PREVIEW_BODY = r => <>
    <h3 className="t-heading-h2-medium" style={{ margin: '0 0 6px', color: 'var(--text-primary)' }}>{r.name}</h3>
    <IFS.Indicator type={r.status.type}>{r.status.label}</IFS.Indicator>
    <p className="t-body-l-regular" style={{ color: 'var(--text-secondary)' }}>7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising, flagged before failure, with an investment idea already drafted.</p>
    <IFS.ContentCard size="s" title="The need" description="Fault frequency on these feeders is up 3.1× over 24 months, with two sustained outages this year." />
  </>;

  const BuildShell = ({ children, aside, header }) => (
    <IFS.AppShell height={900} header={header}
      navBar={<IFS.NavBar stages={STAGES} defaultValue="build" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
      bottom={<IFS.BottomSheet prompts={['Brief me', 'What needs my input first?']} />}>
      <div style={{ display: 'flex', minHeight: '100%' }}>
        <div style={{ flex: 1, minWidth: 0, padding: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
        {aside}
      </div>
    </IFS.AppShell>
  );

  IFS_GALLERY.push({ name: 'Pattern: Idea Pad table (ranked)', figma: 'Filtering — Default [patterns] (95:106479)', render: () => {
    const [rows, setRows] = React.useState(IDEAS);
    const [preview, setPreview] = React.useState(null);
    const [page, setPage] = React.useState('ideas');
    const [loading, setLoading] = React.useState(false);
    const open = r => IFS.toast({ title: `Opening ${r.name}` });
    return (
      <Screen>
        <BuildShell
          aside={preview && <RecordPreview id={`INV-2026-09${preview.id.slice(1).padStart(2, '0')}`} onDetails={() => open(preview)} onClose={() => setPreview(null)}>{PREVIEW_BODY(preview)}</RecordPreview>}>
          <IFS.PageTop title="Build" actions={<IFS.Button type="secondary" size="m" iconLeft="system-pencil-plus">New</IFS.Button>}
            tabs={{ size: 'l', items: [{ value: 'ideas', label: 'Idea Pad' }, { value: 'inv', label: 'Investments' }], value: page,
              onChange: v => { setPage(v); setLoading(true); setTimeout(() => setLoading(false), 1200); } }} />
          <DataTable variant="ranked" rows={rows} onRowsChange={setRows} columns={ideaCols(r => IFS.toast({ title: `Opening ${r.collab.label.toLowerCase()} on ${r.name}` }))}
            filterTabs={ideaTabs} search={{ placeholder: 'Ask anything about idea pad', suggestions: QUESTIONS, noResults: ['Cedar Park', 'Birchwood', 'Northgate Full Replacement'] }}
            onOpen={open} onPreview={setPreview} previewId={preview && preview.id} rowActions={ideaActions} loading={loading}
            configurable={{ suggestions: SUGGESTED_COLS }} />
        </BuildShell>
      </Screen>
    );
  } });

  // Library (standard table): Value Framework / Strategy Framework.
  const FRAMEWORKS = [
    { id: 'f1', name: 'Value Framework v14', status: { type: 'green', label: 'Active' }, stage: null, modified: d('2026-01-15'), models: 14, measures: 52, by: { name: 'J. Carter', initials: 'JC', type: 'orange' } },
    { id: 'f2', name: 'Value Framework v13', status: { type: 'orange', label: 'Pending approval', count: '5/8' }, modified: d('2026-01-10'), models: 12, measures: 47, by: { name: 'A. Singh', initials: 'AS', type: 'blue' } },
    { id: 'f3', name: 'Cost Optimization 2026', status: { type: 'gray', label: 'Draft' }, stage: 'Input', modified: d('2025-12-18'), models: 12, measures: 42, by: { name: 'A. Singh', initials: 'AS', type: 'blue' } },
    { id: 'f4', name: 'Value Framework v4', status: { type: 'gray', label: 'Draft' }, stage: 'Shape', modified: d('2025-12-05'), models: 13, measures: 49, by: { name: 'A. Singh', initials: 'AS', type: 'blue' } },
    { id: 'f5', name: 'Decarbonization 2026', status: { type: 'gray', label: 'Draft' }, stage: 'Review', modified: d('2025-11-22'), models: 15, measures: 40, by: { name: 'A. Singh', initials: 'AS', type: 'blue' } },
    { id: 'f6', name: 'Reliability 2025', status: { type: 'archive', label: 'Archived' }, modified: d('2025-10-02'), models: 11, measures: 39, by: { name: 'M. Torres', initials: 'MT', type: 'purple' } },
    { id: 'f7', name: 'Compliance 2025', status: { type: 'archive', label: 'Archived' }, modified: d('2025-04-18'), models: 5, measures: 18, by: { name: 'M. Torres', initials: 'MT', type: 'purple' } },
    { id: 'f8', name: 'Value Framework v8', status: { type: 'archive', label: 'Archived' }, modified: d('2024-11-10'), models: 2, measures: null, by: { name: 'M. Torres', initials: 'MT', type: 'purple' } },
  ];
  const fwActions = (r, api) => {
    const draft = r.status.label === 'Draft';
    return [
      { label: 'Compare', icon: 'compare', disabled: draft && r.stage === 'Input', reason: 'Compare is available once the draft leaves the Input stage' },
      { label: 'Activity', icon: 'users-group' },
      { label: 'Duplicate & Update', icon: 'duplicate' },
      ...(r.status.label !== 'Archived' ? [{ label: 'Rename', icon: 'system-edit-rename', onClick: api.rename }] : []),
      ...(r.status.label !== 'Active' ? [{ label: 'Archive', icon: 'chat-archive', destructive: true }] : []),
    ];
  };
  IFS_GALLERY.push({ name: 'Pattern: Library table (standard)', figma: 'Library - Value Framework [patterns] (95:126706)', render: () => {
    const [rows, setRows] = React.useState(FRAMEWORKS);
    return (
      <Screen>
        <IFS.AppShell height={900}
          navBar={<IFS.NavBar stages={STAGES} defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
          sideNav={<IFS.SideNav title="Value" defaultValue="vf" items={[{ id: 'active', label: 'Active framework' },
            { type: 'section', label: 'Library', items: [{ id: 'sf', label: 'Strategy Framework' }, { id: 'vf', label: 'Value Framework' }, { id: 'vm', label: 'Value Models' }] },
            { id: 'hp', label: 'Human Performance' }]} />}
          bottom={<IFS.BottomSheet prompts={['Walk me through this framework', 'What hasn\'t been updated in a while?']} />}
>
          <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <DataTable variant="standard" rows={rows} onRowsChange={setRows} defaultSort={{ key: 'modified', dir: 'desc' }}
              pageTop={{ title: 'Value Framework', description: 'Published, archived and draft value frameworks', actions: <IFS.Button type="secondary" size="m" iconLeft="system-pencil-plus">New</IFS.Button> }}
              filterTabs={{ variant: 'tabs', items: [{ value: 'all', label: 'All' }, ...['Active', 'Pending approval', 'Archived', 'Draft'].map(s => ({ value: s, label: s === 'Pending approval' ? 'Pending Approval' : s, match: r => r.status.label === s }))] }}
              search={{ placeholder: 'Ask anything about value frameworks', suggestions: ['Which frameworks are waiting on my approval?', 'What changed between v13 and v14?'], noResults: ['Value Framework v14', 'Reliability 2025'] }}
              onOpen={r => IFS.toast({ title: `Opening ${r.name}` })} onRename={() => {}} rowActions={fwActions}
              columns={[
                { key: 'name', title: 'Value framework', name: true, width: '1fr', filter: false },
                { key: 'status', title: 'Status', width: 200, type: 'custom', filterValue: r => r.status.label,
                  render: r => <><IFS.Indicator type={r.status.type}>{r.status.label}</IFS.Indicator>{(r.status.count || r.stage) && <IFS.Badge color="white" size="m">{r.status.count || r.stage}</IFS.Badge>}</> },
                { key: 'modified', title: 'Last modified', width: 150, kind: 'date', type: 'custom', render: r => fmt(r.modified) },
                { key: 'models', title: 'Models', width: 120, kind: 'number', filter: false },
                { key: 'measures', title: 'Value measures', width: 140, kind: 'number', filter: false, render: r => (r.measures == null ? '—' : r.measures), type: 'custom' },
                { key: 'by', title: 'Created by', width: 160, type: 'user', filterValue: r => r.by.name },
              ]} />
          </div>
        </IFS.AppShell>
      </Screen>
    );
  } });

  // Investment details › Relationships: several tables on one page → fixed-height cards with Show more / Show less.
  const DEPS = [['Southern Feeder Replacement — Circuit 13C', 'SFR-13C', 'Timing and milestone', 42, 3.9, 7.5], ['Southern Feeder Replacement — Circuit 15D', 'SFR-15D', 'Program', 11, 2.0, 6.1],
    ['Southern Feeder Replacement — Circuit 16A', 'SFR-16A', 'Program', 89, 5.7, 12.0], ['Southern Feeder Replacement — Circuit 12A', 'SFR-12A', 'Value', 68, 4.2, 8.7],
    ['Southern Feeder Replacement — Circuit 18B', 'SFR-18B', 'Timing and milestone', 24, 1.8, 4.3], ['Northgate Substation Transformer Replacement', 'NST-04', 'Program', 57, 6.4, 11.2],
    ['Cedar Park Feeder Hardening Program', 'CPF-02', 'Value', 35, 3.1, 5.4], ['Elmwood Feeder 2 Underground Cable Renewal', 'EF2-01', 'Program', 73, 2.7, 4.9],
    ['West Corridor Protection Relay Upgrade', 'WCP-03', 'Timing and milestone', 15, 0.9, 2.2], ['Harbor Road Pole Line Rebuild', 'HRP-07', 'Value', 50, 1.2, 3.0]]
    .map(([name, code, type, progress, cost, value], i) => ({ id: `d${i}`, name, code: `INV-2026-${code}`, type, progress, cost, value }));
  const SEV = [['critical', 'red', 62], ['moderate', 'orange', 48], ['healthy', 'green', 12]];
  const ASSETS = [1, 4, 8, 2, 7, 9, 3, 5, 6, 10, 11].map((n, i) => { const s = SEV[Math.min(2, Math.floor(i / 3))]; return { id: `a${n}`, name: `Pole ${n}`, segment: 'Demeter SS → Recloser R-1', sev: s[0], color: s[1], score: s[2] }; });
  const RISKS = ['Loss of supply', 'Extended outage on Feeder 4', 'Public safety exposure at crossing', 'Regulatory breach', 'Vegetation contact during storm season',
    'Deferred maintenance backlog', 'Contractor availability', 'Equipment lead time', 'Environmental permit delay', 'Customer complaint volume']
    .map((name, i) => { const s = SEV[Math.min(2, Math.floor(i / 3.4))]; return { id: `r${i}`, name, sev: s[0], color: s[1], score: s[2] }; });
  const sevCols = [
    { key: 'sev', title: 'Status', width: 140, type: 'custom', filterValue: r => r.sev, render: r => <IFS.Indicator type={r.color}>{r.sev}</IFS.Indicator> },
    { key: 'score', title: 'Risk score', width: 150, kind: 'number', type: 'counter', render: r => <span style={{ color: `var(--text-${r.sev === 'critical' ? 'danger' : r.sev === 'moderate' ? 'warning' : 'success'})`, display: 'inline-flex', alignItems: 'center', gap: 2 }}><IFS.Icon name="arrow-caret-up-filled" size={12} />{r.score}%</span> },
  ];
  const cooperAdd = <IFS.IconButton icon="cooper-system-icon" type="tertiary" size="s" shape="circle" label="Add with Cooper" />;
  IFS_GALLERY.push({ name: 'Pattern: Multiple tables (fixed height, Show more)', figma: 'Investment details / Relationships [patterns] (190:232175)', render: () => (
    <Screen h={1500}>
      <IFS.AppShell height={1500}
        navBar={<IFS.NavBar stages={STAGES} defaultValue="build" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
        header={<IFS.PageHeader title="Southern Feeder Replacement" id="INV-2025-0842" onBack={() => {}} status={<IFS.Indicator type="purple" size="xs">Refining</IFS.Indicator>}
          views={<div style={{ width: 360 }}><IFS.Stepper current={2} steps={['Shape', 'Review', 'Refine', 'Approve'].map(label => ({ label }))} /></div>}
          actions={<><IFS.Button type="secondary" size="s">Dismiss</IFS.Button><IFS.Button type="primary" size="s">Send for approval</IFS.Button></>} />}
        bottom={<IFS.BottomSheet type="value" documents={{ label: '16 Documents', icon: 'system-file' }} onUpload={() => {}} prompts={['Explain gaps in confidence', 'Draft value assessment']} />}>
        <div style={{ padding: '12px 60px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PageTop title="Investment details" description="Core investment details, context, and current status">
            <IFS.Tabs items={[{ value: 'g', label: 'General' }, { value: 'c', label: 'Cost & Schedule' }, { value: 'r', label: 'Relationships' }]} defaultValue="r" />
          </PageTop>
          <DataTable title="Dependencies" collapsible headerAction={cooperAdd} fixedHeight rows={DEPS} search={{ placeholder: 'Ask anything about investments', noResults: ['Circuit 13C', 'Northgate'] }}
            columns={[
              { key: 'name', title: 'Investment', name: true, width: '1fr', code: r => r.code, filter: false },
              { key: 'type', title: 'Dependency type', width: 180, type: 'custom', render: r => <IFS.Badge color="white" size="m">{r.type}</IFS.Badge> },
              { key: 'progress', title: 'Progress', width: 150, kind: 'number', sortable: false, type: 'custom', render: r => <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}><IFS.ProgressBar value={r.progress} /><span>{r.progress}%</span></span> },
              { key: 'cost', title: 'Cost', width: 100, kind: 'number', step: 0.1, type: 'custom', render: r => `$${r.cost.toFixed(1)}M` },
              { key: 'value', title: 'Value', width: 100, kind: 'number', step: 0.1, type: 'custom', render: r => `$${r.value.toFixed(1)}M` },
            ]} />
          <DataTable title="Assets impacted" collapsible headerAction={cooperAdd} fixedHeight rows={ASSETS}
            columns={[{ key: 'name', title: 'Asset', name: true, width: '1fr', filter: 'chips' }, { key: 'segment', title: 'Segment', width: '1fr' }, ...sevCols]} />
          <DataTable title="Risks impacted" collapsible headerAction={cooperAdd} fixedHeight rows={RISKS}
            columns={[{ key: 'name', title: 'Risk', name: true, width: '1fr', filter: 'chips' }, ...sevCols]} />
        </div>
      </IFS.AppShell>
    </Screen>
  ) });

  // Table states side by side: loading, searching, search no-results, filter combination with no matches.
  IFS_GALLERY.push({ name: 'Pattern: Table states', figma: 'empty states [patterns] (190:231737)', render: () => {
    const cols = ideaCols(() => {}).slice(0, 4);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 1100 }}>
        <Cell title="Loading (skeleton rows inside the table)" w={1100}><DataTable variant="ranked" defaultRows={IDEAS.slice(0, 3)} columns={cols} filterTabs={ideaTabs} search={{ placeholder: 'Ask anything about idea pad' }} loading /></Cell>
        <Cell title="Search → Searching… → results / No results found (type a query and press Enter, e.g. “zzz”)" w={1100}>
          <DataTable variant="ranked" defaultRows={IDEAS.slice(0, 5)} columns={cols} filterTabs={ideaTabs} search={{ placeholder: 'Ask anything about idea pad', suggestions: QUESTIONS, noResults: ['Cedar Park', 'Birchwood', 'Northgate Full Replacement'] }} />
        </Cell>
        <Cell title="Filter combination with no matches (open Horizon › Short, then Ideas › Substation)" w={1100}>
          <DataTable variant="standard" defaultSort={{ key: 'modified', dir: 'desc' }} defaultRows={IDEAS.slice(0, 5)} columns={cols} filterTabs={{ ...ideaTabs, variant: 'tabs' }} />
        </Cell>
        <Cell title="Progressive loading (single table on the page: more rows load on scroll)" w={1100}>
          <div style={{ height: 360, overflow: 'auto' }}><DataTable defaultSort={{ key: 'modified', dir: 'desc' }} defaultRows={[...IDEAS, ...IDEAS.map(r => ({ ...r, id: r.id + 'b' }))]} columns={cols} progressive={{ pageSize: 6 }} /></div>
        </Cell>
      </div>
    );
  } });
}
