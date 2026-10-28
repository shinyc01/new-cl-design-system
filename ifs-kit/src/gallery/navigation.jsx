import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { NavItem, NavSubtitle, SideNav, Tab, Tabs, Crumb, Breadcrumb, Step, Stepper, Pager, CanvasColumn, CanvasHeader,
    NavBarItem, NavBar, PageHeader, AppShell } = IFS;
  const Row = ({ label, children }) => <div className="g-row"><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Box = ({ w = 192, children }) => <div style={{ width: w }}>{children}</div>;

  // Value stage sidebar, as in sidebar-pattern Page=Value
  const valueNav = [
    { id: 'active', label: 'Active Framework' },
    { type: 'section', label: 'Library', items: [
      { id: 'strategy', label: 'Strategy Frameworks' },
      { id: 'value', label: 'Value Frameworks' },
      { id: 'models', label: 'Value Models' },
    ] },
    { id: 'human', label: 'Human Performance' },
  ];
  // Small stand-ins for other families' pieces used inside the page header
  const Status = ({ children = 'Active' }) => (
    <span className="t-label-m-medium" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--icon-success)' }} />{children}
    </span>
  );

  IFS_GALLERY.push({ name: 'NavItem', figma: 'navigation-panel-atom (1544:2681)', render: () => <>
    {['parent', 'child'].map(t => (
      <Row key={t} label={t}>
        <Box><NavItem type={t}>Default</NavItem></Box>
        <Box><NavItem type={t} state="hover" action={t === 'child' ? { label: 'Edit' } : undefined}>Hover</NavItem></Box>
        <Box><NavItem type={t} active>Active</NavItem></Box>
        <Box><NavItem type={t} state="focus" active>Focus</NavItem></Box>
        <Box><NavItem type={t} disabled>Disabled</NavItem></Box>
      </Row>
    ))}
    <Row label="submenu">
      <Box><NavItem type="submenu">Submenu</NavItem></Box>
      <Box><NavItem type="submenu" state="hover">Submenu</NavItem></Box>
      <Box><NavItem type="submenu" expanded>Submenu</NavItem></Box>
    </Row>
    <Row label="subtitle"><Box w={216}><NavSubtitle action={{ label: 'Add alternative' }}>Alternatives</NavSubtitle></Box></Row>
  </> });

  IFS_GALLERY.push({ name: 'SideNav', figma: 'navigation-panel-organism (1545:2808)', render: () => {
    const [sel, setSel] = React.useState('active');
    return <div className="g-row" style={{ alignItems: 'flex-start' }}>
      <div style={{ height: 420 }}><SideNav title="Value" items={valueNav} value={sel} onSelect={setSel} /></div>
      <div style={{ height: 420 }}><SideNav title="Bar name" defaultValue="a" items={[
        { id: 'a', label: 'Value' },
        { type: 'submenu', id: 'sub', label: 'Submenu', defaultOpen: true, items: [{ id: 'b', label: 'Value', action: { label: 'Edit' } }, { id: 'c', label: 'Value' }] },
        { type: 'section', label: 'Value', action: { label: 'Add' }, items: [{ id: 'd', label: 'Value' }, { id: 'e', label: 'Value', disabled: true }] },
        { id: 'f', label: 'Value', cooper: true },
      ]} /></div>
      <div style={{ height: 420 }}><SideNav title="Value" items={valueNav} defaultCollapsed /></div>
      <span className="g-label t-body-m-regular">selected: {sel}</span>
    </div>;
  } });

  IFS_GALLERY.push({ name: 'Tabs', figma: 'tab (1440:5039), tab-organism (3412:32038)', render: () => {
    const [v, setV] = React.useState('all');
    return <>
      {['m', 'l'].map(z => (
        <Row key={z} label={`tab ${z}`}>
          <Tab size={z} count={7}>Text</Tab>
          <Tab size={z} count={7} state="hover">Text</Tab>
          <Tab size={z} count={7} selected>Text</Tab>
          <Tab size={z} count={7} state="focus">Text</Tab>
          <Tab size={z} count={0} disabled>Text</Tab>
        </Row>
      ))}
      <Row label="organism m">
        <Tabs aria-label="Filter" value={v} onChange={setV} items={[
          { value: 'all', label: 'All', count: 8 }, { value: 'active', label: 'Active', count: 1 },
          { value: 'draft', label: 'Draft', count: 5 }, { value: 'archived', label: 'Archived', count: 2, disabled: true }]} />
        <span className="g-label t-body-m-regular">value: {v}</span>
      </Row>
      <Row label="organism l">
        <Tabs size="l" aria-label="Views" items={[{ value: 'o', label: 'Overview' }, { value: 'd', label: 'Details' }, { value: 'h', label: 'History' }]} />
      </Row>
    </>;
  } });

  IFS_GALLERY.push({ name: 'Breadcrumb', figma: 'breadcrumb-atom (3492:9413), breadcrumb-organism (67:4698)', render: () => <>
    {['previous', 'current', 'next'].map(t => (
      <Row key={t} label={t}>
        {[undefined, 'hover', 'focus'].map(s => <Crumb key={s || 'd'} type={t} icon={t === 'previous'} state={s}>{`{${t}}`}</Crumb>)}
        <Crumb type={t} icon={t === 'previous'} disabled>{`{${t}}`}</Crumb>
      </Row>
    ))}
    <Row label="organism"><Breadcrumb items={[{ label: '{previous}' }, { label: '{current}' }]} /></Row>
    <Row label="3 levels"><Breadcrumb items={[{ label: 'Portfolio' }, { label: 'Frameworks' }, { label: 'Q1 2026 Strategy' }]} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'Stepper', figma: 'stepper-molecule (1219:169725), stepper-organism (3029:22750)', render: () => {
    const [cur, setCur] = React.useState(0);
    return <>
      {['completed', 'in-progress', 'not-started'].map(s => (
        <Row key={s} label={s}>
          <Box w={128}><Step status={s}>Text</Step></Box>
          <Box w={128}><Step status={s} state="hover" tooltip="text">Text</Step></Box>
          <Box w={128}><Step status={s} active>Text</Step></Box>
        </Row>
      ))}
      <Row label="organism"><Box w={264}><Stepper current={0} steps={[{ label: 'Text' }, { label: 'Text' }, { label: 'Text' }]} /></Box></Row>
      <Row label="with button">
        <Box w={360}><Stepper current={cur} steps={['Input', 'Shape', 'Review', 'Approve'].map(l => ({ label: l, tooltip: `${l} step` }))} /></Box>
        <IFS.Button size="s" type="secondary" onClick={() => setCur(c => (c + 1) % 5)}>Next step</IFS.Button>
      </Row>
    </>;
  } });

  IFS_GALLERY.push({ name: 'Pager', figma: 'pagination-organism (3497:9660)', render: () => {
    const [p, setP] = React.useState(1);
    return <>
      <Row label="default"><Box w={356}><Pager page={p} onChange={setP} total={3} percent={Math.round((p - 1) / 3 * 100)} onShowAll={() => {}} /></Box></Row>
      <Row label="complete"><Box w={356}><Pager defaultPage={3} total={3} percent={100} complete /></Box></Row>
    </>;
  } });

  IFS_GALLERY.push({ name: 'CanvasHeader', figma: 'canvas-header (1440:5321), canvas-container-atom (1440:5305)', render: () => <>
    <Row label="column"><Box w={240}><CanvasColumn>Enterprise Goals</CanvasColumn></Box></Row>
    <div style={{ width: 1200 }}><CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} /></div>
  </> });

  IFS_GALLERY.push({ name: 'NavBar', figma: 'global-header (69:3736), nav-bar-page-atom (69:4012)', render: () => <>
    <Row label="page atom">
      <NavBarItem>Default</NavBarItem><NavBarItem state="hover">Hover</NavBarItem><NavBarItem state="pressed">Pressed</NavBarItem>
      <NavBarItem active>Active</NavBarItem><NavBarItem state="focus">Focus</NavBarItem><NavBarItem disabled>Disabled</NavBarItem>
    </Row>
    <div style={{ width: 1200 }}><NavBar defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} /></div>
  </> });

  IFS_GALLERY.push({ name: 'PageHeader', figma: 'page-header (1588:1971)', render: () => <>
    <div style={{ width: 1200 }}>
      <PageHeader title="Q1 2026 Strategy Framework" onTitleMenu={() => {}} status={<Status />}
        views={<span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>[views slot]</span>}
        actions={<IFS.Button type="ghost" size="s">1 Recommendation</IFS.Button>} />
    </div>
    <div style={{ width: 1200, marginTop: 12 }}>
      <PageHeader title="Copy of Q1 2026 Enterprise Strategy" id="1/2" onBack={() => {}} status={<Status>Draft</Status>}
        actions={<IFS.Button type="primary" size="s">Review</IFS.Button>} />
    </div>
  </> });

  IFS_GALLERY.push({ name: 'AppShell', figma: 'not a Figma component — layout of "Map - Overview - Default" (4484:116532)', render: () => {
    const [stage, setStage] = React.useState('value');
    const [sel, setSel] = React.useState('active');
    return (
      <div style={{ width: 1440, maxWidth: '100%', border: '1px solid var(--border-base)' }}>
        <AppShell height={810}
          navBar={<NavBar value={stage} onChange={setStage} hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
          sideNav={<SideNav title="Value" items={valueNav} value={sel} onSelect={setSel} />}
          header={<>
            <PageHeader title="Q1 2026 Strategy Framework" onTitleMenu={() => {}} status={<Status />}
              actions={<IFS.Button type="ghost" size="s">1 Recommendation</IFS.Button>} />
            <CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} />
          </>}>
          <div style={{ height: 1600, padding: 24, background: 'var(--background-canvas-primary)' }} className="t-body-m-regular">
            Content scrolls here — stage: {stage}, section: {sel}
          </div>
        </AppShell>
      </div>
    );
  } });
}
