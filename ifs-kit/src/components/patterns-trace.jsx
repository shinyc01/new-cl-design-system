import React from 'react';
import { IFS } from './registry.js';

// Pattern: System Confidence · Trace Report · Readiness Evaluation (Patterns file KmmVU2D0kqWr0dC1xXNzWw, page 12:121114).
// No new IFS DS components: every part is an IFS DS component the kit already has (content-card-organism, pagination-organism,
// segmented-control-organism, status-readiness-molecule, progress-ring-molecule, counter-atom, text-field-organism, button,
// icon-button-arrow, drawer-organism, sidebar-organism → Panel). This file holds the pattern composites and their behaviour.
// Readiness Evaluation reuses IFS.ReadinessEvaluation (patterns-approval).

const cx = (...a) => a.filter(Boolean).join(' ');

/* ------------------------------------------------------------------------------------------ */
// Default issue kinds. value = issue.kind; indicator = Indicator type in the readiness rows; progress = word after the
// percentage in the pager ("resolved" for issues that need a fix, "viewed" for read-and-acknowledge ones).
const CONFIDENCE_KINDS = [
  { value: 'question', label: 'Open questions', indicator: 'red', tooltip: 'Errors', progress: 'resolved', dot: 'error' },
  { value: 'warning', label: 'Warnings', indicator: 'orange', tooltip: 'Warnings', progress: 'viewed', dot: 'warning' },
];
const TRACE_KINDS = [
  { value: 'error', label: 'Errors', indicator: 'red', tooltip: 'Errors', progress: 'resolved', dot: 'error' },
  { value: 'warning', label: 'Warnings', indicator: 'orange', tooltip: 'Warnings', progress: 'resolved', dot: 'warning' },
  { value: 'note', label: 'Notes', indicator: 'gray', tooltip: 'Notes', progress: 'viewed' },
];

const isDone = s => !!(s && (s.applied || s.answer || s.file || s.viewed));

// Pattern helper: issue-report state hook — built on React state (no Figma component). Controller for both panels. Issues: [{ id, kind, title, description, gate, solutions: [{ id, title, description,
// recommended }], upload, answer, okay, status }]. The card layout follows the data (Figma "the system decides"):
// solutions → "Solutions" list; upload / answer → the action buttons; okay → a single Okay button (acknowledge).
// status = { applied (solution id), answer (text), file (name), uploading, viewed } — any of the first four (or viewed)
// resolves the issue. gates = [{ id, label }] for the readiness rows; an issue with `gate` counts against that gate.
// Returns state + actions; pass it as `controller` to the components below.
function useIssueReport({ issues = [], kinds = CONFIDENCE_KINDS, gates = [], defaultKind, uploadDelay = 1200, onResolvedAll } = {}) {
  const [status, setStatus] = React.useState(() => Object.fromEntries(issues.filter(i => i.status).map(i => [i.id, i.status])));
  const present = kinds.filter(k => issues.some(i => i.kind === k.value));
  const [kindState, setKindState] = React.useState(defaultKind);
  const kind = present.some(k => k.value === kindState) ? kindState : (present[0] && present[0].value);
  const [page, setPage] = React.useState(1);
  const [view, setView] = React.useState('detail');
  const [answering, setAnswering] = React.useState(null);
  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const resolved = id => isDone(status[id]);
  const list = issues.filter(i => i.kind === kind);
  const current = list[Math.min(page, list.length) - 1] || null;
  const kindOf = v => kinds.find(k => k.value === v) || {};
  const set = (id, patch) => setStatus(s => ({ ...s, [id]: { ...s[id], ...patch } }));

  const gateRows = gates.map(g => {
    const its = issues.filter(i => i.gate === g.id);
    const done = its.every(i => resolved(i.id));
    const indicators = kinds.filter(k => its.some(i => i.kind === k.value)).map(k => {
      const ks = its.filter(i => i.kind === k.value);
      return { kind: k.value, type: k.indicator, tooltip: k.tooltip, label: `${ks.filter(i => resolved(i.id)).length}/${ks.length}` };
    });
    return { ...g, done, indicators };
  });
  const passed = gateRows.filter(g => g.done).length;
  const readiness = gates.length ? Math.round((passed / gates.length) * 100) : 100;
  const allResolved = issues.every(i => resolved(i.id));
  const open = issues.filter(i => !resolved(i.id));
  const dotKind = kinds.find(k => k.dot && open.some(i => i.kind === k.value));

  const was = React.useRef(allResolved);
  React.useEffect(() => { if (allResolved && !was.current && onResolvedAll) onResolvedAll(); was.current = allResolved; }, [allResolved]);

  return {
    issues, kinds, present, kind, list, current, page, view, status, answering, gates: gateRows, readiness, allResolved,
    dot: dotKind ? dotKind.dot : null, kindOf, resolved,
    percent: list.length ? Math.round((list.filter(i => resolved(i.id)).length / list.length) * 100) : 0,
    // Switching list or filter resets the position to 1; the percentage describes the list, so it carries on (Figma note).
    setKind: k => { setKindState(k); setPage(1); setView('detail'); setAnswering(null); },
    setPage: p => { setPage(p); setAnswering(null); },
    showAll: () => { setView('list'); setAnswering(null); },
    open: index => { setPage(index + 1); setView('detail'); },
    apply: (id, solutionId) => set(id, { applied: solutionId }),
    undo: id => set(id, { applied: null, answer: null, file: null, uploading: false }),
    startAnswer: id => setAnswering(id),
    cancelAnswer: () => setAnswering(null),
    answer: (id, text) => { if (!text.trim()) return; set(id, { answer: text.trim() }); setAnswering(null); },
    upload: (id, name) => {
      set(id, { uploading: true });
      timers.current.push(setTimeout(() => set(id, { uploading: false, file: name }), uploadDelay));
    },
    acknowledge: id => set(id, { viewed: true }),
    reset: () => { setStatus(Object.fromEntries(issues.filter(i => i.status).map(i => [i.id, i.status]))); setPage(1); setView('detail'); setAnswering(null); },
  };
}

/* ------------------------------------------------------------------------------------------ */
// Pattern helper: solution / applied / answered row — built from ContentCard, Icon, IconButton. Patterns (30:73116 recommended, 30:73123 plain,
// 30:76630 applied, 30:78117 answered). M card, 12 padding, radius 8, border/base stroke. recommended = Cooper's pick:
// cooper-system-icon (Insight) + "cooper/Insight/text" gradient title on background/color-alpha/cooper-base.
// Props: title, description, recommended, onSelect (click applies it), onUndo (shows the arrow-back-up icon-button;
// Figma "the cancel button appears on hover"), undoLabel, loading (Figma uploading shimmer, 40px), state (gallery: hover).
function IssueSolution({ title, description, recommended, onSelect, onUndo, undoLabel = 'Cancel', loading, state, className, ...rest }) {
  if (loading) return <div className={cx('ifs-trc-solution--loading', className)} aria-busy="true" aria-label="Uploading" {...rest} />;
  const text = (
    <span className="ifs-trc-solution__body">
      {recommended && <IFS.Icon name="cooper-system-icon" variant="Insight" size={12} className="ifs-trc-solution__cooper" />}
      <span className="ifs-trc-solution__text">
        <span className={cx('ifs-trc-solution__title', recommended && 'ifs-trc-solution__title--cooper')}>{title}</span>
        {description && <span className="ifs-trc-solution__desc">{description}</span>}
      </span>
    </span>
  );
  return (
    <IFS.ContentCard className={cx('ifs-trc-solution', recommended && 'ifs-trc-solution--recommended', onUndo && 'ifs-trc-solution--applied', className)}
      title={text} onClick={onSelect} state={state} aria-label={onSelect ? `Apply: ${title}` : undefined}
      iconButton={onUndo ? { icon: 'arrow-back-up', label: undoLabel, onClick: onUndo } : undefined} {...rest} />
  );
}

// Pattern helper: "All" list row — built from ContentCard, Counter, Icon. Patterns (30:75771 / 12:177000): counter-atom S with the position,
// the issue title (Body/M/regular, text/secondary) and a 12px status-success-filled when resolved. Click opens the item.
function IssueListItem({ number, title, resolved, onClick, state, className, ...rest }) {
  return (
    <IFS.ContentCard className={cx('ifs-trc-item', className)} onClick={onClick} state={state}
      title={<span className="ifs-trc-item__row">
        <IFS.Counter size="s">{number}</IFS.Counter>
        <span className="ifs-trc-item__title">{title}</span>
        {resolved && <IFS.Icon name="status-success-filled" size={12} className="ifs-trc-item__check" title="Resolved" />}
      </span>} {...rest} />
  );
}

// Pattern helper: My-answer input — built from TextField M (State=Typing, ✕ + ✓ on the right). Patterns (30:77533).
// Enter or ✓ submits, Esc or ✕ cancels. Props: value / defaultValue / onChange, onSubmit(text), onCancel, placeholder.
function IssueAnswerField({ value, defaultValue = '', onChange, onSubmit, onCancel, placeholder = 'My answer', autoFocus = true, className }) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value !== undefined ? value : inner;
  const setV = t => { if (value === undefined) setInner(t); onChange && onChange(t); };
  const submit = () => { if (v.trim() && onSubmit) onSubmit(v); };
  return (
    <IFS.TextField size="m" className={cx('ifs-trc-answer', className)} value={v} onChange={setV} placeholder={placeholder} autoFocus={autoFocus}
      aria-label="My answer" onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') onCancel && onCancel(); }}
      suffix={<span className="ifs-trc-answer__actions">
        <button type="button" className="ifs-trc-answer__btn" aria-label="Cancel" onClick={onCancel}><IFS.Icon name="system-close" size={16} /></button>
        <button type="button" className="ifs-trc-answer__btn" aria-label="Save answer" disabled={!v.trim()} onClick={submit}><IFS.Icon name="system-check" size={16} /></button>
      </span>} />
  );
}

// Pattern helper: Pager with the progress word — built from Pager. Figma's pagination-organism text reads "(n% resolved)" / "(n% viewed)".
function ProgressPager({ progress = 'resolved', ...p }) {
  return <IFS.Pager progress={progress} {...p} />;
}

/* ------------------------------------------------------------------------------------------ */
// Pattern helper: issue-kind switch — built from SegmentedControl. Segmented control between issue kinds (Figma: segmented-control-organism S with counters). Hidden when only one kind has
// items (Figma: "when one of the types is completely missing, the segmented control is hidden").
function IssueKindSwitch({ controller: c, className }) {
  if (c.present.length < 2) return null;
  return (
    <IFS.SegmentedControl size="s" fullWidth className={cx('ifs-trc-kinds', className)} value={c.kind} onChange={c.setKind} aria-label="Issue type"
      options={c.present.map(k => ({ value: k.value, label: k.label, counter: c.issues.filter(i => i.kind === k.value).length }))} />
  );
}

// Pattern helper: item-by-item walkthrough — built from ProgressPager, IssueSolution, IssueListItem, IssueAnswerField, Button. The walkthrough (Figma: pagination-organism + title + card). detail view: pager (n / total, % resolved,
// "All", ‹ ›), the issue, then its card; list view ("All"): numbered rows, a click opens that item.
// Props: controller (useIssueReport), solutionsLabel / appliedLabel / answeredLabel (captions), accept (file picker).
function IssueNavigator({ controller: c, accept, className }) {
  const fileRef = React.useRef(null);
  const issue = c.current;
  if (c.view === 'list') {
    return (
      <div className={cx('ifs-trc-nav', 'ifs-trc-nav--list', className)} role="list" aria-label={`${(c.kindOf(c.kind).label || 'Issues')}`}>
        {c.list.map((it, i) => <div role="listitem" key={it.id}><IssueListItem number={i + 1} title={it.title} resolved={c.resolved(it.id)} onClick={() => c.open(i)} /></div>)}
      </div>
    );
  }
  if (!issue) return null;
  const st = c.status[issue.id] || {};
  const done = c.resolved(issue.id);
  const applied = st.applied && (issue.solutions || []).find(s => s.id === st.applied);
  const caption = t => <div className="ifs-trc-caption">{t}</div>;
  let body = null;
  if (applied) body = <div className="ifs-trc-section">{caption('Applied')}
    <IssueSolution title={applied.title} description={applied.description} recommended={applied.recommended} onUndo={() => c.undo(issue.id)} /></div>;
  else if (st.uploading) body = <div className="ifs-trc-section">{caption('Answered')}<IssueSolution loading /></div>;
  else if (st.answer || st.file) body = <div className="ifs-trc-section">{caption('Answered')}
    <IssueSolution title={st.answer || st.file} onUndo={() => c.undo(issue.id)} /></div>;
  else if (!st.viewed) {
    const sols = issue.solutions || [];
    const actions = issue.upload || issue.answer;
    body = <>
      {sols.length > 0 && <div className="ifs-trc-section">{caption('Solutions')}
        <div className="ifs-trc-solutions">{sols.map(s => <IssueSolution key={s.id} {...s} onSelect={() => c.apply(issue.id, s.id)} />)}</div></div>}
      {actions && (c.answering === issue.id
        ? <div className="ifs-trc-actions"><IssueAnswerField onSubmit={t => c.answer(issue.id, t)} onCancel={c.cancelAnswer} /></div>
        : <div className="ifs-trc-actions">
          {issue.upload && <IFS.Button type="tertiary" size="m" iconLeft="system-upload" onClick={() => fileRef.current && fileRef.current.click()}>Upload file</IFS.Button>}
          {issue.answer && <IFS.Button type="tertiary" size="m" iconLeft="system-plus" onClick={() => c.startAnswer(issue.id)}>My answer</IFS.Button>}
          <input ref={fileRef} type="file" hidden accept={accept} onChange={e => { const f = e.target.files && e.target.files[0]; if (f) c.upload(issue.id, f.name); e.target.value = ''; }} />
        </div>)}
      {issue.okay && <div className="ifs-trc-section"><IFS.Button type="secondary" size="m" iconLeft="system-check" className="ifs-trc-okay" onClick={() => c.acknowledge(issue.id)}>Okay</IFS.Button></div>}
    </>;
  }
  return (
    <div className={cx('ifs-trc-nav', className)}>
      <ProgressPager page={c.page} total={c.list.length} onChange={c.setPage} complete={done} percent={c.percent}
        progress={c.kindOf(c.kind).progress} onShowAll={c.showAll} showAllLabel="All" />
      <div className="ifs-trc-issue">
        <h3 className="ifs-trc-issue__title">{issue.title}</h3>
        {issue.description && <p className="ifs-trc-issue__desc">{issue.description}</p>}
      </div>
      {body}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Pattern helper: approval-readiness gates — built from ProgressRing, ReadinessStatus, Indicator, Tooltip. "Approval readiness" + one status-readiness-molecule per gate (Figma: content-card top slot, 30:73048). Passed gates read
// "Passed"; open ones show an XS indicator per kind, "resolved/total", with the kind as tooltip ("The tooltip appears on hover").
function ConfidenceGates({ controller: c, label = 'Approval readiness', className }) {
  return (
    <div className={cx('ifs-trc-gates', className)}>
      <div className="ifs-trc-gates__head">
        <span>{label}</span>
        <span className="ifs-trc-gates__pct"><IFS.ProgressRing value={c.readiness} size={16} label={label} />{c.readiness}%</span>
      </div>
      <div className="ifs-trc-gates__list">
        {c.gates.map(g => g.done
          ? <IFS.ReadinessStatus key={g.id} type="done" right="Passed">{g.label}</IFS.ReadinessStatus>
          : <IFS.ReadinessStatus key={g.id} type="in-progress" right={<span className="ifs-trc-gates__inds">
            {g.indicators.map(d => <IFS.Tooltip key={d.kind} content={d.tooltip} type="top" arrow="right">
              <span tabIndex={0} className="ifs-trc-gates__ind"><IFS.Indicator size="xs" type={d.type}>{d.label}</IFS.Indicator></span>
            </IFS.Tooltip>)}
          </span>}>{g.label}</IFS.ReadinessStatus>)}
      </div>
    </div>
  );
}

// Pattern helper: collapsed panel rail — built from Panel (collapsed). The 48px rail of the right-hand panels (Figma: sidebar-organism
// View=Collapsed, icon-button-arrow ←|). dot: error (red = open questions / errors), warning (orange = warnings only), none when all is OK.
function PanelRail({ dot, label = 'Expand panel', onExpand, className, style }) {
  return <IFS.Panel expanded={false} onExpandedChange={v => v && onExpand && onExpand()} dot={dot || undefined}
    title={label.replace(/^Expand /, '')} className={className} style={style} />;
}

// Pattern helper: System Confidence panel — built from Panel, ContentCard, ConfidenceGates, IssueKindSwitch, IssueNavigator. Patterns (30:72985) — the author's right-hand panel on Review screens: approval readiness
// (gates) and the open questions / warnings to walk through. Panel (sidebar-organism) holding one content card.
// Props: controller, title, expanded / defaultExpanded / onExpandedChange (collapsed → 48px rail with status dot),
// onEvidence (round Cooper button), accept (upload types).
function SystemConfidence({ controller: c, title = 'System confidence', expanded, defaultExpanded = true, onExpandedChange, onEvidence, accept, className, style }) {
  const [inner, setInner] = React.useState(defaultExpanded);
  const isExp = expanded !== undefined ? expanded : inner;
  const setExp = v => { if (expanded === undefined) setInner(v); onExpandedChange && onExpandedChange(v); };
  return (
    <IFS.Panel title={title} expanded={isExp} onExpandedChange={setExp} dot={c.dot || undefined} onEvidence={onEvidence}
      className={cx(isExp && 'ifs-trc-panel', className)} style={style}>
      <IFS.ContentCard className="ifs-trc-card"
        title={<ConfidenceGates controller={c} />}
        bottom={c.issues.length > 0 && <div className={cx('ifs-trc-card__issues', c.present.length > 1 && 'has-kinds')}>
          {c.present.length > 1 && <div className="ifs-trc-card__kinds"><IssueKindSwitch controller={c} /></div>}
          <IssueNavigator controller={c} accept={accept} />
        </div>} />
    </IFS.Panel>
  );
}

// Pattern helper: Trace Report — built from Drawer / Panel, IssueKindSwitch, IssueNavigator, Button. Patterns (12:176606 drawer, 12:176205 sidebar) — appears after a change the system considers
// incorrect. type drawer = floating drawer-organism over a canvas (collapse only, never closes); sidebar = Panel (collapse
// to rail). onUndo adds the footer "Undo" (Tertiary L) that reverts the change. Closes itself: the parent unmounts it when
// controller.allResolved (use useIssueReport onResolvedAll).
// Props: controller, type drawer|sidebar, title, expanded / defaultExpanded / onExpandedChange, onUndo, accept, className, style.
function TraceReport({ controller: c, type = 'drawer', title = 'Trace report', expanded, defaultExpanded = true, onExpandedChange, onUndo, accept, className, style }) {
  const [inner, setInner] = React.useState(defaultExpanded);
  const isExp = expanded !== undefined ? expanded : inner;
  const setExp = v => { if (expanded === undefined) setInner(v); onExpandedChange && onExpandedChange(v); };
  const footer = onUndo && <div className="ifs-trc-report__footer"><IFS.Button type="tertiary" size="l" iconLeft="arrow-back-up" onClick={onUndo}>Undo</IFS.Button></div>;
  if (type === 'sidebar') {
    return (
      <IFS.Panel title={title} expanded={isExp} onExpandedChange={setExp} dot={c.dot || undefined} showEvidence={false}
        className={cx(isExp && 'ifs-trc-panel', isExp && 'ifs-trc-report--sidebar', className)} style={style}>
        {c.present.length > 1 && <div className="ifs-trc-report__kinds"><IssueKindSwitch controller={c} /></div>}
        <IssueNavigator controller={c} accept={accept} />
        {footer}
      </IFS.Panel>
    );
  }
  return (
    <IFS.Drawer inline open title={title} expanded={isExp} onExpandedChange={setExp} showClose={false}
      segmented={c.present.length > 1 ? <IssueKindSwitch controller={c} /> : null} className={cx('ifs-trc-report', className)} style={style}>
      <div className="ifs-trc-report__body"><IssueNavigator controller={c} accept={accept} /></div>
      {footer}
    </IFS.Drawer>
  );
}

Object.assign(IFS, { useIssueReport, IssueSolution, IssueListItem, IssueAnswerField, ProgressPager, IssueKindSwitch, IssueNavigator,
  ConfidenceGates, PanelRail, SystemConfidence, TraceReport, CONFIDENCE_KINDS, TRACE_KINDS });
export { useIssueReport, IssueSolution, IssueListItem, IssueAnswerField, ProgressPager, IssueKindSwitch, IssueNavigator,
  ConfidenceGates, PanelRail, SystemConfidence, TraceReport, CONFIDENCE_KINDS, TRACE_KINDS };
