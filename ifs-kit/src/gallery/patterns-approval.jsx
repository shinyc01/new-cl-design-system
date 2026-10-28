import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { ApprovalStatus, QuickStatCard, Stat, InfoHintItem, InvestmentValueImpact, TableReview, SplitButton,
    ReadinessFacts, ReadinessEvaluation, ApprovalChainPanel, ApprovalChainTable } = IFS;
  const { useState } = React;
  const Row = ({ label, children, top }) => <div className="g-row" style={top ? { alignItems: 'flex-start' } : null}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Box = ({ w, children, style }) => <div style={{ width: w, maxWidth: '100%', ...style }}>{children}</div>;

  /* ---------------- shared data ---------------- */
  const FRAMEWORK = 'Copy of Q1 2026 Enterprise Strategy Framework';
  const STATS = [
    { title: 'Portfolio value', trend: '4.8%', compare: { from: '$2.14B', to: '$2.24B' } },
    { title: 'Investments re-scored', value: '1,621', description: '357 gained • 519 lost • 745 unchanged' },
    { title: 'Finding tier changes', value: '876', description: '52 gained • 31 lost • 12 significant shift' },
    { title: 'Governance flags', value: '1', description: 'Executing investment affected' },
  ];
  const INVESTMENTS = [
    { id: 1, group: 'Biggest gainers', name: 'Substation 12 Reliability Upgrade', type: 'Reliability', total: { from: '$3.1M', to: '$4.4M' }, change: { value: '+$1.3M', direction: 'up' }, ratio: { from: '2.6', to: '3.7' } },
    { id: 2, group: 'Biggest gainers', name: 'Grid Hardening Program', type: 'Reliability', total: { from: '$5.0M', to: '$6.2M' }, change: { value: '+$1.2M', direction: 'up' }, ratio: { from: '2.5', to: '3.1' } },
    { id: 3, group: 'Biggest gainers', name: 'Transformer Replacement Phase 2', type: 'Asset Replacement', total: { from: '$2.8M', to: '$3.4M' }, change: { value: '+$0.6M', direction: 'up' }, ratio: { from: '1.9', to: '2.3' } },
    { id: 4, group: 'Lost the most value', name: 'Vegetation Management', type: 'Safety', total: { from: '$4.2M', to: '$2.9M' }, change: { value: '-$1.3M', direction: 'down' }, ratio: { from: '1.6', to: '1.1' } },
    { id: 5, group: 'Lost the most value', name: 'Safety Compliance Retrofit', type: 'Cost', total: { from: '$3.6M', to: '$3.0M' }, change: { value: '-$0.6M', direction: 'down' }, ratio: { from: '1.7', to: '1.4' } },
    { id: 6, group: 'Unchanged', name: 'Meter Data Platform', type: 'Cost', total: { from: '$1.2M', to: '$1.2M' }, ratio: { from: '1.4', to: '1.4' } },
    { id: 7, group: 'Unchanged', name: 'Feeder Automation North', type: 'Reliability', total: { from: '$2.0M', to: '$2.0M' }, ratio: { from: '2.1', to: '2.1' } },
  ];
  const CHECKS_READY = [
    { label: 'Objective weighting', right: 'Passed' }, { label: 'Strategic alignment', right: 'Passed' },
    { label: 'Risk balance', right: 'Passed' }, { label: 'Governance flags', right: 'Passed' },
  ];
  const CHECKS_BLOCKED = [
    { label: 'Objective weighting', right: 'Passed' }, { label: 'Strategic alignment', right: 'Passed' },
    { label: 'Budget envelope', type: 'error', right: 'Exceeded' }, { label: 'Governance flags', right: 'Passed' },
  ];
  const P = ({ children }) => <p>{children}</p>;
  const sectionsFor = (blocked, notes) => [
    ...(blocked ? [{ id: 'budget', title: 'Budget envelope', badge: { label: 'Over by $140M', tone: 'danger' }, content: <>
      <P>Proposed value exceeds the FY26 capital envelope approved for this framework.</P>
      <ReadinessFacts rows={[['Approved FY26 envelope', '$2.10B'], ['Proposed value', '$2.24B'], ['Over by', '$140M', 'danger'], ['Requires', 'Finance Committee waiver']]} />
    </> }] : []),
    { id: 'impact', title: 'Portfolio impact', badge: { label: '+4.8%', tone: 'success', icon: 'arrow-caret-up-filled' }, content:
      <ReadinessFacts rows={[['Current', '$2.14B'], ['Proposed', '$2.24B'], ['Change', '+4.8%', 'success']]} /> },
    { id: 'rescored', title: 'Investments re-scored', badge: '1,621', content:
      <ReadinessFacts rows={[['Gained', '357'], ['Lost', '519'], ['Unchanged', '745']]} /> },
    { id: 'tiers', title: 'Fundings-tier changes', badge: '38', content:
      <ReadinessFacts rows={[['Gained', '52'], ['Lost', '31'], ['Significant shift', '12']]} /> },
    { id: 'risks', title: 'Flagged risks', badge: { label: '1 resolved', tone: 'success' }, content:
      <P>One executing investment was affected by the new weighting. The flag was reviewed and resolved by the framework owner.</P> },
    { id: 'notes', title: 'Reviewer notes', count: notes.length, content: notes.length
      ? <ReadinessFacts rows={notes.map(n => [n.name, n.text])} />
      : <P>No reviewer notes yet.</P> },
  ];
  const SUMMARY_READY = { title: 'Ready to Approve', text: 'All governance checks passed and the one flagged risk has been resolved. Net portfolio value rises 4.8% ($2.14B → $2.24B) with 1,621 investments re-scored.' };
  const SUMMARY_BLOCKED = { title: 'Budget Envelope Exceeded', text: 'Proposed framework raises portfolio value to $2.24B — $140M above the approved FY26 capital envelope. 38 funding-tier changes fall outside pre-approved budget lines.' };

  const LONG_NOTE = 'The 12–18 month action window is being treated as a key reason to move this idea forward, but the current evidence does not fully support that level of urgency yet. I understand the reliability risk is increasing and the affected feeders are becoming harder to defer, but we should not let this move into approval as if the timing is already confirmed.';
  const REVIEWER_CHAIN = [
    { id: 'jp', name: 'Jeff Pauska', role: 'Investment owner', avatar: { type: 'black' }, status: 'success' },
    { id: 'ig', name: 'Isabella Grant', role: 'Asset Manager', avatar: { type: 'purple' }, status: 'empty' },
    { id: 'jt', name: 'John Thomson', role: 'Field Team Lead', avatar: { type: 'orange' }, status: 'empty' },
    { id: 'jr', name: 'James Reyes', role: 'Value Framework Owner', avatar: { type: 'dark-purple' }, status: 'empty' },
  ];
  const OWNER_CHAIN = [
    { id: 'jp', name: 'Jeff Pauska', role: 'Investment owner', avatar: { type: 'black' }, status: 'success' },
    { id: 'ig', name: 'Isabella Grant', role: 'Asset Manager', avatar: { type: 'purple' }, status: 'awaiting', note: { text: LONG_NOTE, authorId: 'jp' },
      comment: 'The cost range needs a clearer benchmark before I can sign off.', lastNotified: 'Feb 15, 2025' },
    { id: 'ms', name: 'Michael Swift', role: 'Asset Manager', avatar: { type: 'light-purple' }, status: 'empty', replaced: { name: 'Ivan Gomez', avatar: { type: 'purple' } } },
    { id: 'jt', name: 'John Thomson', role: 'Field Team Lead', avatar: { type: 'orange' }, status: 'empty' },
    { id: 'jr', name: 'James Reyes', role: 'Value Framework Owner', avatar: { type: 'dark-purple' }, status: 'empty' },
  ];
  const notesOf = chain => chain.filter(a => a.note && a.note.text).map(a => ({ name: a.name, text: a.note.text }));

  /* ---------------- component sections ---------------- */
  IFS_GALLERY.push({ name: 'ApprovalStatus', figma: 'status (12:210060)', render: () => (
    <Row label="type">{['success', 'rejected', 'awaiting', 'empty'].map(t => <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><ApprovalStatus type={t} /><span className="t-body-m-regular">{t}</span></span>)}</Row>
  ) });

  IFS_GALLERY.push({ name: 'Stat', figma: 'stat (12:121119)', render: () => <>
    <Row label="row (Figma: 1 compare + 3)"><Box w={988}><Stat items={STATS} /></Box></Row>
    <Row label="QuickStatCard">
      <Box w={238}><QuickStatCard title="Portfolio value" trend="4.8%" compare={{ from: '$2.14B', to: '$2.24B' }} /></Box>
      <Box w={238}><QuickStatCard title="Net value" trend="3.1%" trendDirection="down" value="$2.08B" description="vs. current" /></Box>
      <Box w={238}><QuickStatCard title="Governance flags" value="1" description="Executing investment affected" /></Box>
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'InfoHintItem', figma: 'info-hint-item (12:121968)', render: () => <>
    <Row label="legend">{[{ label: 'Loss', color: 'var(--data-viz-alert-data-5)' }, { label: 'Unchanged', neutral: true }, { label: 'Gain', color: 'var(--data-viz-deep-green-data-5)' }].map(l => <InfoHintItem key={l.label} {...l} />)}</Row>
    <Row label="with value / icon"><Box w={232}><InfoHintItem label="Title" color="var(--data-viz-deep-green-data-4)" icon="system-info-hint" value="Value" /></Box></Row>
  </> });

  IFS_GALLERY.push({ name: 'InvestmentValueImpact', figma: 'Investment-value-impact (12:121973)', render: () => (
    <Row label="default (hover a bar)"><Box w={988}><InvestmentValueImpact /></Box></Row>
  ) });

  IFS_GALLERY.push({ name: 'TableReview', figma: 'table-review (12:122378)', render: () => <>
    <Row label="Default (Unchanged collapsed)" top><Box w={988}><TableReview rows={INVESTMENTS} defaultCollapsed={['Unchanged']} /></Box></Row>
    <Row label="Variant2 (expanded)" top><Box w={988}><TableReview rows={INVESTMENTS} /></Box></Row>
  </> });

  IFS_GALLERY.push({ name: 'SplitButton', figma: 'header-pattern main action [patterns] (138:291660)', render: () => (
    <Row label="states">
      <SplitButton onClick={() => IFS.toast({ title: 'Approve clicked' })} items={[{ label: 'Request more information', description: 'Ask for more detail about idea.', onClick: () => IFS.toast({ title: 'Request more information' }) }]}>Approve</SplitButton>
      <SplitButton disabled iconLeft="system-check" items={[{ label: 'Request more information' }]}>Approved</SplitButton>
      <SplitButton disabled iconLeft="system-check">Info requested</SplitButton>
      <SplitButton type="secondary" onClick={() => {}}>Publish</SplitButton>
    </Row>
  ) });

  IFS_GALLERY.push({ name: 'ReadinessEvaluation', figma: 'Readiness Evaluation sidebar [patterns] (138:293545)', render: () => (
    <Row label="100% / 40% (Budget envelope open)" top>
      <div style={{ height: 760, display: 'flex' }}><IFS.Panel title="Readiness Evaluation"><ReadinessEvaluation summary={SUMMARY_READY} readiness={100} checks={CHECKS_READY} sections={sectionsFor(false, [])} /></IFS.Panel></div>
      <div style={{ height: 760, display: 'flex' }}><IFS.Panel title="Readiness Evaluation"><ReadinessEvaluation summary={SUMMARY_BLOCKED} readiness={40} checks={CHECKS_BLOCKED} sections={sectionsFor(true, [])} defaultOpenSections={['budget']} /></IFS.Panel></div>
    </Row>
  ) });

  IFS_GALLERY.push({ name: 'ApprovalChainTable', figma: 'Approval chain table [patterns] (157:114778)', render: () => {
    const [chain, setChain] = useState(OWNER_CHAIN);
    return <>
      <Row label="sidebar, compact (owner; filter > 3 approvers)" top>
        <div style={{ height: 520, display: 'flex' }}><ApprovalChainPanel mode="sidebar" onExpandedChange={() => {}} onCollapsedChange={() => {}}>
          <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" />
        </ApprovalChainPanel></div>
        <div style={{ position: 'relative', width: 440, height: 360 }}><ApprovalChainPanel mode="popover" onExpandedChange={() => {}} onClose={() => {}}>
          <ApprovalChainTable defaultApprovers={REVIEWER_CHAIN} currentUserId="ig" ownerId="jp" />
        </ApprovalChainPanel></div>
      </Row>
      <Row label="full (Push, Notified, replaced reviewer)" top>
        <Box w={1392}><ApprovalChainPanel mode="full" onExpandedChange={() => {}}>
          <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" view="full" />
        </ApprovalChainPanel></Box>
      </Row>
    </>;
  } });

  /* ---------------- pattern screens ---------------- */
  const STAGES = [{ value: 'command', label: 'Command' }, { value: 'value', label: 'Value' }, { value: 'explore', label: 'Explore' },
    { value: 'build', label: 'Build' }, { value: 'plan', label: 'Plan' }, { value: 'results', label: 'Results' }];
  const VALUE_NAV = [
    { id: 'active', label: 'Active Framework' },
    { type: 'section', label: 'Library', items: [{ id: 'strategy', label: 'Strategy Frameworks' }, { id: 'value', label: 'Value Frameworks' }, { id: 'models', label: 'Value Models' }] },
  ];
  const STATUS = {
    draft: ['gray', 'Draft'], shaping: ['gray', 'Shaping'], pending: ['orange', 'Pending approval'], revisions: ['red', 'Revisions required'],
    ready: ['blue', 'Ready to publish'], active: ['green', 'Active'],
  };
  const Screen = ({ children }) => <div style={{ position: 'relative', width: 1440, height: 900, maxWidth: '100%', overflow: 'hidden', border: '1px solid var(--border-base)' }}>{children}</div>;
  const Demo = ({ children }) => <div className="g-row" style={{ gap: 8, flexWrap: 'wrap' }}><span className="g-label t-body-m-regular">demo</span>{children}</div>;

  function Header({ status, step, actions }) {
    const [tone, label] = STATUS[status];
    return <IFS.PageHeader title={FRAMEWORK} onBack={() => {}} onTitleMenu={() => {}}
      status={<IFS.Indicator type={tone} size="xs">{label}</IFS.Indicator>}
      views={<div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
        <IFS.SegmentedControl size="s" defaultValue="overview" options={[{ value: 'overview', iconLeft: 'overview' }, { value: 'map', iconLeft: 'node-map' }, { value: 'flow', iconLeft: 'capital-flow' }]} />
        <div style={{ width: 352 }}><IFS.Stepper current={step} steps={['Input', 'Shape', 'Review', 'Approve'].map(l => ({ label: l }))} /></div>
      </div>}
      actions={<>
        <IFS.Button type="secondary" size="s" iconLeft="users-group">3/5</IFS.Button>
        <IFS.IconButton icon="system-comment" label="Comments" type="secondary" size="s" />
        {actions}
      </>} />;
  }
  // Main column of the review screens (Executive summary → stat → tabs → value impact → table).
  function Summary() {
    const [tab, setTab] = useState('impact');
    return (
      <div style={{ flex: 1, minWidth: 0, overflow: 'auto', padding: 12, display: 'grid', gap: 20, alignContent: 'start' }} className="ifs-scroll">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="t-heading-h1-medium" style={{ margin: 0, color: 'var(--text-primary)' }}>Executive summary</h2>
          <p className="t-body-m-regular" style={{ margin: 0, color: 'var(--text-tertiary)' }}>
            Applying this change <span style={{ color: 'var(--text-primary)' }}>increases Reliability influence by 18%, decreases Safety influence by 7%</span>, and changes the value of <span style={{ color: 'var(--text-primary)' }}>876 investments</span>.<br />
            3 investments move into the top funding tier under the proposed framework; 2 safety initiatives drop out of it.</p>
        </div>
        <Stat items={STATS} />
        <div><IFS.Tabs value={tab} onChange={setTab} items={[{ value: 'impact', label: 'Portfolio Impact' }, { value: 'alignment', label: 'Strategic Alignment' }]} /></div>
        {tab === 'impact' && <InvestmentValueImpact />}
        <TableReview rows={INVESTMENTS} defaultCollapsed={['Unchanged']} />
      </div>
    );
  }
  const Shell = ({ header, children, user = { initials: 'IG', name: 'Isabella Grant' }, prompts = ['Explain me the value impact', 'Evaluate publish risk'] }) => (
    <IFS.AppShell height={900}
      navBar={<IFS.NavBar stages={STAGES} defaultValue="value" hasNotifications user={user} />}
      sideNav={<IFS.SideNav title="Value" items={VALUE_NAV} defaultValue="strategy" defaultCollapsed />}
      header={header}
      bottom={<IFS.BottomSheet type="value" documents={{ label: '16 Documents', icon: 'system-file' }} prompts={prompts} />}>
      <div style={{ display: 'flex', height: '100%', minHeight: 0, position: 'relative' }}>{children}</div>
    </IFS.AppShell>
  );

  IFS_GALLERY.push({ name: 'Pattern: Approval chain — reviewer review & approve', figma: 'Review - Portfolio impact - Errors [patterns] (138:290099)', render: () => {
    const [blocked, setBlocked] = useState(false);
    const [chain, setChain] = useState(REVIEWER_CHAIN);
    const [decision, setDecision] = useState(null); // null | approved | info
    const [chainMode, setChainMode] = useState(null); // null | popover | full
    const [modal, setModal] = useState(null); // null | approve | info
    const [note, setNote] = useState('');
    const me = 'ig';
    const setMine = patch => setChain(c => c.map(a => (a.id === me ? { ...a, ...patch } : a)));
    const reset = () => { setChain(REVIEWER_CHAIN); setDecision(null); setChainMode(null); setModal(null); setNote(''); };
    const approve = () => {
      setModal(null); setDecision('approved'); setMine({ status: 'success' });
      IFS.toast({ title: 'Framework approved', duration: 5000, secondaryAction: { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => { setDecision(null); setMine({ status: 'empty' }); } } });
    };
    const requestInfo = () => {
      const text = note.trim();
      setModal(null); setDecision('info'); setChainMode(null); setMine({ status: 'revisions', comment: text });
      IFS.toast({ title: 'Revision requested — sent back to Jeff Pauska', description: 'Status updated to Revision required', duration: 5000,
        secondaryAction: { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => { setDecision(null); setMine({ status: 'empty', comment: undefined }); } } });
    };
    const mainAction = decision === 'approved' ? <SplitButton disabled iconLeft="system-check" items={[{ label: 'Request more information' }]}>Approved</SplitButton>
      : decision === 'info' ? <SplitButton disabled iconLeft="system-check">Info requested</SplitButton>
        : <SplitButton onClick={() => setModal('approve')} items={[{ label: 'Request more information', description: 'Ask for more detail about idea.', onClick: () => { setNote(''); setModal('info'); } }]}>Approve</SplitButton>;
    const table = <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId={me} ownerId="jp" view={chainMode === 'full' ? 'full' : 'compact'} />;
    return <>
      <Demo>
        <IFS.SegmentedControl size="s" value={blocked ? '40' : '100'} onChange={v => setBlocked(v === '40')} options={[{ value: '100', label: 'Readiness 100%' }, { value: '40', label: 'Readiness 40% (budget exceeded)' }]} />
        <IFS.Button size="s" type="tertiary" onClick={reset}>Reset</IFS.Button>
      </Demo>
      <Screen>
        <Shell header={<Header status={decision === 'info' ? 'revisions' : 'pending'} step={3} actions={<>
          {decision !== 'info' && <IFS.Button type="secondary" size="s" aria-expanded={!!chainMode} onClick={() => setChainMode(chainMode ? null : 'popover')}>Approval chain</IFS.Button>}
          {mainAction}
        </>} />}>
          {chainMode === 'full'
            ? <ApprovalChainPanel mode="full" onExpandedChange={f => setChainMode(f ? 'full' : 'popover')} onClose={() => setChainMode(null)}>{table}</ApprovalChainPanel>
            : <Summary />}
          <IFS.Panel title="Readiness Evaluation" expanded={chainMode !== 'full'} onExpandedChange={() => {}}>
            <ReadinessEvaluation key={blocked ? 'b' : 'r'} summary={blocked ? SUMMARY_BLOCKED : SUMMARY_READY} readiness={blocked ? 40 : 100}
              checks={blocked ? CHECKS_BLOCKED : CHECKS_READY} sections={sectionsFor(blocked, notesOf(chain))} />
          </IFS.Panel>
          {chainMode === 'popover' && <ApprovalChainPanel mode="popover" style={{ top: 4, right: 12 }}
            onExpandedChange={f => setChainMode(f ? 'full' : 'popover')} onClose={() => setChainMode(null)}>{table}</ApprovalChainPanel>}
        </Shell>
        <IFS.Modal open={modal === 'approve'} onOpenChange={o => !o && setModal(null)} title="Approve this framework?" width={440} overlay="base"
          secondaryAction={{ label: 'Cancel', onClick: () => setModal(null) }} primaryAction={{ label: 'Approve', onClick: approve }}>
          <p className="t-body-l-regular" style={{ margin: 0 }}>Are you sure you want to approve <b>“{FRAMEWORK}”</b>?</p>
          <p className="t-body-l-regular" style={{ margin: '8px 0 0' }}>Once approved, the framework will move forward in the process.</p>
        </IFS.Modal>
        <IFS.Modal open={modal === 'info'} onOpenChange={o => !o && setModal(null)} title="Request more information" width={440} overlay="base"
          secondaryAction={{ label: 'Cancel', onClick: () => setModal(null) }} primaryAction={{ label: 'Request information', onClick: requestInfo }}>
          <p className="t-body-l-regular" style={{ margin: '0 0 12px' }}>Ask for more detail before deciding whether this idea should move forward. The idea will return to Shape.</p>
          <IFS.TextArea size="l" label="Note" value={note} onChange={setNote} placeholder="Describe what information is missing before this idea can move forward." />
        </IFS.Modal>
      </Screen>
    </>;
  } });

  IFS_GALLERY.push({ name: 'Pattern: Approval chain — owner review, push & publish', figma: 'Owner - Approve [patterns] (157:105911)', render: () => {
    const [chain, setChain] = useState(OWNER_CHAIN);
    const [mode, setMode] = useState('sidebar'); // sidebar | full
    const [collapsed, setCollapsed] = useState(false);
    const [phase, setPhase] = useState('pending'); // pending | shaping | active
    const [modal, setModal] = useState(null); // publish | send
    const reviewers = chain.filter(a => a.id !== 'jp');
    const allApproved = reviewers.every(a => a.status === 'success');
    const revisions = reviewers.some(a => a.status === 'revisions' || a.status === 'rejected');
    const status = phase === 'active' ? 'active' : phase === 'shaping' ? 'shaping' : revisions ? 'revisions' : allApproved ? 'ready' : 'pending';
    const step = phase === 'shaping' ? 1 : status === 'ready' || status === 'active' ? 4 : 3;
    const nextApproves = () => {
      const i = chain.findIndex(a => a.id !== 'jp' && a.status !== 'success');
      if (i < 0) return;
      setChain(chain.map((a, j) => (j === i ? { ...a, status: 'success', lastNotified: a.lastNotified } : a)));
    };
    const johnRevises = () => setChain(chain.map(a => (a.id === 'jt' ? { ...a, status: 'revisions', comment: 'The cost range needs a clearer benchmark before this investment can move forward.',
      action: { label: 'Shape', icon: 'shape', onClick: () => setPhase('shaping') } } : a)));
    const sendAgain = () => {
      setModal(null); setPhase('pending');
      setChain(chain.map(a => (a.id === 'jp' ? a : { ...a, status: 'empty', action: undefined, pushedAt: undefined })));
      IFS.toast({ title: 'Sent for review', description: 'Reviewers can now see the current state and give feedback.', duration: 4000 });
    };
    const publish = () => {
      setModal(null); setPhase('active');
      IFS.toast({ title: 'Q1 2026 Enterprise Framework is now active. Re-scoring 1,621 investments.', duration: 4000 });
    };
    const table = <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" view={mode} />;
    const action = phase === 'shaping' || status === 'revisions'
      ? <IFS.Button type="primary" size="s" onClick={() => setModal('send')}>Send for review</IFS.Button>
      : phase === 'active' ? <SplitButton disabled iconLeft="system-check">Published</SplitButton>
        : <SplitButton disabled={!allApproved} onClick={() => setModal('publish')}>Publish</SplitButton>;
    return <>
      <Demo>
        <IFS.Button size="s" type="secondary" disabled={allApproved || phase !== 'pending'} onClick={nextApproves}>Next reviewer approves</IFS.Button>
        <IFS.Button size="s" type="secondary" disabled={revisions || phase !== 'pending'} onClick={johnRevises}>John requests revisions</IFS.Button>
        <IFS.Button size="s" type="tertiary" onClick={() => { setChain(OWNER_CHAIN); setPhase('pending'); setMode('sidebar'); setCollapsed(false); }}>Reset</IFS.Button>
      </Demo>
      <Screen>
        <Shell user={{ initials: 'JP', name: 'Jeff Pauska' }} prompts={status === 'ready' ? ['Prepare decision summary', 'Summarize unresolved gaps'] : undefined}
          header={<Header status={status} step={step} actions={action} />}>
          {mode === 'full'
            ? <ApprovalChainPanel mode="full" onExpandedChange={f => setMode(f ? 'full' : 'sidebar')} onCollapsedChange={() => setMode('sidebar')}>{table}</ApprovalChainPanel>
            : <>
              <Summary />
              <ApprovalChainPanel mode="sidebar" collapsed={collapsed} onCollapsedChange={setCollapsed} onExpandedChange={f => setMode(f ? 'full' : 'sidebar')}>{table}</ApprovalChainPanel>
            </>}
        </Shell>
        <IFS.Modal open={modal === 'publish'} onOpenChange={o => !o && setModal(null)} title="Publish this framework?" width={440} overlay="base"
          secondaryAction={{ label: 'Cancel', onClick: () => setModal(null) }} primaryAction={{ label: 'Publish now', onClick: publish }}>
          <p className="t-body-l-regular" style={{ margin: 0 }}>Are you sure you want to publish <b>“{FRAMEWORK}”</b>? It will become active and available for use.</p>
          <p className="t-body-l-regular" style={{ margin: '8px 0 0' }}>Once published, further changes will require creating a new version.</p>
        </IFS.Modal>
        <IFS.Modal open={modal === 'send'} onOpenChange={o => !o && setModal(null)} title="Send for review?" width={440} overlay="base"
          secondaryAction={{ label: 'Cancel', onClick: () => setModal(null) }} primaryAction={{ label: 'Send now', onClick: sendAgain }}>
          <p className="t-body-l-regular" style={{ margin: 0 }}>Are you sure you want to send <b>“{FRAMEWORK}”</b> for review?</p>
          <p className="t-body-l-regular" style={{ margin: '8px 0 0' }}>Reviewers will be able to see the current state of the framework and provide feedback.</p>
        </IFS.Modal>
      </Screen>
    </>;
  } });
}
