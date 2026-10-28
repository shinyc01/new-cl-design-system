import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { CompareDropdown, CompareDropdownList, CompareHeader, CompareStatValue, CompareView, ActivityPanel } = IFS;
  const Row = ({ label, children }) => <div className="g-row"><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Cell = ({ title, children, w = 380, h }) => (
    <div style={{ width: w, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>{title}</span>
      <div style={{ height: h, display: 'flex', alignItems: 'flex-start', minHeight: 0 }}>{children}</div>
    </div>
  );
  const grid = { display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24, alignItems: 'flex-start' };
  const STAGES = [['command', 'Command'], ['value', 'Value'], ['explore', 'Explore'], ['build', 'Build'], ['plan', 'Plan'], ['results', 'Results']].map(([value, label]) => ({ value, label }));
  const Screen = ({ children, h = 900 }) => <div style={{ position: 'relative', width: 1440, height: h, overflow: 'hidden', background: 'var(--surface-primary)', transform: 'translateZ(0)' }}>{children}</div>;

  // ───────────────────────── data ─────────────────────────
  const P = {
    carter: { name: 'J. Carter', initials: 'JC', type: 'orange' },
    singh: { name: 'A. Singh', initials: 'AS', type: 'green' },
    torres: { name: 'M. Torres', initials: 'MT', type: 'purple' },
    loid: { name: 'Loid Forger', initials: 'LF', type: 'blue' },
    shiny: { name: 'Shiny C.', initials: 'SC', type: 'dark-pink' },
    cooper: { name: 'Cooper', type: 'cooper' },
  };
  const act = (id, who, type, role, text, time) => ({ id, name: P[who].name, avatar: P[who], type, role, text, time });
  const Q1_VERSIONS = [
    { id: 'v4', title: 'Version 4', current: true, description: 'Published this version and set it as the active framework.', author: P.carter, time: '3:42 PM · May 12',
      activity: [
        act('a1', 'carter', 'comment', 'Administrator', 'Published this version and set it as the active framework.', '3:42 PM · May 12'),
        act('a2', 'cooper', 'auto-action', null, 'Previous active framework “2024 Strategy v2” moved to archived.', '3:42 PM · May 12'),
        act('a3', 'cooper', 'auto-action', null, 'Status changed to Ready to Publish. All 5 approvals collected.', '5:10 PM · May 9'),
        act('a4', 'loid', 'action', 'Field Team Lead', 'Approved.', '5:10 PM · May 9'),
        act('a5', 'shiny', 'comment', 'Planning Engineer', 'Approved.', '7:10 PM · May 9'),
        act('a6', 'singh', 'action', 'Investment Owner', 'Submitted for approval. 2 reviewers requested.', '9:00 AM · May 5'),
        act('a7', 'singh', 'action', 'Investment Owner', 'Created this version.', '2:20 PM · Apr 28'),
      ] },
    { id: 'v3', title: 'Version 3', description: 'Added grid-resilience driver, linked to the 2026 capital plan.', author: P.carter, time: '2:40 PM · May 10',
      activity: [
        act('b1', 'carter', 'action', 'Administrator', 'Added the grid-resilience driver under Reliability.', '2:40 PM · May 10'),
        act('b2', 'singh', 'comment', 'Investment Owner', 'Linked to the 2026 capital plan — please check the CAPEX split.', '1:05 PM · May 10'),
        act('b3', 'cooper', 'auto-action', null, 'Re-scored 12 measures after the driver change.', '2:41 PM · May 10'),
      ] },
    { id: 'v2', title: 'Version 2', description: 'Adjusted reliability KPI thresholds.', author: P.singh, time: '11:15 AM · May 6',
      activity: [
        act('c1', 'singh', 'action', 'Investment Owner', 'Raised the SAIDI target from 92 to 95 minutes.', '11:15 AM · May 6'),
        act('c2', 'torres', 'comment', 'Asset Planning', 'Thresholds now match the regulator’s 2026 guidance.', '10:40 AM · May 6'),
      ] },
    { id: 'v1', title: 'Version 1', description: 'Initial draft of the framework.', author: P.carter, time: '11:15 AM · May 6',
      activity: [
        act('d1', 'carter', 'action', 'Administrator', 'Created the framework from the 2025 template.', '9:02 AM · May 6'),
        act('d2', 'cooper', 'auto-action', null, 'Imported 6 enterprise goals from the Q4 2025 Strategy Framework.', '9:02 AM · May 6'),
      ] },
  ];
  const genVersions = (by, n = 3) => Array.from({ length: n }, (_, i) => {
    const k = n - i;
    return { id: `g${k}`, title: `Version ${k}`, current: i === 0, description: k === 1 ? 'Initial draft of the framework.' : `Updated value measures (draft ${k}).`, author: by, time: `${9 + i}:20 AM · Apr ${20 - i * 3}`,
      activity: [{ id: `g${k}a`, name: by.name, avatar: by, type: 'action', role: 'Investment Owner', text: k === 1 ? 'Created this version.' : 'Saved a new version.', time: `${9 + i}:20 AM · Apr ${20 - i * 3}` }] };
  });
  const APPROVED = [
    { key: 'lf', state: 'success', name: 'Loid Forger', position: 'Field Team Lead', avatar: P.loid, date: '5:10 PM · May 9' },
    { key: 'sc', state: 'success', name: 'Shiny C.', position: 'Planning Engineer', avatar: P.shiny, date: '7:10 PM · May 9' },
  ];
  const PENDING = [...APPROVED, { key: 'mt', state: 'awaiting', name: 'M. Torres', position: 'Asset Planning', avatar: P.torres, date: 'Requested May 10' },
    { key: 'as', state: 'rejected', name: 'A. Singh', position: 'Investment Owner', avatar: P.singh, date: '4:12 PM · May 11', comment: 'CAPEX split needs the updated 2026 figures.' }];
  const d = s => new Date(`${s}T00:00`);
  const fmt = v => v.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const FRAMEWORKS = [
    { id: 'f1', name: 'Q1 2026 Strategy Framework', status: { type: 'green', label: 'Active' }, modified: d('2026-01-15'), by: P.carter, versions: Q1_VERSIONS, approvals: APPROVED },
    { id: 'f2', name: 'Q2 2026 Strategy Framework', status: { type: 'orange', label: 'Pending Approval', count: '5/8' }, modified: d('2026-01-10'), by: P.singh, versions: genVersions(P.singh), approvals: PENDING },
    { id: 'f3', name: 'Cost Optimization 2026', status: { type: 'gray', label: 'Draft' }, stage: 'Input', modified: d('2025-12-18'), by: P.singh, versions: genVersions(P.singh, 1), approvals: [] },
    { id: 'f4', name: '2025 Strategy Framework v6', status: { type: 'gray', label: 'Draft' }, stage: 'Shape', modified: d('2025-12-05'), by: P.singh, versions: genVersions(P.singh, 2), approvals: [] },
    { id: 'f5', name: 'Decarbonization Review 2026', status: { type: 'gray', label: 'Draft' }, stage: 'Review', modified: d('2025-11-22'), by: P.singh, versions: genVersions(P.singh, 2), approvals: [] },
    { id: 'f6', name: '2025 Strategy Framework v3', status: { type: 'archive', label: 'Archived' }, modified: d('2025-10-02'), by: P.torres, versions: genVersions(P.torres), approvals: APPROVED },
    { id: 'f7', name: '2025 Strategy Framework v2', status: { type: 'archive', label: 'Archived' }, modified: d('2025-04-18'), by: P.torres, versions: genVersions(P.torres), approvals: APPROVED },
    { id: 'f8', name: '2024 Strategy Framework v1', status: { type: 'archive', label: 'Archived' }, modified: d('2024-11-10'), by: P.torres, versions: genVersions(P.torres, 2), approvals: APPROVED },
  ];

  // Compare data: baselines (compare-dropdown groups) and the numbers per baseline.
  const BASELINES = {
    best: { label: 'Best in class', cap: 'Best in class', goals: 6, k: [61, 91, 1.14, 2.2] },
    peer: { label: 'Peer Average', cap: 'Peer average', goals: 5, k: [48, 84, 1.02, 1.9] },
    v3: { label: 'Version 3', cap: 'Version 3', goals: 5, k: [60, 92, 1.21, 2.4] },
    v2: { label: 'Version 2', cap: 'Version 2', goals: 5, k: [58, 90, 1.19, 2.3] },
    v1: { label: 'Version 1', cap: 'Version 1', goals: 4, k: [55, 88, 1.16, 2.1] },
    f6: { label: '2025 Strategy Framework v3', cap: '2025 v3', goals: 5, k: [57, 89, 1.08, 2.0] },
    f4: { label: '2025 Strategy Framework v6', cap: '2025 v6', goals: 6, k: [59, 90, 1.18, 2.3] },
  };
  const COMPARE_GROUPS = [
    { title: 'Top benchmarks', items: [{ value: 'best', label: 'Best in class' }, { value: 'peer', label: 'Peer Average' }] },
    { title: 'Versions', items: [{ value: 'v3', label: 'Version 3', status: { type: 'archive', label: 'Archived' } }, { value: 'v2', label: 'Version 2', status: { type: 'archive', label: 'Archived' } },
      { value: 'v1', label: 'Version 1', status: { type: 'archive', label: 'Archived' } }] },
    { title: 'All frameworks', items: [{ value: 'f4', label: '2025 Strategy Framework v6', status: { type: 'gray', label: 'Draft' }, badge: 'Shape' },
      { value: 'f6', label: '2025 Strategy Framework v3', status: { type: 'archive', label: 'Archived' } }] },
  ];
  const ordinal = n => `${n}${['th', 'st', 'nd', 'rd'][(n % 100 > 10 && n % 100 < 14) ? 0 : (n % 10 < 4 ? n % 10 : 0)]}`;
  const statsFor = (b, curLabel = 'Q1 2026') => {
    const k = (BASELINES[b] || BASELINES.best).k; const cap = b ? BASELINES[b].cap : null;
    const up = (a, c) => (c >= a ? 'up' : 'down');
    return [
      { key: 'pos', title: 'Industry position percentile', trend: `${Math.abs(62 - k[0])}`, trendDirection: up(k[0], 62), fromLabel: cap, from: ordinal(k[0]), toLabel: curLabel, to: '62nd', description: 'among peer utilities' },
      { key: 'risk', title: 'Risk coverage', trend: `${Math.abs(94 - k[1])} %`, trendDirection: up(k[1], 94), fromLabel: cap, from: `${k[1]}%`, toLabel: curLabel, to: '94%', description: 'of investments scored' },
      { key: 'cap', title: 'Total capital', trend: `${Math.abs((1.24 - k[2]) / k[2] * 100).toFixed(2)}%`, trendDirection: up(k[2], 1.24), fromLabel: cap, from: `$${k[2].toFixed(2)}B`, toLabel: curLabel, to: '$1.24B' },
      { key: 'bcr', title: 'Portfolio Benefit-Cost Ratio', trend: `${Math.abs(2.5 - k[3]).toFixed(1)}`, trendDirection: up(k[3], 2.5), fromLabel: cap, from: `${k[3]}`, toLabel: curLabel, to: '2.5' },
    ];
  };
  const sankeyFor = (b, curName = 'Version 4') => {
    const base = b ? BASELINES[b] : null; const cap = base ? base.cap.toUpperCase() : null;
    const hdr = (abbr, from, to) => (base ? { abbr, fromLabel: cap, toLabel: 'Q1 2026', from, to } : undefined);
    const objs = ['Reliability', 'Finance', 'Environmental', 'Social', 'Governance', 'Safety'];
    const mods = ['WDRM v4', 'WTRM v1', 'SAIDI / SAIFI v1', 'CapEx v3', 'Carbon footprint v4', 'Community impact v7', 'ESG-Rep v4', 'Public Safety Risk', 'Worker Health and Safety'];
    const meas = ['SAIDI', 'SAIFI', 'CAIDI', 'Tx Wildfire Risk', 'Total CAPEX', 'Direct CAPEX', 'tCO₂e avoided', 'Customer hardship…', 'SEC disclosure score', 'Wildfire risk $ expo…', 'Regulatory penalty $'];
    const nodes = [
      { id: 'g1', column: 'g', type: 'source', color: 'violet', count: 6, label: curName },
      ...(base ? [{ id: 'g2', column: 'g', type: 'source', color: 'green', count: base.goals, label: base.label }] : []),
      ...objs.map((l, i) => ({ id: `o${i}`, column: 'o', label: l, from: '$1.24B', to: i < 5 ? '$1.27B' : undefined })),
      ...mods.map((l, i) => ({ id: `m${i}`, column: 'm', label: l, from: '$1.24B', to: i < 7 ? '$1.27B' : undefined, change: '4.5%' })),
      ...meas.map((l, i) => ({ id: `e${i}`, column: 'me', type: 'measure', label: l, from: '$1.24B', to: i < 9 ? '$1.27B' : undefined })),
    ];
    const links = [
      ['g1', 'o0', 3], ['g1', 'o1', 2], ['g1', 'o2', 2], ['g1', 'o5', 1],
      ...(base ? [['g2', 'o0', 2], ['g2', 'o3', 2], ['g2', 'o4', 2]] : [['g1', 'o3', 1], ['g1', 'o4', 1]]),
      ['o0', 'm0', 2], ['o0', 'm1', 2], ['o0', 'm2', 1], ['o1', 'm3', 2], ['o2', 'm4', 2], ['o3', 'm5', 1], ['o4', 'm6', 1], ['o5', 'm7', 1], ['o5', 'm8', 1],
      ['m0', 'e0', 1], ['m0', 'e1', 1], ['m2', 'e2', 1], ['m1', 'e3', 1], ['m3', 'e4', 1], ['m3', 'e5', 1], ['m4', 'e6', 1], ['m5', 'e7', 1], ['m6', 'e8', 1], ['m7', 'e9', 1], ['m8', 'e10', 1],
    ].map(([source, target, value]) => ({ source, target, value }));
    return {
      columns: [{ id: 'g', label: 'Goals' }, { id: 'vf', label: 'Value framework' },
        { id: 'o', label: 'Strategic objectives', header: hdr('OBJ.', '6', '5') }, { id: 'm', label: 'Models', header: hdr('MOD.', '9', '7') },
        { id: 'me', label: 'Measure output', header: hdr('MEAS.', '20', '14') }],
      nodes, links,
    };
  };

  // ───────────────────────── components ─────────────────────────
  IFS_GALLERY.push({ name: 'CompareDropdown', figma: 'compare-dropdown [patterns] (52:82756)', render: () => {
    const [v, setV] = React.useState('best');
    return <>
      <div style={grid}>
        <Cell title="Property 1=Variant2 (filled)" w={320}><CompareDropdown groups={COMPARE_GROUPS} defaultValue="v3" /></Cell>
        <Cell title="Property 1=Variant3 (empty)" w={320}><CompareDropdown groups={COMPARE_GROUPS} /></Cell>
        <Cell title="Property 1=Default (open)" w={320} h={420}><CompareDropdown groups={COMPARE_GROUPS} defaultValue="best" state="open" /></Cell>
        <Cell title="disabled (inferred)" w={320}><CompareDropdown groups={COMPARE_GROUPS} defaultValue="v3" disabled /></Cell>
      </div>
      <Row label="live (click, ↑ ↓ Enter, ✕ clears)"><div style={{ height: 420, alignSelf: 'flex-start' }}><CompareDropdown groups={COMPARE_GROUPS} value={v} onChange={setV} /></div>
        <span className="t-body-m-regular" style={{ color: 'var(--text-secondary)' }}>value: {String(v)}</span></Row>
    </>;
  } });

  IFS_GALLERY.push({ name: 'CompareDropdownList', figma: 'drop-down list [patterns] (52:82683)', render: () => (
    <div style={grid}>
      <Cell title="default" w={320}><CompareDropdownList inline groups={COMPARE_GROUPS} /></Cell>
      <Cell title="hover row + selected" w={320}><CompareDropdownList inline groups={COMPARE_GROUPS} value="v3" activeValue="f4" /></Cell>
    </div>
  ) });

  IFS_GALLERY.push({ name: 'CompareHeader', figma: 'compare-header [patterns] (52:82780)', render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 1200 }}>
      <Row label="filled"><div style={{ width: 1200 }}><CompareHeader groups={COMPARE_GROUPS} defaultValue="best" /></div></Row>
      <Row label="empty"><div style={{ width: 1200 }}><CompareHeader groups={COMPARE_GROUPS} /></div></Row>
    </div>
  ) });

  IFS_GALLERY.push({ name: 'CompareStatValue', figma: 'compare-quick-stat-card [patterns] (52:82588) → StatCard', render: () => (
    <div style={{ ...grid, width: 1200, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {statsFor('best').map(s => <IFS.StatCard key={s.key} className="ifs-compare-stat" title={s.title} trend={s.trend} trendDirection={s.trendDirection} description={s.description}
        value={<CompareStatValue fromLabel={s.fromLabel} from={s.from} toLabel={s.toLabel} to={s.to} />} />)}
      {statsFor(null).slice(0, 2).map(s => <IFS.StatCard key={s.key} className="ifs-compare-stat" title={s.title} description={s.description}
        value={<CompareStatValue toLabel={s.toLabel} to={s.to} />} />)}
    </div>
  ) });

  IFS_GALLERY.push({ name: 'ActivityPanel', figma: 'panel-organism — Activity [patterns] (52:83780)', render: () => {
    const P900 = ({ title, children }) => <Cell title={title} h={760}>{children}</Cell>;
    return <div style={grid}>
      <P900 title="Version history (default)"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} /></P900>
      <P900 title="Expanded: activity log of Version 4"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultExpanded={['v4']} /></P900>
      <P900 title="Filtered by person: “What did A. Singh do?”"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultQuery="What did A. Singh do?" /></P900>
      <P900 title="Filtered by type: “Show comments only”"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultQuery="Show comments only" /></P900>
      <P900 title="Rename"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultRename={{ id: 'v3', value: 'Version 3' }} /></P900>
      <P900 title="Rename error (name exists)"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultRename={{ id: 'v3', value: 'Version 4', error: 'A version with this name already exists' }} /></P900>
      <P900 title="Search: no results"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultQuery="Pricing tariffs" /></P900>
      <P900 title="Approval chain"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={PENDING} defaultView="approvals" /></P900>
      <P900 title="Approval chain: filtered “Show me everyone who approved”"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={PENDING} defaultView="approvals" defaultQuery="Show me everyone who approved" /></P900>
      <P900 title="Approval chain: empty"><ActivityPanel layout="static" defaultVersions={genVersions(P.singh, 1)} approvals={[]} defaultView="approvals" /></P900>
      <P900 title="Only version history (no approval chain)"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} /></P900>
    </div>;
  } });

  // ───────────────────────── Pattern screens ─────────────────────────
  const fwActions = (r, api, go) => [
    { label: 'Compare', icon: 'compare', disabled: r.versions.length < 2 && r.status.label === 'Draft', reason: 'This draft has no earlier version to compare with yet', onClick: () => go.compare(r) },
    { label: 'Activity', icon: 'users-group', onClick: () => go.activity(r) },
    { divider: true },
    { label: 'Duplicate & Update', icon: 'duplicate', onClick: () => go.duplicate(r, r.versions[0]) },
    { label: 'Rename', icon: 'system-edit-rename', onClick: api.rename },
  ];
  const SIDE = <IFS.SideNav title="Value" defaultValue="sf" items={[{ id: 'active', label: 'Active framework' },
    { type: 'section', label: 'Library', items: [{ id: 'sf', label: 'Strategy Framework' }, { id: 'vf', label: 'Value Frameworks' }, { id: 'vm', label: 'Value Models' }] },
    { id: 'hp', label: 'Human Performance' }]} />;
  const NAV = <IFS.NavBar stages={STAGES} defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />;
  const PROMPTS = ['Walk me through this framework', 'What hasn\'t been updated in a while?'];
  const MAP_NODES = [['enterprise-goal', 'Enterprise Goals', 5], ['value-framework', 'Value Framework v12'], ['strategic-objective', 'Strategic Objectives', 5], ['value-model', 'Value Models', 7], ['measure', 'Measures', 29]];

  function FrameworkMap({ title, status, draft, onBack, onActivity, onDuplicate }) {
    const [menu, setMenu] = React.useState(false);
    return (
      <IFS.AppShell height={900} navBar={NAV} sideNav={SIDE}
        header={<>
          <div style={{ position: 'relative' }}>
            <IFS.PageHeader title={title} onBack={onBack} onTitleMenu={() => setMenu(!menu)} status={<IFS.Indicator type={status.type} size="xs">{status.label}</IFS.Indicator>}
              views={<IFS.SegmentedControl size="s" defaultValue="map" options={[{ value: 'grid', iconLeft: 'overview' }, { value: 'map', iconLeft: 'node-map' }, { value: 'compare', iconLeft: 'compare' }]} />}
              actions={draft ? <><IFS.Button type="secondary" size="s" iconLeft="users-group">1/1</IFS.Button><IFS.Button type="primary" size="s">Review</IFS.Button></> : <IFS.CooperChip />} />
            {draft && <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 344 }}>
              <IFS.Stepper steps={[{ label: 'Input' }, { label: 'Shape' }, { label: 'Review' }, { label: 'Approve' }]} current={1} /></div>}
            {menu && <div style={{ position: 'absolute', left: 120, top: 40, zIndex: 5 }}>
              <IFS.ActionMenu inline items={[{ label: 'Activity', icon: 'users-group', onClick: () => { setMenu(false); onActivity(); } }, { divider: true },
                { label: 'Duplicate', icon: 'duplicate', onClick: () => { setMenu(false); onDuplicate(); } }, { label: 'Rename', icon: 'system-edit-rename', onClick: () => setMenu(false) }]} /></div>}
          </div>
          <IFS.CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} />
        </>}
        bottom={<IFS.BottomSheet type="value" documents={{ label: '16 Documents', icon: 'system-file' }} prompts={PROMPTS} />}>
        <div style={{ position: 'relative', height: '100%', minHeight: 640 }}>
          <IFS.CanvasBackground style={{ position: 'absolute', inset: 0 }} overlay={<div style={{ position: 'absolute', left: 14, bottom: 14 }}><IFS.ValueMapButton type="shape" /></div>}>
            {MAP_NODES.map(([t, ttl, n], i) => <div key={t} style={{ position: 'absolute', left: 52 + i * 240, top: 340 }}><IFS.NodeCard type={t} title={ttl} counter={n} /></div>)}
          </IFS.CanvasBackground>
        </div>
      </IFS.AppShell>
    );
  }

  function ActivityDemo({ start = 'library', panel = null, expanded = [], view = 'versions' }) {
    const [rows, setRows] = React.useState(FRAMEWORKS);
    const [screen, setScreen] = React.useState(start === 'compare' ? { kind: 'compare', fw: 'f1', baseline: 'best' } : { kind: 'library' });
    const [panelFor, setPanelFor] = React.useState(panel);
    const fw = id => rows.find(r => r.id === id);
    const go = {
      activity: r => setPanelFor(r.id),
      compare: (r, baseline) => { setPanelFor(null); setScreen({ kind: 'compare', fw: r.id, baseline: baseline || (r.id === 'f1' ? 'v3' : 'best') }); },
      duplicate: (r, v) => {
        const copy = { id: `c${Date.now()}`, name: `Copy of ${r.name}`, status: { type: 'gray', label: 'Draft' }, stage: 'Input', modified: new Date(), by: { name: 'J. Parker', initials: 'JP', type: 'black' },
          versions: [{ id: 'n1', title: 'Version 1', current: true, description: `Duplicated from ${r.name} · ${v ? v.title : 'current version'}.`, author: { name: 'J. Parker', initials: 'JP', type: 'black' }, time: 'Just now', activity: [] }], approvals: [] };
        setRows([copy, ...rows]); setPanelFor(null); setScreen({ kind: 'map', fw: copy.id, draft: true });
        IFS.toast({ title: `Duplicated as “${copy.name}”`, description: 'New framework in Draft' });
      },
    };
    const library = (
      <IFS.AppShell height={900} navBar={NAV} sideNav={SIDE} bottom={<IFS.BottomSheet prompts={PROMPTS} />}>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <IFS.DataTable variant="standard" rows={rows} onRowsChange={setRows} defaultSort={{ key: 'modified', dir: 'desc' }}
            pageTop={{ title: 'Strategy Framework', description: 'Published, archived, and draft strategy frameworks', actions: <IFS.Button type="secondary" size="m" iconLeft="system-pencil-plus">New</IFS.Button> }}
            filterTabs={{ variant: 'tabs', items: [{ value: 'all', label: 'All' }, ...['Active', 'Pending Approval', 'Archived', 'Draft'].map(s => ({ value: s, label: s, match: r => r.status.label === s }))] }}
            search={{ placeholder: 'Ask anything about strategy frameworks', suggestions: ['Which frameworks are waiting on my approval?', 'What changed in the active framework?'] }}
            onOpen={r => setScreen({ kind: 'map', fw: r.id })} onRename={() => {}} rowActions={(r, api) => fwActions(r, api, go)}
            columns={[
              { key: 'name', title: 'Strategy framework', name: true, width: '1fr', filter: false },
              { key: 'status', title: 'Status', width: 260, type: 'custom', filterValue: r => r.status.label,
                render: r => <><IFS.Indicator type={r.status.type}>{r.status.label}</IFS.Indicator>{(r.status.count || r.stage) && <IFS.Badge color="white" size="m">{r.status.count || r.stage}</IFS.Badge>}</> },
              { key: 'modified', title: 'Last modified', width: 270, kind: 'date', type: 'custom', render: r => fmt(r.modified) },
              { key: 'by', title: 'Created by', width: 280, type: 'user', filterValue: r => r.by.name },
            ]} />
        </div>
      </IFS.AppShell>
    );
    let body = library;
    if (screen.kind === 'map') {
      const r = fw(screen.fw);
      body = <FrameworkMap title={r.name} draft={screen.draft || r.status.label === 'Draft'}
        status={screen.readOnly ? { type: 'archive', label: `${screen.readOnly} · Read-only` } : r.status}
        onBack={() => setScreen({ kind: 'library' })} onActivity={() => setPanelFor(r.id)} onDuplicate={() => go.duplicate(r, r.versions[0])} />;
    } else if (screen.kind === 'compare') {
      const r = fw(screen.fw); const curName = (r.versions.find(v => v.current) || r.versions[0]).title;
      body = (
        <IFS.AppShell height={900} navBar={NAV} sideNav={SIDE}
          header={<IFS.PageHeader title={r.name} onBack={() => setScreen({ kind: 'library' })} onTitleMenu={() => setPanelFor(r.id)}
            status={<IFS.Indicator type={r.status.type} size="xs">{r.status.label}</IFS.Indicator>}
            views={<IFS.SegmentedControl size="s" value="compare" onChange={v => v !== 'compare' && setScreen({ kind: 'map', fw: r.id })}
              options={[{ value: 'grid', iconLeft: 'overview' }, { value: 'map', iconLeft: 'node-map' }, { value: 'compare', iconLeft: 'compare' }]} />}
            actions={<IFS.CooperChip />} />}
          bottom={<IFS.BottomSheet type="value" documents={{ label: '16 Documents', icon: 'system-file' }} prompts={['Summarize risks', 'Explain Best in class']} />}>
          <div>
            <CompareView groups={COMPARE_GROUPS} value={screen.baseline} onChange={b => setScreen({ ...screen, baseline: b })}
              stats={statsFor(screen.baseline)} sankey={sankeyFor(screen.baseline, curName)} height={520} />
          </div>
        </IFS.AppShell>
      );
    }
    const pr = panelFor && fw(panelFor);
    return (
      <Screen>
        {body}
        {pr && <ActivityPanel key={pr.id} layout="contained" open onOpenChange={o => !o && setPanelFor(null)} defaultExpanded={expanded} defaultView={view}
          versions={pr.versions} onVersionsChange={vs => setRows(rows.map(x => (x.id === pr.id ? { ...x, versions: vs } : x)))}
          approvals={pr.approvals}
          onOpenVersion={v => { setPanelFor(null); setScreen({ kind: 'map', fw: pr.id, readOnly: v.current ? null : v.title }); }}
          onCompare={(v, base) => go.compare(pr, pr.id === 'f1' ? (v.current ? 'v3' : v.id) : 'best')}
          onDuplicate={v => go.duplicate(pr, v)}
          onRestore={v => {
            const copy = { id: `r${Date.now()}`, name: `${pr.name} (restored ${v.title})`, status: { type: 'gray', label: 'Draft' }, stage: 'Input', modified: new Date(), by: { name: 'J. Parker', initials: 'JP', type: 'black' },
              versions: [{ ...v, id: 'n1', title: 'Version 1', current: true, description: `Restored from ${v.title}.`, activity: [] }], approvals: [] };
            setRows([copy, ...rows]); setPanelFor(null); setScreen({ kind: 'map', fw: copy.id, draft: true });
            IFS.toast({ title: `${v.title} restored as a new draft`, description: 'The original history is unchanged.' });
          }} />}
      </Screen>
    );
  }

  IFS_GALLERY.push({ name: 'Pattern: Activity panel — version history', figma: 'Library - Strategy Framework - Activity panel [patterns] (52:87879)',
    render: () => <ActivityDemo panel="f1" /> });
  IFS_GALLERY.push({ name: 'Pattern: Activity log — filter by type or person', figma: 'Library - Strategy Framework - Ready to publish [patterns] (52:83887)',
    render: () => <ActivityDemo panel="f1" expanded={['v4']} /> });
  IFS_GALLERY.push({ name: 'Pattern: Entry point — library row menu', figma: 'Library - Strategy Framework - Active - detail [patterns] (52:88173)',
    render: () => <ActivityDemo /> });
  IFS_GALLERY.push({ name: 'Pattern: Compare versions', figma: 'Library - Strategy Framework - Active models [patterns] (52:84351)',
    render: () => <ActivityDemo start="compare" /> });
}
