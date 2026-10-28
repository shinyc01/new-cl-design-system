import React from 'react';
import { IFS } from './registry.js';
// Activity, Versions pattern family — Figma file IFS Design System Patterns (KmmVU2D0kqWr0dC1xXNzWw),
// page "Activity, Versions" (12:339984), section Activity log (52:83648).
// IFS DS components the kit lacked: compare-dropdown (+ its drop-down list) and compare-header.
// Pattern composites: ActivityPanel (version history + activity log + approval chain in the panel the library opens),
// CompareStatValue (the from → to value of a compare stat card) and CompareView (compare header + stat cards + Sankey).
// The timeline itself is the kit's (VersionEntry / Timeline / ApprovalChain, activity.jsx).

const paCx = (...a) => a.filter(Boolean).join(' ');

function usePaValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const ctl = value !== undefined;
  const cur = ctl ? value : inner;
  const set = React.useCallback((v, ...a) => { if (!ctl) setInner(v); onChange && onChange(v, ...a); }, [ctl, onChange]);
  return [cur, set];
}

// Close on outside pointer-down and Escape while `open`.
function usePaDismiss(ref, open, close) {
  React.useEffect(() => {
    if (!open) return undefined;
    const down = e => { if (ref.current && !ref.current.contains(e.target)) close(); };
    const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    document.addEventListener('pointerdown', down, true);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down, true); document.removeEventListener('keydown', key); };
  }, [open, close]);
}

let paSeq = 0;
const usePaId = p => { const r = React.useRef(null); if (r.current == null) r.current = `${p}-${++paSeq}`; return r.current; };

/* ───────────────────────────── drop-down list ───────────────────────────── */
// Figma: drop-down list (c5186fedd85d1a8db92485b5b848c56e500c3c33 cached in Patterns 52:82683; IFS DS publishes "drop-down list" ddd60a12…)
// The open list of compare-dropdown: titled groups ("Top benchmarks", "All frameworks") split by a divider.
// Props: groups [{ title, items: [{ value, label, status: { type, label } (indicator-molecule), badge (badge-atom White S text), disabled }] }],
// value (selected value), activeValue (keyboard highlight = Figma hover row), onSelect(value, item), onActiveChange(value),
// id (listbox id), inline (static position — gallery).
function CompareDropdownList({ groups = [], value, activeValue, onSelect, onActiveChange, id, inline, className, style }) {
  return (
    <div id={id} role="listbox" className={paCx('ifs-compare-list', inline && 'ifs-compare-list--inline', className)} style={style}>
      {groups.map((g, gi) => (
        <React.Fragment key={g.title || gi}>
          {gi > 0 && <div role="separator" className="ifs-compare-list__divider" />}
          <div role="group" aria-label={g.title} className="ifs-compare-list__group">
            {g.title && <div className="ifs-compare-list__title">{g.title}</div>}
            {(g.items || []).map(it => (
              <div key={it.value} role="option" id={id ? `${id}-${String(it.value).replace(/\W+/g, '-')}` : undefined}
                aria-selected={it.value === value} aria-disabled={it.disabled || undefined}
                className={paCx('ifs-compare-list__item', it.value === activeValue && 'is-active', it.value === value && 'is-selected', it.disabled && 'is-disabled')}
                onMouseEnter={() => !it.disabled && onActiveChange && onActiveChange(it.value)}
                onMouseDown={e => e.preventDefault()}
                onClick={() => !it.disabled && onSelect && onSelect(it.value, it)}>
                <span className="ifs-compare-list__label">{it.label}</span>
                {it.status && <IFS.Indicator type={it.status.type} size="s">{it.status.label}</IFS.Indicator>}
                {it.badge && <IFS.Badge color="white" size="s">{it.badge}</IFS.Badge>}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ───────────────────────────── compare-dropdown ───────────────────────────── */
// Figma: compare-dropdown (59571d4df483e2b416ca034bafc72eabc902f8f3; Patterns copy 52:82756)
// Variants: Property 1=Variant2 (filled: name + ✕ + caret), Variant3 (empty: "Select framework" in text/disabled), Default (open: caret up + list).
// Props: groups (see CompareDropdownList), value / defaultValue / onChange(value, item) (✕ sets null),
// open / defaultOpen / onOpenChange, placeholder, clearable (✕ when filled, default true), disabled, width (default 320),
// state open (gallery), aria-label. Keyboard: Enter / Space / ↓ open; ↑ ↓ move; Enter picks; Esc closes.
function CompareDropdown({ groups = [], value, defaultValue = null, onChange, open, defaultOpen = false, onOpenChange,
  placeholder = 'Select framework', clearable = true, disabled, width = 320, state, className, style, 'aria-label': ariaLabel = 'Compare to' }) {
  const [val, setVal] = usePaValue(value, defaultValue, onChange);
  const [isOpen, setOpen] = usePaValue(open, defaultOpen || state === 'open', onOpenChange);
  const items = React.useMemo(() => groups.flatMap(g => g.items || []), [groups]);
  const enabled = items.filter(i => !i.disabled);
  const [active, setActive] = React.useState(null);
  const ref = React.useRef(null); const field = React.useRef(null);
  const listId = usePaId('ifs-compare-list');
  const sel = items.find(i => i.value === val);
  usePaDismiss(ref, isOpen && state !== 'open', React.useCallback(() => setOpen(false), [setOpen]));
  React.useEffect(() => { if (isOpen) setActive(sel && !sel.disabled ? sel.value : (enabled[0] && enabled[0].value)); }, [isOpen]);
  const pick = (v, it) => { setVal(v, it); setOpen(false); field.current && field.current.focus(); };
  const onKeyDown = e => {
    if (disabled) return;
    if (!isOpen && ['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); setOpen(true); return; }
    if (!isOpen) return;
    const at = enabled.findIndex(i => i.value === active);
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(enabled[(at + 1) % enabled.length].value); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(enabled[(at <= 0 ? enabled.length : at) - 1].value); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const it = enabled[at]; if (it) pick(it.value, it); }
    else if (e.key === 'Tab') setOpen(false);
  };
  const activeId = isOpen && active != null ? `${listId}-${String(active).replace(/\W+/g, '-')}` : undefined;
  return (
    <div ref={ref} className={paCx('ifs-compare-dd', isOpen && 'ifs-compare-dd--open', disabled && 'ifs-compare-dd--disabled', className)} style={{ width, ...style }}>
      <div ref={field} className="ifs-compare-dd__field" role="combobox" tabIndex={disabled ? -1 : 0} aria-label={ariaLabel}
        aria-expanded={!!isOpen} aria-controls={isOpen ? listId : undefined} aria-activedescendant={activeId} aria-disabled={disabled || undefined}
        onClick={() => !disabled && setOpen(!isOpen)} onKeyDown={onKeyDown}>
        <span className={paCx('ifs-compare-dd__value', !sel && 'ifs-compare-dd__value--empty')}>{sel ? sel.label : placeholder}</span>
        <span className="ifs-compare-dd__right">
          {sel && clearable && !isOpen && !disabled && (
            <button type="button" className="ifs-compare-dd__clear" aria-label="Clear comparison"
              onClick={e => { e.stopPropagation(); setVal(null, null); field.current && field.current.focus(); }}>
              <IFS.Icon name="system-close" size={16} />
            </button>
          )}
          <IFS.Icon name={isOpen ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} />
        </span>
      </div>
      {isOpen && <CompareDropdownList id={listId} groups={groups} value={val} activeValue={active} onActiveChange={setActive} onSelect={pick} />}
    </div>
  );
}

/* ───────────────────────────── compare-header ───────────────────────────── */
// Figma: compare-header (0c79e831e79cbfa3259c5619e66bd0f64cc45b2a; Patterns copy 52:82780) — the "COMPARE TO" bar above a compare view.
// A 440px blurred box (label + compare-dropdown) on a 42px full-width row; boolean "Show cooper-banner" adds a 398px
// cooper-banner beside it (hidden by default; the banner itself is a separate component not built here).
// Props: label (default "Compare to", drawn uppercase), cooperBanner (node → show-cooper-banner), every CompareDropdown prop.
function CompareHeader({ label = 'Compare to', cooperBanner, className, style, ...dropdown }) {
  return (
    <div className={paCx('ifs-compare-header', className)} style={style}>
      <div className="ifs-compare-header__box">
        <span className="ifs-compare-header__label">{label}</span>
        <CompareDropdown width="100%" aria-label={label} {...dropdown} className="ifs-compare-header__dd" />
      </div>
      {cooperBanner && <div className="ifs-compare-header__banner">{cooperBanner}</div>}
    </div>
  );
}

/* ───────────────────────────── compare stat value ───────────────────────────── */
// The value of a compare stat card (Figma compare-quick-stat-card 52:82588 = legacy stat-capital-flow-card Type=Compare):
// two caption-over-value columns joined by arrow-right. Pass it as IFS.StatCard `value` with className "ifs-compare-stat".
// Props: fromLabel, from (baseline: text/tertiary), toLabel, to (current: text/primary). Without `from` only the current value shows.
function CompareStatValue({ fromLabel, from, toLabel, to, className }) {
  const col = (l, v, cls) => <span className={paCx('ifs-compare-stat__col', cls)}>{l && <span className="ifs-compare-stat__cap">{l}</span>}<span className="ifs-compare-stat__num">{v}</span></span>;
  return (
    <span className={paCx('ifs-compare-stat__value', className)}>
      {from != null && <>{col(fromLabel, from, 'ifs-compare-stat__col--from')}<IFS.Icon name="arrow-right" size={12} /></>}
      {col(toLabel, to)}
    </span>
  );
}

/* ───────────────────────────── CompareView (pattern) ───────────────────────────── */
// Compare screen body ("Library - Strategy Framework - Active models", Patterns 52:84351): compare-header, a row of four
// compare stat cards, then the Sankey with the current and baseline frameworks as its two source blocks.
// Props: groups / value / defaultValue / onChange (the compare-dropdown), stats [{ key, title, trend, trendDirection, fromLabel, from, toLabel, to, description }]
// (from/fromLabel are dropped while nothing is selected), sankey (IFS.Sankey props), height (Sankey body), cooperBanner.
function CompareView({ groups, value, defaultValue = null, onChange, stats = [], sankey, height = 520, cooperBanner, className, style }) {
  const [val, setVal] = usePaValue(value, defaultValue, onChange);
  return (
    <div className={paCx('ifs-compare-view', className)} style={style}>
      <CompareHeader groups={groups} value={val} onChange={setVal} cooperBanner={cooperBanner} />
      <div className="ifs-compare-view__stats">
        {stats.map((s, i) => (
          <IFS.StatCard key={s.key || i} className="ifs-compare-stat" title={s.title} trend={val != null ? s.trend : undefined} trendDirection={s.trendDirection}
            description={s.description}
            value={<CompareStatValue fromLabel={val != null ? s.fromLabel : undefined} from={val != null ? s.from : undefined} toLabel={s.toLabel} to={s.to} />} />
        ))}
      </div>
      {sankey && <IFS.Sankey {...sankey} height={height} />}
    </div>
  );
}

/* ───────────────────────────── ActivityPanel (pattern) ───────────────────────────── */
// The record's Activity panel ("Library - Strategy Framework - Activity panel", Patterns 52:87879): panel-organism (380px, full height)
// over an overlay (Type=Base), header ACTIVITY + ✕, a segmented control S (Version History | Approval Chain, only when the record has
// both), the Cooper smart search that filters the current view, then the version-history timeline or the approval chain.
// Version entries are kit VersionEntry (M marker = expand toggle; card = the version card): click the card or name to
// open that version read-only, ⋮ for Compare / Duplicate / Rename / Restore, the caret to expand the version's full activity log.
// Props:
//   versions / defaultVersions / onVersionsChange — [{ id, title, current, description, author: Avatar props + name, time,
//     activity: [{ id, name, avatar (Avatar props), type: 'comment'|'action'|'auto-action', role, text, time }] }] (newest first)
//   approvals — ApprovalChain steps; undefined = record has no approval chain (no segmented control); [] = empty state.
//   view / defaultView ('versions'|'approvals') / onViewChange, query / defaultQuery / onQueryChange (the smart search),
//   open / defaultOpen / onOpenChange (✕, overlay click, Esc), layout overlay (fixed) | contained (absolute in the nearest
//   positioned ancestor) | static (in flow, no overlay — gallery), title ("Activity"), recordLabel ("framework", for copy),
//   onOpenVersion(v), onCompare(v, baseline), onDuplicate(v), onRestore(v) (after the confirm modal), onRename(v, title, previous),
//   defaultExpanded (version ids), defaultRename { id, value, error } (gallery states).
const PA_TYPE_LABEL = { comment: 'Comment', action: 'Action', 'auto-action': 'Auto-action' };
const PA_STOP = new Set(('a an and any all are about by did do does done for from has have in is it its me my of on or show the to was were what when where which who with '
  + 'version versions changed change changes made make history activity everything anything list find give tell').split(' '));
const paNorm = s => String(s || '').toLowerCase();
const paPeople = versions => {
  const m = new Map();
  versions.forEach(v => { if (v.author) m.set(paNorm(v.author.name), v.author.name); (v.activity || []).forEach(a => m.set(paNorm(a.name), a.name)); });
  return [...m.values()];
};
// Which people / activity types a query names. "Comments by J. Carter", "What did Cooper do automatically?", "singh's actions".
function paIntent(q, versions) {
  const t = paNorm(q);
  const people = paPeople(versions).filter(n => {
    const ln = paNorm(n); if (t.includes(ln)) return true;
    return ln.split(/[\s.]+/).filter(w => w.length > 2).some(w => new RegExp(`\\b${w}\\b`).test(t));
  });
  const types = [];
  if (/\bcomment/.test(t)) types.push('comment');
  if (/\bauto|automatic|system/.test(t)) types.push('auto-action');
  if (/\bactions?\b/.test(t) && !/\bauto[- ]?actions?\b/.test(t)) types.push('action');
  return { people: people.map(paNorm), types };
}
// Result = the same list with fewer items (Figma note). Activity-level queries (person / type) keep only matching log entries and
// expand those versions; other queries match the version's title, description, author, date and log text.
function filterVersions(versions, q) {
  if (!q || !q.trim()) return { list: versions, expand: null };
  const { people, types } = paIntent(q, versions);
  const hitAct = a => (!people.length || people.includes(paNorm(a.name))) && (!types.length || types.includes(a.type));
  if (people.length || types.length) {
    const list = versions.map(v => {
      const acts = (v.activity || []).filter(hitAct);
      const authorHit = !types.length && v.author && people.includes(paNorm(v.author.name));
      return acts.length || authorHit ? { ...v, activity: acts } : null;
    }).filter(Boolean);
    return { list, expand: new Set(list.filter(v => v.activity.length).map(v => v.id)) };
  }
  const t = paNorm(q);
  const words = t.split(/[^a-z0-9$.%-]+/).map(w => w.replace(/[.]+$/, '')).filter(w => w.length > 1 && !PA_STOP.has(w));
  if (/\bcurrent|active\b/.test(t)) return { list: versions.filter(v => v.current), expand: null };
  if (!words.length) return { list: versions, expand: null };
  const hay = v => paNorm([v.title, v.description, v.author && v.author.name, v.time, ...(v.activity || []).map(a => `${a.text} ${a.role}`)].join(' '));
  return { list: versions.filter(v => words.some(w => hay(v).includes(w))), expand: null };
}
function filterApprovals(steps, q) {
  if (!q || !q.trim()) return steps;
  const t = paNorm(q);
  let st = null;
  if (/reject|request(ed)? changes|declin/.test(t)) st = 'rejected';
  else if (/hasn.?t|not (yet )?respond|still|pending|waiting|await|needs? to/.test(t)) st = 'awaiting';
  else if (/approv/.test(t)) st = 'success';
  const named = steps.filter(s => paNorm(s.name).split(/\s+/).some(w => w.length > 2 && t.includes(w.replace(/\.$/, ''))));
  if (named.length) return named;
  return st ? steps.filter(s => s.state === st) : steps.filter(s => paNorm(`${s.name} ${s.position} ${s.comment || ''}`).includes(t));
}

const PA_VERSION_SUGGESTIONS = ['Show comments only', 'What did Cooper change automatically?', 'What did A. Singh do?', 'Which version is current?'];
const PA_APPROVAL_SUGGESTIONS = ['Who hasn\'t responded yet?', 'Who requested changes?', 'Who still needs to approve?'];

function ActivityPanel({ versions, defaultVersions = [], onVersionsChange, approvals, view, defaultView = 'versions', onViewChange,
  query, defaultQuery = '', onQueryChange, open, defaultOpen = true, onOpenChange, layout = 'overlay', title = 'Activity', recordLabel = 'framework',
  onOpenVersion, onCompare, onDuplicate, onRestore, onRename, defaultExpanded = [], defaultRename, versionSuggestions = PA_VERSION_SUGGESTIONS,
  approvalSuggestions = PA_APPROVAL_SUGGESTIONS, className, style }) {
  const [list, setList] = usePaValue(versions, defaultVersions, onVersionsChange);
  const [isOpen, setOpen] = usePaValue(open, defaultOpen, onOpenChange);
  const hasApprovals = approvals !== undefined && approvals !== null;
  const [cur, setCur] = usePaValue(view, defaultView, onViewChange);
  const tab = hasApprovals ? cur : 'versions';
  const [q, setQ] = usePaValue(query, defaultQuery, onQueryChange);
  const [applied, setApplied] = React.useState(defaultQuery);
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
  const [ren, setRen] = React.useState(defaultRename ? { id: defaultRename.id, value: defaultRename.value, error: defaultRename.error } : null);
  const [restoreOf, setRestoreOf] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!isOpen || layout === 'static') return undefined;
    const key = e => { if (e.key === 'Escape' && !e.defaultPrevented && !restoreOf && !(ref.current && ref.current.contains(document.activeElement) && document.activeElement.closest('[role=combobox],[role=menu],input'))) setOpen(false); };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [isOpen, layout, restoreOf]);
  React.useEffect(() => { setApplied(q && q.trim() ? q : ''); }, [tab]);
  if (!isOpen && layout !== 'static') return null;

  const dupMsg = 'A version with this name already exists';
  const nameTaken = (id, name) => list.some(v => v.id !== id && paNorm(v.title).trim() === paNorm(name).trim());
  const startRename = v => setRen({ id: v.id, value: v.title, error: null });
  // Rename submit (VersionEntry onRenameSubmit): a duplicate name keeps the field open with the error (return false).
  const saveRename = value => {
    if (!ren) return false;
    const name = String(value != null ? value : ren.value).trim();
    if (nameTaken(ren.id, name)) { setRen({ ...ren, value: name, error: dupMsg }); return false; }
    const prev = list.find(v => v.id === ren.id);
    setRen(null);
    if (!prev || prev.title === name) return true;
    const next = list.map(v => (v.id === ren.id ? { ...v, title: name } : v));
    setList(next);
    onRename && onRename(prev, name, prev.title);
    IFS.toast && IFS.toast({ title: `Version renamed to “${name}”`, primaryAction: { label: 'Undo', onClick: () => setList(list) }, duration: 5000 });
    return true;
  };
  const currentV = list.find(v => v.current);
  const baselineOf = v => (v.current ? list[list.indexOf(v) + 1] : currentV) || null;
  const menuFor = v => [
    { label: 'Compare', icon: 'compare', disabled: !baselineOf(v), reason: 'There is no other version to compare with yet',
      onClick: () => onCompare && onCompare(v, baselineOf(v)) },
    { divider: true },
    { label: 'Duplicate', icon: 'duplicate', onClick: () => onDuplicate && onDuplicate(v) },
    { label: 'Rename', icon: 'system-edit-rename', onClick: () => startRename(v) },
    ...(v.current ? [] : [{ label: 'Restore', icon: 'arrow-up', onClick: () => setRestoreOf(v) }]),
  ];
  const toggle = id => { const n = new Set(expanded); n.has(id) ? n.delete(id) : n.add(id); setExpanded(n); };

  let body;
  if (tab === 'versions') {
    const { list: shown, expand } = filterVersions(list, applied);
    body = shown.length ? (
      <div role="list" className="ifs-timeline ifs-version-history ifs-activity-panel__list" aria-label="Version history">
        {shown.map((v, i) => {
          const isExp = expand ? expand.has(v.id) || expanded.has(v.id) : expanded.has(v.id);
          const isRen = !!ren && ren.id === v.id;
          return <IFS.VersionEntry key={v.id} title={v.title} badge={v.current ? 'Current' : undefined} description={v.description}
            author={v.author ? { name: v.author.name, avatar: v.author } : undefined} time={v.time} last={i === shown.length - 1}
            expanded={isExp} onExpandedChange={() => toggle(v.id)} onOpen={() => onOpenVersion && onOpenVersion(v)}
            activity={(v.activity || []).map(a => ({ key: a.id, avatar: { name: a.name, ...a.avatar }, title: a.name, badge: PA_TYPE_LABEL[a.type] || a.type,
              subtitle: a.role, time: a.time, children: a.text }))}
            renaming={isRen} onRenamingChange={on => (on ? startRename(v) : setRen(null))}
            renameValue={isRen ? ren.value : undefined}
            onRenameChange={val => setRen(r => ({ ...r, value: val, error: r.error && nameTaken(r.id, val) ? dupMsg : null }))}
            renameError={isRen ? ren.error : undefined} onRenameSubmit={saveRename}
            menu={<IFS.ActionMenu label={`${v.title} actions`} width={160} items={menuFor(v)} />} />;
        })}
      </div>
    ) : (
      <IFS.EmptyState cause="no-results" size="section" icon={null} heading="No results found" body="You might be looking for"
        suggestions={versionSuggestions.slice(0, 3)} onSuggestion={s => { setQ(s); setApplied(s); }} />
    );
  } else if (!approvals.length) {
    body = <IFS.EmptyState cause="empty-container" size="section" icon={null} heading="No approval chain yet"
      body={`Approvers appear here after you send this ${recordLabel} for approval`} />;
  } else {
    const shown = filterApprovals(approvals, applied);
    body = shown.length
      ? <IFS.ApprovalChain className="ifs-activity-panel__list" steps={shown.map(s => ({ ...s, actions: false }))} />
      : <IFS.EmptyState cause="no-results" size="section" icon={null} heading="No results found" body="You might be looking for"
          suggestions={['Who has approved so far?', 'Show me all the approvals', 'Which reviewers approved?']} onSuggestion={s => { setQ(s); setApplied(s); }} />;
  }

  const panel = (
    <div ref={ref} className={paCx('ifs-activity-panel', `ifs-activity-panel--${layout}`, className)} style={style}
      role={layout === 'static' ? undefined : 'dialog'} aria-label={title}>
      <IFS.Panel title={title} showEvidence={false}>
        {hasApprovals && <IFS.SegmentedControl size="s" fullWidth value={tab} onChange={v => setCur(v)}
          options={[{ value: 'versions', label: 'Version History' }, { value: 'approvals', label: 'Approval Chain' }]} />}
        <IFS.SmartSearch width="100%" className="ifs-activity-panel__search" value={q}
          onChange={v => { setQ(v); if (!v) setApplied(''); }} onSubmit={v => setApplied(v)} onClear={() => setApplied('')}
          placeholder={tab === 'versions' ? 'Ask anything about version history' : 'Ask anything about approval chain'}
          suggestions={q ? undefined : (tab === 'versions' ? versionSuggestions : approvalSuggestions)} />
        {body}
      </IFS.Panel>
      <IFS.IconButton className="ifs-activity-panel__close" icon="system-close" label={`Close ${title.toLowerCase()}`} type="ghost" size="s" onClick={() => setOpen(false)} />
      <IFS.Modal open={!!restoreOf} onOpenChange={o => !o && setRestoreOf(null)} overlay="base" width={440} title="Restore this version?"
        secondaryAction={{ label: 'Cancel', onClick: () => setRestoreOf(null) }}
        primaryAction={{ label: 'Restore', onClick: () => { const v = restoreOf; setRestoreOf(null); onRestore && onRestore(v); } }}>
        {restoreOf && <div className="ifs-activity-panel__restore">
          <p>Restoring <b>“{restoreOf.title}”</b> creates a new draft copy while keeping the original {recordLabel} archived.</p>
          <p>The new draft must go through the approval and publishing process before it can become active.</p>
        </div>}
      </IFS.Modal>
    </div>
  );
  if (layout === 'static') return panel;
  return <>
    <IFS.Overlay type="base" inline={layout === 'contained'} className="ifs-activity-panel__overlay" onClick={() => setOpen(false)} />
    {panel}
  </>;
}

Object.assign(IFS, { CompareDropdownList, CompareDropdown, CompareHeader, CompareStatValue, CompareView, ActivityPanel, filterVersions });
export { CompareDropdownList, CompareDropdown, CompareHeader, CompareStatValue, CompareView, ActivityPanel, filterVersions };
