import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { MapPinDot, MapPinDefect, MapPinFlow, MapPinPole, BarChartItem, VerticalBarChartItem, DocumentRow, DocumentsPopover } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={style}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const mapBg = { padding: 24, borderRadius: 8, background: 'var(--background-canvas-primary)', display: 'flex', flexDirection: 'column', gap: 4 };

  /* ---------------- components ---------------- */
  IFS_GALLERY.push({ name: 'MapPinDot', figma: 'map-pin-dot (d2686af3) [patterns] (12:107153)', render: () => <div style={mapBg}>
    {['error', 'warning', 'success'].map(st => <React.Fragment key={st}>
      {[['out-of-hover', 'out of hover'], [undefined, 'default'], ['highlight', 'higlight=yes'], ['selected', 'selected']].map(([s, l]) => (
        (s === 'highlight' && st === 'success') ? null :
        <Row key={l} label={`${st} · ${l}`} style={{ gap: 28, minHeight: 56 }}>
          {['l', 'm'].map(z => <MapPinDot key={z} size={z} status={st} highlight={s === 'highlight'} state={s === 'highlight' ? undefined : s} />)}
          <MapPinDot size="m" type="icon" status={st} highlight={s === 'highlight'} state={s === 'highlight' ? undefined : s} />
          {['s', 'xs'].map(z => <MapPinDot key={z} size={z} status={st} highlight={s === 'highlight' && z === 's'} state={s === 'highlight' ? undefined : s} />)}
        </Row>
      ))}
    </React.Fragment>)}
    <Row label="interactive"><MapPinDot counter="12" label="12 faults — click to select" /><MapPinDot size="s" status="warning" label="Warning" /></Row>
  </div> });

  IFS_GALLERY.push({ name: 'MapPinPole', figma: 'map-pin-pole "Pole" (b548a660) [patterns] (12:107120)', render: () => <div style={mapBg}>
    {['default', 'selected'].map(s => (
      <Row key={s} label={`state=${s}`} style={{ gap: 40, alignItems: 'flex-end' }}>
        <MapPinPole state={s} symbol="pin" pinIcon="asset type-substation" />
        <MapPinPole state={s} symbol="defect" defect={{ type: 'cyclone', state: 'confirmed' }} />
        <MapPinPole state={s} symbol="dot" />
        <MapPinPole state={s} symbol="hierarchy-pin" hierarchy="group" />
      </Row>
    ))}
    <Row label="pin status" style={{ gap: 40, alignItems: 'flex-end' }}>
      {['neutral', 'error', 'warning', 'evaluated'].map(p => <MapPinPole key={p} pinStatus={p} number={p} />)}
    </Row>
    <Row label="hierarchy" style={{ gap: 40, alignItems: 'flex-end' }}>
      {['group', 'segment', 'structure'].map(h => <MapPinPole key={h} symbol="hierarchy-pin" hierarchy={h} number={h} />)}
    </Row>
    <Row label="pin=false (route numbers)" style={{ gap: 24 }}>{[1, 2, 3, 4, 5, 6].map(n => <MapPinPole key={n} pin={false} number={n} defaultSelected={n === 4} />)}</Row>
  </div> });

  IFS_GALLERY.push({ name: 'MapPinDefect', figma: 'map-pin-defect (91cf9e42) [patterns] (12:106855)', render: () => <div style={mapBg}>
    {['confirmed', 'unconfirmed', 'monitoring'].map(s => (
      <Row key={s} label={s} style={{ gap: 24 }}>{['cyclone', 'flood', 'heat', 'storm'].map(t => <MapPinDefect key={t} type={t} state={s} />)}</Row>
    ))}
  </div> });

  IFS_GALLERY.push({ name: 'MapPinFlow', figma: 'Electric Flow Direction Indicator (a6c2010c) [patterns] (12:107306)', render: () => <div style={mapBg}>
    <Row label="type" style={{ gap: 24 }}><MapPinFlow /><MapPinFlow type="error" /></Row>
    <Row label="rotate" style={{ gap: 24 }}>{[0, 90, 169, 180, -63].map(r => <MapPinFlow key={r} type="error" rotate={r} />)}</Row>
  </div> });

  IFS_GALLERY.push({ name: 'BarChartItem', figma: 'bar-chart-item (44fcce06) [patterns] (12:107849)', render: () => <>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => <Row key={c} label={`color=${c}`}><BarChartItem color={c} style={{ width: 238 }} /></Row>)}
    <Row label="number=false"><BarChartItem color={4} number={false} style={{ width: 238 }} /></Row>
    <Row label="fill override"><BarChartItem fill="var(--data-viz-muted-purple-data-4)" style={{ width: 238 }}>$1.2M</BarChartItem></Row>
  </> });

  IFS_GALLERY.push({ name: 'VerticalBarChartItem', figma: 'vertical-bar-chart-item (c06b1d19) [patterns] (12:107877)', render: () => {
    const [act, setAct] = React.useState(false);
    return <Row label="default-1 · default-2 · active · click" style={{ gap: 32, alignItems: 'flex-end' }}>
      <VerticalBarChartItem segments={[{ value: 147, color: 7 }, { value: 20, color: 8 }, { value: 25, color: 8 }]} />
      <VerticalBarChartItem segments={[{ value: 20, color: 8 }, { value: 117, color: 8 }, { value: 28, color: 7 }, { value: 25, color: 8 }]} />
      <VerticalBarChartItem state="active" segments={[{ value: 32, color: 3 }, { value: 21, color: 2 }, { value: 20, color: 5 }, { value: 117, color: 4 }]} />
      <VerticalBarChartItem active={act} onActiveChange={setAct} label="FY27" value={1.6} max={2.5}
        segments={[{ value: 1, fill: 'var(--data-viz-muted-purple-data-4)' }]} />
    </Row>;
  } });

  /* ---------------- pattern parts ---------------- */
  const SAMPLE = [
    ['2025 Board Planning Present.pdf', 'Jan 15, 2026'], ['Product Roadmap Update.pptx', 'Jan 15, 2026'], ['Annual Financial Report.pdf', 'Jan 15, 2026'],
    ['Quarterly Marketing Review.docx', 'Dec 20, 2025'], ['Customer Feedback Summary.xlsx', 'Oct 18, 2025'], ['Employee Orientation Guide.doc', 'Jun 5, 2025'],
    ['New Hire Orientation Guide.doc', 'Jun 5, 2025'], ['Vendor Contract Renewal.pdf', 'May 2, 2025'], ['Load Forecast Assumptions.xlsx', 'Apr 11, 2025'],
    ['Asset Register Extract.csv', 'Mar 3, 2025'], ['Outage Response Notes.txt', 'Feb 14, 2025'], ['Feeder Inspection Log.pdf', 'Jan 30, 2025'],
    ['Pole Replacement Plan.docx', 'Jan 9, 2025'], ['Storm Hardening Memo.pdf', 'Dec 2, 2024'], ['Capital Plan FY26.xlsx', 'Nov 20, 2024'],
    ['Regulatory Filing Draft.docx', 'Oct 1, 2024'],
  ].map(([name, date], i) => ({ id: `s${i}`, name, date, size: 240000 }));
  const LONG = [
    ['Northgate Substation Transformer Replacement Business Case.pdf', 'Jan 15, 2026'], ['Feeder Hardening Cost Benefit Analysis Comparison.xlsx', 'Jan 15, 2026'],
    ['Board Approval Memo — Northgate Replacement.docx', 'Jan 15, 2026'], ['Customer Outage Impact Assessment Ridgeview Village.pptx', 'Jan 15, 2026'],
    ['Distribution Reliability Improvement Plan 2026-2030.docx', 'Dec 20, 2025'], ['Asset Health Inspection Report Circuits 14B and 17C.pdf', 'Oct 18, 2025'],
    ['Vegetation Management Program 2026 Final.pdf', 'Jun 5, 2025'],
  ].map(([name, date], i) => ({ id: `l${i}`, name, date }));
  const noop = () => {};

  IFS_GALLERY.push({ name: 'DocumentRow', figma: 'file-card rows in the documents popover [patterns] (168:433527)', render: () => <div style={{ width: 284, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Row label="default"><div style={{ width: 284 }}><DocumentRow doc={SAMPLE[0]} onOpen={noop} /></div></Row>
    <Row label="hover (editable: more)"><div style={{ width: 284 }}><DocumentRow doc={SAMPLE[3]} state="hover" onOpen={noop} /></div></Row>
    <Row label="menu open"><div style={{ width: 284 }}><DocumentRow doc={SAMPLE[3]} state="menu" onOpen={noop} /></div></Row>
    <Row label="hover (read-only)"><div style={{ width: 284 }}><DocumentRow doc={LONG[0]} editable={false} state="hover" onOpen={noop} /></div></Row>
    <Row label="long name"><div style={{ width: 284 }}><DocumentRow doc={LONG[1]} onOpen={noop} /></div></Row>
    <Row label="upload failed"><div style={{ width: 284 }}><DocumentRow doc={{ ...SAMPLE[1], name: 'Investment ideas.pdf', date: 'Sep 23, 2026', status: 'error' }} /></div></Row>
    <Row label="uploading"><div style={{ width: 284 }}><DocumentRow doc={{ ...SAMPLE[1], status: 'uploading' }} /></div></Row>
  </div> });

  IFS_GALLERY.push({ name: 'DocumentsPopover', figma: 'popover-organism with file-card rows [patterns] (168:426540)', render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {[[1, '1 document'], [7, '7 — height adapts'], [8, '8 — max 360 + scroll'], [10, '10 — search appears']].map(([n, l]) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>{l}</span>
          <DocumentsPopover documents={SAMPLE.slice(0, n)} onOpen={noop} onClose={noop} /></div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>no results</span>
        <DocumentsPopover documents={SAMPLE} defaultQuery="Strategy" onClose={noop} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>long names (middle truncation)</span>
        <DocumentsPopover documents={LONG} onOpen={noop} onClose={noop} /></div>
    </div>
  ) });

  /* ---------------- pattern screens ---------------- */
  const shell = { position: 'relative', width: 1440, height: 900, display: 'grid', gridTemplateRows: '48px auto 1fr 40px', overflow: 'hidden',
    background: 'var(--background-canvas-primary)', border: '1px solid var(--border-base)', boxSizing: 'content-box' };
  const evidenceBtn = <IFS.IconButton shape="circle" type="tertiary" size="s" icon="cooper-evidence-icon" label="Evidence" />;

  // Investment overview content (the record the documents belong to). Map card uses the new pins.
  function AffectedAssets() {
    const S = 0.47; // the Figma map draws its pins at ~47 %
    const at = (x, y, node, k) => <div key={k} style={{ position: 'absolute', left: x, top: y, transform: `scale(${S})`, transformOrigin: '0 0' }}>{node}</div>;
    const route = '88,128 136,159 187,173 232,190 252,191 308,190 360,189 319,118';
    return (
      <div style={{ position: 'relative', width: '100%', height: 236, overflow: 'hidden', borderRadius: 4, background: 'var(--surface-secondary-alpha)' }}>
        <svg width="646" height="236" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <path d="M20 -16 L84 78 L87 145" fill="none" stroke="var(--border-strong)" strokeWidth=".5" strokeDasharray="2.6 1.7" />
          <polyline points={route} fill="none" stroke="var(--element-map-pin-fill-error)" strokeOpacity=".35" strokeWidth="3.7" />
          <polyline points={route} fill="none" stroke="var(--element-map-pin-fill-error)" strokeWidth=".5" strokeDasharray="2.6 1.7" />
        </svg>
        {[[-3, -22], [80, -21], [230, -13], [83, 74]].map(([x, y], i) => at(x, y, <MapPinDot size="xs" state="out-of-hover" label="Fault" />, `o${i}`))}
        {[[135, 157], [186, 171], [252, 189], [306, 188], [358, 187]].map(([x, y], i) => at(x, y, <MapPinDot size="xs" label="Fault" />, `d${i}`))}
        {at(230, 188, <MapPinDot size="xs" state="selected" label="Fault" />, 'sel')}
        {at(314, 116, <MapPinDot size="s" label="Fault" />, 's1')}{at(84, 142, <MapPinDot size="s" label="Fault" />, 's2')}
        {[[155, 159, 169], [275, 187, 180], [336, 143, -63]].map(([x, y, r], i) => at(x, y, <MapPinFlow type="error" rotate={r} />, `f${i}`))}
        {[[129, 145, 6], [354, 175, 1], [299, 179, 2], [246, 178, 3], [180, 161, 5]].map(([x, y, n]) => at(x, y, <MapPinPole pin={false} number={n} />, `p${n}`))}
        {at(224, 174, <MapPinPole pin={false} number={4} defaultSelected />, 'p4')}
        {at(306, 85, <MapPinPole number="Demeter SS" pinIcon="asset type-substation" />, 'dem')}
        {at(74, 110, <MapPinPole number="Recloser R-1" pinIcon="asset type-switcher" />, 'rec')}
        {at(62, 8, <MapPinPole symbol="defect" number="Ridgeview Village" defect={{ type: 'cyclone', state: 'confirmed' }} />, 'rv')}
        <div style={{ position: 'absolute', left: 326, top: 184, transform: `scale(${S})`, transformOrigin: '0 0' }}><IFS.Badge color="red" size="s">88%</IFS.Badge></div>
        <div style={{ position: 'absolute', right: 8, top: 8 }}><IFS.IconButton type="tertiary" size="s" icon="map" label="Open map" /></div>
      </div>
    );
  }
  function YearlyForecast() {
    const data = [['FY25', 0.42], ['FY26', 1.7], ['FY27', 1.45], ['FY28', 2.25], ['FY29', 1.5]];
    const [sel, setSel] = React.useState(null);
    return (
      <div style={{ width: '100%', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '48px 1fr', gridTemplateRows: '200px 20px', gap: '4px 0', padding: '8px 10px 0' }}>
        <div className="t-body-m-regular" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          {['$2.5M', '$2M', '$1.5M', '$1M', '$0.5M', '$0'].map(t => <span key={t}>{t}</span>)}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {data.map(([l, v], i) => <VerticalBarChartItem key={l} label={`${l}: $${v}M`} value={v} max={2.5} width={113} height={200}
            active={sel === i} onActiveChange={a => setSel(a ? i : null)} segments={[{ value: 1, fill: 'var(--data-viz-muted-purple-data-4)' }]} />)}
        </div>
        <span />
        <div className="t-body-m-regular" style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-secondary)' }}>{data.map(([l]) => <span key={l}>{l}</span>)}</div>
      </div>
    );
  }
  function InvestmentValue() {
    const rows = [['Electrical Distribution Reliability', -0.36], ['Electrical Delivery Capacity', -0.1], ['Compliance Risk', 0.05], ['Financial Benefits-OPEX', 0.11], ['Project Execution Risk', 0.36], ['Total Investment Cost', 0.21]];
    return (
      <div style={{ width: '100%', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '180px 1fr', rowGap: 10, padding: '16px 10px 8px', alignItems: 'center' }}>
        {rows.map(([l, v], i) => <React.Fragment key={l}>
          <span className="t-body-m-regular" style={{ color: i === rows.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{l}</span>
          <div style={{ position: 'relative', height: 16, borderLeft: '1px solid var(--border-base)', borderRight: '1px solid var(--border-base)' }}>
            <span style={{ position: 'absolute', left: '50%', top: -6, bottom: -6, borderLeft: '1px dashed var(--text-primary)' }} />
            <BarChartItem color={v < 0 ? 1 : 3} number={false} style={{ position: 'absolute', height: 16, top: 0, width: `${Math.abs(v) * 100}%`, left: v < 0 ? `${50 + v * 100}%` : '50%' }} />
          </div>
        </React.Fragment>)}
      </div>
    );
  }
  function InvestmentDetails() {
    const kv = [['Name', 'Southern Feeder Replacement — Circuit 14B'], ['Code', 'INV-2026-0418'], ['Type', 'Capital Replacement'], ['Planning portfolio', 'FY26–27 Distribution Capital · Northern Region']];
    return (
      <div className="t-body-l-regular" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', padding: '0 10px 10px' }}>
        {kv.map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span style={{ color: 'var(--text-secondary)' }}>{k}</span><span>{v}</span></div>)}
        <div style={{ borderTop: '1px solid var(--border-base)', marginTop: 6, paddingTop: 12 }}>
          <div style={{ color: 'var(--text-secondary)' }}>Problem statement</div>
          <div style={{ marginTop: 6 }}>7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising, flagged before failure, with an investment idea already drafted.</div>
        </div>
      </div>
    );
  }
  function InvestmentOverview() {
    // Figma: content-card-organism with Top (header) + Bottom slots; the kit ContentCard always draws its title block, so DataVizCard
    // (same surface, data-viz-header-molecule header) stands in. See guide/patterns/documents.md › Consolidated.
    const card = (title, body) => <IFS.DataVizCard title={title} header={{ draggable: false, slot: evidenceBtn }}>{body}</IFS.DataVizCard>;
    return (
      <div style={{ padding: '12px 12px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div><div className="t-heading-h1-medium">Investment overview</div>
            <div className="t-body-l-regular" style={{ color: 'var(--text-secondary)', marginTop: 8 }}>High-level investment summary, key metrics, and current progress</div></div>
          <IFS.Button type="secondary" iconLeft="chart">Widgets</IFS.Button>
        </div>
        {(() => {
          const cards = [{ title: 'Benefit-cost ratio', value: '2.5x', description: 'Benefit returned per $1 spent' }, { title: 'Estimated cost', value: '$4.2M', description: 'Expected delivery cost' },
            { title: 'Investment value', value: '$23k', description: 'Total expected value' }, { title: 'Baseline risk', value: '$12.6M', description: 'Risk before intervention' }];
          // stat-cards-row (IFS.StatCardsRow, built by the widget-builder pattern); falls back to a row of StatCards.
          return IFS.StatCardsRow ? <IFS.StatCardsRow cards={cards} />
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>{cards.map(c => <IFS.StatCard key={c.title} {...c} />)}</div>;
        })()}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {card('Investment details', <InvestmentDetails />)}
          {card('Affected assets & area', <AffectedAssets />)}
          {card('Yearly forecast', <YearlyForecast />)}
          {card('Investment value', <InvestmentValue />)}
        </div>
      </div>
    );
  }

  // Demo controls (outside the screen): sample files to drag in, failure simulation, record stage.
  const FAKE = [
    { name: 'Investment ideas.pdf', size: 820000 }, { name: 'Northgate Feeder Photos 2026.pdf', size: 3100000 }, { name: 'Substation Drone Survey Footage.mp4', size: 90000000 },
    { name: 'Capital Portfolio Planning Deck.pptx', size: 2400000 }, { name: 'Asset Condition Field Data.xlsx', size: 610000 }, { name: 'Board Approval Memo South.pdf', size: 400000 },
    { name: 'Quarterly Review.zip', size: 1200000 }, { name: 'Ridgeview LiDAR Scan.pdf', size: 61000000 },
  ];
  function DemoBar({ c, extra }) {
    const chip = (f) => (
      <span key={f.name} {...c.dragSource(f)} title="Drag onto the screen" className="t-body-m-regular"
        style={{ padding: '4px 8px', borderRadius: 4, cursor: 'grab', boxShadow: 'inset 0 0 0 1px var(--border-base)', color: 'var(--text-secondary)' }}>{f.name}</span>
    );
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 12, maxWidth: 1440 }}>
        <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>Demo — drag a file onto the screen:</span>
        {FAKE.slice(0, 2).map(chip)}
        <span {...c.dragSource(FAKE.slice(1, 6))} className="t-body-m-regular" style={{ padding: '4px 8px', borderRadius: 4, cursor: 'grab', boxShadow: 'inset 0 0 0 1px var(--border-base)', color: 'var(--text-secondary)' }}>5 files</span>
        <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)', marginLeft: 8 }}>or add:</span>
        <IFS.Button size="s" type="tertiary" onClick={() => c.addFiles([FAKE[0]])}>Valid file</IFS.Button>
        <IFS.Button size="s" type="tertiary" onClick={() => c.addFiles([FAKE[6]])}>Unsupported (.zip)</IFS.Button>
        <IFS.Button size="s" type="tertiary" onClick={() => c.addFiles([FAKE[7]])}>Too large</IFS.Button>
        <IFS.Button size="s" type="tertiary" onClick={() => c.addFiles(FAKE.slice(1, 8))}>7 files, 3 rejected</IFS.Button>
        <IFS.Checkbox checked={c.failNext} onChange={v => c.setFailNext(typeof v === 'boolean' ? v : !c.failNext)}>Next upload fails (network)</IFS.Checkbox>
        {extra}
      </div>
    );
  }

  function InvestmentScreen({ initial, editable = true, required = false, label }) {
    const c = IFS.useDocuments({ defaultDocuments: initial, editable, required });
    return <>
      <DemoBar c={c} />
      <div style={shell} aria-label={label}>
        <IFS.NavBar defaultValue="build" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />
        <div style={{ position: 'relative' }}>
          <IFS.PageHeader title="Southern Feeder Replacem…" id="INV-2025-0842" onBack={() => {}} onTitleMenu={() => {}}
            status={<IFS.Indicator type="purple" size="xs">Refining</IFS.Indicator>}
            actions={<>
              <span style={{ display: 'flex', gap: 4 }}><IFS.Button type="tertiary" size="s" iconLeft="users-group">3/5</IFS.Button><IFS.CommentButton /></span>
              <span style={{ display: 'flex', gap: 8 }}><IFS.Button type="secondary" size="s">Dismiss</IFS.Button><IFS.Button type="primary" size="s">Send for approval</IFS.Button></span>
            </>} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 344 }}>
            <IFS.Stepper steps={[{ label: 'Shape' }, { label: 'Review' }, { label: 'Refine' }, { label: 'Approve' }]} current={2} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 48px', minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}><IFS.ArrowButton label="Open navigation" /></div>
          <IFS.DocumentsDropArea controller={c} style={{ overflow: 'auto', minHeight: 0 }}><InvestmentOverview /></IFS.DocumentsDropArea>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}><IFS.IconButton type="tertiary" size="s" icon="arrow-bar-left" label="Open panel" /></div>
        </div>
        <IFS.BottomSheet type="value" style={{ position: 'relative' }} left={<IFS.DocumentsContext controller={c} popoverOffset={48} />}
          prompts={['Generate Annualized outcome risk by risk type chart', 'Compare to best practice']} />
        <IFS.DocumentsFeedback controller={c} />
      </div>
    </>;
  }

  // Active value framework (read-only list) — "Map - Overview - Documents …" frames.
  function FrameworkScreen({ initial, editable = false, required = false, draft = false, label }) {
    const c = IFS.useDocuments({ defaultDocuments: initial, editable, required });
    const nav = [{ id: 'active', label: 'Active Framework' }, { type: 'section', label: 'Library', items: [
      { id: 'sf', label: 'Strategy Frameworks' }, { id: 'vf', label: 'Value Frameworks' }, { id: 'vm', label: 'Value Models' }] }, { id: 'hp', label: 'Human Performance' }];
    const cols = draft ? ['Input', 'Enterprise Goals'] : ['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output'];
    const nodes = [['enterprise-goal', 'Enterprise Goals', 5], ['value-framework', 'Value Framework v12'], ['strategic-objective', 'Strategic Objectives', 5], ['value-model', 'Value Models', 7], ['measure', 'Measures', 29]];
    return <>
      {editable && <DemoBar c={c} />}
      <div style={{ ...shell, gridTemplateRows: '48px 1fr' }} aria-label={label}>
        <IFS.NavBar defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />
        <div style={{ display: 'grid', gridTemplateColumns: draft ? '48px 1fr' : '240px 1fr', minHeight: 0 }}>
          {draft ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16, boxShadow: 'inset -1px 0 0 var(--border-base)' }}><IFS.ArrowButton label="Open navigation" /></div>
            : <IFS.SideNav title="Value" items={nav} defaultValue="active" />}
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr 40px', minHeight: 0, minWidth: 0 }}>
            <div style={{ position: 'relative' }}>
              <IFS.PageHeader title={draft ? 'Q1 2027 Strategy Framework' : 'Q1 2026 Strategy Framework'} onBack={draft ? () => {} : undefined} onTitleMenu={() => {}}
                status={<IFS.Indicator type={draft ? 'gray' : 'green'} size="xs">{draft ? 'Draft' : 'Active'}</IFS.Indicator>}
                views={<IFS.SegmentedControl size="s" defaultValue="map" options={[{ value: 'grid', iconLeft: 'node-map' }, { value: 'map', iconLeft: 'map-view-2d' }, { value: 'flow', iconLeft: 'map-views' }]} />}
                actions={draft ? <IFS.Button type="secondary" size="s" disabled>Shape</IFS.Button> : <IFS.CooperChip />} />
              {draft && <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 344 }}>
                <IFS.Stepper steps={[{ label: 'Input' }, { label: 'Shape' }, { label: 'Review' }, { label: 'Approve' }]} current={0} /></div>}
            </div>
            <IFS.CanvasHeader columns={cols} />
            <IFS.DocumentsDropArea controller={c} style={{ minHeight: 0 }}>
              <IFS.CanvasBackground style={{ position: 'absolute', inset: 0 }} overlay={<div style={{ position: 'absolute', left: 14, bottom: 14 }}><IFS.ValueMapButton type={draft ? 'input' : 'shape'} /></div>}>
                {!draft && nodes.map(([t, title, n], i) => <div key={t} style={{ position: 'absolute', left: 52 + i * 240, top: 360 }}><IFS.NodeCard type={t} title={title} counter={n} /></div>)}
              </IFS.CanvasBackground>
            </IFS.DocumentsDropArea>
            <IFS.BottomSheet type="value" style={{ position: 'relative' }} left={<IFS.DocumentsContext controller={c} popoverOffset={54} />}
              prompts={draft ? [] : ['Walk me through this framework', 'What hasn’t been updated in a while?']} />
          </div>
        </div>
        <IFS.DocumentsFeedback controller={c} />
      </div>
    </>;
  }

  const withDates = list => list.map(d => ({ ...d }));
  IFS_GALLERY.push({ name: 'Pattern: Documents on an investment (editable)', figma: 'Investment overview — Add Attachments / Delete / Error states [patterns] (168:426794)', render: () =>
    <InvestmentScreen label="Investment with 16 documents" initial={withDates(SAMPLE)} /> });
  IFS_GALLERY.push({ name: 'Pattern: Documents — long names', figma: 'Long name [patterns] (168:434108)', render: () =>
    <InvestmentScreen label="Investment with long file names" initial={withDates(LONG.slice(0, 6))} /> });
  IFS_GALLERY.push({ name: 'Pattern: Documents on an active framework (read-only)', figma: 'Map - Overview - Documents search focused [patterns] (168:426467)', render: () => {
    const [n, setN] = React.useState(10);
    return <>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}><span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>Demo — number of documents:</span>
        <IFS.SegmentedControl size="s" value={String(n)} onChange={v => setN(+v)} options={['1', '7', '8', '10', '16'].map(v => ({ value: v, label: v }))} /></div>
      <FrameworkScreen key={n} label="Active framework, read-only documents" initial={withDates(SAMPLE.slice(0, n))} />
    </>;
  } });
  IFS_GALLERY.push({ name: 'Pattern: Documents empty — context required', figma: 'Map - Overview - Start [patterns] (168:433554)', render: () =>
    <FrameworkScreen draft editable required label="Draft framework, Cooper context required" initial={[]} /> });
  IFS_GALLERY.push({ name: 'Pattern: Documents empty — context optional', figma: 'empty states, Context optional [patterns] (168:433599)', render: () =>
    <InvestmentScreen label="Investment without documents" initial={[]} /> });
}
