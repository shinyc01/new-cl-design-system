import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { StatCardsRow, PreviewWidgetCard, WidgetCard, ResizeHandle, DropIndicator, WidgetViewChangePosition, WidgetFrame, WidgetBoard, WidgetsDrawer } = IFS;
  const Row = ({ label, children, top }) => <div className="g-row" style={top ? { alignItems: 'flex-start' } : null}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const { useState, useRef } = React;

  /* ---------------- shared data ---------------- */
  const usdAxis = v => (v ? `$${+(v / 1e6).toFixed(1)}M` : '$0');
  const STATS = [
    { title: 'Benefit-cost ratio', value: '2.40x', description: 'Benefit returned per $1 spent' },
    { title: 'Estimated cost', value: '$4.2M', description: 'Expected delivery cost' },
    { title: 'Investment value', value: '$10.1M', description: 'Total expected value' },
    { title: 'Baseline risk', value: '$12.6M', description: 'Risk before intervention' },
  ];
  const STATS_ROW = [
    { title: 'Portfolio value', trend: '4.8 %', value: '$2.24B', description: 'Proposed' },
    { title: 'Investments re-scored', value: '1,621', description: '357 gained • 519 lost • 745 unchanged' },
    { title: 'Finding tier changes', value: '876', description: '52 gained • 31 lost • 12 major shift' },
    { title: 'Governance flags', value: '1', description: 'Executing investment affected' },
  ];
  const Text = ({ children }) => <p className="t-body-l-regular" style={{ margin: 0, padding: '2px 2px 4px' }}>{children}</p>;
  const KeyValues = ({ rows, note }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map(([k, v]) => (
        <div key={k} className="t-body-l-regular" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '6px 0' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{k}</span><span style={{ textAlign: 'right' }}>{v}</span>
        </div>
      ))}
      {note && <div style={{ borderTop: '1px solid var(--border-base)', marginTop: 6, paddingTop: 10 }}>
        <div className="t-body-l-regular" style={{ color: 'var(--text-secondary)' }}>{note[0]}</div>
        <div className="t-body-l-regular">{note[1]}</div>
      </div>}
    </div>
  );
  const MapView = () => (
    <IFS.CanvasBackground style={{ height: 236, borderRadius: 4 }} defaultView={{ x: 0, y: 0, zoom: 1 }}>
      {[[90, 120, 'error'], [230, 150, 'neutral'], [330, 70, 'error'], [380, 160, 'warning']].map(([x, y, s], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y }}><IFS.MapPin status={s} label={`Asset ${i + 1}`} /></div>
      ))}
    </IFS.CanvasBackground>
  );
  const forecast = [{ label: 'FY25', value: 0.25e6 }, { label: 'FY26', value: 1.65e6 }, { label: 'FY27', value: 1.45e6 }, { label: 'FY28', value: 2.2e6 }, { label: 'FY29', value: 1.5e6 }];
  const invValue = [{ label: 'Electrical Distribution Reliability', value: 3.2e6 }, { label: 'Electrical Delivery Capacity', value: 0.9e6 },
    { label: 'Compliance Risk', value: 0.4e6 }, { label: 'Financial Benefits-OPEX', value: 0.9e6 }, { label: 'Project Execution Risk', value: 3.1e6 }, { label: 'Total Investment Cost', value: 1.9e6 }];

  /* ---------------- components ---------------- */
  IFS_GALLERY.push({ name: 'StatCardsRow', figma: 'stat-cards-row [patterns] (12:104002)', render: () => <>
    <Row label="rows 1" top><div style={{ width: 988 }}><StatCardsRow cards={STATS_ROW} /></div></Row>
    <Row label="rows 2" top><div style={{ width: 796 }}><StatCardsRow rows={2} cards={STATS_ROW} /></div></Row>
  </> });

  IFS_GALLERY.push({ name: 'PreviewWidgetCard', figma: 'preview-widget-card-organism [patterns] (331:492728)', render: () => <>
    <Row label="type" top>{['strategic-objectives', 'framework-coverage', 'portfolio', 'investment-value'].map(t => <div key={t} style={{ width: 344 }}><PreviewWidgetCard type={t} /></div>)}</Row>
  </> });

  const CARDS = [
    { preview: 'strategic-objectives', title: 'Yearly Investment Forecast', description: 'Displays the projected investment spend across fiscal years.', previewTitle: 'Yearly investment forecast' },
    { preview: 'framework-coverage', title: 'Draft Forecast by Fiscal Year', description: 'Shows draft forecast values by year before the investment is finalized.', previewTitle: 'Draft forecast by fiscal year' },
    { preview: 'portfolio', title: 'Investment Value by Measure', description: "Breaks down the investment's value across key value measures.", previewTitle: 'Investment value by measure' },
    { preview: 'investment-value', title: 'Capex Burn by Quarter', description: 'Tracks capital spend against plan for each quarter.', previewTitle: 'Capex burn by quarter' },
  ];
  IFS_GALLERY.push({ name: 'WidgetCard', figma: 'widget-card-organism [patterns] (331:492745)', render: () => <>
    {CARDS.map((c, i) => (
      <Row key={i} label={`Number=${i + 1}`} top>
        <div style={{ width: 368 }}><WidgetCard {...c} onAdd={() => IFS.toast({ title: `"${c.title}" widget added` })} /></div>
        <div style={{ width: 368, padding: 4 }}><WidgetCard {...c} state="drag" /></div>
      </Row>
    ))}
  </> });

  IFS_GALLERY.push({ name: 'ResizeHandle', figma: 'resize-handle [patterns] (413:44028)', render: () => <>
    <Row label="arrows">
      {['both', 'right', 'left'].map(a => <div key={a} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><ResizeHandle arrows={a} /><span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>{a}</span></div>)}
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'DropIndicator', figma: 'drop-indicator-atom [patterns] (413:43575)', render: () => <>
    <Row label="horizontal"><DropIndicator style={{ width: 560 }} /></Row>
    <Row label="vertical"><DropIndicator orientation="vertical" style={{ height: 140 }} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'WidgetViewChangePosition', figma: 'widget-view-change-position [patterns] (331:509936)', render: () => <>
    <Row label="default"><WidgetViewChangePosition title="Yearly forecast" /></Row>
  </> });

  IFS_GALLERY.push({ name: 'WidgetFrame', figma: 'content-card-organism widget [patterns] (413:45297)', render: () => <>
    <Row label="state" top>
      {[undefined, 'hover', 'drag', 'ghost'].map(s => (
        <div key={s || 'default'} style={{ width: 360 }}>
          <WidgetFrame title="Reliability" state={s} menu={[{ label: 'Remove', icon: 'system-trash-delete', onClick: () => {} }]}>
            <Text>Reliability gained 5 points of value share since edition 10, led by Ridgeview Tie ($12.7M) and Feeder 12 hardening ($3.1M).</Text>
          </WidgetFrame>
        </div>
      ))}
    </Row>
    <Row label="chart (bare)" top><div style={{ width: 544 }}>
      <WidgetFrame title="Yearly forecast" bare menu={[{ label: 'Remove', icon: 'system-trash-delete', onClick: () => {} }]}>
        <IFS.ColumnChart data={forecast} valueLabel="Forecast" format={usdAxis} height={200} />
      </WidgetFrame>
    </div></Row>
  </> });

  /* ---------------- report data (rules section) ---------------- */
  const execData = [{ label: 'Reliability', value: 35 }, { label: 'Financial', value: 35 }, { label: 'Environment', value: 35 }, { label: 'Social', value: 35 }, { label: 'Governance', value: 38 }];
  const REPORT_WIDGETS = {
    summary: { kind: 'text', title: 'Summary', render: () => <Text>Portfolio value rose 4.8% this edition. Reliability leads the gain; one executing investment needs a governance review.</Text> },
    metrics: { kind: 'metrics', title: 'Metrics', render: () => <StatCardsRow cards={STATS_ROW.slice(1)} /> },
    reliability: { kind: 'text', title: 'Reliability', render: () => <Text>Reliability gained 5 points of value share since edition 10, led by Ridgeview Tie ($12.7M) and Feeder 12 hardening ($3.1M).</Text> },
    peer: { kind: 'text', title: 'Peer position', render: () => <Text>Top quartile on reliability value per dollar among 31 opted-in utilities.</Text> },
    risk: { kind: 'text', title: 'Risk note', render: () => <Text>Retained risk is down $0.4M. One West District deferral still needs an owner comment.</Text> },
    exec: { kind: 'chart', title: 'Execution by objective', bare: true, render: () => <IFS.BarChart data={execData} valueLabel="Executing %" format={v => `${v}%`} height={200} /> },
    spendText: { kind: 'text', title: 'Spend outlook', render: () => <Text>Spend is on the $28M envelope; two programs moved to FY28.</Text> },
    spendChart: { kind: 'chart', title: 'Spend by objective · FY27', bare: true, render: () => <IFS.ColumnChart data={forecast} valueLabel="Spend" format={usdAxis} height={200} /> },
    drivers: { kind: 'text', title: 'What drove value', render: () => <Text>Two reliability programs and the Feeder 12 hardening account for 70% of the gain.</Text> },
    projects: { kind: 'wide', title: 'Projects list', bare: false, render: () => (
      <IFS.Table columns={[{ key: 'name', title: 'Project', width: '1fr' }, { key: 'value', title: 'Value', align: 'right', width: 120 }, { key: 'status', title: 'Status', width: 140 }]}
        rows={[{ id: 1, name: 'Ridgeview Tie', value: '$12.7M', status: 'Executing' }, { id: 2, name: 'Feeder 12 hardening', value: '$3.1M', status: 'Executing' }, { id: 3, name: 'West District deferral', value: '$0.4M', status: 'Deferred' }]} />
    ) },
  };
  const REPORT_LAYOUT = { sections: [
    { id: 'summary', title: 'Summary', rows: [{ id: 's1', items: ['summary'], widths: null }, { id: 's2', items: ['metrics'], widths: null }] },
    { id: 'performance', title: 'Performance', rows: [{ id: 'p1', items: ['reliability', 'peer'], widths: null }, { id: 'p2', items: ['risk'], widths: null }, { id: 'p3', items: ['exec'], widths: null }] },
    { id: 'spend', title: 'Spend', rows: [{ id: 'sp1', items: ['spendText', 'drivers'], widths: null }, { id: 'sp2', items: ['spendChart'], widths: null }] },
    { id: 'investments', title: 'Investments', rows: [{ id: 'i1', items: ['projects'], widths: null }] },
  ] };

  IFS_GALLERY.push({ name: 'WidgetBoard', figma: 'report section · Performance [patterns] (413:45297)', render: () => (
    <div style={{ width: 1128 }}>
      <WidgetBoard defaultValue={{ sections: [REPORT_LAYOUT.sections[1]] }} widgets={REPORT_WIDGETS} />
    </div>
  ) });

  IFS_GALLERY.push({ name: 'WidgetsDrawer', figma: 'drawer [patterns] (331:493265)', render: () => {
    const [open, setOpen] = useState(true);
    return <div style={{ position: 'relative', height: 860 }}>
      {!open && <IFS.Button size="s" iconLeft="chart" onClick={() => setOpen(true)}>Widgets</IFS.Button>}
      <WidgetsDrawer open={open} onOpenChange={setOpen} items={CARDS.map((c, i) => ({ id: `w${i}`, ...c }))}
        onAdd={it => IFS.toast({ title: `"${it.title}" widget added` })} style={{ height: 860 }} />
    </div>;
  } });

  /* ---------------- pattern screens ---------------- */
  const STAGES = [{ value: 'command', label: 'Command' }, { value: 'value', label: 'Value' }, { value: 'explore', label: 'Explore' },
    { value: 'build', label: 'Build' }, { value: 'plan', label: 'Plan' }, { value: 'results', label: 'Results' }];
  const Screen = ({ children }) => <div style={{ position: 'relative', width: 1440, height: 900, maxWidth: '100%', overflow: 'hidden', border: '1px solid var(--border-base)' }}>{children}</div>;
  const ConfidencePanel = () => (
    <IFS.Panel title="System confidence" defaultExpanded>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="t-body-l-medium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>Approval readiness
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IFS.ProgressRing value={35} size={16} />35%</span></div>
        <IFS.ReadinessStatus type="done" right="Passed">Investment readiness</IFS.ReadinessStatus>
        <IFS.ReadinessStatus type="in-progress" indicators={[{ type: 'error', label: '1 error' }]}>Path forward</IFS.ReadinessStatus>
        <IFS.ReadinessStatus type="in-progress" indicators={[{ type: 'error', label: '1 error' }]}>Assumption consistency</IFS.ReadinessStatus>
        <IFS.ReadinessStatus type="in-progress" indicators={[{ type: 'error', label: '1/2' }, { type: 'warning', label: '1/3' }]}>Review blockers</IFS.ReadinessStatus>
      </div>
    </IFS.Panel>
  );

  // Widget catalog for the Widgets drawer (each becomes a widget on the board).
  const CATALOG = [
    { id: 'yearlyInv', kind: 'chart', bare: true, ...CARDS[0], render: () => <IFS.StackedColumnChart format={usdAxis} height={220}
      data={forecast.map(f => ({ label: f.label, capital: f.value * 0.6, opex: f.value * 0.4 }))} series={[{ key: 'capital', label: 'Capital' }, { key: 'opex', label: 'OPEX' }]} /> },
    { id: 'draftFy', kind: 'chart', bare: true, ...CARDS[1], render: () => <IFS.DonutChart height={220} centerValue="$7.1M" centerLabel="draft total" valueLabel="Draft forecast"
      data={forecast.map((f, i) => ({ label: f.label, value: f.value, color: ['muted-purple', 'teal', 'steel-blue', 'deep-green', 'rose'][i] }))} /> },
    { id: 'valueByMeasure', kind: 'wide', ...CARDS[2], render: () => (
      <IFS.Table columns={[{ key: 'm', title: 'Measure', width: '1fr' }, { key: 'you', title: 'Your company', align: 'right', width: 140 }, { key: 'peer', title: 'Peer avg', align: 'right', width: 120 }, { key: 'best', title: 'Best in class', align: 'right', width: 140 }]}
        rows={[{ id: 1, m: 'Reliability', you: '$3.2M', peer: '$2.4M', best: '$4.1M' }, { id: 2, m: 'Capacity', you: '$0.9M', peer: '$1.1M', best: '$1.6M' }, { id: 3, m: 'Compliance', you: '$0.4M', peer: '$0.5M', best: '$0.7M' }]} />) },
    { id: 'capex', kind: 'chart', bare: true, ...CARDS[3], title: 'Capex Burn by Quarter', render: () => <IFS.ColumnChart format={usdAxis} height={220} valueLabel="Capex"
      data={[{ label: 'Q1', value: 0.8e6 }, { label: 'Q2', value: 1.2e6 }, { label: 'Q3', value: 1.1e6 }, { label: 'Q4', value: 1.6e6 }]} /> },
  ];

  IFS_GALLERY.push({ name: 'Pattern: Widget builder — Investment overview', figma: 'Investment overview / Widgets drawer opened [patterns] (331:493265)', render: () => {
    const base = {
      details: { kind: 'text', title: 'Investment details', render: () => <KeyValues rows={[['Name', 'Southern Feeder Replacement — Circuit 14B'], ['Code', 'INV-2025-0842'], ['Type', 'Capital Replacement'], ['Planning portfolio', 'FY26–27 Distribution Capital · Northern Region']]}
        note={['Problem statement', '7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising, flagged before failure, with an investment idea already drafted.']} /> },
      assets: { kind: 'chart', title: 'Affected assets & area', render: () => <MapView /> },
      forecast: { kind: 'chart', title: 'Yearly forecast', bare: true, render: () => <IFS.ColumnChart data={forecast} valueLabel="Forecast" format={usdAxis} height={220} /> },
      value: { kind: 'chart', title: 'Investment value', bare: true, render: () => <IFS.BarChart data={invValue} valueLabel="Value" format={usdAxis} labelWidth={180} height={220} /> },
    };
    const [widgets, setWidgets] = useState(base);
    const [layout, setLayout] = useState({ sections: [{ id: 'page', rows: [{ id: 'r1', items: ['details', 'assets'], widths: [3, 3] }, { id: 'r2', items: ['forecast', 'value'], widths: null }] }] });
    const [drawer, setDrawer] = useState(false);
    const [catalog, setCatalog] = useState(CATALOG);
    const [ext, setExt] = useState(null);
    const seq = useRef(0);
    const E = IFS.widgetLayoutEngine(widgets);
    const define = it => setWidgets(w => ({ ...w, [it.id]: { kind: it.kind, title: it.title, description: it.description, preview: it.preview, bare: it.bare, render: it.render } }));
    const add = it => {
      const prev = { layout, catalog };
      define(it);
      const next = E.move(layout, it.id, { type: 'new', sec: 'page', before: null });
      setLayout(next); setCatalog(c => c.filter(x => x.id !== it.id));
      IFS.toast({ title: `"${it.title}" widget added`, secondaryAction: { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => { setLayout(prev.layout); setCatalog(prev.catalog); } } });
    };
    const grab = (it, e) => {
      const sx = e.clientX, sy = e.clientY;
      const mv = ev => {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 4) return;
        cleanup(); define(it); setDrawer(false);
        setExt({ id: it.id, kind: it.kind, title: it.title, pointer: { x: ev.clientX, y: ev.clientY }, w: 368, h: 200, seq: ++seq.current });
      };
      const cleanup = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', cleanup); };
      window.addEventListener('pointermove', mv); window.addEventListener('pointerup', cleanup);
    };
    const onExternalDrop = (id, placed) => {
      setExt(null);
      const it = catalog.find(x => x.id === id);
      if (placed) {
        const prevCatalog = catalog;
        setCatalog(c => c.filter(x => x.id !== id));
        IFS.toast({ title: `"${it.title}" widget added`, secondaryAction: { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => { setLayout(l => E.remove(l, id)); setCatalog(prevCatalog); } } });
      } else setDrawer(true);
    };
    return (
      <Screen>
        <IFS.AppShell height={900}
          navBar={<IFS.NavBar stages={STAGES} defaultValue="build" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
          sideNav={<IFS.SideNav title="Investment" defaultCollapsed items={[{ id: 'overview', label: 'Investment overview' }]} defaultValue="overview" />}
          header={<IFS.PageHeader title="Southern Feeder Replacement" id="INV-2025-0842" onBack={() => {}} onTitleMenu={() => {}}
            status={<IFS.Indicator type="purple" size="xs">Refining</IFS.Indicator>}
            views={<div style={{ width: 360 }}><IFS.Stepper current={2} steps={['Shape', 'Review', 'Refine', 'Approve'].map(label => ({ label }))} /></div>}
            actions={<>
              <IFS.Button type="secondary" size="s" iconLeft="users-group">3/5</IFS.Button>
              <IFS.IconButton icon="system-comment" label="Comments" type="secondary" size="s" />
              <IFS.Button type="secondary" size="s">Dismiss</IFS.Button>
              <IFS.Button type="primary" size="s">Send for approval</IFS.Button>
            </>} />}
          bottom={<IFS.BottomSheet type="value" documents={{ label: '16 Documents', icon: 'system-file' }} onUpload={() => {}}
            prompts={['Generate Annualized outcome risk by risk type chart', 'Compare to best practice']} />}>
          <div style={{ display: 'flex', minHeight: '100%' }}>
            <div style={{ flex: 1, minWidth: 0, padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <h2 className="t-heading-h1-medium" style={{ margin: 0, color: 'var(--text-primary)' }}>Investment overview</h2>
                  <div className="t-body-m-regular" style={{ color: 'var(--text-secondary)', marginTop: 4 }}>High-level investment summary, key metrics, and current progress</div>
                </div>
                <IFS.Button type="secondary" size="m" iconLeft="chart" onClick={() => setDrawer(true)}>Widgets</IFS.Button>
              </div>
              <StatCardsRow cards={STATS} />
              <WidgetBoard value={layout} onChange={setLayout} widgets={widgets}
                moveMessage={w => `"${w.title}" widget moved`} external={ext} onExternalDrop={onExternalDrop} />
            </div>
            <ConfidencePanel />
          </div>
        </IFS.AppShell>
        {drawer && <>
          <IFS.Overlay type="base" inline onClick={() => setDrawer(false)} />
          <div style={{ position: 'absolute', top: 11, right: 0, bottom: 0 }}>
            <WidgetsDrawer open onOpenChange={setDrawer} items={catalog} onAdd={add} onGrab={grab} style={{ height: '100%' }} />
          </div>
        </>}
      </Screen>
    );
  } });

  IFS_GALLERY.push({ name: 'Pattern: Report widgets — resize, drag & drop rules', figma: 'Page / 1 · Drag a widget into a row of 2 [patterns] (413:45297)', render: () => {
    const [layout, setLayout] = useState(REPORT_LAYOUT);
    const [sel, setSel] = useState('performance');
    return (
      <Screen>
        <IFS.AppShell height={900}
          navBar={<IFS.NavBar stages={STAGES} defaultValue="results" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
          sideNav={<IFS.SideNav title="Sections" items={REPORT_LAYOUT.sections.map(s => ({ id: s.id, label: s.title }))} value={sel}
            onSelect={id => { setSel(id); const el = document.querySelector(`[data-wb-section="${id}"]`); el && el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} />}
          header={<IFS.PageHeader title="Weekly portfolio outcomes" id="Edition 11" onBack={() => {}} onTitleMenu={() => {}}
            status={<IFS.Indicator type="gray" size="xs">Draft</IFS.Indicator>}
            actions={<>
              <IFS.Button type="secondary" size="s" iconLeft="users-group">3/5</IFS.Button>
              <IFS.Button type="secondary" size="s">Set up rules</IFS.Button>
              <IFS.Button type="secondary" size="s">Export</IFS.Button>
              <IFS.Button type="primary" size="s">Publish</IFS.Button>
            </>} />}
          bottom={<IFS.BottomSheet type="value" inProgress coverage={80} documents={{ label: '3 Documents', icon: 'system-file' }} onUpload={() => {}}
            prompts={['What needs my review?', "What's due this week?"]} />}>
          <div style={{ padding: 12 }}>
            <WidgetBoard value={layout} onChange={setLayout} widgets={REPORT_WIDGETS} />
          </div>
        </IFS.AppShell>
      </Screen>
    );
  } });
}
