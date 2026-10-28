import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { useIssueReport, IssueSolution, IssueListItem, IssueAnswerField, ConfidenceGates, PanelRail, SystemConfidence, TraceReport, TRACE_KINDS } = IFS;
  const { useState } = React;
  const noop = () => {};
  const Row = ({ label, children }) => <div className="g-row" style={{ alignItems: 'flex-start' }}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const W = ({ children, w = 340 }) => <div style={{ width: w }}>{children}</div>;
  const STAGES = ['Command', 'Value', 'Explore', 'Build', 'Plan', 'Results'].map(l => ({ value: l.toLowerCase(), label: l }));
  const Screen = ({ children, label }) => <div aria-label={label} style={{ position: 'relative', width: 1440, height: 900, maxWidth: '100%', overflow: 'hidden', border: '1px solid var(--border-base)', background: 'var(--surface-primary)' }}>{children}</div>;
  const Demo = ({ children }) => <div className="t-body-m-regular" style={{ color: 'var(--text-secondary)', margin: '0 0 8px', display: 'flex', gap: 8, alignItems: 'center' }}>{children}</div>;

  /* ---------------- data ---------------- */
  const GATES = [{ id: 'obj', label: 'Objective weighting' }, { id: 'strat', label: 'Strategic alignment' }, { id: 'risk', label: 'Risk balance' }, { id: 'gov', label: 'Governance flags' }];
  const WILDFIRE = [
    { id: 's1', title: 'Lock weight at 28%, restore methodology only', description: 'Hybrid restore · Keeps FY26 strategic alignment', recommended: true },
    { id: 's2', title: "Accept v2's 45% weighting in full", description: 'Faithful restore · Requires Strategy OKR review' },
    { id: 's3', title: 'Skip restore now, plan for v3.2 release', description: "Capture V2's calculation features in FY27 release plan" },
  ];
  const CONF_ISSUES = [
    { id: 'q1', kind: 'question', gate: 'risk', title: 'Wildfire risk over-weighted', description: 'V2 pulls capital into ignition mitigation', solutions: WILDFIRE, upload: true, answer: true },
    { id: 'q2', kind: 'question', gate: 'gov', title: 'WDRM v4 concentration above cap', description: 'concentrates 41% of capital in Corridor 7 — 6pts over the sector cap.',
      solutions: [{ id: 'c1', title: 'Cap Corridor 7 at 35%, redistribute overflow', description: 'Hybrid rebalance · Keeps FY26 diversification targets', recommended: true },
        { id: 'c2', title: "Accept v4's 41% concentration in full", description: 'Faithful rebalance · Requires Risk Committee sign-off' },
        { id: 'c3', title: 'Skip rebalance now, plan for v4.1 patch', description: 'Address WDRM cap logic in Q4 release plan' }], upload: true, answer: true },
    { id: 'w1', kind: 'warning', gate: 'gov', title: 'Wildfire risk over-weighted', description: 'V2 pulls capital into ignition mitigation', okay: true },
    { id: 'w2', kind: 'warning', gate: 'gov', title: 'WDRM v4 concentration above cap', description: 'Corridor 7 sits 6pts over the sector cap.', okay: true },
  ];
  const TRACE_ISSUES = [
    { id: 'e1', kind: 'error', title: 'Weighting is no longer balanced', description: 'Adding this objective increases the total strategic objective weight above 100%.',
      solutions: [{ id: 'a', title: 'Rebalance all objective weights', description: 'Redistribute the weights across all strategic objectives so the total returns to 100%.', recommended: true },
        { id: 'b', title: "Use Cooper's suggested weight", description: 'Apply a recommended weight based on the current objective structure.' },
        { id: 'c', title: 'Add without a weight', description: 'Save the objective as a draft and assign its weight before publishing.' }] },
    { id: 'e2', kind: 'error', title: 'Required measures are not configured', description: 'The objective has no measures, so it cannot contribute value.',
      solutions: [{ id: 'a', title: 'Configure measures now', description: 'Open Measure output and link at least one measure.', recommended: true }, { id: 'b', title: 'Inherit measures from parent', description: 'Use the measures of the Social goal.' }] },
    { id: 'e3', kind: 'error', title: 'Existing measures use incompatible units', description: 'Two linked measures report in different units.', answer: true,
      solutions: [{ id: 'a', title: 'Convert to the framework unit', description: 'Normalise both measures to $ / year.', recommended: true }] },
    { id: 'w1', kind: 'warning', title: 'Objective overlap detected', description: 'Community engagement overlaps with Public safety.', okay: true },
    { id: 'w2', kind: 'warning', title: 'Existing investments will be rescored', description: 'Investments using this framework will be re-scored when it is published.', okay: true },
    { id: 'w3', kind: 'warning', title: 'Reports may need updating', description: 'Current dashboards and reports do not include this objective and may show incomplete results until updated.', okay: true },
    { id: 'n1', kind: 'note', title: 'Existing investments will be recalculated', description: 'Investments using this framework will receive updated scores after the objective is published.', okay: true },
    { id: 'n2', kind: 'note', title: 'Version history updated', description: 'This change is saved as a new draft version.', okay: true },
    { id: 'n3', kind: 'note', title: 'Collaborators notified', description: 'Editors on this framework see the change in their activity.', okay: true },
  ];

  /* ---------------- helper sections ---------------- */
  IFS_GALLERY.push({ name: 'IssueSolution', figma: 'content-card-organism (solution) [patterns] (30:73116)', render: () => <>
    <Row label="recommended (Cooper)"><W><IssueSolution {...WILDFIRE[0]} onSelect={noop} /></W></Row>
    <Row label="default"><W><IssueSolution {...WILDFIRE[1]} onSelect={noop} /></W></Row>
    <Row label="hover"><W><IssueSolution {...WILDFIRE[1]} onSelect={noop} state="hover" /></W></Row>
    <Row label="no description"><W><IssueSolution title="Accept the cap" onSelect={noop} /></W></Row>
    <Row label="applied (undo on hover)"><W><IssueSolution {...WILDFIRE[1]} onUndo={noop} /></W></Row>
    <Row label="uploading"><W><IssueSolution loading /></W></Row>
  </> });
  IFS_GALLERY.push({ name: 'IssueListItem', figma: 'content-card-organism (list row) [patterns] (30:75771)', render: () => <>
    <Row label="open"><W><IssueListItem number={1} title="Wildfire risk over-weighted" onClick={noop} /></W></Row>
    <Row label="resolved"><W><IssueListItem number={2} title="WDRM v4 concentration above cap" resolved onClick={noop} /></W></Row>
  </> });
  IFS_GALLERY.push({ name: 'IssueAnswerField', figma: 'text-field-organism State=Typing [patterns] (30:77533)', render: () => <>
    <Row label="empty"><W><IssueAnswerField autoFocus={false} onSubmit={noop} onCancel={noop} /></W></Row>
    <Row label="typing"><W><IssueAnswerField autoFocus={false} defaultValue="Cap at 30%, apply only to new investments" onSubmit={noop} onCancel={noop} /></W></Row>
  </> });
  IFS_GALLERY.push({ name: 'ConfidenceGates', figma: 'Approval readiness [patterns] (30:73048)', render: () => {
    const c = useIssueReport({ issues: CONF_ISSUES, gates: GATES });
    return <Row label="50 %"><W><ConfidenceGates controller={c} /></W></Row>;
  } });
  IFS_GALLERY.push({ name: 'PanelRail', figma: 'sidebar-organism View=Collapsed [patterns] (30:75021)', render: () => <>
    <Row label="open questions"><div style={{ height: 120 }}><PanelRail dot="error" onExpand={noop} /></div></Row>
    <Row label="warnings only"><div style={{ height: 120 }}><PanelRail dot="warning" onExpand={noop} /></div></Row>
    <Row label="all OK"><div style={{ height: 120 }}><PanelRail onExpand={noop} /></div></Row>
  </> });
  IFS_GALLERY.push({ name: 'SystemConfidence', figma: 'System confidence [patterns] (30:72985)', render: () => {
    const c = useIssueReport({ issues: CONF_ISSUES, gates: GATES });
    const one = useIssueReport({ issues: CONF_ISSUES.filter(i => i.kind === 'question'), gates: GATES });
    return <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ height: 820 }}><SystemConfidence controller={c} /></div>
      <div style={{ height: 820 }}><SystemConfidence controller={one} /></div>
    </div>;
  } });
  IFS_GALLERY.push({ name: 'TraceReport', figma: 'Trace report drawer / sidebar [patterns] (12:176606 / 12:176205)', render: () => {
    const a = useIssueReport({ issues: TRACE_ISSUES, kinds: TRACE_KINDS });
    const b = useIssueReport({ issues: TRACE_ISSUES.filter(i => i.kind === 'warning'), kinds: TRACE_KINDS });
    return <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <TraceReport controller={a} onUndo={noop} />
      <TraceReport controller={b} onUndo={noop} defaultExpanded={false} />
      <div style={{ height: 700 }}><TraceReport controller={b} type="sidebar" /></div>
    </div>;
  } });

  /* ---------------- review screen chrome ---------------- */
  const INVESTMENTS = [
    ['Substation 12 Reliability Upgrade', 'Reliability', '$3.1M', '$4.4M', '+$1.3M', 'up', '2.6', '3.7', 'Biggest gainers'],
    ['Grid Hardening Program', 'Reliability', '$5.0M', '$6.2M', '+$1.2M', 'up', '2.5', '3.1', 'Biggest gainers'],
    ['Transformer Replacement - North', 'Asset Replacement', '$2.8M', '$3.4M', '+$0.6M', 'up', '1.9', '2.3', 'Biggest gainers'],
    ['Vegetation Management', 'Safety', '$4.2M', '$2.9M', '-$1.3M', 'down', '1.6', '1.1', 'Lost the most value'],
    ['Safety Compliance Retrofit', 'Cost', '$3.6M', '$3.0M', '-$0.6M', 'down', '1.7', '1.4', 'Lost the most value'],
  ].map(([name, type, f, t, v, d, r1, r2, group], i) => ({ id: `i${i}`, group, name, type, total: { from: f, to: t }, change: { value: v, direction: d }, ratio: { from: r1, to: r2 } }));
  const STATS = [
    { title: 'Portfolio value', trend: '4.8%', compare: { from: '$2.14B', to: '$2.24B' } },
    { title: 'Investments re-scored', value: '1,621', description: '357 gained • 519 lost • 745 unchanged' },
    { title: 'Finding tier changes', value: '876', description: '52 gained • 31 lost • 12 significant shift' },
    { title: 'Governance flags', value: '1', description: 'Executing investment affected' },
  ];
  function ReviewContent() {
    const ref = React.useRef();
    React.useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, []);
    return (
      <div ref={ref} className="ifs-scroll" style={{ flex: 1, minWidth: 0, overflow: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div><h2 className="t-heading-h1-medium" style={{ margin: 0 }}>Executive summary</h2>
          <p className="t-body-l-regular" style={{ color: 'var(--text-secondary)', margin: '8px 0 0' }}>Applying this change increases Reliability influence by 18%, decreases Safety influence by 7%, and changes the value of 876 investments. 3 investments move into the top funding tier under the proposed framework; 2 safety initiatives drop out of it.</p></div>
        <IFS.Stat items={STATS} />
        <div style={{ flex: 'none' }}><IFS.Tabs items={[{ value: 'impact', label: 'Portfolio Impact' }, { value: 'align', label: 'Strategic Alignment' }]} defaultValue="impact" /></div>
        <IFS.InvestmentValueImpact style={{ flex: 'none' }} />
        <IFS.TableReview style={{ flex: 'none' }} rows={INVESTMENTS} defaultCollapsed={['Unchanged']} />
      </div>
    );
  }
  function ReviewShell({ status, stage = 2, actions, panel, user = 'JP', children }) {
    return (
      <IFS.AppShell height={900}
        navBar={<IFS.NavBar stages={STAGES} defaultValue="value" hasNotifications user={{ initials: user, name: user }} />}
        sideNav={<IFS.SideNav title="Value" defaultCollapsed items={[{ id: 'review', label: 'Review' }]} defaultValue="review" />}
        header={<IFS.PageHeader title="Copy of Q1 2026 Enterprise…" onBack={noop} onTitleMenu={noop} status={status}
          views={<div style={{ width: 344 }}><IFS.Stepper steps={['Input', 'Shape', 'Review', 'Approve'].map(label => ({ label }))} current={stage} /></div>}
          actions={actions} />}
        bottom={<IFS.BottomSheet type="value" documents={{ label: '16 Documents', icon: 'system-file', onClick: noop }} prompts={['Explain me the value impact', 'Evaluate publish risk']} />}>
        <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>{children || <ReviewContent />}{panel}</div>
      </IFS.AppShell>
    );
  }

  /* ---------------- Pattern: System Confidence ---------------- */
  IFS_GALLERY.push({ name: 'Pattern: System confidence', figma: 'Review - Portfolio impact - Errors [patterns] (30:72985)', render: () => {
    const [key, setKey] = useState(0);
    return <>
      <Demo>Pick a solution, type My answer, upload a file or press Okay on warnings; ‹ › and All walk the list; the rail dot follows what is open. At 100 % Send for approval enables.
        <IFS.Button size="s" type="tertiary" onClick={() => setKey(k => k + 1)}>Reset</IFS.Button></Demo>
      <ConfidenceScreen key={key} />
    </>;
  } });
  function ConfidenceScreen() {
    const c = useIssueReport({ issues: CONF_ISSUES, gates: GATES });
    return <Screen label="System confidence">
      <ReviewShell status={<IFS.Indicator type="gray" size="xs">Draft</IFS.Indicator>}
        actions={<><IFS.Button type="tertiary" size="s" iconLeft="users-group">3/5</IFS.Button><IFS.CommentButton />
          <IFS.Button type="primary" size="s" disabled={!c.allResolved} onClick={() => IFS.toast({ title: 'Sent for approval' })}>Send for approval</IFS.Button></>}
        panel={<div style={{ height: '100%' }}><SystemConfidence controller={c} onEvidence={noop} /></div>} />
    </Screen>;
  }

  /* ---------------- Pattern: Trace Report ---------------- */
  IFS_GALLERY.push({ name: 'Pattern: Trace report', figma: 'Map - Overview - Error detail [patterns] (12:176606)', render: () => {
    const [run, setRun] = useState(1);
    const [only, setOnly] = useState('all');
    return <>
      <Demo>The report opens after an incorrect change. It cannot be closed, only collapsed (↘); it disappears once every item is resolved. Undo reverts the change.
        <IFS.SegmentedControl size="s" value={only} onChange={v => { setOnly(v); setRun(r => r + 1); }} options={[{ value: 'all', label: 'All types' }, { value: 'error', label: 'Errors only' }]} />
        <IFS.Button size="s" type="tertiary" onClick={() => setRun(r => r + 1)}>Make the change again</IFS.Button></Demo>
      <TraceScreen key={run} issues={only === 'all' ? TRACE_ISSUES : TRACE_ISSUES.filter(i => i.kind === 'error')} />
    </>;
  } });
  const COLS = ['Enterprise goals', 'Value framework', 'Strategic objectives', 'Value models', 'Measure output'];
  const SOCIAL = ['DAC customer reach', 'Affordability burden', 'Worker safety', 'Public safety', 'Community engagement'];
  function TraceScreen({ issues }) {
    const [shown, setShown] = useState(true);
    const c = useIssueReport({ issues, kinds: TRACE_KINDS, onResolvedAll: () => { setShown(false); IFS.toast({ title: 'All issues resolved' }); } });
    return <Screen label="Trace report">
      <IFS.AppShell height={900}
        navBar={<IFS.NavBar stages={STAGES} defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
        sideNav={<IFS.SideNav title="Value" defaultCollapsed items={[{ id: 'map', label: 'Map' }]} defaultValue="map" />}
        header={<><IFS.PageHeader title="Copy of Q2 2026 Strategy…" onBack={noop} onTitleMenu={noop} status={<IFS.Indicator type="gray" size="xs">Draft</IFS.Indicator>}
          views={<div style={{ width: 344 }}><IFS.Stepper steps={['Input', 'Shape', 'Review', 'Approve'].map(label => ({ label }))} current={1} /></div>}
          actions={<><IFS.Button type="tertiary" size="s" iconLeft="users-group">1/1</IFS.Button><IFS.CommentButton /><IFS.Button type="primary" size="s" disabled={shown}>Review</IFS.Button></>} />
          <IFS.CanvasHeader columns={COLS} /></>}
        bottom={<IFS.BottomSheet type="value" documents={{ label: '3 Documents', icon: 'system-file', onClick: noop }} onUpload={noop} prompts={['Walk me through this framework', "What hasn't been updated in a while?"]} />}>
        <div style={{ position: 'relative', height: '100%' }}>
          <IFS.CanvasBackground defaultView={{ x: 0, y: 0, zoom: 1 }} overlay={<div style={{ position: 'absolute', left: 12, bottom: 12 }}><IFS.ValueMapButton /></div>}>
            <div style={{ position: 'absolute', left: 520, top: 60 }}><IFS.NodeCard type="strategic-objective" title="Social" /></div>
            {SOCIAL.map((t, i) => <div key={t} style={{ position: 'absolute', left: 760, top: 60 + i * 100 }}>
              <IFS.NodeCard type="subnode" title={t} selected={t === 'Community engagement' && shown} /></div>)}
          </IFS.CanvasBackground>
          {shown && <div style={{ position: 'absolute', top: 12, right: 12 }}><TraceReport controller={c} onUndo={() => { setShown(false); IFS.toast({ title: 'Change undone' }); }} /></div>}
        </div>
      </IFS.AppShell>
    </Screen>;
  }

  /* ---------------- Pattern: Readiness Evaluation ---------------- */
  const NOTES = <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <IFS.SourceCard type="user" user={{ name: 'John Thomson' }}>"7 feeder sections show deteriorating condition indicators and increasing likelihood of reliability issues."</IFS.SourceCard>
    <IFS.SourceCard type="user" user={{ name: 'James R.', initials: 'IN', type: 'purple' }}>"Current feeder loading is approaching operational limits, reducing flexibility during future demand growth or outages."</IFS.SourceCard>
  </div>;
  const P = t => <p className="t-body-m-regular" style={{ margin: 0, color: 'var(--text-secondary)' }}>{t}</p>;
  const BASE_SECTIONS = [
    { id: 'impact', title: 'Portfolio impact', badge: { label: '+4.8%', tone: 'success', icon: 'arrow-caret-up-filled' }, content: <>{P('Net portfolio value rises under the proposed framework, with a modest short-term trade-off across re-scored investments.')}<IFS.ReadinessFacts rows={[['Proposed value', '$2.24B ▴ 3.1 %']]} /></> },
    { id: 'rescored', title: 'Investments re-scored', badge: '1,621', content: <>{P('1,621 investments were re-evaluated against the proposed objective weights.')}<IFS.ReadinessFacts rows={[['Gained', '357'], ['Lost', '519'], ['Unchanged', '745']]} /></> },
    { id: 'tiers', title: 'Fundings-tier changes', badge: '38', content: <>{P('38 investments move between funding tiers as a result of re-scoring.')}<IFS.ReadinessFacts rows={[['Total', '876'], ['Gained', '52'], ['Lost', '31'], ['Significant shift', '12']]} /></> },
    { id: 'risks', title: 'Flagged risks', badge: { label: '1 resolved', tone: 'success' }, content: P('Wildfire risk over-weighted — V2 pulls capital into ignition mitigation.') },
    { id: 'notes', title: 'Reviewer notes', count: 2, content: NOTES },
  ];
  const BUDGET = { id: 'budget', title: 'Budget envelope', badge: { label: 'Over by $140M', tone: 'danger' }, content: <>{P('Proposed value exceeds the FY26 capital envelope approved for this framework.')}
    <IFS.ReadinessFacts rows={[['Approved FY26 envelope', '$2.24B'], ['Proposed value', '$2.24B'], ['Over by', '$140M', 'danger'], ['Requires', 'Finance Committee waiver']]} /></> };
  const CASES = {
    approved: { summary: { title: 'Ready to Approve', text: 'All governance checks passed and the one flagged risk has been resolved. Net portfolio value rises 4.8% ($2.14B → $2.24B) with 1,621 investments re-scored.' },
      readiness: 100, checks: ['Objective weighting', 'Strategic alignment', 'Risk balance', 'Governance flags'].map(label => ({ label, right: 'Passed' })), sections: BASE_SECTIONS },
    blocked: { summary: { title: 'Budget Envelope Exceeded', text: 'Proposed framework raises portfolio value to $2.24B — $140M above the approved FY26 capital envelope. 38 funding-tier changes fall outside pre-approved budget lines.' },
      readiness: 40, checks: [{ label: 'Objective weighting', right: 'Passed' }, { label: 'Strategic alignment', right: 'Passed' }, { label: 'Budget envelope', type: 'error', right: 'Exceeded' }, { label: 'Governance flags', right: 'Passed' }],
      sections: [BUDGET, ...BASE_SECTIONS] },
  };
  IFS_GALLERY.push({ name: 'Pattern: Readiness evaluation', figma: 'Review - Portfolio impact - Reviewer: Approved / Blocked view [patterns] (12:193232 / 12:193367)', render: () => {
    const [view, setView] = useState('approved');
    return <>
      <Demo>Reviewer view. Expand the sections; collapse the panel. Approve, or open the caret menu → Request more info (status becomes Revision required).
        <IFS.SegmentedControl size="s" value={view} onChange={setView} options={[{ value: 'approved', label: 'Approved view' }, { value: 'blocked', label: 'Blocked view' }]} /></Demo>
      <ReadinessScreen key={view} data={CASES[view]} />
    </>;
  } });
  function ReadinessScreen({ data }) {
    const [exp, setExp] = useState(true);
    const [status, setStatus] = useState('pending');
    const blocked = data.readiness < 100;
    const ind = status === 'pending' ? <IFS.Indicator type="orange" size="xs">Pending approval</IFS.Indicator>
      : status === 'approved' ? <IFS.Indicator type="green" size="xs">Approved</IFS.Indicator> : <IFS.Indicator type="red" size="xs">Revision required</IFS.Indicator>;
    const panel = <div style={{ height: '100%' }}>{exp
      ? <IFS.Panel title="Readiness Evaluation" expanded onExpandedChange={setExp} onEvidence={noop} style={{ height: '100%' }}>
        <IFS.ReadinessEvaluation summary={data.summary} readiness={data.readiness} checks={data.checks} sections={data.sections} /></IFS.Panel>
      : <PanelRail dot={blocked ? 'error' : null} label="Expand readiness evaluation" onExpand={() => setExp(true)} />}</div>;
    return <Screen label="Readiness evaluation">
      <ReviewShell stage={3} user="IG" status={ind} panel={panel}
        actions={<><IFS.Button type="tertiary" size="s" iconLeft="users-group">3/5</IFS.Button><IFS.CommentButton />
          <IFS.Button type="tertiary" size="s">Approval chain</IFS.Button>
          <IFS.SplitButton disabled={status !== 'pending'} onClick={() => { setStatus('approved'); IFS.toast({ title: 'Framework approved' }); }}
            items={[{ label: 'Request more info', description: 'Send back to the author as Revision required', onClick: () => { setStatus('revision'); IFS.toast({ title: 'Revision requested', description: 'The author sees your comment in the activity log.' }); } }]}>Approve</IFS.SplitButton></>} />
    </Screen>;
  }
}
