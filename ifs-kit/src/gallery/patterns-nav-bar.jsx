import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { NavBarCollapsed, ResponsiveNavBar, ExploreHeader, HomeRowCard, SideNavTree, StagedAppShell } = IFS;
  const { useState } = React;
  const Row = ({ label, children, top }) => <div className="g-row" style={top ? { alignItems: 'flex-start' } : null}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const USER = { initials: 'JP', name: 'J. Parker' };
  const STAGES = ['Command', 'Value', 'Explore', 'Build', 'Plan', 'Results'].map(l => ({ value: l.toLowerCase(), label: l }));
  const toast = title => IFS.toast && IFS.toast({ title });

  /* ───────────────────────── components ───────────────────────── */

  IFS_GALLERY.push({ name: 'NavBarCollapsed', figma: 'nav-bar-organism Type=Collapsed / Collapsed opened (3412:29453)', render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row label="Collapsed"><div style={{ width: 600 }}><NavBarCollapsed stages={STAGES} defaultValue="value" hasNotifications user={USER} /></div></Row>
      <Row label="Collapsed opened" top><div style={{ width: 600, height: 300 }}><NavBarCollapsed stages={STAGES} defaultValue="value" defaultOpen hasNotifications user={USER} /></div></Row>
    </div>
  ) });

  IFS_GALLERY.push({ name: 'ResponsiveNavBar', figma: 'nav-bar-organism Type=Default ↔ Collapsed (3412:29453)', render: () => {
    const [w, setW] = useState(1200);
    const [stage, setStage] = useState('plan');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row label="Width"><IFS.SegmentedControl size="s" value={String(w)} onChange={v => setW(+v)} options={['1200', '900', '760', '600'].map(v => ({ value: v, label: `${v}px` }))} /></Row>
        <div style={{ width: w, height: 300, transition: 'width .2s' }}>
          <ResponsiveNavBar stages={STAGES} value={stage} onChange={setStage} hasNotifications user={USER} />
        </div>
      </div>
    );
  } });

  IFS_GALLERY.push({ name: 'ExploreHeader', figma: 'explore-header [patterns] (12:175111)', render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 1100 }}>
      <Row label="Default"><div style={{ flex: 1 }}><ExploreHeader search={{ suggestions: ['Where are the oldest feeders?', 'Show substations over capacity'] }} onCollaborators={() => toast('Collaborators')} onComments={() => toast('Comments')} /></div></Row>
      <Row label="Filters applied, new comments"><div style={{ flex: 1 }}><ExploreHeader filtersApplied hasNewComments collaborators="5/5" /></div></Row>
    </div>
  ) });

  const MiniMap = () => (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, var(--background-elevation-1-tertiary), var(--surface-secondary-alpha) 70%)' }}>
      <div style={{ position: 'absolute', left: '30%', top: 30 }}><IFS.MapPinPole symbol="pin" number="Recloser R-1" pinIcon="asset type-substation" /></div>
      <div style={{ position: 'absolute', left: '66%', top: 18 }}><IFS.MapPinPole symbol="pin" number="Demeter SS" /></div>
      <div style={{ position: 'absolute', left: '62%', top: 84 }}><IFS.MapPinDot size="s" status="error" type="text" counter="88%" /></div>
    </div>
  );
  const DECISIONS = [
    { id: 1, title: 'Northgate Cluster · 7 aging feeders replacement', badge: 'Explore', description: '7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising, flagged before failure, with an investment idea already drafted.', cpv: '$18.1M', vc: '1,345 V/$K', priority: 'critical' },
    { id: 2, title: 'EastZone C · Transformer Overload Risk', badge: 'Explore', description: '3 zones over safe capacity ahead of peak', cpv: '$12.4M', vc: '1,986 V/$K', priority: 'critical' },
    { id: 3, title: 'Ridgeline Substation · Protection Relay Fault', badge: 'Build', description: 'Relay protection upgrade serving West Corridor', cpv: '8.6M', vc: '2,092 V/$K', priority: 'critical' },
    { id: 4, title: 'Hera SS · Capacitor bank reactive support', badge: 'Plan', description: 'Voltage sagging across the South Loop at evening peak', cpv: '$7.3M', vc: '1,123 V/$K', priority: 'critical' },
    { id: 5, title: 'Apollo SS · Tx Bank 1 end-of-life replacement', badge: 'Explore', description: 'Lead transformer past expected life with a rising DGA trend', cpv: '$22.6M', vc: '4,876 V/$K', priority: 'critical' },
    { id: 6, title: 'Harbor feeders · Underground cable refurbishment', badge: 'Explore', description: '4 salt-exposed cable sections flagged ahead of storm season', cpv: '$9.8M', vc: '1,583 V/$K', priority: 'critical' },
  ];
  const metricsOf = d => [{ value: d.cpv, label: 'CPV' }, { value: d.vc, label: 'V/C' }];

  IFS_GALLERY.push({ name: 'HomeRowCard', figma: 'home-row-card-organism [patterns] (244:117301)', render: () => {
    const d = DECISIONS[0], e = DECISIONS[1];
    const box = { width: 1036 };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row label="Primary" top><div style={box}><HomeRowCard type="primary" rank={1} {...d} metrics={metricsOf(d)} media={<MiniMap />} onOpen={() => toast(`Opening ${d.title}`)} /></div></Row>
        <Row label="Primary hover" top><div style={box}><HomeRowCard type="primary" rank={1} {...d} metrics={metricsOf(d)} media={<MiniMap />} state="hover" /></div></Row>
        <Row label="Primary focus" top><div style={box}><HomeRowCard type="primary" rank={1} {...d} metrics={metricsOf(d)} media={<MiniMap />} state="focus" /></div></Row>
        <Row label="Primary loading" top><div style={box}><HomeRowCard type="primary" rank={1} metrics={metricsOf(d)} loading /></div></Row>
        <Row label="Secondary"><div style={box}><HomeRowCard rank={2} {...e} metrics={metricsOf(e)} onOpen={() => toast(`Opening ${e.title}`)} /></div></Row>
        <Row label="Secondary hover"><div style={box}><HomeRowCard rank={2} {...e} metrics={metricsOf(e)} state="hover" /></div></Row>
        <Row label="Secondary focus"><div style={box}><HomeRowCard rank={2} {...e} metrics={metricsOf(e)} state="focus" /></div></Row>
        <Row label="Secondary loading"><div style={box}><HomeRowCard rank={2} metrics={metricsOf(e)} loading /></div></Row>
        <Row label="Live alert"><div style={box}><HomeRowCard rank={3} {...e} liveAlert={{ type: 'storm', state: 'confirmed', label: 'Storm warning' }} metrics={metricsOf(e)} onOpen={() => {}} /></div></Row>
        <Row label="Collaboration"><div style={box}><HomeRowCard rank={4} {...e} collaboration={{ initials: 'AS', type: 'blue', size: 's' }} metrics={metricsOf(e)} onOpen={() => {}} /></div></Row>
        <Row label="No metrics"><div style={box}><HomeRowCard rank={5} {...e} onOpen={() => {}} /></div></Row>
      </div>
    );
  } });

  const PLAN_TREE = [
    { id: 'dc', label: 'DC Water Capital Improvement Plan', children: [{ id: 'dc-1', label: 'Water mains 2027' }, { id: 'dc-2', label: 'Treatment plant upgrades' }] },
    { id: 'wa', label: 'Whistler Americas', children: [
      { id: 'cot', label: 'Claude optimisation test' },
      { id: 'demo', label: 'Demo portfolio', children: [{ id: 'demo-1', label: 'Demo scenario A' }] },
      { id: 'el', label: 'Electrical', children: [{ id: 'el-d', label: 'Electrical Distribution' }, { id: 'el-t', label: 'Electrical Transmission' }] },
      { id: 'eg', label: 'Electrical Generation', children: [{ id: 'eg-1', label: 'Thermal & gas' }] },
    ] },
    { id: 'dist', label: 'Distribution', children: [{ id: 'dist-1', label: 'Urban feeders' }] },
  ];
  const PLAN_SECTIONS = [{ label: 'Ad hoc plans', action: { icon: 'system-plus', label: 'New ad hoc plan', onClick: () => toast('New ad hoc plan') },
    items: [{ id: 'ah1', label: 'All Transformer Investments' }, { id: 'ah2', label: 'Ridgeview Village — All Infrastructure' }, { id: 'ah3', label: 'Pluto Unit 4 Outage — 2026' }, { id: 'ah4', label: 'My investments' }] }];
  const findNode = (nodes, id) => { for (const n of nodes) { if (n.id === id) return n; const r = n.children && findNode(n.children, id); if (r) return r; } return null; };

  IFS_GALLERY.push({ name: 'SideNavTree', figma: 'sidebar-organism + Plan tree [patterns] (244:120655)', render: () => (
    <div style={{ display: 'flex', gap: 24, height: 640 }}>
      <SideNavTree title="Plan" tree={PLAN_TREE} sections={PLAN_SECTIONS} defaultValue="el" defaultExpanded={['wa', 'el']} />
      <SideNavTree title="Plan" tree={PLAN_TREE} sections={PLAN_SECTIONS} defaultValue="el-d" defaultExpanded={['wa', 'el']} />
      <SideNavTree title="Plan" tree={PLAN_TREE} defaultCollapsed />
    </div>
  ) });

  /* ───────────────────────── pattern screens ───────────────────────── */

  const PageTop = ({ eyebrow, title, description, action, aside, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: children ? 20 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          {eyebrow && <span className="t-heading-h3-uppercase" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)' }}>
            <IFS.Icon name="cooper-system-icon" variant="Insight" size={16} />{eyebrow}</span>}
          <h1 className="t-heading-h1-medium" style={{ margin: 0, color: 'var(--text-primary)' }}>{title}</h1>
          {description && <span className="t-body-m-medium" style={{ color: 'var(--text-secondary)' }}>{description}</span>}
        </div>
        {action}{aside}
      </div>
      {children}
    </div>
  );
  const Upper = ({ children, style }) => <span className="t-heading-h3-uppercase" style={{ color: 'var(--text-secondary)', ...style }}>{children}</span>;
  const Panel = ({ children, style }) => <div style={{ background: 'var(--surface-secondary-alpha)', borderRadius: 8, padding: 12, boxSizing: 'border-box', ...style }}>{children}</div>;
  const RightRail = ({ dot }) => (
    <div style={{ flex: 'none', width: 48, boxSizing: 'border-box', padding: 12, background: 'var(--surface-primary)', boxShadow: 'inset 1px 0 0 var(--border-base)', position: 'relative' }}>
      <IFS.IconButton icon="arrow-bar-left" label="Open panel" size="s" onClick={() => toast('Open side panel')} />
      {dot && <span aria-hidden="true" style={{ position: 'absolute', left: 27, top: 13, width: 6, height: 6, borderRadius: '50%', background: 'var(--background-system-danger)', boxShadow: '0 0 0 1.5px var(--surface-primary)' }} />}
    </div>
  );

  // ── Command (home) ──
  const CommandContent = ({ setStage }) => {
    const [tab, setTab] = useState('decisions');
    const [prio, setPrio] = useState('critical');
    const shown = DECISIONS.filter(d => d.priority === prio);
    const open = d => { toast(`Opening ${d.title} in ${d.badge}`); setStage(d.badge.toLowerCase()); };
    const tabs = [{ value: 'works', label: 'My works', count: 3 }, { value: 'decisions', label: 'Decisions', count: 6 }, { value: 'conversations', label: 'Conversations', count: 3 }, { value: 'following', label: 'Following', count: 3 }];
    const stat = (v, l, style) => <div style={{ position: 'absolute', textAlign: 'center', ...style }}><div className="t-body-l-medium">{v}</div><div className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>{l}</div></div>;
    return (
      <div style={{ display: 'flex', minHeight: '100%' }}>
        <div style={{ flex: 1, minWidth: 0, padding: '12px 12px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PageTop eyebrow="Cooper" title="Welcome back, Jeff." description="2.8M simulations completed while you were away. Here are the items that require your input and attention right now.">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
              <IFS.Tabs items={tabs} value={tab} onChange={setTab} />
              <IFS.SmartSearch placeholder="Ask anything about your work" suggestions={['Why is Northgate #1?', 'What changed since Friday?']} />
            </div>
          </PageTop>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 28 }}>
              <Upper>{tab === 'decisions' ? 'Decisions to review' : tabs.find(t => t.value === tab).label}</Upper>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <IFS.SegmentedControl size="s" value={prio} onChange={setPrio} options={[{ value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }, { value: 'critical', label: 'Critical' }]} />
                <span style={{ width: 1, height: 20, background: 'var(--border-base)' }} />
                <IFS.IconButton icon="system-filter-settings" type="tertiary" size="s" label="Display settings" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tab === 'decisions' && shown.length === 0 && <IFS.EmptyState cause="all-done" heading={`No ${prio}-priority decisions`} body="Nothing at this priority needs your input right now." />}
              {(tab === 'decisions' ? shown : DECISIONS.slice(3, 6)).map((d, i) => (
                <HomeRowCard key={d.id} type={i === 0 && tab === 'decisions' ? 'primary' : 'secondary'} rank={i + 1} title={d.title} badge={d.badge}
                  description={d.description} metrics={metricsOf(d)} media={i === 0 ? <MiniMap /> : undefined} onOpen={() => open(d)} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 'none', width: 380, padding: 12, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Panel style={{ position: 'relative', height: 268, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--border-base)' }}>
            <Upper>Cooper’s work results</Upper>
            <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 168, width: 160, height: 160, marginLeft: -80, borderRadius: '50%', boxShadow: 'inset 0 0 0 1px var(--border-medium)', background: 'radial-gradient(circle at 50% 30%, var(--background-elevation-1-tertiary), transparent 70%)' }} />
            {stat('66%', 'Automation', { left: 0, right: 0, top: 56 })}
            {stat('12', 'Portfolio changes', { left: 16, top: 102 })}
            {stat('12%', 'Risk reduction', { right: 16, top: 102 })}
            {stat('24', 'Days saved', { left: 8, top: 186 })}
            {stat('$120K', 'Budget saved', { right: 8, top: 186 })}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center' }}>
              <div className="t-display" style={{ fontSize: 24, lineHeight: '32px' }}>1 Year</div>
              <div className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>Time horizon</div>
            </div>
          </Panel>
          <Panel style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="t-body-l-medium">Milestone</span><span className="t-body-m-regular" style={{ color: 'var(--text-secondary)' }}>9d left</span></div>
            <IFS.ProgressBar value={8} label="Milestone progress" />
            <div className="t-body-m-regular" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Drafts</span><span>Re-submit</span><span>SG2 window</span><span>Gate</span></div>
            <IFS.Calendar defaultMonth={new Date(2026, 8, 1)} today={new Date(2026, 8, 8)} events={{ '2026-09-04': ['info'], '2026-09-09': ['danger'], '2026-09-10': ['info'], '2026-09-18': ['warning'], '2026-09-20': ['danger', 'warning', 'info'] }} />
            <IFS.Button type="tertiary" size="m" iconLeft="system-plus" onClick={() => toast('Add event')}>Add event</IFS.Button>
          </Panel>
        </div>
      </div>
    );
  };

  // ── Value (library) ──
  const d = s => new Date(`${s}T00:00`);
  const fmt = v => (v ? v.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');
  const FRAMEWORKS = [
    ['Q1 2026 Strategy Framework', 'green', 'Active', null, '2026-01-15', ['J. Carter', 'JC', 'orange']],
    ['Q2 2026 Strategy Framework', 'orange', 'Pending approval', '5/8', '2026-01-10', ['A. Singh', 'AS', 'blue']],
    ['Cost Optimization 2026', 'gray', 'Draft', 'Input', '2025-12-18', ['A. Singh', 'AS', 'blue']],
    ['2025 Strategy Framework v6', 'gray', 'Draft', 'Shape', '2025-12-05', ['A. Singh', 'AS', 'blue']],
    ['Decarbonization Review 2026', 'gray', 'Draft', 'Review', '2025-11-22', ['A. Singh', 'AS', 'blue']],
    ['2025 Strategy Framework v3', 'archive', 'Archived', null, '2025-10-02', ['M. Torres', 'MT', 'purple']],
    ['2025 Strategy Framework v2', 'archive', 'Archived', null, '2025-04-18', ['M. Torres', 'MT', 'purple']],
    ['2024 Strategy Framework v1', 'archive', 'Archived', null, '2024-11-10', ['M. Torres', 'MT', 'purple']],
  ].map(([name, type, label, extra, mod, by], i) => ({ id: `f${i}`, name, status: { type, label, extra }, modified: d(mod), by: { name: by[0], initials: by[1], type: by[2] } }));
  const VALUE_PAGES = { active: ['Active framework', 'The framework every investment is scored against'], sf: ['Strategy Framework', 'Published, archived, and draft strategy frameworks'],
    vf: ['Value Frameworks', 'Published, archived, and draft value frameworks'], vm: ['Value Models', 'Value models used across frameworks'], hp: ['Human Performance', 'Measures of workforce safety and performance'] };
  const valueSide = ({ narrow }) => <ValueSide key={`v${narrow}`} narrow={narrow} />;
  let valuePage = 'sf'; const valueListeners = new Set();
  const useValuePage = () => { const [p, setP] = useState(valuePage); React.useEffect(() => { valueListeners.add(setP); return () => valueListeners.delete(setP); }, []); return p; };
  const ValueSide = ({ narrow }) => {
    const p = useValuePage();
    return <IFS.SideNav title="Value" value={p} defaultCollapsed={narrow} onSelect={id => { valuePage = id; valueListeners.forEach(f => f(id)); }}
      items={[{ id: 'active', label: 'Active framework' }, { type: 'section', label: 'Library', items: [{ id: 'sf', label: 'Strategy Framework' }, { id: 'vf', label: 'Value Frameworks' }, { id: 'vm', label: 'Value Models' }] }, { id: 'hp', label: 'Human Performance' }]} />;
  };
  const ValueHeader = () => {
    const [title] = VALUE_PAGES[useValuePage()];
    return <IFS.PageHeader title={title} actions={<IFS.Button type="secondary" size="s" iconLeft="system-pencil-plus" onClick={() => toast('New framework')}>New</IFS.Button>} />;
  };
  const ValueContent = () => {
    const p = useValuePage();
    const [rows, setRows] = useState(FRAMEWORKS);
    const [title] = VALUE_PAGES[p];
    return (
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <IFS.DataTable key={p} variant="standard" toolbarOutside rows={rows} onRowsChange={setRows} defaultSort={{ key: 'modified', dir: 'desc' }}
          filterTabs={{ variant: 'tabs', items: [{ value: 'all', label: 'All' }, ...['Active', 'Pending approval', 'Archived', 'Draft'].map(s => ({ value: s, label: s === 'Pending approval' ? 'Pending Approval' : s, match: r => r.status.label === s }))] }}
          search={{ placeholder: `Ask anything about ${title.toLowerCase()}`, suggestions: ['Which frameworks are waiting on my approval?'] }}
          onOpen={r => toast(`Opening ${r.name}`)}
          columns={[
            { key: 'name', title: title.replace(/s$/, ''), name: true, width: '1fr', filter: false },
            { key: 'status', title: 'Status', width: 276, type: 'custom', filterValue: r => r.status.label,
              render: r => <><IFS.Indicator type={r.status.type}>{r.status.label}</IFS.Indicator>{r.status.extra && <IFS.Badge color="white" size="m">{r.status.extra}</IFS.Badge>}</> },
            { key: 'modified', title: 'Last modified', width: 276, kind: 'date', type: 'custom', render: r => fmt(r.modified) },
            { key: 'by', title: 'Created by', width: 276, type: 'user', filterValue: r => r.by.name },
          ]} />
      </div>
    );
  };

  // ── Explore (globe) ──
  const ExploreContent = () => (
    <div style={{ position: 'relative', display: 'flex', height: '100%', minHeight: 720 }}>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', background: 'var(--background-page)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '58%', width: 1100, height: 1100, marginLeft: -560, marginTop: -540, borderRadius: '50%',
          background: 'radial-gradient(circle at 42% 30%, var(--background-elevation-1-tertiary), var(--background-elevation-1-secondary) 45%, var(--surface-secondary-alpha) 69%, transparent 71%)' }} />
        <div style={{ position: 'absolute', left: 536, top: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ position: 'relative' }}><IFS.MapPinDot size="l" status="success" counter="456" label="Whistler Company: 456 assets" onClick={() => toast('Whistler Company')} />
            <span style={{ position: 'absolute', right: -12, top: -10 }}><IFS.Badge color="red" size="s">3</IFS.Badge></span></span>
          <span className="t-body-l-medium">Whistler Company</span>
        </div>
        <div style={{ position: 'absolute', left: 716, top: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <IFS.MapPinDot size="l" status="success" counter="470" label="DC Water capital: 470 assets" onClick={() => toast('DC Water capital')} />
          <span className="t-body-l-medium">DC Water capital</span>
        </div>
        <div style={{ position: 'absolute', left: 12, top: 12 }}>
          <IFS.MapToolbar><IFS.MapToolCluster label="Map views">
            <IFS.MapToolButton icon="map-compass" label="Reset bearing" /><IFS.MapToolButton icon="asset-structure" label="Asset structure" /><IFS.MapToolButton icon="system-book" label="Legend" />
          </IFS.MapToolCluster></IFS.MapToolbar>
        </div>
        <div style={{ position: 'absolute', left: 12, bottom: 12 }}><IFS.MapToolbar onAction={id => toast(`Map: ${id}`)} /></div>
        <div style={{ position: 'absolute', right: 12, bottom: 12 }}><IFS.FtaButton onClick={() => toast('Cooper')} /></div>
      </div>
      <RightRail />
    </div>
  );

  // ── Build (idea pad) ──
  const IDEAS = [
    ['Northgate Substation Transformer Replacement', true, 'orange', 'Under review', '0/4', 'FY29–FY43', '2026-01-12', 'View reply'],
    ['Ridgeview Village Backup Tie to Feeder 5', true, 'blue', 'New', null, 'FY30–FY50', '2026-07-23'],
    ['Cedar Park Feeder Hardening Program', true, 'gray', 'Deferred', null, 'FY29–FY39', '2026-04-29', 'Provide asset health'],
    ['Southern Feeder Replacement — Circuit 17C', false, 'purple', 'Shaping', null, 'FY34–FY41', '2026-03-11'],
    ['Elmwood Feeder 2 Underground Cable Renewal', false, 'purple', 'Shaping', null, 'FY34–FY36', '2026-02-09'],
    ['West Corridor Protection Relay Upgrade', false, 'purple', 'Shaping', null, 'FY30–FY32', '2026-05-18', 'View reply'],
    ['Battery Storage at Northgate to Defer Feeder Upgrade', false, 'purple', 'Shaping', null, 'FY30–FY32', '2026-07-02', 'Provide asset condition'],
    ['Recloser Swap-outs on Northgate Leftovers (F2, F7)', false, 'purple', 'Shaping', null, 'FY30–FY32', '2026-06-15'],
    ['Maple Ridge Feeder Tie Reconfiguration', false, 'purple', 'Shaping', null, 'FY30–FY32', '2026-06-15'],
    ['Harbor Road Pole Line Rebuild', false, 'blue', 'New', null, 'FY33–FY38', '2026-06-01'],
    ['Birchwood Lateral Undergrounding Study', false, 'purple', 'Shaping', null, 'FY31–FY35', '2026-05-20'],
  ].map(([name, program, type, label, count, horizon, mod, collab], i) => ({ id: `i${i}`, name, program, pinned: i === 0, icon: program ? 'chat-folder' : undefined,
    status: { type, label, count }, horizon, modified: d(mod), collab: collab && { label: collab, avatar: { initials: 'UN', type: 'black' }, kind: collab.startsWith('View') ? 'Replied' : 'Input required', who: 'U. N.' } }));
  const BuildContent = () => {
    const [rows, setRows] = useState(IDEAS);
    const [page, setPage] = useState('ideas');
    return (
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div><IFS.Tabs size="l" items={[{ value: 'ideas', label: 'Idea Pad' }, { value: 'inv', label: 'Investments' }]} value={page} onChange={setPage} /></div>
        {page === 'ideas'
          ? <IFS.DataTable variant="ranked" rows={rows} onRowsChange={setRows} onOpen={r => toast(`Opening ${r.name}`)}
              filterTabs={{ variant: 'segmented', items: [{ value: 'all', label: 'All ideas' }, { value: 'project', label: 'Project ideas', match: r => !r.program }, { value: 'program', label: 'Program ideas', match: r => r.program }] }}
              search={{ placeholder: 'Ask anything about idea pad', suggestions: ['Which ideas need my input?'] }}
              columns={[
                { key: 'name', title: 'Ideas', name: true, width: '1fr', truncate: 'end', filter: false },
                { key: 'status', title: 'Status', width: 200, type: 'custom', filterValue: r => r.status.label,
                  render: r => <><IFS.Indicator type={r.status.type}>{r.status.label}</IFS.Indicator>{r.status.count && <IFS.Badge color="white" size="m">{r.status.count}</IFS.Badge>}</> },
                { key: 'horizon', title: 'Horizon', width: 140, filter: false },
                { key: 'modified', title: 'Modified', width: 140, kind: 'date', type: 'custom', render: r => fmt(r.modified) },
                { key: 'collab', title: 'Collaboration', width: 248, type: 'custom', filter: false, render: r => r.collab && <IFS.CollaborationBadge {...r.collab} onOpen={() => toast(r.collab.label)} /> },
              ]} />
          : <IFS.EmptyState size="full" cause="first-run" heading="No investments yet" body="Promote an idea from the Idea Pad to start an investment." primaryAction={{ label: 'Go to Idea Pad', onClick: () => setPage('ideas') }} />}
      </div>
    );
  };

  // ── Plan (home) ──
  const CYCLES = [['FY22', 'Archived', '100%', 'FY22-FY26'], ['FY23', 'Archived', '100%', 'FY23-FY27'], ['FY24', 'Archived', '93%', 'FY24-FY28'], ['FY25', 'Archived', '78%', 'FY25-FY29'], ['FY26', 'Active', '56%', 'FY25-FY29'], ['FY27', 'Next', 'Time to Plan', 'FY27-FY31']];
  let planNode = 'el'; const planListeners = new Set();
  const usePlanNode = () => { const [p, setP] = useState(planNode); React.useEffect(() => { planListeners.add(setP); return () => planListeners.delete(setP); }, []); return p; };
  const PlanSide = ({ narrow }) => {
    const p = usePlanNode();
    return <SideNavTree title="Plan" tree={PLAN_TREE} sections={PLAN_SECTIONS} value={p} defaultExpanded={['wa', 'el']} defaultCollapsed={narrow}
      onSelect={id => { planNode = id; planListeners.forEach(f => f(id)); }} />;
  };
  const PlanContent = () => {
    const p = usePlanNode();
    const node = findNode(PLAN_TREE, p) || (PLAN_SECTIONS[0].items.find(i => i.id === p)) || { label: 'Electrical' };
    const [cycle, setCycle] = useState(5);
    const c = CYCLES[cycle];
    const tone = s => (s === 'Active' ? 'var(--text-success)' : s === 'Next' ? 'var(--text-warning)' : 'var(--text-tertiary)');
    return (
      <div style={{ display: 'flex', minHeight: '100%' }}>
        <div style={{ flex: 1, minWidth: 0, padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <h1 className="t-heading-h1-medium" style={{ margin: 0 }}>{node.label}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <span className="t-body-m-medium" style={{ color: 'var(--text-secondary)' }}>Enterprise-wide electrical asset class, covering distribution and transmission capital plans across all divisions</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flex: 'none' }}><span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>Owner</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IFS.Avatar size="s" initials="UN" /><span className="t-body-m-medium">Emily Williams</span></span></span>
            </div>
          </div>
          <Panel style={{ display: 'flex', flexDirection: 'column', gap: 16, boxShadow: 'inset 0 0 0 1px var(--border-base)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Upper>Planning cycles</Upper>
              <span style={{ display: 'inline-flex', gap: 4 }}>
                <IFS.IconButton icon="arrow-chevron-left" type="secondary" size="s" label="Previous cycle" disabled={cycle === 0} onClick={() => setCycle(cycle - 1)} />
                <IFS.IconButton icon="arrow-chevron-right" type="secondary" size="s" label="Next cycle" disabled={cycle === CYCLES.length - 1} onClick={() => setCycle(cycle + 1)} />
              </span></div>
            <div role="listbox" aria-label="Planning cycles" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 8 }}>
              {CYCLES.slice(1).map((cy, j) => { const i = j + 1; const sel = i === cycle; return (
                <button key={cy[0]} type="button" role="option" aria-selected={sel} onClick={() => setCycle(i)}
                  style={{ textAlign: 'left', border: 0, cursor: 'pointer', borderRadius: 4, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text-primary)',
                    background: sel ? 'var(--surface-tertiary-alpha)' : 'var(--surface-secondary-alpha)', boxShadow: `inset 0 0 0 1px var(${sel ? '--border-medium' : '--border-base'})` }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between' }}><span className="t-body-m-regular" style={{ color: 'var(--text-secondary)' }}>{cy[0]}</span><span className="t-caption-semibold-upper" style={{ color: tone(cy[1]) }}>{cy[1]}</span></span>
                  <span className="t-heading-h1-medium">{cy[2]}</span>
                  <span className="t-caption-regular-upper" style={{ color: 'var(--text-tertiary)' }}>{cy[3]}</span>
                </button>); })}
            </div>
          </Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="t-heading-h2-medium">{c[0]} cycle</span><IFS.IconButton icon="system-table" type="secondary" size="m" label="Show as table" /></div>
          <IFS.StatCardsRow cards={[{ title: 'Total value', value: '7.36M' }, { title: 'BCR', value: '7.65' }, { title: 'Total investments', value: '39,498' }, { title: 'Horizon', value: c[3].replace(/FY(\d\d)-FY(\d\d)/, 'FY$1-$2') }]} />
          <Panel style={{ position: 'relative', height: 420, padding: 0, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--border-base)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14 }}><Upper>Affected area</Upper><IFS.IconButton icon="cooper-system-icon" type="tertiary" shape="circle" size="s" label="Ask Cooper about this area" /></div>
            <div style={{ position: 'absolute', left: 4, right: 4, top: 52, bottom: 4, borderRadius: 4, overflow: 'hidden', background: 'radial-gradient(ellipse at 50% 60%, var(--background-elevation-1-tertiary), var(--surface-secondary-alpha) 75%)' }}>
              <span className="t-body-m-medium" style={{ position: 'absolute', left: 120, top: 8, color: 'var(--text-tertiary)' }}>Ridgeview Village</span>
              <div style={{ position: 'absolute', left: 160, top: 140 }}><IFS.MapPinPole symbol="pin" number="Recloser R-1" /></div>
              <div style={{ position: 'absolute', left: 520, top: 100 }}><IFS.MapPinPole symbol="pin" number="Demeter SS" /></div>
              {[['6', 250, 200], ['5', 330, 230], ['4', 400, 260], ['3', 440, 260], ['2', 520, 260], ['1', 600, 255]].map(([n, x, y]) => (
                <div key={n} style={{ position: 'absolute', left: x, top: y }}><IFS.MapPinPole symbol="dot" number={n} pin={false} /></div>))}
              <div style={{ position: 'absolute', left: 560, top: 256 }}><IFS.MapPinDot size="s" status="error" counter="88%" /></div>
              <div style={{ position: 'absolute', right: 12, top: 12 }}><IFS.IconButton icon="map" type="secondary" size="s" label="Open in Explore" /></div>
            </div>
          </Panel>
        </div>
        <RightRail dot />
      </div>
    );
  };

  const screens = () => ({
    command: { content: ({ setStage }) => <CommandContent setStage={setStage} />, bottom: <IFS.BottomSheet prompts={['Why is Northgate #1?', 'Brief me']} /> },
    value: { sideNav: valueSide, header: <ValueHeader />, content: <ValueContent />, bottom: <IFS.BottomSheet prompts={['Walk me through this framework', 'What hasn\'t been updated in a while?']} /> },
    explore: { header: <ExploreHeader search={{ suggestions: ['Where are the oldest feeders?'] }} onComments={() => toast('Comments')} onCollaborators={() => toast('3 of 5 collaborators online')} />, content: <ExploreContent /> },
    build: { header: <IFS.PageHeader title="Build" actions={<IFS.Button type="secondary" size="s" iconLeft="system-pencil-plus" onClick={() => toast('New idea')}>New</IFS.Button>} />, content: <BuildContent />, bottom: <IFS.BottomSheet prompts={['Brief me', 'What needs my input first?']} /> },
    plan: { sideNav: ({ narrow }) => <PlanSide key={`p${narrow}`} narrow={narrow} />, content: <PlanContent />,
      bottom: <IFS.BottomSheet type="value" cooperContext documents={{ label: '16 Documents', icon: 'system-star-favourite', onClick: () => toast('Cooper’s context: 16 documents') }} onUpload={() => toast('Upload')} prompts={['What needs my attention?', 'Are we on track against strategy?']} /> },
    results: { content: <IFS.EmptyState size="full" cause="first-run" heading="No results to review yet" body="Results appear here once a plan is approved and its investments start delivering." /> },
  });
  const NAV = { hasNotifications: true, user: USER };
  const Screen = ({ w = 1440, h = 900, children }) => <div style={{ position: 'relative', width: w, height: h, overflow: 'hidden', background: 'var(--background-page)', transform: 'translateZ(0)', transition: 'width .2s' }}>{children}</div>;
  const StageScreen = ({ start, w, h }) => <Screen w={w} h={h}><StagedAppShell stages={STAGES} defaultValue={start} screens={screens()} navBar={NAV} height="100%" /></Screen>;

  IFS_GALLERY.push({ name: 'Pattern: Nav bar — Command', figma: 'Decisions — Default + Dev Notes [patterns] (244:119950)', render: () => <StageScreen start="command" /> });
  IFS_GALLERY.push({ name: 'Pattern: Nav bar — Value', figma: 'Library - Strategy Framework - Expanded [patterns] (244:121895)', render: () => <StageScreen start="value" /> });
  IFS_GALLERY.push({ name: 'Pattern: Nav bar — Explore', figma: 'Explore - Globe view - Pin logic tooltip [patterns] (244:121989)', render: () => <StageScreen start="explore" h={810} /> });
  IFS_GALLERY.push({ name: 'Pattern: Nav bar — Build', figma: 'Default — Idea Pad [patterns] (244:120167)', render: () => <StageScreen start="build" /> });
  IFS_GALLERY.push({ name: 'Pattern: Nav bar — Plan', figma: 'Plan home [patterns] (244:120467)', render: () => <StageScreen start="plan" /> });
  IFS_GALLERY.push({ name: 'Pattern: Nav bar — responsive', figma: 'nav bar [patterns] (244:119940)', render: () => {
    const [w, setW] = useState(1024);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row label="Viewport"><IFS.SegmentedControl size="s" value={String(w)} onChange={v => setW(+v)} options={[{ value: '1440', label: '1440 · full' }, { value: '1024', label: '1024 · sidebar rail' }, { value: '600', label: '600 · hamburger' }]} /></Row>
        <StageScreen start="plan" w={w} />
      </div>
    );
  } });
}
